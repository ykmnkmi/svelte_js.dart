// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _template = $.template('<button class="svelte-hg07jm">Click me</button>');

extension type CustomButtonEvents._(JSObject _) implements JSObject {
  factory CustomButtonEvents({void Function(Event event)? click}) {
    return CustomButtonEvents.js(click: click?.toJS);
  }

  external CustomButtonEvents.js({JSFunction? click});
}

extension type CustomButtonProperties._(JSObject _) implements JSObject {
  factory CustomButtonProperties({CustomButtonEvents? $$events}) {
    return CustomButtonProperties.js($$events: $$events);
  }

  external factory CustomButtonProperties.js({CustomButtonEvents? $$events});
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

  return (Node $anchor, CustomButtonProperties $properties) {
    $.push($properties, false);
    $.init();

    // Init
    var button = $.open<Element>($anchor, true, _template);

    $.evenBubblet('click', button, $properties);

    $.close($anchor, button);
    $.pop();
  };
}();
