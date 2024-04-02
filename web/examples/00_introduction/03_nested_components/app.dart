// ignore_for_file: library_prefixes
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

import 'nested.dart' as $$;

final _fragment =
    $.fragment('<p class="svelte-urs9w7">These styles...</p> <!>');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

final app = () {
  $.appendStyles(null, 'svelte-urs9w7', '''
p.svelte-urs9w7 {
  color: purple;
  font-family: 'Comic Sans MS', cursive;
  font-size: 2em;
}
''');

  return (Node $anchor, AppProperties $properties) {
    $.push($properties, false);
    $.init();

    // Init
    var fragment = $.openFragment($anchor, true, _fragment);
    var p = $.childFragment<Element>(fragment);
    var node = $.sibling<Node>($.sibling<Text>(p, true));

    $$.nested(node, $$.NestedProperties());
    $.closeFragment($anchor, fragment);
    $.pop();
  };
}();
