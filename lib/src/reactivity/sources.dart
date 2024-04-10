@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:meta/meta.dart';
import 'package:svelte_js/src/ref.dart';
import 'package:svelte_js/src/types.dart';

@JS('source')
external Source<T> _source<T>(ExternalDartReference? value);

Source<T> source<T>([T? value]) {
  return _source<T>(ref(value));
}

@JS('mutate')
external ExternalDartReference? _mutate(
  Source source,
  ExternalDartReference? value,
);

V mutate<T, V>(Source<T> signal, V value) {
  return unref<V>(_mutate(signal, ref(value)));
}

@JS('set')
external ExternalDartReference? _set(
  Source source,
  ExternalDartReference? value,
);

@optionalTypeArgs
T set<T>(Source<T> source, T value) {
  return unref<T>(_set(source, ref(value)));
}
