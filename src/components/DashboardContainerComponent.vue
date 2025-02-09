<script setup lang="ts">
import {useAuthStore} from "@/stores/authStore.ts";
import {computed, onMounted, ref} from "vue";
import CardComponent from "@/components/CardComponent.vue";
import {CalendarOutline, DocumentTextOutline, DocumentOutline, PeopleOutline} from '@vicons/ionicons5'
import {BoxMultiple20Regular, Receipt20Regular} from '@vicons/fluent'
import {ReportData} from '@vicons/carbon'

const divider = ref(true)

const authStore = useAuthStore();
authStore.setUser();

const user = computed(() => authStore.user);

const cards = [
  {
    icon: CalendarOutline,
    title: 'Calendrier',
    subtitle: 'Accédez rapidement à vos événements et rendez-vous.',
    active: true
  },
  {
    icon: DocumentTextOutline,
    title: 'Factures',
    subtitle: 'Accédez rapidement à vos événements et rendez-vous.',
    active: true
  },
  {
    icon: DocumentOutline,
    title: 'Devis',
    subtitle: 'Accédez rapidement à vos événements et rendez-vous.',
    active: true
  },
  {
    icon: Receipt20Regular,
    title: 'Créances',
    subtitle: 'Accédez rapidement à vos événements et rendez-vous.',
    active: true
  },
  {
    icon: BoxMultiple20Regular,
    title: 'Stock',
    subtitle: 'Accédez rapidement à vos événements et rendez-vous.',
    active: true
  },
  {
    icon: PeopleOutline,
    title: 'Contacts',
    subtitle: 'Accédez rapidement à vos événements et rendez-vous.',
    active: true
  },
  {
    icon: ReportData,
    title: 'Rapports',
    subtitle: 'Accédez rapidement à vos événements et rendez-vous.',
    active: true
  },
]

onMounted(() => {

})
</script>

<template>
  <div class="w-full flex flex-col justify-center">
    <div class="text-center">
      <h2>Bienvenue</h2>
      <h3>{{ user!.companyName }}</h3>
    </div>
    <div class="w-[1200px] py-10 opacity-10">
      <hr v-if="divider">
    </div>
    <div class="card-container">
      <CardComponent v-for="card in cards"
                     :icon="card.icon"
                     :title="card.title"
                     :subtitle="card.subtitle"
                     :isActive="card.active"
      />
    </div>
  </div>
</template>

<style scoped>

</style>