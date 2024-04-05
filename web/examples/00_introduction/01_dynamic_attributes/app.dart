// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _template = $.template('<img>');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void App(Node $anchor, AppProperties $properties) {
  $.push($properties, false);

  var src = '/tutorial/image.gif';
  var name = 'Rick Astley';

  $.init();

  // Init
  var img = $.open<HTMLImageElement>($anchor, true, _template);
  assert(img.nodeName == 'IMG');

  $.attr(img, 'src', src);
  $.attr(img, 'alt', '$name dancing');
  $.close($anchor, img);
  $.pop();
}
