@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:web/web.dart';

extension type CSS._(JSObject _) implements JSObject {
  external factory CSS({String hash, String code});
}

@JS('append_styles')
external void appendStyles(Node anchor, CSS css);
