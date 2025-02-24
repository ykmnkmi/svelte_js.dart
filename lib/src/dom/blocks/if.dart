@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:meta/dart2js.dart';
import 'package:web/web.dart';

@JS('if_block')
external void _ifBlock(Node anchor, JSFunction branch, [bool elseIf]);

@tryInline
void ifBlock(
  Node anchor,
  void Function(
    void Function(void Function(Node anchor) callback, [bool flag]) render,
  )
  branch, [
  bool? elseIf,
]) {
  void jsBranch(JSFunction jsRender) {
    branch((callback, [flag = true]) {
      jsRender.callAsFunction(null ,callback.toJS, flag.toJS);
    });
  }

  if (elseIf == null) {
    _ifBlock(anchor, jsBranch.toJS);
  } else {
    _ifBlock(anchor, jsBranch.toJS, elseIf);
  }
}
