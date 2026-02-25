<script setup lang="ts">
import type { League } from '@/types/sports'

const props = defineProps<{
  league: League
  isSelected: boolean
}>()

const emit = defineEmits<{
  (e: 'select', leagueId: string): void
}>()

function handleClick() {
  emit('select', props.league.idLeague)
}
</script>

<template>
  <div
    class="league-item"
    :class="{ 'league-item--selected': isSelected }"
    @click="handleClick"
  >
    <div class="league-item__name">{{ league.strLeague }}</div>
    <div class="league-item__meta">
      <el-tag size="small" type="info" class="league-item__sport">{{ league.strSport }}</el-tag>
      <span v-if="league.strLeagueAlternate" class="league-item__alt">
        {{ league.strLeagueAlternate }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.league-item {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 14px;
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid var(--el-border-color-lighter);
  background: var(--el-bg-color);
  transition:
    background 0.15s,
    border-color 0.15s;
}

.league-item:hover {
  background: var(--el-fill-color-light);
  border-color: var(--el-border-color);
}

.league-item--selected {
  background: var(--el-color-primary-light-9);
  border-color: var(--el-color-primary);
}

.league-item__name {
  font-weight: 600;
  font-size: 14px;
  color: var(--el-text-color-primary);
  margin-bottom: 4px;
}

.league-item__meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.league-item__sport {
  flex-shrink: 0;
}

.league-item__alt {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
