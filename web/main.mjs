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

_10: () => new Array(),
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
_87: s => stringToDartString(stringFromDartString(s).toLowerCase()),
_88: (a, i) => a.push(i),
_89: (a, i) => a.splice(i, 1)[0],
_91: (a, l) => a.length = l,
_95: (a, s) => a.join(s),
_96: (a, s, e) => a.slice(s, e),
_97: (a, s, e) => a.splice(s, e),
_99: a => a.length,
_101: (a, i) => a[i],
_102: (a, i, v) => a[i] = v,
_104: a => a.join(''),
_105: (o, a, b) => o.replace(a, b),
_107: (s, t) => s.split(t),
_108: s => s.toLowerCase(),
_110: s => s.trim(),
_111: s => s.trimLeft(),
_112: s => s.trimRight(),
_114: (s, p, i) => s.indexOf(p, i),
_115: (s, p, i) => s.lastIndexOf(p, i),
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
_128: (s) => s.replace(/\$/g, "$$$$"),
_129: Object.is,
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
_284: x0 => globalThis.Array.from(x0),
_285: () => globalThis.$$.legacy_pre_effect_reset(),
_286: x0 => globalThis.$$.first_child(x0),
_287: x0 => globalThis.$$.first_child(x0),
_288: x0 => globalThis.Array.from(x0),
_289: x0 => globalThis.$$.child(x0),
_290: (x0,x1) => globalThis.$$.set_text(x0,x1),
_291: () => globalThis.$$.pop(),
_292: (x0,x1) => globalThis.$$.push(x0,x1),
_293: () => globalThis.$$.init(),
_294: x0 => globalThis.$$.first_child(x0),
_295: x0 => globalThis.$$.remove_textarea_child(x0),
_296: (x0,x1,x2) => globalThis.$$.append_styles(x0,x1,x2),
_297: () => globalThis.$$.pop(),
_298: (x0,x1) => globalThis.$$.push(x0,x1),
_299: () => globalThis.$$.init(),
_300: x0 => globalThis.$$.first_child(x0),
_301: x0 => globalThis.$$.child(x0),
_302: x0 => globalThis.$$.remove_input_attr_defaults(x0),
_303: x0 => globalThis.$$.child(x0),
_304: x0 => globalThis.$$.remove_input_attr_defaults(x0),
_305: x0 => globalThis.$$.child(x0),
_306: x0 => globalThis.$$.remove_input_attr_defaults(x0),
_307: x0 => globalThis.$$.child(x0),
_308: x0 => globalThis.$$.remove_input_attr_defaults(x0),
_309: (x0,x1) => globalThis.$$.set_text(x0,x1),
_310: x0 => globalThis.$$.first_child(x0),
_311: x0 => globalThis.$$.child(x0),
_312: (x0,x1) => globalThis.$$.set_text(x0,x1),
_313: () => globalThis.$$.pop(),
_314: (x0,x1) => x0.__value = x1,
_315: x0 => globalThis.$$.first_child(x0),
_316: x0 => globalThis.$$.child(x0),
_317: x0 => globalThis.$$.remove_input_attr_defaults(x0),
_318: x0 => globalThis.$$.first_child(x0),
_319: x0 => globalThis.$$.child(x0),
_320: x0 => globalThis.$$.remove_input_attr_defaults(x0),
_321: x0 => globalThis.$$.remove_input_attr_defaults(x0),
_322: x0 => globalThis.$$.child(x0),
_323: x0 => globalThis.$$.remove_input_attr_defaults(x0),
_324: x0 => globalThis.$$.remove_input_attr_defaults(x0),
_325: x0 => globalThis.$$.child(x0),
_326: (x0,x1) => globalThis.$$.set_text(x0,x1),
_327: x0 => globalThis.$$.first_child(x0),
_328: x0 => globalThis.$$.remove_input_attr_defaults(x0),
_329: x0 => globalThis.$$.child(x0),
_330: (x0,x1) => globalThis.$$.set_text(x0,x1),
_331: x0 => globalThis.$$.child(x0),
_332: (x0,x1) => globalThis.$$.set_text(x0,x1),
_333: (x0,x1,x2) => globalThis.$$.append_styles(x0,x1,x2),
_334: x0 => globalThis.$$.child(x0),
_335: (x0,x1) => globalThis.$$.set_text(x0,x1),
_336: (x0,x1,x2) => globalThis.$$.append_styles(x0,x1,x2),
_337: (x0,x1) => x0.fetch(x1),
_338: x0 => x0.text(),
_339: x0 => globalThis.$$.child(x0),
_340: x0 => globalThis.$$.child(x0),
_341: x0 => globalThis.$$.child(x0),
_342: (x0,x1) => globalThis.$$.set_text(x0,x1),
_343: x0 => globalThis.$$.first_child(x0),
_344: x0 => globalThis.$$.child(x0),
_345: x0 => globalThis.$$.child(x0),
_346: (x0,x1,x2) => globalThis.$$.set_attribute(x0,x1,x2),
_347: (x0,x1) => globalThis.$$.set_text(x0,x1),
_348: x0 => globalThis.$$.first_child(x0),
_349: x0 => globalThis.$$.child(x0),
_350: x0 => globalThis.$$.first_child(x0),
_351: x0 => globalThis.$$.child(x0),
_352: x0 => globalThis.$$.child(x0),
_353: x0 => globalThis.$$.first_child(x0),
_354: x0 => globalThis.$$.first_child(x0),
_355: (x0,x1) => globalThis.$$.push(x0,x1),
_356: () => globalThis.$$.legacy_pre_effect_reset(),
_357: x0 => globalThis.$$.child(x0),
_358: (x0,x1) => globalThis.$$.set_text(x0,x1),
_359: () => globalThis.$$.pop(),
_360: (x0,x1) => globalThis.$$.push(x0,x1),
_361: () => globalThis.$$.legacy_pre_effect_reset(),
_362: x0 => globalThis.$$.first_child(x0),
_363: x0 => globalThis.$$.child(x0),
_364: x0 => globalThis.$$.child(x0),
_365: x0 => globalThis.$$.child(x0),
_366: (x0,x1) => globalThis.$$.set_text(x0,x1),
_367: (x0,x1) => globalThis.$$.set_text(x0,x1),
_368: (x0,x1) => globalThis.$$.set_text(x0,x1),
_369: () => globalThis.$$.pop(),
_370: x0 => globalThis.$$.child(x0),
_371: (x0,x1) => globalThis.$$.set_text(x0,x1),
_372: x0 => globalThis.$$.child(x0),
_373: (x0,x1,x2) => globalThis.$$.append_styles(x0,x1,x2),
_374: (x0,x1,x2) => globalThis.$$.set_attribute(x0,x1,x2),
_375: (x0,x1,x2) => globalThis.$$.set_attribute(x0,x1,x2),
_376: x0 => globalThis.$$.child(x0),
_381: (x0,x1,x2) => globalThis.$$.bind_value(x0,x1,x2),
_382: f => finalizeWrapper(f,() => dartInstance.exports._382(f)),
_383: f => finalizeWrapper(f,x0 => dartInstance.exports._383(f,x0)),
_386: f => finalizeWrapper(f,() => dartInstance.exports._386(f)),
_387: f => finalizeWrapper(f,x0 => dartInstance.exports._387(f,x0)),
_388: (x0,x1,x2,x3,x4) => globalThis.$$.bind_group(x0,x1,x2,x3,x4),
_389: f => finalizeWrapper(f,() => dartInstance.exports._389(f)),
_390: f => finalizeWrapper(f,x0 => dartInstance.exports._390(f,x0)),
_391: f => finalizeWrapper(f,() => dartInstance.exports._391(f)),
_392: f => finalizeWrapper(f,x0 => dartInstance.exports._392(f,x0)),
_393: (x0,x1,x2) => globalThis.$$.bind_checked(x0,x1,x2),
_394: f => finalizeWrapper(f,() => dartInstance.exports._394(f)),
_395: f => finalizeWrapper(f,x0 => dartInstance.exports._395(f,x0)),
_396: (x0,x1,x2) => globalThis.$$.bind_files(x0,x1,x2),
_397: f => finalizeWrapper(f,() => dartInstance.exports._397(f)),
_398: f => finalizeWrapper(f,x0 => dartInstance.exports._398(f,x0)),
_401: (x0,x1,x2,x3,x4) => globalThis.$$.if_block(x0,x1,x2,x3,x4),
_402: f => finalizeWrapper(f,() => dartInstance.exports._402(f)),
_403: f => finalizeWrapper(f,x0 => dartInstance.exports._403(f,x0)),
_404: (x0,x1,x2) => globalThis.$$.if_block(x0,x1,x2),
_405: f => finalizeWrapper(f,() => dartInstance.exports._405(f)),
_406: f => finalizeWrapper(f,x0 => dartInstance.exports._406(f,x0)),
_407: f => finalizeWrapper(f,x0 => dartInstance.exports._407(f,x0)),
_408: (x0,x1,x2,x3) => globalThis.$$.html(x0,x1,x2,x3),
_409: f => finalizeWrapper(f,() => dartInstance.exports._409(f)),
_410: (x0,x1,x2,x3,x4,x5) => globalThis.$$.each(x0,x1,x2,x3,x4,x5),
_411: f => finalizeWrapper(f,() => dartInstance.exports._411(f)),
_412: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._412(f,x0,x1)),
_413: f => finalizeWrapper(f,(x0,x1,x2) => dartInstance.exports._413(f,x0,x1,x2)),
_415: (x0,x1,x2,x3,x4) => globalThis.$$.await_block(x0,x1,x2,x3,x4),
_416: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._416(f,x0,x1)),
_417: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._417(f,x0,x1)),
_418: f => finalizeWrapper(f,() => dartInstance.exports._418(f)),
_419: f => finalizeWrapper(f,x0 => dartInstance.exports._419(f,x0)),
_420: x0 => x0.error,
_434: (x0,x1) => ({anchor: x0,target: x1}),
_435: (x0,x1) => globalThis.$$.mount(x0,x1),
_436: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._436(f,x0,x1)),
_439: () => globalThis.$$.createEventDispatcher(),
_440: (x0,x1) => ({bubbles: x0,cancelable: x1}),
_441: (x0,x1,x2,x3,x4) => x0.call(x1,x2,x3,x4),
_442: (x0,x1,x2,x3,x4) => globalThis.$$.event(x0,x1,x2,x3,x4),
_443: f => finalizeWrapper(f,x0 => dartInstance.exports._443(f,x0)),
_445: (s, m) => {
          try {
            return new RegExp(s, m);
          } catch (e) {
            return String(e);
          }
        },
