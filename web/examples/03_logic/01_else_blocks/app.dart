// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

import 'user.dart';

extension on HTMLButtonElement {
  external set __click(JSExportedDartFunction handler);
}

final _root1 = $.template<HTMLButtonElement>('<button>Log out</button>');
final _root2 = $.template<HTMLButtonElement>('<button>Log in</button>');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

final App = () {
  $.delegate(['click']);

  return (Node $$anchor, AppProperties $$properties) {
    $.push($$properties, true);

    var user = $.source(User(loggedIn: false));

    void toggle() {
      $.mutate(user, $.get(user).loggedIn = !$.get(user).loggedIn);
    }

    var fragment = $.comment();
    var node = $.child<Comment>(fragment);
    assert(node.nodeName == '#comment');

    $.ifBlock(node, () => $.get(user).loggedIn, ($$anchor) {
      var button = _root1();
      assert(button.nodeName == 'BUTTON');

      button.__click = $.wrap(toggle);
      $.append($$anchor, button);
    }, ($$anchor) {
      var button1 = _root2();
      assert(button1.nodeName == 'BUTTON');

      button1.__click = $.wrap(toggle);
      $.append($$anchor, button1);
    });

    $.append($$anchor, fragment);
    $.pop();
  };
}();
