import 'dart:js_interop';

import 'package:meta/meta.dart';
import 'package:svelte_js/src/unsafe_cast.dart';

@optionalTypeArgs
JSArray arrayRefCast<T>(List<T> list) {
  var jsArray = JSArray<JSAny>.withLength(list.length);

  for (var index = 0; index < list.length; index++) {
    jsArray[index] = unsafeCast<JSAny>(ref<T>(list[index]));
  }

  return jsArray;
}

@optionalTypeArgs
ExternalDartReference<T> ref<T>(T object) {
  return object.toExternalReference;
}

@optionalTypeArgs
T unref<T>(ExternalDartReference<T> reference) {
  return reference.toDartObject;
}
