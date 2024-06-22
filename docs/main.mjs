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

_11: () => new Array(),
_12: x0 => new Array(x0),
_13: x0 => new Promise(x0),
_17: (o,s) => o[s],
_18: (o,s,v) => o[s] = v,
_19: f => finalizeWrapper(f,x0 => dartInstance.exports._19(f,x0)),
_20: f => finalizeWrapper(f,x0 => dartInstance.exports._20(f,x0)),
_21: (x0,x1,x2) => x0.call(x1,x2),
_22: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._22(f,x0,x1)),
_45: () => Symbol("jsBoxedDartObjectProperty"),
_49: v => v.toString(),
_65: () => {
          let stackString = new Error().stack.toString();
          let frames = stackString.split('\n');
          let drop = 2;
          if (frames[0] === 'Error') {
              drop += 1;
          }
          return frames.slice(drop).join('\n');
        },
_85: s => JSON.stringify(s),
_86: s => printToConsole(s),
_87: (a, i) => a.push(i),
_94: (a, s) => a.join(s),
_95: (a, s, e) => a.slice(s, e),
_98: a => a.length,
_100: (a, i) => a[i],
_101: (a, i, v) => a[i] = v,
_103: (o, offsetInBytes, lengthInBytes) => {
      var dst = new ArrayBuffer(lengthInBytes);
      new Uint8Array(dst).set(new Uint8Array(o, offsetInBytes, lengthInBytes));
      return new DataView(dst);
    },
_104: (o, start, length) => new Uint8Array(o.buffer, o.byteOffset + start, length),
_105: (o, start, length) => new Int8Array(o.buffer, o.byteOffset + start, length),
_106: (o, start, length) => new Uint8ClampedArray(o.buffer, o.byteOffset + start, length),
_107: (o, start, length) => new Uint16Array(o.buffer, o.byteOffset + start, length),
_108: (o, start, length) => new Int16Array(o.buffer, o.byteOffset + start, length),
_109: (o, start, length) => new Uint32Array(o.buffer, o.byteOffset + start, length),
_110: (o, start, length) => new Int32Array(o.buffer, o.byteOffset + start, length),
_113: (o, start, length) => new Float32Array(o.buffer, o.byteOffset + start, length),
_114: (o, start, length) => new Float64Array(o.buffer, o.byteOffset + start, length),
_117: (o) => new DataView(o.buffer, o.byteOffset, o.byteLength),
_119: o => o.buffer,
_120: o => o.byteOffset,
_121: Function.prototype.call.bind(Object.getOwnPropertyDescriptor(DataView.prototype, 'byteLength').get),
_122: (b, o) => new DataView(b, o),
_124: Function.prototype.call.bind(DataView.prototype.getUint8),
_125: Function.prototype.call.bind(DataView.prototype.setUint8),
_126: Function.prototype.call.bind(DataView.prototype.getInt8),
_127: Function.prototype.call.bind(DataView.prototype.setInt8),
_128: Function.prototype.call.bind(DataView.prototype.getUint16),
_129: Function.prototype.call.bind(DataView.prototype.setUint16),
_130: Function.prototype.call.bind(DataView.prototype.getInt16),
_131: Function.prototype.call.bind(DataView.prototype.setInt16),
_132: Function.prototype.call.bind(DataView.prototype.getUint32),
_133: Function.prototype.call.bind(DataView.prototype.setUint32),
_134: Function.prototype.call.bind(DataView.prototype.getInt32),
_135: Function.prototype.call.bind(DataView.prototype.setInt32),
_140: Function.prototype.call.bind(DataView.prototype.getFloat32),
_142: Function.prototype.call.bind(DataView.prototype.getFloat64),
_166: (c) =>
              queueMicrotask(() => dartInstance.exports.$invokeCallback(c)),
