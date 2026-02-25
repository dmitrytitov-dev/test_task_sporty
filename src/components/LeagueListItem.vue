<script setup lang="ts">
import type { League } from '@/types/sports'

// LeagueListItem — single league card (implemented in Task 6)
defineProps<{
  league: League
  isSelected: boolean
}>()

defineEmits<{
  (e: 'select', leagueId: string): void
}>()
</script>

<template>
  <div class="league-list-item">
    <!-- Item content will be implemented in Task 6 -->
    <span>{{ league.strLeague }}</span>
  </div>
</template>

<style scoped></style>
