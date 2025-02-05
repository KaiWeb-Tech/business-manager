<script setup lang="ts">
import { ref } from 'vue';
import { Sunny, Moon } from '@vicons/ionicons5'
import { NSwitch, NIcon } from 'naive-ui'

const isDarkMode = ref(false);

const emit = defineEmits<{
	(e: 'changeMode', value: boolean): void;
}>()

const modeStorage = localStorage.getItem('azDarkMode');

if (modeStorage) {
	if (modeStorage === 'dark') {
		isDarkMode.value = true;
		document.documentElement.classList.toggle('dark', isDarkMode.value);
		emit('changeMode', isDarkMode.value)
	}
}

const toggleDarkMode = () => {
	isDarkMode.value = !isDarkMode.value;
	document.documentElement.classList.toggle('dark', isDarkMode.value);
	emit('changeMode', isDarkMode.value)
	const mode = isDarkMode.value ? 'dark' : 'light';
	localStorage.setItem('azDarkMode', mode)
};
</script>

<template>
	<n-switch v-model:value="isDarkMode" :on-update:value="toggleDarkMode" size="medium">
		<template #checked-icon>
			<n-icon :component="Moon" />
		</template>
		<template #unchecked-icon>
			<n-icon :component="Sunny" />
		</template>
	</n-switch>
</template>

<style scoped></style>