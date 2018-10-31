<template>
     <div>
          <woke-menu :show="menuShow" @on-cancel="handleMenuCancel"></woke-menu>
          <woke-select :show="cityShow" @on-select="handleSelect" @on-cancel="handleSelectCancel"></woke-select>

          <header class="woke_header"  >
          <svg class="menu" @click="handleshowMenu" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
            <metadata> Svg Vector Icons : http://www.sfont.cn </metadata>
            <g><path fill="#fff" d="M990,190c0,17.4-14.2,31.6-31.6,31.6H41.6C24.2,221.6,10,207.4,10,190v-75.9c0-17.4,14.2-31.6,31.6-31.6h916.8c17.4,0,31.6,14.2,31.6,31.6V190z"/><path fill="#fff" d="M990,537.9c0,17.4-14.2,31.6-31.6,31.6H41.6c-17.4,0-31.6-14.2-31.6-31.6v-75.9c0-17.4,14.2-31.6,31.6-31.6h916.8c17.4,0,31.6,14.2,31.6,31.6V537.9z"/><path fill="#fff" d="M990,885.9c0,17.4-14.2,31.6-31.6,31.6H41.6c-17.4,0-31.6-14.2-31.6-31.6V810c0-17.4,14.2-31.6,31.6-31.6h916.8c17.4,0,31.6,14.2,31.6,31.6V885.9z"/></g>
          </svg>

          <div class="logo">xxx</div>
            <div class="city" @click="changeCity">
                <svg class="local" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
                  <metadata> Svg Vector Icons : http://www.sfont.cn </metadata>
                  <g><g transform="translate(0.000000,402.000000) scale(0.100000,-0.100000)"><path fill="#3dbcc6" d="M4441.3,3894.2c-1132.9-201.1-2064.7-887.7-2569.8-1893.1C1560,1378.3,1435,642.7,1533-14.5c127.5-865.6,539.5-1905.3,1231-3111.8C3337.8-4126.7,4075.9-5137,4585.9-5617.6c208.4-193.7,321.2-262.4,438.9-262.4c206,0,801.8,622.8,1397.7,1466.4C7459.8-2952.2,8237.2-1328.9,8452.9-178.8c66.2,355.6,61.3,963.7-9.8,1304.5c-299.2,1390.3-1334,2432.5-2726.8,2741.5C5468.7,3923.6,4693.8,3938.3,4441.3,3894.2z M5304.4,2405.7c642.4-100.5,1196.6-507.6,1478.6-1088.7c159.4-326.1,193.7-480.6,193.7-870.5c2.5-399.7-31.9-544.4-206-899.9c-328.6-667-1007.8-1086.3-1765.5-1086.3c-564,0-1049.5,208.4-1439.4,622.8C3210.3-544.2,3019-66,3019,448.9C3019,1650.5,4115.1,2589.6,5304.4,2405.7z"/></g></g>
                </svg>
                <p class="cityName">{{city}}</p>
            </div>
     </header>
     </div>
   
</template>

<script>
import wokeSelect from "@/components/header/select";
import wokeMenu from "@/components/header/menu";
export default {
  data() {
    return {
      cityShow: false,
      city: "青岛",
      menuShow: false
    };
  },
  methods: {
    changeCity() {
      this.cityShow = !this.cityShow;
    },
    handleSelect(city) {
      this.city = city;
      this.cityShow = false;
    },
    handleshowMenu() {
      // console.log("menu");
      this.menuShow = true;
    },
    handleMenuCancel() {
      this.menuShow = false;
    },
    handleSelectCancel(){
      this.cityShow = false;
      // console.log("select cancel");
    }
  },
  components: {
    wokeSelect,
    wokeMenu
  }
};
</script>

<style lang="scss">
$blueColor: #3dbccf;
.woke_header {
  height: 40px;
  background-color: $blueColor;
  align-items: center;
  padding-right: 15px;
  padding-left: 15px;
  display: flex;
  justify-content: space-between;

  .menu {
    height: 16px;
    width: 16px;
    color: #fff;
    // margin-left: -100px;
  }
  .logo {
    padding-left: 5px;
    font-size: 18px;
    line-height: 18px;
    color: #fff;
    font-weight: 800;
  }

  .city {
    width: 65px;
    height: 55%;
    display: flex;
    align-items: center;
    background-color: #fff;
    border-radius: 15px;
    color: $blueColor;
    padding: 0 10px;
    .cityName {
      font-size: 14px;
      line-height: 14px;
    }

    .local {
      align-self: left;
      height: 14px;
      width: 14px;
      line-height: 14px;
    }
  }
}
</style>
