@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:svelte_js/src/types.dart';

@JS('user_effect')
external void _userEffect(JSExportedDartFunction callback);

void userEffect(void Function() callback) {
  _userEffect(callback.toJS);
}

@JS('render_effect')
external Effect _renderEffect(JSExportedDartFunction callback);

Effect renderEffect(void Function() callback) {
  return _renderEffect(callback.toJS);
}
