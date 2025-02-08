<script setup lang="ts">
import LoginComponent from "@/components/LoginComponent.vue";
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
  <main class="login-view-main">
    <LoginComponent />
  </main>
</template>

<style scoped>

</style>