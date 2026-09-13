# PLAN DE ASEGURAMIENTO — Desarrollo de los 10 Templates PRESENTTO

> **Propósito:** Garantizar que los 10 templates se desarrollen con calidad consistente, cumplan estándares técnicos y puedan personalizarse rápido para cada cliente. Este plan define reglas, procesos, herramientas y controles de calidad.

---

## PARTE 1: ESTÁNDARES TÉCNICOS OBLIGATORIOS

### 1.1 Stack tecnológico (INAMOVIBLE)

| Capa | Tecnología | Prohibido |
|------|-----------|-----------|
| HTML | HTML5 semántico | Tablas de layout, etiquetas obsoletas |
| CSS | CSS3 vanilla + Variables | SCSS, Less, Tailwind, Bootstrap |
| JS | JavaScript vanilla ES6+ | jQuery, React, Vue, Alpine |
| Fuentes | Google Fonts (CDN) | Font Awesome (usar SVG inline) |
| Iconos | SVG inline | Icon fonts, PNG para iconos |
| Imágenes | WebP (cuando sea posible) | No usar imágenes sin optimizar |
| Hosting | Netlify / Vercel / Servidor propio | Hostings que no soporten HTML estático |

### 1.2 Estructura de carpeta OBLIGATORIA por template

```
0X_NOMBRE_TEMPLATE/
├── index.html              # Plantilla principal (UNA página)
├── styles.css              # CSS completo del template
├── script.js               # JS mínimo del template
└── assets/
    ├── logo.svg            # Logo del ghost business (inline SVG o archivo)
    └── placeholder.webp    # Imagen placeholder del ghost business
```

**REGLAS:**
- Siempre un SOLO `index.html` (single page). Sin páginas internas.
- Siempre un SOLO `styles.css`. Sin imports a otros CSS.
- Siempre un SOLO `script.js`. Todo el JS ahí.
- Sin carpetas anidadas innecesarias dentro de `assets/`.

### 1.3 Formato del index.html

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>[Negocio] — [Municipio] | [Eslogan corto]</title>
  <meta name="description" content="[Descripción SEO del negocio]" />
  <meta name="keywords" content="[palabras clave del negocio]" />
  <!-- Open Graph -->
  <meta property="og:title" content="[Negocio] — [Municipio]" />
  <meta property="og:description" content="[Descripción corta]" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://[negocio].presentto.co" />
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=...[peso]&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <!-- TODO el contenido -->
  <script src="script.js"></script>
</body>
</html>
```

### 1.4 Formato del styles.css

```css
/* ============================================
   PRESENTTO — [Nombre del Template] v1.0
   [Ghost Business] — [Municipio]
   ============================================ */

/* -- VARIABLES DE PERSONALIZACIÓN -- */
:root {
  --color-primary: #hex;
  --color-secondary: #hex;
  --color-bg: #hex;
  --color-bg-alt: #hex;
  --color-text: #hex;
  --color-text-light: #hex;
  --font-heading: 'Font', sans-serif;
  --font-body: 'Font', sans-serif;
  --whatsapp: '57XXXXXXXXXX';
  --radius: 12px;
}

/* -- RESET -- */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; scroll-padding-top: 68px; }
body { ... }

/* -- COMPONENTES REUTILIZABLES -- */
/* Header, Hero, Cards, Grid, Contacto, Footer, WhatsApp Float */

/* -- SECCIONES EN ORDEN (como aparecen en el HTML) -- */

/* -- ANIMACIONES 3D -- */
/* [Nombre de la animación firma] */

/* -- MEDIA QUERIES -- */
/* Mobile-first: estilos base son mobile, media queries para tablet/desktop */

