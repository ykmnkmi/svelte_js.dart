// ignore_for_file: library_prefixes
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:svelte_js/svelte_js.dart';
import 'package:web/web.dart';

import 'inner.dart' as $$;

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void app(Node $anchor, AppProperties $properties) {
  $.push($properties, false);

  void handleMessage(TypedEvent<$$.Message> event) {
    window.alert(event.detail.text);
  }

  $.init();

  // Init
  var fragment = $.comment($anchor);
  var node = $.childFragment(fragment);

  $$.inner(node, $$.InnerProperties($$events: $$.InnerEvents(message: (event) {
    handleMessage(TypedEvent<$$.Message>(event));
  })));
  $.closeFragment($anchor, fragment);
  $.pop();
}
