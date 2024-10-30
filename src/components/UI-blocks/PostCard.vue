<script setup lang="ts">
import { defineProps, shallowRef } from "vue";

import { usePostsData } from "../../stores/posts";
import { Post } from "../../constants";

const { post } = defineProps<{ post: Post; index: number }>();

const postsData = usePostsData();

const editingMode = shallowRef(false);
const newPostName = shallowRef(post.name);

const toggleMode = () => {
	editingMode.value = !editingMode.value;
};

const deletePost = () => {
	postsData.deletePost(post.id);
};

const editPost = () => {
	toggleMode();
	postsData.editPost(post.id, newPostName.value);
};
</script>

<template>
	<v-hover>
		<template v-slot:default="{ isHovering, props }">
			<v-card
				v-bind="props"
				class="card"
				:variant="isHovering ? 'flat' : 'tonal'"
				:color="'primary'"
			>
				<template
					v-slot:title
					class="position-relative"
				>
					Post №{{ post.index }}

					<div
						v-if="editingMode"
						class="card__actions"
					>
						<v-tooltip text="save">
							<template v-slot:activator="{ props }">
								<div
									class="card__action cursor-pointer"
									v-bind="props"
									@click="editPost"
								>
									✔
								</div>
							</template>
						</v-tooltip>
					</div>
					<div
						v-else
						class="card__actions"
					>
						<v-tooltip text="edit">
							<template v-slot:activator="{ props }">
								<div
									class="card__action cursor-pointer"
									v-bind="props"
									@click="toggleMode"
								>
									<svg
										viewBox="0 0 32 32"
										width="30px"
										height="30px"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g>
											<path
												:fill="isHovering ? '#fff' : 'rgb(24, 103, 192)'"
												d="m8.82 25.47a1.48 1.48 0 0 0 .41 0l3.77-1.47a3.68 3.68 0 0 0 1.37-.87l14.22-14.13a2.54 2.54 0 0 0 .26-3.55l-1.29-1.32a2.54 2.54 0 0 0 -3.56.26l-14.19 14.21a3.56 3.56 0 0 0 -.87 1.4l-1.4 3.85a1.38 1.38 0 0 0 .34 1.29 1.31 1.31 0 0 0 .94.33zm17.18-20.95a1.14 1.14 0 0 1 .83.32l1.29 1.29a1.54 1.54 0 0 1 -.26 2.13l-.55.55-3.14-3.16.55-.55a1.88 1.88 0 0 1 1.28-.58zm-16.12 15.78a2.7 2.7 0 0 1 .63-1l13-12.94 3.16 3.16-12.94 13a2.7 2.7 0 0 1 -1 .63l-3.73 1.32a.39.39 0 0 1 -.36-.08.35.35 0 0 1 -.09-.3zm19.62 7.7a.5.5 0 0 1 -.5.5h-26a.5.5 0 0 1 0-1h26a.5.5 0 0 1 .5.5z"
											></path>
										</g>
									</svg>
								</div>
							</template>
						</v-tooltip>
						<v-tooltip text="delete">
							<template v-slot:activator="{ props }">
								<div
									class="card__action cursor-pointer"
									v-bind="props"
									@click="deletePost"
								>
									<svg
										enable-background="new 0 0 32 32"
										viewBox="0 0 32 32"
										width="28px"
										height="28px"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g id="Layer_1">
											<g :fill="isHovering ? '#fff' : 'rgb(24, 103, 192)'">
												<path
													d="m19.5 23.75c.5522 0 1-.4478 1-1v-10c0-.5522-.4478-1-1-1s-1 .4478-1 1v10c0 .5522.4478 1 1 1z"
												></path>
												<path
													d="m12.5 23.75c.5522 0 1-.4478 1-1v-10c0-.5522-.4478-1-1-1s-1 .4478-1 1v10c0 .5522.4478 1 1 1z"
												></path>
												<path
													d="m20 4.25c.5522 0 1-.4478 1-1s-.4478-1-1-1h-8c-.5522 0-1 .4478-1 1s.4478 1 1 1z"
												></path>
												<path
													d="m5 5.25c-.5522 0-1 .4478-1 1s.4478 1 1 1h1v18.4c0 2.2599 1.84 4.1 4.1 4.1h11.8c2.2599 0 4.1-1.84 4.1-4.1v-18.4h1c.5522 0 1-.4478 1-1s-.4478-1-1-1h-2-18zm19 2v18.4c0 1.16-.94 2.1-2.1 2.1h-11.8c-1.16 0-2.1-.94-2.1-2.1v-18.4z"
												></path>
											</g>
										</g>
									</svg>
								</div>
							</template>
						</v-tooltip>
					</div>
				</template>
				<template v-slot:text>
					<v-text-field
						v-model="newPostName"
						v-if="editingMode"
						height="40px"
						label="New title"
						required
						@keyup.enter="editPost"
					>
					</v-text-field>
					<div v-else>
						{{ post.name }}
					</div>
				</template>
			</v-card>
		</template>
	</v-hover>
</template>

<style lang="scss" scoped>
.card {
	max-width: 292px;
	min-width: 200px;
	position: relative;
	flex: 1 1 0;

	&__actions {
		position: absolute;
		top: 10px;
		right: 10px;
		display: flex;
		gap: 8px;
	}
	&__action {
		transition: 0.2s;

		&:hover {
			transform: scale(1.2);
		}
	}

	@media (max-width: 480px) {
		max-width: none;
		min-width: 270px;
	}

	@media (max-width: 370px) {
		min-width: 220px;
	}
}
</style>
