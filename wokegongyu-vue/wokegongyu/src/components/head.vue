<template>
     <header class="woke_header">
          <div class="logo">蜗壳公寓</div>
            <div class="city">
                <span class="fa fa-map-marker"></span>
                <p>青岛</p>
                <span class="fa fa-angle-down"></span>
            </div>
     </header>
</template>

<script>
export default {};
</script>

<style lang="scss">
.woke_header{
    height: 40px;
    background-color: $blueColor;
    align-items: center;
    padding-right: 15px;
    padding-left: 15px;
    display: flex;
    justify-content: space-between;

    .logo{
        font-size: 18px;
        line-height: 18px;
        color:#fff;
        font-weight: 800;
    }

    .city{
        width: 25%;;
        height: 55%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: #fff;
        font-size:12px;
        border-radius: 15px;
        color:$blueColor;
        padding:0 5px;

        p{
            color:$blueColor;
            padding:0;
            margin:0;
        }

        span{
           
            font-size: 14px;
        }
    }
}
</style>
