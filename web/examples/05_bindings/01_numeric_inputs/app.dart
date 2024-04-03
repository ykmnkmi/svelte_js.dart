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
  var label = $.childFragment<Element>(fragment);
  var input = $.child<Element>(label);

  $.removeInputAttributeDefaults(input);

  var input1 = $.sibling<Element>($.sibling<Text>(input, true));

  $.removeInputAttributeDefaults(input1);

  var label1 = $.sibling<Element>($.sibling<Text>(label, true));
  var input2 = $.child<Element>(label1);

  $.removeInputAttributeDefaults(input2);

  var input3 = $.sibling<Element>($.sibling<Text>(input2, true));

  $.removeInputAttributeDefaults(input3);

  var p = $.sibling<Element>($.sibling<Text>(label1, true));
  var text = $.child<Text>(p);

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
