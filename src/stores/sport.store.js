import { profileSportInteracts } from '@/db/db'

export const useSportStore = defineStore('useSport', () => {
  const sports = ref([...profileSportInteracts]) // make sure to use ref

  const toggleActiveStatus = (id) => {
    console.log(id)
    const sport = sports.value.find((s) => s.id === id)
    if (sport) {
      sport.isActive = !sport.isActive
    }
    console.log(sport)
  }

  return {
    sports,
    toggleActiveStatus
  }
})
