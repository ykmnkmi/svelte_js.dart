@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:web/web.dart';

@JS('if_block')
external void _ifBlock(
  Comment anchor,
  JSFunction condition,
  JSFunction consequent,
  JSFunction? alternate,
);

void ifBlock(
  Comment anchor,
  bool Function() condition,
  void Function(Comment $$anchor) consequent,
  void Function(Comment $$anchor)? alternate,
) {
  _ifBlock(anchor, condition.toJS, consequent.toJS, alternate?.toJS);
}
