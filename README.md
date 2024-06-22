## 🛠 Status: Experimental
Testing Svelte 5 (Svelte 4 syntax) JS bindings and ~~compiler~~ with new Dart
JS & WASM interopability.

Hard to implement:
- Passing a Dart List reference to the JS side to fill it with data.
- ...

Currently, all Dart code in the examples is not yet generated, compiler is not
yet written.

To rebuild Svelte 5 JS bundle, run `npm run build`.

Download Dart SDK from [dart.dev](https://dart.dev/get-dart) which supports
`ExternalDartReference` and extract it to `.sdk` folder. If you have Dart SDK
installed, delete SDK path in `.vscode/settings.json` file.

To rebuild WASM module, run the following command
`dart compile wasm .\web\main.dart`.
