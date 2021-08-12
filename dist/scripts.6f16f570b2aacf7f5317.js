"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};
//! annyang
//! version : 2.6.0
//! author  : Tal Ater @TalAter
//! license : MIT
//! https://www.TalAter.com/annyang/
!function(e,n){"function"==typeof define&&define.amd?define([],function(){return e.annyang=n(e)}):"object"===("undefined"==typeof module?"undefined":_typeof(module))&&module.exports?module.exports=n(e):e.annyang=n(e)}("undefined"!=typeof window?window:void 0,function(e,n){var t,o=e.SpeechRecognition||e.webkitSpeechRecognition||e.mozSpeechRecognition||e.msSpeechRecognition||e.oSpeechRecognition;if(!o)return null;var r,i,a=[],c={start:[],error:[],end:[],soundstart:[],result:[],resultMatch:[],resultNoMatch:[],errorNetwork:[],errorPermissionBlocked:[],errorPermissionDenied:[]},s=0,u=0,f=!1,l="font-weight: bold; color: #00f;",d=!1,p=!1,g=/\s*\((.*?)\)\s*/g,m=/(\(\?:[^)]+\))\?/g,h=/(\(\?)?:\w+/g,y=/\*\w+/g,b=/[\-{}\[\]+?.,\\\^$|#]/g,v=function(e){return e=e.replace(b,"\\$&").replace(g,"(?:$1)?").replace(h,function(e,n){return n?e:"([^\\s]+)"}).replace(y,"(.*?)").replace(m,"\\s*$1?\\s*"),new RegExp("^"+e+"$","i")},w=function(e){for(var n=arguments.length,t=Array(n>1?n-1:0),o=1;o<n;o++)t[o-1]=arguments[o];e.forEach(function(e){e.callback.apply(e.context,t)})},S=function(){return r!==n},k=function(e,n){-1!==e.indexOf("%c")||n?console.log(e,n||l):console.log(e)},x=function(){S()||t.init({},!1)},R=function(e,n,t){a.push({command:e,callback:n,originalPhrase:t}),f&&k("Command successfully loaded: %c"+t,l)},P=function(e){w(c.result,e);for(var n,t=0;t<e.length;t++){n=e[t].trim(),f&&k("Speech recognized: %c"+n,l);for(var o=0,r=a.length;o<r;o++){var i=a[o],s=i.command.exec(n);if(s){var u=s.slice(1);return f&&(k("command matched: %c"+i.originalPhrase,l),u.length&&k("with parameters",u)),i.callback.apply(this,u),void w(c.resultMatch,n,i.originalPhrase,e)}}}w(c.resultNoMatch,e)};return t={init:function(l){var g=!(arguments.length>1&&arguments[1]!==n)||arguments[1];r&&r.abort&&r.abort(),(r=new o).maxAlternatives=5,r.continuous="http:"===e.location.protocol,r.lang="en-US",r.onstart=function(){p=!0,w(c.start)},r.onsoundstart=function(){w(c.soundstart)},r.onerror=function(e){switch(w(c.error,e),e.error){case"network":w(c.errorNetwork,e);break;case"not-allowed":case"service-not-allowed":i=!1,(new Date).getTime()-s<200?w(c.errorPermissionBlocked,e):w(c.errorPermissionDenied,e)}},r.onend=function(){if(p=!1,w(c.end),i){var e=(new Date).getTime()-s;(u+=1)%10==0&&f&&k("Speech Recognition is repeatedly stopping and starting. See http://is.gd/annyang_restarts for tips."),e<1e3?setTimeout(function(){t.start({paused:d})},1e3-e):t.start({paused:d})}},r.onresult=function(e){if(d)return f&&k("Speech heard, but annyang is paused"),!1;for(var n=e.results[e.resultIndex],t=[],o=0;o<n.length;o++)t[o]=n[o].transcript;P(t)},g&&(a=[]),l.length&&this.addCommands(l)},start:function(e){x(),d=(e=e||{}).paused!==n&&!!e.paused,i=e.autoRestart===n||!!e.autoRestart,e.continuous!==n&&(r.continuous=!!e.continuous),s=(new Date).getTime();try{r.start()}catch(e){f&&k(e.message)}},abort:function(){i=!1,u=0,S()&&r.abort()},pause:function(){d=!0},resume:function(){t.start()},debug:function(){var e=!(arguments.length>0&&arguments[0]!==n)||arguments[0];f=!!e},setLanguage:function(e){x(),r.lang=e},addCommands:function(n){var t;for(var o in x(),n)if(n.hasOwnProperty(o))if("function"==typeof(t=e[n[o]]||n[o]))R(v(o),t,o);else{if(!("object"===(void 0===t?"undefined":_typeof(t))&&t.regexp instanceof RegExp)){f&&k("Can not register command: %c"+o,l);continue}R(new RegExp(t.regexp.source,"i"),t.callback,o)}},removeCommands:function(e){e===n?a=[]:(e=Array.isArray(e)?e:[e],a=a.filter(function(n){for(var t=0;t<e.length;t++)if(e[t]===n.originalPhrase)return!1;return!0}))},addCallback:function(t,o,r){var i=e[o]||o;"function"==typeof i&&c[t]!==n&&c[t].push({callback:i,context:r||this})},removeCallback:function(e,t){var o=function(e){return e.callback!==t};for(var r in c)c.hasOwnProperty(r)&&(e!==n&&e!==r||(c[r]=t===n?[]:c[r].filter(o)))},isListening:function(){return p&&!d},getSpeechRecognizer:function(){return r},trigger:function(e){return t.isListening()?(Array.isArray(e)||(e=[e]),void P(e)):void(f&&k(p?"Speech heard, but annyang is paused":"Cannot trigger while annyang is aborted"))}}});