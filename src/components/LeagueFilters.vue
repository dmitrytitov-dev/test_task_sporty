<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { useLeaguesStore } from '@/stores/leagues'

const store = useLeaguesStore()
</script>

<template>
  <div class="league-filters">
    <el-input
      v-model="store.searchQuery"
      placeholder="Search leagues by name"
      clearable
      class="filter-search"
    >
      <template #prefix>
        <el-icon><Search /></el-icon>
      </template>
    </el-input>

    <el-select
      v-model="store.selectedSport"
      placeholder="All sports"
      clearable
      class="filter-sport"
    >
      <el-option
        v-for="sport in store.sportOptions"
        :key="sport"
        :label="sport"
        :value="sport"
      />
    </el-select>
  </div>
</template>

<style scoped>
.league-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.filter-search {
  flex: 1 1 220px;
  min-width: 180px;
}

.filter-sport {
  flex: 0 1 200px;
  min-width: 160px;
}
</style>
