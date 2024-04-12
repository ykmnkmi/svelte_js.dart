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
  $.push($$properties, true);

  var properties = JSObject();
  $.setProperty(properties, 'name', 'svelte');
  $.setProperty(properties, 'version', 4);
  $.setProperty(properties, 'speed', 'blazing');
  $.setProperty(properties, 'website', 'https://svelte.dev');

  var fragment = $.comment();
  var node = $.firstChild<Comment>(fragment);
  assert(node.nodeName == '#comment');

  Info(node, $.spreadProperties(properties));
  $.append($$anchor, fragment);
  $.pop();
}
