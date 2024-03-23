@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:svelte_js/src/unsafe_cast.dart';

extension type _DispatchOptions._(JSObject _) implements JSObject {
  external factory _DispatchOptions({bool cancelable});
}

@JS('createEventDispatcher')
external JSFunction _createEventDispatcher();

typedef EventDispatcher<T extends Object?> = bool Function(
  String type,
  T details, [
  bool cancelable,
]);

EventDispatcher<T> createEventDispatcher<T extends Object?>() {
  var jsDispatcher = _createEventDispatcher();

  return (String type, T details, [bool cancelable = false]) {
    var jsValue = jsDispatcher.callAsFunction(
      null,
      type.toJS,
      unsafeCast<JSAny?>(details),
      _DispatchOptions(cancelable: cancelable),
    ) as JSBoolean;
    return jsValue.toDart;
  };
}
