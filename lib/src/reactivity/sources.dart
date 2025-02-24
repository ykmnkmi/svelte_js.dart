@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:svelte_js/src/reactivity/signal.dart';
import 'package:svelte_js/src/ref.dart';
import 'package:svelte_js/src/runtime.dart';

import '' as self;

extension type State<T>._(JSObject _) implements Signal<T> {
  T call() {
    return get<T>(this);
  }

  T set(T newValue) {
    return self.set<T>(this, newValue);
  }

  void update(T Function(T value) callback) {
    set(
      untrack<T>(() {
        return callback(call());
      }),
    );
  }
}

@JS('state')
external State<T> _state<T extends Object?>(ExternalDartReference<T?> value);

State<T> state<T>(T value, [bool Function(T a, T? b) equals = identical]) {
  bool jsEquals(State<T?> self, ExternalDartReference<T> value) {
    return equals(unref<T>(value), unref<T?>(self.value));
  }

  State<T> state = _state<T>(ref<T>(value));
  state.equals = jsEquals.toJSCaptureThis;
  return state;
}

@JS('set')
external ExternalDartReference<T> _set<T>(
  State<T> source,
  ExternalDartReference<T> value,
);

T set<T>(State<T> source, T value) {
  return unref<T>(_set(source, ref<T>(value)));
}

extension<T> on State<T> {
  external JSFunction equals;

  @JS('v')
  external ExternalDartReference<T> value;
}
