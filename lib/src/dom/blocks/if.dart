@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:web/web.dart';

@JS('if_block')
external void _ifBlock(
  Node anchor,
  JSFunction condition,
  JSFunction consequent, [
  JSFunction? alternate,
  bool elseIf,
]);

void ifBlock(
  Node anchor,
  bool Function() condition,
  void Function(Node anchor) consequent, [
  void Function(Node anchor)? alternate,
  bool elseIf = false,
]) {
  if (alternate == null) {
    _ifBlock(anchor, condition.toJS, consequent.toJS);
  } else {
    _ifBlock(anchor, condition.toJS, consequent.toJS, alternate.toJS, elseIf);
  }
}
