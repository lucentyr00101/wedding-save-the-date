<template>
  <div>
    <button class="send-button animate__animated initial-hide" type="button" @click="openModal">Click here to Send RSVP</button>
    <dialog id="rsvp" class="modal" :class="{ 'modal-open': modal }">
      <form method="dialog" class="modal-box">
        <div class="alert alert-error" v-if="errorMessage">
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{{ errorMessage }}</span>
        </div>
        <div class="alert alert-success" v-if="successMessage">
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{{ successMessage }}</span>
        </div>
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Full Name:</span>
          </label>
          <input type="text" :value="user.invitee_name" disabled class="input input-bordered w-full" />
        </div>
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Max Seats Allotted:</span>
          </label>
          <input type="text" :value="user.max_seats_allowed" disabled class="input input-bordered w-full" />
        </div>
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Confirmation:</span>
          </label>
          <select v-model="form.answer" class="select select-bordered">
            <option selected value="Y">Yes</option>
            <option value="N">No</option>
          </select>
        </div>
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Seats to be used:</span>
          </label>
          <input type="text" class="input input-bordered w-full input-info" v-model="form.seats" />
        </div>
        <div class="mt-5 flex justify-end content-center gap-2">
          <button
            class="btn"
            @click="closeModal"
            :disabled="loading"
          >
            Close
          </button>
          <button
            class="btn btn-primary"
            @click="handleSubmit"
            :disabled="loading"
          >
            <span v-if="loading" class="loading loading-spinner"></span>
            Submit
          </button>
        </div>
      </form>
    </dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import axios from 'axios'
import { userData } from '@/stores/user'

// TODO: create an api that allows updating of post type, find uuid, update seats_to_be_used

const loading = ref(false)
const modal = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
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

const closeModal = () => {
  clearForm()
  modal.value = false
}

const openModal = () => {
  modal.value = true
}

const handleSubmit = async () => {
  loading.value = true
  try {
    errorMessage.value = ''
    successMessage.value = ''
    const { answer } = form
    await axios.post(`/invitees/update/${user.value.uuid}`, { seats_to_be_used: form.seats })
    await axios.post('/respondents', { name: user.value.invitee_name, answer })
    successMessage.value = 'Saved!'
  } catch (e: any) {
    errorMessage.value = e.response.data.message
    form.seats = 0
  }
  loading.value = false
}

</script>

<style lang="stylus">
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