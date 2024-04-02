// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

import 'user.dart';

final _template1 = $.template('<button>Log out</button>');
final _template2 = $.template('<button>Log in</button>');
final _fragment = $.fragment('<!> <!>');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void App(Node $anchor, AppProperties $properties) {
  $.push($properties, false);

  var user = $.mutableSource<User>(User(loggedIn: false));

  void toggle(Event event) {
    $.mutate<User, bool>(
        user, $.get<User>(user).loggedIn = !$.get<User>(user).loggedIn);
  }

  $.init();

  // Init
  var fragment = $.openFragment($anchor, true, _fragment);
  var node = $.childFragment<Comment>(fragment);
  var node1 = $.sibling<Comment>($.sibling<Text>(node, true));

  $.ifBlock(node, () => $.get<User>(user).loggedIn, ($anchor) {
    // Init
    var button = $.open<Element>($anchor, true, _template1);

    $.event<Event>('click', button, toggle, false);
    $.close($anchor, button);
  }, null);

  $.ifBlock(node1, () => !$.get<User>(user).loggedIn, ($anchor) {
    // Init
    var button1 = $.open<Element>($anchor, true, _template2);

    $.event<Event>('click', button1, toggle, false);
    $.close($anchor, button1);
  }, null);

  $.closeFragment($anchor, fragment);
  $.pop();
}
