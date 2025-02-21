// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _root1 = $.template<HTMLParagraphElement>('''
<p> </p>''');
final _root3 = $.template<HTMLParagraphElement>('''
<p> </p>''');
final _root4 = $.template<HTMLParagraphElement>('''
<p> </p>''');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void App(Node $$anchor, AppProperties $$properties) {
  var x = 7;
  var fragment = $.comment();
  var node = $.firstChild<Text>(fragment);
  assert(node.nodeName == '#text');

  $.ifBlock(
    node,
    () => x > 10,
    ($$anchor) {
      var p = _root1();
      assert(p.nodeName == 'P');

      p.textContent = '$x is greater than 10';
      $.append($$anchor, p);
    },
    ($$anchor) {
      var fragment1 = $.comment();
      var node1 = $.firstChild<Text>(fragment1);
      assert(node1.nodeName == '#text');

      $.ifBlock(
        node1,
        () => 5 > x,
        ($$anchor) {
          var p1 = _root3();
          assert(p1.nodeName == 'P');

          p1.textContent = '$x is less than 5';
          $.append($$anchor, p1);
        },
        ($$anchor) {
          var p2 = _root4();
          assert(p2.nodeName == 'P');

          p2.textContent = '$x is between 5 and 10';
          $.append($$anchor, p2);
        },
        true,
      );

      $.append($$anchor, fragment1);
    },
  );

  $.append($$anchor, fragment);
}
