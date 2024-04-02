// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _fragment = $.fragment('<button> </button> <p> </p> <p> </p>');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void App(Node $anchor, AppProperties $properties) {
  $.push($properties, true);

  var doubled = $.mutableSource<int>();
  var quadrupled = $.mutableSource<int>();
  var count = $.mutableSource<int>(0);

  void handleClick(Event event) {
    $.set<int>(count, $.get<int>(count) + 1);
  }

  $.legacyPreEffect<int>(() => $.get<int>(count), () {
    $.set<int>(doubled, $.get<int>(count) * 2);
  });

  $.legacyPreEffect(() => $.get<int>(doubled), () {
    $.set<int>(quadrupled, $.get<int>(doubled) * 2);
  });

  $.legacyPreEffectReset();
  $.init();

  // Init
  var fragment = $.openFragment($anchor, true, _fragment);
  var button = $.childFragment<Element>(fragment);
  var text = $.child<Text>(button);
  var p = $.sibling<Element>($.sibling<Text>(button, true));
  var text1 = $.child<Text>(p);
  var p1 = $.sibling<Element>($.sibling<Text>(p, true));
  var text2 = $.child<Text>(p1);

  // Update
  $.renderEffect((block, signal) {
    $.text(text, 'Count: ${$.get<int>(count)}');
    $.text(text1, '${$.get<int>(count)} * 2 = ${$.get<int>(doubled)}');
    $.text(text2, '${$.get<int>(doubled)} * 2 = ${$.get<int>(quadrupled)}');
  });

  $.event<Event>('click', button, handleClick, false);
  $.closeFragment($anchor, fragment);
  $.pop();
}
