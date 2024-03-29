// ignore_for_file: library_prefixes
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

import 'user.dart';

final _template1 = $.template('<button>Log out</button>');
final _template2 = $.template('<button>Log in</button>');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void app(Node $anchor, AppProperties $properties) {
  $.push($properties, false);

  var user = $.mutableSource<User>(User(loggedIn: false));

  void toggle(Event event) {
    $.mutate<User, bool>(user, $.get<User>(user).loggedIn = !$.get<User>(user).loggedIn);
  }

  $.init();

  // Init
  var fragment = $.comment($anchor);
  var node = $.childFragment<Comment>(fragment);

  $.ifBlock(node, () => $.get<User>(user).loggedIn, ($anchor) {
    // Init
    var button = $.open<Element>($anchor, true, _template1);

    $.event<Event>('click', button, toggle, false);
    $.close($anchor, button);
  }, ($anchor) {
    // Init
    var button1 = $.open<Element>($anchor, true, _template2);

    $.event<Event>('click', button1, toggle, false);
    $.close($anchor, button1);
  });

  $.closeFragment($anchor, fragment);
  $.pop();
}
