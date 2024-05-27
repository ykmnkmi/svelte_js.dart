// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _root = $.template<HTMLHeadingElement>('<h1> </h1>');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void App(Node $$anchor, AppProperties $$properties) {
  var name = 'world';
  var h1 = _root();
  assert(h1.nodeName == 'H1');
  var text = $.child<Text>(h1);
  assert(text.nodeName == '#text');

  text.nodeValue = 'Hello $name!';
  $.append($$anchor, h1);
}
