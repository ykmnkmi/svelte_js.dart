// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';
import 'dart:js_interop_unsafe';

import 'package:svelte_js/internal.dart' as $;
import 'package:svelte_js/svelte_js.dart';
import 'package:web/web.dart';

import 'inner.dart';

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void App(Node $$anchor, AppProperties $$properties) {
  void handleMessage(ComponentEvent<({String text})> event) {
    window.alert(event.detail.text);
  }

  var fragment = $.comment();
  var node = $.firstChild<Text>(fragment);
  assert(node.nodeName == '#text');

  var $$events = JSObject();
  $$events.setProperty('message'.toJS, handleMessage.toJS);
  Inner(node, InnerProperties($$events: $$events));
  $.append($$anchor, fragment);
}
