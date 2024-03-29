@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:svelte_js/src/types.dart';
import 'package:svelte_js/src/unsafe_cast.dart';
import 'package:web/web.dart';

@JS('template')
external JSFunction _template(JSString html, [JSBoolean returnFragment]);

Template template(String html) {
  return unsafeCast<Template>(_template(html.toJS));
}

Fragment fragment(String html) {
  return unsafeCast<Fragment>(_template(html.toJS, true.toJS));
}

@JS('open')
external Node _open(Node? anchor, JSBoolean useCloneNode, JSFunction template);

T open<T extends Node>(Node? anchor, bool useCloneNode, Template template) {
  return unsafeCast<T>(_open(anchor, useCloneNode.toJS, template));
}

@JS('open_frag')
external DocumentFragment _openFragment(Node? anchor, JSBoolean useCloneNode, JSFunction template);

DocumentFragment openFragment(Node? anchor, bool useCloneNode, Fragment fragment) {
  return _openFragment(anchor, useCloneNode.toJS, fragment);
}

@JS('space')
external Node _space(Node? anchor);

T space<T extends Node>(Node? anchor) {
  return unsafeCast<T>(_space(anchor));
}

@JS('comment')
external DocumentFragment _comment(Node? anchor);

DocumentFragment comment(Node? anchor) {
  return _comment(anchor);
}

@JS('close')
external void _close(Node? anchor, Node dom);

void close(Node? anchor, Node dom) {
  _close(anchor, dom);
}

@JS('close_frag')
external void _closeFragment(Node? anchor, DocumentFragment dom);

void closeFragment(Node? anchor, DocumentFragment dom) {
  _closeFragment(anchor, dom);
}
