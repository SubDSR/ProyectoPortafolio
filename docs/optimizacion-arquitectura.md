# Documentacion tecnica de optimizacion y arquitectura

## Resumen

El proyecto es un portafolio construido con React 19, Vite, CSS por componente, assets locales, `react-icons` y una seccion 3D basada en `three`, `@react-three/fiber` y `@react-three/drei`.

Los principales puntos de mejora detectados son:

- Assets locales muy pesados (imagenes PNG/JPG sin convertir).
- Carga inicial de demasiadas secciones sin lazy loading.
- Avatar 3D con coste alto de JavaScript de librerias (no del modelo .glb).
- Imagenes sin carga diferida.
- Fuentes importadas con @import desde CSS (bloquea descubrimiento).
- CSS con efectos visuales costosos (blur, backdrop-filter, animaciones).
- Datos mezclados dentro de componentes visuales.
- Logica responsive duplicada en multiples componentes.

## Estado actual del peso

Segun el build existente:

- `dist`: aproximadamente `22M`.
- `src/assets`: aproximadamente `16M`.
- `dist/assets/MinecraftAvatar-*.js`: aproximadamente `1.1M` (son las librerias Three.js + R3F + Drei bundleadas, NO el modelo).
- `dist/assets/index-*.js`: aproximadamente `248K`.
- `dist/assets/index-*.css`: aproximadamente `48K`.

Assets mas pesados en `src/assets/`:

- `lapuntita.png`: `5.1M`.
- Certificados JPG (`Certificado_*.jpg`): `1.6M` cada uno, `6.4M` total (4 archivos).
- `minecraft-bg-light.png`: `1.5M`.
- `minecraft-bg-dark.png`: `1.4M`.
- `sistema_veterinario.png`: `822K` (captura de proyecto).
- `portafolio-personal.png`: `443K` (captura de proyecto).
- `educamovil.png`: `296K` (captura de proyecto).
- `foto_perfil.png`: `227K` (foto de perfil en About).

Assets en `public/`:

- `dsr.png`: `1001K`, usado como favicon (deberia ser 32x32 o 64x64).
- `/certificates/` (4 PDFs): aproximadamente `3.7M` total.
- `CV_David_Sevan.pdf`: `107K`.
- `model.glb`: `24.3K` (modelo Minecraft — peso excelente, no es el problema del chunk 3D).

## Lo que ya funciona bien

Antes de listar problemas, estos puntos ya estan correctamente implementados y deben conservarse:

- `MinecraftAvatar` ya se carga con `React.lazy` desde `Hero3D.jsx`.
- `<Suspense>` ya esta implementado alrededor del avatar.
- `model.glb` pesa solo `24.3KB` — el modelo 3D es muy eficiente.
- `useScrollReveal.js` ya existe como hook reutilizable con `IntersectionObserver`.
- `Navbar` ya usa `IntersectionObserver` para detectar la seccion activa.
- Soporte de `prefers-reduced-motion` en `useScrollReveal` y en la animacion del marquee.
- Accesibilidad basica: ARIA labels, `focus-visible`, botones con `min-height: 44px`.
- Marquee de tecnologias pausa correctamente con hover.
- `ThemeProvider` y `useTheme` ya existen como contexto reutilizable.
- `ScrollToTop` usa `passive: true` en el listener de scroll.

## Problemas detectados y recomendaciones

## 1. Imagenes demasiado pesadas

Archivos relacionados:

- `src/components/Projects.jsx`
- `src/components/Certificates.jsx`
- `src/components/About.jsx`
- `index.html`

Problema:

Las imagenes se importan directamente como PNG/JPG grandes. No hay versiones WebP/AVIF, thumbnails separados ni favicon optimizado. Esto aumenta el peso del build y ralentiza la primera carga, especialmente en moviles. Las capturas de proyectos son especialmente candidatas porque se usan en cards pequenas pero se sirve la imagen completa.

Recomendaciones:

- Convertir a `WebP` con calidad 80-85: `lapuntita.png`, `minecraft-bg-*.png`, los 4 certificados JPG y las capturas de proyectos.
- Crear thumbnails separados para las cards de proyectos (max 400px de ancho) y mantener la imagen grande solo para el modal.
- Reemplazar `public/dsr.png` (1MB) por un favicon real de `32x32` o `64x64` en ICO o PNG optimizado.
- Usar `srcset` y `sizes` si se van a mantener varias resoluciones.
- `foto_perfil.png` (227KB) tambien se beneficiaria de conversion a WebP.

