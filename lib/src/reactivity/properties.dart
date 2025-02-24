@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:meta/meta.dart';
import 'package:svelte_js/src/ref.dart';

@JS('prop')
external JSFunction _property(
  JSObject properties,
  String key,
  int flags, [
  ExternalDartReference? fallback,
]);

@optionalTypeArgs
T Function() property<T>(
  JSObject properties,
  String key,
  int flags, [
  ExternalDartReference<T>? fallback,
]) {
  JSFunction jsFunction;

  if (fallback == null) {
    jsFunction = _property(properties, key, flags);
  } else {
    jsFunction = _property(properties, key, flags, fallback);
  }

  return () {
    var jsResult = jsFunction.callAsFunction();

    // in case if the property is a getter
    if (jsResult.isA<JSFunction>()) {
      var jsFunction2 = jsResult as JSFunction;
      jsResult = jsFunction2.callAsFunction();
    }

    // ignore: invalid_runtime_check_with_js_interop_types
    var jsResultRef = jsResult as ExternalDartReference<T>;
    return unref<T>(jsResultRef);
  };
}
