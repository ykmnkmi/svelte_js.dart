// ignore_for_file: library_prefixes, non_constant_identifier_names
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

void App(Node $anchor, AppProperties $properties) {
  $.push($properties, false);

  var name = 'world';

  $.init();

  // Init
  var h1 = $.open<HTMLHeadingElement>($anchor, true, _template);
  assert(h1.nodeName == 'H1');
  var text = $.child<Text>(h1);
  assert(h1.nodeName == '#text');

  text.nodeValue = 'Hello $name!';
  $.close($anchor, h1);
  $.pop();
}
