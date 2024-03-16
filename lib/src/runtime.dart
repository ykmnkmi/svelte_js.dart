@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:svelte_js/src/types.dart';
import 'package:svelte_js/src/unsafe_cast.dart';

@JS('get')
external JSAny? _get(JSObject signal);

T get<T>(Signal<T> signal) {
  return unsafeCast<T>(_get(signal));
}

@JS('set')
external JSAny? _set(JSObject signal, JSAny? value);

T set<T>(Signal<T> signal, T? value) {
  var jsValue = unsafeCast<JSAny?>(value);
  return unsafeCast<T>(_set(signal, jsValue));
}

@JS('mutate')
external JSAny? _mutate(JSObject signal, JSAny? value);

T mutate<T>(Signal<T> signal, T value) {
  var jsValue = unsafeCast<JSAny?>(value);
  return unsafeCast<T>(_mutate(signal, jsValue));
}

@JS('untrack')
external JSAny? _untrack(JSFunction function);

T untrack<T>(T Function() function) {
  var jsFunction = unsafeCast<JSAny? Function()>(function);
  return unsafeCast<T>(_untrack(jsFunction.toJS));
}

@JS('push')
external void _push(JSObject properties, [JSBoolean runes]);

void push<T extends JSObject>(T properties, [bool? runes]) {
  if (runes == null) {
    _push(properties);
  } else {
    _push(properties, runes.toJS);
  }
}

@JS('pop')
external void _pop([JSObject component]);

void pop<T extends JSObject>([T? component]) {
  if (component == null) {
    _pop();
  } else {
    _pop(component);
  }
}

@JS('unwrap')
external JSAny? _unwrap(JSAny? value);

T unwrap<T>(Signal<T>? value) {
  var jsValue = unsafeCast<JSAny?>(value);
  return unsafeCast<T>(_unwrap(jsValue));
}
