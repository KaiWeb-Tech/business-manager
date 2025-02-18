<script setup lang="ts">
import {
  NButton,
  NTag,
  NCard,
  NDrawer,
  NDrawerContent,
  NIcon,
  NDivider,
  NForm,
  NAlert,
  NInput,
  NFormItem,
  type FormInst
} from 'naive-ui'
import {useAuthStore} from '@/stores/authStore';
import {computed, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {UserAvatarFilledAlt, Logout} from '@vicons/carbon'
import router from "@/router";
import {useProfileStore} from "@/stores/profileStore.ts";
import formRules from "@/utils/rules.json";
import {ApiClient} from "@/services/apiClient.ts";

const profile = ref<any | null>(null)
const show = ref(false)
const formRef = ref<FormInst | null>(null);
const formValue = ref(formRules.profile)
const errorMessage = ref<string | null>(null);

const profileStore = useProfileStore();
const authStore = useAuthStore();

function logout() {
  authStore.logout();
  router.replace('/login');
}

function loadingFormValues(currentProfile: any) {
  formValue.value.fields.company_name = currentProfile.company_name ?? ''
  formValue.value.fields.email = currentProfile.email
  formValue.value.fields.vf_account = currentProfile.settings!.vf_account
  formValue.value.fields.vf_token = currentProfile.settings!.vf_token
  formValue.value.fields.api_key = currentProfile.settings!.api_key
  formValue.value.fields.token = currentProfile.settings!.token
}

function handleSubmit() {
  errorMessage.value = null
  formRef.value?.validate(async (errors: any) => {
    if (!errors) {
      try {
        const body = {
          company_name: formValue.value.fields.company_name,
          email: formValue.value.fields.email,
          vf_account: formValue.value.fields.vf_account,
          vf_token: formValue.value.fields.vf_token,
          api_key: formValue.value.fields.api_key,
          token: formValue.value.fields.token,
        }

        // const response = await ApiClient.login(body);
      } catch (error: any) {
        console.log(error)
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

async function getProfile() {
  ApiClient.getProfile().then(res => {
    profileStore.setProfile(res)
    profile.value = res
    loadingFormValues(res)
  })
}

onMounted(async () => {
  await getProfile()
})
</script>

<template>
  <header class="w-full flex flex-row justify-center px-4">
    <div class="w-[1200px] flex flex-row justify-between">
      <div class="flex flex-row items-center gap-4">
        <div class="w-20">
          <img src="@/assets/images/logo_black.png" alt="Logo Alfred Digital">
        </div>
        <h2 class="font-primary hidden md:block">Alfred Digital</h2>
      </div>
      <div class="content-center">
        <div class="flex gap-4 items-center">
          <button class="button-tag-default" @click="show = true">
            <n-tag size="large" type="info" :style="{zIndex: -10}">
              <span class="hidden md:inline">{{ profile?.email! ?? '' }}</span>
              <template #avatar>
                <n-icon size="24" :component="UserAvatarFilledAlt"/>
              </template>
            </n-tag>
          </button>
          <n-button type="primary" color="black" size="large" strong @click="logout">
            <span class="hidden md:inline mr-1">Déconnexion</span>
            <n-icon size="24" :component="Logout"/>
          </n-button>
        </div>
      </div>
    </div>
  </header>
  <n-drawer v-model:show="show" :width="502">
    <n-drawer-content title="Profil" closable>
      <n-form
          ref="formRef"
          :model="formValue.fields"
          :style="{ maxWidth: '640px' }"
          size="large"
          :rules="formValue.rules"
      >
        <n-form-item :label="formValue.labels.company_name" path="email">
          <n-input disabled v-model:value="formValue.fields.company_name" placeholder="Saisissez votre email"
                   type="text"/>
        </n-form-item>

        <n-form-item :label="formValue.labels.email" path="email">
          <n-input disabled v-model:value="formValue.fields.email!" placeholder="Saisissez le nom de votre entreprise"
                   type="text"/>
        </n-form-item>
        <div class="flex flex-col gap-4">
          <n-card>
            <h4>VosFactures.fr</h4>
            <n-divider />
            <n-form-item :label="formValue.labels.vf_account" path="vf_account">
              <n-input disabled v-model:value="formValue.fields.vf_account!" placeholder="Saisissez votre nom de compte"
                       type="text"/>
            </n-form-item>

            <n-form-item :label="formValue.labels.vf_token" path="vf_token">
              <n-input disabled v-model:value="formValue.fields.vf_token!" placeholder="Saisissez votre token API"
                       type="text"/>
            </n-form-item>
          </n-card>

          <n-card>
            <h4>Agendize</h4>
            <n-divider />
            <n-form-item :label="formValue.labels.api_key" path="api_key">
              <n-input disabled v-model:value="formValue.fields.api_key!" placeholder="Saisissez votre clé API"
                       type="text"/>
            </n-form-item>

            <n-form-item :label="formValue.labels.token" path="token">
              <n-input disabled v-model:value="formValue.fields.token!" placeholder="Saisissez votre token API"
                       type="text"/>
            </n-form-item>
          </n-card>
        </div>

        <n-form-item>
          <n-button disabled :style="{width: '100%', borderRadius: '5px', position: 'absolute', bottom: '0px'}"
                    color="#1A202C" attr-type="button"
                    @click="handleSubmit">
            Modifier
          </n-button>
        </n-form-item>
        <n-alert title="Information" type="info">
          Fonctionnalité de modification bientôt disponible
        </n-alert>
        <n-alert v-if="errorMessage" title="" type="error" closable>
          {{ errorMessage }}
        </n-alert>
      </n-form>
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped>

</style>