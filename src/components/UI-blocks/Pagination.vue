<script setup lang="ts">
import { computed } from "vue";
import { usePostsData } from "../../stores/posts";

const postsData = usePostsData();

const view = computed(() => {
	return postsData.pagesNumber > 1;
});
</script>

<template>
	<v-pagination
		v-if="view"
		class="mt-8"
		variant="tonal"
		color="primary"
		:length="postsData.pagesNumber"
		:total-visible="7"
		@next="postsData.changePageOnNext"
		@perv="postsData.changePageOnPerv"
		@update:modelValue="postsData.changePageOnNumber"
	>
	</v-pagination>
</template>
