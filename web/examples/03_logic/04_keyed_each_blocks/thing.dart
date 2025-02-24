// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _root = $.template<HTMLParagraphElement>(
  '<p><span class="svelte-671r1c">initial</span> <span class="svelte-671r1c">current</span></p>',
);

final __css = $.CSS(
  hash: 'svelte-671r1c',
  code: '''
\tspan {
\t\tdisplay: inline-block;
\t\tpadding: 0.2em 0.5em;
\t\tmargin: 0 0.2em 0.2em 0;
\t\twidth: 4em;
\t\ttext-align: center;
\t\tborder-radius: 0.2em;
\t\tcolor: white;
\t}''',
);

extension type ThingProperties._(JSObject _) implements JSObject {
  external factory ThingProperties({ExternalDartReference<String> current});
}

void Thing(Node $$anchor, ThingProperties $$properties) {
  $.appendStyles($$anchor, __css);

  var current = $.property<String>($$properties, 'current', 3);
  // ...but `initial` is fixed upon initialisation
  var initial = current();

  var p = _root();
  var span = $.child<HTMLSpanElement>(p);

  $.setAttribute(span, 'style', 'background-color: $initial');

  var span1 = $.sibling<HTMLSpanElement>(span, 2);

  $.reset(p);

  $.templateEffect(() {
    $.setAttribute(span1, 'style', 'background-color: ${current()}');
  });

  $.append($$anchor, p);
}
