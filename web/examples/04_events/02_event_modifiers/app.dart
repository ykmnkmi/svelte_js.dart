// ignore_for_file: library_prefixes
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _fragment = $.template('<button>Click me</button>');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void app(Node $anchor, AppProperties $properties) {
  $.push($properties, false);

  void handleMousemove(Event event) {
    window.alert('no more alerts');
  }

  $.init();

  // Init
  var button = $.open<Element>($anchor, true, _fragment);

  $.event<Event>('click', button, $.once(handleMousemove), false);
  $.close($anchor, button);
  $.pop();
}
