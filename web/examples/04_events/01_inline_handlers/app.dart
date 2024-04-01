// ignore_for_file: library_prefixes
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _template = $.template('<div class="svelte-1c44y5p"> </div>');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

final app = () {
  $.appendStyles(null, 'svelte-1c44y5p', '''
div.svelte-1c44y5p {
  width: 100%;
  height: 100%;
}''');

  return (Node $anchor, AppProperties $properties) {
    $.push($properties, false);

    var point = $.mutableSource<List<int>>(<int>[0, 0]);

    $.init();

    // Init
    var div = $.open<Element>($anchor, true, _template);
    var text = $.child<Text>(div);

    // Update
    $.textEffect(text, () {
      return 'The mouse position is ${$.get<List<int>>(point)[0]} x ${$.get<List<int>>(point)[1]}';
    });

    $.event<MouseEvent>('mousemove', div, (event) {
      $.set<List<int>>(point, <int>[event.clientX, event.clientY]);
    }, false);
    $.close($anchor, div);
    $.pop();
  };
}();
