// Drobne ulepszenia interfejsu i zachowania widoków.
document.querySelector('.footer-main h2')?.replaceChildren('Uczciwa wycena',document.createElement('br'),'metali szlachetnych.');
const uxWeight=document.querySelector('#weight');
if(uxWeight){
  uxWeight.addEventListener('focus',()=>{if(Number(uxWeight.value)===0){uxWeight.value='';uxWeight.dispatchEvent(new Event('input',{bubbles:true}))}});
  uxWeight.addEventListener('blur',()=>{if(uxWeight.value===''){uxWeight.value='0';uxWeight.dispatchEvent(new Event('input',{bubbles:true}))}});
}

// Każde wybranie pozycji w menu mobilnym zamyka menu, także gdy użytkownik
// wybiera ponownie tę samą, aktualnie otwartą podstronę.
document.querySelectorAll('.topbar nav a').forEach(link=>link.addEventListener('click',()=>{
  document.querySelector('.topbar nav')?.classList.remove('open');
  document.querySelector('.menu-toggle')?.setAttribute('aria-expanded','false');
},true));

document.querySelectorAll('[data-footer-metal]').forEach(link=>link.addEventListener('click',event=>{
  event.preventDefault();event.stopImmediatePropagation();const metal=link.dataset.footerMetal;location.hash='prices';
  setTimeout(()=>{
    document.querySelector('[data-catalog-tabs="prices"] [data-kind="purities"]')?.click();
    activeMetal=metal;zoomRange=null;
    document.querySelectorAll('[data-metal-tab]').forEach(button=>button.classList.toggle('active',button.dataset.metalTab===metal));
    const chart=document.querySelector('#chart-metal');if(chart)chart.value=metal;
    renderPriceTable();drawChart();window.scrollTo({top:0,behavior:'smooth'});
  },40);
},true));

const footerCall=document.querySelector('.footer-call');
  if(footerCall&&!document.querySelector('.footer-social-actions'))footerCall.insertAdjacentHTML('afterend',`<div class="footer-social-actions"><a class="footer-whatsapp" href="https://wa.me/48601775146?text=Dzie%C5%84%20dobry%2C%20chc%C4%99%20zapyta%C4%87%20o%20wycen%C4%99." target="_blank" rel="noopener" aria-label="Napisz na WhatsApp"><b>WA</b><span>WhatsApp</span></a><a href="https://www.facebook.com/" target="_blank" rel="noopener" aria-label="Facebook" title="Facebook"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4h-3c-3 0-5 2-5 5v2H6v4h3v7h4v-7h3l1-4h-4V9c0-.7.3-1 1-1z"/></svg></a><a href="https://m.me/puhsezam" target="_blank" rel="noopener" aria-label="Napisz do PUH Sezam na Messengerze" title="Messenger — PUH Sezam"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3c-5 0-9 3.7-9 8.3 0 2.6 1.3 4.8 3.4 6.3V21l3.1-1.7c.8.2 1.7.3 2.5.3 5 0 9-3.7 9-8.3S17 3 12 3zm1 11-2.3-2.4L6.3 14l4.8-5.1 2.3 2.4 4.3-2.4L13 14z"/></svg></a></div>`);
const footerWhatsappMark=document.querySelector('.footer-whatsapp b');
if(footerWhatsappMark)footerWhatsappMark.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a9.8 9.8 0 0 0-8.4 14.9L2.2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18.1a8 8 0 0 1-4.1-1.1l-.3-.2-3.1.8.8-3-.2-.3A8 8 0 1 1 12 20.1zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.7.9c-.1.2-.3.2-.5.1-1.4-.7-2.4-1.3-3.4-2.9-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5l-.8-1.9c-.2-.5-.5-.4-.7-.4h-.5c-.2 0-.5.1-.7.3-.8.8-1.2 1.8-1.2 2.9 0 .3.1 2.1 1.6 4.1 1.5 2.1 3.5 3.6 5.8 4.2.8.2 1.5.2 2.1.1.7-.1 1.4-.7 1.6-1.3.2-.6.2-1.1.1-1.2-.2-.2-.4-.2-.6-.3z"/></svg>';

