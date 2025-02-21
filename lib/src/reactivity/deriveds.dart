@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:svelte_js/src/reactivity/equality.dart';
import 'package:svelte_js/src/reactivity/signal.dart';
import 'package:svelte_js/src/ref.dart';
import 'package:svelte_js/src/runtime.dart';

extension type Derived<T>._(JSObject _) implements Signal<T> {
  T call() {
    return get<T>(this);
  }
}

@JS('derived')
external Derived<T> _derived<T>(JSExportedDartFunction update);

Derived<T> derived<T>(T Function() update) {
  ExternalDartReference<T> jsUpdate() {
    return ref<T>(update());
  }

  Derived<T> derived = _derived<T>(jsUpdate.toJS);
  derived.value = null.toExternalReference;
  derived.equals = safeEquals<T>.toJSCaptureThis;
  return derived;
}

extension<T> on Derived<T> {
  @JS('v')
  external set value(ExternalDartReference<T?> value);

  external JSFunction equals;
}
