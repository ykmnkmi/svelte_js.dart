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
_12: x0 => new Promise(x0),
_16: (o,s) => o[s],
_17: (o,s,v) => o[s] = v,
_18: f => finalizeWrapper(f,x0 => dartInstance.exports._18(f,x0)),
_19: f => finalizeWrapper(f,x0 => dartInstance.exports._19(f,x0)),
_20: (x0,x1,x2) => x0.call(x1,x2),
_21: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._21(f,x0,x1)),
_22: (x0,x1) => x0.call(x1),
_44: () => Symbol("jsBoxedDartObjectProperty"),
_47: x0 => ({$$events: x0}),
_48: f => finalizeWrapper(f,x0 => dartInstance.exports._48(f,x0)),
_49: x0 => ({message: x0}),
_50: x0 => ({$$events: x0}),
_51: (x0,x1) => x0.alert(x1),
_52: (x0,x1) => x0.querySelector(x1),
_53: (x0,x1) => x0.querySelector(x1),
_54: (x0,x1) => x0.querySelector(x1),
_55: f => finalizeWrapper(f,x0 => dartInstance.exports._55(f,x0)),
_56: (x0,x1,x2) => x0.addEventListener(x1,x2),
_57: x0 => new Event(x0),
_58: x0 => globalThis.$$.get(x0),
_59: (x0,x1) => globalThis.$$.push(x0,x1),
_60: (x0,x1,x2) => globalThis.$$.set_getter(x0,x1,x2),
_61: f => finalizeWrapper(f,() => dartInstance.exports._61(f)),
_63: () => globalThis.$$.pop(),
_64: f => finalizeWrapper(f,x0 => dartInstance.exports._64(f,x0)),
_65: x0 => ({click: x0}),
_66: x0 => ({$$events: x0}),
_67: f => finalizeWrapper(f,x0 => dartInstance.exports._67(f,x0)),
_68: x0 => ({message: x0}),
_69: x0 => ({$$events: x0}),
_71: x0 => x0.current,
_72: () => ({}),
_73: (x0,x1,x2,x3) => ({name: x0,version: x1,speed: x2,website: x3}),
_74: x0 => x0.name,
_75: x0 => x0.version,
_76: x0 => x0.speed,
_77: x0 => x0.website,
_78: x0 => ({answer: x0}),
_80: x0 => ({answer: x0}),
_81: x0 => x0.answer,
_82: (x0,x1) => x0.fetch(x1),
_83: x0 => x0.text(),
_84: x0 => globalThis.$$.mutable_source(x0),
_85: (x0,x1) => globalThis.$$.mutate(x0,x1),
_86: (x0,x1) => globalThis.$$.set(x0,x1),
_88: x0 => globalThis.$$.spread_props(x0),
_89: (x0,x1,x2) => globalThis.$$.prop(x0,x1,x2),
_90: (x0,x1) => globalThis.$$.legacy_pre_effect(x0,x1),
_91: f => finalizeWrapper(f,() => dartInstance.exports._91(f)),
_92: f => finalizeWrapper(f,() => dartInstance.exports._92(f)),
_93: () => globalThis.$$.legacy_pre_effect_reset(),
_94: x0 => globalThis.$$.render_effect(x0),
_95: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._95(f,x0,x1)),
_96: (x0,x1) => globalThis.$$.template(x0,x1),
_97: x0 => globalThis.$$.template(x0),
_98: (x0,x1,x2) => globalThis.$$.open(x0,x1,x2),
_99: (x0,x1,x2) => globalThis.$$.open_frag(x0,x1,x2),
_100: x0 => globalThis.$$.space(x0),
_101: x0 => globalThis.$$.comment(x0),
_102: (x0,x1) => globalThis.$$.close(x0,x1),
_103: (x0,x1) => globalThis.$$.close_frag(x0,x1),
_104: x0 => globalThis.$$.child(x0),
_105: (x0,x1) => globalThis.$$.child_frag(x0,x1),
_106: (x0,x1) => globalThis.$$.sibling(x0,x1),
_107: (x0,x1) => globalThis.$$.forward_event(x0,x1),
_109: (x0,x1,x2) => globalThis.$$.event_bubble(x0,x1,x2),
_111: () => globalThis.$$.init(),
_112: (x0,x1,x2,x3,x4) => globalThis.$$.event(x0,x1,x2,x3,x4),
_113: f => finalizeWrapper(f,x0 => dartInstance.exports._113(f,x0)),
_114: (x0,x1,x2) => globalThis.$$.bind_value(x0,x1,x2),
_115: f => finalizeWrapper(f,() => dartInstance.exports._115(f)),
_116: f => finalizeWrapper(f,x0 => dartInstance.exports._116(f,x0)),
_119: f => finalizeWrapper(f,() => dartInstance.exports._119(f)),
_120: f => finalizeWrapper(f,x0 => dartInstance.exports._120(f,x0)),
_121: (x0,x1,x2) => globalThis.$$.bind_checked(x0,x1,x2),
_122: f => finalizeWrapper(f,() => dartInstance.exports._122(f)),
_123: f => finalizeWrapper(f,x0 => dartInstance.exports._123(f,x0)),
_124: x0 => globalThis.$$.remove_input_attr_defaults(x0),
_125: (x0,x1,x2) => globalThis.$$.attr_effect(x0,x1,x2),
_126: f => finalizeWrapper(f,() => dartInstance.exports._126(f)),
_127: (x0,x1,x2) => globalThis.$$.attr(x0,x1,x2),
_128: (x0,x1,x2,x3) => globalThis.$$.if_block(x0,x1,x2,x3),
_129: f => finalizeWrapper(f,() => dartInstance.exports._129(f)),
_130: f => finalizeWrapper(f,x0 => dartInstance.exports._130(f,x0)),
_131: f => finalizeWrapper(f,x0 => dartInstance.exports._131(f,x0)),
_132: (x0,x1,x2) => globalThis.$$.html(x0,x1,x2),
_133: f => finalizeWrapper(f,() => dartInstance.exports._133(f)),
_134: (x0,x1,x2,x3,x4,x5) => globalThis.$$.each_keyed(x0,x1,x2,x3,x4,x5),
_135: f => finalizeWrapper(f,(x0,x1,x2) => dartInstance.exports._135(f,x0,x1,x2)),
_136: f => finalizeWrapper(f,() => dartInstance.exports._136(f)),
_137: f => finalizeWrapper(f,(x0,x1,x2) => dartInstance.exports._137(f,x0,x1,x2)),
_139: (x0,x1,x2,x3,x4) => globalThis.$$.each_indexed(x0,x1,x2,x3,x4),
_140: f => finalizeWrapper(f,() => dartInstance.exports._140(f)),
_141: f => finalizeWrapper(f,(x0,x1,x2) => dartInstance.exports._141(f,x0,x1,x2)),
_143: (x0,x1,x2,x3,x4) => globalThis.$$.await_block(x0,x1,x2,x3,x4),
_144: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._144(f,x0,x1)),
_145: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._145(f,x0,x1)),
_146: f => finalizeWrapper(f,() => dartInstance.exports._146(f)),
_147: f => finalizeWrapper(f,x0 => dartInstance.exports._147(f,x0)),
_148: x0 => x0.error,
_191: (x0,x1) => globalThis.$$.text_effect(x0,x1),
_192: f => finalizeWrapper(f,() => dartInstance.exports._192(f)),
_193: (x0,x1) => globalThis.$$.text(x0,x1),
_194: x0 => ({target: x0}),
_197: (x0,x1) => globalThis.$$.mount(x0,x1),
_198: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._198(f,x0,x1)),
_199: x0 => globalThis.$$.unmount(x0),
_200: (x0,x1,x2) => globalThis.$$.append_styles(x0,x1,x2),
_733: (x0,x1) => x0.hash = x1,
_1361: (x0,x1) => x0.disabled = x1,
_1417: (x0,x1) => x0.value = x1,
_1418: x0 => x0.value,
_1999: () => globalThis.window,
_2059: x0 => x0.location,
_2360: (x0,x1) => x0.hash = x1,
_2361: x0 => x0.hash,
_6858: x0 => x0.detail,
_6967: (x0,x1) => x0.nodeValue = x1,
_6974: () => globalThis.document,
_7676: x0 => x0.clientX,
_7677: x0 => x0.clientY,
_8563: x0 => x0.ok,
_12840: (x0,x1,x2) => x0[x1] = x2,
_12841: x0 => ({cancelable: x0}),
_12842: () => globalThis.$$.createEventDispatcher(),
_12843: (x0,x1,x2,x3,x4) => x0.call(x1,x2,x3,x4),
_12847: v => stringToDartString(v.toString()),
_12862: () => {
          let stackString = new Error().stack.toString();
          let frames = stackString.split('\n');
          let drop = 2;
          if (frames[0] === 'Error') {
              drop += 1;
          }
          return frames.slice(drop).join('\n');
        },
