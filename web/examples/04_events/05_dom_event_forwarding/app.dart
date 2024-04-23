// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

import 'custom_button.dart';

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

final App = () {
  $.delegate(['click']);

  return (Node $$anchor, AppProperties $$properties) {
    $.push($$properties, true);

    void handleClick() {
      window.alert('clicked');
    }

    var fragment = $.comment();
    var node = $.child<Comment>(fragment);
    assert(node.nodeName == '#comment');

    CustomButton(node, CustomButtonProperties(onclick: $.ref(handleClick)));
    $.append($$anchor, fragment);
    $.pop();
  };
}();
