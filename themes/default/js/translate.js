jQuery.noConflict();

//jQuery Translate plugin and related components

/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};


//jQuery Translate plugin and related components

/*
 * jQuery nodesContainingText plugin
 * Version: 1.1.2
 * http://code.google.com/p/jquery-translate/
 * Copyright (c) 2009 Balazs Endresz (balazs.endresz@gmail.com)
 * Dual licensed under the MIT and GPL licenses.
 */
(function(b){function a(){}a.prototype={init:function(e,d){this.textArray=[];this.elements=[];this.options=d;this.jquery=e;this.n=-1;if(d.async===true){d.async=2}if(d.not){e=e.not(d.not);e=e.add(e.find("*").not(d.not)).not(b(d.not).find("*"))}else{e=e.add(e.find("*"))}this.jq=e;this.jql=this.jq.length;return this.process()},process:function(){this.n++;var i=this,d=this.options,p="",h=false,g=false,f=this.jq[this.n],k,m,j;if(this.n===this.jql){j=this.jquery.pushStack(this.elements,"nodesContainingText");d.complete.call(j,j,this.textArray);if(d.returnAll===false&&d.walk===false){return this.jquery}return j}if(!f){return this.process()}k=b(f);var n=f.nodeName.toUpperCase(),l=n==="INPUT"&&b.attr(f,"type").toLowerCase();if(({SCRIPT:1,NOSCRIPT:1,STYLE:1,OBJECT:1,IFRAME:1})[n]){return this.process()
}if(typeof d.subject==="string"){p=k.attr(d.subject)}else{if(d.altAndVal&&(n==="IMG"||l==="image")){p=k.attr("alt")}else{if(d.altAndVal&&({text:1,button:1,submit:1})[l]){p=k.val()}else{if(n==="TEXTAREA"){p=k.val()}else{m=f.firstChild;if(d.walk!==true){g=true}else{while(m){if(m.nodeType==1){g=true;break}m=m.nextSibling}}if(!g){p=k.text()}else{if(d.walk!==true){h=true}m=f.firstChild;while(m){if(m.nodeType==3&&m.nodeValue.match(/\S/)!==null){if(m.nodeValue.match(/<![ \r\n\t]*(--([^\-]|[\r\n]|-[^\-])*--[ \r\n\t]*)>/)!==null){if(m.nodeValue.match(/(\S+(?=.*<))|(>(?=.*\S+))/)!==null){h=true;break}}else{h=true;break}}m=m.nextSibling}if(h){p=k.html();p=d.stripScripts?p.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi,""):p;this.jq=this.jq.not(k.find("*"))}}}}}}if(!p){return this.process()}this.elements.push(f);this.textArray.push(p);d.each.call(f,this.elements.length-1,f,p);if(d.async){setTimeout(function(){i.process()},d.async);return this.jquery}else{return this.process()}}};var c={not:"",async:false,each:function(){},complete:function(){},comments:false,returnAll:true,walk:true,altAndVal:false,subject:true,stripScripts:true};
b.fn.nodesContainingText=function(d){d=b.extend({},c,b.fn.nodesContainingText.defaults,d);return new a().init(this,d)};b.fn.nodesContainingText.defaults=c})(jQuery);
/*
 * jQuery Translate plugin
 * Version: 1.4.4
 * http://code.google.com/p/jquery-translate/
 * Copyright (c) 2009 Balazs Endresz (balazs.endresz@gmail.com)
 * Dual licensed under the MIT and GPL licenses.
 * This plugin uses the 'Google AJAX Language API' (http://code.google.com/apis/ajaxlanguage/)
 * You can read the terms of use at http://code.google.com/apis/ajaxlanguage/terms.html
 */
