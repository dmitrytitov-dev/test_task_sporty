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
  gap: 20px;
  align-items: center;
}

.filter-search {
  flex: 1 1 0;
  min-width: 0;
}

.filter-sport {
  /* Match the badge panel width on desktop */
  flex: 0 0 320px;
}

/* Make the el-select fill its flex container */
.filter-sport :deep(.el-select) {
  width: 100%;
}

/* On mobile both controls go full width so they match each other */
@media (max-width: 600px) {
  .filter-search,
  .filter-sport {
    flex: 1 1 100%;
  }

  /* Force Element Plus select wrapper to fill the row */
  .filter-sport :deep(.el-select) {
    width: 100%;
  }
}
</style>
