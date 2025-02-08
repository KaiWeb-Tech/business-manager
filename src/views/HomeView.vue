<script setup lang="ts">
import HomeComponent from '@/components/HomeComponent.vue'
import { useRouter } from 'vue-router';
import {onMounted} from "vue";

const router = useRouter();

onMounted(() => {
  const token = localStorage.getItem('bmToken');
  if (token) {
    router.push('/dashboard');
  }
});
</script>

<template>
  <main class="home-view-main">
    <HomeComponent />
  </main>
</template>
