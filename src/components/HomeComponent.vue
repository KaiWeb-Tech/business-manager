<script setup lang="ts">
import {NButton} from 'naive-ui'
import FooterComponent from "@/components/FooterComponent.vue";
import router from "@/router";

function toToConnectionPage() {
  router.push({name: 'login'})
}
</script>

<template>
  <div class="home-page-container">
    <div class="flex flex-row items-center gap-4">
      <div class="w-24">
        <img src="@/assets/images/logo_black.png" alt="">
      </div>
      <h1 class="font-primary">Alfred Digital</h1>
    </div>
    <h2 class="text-center">
      Veuillez vous connecter pour accéder à votre tableau de bord
    </h2>
    <n-button type="primary" color="black" size="large" strong @click="toToConnectionPage">
      Se connecter
    </n-button>
  </div>
  <FooterComponent />
</template>

<style scoped></style>