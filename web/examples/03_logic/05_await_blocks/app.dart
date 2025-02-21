// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:http/http.dart' show get;
import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _root1 = $.template<HTMLParagraphElement>('''
<p> </p>''');
final _root2 = $.template<HTMLParagraphElement>('''
<p style="color: red"> </p>''');
final _root3 = $.template<HTMLParagraphElement>('''
<p>...waiting</p>''');
final _root = $.fragment('''<button>generate random number</button> <!>''');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void App(Node $$anchor, AppProperties $$properties) {
  $.push($$properties, false);

  Future<int> getRandomNumber() async {
    var uri = Uri.parse('https://httpbin.org/bytes/1/throw');
    var response = await get(uri);

    if (response.statusCode == 200) {
      return response.bodyBytes[0];
    }

    throw StateError(response.reasonPhrase!);
  }

  var future = $.mutableState<Future<int>>(getRandomNumber());

  void handleClick() {
    $.set(future, getRandomNumber());
  }

  $.init();

  var fragment = _root();
  var button = $.firstChild<HTMLButtonElement>(fragment);
  assert(button.nodeName == 'BUTTON');
  var node = $.sibling<Comment>(button, 2);
  assert(node.nodeName == '#comment');

  $.awaitBlock(
    node,
    () => $.get(future),
    ($$anchor) {
      var p2 = _root3();
      assert(p2.nodeName == 'P');

      $.append($$anchor, p2);
    },
    ($$anchor, number) {
      var p = _root1();
      assert(p.nodeName == 'P');
      var text1 = $.child<Text>(p);
      assert(text1.nodeName == '#text');

      $.reset(p);

      $.templateEffect(() {
        $.setText(text1, 'The number is ${$.get(number)}');
      });

      $.append($$anchor, p);
    },
    ($$anchor, error) {
      var p1 = _root2();
      assert(p1.nodeName == 'P');
      var text2 = $.child<Text>(p1);
      assert(text2.nodeName == '#text');

      $.reset(p1);

      $.templateEffect(() {
        $.setText(text2, ($.get(error) as StateError).message);
      });

      $.append($$anchor, p1);
    },
  );

  $.event('click', button, (event) => handleClick());
  $.append($$anchor, fragment);
  $.pop();
}
