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
_44: () => Symbol("jsBoxedDartObjectProperty"),
_45: x0 => globalThis.$$.get(x0),
_46: (x0,x1) => globalThis.$$.push(x0,x1),
_47: () => globalThis.$$.pop(),
_49: x0 => x0.current,
_50: (x0,x1,x2) => globalThis.$$.append_styles(x0,x1,x2),
_51: x0 => x0.call(),
_52: x0 => globalThis.$$.child(x0),
_53: (x0,x1,x2) => globalThis.$$.set_attribute(x0,x1,x2),
_54: (x0,x1) => globalThis.$$.sibling(x0,x1),
_55: x0 => globalThis.$$.sibling(x0),
_56: (x0,x1,x2) => globalThis.$$.set_attribute(x0,x1,x2),
_57: (x0,x1) => globalThis.$$.append(x0,x1),
_58: (x0,x1) => x0.__click = x1,
_59: x0 => x0.call(),
_60: x0 => globalThis.$$.first_child(x0),
_61: f => finalizeWrapper(f,x0 => dartInstance.exports._61(f,x0)),
_62: x0 => globalThis.$$.child(x0),
_63: x0 => globalThis.$$.child(x0),
_64: () => globalThis.$$.comment(),
_65: (x0,x1) => globalThis.$$.first_child(x0,x1),
_66: () => ({}),
_67: (x0,x1) => globalThis.$$.append(x0,x1),
_68: x0 => globalThis.$$.child(x0),
_69: () => globalThis.$$.comment(),
_70: (x0,x1) => globalThis.$$.append(x0,x1),
_71: (x0,x1) => globalThis.$$.append(x0,x1),
_72: (x0,x1) => x0.querySelector(x1),
_73: (x0,x1) => x0.querySelector(x1),
_74: (x0,x1) => x0.querySelector(x1),
_75: x0 => globalThis.$$.unmount(x0),
_76: f => finalizeWrapper(f,x0 => dartInstance.exports._76(f,x0)),
_77: (x0,x1,x2) => x0.addEventListener(x1,x2),
_78: x0 => new Event(x0),
_80: x0 => x0.name,
_81: x0 => x0.version,
_82: x0 => x0.speed,
_83: x0 => x0.website,
_84: x0 => x0.call(),
_85: x0 => globalThis.$$.child(x0),
_86: x0 => globalThis.$$.child(x0),
_87: (x0,x1) => globalThis.$$.set_text(x0,x1),
_88: (x0,x1) => globalThis.$$.set_text(x0,x1),
_89: (x0,x1,x2) => globalThis.$$.set_attribute(x0,x1,x2),
_90: (x0,x1,x2) => globalThis.$$.set_attribute(x0,x1,x2),
_91: (x0,x1) => globalThis.$$.append(x0,x1),
_92: () => globalThis.$$.comment(),
_93: (x0,x1) => globalThis.$$.append(x0,x1),
_94: x0 => ({answer: x0}),
_96: x0 => x0.call(),
_97: x0 => globalThis.$$.child(x0),
_98: (x0,x1) => globalThis.$$.set_text(x0,x1),
_99: (x0,x1) => globalThis.$$.append(x0,x1),
_100: x0 => x0.call(),
_101: () => ({}),
_102: (x0,x1) => globalThis.$$.append(x0,x1),
_103: x0 => ({answer: x0}),
_104: x0 => x0.answer,
_106: x0 => x0.call(),
_107: x0 => globalThis.$$.child(x0),
_108: (x0,x1) => globalThis.$$.set_text(x0,x1),
_109: (x0,x1) => globalThis.$$.append(x0,x1),
_110: () => globalThis.$$.comment(),
_111: (x0,x1) => globalThis.$$.append(x0,x1),
_112: x0 => x0.call(),
_113: (x0,x1) => globalThis.$$.append(x0,x1),
_114: (x0,x1,x2) => globalThis.$$.append_styles(x0,x1,x2),
_115: x0 => x0.call(),
_116: (x0,x1) => globalThis.$$.append(x0,x1),
_117: (x0,x1) => x0.__click = x1,
_118: (x0,x1) => x0.fetch(x1),
_119: x0 => x0.text(),
_120: x0 => x0.call(),
_121: f => finalizeWrapper(f,x0 => dartInstance.exports._121(f,x0)),
_122: x0 => x0.call(),
_123: (x0,x1) => globalThis.$$.append(x0,x1),
_124: x0 => x0.call(),
_125: x0 => globalThis.$$.child(x0),
_126: (x0,x1) => globalThis.$$.append(x0,x1),
_127: x0 => x0.call(),
_128: x0 => globalThis.$$.child(x0),
_129: (x0,x1) => globalThis.$$.set_text(x0,x1),
_130: (x0,x1) => globalThis.$$.append(x0,x1),
_131: (x0,x1) => globalThis.$$.append(x0,x1),
_132: x0 => x0.call(),
_133: x0 => x0.call(),
_134: x0 => globalThis.$$.child(x0),
_135: x0 => globalThis.$$.child(x0),
_136: (x0,x1,x2) => globalThis.$$.set_attribute(x0,x1,x2),
_137: (x0,x1) => globalThis.$$.set_text(x0,x1),
_138: (x0,x1) => globalThis.$$.append(x0,x1),
_139: (x0,x1) => globalThis.$$.append(x0,x1),
_140: () => globalThis.$$.comment(),
_141: x0 => x0.call(),
_142: x0 => globalThis.$$.child(x0),
_143: (x0,x1) => globalThis.$$.append(x0,x1),
_144: () => globalThis.$$.comment(),
_145: x0 => x0.call(),
_146: x0 => globalThis.$$.child(x0),
_147: (x0,x1) => globalThis.$$.append(x0,x1),
_148: x0 => x0.call(),
_149: x0 => globalThis.$$.child(x0),
_150: (x0,x1) => globalThis.$$.append(x0,x1),
_151: (x0,x1) => globalThis.$$.append(x0,x1),
_152: (x0,x1) => globalThis.$$.append(x0,x1),
_153: (x0,x1) => x0.__click = x1,
_154: () => globalThis.$$.comment(),
_155: x0 => x0.call(),
_156: f => finalizeWrapper(f,x0 => dartInstance.exports._156(f,x0)),
_157: (x0,x1) => globalThis.$$.append(x0,x1),
_158: x0 => x0.call(),
_159: f => finalizeWrapper(f,x0 => dartInstance.exports._159(f,x0)),
_160: (x0,x1) => globalThis.$$.append(x0,x1),
_161: (x0,x1) => globalThis.$$.append(x0,x1),
_162: (x0,x1) => x0.__click = x1,
_163: x0 => x0.call(),
_164: x0 => x0.call(),
_165: f => finalizeWrapper(f,x0 => dartInstance.exports._165(f,x0)),
_166: (x0,x1) => globalThis.$$.append(x0,x1),
_167: x0 => x0.call(),
_168: f => finalizeWrapper(f,x0 => dartInstance.exports._168(f,x0)),
_169: (x0,x1) => globalThis.$$.append(x0,x1),
_170: (x0,x1) => globalThis.$$.append(x0,x1),
_171: (x0,x1) => x0.__click = x1,
_172: (x0,x1) => x0.alert(x1),
_173: x0 => x0.call(),
_174: f => finalizeWrapper(f,x0 => dartInstance.exports._174(f,x0)),
_175: x0 => globalThis.$$.child(x0),
_176: (x0,x1) => globalThis.$$.set_text(x0,x1),
_177: (x0,x1) => globalThis.$$.append(x0,x1),
_178: (x0,x1) => x0.__click = x1,
_179: x0 => x0.call(),
_180: f => finalizeWrapper(f,x0 => dartInstance.exports._180(f,x0)),
_181: x0 => globalThis.$$.child(x0),
_182: x0 => globalThis.$$.child(x0),
_183: x0 => globalThis.$$.child(x0),
_184: (x0,x1) => globalThis.$$.set_text(x0,x1),
_185: (x0,x1) => globalThis.$$.set_text(x0,x1),
_186: (x0,x1) => globalThis.$$.set_text(x0,x1),
_187: (x0,x1) => globalThis.$$.append(x0,x1),
_188: (x0,x1) => x0.__click = x1,
_189: x0 => x0.call(),
_190: f => finalizeWrapper(f,x0 => dartInstance.exports._190(f,x0)),
_191: x0 => globalThis.$$.child(x0),
_192: (x0,x1) => globalThis.$$.set_text(x0,x1),
_193: (x0,x1) => globalThis.$$.append(x0,x1),
_194: x0 => x0.call(),
_195: x0 => globalThis.$$.child(x0),
_196: (x0,x1) => globalThis.$$.append(x0,x1),
_197: (x0,x1,x2) => globalThis.$$.append_styles(x0,x1,x2),
_198: x0 => x0.call(),
_199: (x0,x1) => globalThis.$$.append(x0,x1),
_200: x0 => x0.call(),
_201: (x0,x1,x2) => globalThis.$$.set_attribute(x0,x1,x2),
_202: (x0,x1,x2) => globalThis.$$.set_attribute(x0,x1,x2),
_203: (x0,x1) => globalThis.$$.append(x0,x1),
_204: x0 => x0.call(),
_205: x0 => globalThis.$$.child(x0),
_206: (x0,x1) => globalThis.$$.append(x0,x1),
_207: x0 => globalThis.$$.source(x0),
_209: (x0,x1) => globalThis.$$.mutate(x0,x1),
_210: (x0,x1) => globalThis.$$.set(x0,x1),
_211: x0 => globalThis.$$.user_effect(x0),
_212: f => finalizeWrapper(f,() => dartInstance.exports._212(f)),
_213: x0 => globalThis.$$.render_effect(x0),
_214: f => finalizeWrapper(f,() => dartInstance.exports._214(f)),
_215: x0 => globalThis.$$.derived(x0),
_216: f => finalizeWrapper(f,() => dartInstance.exports._216(f)),
_217: (x0,x1,x2,x3,x4,x5) => globalThis.$$.each_keyed(x0,x1,x2,x3,x4,x5),
_218: f => finalizeWrapper(f,() => dartInstance.exports._218(f)),
_219: f => finalizeWrapper(f,(x0,x1,x2) => dartInstance.exports._219(f,x0,x1,x2)),
_220: f => finalizeWrapper(f,(x0,x1,x2) => dartInstance.exports._220(f,x0,x1,x2)),
_222: (x0,x1,x2,x3,x4) => globalThis.$$.each_indexed(x0,x1,x2,x3,x4),
_223: f => finalizeWrapper(f,() => dartInstance.exports._223(f)),
_224: f => finalizeWrapper(f,(x0,x1,x2) => dartInstance.exports._224(f,x0,x1,x2)),
_226: (x0,x1,x2) => x0[x1] = x2,
_228: x0 => globalThis.$$.spread_props(x0),
_229: (x0,x1,x2,x3) => globalThis.$$.prop(x0,x1,x2,x3),
_230: x0 => x0.call(),
_231: (x0,x1,x2) => x0[x1] = x2,
_232: f => finalizeWrapper(f,() => dartInstance.exports._232(f)),
_233: x0 => ({get: x0}),
_234: (x0,x1,x2) => globalThis.Object.defineProperty(x0,x1,x2),
_237: x0 => globalThis.$$.delegate(x0),
_238: (x0,x1,x2,x3,x4) => globalThis.$$.await_block(x0,x1,x2,x3,x4),
_239: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._239(f,x0,x1)),
_240: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._240(f,x0,x1)),
_241: f => finalizeWrapper(f,() => dartInstance.exports._241(f)),
_242: f => finalizeWrapper(f,x0 => dartInstance.exports._242(f,x0)),
_243: x0 => x0.error,
_246: (x0,x1) => globalThis.$$.template(x0,x1),
_247: x0 => globalThis.$$.template(x0),
_263: (x0,x1,x2,x3,x4) => globalThis.$$.if_block(x0,x1,x2,x3,x4),
_264: f => finalizeWrapper(f,() => dartInstance.exports._264(f)),
_265: f => finalizeWrapper(f,x0 => dartInstance.exports._265(f,x0)),
_266: f => finalizeWrapper(f,x0 => dartInstance.exports._266(f,x0)),
_267: (x0,x1,x2) => globalThis.$$.html(x0,x1,x2),
_268: f => finalizeWrapper(f,() => dartInstance.exports._268(f)),
_300: x0 => ({target: x0}),
_303: (x0,x1) => globalThis.$$.mount(x0,x1),
_304: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._304(f,x0,x1)),
_839: (x0,x1) => x0.hash = x1,
_1523: (x0,x1) => x0.value = x1,
_1524: x0 => x0.value,
_2105: () => globalThis.window,
_2165: x0 => x0.location,
_2466: (x0,x1) => x0.hash = x1,
_2467: x0 => x0.hash,
_7073: (x0,x1) => x0.nodeValue = x1,
_7080: () => globalThis.document,
_8669: x0 => x0.ok,
_12949: v => stringToDartString(v.toString()),
_12964: () => {
          let stackString = new Error().stack.toString();
          let frames = stackString.split('\n');
          let drop = 2;
          if (frames[0] === 'Error') {
              drop += 1;
          }
          return frames.slice(drop).join('\n');
        },
