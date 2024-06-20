@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:web/web.dart';

@JS('bind_value')
external void _bindValue(
  HTMLInputElement input,
  JSFunction getValue,
  JSFunction setValue,
);

void bindInt(
  HTMLInputElement input,
  int Function() getValue,
  void Function(int value) update,
) {
  _bindValue(input, getValue.toJS, update.toJS);
}

void bindDouble(
  HTMLInputElement input,
  double Function() getValue,
  void Function(double value) update,
) {
  _bindValue(input, getValue.toJS, update.toJS);
}

void bindValue(
  HTMLInputElement input,
  String Function() getValue,
  void Function(String value) update,
) {
  _bindValue(input, getValue.toJS, update.toJS);
}

@JS('bind_checked')
external void _bindChecked(
  HTMLInputElement input,
  JSFunction getValue,
  JSFunction setValue,
);

void bindChecked(
  HTMLInputElement input,
  bool Function() getValue,
  void Function(bool value) update,
) {
  _bindChecked(input, getValue.toJS, update.toJS);
}
