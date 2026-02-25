<script setup lang="ts">
import { useLeaguesStore } from '@/stores/leagues'
import LeagueListItem from './LeagueListItem.vue'

const store = useLeaguesStore()

function onSelect(leagueId: string) {
  store.selectLeagueAndLoadBadge(leagueId)
}
</script>

<template>
  <div class="league-list">
    <league-list-item
      v-for="league in store.filteredLeagues"
      :key="league.idLeague"
      :league="league"
      :is-selected="league.idLeague === store.selectedLeagueId"
      @select="onSelect"
    />
  </div>
</template>

<style scoped>
.league-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