/* -- PREFERS-REDUCED-MOTION -- */
@media (prefers-reduced-motion: reduce) { ... }
```

### 1.5 Variables CSS: el sistema de personalización

Cada template DEBE tener estas 10 variables exactas en `:root`:

```css
:root {
  --color-primary: #HEX;        /* Color principal (botones, acentos) */
  --color-secondary: #HEX;      /* Color secundario (hover, detalles) */
  --color-bg: #HEX;             /* Fondo principal */
  --color-bg-alt: #HEX;         /* Fondo alterno (secciones grises) */
  --color-text: #HEX;           /* Texto principal */
  --color-text-light: #HEX;     /* Texto secundario */
  --font-heading: 'Font';       /* Tipografía de títulos */
  --font-body: 'Font';          /* Tipografía de cuerpo */
  --whatsapp: '57XXXXXXXXXX';   /* Número WhatsApp sin + */
  --radius: 12px;               /* Border radius general */
}
```

**Beneficio:** Para personalizar el template a cualquier cliente, solo se editan estas 10 líneas. El resto del CSS se adapta automáticamente.

---

## PARTE 2: PROCESO DE DESARROLLO

### 2.1 Flujo de creación de CADA template

```
PASO 1 — PLANIFICAR (15 min)
  ├── Leer README.md del template (ghost business, colores, animaciones)
  ├── Definir qué secciones tendrá exactamente
  └── Bosquejar layout en papel/mental

PASO 2 — ESTRUCTURAR (30 min)
  ├── Crear index.html con todas las secciones en orden
  ├── Usar comentarios <!-- ===== SECCIÓN ===== --> para separar
  ├── Poner todos los datos del ghost business
  └── NO preocuparse por estilos aún

PASO 3 — ESTILIZAR (1-2 horas)
  ├── Escribir styles.css desde cero (nunca copiar de otro template)
  ├── Variables personalizadas (línea 8-17)
  ├── Reset + layout básico
  ├── Sección por sección en orden del HTML
  ├── Media queries (mobile → tablet → desktop)
  └── Animación 3D FIRMA del template

PASO 4 — PROGRAMAR (30 min)
  ├── Escribir script.js desde cero (nunca copiar de otro template)
  ├── Menú hamburguesa (responsivo)
  ├── Animación firma (intersección, mouse tracking, partículas, etc.)
  └── Funcionalidades extra del template

PASO 5 — VALIDAR (15 min)
  ├── Abrir en navegador (resize 320px, 768px, 1024px)
  ├── Probar todas las animaciones
  ├── Probar enlace WhatsApp
  ├── Verificar consola (0 errores)
  └── Leer el HTML completo (sin textos placeholder genéricos)

PASO 6 — DOCUMENTAR (5 min)
  ├── Marcar README.md como completado
  └── Actualizar 00_Plan_Visual_10_Templates.md con estado
```

**Tiempo estimado por template:** 3-4 horas en total.

### 2.2 Orden de desarrollo (por fases)

```
SEMANA 1 (Días 1-3) → FASE PRIORIDAD 1
  [ ] Template 02 — Peluquería/Barbería (glassmorphism + neón)
  [ ] Template 03 — Restaurante/Comida (floating 3D + parallax)
  [ ] Refactor Template 01 — Tienda (aplicar estándares + mejorar animaciones)

SEMANA 1 (Días 4-5) → FASE PRIORIDAD 2
  [ ] Template 04 — Taller Mecánico (isométrico + gear)
  [ ] Template 05 — Clínica/Consultorio (blob morphing)
  [ ] Template 06 — Profesional/Portafolio (perspective scroll)

SEMANA 2 (Días 1-3) → FASE PRIORIDAD 3
  [ ] Template 07 — Ferretería/Construcción (masonry 3D)
  [ ] Template 08 — Agropecuario/Veterinaria (particles + wave)
  [ ] Template 09 — Panadería/Pastelería (floating + glow)
  [ ] Template 10 — Salud/Belleza/Bienestar (zen particles)

SEMANA 2 (Días 4-5) → FASE VALIDACIÓN + DEMOS
  [ ] Subir cada template a subdominio demo
  [ ] Pruebas cross-browser (Chrome, Firefox, Safari, Edge)
  [ ] Pruebas mobile real (Android + iOS)
  [ ] Medir Lighthouse (todos > 90)
  [ ] Correcciones finales
