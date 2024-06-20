@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:svelte_js/src/ref.dart';
import 'package:svelte_js/src/unsafe_cast.dart';

export 'package:svelte_js/src/dom/elements/events.dart' show ComponentEvent;
export 'package:svelte_js/src/render.dart' show Component, ComponentReference, mount, unmount;

typedef EventDispatcher = bool Function(
  String type,
  Object? detail, {
  bool bubbles,
  bool cancelable,
});

@JS('createEventDispatcher')
external JSFunction _createEventDispatcher();

@anonymous
extension type _EventDispatcher._(JSObject _) implements JSObject {
  external factory _EventDispatcher({bool bubbles, bool cancelable});
}

EventDispatcher createEventDispatcher() {
  var jsFunction = _createEventDispatcher();

  return (
    String type,
    Object? detail, {
    bool bubbles = false,
    bool cancelable = false,
  }) {
    var jsOptions = _EventDispatcher(bubbles: bubbles, cancelable: cancelable);
    var jsDetail = unsafeCast<JSAny?>(ref(detail));
    var jsResult = jsFunction.callAsFunction(null, type.toJS, jsDetail, jsOptions);
    var jsBool = jsResult as JSBoolean;
    return jsBool.toDart;
  };
}
