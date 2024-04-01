// ignore_for_file: avoid_print
library;

import 'dart:js_interop';

import 'package:svelte_js/svelte_js.dart';
import 'package:web/web.dart';

import 'examples/00_introduction/00_hello_world/app.dart' as hello_world;
import 'examples/00_introduction/01_dynamic_attributes/app.dart' as dynamic_attributes;
import 'examples/00_introduction/02_styling/app.dart' as styling;
import 'examples/00_introduction/03_nested_components/app.dart' as nested_components;
import 'examples/00_introduction/04_html_tags/app.dart' as html_tags;
import 'examples/01_reactivity/00_reactive_assignments/app.dart' as reactive_assignments;
import 'examples/01_reactivity/01_reactive_declarations/app.dart' as reactive_declarations;
import 'examples/01_reactivity/02_reactive_statements/app.dart' as reactive_statements;
import 'examples/02_properties/00_declaring_properties/app.dart' as declaring_properties;
import 'examples/02_properties/01_default_values/app.dart' as default_values;
import 'examples/02_properties/02_spread_properties/app.dart' as spread_properties;
import 'examples/03_logic/00_if_blocks/app.dart' as if_blocks;
import 'examples/03_logic/01_else_blocks/app.dart' as else_blocks;
import 'examples/03_logic/02_else_if_blocks/app.dart' as else_if_blocks;
import 'examples/03_logic/03_each_blocks/app.dart' as each_blocks;
import 'examples/03_logic/04_keyed_each_blocks/app.dart' as keyed_each_blocks;
import 'examples/03_logic/05_await_blocks/app.dart' as await_blocks;
import 'examples/04_events/00_dom_events/app.dart' as dom_events;
import 'examples/04_events/01_inline_handlers/app.dart' as inline_handlers;
import 'examples/04_events/02_event_modifiers/app.dart' as event_modifiers;
import 'examples/04_events/03_component_events/app.dart' as component_events;
import 'examples/04_events/04_event_forwarding/app.dart' as event_forwarding;
import 'examples/04_events/05_dom_event_forwarding/app.dart' as dom_event_forwarding;

ComponentReference? mountComponent(String name, Node target) {
  return switch (name) {
    'hello_world' => mount(hello_world.app, target: target),
    'dynamic_attributes' => mount(dynamic_attributes.app, target: target),
    'styling' => mount(styling.app, target: target),
    'nested_components' => mount(nested_components.app, target: target),
    'html_tags' => mount(html_tags.app, target: target),
    'reactive_assignments' => mount(reactive_assignments.app, target: target),
    'reactive_declarations' => mount(reactive_declarations.app, target: target),
    'reactive_statements' => mount(reactive_statements.app, target: target),
    'declaring_properties' => mount(declaring_properties.app, target: target),
    'default_values' => mount(default_values.app, target: target),
    'spread_properties' => mount(spread_properties.app, target: target),
    'if_blocks' => mount(if_blocks.app, target: target),
    'else_blocks' => mount(else_blocks.app, target: target),
    'else_if_blocks' => mount(else_if_blocks.app, target: target),
    'each_blocks' => mount(each_blocks.app, target: target),
    'keyed_each_blocks' => mount(keyed_each_blocks.app, target: target),
    'await_blocks' => mount(await_blocks.app, target: target),
    'dom_events' => mount(dom_events.app, target: target),
    'inline_handlers' => mount(inline_handlers.app, target: target),
    'event_modifiers' => mount(event_modifiers.app, target: target),
    'component_events' => mount(component_events.app, target: target),
    'event_forwarding' => mount(event_forwarding.app, target: target),
    'dom_event_forwarding' => mount(dom_event_forwarding.app, target: target),
    _ => null,
  };
}

void main() {
  var select = document.querySelector('select') as HTMLSelectElement;
  var target = document.querySelector('main') as HTMLElement;

  ComponentReference? current;

  void onChange(Event event) {
    try {
      if (current case var component?) {
        unmount(component);
      }

      current = mountComponent(select.value, target);
    } catch (error, stackTrace) {
      print(error);
      print(stackTrace);
      rethrow;
    }
  }

  select.addEventListener('change', onChange.toJS);
}
