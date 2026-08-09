const blogArticles = [
  {
    id: 'przygotowanie-bizuterii',
    category: 'PORADNIK',
    date: '9 sierpnia 2026',
    time: '4 min czytania',
    image: 'assets/blog-bizuteria-wycena.webp',
    alt: 'Złote pierścionki, kolczyki, bransoletka i łańcuszek przygotowane do wyceny',
    title: 'Jak przygotować złotą biżuterię do wyceny?',
    lead: 'Dobra wiadomość: biżuterii nie trzeba polerować, naprawiać ani szukać do niej pudełka. Najważniejsze jest rzetelne zbadanie próby i dokładne ważenie.',
    body: `
      <p>Przed wizytą w skupie warto zebrać biżuterię w jednym miejscu i — jeśli to możliwe — posegregować ją według oznaczeń próby. Nie jest to jednak konieczne. Profesjonalna wycena powinna obejmować każdy przedmiot osobno, również wtedy, gdy oznaczenie jest starte albo wyrób składa się z kilku różnych elementów.</p>
      <h3>Czy biżuterię trzeba wcześniej czyścić?</h3>
      <p>Nie. Domowe środki mogą uszkodzić delikatne powierzchnie, kamienie lub stare oprawy. Zabrudzenie nie przeszkadza w badaniu składu metalu. Wystarczy przynieść wyrób w takim stanie, w jakim jest przechowywany.</p>
      <h3>Dokumenty i certyfikaty</h3>
      <p>Paragon, certyfikat czy oryginalne opakowanie mogą być pomocne, lecz nie są warunkiem wyceny. O wartości złota decydują przede wszystkim masa, rzeczywista próba i aktualna cena metalu. Przy biżuterii markowej, zabytkowej albo wyjątkowo dobrze zachowanej znaczenie może mieć również wykonanie i możliwość dalszej sprzedaży.</p>
      <div class="blog-callout"><b>Warto pamiętać</b><span>Nieuszkodzona, atrakcyjna biżuteria może otrzymać wyższą wycenę niż cena samego złomu.</span></div>
      <p>W Skupie Złota Gorzów oględziny i ważenie odbywają się przy kliencie. Po przedstawieniu ceny samodzielnie decydujesz, czy chcesz sprzedać przedmiot.</p>`
  },
  {
    id: 'badanie-zlota',
    category: 'TECHNOLOGIA',
    date: '9 sierpnia 2026',
    time: '5 min czytania',
    image: 'assets/blog-badanie-zlota.webp',
    alt: 'Profesjonalne badanie złotej bransoletki przy użyciu spektrometru i precyzyjnej wagi',
    title: 'Jak profesjonalny skup sprawdza złoto?',
    lead: 'Rzetelna wycena nie powinna opierać się na zgadywaniu. Liczą się dokładny pomiar masy, analiza składu oraz jasne wyjaśnienie wyniku.',
    body: `
      <p>Znak wybity na biżuterii jest ważną wskazówką, ale sam w sobie nie wystarcza do ostatecznego potwierdzenia próby. Oznaczenie może być starte, element mógł być naprawiany innym stopem, a w starszych wyrobach poszczególne części czasem różnią się składem.</p>
      <h3>Precyzyjne ważenie</h3>
      <p>Podstawą obliczenia jest masa. Dlatego korzystamy z profesjonalnych systemów wagowych Sartorius i Mettler Toledo. Pomiar odbywa się przy kliencie, a wskazanie wagi jest widoczne przed przedstawieniem ceny.</p>
      <h3>Analiza składu metalu</h3>
      <p>Do badania wykorzystujemy nowoczesne spektrometry Helmut Fischer z detektorami SDD. Analiza pozwala szybko i bezpiecznie określić skład stopu bez opierania wyceny wyłącznie na wyglądzie przedmiotu.</p>
      <p>Wynik badania łączymy z aktualnym notowaniem metalu i zasadami obowiązującymi w cenniku. Klient otrzymuje konkretną cenę przed podjęciem decyzji — bez obowiązku sprzedaży i bez ukrytych opłat.</p>
      <div class="blog-callout"><b>Transparentna wycena</b><span>Badanie, ważenie i obliczenie ceny powinny być zrozumiałe dla właściciela przedmiotu.</span></div>`
  },
  {
    id: 'proby-zlota',
    category: 'WIEDZA O ZŁOCIE',
    date: '9 sierpnia 2026',
    time: '5 min czytania',
    image: 'assets/blog-proby-zlota.webp',
    alt: 'Złote pierścionki i bransoletka oglądane przez lupę jubilerską',
    title: 'Próba złota 333, 585 czy 750 — co oznacza?',
    lead: 'Próba mówi, jaka część stopu jest czystym złotem. Im jest wyższa, tym więcej cennego kruszcu zawiera jeden gram wyrobu.',
    body: `
      <p>Czyste złoto jest miękkie, dlatego biżuterię wykonuje się najczęściej ze stopów zawierających także inne metale. Liczba próby określa udział złota w tysiącu części stopu. Próba 585 oznacza więc 58,5% czystego złota, a próba 750 — 75%.</p>
      <h3>Najczęściej spotykane próby</h3>
      <p>W polskiej biżuterii często występują próby 333, 375, 585 i 750. W monetach inwestycyjnych oraz sztabkach spotyka się także próby 916, 986 i 999 lub 999,9. Oznaczenia karatowe są innym sposobem zapisu: przykładowo 14K odpowiada w przybliżeniu próbie 585, a 18K próbie 750.</p>
      <h3>Dlaczego ceny za gram są różne?</h3>
      <p>Jeden gram wyrobu próby 750 zawiera więcej czystego złota niż gram próby 585, dlatego jego wartość metalu jest wyższa. Cena skupu zależy również od bieżącej ceny spot oraz indywidualnych ustawień cennika.</p>
      <p>Nie należy zakładać, że brak czytelnej cechy oznacza brak wartości. Próbę można potwierdzić podczas badania. Dotyczy to szczególnie starej biżuterii, elementów po naprawach oraz wyrobów sprowadzonych z zagranicy.</p>
      <div class="blog-callout"><b>Sprawdź orientacyjną wartość</b><span>W naszym kalkulatorze wybierzesz próbę i wagę, a ostateczną cenę potwierdzimy po bezpłatnym badaniu.</span></div>`
  },
  {
    id: 'bezpieczna-sprzedaz',
    category: 'SKUP ZŁOTA',
    date: '9 sierpnia 2026',
    time: '4 min czytania',
    image: 'assets/blog-bezpieczny-skup.webp',
    alt: 'Klient przekazuje złotą biżuterię do profesjonalnej wyceny przy ladzie',
    title: 'Jak wygląda sprzedaż złota krok po kroku?',
    lead: 'Profesjonalny skup powinien dać Ci czas, jasną kalkulację i możliwość rezygnacji. Cała procedura zwykle zajmuje zaledwie kilka minut.',
    body: `
      <p>Po przyjściu do punktu najpierw oglądamy przyniesione przedmioty i rozdzielamy je według rodzaju metalu oraz próby. Następnie każdy element jest ważony i — gdy jest to potrzebne — badany w celu potwierdzenia składu.</p>
      <h3>Cena przedstawiona przed sprzedażą</h3>
      <p>Po pomiarach obliczamy wartość na podstawie aktualnego notowania i obowiązującego cennika. Zanim dojdzie do transakcji, klient otrzymuje konkretną propozycję. Wycena jest bezpłatna i nie zobowiązuje do sprzedaży.</p>
      <h3>Co warto zabrać?</h3>
      <p>Przynieś biżuterię, monety lub sztabki oraz ważny dokument tożsamości. Certyfikaty i opakowania warto dołączyć, jeżeli je posiadasz — zwłaszcza w przypadku produktów inwestycyjnych — ale zwykła biżuteria może zostać zbadana także bez dokumentacji.</p>
      <p>Po zaakceptowaniu wyceny finalizujemy transakcję zgodnie z ustalonymi warunkami. Oferujemy płatność od ręki. Przy większych ilościach możliwa jest również wcześniejsza konsultacja i wycena mobilna.</p>
      <div class="blog-callout"><b>Masz pytania?</b><span>Zadzwoń pod numer 601 775 146 lub napisz do nas przez WhatsApp przed wizytą.</span></div>`
  }
];

