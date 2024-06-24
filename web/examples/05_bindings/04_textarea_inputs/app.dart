// ignore_for_file: library_prefixes, non_constant_identifier_names, no_leading_underscores_for_library_prefixes
library;

import 'dart:js_interop';

import 'package:markdown/markdown.dart' as _i0;
import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _root = $.fragment('''
<textarea class="svelte-hyxn8s"></textarea> <!>''');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void App(Node $$anchor, AppProperties $$properties) {
  $.push($$properties, false);

  var text = $.mutableSource('Some words are *italic*, some are **bold**');

  $.init();

  var fragment = _root();
  var textarea = $.firstChild<HTMLTextAreaElement>(fragment);

  $.removeTextareaChild(textarea);

  var node = $.sibling<Comment>($.sibling<Text>(textarea, true));
  assert(node.nodeName == '#comment');

  $.html(node, () => _i0.markdownToHtml($.get(text)), false, false);
  $.bindValue(textarea, () => $.get(text), ($$value) => $.set(text, $$value));
  $.append($$anchor, fragment);
  $.appendStyles($$anchor, 'svelte-hyxn8s', '''
\ttextarea.svelte-hyxn8s {
\t\twidth: 100%;
\t\theight: 200px;
\t}
''');
  $.pop();
}
