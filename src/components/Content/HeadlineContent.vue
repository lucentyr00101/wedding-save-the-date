<template>
  <div class="row">
    <div class="col-6 headline-text animate__animated initial-hide">
      <p>Kyla and</p>
      <p>ranz are</p>
      <p>getting</p>
    </div>
    <div class="col-6 monogram-container">
      <img
        src="@/assets/monogram.png"
        class="monogram animate__animated initial-hide"
      >
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <img class="married animate__animated initial-hide" src="@/assets/married.jpg" alt="" style="width: 100%;">
    </div>
    <SendRsvp />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { animateCSS } from '@/utils/helpers'
import SendRsvp from '@/components/Rsvp/SendButton.vue'

onMounted(() => {
  document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
      // Remove Initial hidden state of elements
      const hiddenElements = document.querySelectorAll('.initial-hide')
      hiddenElements.forEach((el: any) => el.classList.remove('initial-hide'))

      // HeadlineContent.vue
      animateCSS({ element: '.headline-text', animation: 'fadeIn', delay: 3, slower: true })

      animateCSS({ element: '.monogram', animation: 'fadeIn', delay: 2, slower: true }).then(
        () => animateCSS({ element: '.monogram', animation: 'pulse', infinite: true })
      )

      animateCSS({ element: '.married', animation: 'zoomIn', delay: 4 })

      // InvitationDetails.vue
      animateCSS({ element: '.exclusive', animation: 'jackInTheBox', delay: 5 }).then(
        () => animateCSS({ element: '.exclusive', animation: 'flash', slow: true, infinite: true })
      )

      animateCSS({ element: '.invitation-details', animation: 'fadeIn', delay: 5 })
    }
  }
  
})
</script>
