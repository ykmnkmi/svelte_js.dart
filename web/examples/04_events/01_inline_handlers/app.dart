// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _root = $.template<HTMLDivElement>('''
<div class="svelte-1c44y5p"> </div>''');

final __css = $.CSS(
  hash: 'svelte-1c44y5p',
  code: '''
\tdiv.svelte-1c44y5p {
\t\twidth: 100%;
\t\theight: 100%;
\t}''',
);

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void App(Node $$anchor, AppProperties $$properties) {
  $.appendStyles($$anchor, __css);

  var point = $.mutableState<List<int>>(<int>[0, 0]);

  var div = _root();
  assert(div.nodeName == 'DIV');
  var text = $.child<Text>(div);
  assert(text.nodeName == '#text');

  $.reset(div);

  $.templateEffect(() {
    $.setText(
      text,
      'The mouse position is ${$.get(point)[0]} x ${$.get(point)[1]}',
    );
  });

  $.event('mousemove', div, (MouseEvent event) {
    $.mutate(point, $.get(point)[0] = event.clientX);
    $.mutate(point, $.get(point)[1] = event.clientY);
  });

  $.append($$anchor, div);
}
