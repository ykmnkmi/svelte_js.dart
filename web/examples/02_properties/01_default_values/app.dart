// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

import 'nested.dart';

final _root = $.fragment('''
<!> <!>''');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void App(Node $$anchor, AppProperties $$properties) {
  var fragment = _root();
  var node = $.firstChild<Comment>(fragment);
  assert(node.nodeName == '#comment');

  Nested(node, NestedProperties(answer: $.ref(42)));

  var node1 = $.sibling<Comment>($.sibling<Text>(node, true));
  assert(node1.nodeName == '#comment');

  Nested(node1, NestedProperties());
  $.append($$anchor, fragment);
}
