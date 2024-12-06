@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:meta/meta.dart';
import 'package:svelte_js/src/ref.dart';
import 'package:svelte_js/src/runtime.dart';

@JS('spread_props')
external T spreadProperties<T extends JSObject>(JSObject properties);

@JS('prop')
external JSFunction _property(
  JSObject properties,
  String key,
  int flags, [
  ExternalDartReference? fallback,
]);

@optionalTypeArgs
T Function() property<T extends Object?>(
  JSObject properties,
  String key,
  int flags, [
  Object? fallback = undefined,
]) {
  JSFunction jsFunction;

  if (identical(fallback, undefined)) {
    jsFunction = _property(properties, key, flags);
  } else if (fallback == null) {
    jsFunction = _property(properties, key, flags, null);
  } else {
    jsFunction = _property(properties, key, flags, ref(fallback));
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
