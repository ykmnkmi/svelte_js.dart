// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _template = $.template('<button>Click me</button>');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void App(Node $anchor, AppProperties $properties) {
  $.push($properties, false);

  void handleMousemove(Event event) {
    window.alert('no more alerts');
  }

  $.init();

  // Init
  var button = $.open<HTMLButtonElement>($anchor, true, _template);
  assert(button.nodeName == 'BUTTON');

  $.event<Event>('click', button, $.once<Event>(handleMousemove), false);
  $.close($anchor, button);
  $.pop();
}
