"use strict";angular.module("nashaLeptaApp").directive("nlArticle",["$firebaseObject","$sce","FirebaseLink",function(a,b,c){return{templateUrl:"templates/directives/nl-article.html",restrict:"E",scope:{data:"@",auth:"="},link:function(d,e,f){var g=new Firebase(c+"/"+f.data),h=a(g);h.$loaded().then(function(a){a.$value.indexOf("picasa=")>0||a.$value.indexOf("ng-")>0||a.$value.indexOf("pop-up")>0?(d.toShow=null,d.toShowCompile=a.$value,console.log("in toShowCompile")):(d.toShow=b.trustAsHtml(a.$value),d.toShowCompile=null),d.toEdit=a})["catch"](function(a){console.error("Error:",a)})},controller:"UpdateTemplateCtrl"}}]),angular.module("nashaLeptaApp").controller("AuthCtrl",["$scope","$rootScope","$firebaseAuth","FirebaseLink",function(a,b,c,d){var e=new Firebase(d);b.auth=c(e),a.isShowLogin=!1,a.signIn=function(){b.auth.$authWithPassword({email:a.email,password:a.password}).then(function(a){b.auth.user=a.password})["catch"](function(a){console.error("Authentication failed:",a)})},a.logOut=function(){b.auth.$unauth(),b.auth.user=null},a.showLogin=function(){a.isShowLogin=!a.isShowLogin}}]),angular.module("nashaLeptaApp").controller("UpdateTemplateCtrl",["$scope","editorOptions","$sce","Lightbox",function(a,b,c,d){a.editorOptions=b,a.edit=function(){a.isEdit=!0,a.isPreview=!1},a.preview=function(){a.isPreview=!0,a.toShow=c.trustAsHtml(a.toEdit.$value)},a.save=function(){a.toEdit.$save(),a.toShow=c.trustAsHtml(a.toEdit.$value),a.isEdit=!1},a.openLightboxModal=function(a){var b=[a];console.log(b),d.keyboardNavEnabled=!1,d.openModal(b,0)}}]),angular.module("nashaLeptaApp").constant("editorOptions",{language:"ru",allowedContent:!0,entities:!1,extraPlugins:"image2,youtube,justify,font,embed,find,iframe,table,tableresize,tabletools,clipboard,liststyle,selectall,uicolor,colorbutton,dialogui,dialog,lineutils,showblocks,autolink,widget,widgetbootstrap,widgettemplatemenu",toolbar:"full",toolbar_full:[{name:"base",items:["Bold","Italic","Underline","ShowBlocks"]},{name:"paragraph",items:["NumberedList","BulletedList","-","Outdent","Indent","-","Blockquote"]},{name:"support",items:["JustifyLeft","JustifyCenter","JustifyRight","JustifyBlock"]},{name:"editing",items:["Find","Replace","-","SelectAll"]},{name:"links",items:["Link","Unlink","Anchor"]},{name:"clipboard",items:["Cut","Copy","Paste","HorizontalRule"]},{name:"UnRe",items:["Undo","Redo"]},{name:"styles",items:["Styles","Font","Format","FontSize"]},{name:"styles",items:["PasteText","PasteFromWord","RemoveFormat"]},{name:"colors",items:["TextColor","BGColor"]},{name:"insert",items:["Image","Table","SpecialChar"]},{name:"video",items:["Youtube"]},{name:"others",items:["Source"]},{name:"tools",items:["Maximize"]},{name:"bootstrap",items:["WidgetTemplateMenu"]}]}),angular.module("nashaLeptaApp").controller("AdminRoutesCtrl",["$scope","$route",function(a,b){a.routes=b.routes}]),$(function(){$.fn.scrollToTop=function(){$(this).hide().removeAttr("href"),"0"!=$(window).scrollTop()&&$(this).fadeIn("slow");var a=$(this);$(window).scroll(function(){"0"==$(window).scrollTop()?$(a).fadeOut("slow"):$(a).fadeIn("slow")}),$(this).click(function(){$("html, body").animate({scrollTop:0},"slow")})}}),$(function(){$("#toTop").scrollToTop()}),angular.module("nashaLeptaApp").directive("compile",["$compile",function(a){return function(b,c,d){b.$watch(function(a){return a.$eval(d.compile)},function(d){c.html(d),a(c.contents())(b)})}}]),angular.module("nashaLeptaApp").controller("CarouselCtrl",["$scope",function(a){a.myInterval=5e3,a.noWrapSlides=!1}]),angular.module("nashaLeptaApp").controller("MainCtrl",["$scope","$location","uiGmapGoogleMapApi","Lightbox",function(a,b,c,d){a.location=function(){return b.path()},c.then(function(a){}),a.map={center:{latitude:50.44378,longitude:30.469639},draggable:!0,zoom:12},a.options={scrollwheel:!0},a.marker1={id:0,coords:{latitude:50.427852,longitude:30.527468},options:{draggable:!1,title:"Церква святителя Миколая Чудотворця",animation:1}},a.marker2={id:1,coords:{latitude:50.454456,longitude:30.362693},options:{draggable:!1,title:"Церква на честь Казанської ікони Божої Матері",animation:1}},a.openLightboxModal=function(a){var b=[a];console.log(b),d.keyboardNavEnabled=!1,d.openModal(b,0)}}]),angular.module("nashaLeptaApp").controller("ResponsiveCtrl",["$scope","$window",function(a,b){a.news2016=function(){return b.innerWidth>770},a.about=function(){return b.innerWidth>770},a.articles=function(){return b.innerWidth>770},a.gratitude=function(){return b.innerWidth>770},a.photos=function(){return b.innerWidth>790},a.videos=function(){return b.innerWidth>940},a.contacts=function(){return b.innerWidth>1018}}]),angular.module("nashaLeptaApp").directive("nlRandomGroup",function(){return{templateUrl:"templates/directives/nl-random-group.html",restrict:"E",link:function(a,b,c){},controller:["$scope",function(a){var b=0;this.assignNumber=function(){return b++};var c=Math.floor(1e3*Math.random()+1);console.log("currentRandom: "+c),this.getCounter=function(){return b},this.getCurrentRandom=function(){return c},a.$on("$routeChangeStart",function(a,b){c++,console.log("currentRandom: "+c)})}]}}),angular.module("nashaLeptaApp").constant("FirebaseLink","https://boiling-fire-9518.firebaseio.com"),angular.module("nashaLeptaApp").directive("nlRandomAlbum",function(){return{replace:!0,templateUrl:"templates/directives/nl-random-album.html",restrict:"E",scope:{date:"@",link:"@",title:"@",currentRandom:"@"},link:function(a,b,c,d){var e=d.assignNumber();a.isActive=function(){var a=d.getCurrentRandom()%d.getCounter()===e;return a}},require:"^nlRandomGroup"}}),angular.module("nashaLeptaApp").controller("MainCarouselCtrl",["$scope",function(a){a.isSliderShown=!0,window.setTimeout(function(){a.isSliderShown=!1},1e4)}]),angular.module("nashaLeptaApp").controller("GalleryLightboxCtrl",["$scope","Lightbox",function(a,b){a.openLightboxModal=function(c){b.keyboardNavEnabled=!1,b.openModal(a.photoObjects,c)}}]),angular.module("nashaLeptaApp").directive("popUp",function(){return{replace:!0,templateUrl:"templates/directives/pop-up.html",scope:{src:"@",width:"@",height:"@"},restrict:"C",link:function(a,b,c){},controller:["$scope","Lightbox",function(a,b){a.openLightboxModal=function(a){var c=[a];console.log(c),b.keyboardNavEnabled=!1,b.openModal(c,0)}}]}});