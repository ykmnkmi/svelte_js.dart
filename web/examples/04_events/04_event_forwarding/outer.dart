// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';
import 'dart:js_interop_unsafe';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

import 'inner.dart';

extension type OuterProperties._(JSObject _) implements JSObject {
  external factory OuterProperties({JSObject? $$events});
}

void Outer(Node $$anchor, OuterProperties $$properties) {
  var fragment = $.comment();
  var node = $.child<Text>(fragment);
  assert(node.nodeName == '#text');

  void $message(Event event) {
    $.bubbleEvent($$properties, event);
  }

  var $$events = JSObject();
  $$events.setProperty('message'.toJS, $message.toJS);
  Inner(node, InnerProperties($$events: $$events));
  $.append($$anchor, fragment);
}
