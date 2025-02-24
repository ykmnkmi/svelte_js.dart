// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:svelte_js/svelte_js.dart';
import 'package:web/web.dart';

final _root = $.fragment('''
<button> </button> <p> </p> <p> </p>''');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void App(Node $$anchor, AppProperties $$properties) {
  var count = state(0);
  var doubled = derived(() => count() * 2);
  var quadrupled = derived(() => doubled() * 2);

  void handleClick() {
    count.set(count() + 1);
  }

  var fragment = _root();
  var button = $.firstChild<HTMLButtonElement>(fragment);
  var text = $.child<Text>(button);

  $.reset(button);

  var p = $.sibling<HTMLParagraphElement>(button, 2);
  var text1 = $.child<Text>(p);

  $.reset(p);

  var p1 = $.sibling<HTMLParagraphElement>(p, 2);
  var text2 = $.child<Text>(p1);

  $.reset(p1);

  $.templateEffect(() {
    $.setText(text, 'Count: ${$.get(count)}');
    $.setText(text1, '${count()} * 2 = ${doubled()}');
    $.setText(text2, '${doubled()} * 2 = ${quadrupled()}');
  });

  $.event<Event>('click', button, (event) => handleClick());
  $.append($$anchor, fragment);
}
