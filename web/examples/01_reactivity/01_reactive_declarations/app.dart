// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _root = $.fragment('''
<button> </button> <p> </p> <p> </p>''');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void App(Node $$anchor, AppProperties $$properties) {
  $.push($$properties, false);

  var doubled = $.mutableState<int>();
  var quadrupled = $.mutableState<int>();
  var count = $.mutableState<int>(0);

  void handleClick() {
    $.set(count, $.get(count) + 1);
  }

  $.legacyPreEffect(() => $.get(count), () {
    $.set(doubled, $.get(count) * 2);
  });

  $.legacyPreEffect(() => $.get(doubled), () {
    $.set(quadrupled, $.get(doubled) * 2);
  });

  $.legacyPreEffectReset();

  var fragment = _root();
  var button = $.firstChild<HTMLButtonElement>(fragment);
  assert(button.nodeName == 'BUTTON');
  var text = $.child<Text>(button);
  assert(text.nodeName == '#text');

  $.reset(button);

  var p = $.sibling<HTMLParagraphElement>(button, 2);
  assert(p.nodeName == 'P');
  var text1 = $.child<Text>(p);
  assert(text1.nodeName == '#text');

  $.reset(p);

  var p1 = $.sibling<HTMLParagraphElement>(p, 2);
  assert(p.nodeName == 'P');
  var text2 = $.child<Text>(p1);
  assert(text2.nodeName == '#text');

  $.reset(p1);

  $.templateEffect(() {
    $.setText(text, 'Count: ${$.get(count)}');
    $.setText(text1, '${$.get(count)} * 2 = ${$.get(doubled)}');
    $.setText(text2, '${$.get(doubled)} * 2 = ${$.get(quadrupled)}');
  });

  $.event('click', button, (event) => handleClick());
  $.append($$anchor, fragment);
  $.pop();
}
