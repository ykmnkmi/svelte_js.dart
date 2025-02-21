// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _root = $.template<HTMLParagraphElement>('''
<p> </p>''');

extension type NestedProperties._(JSObject _) implements JSObject {
  external factory NestedProperties({ExternalDartReference<Object?> answer});

  @JS('answer')
  external ExternalDartReference<Object?> _answer;

  Object? get answer {
    return $.unref<Object?>(_answer);
  }
}

void Nested(Node $$anchor, NestedProperties $$properties) {
  var p = _root();
  var text = $.child<Text>(p);

  $.reset(p);

  $.templateEffect(() {
    $.setText(text, '''
The answer is ${$$properties.answer ?? ''}''');
  });

  $.append($$anchor, p);
}
