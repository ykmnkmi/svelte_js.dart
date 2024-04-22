@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:svelte_js/src/ref.dart';
import 'package:svelte_js/src/types.dart';
import 'package:web/web.dart';

String index<T extends Object?>(T item, int index) {
  return '$index';
}

@JS('each')
external void _each(
  Node anchor,
  int flags,
  JSExportedDartFunction collection,
  JSExportedDartFunction key,
  JSExportedDartFunction render,
  JSExportedDartFunction? fallback,
);

void eachBlock<T extends Object?>(
  Node anchor,
  int flags,
  List<T> Function() collection,
  String Function(T item, int index) key,
  void Function(Node anchor, Value<T> item, int index) render, [
  void Function(Node anchor)? fallback,
]) {
  JSArray jsCollection() {
    return arrayRefCast<T>(collection());
  }

  String jsKey(ExternalDartReference? item, int index) {
    return key(unref<T>(item), index);
  }

  _each(
    anchor,
    flags,
    jsCollection.toJS,
    jsKey.toJS,
    render.toJS,
    fallback?.toJS,
  );
}
