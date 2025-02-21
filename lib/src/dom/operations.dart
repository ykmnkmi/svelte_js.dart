@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:web/web.dart';

@JS()
external T child<T extends Node?>(Node anchor, [bool isText]);

@JS('first_child')
external T firstChild<T extends Node>(Node fragment);

@JS()
external T sibling<T extends Node>(Node node, [int count, bool isText]);
