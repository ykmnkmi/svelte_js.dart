// ignore_for_file: library_prefixes
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _template = $.template('<button> </button>');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void app(Node $anchor, AppProperties $properties) {
  $.push($properties, false);

  var count = $.mutableSource<int>(0);

  void handleClick(Event event) {
    $.set<int>(count, $.get<int>(count) + 1);
  }

  $.init();

  // Init
  var button = $.open<Element>($anchor, true, _template);
  var text = $.child<Text>(button);

  // Update
  $.textEffect(text, () {
    return 'Clicked ${$.get<int>(count)} ${$.get<int>(count) == 1 ? 'time' : 'times'}';
  });

  $.event<Event>('click', button, handleClick, false);
  $.close($anchor, button);
  $.pop();
}
