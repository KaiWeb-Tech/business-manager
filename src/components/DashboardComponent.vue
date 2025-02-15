<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';
import {NDivider} from 'naive-ui'
import DashboardContainerComponent from "@/components/DashboardContainerComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import {useAuthStore} from "@/stores/authStore.ts";
import {useProfileStore} from '@/stores/profileStore.ts'
import {ApiClient} from '@/services/api.ts'
import {decodeToken} from "@/utils/jwtDecoder.ts";

const router = useRouter();
const authStore = useAuthStore();
const profileStore = useProfileStore();

authStore.setUser();

const token = localStorage.getItem('bmToken');

function getProfile() {
  ApiClient.getProfile().then(profile => {
    profileStore.setProfile(profile)
  })
}

onMounted(() => {
  getProfile()
})
</script>

<template>
  <section class="max-w-[1200px]">
    <DashboardContainerComponent :user="authStore.user!"/>
  </section>
</template>

<style scoped>

</style>