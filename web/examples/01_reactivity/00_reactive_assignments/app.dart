// ignore_for_file: library_prefixes
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:svelte_js/svelte_js.dart';
import 'package:web/web.dart';

final _template = $.template('<button> </button>');

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

    var count = $.mutableSource<int>(0);

    void handleClick(Event event) {
      $.set<int>(count, $.get<int>(count) + 1);
    }

    $.init();

    // Init
    var button = $.open<Element>($anchor, true, _template);
    var text = $.child<Text>(button);

    // Update
    String text$textEffect() {
      return 'Clicked ${$.get<int>(count)} ${$.get<int>(count) == 1 ? 'time' : 'times'}';
    }

    $.textEffect(text, text$textEffect);

    $.event('click', button, handleClick, false);
    $.close($anchor, button);
    $.pop();
  }
}
