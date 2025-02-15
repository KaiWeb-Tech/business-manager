<script setup lang="ts">
import {RouterLink, RouterView, useRoute} from 'vue-router'
import HeaderComponent from "@/components/HeaderComponent.vue";
import {computed, ref} from "vue";
import FooterComponent from "@/components/FooterComponent.vue";
import {useAuthStore} from "@/stores/authStore.ts";
import {useProfileStore} from "@/stores/profileStore.ts";

const route = useRoute();
const showHeader = computed(() => route.meta.showHeader);

const authStore = useAuthStore();
const profileStore = useProfileStore();

authStore.setUser()
profileStore.setProfile()
</script>

<template>
  <HeaderComponent v-if="showHeader" />
  <div v-if="showHeader" class="py-4"></div>
  <RouterView/>
  <FooterComponent />
</template>

<style scoped></style>
