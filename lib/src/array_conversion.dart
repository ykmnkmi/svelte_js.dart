import 'dart:js_interop';

import 'package:svelte_js/src/constants.dart';
import 'package:svelte_js/src/unsafe_cast.dart';

extension JSArrayLength on JSArray {
  external int get length;
}

extension JSArrayOfJSNumber on JSArray<JSNumber> {
  external num operator [](int index);

  external void operator []=(int index, num value);

  List<num> get toDart {
    // if (isJS) {
    //   return unsafeCast<List<num>>(this);
    // }

    num generator(int index) {
      return this[index];
    }

    return List<num>.generate(length, generator);
  }
}

extension JSListOfNum on List<num> {
  JSArray<JSNumber> get toJS {
    if (isJS) {
      return unsafeCast<JSArray<JSNumber>>(this);
    }

    var jsArray = JSArray<JSNumber>.withLength(length);

    for (var i = 0; i < length; i++) {
      jsArray[i] = this[i];
    }

    return jsArray;
  }
}

extension JSArrayOfJSString on JSArray<JSString> {
  external String operator [](int index);

  external void operator []=(int index, String value);

  List<String> get toDart {
    // if (isJS) {
    //   return unsafeCast<List<String>>(this);
    // }

    String generator(int index) {
      return this[index];
    }

    return List<String>.generate(length, generator);
  }
}

extension JSListOfString on List<String> {
  JSArray<JSString> get toJS {
    if (isJS) {
      return unsafeCast<JSArray<JSString>>(this);
    }

    var jsArray = JSArray<JSString>.withLength(length);

    for (var i = 0; i < length; i++) {
      jsArray[i] = this[i];
    }

    return jsArray;
  }
}
