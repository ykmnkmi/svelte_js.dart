@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:svelte_js/src/unsafe_cast.dart';
import 'package:web/web.dart';

@JS('child')
external Node _child(Node anchor);

T child<T extends Node>(Node anchor) {
  return unsafeCast<T>(_child(anchor));
}

@JS('child_frag')
external Node _childFragment(Node anchor, [JSBoolean isText]);

T childFragment<T extends Node>(DocumentFragment fragment, [bool? isText]) {
  if (isText == null) {
    return unsafeCast<T>(_childFragment(fragment));
  }

  return unsafeCast<T>(_childFragment(fragment, isText.toJS));
}

@JS('sibling')
external Node _sibling(Node anchor, [JSBoolean isText]);

T sibling<T extends Node>(Node anchor, [bool? isText]) {
  if (isText == null) {
    return unsafeCast<T>(_sibling(anchor));
  }

  return unsafeCast<T>(_sibling(anchor, isText.toJS));
}
