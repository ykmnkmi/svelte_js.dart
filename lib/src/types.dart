@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:meta/meta.dart';
import 'package:svelte_js/src/ref.dart';
import 'package:svelte_js/src/unsafe_cast.dart';
import 'package:web/web.dart';

extension type Template(JSFunction _) implements JSFunction {}

extension type Fragment(JSFunction _) implements JSFunction {}

extension type Block(JSObject _) implements JSObject {
  @JS('p')
  external JSObject? _parent;

  Block? get parent {
    return unsafeCast<Block?>(_parent);
  }

  set parent(Block? parent) {
    _parent = unsafeCast<JSObject?>(parent);
  }
}

@optionalTypeArgs
extension type Signal<T extends Object?>(JSObject _) implements JSObject {
  @JS('f')
  external JSNumber _flags;

  int get flags {
    return _flags.toDartInt;
  }

  set flags(int flags) {
    _flags = flags.toJS;
  }
}

@optionalTypeArgs
extension type Value<T extends Object?>(JSObject _) implements Signal<T> {
  @JS('v')
  external ExternalDartReference? _value;

  T get value {
    return unref<T>(_value);
  }

  set value(T value) {
    _value = ref<T>(value);
  }

  @JS('version')
  external JSNumber _version;

  int get version {
    return _version.toDartInt;
  }

  set version(int version) {
    _version = version.toJS;
  }
}

extension type Reaction(JSObject _) implements Signal {}

extension type Effect(JSObject _) implements Reaction {
  @JS('v')
  external JSObject? _block;

  Block? get block {
    return unsafeCast<Block?>(_block);
  }

  set block(Block? block) {
    _block = block;
  }

  @JS('l')
  external JSNumber _depth;

  int get depth {
    return _depth.toDartInt;
  }

  set depth(int depth) {
    _depth = depth.toJS;
  }
}

@optionalTypeArgs
typedef Source<T extends Object?> = Value<T>;

@optionalTypeArgs
typedef Component<T extends JSObject> = void Function(
    Node anchor, T properties);

extension type ComponentReference(JSObject _) implements JSObject {}

@optionalTypeArgs
extension type TypedEvent<T extends Object?>(CustomEvent _) implements CustomEvent {
  T get detail {
    return unref<T>(unsafeCast<ExternalDartReference?>(_.detail));
  }
}
