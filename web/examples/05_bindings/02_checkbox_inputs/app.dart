// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _template1 = $.template(
    '<p>Thank you. We will bombard your inbox and sell your personal details.</p>');
final _template2 = $.template(
    '<p>Thank you. We will bombard your inbox and sell your personal details.</p>');
final _fragment = $.fragment(
    '<label><input type="checkbox"> Yes! Send me regular email spam</label> <!> <button>Subscribe</button>');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void App(Node $anchor, AppProperties $properties) {
  $.push($properties, false);

  var yes = $.mutableSource<bool>(false);

  $.init();

  // Init
  var fragment = $.openFragment($anchor, true, _fragment);
  var label = $.childFragment<HTMLLabelElement>(fragment);
  assert(label.nodeName == 'LABEL');
  var input = $.child<HTMLInputElement>(label);
  assert(input.nodeName == 'INPUT');

  $.removeInputAttributeDefaults(input);

  var node = $.sibling<Comment>($.sibling<Text>(label, true));
  assert(node.nodeName == '#comment');
  var button = $.sibling<HTMLButtonElement>($.sibling<Text>(node, true));
  assert(button.nodeName == 'BUTTON');
  var button$disabled = false;

  /* Update */
  $.renderEffect((block, signal) {
    if (button$disabled != (button$disabled = !$.get(yes))) {
      button.disabled = button$disabled;
    }
  });

  $.bindChecked(
      input, () => $.get<bool>(yes), ($$value) => $.set<bool>(yes, $$value));

  $.ifBlock(node, () => $.get<bool>(yes), ($$anchor) {
    /* Init */
    var p = $.open($$anchor, true, _template1);
    assert(p.nodeName == 'P');
    $.close($$anchor, p);
  }, ($$anchor) {
    /* Init */
    var p1 = $.open($$anchor, true, _template2);
    assert(p1.nodeName == 'P');
    $.close($$anchor, p1);
  });

  $.closeFragment($anchor, fragment);
  $.pop();
}
