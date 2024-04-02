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
_48: v => stringToDartString(v.toString()),
_63: () => {
          let stackString = new Error().stack.toString();
          let frames = stackString.split('\n');
          let drop = 2;
          if (frames[0] === 'Error') {
              drop += 1;
          }
          return frames.slice(drop).join('\n');
        },
_72: s => stringToDartString(JSON.stringify(stringFromDartString(s))),
_73: s => printToConsole(stringFromDartString(s)),
_91: (c) =>
              queueMicrotask(() => dartInstance.exports.$invokeCallback(c)),
_113: x0 => ({$$events: x0}),
_114: f => finalizeWrapper(f,x0 => dartInstance.exports._114(f,x0)),
_115: x0 => ({message: x0}),
_116: x0 => ({$$events: x0}),
_117: (x0,x1) => x0.alert(x1),
_118: (x0,x1) => x0.querySelector(x1),
_119: (x0,x1) => x0.querySelector(x1),
_120: f => finalizeWrapper(f,x0 => dartInstance.exports._120(f,x0)),
_121: (x0,x1,x2) => x0.addEventListener(x1,x2),
_122: x0 => new Event(x0),
_123: (x0,x1) => globalThis.$$.template(x0,x1),
_124: x0 => globalThis.$$.template(x0),
_125: (x0,x1,x2) => globalThis.$$.open(x0,x1,x2),
_126: (x0,x1,x2) => globalThis.$$.open_frag(x0,x1,x2),
_127: x0 => globalThis.$$.space(x0),
_128: x0 => globalThis.$$.comment(x0),
_129: (x0,x1) => globalThis.$$.close(x0,x1),
_130: (x0,x1) => globalThis.$$.close_frag(x0,x1),
_131: f => finalizeWrapper(f,x0 => dartInstance.exports._131(f,x0)),
_132: x0 => ({click: x0}),
_133: x0 => ({$$events: x0}),
_134: f => finalizeWrapper(f,x0 => dartInstance.exports._134(f,x0)),
_135: x0 => ({message: x0}),
_136: x0 => ({$$events: x0}),
_138: x0 => x0.current,
_139: () => ({}),
_140: (x0,x1,x2,x3) => ({name: x0,version: x1,speed: x2,website: x3}),
_141: x0 => x0.name,
_142: x0 => x0.version,
_143: x0 => x0.speed,
_144: x0 => x0.website,
_145: x0 => ({answer: x0}),
_147: x0 => ({answer: x0}),
_148: x0 => x0.answer,
_149: (x0,x1) => x0.fetch(x1),
_150: x0 => x0.text(),
_151: x0 => globalThis.$$.child(x0),
_152: (x0,x1) => globalThis.$$.child_frag(x0,x1),
_153: x0 => globalThis.$$.child_frag(x0),
_154: (x0,x1) => globalThis.$$.sibling(x0,x1),
_155: x0 => globalThis.$$.sibling(x0),
_156: (x0,x1) => globalThis.$$.forward_event(x0,x1),
_158: (x0,x1,x2) => globalThis.$$.event_bubble(x0,x1,x2),
_160: (x0,x1,x2,x3,x4) => globalThis.$$.event(x0,x1,x2,x3,x4),
_161: f => finalizeWrapper(f,x0 => dartInstance.exports._161(f,x0)),
_162: (x0,x1,x2) => globalThis.$$.attr_effect(x0,x1,x2),
_163: f => finalizeWrapper(f,() => dartInstance.exports._163(f)),
_164: (x0,x1,x2) => globalThis.$$.attr(x0,x1,x2),
_165: (x0,x1,x2,x3) => globalThis.$$.if_block(x0,x1,x2,x3),
_166: f => finalizeWrapper(f,() => dartInstance.exports._166(f)),
_167: f => finalizeWrapper(f,x0 => dartInstance.exports._167(f,x0)),
_168: f => finalizeWrapper(f,x0 => dartInstance.exports._168(f,x0)),
_169: (x0,x1,x2) => globalThis.$$.html(x0,x1,x2),
_170: f => finalizeWrapper(f,() => dartInstance.exports._170(f)),
_171: (x0,x1,x2,x3,x4,x5) => globalThis.$$.each_keyed(x0,x1,x2,x3,x4,x5),
_172: f => finalizeWrapper(f,(x0,x1,x2) => dartInstance.exports._172(f,x0,x1,x2)),
_173: f => finalizeWrapper(f,() => dartInstance.exports._173(f)),
_174: f => finalizeWrapper(f,(x0,x1,x2) => dartInstance.exports._174(f,x0,x1,x2)),
_176: (x0,x1,x2,x3,x4) => globalThis.$$.each_indexed(x0,x1,x2,x3,x4),
_177: f => finalizeWrapper(f,() => dartInstance.exports._177(f)),
_178: f => finalizeWrapper(f,(x0,x1,x2) => dartInstance.exports._178(f,x0,x1,x2)),
_180: (x0,x1,x2,x3,x4) => globalThis.$$.await_block(x0,x1,x2,x3,x4),
_181: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._181(f,x0,x1)),
_182: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._182(f,x0,x1)),
_183: f => finalizeWrapper(f,() => dartInstance.exports._183(f)),
_184: f => finalizeWrapper(f,x0 => dartInstance.exports._184(f,x0)),
_185: x0 => x0.error,
_210: x0 => globalThis.$$.get(x0),
_211: (x0,x1) => globalThis.$$.push(x0,x1),
_212: (x0,x1,x2) => globalThis.$$.set_getter(x0,x1,x2),
_213: f => finalizeWrapper(f,() => dartInstance.exports._213(f)),
_215: () => globalThis.$$.pop(),
_216: x0 => globalThis.$$.mutable_source(x0),
_217: (x0,x1) => globalThis.$$.mutate(x0,x1),
_218: (x0,x1) => globalThis.$$.set(x0,x1),
_219: (x0,x1) => globalThis.$$.legacy_pre_effect(x0,x1),
_220: f => finalizeWrapper(f,() => dartInstance.exports._220(f)),
_221: f => finalizeWrapper(f,() => dartInstance.exports._221(f)),
_222: () => globalThis.$$.legacy_pre_effect_reset(),
_223: x0 => globalThis.$$.render_effect(x0),
_224: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._224(f,x0,x1)),
_225: (x0,x1) => globalThis.$$.text_effect(x0,x1),
_226: f => finalizeWrapper(f,() => dartInstance.exports._226(f)),
_227: (x0,x1) => globalThis.$$.text(x0,x1),
_228: x0 => ({target: x0}),
_231: (x0,x1) => globalThis.$$.mount(x0,x1),
_232: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._232(f,x0,x1)),
_233: x0 => globalThis.$$.unmount(x0),
_234: (x0,x1,x2) => globalThis.$$.append_styles(x0,x1,x2),
_235: (a, i) => a.push(i),
_243: (a, s, e) => a.slice(s, e),
_246: a => a.length,
_248: (a, i) => a[i],
_249: (a, i, v) => a[i] = v,
_251: a => a.join(''),
_261: (s, p, i) => s.indexOf(p, i),
_263: (o, offsetInBytes, lengthInBytes) => {
      var dst = new ArrayBuffer(lengthInBytes);
      new Uint8Array(dst).set(new Uint8Array(o, offsetInBytes, lengthInBytes));
      return new DataView(dst);
    },
