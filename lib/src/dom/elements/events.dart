@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:meta/meta.dart';
import 'package:svelte_js/src/ref.dart';
import 'package:web/web.dart';

@optionalTypeArgs
extension type ComponentEvent<T>(CustomEvent _) implements CustomEvent {
  T get detail {
    // ignore: invalid_runtime_check_with_js_interop_types
    var detailRefref = _.detail as ExternalDartReference<T>;
    return unref<T>(detailRefref);
  }
}

@JS('event')
external void _event(
  String eventName,
  Node node,
  JSFunction handler, [
  bool? capture,
  bool? passive,
]);

void event<T extends Event>(
  String eventName,
  Node node,
  void Function(T event) handler, [
  bool? capture,
  bool? passive,
]) {
  if (capture == null) {
    _event(eventName, node, handler.toJS);
  } else if (passive == null) {
    _event(eventName, node, handler.toJS, capture);
  } else {
    _event(eventName, node, handler.toJS, capture, passive);
  }
}
