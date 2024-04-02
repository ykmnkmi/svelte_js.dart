// ignore_for_file: library_prefixes, non_constant_identifier_names
library;

import 'dart:js_interop';

import 'package:svelte_js/internal.dart' as $;
import 'package:svelte_js/svelte_js.dart';
import 'package:web/web.dart';

import 'message.dart';

final _template = $.template('<button>Click to say hello</button>');

extension type InnerEvents._(JSObject _) implements JSObject {
  factory InnerEvents({void Function(CustomEvent event)? message}) {
    return InnerEvents.js(message: message?.toJS);
  }

  external InnerEvents.js({JSFunction? message});
}

extension type InnerProperties._(JSObject _) implements JSObject {
  factory InnerProperties({InnerEvents? $$events}) {
    return InnerProperties.js($$events: $$events);
  }

  external factory InnerProperties.js({InnerEvents? $$events});
}

void Inner(Node $anchor, InnerProperties $properties) {
  $.push($properties, false);

  var dispatch = createEventDispatcher();

  void sayHello(Event event) {
    dispatch('message', Message(text: 'Hello!'));
  }

  $.init();

  // Init
  var button = $.open<Element>($anchor, true, _template);

  $.event<Event>('click', button, sayHello, false);
  $.close($anchor, button);
  $.pop();
}
