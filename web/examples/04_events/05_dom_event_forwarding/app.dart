// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';
import 'dart:js_interop_unsafe';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

import 'custom_button.dart';

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void App(Node $$anchor, AppProperties $$properties) {
  void handleClick() {
    window.alert('clicked');
  }

  var fragment = $.comment();
  var node = $.firstChild<Text>(fragment);
  assert(node.nodeName == '#text');

  void $click(Event event) {
    handleClick();
  }

  var $$events = JSObject();
  $$events.setProperty('click'.toJS, $click.toJS);
  CustomButton(node, CustomButtonProperties($$events: $$events));
  $.append($$anchor, fragment);
}
