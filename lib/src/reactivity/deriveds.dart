@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:svelte_js/src/ref.dart';
import 'package:svelte_js/src/types.dart';

@JS('derived')
external Derived<T> _derived<T>(JSExportedDartFunction update);

Derived<T> derived<T>(T Function() update) {
  ExternalDartReference? jsUpdate() {
    return ref(update());
  }

  return _derived<T>(jsUpdate.toJS);
}
