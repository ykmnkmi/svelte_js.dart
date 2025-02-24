// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:svelte_js/svelte_js.dart';
import 'package:web/web.dart';

final _root = $.template<HTMLButtonElement>('''
<button> </button>''');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void App(Node $$anchor, AppProperties $$properties) {
  var count = state(0);

  void handleClick() {
    count.set(count() + 1);
  }

  var button = _root();
  var text = $.child<Text>(button);

  $.reset(button);

  $.templateEffect(() {
    $.setText(text, 'Clicked ${count()} ${count() == 1 ? 'time' : 'times'}');
  });

  $.event<Event>('click', button, (event) => handleClick());
  $.append($$anchor, button);
}
