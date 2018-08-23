<template>
     <header class="woke_header"  >
          <div class="logo">xxx</div>
            <div class="city" @click="changeCity">
                <!-- 城市选择 -->
                <woke-select :showFlag="cityShow" @select="select"></woke-select>
                <p>{{city}}</p>
            </div>
     </header>
</template>

<script>
import wokeSelect from "@/components/select";
export default {
  data() {
    return {
      cityShow: false,
      city:"青岛"
    };
  },
  methods: {
    changeCity() {
      this.cityShow = !this.cityShow;
    },
    select(city) {
     this.city = city;
    }
  },
  components: {
    wokeSelect
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
    width: 20%;
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
