## 🛠 Status: Experimental
Testing Svelte 5 (legacy) JS bindings and ~~compiler~~ with new Dart
JS & WASM interoperability.

Hard to implement:
- Passing a Dart `List` reference to the JS side for data population.
- ...

Currently, all Dart code in the examples is not generated.
The compiler is not yet written.

Requires Dart 3.6 SDK with `Function.toJSCaptureThis` getter.
Download it from [dart.dev][get-dart] and extract it to the `.sdk` folder.
If you use VS Code and already have a Dart SDK installed, delete the SDK path
in the `.vscode/settings.json` file.

Run `npm run build` to rebuild the Svelte 5 JS bundle.