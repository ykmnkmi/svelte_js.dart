@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:web/web.dart';

extension type Template<T extends Node>(JSFunction _) implements JSFunction {
  external T call();
}

extension type Fragment(JSFunction _) implements JSFunction {
  external DocumentFragment call();
}

@JS('template')
external JSFunction _template(String html, [int flags]);

Template<T> template<T extends Node>(String html) {
  return Template<T>(_template(html));
}

Fragment fragment(String html) {
  return Fragment(_template(html, 1));
}

@JS('comment')
external DocumentFragment comment();

@JS('append')
external void append(Node anchor, Node node);
