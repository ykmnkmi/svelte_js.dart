## 🛠 Status: Experimental
Testing Svelte 5 JS bindings and ~~compiler~~ with new Dart JS & WASM  interoperability.

Hard to implement:
- Passing a Dart `List` reference to the JS side for data population.
- ...

Currently, all Dart code in the examples is not generated.
The compiler is not yet written.

Run `pnpm run build` to rebuild the Svelte 5 JS bundle.