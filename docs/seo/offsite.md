# SEO off-site — checklist manual

El sitio solo cubre SEO on-site + agentes. El off-site es **manual**: se ejecuta fuera del repositorio
y se registra aquí. Nada de esto lo hacen los sub-agentes (no hay autoridad sin acciones reales).

## 1. Google Business Profile (prioridad 1)

- [ ] Crear/verificar la ficha de **Presentto** (verificación por correo a la dirección real).
- [ ] Completar al 100 %: nombre, categoría principal (*Servicios de marketing digital* o la equivalente exacta), 
      segunda categoría, descripción con keyword natural, servicios listados, horario, logotipo, 5+ fotos reales.
- [ ] Zonas de servicio: Funza, Mosquera, Madrid, Facatativá, Bogotá (sin exponer dirección si es home office).
- [ ] Publicar 1 post/mes (oferta o guía con enlace a `/guias/` o `/precios/`).
- [ ] Responder **todas** las reseñas en < 48 h.
- [ ] Al terminar: copiar la URL pública de la ficha y ponerla en `business.gbpUrl` (y `address` con el NAP
      exacto tal como lo muestra Google) → `npm run seo:check` deja de dar el aviso.

## 2. Citas y directorios (prioridad 2)

Mismo NAP en todos lados (nombre, dirección, teléfono idénticos a la ficha de Google).

- [ ] Directorios colombianos de negocios y agencias (páginas amarillas, cámaras de comercio, gremios).
- [ ] Perfiles de marca: LinkedIn, Instagram, Facebook, Behance/Dribbble si hay portafolio.
- [ ] Directorios de software/SEO (Clutch, Sortlist, AiiA, DesignRush) solo si aplican a los servicios.
- [ ] Registrar dominios relacionados (`presentto.funza` no aplica; sí apuntar DNS www → hosting).
- [ ] Controlar duplicados: una sola fuente de verdad del NAP → `src/data/business.ts`.

## 3. Contenido de autoridad y backlinks (prioridad 3)

- [ ] **1 link de autoridad**: artículo/guía en un medio o blog de confianza (marketing digital, emprendimiento
      en LATAM, prensa local de Cundinamarca) con enlace a `/guias/seo-local/` o a la página de precio.
- [ ] Guest posts: 1/mes, siempre aportando datos propios (ej.: rango de precios de web en Colombia 2026).
- [ ] Participar en directorios de casos: compartir el sitio en comunidades (Reddit r/SEO, foros de marketing)
      sin spam — aportar respuesta concreta y enlace solo si suma.
- [ ] Menciones sin link: pedir a clientes con ficha de Google que mencionen la web (señal de marca).

## 4. Señales locales (prioridad 4)

- [ ] Patrocinio/actividad local (evento, colegio, gremio) con mención en su web.
- [ ] Aparecer en el directorio de la Cámara de Comercio correspondiente.
- [ ] Colaboraciones con agencias complementarias (diseño, fotografía) con enlaces cruzados.

## Registro

| Fecha | Acción | URL publicada | Anchor | Estado |
| --- | --- | --- | --- | --- |
| | | | | |

Reglas: sin PBNs, sin compra de enlaces baratos, sin texto ancla exacto repetido en exceso.
Un link real de calidad > 50 directorios basura. Al añadir cada link, medir en GSC (`npm run seo:gsc`)
si suben las queries no-brand de la página destino.
