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
_120: (x0,x1) => x0.querySelector(x1),
_121: f => finalizeWrapper(f,x0 => dartInstance.exports._121(f,x0)),
_122: (x0,x1,x2) => x0.addEventListener(x1,x2),
_123: x0 => new Event(x0),
_124: (x0,x1) => globalThis.$$.template(x0,x1),
_125: x0 => globalThis.$$.template(x0),
_126: (x0,x1,x2) => globalThis.$$.open(x0,x1,x2),
_127: (x0,x1,x2) => globalThis.$$.open_frag(x0,x1,x2),
_128: x0 => globalThis.$$.space(x0),
_129: x0 => globalThis.$$.comment(x0),
_130: (x0,x1) => globalThis.$$.close(x0,x1),
_131: (x0,x1) => globalThis.$$.close_frag(x0,x1),
_132: f => finalizeWrapper(f,x0 => dartInstance.exports._132(f,x0)),
_133: x0 => ({click: x0}),
_134: x0 => ({$$events: x0}),
_135: f => finalizeWrapper(f,x0 => dartInstance.exports._135(f,x0)),
_136: x0 => ({message: x0}),
_137: x0 => ({$$events: x0}),
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
_154: (x0,x1) => globalThis.$$.sibling(x0,x1),
_155: (x0,x1) => globalThis.$$.forward_event(x0,x1),
_157: (x0,x1,x2) => globalThis.$$.event_bubble(x0,x1,x2),
_159: (x0,x1,x2,x3,x4) => globalThis.$$.event(x0,x1,x2,x3,x4),
_160: f => finalizeWrapper(f,x0 => dartInstance.exports._160(f,x0)),
_161: (x0,x1,x2) => globalThis.$$.attr_effect(x0,x1,x2),
_162: f => finalizeWrapper(f,() => dartInstance.exports._162(f)),
_163: (x0,x1,x2) => globalThis.$$.attr(x0,x1,x2),
_164: (x0,x1,x2,x3) => globalThis.$$.if_block(x0,x1,x2,x3),
_165: f => finalizeWrapper(f,() => dartInstance.exports._165(f)),
_166: f => finalizeWrapper(f,x0 => dartInstance.exports._166(f,x0)),
_167: f => finalizeWrapper(f,x0 => dartInstance.exports._167(f,x0)),
_168: (x0,x1,x2) => globalThis.$$.html(x0,x1,x2),
_169: f => finalizeWrapper(f,() => dartInstance.exports._169(f)),
_170: (x0,x1,x2,x3,x4,x5) => globalThis.$$.each_keyed(x0,x1,x2,x3,x4,x5),
_171: f => finalizeWrapper(f,(x0,x1,x2) => dartInstance.exports._171(f,x0,x1,x2)),
_172: f => finalizeWrapper(f,() => dartInstance.exports._172(f)),
_173: f => finalizeWrapper(f,(x0,x1,x2) => dartInstance.exports._173(f,x0,x1,x2)),
_175: (x0,x1,x2,x3,x4) => globalThis.$$.each_indexed(x0,x1,x2,x3,x4),
_176: f => finalizeWrapper(f,() => dartInstance.exports._176(f)),
_177: f => finalizeWrapper(f,(x0,x1,x2) => dartInstance.exports._177(f,x0,x1,x2)),
_179: (x0,x1,x2,x3,x4) => globalThis.$$.await_block(x0,x1,x2,x3,x4),
_180: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._180(f,x0,x1)),
_181: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._181(f,x0,x1)),
_182: f => finalizeWrapper(f,() => dartInstance.exports._182(f)),
_183: f => finalizeWrapper(f,x0 => dartInstance.exports._183(f,x0)),
_184: x0 => x0.error,
_209: x0 => globalThis.$$.get(x0),
_210: (x0,x1) => globalThis.$$.push(x0,x1),
_211: (x0,x1,x2) => globalThis.$$.set_getter(x0,x1,x2),
_212: f => finalizeWrapper(f,() => dartInstance.exports._212(f)),
_214: () => globalThis.$$.pop(),
_215: x0 => globalThis.$$.mutable_source(x0),
_216: (x0,x1) => globalThis.$$.mutate(x0,x1),
_217: (x0,x1) => globalThis.$$.set(x0,x1),
_218: (x0,x1) => globalThis.$$.legacy_pre_effect(x0,x1),
_219: f => finalizeWrapper(f,() => dartInstance.exports._219(f)),
_220: f => finalizeWrapper(f,() => dartInstance.exports._220(f)),
_221: () => globalThis.$$.legacy_pre_effect_reset(),
_222: x0 => globalThis.$$.render_effect(x0),
_223: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._223(f,x0,x1)),
_224: (x0,x1) => globalThis.$$.text_effect(x0,x1),
_225: f => finalizeWrapper(f,() => dartInstance.exports._225(f)),
_226: (x0,x1) => globalThis.$$.text(x0,x1),
_227: x0 => ({target: x0}),
_230: (x0,x1) => globalThis.$$.mount(x0,x1),
_231: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._231(f,x0,x1)),
_232: x0 => globalThis.$$.unmount(x0),
_233: (x0,x1,x2) => globalThis.$$.append_styles(x0,x1,x2),
_234: (a, i) => a.push(i),
_242: (a, s, e) => a.slice(s, e),
_245: a => a.length,
_247: (a, i) => a[i],
_248: (a, i, v) => a[i] = v,
_250: a => a.join(''),
_260: (s, p, i) => s.indexOf(p, i),
_262: (o, offsetInBytes, lengthInBytes) => {
      var dst = new ArrayBuffer(lengthInBytes);
      new Uint8Array(dst).set(new Uint8Array(o, offsetInBytes, lengthInBytes));
      return new DataView(dst);
    },
