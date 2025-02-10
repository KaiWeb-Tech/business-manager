<script setup lang="ts">
import {useAuthStore} from "@/stores/authStore.ts";
import {computed, onMounted, ref} from "vue";
import CardComponent from "@/components/CardComponent.vue";
import {CalendarOutline, DocumentTextOutline, DocumentOutline, PeopleOutline} from '@vicons/ionicons5'
import {BoxMultiple20Regular, Receipt20Regular} from '@vicons/fluent'
import {ReportData} from '@vicons/carbon'
import FooterComponent from "@/components/FooterComponent.vue";

const divider = ref(true)

const authStore = useAuthStore();
authStore.setUser();

const user = computed(() => authStore.user);

const cards = [
  {
    icon: CalendarOutline,
    title: 'Calendrier',
    subtitle: 'Accédez rapidement à vos événements et rendez-vous.',
    active: true,
    path: 'calendar'
  },
  {
    icon: DocumentTextOutline,
    title: 'Factures',
    subtitle: 'Générez, consultez et gérez vos factures en un clic.',
    active: false,
    path: 'soon'
  },
  {
    icon: DocumentOutline,
    title: 'Devis',
    subtitle: 'Générez, consultez et gérez vos devis en un clic.',
    active: false,
    path: 'soon'
  },
  {
    icon: Receipt20Regular,
    title: 'Créances',
    subtitle: 'Générez, consultez et gérez vos créances en un clic.',
    active: false,
    path: 'soon'
  },
  {
    icon: BoxMultiple20Regular,
    title: 'Stock',
    subtitle: 'Gardez un œil sur votre inventaire et gérez vos stocks efficacement.',
    active: false,
    path: 'soon'
  },
  {
    icon: PeopleOutline,
    title: 'Contacts',
    subtitle: 'Gérez vos contacts',
    active: true,
    path: 'contacts'
  },
  {
    icon: ReportData,
    title: 'Rapports',
    subtitle: 'Analysez vos données et générez des rapports personnalisés.',
    active: false,
    path: 'soon'
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
    <div class="max-w-[1200px] py-10 opacity-10">
      <hr v-if="divider">
    </div>
    <div class="card-container">
      <CardComponent v-for="card in cards"
                     :title="card.title"
                     :subtitle="card.subtitle"
                     :icon="card.icon"
                     :isActive="card.active"
                     :path="card.path"
      />
    </div>
  </div>
</template>

<style scoped>

</style>