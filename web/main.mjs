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
_48: (x0,x1) => x0.__click = x1,
_49: x0 => ({message: x0}),
_50: x0 => x0.message,
_52: x0 => x0.call(),
_53: (x0,x1) => globalThis.$$.append(x0,x1),
_54: (x0,x1) => x0.alert(x1),
_55: () => globalThis.$$.comment(),
_56: x0 => globalThis.$$.child(x0),
_57: (x0,x1) => globalThis.$$.append(x0,x1),
_58: (x0,x1) => x0.querySelector(x1),
_59: (x0,x1) => x0.querySelector(x1),
_60: (x0,x1) => x0.querySelector(x1),
_61: x0 => globalThis.$$.unmount(x0),
_62: f => finalizeWrapper(f,x0 => dartInstance.exports._62(f,x0)),
_63: (x0,x1,x2) => x0.addEventListener(x1,x2),
_64: x0 => new Event(x0),
_66: x0 => x0.current,
_67: (x0,x1,x2) => globalThis.$$.append_styles(x0,x1,x2),
_68: x0 => x0.call(),
_69: x0 => globalThis.$$.child(x0),
_70: (x0,x1,x2) => globalThis.$$.set_attribute(x0,x1,x2),
_71: x0 => globalThis.$$.sibling(x0),
_72: x0 => globalThis.$$.sibling(x0),
_73: (x0,x1,x2) => globalThis.$$.set_attribute(x0,x1,x2),
_74: (x0,x1) => globalThis.$$.append(x0,x1),
_75: (x0,x1) => x0.__click = x1,
_76: x0 => x0.call(),
_77: x0 => globalThis.$$.child(x0),
_78: x0 => globalThis.$$.sibling(x0),
_79: x0 => globalThis.$$.sibling(x0),
_80: x0 => globalThis.$$.child(x0),
_81: x0 => globalThis.$$.child(x0),
_82: x0 => globalThis.$$.sibling(x0),
_83: x0 => globalThis.$$.sibling(x0),
_84: () => globalThis.$$.comment(),
_85: x0 => globalThis.$$.child(x0),
_86: () => ({}),
_87: (x0,x1) => globalThis.$$.append(x0,x1),
_88: x0 => globalThis.$$.sibling(x0),
_89: x0 => globalThis.$$.sibling(x0),
_90: x0 => globalThis.$$.child(x0),
_91: x0 => globalThis.$$.sibling(x0),
_92: x0 => globalThis.$$.sibling(x0),
_93: () => globalThis.$$.comment(),
_94: x0 => globalThis.$$.child(x0),
_95: (x0,x1) => globalThis.$$.append(x0,x1),
_96: (x0,x1) => globalThis.$$.append(x0,x1),
_98: x0 => x0.name,
_99: x0 => x0.version,
_100: x0 => x0.speed,
_101: x0 => x0.website,
_102: x0 => x0.call(),
_103: x0 => globalThis.$$.child(x0),
_104: x0 => globalThis.$$.sibling(x0),
_105: x0 => globalThis.$$.child(x0),
_106: x0 => globalThis.$$.sibling(x0),
_107: x0 => globalThis.$$.sibling(x0),
_108: x0 => globalThis.$$.sibling(x0),
_109: x0 => globalThis.$$.sibling(x0),
_110: (x0,x1) => globalThis.$$.set_text(x0,x1),
_111: (x0,x1) => globalThis.$$.set_text(x0,x1),
_112: (x0,x1,x2) => globalThis.$$.set_attribute(x0,x1,x2),
_113: (x0,x1,x2) => globalThis.$$.set_attribute(x0,x1,x2),
_114: (x0,x1) => globalThis.$$.append(x0,x1),
_115: () => globalThis.$$.comment(),
_116: x0 => globalThis.$$.child(x0),
_117: (x0,x1) => globalThis.$$.append(x0,x1),
_118: x0 => ({answer: x0}),
_120: x0 => x0.call(),
_121: x0 => globalThis.$$.child(x0),
_122: (x0,x1) => globalThis.$$.set_text(x0,x1),
_123: (x0,x1) => globalThis.$$.append(x0,x1),
_124: x0 => x0.call(),
_125: x0 => globalThis.$$.child(x0),
_126: x0 => globalThis.$$.sibling(x0),
_127: x0 => globalThis.$$.sibling(x0),
_128: () => ({}),
_129: (x0,x1) => globalThis.$$.append(x0,x1),
_130: x0 => ({answer: x0}),
_131: x0 => x0.answer,
_133: x0 => x0.call(),
_134: x0 => globalThis.$$.child(x0),
_135: (x0,x1) => globalThis.$$.set_text(x0,x1),
_136: (x0,x1) => globalThis.$$.append(x0,x1),
_137: () => globalThis.$$.comment(),
_138: x0 => globalThis.$$.child(x0),
_139: (x0,x1) => globalThis.$$.append(x0,x1),
_140: x0 => x0.call(),
_141: (x0,x1) => globalThis.$$.append(x0,x1),
_142: (x0,x1,x2) => globalThis.$$.append_styles(x0,x1,x2),
_143: x0 => x0.call(),
_144: x0 => globalThis.$$.child(x0),
_145: x0 => globalThis.$$.sibling(x0),
_146: x0 => globalThis.$$.sibling(x0),
_147: (x0,x1) => globalThis.$$.append(x0,x1),
_148: (x0,x1) => x0.__click = x1,
_149: x0 => x0.call(),
_150: (x0,x1) => globalThis.$$.append(x0,x1),
_151: (x0,x1) => x0.__mousemove = x1,
_152: (x0,x1,x2) => globalThis.$$.append_styles(x0,x1,x2),
_153: x0 => x0.call(),
_154: x0 => globalThis.$$.child(x0),
_155: (x0,x1) => globalThis.$$.set_text(x0,x1),
_156: (x0,x1) => globalThis.$$.append(x0,x1),
_157: (x0,x1) => x0.__mousemove = x1,
_158: (x0,x1,x2) => globalThis.$$.append_styles(x0,x1,x2),
_159: x0 => x0.call(),
_160: x0 => globalThis.$$.child(x0),
_161: (x0,x1) => globalThis.$$.set_text(x0,x1),
_162: (x0,x1) => globalThis.$$.append(x0,x1),
_163: (x0,x1) => x0.__click = x1,
_164: (x0,x1) => x0.fetch(x1),
_165: x0 => x0.text(),
_166: x0 => x0.call(),
_167: x0 => globalThis.$$.child(x0),
_168: x0 => globalThis.$$.sibling(x0),
_169: x0 => globalThis.$$.sibling(x0),
_170: x0 => x0.call(),
_171: (x0,x1) => globalThis.$$.append(x0,x1),
_172: x0 => x0.call(),
_173: x0 => globalThis.$$.child(x0),
_174: (x0,x1) => globalThis.$$.append(x0,x1),
_175: x0 => x0.call(),
_176: x0 => globalThis.$$.child(x0),
_177: (x0,x1) => globalThis.$$.set_text(x0,x1),
_178: (x0,x1) => globalThis.$$.append(x0,x1),
_179: (x0,x1) => globalThis.$$.append(x0,x1),
_180: x0 => x0.call(),
_181: x0 => globalThis.$$.child(x0),
_182: x0 => globalThis.$$.sibling(x0),
_183: x0 => globalThis.$$.sibling(x0),
_184: x0 => x0.call(),
_185: x0 => globalThis.$$.child(x0),
_186: x0 => globalThis.$$.child(x0),
_187: (x0,x1,x2) => globalThis.$$.set_attribute(x0,x1,x2),
_188: (x0,x1) => globalThis.$$.set_text(x0,x1),
_189: (x0,x1) => globalThis.$$.append(x0,x1),
_190: (x0,x1) => globalThis.$$.append(x0,x1),
_191: () => globalThis.$$.comment(),
_192: x0 => globalThis.$$.child(x0),
_193: x0 => x0.call(),
_194: x0 => globalThis.$$.child(x0),
_195: (x0,x1) => globalThis.$$.append(x0,x1),
_196: () => globalThis.$$.comment(),
_197: x0 => globalThis.$$.child(x0),
_198: x0 => x0.call(),
_199: x0 => globalThis.$$.child(x0),
_200: (x0,x1) => globalThis.$$.append(x0,x1),
_201: x0 => x0.call(),
_202: x0 => globalThis.$$.child(x0),
_203: (x0,x1) => globalThis.$$.append(x0,x1),
_204: (x0,x1) => globalThis.$$.append(x0,x1),
_205: (x0,x1) => globalThis.$$.append(x0,x1),
_206: (x0,x1) => x0.__click = x1,
_207: () => globalThis.$$.comment(),
_208: x0 => globalThis.$$.child(x0),
_209: x0 => x0.call(),
_210: (x0,x1) => globalThis.$$.append(x0,x1),
_211: x0 => x0.call(),
_212: (x0,x1) => globalThis.$$.append(x0,x1),
_213: (x0,x1) => globalThis.$$.append(x0,x1),
_214: (x0,x1) => x0.__click = x1,
_215: x0 => x0.call(),
_216: x0 => globalThis.$$.child(x0),
_217: x0 => x0.call(),
_218: (x0,x1) => globalThis.$$.append(x0,x1),
_219: x0 => globalThis.$$.sibling(x0),
_220: x0 => globalThis.$$.sibling(x0),
_221: x0 => x0.call(),
_222: (x0,x1) => globalThis.$$.append(x0,x1),
_223: (x0,x1) => globalThis.$$.append(x0,x1),
_224: (x0,x1) => x0.__click = x1,
_225: x0 => x0.call(),
_226: x0 => globalThis.$$.child(x0),
_227: (x0,x1) => globalThis.$$.set_text(x0,x1),
_228: (x0,x1) => globalThis.$$.append(x0,x1),
_229: (x0,x1) => x0.__click = x1,
_230: x0 => x0.call(),
_231: x0 => globalThis.$$.child(x0),
_232: x0 => globalThis.$$.child(x0),
_233: x0 => globalThis.$$.sibling(x0),
_234: x0 => globalThis.$$.sibling(x0),
_235: x0 => globalThis.$$.child(x0),
_236: x0 => globalThis.$$.sibling(x0),
_237: x0 => globalThis.$$.sibling(x0),
_238: x0 => globalThis.$$.child(x0),
_239: (x0,x1) => globalThis.$$.set_text(x0,x1),
_240: (x0,x1) => globalThis.$$.set_text(x0,x1),
_241: (x0,x1) => globalThis.$$.set_text(x0,x1),
_242: (x0,x1) => globalThis.$$.append(x0,x1),
_243: (x0,x1) => x0.__click = x1,
_244: x0 => x0.call(),
_245: x0 => globalThis.$$.child(x0),
_246: (x0,x1) => globalThis.$$.set_text(x0,x1),
_247: (x0,x1) => globalThis.$$.append(x0,x1),
_248: x0 => x0.call(),
_249: x0 => globalThis.$$.child(x0),
_250: (x0,x1) => globalThis.$$.append(x0,x1),
_251: (x0,x1,x2) => globalThis.$$.append_styles(x0,x1,x2),
_252: x0 => x0.call(),
_253: (x0,x1) => globalThis.$$.append(x0,x1),
_254: x0 => x0.call(),
_255: (x0,x1,x2) => globalThis.$$.set_attribute(x0,x1,x2),
_256: (x0,x1,x2) => globalThis.$$.set_attribute(x0,x1,x2),
_257: (x0,x1) => globalThis.$$.append(x0,x1),
_258: x0 => x0.call(),
_259: x0 => globalThis.$$.child(x0),
_260: (x0,x1) => globalThis.$$.append(x0,x1),
_261: x0 => globalThis.$$.source(x0),
_262: x0 => globalThis.$$.mutable_source(x0),
_263: (x0,x1) => globalThis.$$.mutate(x0,x1),
_264: (x0,x1) => globalThis.$$.set(x0,x1),
_265: x0 => globalThis.$$.user_effect(x0),
_266: f => finalizeWrapper(f,() => dartInstance.exports._266(f)),
_267: x0 => globalThis.$$.render_effect(x0),
_268: f => finalizeWrapper(f,() => dartInstance.exports._268(f)),
_269: x0 => globalThis.$$.derived(x0),
_270: f => finalizeWrapper(f,() => dartInstance.exports._270(f)),
_271: (x0,x1,x2,x3,x4,x5) => globalThis.$$.each(x0,x1,x2,x3,x4,x5),
_272: f => finalizeWrapper(f,() => dartInstance.exports._272(f)),
_273: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._273(f,x0,x1)),
_274: f => finalizeWrapper(f,(x0,x1,x2) => dartInstance.exports._274(f,x0,x1,x2)),
_276: (x0,x1,x2) => x0[x1] = x2,
_278: x0 => globalThis.$$.spread_props(x0),
_279: (x0,x1,x2,x3) => globalThis.$$.prop(x0,x1,x2,x3),
_280: x0 => x0.call(),
_281: (x0,x1,x2) => x0[x1] = x2,
_282: f => finalizeWrapper(f,() => dartInstance.exports._282(f)),
_283: x0 => ({get: x0}),
_284: (x0,x1,x2) => globalThis.Object.defineProperty(x0,x1,x2),
_287: x0 => globalThis.$$.delegate(x0),
_288: f => finalizeWrapper(f,x0 => dartInstance.exports._288(f,x0)),
_289: f => finalizeWrapper(f,x0 => dartInstance.exports._289(f,x0)),
_290: (x0,x1,x2,x3,x4) => globalThis.$$.await_block(x0,x1,x2,x3,x4),
_291: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._291(f,x0,x1)),
_292: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._292(f,x0,x1)),
_293: f => finalizeWrapper(f,() => dartInstance.exports._293(f)),
_294: f => finalizeWrapper(f,x0 => dartInstance.exports._294(f,x0)),
_295: x0 => x0.error,
_298: (x0,x1) => globalThis.$$.template(x0,x1),
_299: x0 => globalThis.$$.template(x0),
_316: (x0,x1,x2,x3,x4) => globalThis.$$.if_block(x0,x1,x2,x3,x4),
_317: f => finalizeWrapper(f,() => dartInstance.exports._317(f)),
_318: f => finalizeWrapper(f,x0 => dartInstance.exports._318(f,x0)),
_319: f => finalizeWrapper(f,x0 => dartInstance.exports._319(f,x0)),
_320: (x0,x1,x2) => globalThis.$$.html(x0,x1,x2),
_321: f => finalizeWrapper(f,() => dartInstance.exports._321(f)),
_353: x0 => ({target: x0}),
_356: (x0,x1) => globalThis.$$.mount(x0,x1),
_357: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._357(f,x0,x1)),
_892: (x0,x1) => x0.hash = x1,
_1576: (x0,x1) => x0.value = x1,
_1577: x0 => x0.value,
_2158: () => globalThis.window,
_2218: x0 => x0.location,
_2519: (x0,x1) => x0.hash = x1,
_2520: x0 => x0.hash,
_7126: (x0,x1) => x0.nodeValue = x1,
_7133: () => globalThis.document,
_7835: x0 => x0.clientX,
_7836: x0 => x0.clientY,
_8722: x0 => x0.ok,
_13002: v => stringToDartString(v.toString()),
_13017: () => {
          let stackString = new Error().stack.toString();
          let frames = stackString.split('\n');
          let drop = 2;
          if (frames[0] === 'Error') {
              drop += 1;
          }
          return frames.slice(drop).join('\n');
        },
