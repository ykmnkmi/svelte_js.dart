@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:svelte_js/src/ref.dart';
import 'package:svelte_js/src/types.dart';
import 'package:svelte_js/src/unsafe_cast.dart';
import 'package:web/web.dart';

@JS('await_block')
external void _awaitBlock(
  Node anchor,
  JSFunction input,
  JSFunction? onLoading,
  JSFunction? onValue,
  JSFunction? onError,
);

void awaitBlock<T>(
  Comment anchor,
  Future<T> Function() input,
  void Function(Node anchor)? onPending,
  void Function(Node anchor, Value<T> value)? onValue,
  void Function(Node anchor, Value<Object> error)? onError,
) {
  JSPromise jsInput() {
    return JSPromise(
      (JSFunction resolve, JSFunction reject) {
        input()
            .then((value) {
              resolve.callAsFunction(null, unsafeCast<JSAny?>(ref<T>(value)));
            })
            .catchError((Object error) {
              reject.callAsFunction(
                null,
                unsafeCast<JSAny?>(ref<Object>(error)),
              );
            });
      }.toJS,
    );
  }

  _awaitBlock(
    anchor,
    jsInput.toJS,
    onPending?.toJS,
    onValue?.toJS,
    onError?.toJS,
  );
}
