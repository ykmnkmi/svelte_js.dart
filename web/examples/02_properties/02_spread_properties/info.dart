// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _root = $.template<HTMLParagraphElement>('<p>The <code> </code> <a>npm</a> and <a>learn more here</a>.</p>');

extension type InfoProperties._(JSObject _) implements JSObject {
  external factory InfoProperties({
    ExternalDartReference? name,
    ExternalDartReference? version,
    ExternalDartReference? speed,
    ExternalDartReference? website,
  });

  @JS('name')
  external ExternalDartReference get _name;

  String get name {
    return $.unref<String>(_name);
  }

  @JS('version')
  external ExternalDartReference get _version;

  int get version {
    return $.unref<int>(_version);
  }

  @JS('speed')
  external ExternalDartReference get _speed;

  String get speed {
    return $.unref<String>(_speed);
  }

  @JS('website')
  external ExternalDartReference get _website;

  String get website {
    return $.unref<String>(_website);
  }
}

void Info(Node $$anchor, InfoProperties $$properties) {
  var p = _root();
  assert(p.nodeName == 'P');
  var code = $.sibling<HTMLElement>($.child<Text>(p));
  assert(code.nodeName == 'CODE');
  var text = $.child<Text>(code);
  assert(text.nodeName == '#text');
  var text1 = $.sibling<Text>(code);
  assert(text1.nodeName == '#text');
  var a = $.sibling<HTMLAnchorElement>(text1);
  assert(a.nodeName == 'A');
  var a1 = $.sibling<HTMLAnchorElement>($.sibling<Text>(a));
  assert(a1.nodeName == 'A');

  $.renderEffect(() {
    $.setText(text, $$properties.name);
    $.setText(text1, ' package is ${$$properties.speed} fast. Download version ${$$properties.version} from ');
    $.setAttribute(a, 'href', 'https://www.npmjs.com/package/${$$properties.name}');
    $.setAttribute(a1, 'href', $$properties.website);
  });

  $.append($$anchor, p);
}
