import {
  await as await_block,           // dom/blocks/await.js
  each,                           // dom/blocks/each.js
  html,                           // dom/blocks/html.js
  if as if_block,                 // dom/blocks/if.js
  remove_input_attr_defaults,     // dom/elements/attributes.js
  set_attribute,
  bind_value, bind_group,         // dom/elements/bindings.js
  bind_checked,
  event,                          // dom/elements/events.js
  init,                           // dom/legacy/lifecycle.js
  bubble_event,                   // dom/legacy/misc.js
  first_child, child, sibling,    // dom/operations.js
  template, comment, append,      // dom/template.js
  derived,                        // reactivity/deriveds.js
  user_effect, legacy_pre_effect, // reactivity/effects.js
  legacy_pre_effect_reset, template_effect,
  rest_props, spread_props, prop, // reactivity/props.js
  source, mutable_source, mutate, // reactivity/sources.js
  set,
  set_text, append_styles,        // render.js
  get, push, pop,                 // runtime.js
} from 'svelte/internal/client';

import {
  createEventDispatcher,          // client.js
  mount, unmount,                 // render.js
} from 'svelte';

const getter = (value) => {
  return () => value;
};

const set_getter = (object, key, get) => {
  Object.defineProperty(object, key, { get });
};

const set_property = (object, key, value) => {
  object[key] = value;
};

export default {
  getter, set_getter, set_property,

  await_block,
  each,
  html,
  if_block,
  remove_input_attr_defaults, set_attribute,
  bind_value, bind_group, bind_checked,
  event,
  init,
  bubble_event,
  first_child, child, sibling,
  template, comment, append,
  derived,
  user_effect, legacy_pre_effect, legacy_pre_effect_reset, template_effect,
  rest_props, spread_props, prop,
  source, mutable_source, mutate, set,
  set_text, append_styles,
  get, push, pop,

  createEventDispatcher,
  mount, unmount,
};
