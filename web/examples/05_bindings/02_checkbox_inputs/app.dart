// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _root1 = $.template(
  '''
<p>Thank you. We will bombard your inbox and sell your personal details.</p>''',
);
final _root2 = $.template(
  '''
<p>Thank you. We will bombard your inbox and sell your personal details.</p>''',
);
final _root = $.fragment(
  '''
<label><input type="checkbox"> Yes! Send me regular email spam</label> <!> <button>Subscribe</button>''',
);

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void App(Node $$anchor, AppProperties $properties) {
  var yes = $.mutableSource(false);
  var fragment = _root();
  var label = $.firstChild<HTMLLabelElement>(fragment);
  assert(label.nodeName == 'LABEL');
  var input = $.child<HTMLInputElement>(label);
  assert(input.nodeName == 'INPUT');

  $.removeInputAttributeDefaults(input);

  var node = $.sibling<Comment>($.sibling<Text>(label, true));
  assert(node.nodeName == '#comment');

  $.ifBlock(
    node,
    () => $.get(yes),
    ($$anchor) {
      var p = _root1();
      assert(p.nodeName == 'P');

      $.append($$anchor, p);
    },
    ($$anchor) {
      var p1 = _root2();
      assert(p1.nodeName == 'P');

      $.append($$anchor, p1);
    },
  );

  var button = $.sibling<HTMLButtonElement>($.sibling<Text>(node, true));
  assert(button.nodeName == 'BUTTON');

  $.templateEffect(() {
    button.disabled = !$.get(yes);
  });

  $.bindChecked(input, () => $.get(yes), ($$value) => $.set(yes, $$value));
  $.append($$anchor, fragment);
}
