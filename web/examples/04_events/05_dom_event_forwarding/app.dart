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

void App(Node $anchor, AppProperties $properties) {
  $.push($properties, false);

  void handleClick(Event event) {
    window.alert('clicked');
  }

  $.init();

  // Init
  var fragment = $.comment($anchor);
  var node = $.childFragment(fragment);

  CustomButton(node,
      CustomButtonProperties($$events: CustomButtonEvents(click: handleClick)));
  $.closeFragment($anchor, fragment);
  $.pop();
}
