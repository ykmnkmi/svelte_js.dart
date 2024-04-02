// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

import 'thing.dart';

final _fragment = $.fragment(
    '<button>Remove first thing</button> <div style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 1em"><div><h2>Keyed</h2> <!></div> <div><h2>Unkeyed</h2> <!></div></div>');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void App(Node $anchor, AppProperties $properties) {
  $.push($properties, false);

  var things = $
      .mutableSource<List<({int id, String color})>>(<({int id, String color})>[
    (id: 1, color: 'darkblue'),
    (id: 2, color: 'indigo'),
    (id: 3, color: 'deeppink'),
    (id: 4, color: 'salmon'),
    (id: 5, color: 'gold')
  ]);

  void handleClick(Event event) {
    $.set<List<({int id, String color})>>(
        things, $.get<List<({int id, String color})>>(things).sublist(1));
  }

  $.init();

  // Init
  var fragment = $.openFragment($anchor, true, _fragment);
  var button = $.childFragment<Element>(fragment);
  var div = $.sibling<Element>($.sibling<Text>(button, true));
  var div1 = $.child<Element>(div);
  var h2 = $.child<Element>(div1);
  var node = $.sibling<Element>($.sibling<Text>(h2, true));
  var div2 = $.sibling<Element>($.sibling<Text>(div1, true));
  var h21 = $.child<Element>(div2);
  var node2 = $.sibling($.sibling(h21, true));

  $.event<Event>('click', button, handleClick, false);

  $.eachKeyedBlock<({int id, String color})>(
      node,
      () => $.get<List<({int id, String color})>>(things),
      5,
      (thing) => '${thing.id}', ($anchor, thing, index) {
    // Init
    var fragment1 = $.comment($anchor);
    var node1 = $.childFragment<Text>(fragment1, true);

    var thingProperties = ThingProperties.js();
    $.setGetter(thingProperties, 'current',
        () => $.get<({int id, String color})>(thing).color);
    Thing(node1, thingProperties);

    $.closeFragment($anchor, fragment1);
  }, null);

  $.eachIndexedBlock<({int id, String color})>(
      node2, () => $.get<List<({int id, String color})>>(things), 1,
      ($anchor, thing, index) {
    // Init
    var fragment2 = $.comment($anchor);
    var node3 = $.childFragment<Node>(fragment2);

    var thing$properties = ThingProperties.js();
    $.setGetter(thing$properties, 'current',
        () => $.get<({int id, String color})>(thing).color);
    Thing(node3, thing$properties);

    $.closeFragment($anchor, fragment2);
  }, null);

  $.closeFragment($anchor, fragment);
  $.pop();
}
