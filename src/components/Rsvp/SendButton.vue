<template>
  <button class="send-button" type="button" @click="modal = true">Click here to Send RSVP</button>
  <RsvpModal
    :show="modal"
    @close="modal = false"
    @clearForm="clearForm"
    @submit="handleSubmit"
    :loading="loading"
  >
    <template #body>
      <div class="form-group">
        <label for="name">Full Name:</label>
        <p style="margin: 0px;">{{ user.invitee_name }}</p>
      </div>
      <div class="form-group">
        <label for="name">Max Seats Allowed:</label>
        <p style="margin: 0px;">{{ user.max_seats_allowed }}</p>
      </div>
      <div class="form-group">
        <label for="answer">Confirmation:</label>
        <select v-model="form.answer" style="flex-grow: 1;" name="answer" id="answer">
          <option selected value="Y">Yes</option>
          <option value="N">No</option>
        </select>
      </div>
      <div class="form-group">
        <label for="answer">Seats to be used:</label>
        <input type="text" v-model="form.seats" />
      </div>
    </template>
  </RsvpModal>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import RsvpModal from './RsvpModal.vue'
import axios from 'axios'
import { userData } from '@/stores/user'

// TODO: create an api that allows updating of post type, find uuid, update seats_to_be_used

const modal = ref(false)
const loading = ref(false)
const userStore = userData()

const form = reactive({
  answer: 'Y',
  seats: 0
})

const user = computed(() => userStore.user)

const clearForm = () => {
  form.answer = 'Y'
  form.seats = 0
}

const handleSubmit = async () => {
  loading.value = true
  try {
    const { answer } = form
    const seats = await axios.post(`/invitees/update/${user.value.uuid}`, { seats_to_be_used: form.seats })
    const res = await axios.post('/respondents', { name: user.value.invitee_name, answer })
    console.log(res, seats)
  } catch (e) {
    console.log(e)
  }
  loading.value = false
}

</script>

<style lang="stylus" scoped>
  .form-group
    display flex
    gap 10px
    align-items center
    margin-bottom 20px
  .send-button
    background transparent
    font-family 'Headline'
    padding 20px
    font-size 40px
    margin-top 20px
    width 100%
    transition all 0.2s linear
    border 2px dashed #000
    border-radius 10px
    &:hover
      background black
      color #fff
      border-color #fff
</style>