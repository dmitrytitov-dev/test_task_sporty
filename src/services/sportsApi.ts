import type { AllLeaguesResponse, SeasonBadgesResponse } from '@/types/sports'

const BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3'

/**
 * Fetches the full list of sports leagues from TheSportsDB.
 * Endpoint: /api/v1/json/3/all_leagues.php
 */
export async function fetchAllLeagues(): Promise<AllLeaguesResponse> {
  const res = await fetch(`${BASE_URL}/all_leagues.php`)
  if (!res.ok) {
    throw new Error(`Failed to fetch leagues: ${res.status} ${res.statusText}`)
  }
  return res.json() as Promise<AllLeaguesResponse>
}

/**
 * Fetches all seasons with badge images for the given league ID.
 * Endpoint: /api/v1/json/3/search_all_seasons.php?badge=1&id=<id>
 */
export async function fetchLeagueSeasonsWithBadges(
  leagueId: string,
): Promise<SeasonBadgesResponse> {
  const res = await fetch(`${BASE_URL}/search_all_seasons.php?badge=1&id=${leagueId}`)
  if (!res.ok) {
    throw new Error(
      `Failed to fetch season badges for league ${leagueId}: ${res.status} ${res.statusText}`,
    )
  }
  return res.json() as Promise<SeasonBadgesResponse>
}
