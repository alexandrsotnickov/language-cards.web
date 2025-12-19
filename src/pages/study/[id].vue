<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <TheHeader />
  <main class="page-content">
    <div class="study-panel">
      <div class="study-panel__container">
        <div class="study-panel__card"></div>
        <div class="study-panel__tools"></div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import TheHeader from "@/widgets/header/ui/TheHeader.vue";
</script>

<style lang="scss">
@import "styles/study-panel";
</style>
