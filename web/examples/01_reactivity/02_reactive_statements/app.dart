// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:svelte_js/internal.dart' show Source;
import 'package:web/web.dart';

void _handleClick(Event event, Source<int> count) {
  $.set(count, $.get(count) + 1);
}

extension on HTMLButtonElement {
  external set __click(JSArray values);
}

final _root = $.template('<button> </button>');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

final App = () {
  $.delegate(['click']);

  return (Node $$anchor, AppProperties $$properties) {
    $.push($$properties, true);

    var count = $.source(0);

    $.userEffect(() {
      if ($.get(count) >= 10) {
        window.alert('count is dangerously high!');
        $.set(count, 9);
      }
    });

    var button = _root<HTMLButtonElement>();
    assert(button.nodeName == 'BUTTON');

    button.__click = <JSAny>[_handleClick.toJS, count].toJS;

    var text = $.child<Text>(button);
    assert(text.nodeName == '#text');

    $.renderEffect(() {
      $.setText(text, 'Clicked ${$.get(count)} ${$.get(count) == 1 ? 'time' : 'times'}');
    });

    $.append($$anchor, button);
    $.pop();
  };
}();