(function(c){function p(){}var d=true,g=false,e,u="".replace,v=String,k=Function,t=Object,n,l,f,q={},b,j=[],h={from:"",to:"",start:p,error:p,each:p,complete:p,onTimeout:p,timeout:0,stripComments:d,stripWhitespace:d,stripScripts:d,separators:/\.\?\!;:/,limit:1750,walk:d,returnAll:g,replace:d,rebind:d,data:d,setLangAttr:g,subject:d,not:"",altAndVal:d,async:g,toggle:g,fromOriginal:d,parallel:false};function s(){c.translate.GL=n=google.language;c.translate.GLL=l=n.Languages;f=c.translate.toLanguageCode;c.each(l,function(y,z){q[z.toUpperCase()]=y});c.translate.isReady=d;var x;while((x=j.shift())){x()
}}function i(z,y){var x={};c.each(z,function(A,B){if(y(B,A)===d){x[A]=B}});return x}function w(y,z,x){return function(){return y.apply(z===d?arguments[0]:z,x||arguments)}}function r(x){return x!==e}function o(y,B,A){var x,C={},z=c.grep(y,r);c.each(B,function(D,E){var F=c.grep(E[0],function(H,G){return r(z[G])&&z[G].constructor===H}).length;if(F===z.length&&F===E[0].length&&(x=d)){c.each(E[1],function(G,H){C[H]=z[G]});return g}});if(!x){throw A}return C}function m(A,z){var x=o(A,c.translate.overload,"jQuery.translate: Invalid arguments"),y=x.options||{};delete x.options;y=c.extend({},h,z,c.extend(y,x));if(y.fromOriginal){y.toggle=d}if(y.toggle){y.data=d}if(y.async===d){y.async=2}return y}function a(){this.extend(c.translate);delete this.defaults;delete this.fn}a.prototype={version:"1.4.4",_init:function(z,C){var B=C.separators.source||C.separators,y=this.isString=typeof z==="string",x=0,A;c.each(["stripComments","stripScripts","stripWhitespace"],function(E,D){var F=c.translate[D];if(C[D]){z=y?F(z):c.map(z,F)
}});this.rawSource="<div>"+(y?z:z.join("</div><div>"))+"</div>";this._m3=new RegExp("["+B+"](?![^"+B+"]*["+B+"])");this.options=C;this.from=C.from=f(C.from)||"";this.to=C.to=f(C.to)||"";this.source=z;this.rawTranslation="";this.translation=[];this.i=0;this.stopped=g;this.elements=C.nodes;this._i=-1;this.rawSources=[];while(d){A=this.truncate(this.rawSource.substr(x),C.limit);if(!A){break}this.rawSources.push(A);x+=A.length}this.queue=new Array(this.rawSources.length);this.done=0;C.start.call(this,z,C.from,C.to,C);if(C.timeout){this.timeout=setTimeout(w(C.onTimeout,this,[z,C.from,C.to,C]),C.timeout)}(C.toggle&&C.nodes)?(C.textNodes?this._toggleTextNodes():this._toggle()):this._process()},_process:function(){if(this.stopped){return}var x=this.options,E=this.rawTranslation.length,I,J,G,F;var H=this;while((I=this.rawTranslation.lastIndexOf("</div>",E))>-1){E=I-1;J=this.rawTranslation.substr(0,E+1);G=J.match(/<div[> ]/gi);F=J.match(/<\/div>/gi);G=G?G.length:0;F=F?F.length:0;if(G!==F+1){continue
}var A=c(this.rawTranslation.substr(0,E+7)),C=A.length,B=this.i;if(B===C){break}A.slice(B,C).each(w(function(L,O){if(this.stopped){return g}var N=c.trim(c(O).html()),M=B+L,P=this.source,Q=!this.from&&this.detectedSourceLanguage||this.from;this.translation[M]=N;this.isString?this.translation=N:P=this.source[M];x.each.call(this,M,N,P,Q,this.to,x);this.i++},this));break}if(this.rawSources.length-1==this._i){this._complete()}var z=w(this._translate,this);if(x.parallel){if(this._i<0){if(!x.parallel){c.each(this.rawSources,z)}else{var D=0,y=this.rawSources.length;function K(){z();if(D<y){setTimeout(K,x.parallel)}}K()}}}else{z()}},_translate:function(){this._i++;var x=this._i,y=this.rawSourceSub=this.rawSources[x];if(!y){return}n.translate(y,this.from,this.to,w(function(z){if(z.error){return this.options.error.call(this,z.error,this.rawSourceSub,this.from,this.to,this.options)}this.queue[x]=z.translation||this.rawSourceSub;this.detectedSourceLanguage=z.detectedSourceLanguage;this._check()},this))
},_check:function(){if(!this.options.parallel){this.rawTranslation+=this.queue[this._i];this._process();return}var x=0;jQuery.each(this.queue,function(z,A){if(A!=e){x=z}else{return false}});if((x>this.done)||(x===this.queue.length-1)){for(var y=0;y<=x;y++){this.rawTranslation+=this.queue[y]}this._process()}this.done=x},_complete:function(){clearTimeout(this.timeout);this.options.complete.call(this,this.translation,this.source,!this.from&&this.detectedSourceLanguage||this.from,this.to,this.options)},stop:function(){if(this.stopped){return this}this.stopped=d;this.options.error.call(this,{message:"stopped"});return this}};c.translate=function(z,x){if(z==e){return new a()}if(c.isFunction(z)){return c.translate.ready(z,x)}var A=new a();var y=[].slice.call(arguments,0);y.shift();return c.translate.ready(w(A._init,A,[z,m(y,c.translate.defaults)]),g,A)};c.translate.fn=c.translate.prototype=a.prototype;c.translate.fn.extend=c.translate.extend=c.extend;c.translate.extend({_bind:w,_filter:i,_validate:o,_getOpt:m,_defaults:h,defaults:c.extend({},h),capitalize:function(x){return x.charAt(0).toUpperCase()+x.substr(1).toLowerCase()
},truncate:function(D,y){var z,G,E,C,B,F,x=encodeURIComponent(D);for(z=0;z<10;z++){try{F=decodeURIComponent(x.substr(0,y-z))}catch(A){continue}if(F){break}}return(!(G=/<(?![^<]*>)/.exec(F)))?((!(E=/>\s*$/.exec(F)))?((C=this._m3.exec(F))?((B=/>(?![^>]*<)/.exec(F))?(C.index>B.index?F.substring(0,C.index+1):F.substring(0,B.index+1)):F.substring(0,C.index+1)):F):F):F.substring(0,G.index)},getLanguages:function(E,D){if(E==e||(D==e&&!E)){return l}var B={},A=typeof E,z=D?c.translate.getLanguages(E):l,F=(A==="object"||A==="function")?E:D;if(F){if(F.call){B=i(z,F)}else{for(var C=0,y=F.length,x;C<y;C++){x=c.translate.toLanguage(F[C]);if(z[x]!=e){B[x]=z[x]}}}}else{B=i(l,n.isTranslatable)}return B},toLanguage:function(y,A){var z=y.toUpperCase();var x=q[z]||(l[z]?z:e)||q[(c.translate.languageCodeMap[y.toLowerCase()]||"").toUpperCase()];return x==e?e:A==="lowercase"?x.toLowerCase():A==="capitalize"?c.translate.capitalize(x):x},toLanguageCode:function(x){return l[x]||l[c.translate.toLanguage(x)]||c.translate.languageCodeMap[x.toLowerCase()]
},same:function(y,x){return y===x||f(y)===f(x)},isTranslatable:function(x){return n.isTranslatable(f(x))},languageCodeMap:{pt:"pt-PT",he:"iw",zlm:"ms","zh-hans":"zh-CN","zh-hant":"zh-TW"},isRtl:{ar:d,iw:d,fa:d,ur:d,yi:d},getBranding:function(){return c(n.getBranding.apply(n,arguments))},load:function(y,x){b=d;function z(){google.load("language",x||"1",{callback:s})}if(typeof google!=="undefined"&&google.load){z()}else{c.getScript("http://www.google.com/jsapi?"+(y?"key="+y:""),z)}return c.translate},ready:function(x,z,y){c.translate.isReady?x():j.push(x);if(!b&&!z){c.translate.load()}return y||c.translate},isReady:g,overload:[[[],[]],[[v,v,t],["from","to","options"]],[[v,t],["to","options"]],[[t],["options"]],[[v,v],["from","to"]],[[v],["to"]],[[v,v,k],["from","to","complete"]],[[v,k],["to","complete"]]],stripScripts:w(u,d,[/<script[^>]*>([\s\S]*?)<\/script>/gi,""]),stripWhitespace:w(u,d,[/\s\s+/g," "]),stripComments:w(u,d,[/<![ \r\n\t]*(--([^\-]|[\r\n]|-[^\-])*--[ \r\n\t]*)>/g,""])})})(jQuery);

