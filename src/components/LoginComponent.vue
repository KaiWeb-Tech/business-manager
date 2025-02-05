<script setup lang="ts">
import {NCard, NButton, NForm, NFormItem, type FormInst, NInput} from 'naive-ui'
import FooterComponent from "@/components/FooterComponent.vue";
import {onMounted, reactive, ref} from "vue";
import formRules from '@/utils/rules.json'

const formRef = ref<FormInst | null>(null);
const formValue = ref(formRules.connection)

function handleSubmit() {
  formRef.value?.validate((errors: any) => {
    if (!errors) {
      console.log('success')
    } else {
      console.log(errors)
    }
  })
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
