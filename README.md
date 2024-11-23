# Information

Dies ist eine klientseitige App um Bilder daraufhin zu überprüfen, ob ein Hund oder eine Katze drin enthalten ist. Diese App wurde mit React Native und Expo erstellt.
Diese App interagiert mit dem  Gunicorn Python Webserver aus dem CatDogImageClassifierServer Repo. Dieser muss daher irgendwo gestartet werden und seine URL muss unter
**/config/conf.js** eingetragen werden für: **API_URL**.

## Schritte

1. Installieren der Dependencies

   ```bash
   npm install
   ```

2. Die App starten

   ```bash
    npx expo start
   ```

Nachfolgend Informationen um die App in verschiedenen Umgebungen auszufuehren:

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)


