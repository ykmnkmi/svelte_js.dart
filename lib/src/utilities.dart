@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:svelte_js/src/unsafe_cast.dart';

@JS('forward_event')
external JSObject _forwardEvent(JSString event, JSObject properties);

T forwardEvent<T extends JSObject>(String event, JSObject properties) {
  return unsafeCast<T>(_forwardEvent(event.toJS, properties));
}

@JS('forward_events')
external JSObject _forwardEvents(JSArray events, JSObject properties);

T forwardEvents<T extends JSObject>(List<String> events, JSObject properties) {
  var jsEvents = unsafeCast<List<JSString>>(events);
  return unsafeCast<T>(_forwardEvents(jsEvents.toJS, properties));
}

@JS('set_getter')
external JSVoid _setGetter(JSObject object, JSString key, JSFunction getter);

void setGetter<T>(JSObject object, String key, T Function() getter) {
  var jsGetter = unsafeCast<JSAny? Function()>(getter);
  _setGetter(object, key.toJS, jsGetter.toJS);
}
