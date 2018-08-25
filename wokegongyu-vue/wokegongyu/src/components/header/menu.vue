<template>
    <woke-popup  :showFlag="showFlag" @mask-click="maskClick">
        <div>123</div>
    </woke-popup>
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
    data(){
        return{
            show:this.showFlag,
        }
    },
    components:{
        wokePopup,
    },
    methods:{
        maskClick(){
           this.$emit("cansel");
           this.show = false;
        }
    }
}
</script>

<style>
</style>
