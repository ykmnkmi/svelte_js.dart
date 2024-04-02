@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:svelte_js/src/ref.dart';
import 'package:svelte_js/src/types.dart';

@JS('get')
external ExternalDartReference? _get(JSObject signal);

T get<T extends Object?>(Value<T> signal) {
  return unref<T>(_get(signal));
}

@JS('push')
external void _push(JSObject properties, JSBoolean runes);

void push<T extends JSObject>(T properties, bool runes) {
  _push(properties, runes.toJS);
}

@JS('set_getter')
external JSVoid _setGetter(
    JSObject object, JSString key, JSExportedDartFunction getter);

void setGetter<T>(JSObject object, String key, T Function() getter) {
  ExternalDartReference? jsGetter() {
    return ref<T>(getter());
  }

  _setGetter(object, key.toJS, jsGetter.toJS);
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
