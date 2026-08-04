const METALS = {
  gold: { name: "Złoto", symbol: "Au", purities: [999,960,916,750,585,500,375,333], fallback: 337.8 },
  silver: { name: "Srebro", symbol: "Ag", purities: [999,960,925,900,875,835,830,800], fallback: 3.72 },
  platinum: { name: "Platyna", symbol: "Pt", purities: [999,950,900,850], fallback: 124.6 },
  palladium: { name: "Pallad", symbol: "Pd", purities: [999,950,850,500], fallback: 138.4 }
};
const SYMBOLS = { silver: "XAG", platinum: "XPT", palladium: "XPD" };
const DEFAULT_PROVIDER_URL = "https://investgold.pl/sezamcalc2.json";
const PROVIDER_ALIASES = {
  gold: ["gold", "zloto", "au"],
  silver: ["silver", "srebro", "ag"],
  platinum: ["platinum", "platyna", "pt"],
  palladium: ["palladium", "pallad", "pd"]
};
const DEFAULT_MARGINS = {
  gold:{999:7,960:8,916:9,750:11,585:14,500:16,375:20,333:22},
  silver:{999:18,960:19,925:20,900:21,875:22,835:24,830:24,800:26},
  platinum:{999:12,950:13,900:15,850:17},
  palladium:{999:15,950:16,850:19,500:28}
};
const json=(body,status=200,headers={})=>new Response(JSON.stringify(body),{status,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store",...headers}});
const now=()=>new Date().toISOString();

export default {
  async fetch(request,env,ctx){
    const url=new URL(request.url);
    if(url.pathname==="/api/prices"&&request.method==="GET")return publicPrices(env,ctx);
    if(url.pathname==="/api/admin/config"&&request.method==="GET")return adminGet(request,env);
    if(url.pathname==="/api/admin/config"&&request.method==="PUT")return adminPut(request,env);
    if(url.pathname==="/api/admin/refresh"&&request.method==="POST")return adminRefresh(request,env);
    if(url.pathname==="/admin"||url.pathname==="/admin/"){const target=new URL(request.url);target.pathname="/admin.html";return env.ASSETS.fetch(new Request(target.toString(),{method:"GET",headers:request.headers}));}
    return env.ASSETS.fetch(request);
  },
  async scheduled(_event,env,ctx){ctx.waitUntil(refreshMarket(env));}
};

async function publicPrices(env,ctx){
  let market=await readJson(env,"market:latest");
  const maxAge=Number(env.CACHE_SECONDS||300)*1000;
  if(!market||Date.now()-new Date(market.fetchedAt).getTime()>maxAge){
    market=await refreshMarket(env).catch(()=>market);
    if(!market)market=fallbackMarket();
  }
  const config=await getConfig(env),metals={};
  for(const [key,meta] of Object.entries(METALS)){
    const spot=Number(market.metals[key]?.spot||meta.fallback),change=Number(market.metals[key]?.change||0),purities={};
    for(const purity of meta.purities){
      const setting=config.metals[key][purity],auto=spot*(purity/1000)*(1-setting.margin/100);
      purities[purity]={price:round(setting.mode==="manual"&&setting.manualPrice!==null?setting.manualPrice:auto),margin:setting.margin,mode:setting.mode};
    }
    metals[key]={name:meta.name,symbol:meta.symbol,spot:round(spot),change,history:market.metals[key]?.history||[],purities};
  }
  return json({status:"ok",fetchedAt:market.fetchedAt,provider:market.provider,configUpdatedAt:config.updatedAt,metals},200,{"cache-control":"public, max-age=60"});
}

async function refreshMarket(env){
  let market;
  if(env.PROVIDER_URL||DEFAULT_PROVIDER_URL)market=await fetchCustomProvider(env);
  else market=await fetchDefaultProviders();
  await writeJson(env,"market:latest",market);
  return market;
}

// Adapter do podmiany po otrzymaniu dokumentacji dostawcy.
// Oczekiwany wynik wewnętrzny: { gold:{spot,change,history}, silver:{...}, ... }, PLN za gram.
async function fetchCustomProvider(env){
  const headers={accept:"application/json"};
  if(env.PROVIDER_API_KEY)headers.authorization=`Bearer ${env.PROVIDER_API_KEY}`;
  const providerUrl=env.PROVIDER_URL||DEFAULT_PROVIDER_URL;
  const response=await fetch(providerUrl,{headers,cf:{cacheTtl:0,cacheEverything:false}});
  if(!response.ok)throw new Error(`Dostawca: ${response.status}`);
  const raw=await response.json();
  const metals={};
  for(const key of Object.keys(METALS)){
    const item=findMetalItem(raw,key);
    if(!item)continue;
    const spot=extractSpot(item);
    if(!Number.isFinite(spot)||spot<=0)continue;
    metals[key]={spot,change:Number(item.change_percent??item.changePercent??item.change??0),history:Array.isArray(item.history)?item.history:[]};
  }
  if(!Object.keys(metals).length)throw new Error("Nie rozpoznano cen w danych dostawcy");
  return {fetchedAt:now(),provider:"Invest Gold",metals};
}

function findMetalItem(raw,key){
  const aliases=PROVIDER_ALIASES[key],queue=[raw];
  while(queue.length){
    const node=queue.shift();
    if(!node||typeof node!=="object")continue;
    for(const [name,value] of Object.entries(node)){
      if(aliases.includes(normalizeKey(name)))return typeof value==="number"?{price:value}:value;
      if(value&&typeof value==="object")queue.push(value);
    }
  }
  return null;
}

function extractSpot(item){
  if(typeof item==="number"||typeof item==="string")return parsePrice(item);
  for(const value of [item.price_pln_g,item.pricePlnG,item.spot,item.price,item.cena,item.value,item.kurs]){
    const parsed=parsePrice(value);if(Number.isFinite(parsed)&&parsed>0)return parsed;
  }
  const purityPrices=[];
  for(const [name,value] of Object.entries(item)){
    const purity=Number(String(name).replace(/\D/g,""));
    const price=parsePrice(typeof value==="object"?(value.price??value.cena??value.value):value);
    if(purity>=300&&purity<=1000&&Number.isFinite(price)&&price>0)purityPrices.push({purity,price});
  }
  purityPrices.sort((a,b)=>b.purity-a.purity);
  return purityPrices.length?purityPrices[0].price/(purityPrices[0].purity/1000):NaN;
}

function parsePrice(value){
  if(typeof value==="number")return value;
  if(typeof value!=="string")return NaN;
  return Number(value.replace(/\s/g,"").replace(",",".").replace(/[^0-9.-]/g,""));
}
function normalizeKey(value){return String(value).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z]/g,"")}

