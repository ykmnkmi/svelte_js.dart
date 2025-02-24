@JS(r'$$')
library;

import 'dart:js_interop';

@JS('get_object_with_getter')
external T _getObjectWithGetter<T extends JSObject>(
  String name,
  JSFunction getter,
);

T getObjectWithGetter<T extends JSObject>(
  String name,
  ExternalDartReference? Function() getter,
) {
  return _getObjectWithGetter<T>(name, getter.toJS);
}

// @JS('set_props_getter')
// external void _setPropertiesGetter<T extends JSObject>(
//   T object,
//   String name,
//   JSFunction getter,
// );

// void setPropertiesGetter<T extends JSObject>(
//   T object,
//   String name,
//   ExternalDartReference? Function() getter,
// ) {
//   _setPropertiesGetter<T>(object, name, getter.toJS);
// }
