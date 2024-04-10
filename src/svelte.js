import {
  html,                                      // dom/blocks/html.js
  remove_input_attr_defaults, set_attribute, // dom/elements/attributes.js
  delegate,                                  // dom/elements/events.js
  child, first_child, sibling,               // dom/operations.js
  template, append,                          // dom/template.js
  derived,                                   // reactivity/deriveds.js
  user_effect, render_effect,                // reactivity/effects.js
  source, set,                               // reactivity/sources.js
  set_text, append_styles,                   // render.js
  get, push, pop,                            // runtime.js
} from 'svelte/internal/client';

import {
  mount, unmount,                            // render.js
} from 'svelte';

export default {
  html,
  remove_input_attr_defaults, set_attribute,
  delegate,
  child, first_child, sibling,
  template, append,
  derived,
  user_effect, render_effect,
  source, set,
  set_text, mount, unmount, append_styles,
  get, push, pop,
};
