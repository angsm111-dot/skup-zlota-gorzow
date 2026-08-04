const METALS={
  gold:{name:'Złoto',symbol:'Au',factor:.91,purities:[999,960,916,750,585,500,375,333],fallback:337.8},
  silver:{name:'Srebro',symbol:'Ag',factor:.78,purities:[999,960,925,900,875,835,830,800],fallback:3.72},
  platinum:{name:'Platyna',symbol:'Pt',factor:.84,purities:[999,950,900,850],fallback:124.6},
  palladium:{name:'Pallad',symbol:'Pd',factor:.82,purities:[999,950,850,500],fallback:138.4}
};
const API_SYMBOLS={silver:'XAG',platinum:'XPT',palladium:'XPD'},money=v=>new Intl.NumberFormat('pl-PL',{style:'currency',currency:'PLN'}).format(v);
let metalRates=Object.fromEntries(Object.entries(METALS).map(([k,v])=>[k,v.fallback])),changes={gold:0,silver:0,platinum:0,palladium:0},histories={},items=[],calcMetal='gold',activeMetal='gold',chartPeriod=30,zoomRange=null,dragStart=null;

async function loadRates(){
  try{
    const remote=await fetch('/api/prices',{headers:{accept:'application/json'}});
    if(remote.ok){
      const payload=await remote.json();
      for(const metal of Object.keys(METALS)){
        const item=payload.metals[metal];
        metalRates[metal]=Number(item.spot);changes[metal]=Number(item.change||0);histories[metal]=item.history||[];
      }
      window.serverPrices=payload.metals;
      renderAll();
      document.querySelector('#updated-at').textContent=`Źródło: ${payload.provider} • ${new Date(payload.fetchedAt).toLocaleTimeString('pl-PL',{hour:'2-digit',minute:'2-digit'})}`;
      return;
    }
  }catch(error){console.warn('API panelu niedostępne — używam źródeł bezpośrednich.',error)}
  const goldRequest=fetch('https://api.nbp.pl/api/cenyzlota/last/90/?format=json').then(r=>{if(!r.ok)throw Error();return r.json()});
  const usdRequest=fetch('https://api.nbp.pl/api/exchangerates/rates/a/usd/?format=json').then(r=>{if(!r.ok)throw Error();return r.json()});
  try{
    const [gold,usd]=await Promise.all([goldRequest,usdRequest]);
    histories.gold=gold.map(v=>({date:v.data,value:Number(v.cena)}));metalRates.gold=histories.gold.at(-1).value;changes.gold=percent(histories.gold.at(-1).value,histories.gold.at(-2).value);
    const usdPln=usd.rates[0].mid;
    await Promise.all(Object.entries(API_SYMBOLS).map(async([metal,symbol])=>{try{const r=await fetch(`https://api.gold-api.com/price/${symbol}`);if(!r.ok)throw Error();const d=await r.json();metalRates[metal]=Number(d.price)*usdPln/31.1034768;changes[metal]=Number(d.changePercentage??d.change_percent??0);histories[metal]=makeIndicativeHistory(metalRates[metal],changes[metal],90,metal)}catch{histories[metal]=makeIndicativeHistory(metalRates[metal],0,90,metal)}}));
  }catch{histories.gold=makeIndicativeHistory(metalRates.gold,0,90,'gold');Object.keys(API_SYMBOLS).forEach(m=>histories[m]=makeIndicativeHistory(metalRates[m],0,90,m))}
  renderAll();
}
function percent(a,b){return b?(a-b)/b*100:0}
function makeIndicativeHistory(end,change,days,key){const seed={gold:1,silver:2.4,platinum:3.1,palladium:4.2}[key],out=[];for(let i=0;i<days;i++){const drift=(i-days+1)*(change/100/days),wave=Math.sin(i*.48+seed)*.018+Math.cos(i*.17+seed)*.009;const d=new Date();d.setDate(d.getDate()-(days-1-i));out.push({date:d.toISOString().slice(0,10),value:end*(1+drift+wave)});}out[out.length-1].value=end;return out}
function buyPrice(metal,purity){const server=window.serverPrices?.[metal]?.purities?.[purity]?.price;return Number.isFinite(Number(server))?Number(server):metalRates[metal]*(purity/1000)*METALS[metal].factor}
function trendMarkup(metal){const up=changes[metal]>=0;return {label:`${up?'↑':'↓'} ${Math.abs(changes[metal]).toFixed(2).replace('.',',')}%`,cls:up?'up':'down'}}

