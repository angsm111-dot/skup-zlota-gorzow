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
}
