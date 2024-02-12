(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["LoginView"],{"3bea":function(e,t,o){"use strict";o.r(t);var n=function(){var e=this,t=e._self._c;return t("MhRouterView",{staticClass:"LoginView view hSpace hSpace--app",attrs:{isContentReady:e.isContentReady}},[t("div",{staticClass:"LoginView__inner view__inner"},[t("div",{staticClass:"LoginView__form"},[t("KnFormHeaderRow",{attrs:{title:"Login"}}),t("KnFormFieldRow",[t("div",{staticClass:"richText",staticStyle:{"grid-column":"span 12"}},[t("p",[e._v(" Before you can add a new record it's needed to login with your GeoServer Account at "),t("a",{attrs:{href:"https://geoserver.dainst.org/"}},[e._v("https://geoserver.dainst.org/")])]),t("p",[e._v(" If you do not have an account yet please follow the link to register. ")])])]),t("KnFormFieldRow",[t("div",{staticStyle:{"grid-column":"span 12",display:"flex","justify-content":"flex-end"}},[t("div",[t("br"),t("BaseButton",{staticClass:"font font--sizeLarge font--bold",attrs:{tag:"a",href:e.registerUrl,isOutlined:!0,isDisabled:!1}},[t("template",{slot:"before"}),t("template",{slot:"default"},[e._v("Register")])],2),t("BaseButton",{staticClass:"font font--sizeLarge font--bold",attrs:{tag:"a",href:e.loginUrl,isOutlined:!1,isDisabled:!1}},[t("template",{slot:"before"}),t("template",{slot:"default"},[e._v("Login")]),t("template",{slot:"after"},[t("MhIcon",{attrs:{type:"arrow-right"}})],1)],2),t("br"),t("br")],1)])])],1)])])},r=[],s=(o("5e50"),o("2f62")),i=o("33a5"),a=o("3ac1"),l=o("d54a"),c=o("cdd1"),d=o("275d"),u=o("f3f3"),h={name:"LoginView",components:{MhRouterView:a["a"],KnFormHeaderRow:l["a"],KnFormFieldRow:c["a"],BaseButton:d["a"],MhIcon:u["a"]},mixins:[i["a"]],directives:{},props:{},data(){return{isContentReady:!1,posts:void 0}},watch:{},computed:{app(){return this.$root.$children[0]},elmClasses(){let e=[];return e},...Object(s["b"])(["currentEnv","requestToken","accessToken"]),locationHrefWithoutQuery(){const e=window.location,t=e.protocol+"//"+e.host+e.pathname+e.hash;return t},registerUrl(){const e=this.locationHrefWithoutQuery.replace("#","%23"),t=this._.get(this.currentEnv,"registerUrl","").replace("%redirect_uri%",e);return t},loginUrl(){const e=location.protocol+"//"+location.host,t=this._.get(this.currentEnv,"loginUrl","").replace("%redirect_uri%",e);return t}},methods:{fetchAuthToken(e=!0){const t=this.locationHrefWithoutQuery,o=window.location.search,n=new URLSearchParams(o),r=n.get("code");e&&(console.group(this.$options.name,"• fetchAuthToken()"),console.log("redirectUri:",t),console.log("queryString:",o),console.log("requestToken:",r),console.groupEnd()),this.$router.replace("/login/"),this.$store.commit("setRequestToken",r);fetch(this.currentEnv.tokenUrl,{body:new URLSearchParams({grant_type:"authorization_code",code:r,redirect_uri:t,client_id:this.currentEnv.tokenClientId}),headers:{"Content-Type":"application/x-www-form-urlencoded"},method:"POST"}).then(e=>e.json()).then(e=>{const t=this._.get(e,"access_token");console.log("fetchAuthToken:",e),t&&(this.$store.commit("setAccessToken",t),this.$router.replace("/edit/"))})}},mounted(){this.isContentReady=!0}},p=h,m=(o("adce"),o("2877")),f=Object(m["a"])(p,n,r,!1,null,null,null);t["default"]=f.exports},"3d84":function(e,t,o){},5253:function(e,t,o){"use strict";o("6159")},6159:function(e,t,o){},"8b6b":function(e,t,o){"use strict";o("3d84")},adce:function(e,t,o){"use strict";o("cf93")},cdd1:function(e,t,o){"use strict";var n=function(){var e=this,t=e._self._c;return t("div",{staticClass:"KnFormFieldRow contentModule hSpace hSpace--formRow",class:e.elmClasses,attrs:{name:"KnFormFieldRow"}},[t("div",{staticClass:"KnFormFieldRow__inner contentModule__inner"},[e._t("default")],2)])},r=[],s={name:"KnFormFieldRow",components:{},mixins:[],props:{},data(){return{}},watch:{someVar:{handler:function(e,t){},immediate:!0,deep:!0}},computed:{app(){return this.$root.$children[0]},elmClasses(){let e=[];return e}},methods:{myFunction(e=!0){e&&(console.groupCollapsed(this.$options.name,"• myFunction()"),console.groupEnd()),alert("myFunction")}},created(){},mounted(){},destroyed(){}},i=s,a=(o("8b6b"),o("2877")),l=Object(a["a"])(i,n,r,!1,null,null,null);t["a"]=l.exports},cf93:function(e,t,o){},d54a:function(e,t,o){"use strict";var n=function(){var e=this,t=e._self._c;return t("div",{staticClass:"KnHeaderRow contentModule hSpace hSpace--formRow",class:e.elmClasses,attrs:{name:"KnHeaderRow"}},[t("div",{staticClass:"KnHeaderRow__inner contentModule__inner"},[t("div",[t("h2",{staticClass:"KnHeaderRow__title font font--medium font--sizeBig",domProps:{innerHTML:e._s(e.title)}}),t("h3",{staticClass:"KnHeaderRow__subTitle font font--regular font--sizeBig",domProps:{innerHTML:e._s(e.subTitle)}})]),e.isCloseable?t("a",{staticClass:"circleIcon color color--primary",attrs:{role:"button"},on:{click:e.onClickCloseBtn}},[t("MhIcon",{attrs:{type:"cross"}})],1):e._e()])])},r=[],s=(o("5e50"),o("f3f3")),i={name:"KnHeaderRow",components:{MhIcon:s["a"]},mixins:[],props:{title:{type:[String,Boolean],default:"The title",required:!1},subTitle:{type:[String,Boolean],default:"",required:!1},isCloseable:{type:[String,Boolean],default:!1,required:!1}},data(){return{}},watch:{someVar:{handler:function(e,t){},immediate:!0,deep:!0}},computed:{app(){return this.$root.$children[0]},elmClasses(){let e=[];return e}},methods:{onClickCloseBtn(e=!0){e&&(console.groupCollapsed(this.$options.name,"• onClickCloseBtn()"),console.groupEnd()),alert("onClickCloseBtn")}},created(){},mounted(){},destroyed(){}},a=i,l=(o("5253"),o("2877")),c=Object(l["a"])(a,n,r,!1,null,null,null);t["a"]=c.exports}}]);
//# sourceMappingURL=LoginView.5913fdbc.js.map