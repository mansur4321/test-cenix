<script setup lang="ts">
import { shallowRef, watch, defineProps } from "vue";

import { usePostsData } from "../../stores/posts";

const { overlay, toggleOverlay } = defineProps<{ overlay: boolean; toggleOverlay: () => void }>();
const postsData = usePostsData();

const overlayCorrect = shallowRef(false);
const newNamePost = shallowRef("");

watch(
	() => overlay,
	(mode) => {
		overlayCorrect.value = mode;
	}
);

const addNewPost = (value: string | null = null) => {
	console.log(value);
	if (value === null) {
		value = newNamePost.value;
	}

	toggleOverlay();
	newNamePost.value = "";
	postsData.addNewPost(value);
};
</script>

<template>
	<v-overlay
		v-model="overlayCorrect"
		class="d-sm-flex justify-center align-center"
	>
		<v-confirm-edit
			v-model="newNamePost"
			@cancel="toggleOverlay"
			@save="addNewPost"
		>
			<template v-slot:default="{ model: proxyModel, actions }">
				<v-card
					width="300"
					title="Update"
					color="primary"
				>
					<template v-slot:text>
						<v-text-field
							v-model="proxyModel.value"
							messages="Modify my name"
							autofocus
						></v-text-field>
					</template>

					<template v-slot:actions>
						<v-spacer></v-spacer>

						<component :is="actions"></component>
					</template>
				</v-card>
			</template>
		</v-confirm-edit>
	</v-overlay>
</template>