_446: (x0,x1) => x0.exec(x1),
_447: (x0,x1) => x0.test(x1),
_448: (x0,x1) => x0.exec(x1),
_449: (x0,x1) => x0.exec(x1),
_450: x0 => x0.pop(),
_456: o => o === undefined,
_457: o => typeof o === 'boolean',
_458: o => typeof o === 'number',
_460: o => typeof o === 'string',
_463: o => o instanceof Int8Array,
_464: o => o instanceof Uint8Array,
_465: o => o instanceof Uint8ClampedArray,
_466: o => o instanceof Int16Array,
_467: o => o instanceof Uint16Array,
_468: o => o instanceof Int32Array,
_469: o => o instanceof Uint32Array,
_470: o => o instanceof Float32Array,
_471: o => o instanceof Float64Array,
_472: o => o instanceof ArrayBuffer,
_473: o => o instanceof DataView,
_474: o => o instanceof Array,
_475: o => typeof o === 'function' && o[jsWrappedDartFunctionSymbol] === true,
_478: o => o instanceof RegExp,
_479: (l, r) => l === r,
_480: o => o,
_481: o => o,
_482: o => o,
_483: b => !!b,
_484: o => o.length,
_487: (o, i) => o[i],
_488: f => f.dartFunction,
_489: l => arrayFromDartList(Int8Array, l),
_490: l => arrayFromDartList(Uint8Array, l),
_491: l => arrayFromDartList(Uint8ClampedArray, l),
_492: l => arrayFromDartList(Int16Array, l),
_493: l => arrayFromDartList(Uint16Array, l),
_494: l => arrayFromDartList(Int32Array, l),
_495: l => arrayFromDartList(Uint32Array, l),
_496: l => arrayFromDartList(Float32Array, l),
_497: l => arrayFromDartList(Float64Array, l),
_498: (data, length) => {
          const view = new DataView(new ArrayBuffer(length));
          for (let i = 0; i < length; i++) {
              view.setUint8(i, dartInstance.exports.$byteDataGetUint8(data, i));
          }
          return view;
        },
