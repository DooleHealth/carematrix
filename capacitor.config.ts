import { CapacitorConfig } from '@capacitor/cli';


const config: CapacitorConfig = {
  appId: 'com.doole.inca',
  appName: 'INCA Health',
  bundledWebRuntime: false,
  webDir: "www",
  plugins: {
    SplashScreen: {
      launchShowDuration: 5000,
      androidScaleType: "CENTER_CROP"
    },
    CapacitorFirebaseAuth: {
      providers: [
        "google.com"
      ],
      languageCode: "es",
      nativeAuth: false,
      properties: {},
      permissions: {
        google: [
          "profile"
        ]
      }
    },
    LocalNotifications: {
      smallIcon: "ic_stat_circle_notifications",
      iconColor: "#009cb3",
      sound: "sound.mp3"
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
  },
  cordova: {
    staticPlugins: [
    "cordova-plugin-opentok"
  ]}
}

export default config;
