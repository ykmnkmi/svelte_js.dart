// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _root = $.template<HTMLParagraphElement>('''
<p>The <code> </code> <a>npm</a> and <a>learn more here</a>.</p>''');

extension type InfoProperties._(JSObject _) implements JSObject {
  external factory InfoProperties({
    ExternalDartReference<String?>? name,
    ExternalDartReference<int?>? version,
    ExternalDartReference<String?>? speed,
    ExternalDartReference<String?>? website,
  });

  @JS('name')
  external ExternalDartReference<String?>? get _name;

  String? get name {
    if (_name case var name?) {
      return $.unref<String?>(name);
    }

    return null;
  }

  @JS('version')
  external ExternalDartReference<int?>? get _version;

  int? get version {
    if (_version case var version?) {
      return $.unref<int?>(version);
    }

    return null;
  }

  @JS('speed')
  external ExternalDartReference<String?>? get _speed;

  String? get speed {
    if (_speed case var speed?) {
      return $.unref<String?>(speed);
    }

    return null;
  }

  @JS('website')
  external ExternalDartReference<String?>? get _website;

  String? get website {
    if (_website case var website?) {
      return $.unref<String?>(website);
    }

    return null;
  }
}

void Info(Node $$anchor, InfoProperties $$properties) {
  var name = $.property<String?>($$properties, 'name', 8);
  var version = $.property<int?>($$properties, 'version', 8);
  var speed = $.property<String?>($$properties, 'speed', 8);
  var website = $.property<String?>($$properties, 'website', 8);
  var p = _root();
  assert(p.nodeName == 'P');
  var code = $.sibling<HTMLElement>($.child<Text>(p));
  assert(code.nodeName == 'CODE');
  var text = $.child<Text>(code, true);
  assert(text.nodeName == '#text');

  $.reset(code);

  var text1 = $.sibling<Text>(code);
  assert(text1.nodeName == '#text');
  var a = $.sibling<HTMLAnchorElement>(text1);
  assert(a.nodeName == 'A');
  var a1 = $.sibling<HTMLAnchorElement>(a, 2);
  assert(a1.nodeName == 'A');

  $.reset(p);

  $.templateEffect(() {
    $.setText(text, $.stringify(name()));
    $.setText(
      text1,
      ' package is ${$.stringify(speed())} fast. Download version ${$.stringify(version())} from ',
    );
    $.setAttribute(
      a,
      'href',
      'https://www.npmjs.com/package/${$.stringify(name())}',
    );
    $.setAttribute(a1, 'href', $.stringify(website()));
  });

  $.append($$anchor, p);
}
