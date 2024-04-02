// ignore_for_file: library_prefixes
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

typedef Cat = ({String id, String name});

final _eachBlock =
    $.template('<li><a target="_blank" rel="noreferrer"> </a></li>');
final _fragment = $.fragment('<h1>The Famous Cats of YouTube</h1> <ul></ul>');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void app(Node $anchor, AppProperties $properties) {
  $.push($properties, false);

  var cats = $.mutableSource<List<Cat>>(<Cat>[
    (id: 'J---aiyznGQ', name: 'Keyboard Cat'),
    (id: 'z_AbfPXTKms', name: 'Maru'),
    (id: 'OUtn3pvWmpg', name: 'Henri The Existential Cat')
  ]);

  $.init();

  // Init
  var fragment = $.openFragment($anchor, true, _fragment);
  var h1 = $.childFragment<Element>(fragment);
  var ul = $.sibling<Element>($.sibling<Text>(h1, true));

  $.eachIndexedBlock<Cat>(ul, () => $.get<List<Cat>>(cats), 9,
      ($anchor, item, index) {
    String id() {
      return $.get<Cat>(item).id;
    }

    String name() {
      return $.get<Cat>(item).name;
    }

    // Init
    var li = $.open<Element>($anchor, true, _eachBlock);
    var a = $.child<Element>(li);
    var text = $.child<Text>(a);
    var ahref = '';

    // Update
    $.renderEffect((block, signal) {
      if (ahref != (ahref = 'https://www.youtube.com/watch?v=${id()}')) {
        $.attr(a, 'href', ahref);
      }

      $.text(text, '${index + 1}: ${name()}');
    });

    $.close($anchor, li);
  }, null);

  $.closeFragment($anchor, fragment);
  $.pop();
}
