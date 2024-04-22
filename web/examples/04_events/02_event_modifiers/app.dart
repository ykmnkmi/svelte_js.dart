// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

extension on HTMLButtonElement {
  external set __click(JSExportedDartFunction handler);
}

final _root = $.template<HTMLButtonElement>('<button>Click me</button>');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

final App = () {
  $.delegate(['click']);

  return (Node $$anchor, AppProperties $$properties) {
    $.push($$properties, true);

    void Function() once(void Function()? handler) {
      return () {
        if (handler != null) {
          handler!();
          handler = null;
        }
      };
    }

    void handleClick() {
      window.alert('no more alerts');
    }

    var button = _root();
    assert(button.nodeName == 'BUTTON');

    button.__click = $.wrap(once(handleClick));
    $.append($$anchor, button);
    $.pop();
  };
}();