const whatsappFloat=document.querySelector('.whatsapp-float');
if(whatsappFloat&&!document.querySelector('.messenger-float')){
  const whatsappMark=whatsappFloat.querySelector('span');
  if(whatsappMark)whatsappMark.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a9.8 9.8 0 0 0-8.4 14.9L2.2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18.1a8 8 0 0 1-4.1-1.1l-.3-.2-3.1.8.8-3-.2-.3A8 8 0 1 1 12 20.1zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.7.9c-.1.2-.3.2-.5.1-1.4-.7-2.4-1.3-3.4-2.9-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5l-.8-1.9c-.2-.5-.5-.4-.7-.4h-.5c-.2 0-.5.1-.7.3-.8.8-1.2 1.8-1.2 2.9 0 .3.1 2.1 1.6 4.1 1.5 2.1 3.5 3.6 5.8 4.2.8.2 1.5.2 2.1.1.7-.1 1.4-.7 1.6-1.3.2-.6.2-1.1.1-1.2-.2-.2-.4-.2-.6-.3z"/></svg>';
  whatsappFloat.insertAdjacentHTML('beforebegin',`<a class="messenger-float" href="https://m.me/puhsezam" target="_blank" rel="noopener" aria-label="Napisz do PUH Sezam na Messengerze"><span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3c-5 0-9 3.7-9 8.3 0 2.6 1.3 4.8 3.4 6.3V21l3.1-1.7c.8.2 1.7.3 2.5.3 5 0 9-3.7 9-8.3S17 3 12 3zm1 11-2.3-2.4L6.3 14l4.8-5.1 2.3 2.4 4.3-2.4L13 14z"/></svg></span><b>Napisz na Messengerze</b></a>`);
}
document.querySelectorAll('a[href*="wa.me/48601775146"]').forEach(link=>{link.href='https://wa.me/48601775146'});
const whatsappIcon='<svg class="wa-logo" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.149-.173.198-.297.298-.496.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.009-.371-.011-.57-.011-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479s1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347M12.004 2a9.84 9.84 0 0 0-8.346 15.065L2 22l5.09-1.637A9.92 9.92 0 1 0 12.004 2m0 17.8a7.8 7.8 0 0 1-3.977-1.09l-.285-.17-3.02.972.986-2.946-.186-.302A7.79 7.79 0 1 1 12.004 19.8"/></svg>';
document.querySelectorAll('.whatsapp-float span,.footer-whatsapp b,.contact-whatsapp span,.quick-whatsapp i').forEach(mark=>{mark.innerHTML=whatsappIcon});

const sellIcons=[
  `<svg viewBox="0 0 160 100" aria-hidden="true"><path d="M23 17c5 32 15 52 33 59 18-7 28-27 33-59"/><path d="M31 19c4 25 12 42 25 48 13-6 21-23 25-48"/><path d="M45 67l11-16 11 16-11 14zM49 62h14M56 51v30"/><ellipse cx="116" cy="59" rx="25" ry="17"/><ellipse cx="116" cy="59" rx="16" ry="10"/><path d="M91 59c0-18 11-31 25-31s25 13 25 31"/></svg>`,
  `<svg viewBox="0 0 160 100" aria-hidden="true"><circle cx="45" cy="51" r="31"/><circle cx="45" cy="51" r="25"/><path d="M45 32l4 9 9-4-4 9 9 5-9 5 4 10-9-4-4 10-4-10-9 4 4-10-9-5 9-5-4-9 9 4z"/><path d="M83 35l12-12h37l12 12-9 42H74zM91 38h43l-7 29H82zM98 48h28M95 57h34"/><path d="M111 23v44"/></svg>`,
  `<svg viewBox="0 0 160 100" aria-hidden="true"><path d="M18 18h48l7 18v30l-7 18H18l-7-18V36zM29 18V7h26v11M29 84v9h26v-9"/><circle cx="42" cy="51" r="19"/><circle cx="42" cy="51" r="15"/><path d="M42 39v13l9 5M84 80l34-52 11 7-35 52-14 5zM118 28l5-8 11 7-5 8M88 77l9 6"/><path d="M133 47h17v37h-17zM136 47v-8h11v8M137 57h9"/></svg>`,
  `<svg viewBox="0 0 160 100" aria-hidden="true"><path d="M14 47h132l9 39H5zM5 86h150M25 39h110v9H25z"/><path d="M32 38l10-17h30L62 38zM66 38l11-21h32L98 38zM101 38l9-15h26l-8 15z"/><path d="M42 29h22M79 27h21M112 30h18"/><circle cx="80" cy="68" r="11"/><path d="M80 61v14M73 68h14"/></svg>`
];
document.querySelectorAll('.sell-visual').forEach((box,index)=>{if(sellIcons[index])box.innerHTML=sellIcons[index]});

