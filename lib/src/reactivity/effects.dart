@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:svelte_js/src/types.dart';
import 'package:svelte_js/src/unsafe_cast.dart';

@JS('legacy_pre_effect')
external JSObject _legacyPreEffect(JSFunction dependency, JSFunction function);

Effect legacyPreEffect<T>(T Function() dependency, void Function() function) {
  var jsDependency = unsafeCast<JSAny? Function()>(dependency);
  return unsafeCast<Effect>(_legacyPreEffect(jsDependency.toJS, function.toJS));
}

@JS('legacy_pre_effect_reset')
external void _legacyPreEffectReset();

void legacyPreEffectReset() {
  _legacyPreEffectReset();
}

@JS('render_effect')
external JSObject _renderEffect(JSAny? initialValue);

Effect renderEffect(void Function(Block block, Signal signal) function) {
  return unsafeCast<Effect>(_renderEffect(function.toJS));
}
