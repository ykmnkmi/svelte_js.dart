@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:svelte_js/src/ref.dart';
import 'package:svelte_js/src/unsafe_cast.dart';

@JS('spread_props')
external T _spreadProperties<T extends JSObject>(
  JSObject first, [
  JSObject second,
]);

T spreadProperties<T extends JSObject>(JSObject first, [JSObject? second]) {
  if (second == null) {
    return _spreadProperties<T>(first);
  }

  return _spreadProperties<T>(first, second);
}

@JS('prop')
external JSFunction _prop(
  JSObject properties,
  String key,
  int flags,
  ExternalDartReference? value,
);

T Function() prop<T>(JSObject properties, String key, int flags, T fallback) {
  var jsFunction = _prop(properties, key, flags, ref(fallback));

  return () {
    var jsResult = jsFunction.callAsFunction();
    var resultRef = unsafeCast<ExternalDartReference?>(jsResult);
    return unref<T>(resultRef);
  };
}