Ejemplo recomendado:

```jsx
<img
  src={project.imageThumbnail}
  alt={`Proyecto ${project.title}`}
  loading="lazy"
  decoding="async"
  width="400"
  height="225"
/>
```

## 2. Carga inicial demasiado amplia

Archivo relacionado:

- `src/App.jsx`

Problema:

`App.jsx` importa todas las secciones de forma estatica. Aunque algunas estan debajo del primer pantallazo, entran en el bundle inicial. `MinecraftAvatar` ya esta lazy-loaded desde `Hero3D`, pero el resto de secciones no.

Recomendaciones:

- Mantener `Navbar` y `Hero3D` en la carga inicial (estan sobre el fold).
- Cargar con `React.lazy` secciones como `Projects`, `About`, `Certificates`, `Tecnologias` y `Contact`.
- Para mejores resultados, cargar secciones cuando se acerquen al viewport usando `IntersectionObserver` (el hook `useScrollReveal` existente podria adaptarse).

Ejemplo:

```jsx
const Projects = lazy(() => import('./components/Projects'));
const About = lazy(() => import('./components/About'));

// En el JSX:
<Suspense fallback={null}>
  <Projects />
</Suspense>
```

## 3. Avatar 3D costoso

Archivos relacionados:

- `src/components/Hero3D.jsx`
- `src/components/MinecraftAvatar.jsx`

Problema:

El modelo `.glb` pesa solo `24.3KB`, lo cual es excelente. El chunk pesado de `~1.1MB` corresponde a las librerias bundleadas: `three`, `@react-three/fiber` y `@react-three/drei`. Eso es inevitable, pero puede gestionarse mejor. Ademas:

- `useGLTF.preload(modelUrl)` fuerza la descarga del modelo al importar el chunk, antes de que el usuario llegue al hero.
- `OrbitControls` con `autoRotate` mantiene un loop de render continuo a 60fps todo el tiempo.
- El `Canvas` no configura `dpr`, por lo que en pantallas Retina puede renderizar al doble o triple de resolucion innecesariamente.
- El fallback del `Suspense` del avatar es `null` (pantalla vacia durante la carga).

Recomendaciones:

- Configurar `dpr={[1, 1.5]}` en el `Canvas` para limitar la resolucion de render.
- Evaluar `frameloop="demand"` si se quiere eliminar el auto-rotate y renderizar solo cuando hay interaccion del usuario. Con `autoRotate` activo no es compatible.
- Si se mantiene `autoRotate`, al menos desactivarlo o reducir `autoRotateSpeed` en movil.
- Reemplazar el fallback `null` por una imagen estatica ligera del avatar (WebP, ~5-10KB).
- Considerar diferir la carga del chunk 3D hasta que el usuario haga scroll hacia el hero o interactue con la pagina.

Ajuste minimo en el Canvas:

```jsx
<Canvas
  camera={{ position: [0, 0.5, 2], fov: 38 }}
  dpr={[1, 1.5]}
  style={{ pointerEvents: 'none' }}
>
```

## 4. Imagenes sin lazy loading

Archivos relacionados:

- `src/components/Projects.jsx`
- `src/components/About.jsx`
- `src/components/Certificates.jsx`

Problema:

Ninguna imagen del proyecto usa `loading="lazy"`, `decoding="async"` ni dimensiones explicitas. Esto puede aumentar el tiempo de carga percibido y afectar el CLS (Cumulative Layout Shift). Confirmado: no hay ningun atributo `loading="lazy"` en todo el codigo.

Recomendaciones:

- Agregar `loading="lazy"` a todas las imagenes que esten bajo el fold.
- Agregar `decoding="async"` en todas las imagenes.
- Declarar `width` y `height` para estabilizar el layout antes de que carguen.
- Usar `fetchpriority="high"` solo para la imagen de perfil en About si esta visible sin scroll.

## 5. Fuentes externas importadas desde CSS

Archivo relacionado:

- `src/index.css` (linea 1)

Problema:

Las fuentes se cargan con `@import` en la primera linea de `index.css`. Esto retrasa la descarga porque el navegador primero debe parsear el CSS para descubrir las fuentes. El `index.html` actual no tiene ningun `<link rel="preconnect">` ni `<link rel="preload">` para las fuentes.

