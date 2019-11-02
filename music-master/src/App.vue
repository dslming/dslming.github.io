<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
}
</script>

<style lang="scss">
@import 'common/scss/index.scss';
#app {
  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
