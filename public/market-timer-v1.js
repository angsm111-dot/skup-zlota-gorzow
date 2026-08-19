const marketLabel=document.querySelector('.market-label');
let marketRefreshDeadline=Date.now()+300000;
if(marketLabel){
  const timer=document.createElement('div');
  timer.className='market-refresh-timer';
  timer.innerHTML='<span>Aktualizacja za</span><strong>05:00</strong><small>Dane: —</small>';
  marketLabel.append(timer);
  const clock=timer.querySelector('strong'),stamp=timer.querySelector('small');
  const updatedAt=document.querySelector('#updated-at');
  const priceHeading=document.createElement('div');
  priceHeading.className='panel-update-meta';
  if(updatedAt){updatedAt.before(priceHeading);priceHeading.append(updatedAt)}
  const priceTimer=document.createElement('span');
  priceTimer.className='price-refresh-timer';
  priceTimer.innerHTML='Aktualizacja za <strong>05:00</strong>';
  priceHeading?.append(priceTimer);
  const priceClock=priceTimer.querySelector('strong');
  const showStamp=value=>{if(!value)return;const date=new Date(value);stamp.textContent=`Dane: ${date.toLocaleTimeString('pl-PL',{hour:'2-digit',minute:'2-digit'})}`;stamp.classList.toggle('stale',Date.now()-date.getTime()>600000)};
  document.addEventListener('market-data-updated',event=>showStamp(event.detail?.fetchedAt));
  showStamp(window.lastMarketFetchAt);
  setInterval(async()=>{
    const left=Math.max(0,marketRefreshDeadline-Date.now()),minutes=Math.floor(left/60000),seconds=Math.floor(left%60000/1000);
    clock.textContent=`${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`;
    if(priceClock)priceClock.textContent=clock.textContent;
    if(left<=0){clock.textContent='Teraz…';if(priceClock)priceClock.textContent='Teraz…';marketRefreshDeadline=Date.now()+300000;try{await loadRates()}catch{} }
  },1000);
}

const referenceLabel=document.querySelector('.panel-reference-price small');
if(referenceLabel){
  const tidyReferenceLabel=()=>{const tidy=referenceLabel.textContent.replace(/\s*\/\s*1\s*g$/i,'');if(tidy!==referenceLabel.textContent)referenceLabel.textContent=tidy};
  tidyReferenceLabel();
  new MutationObserver(tidyReferenceLabel).observe(referenceLabel,{childList:true,characterData:true,subtree:true});
}
