// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

import 'nested.dart';

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

final _fragment = $.fragment('<!> <!>');

void App(Node $anchor, AppProperties $properties) {
  $.push($properties, false);
  $.init();

  // Init
  var fragment = $.openFragment($anchor, true, _fragment);
  var node = $.childFragment<Node>(fragment);
  var node1 = $.sibling<Node>($.sibling<Text>(node, true));

  Nested(node, NestedProperties(answer: 42));
  Nested(node1, NestedProperties());
  $.closeFragment($anchor, fragment);
  $.pop();
}
