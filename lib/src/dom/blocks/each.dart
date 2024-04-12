@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:svelte_js/src/ref.dart';
import 'package:svelte_js/src/types.dart';
import 'package:web/web.dart';

@JS('each_keyed')
external void _eachKeyedBlock(
  Node anchor,
  int flags,
  JSExportedDartFunction collection,
  JSExportedDartFunction key,
  JSExportedDartFunction render,
  JSExportedDartFunction? fallback,
);

void eachKeyedBlock<T>(
  Node anchor,
  int flags,
  List<T> Function() collection,
  String Function(T item) key,
  void Function(Node anchor, Value<T> item, int index) render, [
  void Function(Node anchor)? fallback,
]) {
  JSArray jsCollection() {
    return arrayRefCast<T>(collection());
  }

  String jsKey(ExternalDartReference? item, int index, JSArray list) {
    var value = key(unref<T>(item));
    return value;
  }

  _eachKeyedBlock(
    anchor,
    flags,
    jsCollection.toJS,
    jsKey.toJS,
    render.toJS,
    fallback?.toJS,
  );
}

@JS('each_indexed')
external void _eachIndexedBlock(
  Node anchor,
  int flags,
  JSExportedDartFunction collection,
  JSExportedDartFunction render,
  JSExportedDartFunction? fallback,
);

void eachIndexedBlock<T>(
  Node anchor,
  int flags,
  List<T> Function() collection,
  void Function(Node anchor, Value<T> item, int index) render, [
  void Function(Node anchor)? fallback,
]) {
  JSArray jsCollection() {
    return arrayRefCast<T>(collection());
  }

  _eachIndexedBlock(
    anchor,
    flags,
    jsCollection.toJS,
    render.toJS,
    fallback?.toJS,
  );
}
