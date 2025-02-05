<script setup lang="ts">
import { ref } from "vue";

const isVisible = ref(false)
</script>

<template>
	<input type="checkbox" v-model="isVisible" class="absolute bottom-1 left-1 opacity-20 z-10">
	<div v-if="isVisible" class="grid-container-template">
		<div v-for="n in 12" class="grid-item _12"></div>
		<div v-for="n in 10" class="grid-item _10"></div>
		<div v-for="n in 8" class="grid-item _8"></div>
		<div v-for="n in 6" class="grid-item _6"></div>
		<div v-for="n in 4" class="grid-item _4"></div>
	</div>
</template>

<style scoped></style>