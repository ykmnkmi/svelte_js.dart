@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:svelte_js/src/types.dart';
import 'package:svelte_js/src/unsafe_cast.dart';
import 'package:web/web.dart';

@JS('each_keyed')
external void _eachKeyed(
  Node anchor,
  JSFunction collection,
  JSNumber flags,
  JSFunction? key,
  JSFunction render,
  JSFunction? fallback,
);

void eachKeyedBlock<T extends Object?>(
  Node anchor,
  List<T> Function() collection,
  int flags,
  Object Function(T item, int index, List<T> list)? key,
  void Function(Node? anchor, Value<T> item, int index) render,
  void Function(Node $anchor)? fallback,
) {
  JSArray jsCollection() {
    var list = unsafeCast<List<JSAny?>>(collection());
    return list.toJS;
  }

  void jsRender(Node? anchor, JSObject item, JSNumber index) {
    render(anchor, unsafeCast<Value<T>>(item), index.toDartInt);
  }

  JSExportedDartFunction? jsKey;

  if (key != null) {
    jsKey = (JSAny? item, JSNumber index, JSArray list) {
      return unsafeCast<JSAny?>(key(
        unsafeCast<T>(item),
        index.toDartInt,
        unsafeCast<List<T>>(list.toDart),
      ));
    }.toJS;
  }

  _eachKeyed(anchor, jsCollection.toJS, flags.toJS, jsKey, jsRender.toJS, fallback?.toJS);
}

@JS('each_indexed')
external void _eachIndexed(
  Node anchor,
  JSFunction collection,
  JSNumber flags,
  JSFunction render,
  JSFunction? fallback,
);

void eachIndexedBlock<T extends Object?>(
  Node anchor,
  List<T> Function() collection,
  int flags,
  void Function(Node? anchor, Value<T> item, int index) render,
  void Function(Node $anchor)? fallback,
) {
  JSArray jsCollection() {
    var list = unsafeCast<List<JSAny?>>(collection());
    return list.toJS;
  }

  void jsRender(Node? anchor, JSObject item, JSNumber index) {
    render(anchor, unsafeCast<Value<T>>(item), index.toDartInt);
  }

  _eachIndexed(anchor, jsCollection.toJS, flags.toJS, jsRender.toJS, fallback?.toJS);
}
