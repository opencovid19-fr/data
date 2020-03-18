(function(){/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var n;function aa(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}}
function q(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):{next:aa(a)}}
function ba(a){for(var b,c=[];!(b=a.next()).done;)c.push(b.value);return c}
var ca="function"==typeof Object.create?Object.create:function(a){function b(){}
b.prototype=a;return new b},da;
if("function"==typeof Object.setPrototypeOf)da=Object.setPrototypeOf;else{var ea;a:{var fa={a:!0},ha={};try{ha.__proto__=fa;ea=ha.a;break a}catch(a){}ea=!1}da=ea?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}var ia=da;
function r(a,b){a.prototype=ca(b.prototype);a.prototype.constructor=a;if(ia)ia(a,b);else for(var c in b)if("prototype"!=c)if(Object.defineProperties){var d=Object.getOwnPropertyDescriptor(b,c);d&&Object.defineProperty(a,c,d)}else a[c]=b[c];a.L=b.prototype}
var ja="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)};
function ka(a){a=["object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global,a];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("Cannot find global object");}
var ma=ka(this);function u(a,b){if(b){for(var c=ma,d=a.split("."),e=0;e<d.length-1;e++){var f=d[e];f in c||(c[f]={});c=c[f]}d=d[d.length-1];e=c[d];f=b(e);f!=e&&null!=f&&ja(c,d,{configurable:!0,writable:!0,value:f})}}
function na(a,b,c){if(null==a)throw new TypeError("The 'this' value for String.prototype."+c+" must not be null or undefined");if(b instanceof RegExp)throw new TypeError("First argument to String.prototype."+c+" must not be a regular expression");return a+""}
u("String.prototype.endsWith",function(a){return a?a:function(b,c){var d=na(this,b,"endsWith");b+="";void 0===c&&(c=d.length);for(var e=Math.max(0,Math.min(c|0,d.length)),f=b.length;0<f&&0<e;)if(d[--e]!=b[--f])return!1;return 0>=f}});
u("String.prototype.startsWith",function(a){return a?a:function(b,c){var d=na(this,b,"startsWith");b+="";for(var e=d.length,f=b.length,g=Math.max(0,Math.min(c|0,d.length)),h=0;h<f&&g<e;)if(d[g++]!=b[h++])return!1;return h>=f}});
function oa(){oa=function(){};
ma.Symbol||(ma.Symbol=pa)}
function qa(a,b){this.f=a;ja(this,"description",{configurable:!0,writable:!0,value:b})}
qa.prototype.toString=function(){return this.f};
var pa=function(){function a(c){if(this instanceof a)throw new TypeError("Symbol is not a constructor");return new qa("jscomp_symbol_"+(c||"")+"_"+b++,c)}
var b=0;return a}();
function ra(){oa();var a=ma.Symbol.iterator;a||(a=ma.Symbol.iterator=ma.Symbol("Symbol.iterator"));"function"!=typeof Array.prototype[a]&&ja(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return sa(aa(this))}});
ra=function(){}}
function sa(a){ra();a={next:a};a[ma.Symbol.iterator]=function(){return this};
return a}
function w(a,b){return Object.prototype.hasOwnProperty.call(a,b)}
var ta="function"==typeof Object.assign?Object.assign:function(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(d)for(var e in d)w(d,e)&&(a[e]=d[e])}return a};
u("Object.assign",function(a){return a||ta});
u("WeakMap",function(a){function b(k){this.f=(h+=Math.random()+1).toString();if(k){k=q(k);for(var l;!(l=k.next()).done;)l=l.value,this.set(l[0],l[1])}}
function c(){}
function d(k){var l=typeof k;return"object"===l&&null!==k||"function"===l}
function e(k){if(!w(k,g)){var l=new c;ja(k,g,{value:l})}}
function f(k){var l=Object[k];l&&(Object[k]=function(m){if(m instanceof c)return m;e(m);return l(m)})}
if(function(){if(!a||!Object.seal)return!1;try{var k=Object.seal({}),l=Object.seal({}),m=new a([[k,2],[l,3]]);if(2!=m.get(k)||3!=m.get(l))return!1;m["delete"](k);m.set(l,4);return!m.has(k)&&4==m.get(l)}catch(p){return!1}}())return a;
var g="$jscomp_hidden_"+Math.random();f("freeze");f("preventExtensions");f("seal");var h=0;b.prototype.set=function(k,l){if(!d(k))throw Error("Invalid WeakMap key");e(k);if(!w(k,g))throw Error("WeakMap key fail: "+k);k[g][this.f]=l;return this};
b.prototype.get=function(k){return d(k)&&w(k,g)?k[g][this.f]:void 0};
b.prototype.has=function(k){return d(k)&&w(k,g)&&w(k[g],this.f)};
b.prototype["delete"]=function(k){return d(k)&&w(k,g)&&w(k[g],this.f)?delete k[g][this.f]:!1};
return b});
u("Map",function(a){function b(){var h={};return h.previous=h.next=h.head=h}
function c(h,k){var l=h.f;return sa(function(){if(l){for(;l.head!=h.f;)l=l.previous;for(;l.next!=l.head;)return l=l.next,{done:!1,value:k(l)};l=null}return{done:!0,value:void 0}})}
function d(h,k){var l=k&&typeof k;"object"==l||"function"==l?f.has(k)?l=f.get(k):(l=""+ ++g,f.set(k,l)):l="p_"+k;var m=h.g[l];if(m&&w(h.g,l))for(var p=0;p<m.length;p++){var v=m[p];if(k!==k&&v.key!==v.key||k===v.key)return{id:l,list:m,index:p,u:v}}return{id:l,list:m,index:-1,u:void 0}}
function e(h){this.g={};this.f=b();this.size=0;if(h){h=q(h);for(var k;!(k=h.next()).done;)k=k.value,this.set(k[0],k[1])}}
if(function(){if(!a||"function"!=typeof a||!a.prototype.entries||"function"!=typeof Object.seal)return!1;try{var h=Object.seal({x:4}),k=new a(q([[h,"s"]]));if("s"!=k.get(h)||1!=k.size||k.get({x:4})||k.set({x:4},"t")!=k||2!=k.size)return!1;var l=k.entries(),m=l.next();if(m.done||m.value[0]!=h||"s"!=m.value[1])return!1;m=l.next();return m.done||4!=m.value[0].x||"t"!=m.value[1]||!l.next().done?!1:!0}catch(p){return!1}}())return a;
ra();var f=new WeakMap;e.prototype.set=function(h,k){h=0===h?0:h;var l=d(this,h);l.list||(l.list=this.g[l.id]=[]);l.u?l.u.value=k:(l.u={next:this.f,previous:this.f.previous,head:this.f,key:h,value:k},l.list.push(l.u),this.f.previous.next=l.u,this.f.previous=l.u,this.size++);return this};
e.prototype["delete"]=function(h){h=d(this,h);return h.u&&h.list?(h.list.splice(h.index,1),h.list.length||delete this.g[h.id],h.u.previous.next=h.u.next,h.u.next.previous=h.u.previous,h.u.head=null,this.size--,!0):!1};
e.prototype.clear=function(){this.g={};this.f=this.f.previous=b();this.size=0};
e.prototype.has=function(h){return!!d(this,h).u};
e.prototype.get=function(h){return(h=d(this,h).u)&&h.value};
e.prototype.entries=function(){return c(this,function(h){return[h.key,h.value]})};
e.prototype.keys=function(){return c(this,function(h){return h.key})};
e.prototype.values=function(){return c(this,function(h){return h.value})};
e.prototype.forEach=function(h,k){for(var l=this.entries(),m;!(m=l.next()).done;)m=m.value,h.call(k,m[1],m[0],this)};
e.prototype[Symbol.iterator]=e.prototype.entries;var g=0;return e});
u("Set",function(a){function b(c){this.f=new Map;if(c){c=q(c);for(var d;!(d=c.next()).done;)this.add(d.value)}this.size=this.f.size}
if(function(){if(!a||"function"!=typeof a||!a.prototype.entries||"function"!=typeof Object.seal)return!1;try{var c=Object.seal({x:4}),d=new a(q([c]));if(!d.has(c)||1!=d.size||d.add(c)!=d||1!=d.size||d.add({x:4})!=d||2!=d.size)return!1;var e=d.entries(),f=e.next();if(f.done||f.value[0]!=c||f.value[1]!=c)return!1;f=e.next();return f.done||f.value[0]==c||4!=f.value[0].x||f.value[1]!=f.value[0]?!1:e.next().done}catch(g){return!1}}())return a;
ra();b.prototype.add=function(c){c=0===c?0:c;this.f.set(c,c);this.size=this.f.size;return this};
b.prototype["delete"]=function(c){c=this.f["delete"](c);this.size=this.f.size;return c};
b.prototype.clear=function(){this.f.clear();this.size=0};
b.prototype.has=function(c){return this.f.has(c)};
b.prototype.entries=function(){return this.f.entries()};
b.prototype.values=function(){return this.f.values()};
b.prototype.keys=b.prototype.values;b.prototype[Symbol.iterator]=b.prototype.values;b.prototype.forEach=function(c,d){var e=this;this.f.forEach(function(f){return c.call(d,f,f,e)})};
return b});
u("Promise",function(a){function b(g){this.g=0;this.h=void 0;this.f=[];var h=this.i();try{g(h.resolve,h.reject)}catch(k){h.reject(k)}}
function c(){this.f=null}
function d(g){return g instanceof b?g:new b(function(h){h(g)})}
if(a)return a;c.prototype.g=function(g){if(null==this.f){this.f=[];var h=this;this.h(function(){h.j()})}this.f.push(g)};
var e=ma.setTimeout;c.prototype.h=function(g){e(g,0)};
c.prototype.j=function(){for(;this.f&&this.f.length;){var g=this.f;this.f=[];for(var h=0;h<g.length;++h){var k=g[h];g[h]=null;try{k()}catch(l){this.i(l)}}}this.f=null};
c.prototype.i=function(g){this.h(function(){throw g;})};
b.prototype.i=function(){function g(l){return function(m){k||(k=!0,l.call(h,m))}}
var h=this,k=!1;return{resolve:g(this.A),reject:g(this.j)}};
b.prototype.A=function(g){if(g===this)this.j(new TypeError("A Promise cannot resolve to itself"));else if(g instanceof b)this.D(g);else{a:switch(typeof g){case "object":var h=null!=g;break a;case "function":h=!0;break a;default:h=!1}h?this.w(g):this.l(g)}};
b.prototype.w=function(g){var h=void 0;try{h=g.then}catch(k){this.j(k);return}"function"==typeof h?this.F(h,g):this.l(g)};
b.prototype.j=function(g){this.m(2,g)};
b.prototype.l=function(g){this.m(1,g)};
b.prototype.m=function(g,h){if(0!=this.g)throw Error("Cannot settle("+g+", "+h+"): Promise already settled in state"+this.g);this.g=g;this.h=h;this.B()};
b.prototype.B=function(){if(null!=this.f){for(var g=0;g<this.f.length;++g)f.g(this.f[g]);this.f=null}};
var f=new c;b.prototype.D=function(g){var h=this.i();g.aa(h.resolve,h.reject)};
b.prototype.F=function(g,h){var k=this.i();try{g.call(h,k.resolve,k.reject)}catch(l){k.reject(l)}};
b.prototype.then=function(g,h){function k(v,t){return"function"==typeof v?function(B){try{l(v(B))}catch(K){m(K)}}:t}
var l,m,p=new b(function(v,t){l=v;m=t});
this.aa(k(g,l),k(h,m));return p};
b.prototype["catch"]=function(g){return this.then(void 0,g)};
b.prototype.aa=function(g,h){function k(){switch(l.g){case 1:g(l.h);break;case 2:h(l.h);break;default:throw Error("Unexpected state: "+l.g);}}
var l=this;null==this.f?f.g(k):this.f.push(k)};
b.resolve=d;b.reject=function(g){return new b(function(h,k){k(g)})};
b.race=function(g){return new b(function(h,k){for(var l=q(g),m=l.next();!m.done;m=l.next())d(m.value).aa(h,k)})};
b.all=function(g){var h=q(g),k=h.next();return k.done?d([]):new b(function(l,m){function p(B){return function(K){v[B]=K;t--;0==t&&l(v)}}
var v=[],t=0;do v.push(void 0),t++,d(k.value).aa(p(v.length-1),m),k=h.next();while(!k.done)})};
return b});
u("String.prototype.includes",function(a){return a?a:function(b,c){return-1!==na(this,b,"includes").indexOf(b,c||0)}});
var ua=function(){function a(){function c(){}
new c;Reflect.construct(c,[],function(){});
return new c instanceof c}
if("undefined"!=typeof Reflect&&Reflect.construct){if(a())return Reflect.construct;var b=Reflect.construct;return function(c,d,e){c=b(c,d);e&&Reflect.setPrototypeOf(c,e.prototype);return c}}return function(c,d,e){void 0===e&&(e=c);
e=ca(e.prototype||Object.prototype);return Function.prototype.apply.call(c,e,d)||e}}();
u("Reflect.construct",function(){return ua});
var x=this||self;function y(a,b,c){a=a.split(".");c=c||x;a[0]in c||"undefined"==typeof c.execScript||c.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)a.length||void 0===b?c[d]&&c[d]!==Object.prototype[d]?c=c[d]:c=c[d]={}:c[d]=b}
var va=/^[\w+/_-]+[=]{0,2}$/,wa=null;function z(a,b){for(var c=a.split("."),d=b||x,e=0;e<c.length;e++)if(d=d[c[e]],null==d)return null;return d}
function xa(){}
function ya(a){a.ia=void 0;a.getInstance=function(){return a.ia?a.ia:a.ia=new a}}
function za(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}
function Aa(a){return"array"==za(a)}
function Ba(a){var b=za(a);return"array"==b||"object"==b&&"number"==typeof a.length}
function Ca(a){return"function"==za(a)}
function Da(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}
function Ea(a){return Object.prototype.hasOwnProperty.call(a,Fa)&&a[Fa]||(a[Fa]=++Ha)}
var Fa="closure_uid_"+(1E9*Math.random()>>>0),Ha=0;function Ia(a,b,c){return a.call.apply(a.bind,arguments)}
function Ja(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var e=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(e,d);return a.apply(b,e)}}return function(){return a.apply(b,arguments)}}
function A(a,b,c){Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?A=Ia:A=Ja;return A.apply(null,arguments)}
function Ka(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var d=c.slice();d.push.apply(d,arguments);return a.apply(this,d)}}
var C=Date.now||function(){return+new Date};
function La(a,b){y(a,b,void 0)}
function D(a,b){function c(){}
c.prototype=b.prototype;a.L=b.prototype;a.prototype=new c;a.prototype.constructor=a}
;function E(a){if(Error.captureStackTrace)Error.captureStackTrace(this,E);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))}
D(E,Error);E.prototype.name="CustomError";var Ma=Array.prototype.indexOf?function(a,b){return Array.prototype.indexOf.call(a,b,void 0)}:function(a,b){if("string"===typeof a)return"string"!==typeof b||1!=b.length?-1:a.indexOf(b,0);
for(var c=0;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1},F=Array.prototype.forEach?function(a,b,c){Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e="string"===typeof a?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)},Na=Array.prototype.filter?function(a,b){return Array.prototype.filter.call(a,b,void 0)}:function(a,b){for(var c=a.length,d=[],e=0,f="string"===typeof a?a.split(""):a,g=0;g<c;g++)if(g in f){var h=f[g];
b.call(void 0,h,g,a)&&(d[e++]=h)}return d},Oa=Array.prototype.map?function(a,b){return Array.prototype.map.call(a,b,void 0)}:function(a,b){for(var c=a.length,d=Array(c),e="string"===typeof a?a.split(""):a,f=0;f<c;f++)f in e&&(d[f]=b.call(void 0,e[f],f,a));
return d},Pa=Array.prototype.reduce?function(a,b,c){return Array.prototype.reduce.call(a,b,c)}:function(a,b,c){var d=c;
F(a,function(e,f){d=b.call(void 0,d,e,f,a)});
return d};
function Qa(a,b){a:{var c=a.length;for(var d="string"===typeof a?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){c=e;break a}c=-1}return 0>c?null:"string"===typeof a?a.charAt(c):a[c]}
function Ra(a,b){var c=Ma(a,b);0<=c&&Array.prototype.splice.call(a,c,1)}
function Sa(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]}
function Ta(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(Ba(d)){var e=a.length||0,f=d.length||0;a.length=e+f;for(var g=0;g<f;g++)a[e+g]=d[g]}else a.push(d)}}
;function Ua(a){var b=!1,c;return function(){b||(c=a(),b=!0);return c}}
;var Va=String.prototype.trim?function(a){return a.trim()}:function(a){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]};
function Wa(a,b){if(b)a=a.replace(Xa,"&amp;").replace(Ya,"&lt;").replace(Za,"&gt;").replace($a,"&quot;").replace(ab,"&#39;").replace(bb,"&#0;");else{if(!cb.test(a))return a;-1!=a.indexOf("&")&&(a=a.replace(Xa,"&amp;"));-1!=a.indexOf("<")&&(a=a.replace(Ya,"&lt;"));-1!=a.indexOf(">")&&(a=a.replace(Za,"&gt;"));-1!=a.indexOf('"')&&(a=a.replace($a,"&quot;"));-1!=a.indexOf("'")&&(a=a.replace(ab,"&#39;"));-1!=a.indexOf("\x00")&&(a=a.replace(bb,"&#0;"))}return a}
var Xa=/&/g,Ya=/</g,Za=/>/g,$a=/"/g,ab=/'/g,bb=/\x00/g,cb=/[\x00&<>"']/;var db;a:{var eb=x.navigator;if(eb){var fb=eb.userAgent;if(fb){db=fb;break a}}db=""}function G(a){return-1!=db.indexOf(a)}
;function gb(a,b){for(var c in a)b.call(void 0,a[c],c,a)}
function hb(a,b){var c=Ba(b),d=c?b:arguments;for(c=c?0:1;c<d.length;c++){if(null==a)return;a=a[d[c]]}return a}
function ib(a){var b=jb,c;for(c in b)if(a.call(void 0,b[c],c,b))return c}
function kb(a){for(var b in a)return!1;return!0}
function lb(a,b){if(null!==a&&b in a)throw Error('The object already contains the key "'+b+'"');a[b]=!0}
function mb(a,b){for(var c in a)if(!(c in b)||a[c]!==b[c])return!1;for(var d in b)if(!(d in a))return!1;return!0}
function nb(a){var b={},c;for(c in a)b[c]=a[c];return b}
function ob(a){var b=za(a);if("object"==b||"array"==b){if(Ca(a.clone))return a.clone();b="array"==b?[]:{};for(var c in a)b[c]=ob(a[c]);return b}return a}
var pb="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function qb(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<pb.length;f++)c=pb[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}}
;function rb(a,b){this.f=a===sb&&b||"";this.g=tb}
rb.prototype.J=!0;rb.prototype.I=function(){return this.f};
function ub(){var a=vb;return a instanceof rb&&a.constructor===rb&&a.g===tb?a.f:"type_error:Const"}
var tb={},sb={},vb=new rb(sb,"");function wb(a,b){this.f=a===xb&&b||"";this.g=yb}
wb.prototype.J=!0;wb.prototype.I=function(){return this.f.toString()};
wb.prototype.ha=!0;wb.prototype.ea=function(){return 1};
function zb(a){if(a instanceof wb&&a.constructor===wb&&a.g===yb)return a.f;za(a);return"type_error:TrustedResourceUrl"}
var yb={},xb={};function H(a,b){this.f=a===Ab&&b||"";this.g=Bb}
H.prototype.J=!0;H.prototype.I=function(){return this.f.toString()};
H.prototype.ha=!0;H.prototype.ea=function(){return 1};
function Cb(a){if(a instanceof H&&a.constructor===H&&a.g===Bb)return a.f;za(a);return"type_error:SafeUrl"}
var Db=/^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;function Eb(a){if(a instanceof H)return a;a="object"==typeof a&&a.J?a.I():String(a);Db.test(a)||(a="about:invalid#zClosurez");return new H(Ab,a)}
var Bb={},Ab={};function Fb(){this.f="";this.h=Gb;this.g=null}
Fb.prototype.ha=!0;Fb.prototype.ea=function(){return this.g};
Fb.prototype.J=!0;Fb.prototype.I=function(){return this.f.toString()};
function Ib(a){if(a instanceof Fb&&a.constructor===Fb&&a.h===Gb)return a.f;za(a);return"type_error:SafeHtml"}
var Gb={};function Jb(a,b){var c=new Fb;c.f=a;c.g=b;return c}
Jb("<!DOCTYPE html>",0);var Kb=Jb("",0);Jb("<br>",0);function Lb(a,b){var c=b instanceof H?b:Eb(b);a.href=Cb(c)}
function Mb(a,b){a.src=zb(b);if(null===wa)b:{var c=x.document;if((c=c.querySelector&&c.querySelector("script[nonce]"))&&(c=c.nonce||c.getAttribute("nonce"))&&va.test(c)){wa=c;break b}wa=""}c=wa;c&&a.setAttribute("nonce",c)}
;function Nb(a){return a=Wa(a,void 0)}
function Ob(a){for(var b=0,c=0;c<a.length;++c)b=31*b+a.charCodeAt(c)>>>0;return b}
;var Pb=G("Opera"),Qb=G("Trident")||G("MSIE"),Rb=G("Edge"),Sb=G("Gecko")&&!(-1!=db.toLowerCase().indexOf("webkit")&&!G("Edge"))&&!(G("Trident")||G("MSIE"))&&!G("Edge"),Tb=-1!=db.toLowerCase().indexOf("webkit")&&!G("Edge");function Ub(){var a=x.document;return a?a.documentMode:void 0}
var Vb;a:{var Wb="",Xb=function(){var a=db;if(Sb)return/rv:([^\);]+)(\)|;)/.exec(a);if(Rb)return/Edge\/([\d\.]+)/.exec(a);if(Qb)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(Tb)return/WebKit\/(\S+)/.exec(a);if(Pb)return/(?:Version)[ \/]?(\S+)/.exec(a)}();
Xb&&(Wb=Xb?Xb[1]:"");if(Qb){var Yb=Ub();if(null!=Yb&&Yb>parseFloat(Wb)){Vb=String(Yb);break a}}Vb=Wb}var Zb=Vb,$b;if(x.document&&Qb){var ac=Ub();$b=ac?ac:parseInt(Zb,10)||void 0}else $b=void 0;var bc=$b;var cc={},dc=null;var I=window;function ec(a){this.f=a||{cookie:""}}
n=ec.prototype;n.isEnabled=function(){return navigator.cookieEnabled};
n.set=function(a,b,c){var d=!1;if("object"===typeof c){var e=c.ub;d=c.secure||!1;var f=c.domain||void 0;var g=c.path||void 0;var h=c.ma}if(/[;=\s]/.test(a))throw Error('Invalid cookie name "'+a+'"');if(/[;\r\n]/.test(b))throw Error('Invalid cookie value "'+b+'"');void 0===h&&(h=-1);c=f?";domain="+f:"";g=g?";path="+g:"";d=d?";secure":"";h=0>h?"":0==h?";expires="+(new Date(1970,1,1)).toUTCString():";expires="+(new Date(C()+1E3*h)).toUTCString();this.f.cookie=a+"="+b+c+g+h+d+(null!=e?";samesite="+e:
"")};
n.get=function(a,b){for(var c=a+"=",d=(this.f.cookie||"").split(";"),e=0,f;e<d.length;e++){f=Va(d[e]);if(0==f.lastIndexOf(c,0))return f.substr(c.length);if(f==a)return""}return b};
n.remove=function(a,b,c){var d=void 0!==this.get(a);this.set(a,"",{ma:0,path:b,domain:c});return d};
n.isEmpty=function(){return!this.f.cookie};
n.clear=function(){for(var a=(this.f.cookie||"").split(";"),b=[],c=[],d,e,f=0;f<a.length;f++)e=Va(a[f]),d=e.indexOf("="),-1==d?(b.push(""),c.push(e)):(b.push(e.substring(0,d)),c.push(e.substring(d+1)));for(a=b.length-1;0<=a;a--)this.remove(b[a])};
var fc=new ec("undefined"==typeof document?null:document);function gc(a){var b=z("window.location.href");null==a&&(a='Unknown Error of type "null/undefined"');if("string"===typeof a)return{message:a,name:"Unknown error",lineNumber:"Not available",fileName:b,stack:"Not available"};var c=!1;try{var d=a.lineNumber||a.line||"Not available"}catch(f){d="Not available",c=!0}try{var e=a.fileName||a.filename||a.sourceURL||x.$googDebugFname||b}catch(f){e="Not available",c=!0}return!c&&a.lineNumber&&a.fileName&&a.stack&&a.message&&a.name?a:(b=a.message,null==b&&(a.constructor&&
a.constructor instanceof Function?(a.constructor.name?b=a.constructor.name:(b=a.constructor,hc[b]?b=hc[b]:(b=String(b),hc[b]||(c=/function\s+([^\(]+)/m.exec(b),hc[b]=c?c[1]:"[Anonymous]"),b=hc[b])),b='Unknown Error of type "'+b+'"'):b="Unknown Error of unknown type"),{message:b,name:a.name||"UnknownError",lineNumber:d,fileName:e,stack:a.stack||"Not available"})}
var hc={};var ic=!Qb||9<=Number(bc);function jc(a,b){this.x=void 0!==a?a:0;this.y=void 0!==b?b:0}
n=jc.prototype;n.clone=function(){return new jc(this.x,this.y)};
n.equals=function(a){return a instanceof jc&&(this==a?!0:this&&a?this.x==a.x&&this.y==a.y:!1)};
n.ceil=function(){this.x=Math.ceil(this.x);this.y=Math.ceil(this.y);return this};
n.floor=function(){this.x=Math.floor(this.x);this.y=Math.floor(this.y);return this};
n.round=function(){this.x=Math.round(this.x);this.y=Math.round(this.y);return this};function kc(a,b){this.width=a;this.height=b}
n=kc.prototype;n.clone=function(){return new kc(this.width,this.height)};
n.aspectRatio=function(){return this.width/this.height};
n.isEmpty=function(){return!(this.width*this.height)};
n.ceil=function(){this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};
n.floor=function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};
n.round=function(){this.width=Math.round(this.width);this.height=Math.round(this.height);return this};function lc(a){var b=document;return"string"===typeof a?b.getElementById(a):a}
function mc(a,b){gb(b,function(c,d){c&&"object"==typeof c&&c.J&&(c=c.I());"style"==d?a.style.cssText=c:"class"==d?a.className=c:"for"==d?a.htmlFor=c:nc.hasOwnProperty(d)?a.setAttribute(nc[d],c):0==d.lastIndexOf("aria-",0)||0==d.lastIndexOf("data-",0)?a.setAttribute(d,c):a[d]=c})}
var nc={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",nonce:"nonce",role:"role",rowspan:"rowSpan",type:"type",usemap:"useMap",valign:"vAlign",width:"width"};
function oc(a,b,c){var d=arguments,e=document,f=String(d[0]),g=d[1];if(!ic&&g&&(g.name||g.type)){f=["<",f];g.name&&f.push(' name="',Nb(g.name),'"');if(g.type){f.push(' type="',Nb(g.type),'"');var h={};qb(h,g);delete h.type;g=h}f.push(">");f=f.join("")}f=pc(e,f);g&&("string"===typeof g?f.className=g:Array.isArray(g)?f.className=g.join(" "):mc(f,g));2<d.length&&qc(e,f,d);return f}
function qc(a,b,c){function d(g){g&&b.appendChild("string"===typeof g?a.createTextNode(g):g)}
for(var e=2;e<c.length;e++){var f=c[e];!Ba(f)||Da(f)&&0<f.nodeType?d(f):F(rc(f)?Sa(f):f,d)}}
function pc(a,b){b=String(b);"application/xhtml+xml"===a.contentType&&(b=b.toLowerCase());return a.createElement(b)}
function rc(a){if(a&&"number"==typeof a.length){if(Da(a))return"function"==typeof a.item||"string"==typeof a.item;if(Ca(a))return"function"==typeof a.item}return!1}
function sc(a,b){for(var c=0;a;){if(b(a))return a;a=a.parentNode;c++}return null}
;function tc(a){uc();return new wb(xb,a)}
var uc=xa;var vc=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/\\#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;function J(a){return a?decodeURI(a):a}
function L(a,b){return b.match(vc)[a]||null}
function wc(a,b,c){if(Array.isArray(b))for(var d=0;d<b.length;d++)wc(a,String(b[d]),c);else null!=b&&c.push(a+(""===b?"":"="+encodeURIComponent(String(b))))}
function xc(a){var b=[],c;for(c in a)wc(c,a[c],b);return b.join("&")}
function yc(a,b){var c=xc(b);if(c){var d=a.indexOf("#");0>d&&(d=a.length);var e=a.indexOf("?");if(0>e||e>d){e=d;var f=""}else f=a.substring(e+1,d);d=[a.substr(0,e),f,a.substr(d)];e=d[1];d[1]=c?e?e+"&"+c:c:e;c=d[0]+(d[1]?"?"+d[1]:"")+d[2]}else c=a;return c}
var zc=/#|$/;function Ac(a,b){var c=a.search(zc);a:{var d=0;for(var e=b.length;0<=(d=a.indexOf(b,d))&&d<c;){var f=a.charCodeAt(d-1);if(38==f||63==f)if(f=a.charCodeAt(d+e),!f||61==f||38==f||35==f)break a;d+=e+1}d=-1}if(0>d)return null;e=a.indexOf("&",d);if(0>e||e>c)e=c;d+=b.length+1;return decodeURIComponent(a.substr(d,e-d).replace(/\+/g," "))}
;function Bc(a){var b=Cc;if(b)for(var c in b)Object.prototype.hasOwnProperty.call(b,c)&&a.call(void 0,b[c],c,b)}
function Dc(){var a=[];Bc(function(b){a.push(b)});
return a}
var Cc={ab:"allow-forms",bb:"allow-modals",cb:"allow-orientation-lock",eb:"allow-pointer-lock",fb:"allow-popups",gb:"allow-popups-to-escape-sandbox",hb:"allow-presentation",ib:"allow-same-origin",jb:"allow-scripts",kb:"allow-top-navigation",lb:"allow-top-navigation-by-user-activation"},Ec=Ua(function(){return Dc()});
function Fc(){var a=pc(document,"IFRAME"),b={};F(Ec(),function(c){a.sandbox&&a.sandbox.supports&&a.sandbox.supports(c)&&(b[c]=!0)});
return b}
;function Gc(a){"number"==typeof a&&(a=Math.round(a)+"px");return a}
;var Hc=(new Date).getTime();function Ic(a){if(!a)return"";a=a.split("#")[0].split("?")[0];a=a.toLowerCase();0==a.indexOf("//")&&(a=window.location.protocol+a);/^[\w\-]*:\/\//.test(a)||(a=window.location.href);var b=a.substring(a.indexOf("://")+3),c=b.indexOf("/");-1!=c&&(b=b.substring(0,c));a=a.substring(0,a.indexOf("://"));if("http"!==a&&"https"!==a&&"chrome-extension"!==a&&"file"!==a&&"android-app"!==a&&"chrome-search"!==a&&"app"!==a)throw Error("Invalid URI scheme in origin: "+a);c="";var d=b.indexOf(":");if(-1!=d){var e=
b.substring(d+1);b=b.substring(0,d);if("http"===a&&"80"!==e||"https"===a&&"443"!==e)c=":"+e}return a+"://"+b+c}
;function Kc(){function a(){e[0]=1732584193;e[1]=4023233417;e[2]=2562383102;e[3]=271733878;e[4]=3285377520;m=l=0}
function b(p){for(var v=g,t=0;64>t;t+=4)v[t/4]=p[t]<<24|p[t+1]<<16|p[t+2]<<8|p[t+3];for(t=16;80>t;t++)p=v[t-3]^v[t-8]^v[t-14]^v[t-16],v[t]=(p<<1|p>>>31)&4294967295;p=e[0];var B=e[1],K=e[2],la=e[3],Jc=e[4];for(t=0;80>t;t++){if(40>t)if(20>t){var Ga=la^B&(K^la);var Hb=1518500249}else Ga=B^K^la,Hb=1859775393;else 60>t?(Ga=B&K|la&(B|K),Hb=2400959708):(Ga=B^K^la,Hb=3395469782);Ga=((p<<5|p>>>27)&4294967295)+Ga+Jc+Hb+v[t]&4294967295;Jc=la;la=K;K=(B<<30|B>>>2)&4294967295;B=p;p=Ga}e[0]=e[0]+p&4294967295;e[1]=
e[1]+B&4294967295;e[2]=e[2]+K&4294967295;e[3]=e[3]+la&4294967295;e[4]=e[4]+Jc&4294967295}
function c(p,v){if("string"===typeof p){p=unescape(encodeURIComponent(p));for(var t=[],B=0,K=p.length;B<K;++B)t.push(p.charCodeAt(B));p=t}v||(v=p.length);t=0;if(0==l)for(;t+64<v;)b(p.slice(t,t+64)),t+=64,m+=64;for(;t<v;)if(f[l++]=p[t++],m++,64==l)for(l=0,b(f);t+64<v;)b(p.slice(t,t+64)),t+=64,m+=64}
function d(){var p=[],v=8*m;56>l?c(h,56-l):c(h,64-(l-56));for(var t=63;56<=t;t--)f[t]=v&255,v>>>=8;b(f);for(t=v=0;5>t;t++)for(var B=24;0<=B;B-=8)p[v++]=e[t]>>B&255;return p}
for(var e=[],f=[],g=[],h=[128],k=1;64>k;++k)h[k]=0;var l,m;a();return{reset:a,update:c,digest:d,xa:function(){for(var p=d(),v="",t=0;t<p.length;t++)v+="0123456789ABCDEF".charAt(Math.floor(p[t]/16))+"0123456789ABCDEF".charAt(p[t]%16);return v}}}
;function Lc(a,b,c){var d=[],e=[];if(1==(Aa(c)?2:1))return e=[b,a],F(d,function(h){e.push(h)}),Mc(e.join(" "));
var f=[],g=[];F(c,function(h){g.push(h.key);f.push(h.value)});
c=Math.floor((new Date).getTime()/1E3);e=0==f.length?[c,b,a]:[f.join(":"),c,b,a];F(d,function(h){e.push(h)});
a=Mc(e.join(" "));a=[c,a];0==g.length||a.push(g.join(""));return a.join("_")}
function Mc(a){var b=Kc();b.update(a);return b.xa().toLowerCase()}
;function Nc(a){var b=Ic(String(x.location.href)),c;(c=x.__SAPISID||x.__APISID||x.__OVERRIDE_SID)?c=!0:(c=new ec(document),c=c.get("SAPISID")||c.get("APISID")||c.get("__Secure-3PAPISID")||c.get("SID"),c=!!c);if(c&&(c=(b=0==b.indexOf("https:")||0==b.indexOf("chrome-extension:"))?x.__SAPISID:x.__APISID,c||(c=new ec(document),c=c.get(b?"SAPISID":"APISID")||c.get("__Secure-3PAPISID")),c)){b=b?"SAPISIDHASH":"APISIDHASH";var d=String(x.location.href);return d&&c&&b?[b,Lc(Ic(d),c,a||null)].join(" "):null}return null}
;function Oc(){this.g=[];this.f=-1}
Oc.prototype.set=function(a,b){b=void 0===b?!0:b;0<=a&&52>a&&0===a%1&&this.g[a]!=b&&(this.g[a]=b,this.f=-1)};
Oc.prototype.get=function(a){return!!this.g[a]};
function Pc(a){-1==a.f&&(a.f=Pa(a.g,function(b,c,d){return c?b+Math.pow(2,d):b},0));
return a.f}
;function Qc(a,b){this.h=a;this.i=b;this.g=0;this.f=null}
Qc.prototype.get=function(){if(0<this.g){this.g--;var a=this.f;this.f=a.next;a.next=null}else a=this.h();return a};
function Rc(a,b){a.i(b);100>a.g&&(a.g++,b.next=a.f,a.f=b)}
;function Sc(a){x.setTimeout(function(){throw a;},0)}
var Tc;
function Uc(){var a=x.MessageChannel;"undefined"===typeof a&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&!G("Presto")&&(a=function(){var e=pc(document,"IFRAME");e.style.display="none";e.src=zb(new wb(xb,ub())).toString();document.documentElement.appendChild(e);var f=e.contentWindow;e=f.document;e.open();e.write(Ib(Kb));e.close();var g="callImmediate"+Math.random(),h="file:"==f.location.protocol?"*":f.location.protocol+"//"+f.location.host;e=A(function(k){if(("*"==h||
k.origin==h)&&k.data==g)this.port1.onmessage()},this);
f.addEventListener("message",e,!1);this.port1={};this.port2={postMessage:function(){f.postMessage(g,h)}}});
if("undefined"!==typeof a&&!G("Trident")&&!G("MSIE")){var b=new a,c={},d=c;b.port1.onmessage=function(){if(void 0!==c.next){c=c.next;var e=c.la;c.la=null;e()}};
return function(e){d.next={la:e};d=d.next;b.port2.postMessage(0)}}return function(e){x.setTimeout(e,0)}}
;function Vc(){this.g=this.f=null}
var Xc=new Qc(function(){return new Wc},function(a){a.reset()});
Vc.prototype.add=function(a,b){var c=Xc.get();c.set(a,b);this.g?this.g.next=c:this.f=c;this.g=c};
Vc.prototype.remove=function(){var a=null;this.f&&(a=this.f,this.f=this.f.next,this.f||(this.g=null),a.next=null);return a};
function Wc(){this.next=this.scope=this.f=null}
Wc.prototype.set=function(a,b){this.f=a;this.scope=b;this.next=null};
Wc.prototype.reset=function(){this.next=this.scope=this.f=null};function Yc(a,b){Zc||$c();ad||(Zc(),ad=!0);bd.add(a,b)}
var Zc;function $c(){if(x.Promise&&x.Promise.resolve){var a=x.Promise.resolve(void 0);Zc=function(){a.then(cd)}}else Zc=function(){var b=cd;
!Ca(x.setImmediate)||x.Window&&x.Window.prototype&&!G("Edge")&&x.Window.prototype.setImmediate==x.setImmediate?(Tc||(Tc=Uc()),Tc(b)):x.setImmediate(b)}}
var ad=!1,bd=new Vc;function cd(){for(var a;a=bd.remove();){try{a.f.call(a.scope)}catch(b){Sc(b)}Rc(Xc,a)}ad=!1}
;function dd(){this.g=-1}
;function ed(){this.g=64;this.f=[];this.l=[];this.m=[];this.i=[];this.i[0]=128;for(var a=1;a<this.g;++a)this.i[a]=0;this.j=this.h=0;this.reset()}
D(ed,dd);ed.prototype.reset=function(){this.f[0]=1732584193;this.f[1]=4023233417;this.f[2]=2562383102;this.f[3]=271733878;this.f[4]=3285377520;this.j=this.h=0};
function fd(a,b,c){c||(c=0);var d=a.m;if("string"===typeof b)for(var e=0;16>e;e++)d[e]=b.charCodeAt(c)<<24|b.charCodeAt(c+1)<<16|b.charCodeAt(c+2)<<8|b.charCodeAt(c+3),c+=4;else for(e=0;16>e;e++)d[e]=b[c]<<24|b[c+1]<<16|b[c+2]<<8|b[c+3],c+=4;for(e=16;80>e;e++){var f=d[e-3]^d[e-8]^d[e-14]^d[e-16];d[e]=(f<<1|f>>>31)&4294967295}b=a.f[0];c=a.f[1];var g=a.f[2],h=a.f[3],k=a.f[4];for(e=0;80>e;e++){if(40>e)if(20>e){f=h^c&(g^h);var l=1518500249}else f=c^g^h,l=1859775393;else 60>e?(f=c&g|h&(c|g),l=2400959708):
(f=c^g^h,l=3395469782);f=(b<<5|b>>>27)+f+k+l+d[e]&4294967295;k=h;h=g;g=(c<<30|c>>>2)&4294967295;c=b;b=f}a.f[0]=a.f[0]+b&4294967295;a.f[1]=a.f[1]+c&4294967295;a.f[2]=a.f[2]+g&4294967295;a.f[3]=a.f[3]+h&4294967295;a.f[4]=a.f[4]+k&4294967295}
ed.prototype.update=function(a,b){if(null!=a){void 0===b&&(b=a.length);for(var c=b-this.g,d=0,e=this.l,f=this.h;d<b;){if(0==f)for(;d<=c;)fd(this,a,d),d+=this.g;if("string"===typeof a)for(;d<b;){if(e[f]=a.charCodeAt(d),++f,++d,f==this.g){fd(this,e);f=0;break}}else for(;d<b;)if(e[f]=a[d],++f,++d,f==this.g){fd(this,e);f=0;break}}this.h=f;this.j+=b}};
ed.prototype.digest=function(){var a=[],b=8*this.j;56>this.h?this.update(this.i,56-this.h):this.update(this.i,this.g-(this.h-56));for(var c=this.g-1;56<=c;c--)this.l[c]=b&255,b/=256;fd(this,this.l);for(c=b=0;5>c;c++)for(var d=24;0<=d;d-=8)a[b]=this.f[c]>>d&255,++b;return a};function M(){this.g=this.g;this.B=this.B}
M.prototype.g=!1;M.prototype.dispose=function(){this.g||(this.g=!0,this.o())};
function gd(a,b){a.g?b():(a.B||(a.B=[]),a.B.push(b))}
M.prototype.o=function(){if(this.B)for(;this.B.length;)this.B.shift()()};
function hd(a){a&&"function"==typeof a.dispose&&a.dispose()}
function id(a){for(var b=0,c=arguments.length;b<c;++b){var d=arguments[b];Ba(d)?id.apply(null,d):hd(d)}}
;function jd(a){return"string"==typeof a.className?a.className:a.getAttribute&&a.getAttribute("class")||""}
function kd(a,b){"string"==typeof a.className?a.className=b:a.setAttribute&&a.setAttribute("class",b)}
function ld(a,b){if(a.classList)var c=a.classList.contains(b);else c=a.classList?a.classList:jd(a).match(/\S+/g)||[],c=0<=Ma(c,b);return c}
function md(){var a=document.body;a.classList?a.classList.remove("inverted-hdpi"):ld(a,"inverted-hdpi")&&kd(a,Na(a.classList?a.classList:jd(a).match(/\S+/g)||[],function(b){return"inverted-hdpi"!=b}).join(" "))}
;var nd="StopIteration"in x?x.StopIteration:{message:"StopIteration",stack:""};function od(){}
od.prototype.next=function(){throw nd;};
od.prototype.G=function(){return this};
function pd(a){if(a instanceof od)return a;if("function"==typeof a.G)return a.G(!1);if(Ba(a)){var b=0,c=new od;c.next=function(){for(;;){if(b>=a.length)throw nd;if(b in a)return a[b++];b++}};
return c}throw Error("Not implemented");}
function qd(a,b){if(Ba(a))try{F(a,b,void 0)}catch(c){if(c!==nd)throw c;}else{a=pd(a);try{for(;;)b.call(void 0,a.next(),void 0,a)}catch(c){if(c!==nd)throw c;}}}
function rd(a){if(Ba(a))return Sa(a);a=pd(a);var b=[];qd(a,function(c){b.push(c)});
return b}
;function sd(a,b){this.h={};this.f=[];this.H=this.g=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else if(a)if(a instanceof sd)for(c=td(a),d=0;d<c.length;d++)this.set(c[d],a.get(c[d]));else for(d in a)this.set(d,a[d])}
function td(a){ud(a);return a.f.concat()}
n=sd.prototype;n.equals=function(a,b){if(this===a)return!0;if(this.g!=a.g)return!1;var c=b||vd;ud(this);for(var d,e=0;d=this.f[e];e++)if(!c(this.get(d),a.get(d)))return!1;return!0};
function vd(a,b){return a===b}
n.isEmpty=function(){return 0==this.g};
n.clear=function(){this.h={};this.H=this.g=this.f.length=0};
n.remove=function(a){return Object.prototype.hasOwnProperty.call(this.h,a)?(delete this.h[a],this.g--,this.H++,this.f.length>2*this.g&&ud(this),!0):!1};
function ud(a){if(a.g!=a.f.length){for(var b=0,c=0;b<a.f.length;){var d=a.f[b];Object.prototype.hasOwnProperty.call(a.h,d)&&(a.f[c++]=d);b++}a.f.length=c}if(a.g!=a.f.length){var e={};for(c=b=0;b<a.f.length;)d=a.f[b],Object.prototype.hasOwnProperty.call(e,d)||(a.f[c++]=d,e[d]=1),b++;a.f.length=c}}
n.get=function(a,b){return Object.prototype.hasOwnProperty.call(this.h,a)?this.h[a]:b};
n.set=function(a,b){Object.prototype.hasOwnProperty.call(this.h,a)||(this.g++,this.f.push(a),this.H++);this.h[a]=b};
n.forEach=function(a,b){for(var c=td(this),d=0;d<c.length;d++){var e=c[d],f=this.get(e);a.call(b,f,e,this)}};
n.clone=function(){return new sd(this)};
n.G=function(a){ud(this);var b=0,c=this.H,d=this,e=new od;e.next=function(){if(c!=d.H)throw Error("The map has changed since the iterator was created");if(b>=d.f.length)throw nd;var f=d.f[b++];return a?f:d.h[f]};
return e};function wd(a){var b=[];xd(new yd,a,b);return b.join("")}
function yd(){}
function xd(a,b,c){if(null==b)c.push("null");else{if("object"==typeof b){if(Array.isArray(b)){var d=b;b=d.length;c.push("[");for(var e="",f=0;f<b;f++)c.push(e),xd(a,d[f],c),e=",";c.push("]");return}if(b instanceof String||b instanceof Number||b instanceof Boolean)b=b.valueOf();else{c.push("{");e="";for(d in b)Object.prototype.hasOwnProperty.call(b,d)&&(f=b[d],"function"!=typeof f&&(c.push(e),zd(d,c),c.push(":"),xd(a,f,c),e=","));c.push("}");return}}switch(typeof b){case "string":zd(b,c);break;case "number":c.push(isFinite(b)&&
!isNaN(b)?String(b):"null");break;case "boolean":c.push(String(b));break;case "function":c.push("null");break;default:throw Error("Unknown type: "+typeof b);}}}
var Ad={'"':'\\"',"\\":"\\\\","/":"\\/","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\u000b"},Bd=/\uffff/.test("\uffff")?/[\\"\x00-\x1f\x7f-\uffff]/g:/[\\"\x00-\x1f\x7f-\xff]/g;function zd(a,b){b.push('"',a.replace(Bd,function(c){var d=Ad[c];d||(d="\\u"+(c.charCodeAt(0)|65536).toString(16).substr(1),Ad[c]=d);return d}),'"')}
;function Cd(a){if(!a)return!1;try{return!!a.$goog_Thenable}catch(b){return!1}}
;function N(a){this.f=0;this.m=void 0;this.i=this.g=this.h=null;this.j=this.l=!1;if(a!=xa)try{var b=this;a.call(void 0,function(c){Dd(b,2,c)},function(c){Dd(b,3,c)})}catch(c){Dd(this,3,c)}}
function Ed(){this.next=this.context=this.onRejected=this.g=this.f=null;this.h=!1}
Ed.prototype.reset=function(){this.context=this.onRejected=this.g=this.f=null;this.h=!1};
var Fd=new Qc(function(){return new Ed},function(a){a.reset()});
function Gd(a,b,c){var d=Fd.get();d.g=a;d.onRejected=b;d.context=c;return d}
function Hd(a){return new N(function(b,c){c(a)})}
N.prototype.then=function(a,b,c){return Id(this,Ca(a)?a:null,Ca(b)?b:null,c)};
N.prototype.$goog_Thenable=!0;function Jd(a,b){return Id(a,null,b,void 0)}
N.prototype.cancel=function(a){if(0==this.f){var b=new Kd(a);Yc(function(){Ld(this,b)},this)}};
function Ld(a,b){if(0==a.f)if(a.h){var c=a.h;if(c.g){for(var d=0,e=null,f=null,g=c.g;g&&(g.h||(d++,g.f==a&&(e=g),!(e&&1<d)));g=g.next)e||(f=g);e&&(0==c.f&&1==d?Ld(c,b):(f?(d=f,d.next==c.i&&(c.i=d),d.next=d.next.next):Md(c),Nd(c,e,3,b)))}a.h=null}else Dd(a,3,b)}
function Od(a,b){a.g||2!=a.f&&3!=a.f||Pd(a);a.i?a.i.next=b:a.g=b;a.i=b}
function Id(a,b,c,d){var e=Gd(null,null,null);e.f=new N(function(f,g){e.g=b?function(h){try{var k=b.call(d,h);f(k)}catch(l){g(l)}}:f;
e.onRejected=c?function(h){try{var k=c.call(d,h);void 0===k&&h instanceof Kd?g(h):f(k)}catch(l){g(l)}}:g});
e.f.h=a;Od(a,e);return e.f}
N.prototype.w=function(a){this.f=0;Dd(this,2,a)};
N.prototype.A=function(a){this.f=0;Dd(this,3,a)};
function Dd(a,b,c){if(0==a.f){a===c&&(b=3,c=new TypeError("Promise cannot resolve to itself"));a.f=1;a:{var d=c,e=a.w,f=a.A;if(d instanceof N){Od(d,Gd(e||xa,f||null,a));var g=!0}else if(Cd(d))d.then(e,f,a),g=!0;else{if(Da(d))try{var h=d.then;if(Ca(h)){Qd(d,h,e,f,a);g=!0;break a}}catch(k){f.call(a,k);g=!0;break a}g=!1}}g||(a.m=c,a.f=b,a.h=null,Pd(a),3!=b||c instanceof Kd||Rd(a,c))}}
function Qd(a,b,c,d,e){function f(k){h||(h=!0,d.call(e,k))}
function g(k){h||(h=!0,c.call(e,k))}
var h=!1;try{b.call(a,g,f)}catch(k){f(k)}}
function Pd(a){a.l||(a.l=!0,Yc(a.B,a))}
function Md(a){var b=null;a.g&&(b=a.g,a.g=b.next,b.next=null);a.g||(a.i=null);return b}
N.prototype.B=function(){for(var a;a=Md(this);)Nd(this,a,this.f,this.m);this.l=!1};
function Nd(a,b,c,d){if(3==c&&b.onRejected&&!b.h)for(;a&&a.j;a=a.h)a.j=!1;if(b.f)b.f.h=null,Sd(b,c,d);else try{b.h?b.g.call(b.context):Sd(b,c,d)}catch(e){Td.call(null,e)}Rc(Fd,b)}
function Sd(a,b,c){2==b?a.g.call(a.context,c):a.onRejected&&a.onRejected.call(a.context,c)}
function Rd(a,b){a.j=!0;Yc(function(){a.j&&Td.call(null,b)})}
var Td=Sc;function Kd(a){E.call(this,a)}
D(Kd,E);Kd.prototype.name="cancel";function O(a){M.call(this);this.l=1;this.i=[];this.j=0;this.f=[];this.h={};this.m=!!a}
D(O,M);n=O.prototype;n.subscribe=function(a,b,c){var d=this.h[a];d||(d=this.h[a]=[]);var e=this.l;this.f[e]=a;this.f[e+1]=b;this.f[e+2]=c;this.l=e+3;d.push(e);return e};
function Ud(a,b,c,d){if(b=a.h[b]){var e=a.f;(b=Qa(b,function(f){return e[f+1]==c&&e[f+2]==d}))&&a.N(b)}}
n.N=function(a){var b=this.f[a];if(b){var c=this.h[b];0!=this.j?(this.i.push(a),this.f[a+1]=xa):(c&&Ra(c,a),delete this.f[a],delete this.f[a+1],delete this.f[a+2])}return!!b};
n.M=function(a,b){var c=this.h[a];if(c){for(var d=Array(arguments.length-1),e=1,f=arguments.length;e<f;e++)d[e-1]=arguments[e];if(this.m)for(e=0;e<c.length;e++){var g=c[e];Vd(this.f[g+1],this.f[g+2],d)}else{this.j++;try{for(e=0,f=c.length;e<f;e++)g=c[e],this.f[g+1].apply(this.f[g+2],d)}finally{if(this.j--,0<this.i.length&&0==this.j)for(;c=this.i.pop();)this.N(c)}}return 0!=e}return!1};
function Vd(a,b,c){Yc(function(){a.apply(b,c)})}
n.clear=function(a){if(a){var b=this.h[a];b&&(F(b,this.N,this),delete this.h[a])}else this.f.length=0,this.h={}};
n.o=function(){O.L.o.call(this);this.clear();this.i.length=0};function Wd(a){this.f=a}
Wd.prototype.set=function(a,b){void 0===b?this.f.remove(a):this.f.set(a,wd(b))};
Wd.prototype.get=function(a){try{var b=this.f.get(a)}catch(c){return}if(null!==b)try{return JSON.parse(b)}catch(c){throw"Storage: Invalid value was encountered";}};
Wd.prototype.remove=function(a){this.f.remove(a)};function Xd(a){this.f=a}
D(Xd,Wd);function Yd(a){this.data=a}
function Zd(a){return void 0===a||a instanceof Yd?a:new Yd(a)}
Xd.prototype.set=function(a,b){Xd.L.set.call(this,a,Zd(b))};
Xd.prototype.g=function(a){a=Xd.L.get.call(this,a);if(void 0===a||a instanceof Object)return a;throw"Storage: Invalid value was encountered";};
Xd.prototype.get=function(a){if(a=this.g(a)){if(a=a.data,void 0===a)throw"Storage: Invalid value was encountered";}else a=void 0;return a};function $d(a){this.f=a}
D($d,Xd);$d.prototype.set=function(a,b,c){if(b=Zd(b)){if(c){if(c<C()){$d.prototype.remove.call(this,a);return}b.expiration=c}b.creation=C()}$d.L.set.call(this,a,b)};
$d.prototype.g=function(a){var b=$d.L.g.call(this,a);if(b){var c=b.creation,d=b.expiration;if(d&&d<C()||c&&c>C())$d.prototype.remove.call(this,a);else return b}};function ae(){}
;function be(){}
D(be,ae);be.prototype.clear=function(){var a=rd(this.G(!0)),b=this;F(a,function(c){b.remove(c)})};function ce(a){this.f=a}
D(ce,be);n=ce.prototype;n.isAvailable=function(){if(!this.f)return!1;try{return this.f.setItem("__sak","1"),this.f.removeItem("__sak"),!0}catch(a){return!1}};
n.set=function(a,b){try{this.f.setItem(a,b)}catch(c){if(0==this.f.length)throw"Storage mechanism: Storage disabled";throw"Storage mechanism: Quota exceeded";}};
n.get=function(a){a=this.f.getItem(a);if("string"!==typeof a&&null!==a)throw"Storage mechanism: Invalid value was encountered";return a};
n.remove=function(a){this.f.removeItem(a)};
n.G=function(a){var b=0,c=this.f,d=new od;d.next=function(){if(b>=c.length)throw nd;var e=c.key(b++);if(a)return e;e=c.getItem(e);if("string"!==typeof e)throw"Storage mechanism: Invalid value was encountered";return e};
return d};
n.clear=function(){this.f.clear()};
n.key=function(a){return this.f.key(a)};function de(){var a=null;try{a=window.localStorage||null}catch(b){}this.f=a}
D(de,ce);function ee(a,b){this.g=a;this.f=null;if(Qb&&!(9<=Number(bc))){fe||(fe=new sd);this.f=fe.get(a);this.f||(b?this.f=document.getElementById(b):(this.f=document.createElement("userdata"),this.f.addBehavior("#default#userData"),document.body.appendChild(this.f)),fe.set(a,this.f));try{this.f.load(this.g)}catch(c){this.f=null}}}
D(ee,be);var ge={".":".2E","!":".21","~":".7E","*":".2A","'":".27","(":".28",")":".29","%":"."},fe=null;function he(a){return"_"+encodeURIComponent(a).replace(/[.!~*'()%]/g,function(b){return ge[b]})}
n=ee.prototype;n.isAvailable=function(){return!!this.f};
n.set=function(a,b){this.f.setAttribute(he(a),b);ie(this)};
n.get=function(a){a=this.f.getAttribute(he(a));if("string"!==typeof a&&null!==a)throw"Storage mechanism: Invalid value was encountered";return a};
n.remove=function(a){this.f.removeAttribute(he(a));ie(this)};
n.G=function(a){var b=0,c=this.f.XMLDocument.documentElement.attributes,d=new od;d.next=function(){if(b>=c.length)throw nd;var e=c[b++];if(a)return decodeURIComponent(e.nodeName.replace(/\./g,"%")).substr(1);e=e.nodeValue;if("string"!==typeof e)throw"Storage mechanism: Invalid value was encountered";return e};
return d};
n.clear=function(){for(var a=this.f.XMLDocument.documentElement,b=a.attributes.length;0<b;b--)a.removeAttribute(a.attributes[b-1].nodeName);ie(this)};
function ie(a){try{a.f.save(a.g)}catch(b){throw"Storage mechanism: Quota exceeded";}}
;function je(a,b){this.g=a;this.f=b+"::"}
D(je,be);je.prototype.set=function(a,b){this.g.set(this.f+a,b)};
je.prototype.get=function(a){return this.g.get(this.f+a)};
je.prototype.remove=function(a){this.g.remove(this.f+a)};
je.prototype.G=function(a){var b=this.g.G(!0),c=this,d=new od;d.next=function(){for(var e=b.next();e.substr(0,c.f.length)!=c.f;)e=b.next();return a?e.substr(c.f.length):c.g.get(e)};
return d};function ke(a,b){1<b.length?a[b[0]]=b[1]:1===b.length&&Object.assign(a,b[0])}
;var le=window.yt&&window.yt.config_||window.ytcfg&&window.ytcfg.data_||{};y("yt.config_",le,void 0);function P(a){ke(le,arguments)}
function Q(a,b){return a in le?le[a]:b}
function me(){return Q("ERRORS",[])}
function ne(){return Q("PLAYER_CONFIG",{})}
;function oe(){var a=pe;z("yt.ads.biscotti.getId_")||y("yt.ads.biscotti.getId_",a,void 0)}
function qe(a){y("yt.ads.biscotti.lastId_",a,void 0)}
;var re=[];function se(a){re.forEach(function(b){return b(a)})}
function te(a){return a&&window.yterr?function(){try{return a.apply(this,arguments)}catch(b){ue(b),se(b)}}:a}
function ue(a){var b=z("yt.logging.errors.log");b?b(a,"ERROR",void 0,void 0,void 0):(b=me(),b.push([a,"ERROR",void 0,void 0,void 0]),P("ERRORS",b))}
function ve(a){var b=z("yt.logging.errors.log");b?b(a,"WARNING",void 0,void 0,void 0):(b=me(),b.push([a,"WARNING",void 0,void 0,void 0]),P("ERRORS",b))}
;function we(a){a=a.split("&");for(var b={},c=0,d=a.length;c<d;c++){var e=a[c].split("=");if(1==e.length&&e[0]||2==e.length)try{var f=decodeURIComponent((e[0]||"").replace(/\+/g," ")),g=decodeURIComponent((e[1]||"").replace(/\+/g," "));f in b?Aa(b[f])?Ta(b[f],g):b[f]=[b[f],g]:b[f]=g}catch(k){if("q"!=e[0]){var h=Error("Error decoding URL component");h.params={key:e[0],value:e[1]};ue(h)}}}return b}
function xe(a){var b=[];gb(a,function(c,d){var e=encodeURIComponent(String(d)),f;Aa(c)?f=c:f=[c];F(f,function(g){""==g?b.push(e):b.push(e+"="+encodeURIComponent(String(g)))})});
return b.join("&")}
function ye(a){"?"==a.charAt(0)&&(a=a.substr(1));return we(a)}
function ze(a,b){return Ae(a,b||{},!0)}
function Ae(a,b,c){var d=a.split("#",2);a=d[0];d=1<d.length?"#"+d[1]:"";var e=a.split("?",2);a=e[0];e=ye(e[1]||"");for(var f in b)!c&&null!==e&&f in e||(e[f]=b[f]);return yc(a,e)+d}
;function Be(a){var b=Ce;a=void 0===a?z("yt.ads.biscotti.lastId_")||"":a;b=Object.assign(De(b),Ee(b));b.ca_type="image";a&&(b.bid=a);return b}
function De(a){var b={};b.dt=Hc;b.flash="0";a:{try{var c=a.f.top.location.href}catch(f){a=2;break a}a=c?c===a.g.location.href?0:1:2}b=(b.frm=a,b);b.u_tz=-(new Date).getTimezoneOffset();var d=void 0===d?I:d;try{var e=d.history.length}catch(f){e=0}b.u_his=e;b.u_java=!!I.navigator&&"unknown"!==typeof I.navigator.javaEnabled&&!!I.navigator.javaEnabled&&I.navigator.javaEnabled();I.screen&&(b.u_h=I.screen.height,b.u_w=I.screen.width,b.u_ah=I.screen.availHeight,b.u_aw=I.screen.availWidth,b.u_cd=I.screen.colorDepth);
I.navigator&&I.navigator.plugins&&(b.u_nplug=I.navigator.plugins.length);I.navigator&&I.navigator.mimeTypes&&(b.u_nmime=I.navigator.mimeTypes.length);return b}
function Ee(a){var b=a.f;try{var c=b.screenX;var d=b.screenY}catch(p){}try{var e=b.outerWidth;var f=b.outerHeight}catch(p){}try{var g=b.innerWidth;var h=b.innerHeight}catch(p){}b=[b.screenLeft,b.screenTop,c,d,b.screen?b.screen.availWidth:void 0,b.screen?b.screen.availTop:void 0,e,f,g,h];c=a.f.top;try{var k=(c||window).document,l="CSS1Compat"==k.compatMode?k.documentElement:k.body;var m=(new kc(l.clientWidth,l.clientHeight)).round()}catch(p){m=new kc(-12245933,-12245933)}k=m;m={};l=new Oc;x.SVGElement&&
x.document.createElementNS&&l.set(0);c=Fc();c["allow-top-navigation-by-user-activation"]&&l.set(1);c["allow-popups-to-escape-sandbox"]&&l.set(2);x.crypto&&x.crypto.subtle&&l.set(3);x.TextDecoder&&x.TextEncoder&&l.set(4);l=Pc(l);m.bc=l;m.bih=k.height;m.biw=k.width;m.brdim=b.join();a=a.g;return m.vis={visible:1,hidden:2,prerender:3,preview:4,unloaded:5}[a.visibilityState||a.webkitVisibilityState||a.mozVisibilityState||""]||0,m.wgl=!!I.WebGLRenderingContext,m}
var Ce=new function(){var a=window.document;this.f=window;this.g=a};
y("yt.ads_.signals_.getAdSignalsString",function(a){return xe(Be(a))},void 0);C();function R(a){a=Fe(a);return"string"===typeof a&&"false"===a?!1:!!a}
function Ge(a,b){var c=Fe(a);return void 0===c&&void 0!==b?b:Number(c||0)}
function Fe(a){var b=Q("EXPERIMENTS_FORCED_FLAGS",{});return void 0!==b[a]?b[a]:Q("EXPERIMENT_FLAGS",{})[a]}
;var He=void 0!==XMLHttpRequest?function(){return new XMLHttpRequest}:void 0!==ActiveXObject?function(){return new ActiveXObject("Microsoft.XMLHTTP")}:null;
function Ie(){if(!He)return null;var a=He();return"open"in a?a:null}
function Je(a){switch(a&&"status"in a?a.status:-1){case 200:case 201:case 202:case 203:case 204:case 205:case 206:case 304:return!0;default:return!1}}
;function S(a,b){Ca(a)&&(a=te(a));return window.setTimeout(a,b)}
function T(a){window.clearTimeout(a)}
;var Ke={Authorization:"AUTHORIZATION","X-Goog-Visitor-Id":"SANDBOXED_VISITOR_ID","X-YouTube-Client-Name":"INNERTUBE_CONTEXT_CLIENT_NAME","X-YouTube-Client-Version":"INNERTUBE_CONTEXT_CLIENT_VERSION","X-YouTube-Device":"DEVICE","X-Youtube-Identity-Token":"ID_TOKEN","X-YouTube-Page-CL":"PAGE_CL","X-YouTube-Page-Label":"PAGE_BUILD_LABEL","X-YouTube-Variants-Checksum":"VARIANTS_CHECKSUM"},Le="app debugcss debugjs expflag force_ad_params force_viral_ad_response_params forced_experiments innertube_snapshots innertube_goldens internalcountrycode internalipoverride absolute_experiments conditional_experiments sbb sr_bns_address".split(" "),
Me=!1;
function Ne(a,b){b=void 0===b?{}:b;if(!c)var c=window.location.href;var d=L(1,a),e=J(L(3,a));d&&e?(d=c,c=a.match(vc),d=d.match(vc),c=c[3]==d[3]&&c[1]==d[1]&&c[4]==d[4]):c=e?J(L(3,c))==e&&(Number(L(4,c))||null)==(Number(L(4,a))||null):!0;d=R("web_ajax_ignore_global_headers_if_set");for(var f in Ke)e=Q(Ke[f]),!e||!c&&!Oe(a,f)||d&&void 0!==b[f]||(b[f]=e);if(c||Oe(a,"X-YouTube-Utc-Offset"))b["X-YouTube-Utc-Offset"]=String(-(new Date).getTimezoneOffset());(c||Oe(a,"X-YouTube-Time-Zone"))&&(f="undefined"!=typeof Intl?
(new Intl.DateTimeFormat).resolvedOptions().timeZone:null)&&(b["X-YouTube-Time-Zone"]=f);if(c||Oe(a,"X-YouTube-Ad-Signals"))b["X-YouTube-Ad-Signals"]=xe(Be(void 0));return b}
function Pe(a){var b=window.location.search,c=J(L(3,a)),d=J(L(5,a));d=(c=c&&(c.endsWith("youtube.com")||c.endsWith("youtube-nocookie.com")))&&d&&d.startsWith("/api/");if(!c||d)return a;var e=ye(b),f={};F(Le,function(g){e[g]&&(f[g]=e[g])});
return Ae(a,f||{},!1)}
function Oe(a,b){var c=Q("CORS_HEADER_WHITELIST")||{},d=J(L(3,a));return d?(c=c[d])?0<=Ma(c,b):!1:!0}
function Qe(a,b){if(window.fetch&&"XML"!=b.format){var c={method:b.method||"GET",credentials:"same-origin"};b.headers&&(c.headers=b.headers);a=Re(a,b);var d=Se(a,b);d&&(c.body=d);b.withCredentials&&(c.credentials="include");var e=!1,f;fetch(a,c).then(function(g){if(!e){e=!0;f&&T(f);var h=g.ok,k=function(l){l=l||{};var m=b.context||x;h?b.onSuccess&&b.onSuccess.call(m,l,g):b.onError&&b.onError.call(m,l,g);b.ja&&b.ja.call(m,l,g)};
"JSON"==(b.format||"JSON")&&(h||400<=g.status&&500>g.status)?g.json().then(k,function(){k(null)}):k(null)}});
b.qa&&0<b.timeout&&(f=S(function(){e||(e=!0,T(f),b.qa.call(b.context||x))},b.timeout))}else Te(a,b)}
function Te(a,b){var c=b.format||"JSON";a=Re(a,b);var d=Se(a,b),e=!1,f,g=Ue(a,function(h){if(!e){e=!0;f&&T(f);var k=Je(h),l=null,m=400<=h.status&&500>h.status,p=500<=h.status&&600>h.status;if(k||m||p)l=Ve(c,h,b.pb);if(k)a:if(h&&204==h.status)k=!0;else{switch(c){case "XML":k=0==parseInt(l&&l.return_code,10);break a;case "RAW":k=!0;break a}k=!!l}l=l||{};m=b.context||x;k?b.onSuccess&&b.onSuccess.call(m,h,l):b.onError&&b.onError.call(m,h,l);b.ja&&b.ja.call(m,h,l)}},b.method,d,b.headers,b.responseType,
b.withCredentials);
b.O&&0<b.timeout&&(f=S(function(){e||(e=!0,g.abort(),T(f),b.O.call(b.context||x,g))},b.timeout));
return g}
function Re(a,b){b.sb&&(a=document.location.protocol+"//"+document.location.hostname+(document.location.port?":"+document.location.port:"")+a);var c=Q("XSRF_FIELD_NAME",void 0),d=b.Za;d&&(d[c]&&delete d[c],a=ze(a,d));return a}
function Se(a,b){var c=Q("XSRF_FIELD_NAME",void 0),d=Q("XSRF_TOKEN",void 0),e=b.postBody||"",f=b.C,g=Q("XSRF_FIELD_NAME",void 0),h;b.headers&&(h=b.headers["Content-Type"]);b.rb||J(L(3,a))&&!b.withCredentials&&J(L(3,a))!=document.location.hostname||"POST"!=b.method||h&&"application/x-www-form-urlencoded"!=h||b.C&&b.C[g]||(f||(f={}),f[c]=d);f&&"string"===typeof e&&(e=ye(e),qb(e,f),e=b.ra&&"JSON"==b.ra?JSON.stringify(e):xc(e));f=e||f&&!kb(f);!Me&&f&&"POST"!=b.method&&(Me=!0,ue(Error("AJAX request with postData should use POST")));
return e}
function Ve(a,b,c){var d=null;switch(a){case "JSON":a=b.responseText;b=b.getResponseHeader("Content-Type")||"";a&&0<=b.indexOf("json")&&(d=JSON.parse(a));break;case "XML":if(b=(b=b.responseXML)?We(b):null)d={},F(b.getElementsByTagName("*"),function(e){d[e.tagName]=Xe(e)})}c&&Ye(d);
return d}
function Ye(a){if(Da(a))for(var b in a){var c;(c="html_content"==b)||(c=b.length-5,c=0<=c&&b.indexOf("_html",c)==c);if(c){c=b;var d=Jb(a[b],null);a[c]=d}else Ye(a[b])}}
function We(a){return a?(a=("responseXML"in a?a.responseXML:a).getElementsByTagName("root"))&&0<a.length?a[0]:null:null}
function Xe(a){var b="";F(a.childNodes,function(c){b+=c.nodeValue});
return b}
function Ue(a,b,c,d,e,f,g){function h(){4==(k&&"readyState"in k?k.readyState:0)&&b&&te(b)(k)}
c=void 0===c?"GET":c;d=void 0===d?"":d;var k=Ie();if(!k)return null;"onloadend"in k?k.addEventListener("loadend",h,!1):k.onreadystatechange=h;R("debug_forward_web_query_parameters")&&(a=Pe(a));k.open(c,a,!0);f&&(k.responseType=f);g&&(k.withCredentials=!0);c="POST"==c&&(void 0===window.FormData||!(d instanceof FormData));if(e=Ne(a,e))for(var l in e)k.setRequestHeader(l,e[l]),"content-type"==l.toLowerCase()&&(c=!1);c&&k.setRequestHeader("Content-Type","application/x-www-form-urlencoded");k.send(d);
return k}
;var Ze={},$e=0;
function af(a,b,c,d,e){e=void 0===e?"":e;a&&(c&&(c=db,c=!(c&&0<=c.toLowerCase().indexOf("cobalt"))),c?a&&(a instanceof H||(a="object"==typeof a&&a.J?a.I():String(a),Db.test(a)||(a="about:invalid#zClosurez"),a=new H(Ab,a)),b=Cb(a),"about:invalid#zClosurez"===b?a="":(b instanceof Fb?a=b:(d="object"==typeof b,a=null,d&&b.ha&&(a=b.ea()),b=Wa(d&&b.J?b.I():String(b)),a=Jb(b,a)),a=Ib(a).toString(),a=encodeURIComponent(String(wd(a)))),/^[\s\xa0]*$/.test(a)||(a=oc("IFRAME",{src:'javascript:"<body><img src=\\""+'+a+
'+"\\"></body>"',style:"display:none"}),(9==a.nodeType?a:a.ownerDocument||a.document).body.appendChild(a))):e?Ue(a,b,"POST",e,d):Q("USE_NET_AJAX_FOR_PING_TRANSPORT",!1)||d?Ue(a,b,"GET","",d):bf(a,b)||cf(a,b))}
function bf(a,b){var c=le.EXPERIMENT_FLAGS;if(!c||!c.web_use_beacon_api_for_ad_click_server_pings)return!1;c=J(L(5,a));return c&&-1!=c.indexOf("/aclk")&&"1"===Ac(a,"ae")&&"1"===Ac(a,"act")?df(a)?(b&&b(),!0):!1:!1}
function df(a,b){try{if(window.navigator&&window.navigator.sendBeacon&&window.navigator.sendBeacon(a,void 0===b?"":b))return!0}catch(c){}return!1}
function cf(a,b){var c=new Image,d=""+$e++;Ze[d]=c;c.onload=c.onerror=function(){b&&Ze[d]&&b();delete Ze[d]};
c.src=a}
;function ef(a,b){for(var c=[],d=1;d<arguments.length;++d)c[d-1]=arguments[d];d=Error.call(this,a);this.message=d.message;"stack"in d&&(this.stack=d.stack);this.args=[].concat(c instanceof Array?c:ba(q(c)))}
r(ef,Error);var ff=new Set,gf=0;function hf(a){var b=z("yt.logging.errors.log");b?b(a,"ERROR",void 0,void 0,!1,void 0):(b=me(),b.push([a,"ERROR",void 0,void 0,!1,void 0]),P("ERRORS",b))}
function jf(a){var b=z("yt.logging.errors.log");b?b(a,"WARNING",void 0,void 0,!1,void 0):(b=me(),b.push([a,"WARNING",void 0,void 0,!1,void 0]),P("ERRORS",b))}
function kf(a,b,c,d){c+="."+a;a=String(JSON.stringify(b)).substr(0,500);d[c]=a;return c.length+a.length}
;function lf(a,b,c,d,e,f){b=void 0===b?"ERROR":b;f=void 0===f?{}:f;f.name=c||Q("INNERTUBE_CONTEXT_CLIENT_NAME",1);f.version=d||Q("INNERTUBE_CONTEXT_CLIENT_VERSION",void 0);c=f||{};d=void 0===b?"ERROR":b;d=void 0===d?"ERROR":d;f=window&&window.yterr||!1;if(a&&f&&!(5<=gf)&&(R("console_log_js_exceptions")&&(f=[],f.push("Name: "+a.name),f.push("Message: "+a.message),a.hasOwnProperty("params")&&f.push("Error Params: "+JSON.stringify(a.params)),f.push("File name: "+a.fileName),f.push("Stacktrace: "+a.stack),
window.console.log(f.join("\n"),a)),0!==a.f)){f=a.g;b=a.columnNumber;if(a.args&&a.args.length)for(var g=0,h=0;h<a.args.length;h++){e=a.args[h];var k="params."+h;g+=k.length;if(e)if(Array.isArray(e))for(var l=c,m=0;m<e.length&&!(e[m]&&(g+=kf(m,e[m],k,l),500<g));m++);else if("object"===typeof e)for(l in l=void 0,m=c,e){if(e[l]&&(g+=kf(l,e[l],k,m),500<g))break}else c[k]=String(JSON.stringify(e)).substring(0,500),g+=c[k].length;else c[k]=String(JSON.stringify(e)).substring(0,500),g+=c[k].length;if(500<=
g)break}else if(a.hasOwnProperty("params"))if(e=a.params,"object"===typeof a.params)for(h in k=0,e){if(e[h]&&(g="params."+h,l=String(JSON.stringify(e[h])).substr(0,500),c[g]=l,k+=g.length+l.length,500<k))break}else c.params=String(JSON.stringify(e)).substr(0,500);a=gc(a);(f=f||a.stack)||(f="Not available");h=a.lineNumber.toString();isNaN(h)||!b||isNaN(b)||(h=h+":"+b);window.yterr&&Ca(window.yterr)&&(a.params=c,window.yterr(a));if(!(ff.has(a.message)||0<=f.indexOf("/YouTubeCenter.js")||0<=f.indexOf("/mytube.js"))){d=
{Za:{a:"logerror",t:"jserror",type:a.name,msg:a.message.substr(0,250),line:h,level:d,"client.name":c.name},C:{url:Q("PAGE_NAME",window.location.href),file:a.fileName},method:"POST"};c.version&&(d["client.version"]=c.version);if(d.C){f&&(d.C.stack=f);f=q(Object.keys(c));for(b=f.next();!b.done;b=f.next())b=b.value,d.C["client."+b]=c[b];if(c=Q("LATEST_ECATCHER_SERVICE_TRACKING_PARAMS",void 0))for(f=q(Object.keys(c)),b=f.next();!b.done;b=f.next())b=b.value,d.C[b]=c[b]}Te(Q("ECATCHER_REPORT_HOST","")+
"/error_204",d);ff.add(a.message);gf++}}}
;var mf=window.yt&&window.yt.msgs_||window.ytcfg&&window.ytcfg.msgs||{};y("yt.msgs_",mf,void 0);function nf(a){ke(mf,arguments)}
;function of(a){a&&(a.dataset?a.dataset[pf("loaded")]="true":a.setAttribute("data-loaded","true"))}
function qf(a,b){return a?a.dataset?a.dataset[pf(b)]:a.getAttribute("data-"+b):null}
var rf={};function pf(a){return rf[a]||(rf[a]=String(a).replace(/\-([a-z])/g,function(b,c){return c.toUpperCase()}))}
;var sf=z("ytPubsubPubsubInstance")||new O;O.prototype.subscribe=O.prototype.subscribe;O.prototype.unsubscribeByKey=O.prototype.N;O.prototype.publish=O.prototype.M;O.prototype.clear=O.prototype.clear;y("ytPubsubPubsubInstance",sf,void 0);var tf=z("ytPubsubPubsubSubscribedKeys")||{};y("ytPubsubPubsubSubscribedKeys",tf,void 0);var uf=z("ytPubsubPubsubTopicToKeys")||{};y("ytPubsubPubsubTopicToKeys",uf,void 0);var vf=z("ytPubsubPubsubIsSynchronous")||{};y("ytPubsubPubsubIsSynchronous",vf,void 0);
function wf(a,b){var c=xf();if(c){var d=c.subscribe(a,function(){var e=arguments;var f=function(){tf[d]&&b.apply(window,e)};
try{vf[a]?f():S(f,0)}catch(g){ue(g)}},void 0);
tf[d]=!0;uf[a]||(uf[a]=[]);uf[a].push(d);return d}return 0}
function yf(a){var b=xf();b&&("number"===typeof a?a=[a]:"string"===typeof a&&(a=[parseInt(a,10)]),F(a,function(c){b.unsubscribeByKey(c);delete tf[c]}))}
function zf(a,b){var c=xf();c&&c.publish.apply(c,arguments)}
function Af(a){var b=xf();if(b)if(b.clear(a),a)Bf(a);else for(var c in uf)Bf(c)}
function xf(){return z("ytPubsubPubsubInstance")}
function Bf(a){uf[a]&&(a=uf[a],F(a,function(b){tf[b]&&delete tf[b]}),a.length=0)}
;var Cf=/\.vflset|-vfl[a-zA-Z0-9_+=-]+/,Df=/-[a-zA-Z]{2,3}_[a-zA-Z]{2,3}(?=(\/|$))/;function Ef(a,b,c){c=void 0===c?null:c;if(window.spf&&spf.script){c="";if(a){var d=a.indexOf("jsbin/"),e=a.lastIndexOf(".js"),f=d+6;-1<d&&-1<e&&e>f&&(c=a.substring(f,e),c=c.replace(Cf,""),c=c.replace(Df,""),c=c.replace("debug-",""),c=c.replace("tracing-",""))}spf.script.load(a,c,b)}else Ff(a,b,c)}
function Ff(a,b,c){c=void 0===c?null:c;var d=Gf(a),e=document.getElementById(d),f=e&&qf(e,"loaded"),g=e&&!f;f?b&&b():(b&&(f=wf(d,b),b=""+Ea(b),Hf[b]=f),g||(e=If(a,d,function(){qf(e,"loaded")||(of(e),zf(d),S(Ka(Af,d),0))},c)))}
function If(a,b,c,d){d=void 0===d?null:d;var e=pc(document,"SCRIPT");e.id=b;e.onload=function(){c&&setTimeout(c,0)};
e.onreadystatechange=function(){switch(e.readyState){case "loaded":case "complete":e.onload()}};
d&&e.setAttribute("nonce",d);Mb(e,tc(a));a=document.getElementsByTagName("head")[0]||document.body;a.insertBefore(e,a.firstChild);return e}
function Jf(a){a=Gf(a);var b=document.getElementById(a);b&&(Af(a),b.parentNode.removeChild(b))}
function Kf(a,b){if(a&&b){var c=""+Ea(b);(c=Hf[c])&&yf(c)}}
function Gf(a){var b=document.createElement("a");Lb(b,a);a=b.href.replace(/^[a-zA-Z]+:\/\//,"//");return"js-"+Ob(a)}
var Hf={};function Lf(){}
function Mf(a,b){return Nf(a,1,b)}
;function Of(){}
r(Of,Lf);function Nf(a,b,c){isNaN(c)&&(c=void 0);var d=z("yt.scheduler.instance.addJob");return d?d(a,b,c):void 0===c?(a(),NaN):S(a,c||0)}
Of.prototype.start=function(){var a=z("yt.scheduler.instance.start");a&&a()};
Of.prototype.pause=function(){var a=z("yt.scheduler.instance.pause");a&&a()};
ya(Of);Of.getInstance();var Pf=[],Qf=!1;function Rf(){if("1"!=hb(ne(),"args","privembed")){var a=function(){Qf=!0;"google_ad_status"in window?P("DCLKSTAT",1):P("DCLKSTAT",2)};
Ef("//static.doubleclick.net/instream/ad_status.js",a);Pf.push(Mf(function(){Qf||"google_ad_status"in window||(Kf("//static.doubleclick.net/instream/ad_status.js",a),Qf=!0,P("DCLKSTAT",3))},5E3))}}
function Sf(){return parseInt(Q("DCLKSTAT",0),10)}
;function Tf(){this.g=!1;this.f=null}
Tf.prototype.initialize=function(a,b,c,d,e,f){var g=this;f=void 0===f?!1:f;b?(this.g=!0,Ef(b,function(){g.g=!1;window.botguard?Uf(g,c,d,f):(Jf(b),jf(new ef("Unable to load Botguard","from "+b)))},e)):a&&(eval(a),window.botguard?Uf(this,c,d,f):jf(Error("Unable to load Botguard from JS")))};
function Uf(a,b,c,d){if(d)try{a.f=new window.botguard.bg(b,c?function(){return c(b)}:xa)}catch(e){jf(e)}else{try{a.f=new window.botguard.bg(b)}catch(e){jf(e)}c&&c(b)}}
Tf.prototype.dispose=function(){this.f=null};var Vf=window,U=Vf.ytcsi&&Vf.ytcsi.now?Vf.ytcsi.now:Vf.performance&&Vf.performance.timing&&Vf.performance.now?function(){return Vf.performance.timing.navigationStart+Vf.performance.now()}:function(){return(new Date).getTime()};var Wf=new Tf,Xf=!1,Yf=0,Zf="";function $f(a){R("botguard_periodic_refresh")?Yf=U():R("botguard_always_refresh")&&(Zf=a)}
function ag(a){if(a){if(Wf.g)return!1;if(R("botguard_periodic_refresh"))return 72E5<U()-Yf;if(R("botguard_always_refresh"))return Zf!=a}else return!1;return!Xf}
function bg(){return!!Wf.f}
function cg(a){a=void 0===a?{}:a;a=void 0===a?{}:a;return Wf.f?Wf.f.invoke(void 0,void 0,a):null}
;var dg=0;y("ytDomDomGetNextId",z("ytDomDomGetNextId")||function(){return++dg},void 0);var eg={stopImmediatePropagation:1,stopPropagation:1,preventMouseEvent:1,preventManipulation:1,preventDefault:1,layerX:1,layerY:1,screenX:1,screenY:1,scale:1,rotation:1,webkitMovementX:1,webkitMovementY:1};
function fg(a){this.type="";this.state=this.source=this.data=this.currentTarget=this.relatedTarget=this.target=null;this.charCode=this.keyCode=0;this.metaKey=this.shiftKey=this.ctrlKey=this.altKey=!1;this.clientY=this.clientX=0;this.changedTouches=this.touches=null;try{if(a=a||window.event){this.event=a;for(var b in a)b in eg||(this[b]=a[b]);var c=a.target||a.srcElement;c&&3==c.nodeType&&(c=c.parentNode);this.target=c;var d=a.relatedTarget;if(d)try{d=d.nodeName?d:null}catch(e){d=null}else"mouseover"==
this.type?d=a.fromElement:"mouseout"==this.type&&(d=a.toElement);this.relatedTarget=d;this.clientX=void 0!=a.clientX?a.clientX:a.pageX;this.clientY=void 0!=a.clientY?a.clientY:a.pageY;this.keyCode=a.keyCode?a.keyCode:a.which;this.charCode=a.charCode||("keypress"==this.type?this.keyCode:0);this.altKey=a.altKey;this.ctrlKey=a.ctrlKey;this.shiftKey=a.shiftKey;this.metaKey=a.metaKey;this.f=a.pageX;this.g=a.pageY}}catch(e){}}
function gg(a){if(document.body&&document.documentElement){var b=document.body.scrollTop+document.documentElement.scrollTop;a.f=a.clientX+(document.body.scrollLeft+document.documentElement.scrollLeft);a.g=a.clientY+b}}
fg.prototype.preventDefault=function(){this.event&&(this.event.returnValue=!1,this.event.preventDefault&&this.event.preventDefault())};
fg.prototype.stopPropagation=function(){this.event&&(this.event.cancelBubble=!0,this.event.stopPropagation&&this.event.stopPropagation())};
fg.prototype.stopImmediatePropagation=function(){this.event&&(this.event.cancelBubble=!0,this.event.stopImmediatePropagation&&this.event.stopImmediatePropagation())};var jb=z("ytEventsEventsListeners")||{};y("ytEventsEventsListeners",jb,void 0);var hg=z("ytEventsEventsCounter")||{count:0};y("ytEventsEventsCounter",hg,void 0);
function ig(a,b,c,d){d=void 0===d?{}:d;a.addEventListener&&("mouseenter"!=b||"onmouseenter"in document?"mouseleave"!=b||"onmouseenter"in document?"mousewheel"==b&&"MozBoxSizing"in document.documentElement.style&&(b="MozMousePixelScroll"):b="mouseout":b="mouseover");return ib(function(e){var f="boolean"===typeof e[4]&&e[4]==!!d,g=Da(e[4])&&Da(d)&&mb(e[4],d);return!!e.length&&e[0]==a&&e[1]==b&&e[2]==c&&(f||g)})}
var jg=Ua(function(){var a=!1;try{var b=Object.defineProperty({},"capture",{get:function(){a=!0}});
window.addEventListener("test",null,b)}catch(c){}return a});
function V(a,b,c,d){d=void 0===d?{}:d;if(!a||!a.addEventListener&&!a.attachEvent)return"";var e=ig(a,b,c,d);if(e)return e;e=++hg.count+"";var f=!("mouseenter"!=b&&"mouseleave"!=b||!a.addEventListener||"onmouseenter"in document);var g=f?function(h){h=new fg(h);if(!sc(h.relatedTarget,function(k){return k==a}))return h.currentTarget=a,h.type=b,c.call(a,h)}:function(h){h=new fg(h);
h.currentTarget=a;return c.call(a,h)};
g=te(g);a.addEventListener?("mouseenter"==b&&f?b="mouseover":"mouseleave"==b&&f?b="mouseout":"mousewheel"==b&&"MozBoxSizing"in document.documentElement.style&&(b="MozMousePixelScroll"),jg()||"boolean"===typeof d?a.addEventListener(b,g,d):a.addEventListener(b,g,!!d.capture)):a.attachEvent("on"+b,g);jb[e]=[a,b,c,g,d];return e}
function kg(a){a&&("string"==typeof a&&(a=[a]),F(a,function(b){if(b in jb){var c=jb[b],d=c[0],e=c[1],f=c[3];c=c[4];d.removeEventListener?jg()||"boolean"===typeof c?d.removeEventListener(e,f,c):d.removeEventListener(e,f,!!c.capture):d.detachEvent&&d.detachEvent("on"+e,f);delete jb[b]}}))}
;var lg=window.ytcsi&&window.ytcsi.now?window.ytcsi.now:window.performance&&window.performance.timing&&window.performance.now&&window.performance.timing.navigationStart?function(){return window.performance.timing.navigationStart+window.performance.now()}:function(){return(new Date).getTime()};function mg(a){this.w=a;this.f=null;this.j=0;this.m=null;this.l=0;this.h=[];for(a=0;4>a;a++)this.h.push(0);this.i=0;this.D=V(window,"mousemove",A(this.F,this));a=A(this.A,this);Ca(a)&&(a=te(a));this.K=window.setInterval(a,25)}
D(mg,M);mg.prototype.F=function(a){void 0===a.f&&gg(a);var b=a.f;void 0===a.g&&gg(a);this.f=new jc(b,a.g)};
mg.prototype.A=function(){if(this.f){var a=lg();if(0!=this.j){var b=this.m,c=this.f,d=b.x-c.x;b=b.y-c.y;d=Math.sqrt(d*d+b*b)/(a-this.j);this.h[this.i]=.5<Math.abs((d-this.l)/this.l)?1:0;for(c=b=0;4>c;c++)b+=this.h[c]||0;3<=b&&this.w();this.l=d}this.j=a;this.m=this.f;this.i=(this.i+1)%4}};
mg.prototype.o=function(){window.clearInterval(this.K);kg(this.D)};var ng={};
function og(a){var b=void 0===a?{}:a;a=void 0===b.Ca?!0:b.Ca;b=void 0===b.Oa?!1:b.Oa;if(null==z("_lact",window)){var c=parseInt(Q("LACT"),10);c=isFinite(c)?C()-Math.max(c,0):-1;y("_lact",c,window);y("_fact",c,window);-1==c&&pg();V(document,"keydown",pg);V(document,"keyup",pg);V(document,"mousedown",pg);V(document,"mouseup",pg);a&&(b?V(window,"touchmove",function(){qg("touchmove",200)},{passive:!0}):(V(window,"resize",function(){qg("resize",200)}),V(window,"scroll",function(){qg("scroll",200)})));
new mg(function(){qg("mouse",100)});
V(document,"touchstart",pg,{passive:!0});V(document,"touchend",pg,{passive:!0})}}
function qg(a,b){ng[a]||(ng[a]=!0,Mf(function(){pg();ng[a]=!1},b))}
function pg(){null==z("_lact",window)&&og();var a=C();y("_lact",a,window);-1==z("_fact",window)&&y("_fact",a,window);(a=z("ytglobal.ytUtilActivityCallback_"))&&a()}
function rg(){var a=z("_lact",window);return null==a?-1:Math.max(C()-a,0)}
;var sg=Ge("initial_gel_batch_timeout",1E3),tg=Math.pow(2,16)-1,ug=null,vg=0,wg={log_event:"events",log_interaction:"interactions"},xg=Object.create(null);xg.log_event="GENERIC_EVENT_LOGGING";xg.log_interaction="INTERACTION_LOGGING";var yg=new Set(["log_event"]),zg={},Ag=0,Bg=0,Cg=0,Dg=!0,W=z("ytLoggingTransportLogPayloadsQueue_")||{};y("ytLoggingTransportLogPayloadsQueue_",W,void 0);var Eg=z("ytLoggingTransportTokensToCttTargetIds_")||{};y("ytLoggingTransportTokensToCttTargetIds_",Eg,void 0);
var Fg=z("ytLoggingTransportDispatchedStats_")||{};y("ytLoggingTransportDispatchedStats_",Fg,void 0);y("ytytLoggingTransportCapturedTime_",z("ytLoggingTransportCapturedTime_")||{},void 0);function Gg(){T(Ag);T(Bg);Bg=0;if(!kb(W)){for(var a in W){var b=zg[a];b&&b.isReady()&&(Hg(a,b),delete W[a],Dg=!1)}kb(W)||Ig()}}
function Ig(){R("web_gel_timeout_cap")&&!Bg&&(Bg=S(Gg,6E4));T(Ag);var a=Q("LOGGING_BATCH_TIMEOUT",Ge("web_gel_debounce_ms",1E4));R("shorten_initial_gel_batch_timeout")&&Dg&&(a=sg);Ag=S(Gg,a)}
function Jg(a,b){b=void 0===b?"":b;W[a]=W[a]||{};W[a][b]=W[a][b]||[];return W[a][b]}
function Hg(a,b){var c=wg[a],d=Fg[a]||{};Fg[a]=d;var e=Math.round(U());for(p in W[a]){var f=ob,g=b.f||Kg();g={client:{hl:g.Ga,gl:g.Fa,clientName:g.Ea,clientVersion:g.innertubeContextClientVersion,configInfo:g.Da}};var h=window.devicePixelRatio;h&&1!=h&&(g.client.screenDensityFloat=String(h));h=Q("EXPERIMENTS_TOKEN","");""!==h&&(g.client.experimentsToken=h);var k=h=void 0,l=[],m=Q("EXPERIMENTS_FORCED_FLAGS",{});for(k in m)l.push({key:k,value:String(m[k])});k=Q("EXPERIMENT_FLAGS",{});for(h in k)h.startsWith("force_")&&
void 0===m[h]&&l.push({key:h,value:String(k[h])});h=l;0<h.length&&(g.request={internalExperimentFlags:h});Q("DELEGATED_SESSION_ID")&&!R("pageid_as_header_web")&&(g.user={onBehalfOfUser:Q("DELEGATED_SESSION_ID")});f=f({context:g});f[c]=Jg(a,p);d.dispatchedEventCount=d.dispatchedEventCount||0;d.dispatchedEventCount+=f[c].length;if(g=Eg[p])a:{l=p;if(g.videoId)h="VIDEO";else if(g.playlistId)h="PLAYLIST";else break a;f.credentialTransferTokenTargetId=g;f.context=f.context||{};f.context.user=f.context.user||
{};f.context.user.credentialTransferTokens=[{token:l,scope:h}]}delete Eg[p];f.requestTimeMs=e;R("unsplit_gel_payloads_in_logs")&&(f.unsplitGelPayloadsInLogs=!0);if(g=Q("EVENT_ID",void 0))h=Q("BATCH_CLIENT_COUNTER",void 0)||0,!h&&R("web_client_counter_random_seed")&&(h=Math.floor(Math.random()*tg/2)),h++,h>tg&&(h=1),P("BATCH_CLIENT_COUNTER",h),g={serializedEventId:g,clientCounter:h},f.serializedClientEventId=g,ug&&vg&&R("log_gel_rtt_web")&&(f.previousBatchInfo={serializedClientEventId:ug,roundtripMs:vg}),
ug=g,vg=0;Lg(b,a,f,{retry:yg.has(a),onSuccess:A(Mg,this,U())})}if(d.previousDispatchMs){c=e-d.previousDispatchMs;var p=d.diffCount||0;d.averageTimeBetweenDispatchesMs=p?(d.averageTimeBetweenDispatchesMs*p+c)/(p+1):c;d.diffCount=p+1}d.previousDispatchMs=e}
function Mg(a){vg=Math.round(U()-a)}
;var Ng=z("ytLoggingGelSequenceIdObj_")||{};y("ytLoggingGelSequenceIdObj_",Ng,void 0);
function Og(a,b,c,d){d=void 0===d?{}:d;var e={};e.eventTimeMs=Math.round(d.timestamp||U());e[a]=b;e.context={lastActivityMs:String(d.timestamp?-1:rg())};R("log_sequence_info_on_gel_web")&&d.P&&(a=e.context,b=d.P,Ng[b]=b in Ng?Ng[b]+1:0,a.sequence={index:Ng[b],groupKey:b},d.qb&&delete Ng[d.P]);(d=d.da)?(a={},d.videoId?a.videoId=d.videoId:d.playlistId&&(a.playlistId=d.playlistId),Eg[d.token]=a,d=Jg("log_event",d.token)):d=Jg("log_event");d.push(e);c&&(zg.log_event=new c);c=Ge("web_logging_max_batch")||
100;e=U();d.length>=c?Gg():10<=e-Cg&&(Ig(),Cg=e)}
;function Pg(){return"INNERTUBE_API_KEY"in le&&"INNERTUBE_API_VERSION"in le}
function Kg(){return{innertubeApiKey:Q("INNERTUBE_API_KEY",void 0),innertubeApiVersion:Q("INNERTUBE_API_VERSION",void 0),Da:Q("INNERTUBE_CONTEXT_CLIENT_CONFIG_INFO"),Ea:Q("INNERTUBE_CONTEXT_CLIENT_NAME","WEB"),innertubeContextClientVersion:Q("INNERTUBE_CONTEXT_CLIENT_VERSION",void 0),Ga:Q("INNERTUBE_CONTEXT_HL",void 0),Fa:Q("INNERTUBE_CONTEXT_GL",void 0),Ha:Q("INNERTUBE_HOST_OVERRIDE",void 0)||"",Ia:!!Q("INNERTUBE_USE_THIRD_PARTY_AUTH",!1)}}
function Qg(a,b,c){c=void 0===c?{}:c;var d={"X-Goog-Visitor-Id":c.visitorData||Q("VISITOR_DATA","")};if(b&&b.includes("www.youtube-nocookie.com"))return d;(b=c.nb||Q("AUTHORIZATION"))||(a?b="Bearer "+z("gapi.auth.getToken")().mb:b=Nc([]));b&&(d.Authorization=b,d["X-Goog-AuthUser"]=Q("SESSION_INDEX",0),R("pageid_as_header_web")&&(d["X-Goog-PageId"]=Q("DELEGATED_SESSION_ID")));return d}
function Rg(a){a=Object.assign({},a);delete a.Authorization;var b=Nc();if(b){var c=new ed;c.update(Q("INNERTUBE_API_KEY",void 0));c.update(b);b=c.digest();c=3;Ba(b);void 0===c&&(c=0);if(!dc){dc={};for(var d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),e=["+/=","+/","-_=","-_.","-_"],f=0;5>f;f++){var g=d.concat(e[f].split(""));cc[f]=g;for(var h=0;h<g.length;h++){var k=g[h];void 0===dc[k]&&(dc[k]=h)}}}c=cc[c];d=[];for(e=0;e<b.length;e+=3){var l=b[e],m=(f=e+1<b.length)?
b[e+1]:0;k=(g=e+2<b.length)?b[e+2]:0;h=l>>2;l=(l&3)<<4|m>>4;m=(m&15)<<2|k>>6;k&=63;g||(k=64,f||(m=64));d.push(c[h],c[l],c[m]||"",c[k]||"")}a.hash=d.join("")}return a}
;function Sg(a,b,c,d){fc.set(""+a,b,{ma:c,path:"/",domain:void 0===d?"youtube.com":d,secure:!1})}
;function Tg(){var a=new de;(a=a.isAvailable()?new je(a,"yt.innertube"):null)||(a=new ee("yt.innertube"),a=a.isAvailable()?a:null);this.f=a?new $d(a):null;this.g=document.domain||window.location.hostname}
Tg.prototype.set=function(a,b,c,d){c=c||31104E3;this.remove(a);if(this.f)try{this.f.set(a,b,C()+1E3*c);return}catch(f){}var e="";if(d)try{e=escape(wd(b))}catch(f){return}else e=escape(b);Sg(a,e,c,this.g)};
Tg.prototype.get=function(a,b){var c=void 0,d=!this.f;if(!d)try{c=this.f.get(a)}catch(e){d=!0}if(d&&(c=fc.get(""+a,void 0))&&(c=unescape(c),b))try{c=JSON.parse(c)}catch(e){this.remove(a),c=void 0}return c};
Tg.prototype.remove=function(a){this.f&&this.f.remove(a);var b=this.g;fc.remove(""+a,"/",void 0===b?"youtube.com":b)};var Ug=new Tg;function Vg(a,b,c,d){if(d)return null;d=Ug.get("nextId",!0)||1;var e=Ug.get("requests",!0)||{};e[d]={method:a,request:b,authState:Rg(c),requestTime:Math.round(U())};Ug.set("nextId",d+1,86400,!0);Ug.set("requests",e,86400,!0);return d}
function Wg(a){var b=Ug.get("requests",!0)||{};delete b[a];Ug.set("requests",b,86400,!0)}
function Xg(a){var b=Ug.get("requests",!0);if(b){for(var c in b){var d=b[c];if(!(6E4>Math.round(U())-d.requestTime)){var e=d.authState,f=Rg(Qg(!1));mb(e,f)&&(e=d.request,"requestTimeMs"in e&&(e.requestTimeMs=Math.round(U())),Lg(a,d.method,e,{}));delete b[c]}}Ug.set("requests",b,86400,!0)}}
;function Yg(a){var b=this;this.f=null;a?this.f=a:R("delay_gel_until_config_ready")?Pg()&&(this.f=Kg()):this.f=Kg();Nf(function(){Xg(b)},0,5E3)}
Yg.prototype.isReady=function(){!this.f&&Pg()&&(this.f=Kg());return!!this.f};
function Lg(a,b,c,d){!Q("VISITOR_DATA")&&"visitor_id"!==b&&.01>Math.random()&&ve(Error("Missing VISITOR_DATA when sending innertube request."));var e={headers:{"Content-Type":"application/json"},method:"POST",C:c,ra:"JSON",O:function(){d.O()},
qa:d.O,onSuccess:function(v,t){if(d.onSuccess)d.onSuccess(t)},
oa:function(v){if(d.onSuccess)d.onSuccess(v)},
onError:function(v,t){if(d.onError)d.onError(t)},
tb:function(v){if(d.onError)d.onError(v)},
timeout:d.timeout,withCredentials:!0},f="",g=a.f.Ha;g&&(f=g);g=a.f.Ia||!1;var h=Qg(g,f,d);Object.assign(e.headers,h);e.headers.Authorization&&!f&&(e.headers["x-origin"]=window.location.origin);var k=ze(""+f+("/youtubei/"+a.f.innertubeApiVersion+"/"+b),{alt:"json",key:a.f.innertubeApiKey}),l;if(d.retry&&R("retry_web_logging_batches")&&"www.youtube-nocookie.com"!=f&&(l=Vg(b,c,h,g))){var m=e.onSuccess,p=e.oa;e.onSuccess=function(v,t){Wg(l);m(v,t)};
c.oa=function(v,t){Wg(l);p(v,t)}}try{R("use_fetch_for_op_xhr")?Qe(k,e):(e.method="POST",e.C||(e.C={}),Te(k,e))}catch(v){if("InvalidAccessError"==v)l&&(Wg(l),l=0),ve(Error("An extension is blocking network request."));
else throw v;}l&&Nf(function(){Xg(a)},0,5E3)}
;var Zg=C().toString();
function $g(){a:{if(window.crypto&&window.crypto.getRandomValues)try{var a=Array(16),b=new Uint8Array(16);window.crypto.getRandomValues(b);for(var c=0;c<a.length;c++)a[c]=b[c];var d=a;break a}catch(e){}d=Array(16);for(a=0;16>a;a++){b=C();for(c=0;c<b%23;c++)d[a]=Math.random();d[a]=Math.floor(256*Math.random())}if(Zg)for(a=1,b=0;b<Zg.length;b++)d[a%16]=d[a%16]^d[(a-1)%16]/4^Zg.charCodeAt(b),a++}a=[];for(b=0;b<d.length;b++)a.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(d[b]&63));
return a.join("")}
;var ah=z("ytLoggingTimeDocumentNonce_")||$g();y("ytLoggingTimeDocumentNonce_",ah,void 0);function bh(a){this.f=a}
function ch(a){var b={};void 0!==a.f.trackingParams?b.trackingParams=a.f.trackingParams:(b.veType=a.f.veType,null!=a.f.veCounter&&(b.veCounter=a.f.veCounter),null!=a.f.elementIndex&&(b.elementIndex=a.f.elementIndex));void 0!==a.f.dataElement&&(b.dataElement=ch(a.f.dataElement));void 0!==a.f.youtubeData&&(b.youtubeData=a.f.youtubeData);return b}
bh.prototype.toString=function(){return JSON.stringify(ch(this))};
var dh=1;function eh(a){a=void 0===a?0:a;return 0==a?"client-screen-nonce":"client-screen-nonce."+a}
function fh(a){a=void 0===a?0:a;return 0==a?"ROOT_VE_TYPE":"ROOT_VE_TYPE."+a}
function gh(a){return Q(fh(void 0===a?0:a),void 0)}
y("yt_logging_screen.getRootVeType",gh,void 0);function hh(){var a=gh(0),b;a?b=new bh({veType:a,youtubeData:void 0}):b=null;return b}
function ih(){var a=Q("csn-to-ctt-auth-info");a||(a={},P("csn-to-ctt-auth-info",a));return a}
function jh(a){a=void 0===a?0:a;var b=Q(eh(a));if(!b&&!Q("USE_CSN_FALLBACK",!0))return null;b||0!=a||(R("kevlar_client_side_screens")||R("c3_client_side_screens")?b="UNDEFINED_CSN":b=Q("EVENT_ID"));return b?b:null}
y("yt_logging_screen.getCurrentCsn",jh,void 0);function kh(a,b,c){var d=ih();(c=jh(c))&&delete d[c];b&&(d[a]=b)}
function lh(a){return ih()[a]}
y("yt_logging_screen.getCttAuthInfo",lh,void 0);function mh(a,b,c,d){c=void 0===c?0:c;if(a!==Q(eh(c))||b!==Q(fh(c)))kh(a,d,c),P(eh(c),a),P(fh(c),b),0==c&&(b=function(){setTimeout(function(){a&&Og("foregroundHeartbeatScreenAssociated",{clientDocumentNonce:ah,clientScreenNonce:a},Yg)},0)},"requestAnimationFrame"in window?window.requestAnimationFrame(b):b())}
y("yt_logging_screen.setCurrentScreen",mh,void 0);function nh(a,b,c){b=void 0===b?{}:b;c=void 0===c?!1:c;var d=Q("EVENT_ID");d&&(b.ei||(b.ei=d));if(b){d=a;var e=void 0===e?!0:e;var f=Q("VALID_SESSION_TEMPDATA_DOMAINS",[]),g=J(L(3,window.location.href));g&&f.push(g);g=J(L(3,d));if(0<=Ma(f,g)||!g&&0==d.lastIndexOf("/",0))if(R("autoescape_tempdata_url")&&(f=document.createElement("a"),Lb(f,d),d=f.href),d){g=d.match(vc);d=g[5];f=g[6];g=g[7];var h="";d&&(h+=d);f&&(h+="?"+f);g&&(h+="#"+g);d=h;f=d.indexOf("#");if(d=0>f?d:d.substr(0,f))if(e&&!b.csn&&(b.itct||
b.ved)&&(b=Object.assign({csn:jh()},b)),k){var k=parseInt(k,10);isFinite(k)&&0<k&&(e=b,b="ST-"+Ob(d).toString(36),e=e?xc(e):"",Sg(b,e,k||5))}else k=b,e="ST-"+Ob(d).toString(36),k=k?xc(k):"",Sg(e,k,5)}}if(c)return!1;if((window.ytspf||{}).enabled)spf.navigate(a);else{var l=void 0===l?{}:l;var m=void 0===m?"":m;var p=void 0===p?window:p;c=p.location;a=yc(a,l)+m;a=a instanceof H?a:Eb(a);c.href=Cb(a)}return!0}
;function oh(a,b){this.version=a;this.args=b}
;function ph(a,b){this.topic=a;this.f=b}
ph.prototype.toString=function(){return this.topic};var qh=z("ytPubsub2Pubsub2Instance")||new O;O.prototype.subscribe=O.prototype.subscribe;O.prototype.unsubscribeByKey=O.prototype.N;O.prototype.publish=O.prototype.M;O.prototype.clear=O.prototype.clear;y("ytPubsub2Pubsub2Instance",qh,void 0);var rh=z("ytPubsub2Pubsub2SubscribedKeys")||{};y("ytPubsub2Pubsub2SubscribedKeys",rh,void 0);var sh=z("ytPubsub2Pubsub2TopicToKeys")||{};y("ytPubsub2Pubsub2TopicToKeys",sh,void 0);var th=z("ytPubsub2Pubsub2IsAsync")||{};y("ytPubsub2Pubsub2IsAsync",th,void 0);
y("ytPubsub2Pubsub2SkipSubKey",null,void 0);function uh(a,b){var c=vh();c&&c.publish.call(c,a.toString(),a,b)}
function wh(a){var b=xh,c=vh();if(!c)return 0;var d=c.subscribe(b.toString(),function(e,f){var g=z("ytPubsub2Pubsub2SkipSubKey");g&&g==d||(g=function(){if(rh[d])try{if(f&&b instanceof ph&&b!=e)try{var h=b.f,k=f;if(!k.args||!k.version)throw Error("yt.pubsub2.Data.deserialize(): serializedData is incomplete.");try{if(!h.H){var l=new h;h.H=l.version}var m=h.H}catch(p){}if(!m||k.version!=m)throw Error("yt.pubsub2.Data.deserialize(): serializedData version is incompatible.");try{f=Reflect.construct(h,
Sa(k.args))}catch(p){throw p.message="yt.pubsub2.Data.deserialize(): "+p.message,p;}}catch(p){throw p.message="yt.pubsub2.pubsub2 cross-binary conversion error for "+b.toString()+": "+p.message,p;}a.call(window,f)}catch(p){ue(p)}},th[b.toString()]?z("yt.scheduler.instance")?Mf(g):S(g,0):g())});
rh[d]=!0;sh[b.toString()]||(sh[b.toString()]=[]);sh[b.toString()].push(d);return d}
function yh(){var a=zh,b=wh(function(c){a.apply(void 0,arguments);Ah(b)});
return b}
function Ah(a){var b=vh();b&&("number"===typeof a&&(a=[a]),F(a,function(c){b.unsubscribeByKey(c);delete rh[c]}))}
function vh(){return z("ytPubsub2Pubsub2Instance")}
;function Bh(a){oh.call(this,1,arguments);this.csn=a}
r(Bh,oh);var xh=new ph("screen-created",Bh),Ch=[],Dh=0;function Eh(a,b,c){b={csn:a,parentVe:ch(b),childVes:Oa(c,function(e){return ch(e)})};
c=q(c);for(var d=c.next();!d.done;d=c.next())d=ch(d.value),(kb(d)||!d.trackingParams&&!d.veType)&&lf(Error("Child VE logged with no data"),"WARNING");c={da:lh(a),P:a};"UNDEFINED_CSN"==a?Fh("visualElementAttached",b,c):Og("visualElementAttached",b,Yg,c)}
function Fh(a,b,c){Ch.push({Na:a,payload:b,options:c});Dh||(Dh=yh())}
function zh(a){if(Ch){for(var b=q(Ch),c=b.next();!c.done;c=b.next())c=c.value,c.payload&&(c.payload.csn=a.csn,Og(c.Na,c.payload,null,c.options));Ch.length=0}Dh=0}
;function Gh(a){a=a||{};var b={},c={};this.url=a.url||"";this.args=a.args||nb(b);this.assets=a.assets||{};this.attrs=a.attrs||nb(c);this.fallback=a.fallback||null;this.fallbackMessage=a.fallbackMessage||null;this.html5=!!a.html5;this.disable=a.disable||{};this.loaded=!!a.loaded;this.messages=a.messages||{}}
Gh.prototype.clone=function(){var a=new Gh,b;for(b in this)if(this.hasOwnProperty(b)){var c=this[b];"object"==za(c)?a[b]=nb(c):a[b]=c}return a};function Hh(){M.call(this);this.f=[]}
r(Hh,M);Hh.prototype.o=function(){for(;this.f.length;){var a=this.f.pop();a.target.removeEventListener(a.name,a.ob)}M.prototype.o.call(this)};var Ih=/cssbin\/(?:debug-)?([a-zA-Z0-9_-]+?)(?:-2x|-web|-rtl|-vfl|.css)/;function Jh(a){a=a||"";if(window.spf){var b=a.match(Ih);spf.style.load(a,b?b[1]:"",void 0)}else Kh(a)}
function Kh(a){var b=Lh(a),c=document.getElementById(b),d=c&&qf(c,"loaded");d||c&&!d||(c=Mh(a,b,function(){qf(c,"loaded")||(of(c),zf(b),S(Ka(Af,b),0))}))}
function Mh(a,b,c){var d=document.createElement("link");d.id=b;d.onload=function(){c&&setTimeout(c,0)};
a=tc(a);d.rel="stylesheet";d.href=zb(a).toString();(document.getElementsByTagName("head")[0]||document.body).appendChild(d);return d}
function Lh(a){var b=pc(document,"A");Lb(b,new H(Ab,a));a=b.href.replace(/^[a-zA-Z]+:\/\//,"//");return"css-"+Ob(a)}
;function Nh(a,b,c,d){M.call(this);var e=this;this.m=this.X=a;this.U=b;this.w=!1;this.api={};this.V=this.D=null;this.F=new O;gd(this,Ka(hd,this.F));this.j={};this.R=this.W=this.h=this.ca=this.f=null;this.K=!1;this.l=this.A=null;this.Y={};this.ua=["onReady"];this.ba=null;this.ka=NaN;this.S={};this.i=d;Oh(this);this.Z("WATCH_LATER_VIDEO_ADDED",this.Ka.bind(this));this.Z("WATCH_LATER_VIDEO_REMOVED",this.La.bind(this));this.Z("onAdAnnounce",this.wa.bind(this));this.va=new Hh(this);gd(this,Ka(hd,this.va));
this.T=0;c?this.T=S(function(){e.loadNewVideoConfig(c)},0):d&&(Ph(this),Qh(this))}
r(Nh,M);n=Nh.prototype;n.getId=function(){return this.U};
n.loadNewVideoConfig=function(a){if(!this.g){this.T&&(T(this.T),this.T=0);a instanceof Gh||(a=new Gh(a));this.ca=a;this.f=a.clone();Ph(this);this.W||(this.W=Rh(this,this.f.args.jsapicallback||"onYouTubePlayerReady"));this.f.args.jsapicallback=null;if(a=this.f.attrs.width)this.m.style.width=Gc(Number(a)||a);if(a=this.f.attrs.height)this.m.style.height=Gc(Number(a)||a);Qh(this);this.w&&Sh(this)}};
function Ph(a){var b;a.i?b=a.i.rootElementId:b=a.f.attrs.id;a.h=b||a.h;"video-player"==a.h&&(a.h=a.U,a.f.attrs.id=a.U);a.m.id==a.h&&(a.h+="-player",a.f.attrs.id=a.h)}
n.za=function(){return this.ca};
function Sh(a){a.f&&!a.f.loaded&&(a.f.loaded=!0,"0"!=a.f.args.autoplay?a.api.loadVideoByPlayerVars(a.f.args):a.api.cueVideoByPlayerVars(a.f.args))}
function Th(a){var b=!0,c=Uh(a);c&&a.f&&(a=Vh(a),b=qf(c,"version")===a);return b&&!!z("yt.player.Application.create")}
function Qh(a){if(!a.g&&!a.K){var b=Th(a);if(b&&"html5"==(Uh(a)?"html5":null))a.R="html5",a.w||Wh(a);else if(Xh(a),a.R="html5",b&&a.l)a.X.appendChild(a.l),Wh(a);else{a.f&&(a.f.loaded=!0);var c=!1;a.A=function(){c=!0;if(a.i)var d=a.i.serializedExperimentFlags;else a.f&&a.f.args&&(d=a.f.args.fflags);d="true"==we(d||"").player_bootstrap_method?z("yt.player.Application.createAlternate")||z("yt.player.Application.create"):z("yt.player.Application.create");var e=a.f?a.f.clone():void 0;d(a.X,e,a.i);Wh(a)};
a.K=!0;b?a.A():(Ef(Vh(a),a.A),Jh(a.i?a.i.cssUrl:a.f.assets.css),Yh(a)&&!c&&y("yt.player.Application.create",null,void 0))}}}
function Uh(a){var b=lc(a.h);!b&&a.m&&a.m.querySelector&&(b=a.m.querySelector("#"+a.h));return b}
function Wh(a){if(!a.g){var b=Uh(a),c=!1;b&&b.getApiInterface&&b.getApiInterface()&&(c=!0);c?(a.K=!1,b.isNotServable&&a.f&&b.isNotServable(a.f.args.video_id)||Zh(a)):a.ka=S(function(){Wh(a)},50)}}
function Zh(a){Oh(a);a.w=!0;var b=Uh(a);b.addEventListener&&(a.D=$h(a,b,"addEventListener"));b.removeEventListener&&(a.V=$h(a,b,"removeEventListener"));var c=b.getApiInterface();c=c.concat(b.getInternalApiInterface());for(var d=0;d<c.length;d++){var e=c[d];a.api[e]||(a.api[e]=$h(a,b,e))}for(var f in a.j)a.D(f,a.j[f]);Sh(a);a.W&&a.W(a.api);a.F.M("onReady",a.api)}
function $h(a,b,c){var d=b[c];return function(){try{return a.ba=null,d.apply(b,arguments)}catch(e){"sendAbandonmentPing"!=c&&(e.params=c,a.ba=e,ve(e))}}}
function Oh(a){a.w=!1;if(a.V)for(var b in a.j)a.V(b,a.j[b]);for(var c in a.S)T(parseInt(c,10));a.S={};a.D=null;a.V=null;for(var d in a.api)a.api[d]=null;a.api.addEventListener=a.Z.bind(a);a.api.removeEventListener=a.Qa.bind(a);a.api.destroy=a.dispose.bind(a);a.api.getLastError=a.Aa.bind(a);a.api.getPlayerType=a.Ba.bind(a);a.api.getCurrentVideoConfig=a.za.bind(a);a.api.loadNewVideoConfig=a.loadNewVideoConfig.bind(a);a.api.isReady=a.Ja.bind(a)}
n.Ja=function(){return this.w};
n.Z=function(a,b){var c=this,d=Rh(this,b);if(d){if(!(0<=Ma(this.ua,a)||this.j[a])){var e=ai(this,a);this.D&&this.D(a,e)}this.F.subscribe(a,d);"onReady"==a&&this.w&&S(function(){d(c.api)},0)}};
n.Qa=function(a,b){if(!this.g){var c=Rh(this,b);c&&Ud(this.F,a,c)}};
function Rh(a,b){var c=b;if("string"==typeof b){if(a.Y[b])return a.Y[b];c=function(){var d=z(b);d&&d.apply(x,arguments)};
a.Y[b]=c}return c?c:null}
function ai(a,b){var c="ytPlayer"+b+a.U;a.j[b]=c;x[c]=function(d){var e=S(function(){if(!a.g){a.F.M(b,d);var f=a.S,g=String(e);g in f&&delete f[g]}},0);
lb(a.S,String(e))};
return c}
n.wa=function(a){zf("a11y-announce",a)};
n.Ka=function(a){zf("WATCH_LATER_VIDEO_ADDED",a)};
n.La=function(a){zf("WATCH_LATER_VIDEO_REMOVED",a)};
n.Ba=function(){return this.R||(Uh(this)?"html5":null)};
n.Aa=function(){return this.ba};
function Xh(a){a.cancel();Oh(a);a.R=null;a.f&&(a.f.loaded=!1);var b=Uh(a);b&&(Th(a)||!Yh(a)?a.l=b:(b&&b.destroy&&b.destroy(),a.l=null));for(a=a.X;b=a.firstChild;)a.removeChild(b)}
n.cancel=function(){this.A&&Kf(Vh(this),this.A);T(this.ka);this.K=!1};
n.o=function(){Xh(this);if(this.l&&this.f&&this.l.destroy)try{this.l.destroy()}catch(b){ue(b)}this.Y=null;for(var a in this.j)x[this.j[a]]=null;this.ca=this.f=this.api=null;delete this.X;delete this.m;M.prototype.o.call(this)};
function Yh(a){return a.f&&a.f.args&&a.f.args.fflags?-1!=a.f.args.fflags.indexOf("player_destroy_old_version=true"):!1}
function Vh(a){return a.i?a.i.jsUrl:a.f.assets.js}
;var bi={},ci="player_uid_"+(1E9*Math.random()>>>0);function di(a){delete bi[a.getId()]}
;function ei(a,b){oh.call(this,1,arguments)}
r(ei,oh);function fi(a,b){oh.call(this,1,arguments)}
r(fi,oh);var gi=new ph("aft-recorded",ei),hi=new ph("timing-sent",fi);var ii=window;function ji(){this.timing={};this.clearResourceTimings=function(){};
this.webkitClearResourceTimings=function(){};
this.mozClearResourceTimings=function(){};
this.msClearResourceTimings=function(){};
this.oClearResourceTimings=function(){}}
var X=ii.performance||ii.mozPerformance||ii.msPerformance||ii.webkitPerformance||new ji;var ki=!1;function li(){var a=mi(void 0);if(a.aft)return a.aft;for(var b=Q("TIMING_AFT_KEYS",["ol"]),c=b.length,d=0;d<c;d++){var e=a[b[d]];if(e)return e}return NaN}
function ni(a){var b;(b=z("ytcsi."+(a||"")+"data_"))||(b={tick:{},info:{}},La("ytcsi."+(a||"")+"data_",b));return b}
function oi(a){a=ni(a);a.info||(a.info={});return a.info}
function mi(a){a=ni(a);a.tick||(a.tick={});return a.tick}
function pi(a){var b=ni(a).nonce;b||(b=$g(),ni(a).nonce=b);return b}
function qi(){var a=mi(""),b=li();b&&!ki&&(uh(gi,new ei(Math.round(b-a._start),void 0)),ki=!0)}
;function ri(a,b){for(var c=[],d=1;d<arguments.length;++d)c[d-1]=arguments[d];if(!si(a)||c.some(function(e){return!si(e)}))throw Error("Only objects may be merged.");
c=q(c);for(d=c.next();!d.done;d=c.next())ti(a,d.value);return a}
function ti(a,b){for(var c in b)if(si(b[c])){if(c in a&&!si(a[c]))throw Error("Cannot merge an object into a non-object.");c in a||(a[c]={});ti(a[c],b[c])}else if(ui(b[c])){if(c in a&&!ui(a[c]))throw Error("Cannot merge an array into a non-array.");c in a||(a[c]=[]);vi(a[c],b[c])}else a[c]=b[c];return a}
function vi(a,b){for(var c=q(b),d=c.next();!d.done;d=c.next())d=d.value,si(d)?a.push(ti({},d)):ui(d)?a.push(vi([],d)):a.push(d);return a}
function si(a){return"object"===typeof a&&!Array.isArray(a)}
function ui(a){return"object"===typeof a&&Array.isArray(a)}
;function wi(){var a=z("ytcsi.debug");a||(a=[],y("ytcsi.debug",a,void 0),y("ytcsi.reference",{},void 0));return a}
function xi(a){a=a||"";var b=z("ytcsi.reference");b||(wi(),b=z("ytcsi.reference"));if(b[a])return b[a];var c=wi(),d={timerName:a,info:{},tick:{}};c.push(d);return b[a]=d}
;function yi(a,b,c){c=void 0===c?{}:c;var d=Yg;Q("ytLoggingEventsDefaultDisabled",!1)&&Yg==Yg&&(d=null);Og(a,b,d,c)}
;var zi=z("ytLoggingLatencyUsageStats_")||{};y("ytLoggingLatencyUsageStats_",zi,void 0);function Ai(){this.f=0}
function Bi(){Ai.f||(Ai.f=new Ai);return Ai.f}
Ai.prototype.tick=function(a,b,c){Ci(this,"tick_"+a+"_"+b)||yi("latencyActionTicked",{tickName:a,clientActionNonce:b},{timestamp:c})};
Ai.prototype.info=function(a,b){var c=Object.keys(a).join("");Ci(this,"info_"+c+"_"+b)||(a.clientActionNonce=b,yi("latencyActionInfo",a))};
function Ci(a,b){zi[b]=zi[b]||{count:0};var c=zi[b];c.count++;c.time=U();a.f||(a.f=Nf(function(){var d=U(),e;for(e in zi)zi[e]&&6E4<d-zi[e].time&&delete zi[e];a&&(a.f=0)},0,5E3));
return 5<c.count?(6===c.count&&1>1E5*Math.random()&&(c=new ef("CSI data exceeded logging limit with key",b),0===b.indexOf("info")?jf(c):hf(c)),!0):!1}
;var Y={},Di=(Y.ad_allowed="adTypesAllowed",Y.yt_abt="adBreakType",Y.ad_cpn="adClientPlaybackNonce",Y.ad_docid="adVideoId",Y.yt_ad_an="adNetworks",Y.ad_at="adType",Y.browse_id="browseId",Y.p="httpProtocol",Y.t="transportProtocol",Y.cpn="clientPlaybackNonce",Y.cseg="creatorInfo.creatorSegment",Y.csn="clientScreenNonce",Y.docid="videoId",Y.GetHome_rid="getHomeRequestId",Y.GetSearch_rid="getSearchRequestId",Y.GetPlayer_rid="getPlayerRequestId",Y.GetWatchNext_rid="getWatchNextRequestId",Y.GetBrowse_rid=
"getBrowseRequestId",Y.is_continuation="isContinuation",Y.is_nav="isNavigation",Y.b_p="kabukiInfo.browseParams",Y.is_prefetch="kabukiInfo.isPrefetch",Y.is_secondary_nav="kabukiInfo.isSecondaryNav",Y.prev_browse_id="kabukiInfo.prevBrowseId",Y.query_source="kabukiInfo.querySource",Y.voz_type="kabukiInfo.vozType",Y.yt_lt="loadType",Y.mver="creatorInfo.measurementVersion",Y.yt_ad="isMonetized",Y.nr="webInfo.navigationReason",Y.nrsu="navigationRequestedSameUrl",Y.ncnp="webInfo.nonPreloadedNodeCount",Y.prt=
"playbackRequiresTap",Y.plt="playerInfo.playbackType",Y.pis="playerInfo.playerInitializedState",Y.paused="playerInfo.isPausedOnLoad",Y.yt_pt="playerType",Y.fmt="playerInfo.itag",Y.yt_pl="watchInfo.isPlaylist",Y.yt_pre="playerInfo.preloadType",Y.yt_ad_pr="prerollAllowed",Y.pa="previousAction",Y.yt_red="isRedSubscriber",Y.rce="mwebInfo.responseContentEncoding",Y.scrh="screenHeight",Y.scrw="screenWidth",Y.st="serverTimeMs",Y.aq="tvInfo.appQuality",Y.br_trs="tvInfo.bedrockTriggerState",Y.kebqat="kabukiInfo.earlyBrowseRequestInfo.abandonmentType",
Y.kebqa="kabukiInfo.earlyBrowseRequestInfo.adopted",Y.label="tvInfo.label",Y.is_mdx="tvInfo.isMdx",Y.preloaded="tvInfo.isPreloaded",Y.upg_player_vis="playerInfo.visibilityState",Y.query="unpluggedInfo.query",Y.upg_chip_ids_string="unpluggedInfo.upgChipIdsString",Y.yt_vst="videoStreamType",Y.vph="viewportHeight",Y.vpw="viewportWidth",Y.yt_vis="isVisible",Y.rcl="mwebInfo.responseContentLength",Y.GetSettings_rid="mwebInfo.getSettingsRequestId",Y.GetTrending_rid="mwebInfo.getTrendingRequestId",Y.GetMusicSearchSuggestions_rid=
"musicInfo.getMusicSearchSuggestionsRequestId",Y),Ei="isContinuation isNavigation kabukiInfo.earlyBrowseRequestInfo.adopted kabukiInfo.isPrefetch kabukiInfo.isSecondaryNav isMonetized playerInfo.isPausedOnLoad prerollAllowed isRedSubscriber tvInfo.isMdx tvInfo.isPreloaded isVisible watchInfo.isPlaylist playbackRequiresTap".split(" "),Fi={},Gi=(Fi.mver="MEASUREMENT_VERSION_",Fi.pis="PLAYER_INITIALIZED_STATE_",Fi.yt_pt="LATENCY_PLAYER_",Fi.pa="LATENCY_ACTION_",Fi.yt_vst="VIDEO_STREAM_TYPE_",Fi),Hi=
"all_vc ap c cver cbrand cmodel cplatform ctheme ei l_an l_mm plid srt yt_fss yt_li vpst vpni2 vpil2 icrc icrt pa GetAccountOverview_rid GetHistory_rid cmt d_vpct d_vpnfi d_vpni nsru pc pfa pfeh pftr pnc prerender psc rc start tcrt tcrc ssr vpr vps yt_abt yt_fn yt_fs yt_pft yt_pre yt_pt yt_pvis ytu_pvis yt_ref yt_sts tds".split(" ");function Ii(a){return!!Q("FORCE_CSI_ON_GEL",!1)||R("csi_on_gel")||!!ni(a).useGel}
function Ji(a){a=ni(a);if(!("gel"in a))a.gel={gelTicks:{},gelInfos:{}};else if(a.gel){var b=a.gel;b.gelInfos||(b.gelInfos={});b.gelTicks||(b.gelTicks={})}return a.gel}
;function Ki(a,b,c){if(null!==b)if(oi(c)[a]=b,Ii(c)){var d=Ji(c);if(d.gelInfos)d.gelInfos["info_"+a]=!0;else{var e={};d.gelInfos=(e["info_"+a]=!0,e)}if(a in Di){d=Di[a];0<=Ma(Ei,d)&&(b=!!b);a in Gi&&"string"===typeof b&&(b=Gi[a]+b.toUpperCase());a=d.split(".");e=d={};for(var f=0;f<a.length-1;f++){var g=a[f];e[g]={};e=e[g]}e[a[a.length-1]]=b;b=ri({},d)}else 0<=Ma(Hi,a)||jf(new ef("Unknown label logged with GEL CSI",a)),b=void 0;b&&Ii(c)&&(a=xi(c||""),ri(a.info,b),a=Ji(c),"gelInfos"in a||(a.gelInfos=
{}),ri(a.gelInfos,b),c=pi(c),Bi().info(b,c))}else xi(c||"").info[a]=b}
if(R("overwrite_polyfill_on_logging_lib_loaded")){var Li=window;Li.ytcsi&&(Li.ytcsi.info=Ki)};A(X.clearResourceTimings||X.webkitClearResourceTimings||X.mozClearResourceTimings||X.msClearResourceTimings||X.oClearResourceTimings||xa,X);function Mi(a){return(0==a.search("cue")||0==a.search("load"))&&"loadModule"!=a}
function Ni(a,b,c){"string"===typeof a&&(a={mediaContentUrl:a,startSeconds:b,suggestedQuality:c});b=/\/([ve]|embed)\/([^#?]+)/.exec(a.mediaContentUrl);a.videoId=b&&b[2]?b[2]:null;return Oi(a)}
function Oi(a,b,c){if(Da(a)){b=["endSeconds","startSeconds","mediaContentUrl","suggestedQuality","videoId"];c={};for(var d=0;d<b.length;d++){var e=b[d];a[e]&&(c[e]=a[e])}return c}return{videoId:a,startSeconds:b,suggestedQuality:c}}
function Pi(a,b,c,d){if(Da(a)&&!Aa(a)){b="playlist list listType index startSeconds suggestedQuality".split(" ");c={};for(d=0;d<b.length;d++){var e=b[d];a[e]&&(c[e]=a[e])}return c}b={index:b,startSeconds:c,suggestedQuality:d};"string"===typeof a&&16==a.length?b.list="PL"+a:b.playlist=a;return b}
;function Qi(a){a=void 0===a?!1:a;M.call(this);this.f=new O(a);gd(this,Ka(hd,this.f))}
D(Qi,M);Qi.prototype.subscribe=function(a,b,c){return this.g?0:this.f.subscribe(a,b,c)};
Qi.prototype.j=function(a,b){this.g||this.f.M.apply(this.f,arguments)};function Ri(a,b,c){Qi.call(this);this.h=a;this.i=b;this.l=c}
r(Ri,Qi);function Si(a,b,c){if(!a.g){var d=a.h;d.g||a.i!=d.f||(a={id:a.l,command:b},c&&(a.data=c),d.f.postMessage(wd(a),d.i))}}
Ri.prototype.o=function(){this.i=this.h=null;Qi.prototype.o.call(this)};function Ti(a){M.call(this);this.f=a;this.f.subscribe("command",this.sa,this);this.h={};this.j=!1}
r(Ti,M);n=Ti.prototype;n.start=function(){this.j||this.g||(this.j=!0,Si(this.f,"RECEIVING"))};
n.sa=function(a,b,c){if(this.j&&!this.g){var d=b||{};switch(a){case "addEventListener":"string"===typeof d.event&&(a=d.event,a in this.h||(c=A(this.Sa,this,a),this.h[a]=c,this.addEventListener(a,c)));break;case "removeEventListener":"string"===typeof d.event&&Ui(this,d.event);break;default:this.i.isReady()&&this.i.isExternalMethodAvailable(a,c||null)&&(b=Vi(a,b||{}),c=this.i.handleExternalCall(a,b,c||null),(c=Wi(a,c))&&this.j&&!this.g&&Si(this.f,a,c))}}};
n.Sa=function(a,b){this.j&&!this.g&&Si(this.f,a,this.fa(a,b))};
n.fa=function(a,b){if(null!=b)return{value:b}};
function Ui(a,b){b in a.h&&(a.removeEventListener(b,a.h[b]),delete a.h[b])}
n.o=function(){var a=this.f;a.g||Ud(a.f,"command",this.sa,this);this.f=null;for(var b in this.h)Ui(this,b);M.prototype.o.call(this)};function Xi(a,b){Ti.call(this,b);this.i=a;this.start()}
r(Xi,Ti);Xi.prototype.addEventListener=function(a,b){this.i.addEventListener(a,b)};
Xi.prototype.removeEventListener=function(a,b){this.i.removeEventListener(a,b)};
function Vi(a,b){switch(a){case "loadVideoById":return b=Oi(b),[b];case "cueVideoById":return b=Oi(b),[b];case "loadVideoByPlayerVars":return[b];case "cueVideoByPlayerVars":return[b];case "loadPlaylist":return b=Pi(b),[b];case "cuePlaylist":return b=Pi(b),[b];case "seekTo":return[b.seconds,b.allowSeekAhead];case "playVideoAt":return[b.index];case "setVolume":return[b.volume];case "setPlaybackQuality":return[b.suggestedQuality];case "setPlaybackRate":return[b.suggestedRate];case "setLoop":return[b.loopPlaylists];
case "setShuffle":return[b.shufflePlaylist];case "getOptions":return[b.module];case "getOption":return[b.module,b.option];case "setOption":return[b.module,b.option,b.value];case "handleGlobalKeyDown":return[b.keyCode,b.shiftKey,b.ctrlKey,b.altKey,b.metaKey,b.key,b.code]}return[]}
function Wi(a,b){switch(a){case "isMuted":return{muted:b};case "getVolume":return{volume:b};case "getPlaybackRate":return{playbackRate:b};case "getAvailablePlaybackRates":return{availablePlaybackRates:b};case "getVideoLoadedFraction":return{videoLoadedFraction:b};case "getPlayerState":return{playerState:b};case "getCurrentTime":return{currentTime:b};case "getPlaybackQuality":return{playbackQuality:b};case "getAvailableQualityLevels":return{availableQualityLevels:b};case "getDuration":return{duration:b};
case "getVideoUrl":return{videoUrl:b};case "getVideoEmbedCode":return{videoEmbedCode:b};case "getPlaylist":return{playlist:b};case "getPlaylistIndex":return{playlistIndex:b};case "getOptions":return{options:b};case "getOption":return{option:b}}}
Xi.prototype.fa=function(a,b){switch(a){case "onReady":return;case "onStateChange":return{playerState:b};case "onPlaybackQualityChange":return{playbackQuality:b};case "onPlaybackRateChange":return{playbackRate:b};case "onError":return{errorCode:b}}return Ti.prototype.fa.call(this,a,b)};
Xi.prototype.o=function(){Ti.prototype.o.call(this);delete this.i};function Yi(a,b,c){M.call(this);var d=this;c=c||Q("POST_MESSAGE_ORIGIN",void 0)||window.document.location.protocol+"//"+window.document.location.hostname;this.h=b||null;this.w="*";this.i=c;this.sessionId=null;this.channel="widget";this.A=!!a;this.m=function(e){a:if(!("*"!=d.i&&e.origin!=d.i||d.h&&e.source!=d.h||"string"!==typeof e.data)){try{var f=JSON.parse(e.data)}catch(g){break a}if(!(null==f||d.A&&(d.sessionId&&d.sessionId!=f.id||d.channel&&d.channel!=f.channel))&&f)switch(f.event){case "listening":"null"!=
e.origin&&(d.i=d.w=e.origin);d.h=e.source;d.sessionId=f.id;d.f&&(d.f(),d.f=null);break;case "command":d.j&&(!d.l||0<=Ma(d.l,f.func))&&d.j(f.func,f.args,e.origin)}}};
this.l=this.f=this.j=null;window.addEventListener("message",this.m)}
r(Yi,M);Yi.prototype.sendMessage=function(a,b){var c=b||this.h;if(c){this.sessionId&&(a.id=this.sessionId);this.channel&&(a.channel=this.channel);try{var d=JSON.stringify(a);c.postMessage(d,this.w)}catch(e){ve(e)}}};
Yi.prototype.o=function(){window.removeEventListener("message",this.m);M.prototype.o.call(this)};function Zi(){var a=this.g=new Yi(!!Q("WIDGET_ID_ENFORCE")),b=A(this.Pa,this);a.j=b;a.l=null;this.g.channel="widget";if(a=Q("WIDGET_ID"))this.g.sessionId=a;this.i=[];this.l=!1;this.j={}}
n=Zi.prototype;n.Pa=function(a,b,c){"addEventListener"==a&&b?(a=b[0],this.j[a]||"onReady"==a||(this.addEventListener(a,$i(this,a)),this.j[a]=!0)):this.na(a,b,c)};
n.na=function(){};
function $i(a,b){return A(function(c){this.sendMessage(b,c)},a)}
n.addEventListener=function(){};
n.ya=function(){this.l=!0;this.sendMessage("initialDelivery",this.ga());this.sendMessage("onReady");F(this.i,this.ta,this);this.i=[]};
n.ga=function(){return null};
function aj(a,b){a.sendMessage("infoDelivery",b)}
n.ta=function(a){this.l?this.g.sendMessage(a):this.i.push(a)};
n.sendMessage=function(a,b){this.ta({event:a,info:void 0==b?null:b})};
n.dispose=function(){this.g=null};function bj(a){Zi.call(this);this.f=a;this.h=[];this.addEventListener("onReady",A(this.Ma,this));this.addEventListener("onVideoProgress",A(this.Wa,this));this.addEventListener("onVolumeChange",A(this.Xa,this));this.addEventListener("onApiChange",A(this.Ra,this));this.addEventListener("onPlaybackQualityChange",A(this.Ta,this));this.addEventListener("onPlaybackRateChange",A(this.Ua,this));this.addEventListener("onStateChange",A(this.Va,this));this.addEventListener("onWebglSettingsChanged",A(this.Ya,
this))}
r(bj,Zi);n=bj.prototype;n.na=function(a,b,c){if(this.f.isExternalMethodAvailable(a,c)){b=b||[];if(0<b.length&&Mi(a)){var d=b;if(Da(d[0])&&!Aa(d[0]))d=d[0];else{var e={};switch(a){case "loadVideoById":case "cueVideoById":e=Oi.apply(window,d);break;case "loadVideoByUrl":case "cueVideoByUrl":e=Ni.apply(window,d);break;case "loadPlaylist":case "cuePlaylist":e=Pi.apply(window,d)}d=e}b.length=1;b[0]=d}this.f.handleExternalCall(a,b,c);Mi(a)&&aj(this,this.ga())}};
n.Ma=function(){var a=A(this.ya,this);this.g.f=a};
n.addEventListener=function(a,b){this.h.push({eventType:a,listener:b});this.f.addEventListener(a,b)};
n.ga=function(){if(!this.f)return null;var a=this.f.getApiInterface();Ra(a,"getVideoData");for(var b={apiInterface:a},c=0,d=a.length;c<d;c++){var e=a[c];if(0==e.search("get")||0==e.search("is")){var f=0;0==e.search("get")?f=3:0==e.search("is")&&(f=2);f=e.charAt(f).toLowerCase()+e.substr(f+1);try{var g=this.f[e]();b[f]=g}catch(h){}}}b.videoData=this.f.getVideoData();b.currentTimeLastUpdated_=C()/1E3;return b};
n.Va=function(a){a={playerState:a,currentTime:this.f.getCurrentTime(),duration:this.f.getDuration(),videoData:this.f.getVideoData(),videoStartBytes:0,videoBytesTotal:this.f.getVideoBytesTotal(),videoLoadedFraction:this.f.getVideoLoadedFraction(),playbackQuality:this.f.getPlaybackQuality(),availableQualityLevels:this.f.getAvailableQualityLevels(),currentTimeLastUpdated_:C()/1E3,playbackRate:this.f.getPlaybackRate(),mediaReferenceTime:this.f.getMediaReferenceTime()};this.f.getVideoUrl&&(a.videoUrl=
this.f.getVideoUrl());this.f.getVideoContentRect&&(a.videoContentRect=this.f.getVideoContentRect());this.f.getProgressState&&(a.progressState=this.f.getProgressState());this.f.getPlaylist&&(a.playlist=this.f.getPlaylist());this.f.getPlaylistIndex&&(a.playlistIndex=this.f.getPlaylistIndex());this.f.getStoryboardFormat&&(a.storyboardFormat=this.f.getStoryboardFormat());aj(this,a)};
n.Ta=function(a){aj(this,{playbackQuality:a})};
n.Ua=function(a){aj(this,{playbackRate:a})};
n.Ra=function(){for(var a=this.f.getOptions(),b={namespaces:a},c=0,d=a.length;c<d;c++){var e=a[c],f=this.f.getOptions(e);b[e]={options:f};for(var g=0,h=f.length;g<h;g++){var k=f[g],l=this.f.getOption(e,k);b[e][k]=l}}this.sendMessage("apiInfoDelivery",b)};
n.Xa=function(){aj(this,{muted:this.f.isMuted(),volume:this.f.getVolume()})};
n.Wa=function(a){a={currentTime:a,videoBytesLoaded:this.f.getVideoBytesLoaded(),videoLoadedFraction:this.f.getVideoLoadedFraction(),currentTimeLastUpdated_:C()/1E3,playbackRate:this.f.getPlaybackRate(),mediaReferenceTime:this.f.getMediaReferenceTime()};this.f.getProgressState&&(a.progressState=this.f.getProgressState());aj(this,a)};
n.Ya=function(){var a={sphericalProperties:this.f.getSphericalProperties()};aj(this,a)};
n.dispose=function(){Zi.prototype.dispose.call(this);for(var a=0;a<this.h.length;a++){var b=this.h[a];this.f.removeEventListener(b.eventType,b.listener)}this.h=[]};function cj(a,b,c){M.call(this);this.f=a;this.i=c;this.j=V(window,"message",A(this.l,this));this.h=new Ri(this,a,b);gd(this,Ka(hd,this.h))}
r(cj,M);cj.prototype.l=function(a){var b;if(b=!this.g)if(b=a.origin==this.i)a:{b=this.f;do{b:{var c=a.source;do{if(c==b){c=!0;break b}if(c==c.parent)break;c=c.parent}while(null!=c);c=!1}if(c){b=!0;break a}b=b.opener}while(null!=b);b=!1}if(b&&(b=a.data,"string"===typeof b)){try{b=JSON.parse(b)}catch(d){return}b.command&&(c=this.h,c.g||c.j("command",b.command,b.data,a.origin))}};
cj.prototype.o=function(){kg(this.j);this.f=null;M.prototype.o.call(this)};function dj(){var a=nb(ej),b;return Jd(new N(function(c,d){a.onSuccess=function(e){Je(e)?c(e):d(new fj("Request failed, status="+(e&&"status"in e?e.status:-1),"net.badstatus",e))};
a.onError=function(e){d(new fj("Unknown request error","net.unknown",e))};
a.O=function(e){d(new fj("Request timed out","net.timeout",e))};
b=Te("//googleads.g.doubleclick.net/pagead/id",a)}),function(c){c instanceof Kd&&b.abort();
return Hd(c)})}
function fj(a,b){E.call(this,a+", errorCode="+b);this.errorCode=b;this.name="PromiseAjaxError"}
r(fj,E);function gj(){this.g=0;this.f=null}
gj.prototype.then=function(a,b,c){return 1===this.g&&a?(a=a.call(c,this.f),Cd(a)?a:hj(a)):2===this.g&&b?(a=b.call(c,this.f),Cd(a)?a:ij(a)):this};
gj.prototype.getValue=function(){return this.f};
gj.prototype.$goog_Thenable=!0;function ij(a){var b=new gj;a=void 0===a?null:a;b.g=2;b.f=void 0===a?null:a;return b}
function hj(a){var b=new gj;a=void 0===a?null:a;b.g=1;b.f=void 0===a?null:a;return b}
;function jj(a){E.call(this,a.message||a.description||a.name);this.isMissing=a instanceof kj;this.isTimeout=a instanceof fj&&"net.timeout"==a.errorCode;this.isCanceled=a instanceof Kd}
r(jj,E);jj.prototype.name="BiscottiError";function kj(){E.call(this,"Biscotti ID is missing from server")}
r(kj,E);kj.prototype.name="BiscottiMissingError";var ej={format:"RAW",method:"GET",timeout:5E3,withCredentials:!0},lj=null;function pe(){if("1"===hb(ne(),"args","privembed"))return Hd(Error("Biscotti ID is not available in private embed mode"));lj||(lj=Jd(dj().then(mj),function(a){return nj(2,a)}));
return lj}
function mj(a){a=a.responseText;if(0!=a.lastIndexOf(")]}'",0))throw new kj;a=JSON.parse(a.substr(4));if(1<(a.type||1))throw new kj;a=a.id;qe(a);lj=hj(a);oj(18E5,2);return a}
function nj(a,b){var c=new jj(b);qe("");lj=ij(c);0<a&&oj(12E4,a-1);throw c;}
function oj(a,b){S(function(){Jd(dj().then(mj,function(c){return nj(b,c)}),xa)},a)}
function pj(){try{var a=z("yt.ads.biscotti.getId_");return a?a():pe()}catch(b){return Hd(b)}}
;function qj(a){if("1"!==hb(ne(),"args","privembed")){a&&oe();try{pj().then(function(){},function(){}),S(qj,18E5)}catch(b){ue(b)}}}
;var Z=z("ytglobal.prefsUserPrefsPrefs_")||{};y("ytglobal.prefsUserPrefsPrefs_",Z,void 0);function rj(){this.f=Q("ALT_PREF_COOKIE_NAME","PREF");var a=fc.get(""+this.f,void 0);if(a){a=decodeURIComponent(a).split("&");for(var b=0;b<a.length;b++){var c=a[b].split("="),d=c[0];(c=c[1])&&(Z[d]=c.toString())}}}
n=rj.prototype;n.get=function(a,b){sj(a);tj(a);var c=void 0!==Z[a]?Z[a].toString():null;return null!=c?c:b?b:""};
n.set=function(a,b){sj(a);tj(a);if(null==b)throw Error("ExpectedNotNull");Z[a]=b.toString()};
n.remove=function(a){sj(a);tj(a);delete Z[a]};
n.save=function(){Sg(this.f,this.dump(),63072E3)};
n.clear=function(){for(var a in Z)delete Z[a]};
n.dump=function(){var a=[],b;for(b in Z)a.push(b+"="+encodeURIComponent(String(Z[b])));return a.join("&")};
function tj(a){if(/^f([1-9][0-9]*)$/.test(a))throw Error("ExpectedRegexMatch: "+a);}
function sj(a){if(!/^\w+$/.test(a))throw Error("ExpectedRegexMismatch: "+a);}
function uj(a){a=void 0!==Z[a]?Z[a].toString():null;return null!=a&&/^[A-Fa-f0-9]+$/.test(a)?parseInt(a,16):null}
ya(rj);var vj=null,wj=null,xj=null,yj={};function zj(a){var b=a.id;a=a.ve_type;var c=dh++;a=new bh({veType:a,veCounter:c,elementIndex:void 0,dataElement:void 0,youtubeData:void 0});yj[b]=a;b=jh();c=hh();b&&c&&Eh(b,c,[a])}
function Aj(a){var b=a.csn;a=a.root_ve_type;if(b&&a&&(mh(b,a),a=hh()))for(var c in yj){var d=yj[c];d&&Eh(b,a,[d])}}
function Bj(a){yj[a.id]=new bh({trackingParams:a.tracking_params})}
function Cj(a){var b=jh();a=yj[a.id];if(b&&a){a={csn:b,ve:ch(a),gestureType:"INTERACTION_LOGGING_GESTURE_TYPE_GENERIC_CLICK"};var c={da:lh(b),P:b};"UNDEFINED_CSN"==b?Fh("visualElementGestured",a,c):Og("visualElementGestured",a,Yg,c)}}
function Dj(a){a=a.ids;var b=jh();if(b)for(var c=0;c<a.length;c++){var d=yj[a[c]];if(d){var e=b;d={csn:e,ve:ch(d),eventType:1};var f={da:lh(e),P:e};"UNDEFINED_CSN"==e?Fh("visualElementShown",d,f):Og("visualElementShown",d,Yg,f)}}}
;y("yt.setConfig",P,void 0);y("yt.config.set",P,void 0);y("yt.setMsg",nf,void 0);y("yt.msgs.set",nf,void 0);y("yt.logging.errors.log",lf,void 0);
y("writeEmbed",function(){var a=Q("PLAYER_CONFIG",void 0);qj(!0);"gvn"==a.args.ps&&(document.body.style.backgroundColor="transparent");var b=document.referrer,c=Q("POST_MESSAGE_ORIGIN");window!=window.top&&b&&b!=document.URL&&(a.args.loaderUrl=b);Q("LIGHTWEIGHT_AUTOPLAY")&&(a.args.autoplay="1");b="player";var d=void 0===d?!0:d;b="string"===typeof b?lc(b):b;var e=ci+"_"+Ea(b),f=bi[e];f&&d?a&&a.args&&a.args.fflags&&a.args.fflags.includes("web_player_remove_playerproxy=true")?f.api.loadVideoByPlayerVars(a.args||
null):f.loadNewVideoConfig(a):(f=new Nh(b,e,a,void 0),bi[e]=f,zf("player-added",f.api),gd(f,Ka(di,f)));a=f.api;vj=a;a.addEventListener("onScreenChanged",Aj);a.addEventListener("onLogClientVeCreated",zj);a.addEventListener("onLogServerVeCreated",Bj);a.addEventListener("onLogVeClicked",Cj);a.addEventListener("onLogVesShown",Dj);d=Q("POST_MESSAGE_ID","player");Q("ENABLE_JS_API")?xj=new bj(a):Q("ENABLE_POST_API")&&"string"===typeof d&&"string"===typeof c&&(wj=new cj(window.parent,d,c),xj=new Xi(a,wj.h));
c=Q("BG_P",void 0);ag(c)&&(Q("BG_I")||Q("BG_IU"))&&(Xf=!0,Wf.initialize(Q("BG_I",null),Q("BG_IU",null),c,$f,void 0));Rf()},void 0);
y("yt.www.watch.ads.restrictioncookie.spr",function(a){af(a+"mac_204?action_fcts=1");return!0},void 0);
var Ej=te(function(){var a=mi(void 0),b;(b=!R("use_first_tick"))||(b=!("ol"in mi(void 0)));if(b&&(b="ol",X.mark&&(0==b.lastIndexOf("mark_",0)||(b="mark_"+b),X.mark(b)),b=U(),a.ol=b,a=Ji(void 0),a.gelTicks&&(a.gelTicks.tick_ol=!0),U(),Ii(void 0)?(xi("").tick.ol=U(),a=pi(void 0),Bi().tick("ol",a,void 0),qi(),a=!0):a=!1,!a)){if(!z("yt.timing.pingSent_")&&(b=Q("TIMING_ACTION",void 0),a=mi(void 0),z("ytglobal.timingready_")&&b&&a._start&&li())){qi();b=!0;var c=Q("TIMING_WAIT",[]);if(c.length)for(var d=
0,e=c.length;d<e;++d)if(!(c[d]in a)){b=!1;break}if(b&&!Ii(void 0)){d=mi(void 0);c=oi(void 0);e=d._start;var f=Q("CSI_SERVICE_NAME","youtube");b={v:2,s:f,action:Q("TIMING_ACTION",void 0)};a=c.srt;void 0!==d.srt&&delete c.srt;if(c.h5jse){var g=window.location.protocol+z("ytplayer.config.assets.js");(g=X.getEntriesByName?X.getEntriesByName(g)[0]:void 0)?c.h5jse=Math.round(c.h5jse-g.responseEnd):delete c.h5jse}d.aft=li();var h=mi(void 0);g=h.pbr;var k=h.vc;h=h.pbs;g&&k&&h&&g<k&&k<h&&oi(void 0).yt_pvis&&
"youtube"==f&&(Ki("yt_lt","hot_bg",void 0),f=d.vc,g=d.pbs,delete d.aft,c.aft=Math.round(g-f));for(var l in c)"_"!=l.charAt(0)&&(b[l]=c[l]);d.ps=U();l={};f=[];for(var m in d)"_"!=m.charAt(0)&&(g=Math.round(d[m]-e),l[m]=g,f.push(m+"."+g));b.rt=f.join(",");(m=z("ytdebug.logTiming"))&&m(b,l);m=!!c.ap;R("debug_csi_data")&&(c=z("yt.timing.csiData"),c||(c=[],La("yt.timing.csiData",c)),c.push({page:location.href,time:new Date,args:b}));c="";for(var p in b)b.hasOwnProperty(p)&&(c+="&"+p+"="+b[p]);p="/csi_204?"+
c.substring(1);if(window.navigator&&window.navigator.sendBeacon&&m){var v=void 0===v?"":v;df(p,v)||af(p,void 0,void 0,void 0,v)}else af(p);y("yt.timing.pingSent_",!0,void 0);uh(hi,new fi(l.aft+(a||0),void 0))}}xi("").tick.ol=U()}v=rj.getInstance();m=!!((uj("f"+(Math.floor(119/31)+1))||0)&67108864);p=1<window.devicePixelRatio;document.body&&ld(document.body,"exp-invert-logo")&&(p&&!ld(document.body,"inverted-hdpi")?(l=document.body,l.classList?l.classList.add("inverted-hdpi"):ld(l,"inverted-hdpi")||
(a=jd(l),kd(l,a+(0<a.length?" inverted-hdpi":"inverted-hdpi")))):!p&&ld(document.body,"inverted-hdpi")&&md());m!=p&&(m="f"+(Math.floor(119/31)+1),l=uj(m)||0,l=p?l|67108864:l&-67108865,0==l?delete Z[m]:(p=l.toString(16),Z[m]=p.toString()),v.save())}),Fj=te(function(){var a=vj;
a&&a.sendAbandonmentPing&&a.sendAbandonmentPing();Q("PL_ATT")&&Wf.dispose();a=0;for(var b=Pf.length;a<b;a++){var c=Pf[a];if(!isNaN(c)){var d=z("yt.scheduler.instance.cancelJob");d?d(c):T(c)}}Pf.length=0;Jf("//static.doubleclick.net/instream/ad_status.js");Qf=!1;P("DCLKSTAT",0);id(xj,wj);if(a=vj)a.removeEventListener("onScreenChanged",Aj),a.removeEventListener("onLogClientVeCreated",zj),a.removeEventListener("onLogServerVeCreated",Bj),a.removeEventListener("onLogVeClicked",Cj),a.removeEventListener("onLogVesShown",
Dj),a.destroy();yj={}});
window.addEventListener?(window.addEventListener("load",Ej),window.addEventListener("unload",Fj)):window.attachEvent&&(window.attachEvent("onload",Ej),window.attachEvent("onunload",Fj));La("yt.abuse.player.botguardInitialized",z("yt.abuse.player.botguardInitialized")||bg);La("yt.abuse.player.invokeBotguard",z("yt.abuse.player.invokeBotguard")||cg);La("yt.abuse.dclkstatus.checkDclkStatus",z("yt.abuse.dclkstatus.checkDclkStatus")||Sf);
La("yt.player.exports.navigate",z("yt.player.exports.navigate")||nh);La("yt.util.activity.init",z("yt.util.activity.init")||og);La("yt.util.activity.getTimeSinceActive",z("yt.util.activity.getTimeSinceActive")||rg);La("yt.util.activity.setTimestamp",z("yt.util.activity.setTimestamp")||pg);}).call(this);
