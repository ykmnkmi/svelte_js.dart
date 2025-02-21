@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:web/web.dart';

@JS('set_attribute')
external void setAttribute(
  Element element,
  String attribute,
  String? value, [
  bool skipWarning,
]);

// @JS('remove_input_attr_defaults')
// external void _removeInputAttributeDefaults(HTMLInputElement input);

// @noInline
// void removeInputAttributeDefaults(HTMLInputElement input) {
//   _removeInputAttributeDefaults(input);
// }
