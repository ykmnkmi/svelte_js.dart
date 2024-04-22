// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _root1 = $.template<HTMLParagraphElement>('<p> </p>');
final _root3 = $.template<HTMLParagraphElement>('<p> </p>');
final _root4 = $.template<HTMLParagraphElement>('<p> </p>');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void App(Node $$anchor, AppProperties $$properties) {
  $.push($$properties, true);

  var x = 7;
  var fragment = $.comment();
  var node = $.child<Comment>(fragment);
  assert(node.nodeName == '#comment');

  $.ifBlock(node, () => x > 10, ($$anchor) {
    var p = _root1();
    assert(p.nodeName == 'P');
    var text = $.child<Text>(p);
    assert(text.nodeName == '#text');

    text.nodeValue = '$x is greater than 10';
    $.append($$anchor, p);
  }, ($$anchor) {
    var fragment1 = $.comment();
    var node1 = $.child<Comment>(fragment1);
    assert(node1.nodeName == '#comment');

    $.ifBlock(node1, () => 5 > x, ($$anchor) {
      var p1 = _root3();
      assert(p1.nodeName == 'P');
      var text1 = $.child<Text>(p1);
      assert(text1.nodeName == '#text');

      text1.nodeValue = '$x is less than 5';
      $.append($$anchor, p1);
    }, ($$anchor) {
      var p2 = _root4();
      assert(p2.nodeName == 'P');
      var text2 = $.child<Text>(p2);
      assert(text2.nodeName == '#text');

      text2.nodeValue = '$x is between 5 and 10';
      $.append($$anchor, p2);
    }, true);

    $.append($$anchor, fragment1);
  });

  $.append($$anchor, fragment);
  $.pop();
}
