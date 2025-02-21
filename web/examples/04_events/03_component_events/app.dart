// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:svelte_js/svelte_js.dart';
import 'package:web/web.dart';

import 'inner.dart';

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

@anonymous
extension type _Events1._(JSObject _) implements JSObject {
  external factory _Events1({JSFunction message});
}

void App(Node $$anchor, AppProperties $$properties) {
  void handleMessage(ComponentEvent<({String text})> event) {
    window.alert(event.detail.text);
  }

  Inner(
    $$anchor,
    InnerProperties($$events: _Events1(message: handleMessage.toJS)),
  );
}
