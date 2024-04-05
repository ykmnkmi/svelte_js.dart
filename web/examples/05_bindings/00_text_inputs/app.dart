// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _fragment = $.fragment('<input placeholder="Enter your name"> <p> </p>');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void App(Node $anchor, AppProperties $properties) {
  $.push($properties, false);

  var name = $.mutableSource<String>('');

  $.init();

  // Init
  var fragment = $.openFragment($anchor, true, _fragment);
  var input = $.childFragment<HTMLInputElement>(fragment);

  $.removeInputAttributeDefaults(input);

  var p = $.sibling<HTMLParagraphElement>($.sibling<Text>(input, true));
  assert(p.nodeName == 'P');
  var text = $.child<Text>(p);
  assert(text.nodeName == '#text');

  $.textEffect(text, () {
    return 'Hello, ${$.get<String>(name).isNotEmpty ? $.get<String>(name) : 'stranger'}!';
  });

  $.bindValue(input, () => $.get<String>(name),
      ($value) => $.set<String>(name, $value));
  $.closeFragment($anchor, fragment);
  $.pop();
}
