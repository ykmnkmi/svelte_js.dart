// ignore_for_file: library_prefixes, non_constant_identifier_names
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

void App(Node $anchor, AppProperties $properties) {
  $.push($properties, false);

  var cats = $.mutableSource<List<Cat>>(<Cat>[
    (id: 'J---aiyznGQ', name: 'Keyboard Cat'),
    (id: 'z_AbfPXTKms', name: 'Maru'),
    (id: 'OUtn3pvWmpg', name: 'Henri The Existential Cat')
  ]);

  $.init();

  // Init
  var fragment = $.openFragment($anchor, true, _fragment);
  var h1 = $.childFragment<HTMLHeadingElement>(fragment);
  assert(h1.nodeName == 'H1');
  var ul = $.sibling<HTMLUListElement>($.sibling<Text>(h1, true));
  assert(ul.nodeName == 'UL');

  $.eachIndexedBlock<Cat>(ul, () => $.get<List<Cat>>(cats), 9,
      ($anchor, item, index) {
    String id() {
      return $.get<Cat>(item).id;
    }

    String name() {
      return $.get<Cat>(item).name;
    }

    // Init
    var li = $.open<HTMLLIElement>($anchor, true, _eachBlock);
    assert(li.nodeName == 'LI');
    var a = $.child<HTMLAnchorElement>(li);
    assert(a.nodeName == 'A');
    var text = $.child<Text>(a);
    assert(text.nodeName == '#text');
    var a$href = '';

    // Update
    $.renderEffect((block, signal) {
      if (a$href != (a$href = 'https://www.youtube.com/watch?v=${id()}')) {
        $.attr(a, 'href', a$href);
      }

      $.text(text, '${index + 1}: ${name()}');
    });

    $.close($anchor, li);
  }, null);

  $.closeFragment($anchor, fragment);
  $.pop();
}
