@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:meta/meta.dart';
import 'package:svelte_js/src/ref.dart';
import 'package:svelte_js/src/types.dart';

final class _Undefined {
  const _Undefined();
}

const Object undefined = _Undefined();

@JS('get')
external ExternalDartReference<T> _get<T extends Object?>(Value<T> signal);

@optionalTypeArgs
T get<T extends Object?>(Value<T> signal) {
  return unref<T>(_get<T>(signal));
}

@JS('push')
external void push(JSObject properties, bool runes);

@JS('pop')
external void pop();
