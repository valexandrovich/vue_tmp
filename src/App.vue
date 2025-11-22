<script setup lang="ts">
import Layout from './components/Layout.vue'
import { useAnalytics } from './composables/useAnalytics'

// Инициализация аналитики для сбора данных о пользователе
useAnalytics()
</script>

<template>
  <Layout />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
</style>