Se importan dos familias: `Poppins` (pesos 300, 400, 500, 600, 700) y `Caveat` (pesos 400, 600). Hay que auditar si realmente se usan todos los pesos.

Recomendaciones:

- Mover la carga de fuentes a `index.html` con `preconnect` y `preload` para el peso principal.
- Auditar que pesos de `Poppins` y `Caveat` se usan realmente en el CSS y eliminar los innecesarios.
- Considerar self-hosting en `public/fonts/` para evitar dependencia de Google Fonts y ganar control del cache.
- Asegurarse de que `font-display: swap` este presente (ya lo tiene el @import actual con `&display=swap`).

Ejemplo para `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Caveat:wght@600&display=swap" rel="stylesheet">
```

Y eliminar el `@import` de `index.css`.

## 6. CSS con efectos visuales costosos

Archivos relacionados:

- `src/styles/Hero3D.css` — `filter: blur(80px)` en orbes
- `src/styles/About.css` — `filter: blur(50px)` en profile-glow
- `src/styles/Navbar.css` — `backdrop-filter: blur(12px)`
- `src/styles/Hero3D.css` — `backdrop-filter: blur(10px)` en botones
- `src/styles/Projects.css` — `backdrop-filter: blur(12px)` en filtros
- `src/styles/About.css` — `backdrop-filter: blur(12px)` en availability badge
- `src/styles/Certificates.css` — `backdrop-filter: blur(10-14px)` en multiples elementos
- `src/styles/Contact.css` — `backdrop-filter: blur(12px)` en boton secundario
- `src/styles/VideoModal.css` — `backdrop-filter: blur(10px)` en overlay
- `src/components/Navbar.jsx` — `transition: all 0.3s ease` (deberia ser especifico)

Problema:

El uso de `filter: blur` y `backdrop-filter` en multiples capas es uno de los efectos mas costosos para el compositor del navegador, especialmente en moviles. El blur de 80px en los orbes del hero y el de 50px en el About estan constantemente activos. Ademas, `transition: all` en Navbar aplica transicion a todas las propiedades CSS, incluyendo las que no necesitan animacion.

Recomendaciones:

- Reducir `filter: blur(80px)` a `blur(40px)` en orbes decorativos.
- Reducir `filter: blur(50px)` a `blur(30px)` en profile-glow.
- Evaluar si algunos `backdrop-filter` pueden reemplazarse con colores semitransparentes solidos (menos costoso).
- Reemplazar `transition: all` por propiedades especificas: `transition: color 0.3s ease, background-color 0.3s ease`.
- Pausar animaciones fuera del viewport usando `animation-play-state: paused`.
- Mantener y ampliar el soporte de `prefers-reduced-motion` en todos los efectos.
- En movil, reducir o eliminar los blurs mas grandes.

## 7. Datos mezclados con componentes visuales

Archivos relacionados:

- `src/components/Projects.jsx` — array `projects` (4 proyectos con techs, categorias, descripciones, links)
- `src/components/Certificates.jsx` — array `certificates` (4 certificados con IDs, años, comandos, iconos)
- `src/components/Tecnologias.jsx` — arrays de tecnologias divididas en 2 filas (14 herramientas)
- `src/components/Hero3D.jsx` — URLs de redes sociales, notas manuscritas hardcodeadas
- `src/App.jsx` — URLs de redes sociales duplicadas en el footer

Problema:

Los datos de proyectos, certificados, tecnologias, redes sociales y notas del hero estan definidos dentro de componentes visuales. Esto dificulta escalar, testear, reutilizar y mantener el codigo. Las URLs de redes sociales ademas aparecen duplicadas en `Hero3D.jsx` y `App.jsx`.

Recomendaciones:

- Mover proyectos a `src/data/projects.js`.
- Mover certificados a `src/data/certificates.js`.
- Mover tecnologias a `src/data/technologies.js`.
- Mover URLs y labels de redes sociales a `src/data/socialLinks.js` y usarlo desde Hero3D y App.
- Mover notas manuscritas del hero a `src/data/heroNotes.js` o constantes en el mismo archivo de datos.
- Dejar los componentes enfocados en renderizado e interaccion.

## 8. Logica responsive duplicada

Archivos relacionados:

