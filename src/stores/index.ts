import { defineStore } from "pinia";
import { Ref, ref } from "vue";

import { post } from "../constants";

import getPosts from "../API/get-posts";

export const usePostsData = defineStore("data", () => {
	const posts: Ref<post[]> = ref([]);

	const getPostsData = () => {
		posts.value = getPosts();
	};

	return {
		posts,
		getPostsData,
	};
});
