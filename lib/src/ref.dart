import 'dart:js_interop';

import 'package:meta/dart2js.dart';
import 'package:meta/meta.dart';
import 'package:svelte_js/src/unsafe_cast.dart';

@optionalTypeArgs
JSArray arrayRefCast<T extends Object?>(List<T> list) {
  var length = list.length;
  var jsArray = JSArray.withLength(length);

  for (var index = 0; index < length; index++) {
    jsArray[index] = ref<T>(list[index]);
  }

  return jsArray;
}

@optionalTypeArgs
JSPromise futureRefCast<T extends Object?>(Future<T> future) {
  var jsFuture =
      future.then<ExternalDartReference?>(ref).then<JSAny?>(unsafeCast);
  return jsFuture.toJS;
}

@tryInline
@optionalTypeArgs
ExternalDartReference? ref<T extends Object?>(T object) {
  return object?.toExternalReference;
}

@tryInline
@optionalTypeArgs
@pragma('dart2js:as:trust')
T unref<T extends Object?>(ExternalDartReference? reference) {
  return reference?.toDartObject as T;
}

extension on JSArray {
  external void operator []=(int index, ExternalDartReference? value);
}