- `src/components/Projects.jsx` — `window.addEventListener('resize', handleResize)` con < 768px
- `src/components/Certificates.jsx` — `window.addEventListener('resize', handleResize)` con < 768px
- `src/components/Contact.jsx` — `useState(window.innerWidth < 768)` solo al montar (no actualiza al redimensionar)
- `src/components/Hero3D.jsx` — `window.innerWidth < 900` check inline sin listener
- `src/components/ImageModal.jsx` — listener de ESC hardcodeado
- `src/components/VideoModal.jsx` — listener de ESC hardcodeado (duplicado)

Problema:

Hay cuatro instancias de logica de breakpoint dispersas en componentes. `Contact.jsx` ademas tiene el bug de que calcula el valor al montar pero no lo actualiza si el usuario redimensiona la ventana. La tecla ESC esta implementada por separado en ImageModal y VideoModal.

Recomendaciones:

- Crear `src/hooks/useMediaQuery.js` usando `matchMedia` (mas eficiente que eventos `resize`).
- Reemplazar todos los `resize` listeners con el hook reutilizable.
- Crear `src/hooks/useEscapeKey.js` y usarlo en ambos modales.
- Centralizar la logica responsive.

Ejemplo de `useMediaQuery`:

```js
function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [query]);
  return matches;
}
```

Uso:

```js
const isMobile = useMediaQuery('(max-width: 767px)');
```

## 9. Scroll forzado y deep links rotos

Archivos relacionados:

- `src/main.jsx`
- `src/App.jsx`

Problema:

`main.jsx` elimina el hash de la URL y fuerza scroll al inicio en cada carga. `App.jsx` tiene un `useEffect` adicional con `window.scrollTo(0, 0)`. Esta doble logica impide abrir directamente enlaces como `/#projects`, `/#certificates` o `/#contact`, y duplica responsabilidad.

Recomendaciones:

- Centralizar la logica de scroll inicial en un solo lugar (`main.jsx` o `App.jsx`, no los dos).
- No borrar el hash si existe, para permitir navegacion directa a secciones.
- Si se quiere scroll al inicio solo cuando no hay hash, condicionarlo: `if (!window.location.hash) window.scrollTo(0, 0)`.

## 10. Codigo muerto o inconsistente

Archivos relacionados:

- `src/components/Hero.jsx`
- `src/styles/Hero.css`

Problema:

`Hero.jsx` importa `../assets/robot_meme2.png`, que no existe en `src/assets/`. `App.jsx` usa `Hero3D`, no `Hero`. Tanto `Hero.jsx` como `Hero.css` son codigo muerto que aumenta confusion sin aportar valor.

Recomendaciones:

- Eliminar `Hero.jsx` y `Hero.css` ya que `Hero3D.jsx` es el hero activo.
- O restaurar el asset faltante si `Hero.jsx` sera una alternativa real de fallback.

## 11. Dependencia posiblemente innecesaria

Archivo relacionado:

- `package.json`

Problema:

`vite-plugin-svgr` esta instalado como dependencia (confirmado en `package.json`), pero no aparece en `vite.config.js` (que solo tiene el plugin de React) y no hay imports de SVG como componentes React en el codigo.

Recomendaciones:

- Eliminar `vite-plugin-svgr` si no se necesita: `npm uninstall vite-plugin-svgr`.
- Si se va a usar en el futuro, moverlo a `devDependencies` y configurarlo en `vite.config.js`.

## Arquitectura propuesta

Estructura recomendada:

```txt
src/
  app/
    App.jsx
    providers/
      ThemeProvider.jsx        <- mover desde components/
  components/
    ui/
      Modal.jsx                <- unificar ImageModal y VideoModal
      IconButton.jsx
      SectionTitle.jsx
    layout/
      Navbar.jsx
      ScrollToTop.jsx
  features/
    hero/
      Hero3D.jsx
      MinecraftAvatar.jsx
      hero.css
    projects/
      Projects.jsx
      ProjectCard.jsx
      ProjectFilters.jsx
      projects.css
    certificates/
      Certificates.jsx
      CertificateCard.jsx
      CertificateTerminal.jsx
      certificates.css
    about/
      About.jsx
      about.css
    technologies/
      Technologies.jsx
      MarqueeRow.jsx
      technologies.css
    contact/
      Contact.jsx
      contact.css
  data/
    projects.js
    certificates.js
    technologies.js
    socialLinks.js
    heroNotes.js
  hooks/
    useMediaQuery.js           <- nuevo (reemplaza resize listeners)
    useScrollReveal.js         <- ya existe
    useEscapeKey.js            <- nuevo (reemplaza listeners duplicados en modales)
  assets/
    images/
    icons/
  styles/
    globals.css
    tokens.css
```

