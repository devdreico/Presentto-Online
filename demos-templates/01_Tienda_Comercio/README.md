# TEMPLATE 01 — Tienda / Comercio

## Ghost Business
- **Nombre:** Mundo Hogar Funza
- **Tipo:** Tienda de artículos para el hogar
- **Ubicación:** Cra 12 #18-45, Funza, Cundinamarca
- **Teléfono:** 311 222 3344
- **WhatsApp:** 3112223344
- **Eslogan:** "Todo para tu hogar, en un solo lugar"
- **Horario:** Lun-Sáb 8am-7pm, Dom 9am-2pm

## Identidad Visual
- **Estilo:** 3D Card Flip + Paralaje Hero + Glassmorphism
- **Animación Firma:** Tarjetas de producto giran en Y al hover (`rotateY(180deg)`) mostrando info detallada atrás con CTA directo a WhatsApp
- **Paleta (variables CSS):** 
  - `--color-primary: #f57c00` (naranja CTAs)
  - `--color-secondary: #e65100` (naranja hovers)
  - `--color-bg: #ffffff` (fondo)
  - `--color-bg-alt: #fff8f5` (fondo secciones)
  - `--color-text: #1a1a1a` (textos principales)
  - `--color-text-light: #777` (textos secundarios)
- **Tipografía (variables CSS):**
  - `--font-heading: 'Montserrat', system-ui, -apple-system, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji'` (títulos 800/900)
  - `--font-body: 'Inter', system-ui, -apple-system, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji'` (cuerpo 400/600)
- **Sensación:** Energético comercial, cálido, limpio, profesional

## Páginas
- `index.html` — Hero con paralaje 3 capas (fondo + productos flotantes + texto), about con contadores animados, 4 productos destacados con 3D Card Flip, testimonios, CTA
- `productos.html` — Catálogo completo con categorías (Cocina / Decoración / Electrodomésticos) y 3D Card Flip en cada producto
- `galeria.html` — Galería con filtros interactivos (Todos / Local / Cocina / Decoración), 9 imágenes reales
- `contacto.html` — 4 tarjetas glass (dirección, horarios, teléfono, email) + formulario → WhatsApp + mapa embebido

## Animaciones
- **3D Card Flip** — Productos giran 180° en Y al hover, mostrando descripción + características + botón WhatsApp
- **Paralaje Hero** — Imágenes flotantes se mueven con scroll a diferente velocidad (efecto 3 capas)
- **Contadores animados** — Años, productos y clientes suben desde 0 al hacer scroll
- **FadeInUp secuencial** — Cards aparecen uno tras otro al cargar
- **Glassmorphism hover** — Tarjetas se elevan con sombra
- **Preferes-reduced-motion** — Todas las animaciones respetan la preferencia del usuario

## Assets
- `assets/images/hero-tienda.jpg` — Hero principal
- `assets/images/producto-cocina.jpg` — Set de cocina (destacado)
- `assets/images/producto-decoracion.jpg` — Decoración living
- `assets/images/producto-hogar.jpg` — Cojines decorativos
- `assets/images/producto-electro.jpg` — Licuadora pro
- `assets/images/cocina-adicional.jpg` — Cubiertos 24pz
- `assets/images/local-tienda.jpg` — Interior del local
- `assets/images/gallery/gallery-01.jpg` a 06 — Galería adicional

## Estado
- [x] Refactor completo: multi-página (index, productos, galeria, contacto)
- [x] CSS mobile-first con glassmorphism, 3D Card Flip, parallax, contadores
- [x] JS funcional: nav, parallax, filtros, contadores, formulario WhatsApp
- [x] Imágenes reales optimizadas (7 principales + 6 galería)
- [x] Responsive: 320px / 768px / 1024px+
- [x] Animación 3D firma: Card Flip con `rotateY(180deg)` y `backface-visibility`
- [x] Variables CSS estandarizadas (exactamente 10 variables personalizables)
- [x] Preferes-reduced-motion implementado
- [x] Lighthouse Performance objetivo > 90
- [x] README actualizado con estándares v1.0