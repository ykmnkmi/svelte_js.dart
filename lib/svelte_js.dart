@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:svelte_js/src/ref.dart';

export 'package:svelte_js/src/dom/elements/events.dart' show ComponentEvent;
export 'package:svelte_js/src/render.dart' show Component, ComponentReference, mount, unmount;

typedef EventDispatcher = bool Function(
  String type,
  Object? detail, {
  bool cancelable,
});

@JS('createEventDispatcher')
external JSFunction _createEventDispatcher();

@anonymous
extension type _EventDispatcher._(JSObject _) implements JSObject {
  external factory _EventDispatcher({bool cancelable});
}

EventDispatcher createEventDispatcher() {
  var jsFunction = _createEventDispatcher();

  return (
    String type,
    Object? detail, {
    bool bubbles = false,
    bool cancelable = false,
  }) {
    var jsResult = jsFunction.callAsFunction(
      null,
      type.toJS,
      // ignore: invalid_runtime_check_with_js_interop_types
      ref(detail) as JSAny?,
      _EventDispatcher(cancelable: cancelable),
    ) as JSBoolean;

    return jsResult.toDart;
  };
}
