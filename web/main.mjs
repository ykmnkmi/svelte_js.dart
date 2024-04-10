let buildArgsList;

// `modulePromise` is a promise to the `WebAssembly.module` object to be
//   instantiated.
// `importObjectPromise` is a promise to an object that contains any additional
//   imports needed by the module that aren't provided by the standard runtime.
//   The fields on this object will be merged into the importObject with which
//   the module will be instantiated.
// This function returns a promise to the instantiated module.
export const instantiate = async (modulePromise, importObjectPromise) => {
    let dartInstance;

    function stringFromDartString(string) {
        const totalLength = dartInstance.exports.$stringLength(string);
        let result = '';
        let index = 0;
        while (index < totalLength) {
          let chunkLength = Math.min(totalLength - index, 0xFFFF);
          const array = new Array(chunkLength);
          for (let i = 0; i < chunkLength; i++) {
              array[i] = dartInstance.exports.$stringRead(string, index++);
          }
          result += String.fromCharCode(...array);
        }
        return result;
    }

    function stringToDartString(string) {
        const length = string.length;
        let range = 0;
        for (let i = 0; i < length; i++) {
            range |= string.codePointAt(i);
        }
        if (range < 256) {
            const dartString = dartInstance.exports.$stringAllocate1(length);
            for (let i = 0; i < length; i++) {
                dartInstance.exports.$stringWrite1(dartString, i, string.codePointAt(i));
            }
            return dartString;
        } else {
            const dartString = dartInstance.exports.$stringAllocate2(length);
            for (let i = 0; i < length; i++) {
                dartInstance.exports.$stringWrite2(dartString, i, string.charCodeAt(i));
            }
            return dartString;
        }
    }

    // Prints to the console
    function printToConsole(value) {
      if (typeof dartPrint == "function") {
        dartPrint(value);
        return;
      }
      if (typeof console == "object" && typeof console.log != "undefined") {
        console.log(value);
        return;
      }
      if (typeof print == "function") {
        print(value);
        return;
      }

      throw "Unable to print message: " + js;
    }

    // Converts a Dart List to a JS array. Any Dart objects will be converted, but
    // this will be cheap for JSValues.
    function arrayFromDartList(constructor, list) {
        const length = dartInstance.exports.$listLength(list);
        const array = new constructor(length);
        for (let i = 0; i < length; i++) {
            array[i] = dartInstance.exports.$listRead(list, i);
        }
        return array;
    }

    buildArgsList = function(list) {
        const dartList = dartInstance.exports.$makeStringList();
        for (let i = 0; i < list.length; i++) {
            dartInstance.exports.$listAdd(dartList, stringToDartString(list[i]));
        }
        return dartList;
    }

    // A special symbol attached to functions that wrap Dart functions.
    const jsWrappedDartFunctionSymbol = Symbol("JSWrappedDartFunction");

    function finalizeWrapper(dartFunction, wrapped) {
        wrapped.dartFunction = dartFunction;
        wrapped[jsWrappedDartFunctionSymbol] = true;
        return wrapped;
    }

    // Imports
    const dart2wasm = {

_11: x0 => new Array(x0),
_45: x0 => globalThis.$$.get(x0),
_46: (x0,x1) => globalThis.$$.push(x0,x1),
_47: () => globalThis.$$.pop(),
_48: x0 => x0.call(),
_49: (x0,x1) => globalThis.$$.append(x0,x1),
_50: (x0,x1,x2) => globalThis.$$.append_styles(x0,x1,x2),
_51: x0 => x0.call(),
_52: x0 => globalThis.$$.first_child(x0),
_53: (x0,x1) => globalThis.$$.sibling(x0,x1),
_54: x0 => globalThis.$$.sibling(x0),
_55: (x0,x1) => globalThis.$$.append(x0,x1),
_56: (x0,x1) => x0.querySelector(x1),
_57: (x0,x1) => x0.querySelector(x1),
_58: (x0,x1) => x0.querySelector(x1),
_59: x0 => globalThis.$$.unmount(x0),
_60: f => finalizeWrapper(f,x0 => dartInstance.exports._60(f,x0)),
_61: (x0,x1,x2) => x0.addEventListener(x1,x2),
_62: x0 => new Event(x0),
_63: (x0,x1) => x0.__click = x1,
_64: (x0,x1) => x0.alert(x1),
_65: x0 => x0.call(),
_66: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._66(f,x0,x1)),
_67: x0 => globalThis.$$.child(x0),
_68: (x0,x1) => globalThis.$$.set_text(x0,x1),
_69: (x0,x1) => globalThis.$$.append(x0,x1),
_70: (x0,x1) => x0.__click = x1,
_71: x0 => x0.call(),
_72: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._72(f,x0,x1)),
_73: x0 => globalThis.$$.child(x0),
_74: x0 => globalThis.$$.child(x0),
_75: x0 => globalThis.$$.child(x0),
_76: (x0,x1) => globalThis.$$.set_text(x0,x1),
_77: (x0,x1) => globalThis.$$.set_text(x0,x1),
_78: (x0,x1) => globalThis.$$.set_text(x0,x1),
_79: (x0,x1) => globalThis.$$.append(x0,x1),
_80: (x0,x1) => x0.__click = x1,
_81: x0 => x0.call(),
_82: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._82(f,x0,x1)),
_83: x0 => globalThis.$$.child(x0),
_84: (x0,x1) => globalThis.$$.set_text(x0,x1),
_85: (x0,x1) => globalThis.$$.append(x0,x1),
_86: x0 => x0.call(),
_87: x0 => globalThis.$$.child(x0),
_88: (x0,x1) => globalThis.$$.append(x0,x1),
_89: (x0,x1,x2) => globalThis.$$.append_styles(x0,x1,x2),
_90: x0 => x0.call(),
_91: (x0,x1) => globalThis.$$.append(x0,x1),
_92: x0 => x0.call(),
_93: (x0,x1,x2) => globalThis.$$.set_attribute(x0,x1,x2),
_94: (x0,x1,x2) => globalThis.$$.set_attribute(x0,x1,x2),
_95: (x0,x1) => globalThis.$$.append(x0,x1),
_96: x0 => x0.call(),
_97: x0 => globalThis.$$.child(x0),
_98: (x0,x1) => globalThis.$$.append(x0,x1),
_99: x0 => globalThis.$$.source(x0),
_101: (x0,x1) => globalThis.$$.set(x0,x1),
_102: x0 => globalThis.$$.user_effect(x0),
_103: f => finalizeWrapper(f,() => dartInstance.exports._103(f)),
_104: x0 => globalThis.$$.render_effect(x0),
_105: f => finalizeWrapper(f,() => dartInstance.exports._105(f)),
_106: x0 => globalThis.$$.derived(x0),
_107: f => finalizeWrapper(f,() => dartInstance.exports._107(f)),
_121: x0 => globalThis.$$.delegate(x0),
_130: (x0,x1) => globalThis.$$.template(x0,x1),
_131: x0 => globalThis.$$.template(x0),
_151: (x0,x1,x2) => globalThis.$$.html(x0,x1,x2),
_152: f => finalizeWrapper(f,() => dartInstance.exports._152(f)),
_184: x0 => ({target: x0}),
_187: (x0,x1) => globalThis.$$.mount(x0,x1),
_188: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._188(f,x0,x1)),
_723: (x0,x1) => x0.hash = x1,
_1407: (x0,x1) => x0.value = x1,
_1408: x0 => x0.value,
_1989: () => globalThis.window,
_2049: x0 => x0.location,
_2350: (x0,x1) => x0.hash = x1,
_2351: x0 => x0.hash,
_6957: (x0,x1) => x0.nodeValue = x1,
_6964: () => globalThis.document,
_12833: v => stringToDartString(v.toString()),
_12848: () => {
          let stackString = new Error().stack.toString();
          let frames = stackString.split('\n');
          let drop = 2;
          if (frames[0] === 'Error') {
              drop += 1;
          }
          return frames.slice(drop).join('\n');
        },
