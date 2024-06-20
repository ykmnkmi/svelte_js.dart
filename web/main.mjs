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
_48: v => stringToDartString(v.toString()),
_64: () => {
          let stackString = new Error().stack.toString();
          let frames = stackString.split('\n');
          let drop = 2;
          if (frames[0] === 'Error') {
              drop += 1;
          }
          return frames.slice(drop).join('\n');
        },
_84: s => stringToDartString(JSON.stringify(stringFromDartString(s))),
_85: s => printToConsole(stringFromDartString(s)),
_88: (a, i) => a.push(i),
_96: (a, s, e) => a.slice(s, e),
_99: a => a.length,
_101: (a, i) => a[i],
_102: (a, i, v) => a[i] = v,
_104: a => a.join(''),
_114: (s, p, i) => s.indexOf(p, i),
_116: (o, offsetInBytes, lengthInBytes) => {
      var dst = new ArrayBuffer(lengthInBytes);
      new Uint8Array(dst).set(new Uint8Array(o, offsetInBytes, lengthInBytes));
      return new DataView(dst);
    },
_117: (o, start, length) => new Uint8Array(o.buffer, o.byteOffset + start, length),
_118: (o, start, length) => new Int8Array(o.buffer, o.byteOffset + start, length),
_119: (o, start, length) => new Uint8ClampedArray(o.buffer, o.byteOffset + start, length),
_120: (o, start, length) => new Uint16Array(o.buffer, o.byteOffset + start, length),
_121: (o, start, length) => new Int16Array(o.buffer, o.byteOffset + start, length),
_122: (o, start, length) => new Uint32Array(o.buffer, o.byteOffset + start, length),
_123: (o, start, length) => new Int32Array(o.buffer, o.byteOffset + start, length),
_126: (o, start, length) => new Float32Array(o.buffer, o.byteOffset + start, length),
_127: (o, start, length) => new Float64Array(o.buffer, o.byteOffset + start, length),
_132: (o) => new DataView(o.buffer, o.byteOffset, o.byteLength),
_134: o => o.buffer,
_135: o => o.byteOffset,
_136: Function.prototype.call.bind(Object.getOwnPropertyDescriptor(DataView.prototype, 'byteLength').get),
_137: (b, o) => new DataView(b, o),
_139: Function.prototype.call.bind(DataView.prototype.getUint8),
_140: Function.prototype.call.bind(DataView.prototype.setUint8),
_141: Function.prototype.call.bind(DataView.prototype.getInt8),
_142: Function.prototype.call.bind(DataView.prototype.setInt8),
_143: Function.prototype.call.bind(DataView.prototype.getUint16),
_144: Function.prototype.call.bind(DataView.prototype.setUint16),
_145: Function.prototype.call.bind(DataView.prototype.getInt16),
_146: Function.prototype.call.bind(DataView.prototype.setInt16),
_147: Function.prototype.call.bind(DataView.prototype.getUint32),
_148: Function.prototype.call.bind(DataView.prototype.setUint32),
_149: Function.prototype.call.bind(DataView.prototype.getInt32),
_150: Function.prototype.call.bind(DataView.prototype.setInt32),
_155: Function.prototype.call.bind(DataView.prototype.getFloat32),
_157: Function.prototype.call.bind(DataView.prototype.getFloat64),
_181: (c) =>
              queueMicrotask(() => dartInstance.exports.$invokeCallback(c)),
