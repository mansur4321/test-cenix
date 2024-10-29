<script setup lang="ts">
import { computed, shallowRef } from "vue";

import { usePostsData } from "../../stores/index";

const searchString = shallowRef();
const postsData = usePostsData();

const search = (value: string | null) => {
	if (value === null) {
		postsData.searchValue = "";
		searchString.value = "";
		return;
	}

	searchString.value = "";
	postsData.searchValue = value;
};
const searchPosts = computed((): string[] => {
	return postsData.posts.map((post) => {
		return {
			value: post.id,
			title: post.name,
		};
	});
});
</script>

<template>
	<!-- 🔍 Search - Почему здесь использовал символ? Мне кажется это прикольно выглядит, особенно если не мешает стилистике ui-я -->
	<v-autocomplete
		v-model="searchString"
		class="mb-n6"
		label="🔍 Search"
		density="comfortable"
		variant="outlined"
		rounded
		:items="searchPosts"
		@update:modelValue="search"
	></v-autocomplete>
</template>
