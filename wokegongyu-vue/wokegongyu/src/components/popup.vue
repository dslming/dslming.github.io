// 遮罩层
<template>
    <div id="popup" v-show="showFlag" @click="maskClick">
        <div class="mask"></div>
        <div class="container">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
const EVENT_MASK_CLICK = 'maskClick'

export default {
  props: {
    showFlag: {
      type: Boolean,
      default: false
    }
  },
  methods:{
      maskClick(e){
          this.$emit(EVENT_MASK_CLICK, e);
         
      }
  }
};
</script>

<style lang="scss">
#popup {
  .mask {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #25262d;
    opacity: 0.4;
    position: fixed;
    left: 0;
    top: 0;
  }
}
</style>
