// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _fragment = $.fragment(
    '<label><input type="number" min="0" max="10"> <input type="range" min="0" max="10"></label> <label><input type="number" min="0" max="10"> <input type="range" min="0" max="10"></label> <p> </p>');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void App(Node $anchor, AppProperties $properties) {
  $.push($properties, false);

  var a = $.mutableSource<int>(1);
  var b = $.mutableSource<int>(2);

  $.init();

  // Init
  var fragment = $.openFragment($anchor, true, _fragment);
  var label = $.childFragment<HTMLLabelElement>(fragment);
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

  $.textEffect(text, () {
    return '${$.get<int>(a)} + ${$.get<int>(b)} = ${$.get<int>(a) + $.get<int>(b)}';
  });

  $.bindInt(input, () => $.get<int>(a), ($value) => $.set<int>(a, $value));
  $.bindInt(input1, () => $.get<int>(a), ($value) => $.set<int>(a, $value));
  $.bindInt(input2, () => $.get<int>(b), ($value) => $.set<int>(b, $value));
  $.bindInt(input3, () => $.get<int>(b), ($value) => $.set<int>(b, $value));
  $.closeFragment($anchor, fragment);
  $.pop();
}
