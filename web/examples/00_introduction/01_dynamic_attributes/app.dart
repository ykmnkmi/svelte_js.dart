// ignore_for_file: library_prefixes
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:svelte_js/svelte_js.dart';
import 'package:web/web.dart';

final _template = $.template('<img>');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

const App app = App._();

final class App implements Component<AppProperties> {
  const App._();

  @override
  void call(Node node) {
    component(node, AppProperties());
  }

  @override
  void component(Node $anchor, AppProperties $properties) {
    $.push($properties, false);

    var src = '/tutorial/image.gif';
    var name = 'Rick Astley';

    $.init();

    // Init
    var img = $.open<Element>($anchor, true, _template);

    $.attr(img, 'src', src);
    $.attr(img, 'alt', '$name dancing');
    $.close($anchor, img);
    $.pop();
  }
}
