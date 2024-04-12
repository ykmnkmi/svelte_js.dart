// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _eachBlock = $.template('<li><a target="_blank" rel="noreferrer"> </a></li>');
final _root = $.fragment('<h1>The Famous Cats of YouTube</h1> <ul></ul>');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void App(Node $$anchor, AppProperties $$properties) {
  $.push($$properties, true);

  var cats = [
    (id: 'J---aiyznGQ', name: 'Keyboard Cat'),
    (id: 'z_AbfPXTKms', name: 'Maru'),
    (id: 'OUtn3pvWmpg', name: 'Henri The Existential Cat')
  ];

  var fragment = _root();
  var h1 = $.firstChild<HTMLHeadingElement>(fragment);
  assert(h1.nodeName == 'H1');
  var ul = $.sibling<HTMLUListElement>($.sibling<Text>(h1, true));
  assert(ul.nodeName == 'UL');

  $.eachIndexedBlock(ul, 73, () => cats, ($$anchor, $$item, index) {
    String id() {
      return $.get($$item).id;
    }

    String name() {
      return $.get($$item).name;
    }

    var li = _eachBlock<HTMLLIElement>();
    assert(li.nodeName == 'LI');
    var a = $.child<HTMLAnchorElement>(li);
    assert(a.nodeName == 'A');
    var text = $.child<Text>(a);
    assert(text.nodeName == '#text');

    $.renderEffect(() {
      $.setAttribute(a, 'href', 'https://www.youtube.com/watch?v=${id()}');
      $.setText(text, '${index + 1}: ${name()}');
    });

    $.append($$anchor, li);
  });

  $.append($$anchor, fragment);
  $.pop();
}
