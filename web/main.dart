// ignore_for_file: avoid_print
library;

import 'dart:js_interop';

import 'package:svelte_js/svelte_js.dart';
import 'package:web/web.dart';

// introduction
import 'examples/00_introduction/00_hello_world/app.dart' as i00;
import 'examples/00_introduction/01_dynamic_attributes/app.dart' as i01;
import 'examples/00_introduction/02_styling/app.dart' as i02;
import 'examples/00_introduction/03_nested_components/app.dart' as i03;
import 'examples/00_introduction/04_html_tags/app.dart' as i04;
// reactivity
import 'examples/01_reactivity/00_reactive_assignments/app.dart' as r00;
import 'examples/01_reactivity/01_reactive_declarations/app.dart' as r01;
import 'examples/01_reactivity/02_reactive_statements/app.dart' as r02;
// properties
import 'examples/02_properties/00_declaring_properties/app.dart' as p00;
import 'examples/02_properties/01_default_values/app.dart' as p01;
// logic
import 'examples/03_logic/00_if_blocks/app.dart' as l00;
import 'examples/03_logic/01_else_blocks/app.dart' as l01;
import 'examples/03_logic/02_else_if_blocks/app.dart' as l02;
import 'examples/03_logic/03_each_blocks/app.dart' as l03;
import 'examples/03_logic/04_keyed_each_blocks/app.dart' as l04;
// import 'examples/03_logic/05_await_blocks/app.dart' as await_blocks;
// events
// import 'examples/04_events/00_dom_events/app.dart' as dom_events;
// import 'examples/04_events/01_inline_handlers/app.dart' as inline_handlers;
// import 'examples/04_events/02_event_modifiers/app.dart' as event_modifiers;
// import 'examples/04_events/03_component_events/app.dart' as component_events;
// import 'examples/04_events/04_event_forwarding/app.dart' as event_forwarding;
// import 'examples/04_events/05_dom_event_forwarding/app.dart' as dom_event_forwarding;
// bindings
// import 'examples/05_bindings/00_text_inputs/app.dart' as text_inputs;
// import 'examples/05_bindings/01_numeric_inputs/app.dart' as numeric_inputs;
// import 'examples/05_bindings/02_checkbox_inputs/app.dart' as checkbox_inputs;
// import 'examples/05_bindings/03_group_inputs/app.dart' as group_inputs;
// import 'examples/05_bindings/04_textarea_inputs/app.dart' as textarea_inputs;
// import 'examples/05_bindings/05_file_inputs/app.dart' as file_inputs;

Component<JSObject>? selectComponent(String name, Node target) {
  return switch (name) {
        // introduction
        'hello_world' => i00.App,
        'dynamic_attributes' => i01.App,
        'styling' => i02.App,
        'nested_components' => i03.App,
        'html_tags' => i04.App,
        // reactivity
        'reactive_assignments' => r00.App,
        'reactive_declarations' => r01.App,
        'reactive_statements' => r02.App,
        // properties
        'declaring_properties' => p00.App,
        'default_values' => p01.App,
        // logic
        'if_blocks' => l00.App,
        'else_blocks' => l01.App,
        'else_if_blocks' => l02.App,
        'each_blocks' => l03.App,
        'keyed_each_blocks' => l04.App,
        // 'await_blocks' => mount(await_blocks.App, target: target),
        // events
        // 'dom_events' => mount(dom_events.App, target: target),
        // 'inline_handlers' => mount(inline_handlers.App, target: target),
        // 'event_modifiers' => mount(event_modifiers.App, target: target),
        // 'event_forwarding' => mount(event_forwarding.App, target: target),
        // 'dom_event_forwarding' => mount(dom_event_forwarding.App, target: target),
        // bindings
        // 'text_inputs' => mount(text_inputs.App, target: target),
        // 'numeric_inputs' => mount(numeric_inputs.App, target: target),
        // 'checkbox_inputs' => mount(checkbox_inputs.App, target: target),
        // 'group_inputs' => mount(group_inputs.App, target: target),
        // 'textarea_inputs' => mount(textarea_inputs.App, target: target),
        // 'file_inputs' => mount(file_inputs.App, target: target),
        // default
        _ => null,
      }
      as Component<JSObject>?;
}

void main() {
  var select = document.querySelector('nav select') as HTMLSelectElement;
  var link = document.querySelector('nav a') as HTMLAnchorElement;
  var target = document.querySelector('main') as HTMLElement;

  ComponentReference? current;

  void onChange(Event event) {
    try {
      if (current case var component?) {
        unmount(component);
      }

      window.location.hash = link.hash = select.value;

      var component = selectComponent(select.value, target);

      if (component != null) {
        current = mount<JSObject>(component, target: target);
      }
    } catch (error, stackTrace) {
      print(error);
      print(stackTrace);
      rethrow;
    }
  }

  select.addEventListener('change', onChange.toJS);

  if (window.location.hash.isNotEmpty) {
    link.hash = select.value = window.location.hash.substring(1);
    onChange(Event('change'));
  }
}
