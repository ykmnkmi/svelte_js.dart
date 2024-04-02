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
_137: (x0,x1) => x0.log(x1),
_139: x0 => x0.current,
_140: () => ({}),
_141: (x0,x1,x2,x3) => ({name: x0,version: x1,speed: x2,website: x3}),
_142: x0 => x0.name,
_143: x0 => x0.version,
_144: x0 => x0.speed,
_145: x0 => x0.website,
_146: x0 => ({answer: x0}),
_148: x0 => ({answer: x0}),
_149: x0 => x0.answer,
_150: (x0,x1) => x0.fetch(x1),
_151: x0 => x0.text(),
_152: x0 => globalThis.$$.child(x0),
_153: (x0,x1) => globalThis.$$.child_frag(x0,x1),
_154: x0 => globalThis.$$.child_frag(x0),
_155: (x0,x1) => globalThis.$$.sibling(x0,x1),
_156: x0 => globalThis.$$.sibling(x0),
_157: (x0,x1) => globalThis.$$.forward_event(x0,x1),
_159: (x0,x1,x2) => globalThis.$$.event_bubble(x0,x1,x2),
_161: (x0,x1,x2,x3,x4) => globalThis.$$.event(x0,x1,x2,x3,x4),
_162: f => finalizeWrapper(f,x0 => dartInstance.exports._162(f,x0)),
_163: (x0,x1,x2) => globalThis.$$.attr_effect(x0,x1,x2),
_164: f => finalizeWrapper(f,() => dartInstance.exports._164(f)),
_165: (x0,x1,x2) => globalThis.$$.attr(x0,x1,x2),
_166: (x0,x1,x2,x3) => globalThis.$$.if_block(x0,x1,x2,x3),
_167: f => finalizeWrapper(f,() => dartInstance.exports._167(f)),
_168: f => finalizeWrapper(f,x0 => dartInstance.exports._168(f,x0)),
_169: f => finalizeWrapper(f,x0 => dartInstance.exports._169(f,x0)),
_170: (x0,x1,x2) => globalThis.$$.html(x0,x1,x2),
_171: f => finalizeWrapper(f,() => dartInstance.exports._171(f)),
_172: (x0,x1,x2,x3,x4,x5) => globalThis.$$.each_keyed(x0,x1,x2,x3,x4,x5),
_173: f => finalizeWrapper(f,(x0,x1,x2) => dartInstance.exports._173(f,x0,x1,x2)),
_174: f => finalizeWrapper(f,() => dartInstance.exports._174(f)),
_175: f => finalizeWrapper(f,(x0,x1,x2) => dartInstance.exports._175(f,x0,x1,x2)),
_177: (x0,x1,x2,x3,x4) => globalThis.$$.each_indexed(x0,x1,x2,x3,x4),
_178: f => finalizeWrapper(f,() => dartInstance.exports._178(f)),
_179: f => finalizeWrapper(f,(x0,x1,x2) => dartInstance.exports._179(f,x0,x1,x2)),
_181: (x0,x1,x2,x3,x4) => globalThis.$$.await_block(x0,x1,x2,x3,x4),
_182: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._182(f,x0,x1)),
_183: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._183(f,x0,x1)),
_184: f => finalizeWrapper(f,() => dartInstance.exports._184(f)),
_185: f => finalizeWrapper(f,x0 => dartInstance.exports._185(f,x0)),
_186: x0 => x0.error,
_211: x0 => globalThis.$$.get(x0),
_212: (x0,x1) => globalThis.$$.push(x0,x1),
_213: (x0,x1,x2) => globalThis.$$.set_getter(x0,x1,x2),
_214: f => finalizeWrapper(f,() => dartInstance.exports._214(f)),
_216: () => globalThis.$$.pop(),
_217: x0 => globalThis.$$.mutable_source(x0),
_218: (x0,x1) => globalThis.$$.mutate(x0,x1),
_219: (x0,x1) => globalThis.$$.set(x0,x1),
_220: (x0,x1) => globalThis.$$.legacy_pre_effect(x0,x1),
_221: f => finalizeWrapper(f,() => dartInstance.exports._221(f)),
_222: f => finalizeWrapper(f,() => dartInstance.exports._222(f)),
_223: () => globalThis.$$.legacy_pre_effect_reset(),
_224: x0 => globalThis.$$.render_effect(x0),
_225: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._225(f,x0,x1)),
_226: (x0,x1) => globalThis.$$.text_effect(x0,x1),
_227: f => finalizeWrapper(f,() => dartInstance.exports._227(f)),
_228: (x0,x1) => globalThis.$$.text(x0,x1),
_229: x0 => ({target: x0}),
_232: (x0,x1) => globalThis.$$.mount(x0,x1),
_233: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._233(f,x0,x1)),
_234: x0 => globalThis.$$.unmount(x0),
_235: (x0,x1,x2) => globalThis.$$.append_styles(x0,x1,x2),
_236: (a, i) => a.push(i),
_244: (a, s, e) => a.slice(s, e),
_247: a => a.length,
_249: (a, i) => a[i],
_250: (a, i, v) => a[i] = v,
_252: a => a.join(''),
_262: (s, p, i) => s.indexOf(p, i),
_264: (o, offsetInBytes, lengthInBytes) => {
      var dst = new ArrayBuffer(lengthInBytes);
      new Uint8Array(dst).set(new Uint8Array(o, offsetInBytes, lengthInBytes));
      return new DataView(dst);
    },
