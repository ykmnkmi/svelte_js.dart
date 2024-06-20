// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _root = $.fragment('''
<input placeholder="Enter your name"> <p> </p>''');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void App(Node $$anchor, AppProperties $properties) {
  var name = $.mutableSource('');
  var fragment = _root();
  var input = $.firstChild<HTMLInputElement>(fragment);

  $.removeInputAttributeDefaults(input);

  var p = $.sibling<HTMLParagraphElement>($.sibling<Text>(input, true));
  assert(p.nodeName == 'P');
  var text = $.child<Text>(p);
  assert(text.nodeName == '#text');

  $.templateEffect(() {
    $.setText(text, 'Hello, ${$.get(name).isNotEmpty ? $.get(name) : 'stranger'}!');
  });

  $.bindValue(input, () => $.get(name), ($$value) => $.set(name, $$value));
  $.append($$anchor, fragment);
}
