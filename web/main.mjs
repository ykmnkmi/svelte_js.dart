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
_45: (x0,x1) => x0.__click = x1,
_47: x0 => x0.message,
_49: (x0,x1) => globalThis.$$.push(x0,x1),
_50: x0 => x0.call(),
_51: (x0,x1) => globalThis.$$.append(x0,x1),
_52: () => globalThis.$$.pop(),
_53: (x0,x1) => globalThis.$$.push(x0,x1),
_54: () => globalThis.$$.comment(),
_55: x0 => globalThis.$$.child(x0),
_56: x0 => globalThis.$$.getter(x0),
_57: (x0,x1) => globalThis.$$.append(x0,x1),
_58: () => globalThis.$$.pop(),
_59: (x0,x1) => globalThis.$$.push(x0,x1),
_60: (x0,x1) => x0.alert(x1),
_61: () => globalThis.$$.comment(),
_62: x0 => globalThis.$$.child(x0),
_63: (x0,x1) => globalThis.$$.append(x0,x1),
_64: () => globalThis.$$.pop(),
_65: (x0,x1) => x0.querySelector(x1),
_66: (x0,x1) => x0.querySelector(x1),
_67: (x0,x1) => x0.querySelector(x1),
_68: x0 => globalThis.$$.unmount(x0),
_69: f => finalizeWrapper(f,x0 => dartInstance.exports._69(f,x0)),
_70: (x0,x1,x2) => x0.addEventListener(x1,x2),
_71: x0 => new Event(x0),
_72: x0 => globalThis.$$.get(x0),
_73: (x0,x1) => globalThis.$$.push(x0,x1),
_74: () => globalThis.$$.pop(),
_75: (x0,x1) => x0.__click = x1,
_76: x0 => ({onclick: x0}),
_77: x0 => x0.onclick,
_79: (x0,x1,x2) => globalThis.$$.append_styles(x0,x1,x2),
_80: x0 => x0.call(),
_81: (x0,x1) => globalThis.$$.append(x0,x1),
_82: () => globalThis.$$.comment(),
_83: x0 => globalThis.$$.child(x0),
_84: (x0,x1) => globalThis.$$.append(x0,x1),
_85: (x0,x1) => x0.__click = x1,
_86: x0 => ({message: x0}),
_87: x0 => x0.message,
_89: x0 => x0.call(),
_90: (x0,x1) => globalThis.$$.append(x0,x1),
_91: () => globalThis.$$.comment(),
_92: x0 => globalThis.$$.child(x0),
_93: (x0,x1) => globalThis.$$.append(x0,x1),
_95: x0 => x0.current,
_96: (x0,x1,x2) => globalThis.$$.append_styles(x0,x1,x2),
_97: x0 => x0.call(),
_98: x0 => globalThis.$$.child(x0),
_99: (x0,x1,x2) => globalThis.$$.set_attribute(x0,x1,x2),
_100: x0 => globalThis.$$.sibling(x0),
_101: x0 => globalThis.$$.sibling(x0),
_102: (x0,x1,x2) => globalThis.$$.set_attribute(x0,x1,x2),
_103: (x0,x1) => globalThis.$$.append(x0,x1),
_104: (x0,x1) => x0.__click = x1,
_105: x0 => x0.call(),
_106: x0 => globalThis.$$.child(x0),
_107: x0 => globalThis.$$.sibling(x0),
_108: x0 => globalThis.$$.sibling(x0),
_109: x0 => globalThis.$$.child(x0),
_110: x0 => globalThis.$$.child(x0),
_111: x0 => globalThis.$$.sibling(x0),
_112: x0 => globalThis.$$.sibling(x0),
_113: () => globalThis.$$.comment(),
_114: x0 => globalThis.$$.child(x0),
_115: () => ({}),
_116: (x0,x1) => globalThis.$$.append(x0,x1),
_117: x0 => globalThis.$$.sibling(x0),
_118: x0 => globalThis.$$.sibling(x0),
_119: x0 => globalThis.$$.child(x0),
_120: x0 => globalThis.$$.sibling(x0),
_121: x0 => globalThis.$$.sibling(x0),
_122: () => globalThis.$$.comment(),
_123: x0 => globalThis.$$.child(x0),
_124: (x0,x1) => globalThis.$$.append(x0,x1),
_125: (x0,x1) => globalThis.$$.append(x0,x1),
_127: x0 => x0.name,
_128: x0 => x0.version,
_129: x0 => x0.speed,
_130: x0 => x0.website,
_131: x0 => x0.call(),
_132: x0 => globalThis.$$.child(x0),
_133: x0 => globalThis.$$.sibling(x0),
_134: x0 => globalThis.$$.child(x0),
_135: x0 => globalThis.$$.sibling(x0),
_136: x0 => globalThis.$$.sibling(x0),
_137: x0 => globalThis.$$.sibling(x0),
_138: x0 => globalThis.$$.sibling(x0),
_139: (x0,x1) => globalThis.$$.set_text(x0,x1),
_140: (x0,x1) => globalThis.$$.set_text(x0,x1),
_141: (x0,x1,x2) => globalThis.$$.set_attribute(x0,x1,x2),
_142: (x0,x1,x2) => globalThis.$$.set_attribute(x0,x1,x2),
_143: (x0,x1) => globalThis.$$.append(x0,x1),
_144: () => globalThis.$$.comment(),
_145: x0 => globalThis.$$.child(x0),
_146: (x0,x1) => globalThis.$$.append(x0,x1),
_147: x0 => ({answer: x0}),
_149: x0 => x0.call(),
_150: x0 => globalThis.$$.child(x0),
_151: (x0,x1) => globalThis.$$.set_text(x0,x1),
_152: (x0,x1) => globalThis.$$.append(x0,x1),
_153: x0 => x0.call(),
_154: x0 => globalThis.$$.child(x0),
_155: x0 => globalThis.$$.sibling(x0),
_156: x0 => globalThis.$$.sibling(x0),
_157: () => ({}),
_158: (x0,x1) => globalThis.$$.append(x0,x1),
_159: x0 => ({answer: x0}),
_160: x0 => x0.answer,
_162: x0 => x0.call(),
_163: x0 => globalThis.$$.child(x0),
_164: (x0,x1) => globalThis.$$.set_text(x0,x1),
_165: (x0,x1) => globalThis.$$.append(x0,x1),
_166: () => globalThis.$$.comment(),
_167: x0 => globalThis.$$.child(x0),
_168: (x0,x1) => globalThis.$$.append(x0,x1),
_169: x0 => x0.call(),
_170: (x0,x1) => globalThis.$$.append(x0,x1),
_171: (x0,x1,x2) => globalThis.$$.append_styles(x0,x1,x2),
_172: x0 => x0.call(),
_173: x0 => globalThis.$$.child(x0),
_174: x0 => globalThis.$$.sibling(x0),
_175: x0 => globalThis.$$.sibling(x0),
_176: (x0,x1) => globalThis.$$.append(x0,x1),
_177: (x0,x1) => x0.__click = x1,
_178: x0 => x0.call(),
_179: (x0,x1) => globalThis.$$.append(x0,x1),
_180: (x0,x1) => x0.__mousemove = x1,
_181: (x0,x1,x2) => globalThis.$$.append_styles(x0,x1,x2),
_182: x0 => x0.call(),
_183: x0 => globalThis.$$.child(x0),
_184: (x0,x1) => globalThis.$$.set_text(x0,x1),
_185: (x0,x1) => globalThis.$$.append(x0,x1),
_186: (x0,x1) => x0.__mousemove = x1,
_187: (x0,x1,x2) => globalThis.$$.append_styles(x0,x1,x2),
_188: x0 => x0.call(),
_189: x0 => globalThis.$$.child(x0),
_190: (x0,x1) => globalThis.$$.set_text(x0,x1),
_191: (x0,x1) => globalThis.$$.append(x0,x1),
_192: (x0,x1) => x0.__click = x1,
_193: (x0,x1) => x0.fetch(x1),
_194: x0 => x0.text(),
_195: x0 => x0.call(),
_196: x0 => globalThis.$$.child(x0),
_197: x0 => globalThis.$$.sibling(x0),
_198: x0 => globalThis.$$.sibling(x0),
_199: x0 => x0.call(),
_200: (x0,x1) => globalThis.$$.append(x0,x1),
_201: x0 => x0.call(),
_202: x0 => globalThis.$$.child(x0),
_203: (x0,x1) => globalThis.$$.append(x0,x1),
_204: x0 => x0.call(),
_205: x0 => globalThis.$$.child(x0),
_206: (x0,x1) => globalThis.$$.set_text(x0,x1),
_207: (x0,x1) => globalThis.$$.append(x0,x1),
_208: (x0,x1) => globalThis.$$.append(x0,x1),
_209: x0 => x0.call(),
_210: x0 => globalThis.$$.child(x0),
_211: x0 => globalThis.$$.sibling(x0),
_212: x0 => globalThis.$$.sibling(x0),
_213: x0 => x0.call(),
_214: x0 => globalThis.$$.child(x0),
_215: x0 => globalThis.$$.child(x0),
_216: (x0,x1,x2) => globalThis.$$.set_attribute(x0,x1,x2),
_217: (x0,x1) => globalThis.$$.set_text(x0,x1),
_218: (x0,x1) => globalThis.$$.append(x0,x1),
_219: (x0,x1) => globalThis.$$.append(x0,x1),
_220: () => globalThis.$$.comment(),
_221: x0 => globalThis.$$.child(x0),
_222: x0 => x0.call(),
_223: x0 => globalThis.$$.child(x0),
_224: (x0,x1) => globalThis.$$.append(x0,x1),
_225: () => globalThis.$$.comment(),
_226: x0 => globalThis.$$.child(x0),
_227: x0 => x0.call(),
_228: x0 => globalThis.$$.child(x0),
_229: (x0,x1) => globalThis.$$.append(x0,x1),
_230: x0 => x0.call(),
_231: x0 => globalThis.$$.child(x0),
_232: (x0,x1) => globalThis.$$.append(x0,x1),
_233: (x0,x1) => globalThis.$$.append(x0,x1),
_234: (x0,x1) => globalThis.$$.append(x0,x1),
_235: (x0,x1) => x0.__click = x1,
_236: () => globalThis.$$.comment(),
_237: x0 => globalThis.$$.child(x0),
_238: x0 => x0.call(),
_239: (x0,x1) => globalThis.$$.append(x0,x1),
_240: x0 => x0.call(),
_241: (x0,x1) => globalThis.$$.append(x0,x1),
_242: (x0,x1) => globalThis.$$.append(x0,x1),
_243: (x0,x1) => x0.__click = x1,
_244: x0 => x0.call(),
_245: x0 => globalThis.$$.child(x0),
_246: x0 => x0.call(),
_247: (x0,x1) => globalThis.$$.append(x0,x1),
_248: x0 => globalThis.$$.sibling(x0),
_249: x0 => globalThis.$$.sibling(x0),
_250: x0 => x0.call(),
_251: (x0,x1) => globalThis.$$.append(x0,x1),
_252: (x0,x1) => globalThis.$$.append(x0,x1),
_253: (x0,x1) => x0.__click = x1,
_254: x0 => x0.call(),
_255: x0 => globalThis.$$.child(x0),
_256: (x0,x1) => globalThis.$$.set_text(x0,x1),
_257: (x0,x1) => globalThis.$$.append(x0,x1),
_258: (x0,x1) => x0.__click = x1,
_259: x0 => x0.call(),
_260: x0 => globalThis.$$.child(x0),
_261: x0 => globalThis.$$.child(x0),
_262: x0 => globalThis.$$.sibling(x0),
_263: x0 => globalThis.$$.sibling(x0),
_264: x0 => globalThis.$$.child(x0),
_265: x0 => globalThis.$$.sibling(x0),
_266: x0 => globalThis.$$.sibling(x0),
_267: x0 => globalThis.$$.child(x0),
_268: (x0,x1) => globalThis.$$.set_text(x0,x1),
_269: (x0,x1) => globalThis.$$.set_text(x0,x1),
_270: (x0,x1) => globalThis.$$.set_text(x0,x1),
_271: (x0,x1) => globalThis.$$.append(x0,x1),
_272: (x0,x1) => x0.__click = x1,
_273: x0 => x0.call(),
_274: x0 => globalThis.$$.child(x0),
_275: (x0,x1) => globalThis.$$.set_text(x0,x1),
_276: (x0,x1) => globalThis.$$.append(x0,x1),
_277: x0 => x0.call(),
_278: x0 => globalThis.$$.child(x0),
_279: (x0,x1) => globalThis.$$.append(x0,x1),
_280: (x0,x1,x2) => globalThis.$$.append_styles(x0,x1,x2),
_281: x0 => x0.call(),
_282: (x0,x1) => globalThis.$$.append(x0,x1),
_283: x0 => x0.call(),
_284: (x0,x1,x2) => globalThis.$$.set_attribute(x0,x1,x2),
_285: (x0,x1,x2) => globalThis.$$.set_attribute(x0,x1,x2),
_286: (x0,x1) => globalThis.$$.append(x0,x1),
_287: x0 => x0.call(),
_288: x0 => globalThis.$$.child(x0),
_289: (x0,x1) => globalThis.$$.append(x0,x1),
_290: x0 => globalThis.$$.source(x0),
_291: x0 => globalThis.$$.mutable_source(x0),
_292: (x0,x1) => globalThis.$$.mutate(x0,x1),
_293: (x0,x1) => globalThis.$$.set(x0,x1),
_294: x0 => globalThis.$$.user_effect(x0),
_295: f => finalizeWrapper(f,() => dartInstance.exports._295(f)),
_296: x0 => globalThis.$$.render_effect(x0),
_297: f => finalizeWrapper(f,() => dartInstance.exports._297(f)),
_298: x0 => globalThis.$$.derived(x0),
_299: f => finalizeWrapper(f,() => dartInstance.exports._299(f)),
_300: (x0,x1,x2,x3,x4,x5) => globalThis.$$.each(x0,x1,x2,x3,x4,x5),
_301: f => finalizeWrapper(f,() => dartInstance.exports._301(f)),
_302: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._302(f,x0,x1)),
_303: f => finalizeWrapper(f,(x0,x1,x2) => dartInstance.exports._303(f,x0,x1,x2)),
_305: (x0,x1,x2) => x0[x1] = x2,
_306: (x0,x1) => globalThis.$$.rest_props(x0,x1),
_308: x0 => globalThis.$$.spread_props(x0),
_309: (x0,x1,x2,x3) => globalThis.$$.prop(x0,x1,x2,x3),
_310: x0 => x0.call(),
_312: (x0,x1,x2) => globalThis.$$.set_property(x0,x1,x2),
_313: (x0,x1,x2) => globalThis.$$.set_getter(x0,x1,x2),
_314: f => finalizeWrapper(f,() => dartInstance.exports._314(f)),
_315: x0 => globalThis.$$.delegate(x0),
_316: f => finalizeWrapper(f,x0 => dartInstance.exports._316(f,x0)),
_317: f => finalizeWrapper(f,x0 => dartInstance.exports._317(f,x0)),
_318: (x0,x1,x2,x3,x4) => globalThis.$$.await_block(x0,x1,x2,x3,x4),
_319: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._319(f,x0,x1)),
_320: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._320(f,x0,x1)),
_321: f => finalizeWrapper(f,() => dartInstance.exports._321(f)),
_322: f => finalizeWrapper(f,x0 => dartInstance.exports._322(f,x0)),
_323: x0 => x0.error,
_326: (x0,x1) => globalThis.$$.template(x0,x1),
_327: x0 => globalThis.$$.template(x0),
_344: (x0,x1,x2,x3,x4) => globalThis.$$.if_block(x0,x1,x2,x3,x4),
_345: f => finalizeWrapper(f,() => dartInstance.exports._345(f)),
_346: f => finalizeWrapper(f,x0 => dartInstance.exports._346(f,x0)),
_347: f => finalizeWrapper(f,x0 => dartInstance.exports._347(f,x0)),
_348: (x0,x1,x2) => globalThis.$$.html(x0,x1,x2),
_349: f => finalizeWrapper(f,() => dartInstance.exports._349(f)),
_381: x0 => ({target: x0}),
_384: (x0,x1) => globalThis.$$.mount(x0,x1),
_385: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._385(f,x0,x1)),
_920: (x0,x1) => x0.hash = x1,
_1604: (x0,x1) => x0.value = x1,
_1605: x0 => x0.value,
_2186: () => globalThis.window,
_2246: x0 => x0.location,
_2547: (x0,x1) => x0.hash = x1,
_2548: x0 => x0.hash,
_7143: x0 => x0.nodeName,
_7154: (x0,x1) => x0.nodeValue = x1,
_7161: () => globalThis.document,
_7863: x0 => x0.clientX,
_7864: x0 => x0.clientY,
_8750: x0 => x0.ok,
_13030: v => stringToDartString(v.toString()),
_13045: () => {
          let stackString = new Error().stack.toString();
          let frames = stackString.split('\n');
          let drop = 2;
          if (frames[0] === 'Error') {
              drop += 1;
          }
          return frames.slice(drop).join('\n');
        },
