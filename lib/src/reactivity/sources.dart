@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:svelte_js/src/types.dart';
import 'package:svelte_js/src/unsafe_cast.dart';

@JS('mutable_source')
external JSObject _mutableSource(JSAny? initialValue);

Source<T> mutableSource<T extends Object?>([T? initialValue]) {
  var jsInitialValue = unsafeCast<JSAny?>(initialValue);
  return unsafeCast<Source<T>>(_mutableSource(jsInitialValue));
}

@JS('mutate')
external JSAny? _mutate(JSObject signal, JSAny? value);

V mutate<T extends Object?, V extends Object?>(Source<T> signal, V value) {
  var jsValue = unsafeCast<JSAny?>(value);
  return unsafeCast<V>(_mutate(signal, jsValue));
}

@JS('set')
external JSAny? _set(JSObject signal, JSAny? value);

T set<T extends Object?>(Source<T> signal, T value) {
  var jsValue = unsafeCast<JSAny?>(value);
  return unsafeCast<T>(_set(signal, jsValue));
}
