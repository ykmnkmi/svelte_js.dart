@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:web/web.dart';

@JS('bind_value')
external void _bindValue(Element input, JSExportedDartFunction getValue,
    JSExportedDartFunction setValue);

void bindValue(Element input, String Function() getValue,
    void Function(String value) update) {
  _bindValue(input, getValue.toJS, update.toJS);
}
