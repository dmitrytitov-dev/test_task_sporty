import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { League } from '@/types/sports'
import { fetchAllLeagues, fetchLeagueSeasonsWithBadges } from '@/services/sportsApi'

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

  // Cache: leagueId -> badge URL (null means "no badge available")
  const badgeCache = ref<Record<string, string | null>>({})

  // Getters
  const sportOptions = computed<string[]>(() => {
    const sports = [...new Set(leagues.value.map((l) => l.strSport))].sort()
    return sports
  })

  const filteredLeagues = computed<League[]>(() => {
    const query = searchQuery.value.toLowerCase()
    return leagues.value
      .filter((l) => l.strLeague.toLowerCase().includes(query))
      .filter((l) => (selectedSport.value ? l.strSport === selectedSport.value : true))
  })

  // Actions

  async function loadLeagues(): Promise<void> {
    loadingLeagues.value = true
    leaguesError.value = null
    try {
      const data = await fetchAllLeagues()
      leagues.value = data.leagues ?? []
    } catch (err) {
      leaguesError.value = err instanceof Error ? err.message : 'Unknown error loading leagues'
    } finally {
      loadingLeagues.value = false
    }
  }

  async function selectLeagueAndLoadBadge(leagueId: string): Promise<void> {
    selectedLeagueId.value = leagueId
    badgeError.value = null

    // Return cached result immediately — no repeat API call
    if (Object.prototype.hasOwnProperty.call(badgeCache.value, leagueId)) {
      badgeImageUrl.value = badgeCache.value[leagueId] ?? null
      return
    }

    loadingBadge.value = true
    badgeImageUrl.value = null
    try {
      const data = await fetchLeagueSeasonsWithBadges(leagueId)
      // Use the first season that has a badge image
      const firstWithBadge = data.seasons?.find((s) => s.strBadge) ?? null
      const url = firstWithBadge?.strBadge ?? null
      badgeCache.value[leagueId] = url
      badgeImageUrl.value = url
    } catch (err) {
      badgeError.value = err instanceof Error ? err.message : 'Unknown error loading badge'
      badgeCache.value[leagueId] = null
      badgeImageUrl.value = null
    } finally {
      loadingBadge.value = false
    }
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