_12857: s => stringToDartString(JSON.stringify(stringFromDartString(s))),
_12858: s => printToConsole(stringFromDartString(s)),
_12876: (c) =>
              queueMicrotask(() => dartInstance.exports.$invokeCallback(c)),
_12878: (a, i) => a.push(i),
_12889: a => a.length,
_12891: (a, i) => a[i],
_12892: (a, i, v) => a[i] = v,
_12894: a => a.join(''),
_12904: (s, p, i) => s.indexOf(p, i),
_12907: (o, start, length) => new Uint8Array(o.buffer, o.byteOffset + start, length),
_12908: (o, start, length) => new Int8Array(o.buffer, o.byteOffset + start, length),
_12909: (o, start, length) => new Uint8ClampedArray(o.buffer, o.byteOffset + start, length),
_12910: (o, start, length) => new Uint16Array(o.buffer, o.byteOffset + start, length),
_12911: (o, start, length) => new Int16Array(o.buffer, o.byteOffset + start, length),
_12912: (o, start, length) => new Uint32Array(o.buffer, o.byteOffset + start, length),
_12913: (o, start, length) => new Int32Array(o.buffer, o.byteOffset + start, length),
_12916: (o, start, length) => new Float32Array(o.buffer, o.byteOffset + start, length),
_12917: (o, start, length) => new Float64Array(o.buffer, o.byteOffset + start, length),
_12921: (o) => new DataView(o.buffer, o.byteOffset, o.byteLength),
_12925: Function.prototype.call.bind(Object.getOwnPropertyDescriptor(DataView.prototype, 'byteLength').get),
_12926: (b, o) => new DataView(b, o),
_12928: Function.prototype.call.bind(DataView.prototype.getUint8),
_12930: Function.prototype.call.bind(DataView.prototype.getInt8),
_12932: Function.prototype.call.bind(DataView.prototype.getUint16),
_12934: Function.prototype.call.bind(DataView.prototype.getInt16),
_12936: Function.prototype.call.bind(DataView.prototype.getUint32),
_12938: Function.prototype.call.bind(DataView.prototype.getInt32),
_12944: Function.prototype.call.bind(DataView.prototype.getFloat32),
_12946: Function.prototype.call.bind(DataView.prototype.getFloat64),
_12965: (x0,x1,x2) => x0[x1] = x2,
_12967: o => o === undefined,
_12968: o => typeof o === 'boolean',
_12969: o => typeof o === 'number',
_12971: o => typeof o === 'string',
_12974: o => o instanceof Int8Array,
_12975: o => o instanceof Uint8Array,
_12976: o => o instanceof Uint8ClampedArray,
_12977: o => o instanceof Int16Array,
_12978: o => o instanceof Uint16Array,
_12979: o => o instanceof Int32Array,
_12980: o => o instanceof Uint32Array,
_12981: o => o instanceof Float32Array,
_12982: o => o instanceof Float64Array,
_12983: o => o instanceof ArrayBuffer,
_12984: o => o instanceof DataView,
_12985: o => o instanceof Array,
_12986: o => typeof o === 'function' && o[jsWrappedDartFunctionSymbol] === true,
_12990: (l, r) => l === r,
_12991: o => o,
_12992: o => o,
_12993: o => o,
_12994: b => !!b,
_12995: o => o.length,
_12998: (o, i) => o[i],
_12999: f => f.dartFunction,
_13000: l => arrayFromDartList(Int8Array, l),
_13001: l => arrayFromDartList(Uint8Array, l),
_13002: l => arrayFromDartList(Uint8ClampedArray, l),
_13003: l => arrayFromDartList(Int16Array, l),
_13004: l => arrayFromDartList(Uint16Array, l),
_13005: l => arrayFromDartList(Int32Array, l),
_13006: l => arrayFromDartList(Uint32Array, l),
_13007: l => arrayFromDartList(Float32Array, l),
_13008: l => arrayFromDartList(Float64Array, l),
_13009: (data, length) => {
          const view = new DataView(new ArrayBuffer(length));
          for (let i = 0; i < length; i++) {
              view.setUint8(i, dartInstance.exports.$byteDataGetUint8(data, i));
          }
          return view;
        },
