@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:meta/meta.dart';
import 'package:web/web.dart';

@JS('set_text')
external void setText(Text text, String value);

String stringify(Object? value) {
  if (value == null) {
    return '';
  }

  return value is String ? value : '$value';
}

extension type _Mount._(JSObject _) implements JSObject {
  external factory _Mount({Node target});

  external Node target;
}

@optionalTypeArgs
typedef Component<T extends JSObject> = void Function(
  Node anchor,
  T properties,
);

extension type ComponentReference(JSObject _) implements JSObject {}

@JS('mount')
external ComponentReference _mount(
  JSExportedDartFunction component,
  _Mount options,
);

ComponentReference mount<T extends JSObject>(
  Component<T> component, {
  required Node target,
}) {
  return _mount(component.toJS, _Mount(target: target));
}

@JS('unmount')
external void unmount(ComponentReference component);

@JS('append_styles')
external void appendStyles(Node? target, String id, String styles);
