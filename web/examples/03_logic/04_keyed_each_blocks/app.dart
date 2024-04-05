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
  var button = $.childFragment<HTMLButtonElement>(fragment);
  assert(button.nodeName == 'BUTTON');
  var div = $.sibling<HTMLDivElement>($.sibling<Text>(button, true));
  assert(div.nodeName == 'DIV');
  var div1 = $.child<HTMLDivElement>(div);
  assert(div1.nodeName == 'DIV');
  var h2 = $.child<HTMLHeadingElement>(div1);
  assert(h2.nodeName == 'H2');
  var node = $.sibling<Comment>($.sibling<Text>(h2, true));
  assert(node.nodeName == '#comment');
  var div2 = $.sibling<HTMLDivElement>($.sibling<Text>(div1, true));
  assert(div2.nodeName == 'DIV');
  var h21 = $.child<HTMLHeadingElement>(div2);
  assert(h21.nodeName == 'H2');
  var node2 = $.sibling<Comment>($.sibling<Text>(h21, true));
  assert(node2.nodeName == '#comment');

  $.event<Event>('click', button, handleClick, false);

  $.eachKeyedBlock<({int id, String color})>(
      node,
      () => $.get<List<({int id, String color})>>(things),
      5,
      (thing) => '${thing.id}', ($anchor, thing, index) {
    // Init
    var fragment1 = $.comment($anchor);
    var node1 = $.childFragment<Comment>(fragment1, true);
    assert(node1.nodeName == '#comment');

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
    assert(node3.nodeName == '#comment');

    var thing$properties = ThingProperties.js();
    $.setGetter(thing$properties, 'current',
        () => $.get<({int id, String color})>(thing).color);
    Thing(node3, thing$properties);

    $.closeFragment($anchor, fragment2);
  }, null);

  $.closeFragment($anchor, fragment);
  $.pop();
}
