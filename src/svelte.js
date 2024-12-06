import 'svelte/internal/disclose-version';
import 'svelte/internal/flags/legacy';

import {
  await as await_block,           // dom/blocks/await.js
  each,                           // dom/blocks/each.js
  html,                           // dom/blocks/html.js
  if as if_block,                 // dom/blocks/if.js
  append_styles,                  // dom/css.js
  event,                          // dom/elements/events.js
  reset,                          // dom/hydration.js
  init,                           // dom/legacy/lifecycle.js
  template, comment, append,      // dom/template.js
  set_attribute,                  // dom/elements/attributes.js
  child, first_child, sibling,    // dom/operations.js
  legacy_pre_effect,              // reactivity/effects.js
  legacy_pre_effect_reset, template_effect,
  spread_props, prop,             // reactivity/props.js
  mutable_state, mutate, set,     // reactivity/sources.js
  set_text,                       // render.js
  get, push, pop,                 // runtime.js
} from 'svelte/internal/client';

import {
  createEventDispatcher,          // index.js
  mount, unmount,                 // render.js
} from 'svelte';

// import {
// remove_input_attr_defaults,     // dom/elements/attributes.js
// bind_value, bind_group,         // dom/elements/bindings.js
// bind_checked, bind_files,
// remove_textarea_child,          // dom/elements/misc.js
// bubble_event,                   // dom/legacy/misc.js
// derived,                        // reactivity/deriveds.js
// user_effect,                    // reactivity/effects.js
// rest_props,                     // reactivity/props.js
// source,                         // reactivity/sources.js
// } from 'svelte/internal/client';

const get_props_with_getter = (key, get) => {
  return {
    [key]: () => get()
  };
};

const set_props_getter = (props, key, get) => {
  Object.defineProperty(props, key, { get });
};

export default {
  get_props_with_getter, set_props_getter,

  await_block,
  each,
  html,
  if_block,
  set_attribute,
  event,
  reset,
  init,
  child, first_child, sibling,
  template, comment, append,
  legacy_pre_effect, legacy_pre_effect_reset, template_effect,
  spread_props, prop,
  mutable_state, mutate, set,
  append_styles,
  set_text,
  get, push, pop,

  createEventDispatcher,
  mount, unmount,
};
