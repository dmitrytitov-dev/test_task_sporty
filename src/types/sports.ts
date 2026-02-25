// TypeScript interfaces for TheSportsDB API responses

export interface League {
  idLeague: string
  strLeague: string
  strSport: string
  strLeagueAlternate: string
}

export interface AllLeaguesResponse {
  leagues: League[]
}

export interface SeasonBadge {
  idLeague: string
  strSeason: string
  /** URL to the badge image, null if not available */
  strBadge: string | null
}

export interface SeasonBadgesResponse {
  /** Null when the API returns no results for the given league */
  seasons: SeasonBadge[] | null
}
