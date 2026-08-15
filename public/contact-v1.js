const contactPhone = [...document.querySelectorAll('.contact-card small')]
  .find(label => label.textContent.trim() === 'TELEFON')
  ?.parentElement;

if (contactPhone && !contactPhone.querySelector('.contact-whatsapp')) {
  const whatsapp = document.createElement('a');
  whatsapp.className = 'contact-whatsapp';
  whatsapp.href = 'https://wa.me/48601775146?text=Dzie%C5%84%20dobry%2C%20chc%C4%99%20zapyta%C4%87%20o%20wycen%C4%99%20metali.';
  whatsapp.target = '_blank';
  whatsapp.rel = 'noopener';
  whatsapp.setAttribute('aria-label', 'Napisz na WhatsApp pod numer 601 775 146');
  whatsapp.innerHTML = '<span>WA</span><b>Napisz na WhatsApp</b>';
  contactPhone.append(whatsapp);

  const messenger = document.createElement('a');
  messenger.className = 'contact-messenger';
  messenger.href = 'https://m.me/puhsezam';
  messenger.target = '_blank';
  messenger.rel = 'noopener';
  messenger.setAttribute('aria-label', 'Napisz do PUH Sezam na Messengerze');
  messenger.innerHTML = '<span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3c-5 0-9 3.7-9 8.3 0 2.6 1.3 4.8 3.4 6.3V21l3.1-1.7c.8.2 1.7.3 2.5.3 5 0 9-3.7 9-8.3S17 3 12 3zm1 11-2.3-2.4L6.3 14l4.8-5.1 2.3 2.4 4.3-2.4L13 14z"/></svg></span><b>Napisz na Messengerze</b>';
  contactPhone.append(messenger);
}

const quickPhone = document.querySelector('.contact-quick > a[href^="tel:"]');
if (quickPhone && !document.querySelector('.contact-quick-phone')) {
  const box = document.createElement('div');
  box.className = 'contact-quick-phone';
  box.innerHTML = '<span>01</span><small>ZADZWOŃ TERAZ</small><strong><a href="tel:+48601775146">601 775 146</a></strong><b><a href="tel:+48601775146">Połącz →</a></b><a class="quick-whatsapp" href="https://wa.me/48601775146?text=Dzie%C5%84%20dobry%2C%20chc%C4%99%20zapyta%C4%87%20o%20wycen%C4%99%20metali." target="_blank" rel="noopener"><i>WA</i> Napisz na WhatsApp →</a><a class="quick-messenger" href="https://m.me/puhsezam" target="_blank" rel="noopener"><i><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3c-5 0-9 3.7-9 8.3 0 2.6 1.3 4.8 3.4 6.3V21l3.1-1.7c.8.2 1.7.3 2.5.3 5 0 9-3.7 9-8.3S17 3 12 3zm1 11-2.3-2.4L6.3 14l4.8-5.1 2.3 2.4 4.3-2.4L13 14z"/></svg></i> Napisz na Messengerze →</a>';
  quickPhone.replaceWith(box);
}
