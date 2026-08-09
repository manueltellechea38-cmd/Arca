# Arca v0.2.3

## Cambios principales

- Nueva pantalla de bienvenida con botón Entrar.
- Rediseño inspirado en el lenguaje Liquid Glass actual de Apple.
- Navegación inferior flotante con cuatro áreas: Inicio, Finanzas, Guardados y Ajustes.
- Eliminación completa de la sección Ideas.
- Tarjeta de versículo en el panel principal.
- El versículo cambia automáticamente; por defecto, cada 30 minutos.
- Los versículos guardados pueden copiarse, editarse, anclarse, desanclarse y borrarse.
- Versículos incluidos en Reina-Valera 1909.
- Mejoras de privacidad para ocultar montos.
- Panel principal personalizable: visibilidad y orden de Saldo, Gastos e Ingresos.
- Tema, acento, bienvenida, reloj y frecuencia del versículo configurables.
- Exportación e importación de una copia de seguridad JSON.
- Saldo inicial rediseñado: luego de configurarlo, el formulario desaparece y queda un resumen con botón Editar.
- Importes monetarios compatibles con coma o punto decimal.
- Se mantienen movimientos editables, límites, categorías e historial mensual.
- Migración de los datos financieros de Arca v0.2.1.

## Versículos

La selección incluida utiliza Reina-Valera 1909, una traducción en dominio público. La aplicación no interpreta ni explica los versículos: solo muestra el texto y la referencia.

## Uso local

Abrir `index.html` mediante Live Server.

## PWA

La aplicación puede instalarse desde Safari en iPhone y ejecutarse en modo standalone. El service worker usa caché `woodmanager-v022`.


## v0.2.3
- Se reforzó la prevención de autocompletado/historial en campos de texto mediante nombres aleatorios por sesión y lectura por `data-field`.
