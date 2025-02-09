<script setup lang="ts">
import {NCard, NIcon} from 'naive-ui'
import type {Component} from "vue";

const props = defineProps<{
  title: String,
  subtitle: String,
  icon: Component,
  isActive: Boolean
}>()

</script>

<template>
  <button :disabled="!isActive" class="cursor-pointer w-auto hover:scale-105 transition-all">
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