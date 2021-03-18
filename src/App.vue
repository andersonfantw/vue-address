<template>
  <div id="app">
    <VueAddress name="addr"/>
  </div>
</template>

<script>
import VueAddress from './components/vh_address.vue'

export default {
  name: 'App',
  components: {
    VueAddress
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