_12973: s => stringToDartString(JSON.stringify(stringFromDartString(s))),
_12974: s => printToConsole(stringFromDartString(s)),
_12992: (c) =>
              queueMicrotask(() => dartInstance.exports.$invokeCallback(c)),
_12994: (a, i) => a.push(i),
_13002: (a, s, e) => a.slice(s, e),
_13005: a => a.length,
_13007: (a, i) => a[i],
_13008: (a, i, v) => a[i] = v,
_13010: a => a.join(''),
_13020: (s, p, i) => s.indexOf(p, i),
_13022: (o, offsetInBytes, lengthInBytes) => {
      var dst = new ArrayBuffer(lengthInBytes);
      new Uint8Array(dst).set(new Uint8Array(o, offsetInBytes, lengthInBytes));
      return new DataView(dst);
    },
_13023: (o, start, length) => new Uint8Array(o.buffer, o.byteOffset + start, length),
_13024: (o, start, length) => new Int8Array(o.buffer, o.byteOffset + start, length),
_13025: (o, start, length) => new Uint8ClampedArray(o.buffer, o.byteOffset + start, length),
_13026: (o, start, length) => new Uint16Array(o.buffer, o.byteOffset + start, length),
_13027: (o, start, length) => new Int16Array(o.buffer, o.byteOffset + start, length),
_13028: (o, start, length) => new Uint32Array(o.buffer, o.byteOffset + start, length),
_13029: (o, start, length) => new Int32Array(o.buffer, o.byteOffset + start, length),
_13032: (o, start, length) => new Float32Array(o.buffer, o.byteOffset + start, length),
_13033: (o, start, length) => new Float64Array(o.buffer, o.byteOffset + start, length),
_13037: (o) => new DataView(o.buffer, o.byteOffset, o.byteLength),
_13039: o => o.buffer,
_13040: o => o.byteOffset,
_13041: Function.prototype.call.bind(Object.getOwnPropertyDescriptor(DataView.prototype, 'byteLength').get),
_13042: (b, o) => new DataView(b, o),
_13044: Function.prototype.call.bind(DataView.prototype.getUint8),
_13046: Function.prototype.call.bind(DataView.prototype.getInt8),
_13048: Function.prototype.call.bind(DataView.prototype.getUint16),
_13050: Function.prototype.call.bind(DataView.prototype.getInt16),
_13052: Function.prototype.call.bind(DataView.prototype.getUint32),
_13054: Function.prototype.call.bind(DataView.prototype.getInt32),
_13060: Function.prototype.call.bind(DataView.prototype.getFloat32),
_13062: Function.prototype.call.bind(DataView.prototype.getFloat64),
_13081: (x0,x1,x2) => x0[x1] = x2,
_13083: o => o === undefined,
_13084: o => typeof o === 'boolean',
_13085: o => typeof o === 'number',
_13087: o => typeof o === 'string',
_13090: o => o instanceof Int8Array,
_13091: o => o instanceof Uint8Array,
_13092: o => o instanceof Uint8ClampedArray,
_13093: o => o instanceof Int16Array,
_13094: o => o instanceof Uint16Array,
_13095: o => o instanceof Int32Array,
_13096: o => o instanceof Uint32Array,
_13097: o => o instanceof Float32Array,
_13098: o => o instanceof Float64Array,
_13099: o => o instanceof ArrayBuffer,
_13100: o => o instanceof DataView,
_13101: o => o instanceof Array,
_13102: o => typeof o === 'function' && o[jsWrappedDartFunctionSymbol] === true,
_13106: (l, r) => l === r,
_13107: o => o,
_13108: o => o,
_13109: o => o,
_13110: b => !!b,
_13111: o => o.length,
_13114: (o, i) => o[i],
_13115: f => f.dartFunction,
_13116: l => arrayFromDartList(Int8Array, l),
_13117: l => arrayFromDartList(Uint8Array, l),
_13118: l => arrayFromDartList(Uint8ClampedArray, l),
_13119: l => arrayFromDartList(Int16Array, l),
_13120: l => arrayFromDartList(Uint16Array, l),
_13121: l => arrayFromDartList(Int32Array, l),
_13122: l => arrayFromDartList(Uint32Array, l),
_13123: l => arrayFromDartList(Float32Array, l),
_13124: l => arrayFromDartList(Float64Array, l),
_13125: (data, length) => {
          const view = new DataView(new ArrayBuffer(length));
          for (let i = 0; i < length; i++) {
              view.setUint8(i, dartInstance.exports.$byteDataGetUint8(data, i));
          }
          return view;
        },
_13126: l => arrayFromDartList(Array, l),
_13127: stringFromDartString,
_13128: stringToDartString,
_13129: () => ({}),
_13131: l => new Array(l),
_13132: () => globalThis,
_13133: (constructor, args) => {
      const factoryFunction = constructor.bind.apply(
          constructor, [null, ...args]);
      return new factoryFunction();
    },
_13135: (o, p) => o[p],
_13139: o => String(o),
_13140: (p, s, f) => p.then(s, f),
_13159: (o, p) => o[p],
_13160: (o, p, v) => o[p] = v
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

