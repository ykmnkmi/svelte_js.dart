// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

import 'outer.dart';

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void App(Node $$anchor, AppProperties $$properties) {
  $.push($$properties, true);

  void handleMessage(({String text}) message) {
    window.alert(message.text);
  }

  var fragment = $.comment();
  var node = $.child<Comment>(fragment);
  assert(node.nodeName == '#comment');

  var $$outerProperties = OuterProperties();
  $.setProperty($$outerProperties, 'message', handleMessage);
  Outer(node, $$outerProperties);
  $.append($$anchor, fragment);
  $.pop();
}
