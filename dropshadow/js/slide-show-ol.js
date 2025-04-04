/* slide-show 
   1.2.3
   By Stephen Band
   Built 2023-02-22 14:59 */

var nn=Object.defineProperty;var _t=Object.getOwnPropertySymbols;var on=Object.prototype.hasOwnProperty,rn=Object.prototype.propertyIsEnumerable;var Kt=(t,e)=>{var o={};for(var r in t)on.call(t,r)&&e.indexOf(r)<0&&(o[r]=t[r]);if(t!=null&&_t)for(var r of _t(t))e.indexOf(r)<0&&rn.call(t,r)&&(o[r]=t[r]);return o};var q=(t,e)=>{for(var o in e)nn(t,o,{get:e[o],enumerable:!0})};function U(t){var e=new Map;return function(r){if(e.has(r))return e.get(r);var i=t(r);return e.set(r,i),i}}var sn=Array.prototype;function cn(t,e){return typeof t=="function"?t.apply(null,e):t}function Qt(t,e,o){o=o||t.length;var r=o===1?e?t:U(t):U(function(i){return Qt(function(){var s=[i];return s.push.apply(s,arguments),t.apply(null,s)},e,o-1)});return function i(s){return arguments.length===0?i:arguments.length===1?r(s):arguments.length>=o?t.apply(null,arguments):cn(r(s),sn.slice.call(arguments,1))}}var S=Qt;function an(t,e){return 1-Math.pow(1-e,t)}var Jt=S(an);function E(){}function bt(t,e){return e(t)}function L(t){return t}var ln=Array.prototype;function xt(){let t=arguments;return t.length?e=>ln.reduce.call(t,bt,e):L}function St(t,e,o){return o*(e-t)+t}var un=window.performance,Zt=window.requestAnimationFrame,pn=window.cancelAnimationFrame;function Et(t,e,o){var r=un.now();function i(c){var p=(c-r)/(t*1e3);p<1?(p>0&&e(p),s=Zt(i)):(e(1),o&&o())}var s=Zt(i);return function(){pn(s)}}function et(t,e,o,r,i,s){let c=r[o];return Et(t,xt(e,p=>St(c,i,p),p=>r[o]=p),s)}function fn(){return{x:0,y:0,left:0,top:0,right:window.innerWidth,bottom:window.innerHeight,width:window.innerWidth,height:window.innerHeight}}function k(t){return t===window?fn():t.getClientRects()[0]||t.getBoundingClientRect()}var R={scrollDuration:.3,scrollDurationPerHeight:.125,scrollTransform:Jt(3)},te=E;function dn(t,e){if(e.behavior==="smooth"){let o=t.style.getPropertyValue("scroll-snap-type"),r=()=>{let i=t.scrollLeft,s=t.scrollTop;t.style.setProperty("scroll-snap-type",o),t.scrollLeft=i,t.scrollTop=s};if(t.style.setProperty("scroll-snap-type","none"),e.left!==void 0){let i=t===document.body?window.innerWidth:k(t).width,s=R.scrollDuration+R.scrollDurationPerHeight*Math.abs(e.left-t.scrollLeft)/i;te=et(s,R.scrollTransform,"scrollLeft",t,e.left,r)}else{let i=t===document.body?window.innerHeight:k(t).height,s=R.scrollDuration+R.scrollDurationPerHeight*Math.abs(e.top-t.scrollTop)/i;te=et(s,R.scrollTransform,"scrollTop",t,e.top,r)}}else e.left!==void 0&&(t.scrollLeft=e.left),e.top!==void 0&&(t.scrollTop=e.top)}if(!("scrollBehavior"in document.documentElement.style)){window.console&&console.log("Polyfilling Element.scrollTo(options)");let t="scrollTo"in Element.prototype?Element:HTMLElement,e=t.scrollIntoView;t.prototype.scrollTo=function(o){typeof o=="object"?dn(this,o):e.apply(this,arguments)}}function b(t,e){return function(){let r=t.apply(this,arguments),i=e[r]||e.default;if(!i)throw new Error('overload() no handler for "'+r+'"');return i.apply(this,arguments)}}var mn=b(L,{is:E,tag:E,data:function(t,e,o){Object.assign(e.dataset,o)},html:function(t,e,o){e.innerHTML=o},text:function(t,e,o){e.textContent=o},children:function(t,e,o){e.innerHTML="",e.append.apply(e,o)},points:C,cx:C,cy:C,r:C,transform:C,preserveAspectRatio:C,viewBox:C,default:function(t,e,o){t in e?e[t]=o:e.setAttribute(t,o)}});function C(t,e,o){e.setAttribute(t,o)}function hn(t,e){for(var o=Object.keys(e),r=o.length;r--;)mn(o[r],t,e[o[r]]);return t}var nt=S(hn,!0);var Tt="http://www.w3.org/2000/svg",ee=document.createElement("template"),Lt=(t,e)=>e&&typeof e;function ne(t,e){let o=document.createRange();return o.selectNode(t),o.createContextualFragment(e)}var O=b(Lt,{string:function(t,e){let o=document.createElementNS(Tt,t);return o.innerHTML=e,o},object:function(t,e){let o=document.createElementNS(Tt,t);return typeof e.length=="number"?o.append.apply(o,e):nt(o,e),o},default:t=>document.createElementNS(Tt,t)}),gn=b(Lt,{string:function(t,e){let o=document.createElement(t);return o.innerHTML=e,o},object:function(t,e){let o=document.createElement(t);return typeof e.length=="number"?o.append.apply(o,e):nt(o,e),o},default:t=>document.createElement(t)}),wn=b(L,{comment:function(t,e){return document.createComment(e||"")},fragment:b(Lt,{string:function(t,e,o){return o?ne(o,e):(ee.innerHTML=e,ee.content.cloneNode(!0))},object:function(t,e,o){let r=o?ne(o):document.createDocumentFragment();return typeof e.length=="number"?r.append.apply(r,e):nt(r,e),r},default:()=>document.createDocumentFragment()}),text:function(t,e){return document.createTextNode(e||"")},circle:O,ellipse:O,g:O,glyph:O,image:O,line:O,rect:O,use:O,path:O,pattern:O,polygon:O,polyline:O,svg:O,default:gn}),w=wn;function kt(t,e,o){let r;typeof o!="string"&&o.input!==void 0&&o.index!==void 0&&(r=o,o=r.input.slice(o.index+o[0].length+(o.consumed||0)));let i=t.exec(o);if(!i)return;let s=e(i);return r&&(r.consumed=(r.consumed||0)+i.index+i[0].length+(i.consumed||0)),s}var Pr=S(kt,!0);function vn(t,e,o){throw o.input!==void 0&&o.index!==void 0&&(o=o.input),new Error('Cannot parse string "'+(o.length>128?o.length.slice(0,128)+"…":o)+'"')}function yn(t,e,o){let r=-1;for(;++r<o.length;)e=o[r]!==void 0&&t[r]?t[r](e,o):e;return t.done?t.done(e,o):t.close?t.close(e,o):e}function bn(t,e,o,r){let i=kt(t,s=>yn(e,o,s),r);return i===void 0?e.catch?e.catch(o,r):vn(t,e,r):i}var oe=S(bn,!0);var F=Symbol("internals"),H=Symbol("shadow"),re=Object.defineProperties,xn={a:HTMLAnchorElement,article:HTMLElement,dl:HTMLDListElement,p:HTMLParagraphElement,br:HTMLBRElement,fieldset:HTMLFieldSetElement,hr:HTMLHRElement,img:HTMLImageElement,li:HTMLLIElement,ol:HTMLOListElement,optgroup:HTMLOptGroupElement,q:HTMLQuoteElement,section:HTMLElement,textarea:HTMLTextAreaElement,td:HTMLTableCellElement,th:HTMLTableCellElement,tr:HTMLTableRowElement,tbody:HTMLTableSectionElement,thead:HTMLTableSectionElement,tfoot:HTMLTableSectionElement,ul:HTMLUListElement},Sn={name:{set:function(t){return this.setAttribute("name",t)},get:function(){return this.getAttribute("name")||""}},form:{get:function(){return this[F].form}},labels:{get:function(){return this[F].labels}},validity:{get:function(){return this[F].validity}},validationMessage:{get:function(){return this[F].validationMessage}},willValidate:{get:function(){return this[F].willValidate}},checkValidity:{value:function(){return this[F].checkValidity()}},reportValidity:{value:function(){return this[F].reportValidity()}}},En={},ie={once:!0},se=0,ce=!1;function Tn(t){return xn[t]||window["HTML"+t[0].toUpperCase()+t.slice(1)+"Element"]||(()=>{throw new Error('Constructor not found for tag "'+t+'"')})()}var Ln=oe(/^\s*<?([a-z][\w]*-[\w-]+)>?\s*$|^\s*<?([a-z][\w]*)\s+is[=\s]*["']?([a-z][\w]*-[\w]+)["']?>?\s*$/,{1:(t,e)=>({name:e[1]}),2:(t,e)=>({name:e[3],tag:e[2]}),catch:function(t,e){throw new SyntaxError(`dom element() – name must be of the form 'element-name' or 'tag is="element-name"' (`+e+")")}},null);function kn(t,e){if(t.hasOwnProperty(e)){let o=t[e];delete t[e],t[e]=o}return t}function ae(t,e,o){t._initialLoad=!0;let r=t.attachShadow({mode:e.mode||"closed",delegatesFocus:e.focusable||!1});if(o){let i=w("link",{rel:"stylesheet",href:o});r.append(i)}return t[H]=r,r}function On(t){var e;if(t.attachInternals){if(e=t.attachInternals(),e.setFormValue)return e}else e={shadowRoot:t.shadowRoot};return e.input=w("input",{type:"hidden",name:t.name}),t.appendChild(e.input),e.setFormValue=function(o){this.input.value=o},e}function Fn(t){return!!t.attribute}function Mn(t){return t.set||t.get||t.hasOwnProperty("value")}function Pn(t,e){return Fn(e[1])&&(t.attributes[e[0]]=e[1].attribute),Mn(e[1])&&(t.properties[e[0]]=e[1]),t}function Ot(t,e,o,r,i=""){let{name:s,tag:c}=Ln(t),p=typeof c=="string"?Tn(c):HTMLElement,{attributes:d,properties:f}=o?Object.entries(o).reduce(Pn,{attributes:{},properties:{}}):En;function g(){let m=Reflect.construct(p,arguments,g),y=e.construct&&e.construct.length>se?ae(m,e,r||e.stylesheet):void 0,u=g.formAssociated?On(m):{};return c&&(ce=!0),e.construct&&e.construct.call(m,y,u),f&&Object.keys(f).reduce(kn,m),m}return g.prototype=Object.create(p.prototype,f),f.value&&(g.formAssociated=!0,re(g.prototype,Sn),(e.enable||e.disable)&&(g.prototype.formDisabledCallback=function(m){return m?e.disable&&e.disable.call(this,this[H],this[F]):e.enable&&e.enable.call(this,this[H],this[F])}),e.reset&&(g.prototype.formResetCallback=function(){return e.reset.call(this,this[H],this[F])}),e.restore&&(g.prototype.formStateRestoreCallback=function(){return e.restore.call(this,this[H],this[F])})),d&&(g.observedAttributes=Object.keys(d),g.prototype.attributeChangedCallback=function(m,y,u){return d[m].call(this,u)}),g.prototype.connectedCallback=function(){let m=this,y=m[H],u=m[F];if(m._initialLoad){let l=y.querySelectorAll('link[rel="stylesheet"]');if(l.length){let G=0,yt=l.length,Yt=function(_o){++G>=l.length&&(delete m._initialLoad,e.load&&e.load.call(m,y))},tn=Yt;for(;yt--;)l[yt].addEventListener("load",Yt,ie),l[yt].addEventListener("error",tn,ie)}else e.load&&Promise.resolve(1).then(()=>e.load.call(this,y,u))}e.connect&&e.connect.call(this,y,u)},e.disconnect&&(g.prototype.disconnectedCallback=function(){return e.disconnect.call(this,this[H],this[F])}),window.console&&window.console.log("%c<"+(c?c+" is="+s:s)+">%c "+i,"color: #3a8ab0; font-weight: 600;","color: #888888; font-weight: 400;"),window.customElements.define(s,g,c&&{extends:c}),c&&!ce&&document.querySelectorAll('[is="'+s+'"]').forEach(m=>{o&&re(m,o);let y=e.construct&&e.construct.length>se?ae(m,e,r||e.stylesheet):void 0;e.construct&&e.construct.call(m,y);let u;for(u in d){let l=m.attributes[u];l&&d[u].call(m,l.value)}e.connect&&e.connect.apply(m)}),g}function le(t,e){if(t===e)return!0;if(t===null||e===null||typeof t!="object"||typeof e!="object")return!1;let o=Object.keys(t),r=Object.keys(e),i=o.length;for(;i--;){if(t[o[i]]===void 0){if(e[o[i]]!==void 0)return!1}else if(!e.hasOwnProperty(o[i])||!le(t[o[i]],e[o[i]]))return!1;let s=r.indexOf(o[i]);s>-1&&r.splice(s,1)}for(i=r.length;i--;)if(e[r[i]]===void 0){if(t[r[i]]!==void 0)return!1}else return!1;return!0}var ue=S(le,!0);function In(t,e){return e[t]}var W=S(In,!0);function Ft(t){return function(){return arguments[t]}}function M(){return this}var jn=Object.assign,Cn=Object.create,Hn=Object.freeze;function An(){return!0}function pe(){return-1}var P=Hn(jn(Cn({shift:E,push:E,forEach:E,join:function(){return""},every:An,filter:M,find:E,findIndex:pe,flat:M,flatMap:M,includes:function(){return!1},indexOf:pe,map:M,reduce:Ft(1),sort:M,each:M,pipe:L,start:M,stop:M,done:M,valueOf:function(){return null}}),{length:0}));function V(t,e){t.remove&&t.remove(e);let o;for(;(o=t.indexOf(e))!==-1;)t.splice(o,1);return t}var Kr=S(V,!0);function Mt(t){return t&&t[Symbol.iterator]}var Bn=Object.assign;function Dn(t){return t.stop?t.stop():t()}function N(){}Bn(N.prototype,{stop:function(){let t=this.stopables;return this.stopables=void 0,t&&t.forEach(Dn),this},done:function(t){return(this.stopables||(this.stopables=[])).push(t),this}});var I=Object.assign,j=Object.create;function $(t,e){t[0]=e,e.done(t)}function fe(t,e){let o=t[e].stopables;o&&V(o,t),t[e]=void 0}function v(t,e){t&&t.push(e)}function T(t){N.prototype.stop.apply(t);let e=-1,o;for(;o=t[++e];)t[e]=void 0,o.stop()}function de(t){return a.prototype.isPrototypeOf(t)}function a(t){this.input=t}I(a.prototype,N.prototype,{push:function(t){v(this[0],t)},pipe:function(t){if(this[0])throw new Error("Stream: Attempt to .pipe() a unicast stream multiple times. Create a multicast stream with .broadcast().");return this[0]=t,t.done(this),this.input.pipe(this),t},map:function(t){return new me(this,t)},filter:function(t){return new he(this,t)},split:function(t){return new we(this,t)},flatMap:function(t){return new ge(this,t)},slice:function(t,e){return new Pt(this,t,e)},take:function(t){return console.warn(".take(a) superseded by .slice(0, a)"),new Pt(this,0,t)},each:function(t){return this.pipe(new be(t))},reduce:function(t,e){return this.pipe(new ve(t,e)).value},scan:function(t,e){return new ye(this,t,e)},stop:function(){return T(this),this}});function me(t,e){this.input=t,this.fn=e}me.prototype=I(j(a.prototype),{push:function(e){let r=this.fn(e);r!==void 0&&v(this[0],r)}});function he(t,e){this.input=t,this.fn=e}he.prototype=I(j(a.prototype),{push:function(e){this.fn(e)&&v(this[0],e)}});function ge(t,e){this.input=t,this.fn=e}ge.prototype=I(j(a.prototype),{push:function(e){let r=this.fn(e);if(r!==void 0)if(Mt(r))for(let i of r)v(this[0],i);else r.pipe&&this.done(r.each(i=>v(this[0],i)))}});function we(t,e){this.input=t,this.chunk=[],typeof n=="number"?this.n=e:this.fn=e}we.prototype=I(j(a.prototype),{fn:function(){return this.chunk.length===this.n},push:function(e){let o=this.chunk;this.fn(e)?(v(this[0],o),this.chunk=[]):o.push(e)}});function Pt(t,e,o=1/0){this.input=t,this.index=-e,this.indexEnd=e+o}Pt.prototype=I(j(a.prototype),{push:function(e){++this.index>0&&this[0].push(e),this.index===this.indexEnd&&this.stop()}});function ve(t,e){this.fn=t,this.value=e,this.i=0}ve.prototype=I(j(a.prototype),{push:function(t){let e=this.fn;this.value=e(this.value,t,this.i++,this)}});function ye(t,e,o){this.input=t,this.fn=e,this.value=o}ye.prototype=I(j(a.prototype),{push:function(t){let e=this.fn;this.value=e(this.value,t),this[0].push(this.value)}});function be(t){this.push=t}be.prototype=I(j(a.prototype),{each:null,reduce:null,pipe:null});var zn=Object.assign,Gn=Object.create;function Un(t,e){if(t[1]){let o=-1;for(;t[++o]&&t[o]!==e;);for(;t[o++];)t[o-1]=t[o]}else t.stop()}function X(t,e){a.apply(this,arguments),this.memory=!!(e&&e.memory),e&&e.hot&&this.pipe(P)}X.prototype=zn(Gn(a.prototype),{push:function(t){if(t===void 0)return;this.memory&&(this.value=t);let e=-1;for(;this[++e];)this[e].push(t)},pipe:function(t){let e=-1;for(;this[++e];);return this.memory&&e===0&&this.input.pipe(this),this[e]=t,t.done(()=>Un(this,t)),this.value!==void 0&&t.push(this.value),!this.memory&&e===0&&this.input.pipe(this),t}});var Rn=Array.prototype,Wn=Object.assign,qn=Object.create;function Vn(t){return t!==void 0}function Y(t){this.buffer=t?t.filter?t.filter(Vn):t:[]}Y.prototype=Wn(qn(a.prototype),{push:function(t){t!==void 0&&v(this.buffer,t)},pipe:function(t){for(t.done(this),this[0]=t;this.buffer.length;)v(this[0],Rn.shift.apply(this.buffer));return this.buffer=t,t},stop:function(){return this.buffer=void 0,T(this),this}});var xe=Object.assign,Nn=Object.create,$n=Promise.resolve(),Xn={schedule:function(){$n.then(this.fire)},unschedule:E},Yn={schedule:function(){this.timer=requestAnimationFrame(this.fire)},unschedule:function(){cancelAnimationFrame(this.timer),this.timer=void 0}},_n={schedule:function(){this.timer=setTimeout(this.fire,this.duration*1e3)},unschedule:function(){clearTimeout(this.timer),this.timer=void 0}};function A(t,e){a.apply(this,arguments),this.duration=e,this.timer=void 0,this.fire=()=>{this.timer=void 0,this.output.stop()},xe(this,e==="tick"?Xn:e==="frame"?Yn:_n)}A.prototype=xe(Nn(a.prototype),{push:function(t){this.timer?(this.unschedule(),this.schedule(),this.output.push(t)):(this.output=a.of(t),this[0].push(this.output),this.schedule())},stop:function(){return this.timer&&this.fire(),a.prototype.stop.apply(this,arguments)}});var It=Object.assign,Kn=Object.create,Se=Object.keys;function jt(t,e,o,r,i){this.stream=t,this.names=e,this.values=o,this.name=r,this.input=i}It(jt.prototype,{push:function(t){let e=this.stream,o=this.values,r=this.name;o[r]=t,(e.active||(e.active=Se(o).length===this.names.length))&&v(e[0],It({},o))},stop:function(){--this.stream.count===0&&T(this.stream)},done:function(t){this.stream.done(t)}});function ot(t){this.inputs=t,this.active=!1}ot.prototype=It(Kn(a.prototype),{push:null,pipe:function(t){let e=this.inputs,o=Se(e),r={};this.count=o.length,this[0]=t,t.done(this);let i;for(i in e){let s=e[i];if(s.pipe){let c=new jt(this,o,r,i,s);s.pipe(c)}else if(s.then){let c=new jt(this,o,r,i,s);s.then(p=>c.push(p)),s.finally(()=>c.stop())}else r[i]=s,--this.count}return t}});var Qn=Object.assign,Jn=Object.create;function rt(t){this.fn=t}rt.prototype=Qn(Jn(a.prototype),{pipe:function(t){return t.done(this),this[0]=t,this.fn(e=>this.push(e),e=>this.stop(e)),t}});var Ee=Object.assign,Zn=Object.create;function Te(t){this.stream=t}Ee(Te.prototype,{push:function(t){v(this.stream[0],t)},stop:function(){--this.stream.count===0&&T(this.stream)},done:function(t){this.stream.done(t)}});function it(t){this.inputs=t}it.prototype=Ee(Zn(a.prototype),{push:null,pipe:function(t){let e=this.inputs;this.count=e.length,this[0]=t,t.done(this);let o=new Te(this),r=-1,i;for(;i=e[++r];)if(i.pipe)i.pipe(o);else if(i.then)i.then(s=>o.push(s)),i.finally(()=>o.stop());else{let s=-1;for(;++s<i.length;)o.push(i[s]);o.stop()}return t}});var to=Object.assign,eo=Object.create;function st(t){this.promise=t}st.prototype=to(eo(a.prototype),{push:null,pipe:function(t){let e=this.promise;return this[0]=t,t.done(this),e.then(o=>v(this,o)),e.finally(()=>T(this)),t}});var no=Array.prototype,Le=Object.assign;function oo(t){throw new TypeError("Stream cannot be created from "+typeof object)}Le(a,{isStream:de,of:function(){return new Y(no.slice.apply(arguments))},from:function(t){return t.pipe?new a(t):t.then?new st(t):typeof t.length=="number"?typeof t=="function"?new rt(t):new Y(t):oo(t)},batch:t=>new A(P,t),burst:t=>(console.warn("Stream.burst() is now Stream.batch()"),new A(P,t)),broadcast:t=>new X(P,t),combine:t=>new ot(t),merge:function(){return new it(arguments)},writeable:function(t){let e=new a(P);return t(e),e}});Le(a.prototype,{log:M,batch:function(t){return new A(this,t)},burst:function(t){return console.warn("stream.burst() is now stream.batch()"),new A(this,t)},broadcast:function(t){return new X(this,t)}});var ro=Object.assign,io=/\s+/,ct={fullscreenchange:U(()=>"fullscreenElement"in document?"fullscreenchange":"webkitFullscreenElement"in document?"webkitfullscreenchange":"mozFullScreenElement"in document?"mozfullscreenchange":"msFullscreenElement"in document?"MSFullscreenChange":"fullscreenchange")},ke=0;window.addEventListener("click",t=>ke=t.timeStamp);function so(t,e){return t.node.addEventListener(ct[e]?ct[e]():e,t,t.options),t}function co(t,e){return t.node.removeEventListener(ct[e]?ct[e]():e,t),t}function Oe(t,e,o){this.types=t.split(io),this.options=e,this.node=o,this.select=e&&e.select}ro(Oe.prototype,{pipe:function(t){$(this,t),this.types.reduce(so,this)},handleEvent:function(t){if(!(t.type==="click"&&t.timeStamp<=ke)){if(this.select){let e=t.target.closest(this.select);if(!e)return;t.selectedTarget=e}v(this[0],t)}},stop:function(){this.types.reduce(co,this),T(this[0])}});function x(t,e){let o;return typeof t=="object"&&(o=t,t=o.type),new a(new Oe(t,o,e))}function Ct(t){return typeof t}var ao=/^\s*([+-]?\d*\.?\d+)([^\s\d]*)\s*$/;function _(t){return function(o){if(typeof o=="number")return o;var r=ao.exec(o);if(!r||!t[r[2]||""]){if(!t.catch)throw new Error('Cannot parse value "'+o+'" (accepted units '+Object.keys(t).join(", ")+")");return r?t.catch(parseFloat(r[1]),r[2]):t.catch(parseFloat(o))}return t[r[2]||""](parseFloat(r[1]))}}var lo=/px$/,Fe={"transform:translateX":function(t){var e=K("transform",t);if(!e||e==="none")return 0;var o=at(e);return parseFloat(o[4])},"transform:translateY":function(t){var e=K("transform",t);if(!e||e==="none")return 0;var o=at(e);return parseFloat(o[5])},"transform:scale":function(t){var e=K("transform",t);if(!e||e==="none")return 0;var o=at(e),r=parseFloat(o[0]),i=parseFloat(o[1]);return Math.sqrt(r*r+i*i)},"transform:rotate":function(t){var e=K("transform",t);if(!e||e==="none")return 0;var o=at(e),r=parseFloat(o[0]),i=parseFloat(o[1]);return Math.atan2(i,r)}};function at(t){return t.split("(")[1].split(")")[0].split(/\s*,\s*/)}function K(t,e){return window.getComputedStyle?window.getComputedStyle(e,null).getPropertyValue(t):0}function lt(t,e){if(Fe[t])return Fe[t](e);var o=K(t,e);return typeof o=="string"&&lo.test(o)?parseFloat(o):o}var ut,pt;function uo(){if(!ut){let t=document.documentElement.style.fontSize;document.documentElement.style.fontSize="100%",ut=lt("font-size",document.documentElement),document.documentElement.style.fontSize=t||""}return ut}function po(){return pt||(pt=lt("font-size",document.documentElement)),pt}window.addEventListener("resize",()=>{ut=void 0,pt=void 0});var B=b(Ct,{number:L,string:_({px:L,em:t=>uo()*t,rem:t=>po()*t,vw:t=>window.innerWidth*t/100,vh:t=>window.innerHeight*t/100,vmin:t=>window.innerWidth<window.innerHeight?window.innerWidth*t/100:window.innerHeight*t/100,vmax:t=>window.innerWidth<window.innerHeight?window.innerHeight*t/100:window.innerWidth*t/100})}),Me=B;var fo=Array.prototype,At=Object.assign,Ht="webkitUserSelect"in document.body.style?"webkitUserSelect":"userSelect",ft={},dt={threshold:4,ignoreTags:{textarea:!0,input:!0,select:!0}};function mo(t,e,o){return e*e+o*o>=t*t}function Pe(t,e,o){if(this.stream=t,this.events=[e],this.options=o,this.pointerId=e.pointerId,typeof o.threshold=="function")this.checkThreshold=o.threshold;else{let r=Me(o.threshold);this.checkThreshold=(i,s,c)=>mo(r,i,s,c)}document.addEventListener("pointermove",this),document.addEventListener("pointerup",this),document.addEventListener("pointercancel",this)}At(Pe.prototype,{handleEvent:b(W("type"),{pointermove:function(t){if(this.pointerId===t.pointerId){if(this.pointerId in ft&&this!==ft[this.pointerId]){this.stop();return}if(this.events.push(t),!this.isGesture){let e=this.events[0],o=t.clientX-e.clientX,r=t.clientY-e.clientY,i=(t.timeStamp-e.timeStamp)/1e3;this.checkThreshold(o,r,i)&&this.createGesture()}}},default:function(t){if(this.pointerId!==t.pointerId){console.log("Not the same pointer");return}this.events.push(t),this.stop()}}),createGesture:function(){this.isGesture=!0,this.userSelectState=document.body.style[Ht],document.body.style[Ht]="none",ft[this.pointerId]=this,this.stream.push(new a(this))},pipe:function(t){for($(this,t);this.events.length;)v(this[0],fo.shift.apply(this.events));this.events=t},stop:function(){if(document.removeEventListener("pointermove",this),document.removeEventListener("pointerup",this),document.removeEventListener("pointercancel",this),this.isGesture&&(document.body.style[Ht]=this.userSelectState,delete ft[this.pointerId]),this[0]){let t=this[0];fe(this,0),T(t)}}});function ho(t){var e=t.target.tagName;return e&&(!!dt.ignoreTags[e.toLowerCase()]||t.target.draggable)}function Ie(t,e){this.node=t,this.options=e}At(Ie.prototype,{pipe:function(t){return this[0]=t,this.node.addEventListener("pointerdown",this),t},handleEvent:function(t){if(t.button===0&&!(this.options.device&&!this.options.device.includes(t.pointerType))&&!ho(t)&&!(this.options.select&&!t.target.closest(this.options.select))){var e={type:t.type,target:t.target,currentTarget:t.currentTarget,clientX:t.clientX,clientY:t.clientY,timeStamp:t.timeStamp,pointerId:t.pointerId};new Pe(this[0],e,this.options)}},stop:function(){return this[0]&&(this.node.removeEventListener("pointerdown",this),T(this[0])),this}});function Bt(t,e){return t=e&&t?At({},dt,t):dt,e=e||t,new a(new Ie(e,t))}function Dt(t){return t.which===1&&!t.ctrlKey&&!t.altKey&&!t.shiftKey}var go=Object.assign,Q={bubbles:!0,cancelable:!0};function zt(t,e){var f;let o=Q,r,i,s,c,p,d;return typeof t=="object"?(f=t,{type:t,detail:i,bubbles:s,cancelable:c,composed:p}=f,r=Kt(f,["type","detail","bubbles","cancelable","composed"]),d=go(new CustomEvent(t,{detail:i,bubbles:s||Q.bubbles,cancelable:c||Q.cancelable,composed:p||Q.composed}),r)):d=new CustomEvent(t,Q),e.dispatchEvent(d)}var ns=S(zt,!0);var h=Symbol("data"),J={minScrollInterval:.0375,maxScrollInterval:.18},je=J.maxScrollInterval;function Ce(t){let e=t.length,o=0;for(;--e;){let r=t[e]-t[e-1];o=r>o?r:o}o=o<J.minScrollInterval?J.minScrollInterval:o,je=1.4*o>J.maxScrollInterval?J.maxScrollInterval:1.4*o}function mt(){return je}var Gt="MozAppearance"in document.documentElement.style;var He=!1;Gt&&document.addEventListener("DOMContentLoaded",t=>He=!0);function Ae(t){let e=k(t),o=window.getComputedStyle(t,null),r=B(o.getPropertyValue("padding-left")),i=B(o.getPropertyValue("padding-right"));return e.leftPadding=e.left+r,e.rightPadding=e.left+e.width-i,e.centrePadding=e.leftPadding+(e.width-r-i)/2,e}function Be(t){let e=window.getComputedStyle(t,null).getPropertyValue("scroll-snap-align");return e.endsWith("start")?"left":e.endsWith("end")?"right":"centre"}function De(t,e,o){let r=Ae(t),i=k(e),s=Be(e),c={top:t.scrollTop,left:t.scrollLeft+(s==="left"?i.left-r.leftPadding:s==="right"?i.right-r.rightPadding:i.left+i.width/2-r.centrePadding),behavior:o};t.scrollTo(c),Gt&&!He&&document.addEventListener("DOMContentLoaded",()=>t.scrollTo(c))}function ze(t,e){return De(t,e,"smooth"),e}function D(t,e){return t.style.setProperty("scroll-behavior","auto","important"),De(t,e,"auto"),t.style.setProperty("scroll-behavior",""),e}function Ge(t,e){let{leftPadding:o,rightPadding:r,centrePadding:i}=Ae(t),s=e.length,c;for(;c=e[--s];){let p=k(c);if(!p)continue;let d=Be(c),f=p.width/2+(d==="left"?o:d==="right"?r:i);if((d==="left"?p.left:d==="right"?p.right:p.left+p.width/2)<=f)break}return c}function Ue(t){return!!t.dataset.slideIndex}function Re(t){let{scroller:e,elements:o,children:r}=t,i=Ge(e,o);return Ue(i)?r[i.dataset.slideIndex]:i}function We(t){let{scroller:e,children:o,elements:r}=t,i=Ge(e,r),s;!i||(Ue(i)?(s=o[i.dataset.slideIndex],D(e,s)):s=i,t.activations.push(s))}function ht(t,e,o){let r=e[o];!r||(t.active=r)}function qe(t,e,o){let r=e.indexOf(o)+1;ht(t,e,r)}function Ve(t,e,o){let r=e.indexOf(o)-1;ht(t,e,r)}function wo(t,e){t.style.setProperty("scroll-snap-type",""),e.stop()}var Ne=b((t,e)=>e.type,{pointerdown:function(t,e){return t.e0=e,t.x0=e.clientX,t.y0=e.clientY,t},pointermove:function(t,e){let o=e.clientX,r=e.clientY;if(!t.gesturing){if(Math.abs(o-t.x0)<Math.abs(r-t.y0)){t.pointers.stop(),t.pointers=void 0,t.e0=void 0,t.x0=void 0,t.y0=void 0;return}t.scrollLeft0=t.scroller.scrollLeft,t.scroller.style.setProperty("scroll-snap-type","none","important"),t.scroller.style.setProperty("scroll-behavior","auto","important"),t.gesturing=!0}let i=e.clientX-t.x0;return t.scroller.scrollLeft=t.scrollLeft0-i,t},default:function(t,e){let o=t.scroller;t.clickSuppressTime=e.timeStamp;let r=o.scrollLeft;o.style.setProperty("scroll-snap-type","");let i=o.scrollLeft;if(r===i)o.style.setProperty("scroll-behavior","");else{let s=Re(t);t.activations.push(s),o.style.setProperty("scroll-snap-type","none","important"),o.scrollLeft=r,o.style.setProperty("scroll-behavior",""),o.scrollTo({top:o.scrollTop,left:i,behavior:"smooth"}),x({type:"scroll",passive:!0},o).reduce((c,p,d,f)=>(clearTimeout(c),setTimeout(wo,mt()*1e3,o,f)))}return t.gesturing=!1,t.e0=void 0,t.x0=void 0,t.y0=void 0,t.pointers=void 0,t.scrollLeft0=void 0,t}});var vo=Object.assign;function Z(){}vo(Z.prototype,{pipe:function(t){return this[0]=t,t},stop:function(){return this[0]&&a(this[0]),this}});var yo=Object.assign,bo={capture:!0,passive:!0};function xo(t,e){t.timer=void 0,t.stream.push(e);let o=t.times;o.length>1&&Ce(o),o.length=0}function $e(t){this.element=t,this.times=[]}yo($e.prototype,Z.prototype,{pipe:function(t){this.stream=t,this.element.addEventListener("scroll",this,bo)},handleEvent:function(t){let e=t.timeStamp/1e3;this.times.push(e),this.timer&&clearTimeout(this.timer),this.timer=setTimeout(xo,mt()*1e3,this,t)},stop:function(){this.element.removeEventListener("scroll",this),Z.prototype.stop.apply(this,arguments)}});function Ut(t){return new a(new $e(t))}function So(t,e,o){let r=o.length,i=-1/0;for(;r--;){let f=k(o[r]),g=f.x+f.width;i=g>i?g:i}let s=k(e),c=getComputedStyle(t),p=B(c.paddingLeft||0),d=B(c.paddingRight||0);return p+d+i-s.x}function Eo(t,e,o){let r=So(t,e,o);t.style.setProperty("--scroll-width",r+"px")}function To(t){return!t.dataset.slideIndex}var Xe={mode:"open",construct:function(t){let e=w("slot",{part:"slides"}),o=w("div",{class:"scroller",children:[e]}),r=w("nav",{part:"controls",children:[w("slot",{name:"controls"})]});t.append(o,r);let i=a.broadcast(),s=a.broadcast(),c=a.combine({host:s,elements:x("slotchange",e).map(l=>u.elements=e.assignedElements())}).broadcast({memory:!0}),p=c.map(l=>{let G=l.elements.filter(To);return ue(u.children,G)?void 0:u.children=G}).broadcast({memory:!0,hot:!0}),d=a.of(),f=a.of(),g=f.map(l=>l.dataset.slideIndex?u.children[l.dataset.slideIndex]:l).filter(l=>u.active!==l&&zt("slide-active",l)).map(l=>u.active=l).broadcast({memory:!0,hot:!0}),m=x("click",t).filter(Dt).broadcast(),y=Ut(o).filter(l=>u.connected&&!u.gesturing).broadcast(),u=this[h]={clickSuppressTime:-1/0,connected:!1,host:this,style:window.getComputedStyle(this),elements:P,children:P,device:void 0,shadow:t,scroller:o,slides:e,controls:r,connects:i,load:s,views:d,activations:f,actives:g,slotchanges:c,mutations:p,clicks:m,scrolls:y};a.merge(c,x("resize",window)).filter(l=>e.offsetWidth&&e.offsetHeight).each(l=>Eo(o,e,u.elements)),a.combine({slotchanges:c,connects:i}).map(l=>u.elements.includes(u.active)?u.active:u.children[0]).map(l=>u.connected?D(o,l):l).pipe(f),a.combine({host:s,child:d}).map(l=>u.elements.includes(l.child)&&u.active!==l.child?l.child:void 0).map(l=>u.connected?u.active?ze(o,l):D(o,l):l).pipe(f),y.each(l=>We(u)),Bt({threshold:"0.25rem",device:"mouse"},t).filter(()=>u.children.length>1).each(l=>{u.pointers=l,l.reduce(Ne,u)}),m.each(l=>{l.timeStamp-u.clickSuppressTime<120&&(l.preventDefault(),l.stopPropagation())}),x("fullscreenchange",window).filter(l=>u.active&&e.offsetWidth&&e.offsetHeight).each(l=>{(l.target===this||l.target.contains(this))&&D(o,u.active)}),a.merge(x("pointerdown",this),x("keydown",this)).each(l=>u.device=l.type==="keydown"?"keyboard":l.pointerType),x("focusin",this).filter(l=>u.device==="keyboard").map(l=>u.children.indexOf(l.target)!==-1?l.target:u.children.find(G=>G.contains(l.target))).pipe(d),x("keydown",this).filter(()=>document.activeElement===this||this.contains(document.activeElement)).map(b(W("keyCode"),{37:l=>(l.preventDefault(),u.elements[u.elements.indexOf(u.active)-1]),39:l=>(l.preventDefault(),u.elements[u.elements.indexOf(u.active)+1]),default:E})).pipe(d)},load:function(t){this[h].load.push(this)},connect:function(t){let e=this[h];e.connected=!0,e.connects.push(!0)},disconnect:function(t){let e=this[h];e.connected=!1}};function gt(t){function e(o,r){if(t.getState(o)!==r)return t[r?"enable":"disable"](o)}return{attribute:function(o){return e(this,o!==null)},set:function(o){return e(this,!!o)},get:function(){return t.getState(this)},enumerable:!0}}var Lo=Object.assign;function tt(t,e){this.element=t,this.definitions=e,this.tokens=[]}Lo(tt.prototype,{contains:function(t){return this.tokens.includes(t)},add:function(){let t=arguments.length;for(;t--;){let e=arguments[t];this.tokens.includes(e)||(this.tokens.push(e),this.supports(e)&&this.definitions[e].enable(this.element))}},remove:function(){let t=arguments.length;for(;t--;){let e=arguments[t];this.tokens.includes(e)&&(V(this.tokens,e),this.supports(e)&&this.definitions[e].disable(this.element))}},supports:function(t){return!!this.definitions&&!!this.definitions[t]}});var ko=Array.prototype;function Rt(t,e){let o=t.tokens.slice(),r=ko.slice.apply(e),i=o.length;for(;i--;)r.includes(o[i])&&o.splice(i,1);t.remove.apply(t,o),t.add.apply(t,r)}function Wt(t){let e=Symbol("TokenList");function o(r,i){let s=r[e]||(r[e]=new tt(r,t));Rt(s,i.trim().split(/\s+/))}return{attribute:function(r){o(this,r||"")},set:function(r){o(this,r+"")},get:function(){return this[e]||(this[e]=new tt(this,t))},enumerable:!0}}var qt={};q(qt,{disable:()=>Io,enable:()=>Po,getState:()=>jo});var Oo=_({s:L,ms:t=>t/1e3});function Fo(t){let{active:e,children:o,elements:r,host:i}=t,s=r.indexOf(e),c=r[s+1]||o[0];t.autoplay.timer=null,!!c&&(i.active=c)}function Mo(t){let{active:e,style:o}=t,r=Oo(window.getComputedStyle(e).getPropertyValue("--slide-duration")||o.getPropertyValue("--slide-duration"));clearTimeout(t.autoplay.timer),t.autoplay.timer=setTimeout(Fo,r*1e3,t)}function Ye(t){clearTimeout(t.autoplay.timer),t.autoplay.timer=null}function Po(t){let e=t[h],{actives:o}=e,r=e.autoplay={},i=a.merge([!1],x("pointerenter pointerleave",t).map(c=>c.type==="pointerenter")),s=a.merge([t.contains(document.activeElement)],x("focusin focusout",t).map(b(W("type"),{focusin:c=>!0,focusout:c=>t.contains(c.relatedTarget)}))).map((c=>p=>c===p?void 0:c=p)());r.updates=a.combine({active:o,hover:i,focus:s}).each(c=>c.hover||c.focus?Ye(e):Mo(e))}function Io(t){let e=t[h];Ye(e),e.autoplay.updates.stop(),e.autoplay=void 0}function jo(t){return!!t[h].autoplay}var Vt={};q(Vt,{disable:()=>Ao,enable:()=>Ho,getState:()=>Bo});function _e(t,e){let o=t.cloneNode(!0);return o.dataset.slideIndex=e,o.removeAttribute("id"),o.setAttribute("aria-hidden","true"),o.tabIndex="-1",o}function Co(t){let{active:e,children:o,host:r,scroller:i}=t;if(t.loop.prepends&&(t.loop.prepends.forEach(y=>y.remove()),t.loop.appends.forEach(y=>y.remove()),t.loop.prepends=void 0,t.loop.appends=void 0),o.length<2){t.elements=t.slides.assignedElements();return}let s=r.clientWidth,c=o.map(k),p=c[1].left,d=c[c.length-2].right,f=1;for(;c[++f]&&c[f].left<p+s;);let g=o.slice(0,f).map(_e);for(f=c.length-2;c[--f]&&c[f].right>d-s;);let m=o.slice(++f).map((y,u)=>_e(y,f+u));r.prepend.apply(r,m),r.append.apply(r,g),t.loop.prepends=m,t.loop.appends=g,t.elements=t.slides.assignedElements(),D(i,e||o[0])}function Ho(t){let e=t[h],{mutations:o}=e,r=e.loop={};r.renders=o.each(i=>Co(e))}function Ao(t){let e=t[h];e.loop&&(e.loop.prepends&&e.loop.prepends.forEach(o=>o.remove()),e.loop.appends&&e.loop.appends.forEach(o=>o.remove()),e.loop.renders.stop(),e.loop=void 0)}function Bo(t){return!!t[h].loop}var Nt={};q(Nt,{disable:()=>Go,enable:()=>zo,getState:()=>Uo});function z(t){if(typeof t!="object"||arguments.length>1)throw new Error("delegate() now takes an object of selector:fn pairs.");return function(o){let r=o.target,i;for(i in t){let s=r.closest(i);if(s)return t[i](s,...arguments)}}}function Do(t,e,o,r,i){i===0||t.scrollLeft===0?e.hidden=!0:e.hidden=!1,i===r.length-1||t.scrollLeft>=t.scrollWidth-t.clientWidth?o.hidden=!0:o.hidden=!1}function zo(t){let e=t[h],{actives:o,clicks:r,slotchanges:i,scroller:s,scrolls:c}=e,p=e.navigation={prev:w("button",{part:"prev-button",type:"button",name:"navigation",value:"-1",children:[w("slot",{name:"prev-button",html:`
                    <svg viewBox="0 0 30 40" aria-hidden="true">
                        <path d="M19,9 L9,20 L19,31"></path>
                    </svg>
                    Previous
                `})]}),next:w("button",{part:"next-button",type:"button",name:"navigation",value:"1",children:[w("slot",{name:"next-button",html:`
                    <svg viewBox="0 0 30 40" aria-hidden="true">
                        <path d="M11,9 L21,20 L11,31"></path>
                    </svg>
                    Next
                `})]})};e.controls.prepend(p.prev,p.next),p.updates=a.combine({active:o,changes:i,scroll:c}).each(d=>Do(s,p.prev,p.next,d.changes.elements,d.changes.elements.indexOf(d.active))),p.clicks=r.each(z({'[slot="prev-button"]':(d,f)=>{Ve(t,e.elements,e.active)},'[slot="next-button"]':(d,f)=>{qe(t,e.elements,e.active)},'[name="navigation"]':(d,f)=>{let g=e.elements.indexOf(e.active)+parseFloat(d.value);ht(t,e.elements,g)}}))}function Go(t){let e=t[h];e.navigation.prev.remove(),e.navigation.next.remove(),e.navigation.updates.stop(),e.navigation.clicks.stop(),e.navigation=void 0}function Uo(t){return!!t[h].navigation}var $t={};q($t,{disable:()=>qo,enable:()=>Wo,getState:()=>Vo});function Ke(t,e,o){let{active:r,buttons:i,index:s}=t;if(r===o)return;s>-1&&(t.activeSpan.remove(),i.children[s].part.remove("page-button-active"));let c=e.indexOf(o);c!==-1&&(i.children[c].part.add("page-button-active"),i.children[c].append(t.activeSpan),t.index=c,t.active=o)}function Ro(t,e,o,r){return e.buttons&&(e.buttons.remove(),e.buttons=void 0),r.length<2||(e.buttons=w("div",{part:"pagination",children:r.map((i,s)=>w("button",{part:"page-button",type:"button",name:"pagination",value:s}))}),t.append(e.buttons)),r.length}function Wo(t){let e=t[h],{shadow:o,actives:r,clicks:i,mutations:s}=e,c=e.pagination={activeSpan:w("span",{class:"invisible",text:"(Current slide)"})};c.mutations=s.each(()=>Ro(e.controls,c,o,e.children)),c.updates=a.combine({active:r,children:s}).filter(p=>p.children.length>1).each(p=>Ke(c,e.children,e.active)),c.clicks=i.each(z({'[name="pagination"]':function(p,d){let{host:f}=e,g=e.children,m=g[p.value];!m||(f.active=m,Ke(c,g,m))}}))}function qo(t){let e=t[h];e.pagination.buttons.remove(),e.pagination.mutations.stop(),e.pagination.updates.stop(),e.pagination.clicks.stop(),e.pagination=void 0}function Vo(t){return!!t[h].pagination}var Xt={};q(Xt,{disable:()=>$o,enable:()=>No,getState:()=>Xo});var Qe=document.fullscreenEnabled||document.mozFullscreenEnabled||document.webkitFullscreenEnabled||document.msFullscreenEnabled;function wt(){return document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement}function Je(t){return t.requestFullscreen?t.requestFullscreen():t.webkitRequestFullscreen?t.webkitRequestFullscreen():t.mozRequestFullScreen?t.mozRequestFullScreen():t.msRequestFullscreen?t.msRequestFullscreen():void 0}function vt(){document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen()}function No(t){let e=t[h];if(!Qe)return;let o=e.fullscreen={button:w("button",{part:"fullscreen-button",type:"button",name:"fullscreen",children:[w("slot",{name:"fullscreen-button",html:`
                    <svg viewBox="0 0 40 40" aria-hidden="true">
                        <path class="fullscreen-hidden" d="M9,9 L17,17 M9,15 L9,9 L15,9 M9,31 L17,23 M9,25 L9,31 L15,31 M31,31 L23,23 M25,31 L31,31 L31,25 M31,9 L23,17 M25,9 L31,9 L31,15"></path>
                        <path class="fullscreen-shown"  d="M9,9 L31,31 M9,31 L31,9"></path>
                    </svg>
                    <span class="fullscreen-hidden">Open in fullscreen</span>
                    <span class="fullscreen-shown">Close fullscreen</span>
                `})]})};e.controls.append(o.button),o.changes=x("fullscreenchange",t).filter(r=>wt()===t).each(r=>{document.activeElement!==t&&(o.tabIndex=t.tabIndex,t.tabIndex<0&&(t.tabIndex=0),t.focus());let i=x("fullscreenchange",t).each(s=>{t.tabIndex=o.tabIndex,o.tabIndex=void 0,i.stop()})}),o.clicks=e.clicks.each(z({'[slot="fullscreen-button"], [name="fullscreen"]':(r,i)=>{let s=wt();if(s===t){vt();return}s&&vt(),Je(t)}}))}function $o(t){let e=t[h];wt()===t&&vt(),e.fullscreen.button.remove(),e.fullscreen.clicks.stop(),e.fullscreen.changes.stop(),e.fullscreen=void 0}function Xo(t){return!!t[h].fullscreen}var Ze={active:{attribute:function(t){this.active=t},set:function(t){let e=this[h],o=typeof t=="object"?t:/^\d/.test(t+"")?this.querySelector("#\\3"+(t+"")[0]+" "+(t+"").slice(1)):/^\#/.test(t+"")?this.querySelector(t):this.querySelector("#"+t);e.views.push(o)},get:function(){return this[h].active}},activateNext:{value:function(){let{elements:t,views:e,active:o}=this[h];return e.push(t[t.indexOf(o)+1]),this}},activatePrevious:{value:function(){let{elements:t,views:e,active:o}=this[h];return e.push(t[t.indexOf(o)-1]),this}},autoplay:gt(qt,"autoplay"),controls:Wt({navigation:Nt,pagination:$t,fullscreen:Xt}),loop:gt(Vt,"loop")};var Yo=import.meta.url.replace(/\/[^\/]*\.js/,"/slide-show-shadow.css"),kc=Ot('<ol is="slide-show-ol">',Xe,Ze,Yo);export{kc as default};
