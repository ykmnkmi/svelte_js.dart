@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:svelte_js/src/array_conversion.dart';
import 'package:web/web.dart';

@JS('bind_value')
external void _bindValue(
  HTMLElement input,
  JSFunction getValue,
  JSFunction setValue,
);

void bindInt(
  HTMLElement input,
  int Function() getValue,
  void Function(int value) update,
) {
  _bindValue(input, getValue.toJS, update.toJS);
}

void bindDouble(
  HTMLElement input,
  double Function() getValue,
  void Function(double value) update,
) {
  _bindValue(input, getValue.toJS, update.toJS);
}

void bindValue(
  HTMLElement input,
  String Function() getValue,
  void Function(String value) update,
) {
  _bindValue(input, getValue.toJS, update.toJS);
}

@JS('bind_group')
external void _bindGroup(
  JSArray<HTMLElement> inputs,
  JSArray<JSNumber> groupIndex,
  HTMLElement input,
  JSFunction getValue,
  JSFunction update,
);

void bindIntGroup(
  JSArray<HTMLElement> inputs,
  HTMLElement input,
  int Function() getValue,
  void Function(int value) update,
) {
  _bindGroup(inputs, JSArray<JSNumber>(), input, getValue.toJS, update.toJS);
}

void bindStringGroup(
  JSArray<HTMLElement> inputs,
  HTMLElement input,
  List<String> Function() getValue,
  void Function(List<String> value) update,
) {
  JSArray<JSString> jsGetValue() {
    var values = getValue();
    return values.toJS;
  }

  void jsUpdate(JSArray<JSString> jsValues) {
    update(jsValues.toDart);
  }

  _bindGroup(
    inputs,
    JSArray<JSNumber>(),
    input,
    jsGetValue.toJS,
    jsUpdate.toJS,
  );
}

@JS('bind_checked')
external void _bindChecked(
  HTMLElement input,
  JSFunction getValue,
  JSFunction setValue,
);

void bindChecked(
  HTMLElement input,
  bool Function() getValue,
  void Function(bool value) update,
) {
  _bindChecked(input, getValue.toJS, update.toJS);
}

@JS('bind_files')
external void _bindFiles(
  HTMLElement input,
  JSFunction getValue,
  JSFunction setValue,
);

void bindFiles(
  HTMLElement input,
  FileList? Function() getValue,
  void Function(FileList? value) update,
) {
  _bindFiles(input, getValue.toJS, update.toJS);
}
