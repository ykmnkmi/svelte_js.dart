// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _root = $.template<HTMLParagraphElement>("<p>...don't affect this element</p>");

extension type NestedProperties._(JSObject _) implements JSObject {
  factory NestedProperties() {
    return NestedProperties._(JSObject());
  }
}

void Nested(Node $$anchor, NestedProperties $$properties) {
  var p = _root();
  assert(p.nodeName == 'P');

  $.append($$anchor, p);
}
