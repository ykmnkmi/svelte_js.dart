@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:svelte_js/src/ref.dart';
import 'package:svelte_js/src/types.dart';
import 'package:svelte_js/src/unsafe_cast.dart';

@JS('legacy_pre_effect')
external JSObject _legacyPreEffect(
    JSExportedDartFunction dependency, JSExportedDartFunction function);

Effect legacyPreEffect<T extends Object?>(
    T Function() dependency, void Function() function) {
  ExternalDartReference? jsDependency() {
    return ref<T>(dependency());
  }

  return unsafeCast<Effect>(_legacyPreEffect(jsDependency.toJS, function.toJS));
}

@JS('legacy_pre_effect_reset')
external void _legacyPreEffectReset();

void legacyPreEffectReset() {
  _legacyPreEffectReset();
}

@JS('render_effect')
external JSObject _renderEffect(JSExportedDartFunction initialValue);

Effect renderEffect(void Function(Block block, Signal signal) function) {
  return unsafeCast<Effect>(_renderEffect(function.toJS));
}
