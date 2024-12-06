@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:meta/meta.dart';
import 'package:web/web.dart';

@JS('set_text')
external void setText(Text text, String? value);

String stringify(Object? value) {
  return value == null ? '' : '$value';
}

@anonymous
extension type _Mount._(JSObject _) implements JSObject {
  external factory _Mount({Node? anchor, Node target, bool? intro});
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
  Node? anchor,
  bool intro = true,
}) {
  var options = _Mount(anchor: anchor, target: target, intro: intro);
  return _mount(component.toJS, options);
}

@JS('unmount')
external void unmount(ComponentReference component);