_265: (o, start, length) => new Uint8Array(o.buffer, o.byteOffset + start, length),
_266: (o, start, length) => new Int8Array(o.buffer, o.byteOffset + start, length),
_267: (o, start, length) => new Uint8ClampedArray(o.buffer, o.byteOffset + start, length),
_268: (o, start, length) => new Uint16Array(o.buffer, o.byteOffset + start, length),
_269: (o, start, length) => new Int16Array(o.buffer, o.byteOffset + start, length),
_270: (o, start, length) => new Uint32Array(o.buffer, o.byteOffset + start, length),
_271: (o, start, length) => new Int32Array(o.buffer, o.byteOffset + start, length),
_274: (o, start, length) => new Float32Array(o.buffer, o.byteOffset + start, length),
_275: (o, start, length) => new Float64Array(o.buffer, o.byteOffset + start, length),
_279: (o) => new DataView(o.buffer, o.byteOffset, o.byteLength),
_281: o => o.buffer,
_282: o => o.byteOffset,
_283: Function.prototype.call.bind(Object.getOwnPropertyDescriptor(DataView.prototype, 'byteLength').get),
_284: (b, o) => new DataView(b, o),
_286: Function.prototype.call.bind(DataView.prototype.getUint8),
_287: Function.prototype.call.bind(DataView.prototype.setUint8),
_288: Function.prototype.call.bind(DataView.prototype.getInt8),
_289: Function.prototype.call.bind(DataView.prototype.setInt8),
_290: Function.prototype.call.bind(DataView.prototype.getUint16),
_291: Function.prototype.call.bind(DataView.prototype.setUint16),
_292: Function.prototype.call.bind(DataView.prototype.getInt16),
_293: Function.prototype.call.bind(DataView.prototype.setInt16),
_294: Function.prototype.call.bind(DataView.prototype.getUint32),
_295: Function.prototype.call.bind(DataView.prototype.setUint32),
_296: Function.prototype.call.bind(DataView.prototype.getInt32),
_297: Function.prototype.call.bind(DataView.prototype.setInt32),
_302: Function.prototype.call.bind(DataView.prototype.getFloat32),
_304: Function.prototype.call.bind(DataView.prototype.getFloat64),
_325: o => o === undefined,
_326: o => typeof o === 'boolean',
_327: o => typeof o === 'number',
_329: o => typeof o === 'string',
_332: o => o instanceof Int8Array,
_333: o => o instanceof Uint8Array,
_334: o => o instanceof Uint8ClampedArray,
_335: o => o instanceof Int16Array,
_336: o => o instanceof Uint16Array,
_337: o => o instanceof Int32Array,
_338: o => o instanceof Uint32Array,
_339: o => o instanceof Float32Array,
_340: o => o instanceof Float64Array,
_341: o => o instanceof ArrayBuffer,
_342: o => o instanceof DataView,
_343: o => o instanceof Array,
_344: o => typeof o === 'function' && o[jsWrappedDartFunctionSymbol] === true,
_348: (l, r) => l === r,
_349: o => o,
_350: o => o,
_351: o => o,
_352: b => !!b,
_353: o => o.length,
_356: (o, i) => o[i],
_357: f => f.dartFunction,
_358: l => arrayFromDartList(Int8Array, l),
_359: l => arrayFromDartList(Uint8Array, l),
_360: l => arrayFromDartList(Uint8ClampedArray, l),
_361: l => arrayFromDartList(Int16Array, l),
_362: l => arrayFromDartList(Uint16Array, l),
_363: l => arrayFromDartList(Int32Array, l),
_364: l => arrayFromDartList(Uint32Array, l),
_365: l => arrayFromDartList(Float32Array, l),
_366: l => arrayFromDartList(Float64Array, l),
_367: (data, length) => {
          const view = new DataView(new ArrayBuffer(length));
          for (let i = 0; i < length; i++) {
              view.setUint8(i, dartInstance.exports.$byteDataGetUint8(data, i));
          }
          return view;
        },
_368: l => arrayFromDartList(Array, l),
_369: stringFromDartString,
_370: stringToDartString,
_371: () => ({}),
_373: l => new Array(l),
_374: () => globalThis,
_375: (constructor, args) => {
      const factoryFunction = constructor.bind.apply(
          constructor, [null, ...args]);
      return new factoryFunction();
    },
_377: (o, p) => o[p],
_381: o => String(o),
_382: (p, s, f) => p.then(s, f),
_401: (o, p) => o[p],
_402: (o, p, v) => o[p] = v,
_405: x0 => globalThis.$$.spread_props(x0),
_406: (x0,x1,x2) => globalThis.$$.prop(x0,x1,x2),
_407: () => globalThis.$$.init(),
_1624: (x0,x1) => x0.value = x1,
_1625: x0 => x0.value,
_2206: () => globalThis.window,
_2266: x0 => x0.location,
_2567: (x0,x1) => x0.hash = x1,
_2568: x0 => x0.hash,
_7065: x0 => x0.detail,
_7174: (x0,x1) => x0.nodeValue = x1,
_7181: () => globalThis.document,
_7883: x0 => x0.clientX,
_7884: x0 => x0.clientY,
_8770: x0 => x0.ok,
_13026: () => globalThis.console,
_13047: (x0,x1,x2) => x0[x1] = x2,
_13048: x0 => ({cancelable: x0}),
_13049: () => globalThis.$$.createEventDispatcher(),
_13050: (x0,x1,x2,x3,x4) => x0.call(x1,x2,x3,x4)
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