(function(f){var e=true,a={text:e,button:e,submit:e},b={SCRIPT:e,NOSCRIPT:e,STYLE:e,OBJECT:e,IFRAME:e},d=f([]);d.length=1;function c(i,h){var j=i.css("text-align");i.css("direction",h);if(j==="right"){i.css("text-align","left")}if(j==="left"){i.css("text-align","right")}}function g(i,j){var k=i.nodeName.toUpperCase(),h=k==="INPUT"&&f.attr(i,"type").toLowerCase();j=j||{altAndVal:e,subject:e};return typeof j.subject==="string"?j.subject:j.altAndVal&&(k==="IMG"||h==="image")?"alt":j.altAndVal&&a[h]?"$val":k==="TEXTAREA"?"$val":"$html"}f.translate.fn._toggle=function(){var i=this.options,j=i.to,h;this.elements.each(f.translate._bind(function(k,l){this.i=k;var n=f(l),m=f.translate.getData(n,j,i);if(!m){return !(h=e)}this.translation.push(m);i.each.call(this,k,l,m,this.source[k],this.from,j,i)},this));!h?this._complete():this._process()};f.translate.extend({_getType:g,each:function(j,l,h,k,p,n,m){d[0]=l;
f.translate.setData(d,n,h,p,k,m);f.translate.replace(d,h,n,m);f.translate.setLangAttr(d,n,m)},getData:function(j,l,k){var h=j[0]||j,i=f.data(h,"translation");return i&&i[l]&&i[l][g(h,k)]},setData:function(k,m,p,n,q,h){if(h&&!h.data){return}var i=k[0]||k,l=g(i,h),j=f.data(i,"translation");j=j||f.data(i,"translation",{});(j[n]=j[n]||{})[l]=q;(j[m]=j[m]||{})[l]=p},replace:function(l,s,r,j){if(j&&!j.replace){return}if(j&&typeof j.subject==="string"){return l.attr(j.subject,s)}var k=l[0]||l,p=k.nodeName.toUpperCase(),n=p==="INPUT"&&f.attr(k,"type").toLowerCase(),m=f.translate.isRtl,i=f.data(k,"lang");if(i===r){return}if(m[r]!==m[i||j&&j.from]){if(m[r]){c(l,"rtl")}else{if(l.css("direction")==="rtl"){c(l,"ltr")}}}if((!j||j.altAndVal)&&(p==="IMG"||n==="image")){l.attr("alt",s)}else{if(p==="TEXTAREA"||(!j||j.altAndVal)&&a[n]){l.val(s)}else{if(!j||j.rebind){var h=l.find("*").not("script"),q=f("<div/>").html(s);f.translate.copyEvents(h,q.find("*"));l.html(q.contents())}else{l.html(s)}}}f.data(k,"lang",r)
},setLangAttr:function(h,j,i){if(!i||i.setLangAttr){h.attr((!i||i.setLangAttr===e)?"lang":i.setLangAttr,j)}},copyEvents:function(i,h){h.each(function(k,n){var o=i[k];if(!n||!o){return false}if(b[o.nodeName.toUpperCase()]){return e}var j=f.data(o,"events");if(!j){return e}for(var m in j){for(var l in j[m]){f.event.add(n,m,j[m][l],j[m][l].data)}}})}});f.fn.translate=function(i,h,l){var j=f.translate._getOpt(arguments,f.fn.translate.defaults),k=f.extend({},f.translate._defaults,f.fn.translate.defaults,j,{complete:function(n,m){f.translate(function(){var q=f.translate.toLanguageCode(j.from);if(j.fromOriginal){n.each(function(r,s){d[0]=s;var t=f.translate.getData(d,q,j);if(!t){return true}m[r]=t})}var p=j.each;function o(r){return function(){[].unshift.call(arguments,this.elements);r.apply(this,arguments)}}j.nodes=n;j.start=o(j.start);j.onTimeout=o(j.onTimeout);j.complete=o(j.complete);j.each=function(s){var r=arguments;if(arguments.length!==7){[].splice.call(r,1,0,this.elements[s])}this.each.apply(this,r);
p.apply(this,r)};f.translate(m,j)})},each:function(){}});if(this.nodesContainingText){return this.nodesContainingText(k)}j.nodes=this;f.translate(f.map(this,function(m){return f(m).html()||f(m).val()}),j);return this};f.fn.translate.defaults=f.extend({},f.translate._defaults)})(jQuery);

