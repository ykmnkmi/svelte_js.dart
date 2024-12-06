@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:svelte_js/src/reactivity/equality.dart';
import 'package:svelte_js/src/ref.dart';
import 'package:svelte_js/src/runtime.dart';
import 'package:svelte_js/src/types.dart';

@JS('source')
external Source<T> _source<T extends Object?>(ExternalDartReference? value);

Source<T> source<T extends Object?>([T? value]) {
  return _source<T>(ref(value));
}

@JS('mutable_state')
external Source<T> _mutableState<T extends Object?>(
  ExternalDartReference value,
);

Source<T> mutableState<T extends Object?>([Object? value = undefined]) {
  assert(value is T || identical(value, undefined));

  var source = _mutableState<T>(ref<Object?>(value));
  source.equals = safeEquals.toJSCaptureThis;
  return source;
}

@JS('mutate')
external ExternalDartReference<T> _mutate<S extends Object?, T extends Object?>(
  Source<S> source,
  ExternalDartReference<T> value,
);

T mutate<S extends Object?, T extends Object?>(Source<S> source, T value) {
  return unref<T>(_mutate<S, T>(source, ref<T>(value)));
}

@JS('set')
external ExternalDartReference<T> _set<T extends Object?>(
  Source<T> source,
  ExternalDartReference<T> value,
);

T set<T extends Object?>(Source<T> source, T value) {
  return unref<T>(_set(source, ref<T>(value)));
}
