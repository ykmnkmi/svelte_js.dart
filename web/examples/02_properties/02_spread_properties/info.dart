// ignore_for_file: library_prefixes
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:svelte_js/svelte_js.dart';
import 'package:web/web.dart';

extension type InfoProperties._(JSObject _) implements JSObject {
  factory InfoProperties({
    required String name,
    required int version,
    required String speed,
    required String website,
  }) {
    return InfoProperties.js(
      name: name.toJSBox,
      version: version.toJSBox,
      speed: speed.toJSBox,
      website: website.toJSBox,
    );
  }

  external InfoProperties.js({
    JSBoxedDartObject name,
    JSBoxedDartObject version,
    JSBoxedDartObject speed,
    JSBoxedDartObject website,
  });

  @JS('name')
  external JSBoxedDartObject get _name;

  String get name => _name.toDart as String;

  @JS('version')
  external JSBoxedDartObject get _version;

  int get version => _version.toDart as int;

  @JS('speed')
  external JSBoxedDartObject get _speed;

  String get speed => _speed.toDart as String;

  @JS('website')
  external JSBoxedDartObject get _website;

  String get website => _website.toDart as String;
}

extension type const Info._(Component<InfoProperties> component) {
  void call(
    Node node, {
    required String name,
    required int version,
    required String speed,
    required String website,
  }) {
    var infoProperties = InfoProperties(
      name: name,
      version: version,
      speed: speed,
      website: website,
    );

    component(node, infoProperties);
  }
}

const Info info = Info._(_component);

final _template = $.template(
    '<p>The <code> </code> <a>npm</a> and <a>learn more here</a>.</p>');

void _component(Node $anchor, InfoProperties $properties) {
  $.push($properties, false);
  $.init();

  // Init
  var p = $.open<Element>($anchor, true, _template);
  var code = $.sibling<Element>($.child<Text>(p));
  var text = $.space($.child<Text>(code));
  var text1 = $.sibling<Text>(code, true);
  var a = $.sibling<Element>(text1);
  var a1 = $.sibling<Element>($.sibling<Text>(a, true));
  String? ahref;
  String? a1href;

  void app$preEffect() {
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
  }

  $.renderEffect(app$preEffect);

  $.close($anchor, p);
  $.pop();
}
