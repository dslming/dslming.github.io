<template>
  <div class="loading-page">
    <h1>{{percent}}%</h1>
  </div>
</div>
</template>

<script>

export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
},
 watch: {
   percent(value){
     this.percent = value
   }
 }
}
</script>

<style>
 
.loading-page {
  font-size: 20px;
  color: #fff;
  z-index: 9999999999999;
  position: absolute;
  left: 10%;
  bottom: 0;
}
</style>
