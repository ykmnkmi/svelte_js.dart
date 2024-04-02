Testing Svelte 5 JS bindings and ~~compiler~~.

Run `npm run build` to rebuild Svelte 5 JS bundle.

Download the main channel Dart SDK (`^3.5.0`) from [dart.dev](https://dart.dev/get-dart) which supports `ExternalDartReference` and extract it to `.sdk` folder.

To build WASM module, run the following command:

- on Windows:
  ```pwsh
  .sdk\bin\dartaotruntime.exe .sdk\bin\snapshots\dart2wasm_product.snapshot --dart-sdk .sdk --platform .sdk\lib\_internal\dart2wasm_platform.dill --no-inlining .\web\main.dart .\web\main.dart.wasm
  ```

- on Linux:
  ```sh
  .sdk/bin/dartaotruntime .sdk/bin/snapshots/dart2wasm_product.snapshot --dart-sdk .sdk --platform .sdk/lib/_internal/dart2wasm_platform.dill --no-inlining ./web/main.dart ./web/main.dart.wasm
  ```
