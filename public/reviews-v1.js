(()=>{
  const home=document.querySelector('[data-page="home"]');
  const van=home?.querySelector('.van-section');
  if(!home||!van||home.querySelector('.google-reviews'))return;
  const section=document.createElement('section');
  section.className='google-reviews';
  section.setAttribute('aria-labelledby','google-reviews-title');
  section.innerHTML=`<div class="reviews-heading"><div><p class="eyebrow dark">Opinie Google</p><h2 id="google-reviews-title">Klienci wracają do nas<br>po uczciwą wycenę.</h2></div><div class="google-score"><span class="google-mark">G</span><strong>4,9</strong><span class="review-stars" aria-label="5 gwiazdek">★★★★★</span><small>na podstawie ponad 170 opinii</small></div></div><div class="review-grid"><article><div class="review-top"><span>PT</span><div><strong>Paweł Topolski</strong><small>Opinia Google</small></div></div><p>Klient docenił zgodność ceny ustalonej telefonicznie z ofertą przedstawioną na miejscu oraz brak nieprzyjemnych niespodzianek.</p></article><article><div class="review-top"><span>MK</span><div><strong>Milena Kwiatkowska</strong><small>Opinia Google</small></div></div><p>Krótka i konkretna rekomendacja za szybką, sprawną obsługę przy sprzedaży złota.</p></article><article><div class="review-top"><span>PK</span><div><strong>Paweł Kulas</strong><small>Opinia Google</small></div></div><p>Klient wyróżnił natychmiastową wypłatę gotówki, sprawny przebieg transakcji i jasne wyjaśnienie całej wyceny.</p></article></div><a class="reviews-link" href="https://share.google/5cjULhCGFxPSp9kUW" target="_blank" rel="noopener">Zobacz wszystkie opinie w Google <span>↗</span></a>`;
  van.before(section);
})();
