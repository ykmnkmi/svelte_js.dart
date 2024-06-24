// ignore_for_file: library_prefixes, non_constant_identifier_names, no_leading_underscores_for_library_prefixes
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

import 'array_from.dart';

final _root2 = $.template('<p> </p>');
final _root1 = $.fragment('<h2>Selected files:</h2> <!>');
final _root = $.fragment('''
<label for="avatar">Upload a picture:</label> <input accept="image/png, image/jpeg" id="avatar" name="avatar" type="file"> <label for="many">Upload multiple files of any type:</label> <input id="many" multiple type="file"> <!>''');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void App(Node $$anchor, AppProperties $$properties) {
  $.push($$properties, false);

  var files = $.mutableSource<FileList?>();

  $.legacyPreEffect(() => $.get(files), () {
    if ($.get(files) != null) {
      for (var file in arrayFrom<File>($.get(files)!).toDart) {
        print('${file.name}: ${file.size} bytes');
      }
    }
  });

  $.legacyPreEffectReset();

  var fragment = _root();
  var label = $.firstChild<HTMLLabelElement>(fragment);
  assert(label.nodeName == 'LABEL');
  var input = $.sibling<HTMLInputElement>($.sibling<Text>(label, true));
  assert(input.nodeName == 'INPUT');
  var label1 = $.sibling<HTMLLabelElement>($.sibling<Text>(input, true));
  assert(label1.nodeName == 'LABEL');
  var input1 = $.sibling<HTMLInputElement>($.sibling<Text>(label1, true));
  assert(input1.nodeName == 'INPUT');
  var node = $.sibling<Comment>($.sibling<Text>(input1, true));
  assert(node.nodeName == '#comment');

  $.ifBlock(node, () => $.get(files) != null, ($$anchor) {
    var fragment1 = _root1();
    var h2 = $.firstChild<HTMLHeadingElement>(fragment1);
    assert(h2.nodeName == 'H2');
    var node1 = $.sibling<Comment>($.sibling<Text>(h2, true));
    assert(node1.nodeName == '#comment');

    $.eachBlock(node1, 1, () => arrayFrom<File>($.get(files)!).toDart, $.index, ($$anchor, file, $$index) {
      var p = _root2();
      var text = $.child<Text>(p);

      $.templateEffect(() {
        $.setText(text, '${$.get(file).name} (${$.get(file).size} bytes)');
      });

      $.append($$anchor, p);
    });

    $.append($$anchor, fragment1);
  });

  $.bindFiles(input, () => $.get(files), ($$value) => $.set(files, $$value));
  $.bindFiles(input1, () => $.get(files), ($$value) => $.set(files, $$value));
  $.append($$anchor, fragment);
  $.pop();
}
