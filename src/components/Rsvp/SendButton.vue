<template>
  <button class="send-button" type="button" @click="modal = true">Send RSVP</button>
  <RsvpModal
    :show="modal"
    @close="modal = false"
    @clearForm="clearForm"
    @submit="handleSubmit"
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
    </template>
  </RsvpModal>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import RsvpModal from './RsvpModal.vue'
import axios from 'axios'

const confirm = 'https://api.ranzandkyla.online/api/confirm'
const decline =  'https://api.ranzandkyla.online/api/decline'

const modal = ref(false)

const form = reactive({
  name: '',
  answer: 'Y'
})

const clearForm = () => {
  form.name = ''
  form.answer = 'Y'
}

const handleSubmit = async () => {
  try {
    const { answer, name } = form
    const res = await axios.post(answer === 'Y' ? confirm : decline, { name })
    console.log(res)
  } catch (e) {
    console.log(e)
  }
}

</script>

<style lang="stylus" scoped>
  .form-group
    display flex
    gap 10px
    align-items center
    margin-bottom 20px
</style>