_12871: s => stringToDartString(JSON.stringify(stringFromDartString(s))),
_12872: s => printToConsole(stringFromDartString(s)),
_12890: (c) =>
              queueMicrotask(() => dartInstance.exports.$invokeCallback(c)),
_12892: (a, i) => a.push(i),
_12900: (a, s, e) => a.slice(s, e),
_12903: a => a.length,
_12905: (a, i) => a[i],
_12906: (a, i, v) => a[i] = v,
_12908: a => a.join(''),
_12918: (s, p, i) => s.indexOf(p, i),
_12920: (o, offsetInBytes, lengthInBytes) => {
      var dst = new ArrayBuffer(lengthInBytes);
      new Uint8Array(dst).set(new Uint8Array(o, offsetInBytes, lengthInBytes));
      return new DataView(dst);
    },
_12921: (o, start, length) => new Uint8Array(o.buffer, o.byteOffset + start, length),
_12922: (o, start, length) => new Int8Array(o.buffer, o.byteOffset + start, length),
_12923: (o, start, length) => new Uint8ClampedArray(o.buffer, o.byteOffset + start, length),
_12924: (o, start, length) => new Uint16Array(o.buffer, o.byteOffset + start, length),
_12925: (o, start, length) => new Int16Array(o.buffer, o.byteOffset + start, length),
_12926: (o, start, length) => new Uint32Array(o.buffer, o.byteOffset + start, length),
_12927: (o, start, length) => new Int32Array(o.buffer, o.byteOffset + start, length),
_12930: (o, start, length) => new Float32Array(o.buffer, o.byteOffset + start, length),
_12931: (o, start, length) => new Float64Array(o.buffer, o.byteOffset + start, length),
_12935: (o) => new DataView(o.buffer, o.byteOffset, o.byteLength),
_12937: o => o.buffer,
_12938: o => o.byteOffset,
_12939: Function.prototype.call.bind(Object.getOwnPropertyDescriptor(DataView.prototype, 'byteLength').get),
_12940: (b, o) => new DataView(b, o),
_12942: Function.prototype.call.bind(DataView.prototype.getUint8),
_12943: Function.prototype.call.bind(DataView.prototype.setUint8),
_12944: Function.prototype.call.bind(DataView.prototype.getInt8),
_12945: Function.prototype.call.bind(DataView.prototype.setInt8),
_12946: Function.prototype.call.bind(DataView.prototype.getUint16),
_12947: Function.prototype.call.bind(DataView.prototype.setUint16),
_12948: Function.prototype.call.bind(DataView.prototype.getInt16),
_12949: Function.prototype.call.bind(DataView.prototype.setInt16),
_12950: Function.prototype.call.bind(DataView.prototype.getUint32),
_12951: Function.prototype.call.bind(DataView.prototype.setUint32),
_12952: Function.prototype.call.bind(DataView.prototype.getInt32),
_12953: Function.prototype.call.bind(DataView.prototype.setInt32),
_12958: Function.prototype.call.bind(DataView.prototype.getFloat32),
_12960: Function.prototype.call.bind(DataView.prototype.getFloat64),
_12981: o => o === undefined,
_12982: o => typeof o === 'boolean',
_12983: o => typeof o === 'number',
_12985: o => typeof o === 'string',
_12988: o => o instanceof Int8Array,
_12989: o => o instanceof Uint8Array,
_12990: o => o instanceof Uint8ClampedArray,
_12991: o => o instanceof Int16Array,
_12992: o => o instanceof Uint16Array,
_12993: o => o instanceof Int32Array,
_12994: o => o instanceof Uint32Array,
_12995: o => o instanceof Float32Array,
_12996: o => o instanceof Float64Array,
_12997: o => o instanceof ArrayBuffer,
_12998: o => o instanceof DataView,
_12999: o => o instanceof Array,
_13000: o => typeof o === 'function' && o[jsWrappedDartFunctionSymbol] === true,
_13004: (l, r) => l === r,
_13005: o => o,
_13006: o => o,
_13007: o => o,
_13008: b => !!b,
_13009: o => o.length,
_13012: (o, i) => o[i],
_13013: f => f.dartFunction,
_13014: l => arrayFromDartList(Int8Array, l),
_13015: l => arrayFromDartList(Uint8Array, l),
_13016: l => arrayFromDartList(Uint8ClampedArray, l),
_13017: l => arrayFromDartList(Int16Array, l),
_13018: l => arrayFromDartList(Uint16Array, l),
_13019: l => arrayFromDartList(Int32Array, l),
_13020: l => arrayFromDartList(Uint32Array, l),
_13021: l => arrayFromDartList(Float32Array, l),
_13022: l => arrayFromDartList(Float64Array, l),
_13023: (data, length) => {
          const view = new DataView(new ArrayBuffer(length));
          for (let i = 0; i < length; i++) {
              view.setUint8(i, dartInstance.exports.$byteDataGetUint8(data, i));
          }
          return view;
        },
_13024: l => arrayFromDartList(Array, l),
_13025: stringFromDartString,
_13026: stringToDartString,
_13027: () => ({}),
_13029: l => new Array(l),
_13030: () => globalThis,
_13031: (constructor, args) => {
      const factoryFunction = constructor.bind.apply(
          constructor, [null, ...args]);
      return new factoryFunction();
    },
_13033: (o, p) => o[p],
_13037: o => String(o),
_13038: (p, s, f) => p.then(s, f),
_13057: (o, p) => o[p],
_13058: (o, p, v) => o[p] = v
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

