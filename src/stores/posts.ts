import { defineStore } from "pinia";
import { Ref, ref, shallowRef, computed, watch } from "vue";

import { Post } from "../constants";

import { getPosts } from "../API/get-posts";

export const usePostsData = defineStore("posts", () => {
	//Если бы у нас был настоящий API-запрос,
	//то этот флаг отвечал бы за отображение загрузочного спинера
	//Хотел добавить анимацию подзагрузки при переходе на другую страницу, но подумал это будет излишне
	const load = shallowRef(true);

	const _posts: Ref<Post[]> = ref([]);

	const addInLocalStorage = () => {
		localStorage.setItem("_posts", JSON.stringify(_posts.value));
	};

	const posts: Ref<Post[]> = ref([]);

	const searchValue = shallowRef("");

	const rerenderState = () => {
		//Если поисковая строка существует, то нахожу по ней и id нужный пост
		//Если нет, то отдаю все посты
		if (searchValue.value) {
			const postIndex = _posts.value.findIndex((post) => post?.id === searchValue.value);

			if (postIndex > -1) {
				posts.value = [_posts.value[postIndex]];
				changePageOnNumber(1);

				return;
			}
		}

		posts.value = _posts.value;
	};

	//Наблюдатели за изменением постов и строки по поиску
	//Добавлена фича отделения модели от её вьюхи для того, чтобы в будущем можно было усложнить или изменить фильтрацию
	watch(
		() => _posts.value,
		() => {
			rerenderState();
			addInLocalStorage();
		},
		{
			deep: true,
		}
	);
	watch(
		() => searchValue.value,
		() => {
			rerenderState();
		}
	);

	const page = shallowRef(1);

	const pagesNumber = computed(() => {
		return Math.ceil(posts.value.length / 70);
	});

	//От какого элемента начинается выбраная страница
	const prevPage = computed(() => {
		return (page.value - 1) * 70;
	});

	//Элемент которым заканчивается выбранная страница
	const nextPage = computed(() => {
		return page.value * 70;
	});

	//Добавление индекса делают здесь, чтобы не пересчитывать каждый раз всю 1000 элементов
	const postsByPage = computed(() => {
		return posts.value.slice(prevPage.value, nextPage.value).map((post, index) => {
			return {
				...post,
				index: prevPage.value + index + 1,
			};
		});
	});

	const changePageOnNext = () => {
		//Проверка здесь не нужна из-за Vuetify, но решил её указать для наглядности
		if (page.value >= pagesNumber.value) return;

		page.value += 1;
	};

	const changePageOnPerv = () => {
		//Проверка здесь не нужна из-за Vuetify, но решил её указать для наглядности
		if (page.value <= 1) return;

		page.value -= 1;
	};

	const changePageOnNumber = (pageNumber: number) => {
		page.value = pageNumber;
	};

	const getPostsData = () => {
		const posts = localStorage.getItem("_posts");

		if (posts !== null) {
			_posts.value = JSON.parse(posts);
			load.value = false;

			return;
		}

		_posts.value = getPosts();
		load.value = false;
	};

	// Если бы элементов было больше чем 1000 в разы, то можно было бы задуматься о создании коллекции Map().
	// Но так как это тестовое, решил не запариваться, хотя и сложного в этом ничего нет.
	const editPost = (id: string, newPostName: string) => {
		const index = _posts.value.findIndex((post) => post.id === id);

		if (index < 0) return;

		rerenderState();
		_posts.value[index] = {
			id: id,
			name: newPostName,
		};
	};

	const addNewPost = (name: string) => {
		//Не уверен был с помощью какой библиотеки вы создаете id, и происходить это должно на беке по API запросу
		//Но тут решил показать данное простое решение в помощью Date.now()
		//Да, id новых карточек не будет соответствовать логике создания id других, но ппонадеялся, что это не страшное допущение в тестовом
		_posts.value.unshift({
			id: Date.now().toString(),
			name: name,
		});
	};

	const deletePost = (id: string) => {
		_posts.value = _posts.value.filter((post) => post.id !== id);
		//Эта строчка здесь не нужна, если поиск идет по нескольким постам.
		//В моём случае мы смотрим только на один пост, поэтому указал для лучшего юзер экспириенса
		searchValue.value = "";
	};

	return {
		load,
		posts,
		searchValue,
		pagesNumber,
		changePageOnNext,
		changePageOnPerv,
		changePageOnNumber,
		postsByPage,
		getPostsData,
		editPost,
		addNewPost,
		deletePost,
	};
});
