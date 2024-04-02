@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:svelte_js/src/unsafe_cast.dart';
import 'package:web/web.dart';

@JS('forward_event')
external JSObject _forwardEvent(JSString event, JSObject properties);

T forwardEvent<T extends JSObject>(String event, JSObject properties) {
  return unsafeCast<T>(_forwardEvent(event.toJS, properties));
}

@JS('forward_events')
external JSObject _forwardEvents(JSArray events, JSObject properties);

T forwardEvents<T extends JSObject>(List<String> events, JSObject properties) {
  var jsArray = JSArray<JSString>.withLength(events.length);

  for (var i = 0; i < events.length; i++) {
    jsArray[i] = events[i].toJS;
  }

  return unsafeCast<T>(_forwardEvents(jsArray, properties));
}

@JS('event_bubble')
external void _eventBubble(
    JSString eventName, Element dom, JSObject properties);

void evenBubblet<T extends JSObject>(
    String eventName, Element dom, T properties) {
  _eventBubble(eventName.toJS, dom, properties);
}

extension<T extends JSAny?> on JSArray<T> {
  external void operator []=(int index, T value);
}