```

### 2.3 Checklist de pre-lanzamiento por template

```
Antes de marcar un template como COMPLETO, verificar:

[ ] HTML válido (W3C validator — sin errores)
[ ] CSS sin errores (sin propiedades inválidas)
[ ] JS sin errores (consola del navegador limpia)
[ ] Mobile-first (se ve bien en 320px)
[ ] Tablet responsive (se ve bien en 768px)
[ ] Desktop responsive (se ve bien en 1024px+)
[ ] Variables CSS completas y funcionales
[ ] Animación 3D firma funcionando
[ ] WhatsApp flotante funcional (enlace correcto)
[ ] Enlace a PRESENTTO en el footer
[ ] Meta tags SEO presentes (title, description, og)
[ ] Google Fonts cargando correctamente
[ ] Sin dependencias externas (ni CDNs raras)
[ ] Lighthouse Performance > 90
[ ] Lighthouse Accessibility > 85
[ ] Lighthouse SEO > 90
[ ] prefers-reduced-motion implementado
[ ] README.md actualizado con estado "Completado"
```

---

## PARTE 3: CONTROL DE CALIDAD — PRUEBAS

### 3.1 Pruebas de funcionalidad

| Prueba | Método | Frecuencia |
|--------|--------|------------|
| Enlace WhatsApp | Clickear y verificar que abre WhatsApp con mensaje predefinido | Cada template |
| Menú hamburguesa | Abrir en 320px, tocar menú, verificar que se abre/cierra | Cada template |
| Animaciones | Verificar que todas corren a 60fps (Chrome DevTools → Performance) | Cada template |
| Scroll reveal | Scrollear y verificar que elementos aparecen suavemente | Cada template |
| Formulario (si aplica) | Enviar formulario vacío y lleno | Solo si incluye form |

### 3.2 Pruebas de rendimiento

| Métrica | Objetivo | Herramienta |
|---------|----------|-------------|
| Tiempo de carga | < 2 segundos | Lighthouse, Network tab |
| Tamaño total | < 500KB (sin imágenes) | DevTools → Network |
| FPS animaciones | 60fps estables | DevTools → Performance |
| Core Web Vitals | CLS < 0.1, LCP < 2.5s | Lighthouse |
| Sin render blocking | Google Fonts con display=swap | Lighthouse |

### 3.3 Pruebas de accesibilidad

| Prueba | Estándar |
|--------|----------|
| Contraste de color | WCAG AA mínimo (ratio 4.5:1 texto normal) |
| Navegación por teclado | Tab funciona para todos los elementos interactivos |
| aria-labels | Todos los iconos y botones sin texto tienen aria-label |
| Jerarquía headings | h1 → h2 → h3 en orden sin saltos |
| Alt text | Todas las imágenes tienen atributo alt |
| prefers-reduced-motion | Las animaciones se desactivan si el usuario lo prefiere |

---

## PARTE 4: GESTIÓN DE VERSIONES Y DOCUMENTACIÓN

### 4.1 Sistema de versiones en README.md

Cada README.md debe tener al final:

```markdown
## Versiones
| Versión | Fecha | Cambios |
|---------|-------|---------|
| v1.0 | 2026-06-XX | Creación inicial del template |
| v1.1 | 2026-06-XX | Correcciones post-lanzamiento |

## Estado
✅ COMPLETADO — [Fecha]
```

### 4.2 Bitácora de desarrollo en PRESENTTO-HISTORIAL.md

Cada vez que se completa un template, se registra:

```markdown
## 2026-06-XX — Template 0X completado: [Nombre]
**Ghost Business:** [Nombre del ghost]
**Archivos:** index.html, styles.css, script.js
**Animación firma:** [Nombre]
**Tiempo de desarrollo:** [X] horas
**Incidencias:** [Ninguna / Problemas encontrados y soluciones]
```

### 4.3 Reglas de nomenclatura

| Elemento | Regla | Ejemplo |
|----------|-------|---------|
| Nombres de archivo | snake_case | `styles.css`, `script.js` |
| Clases CSS | BEM (bloque__elemento--modificador) | `card__title--large` |
| IDs | camelCase | `#navToggle` |
| Variables JS | camelCase | `const navToggle` |
| Constantes | UPPER_SNAKE_CASE | `const WHATSAPP_NUMBER` |
| Variables CSS | kebab-case | `--color-primary` |
| Media queries | Mobile-first | `min-width: 640px` |

