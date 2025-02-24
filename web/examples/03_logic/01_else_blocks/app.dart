// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:svelte_js/svelte_js.dart';
import 'package:web/web.dart';

import 'user.dart';

final _root1 = $.template<HTMLButtonElement>('''
<button>Log out</button>''');
final _root2 = $.template<HTMLButtonElement>('''
<button>Log in</button>''');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void App(Node $$anchor, AppProperties $$properties) {
  var user = state<User>(User(loggedIn: false));

  void toggle() {
    user.update((user) {
      return User(loggedIn: !user.loggedIn);
    });
  }

  var fragment = $.comment();
  var node = $.firstChild<Comment>(fragment);

  {
    void consequent(Node $$anchor) {
      var button = _root1();

      $.event<Event>('click', button, (event) => toggle());
      $.append($$anchor, button);
    }

    void alternate(Node $$anchor) {
      var button1 = _root2();

      $.event<Event>('click', button1, (event) => toggle());
      $.append($$anchor, button1);
    }

    $.ifBlock(node, ($$render) {
      if (user().loggedIn) {
        $$render(consequent);
      } else {
        $$render(alternate, false);
      }
    });
  }

  $.append($$anchor, fragment);
}
