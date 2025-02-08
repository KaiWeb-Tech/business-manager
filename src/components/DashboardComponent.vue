<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { decodeToken } from '@/utils/jwtDecoder.ts';

const router = useRouter();
const user = ref<{ id: string; email: string } | null>(null);

onMounted(() => {
  // const token = localStorage.getItem('jwtToken');
  // if (!token) {
  //   router.push('/login');
  //   return;
  // }

  // const decoded = decodeToken();
  // if (!decoded) {
  //   console.error('Invalid or expired token');
  //   router.push('/login');
  //   return;
  // }
  //
  // user.value = { id: decoded.id, email: decoded.email };
})
</script>

<template>
  <h1>Dashboard</h1>
</template>

<style scoped>

</style>