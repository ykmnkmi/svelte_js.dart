// ignore_for_file: library_prefixes
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

import 'inner.dart' as $$;

extension type OuterEvents._(JSObject _) implements JSObject {
  factory OuterEvents({void Function(CustomEvent event)? message}) {
    return OuterEvents.__(message: message?.toJS);
  }

  external OuterEvents.__({JSFunction? message});
}

extension type OuterProperties._(JSObject _) implements JSObject {
  factory OuterProperties({OuterEvents? $$events}) {
    return OuterProperties.__($$events: $$events);
  }

  external factory OuterProperties.__({OuterEvents? $$events});
}

void outer(Node $anchor, OuterProperties $properties) {
  $.push($properties, false);
  $.init();

  // Init
  var fragment = $.comment($anchor);
  var node = $.childFragment(fragment);

  var $$events = $.forwardEvent<$$.InnerEvents>('message', $properties);
  $$.inner(node, $$.InnerProperties($$events: $$events));
  $.closeFragment($anchor, fragment);
  $.pop();
}
