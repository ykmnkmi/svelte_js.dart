// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _root = $.template<HTMLParagraphElement>('''
<p> </p>''');

extension type NestedProperties._(JSObject _) implements JSObject {
  external factory NestedProperties({ExternalDartReference? answer});

  @JS('answer')
  external ExternalDartReference? _answer;

  dynamic get answer {
    return $.unref<dynamic>(_answer);
  }
}

void Nested(Node $$anchor, NestedProperties $$properties) {
  var answer = $.property<dynamic>($$properties, 'answer');
  var p = _root();
  assert(p.nodeName == 'P');
  var text = $.child<Text>(p);
  assert(text.nodeName == '#text');

  $.templateEffect(() {
    $.setText(text, 'The answer is ${$.stringify(answer())}');
  });

  $.append($$anchor, p);
}