_13026: s => stringToDartString(JSON.stringify(stringFromDartString(s))),
_13027: s => printToConsole(stringFromDartString(s)),
_13045: (c) =>
              queueMicrotask(() => dartInstance.exports.$invokeCallback(c)),
_13047: (a, i) => a.push(i),
_13055: (a, s, e) => a.slice(s, e),
_13058: a => a.length,
_13060: (a, i) => a[i],
_13061: (a, i, v) => a[i] = v,
_13063: a => a.join(''),
_13073: (s, p, i) => s.indexOf(p, i),
_13075: (o, offsetInBytes, lengthInBytes) => {
      var dst = new ArrayBuffer(lengthInBytes);
      new Uint8Array(dst).set(new Uint8Array(o, offsetInBytes, lengthInBytes));
      return new DataView(dst);
    },
_13076: (o, start, length) => new Uint8Array(o.buffer, o.byteOffset + start, length),
_13077: (o, start, length) => new Int8Array(o.buffer, o.byteOffset + start, length),
_13078: (o, start, length) => new Uint8ClampedArray(o.buffer, o.byteOffset + start, length),
_13079: (o, start, length) => new Uint16Array(o.buffer, o.byteOffset + start, length),
_13080: (o, start, length) => new Int16Array(o.buffer, o.byteOffset + start, length),
_13081: (o, start, length) => new Uint32Array(o.buffer, o.byteOffset + start, length),
_13082: (o, start, length) => new Int32Array(o.buffer, o.byteOffset + start, length),
_13085: (o, start, length) => new Float32Array(o.buffer, o.byteOffset + start, length),
_13086: (o, start, length) => new Float64Array(o.buffer, o.byteOffset + start, length),
_13090: (o) => new DataView(o.buffer, o.byteOffset, o.byteLength),
_13092: o => o.buffer,
_13093: o => o.byteOffset,
_13094: Function.prototype.call.bind(Object.getOwnPropertyDescriptor(DataView.prototype, 'byteLength').get),
_13095: (b, o) => new DataView(b, o),
_13097: Function.prototype.call.bind(DataView.prototype.getUint8),
_13098: Function.prototype.call.bind(DataView.prototype.setUint8),
_13099: Function.prototype.call.bind(DataView.prototype.getInt8),
_13100: Function.prototype.call.bind(DataView.prototype.setInt8),
_13101: Function.prototype.call.bind(DataView.prototype.getUint16),
_13102: Function.prototype.call.bind(DataView.prototype.setUint16),
_13103: Function.prototype.call.bind(DataView.prototype.getInt16),
_13104: Function.prototype.call.bind(DataView.prototype.setInt16),
_13105: Function.prototype.call.bind(DataView.prototype.getUint32),
_13106: Function.prototype.call.bind(DataView.prototype.setUint32),
_13107: Function.prototype.call.bind(DataView.prototype.getInt32),
_13108: Function.prototype.call.bind(DataView.prototype.setInt32),
_13113: Function.prototype.call.bind(DataView.prototype.getFloat32),
_13115: Function.prototype.call.bind(DataView.prototype.getFloat64),
_13134: (x0,x1,x2) => x0[x1] = x2,
_13136: o => o === undefined,
_13137: o => typeof o === 'boolean',
_13138: o => typeof o === 'number',
_13140: o => typeof o === 'string',
_13143: o => o instanceof Int8Array,
_13144: o => o instanceof Uint8Array,
_13145: o => o instanceof Uint8ClampedArray,
_13146: o => o instanceof Int16Array,
_13147: o => o instanceof Uint16Array,
_13148: o => o instanceof Int32Array,
_13149: o => o instanceof Uint32Array,
_13150: o => o instanceof Float32Array,
_13151: o => o instanceof Float64Array,
_13152: o => o instanceof ArrayBuffer,
_13153: o => o instanceof DataView,
_13154: o => o instanceof Array,
_13155: o => typeof o === 'function' && o[jsWrappedDartFunctionSymbol] === true,
_13159: (l, r) => l === r,
_13160: o => o,
_13161: o => o,
_13162: o => o,
_13163: b => !!b,
_13164: o => o.length,
_13167: (o, i) => o[i],
_13168: f => f.dartFunction,
_13169: l => arrayFromDartList(Int8Array, l),
_13170: l => arrayFromDartList(Uint8Array, l),
_13171: l => arrayFromDartList(Uint8ClampedArray, l),
_13172: l => arrayFromDartList(Int16Array, l),
_13173: l => arrayFromDartList(Uint16Array, l),
_13174: l => arrayFromDartList(Int32Array, l),
_13175: l => arrayFromDartList(Uint32Array, l),
_13176: l => arrayFromDartList(Float32Array, l),
_13177: l => arrayFromDartList(Float64Array, l),
_13178: (data, length) => {
          const view = new DataView(new ArrayBuffer(length));
          for (let i = 0; i < length; i++) {
              view.setUint8(i, dartInstance.exports.$byteDataGetUint8(data, i));
          }
          return view;
        },
_13179: l => arrayFromDartList(Array, l),
_13180: stringFromDartString,
_13181: stringToDartString,
_13182: () => ({}),
_13184: l => new Array(l),
_13185: () => globalThis,
_13186: (constructor, args) => {
      const factoryFunction = constructor.bind.apply(
          constructor, [null, ...args]);
      return new factoryFunction();
    },
_13188: (o, p) => o[p],
_13192: o => String(o),
_13193: (p, s, f) => p.then(s, f),
_13212: (o, p) => o[p],
_13213: (o, p, v) => o[p] = v
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

