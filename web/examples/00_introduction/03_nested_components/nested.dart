// ignore_for_file: library_prefixes
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _template = $.template("<p>...don't affect this element</p>");

extension type NestedProperties._(JSObject _) implements JSObject {
  factory NestedProperties() {
    return NestedProperties._(JSObject());
  }
}

void nested(Node $anchor, NestedProperties $properties) {
  $.push($properties, false);
  $.init();

  // Init
  var p = $.open<Element>($anchor, true, _template);

  $.close($anchor, p);
  $.pop();
}
