@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:meta/dart2js.dart';
import 'package:web/web.dart';

@JS('html')
external void _html(
  Node dom,
  JSExportedDartFunction value,
  bool svg,
  bool mathml, [
  bool skipWarning,
]);

@tryInline
void html(
  Node dom,
  String Function() value,
  bool svg,
  bool mathml, [
  bool? skipWarning,
]) {
  if (skipWarning == null) {
    _html(dom, value.toJS, svg, mathml);
  } else {
    _html(dom, value.toJS, svg, mathml, skipWarning);
  }
}
