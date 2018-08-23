<template>
    <woke-popup :showFlag="showFlag" @mask-click="maskClick">
       <transition name="fade" >
             <woke-picker
              :show="showFlag"
              :columns="columns"
              :defaultData="defaultData"
              :selectData="pickData"
              @cancel="close"
              @confirm="confirmFn">
              </woke-picker>
       </transition>
     
    </woke-popup>
</template>

<script>
import wokePopup from "@/components/popup";
import wokePicker from "@/components/picker";
const EVENT_CHANGE = "change";
const EVENT_CANCEL = "select-cancel";
export default {
  props: {
    showFlag: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      show:this.showFlag,
      columns: 1,
      defaultData: [
        {
          text: '青岛',
          value: '青岛'
        }
      ],
      pickData: {
        // 第一列的数据结构
        data1: [
          {
            text: "青岛",
            value: "青岛"
          },
          {
            text: "威海",
            value: "威海"
          },
          {
            text: "烟台",
            value: "烟台"
          },
           {
            text: "日照",
            value: "日照"
          },{
            text: "潍坊",
            value: "潍坊"
          }
        ]
      },
      res: null
    }
  },
    
  components: {
    wokePopup,
    wokePicker
  },
  methods: {
    maskClick() {
      this.show = false;
    },
    close() {
      this.show = false;
    },
    confirmFn(val) {
      this.show = false;
      this.res = val.select1.value;
      this.defaultData = [val.select1];
      // console.log(this.res);
      this.$emit("select",this.res);
      
    },
  }
};
</script>

<style lang="scss">

.contener {
  position: fixed;
  bottom: 0px;
  left: 0;
  height: 30%;
  width: 100%;
  text-align: center;
  font-size: 14px;
  background: green;
}

  .fade-enter-active, .fade-leave-active {
    transition: all .3s;
  }

  .fade-enter, .fade-leave-to{
    height: 0;
  }
</style>
