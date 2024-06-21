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

_1: () => globalThis.Array.prototype,
_2: () => globalThis.Symbol.isConcatSpreadable,
_3: f => finalizeWrapper(f,() => dartInstance.exports._3(f)),
_4: f => finalizeWrapper(f,x0 => dartInstance.exports._4(f,x0)),
_5: f => finalizeWrapper(f,x0 => dartInstance.exports._5(f,x0)),
_6: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._6(f,x0,x1)),
_7: f => finalizeWrapper(f,x0 => dartInstance.exports._7(f,x0)),
_8: f => finalizeWrapper(f,x0 => dartInstance.exports._8(f,x0)),
_9:     (wrapper, getIndex, setIndex, hasIndex, deleteIndex) => new Proxy(wrapper, {
      'get': function (target, prop, receiver) {
        if (typeof prop == 'string') {
          const numProp = Number(prop);
          if (Number.isInteger(numProp)) {
            const args = new Array();
            args.push(numProp);
            return Reflect.apply(getIndex, wrapper, args);
          }
        }
        return Reflect.get(target, prop, receiver);
      },
      'set': function (target, prop, value, receiver) {
        if (typeof prop == 'string') {
          const numProp = Number(prop);
          if (Number.isInteger(numProp)) {
            const args = new Array();
            args.push(numProp, value);
            Reflect.apply(setIndex, wrapper, args);
            return true;
          }
        }
        // Note that handler set is required to return a bool (whether it
        // succeeded or not), so `[]=` won't return the value set.
        return Reflect.set(target, prop, value, receiver);
      },
      'has': function (target, prop) {
        if (typeof prop == 'string') {
          const numProp = Number(prop);
          if (Number.isInteger(numProp)) {
            const args = new Array();
            args.push(numProp);
            // Array-like objects are assumed to have indices as properties.
            return Reflect.apply(hasIndex, wrapper, args);
          }
        }
        return Reflect.has(target, prop);
      },
      'deleteProperty': function (target, prop) {
        if (typeof prop == 'string') {
          const numProp = Number(prop);
          if (Number.isInteger(numProp)) {
            const args = new Array();
            args.push(numProp);
            return Reflect.apply(deleteIndex, wrapper, args);
          }
        }
        return Reflect.deleteProperty(target, prop);
      }
    }),
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
_95: (a, s) => a.join(s),
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
_283: (x0,x1) => globalThis.$$.push(x0,x1),
_284: () => globalThis.$$.init(),
_285: x0 => globalThis.$$.first_child(x0),
_286: x0 => globalThis.$$.child(x0),
_287: x0 => globalThis.$$.remove_input_attr_defaults(x0),
_288: x0 => globalThis.$$.child(x0),
_289: x0 => globalThis.$$.remove_input_attr_defaults(x0),
_290: x0 => globalThis.$$.child(x0),
_291: x0 => globalThis.$$.remove_input_attr_defaults(x0),
_292: x0 => globalThis.$$.child(x0),
_293: x0 => globalThis.$$.remove_input_attr_defaults(x0),
_294: (x0,x1) => globalThis.$$.set_text(x0,x1),
_295: x0 => globalThis.$$.first_child(x0),
_296: x0 => globalThis.$$.child(x0),
_297: (x0,x1) => globalThis.$$.set_text(x0,x1),
_298: () => globalThis.$$.pop(),
_299: (x0,x1) => x0.__value = x1,
_300: x0 => globalThis.$$.first_child(x0),
_301: x0 => globalThis.$$.child(x0),
_302: x0 => globalThis.$$.remove_input_attr_defaults(x0),
_303: x0 => globalThis.$$.first_child(x0),
_304: x0 => globalThis.$$.child(x0),
_305: x0 => globalThis.$$.remove_input_attr_defaults(x0),
_306: x0 => globalThis.$$.remove_input_attr_defaults(x0),
_307: x0 => globalThis.$$.child(x0),
_308: x0 => globalThis.$$.remove_input_attr_defaults(x0),
_309: x0 => globalThis.$$.remove_input_attr_defaults(x0),
_310: x0 => globalThis.$$.child(x0),
_311: (x0,x1) => globalThis.$$.set_text(x0,x1),
_312: x0 => globalThis.$$.first_child(x0),
_313: x0 => globalThis.$$.remove_input_attr_defaults(x0),
_314: x0 => globalThis.$$.child(x0),
_315: (x0,x1) => globalThis.$$.set_text(x0,x1),
_316: x0 => globalThis.$$.child(x0),
_317: (x0,x1) => globalThis.$$.set_text(x0,x1),
_318: (x0,x1,x2) => globalThis.$$.append_styles(x0,x1,x2),
_319: x0 => globalThis.$$.child(x0),
_320: (x0,x1) => globalThis.$$.set_text(x0,x1),
_321: (x0,x1,x2) => globalThis.$$.append_styles(x0,x1,x2),
_322: (x0,x1) => x0.fetch(x1),
_323: x0 => x0.text(),
_324: x0 => globalThis.$$.child(x0),
_325: x0 => globalThis.$$.child(x0),
_326: x0 => globalThis.$$.child(x0),
_327: (x0,x1) => globalThis.$$.set_text(x0,x1),
_328: x0 => globalThis.$$.first_child(x0),
_329: x0 => globalThis.$$.child(x0),
_330: x0 => globalThis.$$.child(x0),
_331: (x0,x1,x2) => globalThis.$$.set_attribute(x0,x1,x2),
_332: (x0,x1) => globalThis.$$.set_text(x0,x1),
_333: x0 => globalThis.$$.first_child(x0),
_334: x0 => globalThis.$$.child(x0),
_335: x0 => globalThis.$$.first_child(x0),
_336: x0 => globalThis.$$.child(x0),
_337: x0 => globalThis.$$.child(x0),
_338: x0 => globalThis.$$.first_child(x0),
_339: x0 => globalThis.$$.first_child(x0),
_340: (x0,x1) => globalThis.$$.push(x0,x1),
_341: () => globalThis.$$.legacy_pre_effect_reset(),
_342: x0 => globalThis.$$.child(x0),
_343: (x0,x1) => globalThis.$$.set_text(x0,x1),
_344: () => globalThis.$$.pop(),
_345: (x0,x1) => globalThis.$$.push(x0,x1),
_346: () => globalThis.$$.legacy_pre_effect_reset(),
_347: x0 => globalThis.$$.first_child(x0),
_348: x0 => globalThis.$$.child(x0),
_349: x0 => globalThis.$$.child(x0),
_350: x0 => globalThis.$$.child(x0),
_351: (x0,x1) => globalThis.$$.set_text(x0,x1),
_352: (x0,x1) => globalThis.$$.set_text(x0,x1),
_353: (x0,x1) => globalThis.$$.set_text(x0,x1),
_354: () => globalThis.$$.pop(),
_355: x0 => globalThis.$$.child(x0),
_356: (x0,x1) => globalThis.$$.set_text(x0,x1),
_357: x0 => globalThis.$$.child(x0),
_358: (x0,x1,x2) => globalThis.$$.append_styles(x0,x1,x2),
_359: (x0,x1,x2) => globalThis.$$.set_attribute(x0,x1,x2),
_360: (x0,x1,x2) => globalThis.$$.set_attribute(x0,x1,x2),
_361: x0 => globalThis.$$.child(x0),
_365: (x0,x1,x2) => globalThis.$$.bind_value(x0,x1,x2),
_366: f => finalizeWrapper(f,() => dartInstance.exports._366(f)),
_367: f => finalizeWrapper(f,x0 => dartInstance.exports._367(f,x0)),
_370: f => finalizeWrapper(f,() => dartInstance.exports._370(f)),
_371: f => finalizeWrapper(f,x0 => dartInstance.exports._371(f,x0)),
_372: (x0,x1,x2,x3,x4) => globalThis.$$.bind_group(x0,x1,x2,x3,x4),
_373: f => finalizeWrapper(f,() => dartInstance.exports._373(f)),
_374: f => finalizeWrapper(f,x0 => dartInstance.exports._374(f,x0)),
_375: f => finalizeWrapper(f,() => dartInstance.exports._375(f)),
_376: f => finalizeWrapper(f,x0 => dartInstance.exports._376(f,x0)),
_377: (x0,x1,x2) => globalThis.$$.bind_checked(x0,x1,x2),
_378: f => finalizeWrapper(f,() => dartInstance.exports._378(f)),
_379: f => finalizeWrapper(f,x0 => dartInstance.exports._379(f,x0)),
_382: (x0,x1,x2,x3,x4) => globalThis.$$.if_block(x0,x1,x2,x3,x4),
_383: f => finalizeWrapper(f,() => dartInstance.exports._383(f)),
_384: f => finalizeWrapper(f,x0 => dartInstance.exports._384(f,x0)),
_385: f => finalizeWrapper(f,x0 => dartInstance.exports._385(f,x0)),
_386: (x0,x1,x2,x3) => globalThis.$$.html(x0,x1,x2,x3),
_387: f => finalizeWrapper(f,() => dartInstance.exports._387(f)),
_388: (x0,x1,x2,x3,x4,x5) => globalThis.$$.each(x0,x1,x2,x3,x4,x5),
_389: f => finalizeWrapper(f,() => dartInstance.exports._389(f)),
_390: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._390(f,x0,x1)),
_391: f => finalizeWrapper(f,(x0,x1,x2) => dartInstance.exports._391(f,x0,x1,x2)),
_393: (x0,x1,x2,x3,x4) => globalThis.$$.await_block(x0,x1,x2,x3,x4),
_394: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._394(f,x0,x1)),
_395: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._395(f,x0,x1)),
_396: f => finalizeWrapper(f,() => dartInstance.exports._396(f)),
_397: f => finalizeWrapper(f,x0 => dartInstance.exports._397(f,x0)),
_398: x0 => x0.error,
_412: (x0,x1) => ({anchor: x0,target: x1}),
_413: (x0,x1) => globalThis.$$.mount(x0,x1),
_414: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._414(f,x0,x1)),
_417: () => globalThis.$$.createEventDispatcher(),
_418: (x0,x1) => ({bubbles: x0,cancelable: x1}),
_419: (x0,x1,x2,x3,x4) => x0.call(x1,x2,x3,x4),
_420: (x0,x1,x2,x3,x4) => globalThis.$$.event(x0,x1,x2,x3,x4),
_421: f => finalizeWrapper(f,x0 => dartInstance.exports._421(f,x0)),
_434: o => o === undefined,
_435: o => typeof o === 'boolean',
_436: o => typeof o === 'number',
_438: o => typeof o === 'string',
_441: o => o instanceof Int8Array,
_442: o => o instanceof Uint8Array,
_443: o => o instanceof Uint8ClampedArray,
_444: o => o instanceof Int16Array,
_445: o => o instanceof Uint16Array,
_446: o => o instanceof Int32Array,
_447: o => o instanceof Uint32Array,
_448: o => o instanceof Float32Array,
_449: o => o instanceof Float64Array,
_450: o => o instanceof ArrayBuffer,
_451: o => o instanceof DataView,
_452: o => o instanceof Array,
_453: o => typeof o === 'function' && o[jsWrappedDartFunctionSymbol] === true,
_457: (l, r) => l === r,
_458: o => o,
_459: o => o,
_460: o => o,
_461: b => !!b,
_462: o => o.length,
_465: (o, i) => o[i],
_466: f => f.dartFunction,
_467: l => arrayFromDartList(Int8Array, l),
_468: l => arrayFromDartList(Uint8Array, l),
_469: l => arrayFromDartList(Uint8ClampedArray, l),
_470: l => arrayFromDartList(Int16Array, l),
_471: l => arrayFromDartList(Uint16Array, l),
_472: l => arrayFromDartList(Int32Array, l),
_473: l => arrayFromDartList(Uint32Array, l),
_474: l => arrayFromDartList(Float32Array, l),
_475: l => arrayFromDartList(Float64Array, l),
_476: (data, length) => {
          const view = new DataView(new ArrayBuffer(length));
          for (let i = 0; i < length; i++) {
              view.setUint8(i, dartInstance.exports.$byteDataGetUint8(data, i));
          }
          return view;
        },
