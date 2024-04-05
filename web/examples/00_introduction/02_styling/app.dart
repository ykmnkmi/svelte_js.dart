// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _template = $.template('<p class="svelte-urs9w7">Styled!</p>');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

final App = () {
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
    var p = $.open<HTMLParagraphElement>($anchor, true, _template);
    assert(p.nodeName == 'P');

    $.close($anchor, p);
    $.pop();
  };
}();
