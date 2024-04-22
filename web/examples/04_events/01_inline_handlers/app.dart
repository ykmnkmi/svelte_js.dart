// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

extension on HTMLDivElement {
  external set __mousemove(JSExportedDartFunction handler);
}

final _root = $.template<HTMLDivElement>('<div class="svelte-1c44y5p"> </div>');

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

  $.delegate(['mousemove']);

  return (Node $$anchor, AppProperties $$properties) {
    $.push($$properties, true);

    var point = $.mutableSource(<int>[0, 0]);

    var div = _root();
    assert(div.nodeName == 'DIV');

    div.__mousemove = $.wrap((MouseEvent event) {
      $.mutate(point, $.get(point)[0] = event.clientX);
	    $.mutate(point, $.get(point)[1] = event.clientY);
    });

    var text = $.child<Text>(div);
    assert(text.nodeName == '#text');

    $.renderEffect(() {
      $.setText(text, 'The mouse position is ${$.get(point)[0]} x ${$.get(point)[1]}');
    });

    $.append($$anchor, div);
    $.pop();
  };
}();