_264: (o, start, length) => new Uint8Array(o.buffer, o.byteOffset + start, length),
_265: (o, start, length) => new Int8Array(o.buffer, o.byteOffset + start, length),
_266: (o, start, length) => new Uint8ClampedArray(o.buffer, o.byteOffset + start, length),
_267: (o, start, length) => new Uint16Array(o.buffer, o.byteOffset + start, length),
_268: (o, start, length) => new Int16Array(o.buffer, o.byteOffset + start, length),
_269: (o, start, length) => new Uint32Array(o.buffer, o.byteOffset + start, length),
_270: (o, start, length) => new Int32Array(o.buffer, o.byteOffset + start, length),
_273: (o, start, length) => new Float32Array(o.buffer, o.byteOffset + start, length),
_274: (o, start, length) => new Float64Array(o.buffer, o.byteOffset + start, length),
_278: (o) => new DataView(o.buffer, o.byteOffset, o.byteLength),
_280: o => o.buffer,
_281: o => o.byteOffset,
_282: Function.prototype.call.bind(Object.getOwnPropertyDescriptor(DataView.prototype, 'byteLength').get),
_283: (b, o) => new DataView(b, o),
_285: Function.prototype.call.bind(DataView.prototype.getUint8),
_286: Function.prototype.call.bind(DataView.prototype.setUint8),
_287: Function.prototype.call.bind(DataView.prototype.getInt8),
_288: Function.prototype.call.bind(DataView.prototype.setInt8),
_289: Function.prototype.call.bind(DataView.prototype.getUint16),
_290: Function.prototype.call.bind(DataView.prototype.setUint16),
_291: Function.prototype.call.bind(DataView.prototype.getInt16),
_292: Function.prototype.call.bind(DataView.prototype.setInt16),
_293: Function.prototype.call.bind(DataView.prototype.getUint32),
_294: Function.prototype.call.bind(DataView.prototype.setUint32),
_295: Function.prototype.call.bind(DataView.prototype.getInt32),
_296: Function.prototype.call.bind(DataView.prototype.setInt32),
_301: Function.prototype.call.bind(DataView.prototype.getFloat32),
_303: Function.prototype.call.bind(DataView.prototype.getFloat64),
_324: o => o === undefined,
_325: o => typeof o === 'boolean',
_326: o => typeof o === 'number',
_328: o => typeof o === 'string',
_331: o => o instanceof Int8Array,
_332: o => o instanceof Uint8Array,
_333: o => o instanceof Uint8ClampedArray,
_334: o => o instanceof Int16Array,
_335: o => o instanceof Uint16Array,
_336: o => o instanceof Int32Array,
_337: o => o instanceof Uint32Array,
_338: o => o instanceof Float32Array,
_339: o => o instanceof Float64Array,
_340: o => o instanceof ArrayBuffer,
_341: o => o instanceof DataView,
_342: o => o instanceof Array,
_343: o => typeof o === 'function' && o[jsWrappedDartFunctionSymbol] === true,
_347: (l, r) => l === r,
_348: o => o,
_349: o => o,
_350: o => o,
_351: b => !!b,
_352: o => o.length,
_355: (o, i) => o[i],
_356: f => f.dartFunction,
_357: l => arrayFromDartList(Int8Array, l),
_358: l => arrayFromDartList(Uint8Array, l),
_359: l => arrayFromDartList(Uint8ClampedArray, l),
_360: l => arrayFromDartList(Int16Array, l),
_361: l => arrayFromDartList(Uint16Array, l),
_362: l => arrayFromDartList(Int32Array, l),
_363: l => arrayFromDartList(Uint32Array, l),
_364: l => arrayFromDartList(Float32Array, l),
_365: l => arrayFromDartList(Float64Array, l),
_366: (data, length) => {
          const view = new DataView(new ArrayBuffer(length));
          for (let i = 0; i < length; i++) {
              view.setUint8(i, dartInstance.exports.$byteDataGetUint8(data, i));
          }
          return view;
        },
