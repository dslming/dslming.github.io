<template>
     <header class="woke_header" @maskClick="maskClick11">
          <div class="logo">蜗壳公寓</div>
            <div class="city">
                <span class="fa fa-map-marker"></span>
                <mySelect :showFlag="cityShow"></mySelect>
                <p @click="changeCity">青岛</p>
                <span class="fa fa-angle-down"></span>
            </div>
     </header>
</template>

<script>
import mySelect from "@/components/select";
export default {
      data() {
    return {
      options: [2013, 2014, 2015, 2016, 2017, 2018],
      value: 2016,
      title: '入职时间',
      placeholder: '请选择入职时间',
      autoPop: false,
      disabled: false,
      cityShow:false,
    }
  },
  methods: {
    changeCity() {
      this.cityShow = !this.cityShow;
    },
    maskClick11(){
       this.cityShow = !this.cityShow;
        console.log("xiix");
    }
  },
  components: {
    mySelect
  }
};
</script>

<style lang="scss">
$blueColor: #3dbcc6;
.woke_header {
  height: 40px;
  background-color: $blueColor;
  align-items: center;
  padding-right: 15px;
  padding-left: 15px;
  display: flex;
  justify-content: space-between;

  .logo {
    font-size: 18px;
    line-height: 18px;
    color: #fff;
    font-weight: 800;
  }

  .city {
    width: 25%;
    height: 55%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fff;
    font-size: 12px;
    border-radius: 15px;
    color: $blueColor;
    padding: 0 5px;

    p {
      color: $blueColor;
      padding: 0;
      margin: 0;
    }

    span {
      font-size: 14px;
    }
  }
}
</style>
