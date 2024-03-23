@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:svelte_js/src/unsafe_cast.dart';
import 'package:web/web.dart';

@JS('await_block')
external void _awaitBlock(
  Comment anchor,
  JSFunction input,
  JSFunction? onLoading,
  JSFunction? onValue,
  JSFunction? onError,
);

void awaitBlock<T extends Object?>(
  Comment anchor,
  Future<T> Function() input,
  void Function(Node anchor)? onPending,
  void Function(Node anchor, T value)? onValue,
  void Function(Node anchor, Object error)? onError,
) {
  JSPromise<JSAny?> jsInput() {
    var future = unsafeCast<Future<JSAny?>>(input());
    return future.toJS;
  }

  JSExportedDartFunction? jsOnValue;

  if (onValue != null) {
    jsOnValue = (Node anchor, JSAny? value) {
      onValue(anchor, unsafeCast<T>(value));
    }.toJS;
  }

  JSExportedDartFunction? jsOnError;

  if (onError != null) {
    jsOnError = (Node anchor, JSAny? value) {
      onError(anchor, unsafeCast<Object>(value));
    }.toJS;
  }

  _awaitBlock(anchor, jsInput.toJS, onPending?.toJS, jsOnValue, jsOnError);
}
