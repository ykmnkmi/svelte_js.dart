// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _root = $.template<HTMLButtonElement>('''
<button class="svelte-hg07jm">Click me</button>''');

extension type CustomButtonProperties._(JSObject _) implements JSObject {
  external factory CustomButtonProperties({JSObject? $$events});
}

void CustomButton(Node $$anchor, CustomButtonProperties $$properties) {
  var button = _root();
  assert(button.nodeName == 'BUTTON');

  $.event('click', button, (Event event) {
    $.bubbleEvent($$properties, event);
  }, false);

  $.append($$anchor, button);
  $.appendStyles(null, 'svelte-urs9w7', '''
\tbutton.svelte-hg07jm {
\t\theight: 4rem;
\t\twidth: 8rem;
\t\tbackground-color: #aaa;
\t\tborder-color: #f1c40f;
\t\tcolor: #f1c40f;
\t\tfont-size: 1.25rem;
\t\tbackground-image: linear-gradient(45deg, #f1c40f 50%, transparent 50%);
\t\tbackground-position: 100%;
\t\tbackground-size: 400%;
\t\ttransition: background 300ms ease-in-out;
\t}
\t
\tbutton.svelte-hg07jm:hover {
\t\tbackground-position: 0;
\t\tcolor: #aaa;
\t}
''');
}