function renderAll(){
  document.querySelectorAll('[data-metal-price]').forEach(el=>el.textContent=`${metalRates[el.dataset.metalPrice].toFixed(2).replace('.',',')} zł/g`);
  document.querySelectorAll('[data-metal-trend]').forEach(el=>{const t=trendMarkup(el.dataset.metalTrend);el.textContent=t.label;el.className=t.cls});
  document.querySelectorAll('[data-nbp-price]').forEach(el=>el.textContent=`${metalRates.gold.toFixed(2).replace('.',',')} zł/g`);
  renderPriceTable();renderPurities();renderItems();drawChart();
  document.querySelector('#updated-at').textContent=`Aktualizacja: ${new Intl.DateTimeFormat('pl-PL',{hour:'2-digit',minute:'2-digit'}).format(new Date())}`;
}
function renderPriceTable(){const m=METALS[activeMetal];document.querySelector('#price-panel-title').textContent=`Cennik — ${m.name.toLowerCase()}`;document.querySelector('#price-table').innerHTML=m.purities.map(p=>`<tr><td><strong>${p}</strong></td><td>${(p/10).toFixed(1).replace('.',',')}%</td><td>${money(buyPrice(activeMetal,p))}</td></tr>`).join('');document.querySelector('#source-note').textContent=activeMetal==='gold'?'Cena referencyjna i historia pochodzą z NBP. Ceny skupu uwzględniają próbę i współczynnik operacyjny.':'Cena bieżąca: międzynarodowe notowanie spot przeliczone po kursie USD/PLN NBP. Wykres historyczny ma charakter orientacyjny.'}
function renderPurities(){const select=document.querySelector('#purity'),m=METALS[calcMetal],old=select.value;select.innerHTML=m.purities.map(p=>`<option value="${p}">${p} — ${(p/10).toFixed(1).replace('.',',')}%</option>`).join('');if(m.purities.includes(+old))select.value=old;document.querySelector('#calc-rate').textContent=`${m.name}: ${money(buyPrice(calcMetal,+select.value))} za gram próby ${select.value}`}
function renderItems(){const list=document.querySelector('#calc-items');list.innerHTML=items.map((it,i)=>`<div class="calc-item"><div><strong>${METALS[it.metal].name} ${it.purity}</strong><small>${it.weight.toFixed(2).replace('.',',')} g × ${money(buyPrice(it.metal,it.purity))}</small></div><b>${money(it.weight*buyPrice(it.metal,it.purity))}</b><button data-remove="${i}" aria-label="Usuń pozycję">×</button></div>`).join('');const total=items.reduce((s,it)=>s+it.weight*buyPrice(it.metal,it.purity),0),weight=items.reduce((s,it)=>s+it.weight,0);document.querySelector('#total-value').textContent=money(total);document.querySelector('#total-weight').textContent=`${weight.toFixed(2).replace('.',',')} g`;document.querySelector('#total-count').textContent=items.length}

function chartData(){let d=(histories[activeMetal]||[]).slice(-chartPeriod);if(zoomRange)d=d.slice(zoomRange[0],zoomRange[1]+1);return d}
function drawChart(){const c=document.querySelector('#gold-chart');if(!c||!c.offsetParent)return;const d=chartData();if(d.length<2)return;const box=c.getBoundingClientRect(),ratio=devicePixelRatio||1;c.width=box.width*ratio;c.height=box.height*ratio;const x=c.getContext('2d');x.scale(ratio,ratio);const w=box.width,h=box.height,pad={l:12,r:12,t:24,b:25},vals=d.map(v=>v.value),min=Math.min(...vals),max=Math.max(...vals),range=max-min||1,px=i=>pad.l+i/(d.length-1)*(w-pad.l-pad.r),py=v=>pad.t+(max-v)/range*(h-pad.t-pad.b);x.clearRect(0,0,w,h);x.strokeStyle='rgba(255,255,255,.1)';x.lineWidth=1;for(let i=0;i<4;i++){const y=pad.t+i*(h-pad.t-pad.b)/3;x.beginPath();x.moveTo(0,y);x.lineTo(w,y);x.stroke()}const g=x.createLinearGradient(0,pad.t,0,h);g.addColorStop(0,'rgba(218,171,82,.48)');g.addColorStop(1,'rgba(218,171,82,0)');x.beginPath();d.forEach((v,i)=>i?x.lineTo(px(i),py(v.value)):x.moveTo(px(i),py(v.value)));x.lineTo(px(d.length-1),h-pad.b);x.lineTo(px(0),h-pad.b);x.fillStyle=g;x.fill();x.beginPath();d.forEach((v,i)=>i?x.lineTo(px(i),py(v.value)):x.moveTo(px(i),py(v.value)));x.strokeStyle='#e0b45f';x.lineWidth=2;x.stroke();c._chart={d,px,py,pad,w,h};document.querySelector('#chart-metal-name').textContent=METALS[activeMetal].name;document.querySelector('#chart-price').textContent=`${metalRates[activeMetal].toFixed(2).replace('.',',')} zł/g`;const t=trendMarkup(activeMetal),te=document.querySelector('#chart-trend');te.textContent=t.label;te.className=`trend ${t.cls}`}
function chartPointer(e){const c=e.currentTarget,info=c._chart;if(!info)return;const r=c.getBoundingClientRect(),mx=Math.max(info.pad.l,Math.min(e.clientX-r.left,info.w-info.pad.r)),idx=Math.round((mx-info.pad.l)/(info.w-info.pad.l-info.pad.r)*(info.d.length-1)),point=info.d[idx],tip=document.querySelector('#chart-tooltip');tip.innerHTML=`<b>${point.value.toFixed(2).replace('.',',')} zł/g</b><span>${point.date}</span>`;tip.style.left=`${Math.min(mx+12,info.w-120)}px`;tip.style.top=`${Math.max(info.py(point.value)-48,5)}px`;tip.classList.add('show');drawChart();const x=c.getContext('2d'),ratio=devicePixelRatio||1;x.setTransform(ratio,0,0,ratio,0,0);x.strokeStyle='#fff';x.beginPath();x.moveTo(info.px(idx),info.pad.t);x.lineTo(info.px(idx),info.h-info.pad.b);x.stroke();x.fillStyle='#fff';x.beginPath();x.arc(info.px(idx),info.py(point.value),4,0,Math.PI*2);x.fill()}

