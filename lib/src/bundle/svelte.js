(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.$$ = factory());
})(this, function() {
  "use strict";
  const DERIVED = 1 << 1;
  const EFFECT = 1 << 2;
  const RENDER_EFFECT = 1 << 3;
  const BLOCK_EFFECT = 1 << 4;
  const BRANCH_EFFECT = 1 << 5;
  const ROOT_EFFECT = 1 << 6;
  const UNOWNED = 1 << 7;
  const CLEAN = 1 << 8;
  const DIRTY = 1 << 9;
  const MAYBE_DIRTY = 1 << 10;
  const INERT = 1 << 11;
  const DESTROYED = 1 << 12;
  const EFFECT_RAN = 1 << 14;
  var is_array = Array.isArray;
  var array_from = Array.from;
  var define_property = Object.defineProperty;
  var get_descriptor = Object.getOwnPropertyDescriptor;
  function equals(value) {
    return value === this.v;
  }
  const TEMPLATE_FRAGMENT = 1;
  const TEMPLATE_USE_IMPORT_NODE = 1 << 1;
  const UNINITIALIZED = Symbol();
  const PassiveDelegatedEvents = ["touchstart", "touchmove", "touchend"];
  // @__NO_SIDE_EFFECTS__
  function source(value) {
    const source2 = {
      f: 0,
      // TODO ideally we could skip this altogether, but it causes type errors
      reactions: null,
      equals,
      v: value,
      version: 0
    };
    return source2;
  }
  function set(signal, value) {
    var initialized = signal.v !== UNINITIALIZED;
    if (!current_untracking && initialized && current_reaction !== null && is_runes() && (current_reaction.f & DERIVED) !== 0) {
      throw new Error(
        "ERR_SVELTE_UNSAFE_MUTATION"
      );
    }
    if (!signal.equals(value)) {
      signal.v = value;
      signal.version++;
      if (is_runes() && initialized && current_effect !== null && (current_effect.f & CLEAN) !== 0 && (current_effect.f & BRANCH_EFFECT) === 0) {
        if (current_dependencies !== null && current_dependencies.includes(signal)) {
          set_signal_status(current_effect, DIRTY);
          schedule_effect(current_effect);
        } else {
          if (current_untracked_writes === null) {
            set_current_untracked_writes([signal]);
          } else {
            current_untracked_writes.push(signal);
          }
        }
      }
      mark_reactions(signal, DIRTY, true);
    }
    return value;
  }
  // @__NO_SIDE_EFFECTS__
  function derived(fn) {
    let flags = DERIVED | DIRTY;
    if (current_effect === null)
      flags |= UNOWNED;
    const signal = {
      deps: null,
      deriveds: null,
      equals,
      f: flags,
      first: null,
      fn,
      last: null,
      reactions: null,
      v: (
        /** @type {V} */
        null
      ),
      version: 0
    };
    if (current_reaction !== null && (current_reaction.f & DERIVED) !== 0) {
      var current_derived = (
        /** @type {import('#client').Derived<V>} */
        current_reaction
      );
      if (current_derived.deriveds === null) {
        current_derived.deriveds = [signal];
      } else {
        current_derived.deriveds.push(signal);
      }
    }
    return signal;
  }
  function destroy_derived_children(signal) {
    destroy_effect_children(signal);
    var deriveds = signal.deriveds;
    if (deriveds !== null) {
      signal.deriveds = null;
      for (var i = 0; i < deriveds.length; i += 1) {
        destroy_derived(deriveds[i]);
      }
    }
  }
  function update_derived(derived2, force_schedule) {
    destroy_derived_children(derived2);
    var value = execute_reaction_fn(derived2);
    var status = (current_skip_reaction || (derived2.f & UNOWNED) !== 0) && derived2.deps !== null ? MAYBE_DIRTY : CLEAN;
    set_signal_status(derived2, status);
    if (!derived2.equals(value)) {
      derived2.v = value;
      mark_reactions(derived2, DIRTY, force_schedule);
    }
  }
  function destroy_derived(signal) {
    destroy_derived_children(signal);
    remove_reactions(signal, 0);
    set_signal_status(signal, DESTROYED);
    signal.first = signal.last = signal.deps = signal.reactions = // @ts-expect-error `signal.fn` cannot be `null` while the signal is alive
    signal.fn = null;
  }
  function create_fragment_from_html(html2) {
    var elem = document.createElement("template");
    elem.innerHTML = html2;
    return elem.content;
  }
  function remove(current) {
    if (is_array(current)) {
      for (var i = 0; i < current.length; i++) {
        var node = current[i];
        if (node.isConnected) {
          node.remove();
        }
      }
    } else if (current.isConnected) {
      current.remove();
    }
  }
  function push_effect(effect2, parent_effect) {
    var parent_last = parent_effect.last;
    if (parent_last === null) {
      parent_effect.last = parent_effect.first = effect2;
    } else {
      parent_last.next = effect2;
      effect2.prev = parent_last;
      parent_effect.last = effect2;
    }
  }
  function create_effect(type, fn, sync) {
    var is_root = (type & ROOT_EFFECT) !== 0;
    var effect2 = {
      ctx: current_component_context,
      deps: null,
      dom: null,
      f: type | DIRTY,
      first: null,
      fn,
      last: null,
      next: null,
      parent: is_root ? null : current_effect,
      prev: null,
      teardown: null,
      transitions: null
    };
    if (current_reaction !== null && !is_root) {
      push_effect(effect2, current_reaction);
    }
    if (sync) {
      var previously_flushing_effect = is_flushing_effect;
      try {
        set_is_flushing_effect(true);
        execute_effect(effect2);
        effect2.f |= EFFECT_RAN;
      } finally {
        set_is_flushing_effect(previously_flushing_effect);
      }
    } else {
      schedule_effect(effect2);
    }
    return effect2;
  }
  function user_effect(fn) {
    if (current_effect === null) {
      throw new Error(
        "ERR_SVELTE_ORPHAN_EFFECT"
      );
    }
    const defer = current_effect.f & RENDER_EFFECT && // TODO do we actually need this? removing them changes nothing
    current_component_context !== null && !current_component_context.m;
    if (defer) {
      const context = (
        /** @type {import('#client').ComponentContext} */
        current_component_context
      );
      (context.e ?? (context.e = [])).push(fn);
    } else {
      effect(fn);
    }
  }
  function effect_root(fn) {
    const effect2 = create_effect(ROOT_EFFECT, fn, true);
    return () => {
      destroy_effect(effect2);
    };
  }
  function effect(fn) {
    return create_effect(EFFECT, fn, false);
  }
  function render_effect(fn) {
    return create_effect(RENDER_EFFECT, fn, true);
  }
  function branch(fn) {
    return create_effect(RENDER_EFFECT | BRANCH_EFFECT, fn, true);
  }
  function destroy_effect(effect2) {
    var _a;
    var dom = effect2.dom;
    if (dom !== null) {
      remove(dom);
    }
    destroy_effect_children(effect2);
    remove_reactions(effect2, 0);
    set_signal_status(effect2, DESTROYED);
    if (effect2.transitions) {
      for (const transition of effect2.transitions) {
        transition.stop();
      }
    }
    (_a = effect2.teardown) == null ? void 0 : _a.call(null);
    var parent = effect2.parent;
    if (parent !== null && (effect2.f & BRANCH_EFFECT) !== 0 && parent.first !== null) {
      var previous = effect2.prev;
      var next = effect2.next;
      if (previous !== null) {
        if (next !== null) {
          previous.next = next;
          next.prev = previous;
        } else {
          previous.next = null;
          parent.last = previous;
        }
      } else if (next !== null) {
        next.prev = null;
        parent.first = next;
      } else {
        parent.first = null;
        parent.last = null;
      }
    }
    effect2.next = effect2.prev = effect2.teardown = effect2.ctx = effect2.dom = effect2.deps = effect2.parent = // @ts-expect-error
    effect2.fn = null;
  }
  function flush_tasks() {
  }
  const FLUSH_MICROTASK = 0;
  const FLUSH_SYNC = 1;
  let current_scheduler_mode = FLUSH_MICROTASK;
  let is_micro_task_queued = false;
  let is_flushing_effect = false;
  function set_is_flushing_effect(value) {
    is_flushing_effect = value;
  }
  let current_queued_root_effects = [];
  let flush_count = 0;
  let current_reaction = null;
  let current_effect = null;
  let current_dependencies = null;
  let current_dependencies_index = 0;
  let current_untracked_writes = null;
  function set_current_untracked_writes(value) {
    current_untracked_writes = value;
  }
  let current_untracking = false;
  let current_skip_reaction = false;
  let current_component_context = null;
  function is_runes() {
    return current_component_context !== null && current_component_context.r;
  }
  function check_dirtiness(reaction) {
    var _a;
    var flags = reaction.f;
    if ((flags & DIRTY) !== 0) {
      return true;
    }
    if ((flags & MAYBE_DIRTY) !== 0) {
      var dependencies = reaction.deps;
      var is_unowned = (flags & UNOWNED) !== 0;
      if (dependencies !== null) {
        var length = dependencies.length;
        for (var i = 0; i < length; i++) {
          var dependency = dependencies[i];
          if (check_dirtiness(
            /** @type {import('#client').Derived} */
            dependency
          )) {
            update_derived(
              /** @type {import('#client').Derived} **/
              dependency,
              true
            );
            if ((reaction.f & DIRTY) !== 0) {
              return true;
            }
          }
          var version = dependency.version;
          if (is_unowned) {
            if (version > /** @type {import('#client').Derived} */
            reaction.version) {
              reaction.version = version;
              return true;
            } else if (!current_skip_reaction && !((_a = dependency == null ? void 0 : dependency.reactions) == null ? void 0 : _a.includes(reaction))) {
              var reactions = dependency.reactions;
              if (reactions === null) {
                dependency.reactions = [reaction];
              } else {
                reactions.push(reaction);
              }
            }
          }
        }
      }
      if (!is_unowned) {
        set_signal_status(reaction, CLEAN);
      }
    }
    return false;
  }
  function execute_reaction_fn(signal) {
    const previous_dependencies = current_dependencies;
    const previous_dependencies_index = current_dependencies_index;
    const previous_untracked_writes = current_untracked_writes;
    const previous_reaction = current_reaction;
    const previous_skip_reaction = current_skip_reaction;
    const previous_untracking = current_untracking;
    current_dependencies = /** @type {null | import('./types.js').Value[]} */
    null;
    current_dependencies_index = 0;
    current_untracked_writes = null;
    current_reaction = signal;
    current_skip_reaction = !is_flushing_effect && (signal.f & UNOWNED) !== 0;
    current_untracking = false;
    try {
      let res = signal.fn();
      let dependencies = (
        /** @type {import('./types.js').Value<unknown>[]} **/
        signal.deps
      );
      if (current_dependencies !== null) {
        let i;
        if (dependencies !== null) {
          const deps_length = dependencies.length;
          const full_current_dependencies = current_dependencies_index === 0 ? current_dependencies : dependencies.slice(0, current_dependencies_index).concat(current_dependencies);
          const current_dep_length = full_current_dependencies.length;
          const full_current_dependencies_set = current_dep_length > 16 && deps_length - current_dependencies_index > 1 ? new Set(full_current_dependencies) : null;
          for (i = current_dependencies_index; i < deps_length; i++) {
            const dependency = dependencies[i];
            if (full_current_dependencies_set !== null ? !full_current_dependencies_set.has(dependency) : !full_current_dependencies.includes(dependency)) {
              remove_reaction(signal, dependency);
            }
          }
        }
        if (dependencies !== null && current_dependencies_index > 0) {
          dependencies.length = current_dependencies_index + current_dependencies.length;
          for (i = 0; i < current_dependencies.length; i++) {
            dependencies[current_dependencies_index + i] = current_dependencies[i];
          }
        } else {
          signal.deps = /** @type {import('./types.js').Value<V>[]} **/
          dependencies = current_dependencies;
        }
        if (!current_skip_reaction) {
          for (i = current_dependencies_index; i < dependencies.length; i++) {
            const dependency = dependencies[i];
            const reactions = dependency.reactions;
            if (reactions === null) {
              dependency.reactions = [signal];
            } else if (reactions[reactions.length - 1] !== signal) {
              reactions.push(signal);
            }
          }
        }
      } else if (dependencies !== null && current_dependencies_index < dependencies.length) {
        remove_reactions(signal, current_dependencies_index);
        dependencies.length = current_dependencies_index;
      }
      return res;
    } finally {
      current_dependencies = previous_dependencies;
      current_dependencies_index = previous_dependencies_index;
      current_untracked_writes = previous_untracked_writes;
      current_reaction = previous_reaction;
      current_skip_reaction = previous_skip_reaction;
      current_untracking = previous_untracking;
    }
  }
  function remove_reaction(signal, dependency) {
    const reactions = dependency.reactions;
    let reactions_length = 0;
    if (reactions !== null) {
      reactions_length = reactions.length - 1;
      const index = reactions.indexOf(signal);
      if (index !== -1) {
        if (reactions_length === 0) {
          dependency.reactions = null;
        } else {
          reactions[index] = reactions[reactions_length];
          reactions.pop();
        }
      }
    }
    if (reactions_length === 0 && (dependency.f & UNOWNED) !== 0) {
      set_signal_status(dependency, DIRTY);
      remove_reactions(
        /** @type {import('./types.js').Derived} **/
        dependency,
        0
      );
    }
  }
  function remove_reactions(signal, start_index) {
    const dependencies = signal.deps;
    if (dependencies !== null) {
      const active_dependencies = start_index === 0 ? null : dependencies.slice(0, start_index);
      let i;
      for (i = start_index; i < dependencies.length; i++) {
        const dependency = dependencies[i];
        if (active_dependencies === null || !active_dependencies.includes(dependency)) {
          remove_reaction(signal, dependency);
        }
      }
    }
  }
  function destroy_effect_children(signal) {
    let effect2 = signal.first;
    signal.first = null;
    signal.last = null;
    var sibling2;
    while (effect2 !== null) {
      sibling2 = effect2.next;
      destroy_effect(effect2);
      effect2 = sibling2;
    }
  }
  function execute_effect(effect2) {
    var _a;
    var flags = effect2.f;
    if ((flags & DESTROYED) !== 0) {
      return;
    }
    set_signal_status(effect2, CLEAN);
    var component_context = effect2.ctx;
    var previous_effect = current_effect;
    var previous_component_context = current_component_context;
    current_effect = effect2;
    current_component_context = component_context;
    try {
      if ((flags & BLOCK_EFFECT) === 0) {
        destroy_effect_children(effect2);
      }
      (_a = effect2.teardown) == null ? void 0 : _a.call(null);
      var teardown = execute_reaction_fn(effect2);
      effect2.teardown = typeof teardown === "function" ? teardown : null;
    } finally {
      current_effect = previous_effect;
      current_component_context = previous_component_context;
    }
  }
  function infinite_loop_guard() {
    if (flush_count > 1e3) {
      flush_count = 0;
      throw new Error(
        "ERR_SVELTE_TOO_MANY_UPDATES"
      );
    }
    flush_count++;
  }
  function flush_queued_root_effects(root_effects) {
    for (var i = 0; i < root_effects.length; i++) {
      var signal = root_effects[i];
      flush_nested_effects(signal, RENDER_EFFECT | EFFECT);
    }
  }
  function flush_queued_effects(effects) {
    var length = effects.length;
    if (length === 0)
      return;
    infinite_loop_guard();
    for (var i = 0; i < length; i++) {
      var effect2 = effects[i];
      if ((effect2.f & (DESTROYED | INERT)) === 0 && check_dirtiness(effect2)) {
        execute_effect(effect2);
      }
    }
  }
  function process_microtask() {
    is_micro_task_queued = false;
    if (flush_count > 101) {
      return;
    }
    const previous_queued_root_effects = current_queued_root_effects;
    current_queued_root_effects = [];
    flush_queued_root_effects(previous_queued_root_effects);
    if (!is_micro_task_queued) {
      flush_count = 0;
    }
  }
  function schedule_effect(signal) {
    if (current_scheduler_mode === FLUSH_MICROTASK) {
      if (!is_micro_task_queued) {
        is_micro_task_queued = true;
        queueMicrotask(process_microtask);
      }
    }
    var effect2 = signal;
    while (effect2.parent !== null) {
      effect2 = effect2.parent;
      var flags = effect2.f;
      if ((flags & BRANCH_EFFECT) !== 0) {
        if ((flags & CLEAN) === 0)
          return;
        set_signal_status(effect2, MAYBE_DIRTY);
      }
    }
    current_queued_root_effects.push(effect2);
  }
  function process_effects(effect2, filter_flags, shallow, collected_effects) {
    var current_effect2 = effect2.first;
    var effects = [];
    main_loop:
      while (current_effect2 !== null) {
        var flags = current_effect2.f;
        var is_active = (flags & (DESTROYED | INERT)) === 0;
        var is_branch = flags & BRANCH_EFFECT;
        var is_clean = (flags & CLEAN) !== 0;
        var child2 = current_effect2.first;
        if (is_active && (!is_branch || !is_clean)) {
          if (is_branch) {
            set_signal_status(current_effect2, CLEAN);
          }
          if ((flags & RENDER_EFFECT) !== 0) {
            if (is_branch) {
              if (!shallow && child2 !== null) {
                current_effect2 = child2;
                continue;
              }
            } else {
              if (check_dirtiness(current_effect2)) {
                execute_effect(current_effect2);
                child2 = current_effect2.first;
              }
              if (!shallow && child2 !== null) {
                current_effect2 = child2;
                continue;
              }
            }
          } else if ((flags & EFFECT) !== 0) {
            if (is_branch || is_clean) {
              if (!shallow && child2 !== null) {
                current_effect2 = child2;
                continue;
              }
            } else {
              effects.push(current_effect2);
            }
          }
        }
        var sibling2 = current_effect2.next;
        if (sibling2 === null) {
          let parent = current_effect2.parent;
          while (parent !== null) {
            if (effect2 === parent) {
              break main_loop;
            }
            var parent_sibling = parent.next;
            if (parent_sibling !== null) {
              current_effect2 = parent_sibling;
              continue main_loop;
            }
            parent = parent.parent;
          }
        }
        current_effect2 = sibling2;
      }
    if (effects.length > 0) {
      if ((filter_flags & EFFECT) !== 0) {
        collected_effects.push(...effects);
      }
      if (!shallow) {
        for (var i = 0; i < effects.length; i++) {
          process_effects(effects[i], filter_flags, false, collected_effects);
        }
      }
    }
  }
  function flush_nested_effects(effect2, filter_flags, shallow = false) {
    var collected_effects = [];
    var previously_flushing_effect = is_flushing_effect;
    is_flushing_effect = true;
    try {
      if (effect2.first === null && (effect2.f & BRANCH_EFFECT) === 0) {
        flush_queued_effects([effect2]);
      } else {
        process_effects(effect2, filter_flags, shallow, collected_effects);
        flush_queued_effects(collected_effects);
      }
    } finally {
      is_flushing_effect = previously_flushing_effect;
    }
  }
  function flush_sync(fn, flush_previous = true) {
    var previous_scheduler_mode = current_scheduler_mode;
    var previous_queued_root_effects = current_queued_root_effects;
    try {
      infinite_loop_guard();
      const root_effects = [];
      current_scheduler_mode = FLUSH_SYNC;
      current_queued_root_effects = root_effects;
      if (flush_previous) {
        flush_queued_root_effects(previous_queued_root_effects);
      }
      var result = fn == null ? void 0 : fn();
      if (current_queued_root_effects.length > 0 || root_effects.length > 0) {
        flush_sync();
      }
      flush_tasks();
      flush_count = 0;
      return result;
    } finally {
      current_scheduler_mode = previous_scheduler_mode;
      current_queued_root_effects = previous_queued_root_effects;
    }
  }
  function get(signal) {
    const flags = signal.f;
    if ((flags & DESTROYED) !== 0) {
      return signal.v;
    }
    if (current_reaction !== null && (current_reaction.f & (BRANCH_EFFECT | ROOT_EFFECT)) === 0 && !current_untracking) {
      const unowned = (current_reaction.f & UNOWNED) !== 0;
      const dependencies = current_reaction.deps;
      if (current_dependencies === null && dependencies !== null && dependencies[current_dependencies_index] === signal && !(unowned && current_effect !== null)) {
        current_dependencies_index++;
      } else if (dependencies === null || current_dependencies_index === 0 || dependencies[current_dependencies_index - 1] !== signal) {
        if (current_dependencies === null) {
          current_dependencies = [signal];
        } else {
          current_dependencies.push(signal);
        }
      }
      if (current_untracked_writes !== null && current_effect !== null && (current_effect.f & CLEAN) !== 0 && (current_effect.f & BRANCH_EFFECT) === 0 && current_untracked_writes.includes(signal)) {
        set_signal_status(current_effect, DIRTY);
        schedule_effect(current_effect);
      }
    }
    if ((flags & DERIVED) !== 0 && check_dirtiness(
      /** @type {import('#client').Derived} */
      signal
    )) {
      {
        update_derived(
          /** @type {import('./types.js').Derived} **/
          signal,
          false
        );
      }
    }
    return signal.v;
  }
  function mark_reactions(signal, to_status, force_schedule) {
    var reactions = signal.reactions;
    if (reactions === null)
      return;
    var runes = is_runes();
    var length = reactions.length;
    for (var i = 0; i < length; i++) {
      var reaction = reactions[i];
      if ((!force_schedule || !runes) && reaction === current_effect) {
        continue;
      }
      var flags = reaction.f;
      set_signal_status(reaction, to_status);
      var maybe_dirty = (flags & MAYBE_DIRTY) !== 0;
      var unowned = (flags & UNOWNED) !== 0;
      if ((flags & CLEAN) !== 0 || maybe_dirty && unowned) {
        if ((reaction.f & DERIVED) !== 0) {
          mark_reactions(
            /** @type {import('#client').Derived} */
            reaction,
            MAYBE_DIRTY,
            force_schedule
          );
        } else {
          schedule_effect(
            /** @type {import('#client').Effect} */
            reaction
          );
        }
      }
    }
  }
  const STATUS_MASK = ~(DIRTY | MAYBE_DIRTY | CLEAN);
  function set_signal_status(signal, status) {
    signal.f = signal.f & STATUS_MASK | status;
  }
  function push(props, runes = false, fn) {
    current_component_context = {
      // exports (and props, if `accessors: true`)
      x: null,
      // context
      c: null,
      // effects
      e: null,
      // mounted
      m: false,
      // parent
      p: current_component_context,
      // signals
      d: null,
      // props
      s: props,
      // runes
      r: runes,
      // legacy $:
      l1: [],
      l2: /* @__PURE__ */ source(false),
      // update_callbacks
      u: null
    };
  }
  function pop(component) {
    const context_stack_item = current_component_context;
    if (context_stack_item !== null) {
      if (component !== void 0) {
        context_stack_item.x = component;
      }
      const effects = context_stack_item.e;
      if (effects !== null) {
        context_stack_item.e = null;
        for (let i = 0; i < effects.length; i++) {
          effect(effects[i]);
        }
      }
      current_component_context = context_stack_item.p;
      context_stack_item.m = true;
    }
    return component || /** @type {T} */
    {};
  }
  var node_prototype;
  var element_prototype;
  var text_prototype;
  var append_child_method;
  var clone_node_method;
  var first_child_get;
  var next_sibling_get;
  function init_operations() {
    if (node_prototype !== void 0) {
      return;
    }
    node_prototype = Node.prototype;
    element_prototype = Element.prototype;
    text_prototype = Text.prototype;
    append_child_method = node_prototype.appendChild;
    clone_node_method = node_prototype.cloneNode;
    element_prototype.__click = void 0;
    text_prototype.__nodeValue = " ";
    element_prototype.__className = "";
    element_prototype.__attributes = null;
    first_child_get = /** @type {(this: Node) => ChildNode | null} */
    // @ts-ignore
    get_descriptor(node_prototype, "firstChild").get;
    next_sibling_get = /** @type {(this: Node) => ChildNode | null} */
    // @ts-ignore
    get_descriptor(node_prototype, "nextSibling").get;
    // @ts-ignore
    get_descriptor(node_prototype, "textContent").set;
    // @ts-ignore
    get_descriptor(element_prototype, "className").set;
  }
  function append_child(element, child2) {
    append_child_method.call(element, child2);
  }
  // @__NO_SIDE_EFFECTS__
  function clone_node(node, deep) {
    return (
      /** @type {N} */
      clone_node_method.call(node, deep)
    );
  }
  function empty() {
    return document.createTextNode("");
  }
  // @__NO_SIDE_EFFECTS__
  function child(node) {
    const child2 = first_child_get.call(node);
    return child2;
  }
  // @__NO_SIDE_EFFECTS__
  function first_child(fragment, is_text) {
    {
      return first_child_get.call(
        /** @type {DocumentFragment} */
        fragment
      );
    }
  }
  // @__NO_SIDE_EFFECTS__
  function sibling(node, is_text = false) {
    const next_sibling = next_sibling_get.call(node);
    {
      return next_sibling;
    }
  }
  // @__NO_SIDE_EFFECTS__
  function create_element(name) {
    return document.createElement(name);
  }
  function html(anchor, get_value, svg) {
    let value = /* @__PURE__ */ derived(get_value);
    render_effect(() => {
      var dom = html_to_dom(anchor, get(value), svg);
      if (dom) {
        return () => remove(dom);
      }
    });
  }
  function html_to_dom(target, value, svg) {
    var html2 = value + "";
    if (svg)
      html2 = `<svg>${html2}</svg>`;
    var node = create_fragment_from_html(html2);
    if (svg) {
      node = /** @type {Element} */
      node.firstChild;
    }
    if (node.childNodes.length === 1) {
      var child2 = (
        /** @type {Text | Element | Comment} */
        node.firstChild
      );
      target.before(child2);
      return child2;
    }
    var nodes = (
      /** @type {Array<Text | Element | Comment>} */
      [...node.childNodes]
    );
    if (svg) {
      while (node.firstChild) {
        target.before(node.firstChild);
      }
    } else {
      target.before(node);
    }
    return nodes;
  }
  function delegate(events) {
    for (var i = 0; i < events.length; i++) {
      all_registered_events.add(events[i]);
    }
    for (var fn of root_event_handles) {
      fn(events);
    }
  }
  function handle_event_propagation(handler_element, event) {
    var _a;
    var owner_document = handler_element.ownerDocument;
    var event_name = event.type;
    var path = ((_a = event.composedPath) == null ? void 0 : _a.call(event)) || [];
    var current_target = (
      /** @type {null | Element} */
      path[0] || event.target
    );
    if (event.target !== current_target) {
      define_property(event, "target", {
        configurable: true,
        value: current_target
      });
    }
    var path_idx = 0;
    var handled_at = event.__root;
    if (handled_at) {
      var at_idx = path.indexOf(handled_at);
      if (at_idx !== -1 && (handler_element === document || handler_element === /** @type {any} */
      window)) {
        event.__root = handler_element;
        return;
      }
      var handler_idx = path.indexOf(handler_element);
      if (handler_idx === -1) {
        return;
      }
      if (at_idx <= handler_idx) {
        path_idx = at_idx + 1;
      }
    }
    current_target = /** @type {Element} */
    path[path_idx] || event.target;
    define_property(event, "currentTarget", {
      configurable: true,
      get() {
        return current_target || owner_document;
      }
    });
    while (current_target !== null) {
      var parent_element = current_target.parentNode || /** @type {any} */
      current_target.host || null;
      var internal_prop_name = "__" + event_name;
      var delegated = current_target[internal_prop_name];
      if (delegated !== void 0 && !/** @type {any} */
      current_target.disabled) {
        if (is_array(delegated)) {
          var [fn, ...data] = delegated;
          fn.apply(current_target, [event, ...data]);
        } else {
          delegated.call(current_target, event);
        }
      }
      if (event.cancelBubble || parent_element === handler_element || current_target === handler_element) {
        break;
      }
      current_target = parent_element;
    }
    event.__root = handler_element;
    current_target = handler_element;
  }
  const all_registered_events = /* @__PURE__ */ new Set();
  const root_event_handles = /* @__PURE__ */ new Set();
  function set_text(dom, value) {
    const prev_node_value = dom.__nodeValue;
    const next_node_value = stringify(value);
    if (prev_node_value !== next_node_value) {
      dom.nodeValue = next_node_value;
      dom.__nodeValue = next_node_value;
    }
  }
  function stringify(value) {
    return typeof value === "string" ? value : value == null ? "" : value + "";
  }
  function mount(component, options) {
    const anchor = options.anchor ?? options.target.appendChild(empty());
    return flush_sync(() => _mount(component, { ...options, anchor }), false);
  }
  function _mount(Component, { target, anchor, props = (
    /** @type {Props} */
    {}
  ), events, context, intro = false }) {
    init_operations();
    const registered_events = /* @__PURE__ */ new Set();
    const bound_event_listener = handle_event_propagation.bind(null, target);
    const bound_document_event_listener = handle_event_propagation.bind(null, document);
    const event_handle = (events2) => {
      for (let i = 0; i < events2.length; i++) {
        const event_name = events2[i];
        if (!registered_events.has(event_name)) {
          registered_events.add(event_name);
          target.addEventListener(
            event_name,
            bound_event_listener,
            PassiveDelegatedEvents.includes(event_name) ? {
              passive: true
            } : void 0
          );
          document.addEventListener(
            event_name,
            bound_document_event_listener,
            PassiveDelegatedEvents.includes(event_name) ? {
              passive: true
            } : void 0
          );
        }
      }
    };
    event_handle(array_from(all_registered_events));
    root_event_handles.add(event_handle);
    let component = void 0;
    const unmount2 = effect_root(() => {
      branch(() => {
        if (context) {
          push({});
          var ctx = (
            /** @type {import('#client').ComponentContext} */
            current_component_context
          );
          ctx.c = context;
        }
        if (events) {
          props.$$events = events;
        }
        component = Component(anchor, props) || {};
        if (context) {
          pop();
        }
      });
      return () => {
        for (const event_name of registered_events) {
          target.removeEventListener(event_name, bound_event_listener);
        }
        root_event_handles.delete(event_handle);
      };
    });
    mounted_components.set(component, unmount2);
    return component;
  }
  let mounted_components = /* @__PURE__ */ new WeakMap();
  function unmount(component) {
    const fn = mounted_components.get(component);
    fn == null ? void 0 : fn();
  }
  async function append_styles(target, style_sheet_id, styles) {
    await Promise.resolve();
    const append_styles_to = get_root_for_style(target);
    if (!append_styles_to.getElementById(style_sheet_id)) {
      const style = /* @__PURE__ */ create_element("style");
      style.id = style_sheet_id;
      style.textContent = styles;
      append_child(
        /** @type {Document} */
        append_styles_to.head || append_styles_to,
        style
      );
    }
  }
  function get_root_for_style(node) {
    if (!node)
      return document;
    const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
    if (root && /** @type {ShadowRoot} */
    root.host) {
      return (
        /** @type {ShadowRoot} */
        root
      );
    }
    return (
      /** @type {Document} */
      node.ownerDocument
    );
  }
  function remove_input_attr_defaults(dom) {
  }
  function set_attribute(element, attribute, value) {
    value = value == null ? null : value + "";
    var attributes = element.__attributes ?? (element.__attributes = {});
    if (attributes[attribute] === (attributes[attribute] = value))
      return;
    if (value === null) {
      element.removeAttribute(attribute);
    } else {
      element.setAttribute(attribute, value);
    }
  }
  // @__NO_SIDE_EFFECTS__
  function template(content, flags) {
    var is_fragment = (flags & TEMPLATE_FRAGMENT) !== 0;
    var use_import_node = (flags & TEMPLATE_USE_IMPORT_NODE) !== 0;
    var node;
    return () => {
      if (!node) {
        node = create_fragment_from_html(content);
        if (!is_fragment)
          node = /** @type {Node} */
          node.firstChild;
      }
      return use_import_node ? document.importNode(node, true) : /* @__PURE__ */ clone_node(node, true);
    };
  }
  function append(anchor, dom) {
    var current = dom;
    {
      var node = (
        /** @type {Node} */
        dom
      );
      if (node.nodeType === 11) {
        current = /** @type {import('#client').Dom} */
        [...node.childNodes];
      }
      anchor.before(node);
    }
    current_effect.dom = current;
  }
  const svelte = {
    html,
    remove_input_attr_defaults,
    set_attribute,
    delegate,
    child,
    first_child,
    sibling,
    template,
    append,
    derived,
    user_effect,
    render_effect,
    source,
    set,
    set_text,
    mount,
    unmount,
    append_styles,
    get,
    push,
    pop
  };
  return svelte;
});
//# sourceMappingURL=svelte.js.map
