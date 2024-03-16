import 'dart:js_interop';

import 'package:svelte_js/svelte_js.dart';
import 'package:web/web.dart';

import 'examples/00_introduction/00_hello_world/app.dart' as hello_world;
import 'examples/00_introduction/01_dynamic_attributes/app.dart'
    as dynamic_attributes;
import 'examples/00_introduction/02_styling/app.dart' as styling;
import 'examples/00_introduction/03_nested_components/app.dart'
    as nested_components;
import 'examples/00_introduction/04_html_tags/app.dart' as html_tags;
import 'examples/01_reactivity/00_reactive_assignments/app.dart'
    as reactive_assignments;
import 'examples/01_reactivity/01_reactive_declarations/app.dart'
    as reactive_declarations;
import 'examples/01_reactivity/02_reactive_statements/app.dart'
    as reactive_statements;
import 'examples/02_properties/00_declaring_properties/app.dart'
    as declaring_properties;
import 'examples/02_properties/01_default_values/app.dart' as default_values;
import 'examples/02_properties/02_spread_properties/app.dart'
    as spread_properties;
import 'examples/03_logic/00_if_blocks/app.dart' as if_blocks;
import 'examples/03_logic/01_else_blocks/app.dart' as else_blocks;
import 'examples/03_logic/02_else_if_blocks/app.dart' as else_if_blocks;
import 'examples/03_logic/03_each_blocks/app.dart' as each_blocks;
import 'examples/03_logic/04_keyed_each_blocks/app.dart' as keyed_each_blocks;

Component? selectFactory(String name) {
  return switch (name) {
    'hello_world' => hello_world.app,
    'dynamic_attributes' => dynamic_attributes.app,
    'styling' => styling.app,
    'nested_components' => nested_components.app,
    'html_tags' => html_tags.app,
    'reactive_assignments' => reactive_assignments.app,
    'reactive_declarations' => reactive_declarations.app,
    'reactive_statements' => reactive_statements.app,
    'declaring_properties' => declaring_properties.app,
    'default_values' => default_values.app,
    'spread_properties' => spread_properties.app,
    'if_blocks' => if_blocks.app,
    'else_blocks' => else_blocks.app,
    'else_if_blocks' => else_if_blocks.app,
    'each_blocks' => each_blocks.app,
    'keyed_each_blocks' => keyed_each_blocks.app,
    _ => null,
  };
}

void main() {
  var select = document.querySelector('select') as HTMLSelectElement;
  var target = document.querySelector('main') as HTMLElement;

  ComponentReference? component;

  void onChange(Event event) {
    var app = selectFactory(select.value);

    if (component case var component?) {
      unmount(component);
    }

    if (app != null) {
      component = mount(app, target: target);
    }
  }

  select.addEventListener('change', onChange.toJS);
}

extension type CurrentObject._(JSObject _) implements JSObject {
  external CurrentObject();
}
