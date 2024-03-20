@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:svelte_js/src/types.dart';
import 'package:svelte_js/src/unsafe_cast.dart';

@JS('get')
external JSAny? _get(JSObject signal);

T get<T extends Object?>(Value<T> signal) {
  return unsafeCast<T>(_get(signal));
}

@JS('push')
external void _push(JSObject properties, JSBoolean runes);

void push<T extends JSObject>(T properties, bool runes) {
  _push(properties, runes.toJS);
}

@JS('pop')
external void _pop([JSObject properties]);

void pop<T extends JSObject>([T? properties]) {
  if (properties == null) {
    _pop();
  } else {
    _pop(properties);
  }
}
