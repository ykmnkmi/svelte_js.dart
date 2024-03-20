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

void app(Node $anchor, AppProperties $properties) {
  $.push($properties, false);
  $.init();

  // Init
  var fragment = $.comment($anchor);
  var node = $.childFragment<Node>(fragment);

  $$.nested(node, $$.NestedProperties(answer: 42));
  $.closeFragment($anchor, fragment);
  $.pop();
}