_186: x0 => ({$$events: x0}),
_187: (x0,x1) => globalThis.$$.push(x0,x1),
_188: () => globalThis.$$.init(),
_189: x0 => x0.call(),
_190: (x0,x1) => globalThis.$$.append(x0,x1),
_191: () => globalThis.$$.pop(),
_192: x0 => ({$$events: x0}),
_193: () => globalThis.$$.comment(),
_194: x0 => globalThis.$$.child(x0),
_195: (x0,x1) => globalThis.$$.bubble_event(x0,x1),
_196: f => finalizeWrapper(f,x0 => dartInstance.exports._196(f,x0)),
_197: (x0,x1) => globalThis.$$.append(x0,x1),
_198: (x0,x1) => x0.alert(x1),
_199: () => globalThis.$$.comment(),
_200: x0 => globalThis.$$.first_child(x0),
_201: f => finalizeWrapper(f,x0 => dartInstance.exports._201(f,x0)),
_202: (x0,x1) => globalThis.$$.append(x0,x1),
_203: (x0,x1) => x0.querySelector(x1),
_204: (x0,x1) => x0.querySelector(x1),
_205: (x0,x1) => x0.querySelector(x1),
_206: x0 => globalThis.$$.unmount(x0),
_207: f => finalizeWrapper(f,x0 => dartInstance.exports._207(f,x0)),
_208: (x0,x1,x2) => x0.addEventListener(x1,x2),
_209: x0 => new Event(x0),
_210: x0 => x0.call(),
_211: x0 => x0.call(),
_212: (x0,x1) => globalThis.$$.template(x0,x1),
_213: x0 => globalThis.$$.template(x0),
_214: () => globalThis.$$.comment(),
_215: (x0,x1) => globalThis.$$.append(x0,x1),
_216: x0 => ({$$events: x0}),
_217: (x0,x1) => globalThis.$$.bubble_event(x0,x1),
_218: (x0,x1,x2) => globalThis.$$.append_styles(x0,x1,x2),
_219: x0 => globalThis.$$.first_child(x0),
_220: f => finalizeWrapper(f,x0 => dartInstance.exports._220(f,x0)),
_221: x0 => ({$$events: x0}),
_222: (x0,x1) => globalThis.$$.push(x0,x1),
_223: () => globalThis.$$.init(),
_224: () => globalThis.$$.pop(),
_225: x0 => globalThis.$$.first_child(x0),
_226: f => finalizeWrapper(f,x0 => dartInstance.exports._226(f,x0)),
_229: x0 => globalThis.$$.child(x0),
_230: (x0,x1,x2) => globalThis.$$.set_attribute(x0,x1,x2),
_231: x0 => globalThis.$$.sibling(x0),
_232: (x0,x1,x2) => globalThis.$$.set_attribute(x0,x1,x2),
_233: (x0,x1,x2) => globalThis.$$.append_styles(x0,x1,x2),
_234: x0 => globalThis.$$.child(x0),
_235: x0 => globalThis.$$.child(x0),
_236: x0 => globalThis.$$.child(x0),
_237: x0 => globalThis.$$.child(x0),
_238: () => ({}),
_239: x0 => globalThis.$$.child(x0),
_240: x0 => globalThis.$$.child(x0),
_241: (x0,x1,x2,x3) => ({name: x0,version: x1,speed: x2,website: x3}),
_246: x0 => globalThis.$$.child(x0),
_247: x0 => globalThis.$$.child(x0),
_248: (x0,x1) => globalThis.$$.set_text(x0,x1),
_249: (x0,x1) => globalThis.$$.set_text(x0,x1),
_250: (x0,x1,x2) => globalThis.$$.set_attribute(x0,x1,x2),
_251: (x0,x1,x2) => globalThis.$$.set_attribute(x0,x1,x2),
_252: x0 => globalThis.$$.child(x0),
_253: x0 => ({answer: x0}),
_255: x0 => globalThis.$$.child(x0),
_256: (x0,x1) => globalThis.$$.set_text(x0,x1),
_257: x0 => globalThis.$$.first_child(x0),
_258: (x0,x1) => globalThis.$$.sibling(x0,x1),
_259: () => ({}),
_260: x0 => ({answer: x0}),
_263: x0 => globalThis.$$.child(x0),
_264: (x0,x1) => globalThis.$$.set_text(x0,x1),
_265: x0 => globalThis.$$.first_child(x0),
_266: x0 => globalThis.$$.first_child(x0),
_267: (x0,x1,x2) => globalThis.$$.append_styles(x0,x1,x2),
_268: (x0,x1) => globalThis.$$.push(x0,x1),
_269: () => globalThis.$$.init(),
_270: x0 => globalThis.$$.first_child(x0),
_271: x0 => globalThis.$$.child(x0),
_272: x0 => globalThis.$$.remove_input_attr_defaults(x0),
_273: x0 => globalThis.$$.child(x0),
_274: x0 => globalThis.$$.remove_input_attr_defaults(x0),
_275: x0 => globalThis.$$.child(x0),
_276: x0 => globalThis.$$.remove_input_attr_defaults(x0),
_277: x0 => globalThis.$$.child(x0),
_278: x0 => globalThis.$$.remove_input_attr_defaults(x0),
_279: (x0,x1) => globalThis.$$.set_text(x0,x1),
_280: x0 => globalThis.$$.first_child(x0),
_281: x0 => globalThis.$$.child(x0),
_282: (x0,x1) => globalThis.$$.set_text(x0,x1),
_283: () => globalThis.$$.pop(),
_284: (x0,x1) => x0.__value = x1,
_285: x0 => globalThis.$$.first_child(x0),
_286: x0 => globalThis.$$.child(x0),
_287: x0 => globalThis.$$.remove_input_attr_defaults(x0),
_288: x0 => globalThis.$$.first_child(x0),
_289: x0 => globalThis.$$.child(x0),
_290: x0 => globalThis.$$.remove_input_attr_defaults(x0),
_291: x0 => globalThis.$$.remove_input_attr_defaults(x0),
_292: x0 => globalThis.$$.child(x0),
_293: x0 => globalThis.$$.remove_input_attr_defaults(x0),
_294: x0 => globalThis.$$.remove_input_attr_defaults(x0),
_295: x0 => globalThis.$$.child(x0),
_296: (x0,x1) => globalThis.$$.set_text(x0,x1),
_297: x0 => globalThis.$$.first_child(x0),
_298: x0 => globalThis.$$.remove_input_attr_defaults(x0),
_299: x0 => globalThis.$$.child(x0),
_300: (x0,x1) => globalThis.$$.set_text(x0,x1),
_301: x0 => globalThis.$$.child(x0),
_302: (x0,x1) => globalThis.$$.set_text(x0,x1),
_303: (x0,x1,x2) => globalThis.$$.append_styles(x0,x1,x2),
_304: x0 => globalThis.$$.child(x0),
_305: (x0,x1) => globalThis.$$.set_text(x0,x1),
_306: (x0,x1,x2) => globalThis.$$.append_styles(x0,x1,x2),
_307: (x0,x1) => x0.fetch(x1),
_308: x0 => x0.text(),
_309: x0 => globalThis.$$.child(x0),
_310: x0 => globalThis.$$.child(x0),
_311: x0 => globalThis.$$.child(x0),
_312: (x0,x1) => globalThis.$$.set_text(x0,x1),
_313: x0 => globalThis.$$.first_child(x0),
_314: x0 => globalThis.$$.child(x0),
_315: x0 => globalThis.$$.child(x0),
_316: (x0,x1,x2) => globalThis.$$.set_attribute(x0,x1,x2),
_317: (x0,x1) => globalThis.$$.set_text(x0,x1),
_318: x0 => globalThis.$$.first_child(x0),
_319: x0 => globalThis.$$.child(x0),
_320: x0 => globalThis.$$.first_child(x0),
_321: x0 => globalThis.$$.child(x0),
_322: x0 => globalThis.$$.child(x0),
_323: x0 => globalThis.$$.first_child(x0),
_324: x0 => globalThis.$$.first_child(x0),
_325: (x0,x1) => globalThis.$$.push(x0,x1),
_326: () => globalThis.$$.legacy_pre_effect_reset(),
_327: x0 => globalThis.$$.child(x0),
_328: (x0,x1) => globalThis.$$.set_text(x0,x1),
_329: () => globalThis.$$.pop(),
_330: (x0,x1) => globalThis.$$.push(x0,x1),
_331: () => globalThis.$$.legacy_pre_effect_reset(),
_332: x0 => globalThis.$$.first_child(x0),
_333: x0 => globalThis.$$.child(x0),
_334: x0 => globalThis.$$.child(x0),
_335: x0 => globalThis.$$.child(x0),
_336: (x0,x1) => globalThis.$$.set_text(x0,x1),
_337: (x0,x1) => globalThis.$$.set_text(x0,x1),
_338: (x0,x1) => globalThis.$$.set_text(x0,x1),
_339: () => globalThis.$$.pop(),
_340: x0 => globalThis.$$.child(x0),
_341: (x0,x1) => globalThis.$$.set_text(x0,x1),
_342: x0 => globalThis.$$.child(x0),
_343: (x0,x1,x2) => globalThis.$$.append_styles(x0,x1,x2),
_344: (x0,x1,x2) => globalThis.$$.set_attribute(x0,x1,x2),
_345: (x0,x1,x2) => globalThis.$$.set_attribute(x0,x1,x2),
_346: x0 => globalThis.$$.child(x0),
_350: (x0,x1,x2) => globalThis.$$.bind_value(x0,x1,x2),
_351: f => finalizeWrapper(f,() => dartInstance.exports._351(f)),
_352: f => finalizeWrapper(f,x0 => dartInstance.exports._352(f,x0)),
_355: f => finalizeWrapper(f,() => dartInstance.exports._355(f)),
_356: f => finalizeWrapper(f,x0 => dartInstance.exports._356(f,x0)),
_357: (x0,x1,x2,x3,x4) => globalThis.$$.bind_group(x0,x1,x2,x3,x4),
_358: f => finalizeWrapper(f,() => dartInstance.exports._358(f)),
_359: f => finalizeWrapper(f,x0 => dartInstance.exports._359(f,x0)),
_360: f => finalizeWrapper(f,() => dartInstance.exports._360(f)),
_361: f => finalizeWrapper(f,x0 => dartInstance.exports._361(f,x0)),
_362: (x0,x1,x2) => globalThis.$$.bind_checked(x0,x1,x2),
_363: f => finalizeWrapper(f,() => dartInstance.exports._363(f)),
_364: f => finalizeWrapper(f,x0 => dartInstance.exports._364(f,x0)),
_367: (x0,x1,x2,x3,x4) => globalThis.$$.if_block(x0,x1,x2,x3,x4),
_368: f => finalizeWrapper(f,() => dartInstance.exports._368(f)),
_369: f => finalizeWrapper(f,x0 => dartInstance.exports._369(f,x0)),
_370: f => finalizeWrapper(f,x0 => dartInstance.exports._370(f,x0)),
_371: (x0,x1,x2,x3) => globalThis.$$.html(x0,x1,x2,x3),
_372: f => finalizeWrapper(f,() => dartInstance.exports._372(f)),
_373: (x0,x1,x2,x3,x4,x5) => globalThis.$$.each(x0,x1,x2,x3,x4,x5),
_374: f => finalizeWrapper(f,() => dartInstance.exports._374(f)),
_375: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._375(f,x0,x1)),
_376: f => finalizeWrapper(f,(x0,x1,x2) => dartInstance.exports._376(f,x0,x1,x2)),
_378: (x0,x1,x2,x3,x4) => globalThis.$$.await_block(x0,x1,x2,x3,x4),
_379: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._379(f,x0,x1)),
_380: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._380(f,x0,x1)),
_381: f => finalizeWrapper(f,() => dartInstance.exports._381(f)),
_382: f => finalizeWrapper(f,x0 => dartInstance.exports._382(f,x0)),
_383: x0 => x0.error,
_397: (x0,x1) => ({anchor: x0,target: x1}),
_398: (x0,x1) => globalThis.$$.mount(x0,x1),
_399: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._399(f,x0,x1)),
_402: () => globalThis.$$.createEventDispatcher(),
_403: (x0,x1) => ({bubbles: x0,cancelable: x1}),
_404: (x0,x1,x2,x3,x4) => x0.call(x1,x2,x3,x4),
_405: (x0,x1,x2,x3,x4) => globalThis.$$.event(x0,x1,x2,x3,x4),
_406: f => finalizeWrapper(f,x0 => dartInstance.exports._406(f,x0)),
_407: a => a.join(''),
_417: (s, p, i) => s.indexOf(p, i),
_435: o => o === undefined,
_436: o => typeof o === 'boolean',
_437: o => typeof o === 'number',
_439: o => typeof o === 'string',
_442: o => o instanceof Int8Array,
_443: o => o instanceof Uint8Array,
_444: o => o instanceof Uint8ClampedArray,
_445: o => o instanceof Int16Array,
_446: o => o instanceof Uint16Array,
_447: o => o instanceof Int32Array,
_448: o => o instanceof Uint32Array,
_449: o => o instanceof Float32Array,
_450: o => o instanceof Float64Array,
_451: o => o instanceof ArrayBuffer,
_452: o => o instanceof DataView,
_453: o => o instanceof Array,
_454: o => typeof o === 'function' && o[jsWrappedDartFunctionSymbol] === true,
_458: (l, r) => l === r,
_459: o => o,
_460: o => o,
_461: o => o,
_462: b => !!b,
_463: o => o.length,
_466: (o, i) => o[i],
_467: f => f.dartFunction,
_468: l => arrayFromDartList(Int8Array, l),
_469: l => arrayFromDartList(Uint8Array, l),
_470: l => arrayFromDartList(Uint8ClampedArray, l),
_471: l => arrayFromDartList(Int16Array, l),
_472: l => arrayFromDartList(Uint16Array, l),
_473: l => arrayFromDartList(Int32Array, l),
_474: l => arrayFromDartList(Uint32Array, l),
_475: l => arrayFromDartList(Float32Array, l),
_476: l => arrayFromDartList(Float64Array, l),
_477: (data, length) => {
          const view = new DataView(new ArrayBuffer(length));
          for (let i = 0; i < length; i++) {
              view.setUint8(i, dartInstance.exports.$byteDataGetUint8(data, i));
          }
          return view;
        },
