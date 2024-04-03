@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:svelte_js/src/ref.dart';
import 'package:svelte_js/src/types.dart';

@JS('mutable_source')
external JSObject _mutableSource<T>(ExternalDartReference? initialValue);

Source<T> mutableSource<T>([T? initialValue]) {
  return Source<T>(_mutableSource<T>(ref(initialValue)));
}

@JS('mutate')
external ExternalDartReference? _mutate<T>(
    Source<T> signal, ExternalDartReference? value);

V mutate<T, V>(Source<T> signal, V value) {
  return unref<V>(_mutate(signal, ref(value)));
}

@JS('set')
external ExternalDartReference? _set<T>(
    Source<T> signal, ExternalDartReference? value);

T set<T>(Source<T> signal, T value) {
  return unref<T>(_set(signal, ref(value)));
}
