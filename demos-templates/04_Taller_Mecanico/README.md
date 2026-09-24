# TEMPLATE 04 — Taller Mecánico

## Ghost Business
- **Nombre:** El Motor Madrid
- **Tipo:** Taller mecánico especializado
- **Ubicación:** Av. 5 #20-45, Madrid, Cundinamarca
- **Teléfono:** 314 445 5667
- **WhatsApp:** 3144455667
- **Eslogan:** "Potencia y precisión"
- **Horario:** Lun-Vie 7am-6pm, Sáb 8am-2pm

## Identidad Visual (ESTILO DISRUPTIVO)
- **Estilo:** Industrial Cyberpunk + Isométrico 3D + Neón Cyan
- **Animación Firma:** Isométrico 3D — Cards con rotación en perspectiva 3D al hover (tilt por mouse tracking en ISO cards + metric cards)
- **Paleta:** Fondo negro `#0a0e17`, Cian eléctrico `#00d4ff`, Ámbar `#ffb300`, Acero oscuro `#121827`
- **Tipografía:** Montserrat (títulos display 700/900, subtítulos y cuerpo, 400–900)
- **Sensación:** Industrial, tecnológico, robusto, mecánico, cyberpunk
- **Gimmick visual:** Grid background tipo rejilla técnica, scanline animado en hero, glow pulse central, etiquetas con borde neón

## Páginas
- `index.html` — Portada funcional con propuesta del taller, llamada a WhatsApp, servicios destacados y navegación principal
- `servicios.html` — 4 categorías (Diagnóstico, Mecánica General, Latonería, Eléctricos) con items detallados y precios, item destacado "Cambio de Aceite" con highlight cyan
- `galeria.html` — Galería con filtros (Todos / Taller / Mecánica / Latonería), usando los assets disponibles
- `contacto.html` — 4 tarjetas glass, formulario "Diagnóstico gratis" con placeholders técnicos, mapa

## Uso técnico
- La portada sirve como punto de entrada de una demo para talleres mecánicos locales.
- `script.js` gestiona el menú móvil y los filtros de galería; `premium-template.js` añade reveals, consentimiento de cookies y mejoras visuales compartidas.
- Las imágenes de `assets/images/` son material de demostración; deben sustituirse por fotografías y datos autorizados del cliente antes de publicar.
- El formulario y los enlaces de WhatsApp son puntos de integración: requieren datos, endpoint y número definitivos del negocio.

## Animaciones Disruptivas
- **Isométrico 3D Tilt** — Cards del hero y métricas rotan en perspectiva 3D siguiendo el mouse (`rotateX` + `rotateY` + `translateZ`), efecto holograma
- **Scanline Animado** — Líneas de barrido horizontales en el hero que se mueven con JS, como monitor CRT
- **Grid Técnico** — Fondo con cuadrícula sutil de 60px que evoca planos mecánicos
- **Glow Pulse** — Spot de luz cian que late en el centro del hero
- **Shimmer en ISO** — Brillo que cruza las tarjetas isométricas al hover
- **Neón Cian** — Sombras y textos con glow `0 0 40px`

## Assets
- `assets/images/mecanico-01.jpg` — Mecánico trabajando
- `assets/images/mecanico-02.jpg` — Reparación de motor
- `assets/images/herramientas.jpg` — Herramientas profesionales
- `assets/images/local-taller.jpg` — Instalaciones
- `assets/images/gallery/gallery-01.jpg` a 07 — Galería

## Estado
- [x] HTML estructurado multi-página (index, servicios, galeria, contacto)
- [x] CSS cyberpunk industrial con grid, scanline, neón, isométrico 3D
- [x] JS funcional: nav, mouse tilt 3D, filtros, contadores, formulario, scanline animado
- [x] Imágenes reales de Pexels (6 principales + 7 galería)
- [x] Responsive: 320px / 768px / 1024px+
- [x] Animación 3D firma: Isométrico 3D Tilt con mouse tracking
- [x] Diferenciación visual total vs templates 01, 02 y 03
