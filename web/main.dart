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
// import 'examples/03_logic/00_if_blocks/app.dart' as if_blocks;
// import 'examples/03_logic/01_else_blocks/app.dart' as else_blocks;
// import 'examples/03_logic/02_else_if_blocks/app.dart' as else_if_blocks;
// import 'examples/03_logic/03_each_blocks/app.dart' as each_blocks;
// import 'examples/03_logic/04_keyed_each_blocks/app.dart' as keyed_each_blocks;
// import 'examples/03_logic/05_await_blocks/app.dart' as await_blocks;
// import 'examples/04_events/00_dom_events/app.dart' as dom_events;
// import 'examples/04_events/01_inline_handlers/app.dart' as inline_handlers;
// import 'examples/04_events/02_event_modifiers/app.dart' as event_modifiers;
// import 'examples/04_events/03_component_events/app.dart' as component_events;
// import 'examples/04_events/04_event_forwarding/app.dart' as event_forwarding;
// import 'examples/04_events/05_dom_event_forwarding/app.dart' as dom_event_forwarding;
// import 'examples/05_bindings/00_text_inputs/app.dart' as text_inputs;
// import 'examples/05_bindings/01_numeric_inputs/app.dart' as numeric_inputs;
// import 'examples/05_bindings/02_checkbox_inputs/app.dart' as checkbox_inputs;

ComponentReference? mountComponent(String name, Node target) {
  return switch (name) {
    'hello_world' => mount(hello_world.App, target: target),
    'dynamic_attributes' => mount(dynamic_attributes.App, target: target),
    'styling' => mount(styling.App, target: target),
    'nested_components' => mount(nested_components.App, target: target),
    'html_tags' => mount(html_tags.App, target: target),
    'reactive_assignments' => mount(reactive_assignments.App, target: target),
    'reactive_declarations' => mount(reactive_declarations.App, target: target),
    'reactive_statements' => mount(reactive_statements.App, target: target),
    'declaring_properties' => mount(declaring_properties.App, target: target),
    'default_values' => mount(default_values.App, target: target),
    'spread_properties' => mount(spread_properties.App, target: target),
    // 'if_blocks' => mount(if_blocks.App, target: target),
    // 'else_blocks' => mount(else_blocks.App, target: target),
    // 'else_if_blocks' => mount(else_if_blocks.App, target: target),
    // 'each_blocks' => mount(each_blocks.App, target: target),
    // 'keyed_each_blocks' => mount(keyed_each_blocks.App, target: target),
    // 'await_blocks' => mount(await_blocks.App, target: target),
    // 'dom_events' => mount(dom_events.App, target: target),
    // 'inline_handlers' => mount(inline_handlers.App, target: target),
    // 'event_modifiers' => mount(event_modifiers.App, target: target),
    // 'component_events' => mount(component_events.App, target: target),
    // 'event_forwarding' => mount(event_forwarding.App, target: target),
    // 'dom_event_forwarding' => mount(dom_event_forwarding.App, target: target),
    // 'text_inputs' => mount(text_inputs.App, target: target),
    // 'numeric_inputs' => mount(numeric_inputs.App, target: target),
    // 'checkbox_inputs' => mount(checkbox_inputs.App, target: target),
    _ => null,
  };
}

void main() {
  var select = document.querySelector('nav select') as HTMLSelectElement;
  var target = document.querySelector('main') as HTMLElement;
  var link = document.querySelector('nav a') as HTMLAnchorElement;

  ComponentReference? current;

  void onChange(Event event) {
    try {
      if (current case var component?) {
        unmount(component);
      }

      window.location.hash = link.hash = select.value;
      current = mountComponent(select.value, target);
    } catch (error, stackTrace) {
      print(error);
      print(stackTrace);
      rethrow;
    }
  }

  select.addEventListener('change', onChange.toJS);

  if (window.location.hash case var hash when hash.isNotEmpty) {
    select.value = link.hash = hash.substring(1);
    onChange(Event('change'));
  }
}
