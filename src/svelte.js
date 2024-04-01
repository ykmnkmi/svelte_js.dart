import {
  // dom/blocks/*
  await as await_block, each_keyed, each_indexed, if as if_block, html,
  // dom/elements/*
  attr_effect, attr, event,
  // dom/legacy/*
  bubble_event, init,
  // dom/operations.js
  child, child_frag, sibling,
  // dom/template.js
  template, open, open_frag, space, comment, close, close_frag,
  // reactivity/effects.js
  legacy_pre_effect, legacy_pre_effect_reset, render_effect,
  // reactivity/props.js
  spread_props, prop,
  // reactivity/sources.js
  mutable_source, mutate, set,
  // render.js
  text_effect, text, mount, unmount, append_styles,
  // runtime.js
  get, push, pop,
} from 'svelte/internal';

import {
  createEventDispatcher,
} from 'svelte';

const forward_event = (event_name, props) => {
  return {
    [event_name]: function (event) {
      bubble_event.call(this, props, event);
    },
  };
};

const forward_events = (events, props) => {
  const object = {};

  for (const event_name of events) {
    object[event_name] = function (event) {
      bubble_event.call(this, props, event);
    };
  }

  return object;
};

const event_bubble = (event_name, dom, props) => {
  event(event_name, dom, function (event) {
    bubble_event.call(this, props, event);
  });
};

const set_getter = (object, key, getter) => {
  Object.defineProperty(object, key, {
    get: getter,
    enumerable: true,
    configurable: true,
  });
};

export default {
  await_block, each_keyed, each_indexed, if_block, html,
  attr_effect, attr, event,
  /* bubble_event, */ forward_event, forward_events, event_bubble, init,
  child, child_frag, sibling,
  template, open, open_frag, space, comment, close, close_frag,
  legacy_pre_effect, legacy_pre_effect_reset, render_effect,
  spread_props, prop,
  mutable_source, mutate, set,
  text_effect, text, mount, unmount, append_styles,
  get, push, set_getter, pop,

  createEventDispatcher,
};
