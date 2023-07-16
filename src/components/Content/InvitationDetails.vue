<template>
  <div class="invitation-details animate__animated initial-hide">
    <div class="exclusive animate__animated initial-hide">
      <img src="@/assets/hand-point-right.png" alt="" class="hand-point-right">
      <span class="exclusive__text">
        Exclusive: You are invited!
      </span>
    </div>
    <SendRsvp />
    <div class="divider"></div>
    <p class="date initial-hide">Saturday, 23rd September, 2023</p>
    <div class="row venue-container initial-hide">
      <div class="col venue">
        <p>Church: St Michael</p>
        <p>The Archangel Parish, BGC</p>
        <p>4 PM - 6 PM</p>
      </div>
      <div class="col venue">
        <p>Reception: Alta Guia, Taguig</p>
        <p>7 PM - 11 PM</p>
      </div>
    </div>
    <p class="rsvp-text">PLEASE SEND RSVP BY OWL BEFORE MAY 10TH</p>
    <div class="divider"></div>
    <div class="row">
      <div class="col">
        <img src="@/assets/footer.jpg" class="footer-image" alt="">
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SendRsvp from '@/components/Rsvp/SendRsvp.vue'
</script>
