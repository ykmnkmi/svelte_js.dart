// ignore_for_file: library_prefixes
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:svelte_js/svelte_js.dart';
import 'package:web/web.dart';

final _template = $.template('<p><!></p>');

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

    var string = "here's some <strong>HTML!!!</strong>";

    $.init();

    // Init
    var p = $.open<Node>($anchor, true, _template);
    var node = $.child<Text>(p);

    String node$html() {
      return string;
    }

    $.html(node, node$html, false);
    $.close($anchor, p);
    $.pop();
  }
}
