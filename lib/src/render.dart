@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:svelte_js/src/types.dart';
import 'package:svelte_js/src/unsafe_cast.dart';
import 'package:web/web.dart';

@JS('text_effect')
external void _textEffect(Node dom, JSFunction getValue);

void textEffect(Node dom, String Function() getValue) {
  _textEffect(dom, getValue.toJS);
}

@JS('text')
external void _text(Node dom, JSString value);

void text(Node dom, String value) {
  _text(dom, value.toJS);
}

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

@JS('mount')
external JSObject _mount(JSFunction component, _Mount options);

ComponentReference mount<T extends JSObject>(Component<T> component,
    {required Node target}) {
  var jsObject = _mount(component.toJS, _Mount(target: target));
  return unsafeCast<ComponentReference>(jsObject);
}

@JS('unmount')
external void _unmount(JSObject component);

void unmount(ComponentReference component) {
  _unmount(component);
}

@JS('append_styles')
external void _appendStyles(Node? target, JSString id, JSString styles);

void appendStyles(Node? target, String id, String styles) {
  _appendStyles(target, id.toJS, styles.toJS);
}
