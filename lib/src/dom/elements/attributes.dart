@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:web/web.dart';

@JS('remove_input_attr_defaults')
external void removeInputAttributeDefaults(HTMLInputElement input);

@JS('set_attribute')
external void setAttribute(Element element, String attribute, String? value);