_13010: l => arrayFromDartList(Array, l),
_13011: stringFromDartString,
_13012: stringToDartString,
_13013: () => ({}),
_13015: l => new Array(l),
_13019: (o, p) => o[p],
_13023: o => String(o)
    };

    const baseImports = {
        dart2wasm: dart2wasm,


        Math: Math,
        Date: Date,
        Object: Object,
        Array: Array,
        Reflect: Reflect,
    };

    const jsStringPolyfill = {
        "charCodeAt": (s, i) => s.charCodeAt(i),
        "compare": (s1, s2) => {
            if (s1 < s2) return -1;
            if (s1 > s2) return 1;
            return 0;
        },
        "concat": (s1, s2) => s1 + s2,
        "equals": (s1, s2) => s1 === s2,
        "fromCharCode": (i) => String.fromCharCode(i),
        "length": (s) => s.length,
        "substring": (s, a, b) => s.substring(a, b),
    };

    dartInstance = await WebAssembly.instantiate(await modulePromise, {
        ...baseImports,
        ...(await importObjectPromise),
        "wasm:js-string": jsStringPolyfill,
    });

    return dartInstance;
}

// Call the main function for the instantiated module
// `moduleInstance` is the instantiated dart2wasm module
// `args` are any arguments that should be passed into the main function.
export const invoke = (moduleInstance, ...args) => {
    const dartMain = moduleInstance.exports.$getMain();
    const dartArgs = buildArgsList(args);
    moduleInstance.exports.$invokeMain(dartMain, dartArgs);
}

