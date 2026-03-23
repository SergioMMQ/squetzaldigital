#!/usr/bin/env python3
"""
Convierte un artículo en Markdown (con front matter YAML) a HTML completo.
También actualiza blog.html y sitemap-blog.xml automáticamente.

Uso: python build_article.py blog/_posts/mi-articulo.md
"""

import sys
import os
import re
import yaml
import markdown as md_lib
from datetime import datetime

MONTHS_ES = {
    1: 'enero', 2: 'febrero', 3: 'marzo', 4: 'abril',
    5: 'mayo', 6: 'junio', 7: 'julio', 8: 'agosto',
    9: 'septiembre', 10: 'octubre', 11: 'noviembre', 12: 'diciembre'
}

def slugify(text: str) -> str:
    text = text.lower()
    replacements = {'á':'a','à':'a','â':'a','ä':'a','é':'e','è':'e','ê':'e','ë':'e',
                    'í':'i','ì':'i','î':'i','ï':'i','ó':'o','ò':'o','ô':'o','ö':'o',
                    'ú':'u','ù':'u','û':'u','ü':'u','ñ':'n','ç':'c'}
    for src, dst in replacements.items():
        text = text.replace(src, dst)
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'[\s_]+', '-', text).strip('-')
    return re.sub(r'-+', '-', text)

def parse_md_file(filepath: str):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    if content.startswith('---'):
        parts = content.split('---', 2)
        if len(parts) >= 3:
            return yaml.safe_load(parts[1]) or {}, parts[2].strip()
    return {}, content.strip()

def date_to_iso(value) -> str:
    if isinstance(value, datetime):
        return value.strftime('%Y-%m-%d')
    return str(value)[:10]

def date_to_spanish(value) -> str:
    iso = date_to_iso(value)
    d = datetime.strptime(iso, '%Y-%m-%d')
    return f"{d.day} de {MONTHS_ES[d.month]}, {d.year}"

def build_html(fm: dict, body_html: str, slug: str) -> str:
    title       = fm.get('title', '')
    description = fm.get('description', '')
    keywords    = fm.get('keywords', '')
    date_iso    = date_to_iso(fm.get('date', datetime.today()))
    date_es     = date_to_spanish(fm.get('date', datetime.today()))
    category    = fm.get('category', 'General')
    read_time   = fm.get('readTime', '5 min')
    hero_img    = fm.get('heroImage', '/assets/desarrollodesoftware.png')
    hero_alt    = fm.get('heroAlt', title)
    url         = f"https://squetzaldigital.com/blog/articulos/{slug}.html"

    cta         = fm.get('cta') or {}
    cta_title   = cta.get('title', '¿Quieres implementar esto en tu empresa?')
    cta_desc    = cta.get('description', 'En S Quetzal Digital te ayudamos a digitalizar tu negocio desde el primer día.')

    return f"""<!DOCTYPE html>
<html lang="es">
<head>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-8HPM5944PH"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){{dataLayer.push(arguments);}}
    gtag('js', new Date());
    gtag('config', 'G-8HPM5944PH');
  </script>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5096102110661659" crossorigin="anonymous"></script>

  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <link rel="canonical" href="{url}"/>

  <title>{title} | S Quetzal Digital</title>
  <meta name="description" content="{description}">
  <meta name="keywords" content="{keywords}">

  <!-- Open Graph -->
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{description}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="{url}">
  <meta property="og:image" content="https://squetzaldigital.com/imagenes/logoquetzalcode.png">

  <link rel="icon" href="/imagenes/favicon.ico" type="image/x-icon"/>
  <link rel="stylesheet" href="style-articulo.css">

  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "{title}",
    "description": "{description}",
    "datePublished": "{date_iso}",
    "dateModified": "{date_iso}",
    "author": {{
      "@type": "Organization",
      "name": "S Quetzal Digital",
      "url": "https://squetzaldigital.com"
    }},
    "publisher": {{
      "@type": "Organization",
      "name": "S Quetzal Digital",
      "logo": {{
        "@type": "ImageObject",
        "url": "https://squetzaldigital.com/imagenes/logoquetzalcode.png"
      }}
    }},
    "url": "{url}",
    "image": "https://squetzaldigital.com/imagenes/logoquetzalcode.png"
  }}
  </script>
</head>

<body>

  <header>
    <a href="/"><img src="/imagenes/logoquetzalcode.png" alt="S Quetzal Digital" class="logo-header" width="2000" height="2000" decoding="async" fetchpriority="high"></a>
    <h1>{title}</h1>
    <p>{description}</p>
  </header>

  <nav>
    <a href="/blog/blog.html">⬅️ Volver al Blog</a>
  </nav>

  <main>
    <article>

      <div class="meta-author">
        <div>
          <span class="author-name">S Quetzal Digital</span>
          <div class="meta-info">
            <span>📅 {date_es}</span>
            <span>⏱️ {read_time} de lectura</span>
            <span class="article-tag">{category}</span>
          </div>
        </div>
      </div>

      <img src="{hero_img}" alt="{hero_alt}" class="article-hero" width="1024" height="1024" loading="lazy" decoding="async">

      {body_html}

      <div class="cta cta-servicios">
        <h3>{cta_title}</h3>
        <p>{cta_desc}</p>
        <div class="cta-links">
          <a href="/servicios/consultoria.html">🧠 Consultoría</a>
          <a href="/servicios/desarrollodesoftware.html">💻 Desarrollo de Software</a>
          <a href="/servicios/automatizacion.html">🤖 Automatización</a>
        </div>
      </div>

    </article>

    <div class="back-wrap">
      <a class="btn" href="/blog/blog.html">⬅️ Volver al Blog</a>
    </div>
  </main>

  <footer>
    © {datetime.today().year} S Quetzal Digital. Todos los derechos reservados.
  </footer>

</body>
</html>"""

