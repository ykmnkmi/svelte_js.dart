// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _root =
    $.template('<p><span class="svelte-dgndg6">initial</span> <span class="svelte-dgndg6">current</span></p>');

extension type ThingProperties._(JSObject _) implements JSObject {
  external factory ThingProperties({ExternalDartReference? current});

  @JS('current')
  external ExternalDartReference get _current;

  Object? get current {
    return $.unref<Object?>(_current);
  }
}

final Thing = () {
  $.appendStyles(null, 'svelte-dgndg6', '''
span.svelte-dgndg6 {
		display: inline-block;
		padding: 0.2em 0.5em;
		margin: 0 0.2em 0.2em 0;
		width: 4em;
		text-align: center;
		border-radius: 0.2em;
		color: white;
}''');

  return (Node $$anchor, ThingProperties $$properties) {
    $.push($$properties, true);

    var initial = $$properties.current;
    var p = _root<HTMLParagraphElement>();
    assert(p.nodeName == 'P');
    var span = $.child<HTMLSpanElement>(p);
    assert(span.nodeName == 'SPAN');

    $.setAttribute(span, 'style', 'background-color: $initial');

    var span1 = $.sibling<HTMLSpanElement>($.sibling<Text>(span, true));
    assert(span1.nodeName == 'SPAN');

    $.renderEffect(() {
      $.setAttribute(span1, 'style', 'background-color: ${$$properties.current}');
    });

    $.append($$anchor, p);
    $.pop();
  };
}();
