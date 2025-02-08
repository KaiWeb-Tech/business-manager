<script setup lang="ts">
import {NButton, NTag, NAvatar, NIcon} from 'naive-ui'
import {useAuthStore} from '@/stores/authStore';
import {computed} from "vue";
import {useRoute} from "vue-router";
import {UserAvatarFilledAlt} from '@vicons/carbon'

const authStore = useAuthStore();
authStore.setUser();

const user = computed(() => authStore.user);

function logout() {
  authStore.logout();
  location.reload()
}

function profile() {
  console.log('TEST')
}
</script>

<template>
  <header class="w-full flex flex-row justify-center">
    <div class="w-[1200px] flex flex-row justify-between">
      <div class="flex flex-row items-center gap-4">
        <div class="w-20">
          <img src="@/assets/images/logo_black.png" alt="Logo Alfred Digital">
        </div>
        <h2 class="font-primary">Alfred Digital</h2>
      </div>
      <div class="content-center">
        <div class="flex gap-4 items-center">
          <button class="button-tag-default" @click="profile">
            <n-tag size="large" type="info" :style="{zIndex: -10}">
              {{ user!.email }}
              <template #avatar>
                <n-icon size="24" :component="UserAvatarFilledAlt"/>
              </template>
            </n-tag>
          </button>
          <n-button type="primary" color="black" size="large" strong @click="logout">
            Déconnexion
          </n-button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>

</style>