//万恶的全局变量
var Global = {
    // 屏幕滚动距离
    scrollDistance: 0,
    // 秒杀倒计时时间,单位为妙
    countdownTime: 5 * 60 * 60,
};

/**
 * 全局的初始化函数
 */
Global.init = function () {
    Global.countdown();
}

/**
 * 动态改变头的透明度,监控滑动距离，动态增大，当滑动距离超过
 * 轮播图高度时，透明度最大0.9.
 */
Global.dynamicOpacity = function (scroll) {
    // 获取轮播图的高度
    var height = $('.slides').height();
    var tmpOpa = scroll / height;
    if (tmpOpa > 0.9) {
        tmpOpa = 0.9;
    }
    // console.log(tmpOpa);
    $('header').css("background-color", "rgba(201, 21, 35, " + tmpOpa + ")");
}

/**
 * 渲染倒计时 
 */
function renderTimer() {
    var timeAll = Global.countdownTime;
    var hour = parseInt(timeAll / 60 / 60);
    var minutes = parseInt(timeAll / 60 - hour * 60);
    var seconds = parseInt(timeAll - hour * 60 * 60 - minutes * 60);
    // console.log(hour);
    // console.log(minutes);
    // console.log(seconds/10);
    $('.kill .timer span').eq(0).text(parseInt(hour / 10));
    $('.kill .timer span').eq(1).text(parseInt(hour % 10));
    $('.kill .timer span').eq(3).text(parseInt(minutes / 10));
    $('.kill .timer span').eq(4).text(parseInt(minutes % 10));
    $('.kill .timer span').eq(6).text(parseInt(seconds / 10));
    $('.kill .timer span').eq(7).text(parseInt(seconds % 10));
}
/**
 * 秒杀倒计时
 */
Global.countdown = function () {
    // 将总秒数显示到html中
    renderTimer();

    var timeid = setInterval(function () {
        Global.countdownTime--;
        renderTimer();
        if (Global.countdownTime == 0) {
            console.log("抢购结束");
            clearInterval(timeid);
        }
    }, 1000);
}

//------------------------------------代码执行-------------------
// 程序入口
$('document').ready(function () {
    Global.init();
});

// 全局的监控事件
window.onscroll = function () {
    // 获取页面被卷去的高度的值
    var scrollTop = document.documentElement.scrollTop;
    Global.dynamicOpacity(scrollTop);
}
