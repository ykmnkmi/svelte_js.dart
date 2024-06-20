import 'dart:js_interop';

import 'package:meta/dart2js.dart';
import 'package:meta/meta.dart';
import 'package:svelte_js/src/constants.dart';
import 'package:svelte_js/src/unsafe_cast.dart';

@tryInline
@optionalTypeArgs
JSBoxedDartObject? box(Object? object) {
  if (isJS) {
    return unsafeCast<JSBoxedDartObject?>(object);
  }

  assert(object is! JSAny);
  return object?.toJSBox;
}

@tryInline
@optionalTypeArgs
T unbox<T extends Object?>(JSBoxedDartObject? box) {
  if (isJS) {
    return unsafeCast<T>(box);
  }

  var object = unsafeCast<T>(box?.toDart);
  assert(object is! JSAny);
  return object;
}
