import {
  await as await_block,                      // dom/blocks/await.js
  each_keyed, each_indexed,                  // dom/blocks/each.js
  html,                                      // dom/blocks/html.js
  if as if_block,                            // dom/blocks/if.js
  remove_input_attr_defaults, set_attribute, // dom/elements/attributes.js
  delegate,                                  // dom/elements/events.js
  child, first_child, sibling,               // dom/operations.js
  template, comment, append,                 // dom/template.js
  derived,                                   // reactivity/deriveds.js
  user_effect, render_effect,                // reactivity/effects.js
  spread_props, prop,                        // reactivity/props.js
  source, mutable_source, mutate, set,       // reactivity/sources.js
  set_text, append_styles,                   // render.js
  get, push, pop,                            // runtime.js
} from 'svelte/internal/client';

import {
  mount, unmount,                            // render.js
} from 'svelte';

export default {
  await_block,
  each_keyed, each_indexed,
  html,
  if_block,
  remove_input_attr_defaults, set_attribute,
  delegate,
  child, first_child, sibling,
  template, comment, append,
  derived,
  user_effect, render_effect,
  spread_props, prop,
  source, mutable_source, mutate, set,
  set_text, mount, unmount, append_styles,
  get, push, pop,
};
