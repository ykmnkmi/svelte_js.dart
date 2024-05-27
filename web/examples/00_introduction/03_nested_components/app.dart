// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

import 'nested.dart';

final _root = $.fragment('<p class="svelte-urs9w7">These styles...</p> <!>');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

final _app = () {
  $.appendStyles(null, 'svelte-urs9w7', '''
p.svelte-urs9w7 {
  color: purple;
  font-family: 'Comic Sans MS', cursive;
  font-size: 2em;
}
''');

  return (Node $$anchor, AppProperties $$properties) {
    var fragment = _root();
    var p = $.child<HTMLParagraphElement>(fragment);
    assert(p.nodeName == 'P');
    var node = $.sibling<Comment>($.sibling<Text>(p, true));
    assert(node.nodeName == '#comment');

    Nested(node, NestedProperties());
    $.append($$anchor, fragment);
  };
}();

void App(Node $$anchor, AppProperties $$props) {
  _app($$anchor, $$props);
}