_478: l => arrayFromDartList(Array, l),
_479:     (s, length) => {
        let result = '';
        let index = 0;
        while (index < length) {
          let chunkLength = Math.min(length - index, 0xFFFF);
          const array = new Array(chunkLength);
          for (let i = 0; i < chunkLength; i++) {
              array[i] = dartInstance.exports.$stringRead(s, index++);
          }
          result += String.fromCharCode(...array);
        }
        return result;
    }
    ,
_480:     (s, length) => {
      let range = 0;
      for (let i = 0; i < length; i++) {
        range |= s.codePointAt(i);
      }
      if (range < 256) {
        const dartString = dartInstance.exports.$stringAllocate1(length);
        for (let i = 0; i < length; i++) {
            dartInstance.exports.$stringWrite1(dartString, i, s.codePointAt(i));
        }
        return dartString;
      } else {
        const dartString = dartInstance.exports.$stringAllocate2(length);
        for (let i = 0; i < length; i++) {
            dartInstance.exports.$stringWrite2(dartString, i, s.charCodeAt(i));
        }
        return dartString;
      }
    }
    ,
_481: () => ({}),
_483: l => new Array(l),
_484: () => globalThis,
_485: (constructor, args) => {
      const factoryFunction = constructor.bind.apply(
          constructor, [null, ...args]);
      return new factoryFunction();
    },
