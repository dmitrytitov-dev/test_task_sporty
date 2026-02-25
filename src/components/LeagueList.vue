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
    <!-- Initial loading -->
    <div v-if="store.loadingLeagues" class="league-list__center">
      <el-skeleton :rows="6" animated />
    </div>

    <!-- Fetch error -->
    <el-alert
      v-else-if="store.leaguesError"
      type="error"
      :title="store.leaguesError"
      description="Please check your connection and reload the page."
      show-icon
      :closable="false"
    />

    <!-- Empty state: filters produced no results -->
    <el-empty
      v-else-if="store.filteredLeagues.length === 0"
      description="No leagues match your filters"
      :image-size="80"
    />

    <!-- League items -->
    <template v-else>
      <league-list-item
        v-for="league in store.filteredLeagues"
        :key="league.idLeague"
        :league="league"
        :is-selected="league.idLeague === store.selectedLeagueId"
        @select="onSelect"
      />
    </template>
  </div>
</template>

<style scoped>
.league-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.league-list__center {
  padding: 12px 0;
}
</style>
