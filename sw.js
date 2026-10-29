const V="pm-d5c9266cf4";
const CORE=["./","./index.html","./manifest.webmanifest","./assets/archivo.woff2","./assets/icon-192.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V&&k!=="pm-img").map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=="GET")return;
  if(u.hostname==="i.ytimg.com"){e.respondWith(caches.open("pm-img").then(c=>c.match(e.request).then(r=>r||fetch(e.request).then(n=>{c.put(e.request,n.clone());return n}).catch(()=>r))));return}
  if(u.origin!==location.origin)return;
  if(e.request.mode==="navigate"||u.pathname.endsWith("/")||u.pathname.endsWith(".html")){
    e.respondWith(fetch(e.request).then(n=>{const c=n.clone();caches.open(V).then(x=>x.put("./index.html",c));return n}).catch(()=>caches.match("./index.html")));return}
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>{const c=n.clone();caches.open(V).then(x=>x.put(e.request,c));return n})));
});