async function fetchDefaultProviders(){
  const [gold,usd]=await Promise.all([
    fetch("https://api.nbp.pl/api/cenyzlota/last/90/?format=json").then(check).then(r=>r.json()),
    fetch("https://api.nbp.pl/api/exchangerates/rates/a/usd/?format=json").then(check).then(r=>r.json())
  ]);
  const usdPln=Number(usd.rates[0].mid),metals={gold:{spot:Number(gold.at(-1).cena),change:delta(gold.at(-1).cena,gold.at(-2).cena),history:gold.map(x=>({date:x.data,value:Number(x.cena)}))}};
  await Promise.all(Object.entries(SYMBOLS).map(async([key,symbol])=>{
    try{const d=await fetch(`https://api.gold-api.com/price/${symbol}`).then(check).then(r=>r.json());const spot=Number(d.price)*usdPln/31.1034768;metals[key]={spot,change:Number(d.changePercentage??d.change_percent??0),history:indicativeHistory(spot,key)}}
    catch{metals[key]={spot:METALS[key].fallback,change:0,history:indicativeHistory(METALS[key].fallback,key)}}
  }));
  return {fetchedAt:now(),provider:"NBP + Gold API",metals};
}

async function adminGet(request,env){if(!authorized(request,env))return json({error:"Brak dostępu"},401);return json(await getConfig(env));}
async function adminPut(request,env){
  if(!authorized(request,env))return json({error:"Brak dostępu"},401);
  const body=await request.json().catch(()=>null);if(!body?.metals)return json({error:"Nieprawidłowe dane"},400);
  const current=await getConfig(env);
  for(const [metal,meta] of Object.entries(METALS))for(const purity of meta.purities){const s=body.metals?.[metal]?.[purity];if(!s)continue;current.metals[metal][purity]={margin:clamp(Number(s.margin),0,60),mode:s.mode==="manual"?"manual":"auto",manualPrice:s.mode==="manual"?Math.max(0,Number(s.manualPrice)||0):null};}
  current.updatedAt=now();current.updatedBy="panel";await writeJson(env,"config:pricing",current);return json({ok:true,config:current});
}
async function adminRefresh(request,env){if(!authorized(request,env))return json({error:"Brak dostępu"},401);return json({ok:true,market:await refreshMarket(env)});}
function authorized(request,env){const token=request.headers.get("authorization")?.replace(/^Bearer\s+/i,"")||"";return Boolean(env.ADMIN_PASSWORD)&&token===env.ADMIN_PASSWORD}
async function getConfig(env){const stored=await readJson(env,"config:pricing");if(stored)return stored;const metals={};for(const [key,meta] of Object.entries(METALS)){metals[key]={};for(const purity of meta.purities)metals[key][purity]={margin:DEFAULT_MARGINS[key][purity],mode:"auto",manualPrice:null};}return {updatedAt:now(),updatedBy:"defaults",metals};}
async function readJson(env,key){if(!env.PRICE_STORE)return null;const v=await env.PRICE_STORE.get(key);return v?JSON.parse(v):null}
async function writeJson(env,key,value){if(env.PRICE_STORE)await env.PRICE_STORE.put(key,JSON.stringify(value));}
function fallbackMarket(){const metals={};for(const [k,v] of Object.entries(METALS))metals[k]={spot:v.fallback,change:0,history:indicativeHistory(v.fallback,k)};return {fetchedAt:now(),provider:"Dane zapasowe",metals}}
function indicativeHistory(end,key){const seed={gold:1,silver:2,platinum:3,palladium:4}[key];return Array.from({length:90},(_,i)=>{const d=new Date();d.setDate(d.getDate()-(89-i));return {date:d.toISOString().slice(0,10),value:round(end*(1+Math.sin(i*.31+seed)*.018+Math.cos(i*.11)*.008))}})}
function check(r){if(!r.ok)throw new Error(String(r.status));return r}function round(v){return Math.round(v*100)/100}function clamp(v,a,b){return Math.max(a,Math.min(b,Number.isFinite(v)?v:a))}function delta(a,b){return b?(Number(a)-Number(b))/Number(b)*100:0}
