// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _tmpl1 = $.template('<p>...waiting</p>');
final _tmpl2 = $.template('<p> </p>');
final _tmpl3 = $.template('<p style="color: red"> </p>');
final _fragment = $.fragment('<button>generate random number</button> <!>');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void App(Node $anchor, AppProperties $properties) {
  $.push($properties, false);

  Future<String> getRandomNumber() async {
    var responsePromise =
        window.fetch('https://svelte.dev/tutorial/random-number'.toJS);
    // var responsePromise = window.fetch('/tutorial/random-number'.toJS);
    var response = await responsePromise.toDart;
    var textPromise = response.text();
    var text = await textPromise.toDart;

    if (response.ok) {
      return text.toDart;
    }

    throw Exception(text.toDart);
  }

  var future = $.mutableSource<Future<String>>(getRandomNumber());

  void handleClick(Event event) {
    $.set<Future<String>>(future, getRandomNumber());
  }

  $.init();

  // Init
  var fragment = $.openFragment($anchor, true, _fragment);
  var button = $.childFragment<HTMLButtonElement>(fragment);
  assert(button.nodeName == 'BUTTON');
  var node = $.sibling<Comment>($.sibling<Text>(button, true));
  assert(node.nodeName == '#comment');

  $.event<Event>('click', button, handleClick, false);

  $.awaitBlock<String>(node, () => $.get<Future<String>>(future), ($anchor) {
    /* Init */
    var p = $.open<HTMLParagraphElement>($anchor, true, _tmpl1);
    assert(p.nodeName == 'P');

    $.close($anchor, p);
  }, ($anchor, number) {
    /* Init */
    var p1 = $.open<HTMLParagraphElement>($anchor, true, _tmpl2);
    assert(p1.nodeName == 'P');
    var text1 = $.child<Text>(p1);
    assert(text1.nodeName == '#text');

    text1.nodeValue = 'The number is $number';
    $.close($anchor, p1);
  }, ($anchor, error) {
    /* Init */
    var p2 = $.open<HTMLParagraphElement>($anchor, true, _tmpl3);
    assert(p2.nodeName == 'P');
    var text2 = $.space<Text>($.child<Text>(p2));
    assert(text2.nodeName == '#text');

    /* Update */
    $.textEffect(text2, () => '$error');
    $.close($anchor, p2);
  });

  $.closeFragment($anchor, fragment);
  $.pop();
}
