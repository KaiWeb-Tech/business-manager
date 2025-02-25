<script setup lang="ts">
import {ref, computed, watch} from "vue";
import SideMenuLayout from "@/components/layouts/SideMenuLayout.vue";
import {ApiAgz} from "@/services/apiAgendize.ts";
import {NDrawer, NDataTable, NDrawerContent, type DrawerPlacement, NDivider, NInput} from 'naive-ui'
import {useProfileStore} from "@/stores/profileStore.ts";
import type {RowData} from "naive-ui/es/data-table/src/interface";

const profileStore = useProfileStore();
const profile = computed(() => profileStore.profile);

const errorMessage = ref<string | null>(null);
const clientsList = ref<any>([]);
const loading = ref(true)
const loadingPanel = ref(true)
const selectedContact = ref<any | null>(null)
const showPanel = ref(false)
const placement = ref<DrawerPlacement>('right');
const searchQuery = ref<string>("")

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

async function getClients(currentProfile: any) {
  errorMessage.value = null
  loading.value = true

  try {
    clientsList.value = await ApiAgz.getContacts(currentProfile.settings!.api_key, currentProfile.settings!.token)
  } catch (error) {
    errorMessage.value = 'Oups';
  } finally {
    loading.value = false
  }
}

const filter = computed(() => {
  if (!searchQuery.value || searchQuery.value.trim() === "") {
    return clientsList.value;
  }

  const query = searchQuery.value.toLowerCase();

  return clientsList.value?.filter((item: any) => {
    const firstNameMatch =
        item.firstName && typeof item.firstName === "string" && item.firstName.toLowerCase().includes(query);
    const lastNameMatch =
        item.lastName && typeof item.lastName === "string" && item.lastName.toLowerCase().includes(query);
    const misc4Match =
        item.misc4 && typeof item.misc4 === "string" && item.misc4.toLowerCase().includes(query);
    const misc2Match =
        item.misc2 && typeof item.misc4 === "string" && item.misc2.toLowerCase().includes(query);
    const emailMatch =
        item.emailAddresses &&
        Array.isArray(item.emailAddresses) &&
        item.emailAddresses[0] &&
        typeof item.emailAddresses[0].email === "string" &&
        item.emailAddresses[0].email.toLowerCase().includes(query);

    return firstNameMatch || lastNameMatch || emailMatch || misc4Match || misc2Match;
  }) || [];
})

watch(profile, async (newProfile) => {
  if (newProfile && newProfile.settings) {
    await getClients(newProfile);
  }
}, { immediate: true });
</script>

<template>
  <SideMenuLayout>
    <template v-slot:content>
      <h3>Liste des clients</h3>
      <n-input placeholder="Recherche par nom, prénom, email ou immatriculation" v-model:value="searchQuery" />
      <n-data-table :pagination="{ pageSize: 35 }" :columns="columns" :row-props="rowProps" :data="filter"
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