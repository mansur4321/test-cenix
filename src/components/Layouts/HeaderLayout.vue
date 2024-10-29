<script setup lang="ts">
import SearchInput from "../UI-blocks/SearchInput.vue";
</script>

<template>
	<v-app-bar :elevation="2">
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

		<div class="search-wrapper ml-5 w-33 mr-5">
			<search-input />
		</div>
	</v-app-bar>
</template>

<style lang="scss" scoped>
.search-wrapper {
	width: 600px;
	margin-right: 50px;
}
</style>
