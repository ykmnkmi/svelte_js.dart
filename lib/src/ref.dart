import 'dart:js_interop';

import 'package:meta/dart2js.dart';
import 'package:meta/meta.dart';
import 'package:svelte_js/src/constants.dart';
import 'package:svelte_js/src/unsafe_cast.dart';

@optionalTypeArgs
JSArray arrayRefCast<T>(List<T> list) {
  if (isJS) {
    var jsList = unsafeCast<List<JSAny?>>(list);
    return jsList.toJS;
  }

  var length = list.length;
  var jsArray = JSArray.withLength(length);

  for (var index = 0; index < length; index++) {
    jsArray[index] = ref(list[index]);
  }

  return jsArray;
}

@optionalTypeArgs
JSPromise futureRefCast<T>(Future<T> future) {
  if (isJS) {
    return future.toJS;
  }

  var jsFuture = future // ..
      .then<ExternalDartReference?>(ref)
      .then<JSAny?>(unsafeCast<JSAny?>);
  return jsFuture.toJS;
}

@tryInline
@optionalTypeArgs
ExternalDartReference? ref(Object? object) {
  if (isJS) {
    return unsafeCast<ExternalDartReference?>(object);
  }

  assert(object is! JSAny);
  return object?.toExternalReference;
}

@tryInline
@optionalTypeArgs
T unref<T>(ExternalDartReference? reference) {
  if (isJS) {
    return unsafeCast<T>(reference);
  }

  var object = unsafeCast<T>(reference?.toDartObject);
  assert(isJS || object is! JSAny);
  return object;
}

extension on JSArray {
  external void operator []=(int index, ExternalDartReference? value);
}