function route(){const page=(location.hash||'#home').slice(1),valid=['home','prices','calculator','process','about','faq','contact'],current=valid.includes(page)?page:'home';document.querySelectorAll('.page').forEach(el=>el.classList.toggle('active',el.dataset.page===current));document.querySelectorAll('nav a').forEach(el=>el.classList.toggle('active',el.hash===`#${current}`));document.querySelector('nav').classList.remove('open');document.querySelector('.menu-toggle').setAttribute('aria-expanded','false');window.scrollTo({top:0,behavior:'instant'});if(current==='prices')requestAnimationFrame(drawChart)}
document.querySelector('.menu-toggle').addEventListener('click',e=>{const n=document.querySelector('nav'),open=n.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',open)});
document.querySelectorAll('[data-metal-tab]').forEach(b=>b.addEventListener('click',()=>{activeMetal=b.dataset.metalTab;zoomRange=null;document.querySelectorAll('[data-metal-tab]').forEach(x=>x.classList.toggle('active',x===b));document.querySelector('#chart-metal').value=activeMetal;renderPriceTable();drawChart()}));
document.querySelectorAll('[data-calc-metal]').forEach(b=>b.addEventListener('click',()=>{calcMetal=b.dataset.calcMetal;document.querySelectorAll('[data-calc-metal]').forEach(x=>x.classList.toggle('active',x===b));renderPurities()}));document.querySelector('#purity').addEventListener('change',renderPurities);
document.querySelectorAll('[data-period]').forEach(b=>b.addEventListener('click',()=>{chartPeriod=+b.dataset.period;zoomRange=null;document.querySelectorAll('[data-period]').forEach(x=>x.classList.toggle('active',x===b));drawChart()}));document.querySelector('#chart-metal').addEventListener('change',e=>{activeMetal=e.target.value;zoomRange=null;document.querySelectorAll('[data-metal-tab]').forEach(x=>x.classList.toggle('active',x.dataset.metalTab===activeMetal));renderPriceTable();drawChart()});document.querySelector('#reset-zoom').addEventListener('click',()=>{zoomRange=null;drawChart()});
const canvas=document.querySelector('#gold-chart');canvas.addEventListener('pointermove',chartPointer);canvas.addEventListener('pointerleave',()=>{document.querySelector('#chart-tooltip').classList.remove('show');drawChart()});canvas.addEventListener('pointerdown',e=>{dragStart=e.offsetX});canvas.addEventListener('pointerup',e=>{if(dragStart===null)return;const a=Math.min(dragStart,e.offsetX),b=Math.max(dragStart,e.offsetX),d=chartData(),w=canvas.getBoundingClientRect().width;if(b-a>25){zoomRange=[Math.max(0,Math.floor(a/w*d.length)),Math.min(d.length-1,Math.ceil(b/w*d.length))]}dragStart=null;drawChart()});
document.querySelector('#add-item').addEventListener('click',()=>{const purity=+document.querySelector('#purity').value,weight=Number(document.querySelector('#weight').value);if(weight>0){items.push({metal:calcMetal,purity,weight});renderItems()}});document.querySelector('#calc-items').addEventListener('click',e=>{if(e.target.dataset.remove!==undefined){items.splice(+e.target.dataset.remove,1);renderItems()}});document.querySelector('#contact-form').addEventListener('submit',e=>{e.preventDefault();document.querySelector('#form-status').textContent='Dziękujemy! Formularz demonstracyjny działa poprawnie.';e.target.reset()});window.addEventListener('hashchange',route);window.addEventListener('resize',drawChart);document.querySelector('#year').textContent=new Date().getFullYear();route();renderPurities();loadRates();
