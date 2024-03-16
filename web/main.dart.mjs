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

    if (WebAssembly.String === undefined) {
        printToConsole("WebAssembly.String is undefined, adding polyfill");
        WebAssembly.String = {
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
    }

    // Imports
    const dart2wasm = {

  _120: (x0,x1) => x0.querySelector(x1),
_121: (x0,x1) => x0.querySelector(x1),
_122: f => finalizeWrapper(f,x0 => dartInstance.exports._122(f,x0)),
_123: (x0,x1,x2) => x0.addEventListener(x1,x2),
_134: (x0,x1) => x0.alert(x1),
_119: () => ({}),
_132: x0 => ({answer: x0}),
_133: x0 => x0.answer,
_130: x0 => ({answer: x0}),
_125: (x0,x1,x2,x3) => ({name: x0,version: x1,speed: x2,website: x3}),
_126: x0 => x0.name,
_127: x0 => x0.version,
_128: x0 => x0.speed,
_129: x0 => x0.website,
_118: x0 => x0.current,
_169: (x0,x1,x2) => x0[x1] = x2,
_170: (x0,x1,x2,x3,x4,x5) => globalThis.$$.each_keyed(x0,x1,x2,x3,x4,x5),
_171: f => finalizeWrapper(f,() => dartInstance.exports._171(f)),
_172: f => finalizeWrapper(f,(x0,x1,x2) => dartInstance.exports._172(f,x0,x1,x2)),
_173: f => finalizeWrapper(f,(x0,x1,x2) => dartInstance.exports._173(f,x0,x1,x2)),
_175: (x0,x1,x2,x3,x4) => globalThis.$$.each_indexed(x0,x1,x2,x3,x4),
_176: f => finalizeWrapper(f,() => dartInstance.exports._176(f)),
_177: f => finalizeWrapper(f,(x0,x1,x2) => dartInstance.exports._177(f,x0,x1,x2)),
_196: (x0,x1,x2,x3) => globalThis.$$.if_block(x0,x1,x2,x3),
_197: f => finalizeWrapper(f,() => dartInstance.exports._197(f)),
_198: f => finalizeWrapper(f,x0 => dartInstance.exports._198(f,x0)),
_199: f => finalizeWrapper(f,x0 => dartInstance.exports._199(f,x0)),
_167: (x0,x1,x2) => globalThis.$$.set_getter(x0,x1,x2),
_168: f => finalizeWrapper(f,() => dartInstance.exports._168(f)),
_191: x0 => globalThis.$$.child(x0),
_192: (x0,x1) => globalThis.$$.child_frag(x0,x1),
_193: x0 => globalThis.$$.child_frag(x0),
_194: (x0,x1) => globalThis.$$.sibling(x0,x1),
_195: x0 => globalThis.$$.sibling(x0),
_200: x0 => globalThis.$$.pre_effect(x0),
_201: f => finalizeWrapper(f,() => dartInstance.exports._201(f)),
_202: x0 => globalThis.$$.render_effect(x0),
_203: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._203(f,x0,x1)),
_166: x0 => globalThis.$$.mutable_source(x0),
_135: (x0,x1) => globalThis.$$.template(x0,x1),
_136: x0 => globalThis.$$.template(x0),
_137: (x0,x1,x2) => globalThis.$$.open(x0,x1,x2),
_138: (x0,x1,x2) => globalThis.$$.open_frag(x0,x1,x2),
_139: x0 => globalThis.$$.space(x0),
_140: x0 => globalThis.$$.comment(x0),
_141: (x0,x1) => globalThis.$$.close(x0,x1),
_142: (x0,x1) => globalThis.$$.close_frag(x0,x1),
_144: f => finalizeWrapper(f,x0 => dartInstance.exports._144(f,x0)),
_145: (x0,x1,x2,x3) => globalThis.$$.event(x0,x1,x2,x3),
_147: (x0,x1) => globalThis.$$.text_effect(x0,x1),
_148: f => finalizeWrapper(f,() => dartInstance.exports._148(f)),
_149: (x0,x1) => globalThis.$$.text(x0,x1),
_150: (x0,x1,x2) => globalThis.$$.html(x0,x1,x2),
_151: f => finalizeWrapper(f,() => dartInstance.exports._151(f)),
_152: (x0,x1,x2) => globalThis.$$.attr_effect(x0,x1,x2),
_153: f => finalizeWrapper(f,() => dartInstance.exports._153(f)),
_154: (x0,x1,x2) => globalThis.$$.attr(x0,x1,x2),
_156: x0 => globalThis.$$.spread_props(x0),
_157: x0 => ({target: x0}),
_160: (x0,x1) => globalThis.$$.mount(x0,x1),
_161: f => finalizeWrapper(f,(x0,x1) => dartInstance.exports._161(f,x0,x1)),
_162: x0 => globalThis.$$.unmount(x0),
_164: (x0,x1,x2) => globalThis.$$.prop(x0,x1,x2),
_165: () => globalThis.$$.init(),
_107: x0 => globalThis.$$.get(x0),
_108: (x0,x1) => globalThis.$$.set(x0,x1),
_109: (x0,x1) => globalThis.$$.mutate(x0,x1),
_110: x0 => globalThis.$$.untrack(x0),
_111: f => finalizeWrapper(f,() => dartInstance.exports._111(f)),
_112: (x0,x1) => globalThis.$$.push(x0,x1),
_115: () => globalThis.$$.pop(),
_116: x0 => globalThis.$$.unwrap(x0),
_12992: () => globalThis.console,
_7147: () => globalThis.document,
_1591: x0 => x0.value,
_2172: () => globalThis.window,
_104: (x0,x1) => x0.log(x1),
_105: (x0,x1) => x0.log(x1),
_106: (x0,x1) => x0.log(x1),
_72: s => stringToDartString(JSON.stringify(stringFromDartString(s))),
_73: s => printToConsole(stringFromDartString(s)),
_295: o => o === undefined,
_296: o => typeof o === 'boolean',
_297: o => typeof o === 'number',
_299: o => typeof o === 'string',
_302: o => o instanceof Int8Array,
_303: o => o instanceof Uint8Array,
_304: o => o instanceof Uint8ClampedArray,
_305: o => o instanceof Int16Array,
_306: o => o instanceof Uint16Array,
_307: o => o instanceof Int32Array,
_308: o => o instanceof Uint32Array,
_309: o => o instanceof Float32Array,
_310: o => o instanceof Float64Array,
_311: o => o instanceof ArrayBuffer,
_312: o => o instanceof DataView,
_313: o => o instanceof Array,
_314: o => typeof o === 'function' && o[jsWrappedDartFunctionSymbol] === true,
_316: o => {
            const proto = Object.getPrototypeOf(o);
            return proto === Object.prototype || proto === null;
          },
_318: (l, r) => l === r,
_319: o => o,
_320: o => o,
_321: o => o,
_322: b => !!b,
_323: o => o.length,
_326: (o, i) => o[i],
_327: f => f.dartFunction,
_328: l => arrayFromDartList(Int8Array, l),
_329: l => arrayFromDartList(Uint8Array, l),
_330: l => arrayFromDartList(Uint8ClampedArray, l),
_331: l => arrayFromDartList(Int16Array, l),
_332: l => arrayFromDartList(Uint16Array, l),
_333: l => arrayFromDartList(Int32Array, l),
_334: l => arrayFromDartList(Uint32Array, l),
_335: l => arrayFromDartList(Float32Array, l),
_336: l => arrayFromDartList(Float64Array, l),
_337: (data, length) => {
          const view = new DataView(new ArrayBuffer(length));
          for (let i = 0; i < length; i++) {
              view.setUint8(i, dartInstance.exports.$byteDataGetUint8(data, i));
          }
          return view;
        },
_338: l => arrayFromDartList(Array, l),
_339: stringFromDartString,
_340: stringToDartString,
_341: () => ({}),
_344: () => globalThis,
_347: (o, p) => o[p],
_343: l => new Array(l),
_351: o => String(o),
_254: (o) => new DataView(o.buffer, o.byteOffset, o.byteLength),
_256: o => o.buffer,
_204: (a, i) => a.push(i),
_212: (a, s, e) => a.slice(s, e),
_215: a => a.length,
_217: (a, i) => a[i],
_218: (a, i, v) => a[i] = v,
_220: a => a.join(''),
_230: (s, p, i) => s.indexOf(p, i),
_232: (o, offsetInBytes, lengthInBytes) => {
      var dst = new ArrayBuffer(lengthInBytes);
      new Uint8Array(dst).set(new Uint8Array(o, offsetInBytes, lengthInBytes));
      return new DataView(dst);
    },
_233: (o, start, length) => new Uint8Array(o.buffer, o.byteOffset + start, length),
_234: (o, start, length) => new Int8Array(o.buffer, o.byteOffset + start, length),
_235: (o, start, length) => new Uint8ClampedArray(o.buffer, o.byteOffset + start, length),
_236: (o, start, length) => new Uint16Array(o.buffer, o.byteOffset + start, length),
_237: (o, start, length) => new Int16Array(o.buffer, o.byteOffset + start, length),
_238: (o, start, length) => new Uint32Array(o.buffer, o.byteOffset + start, length),
_239: (o, start, length) => new Int32Array(o.buffer, o.byteOffset + start, length),
_242: (o, start, length) => new Float32Array(o.buffer, o.byteOffset + start, length),
_243: (o, start, length) => new Float64Array(o.buffer, o.byteOffset + start, length),
_245: WebAssembly.String.charCodeAt,
_248: WebAssembly.String.length,
_249: WebAssembly.String.equals,
_250: WebAssembly.String.compare,
_251: WebAssembly.String.fromCharCode,
_257: o => o.byteOffset,
_258: Function.prototype.call.bind(Object.getOwnPropertyDescriptor(DataView.prototype, 'byteLength').get),
_259: (b, o) => new DataView(b, o),
_261: Function.prototype.call.bind(DataView.prototype.getUint8),
_263: Function.prototype.call.bind(DataView.prototype.getInt8),
_265: Function.prototype.call.bind(DataView.prototype.getUint16),
_267: Function.prototype.call.bind(DataView.prototype.getInt16),
_269: Function.prototype.call.bind(DataView.prototype.getUint32),
_271: Function.prototype.call.bind(DataView.prototype.getInt32),
_277: Function.prototype.call.bind(DataView.prototype.getFloat32),
_279: Function.prototype.call.bind(DataView.prototype.getFloat64),
_83: (c) =>
              queueMicrotask(() => dartInstance.exports.$invokeCallback(c)),
_11: x0 => new Array(x0),
_14: (o, c) => o instanceof c,
_16: (o,s) => o[s],
_17: (o,s,v) => o[s] = v,
_20: (x0,x1,x2) => x0.call(x1,x2),
_44: () => Symbol("jsBoxedDartObjectProperty"),
_371: (o, p) => o[p],
_372: (o, p, v) => o[p] = v,
_78: o => Object.keys(o),
_48: v => stringToDartString(v.toString()),
_63: () => {
          let stackString = new Error().stack.toString();
          let frames = stackString.split('\n');
          let drop = 2;
          if (frames[0] === 'Error') {
              drop += 1;
          }
          return frames.slice(drop).join('\n');
        }
      };

    const baseImports = {
        dart2wasm: dart2wasm,

  
          Math: Math,
        Date: Date,
        Object: Object,
        Array: Array,
        Reflect: Reflect,
    };
    dartInstance = await WebAssembly.instantiate(await modulePromise, {
        ...baseImports,
        ...(await importObjectPromise),
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

