import 'dart:js_interop';

import 'package:svelte_js/src/reactivity/sources.dart';
import 'package:svelte_js/src/ref.dart';

bool safeEquals<T>(State<T?> self, ExternalDartReference<T> value) {
  return identical(unref<T>(value), unref<T?>(self.value));
}

extension<T> on State<T> {
  @JS('v')
  external ExternalDartReference<T> get value;
}
