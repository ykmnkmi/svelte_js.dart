// ignore_for_file: library_prefixes, non_constant_identifier_names
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

void App(Node $anchor, AppProperties $properties) {
  $.push($properties, false);

  var count = $.mutableSource<int>(0);

  void handleClick(Event event) {
    $.set<int>(count, $.get<int>(count) + 1);
  }

  $.init();

  // Init
  var button = $.open<HTMLButtonElement>($anchor, true, _template);
  assert(button.nodeName == 'BUTTON');
  var text = $.child<Text>(button);
  assert(text.nodeName == '#text');

  // Update
  $.textEffect(text, () {
    return 'Clicked ${$.get<int>(count)} ${$.get<int>(count) == 1 ? 'time' : 'times'}';
  });

  $.event<Event>('click', button, handleClick, false);
  $.close($anchor, button);
  $.pop();
}
