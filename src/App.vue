<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useLeaguesStore } from '@/stores/leagues'
import { useIsMobile } from '@/composables/useIsMobile'
import LeagueFilters from '@/components/LeagueFilters.vue'
import LeagueList from '@/components/LeagueList.vue'
import LeagueBadgePreview from '@/components/LeagueBadgePreview.vue'

const store = useLeaguesStore()
const { isMobile } = useIsMobile()

// On mobile, dialog is open whenever a league is selected
const dialogVisible = computed({
  get: () => isMobile.value && store.selectedLeagueId !== null,
  set: (val) => {
    if (!val) store.selectedLeagueId = null
  },
})

onMounted(() => {
  store.loadLeagues()
})
</script>

<template>
  <div class="app">
    <!-- Header -->
    <header class="app__header">
      <h1 class="app__title">Sports Leagues</h1>
      <p class="app__subtitle">Browse and explore leagues from around the world</p>
    </header>

    <!-- Filters -->
    <section class="app__filters">
      <LeagueFilters />
    </section>

    <!-- Main content: list + badge panel -->
    <main class="app__content">
      <section class="app__league-list">
        <LeagueList />
      </section>

      <!-- Desktop sidebar badge panel (hidden on mobile) -->
      <aside class="app__badge-panel">
        <LeagueBadgePreview />
      </aside>
    </main>

    <!-- Mobile: badge dialog -->
    <el-dialog
      v-model="dialogVisible"
      :title="store.selectedLeague?.strLeague"
      width="92%"
      align-center
    >
      <LeagueBadgePreview />
    </el-dialog>
  </div>
</template>

<style scoped>
.app {
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px 16px 48px;
}

/* Header */
.app__header {
  margin-bottom: 24px;
  text-align: center;
}

.app__title {
  font-size: 28px;
  font-weight: 700;
  color: var(--el-text-color-primary);
  margin: 0 0 4px;
}

.app__subtitle {
  font-size: 14px;
  color: var(--el-text-color-secondary);
  margin: 0;
}

/* Filters */
.app__filters {
  margin-bottom: 20px;
}

/* Main two-column layout */
.app__content {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.app__league-list {
  flex: 1 1 0;
  min-width: 0;
}

.app__badge-panel {
  flex: 0 0 320px;
}

/* Mobile */
@media (max-width: 720px) {
  .app__content {
    flex-direction: column;
    align-items: stretch;
  }

  /* Hide the sidebar on mobile — badge shown in dialog instead */
  .app__badge-panel {
    display: none;
  }
}
</style>
