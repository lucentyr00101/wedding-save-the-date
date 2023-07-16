<template>
  <div>
    <button class="send-button" type="button" onclick="rsvp.showModal()">Click here to Send RSVP</button>
    <dialog id="rsvp" class="modal">
      <form method="dialog" class="modal-box">
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
          >
            Close
          </button>
          <button
            class="btn btn-primary"
            @click="handleSubmit"
          >
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