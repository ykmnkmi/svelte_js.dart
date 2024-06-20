@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:meta/meta.dart';
import 'package:svelte_js/src/ref.dart';
import 'package:svelte_js/src/unsafe_cast.dart';
import 'package:web/web.dart';

@optionalTypeArgs
extension type ComponentEvent<T>(CustomEvent _) implements CustomEvent {
  T get detail {
    return unref<T>(unsafeCast<ExternalDartReference?>(_.detail));
  }
}

@JS('event')
external void _event(
  String eventName,
  Node node,
  JSFunction handler,
  bool capture,
  bool passive,
);

void event<T extends Event>(
  String eventName,
  Node node,
  void Function(T) handler,
  bool capture, [
  bool passive = false,
]) {
  _event(eventName, node, handler.toJS, capture, passive);
}
