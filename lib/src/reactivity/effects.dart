@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:svelte_js/src/ref.dart';
import 'package:svelte_js/src/types.dart';

@JS('legacy_pre_effect')
external Effect _legacyPreEffect(
    JSExportedDartFunction dependency, JSExportedDartFunction function);

Effect legacyPreEffect<T>(T Function() dependency, void Function() function) {
  ExternalDartReference? jsDependency() {
    return ref(dependency());
  }

  return _legacyPreEffect(jsDependency.toJS, function.toJS);
}

@JS('legacy_pre_effect_reset')
external void _legacyPreEffectReset();

void legacyPreEffectReset() {
  _legacyPreEffectReset();
}

@JS('render_effect')
external Effect _renderEffect(JSExportedDartFunction initialValue);

Effect renderEffect(void Function(Block block, Signal signal) function) {
  return _renderEffect(function.toJS);
}
