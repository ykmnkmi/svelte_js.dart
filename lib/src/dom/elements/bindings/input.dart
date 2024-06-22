@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:svelte_js/src/array_conversion.dart';
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

@JS('bind_group')
external void _bindGroup(
  JSArray<HTMLInputElement> inputs,
  JSArray<JSNumber> groupIndex,
  HTMLInputElement input,
  JSFunction getValue,
  JSFunction update,
);

void bindIntGroup(
  JSArray<HTMLInputElement> inputs,
  List<int> groupIndex,
  HTMLInputElement input,
  int Function() getValue,
  void Function(int value) update,
) {
  _bindGroup(inputs, groupIndex.toJS, input, getValue.toJS, update.toJS);
}

void bindStringGroup(
  JSArray<HTMLInputElement> inputs,
  List<int> groupIndex,
  HTMLInputElement input,
  List<String> Function() getValue,
  void Function(List<String> value) update,
) {
  var jsGroupIndex = groupIndex.toJS;

  JSArray<JSString> jsGetValue() {
    var values = getValue();
    return values.toJS;
  }

  void jsUpdate(JSArray<JSString> jsValues) {
    update(jsValues.toDart);
  }

  _bindGroup(inputs, jsGroupIndex, input, jsGetValue.toJS, jsUpdate.toJS);
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
