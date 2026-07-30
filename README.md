# Tómbola — Random Selector

Aplicación web estática que selecciona elementos aleatorios de una lista sin
repetirlos, con historial persistente y despliegue automático en GitHub
Pages. No requiere backend ni build step.

## Funcionalidades

- Carga la lista de elementos desde `data/datos.txt` (uno por línea).
- Selección aleatoria sin repetición.
- Dos listas en vivo: **disponibles** y **usados**.
- Estadísticas y barra de progreso.
- Persistencia en `localStorage` (recarga la página y el estado sigue ahí).
- Reinicio con confirmación.
- Modo claro / oscuro.
- Responsive (escritorio, tablet, móvil) y accesible (foco visible,
  `aria-live`, `prefers-reduced-motion`).

## Estructura del proyecto

```
random-selector/
├── index.html
├── css/
│   ├── reset.css
│   └── styles.css
├── js/
│   ├── app.js        orquestador
│   ├── data.js        carga data/datos.txt
│   ├── selector.js    lógica de selección aleatoria (pura)
│   ├── storage.js      Local Storage
│   ├── ui.js         DOM
│   └── utils.js         helpers
├── data/
│   └── datos.txt      lista editable
└── .github/workflows/deploy.yml
```

## Usar tu propia lista

Edita `data/datos.txt` y pon un elemento por línea. Si cambias la lista, la
app detecta que ya no coincide con el estado guardado y arranca de cero
automáticamente (no hace falta borrar el `localStorage` a mano).

## Probar en local

Como `app.js` carga `data/datos.txt` con `fetch`, abrir `index.html`
directamente como archivo (`file://`) falla por CORS en algunos navegadores.
Sirve la carpeta con cualquier servidor estático, por ejemplo:

```bash
python3 -m http.server 8000
# luego abre http://localhost:8000
```

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub y sube este proyecto:

   ```bash
   git init
   git add .
   git commit -m "Primera versión de Tómbola"
   git branch -M main
   git remote add origin https://github.com/<tu-usuario>/random-selector.git
   git push -u origin main
   ```

2. En el repositorio: **Settings → Pages → Build and deployment → Source**,
   selecciona **GitHub Actions**.
3. El workflow en `.github/workflows/deploy.yml` se ejecuta automáticamente
   en cada push a `main` y publica el sitio. La URL aparece en **Settings →
   Pages** y en la pestaña **Actions** una vez termine el deploy.
4. Para versiones futuras, etiqueta el release:

   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

## Compatibilidad

Probado sobre las últimas versiones de Chrome, Firefox, Edge y Safari.

## Mejoras futuras

- Importar listas desde `.txt` o `.csv` sin editar el repo.
- Exportar historial.
- Deshacer la última selección.
- Selección múltiple y múltiples listas.
- Progressive Web App (PWA).
- Temas personalizables.

## Licencia

MIT — ver [LICENSE](./LICENSE).