def update_sitemap(sitemap_path: str, slug: str, date_iso: str):
    url = f"https://squetzaldigital.com/blog/articulos/{slug}.html"
    with open(sitemap_path, 'r', encoding='utf-8') as f:
        content = f.read()
    if url in content:
        return
    entry = f"""
  <url>
    <loc>{url}</loc>
    <lastmod>{date_iso}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
"""
    content = content.replace('</urlset>', entry + '</urlset>')
    with open(sitemap_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"  ✅ Sitemap actualizado")

def update_blog_html(blog_html_path: str, fm: dict, slug: str):
    title       = fm.get('title', '')
    description = fm.get('description', '')
    date_es     = date_to_spanish(fm.get('date', datetime.today()))
    category    = fm.get('category', 'General')
    read_time   = fm.get('readTime', '5 min')
    slug_url    = f"articulos/{slug}.html"
    full_url    = f"https://squetzaldigital.com/blog/articulos/{slug}.html"
    title_enc   = title.replace(' ', '%20')

    with open(blog_html_path, 'r', encoding='utf-8') as f:
        content = f.read()

    if slug_url in content:
        print(f"  ℹ️  Ya existe en blog.html")
        return

    card = f"""
          <!-- Auto: {slug} -->
          <article class="servicio" data-category="{category}">
            <h3>{title}</h3>
            <div class="article-meta">
              <span>📅 {date_es}</span>
              <span>👤 S Quetzal Digital</span>
              <span>⏱️ {read_time} de lectura</span>
              <span class="article-category">{category}</span>
            </div>
            <p>{description}</p>
            <div class="article-actions">
              <a href="{slug_url}" class="read-more">Leer más →</a>
              <div class="share-buttons">
                <a href="https://twitter.com/intent/tweet?url={full_url}&text={title_enc}" target="_blank" class="share-btn twitter" title="Compartir en Twitter">𝕏</a>
                <a href="https://www.facebook.com/sharer/sharer.php?u={full_url}" target="_blank" class="share-btn facebook" title="Compartir en Facebook">f</a>
                <a href="https://www.linkedin.com/sharing/share-offsite/?url={full_url}" target="_blank" class="share-btn linkedin" title="Compartir en LinkedIn">in</a>
                <a href="https://wa.me/?text=Mira%20este%20artículo:%20{title_enc}%20{full_url}" target="_blank" class="share-btn whatsapp" title="Compartir en WhatsApp">W</a>
              </div>
            </div>
          </article>
"""
    # Insertar al inicio de la lista de artículos
    marker = '<section id="entradas">\n        <h2>Todos los artículos</h2>\n        <div class="articulos">'
    if marker in content:
        content = content.replace(marker, marker + card, 1)
        with open(blog_html_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  ✅ blog.html actualizado")
    else:
        print(f"  ⚠️  No se pudo insertar en blog.html (marcador no encontrado)")

def main():
    if len(sys.argv) < 2:
        print("Uso: python build_article.py <archivo.md>")
        sys.exit(1)

    md_file = sys.argv[1]
    if not os.path.exists(md_file):
        print(f"❌ Archivo no encontrado: {md_file}")
        sys.exit(1)

    print(f"\n🔨 Procesando: {md_file}")

    # Parsear el markdown
    fm, body_md = parse_md_file(md_file)

    # Determinar slug
    slug = fm.get('slug') or slugify(fm.get('title', os.path.basename(md_file).replace('.md', '')))
    print(f"  Slug: {slug}")

    # Convertir markdown a HTML
    converter = md_lib.Markdown(extensions=['tables', 'fenced_code', 'attr_list'])
    body_html = converter.convert(body_md)

    # Generar HTML completo
    article_html = build_html(fm, body_html, slug)

    # Guardar artículo
    output_path = os.path.join('blog', 'articulos', f"{slug}.html")
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(article_html)
    print(f"  ✅ Artículo creado: {output_path}")

    date_iso = date_to_iso(fm.get('date', datetime.today()))

    # Actualizar sitemap
    sitemap = 'sitemap-blog.xml'
    if os.path.exists(sitemap):
        update_sitemap(sitemap, slug, date_iso)

    # Actualizar blog.html
    blog_html = os.path.join('blog', 'blog.html')
    if os.path.exists(blog_html):
        update_blog_html(blog_html, fm, slug)

    print(f"\n🎉 Listo. Artículo publicado en: /blog/articulos/{slug}.html\n")

if __name__ == '__main__':
    main()
