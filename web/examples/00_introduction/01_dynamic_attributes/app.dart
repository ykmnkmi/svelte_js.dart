// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _root = $.template<HTMLImageElement>('''
<img>''');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void App(Node $$anchor, AppProperties $$properties) {
  var src = '/tutorial/image.gif';
  var name = 'Rick Astley';
  var img = _root();
  assert(img.nodeName == 'IMG');

  $.setAttribute(img, 'src', src);
  $.setAttribute(img, 'alt', '$name dancing');
  $.append($$anchor, img);
}
