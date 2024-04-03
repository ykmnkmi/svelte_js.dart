@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:web/web.dart';

@JS('bind_value')
external void _bindValue(Element input, JSExportedDartFunction getValue,
    JSExportedDartFunction setValue);

void bindInt(
    Element input, int Function() getValue, void Function(int value) update) {
  void jsUpdate(JSNumber value) {
    update(value.toDartInt);
  }

  _bindValue(input, getValue.toJS, jsUpdate.toJS);
}

void bindDouble(Element input, double Function() getValue,
    void Function(double value) update) {
  void jsUpdate(JSNumber value) {
    update(value.toDartDouble);
  }

  _bindValue(input, getValue.toJS, jsUpdate.toJS);
}

void bindValue(Element input, String Function() getValue,
    void Function(String value) update) {
  _bindValue(input, getValue.toJS, update.toJS);
}