<template>
  <div class="player">
    <!-- 顶部 -->
    <div class="top">
      <div class="back" @click="back">
        <i class="fa fa-angle-down"></i>
      </div>
      <h1 class="title" v-html="currentSong.name"></h1>
      <h2 class="subtitle" v-html="currentSong.singer"></h2>
    </div>

    <!-- 中间 -->
    <div class="middle" @click="changeMiddle">
      <el-select v-model="value7" placeholder="着色器" @change="changeVisual">
        <el-option-group
          v-for="group in options3"
          :key="group.label"
          :label="group.label">
          <el-option
            v-for="item in group.options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-option-group>
      </el-select>

      <component v-bind:is="currentComponent"></component>
    </div>

    <!-- 底部 -->
    <div class="bottom">
      {{`${percent}%`}}
      <div class="progress-wrapper">
        <span class="time time-l">{{format(currentTime)}}</span>
        <div class="progress-bar-wrapper">
          <progress-bar @percentChangeEnd="percentChangeEnd" @percentChange="percentChange"></progress-bar>
        </div>
        <span class="time time-r">{{format(duration)}}</span>
      </div>
      <div class="operators">
        <div class="icon i-left">
          <i class="iconfont mode" :class="iconMode" @click="changeMode"></i>
        </div>
        <div class="icon i-left">
          <i class="iconfont icon-prev"></i>
        </div>
        <div class="icon i-center">
          <i class="iconfont" @click="togglePlaying" :class="playIcon"></i>
        </div>
        <div class="icon i-right">
          <i class="iconfont icon-test"></i>
        </div>
        <div class="icon i-right">
          <i class="iconfont" @click="handleDown" :class="getFavoriteIcon(currentSong)"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Select, OptionGroup, Option } from "element-ui";
import SongLoading from "base/songLoading/songLoading";
import ProgressCircle from "base/progress-circle/progress-circle";
import ProgressBar from "base/progress-bar/progress-bar";
import Lyric from "lyric-parser";
import Scroll from "base/scroll/scroll";
import Playlist from "cpnts/playlist/playlist";
import { mapGetters, mapMutations, mapActions, mapState } from "vuex";
import { getSong, getSongByURL, getLyric } from "api/song";
import { playMode } from "common/js/config";
import { shuffle } from "common/js/utl";
import musicVisual from "3d/MusicVisual";
import Hammer from "hammerjs";

let that = null;
Vue.use(Select);
Vue.use(OptionGroup);
Vue.use(Option);

