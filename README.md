Testing Svelte 5 JS bindings and ~~compiler~~.

To rebuild Svelte 5 JS bundle, run `npm run build`.

Download Dart SDK from [dart.dev](https://dart.dev/get-dart) which supports `ExternalDartReference` and extract it to `.sdk` folder.
If you have Dart SDK installed, update the path below and delete SDK path in `.vscode/settings.json` file.

To rebuild WASM module, run the following command:

- on Windows:
  ```pwsh
  .sdk\bin\dartaotruntime.exe .sdk\bin\snapshots\dart2wasm_product.snapshot --dart-sdk .sdk --platform .sdk\lib\_internal\dart2wasm_platform.dill --no-inlining .\web\main.dart .\web\main.dart.wasm
  ```

- on Linux:
  ```sh
  .sdk/bin/dartaotruntime .sdk/bin/snapshots/dart2wasm_product.snapshot --dart-sdk .sdk --platform .sdk/lib/_internal/dart2wasm_platform.dill --no-inlining ./web/main.dart ./web/main.dart.wasm
  ```
