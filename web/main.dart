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

Component? selectFactory(String name) {
  return switch (name) {
    'hello_world' => (Node node, JSObject properties) {
        hello_world.app(node, hello_world.AppProperties());
      },
    'dynamic_attributes' => (Node node, JSObject properties) {
        dynamic_attributes.app(node, dynamic_attributes.AppProperties());
      },
    'styling' => (Node node, JSObject properties) {
        styling.app(node, styling.AppProperties());
      },
    'nested_components' => (Node node, JSObject properties) {
        nested_components.app(node, nested_components.AppProperties());
      },
    'html_tags' => (Node node, JSObject properties) {
        html_tags.app(node, html_tags.AppProperties());
      },
    'reactive_assignments' => (Node node, JSObject properties) {
        reactive_assignments.app(node, reactive_assignments.AppProperties());
      },
    'reactive_declarations' => (Node node, JSObject properties) {
        reactive_declarations.app(node, reactive_declarations.AppProperties());
      },
    'reactive_statements' => (Node node, JSObject properties) {
        reactive_statements.app(node, reactive_statements.AppProperties());
      },
    'declaring_properties' => (Node node, JSObject properties) =>
        declaring_properties.app(node, declaring_properties.AppProperties()),
    'default_values' => (Node node, JSObject properties) {
        default_values.app(node, default_values.AppProperties());
      },
    'spread_properties' => (Node node, JSObject properties) {
        spread_properties.app(node, spread_properties.AppProperties());
      },
    'if_blocks' => (Node node, JSObject properties) {
        if_blocks.app(node, if_blocks.AppProperties());
      },
    'else_blocks' => (Node node, JSObject properties) {
        else_blocks.app(node, else_blocks.AppProperties());
      },
    'else_if_blocks' => (Node node, JSObject properties) {
        else_if_blocks.app(node, else_if_blocks.AppProperties());
      },
    'each_blocks' => (Node node, JSObject properties) {
        each_blocks.app(node, each_blocks.AppProperties());
      },
    'keyed_each_blocks' => (Node node, JSObject properties) {
        keyed_each_blocks.app(node, keyed_each_blocks.AppProperties());
      },
    'await_blocks' => (Node node, JSObject properties) {
        await_blocks.app(node, await_blocks.AppProperties());
      },
    'dom_events' => (Node node, JSObject properties) {
        dom_events.app(node, dom_events.AppProperties());
      },
    _ => null,
  };
}

void main() {
  var select = document.querySelector('select') as HTMLSelectElement;
  var target = document.querySelector('main') as HTMLElement;

  ComponentReference? component;

  void onChange(Event event) {
    try {
      var app = selectFactory(select.value);

      if (component case var component?) {
        unmount(component);
      }

      if (app != null) {
        component = mount(app, target: target);
        console.log(component);
      }
    } catch (error, stackTrace) {
      print(error);
      print(stackTrace);
    }
  }

  select.addEventListener('change', onChange.toJS);
}
