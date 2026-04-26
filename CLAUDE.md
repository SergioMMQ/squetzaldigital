# S Quetzal Digital — Guía de diseño

Sitio estático: HTML + CSS puro (sin frameworks). Fuente: Roboto (Google Fonts). Font Awesome para iconos.

## Colores

```css
/* Primarios */
--c-primary:      #0077ff   /* azul principal, CTAs */
--c-primary-2:    #2190eb
--c-primary-dark: #1e6db3

/* Acentos */
--c-accent:       #2dad5e   /* verde marca, hover de cards */
--c-accent-2:     #00ff22   /* verde neón, gradiente de títulos */

/* Texto */
--c-text:         #333333
--c-text-2:       #555555
--c-muted:        #666666

/* Fondos */
--bg-soft:        #f4f4f4
--bg-card:        #ffffff

/* Sombras */
--shadow-1: 0 4px 20px rgba(0,0,0,0.08)
--shadow-2: 0 4px 10px rgba(0,0,0,0.1)
```

**Gradientes usados en el sitio:**
- Nav/Footer: `linear-gradient(to right, #000000ed, #343534ed)`
- Títulos hero: `linear-gradient(to right, #00ff22, #00ff00)`
- Card hover: `linear-gradient(135deg, #6a11cb, #2575fc)`
- Flip card back: `linear-gradient(135deg, #1a1a1a, #2dad5e)`
- Promo sticky: `linear-gradient(135deg, #0077ff, #2dad5e)`

**Colores para secciones promocionales (banners):**
- Blog/oscuro: `linear-gradient(135deg, #1e3a5f, #0a192f)`
- Violeta/producto: `linear-gradient(135deg, #7c3aed, #4f46e5)`
- Verde/QR: `linear-gradient(135deg, #059669, #34d399)`

## Tipografía

- Familia: `'Roboto', sans-serif`
- `h1/h2`: 2rem, weight 600, uppercase, letter-spacing 1px
- `h3` en cards: 1.3rem, color `#2dad5e`
- Títulos hero (`.titulo-principal`): 2.5rem, weight 700, gradiente verde neón
- Subtítulos hero: 1rem, weight 700
- Texto body: line-height 1.6, color `#333`
- Texto secundario en fondos oscuros: `rgba(255,255,255,0.85)`

## Componentes

### `.servicio-card`
```css
height: 100px; padding: 1.5rem; border-radius: 12px;
box-shadow: 0 4px 20px rgba(0,0,0,0.08);
transition: transform 0.2s ease;
/* hover: translateY(-5px) + border 2px solid #2dad5e */
```
- `h3`: color `#2dad5e`, centrado
- `p`: color `#333`, line-height 1.5

### `.promo-banner` (banners promocionales)
Layout horizontal en desktop (texto izquierda, CTA derecha), vertical en móvil.
- Badge superior: `background: rgba(255,255,255,0.2)`, texto uppercase 0.7rem
- Título: 1.25rem, weight 800, color blanco
- Bullets: lista con `::before { content: "✓" }`, texto `rgba(255,255,255,0.9)`
- CTA: `background: #fff`, color del gradiente del banner, border-radius 10px
- Botón cerrar (X): `position: absolute; top:14px; right:16px`, circular 28px
- Clase `.hidden` → `display: none`

### Sección de servicios (grid)
```css
display: grid;
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
gap: 2rem; max-width: 1200px; margin: auto;
```

### Nav
- Fixed, height 70px, fondo gradiente oscuro
- Links: blancos, bold, sin subrayado
- Link activo: color `#aef8ae` + border-bottom verde

### Footer
- Fondo: `linear-gradient(to right, #000000ed, #272727ed)`
- Texto: blanco, links color `#aaa`

## Espaciado

- Secciones: `padding: 60px 24px` (desktop) / `24px 20px` (móvil)
- Cards grid: `gap: 2rem`
- Banners apilados: `margin-bottom: 16px`
- Contenedor máximo general: `max-width: 1200px; margin: auto`
- Contenedor banners: `max-width: 900px`

## Breakpoints

```css
@media (max-width: 768px)  /* menú hamburguesa, carousel columna */
@media (max-width: 700px)  /* header vertical, ajustes generales */
@media (max-width: 640px)  /* banners: layout vertical, CTA full-width */
@media (max-width: 480px)  /* promo sticky: columna centrada */
```

## Animaciones

```css
@keyframes fadeIn { 0%{opacity:0; transform:translateY(20px)} 100%{opacity:1; transform:translateY(0)} }
@keyframes borderRotation { /* logo animado */ }
```
- Transiciones estándar: `0.2s–0.3s ease`
- Hover cards: `transform: translateY(-5px)`
- Hover CTA buttons: `transform: scale(1.03)`

## Reglas de diseño

- Siempre usar las variables CSS de `:root` en lugar de colores hardcodeados.
- Nuevas secciones: fondo alternado entre `#fff` y `#f8f9fb` / `#f4f4f4`.
- CTAs primarios: fondo `#0077ff` o gradiente violeta `#7c3aed→#4f46e5`.
- CTAs secundarios sobre fondo oscuro: `background: #fff` + color del contexto.
- `border-radius` estándar: 8px (botones pequeños), 12px (cards), 16px (banners), 20px (pills/badges).
- Sombras: usar `--shadow-1` para cards, `--shadow-2` para modales y elementos flotantes.
- Íconos: Font Awesome (`fab`, `fas`). Emojis permitidos en títulos de cards.
- No usar frameworks CSS externos. Todo en `style.css` o inline en `<style>` dentro de la sección.
- Código inline (`<style>` en sección) solo si el componente es auto-contenido o temporal.

## Estructura de páginas

```
index.html          → página principal
servicios/*.html    → páginas de servicio
blog/blog.html      → listado de artículos
blog/articulos/*.html → artículos individuales
pagina-web-gratis.html → landing page
sobre-nosotros.html
politica-de-privacidad.html
terminos-y-condiciones.html
```
