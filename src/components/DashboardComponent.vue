<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';
import {NDivider} from 'naive-ui'
import DashboardContainerComponent from "@/components/DashboardContainerComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

const router = useRouter();
const user = ref<{ id: string; email: string } | null>(null);

onMounted(() => {
})
</script>

<template>
  <section class="max-w-[1200px]">
    <DashboardContainerComponent/>
  </section>
</template>

<style scoped>

</style>