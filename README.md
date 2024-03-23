Testing Svelte 5 JS bindings and ~~compiler~~.

Run `npm run build` to rebuild Svelte 5 JS bundle.

> [!Note]
> On the JS platform, all Dart values used in signals are not converted; instead, all values are cast from `T` to `JSAny?` and back.

> [!Note]
> On the WASM platform, all Dart values used in signals are boxed with `T.toJSBox` and unboxed with `boxed.toDart as T`.
