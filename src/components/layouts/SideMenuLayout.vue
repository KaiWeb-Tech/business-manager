<script setup lang="ts">
import {type MenuOption, NMenu, NConfigProvider, darkTheme } from 'naive-ui'
import {h, type Component, ref} from 'vue'
import {RouterLink} from 'vue-router'

const theme = ref(darkTheme )

// function renderIcon(icon: Component) {
//   return () => h(NIcon, null, { default: () => h(icon) })
// }

const menuOptions: MenuOption[] = [
  {
    label: 'Calendrier',
    key: 'calendar',
    disabled: false,
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
        key: 'list'
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
                    name: 'soon',
                  }
                },
                {default: () => 'Devis'}
            ),
        key: ''
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
                {default: () => 'Facture'}
            ),
        key: 'invoice'
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
                {default: () => 'Créance'}
            ),
        key: 'claim'
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
                {default: () => 'Rapport'}
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
              }
            },
            {default: () => 'Stock'}
        ),
    key: 'stock',
  },
]
</script>

<template>
  <div class="w-[220px] h-screen bg-primary-black">
    <div class="w-full flex flex-row justify-center py-2">
      <div class="w-36">
        <img src="@/assets/images/alfred.png" alt="Alfred">
      </div>
    </div>
    <div class="py-2"></div>
    <div class="text-white">
      <n-config-provider :theme="theme">
        <n-menu :options="menuOptions"/>
      </n-config-provider>
    </div>
  </div>
</template>

<style scoped>

</style>