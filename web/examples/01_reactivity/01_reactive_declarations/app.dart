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

  var count = $.mutableSource(0);
  var doubled = $.mutableSource<int>();
  var quadrupled = $.mutableSource<int>();

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
  var p = $.sibling<HTMLParagraphElement>($.sibling<Text>(button, true));
  assert(p.nodeName == 'P');
  var text1 = $.child<Text>(p);
  assert(text1.nodeName == '#text');
  var p1 = $.sibling<HTMLParagraphElement>($.sibling<Text>(p, true));
  assert(p.nodeName == 'P');
  var text2 = $.child<Text>(p1);
  assert(text2.nodeName == '#text');

  $.templateEffect(() {
    $.setText(text, 'Count: ${$.get(count)}');
    $.setText(text1, '${$.get(count)} * 2 = ${$.get(doubled)}');
    $.setText(text2, '${$.get(doubled)} * 2 = ${$.get(quadrupled)}');
  });

  $.event('click', button, (event) => handleClick(), false);
  $.append($$anchor, fragment);
  $.pop();
}
