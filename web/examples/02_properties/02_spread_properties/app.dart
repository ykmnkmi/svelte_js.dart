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

void App(Node $anchor, AppProperties $properties) {
  $.push($properties, false);

  var properties = InfoProperties(
    name: 'svelte',
    version: 3,
    speed: 'blazing',
    website: 'https://svelte.dev',
  );

  $.init();

  // Init
  var fragment = $.comment($anchor);
  var node = $.childFragment<Node>(fragment);

  Info(node, $.spreadProperties(properties));
  $.closeFragment($anchor, fragment);
  $.pop();
}
