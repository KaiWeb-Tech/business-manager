<script setup lang="ts">
import SideMenuLayout from "@/components/layouts/SideMenuLayout.vue";
import {onMounted, ref, computed} from "vue";
import {ApiAgz} from "@/services/apiAgendize.ts";
import {NCard, NDivider, NSpin} from 'naive-ui'
import {format} from "date-fns";
import {useAuthStore} from "@/stores/authStore.ts";
import {useProfileStore} from "@/stores/profileStore.ts";

const authStore = useAuthStore();
const profileStore = useProfileStore();
const profile = computed(() => profileStore.profile);

const errorMessage = ref<string | null>(null);
const appointmentsList = ref<any[]>([]);
const loading = ref(true)

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return format(date, "dd/MM/yyyy à HH:mm");
}

async function getAppointments() {
  errorMessage.value = null
  loading.value = true

  try {
    const currentProfile = profile.value
    appointmentsList.value = await ApiAgz.getAppointments(currentProfile.settings!.api_key, currentProfile.settings!.token)
  } catch (error) {
    errorMessage.value = 'Oups';
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getAppointments();
})
</script>

<template>
  <SideMenuLayout>
    <template v-slot:content>
      <h3>Liste des rendez-vous</h3>
      <n-spin v-if="loading" size="large" />
      <n-card v-else v-for="(item, index) in appointmentsList" :key="index" :style="{borderRadius: '10px', width: '500px'}">
        <h4>{{ item.client.lastName }} {{ item.client.firstName }}</h4>
        <n-divider/>
        <div class="flex flex-row justify-between">
          <div class="w-1/2">
            <div>
              <strong>Email :</strong> {{ item.client.email! }}
            </div>
            <div>
              <strong>Tel:</strong> {{ item.client.phone! }}
            </div>
          </div>
          <n-divider vertical/>
          <div class="w-1/2">
            <div>
              <strong>Motif :</strong> {{ item.service.name }}
            </div>
            <div>
              <strong>Date :</strong> {{ formatDate(item.start.dateTime) }}
            </div>
          </div>
        </div>
      </n-card>
    </template>
  </SideMenuLayout>
</template>

<style scoped>

</style>