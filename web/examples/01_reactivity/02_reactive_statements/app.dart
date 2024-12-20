// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _root = $.template<HTMLButtonElement>('''
<button> </button>''');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void App(Node $$anchor, AppProperties $$properties) {
  $.push($$properties, false);

  var count = $.mutableState<int>(0);

  void handleClick() {
    $.set(count, $.get(count) + 1);
  }

  $.legacyPreEffect(() => $.get(count), () {
    if ($.get(count) >= 10) {
      window.alert('count is dangerously high!');
      $.set(count, 9);
    }
  });

  $.legacyPreEffectReset();

  var button = _root();
  assert(button.nodeName == 'BUTTON');
  var text = $.child<Text>(button);
  assert(text.nodeName == '#text');

  $.reset(button);

  $.templateEffect(() {
    $.setText(text, 'Clicked ${$.get(count)} ${$.get(count) == 1 ? 'time' : 'times'}');
  });

  $.event('click', button, (event) => handleClick());
  $.append($$anchor, button);
  $.pop();
}