function blogCard(article, index) {
  return `<article class="blog-card" id="${article.id}">
    <div class="blog-card-image"><img src="${article.image}" width="1200" height="800" loading="lazy" decoding="async" alt="${article.alt}"></div>
    <div class="blog-card-copy"><div class="blog-meta"><span>${article.category}</span><time>${article.date}</time><small>${article.time}</small></div><span class="blog-number">0${index + 1}</span><h2>${article.title}</h2><p class="blog-lead">${article.lead}</p><button class="blog-read" type="button" aria-expanded="false">Czytaj artykuł <span>→</span></button><div class="blog-full" hidden>${article.body}<div class="blog-actions"><a href="#calculator">Oblicz wartość</a><a href="#contact">Umów wycenę</a></div></div></div>
  </article>`;
}

const blogPage = document.createElement('section');
blogPage.className = 'page blog-page';
blogPage.dataset.page = 'blog';
blogPage.innerHTML = `<div class="blog-head"><div><p class="eyebrow dark">Wiedza i praktyka</p><h1>Blog o złocie<br>i biżuterii.</h1></div><p>Prosto wyjaśniamy, jak wygląda wycena, od czego zależy cena złota i jak bezpiecznie sprzedać biżuterię, monety lub sztabki.</p></div><div class="blog-grid">${blogArticles.map(blogCard).join('')}</div><div class="blog-end"><p>Chcesz poznać wartość swoich przedmiotów?</p><a class="btn dark-btn" href="#contact">Bezpłatna wycena <span>→</span></a></div>`;
document.querySelector('main')?.append(blogPage);

