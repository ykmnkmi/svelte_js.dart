// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

import 'thing.dart';

final _root = $.fragment(
  '<button>Remove first thing</button> <div style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 1em"><div><h2>Keyed</h2> <!></div> <div><h2>Unkeyed</h2> <!></div></div>',
);

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void App(Node $$anchor, AppProperties $$properties) {
  var things = $.state([
    (id: 1, color: 'darkblue'),
    (id: 2, color: 'indigo'),
    (id: 3, color: 'deeppink'),
    (id: 4, color: 'salmon'),
    (id: 5, color: 'gold'),
  ]);

  void handleClick() {
    things.update((things) => things.sublist(1));
  }

  var fragment = _root();
  var button = $.firstChild<HTMLButtonElement>(fragment);
  var div = $.sibling<HTMLDivElement>(button, 2);
  var div1 = $.child<HTMLDivElement>(div);
  var node = $.sibling<Comment>($.child(div1), 2);

  $.eachBlock(node, 17, () => things(), (thing, index) => thing.id.toJS, (
    $$anchor,
    thing,
    index,
  ) {
    Thing(
      $$anchor,
      $.getObjectWithGetter<ThingProperties>(
        'current',
        () => $.ref<String>(thing().color),
      ),
    );
  });

  $.reset(div1);

  var div2 = $.sibling<HTMLDivElement>(div1, 2);
  var node1 = $.sibling<Comment>($.child<HTMLHeadingElement>(div2), 2);

  $.eachBlock(node1, 17, () => $.get(things), $.index, (
    $$anchor,
    thing,
    index,
  ) {
    Thing(
      $$anchor,
      $.getObjectWithGetter<ThingProperties>(
        'current',
        () => $.ref<String>(thing().color),
      ),
    );
  });

  $.reset(div2);
  $.reset(div);
  $.event<Event>('click', button, (event) => handleClick());
  $.append($$anchor, fragment);
}
