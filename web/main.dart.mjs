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
_161: (x0,x1,x2) => globalThis.$$.bind_value(x0,x1,x2),
_162: f => finalizeWrapper(f,() => dartInstance.exports._162(f)),
_163: f => finalizeWrapper(f,x0 => dartInstance.exports._163(f,x0)),
_166: f => finalizeWrapper(f,() => dartInstance.exports._166(f)),
_167: f => finalizeWrapper(f,x0 => dartInstance.exports._167(f,x0)),
_168: x0 => globalThis.$$.remove_input_attr_defaults(x0),
_169: (x0,x1,x2) => globalThis.$$.attr_effect(x0,x1,x2),
_170: f => finalizeWrapper(f,() => dartInstance.exports._170(f)),
_171: (x0,x1,x2) => globalThis.$$.attr(x0,x1,x2),
_172: (x0,x1,x2,x3) => globalThis.$$.if_block(x0,x1,x2,x3),
_173: f => finalizeWrapper(f,() => dartInstance.exports._173(f)),
_174: f => finalizeWrapper(f,x0 => dartInstance.exports._174(f,x0)),
_175: f => finalizeWrapper(f,x0 => dartInstance.exports._175(f,x0)),
_176: (x0,x1,x2) => globalThis.$$.html(x0,x1,x2),
_177: f => finalizeWrapper(f,() => dartInstance.exports._177(f)),
_178: (x0,x1,x2,x3,x4,x5) => globalThis.$$.each_keyed(x0,x1,x2,x3,x4,x5),
_179: f => finalizeWrapper(f,(x0,x1,x2) => dartInstance.exports._179(f,x0,x1,x2)),
_180: f => finalizeWrapper(f,() => dartInstance.exports._180(f)),
_181: f => finalizeWrapper(f,(x0,x1,x2) => dartInstance.exports._181(f,x0,x1,x2)),
_183: (x0,x1,x2,x3,x4) => globalThis.$$.each_indexed(x0,x1,x2,x3,x4),
_184: f => finalizeWrapper(f,() => dartInstance.exports._184(f)),
_185: f => finalizeWrapper(f,(x0,x1,x2) => dartInstance.exports._185(f,x0,x1,x2)),
_187: (x0,x1,x2,x3,x4) => globalThis.$$.await_block(x0,x1,x2,x3,x4),
_188: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._188(f,x0,x1)),
_189: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._189(f,x0,x1)),
_190: f => finalizeWrapper(f,() => dartInstance.exports._190(f)),
_191: f => finalizeWrapper(f,x0 => dartInstance.exports._191(f,x0)),
_192: x0 => x0.error,
_217: x0 => globalThis.$$.get(x0),
_218: (x0,x1) => globalThis.$$.push(x0,x1),
_219: (x0,x1,x2) => globalThis.$$.set_getter(x0,x1,x2),
_220: f => finalizeWrapper(f,() => dartInstance.exports._220(f)),
_222: () => globalThis.$$.pop(),
_223: x0 => globalThis.$$.mutable_source(x0),
_224: (x0,x1) => globalThis.$$.mutate(x0,x1),
_225: (x0,x1) => globalThis.$$.set(x0,x1),
_226: (x0,x1) => globalThis.$$.legacy_pre_effect(x0,x1),
_227: f => finalizeWrapper(f,() => dartInstance.exports._227(f)),
_228: f => finalizeWrapper(f,() => dartInstance.exports._228(f)),
_229: () => globalThis.$$.legacy_pre_effect_reset(),
_230: x0 => globalThis.$$.render_effect(x0),
_231: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._231(f,x0,x1)),
_232: (x0,x1) => globalThis.$$.text_effect(x0,x1),
_233: f => finalizeWrapper(f,() => dartInstance.exports._233(f)),
_234: (x0,x1) => globalThis.$$.text(x0,x1),
_235: x0 => ({target: x0}),
_238: (x0,x1) => globalThis.$$.mount(x0,x1),
_239: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._239(f,x0,x1)),
_240: x0 => globalThis.$$.unmount(x0),
_241: (x0,x1,x2) => globalThis.$$.append_styles(x0,x1,x2),
_242: (a, i) => a.push(i),
_250: (a, s, e) => a.slice(s, e),
_253: a => a.length,
_255: (a, i) => a[i],
_256: (a, i, v) => a[i] = v,
_258: a => a.join(''),
_268: (s, p, i) => s.indexOf(p, i),
_270: (o, offsetInBytes, lengthInBytes) => {
      var dst = new ArrayBuffer(lengthInBytes);
      new Uint8Array(dst).set(new Uint8Array(o, offsetInBytes, lengthInBytes));
      return new DataView(dst);
    },
