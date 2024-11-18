<script setup>
import { useAuthStore } from '@/stores/auth.store'
import { useHomeStore } from '@/stores/home.store'

const store = useAuthStore()
const homeStore = useHomeStore()

const router = useRouter()
const route = useRoute()

const isNotValidated = ref(false)

const sendValidateOTT = (data) => {
  store
    .validateOTT({
      oneTimeToken: data
    })
    .then((r) => {
      if (r.responseCode == '2000000') {
        router.replace('/venue')
        homeStore.getSportItems()
        homeStore.getCityItems()
        homeStore.getFees()
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

onMounted(() => {
  const param = route.query.param
  sendValidateOTT(param)
})
</script>

<template>
  <PageSpinLoader v-model:is-loading="store.loading" />
  <template v-if="isNotValidated == true">
    <VContainer>
      <h1>Token Not Valid</h1>
    </VContainer>
  </template>
</template>
