<script setup lang="ts">
import {NCard, NIcon} from 'naive-ui'
import type {Component} from "vue";
import {useRouter} from "vue-router";

const props = defineProps<{
  title: string;
  subtitle: string;
  icon: Component;
  isActive: boolean;
  path: string;
}>()

const route = useRouter();

function goTo(path: any) {
  route.push(path)
}

</script>

<template>
  <button @click="goTo(path)" :disabled="!isActive" class="w-full cursor-pointer hover:scale-105 transition-all">
    <n-card class="icon-card" :style="{borderRadius: '10px', zIndex: -10}">
      <div class="flex flex-col gap-2 items-center">
        <n-icon :component="icon!" size="80"/>
        <h3>{{ title }}</h3>
        <p>{{ subtitle }}</p>
      </div>
    </n-card>
  </button>
</template>

<style scoped>

</style>