export default {
  data() {
    return {
      url: "",
      songReady: false,
      currentTime: 0,
      duration: 0,
      percent: 0,
      radius: 32,
      currentLyric: null,
      currentLineNum: 0,
      currentShow: "cd",
      playingLyric: "",
      noLyric: false,
      playingAudio: false,
      showMiddle: false,
      scrollData: null,
      currentComponent: "shader",
      options3: [
        {
          label: "自然科学",
          options: [
            {
              value: "universe",
              label: "宇宙"
            },
            {
              value: "wind",
              label: "风车"
            },
            {
              value: "light",
              label: "灯泡"
            },
            {
              value: "cat",
              label: "猫咪"
            },
            {
              value: "particles",
              label: "粒子"
            },
            {
              value: "wave",
              label: "波浪"
            },
            {
              value: "shader",
              label: "着色器"
            }
          ]
        },
        {
          label: "风景",
          options: [
            {
              value: "Chengdu",
              label: "开发中"
            }
          ]
        }
      ],
      value7: ""
    };
  },
  created() {
    that = this;
    this.move = false;
  },
  mounted() {
    // if (musicVisual.lmaudio.mode === "dev") {
    //   this.changeVisual("shader");
    // }
    // if(!this.currentSong.id) {
    //   this.currentSong.id = localStorage.getItem('songId')
    // }
    // if(this.currentSong.id !== 'null') {
    //   this.currentSong.id && this._getSong(this.currentSong.id)
    //   localStorage.setItem('songId', this.currentSong.id)
    // }
    this._getSong();
  },
  computed: {
    iconMode() {
      if (this.mode === playMode.sequence) {
        return "icon-next";
      } else if (this.mode === playMode.loop) {
        return "icon-loop";
      } else {
        return "icon-random";
      }
    },
    cdCls() {
      return this.playing ? "play" : "play pause";
    },
    miniIcon() {
      return this.playing ? "fa-stop" : "fa-play";
    },
    playIcon() {
      return this.playingAudio ? "icon-stop" : "icon-bofangicon";
    },
    upDatecurrentLyric() {
      if (this.noLyric) {
        return "暂无歌词";
      }
      if (!this.noLyric) {
        return "歌词加载中";
      }
    },
    ...mapGetters([
      "playlist",
      "fullScreen",
      "currentSong",
      "currentIndex",
      "mode",
      "sequenceList",
      "favoriteList",
      "playing"
    ])
  },
  watch: {
    url(newUrl) {
      let that = this;
      this.setPlayingState(true);
      if (musicVisual.lmaudio.mode === "dev") {
      } else {
        musicVisual.lmaudio.loadAudio(newUrl);
      }
      musicVisual.lmaudio.addSubjectListener("isReadyPlay", () => {});
      musicVisual.startAnimationFrame();
      musicVisual.lmaudio.addSubjectListener("process", pro => {
        that.percentChange(pro);
        that.percent = pro;
      });
    }
  },
  methods: {
    handleDown() {
      musicVisual.lmaudio.download();
    },
    changeVisual(value) {
      this.currentComponent = value;
      musicVisual.startAnimationFrame();
    },
    handelCanPlay(value) {
      if (value) {
        alert("歌曲加载完成");
      }
    },
    changeMiddle() {
      if (this.currentShow === "cd") {
        this.currentShow = "lyric";
      } else {
        this.currentShow = "cd";
      }
      // console.log(this.currentShow)
    },
    getFavoriteIcon(song) {
      if (this.isFavorite(song)) {
        return "icon-like";
      }
      return "icon-dislike";
    },
    toggleFavorite(song) {
      if (this.isFavorite(song)) {
        this.deleteFavoriteList(song);
      } else {
        this.saveFavoriteList(song);
      }
    },
    isFavorite(song) {
      const index = this.favoriteList.findIndex(item => {
        return item.id === song.id;
      });
      return index > -1;
    },
    changeMode() {
      const mode = (this.mode + 1) % 3;
      this.setPlayMode(mode);
      let list = null;
      if (mode === playMode.random) {
        list = shuffle(this.sequenceList);
      } else {
        list = this.sequenceList;
      }
      this._resetCurrentIndex(list);
      this.setPlaylist(list);
    },
    _resetCurrentIndex(list) {
      let index = list.findIndex(item => {
        return item.id === this.currentSong.id;
      });
      this.setCurrentIndex(index);
    },
    percentChange(percent) {
      this.move = true;
      const currentTime = this.duration * percent;
      this.currentTime = currentTime;
      if (this.currentLyric) {
        this.currentLyric.seek(currentTime * 1000);
      }
    },
    percentChangeEnd(percent) {
      this.move = false;
    },
    updateTime(e) {
      if (this.move) {
        return;
      }
      this.currentTime = e.target.currentTime;
    },
    format(interval) {
      interval = interval | 0;
      let minute = (interval / 60) | 0;
      let second = interval % 60;
      if (second < 10) {
        second = "0" + second;
      }
      return minute + ":" + second;
    },
    end() {
      if (this.mode === playMode.loop) {
        this.loop();
      } else {
        this.next();
      }
    },
    loop() {},
    error() {
      this.songReady = true;
    },
    back() {
      this.setFullScreen(false);
      this.currentShow = "cd";
    },
    open() {},
    togglePlaying() {
      this.playingAudio = !this.playingAudio;
      if (this.playingAudio) {
        musicVisual.lmaudio.play();
      } else {
        musicVisual.lmaudio.pause();
      }
    },
    _getSong(id) {
      // getSongByURL("https://dslming.github.io/res/china.mp3").then(res => {
      //   // let tempurl = res.data.data[0].url
      //   // let urlNoHead = tempurl.substr(tempurl.indexOf(':')+3);
      //   // this.url = 'https://' + urlNoHead;
      //   this.url = "https://dslming.github.io/res/china.mp3";
      // });
      this.url =
        "https://dslming.github.io/res/demo.mp3?nsukey=KmJARUe7MXeX8CZuhCVQ%2FEYdh%2BO0ARjgJTCREIDKfWom6rro0BRFmU5SsDqUQufYFpHaCJf5sqbhNb5moc8OlShOjdYyNOCx%2FvcDs1T1mACEtB%2BGY1Yg8bf1Qiu23f1kR1ZBDmhci%2FBVLIbxVJygFUU4DO7SVlGOVrOmT0b27hba48gvuEVCk0b2qCg57DiQJdTtOxPBU1MzV92AKiRTQg%3D%3D";
    },
    _getLyric(id) {
      if (this.currentLyric) {
        this.currentLyric.stop();
        this.currentLyric = null;
      }
      this.noLyric = false;
      getLyric(id)
        .then(res => {
          this.currentLyric = new Lyric(res.data.lrc.lyric, this.handleLyric);
          if (this.playing) {
            this.currentLyric.play();
            // 歌词重载以后 高亮行设置为 0
            this.currentLineNum = 0;
            this.$refs.lyricList.scrollTo(0, 0, 1000);
          }
        })
        .catch(() => {
          this.currentLyric = null;
          this.noLyric = true;
          this.currentLineNum = 0;
        });
    },
    handleLyric({ lineNum, txt }) {
      this.currentLineNum = lineNum;
      if (lineNum > 5) {
        let lineEl = this.$refs.lyricLine[lineNum - 5];
        this.$refs.lyricList.scrollToElement(lineEl, 1000);
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000);
      }
    },
    ...mapMutations({
      setFullScreen: "SET_FULL_SCREEN",
      setPlayingState: "SET_PLAYING_STATE",
      setCurrentIndex: "SET_CURRENT_INDEX",
      setPlayMode: "SET_PLAY_MODE",
      setPlaylist: "SET_PLAYLIST"
    }),
    ...mapActions(["saveFavoriteList", "deleteFavoriteList", "savePlayHistory"])
  },
  components: {
    ProgressBar,
    ProgressCircle,
    Scroll,
    Playlist,
    SongLoading,
    universe: resolve => {
      require(["3d/001-universe/universe"], resolve);
    },
    wind: resolve => {
      require(["3d/002-wind/wind"], resolve);
    },
    light: resolve => {
      require(["3d/003-light/light"], resolve);
    },
    cat: resolve => {
      require(["3d/004-cat/cat"], resolve);
    },
    particles: resolve => {
      require(["3d/005-particles/particles"], resolve);
    },
    wave: resolve => {
      require(["3d/006-wave/wave"], resolve);
    },
    shader: resolve => {
      require(["3d/007-shader/shader"], resolve);
    },
    smiley: resolve => {
      require(["3d/008-smiley/smiley"], resolve);
    }
  }
};
</script>

