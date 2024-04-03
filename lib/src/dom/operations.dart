@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:web/web.dart';

@JS('child')
external T _child<T extends Node>(Node anchor);

T child<T extends Node>(Node anchor) {
  return _child<T>(anchor);
}

@JS('child_frag')
external T _childFragment<T extends Node>(Node anchor, JSBoolean isText);

T childFragment<T extends Node>(DocumentFragment fragment,
    [bool isText = false]) {
  return _childFragment<T>(fragment, isText.toJS);
}

@JS('sibling')
external T _sibling<T extends Node>(Node anchor, JSBoolean isText);

T sibling<T extends Node>(Node anchor, [bool isText = false]) {
  return _sibling<T>(anchor, isText.toJS);
}