---

## PARTE 5: DESPLIEGUE Y PUESTA EN PRODUCCIÓN

### 5.1 Flujo de despliegue para cliente real

```
1. Template listo en /Templates - Sitios de Clientes/0X_NOMBRE/
2. Cliente paga → copiar carpeta a nueva carpeta con nombre del cliente
3. Personalizar:
   - variables CSS (colores si aplica)
   - textos en index.html
   - fotos reales del negocio
   - número WhatsApp del cliente
4. Probar en local
5. Subir a Netlify/Vercel:
   - Arrastrar carpeta
   - Configurar subdominio: cliente.presentto.co
6. Compartir enlace al cliente
7. Si cliente renueva → mantener online
8. Si cliente no renueva → desactivar subdominio
```

### 5.2 Configuración de subdominios

Todos los clientes se entregan bajo `*.presentto.co`.

```
Formato: nombre-del-negocio.presentto.co
Ejemplo: mundo-hogar-funza.presentto.co
```

**Reglas:**
- Sin espacios en el subdominio (guiones medios)
- Sin caracteres especiales (ñ, tildes → reemplazar)
- Todo en minúsculas

---

## PARTE 6: PREGUNTAS DE ESPECIFICACIÓN PARA ANDREY

> Antes de arrancar el desarrollo masivo de los 10 templates, necesito que me respondas estas preguntas para alinear expectativas:

### Pregunta 1 — Imágenes
**¿De dónde sacamos las imágenes placeholder de los ghost businesses?**
- Opción A: Generamos imágenes con IA/placeholders de color (gradientes como ya hicimos)
- Opción B: Buscamos fotos libres (Unsplash, Pexels) de negocios reales similares
- Opción C: Tú me pasas imágenes de referencia

