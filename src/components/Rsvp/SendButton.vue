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
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="form.name">
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
        <select v-model="form.seats" style="flex-grow: 1;" name="answer" id="answer">
          <option selected value="Y">Yes</option>
          <option value="N">No</option>
        </select>
      </div>
    </template>
  </RsvpModal>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import RsvpModal from './RsvpModal.vue'
import axios from 'axios'

// TODO: create an api that allows updating of post type, find uuid, update seats_to_be_used

const modal = ref(false)
const loading = ref(false)

const form = reactive({
  name: '',
  answer: 'Y',
  seats: 0
})

const clearForm = () => {
  form.name = ''
  form.answer = 'Y'
  form.seats = 0
}

const handleSubmit = async () => {
  loading.value = true
  try {
    const { answer, name } = form
    const res = await axios.post('/respondents', { name, answer })
    console.log(res)
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