# ZentraTek Landing Page

Landing page moderna y profesional para ZentraTek - Automatización, IA y Cloud para Pymes en Colombia.

## 🚀 Características

- **Diseño Moderno**: UI limpia y profesional con Tailwind CSS
- **Responsive**: Optimizado para todos los dispositivos (mobile-first)
- **Performance**: Lighthouse score 90+ objetivo
- **SEO Optimizado**: Meta tags completos, Schema.org markup
- **Accesible**: WCAG AA compliance
- **Animaciones**: Scroll animations con Intersection Observer
- **Formulario de Contacto**: Validación y UX mejorada

## 📋 Stack Tecnológico

- HTML5 semántico
- Tailwind CSS 3
- JavaScript Vanilla (ES6+)
- Lucide Icons
- PostCSS + Autoprefixer

## 🛠️ Instalación

### Prerrequisitos

- Node.js 16+ y npm

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/zentratek-landing-page.git
   cd zentratek-landing-page
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   - Abre `index.html` directamente en tu navegador
   - O usa un servidor local como Live Server (VS Code extension)

5. **Probar el build localmente (opcional)**
   ```bash
   npm run build  # Construye el proyecto
   npm start      # Sirve desde /dist en http://localhost:8080
   ```

## 📦 Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia servidor HTTP para servir archivos estáticos desde `/dist` (puerto 8080 por defecto) |
| `npm run dev` | Inicia Tailwind en modo watch para desarrollo |
| `npm run build` | Construye para producción (minifica CSS y copia archivos a `/dist`) |

## 🌐 Despliegue en DigitalOcean App Platform

### Opción 1: Desde GitHub (Recomendado)

1. **Sube el código a GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/zentratek-landing-page.git
   git push -u origin main
   ```

2. **Crea una App en DigitalOcean**
   - Ve a [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)
   - Click en "Create App"
   - Conecta tu repositorio de GitHub
   - Selecciona el repo `zentratek-landing-page`

3. **Configura el Build**
   - **Resource Type**: Web Service
   - **Branch**: `main`
   - **Build Command**: `npm run build`
   - **Run Command**: `npm start` (DigitalOcean lo detecta automáticamente)
   - DigitalOcean asignará automáticamente el puerto via variable `$PORT`

4. **Configura el Plan**
   - Selecciona "Basic" (el plan más económico)
   - Para sitios con bajo tráfico, el costo es mínimo

5. **Deploy**
   - Click "Next" y luego "Create Resources"
   - DigitalOcean construirá y desplegará automáticamente
   - El proceso toma unos 2-3 minutos

6. **Dominio Personalizado (Opcional)**
   - En la página de tu App, ve a "Settings" > "Domains"
   - Añade tu dominio personalizado (ej: `zentratek.com`)

### Opción 2: Desde DigitalOcean CLI

```bash
# Instalar doctl (DigitalOcean CLI)
brew install doctl  # macOS
# o seguir instrucciones en: https://docs.digitalocean.com/reference/doctl/how-to/install/

# Autenticar
doctl auth init

# Crear app desde spec file (crear app.yaml primero)
doctl apps create --spec app.yaml
```

Ejemplo de `app.yaml`:
```yaml
name: zentratek-landing
region: nyc
static_sites:
- name: web
  github:
    repo: tu-usuario/zentratek-landing-page
    branch: main
  build_command: npm run build
  output_dir: dist
