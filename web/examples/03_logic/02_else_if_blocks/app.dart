// ignore_for_file: library_prefixes
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

void app(Node $anchor, AppProperties $properties) {
  $.push($properties, false);

  var x = 7;

  $.init();

  // Init
  var fragment = $.comment($anchor);
  var node = $.childFragment<Comment>(fragment);

  $.ifBlock(node, () => x > 10, ($anchor) {
    // Init
    var p = $.open<Element>($anchor, true, _template1);
    var text = $.child<Text>(p);

    text.nodeValue = '$x is greater than 10';
    $.close($anchor, p);
  }, ($anchor) {
    // Init
    var fragment1 = $.comment($anchor);
    var node1 = $.childFragment<Comment>(fragment1);

    $.ifBlock(node1, () => 5 > x, ($anchor) {
      var p1 = $.open<Element>($anchor, true, _template3);
      var text1 = $.child<Text>(p1);

      text1.nodeValue = '$x is less than 5';
      $.close($anchor, p1);
    }, ($enchor) {
      var p2 = $.open<Element>($anchor, true, _template4);
      var text2 = $.child<Text>(p2);

      text2.nodeValue = '$x is between 5 and 10';
      $.close($anchor, p2);
    });

    $.closeFragment($anchor, fragment1);
  });

  $.closeFragment($anchor, fragment);
  $.pop();
}