_499: l => arrayFromDartList(Array, l),
_500: stringFromDartString,
_501: stringToDartString,
_502: () => ({}),
_504: l => new Array(l),
_505: () => globalThis,
_506: (constructor, args) => {
      const factoryFunction = constructor.bind.apply(
          constructor, [null, ...args]);
      return new factoryFunction();
    },
_507: (o, p) => p in o,
_508: (o, p) => o[p],
_512: o => String(o),
_513: (p, s, f) => p.then(s, f),
_516: x0 => x0.input,
_517: x0 => x0.index,
_518: x0 => x0.groups,
_519: x0 => x0.length,
_521: (x0,x1) => x0[x1],
_525: x0 => x0.flags,
_526: x0 => x0.multiline,
_527: x0 => x0.ignoreCase,
_528: x0 => x0.unicode,
_529: x0 => x0.dotAll,
_530: (x0,x1) => x0.lastIndex = x1,
_532: (o, p) => o[p],
_533: (o, p, v) => o[p] = v,
_535: x0 => x0.length,
_538: (x0,x1) => x0[x1],
_539: (x0,x1,x2) => x0[x1] = x2,
_540: x0 => globalThis.$$.get(x0),
_544: x0 => globalThis.$$.mutable_source(x0),
_545: (x0,x1) => globalThis.$$.mutate(x0,x1),
_546: (x0,x1) => globalThis.$$.set(x0,x1),
_549: (x0,x1) => globalThis.$$.legacy_pre_effect(x0,x1),
_550: f => finalizeWrapper(f,() => dartInstance.exports._550(f)),
_551: f => finalizeWrapper(f,() => dartInstance.exports._551(f)),
_553: x0 => globalThis.$$.template_effect(x0),
_554: f => finalizeWrapper(f,() => dartInstance.exports._554(f)),
_558: x0 => globalThis.$$.spread_props(x0),
_559: (x0,x1) => globalThis.$$.prop(x0,x1),
_560: x0 => x0.call(),
_561: (x0,x1,x2,x3) => globalThis.$$.prop(x0,x1,x2,x3),
_564: (x0,x1,x2) => globalThis.$$.set_getter(x0,x1,x2),
_565: f => finalizeWrapper(f,() => dartInstance.exports._565(f)),
_1099: (x0,x1) => x0.hash = x1,
_1697: (x0,x1) => x0.value = x1,
_1727: (x0,x1) => x0.disabled = x1,
_1783: (x0,x1) => x0.value = x1,
_1784: x0 => x0.value,
_2365: () => globalThis.window,
_2425: x0 => x0.location,
_2726: (x0,x1) => x0.hash = x1,
_2727: x0 => x0.hash,
_7224: x0 => x0.detail,
_7333: (x0,x1) => x0.nodeValue = x1,
_7340: () => globalThis.document,
_8042: x0 => x0.clientX,
_8043: x0 => x0.clientY,
_8475: x0 => x0.size,
_8483: x0 => x0.name,
_8929: x0 => x0.ok,
_13207: (x0,x1,x2) => x0[x1] = x2
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

