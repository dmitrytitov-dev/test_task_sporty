import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { League } from '@/types/sports'

export const useLeaguesStore = defineStore('leagues', () => {
  // State
  const leagues = ref<League[]>([])
  const loadingLeagues = ref(false)
  const leaguesError = ref<string | null>(null)

  const searchQuery = ref('')
  const selectedSport = ref('')

  const selectedLeagueId = ref<string | null>(null)
  const badgeImageUrl = ref<string | null>(null)
  const loadingBadge = ref(false)
  const badgeError = ref<string | null>(null)
  const badgeCache = ref<Record<string, string | null>>({})

  // Getters
  const sportOptions = computed(() => {
    const sports = [...new Set(leagues.value.map((l) => l.strSport))].sort()
    return sports
  })

  const filteredLeagues = computed(() => {
    return leagues.value
      .filter((l) =>
        l.strLeague.toLowerCase().includes(searchQuery.value.toLowerCase()),
      )
      .filter((l) => (selectedSport.value ? l.strSport === selectedSport.value : true))
  })

  // Actions — full implementation in Task 4
  async function loadLeagues() {
    // TODO: implement in Task 4
  }

  async function selectLeagueAndLoadBadge(_leagueId: string) {
    // TODO: implement in Task 4
  }

  return {
    leagues,
    loadingLeagues,
    leaguesError,
    searchQuery,
    selectedSport,
    selectedLeagueId,
    badgeImageUrl,
    loadingBadge,
    badgeError,
    badgeCache,
    sportOptions,
    filteredLeagues,
    loadLeagues,
    selectLeagueAndLoadBadge,
  }
})
