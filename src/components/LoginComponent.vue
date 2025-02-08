<script setup lang="ts">
import {NCard, NButton, NForm, NFormItem, type FormInst, NInput, NAlert} from 'naive-ui'
import FooterComponent from "@/components/FooterComponent.vue";
import {onMounted, reactive, ref} from "vue";
import formRules from '@/utils/rules.json'
import apiClient from "@/services/api.ts";

//----------------------REF----------------------

const formRef = ref<FormInst | null>(null);
const formValue = ref(formRules.connection)
const errorMessage = ref<string | null>(null);

function handleSubmit() {
  errorMessage.value = null
  formRef.value?.validate(async (errors: any) => {
    if (!errors) {
      try {
        const response = await apiClient.post('/auth/login', {
          email: formValue.value.fields.email,
          password: formValue.value.fields.password,
        });

        const token = response.data.token;
        localStorage.setItem('bmToken', token);

        window.location.href = '/dashboard';
      } catch (error: any) {
        if (error.response && error.response.status === 400) {
          errorMessage.value = 'Email ou mot de passe incorrect.';
        } else {
          errorMessage.value = 'Une erreur est survenue. Veuillez réessayer.';
        }
      }
    } else {
      console.log(errors);
    }
  });
}

onMounted(() => {
  setTimeout(() => {
    const card = document.querySelector('.login-card') as HTMLElement
    if (card) {
      card.style.opacity = '1'
    }
  }, 200)
})

</script>

<template>
  <n-card class="login-card" :style="{borderRadius: '10px'}">
    <div class="flex flex-col gap-4">
      <div class="flex flex-col items-center gap-4">
        <div class="w-24">
          <img src="@/assets/images/logo_black.png" alt="Logo Alfred Digital">
        </div>
        <h2 class="font-primary">Se connecter</h2>
      </div>
      <div>
        <n-form
            ref="formRef"
            :model="formValue.fields"
            :style="{ maxWidth: '640px' }"
            size="large"
            :rules="formValue.rules"
        >

          <n-form-item  :label="formValue.labels.email" path="email">
            <n-input v-model:value="formValue.fields.email" placeholder="Saisissez votre email" type="text"/>
          </n-form-item>

          <n-form-item :label="formValue.labels.password" path="password">
            <n-input v-model:value="formValue.fields.password" placeholder="Saisissez votre mot de passe" type="password"/>
          </n-form-item>

          <n-form-item>
            <n-button :style="{width: '100%', borderRadius: '5px'}" color="#1A202C" attr-type="button"
                      @click="handleSubmit">
              Connexion
            </n-button>
          </n-form-item>
          <n-alert v-if="errorMessage" title="" type="error" closable>
            {{errorMessage}}
          </n-alert>
        </n-form>
      </div>
    </div>
  </n-card>
  <FooterComponent/>
</template>

<style scoped>
.login-card {
  opacity: 0;
  transition-property: opacity;
  transition-duration: 0.2s;
}
</style>
