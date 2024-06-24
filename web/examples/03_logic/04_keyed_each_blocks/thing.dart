// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _root = $.template<HTMLParagraphElement>(
    '<p><span class="svelte-dgndg6">initial</span> <span class="svelte-dgndg6">current</span></p>');

extension type ThingProperties._(JSObject _) implements JSObject {
  external factory ThingProperties({ExternalDartReference? current});

  @JS('current')
  external ExternalDartReference get _current;

  String get current {
    return $.unref<String>(_current);
  }
}

void Thing(Node $$anchor, ThingProperties $$properties) {
  var current = $.property<dynamic>($$properties, 'current');
  var initial = current();
  var p = _root();
  assert(p.nodeName == 'P');
  var span = $.child<HTMLSpanElement>(p);
  assert(span.nodeName == 'SPAN');

  $.setAttribute(span, 'style', 'background-color: ${$.stringify(initial)}');

  var span1 = $.sibling<HTMLSpanElement>($.sibling<Text>(span));
  assert(span1.nodeName == 'SPAN');

  $.templateEffect(() {
    $.setAttribute(span1, 'style', 'background-color: ${$.stringify(current())}');
  });

  $.append($$anchor, p);
  $.appendStyles($$anchor, 'svelte-dgndg6', '''
\tspan.svelte-dgndg6 {
\t\tdisplay: inline-block;
\t\tpadding: 0.2em 0.5em;
\t\tmargin: 0 0.2em 0.2em 0;
\t\twidth: 4em;
\t\ttext-align: center;
\t\tborder-radius: 0.2em;
\t\tcolor: white;
\t}''');
}
