@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:web/web.dart';

@JS('forward_event')
external T _forwardEvent<T extends JSObject>(
    JSString event, JSObject properties);

T forwardEvent<T extends JSObject>(String event, JSObject properties) {
  return _forwardEvent(event.toJS, properties);
}

@JS('forward_events')
external T _forwardEvents<T extends JSObject>(
    JSArray events, JSObject properties);

T forwardEvents<T extends JSObject>(List<String> events, JSObject properties) {
  var jsArray = JSArray<JSString>.withLength(events.length);

  for (var i = 0; i < events.length; i++) {
    jsArray[i] = events[i].toJS;
  }

  return _forwardEvents(jsArray, properties);
}

@JS('event_bubble')
external void _eventBubble<T extends JSObject>(
    JSString eventName, Element dom, T properties);

void evenBubblet<T extends JSObject>(
    String eventName, Element dom, T properties) {
  _eventBubble(eventName.toJS, dom, properties);
}

extension on JSArray {
  external void operator []=(int index, JSString value);
}
