(function(window){var svgSprite='<svg><symbol id="icon-shenglvehao" viewBox="0 0 1024 1024"><path d="M144.129509 398.05736c-60.88538 0-110.207655 49.424603-110.207654 110.309983s49.322274 110.309983 110.207654 110.309983S254.439492 569.355051 254.439492 508.367343c0-60.88538-49.424603-110.309983-110.309983-110.309983z m367.563506 0c-60.88538 0-110.207655 49.424603-110.207655 110.309983S450.807635 618.677326 511.693015 618.677326 621.90067 569.252723 621.90067 508.367343 572.578395 398.05736 511.693015 398.05736z m367.563505 0c-60.88538 0-110.207655 49.424603-110.207654 110.309983s49.322274 110.309983 110.207654 110.309983 110.207655-49.424603 110.207655-110.309983-49.322274-110.309983-110.207655-110.309983z" fill="" ></path></symbol><symbol id="icon-xiaoyu" viewBox="0 0 1024 1024"><path d="M333.44 512l389.632 222.72a38.4 38.4 0 0 1-38.144 66.56l-448-256a38.4 38.4 0 0 1 0-66.56l448-256a38.4 38.4 0 0 1 38.144 66.56L333.376 512z"  ></path></symbol><symbol id="icon-fangdajing" viewBox="0 0 1024 1024"><path d="M668.568 726.463a407.758 407.758 0 0 1-259.132 92.41C183.305 818.872 0 635.567 0 409.435S183.305 0 409.436 0s409.436 183.305 409.436 409.436a407.758 407.758 0 0 1-92.41 259.132L1024 966.106 966.106 1024 668.568 726.463z m-259.132 10.522a327.549 327.549 0 1 0 0-655.098 327.549 327.549 0 0 0 0 655.098z" fill="" ></path></symbol></svg>';var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)