webpackJsonp([1],{NHnr:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=t("+VlJ"),i={render:function(){var e=this.$createElement,n=this._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},staticRenderFns:[]};var o=t("C7Lr")({name:"App"},i,!1,function(e){t("UKid")},null,null).exports,r=t("KGCO"),s=t("AA3o"),c=t.n(s),l=t("xSur"),d=t.n(l),u=window.THREE,h=function(){function e(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=n.fieldOfView,a=void 0===t?60:t,i=n.nearPlane,o=void 0===i?1:i,r=n.farPlane,s=void 0===r?2e3:r,l=n.canvasWidth,d=void 0===l?1024:l,h=n.canvasHeight,v=void 0===h?960:h;c()(this,e);var m=d/v;this.camera=new u.PerspectiveCamera(a,m,o,s),this.init()}return d()(e,[{key:"init",value:function(){this.camera.position.x=0,this.camera.position.z=1e3,this.camera.position.y=300,this.camera.lookAt(new u.Vector3(0,0,0))}}]),e}(),v=window.THREE,m=function e(n){var t=n.canvasHeight,a=n.canvasWidth,i=n.canvasFatherId;c()(this,e),this.render=new v.WebGLRenderer({alpha:!0,antialias:!0}),this.render.setSize(a,t),this.render.shadowMapEnabled=!0,document.getElementById(i).appendChild(this.render.domElement)},p=window.THREE,f=function(){function e(){c()(this,e),this.listener=new p.AudioListener,this.audioLoader=new p.AudioLoader,this.sound=new p.Audio(this.listener),this.analyser=new p.AudioAnalyser(this.sound,512),this.sound.setVolume(1),this.playing=!1,this.isReadPlay=!1}return d()(e,[{key:"loadFile",value:function(e){var n=this;n.audioLoader.load(e,function(e){n.sound.setBuffer(e),n.sound.setLoop(!0),n.sound.setVolume(1),n.isReadPlay=!0})}},{key:"loadSong",value:function(e,n){var t=this,a=e.name,i=window.URL.createObjectURL(e);this.audioLoader.load(i,function(e){t.sound.setBuffer(e),t.sound.setLoop(!0),t.sound.setVolume(1),t.playing&&t.sound.stop()},function(e){var t=e.loaded/e.total*100,i="Loading "+a+": "+Math.floor(t)+"%";n.data=i,console.log(i)},function(e){console.log(e)})}}]),e}(),g=window.THREE,y=null;function w(){var e=window.innerHeight,n=window.innerWidth;y.lmrender.render.setSize(n,e),y.lmcamera.camera.aspect=n/e,y.lmcamera.camera.updateProjectionMatrix()}function E(e){}function R(e){}function b(e){}function L(e){}function F(e){}function H(e){}var k=function(){function e(n){var t=n.canvasHeight,a=n.canvasWidth,i=n.canvasFatherId;c()(this,e),y=this,window.THREE=g,this.scene=null,this.lmcamera=null,this.lmrender=null,this.lmaudio=null,this.initScene(),this.initCamera(),this.initRender({canvasHeight:t,canvasWidth:a,canvasFatherId:i}),this.initAudio(),this.controls=new g.TrackballControls(this.lmcamera.camera)}return d()(e,[{key:"initScene",value:function(){this.scene=new g.Scene,this.scene.background=new g.Color(655398)}},{key:"initCamera",value:function(){this.lmcamera=new h}},{key:"initRender",value:function(e){var n=e.canvasHeight,t=e.canvasWidth,a=e.canvasFatherId;this.lmrender=new m({canvasHeight:n,canvasWidth:t,canvasFatherId:a})}},{key:"initAudio",value:function(){this.lmaudio=new f,this.scene.add(this.lmaudio.sound)}},{key:"initBroserInterface",value:function(){window.addEventListener("resize",w,!1),document.addEventListener("mousemove",E,!1),document.addEventListener("mousedown",R,!1),document.addEventListener("mouseup",b,!1),document.addEventListener("touchstart",L,!1),document.addEventListener("touchend",F,!1),document.addEventListener("touchmove",H,!1)}}]),e}(),_=[{pct:0,color:{r:244,g:238,b:66}},{pct:.5,color:{r:65,g:244,b:104}},{pct:1,color:{r:65,g:223,b:244}}],S=function(){function e(n,t){c()(this,e);var a=document.getElementsByClassName(t)[0];this.Bars=[];for(var i=1/n*100+"%",o=0;o<n;o++){var r=document.createElement("div");r.classList.add("bar"),r.style.width=i,a.appendChild(r),this.Bars.push(r)}this.colorRange=_}return d()(e,[{key:"update",value:function(e){var n=this,t=0;e.forEach(function(e){var a=.8*e;n.Bars[t].style.height=a+"px",n.Bars[t].style.background=n.color(e/255),t++})}},{key:"color",value:function(e){for(var n=1;n<this.colorRange.length-1&&!(e<this.colorRange[n].pct);n++);var t=this.colorRange[n-1],a=this.colorRange[n],i=a.pct-t.pct,o=(e-t.pct)/i,r=1-o,s=o,c={r:Math.floor(t.color.r*r+a.color.r*s),g:Math.floor(t.color.g*r+a.color.g*s),b:Math.floor(t.color.b*r+a.color.b*s)};return"#"+this.componentToHex(c.r)+this.componentToHex(c.g)+this.componentToHex(c.b)}},{key:"componentToHex",value:function(e){var n=e.toString(16);return 1==n.length?"0"+n:n}}]),e}(),A=(t("aozt"),null),C=null,P=null,x={data:function(){return{process:{data:0},playState:"未播放",isReadPlay:!1}},mounted:function(){P=this;var e=(A=new k({canvasHeight:500,canvasWidth:800,canvasFatherId:"canvasFather"})).lmaudio.analyser.getFrequencyData().length;C=new S(e,"bar-container"),this.loop(),window.lmthree=A,this.loadFile("https://1097364388.github.io/static/music/tianfen.mp3")},methods:{uploadFile:function(e){var n=e.target.files[0];A.lmaudio.loadSong(n,this.process)},loop:function(){if(this.isReadPlay=A.lmaudio.isReadPlay,P.playState=!1===A.lmaudio.playing?"未播放":"播放中",A.controls.update(),A.lmrender.render.render(A.scene,A.lmcamera.camera),A.lmaudio.playing){var e=A.lmaudio.analyser.getFrequencyData();C.update(e)}requestAnimationFrame(P.loop)},loadFile:function(e){A.lmaudio.loadFile(e)},play:function(){!1!==this.isReadPlay?(confirm("确定播放?"),A.lmaudio.sound.pause(),A.lmaudio.sound.play(),A.lmaudio.playing=!0):alert("没有加载完...")}}},T={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"box"},[t("div",{attrs:{id:"canvasFather"}}),e._v(" "),t("div",{staticClass:"bar-container"}),e._v(" "),t("input",{attrs:{type:"file"},on:{change:e.uploadFile}}),e._v(" "),t("div",{staticClass:"playState"},[e._v(e._s(e.playState))]),e._v(" "),t("button",{class:{active:e.isReadPlay},on:{click:e.play}},[e._v("播放")]),e._v(" "),t("div",[e._v(e._s(e.process.data))])])},staticRenderFns:[]};var B=t("C7Lr")(x,T,!1,function(e){t("pbrS")},null,null).exports;a.a.use(r.a);var W=new r.a({routes:[{path:"/",component:B}]});a.a.config.productionTip=!1,new a.a({el:"#app",router:W,components:{App:o},template:"<App/>"})},UKid:function(e,n){},pbrS:function(e,n){}},["NHnr"]);
//# sourceMappingURL=app.9b150983814e7596c9d0.js.map