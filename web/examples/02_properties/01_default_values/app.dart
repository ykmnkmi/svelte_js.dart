// ignore_for_file: library_prefixes
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

import 'nested.dart' as $$;

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

final _fragment = $.fragment('<!> <!>');

void app(Node $anchor, AppProperties $properties) {
  $.push($properties, false);
  $.init();

  // Init
  var fragment = $.openFragment($anchor, true, _fragment);
  var node = $.childFragment<Node>(fragment);
  var node1 = $.sibling<Node>($.sibling<Text>(node, true));

  $$.nested(node, $$.NestedProperties(answer: 42));
  $$.nested(node1, $$.NestedProperties());
  $.closeFragment($anchor, fragment);
  $.pop();
}
