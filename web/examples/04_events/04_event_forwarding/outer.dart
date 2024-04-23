// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

import 'inner.dart';

extension type OuterProperties._(JSObject _) implements JSObject {
  factory OuterProperties() {
    return OuterProperties._(JSObject());
  }
}

void Outer(Node $$anchor, OuterProperties $$properties) {
  $.push($$properties, true);

  var properties = $.restProperties<OuterProperties>($$properties, <String>[]);
  var fragment = $.comment();
  var node = $.child<Comment>(fragment);
  assert(node.nodeName == '#comment');

  Inner(node, $.spreadProperties<InnerProperties>($.getter(properties)));
  $.append($$anchor, fragment);
  $.pop();
}
