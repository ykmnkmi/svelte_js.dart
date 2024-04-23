import {
  await as await_block,                      // dom/blocks/await.js
  each,                                      // dom/blocks/each.js
  html,                                      // dom/blocks/html.js
  if as if_block,                            // dom/blocks/if.js
  remove_input_attr_defaults, set_attribute, // dom/elements/attributes.js
  delegate,                                  // dom/elements/events.js
  child, sibling,                            // dom/operations.js
  template, comment, append,                 // dom/template.js
  derived,                                   // reactivity/deriveds.js
  user_effect, render_effect,                // reactivity/effects.js
  rest_props, spread_props, prop,            // reactivity/props.js
  source, mutate, set,                       // reactivity/sources.js
  set_text, append_styles,                   // render.js
  get, push, pop,                            // runtime.js
} from 'svelte/internal/client';

import {
  mount, unmount,                            // render.js
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
  delegate,
  child, sibling,
  template, comment, append,
  derived,
  user_effect, render_effect,
  rest_props, spread_props, prop,
  source, mutate, set,
  set_text, mount, unmount, append_styles,
  get, push, pop,

};
