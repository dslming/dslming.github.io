<template>
    <woke-popup  @on-mask="maskClick" :show="showMask">
      <transition name="fade2">
          <div class="sider" v-show="show">
            <div class="content">
              <ul>
                <li>首页</li>
                <li>搜索附近</li>
              </ul>
            </div>
            
            <div class="content">
              <ul>
                <li>登录</li>
                <li>注册</li>
              </ul>
            </div>
          </div>
      </transition>
    </woke-popup>
</template>

<script>
import wokePopup from "@/components/popup";
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
        showMask:this.show,
    };
  },
  watch:{
      show(val){
          this.showMask = val;
      }
  },
  components: {
    wokePopup
  },
  methods: {
    maskClick() {
      this.$emit("on-cancel");
      this.showMask = false;
    }
  }
};
</script>

<style>
.sider {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  height: 100%;
  min-width: 55%;
  background-color: #fff;
  padding-top:40px;
  padding-left:40px;

  
}

  .fade2-enter-active, 
  .fade2-leave-active {
    transition: width .3s;
  }

  .fade2-enter, .fade2-leave-to{
    width: 0;
    height: 100%;
  }

</style>