_201: x0 => ({$$events: x0}),
_202: (x0,x1) => globalThis.$$.push(x0,x1),
_203: () => globalThis.$$.init(),
_204: x0 => x0.call(),
_205: (x0,x1) => globalThis.$$.append(x0,x1),
_206: () => globalThis.$$.pop(),
_207: x0 => ({$$events: x0}),
_208: () => globalThis.$$.comment(),
_209: x0 => globalThis.$$.child(x0),
_210: (x0,x1) => globalThis.$$.bubble_event(x0,x1),
_211: f => finalizeWrapper(f,x0 => dartInstance.exports._211(f,x0)),
_212: (x0,x1) => globalThis.$$.append(x0,x1),
_213: (x0,x1) => x0.alert(x1),
_214: () => globalThis.$$.comment(),
_215: x0 => globalThis.$$.first_child(x0),
_216: f => finalizeWrapper(f,x0 => dartInstance.exports._216(f,x0)),
_217: (x0,x1) => globalThis.$$.append(x0,x1),
_218: (x0,x1) => x0.querySelector(x1),
_219: (x0,x1) => x0.querySelector(x1),
_220: (x0,x1) => x0.querySelector(x1),
_221: x0 => globalThis.$$.unmount(x0),
_222: f => finalizeWrapper(f,x0 => dartInstance.exports._222(f,x0)),
_223: (x0,x1,x2) => x0.addEventListener(x1,x2),
_224: x0 => new Event(x0),
_225: x0 => x0.call(),
_226: x0 => x0.call(),
_227: (x0,x1) => globalThis.$$.template(x0,x1),
_228: x0 => globalThis.$$.template(x0),
_229: () => globalThis.$$.comment(),
_230: (x0,x1) => globalThis.$$.append(x0,x1),
_231: x0 => ({$$events: x0}),
_232: (x0,x1) => globalThis.$$.bubble_event(x0,x1),
_233: (x0,x1,x2) => globalThis.$$.append_styles(x0,x1,x2),
_234: x0 => globalThis.$$.first_child(x0),
_235: f => finalizeWrapper(f,x0 => dartInstance.exports._235(f,x0)),
_236: x0 => ({$$events: x0}),
_237: (x0,x1) => globalThis.$$.push(x0,x1),
_238: () => globalThis.$$.init(),
_239: () => globalThis.$$.pop(),
_240: x0 => globalThis.$$.first_child(x0),
_241: f => finalizeWrapper(f,x0 => dartInstance.exports._241(f,x0)),
_244: x0 => globalThis.$$.child(x0),
_245: (x0,x1,x2) => globalThis.$$.set_attribute(x0,x1,x2),
_246: x0 => globalThis.$$.sibling(x0),
_247: (x0,x1,x2) => globalThis.$$.set_attribute(x0,x1,x2),
_248: (x0,x1,x2) => globalThis.$$.append_styles(x0,x1,x2),
_249: x0 => globalThis.$$.child(x0),
_250: x0 => globalThis.$$.child(x0),
_251: x0 => globalThis.$$.child(x0),
_252: x0 => globalThis.$$.child(x0),
_253: () => ({}),
_254: x0 => globalThis.$$.child(x0),
_255: x0 => globalThis.$$.child(x0),
_256: (x0,x1,x2,x3) => ({name: x0,version: x1,speed: x2,website: x3}),
_261: x0 => globalThis.$$.child(x0),
_262: x0 => globalThis.$$.child(x0),
_263: (x0,x1) => globalThis.$$.set_text(x0,x1),
_264: (x0,x1) => globalThis.$$.set_text(x0,x1),
_265: (x0,x1,x2) => globalThis.$$.set_attribute(x0,x1,x2),
_266: (x0,x1,x2) => globalThis.$$.set_attribute(x0,x1,x2),
_267: x0 => globalThis.$$.child(x0),
_268: x0 => ({answer: x0}),
_270: x0 => globalThis.$$.child(x0),
_271: (x0,x1) => globalThis.$$.set_text(x0,x1),
_272: x0 => globalThis.$$.first_child(x0),
_273: (x0,x1) => globalThis.$$.sibling(x0,x1),
_274: () => ({}),
_275: x0 => ({answer: x0}),
_278: x0 => globalThis.$$.child(x0),
_279: (x0,x1) => globalThis.$$.set_text(x0,x1),
_280: x0 => globalThis.$$.first_child(x0),
_281: x0 => globalThis.$$.first_child(x0),
_282: (x0,x1,x2) => globalThis.$$.append_styles(x0,x1,x2),
_283: x0 => globalThis.$$.first_child(x0),
_284: x0 => globalThis.$$.child(x0),
_285: x0 => globalThis.$$.remove_input_attr_defaults(x0),
_286: x0 => globalThis.$$.first_child(x0),
_287: x0 => globalThis.$$.child(x0),
_288: x0 => globalThis.$$.remove_input_attr_defaults(x0),
_289: x0 => globalThis.$$.remove_input_attr_defaults(x0),
_290: x0 => globalThis.$$.child(x0),
_291: x0 => globalThis.$$.remove_input_attr_defaults(x0),
_292: x0 => globalThis.$$.remove_input_attr_defaults(x0),
_293: x0 => globalThis.$$.child(x0),
_294: (x0,x1) => globalThis.$$.set_text(x0,x1),
_295: x0 => globalThis.$$.first_child(x0),
_296: x0 => globalThis.$$.remove_input_attr_defaults(x0),
_297: x0 => globalThis.$$.child(x0),
_298: (x0,x1) => globalThis.$$.set_text(x0,x1),
_299: x0 => globalThis.$$.child(x0),
_300: (x0,x1) => globalThis.$$.set_text(x0,x1),
_301: (x0,x1,x2) => globalThis.$$.append_styles(x0,x1,x2),
_302: x0 => globalThis.$$.child(x0),
_303: (x0,x1) => globalThis.$$.set_text(x0,x1),
_304: (x0,x1,x2) => globalThis.$$.append_styles(x0,x1,x2),
_305: (x0,x1) => x0.fetch(x1),
_306: x0 => x0.text(),
_307: x0 => globalThis.$$.child(x0),
_308: x0 => globalThis.$$.child(x0),
_309: x0 => globalThis.$$.child(x0),
_310: (x0,x1) => globalThis.$$.set_text(x0,x1),
_311: x0 => globalThis.$$.first_child(x0),
_312: x0 => globalThis.$$.child(x0),
_313: x0 => globalThis.$$.child(x0),
_314: (x0,x1,x2) => globalThis.$$.set_attribute(x0,x1,x2),
_315: (x0,x1) => globalThis.$$.set_text(x0,x1),
_316: x0 => globalThis.$$.first_child(x0),
_317: x0 => globalThis.$$.child(x0),
_318: x0 => globalThis.$$.first_child(x0),
_319: x0 => globalThis.$$.child(x0),
_320: x0 => globalThis.$$.child(x0),
_321: x0 => globalThis.$$.first_child(x0),
_322: x0 => globalThis.$$.first_child(x0),
_323: (x0,x1) => globalThis.$$.push(x0,x1),
_324: () => globalThis.$$.legacy_pre_effect_reset(),
_325: x0 => globalThis.$$.child(x0),
_326: (x0,x1) => globalThis.$$.set_text(x0,x1),
_327: () => globalThis.$$.pop(),
_328: (x0,x1) => globalThis.$$.push(x0,x1),
_329: () => globalThis.$$.legacy_pre_effect_reset(),
_330: x0 => globalThis.$$.first_child(x0),
_331: x0 => globalThis.$$.child(x0),
_332: x0 => globalThis.$$.child(x0),
_333: x0 => globalThis.$$.child(x0),
_334: (x0,x1) => globalThis.$$.set_text(x0,x1),
_335: (x0,x1) => globalThis.$$.set_text(x0,x1),
_336: (x0,x1) => globalThis.$$.set_text(x0,x1),
_337: () => globalThis.$$.pop(),
_338: x0 => globalThis.$$.child(x0),
_339: (x0,x1) => globalThis.$$.set_text(x0,x1),
_340: x0 => globalThis.$$.child(x0),
_341: (x0,x1,x2) => globalThis.$$.append_styles(x0,x1,x2),
_342: (x0,x1,x2) => globalThis.$$.set_attribute(x0,x1,x2),
_343: (x0,x1,x2) => globalThis.$$.set_attribute(x0,x1,x2),
_344: x0 => globalThis.$$.child(x0),
_348: (x0,x1,x2) => globalThis.$$.bind_value(x0,x1,x2),
_349: f => finalizeWrapper(f,() => dartInstance.exports._349(f)),
_350: f => finalizeWrapper(f,x0 => dartInstance.exports._350(f,x0)),
_353: f => finalizeWrapper(f,() => dartInstance.exports._353(f)),
_354: f => finalizeWrapper(f,x0 => dartInstance.exports._354(f,x0)),
_355: (x0,x1,x2) => globalThis.$$.bind_checked(x0,x1,x2),
_356: f => finalizeWrapper(f,() => dartInstance.exports._356(f)),
_357: f => finalizeWrapper(f,x0 => dartInstance.exports._357(f,x0)),
_360: (x0,x1,x2,x3,x4) => globalThis.$$.if_block(x0,x1,x2,x3,x4),
_361: f => finalizeWrapper(f,() => dartInstance.exports._361(f)),
_362: f => finalizeWrapper(f,x0 => dartInstance.exports._362(f,x0)),
_363: f => finalizeWrapper(f,x0 => dartInstance.exports._363(f,x0)),
_364: (x0,x1,x2,x3) => globalThis.$$.html(x0,x1,x2,x3),
_365: f => finalizeWrapper(f,() => dartInstance.exports._365(f)),
_366: (x0,x1,x2,x3,x4,x5) => globalThis.$$.each(x0,x1,x2,x3,x4,x5),
_367: f => finalizeWrapper(f,() => dartInstance.exports._367(f)),
_368: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._368(f,x0,x1)),
_369: f => finalizeWrapper(f,(x0,x1,x2) => dartInstance.exports._369(f,x0,x1,x2)),
_371: (x0,x1,x2,x3,x4) => globalThis.$$.await_block(x0,x1,x2,x3,x4),
_372: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._372(f,x0,x1)),
_373: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._373(f,x0,x1)),
_374: f => finalizeWrapper(f,() => dartInstance.exports._374(f)),
_375: f => finalizeWrapper(f,x0 => dartInstance.exports._375(f,x0)),
_376: x0 => x0.error,
_390: (x0,x1) => ({anchor: x0,target: x1}),
_391: (x0,x1) => globalThis.$$.mount(x0,x1),
_392: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._392(f,x0,x1)),
_395: () => globalThis.$$.createEventDispatcher(),
_396: (x0,x1) => ({bubbles: x0,cancelable: x1}),
_397: (x0,x1,x2,x3,x4) => x0.call(x1,x2,x3,x4),
_398: (x0,x1,x2,x3,x4) => globalThis.$$.event(x0,x1,x2,x3,x4),
_399: f => finalizeWrapper(f,x0 => dartInstance.exports._399(f,x0)),
_412: o => o === undefined,
_413: o => typeof o === 'boolean',
_414: o => typeof o === 'number',
_416: o => typeof o === 'string',
_419: o => o instanceof Int8Array,
_420: o => o instanceof Uint8Array,
_421: o => o instanceof Uint8ClampedArray,
_422: o => o instanceof Int16Array,
_423: o => o instanceof Uint16Array,
_424: o => o instanceof Int32Array,
_425: o => o instanceof Uint32Array,
_426: o => o instanceof Float32Array,
_427: o => o instanceof Float64Array,
_428: o => o instanceof ArrayBuffer,
_429: o => o instanceof DataView,
_430: o => o instanceof Array,
_431: o => typeof o === 'function' && o[jsWrappedDartFunctionSymbol] === true,
_435: (l, r) => l === r,
_436: o => o,
_437: o => o,
_438: o => o,
_439: b => !!b,
_440: o => o.length,
_443: (o, i) => o[i],
_444: f => f.dartFunction,
_445: l => arrayFromDartList(Int8Array, l),
_446: l => arrayFromDartList(Uint8Array, l),
_447: l => arrayFromDartList(Uint8ClampedArray, l),
_448: l => arrayFromDartList(Int16Array, l),
_449: l => arrayFromDartList(Uint16Array, l),
_450: l => arrayFromDartList(Int32Array, l),
_451: l => arrayFromDartList(Uint32Array, l),
_452: l => arrayFromDartList(Float32Array, l),
_453: l => arrayFromDartList(Float64Array, l),
_454: (data, length) => {
          const view = new DataView(new ArrayBuffer(length));
          for (let i = 0; i < length; i++) {
              view.setUint8(i, dartInstance.exports.$byteDataGetUint8(data, i));
          }
          return view;
        },