## Beneficios de la arquitectura propuesta

- Separacion clara entre layout, features, hooks, datos y estilos globales.
- Componentes mas pequenos y faciles de mantener.
- Datos reutilizables sin depender de la UI.
- URLs de redes sociales en un unico lugar (sin duplicacion entre Hero y footer).
- Mayor facilidad para aplicar lazy loading por seccion.
- Menor riesgo de colisiones CSS.
- Hooks reutilizables eliminan logica responsive y de teclado duplicada.

## Plan recomendado por fases

## Fase 1: Optimizacion rapida (mayor impacto, menor riesgo)

- Convertir a WebP: `lapuntita.png`, certificados JPG, fondos Minecraft y capturas de proyectos.
- Reemplazar `public/dsr.png` (1MB) por favicon optimizado de 32x32 o 64x64.
- Agregar `loading="lazy"` y `decoding="async"` a todas las imagenes no criticas.
- Mover fuentes de `@import` en CSS a `<link>` en `index.html` con `preconnect`.
- Auditar y reducir pesos de Poppins y Caveat a los realmente usados.
- Eliminar `Hero.jsx` y `Hero.css` (codigo muerto).
- Eliminar `vite-plugin-svgr` si no se usa.

## Fase 2: Optimizacion de carga

- Aplicar `React.lazy` a secciones bajo el fold en `App.jsx`.
- Configurar `dpr={[1, 1.5]}` en el Canvas del avatar 3D.
- Evaluar desactivar `autoRotate` en movil.
- Reemplazar fallback `null` del Suspense del avatar por imagen estatica ligera.
- Separar datos de proyectos, certificados, tecnologias y socialLinks a `src/data/`.

## Fase 3: Optimizacion visual

- Reducir `filter: blur(80px)` a `blur(40px)` en orbes decorativos del hero.
- Reducir `filter: blur(50px)` a `blur(30px)` en profile-glow del About.
- Evaluar reemplazar `backdrop-filter` en elementos secundarios con colores solidos semitransparentes.
- Reemplazar `transition: all` por propiedades concretas.
- Pausar animaciones fuera del viewport.
- Verificar `prefers-reduced-motion` en todas las animaciones del CSS.

## Fase 4: Reorganizacion arquitectonica

- Crear hook `useMediaQuery` y reemplazar los 4 resize listeners.
- Crear hook `useEscapeKey` y reemplazar los listeners duplicados en modales.
- Mover ThemeProvider fuera de components/.
- Reorganizar carpetas por feature.
- Centralizar estilos globales y tokens.
- Corregir la logica de scroll duplicada entre `main.jsx` y `App.jsx`.

## Impacto esperado

Mayor impacto esperado:

- Optimizar imagenes (especialmente lapuntita 5.1M y certificados 6.4M): impacto muy alto.
- Favicon optimizado (de 1MB a <5KB): impacto alto en tiempo de carga del tab.
- Fuentes con preconnect en lugar de @import: impacto medio-alto en FCP.
- Lazy loading de secciones: impacto medio-alto.
- Configurar DPR del Canvas: impacto alto en dispositivos Retina/movil.
- Reducir efectos CSS pesados: impacto medio en FPS y bateria movil.
- Reorganizar arquitectura: impacto alto en mantenibilidad, sin impacto en performance.

## Prioridad recomendada

Orden sugerido de trabajo:

1. Optimizar assets grandes (lapuntita, certificados, fondos Minecraft, capturas de proyectos).
2. Reemplazar favicon (1MB → <5KB).
3. Mover fuentes a index.html con preconnect.
4. Agregar lazy loading a imagenes.
5. Configurar dpr={[1, 1.5]} en el Canvas 3D.
6. Aplicar React.lazy a secciones bajo el fold.
7. Mover datos a `src/data/`.
8. Crear hooks reutilizables (useMediaQuery, useEscapeKey).
9. Reorganizar carpetas por feature.
