@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:svelte_js/src/ref.dart';
import 'package:svelte_js/src/types.dart';
import 'package:svelte_js/src/unsafe_cast.dart';

@JS('mutable_source')
external JSObject _mutableSource(ExternalDartReference? initialValue);

Source<T> mutableSource<T extends Object?>([T? initialValue]) {
  return unsafeCast<Source<T>>(_mutableSource(ref<T?>(initialValue)));
}

@JS('mutate')
external ExternalDartReference? _mutate(
    JSObject signal, ExternalDartReference? value);

V mutate<T extends Object?, V extends Object?>(Source<T> signal, V value) {
  return unref<V>(_mutate(signal, ref<V>(value)));
}

@JS('set')
external ExternalDartReference? _set(
    JSObject signal, ExternalDartReference? value);

T set<T extends Object?>(Source<T> signal, T value) {
  return unref<T>(_set(signal, ref<T>(value)));
}
