<template>
  <div class="home">
    <back />
    <div class="experience">
      <h4>项目主页</h4>
      <div class="enterprise" v-for="(item,index) in expressList" :key="index">
        <p class="time" :class="{timeNow: index==0}">{{item.time}}</p>
        <div class="detail">
          <div class="desc">
            <p><a :href="item.link" target="blank">{{item.name}}</a></p>
            <p class="point">{{item.mobile==0?"电脑端":"手机端"}}</p>
          </div>
        </div>
      </div>

      <div class="footer">
        最后更新时间于{{endTime}}
      </div>
    </div>
  </div>
</template>

<script>
import Back from "@/components/Back.vue";

export default {
  name: "home",
  components: { Back },
  data() {
    return {
      endTime: "2019/12/11",
      expressList: [
        {
          name: "3d音乐播放器",
          time: "2019/7/8",
          link: "https://dslming.github.io/musicplayer",
          mobile: 1
        },
        {
          name: "FF91 汽车",
          time: "2019/10/12",
          link: "https://dslming.github.io/musicplayer",
          mobile: 1
        },
        {
          name: "在线家装",
          time: "2019/12/9",
          link: "https://dslming.github.io/room3d",
          mobile: 0
        },
        {
          name: "定制衣服",
          time: "2019/12/24",
          link: "https://dslming.github.io/musicplayer",
          mobile: 0
        }
      ]
    };
  }
};
</script>

<style lang="scss">
li {
  list-style: none;
}

a {
  cursor: pointer;
}
.experience {
  h4 {
    font-size: 24px;
    clear: both;
    text-align: center;
    color: #fff;
  }
  .enterprise {
    padding-left: 10%;
    .time,
    .time_now {
      position: relative;
      padding-left: 24px;
      margin-bottom: 0;
      font-size: 16px;
      color: rgb(240, 235, 235);
      text-align: left;
    }
    .time::before {
      content: "";
      position: absolute;
      left: 0px;
      top: 3px;
      width: 18px;
      height: 18px;
      display: inline-block;
      background: #ccc;
      border-radius: 9px;
    }
    .timeNow::before {
      content: "";
      position: absolute;
      left: 0px;
      top: 3px;
      width: 18px;
      height: 18px;
      display: inline-block;
      background: #3498db;
      border-radius: 9px;
    }
    > p {
      font-size: 16px;
      color: #fff;
    }
    .detail {
      padding-left: 20px;
      padding-top: 14px;
      height: auto;
      margin-left: 8px;
      border-left: 3px solid #ccc;
      overflow: hidden;
      .personal_logo {
        float: left;
        margin-right: 20px;
        img {
          width: 100px;
        }
      }
      .experience_logo {
        float: left;
        margin-right: 20px;
        img {
          width: 100px;
        }
      }
      .desc {
        float: left;
        > p {
          font-size: 22px;
          color: #fff;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
          > a {
            font-weight: bold;
          }
          > span {
            font-size: 14px;
            color: #fff;
          }
        }

        .point {
          color: rgb(235, 235, 241);
          font-size: 14px;
          text-align: left;
        }
        ul {
          li {
            color: #fff;
          }
          p {
            color: #fff;
          }
        }
      }
    }
  }
}

.footer {
  position: fixed;
  bottom: 0.1rem;
  text-align: center;
  color: #fff;
  text-align: center;
  width: 100%;
  height: 40px;
}
</style>
