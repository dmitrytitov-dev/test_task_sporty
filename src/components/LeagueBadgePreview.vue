<script setup lang="ts">
import { useLeaguesStore } from '@/stores/leagues'

const store = useLeaguesStore()
</script>

<template>
  <div class="badge-preview">
    <!-- Empty state — no league selected yet -->
    <template v-if="!store.selectedLeagueId">
      <el-empty description="Select a league to see its season badge" :image-size="80" />
    </template>

    <template v-else>
      <!-- League title -->
      <div class="badge-preview__title">
        {{ store.selectedLeague?.strLeague }}
      </div>

      <!-- Loading state -->
      <div v-if="store.loadingBadge" class="badge-preview__center">
        <el-icon class="is-loading" :size="36"><Loading /></el-icon>
        <span class="badge-preview__hint">Loading badge…</span>
      </div>

      <!-- Error state -->
      <el-alert
        v-else-if="store.badgeError"
        type="error"
        :title="store.badgeError"
        show-icon
        :closable="false"
        class="badge-preview__alert"
      />

      <!-- No badge available -->
      <div v-else-if="store.badgeImageUrl === null" class="badge-preview__center">
        <el-empty description="No badge available for this league" :image-size="60" />
      </div>

      <!-- Badge image -->
      <div v-else class="badge-preview__image-wrap">
        <img
          :src="store.badgeImageUrl"
          :alt="`${store.selectedLeague?.strLeague} season badge`"
          class="badge-preview__image"
        />
      </div>
    </template>
  </div>
</template>

<style scoped>
.badge-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: 16px;
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 8px;
  background: var(--el-bg-color);
}

.badge-preview__title {
  font-size: 16px;
  font-weight: 600;
  color: var(--el-text-color-primary);
  text-align: center;
  margin-bottom: 16px;
}

.badge-preview__center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: var(--el-text-color-secondary);
}

.badge-preview__hint {
  font-size: 13px;
}

.badge-preview__alert {
  width: 100%;
}

.badge-preview__image-wrap {
  display: flex;
  justify-content: center;
}

.badge-preview__image {
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
  border-radius: 4px;
}
</style>
