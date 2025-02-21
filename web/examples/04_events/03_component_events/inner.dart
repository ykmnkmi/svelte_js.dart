// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:svelte_js/svelte_js.dart';
import 'package:web/web.dart';

final _root = $.template<HTMLButtonElement>('''
<button>Click to say hello</button>''');

extension type InnerProperties._(JSObject _) implements JSObject {
  external factory InnerProperties({JSObject? $$events});
}

void Inner(Node $$anchor, InnerProperties $$properties) {
  $.push($$properties, false);

  var dispatch = createEventDispatcher();

  void sayHello() {
    dispatch('message', (text: 'Hello!'));
  }

  $.init();

  var button = _root();
  assert(button.nodeName == 'BUTTON');

  $.event('click', button, (event) => sayHello());
  $.append($$anchor, button);
  $.pop();
}
