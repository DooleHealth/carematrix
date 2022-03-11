# DooleHealth APP 

## Contiene:
- Ionic 5 y Capacitor
- Interceptores de errores, respuestas de API (fakebackend), errores de servidor y timeouts
- Servicios de notificacion a usuarios, redes, multi idioma, manejo de errores, logging de errores
- Integracion con Firebase, Google Fit y Apple Health
- Contenedor Docker de desarrollo
- Guards de autenticacion 
- Componentes Web
- Plugins para fotos/imagenes, opentok, autenticacion biometrica, redes sociales, calendarios y coneccion a la red.

## Instalar dependencias y plugins:
npm install && npx cap sync
## Ejecutar en web:
ionic serve
## Ejecutar en XCode;
npm run build;npx cap sync; npx cap copy ios;npx cap open ios
## Ejecutar en Android Studio
npm run build;npx cap sync; npx cap copy android;npx cap open android
## Firebase Config 
environment.ts

## Error Android “error: package android.support.v4.content does not exist”
npm install jetifier
npx jetify
npx cap sync android

## Deploy APP en Firebase:
https://ionicframework.com/docs/angular/pwa
# Para apagar el servidor: firebase hosting:disable deneb-65a05