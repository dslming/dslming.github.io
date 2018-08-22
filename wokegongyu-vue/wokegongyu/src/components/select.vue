<template>
  <div id="select" :v-show="showFlag" @maskClick="fff">
      <woke-popup :showFlag="showFlag">
          <div class="contener">123</div>
      </woke-popup>
  </div>
</template>

<script>
import wokePopup from "@/components/popup";

export default {
  props: {
    showFlag: {
      type: Boolean,
      default: false
    }
  },
  components: {
    wokePopup
  },
  methods:{
      fff(){
          console.log("ooo");
      }
  }
};
</script>

<style lang="scss">
#select {
  .contener {
    position: fixed;
    bottom:0px;
    left:0;
    height: 30%;
    width: 100%;
    text-align: center;
    font-size: 14px;
    background: #fff;
  }
}
</style>
