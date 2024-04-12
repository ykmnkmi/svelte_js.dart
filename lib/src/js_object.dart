@JS()
library;

import 'dart:js_interop';

import 'package:svelte_js/src/ref.dart';

extension on JSObject {
  external void operator []=(String name, ExternalDartReference? value);
}

void setProperty(JSObject object, String name, Object? value) {
  object[name] = ref(value);
}

void setGetter(JSObject object, String name, Object? Function() getter) {
  ExternalDartReference? jsGetter() {
    return ref(getter());
  }

  defineProperty(object, name, Descriptor(get: jsGetter.toJS));
}

extension type Descriptor._(JSObject _) implements JSObject {
  external factory Descriptor({
    bool configurable,
    bool enumerable,
    ExternalDartReference? value,
    bool writable,
    JSExportedDartFunction? get,
    JSExportedDartFunction? set,
  });
}

@JS('Object.defineProperty')
external void defineProperty(
  JSObject object,
  String name,
  Descriptor descriptor,
);
