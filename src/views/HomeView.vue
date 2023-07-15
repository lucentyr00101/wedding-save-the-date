<template>
  <div id="invitation">
    <div>
      <HeaderImage />
      <Content />
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderImage from '@/components/HeaderImage.vue'
import Content from '@/components/Content/ContentContainer.vue'
import axios from 'axios'
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';
import { userData } from '@/stores/user'

const route = useRoute()
const id = route.query.id
const userStore = userData()
const { setUserValues } = userStore

onMounted(() => {
  checkUUID()
})

const checkUUID = async () => {
  try {
    const { data } = await axios.get(`/invitees/${id}`)
    setUserValues(data)
  } catch (e) {
    console.log(e)
    router.push({ path: '/404' })
  }
}


</script>

<style lang="stylus" scoped>
#invitation
  max-width 1000px
  margin 0 auto
  background url('@/assets/bg.jpg')
  background-size cover
  background-repeat no-repeat
  min-height 100vh
</style>