import 'dart:collection';
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

  var refList = _RefList<T>(list);
  return refList.toJSProxyOrRef;
}

final class _RefList<T> extends ListBase<JSAny> {
  _RefList(this._list);

  final List<T> _list;

  @override
  int get length {
    return _list.length;
  }

  @override
  set length(int value) {
    _list.length = value;
  }

  @override
  JSAny operator [](int index) {
    // ignore: invalid_runtime_check_with_js_interop_types
    return ref<T>(_list[index]) as JSAny;
  }

  @override
  void operator []=(int index, JSAny value) {
    // ignore: invalid_runtime_check_with_js_interop_types
    _list[index] = unref<T>(value as ExternalDartReference<T>);
  }
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
