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
</script>

<style lang="stylus" scoped>
#invitation
  max-width 1000px
  margin 0 auto
  background url('@/assets/bg.svg')
  background-size cover
  background-repeat no-repeat
  min-height 100vh
</style>