// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _root = $.template<HTMLParagraphElement>('<p> </p>');

extension type NestedProperties._(JSObject _) implements JSObject {
  external factory NestedProperties({ExternalDartReference? answer});

  @JS('answer')
  external ExternalDartReference? get _answer;

  Object? get answer {
    return $.unref<Object?>(_answer);
  }
}

void Nested(Node $$anchor, NestedProperties $$properties) {
  $.push($$properties, true);

  var answer = $.prop<Object?>($$properties, 'answer', 3, 'a mystery');
  var p = _root();
  assert(p.nodeName == 'P');
  var text = $.child<Text>(p);
  assert(text.nodeName == '#text');

  $.renderEffect(() {
    $.setText(text, 'The answer is ${$.stringify(answer())}');
  });

  $.append($$anchor, p);
  $.pop();
}
