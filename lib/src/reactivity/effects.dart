@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:svelte_js/src/types.dart';

@JS('user_effect')
external void _userEffect(JSFunction callback);

void userEffect(void Function() callback) {
  _userEffect(callback.toJS);
}

@JS('legacy_pre_effect')
external void _legacyPreEffect(JSFunction dependency, JSFunction callback);

void legacyPreEffect(
  void Function() dependency,
  void Function() callback,
) {
  _legacyPreEffect(dependency.toJS, callback.toJS);
}

@JS('legacy_pre_effect_reset')
external void legacyPreEffectReset();

@JS('template_effect')
external Effect _templateEffect(JSFunction callback);

Effect templateEffect(void Function() callback) {
  return _templateEffect(callback.toJS);
}
