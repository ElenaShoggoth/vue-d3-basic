
<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/chart">Chart</router-link> |
      <router-link to="/cards">Cards</router-link>
    </nav>
    <router-view></router-view> 
  </div>
</template>

<script>
export default {
  name: 'MainLayout',
}
</script>
