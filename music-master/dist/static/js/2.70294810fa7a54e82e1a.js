webpackJsonp([2],{HzpL:function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=s("gBtx"),a=s.n(n),e=s("IQww"),d=0,r=null;window.angle=d;var l={destroyed:function(){e.a.stopAnimationFrame()},mounted:function(){this,r=this.$refs.wind,e.a.registAnimationFrame(this.loop)},methods:{loop:function(){if(e.a.lmaudio.subject.playing){var t=e.a.lmaudio.getAverageFrequency();(d+=a()(.5*t))>1e4&&(d=0),r.style.webkitTransform="rotate("+-d+"deg)",t}}}},o={render:function(){var t=this.$createElement,i=this._self._c||t;return i("div",[i("div",{attrs:{id:"canvasFather"}}),this._v(" "),i("div",{staticClass:"windmill"},[i("div",{staticClass:"stick"}),this._v(" "),i("div",{ref:"wind",staticClass:"wind"},[i("div",{staticClass:"wind1"}),this._v(" "),i("div",{staticClass:"wind2"}),this._v(" "),i("div",{staticClass:"wind3"}),this._v(" "),i("div",{staticClass:"wind4"})])])])},staticRenderFns:[]};var c=s("VU/8")(l,o,!1,function(t){s("ntS0")},null,null);i.default=c.exports},ntS0:function(t,i){}});
//# sourceMappingURL=2.70294810fa7a54e82e1a.js.map