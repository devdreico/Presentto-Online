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
- **Tipografía:** Orbitron (títulos display, 700/900), Rajdhani (subtítulos), Inter (cuerpo)
- **Sensación:** Industrial, tecnológico, robusto, mecánico, cyberpunk
- **Gimmick visual:** Grid background tipo rejilla técnica, scanline animado en hero, glow pulse central, etiquetas con borde neón

## Páginas
- `index.html` — Hero cyberpunk con grid bg + scanline + glow pulse, isotipo "Taller Especializado" con dot animado, ISO cards flotando en 3D, about con contadores, servicios isométricos, métricas con tilt 3D, CTA cyan
- `servicios.html` — 4 categorías (Diagnóstico, Mecánica General, Latonería, Eléctricos) con items detallados y precios, item destacado "Cambio de Aceite" con highlight cyan
- `galeria.html` — Galería con filtros (Todos / Taller / Mecánica / Latonería), 9 imágenes reales
- `contacto.html` — 4 tarjetas glass, formulario "Diagnóstico gratis" con placeholders técnicos, mapa

## Animaciones Disruptivas
- **Isométrico 3D Tilt** — Cards del hero y métricas rotan en perspectiva 3D siguiendo el mouse (`rotateX` + `rotateY` + `translateZ`), efecto holograma
- **Scanline Animado** — Líneas de barrido horizontales en el hero que se mueven con JS, como monitor CRT
- **Grid Técnico** — Fondo con cuadrícula sutil de 60px que evoca planos mecánicos
- **Glow Pulse** — Spot de luz cian que late en el centro del hero
- **Shimmer en ISO** — Brillo que cruza las tarjetas isométricas al hover
- **Neón Cian** — Sombras y textos con glow `0 0 40px`

## Assets
- `assets/images/hero-taller.jpg` — Hero principal
- `assets/images/mecanico-01.jpg` — Mecánico trabajando
- `assets/images/mecanico-02.jpg` — Reparación de motor
- `assets/images/diagnostico.jpg` — Diagnóstico computarizado
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
