@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:web/web.dart';

@JS('event')
external void _event(
  JSString eventName,
  Element dom,
  JSFunction handler,
  JSBoolean capture, [
  JSBoolean passive,
]);

void event<T extends Event>(
  String eventName,
  Element dom,
  void Function(T event) handler,
  bool capture, [
  bool passive = false,
]) {
  _event(eventName.toJS, dom, handler.toJS, capture.toJS, passive.toJS);
}