### Pregunta 2 — Número de páginas
**¿Cada template debe ser UNA sola página o pueden tener páginas internas?**
- Ejemplo: El restaurante podría tener "index.html" + "menu.html" + "contacto.html"
- O todo en una sola página con anclas (#menu, #contacto)

### Pregunta 3 — Formularios
**¿Los templates deben incluir formulario de contacto funcional?**
- Si es sí: ¿a dónde se envía? (Google Forms, email, WhatsApp API, etc.)
- ¿O solo enlace a WhatsApp?

### Pregunta 4 — Presupuesto de animaciones
**¿Qué tan intensas deben ser las animaciones en móvil?**
- Opción A: Animaciones completas en todos los dispositivos (puede afectar batería)
- Opción B: Animaciones completas en desktop, simplificadas en móvil
- Opción C: Animaciones sutiles en todos (seguro, menos impacto)

### Pregunta 5 — Google Fonts
**¿Podemos usar hasta 2 Google Fonts por template?**
- Cada template usa fuentes diferentes (según el plan visual)
- ¿Autorizas el uso de Google Fonts CDN sin restricción?

### Pregunta 6 — Logos
**Los logos de los ghost businesses:**
- Opción A: Los creo con SVG inline (texto estilizado, sin imagen)
- Opción B: Tú me proporcionas logos
- Opción C: Usamos solo texto con tipografía (sin logo)

### Pregunta 7 — Demo pública
**¿Los templates completados se suben a subdominios públicos visibles?**
- Para mostrarlos como portafolio de PRESENTTO
- ¿O solo se suben cuando hay un cliente real?

### Pregunta 8 — Colores personalizables
**Además de las variables CSS, ¿necesitamos un "theme switcher" visual?**
- O es suficiente con editar el CSS manualmente para cada cliente

### Pregunta 9 — ¿Buscamos que se vean diferentes entre si o igual de buenos?
Esto ya lo tengo claro: cada template debe verse COMPLETAMENTE DIFERENTE. No debe parecer que vienen de la misma "fábrica de templates". Confirmo que esa es la dirección correcta.

### Pregunta 10 — Prioridad de ghosts para demos reales
**¿Quieres que algún ghost business en particular lo desarrollemos primero para usarlo como demo real?**
- Por ejemplo: si conoces a alguien de Funza que tenga una tienda o taller, podemos priorizar ese template

---

## PARTE 7: ENTREGABLES DEL PLAN

### 7.1 Documentos creados (en Templates - Sitios de Clientes/)

| Archivo | Propósito |
|---------|-----------|
| `00_Plan_Implementacion_10_Templates.md` | Plan inicial de implementación |
| `00_Plan_Visual_10_Templates.md` | Plan visual con animaciones 3D y ghost businesses |
| **`00_Plan_Aseguramiento_Desarrollo.md`** | **← ESTE ARCHIVO (estándares + calidad)** |
| `01_Tienda_Comercio/README.md` | Identidad del template 01 |
| `02_Peluqueria_Barberia/README.md` | Identidad del template 02 |
| `03_Restaurante_Comida/README.md` | Identidad del template 03 |
| `04_Taller_Mecanico/README.md` | Identidad del template 04 |
| `05_Clinica_Consultorio/README.md` | Identidad del template 05 |
| `06_Profesional_Portafolio/README.md` | Identidad del template 06 |
| `07_Ferreteria_Construccion/README.md` | Identidad del template 07 |
| `08_Agropecuario_Veterinaria/README.md` | Identidad del template 08 |
| `09_Panaderia_Pasteleria/README.md` | Identidad del template 09 |
| `10_Salud_Belleza_Bienestar/README.md` | Identidad del template 10 |

### 7.2 Plantillas funcionales ya creadas

| Template | Estado |
|----------|--------|
| 01_Tienda_Comercio | ✅ v1 simple (requiere refactor a estándares) |
| 02-10 | 📝 Plan teórico listo, código pendiente |

---

## ANEXO A: REFERENCIA RÁPIDA DE ANIMACIONES CSS 3D

```css
/* Efecto 3D Card Flip */
.card { perspective: 800px; }
.card__inner { transition: transform 0.6s; transform-style: preserve-3d; }
.card:hover .card__inner { transform: rotateY(180deg); }
.card__front, .card__back { backface-visibility: hidden; }
.card__back { transform: rotateY(180deg); }

/* Efecto 3D Tilt (con JS) */
.card { transform: perspective(600px) rotateX(var(--rx)) rotateY(var(--ry)); }

/* Efecto Paralaje 3D */
.parallax-layer { transform: translateZ(var(--z)) scale(var(--s)); }
.parallax-container { perspective: 1px; overflow-x: hidden; overflow-y: auto; }

/* Efecto Glassmorphism */
.glass { background: rgba(255,255,255,0.1); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.15); }

/* Efecto Isométrico */
.isometric { transform: rotateX(30deg) rotateZ(-30deg); transform-style: preserve-3d; }

/* Efecto Floating */
.floating { animation: float 3s ease-in-out infinite; }
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

/* Efecto Blob Morphing */
.blob { animation: morph 8s ease-in-out infinite; }
@keyframes morph {
  0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
}
```

---

## ANEXO B: REFERENCIA DE MEDIA QUERIES

```css
/* Móvil estrecho (320px-480px) — BASE (sin media query) */
/* Móvil grande / phablet (481px-639px) — ajustes menores */
@media (min-width: 481px) { }

/* Tablet (640px-1023px) — grid de 2 columnas, header horizontal */
@media (min-width: 640px) { }

/* Desktop (1024px+) — layout completo */
@media (min-width: 1024px) { }

/* Pantallas grandes (1400px+) — márgenes más amplios */
@media (min-width: 1400px) { }
```

---

*Plan creado por Presentto Op (COA) — 8 de Junio de 2026*
*Próxima acción: Esperar respuestas de Andrey a las preguntas de especificación (Parte 6)*
