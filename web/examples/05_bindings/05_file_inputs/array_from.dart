@JS()
library;

import 'dart:js_interop';

@JS('Array.from')
external JSArray<T> arrayFrom<T extends JSAny?>(JSAny arrayLike);
