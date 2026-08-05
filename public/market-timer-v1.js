const marketLabel=document.querySelector('.market-label');
let marketRefreshDeadline=Date.now()+300000;
if(marketLabel){
  const timer=document.createElement('div');
  timer.className='market-refresh-timer';
  timer.innerHTML='<span>Odświeżenie za</span><strong>05:00</strong><small>Dane: —</small>';
  marketLabel.append(timer);
  const clock=timer.querySelector('strong'),stamp=timer.querySelector('small');
  const priceHeading=document.querySelector('#price-panel-title')?.parentElement;
  const priceTimer=document.createElement('span');
  priceTimer.className='price-refresh-timer';
  priceTimer.innerHTML='Odświeżenie za <strong>05:00</strong>';
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
