@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:svelte_js/src/ref.dart';
import 'package:svelte_js/src/types.dart';
import 'package:web/web.dart';

@JS('each_keyed')
external void _eachKeyed(
  Node anchor,
  JSExportedDartFunction collection,
  JSNumber flags,
  JSExportedDartFunction? key,
  JSExportedDartFunction render,
  JSExportedDartFunction? fallback,
);

void eachKeyedBlock<T>(
  Node anchor,
  List<T> Function() collection,
  int flags,
  String Function(T item)? key,
  void Function(Node? anchor, Value<T> item, int index) render,
  void Function(Node $anchor)? fallback,
) {
  JSArray jsCollection() {
    return arrayRefCast<T>(collection());
  }

  JSExportedDartFunction? jsKey;

  if (key != null) {
    JSString map(ExternalDartReference? item, JSNumber index, JSArray list) {
      var value = key(unref<T>(item));
      return value.toJS;
    }

    jsKey = map.toJS;
  }

  void jsRender(Node? anchor, Value<T> item, JSNumber index) {
    render(anchor, item, index.toDartInt);
  }

  _eachKeyed(anchor, jsCollection.toJS, flags.toJS, jsKey, jsRender.toJS,
      fallback?.toJS);
}

@JS('each_indexed')
external void _eachIndexed(
  Node anchor,
  JSExportedDartFunction collection,
  JSNumber flags,
  JSExportedDartFunction render,
  JSExportedDartFunction? fallback,
);

void eachIndexedBlock<T>(
  Node anchor,
  List<T> Function() collection,
  int flags,
  void Function(Node? anchor, Value<T> item, int index) render,
  void Function(Node $anchor)? fallback,
) {
  JSArray jsCollection() {
    return arrayRefCast<T>(collection());
  }

  void jsRender(Node? anchor, Value<T> item, JSNumber index) {
    render(anchor, item, index.toDartInt);
  }

  _eachIndexed(
      anchor, jsCollection.toJS, flags.toJS, jsRender.toJS, fallback?.toJS);
}
