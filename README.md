# POC Meli Challenge

Hola! Soy William Montañez! Si estas leyendo esto, te agradezco el interés y aprovecho para presentarte la POC que propongo para el reto de _abuse prevention_.

> Prueba de concepto (POC) para el reto técnico Frontend de Mercado Libre.

> Demo desplegada en Netlify: [https://wamc-meli-challenge.netlify.app/es/previous-step](https://wamc-meli-challenge.netlify.app/es/previous-step)

> Repositorio en GitHub: [https://github.com/wamc1993/wamc-meli-challenge](https://github.com/wamc1993/wamc-meli-challenge)

## 🚀 Descripción general

Este proyecto consiste en una prueba de concepto (POC) que simula un flujo de validación de usuario dividido en tres pasos:

1. **Previous Step** (`/previous-step`): pantalla de entrada donde se selecciona o introduce un token y un referrer.
2. **Abuse Prevention Step** (`/abuse-prevention`): formulario precargado con datos del usuario, que incluye validación y reCAPTCHA.
3. **Last Step** (`/last-step`): página de confirmación tras el envío exitoso del formulario.

El flujo utiliza query params (`token` y `referrer`) para transicionar entre pasos de forma segura y controlada.

## ⚙️ Tecnologías y herramientas

-   **Next.js 15 (App Router, Server Components, SSR)**
-   **TypeScript**
-   **Tailwind CSS + ShadCN UI**
-   **React Hook Form**
-   **Google reCAPTCHA v2 (lazy load + i18n)**
-   **Internationalization (next-intl)**

## 🛠️ Instalación local

```bash
git clone https://github.com/wamc1993/wamc-meli-challenge.git
cd wamc-meli-challenge
npm install
npm run dev
```

Requiere archivo `.env` con:

```env
RECAPTCHA_SECRET_KEY=...
NEXT_PUBLIC_BASE_URL=...
NEXT_PUBLIC_RECAPTCHA_KEY=...
```

Por defecto, la aplicación se ejecuta en: [http://localhost:3000](http://localhost:3000)

## 🏗️ Arquitectura y estructura

![Imagen 01](/documentation/imagen01.jpg)

Gracias a NextJs tenemos el control de dividir la funcionalidad de la página de `/abuse-prevention` entre el servidor y el cliente, logrando cubrir aspectos de rendimiento y seguridad. A continuación se presentará una breve explicación de los componentes que integran esta arquitectura, haciendo énfasís en la página principal de `/abuse-prevention`.

### Resumen de la arquitectura:

-   **App Router + SSR**: aprovecha el rendering en el servidor para precargar datos de usuario y países, y disminuir el trabajo en el dispositivo del cliente
-   **Server Actions**: se usan para el manejo seguro de formularios con validaciones del lado del servidor
-   **Lazy Loading**: el componente del captcha se carga sólo si es visible en el viewport (con IntersectionObserver)
-   **Token Simulation**: el flujo admite selección de usuarios mock desde el paso inicial para facilitar pruebas
-   **Responsive design**: se adapta correctamente a pantallas móviles y de escritorio
-   **Componentes reusables**: Inputs, Selects, Buttons y Layout modularizado para consistencia visual y escalabilidad

### Especificaciones

-   **`abuse-prevention` page**:

    -   Este elemento es una _page_ del proyecto, así que por defecto se renderiza en el servidor (SSR).

        -   La construcción de esta página se realiza cada vez que se solicita, debido a la validación del token y a la obtención de datos del usuario asociado.

    -   El servidor toma los dos query params (`token` y `referrer`) y aplica validaciones personalizadas a estos datos:

        -   Para el caso del `referrer`, se replicó una whitelist muy sencilla. Básicamente, se valida que el valor de `referrer` sea `/previous-page`.
        -   Para el caso del `token`, valido que el valor coincida con alguno de los usuarios de prueba. Estos usuarios son obtenidos mediante un `fetch`, lo cual impide el uso de caché para mejorar aún más el tiempo de respuesta. Sin embargo, considero que es necesario, ya que los datos del usuario pueden cambiar en cualquier momento (o incluso ser eliminados), y la página debe asegurarse de eso.
        -   A nivel de código, estas validaciones están en `src/lib/validateParams.ts`.

    -   Esta página también utiliza el endpoint de países. El listado de países obtenido es _cruzado_ con las traducciones disponibles en el servidor, se actualizan los nombres de los países, y luego se envía al cliente/navegador.

    -   Cuando alguna validación con los query params falla, se muestran errores genéricos. Estos errores son estáticos, así que en estos casos el cliente no tiene que realizar esfuerzos adicionales para completar el renderizado de la página.

    -   Si los query params pasan las validaciones y hay un usuario de prueba asociado al `token`, se envía un bundle intermedio al navegador para continuar con la creación del contenido. Además, el servidor le envía las traducciones, el listado de países y los datos del usuario.

    -   A nivel de código, esta página está ubicada en `src/app/[locale]/abuse-prevention/page.tsx`.

-   **`/api/meli-countries`**:

    -   Este endpoint retorna un listado de países estáticos. Cada país tiene un código (CO, AR, BR, etc.) y un nombre (en inglés).
    -   Es utilizado por la página `abuse-prevention` con una caché de un día. Tomé esta decisión asumiendo que la información de países no cambiará frecuentemente, y que gracias a ello, puedo beneficiarme del uso de caché.
    -   Dado que la página `abuse-prevention` tiene acceso a las traducciones y conoce el idioma del usuario gracias a la URL, se encarga de reemplazar los nombres en inglés por sus correspondientes en el idioma adecuado. Si no se tiene una traducción disponible para algún país, entonces se usa el nombre original del endpoint como contingencia.
    -   A nivel de código, este endpoint se encuentra en `src/app/api/meli-countries/route.ts`, y el llamado desde la página `abuse-prevention` está centralizado en `src/lib/fetchCountries.ts`.

-   **`/api/meli-users`**:

    -   Este endpoint retorna un listado de usuarios de prueba a partir de un `token` suministrado.
    -   Es utilizado por la página `abuse-prevention` sin ningún tipo de caché. Esta decisión fue intencional, ya que siempre se debe validar con la información más actualizada del usuario, aunque esto implique afectar ligeramente el tiempo de respuesta. En este POC no se percibe una afectación real, pero recomiendo que en un proyecto productivo, el endpoint encargado de suministrar los usuarios implemente internamente mecanismos de caché, snapshots o bases de contingencia para responder en un tiempo razonable. Considero que esa lógica debe vivir en ese endpoint, no en este proyecto. Como alternativa, se podría usar una caché muy pequeña (por ejemplo, de un minuto) en los proyectos consumidores para evitar llamados innecesarios.
    -   A nivel de código, el endpoint está en `src/app/api/meli-users/route.ts`. El `fetch` que realiza la página está en `src/lib/fetchUserData.ts`.

-   **Submit action:**

    -   Gracias a Next.js, existe una alternativa al `fetch` convencional para enviar datos del cliente al servidor: los _Server Actions_. Elegí este mecanismo para hacer el submit del formulario por varias razones:

        -   Desde el punto de vista del desarrollador, los Server Actions son fáciles de implementar.
        -   El código de un Server Action nunca se expone al navegador; siempre se ejecuta en el servidor.
        -   En principio, no pueden ser inspeccionados ni alterados mediante DevTools.
        -   Se serializan como funciones y se incluyen directamente en el HTML renderizado por el servidor, así que solo pueden ser invocados desde un `<form>`.
        -   Aclaración: no descarto el uso de `fetch` en un proyecto real. La elección aquí se debió al balance entre costo-beneficio y tiempo de implementación.

    -   El Server Action que implementé recibe los datos del formulario como un objeto `FormData`. Este `FormData` contiene los datos del usuario (que ya fueron enviados al navegador al construir la página), además del token, el `referrer` y el valor del captcha.
    -   Para este POC incluí un campo especial para "saltar el captcha". Inicialmente lo usé para pruebas durante el desarrollo, antes de configurar correctamente el reCAPTCHA, pero decidí dejarlo por si se presenta algún imprevisto en producción.
    -   Este Server Action realiza lo siguiente:

        -   Valida los campos del formulario (no me compliqué demasiado aquí jeje, solo verifiqué que no estuvieran vacíos, pero en un proyecto real se podría implementar cualquier validación necesaria).
        -   Valida el valor del reCAPTCHA contra el API de Google.
        -   En caso de pasar todas las validaciones, redirige a la página final.

    -   A nivel de código, se encuentra en `src/app/actions/formActions.ts`.

-   **Validadores**:

    -   Implementé un par de funciones que se ejecutan en el servidor y que pueden ser reutilizadas tanto al construir la página `abuse-prevention` como al validar los datos del formulario. En un proyecto real, estas funciones incluso podrían convertirse en llamados a endpoints externos. Por ahora, se trata de funciones sencillas cuyo propósito es ilustrar conceptos de seguridad básicos dentro de la arquitectura propuesta.
    -   Estas funciones están ubicadas en `src/lib/validateParams.ts`.

-   **Formulario**:

    -   Durante el proceso de construcción de la página `abuse-prevention`, el servidor le envía al navegador el esqueleto de la página, las traducciones, los datos del usuario y el listado de países. Con esta información, se implementa un formulario básico.
    -   Elegí la librería `react-hook-form` para gestionar la validación del formulario.
    -   Para los inputs, opté por la librería `shadcn` en combinación con Tailwind CSS. Ambas permiten maquetar elementos con buena estética y funcionalidad en poco tiempo, lo cual es ideal para una prueba técnica.
    -   El formulario se encuentra principalmente en `src/components/Form/index.tsx`. Desde allí se orquesta la creación de los inputs y la interacción con el usuario. La lógica de presentación está encapsulada en el hook `src/components/Form/useMeliForm.ts`.
    -   Cabe destacar que la mayoría de textos y etiquetas del formulario están traducidos al español y al portugués, incluyendo las opciones del dropdown de países. Me faltaron algunas traducciones de errores, pero con este POC logro demostrar que el enfoque de cargar traducciones desde el server component tiene mucho sentido, ya que disminuye el número de cargas posteriores.

-   **Skeleton**:

    -   Puede existir un breve lapso entre el envío del contenido desde el servidor y la completitud del formulario en el cliente. Para evitar una transición brusca o molesta al usuario, implementé un _Skeleton_ del formulario.
    -   En mi opinión, el skeleton no difiere demasiado de una animación de carga convencional, pero tiene la ventaja de "preparar" visualmente al usuario sobre la estructura final de la página, mientras transmite la sensación de que "estamos cargando, espéranos".
    -   A nivel de código, esta lógica está en `src/components/FormWithSkeleton/index.tsx`, que actúa como un HOC que asocia el componente `Form` definitivo con su skeleton correspondiente (`src/components/FormSkeleton/index.tsx`).

-   **Captcha**:

    -   Se implementó el mecanismo reCAPTCHA v2 de Google, ya que es uno de los captchas más conocidos y utilizados.
    -   Debido a su alto costo de carga durante la construcción de la página, decidí cargarlo de forma perezosa (_lazy loading_). De esta forma, no se compromete el tiempo de carga del formulario ni de sus datos. En la práctica, el CAPTCHA se carga después del formulario. Sé que en las especificaciones del reto se mencionaba que "debía cargarse lo más rápido posible", pero sinceramente considero que cargarlo después es necesario para no afectar negativamente la experiencia del usuario.
    -   Probé tres alternativas para decidir el momento adecuado de carga:

        1. Cargarlo de forma perezosa, pero inmediatamente después de renderizar la página.
        2. Comenzar a cargarlo cuando el usuario empieza a llenar el formulario. Esto puede funcionar en formularios vacíos, ya que si el usuario abandona la página sin interactuar, no se carga el script del CAPTCHA. Sin embargo, en este caso el formulario puede venir ya con datos precargados, y no se activaría necesariamente el `onChange`.
        3. Usar un `IntersectionObserver` para cargar el CAPTCHA únicamente cuando su contenedor entra en el viewport. Este enfoque es útil en formularios largos que requieren hacer scroll. Elegí esta opción porque, en el peor de los casos, el CAPTCHA empezaría a cargarse justo después de mostrar la página, como en la opción 1, pero con una ventaja: no se ejecuta el código hasta que realmente es necesario.

    -   Me decidí por la opción 3 debido a su versatilidad, y porque considero que es una solución completamente viable en proyectos productivos.
    -   Gracias a esta estrategia, el LCP (Largest Contentful Paint) que observé fue menor a 2 segundos en mis pruebas manuales. Con las auditorías de Lighthouse en dispositivos móviles, obtuve un LCP de 2.2 segundos y un TTI (Time to Interactive) de 3.3 segundos. En desktop, los resultados fueron incluso mejores.
    -   Respecto al cambio de idioma:

        -   Este POC soporta dos lenguajes: español y portugués. Este soporte incluye también al CAPTCHA (y honestamente, fue la parte más compleja de implementar, jaja).
        -   Al cambiar el idioma del sitio, el CAPTCHA también cambia. Se intentaron varias estrategias para lograr esto sin afectar el TTI, pero finalmente no fue posible evitar hacer un _hard reload_ completo. En la sección de i18n explico con más detalle lo que probé y por qué fue necesario este enfoque.

## 🌐 Soporte multilenguaje (i18n)

Se utilizó la librería `next-intl` para que la app estuviera disponible en:

-   Español (`/es/...`)
-   Portugués (`/pt/...`)

El lenguaje por defecto es el español, pero en la parte superior derecha de la página ubiqué un selector de idioma. Al seleccionar un idioma, se cambia la URL del sitio para comenzar a usar el idioma correspondiente:

-   A nivel de código, el selector de idioma está en el componente `src/components/LanguageSwitcher/index.tsx`.
    El cambio de idioma realiza un _hard reload_ del sitio 😭, lo que equivale a recargar la aplicación desde cero, como si fuera el primer acceso.

-   Esta acción drástica se debe al cargue del CAPTCHA:

    -   Inicialmente utilicé la función `router.replace` de la librería `next/navigation` para realizar un cambio óptimo de URL (internamente, Next.js determina qué cambió en la página y actualiza solo los elementos necesarios, reutilizando los demás). Este método funcionaba bien para casi todo el sitio... excepto para el CAPTCHA.
    -   Tras varios intentos, observé que al cargarse, el CAPTCHA inserta varios elementos ocultos en el DOM. Pude eliminar manualmente algunos, como la etiqueta `<script>` o el `<iframe>` que Google agrega al HTML, pero aun así, ciertos scripts y configuraciones internas del primer script cargado imposibilitaron un cambio de idioma exitoso en el CAPTCHA.
    -   También modifiqué el `useEffect` del componente `src/components/Captcha/index.tsx` para solicitar el script de reCAPTCHA con el query param `hl=es` o `hl=pt`, según el idioma, pero nada de esto funcionó.
    -   Ante la imposibilidad de actualizar el idioma del CAPTCHA tras un cambio dinámico de idioma, no quedó otra opción que hacer un _hard reload_ (equivalente a presionar F5) después de seleccionar un nuevo idioma. Por fortuna, esto solo ocurre al cambiar de idioma, y el primer cargue es suficientemente rápido como para que no resulte molesto.
    -   Una optimización que no implementé en este POC, pero que tendría sentido, es restringir el _hard reload_ solo a la página que contiene el CAPTCHA, y no a todas las páginas del proyecto.

## 🖼️ UI y SEO

-   Usé la librería ShadCN para construir los inputs del formulario. Esta librería gestiona muy bien los elementos visuales y, a diferencia de otras como Ant Design o MUI, permite instalar los componentes de forma individual y altamente personalizable.
-   Utilicé Tailwind CSS para facilitar el uso de estilos. Esta herramienta es excelente para definir sistemas de diseño, crear _themes_ o aplicar un modo oscuro. Por cuestiones de tiempo, no alcancé a implementar el modo oscuro, pero parte de la base ya está hecha gracias a Tailwind.
-   La página tiene un diseño simple pero responsivo, por lo que se ve correctamente tanto en escritorio como en dispositivos móviles.
-   Se definieron metadatos básicos para SEO, así como etiquetas OpenGraph (para optimizar los enlaces al compartir en WhatsApp y redes sociales).
-   El formulario incluye un _skeleton_ que cumple el rol de _loader_ mientras se construye la página.
-   El cargue del CAPTCHA **no** bloquea el funcionamiento del formulario: el usuario puede revisar los valores precargados e incluso comenzar a editarlos mientras el CAPTCHA termina de cargarse.

## 🔐 Seguridad aplicada

-   Validación estricta de los parámetros `token` y `referrer`.
-   No se confía en valores de entrada sin validarlos previamente en el servidor.
-   Se activa Google reCAPTCHA para mitigar automatizaciones.
-   El valor de `g-recaptcha-response` se agrega manualmente mediante `window.grecaptcha.getResponse()` para asegurar su inclusión en el formulario.

## 🧩 Estrategia No-Script

Incluí un bloque `<noscript>` en el layout principal que muestra una alerta clara si el navegador tiene JavaScript desactivado. Este mensaje informa al usuario que la funcionalidad del sitio depende del uso de JavaScript:

```tsx
<noscript>
	<div className="bg-yellow-100 text-yellow-900 p-4 text-center text-sm">
		Este sitio requiere <strong>JavaScript</strong> para funcionar
		correctamente. Por favor, habilítalo en tu navegador.
	</div>
</noscript>
```

### 📌 Alternativas más robustas (no implementadas en este POC)

Por razones de tiempo, no llegué a implementar una estrategia más avanzada para el escenario sin JavaScript. Sin embargo, este POC sienta las bases para construirla. Algunas ideas serían:

-   Renderizar una versión del formulario enteramente en HTML desde el servidor.
-   Reutilizar las validaciones del servidor que ya existen para este formulario.
-   Crear una nueva página específica, por ejemplo, `/no-js`, pensada para navegadores con JavaScript deshabilitado.

## 🔬 Análisis de Performance

Realicé auditorías Lighthouse tras publicar el POC en Netlify, tanto en escritorio como en dispositivos móviles.

Enlaces a los reportes:

-   [Ver reporte Lighthouse Mobile](/documentation/lighthouse-mobile.html)
-   [Ver reporte Lighthouse Desktop](/documentation/lighthouse-desktop.html)

Le pedí a ChatGPT que resumiera los resultados. A continuación, su respuesta:

### 🧠 Métricas clave consideradas

-   **LCP (Largest Contentful Paint)**: tiempo que tarda en mostrarse el contenido principal en pantalla. Idealmente, debe ser menor a 2.5 segundos.
-   **TTI (Time to Interactive)**: tiempo que tarda en estar disponible la interacción sin bloqueos. El valor óptimo es menor a 3.8 segundos.

### 📈 Métricas observadas en Lighthouse

| Plataforma  | LCP      | TTI      |
| ----------- | -------- | -------- |
| **Desktop** | 0.7 s ✅ | 1.1 s ✅ |
| **Mobile**  | 2.2 s ✅ | 3.3 s ✅ |

Estas métricas se optimizaron mediante:

-   Lazy loading del CAPTCHA.
-   Eliminación de fuentes innecesarias.
-   Uso de `next/font` para evitar bloqueos por tipografía externa.

| Plataforma  | Performance | Accesibilidad | Best Practices | SEO |
| ----------- | ----------- | ------------- | -------------- | --- |
| **Desktop** | **94**      | 100           | 100            | 100 |
| **Mobile**  | **84**      | 100           | 100            | 100 |

> El POC logra una experiencia de usuario fluida, accesible y optimizada, incluso en entornos móviles con CPU limitada y red 3G simulada.

## 📎 Consideraciones finales

-   Este proyecto prioriza claridad, mantenibilidad y escalabilidad por encima de micro-optimizaciones.
-   Dependencias externas como Google reCAPTCHA afectan ligeramente el LCP y TTI, pero se mitigan eficazmente con lazy loading.
-   Toda la lógica sensible se gestiona exclusivamente del lado del servidor.
-   El componente `<Captcha />` es dinámico, internacionalizable y fácilmente extensible.
