// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _root = $.fragment(
  '''
<label><input type="number" min="0" max="10"> <input type="range" min="0" max="10"></label> <label><input type="number" min="0" max="10"> <input type="range" min="0" max="10"></label> <p> </p>''',
);

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void App(Node $$anchor, AppProperties $$properties) {
  var a = $.mutableSource(1);
  var b = $.mutableSource(2);
  var fragment = _root();
  var label = $.firstChild<HTMLLabelElement>(fragment);
  assert(label.nodeName == 'LABEL');
  var input = $.child<HTMLInputElement>(label);
  assert(input.nodeName == 'INPUT');

  $.removeInputAttributeDefaults(input);

  var input1 = $.sibling<HTMLInputElement>($.sibling<Text>(input, true));
  assert(input1.nodeName == 'INPUT');

  $.removeInputAttributeDefaults(input1);

  var label1 = $.sibling<HTMLLabelElement>($.sibling<Text>(label, true));
  assert(label1.nodeName == 'LABEL');
  var input2 = $.child<HTMLInputElement>(label1);
  assert(input2.nodeName == 'INPUT');

  $.removeInputAttributeDefaults(input2);

  var input3 = $.sibling<HTMLInputElement>($.sibling<Text>(input2, true));
  assert(input3.nodeName == 'INPUT');

  $.removeInputAttributeDefaults(input3);

  var p = $.sibling<HTMLParagraphElement>($.sibling<Text>(label1, true));
  assert(p.nodeName == 'P');
  var text = $.child<Text>(p);
  assert(text.nodeName == '#text');

  $.templateEffect(() {
    $.setText(text, '${$.get(a)} + ${$.get(b)} = ${$.get(a) + $.get(b)}');
  });

  $.bindInt(input, () => $.get(a), ($value) => $.set(a, $value));
  $.bindInt(input1, () => $.get(a), ($value) => $.set(a, $value));
  $.bindInt(input2, () => $.get(b), ($value) => $.set(b, $value));
  $.bindInt(input3, () => $.get(b), ($value) => $.set(b, $value));
  $.append($$anchor, fragment);
}
