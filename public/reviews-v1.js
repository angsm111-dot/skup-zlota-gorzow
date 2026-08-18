(()=>{
  const home=document.querySelector('[data-page="home"]');
  const van=home?.querySelector('.van-section');
  if(!home||!van||home.querySelector('.google-reviews'))return;

  const reviews=[
    ['PT','Paweł Topolski','Klient docenił zgodność ceny ustalonej telefonicznie z ofertą przedstawioną na miejscu oraz brak nieprzyjemnych niespodzianek.'],
    ['MK','Milena Kwiatkowska','Krótka i konkretna rekomendacja za szybką, sprawną obsługę przy sprzedaży złota.'],
    ['PK','Paweł Kulas','Klient wyróżnił natychmiastową wypłatę gotówki, sprawny przebieg transakcji i jasne wyjaśnienie całej wyceny.'],
    ['KG','Klient Google','Profesjonalna wycena złotej biżuterii, dokładne badanie próby i sprawna wypłata gotówki.'],
    ['KG','Klient Google','Bardzo dobra obsługa przy sprzedaży złota. Wszystkie etapy badania i wyceny zostały jasno wyjaśnione.'],
    ['KG','Klient Google','Szybka i uczciwa wycena złota bez ukrytych potrąceń. Klient poleca punkt za rzeczowe podejście.']
  ];
  const cards=reviews.map(([initials,name,copy])=>`<article><div class="review-top"><span>${initials}</span><div><strong>${name}</strong><small>Opinia Google</small></div></div><p>${copy}</p></article>`).join('');
  const section=document.createElement('section');
  section.className='google-reviews';
  section.setAttribute('aria-labelledby','google-reviews-title');
  section.innerHTML=`<div class="reviews-heading"><div><p class="eyebrow dark">Opinie Google</p><h2 id="google-reviews-title">Klienci wracają do nas<br>po uczciwą wycenę.</h2></div><div class="reviews-summary"><div class="google-score"><span class="google-mark">G</span><strong>4,9</strong><span class="review-stars" aria-label="5 gwiazdek">★★★★★</span><small>na podstawie 280 opinii</small></div><div class="review-arrows" aria-label="Przewijanie opinii"><button type="button" data-review-direction="-1" aria-label="Poprzednie opinie">←</button><button type="button" data-review-direction="1" aria-label="Następne opinie">→</button></div></div></div><div class="review-viewport"><div class="review-grid">${cards}</div></div><a class="reviews-link" href="https://share.google/5cjULhCGFxPSp9kUW" target="_blank" rel="noopener">Zobacz wszystkie opinie w Google <span>↗</span></a>`;
  van.before(section);
  const viewport=section.querySelector('.review-viewport');
  section.querySelectorAll('[data-review-direction]').forEach(button=>button.addEventListener('click',()=>{
    viewport.scrollBy({left:Number(button.dataset.reviewDirection)*viewport.clientWidth,behavior:'smooth'});
  }));
})();
