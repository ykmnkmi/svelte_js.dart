@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:meta/dart2js.dart';
import 'package:svelte_js/src/reactivity/signal.dart';

extension type Effect._(JSObject _) implements Signal<void> {}

@JS('user_effect')
external Effect? _userEffect(JSExportedDartFunction callback);

@tryInline
Effect? userEffect(void Function() callback) {
  return _userEffect(callback.toJS);
}

@JS('template_effect')
external Effect _templateEffect(JSExportedDartFunction callback);

@tryInline
Effect templateEffect(void Function() callback) {
  return _templateEffect(callback.toJS);
}
