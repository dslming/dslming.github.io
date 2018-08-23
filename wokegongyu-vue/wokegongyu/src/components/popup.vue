// 遮罩层
<template>
    <div id="popup">

        <transition name="maskFade">
              <div class="mask" @click="maskClick" v-show="showFlag"></div>
        </transition>

        <!-- 不能使用具名插槽,不知道为什么不能使用 -->
        <slot></slot>
    </div>
</template>

<script>
import { mapActions } from "vuex";
const EVENT_MASK_CLICK = "mask-click";

export default {
  props: {
    showFlag: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    maskClick() {
      this.$emit(EVENT_MASK_CLICK);
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
    pointer-events: auto;
    display: block;
  }

  .maskFade-enter-active,
  .maskFade-leave-active {
    transition: opacity 0.3s;
  }

  .maskFade-enter,
  .maskFade-leave-to {
    opacity: 0;
  }
}
</style>
