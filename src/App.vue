<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { usePostsData } from "./stores/index";

const postsData = usePostsData();
const searchString = ref("");

const searchPosts = computed((): string[] => {
	return postsData.posts.map((post) => post.name);
});

onMounted(() => {
	postsData.getPostsData();
});
</script>

<template>
	<v-app>
		<v-app-bar
			:elevation="2"
			class="pl-8 pr-10"
		>
			sdc
			<template v-slot:prepend>
				<a
					href="https://cenix.pro/"
					target="_blank"
				>
					<img
						width="200"
						height="50"
						decoding="async"
						src="https://cenix.pro/wp-content/uploads/2021/10/logo-1.svg"
						loading="lazy"
						alt="cenix.pro icon"
					/>
				</a>
			</template>

			<v-app-bar-title class="text-left text-h4">Posts</v-app-bar-title>

			<v-autocomplete
				v-model="searchString"
				class="mb-n6 w-300px"
				label="Search"
				:items="searchPosts"
				variant="underlined"
			></v-autocomplete>
		</v-app-bar>

		<main class="d-flex flex-sm-wrap ga-4"></main>
	</v-app>
</template>

<style scoped></style>
