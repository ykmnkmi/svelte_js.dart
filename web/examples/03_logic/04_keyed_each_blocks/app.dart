// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

import 'thing.dart';

extension on HTMLButtonElement {
  external set __click(JSExportedDartFunction handler);
}

final _root = $.fragment(
    '<button>Remove first thing</button> <div style="display: grid; grid-template-columns: 1fr 1fr; grid-gap: 1em"><div><h2>Keyed</h2> <!></div> <div><h2>Unkeyed</h2> <!></div></div>');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

final App = () {
  $.delegate(['click']);

  return (Node $$anchor, AppProperties $$properties) {
    $.push($$properties, true);

    var things = $.source([
      (id: 1, color: 'darkblue'),
      (id: 2, color: 'indigo'),
      (id: 3, color: 'deeppink'),
      (id: 4, color: 'salmon'),
      (id: 5, color: 'gold'),
    ]);

    void handleClick() {
      $.set(things, $.get(things).sublist(1));
    }

    var fragment = _root();
    var button = $.child<HTMLButtonElement>(fragment);
    assert(button.nodeName == 'BUTTON');

    button.__click = $.wrap(handleClick);

    var div = $.sibling<HTMLDivElement>($.sibling<Text>(button));
    assert(div.nodeName == 'DIV');
    var div1 = $.child<HTMLDivElement>(div);
    assert(div1.nodeName == 'DIV');
    var h2 = $.child<HTMLHeadingElement>(div1);
    assert(h2.nodeName == 'H2');
    var node = $.sibling<Comment>($.sibling<Text>(h2));
    assert(node.nodeName == '#comment');

    $.eachBlock(node, 69, () => $.get(things), (thing, index) => '${thing.id}', ($$anchor, thing, index) {
      var fragment1 = $.comment();
      var node1 = $.child<Comment>(fragment1);
      assert(node1.nodeName == '#comment');

      var thingProperties = ThingProperties();
      $.setGetter(thingProperties, 'current', () => $.ref($.get(thing).color));
      Thing(node1, thingProperties);

      $.append($$anchor, fragment1);
    });

    var div2 = $.sibling<HTMLDivElement>($.sibling<Text>(div1));
    assert(div2.nodeName == 'DIV');
    var h21 = $.child<HTMLHeadingElement>(div2);
    assert(h21.nodeName == 'H2');
    var node2 = $.sibling<Comment>($.sibling<Text>(h21));
    assert(node2.nodeName == '#comment');

    $.eachBlock(node2, 65, () => $.get(things), $.index, ($$anchor, thing, $$index) {
      var fragment2 = $.comment();
      var node3 = $.child<Comment>(fragment2);
      assert(node3.nodeName == '#comment');

      var thing$properties = ThingProperties();
      $.setGetter(thing$properties, 'current', () => $.ref($.get(thing).color));
      Thing(node3, thing$properties);

      $.append($$anchor, fragment2);
    });

    $.append($$anchor, fragment);
    $.pop();
  };
}();
