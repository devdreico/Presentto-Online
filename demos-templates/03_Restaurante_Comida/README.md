# TEMPLATE 03 — Restaurante / Comida

## Ghost Business
- **Nombre:** Sabor Casero Mosquera
- **Tipo:** Restaurante de comida tradicional colombiana
- **Ubicación:** Cra 5 #10-42, Mosquera, Cundinamarca
- **Teléfono:** 312 345 6789
- **WhatsApp:** 3123456789
- **Eslogan:** "El sabor de la tradición en cada plato"
- **Horario:** Lun-Sáb 11am-10pm, Dom 12pm-8pm

## Identidad Visual
- **Estilo:** Floating 3D + Cálido + Glassmorphism crema
- **Animación Firma:** Platos flotan con paralaje 3D en scroll (`translateY` + `rotateY` + `translateZ` con perspectiva), menú aparece flotando desde abajo
- **Paleta:** Rojo tomate (`#e53935`), Crema (`#fff8f0`), Marrón tierra (`#5d4037`), Verde oliva (`#558b2f`), Dorado (`#ffd54f`)
- **Tipografía:** Abril Fatface (títulos display), Playfair Display (subtítulos itálicos), Nunito (cuerpo)
- **Sensación:** Cálido, acogedor, artesanal, apetitoso, tradicional

## Páginas
- `index.html` — Hero con platos flotando 3D + parallax, about con contadores, 3 platos estrella con cards, testimonios, CTA
- `menu.html` — Menú digital completo con 5 categorías (Entradas, Platos fuertes, Parrilla, Postres, Bebidas), items con precio y botón WhatsApp. Item destacado "Bandeja Paisa ⭐"
- `galeria.html` — Galería con filtros (Todos / Platos / Local / Postres), 9 imágenes reales
- `contacto.html` — 4 tarjetas glass (dirección, horarios, teléfono, email) + formulario → WhatsApp + mapa embebido

## Animaciones
- **Floating 3D Parallax** — Platos flotan en el hero con transform 3D (`rotateY` + `translateZ`) y se mueven con el scroll a diferentes velocidades (`data-speed`)
- **FloatIn Menu** — Items del menú aparecen flotando desde abajo con delay secuencial, activados por IntersectionObserver
- **Contadores animados** — Años, platos y clientes suben desde 0
- **Dish card hover** — Imagen se escala, card se eleva con sombra
- **FadeInUp** — Cards aparecen secuencialmente

## Assets
- `assets/images/hero-restaurante.jpg` — Hero principal
- `assets/images/plato-bandeja.jpg` — Bandeja Paisa
- `assets/images/plato-ajiaco.jpg` — Ajiaco Santafereño
- `assets/images/plato-parrilla.jpg` — Parrilla Familiar
- `assets/images/plato-mazorca.jpg` — Mazorcada
- `assets/images/postre.jpg` — Tres Leches
- `assets/images/local-restaurante.jpg` — Interior del restaurante
- `assets/images/gallery/gallery-01.jpg` a 06 — Galería adicional

## Estado
- [x] HTML estructurado multi-página (index, menu, galeria, contacto)
- [x] CSS mobile-first con glassmorphism, Floating 3D parallax, menú digital
- [x] JS funcional: nav, floating parallax, filtros, contadores, formulario
- [x] Imágenes reales de Pexels (7 principales + 6 galería)
- [x] Responsive: 320px / 768px / 1024px+
- [x] Animación 3D firma: Floating Menu 3D con parallax y perspectiva
- [x] Menú digital con 5 categorías y precios realistas
