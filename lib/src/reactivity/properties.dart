@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:svelte_js/src/ref.dart';
import 'package:svelte_js/src/unsafe_cast.dart';

@JS('rest_props')
external T _restProperties<T extends JSObject>(
  JSObject properties,
  JSArray exclude,
);

T restProperties<T extends JSObject>(
  JSObject properties,
  List<String> exclude,
) {
  var jsExclude = arrayRefCast<String>(exclude);
  return _restProperties<T>(properties, jsExclude);
}

@JS('spread_props')
external T _spreadProperties<T extends JSObject>(JSAny first, [JSAny second]);

T spreadProperties<T extends JSObject>(JSAny first, [JSAny? second]) {
  if (second == null) {
    return _spreadProperties<T>(first);
  }

  return _spreadProperties<T>(first, second);
}

@JS('prop')
external JSFunction _property(
  JSObject properties,
  String key,
  int flags,
  ExternalDartReference? value,
);

T Function() property<T>(
  JSObject properties,
  String key,
  int flags,
  T fallback,
) {
  var jsFunction = _property(properties, key, flags, ref(fallback));

  return () {
    var jsResult = jsFunction.callAsFunction();
    var resultRef = unsafeCast<ExternalDartReference?>(jsResult);
    return unref<T>(resultRef);
  };
}
