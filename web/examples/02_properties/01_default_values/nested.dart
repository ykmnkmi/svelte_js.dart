// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _template = $.template('<p> </p>');

extension type NestedProperties._(JSObject _) implements JSObject {
  factory NestedProperties({Object answer = 'a mystery'}) {
    return NestedProperties.js(answer: $.ref(answer));
  }

  external factory NestedProperties.js({ExternalDartReference? answer});

  @JS('answer')
  external ExternalDartReference get _answer;

  Object get answer {
    return $.unref<Object>(_answer);
  }
}

void Nested(Node $anchor, NestedProperties $properties) {
  $.push($properties, false);

  var answer = $.prop<NestedProperties, Object>($properties, 'answer', 0);

  $.init();

  // Init
  var p = $.open<HTMLParagraphElement>($anchor, true, _template);
  assert(p.nodeName == 'P');
  var text = $.child<Text>(p);
  assert(text.nodeName == '#text');

  // Update
  $.textEffect(text, () {
    return 'The answer is ${answer()}';
  });

  $.close($anchor, p);
  $.pop();
}
