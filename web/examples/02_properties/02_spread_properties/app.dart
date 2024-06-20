// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

import 'info.dart';

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void App(Node $$anchor, AppProperties $$properties) {
  var properties = InfoProperties(
    name: $.ref('svelte'),
    version: $.ref(5),
    speed: $.ref('blazing'),
    website: $.ref('https://svelte.dev'),
  );

  var fragment = $.comment();
  var node = $.child<Text>(fragment);
  assert(node.nodeName == '#text');

  Info(node, $.spreadProperties(properties));
  $.append($$anchor, fragment);
}
