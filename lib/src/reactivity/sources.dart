@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:svelte_js/src/ref.dart';
import 'package:svelte_js/src/types.dart';

@JS('source')
external Source<T> _source<T extends Object?>(ExternalDartReference? value);

Source<T> source<T extends Object?>([T? value]) {
  return _source<T>(ref(value));
}

@JS('mutable_source')
external Source<T> _mutableSource<T extends Object?>(
  ExternalDartReference? value,
);

Source<T> mutableSource<T extends Object?>([T? value]) {
  return _mutableSource<T>(ref(value));
}

@JS('mutate')
external ExternalDartReference? _mutate<S extends Object?, T extends Object?>(
  Source<S> source,
  ExternalDartReference? value,
);

T mutate<S extends Object?, T extends Object?>(Source<S> signal, T value) {
  return unref<T>(_mutate<S, T>(signal, ref(value)));
}

@JS('set')
external ExternalDartReference? _set<T extends Object?>(
  Source<T> source,
  ExternalDartReference? value,
);

T set<T extends Object?>(Source<T> source, T value) {
  return unref<T>(_set(source, ref(value)));
}
