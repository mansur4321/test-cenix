<script setup lang="ts">
import PostCard from "../UI-blocks/PostCard.vue";
import PostEditor from "../UI-blocks/PostCreator.vue";
import Pagination from "../UI-blocks/Pagination.vue";
import ButtonComponent from "../UI-components/ButtonComponent.vue";

import { shallowRef, onMounted } from "vue";

import { usePostsData } from "../../stores/index";

const postsData = usePostsData();

const overlay = shallowRef(false);

const toggleOverlay = () => {
	overlay.value = !overlay.value;
};

onMounted(() => {
	postsData.getFirstPagePostsData();
	setTimeout(function () {
		postsData.getPostsData();
	}, 500);
});
</script>

<template>
	<main>
		<v-col
			v-if="postsData.load"
			class="d-sm-flex justify-center align-center"
		>
			<v-progress-circular
				:size="60"
				:width="7"
				color="primary"
				style="margin-top: 150px"
				indeterminate
			></v-progress-circular>
		</v-col>
		<v-col v-else>
			<post-editor
				:overlay="overlay"
				:toggleOverlay="toggleOverlay"
			/>

			<v-row class="mt-15 pl-2 text-h3 d-sm-flex justify-space-between align-center ga-xl-5 w-100">
				Posts

				<button-component @clickOnBtn="toggleOverlay" />
			</v-row>

			<transition name="slide">
				<div class="mt-12 posts-wrapper">
					<post-card
						v-for="(post, index) of postsData.postsByPage"
						:key="post.id"
						:post="post"
						:index="index"
					/>
				</div>
			</transition>

			<pagination />
		</v-col>
	</main>
</template>

<style lang="scss" scoped>
.posts-wrapper {
	display: flex;
	flex-wrap: wrap;
	gap: 16px;
}
</style>
