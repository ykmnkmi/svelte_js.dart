// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:svelte_js/svelte_js.dart';
import 'package:web/web.dart';

import 'inner.dart';
import 'message.dart';

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void App(Node $anchor, AppProperties $properties) {
  $.push($properties, false);

  void handleMessage(TypedEvent<Message> event) {
    window.alert(event.detail.text);
  }

  $.init();

  // Init
  var fragment = $.comment($anchor);
  var node = $.childFragment<Comment>(fragment);
  assert(node.nodeName == '#comment');

  void $onmessage(CustomEvent event) {
    handleMessage(TypedEvent<Message>(event));
  }

  var $$innerEvents = InnerEvents(message: $onmessage);
  Inner(node, InnerProperties($$events: $$innerEvents));
  $.closeFragment($anchor, fragment);
  $.pop();
}
