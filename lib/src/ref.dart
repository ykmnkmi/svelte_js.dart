import 'dart:js_interop';

import 'package:meta/dart2js.dart';
import 'package:meta/meta.dart';
import 'package:svelte_js/src/constants.dart';
import 'package:svelte_js/src/unsafe_cast.dart';

@optionalTypeArgs
JSArray arrayRefCast<T>(List<T> list) {
  if (isJS) {
    return unsafeCast<JSArray>(list);
  }

  var jsArray = JSArray<JSAny?>.withLength(list.length);

  for (var index = 0; index < list.length; index++) {
    jsArray[index] = unsafeCast<JSAny?>(ref<T>(list[index]));
  }

  <JSAny?>[].toJSProxyOrRef;
  return jsArray;
}

@optionalTypeArgs
@tryInline
ExternalDartReference<T> ref<T>(T object) {
  return object.toExternalReference;
}

@optionalTypeArgs
@tryInline
T unref<T>(ExternalDartReference<T> reference) {
  return reference.toDartObject;
}
