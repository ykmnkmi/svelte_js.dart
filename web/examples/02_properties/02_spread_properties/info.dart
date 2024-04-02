// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:svelte_js/src/unsafe_cast.dart';
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
      name: name.toExternalReference,
      version: version.toExternalReference,
      speed: speed.toExternalReference,
      website: website.toExternalReference,
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
    return unsafeCast<String>(_name.toDartObject);
  }

  @JS('version')
  external ExternalDartReference get _version;

  int get version {
    return unsafeCast<int>(_version.toDartObject);
  }

  @JS('speed')
  external ExternalDartReference get _speed;

  String get speed {
    return unsafeCast<String>(_speed.toDartObject);
  }

  @JS('website')
  external ExternalDartReference get _website;

  String get website {
    return unsafeCast<String>(_website.toDartObject);
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
  var ahref = '';
  var a1href = '';

  $.renderEffect((block, signal) {
    $.text(text, $properties.name);
    $.text(text1,
        ' package is ${$properties.speed} fast. Download version ${$properties.version} from ');

    if (ahref !=
        (ahref = 'https://www.npmjs.com/package/${$properties.name}')) {
      $.attr(a, 'href', ahref);
    }

    if (a1href != (a1href = $properties.website)) {
      $.attr(a1, 'href', a1href);
    }
  });

  $.close($anchor, p);
  $.pop();
}
