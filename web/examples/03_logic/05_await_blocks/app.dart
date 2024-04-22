// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

extension on HTMLButtonElement {
  external set __click(JSExportedDartFunction handler);
}

final _root1 = $.template<HTMLParagraphElement>('<p>...waiting</p>');
final _root2 = $.template<HTMLParagraphElement>('<p> </p>');
final _root3 = $.template<HTMLParagraphElement>('<p style="color: red"> </p>');
final _root = $.fragment('<button>generate random number</button> <!>');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

final App = () {
  $.delegate(['click']);

  return (Node $$anchor, AppProperties $$properties) {
    $.push($$properties, true);

    Future<String> getRandomNumber() async {
      var responsePromise = window.fetch('https://svelte.dev/tutorial/random-number'.toJS);
      var response = await responsePromise.toDart;
      var textPromise = response.text();
      var text = await textPromise.toDart;

      if (response.ok) {
        return text.toDart;
      }

      throw Exception(text.toDart);
    }

    var future = $.source(getRandomNumber());

    void handleClick() {
      $.set(future, getRandomNumber());
    }

    var fragment = _root();
    var button = $.child<HTMLButtonElement>(fragment);
    assert(button.nodeName == 'BUTTON');

    button.__click = $.wrap(handleClick);

    var node = $.sibling<Comment>($.sibling<Text>(button));
    assert(node.nodeName == '#comment');

    $.awaitBlock(node, () => $.get(future), ($$anchor) {
      var p = _root1();
      assert(p.nodeName == 'P');

      $.append($$anchor, p);
    }, ($$anchor, number) {
      var p1 = _root2();
      assert(p1.nodeName == 'P');
      var text1 = $.child<Text>(p1);
      assert(text1.nodeName == '#text');

      text1.nodeValue = 'The number is $number';
      $.append($$anchor, p1);
    }, ($$anchor, error) {
      var p2 = _root3();
      assert(p2.nodeName == 'P');
      var text2 = $.child<Text>(p2);
      assert(text2.nodeName == '#text');

      $.renderEffect(() {
        $.setText(text2, '$error');
      });

      $.append($$anchor, p2);
    });

    $.append($$anchor, fragment);
    $.pop();
  };
}();
