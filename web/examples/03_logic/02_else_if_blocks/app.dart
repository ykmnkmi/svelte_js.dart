// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _template1 = $.template('<p> </p>');
final _template3 = $.template('<p> </p>');
final _template4 = $.template('<p> </p>');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void App(Node $anchor, AppProperties $properties) {
  $.push($properties, false);

  var x = 7;

  $.init();

  // Init
  var fragment = $.comment($anchor);
  var node = $.childFragment<Comment>(fragment);
  assert(node.nodeName == '#comment');

  $.ifBlock(node, () => x > 10, ($anchor) {
    // Init
    var p = $.open<HTMLParagraphElement>($anchor, true, _template1);
    assert(p.nodeName == 'P');
    var text = $.child<Text>(p);
    assert(text.nodeName == '#text');

    text.nodeValue = '$x is greater than 10';
    $.close($anchor, p);
  }, ($anchor) {
    // Init
    var fragment1 = $.comment($anchor);
    var node1 = $.childFragment<Comment>(fragment1);
    assert(node1.nodeName == '#comment');

    $.ifBlock(node1, () => 5 > x, ($anchor) {
      var p1 = $.open<HTMLParagraphElement>($anchor, true, _template3);
      assert(p1.nodeName == 'P');
      var text1 = $.child<Text>(p1);
      assert(text1.nodeName == '#text');

      text1.nodeValue = '$x is less than 5';
      $.close($anchor, p1);
    }, ($enchor) {
      var p2 = $.open<HTMLParagraphElement>($anchor, true, _template4);
      assert(p2.nodeName == 'P');
      var text2 = $.child<Text>(p2);
      assert(text2.nodeName == '#text');

      text2.nodeValue = '$x is between 5 and 10';
      $.close($anchor, p2);
    });

    $.closeFragment($anchor, fragment1);
  });

  $.closeFragment($anchor, fragment);
  $.pop();
}
