// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

extension on HTMLButtonElement {
  external set __click(JSExportedDartFunction handler);
}

final _root = $.template<HTMLButtonElement>('<button>Click to say hello</button>');

extension type InnerProperties._(JSObject _) implements JSObject {
  external factory InnerProperties({ExternalDartReference? message});

  @JS('message')
  external ExternalDartReference? _message;

  void Function(({String text})) get message {
    return $.unref<void Function(({String text}))>(_message);
  }
}

final Inner = () {
  $.delegate(['click']);

  return (Node $$anchor, InnerProperties $$properties) {
    $.push($$properties, true);

    void sayHello(Event event) {
      $$properties.message((text: 'Hello!'));
    }

    var button = _root();
    assert(button.nodeName == 'BUTTON');

    button.__click = $.wrap(sayHello);
    $.append($$anchor, button);
    $.pop();
  };
}();
