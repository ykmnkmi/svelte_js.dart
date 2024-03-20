// ignore_for_file: library_prefixes
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final frag_1 = $.template('<p>...waiting</p>');
final frag_2 = $.template('<p> </p>');
final frag_3 = $.template('<p style="color: red"> </p>');
final _fragment = $.fragment('<button>generate random number</button> <!>');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void app(Node $anchor, AppProperties $properties) {
  $.push($properties, false);

  Future<String> getRandomNumber() async {
    var responsePromise = window.fetch('https://svelte.dev/tutorial/random-number'.toJS);
    // var responsePromise = window.fetch('/tutorial/random-number'.toJS);
    var response = await responsePromise.toDart;
    var textPromise = response.text();
    var text = await textPromise.toDart;

    if (response.ok) {
      return text.toDart;
    }

    throw Exception(text);
  }

  var future = $.mutableSource<Future<String>>(getRandomNumber());

  void handleClick(Event event) {
    $.set<Future<String>>(future, getRandomNumber());
  }

  $.init();

  // Init
  var fragment = $.openFragment($anchor, true, _fragment);
  var button = $.childFragment<Element>(fragment);
  var node = $.sibling<Comment>($.sibling<Text>(button, true));

  $.event('click', button, handleClick, false);

  $.awaitBlock<String>(node, () => $.get<Future<String>>(future), ($anchor) {
    /* Init */
    var p = $.open<Element>($anchor, true, frag_1);

    $.close($anchor, p);
  }, ($anchor, number) {
    /* Init */
    var p1 = $.open<Element>($anchor, true, frag_2);
    var text1 = $.child(p1);

    text1.nodeValue = 'The number is $number';
    $.close($anchor, p1);
  }, ($anchor, error) {
    /* Init */
    var p2 = $.open<Element>($anchor, true, frag_3);
    var text2 = $.space<Text>($.child<Text>(p2));

    /* Update */
    $.textEffect(text2, () => '$error');
    $.close($anchor, p2);
  });

  $.closeFragment($anchor, fragment);
  $.pop();
}
