@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:meta/meta.dart';
import 'package:svelte_js/src/ref.dart';
import 'package:svelte_js/src/types.dart';

@JS('get')
external ExternalDartReference? _get(Value signal);

@optionalTypeArgs
T get<T>(Value<T> signal) {
  return unref<T>(_get(signal));
}

@JS('push')
external void push(JSObject properties, bool runes);

@JS('pop')
external void pop();
