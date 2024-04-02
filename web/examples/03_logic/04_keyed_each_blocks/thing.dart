// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:svelte_js/src/unsafe_cast.dart';
import 'package:web/web.dart';

final _template = $.template(
    '<p><span class="svelte-dgndg6">initial</span> <span class="svelte-dgndg6">current</span></p>');

extension type ThingProperties._(JSObject _) implements JSObject {
  factory ThingProperties({required String current}) {
    return ThingProperties.js(current: current.toExternalReference);
  }

  external factory ThingProperties.js({ExternalDartReference? current});

  @JS('current')
  external ExternalDartReference get _current;

  String get current {
    return unsafeCast<String>(_current.toDartObject);
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

  return (Node $anchor, ThingProperties $properties) {
    $.push($properties, false);

    var initial = $properties.current;

    $.init();

    // Init
    var p = $.open<Element>($anchor, true, _template);
    var span = $.child<Element>(p);
    $.attr(span, 'style', 'background-color: $initial');

    var span1 = $.sibling<Element>($.sibling<Text>(span, true));

    // Update
    $.attrEffect(span1, 'style', () {
      return 'background-color: ${$properties.current}';
    });

    $.close($anchor, p);
    $.pop();
  };
}();
