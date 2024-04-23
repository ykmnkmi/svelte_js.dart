// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

extension on HTMLButtonElement {
  external set __click(JSExportedDartFunction handler);
}

final _template = $.template<HTMLButtonElement>('<button class="svelte-hg07jm">Click me</button>');

extension type CustomButtonProperties._(JSObject _) implements JSObject {
  external factory CustomButtonProperties({ExternalDartReference? onclick});

  @JS('onclick')
  external ExternalDartReference? _onclick;

  void Function() get onclick {
    return $.unref<void Function()>(_onclick);
  }
}

final CustomButton = () {
  $.appendStyles(null, 'svelte-urs9w7', '''
button.svelte-hg07jm {
  height: 4rem;
  width: 8rem;
  background-color: #aaa;
  border-color: #f1c40f;
  color: #f1c40f;
  font-size: 1.25rem;
  background-image: linear-gradient(45deg, #f1c40f 50%, transparent 50%);
  background-position: 100%;
  background-size: 400%;
  transition: background 300ms ease-in-out;
}

button.svelte-hg07jm:hover {
  background-position: 0;
  color: #aaa;
}
''');

  $.delegate(['click']);

  return (Node $$anchor, CustomButtonProperties $$properties) {
    $.push($$properties, true);

    var button = _template();
    assert(button.nodeName == 'BUTTON');

    button.__click = $.wrap((Event event) {
      $$properties.onclick();
    });

    $.append($$anchor, button);
    $.pop();
  };
}();
