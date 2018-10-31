// 日期：2018/08/26
// 1) 该组件由父组件的prop控制显示与隐藏
// 2) 通过动态监听prop实现实时控制
// 3) 显示与隐藏的动作都是自己控制,然后向父组件通知该事件。
// 4) 该组件的所有父组件不允许使用v-show控制该组件，因为可能该组件的结束动画还没执行完，就被父组件结束了。看不到结束动画。

<template>
    <div class="popup">
        <transition name="maskFade">
            <div class="mask" 
                 @click="maskClick"
                 v-show="showPopup">
            </div>
        </transition>
        <slot></slot>
    </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean
    }
  },
  data() {
    return {
      showPopup: this.show
    };
  },
  watch: {
    show(val) {
      this.showPopup = this.show;
    }
  },
  methods: {
    maskClick() {
      this.showPopup = false;
       this.$emit("on-mask");
    },
  }
};
</script>

<style lang="scss">
.popup {
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
    transition: opacity .3s;
  }

  .maskFade-enter,
  .maskFade-leave-to {
    opacity: 0;
  }
}
</style>
