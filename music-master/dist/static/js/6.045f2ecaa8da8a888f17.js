webpackJsonp([6],{"6miR":function(t,e){},"8stH":function(t,e,n){"use strict";e.b=function(t,e){var n=r.b+"/search?keywords="+t+"&offset="+e;return i.a.get(n)},e.c=function(t){var e=r.b+"/search/suggest?keywords="+t;return i.a.get(e)},e.d=function(t){var e=r.b+"/song/detail?ids="+t;return i.a.get(e)},e.a=function(t){var e=r.b+"/search/hot";return i.a.get(e)};var s=n("mtWM"),i=n.n(s),r=n("W/7t")},Bg5i:function(t,e){},"W1+L":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n("Dd8w"),i=n.n(s),r=n("qwAB"),a=n("GQaK"),o=n("3Q4o"),c={data:function(){return{dots:[],currentPageIndex:0}},props:{loop:{type:Boolean,default:!0},autoPlay:{type:Boolean,default:!0},interval:{type:Number,default:4e3}},mounted:function(){var t=this;setTimeout(function(){t._setSliderWidth(),t._initDots(),t._initSlider(),t._onScrollEnd()},20)},methods:{_setSliderWidth:function(){this.children=this.$refs.sliderGroup.children;for(var t=0,e=this.$refs.slider.clientWidth,n=0;n<this.children.length;n++){var s=this.children[n];Object(o.a)(s,"slider-item"),s.style.width=e+"px",t+=e}this.loop&&(t+=2*e),this.$refs.sliderGroup.style.width=t+"px"},_initSlider:function(){this.slider=new a.a(this.$refs.slider,{scrollX:!0,momentum:!1,snap:{loop:this.loop,threshold:.3,speed:400},snapSpeed:400,bounce:!1,stopPropagation:!0,click:!0}),this.slider.on("scrollEnd",this._onScrollEnd)},_onScrollEnd:function(){var t=this.slider.getCurrentPage().pageX;this.currentPageIndex=t,this.autoPlay&&this._play()},_play:function(){var t=this;clearTimeout(this.timer),this.timer=setTimeout(function(){t.slider.next()},this.interval)},_initDots:function(){this.dots=new Array(this.children.length)}},destroyed:function(){clearTimeout(this.timer)}},l={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"slider",staticClass:"slider"},[n("div",{ref:"sliderGroup",staticClass:"slider-group"},[t._t("default")],2),t._v(" "),n("div",{staticClass:"dots"},t._l(t.dots,function(e,s){return n("span",{key:s,staticClass:"dot",class:{active:t.currentPageIndex===s}})}),0)])},staticRenderFns:[]};var d=n("VU/8")(c,l,!1,function(t){n("6miR")},"data-v-5628dac8",null).exports,u=n("m40h"),m=n("8stH"),f=n("PvFA"),h=n("W/7t"),v=n("NYxO"),p=n("F4+m"),g=n("IQww"),_={mixins:[p.a],data:function(){return{banner:[],playList:[],recommendMusic:[]}},created:function(){this._getBanner(),this._getRecommendList(),this._getRecommendMusic(),"dev"===g.a.lmaudio.mode&&this.$router.push("/player")},methods:i()({selectBanner:function(t){var e=this;/^http/.test(t.url)&&window.open(t.url),/\/song\?id/.test(t.url)&&Object(m.d)(t.targetId).then(function(t){var n=t.data.songs[0],s={id:n.id,singer:n.ar[0].name,name:n.name,image:n.al.picUrl,album:n.al.name};e.insertSong(s),e.setFullScreen(!0)})},selectSong:function(t){console.log(t)},handlePlaylist:function(t){var e=t.length>0?"60px":"";this.$refs.recommend.style.bottom=e,this.$refs.scroll.refresh()},selectList:function(t){this.$router.push({path:"/recommend/"+t.id}),this.setMuiscList(t)},_getBanner:function(){var t=this;Object(u.a)().then(function(e){if(e.status===h.a){var n=e.data.banners;t.banner=n.splice(4)}else console.error("Banner 获取失败")})},_getRecommendList:function(){var t=this;Object(u.b)().then(function(e){e.status===h.a?t.playList=e.data.result:console.error("getRecommendList 获取失败")})},_getRecommendMusic:function(){var t=this;Object(u.d)().then(function(e){if(e.status===h.a){var n=e.data.result.map(function(t){return Object(f.b)(t)});n.splice(9),t.recommendMusic=n}else console.error("getRecommendMusic 获取失败")})}},Object(v.d)({setMuiscList:"SET_MUSIC_LIST",setFullScreen:"SET_FULL_SCREEN"}),Object(v.b)(["insertSong"])),components:{Slider:d,Scroll:r.a}},b={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"recommend",staticClass:"recommend"},[n("scroll",{ref:"scroll",staticClass:"recommend-content",attrs:{data:t.playList}},[n("div",[t.banner.length?n("div",{staticClass:"slider-wrapper"},[n("slider",t._l(t.banner,function(e){return n("div",{key:e.id,on:{click:function(n){return n.stopPropagation(),t.selectBanner(e)}}},[n("img",{attrs:{src:e.picUrl}})])}),0)],1):t._e(),t._v(" "),n("div",{ref:"recommendList",staticClass:"recommend-list"},[n("h1",{staticClass:"title"},[t._v("推荐歌单")]),t._v(" "),n("ul",t._l(t.playList,function(e){return n("li",{key:e.id,staticClass:"item"},[n("div",{staticClass:"icon",on:{click:function(n){return t.selectList(e)}}},[n("div",{staticClass:"gradients"}),t._v(" "),n("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.picUrl,expression:"item.picUrl"}]})]),t._v(" "),n("p",{staticClass:"play-count"},[n("i",{staticClass:"fa fa-headphones"}),t._v("\n              "+t._s(Math.floor(e.playCount/1e4))+"万\n            ")]),t._v(" "),n("div",{staticClass:"text"},[n("p",{staticClass:"name"},[t._v(t._s(e.name))])])])}),0)]),t._v(" "),n("div",{ref:"recommendSong",staticClass:"recommend-song"},[n("h1",{staticClass:"title"},[t._v("推荐歌曲")]),t._v(" "),n("ul",t._l(t.recommendMusic,function(e){return n("li",{key:e.id,staticClass:"item",on:{click:function(n){return t.selectSong(e)}}},[n("div",{staticClass:"icon"},[n("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.image,expression:"item.image"}]})]),t._v(" "),n("p",{staticClass:"text"},[t._v(t._s(e.name))]),t._v(" "),n("p",{staticClass:"singer"},[t._v(t._s(e.singer))])])}),0)])])]),t._v(" "),n("router-view")],1)},staticRenderFns:[]};var y=n("VU/8")(_,b,!1,function(t){n("Bg5i")},"data-v-6c75f310",null);e.default=y.exports},m40h:function(t,e,n){"use strict";e.a=function(){var t=r.b+"/banner";return i.a.get(t)},e.b=function(){var t=r.b+"/personalized";return i.a.get(t)},e.d=function(){var t=r.b+"/personalized/newsong";return i.a.get(t)},e.c=function(t){var e=r.b+"/playlist/detail?id="+t;return i.a.get(e)};var s=n("mtWM"),i=n.n(s),r=n("W/7t")}});
//# sourceMappingURL=6.045f2ecaa8da8a888f17.js.map