```

## 🔄 Auto-Deploy

DigitalOcean App Platform se auto-desplegará cada vez que hagas push a la rama `main`:

```bash
git add .
git commit -m "Update content"
git push origin main
# DigitalOcean detectará el push y redesplegará automáticamente
```

## 📁 Estructura del Proyecto

```
zentratek-landing-page/
├── assets/
│   ├── css/
│   │   └── input.css          # Tailwind source
│   ├── js/
│   │   └── main.js            # JavaScript interactivo
│   └── images/                # Imágenes del sitio
├── dist/                      # Build output (generado)
│   ├── assets/
│   │   ├── css/
│   │   │   └── tailwind.css   # CSS compilado y minificado
│   │   ├── js/
│   │   └── images/
│   └── index.html
├── index.html                 # Página principal
├── package.json              # Dependencias y scripts
├── tailwind.config.js        # Configuración de Tailwind
├── postcss.config.js         # Configuración de PostCSS
├── .gitignore
├── README.md
└── CLAUDE.md                 # Guía para Claude Code
```

## 🎨 Personalización

### Colores

Los colores de marca están definidos en `tailwind.config.js`:

```js
colors: {
  primary: '#0066FF',    // Azul tecnológico
  secondary: '#00D9B1',  // Verde menta (zen)
  accent: '#FF9500',     // Naranja (CTAs)
}
```

### Contenido

Edita `index.html` para actualizar:
- Textos de servicios
- Testimonios
- Información de contacto
- Links de redes sociales

### Estilos Custom

Añade estilos personalizados en `assets/css/input.css`:

```css
@layer components {
  .mi-clase-custom {
    @apply px-4 py-2 bg-primary-500;
  }
}
```

## 🖼️ Añadiendo Imágenes

1. **Añade imágenes a** `/assets/images/`

2. **Actualiza el HTML**:
   ```html
   <img src="/assets/images/logo.svg" alt="Logo ZentraTek">
   ```

3. **Para lazy loading**:
   ```html
   <img data-src="/assets/images/hero.jpg"
        alt="Hero"
        class="loading-skeleton">
   ```

## 📧 Configurar Formulario de Contacto

El formulario actualmente es solo frontend. Para que funcione, necesitas:

### Opción 1: FormSubmit (Gratis, Sin Backend)

```html
<!-- En index.html, actualiza el form action -->
<form action="https://formsubmit.co/consultoria@zentratek.com" method="POST">
  <!-- Campos del formulario -->
</form>
```

### Opción 2: Backend Propio (API)

Actualiza `assets/js/main.js`:

```javascript
// En el evento submit del formulario
fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => showFormMessage('success'))
.catch(error => showFormMessage('error'));
```

## 🔍 SEO

### Meta Tags

Actualizados en `<head>` de `index.html`:
- Title
- Description
- Open Graph (redes sociales)
- Schema.org (LocalBusiness)

### Sitemap

Genera un `sitemap.xml` cuando tengas más páginas:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://zentratek.com/</loc>
    <lastmod>2025-01-01</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

## 🚦 Performance

### Checklist de Optimización

- ✅ CSS minificado en producción
- ✅ Lazy loading de imágenes
- ✅ Intersection Observer para animaciones
- ✅ Tailwind purge automático
- ⬜ Imágenes en formato WebP (añadir cuando subas imágenes)
- ⬜ CDN para assets estáticos

### Lighthouse Score

Ejecuta auditoría con Chrome DevTools:
1. Abre DevTools (F12)
2. Tab "Lighthouse"
3. "Analyze page load"

**Objetivos**:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 95+

## 🐛 Troubleshooting

### El CSS no se actualiza

```bash
# Limpia la caché y reconstruye
rm -rf dist
npm run build
```

### Icons no aparecen

Verifica que Lucide esté cargando:
```javascript
// En la consola del navegador
console.log(typeof lucide);  // Debería ser 'object'
```

### Build falla en DigitalOcean

- Verifica que `package.json` esté en la raíz
- Confirma que Node.js version sea compatible (16+)
- Revisa los logs de build en DigitalOcean dashboard

## 📞 Soporte

Para preguntas o issues:
- Email: consultoria@zentratek.com
- GitHub Issues: [Crear issue](https://github.com/tu-usuario/zentratek-landing-page/issues)

## 📄 Licencia

MIT License - Ver `LICENSE` para más detalles.

---

**ZentraTek** - Tecnología sencilla, equilibrada y eficiente
