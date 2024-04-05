// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

import 'inner.dart';

extension type OuterEvents._(JSObject _) implements JSObject {
  factory OuterEvents({void Function(CustomEvent event)? message}) {
    return OuterEvents.js(message: message?.toJS);
  }

  external OuterEvents.js({JSFunction? message});
}

extension type OuterProperties._(JSObject _) implements JSObject {
  factory OuterProperties({OuterEvents? $$events}) {
    return OuterProperties.js($$events: $$events);
  }

  external factory OuterProperties.js({OuterEvents? $$events});
}

void Outer(Node $anchor, OuterProperties $properties) {
  $.push($properties, false);
  $.init();

  // Init
  var fragment = $.comment($anchor);
  var node = $.childFragment<Comment>(fragment);
  assert(node.nodeName == '#comment');

  var $$events = $.forwardEvent<InnerEvents>('message', $properties);
  Inner(node, InnerProperties($$events: $$events));
  $.closeFragment($anchor, fragment);
  $.pop();
}
