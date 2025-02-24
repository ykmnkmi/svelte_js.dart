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
final _root = $.fragment('''
<!> <!>''');

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

  var fragment = _root();
  var node = $.firstChild<Comment>(fragment);

  {
    void consequent(Node $$anchor) {
      var button = _root1();

      $.event<Event>('click', button, (event) => toggle());
      $.append($$anchor, button);
    }

    $.ifBlock(node, ($$render) {
      if (user().loggedIn) {
        $$render(consequent);
      }
    });
  }

  var node1 = $.sibling<Comment>(node, 2);

  {
    void consequent1(Node $$anchor) {
      var button1 = _root2();

      $.event<Event>('click', button1, (event) => toggle());
      $.append($$anchor, button1);
    }

    $.ifBlock(node1, ($$render) {
      if (!user().loggedIn) {
        $$render(consequent1);
      }
    });
  }

  $.append($$anchor, fragment);
}
