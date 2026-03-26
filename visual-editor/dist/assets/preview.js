import{j as w,c as J}from"./site.js";const E=new Map,T=new Map,y=new Set,_=new Set;let P=new WeakMap;function K(e){let t=e.__REACT_DEVTOOLS_GLOBAL_HOOK__;if(t===void 0){let s=0;e.__REACT_DEVTOOLS_GLOBAL_HOOK__=t={renderers:new Map,supportsFiber:!0,inject:r=>s++,onScheduleFiberRoot:(r,a,c)=>{},onCommitFiberRoot:(r,a,c,l)=>{},onCommitFiberUnmount(){}}}if(t.isDisabled){console.warn("Something has shimmed the React DevTools global hook (__REACT_DEVTOOLS_GLOBAL_HOOK__). Fast Refresh is not compatible with this shim and will be disabled.");return}const n=t.inject;t.inject=function(s){const r=n.apply(this,arguments);return typeof s.scheduleRefresh=="function"&&typeof s.setRefreshHandler=="function"&&E.set(r,s),r},t.renderers.forEach((s,r)=>{typeof s.scheduleRefresh=="function"&&typeof s.setRefreshHandler=="function"&&E.set(r,s)});const i=t.onCommitFiberRoot,o=t.onScheduleFiberRoot||(()=>{});t.onScheduleFiberRoot=function(s,r,a){return _.delete(r),P!==null&&P.set(r,a),o.apply(this,arguments)},t.onCommitFiberRoot=function(s,r,a,c){const l=E.get(s);if(l!==void 0){T.set(r,l);const p=r.current,f=p.alternate;if(f!==null){const h=f.memoizedState!=null&&f.memoizedState.element!=null&&y.has(r),b=p.memoizedState!=null&&p.memoizedState.element!=null;!h&&b?(y.add(r),_.delete(r)):h&&b||(h&&!b?(y.delete(r),c?_.add(r):T.delete(r)):!h&&!b&&c&&_.add(r))}else y.add(r)}return i.apply(this,arguments)}}window.__registerBeforePerformReactRefresh=e=>{};const Y={injectIntoGlobalHook:K};Y.injectIntoGlobalHook(window);window.$RefreshReg$=()=>{};window.$RefreshSig$=()=>e=>e;window.__vite_plugin_react_preamble_installed__=!0;const Z=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:Function("return this")(),C=__DEFINES__;Object.keys(C).forEach(e=>{const t=e.split(".");let n=Z;for(let i=0;i<t.length;i++){const o=t[i];i===t.length-1?n[o]=C[e]:n=n[o]||(n[o]={})}});function v(e){"@babel/helpers - typeof";return v=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},v(e)}function X(e,t){if(v(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var i=n.call(e,t);if(v(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function ee(e){var t=X(e,"string");return v(t)=="symbol"?t:t+""}function u(e,t,n){return(t=ee(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var te=class{constructor(e,t,n){this.logger=e,this.transport=t,this.importUpdatedModule=n,u(this,"hotModulesMap",new Map),u(this,"disposeMap",new Map),u(this,"pruneMap",new Map),u(this,"dataMap",new Map),u(this,"customListenersMap",new Map),u(this,"ctxToListenersMap",new Map),u(this,"currentFirstInvalidatedBy",void 0),u(this,"updateQueue",[]),u(this,"pendingUpdateQueue",!1)}async notifyListeners(e,t){const n=this.customListenersMap.get(e);n&&await Promise.allSettled(n.map(i=>i(t)))}send(e){this.transport.send(e).catch(t=>{this.logger.error(t)})}clear(){this.hotModulesMap.clear(),this.disposeMap.clear(),this.pruneMap.clear(),this.dataMap.clear(),this.customListenersMap.clear(),this.ctxToListenersMap.clear()}async prunePaths(e){await Promise.all(e.map(t=>{const n=this.disposeMap.get(t);if(n)return n(this.dataMap.get(t))})),await Promise.all(e.map(t=>{const n=this.pruneMap.get(t);if(n)return n(this.dataMap.get(t))}))}warnFailedUpdate(e,t){(!(e instanceof Error)||!e.message.includes("fetch"))&&this.logger.error(e),this.logger.error(`Failed to reload ${t}. This could be due to syntax errors or importing non-existent modules. (see errors above)`)}async queueUpdate(e){if(this.updateQueue.push(this.fetchUpdate(e)),!this.pendingUpdateQueue){this.pendingUpdateQueue=!0,await Promise.resolve(),this.pendingUpdateQueue=!1;const t=[...this.updateQueue];this.updateQueue=[],(await Promise.all(t)).forEach(n=>n&&n())}}async fetchUpdate(e){const{path:t,acceptedPath:n,firstInvalidatedBy:i}=e,o=this.hotModulesMap.get(t);if(!o)return;let s;const r=t===n,a=o.callbacks.filter(({deps:c})=>c.includes(n));if(r||a.length>0){const c=this.disposeMap.get(n);c&&await c(this.dataMap.get(n));try{s=await this.importUpdatedModule(e)}catch(l){this.warnFailedUpdate(l,n)}}return()=>{try{this.currentFirstInvalidatedBy=i;for(const{deps:l,fn:p}of a)p(l.map(f=>f===n?s:void 0));const c=r?t:`${n} via ${t}`;this.logger.debug(`hot updated: ${c}`)}finally{this.currentFirstInvalidatedBy=void 0}}}};let ne="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict",oe=(e=21)=>{let t="",n=e|0;for(;n--;)t+=ne[Math.random()*64|0];return t};typeof process<"u"&&process.platform;function re(){let e,t;return{promise:new Promise((n,i)=>{e=n,t=i}),resolve:e,reject:t}}function I(e){const t=new Error(e.message||"Unknown invoke error");return Object.assign(t,e,{runnerError:new Error("RunnerError")}),t}const ie=e=>{if(e.invoke)return{...e,async invoke(n,i){const o=await e.invoke({type:"custom",event:"vite:invoke",data:{id:"send",name:n,data:i}});if("error"in o)throw I(o.error);return o.result}};if(!e.send||!e.connect)throw new Error("transport must implement send and connect when invoke is not implemented");const t=new Map;return{...e,connect({onMessage:n,onDisconnection:i}){return e.connect({onMessage(o){if(o.type==="custom"&&o.event==="vite:invoke"){const s=o.data;if(s.id.startsWith("response:")){const r=s.id.slice(9),a=t.get(r);if(!a)return;a.timeoutId&&clearTimeout(a.timeoutId),t.delete(r);const{error:c,result:l}=s.data;c?a.reject(c):a.resolve(l);return}}n(o)},onDisconnection:i})},disconnect(){return t.forEach(n=>{n.reject(new Error(`transport was disconnected, cannot call ${JSON.stringify(n.name)}`))}),t.clear(),e.disconnect?.()},send(n){return e.send(n)},async invoke(n,i){const o=oe(),s={type:"custom",event:"vite:invoke",data:{name:n,id:`send:${o}`,data:i}},r=e.send(s),{promise:a,resolve:c,reject:l}=re(),p=e.timeout??6e4;let f;p>0&&(f=setTimeout(()=>{t.delete(o),l(new Error(`transport invoke timed out after ${p}ms (data: ${JSON.stringify(s)})`))},p),f?.unref?.()),t.set(o,{resolve:c,reject:l,name:n,timeoutId:f}),r&&r.catch(h=>{clearTimeout(f),t.delete(o),l(h)});try{return await a}catch(h){throw I(h)}}}},se=e=>{const t=ie(e);let n=!t.connect,i;return{...e,...t.connect?{async connect(o){if(n)return;if(i){await i;return}const s=t.connect({onMessage:o??(()=>{}),onDisconnection(){n=!1}});s&&(i=s,await i,i=void 0),n=!0}}:{},...t.disconnect?{async disconnect(){n&&(i&&await i,n=!1,await t.disconnect())}}:{},async send(o){if(t.send){if(!n)if(i)await i;else throw new Error("send was called before connect");await t.send(o)}},async invoke(o,s){if(!n)if(i)await i;else throw new Error("invoke was called before connect");return t.invoke(o,s)}}},U=e=>{const t=e.pingInterval??3e4;let n,i;return{async connect({onMessage:o,onDisconnection:s}){const r=e.createConnection();r.addEventListener("message",async({data:c})=>{o(JSON.parse(c))});let a=r.readyState===r.OPEN;a||await new Promise((c,l)=>{r.addEventListener("open",()=>{a=!0,c()},{once:!0}),r.addEventListener("close",async()=>{if(!a){l(new Error("WebSocket closed without opened."));return}o({type:"custom",event:"vite:ws:disconnect",data:{webSocket:r}}),s()})}),o({type:"custom",event:"vite:ws:connect",data:{webSocket:r}}),n=r,i=setInterval(()=>{r.readyState===r.OPEN&&r.send(JSON.stringify({type:"ping"}))},t)},disconnect(){clearInterval(i),n?.close()},send(o){n.send(JSON.stringify(o))}}};function ae(e){const t=new ce;return n=>t.enqueue(()=>e(n))}var ce=class{constructor(){u(this,"queue",[]),u(this,"pending",!1)}enqueue(e){return new Promise((t,n)=>{this.queue.push({promise:e,resolve:t,reject:n}),this.dequeue()})}dequeue(){if(this.pending)return!1;const e=this.queue.shift();return e?(this.pending=!0,e.promise().then(e.resolve).catch(e.reject).finally(()=>{this.pending=!1,this.dequeue()}),!0):!1}};const le=__HMR_CONFIG_NAME__,de=__BASE__||"/",ue="document"in globalThis?document.querySelector("meta[property=csp-nonce]")?.nonce:void 0;function d(e,t={},...n){const i=document.createElement(e);for(const[o,s]of Object.entries(t))s!==void 0&&i.setAttribute(o,s);return i.append(...n),i}const pe=`
:host {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
  --monospace: 'SFMono-Regular', Consolas,
  'Liberation Mono', Menlo, Courier, monospace;
  --red: #ff5555;
  --yellow: #e2aa53;
  --purple: #cfa4ff;
  --cyan: #2dd9da;
  --dim: #c9c9c9;

  --window-background: #181818;
  --window-color: #d8d8d8;
}

.backdrop {
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  margin: 0;
  background: rgba(0, 0, 0, 0.66);
}

.window {
  font-family: var(--monospace);
  line-height: 1.5;
  max-width: 80vw;
  color: var(--window-color);
  box-sizing: border-box;
  margin: 30px auto;
  padding: 2.5vh 4vw;
  position: relative;
  background: var(--window-background);
  border-radius: 6px 6px 8px 8px;
  box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
  overflow: hidden;
  border-top: 8px solid var(--red);
  direction: ltr;
  text-align: left;
}

pre {
  font-family: var(--monospace);
  font-size: 16px;
  margin-top: 0;
  margin-bottom: 1em;
  overflow-x: scroll;
  scrollbar-width: none;
}

pre::-webkit-scrollbar {
  display: none;
}

pre.frame::-webkit-scrollbar {
  display: block;
  height: 5px;
}

pre.frame::-webkit-scrollbar-thumb {
  background: #999;
  border-radius: 5px;
}

pre.frame {
  scrollbar-width: thin;
}

.message {
  line-height: 1.3;
  font-weight: 600;
  white-space: pre-wrap;
}

.message-body {
  color: var(--red);
}

.plugin {
  color: var(--purple);
}

.file {
  color: var(--cyan);
  margin-bottom: 0;
  white-space: pre-wrap;
  word-break: break-all;
}

.frame {
  color: var(--yellow);
}

.stack {
  font-size: 13px;
  color: var(--dim);
}

.tip {
  font-size: 13px;
  color: #999;
  border-top: 1px dotted #999;
  padding-top: 13px;
  line-height: 1.8;
}

code {
  font-size: 13px;
  font-family: var(--monospace);
  color: var(--yellow);
}

.file-link {
  text-decoration: underline;
  cursor: pointer;
}

kbd {
  line-height: 1.5;
  font-family: ui-monospace, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 0.75rem;
  font-weight: 700;
  background-color: rgb(38, 40, 44);
  color: rgb(166, 167, 171);
  padding: 0.15rem 0.3rem;
  border-radius: 0.25rem;
  border-width: 0.0625rem 0.0625rem 0.1875rem;
  border-style: solid;
  border-color: rgb(54, 57, 64);
  border-image: initial;
}
`,fe=()=>d("div",{class:"backdrop",part:"backdrop"},d("div",{class:"window",part:"window"},d("pre",{class:"message",part:"message"},d("span",{class:"plugin",part:"plugin"}),d("span",{class:"message-body",part:"message-body"})),d("pre",{class:"file",part:"file"}),d("pre",{class:"frame",part:"frame"}),d("pre",{class:"stack",part:"stack"}),d("div",{class:"tip",part:"tip"},"Click outside, press ",d("kbd",{},"Esc")," key, or fix the code to dismiss.",d("br"),"You can also disable this overlay by setting ",d("code",{part:"config-option-name"},"server.hmr.overlay")," to ",d("code",{part:"config-option-value"},"false")," in ",d("code",{part:"config-file-name"},le),".")),d("style",{nonce:ue},pe)),$=/(?:file:\/\/)?(?:[a-zA-Z]:\\|\/).*?:\d+:\d+/g,S=/^(?:>?\s*\d+\s+\|.*|\s+\|\s*\^.*)\r?\n/gm,{HTMLElement:he=class{}}=globalThis;var me=class extends he{constructor(e,t=!0){super(),u(this,"root",void 0),u(this,"closeOnEsc",void 0),this.root=this.attachShadow({mode:"open"}),this.root.appendChild(fe()),S.lastIndex=0;const n=e.frame&&S.test(e.frame),i=n?e.message.replace(S,""):e.message;e.plugin&&this.text(".plugin",`[plugin:${e.plugin}] `),this.text(".message-body",i.trim());const[o]=(e.loc?.file||e.id||"unknown file").split("?");e.loc?this.text(".file",`${o}:${e.loc.line}:${e.loc.column}`,t):e.id&&this.text(".file",o),n&&this.text(".frame",e.frame.trim()),this.text(".stack",e.stack,t),this.root.querySelector(".window").addEventListener("click",s=>{s.stopPropagation()}),this.addEventListener("click",()=>{this.close()}),this.closeOnEsc=s=>{(s.key==="Escape"||s.code==="Escape")&&this.close()},document.addEventListener("keydown",this.closeOnEsc)}text(e,t,n=!1){const i=this.root.querySelector(e);if(!n)i.textContent=t;else{let o=0,s;for($.lastIndex=0;s=$.exec(t);){const{0:r,index:a}=s,c=t.slice(o,a);i.appendChild(document.createTextNode(c));const l=document.createElement("a");l.textContent=r,l.className="file-link",l.onclick=()=>{fetch(new URL(`${de}__open-in-editor?file=${encodeURIComponent(r)}`,import.meta.url))},i.appendChild(l),o+=c.length+r.length}o<t.length&&i.appendChild(document.createTextNode(t.slice(o)))}}close(){this.parentNode?.removeChild(this),document.removeEventListener("keydown",this.closeOnEsc)}};const g="vite-error-overlay",{customElements:M}=globalThis;M&&!M.get(g)&&M.define(g,me);console.debug("[vite] connecting...");const R=new URL(import.meta.url),we=__SERVER_HOST__,F=__HMR_PROTOCOL__||(R.protocol==="https:"?"wss":"ws"),D=__HMR_PORT__,H=`${__HMR_HOSTNAME__||R.hostname}:${D||R.port}${__HMR_BASE__}`,N=__HMR_DIRECT_TARGET__,L=__BASE__||"/",A=__HMR_TIMEOUT__,j=__WS_TOKEN__,Q=se((()=>{let e=U({createConnection:()=>new WebSocket(`${F}://${H}?token=${j}`,"vite-hmr"),pingInterval:A});return{async connect(t){try{await e.connect(t)}catch(n){if(!D){e=U({createConnection:()=>new WebSocket(`${F}://${N}?token=${j}`,"vite-hmr"),pingInterval:A});try{await e.connect(t),console.info("[vite] Direct websocket connection fallback. Check out https://vite.dev/config/server-options.html#server-hmr to remove the previous connection error.")}catch(i){if(i instanceof Error&&i.message.includes("WebSocket closed without opened.")){const o=new URL(import.meta.url),s=o.host+o.pathname.replace(/@vite\/client$/,"");console.error(`[vite] failed to connect to websocket.
your current setup:
  (browser) ${s} <--[HTTP]--> ${we} (server)
  (browser) ${H} <--[WebSocket (failing)]--> ${N} (server)
Check out your Vite / network configuration and https://vite.dev/config/server-options.html#server-hmr .`)}}return}throw console.error(`[vite] failed to connect to websocket (${n}). `),n}},async disconnect(){await e.disconnect()},send(t){e.send(t)}}})());let V=!1;typeof window<"u"&&window.addEventListener?.("beforeunload",()=>{V=!0});function q(e){const t=new URL(e,"http://vite.dev");return t.searchParams.delete("direct"),t.pathname+t.search}let W=!0;const B=new WeakSet,ve=e=>{let t;return()=>{t&&(clearTimeout(t),t=null),t=setTimeout(()=>{location.reload()},e)}},x=ve(20),m=new te({error:e=>console.error("[vite]",e),debug:(...e)=>console.debug("[vite]",...e)},Q,async function({acceptedPath:t,timestamp:n,explicitImportRequired:i,isWithinCircularImport:o}){const[s,r]=t.split("?"),a=import(L+s.slice(1)+`?${i?"import&":""}t=${n}${r?`&${r}`:""}`);return o&&a.catch(()=>{console.info(`[hmr] ${t} failed to apply HMR as it's within a circular import. Reloading page to reset the execution order. To debug and break the circular import, you can run \`vite --debug hmr\` to log the circular dependency path if a file change triggered it.`),x()}),await a});Q.connect(ae(ge));async function ge(e){switch(e.type){case"connected":console.debug("[vite] connected.");break;case"update":if(await m.notifyListeners("vite:beforeUpdate",e),k)if(W&&ye()){location.reload();return}else z&&G(),W=!1;await Promise.all(e.updates.map(async t=>{if(t.type==="js-update")return m.queueUpdate(t);const{path:n,timestamp:i}=t,o=q(n),s=Array.from(document.querySelectorAll("link")).find(a=>!B.has(a)&&q(a.href).includes(o));if(!s)return;const r=`${L}${o.slice(1)}${o.includes("?")?"&":"?"}t=${i}`;return new Promise(a=>{const c=s.cloneNode();c.href=new URL(r,s.href).href;const l=()=>{s.remove(),console.debug(`[vite] css hot updated: ${o}`),a()};c.addEventListener("load",l),c.addEventListener("error",l),B.add(s),s.after(c)})})),await m.notifyListeners("vite:afterUpdate",e);break;case"custom":if(await m.notifyListeners(e.event,e.data),e.event==="vite:ws:disconnect"&&k&&!V){console.log("[vite] server connection lost. Polling for restart...");const t=e.data.webSocket,n=new URL(t.url);n.search="",await _e(n.href),location.reload()}break;case"full-reload":if(await m.notifyListeners("vite:beforeFullReload",e),k)if(e.path&&e.path.endsWith(".html")){const t=decodeURI(location.pathname),n=L+e.path.slice(1);(t===n||e.path==="/index.html"||t.endsWith("/")&&t+"index.html"===n)&&x();return}else x();break;case"prune":await m.notifyListeners("vite:beforePrune",e),await m.prunePaths(e.paths);break;case"error":if(await m.notifyListeners("vite:error",e),k){const t=e.err;z?be(t):console.error(`[vite] Internal Server Error
${t.message}
${t.stack}`)}break;case"ping":break;default:return e}}const z=__HMR_ENABLE_OVERLAY__,k="document"in globalThis;function be(e){G();const{customElements:t}=globalThis;if(t){const n=t.get(g);document.body.appendChild(new n(e))}}function G(){document.querySelectorAll(g).forEach(e=>e.close())}function ye(){return document.querySelectorAll(g).length}function _e(e){if(typeof SharedWorker>"u"){const o={currentState:document.visibilityState,listeners:new Set},s=()=>{o.currentState=document.visibilityState;for(const r of o.listeners)r(o.currentState)};return document.addEventListener("visibilitychange",s),O(e,o)}const t=new Blob(['"use strict";',`const waitForSuccessfulPingInternal = ${O.toString()};`,`const fn = ${ke.toString()};`,`fn(${JSON.stringify(e)})`],{type:"application/javascript"}),n=URL.createObjectURL(t),i=new SharedWorker(n);return new Promise((o,s)=>{const r=()=>{i.port.postMessage({visibility:document.visibilityState})};document.addEventListener("visibilitychange",r),i.port.addEventListener("message",a=>{document.removeEventListener("visibilitychange",r),i.port.close();const c=a.data;if(c.type==="error"){s(c.error);return}o()}),r(),i.port.start()})}function ke(e){self.addEventListener("connect",t=>{const n=t.ports[0];if(!e){n.postMessage({type:"error",error:new Error("socketUrl not found")});return}const i={currentState:"visible",listeners:new Set};n.addEventListener("message",o=>{const{visibility:s}=o.data;i.currentState=s,console.debug("[vite] new window visibility",s);for(const r of i.listeners)r(s)}),n.start(),console.debug("[vite] connected from window"),O(e,i).then(()=>{console.debug("[vite] ping successful");try{n.postMessage({type:"success"})}catch(o){n.postMessage({type:"error",error:o})}},o=>{console.debug("[vite] error happened",o);try{n.postMessage({type:"error",error:o})}catch(s){n.postMessage({type:"error",error:s})}})})}async function O(e,t,n=1e3){function i(r){return new Promise(a=>setTimeout(a,r))}async function o(){try{const r=new WebSocket(e,"vite-ping");return new Promise(a=>{function c(){a(!0),p()}function l(){a(!1),p()}function p(){r.removeEventListener("open",c),r.removeEventListener("error",l),r.close()}r.addEventListener("open",c),r.addEventListener("error",l)})}catch{return!1}}function s(r){return new Promise(a=>{const c=l=>{l==="visible"&&(a(),r.listeners.delete(c))};r.listeners.add(c)})}if(!await o())for(await i(n);;)if(t.currentState==="visible"){if(await o())break;await i(n)}else await s(t)}const Ee=new Map,Se=new Map;"document"in globalThis&&(document.querySelectorAll("style[data-vite-dev-id]").forEach(e=>{Ee.set(e.getAttribute("data-vite-dev-id"),e)}),document.querySelectorAll('link[rel="stylesheet"][data-vite-dev-id]').forEach(e=>{Se.set(e.getAttribute("data-vite-dev-id"),e)}));function Me({section:e}){const t=window.parent.__SECTION_COMPONENTS__||{},n=e.type||e.id;if(!n)return null;const i=t[n];return i?w.jsx(i,{...e.props||{}}):(console.warn("Unknown component:",n),null)}function Re({sections:e}){return w.jsx(w.Fragment,{children:e.map(t=>w.jsx(Me,{section:t},t.id))})}function Le(e){const n=document.getElementById("root");if(!n){console.warn("No #root inside iframe");return}window.__previewRoot||(window.__previewRoot=J.createRoot(n)),window.__previewRoot.render(w.jsx(Re,{sections:e.root}))}window.renderVisualTree=e=>{console.log("visualTree received by iframe:",e),Le(e)};
