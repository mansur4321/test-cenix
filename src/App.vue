<script setup lang="ts">
import HeaderLayout from "./components/Layouts/HeaderLayout.vue";
import MainLayout from "./components/Layouts/MainLayout.vue";
import FooterLayout from "./components/Layouts/FooterLayout.vue";
</script>

<template>
	<v-app class="text-left">
		<header-layout />

		<main-layout />

		<footer-layout />
	</v-app>
</template>
