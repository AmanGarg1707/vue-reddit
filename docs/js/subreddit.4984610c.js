(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["subreddit"],{fd90:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row justify-content-center"},[a("div",{staticClass:"col-md-12 float-left"},[a("app-sort")],1),t.result.length>0?[t.redditData&&"popular"!=t.subreddit&&"all"!=t.subreddit?[a("app-list-content",{attrs:{header:t.redditData,type:"heading"}})]:t._e(),t._l(t.result,(function(e,r){return a("app-list-content",{key:r,attrs:{tile:e.data,header:t.redditData,type:"list"}})}))]:t._e()],2)},o=[],n=a("2909"),s=a("bc3a"),d=a.n(s),l=a("e3f2"),u=a("3a5e"),i={data:function(){return{result:[],after:null,scrolledToBottom:!1,subreddit:"",sort:null,redditData:""}},components:{appListContent:l["a"],appSort:u["a"]},methods:{getData:function(){var t=this;t.subreddit==t.$route.params.subreddit&&t.sort==t.$route.params.sort||(t.result=[],t.after=null),t.subreddit=t.$route.params.subreddit;var e="/r/"+t.subreddit;t.$route.params.sort&&(t.sort=t.$route.params.sort,e+="/"+t.sort),e+=".json",t.fetchSub(),d.a.get(e,{params:{limit:10,after:t.after}}).then((function(e){var a;t.after=e.data.data.after,(a=t.result).push.apply(a,Object(n["a"])(e.data.data.children))})).catch((function(e){console.log(e),t.result=[]}))},scroll:function(){var t=this;window.onscroll=function(){var e=Math.max(window.pageYOffset,document.documentElement.scrollTop,document.body.scrollTop)+window.innerHeight===document.documentElement.offsetHeight;e&&(t.scrolledToBottom=!0)}},fetchSub:function(){var t=this;"popular"!=t.subreddit&&"all"!=t.subreddit?d.a.get("/r/"+t.subreddit+"/about.json").then((function(e){e.data.error||(t.redditData=e.data.data)})).catch((function(t){console.log(t)})):t.redditData=""}},created:function(){var t=this;t.getData()},mounted:function(){var t=this;t.scroll()},watch:{$route:"getData",scrolledToBottom:function(){var t=this;t.scrolledToBottom&&(t.getData(),t.scrolledToBottom=!1)}}},c=i,p=a("2877"),f=Object(p["a"])(c,r,o,!1,null,null,null);e["default"]=f.exports}}]);