_455: l => arrayFromDartList(Array, l),
_456: stringFromDartString,
_457: stringToDartString,
_458: () => ({}),
_460: l => new Array(l),
_461: () => globalThis,
_462: (constructor, args) => {
      const factoryFunction = constructor.bind.apply(
          constructor, [null, ...args]);
      return new factoryFunction();
    },
_464: (o, p) => o[p],
_468: o => String(o),
_469: (p, s, f) => p.then(s, f),
_488: (o, p) => o[p],
_489: (o, p, v) => o[p] = v,
_491: x0 => globalThis.$$.get(x0),
_495: x0 => globalThis.$$.mutable_source(x0),
_496: (x0,x1) => globalThis.$$.mutate(x0,x1),
_497: (x0,x1) => globalThis.$$.set(x0,x1),
_500: (x0,x1) => globalThis.$$.legacy_pre_effect(x0,x1),
_501: f => finalizeWrapper(f,() => dartInstance.exports._501(f)),
_502: f => finalizeWrapper(f,() => dartInstance.exports._502(f)),
_504: x0 => globalThis.$$.template_effect(x0),
_505: f => finalizeWrapper(f,() => dartInstance.exports._505(f)),
_509: x0 => globalThis.$$.spread_props(x0),
_510: (x0,x1) => globalThis.$$.prop(x0,x1),
_511: x0 => x0.call(),
_512: (x0,x1,x2,x3) => globalThis.$$.prop(x0,x1,x2,x3),
_515: (x0,x1,x2) => globalThis.$$.set_getter(x0,x1,x2),
_516: f => finalizeWrapper(f,() => dartInstance.exports._516(f)),
_1050: (x0,x1) => x0.hash = x1,
_1678: (x0,x1) => x0.disabled = x1,
_1734: (x0,x1) => x0.value = x1,
_1735: x0 => x0.value,
_2316: () => globalThis.window,
_2376: x0 => x0.location,
_2677: (x0,x1) => x0.hash = x1,
_2678: x0 => x0.hash,
_7175: x0 => x0.detail,
_7273: x0 => x0.nodeName,
_7284: (x0,x1) => x0.nodeValue = x1,
_7291: () => globalThis.document,
_7993: x0 => x0.clientX,
_7994: x0 => x0.clientY,
_8880: x0 => x0.ok,
_13157: (x0,x1,x2) => x0[x1] = x2
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