_13054: s => stringToDartString(JSON.stringify(stringFromDartString(s))),
_13055: s => printToConsole(stringFromDartString(s)),
_13073: (c) =>
              queueMicrotask(() => dartInstance.exports.$invokeCallback(c)),
_13075: (a, i) => a.push(i),
_13083: (a, s, e) => a.slice(s, e),
_13086: a => a.length,
_13088: (a, i) => a[i],
_13089: (a, i, v) => a[i] = v,
_13091: a => a.join(''),
_13101: (s, p, i) => s.indexOf(p, i),
_13103: (o, offsetInBytes, lengthInBytes) => {
      var dst = new ArrayBuffer(lengthInBytes);
      new Uint8Array(dst).set(new Uint8Array(o, offsetInBytes, lengthInBytes));
      return new DataView(dst);
    },
_13104: (o, start, length) => new Uint8Array(o.buffer, o.byteOffset + start, length),
_13105: (o, start, length) => new Int8Array(o.buffer, o.byteOffset + start, length),
_13106: (o, start, length) => new Uint8ClampedArray(o.buffer, o.byteOffset + start, length),
_13107: (o, start, length) => new Uint16Array(o.buffer, o.byteOffset + start, length),
_13108: (o, start, length) => new Int16Array(o.buffer, o.byteOffset + start, length),
_13109: (o, start, length) => new Uint32Array(o.buffer, o.byteOffset + start, length),
_13110: (o, start, length) => new Int32Array(o.buffer, o.byteOffset + start, length),
_13113: (o, start, length) => new Float32Array(o.buffer, o.byteOffset + start, length),
_13114: (o, start, length) => new Float64Array(o.buffer, o.byteOffset + start, length),
_13118: (o) => new DataView(o.buffer, o.byteOffset, o.byteLength),
_13120: o => o.buffer,
_13121: o => o.byteOffset,
_13122: Function.prototype.call.bind(Object.getOwnPropertyDescriptor(DataView.prototype, 'byteLength').get),
_13123: (b, o) => new DataView(b, o),
_13125: Function.prototype.call.bind(DataView.prototype.getUint8),
_13126: Function.prototype.call.bind(DataView.prototype.setUint8),
_13127: Function.prototype.call.bind(DataView.prototype.getInt8),
_13128: Function.prototype.call.bind(DataView.prototype.setInt8),
_13129: Function.prototype.call.bind(DataView.prototype.getUint16),
_13130: Function.prototype.call.bind(DataView.prototype.setUint16),
_13131: Function.prototype.call.bind(DataView.prototype.getInt16),
_13132: Function.prototype.call.bind(DataView.prototype.setInt16),
_13133: Function.prototype.call.bind(DataView.prototype.getUint32),
_13134: Function.prototype.call.bind(DataView.prototype.setUint32),
_13135: Function.prototype.call.bind(DataView.prototype.getInt32),
_13136: Function.prototype.call.bind(DataView.prototype.setInt32),
_13141: Function.prototype.call.bind(DataView.prototype.getFloat32),
_13143: Function.prototype.call.bind(DataView.prototype.getFloat64),
_13162: (x0,x1,x2) => x0[x1] = x2,
_13164: o => o === undefined,
_13165: o => typeof o === 'boolean',
_13166: o => typeof o === 'number',
_13168: o => typeof o === 'string',
_13171: o => o instanceof Int8Array,
_13172: o => o instanceof Uint8Array,
_13173: o => o instanceof Uint8ClampedArray,
_13174: o => o instanceof Int16Array,
_13175: o => o instanceof Uint16Array,
_13176: o => o instanceof Int32Array,
_13177: o => o instanceof Uint32Array,
_13178: o => o instanceof Float32Array,
_13179: o => o instanceof Float64Array,
_13180: o => o instanceof ArrayBuffer,
_13181: o => o instanceof DataView,
_13182: o => o instanceof Array,
_13183: o => typeof o === 'function' && o[jsWrappedDartFunctionSymbol] === true,
_13187: (l, r) => l === r,
_13188: o => o,
_13189: o => o,
_13190: o => o,
_13191: b => !!b,
_13192: o => o.length,
_13195: (o, i) => o[i],
_13196: f => f.dartFunction,
_13197: l => arrayFromDartList(Int8Array, l),
_13198: l => arrayFromDartList(Uint8Array, l),
_13199: l => arrayFromDartList(Uint8ClampedArray, l),
_13200: l => arrayFromDartList(Int16Array, l),
_13201: l => arrayFromDartList(Uint16Array, l),
_13202: l => arrayFromDartList(Int32Array, l),
_13203: l => arrayFromDartList(Uint32Array, l),
_13204: l => arrayFromDartList(Float32Array, l),
_13205: l => arrayFromDartList(Float64Array, l),
_13206: (data, length) => {
          const view = new DataView(new ArrayBuffer(length));
          for (let i = 0; i < length; i++) {
              view.setUint8(i, dartInstance.exports.$byteDataGetUint8(data, i));
          }
          return view;
        },
_13207: l => arrayFromDartList(Array, l),
_13208: stringFromDartString,
_13209: stringToDartString,
_13210: () => ({}),
_13212: l => new Array(l),
_13213: () => globalThis,
_13214: (constructor, args) => {
      const factoryFunction = constructor.bind.apply(
          constructor, [null, ...args]);
      return new factoryFunction();
    },
_13216: (o, p) => o[p],
_13220: o => String(o),
_13221: (p, s, f) => p.then(s, f),
_13240: (o, p) => o[p],
_13241: (o, p, v) => o[p] = v
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

