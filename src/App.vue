<script setup>
import { ref, computed } from 'vue'
import Home from '../src/components/Home/HomePage.vue'
import D3PieChart from '../src/components/D3PieChart/D3PieChart.vue'
import InfoCards from '../src/components/Cards/InfoCards.vue'
import PageError from '../src/components/PageError/PageError.vue'

const routes = {
  '/': Home,
  '/chart': D3PieChart,
  '/cards': InfoCards,
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || PageError
})
</script>

<template>
  <div>
  <a href="#/">Home</a> |
  <a href="#/chart">Chart</a> |
  <a href="#/cards">Cards</a>
  <component :is="currentView" />
</div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
