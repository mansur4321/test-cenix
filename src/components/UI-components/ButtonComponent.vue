<script setup lang="ts">
import { defineEmits } from "vue";

const emit = defineEmits(["clickOnBtn"]);
const generateClick = () => {
	emit("clickOnBtn");
};
</script>

<template>
	<v-hover>
		<template v-slot:default="{ isHovering, props }">
			<v-btn
				v-bind="props"
				:variant="isHovering ? 'flat' : 'outlined'"
				:color="'primary'"
				@click="generateClick"
			>
				<template v-slot:prepend>
					<v-icon
						icon="mdi-plus"
						size="x-large"
					></v-icon>
				</template>
				<template v-slot:default> New post </template>
			</v-btn>
		</template>
	</v-hover>
</template>
