// ignore_for_file: library_prefixes, non_constant_identifier_names
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

final App = () {
  $.appendStyles(null, 'svelte-1c44y5p', '''
div.svelte-1c44y5p {
  width: 100%;
  height: 100%;
}''');

  return (Node $anchor, AppProperties $properties) {
    $.push($properties, false);

    var point = $.mutableSource<List<int>>(<int>[0, 0]);

    void handleMousemove(MouseEvent event) {
      $.mutate<List<int>, int>(
          point, $.get<List<int>>(point)[0] = event.clientX);
      $.mutate<List<int>, int>(
          point, $.get<List<int>>(point)[1] = event.clientY);
    }

    $.init();

    // Init
    var div = $.open<HTMLDivElement>($anchor, true, _template);
    assert(div.nodeName == 'DIV');
    var text = $.child<Text>(div);
    assert(text.nodeName == '#text');

    // Update
    $.textEffect(text, () {
      return 'The mouse position is ${$.get<List<int>>(point)[0]} x ${$.get<List<int>>(point)[1]}';
    });

    $.event<MouseEvent>('mousemove', div, handleMousemove, false);
    $.close($anchor, div);
    $.pop();
  };
}();
