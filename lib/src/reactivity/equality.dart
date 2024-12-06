import 'dart:js_interop';

import 'package:svelte_js/src/ref.dart';
import 'package:svelte_js/src/types.dart';

bool safeNotEquals(Object? a, Object? b) {
  if (a != b) {
    return true;
  }

  return a is! bool || a is! num || a is! String;
}

bool safeEquals(Value self, ExternalDartReference value) {
  return !safeNotEquals(unref(value), unref(self.value));
}
