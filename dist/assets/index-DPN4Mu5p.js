var yv=Object.defineProperty;var Sv=(e,t,n)=>t in e?yv(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Ot=(e,t,n)=>Sv(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();const Mv={displayMode:"extend",step:1,pixelsPerUnit:60,showGrid:!0,showLabels:!0},Ev=4;function Zh(e,t){return{x:e,y:t}}function Bu(e,t){return{x:e,y:t}}function sg(e,t){return{x:e,y:t}}class Td{constructor(t,n,i=!0){this.viewport=t,this.pixelsPerUnit=n,this.mirrored=i}setViewport(t){this.viewport=t}videoToCamera(t,n){const{width:i,height:r}=this.viewport,s=Math.max(i/n.width,r/n.height),o=n.width*s,a=n.height*s;return Zh(t.x*o-(o-i)/2,t.y*a-(a-r)/2)}cameraToWorld(t){const{width:n,height:i}=this.viewport,r=this.mirrored?n-t.x:t.x;return Bu(r-n/2,i/2-t.y)}worldToMath(t){return sg(t.x/this.pixelsPerUnit,t.y/this.pixelsPerUnit)}mathToWorld(t){return Bu(t.x*this.pixelsPerUnit,t.y*this.pixelsPerUnit)}mathBounds(){const t=this.viewport.width/2/this.pixelsPerUnit,n=this.viewport.height/2/this.pixelsPerUnit;return{minX:-t,maxX:t,minY:-n,maxY:n}}}function ki(e,t){return{x:e,y:t}}const Jh=ki(0,0);function bv(e,t){return ki(e.x+t.x,e.y+t.y)}function Av(e,t){return ki(e.x-t.x,e.y-t.y)}function pa(e,t){return ki(e.x*t,e.y*t)}function Tv(e){return ki(-e.x,-e.y)}function cl(e,t){return e.x*t.x+e.y*t.y}function wc(e,t){return e.x*t.y-e.y*t.x}function ir(e){return Math.hypot(e.x,e.y)}function og(e){return e.x*e.x+e.y*e.y}function wv(e){const t=ir(e);return t===0?Jh:ki(e.x/t,e.y/t)}function Cv(e){return Math.atan2(e.y,e.x)}function Rv(e,t){return Math.atan2(wc(e,t),cl(e,t))}function ag(e,t){const n=og(t);return n===0?Jh:pa(t,cl(e,t)/n)}function Pv(e,t,n=0){return Math.abs(e.x-t.x)<=n&&Math.abs(e.y-t.y)<=n}function Gt(e,t){return{x:e,y:t}}const Lv=Gt(0,0);function on(e,t){return ki(t.x-e.x,t.y-e.y)}function rn(e,t){return Gt(e.x+t.x,e.y+t.y)}function Be(e,t){return Math.hypot(t.x-e.x,t.y-e.y)}function Iv(e,t){const n=t.x-e.x,i=t.y-e.y;return n*n+i*i}function Dv(e,t,n){return Gt(e.x+(t.x-e.x)*n,e.y+(t.y-e.y)*n)}function cg(e,t){return Dv(e,t,.5)}function Uv(e){if(e.length===0)throw new Error("centroid requires at least one point");let t=0,n=0;for(const i of e)t+=i.x,n+=i.y;return Gt(t/e.length,n/e.length)}function ps(e,t){return{center:e,radius:Math.max(0,t)}}function Nv(e){return 2*e.radius}function Fv(e){return Math.PI*e.radius*e.radius}function wd(e,t){return e.radius*t}function Ov(e,t){return .5*e.radius*e.radius*t}function kv(e){return 2*Math.PI*e.radius}function lg(e,t,n){return{a:e,b:t,c:n}}function Wl(e,t){const n=e.x-t.x,i=e.y-t.y;return Math.hypot(n,i)}function Ta(e){return[Wl(e.b,e.c),Wl(e.c,e.a),Wl(e.a,e.b)]}function Qh(e){const[t,n,i]=Ta(e);if(t===0||n===0||i===0)return[0,0,0];const r=Math.acos(Wc((n*n+i*i-t*t)/(2*n*i))),s=Math.acos(Wc((t*t+i*i-n*n)/(2*t*i))),o=Math.PI-r-s;return[r,s,o]}function Bv(e){return((e.b.x-e.a.x)*(e.c.y-e.a.y)-(e.c.x-e.a.x)*(e.b.y-e.a.y))/2}function zv(e){return Math.abs(Bv(e))}function zu(e){const[t,n,i]=Ta(e);return t+n+i}function Gv(e,t=.01){const[n,i,r]=Ta(e),s=(a,c)=>Math.abs(a-c)<=t*Math.max(a,c),o=(s(n,i)?1:0)+(s(i,r)?1:0)+(s(n,r)?1:0);return o>=2?"equilateral":o===1?"isosceles":"scalene"}function Vv(e,t=.009){const n=Math.max(...Qh(e));return Math.abs(n-Math.PI/2)<=t?"right":n<Math.PI/2?"acute":"obtuse"}function Hv(e){const[t]=Ta(e),[n]=Qh(e),i=Math.sin(n);return i===0?0:t/(2*i)}function Wv(e,t,n){const i=Math.acos(Wc((t*t+n*n-e*e)/(2*t*n))),r=Math.acos(Wc((e*e+n*n-t*t)/(2*e*n))),s=Math.PI-i-r;return{sides:[e,t,n],angles:[i,r,s]}}function Xv(e,t=Gt(0,0)){const[,n,i]=e.sides,[r]=e.angles,s=t,o=Gt(t.x+i,t.y),a=Gt(t.x+n*Math.cos(r),t.y+n*Math.sin(r));return{a:s,b:o,c:a}}function Wc(e){return Math.min(1,Math.max(-1,e))}const $v=e=>e*180/Math.PI;function lo(e,t){return{a:e,b:t}}function qv(e){return Be(e.a,e.b)}function Yv(e){return cg(e.a,e.b)}function ug(e){return{dx:e.b.x-e.a.x,dy:e.b.y-e.a.y}}function tf(e){const{dx:t,dy:n}=ug(e);return t===0?null:n/t}function Kv(e){const t=tf(e);return t===null?null:e.a.y-t*e.a.x}const zt=e=>({kind:"num",value:e}),jv=(e,t=1)=>{if(t===0)throw new Error("rat with zero denominator");t<0&&([e,t]=[-e,-t]);const n=Zv(e,t)||1;return e/=n,t/=n,t===1?{kind:"num",value:e}:{kind:"rat",p:e,q:t}},Zv=(e,t)=>{for(e=Math.abs(e),t=Math.abs(t);t!==0;)[e,t]=[t,e%t];return e},cs=e=>({kind:"var",name:e}),ef=e=>({kind:"neg",arg:e}),ll=(e,t)=>({kind:"call",fn:e,arg:t}),wa=e=>(t,n)=>({kind:"binary",op:e,left:t,right:n}),Vn=wa("+"),Mi=wa("-"),ze=wa("*"),Cr=wa("/"),Fi=wa("^");function Jv(e){return e.form==="trig"?e.fn:e.form}const Cc=.05;function hg(e,t){return(e==="tan"?Math.PI:2*Math.PI)/Math.abs(t||Cc)}function fg(e,t){switch(e.form){case"linear":return e.m*t+e.b;case"quadratic":{const n=t-e.h;return e.a*n*n+e.k}case"trig":{const n=e.b*(t-e.h),i=e.fn==="sin"?Math.sin(n):e.fn==="cos"?Math.cos(n):Math.tan(n);return e.a*i+e.k}}}function Qv(e){const t=cs("x");switch(e.form){case"linear":return Vn(ze(zt(e.m),t),zt(e.b));case"quadratic":return Vn(ze(zt(e.a),Fi(Mi(t,zt(e.h)),zt(2))),zt(e.k));case"trig":return Vn(ze(zt(e.a),ll(e.fn,ze(zt(e.b),Mi(t,zt(e.h))))),zt(e.k))}}function t1(e){switch(e.form){case"linear":return[Gt(0,e.b),Gt(1,e.m+e.b)];case"quadratic":return[Gt(e.h,e.k),Gt(e.h+1,e.k+e.a)];case"trig":{const t=hg(e.fn,e.b),n=e.fn==="cos"?e.h:e.h+t/4;return[Gt(e.h,e.k),Gt(n,e.k+e.a),Gt(e.h+t,e.k)]}}}function e1(e,t,n){switch(e.form){case"linear":{if(t===0)return{...e,b:n.y};const i=Xl(n.x);return{...e,m:(n.y-e.b)/i}}case"quadratic":{if(t===0)return{...e,h:n.x,k:n.y};const i=Xl(n.x-e.h);return{...e,a:(n.y-e.k)/(i*i)}}case"trig":{if(t===0)return{...e,h:n.x,k:n.y};if(t===1)return{...e,a:n.y-e.k};const i=Math.abs(Xl(n.x-e.h)),s=(e.fn==="tan"?Math.PI:2*Math.PI)/i;return{...e,b:e.b<0?-s:s}}}}function n1(e,t){switch(e.form){case"linear":return{...e,b:e.b+t.y-e.m*t.x};case"quadratic":return{...e,h:e.h+t.x,k:e.k+t.y};case"trig":return{...e,h:e.h+t.x,k:e.k+t.y}}}function Xl(e){return Math.abs(e)>=Cc?e:e<0?-Cc:Cc}function ul(e){return rn(e.tail,e.v)}function Rc(e){return Gt(e.center.x+e.radius*Math.cos(e.angle),e.center.y+e.radius*Math.sin(e.angle))}function dg(e){const t=Math.cos(e.angle),n=Math.sin(e.angle),i=(r,s)=>Gt(e.center.x+r*t-s*n,e.center.y+r*n+s*t);return[i(e.half,e.half),i(-e.half,e.half),i(-e.half,-e.half),i(e.half,-e.half)]}function i1(e){return{kind:"square",center:e.center,half:e.half*Math.SQRT2,angle:Pc(e.angle+Math.PI/4)}}function Pc(e){const t=e%(2*Math.PI);return t<0?t+2*Math.PI:t}function pg(e){return 2*Math.PI/e}function r1(e){const t=e.filled*pg(e.divisions);return Gt(e.center.x+e.radius*Math.cos(t),e.center.y+e.radius*Math.sin(t))}function s1(e){return Gt(e.center.x,e.center.y-e.radius)}function hl(e){switch(e.kind){case"point":return[e.at];case"vector":return[e.tail,ul(e)];case"circle":return[e.circle.center,rn(e.circle.center,ki(e.circle.radius,0))];case"triangle":return[e.tri.a,e.tri.b,e.tri.c];case"segment":return[e.seg.a,e.seg.b];case"graph":return t1(e.graph);case"unitCircle":return[e.center,Rc(e)];case"fractionCircle":return[e.center,s1(e),r1(e)];case"square":return[e.center,dg(e)[0]]}}function mg(e,t,n){switch(e.kind){case"point":return{kind:"point",at:n};case"vector":return t===0?{kind:"vector",tail:n,v:on(n,ul(e))}:{kind:"vector",tail:e.tail,v:on(e.tail,n)};case"circle":return t===0?{kind:"circle",circle:ps(n,e.circle.radius)}:{kind:"circle",circle:ps(e.circle.center,Be(e.circle.center,n))};case"triangle":{const i=[e.tri.a,e.tri.b,e.tri.c];return i[t]=n,{kind:"triangle",tri:lg(...i)}}case"segment":return t===0?{kind:"segment",seg:lo(n,e.seg.b)}:{kind:"segment",seg:lo(e.seg.a,n)};case"graph":return{kind:"graph",graph:e1(e.graph,t,n)};case"unitCircle":{if(t===0)return{...e,center:n};const i=on(e.center,n);return{...e,angle:Pc(Math.atan2(i.y,i.x)),radius:Math.max(Be(e.center,n),.05)}}case"fractionCircle":{if(t===0)return{...e,center:n};if(t===1)return{...e,radius:Math.max(Be(e.center,n),.1)};const i=on(e.center,n),r=Pc(Math.atan2(i.y,i.x)),s=Math.max(0,Math.min(e.divisions,Math.round(r/pg(e.divisions))));return{...e,filled:s}}case"square":{if(t===0)return{...e,center:n};const i=on(e.center,n);return{...e,angle:Pc(Math.atan2(i.y,i.x)-Math.PI/4),half:Math.max(ir(i)/Math.SQRT2,.05)}}}}function nf(e,t){switch(e.kind){case"point":return{kind:"point",at:rn(e.at,t)};case"vector":return{kind:"vector",tail:rn(e.tail,t),v:e.v};case"circle":return{kind:"circle",circle:ps(rn(e.circle.center,t),e.circle.radius)};case"triangle":return{kind:"triangle",tri:lg(rn(e.tri.a,t),rn(e.tri.b,t),rn(e.tri.c,t))};case"segment":return{kind:"segment",seg:lo(rn(e.seg.a,t),rn(e.seg.b,t))};case"graph":return{kind:"graph",graph:n1(e.graph,t)};case"unitCircle":return{...e,center:rn(e.center,t)};case"fractionCircle":return{...e,center:rn(e.center,t)};case"square":return{...e,center:rn(e.center,t)}}}function o1(e,t,n){const i=hl(e);let r=null,s=n*n;for(let o=0;o<i.length;o++){const a=Iv(i[o],t);a<=s&&(r=o,s=a)}return r}function a1(e,t,n){switch(e.kind){case"point":return Be(e.at,t)<=n;case"vector":return Cs(e.tail,ul(e),t)<=n;case"circle":return Be(e.circle.center,t)<=e.circle.radius+n;case"triangle":return m1(e.tri,t)||Cs(e.tri.a,e.tri.b,t)<=n||Cs(e.tri.b,e.tri.c,t)<=n||Cs(e.tri.c,e.tri.a,t)<=n;case"segment":return Cs(e.seg.a,e.seg.b,t)<=n;case"graph":{const i=Math.max(4*n,.25),r=8;let s=Pd(e.graph,t.x-i);for(let o=1;o<=r;o++){const a=t.x-i+2*i*o/r,c=Pd(e.graph,a);if(Cs(s,c,t)<=n)return!0;s=c}return!1}case"unitCircle":return Be(e.center,t)<=e.radius+n;case"fractionCircle":return Be(e.center,t)<=e.radius+n;case"square":{const i=on(e.center,t),r=Math.cos(e.angle),s=Math.sin(e.angle),o=i.x*r+i.y*s,a=-i.x*s+i.y*r;return Math.abs(o)<=e.half+n&&Math.abs(a)<=e.half+n}}}function c1(e){switch(e.kind){case"circle":case"unitCircle":case"fractionCircle":case"segment":case"vector":case"triangle":case"square":return!0;case"point":case"graph":return!1}}function l1(e,t){switch(e.kind){case"point":case"graph":return t;case"vector":{const n=t,i=ir(e.v),r=ir(n.v);return r<1e-9?e:{kind:"vector",tail:n.tail,v:pa(n.v,i/r)}}case"circle":return{kind:"circle",circle:ps(t.circle.center,e.circle.radius)};case"unitCircle":return{...t,radius:e.radius};case"fractionCircle":return{...t,radius:e.radius};case"segment":{const n=t,i=Be(e.seg.a,e.seg.b),r=Be(e.seg.a,n.seg.a)>1e-9,s=r?n.seg.b:n.seg.a,o=r?n.seg.a:n.seg.b,a=on(s,o),c=ir(a),l=c<1e-9?o:rn(s,pa(a,i/c));return{kind:"segment",seg:r?lo(l,s):lo(s,l)}}case"triangle":{const n=t;return Math.abs(zu(n.tri)-zu(e.tri))>1e-9?e:n}case"square":return{...t,half:e.half}}}function u1(e){return e.kind!=="graph"}function Cd(e){switch(e.kind){case"point":return e.at;case"vector":return e.tail;case"circle":return e.circle.center;case"unitCircle":case"fractionCircle":case"square":return e.center;case"segment":return cg(e.seg.a,e.seg.b);case"triangle":return Uv([e.tri.a,e.tri.b,e.tri.c]);case"graph":return null}}function h1(e,t){const n=Cd(t),i=Cd(e);return!n||!i?t:nf(t,on(n,i))}const to=.3;function eo(e){return Gt(Math.round(e.x),Math.round(e.y))}function f1(e,t){switch(e.kind){case"circle":case"unitCircle":return t===0?"position":"resize";case"fractionCircle":return t===0?"position":t===1?"resize":"none";case"square":return t===0?"position":"handle";case"point":case"vector":case"segment":case"triangle":case"graph":return"handle"}}function Rd(e){if(e.kind==="circle"){const t=eo(e.circle.center);return Be(e.circle.center,t)>to?e:{kind:"circle",circle:ps(t,e.circle.radius)}}if(e.kind==="unitCircle"||e.kind==="fractionCircle"||e.kind==="square"){const t=eo(e.center);return Be(e.center,t)>to?e:{...e,center:t}}if(e.kind==="point"||e.kind==="vector"||e.kind==="segment"||e.kind==="triangle"){let t=null,n=to;for(const i of hl(e)){const r=eo(i),s=Be(i,r);s<=n&&(n=s,t=on(i,r))}return t?nf(e,t):e}return e}function d1(e,t){const n=hl(e)[t],i=eo(n);return Be(n,i)>to?e:mg(e,t,i)}function p1(e,t){if(e.kind==="circle"){const n=eo(t);if(Be(t,n)>to)return e;const i=Be(e.circle.center,n);return i<.05?e:{kind:"circle",circle:ps(e.circle.center,i)}}if(e.kind==="unitCircle"||e.kind==="fractionCircle"){const n=eo(t);if(Be(t,n)>to)return e;const i=Be(e.center,n);return i<.05?e:{...e,radius:i}}return e}function Pd(e,t){return Gt(t,fg(e,t))}function Cs(e,t,n){const i=on(e,t),r=og(i);if(r===0)return Be(e,n);const s=Math.max(0,Math.min(1,cl(on(e,n),i)/r));return Be(n,rn(e,pa(i,s)))}function m1(e,t){const n=wc(on(e.a,e.b),on(e.a,t)),i=wc(on(e.b,e.c),on(e.b,t)),r=wc(on(e.c,e.a),on(e.c,t)),s=n<0||i<0||r<0,o=n>0||i>0||r>0;return!(s&&o)}function Ir(e){return ea(e,0)}function ea(e,t){switch(e.kind){case"num":return e.value<0?Ha(String(e.value),0,t):String(e.value);case"rat":return Ha(`${e.p}/${e.q}`,e.p<0?0:2,t);case"var":case"param":return e.name;case"const":return e.name;case"neg":return Ha(`-${ea(e.arg,3)}`,2,t);case"binary":{const n=e.op==="+"||e.op==="-"?1:e.op==="^"?3:2,i=ea(e.left,e.op==="^"?n+1:n),r=ea(e.right,e.op==="^"?n:n+1);return Ha(`${i} ${e.op} ${r}`,n,t)}case"call":return`${e.fn}(${ea(e.arg,0)})`}}function Ha(e,t,n){return t<n?`(${e})`:e}const Oe={p:0,q:1},wn={p:1,q:1};function g1(e,t){for(e=Math.abs(e),t=Math.abs(t);t!==0;)[e,t]=[t,e%t];return e}function ge(e,t=1){if(t===0)throw new Error("Rational with zero denominator");if(!Number.isInteger(e)||!Number.isInteger(t))throw new Error(`Rational parts must be integers: ${e}/${t}`);t<0&&(e=-e,t=-t);const n=g1(e,t)||1;return{p:e/n,q:t/n}}const fr=(e,t)=>ge(e.p*t.q+t.p*e.q,e.q*t.q),Di=(e,t)=>ge(e.p*t.q-t.p*e.q,e.q*t.q),qe=(e,t)=>ge(e.p*t.p,e.q*t.q),pn=(e,t)=>{if(t.p===0)throw new Error("Rational division by zero");return ge(e.p*t.q,e.q*t.p)},Ke=e=>({p:-e.p,q:e.q}),ms=e=>e.p<0?Ke(e):e;function rf(e,t){if(!Number.isInteger(t))throw new Error(`Rational pow needs integer exponent: ${t}`);if(t<0)return pn(wn,rf(e,-t));let n=wn;for(let i=0;i<t;i++)n=qe(n,e);return n}const ue=e=>e.p===0,gs=e=>e.p===1&&e.q===1,Hn=e=>e.q===1,xn=e=>e.p<0,sf=(e,t)=>e.p===t.p&&e.q===t.q,Dr=(e,t)=>e.p*t.q-t.p*e.q,_1=e=>Number.isSafeInteger(e.p)&&Number.isSafeInteger(e.q),Gu=e=>e.p/e.q,Tn=e=>e.q===1?String(e.p):`${e.p}/${e.q}`;function ma(e){if(e.p<0)return null;const t=Math.round(Math.sqrt(e.p)),n=Math.round(Math.sqrt(e.q));return t*t===e.p&&n*n===e.q?ge(t,n):null}function v1(e,t=1e-9,n=1e6){if(!Number.isFinite(e))return null;if(Number.isInteger(e))return Number.isSafeInteger(e)?ge(e):null;const i=e<0?-1:1;let r=Math.abs(e),s=0,o=1,a=1,c=0;for(let l=0;l<64;l++){const u=Math.floor(r),h=u*o+s,f=u*c+a;if(f>n)return null;if(Math.abs(h/f-Math.abs(e))<=t)return ge(i*h,f);const d=r-u;if(d===0)return null;r=1/d,[s,o,a,c]=[o,h,c,f]}return null}function rr(e){if(e.kind==="rat")return{p:e.p,q:e.q};if(e.kind==="num"&&Number.isSafeInteger(e.value))return ge(e.value);if(e.kind==="neg"){const t=rr(e.arg);return t?Ke(t):null}return null}const ae=e=>jv(e.p,e.q);function na(e){switch(e.kind){case"num":{if(Number.isInteger(e.value))return e;const t=v1(e.value);return t?ae(t):e}case"rat":case"var":case"param":case"const":return e;case"neg":return ef(na(e.arg));case"binary":return{kind:"binary",op:e.op,left:na(e.left),right:na(e.right)};case"call":return{kind:"call",fn:e.fn,arg:na(e.arg)}}}function De(e,t){if(e.kind!==t.kind)return!1;switch(e.kind){case"num":return e.value===t.value;case"rat":{const n=t;return e.p===n.p&&e.q===n.q}case"var":case"param":case"const":return e.name===t.name;case"neg":return De(e.arg,t.arg);case"binary":{const n=t;return e.op===n.op&&De(e.left,n.left)&&De(e.right,n.right)}case"call":{const n=t;return e.fn===n.fn&&De(e.arg,n.arg)}}}const Ld={num:0,rat:0,const:1,param:2,var:3,call:4,neg:5,binary:6};function es(e,t){const n=Ld[e.kind]-Ld[t.kind];if(n!==0)return n;switch(e.kind){case"num":case"rat":{const i=e.kind==="num"?e.value:e.p/e.q,r=t.kind==="num"?t.value:t.kind==="rat"?t.p/t.q:0;return i-r}case"var":case"param":case"const":{const i=t.name;return e.name<i?-1:e.name>i?1:0}case"call":{const i=t;return e.fn!==i.fn?e.fn<i.fn?-1:1:es(e.arg,i.arg)}case"neg":return es(e.arg,t.arg);case"binary":{const i=t;return e.op!==i.op?e.op<i.op?-1:1:es(e.left,i.left)||es(e.right,i.right)}}}const ga=e=>({coef:Ke(e.coef),factors:e.factors});function x1(e,t){const n=[...e];for(const i of t){const r=n.findIndex(s=>De(s.base,i.base));r===-1?n.push(i):n[r]={base:n[r].base,exp:fr(n[r].exp,i.exp)}}return n.filter(i=>!ue(i.exp)).sort((i,r)=>es(i.base,r.base))}function Id(e,t){return{coef:qe(e.coef,t.coef),factors:x1(e.factors,t.factors)}}function y1(e){return ue(e.coef)?null:{coef:pn(wn,e.coef),factors:e.factors.map(t=>({base:t.base,exp:Ke(t.exp)}))}}function Gn(e){const t=rr(e);if(t)return{coef:t,factors:[]};switch(e.kind){case"neg":return ga(Gn(e.arg));case"binary":switch(e.op){case"*":return Id(Gn(e.left),Gn(e.right));case"/":{const n=y1(Gn(e.right));if(!n)break;return Id(Gn(e.left),n)}case"^":{const n=rr(e.right);if(n&&Hn(n)){const i=Gn(e.left);if(n.p>=0||!ue(i.coef))return{coef:rf(i.coef,n.p),factors:i.factors.map(r=>({base:r.base,exp:qe(r.exp,n)}))}}break}}break}return{coef:wn,factors:[{base:e,exp:wn}]}}function xi(e){if(ue(e.coef))return zt(0);if(e.factors.length===0)return ae(e.coef);const t=[],n=[];for(const o of[...e.factors].sort((a,c)=>es(a.base,c.base))){const a=xn(o.exp)?{base:o.base,exp:Ke(o.exp)}:o,c=gs(a.exp)?a.base:Fi(a.base,ae(a.exp));(xn(o.exp)?n:t).push(c)}const i=ms(e.coef);n.length>0?(i.p!==1&&t.unshift(zt(i.p)),i.q!==1&&n.unshift(zt(i.q))):gs(i)||t.unshift(ae(i));const r=o=>o.length===0?zt(1):o.reduce((a,c)=>ze(a,c)),s=n.length>0?Cr(r(t),r(n)):r(t);return xn(e.coef)?ef(s):s}const Vu=e=>Ir(xi({coef:wn,factors:e}));function mi(e){switch(e.kind){case"neg":return mi(e.arg).map(ga);case"binary":if(e.op==="+")return[...mi(e.left),...mi(e.right)];if(e.op==="-")return[...mi(e.left),...mi(e.right).map(ga)];break}return[Gn(e)]}function Dd(e){let t=0;for(const n of e.factors)n.base.kind==="var"&&(t+=Gu(n.exp));return t}function S1(e,t){const n=Dd(t)-Dd(e);if(n!==0)return n;const i=Vu(e.factors),r=Vu(t.factors);return i!==r?i<r?-1:1:Dr(t.coef,e.coef)}function Ca(e){const t=e.filter(i=>!ue(i.coef)).sort(S1);if(t.length===0)return zt(0);let n=xi(t[0]);for(const i of t.slice(1))n=xn(i.coef)?Mi(n,xi(ga(i))):Vn(n,xi(i));return n}function Ur(e,t){const n=[];for(const i of mi(e)){let r=0;if(i.factors.length===1){const s=i.factors[0];if(s.base.kind!=="var"||s.base.name!==t||!Hn(s.exp)||s.exp.p<0)return null;r=s.exp.p}else if(i.factors.length>1)return null;for(;n.length<=r;)n.push(Oe);n[r]=fr(n[r],i.coef)}for(;n.length>1&&ue(n[n.length-1]);)n.pop();return n.length===0?[Oe]:n}function gi(e,t){const n={kind:"var",name:t},i=e.map((r,s)=>({coef:r,factors:s===0?[]:[{base:n,exp:ge(s)}]}));return Ca(i)}function ia(e,t=new Set){switch(e.kind){case"var":return t.add(e.name),t;case"neg":return ia(e.arg,t);case"call":return ia(e.arg,t);case"binary":return ia(e.left,t),ia(e.right,t);default:return t}}function gg(e){switch(e.kind){case"neg":case"call":return[e.arg];case"binary":return[e.left,e.right];default:return[]}}function M1(e,t,n){switch(e.kind){case"neg":return{kind:"neg",arg:n};case"call":return{kind:"call",fn:e.fn,arg:n};case"binary":return t===0?{kind:"binary",op:e.op,left:n,right:e.right}:{kind:"binary",op:e.op,left:e.left,right:n};default:throw new Error(`No child ${t} on ${e.kind}`)}}function _g(e,t,n){if(t.length===0)return n;const[i,...r]=t;return M1(e,i,_g(gg(e)[i],r,n))}function vg(e,t,n,i){const r=()=>{for(const o of e){const a=o.apply(t);if(a!==null&&!De(a,t))return{rewritten:a,rule:o,path:n}}return null};if(i==="outermost"){const o=r();if(o)return o}const s=gg(t);for(let o=0;o<s.length;o++){const a=vg(e,s[o],[...n,o],i);if(a)return a}return i==="outermost"?null:r()}function E1(e,t,n="innermost"){const i=vg(e,t,[],n);return i?{rule:i.rule.name,description:i.rule.description,before:t,after:_g(t,i.path,i.rewritten),path:i.path}:null}function of(e,t,n="innermost",i=300){const r=[];let s=t;for(let o=0;o<i;o++){const a=E1(e,s,n);if(!a)return{result:s,steps:r,converged:!0};r.push(a),s=a.after}return{result:s,steps:r,converged:!1}}const Cn=rr,Nr=e=>{const t=Cn(e);return t!==null&&ue(t)},_a=e=>{const t=Cn(e);return t!==null&&gs(t)},Ei=e=>e.kind==="binary"&&(e.op==="+"||e.op==="-"),jr=e=>_1(e)?ae(e):null;function xg(e){const t=[...ia(e)];return t.length===1?t[0]:null}const b1={name:"arithmetic",description:"compute the constant arithmetic exactly",apply(e){if(e.kind==="neg"){const i=Cn(e.arg);return i?jr(Ke(i)):null}if(e.kind!=="binary")return null;const t=Cn(e.left),n=Cn(e.right);if(!t||!n)return null;switch(e.op){case"+":return jr(fr(t,n));case"-":return jr(Di(t,n));case"*":return jr(qe(t,n));case"/":return ue(n)?null:jr(pn(t,n));case"^":return!Hn(n)||ue(t)&&n.p<0?null:jr(rf(t,n.p))}}},A1={name:"add zero",description:"adding or subtracting zero changes nothing",apply(e){return Ei(e)?Nr(e.right)?e.left:e.op==="+"&&Nr(e.left)?e.right:null:null}},T1={name:"subtract from zero",description:"0 − x is the opposite of x",apply(e){return e.kind==="binary"&&e.op==="-"&&Nr(e.left)?ef(e.right):null}},w1={name:"multiply by one",description:"multiplying by 1 changes nothing",apply(e){return e.kind!=="binary"||e.op!=="*"?null:_a(e.left)?e.right:_a(e.right)?e.left:null}},C1={name:"multiply by zero",description:"anything times zero is zero",apply(e){return e.kind!=="binary"||e.op!=="*"?null:Nr(e.left)||Nr(e.right)?zt(0):null}},R1={name:"divide by one",description:"dividing by 1 changes nothing",apply(e){return e.kind==="binary"&&e.op==="/"&&_a(e.right)?e.left:null}},P1={name:"zero divided",description:"zero divided by anything (nonzero) is zero",apply(e){return e.kind!=="binary"||e.op!=="/"?null:Nr(e.left)&&!Nr(e.right)?zt(0):null}},L1={name:"exponent one",description:"x¹ is just x",apply(e){return e.kind==="binary"&&e.op==="^"&&_a(e.right)?e.left:null}},I1={name:"exponent zero",description:"anything to the zeroth power is 1",apply(e){return e.kind==="binary"&&e.op==="^"&&Nr(e.right)?zt(1):null}},D1={name:"power of one",description:"1 to any power is 1",apply(e){return e.kind==="binary"&&e.op==="^"&&_a(e.left)?zt(1):null}},U1={name:"subtract a negative",description:"subtracting a negative is adding",apply(e){if(e.kind!=="binary"||e.op!=="-")return null;const t=Cn(e.right);return!t||!xn(t)?null:Vn(e.left,ae(ms(t)))}},N1={name:"add a negative",description:"adding a negative is subtracting",apply(e){if(e.kind!=="binary"||e.op!=="+")return null;const t=Cn(e.right);return!t||!xn(t)?null:Mi(e.left,ae(ms(t)))}},F1={name:"double negative",description:"the opposite of the opposite is the original",apply(e){return e.kind==="neg"&&e.arg.kind==="neg"?e.arg.arg:null}},O1={name:"power of a power",description:"(xᵃ)ᵇ = xᵃᵇ — multiply the exponents",apply(e){if(e.kind!=="binary"||e.op!=="^"||e.left.kind!=="binary"||e.left.op!=="^")return null;const t=Cn(e.left.right),n=Cn(e.right);if(!t||!n||!Hn(t)||!Hn(n))return null;const i=jr(qe(t,n));return i?Fi(e.left.left,i):null}},k1={name:"power of a product",description:"(xy)ⁿ = xⁿyⁿ — the exponent distributes over multiplication",apply(e){if(e.kind!=="binary"||e.op!=="^")return null;const t=Cn(e.right);if(!t||!Hn(t)||e.left.kind!=="binary"||e.left.op!=="*"&&e.left.op!=="/")return null;const n=Fi(e.left.left,ae(t)),i=Fi(e.left.right,ae(t));return e.left.op==="*"?ze(n,i):Cr(n,i)}},B1={name:"product of powers",description:"xᵃ·xᵇ = xᵃ⁺ᵇ — add the exponents of the repeated base",apply(e){if(e.kind!=="binary"||e.op!=="*")return null;const t=Gn(e.left),n=Gn(e.right);return t.factors.some(r=>n.factors.some(s=>De(r.base,s.base)))?xi(Gn(e)):null}},z1={name:"combine factors",description:"rewrite the product in standard order, constants first",apply(e){return e.kind!=="binary"||e.op!=="*"?null:xi(Gn(e))}},G1={name:"combine like terms",description:"add the coefficients of terms with the same variable part",apply(e){if(!Ei(e))return null;const t=mi(e),n=new Map;for(const s of t){const o=Vu(s.factors),a=n.get(o);a?a.push(s):n.set(o,[s])}if(!([...n.values()].some(s=>s.length>1)||t.some(s=>ue(s.coef))))return null;const r=[...n.values()].map(s=>s.reduce((o,a)=>({coef:fr(o.coef,a.coef),factors:o.factors})));return Ca(r)}},V1={name:"add fractions",description:"put both fractions over a common denominator",apply(e){if(!Ei(e))return null;const t=e.left,n=e.right;if(t.kind!=="binary"||t.op!=="/"||n.kind!=="binary"||n.op!=="/")return null;const i=e.op==="+"?Vn:Mi;return De(t.right,n.right)?Cr(i(t.left,n.left),t.right):Cr(i(ze(t.left,n.right),ze(n.left,t.right)),ze(t.right,n.right))}},H1={name:"cancel common factors",description:"divide the numerator and denominator by their common factor",apply(e){if(e.kind!=="binary"||e.op!=="/")return null;const t=Gn(e.right);return t.factors.length===0||ue(t.coef)?null:xi(Gn(e))}},W1={name:"binomial square",description:"(a ± b)² = a² ± 2ab + b²",apply(e){if(e.kind!=="binary"||e.op!=="^")return null;const t=Cn(e.right);if(!t||!sf(t,ge(2))||!Ei(e.left))return null;const{left:n,op:i,right:r}=e.left,s=Fi(n,zt(2)),o=Fi(r,zt(2)),a=ze(ze(zt(2),n),r);return Vn(i==="+"?Vn(s,a):Mi(s,a),o)}},X1={name:"expand the power",description:"(a + b)ⁿ = (a + b)·(a + b)ⁿ⁻¹",apply(e){if(e.kind!=="binary"||e.op!=="^"||!Ei(e.left))return null;const t=Cn(e.right);return!t||!Hn(t)||t.p<3?null:ze(e.left,Fi(e.left,zt(t.p-1)))}},$1={name:"distribute",description:"multiply each term inside the parentheses",apply(e){if(e.kind!=="binary"||e.op!=="*")return null;if(Ei(e.right)){const{left:t,op:n,right:i}=e.right;return(n==="+"?Vn:Mi)(ze(e.left,t),ze(e.left,i))}if(Ei(e.left)){const{left:t,op:n,right:i}=e.left;return(n==="+"?Vn:Mi)(ze(t,e.right),ze(i,e.right))}return null}},q1={name:"factor out the GCF",description:"pull the greatest common factor out of every term",apply(e){if(!Ei(e))return null;const t=mi(e);if(t.length<2||!t.every(o=>Hn(o.coef)&&!ue(o.coef)))return null;let n=Math.abs(t[0].coef.p);for(const o of t.slice(1)){let a=Math.abs(o.coef.p);for(;a!==0;)[n,a]=[a,n%a]}let i=t[0].factors.filter(o=>Hn(o.exp)&&o.exp.p>0);for(const o of t.slice(1))i=i.flatMap(a=>{const c=o.factors.find(l=>De(l.base,a.base)&&Hn(l.exp)&&l.exp.p>0);return c?[{base:a.base,exp:Dr(c.exp,a.exp)<0?c.exp:a.exp}]:[]});if(n<=1&&i.length===0)return null;const r={coef:ge(n),factors:i},s=t.map(o=>({coef:pn(o.coef,r.coef),factors:o.factors.map(a=>{const c=i.find(l=>De(l.base,a.base));return c?{base:a.base,exp:Di(a.exp,c.exp)}:a}).filter(a=>!ue(a.exp))}));return ze(xi(r),Ca(s))}};function Ud(e){const t=ma(e.coef);if(!t)return null;const n=[];for(const i of e.factors){if(!Hn(i.exp)||i.exp.p<=0||i.exp.p%2!==0)return null;n.push({base:i.base,exp:ge(i.exp.p/2)})}return{coef:t,factors:n}}const Y1={name:"difference of squares",description:"a² − b² = (a − b)(a + b)",apply(e){if(!Ei(e))return null;const t=mi(e);if(t.length!==2)return null;const n=t.find(c=>Dr(c.coef,Oe)>0),i=t.find(c=>Dr(c.coef,Oe)<0);if(!n||!i)return null;const r=Ud(n),s=Ud({coef:Ke(i.coef),factors:i.factors});if(!r||!s)return null;const o=xi(r),a=xi(s);return ze(Mi(o,a),Vn(o,a))}},K1={name:"perfect square trinomial",description:"a² ± 2ab + b² = (a ± b)²",apply(e){if(!Ei(e))return null;const t=xg(e);if(!t)return null;const n=Ur(e,t);if(!n||n.length!==3)return null;const[i,r,s]=n;if(!sf(qe(r,r),qe(ge(4),qe(s,i))))return null;const o=ma(s),a=ma(i);if(!o||!a)return null;const c={kind:"var",name:t},l=Dr(r,Oe)<0?Ke(a):a,u=Ca([{coef:o,factors:[{base:c,exp:wn}]},{coef:l,factors:[]}]);return Fi(u,zt(2))}},j1={name:"factor the quadratic",description:"find two roots and write a(x − r₁)(x − r₂)",apply(e){if(!Ei(e))return null;const t=xg(e);if(!t)return null;const n=Ur(e,t);if(!n||n.length!==3||ue(n[2]))return null;const[i,r,s]=n,o=Di(qe(r,r),qe(ge(4),qe(s,i))),a=ma(o);if(!a)return null;const c=qe(ge(2),s),l=[pn(Di(Ke(r),a),c),pn(fr(Ke(r),a),c)],u=l.map(d=>gi([ge(-d.p),ge(d.q)],t));u.sort(es);const h=pn(s,ge(l[0].q*l[1].q));return(gs(h)?u:[ae(h),...u]).reduce((d,g)=>ze(d,g))}},Z1={name:"simplify the radical",description:"√(a²b) = a√b — pull perfect squares out of the root",apply(e){if(e.kind!=="call"||e.fn!=="sqrt")return null;const t=Cn(e.arg);if(!t||xn(t))return null;const n=ma(t);if(n)return ae(n);if(!Hn(t))return null;const i=t.p;for(let r=Math.floor(Math.sqrt(i));r>=2;r--)if(i%(r*r)===0)return ze(zt(r),ll("sqrt",zt(i/(r*r))));return null}},J1={name:"rationalize the denominator",description:"multiply top and bottom by the root to clear it below",apply(e){if(e.kind!=="binary"||e.op!=="/")return null;const t=e.right;if(t.kind!=="call"||t.fn!=="sqrt")return null;const n=Cn(t.arg);return!n||Dr(n,Oe)<=0?null:Cr(ze(e.left,t),ae(n))}},Q1=[b1,A1,T1,w1,C1,R1,P1,L1,I1,D1,U1,N1,F1],af=[...Q1,O1,k1,B1,G1,V1,H1,z1,Z1,J1],yg=[W1,X1,$1,...af],Sg=[...af,q1,Y1,K1,j1];[...new Set([...yg,...Sg])];const Xc=e=>of(af,e),Lc=e=>of(yg,e),Mg=e=>of(Sg,e,"outermost"),Zt=(e,t,n="=")=>({lhs:e,rhs:t,rel:n}),t2={"=":"=","<":">","<=":">=",">":"<",">=":"<="},e2={"=":"=","<":"<","<=":"≤",">":">",">=":"≥"},n2=e=>`${Ir(e.lhs)} ${e2[e.rel]} ${Ir(e.rhs)}`;function i2(e,t){const n=[],i=(d,g,x,p)=>{n.push({rule:d,description:g,before:x,after:p})};let r=e;const s=Zt(Xc(e.lhs).result,Xc(e.rhs).result,e.rel);(!De(s.lhs,r.lhs)||!De(s.rhs,r.rhs))&&(i("simplify","combine like terms on each side",r,s),r=s);const o=Ur(r.lhs,t),a=Ur(r.rhs,t);if(!o||!a||o.length>2||a.length>2)return{status:"not-linear",result:null,steps:n};let c=o[1]??Oe,l=o[0];const u=a[1]??Oe;let h=a[0];const f=(d,g)=>Zt(gi(d,t),gi(g,t),r.rel);if(!ue(u)){const d=gi([Oe,u],t),g=f([l,Di(c,u)],[h]);i("subtract from both sides",`subtract ${Ir(d)} from both sides`,r,g),r=g,c=Di(c,u)}if(ue(c))return{status:r2(r.rel,Dr(l,h))?"identity":"contradiction",result:null,steps:n};if(!ue(l)){const d=xn(l)?"add":"subtract",g=ae(ms(l)),x=f([Oe,c],[Di(h,l)]);i(`${d} on both sides`,`${d} ${Ir(g)} ${d==="add"?"to":"from"} both sides`,r,x),r=x,h=Di(h,l)}if(!gs(c)){const d=xn(c)&&r.rel!=="="?t2[r.rel]:r.rel,g={lhs:gi([Oe,wn],t),rhs:ae(pn(h,c)),rel:d};i("divide both sides",`divide both sides by ${Tn(c)}${d!==r.rel?" (negative: flip the inequality)":""}`,r,g),r=g}return{status:"solved",result:r,steps:n}}function r2(e,t){switch(e){case"=":return t===0;case"<":return t<0;case"<=":return t<=0;case">":return t>0;case">=":return t>=0}}const s2=e=>e.equations.map(n2).join(e.join==="or"?"  or  ":"  and  "),Me=(e,t,...n)=>({rule:e,description:t,equations:n,join:"or"}),o2=e=>{const t=rr(e);return t!==null&&ue(t)};function cf(e){if(xn(e))return null;if(ue(e))return{m:Oe,r:1};const t=e.p*e.q;if(!Number.isSafeInteger(t))return null;let n=1,i=t;for(let r=Math.floor(Math.sqrt(t));r>=2;r--)if(t%(r*r)===0){n=r,i=t/(r*r);break}return{m:ge(n,e.q),r:i}}function uo(e,t,n){return n===1?ae(fr(e,t)):Ca([{coef:e,factors:[]},{coef:t,factors:[{base:ll("sqrt",zt(n)),exp:wn}]}])}function lf(e,t,n){const i=ms(t);return ue(i)?[ae(e)]:n===1?[ae(Di(e,i)),ae(fr(e,i))]:[uo(e,Ke(i),n),uo(e,i,n)]}function a2(e,t,n){switch(n){case"square-root":return l2(e,t);case"factoring":return u2(e,t);case"complete-square":return h2(e,t);case"formula":return f2(e,t)}}function c2(e,t){const n=Zt(Xc(e.lhs).result,Xc(e.rhs).result,e.rel);return!De(n.lhs,e.lhs)||!De(n.rhs,e.rhs)?(t.push(Me("simplify","simplify each side",n)),n):e}function uf(e,t){if(e.rel!=="=")return null;const n=[],i=Zt(Lc(e.lhs).result,Lc(e.rhs).result);let r=e;if((!De(i.lhs,e.lhs)||!De(i.rhs,e.rhs))&&(n.push(Me("expand","multiply out and combine like terms",i)),r=i),!o2(r.rhs)){const a=Zt(Lc(Mi(r.lhs,r.rhs)).result,zt(0));n.push(Me("move everything to one side",`subtract ${Ir(r.rhs)} from both sides`,a)),r=a}const s=Ur(r.lhs,t);if(!s||s.length!==3||ue(s[2]))return null;const o=Zt(gi(s,t),zt(0));return De(o.lhs,r.lhs)||(n.push(Me("standard form","write the terms in descending degree",o)),r=o),{a:s[2],b:s[1],c:s[0],eq:r,steps:n}}function l2(e,t){if(e.rel!=="=")return{status:"not-quadratic",roots:[],steps:[]};const n=[],i=c2(e,n),r={status:"does-not-apply",roots:[],steps:n},s=ge(2);let o=null,a=null,c=null,l=Oe;const u=[...mi(i.lhs),...mi(i.rhs).map(ga)];for(const E of u){if(E.factors.length===0){l=fr(l,E.coef);continue}if(o!==null||E.factors.length!==1)return r;const z=E.factors[0];if(!sf(z.exp,s))return r;const C=Ur(z.base,t);if(!C||C.length!==2)return r;o=E.coef,a=z.base,c=C}if(o===null||a===null||c===null||ue(o))return r;const h=E=>xi({coef:E,factors:[{base:a,exp:s}]});let f=Ke(l),d=Zt(h(o),ae(f));if((!De(d.lhs,i.lhs)||!De(d.rhs,i.rhs))&&n.push(Me("isolate the square","move the constants to the other side",d)),gs(o)||(f=pn(f,o),d=Zt(h(wn),ae(f)),n.push(Me("divide both sides",`divide both sides by ${Tn(o)}`,d))),xn(f))return n.push(Me("no real solutions","a square is never negative",d)),{status:"no-real-roots",roots:[],steps:n};const g=cf(f);if(!g)return r;const x=ue(g.m)?[Zt(a,zt(0))]:[Zt(a,uo(Oe,g.m,g.r)),Zt(a,uo(Oe,Ke(g.m),g.r))];n.push(Me("take the square root","square roots of both sides — remember the ±",...x));const[p,m]=c,A=lf(pn(Ke(p),m),pn(g.m,m),g.r),M=cs(t);return De(a,M)||n.push(Me(`solve for ${t}`,`undo ${Ir(a)} on each branch`,...A.map(E=>Zt(M,E)))),{status:"solved",roots:A,steps:n}}function Ic(e){if(e.kind==="neg")return[zt(-1),...Ic(e.arg)];if(e.kind==="binary"&&e.op==="*")return[...Ic(e.left),...Ic(e.right)];if(e.kind==="binary"&&e.op==="^"){const t=rr(e.right);if(t&&Hn(t)&&t.p>=1&&t.p<=3)return Array(t.p).fill(e.left)}return[e]}function u2(e,t){const n=uf(e,t);if(!n)return{status:"not-quadratic",roots:[],steps:[]};const i=[...n.steps],r={status:"does-not-apply",roots:[],steps:i},s=Mg(n.eq.lhs);if(!s.converged)return r;for(const u of s.steps)i.push(Me(u.rule,u.description,Zt(u.after,zt(0))));const o=[];for(const u of Ic(s.result)){if(rr(u)!==null)continue;const h=Ur(u,t);if(!h||h.length!==2)return r;o.push(u)}if(o.length!==2)return r;const a=De(o[0],o[1]),c=a?[o[0]]:o;i.push(Me("zero product property","a product is zero only when one of its factors is zero",...c.map(u=>Zt(u,zt(0)))));const l=[];for(const u of c){const h=i2(Zt(u,zt(0)),t);if(h.status!=="solved"||!h.result)return r;l.push(h.result.rhs)}return l.sort((u,h)=>Dr(rr(u)??Oe,rr(h)??Oe)),i.push(Me("solve each factor",a?"both factors are the same — a double root":"each branch is a little linear equation",...l.map(u=>Zt(cs(t),u)))),{status:"solved",roots:l,steps:i}}function h2(e,t){const n=uf(e,t);if(!n)return{status:"not-quadratic",roots:[],steps:[]};const i=[...n.steps],{a:r,b:s,c:o}=n;let a=Ke(o);if(!ue(o)){const m=xn(o)?"add":"subtract";i.push(Me("move the constant",`${m} ${Tn(ms(o))} ${m==="add"?"to":"from"} both sides`,Zt(gi([Oe,s,r],t),ae(a))))}let c=s;gs(r)||(c=pn(s,r),a=pn(a,r),i.push(Me("divide both sides",`divide both sides by ${Tn(r)} so the squared term is bare`,Zt(gi([Oe,c,wn],t),ae(a)))));const l=pn(c,ge(2)),u=qe(l,l),h=fr(a,u),f=Fi(gi([l,wn],t),zt(2));if(ue(c)||(i.push(Me("complete the square",`add (${Tn(l)})² = ${Tn(u)} — half the ${t}-coefficient, squared — to both sides`,Zt(gi([u,c,wn],t),ae(h)))),i.push(Me("write as a square","the left side is now a perfect square trinomial",Zt(f,ae(h))))),xn(h))return i.push(Me("no real solutions","a square is never negative",Zt(f,ae(h)))),{status:"no-real-roots",roots:[],steps:i};const d=cf(h);if(!d)return{status:"does-not-apply",roots:[],steps:i};const g=gi([l,wn],t),x=ue(d.m)?[Zt(g,zt(0))]:[Zt(g,uo(Oe,d.m,d.r)),Zt(g,uo(Oe,Ke(d.m),d.r))];i.push(Me("take the square root","square roots of both sides — remember the ±",...x));const p=lf(Ke(l),d.m,d.r);if(!ue(l)){const m=xn(l)?"add":"subtract";i.push(Me(`solve for ${t}`,`${m} ${Tn(ms(l))} on each branch`,...p.map(A=>Zt(cs(t),A))))}return{status:"solved",roots:p,steps:i}}function f2(e,t){const n=uf(e,t);if(!n)return{status:"not-quadratic",roots:[],steps:[]};const i=[...n.steps],{a:r,b:s,c:o}=n;i.push(Me("identify the coefficients",`a = ${Tn(r)}, b = ${Tn(s)}, c = ${Tn(o)}`,n.eq));const a=Di(qe(s,s),qe(ge(4),qe(r,o)));if(i.push(Me("compute the discriminant",`D = b² − 4ac = (${Tn(s)})² − 4·(${Tn(r)})·(${Tn(o)}) = ${Tn(a)}`,Zt(cs("D"),ae(a)))),xn(a))return i.push(Me("no real solutions","the discriminant is negative — the square root has no real value",Zt(cs("D"),ae(a)))),{status:"no-real-roots",roots:[],steps:i};const c=cs(t),l=ae(Ke(s)),u=ae(qe(ge(2),r)),h=ll("sqrt",ae(a)),f=ue(a)?[Zt(c,Cr(l,u))]:[Zt(c,Cr(Vn(l,h),u)),Zt(c,Cr(Mi(l,h),u))];i.push(Me("apply the quadratic formula","x = (−b ± √D) ⁄ 2a",...f));const d=cf(a);if(!d)return{status:"does-not-apply",roots:[],steps:i};const g=lf(pn(Ke(s),qe(ge(2),r)),pn(d.m,qe(ge(2),r)),d.r),x=g.map(m=>Zt(c,m));return x.length===f.length&&x.every((m,A)=>De(m.rhs,f[A].rhs))||i.push(Me("simplify",ue(a)?"D = 0 — the two branches agree: a double root":"work out the root and the fraction",...x)),{status:"solved",roots:g,steps:i}}function d2(e){switch(e.kind){case"point":return p2(e.at);case"vector":return g2(e.tail,e.v);case"circle":return v2(e.circle);case"unitCircle":return x2(e.center,e.radius,e.angle);case"fractionCircle":return y2(e.divisions,e.filled,e.radius);case"square":return S2(e.center,e.half,e.angle);case"triangle":return b2(e.tri);case"segment":return C2(e.seg);case"graph":switch(e.graph.form){case"linear":return P2(e.graph.m,e.graph.b);case"quadratic":return L2(e.graph.a,e.graph.h,e.graph.k);case"trig":return F2(e.graph.fn,e.graph.a,e.graph.b,e.graph.h,e.graph.k)}}}function p2(e){const t=Be(Lv,e);return[{title:"Point",facts:[{label:"Coordinates",value:Wn(e)},{label:"Quadrant",value:m2(e)},{label:"Distance from origin",value:L(t),formula:"d = √(x² + y²)",detail:`√(${L(e.x*e.x)} + ${L(e.y*e.y)}) = ${L(t)}`}]}]}function m2(e){return e.x===0&&e.y===0?"origin":e.x===0?"on the y-axis":e.y===0?"on the x-axis":e.x>0?e.y>0?"I":"IV":e.y>0?"II":"III"}function g2(e,t){const n=ir(t),i=Cv(t),r=wv(t),s=rn(e,t),o=t.x===0?null:t.y/t.x;return[{title:"Vector",facts:[{label:"Components",value:`⟨${L(t.x)}, ${L(t.y)}⟩`},{label:"Tail → tip",value:`${Wn(e)} → ${Wn(s)}`,formula:"tip = tail + v"},{label:"Magnitude",value:L(n),formula:"|v| = √(x² + y²)",detail:`√(${L(t.x*t.x)} + ${L(t.y*t.y)}) = ${L(n)}`},{label:"Direction",value:`${ii(i)} = ${L(i)} rad`,formula:"θ = atan2(y, x)"},{label:"Slope",value:o===null?"undefined (vertical)":L(o),formula:"m = rise ⁄ run = y ⁄ x"},{label:"Unit vector",value:Pv(r,Jh)?"— (zero vector)":`⟨${L(r.x)}, ${L(r.y)}⟩`,formula:"v̂ = v ⁄ |v|"},{label:"Pythagorean tie-in",value:`${L(t.x*t.x)} + ${L(t.y*t.y)} = ${L(n*n)}`,formula:"x² + y² = |v|²"}]}]}function _2(e,t){const n=cl(e,t),i=ir(e),r=ir(t),s=Math.abs(Rv(e,t)),o=i===0||r===0?null:n/(i*r),a=i===0?null:n/i,c=i===0||r===0?"— (zero vector)":Math.abs(n)<1e-9?"perpendicular (v₁ · v₂ = 0)":n>0?"acute angle (v₁ · v₂ > 0)":"obtuse angle (v₁ · v₂ < 0)";return{title:"Dot product (v₁ · v₂)",facts:[{label:"v₁ · v₂",value:L(n),formula:"a · b = aₓbₓ + aᵧbᵧ",detail:`(${L(e.x)})(${L(t.x)}) + (${L(e.y)})(${L(t.y)}) = ${L(n)}`},{label:"Geometric form",value:L(n),formula:"a · b = |a| |b| cos θ",detail:`${L(i)} · ${L(r)} · cos ${ii(s)} = ${L(n)}`},{label:"Angle between",value:o===null?"—":`${ii(s)} = ${L(s)} rad`,formula:"cos θ = (a · b) ⁄ (|a| |b|)",detail:o===null?void 0:`cos θ = ${L(n)} ⁄ ${L(i*r)} = ${L(o)}`},{label:"Relationship",value:c},{label:"Scalar projection of v₂ onto v₁",value:a===null?"—":L(a),formula:"comp₍ᵥ₁₎ v₂ = (a · b) ⁄ |a|"}]}}function v2(e){const t=e.radius,n=Nv(e),i=kv(e),r=Fv(e);return[{title:"Circle",facts:[{label:"Center",value:Wn(e.center)},{label:"Radius",value:L(t)},{label:"Diameter",value:L(n),formula:"d = 2r"},{label:"Circumference",value:L(i),formula:"C = 2πr = πd",detail:`2π·${L(t)} = ${L(i)}`},{label:"Area",value:L(r),formula:"A = πr²",detail:`π·${L(t)}² = ${L(r)}`},{label:"π, always",value:n===0?"—":L(i/n,5),formula:"π = C ⁄ d"},{label:"Equation",value:E2(e),formula:"(x − h)² + (y − k)² = r²"}]},{title:"Radians & arcs",facts:[{label:"Full turn",value:"360° = 2π rad ≈ 6.283"},{label:"Arc of 1 radian",value:L(wd(e,1)),formula:"s = rθ — one radian's arc is one radius"},{label:"Quarter turn (90° = π⁄2)",value:`arc ${L(wd(e,Math.PI/2))}`,formula:"s = rθ"},{label:"Quarter sector area",value:L(Ov(e,Math.PI/2)),formula:"A = ½r²θ"}]}]}function x2(e,t,n){const i=Math.cos(n),r=Math.sin(n),s=Math.abs(i)<1e-12,o=e.x+t*i,a=e.y+t*r;return[{title:"Angle on the circle",facts:[{label:"Center",value:Wn(e)},{label:"Radius",value:L(t)},{label:"Angle θ",value:`${io(n)} rad = ${ii(n)}`,formula:"measured counter-clockwise from the positive x-axis"},{label:"Quadrant",value:M2(n)},{label:"Point",value:Wn(Gt(o,a)),formula:"(h + r·cos θ, k + r·sin θ)"}]},{title:"Trig from the triangle",facts:[{label:"cos θ",value:Dc(i),formula:"cos θ = x ⁄ r — the horizontal leg",detail:`${L(o-e.x)} ⁄ ${L(t)} = ${L(i)}`},{label:"sin θ",value:Dc(r),formula:"sin θ = y ⁄ r — the vertical leg",detail:`${L(a-e.y)} ⁄ ${L(t)} = ${L(r)}`},{label:"tan θ",value:s?"undefined":Dc(r/i),formula:"tan θ = sin θ ⁄ cos θ — the slope of the radius",detail:s?"cos θ = 0: the radius is vertical":`${L(r)} ⁄ ${L(i)} = ${L(r/i)}`},{label:"Pythagorean identity",value:"sin²θ + cos²θ = 1",formula:"the radius is the hypotenuse of the cos–sin triangle",detail:`${L(r*r)} + ${L(i*i)} = ${L(r*r+i*i)}`},{label:"Bridge to the wave",value:"sin θ is the point's height",formula:"sweep θ steadily and that height traces y = sin θ"}]}]}function y2(e,t,n){const i=ge(t,e),r=t!==0&&i.q!==e,s=t/e*2*Math.PI;return[{title:"Fraction shaded",facts:[{label:"Shaded",value:pr(t,e),formula:"shaded sectors ⁄ total sectors",detail:`${t} of ${e} equal parts`},{label:"Each sector",value:pr(1,e),formula:"the whole circle is N equal parts"},{label:"Simplified",value:pr(i.p,i.q),formula:r?"divide top and bottom by their GCF":void 0,detail:r?`${pr(t,e)} = ${pr(i.p,i.q)}`:void 0},{label:"As a decimal",value:L(t/e)},{label:"As a percent",value:`${L(100*t/e,1)}%`}]},{title:"On the circle",facts:[{label:"Radius",value:L(n),formula:"drag the bottom grip to resize"},{label:"Sectors shaded",value:`${t} of ${e}`},{label:"Arc angle",value:`${io(s)} rad = ${ii(s)}`,formula:"(shaded ⁄ whole) × 360°",detail:`${pr(t,e)} × 360° = ${ii(s)}`},{label:"Shaded + unshaded",value:`${pr(t,e)} + ${pr(e-t,e)} = 1`,formula:"the parts make one whole"}]}]}function S2(e,t,n){const i=2*t,r=4*i,s=i*i,o=i*Math.SQRT2,a=o/2;return[{title:"Square",facts:[{label:"Center",value:Wn(e)},{label:"Side",value:L(i),formula:"s — all four sides equal"},{label:"Perimeter",value:L(r),formula:"P = 4s",detail:`4·${L(i)} = ${L(r)}`},{label:"Area",value:L(s),formula:"A = s²",detail:`${L(i)}² = ${L(s)}`},{label:"Rotation",value:`${io(n)} rad = ${ii(n)}`,formula:"of the corner handle, counter-clockwise from the +x axis"}]},{title:"Diagonal & √2",facts:[{label:"Diagonal",value:L(o),formula:"d = s√2",detail:`${L(i)}·√2 = ${L(o)}`},{label:"Half-diagonal",value:L(a),formula:"½d = center → corner",detail:`${L(o)} ⁄ 2 = ${L(a)}`},{label:"Diagonal ⁄ side",value:i===0?"—":L(o/i,5),formula:"d ⁄ s = √2"},{label:"√2",value:L(Math.SQRT2,5),formula:"the diagonal makes √2 out of the side — drag a corner; the ratio holds"},{label:"Next square (on the diagonal)",value:`side ${L(o)}, area ${L(2*s)}`,formula:"build a square on the diagonal → area doubles (×2)",detail:`${L(s)} → ${L(2*s)}`}]}]}function pr(e,t){return t===1?String(e):`${e}⁄${t}`}function M2(e){const t=(e%(2*Math.PI)+2*Math.PI)%(2*Math.PI),n=1e-9;return Math.abs(t)<n?"on the positive x-axis":Math.abs(t-Math.PI/2)<n?"on the positive y-axis":Math.abs(t-Math.PI)<n?"on the negative x-axis":Math.abs(t-3*Math.PI/2)<n?"on the negative y-axis":t<Math.PI/2?"I (x > 0, y > 0)":t<Math.PI?"II (x < 0, y > 0)":t<3*Math.PI/2?"III (x < 0, y < 0)":"IV (x > 0, y < 0)"}function E2(e){const t=(n,i)=>Math.abs(i)<1e-9?`${n}²`:`(${n} ${i>0?"−":"+"} ${L(Math.abs(i))})²`;return`${t("x",e.center.x)} + ${t("y",e.center.y)} = ${L(e.radius*e.radius)}`}function b2(e){const[t,n,i]=Ta(e),[r,s,o]=Qh(e),a=zv(e),c=zu(e),l=c/2,u=Math.sqrt(Math.max(0,l*(l-t)*(l-n)*(l-i))),h=Vv(e),f=r+s+o,d=[{title:"Triangle",facts:[{label:"Vertices",value:`A${Wn(e.a)} B${Wn(e.b)} C${Wn(e.c)}`},{label:"Sides",value:`a=${L(t)} b=${L(n)} c=${L(i)}`,formula:"each side opposite its same-letter angle"},{label:"Angles",value:`∠A=${ii(r)} ∠B=${ii(s)} ∠C=${ii(o)}`},{label:"Angle sum",value:Math.abs(f-Math.PI)<1e-9?"180° ✓":`${ii(f)} (degenerate)`,formula:"∠A + ∠B + ∠C = 180°"},{label:"Type",value:`${Gv(e)}, ${h}`},{label:"Perimeter",value:L(c),formula:"P = a + b + c"},{label:"Area",value:L(a),formula:"Heron: A = √(s(s−a)(s−b)(s−c))",detail:`s = ${L(l)} → √(…) = ${L(u)}`},A2([t,n,i])]},{title:"Trig laws",facts:[T2(e,t,r),{label:"Law of cosines",value:`${L(i*i)} ✓`,formula:"c² = a² + b² − 2ab·cos C",detail:`${L(t*t)} + ${L(n*n)} − ${L(2*t*n)}·cos ${ii(o)} = ${L(t*t+n*n-2*t*n*Math.cos(o))}`}]}];return h==="right"&&d.push(w2([t,n,i],[r,s,o])),d}function A2(e){const[t,n,i]=[...e].sort((a,c)=>a-c),r=t*t+n*n,s=i*i,o=`${L(t)}² + ${L(n)}² = ${L(r)} vs ${L(i)}² = ${L(s)}`;return s>0&&Math.abs(r-s)<=.02*s?{label:"Pythagorean theorem",value:`${L(r)} = ${L(s)} ✓ right`,formula:"leg² + leg² = hyp²",detail:o}:{label:"Pythagorean inequality",value:r>s?`${L(r)} > ${L(s)} → acute`:`${L(r)} < ${L(s)} → obtuse`,formula:"p² + q² vs h² (h = longest side)",detail:o}}function T2(e,t,n){const i=Math.sin(n);return i===0?{label:"Law of sines",value:"— (degenerate)"}:{label:"Law of sines",value:L(t/i),formula:"a⁄sin A = b⁄sin B = c⁄sin C = 2R",detail:`2R = ${L(2*Hv(e))} (R: circumradius)`}}function w2(e,t){const n=["A","B","C"],i=t.indexOf(Math.max(...t)),[r,s]=[0,1,2].filter(u=>u!==i),o=t[r],a=e[r],c=e[s],l=e[i];return{title:`SOH-CAH-TOA at ∠${n[r]}`,facts:[{label:`sin ${n[r]}`,value:L(Math.sin(o)),formula:"opposite ⁄ hypotenuse",detail:`${L(a)} ⁄ ${L(l)} = ${L(a/l)}`},{label:`cos ${n[r]}`,value:L(Math.cos(o)),formula:"adjacent ⁄ hypotenuse",detail:`${L(c)} ⁄ ${L(l)} = ${L(c/l)}`},{label:`tan ${n[r]}`,value:L(Math.tan(o)),formula:"opposite ⁄ adjacent",detail:`${L(a)} ⁄ ${L(c)} = ${L(a/c)}`}]}}function C2(e){const{dx:t,dy:n}=ug(e),i=qv(e),r=Yv(e),s=tf(e);return[{title:"Segment",facts:[{label:"Endpoints",value:`${Wn(e.a)} → ${Wn(e.b)}`},{label:"Rise ⁄ run",value:`Δy = ${L(n)}, Δx = ${L(t)}`},{label:"Slope",value:s===null?"undefined (vertical)":L(s),formula:"m = Δy ⁄ Δx",detail:s===null?void 0:`${L(n)} ⁄ ${L(t)} = ${L(s)}`},{label:"Length",value:L(i),formula:"d = √(Δx² + Δy²)",detail:`√(${L(t*t)} + ${L(n*n)}) = ${L(i)}`},{label:"Midpoint",value:Wn(r),formula:"((x₁+x₂)⁄2, (y₁+y₂)⁄2)"},{label:"Line equation",value:R2(e),formula:"y = mx + b"}]}]}function R2(e){const t=tf(e);return t===null?`x = ${L(e.a.x)}`:Eg(t,Kv(e)??0)}function Eg(e,t){if(e===0)return`y = ${L(t)}`;const n=e===1?"x":e===-1?"−x":`${L(e)}x`;return Math.abs(t)<1e-9?`y = ${n}`:`y = ${n} ${t>0?"+":"−"} ${L(Math.abs(t))}`}function P2(e,t){const n=e===0?Math.abs(t)<1e-9?"every x (the line IS the axis)":"none (parallel to the x-axis)":`(${L(-t/e)}, 0)`;return[{title:"Linear function",facts:[{label:"Equation",value:Eg(e,t),formula:"y = mx + b"},{label:"Slope (rate of change)",value:L(e),formula:"m = Δy per 1 of Δx",detail:`from any point: 1 right, ${L(e)} up`},{label:"y-intercept",value:`(0, ${L(t)})`,formula:"f(0) = b"},{label:"x-intercept (root)",value:n,formula:"solve 0 = mx + b → x = −b ⁄ m"},{label:"Behavior",value:e>0?"increasing":e<0?"decreasing":"constant"}]}]}function L2(e,t,n){const i=I2(e,t,n),r=i?i.b:-2*e*t,s=i?i.c:e*t*t+n,o=r*r-4*e*s,a=[];if(e!==0){const c=-n/e;if(Math.abs(n)<1e-9)a.push({label:"Root",value:`x = ${L(t)} (double)`,formula:"vertex sits ON the x-axis"});else if(c>0){const l=Math.sqrt(c),u=t-l,h=t+l;a.push({label:"Roots",value:`x = ${L(u)}, x = ${L(h)}`,formula:"0 = a(x−h)² + k → x = h ± √(−k ⁄ a)",detail:`${L(t)} ± √(${L(c)}) = ${L(t)} ± ${L(l)}`},{label:"Factored form",value:`y = ${no(e)}(x ${Fd(-u)})(x ${Fd(-h)})`,formula:"y = a(x − r₁)(x − r₂)"})}else a.push({label:"Roots",value:"none (no real solutions)",formula:`vertex is ${n>0?"above":"below"} the x-axis and the parabola opens ${e>0?"up":"down"}, away from it`})}return[{title:"Quadratic function",facts:[{label:"Vertex form",value:U2(e,t,n),formula:"y = a(x − h)² + k"},{label:"Standard form",value:`y = ${N2(e,r,s)}`,formula:"expand the square: b = −2ah, c = ah² + k"},{label:"Vertex",value:`(${L(t)}, ${L(n)}) — ${e>0?"minimum":e<0?"maximum":"—"}`},{label:"Axis of symmetry",value:`x = ${L(t)}`},{label:"Opens",value:e===0?"degenerate (a = 0: it's a line)":`${e>0?"upward":"downward"}, ${Math.abs(e)===1?"same width as":Math.abs(e)>1?"narrower than":"wider than"} y = x²`,formula:"sign of a; |a| vs 1"},{label:"y-intercept",value:`(0, ${L(s)})`,formula:"f(0) = c"}]},{title:"Roots & discriminant",facts:[{label:"Discriminant",value:`${L(o)} → ${o>1e-9?"2 real roots":o<-1e-9?"no real roots":"1 double root"}`,formula:"D = b² − 4ac",detail:`${L(r)}² − 4·${L(e)}·${L(s)} = ${L(o)}`},...a]},...i?i.groups:[]]}function I2(e,t,n){const i=na(Qv({form:"quadratic",a:e,h:t,k:n})),r=Lc(i),s=r.converged?Ur(r.result,"x"):null;if(!s||s.length!==3)return null;const o=[];r.steps.length>0&&o.push(Nd("Show your work: vertex → standard",r.steps));const a=Mg(r.result),c=a.result.kind==="binary"&&(a.result.op==="*"||a.result.op==="^");a.converged&&c&&a.steps.length>0&&o.push(Nd("Show your work: standard → factored",a.steps));const l=a2(Zt(r.result,zt(0)),"x","formula");return(l.status==="solved"||l.status==="no-real-roots")&&l.steps.length>0&&o.push(D2("Show your work: solving y = 0",l.steps)),{b:Gu(s[1]),c:Gu(s[0]),groups:o}}function D2(e,t){return{title:e,facts:t.map(n=>({label:n.rule,value:bg(s2(n)),detail:n.description}))}}function Nd(e,t){return{title:e,facts:t.map(n=>({label:n.rule,value:bg(Ir(n.after)),detail:n.description}))}}function bg(e){return e.replace(/\^2/g,"²").replace(/\^3/g,"³").replace(/ \* /g," · ")}function U2(e,t,n){const i=Math.abs(t)<1e-9?"x²":`(x ${t>0?"−":"+"} ${L(Math.abs(t))})²`,r=Math.abs(n)<1e-9?"":` ${n>0?"+":"−"} ${L(Math.abs(n))}`;return`y = ${no(e)}${i}${r}`}function N2(e,t,n){const i=[];return e!==0&&i.push(`${no(e)}x²`),t!==0&&i.push(i.length===0?`${no(t)}x`:`${t>0?"+":"−"} ${no(Math.abs(t))}x`),(n!==0||i.length===0)&&i.push(i.length===0?L(n):`${n>0?"+":"−"} ${L(Math.abs(n))}`),i.join(" ")}function no(e){return e===1?"":e===-1?"−":L(e)}function Fd(e){return`${e>=0?"+":"−"} ${L(Math.abs(e))}`}function F2(e,t,n,i,r){const s=e==="sin"?"Sine":e==="cos"?"Cosine":"Tangent",o=e==="tan",a=Math.abs(t),c=hg(e,n),l=o?"π ⁄ |b|":"2π ⁄ |b|",u=[{label:`${s} wave`,value:k2(e,t,n,i,r),formula:`y = a·${e}(b(x − h)) + k`}];return o?u.push({label:"Vertical stretch",value:L(a),formula:"|a| — tangent is unbounded, so it has no amplitude"}):u.push({label:"Amplitude",value:L(a),formula:"|a| — half the peak-to-trough height",detail:`peak at y = ${L(r+a)}, trough at y = ${L(r-a)}`}),u.push({label:"Period",value:io(c),formula:l,detail:`${o?"π":"2π"} ⁄ ${L(Math.abs(n))} = ${io(c)}`},{label:"Frequency",value:`${L(1/c)} per unit`,formula:"1 ⁄ period — cycles in each unit of x"},{label:"Phase shift",value:i===0?"none":`${L(Math.abs(i))} ${i>0?"right":"left"}`,formula:"x − h = 0 → x = h"},{label:"Midline",value:`y = ${L(r)}`,formula:"the vertical center k"}),o?u.push({label:"Asymptotes",value:`x = ${L(i)} + ${io(c)}·(n + ½)`,formula:"where b(x − h) = π⁄2 + πn — cos hits 0 and tan blows up"}):u.push({label:"Range",value:`[${L(r-a)}, ${L(r+a)}]`,formula:"[k − |a|, k + |a|]"}),[{title:`${s} function`,facts:u},O2(e)]}function O2(e){const t=e==="sin"?{label:"Definition",value:"sin θ = y-coordinate",formula:"the height of the point at angle θ on the unit circle"}:e==="cos"?{label:"Definition",value:"cos θ = x-coordinate",formula:"the horizontal position of the point at angle θ"}:{label:"Definition",value:"tan θ = sin θ ⁄ cos θ",formula:"the slope of the radius at angle θ (rise ⁄ run)"},n=[["0",0],["π⁄6",Math.PI/6],["π⁄4",Math.PI/4],["π⁄3",Math.PI/3],["π⁄2",Math.PI/2]],i=e==="sin"?Math.sin:e==="cos"?Math.cos:Math.tan,r=n.map(([s,o])=>{const a=i(o),c=Math.abs(a)>1e6?"undefined":Dc(a);return`${e}(${s}) = ${c}`}).join(",  ");return{title:"From the unit circle",facts:[t,{label:"Key values",value:r,formula:"θ swept through the first quadrant"}]}}function Dc(e){const t=[[0,"0"],[.5,"1⁄2"],[Math.SQRT1_2,"√2⁄2"],[Math.sqrt(3)/2,"√3⁄2"],[1,"1"],[Math.sqrt(3),"√3"],[1/Math.sqrt(3),"√3⁄3"]];for(const[n,i]of t){if(Math.abs(e-n)<1e-9)return i;if(Math.abs(e+n)<1e-9)return`−${i}`}return L(e)}function k2(e,t,n,i,r){const s=Math.abs(i)<1e-9?"x":`(x ${i>0?"−":"+"} ${L(Math.abs(i))})`,o=Math.abs(n-1)<1e-9?s:Math.abs(n+1)<1e-9?`−${s}`:`${L(n)}${s}`,a=`${no(t)}${e}(${o})`,c=Math.abs(r)<1e-9?"":` ${r>0?"+":"−"} ${L(Math.abs(r))}`;return`y = ${a}${c}`}function io(e){if(Math.abs(e)<1e-9)return"0";const t=e/Math.PI;for(const n of[1,2,3,4,6,8,12]){const i=Math.round(t*n);if(i!==0&&Math.abs(t-i/n)<1e-6){const r=i<0?"−":"",s=Math.abs(i),o=s===1?"π":`${s}π`;return n===1?`${r}${o}`:`${r}${o}⁄${n}`}}return L(e)}function L(e,t=3){if(Number.isNaN(e))return"—";if(!Number.isFinite(e))return"∞";const n=Number(e.toFixed(t));return Object.is(n,-0)?"0":String(n)}function ii(e){return`${L($v(e),1)}°`}function Wn(e){return`(${L(e.x)}, ${L(e.y)})`}async function B2(e){var n;if(!((n=navigator.mediaDevices)!=null&&n.getUserMedia))throw new Error("getUserMedia is unavailable. Serve over https or localhost (npm run dev).");const t=await navigator.mediaDevices.getUserMedia({video:{facingMode:"user",width:{ideal:1280},height:{ideal:720}},audio:!1});e.srcObject=t,await e.play()}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const hf="169",z2=0,Od=1,G2=2,Ag=1,V2=2,Qi=3,Fr=0,Rn=1,Li=2,Rr=0,ro=1,kd=2,Bd=3,zd=4,H2=5,Qr=100,W2=101,X2=102,$2=103,q2=104,Y2=200,K2=201,j2=202,Z2=203,Hu=204,Wu=205,J2=206,Q2=207,tx=208,ex=209,nx=210,ix=211,rx=212,sx=213,ox=214,Xu=0,$u=1,qu=2,ho=3,Yu=4,Ku=5,ju=6,Zu=7,Tg=0,ax=1,cx=2,Pr=0,lx=1,ux=2,hx=3,fx=4,dx=5,px=6,mx=7,wg=300,fo=301,po=302,Ju=303,Qu=304,fl=306,th=1e3,ns=1001,eh=1002,si=1003,gx=1004,Wa=1005,_i=1006,$l=1007,is=1008,or=1009,Cg=1010,Rg=1011,va=1012,ff=1013,_s=1014,er=1015,Ra=1016,df=1017,pf=1018,mo=1020,Pg=35902,Lg=1021,Ig=1022,vi=1023,Dg=1024,Ug=1025,so=1026,go=1027,Ng=1028,mf=1029,Fg=1030,gf=1031,_f=1033,Uc=33776,Nc=33777,Fc=33778,Oc=33779,nh=35840,ih=35841,rh=35842,sh=35843,oh=36196,ah=37492,ch=37496,lh=37808,uh=37809,hh=37810,fh=37811,dh=37812,ph=37813,mh=37814,gh=37815,_h=37816,vh=37817,xh=37818,yh=37819,Sh=37820,Mh=37821,kc=36492,Eh=36494,bh=36495,Og=36283,Ah=36284,Th=36285,wh=36286,_x=3200,vx=3201,xx=0,yx=1,Ar="",Ri="srgb",zr="srgb-linear",vf="display-p3",dl="display-p3-linear",$c="linear",xe="srgb",qc="rec709",Yc="p3",Rs=7680,Gd=519,Sx=512,Mx=513,Ex=514,kg=515,bx=516,Ax=517,Tx=518,wx=519,Ch=35044,Vd="300 es",nr=2e3,Kc=2001;class Ro{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(n)===-1&&i[t].push(n)}hasEventListener(t,n){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(n)!==-1}removeEventListener(t,n){if(this._listeners===void 0)return;const r=this._listeners[t];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,t);t.target=null}}}const ln=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ql=Math.PI/180,Rh=180/Math.PI;function sr(){const e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(ln[e&255]+ln[e>>8&255]+ln[e>>16&255]+ln[e>>24&255]+"-"+ln[t&255]+ln[t>>8&255]+"-"+ln[t>>16&15|64]+ln[t>>24&255]+"-"+ln[n&63|128]+ln[n>>8&255]+"-"+ln[n>>16&255]+ln[n>>24&255]+ln[i&255]+ln[i>>8&255]+ln[i>>16&255]+ln[i>>24&255]).toLowerCase()}function fn(e,t,n){return Math.max(t,Math.min(n,e))}function Cx(e,t){return(e%t+t)%t}function Yl(e,t,n){return(1-n)*e+n*t}function Ii(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw new Error("Invalid component type.")}}function fe(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw new Error("Invalid component type.")}}class mt{constructor(t=0,n=0){mt.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const n=this.x,i=this.y,r=t.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(t)/n;return Math.acos(fn(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,i=this.y-t.y;return n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-t.x,o=this.y-t.y;return this.x=s*i-o*r+t.x,this.y=s*r+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Bt{constructor(t,n,i,r,s,o,a,c,l){Bt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,i,r,s,o,a,c,l)}set(t,n,i,r,s,o,a,c,l){const u=this.elements;return u[0]=t,u[1]=r,u[2]=a,u[3]=n,u[4]=s,u[5]=c,u[6]=i,u[7]=o,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(t,n,i){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const i=t.elements,r=n.elements,s=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],u=i[4],h=i[7],f=i[2],d=i[5],g=i[8],x=r[0],p=r[3],m=r[6],A=r[1],M=r[4],E=r[7],z=r[2],C=r[5],T=r[8];return s[0]=o*x+a*A+c*z,s[3]=o*p+a*M+c*C,s[6]=o*m+a*E+c*T,s[1]=l*x+u*A+h*z,s[4]=l*p+u*M+h*C,s[7]=l*m+u*E+h*T,s[2]=f*x+d*A+g*z,s[5]=f*p+d*M+g*C,s[8]=f*m+d*E+g*T,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){const t=this.elements,n=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8];return n*o*u-n*a*l-i*s*u+i*a*c+r*s*l-r*o*c}invert(){const t=this.elements,n=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],h=u*o-a*l,f=a*c-u*s,d=l*s-o*c,g=n*h+i*f+r*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return t[0]=h*x,t[1]=(r*l-u*i)*x,t[2]=(a*i-r*o)*x,t[3]=f*x,t[4]=(u*n-r*c)*x,t[5]=(r*s-a*n)*x,t[6]=d*x,t[7]=(i*c-l*n)*x,t[8]=(o*n-i*s)*x,this}transpose(){let t;const n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,i,r,s,o,a){const c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*o+l*a)+o+t,-r*l,r*c,-r*(-l*o+c*a)+a+n,0,0,1),this}scale(t,n){return this.premultiply(Kl.makeScale(t,n)),this}rotate(t){return this.premultiply(Kl.makeRotation(-t)),this}translate(t,n){return this.premultiply(Kl.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){const n=this.elements,i=t.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(t,n=0){for(let i=0;i<9;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){const i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Kl=new Bt;function Bg(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function jc(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function Rx(){const e=jc("canvas");return e.style.display="block",e}const Hd={};function Bc(e){e in Hd||(Hd[e]=!0,console.warn(e))}function Px(e,t,n){return new Promise(function(i,r){function s(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:r();break;case e.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}function Lx(e){const t=e.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Ix(e){const t=e.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Wd=new Bt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Xd=new Bt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Wo={[zr]:{transfer:$c,primaries:qc,luminanceCoefficients:[.2126,.7152,.0722],toReference:e=>e,fromReference:e=>e},[Ri]:{transfer:xe,primaries:qc,luminanceCoefficients:[.2126,.7152,.0722],toReference:e=>e.convertSRGBToLinear(),fromReference:e=>e.convertLinearToSRGB()},[dl]:{transfer:$c,primaries:Yc,luminanceCoefficients:[.2289,.6917,.0793],toReference:e=>e.applyMatrix3(Xd),fromReference:e=>e.applyMatrix3(Wd)},[vf]:{transfer:xe,primaries:Yc,luminanceCoefficients:[.2289,.6917,.0793],toReference:e=>e.convertSRGBToLinear().applyMatrix3(Xd),fromReference:e=>e.applyMatrix3(Wd).convertLinearToSRGB()}},Dx=new Set([zr,dl]),se={enabled:!0,_workingColorSpace:zr,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(e){if(!Dx.has(e))throw new Error(`Unsupported working color space, "${e}".`);this._workingColorSpace=e},convert:function(e,t,n){if(this.enabled===!1||t===n||!t||!n)return e;const i=Wo[t].toReference,r=Wo[n].fromReference;return r(i(e))},fromWorkingColorSpace:function(e,t){return this.convert(e,this._workingColorSpace,t)},toWorkingColorSpace:function(e,t){return this.convert(e,t,this._workingColorSpace)},getPrimaries:function(e){return Wo[e].primaries},getTransfer:function(e){return e===Ar?$c:Wo[e].transfer},getLuminanceCoefficients:function(e,t=this._workingColorSpace){return e.fromArray(Wo[t].luminanceCoefficients)}};function oo(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function jl(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}let Ps;class Ux{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Ps===void 0&&(Ps=jc("canvas")),Ps.width=t.width,Ps.height=t.height;const i=Ps.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=Ps}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const n=jc("canvas");n.width=t.width,n.height=t.height;const i=n.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const r=i.getImageData(0,0,t.width,t.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=oo(s[o]/255)*255;return i.putImageData(r,0,0),n}else if(t.data){const n=t.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(oo(n[i]/255)*255):n[i]=oo(n[i]);return{data:n,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Nx=0;class zg{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Nx++}),this.uuid=sr(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Zl(r[o].image)):s.push(Zl(r[o]))}else s=Zl(r);i.url=s}return n||(t.images[this.uuid]=i),i}}function Zl(e){return typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap?Ux.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Fx=0;class yn extends Ro{constructor(t=yn.DEFAULT_IMAGE,n=yn.DEFAULT_MAPPING,i=ns,r=ns,s=_i,o=is,a=vi,c=or,l=yn.DEFAULT_ANISOTROPY,u=Ar){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Fx++}),this.uuid=sr(),this.name="",this.source=new zg(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new mt(0,0),this.repeat=new mt(1,1),this.center=new mt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Bt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==wg)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case th:t.x=t.x-Math.floor(t.x);break;case ns:t.x=t.x<0?0:1;break;case eh:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case th:t.y=t.y-Math.floor(t.y);break;case ns:t.y=t.y<0?0:1;break;case eh:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}yn.DEFAULT_IMAGE=null;yn.DEFAULT_MAPPING=wg;yn.DEFAULT_ANISOTROPY=1;class ke{constructor(t=0,n=0,i=0,r=1){ke.prototype.isVector4=!0,this.x=t,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,i,r){return this.x=t,this.y=n,this.z=i,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const n=this.x,i=this.y,r=this.z,s=this.w,o=t.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*s,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,i,r,s;const c=t.elements,l=c[0],u=c[4],h=c[8],f=c[1],d=c[5],g=c[9],x=c[2],p=c[6],m=c[10];if(Math.abs(u-f)<.01&&Math.abs(h-x)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+x)<.1&&Math.abs(g+p)<.1&&Math.abs(l+d+m-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const M=(l+1)/2,E=(d+1)/2,z=(m+1)/2,C=(u+f)/4,T=(h+x)/4,B=(g+p)/4;return M>E&&M>z?M<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(M),r=C/i,s=T/i):E>z?E<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(E),i=C/r,s=B/r):z<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(z),i=T/s,r=B/s),this.set(i,r,s,n),this}let A=Math.sqrt((p-g)*(p-g)+(h-x)*(h-x)+(f-u)*(f-u));return Math.abs(A)<.001&&(A=1),this.x=(p-g)/A,this.y=(h-x)/A,this.z=(f-u)/A,this.w=Math.acos((l+d+m-1)/2),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this.z=Math.max(t.z,Math.min(n.z,this.z)),this.w=Math.max(t.w,Math.min(n.w,this.w)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this.z=Math.max(t,Math.min(n,this.z)),this.w=Math.max(t,Math.min(n,this.w)),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this.w=t.w+(n.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Ox extends Ro{constructor(t=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=1,this.scissor=new ke(0,0,t,n),this.scissorTest=!1,this.viewport=new ke(0,0,t,n);const r={width:t,height:n,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:_i,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new yn(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,n,i=1){if(this.width!==t||this.height!==n||this.depth!==i){this.width=t,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=n,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,r=t.textures.length;i<r;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const n=Object.assign({},t.texture.image);return this.texture.source=new zg(n),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class vs extends Ox{constructor(t=1,n=1,i={}){super(t,n,i),this.isWebGLRenderTarget=!0}}class Gg extends yn{constructor(t=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:i,depth:r},this.magFilter=si,this.minFilter=si,this.wrapR=ns,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class kx extends yn{constructor(t=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:i,depth:r},this.magFilter=si,this.minFilter=si,this.wrapR=ns,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Pa{constructor(t=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=i,this._w=r}static slerpFlat(t,n,i,r,s,o,a){let c=i[r+0],l=i[r+1],u=i[r+2],h=i[r+3];const f=s[o+0],d=s[o+1],g=s[o+2],x=s[o+3];if(a===0){t[n+0]=c,t[n+1]=l,t[n+2]=u,t[n+3]=h;return}if(a===1){t[n+0]=f,t[n+1]=d,t[n+2]=g,t[n+3]=x;return}if(h!==x||c!==f||l!==d||u!==g){let p=1-a;const m=c*f+l*d+u*g+h*x,A=m>=0?1:-1,M=1-m*m;if(M>Number.EPSILON){const z=Math.sqrt(M),C=Math.atan2(z,m*A);p=Math.sin(p*C)/z,a=Math.sin(a*C)/z}const E=a*A;if(c=c*p+f*E,l=l*p+d*E,u=u*p+g*E,h=h*p+x*E,p===1-a){const z=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=z,l*=z,u*=z,h*=z}}t[n]=c,t[n+1]=l,t[n+2]=u,t[n+3]=h}static multiplyQuaternionsFlat(t,n,i,r,s,o){const a=i[r],c=i[r+1],l=i[r+2],u=i[r+3],h=s[o],f=s[o+1],d=s[o+2],g=s[o+3];return t[n]=a*g+u*h+c*d-l*f,t[n+1]=c*g+u*f+l*h-a*d,t[n+2]=l*g+u*d+a*f-c*h,t[n+3]=u*g-a*h-c*f-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,i,r){return this._x=t,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){const i=t._x,r=t._y,s=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(i/2),u=a(r/2),h=a(s/2),f=c(i/2),d=c(r/2),g=c(s/2);switch(o){case"XYZ":this._x=f*u*h+l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h-f*d*g;break;case"YXZ":this._x=f*u*h+l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h+f*d*g;break;case"ZXY":this._x=f*u*h-l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h-f*d*g;break;case"ZYX":this._x=f*u*h-l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h+f*d*g;break;case"YZX":this._x=f*u*h+l*d*g,this._y=l*d*h+f*u*g,this._z=l*u*g-f*d*h,this._w=l*u*h-f*d*g;break;case"XZY":this._x=f*u*h-l*d*g,this._y=l*d*h-f*u*g,this._z=l*u*g+f*d*h,this._w=l*u*h+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){const i=n/2,r=Math.sin(i);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const n=t.elements,i=n[0],r=n[4],s=n[8],o=n[1],a=n[5],c=n[9],l=n[2],u=n[6],h=n[10],f=i+a+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-c)*d,this._y=(s-l)*d,this._z=(o-r)*d}else if(i>a&&i>h){const d=2*Math.sqrt(1+i-a-h);this._w=(u-c)/d,this._x=.25*d,this._y=(r+o)/d,this._z=(s+l)/d}else if(a>h){const d=2*Math.sqrt(1+a-i-h);this._w=(s-l)/d,this._x=(r+o)/d,this._y=.25*d,this._z=(c+u)/d}else{const d=2*Math.sqrt(1+h-i-a);this._w=(o-r)/d,this._x=(s+l)/d,this._y=(c+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let i=t.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(fn(this.dot(t),-1,1)))}rotateTowards(t,n){const i=this.angleTo(t);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){const i=t._x,r=t._y,s=t._z,o=t._w,a=n._x,c=n._y,l=n._z,u=n._w;return this._x=i*u+o*a+r*l-s*c,this._y=r*u+o*c+s*a-i*l,this._z=s*u+o*l+i*c-r*a,this._w=o*u-i*a-r*c-s*l,this._onChangeCallback(),this}slerp(t,n){if(n===0)return this;if(n===1)return this.copy(t);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*t._w+i*t._x+r*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const c=1-a*a;if(c<=Number.EPSILON){const d=1-n;return this._w=d*o+n*this._w,this._x=d*i+n*this._x,this._y=d*r+n*this._y,this._z=d*s+n*this._z,this.normalize(),this}const l=Math.sqrt(c),u=Math.atan2(l,a),h=Math.sin((1-n)*u)/l,f=Math.sin(n*u)/l;return this._w=o*h+this._w*f,this._x=i*h+this._x*f,this._y=r*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,n,i){return this.copy(t).slerp(n,i)}random(){const t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(n),s*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(t=0,n=0,i=0){I.prototype.isVector3=!0,this.x=t,this.y=n,this.z=i}set(t,n,i){return i===void 0&&(i=this.z),this.x=t,this.y=n,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion($d.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion($d.setFromAxisAngle(t,n))}applyMatrix3(t){const n=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const n=this.x,i=this.y,r=this.z,s=t.elements,o=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(t){const n=this.x,i=this.y,r=this.z,s=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*r-a*i),u=2*(a*n-s*r),h=2*(s*i-o*n);return this.x=n+c*l+o*h-a*u,this.y=i+c*u+a*l-s*h,this.z=r+c*h+s*u-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const n=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this.z=Math.max(t.z,Math.min(n.z,this.z)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this.z=Math.max(t,Math.min(n,this.z)),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){const i=t.x,r=t.y,s=t.z,o=n.x,a=n.y,c=n.z;return this.x=r*c-s*a,this.y=s*o-i*c,this.z=i*a-r*o,this}projectOnVector(t){const n=t.lengthSq();if(n===0)return this.set(0,0,0);const i=t.dot(this)/n;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Jl.copy(this).projectOnVector(t),this.sub(Jl)}reflect(t){return this.sub(Jl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(t)/n;return Math.acos(fn(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,i=this.y-t.y,r=this.z-t.z;return n*n+i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,i){const r=Math.sin(n)*t;return this.x=r*Math.sin(i),this.y=Math.cos(n)*t,this.z=r*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,i){return this.x=t*Math.sin(n),this.y=i,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){const n=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(t),this.y=n,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Jl=new I,$d=new Pa;class La{constructor(t=new I(1/0,1/0,1/0),n=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n+=3)this.expandByPoint(ui.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,i=t.count;n<i;n++)this.expandByPoint(ui.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){const i=ui.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,ui):ui.fromBufferAttribute(s,o),ui.applyMatrix4(t.matrixWorld),this.expandByPoint(ui);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Xa.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Xa.copy(i.boundingBox)),Xa.applyMatrix4(t.matrixWorld),this.union(Xa)}const r=t.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ui),ui.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,i;return t.normal.x>0?(n=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),n<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Xo),$a.subVectors(this.max,Xo),Ls.subVectors(t.a,Xo),Is.subVectors(t.b,Xo),Ds.subVectors(t.c,Xo),mr.subVectors(Is,Ls),gr.subVectors(Ds,Is),Hr.subVectors(Ls,Ds);let n=[0,-mr.z,mr.y,0,-gr.z,gr.y,0,-Hr.z,Hr.y,mr.z,0,-mr.x,gr.z,0,-gr.x,Hr.z,0,-Hr.x,-mr.y,mr.x,0,-gr.y,gr.x,0,-Hr.y,Hr.x,0];return!Ql(n,Ls,Is,Ds,$a)||(n=[1,0,0,0,1,0,0,0,1],!Ql(n,Ls,Is,Ds,$a))?!1:(qa.crossVectors(mr,gr),n=[qa.x,qa.y,qa.z],Ql(n,Ls,Is,Ds,$a))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ui).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ui).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:($i[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),$i[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),$i[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),$i[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),$i[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),$i[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),$i[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),$i[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints($i),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const $i=[new I,new I,new I,new I,new I,new I,new I,new I],ui=new I,Xa=new La,Ls=new I,Is=new I,Ds=new I,mr=new I,gr=new I,Hr=new I,Xo=new I,$a=new I,qa=new I,Wr=new I;function Ql(e,t,n,i,r){for(let s=0,o=e.length-3;s<=o;s+=3){Wr.fromArray(e,s);const a=r.x*Math.abs(Wr.x)+r.y*Math.abs(Wr.y)+r.z*Math.abs(Wr.z),c=t.dot(Wr),l=n.dot(Wr),u=i.dot(Wr);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>a)return!1}return!0}const Bx=new La,$o=new I,tu=new I;class pl{constructor(t=new I,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){const i=this.center;n!==void 0?i.copy(n):Bx.setFromPoints(t).getCenter(i);let r=0;for(let s=0,o=t.length;s<o;s++)r=Math.max(r,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){const i=this.center.distanceToSquared(t);return n.copy(t),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;$o.subVectors(t,this.center);const n=$o.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector($o,r/i),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(tu.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint($o.copy(t.center).add(tu)),this.expandByPoint($o.copy(t.center).sub(tu))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const qi=new I,eu=new I,Ya=new I,_r=new I,nu=new I,Ka=new I,iu=new I;class Vg{constructor(t=new I,n=new I(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,qi)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const n=qi.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(qi.copy(this.origin).addScaledVector(this.direction,n),qi.distanceToSquared(t))}distanceSqToSegment(t,n,i,r){eu.copy(t).add(n).multiplyScalar(.5),Ya.copy(n).sub(t).normalize(),_r.copy(this.origin).sub(eu);const s=t.distanceTo(n)*.5,o=-this.direction.dot(Ya),a=_r.dot(this.direction),c=-_r.dot(Ya),l=_r.lengthSq(),u=Math.abs(1-o*o);let h,f,d,g;if(u>0)if(h=o*c-a,f=o*a-c,g=s*u,h>=0)if(f>=-g)if(f<=g){const x=1/u;h*=x,f*=x,d=h*(h+o*f+2*a)+f*(o*h+f+2*c)+l}else f=s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;else f=-s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;else f<=-g?(h=Math.max(0,-(-o*s+a)),f=h>0?-s:Math.min(Math.max(-s,-c),s),d=-h*h+f*(f+2*c)+l):f<=g?(h=0,f=Math.min(Math.max(-s,-c),s),d=f*(f+2*c)+l):(h=Math.max(0,-(o*s+a)),f=h>0?s:Math.min(Math.max(-s,-c),s),d=-h*h+f*(f+2*c)+l);else f=o>0?-s:s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(eu).addScaledVector(Ya,f),d}intersectSphere(t,n){qi.subVectors(t.center,this.origin);const i=qi.dot(this.direction),r=qi.dot(qi)-i*i,s=t.radius*t.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,n):this.at(a,n)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/n;return i>=0?i:null}intersectPlane(t,n){const i=this.distanceToPlane(t);return i===null?null:this.at(i,n)}intersectsPlane(t){const n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let i,r,s,o,a,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return l>=0?(i=(t.min.x-f.x)*l,r=(t.max.x-f.x)*l):(i=(t.max.x-f.x)*l,r=(t.min.x-f.x)*l),u>=0?(s=(t.min.y-f.y)*u,o=(t.max.y-f.y)*u):(s=(t.max.y-f.y)*u,o=(t.min.y-f.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),h>=0?(a=(t.min.z-f.z)*h,c=(t.max.z-f.z)*h):(a=(t.max.z-f.z)*h,c=(t.min.z-f.z)*h),i>c||a>r)||((a>i||i!==i)&&(i=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(t){return this.intersectBox(t,qi)!==null}intersectTriangle(t,n,i,r,s){nu.subVectors(n,t),Ka.subVectors(i,t),iu.crossVectors(nu,Ka);let o=this.direction.dot(iu),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;_r.subVectors(this.origin,t);const c=a*this.direction.dot(Ka.crossVectors(_r,Ka));if(c<0)return null;const l=a*this.direction.dot(nu.cross(_r));if(l<0||c+l>o)return null;const u=-a*_r.dot(iu);return u<0?null:this.at(u/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Re{constructor(t,n,i,r,s,o,a,c,l,u,h,f,d,g,x,p){Re.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,i,r,s,o,a,c,l,u,h,f,d,g,x,p)}set(t,n,i,r,s,o,a,c,l,u,h,f,d,g,x,p){const m=this.elements;return m[0]=t,m[4]=n,m[8]=i,m[12]=r,m[1]=s,m[5]=o,m[9]=a,m[13]=c,m[2]=l,m[6]=u,m[10]=h,m[14]=f,m[3]=d,m[7]=g,m[11]=x,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Re().fromArray(this.elements)}copy(t){const n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(t){const n=this.elements,i=t.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(t){const n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,i){return t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,n,i){return this.set(t.x,n.x,i.x,0,t.y,n.y,i.y,0,t.z,n.z,i.z,0,0,0,0,1),this}extractRotation(t){const n=this.elements,i=t.elements,r=1/Us.setFromMatrixColumn(t,0).length(),s=1/Us.setFromMatrixColumn(t,1).length(),o=1/Us.setFromMatrixColumn(t,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){const n=this.elements,i=t.x,r=t.y,s=t.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),h=Math.sin(s);if(t.order==="XYZ"){const f=o*u,d=o*h,g=a*u,x=a*h;n[0]=c*u,n[4]=-c*h,n[8]=l,n[1]=d+g*l,n[5]=f-x*l,n[9]=-a*c,n[2]=x-f*l,n[6]=g+d*l,n[10]=o*c}else if(t.order==="YXZ"){const f=c*u,d=c*h,g=l*u,x=l*h;n[0]=f+x*a,n[4]=g*a-d,n[8]=o*l,n[1]=o*h,n[5]=o*u,n[9]=-a,n[2]=d*a-g,n[6]=x+f*a,n[10]=o*c}else if(t.order==="ZXY"){const f=c*u,d=c*h,g=l*u,x=l*h;n[0]=f-x*a,n[4]=-o*h,n[8]=g+d*a,n[1]=d+g*a,n[5]=o*u,n[9]=x-f*a,n[2]=-o*l,n[6]=a,n[10]=o*c}else if(t.order==="ZYX"){const f=o*u,d=o*h,g=a*u,x=a*h;n[0]=c*u,n[4]=g*l-d,n[8]=f*l+x,n[1]=c*h,n[5]=x*l+f,n[9]=d*l-g,n[2]=-l,n[6]=a*c,n[10]=o*c}else if(t.order==="YZX"){const f=o*c,d=o*l,g=a*c,x=a*l;n[0]=c*u,n[4]=x-f*h,n[8]=g*h+d,n[1]=h,n[5]=o*u,n[9]=-a*u,n[2]=-l*u,n[6]=d*h+g,n[10]=f-x*h}else if(t.order==="XZY"){const f=o*c,d=o*l,g=a*c,x=a*l;n[0]=c*u,n[4]=-h,n[8]=l*u,n[1]=f*h+x,n[5]=o*u,n[9]=d*h-g,n[2]=g*h-d,n[6]=a*u,n[10]=x*h+f}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(zx,t,Gx)}lookAt(t,n,i){const r=this.elements;return Fn.subVectors(t,n),Fn.lengthSq()===0&&(Fn.z=1),Fn.normalize(),vr.crossVectors(i,Fn),vr.lengthSq()===0&&(Math.abs(i.z)===1?Fn.x+=1e-4:Fn.z+=1e-4,Fn.normalize(),vr.crossVectors(i,Fn)),vr.normalize(),ja.crossVectors(Fn,vr),r[0]=vr.x,r[4]=ja.x,r[8]=Fn.x,r[1]=vr.y,r[5]=ja.y,r[9]=Fn.y,r[2]=vr.z,r[6]=ja.z,r[10]=Fn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const i=t.elements,r=n.elements,s=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],u=i[1],h=i[5],f=i[9],d=i[13],g=i[2],x=i[6],p=i[10],m=i[14],A=i[3],M=i[7],E=i[11],z=i[15],C=r[0],T=r[4],B=r[8],et=r[12],v=r[1],_=r[5],N=r[9],G=r[13],W=r[2],q=r[6],O=r[10],j=r[14],H=r[3],ct=r[7],lt=r[11],xt=r[15];return s[0]=o*C+a*v+c*W+l*H,s[4]=o*T+a*_+c*q+l*ct,s[8]=o*B+a*N+c*O+l*lt,s[12]=o*et+a*G+c*j+l*xt,s[1]=u*C+h*v+f*W+d*H,s[5]=u*T+h*_+f*q+d*ct,s[9]=u*B+h*N+f*O+d*lt,s[13]=u*et+h*G+f*j+d*xt,s[2]=g*C+x*v+p*W+m*H,s[6]=g*T+x*_+p*q+m*ct,s[10]=g*B+x*N+p*O+m*lt,s[14]=g*et+x*G+p*j+m*xt,s[3]=A*C+M*v+E*W+z*H,s[7]=A*T+M*_+E*q+z*ct,s[11]=A*B+M*N+E*O+z*lt,s[15]=A*et+M*G+E*j+z*xt,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){const t=this.elements,n=t[0],i=t[4],r=t[8],s=t[12],o=t[1],a=t[5],c=t[9],l=t[13],u=t[2],h=t[6],f=t[10],d=t[14],g=t[3],x=t[7],p=t[11],m=t[15];return g*(+s*c*h-r*l*h-s*a*f+i*l*f+r*a*d-i*c*d)+x*(+n*c*d-n*l*f+s*o*f-r*o*d+r*l*u-s*c*u)+p*(+n*l*h-n*a*d-s*o*h+i*o*d+s*a*u-i*l*u)+m*(-r*a*u-n*c*h+n*a*f+r*o*h-i*o*f+i*c*u)}transpose(){const t=this.elements;let n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,i){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=n,r[14]=i),this}invert(){const t=this.elements,n=t[0],i=t[1],r=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],u=t[8],h=t[9],f=t[10],d=t[11],g=t[12],x=t[13],p=t[14],m=t[15],A=h*p*l-x*f*l+x*c*d-a*p*d-h*c*m+a*f*m,M=g*f*l-u*p*l-g*c*d+o*p*d+u*c*m-o*f*m,E=u*x*l-g*h*l+g*a*d-o*x*d-u*a*m+o*h*m,z=g*h*c-u*x*c-g*a*f+o*x*f+u*a*p-o*h*p,C=n*A+i*M+r*E+s*z;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/C;return t[0]=A*T,t[1]=(x*f*s-h*p*s-x*r*d+i*p*d+h*r*m-i*f*m)*T,t[2]=(a*p*s-x*c*s+x*r*l-i*p*l-a*r*m+i*c*m)*T,t[3]=(h*c*s-a*f*s-h*r*l+i*f*l+a*r*d-i*c*d)*T,t[4]=M*T,t[5]=(u*p*s-g*f*s+g*r*d-n*p*d-u*r*m+n*f*m)*T,t[6]=(g*c*s-o*p*s-g*r*l+n*p*l+o*r*m-n*c*m)*T,t[7]=(o*f*s-u*c*s+u*r*l-n*f*l-o*r*d+n*c*d)*T,t[8]=E*T,t[9]=(g*h*s-u*x*s-g*i*d+n*x*d+u*i*m-n*h*m)*T,t[10]=(o*x*s-g*a*s+g*i*l-n*x*l-o*i*m+n*a*m)*T,t[11]=(u*a*s-o*h*s-u*i*l+n*h*l+o*i*d-n*a*d)*T,t[12]=z*T,t[13]=(u*x*r-g*h*r+g*i*f-n*x*f-u*i*p+n*h*p)*T,t[14]=(g*a*r-o*x*r-g*i*c+n*x*c+o*i*p-n*a*p)*T,t[15]=(o*h*r-u*a*r+u*i*c-n*h*c-o*i*f+n*a*f)*T,this}scale(t){const n=this.elements,i=t.x,r=t.y,s=t.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(t,n,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(t){const n=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,o=t.x,a=t.y,c=t.z,l=s*o,u=s*a;return this.set(l*o+i,l*a-r*c,l*c+r*a,0,l*a+r*c,u*a+i,u*c-r*o,0,l*c-r*a,u*c+r*o,s*c*c+i,0,0,0,0,1),this}makeScale(t,n,i){return this.set(t,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,n,i,r,s,o){return this.set(1,i,s,0,t,1,o,0,n,r,1,0,0,0,0,1),this}compose(t,n,i){const r=this.elements,s=n._x,o=n._y,a=n._z,c=n._w,l=s+s,u=o+o,h=a+a,f=s*l,d=s*u,g=s*h,x=o*u,p=o*h,m=a*h,A=c*l,M=c*u,E=c*h,z=i.x,C=i.y,T=i.z;return r[0]=(1-(x+m))*z,r[1]=(d+E)*z,r[2]=(g-M)*z,r[3]=0,r[4]=(d-E)*C,r[5]=(1-(f+m))*C,r[6]=(p+A)*C,r[7]=0,r[8]=(g+M)*T,r[9]=(p-A)*T,r[10]=(1-(f+x))*T,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,n,i){const r=this.elements;let s=Us.set(r[0],r[1],r[2]).length();const o=Us.set(r[4],r[5],r[6]).length(),a=Us.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),t.x=r[12],t.y=r[13],t.z=r[14],hi.copy(this);const l=1/s,u=1/o,h=1/a;return hi.elements[0]*=l,hi.elements[1]*=l,hi.elements[2]*=l,hi.elements[4]*=u,hi.elements[5]*=u,hi.elements[6]*=u,hi.elements[8]*=h,hi.elements[9]*=h,hi.elements[10]*=h,n.setFromRotationMatrix(hi),i.x=s,i.y=o,i.z=a,this}makePerspective(t,n,i,r,s,o,a=nr){const c=this.elements,l=2*s/(n-t),u=2*s/(i-r),h=(n+t)/(n-t),f=(i+r)/(i-r);let d,g;if(a===nr)d=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===Kc)d=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=d,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,n,i,r,s,o,a=nr){const c=this.elements,l=1/(n-t),u=1/(i-r),h=1/(o-s),f=(n+t)*l,d=(i+r)*u;let g,x;if(a===nr)g=(o+s)*h,x=-2*h;else if(a===Kc)g=s*h,x=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-d,c[2]=0,c[6]=0,c[10]=x,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const n=this.elements,i=t.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(t,n=0){for(let i=0;i<16;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){const i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t[n+9]=i[9],t[n+10]=i[10],t[n+11]=i[11],t[n+12]=i[12],t[n+13]=i[13],t[n+14]=i[14],t[n+15]=i[15],t}}const Us=new I,hi=new Re,zx=new I(0,0,0),Gx=new I(1,1,1),vr=new I,ja=new I,Fn=new I,qd=new Re,Yd=new Pa;class ar{constructor(t=0,n=0,i=0,r=ar.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,i,r=this._order){return this._x=t,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,i=!0){const r=t.elements,s=r[0],o=r[4],a=r[8],c=r[1],l=r[5],u=r[9],h=r[2],f=r[6],d=r[10];switch(n){case"XYZ":this._y=Math.asin(fn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-fn(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(fn(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-fn(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(fn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-fn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,i){return qd.makeRotationFromQuaternion(t),this.setFromRotationMatrix(qd,n,i)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return Yd.setFromEuler(this),this.setFromQuaternion(Yd,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ar.DEFAULT_ORDER="XYZ";class Hg{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Vx=0;const Kd=new I,Ns=new Pa,Yi=new Re,Za=new I,qo=new I,Hx=new I,Wx=new Pa,jd=new I(1,0,0),Zd=new I(0,1,0),Jd=new I(0,0,1),Qd={type:"added"},Xx={type:"removed"},Fs={type:"childadded",child:null},ru={type:"childremoved",child:null};class Sn extends Ro{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Vx++}),this.uuid=sr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Sn.DEFAULT_UP.clone();const t=new I,n=new ar,i=new Pa,r=new I(1,1,1);function s(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Re},normalMatrix:{value:new Bt}}),this.matrix=new Re,this.matrixWorld=new Re,this.matrixAutoUpdate=Sn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Sn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Hg,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return Ns.setFromAxisAngle(t,n),this.quaternion.multiply(Ns),this}rotateOnWorldAxis(t,n){return Ns.setFromAxisAngle(t,n),this.quaternion.premultiply(Ns),this}rotateX(t){return this.rotateOnAxis(jd,t)}rotateY(t){return this.rotateOnAxis(Zd,t)}rotateZ(t){return this.rotateOnAxis(Jd,t)}translateOnAxis(t,n){return Kd.copy(t).applyQuaternion(this.quaternion),this.position.add(Kd.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(jd,t)}translateY(t){return this.translateOnAxis(Zd,t)}translateZ(t){return this.translateOnAxis(Jd,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Yi.copy(this.matrixWorld).invert())}lookAt(t,n,i){t.isVector3?Za.copy(t):Za.set(t,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),qo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Yi.lookAt(qo,Za,this.up):Yi.lookAt(Za,qo,this.up),this.quaternion.setFromRotationMatrix(Yi),r&&(Yi.extractRotation(r.matrixWorld),Ns.setFromRotationMatrix(Yi),this.quaternion.premultiply(Ns.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Qd),Fs.child=t,this.dispatchEvent(Fs),Fs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(Xx),ru.child=t,this.dispatchEvent(ru),ru.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Yi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Yi.multiply(t.parent.matrixWorld)),t.applyMatrix4(Yi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Qd),Fs.child=t,this.dispatchEvent(Fs),Fs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(t,n);if(o!==void 0)return o}}getObjectsByProperty(t,n,i=[]){this[t]===n&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(t,n,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qo,t,Hx),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qo,Wx,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(t){t(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(t)}traverseAncestors(t){const n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(t)}updateWorldMatrix(t,n){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(t){const n=t===void 0||typeof t=="string",i={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];s(t.shapes,h)}else s(t.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(t.materials,this.material[c]));r.material=a}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];r.animations.push(s(t.animations,c))}}if(n){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),u=o(t.images),h=o(t.shapes),f=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),d.length>0&&(i.animations=d),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(a){const c=[];for(const l in a){const u=a[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let i=0;i<t.children.length;i++){const r=t.children[i];this.add(r.clone())}return this}}Sn.DEFAULT_UP=new I(0,1,0);Sn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Sn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const fi=new I,Ki=new I,su=new I,ji=new I,Os=new I,ks=new I,tp=new I,ou=new I,au=new I,cu=new I,lu=new ke,uu=new ke,hu=new ke;class ri{constructor(t=new I,n=new I,i=new I){this.a=t,this.b=n,this.c=i}static getNormal(t,n,i,r){r.subVectors(i,n),fi.subVectors(t,n),r.cross(fi);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,n,i,r,s){fi.subVectors(r,n),Ki.subVectors(i,n),su.subVectors(t,n);const o=fi.dot(fi),a=fi.dot(Ki),c=fi.dot(su),l=Ki.dot(Ki),u=Ki.dot(su),h=o*l-a*a;if(h===0)return s.set(0,0,0),null;const f=1/h,d=(l*c-a*u)*f,g=(o*u-a*c)*f;return s.set(1-d-g,g,d)}static containsPoint(t,n,i,r){return this.getBarycoord(t,n,i,r,ji)===null?!1:ji.x>=0&&ji.y>=0&&ji.x+ji.y<=1}static getInterpolation(t,n,i,r,s,o,a,c){return this.getBarycoord(t,n,i,r,ji)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,ji.x),c.addScaledVector(o,ji.y),c.addScaledVector(a,ji.z),c)}static getInterpolatedAttribute(t,n,i,r,s,o){return lu.setScalar(0),uu.setScalar(0),hu.setScalar(0),lu.fromBufferAttribute(t,n),uu.fromBufferAttribute(t,i),hu.fromBufferAttribute(t,r),o.setScalar(0),o.addScaledVector(lu,s.x),o.addScaledVector(uu,s.y),o.addScaledVector(hu,s.z),o}static isFrontFacing(t,n,i,r){return fi.subVectors(i,n),Ki.subVectors(t,n),fi.cross(Ki).dot(r)<0}set(t,n,i){return this.a.copy(t),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(t,n,i,r){return this.a.copy(t[n]),this.b.copy(t[i]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,n,i,r){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return fi.subVectors(this.c,this.b),Ki.subVectors(this.a,this.b),fi.cross(Ki).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return ri.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return ri.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,i,r,s){return ri.getInterpolation(t,this.a,this.b,this.c,n,i,r,s)}containsPoint(t){return ri.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return ri.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){const i=this.a,r=this.b,s=this.c;let o,a;Os.subVectors(r,i),ks.subVectors(s,i),ou.subVectors(t,i);const c=Os.dot(ou),l=ks.dot(ou);if(c<=0&&l<=0)return n.copy(i);au.subVectors(t,r);const u=Os.dot(au),h=ks.dot(au);if(u>=0&&h<=u)return n.copy(r);const f=c*h-u*l;if(f<=0&&c>=0&&u<=0)return o=c/(c-u),n.copy(i).addScaledVector(Os,o);cu.subVectors(t,s);const d=Os.dot(cu),g=ks.dot(cu);if(g>=0&&d<=g)return n.copy(s);const x=d*l-c*g;if(x<=0&&l>=0&&g<=0)return a=l/(l-g),n.copy(i).addScaledVector(ks,a);const p=u*g-d*h;if(p<=0&&h-u>=0&&d-g>=0)return tp.subVectors(s,r),a=(h-u)/(h-u+(d-g)),n.copy(r).addScaledVector(tp,a);const m=1/(p+x+f);return o=x*m,a=f*m,n.copy(i).addScaledVector(Os,o).addScaledVector(ks,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Wg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},xr={h:0,s:0,l:0},Ja={h:0,s:0,l:0};function fu(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}class oe{constructor(t,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,i)}set(t,n,i){if(n===void 0&&i===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,n,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=Ri){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,se.toWorkingColorSpace(this,n),this}setRGB(t,n,i,r=se.workingColorSpace){return this.r=t,this.g=n,this.b=i,se.toWorkingColorSpace(this,r),this}setHSL(t,n,i,r=se.workingColorSpace){if(t=Cx(t,1),n=fn(n,0,1),i=fn(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,o=2*i-s;this.r=fu(o,s,t+1/3),this.g=fu(o,s,t),this.b=fu(o,s,t-1/3)}return se.toWorkingColorSpace(this,r),this}setStyle(t,n=Ri){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=Ri){const i=Wg[t.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=oo(t.r),this.g=oo(t.g),this.b=oo(t.b),this}copyLinearToSRGB(t){return this.r=jl(t.r),this.g=jl(t.g),this.b=jl(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ri){return se.fromWorkingColorSpace(un.copy(this),t),Math.round(fn(un.r*255,0,255))*65536+Math.round(fn(un.g*255,0,255))*256+Math.round(fn(un.b*255,0,255))}getHexString(t=Ri){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=se.workingColorSpace){se.fromWorkingColorSpace(un.copy(this),n);const i=un.r,r=un.g,s=un.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let c,l;const u=(a+o)/2;if(a===o)c=0,l=0;else{const h=o-a;switch(l=u<=.5?h/(o+a):h/(2-o-a),o){case i:c=(r-s)/h+(r<s?6:0);break;case r:c=(s-i)/h+2;break;case s:c=(i-r)/h+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,n=se.workingColorSpace){return se.fromWorkingColorSpace(un.copy(this),n),t.r=un.r,t.g=un.g,t.b=un.b,t}getStyle(t=Ri){se.fromWorkingColorSpace(un.copy(this),t);const n=un.r,i=un.g,r=un.b;return t!==Ri?`color(${t} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(t,n,i){return this.getHSL(xr),this.setHSL(xr.h+t,xr.s+n,xr.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,i){return this.r=t.r+(n.r-t.r)*i,this.g=t.g+(n.g-t.g)*i,this.b=t.b+(n.b-t.b)*i,this}lerpHSL(t,n){this.getHSL(xr),t.getHSL(Ja);const i=Yl(xr.h,Ja.h,n),r=Yl(xr.s,Ja.s,n),s=Yl(xr.l,Ja.l,n);return this.setHSL(i,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const n=this.r,i=this.g,r=this.b,s=t.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const un=new oe;oe.NAMES=Wg;let $x=0;class Po extends Ro{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:$x++}),this.uuid=sr(),this.name="",this.type="Material",this.blending=ro,this.side=Fr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Hu,this.blendDst=Wu,this.blendEquation=Qr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new oe(0,0,0),this.blendAlpha=0,this.depthFunc=ho,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Gd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Rs,this.stencilZFail=Rs,this.stencilZPass=Rs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const n in t){const i=t[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(t){const n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ro&&(i.blending=this.blending),this.side!==Fr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Hu&&(i.blendSrc=this.blendSrc),this.blendDst!==Wu&&(i.blendDst=this.blendDst),this.blendEquation!==Qr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ho&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Gd&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Rs&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Rs&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Rs&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const c=s[a];delete c.metadata,o.push(c)}return o}if(n){const s=r(t.textures),o=r(t.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const n=t.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class xs extends Po{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new oe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ar,this.combine=Tg,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ve=new I,Qa=new mt;class yi{constructor(t,n,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=i,this.usage=Ch,this.updateRanges=[],this.gpuType=er,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,i){t*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=n.array[i+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Qa.fromBufferAttribute(this,n),Qa.applyMatrix3(t),this.setXY(n,Qa.x,Qa.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Ve.fromBufferAttribute(this,n),Ve.applyMatrix3(t),this.setXYZ(n,Ve.x,Ve.y,Ve.z);return this}applyMatrix4(t){for(let n=0,i=this.count;n<i;n++)Ve.fromBufferAttribute(this,n),Ve.applyMatrix4(t),this.setXYZ(n,Ve.x,Ve.y,Ve.z);return this}applyNormalMatrix(t){for(let n=0,i=this.count;n<i;n++)Ve.fromBufferAttribute(this,n),Ve.applyNormalMatrix(t),this.setXYZ(n,Ve.x,Ve.y,Ve.z);return this}transformDirection(t){for(let n=0,i=this.count;n<i;n++)Ve.fromBufferAttribute(this,n),Ve.transformDirection(t),this.setXYZ(n,Ve.x,Ve.y,Ve.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let i=this.array[t*this.itemSize+n];return this.normalized&&(i=Ii(i,this.array)),i}setComponent(t,n,i){return this.normalized&&(i=fe(i,this.array)),this.array[t*this.itemSize+n]=i,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=Ii(n,this.array)),n}setX(t,n){return this.normalized&&(n=fe(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=Ii(n,this.array)),n}setY(t,n){return this.normalized&&(n=fe(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=Ii(n,this.array)),n}setZ(t,n){return this.normalized&&(n=fe(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=Ii(n,this.array)),n}setW(t,n){return this.normalized&&(n=fe(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,i){return t*=this.itemSize,this.normalized&&(n=fe(n,this.array),i=fe(i,this.array)),this.array[t+0]=n,this.array[t+1]=i,this}setXYZ(t,n,i,r){return t*=this.itemSize,this.normalized&&(n=fe(n,this.array),i=fe(i,this.array),r=fe(r,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=r,this}setXYZW(t,n,i,r,s){return t*=this.itemSize,this.normalized&&(n=fe(n,this.array),i=fe(i,this.array),r=fe(r,this.array),s=fe(s,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ch&&(t.usage=this.usage),t}}class Xg extends yi{constructor(t,n,i){super(new Uint16Array(t),n,i)}}class $g extends yi{constructor(t,n,i){super(new Uint32Array(t),n,i)}}class Xe extends yi{constructor(t,n,i){super(new Float32Array(t),n,i)}}let qx=0;const Qn=new Re,du=new Sn,Bs=new I,On=new La,Yo=new La,en=new I;class Ln extends Ro{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:qx++}),this.uuid=sr(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Bg(t)?$g:Xg)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,i=0){this.groups.push({start:t,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Bt().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Qn.makeRotationFromQuaternion(t),this.applyMatrix4(Qn),this}rotateX(t){return Qn.makeRotationX(t),this.applyMatrix4(Qn),this}rotateY(t){return Qn.makeRotationY(t),this.applyMatrix4(Qn),this}rotateZ(t){return Qn.makeRotationZ(t),this.applyMatrix4(Qn),this}translate(t,n,i){return Qn.makeTranslation(t,n,i),this.applyMatrix4(Qn),this}scale(t,n,i){return Qn.makeScale(t,n,i),this.applyMatrix4(Qn),this}lookAt(t){return du.lookAt(t),du.updateMatrix(),this.applyMatrix4(du.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Bs).negate(),this.translate(Bs.x,Bs.y,Bs.z),this}setFromPoints(t){const n=[];for(let i=0,r=t.length;i<r;i++){const s=t[i];n.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new Xe(n,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new La);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];On.setFromBufferAttribute(s),this.morphTargetsRelative?(en.addVectors(this.boundingBox.min,On.min),this.boundingBox.expandByPoint(en),en.addVectors(this.boundingBox.max,On.max),this.boundingBox.expandByPoint(en)):(this.boundingBox.expandByPoint(On.min),this.boundingBox.expandByPoint(On.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new pl);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(t){const i=this.boundingSphere.center;if(On.setFromBufferAttribute(t),n)for(let s=0,o=n.length;s<o;s++){const a=n[s];Yo.setFromBufferAttribute(a),this.morphTargetsRelative?(en.addVectors(On.min,Yo.min),On.expandByPoint(en),en.addVectors(On.max,Yo.max),On.expandByPoint(en)):(On.expandByPoint(Yo.min),On.expandByPoint(Yo.max))}On.getCenter(i);let r=0;for(let s=0,o=t.count;s<o;s++)en.fromBufferAttribute(t,s),r=Math.max(r,i.distanceToSquared(en));if(n)for(let s=0,o=n.length;s<o;s++){const a=n[s],c=this.morphTargetsRelative;for(let l=0,u=a.count;l<u;l++)en.fromBufferAttribute(a,l),c&&(Bs.fromBufferAttribute(t,l),en.add(Bs)),r=Math.max(r,i.distanceToSquared(en))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new yi(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let B=0;B<i.count;B++)a[B]=new I,c[B]=new I;const l=new I,u=new I,h=new I,f=new mt,d=new mt,g=new mt,x=new I,p=new I;function m(B,et,v){l.fromBufferAttribute(i,B),u.fromBufferAttribute(i,et),h.fromBufferAttribute(i,v),f.fromBufferAttribute(s,B),d.fromBufferAttribute(s,et),g.fromBufferAttribute(s,v),u.sub(l),h.sub(l),d.sub(f),g.sub(f);const _=1/(d.x*g.y-g.x*d.y);isFinite(_)&&(x.copy(u).multiplyScalar(g.y).addScaledVector(h,-d.y).multiplyScalar(_),p.copy(h).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(_),a[B].add(x),a[et].add(x),a[v].add(x),c[B].add(p),c[et].add(p),c[v].add(p))}let A=this.groups;A.length===0&&(A=[{start:0,count:t.count}]);for(let B=0,et=A.length;B<et;++B){const v=A[B],_=v.start,N=v.count;for(let G=_,W=_+N;G<W;G+=3)m(t.getX(G+0),t.getX(G+1),t.getX(G+2))}const M=new I,E=new I,z=new I,C=new I;function T(B){z.fromBufferAttribute(r,B),C.copy(z);const et=a[B];M.copy(et),M.sub(z.multiplyScalar(z.dot(et))).normalize(),E.crossVectors(C,et);const _=E.dot(c[B])<0?-1:1;o.setXYZW(B,M.x,M.y,M.z,_)}for(let B=0,et=A.length;B<et;++B){const v=A[B],_=v.start,N=v.count;for(let G=_,W=_+N;G<W;G+=3)T(t.getX(G+0)),T(t.getX(G+1)),T(t.getX(G+2))}}computeVertexNormals(){const t=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new yi(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let f=0,d=i.count;f<d;f++)i.setXYZ(f,0,0,0);const r=new I,s=new I,o=new I,a=new I,c=new I,l=new I,u=new I,h=new I;if(t)for(let f=0,d=t.count;f<d;f+=3){const g=t.getX(f+0),x=t.getX(f+1),p=t.getX(f+2);r.fromBufferAttribute(n,g),s.fromBufferAttribute(n,x),o.fromBufferAttribute(n,p),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),a.fromBufferAttribute(i,g),c.fromBufferAttribute(i,x),l.fromBufferAttribute(i,p),a.add(u),c.add(u),l.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(x,c.x,c.y,c.z),i.setXYZ(p,l.x,l.y,l.z)}else for(let f=0,d=n.count;f<d;f+=3)r.fromBufferAttribute(n,f+0),s.fromBufferAttribute(n,f+1),o.fromBufferAttribute(n,f+2),u.subVectors(o,s),h.subVectors(r,s),u.cross(h),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let n=0,i=t.count;n<i;n++)en.fromBufferAttribute(t,n),en.normalize(),t.setXYZ(n,en.x,en.y,en.z)}toNonIndexed(){function t(a,c){const l=a.array,u=a.itemSize,h=a.normalized,f=new l.constructor(c.length*u);let d=0,g=0;for(let x=0,p=c.length;x<p;x++){a.isInterleavedBufferAttribute?d=c[x]*a.data.stride+a.offset:d=c[x]*u;for(let m=0;m<u;m++)f[g++]=l[d++]}return new yi(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Ln,i=this.index.array,r=this.attributes;for(const a in r){const c=r[a],l=t(c,i);n.setAttribute(a,l)}const s=this.morphAttributes;for(const a in s){const c=[],l=s[a];for(let u=0,h=l.length;u<h;u++){const f=l[u],d=t(f,i);c.push(d)}n.morphAttributes[a]=c}n.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];n.addGroup(l.start,l.count,l.materialIndex)}return n}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const c in i){const l=i[c];t.data.attributes[c]=l.toJSON(t.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,f=l.length;h<f;h++){const d=l[h];u.push(d.toJSON(t.data))}u.length>0&&(r[c]=u,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(n));const r=t.attributes;for(const l in r){const u=r[l];this.setAttribute(l,u.clone(n))}const s=t.morphAttributes;for(const l in s){const u=[],h=s[l];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(n));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,u=o.length;l<u;l++){const h=o[l];this.addGroup(h.start,h.count,h.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ep=new Re,Xr=new Vg,tc=new pl,np=new I,ec=new I,nc=new I,ic=new I,pu=new I,rc=new I,ip=new I,sc=new I;class ee extends Sn{constructor(t=new Ln,n=new xs){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,t);const a=this.morphTargetInfluences;if(s&&a){rc.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const u=a[c],h=s[c];u!==0&&(pu.fromBufferAttribute(h,t),o?rc.addScaledVector(pu,u):rc.addScaledVector(pu.sub(n),u))}n.add(rc)}return n}raycast(t,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),tc.copy(i.boundingSphere),tc.applyMatrix4(s),Xr.copy(t.ray).recast(t.near),!(tc.containsPoint(Xr.origin)===!1&&(Xr.intersectSphere(tc,np)===null||Xr.origin.distanceToSquared(np)>(t.far-t.near)**2))&&(ep.copy(s).invert(),Xr.copy(t.ray).applyMatrix4(ep),!(i.boundingBox!==null&&Xr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,n,Xr)))}_computeIntersections(t,n,i){let r;const s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,f=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=f.length;g<x;g++){const p=f[g],m=o[p.materialIndex],A=Math.max(p.start,d.start),M=Math.min(a.count,Math.min(p.start+p.count,d.start+d.count));for(let E=A,z=M;E<z;E+=3){const C=a.getX(E),T=a.getX(E+1),B=a.getX(E+2);r=oc(this,m,t,i,l,u,h,C,T,B),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=p.materialIndex,n.push(r))}}else{const g=Math.max(0,d.start),x=Math.min(a.count,d.start+d.count);for(let p=g,m=x;p<m;p+=3){const A=a.getX(p),M=a.getX(p+1),E=a.getX(p+2);r=oc(this,o,t,i,l,u,h,A,M,E),r&&(r.faceIndex=Math.floor(p/3),n.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,x=f.length;g<x;g++){const p=f[g],m=o[p.materialIndex],A=Math.max(p.start,d.start),M=Math.min(c.count,Math.min(p.start+p.count,d.start+d.count));for(let E=A,z=M;E<z;E+=3){const C=E,T=E+1,B=E+2;r=oc(this,m,t,i,l,u,h,C,T,B),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=p.materialIndex,n.push(r))}}else{const g=Math.max(0,d.start),x=Math.min(c.count,d.start+d.count);for(let p=g,m=x;p<m;p+=3){const A=p,M=p+1,E=p+2;r=oc(this,o,t,i,l,u,h,A,M,E),r&&(r.faceIndex=Math.floor(p/3),n.push(r))}}}}function Yx(e,t,n,i,r,s,o,a){let c;if(t.side===Rn?c=i.intersectTriangle(o,s,r,!0,a):c=i.intersectTriangle(r,s,o,t.side===Fr,a),c===null)return null;sc.copy(a),sc.applyMatrix4(e.matrixWorld);const l=n.ray.origin.distanceTo(sc);return l<n.near||l>n.far?null:{distance:l,point:sc.clone(),object:e}}function oc(e,t,n,i,r,s,o,a,c,l){e.getVertexPosition(a,ec),e.getVertexPosition(c,nc),e.getVertexPosition(l,ic);const u=Yx(e,t,n,i,ec,nc,ic,ip);if(u){const h=new I;ri.getBarycoord(ip,ec,nc,ic,h),r&&(u.uv=ri.getInterpolatedAttribute(r,a,c,l,h,new mt)),s&&(u.uv1=ri.getInterpolatedAttribute(s,a,c,l,h,new mt)),o&&(u.normal=ri.getInterpolatedAttribute(o,a,c,l,h,new I),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new I,materialIndex:0};ri.getNormal(ec,nc,ic,f.normal),u.face=f,u.barycoord=h}return u}class Ia extends Ln{constructor(t=1,n=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const c=[],l=[],u=[],h=[];let f=0,d=0;g("z","y","x",-1,-1,i,n,t,o,s,0),g("z","y","x",1,-1,i,n,-t,o,s,1),g("x","z","y",1,1,t,i,n,r,o,2),g("x","z","y",1,-1,t,i,-n,r,o,3),g("x","y","z",1,-1,t,n,i,r,s,4),g("x","y","z",-1,-1,t,n,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new Xe(l,3)),this.setAttribute("normal",new Xe(u,3)),this.setAttribute("uv",new Xe(h,2));function g(x,p,m,A,M,E,z,C,T,B,et){const v=E/T,_=z/B,N=E/2,G=z/2,W=C/2,q=T+1,O=B+1;let j=0,H=0;const ct=new I;for(let lt=0;lt<O;lt++){const xt=lt*_-G;for(let Qt=0;Qt<q;Qt++){const ce=Qt*v-N;ct[x]=ce*A,ct[p]=xt*M,ct[m]=W,l.push(ct.x,ct.y,ct.z),ct[x]=0,ct[p]=0,ct[m]=C>0?1:-1,u.push(ct.x,ct.y,ct.z),h.push(Qt/T),h.push(1-lt/B),j+=1}}for(let lt=0;lt<B;lt++)for(let xt=0;xt<T;xt++){const Qt=f+xt+q*lt,ce=f+xt+q*(lt+1),X=f+(xt+1)+q*(lt+1),J=f+(xt+1)+q*lt;c.push(Qt,ce,J),c.push(ce,X,J),H+=6}a.addGroup(d,H,et),d+=H,f+=j}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ia(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function _o(e){const t={};for(const n in e){t[n]={};for(const i in e[n]){const r=e[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][i]=null):t[n][i]=r.clone():Array.isArray(r)?t[n][i]=r.slice():t[n][i]=r}}return t}function vn(e){const t={};for(let n=0;n<e.length;n++){const i=_o(e[n]);for(const r in i)t[r]=i[r]}return t}function Kx(e){const t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function qg(e){const t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:se.workingColorSpace}const jx={clone:_o,merge:vn};var Zx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Jx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Or extends Po{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Zx,this.fragmentShader=Jx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=_o(t.uniforms),this.uniformsGroups=Kx(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class Yg extends Sn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Re,this.projectionMatrix=new Re,this.projectionMatrixInverse=new Re,this.coordinateSystem=nr}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,n){super.updateWorldMatrix(t,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const yr=new I,rp=new mt,sp=new mt;class di extends Yg{constructor(t=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const n=.5*this.getFilmHeight()/t;this.fov=Rh*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ql*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Rh*2*Math.atan(Math.tan(ql*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,i){yr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(yr.x,yr.y).multiplyScalar(-t/yr.z),yr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(yr.x,yr.y).multiplyScalar(-t/yr.z)}getViewSize(t,n){return this.getViewBounds(t,rp,sp),n.subVectors(sp,rp)}setViewOffset(t,n,i,r,s,o){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let n=t*Math.tan(ql*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*r/c,n-=o.offsetY*i/l,r*=o.width/c,i*=o.height/l}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const zs=-90,Gs=1;class Qx extends Sn{constructor(t,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new di(zs,Gs,t,n);r.layers=this.layers,this.add(r);const s=new di(zs,Gs,t,n);s.layers=this.layers,this.add(s);const o=new di(zs,Gs,t,n);o.layers=this.layers,this.add(o);const a=new di(zs,Gs,t,n);a.layers=this.layers,this.add(a);const c=new di(zs,Gs,t,n);c.layers=this.layers,this.add(c);const l=new di(zs,Gs,t,n);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,n=this.children.concat(),[i,r,s,o,a,c]=n;for(const l of n)this.remove(l);if(t===nr)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Kc)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of n)this.add(l),l.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,c,l,u]=this.children,h=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,r),t.render(n,s),t.setRenderTarget(i,1,r),t.render(n,o),t.setRenderTarget(i,2,r),t.render(n,a),t.setRenderTarget(i,3,r),t.render(n,c),t.setRenderTarget(i,4,r),t.render(n,l),i.texture.generateMipmaps=x,t.setRenderTarget(i,5,r),t.render(n,u),t.setRenderTarget(h,f,d),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Kg extends yn{constructor(t,n,i,r,s,o,a,c,l,u){t=t!==void 0?t:[],n=n!==void 0?n:fo,super(t,n,i,r,s,o,a,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class ty extends vs{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},r=[i,i,i,i,i,i];this.texture=new Kg(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:_i}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ia(5,5,5),s=new Or({name:"CubemapFromEquirect",uniforms:_o(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Rn,blending:Rr});s.uniforms.tEquirect.value=n;const o=new ee(r,s),a=n.minFilter;return n.minFilter===is&&(n.minFilter=_i),new Qx(1,10,this).update(t,o),n.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,n,i,r){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(n,i,r);t.setRenderTarget(s)}}const mu=new I,ey=new I,ny=new Bt;class Zr{constructor(t=new I(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,i,r){return this.normal.set(t,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,i){const r=mu.subVectors(i,n).cross(ey.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n){const i=t.delta(mu),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(t.start).addScaledVector(i,s)}intersectsLine(t){const n=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return n<0&&i>0||i<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){const i=n||ny.getNormalMatrix(t),r=this.coplanarPoint(mu).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const $r=new pl,ac=new I;class jg{constructor(t=new Zr,n=new Zr,i=new Zr,r=new Zr,s=new Zr,o=new Zr){this.planes=[t,n,i,r,s,o]}set(t,n,i,r,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(n),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(t){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,n=nr){const i=this.planes,r=t.elements,s=r[0],o=r[1],a=r[2],c=r[3],l=r[4],u=r[5],h=r[6],f=r[7],d=r[8],g=r[9],x=r[10],p=r[11],m=r[12],A=r[13],M=r[14],E=r[15];if(i[0].setComponents(c-s,f-l,p-d,E-m).normalize(),i[1].setComponents(c+s,f+l,p+d,E+m).normalize(),i[2].setComponents(c+o,f+u,p+g,E+A).normalize(),i[3].setComponents(c-o,f-u,p-g,E-A).normalize(),i[4].setComponents(c-a,f-h,p-x,E-M).normalize(),n===nr)i[5].setComponents(c+a,f+h,p+x,E+M).normalize();else if(n===Kc)i[5].setComponents(a,h,x,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),$r.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),$r.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere($r)}intersectsSprite(t){return $r.center.set(0,0,0),$r.radius=.7071067811865476,$r.applyMatrix4(t.matrixWorld),this.intersectsSphere($r)}intersectsSphere(t){const n=this.planes,i=t.center,r=-t.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(t){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(ac.x=r.normal.x>0?t.max.x:t.min.x,ac.y=r.normal.y>0?t.max.y:t.min.y,ac.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(ac)<0)return!1}return!0}containsPoint(t){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Zg(){let e=null,t=!1,n=null,i=null;function r(s,o){n(s,o),i=e.requestAnimationFrame(r)}return{start:function(){t!==!0&&n!==null&&(i=e.requestAnimationFrame(r),t=!0)},stop:function(){e.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){n=s},setContext:function(s){e=s}}}function iy(e){const t=new WeakMap;function n(a,c){const l=a.array,u=a.usage,h=l.byteLength,f=e.createBuffer();e.bindBuffer(c,f),e.bufferData(c,l,u),a.onUploadCallback();let d;if(l instanceof Float32Array)d=e.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=e.HALF_FLOAT:d=e.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=e.SHORT;else if(l instanceof Uint32Array)d=e.UNSIGNED_INT;else if(l instanceof Int32Array)d=e.INT;else if(l instanceof Int8Array)d=e.BYTE;else if(l instanceof Uint8Array)d=e.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:h}}function i(a,c,l){const u=c.array,h=c.updateRanges;if(e.bindBuffer(l,a),h.length===0)e.bufferSubData(l,0,u);else{h.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<h.length;d++){const g=h[f],x=h[d];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++f,h[f]=x)}h.length=f+1;for(let d=0,g=h.length;d<g;d++){const x=h[d];e.bufferSubData(l,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(e.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,n(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:r,remove:s,update:o}}class pi extends Ln{constructor(t=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:i,heightSegments:r};const s=t/2,o=n/2,a=Math.floor(i),c=Math.floor(r),l=a+1,u=c+1,h=t/a,f=n/c,d=[],g=[],x=[],p=[];for(let m=0;m<u;m++){const A=m*f-o;for(let M=0;M<l;M++){const E=M*h-s;g.push(E,-A,0),x.push(0,0,1),p.push(M/a),p.push(1-m/c)}}for(let m=0;m<c;m++)for(let A=0;A<a;A++){const M=A+l*m,E=A+l*(m+1),z=A+1+l*(m+1),C=A+1+l*m;d.push(M,E,C),d.push(E,z,C)}this.setIndex(d),this.setAttribute("position",new Xe(g,3)),this.setAttribute("normal",new Xe(x,3)),this.setAttribute("uv",new Xe(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new pi(t.width,t.height,t.widthSegments,t.heightSegments)}}var ry=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,sy=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,oy=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ay=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,cy=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ly=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,uy=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,hy=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,fy=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,dy=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,py=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,my=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,gy=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,_y=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,vy=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,xy=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,yy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Sy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,My=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ey=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,by=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ay=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Ty=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,wy=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Cy=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Ry=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Py=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ly=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Iy=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Dy=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Uy="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ny=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Fy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Oy=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ky=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,By=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,zy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Gy=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Vy=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Hy=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Wy=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Xy=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,$y=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,qy=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Yy=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ky=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,jy=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Zy=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Jy=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Qy=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,t3=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,e3=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,n3=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,i3=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,r3=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,s3=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,o3=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,a3=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,c3=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,l3=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,u3=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,h3=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,f3=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,d3=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,p3=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,m3=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,g3=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,_3=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,v3=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,x3=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,y3=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,S3=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,M3=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,E3=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,b3=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,A3=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,T3=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,w3=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,C3=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,R3=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,P3=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,L3=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,I3=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,D3=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,U3=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,N3=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,F3=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,O3=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,k3=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,B3=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,z3=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,G3=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,V3=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,H3=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,W3=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,X3=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,$3=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,q3=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Y3=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,K3=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,j3=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Z3=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,J3=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Q3=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,tS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,eS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,nS=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const iS=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,rS=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,oS=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,aS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cS=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lS=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,uS=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,hS=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,fS=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,dS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,pS=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mS=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,gS=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,_S=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,vS=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xS=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yS=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,SS=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,MS=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ES=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,bS=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,AS=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,TS=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wS=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,CS=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,RS=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,PS=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,LS=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,IS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,DS=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,US=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,NS=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,FS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,kt={alphahash_fragment:ry,alphahash_pars_fragment:sy,alphamap_fragment:oy,alphamap_pars_fragment:ay,alphatest_fragment:cy,alphatest_pars_fragment:ly,aomap_fragment:uy,aomap_pars_fragment:hy,batching_pars_vertex:fy,batching_vertex:dy,begin_vertex:py,beginnormal_vertex:my,bsdfs:gy,iridescence_fragment:_y,bumpmap_pars_fragment:vy,clipping_planes_fragment:xy,clipping_planes_pars_fragment:yy,clipping_planes_pars_vertex:Sy,clipping_planes_vertex:My,color_fragment:Ey,color_pars_fragment:by,color_pars_vertex:Ay,color_vertex:Ty,common:wy,cube_uv_reflection_fragment:Cy,defaultnormal_vertex:Ry,displacementmap_pars_vertex:Py,displacementmap_vertex:Ly,emissivemap_fragment:Iy,emissivemap_pars_fragment:Dy,colorspace_fragment:Uy,colorspace_pars_fragment:Ny,envmap_fragment:Fy,envmap_common_pars_fragment:Oy,envmap_pars_fragment:ky,envmap_pars_vertex:By,envmap_physical_pars_fragment:jy,envmap_vertex:zy,fog_vertex:Gy,fog_pars_vertex:Vy,fog_fragment:Hy,fog_pars_fragment:Wy,gradientmap_pars_fragment:Xy,lightmap_pars_fragment:$y,lights_lambert_fragment:qy,lights_lambert_pars_fragment:Yy,lights_pars_begin:Ky,lights_toon_fragment:Zy,lights_toon_pars_fragment:Jy,lights_phong_fragment:Qy,lights_phong_pars_fragment:t3,lights_physical_fragment:e3,lights_physical_pars_fragment:n3,lights_fragment_begin:i3,lights_fragment_maps:r3,lights_fragment_end:s3,logdepthbuf_fragment:o3,logdepthbuf_pars_fragment:a3,logdepthbuf_pars_vertex:c3,logdepthbuf_vertex:l3,map_fragment:u3,map_pars_fragment:h3,map_particle_fragment:f3,map_particle_pars_fragment:d3,metalnessmap_fragment:p3,metalnessmap_pars_fragment:m3,morphinstance_vertex:g3,morphcolor_vertex:_3,morphnormal_vertex:v3,morphtarget_pars_vertex:x3,morphtarget_vertex:y3,normal_fragment_begin:S3,normal_fragment_maps:M3,normal_pars_fragment:E3,normal_pars_vertex:b3,normal_vertex:A3,normalmap_pars_fragment:T3,clearcoat_normal_fragment_begin:w3,clearcoat_normal_fragment_maps:C3,clearcoat_pars_fragment:R3,iridescence_pars_fragment:P3,opaque_fragment:L3,packing:I3,premultiplied_alpha_fragment:D3,project_vertex:U3,dithering_fragment:N3,dithering_pars_fragment:F3,roughnessmap_fragment:O3,roughnessmap_pars_fragment:k3,shadowmap_pars_fragment:B3,shadowmap_pars_vertex:z3,shadowmap_vertex:G3,shadowmask_pars_fragment:V3,skinbase_vertex:H3,skinning_pars_vertex:W3,skinning_vertex:X3,skinnormal_vertex:$3,specularmap_fragment:q3,specularmap_pars_fragment:Y3,tonemapping_fragment:K3,tonemapping_pars_fragment:j3,transmission_fragment:Z3,transmission_pars_fragment:J3,uv_pars_fragment:Q3,uv_pars_vertex:tS,uv_vertex:eS,worldpos_vertex:nS,background_vert:iS,background_frag:rS,backgroundCube_vert:sS,backgroundCube_frag:oS,cube_vert:aS,cube_frag:cS,depth_vert:lS,depth_frag:uS,distanceRGBA_vert:hS,distanceRGBA_frag:fS,equirect_vert:dS,equirect_frag:pS,linedashed_vert:mS,linedashed_frag:gS,meshbasic_vert:_S,meshbasic_frag:vS,meshlambert_vert:xS,meshlambert_frag:yS,meshmatcap_vert:SS,meshmatcap_frag:MS,meshnormal_vert:ES,meshnormal_frag:bS,meshphong_vert:AS,meshphong_frag:TS,meshphysical_vert:wS,meshphysical_frag:CS,meshtoon_vert:RS,meshtoon_frag:PS,points_vert:LS,points_frag:IS,shadow_vert:DS,shadow_frag:US,sprite_vert:NS,sprite_frag:FS},nt={common:{diffuse:{value:new oe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Bt}},envmap:{envMap:{value:null},envMapRotation:{value:new Bt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Bt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Bt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Bt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Bt},normalScale:{value:new mt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Bt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Bt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Bt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Bt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new oe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new oe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0},uvTransform:{value:new Bt}},sprite:{diffuse:{value:new oe(16777215)},opacity:{value:1},center:{value:new mt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}}},Pi={basic:{uniforms:vn([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.fog]),vertexShader:kt.meshbasic_vert,fragmentShader:kt.meshbasic_frag},lambert:{uniforms:vn([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,nt.lights,{emissive:{value:new oe(0)}}]),vertexShader:kt.meshlambert_vert,fragmentShader:kt.meshlambert_frag},phong:{uniforms:vn([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,nt.lights,{emissive:{value:new oe(0)},specular:{value:new oe(1118481)},shininess:{value:30}}]),vertexShader:kt.meshphong_vert,fragmentShader:kt.meshphong_frag},standard:{uniforms:vn([nt.common,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.roughnessmap,nt.metalnessmap,nt.fog,nt.lights,{emissive:{value:new oe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag},toon:{uniforms:vn([nt.common,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.gradientmap,nt.fog,nt.lights,{emissive:{value:new oe(0)}}]),vertexShader:kt.meshtoon_vert,fragmentShader:kt.meshtoon_frag},matcap:{uniforms:vn([nt.common,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,{matcap:{value:null}}]),vertexShader:kt.meshmatcap_vert,fragmentShader:kt.meshmatcap_frag},points:{uniforms:vn([nt.points,nt.fog]),vertexShader:kt.points_vert,fragmentShader:kt.points_frag},dashed:{uniforms:vn([nt.common,nt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:kt.linedashed_vert,fragmentShader:kt.linedashed_frag},depth:{uniforms:vn([nt.common,nt.displacementmap]),vertexShader:kt.depth_vert,fragmentShader:kt.depth_frag},normal:{uniforms:vn([nt.common,nt.bumpmap,nt.normalmap,nt.displacementmap,{opacity:{value:1}}]),vertexShader:kt.meshnormal_vert,fragmentShader:kt.meshnormal_frag},sprite:{uniforms:vn([nt.sprite,nt.fog]),vertexShader:kt.sprite_vert,fragmentShader:kt.sprite_frag},background:{uniforms:{uvTransform:{value:new Bt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:kt.background_vert,fragmentShader:kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Bt}},vertexShader:kt.backgroundCube_vert,fragmentShader:kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:kt.cube_vert,fragmentShader:kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:kt.equirect_vert,fragmentShader:kt.equirect_frag},distanceRGBA:{uniforms:vn([nt.common,nt.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:kt.distanceRGBA_vert,fragmentShader:kt.distanceRGBA_frag},shadow:{uniforms:vn([nt.lights,nt.fog,{color:{value:new oe(0)},opacity:{value:1}}]),vertexShader:kt.shadow_vert,fragmentShader:kt.shadow_frag}};Pi.physical={uniforms:vn([Pi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Bt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Bt},clearcoatNormalScale:{value:new mt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Bt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Bt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Bt},sheen:{value:0},sheenColor:{value:new oe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Bt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Bt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Bt},transmissionSamplerSize:{value:new mt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Bt},attenuationDistance:{value:0},attenuationColor:{value:new oe(0)},specularColor:{value:new oe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Bt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Bt},anisotropyVector:{value:new mt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Bt}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag};const cc={r:0,b:0,g:0},qr=new ar,OS=new Re;function kS(e,t,n,i,r,s,o){const a=new oe(0);let c=s===!0?0:1,l,u,h=null,f=0,d=null;function g(A){let M=A.isScene===!0?A.background:null;return M&&M.isTexture&&(M=(A.backgroundBlurriness>0?n:t).get(M)),M}function x(A){let M=!1;const E=g(A);E===null?m(a,c):E&&E.isColor&&(m(E,1),M=!0);const z=e.xr.getEnvironmentBlendMode();z==="additive"?i.buffers.color.setClear(0,0,0,1,o):z==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(e.autoClear||M)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function p(A,M){const E=g(M);E&&(E.isCubeTexture||E.mapping===fl)?(u===void 0&&(u=new ee(new Ia(1,1,1),new Or({name:"BackgroundCubeMaterial",uniforms:_o(Pi.backgroundCube.uniforms),vertexShader:Pi.backgroundCube.vertexShader,fragmentShader:Pi.backgroundCube.fragmentShader,side:Rn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(z,C,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),qr.copy(M.backgroundRotation),qr.x*=-1,qr.y*=-1,qr.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(qr.y*=-1,qr.z*=-1),u.material.uniforms.envMap.value=E,u.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(OS.makeRotationFromEuler(qr)),u.material.toneMapped=se.getTransfer(E.colorSpace)!==xe,(h!==E||f!==E.version||d!==e.toneMapping)&&(u.material.needsUpdate=!0,h=E,f=E.version,d=e.toneMapping),u.layers.enableAll(),A.unshift(u,u.geometry,u.material,0,0,null)):E&&E.isTexture&&(l===void 0&&(l=new ee(new pi(2,2),new Or({name:"BackgroundMaterial",uniforms:_o(Pi.background.uniforms),vertexShader:Pi.background.vertexShader,fragmentShader:Pi.background.fragmentShader,side:Fr,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=E,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=se.getTransfer(E.colorSpace)!==xe,E.matrixAutoUpdate===!0&&E.updateMatrix(),l.material.uniforms.uvTransform.value.copy(E.matrix),(h!==E||f!==E.version||d!==e.toneMapping)&&(l.material.needsUpdate=!0,h=E,f=E.version,d=e.toneMapping),l.layers.enableAll(),A.unshift(l,l.geometry,l.material,0,0,null))}function m(A,M){A.getRGB(cc,qg(e)),i.buffers.color.setClear(cc.r,cc.g,cc.b,M,o)}return{getClearColor:function(){return a},setClearColor:function(A,M=1){a.set(A),c=M,m(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(A){c=A,m(a,c)},render:x,addToRenderList:p}}function BS(e,t){const n=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},r=f(null);let s=r,o=!1;function a(v,_,N,G,W){let q=!1;const O=h(G,N,_);s!==O&&(s=O,l(s.object)),q=d(v,G,N,W),q&&g(v,G,N,W),W!==null&&t.update(W,e.ELEMENT_ARRAY_BUFFER),(q||o)&&(o=!1,E(v,_,N,G),W!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function c(){return e.createVertexArray()}function l(v){return e.bindVertexArray(v)}function u(v){return e.deleteVertexArray(v)}function h(v,_,N){const G=N.wireframe===!0;let W=i[v.id];W===void 0&&(W={},i[v.id]=W);let q=W[_.id];q===void 0&&(q={},W[_.id]=q);let O=q[G];return O===void 0&&(O=f(c()),q[G]=O),O}function f(v){const _=[],N=[],G=[];for(let W=0;W<n;W++)_[W]=0,N[W]=0,G[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:_,enabledAttributes:N,attributeDivisors:G,object:v,attributes:{},index:null}}function d(v,_,N,G){const W=s.attributes,q=_.attributes;let O=0;const j=N.getAttributes();for(const H in j)if(j[H].location>=0){const lt=W[H];let xt=q[H];if(xt===void 0&&(H==="instanceMatrix"&&v.instanceMatrix&&(xt=v.instanceMatrix),H==="instanceColor"&&v.instanceColor&&(xt=v.instanceColor)),lt===void 0||lt.attribute!==xt||xt&&lt.data!==xt.data)return!0;O++}return s.attributesNum!==O||s.index!==G}function g(v,_,N,G){const W={},q=_.attributes;let O=0;const j=N.getAttributes();for(const H in j)if(j[H].location>=0){let lt=q[H];lt===void 0&&(H==="instanceMatrix"&&v.instanceMatrix&&(lt=v.instanceMatrix),H==="instanceColor"&&v.instanceColor&&(lt=v.instanceColor));const xt={};xt.attribute=lt,lt&&lt.data&&(xt.data=lt.data),W[H]=xt,O++}s.attributes=W,s.attributesNum=O,s.index=G}function x(){const v=s.newAttributes;for(let _=0,N=v.length;_<N;_++)v[_]=0}function p(v){m(v,0)}function m(v,_){const N=s.newAttributes,G=s.enabledAttributes,W=s.attributeDivisors;N[v]=1,G[v]===0&&(e.enableVertexAttribArray(v),G[v]=1),W[v]!==_&&(e.vertexAttribDivisor(v,_),W[v]=_)}function A(){const v=s.newAttributes,_=s.enabledAttributes;for(let N=0,G=_.length;N<G;N++)_[N]!==v[N]&&(e.disableVertexAttribArray(N),_[N]=0)}function M(v,_,N,G,W,q,O){O===!0?e.vertexAttribIPointer(v,_,N,W,q):e.vertexAttribPointer(v,_,N,G,W,q)}function E(v,_,N,G){x();const W=G.attributes,q=N.getAttributes(),O=_.defaultAttributeValues;for(const j in q){const H=q[j];if(H.location>=0){let ct=W[j];if(ct===void 0&&(j==="instanceMatrix"&&v.instanceMatrix&&(ct=v.instanceMatrix),j==="instanceColor"&&v.instanceColor&&(ct=v.instanceColor)),ct!==void 0){const lt=ct.normalized,xt=ct.itemSize,Qt=t.get(ct);if(Qt===void 0)continue;const ce=Qt.buffer,X=Qt.type,J=Qt.bytesPerElement,_t=X===e.INT||X===e.UNSIGNED_INT||ct.gpuType===ff;if(ct.isInterleavedBufferAttribute){const ut=ct.data,Nt=ut.stride,Rt=ct.offset;if(ut.isInstancedInterleavedBuffer){for(let Xt=0;Xt<H.locationSize;Xt++)m(H.location+Xt,ut.meshPerAttribute);v.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=ut.meshPerAttribute*ut.count)}else for(let Xt=0;Xt<H.locationSize;Xt++)p(H.location+Xt);e.bindBuffer(e.ARRAY_BUFFER,ce);for(let Xt=0;Xt<H.locationSize;Xt++)M(H.location+Xt,xt/H.locationSize,X,lt,Nt*J,(Rt+xt/H.locationSize*Xt)*J,_t)}else{if(ct.isInstancedBufferAttribute){for(let ut=0;ut<H.locationSize;ut++)m(H.location+ut,ct.meshPerAttribute);v.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=ct.meshPerAttribute*ct.count)}else for(let ut=0;ut<H.locationSize;ut++)p(H.location+ut);e.bindBuffer(e.ARRAY_BUFFER,ce);for(let ut=0;ut<H.locationSize;ut++)M(H.location+ut,xt/H.locationSize,X,lt,xt*J,xt/H.locationSize*ut*J,_t)}}else if(O!==void 0){const lt=O[j];if(lt!==void 0)switch(lt.length){case 2:e.vertexAttrib2fv(H.location,lt);break;case 3:e.vertexAttrib3fv(H.location,lt);break;case 4:e.vertexAttrib4fv(H.location,lt);break;default:e.vertexAttrib1fv(H.location,lt)}}}}A()}function z(){B();for(const v in i){const _=i[v];for(const N in _){const G=_[N];for(const W in G)u(G[W].object),delete G[W];delete _[N]}delete i[v]}}function C(v){if(i[v.id]===void 0)return;const _=i[v.id];for(const N in _){const G=_[N];for(const W in G)u(G[W].object),delete G[W];delete _[N]}delete i[v.id]}function T(v){for(const _ in i){const N=i[_];if(N[v.id]===void 0)continue;const G=N[v.id];for(const W in G)u(G[W].object),delete G[W];delete N[v.id]}}function B(){et(),o=!0,s!==r&&(s=r,l(s.object))}function et(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:B,resetDefaultState:et,dispose:z,releaseStatesOfGeometry:C,releaseStatesOfProgram:T,initAttributes:x,enableAttribute:p,disableUnusedAttributes:A}}function zS(e,t,n){let i;function r(l){i=l}function s(l,u){e.drawArrays(i,l,u),n.update(u,i,1)}function o(l,u,h){h!==0&&(e.drawArraysInstanced(i,l,u,h),n.update(u,i,h))}function a(l,u,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,u,0,h);let d=0;for(let g=0;g<h;g++)d+=u[g];n.update(d,i,1)}function c(l,u,h,f){if(h===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<l.length;g++)o(l[g],u[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(i,l,0,u,0,f,0,h);let g=0;for(let x=0;x<h;x++)g+=u[x];for(let x=0;x<f.length;x++)n.update(g,i,f[x])}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function GS(e,t,n,i){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const T=t.get("EXT_texture_filter_anisotropic");r=e.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(T){return!(T!==vi&&i.convert(T)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(T){const B=T===Ra&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(T!==or&&i.convert(T)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==er&&!B)}function c(T){if(T==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=n.precision!==void 0?n.precision:"highp";const u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const h=n.logarithmicDepthBuffer===!0,f=n.reverseDepthBuffer===!0&&t.has("EXT_clip_control");if(f===!0){const T=t.get("EXT_clip_control");T.clipControlEXT(T.LOWER_LEFT_EXT,T.ZERO_TO_ONE_EXT)}const d=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),g=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=e.getParameter(e.MAX_TEXTURE_SIZE),p=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),m=e.getParameter(e.MAX_VERTEX_ATTRIBS),A=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),M=e.getParameter(e.MAX_VARYING_VECTORS),E=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),z=g>0,C=e.getParameter(e.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:h,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:A,maxVaryings:M,maxFragmentUniforms:E,vertexTextures:z,maxSamples:C}}function VS(e){const t=this;let n=null,i=0,r=!1,s=!1;const o=new Zr,a=new Bt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||i!==0||r;return r=f,i=h.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){n=u(h,f,0)},this.setState=function(h,f,d){const g=h.clippingPlanes,x=h.clipIntersection,p=h.clipShadows,m=e.get(h);if(!r||g===null||g.length===0||s&&!p)s?u(null):l();else{const A=s?0:i,M=A*4;let E=m.clippingState||null;c.value=E,E=u(g,f,M,d);for(let z=0;z!==M;++z)E[z]=n[z];m.clippingState=E,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=A}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(h,f,d,g){const x=h!==null?h.length:0;let p=null;if(x!==0){if(p=c.value,g!==!0||p===null){const m=d+x*4,A=f.matrixWorldInverse;a.getNormalMatrix(A),(p===null||p.length<m)&&(p=new Float32Array(m));for(let M=0,E=d;M!==x;++M,E+=4)o.copy(h[M]).applyMatrix4(A,a),o.normal.toArray(p,E),p[E+3]=o.constant}c.value=p,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,p}}function HS(e){let t=new WeakMap;function n(o,a){return a===Ju?o.mapping=fo:a===Qu&&(o.mapping=po),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Ju||a===Qu)if(t.has(o)){const c=t.get(o).texture;return n(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new ty(c.height);return l.fromEquirectangularTexture(e,o),t.set(o,l),o.addEventListener("dispose",r),n(l.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function s(){t=new WeakMap}return{get:i,dispose:s}}class Jg extends Yg{constructor(t=-1,n=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-t,o=i+t,a=r+n,c=r-n;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=u*this.view.offsetY,c=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const Zs=4,op=[.125,.215,.35,.446,.526,.582],ts=20,gu=new Jg,ap=new oe;let _u=null,vu=0,xu=0,yu=!1;const Jr=(1+Math.sqrt(5))/2,Vs=1/Jr,cp=[new I(-Jr,Vs,0),new I(Jr,Vs,0),new I(-Vs,0,Jr),new I(Vs,0,Jr),new I(0,Jr,-Vs),new I(0,Jr,Vs),new I(-1,1,-1),new I(1,1,-1),new I(-1,1,1),new I(1,1,1)];class lp{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,n=0,i=.1,r=100){_u=this._renderer.getRenderTarget(),vu=this._renderer.getActiveCubeFace(),xu=this._renderer.getActiveMipmapLevel(),yu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,i,r,s),n>0&&this._blur(s,0,0,n),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=fp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=hp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(_u,vu,xu),this._renderer.xr.enabled=yu,t.scissorTest=!1,lc(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===fo||t.mapping===po?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),_u=this._renderer.getRenderTarget(),vu=this._renderer.getActiveCubeFace(),xu=this._renderer.getActiveMipmapLevel(),yu=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:_i,minFilter:_i,generateMipmaps:!1,type:Ra,format:vi,colorSpace:zr,depthBuffer:!1},r=up(t,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=up(t,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=WS(s)),this._blurMaterial=XS(s,t,n)}return r}_compileMaterial(t){const n=new ee(this._lodPlanes[0],t);this._renderer.compile(n,gu)}_sceneToCubeUV(t,n,i,r){const a=new di(90,1,n,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(ap),u.toneMapping=Pr,u.autoClear=!1;const d=new xs({name:"PMREM.Background",side:Rn,depthWrite:!1,depthTest:!1}),g=new ee(new Ia,d);let x=!1;const p=t.background;p?p.isColor&&(d.color.copy(p),t.background=null,x=!0):(d.color.copy(ap),x=!0);for(let m=0;m<6;m++){const A=m%3;A===0?(a.up.set(0,c[m],0),a.lookAt(l[m],0,0)):A===1?(a.up.set(0,0,c[m]),a.lookAt(0,l[m],0)):(a.up.set(0,c[m],0),a.lookAt(0,0,l[m]));const M=this._cubeSize;lc(r,A*M,m>2?M:0,M,M),u.setRenderTarget(r),x&&u.render(g,a),u.render(t,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=h,t.background=p}_textureToCubeUV(t,n){const i=this._renderer,r=t.mapping===fo||t.mapping===po;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=fp()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=hp());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new ee(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const c=this._cubeSize;lc(n,0,0,3*c,2*c),i.setRenderTarget(n),i.render(o,gu)}_applyPMREM(t){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=cp[(r-s-1)%cp.length];this._blur(t,s-1,s,o,a)}n.autoClear=i}_blur(t,n,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,n,i,r,"latitudinal",s),this._halfBlur(o,t,i,i,r,"longitudinal",s)}_halfBlur(t,n,i,r,s,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new ee(this._lodPlanes[r],l),f=l.uniforms,d=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*ts-1),x=s/g,p=isFinite(s)?1+Math.floor(u*x):ts;p>ts&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${ts}`);const m=[];let A=0;for(let T=0;T<ts;++T){const B=T/x,et=Math.exp(-B*B/2);m.push(et),T===0?A+=et:T<p&&(A+=2*et)}for(let T=0;T<m.length;T++)m[T]=m[T]/A;f.envMap.value=t.texture,f.samples.value=p,f.weights.value=m,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:M}=this;f.dTheta.value=g,f.mipInt.value=M-i;const E=this._sizeLods[r],z=3*E*(r>M-Zs?r-M+Zs:0),C=4*(this._cubeSize-E);lc(n,z,C,3*E,2*E),c.setRenderTarget(n),c.render(h,gu)}}function WS(e){const t=[],n=[],i=[];let r=e;const s=e-Zs+1+op.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);n.push(a);let c=1/a;o>e-Zs?c=op[o-e+Zs-1]:o===0&&(c=0),i.push(c);const l=1/(a-2),u=-l,h=1+l,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,g=6,x=3,p=2,m=1,A=new Float32Array(x*g*d),M=new Float32Array(p*g*d),E=new Float32Array(m*g*d);for(let C=0;C<d;C++){const T=C%3*2/3-1,B=C>2?0:-1,et=[T,B,0,T+2/3,B,0,T+2/3,B+1,0,T,B,0,T+2/3,B+1,0,T,B+1,0];A.set(et,x*g*C),M.set(f,p*g*C);const v=[C,C,C,C,C,C];E.set(v,m*g*C)}const z=new Ln;z.setAttribute("position",new yi(A,x)),z.setAttribute("uv",new yi(M,p)),z.setAttribute("faceIndex",new yi(E,m)),t.push(z),r>Zs&&r--}return{lodPlanes:t,sizeLods:n,sigmas:i}}function up(e,t,n){const i=new vs(e,t,n);return i.texture.mapping=fl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function lc(e,t,n,i,r){e.viewport.set(t,n,i,r),e.scissor.set(t,n,i,r)}function XS(e,t,n){const i=new Float32Array(ts),r=new I(0,1,0);return new Or({name:"SphericalGaussianBlur",defines:{n:ts,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:xf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Rr,depthTest:!1,depthWrite:!1})}function hp(){return new Or({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:xf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Rr,depthTest:!1,depthWrite:!1})}function fp(){return new Or({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:xf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Rr,depthTest:!1,depthWrite:!1})}function xf(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function $S(e){let t=new WeakMap,n=null;function i(a){if(a&&a.isTexture){const c=a.mapping,l=c===Ju||c===Qu,u=c===fo||c===po;if(l||u){let h=t.get(a);const f=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return n===null&&(n=new lp(e)),h=l?n.fromEquirectangular(a,h):n.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),h.texture;if(h!==void 0)return h.texture;{const d=a.image;return l&&d&&d.height>0||u&&d&&r(d)?(n===null&&(n=new lp(e)),h=l?n.fromEquirectangular(a):n.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),a.addEventListener("dispose",s),h.texture):null}}}return a}function r(a){let c=0;const l=6;for(let u=0;u<l;u++)a[u]!==void 0&&c++;return c===l}function s(a){const c=a.target;c.removeEventListener("dispose",s);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:o}}function qS(e){const t={};function n(i){if(t[i]!==void 0)return t[i];let r;switch(i){case"WEBGL_depth_texture":r=e.getExtension("WEBGL_depth_texture")||e.getExtension("MOZ_WEBGL_depth_texture")||e.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=e.getExtension("WEBGL_compressed_texture_s3tc")||e.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=e.getExtension(i)}return t[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&Bc("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function YS(e,t,n,i){const r={},s=new WeakMap;function o(h){const f=h.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);for(const g in f.morphAttributes){const x=f.morphAttributes[g];for(let p=0,m=x.length;p<m;p++)t.remove(x[p])}f.removeEventListener("dispose",o),delete r[f.id];const d=s.get(f);d&&(t.remove(d),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,n.memory.geometries--}function a(h,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,n.memory.geometries++),f}function c(h){const f=h.attributes;for(const g in f)t.update(f[g],e.ARRAY_BUFFER);const d=h.morphAttributes;for(const g in d){const x=d[g];for(let p=0,m=x.length;p<m;p++)t.update(x[p],e.ARRAY_BUFFER)}}function l(h){const f=[],d=h.index,g=h.attributes.position;let x=0;if(d!==null){const A=d.array;x=d.version;for(let M=0,E=A.length;M<E;M+=3){const z=A[M+0],C=A[M+1],T=A[M+2];f.push(z,C,C,T,T,z)}}else if(g!==void 0){const A=g.array;x=g.version;for(let M=0,E=A.length/3-1;M<E;M+=3){const z=M+0,C=M+1,T=M+2;f.push(z,C,C,T,T,z)}}else return;const p=new(Bg(f)?$g:Xg)(f,1);p.version=x;const m=s.get(h);m&&t.remove(m),s.set(h,p)}function u(h){const f=s.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&l(h)}else l(h);return s.get(h)}return{get:a,update:c,getWireframeAttribute:u}}function KS(e,t,n){let i;function r(f){i=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function c(f,d){e.drawElements(i,d,s,f*o),n.update(d,i,1)}function l(f,d,g){g!==0&&(e.drawElementsInstanced(i,d,s,f*o,g),n.update(d,i,g))}function u(f,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,s,f,0,g);let p=0;for(let m=0;m<g;m++)p+=d[m];n.update(p,i,1)}function h(f,d,g,x){if(g===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<f.length;m++)l(f[m]/o,d[m],x[m]);else{p.multiDrawElementsInstancedWEBGL(i,d,0,s,f,0,x,0,g);let m=0;for(let A=0;A<g;A++)m+=d[A];for(let A=0;A<x.length;A++)n.update(m,i,x[A])}}this.setMode=r,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function jS(e){const t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(n.calls++,o){case e.TRIANGLES:n.triangles+=a*(s/3);break;case e.LINES:n.lines+=a*(s/2);break;case e.LINE_STRIP:n.lines+=a*(s-1);break;case e.LINE_LOOP:n.lines+=a*s;break;case e.POINTS:n.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:r,update:i}}function ZS(e,t,n){const i=new WeakMap,r=new ke;function s(o,a,c){const l=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let f=i.get(a);if(f===void 0||f.count!==h){let v=function(){B.dispose(),i.delete(a),a.removeEventListener("dispose",v)};var d=v;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],A=a.morphAttributes.normal||[],M=a.morphAttributes.color||[];let E=0;g===!0&&(E=1),x===!0&&(E=2),p===!0&&(E=3);let z=a.attributes.position.count*E,C=1;z>t.maxTextureSize&&(C=Math.ceil(z/t.maxTextureSize),z=t.maxTextureSize);const T=new Float32Array(z*C*4*h),B=new Gg(T,z,C,h);B.type=er,B.needsUpdate=!0;const et=E*4;for(let _=0;_<h;_++){const N=m[_],G=A[_],W=M[_],q=z*C*4*_;for(let O=0;O<N.count;O++){const j=O*et;g===!0&&(r.fromBufferAttribute(N,O),T[q+j+0]=r.x,T[q+j+1]=r.y,T[q+j+2]=r.z,T[q+j+3]=0),x===!0&&(r.fromBufferAttribute(G,O),T[q+j+4]=r.x,T[q+j+5]=r.y,T[q+j+6]=r.z,T[q+j+7]=0),p===!0&&(r.fromBufferAttribute(W,O),T[q+j+8]=r.x,T[q+j+9]=r.y,T[q+j+10]=r.z,T[q+j+11]=W.itemSize===4?r.w:1)}}f={count:h,texture:B,size:new mt(z,C)},i.set(a,f),a.addEventListener("dispose",v)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(e,"morphTexture",o.morphTexture,n);else{let g=0;for(let p=0;p<l.length;p++)g+=l[p];const x=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(e,"morphTargetBaseInfluence",x),c.getUniforms().setValue(e,"morphTargetInfluences",l)}c.getUniforms().setValue(e,"morphTargetsTexture",f.texture,n),c.getUniforms().setValue(e,"morphTargetsTextureSize",f.size)}return{update:s}}function JS(e,t,n,i){let r=new WeakMap;function s(c){const l=i.render.frame,u=c.geometry,h=t.get(c,u);if(r.get(h)!==l&&(t.update(h),r.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),r.get(c)!==l&&(n.update(c.instanceMatrix,e.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,e.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;r.get(f)!==l&&(f.update(),r.set(f,l))}return h}function o(){r=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),n.remove(l.instanceMatrix),l.instanceColor!==null&&n.remove(l.instanceColor)}return{update:s,dispose:o}}class Qg extends yn{constructor(t,n,i,r,s,o,a,c,l,u=so){if(u!==so&&u!==go)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===so&&(i=_s),i===void 0&&u===go&&(i=mo),super(null,r,s,o,a,c,u,i,l),this.isDepthTexture=!0,this.image={width:t,height:n},this.magFilter=a!==void 0?a:si,this.minFilter=c!==void 0?c:si,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const n=super.toJSON(t);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const t0=new yn,dp=new Qg(1,1),e0=new Gg,n0=new kx,i0=new Kg,pp=[],mp=[],gp=new Float32Array(16),_p=new Float32Array(9),vp=new Float32Array(4);function Lo(e,t,n){const i=e[0];if(i<=0||i>0)return e;const r=t*n;let s=pp[r];if(s===void 0&&(s=new Float32Array(r),pp[r]=s),t!==0){i.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=n,e[o].toArray(s,a)}return s}function Je(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function Qe(e,t){for(let n=0,i=t.length;n<i;n++)e[n]=t[n]}function ml(e,t){let n=mp[t];n===void 0&&(n=new Int32Array(t),mp[t]=n);for(let i=0;i!==t;++i)n[i]=e.allocateTextureUnit();return n}function QS(e,t){const n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function tM(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Je(n,t))return;e.uniform2fv(this.addr,t),Qe(n,t)}}function eM(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Je(n,t))return;e.uniform3fv(this.addr,t),Qe(n,t)}}function nM(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Je(n,t))return;e.uniform4fv(this.addr,t),Qe(n,t)}}function iM(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Je(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Qe(n,t)}else{if(Je(n,i))return;vp.set(i),e.uniformMatrix2fv(this.addr,!1,vp),Qe(n,i)}}function rM(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Je(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Qe(n,t)}else{if(Je(n,i))return;_p.set(i),e.uniformMatrix3fv(this.addr,!1,_p),Qe(n,i)}}function sM(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Je(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Qe(n,t)}else{if(Je(n,i))return;gp.set(i),e.uniformMatrix4fv(this.addr,!1,gp),Qe(n,i)}}function oM(e,t){const n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function aM(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Je(n,t))return;e.uniform2iv(this.addr,t),Qe(n,t)}}function cM(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Je(n,t))return;e.uniform3iv(this.addr,t),Qe(n,t)}}function lM(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Je(n,t))return;e.uniform4iv(this.addr,t),Qe(n,t)}}function uM(e,t){const n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function hM(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Je(n,t))return;e.uniform2uiv(this.addr,t),Qe(n,t)}}function fM(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Je(n,t))return;e.uniform3uiv(this.addr,t),Qe(n,t)}}function dM(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Je(n,t))return;e.uniform4uiv(this.addr,t),Qe(n,t)}}function pM(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r);let s;this.type===e.SAMPLER_2D_SHADOW?(dp.compareFunction=kg,s=dp):s=t0,n.setTexture2D(t||s,r)}function mM(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(t||n0,r)}function gM(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(t||i0,r)}function _M(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(t||e0,r)}function vM(e){switch(e){case 5126:return QS;case 35664:return tM;case 35665:return eM;case 35666:return nM;case 35674:return iM;case 35675:return rM;case 35676:return sM;case 5124:case 35670:return oM;case 35667:case 35671:return aM;case 35668:case 35672:return cM;case 35669:case 35673:return lM;case 5125:return uM;case 36294:return hM;case 36295:return fM;case 36296:return dM;case 35678:case 36198:case 36298:case 36306:case 35682:return pM;case 35679:case 36299:case 36307:return mM;case 35680:case 36300:case 36308:case 36293:return gM;case 36289:case 36303:case 36311:case 36292:return _M}}function xM(e,t){e.uniform1fv(this.addr,t)}function yM(e,t){const n=Lo(t,this.size,2);e.uniform2fv(this.addr,n)}function SM(e,t){const n=Lo(t,this.size,3);e.uniform3fv(this.addr,n)}function MM(e,t){const n=Lo(t,this.size,4);e.uniform4fv(this.addr,n)}function EM(e,t){const n=Lo(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function bM(e,t){const n=Lo(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function AM(e,t){const n=Lo(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function TM(e,t){e.uniform1iv(this.addr,t)}function wM(e,t){e.uniform2iv(this.addr,t)}function CM(e,t){e.uniform3iv(this.addr,t)}function RM(e,t){e.uniform4iv(this.addr,t)}function PM(e,t){e.uniform1uiv(this.addr,t)}function LM(e,t){e.uniform2uiv(this.addr,t)}function IM(e,t){e.uniform3uiv(this.addr,t)}function DM(e,t){e.uniform4uiv(this.addr,t)}function UM(e,t,n){const i=this.cache,r=t.length,s=ml(n,r);Je(i,s)||(e.uniform1iv(this.addr,s),Qe(i,s));for(let o=0;o!==r;++o)n.setTexture2D(t[o]||t0,s[o])}function NM(e,t,n){const i=this.cache,r=t.length,s=ml(n,r);Je(i,s)||(e.uniform1iv(this.addr,s),Qe(i,s));for(let o=0;o!==r;++o)n.setTexture3D(t[o]||n0,s[o])}function FM(e,t,n){const i=this.cache,r=t.length,s=ml(n,r);Je(i,s)||(e.uniform1iv(this.addr,s),Qe(i,s));for(let o=0;o!==r;++o)n.setTextureCube(t[o]||i0,s[o])}function OM(e,t,n){const i=this.cache,r=t.length,s=ml(n,r);Je(i,s)||(e.uniform1iv(this.addr,s),Qe(i,s));for(let o=0;o!==r;++o)n.setTexture2DArray(t[o]||e0,s[o])}function kM(e){switch(e){case 5126:return xM;case 35664:return yM;case 35665:return SM;case 35666:return MM;case 35674:return EM;case 35675:return bM;case 35676:return AM;case 5124:case 35670:return TM;case 35667:case 35671:return wM;case 35668:case 35672:return CM;case 35669:case 35673:return RM;case 5125:return PM;case 36294:return LM;case 36295:return IM;case 36296:return DM;case 35678:case 36198:case 36298:case 36306:case 35682:return UM;case 35679:case 36299:case 36307:return NM;case 35680:case 36300:case 36308:case 36293:return FM;case 36289:case 36303:case 36311:case 36292:return OM}}class BM{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.setValue=vM(n.type)}}class zM{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=kM(n.type)}}class GM{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(t,n[a.id],i)}}}const Su=/(\w+)(\])?(\[|\.)?/g;function xp(e,t){e.seq.push(t),e.map[t.id]=t}function VM(e,t,n){const i=e.name,r=i.length;for(Su.lastIndex=0;;){const s=Su.exec(i),o=Su.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){xp(n,l===void 0?new BM(a,e,t):new zM(a,e,t));break}else{let h=n.map[a];h===void 0&&(h=new GM(a),xp(n,h)),n=h}}}class zc{constructor(t,n){this.seq=[],this.map={};const i=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=t.getActiveUniform(n,r),o=t.getUniformLocation(n,s.name);VM(s,o,this)}}setValue(t,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(t,i,r)}setOptional(t,n,i){const r=n[i];r!==void 0&&this.setValue(t,i,r)}static upload(t,n,i,r){for(let s=0,o=n.length;s!==o;++s){const a=n[s],c=i[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,r)}}static seqWithValue(t,n){const i=[];for(let r=0,s=t.length;r!==s;++r){const o=t[r];o.id in n&&i.push(o)}return i}}function yp(e,t,n){const i=e.createShader(t);return e.shaderSource(i,n),e.compileShader(i),i}const HM=37297;let WM=0;function XM(e,t){const n=e.split(`
`),i=[],r=Math.max(t-6,0),s=Math.min(t+6,n.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${n[o]}`)}return i.join(`
`)}function $M(e){const t=se.getPrimaries(se.workingColorSpace),n=se.getPrimaries(e);let i;switch(t===n?i="":t===Yc&&n===qc?i="LinearDisplayP3ToLinearSRGB":t===qc&&n===Yc&&(i="LinearSRGBToLinearDisplayP3"),e){case zr:case dl:return[i,"LinearTransferOETF"];case Ri:case vf:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",e),[i,"LinearTransferOETF"]}}function Sp(e,t,n){const i=e.getShaderParameter(t,e.COMPILE_STATUS),r=e.getShaderInfoLog(t).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+XM(e.getShaderSource(t),o)}else return r}function qM(e,t){const n=$M(t);return`vec4 ${e}( vec4 value ) { return ${n[0]}( ${n[1]}( value ) ); }`}function YM(e,t){let n;switch(t){case lx:n="Linear";break;case ux:n="Reinhard";break;case hx:n="Cineon";break;case fx:n="ACESFilmic";break;case px:n="AgX";break;case mx:n="Neutral";break;case dx:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),n="Linear"}return"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const uc=new I;function KM(){se.getLuminanceCoefficients(uc);const e=uc.x.toFixed(4),t=uc.y.toFixed(4),n=uc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function jM(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ra).join(`
`)}function ZM(e){const t=[];for(const n in e){const i=e[n];i!==!1&&t.push("#define "+n+" "+i)}return t.join(`
`)}function JM(e,t){const n={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=e.getActiveAttrib(t,r),o=s.name;let a=1;s.type===e.FLOAT_MAT2&&(a=2),s.type===e.FLOAT_MAT3&&(a=3),s.type===e.FLOAT_MAT4&&(a=4),n[o]={type:s.type,location:e.getAttribLocation(t,o),locationSize:a}}return n}function ra(e){return e!==""}function Mp(e,t){const n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ep(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const QM=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ph(e){return e.replace(QM,eE)}const tE=new Map;function eE(e,t){let n=kt[t];if(n===void 0){const i=tE.get(t);if(i!==void 0)n=kt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Ph(n)}const nE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function bp(e){return e.replace(nE,iE)}function iE(e,t,n,i){let r="";for(let s=parseInt(t);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Ap(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision==="highp"?t+=`
#define HIGH_PRECISION`:e.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function rE(e){let t="SHADOWMAP_TYPE_BASIC";return e.shadowMapType===Ag?t="SHADOWMAP_TYPE_PCF":e.shadowMapType===V2?t="SHADOWMAP_TYPE_PCF_SOFT":e.shadowMapType===Qi&&(t="SHADOWMAP_TYPE_VSM"),t}function sE(e){let t="ENVMAP_TYPE_CUBE";if(e.envMap)switch(e.envMapMode){case fo:case po:t="ENVMAP_TYPE_CUBE";break;case fl:t="ENVMAP_TYPE_CUBE_UV";break}return t}function oE(e){let t="ENVMAP_MODE_REFLECTION";if(e.envMap)switch(e.envMapMode){case po:t="ENVMAP_MODE_REFRACTION";break}return t}function aE(e){let t="ENVMAP_BLENDING_NONE";if(e.envMap)switch(e.combine){case Tg:t="ENVMAP_BLENDING_MULTIPLY";break;case ax:t="ENVMAP_BLENDING_MIX";break;case cx:t="ENVMAP_BLENDING_ADD";break}return t}function cE(e){const t=e.envMapCubeUVHeight;if(t===null)return null;const n=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function lE(e,t,n,i){const r=e.getContext(),s=n.defines;let o=n.vertexShader,a=n.fragmentShader;const c=rE(n),l=sE(n),u=oE(n),h=aE(n),f=cE(n),d=jM(n),g=ZM(s),x=r.createProgram();let p,m,A=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(p=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(ra).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(ra).join(`
`),m.length>0&&(m+=`
`)):(p=[Ap(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ra).join(`
`),m=[Ap(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+l:"",n.envMap?"#define "+u:"",n.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Pr?"#define TONE_MAPPING":"",n.toneMapping!==Pr?kt.tonemapping_pars_fragment:"",n.toneMapping!==Pr?YM("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",kt.colorspace_pars_fragment,qM("linearToOutputTexel",n.outputColorSpace),KM(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(ra).join(`
`)),o=Ph(o),o=Mp(o,n),o=Ep(o,n),a=Ph(a),a=Mp(a,n),a=Ep(a,n),o=bp(o),a=bp(a),n.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,p=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",n.glslVersion===Vd?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Vd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const M=A+p+o,E=A+m+a,z=yp(r,r.VERTEX_SHADER,M),C=yp(r,r.FRAGMENT_SHADER,E);r.attachShader(x,z),r.attachShader(x,C),n.index0AttributeName!==void 0?r.bindAttribLocation(x,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function T(_){if(e.debug.checkShaderErrors){const N=r.getProgramInfoLog(x).trim(),G=r.getShaderInfoLog(z).trim(),W=r.getShaderInfoLog(C).trim();let q=!0,O=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(q=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(r,x,z,C);else{const j=Sp(r,z,"vertex"),H=Sp(r,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+_.name+`
Material Type: `+_.type+`

Program Info Log: `+N+`
`+j+`
`+H)}else N!==""?console.warn("THREE.WebGLProgram: Program Info Log:",N):(G===""||W==="")&&(O=!1);O&&(_.diagnostics={runnable:q,programLog:N,vertexShader:{log:G,prefix:p},fragmentShader:{log:W,prefix:m}})}r.deleteShader(z),r.deleteShader(C),B=new zc(r,x),et=JM(r,x)}let B;this.getUniforms=function(){return B===void 0&&T(this),B};let et;this.getAttributes=function(){return et===void 0&&T(this),et};let v=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=r.getProgramParameter(x,HM)),v},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=WM++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=z,this.fragmentShader=C,this}let uE=0;class hE{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const n=t.vertexShader,i=t.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const n=this.materialCache.get(t);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const n=this.materialCache;let i=n.get(t);return i===void 0&&(i=new Set,n.set(t,i)),i}_getShaderStage(t){const n=this.shaderCache;let i=n.get(t);return i===void 0&&(i=new fE(t),n.set(t,i)),i}}class fE{constructor(t){this.id=uE++,this.code=t,this.usedTimes=0}}function dE(e,t,n,i,r,s,o){const a=new Hg,c=new hE,l=new Set,u=[],h=r.logarithmicDepthBuffer,f=r.reverseDepthBuffer,d=r.vertexTextures;let g=r.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(v){return l.add(v),v===0?"uv":`uv${v}`}function m(v,_,N,G,W){const q=G.fog,O=W.geometry,j=v.isMeshStandardMaterial?G.environment:null,H=(v.isMeshStandardMaterial?n:t).get(v.envMap||j),ct=H&&H.mapping===fl?H.image.height:null,lt=x[v.type];v.precision!==null&&(g=r.getMaxPrecision(v.precision),g!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",g,"instead."));const xt=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Qt=xt!==void 0?xt.length:0;let ce=0;O.morphAttributes.position!==void 0&&(ce=1),O.morphAttributes.normal!==void 0&&(ce=2),O.morphAttributes.color!==void 0&&(ce=3);let X,J,_t,ut;if(lt){const En=Pi[lt];X=En.vertexShader,J=En.fragmentShader}else X=v.vertexShader,J=v.fragmentShader,c.update(v),_t=c.getVertexShaderID(v),ut=c.getFragmentShaderID(v);const Nt=e.getRenderTarget(),Rt=W.isInstancedMesh===!0,Xt=W.isBatchedMesh===!0,he=!!v.map,$t=!!v.matcap,w=!!H,Dn=!!v.aoMap,Vt=!!v.lightMap,Kt=!!v.bumpMap,Lt=!!v.normalMap,_e=!!v.displacementMap,Ut=!!v.emissiveMap,b=!!v.metalnessMap,y=!!v.roughnessMap,U=v.anisotropy>0,Y=v.clearcoat>0,Z=v.dispersion>0,$=v.iridescence>0,Et=v.sheen>0,it=v.transmission>0,ht=U&&!!v.anisotropyMap,jt=Y&&!!v.clearcoatMap,Q=Y&&!!v.clearcoatNormalMap,dt=Y&&!!v.clearcoatRoughnessMap,It=$&&!!v.iridescenceMap,Dt=$&&!!v.iridescenceThicknessMap,pt=Et&&!!v.sheenColorMap,Ht=Et&&!!v.sheenRoughnessMap,Ft=!!v.specularMap,me=!!v.specularColorMap,R=!!v.specularIntensityMap,ot=it&&!!v.transmissionMap,V=it&&!!v.thicknessMap,K=!!v.gradientMap,rt=!!v.alphaMap,at=v.alphaTest>0,qt=!!v.alphaHash,Ge=!!v.extensions;let Mn=Pr;v.toneMapped&&(Nt===null||Nt.isXRRenderTarget===!0)&&(Mn=e.toneMapping);const te={shaderID:lt,shaderType:v.type,shaderName:v.name,vertexShader:X,fragmentShader:J,defines:v.defines,customVertexShaderID:_t,customFragmentShaderID:ut,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:g,batching:Xt,batchingColor:Xt&&W._colorsTexture!==null,instancing:Rt,instancingColor:Rt&&W.instanceColor!==null,instancingMorph:Rt&&W.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:Nt===null?e.outputColorSpace:Nt.isXRRenderTarget===!0?Nt.texture.colorSpace:zr,alphaToCoverage:!!v.alphaToCoverage,map:he,matcap:$t,envMap:w,envMapMode:w&&H.mapping,envMapCubeUVHeight:ct,aoMap:Dn,lightMap:Vt,bumpMap:Kt,normalMap:Lt,displacementMap:d&&_e,emissiveMap:Ut,normalMapObjectSpace:Lt&&v.normalMapType===yx,normalMapTangentSpace:Lt&&v.normalMapType===xx,metalnessMap:b,roughnessMap:y,anisotropy:U,anisotropyMap:ht,clearcoat:Y,clearcoatMap:jt,clearcoatNormalMap:Q,clearcoatRoughnessMap:dt,dispersion:Z,iridescence:$,iridescenceMap:It,iridescenceThicknessMap:Dt,sheen:Et,sheenColorMap:pt,sheenRoughnessMap:Ht,specularMap:Ft,specularColorMap:me,specularIntensityMap:R,transmission:it,transmissionMap:ot,thicknessMap:V,gradientMap:K,opaque:v.transparent===!1&&v.blending===ro&&v.alphaToCoverage===!1,alphaMap:rt,alphaTest:at,alphaHash:qt,combine:v.combine,mapUv:he&&p(v.map.channel),aoMapUv:Dn&&p(v.aoMap.channel),lightMapUv:Vt&&p(v.lightMap.channel),bumpMapUv:Kt&&p(v.bumpMap.channel),normalMapUv:Lt&&p(v.normalMap.channel),displacementMapUv:_e&&p(v.displacementMap.channel),emissiveMapUv:Ut&&p(v.emissiveMap.channel),metalnessMapUv:b&&p(v.metalnessMap.channel),roughnessMapUv:y&&p(v.roughnessMap.channel),anisotropyMapUv:ht&&p(v.anisotropyMap.channel),clearcoatMapUv:jt&&p(v.clearcoatMap.channel),clearcoatNormalMapUv:Q&&p(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:dt&&p(v.clearcoatRoughnessMap.channel),iridescenceMapUv:It&&p(v.iridescenceMap.channel),iridescenceThicknessMapUv:Dt&&p(v.iridescenceThicknessMap.channel),sheenColorMapUv:pt&&p(v.sheenColorMap.channel),sheenRoughnessMapUv:Ht&&p(v.sheenRoughnessMap.channel),specularMapUv:Ft&&p(v.specularMap.channel),specularColorMapUv:me&&p(v.specularColorMap.channel),specularIntensityMapUv:R&&p(v.specularIntensityMap.channel),transmissionMapUv:ot&&p(v.transmissionMap.channel),thicknessMapUv:V&&p(v.thicknessMap.channel),alphaMapUv:rt&&p(v.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(Lt||U),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:W.isPoints===!0&&!!O.attributes.uv&&(he||rt),fog:!!q,useFog:v.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:v.flatShading===!0,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:f,skinning:W.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:Qt,morphTextureStride:ce,numDirLights:_.directional.length,numPointLights:_.point.length,numSpotLights:_.spot.length,numSpotLightMaps:_.spotLightMap.length,numRectAreaLights:_.rectArea.length,numHemiLights:_.hemi.length,numDirLightShadows:_.directionalShadowMap.length,numPointLightShadows:_.pointShadowMap.length,numSpotLightShadows:_.spotShadowMap.length,numSpotLightShadowsWithMaps:_.numSpotLightShadowsWithMaps,numLightProbes:_.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:v.dithering,shadowMapEnabled:e.shadowMap.enabled&&N.length>0,shadowMapType:e.shadowMap.type,toneMapping:Mn,decodeVideoTexture:he&&v.map.isVideoTexture===!0&&se.getTransfer(v.map.colorSpace)===xe,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Li,flipSided:v.side===Rn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:Ge&&v.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ge&&v.extensions.multiDraw===!0||Xt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return te.vertexUv1s=l.has(1),te.vertexUv2s=l.has(2),te.vertexUv3s=l.has(3),l.clear(),te}function A(v){const _=[];if(v.shaderID?_.push(v.shaderID):(_.push(v.customVertexShaderID),_.push(v.customFragmentShaderID)),v.defines!==void 0)for(const N in v.defines)_.push(N),_.push(v.defines[N]);return v.isRawShaderMaterial===!1&&(M(_,v),E(_,v),_.push(e.outputColorSpace)),_.push(v.customProgramCacheKey),_.join()}function M(v,_){v.push(_.precision),v.push(_.outputColorSpace),v.push(_.envMapMode),v.push(_.envMapCubeUVHeight),v.push(_.mapUv),v.push(_.alphaMapUv),v.push(_.lightMapUv),v.push(_.aoMapUv),v.push(_.bumpMapUv),v.push(_.normalMapUv),v.push(_.displacementMapUv),v.push(_.emissiveMapUv),v.push(_.metalnessMapUv),v.push(_.roughnessMapUv),v.push(_.anisotropyMapUv),v.push(_.clearcoatMapUv),v.push(_.clearcoatNormalMapUv),v.push(_.clearcoatRoughnessMapUv),v.push(_.iridescenceMapUv),v.push(_.iridescenceThicknessMapUv),v.push(_.sheenColorMapUv),v.push(_.sheenRoughnessMapUv),v.push(_.specularMapUv),v.push(_.specularColorMapUv),v.push(_.specularIntensityMapUv),v.push(_.transmissionMapUv),v.push(_.thicknessMapUv),v.push(_.combine),v.push(_.fogExp2),v.push(_.sizeAttenuation),v.push(_.morphTargetsCount),v.push(_.morphAttributeCount),v.push(_.numDirLights),v.push(_.numPointLights),v.push(_.numSpotLights),v.push(_.numSpotLightMaps),v.push(_.numHemiLights),v.push(_.numRectAreaLights),v.push(_.numDirLightShadows),v.push(_.numPointLightShadows),v.push(_.numSpotLightShadows),v.push(_.numSpotLightShadowsWithMaps),v.push(_.numLightProbes),v.push(_.shadowMapType),v.push(_.toneMapping),v.push(_.numClippingPlanes),v.push(_.numClipIntersection),v.push(_.depthPacking)}function E(v,_){a.disableAll(),_.supportsVertexTextures&&a.enable(0),_.instancing&&a.enable(1),_.instancingColor&&a.enable(2),_.instancingMorph&&a.enable(3),_.matcap&&a.enable(4),_.envMap&&a.enable(5),_.normalMapObjectSpace&&a.enable(6),_.normalMapTangentSpace&&a.enable(7),_.clearcoat&&a.enable(8),_.iridescence&&a.enable(9),_.alphaTest&&a.enable(10),_.vertexColors&&a.enable(11),_.vertexAlphas&&a.enable(12),_.vertexUv1s&&a.enable(13),_.vertexUv2s&&a.enable(14),_.vertexUv3s&&a.enable(15),_.vertexTangents&&a.enable(16),_.anisotropy&&a.enable(17),_.alphaHash&&a.enable(18),_.batching&&a.enable(19),_.dispersion&&a.enable(20),_.batchingColor&&a.enable(21),v.push(a.mask),a.disableAll(),_.fog&&a.enable(0),_.useFog&&a.enable(1),_.flatShading&&a.enable(2),_.logarithmicDepthBuffer&&a.enable(3),_.reverseDepthBuffer&&a.enable(4),_.skinning&&a.enable(5),_.morphTargets&&a.enable(6),_.morphNormals&&a.enable(7),_.morphColors&&a.enable(8),_.premultipliedAlpha&&a.enable(9),_.shadowMapEnabled&&a.enable(10),_.doubleSided&&a.enable(11),_.flipSided&&a.enable(12),_.useDepthPacking&&a.enable(13),_.dithering&&a.enable(14),_.transmission&&a.enable(15),_.sheen&&a.enable(16),_.opaque&&a.enable(17),_.pointsUvs&&a.enable(18),_.decodeVideoTexture&&a.enable(19),_.alphaToCoverage&&a.enable(20),v.push(a.mask)}function z(v){const _=x[v.type];let N;if(_){const G=Pi[_];N=jx.clone(G.uniforms)}else N=v.uniforms;return N}function C(v,_){let N;for(let G=0,W=u.length;G<W;G++){const q=u[G];if(q.cacheKey===_){N=q,++N.usedTimes;break}}return N===void 0&&(N=new lE(e,_,v,s),u.push(N)),N}function T(v){if(--v.usedTimes===0){const _=u.indexOf(v);u[_]=u[u.length-1],u.pop(),v.destroy()}}function B(v){c.remove(v)}function et(){c.dispose()}return{getParameters:m,getProgramCacheKey:A,getUniforms:z,acquireProgram:C,releaseProgram:T,releaseShaderCache:B,programs:u,dispose:et}}function pE(){let e=new WeakMap;function t(o){return e.has(o)}function n(o){let a=e.get(o);return a===void 0&&(a={},e.set(o,a)),a}function i(o){e.delete(o)}function r(o,a,c){e.get(o)[a]=c}function s(){e=new WeakMap}return{has:t,get:n,remove:i,update:r,dispose:s}}function mE(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.z!==t.z?e.z-t.z:e.id-t.id}function Tp(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function wp(){const e=[];let t=0;const n=[],i=[],r=[];function s(){t=0,n.length=0,i.length=0,r.length=0}function o(h,f,d,g,x,p){let m=e[t];return m===void 0?(m={id:h.id,object:h,geometry:f,material:d,groupOrder:g,renderOrder:h.renderOrder,z:x,group:p},e[t]=m):(m.id=h.id,m.object=h,m.geometry=f,m.material=d,m.groupOrder=g,m.renderOrder=h.renderOrder,m.z=x,m.group=p),t++,m}function a(h,f,d,g,x,p){const m=o(h,f,d,g,x,p);d.transmission>0?i.push(m):d.transparent===!0?r.push(m):n.push(m)}function c(h,f,d,g,x,p){const m=o(h,f,d,g,x,p);d.transmission>0?i.unshift(m):d.transparent===!0?r.unshift(m):n.unshift(m)}function l(h,f){n.length>1&&n.sort(h||mE),i.length>1&&i.sort(f||Tp),r.length>1&&r.sort(f||Tp)}function u(){for(let h=t,f=e.length;h<f;h++){const d=e[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:a,unshift:c,finish:u,sort:l}}function gE(){let e=new WeakMap;function t(i,r){const s=e.get(i);let o;return s===void 0?(o=new wp,e.set(i,[o])):r>=s.length?(o=new wp,s.push(o)):o=s[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}function _E(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new I,color:new oe};break;case"SpotLight":n={position:new I,direction:new I,color:new oe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new I,color:new oe,distance:0,decay:0};break;case"HemisphereLight":n={direction:new I,skyColor:new oe,groundColor:new oe};break;case"RectAreaLight":n={color:new oe,position:new I,halfWidth:new I,halfHeight:new I};break}return e[t.id]=n,n}}}function vE(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new mt,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}let xE=0;function yE(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function SE(e){const t=new _E,n=vE(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new I);const r=new I,s=new Re,o=new Re;function a(l){let u=0,h=0,f=0;for(let et=0;et<9;et++)i.probe[et].set(0,0,0);let d=0,g=0,x=0,p=0,m=0,A=0,M=0,E=0,z=0,C=0,T=0;l.sort(yE);for(let et=0,v=l.length;et<v;et++){const _=l[et],N=_.color,G=_.intensity,W=_.distance,q=_.shadow&&_.shadow.map?_.shadow.map.texture:null;if(_.isAmbientLight)u+=N.r*G,h+=N.g*G,f+=N.b*G;else if(_.isLightProbe){for(let O=0;O<9;O++)i.probe[O].addScaledVector(_.sh.coefficients[O],G);T++}else if(_.isDirectionalLight){const O=t.get(_);if(O.color.copy(_.color).multiplyScalar(_.intensity),_.castShadow){const j=_.shadow,H=n.get(_);H.shadowIntensity=j.intensity,H.shadowBias=j.bias,H.shadowNormalBias=j.normalBias,H.shadowRadius=j.radius,H.shadowMapSize=j.mapSize,i.directionalShadow[d]=H,i.directionalShadowMap[d]=q,i.directionalShadowMatrix[d]=_.shadow.matrix,A++}i.directional[d]=O,d++}else if(_.isSpotLight){const O=t.get(_);O.position.setFromMatrixPosition(_.matrixWorld),O.color.copy(N).multiplyScalar(G),O.distance=W,O.coneCos=Math.cos(_.angle),O.penumbraCos=Math.cos(_.angle*(1-_.penumbra)),O.decay=_.decay,i.spot[x]=O;const j=_.shadow;if(_.map&&(i.spotLightMap[z]=_.map,z++,j.updateMatrices(_),_.castShadow&&C++),i.spotLightMatrix[x]=j.matrix,_.castShadow){const H=n.get(_);H.shadowIntensity=j.intensity,H.shadowBias=j.bias,H.shadowNormalBias=j.normalBias,H.shadowRadius=j.radius,H.shadowMapSize=j.mapSize,i.spotShadow[x]=H,i.spotShadowMap[x]=q,E++}x++}else if(_.isRectAreaLight){const O=t.get(_);O.color.copy(N).multiplyScalar(G),O.halfWidth.set(_.width*.5,0,0),O.halfHeight.set(0,_.height*.5,0),i.rectArea[p]=O,p++}else if(_.isPointLight){const O=t.get(_);if(O.color.copy(_.color).multiplyScalar(_.intensity),O.distance=_.distance,O.decay=_.decay,_.castShadow){const j=_.shadow,H=n.get(_);H.shadowIntensity=j.intensity,H.shadowBias=j.bias,H.shadowNormalBias=j.normalBias,H.shadowRadius=j.radius,H.shadowMapSize=j.mapSize,H.shadowCameraNear=j.camera.near,H.shadowCameraFar=j.camera.far,i.pointShadow[g]=H,i.pointShadowMap[g]=q,i.pointShadowMatrix[g]=_.shadow.matrix,M++}i.point[g]=O,g++}else if(_.isHemisphereLight){const O=t.get(_);O.skyColor.copy(_.color).multiplyScalar(G),O.groundColor.copy(_.groundColor).multiplyScalar(G),i.hemi[m]=O,m++}}p>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=nt.LTC_FLOAT_1,i.rectAreaLTC2=nt.LTC_FLOAT_2):(i.rectAreaLTC1=nt.LTC_HALF_1,i.rectAreaLTC2=nt.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=f;const B=i.hash;(B.directionalLength!==d||B.pointLength!==g||B.spotLength!==x||B.rectAreaLength!==p||B.hemiLength!==m||B.numDirectionalShadows!==A||B.numPointShadows!==M||B.numSpotShadows!==E||B.numSpotMaps!==z||B.numLightProbes!==T)&&(i.directional.length=d,i.spot.length=x,i.rectArea.length=p,i.point.length=g,i.hemi.length=m,i.directionalShadow.length=A,i.directionalShadowMap.length=A,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=A,i.pointShadowMatrix.length=M,i.spotLightMatrix.length=E+z-C,i.spotLightMap.length=z,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=T,B.directionalLength=d,B.pointLength=g,B.spotLength=x,B.rectAreaLength=p,B.hemiLength=m,B.numDirectionalShadows=A,B.numPointShadows=M,B.numSpotShadows=E,B.numSpotMaps=z,B.numLightProbes=T,i.version=xE++)}function c(l,u){let h=0,f=0,d=0,g=0,x=0;const p=u.matrixWorldInverse;for(let m=0,A=l.length;m<A;m++){const M=l[m];if(M.isDirectionalLight){const E=i.directional[h];E.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(p),h++}else if(M.isSpotLight){const E=i.spot[d];E.position.setFromMatrixPosition(M.matrixWorld),E.position.applyMatrix4(p),E.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(p),d++}else if(M.isRectAreaLight){const E=i.rectArea[g];E.position.setFromMatrixPosition(M.matrixWorld),E.position.applyMatrix4(p),o.identity(),s.copy(M.matrixWorld),s.premultiply(p),o.extractRotation(s),E.halfWidth.set(M.width*.5,0,0),E.halfHeight.set(0,M.height*.5,0),E.halfWidth.applyMatrix4(o),E.halfHeight.applyMatrix4(o),g++}else if(M.isPointLight){const E=i.point[f];E.position.setFromMatrixPosition(M.matrixWorld),E.position.applyMatrix4(p),f++}else if(M.isHemisphereLight){const E=i.hemi[x];E.direction.setFromMatrixPosition(M.matrixWorld),E.direction.transformDirection(p),x++}}}return{setup:a,setupView:c,state:i}}function Cp(e){const t=new SE(e),n=[],i=[];function r(u){l.camera=u,n.length=0,i.length=0}function s(u){n.push(u)}function o(u){i.push(u)}function a(){t.setup(n)}function c(u){t.setupView(n,u)}const l={lightsArray:n,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:o}}function ME(e){let t=new WeakMap;function n(r,s=0){const o=t.get(r);let a;return o===void 0?(a=new Cp(e),t.set(r,[a])):s>=o.length?(a=new Cp(e),o.push(a)):a=o[s],a}function i(){t=new WeakMap}return{get:n,dispose:i}}class EE extends Po{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=_x,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class bE extends Po{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const AE=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,TE=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function wE(e,t,n){let i=new jg;const r=new mt,s=new mt,o=new ke,a=new EE({depthPacking:vx}),c=new bE,l={},u=n.maxTextureSize,h={[Fr]:Rn,[Rn]:Fr,[Li]:Li},f=new Or({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new mt},radius:{value:4}},vertexShader:AE,fragmentShader:TE}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new Ln;g.setAttribute("position",new yi(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new ee(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ag;let m=this.type;this.render=function(C,T,B){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||C.length===0)return;const et=e.getRenderTarget(),v=e.getActiveCubeFace(),_=e.getActiveMipmapLevel(),N=e.state;N.setBlending(Rr),N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const G=m!==Qi&&this.type===Qi,W=m===Qi&&this.type!==Qi;for(let q=0,O=C.length;q<O;q++){const j=C[q],H=j.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;r.copy(H.mapSize);const ct=H.getFrameExtents();if(r.multiply(ct),s.copy(H.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/ct.x),r.x=s.x*ct.x,H.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/ct.y),r.y=s.y*ct.y,H.mapSize.y=s.y)),H.map===null||G===!0||W===!0){const xt=this.type!==Qi?{minFilter:si,magFilter:si}:{};H.map!==null&&H.map.dispose(),H.map=new vs(r.x,r.y,xt),H.map.texture.name=j.name+".shadowMap",H.camera.updateProjectionMatrix()}e.setRenderTarget(H.map),e.clear();const lt=H.getViewportCount();for(let xt=0;xt<lt;xt++){const Qt=H.getViewport(xt);o.set(s.x*Qt.x,s.y*Qt.y,s.x*Qt.z,s.y*Qt.w),N.viewport(o),H.updateMatrices(j,xt),i=H.getFrustum(),E(T,B,H.camera,j,this.type)}H.isPointLightShadow!==!0&&this.type===Qi&&A(H,B),H.needsUpdate=!1}m=this.type,p.needsUpdate=!1,e.setRenderTarget(et,v,_)};function A(C,T){const B=t.update(x);f.defines.VSM_SAMPLES!==C.blurSamples&&(f.defines.VSM_SAMPLES=C.blurSamples,d.defines.VSM_SAMPLES=C.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new vs(r.x,r.y)),f.uniforms.shadow_pass.value=C.map.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,e.setRenderTarget(C.mapPass),e.clear(),e.renderBufferDirect(T,null,B,f,x,null),d.uniforms.shadow_pass.value=C.mapPass.texture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,e.setRenderTarget(C.map),e.clear(),e.renderBufferDirect(T,null,B,d,x,null)}function M(C,T,B,et){let v=null;const _=B.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(_!==void 0)v=_;else if(v=B.isPointLight===!0?c:a,e.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const N=v.uuid,G=T.uuid;let W=l[N];W===void 0&&(W={},l[N]=W);let q=W[G];q===void 0&&(q=v.clone(),W[G]=q,T.addEventListener("dispose",z)),v=q}if(v.visible=T.visible,v.wireframe=T.wireframe,et===Qi?v.side=T.shadowSide!==null?T.shadowSide:T.side:v.side=T.shadowSide!==null?T.shadowSide:h[T.side],v.alphaMap=T.alphaMap,v.alphaTest=T.alphaTest,v.map=T.map,v.clipShadows=T.clipShadows,v.clippingPlanes=T.clippingPlanes,v.clipIntersection=T.clipIntersection,v.displacementMap=T.displacementMap,v.displacementScale=T.displacementScale,v.displacementBias=T.displacementBias,v.wireframeLinewidth=T.wireframeLinewidth,v.linewidth=T.linewidth,B.isPointLight===!0&&v.isMeshDistanceMaterial===!0){const N=e.properties.get(v);N.light=B}return v}function E(C,T,B,et,v){if(C.visible===!1)return;if(C.layers.test(T.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&v===Qi)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,C.matrixWorld);const G=t.update(C),W=C.material;if(Array.isArray(W)){const q=G.groups;for(let O=0,j=q.length;O<j;O++){const H=q[O],ct=W[H.materialIndex];if(ct&&ct.visible){const lt=M(C,ct,et,v);C.onBeforeShadow(e,C,T,B,G,lt,H),e.renderBufferDirect(B,null,G,lt,C,H),C.onAfterShadow(e,C,T,B,G,lt,H)}}}else if(W.visible){const q=M(C,W,et,v);C.onBeforeShadow(e,C,T,B,G,q,null),e.renderBufferDirect(B,null,G,q,C,null),C.onAfterShadow(e,C,T,B,G,q,null)}}const N=C.children;for(let G=0,W=N.length;G<W;G++)E(N[G],T,B,et,v)}function z(C){C.target.removeEventListener("dispose",z);for(const B in l){const et=l[B],v=C.target.uuid;v in et&&(et[v].dispose(),delete et[v])}}}const CE={[Xu]:$u,[qu]:ju,[Yu]:Zu,[ho]:Ku,[$u]:Xu,[ju]:qu,[Zu]:Yu,[Ku]:ho};function RE(e){function t(){let R=!1;const ot=new ke;let V=null;const K=new ke(0,0,0,0);return{setMask:function(rt){V!==rt&&!R&&(e.colorMask(rt,rt,rt,rt),V=rt)},setLocked:function(rt){R=rt},setClear:function(rt,at,qt,Ge,Mn){Mn===!0&&(rt*=Ge,at*=Ge,qt*=Ge),ot.set(rt,at,qt,Ge),K.equals(ot)===!1&&(e.clearColor(rt,at,qt,Ge),K.copy(ot))},reset:function(){R=!1,V=null,K.set(-1,0,0,0)}}}function n(){let R=!1,ot=!1,V=null,K=null,rt=null;return{setReversed:function(at){ot=at},setTest:function(at){at?_t(e.DEPTH_TEST):ut(e.DEPTH_TEST)},setMask:function(at){V!==at&&!R&&(e.depthMask(at),V=at)},setFunc:function(at){if(ot&&(at=CE[at]),K!==at){switch(at){case Xu:e.depthFunc(e.NEVER);break;case $u:e.depthFunc(e.ALWAYS);break;case qu:e.depthFunc(e.LESS);break;case ho:e.depthFunc(e.LEQUAL);break;case Yu:e.depthFunc(e.EQUAL);break;case Ku:e.depthFunc(e.GEQUAL);break;case ju:e.depthFunc(e.GREATER);break;case Zu:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}K=at}},setLocked:function(at){R=at},setClear:function(at){rt!==at&&(e.clearDepth(at),rt=at)},reset:function(){R=!1,V=null,K=null,rt=null}}}function i(){let R=!1,ot=null,V=null,K=null,rt=null,at=null,qt=null,Ge=null,Mn=null;return{setTest:function(te){R||(te?_t(e.STENCIL_TEST):ut(e.STENCIL_TEST))},setMask:function(te){ot!==te&&!R&&(e.stencilMask(te),ot=te)},setFunc:function(te,En,Xi){(V!==te||K!==En||rt!==Xi)&&(e.stencilFunc(te,En,Xi),V=te,K=En,rt=Xi)},setOp:function(te,En,Xi){(at!==te||qt!==En||Ge!==Xi)&&(e.stencilOp(te,En,Xi),at=te,qt=En,Ge=Xi)},setLocked:function(te){R=te},setClear:function(te){Mn!==te&&(e.clearStencil(te),Mn=te)},reset:function(){R=!1,ot=null,V=null,K=null,rt=null,at=null,qt=null,Ge=null,Mn=null}}}const r=new t,s=new n,o=new i,a=new WeakMap,c=new WeakMap;let l={},u={},h=new WeakMap,f=[],d=null,g=!1,x=null,p=null,m=null,A=null,M=null,E=null,z=null,C=new oe(0,0,0),T=0,B=!1,et=null,v=null,_=null,N=null,G=null;const W=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,O=0;const j=e.getParameter(e.VERSION);j.indexOf("WebGL")!==-1?(O=parseFloat(/^WebGL (\d)/.exec(j)[1]),q=O>=1):j.indexOf("OpenGL ES")!==-1&&(O=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),q=O>=2);let H=null,ct={};const lt=e.getParameter(e.SCISSOR_BOX),xt=e.getParameter(e.VIEWPORT),Qt=new ke().fromArray(lt),ce=new ke().fromArray(xt);function X(R,ot,V,K){const rt=new Uint8Array(4),at=e.createTexture();e.bindTexture(R,at),e.texParameteri(R,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(R,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let qt=0;qt<V;qt++)R===e.TEXTURE_3D||R===e.TEXTURE_2D_ARRAY?e.texImage3D(ot,0,e.RGBA,1,1,K,0,e.RGBA,e.UNSIGNED_BYTE,rt):e.texImage2D(ot+qt,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,rt);return at}const J={};J[e.TEXTURE_2D]=X(e.TEXTURE_2D,e.TEXTURE_2D,1),J[e.TEXTURE_CUBE_MAP]=X(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),J[e.TEXTURE_2D_ARRAY]=X(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),J[e.TEXTURE_3D]=X(e.TEXTURE_3D,e.TEXTURE_3D,1,1),r.setClear(0,0,0,1),s.setClear(1),o.setClear(0),_t(e.DEPTH_TEST),s.setFunc(ho),Vt(!1),Kt(Od),_t(e.CULL_FACE),w(Rr);function _t(R){l[R]!==!0&&(e.enable(R),l[R]=!0)}function ut(R){l[R]!==!1&&(e.disable(R),l[R]=!1)}function Nt(R,ot){return u[R]!==ot?(e.bindFramebuffer(R,ot),u[R]=ot,R===e.DRAW_FRAMEBUFFER&&(u[e.FRAMEBUFFER]=ot),R===e.FRAMEBUFFER&&(u[e.DRAW_FRAMEBUFFER]=ot),!0):!1}function Rt(R,ot){let V=f,K=!1;if(R){V=h.get(ot),V===void 0&&(V=[],h.set(ot,V));const rt=R.textures;if(V.length!==rt.length||V[0]!==e.COLOR_ATTACHMENT0){for(let at=0,qt=rt.length;at<qt;at++)V[at]=e.COLOR_ATTACHMENT0+at;V.length=rt.length,K=!0}}else V[0]!==e.BACK&&(V[0]=e.BACK,K=!0);K&&e.drawBuffers(V)}function Xt(R){return d!==R?(e.useProgram(R),d=R,!0):!1}const he={[Qr]:e.FUNC_ADD,[W2]:e.FUNC_SUBTRACT,[X2]:e.FUNC_REVERSE_SUBTRACT};he[$2]=e.MIN,he[q2]=e.MAX;const $t={[Y2]:e.ZERO,[K2]:e.ONE,[j2]:e.SRC_COLOR,[Hu]:e.SRC_ALPHA,[nx]:e.SRC_ALPHA_SATURATE,[tx]:e.DST_COLOR,[J2]:e.DST_ALPHA,[Z2]:e.ONE_MINUS_SRC_COLOR,[Wu]:e.ONE_MINUS_SRC_ALPHA,[ex]:e.ONE_MINUS_DST_COLOR,[Q2]:e.ONE_MINUS_DST_ALPHA,[ix]:e.CONSTANT_COLOR,[rx]:e.ONE_MINUS_CONSTANT_COLOR,[sx]:e.CONSTANT_ALPHA,[ox]:e.ONE_MINUS_CONSTANT_ALPHA};function w(R,ot,V,K,rt,at,qt,Ge,Mn,te){if(R===Rr){g===!0&&(ut(e.BLEND),g=!1);return}if(g===!1&&(_t(e.BLEND),g=!0),R!==H2){if(R!==x||te!==B){if((p!==Qr||M!==Qr)&&(e.blendEquation(e.FUNC_ADD),p=Qr,M=Qr),te)switch(R){case ro:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case kd:e.blendFunc(e.ONE,e.ONE);break;case Bd:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case zd:e.blendFuncSeparate(e.ZERO,e.SRC_COLOR,e.ZERO,e.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}else switch(R){case ro:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case kd:e.blendFunc(e.SRC_ALPHA,e.ONE);break;case Bd:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case zd:e.blendFunc(e.ZERO,e.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}m=null,A=null,E=null,z=null,C.set(0,0,0),T=0,x=R,B=te}return}rt=rt||ot,at=at||V,qt=qt||K,(ot!==p||rt!==M)&&(e.blendEquationSeparate(he[ot],he[rt]),p=ot,M=rt),(V!==m||K!==A||at!==E||qt!==z)&&(e.blendFuncSeparate($t[V],$t[K],$t[at],$t[qt]),m=V,A=K,E=at,z=qt),(Ge.equals(C)===!1||Mn!==T)&&(e.blendColor(Ge.r,Ge.g,Ge.b,Mn),C.copy(Ge),T=Mn),x=R,B=!1}function Dn(R,ot){R.side===Li?ut(e.CULL_FACE):_t(e.CULL_FACE);let V=R.side===Rn;ot&&(V=!V),Vt(V),R.blending===ro&&R.transparent===!1?w(Rr):w(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),s.setFunc(R.depthFunc),s.setTest(R.depthTest),s.setMask(R.depthWrite),r.setMask(R.colorWrite);const K=R.stencilWrite;o.setTest(K),K&&(o.setMask(R.stencilWriteMask),o.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),o.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),_e(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?_t(e.SAMPLE_ALPHA_TO_COVERAGE):ut(e.SAMPLE_ALPHA_TO_COVERAGE)}function Vt(R){et!==R&&(R?e.frontFace(e.CW):e.frontFace(e.CCW),et=R)}function Kt(R){R!==z2?(_t(e.CULL_FACE),R!==v&&(R===Od?e.cullFace(e.BACK):R===G2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):ut(e.CULL_FACE),v=R}function Lt(R){R!==_&&(q&&e.lineWidth(R),_=R)}function _e(R,ot,V){R?(_t(e.POLYGON_OFFSET_FILL),(N!==ot||G!==V)&&(e.polygonOffset(ot,V),N=ot,G=V)):ut(e.POLYGON_OFFSET_FILL)}function Ut(R){R?_t(e.SCISSOR_TEST):ut(e.SCISSOR_TEST)}function b(R){R===void 0&&(R=e.TEXTURE0+W-1),H!==R&&(e.activeTexture(R),H=R)}function y(R,ot,V){V===void 0&&(H===null?V=e.TEXTURE0+W-1:V=H);let K=ct[V];K===void 0&&(K={type:void 0,texture:void 0},ct[V]=K),(K.type!==R||K.texture!==ot)&&(H!==V&&(e.activeTexture(V),H=V),e.bindTexture(R,ot||J[R]),K.type=R,K.texture=ot)}function U(){const R=ct[H];R!==void 0&&R.type!==void 0&&(e.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function Y(){try{e.compressedTexImage2D.apply(e,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Z(){try{e.compressedTexImage3D.apply(e,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function $(){try{e.texSubImage2D.apply(e,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Et(){try{e.texSubImage3D.apply(e,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function it(){try{e.compressedTexSubImage2D.apply(e,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function ht(){try{e.compressedTexSubImage3D.apply(e,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function jt(){try{e.texStorage2D.apply(e,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Q(){try{e.texStorage3D.apply(e,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function dt(){try{e.texImage2D.apply(e,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function It(){try{e.texImage3D.apply(e,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Dt(R){Qt.equals(R)===!1&&(e.scissor(R.x,R.y,R.z,R.w),Qt.copy(R))}function pt(R){ce.equals(R)===!1&&(e.viewport(R.x,R.y,R.z,R.w),ce.copy(R))}function Ht(R,ot){let V=c.get(ot);V===void 0&&(V=new WeakMap,c.set(ot,V));let K=V.get(R);K===void 0&&(K=e.getUniformBlockIndex(ot,R.name),V.set(R,K))}function Ft(R,ot){const K=c.get(ot).get(R);a.get(ot)!==K&&(e.uniformBlockBinding(ot,K,R.__bindingPointIndex),a.set(ot,K))}function me(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),l={},H=null,ct={},u={},h=new WeakMap,f=[],d=null,g=!1,x=null,p=null,m=null,A=null,M=null,E=null,z=null,C=new oe(0,0,0),T=0,B=!1,et=null,v=null,_=null,N=null,G=null,Qt.set(0,0,e.canvas.width,e.canvas.height),ce.set(0,0,e.canvas.width,e.canvas.height),r.reset(),s.reset(),o.reset()}return{buffers:{color:r,depth:s,stencil:o},enable:_t,disable:ut,bindFramebuffer:Nt,drawBuffers:Rt,useProgram:Xt,setBlending:w,setMaterial:Dn,setFlipSided:Vt,setCullFace:Kt,setLineWidth:Lt,setPolygonOffset:_e,setScissorTest:Ut,activeTexture:b,bindTexture:y,unbindTexture:U,compressedTexImage2D:Y,compressedTexImage3D:Z,texImage2D:dt,texImage3D:It,updateUBOMapping:Ht,uniformBlockBinding:Ft,texStorage2D:jt,texStorage3D:Q,texSubImage2D:$,texSubImage3D:Et,compressedTexSubImage2D:it,compressedTexSubImage3D:ht,scissor:Dt,viewport:pt,reset:me}}function Rp(e,t,n,i){const r=PE(i);switch(n){case Lg:return e*t;case Dg:return e*t;case Ug:return e*t*2;case Ng:return e*t/r.components*r.byteLength;case mf:return e*t/r.components*r.byteLength;case Fg:return e*t*2/r.components*r.byteLength;case gf:return e*t*2/r.components*r.byteLength;case Ig:return e*t*3/r.components*r.byteLength;case vi:return e*t*4/r.components*r.byteLength;case _f:return e*t*4/r.components*r.byteLength;case Uc:case Nc:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Fc:case Oc:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ih:case sh:return Math.max(e,16)*Math.max(t,8)/4;case nh:case rh:return Math.max(e,8)*Math.max(t,8)/2;case oh:case ah:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case ch:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case lh:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case uh:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case hh:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case fh:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case dh:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case ph:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case mh:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case gh:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case _h:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case vh:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case xh:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case yh:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Sh:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Mh:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case kc:case Eh:case bh:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Og:case Ah:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Th:case wh:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function PE(e){switch(e){case or:case Cg:return{byteLength:1,components:1};case va:case Rg:case Ra:return{byteLength:2,components:1};case df:case pf:return{byteLength:2,components:4};case _s:case ff:case er:return{byteLength:4,components:1};case Pg:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${e}.`)}function LE(e,t,n,i,r,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new mt,u=new WeakMap;let h;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(b,y){return d?new OffscreenCanvas(b,y):jc("canvas")}function x(b,y,U){let Y=1;const Z=Ut(b);if((Z.width>U||Z.height>U)&&(Y=U/Math.max(Z.width,Z.height)),Y<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const $=Math.floor(Y*Z.width),Et=Math.floor(Y*Z.height);h===void 0&&(h=g($,Et));const it=y?g($,Et):h;return it.width=$,it.height=Et,it.getContext("2d").drawImage(b,0,0,$,Et),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+$+"x"+Et+")."),it}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),b;return b}function p(b){return b.generateMipmaps&&b.minFilter!==si&&b.minFilter!==_i}function m(b){e.generateMipmap(b)}function A(b,y,U,Y,Z=!1){if(b!==null){if(e[b]!==void 0)return e[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let $=y;if(y===e.RED&&(U===e.FLOAT&&($=e.R32F),U===e.HALF_FLOAT&&($=e.R16F),U===e.UNSIGNED_BYTE&&($=e.R8)),y===e.RED_INTEGER&&(U===e.UNSIGNED_BYTE&&($=e.R8UI),U===e.UNSIGNED_SHORT&&($=e.R16UI),U===e.UNSIGNED_INT&&($=e.R32UI),U===e.BYTE&&($=e.R8I),U===e.SHORT&&($=e.R16I),U===e.INT&&($=e.R32I)),y===e.RG&&(U===e.FLOAT&&($=e.RG32F),U===e.HALF_FLOAT&&($=e.RG16F),U===e.UNSIGNED_BYTE&&($=e.RG8)),y===e.RG_INTEGER&&(U===e.UNSIGNED_BYTE&&($=e.RG8UI),U===e.UNSIGNED_SHORT&&($=e.RG16UI),U===e.UNSIGNED_INT&&($=e.RG32UI),U===e.BYTE&&($=e.RG8I),U===e.SHORT&&($=e.RG16I),U===e.INT&&($=e.RG32I)),y===e.RGB_INTEGER&&(U===e.UNSIGNED_BYTE&&($=e.RGB8UI),U===e.UNSIGNED_SHORT&&($=e.RGB16UI),U===e.UNSIGNED_INT&&($=e.RGB32UI),U===e.BYTE&&($=e.RGB8I),U===e.SHORT&&($=e.RGB16I),U===e.INT&&($=e.RGB32I)),y===e.RGBA_INTEGER&&(U===e.UNSIGNED_BYTE&&($=e.RGBA8UI),U===e.UNSIGNED_SHORT&&($=e.RGBA16UI),U===e.UNSIGNED_INT&&($=e.RGBA32UI),U===e.BYTE&&($=e.RGBA8I),U===e.SHORT&&($=e.RGBA16I),U===e.INT&&($=e.RGBA32I)),y===e.RGB&&U===e.UNSIGNED_INT_5_9_9_9_REV&&($=e.RGB9_E5),y===e.RGBA){const Et=Z?$c:se.getTransfer(Y);U===e.FLOAT&&($=e.RGBA32F),U===e.HALF_FLOAT&&($=e.RGBA16F),U===e.UNSIGNED_BYTE&&($=Et===xe?e.SRGB8_ALPHA8:e.RGBA8),U===e.UNSIGNED_SHORT_4_4_4_4&&($=e.RGBA4),U===e.UNSIGNED_SHORT_5_5_5_1&&($=e.RGB5_A1)}return($===e.R16F||$===e.R32F||$===e.RG16F||$===e.RG32F||$===e.RGBA16F||$===e.RGBA32F)&&t.get("EXT_color_buffer_float"),$}function M(b,y){let U;return b?y===null||y===_s||y===mo?U=e.DEPTH24_STENCIL8:y===er?U=e.DEPTH32F_STENCIL8:y===va&&(U=e.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===_s||y===mo?U=e.DEPTH_COMPONENT24:y===er?U=e.DEPTH_COMPONENT32F:y===va&&(U=e.DEPTH_COMPONENT16),U}function E(b,y){return p(b)===!0||b.isFramebufferTexture&&b.minFilter!==si&&b.minFilter!==_i?Math.log2(Math.max(y.width,y.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?y.mipmaps.length:1}function z(b){const y=b.target;y.removeEventListener("dispose",z),T(y),y.isVideoTexture&&u.delete(y)}function C(b){const y=b.target;y.removeEventListener("dispose",C),et(y)}function T(b){const y=i.get(b);if(y.__webglInit===void 0)return;const U=b.source,Y=f.get(U);if(Y){const Z=Y[y.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&B(b),Object.keys(Y).length===0&&f.delete(U)}i.remove(b)}function B(b){const y=i.get(b);e.deleteTexture(y.__webglTexture);const U=b.source,Y=f.get(U);delete Y[y.__cacheKey],o.memory.textures--}function et(b){const y=i.get(b);if(b.depthTexture&&b.depthTexture.dispose(),b.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(y.__webglFramebuffer[Y]))for(let Z=0;Z<y.__webglFramebuffer[Y].length;Z++)e.deleteFramebuffer(y.__webglFramebuffer[Y][Z]);else e.deleteFramebuffer(y.__webglFramebuffer[Y]);y.__webglDepthbuffer&&e.deleteRenderbuffer(y.__webglDepthbuffer[Y])}else{if(Array.isArray(y.__webglFramebuffer))for(let Y=0;Y<y.__webglFramebuffer.length;Y++)e.deleteFramebuffer(y.__webglFramebuffer[Y]);else e.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&e.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&e.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let Y=0;Y<y.__webglColorRenderbuffer.length;Y++)y.__webglColorRenderbuffer[Y]&&e.deleteRenderbuffer(y.__webglColorRenderbuffer[Y]);y.__webglDepthRenderbuffer&&e.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const U=b.textures;for(let Y=0,Z=U.length;Y<Z;Y++){const $=i.get(U[Y]);$.__webglTexture&&(e.deleteTexture($.__webglTexture),o.memory.textures--),i.remove(U[Y])}i.remove(b)}let v=0;function _(){v=0}function N(){const b=v;return b>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+r.maxTextures),v+=1,b}function G(b){const y=[];return y.push(b.wrapS),y.push(b.wrapT),y.push(b.wrapR||0),y.push(b.magFilter),y.push(b.minFilter),y.push(b.anisotropy),y.push(b.internalFormat),y.push(b.format),y.push(b.type),y.push(b.generateMipmaps),y.push(b.premultiplyAlpha),y.push(b.flipY),y.push(b.unpackAlignment),y.push(b.colorSpace),y.join()}function W(b,y){const U=i.get(b);if(b.isVideoTexture&&Lt(b),b.isRenderTargetTexture===!1&&b.version>0&&U.__version!==b.version){const Y=b.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ce(U,b,y);return}}n.bindTexture(e.TEXTURE_2D,U.__webglTexture,e.TEXTURE0+y)}function q(b,y){const U=i.get(b);if(b.version>0&&U.__version!==b.version){ce(U,b,y);return}n.bindTexture(e.TEXTURE_2D_ARRAY,U.__webglTexture,e.TEXTURE0+y)}function O(b,y){const U=i.get(b);if(b.version>0&&U.__version!==b.version){ce(U,b,y);return}n.bindTexture(e.TEXTURE_3D,U.__webglTexture,e.TEXTURE0+y)}function j(b,y){const U=i.get(b);if(b.version>0&&U.__version!==b.version){X(U,b,y);return}n.bindTexture(e.TEXTURE_CUBE_MAP,U.__webglTexture,e.TEXTURE0+y)}const H={[th]:e.REPEAT,[ns]:e.CLAMP_TO_EDGE,[eh]:e.MIRRORED_REPEAT},ct={[si]:e.NEAREST,[gx]:e.NEAREST_MIPMAP_NEAREST,[Wa]:e.NEAREST_MIPMAP_LINEAR,[_i]:e.LINEAR,[$l]:e.LINEAR_MIPMAP_NEAREST,[is]:e.LINEAR_MIPMAP_LINEAR},lt={[Sx]:e.NEVER,[wx]:e.ALWAYS,[Mx]:e.LESS,[kg]:e.LEQUAL,[Ex]:e.EQUAL,[Tx]:e.GEQUAL,[bx]:e.GREATER,[Ax]:e.NOTEQUAL};function xt(b,y){if(y.type===er&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===_i||y.magFilter===$l||y.magFilter===Wa||y.magFilter===is||y.minFilter===_i||y.minFilter===$l||y.minFilter===Wa||y.minFilter===is)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(b,e.TEXTURE_WRAP_S,H[y.wrapS]),e.texParameteri(b,e.TEXTURE_WRAP_T,H[y.wrapT]),(b===e.TEXTURE_3D||b===e.TEXTURE_2D_ARRAY)&&e.texParameteri(b,e.TEXTURE_WRAP_R,H[y.wrapR]),e.texParameteri(b,e.TEXTURE_MAG_FILTER,ct[y.magFilter]),e.texParameteri(b,e.TEXTURE_MIN_FILTER,ct[y.minFilter]),y.compareFunction&&(e.texParameteri(b,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(b,e.TEXTURE_COMPARE_FUNC,lt[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===si||y.minFilter!==Wa&&y.minFilter!==is||y.type===er&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||i.get(y).__currentAnisotropy){const U=t.get("EXT_texture_filter_anisotropic");e.texParameterf(b,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,r.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy}}}function Qt(b,y){let U=!1;b.__webglInit===void 0&&(b.__webglInit=!0,y.addEventListener("dispose",z));const Y=y.source;let Z=f.get(Y);Z===void 0&&(Z={},f.set(Y,Z));const $=G(y);if($!==b.__cacheKey){Z[$]===void 0&&(Z[$]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,U=!0),Z[$].usedTimes++;const Et=Z[b.__cacheKey];Et!==void 0&&(Z[b.__cacheKey].usedTimes--,Et.usedTimes===0&&B(y)),b.__cacheKey=$,b.__webglTexture=Z[$].texture}return U}function ce(b,y,U){let Y=e.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(Y=e.TEXTURE_2D_ARRAY),y.isData3DTexture&&(Y=e.TEXTURE_3D);const Z=Qt(b,y),$=y.source;n.bindTexture(Y,b.__webglTexture,e.TEXTURE0+U);const Et=i.get($);if($.version!==Et.__version||Z===!0){n.activeTexture(e.TEXTURE0+U);const it=se.getPrimaries(se.workingColorSpace),ht=y.colorSpace===Ar?null:se.getPrimaries(y.colorSpace),jt=y.colorSpace===Ar||it===ht?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,y.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,y.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,jt);let Q=x(y.image,!1,r.maxTextureSize);Q=_e(y,Q);const dt=s.convert(y.format,y.colorSpace),It=s.convert(y.type);let Dt=A(y.internalFormat,dt,It,y.colorSpace,y.isVideoTexture);xt(Y,y);let pt;const Ht=y.mipmaps,Ft=y.isVideoTexture!==!0,me=Et.__version===void 0||Z===!0,R=$.dataReady,ot=E(y,Q);if(y.isDepthTexture)Dt=M(y.format===go,y.type),me&&(Ft?n.texStorage2D(e.TEXTURE_2D,1,Dt,Q.width,Q.height):n.texImage2D(e.TEXTURE_2D,0,Dt,Q.width,Q.height,0,dt,It,null));else if(y.isDataTexture)if(Ht.length>0){Ft&&me&&n.texStorage2D(e.TEXTURE_2D,ot,Dt,Ht[0].width,Ht[0].height);for(let V=0,K=Ht.length;V<K;V++)pt=Ht[V],Ft?R&&n.texSubImage2D(e.TEXTURE_2D,V,0,0,pt.width,pt.height,dt,It,pt.data):n.texImage2D(e.TEXTURE_2D,V,Dt,pt.width,pt.height,0,dt,It,pt.data);y.generateMipmaps=!1}else Ft?(me&&n.texStorage2D(e.TEXTURE_2D,ot,Dt,Q.width,Q.height),R&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,Q.width,Q.height,dt,It,Q.data)):n.texImage2D(e.TEXTURE_2D,0,Dt,Q.width,Q.height,0,dt,It,Q.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Ft&&me&&n.texStorage3D(e.TEXTURE_2D_ARRAY,ot,Dt,Ht[0].width,Ht[0].height,Q.depth);for(let V=0,K=Ht.length;V<K;V++)if(pt=Ht[V],y.format!==vi)if(dt!==null)if(Ft){if(R)if(y.layerUpdates.size>0){const rt=Rp(pt.width,pt.height,y.format,y.type);for(const at of y.layerUpdates){const qt=pt.data.subarray(at*rt/pt.data.BYTES_PER_ELEMENT,(at+1)*rt/pt.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,V,0,0,at,pt.width,pt.height,1,dt,qt,0,0)}y.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,V,0,0,0,pt.width,pt.height,Q.depth,dt,pt.data,0,0)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,V,Dt,pt.width,pt.height,Q.depth,0,pt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ft?R&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,V,0,0,0,pt.width,pt.height,Q.depth,dt,It,pt.data):n.texImage3D(e.TEXTURE_2D_ARRAY,V,Dt,pt.width,pt.height,Q.depth,0,dt,It,pt.data)}else{Ft&&me&&n.texStorage2D(e.TEXTURE_2D,ot,Dt,Ht[0].width,Ht[0].height);for(let V=0,K=Ht.length;V<K;V++)pt=Ht[V],y.format!==vi?dt!==null?Ft?R&&n.compressedTexSubImage2D(e.TEXTURE_2D,V,0,0,pt.width,pt.height,dt,pt.data):n.compressedTexImage2D(e.TEXTURE_2D,V,Dt,pt.width,pt.height,0,pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ft?R&&n.texSubImage2D(e.TEXTURE_2D,V,0,0,pt.width,pt.height,dt,It,pt.data):n.texImage2D(e.TEXTURE_2D,V,Dt,pt.width,pt.height,0,dt,It,pt.data)}else if(y.isDataArrayTexture)if(Ft){if(me&&n.texStorage3D(e.TEXTURE_2D_ARRAY,ot,Dt,Q.width,Q.height,Q.depth),R)if(y.layerUpdates.size>0){const V=Rp(Q.width,Q.height,y.format,y.type);for(const K of y.layerUpdates){const rt=Q.data.subarray(K*V/Q.data.BYTES_PER_ELEMENT,(K+1)*V/Q.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,K,Q.width,Q.height,1,dt,It,rt)}y.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,dt,It,Q.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,Dt,Q.width,Q.height,Q.depth,0,dt,It,Q.data);else if(y.isData3DTexture)Ft?(me&&n.texStorage3D(e.TEXTURE_3D,ot,Dt,Q.width,Q.height,Q.depth),R&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,dt,It,Q.data)):n.texImage3D(e.TEXTURE_3D,0,Dt,Q.width,Q.height,Q.depth,0,dt,It,Q.data);else if(y.isFramebufferTexture){if(me)if(Ft)n.texStorage2D(e.TEXTURE_2D,ot,Dt,Q.width,Q.height);else{let V=Q.width,K=Q.height;for(let rt=0;rt<ot;rt++)n.texImage2D(e.TEXTURE_2D,rt,Dt,V,K,0,dt,It,null),V>>=1,K>>=1}}else if(Ht.length>0){if(Ft&&me){const V=Ut(Ht[0]);n.texStorage2D(e.TEXTURE_2D,ot,Dt,V.width,V.height)}for(let V=0,K=Ht.length;V<K;V++)pt=Ht[V],Ft?R&&n.texSubImage2D(e.TEXTURE_2D,V,0,0,dt,It,pt):n.texImage2D(e.TEXTURE_2D,V,Dt,dt,It,pt);y.generateMipmaps=!1}else if(Ft){if(me){const V=Ut(Q);n.texStorage2D(e.TEXTURE_2D,ot,Dt,V.width,V.height)}R&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,dt,It,Q)}else n.texImage2D(e.TEXTURE_2D,0,Dt,dt,It,Q);p(y)&&m(Y),Et.__version=$.version,y.onUpdate&&y.onUpdate(y)}b.__version=y.version}function X(b,y,U){if(y.image.length!==6)return;const Y=Qt(b,y),Z=y.source;n.bindTexture(e.TEXTURE_CUBE_MAP,b.__webglTexture,e.TEXTURE0+U);const $=i.get(Z);if(Z.version!==$.__version||Y===!0){n.activeTexture(e.TEXTURE0+U);const Et=se.getPrimaries(se.workingColorSpace),it=y.colorSpace===Ar?null:se.getPrimaries(y.colorSpace),ht=y.colorSpace===Ar||Et===it?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,y.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,y.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,ht);const jt=y.isCompressedTexture||y.image[0].isCompressedTexture,Q=y.image[0]&&y.image[0].isDataTexture,dt=[];for(let K=0;K<6;K++)!jt&&!Q?dt[K]=x(y.image[K],!0,r.maxCubemapSize):dt[K]=Q?y.image[K].image:y.image[K],dt[K]=_e(y,dt[K]);const It=dt[0],Dt=s.convert(y.format,y.colorSpace),pt=s.convert(y.type),Ht=A(y.internalFormat,Dt,pt,y.colorSpace),Ft=y.isVideoTexture!==!0,me=$.__version===void 0||Y===!0,R=Z.dataReady;let ot=E(y,It);xt(e.TEXTURE_CUBE_MAP,y);let V;if(jt){Ft&&me&&n.texStorage2D(e.TEXTURE_CUBE_MAP,ot,Ht,It.width,It.height);for(let K=0;K<6;K++){V=dt[K].mipmaps;for(let rt=0;rt<V.length;rt++){const at=V[rt];y.format!==vi?Dt!==null?Ft?R&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,rt,0,0,at.width,at.height,Dt,at.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,rt,Ht,at.width,at.height,0,at.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ft?R&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,rt,0,0,at.width,at.height,Dt,pt,at.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,rt,Ht,at.width,at.height,0,Dt,pt,at.data)}}}else{if(V=y.mipmaps,Ft&&me){V.length>0&&ot++;const K=Ut(dt[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,ot,Ht,K.width,K.height)}for(let K=0;K<6;K++)if(Q){Ft?R&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,dt[K].width,dt[K].height,Dt,pt,dt[K].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Ht,dt[K].width,dt[K].height,0,Dt,pt,dt[K].data);for(let rt=0;rt<V.length;rt++){const qt=V[rt].image[K].image;Ft?R&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,rt+1,0,0,qt.width,qt.height,Dt,pt,qt.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,rt+1,Ht,qt.width,qt.height,0,Dt,pt,qt.data)}}else{Ft?R&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Dt,pt,dt[K]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Ht,Dt,pt,dt[K]);for(let rt=0;rt<V.length;rt++){const at=V[rt];Ft?R&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,rt+1,0,0,Dt,pt,at.image[K]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,rt+1,Ht,Dt,pt,at.image[K])}}}p(y)&&m(e.TEXTURE_CUBE_MAP),$.__version=Z.version,y.onUpdate&&y.onUpdate(y)}b.__version=y.version}function J(b,y,U,Y,Z,$){const Et=s.convert(U.format,U.colorSpace),it=s.convert(U.type),ht=A(U.internalFormat,Et,it,U.colorSpace);if(!i.get(y).__hasExternalTextures){const Q=Math.max(1,y.width>>$),dt=Math.max(1,y.height>>$);Z===e.TEXTURE_3D||Z===e.TEXTURE_2D_ARRAY?n.texImage3D(Z,$,ht,Q,dt,y.depth,0,Et,it,null):n.texImage2D(Z,$,ht,Q,dt,0,Et,it,null)}n.bindFramebuffer(e.FRAMEBUFFER,b),Kt(y)?a.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,Y,Z,i.get(U).__webglTexture,0,Vt(y)):(Z===e.TEXTURE_2D||Z>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,Y,Z,i.get(U).__webglTexture,$),n.bindFramebuffer(e.FRAMEBUFFER,null)}function _t(b,y,U){if(e.bindRenderbuffer(e.RENDERBUFFER,b),y.depthBuffer){const Y=y.depthTexture,Z=Y&&Y.isDepthTexture?Y.type:null,$=M(y.stencilBuffer,Z),Et=y.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,it=Vt(y);Kt(y)?a.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,it,$,y.width,y.height):U?e.renderbufferStorageMultisample(e.RENDERBUFFER,it,$,y.width,y.height):e.renderbufferStorage(e.RENDERBUFFER,$,y.width,y.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,Et,e.RENDERBUFFER,b)}else{const Y=y.textures;for(let Z=0;Z<Y.length;Z++){const $=Y[Z],Et=s.convert($.format,$.colorSpace),it=s.convert($.type),ht=A($.internalFormat,Et,it,$.colorSpace),jt=Vt(y);U&&Kt(y)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,jt,ht,y.width,y.height):Kt(y)?a.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,jt,ht,y.width,y.height):e.renderbufferStorage(e.RENDERBUFFER,ht,y.width,y.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function ut(b,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(e.FRAMEBUFFER,b),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(y.depthTexture).__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),W(y.depthTexture,0);const Y=i.get(y.depthTexture).__webglTexture,Z=Vt(y);if(y.depthTexture.format===so)Kt(y)?a.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,Y,0,Z):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,Y,0);else if(y.depthTexture.format===go)Kt(y)?a.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,Y,0,Z):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,Y,0);else throw new Error("Unknown depthTexture format")}function Nt(b){const y=i.get(b),U=b.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==b.depthTexture){const Y=b.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),Y){const Z=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,Y.removeEventListener("dispose",Z)};Y.addEventListener("dispose",Z),y.__depthDisposeCallback=Z}y.__boundDepthTexture=Y}if(b.depthTexture&&!y.__autoAllocateDepthBuffer){if(U)throw new Error("target.depthTexture not supported in Cube render targets");ut(y.__webglFramebuffer,b)}else if(U){y.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(n.bindFramebuffer(e.FRAMEBUFFER,y.__webglFramebuffer[Y]),y.__webglDepthbuffer[Y]===void 0)y.__webglDepthbuffer[Y]=e.createRenderbuffer(),_t(y.__webglDepthbuffer[Y],b,!1);else{const Z=b.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,$=y.__webglDepthbuffer[Y];e.bindRenderbuffer(e.RENDERBUFFER,$),e.framebufferRenderbuffer(e.FRAMEBUFFER,Z,e.RENDERBUFFER,$)}}else if(n.bindFramebuffer(e.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=e.createRenderbuffer(),_t(y.__webglDepthbuffer,b,!1);else{const Y=b.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,Z=y.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,Z),e.framebufferRenderbuffer(e.FRAMEBUFFER,Y,e.RENDERBUFFER,Z)}n.bindFramebuffer(e.FRAMEBUFFER,null)}function Rt(b,y,U){const Y=i.get(b);y!==void 0&&J(Y.__webglFramebuffer,b,b.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),U!==void 0&&Nt(b)}function Xt(b){const y=b.texture,U=i.get(b),Y=i.get(y);b.addEventListener("dispose",C);const Z=b.textures,$=b.isWebGLCubeRenderTarget===!0,Et=Z.length>1;if(Et||(Y.__webglTexture===void 0&&(Y.__webglTexture=e.createTexture()),Y.__version=y.version,o.memory.textures++),$){U.__webglFramebuffer=[];for(let it=0;it<6;it++)if(y.mipmaps&&y.mipmaps.length>0){U.__webglFramebuffer[it]=[];for(let ht=0;ht<y.mipmaps.length;ht++)U.__webglFramebuffer[it][ht]=e.createFramebuffer()}else U.__webglFramebuffer[it]=e.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){U.__webglFramebuffer=[];for(let it=0;it<y.mipmaps.length;it++)U.__webglFramebuffer[it]=e.createFramebuffer()}else U.__webglFramebuffer=e.createFramebuffer();if(Et)for(let it=0,ht=Z.length;it<ht;it++){const jt=i.get(Z[it]);jt.__webglTexture===void 0&&(jt.__webglTexture=e.createTexture(),o.memory.textures++)}if(b.samples>0&&Kt(b)===!1){U.__webglMultisampledFramebuffer=e.createFramebuffer(),U.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let it=0;it<Z.length;it++){const ht=Z[it];U.__webglColorRenderbuffer[it]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,U.__webglColorRenderbuffer[it]);const jt=s.convert(ht.format,ht.colorSpace),Q=s.convert(ht.type),dt=A(ht.internalFormat,jt,Q,ht.colorSpace,b.isXRRenderTarget===!0),It=Vt(b);e.renderbufferStorageMultisample(e.RENDERBUFFER,It,dt,b.width,b.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+it,e.RENDERBUFFER,U.__webglColorRenderbuffer[it])}e.bindRenderbuffer(e.RENDERBUFFER,null),b.depthBuffer&&(U.__webglDepthRenderbuffer=e.createRenderbuffer(),_t(U.__webglDepthRenderbuffer,b,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if($){n.bindTexture(e.TEXTURE_CUBE_MAP,Y.__webglTexture),xt(e.TEXTURE_CUBE_MAP,y);for(let it=0;it<6;it++)if(y.mipmaps&&y.mipmaps.length>0)for(let ht=0;ht<y.mipmaps.length;ht++)J(U.__webglFramebuffer[it][ht],b,y,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+it,ht);else J(U.__webglFramebuffer[it],b,y,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+it,0);p(y)&&m(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Et){for(let it=0,ht=Z.length;it<ht;it++){const jt=Z[it],Q=i.get(jt);n.bindTexture(e.TEXTURE_2D,Q.__webglTexture),xt(e.TEXTURE_2D,jt),J(U.__webglFramebuffer,b,jt,e.COLOR_ATTACHMENT0+it,e.TEXTURE_2D,0),p(jt)&&m(e.TEXTURE_2D)}n.unbindTexture()}else{let it=e.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(it=b.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(it,Y.__webglTexture),xt(it,y),y.mipmaps&&y.mipmaps.length>0)for(let ht=0;ht<y.mipmaps.length;ht++)J(U.__webglFramebuffer[ht],b,y,e.COLOR_ATTACHMENT0,it,ht);else J(U.__webglFramebuffer,b,y,e.COLOR_ATTACHMENT0,it,0);p(y)&&m(it),n.unbindTexture()}b.depthBuffer&&Nt(b)}function he(b){const y=b.textures;for(let U=0,Y=y.length;U<Y;U++){const Z=y[U];if(p(Z)){const $=b.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:e.TEXTURE_2D,Et=i.get(Z).__webglTexture;n.bindTexture($,Et),m($),n.unbindTexture()}}}const $t=[],w=[];function Dn(b){if(b.samples>0){if(Kt(b)===!1){const y=b.textures,U=b.width,Y=b.height;let Z=e.COLOR_BUFFER_BIT;const $=b.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,Et=i.get(b),it=y.length>1;if(it)for(let ht=0;ht<y.length;ht++)n.bindFramebuffer(e.FRAMEBUFFER,Et.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+ht,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,Et.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+ht,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,Et.__webglMultisampledFramebuffer),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,Et.__webglFramebuffer);for(let ht=0;ht<y.length;ht++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(Z|=e.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(Z|=e.STENCIL_BUFFER_BIT)),it){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,Et.__webglColorRenderbuffer[ht]);const jt=i.get(y[ht]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,jt,0)}e.blitFramebuffer(0,0,U,Y,0,0,U,Y,Z,e.NEAREST),c===!0&&($t.length=0,w.length=0,$t.push(e.COLOR_ATTACHMENT0+ht),b.depthBuffer&&b.resolveDepthBuffer===!1&&($t.push($),w.push($),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,w)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,$t))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),it)for(let ht=0;ht<y.length;ht++){n.bindFramebuffer(e.FRAMEBUFFER,Et.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+ht,e.RENDERBUFFER,Et.__webglColorRenderbuffer[ht]);const jt=i.get(y[ht]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,Et.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+ht,e.TEXTURE_2D,jt,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,Et.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&c){const y=b.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[y])}}}function Vt(b){return Math.min(r.maxSamples,b.samples)}function Kt(b){const y=i.get(b);return b.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function Lt(b){const y=o.render.frame;u.get(b)!==y&&(u.set(b,y),b.update())}function _e(b,y){const U=b.colorSpace,Y=b.format,Z=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||U!==zr&&U!==Ar&&(se.getTransfer(U)===xe?(Y!==vi||Z!==or)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",U)),y}function Ut(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(l.width=b.naturalWidth||b.width,l.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(l.width=b.displayWidth,l.height=b.displayHeight):(l.width=b.width,l.height=b.height),l}this.allocateTextureUnit=N,this.resetTextureUnits=_,this.setTexture2D=W,this.setTexture2DArray=q,this.setTexture3D=O,this.setTextureCube=j,this.rebindTextures=Rt,this.setupRenderTarget=Xt,this.updateRenderTargetMipmap=he,this.updateMultisampleRenderTarget=Dn,this.setupDepthRenderbuffer=Nt,this.setupFrameBufferTexture=J,this.useMultisampledRTT=Kt}function IE(e,t){function n(i,r=Ar){let s;const o=se.getTransfer(r);if(i===or)return e.UNSIGNED_BYTE;if(i===df)return e.UNSIGNED_SHORT_4_4_4_4;if(i===pf)return e.UNSIGNED_SHORT_5_5_5_1;if(i===Pg)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===Cg)return e.BYTE;if(i===Rg)return e.SHORT;if(i===va)return e.UNSIGNED_SHORT;if(i===ff)return e.INT;if(i===_s)return e.UNSIGNED_INT;if(i===er)return e.FLOAT;if(i===Ra)return e.HALF_FLOAT;if(i===Lg)return e.ALPHA;if(i===Ig)return e.RGB;if(i===vi)return e.RGBA;if(i===Dg)return e.LUMINANCE;if(i===Ug)return e.LUMINANCE_ALPHA;if(i===so)return e.DEPTH_COMPONENT;if(i===go)return e.DEPTH_STENCIL;if(i===Ng)return e.RED;if(i===mf)return e.RED_INTEGER;if(i===Fg)return e.RG;if(i===gf)return e.RG_INTEGER;if(i===_f)return e.RGBA_INTEGER;if(i===Uc||i===Nc||i===Fc||i===Oc)if(o===xe)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Uc)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Nc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Fc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Oc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Uc)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Nc)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Fc)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Oc)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===nh||i===ih||i===rh||i===sh)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===nh)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ih)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===rh)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===sh)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===oh||i===ah||i===ch)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===oh||i===ah)return o===xe?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===ch)return o===xe?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===lh||i===uh||i===hh||i===fh||i===dh||i===ph||i===mh||i===gh||i===_h||i===vh||i===xh||i===yh||i===Sh||i===Mh)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===lh)return o===xe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===uh)return o===xe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===hh)return o===xe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===fh)return o===xe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===dh)return o===xe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ph)return o===xe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===mh)return o===xe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===gh)return o===xe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===_h)return o===xe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===vh)return o===xe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===xh)return o===xe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===yh)return o===xe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Sh)return o===xe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Mh)return o===xe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===kc||i===Eh||i===bh)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===kc)return o===xe?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Eh)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===bh)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Og||i===Ah||i===Th||i===wh)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===kc)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Ah)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Th)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===wh)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===mo?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:n}}class DE extends di{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class rs extends Sn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const UE={type:"move"};class Mu{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new rs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new rs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new rs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const n=this._hand;if(n)for(const i of t.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,i){let r=null,s=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const x of t.hand.values()){const p=n.getJointPose(x,i),m=this._getHandJoint(l,x);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,g=.005;l.inputState.pinching&&f>d+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=d-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(s=n.getPose(t.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=n.getPose(t.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(UE)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){const i=new rs;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[n.jointName]=i,t.add(i)}return t.joints[n.jointName]}}const NE=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,FE=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class OE{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n,i){if(this.texture===null){const r=new yn,s=t.properties.get(r);s.__webglTexture=n.texture,(n.depthNear!=i.depthNear||n.depthFar!=i.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=r}}getMesh(t){if(this.texture!==null&&this.mesh===null){const n=t.cameras[0].viewport,i=new Or({vertexShader:NE,fragmentShader:FE,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new ee(new pi(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class kE extends Ro{constructor(t,n){super();const i=this;let r=null,s=1,o=null,a="local-floor",c=1,l=null,u=null,h=null,f=null,d=null,g=null;const x=new OE,p=n.getContextAttributes();let m=null,A=null;const M=[],E=[],z=new mt;let C=null;const T=new di;T.layers.enable(1),T.viewport=new ke;const B=new di;B.layers.enable(2),B.viewport=new ke;const et=[T,B],v=new DE;v.layers.enable(1),v.layers.enable(2);let _=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let J=M[X];return J===void 0&&(J=new Mu,M[X]=J),J.getTargetRaySpace()},this.getControllerGrip=function(X){let J=M[X];return J===void 0&&(J=new Mu,M[X]=J),J.getGripSpace()},this.getHand=function(X){let J=M[X];return J===void 0&&(J=new Mu,M[X]=J),J.getHandSpace()};function G(X){const J=E.indexOf(X.inputSource);if(J===-1)return;const _t=M[J];_t!==void 0&&(_t.update(X.inputSource,X.frame,l||o),_t.dispatchEvent({type:X.type,data:X.inputSource}))}function W(){r.removeEventListener("select",G),r.removeEventListener("selectstart",G),r.removeEventListener("selectend",G),r.removeEventListener("squeeze",G),r.removeEventListener("squeezestart",G),r.removeEventListener("squeezeend",G),r.removeEventListener("end",W),r.removeEventListener("inputsourceschange",q);for(let X=0;X<M.length;X++){const J=E[X];J!==null&&(E[X]=null,M[X].disconnect(J))}_=null,N=null,x.reset(),t.setRenderTarget(m),d=null,f=null,h=null,r=null,A=null,ce.stop(),i.isPresenting=!1,t.setPixelRatio(C),t.setSize(z.width,z.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){s=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(X){if(r=X,r!==null){if(m=t.getRenderTarget(),r.addEventListener("select",G),r.addEventListener("selectstart",G),r.addEventListener("selectend",G),r.addEventListener("squeeze",G),r.addEventListener("squeezestart",G),r.addEventListener("squeezeend",G),r.addEventListener("end",W),r.addEventListener("inputsourceschange",q),p.xrCompatible!==!0&&await n.makeXRCompatible(),C=t.getPixelRatio(),t.getSize(z),r.renderState.layers===void 0){const J={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(r,n,J),r.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),A=new vs(d.framebufferWidth,d.framebufferHeight,{format:vi,type:or,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil})}else{let J=null,_t=null,ut=null;p.depth&&(ut=p.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,J=p.stencil?go:so,_t=p.stencil?mo:_s);const Nt={colorFormat:n.RGBA8,depthFormat:ut,scaleFactor:s};h=new XRWebGLBinding(r,n),f=h.createProjectionLayer(Nt),r.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),A=new vs(f.textureWidth,f.textureHeight,{format:vi,type:or,depthTexture:new Qg(f.textureWidth,f.textureHeight,_t,void 0,void 0,void 0,void 0,void 0,void 0,J),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(a),ce.setContext(r),ce.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function q(X){for(let J=0;J<X.removed.length;J++){const _t=X.removed[J],ut=E.indexOf(_t);ut>=0&&(E[ut]=null,M[ut].disconnect(_t))}for(let J=0;J<X.added.length;J++){const _t=X.added[J];let ut=E.indexOf(_t);if(ut===-1){for(let Rt=0;Rt<M.length;Rt++)if(Rt>=E.length){E.push(_t),ut=Rt;break}else if(E[Rt]===null){E[Rt]=_t,ut=Rt;break}if(ut===-1)break}const Nt=M[ut];Nt&&Nt.connect(_t)}}const O=new I,j=new I;function H(X,J,_t){O.setFromMatrixPosition(J.matrixWorld),j.setFromMatrixPosition(_t.matrixWorld);const ut=O.distanceTo(j),Nt=J.projectionMatrix.elements,Rt=_t.projectionMatrix.elements,Xt=Nt[14]/(Nt[10]-1),he=Nt[14]/(Nt[10]+1),$t=(Nt[9]+1)/Nt[5],w=(Nt[9]-1)/Nt[5],Dn=(Nt[8]-1)/Nt[0],Vt=(Rt[8]+1)/Rt[0],Kt=Xt*Dn,Lt=Xt*Vt,_e=ut/(-Dn+Vt),Ut=_e*-Dn;if(J.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Ut),X.translateZ(_e),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),Nt[10]===-1)X.projectionMatrix.copy(J.projectionMatrix),X.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{const b=Xt+_e,y=he+_e,U=Kt-Ut,Y=Lt+(ut-Ut),Z=$t*he/y*b,$=w*he/y*b;X.projectionMatrix.makePerspective(U,Y,Z,$,b,y),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function ct(X,J){J===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(J.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(r===null)return;let J=X.near,_t=X.far;x.texture!==null&&(x.depthNear>0&&(J=x.depthNear),x.depthFar>0&&(_t=x.depthFar)),v.near=B.near=T.near=J,v.far=B.far=T.far=_t,(_!==v.near||N!==v.far)&&(r.updateRenderState({depthNear:v.near,depthFar:v.far}),_=v.near,N=v.far);const ut=X.parent,Nt=v.cameras;ct(v,ut);for(let Rt=0;Rt<Nt.length;Rt++)ct(Nt[Rt],ut);Nt.length===2?H(v,T,B):v.projectionMatrix.copy(T.projectionMatrix),lt(X,v,ut)};function lt(X,J,_t){_t===null?X.matrix.copy(J.matrixWorld):(X.matrix.copy(_t.matrixWorld),X.matrix.invert(),X.matrix.multiply(J.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(J.projectionMatrix),X.projectionMatrixInverse.copy(J.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Rh*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(X){c=X,f!==null&&(f.fixedFoveation=X),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=X)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(v)};let xt=null;function Qt(X,J){if(u=J.getViewerPose(l||o),g=J,u!==null){const _t=u.views;d!==null&&(t.setRenderTargetFramebuffer(A,d.framebuffer),t.setRenderTarget(A));let ut=!1;_t.length!==v.cameras.length&&(v.cameras.length=0,ut=!0);for(let Rt=0;Rt<_t.length;Rt++){const Xt=_t[Rt];let he=null;if(d!==null)he=d.getViewport(Xt);else{const w=h.getViewSubImage(f,Xt);he=w.viewport,Rt===0&&(t.setRenderTargetTextures(A,w.colorTexture,f.ignoreDepthValues?void 0:w.depthStencilTexture),t.setRenderTarget(A))}let $t=et[Rt];$t===void 0&&($t=new di,$t.layers.enable(Rt),$t.viewport=new ke,et[Rt]=$t),$t.matrix.fromArray(Xt.transform.matrix),$t.matrix.decompose($t.position,$t.quaternion,$t.scale),$t.projectionMatrix.fromArray(Xt.projectionMatrix),$t.projectionMatrixInverse.copy($t.projectionMatrix).invert(),$t.viewport.set(he.x,he.y,he.width,he.height),Rt===0&&(v.matrix.copy($t.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),ut===!0&&v.cameras.push($t)}const Nt=r.enabledFeatures;if(Nt&&Nt.includes("depth-sensing")){const Rt=h.getDepthInformation(_t[0]);Rt&&Rt.isValid&&Rt.texture&&x.init(t,Rt,r.renderState)}}for(let _t=0;_t<M.length;_t++){const ut=E[_t],Nt=M[_t];ut!==null&&Nt!==void 0&&Nt.update(ut,J,l||o)}xt&&xt(X,J),J.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:J}),g=null}const ce=new Zg;ce.setAnimationLoop(Qt),this.setAnimationLoop=function(X){xt=X},this.dispose=function(){}}}const Yr=new ar,BE=new Re;function zE(e,t){function n(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function i(p,m){m.color.getRGB(p.fogColor.value,qg(e)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function r(p,m,A,M,E){m.isMeshBasicMaterial||m.isMeshLambertMaterial?s(p,m):m.isMeshToonMaterial?(s(p,m),h(p,m)):m.isMeshPhongMaterial?(s(p,m),u(p,m)):m.isMeshStandardMaterial?(s(p,m),f(p,m),m.isMeshPhysicalMaterial&&d(p,m,E)):m.isMeshMatcapMaterial?(s(p,m),g(p,m)):m.isMeshDepthMaterial?s(p,m):m.isMeshDistanceMaterial?(s(p,m),x(p,m)):m.isMeshNormalMaterial?s(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&a(p,m)):m.isPointsMaterial?c(p,m,A,M):m.isSpriteMaterial?l(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,n(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,n(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,n(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Rn&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,n(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Rn&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,n(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,n(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,n(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const A=t.get(m),M=A.envMap,E=A.envMapRotation;M&&(p.envMap.value=M,Yr.copy(E),Yr.x*=-1,Yr.y*=-1,Yr.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Yr.y*=-1,Yr.z*=-1),p.envMapRotation.value.setFromMatrix4(BE.makeRotationFromEuler(Yr)),p.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,n(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,n(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,n(m.map,p.mapTransform))}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function c(p,m,A,M){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*A,p.scale.value=M*.5,m.map&&(p.map.value=m.map,n(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,n(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function l(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,n(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,n(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function u(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function h(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function f(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,n(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,n(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function d(p,m,A){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,n(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,n(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,n(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,n(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,n(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Rn&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,n(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,n(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=A.texture,p.transmissionSamplerSize.value.set(A.width,A.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,n(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,n(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,n(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,n(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,n(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function x(p,m){const A=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(A.matrixWorld),p.nearDistance.value=A.shadow.camera.near,p.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function GE(e,t,n,i){let r={},s={},o=[];const a=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(A,M){const E=M.program;i.uniformBlockBinding(A,E)}function l(A,M){let E=r[A.id];E===void 0&&(g(A),E=u(A),r[A.id]=E,A.addEventListener("dispose",p));const z=M.program;i.updateUBOMapping(A,z);const C=t.render.frame;s[A.id]!==C&&(f(A),s[A.id]=C)}function u(A){const M=h();A.__bindingPointIndex=M;const E=e.createBuffer(),z=A.__size,C=A.usage;return e.bindBuffer(e.UNIFORM_BUFFER,E),e.bufferData(e.UNIFORM_BUFFER,z,C),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,M,E),E}function h(){for(let A=0;A<a;A++)if(o.indexOf(A)===-1)return o.push(A),A;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(A){const M=r[A.id],E=A.uniforms,z=A.__cache;e.bindBuffer(e.UNIFORM_BUFFER,M);for(let C=0,T=E.length;C<T;C++){const B=Array.isArray(E[C])?E[C]:[E[C]];for(let et=0,v=B.length;et<v;et++){const _=B[et];if(d(_,C,et,z)===!0){const N=_.__offset,G=Array.isArray(_.value)?_.value:[_.value];let W=0;for(let q=0;q<G.length;q++){const O=G[q],j=x(O);typeof O=="number"||typeof O=="boolean"?(_.__data[0]=O,e.bufferSubData(e.UNIFORM_BUFFER,N+W,_.__data)):O.isMatrix3?(_.__data[0]=O.elements[0],_.__data[1]=O.elements[1],_.__data[2]=O.elements[2],_.__data[3]=0,_.__data[4]=O.elements[3],_.__data[5]=O.elements[4],_.__data[6]=O.elements[5],_.__data[7]=0,_.__data[8]=O.elements[6],_.__data[9]=O.elements[7],_.__data[10]=O.elements[8],_.__data[11]=0):(O.toArray(_.__data,W),W+=j.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,N,_.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function d(A,M,E,z){const C=A.value,T=M+"_"+E;if(z[T]===void 0)return typeof C=="number"||typeof C=="boolean"?z[T]=C:z[T]=C.clone(),!0;{const B=z[T];if(typeof C=="number"||typeof C=="boolean"){if(B!==C)return z[T]=C,!0}else if(B.equals(C)===!1)return B.copy(C),!0}return!1}function g(A){const M=A.uniforms;let E=0;const z=16;for(let T=0,B=M.length;T<B;T++){const et=Array.isArray(M[T])?M[T]:[M[T]];for(let v=0,_=et.length;v<_;v++){const N=et[v],G=Array.isArray(N.value)?N.value:[N.value];for(let W=0,q=G.length;W<q;W++){const O=G[W],j=x(O),H=E%z,ct=H%j.boundary,lt=H+ct;E+=ct,lt!==0&&z-lt<j.storage&&(E+=z-lt),N.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=E,E+=j.storage}}}const C=E%z;return C>0&&(E+=z-C),A.__size=E,A.__cache={},this}function x(A){const M={boundary:0,storage:0};return typeof A=="number"||typeof A=="boolean"?(M.boundary=4,M.storage=4):A.isVector2?(M.boundary=8,M.storage=8):A.isVector3||A.isColor?(M.boundary=16,M.storage=12):A.isVector4?(M.boundary=16,M.storage=16):A.isMatrix3?(M.boundary=48,M.storage=48):A.isMatrix4?(M.boundary=64,M.storage=64):A.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",A),M}function p(A){const M=A.target;M.removeEventListener("dispose",p);const E=o.indexOf(M.__bindingPointIndex);o.splice(E,1),e.deleteBuffer(r[M.id]),delete r[M.id],delete s[M.id]}function m(){for(const A in r)e.deleteBuffer(r[A]);o=[],r={},s={}}return{bind:c,update:l,dispose:m}}class VE{constructor(t={}){const{canvas:n=Rx(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=t;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=o;const d=new Uint32Array(4),g=new Int32Array(4);let x=null,p=null;const m=[],A=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ri,this.toneMapping=Pr,this.toneMappingExposure=1;const M=this;let E=!1,z=0,C=0,T=null,B=-1,et=null;const v=new ke,_=new ke;let N=null;const G=new oe(0);let W=0,q=n.width,O=n.height,j=1,H=null,ct=null;const lt=new ke(0,0,q,O),xt=new ke(0,0,q,O);let Qt=!1;const ce=new jg;let X=!1,J=!1;const _t=new Re,ut=new Re,Nt=new I,Rt=new ke,Xt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let he=!1;function $t(){return T===null?j:1}let w=i;function Dn(S,P){return n.getContext(S,P)}try{const S={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${hf}`),n.addEventListener("webglcontextlost",K,!1),n.addEventListener("webglcontextrestored",rt,!1),n.addEventListener("webglcontextcreationerror",at,!1),w===null){const P="webgl2";if(w=Dn(P,S),w===null)throw Dn(P)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let Vt,Kt,Lt,_e,Ut,b,y,U,Y,Z,$,Et,it,ht,jt,Q,dt,It,Dt,pt,Ht,Ft,me,R;function ot(){Vt=new qS(w),Vt.init(),Ft=new IE(w,Vt),Kt=new GS(w,Vt,t,Ft),Lt=new RE(w),Kt.reverseDepthBuffer&&Lt.buffers.depth.setReversed(!0),_e=new jS(w),Ut=new pE,b=new LE(w,Vt,Lt,Ut,Kt,Ft,_e),y=new HS(M),U=new $S(M),Y=new iy(w),me=new BS(w,Y),Z=new YS(w,Y,_e,me),$=new JS(w,Z,Y,_e),Dt=new ZS(w,Kt,b),Q=new VS(Ut),Et=new dE(M,y,U,Vt,Kt,me,Q),it=new zE(M,Ut),ht=new gE,jt=new ME(Vt),It=new kS(M,y,U,Lt,$,f,c),dt=new wE(M,$,Kt),R=new GE(w,_e,Kt,Lt),pt=new zS(w,Vt,_e),Ht=new KS(w,Vt,_e),_e.programs=Et.programs,M.capabilities=Kt,M.extensions=Vt,M.properties=Ut,M.renderLists=ht,M.shadowMap=dt,M.state=Lt,M.info=_e}ot();const V=new kE(M,w);this.xr=V,this.getContext=function(){return w},this.getContextAttributes=function(){return w.getContextAttributes()},this.forceContextLoss=function(){const S=Vt.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=Vt.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(S){S!==void 0&&(j=S,this.setSize(q,O,!1))},this.getSize=function(S){return S.set(q,O)},this.setSize=function(S,P,F=!0){if(V.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=S,O=P,n.width=Math.floor(S*j),n.height=Math.floor(P*j),F===!0&&(n.style.width=S+"px",n.style.height=P+"px"),this.setViewport(0,0,S,P)},this.getDrawingBufferSize=function(S){return S.set(q*j,O*j).floor()},this.setDrawingBufferSize=function(S,P,F){q=S,O=P,j=F,n.width=Math.floor(S*F),n.height=Math.floor(P*F),this.setViewport(0,0,S,P)},this.getCurrentViewport=function(S){return S.copy(v)},this.getViewport=function(S){return S.copy(lt)},this.setViewport=function(S,P,F,k){S.isVector4?lt.set(S.x,S.y,S.z,S.w):lt.set(S,P,F,k),Lt.viewport(v.copy(lt).multiplyScalar(j).round())},this.getScissor=function(S){return S.copy(xt)},this.setScissor=function(S,P,F,k){S.isVector4?xt.set(S.x,S.y,S.z,S.w):xt.set(S,P,F,k),Lt.scissor(_.copy(xt).multiplyScalar(j).round())},this.getScissorTest=function(){return Qt},this.setScissorTest=function(S){Lt.setScissorTest(Qt=S)},this.setOpaqueSort=function(S){H=S},this.setTransparentSort=function(S){ct=S},this.getClearColor=function(S){return S.copy(It.getClearColor())},this.setClearColor=function(){It.setClearColor.apply(It,arguments)},this.getClearAlpha=function(){return It.getClearAlpha()},this.setClearAlpha=function(){It.setClearAlpha.apply(It,arguments)},this.clear=function(S=!0,P=!0,F=!0){let k=0;if(S){let D=!1;if(T!==null){const tt=T.texture.format;D=tt===_f||tt===gf||tt===mf}if(D){const tt=T.texture.type,st=tt===or||tt===_s||tt===va||tt===mo||tt===df||tt===pf,gt=It.getClearColor(),vt=It.getClearAlpha(),Ct=gt.r,Pt=gt.g,bt=gt.b;st?(d[0]=Ct,d[1]=Pt,d[2]=bt,d[3]=vt,w.clearBufferuiv(w.COLOR,0,d)):(g[0]=Ct,g[1]=Pt,g[2]=bt,g[3]=vt,w.clearBufferiv(w.COLOR,0,g))}else k|=w.COLOR_BUFFER_BIT}P&&(k|=w.DEPTH_BUFFER_BIT,w.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),F&&(k|=w.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),w.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",K,!1),n.removeEventListener("webglcontextrestored",rt,!1),n.removeEventListener("webglcontextcreationerror",at,!1),ht.dispose(),jt.dispose(),Ut.dispose(),y.dispose(),U.dispose(),$.dispose(),me.dispose(),R.dispose(),Et.dispose(),V.dispose(),V.removeEventListener("sessionstart",vd),V.removeEventListener("sessionend",xd),Vr.stop()};function K(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function rt(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const S=_e.autoReset,P=dt.enabled,F=dt.autoUpdate,k=dt.needsUpdate,D=dt.type;ot(),_e.autoReset=S,dt.enabled=P,dt.autoUpdate=F,dt.needsUpdate=k,dt.type=D}function at(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function qt(S){const P=S.target;P.removeEventListener("dispose",qt),Ge(P)}function Ge(S){Mn(S),Ut.remove(S)}function Mn(S){const P=Ut.get(S).programs;P!==void 0&&(P.forEach(function(F){Et.releaseProgram(F)}),S.isShaderMaterial&&Et.releaseShaderCache(S))}this.renderBufferDirect=function(S,P,F,k,D,tt){P===null&&(P=Xt);const st=D.isMesh&&D.matrixWorld.determinant()<0,gt=gv(S,P,F,k,D);Lt.setMaterial(k,st);let vt=F.index,Ct=1;if(k.wireframe===!0){if(vt=Z.getWireframeAttribute(F),vt===void 0)return;Ct=2}const Pt=F.drawRange,bt=F.attributes.position;let le=Pt.start*Ct,ve=(Pt.start+Pt.count)*Ct;tt!==null&&(le=Math.max(le,tt.start*Ct),ve=Math.min(ve,(tt.start+tt.count)*Ct)),vt!==null?(le=Math.max(le,0),ve=Math.min(ve,vt.count)):bt!=null&&(le=Math.max(le,0),ve=Math.min(ve,bt.count));const Le=ve-le;if(Le<0||Le===1/0)return;me.setup(D,k,gt,F,vt);let Un,ie=pt;if(vt!==null&&(Un=Y.get(vt),ie=Ht,ie.setIndex(Un)),D.isMesh)k.wireframe===!0?(Lt.setLineWidth(k.wireframeLinewidth*$t()),ie.setMode(w.LINES)):ie.setMode(w.TRIANGLES);else if(D.isLine){let At=k.linewidth;At===void 0&&(At=1),Lt.setLineWidth(At*$t()),D.isLineSegments?ie.setMode(w.LINES):D.isLineLoop?ie.setMode(w.LINE_LOOP):ie.setMode(w.LINE_STRIP)}else D.isPoints?ie.setMode(w.POINTS):D.isSprite&&ie.setMode(w.TRIANGLES);if(D.isBatchedMesh)if(D._multiDrawInstances!==null)ie.renderMultiDrawInstances(D._multiDrawStarts,D._multiDrawCounts,D._multiDrawCount,D._multiDrawInstances);else if(Vt.get("WEBGL_multi_draw"))ie.renderMultiDraw(D._multiDrawStarts,D._multiDrawCounts,D._multiDrawCount);else{const At=D._multiDrawStarts,an=D._multiDrawCounts,re=D._multiDrawCount,li=vt?Y.get(vt).bytesPerElement:1,ws=Ut.get(k).currentProgram.getUniforms();for(let Nn=0;Nn<re;Nn++)ws.setValue(w,"_gl_DrawID",Nn),ie.render(At[Nn]/li,an[Nn])}else if(D.isInstancedMesh)ie.renderInstances(le,Le,D.count);else if(F.isInstancedBufferGeometry){const At=F._maxInstanceCount!==void 0?F._maxInstanceCount:1/0,an=Math.min(F.instanceCount,At);ie.renderInstances(le,Le,an)}else ie.render(le,Le)};function te(S,P,F){S.transparent===!0&&S.side===Li&&S.forceSinglePass===!1?(S.side=Rn,S.needsUpdate=!0,Va(S,P,F),S.side=Fr,S.needsUpdate=!0,Va(S,P,F),S.side=Li):Va(S,P,F)}this.compile=function(S,P,F=null){F===null&&(F=S),p=jt.get(F),p.init(P),A.push(p),F.traverseVisible(function(D){D.isLight&&D.layers.test(P.layers)&&(p.pushLight(D),D.castShadow&&p.pushShadow(D))}),S!==F&&S.traverseVisible(function(D){D.isLight&&D.layers.test(P.layers)&&(p.pushLight(D),D.castShadow&&p.pushShadow(D))}),p.setupLights();const k=new Set;return S.traverse(function(D){if(!(D.isMesh||D.isPoints||D.isLine||D.isSprite))return;const tt=D.material;if(tt)if(Array.isArray(tt))for(let st=0;st<tt.length;st++){const gt=tt[st];te(gt,F,D),k.add(gt)}else te(tt,F,D),k.add(tt)}),A.pop(),p=null,k},this.compileAsync=function(S,P,F=null){const k=this.compile(S,P,F);return new Promise(D=>{function tt(){if(k.forEach(function(st){Ut.get(st).currentProgram.isReady()&&k.delete(st)}),k.size===0){D(S);return}setTimeout(tt,10)}Vt.get("KHR_parallel_shader_compile")!==null?tt():setTimeout(tt,10)})};let En=null;function Xi(S){En&&En(S)}function vd(){Vr.stop()}function xd(){Vr.start()}const Vr=new Zg;Vr.setAnimationLoop(Xi),typeof self<"u"&&Vr.setContext(self),this.setAnimationLoop=function(S){En=S,V.setAnimationLoop(S),S===null?Vr.stop():Vr.start()},V.addEventListener("sessionstart",vd),V.addEventListener("sessionend",xd),this.render=function(S,P){if(P!==void 0&&P.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),P.parent===null&&P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),V.enabled===!0&&V.isPresenting===!0&&(V.cameraAutoUpdate===!0&&V.updateCamera(P),P=V.getCamera()),S.isScene===!0&&S.onBeforeRender(M,S,P,T),p=jt.get(S,A.length),p.init(P),A.push(p),ut.multiplyMatrices(P.projectionMatrix,P.matrixWorldInverse),ce.setFromProjectionMatrix(ut),J=this.localClippingEnabled,X=Q.init(this.clippingPlanes,J),x=ht.get(S,m.length),x.init(),m.push(x),V.enabled===!0&&V.isPresenting===!0){const tt=M.xr.getDepthSensingMesh();tt!==null&&zl(tt,P,-1/0,M.sortObjects)}zl(S,P,0,M.sortObjects),x.finish(),M.sortObjects===!0&&x.sort(H,ct),he=V.enabled===!1||V.isPresenting===!1||V.hasDepthSensing()===!1,he&&It.addToRenderList(x,S),this.info.render.frame++,X===!0&&Q.beginShadows();const F=p.state.shadowsArray;dt.render(F,S,P),X===!0&&Q.endShadows(),this.info.autoReset===!0&&this.info.reset();const k=x.opaque,D=x.transmissive;if(p.setupLights(),P.isArrayCamera){const tt=P.cameras;if(D.length>0)for(let st=0,gt=tt.length;st<gt;st++){const vt=tt[st];Sd(k,D,S,vt)}he&&It.render(S);for(let st=0,gt=tt.length;st<gt;st++){const vt=tt[st];yd(x,S,vt,vt.viewport)}}else D.length>0&&Sd(k,D,S,P),he&&It.render(S),yd(x,S,P);T!==null&&(b.updateMultisampleRenderTarget(T),b.updateRenderTargetMipmap(T)),S.isScene===!0&&S.onAfterRender(M,S,P),me.resetDefaultState(),B=-1,et=null,A.pop(),A.length>0?(p=A[A.length-1],X===!0&&Q.setGlobalState(M.clippingPlanes,p.state.camera)):p=null,m.pop(),m.length>0?x=m[m.length-1]:x=null};function zl(S,P,F,k){if(S.visible===!1)return;if(S.layers.test(P.layers)){if(S.isGroup)F=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(P);else if(S.isLight)p.pushLight(S),S.castShadow&&p.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||ce.intersectsSprite(S)){k&&Rt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(ut);const st=$.update(S),gt=S.material;gt.visible&&x.push(S,st,gt,F,Rt.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||ce.intersectsObject(S))){const st=$.update(S),gt=S.material;if(k&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Rt.copy(S.boundingSphere.center)):(st.boundingSphere===null&&st.computeBoundingSphere(),Rt.copy(st.boundingSphere.center)),Rt.applyMatrix4(S.matrixWorld).applyMatrix4(ut)),Array.isArray(gt)){const vt=st.groups;for(let Ct=0,Pt=vt.length;Ct<Pt;Ct++){const bt=vt[Ct],le=gt[bt.materialIndex];le&&le.visible&&x.push(S,st,le,F,Rt.z,bt)}}else gt.visible&&x.push(S,st,gt,F,Rt.z,null)}}const tt=S.children;for(let st=0,gt=tt.length;st<gt;st++)zl(tt[st],P,F,k)}function yd(S,P,F,k){const D=S.opaque,tt=S.transmissive,st=S.transparent;p.setupLightsView(F),X===!0&&Q.setGlobalState(M.clippingPlanes,F),k&&Lt.viewport(v.copy(k)),D.length>0&&Ga(D,P,F),tt.length>0&&Ga(tt,P,F),st.length>0&&Ga(st,P,F),Lt.buffers.depth.setTest(!0),Lt.buffers.depth.setMask(!0),Lt.buffers.color.setMask(!0),Lt.setPolygonOffset(!1)}function Sd(S,P,F,k){if((F.isScene===!0?F.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[k.id]===void 0&&(p.state.transmissionRenderTarget[k.id]=new vs(1,1,{generateMipmaps:!0,type:Vt.has("EXT_color_buffer_half_float")||Vt.has("EXT_color_buffer_float")?Ra:or,minFilter:is,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:se.workingColorSpace}));const tt=p.state.transmissionRenderTarget[k.id],st=k.viewport||v;tt.setSize(st.z,st.w);const gt=M.getRenderTarget();M.setRenderTarget(tt),M.getClearColor(G),W=M.getClearAlpha(),W<1&&M.setClearColor(16777215,.5),M.clear(),he&&It.render(F);const vt=M.toneMapping;M.toneMapping=Pr;const Ct=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),p.setupLightsView(k),X===!0&&Q.setGlobalState(M.clippingPlanes,k),Ga(S,F,k),b.updateMultisampleRenderTarget(tt),b.updateRenderTargetMipmap(tt),Vt.has("WEBGL_multisampled_render_to_texture")===!1){let Pt=!1;for(let bt=0,le=P.length;bt<le;bt++){const ve=P[bt],Le=ve.object,Un=ve.geometry,ie=ve.material,At=ve.group;if(ie.side===Li&&Le.layers.test(k.layers)){const an=ie.side;ie.side=Rn,ie.needsUpdate=!0,Md(Le,F,k,Un,ie,At),ie.side=an,ie.needsUpdate=!0,Pt=!0}}Pt===!0&&(b.updateMultisampleRenderTarget(tt),b.updateRenderTargetMipmap(tt))}M.setRenderTarget(gt),M.setClearColor(G,W),Ct!==void 0&&(k.viewport=Ct),M.toneMapping=vt}function Ga(S,P,F){const k=P.isScene===!0?P.overrideMaterial:null;for(let D=0,tt=S.length;D<tt;D++){const st=S[D],gt=st.object,vt=st.geometry,Ct=k===null?st.material:k,Pt=st.group;gt.layers.test(F.layers)&&Md(gt,P,F,vt,Ct,Pt)}}function Md(S,P,F,k,D,tt){S.onBeforeRender(M,P,F,k,D,tt),S.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),D.onBeforeRender(M,P,F,k,S,tt),D.transparent===!0&&D.side===Li&&D.forceSinglePass===!1?(D.side=Rn,D.needsUpdate=!0,M.renderBufferDirect(F,P,k,D,S,tt),D.side=Fr,D.needsUpdate=!0,M.renderBufferDirect(F,P,k,D,S,tt),D.side=Li):M.renderBufferDirect(F,P,k,D,S,tt),S.onAfterRender(M,P,F,k,D,tt)}function Va(S,P,F){P.isScene!==!0&&(P=Xt);const k=Ut.get(S),D=p.state.lights,tt=p.state.shadowsArray,st=D.state.version,gt=Et.getParameters(S,D.state,tt,P,F),vt=Et.getProgramCacheKey(gt);let Ct=k.programs;k.environment=S.isMeshStandardMaterial?P.environment:null,k.fog=P.fog,k.envMap=(S.isMeshStandardMaterial?U:y).get(S.envMap||k.environment),k.envMapRotation=k.environment!==null&&S.envMap===null?P.environmentRotation:S.envMapRotation,Ct===void 0&&(S.addEventListener("dispose",qt),Ct=new Map,k.programs=Ct);let Pt=Ct.get(vt);if(Pt!==void 0){if(k.currentProgram===Pt&&k.lightsStateVersion===st)return bd(S,gt),Pt}else gt.uniforms=Et.getUniforms(S),S.onBeforeCompile(gt,M),Pt=Et.acquireProgram(gt,vt),Ct.set(vt,Pt),k.uniforms=gt.uniforms;const bt=k.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(bt.clippingPlanes=Q.uniform),bd(S,gt),k.needsLights=vv(S),k.lightsStateVersion=st,k.needsLights&&(bt.ambientLightColor.value=D.state.ambient,bt.lightProbe.value=D.state.probe,bt.directionalLights.value=D.state.directional,bt.directionalLightShadows.value=D.state.directionalShadow,bt.spotLights.value=D.state.spot,bt.spotLightShadows.value=D.state.spotShadow,bt.rectAreaLights.value=D.state.rectArea,bt.ltc_1.value=D.state.rectAreaLTC1,bt.ltc_2.value=D.state.rectAreaLTC2,bt.pointLights.value=D.state.point,bt.pointLightShadows.value=D.state.pointShadow,bt.hemisphereLights.value=D.state.hemi,bt.directionalShadowMap.value=D.state.directionalShadowMap,bt.directionalShadowMatrix.value=D.state.directionalShadowMatrix,bt.spotShadowMap.value=D.state.spotShadowMap,bt.spotLightMatrix.value=D.state.spotLightMatrix,bt.spotLightMap.value=D.state.spotLightMap,bt.pointShadowMap.value=D.state.pointShadowMap,bt.pointShadowMatrix.value=D.state.pointShadowMatrix),k.currentProgram=Pt,k.uniformsList=null,Pt}function Ed(S){if(S.uniformsList===null){const P=S.currentProgram.getUniforms();S.uniformsList=zc.seqWithValue(P.seq,S.uniforms)}return S.uniformsList}function bd(S,P){const F=Ut.get(S);F.outputColorSpace=P.outputColorSpace,F.batching=P.batching,F.batchingColor=P.batchingColor,F.instancing=P.instancing,F.instancingColor=P.instancingColor,F.instancingMorph=P.instancingMorph,F.skinning=P.skinning,F.morphTargets=P.morphTargets,F.morphNormals=P.morphNormals,F.morphColors=P.morphColors,F.morphTargetsCount=P.morphTargetsCount,F.numClippingPlanes=P.numClippingPlanes,F.numIntersection=P.numClipIntersection,F.vertexAlphas=P.vertexAlphas,F.vertexTangents=P.vertexTangents,F.toneMapping=P.toneMapping}function gv(S,P,F,k,D){P.isScene!==!0&&(P=Xt),b.resetTextureUnits();const tt=P.fog,st=k.isMeshStandardMaterial?P.environment:null,gt=T===null?M.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:zr,vt=(k.isMeshStandardMaterial?U:y).get(k.envMap||st),Ct=k.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,Pt=!!F.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),bt=!!F.morphAttributes.position,le=!!F.morphAttributes.normal,ve=!!F.morphAttributes.color;let Le=Pr;k.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(Le=M.toneMapping);const Un=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,ie=Un!==void 0?Un.length:0,At=Ut.get(k),an=p.state.lights;if(X===!0&&(J===!0||S!==et)){const Jn=S===et&&k.id===B;Q.setState(k,S,Jn)}let re=!1;k.version===At.__version?(At.needsLights&&At.lightsStateVersion!==an.state.version||At.outputColorSpace!==gt||D.isBatchedMesh&&At.batching===!1||!D.isBatchedMesh&&At.batching===!0||D.isBatchedMesh&&At.batchingColor===!0&&D.colorTexture===null||D.isBatchedMesh&&At.batchingColor===!1&&D.colorTexture!==null||D.isInstancedMesh&&At.instancing===!1||!D.isInstancedMesh&&At.instancing===!0||D.isSkinnedMesh&&At.skinning===!1||!D.isSkinnedMesh&&At.skinning===!0||D.isInstancedMesh&&At.instancingColor===!0&&D.instanceColor===null||D.isInstancedMesh&&At.instancingColor===!1&&D.instanceColor!==null||D.isInstancedMesh&&At.instancingMorph===!0&&D.morphTexture===null||D.isInstancedMesh&&At.instancingMorph===!1&&D.morphTexture!==null||At.envMap!==vt||k.fog===!0&&At.fog!==tt||At.numClippingPlanes!==void 0&&(At.numClippingPlanes!==Q.numPlanes||At.numIntersection!==Q.numIntersection)||At.vertexAlphas!==Ct||At.vertexTangents!==Pt||At.morphTargets!==bt||At.morphNormals!==le||At.morphColors!==ve||At.toneMapping!==Le||At.morphTargetsCount!==ie)&&(re=!0):(re=!0,At.__version=k.version);let li=At.currentProgram;re===!0&&(li=Va(k,P,D));let ws=!1,Nn=!1,Gl=!1;const Ne=li.getUniforms(),dr=At.uniforms;if(Lt.useProgram(li.program)&&(ws=!0,Nn=!0,Gl=!0),k.id!==B&&(B=k.id,Nn=!0),ws||et!==S){Kt.reverseDepthBuffer?(_t.copy(S.projectionMatrix),Lx(_t),Ix(_t),Ne.setValue(w,"projectionMatrix",_t)):Ne.setValue(w,"projectionMatrix",S.projectionMatrix),Ne.setValue(w,"viewMatrix",S.matrixWorldInverse);const Jn=Ne.map.cameraPosition;Jn!==void 0&&Jn.setValue(w,Nt.setFromMatrixPosition(S.matrixWorld)),Kt.logarithmicDepthBuffer&&Ne.setValue(w,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&Ne.setValue(w,"isOrthographic",S.isOrthographicCamera===!0),et!==S&&(et=S,Nn=!0,Gl=!0)}if(D.isSkinnedMesh){Ne.setOptional(w,D,"bindMatrix"),Ne.setOptional(w,D,"bindMatrixInverse");const Jn=D.skeleton;Jn&&(Jn.boneTexture===null&&Jn.computeBoneTexture(),Ne.setValue(w,"boneTexture",Jn.boneTexture,b))}D.isBatchedMesh&&(Ne.setOptional(w,D,"batchingTexture"),Ne.setValue(w,"batchingTexture",D._matricesTexture,b),Ne.setOptional(w,D,"batchingIdTexture"),Ne.setValue(w,"batchingIdTexture",D._indirectTexture,b),Ne.setOptional(w,D,"batchingColorTexture"),D._colorsTexture!==null&&Ne.setValue(w,"batchingColorTexture",D._colorsTexture,b));const Vl=F.morphAttributes;if((Vl.position!==void 0||Vl.normal!==void 0||Vl.color!==void 0)&&Dt.update(D,F,li),(Nn||At.receiveShadow!==D.receiveShadow)&&(At.receiveShadow=D.receiveShadow,Ne.setValue(w,"receiveShadow",D.receiveShadow)),k.isMeshGouraudMaterial&&k.envMap!==null&&(dr.envMap.value=vt,dr.flipEnvMap.value=vt.isCubeTexture&&vt.isRenderTargetTexture===!1?-1:1),k.isMeshStandardMaterial&&k.envMap===null&&P.environment!==null&&(dr.envMapIntensity.value=P.environmentIntensity),Nn&&(Ne.setValue(w,"toneMappingExposure",M.toneMappingExposure),At.needsLights&&_v(dr,Gl),tt&&k.fog===!0&&it.refreshFogUniforms(dr,tt),it.refreshMaterialUniforms(dr,k,j,O,p.state.transmissionRenderTarget[S.id]),zc.upload(w,Ed(At),dr,b)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(zc.upload(w,Ed(At),dr,b),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&Ne.setValue(w,"center",D.center),Ne.setValue(w,"modelViewMatrix",D.modelViewMatrix),Ne.setValue(w,"normalMatrix",D.normalMatrix),Ne.setValue(w,"modelMatrix",D.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){const Jn=k.uniformsGroups;for(let Hl=0,xv=Jn.length;Hl<xv;Hl++){const Ad=Jn[Hl];R.update(Ad,li),R.bind(Ad,li)}}return li}function _v(S,P){S.ambientLightColor.needsUpdate=P,S.lightProbe.needsUpdate=P,S.directionalLights.needsUpdate=P,S.directionalLightShadows.needsUpdate=P,S.pointLights.needsUpdate=P,S.pointLightShadows.needsUpdate=P,S.spotLights.needsUpdate=P,S.spotLightShadows.needsUpdate=P,S.rectAreaLights.needsUpdate=P,S.hemisphereLights.needsUpdate=P}function vv(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(S,P,F){Ut.get(S.texture).__webglTexture=P,Ut.get(S.depthTexture).__webglTexture=F;const k=Ut.get(S);k.__hasExternalTextures=!0,k.__autoAllocateDepthBuffer=F===void 0,k.__autoAllocateDepthBuffer||Vt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),k.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,P){const F=Ut.get(S);F.__webglFramebuffer=P,F.__useDefaultFramebuffer=P===void 0},this.setRenderTarget=function(S,P=0,F=0){T=S,z=P,C=F;let k=!0,D=null,tt=!1,st=!1;if(S){const vt=Ut.get(S);if(vt.__useDefaultFramebuffer!==void 0)Lt.bindFramebuffer(w.FRAMEBUFFER,null),k=!1;else if(vt.__webglFramebuffer===void 0)b.setupRenderTarget(S);else if(vt.__hasExternalTextures)b.rebindTextures(S,Ut.get(S.texture).__webglTexture,Ut.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const bt=S.depthTexture;if(vt.__boundDepthTexture!==bt){if(bt!==null&&Ut.has(bt)&&(S.width!==bt.image.width||S.height!==bt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");b.setupDepthRenderbuffer(S)}}const Ct=S.texture;(Ct.isData3DTexture||Ct.isDataArrayTexture||Ct.isCompressedArrayTexture)&&(st=!0);const Pt=Ut.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Pt[P])?D=Pt[P][F]:D=Pt[P],tt=!0):S.samples>0&&b.useMultisampledRTT(S)===!1?D=Ut.get(S).__webglMultisampledFramebuffer:Array.isArray(Pt)?D=Pt[F]:D=Pt,v.copy(S.viewport),_.copy(S.scissor),N=S.scissorTest}else v.copy(lt).multiplyScalar(j).floor(),_.copy(xt).multiplyScalar(j).floor(),N=Qt;if(Lt.bindFramebuffer(w.FRAMEBUFFER,D)&&k&&Lt.drawBuffers(S,D),Lt.viewport(v),Lt.scissor(_),Lt.setScissorTest(N),tt){const vt=Ut.get(S.texture);w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_CUBE_MAP_POSITIVE_X+P,vt.__webglTexture,F)}else if(st){const vt=Ut.get(S.texture),Ct=P||0;w.framebufferTextureLayer(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,vt.__webglTexture,F||0,Ct)}B=-1},this.readRenderTargetPixels=function(S,P,F,k,D,tt,st){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let gt=Ut.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&st!==void 0&&(gt=gt[st]),gt){Lt.bindFramebuffer(w.FRAMEBUFFER,gt);try{const vt=S.texture,Ct=vt.format,Pt=vt.type;if(!Kt.textureFormatReadable(Ct)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Kt.textureTypeReadable(Pt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}P>=0&&P<=S.width-k&&F>=0&&F<=S.height-D&&w.readPixels(P,F,k,D,Ft.convert(Ct),Ft.convert(Pt),tt)}finally{const vt=T!==null?Ut.get(T).__webglFramebuffer:null;Lt.bindFramebuffer(w.FRAMEBUFFER,vt)}}},this.readRenderTargetPixelsAsync=async function(S,P,F,k,D,tt,st){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let gt=Ut.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&st!==void 0&&(gt=gt[st]),gt){const vt=S.texture,Ct=vt.format,Pt=vt.type;if(!Kt.textureFormatReadable(Ct))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Kt.textureTypeReadable(Pt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(P>=0&&P<=S.width-k&&F>=0&&F<=S.height-D){Lt.bindFramebuffer(w.FRAMEBUFFER,gt);const bt=w.createBuffer();w.bindBuffer(w.PIXEL_PACK_BUFFER,bt),w.bufferData(w.PIXEL_PACK_BUFFER,tt.byteLength,w.STREAM_READ),w.readPixels(P,F,k,D,Ft.convert(Ct),Ft.convert(Pt),0);const le=T!==null?Ut.get(T).__webglFramebuffer:null;Lt.bindFramebuffer(w.FRAMEBUFFER,le);const ve=w.fenceSync(w.SYNC_GPU_COMMANDS_COMPLETE,0);return w.flush(),await Px(w,ve,4),w.bindBuffer(w.PIXEL_PACK_BUFFER,bt),w.getBufferSubData(w.PIXEL_PACK_BUFFER,0,tt),w.deleteBuffer(bt),w.deleteSync(ve),tt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(S,P=null,F=0){S.isTexture!==!0&&(Bc("WebGLRenderer: copyFramebufferToTexture function signature has changed."),P=arguments[0]||null,S=arguments[1]);const k=Math.pow(2,-F),D=Math.floor(S.image.width*k),tt=Math.floor(S.image.height*k),st=P!==null?P.x:0,gt=P!==null?P.y:0;b.setTexture2D(S,0),w.copyTexSubImage2D(w.TEXTURE_2D,F,0,0,st,gt,D,tt),Lt.unbindTexture()},this.copyTextureToTexture=function(S,P,F=null,k=null,D=0){S.isTexture!==!0&&(Bc("WebGLRenderer: copyTextureToTexture function signature has changed."),k=arguments[0]||null,S=arguments[1],P=arguments[2],D=arguments[3]||0,F=null);let tt,st,gt,vt,Ct,Pt;F!==null?(tt=F.max.x-F.min.x,st=F.max.y-F.min.y,gt=F.min.x,vt=F.min.y):(tt=S.image.width,st=S.image.height,gt=0,vt=0),k!==null?(Ct=k.x,Pt=k.y):(Ct=0,Pt=0);const bt=Ft.convert(P.format),le=Ft.convert(P.type);b.setTexture2D(P,0),w.pixelStorei(w.UNPACK_FLIP_Y_WEBGL,P.flipY),w.pixelStorei(w.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),w.pixelStorei(w.UNPACK_ALIGNMENT,P.unpackAlignment);const ve=w.getParameter(w.UNPACK_ROW_LENGTH),Le=w.getParameter(w.UNPACK_IMAGE_HEIGHT),Un=w.getParameter(w.UNPACK_SKIP_PIXELS),ie=w.getParameter(w.UNPACK_SKIP_ROWS),At=w.getParameter(w.UNPACK_SKIP_IMAGES),an=S.isCompressedTexture?S.mipmaps[D]:S.image;w.pixelStorei(w.UNPACK_ROW_LENGTH,an.width),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,an.height),w.pixelStorei(w.UNPACK_SKIP_PIXELS,gt),w.pixelStorei(w.UNPACK_SKIP_ROWS,vt),S.isDataTexture?w.texSubImage2D(w.TEXTURE_2D,D,Ct,Pt,tt,st,bt,le,an.data):S.isCompressedTexture?w.compressedTexSubImage2D(w.TEXTURE_2D,D,Ct,Pt,an.width,an.height,bt,an.data):w.texSubImage2D(w.TEXTURE_2D,D,Ct,Pt,tt,st,bt,le,an),w.pixelStorei(w.UNPACK_ROW_LENGTH,ve),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,Le),w.pixelStorei(w.UNPACK_SKIP_PIXELS,Un),w.pixelStorei(w.UNPACK_SKIP_ROWS,ie),w.pixelStorei(w.UNPACK_SKIP_IMAGES,At),D===0&&P.generateMipmaps&&w.generateMipmap(w.TEXTURE_2D),Lt.unbindTexture()},this.copyTextureToTexture3D=function(S,P,F=null,k=null,D=0){S.isTexture!==!0&&(Bc("WebGLRenderer: copyTextureToTexture3D function signature has changed."),F=arguments[0]||null,k=arguments[1]||null,S=arguments[2],P=arguments[3],D=arguments[4]||0);let tt,st,gt,vt,Ct,Pt,bt,le,ve;const Le=S.isCompressedTexture?S.mipmaps[D]:S.image;F!==null?(tt=F.max.x-F.min.x,st=F.max.y-F.min.y,gt=F.max.z-F.min.z,vt=F.min.x,Ct=F.min.y,Pt=F.min.z):(tt=Le.width,st=Le.height,gt=Le.depth,vt=0,Ct=0,Pt=0),k!==null?(bt=k.x,le=k.y,ve=k.z):(bt=0,le=0,ve=0);const Un=Ft.convert(P.format),ie=Ft.convert(P.type);let At;if(P.isData3DTexture)b.setTexture3D(P,0),At=w.TEXTURE_3D;else if(P.isDataArrayTexture||P.isCompressedArrayTexture)b.setTexture2DArray(P,0),At=w.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}w.pixelStorei(w.UNPACK_FLIP_Y_WEBGL,P.flipY),w.pixelStorei(w.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),w.pixelStorei(w.UNPACK_ALIGNMENT,P.unpackAlignment);const an=w.getParameter(w.UNPACK_ROW_LENGTH),re=w.getParameter(w.UNPACK_IMAGE_HEIGHT),li=w.getParameter(w.UNPACK_SKIP_PIXELS),ws=w.getParameter(w.UNPACK_SKIP_ROWS),Nn=w.getParameter(w.UNPACK_SKIP_IMAGES);w.pixelStorei(w.UNPACK_ROW_LENGTH,Le.width),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,Le.height),w.pixelStorei(w.UNPACK_SKIP_PIXELS,vt),w.pixelStorei(w.UNPACK_SKIP_ROWS,Ct),w.pixelStorei(w.UNPACK_SKIP_IMAGES,Pt),S.isDataTexture||S.isData3DTexture?w.texSubImage3D(At,D,bt,le,ve,tt,st,gt,Un,ie,Le.data):P.isCompressedArrayTexture?w.compressedTexSubImage3D(At,D,bt,le,ve,tt,st,gt,Un,Le.data):w.texSubImage3D(At,D,bt,le,ve,tt,st,gt,Un,ie,Le),w.pixelStorei(w.UNPACK_ROW_LENGTH,an),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,re),w.pixelStorei(w.UNPACK_SKIP_PIXELS,li),w.pixelStorei(w.UNPACK_SKIP_ROWS,ws),w.pixelStorei(w.UNPACK_SKIP_IMAGES,Nn),D===0&&P.generateMipmaps&&w.generateMipmap(At),Lt.unbindTexture()},this.initRenderTarget=function(S){Ut.get(S).__webglFramebuffer===void 0&&b.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?b.setTextureCube(S,0):S.isData3DTexture?b.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?b.setTexture2DArray(S,0):b.setTexture2D(S,0),Lt.unbindTexture()},this.resetState=function(){z=0,C=0,T=null,Lt.reset(),me.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return nr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const n=this.getContext();n.drawingBufferColorSpace=t===vf?"display-p3":"srgb",n.unpackColorSpace=se.workingColorSpace===dl?"display-p3":"srgb"}}class HE extends Sn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ar,this.environmentIntensity=1,this.environmentRotation=new ar,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}class WE{constructor(t,n){this.isInterleavedBuffer=!0,this.array=t,this.stride=n,this.count=t!==void 0?t.length/n:0,this.usage=Ch,this.updateRanges=[],this.version=0,this.uuid=sr()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,n,i){t*=this.stride,i*=n.stride;for(let r=0,s=this.stride;r<s;r++)this.array[t+r]=n.array[i+r];return this}set(t,n=0){return this.array.set(t,n),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=sr()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const n=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(n,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=sr()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const _n=new I;class Zc{constructor(t,n,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=n,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let n=0,i=this.data.count;n<i;n++)_n.fromBufferAttribute(this,n),_n.applyMatrix4(t),this.setXYZ(n,_n.x,_n.y,_n.z);return this}applyNormalMatrix(t){for(let n=0,i=this.count;n<i;n++)_n.fromBufferAttribute(this,n),_n.applyNormalMatrix(t),this.setXYZ(n,_n.x,_n.y,_n.z);return this}transformDirection(t){for(let n=0,i=this.count;n<i;n++)_n.fromBufferAttribute(this,n),_n.transformDirection(t),this.setXYZ(n,_n.x,_n.y,_n.z);return this}getComponent(t,n){let i=this.array[t*this.data.stride+this.offset+n];return this.normalized&&(i=Ii(i,this.array)),i}setComponent(t,n,i){return this.normalized&&(i=fe(i,this.array)),this.data.array[t*this.data.stride+this.offset+n]=i,this}setX(t,n){return this.normalized&&(n=fe(n,this.array)),this.data.array[t*this.data.stride+this.offset]=n,this}setY(t,n){return this.normalized&&(n=fe(n,this.array)),this.data.array[t*this.data.stride+this.offset+1]=n,this}setZ(t,n){return this.normalized&&(n=fe(n,this.array)),this.data.array[t*this.data.stride+this.offset+2]=n,this}setW(t,n){return this.normalized&&(n=fe(n,this.array)),this.data.array[t*this.data.stride+this.offset+3]=n,this}getX(t){let n=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(n=Ii(n,this.array)),n}getY(t){let n=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(n=Ii(n,this.array)),n}getZ(t){let n=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(n=Ii(n,this.array)),n}getW(t){let n=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(n=Ii(n,this.array)),n}setXY(t,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(n=fe(n,this.array),i=fe(i,this.array)),this.data.array[t+0]=n,this.data.array[t+1]=i,this}setXYZ(t,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(n=fe(n,this.array),i=fe(i,this.array),r=fe(r,this.array)),this.data.array[t+0]=n,this.data.array[t+1]=i,this.data.array[t+2]=r,this}setXYZW(t,n,i,r,s){return t=t*this.data.stride+this.offset,this.normalized&&(n=fe(n,this.array),i=fe(i,this.array),r=fe(r,this.array),s=fe(s,this.array)),this.data.array[t+0]=n,this.data.array[t+1]=i,this.data.array[t+2]=r,this.data.array[t+3]=s,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const n=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)n.push(this.data.array[r+s])}return new yi(new this.array.constructor(n),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Zc(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const n=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)n.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:n,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class r0 extends Po{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new oe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Hs;const Ko=new I,Ws=new I,Xs=new I,$s=new mt,jo=new mt,s0=new Re,hc=new I,Zo=new I,fc=new I,Pp=new mt,Eu=new mt,Lp=new mt;class XE extends Sn{constructor(t=new r0){if(super(),this.isSprite=!0,this.type="Sprite",Hs===void 0){Hs=new Ln;const n=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new WE(n,5);Hs.setIndex([0,1,2,0,2,3]),Hs.setAttribute("position",new Zc(i,3,0,!1)),Hs.setAttribute("uv",new Zc(i,2,3,!1))}this.geometry=Hs,this.material=t,this.center=new mt(.5,.5)}raycast(t,n){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ws.setFromMatrixScale(this.matrixWorld),s0.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Xs.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ws.multiplyScalar(-Xs.z);const i=this.material.rotation;let r,s;i!==0&&(s=Math.cos(i),r=Math.sin(i));const o=this.center;dc(hc.set(-.5,-.5,0),Xs,o,Ws,r,s),dc(Zo.set(.5,-.5,0),Xs,o,Ws,r,s),dc(fc.set(.5,.5,0),Xs,o,Ws,r,s),Pp.set(0,0),Eu.set(1,0),Lp.set(1,1);let a=t.ray.intersectTriangle(hc,Zo,fc,!1,Ko);if(a===null&&(dc(Zo.set(-.5,.5,0),Xs,o,Ws,r,s),Eu.set(0,1),a=t.ray.intersectTriangle(hc,fc,Zo,!1,Ko),a===null))return;const c=t.ray.origin.distanceTo(Ko);c<t.near||c>t.far||n.push({distance:c,point:Ko.clone(),uv:ri.getInterpolation(Ko,hc,Zo,fc,Pp,Eu,Lp,new mt),face:null,object:this})}copy(t,n){return super.copy(t,n),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function dc(e,t,n,i,r,s){$s.subVectors(e,n).addScalar(.5).multiply(i),r!==void 0?(jo.x=s*$s.x-r*$s.y,jo.y=r*$s.x+s*$s.y):jo.copy($s),e.copy(t),e.x+=jo.x,e.y+=jo.y,e.applyMatrix4(s0)}class o0 extends Po{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new oe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Jc=new I,Qc=new I,Ip=new Re,Jo=new Vg,pc=new pl,bu=new I,Dp=new I;class $E extends Sn{constructor(t=new Ln,n=new o0){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=n,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const n=t.attributes.position,i=[0];for(let r=1,s=n.count;r<s;r++)Jc.fromBufferAttribute(n,r-1),Qc.fromBufferAttribute(n,r),i[r]=i[r-1],i[r]+=Jc.distanceTo(Qc);t.setAttribute("lineDistance",new Xe(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,n){const i=this.geometry,r=this.matrixWorld,s=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),pc.copy(i.boundingSphere),pc.applyMatrix4(r),pc.radius+=s,t.ray.intersectsSphere(pc)===!1)return;Ip.copy(r).invert(),Jo.copy(t.ray).applyMatrix4(Ip);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,u=i.index,f=i.attributes.position;if(u!==null){const d=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let x=d,p=g-1;x<p;x+=l){const m=u.getX(x),A=u.getX(x+1),M=mc(this,t,Jo,c,m,A);M&&n.push(M)}if(this.isLineLoop){const x=u.getX(g-1),p=u.getX(d),m=mc(this,t,Jo,c,x,p);m&&n.push(m)}}else{const d=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let x=d,p=g-1;x<p;x+=l){const m=mc(this,t,Jo,c,x,x+1);m&&n.push(m)}if(this.isLineLoop){const x=mc(this,t,Jo,c,g-1,d);x&&n.push(x)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function mc(e,t,n,i,r,s){const o=e.geometry.attributes.position;if(Jc.fromBufferAttribute(o,r),Qc.fromBufferAttribute(o,s),n.distanceSqToSegment(Jc,Qc,bu,Dp)>i)return;bu.applyMatrix4(e.matrixWorld);const c=t.ray.origin.distanceTo(bu);if(!(c<t.near||c>t.far))return{distance:c,point:Dp.clone().applyMatrix4(e.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:e}}const Up=new I,Np=new I;class qE extends $E{constructor(t,n){super(t,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const n=t.attributes.position,i=[];for(let r=0,s=n.count;r<s;r+=2)Up.fromBufferAttribute(n,r),Np.fromBufferAttribute(n,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Up.distanceTo(Np);t.setAttribute("lineDistance",new Xe(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class YE extends yn{constructor(t,n,i,r,s,o,a,c,l){super(t,n,i,r,s,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Bi{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,n){const i=this.getUtoTmapping(t);return this.getPoint(i,n)}getPoints(t=5){const n=[];for(let i=0;i<=t;i++)n.push(this.getPoint(i/t));return n}getSpacedPoints(t=5){const n=[];for(let i=0;i<=t;i++)n.push(this.getPointAt(i/t));return n}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const n=[];let i,r=this.getPoint(0),s=0;n.push(0);for(let o=1;o<=t;o++)i=this.getPoint(o/t),s+=i.distanceTo(r),n.push(s),r=i;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,n){const i=this.getLengths();let r=0;const s=i.length;let o;n?o=n:o=t*i[s-1];let a=0,c=s-1,l;for(;a<=c;)if(r=Math.floor(a+(c-a)/2),l=i[r]-o,l<0)a=r+1;else if(l>0)c=r-1;else{c=r;break}if(r=c,i[r]===o)return r/(s-1);const u=i[r],f=i[r+1]-u,d=(o-u)/f;return(r+d)/(s-1)}getTangent(t,n){let r=t-1e-4,s=t+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),c=n||(o.isVector2?new mt:new I);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,n){const i=this.getUtoTmapping(t);return this.getTangent(i,n)}computeFrenetFrames(t,n){const i=new I,r=[],s=[],o=[],a=new I,c=new Re;for(let d=0;d<=t;d++){const g=d/t;r[d]=this.getTangentAt(g,new I)}s[0]=new I,o[0]=new I;let l=Number.MAX_VALUE;const u=Math.abs(r[0].x),h=Math.abs(r[0].y),f=Math.abs(r[0].z);u<=l&&(l=u,i.set(1,0,0)),h<=l&&(l=h,i.set(0,1,0)),f<=l&&i.set(0,0,1),a.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let d=1;d<=t;d++){if(s[d]=s[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(r[d-1],r[d]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(fn(r[d-1].dot(r[d]),-1,1));s[d].applyMatrix4(c.makeRotationAxis(a,g))}o[d].crossVectors(r[d],s[d])}if(n===!0){let d=Math.acos(fn(s[0].dot(s[t]),-1,1));d/=t,r[0].dot(a.crossVectors(s[0],s[t]))>0&&(d=-d);for(let g=1;g<=t;g++)s[g].applyMatrix4(c.makeRotationAxis(r[g],d*g)),o[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class yf extends Bi{constructor(t=0,n=0,i=1,r=1,s=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=n,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,n=new mt){const i=n,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);const a=this.aStartAngle+t*s;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=c-this.aX,d=l-this.aY;c=f*u-d*h+this.aX,l=f*h+d*u+this.aY}return i.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class KE extends yf{constructor(t,n,i,r,s,o){super(t,n,i,i,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Sf(){let e=0,t=0,n=0,i=0;function r(s,o,a,c){e=s,t=a,n=-3*s+3*o-2*a-c,i=2*s-2*o+a+c}return{initCatmullRom:function(s,o,a,c,l){r(o,a,l*(a-s),l*(c-o))},initNonuniformCatmullRom:function(s,o,a,c,l,u,h){let f=(o-s)/l-(a-s)/(l+u)+(a-o)/u,d=(a-o)/u-(c-o)/(u+h)+(c-a)/h;f*=u,d*=u,r(o,a,f,d)},calc:function(s){const o=s*s,a=o*s;return e+t*s+n*o+i*a}}}const gc=new I,Au=new Sf,Tu=new Sf,wu=new Sf;class jE extends Bi{constructor(t=[],n=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=n,this.curveType=i,this.tension=r}getPoint(t,n=new I){const i=n,r=this.points,s=r.length,o=(s-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:c===0&&a===s-1&&(a=s-2,c=1);let l,u;this.closed||a>0?l=r[(a-1)%s]:(gc.subVectors(r[0],r[1]).add(r[0]),l=gc);const h=r[a%s],f=r[(a+1)%s];if(this.closed||a+2<s?u=r[(a+2)%s]:(gc.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=gc),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(h),d),x=Math.pow(h.distanceToSquared(f),d),p=Math.pow(f.distanceToSquared(u),d);x<1e-4&&(x=1),g<1e-4&&(g=x),p<1e-4&&(p=x),Au.initNonuniformCatmullRom(l.x,h.x,f.x,u.x,g,x,p),Tu.initNonuniformCatmullRom(l.y,h.y,f.y,u.y,g,x,p),wu.initNonuniformCatmullRom(l.z,h.z,f.z,u.z,g,x,p)}else this.curveType==="catmullrom"&&(Au.initCatmullRom(l.x,h.x,f.x,u.x,this.tension),Tu.initCatmullRom(l.y,h.y,f.y,u.y,this.tension),wu.initCatmullRom(l.z,h.z,f.z,u.z,this.tension));return i.set(Au.calc(c),Tu.calc(c),wu.calc(c)),i}copy(t){super.copy(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){const r=t.points[n];this.points.push(r.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let n=0,i=this.points.length;n<i;n++){const r=this.points[n];t.points.push(r.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){const r=t.points[n];this.points.push(new I().fromArray(r))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Fp(e,t,n,i,r){const s=(i-t)*.5,o=(r-n)*.5,a=e*e,c=e*a;return(2*n-2*i+s+o)*c+(-3*n+3*i-2*s-o)*a+s*e+n}function ZE(e,t){const n=1-e;return n*n*t}function JE(e,t){return 2*(1-e)*e*t}function QE(e,t){return e*e*t}function aa(e,t,n,i){return ZE(e,t)+JE(e,n)+QE(e,i)}function tb(e,t){const n=1-e;return n*n*n*t}function eb(e,t){const n=1-e;return 3*n*n*e*t}function nb(e,t){return 3*(1-e)*e*e*t}function ib(e,t){return e*e*e*t}function ca(e,t,n,i,r){return tb(e,t)+eb(e,n)+nb(e,i)+ib(e,r)}class a0 extends Bi{constructor(t=new mt,n=new mt,i=new mt,r=new mt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=n,this.v2=i,this.v3=r}getPoint(t,n=new mt){const i=n,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(ca(t,r.x,s.x,o.x,a.x),ca(t,r.y,s.y,o.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class rb extends Bi{constructor(t=new I,n=new I,i=new I,r=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=n,this.v2=i,this.v3=r}getPoint(t,n=new I){const i=n,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(ca(t,r.x,s.x,o.x,a.x),ca(t,r.y,s.y,o.y,a.y),ca(t,r.z,s.z,o.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class c0 extends Bi{constructor(t=new mt,n=new mt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=n}getPoint(t,n=new mt){const i=n;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,n){return this.getPoint(t,n)}getTangent(t,n=new mt){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,n){return this.getTangent(t,n)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class sb extends Bi{constructor(t=new I,n=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=n}getPoint(t,n=new I){const i=n;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,n){return this.getPoint(t,n)}getTangent(t,n=new I){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,n){return this.getTangent(t,n)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class l0 extends Bi{constructor(t=new mt,n=new mt,i=new mt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=n,this.v2=i}getPoint(t,n=new mt){const i=n,r=this.v0,s=this.v1,o=this.v2;return i.set(aa(t,r.x,s.x,o.x),aa(t,r.y,s.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class ob extends Bi{constructor(t=new I,n=new I,i=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=n,this.v2=i}getPoint(t,n=new I){const i=n,r=this.v0,s=this.v1,o=this.v2;return i.set(aa(t,r.x,s.x,o.x),aa(t,r.y,s.y,o.y),aa(t,r.z,s.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class u0 extends Bi{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,n=new mt){const i=n,r=this.points,s=(r.length-1)*t,o=Math.floor(s),a=s-o,c=r[o===0?o:o-1],l=r[o],u=r[o>r.length-2?r.length-1:o+1],h=r[o>r.length-3?r.length-1:o+2];return i.set(Fp(a,c.x,l.x,u.x,h.x),Fp(a,c.y,l.y,u.y,h.y)),i}copy(t){super.copy(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){const r=t.points[n];this.points.push(r.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let n=0,i=this.points.length;n<i;n++){const r=this.points[n];t.points.push(r.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){const r=t.points[n];this.points.push(new mt().fromArray(r))}return this}}var Op=Object.freeze({__proto__:null,ArcCurve:KE,CatmullRomCurve3:jE,CubicBezierCurve:a0,CubicBezierCurve3:rb,EllipseCurve:yf,LineCurve:c0,LineCurve3:sb,QuadraticBezierCurve:l0,QuadraticBezierCurve3:ob,SplineCurve:u0});class ab extends Bi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),n=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(n)){const i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Op[i](n,t))}return this}getPoint(t,n){const i=t*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=i){const o=r[s]-i,a=this.curves[s],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,n)}s++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let n=0;for(let i=0,r=this.curves.length;i<r;i++)n+=this.curves[i].getLength(),t.push(n);return this.cacheLengths=t,t}getSpacedPoints(t=40){const n=[];for(let i=0;i<=t;i++)n.push(this.getPoint(i/t));return this.autoClose&&n.push(n[0]),n}getPoints(t=12){const n=[];let i;for(let r=0,s=this.curves;r<s.length;r++){const o=s[r],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){const u=c[l];i&&i.equals(u)||(n.push(u),i=u)}}return this.autoClose&&n.length>1&&!n[n.length-1].equals(n[0])&&n.push(n[0]),n}copy(t){super.copy(t),this.curves=[];for(let n=0,i=t.curves.length;n<i;n++){const r=t.curves[n];this.curves.push(r.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let n=0,i=this.curves.length;n<i;n++){const r=this.curves[n];t.curves.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let n=0,i=t.curves.length;n<i;n++){const r=t.curves[n];this.curves.push(new Op[r.type]().fromJSON(r))}return this}}class kp extends ab{constructor(t){super(),this.type="Path",this.currentPoint=new mt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let n=1,i=t.length;n<i;n++)this.lineTo(t[n].x,t[n].y);return this}moveTo(t,n){return this.currentPoint.set(t,n),this}lineTo(t,n){const i=new c0(this.currentPoint.clone(),new mt(t,n));return this.curves.push(i),this.currentPoint.set(t,n),this}quadraticCurveTo(t,n,i,r){const s=new l0(this.currentPoint.clone(),new mt(t,n),new mt(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(t,n,i,r,s,o){const a=new a0(this.currentPoint.clone(),new mt(t,n),new mt(i,r),new mt(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(t){const n=[this.currentPoint.clone()].concat(t),i=new u0(n);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,n,i,r,s,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,n+c,i,r,s,o),this}absarc(t,n,i,r,s,o){return this.absellipse(t,n,i,i,r,s,o),this}ellipse(t,n,i,r,s,o,a,c){const l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+l,n+u,i,r,s,o,a,c),this}absellipse(t,n,i,r,s,o,a,c){const l=new yf(t,n,i,r,s,o,a,c);if(this.curves.length>0){const h=l.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(l);const u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class ss extends Ln{constructor(t=1,n=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:n,thetaStart:i,thetaLength:r},n=Math.max(3,n);const s=[],o=[],a=[],c=[],l=new I,u=new mt;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let h=0,f=3;h<=n;h++,f+=3){const d=i+h/n*r;l.x=t*Math.cos(d),l.y=t*Math.sin(d),o.push(l.x,l.y,l.z),a.push(0,0,1),u.x=(o[f]/t+1)/2,u.y=(o[f+1]/t+1)/2,c.push(u.x,u.y)}for(let h=1;h<=n;h++)s.push(h,h+1,0);this.setIndex(s),this.setAttribute("position",new Xe(o,3)),this.setAttribute("normal",new Xe(a,3)),this.setAttribute("uv",new Xe(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ss(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Gc extends kp{constructor(t){super(t),this.uuid=sr(),this.type="Shape",this.holes=[]}getPointsHoles(t){const n=[];for(let i=0,r=this.holes.length;i<r;i++)n[i]=this.holes[i].getPoints(t);return n}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let n=0,i=t.holes.length;n<i;n++){const r=t.holes[n];this.holes.push(r.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let n=0,i=this.holes.length;n<i;n++){const r=this.holes[n];t.holes.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let n=0,i=t.holes.length;n<i;n++){const r=t.holes[n];this.holes.push(new kp().fromJSON(r))}return this}}const cb={triangulate:function(e,t,n=2){const i=t&&t.length,r=i?t[0]*n:e.length;let s=h0(e,0,r,n,!0);const o=[];if(!s||s.next===s.prev)return o;let a,c,l,u,h,f,d;if(i&&(s=db(e,t,s,n)),e.length>80*n){a=l=e[0],c=u=e[1];for(let g=n;g<r;g+=n)h=e[g],f=e[g+1],h<a&&(a=h),f<c&&(c=f),h>l&&(l=h),f>u&&(u=f);d=Math.max(l-a,u-c),d=d!==0?32767/d:0}return xa(s,o,n,a,c,d,0),o}};function h0(e,t,n,i,r){let s,o;if(r===bb(e,t,n,i)>0)for(s=t;s<n;s+=i)o=Bp(s,e[s],e[s+1],o);else for(s=n-i;s>=t;s-=i)o=Bp(s,e[s],e[s+1],o);return o&&gl(o,o.next)&&(Sa(o),o=o.next),o}function ys(e,t){if(!e)return e;t||(t=e);let n=e,i;do if(i=!1,!n.steiner&&(gl(n,n.next)||Te(n.prev,n,n.next)===0)){if(Sa(n),n=t=n.prev,n===n.next)break;i=!0}else n=n.next;while(i||n!==t);return t}function xa(e,t,n,i,r,s,o){if(!e)return;!o&&s&&vb(e,i,r,s);let a=e,c,l;for(;e.prev!==e.next;){if(c=e.prev,l=e.next,s?ub(e,i,r,s):lb(e)){t.push(c.i/n|0),t.push(e.i/n|0),t.push(l.i/n|0),Sa(e),e=l.next,a=l.next;continue}if(e=l,e===a){o?o===1?(e=hb(ys(e),t,n),xa(e,t,n,i,r,s,2)):o===2&&fb(e,t,n,i,r,s):xa(ys(e),t,n,i,r,s,1);break}}}function lb(e){const t=e.prev,n=e,i=e.next;if(Te(t,n,i)>=0)return!1;const r=t.x,s=n.x,o=i.x,a=t.y,c=n.y,l=i.y,u=r<s?r<o?r:o:s<o?s:o,h=a<c?a<l?a:l:c<l?c:l,f=r>s?r>o?r:o:s>o?s:o,d=a>c?a>l?a:l:c>l?c:l;let g=i.next;for(;g!==t;){if(g.x>=u&&g.x<=f&&g.y>=h&&g.y<=d&&Js(r,a,s,c,o,l,g.x,g.y)&&Te(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function ub(e,t,n,i){const r=e.prev,s=e,o=e.next;if(Te(r,s,o)>=0)return!1;const a=r.x,c=s.x,l=o.x,u=r.y,h=s.y,f=o.y,d=a<c?a<l?a:l:c<l?c:l,g=u<h?u<f?u:f:h<f?h:f,x=a>c?a>l?a:l:c>l?c:l,p=u>h?u>f?u:f:h>f?h:f,m=Lh(d,g,t,n,i),A=Lh(x,p,t,n,i);let M=e.prevZ,E=e.nextZ;for(;M&&M.z>=m&&E&&E.z<=A;){if(M.x>=d&&M.x<=x&&M.y>=g&&M.y<=p&&M!==r&&M!==o&&Js(a,u,c,h,l,f,M.x,M.y)&&Te(M.prev,M,M.next)>=0||(M=M.prevZ,E.x>=d&&E.x<=x&&E.y>=g&&E.y<=p&&E!==r&&E!==o&&Js(a,u,c,h,l,f,E.x,E.y)&&Te(E.prev,E,E.next)>=0))return!1;E=E.nextZ}for(;M&&M.z>=m;){if(M.x>=d&&M.x<=x&&M.y>=g&&M.y<=p&&M!==r&&M!==o&&Js(a,u,c,h,l,f,M.x,M.y)&&Te(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;E&&E.z<=A;){if(E.x>=d&&E.x<=x&&E.y>=g&&E.y<=p&&E!==r&&E!==o&&Js(a,u,c,h,l,f,E.x,E.y)&&Te(E.prev,E,E.next)>=0)return!1;E=E.nextZ}return!0}function hb(e,t,n){let i=e;do{const r=i.prev,s=i.next.next;!gl(r,s)&&f0(r,i,i.next,s)&&ya(r,s)&&ya(s,r)&&(t.push(r.i/n|0),t.push(i.i/n|0),t.push(s.i/n|0),Sa(i),Sa(i.next),i=e=s),i=i.next}while(i!==e);return ys(i)}function fb(e,t,n,i,r,s){let o=e;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Sb(o,a)){let c=d0(o,a);o=ys(o,o.next),c=ys(c,c.next),xa(o,t,n,i,r,s,0),xa(c,t,n,i,r,s,0);return}a=a.next}o=o.next}while(o!==e)}function db(e,t,n,i){const r=[];let s,o,a,c,l;for(s=0,o=t.length;s<o;s++)a=t[s]*i,c=s<o-1?t[s+1]*i:e.length,l=h0(e,a,c,i,!1),l===l.next&&(l.steiner=!0),r.push(yb(l));for(r.sort(pb),s=0;s<r.length;s++)n=mb(r[s],n);return n}function pb(e,t){return e.x-t.x}function mb(e,t){const n=gb(e,t);if(!n)return t;const i=d0(n,e);return ys(i,i.next),ys(n,n.next)}function gb(e,t){let n=t,i=-1/0,r;const s=e.x,o=e.y;do{if(o<=n.y&&o>=n.next.y&&n.next.y!==n.y){const f=n.x+(o-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(f<=s&&f>i&&(i=f,r=n.x<n.next.x?n:n.next,f===s))return r}n=n.next}while(n!==t);if(!r)return null;const a=r,c=r.x,l=r.y;let u=1/0,h;n=r;do s>=n.x&&n.x>=c&&s!==n.x&&Js(o<l?s:i,o,c,l,o<l?i:s,o,n.x,n.y)&&(h=Math.abs(o-n.y)/(s-n.x),ya(n,e)&&(h<u||h===u&&(n.x>r.x||n.x===r.x&&_b(r,n)))&&(r=n,u=h)),n=n.next;while(n!==a);return r}function _b(e,t){return Te(e.prev,e,t.prev)<0&&Te(t.next,e,e.next)<0}function vb(e,t,n,i){let r=e;do r.z===0&&(r.z=Lh(r.x,r.y,t,n,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==e);r.prevZ.nextZ=null,r.prevZ=null,xb(r)}function xb(e){let t,n,i,r,s,o,a,c,l=1;do{for(n=e,e=null,s=null,o=0;n;){for(o++,i=n,a=0,t=0;t<l&&(a++,i=i.nextZ,!!i);t++);for(c=l;a>0||c>0&&i;)a!==0&&(c===0||!i||n.z<=i.z)?(r=n,n=n.nextZ,a--):(r=i,i=i.nextZ,c--),s?s.nextZ=r:e=r,r.prevZ=s,s=r;n=i}s.nextZ=null,l*=2}while(o>1);return e}function Lh(e,t,n,i,r){return e=(e-n)*r|0,t=(t-i)*r|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function yb(e){let t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function Js(e,t,n,i,r,s,o,a){return(r-o)*(t-a)>=(e-o)*(s-a)&&(e-o)*(i-a)>=(n-o)*(t-a)&&(n-o)*(s-a)>=(r-o)*(i-a)}function Sb(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!Mb(e,t)&&(ya(e,t)&&ya(t,e)&&Eb(e,t)&&(Te(e.prev,e,t.prev)||Te(e,t.prev,t))||gl(e,t)&&Te(e.prev,e,e.next)>0&&Te(t.prev,t,t.next)>0)}function Te(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function gl(e,t){return e.x===t.x&&e.y===t.y}function f0(e,t,n,i){const r=vc(Te(e,t,n)),s=vc(Te(e,t,i)),o=vc(Te(n,i,e)),a=vc(Te(n,i,t));return!!(r!==s&&o!==a||r===0&&_c(e,n,t)||s===0&&_c(e,i,t)||o===0&&_c(n,e,i)||a===0&&_c(n,t,i))}function _c(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function vc(e){return e>0?1:e<0?-1:0}function Mb(e,t){let n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&f0(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function ya(e,t){return Te(e.prev,e,e.next)<0?Te(e,t,e.next)>=0&&Te(e,e.prev,t)>=0:Te(e,t,e.prev)<0||Te(e,e.next,t)<0}function Eb(e,t){let n=e,i=!1;const r=(e.x+t.x)/2,s=(e.y+t.y)/2;do n.y>s!=n.next.y>s&&n.next.y!==n.y&&r<(n.next.x-n.x)*(s-n.y)/(n.next.y-n.y)+n.x&&(i=!i),n=n.next;while(n!==e);return i}function d0(e,t){const n=new Ih(e.i,e.x,e.y),i=new Ih(t.i,t.x,t.y),r=e.next,s=t.prev;return e.next=t,t.prev=e,n.next=r,r.prev=n,i.next=n,n.prev=i,s.next=i,i.prev=s,i}function Bp(e,t,n,i){const r=new Ih(e,t,n);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function Sa(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function Ih(e,t,n){this.i=e,this.x=t,this.y=n,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function bb(e,t,n,i){let r=0;for(let s=t,o=n-i;s<n;s+=i)r+=(e[o]-e[s])*(e[s+1]+e[o+1]),o=s;return r}class la{static area(t){const n=t.length;let i=0;for(let r=n-1,s=0;s<n;r=s++)i+=t[r].x*t[s].y-t[s].x*t[r].y;return i*.5}static isClockWise(t){return la.area(t)<0}static triangulateShape(t,n){const i=[],r=[],s=[];zp(t),Gp(i,t);let o=t.length;n.forEach(zp);for(let c=0;c<n.length;c++)r.push(o),o+=n[c].length,Gp(i,n[c]);const a=cb.triangulate(i,r);for(let c=0;c<a.length;c+=3)s.push(a.slice(c,c+3));return s}}function zp(e){const t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}function Gp(e,t){for(let n=0;n<t.length;n++)e.push(t[n].x),e.push(t[n].y)}class Tr extends Ln{constructor(t=.5,n=1,i=32,r=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:n,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:o},i=Math.max(3,i),r=Math.max(1,r);const a=[],c=[],l=[],u=[];let h=t;const f=(n-t)/r,d=new I,g=new mt;for(let x=0;x<=r;x++){for(let p=0;p<=i;p++){const m=s+p/i*o;d.x=h*Math.cos(m),d.y=h*Math.sin(m),c.push(d.x,d.y,d.z),l.push(0,0,1),g.x=(d.x/n+1)/2,g.y=(d.y/n+1)/2,u.push(g.x,g.y)}h+=f}for(let x=0;x<r;x++){const p=x*(i+1);for(let m=0;m<i;m++){const A=m+p,M=A,E=A+i+1,z=A+i+2,C=A+1;a.push(M,E,C),a.push(E,z,C)}}this.setIndex(a),this.setAttribute("position",new Xe(c,3)),this.setAttribute("normal",new Xe(l,3)),this.setAttribute("uv",new Xe(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Tr(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class ua extends Ln{constructor(t=new Gc([new mt(0,.5),new mt(-.5,-.5),new mt(.5,-.5)]),n=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:n};const i=[],r=[],s=[],o=[];let a=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let u=0;u<t.length;u++)l(t[u]),this.addGroup(a,c,u),a+=c,c=0;this.setIndex(i),this.setAttribute("position",new Xe(r,3)),this.setAttribute("normal",new Xe(s,3)),this.setAttribute("uv",new Xe(o,2));function l(u){const h=r.length/3,f=u.extractPoints(n);let d=f.shape;const g=f.holes;la.isClockWise(d)===!1&&(d=d.reverse());for(let p=0,m=g.length;p<m;p++){const A=g[p];la.isClockWise(A)===!0&&(g[p]=A.reverse())}const x=la.triangulateShape(d,g);for(let p=0,m=g.length;p<m;p++){const A=g[p];d=d.concat(A)}for(let p=0,m=d.length;p<m;p++){const A=d[p];r.push(A.x,A.y,0),s.push(0,0,1),o.push(A.x,A.y)}for(let p=0,m=x.length;p<m;p++){const A=x[p],M=A[0]+h,E=A[1]+h,z=A[2]+h;i.push(M,E,z),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),n=this.parameters.shapes;return Ab(n,t)}static fromJSON(t,n){const i=[];for(let r=0,s=t.shapes.length;r<s;r++){const o=n[t.shapes[r]];i.push(o)}return new ua(i,t.curveSegments)}}function Ab(e,t){if(t.shapes=[],Array.isArray(e))for(let n=0,i=e.length;n<i;n++){const r=e[n];t.shapes.push(r.uuid)}else t.shapes.push(e.uuid);return t}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:hf}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=hf);class Tb{constructor(t,n){Ot(this,"scene",new HE);Ot(this,"camera");Ot(this,"renderer");this.renderer=new VE({canvas:t,alpha:!0,antialias:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));const{width:i,height:r}=n;this.camera=new Jg(-i/2,i/2,r/2,-r/2,-100,100),this.resize(n)}resize(t){const{width:n,height:i}=t;this.renderer.setSize(n,i,!1),this.camera.left=-n/2,this.camera.right=n/2,this.camera.top=i/2,this.camera.bottom=-i/2,this.camera.updateProjectionMatrix()}render(){this.renderer.render(this.scene,this.camera)}}const Vp=3,wb=16777215,Cb=16777215,Rb=5951938;class Pb{constructor(){Ot(this,"group",new rs);Ot(this,"labelCache",new Map);Ot(this,"gridMaterial",new o0({color:Cb,transparent:!0,opacity:.18}));Ot(this,"frameMaterial",new xs({color:Rb,transparent:!0,opacity:.5}));Ot(this,"persistentMaterials",new Set([this.gridMaterial,this.frameMaterial]))}rebuild(t,n){this.clearGroup();const i=n.pixelsPerUnit*n.step;if(i<Ev)return;const{width:r,height:s}=t,o=n.displayMode==="framed"?.9:1,a=r/2*o,c=s/2*o;n.showGrid&&this.addGrid(a,c,i),this.addAxes(a,c),n.displayMode==="framed"&&this.addFrame(a,c),n.showLabels&&this.addLabels(a,c,n)}addGrid(t,n,i){const r=[];for(let o=i;o<=t;o+=i)r.push(o,-n,0,o,n,0,-o,-n,0,-o,n,0);for(let o=i;o<=n;o+=i)r.push(-t,o,0,t,o,0,-t,-o,0,t,-o,0);if(r.length===0)return;const s=new Ln;s.setAttribute("position",new Xe(r,3)),this.group.add(new qE(s,this.gridMaterial))}addAxes(t,n){const i=new xs({color:wb,transparent:!0,opacity:.9}),r=new ee(new pi(t*2,Vp),i),s=new ee(new pi(Vp,n*2),i);this.group.add(r,s)}addFrame(t,n){const r=new ee(new pi(t*2,2),this.frameMaterial);r.position.y=n;const s=new ee(new pi(t*2,2),this.frameMaterial);s.position.y=-n;const o=new ee(new pi(2,n*2),this.frameMaterial);o.position.x=-t;const a=new ee(new pi(2,n*2),this.frameMaterial);a.position.x=t,this.group.add(r,s,o,a)}addLabels(t,n,i){const r=i.pixelsPerUnit*i.step,s=o=>Number(o.toFixed(4)).toString();for(let o=r,a=i.step;o<=t;o+=r,a+=i.step)this.addLabelSprite(s(a),o,-12),this.addLabelSprite(s(-a),-o,-12);for(let o=r,a=i.step;o<=n;o+=r,a+=i.step)this.addLabelSprite(s(a),14,o),this.addLabelSprite(s(-a),14,-o)}addLabelSprite(t,n,i){const r=this.labelTexture(t),s=new r0({map:r,transparent:!0}),o=new XE(s);o.position.set(n,i,1),o.scale.set(r.image.width,r.image.height,1),this.group.add(o)}labelTexture(t){const n=this.labelCache.get(t);if(n)return n;const i=document.createElement("canvas"),r=i.getContext("2d"),s="600 12px system-ui, sans-serif";r.font=s;const o=Math.ceil(r.measureText(t).width)+12,a=15;i.width=o,i.height=a,r.fillStyle="rgba(0,0,0,0.45)",r.fillRect(0,0,o,a),r.font=s,r.fillStyle="#fff",r.textBaseline="middle",r.textAlign="center",r.fillText(t,o/2,a/2+1);const c=new YE(i);return c.needsUpdate=!0,this.labelCache.set(t,c),c}clearGroup(){for(const t of[...this.group.children]){this.group.remove(t);const n=t;"geometry"in n&&n.geometry&&n.geometry.dispose();const i=n.material;if(i){const r=Array.isArray(i)?i:[i];for(const s of r)this.persistentMaterials.has(s)||s.dispose()}}}}const Lb={point:16765286,vector:5951938,circle:13073919,triangle:16739210,segment:9087487,graph:16752451,unitCircle:16769126,fractionCircle:6937468,square:9926138},Ib=16765286,Hp=16749099,Wp=16766011,Db={linear:16752451,quadratic:5361510,trig:5090295},Er={sin:5090295,cos:14317554,tan:16755021},Ub=e=>e.form==="trig"?Er[e.fn]:Db[e.form],Xp=160,Qo=2,Zi=3,$p=4,qp=6,be=3,Nb=2;class Fb{constructor(t){Ot(this,"group",new rs);Ot(this,"entries",[]);Ot(this,"litIds",new Set);Ot(this,"hiddenKinds",new Set);Ot(this,"hiddenGraphs",new Set);Ot(this,"showTrace",!0);Ot(this,"showCosTrace",!1);Ot(this,"showDiagonal",!1);Ot(this,"showHalfDiagonal",!1);Ot(this,"showProjection",!1);Ot(this,"projectionPair",null);Ot(this,"cosPlacement","onSine");Ot(this,"nextId",0);Ot(this,"bodyAlpha",1);this.cs=t}get shapes(){return this.hiddenKinds.size===0&&this.hiddenGraphs.size===0?this.entries:this.entries.filter(t=>this.isVisible(t.shape))}isVisible(t){return!(this.hiddenKinds.has(t.kind)||t.kind==="graph"&&this.hiddenGraphs.has(Jv(t.graph)))}setKindVisible(t,n){const i=this.hiddenKinds.has(t);n!==!i&&(n?this.hiddenKinds.delete(t):this.hiddenKinds.add(t),this.rebuild())}setGraphVisible(t,n){const i=this.hiddenGraphs.has(t);n!==!i&&(n?this.hiddenGraphs.delete(t):this.hiddenGraphs.add(t),this.rebuild())}setTraceVisible(t){this.showTrace!==t&&(this.showTrace=t,this.rebuild())}setDiagonalVisible(t){this.showDiagonal!==t&&(this.showDiagonal=t,this.rebuild())}setHalfDiagonalVisible(t){this.showHalfDiagonal!==t&&(this.showHalfDiagonal=t,this.rebuild())}setProjectionVisible(t){this.showProjection!==t&&(this.showProjection=t,this.rebuild())}setProjectionPair(t,n){const i=t===null||n===null?null:{onto:t,from:n};i===null&&this.projectionPair===null||i!==null&&this.projectionPair!==null&&i.onto===this.projectionPair.onto&&i.from===this.projectionPair.from||(this.projectionPair=i,this.showProjection&&this.rebuild())}setCosTraceVisible(t){this.showCosTrace!==t&&(this.showCosTrace=t,this.rebuild())}setCosPlacement(t){this.cosPlacement!==t&&(this.cosPlacement=t,this.showCosTrace&&this.rebuild())}setShapes(t){this.entries=t.map((n,i)=>({id:i,shape:n})),this.nextId=t.length,this.rebuild()}addShape(t){const n=this.nextId++;return this.entries.push({id:n,shape:t}),this.rebuild(),n}removeShape(t){const n=this.entries.findIndex(i=>i.id===t);if(n!==-1){if(this.entries.splice(n,1),this.litIds.has(t)){const i=new Set(this.litIds);i.delete(t),this.litIds=i}this.rebuild()}}updateShape(t,n){const i=this.entries.find(r=>r.id===t);i&&(i.shape=n,this.rebuild())}setLit(t){const n=new Set(t);n.size===this.litIds.size&&[...n].every(i=>this.litIds.has(i))||(this.litIds=n,this.rebuild())}rebuild(){this.clearGroup();for(const t of this.entries)this.isVisible(t.shape)&&(this.bodyAlpha=this.resolveAlpha(t),this.drawShape(t.shape,this.litIds.has(t.id),this.resolveColor(t)));this.bodyAlpha=1,this.showProjection&&this.drawProjection()}drawProjection(){if(this.projectionPair===null)return;const t=this.entries.find(f=>{var d;return f.id===((d=this.projectionPair)==null?void 0:d.onto)}),n=this.entries.find(f=>{var d;return f.id===((d=this.projectionPair)==null?void 0:d.from)});if(!t||!n||t.shape.kind!=="vector"||n.shape.kind!=="vector"||!this.isVisible(t.shape)||!this.isVisible(n.shape))return;const i=t.shape,r=n.shape;if(ir(i.v)===0)return;const s=i.tail,o=ag(r.v,i.v),a=rn(s,o),c=rn(s,r.v),l=this.toWorld(s),u=this.toWorld(a),h=this.toWorld(c);this.addSegment(l,h,1.5,this.mat(16777215,.35)),this.addSegment(h,u,1.5,this.mat(16777215,.5)),this.addSegment(l,u,be+1,this.mat(Wp,.95)),this.addDot(u,4,this.mat(Wp,.95)),this.addRightAngleMarker(u,l,h)}addRightAngleMarker(t,n,i){const s=f=>{const d=f.x-t.x,g=f.y-t.y,x=Math.hypot(d,g);return x===0?null:{x:d/x,y:g/x}},o=s(n),a=s(i);if(!o||!a)return;const c={x:t.x+o.x*9,y:t.y+o.y*9},l={x:t.x+a.x*9,y:t.y+a.y*9},u={x:t.x+(o.x+a.x)*9,y:t.y+(o.y+a.y)*9},h=this.mat(16777215,.5);this.addSegment(c,u,1.5,h),this.addSegment(u,l,1.5,h)}resolveColor(t){return t.color!==void 0?t.color:t.shape.kind==="graph"?Ub(t.shape.graph):Lb[t.shape.kind]}colorOf(t){const n=this.entries.find(i=>i.id===t);return n?this.resolveColor(n):null}setColor(t,n){const i=this.entries.find(r=>r.id===t);!i||i.color===n||(i.color=n,this.rebuild())}resolveAlpha(t){return t.alpha??Nb}alphaOf(t){const n=this.entries.find(i=>i.id===t);return n?this.resolveAlpha(n):null}setAlpha(t,n){const i=this.entries.find(r=>r.id===t);!i||i.alpha===n||(i.alpha=n,this.rebuild())}isSizeLocked(t){var n;return((n=this.entries.find(i=>i.id===t))==null?void 0:n.sizeLocked)??!1}setSizeLocked(t,n){const i=this.entries.find(r=>r.id===t);i&&(i.sizeLocked=n)}isPositionLocked(t){var n;return((n=this.entries.find(i=>i.id===t))==null?void 0:n.positionLocked)??!1}setPositionLocked(t,n){const i=this.entries.find(r=>r.id===t);i&&(i.positionLocked=n)}drawShape(t,n,i){switch(t.kind){case"point":{const r=n?qp+2:qp;this.addDot(this.toWorld(t.at),r,this.mat(i,n?1:.9));return}case"vector":this.addArrow(t.tail,ul(t),i,n);break;case"circle":this.addCircleShape(t.circle.center,t.circle.radius,i,n);break;case"triangle":this.addTriangleShape(t.tri.a,t.tri.b,t.tri.c,i,n);break;case"segment":{const r=this.toWorld(t.seg.a),s=this.toWorld(t.seg.b),o=this.mat(i,n?1:.85);this.addSegment(r,s,n?be+1:be,o),this.addDot(r,4,o),this.addDot(s,4,o);break}case"graph":this.addGraph(t.graph,i,n);break;case"unitCircle":this.addUnitCircle(t,i,n);break;case"fractionCircle":this.addFractionCircle(t,i,n);break;case"square":this.addSquare(t,i,n);break}if(n){this.bodyAlpha=1;for(const r of hl(t))this.addHandle(r)}}addArrow(t,n,i,r){const s=this.toWorld(t),o=this.toWorld(n),a=o.x-s.x,c=o.y-s.y,l=Math.hypot(a,c),u=this.mat(i,r?1:.85);if(l===0){this.addDot(s,4,u);return}const h=Math.min(16,l*.5),f={x:o.x-a/l*h,y:o.y-c/l*h};this.addSegment(s,f,r?be+1:be,u);const d=new Gc;d.moveTo(0,0),d.lineTo(-h,h*.42),d.lineTo(-h,-h*.42);const g=new ee(new ua(d),u);g.position.set(o.x,o.y,Zi),g.rotation.z=Math.atan2(c,a),this.group.add(g)}addCircleShape(t,n,i,r){const s=this.toWorld(t),o=n*this.cs.pixelsPerUnit;if(o<=0){this.addDot(s,4,this.mat(i,1));return}const a=new ee(new ss(o,64),this.mat(i,r?.16:.08));a.position.set(s.x,s.y,Qo),this.group.add(a);const c=r?be+1:be,l=new ee(new Tr(Math.max(0,o-c/2),o+c/2,64),this.mat(i,r?1:.85));l.position.set(s.x,s.y,Zi),this.group.add(l)}addUnitCircle(t,n,i){const r=Rc(t),s={x:r.x,y:t.center.y},o=this.toWorld(t.center),a=this.toWorld(r),c=this.toWorld(s),l=t.radius*this.cs.pixelsPerUnit;if(l>0){const h=new ee(new ss(l,64),this.mat(n,i?.12:.06));h.position.set(o.x,o.y,Qo),this.group.add(h);const f=new ee(new Tr(Math.max(0,l-be/2),l+be/2,64),this.mat(n,i?.9:.7));f.position.set(o.x,o.y,Zi),this.group.add(f);const d=new ee(new Tr(l*.18,l*.26,32,1,0,t.angle),this.mat(n,i?.95:.75));d.position.set(o.x,o.y,Zi),this.group.add(d)}const u=i?be+1:be;this.addSegment(o,c,u,this.mat(Er.cos,i?1:.85)),this.addSegment(c,a,u,this.mat(Er.sin,i?1:.85)),this.addSegment(o,a,u,this.mat(n,i?1:.9)),this.addDot(o,4,this.mat(n,.95)),this.showTrace&&this.addSineTrace(t,i),this.showCosTrace&&this.addCosineTrace(t,i,this.cosPlacement)}addSineTrace(t,n){if(t.angle<=1e-6)return;const i=t.center.x+t.radius,r=Math.max(2,Math.ceil(t.angle*16)),s=[];for(let l=0;l<=r;l++){const u=t.angle*l/r;s.push({x:i+u,y:t.center.y+t.radius*Math.sin(u)})}const o=s.map(l=>this.toWorld(l));this.addPolyline(o,n?be+1:be,this.mat(Er.sin,n?.95:.8));const a=o[o.length-1],c=this.toWorld(Rc(t));this.addSegment(c,a,1.5,this.mat(16777215,n?.5:.3)),this.addDot(a,4,this.mat(Er.sin,.95))}addCosineTrace(t,n,i){if(t.angle<=1e-6)return;const r=Math.max(2,Math.ceil(t.angle*16)),s=n?be+1:be,o=this.mat(Er.cos,n?.95:.8);if(i==="above"){const h=t.center.y+t.radius,f=[];for(let x=0;x<=r;x++){const p=t.angle*x/r;f.push({x:t.center.x+t.radius*Math.cos(p),y:h+p})}const d=f.map(x=>this.toWorld(x));this.addPolyline(d,s,o);const g=d[d.length-1];this.addSegment(this.toWorld(Rc(t)),g,1.5,this.mat(16777215,n?.5:.3)),this.addDot(g,4,this.mat(Er.cos,.95));return}const a=t.center.y,c=i==="right"?t.center.x+t.radius+t.angle+.8:t.center.x+t.radius;i==="right"&&this.addSegment(this.toWorld({x:c,y:a}),this.toWorld({x:c+t.angle,y:a}),1,this.mat(16777215,n?.35:.2));const l=[];for(let h=0;h<=r;h++){const f=t.angle*h/r;l.push({x:c+f,y:a+t.radius*Math.cos(f)})}const u=l.map(h=>this.toWorld(h));this.addPolyline(u,s,o),this.addDot(u[u.length-1],4,this.mat(Er.cos,.95))}addFractionCircle(t,n,i){const r=this.toWorld(t.center),s=t.radius*this.cs.pixelsPerUnit;if(s<=0){this.addDot(r,4,this.mat(n,1));return}const o=2*Math.PI/t.divisions;if(t.filled>0){const l=new ee(new ss(s,64,0,t.filled*o),this.mat(n,i?.34:.26));l.position.set(r.x,r.y,Qo),this.group.add(l)}const a=this.mat(n,i?.5:.35);for(let l=0;l<t.divisions;l++){const u=l*o,h=this.toWorld({x:t.center.x+t.radius*Math.cos(u),y:t.center.y+t.radius*Math.sin(u)});this.addSegment(r,h,1.5,a)}const c=new ee(new Tr(Math.max(0,s-be/2),s+be/2,64),this.mat(n,i?.9:.7));c.position.set(r.x,r.y,Zi),this.group.add(c),this.addDot(r,4,this.mat(n,.95))}addSquare(t,n,i){const s=dg(t).map(u=>this.toWorld(u)),o=new Gc;o.moveTo(s[0].x,s[0].y);for(let u=1;u<s.length;u++)o.lineTo(s[u].x,s[u].y);o.closePath();const a=new ee(new ua(o),this.mat(n,i?.18:.1));a.position.z=Qo,this.group.add(a);const c=this.mat(n,i?1:.85),l=i?be+1:be;for(let u=0;u<s.length;u++)this.addSegment(s[u],s[(u+1)%s.length],l,c);if(this.showDiagonal&&this.addSegment(s[0],s[2],l,this.mat(Ib,i?1:.9)),this.showHalfDiagonal){const u=this.toWorld(t.center);this.addSegment(u,s[0],l+1,this.mat(Hp,1)),this.addDot(u,4,this.mat(Hp,1))}}addTriangleShape(t,n,i,r,s){const o=this.toWorld(t),a=this.toWorld(n),c=this.toWorld(i),l=new Gc;l.moveTo(o.x,o.y),l.lineTo(a.x,a.y),l.lineTo(c.x,c.y),l.closePath();const u=new ee(new ua(l),this.mat(r,s?.18:.1));u.position.z=Qo,this.group.add(u);const h=this.mat(r,s?1:.85),f=s?be+1:be;this.addSegment(o,a,f,h),this.addSegment(a,c,f,h),this.addSegment(c,o,f,h)}addGraph(t,n,i){const{minX:r,maxX:s,minY:o,maxY:a}=this.cs.mathBounds(),c=o*3,l=a*3,u=this.mat(n,i?1:.85);u.side=Li;const h=i?be+1:be;let f=[];const d=()=>{this.addPolyline(f,h,u),f=[]};for(let g=0;g<=Xp;g++){const x=r+(s-r)*g/Xp,p=fg(t,x);if(!Number.isFinite(p)||p<c||p>l){d();continue}f.push(this.toWorld({x,y:p}))}d()}addPolyline(t,n,i){if(t.length<2)return;const r=n/2,s=[],o=[];for(let c=0;c<t.length;c++){const l=t[Math.max(0,c-1)],u=t[Math.min(t.length-1,c+1)],h=u.x-l.x,f=u.y-l.y,d=Math.hypot(h,f)||1,g=-f/d*r,x=h/d*r;if(s.push(t[c].x+g,t[c].y+x,Zi,t[c].x-g,t[c].y-x,Zi),c>0){const p=2*(c-1);o.push(p,p+1,p+2,p+1,p+3,p+2)}}const a=new Ln;a.setAttribute("position",new Xe(s,3)),a.setIndex(o),this.group.add(new ee(a,i))}addHandle(t){const n=this.toWorld(t),i=new ee(new Tr(4,6,20),this.mat(0,.55));i.position.set(n.x,n.y,$p),this.group.add(i),this.addDot(n,4,this.mat(16777215,.95),$p+1)}addDot(t,n,i,r=Zi){const s=new ee(new ss(n,24),i);s.position.set(t.x,t.y,r),this.group.add(s)}addSegment(t,n,i,r){const s=n.x-t.x,o=n.y-t.y,a=Math.hypot(s,o);if(a===0)return;const c=new ee(new pi(a,i),r);c.position.set((t.x+n.x)/2,(t.y+n.y)/2,Zi),c.rotation.z=Math.atan2(o,s),this.group.add(c)}toWorld(t){return this.cs.mathToWorld(sg(t.x,t.y))}mat(t,n){return new xs({color:t,transparent:!0,opacity:Math.min(1,n*this.bodyAlpha)})}clearGroup(){for(const t of[...this.group.children]){this.group.remove(t);const n=t;n.geometry.dispose();const i=Array.isArray(n.material)?n.material:[n.material];for(const r of i)r.dispose()}}}const tl={handlePx:12,bodyPx:8},Yp={handlePx:28,bodyPx:20};class Ob{constructor(t,n){Ot(this,"sessions",new Map);Ot(this,"hovers",new Map);Ot(this,"focusedId",null);Ot(this,"snapEnabled",!1);Ot(this,"onUpdate");this.layer=t,this.cs=n}setSnapEnabled(t){this.snapEnabled=t}focused(){return this.focusedId===null?null:this.layer.shapes.find(t=>t.id===this.focusedId)??null}focus(t){var n;this.focusedId!==t&&(this.focusedId=t,(n=this.onUpdate)==null||n.call(this))}blur(t){var n;this.focusedId!==null&&(t!==void 0&&this.focusedId!==t||(this.focusedId=null,(n=this.onUpdate)==null||n.call(this)))}hover(t,n,i=tl){const r=n===null?null:this.pick(n,i);return r===null?this.hovers.delete(t):this.hovers.set(t,r.id),this.pushLit(),r!==null}grab(t,n,i=tl){var s;this.release(t);const r=this.pick(n,i,this.grabbedIds());return r?(this.sessions.set(t,r),this.hovers.delete(t),this.focusedId=r.id,this.pushLit(),(s=this.onUpdate)==null||s.call(this),!0):!1}move(t,n){var s;const i=this.sessions.get(t);if(!i)return;const r=this.layer.shapes.find(o=>o.id===i.id);if(r){if(i.mode==="handle"){let o=mg(r.shape,i.handleIndex,n);if(this.snapEnabled){const a=f1(r.shape,i.handleIndex);a==="position"?o=Rd(o):a==="resize"?o=p1(o,n):a==="handle"&&(o=d1(o,i.handleIndex))}r.sizeLocked&&(o=l1(r.shape,o)),r.positionLocked&&(o=h1(r.shape,o)),this.layer.updateShape(i.id,o)}else if(!r.positionLocked){const o=on(i.last,n);let a=nf(r.shape,o);this.snapEnabled&&(a=Rd(a)),this.layer.updateShape(i.id,a),i.last=n}(s=this.onUpdate)==null||s.call(this)}}release(t){var n;this.sessions.delete(t)&&(this.pushLit(),(n=this.onUpdate)==null||n.call(this))}pick(t,n,i){const r=n.handlePx/this.cs.pixelsPerUnit,s=n.bodyPx/this.cs.pixelsPerUnit,o=this.layer.shapes;for(let a=o.length-1;a>=0;a--){const{id:c,shape:l}=o[a];if(i!=null&&i.has(c))continue;const u=o1(l,t,r);if(u!==null)return{mode:"handle",id:c,handleIndex:u}}for(let a=o.length-1;a>=0;a--){const{id:c,shape:l}=o[a];if(!(i!=null&&i.has(c))&&a1(l,t,s))return{mode:"body",id:c,last:t}}return null}grabbedIds(){return new Set([...this.sessions.values()].map(t=>t.id))}pushLit(){this.layer.setLit([...this.grabbedIds(),...this.hovers.values()])}}const xc="pointer";function kb(e,t,n){let i=!1;const r=o=>{const a=t.worldToMath(t.cameraToWorld(Zh(o.clientX,o.clientY)));return Gt(a.x,a.y)};e.addEventListener("pointerdown",o=>{o.button===0&&n.grab(xc,r(o),tl)&&(i=!0,e.setPointerCapture(o.pointerId),e.style.cursor="grabbing",o.preventDefault())}),e.addEventListener("pointermove",o=>{const a=r(o);if(i){n.move(xc,a);return}const c=n.hover(xc,a,tl);e.style.cursor=c?"grab":"default"});const s=o=>{i&&(i=!1,n.release(xc),e.hasPointerCapture(o.pointerId)&&e.releasePointerCapture(o.pointerId))};e.addEventListener("pointerup",s),e.addEventListener("pointercancel",s)}var vo=typeof self<"u"?self:{};function p0(e,t){t:{for(var n=["CLOSURE_FLAGS"],i=vo,r=0;r<n.length;r++)if((i=i[n[r]])==null){n=null;break t}n=i}return(e=n&&n[e])!=null?e:t}function Kr(){throw Error("Invalid UTF8")}function Kp(e,t){return t=String.fromCharCode.apply(null,t),e==null?t:e+t}let yc,Cu;const Bb=typeof TextDecoder<"u";let zb;const Gb=typeof TextEncoder<"u";function m0(e){if(Gb)e=(zb||(zb=new TextEncoder)).encode(e);else{let n=0;const i=new Uint8Array(3*e.length);for(let r=0;r<e.length;r++){var t=e.charCodeAt(r);if(t<128)i[n++]=t;else{if(t<2048)i[n++]=t>>6|192;else{if(t>=55296&&t<=57343){if(t<=56319&&r<e.length){const s=e.charCodeAt(++r);if(s>=56320&&s<=57343){t=1024*(t-55296)+s-56320+65536,i[n++]=t>>18|240,i[n++]=t>>12&63|128,i[n++]=t>>6&63|128,i[n++]=63&t|128;continue}r--}t=65533}i[n++]=t>>12|224,i[n++]=t>>6&63|128}i[n++]=63&t|128}}e=n===i.length?i:i.subarray(0,n)}return e}function g0(e){vo.setTimeout(()=>{throw e},0)}var Dh,Vb=p0(610401301,!1),jp=p0(748402147,!0);function Zp(){var e=vo.navigator;return e&&(e=e.userAgent)?e:""}const Jp=vo.navigator;function _l(e){return _l[" "](e),e}Dh=Jp&&Jp.userAgentData||null,_l[" "]=function(){};const _0={};let sa=null;function Hb(e){const t=e.length;let n=3*t/4;n%3?n=Math.floor(n):"=.".indexOf(e[t-1])!=-1&&(n="=.".indexOf(e[t-2])!=-1?n-2:n-1);const i=new Uint8Array(n);let r=0;return function(s,o){function a(l){for(;c<s.length;){const u=s.charAt(c++),h=sa[u];if(h!=null)return h;if(!/^[\s\xa0]*$/.test(u))throw Error("Unknown base64 encoding at char: "+u)}return l}v0();let c=0;for(;;){const l=a(-1),u=a(0),h=a(64),f=a(64);if(f===64&&l===-1)break;o(l<<2|u>>4),h!=64&&(o(u<<4&240|h>>2),f!=64&&o(h<<6&192|f))}}(e,function(s){i[r++]=s}),r!==n?i.subarray(0,r):i}function v0(){if(!sa){sa={};var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),t=["+/=","+/","-_=","-_.","-_"];for(let n=0;n<5;n++){const i=e.concat(t[n].split(""));_0[n]=i;for(let r=0;r<i.length;r++){const s=i[r];sa[s]===void 0&&(sa[s]=r)}}}}var Wb=typeof Uint8Array<"u",x0=!(!(Vb&&Dh&&Dh.brands.length>0)&&(Zp().indexOf("Trident")!=-1||Zp().indexOf("MSIE")!=-1))&&typeof btoa=="function";const Qp=/[-_.]/g,Xb={"-":"+",_:"/",".":"="};function $b(e){return Xb[e]||""}function y0(e){if(!x0)return Hb(e);e=Qp.test(e)?e.replace(Qp,$b):e,e=atob(e);const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}function Mf(e){return Wb&&e!=null&&e instanceof Uint8Array}var xo={};function Ss(){return qb||(qb=new Ni(null,xo))}function Ef(e){S0(xo);var t=e.g;return(t=t==null||Mf(t)?t:typeof t=="string"?y0(t):null)==null?t:e.g=t}var Ni=class{h(){return new Uint8Array(Ef(this)||0)}constructor(e,t){if(S0(t),this.g=e,e!=null&&e.length===0)throw Error("ByteString should be constructed with non-empty values")}};let qb,Yb;function S0(e){if(e!==xo)throw Error("illegal external caller")}function M0(e,t){e.__closure__error__context__984382||(e.__closure__error__context__984382={}),e.__closure__error__context__984382.severity=t}function Uh(e){return M0(e=Error(e),"warning"),e}function yo(e,t){if(e!=null){var n=Yb??(Yb={}),i=n[e]||0;i>=t||(n[e]=i+1,M0(e=Error(),"incident"),g0(e))}}function Io(){return typeof BigInt=="function"}var Do=typeof Symbol=="function"&&typeof Symbol()=="symbol";function zi(e,t,n=!1){return typeof Symbol=="function"&&typeof Symbol()=="symbol"?n&&Symbol.for&&e?Symbol.for(e):e!=null?Symbol(e):Symbol():t}var Kb=zi("jas",void 0,!0),tm=zi(void 0,"0di"),ta=zi(void 0,"1oa"),Xn=zi(void 0,Symbol()),jb=zi(void 0,"0ub"),Zb=zi(void 0,"0ubs"),Nh=zi(void 0,"0ubsb"),Jb=zi(void 0,"0actk"),So=zi("m_m","Pa",!0),em=zi();const E0={Ga:{value:0,configurable:!0,writable:!0,enumerable:!1}},b0=Object.defineProperties,yt=Do?Kb:"Ga";var bs;const nm=[];function Da(e,t){Do||yt in e||b0(e,E0),e[yt]|=t}function tn(e,t){Do||yt in e||b0(e,E0),e[yt]=t}function Ua(e){return Da(e,34),e}function Ma(e){return Da(e,8192),e}tn(nm,7),bs=Object.freeze(nm);var Mo={};function qn(e,t){return t===void 0?e.h!==Ms&&!!(2&(0|e.v[yt])):!!(2&t)&&e.h!==Ms}const Ms={};function bf(e,t){if(e!=null){if(typeof e=="string")e=e?new Ni(e,xo):Ss();else if(e.constructor!==Ni)if(Mf(e))e=e.length?new Ni(new Uint8Array(e),xo):Ss();else{if(!t)throw Error();e=void 0}}return e}class im{constructor(t,n,i){this.g=t,this.h=n,this.l=i}next(){const t=this.g.next();return t.done||(t.value=this.h.call(this.l,t.value)),t}[Symbol.iterator](){return this}}var Qb=Object.freeze({});function A0(e,t,n){const i=128&t?0:-1,r=e.length;var s;(s=!!r)&&(s=(s=e[r-1])!=null&&typeof s=="object"&&s.constructor===Object);const o=r+(s?-1:0);for(t=128&t?1:0;t<o;t++)n(t-i,e[t]);if(s){e=e[r-1];for(const a in e)!isNaN(a)&&n(+a,e[a])}}var T0={};function Uo(e){return 128&e?T0:void 0}function vl(e){return e.Na=!0,e}var tA=vl(e=>typeof e=="number"),rm=vl(e=>typeof e=="string"),eA=vl(e=>typeof e=="boolean"),xl=typeof vo.BigInt=="function"&&typeof vo.BigInt(0)=="bigint";function $n(e){var t=e;if(rm(t)){if(!/^\s*(?:-?[1-9]\d*|0)?\s*$/.test(t))throw Error(String(t))}else if(tA(t)&&!Number.isSafeInteger(t))throw Error(String(t));return xl?BigInt(e):e=eA(e)?e?"1":"0":rm(e)?e.trim()||"0":String(e)}var Fh=vl(e=>xl?e>=iA&&e<=sA:e[0]==="-"?sm(e,nA):sm(e,rA));const nA=Number.MIN_SAFE_INTEGER.toString(),iA=xl?BigInt(Number.MIN_SAFE_INTEGER):void 0,rA=Number.MAX_SAFE_INTEGER.toString(),sA=xl?BigInt(Number.MAX_SAFE_INTEGER):void 0;function sm(e,t){if(e.length>t.length)return!1;if(e.length<t.length||e===t)return!0;for(let n=0;n<e.length;n++){const i=e[n],r=t[n];if(i>r)return!1;if(i<r)return!0}}const oA=typeof Uint8Array.prototype.slice=="function";let aA,Ae=0,He=0;function om(e){const t=e>>>0;Ae=t,He=(e-t)/4294967296>>>0}function Eo(e){if(e<0){om(-e);const[t,n]=wf(Ae,He);Ae=t>>>0,He=n>>>0}else om(e)}function Af(e){const t=aA||(aA=new DataView(new ArrayBuffer(8)));t.setFloat32(0,+e,!0),He=0,Ae=t.getUint32(0,!0)}function w0(e,t){const n=4294967296*t+(e>>>0);return Number.isSafeInteger(n)?n:Ea(e,t)}function cA(e,t){return $n(Io()?BigInt.asUintN(64,(BigInt(t>>>0)<<BigInt(32))+BigInt(e>>>0)):Ea(e,t))}function C0(e,t){return Io()?$n(BigInt.asIntN(64,(BigInt.asUintN(32,BigInt(t))<<BigInt(32))+BigInt.asUintN(32,BigInt(e)))):$n(Tf(e,t))}function Ea(e,t){if(e>>>=0,(t>>>=0)<=2097151)var n=""+(4294967296*t+e);else Io()?n=""+(BigInt(t)<<BigInt(32)|BigInt(e)):(e=(16777215&e)+6777216*(n=16777215&(e>>>24|t<<8))+6710656*(t=t>>16&65535),n+=8147497*t,t*=2,e>=1e7&&(n+=e/1e7>>>0,e%=1e7),n>=1e7&&(t+=n/1e7>>>0,n%=1e7),n=t+am(n)+am(e));return n}function am(e){return e=String(e),"0000000".slice(e.length)+e}function Tf(e,t){if(2147483648&t)if(Io())e=""+(BigInt(0|t)<<BigInt(32)|BigInt(e>>>0));else{const[n,i]=wf(e,t);e="-"+Ea(n,i)}else e=Ea(e,t);return e}function yl(e){if(e.length<16)Eo(Number(e));else if(Io())e=BigInt(e),Ae=Number(e&BigInt(4294967295))>>>0,He=Number(e>>BigInt(32)&BigInt(4294967295));else{const t=+(e[0]==="-");He=Ae=0;const n=e.length;for(let i=t,r=(n-t)%6+t;r<=n;i=r,r+=6){const s=Number(e.slice(i,r));He*=1e6,Ae=1e6*Ae+s,Ae>=4294967296&&(He+=Math.trunc(Ae/4294967296),He>>>=0,Ae>>>=0)}if(t){const[i,r]=wf(Ae,He);Ae=i,He=r}}}function wf(e,t){return t=~t,e?e=1+~e:t+=1,[e,t]}function Si(e){return Array.prototype.slice.call(e)}const Na=typeof BigInt=="function"?BigInt.asIntN:void 0,lA=typeof BigInt=="function"?BigInt.asUintN:void 0,Es=Number.isSafeInteger,Sl=Number.isFinite,bo=Math.trunc,uA=$n(0);function oa(e){if(e!=null&&typeof e!="number")throw Error(`Value of float/double field must be a number, found ${typeof e}: ${e}`);return e}function Ui(e){return e==null||typeof e=="number"?e:e==="NaN"||e==="Infinity"||e==="-Infinity"?Number(e):void 0}function ba(e){if(e!=null&&typeof e!="boolean"){var t=typeof e;throw Error(`Expected boolean but got ${t!="object"?t:e?Array.isArray(e)?"array":t:"null"}: ${e}`)}return e}function R0(e){return e==null||typeof e=="boolean"?e:typeof e=="number"?!!e:void 0}const hA=/^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;function Fa(e){switch(typeof e){case"bigint":return!0;case"number":return Sl(e);case"string":return hA.test(e);default:return!1}}function No(e){if(e==null)return e;if(typeof e=="string"&&e)e=+e;else if(typeof e!="number")return;return Sl(e)?0|e:void 0}function P0(e){if(e==null)return e;if(typeof e=="string"&&e)e=+e;else if(typeof e!="number")return;return Sl(e)?e>>>0:void 0}function L0(e){const t=e.length;return(e[0]==="-"?t<20||t===20&&e<="-9223372036854775808":t<19||t===19&&e<="9223372036854775807")?e:(yl(e),Tf(Ae,He))}function Cf(e){if(e=bo(e),!Es(e)){Eo(e);var t=Ae,n=He;(e=2147483648&n)&&(n=~n>>>0,(t=1+~t>>>0)==0&&(n=n+1>>>0)),e=typeof(t=w0(t,n))=="number"?e?-t:t:e?"-"+t:t}return e}function I0(e){var t=bo(Number(e));return Es(t)?String(t):((t=e.indexOf("."))!==-1&&(e=e.substring(0,t)),L0(e))}function D0(e){var t=bo(Number(e));return Es(t)?$n(t):((t=e.indexOf("."))!==-1&&(e=e.substring(0,t)),Io()?$n(Na(64,BigInt(e))):$n(L0(e)))}function U0(e){return Es(e)?e=$n(Cf(e)):(e=bo(e),Es(e)?e=String(e):(Eo(e),e=Tf(Ae,He)),e=$n(e)),e}function el(e){const t=typeof e;return e==null?e:t==="bigint"?$n(Na(64,e)):Fa(e)?t==="string"?D0(e):U0(e):void 0}function N0(e){if(typeof e!="string")throw Error();return e}function Oa(e){if(e!=null&&typeof e!="string")throw Error();return e}function cn(e){return e==null||typeof e=="string"?e:void 0}function Rf(e,t,n,i){return e!=null&&e[So]===Mo?e:Array.isArray(e)?((i=(n=0|e[yt])|32&i|2&i)!==n&&tn(e,i),new t(e)):(n?2&i?((e=t[tm])||(Ua((e=new t).v),e=t[tm]=e),t=e):t=new t:t=void 0,t)}function fA(e,t,n){if(t)t:{if(!Fa(t=e))throw Uh("int64");switch(typeof t){case"string":t=D0(t);break t;case"bigint":t=$n(Na(64,t));break t;default:t=U0(t)}}else t=el(e);return(e=t)==null?n?uA:void 0:e}const dA={};let pA=function(){try{return _l(new class extends Map{constructor(){super()}}),!1}catch{return!0}}();class Ru{constructor(){this.g=new Map}get(t){return this.g.get(t)}set(t,n){return this.g.set(t,n),this.size=this.g.size,this}delete(t){return t=this.g.delete(t),this.size=this.g.size,t}clear(){this.g.clear(),this.size=this.g.size}has(t){return this.g.has(t)}entries(){return this.g.entries()}keys(){return this.g.keys()}values(){return this.g.values()}forEach(t,n){return this.g.forEach(t,n)}[Symbol.iterator](){return this.entries()}}const mA=pA?(Object.setPrototypeOf(Ru.prototype,Map.prototype),Object.defineProperties(Ru.prototype,{size:{value:0,configurable:!0,enumerable:!0,writable:!0}}),Ru):class extends Map{constructor(){super()}};function cm(e){return e}function Pu(e){if(2&e.J)throw Error("Cannot mutate an immutable Map")}var cr=class extends mA{constructor(e,t,n=cm,i=cm){super(),this.J=0|e[yt],this.K=t,this.S=n,this.fa=this.K?gA:i;for(let r=0;r<e.length;r++){const s=e[r],o=n(s[0],!1,!0);let a=s[1];t?a===void 0&&(a=null):a=i(s[1],!1,!0,void 0,void 0,this.J),super.set(o,a)}}V(e){return Ma(Array.from(super.entries(),e))}clear(){Pu(this),super.clear()}delete(e){return Pu(this),super.delete(this.S(e,!0,!1))}entries(){if(this.K){var e=super.keys();e=new im(e,_A,this)}else e=super.entries();return e}values(){if(this.K){var e=super.keys();e=new im(e,cr.prototype.get,this)}else e=super.values();return e}forEach(e,t){this.K?super.forEach((n,i,r)=>{e.call(t,r.get(i),i,r)}):super.forEach(e,t)}set(e,t){return Pu(this),(e=this.S(e,!0,!1))==null?this:t==null?(super.delete(e),this):super.set(e,this.fa(t,!0,!0,this.K,!1,this.J))}Ma(e){const t=this.S(e[0],!1,!0);e=e[1],e=this.K?e===void 0?null:e:this.fa(e,!1,!0,void 0,!1,this.J),super.set(t,e)}has(e){return super.has(this.S(e,!1,!1))}get(e){e=this.S(e,!1,!1);const t=super.get(e);if(t!==void 0){var n=this.K;return n?((n=this.fa(t,!1,!0,n,this.ra,this.J))!==t&&super.set(e,n),n):t}}[Symbol.iterator](){return this.entries()}};function gA(e,t,n,i,r,s){return e=Rf(e,i,n,s),r&&(e=Lf(e)),e}function _A(e){return[e,this.get(e)]}let vA;function lm(){return vA||(vA=new cr(Ua([]),void 0,void 0,void 0,dA))}function Ml(e){return Xn?e[Xn]:void 0}function nl(e,t){for(const n in e)!isNaN(n)&&t(e,+n,e[n])}cr.prototype.toJSON=void 0;var Oh=class{};const xA={Ka:!0};function yA(e,t){t<100||yo(Zb,1)}function El(e,t,n,i){const r=i!==void 0;i=!!i;var s,o=Xn;!r&&Do&&o&&(s=e[o])&&nl(s,yA),o=[];var a=e.length;let c;s=4294967295;let l=!1;const u=!!(64&t),h=u?128&t?0:-1:void 0;1&t||(c=a&&e[a-1],c!=null&&typeof c=="object"&&c.constructor===Object?s=--a:c=void 0,!u||128&t||r||(l=!0,s=s-h+h)),t=void 0;for(var f=0;f<a;f++){let d=e[f];if(d!=null&&(d=n(d,i))!=null)if(u&&f>=s){const g=f-h;(t??(t={}))[g]=d}else o[f]=d}if(c)for(let d in c){if((a=c[d])==null||(a=n(a,i))==null)continue;let g;f=+d,u&&!Number.isNaN(f)&&(g=f+h)<s?o[g]=a:(t??(t={}))[d]=a}return t&&(l?o.push(t):o[s]=t),r&&Xn&&(e=Ml(e))&&e instanceof Oh&&(o[Xn]=function(d){const g=new Oh;return nl(d,(x,p,m)=>{g[p]=Si(m)}),g.da=d.da,g}(e)),o}function SA(e){return e[0]=Aa(e[0]),e[1]=Aa(e[1]),e}function Aa(e){switch(typeof e){case"number":return Number.isFinite(e)?e:""+e;case"bigint":return Fh(e)?Number(e):""+e;case"boolean":return e?1:0;case"object":if(Array.isArray(e)){var t=0|e[yt];return e.length===0&&1&t?void 0:El(e,t,Aa)}if(e!=null&&e[So]===Mo)return F0(e);if(e instanceof Ni){if((t=e.g)==null)e="";else if(typeof t=="string")e=t;else{if(x0){for(var n="",i=0,r=t.length-10240;i<r;)n+=String.fromCharCode.apply(null,t.subarray(i,i+=10240));n+=String.fromCharCode.apply(null,i?t.subarray(i):t),t=btoa(n)}else{n===void 0&&(n=0),v0(),n=_0[n],i=Array(Math.floor(t.length/3)),r=n[64]||"";let l=0,u=0;for(;l<t.length-2;l+=3){var s=t[l],o=t[l+1],a=t[l+2],c=n[s>>2];s=n[(3&s)<<4|o>>4],o=n[(15&o)<<2|a>>6],a=n[63&a],i[u++]=c+s+o+a}switch(c=0,a=r,t.length-l){case 2:a=n[(15&(c=t[l+1]))<<2]||r;case 1:t=t[l],i[u]=n[t>>2]+n[(3&t)<<4|c>>4]+a+r}t=i.join("")}e=e.g=t}return e}return e instanceof cr?e=e.size!==0?e.V(SA):void 0:void 0}return e}let MA,EA;function F0(e){return El(e=e.v,0|e[yt],Aa)}function ls(e,t){return O0(e,t[0],t[1])}function O0(e,t,n,i=0){if(e==null){var r=32;n?(e=[n],r|=128):e=[],t&&(r=-16760833&r|(1023&t)<<14)}else{if(!Array.isArray(e))throw Error("narr");if(r=0|e[yt],jp&&1&r)throw Error("rfarr");if(2048&r&&!(2&r)&&function(){if(jp)throw Error("carr");yo(Jb,5)}(),256&r)throw Error("farr");if(64&r)return(r|i)!==r&&tn(e,r|i),e;if(n&&(r|=128,n!==e[0]))throw Error("mid");t:{r|=64;var s=(n=e).length;if(s){var o=s-1;const c=n[o];if(c!=null&&typeof c=="object"&&c.constructor===Object){if((o-=t=128&r?0:-1)>=1024)throw Error("pvtlmt");for(var a in c)(s=+a)<o&&(n[s+t]=c[a],delete c[a]);r=-16760833&r|(1023&o)<<14;break t}}if(t){if((a=Math.max(t,s-(128&r?0:-1)))>1024)throw Error("spvt");r=-16760833&r|(1023&a)<<14}}}return tn(e,64|r|i),e}function bA(e,t){if(typeof e!="object")return e;if(Array.isArray(e)){var n=0|e[yt];return e.length===0&&1&n?void 0:um(e,n,t)}if(e!=null&&e[So]===Mo)return hm(e);if(e instanceof cr){if(2&(t=e.J))return e;if(!e.size)return;if(n=Ua(e.V()),e.K)for(e=0;e<n.length;e++){const i=n[e];let r=i[1];r=r==null||typeof r!="object"?void 0:r!=null&&r[So]===Mo?hm(r):Array.isArray(r)?um(r,0|r[yt],!!(32&t)):void 0,i[1]=r}return n}return e instanceof Ni?e:void 0}function um(e,t,n){return 2&t||(!n||4096&t||16&t?e=Fo(e,t,!1,n&&!(16&t)):(Da(e,34),4&t&&Object.freeze(e))),e}function Pf(e,t,n){return e=new e.constructor(t),n&&(e.h=Ms),e.m=Ms,e}function hm(e){const t=e.v,n=0|t[yt];return qn(e,n)?e:If(e,t,n)?Pf(e,t):Fo(t,n)}function Fo(e,t,n,i){return i??(i=!!(34&t)),e=El(e,t,bA,i),i=32,n&&(i|=2),tn(e,t=16769217&t|i),e}function Lf(e){const t=e.v,n=0|t[yt];return qn(e,n)?If(e,t,n)?Pf(e,t,!0):new e.constructor(Fo(t,n,!1)):e}function Oo(e){if(e.h!==Ms)return!1;var t=e.v;return Da(t=Fo(t,0|t[yt]),2048),e.v=t,e.h=void 0,e.m=void 0,!0}function ko(e){if(!Oo(e)&&qn(e,0|e.v[yt]))throw Error()}function As(e,t){t===void 0&&(t=0|e[yt]),32&t&&!(4096&t)&&tn(e,4096|t)}function If(e,t,n){return!!(2&n)||!(!(32&n)||4096&n)&&(tn(t,2|n),e.h=Ms,!0)}const k0=$n(0),Sr={};function we(e,t,n,i,r){if((t=lr(e.v,t,n,r))!==null||i&&e.m!==Ms)return t}function lr(e,t,n,i){if(t===-1)return null;const r=t+(n?0:-1),s=e.length-1;let o,a;if(!(s<1+(n?0:-1))){if(r>=s)if(o=e[s],o!=null&&typeof o=="object"&&o.constructor===Object)n=o[t],a=!0;else{if(r!==s)return;n=o}else n=e[r];if(i&&n!=null){if((i=i(n))==null)return i;if(!Object.is(i,n))return a?o[t]=i:e[r]=i,i}return n}}function de(e,t,n,i){ko(e),je(e=e.v,0|e[yt],t,n,i)}function je(e,t,n,i,r){const s=n+(r?0:-1);var o=e.length-1;if(o>=1+(r?0:-1)&&s>=o){const a=e[o];if(a!=null&&typeof a=="object"&&a.constructor===Object)return a[n]=i,t}return s<=o?(e[s]=i,t):(i!==void 0&&(n>=(o=(t??(t=0|e[yt]))>>14&1023||536870912)?i!=null&&(e[o+(r?0:-1)]={[n]:i}):e[s]=i),t)}function os(){return Qb===void 0?2:4}function as(e,t,n,i,r){let s=e.v,o=0|s[yt];i=qn(e,o)?1:i,r=!!r||i===3,i===2&&Oo(e)&&(s=e.v,o=0|s[yt]);let a=(e=Df(s,t))===bs?7:0|e[yt],c=Uf(a,o);var l=!(4&c);if(l){4&c&&(e=Si(e),a=0,c=hs(c,o),o=je(s,o,t,e));let u=0,h=0;for(;u<e.length;u++){const f=n(e[u]);f!=null&&(e[h++]=f)}h<u&&(e.length=h),n=-513&(4|c),c=n&=-1025,c&=-4097}return c!==a&&(tn(e,c),2&c&&Object.freeze(e)),B0(e,c,s,o,t,i,l,r)}function B0(e,t,n,i,r,s,o,a){let c=t;return s===1||s===4&&(2&t||!(16&t)&&32&i)?us(t)||((t|=!e.length||o&&!(4096&t)||32&i&&!(4096&t||16&t)?2:256)!==c&&tn(e,t),Object.freeze(e)):(s===2&&us(t)&&(e=Si(e),c=0,t=hs(t,i),i=je(n,i,r,e)),us(t)||(a||(t|=16),t!==c&&tn(e,t))),2&t||!(4096&t||16&t)||As(n,i),e}function Df(e,t,n){return e=lr(e,t,n),Array.isArray(e)?e:bs}function Uf(e,t){return 2&t&&(e|=2),1|e}function us(e){return!!(2&e)&&!!(4&e)||!!(256&e)}function z0(e){return bf(e,!0)}function G0(e){e=Si(e);for(let t=0;t<e.length;t++){const n=e[t]=Si(e[t]);Array.isArray(n[1])&&(n[1]=Ua(n[1]))}return Ma(e)}function br(e,t,n,i){ko(e),je(e=e.v,0|e[yt],t,(i==="0"?Number(n)===0:n===i)?void 0:n)}function Bo(e,t,n){if(2&t)throw Error();const i=Uo(t);let r=Df(e,n,i),s=r===bs?7:0|r[yt],o=Uf(s,t);return(2&o||us(o)||16&o)&&(o===s||us(o)||tn(r,o),r=Si(r),s=0,o=hs(o,t),je(e,t,n,r,i)),o&=-13,o!==s&&tn(r,o),r}function Lu(e,t){var n=I_;return Ff(Nf(e=e.v),e,void 0,n)===t?t:-1}function Nf(e){if(Do)return e[ta]??(e[ta]=new Map);if(ta in e)return e[ta];const t=new Map;return Object.defineProperty(e,ta,{value:t}),t}function V0(e,t,n,i,r){const s=Nf(e),o=Ff(s,e,t,n,r);return o!==i&&(o&&(t=je(e,t,o,void 0,r)),s.set(n,i)),t}function Ff(e,t,n,i,r){let s=e.get(i);if(s!=null)return s;s=0;for(let o=0;o<i.length;o++){const a=i[o];lr(t,a,r)!=null&&(s!==0&&(n=je(t,n,s,void 0,r)),s=a)}return e.set(i,s),s}function Of(e,t,n){let i=0|e[yt];const r=Uo(i),s=lr(e,n,r);let o;if(s!=null&&s[So]===Mo){if(!qn(s))return Oo(s),s.v;o=s.v}else Array.isArray(s)&&(o=s);if(o){const a=0|o[yt];2&a&&(o=Fo(o,a))}return o=ls(o,t),o!==s&&je(e,i,n,o,r),o}function H0(e,t,n,i,r){let s=!1;if((i=lr(e,i,r,o=>{const a=Rf(o,n,!1,t);return s=a!==o&&a!=null,a}))!=null)return s&&!qn(i)&&As(e,t),i}function Jt(e,t,n,i){let r=e.v,s=0|r[yt];if((t=H0(r,s,t,n,i))==null)return t;if(s=0|r[yt],!qn(e,s)){const o=Lf(t);o!==t&&(Oo(e)&&(r=e.v,s=0|r[yt]),s=je(r,s,n,t=o,i),As(r,s))}return t}function W0(e,t,n,i,r,s,o,a){var c=qn(e,n);s=c?1:s,o=!!o||s===3,c=a&&!c,(s===2||c)&&Oo(e)&&(n=0|(t=e.v)[yt]);var l=(e=Df(t,r))===bs?7:0|e[yt],u=Uf(l,n);if(a=!(4&u)){var h=e,f=n;const d=!!(2&u);d&&(f|=2);let g=!d,x=!0,p=0,m=0;for(;p<h.length;p++){const A=Rf(h[p],i,!1,f);if(A instanceof i){if(!d){const M=qn(A);g&&(g=!M),x&&(x=M)}h[m++]=A}}m<p&&(h.length=m),u|=4,u=x?-4097&u:4096|u,u=g?8|u:-9&u}if(u!==l&&(tn(e,u),2&u&&Object.freeze(e)),c&&!(8&u||!e.length&&(s===1||s===4&&(2&u||!(16&u)&&32&n)))){for(us(u)&&(e=Si(e),u=hs(u,n),n=je(t,n,r,e)),i=e,c=u,l=0;l<i.length;l++)(h=i[l])!==(u=Lf(h))&&(i[l]=u);c|=8,tn(e,u=c=i.length?4096|c:-4097&c)}return B0(e,u,t,n,r,s,a,o)}function ur(e,t,n){const i=e.v;return W0(e,i,0|i[yt],t,n,os(),!1,!0)}function X0(e){return e==null&&(e=void 0),e}function wt(e,t,n,i,r){return de(e,n,i=X0(i),r),i&&!qn(i)&&As(e.v),e}function ha(e,t,n,i){t:{var r=i=X0(i);ko(e);const s=e.v;let o=0|s[yt];if(r==null){const a=Nf(s);if(Ff(a,s,o,n)!==t)break t;a.set(n,0)}else o=V0(s,o,n,t);je(s,o,t,r)}i&&!qn(i)&&As(e.v)}function hs(e,t){return-273&(2&t?2|e:-3&e)}function kf(e,t,n,i){var r=i;ko(e),e=W0(e,i=e.v,0|i[yt],n,t,2,!0),r=r??new n,e.push(r),t=n=e===bs?7:0|e[yt],(r=qn(r))?(n&=-9,e.length===1&&(n&=-4097)):n|=4096,n!==t&&tn(e,n),r||As(i)}function oi(e,t,n){return No(we(e,t,void 0,n))}function Fe(e,t){return we(e,t,void 0,void 0,Ui)??0}function hr(e,t,n){if(n!=null){if(typeof n!="number"||!Sl(n))throw Uh("int32");n|=0}de(e,t,n)}function Tt(e,t,n){de(e,t,oa(n))}function Yn(e,t,n){br(e,t,Oa(n),"")}function il(e,t,n){{ko(e);const o=e.v;let a=0|o[yt];if(n==null)je(o,a,t);else{var i=e=n===bs?7:0|n[yt],r=us(e),s=r||Object.isFrozen(n);for(r||(e=0),s||(n=Si(n),i=0,e=hs(e,a),s=!1),e|=5,e|=(4&e?512&e?512:1024&e?1024:0:void 0)??1024,r=0;r<n.length;r++){const c=n[r],l=N0(c);Object.is(c,l)||(s&&(n=Si(n),i=0,e=hs(e,a),s=!1),n[r]=l)}e!==i&&(s&&(n=Si(n),e=hs(e,a)),tn(n,e)),je(o,a,t,n)}}}function bl(e,t,n){ko(e),as(e,t,cn,2,!0).push(N0(n))}var qs=class{constructor(e,t,n){if(this.buffer=e,n&&!t)throw Error();this.g=t}};function Bf(e,t){if(typeof e=="string")return new qs(y0(e),t);if(Array.isArray(e))return new qs(new Uint8Array(e),t);if(e.constructor===Uint8Array)return new qs(e,!1);if(e.constructor===ArrayBuffer)return e=new Uint8Array(e),new qs(e,!1);if(e.constructor===Ni)return t=Ef(e)||new Uint8Array(0),new qs(t,!0,e);if(e instanceof Uint8Array)return e=e.constructor===Uint8Array?e:new Uint8Array(e.buffer,e.byteOffset,e.byteLength),new qs(e,!1);throw Error()}function zf(e,t){let n,i=0,r=0,s=0;const o=e.h;let a=e.g;do n=o[a++],i|=(127&n)<<s,s+=7;while(s<32&&128&n);if(s>32)for(r|=(127&n)>>4,s=3;s<32&&128&n;s+=7)n=o[a++],r|=(127&n)<<s;if(fs(e,a),!(128&n))return t(i>>>0,r>>>0);throw Error()}function Gf(e){let t=0,n=e.g;const i=n+10,r=e.h;for(;n<i;){const s=r[n++];if(t|=s,(128&s)==0)return fs(e,n),!!(127&t)}throw Error()}function kr(e){const t=e.h;let n=e.g,i=t[n++],r=127&i;if(128&i&&(i=t[n++],r|=(127&i)<<7,128&i&&(i=t[n++],r|=(127&i)<<14,128&i&&(i=t[n++],r|=(127&i)<<21,128&i&&(i=t[n++],r|=i<<28,128&i&&128&t[n++]&&128&t[n++]&&128&t[n++]&&128&t[n++]&&128&t[n++])))))throw Error();return fs(e,n),r}function Oi(e){return kr(e)>>>0}function rl(e){var t=e.h;const n=e.g;var i=t[n],r=t[n+1];const s=t[n+2];return t=t[n+3],fs(e,e.g+4),e=2*((r=(i<<0|r<<8|s<<16|t<<24)>>>0)>>31)+1,i=r>>>23&255,r&=8388607,i==255?r?NaN:e*(1/0):i==0?1401298464324817e-60*e*r:e*Math.pow(2,i-150)*(r+8388608)}function AA(e){return kr(e)}function fs(e,t){if(e.g=t,t>e.l)throw Error()}function $0(e,t){if(t<0)throw Error();const n=e.g;if((t=n+t)>e.l)throw Error();return e.g=t,n}function q0(e,t){if(t==0)return Ss();var n=$0(e,t);return e.Y&&e.j?n=e.h.subarray(n,n+t):(e=e.h,n=n===(t=n+t)?new Uint8Array(0):oA?e.slice(n,t):new Uint8Array(e.subarray(n,t))),n.length==0?Ss():new Ni(n,xo)}var fm=[];function Y0(e,t,n,i){if(sl.length){const r=sl.pop();return r.o(i),r.g.init(e,t,n,i),r}return new TA(e,t,n,i)}function K0(e){e.g.clear(),e.l=-1,e.h=-1,sl.length<100&&sl.push(e)}function j0(e){var t=e.g;if(t.g==t.l)return!1;e.m=e.g.g;var n=Oi(e.g);if(t=n>>>3,!((n&=7)>=0&&n<=5)||t<1)throw Error();return e.l=t,e.h=n,!0}function Vc(e){switch(e.h){case 0:e.h!=0?Vc(e):Gf(e.g);break;case 1:fs(e=e.g,e.g+8);break;case 2:if(e.h!=2)Vc(e);else{var t=Oi(e.g);fs(e=e.g,e.g+t)}break;case 5:fs(e=e.g,e.g+4);break;case 3:for(t=e.l;;){if(!j0(e))throw Error();if(e.h==4){if(e.l!=t)throw Error();break}Vc(e)}break;default:throw Error()}}function ka(e,t,n){const i=e.g.l;var r=Oi(e.g);let s=(r=e.g.g+r)-i;if(s<=0&&(e.g.l=r,n(t,e,void 0,void 0,void 0),s=r-e.g.g),s)throw Error();return e.g.g=r,e.g.l=i,t}function Vf(e){var t=Oi(e.g),n=$0(e=e.g,t);if(e=e.h,Bb){var i,r=e;(i=Cu)||(i=Cu=new TextDecoder("utf-8",{fatal:!0})),t=n+t,r=n===0&&t===r.length?r:r.subarray(n,t);try{var s=i.decode(r)}catch(a){if(yc===void 0){try{i.decode(new Uint8Array([128]))}catch{}try{i.decode(new Uint8Array([97])),yc=!0}catch{yc=!1}}throw!yc&&(Cu=void 0),a}}else{t=(s=n)+t,n=[];let a,c=null;for(;s<t;){var o=e[s++];o<128?n.push(o):o<224?s>=t?Kr():(a=e[s++],o<194||(192&a)!=128?(s--,Kr()):n.push((31&o)<<6|63&a)):o<240?s>=t-1?Kr():(a=e[s++],(192&a)!=128||o===224&&a<160||o===237&&a>=160||(192&(i=e[s++]))!=128?(s--,Kr()):n.push((15&o)<<12|(63&a)<<6|63&i)):o<=244?s>=t-2?Kr():(a=e[s++],(192&a)!=128||a-144+(o<<28)>>30||(192&(i=e[s++]))!=128||(192&(r=e[s++]))!=128?(s--,Kr()):(o=(7&o)<<18|(63&a)<<12|(63&i)<<6|63&r,o-=65536,n.push(55296+(o>>10&1023),56320+(1023&o)))):Kr(),n.length>=8192&&(c=Kp(c,n),n.length=0)}s=Kp(c,n)}return s}function Z0(e){const t=Oi(e.g);return q0(e.g,t)}function Al(e,t,n){var i=Oi(e.g);for(i=e.g.g+i;e.g.g<i;)n.push(t(e.g))}var TA=class{constructor(e,t,n,i){if(fm.length){const r=fm.pop();r.init(e,t,n,i),e=r}else e=new class{constructor(r,s,o,a){this.h=null,this.j=!1,this.g=this.l=this.m=0,this.init(r,s,o,a)}init(r,s,o,{Y:a=!1,ea:c=!1}={}){this.Y=a,this.ea=c,r&&(r=Bf(r,this.ea),this.h=r.buffer,this.j=r.g,this.m=s||0,this.l=o!==void 0?this.m+o:this.h.length,this.g=this.m)}clear(){this.h=null,this.j=!1,this.g=this.l=this.m=0,this.Y=!1}}(e,t,n,i);this.g=e,this.m=this.g.g,this.h=this.l=-1,this.o(i)}o({ha:e=!1}={}){this.ha=e}},sl=[];function dm(e){return e?/^\d+$/.test(e)?(yl(e),new kh(Ae,He)):null:wA||(wA=new kh(0,0))}var kh=class{constructor(e,t){this.h=e>>>0,this.g=t>>>0}};let wA;function pm(e){return e?/^-?\d+$/.test(e)?(yl(e),new Bh(Ae,He)):null:CA||(CA=new Bh(0,0))}var Bh=class{constructor(e,t){this.h=e>>>0,this.g=t>>>0}};let CA;function ao(e,t,n){for(;n>0||t>127;)e.g.push(127&t|128),t=(t>>>7|n<<25)>>>0,n>>>=7;e.g.push(t)}function zo(e,t){for(;t>127;)e.g.push(127&t|128),t>>>=7;e.g.push(t)}function Tl(e,t){if(t>=0)zo(e,t);else{for(let n=0;n<9;n++)e.g.push(127&t|128),t>>=7;e.g.push(1)}}function Hf(e){var t=Ae;e.g.push(t>>>0&255),e.g.push(t>>>8&255),e.g.push(t>>>16&255),e.g.push(t>>>24&255)}function Ao(e,t){t.length!==0&&(e.l.push(t),e.h+=t.length)}function ai(e,t,n){zo(e.g,8*t+n)}function Wf(e,t){return ai(e,t,2),t=e.g.end(),Ao(e,t),t.push(e.h),t}function Xf(e,t){var n=t.pop();for(n=e.h+e.g.length()-n;n>127;)t.push(127&n|128),n>>>=7,e.h++;t.push(n),e.h++}function wl(e,t,n){ai(e,t,2),zo(e.g,n.length),Ao(e,e.g.end()),Ao(e,n)}function ol(e,t,n,i){n!=null&&(t=Wf(e,t),i(n,e),Xf(e,t))}function Gi(){const e=class{constructor(){throw Error()}};return Object.setPrototypeOf(e,e.prototype),e}var $f=Gi(),J0=Gi(),qf=Gi(),Yf=Gi(),Kf=Gi(),Q0=Gi(),RA=Gi(),Cl=Gi(),t_=Gi(),e_=Gi();function Vi(e,t,n){var i=e.v;Xn&&Xn in i&&(i=i[Xn])&&delete i[t.g],t.h?t.j(e,t.h,t.g,n,t.l):t.j(e,t.g,n,t.l)}var St=class{constructor(e,t){this.v=O0(e,t,void 0,2048)}toJSON(){return F0(this)}j(){var r;var e=uT,t=this.v,n=e.g,i=Xn;if(Do&&i&&((r=t[i])==null?void 0:r[n])!=null&&yo(jb,3),t=e.g,em&&Xn&&em===void 0&&(i=(n=this.v)[Xn])&&(i=i.da))try{i(n,t,xA)}catch(s){g0(s)}return e.h?e.m(this,e.h,e.g,e.l):e.m(this,e.g,e.defaultValue,e.l)}clone(){const e=this.v,t=0|e[yt];return If(this,e,t)?Pf(this,e,!0):new this.constructor(Fo(e,t,!1))}};St.prototype[So]=Mo,St.prototype.toString=function(){return this.v.toString()};var Go=class{constructor(e,t,n){this.g=e,this.h=t,e=$f,this.l=!!e&&n===e||!1}};function Rl(e,t){return new Go(e,t,$f)}function n_(e,t,n,i,r){ol(e,n,o_(t,i),r)}const PA=Rl(function(e,t,n,i,r){return e.h===2&&(ka(e,Of(t,i,n),r),!0)},n_),LA=Rl(function(e,t,n,i,r){return e.h===2&&(ka(e,Of(t,i,n),r),!0)},n_);var Pl=Symbol(),Ll=Symbol(),zh=Symbol(),mm=Symbol(),gm=Symbol();let i_,r_;function Ts(e,t,n,i){var r=i[e];if(r)return r;(r={}).qa=i,r.T=function(h){switch(typeof h){case"boolean":return MA||(MA=[0,void 0,!0]);case"number":return h>0?void 0:h===0?EA||(EA=[0,void 0]):[-h,void 0];case"string":return[0,h];case"object":return h}}(i[0]);var s=i[1];let o=1;s&&s.constructor===Object&&(r.ba=s,typeof(s=i[++o])=="function"&&(r.ma=!0,i_??(i_=s),r_??(r_=i[o+1]),s=i[o+=2]));const a={};for(;s&&Array.isArray(s)&&s.length&&typeof s[0]=="number"&&s[0]>0;){for(var c=0;c<s.length;c++)a[s[c]]=s;s=i[++o]}for(c=1;s!==void 0;){let h;typeof s=="number"&&(c+=s,s=i[++o]);var l=void 0;if(s instanceof Go?h=s:(h=PA,o--),h==null?void 0:h.l){s=i[++o],l=i;var u=o;typeof s=="function"&&(s=s(),l[u]=s),l=s}for(u=c+1,typeof(s=i[++o])=="number"&&s<0&&(u-=s,s=i[++o]);c<u;c++){const f=a[c];l?n(r,c,h,l,f):t(r,c,h,f)}}return i[e]=r}function s_(e){return Array.isArray(e)?e[0]instanceof Go?e:[LA,e]:[e,void 0]}function o_(e,t){return e instanceof St?e.v:Array.isArray(e)?ls(e,t):void 0}function jf(e,t,n,i){const r=n.g;e[t]=i?(s,o,a)=>r(s,o,a,i):r}function Zf(e,t,n,i,r){const s=n.g;let o,a;e[t]=(c,l,u)=>s(c,l,u,a||(a=Ts(Ll,jf,Zf,i).T),o||(o=Jf(i)),r)}function Jf(e){let t=e[zh];if(t!=null)return t;const n=Ts(Ll,jf,Zf,e);return t=n.ma?(i,r)=>i_(i,r,n):(i,r)=>{for(;j0(r)&&r.h!=4;){var s=r.l,o=n[s];if(o==null){var a=n.ba;a&&(a=a[s])&&(a=DA(a))!=null&&(o=n[s]=a)}if(o==null||!o(r,i,s)){if(o=(a=r).m,Vc(a),a.ha)var c=void 0;else c=a.g.g-o,a.g.g=o,c=q0(a.g,c);o=void 0,a=i,c&&((o=a[Xn]??(a[Xn]=new Oh))[s]??(o[s]=[])).push(c)}}return(i=Ml(i))&&(i.da=n.qa[gm]),!0},e[zh]=t,e[gm]=IA.bind(e),t}function IA(e,t,n,i){var r=this[Ll];const s=this[zh],o=ls(void 0,r.T),a=Ml(e);if(a){var c=!1,l=r.ba;if(l){if(r=(u,h,f)=>{if(f.length!==0)if(l[h])for(const d of f){u=Y0(d);try{c=!0,s(o,u)}finally{K0(u)}}else i==null||i(e,h,f)},t==null)nl(a,r);else if(a!=null){const u=a[t];u&&r(a,t,u)}if(c){let u=0|e[yt];if(2&u&&2048&u&&!(n!=null&&n.Ka))throw Error();const h=Uo(u),f=(d,g)=>{if(lr(e,d,h)!=null){if((n==null?void 0:n.Qa)===1)return;throw Error()}g!=null&&(u=je(e,u,d,g,h)),delete a[d]};t==null?A0(o,0|o[yt],(d,g)=>{f(d,g)}):f(t,lr(o,t,h))}}}}function DA(e){const t=(e=s_(e))[0].g;if(e=e[1]){const n=Jf(e),i=Ts(Ll,jf,Zf,e).T;return(r,s,o)=>t(r,s,o,i,n)}return t}function Il(e,t,n){e[t]=n.h}function Dl(e,t,n,i){let r,s;const o=n.h;e[t]=(a,c,l)=>o(a,c,l,s||(s=Ts(Pl,Il,Dl,i).T),r||(r=a_(i)))}function a_(e){let t=e[mm];if(!t){const n=Ts(Pl,Il,Dl,e);t=(i,r)=>c_(i,r,n),e[mm]=t}return t}function c_(e,t,n){A0(e,0|e[yt],(i,r)=>{if(r!=null){var s=function(o,a){var c=o[a];if(c)return c;if((c=o.ba)&&(c=c[a])){var l=(c=s_(c))[0].h;if(c=c[1]){const u=a_(c),h=Ts(Pl,Il,Dl,c).T;c=o.ma?r_(h,u):(f,d,g)=>l(f,d,g,h,u)}else c=l;return o[a]=c}}(n,i);s?s(t,r,i):i<500||yo(Nh,3)}}),(e=Ml(e))&&nl(e,(i,r,s)=>{for(Ao(t,t.g.end()),i=0;i<s.length;i++)Ao(t,Ef(s[i])||new Uint8Array(0))})}const UA=$n(0);function Vo(e,t){if(Array.isArray(t)){var n=0|t[yt];if(4&n)return t;for(var i=0,r=0;i<t.length;i++){const s=e(t[i]);s!=null&&(t[r++]=s)}return r<i&&(t.length=r),(e=-1537&(5|n))!==n&&tn(t,e),2&e&&Object.freeze(t),t}}function mn(e,t,n){return new Go(e,t,n)}function Ho(e,t,n){return new Go(e,t,n)}function gn(e,t,n){je(e,0|e[yt],t,n,Uo(0|e[yt]))}var NA=Rl(function(e,t,n,i,r){if(e.h!==2)return!1;if(e=Si(e=ka(e,ls([void 0,void 0],i),r)),r=Uo(i=0|t[yt]),2&i)throw Error();let s=lr(t,n,r);if(s instanceof cr)2&s.J?(s=s.V(),s.push(e),je(t,i,n,s,r)):s.Ma(e);else if(Array.isArray(s)){var o=0|s[yt];8192&o||tn(s,o|=8192),2&o&&(s=G0(s),je(t,i,n,s,r)),s.push(e)}else je(t,i,n,Ma([e]),r);return!0},function(e,t,n,i,r){if(t instanceof cr)t.forEach((s,o)=>{ol(e,n,ls([o,s],i),r)});else if(Array.isArray(t)){for(let s=0;s<t.length;s++){const o=t[s];Array.isArray(o)&&ol(e,n,ls(o,i),r)}Ma(t)}});function l_(e,t,n){(t=Ui(t))!=null&&(ai(e,n,5),e=e.g,Af(t),Hf(e))}function u_(e,t,n){if(t=function(i){if(i==null)return i;const r=typeof i;if(r==="bigint")return String(Na(64,i));if(Fa(i)){if(r==="string")return I0(i);if(r==="number")return Cf(i)}}(t),t!=null&&(typeof t=="string"&&pm(t),t!=null))switch(ai(e,n,0),typeof t){case"number":e=e.g,Eo(t),ao(e,Ae,He);break;case"bigint":n=BigInt.asUintN(64,t),n=new Bh(Number(n&BigInt(4294967295)),Number(n>>BigInt(32))),ao(e.g,n.h,n.g);break;default:n=pm(t),ao(e.g,n.h,n.g)}}function h_(e,t,n){(t=No(t))!=null&&t!=null&&(ai(e,n,0),Tl(e.g,t))}function f_(e,t,n){(t=R0(t))!=null&&(ai(e,n,0),e.g.g.push(t?1:0))}function d_(e,t,n){(t=cn(t))!=null&&wl(e,n,m0(t))}function p_(e,t,n,i,r){ol(e,n,o_(t,i),r)}function m_(e,t,n){(t=t==null||typeof t=="string"||t instanceof Ni?t:void 0)!=null&&wl(e,n,Bf(t,!0).buffer)}function g_(e,t,n){(t=P0(t))!=null&&t!=null&&(ai(e,n,0),zo(e.g,t))}function __(e,t,n){return(e.h===5||e.h===2)&&(t=Bo(t,0|t[yt],n),e.h==2?Al(e,rl,t):t.push(rl(e.g)),!0)}var We=mn(function(e,t,n){return e.h===5&&(gn(t,n,rl(e.g)),!0)},l_,Cl),FA=Ho(__,function(e,t,n){if((t=Vo(Ui,t))!=null)for(let o=0;o<t.length;o++){var i=e,r=n,s=t[o];s!=null&&(ai(i,r,5),i=i.g,Af(s),Hf(i))}},Cl),Qf=Ho(__,function(e,t,n){if((t=Vo(Ui,t))!=null&&t.length){ai(e,n,2),zo(e.g,4*t.length);for(let i=0;i<t.length;i++)n=e.g,Af(t[i]),Hf(n)}},Cl),OA=mn(function(e,t,n){return e.h===5&&(gn(t,n,(e=rl(e.g))===0?void 0:e),!0)},l_,Cl),Br=mn(function(e,t,n){return e.h!==0?e=!1:(gn(t,n,zf(e.g,C0)),e=!0),e},u_,Q0),Iu=mn(function(e,t,n){return e.h!==0?t=!1:(gn(t,n,(e=zf(e.g,C0))===UA?void 0:e),t=!0),t},u_,Q0),kA=mn(function(e,t,n){return e.h!==0?e=!1:(gn(t,n,zf(e.g,cA)),e=!0),e},function(e,t,n){if(t=function(i){if(i==null)return i;var r=typeof i;if(r==="bigint")return String(lA(64,i));if(Fa(i)){if(r==="string")return r=bo(Number(i)),Es(r)&&r>=0?i=String(r):((r=i.indexOf("."))!==-1&&(i=i.substring(0,r)),(r=i[0]!=="-"&&((r=i.length)<20||r===20&&i<="18446744073709551615"))||(yl(i),i=Ea(Ae,He))),i;if(r==="number")return(i=bo(i))>=0&&Es(i)||(Eo(i),i=w0(Ae,He)),i}}(t),t!=null&&(typeof t=="string"&&dm(t),t!=null))switch(ai(e,n,0),typeof t){case"number":e=e.g,Eo(t),ao(e,Ae,He);break;case"bigint":n=BigInt.asUintN(64,t),n=new kh(Number(n&BigInt(4294967295)),Number(n>>BigInt(32))),ao(e.g,n.h,n.g);break;default:n=dm(t),ao(e.g,n.h,n.g)}},RA),Ye=mn(function(e,t,n){return e.h===0&&(gn(t,n,kr(e.g)),!0)},h_,Yf),Ba=Ho(function(e,t,n){return(e.h===0||e.h===2)&&(t=Bo(t,0|t[yt],n),e.h==2?Al(e,kr,t):t.push(kr(e.g)),!0)},function(e,t,n){if((t=Vo(No,t))!=null&&t.length){n=Wf(e,n);for(let i=0;i<t.length;i++)Tl(e.g,t[i]);Xf(e,n)}},Yf),Qs=mn(function(e,t,n){return e.h===0&&(gn(t,n,(e=kr(e.g))===0?void 0:e),!0)},h_,Yf),Ce=mn(function(e,t,n){return e.h===0&&(gn(t,n,Gf(e.g)),!0)},f_,J0),ds=mn(function(e,t,n){return e.h===0&&(gn(t,n,(e=Gf(e.g))===!1?void 0:e),!0)},f_,J0),hn=Ho(function(e,t,n){return e.h===2&&(e=Vf(e),Bo(t,0|t[yt],n).push(e),!0)},function(e,t,n){if((t=Vo(cn,t))!=null)for(let o=0;o<t.length;o++){var i=e,r=n,s=t[o];s!=null&&wl(i,r,m0(s))}},qf),wr=mn(function(e,t,n){return e.h===2&&(gn(t,n,(e=Vf(e))===""?void 0:e),!0)},d_,qf),pe=mn(function(e,t,n){return e.h===2&&(gn(t,n,Vf(e)),!0)},d_,qf),sn=function(e,t,n=$f){return new Go(e,t,n)}(function(e,t,n,i,r){return e.h===2&&(i=ls(void 0,i),Bo(t,0|t[yt],n).push(i),ka(e,i,r),!0)},function(e,t,n,i,r){if(Array.isArray(t)){for(let s=0;s<t.length;s++)p_(e,t[s],n,i,r);1&(e=0|t[yt])||tn(t,1|e)}}),Se=Rl(function(e,t,n,i,r,s){if(e.h!==2)return!1;let o=0|t[yt];return V0(t,o,s,n,Uo(o)),ka(e,t=Of(t,i,n),r),!0},p_),v_=mn(function(e,t,n){return e.h===2&&(gn(t,n,Z0(e)),!0)},m_,t_),BA=Ho(function(e,t,n){return(e.h===0||e.h===2)&&(t=Bo(t,0|t[yt],n),e.h==2?Al(e,Oi,t):t.push(Oi(e.g)),!0)},function(e,t,n){if((t=Vo(P0,t))!=null)for(let o=0;o<t.length;o++){var i=e,r=n,s=t[o];s!=null&&(ai(i,r,0),zo(i.g,s))}},Kf),zA=mn(function(e,t,n){return e.h===0&&(gn(t,n,(e=Oi(e.g))===0?void 0:e),!0)},g_,Kf),dn=mn(function(e,t,n){return e.h===0&&(gn(t,n,kr(e.g)),!0)},function(e,t,n){(t=No(t))!=null&&(t=parseInt(t,10),ai(e,n,0),Tl(e.g,t))},e_);class GA{constructor(t,n){var i=jn;this.g=t,this.h=n,this.m=Jt,this.j=wt,this.defaultValue=void 0,this.l=i.Oa!=null?T0:void 0}register(){_l(this)}}function Hi(e,t){return new GA(e,t)}function Gr(e,t){return(n,i)=>{{const s={ea:!0};i&&Object.assign(s,i),n=Y0(n,void 0,void 0,s);try{const o=new e,a=o.v;Jf(t)(a,n);var r=o}finally{K0(n)}}return r}}function Ul(e){return function(){const t=new class{constructor(){this.l=[],this.h=0,this.g=new class{constructor(){this.g=[]}length(){return this.g.length}end(){const o=this.g;return this.g=[],o}}}};c_(this.v,t,Ts(Pl,Il,Dl,e)),Ao(t,t.g.end());const n=new Uint8Array(t.h),i=t.l,r=i.length;let s=0;for(let o=0;o<r;o++){const a=i[o];n.set(a,s),s+=a.length}return t.l=[n],n}}var _m=class extends St{constructor(e){super(e)}},vm=[0,wr,mn(function(e,t,n){return e.h===2&&(gn(t,n,(e=Z0(e))===Ss()?void 0:e),!0)},function(e,t,n){if(t!=null){if(t instanceof St){const i=t.Ra;return void(i?(t=i(t),t!=null&&wl(e,n,Bf(t,!0).buffer)):yo(Nh,3))}if(Array.isArray(t))return void yo(Nh,3)}m_(e,t,n)},t_)];let Du,xm=globalThis.trustedTypes;function ym(e){var t;return Du===void 0&&(Du=function(){let n=null;if(!xm)return n;try{const i=r=>r;n=xm.createPolicy("goog#html",{createHTML:i,createScript:i,createScriptURL:i})}catch{}return n}()),e=(t=Du)?t.createScriptURL(e):e,new class{constructor(n){this.g=n}toString(){return this.g+""}}(e)}function Sc(e,...t){if(t.length===0)return ym(e[0]);let n=e[0];for(let i=0;i<t.length;i++)n+=encodeURIComponent(t[i])+e[i+1];return ym(n)}var x_=[0,Ye,dn,Ce,-1,Ba,dn,-1,Ce],VA=class extends St{constructor(e){super(e)}},y_=[0,Ce,pe,Ce,dn,-1,Ho(function(e,t,n){return(e.h===0||e.h===2)&&(t=Bo(t,0|t[yt],n),e.h==2?Al(e,AA,t):t.push(kr(e.g)),!0)},function(e,t,n){if((t=Vo(No,t))!=null&&t.length){n=Wf(e,n);for(let i=0;i<t.length;i++)Tl(e.g,t[i]);Xf(e,n)}},e_),pe,-1,[0,Ce,-1],dn,Ce,-1],S_=[0,3,Ce,-1,2,[0,[2],Ye,Se,[0,mn(function(e,t,n){return e.h===0&&(gn(t,n,Oi(e.g)),!0)},g_,Kf)]],[0,dn,Ce,dn,Ce,dn,Ce,pe,-1],[0,[3,4],pe,-1,Se,[0,Ye],Se,[0,dn]],[0]],M_=[0,pe,-2],Sm=class extends St{constructor(e){super(e)}},E_=[0],b_=[0,Ye,Ce,1,Ce,-4],jn=class extends St{constructor(e){super(e,2)}},Ze={};Ze[336783863]=[0,pe,Ce,-1,Ye,[0,[1,2,3,4,5,6,7,8,9],Se,E_,Se,y_,Se,M_,Se,b_,Se,x_,Se,[0,pe,-2],Se,[0,pe,dn],Se,S_,Se,[0,dn,-1,Ce]],[0,pe],Ce,[0,[1,3],[2,4],Se,[0,Ba],-1,Se,[0,hn],-1,sn,[0,pe,-1]],pe];var Mm=[0,Iu,-1,ds,-3,Iu,Ba,wr,Qs,Iu,-1,ds,Qs,ds,-2,wr];function Ee(e,t){bl(e,3,t)}function Wt(e,t){bl(e,4,t)}var In=class extends St{constructor(e){super(e,500)}o(e){return wt(this,0,7,e)}},fa=[-1,{}],Em=[0,pe,1,fa],bm=[0,pe,hn,fa];function ci(e,t){kf(e,1,In,t)}function Pe(e,t){bl(e,10,t)}function ne(e,t){bl(e,15,t)}var Zn=class extends St{constructor(e){super(e,500)}o(e){return wt(this,0,1001,e)}},A_=[-500,sn,[-500,wr,-1,hn,-3,[-2,Ze,Ce],sn,vm,Qs,-1,Em,bm,sn,[0,wr,ds],wr,Mm,Qs,hn,987,hn],4,sn,[-500,pe,-1,[-1,{}],998,pe],sn,[-500,pe,hn,-1,[-2,{},Ce],997,hn,-1],Qs,sn,[-500,pe,hn,fa,998,hn],hn,Qs,Em,bm,sn,[0,wr,-1,fa],hn,-2,Mm,wr,-1,ds,[0,ds,zA],978,fa,sn,vm];Zn.prototype.g=Ul(A_);var HA=Gr(Zn,A_),WA=class extends St{constructor(e){super(e)}},T_=class extends St{constructor(e){super(e)}g(){return ur(this,WA,1)}},w_=[0,sn,[0,Ye,We,pe,-1]],Nl=Gr(T_,w_),XA=class extends St{constructor(e){super(e)}},$A=class extends St{constructor(e){super(e)}},Uu=class extends St{constructor(e){super(e)}l(){return Jt(this,XA,2)}g(){return ur(this,$A,5)}},C_=Gr(class extends St{constructor(e){super(e)}},[0,hn,Ba,Qf,[0,dn,[0,Ye,-3],[0,We,-3],[0,Ye,-1,[0,sn,[0,Ye,-2]]],sn,[0,We,-1,pe,We]],pe,-1,Br,sn,[0,Ye,We],hn,Br]),R_=class extends St{constructor(e){super(e)}},co=Gr(class extends St{constructor(e){super(e)}},[0,sn,[0,We,-4]]),P_=class extends St{constructor(e){super(e)}},za=Gr(class extends St{constructor(e){super(e)}},[0,sn,[0,We,-4]]),qA=class extends St{constructor(e){super(e)}},YA=[0,Ye,-1,Qf,dn],L_=class extends St{constructor(e){super(e)}};L_.prototype.g=Ul([0,We,-4,Br]);var KA=class extends St{constructor(e){super(e)}},jA=Gr(class extends St{constructor(e){super(e)}},[0,sn,[0,1,Ye,pe,w_],Br]),Am=class extends St{constructor(e){super(e)}},ZA=class extends St{constructor(e){super(e)}na(){const e=we(this,1,void 0,void 0,z0);return e??Ss()}},JA=class extends St{constructor(e){super(e)}},I_=[1,2],QA=Gr(class extends St{constructor(e){super(e)}},[0,sn,[0,I_,Se,[0,Qf],Se,[0,v_],Ye,pe],Br]),td=class extends St{constructor(e){super(e)}},D_=[0,pe,Ye,We,hn,-1],Tm=class extends St{constructor(e){super(e)}},tT=[0,Ce,-1],wm=class extends St{constructor(e){super(e)}},Hc=[1,2,3,4,5,6],al=class extends St{constructor(e){super(e)}g(){return we(this,1,void 0,void 0,z0)!=null}l(){return cn(we(this,2))!=null}},Ue=class extends St{constructor(e){super(e)}g(){return R0(we(this,2))??!1}},U_=[0,v_,pe,[0,Ye,Br,-1],[0,kA,Br]],$e=[0,U_,Ce,[0,Hc,Se,b_,Se,y_,Se,x_,Se,E_,Se,M_,Se,S_],dn],Fl=class extends St{constructor(e){super(e)}},ed=[0,$e,We,-1,Ye],eT=Hi(502141897,Fl);Ze[502141897]=ed;var nT=Gr(class extends St{constructor(e){super(e)}},[0,[0,dn,-1,FA,BA],YA]),N_=class extends St{constructor(e){super(e)}},F_=class extends St{constructor(e){super(e)}},Gh=[0,$e,We,[0,$e],Ce],iT=Hi(508968150,F_);Ze[508968150]=[0,$e,ed,Gh,We,[0,[0,U_]]],Ze[508968149]=Gh;var Ys=class extends St{constructor(e){super(e)}l(){return Jt(this,td,2)}g(){de(this,2)}},O_=[0,$e,D_];Ze[478825465]=O_;var rT=class extends St{constructor(e){super(e)}},k_=class extends St{constructor(e){super(e)}},nd=class extends St{constructor(e){super(e)}},id=class extends St{constructor(e){super(e)}},B_=class extends St{constructor(e){super(e)}},Cm=[0,$e,[0,$e],O_,-1],z_=[0,$e,We,Ye],rd=[0,$e,We],G_=[0,$e,z_,rd,We],sT=Hi(479097054,B_);Ze[479097054]=[0,$e,G_,Cm],Ze[463370452]=Cm,Ze[464864288]=z_;var oT=Hi(462713202,id);Ze[462713202]=G_,Ze[474472470]=rd;var aT=class extends St{constructor(e){super(e)}},V_=class extends St{constructor(e){super(e)}},H_=class extends St{constructor(e){super(e)}},W_=class extends St{constructor(e){super(e)}},sd=[0,$e,We,-1,Ye],Vh=[0,$e,We,Ce];W_.prototype.g=Ul([0,$e,rd,[0,$e],ed,Gh,sd,Vh]);var X_=class extends St{constructor(e){super(e)}},cT=Hi(456383383,X_);Ze[456383383]=[0,$e,D_];var $_=class extends St{constructor(e){super(e)}},lT=Hi(476348187,$_);Ze[476348187]=[0,$e,tT];var q_=class extends St{constructor(e){super(e)}},Rm=class extends St{constructor(e){super(e)}},Y_=[0,dn,-1],uT=Hi(458105876,class extends St{constructor(e){super(e)}g(){let e;var t=this.v;const n=0|t[yt];return e=qn(this,n),t=function(i,r,s,o){var a=Rm;!o&&Oo(i)&&(s=0|(r=i.v)[yt]);var c=lr(r,2);if(i=!1,c==null){if(o)return lm();c=[]}else if(c.constructor===cr){if(!(2&c.J)||o)return c;c=c.V()}else Array.isArray(c)?i=!!(2&(0|c[yt])):c=[];if(o){if(!c.length)return lm();i||(i=!0,Ua(c))}else i&&(i=!1,Ma(c),c=G0(c));return!i&&32&s&&Da(c,32),s=je(r,s,2,o=new cr(c,a,fA,void 0)),i||As(r,s),o}(this,t,n,e),!e&&Rm&&(t.ra=!0),t}});Ze[458105876]=[0,Y_,NA,[!0,Br,[0,pe,-1,hn]],[0,Ba,Ce,dn]];var od=class extends St{constructor(e){super(e)}},K_=Hi(458105758,od);Ze[458105758]=[0,$e,pe,Y_];var Nu=class extends St{constructor(e){super(e)}},Pm=[0,OA,-1,ds],hT=class extends St{constructor(e){super(e)}},j_=class extends St{constructor(e){super(e)}},Hh=[1,2];j_.prototype.g=Ul([0,Hh,Se,Pm,Se,[0,sn,Pm]]);var Z_=class extends St{constructor(e){super(e)}},fT=Hi(443442058,Z_);Ze[443442058]=[0,$e,pe,Ye,We,hn,-1,Ce,We],Ze[514774813]=sd;var J_=class extends St{constructor(e){super(e)}},dT=Hi(516587230,J_);function Wh(e,t){return t=t?t.clone():new td,e.displayNamesLocale!==void 0?de(t,1,Oa(e.displayNamesLocale)):e.displayNamesLocale===void 0&&de(t,1),e.maxResults!==void 0?hr(t,2,e.maxResults):"maxResults"in e&&de(t,2),e.scoreThreshold!==void 0?Tt(t,3,e.scoreThreshold):"scoreThreshold"in e&&de(t,3),e.categoryAllowlist!==void 0?il(t,4,e.categoryAllowlist):"categoryAllowlist"in e&&de(t,4),e.categoryDenylist!==void 0?il(t,5,e.categoryDenylist):"categoryDenylist"in e&&de(t,5),t}function Q_(e){const t=Number(e);return Number.isSafeInteger(t)?t:String(e)}function ad(e,t=-1,n=""){return{categories:e.map(i=>({index:oi(i,1)??0??-1,score:Fe(i,2)??0,categoryName:cn(we(i,3))??""??"",displayName:cn(we(i,4))??""??""})),headIndex:t,headName:n}}function pT(e){const t={classifications:ur(e,KA,1).map(n=>{var i;return ad(((i=Jt(n,T_,4))==null?void 0:i.g())??[],oi(n,2)??0,cn(we(n,3))??"")})};return function(n){return n==null?n:typeof n=="bigint"?(Fh(n)?n=Number(n):(n=Na(64,n),n=Fh(n)?Number(n):String(n)),n):Fa(n)?typeof n=="number"?Cf(n):I0(n):void 0}(we(e,2,void 0,void 0,el))!=null&&(t.timestampMs=Q_(we(e,2,void 0,void 0,el)??k0)),t}function tv(e){var o,a;var t=as(e,3,Ui,os()),n=as(e,2,No,os()),i=as(e,1,cn,os()),r=as(e,9,cn,os());const s={categories:[],keypoints:[]};for(let c=0;c<t.length;c++)s.categories.push({score:t[c],index:n[c]??-1,categoryName:i[c]??"",displayName:r[c]??""});if((t=(o=Jt(e,Uu,4))==null?void 0:o.l())&&(s.boundingBox={originX:oi(t,1,Sr)??0,originY:oi(t,2,Sr)??0,width:oi(t,3,Sr)??0,height:oi(t,4,Sr)??0,angle:0}),(a=Jt(e,Uu,4))==null?void 0:a.g().length)for(const c of Jt(e,Uu,4).g())s.keypoints.push({x:we(c,1,void 0,Sr,Ui)??0,y:we(c,2,void 0,Sr,Ui)??0,score:we(c,4,void 0,Sr,Ui)??0,label:cn(we(c,3,void 0,Sr))??""});return s}function Ol(e){const t=[];for(const n of ur(e,P_,1))t.push({x:Fe(n,1)??0,y:Fe(n,2)??0,z:Fe(n,3)??0,visibility:Fe(n,4)??0});return t}function da(e){const t=[];for(const n of ur(e,R_,1))t.push({x:Fe(n,1)??0,y:Fe(n,2)??0,z:Fe(n,3)??0,visibility:Fe(n,4)??0});return t}function Lm(e){return Array.from(e,t=>t>127?t-256:t)}function Im(e,t){if(e.length!==t.length)throw Error(`Cannot compute cosine similarity between embeddings of different sizes (${e.length} vs. ${t.length}).`);let n=0,i=0,r=0;for(let s=0;s<e.length;s++)n+=e[s]*t[s],i+=e[s]*e[s],r+=t[s]*t[s];if(i<=0||r<=0)throw Error("Cannot compute cosine similarity on embedding with 0 norm.");return n/Math.sqrt(i*r)}let Mc;Ze[516587230]=[0,$e,sd,Vh,We],Ze[518928384]=Vh;const mT=new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11]);async function ev(e){if(e)return!0;if(Mc===void 0)try{await WebAssembly.instantiate(mT),Mc=!0}catch{Mc=!1}return Mc}async function Ec(e,t,n){return{wasmLoaderPath:`${t}/${e}_${n=`wasm${n?"_module":""}${await ev(n)?"":"_nosimd"}_internal`}.js`,wasmBinaryPath:`${t}/${e}_${n}.wasm`}}var js=class{};function nv(){var e=navigator;return typeof OffscreenCanvas<"u"&&(!function(t=navigator){return(t=t.userAgent).includes("Safari")&&!t.includes("Chrome")}(e)||!!((e=e.userAgent.match(/Version\/([\d]+).*Safari/))&&e.length>=1&&Number(e[1])>=17))}async function Dm(e){if(typeof importScripts!="function"){const t=document.createElement("script");return t.src=e.toString(),t.crossOrigin="anonymous",new Promise((n,i)=>{t.addEventListener("load",()=>{n()},!1),t.addEventListener("error",r=>{i(r)},!1),document.body.appendChild(t)})}try{importScripts(e.toString())}catch(t){if(!(t instanceof TypeError))throw t;{const n=self.import;n?await n(e.toString()):await import(e.toString())}}}function iv(e){return e.videoWidth!==void 0?[e.videoWidth,e.videoHeight]:e.naturalWidth!==void 0?[e.naturalWidth,e.naturalHeight]:e.displayWidth!==void 0?[e.displayWidth,e.displayHeight]:[e.width,e.height]}function Mt(e,t,n){e.m||console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target"),n(t=e.i.stringToNewUTF8(t)),e.i._free(t)}function Um(e,t,n){if(!e.i.canvas)throw Error("No OpenGL canvas configured.");if(n?e.i._bindTextureToStream(n):e.i._bindTextureToCanvas(),!(n=e.i.canvas.getContext("webgl2")||e.i.canvas.getContext("webgl")))throw Error("Failed to obtain WebGL context from the provided canvas. `getContext()` should only be invoked with `webgl` or `webgl2`.");e.i.gpuOriginForWebTexturesIsBottomLeft&&n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!0),n.texImage2D(n.TEXTURE_2D,0,n.RGBA,n.RGBA,n.UNSIGNED_BYTE,t),e.i.gpuOriginForWebTexturesIsBottomLeft&&n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1);const[i,r]=iv(t);return!e.l||i===e.i.canvas.width&&r===e.i.canvas.height||(e.i.canvas.width=i,e.i.canvas.height=r),[i,r]}function Nm(e,t,n){e.m||console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target");const i=new Uint32Array(t.length);for(let r=0;r<t.length;r++)i[r]=e.i.stringToNewUTF8(t[r]);t=e.i._malloc(4*i.length),e.i.HEAPU32.set(i,t>>2),n(t);for(const r of i)e.i._free(r);e.i._free(t)}function wi(e,t,n){e.i.simpleListeners=e.i.simpleListeners||{},e.i.simpleListeners[t]=n}function Mr(e,t,n){let i=[];e.i.simpleListeners=e.i.simpleListeners||{},e.i.simpleListeners[t]=(r,s,o)=>{s?(n(i,o),i=[]):i.push(r)}}js.forVisionTasks=function(e,t=!1){return Ec("vision",e??Sc``,t)},js.forTextTasks=function(e,t=!1){return Ec("text",e??Sc``,t)},js.forGenAiTasks=function(e,t=!1){return Ec("genai",e??Sc``,t)},js.forAudioTasks=function(e,t=!1){return Ec("audio",e??Sc``,t)},js.isSimdSupported=function(e=!1){return ev(e)};async function gT(e,t,n,i){return e=await(async(r,s,o,a,c)=>{if(s&&await Dm(s),!self.ModuleFactory||o&&(await Dm(o),!self.ModuleFactory))throw Error("ModuleFactory not set.");return self.Module&&c&&((s=self.Module).locateFile=c.locateFile,c.mainScriptUrlOrBlob&&(s.mainScriptUrlOrBlob=c.mainScriptUrlOrBlob)),c=await self.ModuleFactory(self.Module||c),self.ModuleFactory=self.Module=void 0,new r(c,a)})(e,n.wasmLoaderPath,n.assetLoaderPath,t,{locateFile:r=>r.endsWith(".wasm")?n.wasmBinaryPath.toString():n.assetBinaryPath&&r.endsWith(".data")?n.assetBinaryPath.toString():r}),await e.o(i),e}function Fu(e,t){const n=Jt(e.baseOptions,al,1)||new al;typeof t=="string"?(de(n,2,Oa(t)),de(n,1)):t instanceof Uint8Array&&(de(n,1,bf(t,!1)),de(n,2)),wt(e.baseOptions,0,1,n)}function Fm(e){try{const t=e.H.length;if(t===1)throw Error(e.H[0].message);if(t>1)throw Error("Encountered multiple errors: "+e.H.map(n=>n.message).join(", "))}finally{e.H=[]}}function ft(e,t){e.C=Math.max(e.C,t)}function kl(e,t){e.B=new In,Yn(e.B,2,"PassThroughCalculator"),Ee(e.B,"free_memory"),Wt(e.B,"free_memory_unused_out"),Pe(t,"free_memory"),ci(t,e.B)}function To(e,t){Ee(e.B,t),Wt(e.B,t+"_unused_out")}function Bl(e){e.g.addBoolToStream(!0,"free_memory",e.C)}var Xh=class{constructor(e){this.g=e,this.H=[],this.C=0,this.g.setAutoRenderToScreen(!1)}l(e,t=!0){var n,i,r,s,o,a;if(t){const c=e.baseOptions||{};if((n=e.baseOptions)!=null&&n.modelAssetBuffer&&((i=e.baseOptions)!=null&&i.modelAssetPath))throw Error("Cannot set both baseOptions.modelAssetPath and baseOptions.modelAssetBuffer");if(!((r=Jt(this.baseOptions,al,1))!=null&&r.g()||(s=Jt(this.baseOptions,al,1))!=null&&s.l()||(o=e.baseOptions)!=null&&o.modelAssetBuffer||(a=e.baseOptions)!=null&&a.modelAssetPath))throw Error("Either baseOptions.modelAssetPath or baseOptions.modelAssetBuffer must be set");if(function(l,u){let h=Jt(l.baseOptions,wm,3);if(!h){var f=h=new wm,d=new Sm;ha(f,4,Hc,d)}"delegate"in u&&(u.delegate==="GPU"?(u=h,f=new VA,ha(u,2,Hc,f)):(u=h,f=new Sm,ha(u,4,Hc,f))),wt(l.baseOptions,0,3,h)}(this,c),c.modelAssetPath)return fetch(c.modelAssetPath.toString()).then(l=>{if(l.ok)return l.arrayBuffer();throw Error(`Failed to fetch model: ${c.modelAssetPath} (${l.status})`)}).then(l=>{try{this.g.i.FS_unlink("/model.dat")}catch{}this.g.i.FS_createDataFile("/","model.dat",new Uint8Array(l),!0,!1,!1),Fu(this,"/model.dat"),this.m(),this.L()});if(c.modelAssetBuffer instanceof Uint8Array)Fu(this,c.modelAssetBuffer);else if(c.modelAssetBuffer)return async function(l){const u=[];for(var h=0;;){const{done:f,value:d}=await l.read();if(f)break;u.push(d),h+=d.length}if(u.length===0)return new Uint8Array(0);if(u.length===1)return u[0];l=new Uint8Array(h),h=0;for(const f of u)l.set(f,h),h+=f.length;return l}(c.modelAssetBuffer).then(l=>{Fu(this,l),this.m(),this.L()})}return this.m(),this.L(),Promise.resolve()}L(){}ca(){let e;if(this.g.ca(t=>{e=HA(t)}),!e)throw Error("Failed to retrieve CalculatorGraphConfig");return e}setGraph(e,t){this.g.attachErrorListener((n,i)=>{this.H.push(Error(i))}),this.g.Ja(),this.g.setGraph(e,t),this.B=void 0,Fm(this)}finishProcessing(){this.g.finishProcessing(),Fm(this)}close(){this.B=void 0,this.g.closeGraph()}};function Lr(e,t){if(!e)throw Error(`Unable to obtain required WebGL resource: ${t}`);return e}Xh.prototype.close=Xh.prototype.close;class _T{constructor(t,n,i,r){this.g=t,this.h=n,this.m=i,this.l=r}bind(){this.g.bindVertexArray(this.h)}close(){this.g.deleteVertexArray(this.h),this.g.deleteBuffer(this.m),this.g.deleteBuffer(this.l)}}function Om(e,t,n){const i=e.g;if(n=Lr(i.createShader(n),"Failed to create WebGL shader"),i.shaderSource(n,t),i.compileShader(n),!i.getShaderParameter(n,i.COMPILE_STATUS))throw Error(`Could not compile WebGL shader: ${i.getShaderInfoLog(n)}`);return i.attachShader(e.h,n),n}function km(e,t){const n=e.g,i=Lr(n.createVertexArray(),"Failed to create vertex array");n.bindVertexArray(i);const r=Lr(n.createBuffer(),"Failed to create buffer");n.bindBuffer(n.ARRAY_BUFFER,r),n.enableVertexAttribArray(e.O),n.vertexAttribPointer(e.O,2,n.FLOAT,!1,0,0),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),n.STATIC_DRAW);const s=Lr(n.createBuffer(),"Failed to create buffer");return n.bindBuffer(n.ARRAY_BUFFER,s),n.enableVertexAttribArray(e.L),n.vertexAttribPointer(e.L,2,n.FLOAT,!1,0,0),n.bufferData(n.ARRAY_BUFFER,new Float32Array(t?[0,1,0,0,1,0,1,1]:[0,0,0,1,1,1,1,0]),n.STATIC_DRAW),n.bindBuffer(n.ARRAY_BUFFER,null),n.bindVertexArray(null),new _T(n,i,r,s)}function cd(e,t){if(e.g){if(t!==e.g)throw Error("Cannot change GL context once initialized")}else e.g=t}function vT(e,t,n,i){return cd(e,t),e.h||(e.m(),e.D()),n?(e.u||(e.u=km(e,!0)),n=e.u):(e.A||(e.A=km(e,!1)),n=e.A),t.useProgram(e.h),n.bind(),e.l(),e=i(),n.g.bindVertexArray(null),e}function rv(e,t,n){return cd(e,t),e=Lr(t.createTexture(),"Failed to create texture"),t.bindTexture(t.TEXTURE_2D,e),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,n??t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,n??t.LINEAR),t.bindTexture(t.TEXTURE_2D,null),e}function sv(e,t,n){cd(e,t),e.B||(e.B=Lr(t.createFramebuffer(),"Failed to create framebuffe.")),t.bindFramebuffer(t.FRAMEBUFFER,e.B),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,n,0)}function xT(e){var t;(t=e.g)==null||t.bindFramebuffer(e.g.FRAMEBUFFER,null)}var ov=class{H(){return`
  precision mediump float;
  varying vec2 vTex;
  uniform sampler2D inputTexture;
  void main() {
    gl_FragColor = texture2D(inputTexture, vTex);
  }
 `}m(){const e=this.g;if(this.h=Lr(e.createProgram(),"Failed to create WebGL program"),this.X=Om(this,`
  attribute vec2 aVertex;
  attribute vec2 aTex;
  varying vec2 vTex;
  void main(void) {
    gl_Position = vec4(aVertex, 0.0, 1.0);
    vTex = aTex;
  }`,e.VERTEX_SHADER),this.W=Om(this,this.H(),e.FRAGMENT_SHADER),e.linkProgram(this.h),!e.getProgramParameter(this.h,e.LINK_STATUS))throw Error(`Error during program linking: ${e.getProgramInfoLog(this.h)}`);this.O=e.getAttribLocation(this.h,"aVertex"),this.L=e.getAttribLocation(this.h,"aTex")}D(){}l(){}close(){if(this.h){const e=this.g;e.deleteProgram(this.h),e.deleteShader(this.X),e.deleteShader(this.W)}this.B&&this.g.deleteFramebuffer(this.B),this.A&&this.A.close(),this.u&&this.u.close()}};function tr(e,t){switch(t){case 0:return e.g.find(n=>n instanceof Uint8Array);case 1:return e.g.find(n=>n instanceof Float32Array);case 2:return e.g.find(n=>typeof WebGLTexture<"u"&&n instanceof WebGLTexture);default:throw Error(`Type is not supported: ${t}`)}}function $h(e){var t=tr(e,1);if(!t){if(t=tr(e,0))t=new Float32Array(t).map(i=>i/255);else{t=new Float32Array(e.width*e.height);const i=wo(e);var n=ld(e);if(sv(n,i,av(e)),"iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";").includes(navigator.platform)||navigator.userAgent.includes("Mac")&&"document"in self&&"ontouchend"in self.document){n=new Float32Array(e.width*e.height*4),i.readPixels(0,0,e.width,e.height,i.RGBA,i.FLOAT,n);for(let r=0,s=0;r<t.length;++r,s+=4)t[r]=n[s]}else i.readPixels(0,0,e.width,e.height,i.RED,i.FLOAT,t)}e.g.push(t)}return t}function av(e){let t=tr(e,2);if(!t){const n=wo(e);t=lv(e);const i=$h(e),r=cv(e);n.texImage2D(n.TEXTURE_2D,0,r,e.width,e.height,0,n.RED,n.FLOAT,i),qh(e)}return t}function wo(e){if(!e.canvas)throw Error("Conversion to different image formats require that a canvas is passed when initializing the image.");return e.h||(e.h=Lr(e.canvas.getContext("webgl2"),"You cannot use a canvas that is already bound to a different type of rendering context.")),e.h}function cv(e){if(e=wo(e),!bc)if(e.getExtension("EXT_color_buffer_float")&&e.getExtension("OES_texture_float_linear")&&e.getExtension("EXT_float_blend"))bc=e.R32F;else{if(!e.getExtension("EXT_color_buffer_half_float"))throw Error("GPU does not fully support 4-channel float32 or float16 formats");bc=e.R16F}return bc}function ld(e){return e.l||(e.l=new ov),e.l}function lv(e){const t=wo(e);t.viewport(0,0,e.width,e.height),t.activeTexture(t.TEXTURE0);let n=tr(e,2);return n||(n=rv(ld(e),t,e.m?t.LINEAR:t.NEAREST),e.g.push(n),e.j=!0),t.bindTexture(t.TEXTURE_2D,n),n}function qh(e){e.h.bindTexture(e.h.TEXTURE_2D,null)}var bc,nn=class{constructor(e,t,n,i,r,s,o){this.g=e,this.m=t,this.j=n,this.canvas=i,this.l=r,this.width=s,this.height=o,this.j&&--Bm===0&&console.error("You seem to be creating MPMask instances without invoking .close(). This leaks resources.")}Fa(){return!!tr(this,0)}ka(){return!!tr(this,1)}R(){return!!tr(this,2)}ja(){return(t=tr(e=this,0))||(t=$h(e),t=new Uint8Array(t.map(n=>Math.round(255*n))),e.g.push(t)),t;var e,t}ia(){return $h(this)}N(){return av(this)}clone(){const e=[];for(const t of this.g){let n;if(t instanceof Uint8Array)n=new Uint8Array(t);else if(t instanceof Float32Array)n=new Float32Array(t);else{if(!(t instanceof WebGLTexture))throw Error(`Type is not supported: ${t}`);{const i=wo(this),r=ld(this);i.activeTexture(i.TEXTURE1),n=rv(r,i,this.m?i.LINEAR:i.NEAREST),i.bindTexture(i.TEXTURE_2D,n);const s=cv(this);i.texImage2D(i.TEXTURE_2D,0,s,this.width,this.height,0,i.RED,i.FLOAT,null),i.bindTexture(i.TEXTURE_2D,null),sv(r,i,n),vT(r,i,!1,()=>{lv(this),i.clearColor(0,0,0,0),i.clear(i.COLOR_BUFFER_BIT),i.drawArrays(i.TRIANGLE_FAN,0,4),qh(this)}),xT(r),qh(this)}}e.push(n)}return new nn(e,this.m,this.R(),this.canvas,this.l,this.width,this.height)}close(){this.j&&wo(this).deleteTexture(tr(this,2)),Bm=-1}};nn.prototype.close=nn.prototype.close,nn.prototype.clone=nn.prototype.clone,nn.prototype.getAsWebGLTexture=nn.prototype.N,nn.prototype.getAsFloat32Array=nn.prototype.ia,nn.prototype.getAsUint8Array=nn.prototype.ja,nn.prototype.hasWebGLTexture=nn.prototype.R,nn.prototype.hasFloat32Array=nn.prototype.ka,nn.prototype.hasUint8Array=nn.prototype.Fa;var Bm=250;function bi(...e){return e.map(([t,n])=>({start:t,end:n}))}const yT=function(e){return class extends e{Ja(){this.i._registerModelResourcesGraphService()}}}((zm=class{constructor(e,t){this.l=!0,this.i=e,this.g=null,this.h=0,this.m=typeof this.i._addIntToInputStream=="function",t!==void 0?this.i.canvas=t:nv()?this.i.canvas=new OffscreenCanvas(1,1):(console.warn("OffscreenCanvas not supported and GraphRunner constructor glCanvas parameter is undefined. Creating backup canvas."),this.i.canvas=document.createElement("canvas"))}async initializeGraph(e){const t=await(await fetch(e)).arrayBuffer();e=!(e.endsWith(".pbtxt")||e.endsWith(".textproto")),this.setGraph(new Uint8Array(t),e)}setGraphFromString(e){this.setGraph(new TextEncoder().encode(e),!1)}setGraph(e,t){const n=e.length,i=this.i._malloc(n);this.i.HEAPU8.set(e,i),t?this.i._changeBinaryGraph(n,i):this.i._changeTextGraph(n,i),this.i._free(i)}configureAudio(e,t,n,i,r){this.i._configureAudio||console.warn('Attempting to use configureAudio without support for input audio. Is build dep ":gl_graph_runner_audio" missing?'),Mt(this,i||"input_audio",s=>{Mt(this,r=r||"audio_header",o=>{this.i._configureAudio(s,o,e,t??0,n)})})}setAutoResizeCanvas(e){this.l=e}setAutoRenderToScreen(e){this.i._setAutoRenderToScreen(e)}setGpuBufferVerticalFlip(e){this.i.gpuOriginForWebTexturesIsBottomLeft=e}ca(e){wi(this,"__graph_config__",t=>{e(t)}),Mt(this,"__graph_config__",t=>{this.i._getGraphConfig(t,void 0)}),delete this.i.simpleListeners.__graph_config__}attachErrorListener(e){this.i.errorListener=e}attachEmptyPacketListener(e,t){this.i.emptyPacketListeners=this.i.emptyPacketListeners||{},this.i.emptyPacketListeners[e]=t}addAudioToStream(e,t,n){this.addAudioToStreamWithShape(e,0,0,t,n)}addAudioToStreamWithShape(e,t,n,i,r){const s=4*e.length;this.h!==s&&(this.g&&this.i._free(this.g),this.g=this.i._malloc(s),this.h=s),this.i.HEAPF32.set(e,this.g/4),Mt(this,i,o=>{this.i._addAudioToInputStream(this.g,t,n,o,r)})}addGpuBufferToStream(e,t,n){Mt(this,t,i=>{const[r,s]=Um(this,e,i);this.i._addBoundTextureToStream(i,r,s,n)})}addBoolToStream(e,t,n){Mt(this,t,i=>{this.i._addBoolToInputStream(e,i,n)})}addDoubleToStream(e,t,n){Mt(this,t,i=>{this.i._addDoubleToInputStream(e,i,n)})}addFloatToStream(e,t,n){Mt(this,t,i=>{this.i._addFloatToInputStream(e,i,n)})}addIntToStream(e,t,n){Mt(this,t,i=>{this.i._addIntToInputStream(e,i,n)})}addUintToStream(e,t,n){Mt(this,t,i=>{this.i._addUintToInputStream(e,i,n)})}addStringToStream(e,t,n){Mt(this,t,i=>{Mt(this,e,r=>{this.i._addStringToInputStream(r,i,n)})})}addStringRecordToStream(e,t,n){Mt(this,t,i=>{Nm(this,Object.keys(e),r=>{Nm(this,Object.values(e),s=>{this.i._addFlatHashMapToInputStream(r,s,Object.keys(e).length,i,n)})})})}addProtoToStream(e,t,n,i){Mt(this,n,r=>{Mt(this,t,s=>{const o=this.i._malloc(e.length);this.i.HEAPU8.set(e,o),this.i._addProtoToInputStream(o,e.length,s,r,i),this.i._free(o)})})}addEmptyPacketToStream(e,t){Mt(this,e,n=>{this.i._addEmptyPacketToInputStream(n,t)})}addBoolVectorToStream(e,t,n){Mt(this,t,i=>{const r=this.i._allocateBoolVector(e.length);if(!r)throw Error("Unable to allocate new bool vector on heap.");for(const s of e)this.i._addBoolVectorEntry(r,s);this.i._addBoolVectorToInputStream(r,i,n)})}addDoubleVectorToStream(e,t,n){Mt(this,t,i=>{const r=this.i._allocateDoubleVector(e.length);if(!r)throw Error("Unable to allocate new double vector on heap.");for(const s of e)this.i._addDoubleVectorEntry(r,s);this.i._addDoubleVectorToInputStream(r,i,n)})}addFloatVectorToStream(e,t,n){Mt(this,t,i=>{const r=this.i._allocateFloatVector(e.length);if(!r)throw Error("Unable to allocate new float vector on heap.");for(const s of e)this.i._addFloatVectorEntry(r,s);this.i._addFloatVectorToInputStream(r,i,n)})}addIntVectorToStream(e,t,n){Mt(this,t,i=>{const r=this.i._allocateIntVector(e.length);if(!r)throw Error("Unable to allocate new int vector on heap.");for(const s of e)this.i._addIntVectorEntry(r,s);this.i._addIntVectorToInputStream(r,i,n)})}addUintVectorToStream(e,t,n){Mt(this,t,i=>{const r=this.i._allocateUintVector(e.length);if(!r)throw Error("Unable to allocate new unsigned int vector on heap.");for(const s of e)this.i._addUintVectorEntry(r,s);this.i._addUintVectorToInputStream(r,i,n)})}addStringVectorToStream(e,t,n){Mt(this,t,i=>{const r=this.i._allocateStringVector(e.length);if(!r)throw Error("Unable to allocate new string vector on heap.");for(const s of e)Mt(this,s,o=>{this.i._addStringVectorEntry(r,o)});this.i._addStringVectorToInputStream(r,i,n)})}addBoolToInputSidePacket(e,t){Mt(this,t,n=>{this.i._addBoolToInputSidePacket(e,n)})}addDoubleToInputSidePacket(e,t){Mt(this,t,n=>{this.i._addDoubleToInputSidePacket(e,n)})}addFloatToInputSidePacket(e,t){Mt(this,t,n=>{this.i._addFloatToInputSidePacket(e,n)})}addIntToInputSidePacket(e,t){Mt(this,t,n=>{this.i._addIntToInputSidePacket(e,n)})}addUintToInputSidePacket(e,t){Mt(this,t,n=>{this.i._addUintToInputSidePacket(e,n)})}addStringToInputSidePacket(e,t){Mt(this,t,n=>{Mt(this,e,i=>{this.i._addStringToInputSidePacket(i,n)})})}addProtoToInputSidePacket(e,t,n){Mt(this,n,i=>{Mt(this,t,r=>{const s=this.i._malloc(e.length);this.i.HEAPU8.set(e,s),this.i._addProtoToInputSidePacket(s,e.length,r,i),this.i._free(s)})})}addBoolVectorToInputSidePacket(e,t){Mt(this,t,n=>{const i=this.i._allocateBoolVector(e.length);if(!i)throw Error("Unable to allocate new bool vector on heap.");for(const r of e)this.i._addBoolVectorEntry(i,r);this.i._addBoolVectorToInputSidePacket(i,n)})}addDoubleVectorToInputSidePacket(e,t){Mt(this,t,n=>{const i=this.i._allocateDoubleVector(e.length);if(!i)throw Error("Unable to allocate new double vector on heap.");for(const r of e)this.i._addDoubleVectorEntry(i,r);this.i._addDoubleVectorToInputSidePacket(i,n)})}addFloatVectorToInputSidePacket(e,t){Mt(this,t,n=>{const i=this.i._allocateFloatVector(e.length);if(!i)throw Error("Unable to allocate new float vector on heap.");for(const r of e)this.i._addFloatVectorEntry(i,r);this.i._addFloatVectorToInputSidePacket(i,n)})}addIntVectorToInputSidePacket(e,t){Mt(this,t,n=>{const i=this.i._allocateIntVector(e.length);if(!i)throw Error("Unable to allocate new int vector on heap.");for(const r of e)this.i._addIntVectorEntry(i,r);this.i._addIntVectorToInputSidePacket(i,n)})}addUintVectorToInputSidePacket(e,t){Mt(this,t,n=>{const i=this.i._allocateUintVector(e.length);if(!i)throw Error("Unable to allocate new unsigned int vector on heap.");for(const r of e)this.i._addUintVectorEntry(i,r);this.i._addUintVectorToInputSidePacket(i,n)})}addStringVectorToInputSidePacket(e,t){Mt(this,t,n=>{const i=this.i._allocateStringVector(e.length);if(!i)throw Error("Unable to allocate new string vector on heap.");for(const r of e)Mt(this,r,s=>{this.i._addStringVectorEntry(i,s)});this.i._addStringVectorToInputSidePacket(i,n)})}attachBoolListener(e,t){wi(this,e,t),Mt(this,e,n=>{this.i._attachBoolListener(n)})}attachBoolVectorListener(e,t){Mr(this,e,t),Mt(this,e,n=>{this.i._attachBoolVectorListener(n)})}attachIntListener(e,t){wi(this,e,t),Mt(this,e,n=>{this.i._attachIntListener(n)})}attachIntVectorListener(e,t){Mr(this,e,t),Mt(this,e,n=>{this.i._attachIntVectorListener(n)})}attachUintListener(e,t){wi(this,e,t),Mt(this,e,n=>{this.i._attachUintListener(n)})}attachUintVectorListener(e,t){Mr(this,e,t),Mt(this,e,n=>{this.i._attachUintVectorListener(n)})}attachDoubleListener(e,t){wi(this,e,t),Mt(this,e,n=>{this.i._attachDoubleListener(n)})}attachDoubleVectorListener(e,t){Mr(this,e,t),Mt(this,e,n=>{this.i._attachDoubleVectorListener(n)})}attachFloatListener(e,t){wi(this,e,t),Mt(this,e,n=>{this.i._attachFloatListener(n)})}attachFloatVectorListener(e,t){Mr(this,e,t),Mt(this,e,n=>{this.i._attachFloatVectorListener(n)})}attachStringListener(e,t){wi(this,e,t),Mt(this,e,n=>{this.i._attachStringListener(n)})}attachStringVectorListener(e,t){Mr(this,e,t),Mt(this,e,n=>{this.i._attachStringVectorListener(n)})}attachProtoListener(e,t,n){wi(this,e,t),Mt(this,e,i=>{this.i._attachProtoListener(i,n||!1)})}attachProtoVectorListener(e,t,n){Mr(this,e,t),Mt(this,e,i=>{this.i._attachProtoVectorListener(i,n||!1)})}attachAudioListener(e,t,n){this.i._attachAudioListener||console.warn('Attempting to use attachAudioListener without support for output audio. Is build dep ":gl_graph_runner_audio_out" missing?'),wi(this,e,(i,r)=>{i=new Float32Array(i.buffer,i.byteOffset,i.length/4),t(i,r)}),Mt(this,e,i=>{this.i._attachAudioListener(i,n||!1)})}finishProcessing(){this.i._waitUntilIdle()}closeGraph(){this.i._closeGraph(),this.i.simpleListeners=void 0,this.i.emptyPacketListeners=void 0}},class extends zm{get ga(){return this.i}pa(e,t,n){Mt(this,t,i=>{const[r,s]=Um(this,e,i);this.ga._addBoundTextureAsImageToStream(i,r,s,n)})}Z(e,t){wi(this,e,t),Mt(this,e,n=>{this.ga._attachImageListener(n)})}aa(e,t){Mr(this,e,t),Mt(this,e,n=>{this.ga._attachImageVectorListener(n)})}}));var zm,Ai=class extends yT{};async function Yt(e,t,n){return async function(i,r,s,o){return gT(i,r,s,o)}(e,n.canvas??(nv()?void 0:document.createElement("canvas")),t,n)}function uv(e,t,n,i){if(e.U){const s=new L_;if(n!=null&&n.regionOfInterest){if(!e.oa)throw Error("This task doesn't support region-of-interest.");var r=n.regionOfInterest;if(r.left>=r.right||r.top>=r.bottom)throw Error("Expected RectF with left < right and top < bottom.");if(r.left<0||r.top<0||r.right>1||r.bottom>1)throw Error("Expected RectF values to be in [0,1].");Tt(s,1,(r.left+r.right)/2),Tt(s,2,(r.top+r.bottom)/2),Tt(s,4,r.right-r.left),Tt(s,3,r.bottom-r.top)}else Tt(s,1,.5),Tt(s,2,.5),Tt(s,4,1),Tt(s,3,1);if(n!=null&&n.rotationDegrees){if((n==null?void 0:n.rotationDegrees)%90!=0)throw Error("Expected rotation to be a multiple of 90°.");if(Tt(s,5,-Math.PI*n.rotationDegrees/180),(n==null?void 0:n.rotationDegrees)%180!=0){const[o,a]=iv(t);n=Fe(s,3)*a/o,r=Fe(s,4)*o/a,Tt(s,4,n),Tt(s,3,r)}}e.g.addProtoToStream(s.g(),"mediapipe.NormalizedRect",e.U,i)}e.g.pa(t,e.X,i??performance.now()),e.finishProcessing()}function Ti(e,t,n){var i;if((i=e.baseOptions)!=null&&i.g())throw Error("Task is not initialized with image mode. 'runningMode' must be set to 'IMAGE'.");uv(e,t,n,e.C+1)}function Wi(e,t,n,i){var r;if(!((r=e.baseOptions)!=null&&r.g()))throw Error("Task is not initialized with video mode. 'runningMode' must be set to 'VIDEO'.");uv(e,t,n,i)}function Co(e,t,n,i){var r=t.data;const s=t.width,o=s*(t=t.height);if((r instanceof Uint8Array||r instanceof Float32Array)&&r.length!==o)throw Error("Unsupported channel count: "+r.length/o);return e=new nn([r],n,!1,e.g.i.canvas,e.P,s,t),i?e.clone():e}var Kn=class extends Xh{constructor(e,t,n,i){super(e),this.g=e,this.X=t,this.U=n,this.oa=i,this.P=new ov}l(e,t=!0){if("runningMode"in e&&de(this.baseOptions,2,ba(!!e.runningMode&&e.runningMode!=="IMAGE")),e.canvas!==void 0&&this.g.i.canvas!==e.canvas)throw Error("You must create a new task to reset the canvas.");return super.l(e,t)}close(){this.P.close(),super.close()}};Kn.prototype.close=Kn.prototype.close;var ti=class extends Kn{constructor(e,t){super(new Ai(e,t),"image_in","norm_rect_in",!1),this.j={detections:[]},wt(e=this.h=new Fl,0,1,t=new Ue),Tt(this.h,2,.5),Tt(this.h,3,.3)}get baseOptions(){return Jt(this.h,Ue,1)}set baseOptions(e){wt(this.h,0,1,e)}o(e){return"minDetectionConfidence"in e&&Tt(this.h,2,e.minDetectionConfidence??.5),"minSuppressionThreshold"in e&&Tt(this.h,3,e.minSuppressionThreshold??.3),this.l(e)}F(e,t){return this.j={detections:[]},Ti(this,e,t),this.j}G(e,t,n){return this.j={detections:[]},Wi(this,e,n,t),this.j}m(){var e=new Zn;Pe(e,"image_in"),Pe(e,"norm_rect_in"),ne(e,"detections");const t=new jn;Vi(t,eT,this.h);const n=new In;Yn(n,2,"mediapipe.tasks.vision.face_detector.FaceDetectorGraph"),Ee(n,"IMAGE:image_in"),Ee(n,"NORM_RECT:norm_rect_in"),Wt(n,"DETECTIONS:detections"),n.o(t),ci(e,n),this.g.attachProtoVectorListener("detections",(i,r)=>{for(const s of i)i=C_(s),this.j.detections.push(tv(i));ft(this,r)}),this.g.attachEmptyPacketListener("detections",i=>{ft(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};ti.prototype.detectForVideo=ti.prototype.G,ti.prototype.detect=ti.prototype.F,ti.prototype.setOptions=ti.prototype.o,ti.createFromModelPath=async function(e,t){return Yt(ti,e,{baseOptions:{modelAssetPath:t}})},ti.createFromModelBuffer=function(e,t){return Yt(ti,e,{baseOptions:{modelAssetBuffer:t}})},ti.createFromOptions=function(e,t){return Yt(ti,e,t)};var ud=bi([61,146],[146,91],[91,181],[181,84],[84,17],[17,314],[314,405],[405,321],[321,375],[375,291],[61,185],[185,40],[40,39],[39,37],[37,0],[0,267],[267,269],[269,270],[270,409],[409,291],[78,95],[95,88],[88,178],[178,87],[87,14],[14,317],[317,402],[402,318],[318,324],[324,308],[78,191],[191,80],[80,81],[81,82],[82,13],[13,312],[312,311],[311,310],[310,415],[415,308]),hd=bi([263,249],[249,390],[390,373],[373,374],[374,380],[380,381],[381,382],[382,362],[263,466],[466,388],[388,387],[387,386],[386,385],[385,384],[384,398],[398,362]),fd=bi([276,283],[283,282],[282,295],[295,285],[300,293],[293,334],[334,296],[296,336]),hv=bi([474,475],[475,476],[476,477],[477,474]),dd=bi([33,7],[7,163],[163,144],[144,145],[145,153],[153,154],[154,155],[155,133],[33,246],[246,161],[161,160],[160,159],[159,158],[158,157],[157,173],[173,133]),pd=bi([46,53],[53,52],[52,65],[65,55],[70,63],[63,105],[105,66],[66,107]),fv=bi([469,470],[470,471],[471,472],[472,469]),md=bi([10,338],[338,297],[297,332],[332,284],[284,251],[251,389],[389,356],[356,454],[454,323],[323,361],[361,288],[288,397],[397,365],[365,379],[379,378],[378,400],[400,377],[377,152],[152,148],[148,176],[176,149],[149,150],[150,136],[136,172],[172,58],[58,132],[132,93],[93,234],[234,127],[127,162],[162,21],[21,54],[54,103],[103,67],[67,109],[109,10]),dv=[...ud,...hd,...fd,...dd,...pd,...md],pv=bi([127,34],[34,139],[139,127],[11,0],[0,37],[37,11],[232,231],[231,120],[120,232],[72,37],[37,39],[39,72],[128,121],[121,47],[47,128],[232,121],[121,128],[128,232],[104,69],[69,67],[67,104],[175,171],[171,148],[148,175],[118,50],[50,101],[101,118],[73,39],[39,40],[40,73],[9,151],[151,108],[108,9],[48,115],[115,131],[131,48],[194,204],[204,211],[211,194],[74,40],[40,185],[185,74],[80,42],[42,183],[183,80],[40,92],[92,186],[186,40],[230,229],[229,118],[118,230],[202,212],[212,214],[214,202],[83,18],[18,17],[17,83],[76,61],[61,146],[146,76],[160,29],[29,30],[30,160],[56,157],[157,173],[173,56],[106,204],[204,194],[194,106],[135,214],[214,192],[192,135],[203,165],[165,98],[98,203],[21,71],[71,68],[68,21],[51,45],[45,4],[4,51],[144,24],[24,23],[23,144],[77,146],[146,91],[91,77],[205,50],[50,187],[187,205],[201,200],[200,18],[18,201],[91,106],[106,182],[182,91],[90,91],[91,181],[181,90],[85,84],[84,17],[17,85],[206,203],[203,36],[36,206],[148,171],[171,140],[140,148],[92,40],[40,39],[39,92],[193,189],[189,244],[244,193],[159,158],[158,28],[28,159],[247,246],[246,161],[161,247],[236,3],[3,196],[196,236],[54,68],[68,104],[104,54],[193,168],[168,8],[8,193],[117,228],[228,31],[31,117],[189,193],[193,55],[55,189],[98,97],[97,99],[99,98],[126,47],[47,100],[100,126],[166,79],[79,218],[218,166],[155,154],[154,26],[26,155],[209,49],[49,131],[131,209],[135,136],[136,150],[150,135],[47,126],[126,217],[217,47],[223,52],[52,53],[53,223],[45,51],[51,134],[134,45],[211,170],[170,140],[140,211],[67,69],[69,108],[108,67],[43,106],[106,91],[91,43],[230,119],[119,120],[120,230],[226,130],[130,247],[247,226],[63,53],[53,52],[52,63],[238,20],[20,242],[242,238],[46,70],[70,156],[156,46],[78,62],[62,96],[96,78],[46,53],[53,63],[63,46],[143,34],[34,227],[227,143],[123,117],[117,111],[111,123],[44,125],[125,19],[19,44],[236,134],[134,51],[51,236],[216,206],[206,205],[205,216],[154,153],[153,22],[22,154],[39,37],[37,167],[167,39],[200,201],[201,208],[208,200],[36,142],[142,100],[100,36],[57,212],[212,202],[202,57],[20,60],[60,99],[99,20],[28,158],[158,157],[157,28],[35,226],[226,113],[113,35],[160,159],[159,27],[27,160],[204,202],[202,210],[210,204],[113,225],[225,46],[46,113],[43,202],[202,204],[204,43],[62,76],[76,77],[77,62],[137,123],[123,116],[116,137],[41,38],[38,72],[72,41],[203,129],[129,142],[142,203],[64,98],[98,240],[240,64],[49,102],[102,64],[64,49],[41,73],[73,74],[74,41],[212,216],[216,207],[207,212],[42,74],[74,184],[184,42],[169,170],[170,211],[211,169],[170,149],[149,176],[176,170],[105,66],[66,69],[69,105],[122,6],[6,168],[168,122],[123,147],[147,187],[187,123],[96,77],[77,90],[90,96],[65,55],[55,107],[107,65],[89,90],[90,180],[180,89],[101,100],[100,120],[120,101],[63,105],[105,104],[104,63],[93,137],[137,227],[227,93],[15,86],[86,85],[85,15],[129,102],[102,49],[49,129],[14,87],[87,86],[86,14],[55,8],[8,9],[9,55],[100,47],[47,121],[121,100],[145,23],[23,22],[22,145],[88,89],[89,179],[179,88],[6,122],[122,196],[196,6],[88,95],[95,96],[96,88],[138,172],[172,136],[136,138],[215,58],[58,172],[172,215],[115,48],[48,219],[219,115],[42,80],[80,81],[81,42],[195,3],[3,51],[51,195],[43,146],[146,61],[61,43],[171,175],[175,199],[199,171],[81,82],[82,38],[38,81],[53,46],[46,225],[225,53],[144,163],[163,110],[110,144],[52,65],[65,66],[66,52],[229,228],[228,117],[117,229],[34,127],[127,234],[234,34],[107,108],[108,69],[69,107],[109,108],[108,151],[151,109],[48,64],[64,235],[235,48],[62,78],[78,191],[191,62],[129,209],[209,126],[126,129],[111,35],[35,143],[143,111],[117,123],[123,50],[50,117],[222,65],[65,52],[52,222],[19,125],[125,141],[141,19],[221,55],[55,65],[65,221],[3,195],[195,197],[197,3],[25,7],[7,33],[33,25],[220,237],[237,44],[44,220],[70,71],[71,139],[139,70],[122,193],[193,245],[245,122],[247,130],[130,33],[33,247],[71,21],[21,162],[162,71],[170,169],[169,150],[150,170],[188,174],[174,196],[196,188],[216,186],[186,92],[92,216],[2,97],[97,167],[167,2],[141,125],[125,241],[241,141],[164,167],[167,37],[37,164],[72,38],[38,12],[12,72],[38,82],[82,13],[13,38],[63,68],[68,71],[71,63],[226,35],[35,111],[111,226],[101,50],[50,205],[205,101],[206,92],[92,165],[165,206],[209,198],[198,217],[217,209],[165,167],[167,97],[97,165],[220,115],[115,218],[218,220],[133,112],[112,243],[243,133],[239,238],[238,241],[241,239],[214,135],[135,169],[169,214],[190,173],[173,133],[133,190],[171,208],[208,32],[32,171],[125,44],[44,237],[237,125],[86,87],[87,178],[178,86],[85,86],[86,179],[179,85],[84,85],[85,180],[180,84],[83,84],[84,181],[181,83],[201,83],[83,182],[182,201],[137,93],[93,132],[132,137],[76,62],[62,183],[183,76],[61,76],[76,184],[184,61],[57,61],[61,185],[185,57],[212,57],[57,186],[186,212],[214,207],[207,187],[187,214],[34,143],[143,156],[156,34],[79,239],[239,237],[237,79],[123,137],[137,177],[177,123],[44,1],[1,4],[4,44],[201,194],[194,32],[32,201],[64,102],[102,129],[129,64],[213,215],[215,138],[138,213],[59,166],[166,219],[219,59],[242,99],[99,97],[97,242],[2,94],[94,141],[141,2],[75,59],[59,235],[235,75],[24,110],[110,228],[228,24],[25,130],[130,226],[226,25],[23,24],[24,229],[229,23],[22,23],[23,230],[230,22],[26,22],[22,231],[231,26],[112,26],[26,232],[232,112],[189,190],[190,243],[243,189],[221,56],[56,190],[190,221],[28,56],[56,221],[221,28],[27,28],[28,222],[222,27],[29,27],[27,223],[223,29],[30,29],[29,224],[224,30],[247,30],[30,225],[225,247],[238,79],[79,20],[20,238],[166,59],[59,75],[75,166],[60,75],[75,240],[240,60],[147,177],[177,215],[215,147],[20,79],[79,166],[166,20],[187,147],[147,213],[213,187],[112,233],[233,244],[244,112],[233,128],[128,245],[245,233],[128,114],[114,188],[188,128],[114,217],[217,174],[174,114],[131,115],[115,220],[220,131],[217,198],[198,236],[236,217],[198,131],[131,134],[134,198],[177,132],[132,58],[58,177],[143,35],[35,124],[124,143],[110,163],[163,7],[7,110],[228,110],[110,25],[25,228],[356,389],[389,368],[368,356],[11,302],[302,267],[267,11],[452,350],[350,349],[349,452],[302,303],[303,269],[269,302],[357,343],[343,277],[277,357],[452,453],[453,357],[357,452],[333,332],[332,297],[297,333],[175,152],[152,377],[377,175],[347,348],[348,330],[330,347],[303,304],[304,270],[270,303],[9,336],[336,337],[337,9],[278,279],[279,360],[360,278],[418,262],[262,431],[431,418],[304,408],[408,409],[409,304],[310,415],[415,407],[407,310],[270,409],[409,410],[410,270],[450,348],[348,347],[347,450],[422,430],[430,434],[434,422],[313,314],[314,17],[17,313],[306,307],[307,375],[375,306],[387,388],[388,260],[260,387],[286,414],[414,398],[398,286],[335,406],[406,418],[418,335],[364,367],[367,416],[416,364],[423,358],[358,327],[327,423],[251,284],[284,298],[298,251],[281,5],[5,4],[4,281],[373,374],[374,253],[253,373],[307,320],[320,321],[321,307],[425,427],[427,411],[411,425],[421,313],[313,18],[18,421],[321,405],[405,406],[406,321],[320,404],[404,405],[405,320],[315,16],[16,17],[17,315],[426,425],[425,266],[266,426],[377,400],[400,369],[369,377],[322,391],[391,269],[269,322],[417,465],[465,464],[464,417],[386,257],[257,258],[258,386],[466,260],[260,388],[388,466],[456,399],[399,419],[419,456],[284,332],[332,333],[333,284],[417,285],[285,8],[8,417],[346,340],[340,261],[261,346],[413,441],[441,285],[285,413],[327,460],[460,328],[328,327],[355,371],[371,329],[329,355],[392,439],[439,438],[438,392],[382,341],[341,256],[256,382],[429,420],[420,360],[360,429],[364,394],[394,379],[379,364],[277,343],[343,437],[437,277],[443,444],[444,283],[283,443],[275,440],[440,363],[363,275],[431,262],[262,369],[369,431],[297,338],[338,337],[337,297],[273,375],[375,321],[321,273],[450,451],[451,349],[349,450],[446,342],[342,467],[467,446],[293,334],[334,282],[282,293],[458,461],[461,462],[462,458],[276,353],[353,383],[383,276],[308,324],[324,325],[325,308],[276,300],[300,293],[293,276],[372,345],[345,447],[447,372],[352,345],[345,340],[340,352],[274,1],[1,19],[19,274],[456,248],[248,281],[281,456],[436,427],[427,425],[425,436],[381,256],[256,252],[252,381],[269,391],[391,393],[393,269],[200,199],[199,428],[428,200],[266,330],[330,329],[329,266],[287,273],[273,422],[422,287],[250,462],[462,328],[328,250],[258,286],[286,384],[384,258],[265,353],[353,342],[342,265],[387,259],[259,257],[257,387],[424,431],[431,430],[430,424],[342,353],[353,276],[276,342],[273,335],[335,424],[424,273],[292,325],[325,307],[307,292],[366,447],[447,345],[345,366],[271,303],[303,302],[302,271],[423,266],[266,371],[371,423],[294,455],[455,460],[460,294],[279,278],[278,294],[294,279],[271,272],[272,304],[304,271],[432,434],[434,427],[427,432],[272,407],[407,408],[408,272],[394,430],[430,431],[431,394],[395,369],[369,400],[400,395],[334,333],[333,299],[299,334],[351,417],[417,168],[168,351],[352,280],[280,411],[411,352],[325,319],[319,320],[320,325],[295,296],[296,336],[336,295],[319,403],[403,404],[404,319],[330,348],[348,349],[349,330],[293,298],[298,333],[333,293],[323,454],[454,447],[447,323],[15,16],[16,315],[315,15],[358,429],[429,279],[279,358],[14,15],[15,316],[316,14],[285,336],[336,9],[9,285],[329,349],[349,350],[350,329],[374,380],[380,252],[252,374],[318,402],[402,403],[403,318],[6,197],[197,419],[419,6],[318,319],[319,325],[325,318],[367,364],[364,365],[365,367],[435,367],[367,397],[397,435],[344,438],[438,439],[439,344],[272,271],[271,311],[311,272],[195,5],[5,281],[281,195],[273,287],[287,291],[291,273],[396,428],[428,199],[199,396],[311,271],[271,268],[268,311],[283,444],[444,445],[445,283],[373,254],[254,339],[339,373],[282,334],[334,296],[296,282],[449,347],[347,346],[346,449],[264,447],[447,454],[454,264],[336,296],[296,299],[299,336],[338,10],[10,151],[151,338],[278,439],[439,455],[455,278],[292,407],[407,415],[415,292],[358,371],[371,355],[355,358],[340,345],[345,372],[372,340],[346,347],[347,280],[280,346],[442,443],[443,282],[282,442],[19,94],[94,370],[370,19],[441,442],[442,295],[295,441],[248,419],[419,197],[197,248],[263,255],[255,359],[359,263],[440,275],[275,274],[274,440],[300,383],[383,368],[368,300],[351,412],[412,465],[465,351],[263,467],[467,466],[466,263],[301,368],[368,389],[389,301],[395,378],[378,379],[379,395],[412,351],[351,419],[419,412],[436,426],[426,322],[322,436],[2,164],[164,393],[393,2],[370,462],[462,461],[461,370],[164,0],[0,267],[267,164],[302,11],[11,12],[12,302],[268,12],[12,13],[13,268],[293,300],[300,301],[301,293],[446,261],[261,340],[340,446],[330,266],[266,425],[425,330],[426,423],[423,391],[391,426],[429,355],[355,437],[437,429],[391,327],[327,326],[326,391],[440,457],[457,438],[438,440],[341,382],[382,362],[362,341],[459,457],[457,461],[461,459],[434,430],[430,394],[394,434],[414,463],[463,362],[362,414],[396,369],[369,262],[262,396],[354,461],[461,457],[457,354],[316,403],[403,402],[402,316],[315,404],[404,403],[403,315],[314,405],[405,404],[404,314],[313,406],[406,405],[405,313],[421,418],[418,406],[406,421],[366,401],[401,361],[361,366],[306,408],[408,407],[407,306],[291,409],[409,408],[408,291],[287,410],[410,409],[409,287],[432,436],[436,410],[410,432],[434,416],[416,411],[411,434],[264,368],[368,383],[383,264],[309,438],[438,457],[457,309],[352,376],[376,401],[401,352],[274,275],[275,4],[4,274],[421,428],[428,262],[262,421],[294,327],[327,358],[358,294],[433,416],[416,367],[367,433],[289,455],[455,439],[439,289],[462,370],[370,326],[326,462],[2,326],[326,370],[370,2],[305,460],[460,455],[455,305],[254,449],[449,448],[448,254],[255,261],[261,446],[446,255],[253,450],[450,449],[449,253],[252,451],[451,450],[450,252],[256,452],[452,451],[451,256],[341,453],[453,452],[452,341],[413,464],[464,463],[463,413],[441,413],[413,414],[414,441],[258,442],[442,441],[441,258],[257,443],[443,442],[442,257],[259,444],[444,443],[443,259],[260,445],[445,444],[444,260],[467,342],[342,445],[445,467],[459,458],[458,250],[250,459],[289,392],[392,290],[290,289],[290,328],[328,460],[460,290],[376,433],[433,435],[435,376],[250,290],[290,392],[392,250],[411,416],[416,433],[433,411],[341,463],[463,464],[464,341],[453,464],[464,465],[465,453],[357,465],[465,412],[412,357],[343,412],[412,399],[399,343],[360,363],[363,440],[440,360],[437,399],[399,456],[456,437],[420,456],[456,363],[363,420],[401,435],[435,288],[288,401],[372,383],[383,353],[353,372],[339,255],[255,249],[249,339],[448,261],[261,255],[255,448],[133,243],[243,190],[190,133],[133,155],[155,112],[112,133],[33,246],[246,247],[247,33],[33,130],[130,25],[25,33],[398,384],[384,286],[286,398],[362,398],[398,414],[414,362],[362,463],[463,341],[341,362],[263,359],[359,467],[467,263],[263,249],[249,255],[255,263],[466,467],[467,260],[260,466],[75,60],[60,166],[166,75],[238,239],[239,79],[79,238],[162,127],[127,139],[139,162],[72,11],[11,37],[37,72],[121,232],[232,120],[120,121],[73,72],[72,39],[39,73],[114,128],[128,47],[47,114],[233,232],[232,128],[128,233],[103,104],[104,67],[67,103],[152,175],[175,148],[148,152],[119,118],[118,101],[101,119],[74,73],[73,40],[40,74],[107,9],[9,108],[108,107],[49,48],[48,131],[131,49],[32,194],[194,211],[211,32],[184,74],[74,185],[185,184],[191,80],[80,183],[183,191],[185,40],[40,186],[186,185],[119,230],[230,118],[118,119],[210,202],[202,214],[214,210],[84,83],[83,17],[17,84],[77,76],[76,146],[146,77],[161,160],[160,30],[30,161],[190,56],[56,173],[173,190],[182,106],[106,194],[194,182],[138,135],[135,192],[192,138],[129,203],[203,98],[98,129],[54,21],[21,68],[68,54],[5,51],[51,4],[4,5],[145,144],[144,23],[23,145],[90,77],[77,91],[91,90],[207,205],[205,187],[187,207],[83,201],[201,18],[18,83],[181,91],[91,182],[182,181],[180,90],[90,181],[181,180],[16,85],[85,17],[17,16],[205,206],[206,36],[36,205],[176,148],[148,140],[140,176],[165,92],[92,39],[39,165],[245,193],[193,244],[244,245],[27,159],[159,28],[28,27],[30,247],[247,161],[161,30],[174,236],[236,196],[196,174],[103,54],[54,104],[104,103],[55,193],[193,8],[8,55],[111,117],[117,31],[31,111],[221,189],[189,55],[55,221],[240,98],[98,99],[99,240],[142,126],[126,100],[100,142],[219,166],[166,218],[218,219],[112,155],[155,26],[26,112],[198,209],[209,131],[131,198],[169,135],[135,150],[150,169],[114,47],[47,217],[217,114],[224,223],[223,53],[53,224],[220,45],[45,134],[134,220],[32,211],[211,140],[140,32],[109,67],[67,108],[108,109],[146,43],[43,91],[91,146],[231,230],[230,120],[120,231],[113,226],[226,247],[247,113],[105,63],[63,52],[52,105],[241,238],[238,242],[242,241],[124,46],[46,156],[156,124],[95,78],[78,96],[96,95],[70,46],[46,63],[63,70],[116,143],[143,227],[227,116],[116,123],[123,111],[111,116],[1,44],[44,19],[19,1],[3,236],[236,51],[51,3],[207,216],[216,205],[205,207],[26,154],[154,22],[22,26],[165,39],[39,167],[167,165],[199,200],[200,208],[208,199],[101,36],[36,100],[100,101],[43,57],[57,202],[202,43],[242,20],[20,99],[99,242],[56,28],[28,157],[157,56],[124,35],[35,113],[113,124],[29,160],[160,27],[27,29],[211,204],[204,210],[210,211],[124,113],[113,46],[46,124],[106,43],[43,204],[204,106],[96,62],[62,77],[77,96],[227,137],[137,116],[116,227],[73,41],[41,72],[72,73],[36,203],[203,142],[142,36],[235,64],[64,240],[240,235],[48,49],[49,64],[64,48],[42,41],[41,74],[74,42],[214,212],[212,207],[207,214],[183,42],[42,184],[184,183],[210,169],[169,211],[211,210],[140,170],[170,176],[176,140],[104,105],[105,69],[69,104],[193,122],[122,168],[168,193],[50,123],[123,187],[187,50],[89,96],[96,90],[90,89],[66,65],[65,107],[107,66],[179,89],[89,180],[180,179],[119,101],[101,120],[120,119],[68,63],[63,104],[104,68],[234,93],[93,227],[227,234],[16,15],[15,85],[85,16],[209,129],[129,49],[49,209],[15,14],[14,86],[86,15],[107,55],[55,9],[9,107],[120,100],[100,121],[121,120],[153,145],[145,22],[22,153],[178,88],[88,179],[179,178],[197,6],[6,196],[196,197],[89,88],[88,96],[96,89],[135,138],[138,136],[136,135],[138,215],[215,172],[172,138],[218,115],[115,219],[219,218],[41,42],[42,81],[81,41],[5,195],[195,51],[51,5],[57,43],[43,61],[61,57],[208,171],[171,199],[199,208],[41,81],[81,38],[38,41],[224,53],[53,225],[225,224],[24,144],[144,110],[110,24],[105,52],[52,66],[66,105],[118,229],[229,117],[117,118],[227,34],[34,234],[234,227],[66,107],[107,69],[69,66],[10,109],[109,151],[151,10],[219,48],[48,235],[235,219],[183,62],[62,191],[191,183],[142,129],[129,126],[126,142],[116,111],[111,143],[143,116],[118,117],[117,50],[50,118],[223,222],[222,52],[52,223],[94,19],[19,141],[141,94],[222,221],[221,65],[65,222],[196,3],[3,197],[197,196],[45,220],[220,44],[44,45],[156,70],[70,139],[139,156],[188,122],[122,245],[245,188],[139,71],[71,162],[162,139],[149,170],[170,150],[150,149],[122,188],[188,196],[196,122],[206,216],[216,92],[92,206],[164,2],[2,167],[167,164],[242,141],[141,241],[241,242],[0,164],[164,37],[37,0],[11,72],[72,12],[12,11],[12,38],[38,13],[13,12],[70,63],[63,71],[71,70],[31,226],[226,111],[111,31],[36,101],[101,205],[205,36],[203,206],[206,165],[165,203],[126,209],[209,217],[217,126],[98,165],[165,97],[97,98],[237,220],[220,218],[218,237],[237,239],[239,241],[241,237],[210,214],[214,169],[169,210],[140,171],[171,32],[32,140],[241,125],[125,237],[237,241],[179,86],[86,178],[178,179],[180,85],[85,179],[179,180],[181,84],[84,180],[180,181],[182,83],[83,181],[181,182],[194,201],[201,182],[182,194],[177,137],[137,132],[132,177],[184,76],[76,183],[183,184],[185,61],[61,184],[184,185],[186,57],[57,185],[185,186],[216,212],[212,186],[186,216],[192,214],[214,187],[187,192],[139,34],[34,156],[156,139],[218,79],[79,237],[237,218],[147,123],[123,177],[177,147],[45,44],[44,4],[4,45],[208,201],[201,32],[32,208],[98,64],[64,129],[129,98],[192,213],[213,138],[138,192],[235,59],[59,219],[219,235],[141,242],[242,97],[97,141],[97,2],[2,141],[141,97],[240,75],[75,235],[235,240],[229,24],[24,228],[228,229],[31,25],[25,226],[226,31],[230,23],[23,229],[229,230],[231,22],[22,230],[230,231],[232,26],[26,231],[231,232],[233,112],[112,232],[232,233],[244,189],[189,243],[243,244],[189,221],[221,190],[190,189],[222,28],[28,221],[221,222],[223,27],[27,222],[222,223],[224,29],[29,223],[223,224],[225,30],[30,224],[224,225],[113,247],[247,225],[225,113],[99,60],[60,240],[240,99],[213,147],[147,215],[215,213],[60,20],[20,166],[166,60],[192,187],[187,213],[213,192],[243,112],[112,244],[244,243],[244,233],[233,245],[245,244],[245,128],[128,188],[188,245],[188,114],[114,174],[174,188],[134,131],[131,220],[220,134],[174,217],[217,236],[236,174],[236,198],[198,134],[134,236],[215,177],[177,58],[58,215],[156,143],[143,124],[124,156],[25,110],[110,7],[7,25],[31,228],[228,25],[25,31],[264,356],[356,368],[368,264],[0,11],[11,267],[267,0],[451,452],[452,349],[349,451],[267,302],[302,269],[269,267],[350,357],[357,277],[277,350],[350,452],[452,357],[357,350],[299,333],[333,297],[297,299],[396,175],[175,377],[377,396],[280,347],[347,330],[330,280],[269,303],[303,270],[270,269],[151,9],[9,337],[337,151],[344,278],[278,360],[360,344],[424,418],[418,431],[431,424],[270,304],[304,409],[409,270],[272,310],[310,407],[407,272],[322,270],[270,410],[410,322],[449,450],[450,347],[347,449],[432,422],[422,434],[434,432],[18,313],[313,17],[17,18],[291,306],[306,375],[375,291],[259,387],[387,260],[260,259],[424,335],[335,418],[418,424],[434,364],[364,416],[416,434],[391,423],[423,327],[327,391],[301,251],[251,298],[298,301],[275,281],[281,4],[4,275],[254,373],[373,253],[253,254],[375,307],[307,321],[321,375],[280,425],[425,411],[411,280],[200,421],[421,18],[18,200],[335,321],[321,406],[406,335],[321,320],[320,405],[405,321],[314,315],[315,17],[17,314],[423,426],[426,266],[266,423],[396,377],[377,369],[369,396],[270,322],[322,269],[269,270],[413,417],[417,464],[464,413],[385,386],[386,258],[258,385],[248,456],[456,419],[419,248],[298,284],[284,333],[333,298],[168,417],[417,8],[8,168],[448,346],[346,261],[261,448],[417,413],[413,285],[285,417],[326,327],[327,328],[328,326],[277,355],[355,329],[329,277],[309,392],[392,438],[438,309],[381,382],[382,256],[256,381],[279,429],[429,360],[360,279],[365,364],[364,379],[379,365],[355,277],[277,437],[437,355],[282,443],[443,283],[283,282],[281,275],[275,363],[363,281],[395,431],[431,369],[369,395],[299,297],[297,337],[337,299],[335,273],[273,321],[321,335],[348,450],[450,349],[349,348],[359,446],[446,467],[467,359],[283,293],[293,282],[282,283],[250,458],[458,462],[462,250],[300,276],[276,383],[383,300],[292,308],[308,325],[325,292],[283,276],[276,293],[293,283],[264,372],[372,447],[447,264],[346,352],[352,340],[340,346],[354,274],[274,19],[19,354],[363,456],[456,281],[281,363],[426,436],[436,425],[425,426],[380,381],[381,252],[252,380],[267,269],[269,393],[393,267],[421,200],[200,428],[428,421],[371,266],[266,329],[329,371],[432,287],[287,422],[422,432],[290,250],[250,328],[328,290],[385,258],[258,384],[384,385],[446,265],[265,342],[342,446],[386,387],[387,257],[257,386],[422,424],[424,430],[430,422],[445,342],[342,276],[276,445],[422,273],[273,424],[424,422],[306,292],[292,307],[307,306],[352,366],[366,345],[345,352],[268,271],[271,302],[302,268],[358,423],[423,371],[371,358],[327,294],[294,460],[460,327],[331,279],[279,294],[294,331],[303,271],[271,304],[304,303],[436,432],[432,427],[427,436],[304,272],[272,408],[408,304],[395,394],[394,431],[431,395],[378,395],[395,400],[400,378],[296,334],[334,299],[299,296],[6,351],[351,168],[168,6],[376,352],[352,411],[411,376],[307,325],[325,320],[320,307],[285,295],[295,336],[336,285],[320,319],[319,404],[404,320],[329,330],[330,349],[349,329],[334,293],[293,333],[333,334],[366,323],[323,447],[447,366],[316,15],[15,315],[315,316],[331,358],[358,279],[279,331],[317,14],[14,316],[316,317],[8,285],[285,9],[9,8],[277,329],[329,350],[350,277],[253,374],[374,252],[252,253],[319,318],[318,403],[403,319],[351,6],[6,419],[419,351],[324,318],[318,325],[325,324],[397,367],[367,365],[365,397],[288,435],[435,397],[397,288],[278,344],[344,439],[439,278],[310,272],[272,311],[311,310],[248,195],[195,281],[281,248],[375,273],[273,291],[291,375],[175,396],[396,199],[199,175],[312,311],[311,268],[268,312],[276,283],[283,445],[445,276],[390,373],[373,339],[339,390],[295,282],[282,296],[296,295],[448,449],[449,346],[346,448],[356,264],[264,454],[454,356],[337,336],[336,299],[299,337],[337,338],[338,151],[151,337],[294,278],[278,455],[455,294],[308,292],[292,415],[415,308],[429,358],[358,355],[355,429],[265,340],[340,372],[372,265],[352,346],[346,280],[280,352],[295,442],[442,282],[282,295],[354,19],[19,370],[370,354],[285,441],[441,295],[295,285],[195,248],[248,197],[197,195],[457,440],[440,274],[274,457],[301,300],[300,368],[368,301],[417,351],[351,465],[465,417],[251,301],[301,389],[389,251],[394,395],[395,379],[379,394],[399,412],[412,419],[419,399],[410,436],[436,322],[322,410],[326,2],[2,393],[393,326],[354,370],[370,461],[461,354],[393,164],[164,267],[267,393],[268,302],[302,12],[12,268],[312,268],[268,13],[13,312],[298,293],[293,301],[301,298],[265,446],[446,340],[340,265],[280,330],[330,425],[425,280],[322,426],[426,391],[391,322],[420,429],[429,437],[437,420],[393,391],[391,326],[326,393],[344,440],[440,438],[438,344],[458,459],[459,461],[461,458],[364,434],[434,394],[394,364],[428,396],[396,262],[262,428],[274,354],[354,457],[457,274],[317,316],[316,402],[402,317],[316,315],[315,403],[403,316],[315,314],[314,404],[404,315],[314,313],[313,405],[405,314],[313,421],[421,406],[406,313],[323,366],[366,361],[361,323],[292,306],[306,407],[407,292],[306,291],[291,408],[408,306],[291,287],[287,409],[409,291],[287,432],[432,410],[410,287],[427,434],[434,411],[411,427],[372,264],[264,383],[383,372],[459,309],[309,457],[457,459],[366,352],[352,401],[401,366],[1,274],[274,4],[4,1],[418,421],[421,262],[262,418],[331,294],[294,358],[358,331],[435,433],[433,367],[367,435],[392,289],[289,439],[439,392],[328,462],[462,326],[326,328],[94,2],[2,370],[370,94],[289,305],[305,455],[455,289],[339,254],[254,448],[448,339],[359,255],[255,446],[446,359],[254,253],[253,449],[449,254],[253,252],[252,450],[450,253],[252,256],[256,451],[451,252],[256,341],[341,452],[452,256],[414,413],[413,463],[463,414],[286,441],[441,414],[414,286],[286,258],[258,441],[441,286],[258,257],[257,442],[442,258],[257,259],[259,443],[443,257],[259,260],[260,444],[444,259],[260,467],[467,445],[445,260],[309,459],[459,250],[250,309],[305,289],[289,290],[290,305],[305,290],[290,460],[460,305],[401,376],[376,435],[435,401],[309,250],[250,392],[392,309],[376,411],[411,433],[433,376],[453,341],[341,464],[464,453],[357,453],[453,465],[465,357],[343,357],[357,412],[412,343],[437,343],[343,399],[399,437],[344,360],[360,440],[440,344],[420,437],[437,456],[456,420],[360,420],[420,363],[363,360],[361,401],[401,288],[288,361],[265,372],[372,353],[353,265],[390,339],[339,249],[249,390],[339,448],[448,255],[255,339]);function Gm(e){e.j={faceLandmarks:[],faceBlendshapes:[],facialTransformationMatrixes:[]}}var Ie=class extends Kn{constructor(e,t){super(new Ai(e,t),"image_in","norm_rect",!1),this.j={faceLandmarks:[],faceBlendshapes:[],facialTransformationMatrixes:[]},this.outputFacialTransformationMatrixes=this.outputFaceBlendshapes=!1,wt(e=this.h=new F_,0,1,t=new Ue),this.A=new N_,wt(this.h,0,3,this.A),this.u=new Fl,wt(this.h,0,2,this.u),hr(this.u,4,1),Tt(this.u,2,.5),Tt(this.A,2,.5),Tt(this.h,4,.5)}get baseOptions(){return Jt(this.h,Ue,1)}set baseOptions(e){wt(this.h,0,1,e)}o(e){return"numFaces"in e&&hr(this.u,4,e.numFaces??1),"minFaceDetectionConfidence"in e&&Tt(this.u,2,e.minFaceDetectionConfidence??.5),"minTrackingConfidence"in e&&Tt(this.h,4,e.minTrackingConfidence??.5),"minFacePresenceConfidence"in e&&Tt(this.A,2,e.minFacePresenceConfidence??.5),"outputFaceBlendshapes"in e&&(this.outputFaceBlendshapes=!!e.outputFaceBlendshapes),"outputFacialTransformationMatrixes"in e&&(this.outputFacialTransformationMatrixes=!!e.outputFacialTransformationMatrixes),this.l(e)}F(e,t){return Gm(this),Ti(this,e,t),this.j}G(e,t,n){return Gm(this),Wi(this,e,n,t),this.j}m(){var e=new Zn;Pe(e,"image_in"),Pe(e,"norm_rect"),ne(e,"face_landmarks");const t=new jn;Vi(t,iT,this.h);const n=new In;Yn(n,2,"mediapipe.tasks.vision.face_landmarker.FaceLandmarkerGraph"),Ee(n,"IMAGE:image_in"),Ee(n,"NORM_RECT:norm_rect"),Wt(n,"NORM_LANDMARKS:face_landmarks"),n.o(t),ci(e,n),this.g.attachProtoVectorListener("face_landmarks",(i,r)=>{for(const s of i)i=za(s),this.j.faceLandmarks.push(Ol(i));ft(this,r)}),this.g.attachEmptyPacketListener("face_landmarks",i=>{ft(this,i)}),this.outputFaceBlendshapes&&(ne(e,"blendshapes"),Wt(n,"BLENDSHAPES:blendshapes"),this.g.attachProtoVectorListener("blendshapes",(i,r)=>{if(this.outputFaceBlendshapes)for(const s of i)i=Nl(s),this.j.faceBlendshapes.push(ad(i.g()??[]));ft(this,r)}),this.g.attachEmptyPacketListener("blendshapes",i=>{ft(this,i)})),this.outputFacialTransformationMatrixes&&(ne(e,"face_geometry"),Wt(n,"FACE_GEOMETRY:face_geometry"),this.g.attachProtoVectorListener("face_geometry",(i,r)=>{if(this.outputFacialTransformationMatrixes)for(const s of i)(i=Jt(i=nT(s),qA,2))&&this.j.facialTransformationMatrixes.push({rows:oi(i,1)??0??0,columns:oi(i,2)??0??0,data:as(i,3,Ui,os()).slice()??[]});ft(this,r)}),this.g.attachEmptyPacketListener("face_geometry",i=>{ft(this,i)})),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};Ie.prototype.detectForVideo=Ie.prototype.G,Ie.prototype.detect=Ie.prototype.F,Ie.prototype.setOptions=Ie.prototype.o,Ie.createFromModelPath=function(e,t){return Yt(Ie,e,{baseOptions:{modelAssetPath:t}})},Ie.createFromModelBuffer=function(e,t){return Yt(Ie,e,{baseOptions:{modelAssetBuffer:t}})},Ie.createFromOptions=function(e,t){return Yt(Ie,e,t)},Ie.FACE_LANDMARKS_LIPS=ud,Ie.FACE_LANDMARKS_LEFT_EYE=hd,Ie.FACE_LANDMARKS_LEFT_EYEBROW=fd,Ie.FACE_LANDMARKS_LEFT_IRIS=hv,Ie.FACE_LANDMARKS_RIGHT_EYE=dd,Ie.FACE_LANDMARKS_RIGHT_EYEBROW=pd,Ie.FACE_LANDMARKS_RIGHT_IRIS=fv,Ie.FACE_LANDMARKS_FACE_OVAL=md,Ie.FACE_LANDMARKS_CONTOURS=dv,Ie.FACE_LANDMARKS_TESSELATION=pv;var gd=bi([0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],[9,13],[13,14],[14,15],[15,16],[13,17],[0,17],[17,18],[18,19],[19,20]);function Vm(e){e.gestures=[],e.landmarks=[],e.worldLandmarks=[],e.handedness=[]}function Hm(e){return e.gestures.length===0?{gestures:[],landmarks:[],worldLandmarks:[],handedness:[],handednesses:[]}:{gestures:e.gestures,landmarks:e.landmarks,worldLandmarks:e.worldLandmarks,handedness:e.handedness,handednesses:e.handedness}}function Wm(e,t=!0){const n=[];for(const r of e){var i=Nl(r);e=[];for(const s of i.g())i=t&&oi(s,1)!=null?oi(s,1)??0:-1,e.push({score:Fe(s,2)??0,index:i,categoryName:cn(we(s,3))??""??"",displayName:cn(we(s,4))??""??""});n.push(e)}return n}var kn=class extends Kn{constructor(e,t){super(new Ai(e,t),"image_in","norm_rect",!1),this.gestures=[],this.landmarks=[],this.worldLandmarks=[],this.handedness=[],wt(e=this.j=new B_,0,1,t=new Ue),this.u=new id,wt(this.j,0,2,this.u),this.D=new nd,wt(this.u,0,3,this.D),this.A=new k_,wt(this.u,0,2,this.A),this.h=new rT,wt(this.j,0,3,this.h),Tt(this.A,2,.5),Tt(this.u,4,.5),Tt(this.D,2,.5)}get baseOptions(){return Jt(this.j,Ue,1)}set baseOptions(e){wt(this.j,0,1,e)}o(e){var r,s,o,a;if(hr(this.A,3,e.numHands??1),"minHandDetectionConfidence"in e&&Tt(this.A,2,e.minHandDetectionConfidence??.5),"minTrackingConfidence"in e&&Tt(this.u,4,e.minTrackingConfidence??.5),"minHandPresenceConfidence"in e&&Tt(this.D,2,e.minHandPresenceConfidence??.5),e.cannedGesturesClassifierOptions){var t=new Ys,n=t,i=Wh(e.cannedGesturesClassifierOptions,(r=Jt(this.h,Ys,3))==null?void 0:r.l());wt(n,0,2,i),wt(this.h,0,3,t)}else e.cannedGesturesClassifierOptions===void 0&&((s=Jt(this.h,Ys,3))==null||s.g());return e.customGesturesClassifierOptions?(wt(n=t=new Ys,0,2,i=Wh(e.customGesturesClassifierOptions,(o=Jt(this.h,Ys,4))==null?void 0:o.l())),wt(this.h,0,4,t)):e.customGesturesClassifierOptions===void 0&&((a=Jt(this.h,Ys,4))==null||a.g()),this.l(e)}Ha(e,t){return Vm(this),Ti(this,e,t),Hm(this)}Ia(e,t,n){return Vm(this),Wi(this,e,n,t),Hm(this)}m(){var e=new Zn;Pe(e,"image_in"),Pe(e,"norm_rect"),ne(e,"hand_gestures"),ne(e,"hand_landmarks"),ne(e,"world_hand_landmarks"),ne(e,"handedness");const t=new jn;Vi(t,sT,this.j);const n=new In;Yn(n,2,"mediapipe.tasks.vision.gesture_recognizer.GestureRecognizerGraph"),Ee(n,"IMAGE:image_in"),Ee(n,"NORM_RECT:norm_rect"),Wt(n,"HAND_GESTURES:hand_gestures"),Wt(n,"LANDMARKS:hand_landmarks"),Wt(n,"WORLD_LANDMARKS:world_hand_landmarks"),Wt(n,"HANDEDNESS:handedness"),n.o(t),ci(e,n),this.g.attachProtoVectorListener("hand_landmarks",(i,r)=>{for(const s of i){i=za(s);const o=[];for(const a of ur(i,P_,1))o.push({x:Fe(a,1)??0,y:Fe(a,2)??0,z:Fe(a,3)??0,visibility:Fe(a,4)??0});this.landmarks.push(o)}ft(this,r)}),this.g.attachEmptyPacketListener("hand_landmarks",i=>{ft(this,i)}),this.g.attachProtoVectorListener("world_hand_landmarks",(i,r)=>{for(const s of i){i=co(s);const o=[];for(const a of ur(i,R_,1))o.push({x:Fe(a,1)??0,y:Fe(a,2)??0,z:Fe(a,3)??0,visibility:Fe(a,4)??0});this.worldLandmarks.push(o)}ft(this,r)}),this.g.attachEmptyPacketListener("world_hand_landmarks",i=>{ft(this,i)}),this.g.attachProtoVectorListener("hand_gestures",(i,r)=>{this.gestures.push(...Wm(i,!1)),ft(this,r)}),this.g.attachEmptyPacketListener("hand_gestures",i=>{ft(this,i)}),this.g.attachProtoVectorListener("handedness",(i,r)=>{this.handedness.push(...Wm(i)),ft(this,r)}),this.g.attachEmptyPacketListener("handedness",i=>{ft(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};function Xm(e){return{landmarks:e.landmarks,worldLandmarks:e.worldLandmarks,handednesses:e.handedness,handedness:e.handedness}}kn.prototype.recognizeForVideo=kn.prototype.Ia,kn.prototype.recognize=kn.prototype.Ha,kn.prototype.setOptions=kn.prototype.o,kn.createFromModelPath=function(e,t){return Yt(kn,e,{baseOptions:{modelAssetPath:t}})},kn.createFromModelBuffer=function(e,t){return Yt(kn,e,{baseOptions:{modelAssetBuffer:t}})},kn.createFromOptions=function(e,t){return Yt(kn,e,t)},kn.HAND_CONNECTIONS=gd;var An=class extends Kn{constructor(e,t){super(new Ai(e,t),"image_in","norm_rect",!1),this.landmarks=[],this.worldLandmarks=[],this.handedness=[],wt(e=this.h=new id,0,1,t=new Ue),this.u=new nd,wt(this.h,0,3,this.u),this.j=new k_,wt(this.h,0,2,this.j),hr(this.j,3,1),Tt(this.j,2,.5),Tt(this.u,2,.5),Tt(this.h,4,.5)}get baseOptions(){return Jt(this.h,Ue,1)}set baseOptions(e){wt(this.h,0,1,e)}o(e){return"numHands"in e&&hr(this.j,3,e.numHands??1),"minHandDetectionConfidence"in e&&Tt(this.j,2,e.minHandDetectionConfidence??.5),"minTrackingConfidence"in e&&Tt(this.h,4,e.minTrackingConfidence??.5),"minHandPresenceConfidence"in e&&Tt(this.u,2,e.minHandPresenceConfidence??.5),this.l(e)}F(e,t){return this.landmarks=[],this.worldLandmarks=[],this.handedness=[],Ti(this,e,t),Xm(this)}G(e,t,n){return this.landmarks=[],this.worldLandmarks=[],this.handedness=[],Wi(this,e,n,t),Xm(this)}m(){var e=new Zn;Pe(e,"image_in"),Pe(e,"norm_rect"),ne(e,"hand_landmarks"),ne(e,"world_hand_landmarks"),ne(e,"handedness");const t=new jn;Vi(t,oT,this.h);const n=new In;Yn(n,2,"mediapipe.tasks.vision.hand_landmarker.HandLandmarkerGraph"),Ee(n,"IMAGE:image_in"),Ee(n,"NORM_RECT:norm_rect"),Wt(n,"LANDMARKS:hand_landmarks"),Wt(n,"WORLD_LANDMARKS:world_hand_landmarks"),Wt(n,"HANDEDNESS:handedness"),n.o(t),ci(e,n),this.g.attachProtoVectorListener("hand_landmarks",(i,r)=>{for(const s of i)i=za(s),this.landmarks.push(Ol(i));ft(this,r)}),this.g.attachEmptyPacketListener("hand_landmarks",i=>{ft(this,i)}),this.g.attachProtoVectorListener("world_hand_landmarks",(i,r)=>{for(const s of i)i=co(s),this.worldLandmarks.push(da(i));ft(this,r)}),this.g.attachEmptyPacketListener("world_hand_landmarks",i=>{ft(this,i)}),this.g.attachProtoVectorListener("handedness",(i,r)=>{var s=this.handedness,o=s.push;const a=[];for(const c of i){i=Nl(c);const l=[];for(const u of i.g())l.push({score:Fe(u,2)??0,index:oi(u,1)??0??-1,categoryName:cn(we(u,3))??""??"",displayName:cn(we(u,4))??""??""});a.push(l)}o.call(s,...a),ft(this,r)}),this.g.attachEmptyPacketListener("handedness",i=>{ft(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};An.prototype.detectForVideo=An.prototype.G,An.prototype.detect=An.prototype.F,An.prototype.setOptions=An.prototype.o,An.createFromModelPath=function(e,t){return Yt(An,e,{baseOptions:{modelAssetPath:t}})},An.createFromModelBuffer=function(e,t){return Yt(An,e,{baseOptions:{modelAssetBuffer:t}})},An.createFromOptions=function(e,t){return Yt(An,e,t)},An.HAND_CONNECTIONS=gd;var mv=bi([0,1],[1,2],[2,3],[3,7],[0,4],[4,5],[5,6],[6,8],[9,10],[11,12],[11,13],[13,15],[15,17],[15,19],[15,21],[17,19],[12,14],[14,16],[16,18],[16,20],[16,22],[18,20],[11,23],[12,24],[23,24],[23,25],[24,26],[25,27],[26,28],[27,29],[28,30],[29,31],[30,32],[27,31],[28,32]);function $m(e){e.h={faceLandmarks:[],faceBlendshapes:[],poseLandmarks:[],poseWorldLandmarks:[],poseSegmentationMasks:[],leftHandLandmarks:[],leftHandWorldLandmarks:[],rightHandLandmarks:[],rightHandWorldLandmarks:[]}}function qm(e){try{if(!e.D)return e.h;e.D(e.h)}finally{Bl(e)}}function Ac(e,t){e=za(e),t.push(Ol(e))}var ye=class extends Kn{constructor(e,t){super(new Ai(e,t),"input_frames_image",null,!1),this.h={faceLandmarks:[],faceBlendshapes:[],poseLandmarks:[],poseWorldLandmarks:[],poseSegmentationMasks:[],leftHandLandmarks:[],leftHandWorldLandmarks:[],rightHandLandmarks:[],rightHandWorldLandmarks:[]},this.outputPoseSegmentationMasks=this.outputFaceBlendshapes=!1,wt(e=this.j=new W_,0,1,t=new Ue),this.I=new nd,wt(this.j,0,2,this.I),this.W=new aT,wt(this.j,0,3,this.W),this.u=new Fl,wt(this.j,0,4,this.u),this.O=new N_,wt(this.j,0,5,this.O),this.A=new V_,wt(this.j,0,6,this.A),this.M=new H_,wt(this.j,0,7,this.M),Tt(this.u,2,.5),Tt(this.u,3,.3),Tt(this.O,2,.5),Tt(this.A,2,.5),Tt(this.A,3,.3),Tt(this.M,2,.5),Tt(this.I,2,.5)}get baseOptions(){return Jt(this.j,Ue,1)}set baseOptions(e){wt(this.j,0,1,e)}o(e){return"minFaceDetectionConfidence"in e&&Tt(this.u,2,e.minFaceDetectionConfidence??.5),"minFaceSuppressionThreshold"in e&&Tt(this.u,3,e.minFaceSuppressionThreshold??.3),"minFacePresenceConfidence"in e&&Tt(this.O,2,e.minFacePresenceConfidence??.5),"outputFaceBlendshapes"in e&&(this.outputFaceBlendshapes=!!e.outputFaceBlendshapes),"minPoseDetectionConfidence"in e&&Tt(this.A,2,e.minPoseDetectionConfidence??.5),"minPoseSuppressionThreshold"in e&&Tt(this.A,3,e.minPoseSuppressionThreshold??.3),"minPosePresenceConfidence"in e&&Tt(this.M,2,e.minPosePresenceConfidence??.5),"outputPoseSegmentationMasks"in e&&(this.outputPoseSegmentationMasks=!!e.outputPoseSegmentationMasks),"minHandLandmarksConfidence"in e&&Tt(this.I,2,e.minHandLandmarksConfidence??.5),this.l(e)}F(e,t,n){const i=typeof t!="function"?t:{};return this.D=typeof t=="function"?t:n,$m(this),Ti(this,e,i),qm(this)}G(e,t,n,i){const r=typeof n!="function"?n:{};return this.D=typeof n=="function"?n:i,$m(this),Wi(this,e,r,t),qm(this)}m(){var e=new Zn;Pe(e,"input_frames_image"),ne(e,"pose_landmarks"),ne(e,"pose_world_landmarks"),ne(e,"face_landmarks"),ne(e,"left_hand_landmarks"),ne(e,"left_hand_world_landmarks"),ne(e,"right_hand_landmarks"),ne(e,"right_hand_world_landmarks");const t=new jn,n=new _m;Yn(n,1,"type.googleapis.com/mediapipe.tasks.vision.holistic_landmarker.proto.HolisticLandmarkerGraphOptions"),function(r,s){if(s!=null)if(Array.isArray(s))de(r,2,El(s,0,Aa));else{if(!(typeof s=="string"||s instanceof Ni||Mf(s)))throw Error("invalid value in Any.value field: "+s+" expected a ByteString, a base64 encoded string, a Uint8Array or a jspb array");br(r,2,bf(s,!1),Ss())}}(n,this.j.g());const i=new In;Yn(i,2,"mediapipe.tasks.vision.holistic_landmarker.HolisticLandmarkerGraph"),kf(i,8,_m,n),Ee(i,"IMAGE:input_frames_image"),Wt(i,"POSE_LANDMARKS:pose_landmarks"),Wt(i,"POSE_WORLD_LANDMARKS:pose_world_landmarks"),Wt(i,"FACE_LANDMARKS:face_landmarks"),Wt(i,"LEFT_HAND_LANDMARKS:left_hand_landmarks"),Wt(i,"LEFT_HAND_WORLD_LANDMARKS:left_hand_world_landmarks"),Wt(i,"RIGHT_HAND_LANDMARKS:right_hand_landmarks"),Wt(i,"RIGHT_HAND_WORLD_LANDMARKS:right_hand_world_landmarks"),i.o(t),ci(e,i),kl(this,e),this.g.attachProtoListener("pose_landmarks",(r,s)=>{Ac(r,this.h.poseLandmarks),ft(this,s)}),this.g.attachEmptyPacketListener("pose_landmarks",r=>{ft(this,r)}),this.g.attachProtoListener("pose_world_landmarks",(r,s)=>{var o=this.h.poseWorldLandmarks;r=co(r),o.push(da(r)),ft(this,s)}),this.g.attachEmptyPacketListener("pose_world_landmarks",r=>{ft(this,r)}),this.outputPoseSegmentationMasks&&(Wt(i,"POSE_SEGMENTATION_MASK:pose_segmentation_mask"),To(this,"pose_segmentation_mask"),this.g.Z("pose_segmentation_mask",(r,s)=>{this.h.poseSegmentationMasks=[Co(this,r,!0,!this.D)],ft(this,s)}),this.g.attachEmptyPacketListener("pose_segmentation_mask",r=>{this.h.poseSegmentationMasks=[],ft(this,r)})),this.g.attachProtoListener("face_landmarks",(r,s)=>{Ac(r,this.h.faceLandmarks),ft(this,s)}),this.g.attachEmptyPacketListener("face_landmarks",r=>{ft(this,r)}),this.outputFaceBlendshapes&&(ne(e,"extra_blendshapes"),Wt(i,"FACE_BLENDSHAPES:extra_blendshapes"),this.g.attachProtoListener("extra_blendshapes",(r,s)=>{var o=this.h.faceBlendshapes;this.outputFaceBlendshapes&&(r=Nl(r),o.push(ad(r.g()??[]))),ft(this,s)}),this.g.attachEmptyPacketListener("extra_blendshapes",r=>{ft(this,r)})),this.g.attachProtoListener("left_hand_landmarks",(r,s)=>{Ac(r,this.h.leftHandLandmarks),ft(this,s)}),this.g.attachEmptyPacketListener("left_hand_landmarks",r=>{ft(this,r)}),this.g.attachProtoListener("left_hand_world_landmarks",(r,s)=>{var o=this.h.leftHandWorldLandmarks;r=co(r),o.push(da(r)),ft(this,s)}),this.g.attachEmptyPacketListener("left_hand_world_landmarks",r=>{ft(this,r)}),this.g.attachProtoListener("right_hand_landmarks",(r,s)=>{Ac(r,this.h.rightHandLandmarks),ft(this,s)}),this.g.attachEmptyPacketListener("right_hand_landmarks",r=>{ft(this,r)}),this.g.attachProtoListener("right_hand_world_landmarks",(r,s)=>{var o=this.h.rightHandWorldLandmarks;r=co(r),o.push(da(r)),ft(this,s)}),this.g.attachEmptyPacketListener("right_hand_world_landmarks",r=>{ft(this,r)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};ye.prototype.detectForVideo=ye.prototype.G,ye.prototype.detect=ye.prototype.F,ye.prototype.setOptions=ye.prototype.o,ye.createFromModelPath=function(e,t){return Yt(ye,e,{baseOptions:{modelAssetPath:t}})},ye.createFromModelBuffer=function(e,t){return Yt(ye,e,{baseOptions:{modelAssetBuffer:t}})},ye.createFromOptions=function(e,t){return Yt(ye,e,t)},ye.HAND_CONNECTIONS=gd,ye.POSE_CONNECTIONS=mv,ye.FACE_LANDMARKS_LIPS=ud,ye.FACE_LANDMARKS_LEFT_EYE=hd,ye.FACE_LANDMARKS_LEFT_EYEBROW=fd,ye.FACE_LANDMARKS_LEFT_IRIS=hv,ye.FACE_LANDMARKS_RIGHT_EYE=dd,ye.FACE_LANDMARKS_RIGHT_EYEBROW=pd,ye.FACE_LANDMARKS_RIGHT_IRIS=fv,ye.FACE_LANDMARKS_FACE_OVAL=md,ye.FACE_LANDMARKS_CONTOURS=dv,ye.FACE_LANDMARKS_TESSELATION=pv;var ei=class extends Kn{constructor(e,t){super(new Ai(e,t),"input_image","norm_rect",!0),this.j={classifications:[]},wt(e=this.h=new X_,0,1,t=new Ue)}get baseOptions(){return Jt(this.h,Ue,1)}set baseOptions(e){wt(this.h,0,1,e)}o(e){return wt(this.h,0,2,Wh(e,Jt(this.h,td,2))),this.l(e)}sa(e,t){return this.j={classifications:[]},Ti(this,e,t),this.j}ta(e,t,n){return this.j={classifications:[]},Wi(this,e,n,t),this.j}m(){var e=new Zn;Pe(e,"input_image"),Pe(e,"norm_rect"),ne(e,"classifications");const t=new jn;Vi(t,cT,this.h);const n=new In;Yn(n,2,"mediapipe.tasks.vision.image_classifier.ImageClassifierGraph"),Ee(n,"IMAGE:input_image"),Ee(n,"NORM_RECT:norm_rect"),Wt(n,"CLASSIFICATIONS:classifications"),n.o(t),ci(e,n),this.g.attachProtoListener("classifications",(i,r)=>{this.j=pT(jA(i)),ft(this,r)}),this.g.attachEmptyPacketListener("classifications",i=>{ft(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};ei.prototype.classifyForVideo=ei.prototype.ta,ei.prototype.classify=ei.prototype.sa,ei.prototype.setOptions=ei.prototype.o,ei.createFromModelPath=function(e,t){return Yt(ei,e,{baseOptions:{modelAssetPath:t}})},ei.createFromModelBuffer=function(e,t){return Yt(ei,e,{baseOptions:{modelAssetBuffer:t}})},ei.createFromOptions=function(e,t){return Yt(ei,e,t)};var Bn=class extends Kn{constructor(e,t){super(new Ai(e,t),"image_in","norm_rect",!0),this.h=new $_,this.embeddings={embeddings:[]},wt(e=this.h,0,1,t=new Ue)}get baseOptions(){return Jt(this.h,Ue,1)}set baseOptions(e){wt(this.h,0,1,e)}o(e){var t=this.h,n=Jt(this.h,Tm,2);return n=n?n.clone():new Tm,e.l2Normalize!==void 0?de(n,1,ba(e.l2Normalize)):"l2Normalize"in e&&de(n,1),e.quantize!==void 0?de(n,2,ba(e.quantize)):"quantize"in e&&de(n,2),wt(t,0,2,n),this.l(e)}za(e,t){return Ti(this,e,t),this.embeddings}Aa(e,t,n){return Wi(this,e,n,t),this.embeddings}m(){var e=new Zn;Pe(e,"image_in"),Pe(e,"norm_rect"),ne(e,"embeddings_out");const t=new jn;Vi(t,lT,this.h);const n=new In;Yn(n,2,"mediapipe.tasks.vision.image_embedder.ImageEmbedderGraph"),Ee(n,"IMAGE:image_in"),Ee(n,"NORM_RECT:norm_rect"),Wt(n,"EMBEDDINGS:embeddings_out"),n.o(t),ci(e,n),this.g.attachProtoListener("embeddings_out",(i,r)=>{i=QA(i),this.embeddings=function(s){return{embeddings:ur(s,JA,1).map(o=>{var l,u;const a={headIndex:oi(o,3)??0??-1,headName:cn(we(o,4))??""??""};var c=o.v;return H0(c,0|c[yt],Am,Lu(o,1))!==void 0?(o=as(o=Jt(o,Am,Lu(o,1),void 0),1,Ui,os()),a.floatEmbedding=o.slice()):(c=new Uint8Array(0),a.quantizedEmbedding=((u=(l=Jt(o,ZA,Lu(o,2),void 0))==null?void 0:l.na())==null?void 0:u.h())??c),a}),timestampMs:Q_(we(s,2,void 0,void 0,el)??k0)}}(i),ft(this,r)}),this.g.attachEmptyPacketListener("embeddings_out",i=>{ft(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};Bn.cosineSimilarity=function(e,t){if(e.floatEmbedding&&t.floatEmbedding)e=Im(e.floatEmbedding,t.floatEmbedding);else{if(!e.quantizedEmbedding||!t.quantizedEmbedding)throw Error("Cannot compute cosine similarity between quantized and float embeddings.");e=Im(Lm(e.quantizedEmbedding),Lm(t.quantizedEmbedding))}return e},Bn.prototype.embedForVideo=Bn.prototype.Aa,Bn.prototype.embed=Bn.prototype.za,Bn.prototype.setOptions=Bn.prototype.o,Bn.createFromModelPath=function(e,t){return Yt(Bn,e,{baseOptions:{modelAssetPath:t}})},Bn.createFromModelBuffer=function(e,t){return Yt(Bn,e,{baseOptions:{modelAssetBuffer:t}})},Bn.createFromOptions=function(e,t){return Yt(Bn,e,t)};var Yh=class{constructor(e,t,n){this.confidenceMasks=e,this.categoryMask=t,this.qualityScores=n}close(){var e,t;(e=this.confidenceMasks)==null||e.forEach(n=>{n.close()}),(t=this.categoryMask)==null||t.close()}};function ST(e){var n,i;const t=function(r){return ur(r,In,1)}(e.ca()).filter(r=>(cn(we(r,1))??"").includes("mediapipe.tasks.TensorsToSegmentationCalculator"));if(e.u=[],t.length>1)throw Error("The graph has more than one mediapipe.tasks.TensorsToSegmentationCalculator.");t.length===1&&(((i=(n=Jt(t[0],jn,7))==null?void 0:n.j())==null?void 0:i.g())??new Map).forEach((r,s)=>{e.u[Number(s)]=cn(we(r,1))??""})}function Ym(e){e.categoryMask=void 0,e.confidenceMasks=void 0,e.qualityScores=void 0}function Km(e){try{const t=new Yh(e.confidenceMasks,e.categoryMask,e.qualityScores);if(!e.j)return t;e.j(t)}finally{Bl(e)}}Yh.prototype.close=Yh.prototype.close;var bn=class extends Kn{constructor(e,t){super(new Ai(e,t),"image_in","norm_rect",!1),this.u=[],this.outputCategoryMask=!1,this.outputConfidenceMasks=!0,this.h=new od,this.A=new q_,wt(this.h,0,3,this.A),wt(e=this.h,0,1,t=new Ue)}get baseOptions(){return Jt(this.h,Ue,1)}set baseOptions(e){wt(this.h,0,1,e)}o(e){return e.displayNamesLocale!==void 0?de(this.h,2,Oa(e.displayNamesLocale)):"displayNamesLocale"in e&&de(this.h,2),"outputCategoryMask"in e&&(this.outputCategoryMask=e.outputCategoryMask??!1),"outputConfidenceMasks"in e&&(this.outputConfidenceMasks=e.outputConfidenceMasks??!0),super.l(e)}L(){ST(this)}segment(e,t,n){const i=typeof t!="function"?t:{};return this.j=typeof t=="function"?t:n,Ym(this),Ti(this,e,i),Km(this)}La(e,t,n,i){const r=typeof n!="function"?n:{};return this.j=typeof n=="function"?n:i,Ym(this),Wi(this,e,r,t),Km(this)}Da(){return this.u}m(){var e=new Zn;Pe(e,"image_in"),Pe(e,"norm_rect");const t=new jn;Vi(t,K_,this.h);const n=new In;Yn(n,2,"mediapipe.tasks.vision.image_segmenter.ImageSegmenterGraph"),Ee(n,"IMAGE:image_in"),Ee(n,"NORM_RECT:norm_rect"),n.o(t),ci(e,n),kl(this,e),this.outputConfidenceMasks&&(ne(e,"confidence_masks"),Wt(n,"CONFIDENCE_MASKS:confidence_masks"),To(this,"confidence_masks"),this.g.aa("confidence_masks",(i,r)=>{this.confidenceMasks=i.map(s=>Co(this,s,!0,!this.j)),ft(this,r)}),this.g.attachEmptyPacketListener("confidence_masks",i=>{this.confidenceMasks=[],ft(this,i)})),this.outputCategoryMask&&(ne(e,"category_mask"),Wt(n,"CATEGORY_MASK:category_mask"),To(this,"category_mask"),this.g.Z("category_mask",(i,r)=>{this.categoryMask=Co(this,i,!1,!this.j),ft(this,r)}),this.g.attachEmptyPacketListener("category_mask",i=>{this.categoryMask=void 0,ft(this,i)})),ne(e,"quality_scores"),Wt(n,"QUALITY_SCORES:quality_scores"),this.g.attachFloatVectorListener("quality_scores",(i,r)=>{this.qualityScores=i,ft(this,r)}),this.g.attachEmptyPacketListener("quality_scores",i=>{this.categoryMask=void 0,ft(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};bn.prototype.getLabels=bn.prototype.Da,bn.prototype.segmentForVideo=bn.prototype.La,bn.prototype.segment=bn.prototype.segment,bn.prototype.setOptions=bn.prototype.o,bn.createFromModelPath=function(e,t){return Yt(bn,e,{baseOptions:{modelAssetPath:t}})},bn.createFromModelBuffer=function(e,t){return Yt(bn,e,{baseOptions:{modelAssetBuffer:t}})},bn.createFromOptions=function(e,t){return Yt(bn,e,t)};var Kh=class{constructor(e,t,n){this.confidenceMasks=e,this.categoryMask=t,this.qualityScores=n}close(){var e,t;(e=this.confidenceMasks)==null||e.forEach(n=>{n.close()}),(t=this.categoryMask)==null||t.close()}};Kh.prototype.close=Kh.prototype.close;var Ci=class extends Kn{constructor(e,t){super(new Ai(e,t),"image_in","norm_rect_in",!1),this.outputCategoryMask=!1,this.outputConfidenceMasks=!0,this.h=new od,this.u=new q_,wt(this.h,0,3,this.u),wt(e=this.h,0,1,t=new Ue)}get baseOptions(){return Jt(this.h,Ue,1)}set baseOptions(e){wt(this.h,0,1,e)}o(e){return"outputCategoryMask"in e&&(this.outputCategoryMask=e.outputCategoryMask??!1),"outputConfidenceMasks"in e&&(this.outputConfidenceMasks=e.outputConfidenceMasks??!0),super.l(e)}segment(e,t,n,i){const r=typeof n!="function"?n:{};if(this.j=typeof n=="function"?n:i,this.qualityScores=this.categoryMask=this.confidenceMasks=void 0,n=this.C+1,i=new j_,t.keypoint&&t.scribble)throw Error("Cannot provide both keypoint and scribble.");if(t.keypoint){var s=new Nu;br(s,3,ba(!0),!1),br(s,1,oa(t.keypoint.x),0),br(s,2,oa(t.keypoint.y),0),ha(i,1,Hh,s)}else{if(!t.scribble)throw Error("Must provide either a keypoint or a scribble.");{const a=new hT;for(s of t.scribble)br(t=new Nu,3,ba(!0),!1),br(t,1,oa(s.x),0),br(t,2,oa(s.y),0),kf(a,1,Nu,t);ha(i,2,Hh,a)}}this.g.addProtoToStream(i.g(),"mediapipe.tasks.vision.interactive_segmenter.proto.RegionOfInterest","roi_in",n),Ti(this,e,r);t:{try{const a=new Kh(this.confidenceMasks,this.categoryMask,this.qualityScores);if(!this.j){var o=a;break t}this.j(a)}finally{Bl(this)}o=void 0}return o}m(){var e=new Zn;Pe(e,"image_in"),Pe(e,"roi_in"),Pe(e,"norm_rect_in");const t=new jn;Vi(t,K_,this.h);const n=new In;Yn(n,2,"mediapipe.tasks.vision.interactive_segmenter.InteractiveSegmenterGraphV2"),Ee(n,"IMAGE:image_in"),Ee(n,"ROI:roi_in"),Ee(n,"NORM_RECT:norm_rect_in"),n.o(t),ci(e,n),kl(this,e),this.outputConfidenceMasks&&(ne(e,"confidence_masks"),Wt(n,"CONFIDENCE_MASKS:confidence_masks"),To(this,"confidence_masks"),this.g.aa("confidence_masks",(i,r)=>{this.confidenceMasks=i.map(s=>Co(this,s,!0,!this.j)),ft(this,r)}),this.g.attachEmptyPacketListener("confidence_masks",i=>{this.confidenceMasks=[],ft(this,i)})),this.outputCategoryMask&&(ne(e,"category_mask"),Wt(n,"CATEGORY_MASK:category_mask"),To(this,"category_mask"),this.g.Z("category_mask",(i,r)=>{this.categoryMask=Co(this,i,!1,!this.j),ft(this,r)}),this.g.attachEmptyPacketListener("category_mask",i=>{this.categoryMask=void 0,ft(this,i)})),ne(e,"quality_scores"),Wt(n,"QUALITY_SCORES:quality_scores"),this.g.attachFloatVectorListener("quality_scores",(i,r)=>{this.qualityScores=i,ft(this,r)}),this.g.attachEmptyPacketListener("quality_scores",i=>{this.categoryMask=void 0,ft(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};Ci.prototype.segment=Ci.prototype.segment,Ci.prototype.setOptions=Ci.prototype.o,Ci.createFromModelPath=function(e,t){return Yt(Ci,e,{baseOptions:{modelAssetPath:t}})},Ci.createFromModelBuffer=function(e,t){return Yt(Ci,e,{baseOptions:{modelAssetBuffer:t}})},Ci.createFromOptions=function(e,t){return Yt(Ci,e,t)};var ni=class extends Kn{constructor(e,t){super(new Ai(e,t),"input_frame_gpu","norm_rect",!1),this.j={detections:[]},wt(e=this.h=new Z_,0,1,t=new Ue)}get baseOptions(){return Jt(this.h,Ue,1)}set baseOptions(e){wt(this.h,0,1,e)}o(e){return e.displayNamesLocale!==void 0?de(this.h,2,Oa(e.displayNamesLocale)):"displayNamesLocale"in e&&de(this.h,2),e.maxResults!==void 0?hr(this.h,3,e.maxResults):"maxResults"in e&&de(this.h,3),e.scoreThreshold!==void 0?Tt(this.h,4,e.scoreThreshold):"scoreThreshold"in e&&de(this.h,4),e.categoryAllowlist!==void 0?il(this.h,5,e.categoryAllowlist):"categoryAllowlist"in e&&de(this.h,5),e.categoryDenylist!==void 0?il(this.h,6,e.categoryDenylist):"categoryDenylist"in e&&de(this.h,6),this.l(e)}F(e,t){return this.j={detections:[]},Ti(this,e,t),this.j}G(e,t,n){return this.j={detections:[]},Wi(this,e,n,t),this.j}m(){var e=new Zn;Pe(e,"input_frame_gpu"),Pe(e,"norm_rect"),ne(e,"detections");const t=new jn;Vi(t,fT,this.h);const n=new In;Yn(n,2,"mediapipe.tasks.vision.ObjectDetectorGraph"),Ee(n,"IMAGE:input_frame_gpu"),Ee(n,"NORM_RECT:norm_rect"),Wt(n,"DETECTIONS:detections"),n.o(t),ci(e,n),this.g.attachProtoVectorListener("detections",(i,r)=>{for(const s of i)i=C_(s),this.j.detections.push(tv(i));ft(this,r)}),this.g.attachEmptyPacketListener("detections",i=>{ft(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};ni.prototype.detectForVideo=ni.prototype.G,ni.prototype.detect=ni.prototype.F,ni.prototype.setOptions=ni.prototype.o,ni.createFromModelPath=async function(e,t){return Yt(ni,e,{baseOptions:{modelAssetPath:t}})},ni.createFromModelBuffer=function(e,t){return Yt(ni,e,{baseOptions:{modelAssetBuffer:t}})},ni.createFromOptions=function(e,t){return Yt(ni,e,t)};var jh=class{constructor(e,t,n){this.landmarks=e,this.worldLandmarks=t,this.segmentationMasks=n}close(){var e;(e=this.segmentationMasks)==null||e.forEach(t=>{t.close()})}};function jm(e){e.landmarks=[],e.worldLandmarks=[],e.segmentationMasks=void 0}function Zm(e){try{const t=new jh(e.landmarks,e.worldLandmarks,e.segmentationMasks);if(!e.u)return t;e.u(t)}finally{Bl(e)}}jh.prototype.close=jh.prototype.close;var zn=class extends Kn{constructor(e,t){super(new Ai(e,t),"image_in","norm_rect",!1),this.landmarks=[],this.worldLandmarks=[],this.outputSegmentationMasks=!1,wt(e=this.h=new J_,0,1,t=new Ue),this.A=new H_,wt(this.h,0,3,this.A),this.j=new V_,wt(this.h,0,2,this.j),hr(this.j,4,1),Tt(this.j,2,.5),Tt(this.A,2,.5),Tt(this.h,4,.5)}get baseOptions(){return Jt(this.h,Ue,1)}set baseOptions(e){wt(this.h,0,1,e)}o(e){return"numPoses"in e&&hr(this.j,4,e.numPoses??1),"minPoseDetectionConfidence"in e&&Tt(this.j,2,e.minPoseDetectionConfidence??.5),"minTrackingConfidence"in e&&Tt(this.h,4,e.minTrackingConfidence??.5),"minPosePresenceConfidence"in e&&Tt(this.A,2,e.minPosePresenceConfidence??.5),"outputSegmentationMasks"in e&&(this.outputSegmentationMasks=e.outputSegmentationMasks??!1),this.l(e)}F(e,t,n){const i=typeof t!="function"?t:{};return this.u=typeof t=="function"?t:n,jm(this),Ti(this,e,i),Zm(this)}G(e,t,n,i){const r=typeof n!="function"?n:{};return this.u=typeof n=="function"?n:i,jm(this),Wi(this,e,r,t),Zm(this)}m(){var e=new Zn;Pe(e,"image_in"),Pe(e,"norm_rect"),ne(e,"normalized_landmarks"),ne(e,"world_landmarks"),ne(e,"segmentation_masks");const t=new jn;Vi(t,dT,this.h);const n=new In;Yn(n,2,"mediapipe.tasks.vision.pose_landmarker.PoseLandmarkerGraph"),Ee(n,"IMAGE:image_in"),Ee(n,"NORM_RECT:norm_rect"),Wt(n,"NORM_LANDMARKS:normalized_landmarks"),Wt(n,"WORLD_LANDMARKS:world_landmarks"),n.o(t),ci(e,n),kl(this,e),this.g.attachProtoVectorListener("normalized_landmarks",(i,r)=>{this.landmarks=[];for(const s of i)i=za(s),this.landmarks.push(Ol(i));ft(this,r)}),this.g.attachEmptyPacketListener("normalized_landmarks",i=>{this.landmarks=[],ft(this,i)}),this.g.attachProtoVectorListener("world_landmarks",(i,r)=>{this.worldLandmarks=[];for(const s of i)i=co(s),this.worldLandmarks.push(da(i));ft(this,r)}),this.g.attachEmptyPacketListener("world_landmarks",i=>{this.worldLandmarks=[],ft(this,i)}),this.outputSegmentationMasks&&(Wt(n,"SEGMENTATION_MASK:segmentation_masks"),To(this,"segmentation_masks"),this.g.aa("segmentation_masks",(i,r)=>{this.segmentationMasks=i.map(s=>Co(this,s,!0,!this.u)),ft(this,r)}),this.g.attachEmptyPacketListener("segmentation_masks",i=>{this.segmentationMasks=[],ft(this,i)})),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};zn.prototype.detectForVideo=zn.prototype.G,zn.prototype.detect=zn.prototype.F,zn.prototype.setOptions=zn.prototype.o,zn.createFromModelPath=function(e,t){return Yt(zn,e,{baseOptions:{modelAssetPath:t}})},zn.createFromModelBuffer=function(e,t){return Yt(zn,e,{baseOptions:{modelAssetBuffer:t}})},zn.createFromOptions=function(e,t){return Yt(zn,e,t)},zn.POSE_CONNECTIONS=mv;const MT="https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm",ET="https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",Tc={WRIST:0,THUMB_TIP:4,INDEX_TIP:8,MIDDLE_MCP:9};class _d{constructor(t,n){Ot(this,"lastTimestampMs",-1);Ot(this,"lastResult",[]);this.landmarker=t,this.cs=n}static async create(t){const n=await js.forVisionTasks(MT),i=await An.createFromOptions(n,{baseOptions:{modelAssetPath:ET,delegate:"GPU"},runningMode:"VIDEO",numHands:2});return new _d(i,t)}detect(t,n){if(t.readyState<2||t.videoWidth===0)return[];if(n<=this.lastTimestampMs)return this.lastResult;this.lastTimestampMs=n;const i=this.landmarker.detectForVideo(t,n),r={width:t.videoWidth,height:t.videoHeight};return this.lastResult=i.landmarks.map((s,o)=>{var a,c;return{handedness:((c=(a=i.handednesses[o])==null?void 0:a[0])==null?void 0:c.categoryName)==="Left"?"Left":"Right",landmarks:s.map(l=>this.cs.videoToCamera(l,r))}}),this.lastResult}}const bT=.32,AT=.48;class TT{constructor(){Ot(this,"pinching",!1)}update(t){const n=Jm(t.wrist,t.middleMcp),i=n>0?Jm(t.thumbTip,t.indexTip)/n:Number.POSITIVE_INFINITY;let r=!1,s=!1;return!this.pinching&&i<bT?(this.pinching=!0,r=!0):this.pinching&&i>AT&&(this.pinching=!1,s=!0),{pinching:this.pinching,started:r,released:s,midpoint:{x:(t.thumbTip.x+t.indexTip.x)/2,y:(t.thumbTip.y+t.indexTip.y)/2}}}reset(){const t=this.pinching;return this.pinching=!1,t}}function Jm(e,t){return Math.hypot(t.x-e.x,t.y-e.y)}const wT={minCutoff:1.2,beta:.02,dCutoff:1};class Qm{constructor(t){Ot(this,"xPrev",null);Ot(this,"dxPrev",0);this.params=t}filter(t,n){if(this.xPrev===null||n<=0)return this.xPrev=t,t;const i=(t-this.xPrev)/n;this.dxPrev=eg(i,this.dxPrev,tg(this.params.dCutoff,n));const r=this.params.minCutoff+this.params.beta*Math.abs(this.dxPrev);return this.xPrev=eg(t,this.xPrev,tg(r,n)),this.xPrev}reset(){this.xPrev=null,this.dxPrev=0}}class CT{constructor(t=wT){Ot(this,"fx");Ot(this,"fy");Ot(this,"lastTimeMs",null);this.fx=new Qm(t),this.fy=new Qm(t)}filter(t,n){const i=this.lastTimeMs===null?0:(n-this.lastTimeMs)/1e3;return this.lastTimeMs=n,{x:this.fx.filter(t.x,i),y:this.fy.filter(t.y,i)}}reset(){this.fx.reset(),this.fy.reset(),this.lastTimeMs=null}}function tg(e,t){return 1/(1+1/(2*Math.PI*e)/t)}function eg(e,t,n){return n*e+(1-n)*t}const RT=250;class PT{constructor(t,n,i){Ot(this,"states",new Map);this.cs=t,this.driver=n,this.cursors=i}update(t,n){const i=new Set;for(const r of t){const s=`hand:${r.handedness}`;i.add(s);let o=this.states.get(s);o||(o={pinch:new TT,filter:new CT,lastSeenMs:n},this.states.set(s,o)),o.lastSeenMs=n;const a=o.pinch.update({thumbTip:r.landmarks[Tc.THUMB_TIP],indexTip:r.landmarks[Tc.INDEX_TIP],wrist:r.landmarks[Tc.WRIST],middleMcp:r.landmarks[Tc.MIDDLE_MCP]}),c=this.cs.cameraToWorld(Zh(a.midpoint.x,a.midpoint.y)),l=o.filter.filter(c,n),u=this.cs.worldToMath(Bu(l.x,l.y)),h=Gt(u.x,u.y);a.started?this.driver.grab(s,h,Yp):a.pinching?this.driver.move(s,h):(a.released&&this.driver.release(s),this.driver.hover(s,h,Yp)),this.cursors.set(s,l,a.pinching)}for(const[r,s]of this.states)i.has(r)||n-s.lastSeenMs<=RT||(s.pinch.reset()&&this.driver.release(r),this.driver.hover(r,null),this.cursors.set(r,null,!1),this.states.delete(r))}}const ng=6,Ou=16777215,LT=5951938;class IT{constructor(){Ot(this,"group",new rs);Ot(this,"cursors",new Map)}set(t,n,i){let r=this.cursors.get(t);if(!r){if(n===null)return;r=this.makeCursor(),this.cursors.set(t,r)}const s=n!==null;if(r.ring.visible=s,r.dot.visible=s,n===null)return;r.ring.position.set(n.x,n.y,ng),r.dot.position.set(n.x,n.y,ng+.5);const o=i?1.8:1;r.dot.scale.set(o,o,1),r.dotMaterial.color.set(i?LT:Ou)}makeCursor(){const t=new ee(new Tr(9,11,32),new xs({color:Ou,transparent:!0,opacity:.85})),n=new xs({color:Ou,transparent:!0,opacity:.95}),i=new ee(new ss(3.5,20),n);return this.group.add(t,i),{ring:t,dot:i,dotMaterial:n}}}const DT=[16739210,16752451,16765286,6937468,5951938,9087487,13073919,16777215],ku=e=>"#"+e.toString(16).padStart(6,"0");class UT{constructor(){Ot(this,"root");Ot(this,"collapsed",!1);const t=document.getElementById("facts-panel");if(!t)throw new Error("Missing element #facts-panel");this.root=t}render(t,n){if(!t||t.length===0){this.root.hidden=!0;return}this.root.hidden=!1,this.root.classList.toggle("collapsed",this.collapsed);const i=document.createElement("div");i.className="facts-body";const r=this.headerRow(n);r&&i.append(r);for(const s of(n==null?void 0:n.actions)??[])i.append(this.actionRow(s));for(const s of t)i.append(...this.groupNodes(s));this.root.replaceChildren(this.titleBar(),i)}titleBar(){const t=document.createElement("button");t.type="button",t.className="facts-titlebar",t.setAttribute("aria-expanded",String(!this.collapsed));const n=document.createElement("span");n.textContent="Facts";const i=document.createElement("span");return i.className="chevron",i.setAttribute("aria-hidden","true"),i.textContent="▾",t.append(n,i),t.addEventListener("click",()=>{this.collapsed=!this.collapsed,this.root.classList.toggle("collapsed",this.collapsed),t.setAttribute("aria-expanded",String(!this.collapsed))}),t}headerRow(t){if(!t||!t.color&&!t.lock&&!t.positionLock&&!t.alpha)return null;const n=document.createElement("div");n.className="sheet-header";const i=document.createElement("div");i.className="lock-group",t.lock&&i.append(this.lockButton(t.lock,"size")),t.positionLock&&i.append(this.lockButton(t.positionLock,"position"));const r=document.createElement("div");if(r.className="color-group",t.color){const s=document.createElement("div");s.className="swatch-row";const o=document.createElement("span");o.className="color-label",o.textContent="Color",s.append(o,this.swatches(t.color)),r.append(s)}return t.alpha&&r.append(this.alphaRow(t.alpha)),n.append(i,r),n}alphaRow(t){const n=document.createElement("label");n.className="alpha-control",n.title="Shape opacity";const i=document.createElement("span");i.className="alpha-label",i.textContent="Opacity";const r=document.createElement("input");r.type="range",r.min=String(t.min),r.max=String(t.max),r.step="0.1",r.value=String(t.alpha);const s=document.createElement("span");return s.className="alpha-val",s.textContent=t.alpha.toFixed(1),r.addEventListener("input",()=>{const o=parseFloat(r.value);s.textContent=o.toFixed(1),t.onChange(o)}),n.append(i,r,s),n}actionRow(t){const n=document.createElement("div");n.className="action-row";let i=null;t.input&&(n.classList.add("has-input"),i=document.createElement("input"),i.type="number",i.className="action-input",i.value=String(t.input.value),t.input.step!=null&&(i.step=String(t.input.step)),t.input.title&&(i.title=t.input.title),n.append(i));const r=document.createElement("button");return r.type="button",r.className="action-btn",r.textContent=t.label,t.title&&(r.title=t.title),r.addEventListener("click",()=>t.onClick(i?Number(i.value):NaN)),n.append(r),n}lockButton(t,n){const i=n==="size"?"Size":"Position",r=document.createElement("button");return r.type="button",r.className="lock-btn"+(t.locked?" locked":""),r.textContent=(t.locked?"🔒":"🔓")+" "+i,r.title=t.locked?`${i} locked — click to unlock`:`Lock ${n}`,r.setAttribute("aria-pressed",String(t.locked)),r.addEventListener("click",()=>t.onToggle(!t.locked)),r}swatches(t){const n=document.createElement("div");n.className="swatches";let i=!1;for(const o of DT){const a=document.createElement("button");a.type="button",a.className="swatch",a.style.background=ku(o),a.title=ku(o),o===t.color&&(a.classList.add("active"),i=!0),a.addEventListener("click",()=>t.onChange(o)),n.append(a)}const r=document.createElement("label");r.className="swatch custom",i||r.classList.add("active"),r.title="Custom color";const s=document.createElement("input");return s.type="color",s.value=ku(t.color),s.addEventListener("input",()=>t.onChange(parseInt(s.value.slice(1),16))),r.append(s),n.append(r),n}groupNodes(t){const n=[],i=document.createElement("h3");i.textContent=t.title,n.push(i);for(const r of t.facts){const s=document.createElement("div");s.className="fact";const o=document.createElement("span");o.className="label",o.textContent=r.label;const a=document.createElement("span");if(a.className="value",a.textContent=r.value,s.append(o,a),n.push(s),r.formula||r.detail){const c=document.createElement("div");c.className="sub",c.textContent=[r.formula,r.detail].filter(Boolean).join("   •   "),n.push(c)}}return n}}function NT(e,t){const n=Pn("settings-toggle"),i=Pn("settings-popup");n.addEventListener("click",()=>{i.hidden=!i.hidden});const r=Pn("display-mode");r.value=e.displayMode,r.addEventListener("change",()=>{e.displayMode=r.value,t()}),ig("grid-step",s=>{s>0&&(e.step=s,t())}),ig("pixels-per-unit",s=>{s>=4&&(e.pixelsPerUnit=s,t())}),rg("show-grid",s=>{e.showGrid=s,t()}),rg("show-labels",s=>{e.showLabels=s,t()})}function FT(){const e=Pn("controls-panel"),t=Pn("controls-header");t.addEventListener("click",()=>{const n=e.classList.toggle("collapsed");t.setAttribute("aria-expanded",String(!n))})}function OT(e,t,n,i,r){const s=document.getElementById("trace-sine"),o=document.getElementById("trace-cosine"),a=document.getElementById("cosine-placement"),c=document.querySelector('#shape-visibility input[data-kind="unitCircle"]'),l=()=>{a&&(a.disabled=!(c!=null&&c.checked)||!(o!=null&&o.checked))},u=document.querySelectorAll("#shape-visibility input[data-graph]"),h=document.querySelectorAll("#shape-visibility input[data-kind]");for(const f of h){const d=f.dataset.kind,g=()=>{if(e(d,f.checked),d==="unitCircle"&&(s&&(s.disabled=!f.checked),o&&(o.disabled=!f.checked),l()),d==="graph")for(const x of u)x.disabled=!f.checked};f.addEventListener("change",g),g()}for(const f of u){const d=f.dataset.graph,g=()=>n(d,f.checked);f.addEventListener("change",g),g()}s&&(s.addEventListener("change",()=>t(s.checked)),t(s.checked)),o&&(o.addEventListener("change",()=>{i(o.checked),l()}),i(o.checked)),a&&(a.addEventListener("change",()=>r(a.value)),r(a.value))}function kT(e){const t=Pn("camera-view");t.addEventListener("change",()=>e(t.checked)),e(t.checked)}function BT(e){const t=Pn("hand-tracking");t.addEventListener("change",()=>e(t.checked)),e(t.checked)}function Ji(e,t){const n=document.querySelector(`#shape-visibility input[data-kind="${e}"]`);n&&n.checked!==t&&(n.checked=t,n.dispatchEvent(new Event("change")))}function zT(e){const t=Pn("fc-divisions");Pn("fc-add").addEventListener("click",()=>{const i=Math.round(parseFloat(t.value));Number.isFinite(i)&&i>=2&&e(i)})}function GT(e,t){Pn("vector-add").addEventListener("click",()=>e());const i=document.getElementById("vector-projection"),r=document.querySelector('#shape-visibility input[data-kind="vector"]'),s=()=>{i&&(i.disabled=!(r!=null&&r.checked))};i&&(i.addEventListener("change",()=>t(i.checked)),t(i.checked)),r&&r.addEventListener("change",s),s()}function VT(e){const t=document.getElementById("square-diagonal");t&&!t.disabled&&t.checked!==e&&(t.checked=e,t.dispatchEvent(new Event("change")))}function HT(e,t,n){Pn("square-add").addEventListener("click",()=>e());const r=document.getElementById("square-diagonal"),s=document.getElementById("square-half-diagonal"),o=document.querySelector('#shape-visibility input[data-kind="square"]'),a=()=>{const c=!(o!=null&&o.checked);r&&(r.disabled=c),s&&(s.disabled=c)};r&&(r.addEventListener("change",()=>t(r.checked)),t(r.checked)),s&&(s.addEventListener("change",()=>n(s.checked)),n(s.checked)),o&&o.addEventListener("change",a),a()}function WT(e){const t=Pn("snap-grid");t.addEventListener("change",()=>e(t.checked)),e(t.checked)}function Pn(e){const t=document.getElementById(e);if(!t)throw new Error(`Missing element #${e}`);return t}function ig(e,t){const n=Pn(e);n.addEventListener("input",()=>{const i=parseFloat(n.value);Number.isNaN(i)||t(i)})}function rg(e,t){const n=Pn(e);n.addEventListener("change",()=>t(n.checked))}function Ks(){return{width:window.innerWidth,height:window.innerHeight}}function XT(){return[{kind:"graph",graph:{form:"linear",m:.5,b:2.5}},{kind:"graph",graph:{form:"quadratic",a:.4,h:-1.5,k:-3.5}},{kind:"graph",graph:{form:"trig",fn:"sin",a:2,b:1,h:0,k:0}},{kind:"graph",graph:{form:"trig",fn:"cos",a:1.5,b:.5,h:0,k:1}},{kind:"graph",graph:{form:"trig",fn:"tan",a:1,b:1,h:0,k:0}},{kind:"unitCircle",center:Gt(-7,-3),radius:1.6,angle:Math.PI/4},{kind:"fractionCircle",center:Gt(6.5,2.8),radius:1.6,divisions:4,filled:1},{kind:"square",center:Gt(-7,3),half:1.3,angle:0},{kind:"circle",circle:ps(Gt(-3,1.5),1.25)},{kind:"triangle",tri:Xv(Wv(1.5,2,2.5),Gt(.5,-3))},{kind:"vector",tail:Gt(-4.5,-2),v:ki(2,1.5)},{kind:"point",at:Gt(2.5,2)},{kind:"segment",seg:lo(Gt(3.5,-1.5),Gt(6,0))}]}async function $T(){const e=document.getElementById("webcam"),t=document.getElementById("scene");try{await B2(e)}catch(_){console.error("Webcam unavailable:",_)}const n={...Mv},i=new Tb(t,Ks()),r=new Pb;i.scene.add(r.group);const s=new Td(Ks(),n.pixelsPerUnit,!1),o=new Td(Ks(),n.pixelsPerUnit,!0),a=new Fb(s);a.setShapes(XT()),i.scene.add(a.group);const c=new IT;i.scene.add(c.group);const l=()=>{for(const _ of[s,o])_.setViewport(Ks()),_.pixelsPerUnit=n.pixelsPerUnit;r.rebuild(Ks(),n),a.rebuild()};l(),NT(n,l),FT();const u=new Ob(a,s);kb(t,s,u);const h=new PT(o,u,c);WT(_=>u.setSnapEnabled(_)),kT(_=>{document.body.classList.toggle("no-camera",!_)});const f=_=>{if(_===null)return null;const N=a.shapes.find(G=>G.id===_);return N&&N.shape.kind==="vector"?N.shape:null};let d=null,g=null;const x=_=>{const N=[];if(_.shape.kind==="square"){const G=_.shape;N.push({label:"Double the square (×2 area)",title:"Build the next square on this one's diagonal — area doubles, rotated 45°",onClick:()=>{const W=a.addShape(i1(G));Ji("square",!0),VT(!0),u.focus(W)}})}if(_.shape.kind==="vector"){const G=f(g),W=_.shape;if(G&&g!==_.id){const q=g;N.push({label:"Add these two vectors (→ resultant)",title:"Create v₁ + v₂: the diagonal from the first vector's tail",onClick:()=>{const O=f(q);if(!O)return;const j=a.addShape({kind:"vector",tail:O.tail,v:bv(O.v,W.v)});Ji("vector",!0),u.focus(j)}}),N.push({label:"Subtract these two vectors (→ resultant)",title:"Create v₁ − v₂: anchored at the first vector's tail",onClick:()=>{const O=f(q);if(!O)return;const j=a.addShape({kind:"vector",tail:O.tail,v:Av(O.v,W.v)});Ji("vector",!0),u.focus(j)}}),N.push({label:"Project v₂ onto v₁ (→ vector)",title:"Create projᵥ₁ v₂: the shadow of v₂ along v₁'s direction",onClick:()=>{const O=f(q);if(!O)return;const j=a.addShape({kind:"vector",tail:O.tail,v:ag(W.v,O.v)});Ji("vector",!0),u.focus(j)}})}N.push({label:"Negate (−v)",title:"Create −v: same tail, reversed direction",onClick:()=>{const q=a.addShape({kind:"vector",tail:W.tail,v:Tv(W.v)});Ji("vector",!0),u.focus(q)}}),N.push({label:"Multiply by scalar (s·v)",title:"Create s·v: same tail, length scaled by s (negative s flips it)",input:{value:2,step:.5,title:"Scalar s"},onClick:q=>{if(!Number.isFinite(q))return;const O=a.addShape({kind:"vector",tail:W.tail,v:pa(W.v,q)});Ji("vector",!0),u.focus(O)}}),N.push({label:"Remove vector",title:"Delete this vector from the canvas",onClick:()=>{a.removeShape(_.id),u.blur(_.id)}})}return N},p=new UT,m=()=>{const _=u.focused();if(!_){p.render(null);return}_.shape.kind==="vector"&&_.id!==d&&(g=d,d=_.id);const N=a.colorOf(_.id),G=a.alphaOf(_.id);let W=d2(_.shape);const q=_.shape.kind==="vector"&&g!==_.id?f(g):null;q&&_.shape.kind==="vector"&&(W=[...W,_2(q.v,_.shape.v)]),a.setProjectionPair(q?g:null,q?_.id:null),p.render(W,{color:N===null?void 0:{color:N,onChange:O=>{a.setColor(_.id,O),m()}},alpha:G===null?void 0:{alpha:G,min:0,max:3,onChange:O=>a.setAlpha(_.id,O)},lock:c1(_.shape)?{locked:a.isSizeLocked(_.id),onToggle:O=>{a.setSizeLocked(_.id,O),m()}}:void 0,positionLock:u1(_.shape)?{locked:a.isPositionLocked(_.id),onToggle:O=>{a.setPositionLocked(_.id,O),m()}}:void 0,actions:x(_)})};u.onUpdate=m,OT((_,N)=>{a.setKindVisible(_,N),m()},_=>a.setTraceVisible(_),(_,N)=>{a.setGraphVisible(_,N),m()},_=>a.setCosTraceVisible(_),_=>a.setCosPlacement(_));let A=0;const M=()=>{const _=A%3,N=Math.floor(A/3);return A++,Gt(-4+_*4,3-N*4)};zT(_=>{a.addShape({kind:"fractionCircle",center:M(),radius:1.8,divisions:_,filled:0}),Ji("fractionCircle",!0)});let E=0;const z=()=>{const _=E%3,N=Math.floor(E/3);return E++,Gt(-6+_*4,-3-N*3.5)};HT(()=>{a.addShape({kind:"square",center:z(),half:1.3,angle:0}),Ji("square",!0)},_=>a.setDiagonalVisible(_),_=>a.setHalfDiagonalVisible(_));let C=0;GT(()=>{const _=C%3,N=Math.floor(C/3);C++,a.addShape({kind:"vector",tail:Gt(-4+_*4,1-N*3),v:ki(2,1.5)}),Ji("vector",!0)},_=>a.setProjectionVisible(_));let T=null,B=!1,et=!1;BT(_=>{et=_,_&&!T&&!B&&(B=!0,_d.create(o).then(N=>{T=N,console.info("Hand tracking ready: pinch (thumb+index) to grab shapes.")}).catch(N=>console.error("Hand tracking unavailable:",N)).finally(()=>B=!1))}),window.addEventListener("resize",()=>{i.resize(Ks()),l()});const v=()=>{const _=performance.now();et&&T?h.update(T.detect(e,_),_):h.update([],_),i.render(),requestAnimationFrame(v)};v()}$T();
