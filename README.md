## Por hacer

-   El listado de valid referrers, lo dejamos como constante?
-   isValidToken -> pasar a una función o algo así
-   poner un condicional/switch en la página de verificación:
    -   hacer redirect
    -   mostrar una alerta
-   El server action de submit también valida el token. Validar si se usa una única función para validar el token en varios lugares
-   El form envía al server action un formData con datos como el referrer y el token como los demás campos. Averiguar si hay brechas de seguridad aquí
-   <input type="hidden" name="g-recaptcha-response" value="simulated-token" /> se puso quemado en el formulario
-   el action valida el captcha. Es mejor mover esta lógica a una función

-   npx shadcn@latest init
-   npx shadcn@latest add input

-   npm install react-hook-form
-   accesbilidad:
    -   los inputs usan role=alert y aria-invalid para faciliar la lectura de disposivios lectores de pantalla
-   Usar el referrer para un botón de atras (?)
-   poner algo de metadata en el rootlayout

i18n

-   https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing
-   captcha y hard reload: cambiar el lenguaje no bastó para que el capcha cambiara de idioma. La última alternativa fue hacer un router.refresh
-   mencionar intentos si refresh, con router.refresh y finalmente window.location.url
