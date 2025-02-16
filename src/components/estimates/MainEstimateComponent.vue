<script setup lang="ts">
import SideMenuLayout from "@/components/layouts/SideMenuLayout.vue";
import {onMounted, ref, computed, h} from "vue";
import {NButton, NTooltip, NDataTable, NTag, darkTheme} from 'naive-ui'
import {useAuthStore} from "@/stores/authStore.ts";
import {useProfileStore} from "@/stores/profileStore.ts";
import {ApiVf} from "@/services/apiVf.ts";

const authStore = useAuthStore();
const profileStore = useProfileStore();
const profile = computed(() => profileStore.profile);

const errorMessage = ref<string | null>(null);
const estimatesList = ref([]);
const loading = ref(true)

const columns = [
  {
    title: 'N°',
    key: 'number',
    width: 165,
    sorter: (row1: number, row2: number) => row1.number - row2.number
  },
  {
    title: 'Client',
    key: 'buyer_name',
    ellipsis: true,
    sorter: (row1: any, row2: any) => row1.buyer_name.localeCompare(row2.buyer_name)
  },
  {
    title: 'Date',
    key: 'sell_date',
    ellipsis: true,
    sorter: (row1: any, row2: any) => row1.sell_date.localeCompare(row2.sell_date)
  },
  {
    title: 'Montant HT',
    key: 'price_net',
    ellipsis: true,
  },
  {
    title: 'Montant TTC',
    key: 'price_gross',
    ellipsis: true,
  },
  {
    title: 'Facturé',
    key: 'pattern_nr',
    ellipsis: true,
    render(row: any) {
      return h(
          NTag,
          {
            bordered: false,
            type: row.pattern_nr === 1 ? 'warning' : 'primary'
          },
          {default: () => row.pattern_nr === 1 ? 'Non' : 'Oui'}
      )
    }
  },
  {
    title: 'Action',
    key: 'actions',
    render(row: any) {
      return h(
          NButton,
          {
            color: '#1A202C',
            size: 'small',
            onClick: () => show(row)
          },
          {default: () => 'Voir'}
      )
    }
  }
]

function buildEncodedUrl(base: string, path: string, suffix: string): string {
  const encodedPath = encodeURIComponent(path);
  return `${base}${encodedPath}/${suffix}`;
}

function show(row: any) {
  const currentProfile = profile.value
  const url = buildEncodedUrl(
      `https://${currentProfile.settings!.vf_account}/f/`,
      row.number,
      row.token
  )

  window.open(url, '_blank')
}

async function getEstimates() {
  errorMessage.value = null
  loading.value = true

  try {
    const currentProfile = profile.value
    estimatesList.value = await ApiVf.getEstimates(currentProfile.settings!.vf_account, currentProfile.settings!.vf_token)
  } catch (error) {
    errorMessage.value = 'Oups';
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getEstimates();
})
</script>

<template>
  <SideMenuLayout>
    <template v-slot:content>
      <h3>List des devis</h3>
      <n-data-table :columns="columns" :data="estimatesList" :loading="loading"/>
    </template>
  </SideMenuLayout>
</template>

<style scoped>

</style>