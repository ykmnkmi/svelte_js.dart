@JS(r'$$')
library;

import 'dart:js_interop';

import 'package:meta/meta.dart';

@optionalTypeArgs
extension type Signal(JSObject _) implements JSObject {}

@optionalTypeArgs
extension type Value<T>(JSObject _) implements Signal {}

extension type Reaction(JSObject _) implements Signal {}

@optionalTypeArgs
extension type Derived<T>(JSObject _) implements Value<T>, Reaction {}

extension type Effect(JSObject _) implements Reaction {}

@optionalTypeArgs
typedef Source<T> = Value<T>;

extension type Block(JSObject _) implements JSObject {}
