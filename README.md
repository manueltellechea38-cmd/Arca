# WoodManager

Aplicación web progresiva para controlar gastos y evaluar proyectos de carpintería y tornería.

## Abrir en la computadora

No abras `index.html` con doble clic. El catálogo usa `fetch`, por lo que necesita un servidor local.

En Visual Studio Code:

1. Instala la extensión **Live Server**.
2. Abre la carpeta `CarpinteroApp`.
3. Haz clic derecho en `index.html`.
4. Selecciona **Open with Live Server**.

## Publicar

Para instalarla en un iPhone, publica la carpeta en un servicio con HTTPS, por ejemplo GitHub Pages. Luego abre la dirección desde Safari y agrégala a la pantalla de inicio.

## Catálogo remoto

La aplicación funciona con `data/proyectos.json`. En Configuración puedes ingresar una URL pública que devuelva otro archivo JSON con la misma estructura. Si esa dirección falla, la aplicación vuelve al catálogo local o a la última copia guardada.

## Estructura

- `index.html`: estructura semántica de la interfaz.
- `css/`: estilos separados por responsabilidad.
- `js/core/`: estado, navegación, almacenamiento y utilidades.
- `js/modules/`: funciones de cada pantalla.
- `js/services/`: conexión con el catálogo.
- `data/`: catálogo local de respaldo.
- `sw.js`: funcionamiento sin conexión y caché.
