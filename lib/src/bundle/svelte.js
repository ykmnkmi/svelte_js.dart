(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.$$ = factory());
})(this, function() {
  "use strict";
  const EACH_ITEM_REACTIVE = 1;
  const EACH_INDEX_REACTIVE = 1 << 1;
  const EACH_KEYED = 1 << 2;
  const EACH_IS_CONTROLLED = 1 << 3;
  const EACH_IS_ANIMATED = 1 << 4;
  const EACH_IS_STRICT_EQUALS = 1 << 6;
  const PROPS_IS_IMMUTABLE = 1;
  const PROPS_IS_RUNES = 1 << 1;
  const PROPS_IS_UPDATED = 1 << 2;
  const PROPS_IS_LAZY_INITIAL = 1 << 3;
  const TEMPLATE_FRAGMENT = 1;
  const TEMPLATE_USE_IMPORT_NODE = 1 << 1;
  const UNINITIALIZED = Symbol();
  const PassiveDelegatedEvents = ["touchstart", "touchmove", "touchend"];
  var is_array = Array.isArray;
  var array_from = Array.from;
  var is_frozen = Object.isFrozen;
  var define_property = Object.defineProperty;
  var get_descriptor = Object.getOwnPropertyDescriptor;
  var get_descriptors = Object.getOwnPropertyDescriptors;
  var get_prototype_of = Object.getPrototypeOf;
  function is_function(thing) {
    return typeof thing === "function";
  }
  const DERIVED = 1 << 1;
  const EFFECT = 1 << 2;
  const RENDER_EFFECT = 1 << 3;
  const BLOCK_EFFECT = 1 << 4;
  const BRANCH_EFFECT = 1 << 5;
  const ROOT_EFFECT = 1 << 6;
  const UNOWNED = 1 << 7;
  const DISCONNECTED = 1 << 8;
  const CLEAN = 1 << 9;
  const DIRTY = 1 << 10;
  const MAYBE_DIRTY = 1 << 11;
  const INERT = 1 << 12;
  const DESTROYED = 1 << 13;
  const EFFECT_RAN = 1 << 14;
  const EFFECT_TRANSPARENT = 1 << 15;
  const LEGACY_DERIVED_PROP = 1 << 16;
  const STATE_SYMBOL = Symbol("$state");
  const LOADING_ATTR_SYMBOL = Symbol("");
  function equals(value) {
    return value === this.v;
  }
  function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || a !== null && typeof a === "object" || typeof a === "function";
  }
  function safe_equals(value) {
    return !safe_not_equal(value, this.v);
  }
  function effect_in_teardown(rune) {
    {
      throw new Error("effect_in_teardown");
    }
  }
  function effect_in_unowned_derived() {
    {
      throw new Error("effect_in_unowned_derived");
    }
  }
  function effect_orphan(rune) {
    {
      throw new Error("effect_orphan");
    }
  }
  function effect_update_depth_exceeded() {
    {
      throw new Error("effect_update_depth_exceeded");
    }
  }
  function props_invalid_value(key) {
    {
      throw new Error("props_invalid_value");
    }
  }
  function state_unsafe_mutation() {
    {
      throw new Error("state_unsafe_mutation");
    }
  }
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
  // @__NO_SIDE_EFFECTS__
  function mutable_source(initial_value) {
    var _a;
    const s = /* @__PURE__ */ source(initial_value);
    s.equals = safe_equals;
    if (current_component_context !== null && current_component_context.l !== null) {
      ((_a = current_component_context.l).s ?? (_a.s = [])).push(s);
    }
    return s;
  }
  function mutate(source2, value) {
    set(
      source2,
      untrack(() => get(source2))
    );
    return value;
  }
  function set(signal, value) {
    var initialized = signal.v !== UNINITIALIZED;
    if (!current_untracking && initialized && current_reaction !== null && is_runes() && (current_reaction.f & DERIVED) !== 0) {
      state_unsafe_mutation();
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
  const noop = () => {
  };
  function is_promise(value) {
    return typeof (value == null ? void 0 : value.then) === "function";
  }
  function run(fn) {
    return fn();
  }
  function run_all(arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i]();
    }
  }
  let is_micro_task_queued$1 = false;
  let current_queued_micro_tasks = [];
  function process_micro_tasks() {
    is_micro_task_queued$1 = false;
    const tasks = current_queued_micro_tasks.slice();
    current_queued_micro_tasks = [];
    run_all(tasks);
  }
  function queue_micro_task(fn) {
    if (!is_micro_task_queued$1) {
      is_micro_task_queued$1 = true;
      queueMicrotask(process_micro_tasks);
    }
    current_queued_micro_tasks.push(fn);
  }
  function flush_tasks() {
    if (is_micro_task_queued$1) {
      process_micro_tasks();
    }
  }
  // @__NO_SIDE_EFFECTS__
  function derived(fn) {
    let flags = DERIVED | DIRTY;
    if (current_effect === null) flags |= UNOWNED;
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
  // @__NO_SIDE_EFFECTS__
  function derived_safe_equal(fn) {
    const signal = /* @__PURE__ */ derived(fn);
    signal.equals = safe_equals;
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
    var is_equal = derived2.equals(value);
    if (!is_equal) {
      derived2.v = value;
      mark_reactions(derived2, DIRTY, force_schedule);
    }
    return is_equal;
  }
  function destroy_derived(signal) {
    destroy_derived_children(signal);
    remove_reactions(signal, 0);
    set_signal_status(signal, DESTROYED);
    signal.first = signal.last = signal.deps = signal.reactions = // @ts-expect-error `signal.fn` cannot be `null` while the signal is alive
    signal.fn = null;
  }
  function lifecycle_outside_component(name) {
    {
      throw new Error("lifecycle_outside_component");
    }
  }
  const FLUSH_MICROTASK = 0;
  const FLUSH_SYNC = 1;
  let current_scheduler_mode = FLUSH_MICROTASK;
  let is_micro_task_queued = false;
  let is_flushing_effect = false;
  let is_destroying_effect = false;
  function set_is_flushing_effect(value) {
    is_flushing_effect = value;
  }
  function set_is_destroying_effect(value) {
    is_destroying_effect = value;
  }
  function set_untracking(value) {
    current_untracking = value;
  }
  let current_queued_root_effects = [];
  let flush_count = 0;
  let current_reaction = null;
  function set_current_reaction(reaction) {
    current_reaction = reaction;
  }
  let current_effect = null;
  function set_current_effect(effect2) {
    current_effect = effect2;
  }
  let current_dependencies = null;
  let current_dependencies_index = 0;
  let current_untracked_writes = null;
  function set_current_untracked_writes(value) {
    current_untracked_writes = value;
  }
  let current_untracking = false;
  let current_skip_reaction = false;
  let current_component_context = null;
  function set_current_component_context(context) {
    current_component_context = context;
  }
  function is_runes() {
    return current_component_context !== null && current_component_context.l === null;
  }
  function check_dirtiness(reaction) {
    var _a;
    var flags = reaction.f;
    var is_dirty = (flags & DIRTY) !== 0;
    var is_unowned = (flags & UNOWNED) !== 0;
    if (is_dirty && !is_unowned) {
      return true;
    }
    var is_disconnected = (flags & DISCONNECTED) !== 0;
    if ((flags & MAYBE_DIRTY) !== 0 || is_dirty && is_unowned) {
      var dependencies = reaction.deps;
      if (dependencies !== null) {
        var length = dependencies.length;
        var is_equal;
        var reactions;
        for (var i = 0; i < length; i++) {
          var dependency = dependencies[i];
          if (!is_dirty && check_dirtiness(
            /** @type {import('#client').Derived} */
            dependency
          )) {
            is_equal = update_derived(
              /** @type {import('#client').Derived} **/
              dependency,
              true
            );
          }
          var version = dependency.version;
          if (is_unowned) {
            if (version > /** @type {import('#client').Derived} */
            reaction.version) {
              reaction.version = version;
              return !is_equal;
            }
            if (!current_skip_reaction && !((_a = dependency == null ? void 0 : dependency.reactions) == null ? void 0 : _a.includes(reaction))) {
              reactions = dependency.reactions;
              if (reactions === null) {
                dependency.reactions = [reaction];
              } else {
                reactions.push(reaction);
              }
            }
          } else if ((reaction.f & DIRTY) !== 0) {
            return true;
          } else if (is_disconnected) {
            if (version > /** @type {import('#client').Derived} */
            reaction.version) {
              reaction.version = version;
              is_dirty = true;
            }
            reactions = dependency.reactions;
            if (reactions === null) {
              dependency.reactions = [reaction];
            } else if (!reactions.includes(reaction)) {
              reactions.push(reaction);
            }
          }
        }
      }
      if (!is_unowned) {
        set_signal_status(reaction, CLEAN);
      }
      if (is_disconnected) {
        reaction.f ^= DISCONNECTED;
      }
    }
    return is_dirty;
  }
  function handle_error(error, effect2, component_context) {
    {
      throw error;
    }
  }
  function execute_reaction_fn(signal) {
    const previous_dependencies = current_dependencies;
    const previous_dependencies_index = current_dependencies_index;
    const previous_untracked_writes = current_untracked_writes;
    const previous_reaction = current_reaction;
    const previous_skip_reaction = current_skip_reaction;
    const previous_untracking = current_untracking;
    current_dependencies = /** @type {null | import('#client').Value[]} */
    null;
    current_dependencies_index = 0;
    current_untracked_writes = null;
    current_reaction = signal;
    current_skip_reaction = !is_flushing_effect && (signal.f & UNOWNED) !== 0;
    current_untracking = false;
    try {
      let res = (
        /** @type {Function} */
        (0, signal.fn)()
      );
      let dependencies = (
        /** @type {import('#client').Value<unknown>[]} **/
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
          signal.deps = /** @type {import('#client').Value<V>[]} **/
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
    if (reactions_length === 0 && (dependency.f & DERIVED) !== 0) {
      set_signal_status(dependency, MAYBE_DIRTY);
      if ((dependency.f & (UNOWNED | DISCONNECTED)) === 0) {
        dependency.f ^= DISCONNECTED;
      }
      remove_reactions(
        /** @type {import('#client').Derived} **/
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
  function destroy_effect_children(signal, remove_dom = true) {
    let effect2 = signal.first;
    signal.first = null;
    signal.last = null;
    var sibling2;
    while (effect2 !== null) {
      sibling2 = effect2.next;
      destroy_effect(effect2, remove_dom);
      effect2 = sibling2;
    }
  }
  function execute_effect(effect2) {
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
      execute_effect_teardown(effect2);
      var teardown2 = execute_reaction_fn(effect2);
      effect2.teardown = typeof teardown2 === "function" ? teardown2 : null;
    } catch (error) {
      handle_error(
        /** @type {Error} */
        error
      );
    } finally {
      current_effect = previous_effect;
      current_component_context = previous_component_context;
    }
  }
  function infinite_loop_guard() {
    if (flush_count > 1e3) {
      flush_count = 0;
      effect_update_depth_exceeded();
    }
    flush_count++;
  }
  function flush_queued_root_effects(root_effects) {
    var length = root_effects.length;
    if (length === 0) {
      return;
    }
    infinite_loop_guard();
    var previously_flushing_effect = is_flushing_effect;
    is_flushing_effect = true;
    try {
      for (var i = 0; i < length; i++) {
        var effect2 = root_effects[i];
        if (effect2.first === null && (effect2.f & BRANCH_EFFECT) === 0) {
          flush_queued_effects([effect2]);
        } else {
          var collected_effects = [];
          process_effects(effect2, collected_effects);
          flush_queued_effects(collected_effects);
        }
      }
    } finally {
      is_flushing_effect = previously_flushing_effect;
    }
  }
  function flush_queued_effects(effects) {
    var length = effects.length;
    if (length === 0) return;
    for (var i = 0; i < length; i++) {
      var effect2 = effects[i];
      if ((effect2.f & (DESTROYED | INERT)) === 0 && check_dirtiness(effect2)) {
        execute_effect(effect2);
        if (effect2.deps === null && effect2.first === null && effect2.dom === null) {
          if (effect2.teardown === null) {
            unlink_effect(effect2);
          } else {
            effect2.fn = null;
          }
        }
      }
    }
  }
  function process_deferred() {
    is_micro_task_queued = false;
    if (flush_count > 1001) {
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
        queueMicrotask(process_deferred);
      }
    }
    var effect2 = signal;
    while (effect2.parent !== null) {
      effect2 = effect2.parent;
      var flags = effect2.f;
      if ((flags & BRANCH_EFFECT) !== 0) {
        if ((flags & CLEAN) === 0) return;
        set_signal_status(effect2, MAYBE_DIRTY);
      }
    }
    current_queued_root_effects.push(effect2);
  }
  function process_effects(effect2, collected_effects) {
    var current_effect2 = effect2.first;
    var effects = [];
    main_loop: while (current_effect2 !== null) {
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
          if (!is_branch && check_dirtiness(current_effect2)) {
            execute_effect(current_effect2);
            child2 = current_effect2.first;
          }
          if (child2 !== null) {
            current_effect2 = child2;
            continue;
          }
        } else if ((flags & EFFECT) !== 0) {
          if (is_branch || is_clean) {
            if (child2 !== null) {
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
    for (var i = 0; i < effects.length; i++) {
      child2 = effects[i];
      collected_effects.push(child2);
      process_effects(child2, collected_effects);
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
      is_micro_task_queued = false;
      if (flush_previous) {
        flush_queued_root_effects(previous_queued_root_effects);
      }
      var result = fn == null ? void 0 : fn();
      flush_tasks();
      if (current_queued_root_effects.length > 0 || root_effects.length > 0) {
        flush_sync();
      }
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
        } else if (current_dependencies[current_dependencies.length - 1] !== signal) {
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
          /** @type {import('#client').Derived} **/
          signal,
          false
        );
      }
    }
    return signal.v;
  }
  function mark_reactions(signal, to_status, force_schedule) {
    var reactions = signal.reactions;
    if (reactions === null) return;
    var runes = is_runes();
    var length = reactions.length;
    for (var i = 0; i < length; i++) {
      var reaction = reactions[i];
      var flags = reaction.f;
      if ((flags & DIRTY) !== 0 || (!force_schedule || !runes) && reaction === current_effect) {
        continue;
      }
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
  function untrack(fn) {
    const previous_untracking = current_untracking;
    try {
      current_untracking = true;
      return fn();
    } finally {
      current_untracking = previous_untracking;
    }
  }
  const STATUS_MASK = ~(DIRTY | MAYBE_DIRTY | CLEAN);
  function set_signal_status(signal, status) {
    signal.f = signal.f & STATUS_MASK | status;
  }
  function push(props, runes = false, fn) {
    current_component_context = {
      p: current_component_context,
      c: null,
      e: null,
      m: false,
      s: props,
      x: null,
      l: null
    };
    if (!runes) {
      current_component_context.l = {
        s: null,
        u: null,
        r1: [],
        r2: /* @__PURE__ */ source(false)
      };
    }
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
        for (var i = 0; i < effects.length; i++) {
          effect(effects[i]);
        }
      }
      current_component_context = context_stack_item.p;
      context_stack_item.m = true;
    }
    return component || /** @type {T} */
    {};
  }
  function deep_read_state(value) {
    if (typeof value !== "object" || !value || value instanceof EventTarget) {
      return;
    }
    if (STATE_SYMBOL in value) {
      deep_read(value);
    } else if (!Array.isArray(value)) {
      for (let key in value) {
        const prop2 = value[key];
        if (typeof prop2 === "object" && prop2 && STATE_SYMBOL in prop2) {
          deep_read(prop2);
        }
      }
    }
  }
  function deep_read(value, visited = /* @__PURE__ */ new Set()) {
    if (typeof value === "object" && value !== null && // We don't want to traverse DOM elements
    !(value instanceof EventTarget) && !visited.has(value)) {
      visited.add(value);
      if (value instanceof Date) {
        value.getTime();
      }
      for (let key in value) {
        try {
          deep_read(value[key], visited);
        } catch (e) {
        }
      }
      const proto = get_prototype_of(value);
      if (proto !== Object.prototype && proto !== Array.prototype && proto !== Map.prototype && proto !== Set.prototype && proto !== Date.prototype) {
        const descriptors = get_descriptors(proto);
        for (let key in descriptors) {
          const get2 = descriptors[key].get;
          if (get2) {
            try {
              get2.call(value);
            } catch (e) {
            }
          }
        }
      }
    }
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
  function validate_effect(rune) {
    if (current_effect === null && current_reaction === null) {
      effect_orphan();
    }
    if (is_destroying_effect) {
      effect_in_teardown();
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
    if (sync) {
      var previously_flushing_effect = is_flushing_effect;
      try {
        set_is_flushing_effect(true);
        execute_effect(effect2);
        effect2.f |= EFFECT_RAN;
      } finally {
        set_is_flushing_effect(previously_flushing_effect);
      }
    } else if (fn !== null) {
      schedule_effect(effect2);
    }
    var inert = sync && effect2.deps === null && effect2.first === null && effect2.dom === null && effect2.teardown === null;
    if (!inert && current_reaction !== null && !is_root) {
      var flags = current_reaction.f;
      if ((flags & DERIVED) !== 0) {
        if ((flags & UNOWNED) !== 0) {
          effect_in_unowned_derived();
        }
        if (current_effect !== null) {
          push_effect(effect2, current_effect);
        }
      }
      push_effect(effect2, current_reaction);
    }
    return effect2;
  }
  function teardown(fn) {
    const effect2 = create_effect(RENDER_EFFECT, null, false);
    set_signal_status(effect2, CLEAN);
    effect2.teardown = fn;
    return effect2;
  }
  function user_effect(fn) {
    validate_effect();
    var defer = current_effect !== null && (current_effect.f & RENDER_EFFECT) !== 0 && // TODO do we actually need this? removing them changes nothing
    current_component_context !== null && !current_component_context.m;
    if (defer) {
      var context = (
        /** @type {import('#client').ComponentContext} */
        current_component_context
      );
      (context.e ?? (context.e = [])).push(fn);
    } else {
      var signal = effect(fn);
      return signal;
    }
  }
  function user_pre_effect(fn) {
    validate_effect();
    return render_effect(fn);
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
  function legacy_pre_effect(deps, fn) {
    var context = (
      /** @type {import('#client').ComponentContextLegacy} */
      current_component_context
    );
    var token = { effect: null, ran: false };
    context.l.r1.push(token);
    token.effect = render_effect(() => {
      deps();
      if (token.ran) return;
      token.ran = true;
      set(context.l.r2, true);
      untrack(fn);
    });
  }
  function legacy_pre_effect_reset() {
    var context = (
      /** @type {import('#client').ComponentContextLegacy} */
      current_component_context
    );
    render_effect(() => {
      if (!get(context.l.r2)) return;
      for (var token of context.l.r1) {
        var effect2 = token.effect;
        if (check_dirtiness(effect2)) {
          execute_effect(effect2);
        }
        token.ran = false;
      }
      context.l.r2.v = false;
    });
  }
  function render_effect(fn) {
    return create_effect(RENDER_EFFECT, fn, true);
  }
  function template_effect(fn) {
    return render_effect(fn);
  }
  function block(fn, flags = 0) {
    return create_effect(RENDER_EFFECT | BLOCK_EFFECT | flags, fn, true);
  }
  function branch(fn) {
    return create_effect(RENDER_EFFECT | BRANCH_EFFECT, fn, true);
  }
  function execute_effect_teardown(effect2) {
    var teardown2 = effect2.teardown;
    if (teardown2 !== null) {
      const previously_destroying_effect = is_destroying_effect;
      const previous_untracking = current_untracking;
      set_is_destroying_effect(true);
      set_untracking(true);
      try {
        teardown2.call(null);
      } finally {
        set_is_destroying_effect(previously_destroying_effect);
        set_untracking(previous_untracking);
      }
    }
  }
  function destroy_effect(effect2, remove_dom = true) {
    var dom = effect2.dom;
    if (dom !== null && remove_dom) {
      remove(dom);
    }
    destroy_effect_children(effect2, remove_dom);
    remove_reactions(effect2, 0);
    set_signal_status(effect2, DESTROYED);
    if (effect2.transitions) {
      for (const transition of effect2.transitions) {
        transition.stop();
      }
    }
    execute_effect_teardown(effect2);
    var parent = effect2.parent;
    if (parent !== null && (effect2.f & BRANCH_EFFECT) !== 0 && parent.first !== null) {
      unlink_effect(effect2);
    }
    effect2.next = effect2.prev = effect2.teardown = effect2.ctx = effect2.dom = effect2.deps = effect2.parent = effect2.fn = null;
  }
  function unlink_effect(effect2) {
    var parent = effect2.parent;
    var prev = effect2.prev;
    var next = effect2.next;
    if (prev !== null) prev.next = next;
    if (next !== null) next.prev = prev;
    if (parent !== null) {
      if (parent.first === effect2) parent.first = next;
      if (parent.last === effect2) parent.last = prev;
    }
  }
  function pause_effect(effect2, callback) {
    var transitions = [];
    pause_children(effect2, transitions, true);
    run_out_transitions(transitions, () => {
      destroy_effect(effect2);
      if (callback) callback();
    });
  }
  function run_out_transitions(transitions, fn) {
    var remaining = transitions.length;
    if (remaining > 0) {
      var check = () => --remaining || fn();
      for (var transition of transitions) {
        transition.out(check);
      }
    } else {
      fn();
    }
  }
  function pause_children(effect2, transitions, local) {
    if ((effect2.f & INERT) !== 0) return;
    effect2.f ^= INERT;
    if (effect2.transitions !== null) {
      for (const transition of effect2.transitions) {
        if (transition.is_global || local) {
          transitions.push(transition);
        }
      }
    }
    var child2 = effect2.first;
    while (child2 !== null) {
      var sibling2 = child2.next;
      var transparent = (child2.f & EFFECT_TRANSPARENT) !== 0 || (child2.f & BRANCH_EFFECT) !== 0;
      pause_children(child2, transitions, transparent ? local : false);
      child2 = sibling2;
    }
  }
  function resume_effect(effect2) {
    resume_children(effect2, true);
  }
  function resume_children(effect2, local) {
    if ((effect2.f & INERT) === 0) return;
    effect2.f ^= INERT;
    if (check_dirtiness(effect2)) {
      execute_effect(effect2);
    }
    var child2 = effect2.first;
    while (child2 !== null) {
      var sibling2 = child2.next;
      var transparent = (child2.f & EFFECT_TRANSPARENT) !== 0 || (child2.f & BRANCH_EFFECT) !== 0;
      resume_children(child2, transparent ? local : false);
      child2 = sibling2;
    }
    if (effect2.transitions !== null) {
      for (const transition of effect2.transitions) {
        if (transition.is_global || local) {
          transition.in();
        }
      }
    }
  }
  var $window;
  function init_operations() {
    if ($window !== void 0) {
      return;
    }
    $window = window;
    var element_prototype = Element.prototype;
    element_prototype.__click = void 0;
    element_prototype.__className = "";
    element_prototype.__attributes = null;
    element_prototype.__e = void 0;
    Text.prototype.__t = void 0;
  }
  function empty() {
    return document.createTextNode("");
  }
  // @__NO_SIDE_EFFECTS__
  function child(node) {
    const child2 = node.firstChild;
    return child2;
  }
  // @__NO_SIDE_EFFECTS__
  function first_child(fragment, is_text) {
    {
      return (
        /** @type {DocumentFragment} */
        fragment.firstChild
      );
    }
  }
  // @__NO_SIDE_EFFECTS__
  function sibling(node, is_text = false) {
    var next_sibling = (
      /** @type {import('#client').TemplateNode} */
      node.nextSibling
    );
    {
      return next_sibling;
    }
  }
  function clear_text_content(node) {
    node.textContent = "";
  }
  // @__NO_SIDE_EFFECTS__
  function create_element(name) {
    return document.createElement(name);
  }
  function create_event(event_name, dom, handler, options) {
    function target_handler(event2) {
      if (!options.capture) {
        handle_event_propagation(dom, event2);
      }
      if (!event2.cancelBubble) {
        return handler.call(this, event2);
      }
    }
    if (event_name.startsWith("pointer") || event_name === "wheel") {
      queue_micro_task(() => {
        dom.addEventListener(event_name, target_handler, options);
      });
    } else {
      dom.addEventListener(event_name, target_handler, options);
    }
    return target_handler;
  }
  function event(event_name, dom, handler, capture, passive) {
    var options = { capture, passive };
    var target_handler = create_event(event_name, dom, handler, options);
    if (dom === document.body || dom === window || dom === document) {
      teardown(() => {
        dom.removeEventListener(event_name, target_handler, options);
      });
    }
  }
  function handle_event_propagation(handler_element, event2) {
    var _a;
    var owner_document = handler_element.ownerDocument;
    var event_name = event2.type;
    var path = ((_a = event2.composedPath) == null ? void 0 : _a.call(event2)) || [];
    var current_target = (
      /** @type {null | Element} */
      path[0] || event2.target
    );
    var path_idx = 0;
    var handled_at = event2.__root;
    if (handled_at) {
      var at_idx = path.indexOf(handled_at);
      if (at_idx !== -1 && (handler_element === document || handler_element === /** @type {any} */
      window)) {
        event2.__root = handler_element;
        return;
      }
      var handler_idx = path.indexOf(handler_element);
      if (handler_idx === -1) {
        return;
      }
      if (at_idx <= handler_idx) {
        path_idx = at_idx;
      }
    }
    current_target = /** @type {Element} */
    path[path_idx] || event2.target;
    if (current_target === handler_element) return;
    define_property(event2, "currentTarget", {
      configurable: true,
      get() {
        return current_target || owner_document;
      }
    });
    try {
      var throw_error;
      var other_errors = [];
      while (current_target !== null) {
        var parent_element = current_target.parentNode || /** @type {any} */
        current_target.host || null;
        try {
          var delegated = current_target["__" + event_name];
          if (delegated !== void 0 && !/** @type {any} */
          current_target.disabled) {
            if (is_array(delegated)) {
              var [fn, ...data] = delegated;
              fn.apply(current_target, [event2, ...data]);
            } else {
              delegated.call(current_target, event2);
            }
          }
        } catch (error) {
          if (throw_error) {
            other_errors.push(error);
          } else {
            throw_error = error;
          }
        }
        if (event2.cancelBubble || parent_element === handler_element || parent_element === null) {
          break;
        }
        current_target = parent_element;
      }
      if (throw_error) {
        for (let error of other_errors) {
          queueMicrotask(() => {
            throw error;
          });
        }
        throw throw_error;
      }
    } finally {
      event2.__root = handler_element;
      current_target = handler_element;
    }
  }
  const all_registered_events = /* @__PURE__ */ new Set();
  const root_event_handles = /* @__PURE__ */ new Set();
  function set_text(text, value) {
    const prev = text.__t ?? (text.__t = text.nodeValue);
    if (prev !== value) {
      text.nodeValue = text.__t = value;
    }
  }
  function mount(component, options) {
    const anchor = options.anchor ?? options.target.appendChild(empty());
    return flush_sync(() => _mount(component, { ...options, anchor }), false);
  }
  function _mount(Component, { target, anchor, props = {}, events, context, intro = false }) {
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
        mounted_components.delete(component);
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
      const target2 = (
        /** @type {Document} */
        append_styles_to.head || append_styles_to
      );
      target2.appendChild(style);
    }
  }
  function get_root_for_style(node) {
    if (!node) return document;
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
  function await_block(anchor, get_input, pending_fn, then_fn, catch_fn) {
    const component_context = current_component_context;
    let input;
    let pending_effect;
    let then_effect;
    let catch_effect;
    function create_effect2(fn, value) {
      set_current_effect(effect2);
      set_current_reaction(effect2);
      set_current_component_context(component_context);
      var e = branch(() => fn(anchor, value));
      set_current_component_context(null);
      set_current_reaction(null);
      set_current_effect(null);
      flush_sync();
      return e;
    }
    const effect2 = block(() => {
      if (input === (input = get_input())) return;
      if (is_promise(input)) {
        const promise = (
          /** @type {Promise<any>} */
          input
        );
        if (pending_fn) {
          if (pending_effect && (pending_effect.f & INERT) === 0) {
            destroy_effect(pending_effect);
          }
          pending_effect = branch(() => pending_fn(anchor));
        }
        if (then_effect) pause_effect(then_effect);
        if (catch_effect) pause_effect(catch_effect);
        promise.then(
          (value) => {
            if (promise !== input) return;
            if (pending_effect) pause_effect(pending_effect);
            if (then_fn) {
              then_effect = create_effect2(then_fn, value);
            }
          },
          (error) => {
            if (promise !== input) return;
            if (pending_effect) pause_effect(pending_effect);
            if (catch_fn) {
              catch_effect = create_effect2(catch_fn, error);
            }
          }
        );
      } else {
        if (pending_effect) pause_effect(pending_effect);
        if (catch_effect) pause_effect(catch_effect);
        if (then_fn) {
          if (then_effect) {
            destroy_effect(then_effect);
          }
          then_effect = branch(() => then_fn(anchor, input));
        }
      }
      return noop;
    });
  }
  function if_block(anchor, get_condition, consequent_fn, alternate_fn = null, elseif = false) {
    var consequent_effect = null;
    var alternate_effect = null;
    var condition = null;
    var flags = elseif ? EFFECT_TRANSPARENT : 0;
    block(() => {
      if (condition === (condition = !!get_condition())) return;
      if (condition) {
        if (consequent_effect) {
          resume_effect(consequent_effect);
        } else {
          consequent_effect = branch(() => consequent_fn(anchor));
        }
        if (alternate_effect) {
          pause_effect(alternate_effect, () => {
            alternate_effect = null;
          });
        }
      } else {
        if (alternate_effect) {
          resume_effect(alternate_effect);
        } else if (alternate_fn) {
          alternate_effect = branch(() => alternate_fn(anchor));
        }
        if (consequent_effect) {
          pause_effect(consequent_effect, () => {
            consequent_effect = null;
          });
        }
      }
    }, flags);
  }
  let current_each_item = null;
  function pause_effects(items, controlled_anchor, items_map) {
    var transitions = [];
    var length = items.length;
    for (var i = 0; i < length; i++) {
      pause_children(items[i].e, transitions, true);
    }
    var is_controlled = length > 0 && transitions.length === 0 && controlled_anchor !== null;
    if (is_controlled) {
      var parent_node = (
        /** @type {Element} */
        /** @type {Element} */
        controlled_anchor.parentNode
      );
      clear_text_content(parent_node);
      parent_node.append(
        /** @type {Element} */
        controlled_anchor
      );
      items_map.clear();
      link(items[0].prev, items[length - 1].next);
    }
    run_out_transitions(transitions, () => {
      for (var i2 = 0; i2 < length; i2++) {
        var item = items[i2];
        if (!is_controlled) {
          items_map.delete(item.k);
          item.o.remove();
          link(item.prev, item.next);
        }
        destroy_effect(item.e, !is_controlled);
      }
    });
  }
  function each(anchor, flags, get_collection, get_key, render_fn, fallback_fn = null) {
    var state = { flags, items: /* @__PURE__ */ new Map(), next: null };
    var is_controlled = (flags & EACH_IS_CONTROLLED) !== 0;
    if (is_controlled) {
      var parent_node = (
        /** @type {Element} */
        anchor
      );
      anchor = parent_node.appendChild(empty());
    }
    var fallback = null;
    block(() => {
      var collection = get_collection();
      var array = is_array(collection) ? collection : collection == null ? [] : Array.from(collection);
      var length = array.length;
      var flags2 = state.flags;
      if ((flags2 & EACH_IS_STRICT_EQUALS) !== 0 && !is_frozen(array) && !(STATE_SYMBOL in array)) {
        flags2 ^= EACH_IS_STRICT_EQUALS;
        if ((flags2 & EACH_KEYED) !== 0 && (flags2 & EACH_ITEM_REACTIVE) === 0) {
          flags2 ^= EACH_ITEM_REACTIVE;
        }
      }
      {
        reconcile(array, state, anchor, render_fn, flags2, get_key);
      }
      if (fallback_fn !== null) {
        if (length === 0) {
          if (fallback) {
            resume_effect(fallback);
          } else {
            fallback = branch(() => fallback_fn(anchor));
          }
        } else if (fallback !== null) {
          pause_effect(fallback, () => {
            fallback = null;
          });
        }
      }
    });
  }
  function reconcile(array, state, anchor, render_fn, flags, get_key) {
    var _a, _b, _c, _d;
    var is_animated = (flags & EACH_IS_ANIMATED) !== 0;
    var should_update = (flags & (EACH_ITEM_REACTIVE | EACH_INDEX_REACTIVE)) !== 0;
    var length = array.length;
    var items = state.items;
    var first = state.next;
    var current = first;
    var seen = /* @__PURE__ */ new Set();
    var prev = state;
    var to_animate = /* @__PURE__ */ new Set();
    var matched = [];
    var stashed = [];
    var value;
    var key;
    var item;
    var i;
    if (is_animated) {
      for (i = 0; i < length; i += 1) {
        value = array[i];
        key = get_key(value, i);
        item = items.get(key);
        if (item !== void 0) {
          (_a = item.a) == null ? void 0 : _a.measure();
          to_animate.add(item);
        }
      }
    }
    for (i = 0; i < length; i += 1) {
      value = array[i];
      key = get_key(value, i);
      item = items.get(key);
      if (item === void 0) {
        var child_open = empty();
        var child_anchor = current ? current.o : anchor;
        child_anchor.before(child_open);
        prev = create_item(
          child_open,
          child_anchor,
          prev,
          prev.next,
          value,
          key,
          i,
          render_fn,
          flags
        );
        items.set(key, prev);
        matched = [];
        stashed = [];
        current = prev.next;
        continue;
      }
      if (should_update) {
        update_item(item, value, i, flags);
      }
      if ((item.e.f & INERT) !== 0) {
        resume_effect(item.e);
        if (is_animated) {
          (_b = item.a) == null ? void 0 : _b.unfix();
          to_animate.delete(item);
        }
      }
      if (item !== current) {
        if (seen.has(item)) {
          if (matched.length < stashed.length) {
            var start = stashed[0];
            var j;
            prev = start.prev;
            var a = matched[0];
            var b = matched[matched.length - 1];
            for (j = 0; j < matched.length; j += 1) {
              move(matched[j], start, anchor);
            }
            for (j = 0; j < stashed.length; j += 1) {
              seen.delete(stashed[j]);
            }
            link(a.prev, b.next);
            link(prev, a);
            link(b, start);
            current = start;
            prev = b;
            i -= 1;
            matched = [];
            stashed = [];
          } else {
            seen.delete(item);
            move(item, current, anchor);
            link(item.prev, item.next);
            link(item, prev.next);
            link(prev, item);
            prev = item;
          }
          continue;
        }
        matched = [];
        stashed = [];
        while (current !== null && current.k !== key) {
          seen.add(current);
          stashed.push(current);
          current = current.next;
        }
        if (current === null) {
          continue;
        }
        item = current;
      }
      matched.push(item);
      prev = item;
      current = item.next;
    }
    const to_destroy = Array.from(seen);
    while (current !== null) {
      to_destroy.push(current);
      current = current.next;
    }
    var destroy_length = to_destroy.length;
    if (destroy_length > 0) {
      var controlled_anchor = (flags & EACH_IS_CONTROLLED) !== 0 && length === 0 ? anchor : null;
      if (is_animated) {
        for (i = 0; i < destroy_length; i += 1) {
          (_c = to_destroy[i].a) == null ? void 0 : _c.measure();
        }
        for (i = 0; i < destroy_length; i += 1) {
          (_d = to_destroy[i].a) == null ? void 0 : _d.fix();
        }
      }
      pause_effects(to_destroy, controlled_anchor, items);
    }
    if (is_animated) {
      queue_micro_task(() => {
        var _a2;
        for (item of to_animate) {
          (_a2 = item.a) == null ? void 0 : _a2.apply();
        }
      });
    }
  }
  function update_item(item, value, index, type) {
    if ((type & EACH_ITEM_REACTIVE) !== 0) {
      set(item.v, value);
    }
    if ((type & EACH_INDEX_REACTIVE) !== 0) {
      set(
        /** @type {import('#client').Value<number>} */
        item.i,
        index
      );
    } else {
      item.i = index;
    }
  }
  function create_item(open, anchor, prev, next, value, key, index, render_fn, flags) {
    var previous_each_item = current_each_item;
    try {
      var reactive = (flags & EACH_ITEM_REACTIVE) !== 0;
      var mutable = (flags & EACH_IS_STRICT_EQUALS) === 0;
      var v = reactive ? mutable ? /* @__PURE__ */ mutable_source(value) : /* @__PURE__ */ source(value) : value;
      var i = (flags & EACH_INDEX_REACTIVE) === 0 ? index : /* @__PURE__ */ source(index);
      var item = {
        i,
        v,
        k: key,
        a: null,
        // @ts-expect-error
        e: null,
        o: open,
        prev,
        next
      };
      prev.next = item;
      if (next !== null) next.prev = item;
      current_each_item = item;
      item.e = branch(() => render_fn(anchor, v, i));
      return item;
    } finally {
      current_each_item = previous_each_item;
    }
  }
  function move(item, next, anchor) {
    var end = item.next ? item.next.o : anchor;
    var dest = next ? next.o : anchor;
    var node = (
      /** @type {import('#client').TemplateNode} */
      item.o
    );
    while (node !== end) {
      var next_node = (
        /** @type {import('#client').TemplateNode} */
        node.nextSibling
      );
      dest.before(node);
      node = next_node;
    }
  }
  function link(prev, next) {
    prev.next = next;
    if (next !== null) next.prev = prev;
  }
  function push_template_node(dom, effect2 = (
    /** @type {import('#client').Effect} */
    current_effect
  )) {
    var current_dom = effect2.dom;
    if (current_dom === null) {
      effect2.dom = dom;
    } else {
      if (!is_array(current_dom)) {
        current_dom = effect2.dom = [current_dom];
      }
      if (is_array(dom)) {
        current_dom.push(...dom);
      } else {
        current_dom.push(dom);
      }
    }
    return dom;
  }
  // @__NO_SIDE_EFFECTS__
  function template(content, flags) {
    var is_fragment = (flags & TEMPLATE_FRAGMENT) !== 0;
    var use_import_node = (flags & TEMPLATE_USE_IMPORT_NODE) !== 0;
    var node;
    return () => {
      if (!node) {
        node = create_fragment_from_html(content);
        if (!is_fragment) node = /** @type {Node} */
        node.firstChild;
      }
      var clone = use_import_node ? document.importNode(node, true) : node.cloneNode(true);
      push_template_node(
        is_fragment ? (
          /** @type {import('#client').TemplateNode[]} */
          [...clone.childNodes]
        ) : (
          /** @type {import('#client').TemplateNode} */
          clone
        )
      );
      return clone;
    };
  }
  function comment() {
    var frag = document.createDocumentFragment();
    var anchor = empty();
    frag.append(anchor);
    push_template_node([anchor]);
    return frag;
  }
  function append(anchor, dom) {
    anchor.before(
      /** @type {Node} */
      dom
    );
  }
  function remove_from_parent_effect(effect2, to_remove) {
    const dom = effect2.dom;
    if (is_array(dom)) {
      for (let i = dom.length - 1; i >= 0; i--) {
        if (to_remove.includes(dom[i])) {
          dom.splice(i, 1);
          break;
        }
      }
    } else if (dom !== null && to_remove.includes(dom)) {
      effect2.dom = null;
    }
  }
  function html(anchor, get_value, svg, mathml) {
    const parent_effect = anchor.parentNode !== (current_effect == null ? void 0 : current_effect.dom) ? current_effect : null;
    let value = /* @__PURE__ */ derived(get_value);
    render_effect(() => {
      var dom = html_to_dom(anchor, parent_effect, get(value), svg, mathml);
      if (dom) {
        return () => {
          if (parent_effect !== null) {
            remove_from_parent_effect(parent_effect, is_array(dom) ? dom : [dom]);
          }
          remove(dom);
        };
      }
    });
  }
  function html_to_dom(target, effect2, value, svg, mathml) {
    var html2 = value + "";
    if (svg) html2 = `<svg>${html2}</svg>`;
    else if (mathml) html2 = `<math>${html2}</math>`;
    var node = create_fragment_from_html(html2);
    if (svg || mathml) {
      node = /** @type {Element} */
      node.firstChild;
    }
    if (node.childNodes.length === 1) {
      var child2 = (
        /** @type {Text | Element | Comment} */
        node.firstChild
      );
      target.before(child2);
      if (effect2 !== null) {
        push_template_node(child2, effect2);
      }
      return child2;
    }
    var nodes = (
      /** @type {Array<Text | Element | Comment>} */
      [...node.childNodes]
    );
    if (svg || mathml) {
      while (node.firstChild) {
        target.before(node.firstChild);
      }
    } else {
      target.before(node);
    }
    if (effect2 !== null) {
      push_template_node(nodes, effect2);
    }
    return nodes;
  }
  let listening_to_form_reset = false;
  function add_form_reset_listener() {
    if (!listening_to_form_reset) {
      listening_to_form_reset = true;
      document.addEventListener(
        "reset",
        (evt) => {
          Promise.resolve().then(() => {
            var _a;
            if (!evt.defaultPrevented) {
              for (
                const e of
                /**@type {HTMLFormElement} */
                evt.target.elements
              ) {
                (_a = e.__on_r) == null ? void 0 : _a.call(e);
              }
            }
          });
        },
        // In the capture phase to guarantee we get noticed of it (no possiblity of stopPropagation)
        { capture: true }
      );
    }
  }
  function remove_input_attr_defaults(dom) {
  }
  function set_attribute(element, attribute, value) {
    value = value == null ? null : value + "";
    var attributes = element.__attributes ?? (element.__attributes = {});
    if (attributes[attribute] === (attributes[attribute] = value)) return;
    if (attribute === "loading") {
      element[LOADING_ATTR_SYMBOL] = value;
    }
    if (value === null) {
      element.removeAttribute(attribute);
    } else {
      element.setAttribute(attribute, value);
    }
  }
  function listen_to_event_and_reset_event(element, event2, handler, on_reset = handler) {
    element.addEventListener(event2, handler);
    const prev = element.__on_r;
    if (prev) {
      element.__on_r = () => {
        prev();
        on_reset();
      };
    } else {
      element.__on_r = on_reset;
    }
    add_form_reset_listener();
  }
  function bind_value(input, get_value, update) {
    listen_to_event_and_reset_event(input, "input", () => {
      update(is_numberlike_input(input) ? to_number(input.value) : input.value);
    });
    render_effect(() => {
      var value = get_value();
      if (is_numberlike_input(input) && value === to_number(input.value)) {
        return;
      }
      if (input.type === "date" && !value && !input.value) {
        return;
      }
      input.value = value ?? "";
    });
  }
  function bind_checked(input, get_value, update) {
    listen_to_event_and_reset_event(input, "change", () => {
      var value = input.checked;
      update(value);
    });
    if (get_value() == void 0) {
      update(false);
    }
    render_effect(() => {
      var value = get_value();
      input.checked = Boolean(value);
    });
  }
  function is_numberlike_input(input) {
    var type = input.type;
    return type === "number" || type === "range";
  }
  function to_number(value) {
    return value === "" ? null : +value;
  }
  function init() {
    const context = (
      /** @type {import('#client').ComponentContextLegacy} */
      current_component_context
    );
    const callbacks = context.l.u;
    if (!callbacks) return;
    if (callbacks.b.length) {
      user_pre_effect(() => {
        observe_all(context);
        run_all(callbacks.b);
      });
    }
    user_effect(() => {
      const fns = untrack(() => callbacks.m.map(run));
      return () => {
        for (const fn of fns) {
          if (typeof fn === "function") {
            fn();
          }
        }
      };
    });
    if (callbacks.a.length) {
      user_effect(() => {
        observe_all(context);
        run_all(callbacks.a);
      });
    }
  }
  function observe_all(context) {
    if (context.l.s) {
      for (const signal of context.l.s) get(signal);
    }
    deep_read_state(context.s);
  }
  function bubble_event($$props, event2) {
    var _a;
    var events = (
      /** @type {Record<string, Function[] | Function>} */
      (_a = $$props.$$events) == null ? void 0 : _a[event2.type]
    );
    var callbacks = is_array(events) ? events.slice() : events == null ? [] : [events];
    for (var fn of callbacks) {
      fn.call(this, event2);
    }
  }
  const rest_props_handler = {
    get(target, key) {
      if (target.exclude.includes(key)) return;
      return target.props[key];
    },
    set(target, key) {
      return false;
    },
    getOwnPropertyDescriptor(target, key) {
      if (target.exclude.includes(key)) return;
      if (key in target.props) {
        return {
          enumerable: true,
          configurable: true,
          value: target.props[key]
        };
      }
    },
    has(target, key) {
      if (target.exclude.includes(key)) return false;
      return key in target.props;
    },
    ownKeys(target) {
      return Reflect.ownKeys(target.props).filter((key) => !target.exclude.includes(key));
    }
  };
  function rest_props(props, exclude, name) {
    return new Proxy(
      { props, exclude },
      rest_props_handler
    );
  }
  const spread_props_handler = {
    get(target, key) {
      let i = target.props.length;
      while (i--) {
        let p = target.props[i];
        if (is_function(p)) p = p();
        if (typeof p === "object" && p !== null && key in p) return p[key];
      }
    },
    getOwnPropertyDescriptor(target, key) {
      let i = target.props.length;
      while (i--) {
        let p = target.props[i];
        if (is_function(p)) p = p();
        if (typeof p === "object" && p !== null && key in p) return get_descriptor(p, key);
      }
    },
    has(target, key) {
      for (let p of target.props) {
        if (is_function(p)) p = p();
        if (p != null && key in p) return true;
      }
      return false;
    },
    ownKeys(target) {
      const keys = [];
      for (let p of target.props) {
        if (is_function(p)) p = p();
        for (const key in p) {
          if (!keys.includes(key)) keys.push(key);
        }
      }
      return keys;
    }
  };
  function spread_props(...props) {
    return new Proxy({ props }, spread_props_handler);
  }
  function prop(props, key, flags, fallback) {
    var _a;
    var immutable = (flags & PROPS_IS_IMMUTABLE) !== 0;
    var runes = (flags & PROPS_IS_RUNES) !== 0;
    var lazy = (flags & PROPS_IS_LAZY_INITIAL) !== 0;
    var prop_value = (
      /** @type {V} */
      props[key]
    );
    var setter = (_a = get_descriptor(props, key)) == null ? void 0 : _a.set;
    var fallback_value = (
      /** @type {V} */
      fallback
    );
    var fallback_dirty = true;
    var get_fallback = () => {
      if (lazy && fallback_dirty) {
        fallback_dirty = false;
        fallback_value = untrack(
          /** @type {() => V} */
          fallback
        );
      }
      return fallback_value;
    };
    if (prop_value === void 0 && fallback !== void 0) {
      if (setter && runes) {
        props_invalid_value();
      }
      prop_value = get_fallback();
      if (setter) setter(prop_value);
    }
    var getter2;
    if (runes) {
      getter2 = () => {
        var value = (
          /** @type {V} */
          props[key]
        );
        if (value === void 0) return get_fallback();
        fallback_dirty = true;
        return value;
      };
    } else {
      var derived_getter = (immutable ? derived : derived_safe_equal)(
        () => (
          /** @type {V} */
          props[key]
        )
      );
      derived_getter.f |= LEGACY_DERIVED_PROP;
      getter2 = () => {
        var value = get(derived_getter);
        if (value !== void 0) fallback_value = /** @type {V} */
        void 0;
        return value === void 0 ? fallback_value : value;
      };
    }
    if ((flags & PROPS_IS_UPDATED) === 0) {
      return getter2;
    }
    if (setter) {
      return function(value) {
        if (arguments.length === 1) {
          setter(value);
          return value;
        } else {
          return getter2();
        }
      };
    }
    var from_child = false;
    var inner_current_value = /* @__PURE__ */ mutable_source(prop_value);
    var current_value = /* @__PURE__ */ derived(() => {
      var parent_value = getter2();
      var child_value = get(inner_current_value);
      if (from_child) {
        from_child = false;
        return child_value;
      }
      return inner_current_value.v = parent_value;
    });
    if (!immutable) current_value.equals = safe_equals;
    return function(value) {
      var current = get(current_value);
      if (arguments.length > 0) {
        if (!current_value.equals(value)) {
          from_child = true;
          set(inner_current_value, value);
          get(current_value);
          current_value.version++;
        }
        return value;
      }
      return current;
    };
  }
  function create_custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
    return new CustomEvent(type, { detail, bubbles, cancelable });
  }
  function createEventDispatcher() {
    const component_context = current_component_context;
    if (component_context === null) {
      lifecycle_outside_component();
    }
    return (type, detail, options) => {
      var _a;
      const events = (
        /** @type {Record<string, Function | Function[]>} */
        (_a = component_context.s.$$events) == null ? void 0 : _a[
          /** @type {any} */
          type
        ]
      );
      if (events) {
        const callbacks = is_array(events) ? events.slice() : [events];
        const event2 = create_custom_event(
          /** @type {string} */
          type,
          detail,
          options
        );
        for (const fn of callbacks) {
          fn.call(component_context.x, event2);
        }
        return !event2.defaultPrevented;
      }
      return true;
    };
  }
  const getter = (value) => {
    return () => value;
  };
  const set_getter = (object, key, get2) => {
    Object.defineProperty(object, key, { get: get2 });
  };
  const set_property = (object, key, value) => {
    object[key] = value;
  };
  const svelte = {
    getter,
    set_getter,
    set_property,
    await_block,
    each,
    html,
    if_block,
    remove_input_attr_defaults,
    set_attribute,
    bind_value,
    bind_checked,
    event,
    init,
    bubble_event,
    first_child,
    child,
    sibling,
    template,
    comment,
    append,
    derived,
    user_effect,
    legacy_pre_effect,
    legacy_pre_effect_reset,
    template_effect,
    rest_props,
    spread_props,
    prop,
    source,
    mutable_source,
    mutate,
    set,
    set_text,
    append_styles,
    get,
    push,
    pop,
    createEventDispatcher,
    mount,
    unmount
  };
  return svelte;
});
//# sourceMappingURL=svelte.js.map
