import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const userData = defineStore('user', () => {
  const store = reactive({
    user: {
      uuid: null,
      invitee_name: null,
      max_seats_allowed: 0,
      seats_to_be_used: 0
    }
  })

  const user = computed(() => store.user)

  const setUserValues = (values: any) => {
    store.user = values
  }

  return { user, setUserValues }
})
