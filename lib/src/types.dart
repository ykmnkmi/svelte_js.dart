@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:meta/meta.dart';
import 'package:web/web.dart';

@optionalTypeArgs
extension type Signal(JSObject _) implements JSObject {
  /// Flags bitmask
  @JS('f')
  external JSNumber flags;

  /// Write version
  external JSNumber version;
}

@optionalTypeArgs
extension type Value<T extends Object?>(JSObject _) implements Signal {
  /// Signals that read from this signal
  external JSArray<Reaction>? reactions;

  /// Equality function
  external JSFunction equals;

  /// The latest value for this signal
  @JS('v')
  external ExternalDartReference<T> value;
}

extension type Reaction(JSObject _) implements Signal {
  /// The associated component context
  @JS('ctx')
  external JSObject? context;

  /// The reaction function
  @JS('fn')
  external JSFunction? function;

  /// Signals that this signal reads from
  @JS('deps')
  external JSArray<Value>? dependencies;
}

@optionalTypeArgs
extension type Derived<T extends Object?>(JSObject _) implements Value<T>, Reaction {
  /// The derived function
  @JS('fn')
  external JSFunction function;

  /// Reactions created inside this signal
  external JSArray<Reaction>? children;

  /// Parent effect or derived
  external Reaction? parents;
}

extension type Effect(JSObject _) implements Reaction {
  /// {@template effect_nodes}
  /// Branch effects store their start/end nodes so that they can be
  /// removed when the effect is destroyed, or moved when an `each`
  /// block is reconciled. In the case of a single text/element node,
  /// `start` and `end` will be the same.
  /// {@endtemplate}
  @JS('nodes_start')
  external Node? nodesStart;

  /// {@macro effect_nodes}
  @JS('nodes_end')
  external Node? nodesEnd;

  /// Reactions created inside this signal
  external JSArray<Derived> deriveds;

  /// The effect function
  @JS('fn')
  external JSFunction? function;

  /// The teardown function returned from the effect function
  external JSFunction? teardown;

  /// Transition managers created with `$.transition`
  external JSArray<JSObject> transitions;

  /// Next sibling child effect created inside the parent signal
  @JS('prev')
  external Effect? previous;

  /// Next sibling child effect created inside the parent signal
  external Effect? next;

  /// First child effect created inside this signal
  external Effect? first;

  /// Last child effect created inside this signal
  external Effect? last;

  /// Parent effect
  external Effect? parent;

  /// Dev only
  @JS('component_function')
  external JSAny? componentFunction;
}

@optionalTypeArgs
typedef Source<T extends Object?> = Value<T>;

// extension type Block(JSObject _) implements JSObject {}
