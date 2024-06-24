// ignore_for_file: library_prefixes, non_constant_identifier_names, unnecessary_null_comparison
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _root1 = $.template<HTMLLabelElement>('''
<label><input type="checkbox"> </label>''');
final _root2 = $.template<HTMLParagraphElement>('''
<p>Please select at least one flavour</p>''');
final _root4 = $.template<HTMLParagraphElement>("""
<p>Can't order more flavours than scoops!</p>""");
final _root5 = $.template<HTMLParagraphElement>('''
<p> </p>''');
final _root = $.fragment('''
<h2>Size</h2> <label><input type="radio"> One scoop</label> <label><input type="radio"> Two scoops</label> <label><input type="radio"> Three scoops</label> <h2>Flavours</h2> <!> <!>''');

extension type AppProperties._(JSObject _) implements JSObject {
  factory AppProperties() {
    return AppProperties._(JSObject());
  }
}

void App(Node $$anchor, AppProperties $$properties) {
  $.push($$properties, false);

  var bindingGroup = JSArray<HTMLInputElement>();
  var bindingGroup1 = JSArray<HTMLInputElement>();
  var scoops = $.mutableSource(1);
  var flavours = $.mutableSource(['Mint choc chip']);

  var menu = $.mutableSource(['Cookies and cream', 'Mint choc chip', 'Raspberry ripple']);

  String join(List<String> flavours) {
    if (flavours.length == 1) {
      return flavours[0];
    }

    var length = flavours.length - 1;
    return '${flavours.sublist(0, length).join(', ')} and ${flavours[length]}';
  }

  $.init();

  var fragment = _root();
  var h2 = $.firstChild<HTMLHeadingElement>(fragment);
  assert(h2.nodeName == 'H2');
  var label = $.sibling<HTMLLabelElement>($.sibling<Text>(h2, true));
  assert(label.nodeName == 'LABEL');
  var input = $.child<HTMLInputElement>(label);
  assert(input.nodeName == 'INPUT');

  $.removeInputAttributeDefaults(input);
  input.value = '1';
  input.__value = (input.__value = 1.toJS) == null ? ''.toJS : 1.toJS;

  var label1 = $.sibling<HTMLLabelElement>($.sibling<Text>(label, true));
  assert(label1.nodeName == 'LABEL');
  var input1 = $.child<HTMLInputElement>(label1);
  assert(input1.nodeName == 'INPUT');

  $.removeInputAttributeDefaults(input1);
  input1.value = '2';
  input1.__value = (input1.__value = 2.toJS) == null ? ''.toJS : 2.toJS;

  var label2 = $.sibling<HTMLLabelElement>($.sibling<Text>(label1, true));
  assert(label2.nodeName == 'LABEL');
  var input2 = $.child<HTMLInputElement>(label2);
  assert(input2.nodeName == 'INPUT');

  $.removeInputAttributeDefaults(input2);
  input2.value = '3';
  input2.__value = (input2.__value = 3.toJS) == null ? ''.toJS : 3.toJS;

  var h21 = $.sibling<HTMLHeadingElement>($.sibling<Text>(label2, true));
  assert(input2.nodeName == 'INPUT');
  var node = $.sibling<Comment>($.sibling<Text>(h21, true));
  assert(node.nodeName == '#comment');

  $.eachBlock(node, 1, () => $.get(menu), $.index, ($$anchor, flavour, $$index) {
    var label3 = _root1();
    var input3 = $.child<HTMLInputElement>(label3);
    assert(input3.nodeName == 'INPUT');

    $.removeInputAttributeDefaults(input3);

    String? input3value;
    var text = $.sibling<Text>(input3, true);
    assert(text.nodeName == '#text');

    $.templateEffect(() {
      if (input3value != (input3value = $.get(flavour))) {
        input3.value = (input3.__value = $.get(flavour).toJS) == null ? '' : $.get(flavour);
      }

      $.setText(text, ' ${$.get(flavour)}');
    });

    $.bindStringGroup(bindingGroup1, input3, () {
      $.get(flavour);
      return $.get(flavours);
    }, ($$value) {
      $.set(flavours, $$value);
    });

    $.append($$anchor, label3);
  });

  var node1 = $.sibling<Comment>($.sibling<Text>(node, true));
  assert(node1.nodeName == '#comment');

  $.ifBlock(node1, () => $.get(flavours).isEmpty, ($$anchor) {
    var p = _root2();
    assert(p.nodeName == 'P');

    $.append($$anchor, p);
  }, ($$anchor) {
    var fragment1 = $.comment();
    var node2 = $.firstChild<Text>(fragment1);
    assert(node2.nodeName == '#text');

    $.ifBlock(node2, () => $.get(flavours).length > $.get(scoops), ($$anchor) {
      var p1 = _root4();
      assert(p1.nodeName == 'P');

      $.append($$anchor, p1);
    }, ($$anchor) {
      var p2 = _root5();
      assert(p2.nodeName == 'P');
      var text1 = $.child<Text>(p2);
      assert(text1.nodeName == '#text');

      $.templateEffect(() {
        $.setText(text1, 'You ordered ${$.get(scoops)} ${$.get(scoops) == 1 ? 'scoop' : 'scoops'} of ${join($.get(flavours))}');
      });

      $.append($$anchor, p2);
    }, true);

    $.append($$anchor, fragment1);
  });

  $.bindIntGroup(bindingGroup, input, () => $.get(scoops), ($$value) {
    $.set(scoops, $$value);
  });

  $.bindIntGroup(bindingGroup, input1, () => $.get(scoops), ($$value) {
    $.set(scoops, $$value);
  });

  $.bindIntGroup(bindingGroup, input2, () => $.get(scoops), ($$value) {
    $.set(scoops, $$value);
  });

  $.append($$anchor, fragment);
  $.pop();
}

extension on HTMLInputElement {
  external set __value(JSAny? value);
}
