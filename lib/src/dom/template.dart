@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:web/web.dart';

extension type Template(JSFunction _) implements JSFunction {
  external T call<T extends Node>();
}

extension type Fragment(JSFunction _) implements JSFunction {
  external DocumentFragment call();
}

@JS('template')
external JSFunction _template(String html, [int flags]);

Template template(String html) {
  return Template(_template(html));
}

Fragment fragment(String html) {
  return Fragment(_template(html, 1));
}

@JS('append')
external void append(Node anchor, Node node);