_263: (o, start, length) => new Uint8Array(o.buffer, o.byteOffset + start, length),
_264: (o, start, length) => new Int8Array(o.buffer, o.byteOffset + start, length),
_265: (o, start, length) => new Uint8ClampedArray(o.buffer, o.byteOffset + start, length),
_266: (o, start, length) => new Uint16Array(o.buffer, o.byteOffset + start, length),
_267: (o, start, length) => new Int16Array(o.buffer, o.byteOffset + start, length),
_268: (o, start, length) => new Uint32Array(o.buffer, o.byteOffset + start, length),
_269: (o, start, length) => new Int32Array(o.buffer, o.byteOffset + start, length),
_272: (o, start, length) => new Float32Array(o.buffer, o.byteOffset + start, length),
_273: (o, start, length) => new Float64Array(o.buffer, o.byteOffset + start, length),
_277: (o) => new DataView(o.buffer, o.byteOffset, o.byteLength),
_279: o => o.buffer,
_280: o => o.byteOffset,
_281: Function.prototype.call.bind(Object.getOwnPropertyDescriptor(DataView.prototype, 'byteLength').get),
_282: (b, o) => new DataView(b, o),
_284: Function.prototype.call.bind(DataView.prototype.getUint8),
_285: Function.prototype.call.bind(DataView.prototype.setUint8),
_286: Function.prototype.call.bind(DataView.prototype.getInt8),
_287: Function.prototype.call.bind(DataView.prototype.setInt8),
_288: Function.prototype.call.bind(DataView.prototype.getUint16),
_289: Function.prototype.call.bind(DataView.prototype.setUint16),
_290: Function.prototype.call.bind(DataView.prototype.getInt16),
_291: Function.prototype.call.bind(DataView.prototype.setInt16),
_292: Function.prototype.call.bind(DataView.prototype.getUint32),
_293: Function.prototype.call.bind(DataView.prototype.setUint32),
_294: Function.prototype.call.bind(DataView.prototype.getInt32),
_295: Function.prototype.call.bind(DataView.prototype.setInt32),
_300: Function.prototype.call.bind(DataView.prototype.getFloat32),
_302: Function.prototype.call.bind(DataView.prototype.getFloat64),
_323: o => o === undefined,
_324: o => typeof o === 'boolean',
_325: o => typeof o === 'number',
_327: o => typeof o === 'string',
_330: o => o instanceof Int8Array,
_331: o => o instanceof Uint8Array,
_332: o => o instanceof Uint8ClampedArray,
_333: o => o instanceof Int16Array,
_334: o => o instanceof Uint16Array,
_335: o => o instanceof Int32Array,
_336: o => o instanceof Uint32Array,
_337: o => o instanceof Float32Array,
_338: o => o instanceof Float64Array,
_339: o => o instanceof ArrayBuffer,
_340: o => o instanceof DataView,
_341: o => o instanceof Array,
_342: o => typeof o === 'function' && o[jsWrappedDartFunctionSymbol] === true,
_346: (l, r) => l === r,
_347: o => o,
_348: o => o,
_349: o => o,
_350: b => !!b,
_351: o => o.length,
_354: (o, i) => o[i],
_355: f => f.dartFunction,
_356: l => arrayFromDartList(Int8Array, l),
_357: l => arrayFromDartList(Uint8Array, l),
_358: l => arrayFromDartList(Uint8ClampedArray, l),
_359: l => arrayFromDartList(Int16Array, l),
_360: l => arrayFromDartList(Uint16Array, l),
_361: l => arrayFromDartList(Int32Array, l),
_362: l => arrayFromDartList(Uint32Array, l),
_363: l => arrayFromDartList(Float32Array, l),
_364: l => arrayFromDartList(Float64Array, l),
_365: (data, length) => {
          const view = new DataView(new ArrayBuffer(length));
          for (let i = 0; i < length; i++) {
              view.setUint8(i, dartInstance.exports.$byteDataGetUint8(data, i));
          }
          return view;
        },
_366: l => arrayFromDartList(Array, l),
_367: stringFromDartString,
_368: stringToDartString,
_369: () => ({}),
_371: l => new Array(l),
_372: () => globalThis,
_373: (constructor, args) => {
      const factoryFunction = constructor.bind.apply(
          constructor, [null, ...args]);
      return new factoryFunction();
    },
_375: (o, p) => o[p],
_379: o => String(o),
_380: (p, s, f) => p.then(s, f),
_399: (o, p) => o[p],
_400: (o, p, v) => o[p] = v,
_403: x0 => globalThis.$$.spread_props(x0),
_404: (x0,x1,x2) => globalThis.$$.prop(x0,x1,x2),
_405: () => globalThis.$$.init(),
_938: (x0,x1) => x0.hash = x1,
_1622: (x0,x1) => x0.value = x1,
_1623: x0 => x0.value,
_2204: () => globalThis.window,
_2264: x0 => x0.location,
_2565: (x0,x1) => x0.hash = x1,
_2566: x0 => x0.hash,
_7063: x0 => x0.detail,
_7172: (x0,x1) => x0.nodeValue = x1,
_7179: () => globalThis.document,
_7881: x0 => x0.clientX,
_7882: x0 => x0.clientY,
_8768: x0 => x0.ok,
_13045: (x0,x1,x2) => x0[x1] = x2,
_13046: x0 => ({cancelable: x0}),
_13047: () => globalThis.$$.createEventDispatcher(),
_13048: (x0,x1,x2,x3,x4) => x0.call(x1,x2,x3,x4)
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