document.querySelectorAll('.blog-read').forEach(button => button.addEventListener('click', () => {
  const full = button.nextElementSibling;
  const open = full.hidden;
  full.hidden = !open;
  button.setAttribute('aria-expanded', String(open));
  button.innerHTML = open ? 'Zwiń artykuł <span>↑</span>' : 'Czytaj artykuł <span>→</span>';
  if (open) button.closest('.blog-card').classList.add('open'); else button.closest('.blog-card').classList.remove('open');
}));

const footerInfo = document.querySelector('.footer-column:nth-of-type(3)');
if (footerInfo && !footerInfo.querySelector('a[href="#blog"]')) footerInfo.insertAdjacentHTML('afterbegin', '<a href="#blog">Blog</a>');

document.querySelectorAll('a[href="#blog"]').forEach(link => link.addEventListener('click', () => {
  document.querySelector('.topbar nav')?.classList.remove('open');
  document.querySelector('.menu-toggle')?.setAttribute('aria-expanded', 'false');
}));

if (location.hash === '#blog') route();

const blogDefaultTitle = document.title;
const blogDescription = document.querySelector('meta[name="description"]');
const blogDefaultDescription = blogDescription?.content || '';
function updateBlogMetadata() {
  const onBlog = location.hash === '#blog';
  document.title = onBlog ? 'Blog o złocie i biżuterii — Skup Złota Gorzów' : blogDefaultTitle;
  if (blogDescription) blogDescription.content = onBlog ? 'Poradniki o wycenie i sprzedaży złota, próbach złota, badaniu biżuterii oraz bezpiecznym skupie złota w Gorzowie Wlkp.' : blogDefaultDescription;
}
window.addEventListener('hashchange', updateBlogMetadata);
updateBlogMetadata();