_271: (o, start, length) => new Uint8Array(o.buffer, o.byteOffset + start, length),
_272: (o, start, length) => new Int8Array(o.buffer, o.byteOffset + start, length),
_273: (o, start, length) => new Uint8ClampedArray(o.buffer, o.byteOffset + start, length),
_274: (o, start, length) => new Uint16Array(o.buffer, o.byteOffset + start, length),
_275: (o, start, length) => new Int16Array(o.buffer, o.byteOffset + start, length),
_276: (o, start, length) => new Uint32Array(o.buffer, o.byteOffset + start, length),
_277: (o, start, length) => new Int32Array(o.buffer, o.byteOffset + start, length),
_280: (o, start, length) => new Float32Array(o.buffer, o.byteOffset + start, length),
_281: (o, start, length) => new Float64Array(o.buffer, o.byteOffset + start, length),
_285: (o) => new DataView(o.buffer, o.byteOffset, o.byteLength),
_287: o => o.buffer,
_288: o => o.byteOffset,
_289: Function.prototype.call.bind(Object.getOwnPropertyDescriptor(DataView.prototype, 'byteLength').get),
_290: (b, o) => new DataView(b, o),
_292: Function.prototype.call.bind(DataView.prototype.getUint8),
_293: Function.prototype.call.bind(DataView.prototype.setUint8),
_294: Function.prototype.call.bind(DataView.prototype.getInt8),
_295: Function.prototype.call.bind(DataView.prototype.setInt8),
_296: Function.prototype.call.bind(DataView.prototype.getUint16),
_297: Function.prototype.call.bind(DataView.prototype.setUint16),
_298: Function.prototype.call.bind(DataView.prototype.getInt16),
_299: Function.prototype.call.bind(DataView.prototype.setInt16),
_300: Function.prototype.call.bind(DataView.prototype.getUint32),
_301: Function.prototype.call.bind(DataView.prototype.setUint32),
_302: Function.prototype.call.bind(DataView.prototype.getInt32),
_303: Function.prototype.call.bind(DataView.prototype.setInt32),
_308: Function.prototype.call.bind(DataView.prototype.getFloat32),
_310: Function.prototype.call.bind(DataView.prototype.getFloat64),
_331: o => o === undefined,
_332: o => typeof o === 'boolean',
_333: o => typeof o === 'number',
_335: o => typeof o === 'string',
_338: o => o instanceof Int8Array,
_339: o => o instanceof Uint8Array,
_340: o => o instanceof Uint8ClampedArray,
_341: o => o instanceof Int16Array,
_342: o => o instanceof Uint16Array,
_343: o => o instanceof Int32Array,
_344: o => o instanceof Uint32Array,
_345: o => o instanceof Float32Array,
_346: o => o instanceof Float64Array,
_347: o => o instanceof ArrayBuffer,
_348: o => o instanceof DataView,
_349: o => o instanceof Array,
_350: o => typeof o === 'function' && o[jsWrappedDartFunctionSymbol] === true,
_354: (l, r) => l === r,
_355: o => o,
_356: o => o,
_357: o => o,
_358: b => !!b,
_359: o => o.length,
_362: (o, i) => o[i],
_363: f => f.dartFunction,
_364: l => arrayFromDartList(Int8Array, l),
_365: l => arrayFromDartList(Uint8Array, l),
_366: l => arrayFromDartList(Uint8ClampedArray, l),
_367: l => arrayFromDartList(Int16Array, l),
_368: l => arrayFromDartList(Uint16Array, l),
_369: l => arrayFromDartList(Int32Array, l),
_370: l => arrayFromDartList(Uint32Array, l),
_371: l => arrayFromDartList(Float32Array, l),
_372: l => arrayFromDartList(Float64Array, l),
_373: (data, length) => {
          const view = new DataView(new ArrayBuffer(length));
          for (let i = 0; i < length; i++) {
              view.setUint8(i, dartInstance.exports.$byteDataGetUint8(data, i));
          }
          return view;
        },
_374: l => arrayFromDartList(Array, l),
_375: stringFromDartString,
_376: stringToDartString,
_377: () => ({}),
_379: l => new Array(l),
_380: () => globalThis,
_381: (constructor, args) => {
      const factoryFunction = constructor.bind.apply(
          constructor, [null, ...args]);
      return new factoryFunction();
    },
_383: (o, p) => o[p],
_387: o => String(o),
_388: (p, s, f) => p.then(s, f),
_407: (o, p) => o[p],
_408: (o, p, v) => o[p] = v,
_411: x0 => globalThis.$$.spread_props(x0),
_412: (x0,x1,x2) => globalThis.$$.prop(x0,x1,x2),
_413: () => globalThis.$$.init(),
_946: (x0,x1) => x0.hash = x1,
_1630: (x0,x1) => x0.value = x1,
_1631: x0 => x0.value,
_2212: () => globalThis.window,
_2272: x0 => x0.location,
_2573: (x0,x1) => x0.hash = x1,
_2574: x0 => x0.hash,
_7071: x0 => x0.detail,
_7180: (x0,x1) => x0.nodeValue = x1,
_7187: () => globalThis.document,
_7889: x0 => x0.clientX,
_7890: x0 => x0.clientY,
_8776: x0 => x0.ok,
_13053: (x0,x1,x2) => x0[x1] = x2,
_13054: x0 => ({cancelable: x0}),
_13055: () => globalThis.$$.createEventDispatcher(),
_13056: (x0,x1,x2,x3,x4) => x0.call(x1,x2,x3,x4)
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