_477: l => arrayFromDartList(Array, l),
_478: stringFromDartString,
_479: stringToDartString,
_480: () => ({}),
_482: l => new Array(l),
_483: () => globalThis,
_484: (constructor, args) => {
      const factoryFunction = constructor.bind.apply(
          constructor, [null, ...args]);
      return new factoryFunction();
    },
_486: (o, p) => o[p],
_488: (o, m, a) => o[m].apply(o, a),
_490: o => String(o),
_491: (p, s, f) => p.then(s, f),
_510: (o, p) => o[p],
_511: (o, p, v) => o[p] = v,
_513: x0 => x0.length,
_515: (x0,x1,x2) => x0[x1] = x2,
_516: (x0,x1) => x0[x1],
_517: (x0,x1,x2) => x0[x1] = x2,
_518: x0 => globalThis.$$.get(x0),
_522: x0 => globalThis.$$.mutable_source(x0),
_523: (x0,x1) => globalThis.$$.mutate(x0,x1),
_524: (x0,x1) => globalThis.$$.set(x0,x1),
_527: (x0,x1) => globalThis.$$.legacy_pre_effect(x0,x1),
_528: f => finalizeWrapper(f,() => dartInstance.exports._528(f)),
_529: f => finalizeWrapper(f,() => dartInstance.exports._529(f)),
_531: x0 => globalThis.$$.template_effect(x0),
_532: f => finalizeWrapper(f,() => dartInstance.exports._532(f)),
_536: x0 => globalThis.$$.spread_props(x0),
_537: (x0,x1) => globalThis.$$.prop(x0,x1),
_538: x0 => x0.call(),
_539: (x0,x1,x2,x3) => globalThis.$$.prop(x0,x1,x2,x3),
_542: (x0,x1,x2) => globalThis.$$.set_getter(x0,x1,x2),
_543: f => finalizeWrapper(f,() => dartInstance.exports._543(f)),
_1077: (x0,x1) => x0.hash = x1,
_1675: (x0,x1) => x0.value = x1,
_1705: (x0,x1) => x0.disabled = x1,
_1761: (x0,x1) => x0.value = x1,
_1762: x0 => x0.value,
_2343: () => globalThis.window,
_2403: x0 => x0.location,
_2704: (x0,x1) => x0.hash = x1,
_2705: x0 => x0.hash,
_7202: x0 => x0.detail,
_7300: x0 => x0.nodeName,
_7311: (x0,x1) => x0.nodeValue = x1,
_7318: () => globalThis.document,
_8020: x0 => x0.clientX,
_8021: x0 => x0.clientY,
_8907: x0 => x0.ok,
_13184: (x0,x1,x2) => x0[x1] = x2
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

