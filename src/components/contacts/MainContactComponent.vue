<script setup lang="ts">
import SideMenuLayout from "@/components/layouts/SideMenuLayout.vue";
import {onMounted, ref, computed, h} from "vue";
import {ApiAgz} from "@/services/apiAgendize.ts";
import {NCard, NTooltip, NDataTable} from 'naive-ui'
import { format } from "date-fns";
import {useAuthStore} from "@/stores/authStore.ts";
import {useProfileStore} from "@/stores/profileStore.ts";

const authStore = useAuthStore();
const profileStore = useProfileStore();
const profile = computed(() => profileStore.profile);

const errorMessage = ref<string | null>(null);
const clientsList = ref([]);
const loading = ref(true)

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return format(date, "dd/MM/yyyy HH:mm");
}

const columns = [
  {
    title: 'Nom',
    key: 'firstName',
    width: 165,
  },
  {
    title: 'Prénom',
    key: 'lastName',
    ellipsis: true,
  },
  {
    title: 'Email',
    key: 'emailAddresses[0].email',
    ellipsis: true,
  },
  {
    title: 'Téléphone',
    key: 'phoneNumbers[0].number',
    ellipsis: true,
  },
]

async function getClients() {
  errorMessage.value = null
  loading.value = true

  try {
    const currentProfile = profile.value
    clientsList.value = await ApiAgz.getContacts(currentProfile.apiKey, currentProfile.token)
  } catch (error) {
    errorMessage.value = 'Oups';
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getClients();
})
</script>

<template>
  <SideMenuLayout>
    <template v-slot:content>
      <h3>Liste des clients</h3>
      <n-data-table :columns="columns" :data="clientsList" :loading="loading" />
    </template>
  </SideMenuLayout>
</template>

<style scoped>

</style>