<script setup lang="ts">
import SideMenuLayout from "@/components/layouts/SideMenuLayout.vue";
import {onMounted, ref, computed, h} from "vue";
import {ApiAgz} from "@/services/apiAgendize.ts";
import {NDrawer, NTooltip, NDataTable, NDrawerContent, type DrawerPlacement, NDivider} from 'naive-ui'
import {format} from "date-fns";
import {useAuthStore} from "@/stores/authStore.ts";
import {useProfileStore} from "@/stores/profileStore.ts";
import type {RowData} from "naive-ui/es/data-table/src/interface";

const authStore = useAuthStore();
const profileStore = useProfileStore();
const profile = computed(() => profileStore.profile);

const errorMessage = ref<string | null>(null);
const clientsList = ref([]);
const loading = ref(true)
const loadingPanel = ref(true)
const selectedContact = ref<any | null>(null)
const showPanel = ref(false)
const placement = ref<DrawerPlacement>('right');

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return format(date, "dd/MM/yyyy HH:mm");
}

const columns = [
  {
    title: 'Nom',
    key: 'firstName',
    width: 165,
    sorter: (row1: any, row2: any) => row1.firstName.localeCompare(row2.firstName)
  },
  {
    title: 'Prénom',
    key: 'lastName',
    ellipsis: true,
    sorter: (row1: any, row2: any) => row1.lastName.localeCompare(row2.lastName)
  },
  {
    title: 'Email',
    key: 'emailAddresses[0].email',
    ellipsis: true,
    sorter: (row1: any, row2: any) => row1.emailAddresses[0].email.localeCompare(row2.emailAddresses[0].email)
  },
  {
    title: 'Téléphone',
    key: 'phoneNumbers[0].number',
    ellipsis: true,
  },
  {
    title: 'Immatriculation',
    key: 'misc4',
    ellipsis: true,
  },
  {
    title: 'Marque',
    key: 'misc2',
    ellipsis: true,
  },
]

/**
 * Used to trigger the row on click.
 * @param row
 */
function rowProps(row: RowData) {
  return {
    style: 'cursor: pointer;',
    onClick: async () => {
      activate('right')
      loadingPanel.value = true;
      selectedContact.value = row;
    }
  }
}

/**
 * Used to open the panel.
 * @param place
 */
const activate = (place: DrawerPlacement) => {
  showPanel.value = true;
  placement.value = place;
};

async function getClients() {
  errorMessage.value = null
  loading.value = true

  try {
    const currentProfile = profile.value
    clientsList.value = await ApiAgz.getContacts(currentProfile.settings!.api_key, currentProfile.settings!.token)
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
      <n-data-table :pagination="{ pageSize: 35 }" :columns="columns" :row-props="rowProps" :data="clientsList"
                    :loading="loading"/>
    </template>
  </SideMenuLayout>
  <n-drawer v-model:show="showPanel" :placement="placement" :width="450">
    <n-drawer-content :title="`${selectedContact.firstName} ${selectedContact.lastName}`" closable>
      <table class="w-full">
        <thead>
        <tr>
          <th colspan="2"><h4>Coordonnées</h4></th>
        </tr>
        </thead>
        <div class="py-2"></div>
        <tbody>
        <tr>
          <td>Email :</td>
          <td>{{ selectedContact.emailAddresses[0].email }}</td>
        </tr>
        <tr>
          <td>Ville :</td>
          <td>{{selectedContact.address.city! || '_'}} {{selectedContact.address.zipCode! || ''}}</td>
        </tr>
        <tr>
          <td>Adresse :</td>
          <td>{{selectedContact.address.street! || '_'}}</td>
        </tr>
        <tr>
          <td>Autre adresse :</td>
          <td>{{selectedContact.address.otherStreet! || '_'}}</td>
        </tr>
        </tbody>
      </table>
      <n-divider />
      <table class="w-full">
        <thead>
        <tr>
          <th colspan="2"><h4>Informations du véhicule</h4></th>
        </tr>
        </thead>
        <div class="py-2"></div>
        <tbody>
        <tr>
          <td>Assurance :</td>
          <td>{{selectedContact.misc1}}</td>
        </tr>
        <tr>
          <td>Marque du véhicule :</td>
          <td>{{selectedContact.misc2}}</td>
        </tr>
        <tr>
          <td>Modèle du véhicule :</td>
          <td>{{selectedContact.misc3}}</td>
        </tr>
        <tr>
          <td>Immatriculation :</td>
          <td>{{selectedContact.misc4}}</td>
        </tr>
        <tr>
          <td>Motorisation :</td>
          <td>{{selectedContact.misc5}}</td>
        </tr>
        <tr>
          <td>Cadeau choisi :</td>
          <td>{{selectedContact.misc6}}</td>
        </tr>
        <tr>
          <td>Montant de la franchise :</td>
          <td>{{selectedContact.misc7}}</td>
        </tr>
        <tr>
          <td>Véhicule personnel :</td>
          <td>{{selectedContact.misc8}}</td>
        </tr>
        </tbody>
      </table>
      <n-divider />
      <table class="w-full">
        <thead>
        <tr>
          <th colspan="2"><h4>Note</h4></th>
        </tr>
        </thead>
        <div class="py-2"></div>
        <tbody>
        <tr>
          <td>{{ selectedContact.description }}</td>
        </tr>
        </tbody>
      </table>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped>
th, td {
  padding: 0 20px 10px 15px;
}

thead {
  text-align: left;
}
</style>