(function(a){var b={tags:["select","option"],filter:a.translate.isTranslatable,label:a.translate.toNativeLanguage||function(d,c){return a.translate.capitalize(c)},includeUnknown:false};a.translate.ui=function(){var g={},f="",d="",c="";if(typeof arguments[0]==="string"){g.tags=a.makeArray(arguments)}else{g=arguments[0]}g=a.extend({},b,a.translate.ui.defaults,g);if(g.tags[2]){d="<"+g.tags[2]+">";c="</"+g.tags[2]+">"}var e=a.translate.getLanguages(g.filter);if(!g.includeUnknown){delete e.UNKNOWN}a.each(e,function(h,i){f+=("<"+g.tags[1]+" value="+i+">"+d+g.label(i,h)+c+"</"+g.tags[1]+">")});return a("<"+g.tags[0]+' class="jq-translate-ui">'+f+"</"+g.tags[0]+">")};a.translate.ui.defaults=a.extend({},b)})(jQuery);

jQuery.translate.fn.progress=function(a,c){if(!this.i){this._pr=0}this._pr+=this.source[this.i].length;var b=100*this._pr/(this.rawSource.length-(11*(this.i+1)));if(a){var d=jQuery(a);if(!this.i&&!d.hasClass("ui-progressbar")){d.progressbar(c)}d.progressbar("option","value",b)}return b};