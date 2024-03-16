// ignore_for_file: library_prefixes
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:svelte_js/svelte_js.dart';
import 'package:web/web.dart';

final _template = $.template("<p>...don't affect this element</p>");

extension type NestedProperties._(JSObject _) implements JSObject {
  factory NestedProperties() {
    return NestedProperties._(JSObject());
  }
}

const Nested nested = Nested._();

final class Nested implements Component<NestedProperties> {
  const Nested._();

  @override
  void call(Node node) {
    component(node, NestedProperties());
  }

  @override
  void component(Node $anchor, NestedProperties $properties) {
    $.push($properties, false);
    $.init();

    // Init
    var p = $.open<Element>($anchor, true, _template);

    $.close($anchor, p);
    $.pop();
  }
}