const marketLabel=document.querySelector('.market-label b');
if(marketLabel)marketLabel.textContent='Referencyjna cena metali';

const valueIcons=[
  `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M11 24l8 8 18-19M24 5l16 7v11c0 10-6 17-16 21C14 40 8 33 8 23V12z"/></svg>`,
  `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 38h28M15 38V20h18v18M19 20l4-8h6l4 8M20 28h8M24 24v8"/></svg>`,
  `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 5l15 6v11c0 10-6 18-15 22C15 40 9 32 9 22V11zM18 24h12M21 19h6M20 29h8"/></svg>`
];
document.querySelectorAll('.values article').forEach((article,index)=>{if(!article.querySelector('.value-icon'))article.insertAdjacentHTML('afterbegin',`<div class="value-icon">${valueIcons[index]}</div>`)});

const heroActions=document.querySelector('.hero .actions');
if(heroActions&&!document.querySelector('.cash-now-note'))heroActions.insertAdjacentHTML('afterend','<p class="cash-now-note"><b>Gotówka od ręki</b> po akceptacji wyceny</p>');

const jewelryCard=document.querySelector('.sell-grid a:first-child p');
if(jewelryCard&&!document.querySelector('.jewelry-premium-inline'))jewelryCard.insertAdjacentHTML('afterend','<p class="jewelry-premium-inline"><b>Ważne:</b> za nieuszkodzoną biżuterię możesz otrzymać znacznie więcej niż wynosi cena samego złomu.</p>');
const calcLive=document.querySelector('.calc-live');
if(calcLive&&!document.querySelector('.jewelry-premium-note'))calcLive.insertAdjacentHTML('afterend','<div class="jewelry-premium-note"><b>Masz biżuterię w dobrym stanie?</b> Otrzymasz za nią więcej niż w cenniku.</div>');
const values=document.querySelector('.values');
if(values&&!document.querySelector('.valuation-promises'))values.insertAdjacentHTML('afterend','<div class="valuation-promises"><span><b>Biżuteria w dobrym stanie</b> może być warta znacznie więcej niż złom</span><span><b>Gotówka od ręki</b> po zaakceptowaniu wyceny</span></div>');

const firstProcessTitle=document.querySelector('[data-page="process"] .steps article:first-child h2');
if(firstProcessTitle)firstProcessTitle.textContent='Przynosisz metal szlachetny';

const pricesPageHead=document.querySelector('[data-page="prices"] .page-head');
if(pricesPageHead&&!document.querySelector('.jewelry-price-alert'))pricesPageHead.insertAdjacentHTML('afterend','<div class="jewelry-price-alert"><span>◆</span><p><b>Masz biżuterię w dobrym stanie?</b> Otrzymasz za nią więcej niż w cenniku.</p><a href="#contact">Zapytaj o indywidualną wycenę →</a></div>');

const panelHead=document.querySelector('.panel-head');
if(panelHead&&!panelHead.querySelector('.panel-reference-price')){
  const reference=document.createElement('div');reference.className='panel-reference-price';
  reference.innerHTML='<small>Cena referencyjna złota 999,9 / 1 g</small><div class="reference-values"><b>—</b><b>—</b></div><i>—</i>';
  panelHead.insertBefore(reference,panelHead.querySelector('#updated-at'));
  const referenceLabels={gold:'Cena referencyjna złota 999,9 / 1 g',silver:'Cena referencyjna srebra 999,9 / 1 g',platinum:'Cena referencyjna platyny 999,9 / 1 g',palladium:'Cena referencyjna palladu 999,9 / 1 g'};
  const updateReference=()=>{const metal=activeMetal||'gold',value=metalRates?.[metal],change=Number(changes?.[metal]||0),direction=change>0?'up':change<0?'down':'flat',values=reference.querySelectorAll('b');reference.querySelector('small').textContent=referenceLabels[metal]||'Referencyjna cena metalu';values[0].textContent=Number.isFinite(value)?`${value.toFixed(2).replace('.',',')} zł/g`:'—';values[1].textContent=Number.isFinite(value)?`${(value*31.10).toFixed(2).replace('.',',')} zł/oz`:'—';reference.querySelector('i').className=direction;reference.querySelector('i').textContent=`${change>0?'↑':change<0?'↓':'→'} ${Math.abs(change).toFixed(2).replace('.',',')}%`};
  document.addEventListener('market-data-updated',updateReference);document.addEventListener('click',event=>{if(event.target.closest('[data-metal-tab]'))setTimeout(updateReference)});setTimeout(updateReference);
}
