// ignore_for_file: library_prefixes
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _template = $.template('<p> </p>');

extension type NestedProperties._(JSObject _) implements JSObject {
  factory NestedProperties({required Object answer}) {
    return NestedProperties.$(answer: answer.toExternalReference);
  }

  external factory NestedProperties.$({ExternalDartReference? answer});

  @JS('answer')
  external ExternalDartReference get _answer;

  Object get answer {
    return _answer.toDartObject;
  }
}

void nested(Node $anchor, NestedProperties $properties) {
  $.push($properties, false);
  $.init();

  // Init
  var p = $.open<Element>($anchor, true, _template);
  var text = $.child<Text>(p);

  // Update
  $.textEffect(text, () {
    return 'The answer is ${$properties.answer}';
  });

  $.close($anchor, p);
  $.pop();
}
