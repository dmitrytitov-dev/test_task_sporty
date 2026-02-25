import type { AllLeaguesResponse, SeasonBadgesResponse } from '@/types/sports'

const BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3'

export async function fetchAllLeagues(): Promise<AllLeaguesResponse> {
  // TODO: implement in Task 3
  const res = await fetch(`${BASE_URL}/all_leagues.php`)
  if (!res.ok) throw new Error('Failed to fetch leagues')
  return res.json() as Promise<AllLeaguesResponse>
}

export async function fetchLeagueSeasonsWithBadges(
  leagueId: string,
): Promise<SeasonBadgesResponse> {
  // TODO: implement in Task 3
  const res = await fetch(`${BASE_URL}/search_all_seasons.php?badge=1&id=${leagueId}`)
  if (!res.ok) throw new Error('Failed to fetch season badges')
  return res.json() as Promise<SeasonBadgesResponse>
}
