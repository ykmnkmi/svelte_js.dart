@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:svelte_js/src/unsafe_cast.dart';

@JS('spread_props')
external JSObject _spreadProperties(JSObject object, [JSObject rest]);

T spreadProperties<T extends JSObject>(T object, [JSObject? rest]) {
  if (rest == null) {
    return unsafeCast<T>(_spreadProperties(object));
  }

  return unsafeCast<T>(_spreadProperties(object, rest));
}

@JS('prop')
external JSFunction _prop(JSObject properties, JSString key, JSNumber flags);

T Function() prop<T extends Object?>(JSObject properties, String key, int flag) {
  var jsFunction = _prop(properties, key.toJS, flag.toJS);

  return () {
    var result = jsFunction.callAsFunction(null);
    return unsafeCast<T>(result);
  };
}

// T Function([T? value]) prop<T extends Object?>(JSObject properties, String key, int flag) {
//   var jsFunction = _prop(properties, key.toJS, flag.toJS);

//   return ([T? value]) {
//     var jsValue = unsafeCast<JSAny?>(value);
//     var result = jsFunction.callAsFunction(null, jsValue);
//     return unsafeCast<T>(result);
//   };
// }
