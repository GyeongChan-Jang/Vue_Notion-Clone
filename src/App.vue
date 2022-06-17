<template lang="">
  <div class="app__container">
    <LeftNavBar />
    <div class="app__page">
      <RouterView />
    </div>
  </div>
</template>

<script>
import LeftNavBar from './components/LeftNavBar.vue'

export default {
  components: {
    LeftNavBar
  } 
}
</script>
<style lang="scss" scoped>
.app {
  &__container {
    display: flex;
    height: 100vh;
    box-sizing: border-box;
    &__page {
    flex-grow: 1;
    box-sizing: border-box;
    }
  }
}
</style>
