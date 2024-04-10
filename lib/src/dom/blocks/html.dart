@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:web/web.dart';

@JS('html')
external void _html(Node dom, JSFunction value, bool svg);

void html(Node dom, String Function() value, bool svg) {
  _html(dom, value.toJS, svg);
}
