// ignore_for_file: library_prefixes
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:svelte_js/svelte_js.dart';
import 'package:web/web.dart';

import 'nested.dart' as $$;

final _fragment =
    $.fragment('<p class="svelte-urs9w7">These styles...</p> <!>');

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
    $.init();

    // Init
    var fragment = $.openFragment($anchor, true, _fragment);
    var p = $.childFragment<Element>(fragment);
    var node = $.sibling<Node>($.sibling<Node>(p));

    $$.nested(node);
    $.closeFragment($anchor, fragment);
    $.pop();
  }
}
