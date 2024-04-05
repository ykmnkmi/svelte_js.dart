// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:web/web.dart';

final _template = $.template(
    '<p>The <code> </code> <a>npm</a> and <a>learn more here</a>.</p>');

extension type InfoProperties._(JSObject _) implements JSObject {
  factory InfoProperties({
    required String name,
    required int version,
    required String speed,
    required String website,
  }) {
    return InfoProperties.js(
      name: $.ref(name),
      version: $.ref(version),
      speed: $.ref(speed),
      website: $.ref(website),
    );
  }

  external factory InfoProperties.js({
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

void Info(Node $anchor, InfoProperties $properties) {
  $.push($properties, false);
  $.init();

  // Init
  var p = $.open<Element>($anchor, true, _template);
  var code = $.sibling<Element>($.child<Text>(p));
  var text = $.space<Text>($.child<Text>(code));
  var text1 = $.sibling<Text>(code, true);
  var a = $.sibling<Element>(text1);
  var a1 = $.sibling<Element>($.sibling<Text>(a, true));
  var a$href = '';
  var a1$href = '';

  $.renderEffect((block, signal) {
    $.text(text, $properties.name);
    $.text(text1,
        ' package is ${$properties.speed} fast. Download version ${$properties.version} from ');

    if (a$href !=
        (a$href = 'https://www.npmjs.com/package/${$properties.name}')) {
      $.attr(a, 'href', a$href);
    }

    if (a1$href != (a1$href = $properties.website)) {
      $.attr(a1, 'href', a1$href);
    }
  });

  $.close($anchor, p);
  $.pop();
}
