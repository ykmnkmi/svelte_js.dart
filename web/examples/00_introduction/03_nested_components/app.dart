// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

import 'nested.dart';

final _root = $.fragment('''
<p class="svelte-urs9w7">These styles...</p> <!>''');

final __css = $.CSS(
  hash: 'svelte-urs9w7',
  code: '''
\tp.svelte-urs9w7 {
\t\tcolor: purple;
\t\tfont-family: 'Comic Sans MS', cursive;
\t\tfont-size: 2em;
\t}''',
);

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void App(Node $$anchor, AppProperties $$properties) {
  $.appendStyles($$anchor, __css);

  var fragment = _root();
  var node = $.sibling<Comment>($.firstChild(fragment), 2);

  Nested(node, NestedProperties());
  $.append($$anchor, fragment);
}
