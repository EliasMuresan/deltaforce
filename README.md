# Delta Force Robotics

Structura proiectului este acum pregatita pentru lucru curat in Git si pentru publicare statica.

## Structura

- `index.html` - pagina principala
- `ftc-*.html`, `frc-*.html`, `fgc-2023.html`, `events-*.html` - paginile de sezon / detaliu
- `sustine/index.html` - pagina de sustinere
- `assets/css/` - toate fisierele CSS
- `assets/js/` - toata logica JavaScript
- `assets/images/` - imagini organizate pe categorii
- `assets/video/` - video pentru hero
- `assets/docs/` - documente descarcabile
- `assets/fonts/` - fonturi locale pastrate in proiect
- `scripts/` - scripturi utilitare locale

## Publicare

Pentru GitHub Pages:

1. lasa `index.html` in radacina
2. urca tot continutul repo-ului, inclusiv folderul `assets/`
3. pastreaza `sustine/index.html` ca ruta dedicata pentru pagina de sustinere

## Observatii

- fisierele locale de browser/cache nu mai fac parte din structura proiectului
- `.gitignore` este configurat pentru a bloca artefactele generate local
