// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

extension on HTMLButtonElement {
  external set __click(JSExportedDartFunction handler);
}

final _root = $.fragment('<button> </button> <p> </p> <p> </p>');

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
    var doubled = $.derived(() => $.get(count) * 2);
    var quadrupled = $.derived(() => $.get(count) * 2);

    void handleClick(Event event) {
      $.set(count, $.get(count) + 1);
    }

    var fragment = _root();
    var button = $.firstChild<HTMLButtonElement>(fragment);
    assert(button.nodeName == 'BUTTON');

    button.__click = handleClick.toJS;

    var text = $.child<Text>(button);
    assert(text.nodeName == '#text');
    var p = $.sibling<HTMLParagraphElement>($.sibling<Text>(button, true));
    assert(p.nodeName == 'P');
    var text1 = $.child<Text>(p);
    assert(text1.nodeName == '#text');
    var p1 = $.sibling<HTMLParagraphElement>($.sibling<Text>(p, true));
    assert(p.nodeName == 'P');
    var text2 = $.child<Text>(p1);
    assert(text2.nodeName == '#text');

    $.renderEffect(() {
      $.setText(text, 'Count: ${$.get(count)}');
      $.setText(text1, '${$.get(count)} * 2 = ${$.get(doubled)}');
      $.setText(text2, '${$.get(doubled)} * 2 = ${$.get(quadrupled)}');
    });

    $.append($$anchor, fragment);
    $.pop();
  };
}();
