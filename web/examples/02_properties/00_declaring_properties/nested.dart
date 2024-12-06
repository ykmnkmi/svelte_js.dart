// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _root = $.template<HTMLParagraphElement>('''
<p> </p>''');

extension type NestedProperties._(JSObject _) implements JSObject {
  external factory NestedProperties({ExternalDartReference<Object?>? answer});

  @JS('answer')
  external ExternalDartReference<Object>? _answer;

  Object? get answer {
    if (_answer case var answer?) {
      return $.unref(answer);
    }

    return null;
  }
}

void Nested(Node $$anchor, NestedProperties $$properties) {
  var answer = $.property<Object?>($$properties, 'answer', 8);
  var p = _root();
  assert(p.nodeName == 'P');
  var text = $.child<Text>(p);
  assert(text.nodeName == '#text');

  $.reset(p);

  $.templateEffect(() {
    $.setText(text, 'The answer is ${$.stringify(answer())}');
  });

  $.append($$anchor, p);
}
