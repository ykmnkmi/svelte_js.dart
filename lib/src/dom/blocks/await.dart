@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:svelte_js/src/ref.dart';
import 'package:web/web.dart';

@JS('await_block')
external void _awaitBlock(
  Comment anchor,
  JSExportedDartFunction input,
  JSExportedDartFunction? onLoading,
  JSExportedDartFunction? onValue,
  JSExportedDartFunction? onError,
);

void awaitBlock<T>(
  Comment anchor,
  Future<T> Function() input,
  void Function(Node anchor)? onPending,
  void Function(Node anchor, T value)? onValue,
  void Function(Node anchor, Object error)? onError,
) {
  JSPromise jsInput() {
    return futureRefCast<T>(input());
  }

  JSExportedDartFunction? jsOnValue;

  if (onValue != null) {
    jsOnValue = (Node anchor, ExternalDartReference? value) {
      onValue(anchor, unref<T>(value));
    }.toJS;
  }

  JSExportedDartFunction? jsOnError;

  if (onError != null) {
    jsOnError = (Node anchor, JSObject wrappedError) {
      onError(anchor, wrappedError.error);
    }.toJS;
  }

  _awaitBlock(anchor, jsInput.toJS, onPending?.toJS, jsOnValue, jsOnError);
}

extension on JSObject {
  @JS('error')
  external JSBoxedDartObject get _error;

  Object get error {
    return _error.toDart;
  }
}
