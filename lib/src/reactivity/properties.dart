@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:svelte_js/src/ref.dart';
import 'package:svelte_js/src/unsafe_cast.dart';

@JS('spread_props')
external T _spreadProperties<T extends JSObject>(T object, [JSObject rest]);

T spreadProperties<T extends JSObject>(T object, [JSObject? rest]) {
  if (rest == null) {
    return _spreadProperties<T>(object);
  }

  return _spreadProperties<T>(object, rest);
}

@JS('prop')
external JSFunction _prop<T extends JSObject>(
    T properties, JSString key, JSNumber flags);

R Function() prop<T extends JSObject, R>(
    JSObject properties, String key, int flag) {
  var jsFunction = _prop(properties, key.toJS, flag.toJS);

  return () {
    var result = jsFunction.callAsFunction(null);
    var resultRef = unsafeCast<ExternalDartReference?>(result);
    return unref<R>(resultRef);
  };
}
