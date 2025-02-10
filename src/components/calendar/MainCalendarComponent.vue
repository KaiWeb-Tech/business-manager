<script setup lang="ts">
import SideMenuLayout from "@/components/layouts/SideMenuLayout.vue";
import {onMounted, ref, computed} from "vue";
import apiAgz from "@/services/apiAgendize.ts";
import {NCard, NDivider} from 'naive-ui'
import { format } from "date-fns";
import {useAuthStore} from "@/stores/authStore.ts";

const authStore = useAuthStore();
const user = computed(() => authStore.user);

const errorMessage = ref<string | null>(null);
const appointmentsList = ref([]);

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return format(date, "dd/MM/yyyy à HH:mm");
}

async function getAppointments() {
  errorMessage.value = null

  try {
    // const response = await apiAgz.get("/2.1/scheduling/companies/0/appointments?apiKey=654ccd4decfedc53d6eb06a48070520213aae83c&token=b9b1b2dd2d96e6ec85c2c59642d4ea50dd303e8469666cba83665ea947263ac0");
    const response = await apiAgz.get(`/2.1/scheduling/companies/0/appointments?apiKey=${user.value.apiKey}&token=${user.value.token}`);
    console.log(response.data.items);
    appointmentsList.value = response.data.items;
  } catch (error) {
    errorMessage.value = 'Oups';
  }
}

onMounted(() => {
  getAppointments();
})
</script>

<template>
  <SideMenuLayout>
    <template v-slot:content>
      <div v-for="(item, index) in appointmentsList" :key="index">
        <n-card :style="{borderRadius: '10px'}">
          <h4>{{item.client.lastName}} {{item.client.firstName}}</h4>
          <div>
            <strong>Email :</strong> {{item.client.email!}}
          </div>
          <div>
            <strong>Tel:</strong> {{item.client.phone!}}
          </div>
          <div>
            <strong>Motif :</strong> {{item.service.name}}
          </div>
          <n-divider />
          <div>
            <strong>Date :</strong> {{ formatDate(item.start.dateTime) }}
          </div>
        </n-card>
      </div>
    </template>
  </SideMenuLayout>
</template>

<style scoped>

</style>