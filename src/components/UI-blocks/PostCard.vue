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
									<v-icon
										icon="mdi-pencil"
										size="small"
									></v-icon>
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
									<v-icon
										icon="mdi-delete"
										size="small"
									></v-icon>
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
		top: 6px;
		right: 6px;
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
