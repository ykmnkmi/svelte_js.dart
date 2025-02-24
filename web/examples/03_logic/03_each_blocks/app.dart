// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _root1 = $.template<HTMLLIElement>('''
<li><a target="_blank" rel="noreferrer"> </a></li>''');
final _root = $.fragment('''
<h1>The Famous Cats of YouTube</h1> <ul></ul>''');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void App(Node $$anchor, AppProperties $$properties) {
  var cats = [
    (id: 'J---aiyznGQ', name: 'Keyboard Cat'),
    (id: 'z_AbfPXTKms', name: 'Maru'),
    (id: 'OUtn3pvWmpg', name: 'Henri The Existential Cat'),
  ];

  var fragment = _root();
  var ul = $.sibling<HTMLUListElement>(
    $.firstChild<HTMLHeadingElement>(fragment),
    2,
  );
  assert(ul.nodeName == 'UL');

  $.eachBlock(ul, 21, () => cats, $.index, ($$anchor, $$item, i) {
    String id() => $$item().id;
    String name() => $$item().name;
    var li = _root1();
    var a = $.child<HTMLAnchorElement>(li);
    var text = $.child<Text>(a);

    $.reset(a);
    $.reset(text);

    $.templateEffect(() {
      $.setAttribute(a, 'href', 'https://www.youtube.com/watch?v=${id()}');
      $.setText(text, '${i + 1}: ${name()}');
    });

    $.append($$anchor, li);
  });

  $.reset(ul);
  $.append($$anchor, fragment);
}
