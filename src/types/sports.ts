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
  strBadge: string | null
}

export interface SeasonBadgesResponse {
  seasons: SeasonBadge[] | null
}
