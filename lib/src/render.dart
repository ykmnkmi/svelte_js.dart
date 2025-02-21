@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:meta/dart2js.dart';
import 'package:meta/meta.dart';
import 'package:web/web.dart';

@JS('set_text')
external void setText(Text text, String? value);

@anonymous
extension type _Mount._(JSObject _) implements JSObject {
  external factory _Mount({
    JSObject props,
    Node target,
    Node? anchor,
    bool? intro,
  });
}

@optionalTypeArgs
typedef Component<T extends JSObject> =
    void Function(Node anchor, T properties);

extension type ComponentReference(JSObject _) implements JSObject {}

@JS('mount')
external ComponentReference _mount(
  JSExportedDartFunction component,
  _Mount options,
);

@tryInline
ComponentReference mount<T extends JSObject>(
  Component<T> component, {
  T? properties,
  required Node target,
  Node? anchor,
  bool? intro = true,
}) {
  if (properties == null) {
    return _mount(
      component.toJS,
      _Mount(target: target, anchor: anchor, intro: intro),
    );
  } else {
    return _mount(
      component.toJS,
      _Mount(props: properties, target: target, anchor: anchor, intro: intro),
    );
  }
}

@JS()
external void unmount(ComponentReference component);
