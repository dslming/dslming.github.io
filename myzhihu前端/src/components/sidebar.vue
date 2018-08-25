<template>
    <div class="sidebarBox" @scroll.stop.prevent  v-show="showSideBar">
        <transition name="fold">
           <section class="sidebar">
              <div class="address">
                <i class="iconfont icon-github"></i> 
                <a href="https://github.com/1097364388" class="link">github</a>
               </div>

              <div class="themeList">
                <ul>
                    <li class="themeItem" v-for="(item, index) in themeList" :key="item.id" :class="{'active': (currentIndex === index)}" @click="switchTheme(index)">
                        <span class="text">{{ item.name }}</span>
                        <i class="iconfont icon-add"></i>
                    </li>
                </ul>
              </div>
           </section>
        </transition>


        <transition name="fade">
           <div class="mask" v-show="showSideBar" @click.stop.prevent="hideSideBar"></div>
        </transition>
        
    </div>
</template>
<script>
import { getThemes } from "@/api/api";
export default {
  name: "sidebar",
  data() {
    return {
      showSideBar: false,
      themeList: []
    };
  },
  computed: {
    currentIndex() {
      return this.$store.state.currentIndex;
    }
  },
  methods: {
    open() {
      this.showSideBar = true;
    },
    hideSideBar() {
      this.showSideBar = false;
      // 恢复全局状态
      this.$store.commit("SET_HOME_HIDDEN", {
        homeHidden: false
      });

      // 恢复滚动条的位置
      this.$nextTick(() => {
        window.scrollTo(0, this.$store.state.homeScrollTop);
        return false;
      });
      // this.$emit('homeHidden', false);
    },
    // 切换主题日报 theme
    switchTheme(index) {
      // console.log(index);
      // this.currentIndex = index;

      let currentRoute = this.$route.name;
      let len = window.history.length;

      if (index === undefined) {
        // this.currentIndex = -1;
        this.$store.commit("CHANGE_CURRENT_INDEX", -1);
      } else if (index >= 0) {
        // this.currentIndex = index;
        this.$store.commit("CHANGE_CURRENT_INDEX", index);
      }

      if (this.currentIndex == -1) {
        this.$router.push("/");
        this.hideSideBar();
      } else {
        this.$router.push("/theme/" + this.themeList[index].id);

        this.hideSideBar();
      }
    },
    change_current_index() {
      const route = this.$route,
        name = route.name;
      // 查看当前 theme params id
      if (name == "index") {
        this.$store.commit("CHANGE_CURRENT_INDEX", -1);
      } else if (name == "theme") {
        let id = route.params.id,
          themeList = this.$store.state.themeList,
          i,
          len;
        for (i = 0, len = themeList.length; i < len; i++) {
          if (id * 1 === themeList[i].id * 1) {
            this.$store.commit("CHANGE_CURRENT_INDEX", i);
            break;
          }
        }
      }
    }
  },
  // 异步组件， 每次渲染该组件时都会触发
  async created() {
    const that = this;
    // 请求侧边栏数据
    const res = await getThemes();

    // console.log(res);
    that.themeList = res.others;

    // 发送到全局状态，设置当前 themeItem 的参数，也可以用辅助函数
    that.$store.commit("SET_THEME_LIST", Object.assign(that.themeList));

    that.change_current_index();
  },

  activated() {
    let homeScrollTop = this.$store.state.homeScrollTop;
    // console.log(homeScrollTop);
    // console.log(this.$route);
    if (homeScrollTop && this.$route.name == "index") {
      setTimeout(() => {
        window.scrollTo(0, homeScrollTop);
        return false;
      }, 0);
    }
  }
};
</script>
<style lang="scss" scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  height: 100%;
  width: 40%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background-color: #fff;
  transform: translate3d(0, 0, 0);

  &.fold-enter-active,
  &.fold-leave-active {
    transition: all 0.5s;
  }
  &.fold-enter,
  &.fold-leave-active {
    transform: translate3d(-100%, 0, 0);
  }
  .themeList {
    .themeItem {
      padding: 0 10px;
      height: 50px;
      line-height: 50px;

      .text {
        font-size: 16px;
      }
      .iconfont:not(.icon-homefill) {
        float: right;
        margin-right: 40px;
        color: #bebebe;
      }

      .iconfont.icon-homefill {
        margin-right: 10px;
      }

      &.active {
        background: #f5f5f5;
      }
    }
  }
}

.address {
  background: #377592;
  padding: 20px 0 20px 10px;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;

  .iconfont {
    display: inline-block;
    vertical-align: middle;
    font-size: 24px;
  }
  .link {
    display: inline-block;
    margin-left: 10px;
    vertical-align: middle;
    font-size: 16px;
    color: #fff;
  }
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
  background: rgba(7, 17, 27, 0.6);
  opacity: 1;

  &.fade-enter-active,
  &.fade-leave-active {
    transition: all 0.5s;
  }
  &.fade-enter,
  &.fade-leave-active {
    opacity: 0;
  }
}
</style>


