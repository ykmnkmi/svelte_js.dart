Testing Svelte 5 JS bindings and ~~compiler~~.

To rebuild Svelte 5 JS bundle, run `npm run build`.

Download Dart SDK from [dart.dev](https://dart.dev/get-dart) which supports `ExternalDartReference` and extract it to `.sdk` folder.
If you have Dart SDK installed, update the path below and delete SDK path in `.vscode/settings.json` file.

To rebuild WASM module, run the following command `dart compile wasm web/main.dart`
