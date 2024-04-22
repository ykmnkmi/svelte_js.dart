@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:meta/meta.dart';
import 'package:svelte_js/src/ref.dart';
import 'package:svelte_js/src/types.dart';

@JS('source')
external Source<T> _source<T extends Object?>(ExternalDartReference? value);

Source<T> source<T extends Object?>([T? value]) {
  return _source<T>(ref(value));
}

@JS('mutable_source')
external Source<T> _mutableSource<T extends Object?>(ExternalDartReference? value);

Source<T> mutableSource<T extends Object?>([T? value]) {
  return _mutableSource<T>(ref(value));
}

@JS('mutate')
external ExternalDartReference? _mutate(
  Source source,
  ExternalDartReference? value,
);

T mutate<T extends Object?>(Source signal, T value) {
  return unref<T>(_mutate(signal, ref(value)));
}

@JS('set')
external ExternalDartReference? _set(
  Source source,
  ExternalDartReference? value,
);

@optionalTypeArgs
T set<T extends Object?>(Source<T> source, T value) {
  return unref<T>(_set(source, ref(value)));
}
