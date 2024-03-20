@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:web/web.dart';

@JS('attr_effect')
external void _attrEffect(Node dom, JSString attribute, JSFunction getValue);

void attrEffect(Node dom, String attribute, String Function() value) {
  _attrEffect(dom, attribute.toJS, value.toJS);
}

@JS('attr')
external void _attr(Element dom, JSString attribute, JSString? value);

void attr(Element dom, String attribute, String? value) {
  _attr(dom, attribute.toJS, value?.toJS);
}
