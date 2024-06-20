// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
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
  var user = $.mutableSource(User(loggedIn: false));

  void toggle() {
    $.mutate(user, $.get(user).loggedIn = !$.get(user).loggedIn);
  }

  var fragment = _root();
  var node = $.firstChild<Comment>(fragment);
  assert(node.nodeName == '#comment');

  $.ifBlock(node, () => $.get(user).loggedIn, ($$anchor) {
    var button = _root1();
    assert(button.nodeName == 'BUTTON');

    $.event('click', button, (event) => toggle(), false);
    $.append($$anchor, button);
  });

  var node1 = $.sibling<Comment>($.sibling<Text>(node), true);
  assert(node1.nodeName == '#comment');

  $.ifBlock(node1, () => !$.get(user).loggedIn, ($$anchor) {
    var button1 = _root2();
    assert(button1.nodeName == 'BUTTON');

    $.event('click', button1, (event) => toggle(), false);
    $.append($$anchor, button1);
  });

  $.append($$anchor, fragment);
}