_487: (o, p) => o[p],
_491: o => String(o),
_492: (p, s, f) => p.then(s, f),
_511: (o, p) => o[p],
_512: (o, p, v) => o[p] = v,
_514: x0 => x0.length,
_516: (x0,x1,x2) => x0[x1] = x2,
_517: (x0,x1) => x0[x1],
_518: (x0,x1,x2) => x0[x1] = x2,
_519: x0 => globalThis.$$.get(x0),
_523: x0 => globalThis.$$.mutable_source(x0),
_524: (x0,x1) => globalThis.$$.mutate(x0,x1),
_525: (x0,x1) => globalThis.$$.set(x0,x1),
_528: (x0,x1) => globalThis.$$.legacy_pre_effect(x0,x1),
_529: f => finalizeWrapper(f,() => dartInstance.exports._529(f)),
_530: f => finalizeWrapper(f,() => dartInstance.exports._530(f)),
_532: x0 => globalThis.$$.template_effect(x0),
_533: f => finalizeWrapper(f,() => dartInstance.exports._533(f)),
_537: x0 => globalThis.$$.spread_props(x0),
_538: (x0,x1) => globalThis.$$.prop(x0,x1),
_539: x0 => x0.call(),
_540: (x0,x1,x2,x3) => globalThis.$$.prop(x0,x1,x2,x3),
_543: (x0,x1,x2) => globalThis.$$.set_getter(x0,x1,x2),
_544: f => finalizeWrapper(f,() => dartInstance.exports._544(f)),
_1078: (x0,x1) => x0.hash = x1,
_1676: (x0,x1) => x0.value = x1,
_1706: (x0,x1) => x0.disabled = x1,
_1762: (x0,x1) => x0.value = x1,
_1763: x0 => x0.value,
_2344: () => globalThis.window,
_2404: x0 => x0.location,
_2705: (x0,x1) => x0.hash = x1,
_2706: x0 => x0.hash,
_7203: x0 => x0.detail,
_7312: (x0,x1) => x0.nodeValue = x1,
_7319: () => globalThis.document,
_8021: x0 => x0.clientX,
_8022: x0 => x0.clientY,
_8908: x0 => x0.ok,
_13185: (x0,x1,x2) => x0[x1] = x2
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

