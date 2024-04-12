@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:web/web.dart';

@JS('if_block')
external void _ifBlock(
  Comment anchor,
  JSExportedDartFunction condition,
  JSExportedDartFunction consequent, [
  JSExportedDartFunction? alternate,
  bool elseIf,
]);

void ifBlock(
  Comment anchor,
  bool Function() condition,
  void Function(Comment anchor) consequent, [
  void Function(Comment anchor)? alternate,
  bool elseIf = false,
]) {
  _ifBlock(anchor, condition.toJS, consequent.toJS, alternate?.toJS, elseIf);
}
