// ignore_for_file: library_prefixes
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _template = $.template('<h1> </h1>');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void app(Node $anchor, AppProperties $properties) {
  $.push($properties, false);

  var name = 'world';

  $.init();

  // Init
  var h1 = $.open<Element>($anchor, true, _template);
  var text = $.child<Text>(h1);

  text.nodeValue = 'Hello $name!';
  $.close($anchor, h1);
  $.pop();
}
