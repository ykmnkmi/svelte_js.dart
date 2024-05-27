// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _root = $.template<HTMLParagraphElement>('<p><!></p>');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void App(Node $$anchor, AppProperties $$properties) {
  var string = "here's some <strong>HTML!!!</strong>";
  var p = _root();
  assert(p.nodeName == 'P');
  var node = $.child<Comment>(p);
  assert(node.nodeName == '#comment');

  $.html(node, () => string, false, false);
  $.append($$anchor, p);
}
