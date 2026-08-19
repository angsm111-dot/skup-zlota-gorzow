(()=>{
  const home=document.querySelector('[data-page="home"]');
  const van=home?.querySelector('.van-section');
  if(!home||!van||home.querySelector('.google-reviews'))return;

  const section=document.createElement('section');
  section.className='google-reviews google-reviews-summary';
  section.setAttribute('aria-labelledby','google-reviews-title');
  section.innerHTML=`
    <div class="google-score summary-score">
      <span class="google-mark">G</span>
      <div>
        <small>OPINIE GOOGLE · SEZAM GORZÓW</small>
        <strong>4,9 <span class="review-stars" aria-label="5 gwiazdek">★★★★★</span></strong>
        <p>Na podstawie 280 opinii klientów naszej firmy.</p>
      </div>
    </div>
    <div class="google-review-copy">
      <span class="eyebrow dark">ZAUFANIE KLIENTÓW</span>
      <h2 id="google-reviews-title">Sprawdzone miejsce<br>w centrum Gorzowa.</h2>
      <p>Zobacz opinie o obsłudze SEZAM przy ul. Pocztowej 11 i przejdź bezpośrednio do naszej wizytówki Google.</p>
      <a class="btn dark-btn" href="https://share.google/5cjULhCGFxPSp9kUW" target="_blank" rel="noopener">Zobacz 280 opinii Google <span>→</span></a>
    </div>`;
  van.before(section);
})();
