(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["post"],{"159b":function(t,a,r){var n=r("da84"),e=r("fdbc"),o=r("17c2"),c=r("9112");for(var s in e){var i=n[s],u=i&&i.prototype;if(u&&u.forEach!==o)try{c(u,"forEach",o)}catch(f){u.forEach=o}}},"17c2":function(t,a,r){"use strict";var n=r("b727").forEach,e=r("a640"),o=r("ae40"),c=e("forEach"),s=o("forEach");t.exports=c&&s?[].forEach:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}},"37d3":function(t,a,r){"use strict";r.r(a);var n=function(){var t=this,a=t.$createElement,r=t._self._c||a;return r("div",{staticClass:"row justify-content-center"},[Object.keys(t.result).length>0?[r("app-list-content",{attrs:{tile:t.result,type:"detail",header:""}})]:t._e()],2)},e=[],o=(r("4160"),r("159b"),r("bc3a")),c=r.n(o),s=r("e3f2"),i={data:function(){return{result:{}}},components:{appListContent:s["a"]},methods:{getData:function(){var t=this,a="/r/"+t.$route.params.subreddit+"/comments/"+t.$route.params.postid+"/"+t.$route.params.postlink;a+=".json",c.a.get(a,{params:{limit:1,depth:1}}).then((function(a){a.data.forEach((function(a){1==a.data.children.length&&a.data.children.forEach((function(a){a.data.id==t.$route.params.postid&&(t.result=a.data)}))}))})).catch((function(a){console.log(a),t.result=[]}))}},created:function(){var t=this;t.getData()}},u=i,f=r("2877"),l=Object(f["a"])(u,n,e,!1,null,null,null);a["default"]=l.exports},4160:function(t,a,r){"use strict";var n=r("23e7"),e=r("17c2");n({target:"Array",proto:!0,forced:[].forEach!=e},{forEach:e})},a640:function(t,a,r){"use strict";var n=r("d039");t.exports=function(t,a){var r=[][t];return!!r&&n((function(){r.call(null,a||function(){throw 1},1)}))}}}]);