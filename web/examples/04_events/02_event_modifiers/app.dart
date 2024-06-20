// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _root = $.template<HTMLButtonElement>('''
<button>Click me</button>''');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void App(Node $$anchor, AppProperties $$properties) {
  void handleClick() {
    window.alert('no more alerts');
  }

  var button = _root();
  assert(button.nodeName == 'BUTTON');

  $.event('click', button, $.once((event) => handleClick()), false);
  $.append($$anchor, button);
}
