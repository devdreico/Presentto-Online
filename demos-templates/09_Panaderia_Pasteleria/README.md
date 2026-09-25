# TEMPLATE 09 — Panadería / Pastelería

## Ghost Business
- **Nombre:** Panadería El Trigal Madrid
- **Tipo:** Panadería y pastelería artesanal (obrador propio)
- **Ubicación:** Cra 8 #12-45, Madrid, Cundinamarca
- **Teléfono:** 323 556 7788
- **WhatsApp:** 3235567788
- **Eslogan:** "Horneado fresco cada mañana"
- **Horario:** Lun-Sáb 6am-8pm, Dom y festivos 6am-2pm

## Identidad Visual
- **Estilo:** Cálido artesanal + crema trigo + glassmorphism sutil (capa premium de `00_Base`)
- **Animación Firma:** Hero con tarjeta de "Producto del día" superpuesta y reveal en cascada con delays; contadores de stats suben desde 0
- **Paleta:** Trigo dorado `#d98a3d`, Café horneado `#8a4b2a`, Cacao oscuro `#6f3a1f`, Miga crema `#f6ead8`, Texto tierra `#3b2416`
- **Tipografía:** Montserrat (400–900, títulos display 800)
- **Sensación:** Cálido, limpio, apetitoso, de barrio pero moderno

## Páginas
- `index.html` — Hero con producto del día + datos de contacto, 4 categorías (Panes, Postres, Tortas por encargo, Desayunos), 3 destacados con precio, "Por qué El Trigal" con stats, horarios, contacto resumen + mapa, CTA WhatsApp
- `productos.html` — Catálogo completo con filtros (Todos / Panes / Postres / Tortas / Desayunos), 4 grupos con 26 productos y precios en COP, sección de pedidos y horarios
- `galeria.html` — Galería con filtros (Todos / Panes / Postres / Tortas / Obrador), 10 imágenes propias, cada foto enlaza a su categoría
- `contacto.html` — 4 tarjetas (dirección, teléfono/WhatsApp, horario, encargos) + formulario → Formspree con validación JS, mapa embebido y horarios

## Animaciones
- **Reveal en cascada** — Elementos con `.reveal` aparecen desde abajo con delays (`.reveal--d1/d2/d3`), respetando `prefers-reduced-motion`
- **Premium layer** — Reveal del contenedor, tilt 3D en cards/glass/galería, contadores de `.stat__num`, lazy-load y cookie consent desde `00_Base/premium-template.js`
- **Card hover** — Categorías, destacados, contactos y items del catálogo se elevan con sombra; fotos con zoom suave
- **Filtros** — Galería y catálogo muestran/ocultan sin recargar (`data-filter` + `data-category`)
- **Nav móvil** — Menú hamburguesa accesible (`aria-expanded`, cierre con Escape y clic exterior)

## Assets
- `assets/images/hero-panaderia.jpg` — Hero (pan artesanal sobre tabla)
- `assets/images/productos-destacados.jpg` — Bandeja de madera con productos
- `assets/images/gallery-01.jpg` — Baguette francesa
- `assets/images/gallery-02.jpg` — Croissant de mantequilla
- `assets/images/gallery-03.jpg` — Torta de cumpleaños con velas
- `assets/images/gallery-04.jpg` — Trigo y masa madre
- `assets/images/gallery-05.jpg` — Vitrina de postres
- `assets/images/gallery-06.jpg` — Torta de boda
- `assets/images/obrador.jpg` — Horno de ladrillos y panes
- `assets/images/local.jpg` — Mesa de desayuno (café + croissant)
- `favicon.svg` — Corona de trigo con pan en colores de la paleta

## Estado
- [x] HTML estructurado multi-página (index, productos, galeria, contacto)
- [x] CSS mobile-first con paleta trigo/café, catálogo, galería y formularios
- [x] JS funcional: nav móvil, filtros, reveal, año dinámico, validación de formulario
- [x] 10 imágenes propias generadas (SVG flat-illustration → JPG con sharp)
- [x] JSON-LD `Bakery` en las 4 páginas + meta OG/Twitter completas
- [x] Responsive: 320px / 640px / 960px / 1200px+ y `prefers-reduced-motion`
- [x] Menú digital con 26 productos, precios realistas en COP y WhatsApp por producto
