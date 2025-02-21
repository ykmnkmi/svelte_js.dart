@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:meta/dart2js.dart';
import 'package:svelte_js/src/reactivity.dart';

export 'package:svelte_js/src/reactivity.dart'
    show Derived, State, state, derived;
export 'package:svelte_js/src/render.dart'
    show Component, ComponentReference, mount, unmount;

@tryInline
void effect(void Function() callback) {
  userEffect(callback);
}
