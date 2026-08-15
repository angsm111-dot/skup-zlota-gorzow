const oldContactForm=document.querySelector('#contact-form');
if(oldContactForm){
  const form=oldContactForm.cloneNode(false);
  form.enctype='multipart/form-data';
  form.innerHTML=`<div class="form-head"><small>FORMULARZ KONTAKTOWY</small><h2>Napisz do nas</h2><p>Odpowiadamy zwykle tego samego dnia roboczego.</p></div><div class="contact-form-grid"><label>Imię<input required name="imie" autocomplete="given-name" placeholder="Wpisz imię"></label><label>Telefon<input name="telefon" autocomplete="tel" type="tel" inputmode="tel" placeholder="Wpisz telefon (opcjonalnie)"></label><label class="wide">Adres e-mail<input required name="email" autocomplete="email" type="email" inputmode="email" placeholder="Wpisz adres e-mail"></label><label class="wide">Wiadomość<textarea name="wiadomosc" rows="5" placeholder="Wpisz treść wiadomości"></textarea></label><label class="wide contact-file">Dodaj zdjęcie <small>(opcjonalnie, JPG/PNG/WebP, maks. 7 MB)</small><input name="zdjecie" type="file" accept="image/jpeg,image/png,image/webp"><span id="contact-file-name">Nie wybrano zdjęcia</span></label></div><label class="consent"><input type="checkbox" required name="zgoda"> <span>Zgadzam się na kontakt w sprawie przesłanego zapytania i akceptuję politykę prywatności.</span></label><div class="form-security"><span>✓</span><p><b>Ochrona antyspamowa</b><small>Zostanie aktywowana podczas podłączania właściwej domeny.</small></p></div><button class="btn dark-btn" type="submit">Wyślij zapytanie <span>→</span></button><p id="form-status" role="status" aria-live="polite"></p>`;
  oldContactForm.replaceWith(form);
  const fileInput=form.querySelector('[name="zdjecie"]'),fileName=form.querySelector('#contact-file-name'),status=form.querySelector('#form-status'),button=form.querySelector('button[type="submit"]');
  fileInput.addEventListener('change',()=>{const file=fileInput.files?.[0];fileName.textContent=file?file.name:'Nie wybrano zdjęcia';status.textContent='';status.className=''});
  form.addEventListener('submit',event=>{
    event.preventDefault();status.textContent='';status.className='';const file=fileInput.files?.[0];
    if(file&&file.size>7*1024*1024){status.textContent='Zdjęcie jest za duże — maksymalny rozmiar to 7 MB.';status.className='error';fileInput.focus();return}
    if(file&&!['image/jpeg','image/png','image/webp'].includes(file.type)){status.textContent='Dozwolone formaty zdjęcia: JPG, PNG lub WebP.';status.className='error';fileInput.focus();return}
    const label=button.innerHTML;button.disabled=true;button.textContent='Sprawdzanie…';
    setTimeout(()=>{status.textContent='Formularz jest przygotowany. Wysyłkę i ochronę antyspamową uruchomimy po podłączeniu właściwej domeny.';status.className='success';button.disabled=false;button.innerHTML=label},450);
  });
}