_367: l => arrayFromDartList(Array, l),
_368: stringFromDartString,
_369: stringToDartString,
_370: () => ({}),
_372: l => new Array(l),
_373: () => globalThis,
_374: (constructor, args) => {
      const factoryFunction = constructor.bind.apply(
          constructor, [null, ...args]);
      return new factoryFunction();
    },
_376: (o, p) => o[p],
_380: o => String(o),
_381: (p, s, f) => p.then(s, f),
_400: (o, p) => o[p],
_401: (o, p, v) => o[p] = v,
_404: x0 => globalThis.$$.spread_props(x0),
_405: (x0,x1,x2) => globalThis.$$.prop(x0,x1,x2),
_406: () => globalThis.$$.init(),
_1623: (x0,x1) => x0.value = x1,
_1624: x0 => x0.value,
_2205: () => globalThis.window,
_2265: x0 => x0.location,
_2566: (x0,x1) => x0.hash = x1,
_2567: x0 => x0.hash,
_7064: x0 => x0.detail,
_7173: (x0,x1) => x0.nodeValue = x1,
_7180: () => globalThis.document,
_7882: x0 => x0.clientX,
_7883: x0 => x0.clientY,
_8769: x0 => x0.ok,
_13046: (x0,x1,x2) => x0[x1] = x2,
_13047: x0 => ({cancelable: x0}),
_13048: () => globalThis.$$.createEventDispatcher(),
_13049: (x0,x1,x2,x3,x4) => x0.call(x1,x2,x3,x4)
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

