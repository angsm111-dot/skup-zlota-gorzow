# Architektura panelu, produktów i zdjęć

Stan dokumentu: 9 października 2026 r.

## Najważniejsza zasada

Prawidłowy kierunek przepływu danych to:

`panel administracyjny -> KV/API Workera -> cennik i kalkulator`

Strona publiczna nie jest źródłem danych dla panelu. Panel nie odczytuje monet z widoku cennika ani z kodu HTML strony.

## Skąd pochodzą produkty

Worker tworzy wspólny katalog produktów, który jest zwracany przez `/api/prices` i wykorzystywany przez:

- panel administracyjny,
- publiczny cennik,
- kalkulator.

Katalog jest obecnie połączeniem:

- produktów bazowych zapisanych w kodzie Workera,
- produktów oraz modyfikacji zapisanych w Cloudflare KV.

Panel jest interfejsem do zarządzania tym wspólnym katalogiem. Cennik i kalkulator nie powinny posiadać oddzielnej kopii danych produktu.

## Zdjęcia produktów

Kolejność wyboru zdjęcia:

1. Zdjęcie wgrane podczas edycji produktu w panelu (`imageData`) ma najwyższy priorytet.
2. Jeżeli produktu jeszcze nie edytowano, może zostać użyty lokalny obraz katalogowy zapisany w `public/assets`.
3. Dla wybranych produktów może zostać użyte dozwolone źródło zewnętrzne.
4. Jeśli obrazu nie ma lub źródło nie działa, panel powinien pokazać czytelne „brak zdjęcia”, a nie ikonę uszkodzonego pliku.

Po wybraniu nowego zdjęcia i kliknięciu „Opublikuj cennik” obraz zostaje zapisany przy produkcie w KV. Następnie ten sam obraz musi być widoczny:

- w panelu,
- w cenniku,
- w kalkulatorze,
- na komputerze i urządzeniach mobilnych.

Zdjęcie powinno zawsze zachowywać proporcje (`contain`), być wyśrodkowane i nie może być rozciągane.

## Produkty wbudowane a zapisane w KV

Produkty bazowe zostały wcześniej dodane do kodu Workera. Edycja produktu bazowego tworzy jego nadpisanie w KV. Produkt dodany ręcznie w panelu jest przechowywany w KV jako produkt własny.

Obie grupy muszą korzystać z tego samego API, tego samego sposobu wyceny i tej samej obsługi zdjęć. Dla użytkownika panelu różnica techniczna nie powinna wpływać na możliwość edycji, zmiany kolejności, ukrycia lub usunięcia produktu.

## Ceny

Ceny produktów nie są zapisane na stałe w obrazie ani w publicznej stronie. Worker wylicza je na podstawie:

- aktualnej ceny odpowiedniego metalu,
- masy czystego metalu,
- potrącenia ustawionego w panelu,
- opcjonalnej ceny ręcznej.

Zarówno produkt bazowy, jak i produkt dodany do KV powinny aktualizować cenę według tego samego mechanizmu.

## Cloudflare i pamięć podręczna

Pliki panelu HTML, JavaScript i CSS powinny być zwracane z nagłówkami `no-store`, żeby panel nie mieszał starych i nowych wersji.

W projekcie działa również automatyczne wdrażanie z GitHuba. Kilka kolejnych commitów może uruchomić kilka buildów, które zakończą się w innej kolejności i chwilowo nadpiszą ręczne wdrożenie. Po zakończeniu buildów należy ponownie wdrożyć kompletny, finalny stan i zweryfikować faktycznie serwowane numery plików.

## Bezpieczeństwo panelu

Panel zachowuje restrykcyjną politykę CSP:

- skrypty wyłącznie z tej samej domeny,
- style wyłącznie z tej samej domeny,
- obrazy z tej samej domeny, `data:` oraz z jawnie dozwolonych domen obrazów,
- brak dowolnych skryptów i stylów inline.

Zdjęcia i pozycje atlasów w panelu są obsługiwane przez gotowe klasy CSS, żeby nie trzeba było osłabiać CSP.

## Reguła dla kolejnych zmian

Przed zmianą krytycznej logiki należy:

1. utworzyć kopię bezpieczeństwa,
2. nie zmieniać identyfikatora KV ani sekretów,
3. wykonać test składni,
4. wykonać `wrangler deploy --dry-run`,
5. zsynchronizować GitHub,
6. poczekać na automatyczne buildy,
7. wdrożyć finalny stan,
8. sprawdzić produkcyjne API oraz faktyczne wersje plików panelu.

Ten dokument nie zawiera loginów, haseł, tokenów ani sekretów Cloudflare.

