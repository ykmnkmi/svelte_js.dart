import 'svelte/internal/disclose-version';

import {
  html,                           // dom/blocks/html.js
  append_styles,                  // dom/css.js
  set_attribute,                  // dom/elements/attributes.js
  event,                          // dom/elements/events.js
  reset,                          // dom/hydration.js
  child, first_child, sibling,    // dom/operations.js
  template, comment, append,      // dom/template.js
  derived,                        // reactivity/derived.js
  user_effect, template_effect,   // reactivity/effects.js
  spread_props, prop,             // reactivity/props.js
  state, set,                     // reactivity/sources.js
  set_text,                       // render.js
  get, push, pop,                 // runtime.js

  await as await_block,           // dom/blocks/await.js
  each,                           // dom/blocks/each.js
  if as if_block,                 // dom/blocks/if.js

} from 'svelte/internal/client';

import {
  hydrate, mount, unmount,        // render.js
} from 'svelte';

const get_props_with_getter = (key, get) => {
  return {
    [key]: () => get()
  };
};

const set_props_getter = (props, key, get) => {
  Object.defineProperty(props, key, { get });
};

export default {
  // get_props_with_getter, set_props_getter,

  html,
  append_styles,
  set_attribute,
  event,
  reset,
  child, first_child, sibling,
  template, comment, append,
  derived,
  user_effect, template_effect,
  spread_props, prop,
  state, set,
  set_text,
  get, push, pop,

  // await_block,
  // each,
  // if_block,

  hydrate, mount, unmount,
};
