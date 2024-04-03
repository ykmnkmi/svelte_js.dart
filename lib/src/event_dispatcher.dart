@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:meta/meta.dart';
import 'package:svelte_js/src/ref.dart';
import 'package:svelte_js/src/unsafe_cast.dart';

extension type _DispatchOptions._(JSObject _) implements JSObject {
  external factory _DispatchOptions({JSBoolean cancelable});
}

@JS('createEventDispatcher')
external JSFunction _createEventDispatcher();

@optionalTypeArgs
typedef EventDispatcher<T> = bool Function(
  String type,
  T details, [
  bool cancelable,
]);

@optionalTypeArgs
EventDispatcher<T> createEventDispatcher<T>() {
  var jsDispatcher = _createEventDispatcher();

  return (String type, T details, [bool cancelable = false]) {
    var jsResult = jsDispatcher.callAsFunction(
        null,
        type.toJS,
        unsafeCast<JSAny?>(ref(details)),
        _DispatchOptions(cancelable: cancelable.toJS));
    assert(jsResult.isA<JSBoolean>());

    var jsValue = unsafeCast<JSBoolean>(jsResult);
    return jsValue.toDart;
  };
}
