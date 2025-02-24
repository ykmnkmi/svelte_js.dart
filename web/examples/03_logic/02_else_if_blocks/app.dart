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

  {
    void consequent(Node $$anchor) {
      var p = _root1();

      p.textContent = '$x is greater than 10';
      $.append($$anchor, p);
    }

    void alternate1(Node $$anchor) {
      var fragment1 = $.comment();
      var node1 = $.firstChild<Text>(fragment1);

      {
        void consequent1(Node $$anchor) {
          var p1 = _root3();

          p1.textContent = '$x is less than 5';
          $.append($$anchor, p1);
        }

        void alternate(Node $$anchor) {
          var p2 = _root4();

          p2.textContent = '$x is between 5 and 10';
          $.append($$anchor, p2);
        }

        $.ifBlock(node1, ($$render) {
          if (x < 5) {
            $$render(consequent1);
          } else {
            $$render(alternate, false);
          }
        });
      }

      $.append($$anchor, fragment1);
    }

    $.ifBlock(node, ($$render) {
      if (x > 10) {
        $$render(consequent);
      } else {
        $$render(alternate1, false);
      }
    });
  }

  $.append($$anchor, fragment);
}
