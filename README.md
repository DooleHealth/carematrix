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
1. npm install jetifier
2. npx jetify
3. npx cap sync android

## Deploy APP en Firebase:
https://ionicframework.com/docs/angular/pwa

1. Ejecutar npm install para instalar @angular/pwa y firebase-tools
2. Compilar con **ionic build --prod**
3. Autenticarse (cuenta de google configurada en firebase) ejecutando: **firebase login** 
4. Iniciar con **firebase init** y configurar:  

>"Which Firebase CLI features do you want to set up for this folder?" Choose "Hosting: Configure and deploy Firebase Hosting sites."
>"Select a default Firebase project for this directory:" Choose the project you created on the Firebase website. (deneb-65a05)
>"What do you want to use as your public directory?" Enter "www".

5. Deploy: **firebase deploy**
## Desactivar el deploy: 
```firebase hosting:disable deneb-65a05```

## En caso de reinstalar los plugins de capacitor
###### Reemplazar el código en node_modules/@capacitor/android/capacitor/src/main/java/com/getcapacitor/CapacitorFirebaseMessagingService.java para poder recibir llamadas aún cuando la app este cerrada:
```
package com.getcapacitor;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.telecom.PhoneAccount;
import android.telecom.PhoneAccountHandle;
import android.telecom.TelecomManager;
import android.util.Log;
import com.getcapacitor.plugin.PushNotifications;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

public class CapacitorFirebaseMessagingService extends FirebaseMessagingService {
  public static final String LOG_TAG = "onMessageReceived";

  @Override
  public void onNewToken(String newToken) {
    super.onNewToken(newToken);
    PushNotifications.onNewToken(newToken);
  }

  @Override
  public void onMessageReceived(RemoteMessage remoteMessage) {

    String from = remoteMessage.getFrom();
    Log.d(LOG_TAG, "getData: " + remoteMessage.getData());
    Log.d(LOG_TAG, "getVoip: " + (remoteMessage.getData().get("voip")));

    if (PushNotifications.getPushNotificationsInstance() == null) {
      displayCallUI(remoteMessage);
    }else{
      super.onMessageReceived(remoteMessage);
      PushNotifications.sendRemoteMessage(remoteMessage);
    }

  }

  public void displayCallUI(RemoteMessage remoteMessage){
    TelecomManager tm = (TelecomManager) getSystemService(Context.TELECOM_SERVICE);
    if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M) {
      try {
        final String phoneAccountLabel = "Doole";
        PhoneAccountHandle phoneAccountHandle = new PhoneAccountHandle(
                new ComponentName(this.getApplicationContext(), Class.forName("com.doole.doole.DooleConnectionService")),
                phoneAccountLabel);

        PhoneAccount phoneAccount = PhoneAccount.builder(phoneAccountHandle, phoneAccountLabel).setCapabilities(PhoneAccount.CAPABILITY_CALL_PROVIDER).setCapabilities(PhoneAccount.CAPABILITY_CONNECTION_MANAGER).setCapabilities(PhoneAccount.CAPABILITY_SELF_MANAGED).build();
        tm.registerPhoneAccount(phoneAccount);
        PhoneAccount phoneAccountCheck = tm.getPhoneAccount(phoneAccountHandle);

        if (phoneAccountCheck == null) {
          Log.d(LOG_TAG, "phoneAccountCheck() IS NULL ");
        }
        Bundle extras = new Bundle();

        Uri uri = Uri.fromParts(PhoneAccount.SCHEME_TEL, "Doole", null);
        extras.putParcelable(TelecomManager.EXTRA_INCOMING_CALL_ADDRESS, uri);
        extras.putParcelable(TelecomManager.EXTRA_PHONE_ACCOUNT_HANDLE, phoneAccountHandle);
        tm.addNewIncomingCall(phoneAccountHandle, extras);
        this.startMain(remoteMessage);

      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      }

    }
  }

  public void startMain(RemoteMessage remoteMessage){
    try{
      Intent startIntent = new Intent(this, Class.forName("com.doole.doole.MainActivity"));
      startIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
      startIntent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);

      this.startActivity(startIntent);
      PushNotifications pushPlugin = PushNotifications.getPushNotificationsInstance();
      super.onMessageReceived(remoteMessage);
      PushNotifications.sendRemoteMessage(remoteMessage);
      Log.d(LOG_TAG, "- startActivity");
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
```