<style lang="scss">
@import "~common/scss/variable";
@import "~common/scss/mixin";
.player {
  background-color: #ccc;
  width: 100%;
  height: 100%;
  position: relative;
}
.top {
  position: relative;
  background-color: rgba(1, 1, 1, 0.1);
  z-index: 99999999;
  height: 60px;
  width: 100%;
  float: left;
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 50;
    .fa-angle-down {
      display: block;
      padding: 5px 9px;
      font-size: 35px;
      color: $color-theme-l;
    }
  }
  .title {
    width: 70%;
    margin: 0 auto;
    padding-top: 10px;
    line-height: 20px;
    text-align: center;
    @include no-wrap();
    font-size: $font-size-large;
    font-weight: bold;
    color: $color-text-l;
  }
  .subtitle {
    width: 70%;
    margin: 0 auto;
    line-height: 20px;
    text-align: center;
    @include no-wrap();
    font-size: $font-size-small-x;
    color: $color-text-l;
  }
}

.middle {
  position: fixed;
  width: 100%;
  height: 100%;
}

.bottom {
  position: absolute;
  bottom: 2%;
  width: 100%;
  color: #fff;
  .progress-wrapper {
    display: flex;
    align-items: center;
    width: 80%;
    margin: 0px auto;
    padding: 10px 0;
    .time {
      color: $color-text-l;
      font-size: $font-size-small;
      flex: 0 0 30px;
      line-height: 30px;
      width: 30px;
      &.time-l {
        text-align: left;
      }
      &.time-r {
        text-align: right;
        color: $color-text-gg;
      }
    }
    .progress-bar-wrapper {
      flex: 1;
    }
  }
  .operators {
    display: flex;
    align-items: center;
    .icon {
      flex: 1;
      color: $color-theme-l;
      &.disable {
        color: $color-theme;
      }
      i {
        font-size: 30px;
      }
      .mode {
        font-size: 25px;
      }
      &.i-left {
        text-align: right;
      }
      &.i-center {
        padding: 0 20px;
        text-align: center;
        i {
          font-size: 40px;
        }
      }
      &.i-right {
        text-align: left;
      }
      .icon-like {
        color: $color-sub-theme;
      }
    }
  }
}

.el-select {
  display: inline-block;
  position: absolute !important;
  z-index: 99999999;
  bottom: 20%;
  right: 5%;
  width: 100px;
}
</style>
