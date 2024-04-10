@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:web/web.dart';

@JS('child')
external T child<T extends Node>(Node anchor);

@JS('first_child')
external T firstChild<T extends Node>(
  DocumentFragment fragment, [
  bool isText,
]);

@JS('sibling')
external T sibling<T extends Node>(Node node, [bool isText]);
