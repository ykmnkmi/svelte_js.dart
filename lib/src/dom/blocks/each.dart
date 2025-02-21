@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:svelte_js/src/ref.dart';
import 'package:svelte_js/src/types.dart';
import 'package:web/web.dart';

JSAny index<T extends Object?>(T item, int index) {
  return index.toJS;
}

@JS('each')
external void _each(
  Node anchor,
  int flags,
  JSFunction collection,
  JSFunction key,
  JSFunction render, [
  JSFunction? fallback,
]);

void eachBlock<T extends Object?>(
  Node anchor,
  int flags,
  List<T> Function() collection,
  JSAny Function(T item, int index) key,
  //                                    `index` can be [Source].
  void Function(Node anchor, Value<T> item, int index) render, [
  void Function(Node anchor)? fallback,
]) {
  JSArray jsCollection() {
    return arrayRefCast<T>(collection());
  }

  JSAny jsKey(ExternalDartReference<T> item, int index) {
    return key(unref<T>(item), index);
  }

  if (fallback == null) {
    _each(anchor, flags, jsCollection.toJS, jsKey.toJS, render.toJS);
  } else {
    _each(
      anchor,
      flags,
      jsCollection.toJS,
      jsKey.toJS,
      render.toJS,
      fallback.toJS,
    );
  }
}
