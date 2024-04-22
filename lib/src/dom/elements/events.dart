@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:meta/meta.dart';
import 'package:svelte_js/src/constants.dart';
import 'package:svelte_js/src/ref.dart';
import 'package:svelte_js/src/unsafe_cast.dart';
import 'package:web/web.dart';

@optionalTypeArgs
extension type TypedEvent<T>(CustomEvent _) implements CustomEvent {
  T get detail {
    return unref<T>(unsafeCast<ExternalDartReference?>(_.detail));
  }
}

@JS('delegate')
external void _delegate(JSArray<JSString> events);

void delegate(List<String> events) {
  List<JSString> jsEvents;

  if (isJS) {
    jsEvents = unsafeCast<List<JSString>>(events);
  } else {
    jsEvents = <JSString>[for (var event in events) event.toJS];
  }

  _delegate(jsEvents.toJS);
}

JSExportedDartFunction wrap(Function callback) {
  if (callback is void Function(Event)) {
    return callback.toJS;
  }

  if (callback is void Function()) {
    return (Event event) {
      callback();
    }.toJS;
  }

  throw ArgumentError('Unsupported callback type: $callback');
}
