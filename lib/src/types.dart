@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:meta/meta.dart';

@optionalTypeArgs
extension type Signal(JSObject _) implements JSObject {}

@optionalTypeArgs
extension type Value<T extends Object?>(JSObject _) implements Signal {}

extension type Reaction(JSObject _) implements Signal {}

@optionalTypeArgs
extension type Derived<T extends Object?>(JSObject _) implements Value<T>, Reaction {}

extension type Effect(JSObject _) implements Reaction {}

@optionalTypeArgs
typedef Source<T extends Object?> = Value<T>;

extension type Block(JSObject _) implements JSObject {}
