<script setup lang="ts">
import {type MenuOption, NMenu, NConfigProvider, darkTheme} from 'naive-ui'
import {h, ref, watch} from 'vue'
import {RouterLink} from 'vue-router'
import { useRoute } from 'vue-router'

const route = useRoute()
const theme = ref(darkTheme)
const activeKey = ref<string | null>(null);

watch(
    () => route.name,
    (newRouteName) => {
      if (newRouteName) {
        activeKey.value = newRouteName.toString();
      }
    },
    { immediate: true } // Exécute la watcher dès le montage du composant
);

const menuOptions: MenuOption[] = [
  {
    label: 'Calendrier',
    children: [
      {
        label: () =>
            h(
                RouterLink,
                {
                  to: {
                    name: 'calendar',
                  }
                },
                {default: () => 'Liste'}
            ),
        key: 'calendar',
      }
    ]
  },
  {
    label: 'Facturation',
    key: 'billing',
    children: [
      {
        label: () =>
            h(
                RouterLink,
                {
                  to: {
                    name: 'estimates',
                  }
                },
                {default: () => 'Devis'}
            ),
        key: 'estimates'
      },
      {
        label: () =>
            h(
                RouterLink,
                {
                  to: {
                    name: 'invoices',
                  }
                },
                {default: () => 'Factures'}
            ),
        key: 'invoices'
      },
      {
        label: () =>
            h(
                RouterLink,
                {
                  to: {
                    name: 'soon',
                  }
                },
                {default: () => 'Créances'}
            ),
        key: 'claims'
      },
      {
        label: () =>
            h(
                RouterLink,
                {
                  to: {
                    name: 'soon',
                  }
                },
                {default: () => 'Rapports'}
            ),
        key: 'report'
      }
    ]
  },
  {
    label: () =>
        h(
            RouterLink,
            {
              to: {
                name: 'contacts',
              }
            },
            {default: () => 'Contacts'}
        ),
    key: 'contacts',
  },
  {
    label: () =>
        h(
            RouterLink,
            {
              to: {
                name: 'soon',
              },
            },
            {default: () => 'Stock'}
        ),
    key: 'stock',
  },
]
</script>

<template>
  <div class="flex flex-row">
    <div class="min-w-[220px] h-screen bg-primary-black sticky left-0 top-0">
      <div class="w-full flex flex-row justify-center py-2">
        <div class="w-36">
          <router-link :to="{ name: 'dashboard' }">
            <img src="@/assets/images/alfred.png" alt="Alfred">
          </router-link>
        </div>
      </div>
      <div class="py-2"></div>
      <div class="text-white">
        <n-config-provider :theme="theme">
          <n-menu :options="menuOptions" :default-expand-all="true" v-model:value="activeKey"/>
        </n-config-provider>
      </div>
    </div>
    <section class="p-4 flex flex-col gap-4 scroll-auto overflow-auto">
      <slot name="content" />
    </section>
  </div>
</template>

<style scoped>

</style>