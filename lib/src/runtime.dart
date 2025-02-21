@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:meta/dart2js.dart';
import 'package:meta/meta.dart';
import 'package:svelte_js/src/reactivity/signal.dart';
import 'package:svelte_js/src/ref.dart';

@JS('get')
external ExternalDartReference<T> _get<T>(Signal<T> signal);

@optionalTypeArgs
@tryInline
T get<T>(Signal<T> signal) {
  return unref<T>(_get<T>(signal));
}

@JS()
external void push<T extends JSObject>(T properties, bool runes);

@JS()
external void pop();
