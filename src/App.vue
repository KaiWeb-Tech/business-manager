<script setup lang="ts">
import {RouterLink, RouterView, useRoute} from 'vue-router'
import HeaderComponent from "@/components/HeaderComponent.vue";
import {computed, ref} from "vue";

const route = useRoute();
const showHeader = computed(() => route.meta.showHeader);
</script>

<template>
  <HeaderComponent v-if="showHeader" />
  <RouterView/>
</template>

<style scoped></style>
