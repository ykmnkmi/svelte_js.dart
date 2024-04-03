@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:svelte_js/src/ref.dart';
import 'package:svelte_js/src/types.dart';

@JS('get')
external ExternalDartReference? _get(JSObject signal);

T get<T>(Value<T> signal) {
  return unref<T>(_get(signal));
}

@JS('push')
external void _push<T extends JSObject>(T properties, JSBoolean runes);

void push<T extends JSObject>(T properties, bool runes) {
  _push<T>(properties, runes.toJS);
}

@JS('set_getter')
external void _setGetter(
    JSObject object, JSString key, JSExportedDartFunction getter);

void setGetter<T>(JSObject object, String key, T Function() getter) {
  ExternalDartReference? jsGetter() {
    return ref(getter());
  }

  _setGetter(object, key.toJS, jsGetter.toJS);
}

@JS('pop')
external void _pop<T extends JSObject>([JSObject properties]);

void pop<T extends JSObject>([T? properties]) {
  if (properties == null) {
    _pop<T>();
  } else {
    _pop<T>(properties);
  }
}
