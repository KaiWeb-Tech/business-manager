<script setup lang="ts">
import SideMenuLayout from "@/components/layouts/SideMenuLayout.vue";
import {onMounted, ref, computed, h} from "vue";
import apiAgz from "@/services/apiAgendize.ts";
import {NCard, NTooltip, NDataTable} from 'naive-ui'
import { format } from "date-fns";
import {useAuthStore} from "@/stores/authStore.ts";

const authStore = useAuthStore();
const user = computed(() => authStore.user);

const errorMessage = ref<string | null>(null);
const clientsList = ref([]);

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

  try {
    // const response = await apiAgz.get("/2.1/scheduling/companies/0/appointments?apiKey=654ccd4decfedc53d6eb06a48070520213aae83c&token=b9b1b2dd2d96e6ec85c2c59642d4ea50dd303e8469666cba83665ea947263ac0");
    const response = await apiAgz.get(`/2.0/clients?apiKey=${user.value.apiKey}&token=${user.value.token}`);
    console.log(response.data.items);
    clientsList.value = response.data.items;
  } catch (error) {
    errorMessage.value = 'Oups';
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
      <n-data-table :columns="columns" :data="clientsList" />
    </template>
  </SideMenuLayout>
</template>

<style scoped>

</style>