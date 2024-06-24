@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:svelte_js/src/ref.dart';

@JS('getter')
external JSFunction getter(JSAny? value);

@JS('set_property')
external void _setProperty(JSObject object, String name, ExternalDartReference? value);

void setProperty(JSObject object, String name, Object? value) {
  _setProperty(object, name, ref(value));
}

@JS('set_getter')
external void _setGetter(JSObject object, String name, JSFunction getter);

void setGetter(
  JSObject object,
  String name,
  ExternalDartReference? Function() getter,
) {
  _setGetter(object, name, getter.toJS);
}
