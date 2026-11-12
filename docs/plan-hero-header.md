# Plan: Hero y header — cambios solicitados (2026-11-12)

## Objetivo
1. Frase principal del hero: "Tu presencia digital, administrada por los mejores".
2. Al final del desplazamiento del hero, aparece un enlace pequeño "Descubre por qué" → `/comparativas/`, conservando los botones existentes y "Diagnóstico gratis".
3. En el header, centrado entre el ícono de Presentto y el botón hamburguesa (móvil), la palabra "whatsapp" en minúsculas, sutil, enlazando a `https://wa.me/573236487336`.

## Implementación
- `src/pages/index.astro`: `sr-only` y palabras del tail actualizadas; se añade `<a class="home-hero-discover" data-home-discover>` dentro de `.home-hero-actions`.
- `src/scripts/motion/home-hero.ts`: se consulta, valida y anima `discover` (autoAlpha 0 → 1 en progreso 0.86); fallback sin motion visible.
- `src/components/Header.astro`: se añade `<a class="header-wa">whatsapp</a>` entre la marca y el nav.
- `src/styles/layout.css`: `.header-wa` absoluto centrado, visible solo en móvil (≤719px); `.nav-wrap` pasa a `position: relative`.
- `src/styles/components.css`: estilos de `.home-hero-discover`.

## Verificación
- `npm run check` → 0 errores.
- `npm run build` → OK.
- `npm run qa` → sin errores.
- `npm run seo:check` → 0 errores.
- Revisar en móvil: header muestra "whatsapp" centrado y enlaza al número.
- Revisar hero: frase nueva y enlace "Descubre por qué" aparece al final del scroll.

## Pendiente
- Ajustar el peso visual de "whatsapp" si se desea más/menos prominencia (clase `.header-wa`).
- Si se quiere el enlace también en desktop, quitar el `@media (max-width: 719px)` del CSS.
