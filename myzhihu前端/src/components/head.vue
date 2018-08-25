<template>
    <header id="head_top">
           <slot name="top_left"></slot>
           <slot name="top_right"></slot>
    </header>
</template>

<script>
export default {};
</script>

<style lang="scss">
#head_top {
  background-color: #00a2ed;
  height: 50px;
  width: 100%;
  color: #fff;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

  .iconfont {
    color: #fff;
    font-size: 20px;
  }
}
</style>
