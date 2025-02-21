@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:meta/dart2js.dart';
import 'package:web/web.dart';

@JS('event')
external void _event(
  String eventName,
  Node node,
  JSFunction handler, [
  bool? capture,
  bool? passive,
]);

@tryInline
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
