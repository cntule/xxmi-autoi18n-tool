var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// node_modules/core-js/internals/global.js
var require_global = __commonJS({
  "node_modules/core-js/internals/global.js"(exports, module) {
    var check = function(it) {
      return it && it.Math == Math && it;
    };
    module.exports = check(typeof globalThis == "object" && globalThis) || check(typeof window == "object" && window) || check(typeof self == "object" && self) || check(typeof global == "object" && global) || function() {
      return this;
    }() || Function("return this")();
  }
});

// node_modules/core-js/internals/fails.js
var require_fails = __commonJS({
  "node_modules/core-js/internals/fails.js"(exports, module) {
    module.exports = function(exec) {
      try {
        return !!exec();
      } catch (error) {
        return true;
      }
    };
  }
});

// node_modules/core-js/internals/descriptors.js
var require_descriptors = __commonJS({
  "node_modules/core-js/internals/descriptors.js"(exports, module) {
    var fails2 = require_fails();
    module.exports = !fails2(function() {
      return Object.defineProperty({}, 1, { get: function() {
        return 7;
      } })[1] != 7;
    });
  }
});

// node_modules/core-js/internals/function-bind-native.js
var require_function_bind_native = __commonJS({
  "node_modules/core-js/internals/function-bind-native.js"(exports, module) {
    var fails2 = require_fails();
    module.exports = !fails2(function() {
      var test = function() {
      }.bind();
      return typeof test != "function" || test.hasOwnProperty("prototype");
    });
  }
});

// node_modules/core-js/internals/function-call.js
var require_function_call = __commonJS({
  "node_modules/core-js/internals/function-call.js"(exports, module) {
    var NATIVE_BIND = require_function_bind_native();
    var call = Function.prototype.call;
    module.exports = NATIVE_BIND ? call.bind(call) : function() {
      return call.apply(call, arguments);
    };
  }
});

// node_modules/core-js/internals/object-property-is-enumerable.js
var require_object_property_is_enumerable = __commonJS({
  "node_modules/core-js/internals/object-property-is-enumerable.js"(exports) {
    "use strict";
    var $propertyIsEnumerable = {}.propertyIsEnumerable;
    var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);
    exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
      var descriptor = getOwnPropertyDescriptor(this, V);
      return !!descriptor && descriptor.enumerable;
    } : $propertyIsEnumerable;
  }
});

// node_modules/core-js/internals/create-property-descriptor.js
var require_create_property_descriptor = __commonJS({
  "node_modules/core-js/internals/create-property-descriptor.js"(exports, module) {
    module.exports = function(bitmap, value) {
      return {
        enumerable: !(bitmap & 1),
        configurable: !(bitmap & 2),
        writable: !(bitmap & 4),
        value
      };
    };
  }
});

// node_modules/core-js/internals/function-uncurry-this.js
var require_function_uncurry_this = __commonJS({
  "node_modules/core-js/internals/function-uncurry-this.js"(exports, module) {
    var NATIVE_BIND = require_function_bind_native();
    var FunctionPrototype = Function.prototype;
    var call = FunctionPrototype.call;
    var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);
    module.exports = NATIVE_BIND ? uncurryThisWithBind : function(fn) {
      return function() {
        return call.apply(fn, arguments);
      };
    };
  }
});

// node_modules/core-js/internals/classof-raw.js
var require_classof_raw = __commonJS({
  "node_modules/core-js/internals/classof-raw.js"(exports, module) {
    var uncurryThis = require_function_uncurry_this();
    var toString = uncurryThis({}.toString);
    var stringSlice = uncurryThis("".slice);
    module.exports = function(it) {
      return stringSlice(toString(it), 8, -1);
    };
  }
});

// node_modules/core-js/internals/indexed-object.js
var require_indexed_object = __commonJS({
  "node_modules/core-js/internals/indexed-object.js"(exports, module) {
    var uncurryThis = require_function_uncurry_this();
    var fails2 = require_fails();
    var classof = require_classof_raw();
    var $Object = Object;
    var split = uncurryThis("".split);
    module.exports = fails2(function() {
      return !$Object("z").propertyIsEnumerable(0);
    }) ? function(it) {
      return classof(it) == "String" ? split(it, "") : $Object(it);
    } : $Object;
  }
});

// node_modules/core-js/internals/is-null-or-undefined.js
var require_is_null_or_undefined = __commonJS({
  "node_modules/core-js/internals/is-null-or-undefined.js"(exports, module) {
    module.exports = function(it) {
      return it === null || it === void 0;
    };
  }
});

// node_modules/core-js/internals/require-object-coercible.js
var require_require_object_coercible = __commonJS({
  "node_modules/core-js/internals/require-object-coercible.js"(exports, module) {
    var isNullOrUndefined = require_is_null_or_undefined();
    var $TypeError = TypeError;
    module.exports = function(it) {
      if (isNullOrUndefined(it))
        throw $TypeError("Can't call method on " + it);
      return it;
    };
  }
});

// node_modules/core-js/internals/to-indexed-object.js
var require_to_indexed_object = __commonJS({
  "node_modules/core-js/internals/to-indexed-object.js"(exports, module) {
    var IndexedObject = require_indexed_object();
    var requireObjectCoercible = require_require_object_coercible();
    module.exports = function(it) {
      return IndexedObject(requireObjectCoercible(it));
    };
  }
});

// node_modules/core-js/internals/document-all.js
var require_document_all = __commonJS({
  "node_modules/core-js/internals/document-all.js"(exports, module) {
    var documentAll = typeof document == "object" && document.all;
    var IS_HTMLDDA = typeof documentAll == "undefined" && documentAll !== void 0;
    module.exports = {
      all: documentAll,
      IS_HTMLDDA
    };
  }
});

// node_modules/core-js/internals/is-callable.js
var require_is_callable = __commonJS({
  "node_modules/core-js/internals/is-callable.js"(exports, module) {
    var $documentAll = require_document_all();
    var documentAll = $documentAll.all;
    module.exports = $documentAll.IS_HTMLDDA ? function(argument) {
      return typeof argument == "function" || argument === documentAll;
    } : function(argument) {
      return typeof argument == "function";
    };
  }
});

// node_modules/core-js/internals/is-object.js
var require_is_object = __commonJS({
  "node_modules/core-js/internals/is-object.js"(exports, module) {
    var isCallable = require_is_callable();
    var $documentAll = require_document_all();
    var documentAll = $documentAll.all;
    module.exports = $documentAll.IS_HTMLDDA ? function(it) {
      return typeof it == "object" ? it !== null : isCallable(it) || it === documentAll;
    } : function(it) {
      return typeof it == "object" ? it !== null : isCallable(it);
    };
  }
});

// node_modules/core-js/internals/get-built-in.js
var require_get_built_in = __commonJS({
  "node_modules/core-js/internals/get-built-in.js"(exports, module) {
    var global3 = require_global();
    var isCallable = require_is_callable();
    var aFunction = function(argument) {
      return isCallable(argument) ? argument : void 0;
    };
    module.exports = function(namespace, method) {
      return arguments.length < 2 ? aFunction(global3[namespace]) : global3[namespace] && global3[namespace][method];
    };
  }
});

// node_modules/core-js/internals/object-is-prototype-of.js
var require_object_is_prototype_of = __commonJS({
  "node_modules/core-js/internals/object-is-prototype-of.js"(exports, module) {
    var uncurryThis = require_function_uncurry_this();
    module.exports = uncurryThis({}.isPrototypeOf);
  }
});

// node_modules/core-js/internals/engine-user-agent.js
var require_engine_user_agent = __commonJS({
  "node_modules/core-js/internals/engine-user-agent.js"(exports, module) {
    var getBuiltIn = require_get_built_in();
    module.exports = getBuiltIn("navigator", "userAgent") || "";
  }
});

// node_modules/core-js/internals/engine-v8-version.js
var require_engine_v8_version = __commonJS({
  "node_modules/core-js/internals/engine-v8-version.js"(exports, module) {
    var global3 = require_global();
    var userAgent = require_engine_user_agent();
    var process = global3.process;
    var Deno = global3.Deno;
    var versions = process && process.versions || Deno && Deno.version;
    var v8 = versions && versions.v8;
    var match;
    var version;
    if (v8) {
      match = v8.split(".");
      version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
    }
    if (!version && userAgent) {
      match = userAgent.match(/Edge\/(\d+)/);
      if (!match || match[1] >= 74) {
        match = userAgent.match(/Chrome\/(\d+)/);
        if (match)
          version = +match[1];
      }
    }
    module.exports = version;
  }
});

// node_modules/core-js/internals/symbol-constructor-detection.js
var require_symbol_constructor_detection = __commonJS({
  "node_modules/core-js/internals/symbol-constructor-detection.js"(exports, module) {
    var V8_VERSION = require_engine_v8_version();
    var fails2 = require_fails();
    module.exports = !!Object.getOwnPropertySymbols && !fails2(function() {
      var symbol = Symbol();
      return !String(symbol) || !(Object(symbol) instanceof Symbol) || !Symbol.sham && V8_VERSION && V8_VERSION < 41;
    });
  }
});

// node_modules/core-js/internals/use-symbol-as-uid.js
var require_use_symbol_as_uid = __commonJS({
  "node_modules/core-js/internals/use-symbol-as-uid.js"(exports, module) {
    var NATIVE_SYMBOL = require_symbol_constructor_detection();
    module.exports = NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == "symbol";
  }
});

// node_modules/core-js/internals/is-symbol.js
var require_is_symbol = __commonJS({
  "node_modules/core-js/internals/is-symbol.js"(exports, module) {
    var getBuiltIn = require_get_built_in();
    var isCallable = require_is_callable();
    var isPrototypeOf = require_object_is_prototype_of();
    var USE_SYMBOL_AS_UID = require_use_symbol_as_uid();
    var $Object = Object;
    module.exports = USE_SYMBOL_AS_UID ? function(it) {
      return typeof it == "symbol";
    } : function(it) {
      var $Symbol = getBuiltIn("Symbol");
      return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
    };
  }
});

// node_modules/core-js/internals/try-to-string.js
var require_try_to_string = __commonJS({
  "node_modules/core-js/internals/try-to-string.js"(exports, module) {
    var $String = String;
    module.exports = function(argument) {
      try {
        return $String(argument);
      } catch (error) {
        return "Object";
      }
    };
  }
});

// node_modules/core-js/internals/a-callable.js
var require_a_callable = __commonJS({
  "node_modules/core-js/internals/a-callable.js"(exports, module) {
    var isCallable = require_is_callable();
    var tryToString = require_try_to_string();
    var $TypeError = TypeError;
    module.exports = function(argument) {
      if (isCallable(argument))
        return argument;
      throw $TypeError(tryToString(argument) + " is not a function");
    };
  }
});

// node_modules/core-js/internals/get-method.js
var require_get_method = __commonJS({
  "node_modules/core-js/internals/get-method.js"(exports, module) {
    var aCallable2 = require_a_callable();
    var isNullOrUndefined = require_is_null_or_undefined();
    module.exports = function(V, P) {
      var func = V[P];
      return isNullOrUndefined(func) ? void 0 : aCallable2(func);
    };
  }
});

// node_modules/core-js/internals/ordinary-to-primitive.js
var require_ordinary_to_primitive = __commonJS({
  "node_modules/core-js/internals/ordinary-to-primitive.js"(exports, module) {
    var call = require_function_call();
    var isCallable = require_is_callable();
    var isObject = require_is_object();
    var $TypeError = TypeError;
    module.exports = function(input, pref) {
      var fn, val;
      if (pref === "string" && isCallable(fn = input.toString) && !isObject(val = call(fn, input)))
        return val;
      if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input)))
        return val;
      if (pref !== "string" && isCallable(fn = input.toString) && !isObject(val = call(fn, input)))
        return val;
      throw $TypeError("Can't convert object to primitive value");
    };
  }
});

// node_modules/core-js/internals/is-pure.js
var require_is_pure = __commonJS({
  "node_modules/core-js/internals/is-pure.js"(exports, module) {
    module.exports = false;
  }
});

// node_modules/core-js/internals/define-global-property.js
var require_define_global_property = __commonJS({
  "node_modules/core-js/internals/define-global-property.js"(exports, module) {
    var global3 = require_global();
    var defineProperty = Object.defineProperty;
    module.exports = function(key, value) {
      try {
        defineProperty(global3, key, { value, configurable: true, writable: true });
      } catch (error) {
        global3[key] = value;
      }
      return value;
    };
  }
});

// node_modules/core-js/internals/shared-store.js
var require_shared_store = __commonJS({
  "node_modules/core-js/internals/shared-store.js"(exports, module) {
    var global3 = require_global();
    var defineGlobalProperty = require_define_global_property();
    var SHARED = "__core-js_shared__";
    var store = global3[SHARED] || defineGlobalProperty(SHARED, {});
    module.exports = store;
  }
});

// node_modules/core-js/internals/shared.js
var require_shared = __commonJS({
  "node_modules/core-js/internals/shared.js"(exports, module) {
    var IS_PURE = require_is_pure();
    var store = require_shared_store();
    (module.exports = function(key, value) {
      return store[key] || (store[key] = value !== void 0 ? value : {});
    })("versions", []).push({
      version: "3.26.1",
      mode: IS_PURE ? "pure" : "global",
      copyright: "\xA9 2014-2022 Denis Pushkarev (zloirock.ru)",
      license: "https://github.com/zloirock/core-js/blob/v3.26.1/LICENSE",
      source: "https://github.com/zloirock/core-js"
    });
  }
});

// node_modules/core-js/internals/to-object.js
var require_to_object = __commonJS({
  "node_modules/core-js/internals/to-object.js"(exports, module) {
    var requireObjectCoercible = require_require_object_coercible();
    var $Object = Object;
    module.exports = function(argument) {
      return $Object(requireObjectCoercible(argument));
    };
  }
});

// node_modules/core-js/internals/has-own-property.js
var require_has_own_property = __commonJS({
  "node_modules/core-js/internals/has-own-property.js"(exports, module) {
    var uncurryThis = require_function_uncurry_this();
    var toObject3 = require_to_object();
    var hasOwnProperty = uncurryThis({}.hasOwnProperty);
    module.exports = Object.hasOwn || function hasOwn(it, key) {
      return hasOwnProperty(toObject3(it), key);
    };
  }
});

// node_modules/core-js/internals/uid.js
var require_uid = __commonJS({
  "node_modules/core-js/internals/uid.js"(exports, module) {
    var uncurryThis = require_function_uncurry_this();
    var id = 0;
    var postfix = Math.random();
    var toString = uncurryThis(1 .toString);
    module.exports = function(key) {
      return "Symbol(" + (key === void 0 ? "" : key) + ")_" + toString(++id + postfix, 36);
    };
  }
});

// node_modules/core-js/internals/well-known-symbol.js
var require_well_known_symbol = __commonJS({
  "node_modules/core-js/internals/well-known-symbol.js"(exports, module) {
    var global3 = require_global();
    var shared = require_shared();
    var hasOwn = require_has_own_property();
    var uid = require_uid();
    var NATIVE_SYMBOL = require_symbol_constructor_detection();
    var USE_SYMBOL_AS_UID = require_use_symbol_as_uid();
    var WellKnownSymbolsStore = shared("wks");
    var Symbol2 = global3.Symbol;
    var symbolFor = Symbol2 && Symbol2["for"];
    var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol2 : Symbol2 && Symbol2.withoutSetter || uid;
    module.exports = function(name) {
      if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == "string")) {
        var description = "Symbol." + name;
        if (NATIVE_SYMBOL && hasOwn(Symbol2, name)) {
          WellKnownSymbolsStore[name] = Symbol2[name];
        } else if (USE_SYMBOL_AS_UID && symbolFor) {
          WellKnownSymbolsStore[name] = symbolFor(description);
        } else {
          WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
        }
      }
      return WellKnownSymbolsStore[name];
    };
  }
});

// node_modules/core-js/internals/to-primitive.js
var require_to_primitive = __commonJS({
  "node_modules/core-js/internals/to-primitive.js"(exports, module) {
    var call = require_function_call();
    var isObject = require_is_object();
    var isSymbol = require_is_symbol();
    var getMethod = require_get_method();
    var ordinaryToPrimitive = require_ordinary_to_primitive();
    var wellKnownSymbol = require_well_known_symbol();
    var $TypeError = TypeError;
    var TO_PRIMITIVE = wellKnownSymbol("toPrimitive");
    module.exports = function(input, pref) {
      if (!isObject(input) || isSymbol(input))
        return input;
      var exoticToPrim = getMethod(input, TO_PRIMITIVE);
      var result;
      if (exoticToPrim) {
        if (pref === void 0)
          pref = "default";
        result = call(exoticToPrim, input, pref);
        if (!isObject(result) || isSymbol(result))
          return result;
        throw $TypeError("Can't convert object to primitive value");
      }
      if (pref === void 0)
        pref = "number";
      return ordinaryToPrimitive(input, pref);
    };
  }
});

// node_modules/core-js/internals/to-property-key.js
var require_to_property_key = __commonJS({
  "node_modules/core-js/internals/to-property-key.js"(exports, module) {
    var toPrimitive = require_to_primitive();
    var isSymbol = require_is_symbol();
    module.exports = function(argument) {
      var key = toPrimitive(argument, "string");
      return isSymbol(key) ? key : key + "";
    };
  }
});

// node_modules/core-js/internals/document-create-element.js
var require_document_create_element = __commonJS({
  "node_modules/core-js/internals/document-create-element.js"(exports, module) {
    var global3 = require_global();
    var isObject = require_is_object();
    var document2 = global3.document;
    var EXISTS = isObject(document2) && isObject(document2.createElement);
    module.exports = function(it) {
      return EXISTS ? document2.createElement(it) : {};
    };
  }
});

// node_modules/core-js/internals/ie8-dom-define.js
var require_ie8_dom_define = __commonJS({
  "node_modules/core-js/internals/ie8-dom-define.js"(exports, module) {
    var DESCRIPTORS2 = require_descriptors();
    var fails2 = require_fails();
    var createElement = require_document_create_element();
    module.exports = !DESCRIPTORS2 && !fails2(function() {
      return Object.defineProperty(createElement("div"), "a", {
        get: function() {
          return 7;
        }
      }).a != 7;
    });
  }
});

// node_modules/core-js/internals/object-get-own-property-descriptor.js
var require_object_get_own_property_descriptor = __commonJS({
  "node_modules/core-js/internals/object-get-own-property-descriptor.js"(exports) {
    var DESCRIPTORS2 = require_descriptors();
    var call = require_function_call();
    var propertyIsEnumerableModule = require_object_property_is_enumerable();
    var createPropertyDescriptor = require_create_property_descriptor();
    var toIndexedObject = require_to_indexed_object();
    var toPropertyKey = require_to_property_key();
    var hasOwn = require_has_own_property();
    var IE8_DOM_DEFINE = require_ie8_dom_define();
    var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    exports.f = DESCRIPTORS2 ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
      O = toIndexedObject(O);
      P = toPropertyKey(P);
      if (IE8_DOM_DEFINE)
        try {
          return $getOwnPropertyDescriptor(O, P);
        } catch (error) {
        }
      if (hasOwn(O, P))
        return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
    };
  }
});

// node_modules/core-js/internals/v8-prototype-define-bug.js
var require_v8_prototype_define_bug = __commonJS({
  "node_modules/core-js/internals/v8-prototype-define-bug.js"(exports, module) {
    var DESCRIPTORS2 = require_descriptors();
    var fails2 = require_fails();
    module.exports = DESCRIPTORS2 && fails2(function() {
      return Object.defineProperty(function() {
      }, "prototype", {
        value: 42,
        writable: false
      }).prototype != 42;
    });
  }
});

// node_modules/core-js/internals/an-object.js
var require_an_object = __commonJS({
  "node_modules/core-js/internals/an-object.js"(exports, module) {
    var isObject = require_is_object();
    var $String = String;
    var $TypeError = TypeError;
    module.exports = function(argument) {
      if (isObject(argument))
        return argument;
      throw $TypeError($String(argument) + " is not an object");
    };
  }
});

// node_modules/core-js/internals/object-define-property.js
var require_object_define_property = __commonJS({
  "node_modules/core-js/internals/object-define-property.js"(exports) {
    var DESCRIPTORS2 = require_descriptors();
    var IE8_DOM_DEFINE = require_ie8_dom_define();
    var V8_PROTOTYPE_DEFINE_BUG = require_v8_prototype_define_bug();
    var anObject = require_an_object();
    var toPropertyKey = require_to_property_key();
    var $TypeError = TypeError;
    var $defineProperty = Object.defineProperty;
    var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    var ENUMERABLE = "enumerable";
    var CONFIGURABLE = "configurable";
    var WRITABLE = "writable";
    exports.f = DESCRIPTORS2 ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
      anObject(O);
      P = toPropertyKey(P);
      anObject(Attributes);
      if (typeof O === "function" && P === "prototype" && "value" in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
        var current = $getOwnPropertyDescriptor(O, P);
        if (current && current[WRITABLE]) {
          O[P] = Attributes.value;
          Attributes = {
            configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
            enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
            writable: false
          };
        }
      }
      return $defineProperty(O, P, Attributes);
    } : $defineProperty : function defineProperty(O, P, Attributes) {
      anObject(O);
      P = toPropertyKey(P);
      anObject(Attributes);
      if (IE8_DOM_DEFINE)
        try {
          return $defineProperty(O, P, Attributes);
        } catch (error) {
        }
      if ("get" in Attributes || "set" in Attributes)
        throw $TypeError("Accessors not supported");
      if ("value" in Attributes)
        O[P] = Attributes.value;
      return O;
    };
  }
});

// node_modules/core-js/internals/create-non-enumerable-property.js
var require_create_non_enumerable_property = __commonJS({
  "node_modules/core-js/internals/create-non-enumerable-property.js"(exports, module) {
    var DESCRIPTORS2 = require_descriptors();
    var definePropertyModule = require_object_define_property();
    var createPropertyDescriptor = require_create_property_descriptor();
    module.exports = DESCRIPTORS2 ? function(object, key, value) {
      return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
    } : function(object, key, value) {
      object[key] = value;
      return object;
    };
  }
});

// node_modules/core-js/internals/function-name.js
var require_function_name = __commonJS({
  "node_modules/core-js/internals/function-name.js"(exports, module) {
    var DESCRIPTORS2 = require_descriptors();
    var hasOwn = require_has_own_property();
    var FunctionPrototype = Function.prototype;
    var getDescriptor = DESCRIPTORS2 && Object.getOwnPropertyDescriptor;
    var EXISTS = hasOwn(FunctionPrototype, "name");
    var PROPER = EXISTS && function something() {
    }.name === "something";
    var CONFIGURABLE = EXISTS && (!DESCRIPTORS2 || DESCRIPTORS2 && getDescriptor(FunctionPrototype, "name").configurable);
    module.exports = {
      EXISTS,
      PROPER,
      CONFIGURABLE
    };
  }
});

// node_modules/core-js/internals/inspect-source.js
var require_inspect_source = __commonJS({
  "node_modules/core-js/internals/inspect-source.js"(exports, module) {
    var uncurryThis = require_function_uncurry_this();
    var isCallable = require_is_callable();
    var store = require_shared_store();
    var functionToString = uncurryThis(Function.toString);
    if (!isCallable(store.inspectSource)) {
      store.inspectSource = function(it) {
        return functionToString(it);
      };
    }
    module.exports = store.inspectSource;
  }
});

// node_modules/core-js/internals/weak-map-basic-detection.js
var require_weak_map_basic_detection = __commonJS({
  "node_modules/core-js/internals/weak-map-basic-detection.js"(exports, module) {
    var global3 = require_global();
    var isCallable = require_is_callable();
    var WeakMap2 = global3.WeakMap;
    module.exports = isCallable(WeakMap2) && /native code/.test(String(WeakMap2));
  }
});

// node_modules/core-js/internals/shared-key.js
var require_shared_key = __commonJS({
  "node_modules/core-js/internals/shared-key.js"(exports, module) {
    var shared = require_shared();
    var uid = require_uid();
    var keys = shared("keys");
    module.exports = function(key) {
      return keys[key] || (keys[key] = uid(key));
    };
  }
});

// node_modules/core-js/internals/hidden-keys.js
var require_hidden_keys = __commonJS({
  "node_modules/core-js/internals/hidden-keys.js"(exports, module) {
    module.exports = {};
  }
});

// node_modules/core-js/internals/internal-state.js
var require_internal_state = __commonJS({
  "node_modules/core-js/internals/internal-state.js"(exports, module) {
    var NATIVE_WEAK_MAP = require_weak_map_basic_detection();
    var global3 = require_global();
    var isObject = require_is_object();
    var createNonEnumerableProperty = require_create_non_enumerable_property();
    var hasOwn = require_has_own_property();
    var shared = require_shared_store();
    var sharedKey = require_shared_key();
    var hiddenKeys = require_hidden_keys();
    var OBJECT_ALREADY_INITIALIZED = "Object already initialized";
    var TypeError2 = global3.TypeError;
    var WeakMap2 = global3.WeakMap;
    var set;
    var get;
    var has;
    var enforce = function(it) {
      return has(it) ? get(it) : set(it, {});
    };
    var getterFor = function(TYPE) {
      return function(it) {
        var state;
        if (!isObject(it) || (state = get(it)).type !== TYPE) {
          throw TypeError2("Incompatible receiver, " + TYPE + " required");
        }
        return state;
      };
    };
    if (NATIVE_WEAK_MAP || shared.state) {
      store = shared.state || (shared.state = new WeakMap2());
      store.get = store.get;
      store.has = store.has;
      store.set = store.set;
      set = function(it, metadata) {
        if (store.has(it))
          throw TypeError2(OBJECT_ALREADY_INITIALIZED);
        metadata.facade = it;
        store.set(it, metadata);
        return metadata;
      };
      get = function(it) {
        return store.get(it) || {};
      };
      has = function(it) {
        return store.has(it);
      };
    } else {
      STATE = sharedKey("state");
      hiddenKeys[STATE] = true;
      set = function(it, metadata) {
        if (hasOwn(it, STATE))
          throw TypeError2(OBJECT_ALREADY_INITIALIZED);
        metadata.facade = it;
        createNonEnumerableProperty(it, STATE, metadata);
        return metadata;
      };
      get = function(it) {
        return hasOwn(it, STATE) ? it[STATE] : {};
      };
      has = function(it) {
        return hasOwn(it, STATE);
      };
    }
    var store;
    var STATE;
    module.exports = {
      set,
      get,
      has,
      enforce,
      getterFor
    };
  }
});

// node_modules/core-js/internals/make-built-in.js
var require_make_built_in = __commonJS({
  "node_modules/core-js/internals/make-built-in.js"(exports, module) {
    var fails2 = require_fails();
    var isCallable = require_is_callable();
    var hasOwn = require_has_own_property();
    var DESCRIPTORS2 = require_descriptors();
    var CONFIGURABLE_FUNCTION_NAME = require_function_name().CONFIGURABLE;
    var inspectSource = require_inspect_source();
    var InternalStateModule = require_internal_state();
    var enforceInternalState = InternalStateModule.enforce;
    var getInternalState = InternalStateModule.get;
    var defineProperty = Object.defineProperty;
    var CONFIGURABLE_LENGTH = DESCRIPTORS2 && !fails2(function() {
      return defineProperty(function() {
      }, "length", { value: 8 }).length !== 8;
    });
    var TEMPLATE = String(String).split("String");
    var makeBuiltIn = module.exports = function(value, name, options) {
      if (String(name).slice(0, 7) === "Symbol(") {
        name = "[" + String(name).replace(/^Symbol\(([^)]*)\)/, "$1") + "]";
      }
      if (options && options.getter)
        name = "get " + name;
      if (options && options.setter)
        name = "set " + name;
      if (!hasOwn(value, "name") || CONFIGURABLE_FUNCTION_NAME && value.name !== name) {
        if (DESCRIPTORS2)
          defineProperty(value, "name", { value: name, configurable: true });
        else
          value.name = name;
      }
      if (CONFIGURABLE_LENGTH && options && hasOwn(options, "arity") && value.length !== options.arity) {
        defineProperty(value, "length", { value: options.arity });
      }
      try {
        if (options && hasOwn(options, "constructor") && options.constructor) {
          if (DESCRIPTORS2)
            defineProperty(value, "prototype", { writable: false });
        } else if (value.prototype)
          value.prototype = void 0;
      } catch (error) {
      }
      var state = enforceInternalState(value);
      if (!hasOwn(state, "source")) {
        state.source = TEMPLATE.join(typeof name == "string" ? name : "");
      }
      return value;
    };
    Function.prototype.toString = makeBuiltIn(function toString() {
      return isCallable(this) && getInternalState(this).source || inspectSource(this);
    }, "toString");
  }
});

// node_modules/core-js/internals/define-built-in.js
var require_define_built_in = __commonJS({
  "node_modules/core-js/internals/define-built-in.js"(exports, module) {
    var isCallable = require_is_callable();
    var definePropertyModule = require_object_define_property();
    var makeBuiltIn = require_make_built_in();
    var defineGlobalProperty = require_define_global_property();
    module.exports = function(O, key, value, options) {
      if (!options)
        options = {};
      var simple = options.enumerable;
      var name = options.name !== void 0 ? options.name : key;
      if (isCallable(value))
        makeBuiltIn(value, name, options);
      if (options.global) {
        if (simple)
          O[key] = value;
        else
          defineGlobalProperty(key, value);
      } else {
        try {
          if (!options.unsafe)
            delete O[key];
          else if (O[key])
            simple = true;
        } catch (error) {
        }
        if (simple)
          O[key] = value;
        else
          definePropertyModule.f(O, key, {
            value,
            enumerable: false,
            configurable: !options.nonConfigurable,
            writable: !options.nonWritable
          });
      }
      return O;
    };
  }
});

// node_modules/core-js/internals/math-trunc.js
var require_math_trunc = __commonJS({
  "node_modules/core-js/internals/math-trunc.js"(exports, module) {
    var ceil = Math.ceil;
    var floor = Math.floor;
    module.exports = Math.trunc || function trunc(x) {
      var n = +x;
      return (n > 0 ? floor : ceil)(n);
    };
  }
});

// node_modules/core-js/internals/to-integer-or-infinity.js
var require_to_integer_or_infinity = __commonJS({
  "node_modules/core-js/internals/to-integer-or-infinity.js"(exports, module) {
    var trunc = require_math_trunc();
    module.exports = function(argument) {
      var number = +argument;
      return number !== number || number === 0 ? 0 : trunc(number);
    };
  }
});

// node_modules/core-js/internals/to-absolute-index.js
var require_to_absolute_index = __commonJS({
  "node_modules/core-js/internals/to-absolute-index.js"(exports, module) {
    var toIntegerOrInfinity2 = require_to_integer_or_infinity();
    var max = Math.max;
    var min = Math.min;
    module.exports = function(index, length) {
      var integer = toIntegerOrInfinity2(index);
      return integer < 0 ? max(integer + length, 0) : min(integer, length);
    };
  }
});

// node_modules/core-js/internals/to-length.js
var require_to_length = __commonJS({
  "node_modules/core-js/internals/to-length.js"(exports, module) {
    var toIntegerOrInfinity2 = require_to_integer_or_infinity();
    var min = Math.min;
    module.exports = function(argument) {
      return argument > 0 ? min(toIntegerOrInfinity2(argument), 9007199254740991) : 0;
    };
  }
});

// node_modules/core-js/internals/length-of-array-like.js
var require_length_of_array_like = __commonJS({
  "node_modules/core-js/internals/length-of-array-like.js"(exports, module) {
    var toLength = require_to_length();
    module.exports = function(obj) {
      return toLength(obj.length);
    };
  }
});

// node_modules/core-js/internals/array-includes.js
var require_array_includes = __commonJS({
  "node_modules/core-js/internals/array-includes.js"(exports, module) {
    var toIndexedObject = require_to_indexed_object();
    var toAbsoluteIndex = require_to_absolute_index();
    var lengthOfArrayLike3 = require_length_of_array_like();
    var createMethod = function(IS_INCLUDES) {
      return function($this, el, fromIndex) {
        var O = toIndexedObject($this);
        var length = lengthOfArrayLike3(O);
        var index = toAbsoluteIndex(fromIndex, length);
        var value;
        if (IS_INCLUDES && el != el)
          while (length > index) {
            value = O[index++];
            if (value != value)
              return true;
          }
        else
          for (; length > index; index++) {
            if ((IS_INCLUDES || index in O) && O[index] === el)
              return IS_INCLUDES || index || 0;
          }
        return !IS_INCLUDES && -1;
      };
    };
    module.exports = {
      includes: createMethod(true),
      indexOf: createMethod(false)
    };
  }
});

// node_modules/core-js/internals/object-keys-internal.js
var require_object_keys_internal = __commonJS({
  "node_modules/core-js/internals/object-keys-internal.js"(exports, module) {
    var uncurryThis = require_function_uncurry_this();
    var hasOwn = require_has_own_property();
    var toIndexedObject = require_to_indexed_object();
    var indexOf = require_array_includes().indexOf;
    var hiddenKeys = require_hidden_keys();
    var push = uncurryThis([].push);
    module.exports = function(object, names) {
      var O = toIndexedObject(object);
      var i = 0;
      var result = [];
      var key;
      for (key in O)
        !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
      while (names.length > i)
        if (hasOwn(O, key = names[i++])) {
          ~indexOf(result, key) || push(result, key);
        }
      return result;
    };
  }
});

// node_modules/core-js/internals/enum-bug-keys.js
var require_enum_bug_keys = __commonJS({
  "node_modules/core-js/internals/enum-bug-keys.js"(exports, module) {
    module.exports = [
      "constructor",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "toLocaleString",
      "toString",
      "valueOf"
    ];
  }
});

// node_modules/core-js/internals/object-get-own-property-names.js
var require_object_get_own_property_names = __commonJS({
  "node_modules/core-js/internals/object-get-own-property-names.js"(exports) {
    var internalObjectKeys = require_object_keys_internal();
    var enumBugKeys = require_enum_bug_keys();
    var hiddenKeys = enumBugKeys.concat("length", "prototype");
    exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
      return internalObjectKeys(O, hiddenKeys);
    };
  }
});

// node_modules/core-js/internals/object-get-own-property-symbols.js
var require_object_get_own_property_symbols = __commonJS({
  "node_modules/core-js/internals/object-get-own-property-symbols.js"(exports) {
    exports.f = Object.getOwnPropertySymbols;
  }
});

// node_modules/core-js/internals/own-keys.js
var require_own_keys = __commonJS({
  "node_modules/core-js/internals/own-keys.js"(exports, module) {
    var getBuiltIn = require_get_built_in();
    var uncurryThis = require_function_uncurry_this();
    var getOwnPropertyNamesModule = require_object_get_own_property_names();
    var getOwnPropertySymbolsModule = require_object_get_own_property_symbols();
    var anObject = require_an_object();
    var concat = uncurryThis([].concat);
    module.exports = getBuiltIn("Reflect", "ownKeys") || function ownKeys(it) {
      var keys = getOwnPropertyNamesModule.f(anObject(it));
      var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
      return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
    };
  }
});

// node_modules/core-js/internals/copy-constructor-properties.js
var require_copy_constructor_properties = __commonJS({
  "node_modules/core-js/internals/copy-constructor-properties.js"(exports, module) {
    var hasOwn = require_has_own_property();
    var ownKeys = require_own_keys();
    var getOwnPropertyDescriptorModule = require_object_get_own_property_descriptor();
    var definePropertyModule = require_object_define_property();
    module.exports = function(target, source, exceptions) {
      var keys = ownKeys(source);
      var defineProperty = definePropertyModule.f;
      var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
          defineProperty(target, key, getOwnPropertyDescriptor(source, key));
        }
      }
    };
  }
});

// node_modules/core-js/internals/is-forced.js
var require_is_forced = __commonJS({
  "node_modules/core-js/internals/is-forced.js"(exports, module) {
    var fails2 = require_fails();
    var isCallable = require_is_callable();
    var replacement = /#|\.prototype\./;
    var isForced = function(feature, detection) {
      var value = data[normalize2(feature)];
      return value == POLYFILL ? true : value == NATIVE ? false : isCallable(detection) ? fails2(detection) : !!detection;
    };
    var normalize2 = isForced.normalize = function(string) {
      return String(string).replace(replacement, ".").toLowerCase();
    };
    var data = isForced.data = {};
    var NATIVE = isForced.NATIVE = "N";
    var POLYFILL = isForced.POLYFILL = "P";
    module.exports = isForced;
  }
});

// node_modules/core-js/internals/export.js
var require_export = __commonJS({
  "node_modules/core-js/internals/export.js"(exports, module) {
    var global3 = require_global();
    var getOwnPropertyDescriptor = require_object_get_own_property_descriptor().f;
    var createNonEnumerableProperty = require_create_non_enumerable_property();
    var defineBuiltIn = require_define_built_in();
    var defineGlobalProperty = require_define_global_property();
    var copyConstructorProperties = require_copy_constructor_properties();
    var isForced = require_is_forced();
    module.exports = function(options, source) {
      var TARGET = options.target;
      var GLOBAL = options.global;
      var STATIC = options.stat;
      var FORCED2, target, key, targetProperty, sourceProperty, descriptor;
      if (GLOBAL) {
        target = global3;
      } else if (STATIC) {
        target = global3[TARGET] || defineGlobalProperty(TARGET, {});
      } else {
        target = (global3[TARGET] || {}).prototype;
      }
      if (target)
        for (key in source) {
          sourceProperty = source[key];
          if (options.dontCallGetSet) {
            descriptor = getOwnPropertyDescriptor(target, key);
            targetProperty = descriptor && descriptor.value;
          } else
            targetProperty = target[key];
          FORCED2 = isForced(GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key, options.forced);
          if (!FORCED2 && targetProperty !== void 0) {
            if (typeof sourceProperty == typeof targetProperty)
              continue;
            copyConstructorProperties(sourceProperty, targetProperty);
          }
          if (options.sham || targetProperty && targetProperty.sham) {
            createNonEnumerableProperty(sourceProperty, "sham", true);
          }
          defineBuiltIn(target, key, sourceProperty, options);
        }
    };
  }
});

// node_modules/core-js/internals/is-array.js
var require_is_array = __commonJS({
  "node_modules/core-js/internals/is-array.js"(exports, module) {
    var classof = require_classof_raw();
    module.exports = Array.isArray || function isArray(argument) {
      return classof(argument) == "Array";
    };
  }
});

// node_modules/core-js/internals/does-not-exceed-safe-integer.js
var require_does_not_exceed_safe_integer = __commonJS({
  "node_modules/core-js/internals/does-not-exceed-safe-integer.js"(exports, module) {
    var $TypeError = TypeError;
    var MAX_SAFE_INTEGER = 9007199254740991;
    module.exports = function(it) {
      if (it > MAX_SAFE_INTEGER)
        throw $TypeError("Maximum allowed index exceeded");
      return it;
    };
  }
});

// node_modules/core-js/internals/function-uncurry-this-clause.js
var require_function_uncurry_this_clause = __commonJS({
  "node_modules/core-js/internals/function-uncurry-this-clause.js"(exports, module) {
    var classofRaw = require_classof_raw();
    var uncurryThis = require_function_uncurry_this();
    module.exports = function(fn) {
      if (classofRaw(fn) === "Function")
        return uncurryThis(fn);
    };
  }
});

// node_modules/core-js/internals/function-bind-context.js
var require_function_bind_context = __commonJS({
  "node_modules/core-js/internals/function-bind-context.js"(exports, module) {
    var uncurryThis = require_function_uncurry_this_clause();
    var aCallable2 = require_a_callable();
    var NATIVE_BIND = require_function_bind_native();
    var bind = uncurryThis(uncurryThis.bind);
    module.exports = function(fn, that) {
      aCallable2(fn);
      return that === void 0 ? fn : NATIVE_BIND ? bind(fn, that) : function() {
        return fn.apply(that, arguments);
      };
    };
  }
});

// node_modules/core-js/internals/flatten-into-array.js
var require_flatten_into_array = __commonJS({
  "node_modules/core-js/internals/flatten-into-array.js"(exports, module) {
    "use strict";
    var isArray = require_is_array();
    var lengthOfArrayLike3 = require_length_of_array_like();
    var doesNotExceedSafeInteger = require_does_not_exceed_safe_integer();
    var bind = require_function_bind_context();
    var flattenIntoArray3 = function(target, original, source, sourceLen, start, depth, mapper, thisArg) {
      var targetIndex = start;
      var sourceIndex = 0;
      var mapFn = mapper ? bind(mapper, thisArg) : false;
      var element, elementLen;
      while (sourceIndex < sourceLen) {
        if (sourceIndex in source) {
          element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];
          if (depth > 0 && isArray(element)) {
            elementLen = lengthOfArrayLike3(element);
            targetIndex = flattenIntoArray3(target, original, element, elementLen, targetIndex, depth - 1) - 1;
          } else {
            doesNotExceedSafeInteger(targetIndex + 1);
            target[targetIndex] = element;
          }
          targetIndex++;
        }
        sourceIndex++;
      }
      return targetIndex;
    };
    module.exports = flattenIntoArray3;
  }
});

// node_modules/core-js/internals/to-string-tag-support.js
var require_to_string_tag_support = __commonJS({
  "node_modules/core-js/internals/to-string-tag-support.js"(exports, module) {
    var wellKnownSymbol = require_well_known_symbol();
    var TO_STRING_TAG = wellKnownSymbol("toStringTag");
    var test = {};
    test[TO_STRING_TAG] = "z";
    module.exports = String(test) === "[object z]";
  }
});

// node_modules/core-js/internals/classof.js
var require_classof = __commonJS({
  "node_modules/core-js/internals/classof.js"(exports, module) {
    var TO_STRING_TAG_SUPPORT = require_to_string_tag_support();
    var isCallable = require_is_callable();
    var classofRaw = require_classof_raw();
    var wellKnownSymbol = require_well_known_symbol();
    var TO_STRING_TAG = wellKnownSymbol("toStringTag");
    var $Object = Object;
    var CORRECT_ARGUMENTS = classofRaw(function() {
      return arguments;
    }()) == "Arguments";
    var tryGet = function(it, key) {
      try {
        return it[key];
      } catch (error) {
      }
    };
    module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function(it) {
      var O, tag, result;
      return it === void 0 ? "Undefined" : it === null ? "Null" : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == "string" ? tag : CORRECT_ARGUMENTS ? classofRaw(O) : (result = classofRaw(O)) == "Object" && isCallable(O.callee) ? "Arguments" : result;
    };
  }
});

// node_modules/core-js/internals/is-constructor.js
var require_is_constructor = __commonJS({
  "node_modules/core-js/internals/is-constructor.js"(exports, module) {
    var uncurryThis = require_function_uncurry_this();
    var fails2 = require_fails();
    var isCallable = require_is_callable();
    var classof = require_classof();
    var getBuiltIn = require_get_built_in();
    var inspectSource = require_inspect_source();
    var noop = function() {
    };
    var empty = [];
    var construct = getBuiltIn("Reflect", "construct");
    var constructorRegExp = /^\s*(?:class|function)\b/;
    var exec = uncurryThis(constructorRegExp.exec);
    var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);
    var isConstructorModern = function isConstructor(argument) {
      if (!isCallable(argument))
        return false;
      try {
        construct(noop, empty, argument);
        return true;
      } catch (error) {
        return false;
      }
    };
    var isConstructorLegacy = function isConstructor(argument) {
      if (!isCallable(argument))
        return false;
      switch (classof(argument)) {
        case "AsyncFunction":
        case "GeneratorFunction":
        case "AsyncGeneratorFunction":
          return false;
      }
      try {
        return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
      } catch (error) {
        return true;
      }
    };
    isConstructorLegacy.sham = true;
    module.exports = !construct || fails2(function() {
      var called;
      return isConstructorModern(isConstructorModern.call) || !isConstructorModern(Object) || !isConstructorModern(function() {
        called = true;
      }) || called;
    }) ? isConstructorLegacy : isConstructorModern;
  }
});

// node_modules/core-js/internals/array-species-constructor.js
var require_array_species_constructor = __commonJS({
  "node_modules/core-js/internals/array-species-constructor.js"(exports, module) {
    var isArray = require_is_array();
    var isConstructor = require_is_constructor();
    var isObject = require_is_object();
    var wellKnownSymbol = require_well_known_symbol();
    var SPECIES = wellKnownSymbol("species");
    var $Array = Array;
    module.exports = function(originalArray) {
      var C;
      if (isArray(originalArray)) {
        C = originalArray.constructor;
        if (isConstructor(C) && (C === $Array || isArray(C.prototype)))
          C = void 0;
        else if (isObject(C)) {
          C = C[SPECIES];
          if (C === null)
            C = void 0;
        }
      }
      return C === void 0 ? $Array : C;
    };
  }
});

// node_modules/core-js/internals/array-species-create.js
var require_array_species_create = __commonJS({
  "node_modules/core-js/internals/array-species-create.js"(exports, module) {
    var arraySpeciesConstructor = require_array_species_constructor();
    module.exports = function(originalArray, length) {
      return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
    };
  }
});

// node_modules/core-js/internals/iterators.js
var require_iterators = __commonJS({
  "node_modules/core-js/internals/iterators.js"(exports, module) {
    module.exports = {};
  }
});

// node_modules/core-js/internals/is-array-iterator-method.js
var require_is_array_iterator_method = __commonJS({
  "node_modules/core-js/internals/is-array-iterator-method.js"(exports, module) {
    var wellKnownSymbol = require_well_known_symbol();
    var Iterators = require_iterators();
    var ITERATOR = wellKnownSymbol("iterator");
    var ArrayPrototype = Array.prototype;
    module.exports = function(it) {
      return it !== void 0 && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
    };
  }
});

// node_modules/core-js/internals/get-iterator-method.js
var require_get_iterator_method = __commonJS({
  "node_modules/core-js/internals/get-iterator-method.js"(exports, module) {
    var classof = require_classof();
    var getMethod = require_get_method();
    var isNullOrUndefined = require_is_null_or_undefined();
    var Iterators = require_iterators();
    var wellKnownSymbol = require_well_known_symbol();
    var ITERATOR = wellKnownSymbol("iterator");
    module.exports = function(it) {
      if (!isNullOrUndefined(it))
        return getMethod(it, ITERATOR) || getMethod(it, "@@iterator") || Iterators[classof(it)];
    };
  }
});

// node_modules/core-js/internals/get-iterator.js
var require_get_iterator = __commonJS({
  "node_modules/core-js/internals/get-iterator.js"(exports, module) {
    var call = require_function_call();
    var aCallable2 = require_a_callable();
    var anObject = require_an_object();
    var tryToString = require_try_to_string();
    var getIteratorMethod = require_get_iterator_method();
    var $TypeError = TypeError;
    module.exports = function(argument, usingIterator) {
      var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
      if (aCallable2(iteratorMethod))
        return anObject(call(iteratorMethod, argument));
      throw $TypeError(tryToString(argument) + " is not iterable");
    };
  }
});

// node_modules/core-js/internals/iterator-close.js
var require_iterator_close = __commonJS({
  "node_modules/core-js/internals/iterator-close.js"(exports, module) {
    var call = require_function_call();
    var anObject = require_an_object();
    var getMethod = require_get_method();
    module.exports = function(iterator, kind, value) {
      var innerResult, innerError;
      anObject(iterator);
      try {
        innerResult = getMethod(iterator, "return");
        if (!innerResult) {
          if (kind === "throw")
            throw value;
          return value;
        }
        innerResult = call(innerResult, iterator);
      } catch (error) {
        innerError = true;
        innerResult = error;
      }
      if (kind === "throw")
        throw value;
      if (innerError)
        throw innerResult;
      anObject(innerResult);
      return value;
    };
  }
});

// node_modules/core-js/internals/iterate.js
var require_iterate = __commonJS({
  "node_modules/core-js/internals/iterate.js"(exports, module) {
    var bind = require_function_bind_context();
    var call = require_function_call();
    var anObject = require_an_object();
    var tryToString = require_try_to_string();
    var isArrayIteratorMethod = require_is_array_iterator_method();
    var lengthOfArrayLike3 = require_length_of_array_like();
    var isPrototypeOf = require_object_is_prototype_of();
    var getIterator = require_get_iterator();
    var getIteratorMethod = require_get_iterator_method();
    var iteratorClose = require_iterator_close();
    var $TypeError = TypeError;
    var Result = function(stopped, result) {
      this.stopped = stopped;
      this.result = result;
    };
    var ResultPrototype = Result.prototype;
    module.exports = function(iterable, unboundFunction, options) {
      var that = options && options.that;
      var AS_ENTRIES = !!(options && options.AS_ENTRIES);
      var IS_RECORD = !!(options && options.IS_RECORD);
      var IS_ITERATOR = !!(options && options.IS_ITERATOR);
      var INTERRUPTED = !!(options && options.INTERRUPTED);
      var fn = bind(unboundFunction, that);
      var iterator, iterFn, index, length, result, next, step;
      var stop = function(condition) {
        if (iterator)
          iteratorClose(iterator, "normal", condition);
        return new Result(true, condition);
      };
      var callFn = function(value) {
        if (AS_ENTRIES) {
          anObject(value);
          return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
        }
        return INTERRUPTED ? fn(value, stop) : fn(value);
      };
      if (IS_RECORD) {
        iterator = iterable.iterator;
      } else if (IS_ITERATOR) {
        iterator = iterable;
      } else {
        iterFn = getIteratorMethod(iterable);
        if (!iterFn)
          throw $TypeError(tryToString(iterable) + " is not iterable");
        if (isArrayIteratorMethod(iterFn)) {
          for (index = 0, length = lengthOfArrayLike3(iterable); length > index; index++) {
            result = callFn(iterable[index]);
            if (result && isPrototypeOf(ResultPrototype, result))
              return result;
          }
          return new Result(false);
        }
        iterator = getIterator(iterable, iterFn);
      }
      next = IS_RECORD ? iterable.next : iterator.next;
      while (!(step = call(next, iterator)).done) {
        try {
          result = callFn(step.value);
        } catch (error) {
          iteratorClose(iterator, "throw", error);
        }
        if (typeof result == "object" && result && isPrototypeOf(ResultPrototype, result))
          return result;
      }
      return new Result(false);
    };
  }
});

// node_modules/core-js/internals/create-property.js
var require_create_property = __commonJS({
  "node_modules/core-js/internals/create-property.js"(exports, module) {
    "use strict";
    var toPropertyKey = require_to_property_key();
    var definePropertyModule = require_object_define_property();
    var createPropertyDescriptor = require_create_property_descriptor();
    module.exports = function(object, key, value) {
      var propertyKey = toPropertyKey(key);
      if (propertyKey in object)
        definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
      else
        object[propertyKey] = value;
    };
  }
});

// node_modules/core-js/internals/define-built-in-accessor.js
var require_define_built_in_accessor = __commonJS({
  "node_modules/core-js/internals/define-built-in-accessor.js"(exports, module) {
    var makeBuiltIn = require_make_built_in();
    var defineProperty = require_object_define_property();
    module.exports = function(target, name, descriptor) {
      if (descriptor.get)
        makeBuiltIn(descriptor.get, name, { getter: true });
      if (descriptor.set)
        makeBuiltIn(descriptor.set, name, { setter: true });
      return defineProperty.f(target, name, descriptor);
    };
  }
});

// node_modules/core-js/internals/regexp-flags.js
var require_regexp_flags = __commonJS({
  "node_modules/core-js/internals/regexp-flags.js"(exports, module) {
    "use strict";
    var anObject = require_an_object();
    module.exports = function() {
      var that = anObject(this);
      var result = "";
      if (that.hasIndices)
        result += "d";
      if (that.global)
        result += "g";
      if (that.ignoreCase)
        result += "i";
      if (that.multiline)
        result += "m";
      if (that.dotAll)
        result += "s";
      if (that.unicode)
        result += "u";
      if (that.unicodeSets)
        result += "v";
      if (that.sticky)
        result += "y";
      return result;
    };
  }
});

// node_modules/core-js/modules/es.global-this.js
var require_es_global_this = __commonJS({
  "node_modules/core-js/modules/es.global-this.js"() {
    var $4 = require_export();
    var global3 = require_global();
    $4({ global: true, forced: global3.globalThis !== global3 }, {
      globalThis: global3
    });
  }
});

// node_modules/core-js/modules/es.array.flat-map.js
var $ = require_export();
var flattenIntoArray = require_flatten_into_array();
var aCallable = require_a_callable();
var toObject = require_to_object();
var lengthOfArrayLike = require_length_of_array_like();
var arraySpeciesCreate = require_array_species_create();
$({ target: "Array", proto: true }, {
  flatMap: function flatMap(callbackfn) {
    var O = toObject(this);
    var sourceLen = lengthOfArrayLike(O);
    var A;
    aCallable(callbackfn);
    A = arraySpeciesCreate(O, 0);
    A.length = flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
    return A;
  }
});

// node_modules/core-js/modules/es.object.from-entries.js
var $2 = require_export();
var iterate = require_iterate();
var createProperty = require_create_property();
$2({ target: "Object", stat: true }, {
  fromEntries: function fromEntries(iterable) {
    var obj = {};
    iterate(iterable, function(k, v) {
      createProperty(obj, k, v);
    }, { AS_ENTRIES: true });
    return obj;
  }
});

// node_modules/core-js/modules/es.regexp.flags.js
var global2 = require_global();
var DESCRIPTORS = require_descriptors();
var defineBuiltInAccessor = require_define_built_in_accessor();
var regExpFlags = require_regexp_flags();
var fails = require_fails();
var RegExp2 = global2.RegExp;
var RegExpPrototype = RegExp2.prototype;
var FORCED = DESCRIPTORS && fails(function() {
  var INDICES_SUPPORT = true;
  try {
    RegExp2(".", "d");
  } catch (error) {
    INDICES_SUPPORT = false;
  }
  var O = {};
  var calls = "";
  var expected = INDICES_SUPPORT ? "dgimsy" : "gimsy";
  var addGetter = function(key2, chr) {
    Object.defineProperty(O, key2, { get: function() {
      calls += chr;
      return true;
    } });
  };
  var pairs = {
    dotAll: "s",
    global: "g",
    ignoreCase: "i",
    multiline: "m",
    sticky: "y"
  };
  if (INDICES_SUPPORT)
    pairs.hasIndices = "d";
  for (var key in pairs)
    addGetter(key, pairs[key]);
  var result = Object.getOwnPropertyDescriptor(RegExpPrototype, "flags").get.call(O);
  return result !== expected || calls !== expected;
});
if (FORCED)
  defineBuiltInAccessor(RegExpPrototype, "flags", {
    configurable: true,
    get: regExpFlags
  });

// node_modules/core-js/modules/esnext.global-this.js
require_es_global_this();

// node_modules/core-js/modules/es.array.flat.js
var $3 = require_export();
var flattenIntoArray2 = require_flatten_into_array();
var toObject2 = require_to_object();
var lengthOfArrayLike2 = require_length_of_array_like();
var toIntegerOrInfinity = require_to_integer_or_infinity();
var arraySpeciesCreate2 = require_array_species_create();
$3({ target: "Array", proto: true }, {
  flat: function flat() {
    var depthArg = arguments.length ? arguments[0] : void 0;
    var O = toObject2(this);
    var sourceLen = lengthOfArrayLike2(O);
    var A = arraySpeciesCreate2(O, 0);
    A.length = flattenIntoArray2(A, O, O, sourceLen, 0, depthArg === void 0 ? 1 : toIntegerOrInfinity(depthArg));
    return A;
  }
});

// dist/_standalone.js.esm.mjs
var _excluded = ["cliName", "cliCategory", "cliDescription"];
var _excluded2 = ["_"];
var _excluded3 = ["languageId"];
function _objectWithoutProperties(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key))
        continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames2 = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames2(fn)[0]])(fn = 0)), res;
};
var __commonJS2 = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = {
    exports: {}
  }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true
    });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames2(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
  value: mod,
  enumerable: true
}) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", {
  value: true
}), mod);
var define_process_default;
var init_define_process = __esm({
  "<define:process>"() {
    define_process_default = {
      env: {},
      argv: []
    };
  }
});
var require_package = __commonJS2({
  "package.json"(exports, module) {
    module.exports = {
      version: "2.8.8"
    };
  }
});
var require_base = __commonJS2({
  "node_modules/diff/lib/diff/base.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = Diff;
    function Diff() {
    }
    Diff.prototype = {
      diff: function diff(oldString, newString) {
        var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        var callback = options.callback;
        if (typeof options === "function") {
          callback = options;
          options = {};
        }
        this.options = options;
        var self2 = this;
        function done(value) {
          if (callback) {
            setTimeout(function() {
              callback(void 0, value);
            }, 0);
            return true;
          } else {
            return value;
          }
        }
        oldString = this.castInput(oldString);
        newString = this.castInput(newString);
        oldString = this.removeEmpty(this.tokenize(oldString));
        newString = this.removeEmpty(this.tokenize(newString));
        var newLen = newString.length, oldLen = oldString.length;
        var editLength = 1;
        var maxEditLength = newLen + oldLen;
        var bestPath = [{
          newPos: -1,
          components: []
        }];
        var oldPos = this.extractCommon(bestPath[0], newString, oldString, 0);
        if (bestPath[0].newPos + 1 >= newLen && oldPos + 1 >= oldLen) {
          return done([{
            value: this.join(newString),
            count: newString.length
          }]);
        }
        function execEditLength() {
          for (var diagonalPath = -1 * editLength; diagonalPath <= editLength; diagonalPath += 2) {
            var basePath = void 0;
            var addPath = bestPath[diagonalPath - 1], removePath = bestPath[diagonalPath + 1], _oldPos = (removePath ? removePath.newPos : 0) - diagonalPath;
            if (addPath) {
              bestPath[diagonalPath - 1] = void 0;
            }
            var canAdd = addPath && addPath.newPos + 1 < newLen, canRemove = removePath && 0 <= _oldPos && _oldPos < oldLen;
            if (!canAdd && !canRemove) {
              bestPath[diagonalPath] = void 0;
              continue;
            }
            if (!canAdd || canRemove && addPath.newPos < removePath.newPos) {
              basePath = clonePath(removePath);
              self2.pushComponent(basePath.components, void 0, true);
            } else {
              basePath = addPath;
              basePath.newPos++;
              self2.pushComponent(basePath.components, true, void 0);
            }
            _oldPos = self2.extractCommon(basePath, newString, oldString, diagonalPath);
            if (basePath.newPos + 1 >= newLen && _oldPos + 1 >= oldLen) {
              return done(buildValues(self2, basePath.components, newString, oldString, self2.useLongestToken));
            } else {
              bestPath[diagonalPath] = basePath;
            }
          }
          editLength++;
        }
        if (callback) {
          (function exec() {
            setTimeout(function() {
              if (editLength > maxEditLength) {
                return callback();
              }
              if (!execEditLength()) {
                exec();
              }
            }, 0);
          })();
        } else {
          while (editLength <= maxEditLength) {
            var ret = execEditLength();
            if (ret) {
              return ret;
            }
          }
        }
      },
      pushComponent: function pushComponent(components, added, removed) {
        var last = components[components.length - 1];
        if (last && last.added === added && last.removed === removed) {
          components[components.length - 1] = {
            count: last.count + 1,
            added,
            removed
          };
        } else {
          components.push({
            count: 1,
            added,
            removed
          });
        }
      },
      extractCommon: function extractCommon(basePath, newString, oldString, diagonalPath) {
        var newLen = newString.length, oldLen = oldString.length, newPos = basePath.newPos, oldPos = newPos - diagonalPath, commonCount = 0;
        while (newPos + 1 < newLen && oldPos + 1 < oldLen && this.equals(newString[newPos + 1], oldString[oldPos + 1])) {
          newPos++;
          oldPos++;
          commonCount++;
        }
        if (commonCount) {
          basePath.components.push({
            count: commonCount
          });
        }
        basePath.newPos = newPos;
        return oldPos;
      },
      equals: function equals(left, right) {
        if (this.options.comparator) {
          return this.options.comparator(left, right);
        } else {
          return left === right || this.options.ignoreCase && left.toLowerCase() === right.toLowerCase();
        }
      },
      removeEmpty: function removeEmpty(array) {
        var ret = [];
        for (var i = 0; i < array.length; i++) {
          if (array[i]) {
            ret.push(array[i]);
          }
        }
        return ret;
      },
      castInput: function castInput(value) {
        return value;
      },
      tokenize: function tokenize(value) {
        return value.split("");
      },
      join: function join2(chars) {
        return chars.join("");
      }
    };
    function buildValues(diff, components, newString, oldString, useLongestToken) {
      var componentPos = 0, componentLen = components.length, newPos = 0, oldPos = 0;
      for (; componentPos < componentLen; componentPos++) {
        var component = components[componentPos];
        if (!component.removed) {
          if (!component.added && useLongestToken) {
            var value = newString.slice(newPos, newPos + component.count);
            value = value.map(function(value2, i) {
              var oldValue = oldString[oldPos + i];
              return oldValue.length > value2.length ? oldValue : value2;
            });
            component.value = diff.join(value);
          } else {
            component.value = diff.join(newString.slice(newPos, newPos + component.count));
          }
          newPos += component.count;
          if (!component.added) {
            oldPos += component.count;
          }
        } else {
          component.value = diff.join(oldString.slice(oldPos, oldPos + component.count));
          oldPos += component.count;
          if (componentPos && components[componentPos - 1].added) {
            var tmp = components[componentPos - 1];
            components[componentPos - 1] = components[componentPos];
            components[componentPos] = tmp;
          }
        }
      }
      var lastComponent = components[componentLen - 1];
      if (componentLen > 1 && typeof lastComponent.value === "string" && (lastComponent.added || lastComponent.removed) && diff.equals("", lastComponent.value)) {
        components[componentLen - 2].value += lastComponent.value;
        components.pop();
      }
      return components;
    }
    function clonePath(path) {
      return {
        newPos: path.newPos,
        components: path.components.slice(0)
      };
    }
  }
});
var require_array = __commonJS2({
  "node_modules/diff/lib/diff/array.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.diffArrays = diffArrays;
    exports.arrayDiff = void 0;
    var _base = _interopRequireDefault(require_base());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        "default": obj
      };
    }
    var arrayDiff = new _base["default"]();
    exports.arrayDiff = arrayDiff;
    arrayDiff.tokenize = function(value) {
      return value.slice();
    };
    arrayDiff.join = arrayDiff.removeEmpty = function(value) {
      return value;
    };
    function diffArrays(oldArr, newArr, callback) {
      return arrayDiff.diff(oldArr, newArr, callback);
    }
  }
});
var require_doc_builders = __commonJS2({
  "src/document/doc-builders.js"(exports, module) {
    "use strict";
    init_define_process();
    function concat(parts) {
      if (false) {
        for (const part of parts) {
          assertDoc(part);
        }
      }
      return {
        type: "concat",
        parts
      };
    }
    function indent(contents) {
      if (false) {
        assertDoc(contents);
      }
      return {
        type: "indent",
        contents
      };
    }
    function align(widthOrString, contents) {
      if (false) {
        assertDoc(contents);
      }
      return {
        type: "align",
        contents,
        n: widthOrString
      };
    }
    function group(contents) {
      let opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      if (false) {
        assertDoc(contents);
      }
      return {
        type: "group",
        id: opts.id,
        contents,
        break: Boolean(opts.shouldBreak),
        expandedStates: opts.expandedStates
      };
    }
    function dedentToRoot(contents) {
      return align(Number.NEGATIVE_INFINITY, contents);
    }
    function markAsRoot(contents) {
      return align({
        type: "root"
      }, contents);
    }
    function dedent(contents) {
      return align(-1, contents);
    }
    function conditionalGroup(states, opts) {
      return group(states[0], Object.assign(Object.assign({}, opts), {}, {
        expandedStates: states
      }));
    }
    function fill(parts) {
      if (false) {
        for (const part of parts) {
          assertDoc(part);
        }
      }
      return {
        type: "fill",
        parts
      };
    }
    function ifBreak(breakContents, flatContents) {
      let opts = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      if (false) {
        if (breakContents) {
          assertDoc(breakContents);
        }
        if (flatContents) {
          assertDoc(flatContents);
        }
      }
      return {
        type: "if-break",
        breakContents,
        flatContents,
        groupId: opts.groupId
      };
    }
    function indentIfBreak(contents, opts) {
      return {
        type: "indent-if-break",
        contents,
        groupId: opts.groupId,
        negate: opts.negate
      };
    }
    function lineSuffix(contents) {
      if (false) {
        assertDoc(contents);
      }
      return {
        type: "line-suffix",
        contents
      };
    }
    var lineSuffixBoundary = {
      type: "line-suffix-boundary"
    };
    var breakParent = {
      type: "break-parent"
    };
    var trim = {
      type: "trim"
    };
    var hardlineWithoutBreakParent = {
      type: "line",
      hard: true
    };
    var literallineWithoutBreakParent = {
      type: "line",
      hard: true,
      literal: true
    };
    var line = {
      type: "line"
    };
    var softline = {
      type: "line",
      soft: true
    };
    var hardline = concat([hardlineWithoutBreakParent, breakParent]);
    var literalline = concat([literallineWithoutBreakParent, breakParent]);
    var cursor = {
      type: "cursor",
      placeholder: Symbol("cursor")
    };
    function join2(sep2, arr) {
      const res = [];
      for (let i = 0; i < arr.length; i++) {
        if (i !== 0) {
          res.push(sep2);
        }
        res.push(arr[i]);
      }
      return concat(res);
    }
    function addAlignmentToDoc(doc, size, tabWidth) {
      let aligned = doc;
      if (size > 0) {
        for (let i = 0; i < Math.floor(size / tabWidth); ++i) {
          aligned = indent(aligned);
        }
        aligned = align(size % tabWidth, aligned);
        aligned = align(Number.NEGATIVE_INFINITY, aligned);
      }
      return aligned;
    }
    function label(label2, contents) {
      return {
        type: "label",
        label: label2,
        contents
      };
    }
    module.exports = {
      concat,
      join: join2,
      line,
      softline,
      hardline,
      literalline,
      group,
      conditionalGroup,
      fill,
      lineSuffix,
      lineSuffixBoundary,
      cursor,
      breakParent,
      ifBreak,
      trim,
      indent,
      indentIfBreak,
      align,
      addAlignmentToDoc,
      markAsRoot,
      dedentToRoot,
      dedent,
      hardlineWithoutBreakParent,
      literallineWithoutBreakParent,
      label
    };
  }
});
var require_end_of_line = __commonJS2({
  "src/common/end-of-line.js"(exports, module) {
    "use strict";
    init_define_process();
    function guessEndOfLine(text) {
      const index = text.indexOf("\r");
      if (index >= 0) {
        return text.charAt(index + 1) === "\n" ? "crlf" : "cr";
      }
      return "lf";
    }
    function convertEndOfLineToChars(value) {
      switch (value) {
        case "cr":
          return "\r";
        case "crlf":
          return "\r\n";
        default:
          return "\n";
      }
    }
    function countEndOfLineChars(text, eol) {
      let regex;
      switch (eol) {
        case "\n":
          regex = /\n/g;
          break;
        case "\r":
          regex = /\r/g;
          break;
        case "\r\n":
          regex = /\r\n/g;
          break;
        default:
          throw new Error(`Unexpected "eol" ${JSON.stringify(eol)}.`);
      }
      const endOfLines = text.match(regex);
      return endOfLines ? endOfLines.length : 0;
    }
    function normalizeEndOfLine(text) {
      return text.replace(/\r\n?/g, "\n");
    }
    module.exports = {
      guessEndOfLine,
      convertEndOfLineToChars,
      countEndOfLineChars,
      normalizeEndOfLine
    };
  }
});
var require_get_last = __commonJS2({
  "src/utils/get-last.js"(exports, module) {
    "use strict";
    init_define_process();
    var getLast = (arr) => arr[arr.length - 1];
    module.exports = getLast;
  }
});
function ansiRegex() {
  let {
    onlyFirst = false
  } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const pattern = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"].join("|");
  return new RegExp(pattern, onlyFirst ? void 0 : "g");
}
var init_ansi_regex = __esm({
  "node_modules/strip-ansi/node_modules/ansi-regex/index.js"() {
    init_define_process();
  }
});
function stripAnsi(string) {
  if (typeof string !== "string") {
    throw new TypeError(`Expected a \`string\`, got \`${typeof string}\``);
  }
  return string.replace(ansiRegex(), "");
}
var init_strip_ansi = __esm({
  "node_modules/strip-ansi/index.js"() {
    init_define_process();
    init_ansi_regex();
  }
});
function isFullwidthCodePoint(codePoint) {
  if (!Number.isInteger(codePoint)) {
    return false;
  }
  return codePoint >= 4352 && (codePoint <= 4447 || codePoint === 9001 || codePoint === 9002 || 11904 <= codePoint && codePoint <= 12871 && codePoint !== 12351 || 12880 <= codePoint && codePoint <= 19903 || 19968 <= codePoint && codePoint <= 42182 || 43360 <= codePoint && codePoint <= 43388 || 44032 <= codePoint && codePoint <= 55203 || 63744 <= codePoint && codePoint <= 64255 || 65040 <= codePoint && codePoint <= 65049 || 65072 <= codePoint && codePoint <= 65131 || 65281 <= codePoint && codePoint <= 65376 || 65504 <= codePoint && codePoint <= 65510 || 110592 <= codePoint && codePoint <= 110593 || 127488 <= codePoint && codePoint <= 127569 || 131072 <= codePoint && codePoint <= 262141);
}
var init_is_fullwidth_code_point = __esm({
  "node_modules/is-fullwidth-code-point/index.js"() {
    init_define_process();
  }
});
var require_emoji_regex = __commonJS2({
  "node_modules/emoji-regex/index.js"(exports, module) {
    "use strict";
    init_define_process();
    module.exports = function() {
      return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|(?:\uD83E\uDDD1\uD83C\uDFFF\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFC-\uDFFF])|\uD83D\uDC68(?:\uD83C\uDFFB(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|[\u2695\u2696\u2708]\uFE0F|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))?|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])\uFE0F|\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC)?|(?:\uD83D\uDC69(?:\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC69(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83E\uDDD1(?:\u200D(?:\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDE36\u200D\uD83C\uDF2B|\uD83C\uDFF3\uFE0F\u200D\u26A7|\uD83D\uDC3B\u200D\u2744|(?:(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\uD83C\uDFF4\u200D\u2620|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])\u200D[\u2640\u2642]|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u2600-\u2604\u260E\u2611\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26B0\u26B1\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0\u26F1\u26F4\u26F7\u26F8\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u3030\u303D\u3297\u3299]|\uD83C[\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]|\uD83D[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3])\uFE0F|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDE35\u200D\uD83D\uDCAB|\uD83D\uDE2E\u200D\uD83D\uDCA8|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83E\uDDD1(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83D\uDC69(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC08\u200D\u2B1B|\u2764\uFE0F\u200D(?:\uD83D\uDD25|\uD83E\uDE79)|\uD83D\uDC41\uFE0F|\uD83C\uDFF3\uFE0F|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|[#\*0-9]\uFE0F\u20E3|\u2764\uFE0F|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF4|(?:[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270C\u270D]|\uD83D[\uDD74\uDD90])(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC08\uDC15\uDC3B\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE2E\uDE35\uDE36\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5]|\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD]|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF]|[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0D\uDD0E\uDD10-\uDD17\uDD1D\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78\uDD7A-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCB\uDDD0\uDDE0-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6]|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED7\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDD77\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
    };
  }
});
var string_width_exports = {};
__export(string_width_exports, {
  default: () => stringWidth
});
function stringWidth(string) {
  if (typeof string !== "string" || string.length === 0) {
    return 0;
  }
  string = stripAnsi(string);
  if (string.length === 0) {
    return 0;
  }
  string = string.replace((0, import_emoji_regex.default)(), "  ");
  let width = 0;
  for (let index = 0; index < string.length; index++) {
    const codePoint = string.codePointAt(index);
    if (codePoint <= 31 || codePoint >= 127 && codePoint <= 159) {
      continue;
    }
    if (codePoint >= 768 && codePoint <= 879) {
      continue;
    }
    if (codePoint > 65535) {
      index++;
    }
    width += isFullwidthCodePoint(codePoint) ? 2 : 1;
  }
  return width;
}
var import_emoji_regex;
var init_string_width = __esm({
  "node_modules/string-width/index.js"() {
    init_define_process();
    init_strip_ansi();
    init_is_fullwidth_code_point();
    import_emoji_regex = __toESM(require_emoji_regex());
  }
});
var require_get_string_width = __commonJS2({
  "src/utils/get-string-width.js"(exports, module) {
    "use strict";
    init_define_process();
    var stringWidth2 = (init_string_width(), __toCommonJS(string_width_exports)).default;
    var notAsciiRegex = /[^\x20-\x7F]/;
    function getStringWidth(text) {
      if (!text) {
        return 0;
      }
      if (!notAsciiRegex.test(text)) {
        return text.length;
      }
      return stringWidth2(text);
    }
    module.exports = getStringWidth;
  }
});
var require_doc_utils = __commonJS2({
  "src/document/doc-utils.js"(exports, module) {
    "use strict";
    init_define_process();
    var getLast = require_get_last();
    var {
      literalline,
      join: join2
    } = require_doc_builders();
    var isConcat = (doc) => Array.isArray(doc) || doc && doc.type === "concat";
    var getDocParts = (doc) => {
      if (Array.isArray(doc)) {
        return doc;
      }
      if (doc.type !== "concat" && doc.type !== "fill") {
        throw new Error("Expect doc type to be `concat` or `fill`.");
      }
      return doc.parts;
    };
    var traverseDocOnExitStackMarker = {};
    function traverseDoc(doc, onEnter, onExit, shouldTraverseConditionalGroups) {
      const docsStack = [doc];
      while (docsStack.length > 0) {
        const doc2 = docsStack.pop();
        if (doc2 === traverseDocOnExitStackMarker) {
          onExit(docsStack.pop());
          continue;
        }
        if (onExit) {
          docsStack.push(doc2, traverseDocOnExitStackMarker);
        }
        if (!onEnter || onEnter(doc2) !== false) {
          if (isConcat(doc2) || doc2.type === "fill") {
            const parts = getDocParts(doc2);
            for (let ic = parts.length, i = ic - 1; i >= 0; --i) {
              docsStack.push(parts[i]);
            }
          } else if (doc2.type === "if-break") {
            if (doc2.flatContents) {
              docsStack.push(doc2.flatContents);
            }
            if (doc2.breakContents) {
              docsStack.push(doc2.breakContents);
            }
          } else if (doc2.type === "group" && doc2.expandedStates) {
            if (shouldTraverseConditionalGroups) {
              for (let ic = doc2.expandedStates.length, i = ic - 1; i >= 0; --i) {
                docsStack.push(doc2.expandedStates[i]);
              }
            } else {
              docsStack.push(doc2.contents);
            }
          } else if (doc2.contents) {
            docsStack.push(doc2.contents);
          }
        }
      }
    }
    function mapDoc(doc, cb) {
      const mapped = /* @__PURE__ */ new Map();
      return rec(doc);
      function rec(doc2) {
        if (mapped.has(doc2)) {
          return mapped.get(doc2);
        }
        const result = process2(doc2);
        mapped.set(doc2, result);
        return result;
      }
      function process2(doc2) {
        if (Array.isArray(doc2)) {
          return cb(doc2.map(rec));
        }
        if (doc2.type === "concat" || doc2.type === "fill") {
          const parts = doc2.parts.map(rec);
          return cb(Object.assign(Object.assign({}, doc2), {}, {
            parts
          }));
        }
        if (doc2.type === "if-break") {
          const breakContents = doc2.breakContents && rec(doc2.breakContents);
          const flatContents = doc2.flatContents && rec(doc2.flatContents);
          return cb(Object.assign(Object.assign({}, doc2), {}, {
            breakContents,
            flatContents
          }));
        }
        if (doc2.type === "group" && doc2.expandedStates) {
          const expandedStates = doc2.expandedStates.map(rec);
          const contents = expandedStates[0];
          return cb(Object.assign(Object.assign({}, doc2), {}, {
            contents,
            expandedStates
          }));
        }
        if (doc2.contents) {
          const contents = rec(doc2.contents);
          return cb(Object.assign(Object.assign({}, doc2), {}, {
            contents
          }));
        }
        return cb(doc2);
      }
    }
    function findInDoc(doc, fn, defaultValue) {
      let result = defaultValue;
      let hasStopped = false;
      function findInDocOnEnterFn(doc2) {
        const maybeResult = fn(doc2);
        if (maybeResult !== void 0) {
          hasStopped = true;
          result = maybeResult;
        }
        if (hasStopped) {
          return false;
        }
      }
      traverseDoc(doc, findInDocOnEnterFn);
      return result;
    }
    function willBreakFn(doc) {
      if (doc.type === "group" && doc.break) {
        return true;
      }
      if (doc.type === "line" && doc.hard) {
        return true;
      }
      if (doc.type === "break-parent") {
        return true;
      }
    }
    function willBreak(doc) {
      return findInDoc(doc, willBreakFn, false);
    }
    function breakParentGroup(groupStack) {
      if (groupStack.length > 0) {
        const parentGroup = getLast(groupStack);
        if (!parentGroup.expandedStates && !parentGroup.break) {
          parentGroup.break = "propagated";
        }
      }
      return null;
    }
    function propagateBreaks(doc) {
      const alreadyVisitedSet = /* @__PURE__ */ new Set();
      const groupStack = [];
      function propagateBreaksOnEnterFn(doc2) {
        if (doc2.type === "break-parent") {
          breakParentGroup(groupStack);
        }
        if (doc2.type === "group") {
          groupStack.push(doc2);
          if (alreadyVisitedSet.has(doc2)) {
            return false;
          }
          alreadyVisitedSet.add(doc2);
        }
      }
      function propagateBreaksOnExitFn(doc2) {
        if (doc2.type === "group") {
          const group = groupStack.pop();
          if (group.break) {
            breakParentGroup(groupStack);
          }
        }
      }
      traverseDoc(doc, propagateBreaksOnEnterFn, propagateBreaksOnExitFn, true);
    }
    function removeLinesFn(doc) {
      if (doc.type === "line" && !doc.hard) {
        return doc.soft ? "" : " ";
      }
      if (doc.type === "if-break") {
        return doc.flatContents || "";
      }
      return doc;
    }
    function removeLines(doc) {
      return mapDoc(doc, removeLinesFn);
    }
    var isHardline = (doc, nextDoc) => doc && doc.type === "line" && doc.hard && nextDoc && nextDoc.type === "break-parent";
    function stripDocTrailingHardlineFromDoc(doc) {
      if (!doc) {
        return doc;
      }
      if (isConcat(doc) || doc.type === "fill") {
        const parts = getDocParts(doc);
        while (parts.length > 1 && isHardline(...parts.slice(-2))) {
          parts.length -= 2;
        }
        if (parts.length > 0) {
          const lastPart = stripDocTrailingHardlineFromDoc(getLast(parts));
          parts[parts.length - 1] = lastPart;
        }
        return Array.isArray(doc) ? parts : Object.assign(Object.assign({}, doc), {}, {
          parts
        });
      }
      switch (doc.type) {
        case "align":
        case "indent":
        case "indent-if-break":
        case "group":
        case "line-suffix":
        case "label": {
          const contents = stripDocTrailingHardlineFromDoc(doc.contents);
          return Object.assign(Object.assign({}, doc), {}, {
            contents
          });
        }
        case "if-break": {
          const breakContents = stripDocTrailingHardlineFromDoc(doc.breakContents);
          const flatContents = stripDocTrailingHardlineFromDoc(doc.flatContents);
          return Object.assign(Object.assign({}, doc), {}, {
            breakContents,
            flatContents
          });
        }
      }
      return doc;
    }
    function stripTrailingHardline(doc) {
      return stripDocTrailingHardlineFromDoc(cleanDoc(doc));
    }
    function cleanDocFn(doc) {
      switch (doc.type) {
        case "fill":
          if (doc.parts.every((part) => part === "")) {
            return "";
          }
          break;
        case "group":
          if (!doc.contents && !doc.id && !doc.break && !doc.expandedStates) {
            return "";
          }
          if (doc.contents.type === "group" && doc.contents.id === doc.id && doc.contents.break === doc.break && doc.contents.expandedStates === doc.expandedStates) {
            return doc.contents;
          }
          break;
        case "align":
        case "indent":
        case "indent-if-break":
        case "line-suffix":
          if (!doc.contents) {
            return "";
          }
          break;
        case "if-break":
          if (!doc.flatContents && !doc.breakContents) {
            return "";
          }
          break;
      }
      if (!isConcat(doc)) {
        return doc;
      }
      const parts = [];
      for (const part of getDocParts(doc)) {
        if (!part) {
          continue;
        }
        const [currentPart, ...restParts] = isConcat(part) ? getDocParts(part) : [part];
        if (typeof currentPart === "string" && typeof getLast(parts) === "string") {
          parts[parts.length - 1] += currentPart;
        } else {
          parts.push(currentPart);
        }
        parts.push(...restParts);
      }
      if (parts.length === 0) {
        return "";
      }
      if (parts.length === 1) {
        return parts[0];
      }
      return Array.isArray(doc) ? parts : Object.assign(Object.assign({}, doc), {}, {
        parts
      });
    }
    function cleanDoc(doc) {
      return mapDoc(doc, (currentDoc) => cleanDocFn(currentDoc));
    }
    function normalizeParts(parts) {
      const newParts = [];
      const restParts = parts.filter(Boolean);
      while (restParts.length > 0) {
        const part = restParts.shift();
        if (!part) {
          continue;
        }
        if (isConcat(part)) {
          restParts.unshift(...getDocParts(part));
          continue;
        }
        if (newParts.length > 0 && typeof getLast(newParts) === "string" && typeof part === "string") {
          newParts[newParts.length - 1] += part;
          continue;
        }
        newParts.push(part);
      }
      return newParts;
    }
    function normalizeDoc(doc) {
      return mapDoc(doc, (currentDoc) => {
        if (Array.isArray(currentDoc)) {
          return normalizeParts(currentDoc);
        }
        if (!currentDoc.parts) {
          return currentDoc;
        }
        return Object.assign(Object.assign({}, currentDoc), {}, {
          parts: normalizeParts(currentDoc.parts)
        });
      });
    }
    function replaceEndOfLine(doc) {
      return mapDoc(doc, (currentDoc) => typeof currentDoc === "string" && currentDoc.includes("\n") ? replaceTextEndOfLine(currentDoc) : currentDoc);
    }
    function replaceTextEndOfLine(text) {
      let replacement = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : literalline;
      return join2(replacement, text.split("\n")).parts;
    }
    function canBreakFn(doc) {
      if (doc.type === "line") {
        return true;
      }
    }
    function canBreak(doc) {
      return findInDoc(doc, canBreakFn, false);
    }
    module.exports = {
      isConcat,
      getDocParts,
      willBreak,
      traverseDoc,
      findInDoc,
      mapDoc,
      propagateBreaks,
      removeLines,
      stripTrailingHardline,
      normalizeParts,
      normalizeDoc,
      cleanDoc,
      replaceTextEndOfLine,
      replaceEndOfLine,
      canBreak
    };
  }
});
var require_doc_printer = __commonJS2({
  "src/document/doc-printer.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      convertEndOfLineToChars
    } = require_end_of_line();
    var getLast = require_get_last();
    var getStringWidth = require_get_string_width();
    var {
      fill,
      cursor,
      indent
    } = require_doc_builders();
    var {
      isConcat,
      getDocParts
    } = require_doc_utils();
    var groupModeMap;
    var MODE_BREAK = 1;
    var MODE_FLAT = 2;
    function rootIndent() {
      return {
        value: "",
        length: 0,
        queue: []
      };
    }
    function makeIndent(ind, options) {
      return generateInd(ind, {
        type: "indent"
      }, options);
    }
    function makeAlign(indent2, widthOrDoc, options) {
      if (widthOrDoc === Number.NEGATIVE_INFINITY) {
        return indent2.root || rootIndent();
      }
      if (widthOrDoc < 0) {
        return generateInd(indent2, {
          type: "dedent"
        }, options);
      }
      if (!widthOrDoc) {
        return indent2;
      }
      if (widthOrDoc.type === "root") {
        return Object.assign(Object.assign({}, indent2), {}, {
          root: indent2
        });
      }
      const alignType = typeof widthOrDoc === "string" ? "stringAlign" : "numberAlign";
      return generateInd(indent2, {
        type: alignType,
        n: widthOrDoc
      }, options);
    }
    function generateInd(ind, newPart, options) {
      const queue = newPart.type === "dedent" ? ind.queue.slice(0, -1) : [...ind.queue, newPart];
      let value = "";
      let length = 0;
      let lastTabs = 0;
      let lastSpaces = 0;
      for (const part of queue) {
        switch (part.type) {
          case "indent":
            flush();
            if (options.useTabs) {
              addTabs(1);
            } else {
              addSpaces(options.tabWidth);
            }
            break;
          case "stringAlign":
            flush();
            value += part.n;
            length += part.n.length;
            break;
          case "numberAlign":
            lastTabs += 1;
            lastSpaces += part.n;
            break;
          default:
            throw new Error(`Unexpected type '${part.type}'`);
        }
      }
      flushSpaces();
      return Object.assign(Object.assign({}, ind), {}, {
        value,
        length,
        queue
      });
      function addTabs(count) {
        value += "	".repeat(count);
        length += options.tabWidth * count;
      }
      function addSpaces(count) {
        value += " ".repeat(count);
        length += count;
      }
      function flush() {
        if (options.useTabs) {
          flushTabs();
        } else {
          flushSpaces();
        }
      }
      function flushTabs() {
        if (lastTabs > 0) {
          addTabs(lastTabs);
        }
        resetLast();
      }
      function flushSpaces() {
        if (lastSpaces > 0) {
          addSpaces(lastSpaces);
        }
        resetLast();
      }
      function resetLast() {
        lastTabs = 0;
        lastSpaces = 0;
      }
    }
    function trim(out) {
      if (out.length === 0) {
        return 0;
      }
      let trimCount = 0;
      while (out.length > 0 && typeof getLast(out) === "string" && /^[\t ]*$/.test(getLast(out))) {
        trimCount += out.pop().length;
      }
      if (out.length > 0 && typeof getLast(out) === "string") {
        const trimmed = getLast(out).replace(/[\t ]*$/, "");
        trimCount += getLast(out).length - trimmed.length;
        out[out.length - 1] = trimmed;
      }
      return trimCount;
    }
    function fits(next, restCommands, width, hasLineSuffix, mustBeFlat) {
      let restIdx = restCommands.length;
      const cmds = [next];
      const out = [];
      while (width >= 0) {
        if (cmds.length === 0) {
          if (restIdx === 0) {
            return true;
          }
          cmds.push(restCommands[--restIdx]);
          continue;
        }
        const {
          mode,
          doc
        } = cmds.pop();
        if (typeof doc === "string") {
          out.push(doc);
          width -= getStringWidth(doc);
        } else if (isConcat(doc) || doc.type === "fill") {
          const parts = getDocParts(doc);
          for (let i = parts.length - 1; i >= 0; i--) {
            cmds.push({
              mode,
              doc: parts[i]
            });
          }
        } else {
          switch (doc.type) {
            case "indent":
            case "align":
            case "indent-if-break":
            case "label":
              cmds.push({
                mode,
                doc: doc.contents
              });
              break;
            case "trim":
              width += trim(out);
              break;
            case "group": {
              if (mustBeFlat && doc.break) {
                return false;
              }
              const groupMode = doc.break ? MODE_BREAK : mode;
              const contents = doc.expandedStates && groupMode === MODE_BREAK ? getLast(doc.expandedStates) : doc.contents;
              cmds.push({
                mode: groupMode,
                doc: contents
              });
              break;
            }
            case "if-break": {
              const groupMode = doc.groupId ? groupModeMap[doc.groupId] || MODE_FLAT : mode;
              const contents = groupMode === MODE_BREAK ? doc.breakContents : doc.flatContents;
              if (contents) {
                cmds.push({
                  mode,
                  doc: contents
                });
              }
              break;
            }
            case "line":
              if (mode === MODE_BREAK || doc.hard) {
                return true;
              }
              if (!doc.soft) {
                out.push(" ");
                width--;
              }
              break;
            case "line-suffix":
              hasLineSuffix = true;
              break;
            case "line-suffix-boundary":
              if (hasLineSuffix) {
                return false;
              }
              break;
          }
        }
      }
      return false;
    }
    function printDocToString(doc, options) {
      groupModeMap = {};
      const width = options.printWidth;
      const newLine = convertEndOfLineToChars(options.endOfLine);
      let pos = 0;
      const cmds = [{
        ind: rootIndent(),
        mode: MODE_BREAK,
        doc
      }];
      const out = [];
      let shouldRemeasure = false;
      const lineSuffix = [];
      while (cmds.length > 0) {
        const {
          ind,
          mode,
          doc: doc2
        } = cmds.pop();
        if (typeof doc2 === "string") {
          const formatted = newLine !== "\n" ? doc2.replace(/\n/g, newLine) : doc2;
          out.push(formatted);
          pos += getStringWidth(formatted);
        } else if (isConcat(doc2)) {
          const parts = getDocParts(doc2);
          for (let i = parts.length - 1; i >= 0; i--) {
            cmds.push({
              ind,
              mode,
              doc: parts[i]
            });
          }
        } else {
          switch (doc2.type) {
            case "cursor":
              out.push(cursor.placeholder);
              break;
            case "indent":
              cmds.push({
                ind: makeIndent(ind, options),
                mode,
                doc: doc2.contents
              });
              break;
            case "align":
              cmds.push({
                ind: makeAlign(ind, doc2.n, options),
                mode,
                doc: doc2.contents
              });
              break;
            case "trim":
              pos -= trim(out);
              break;
            case "group":
              switch (mode) {
                case MODE_FLAT:
                  if (!shouldRemeasure) {
                    cmds.push({
                      ind,
                      mode: doc2.break ? MODE_BREAK : MODE_FLAT,
                      doc: doc2.contents
                    });
                    break;
                  }
                case MODE_BREAK: {
                  shouldRemeasure = false;
                  const next = {
                    ind,
                    mode: MODE_FLAT,
                    doc: doc2.contents
                  };
                  const rem = width - pos;
                  const hasLineSuffix = lineSuffix.length > 0;
                  if (!doc2.break && fits(next, cmds, rem, hasLineSuffix)) {
                    cmds.push(next);
                  } else {
                    if (doc2.expandedStates) {
                      const mostExpanded = getLast(doc2.expandedStates);
                      if (doc2.break) {
                        cmds.push({
                          ind,
                          mode: MODE_BREAK,
                          doc: mostExpanded
                        });
                        break;
                      } else {
                        for (let i = 1; i < doc2.expandedStates.length + 1; i++) {
                          if (i >= doc2.expandedStates.length) {
                            cmds.push({
                              ind,
                              mode: MODE_BREAK,
                              doc: mostExpanded
                            });
                            break;
                          } else {
                            const state = doc2.expandedStates[i];
                            const cmd = {
                              ind,
                              mode: MODE_FLAT,
                              doc: state
                            };
                            if (fits(cmd, cmds, rem, hasLineSuffix)) {
                              cmds.push(cmd);
                              break;
                            }
                          }
                        }
                      }
                    } else {
                      cmds.push({
                        ind,
                        mode: MODE_BREAK,
                        doc: doc2.contents
                      });
                    }
                  }
                  break;
                }
              }
              if (doc2.id) {
                groupModeMap[doc2.id] = getLast(cmds).mode;
              }
              break;
            case "fill": {
              const rem = width - pos;
              const {
                parts
              } = doc2;
              if (parts.length === 0) {
                break;
              }
              const [content, whitespace] = parts;
              const contentFlatCmd = {
                ind,
                mode: MODE_FLAT,
                doc: content
              };
              const contentBreakCmd = {
                ind,
                mode: MODE_BREAK,
                doc: content
              };
              const contentFits = fits(contentFlatCmd, [], rem, lineSuffix.length > 0, true);
              if (parts.length === 1) {
                if (contentFits) {
                  cmds.push(contentFlatCmd);
                } else {
                  cmds.push(contentBreakCmd);
                }
                break;
              }
              const whitespaceFlatCmd = {
                ind,
                mode: MODE_FLAT,
                doc: whitespace
              };
              const whitespaceBreakCmd = {
                ind,
                mode: MODE_BREAK,
                doc: whitespace
              };
              if (parts.length === 2) {
                if (contentFits) {
                  cmds.push(whitespaceFlatCmd, contentFlatCmd);
                } else {
                  cmds.push(whitespaceBreakCmd, contentBreakCmd);
                }
                break;
              }
              parts.splice(0, 2);
              const remainingCmd = {
                ind,
                mode,
                doc: fill(parts)
              };
              const secondContent = parts[0];
              const firstAndSecondContentFlatCmd = {
                ind,
                mode: MODE_FLAT,
                doc: [content, whitespace, secondContent]
              };
              const firstAndSecondContentFits = fits(firstAndSecondContentFlatCmd, [], rem, lineSuffix.length > 0, true);
              if (firstAndSecondContentFits) {
                cmds.push(remainingCmd, whitespaceFlatCmd, contentFlatCmd);
              } else if (contentFits) {
                cmds.push(remainingCmd, whitespaceBreakCmd, contentFlatCmd);
              } else {
                cmds.push(remainingCmd, whitespaceBreakCmd, contentBreakCmd);
              }
              break;
            }
            case "if-break":
            case "indent-if-break": {
              const groupMode = doc2.groupId ? groupModeMap[doc2.groupId] : mode;
              if (groupMode === MODE_BREAK) {
                const breakContents = doc2.type === "if-break" ? doc2.breakContents : doc2.negate ? doc2.contents : indent(doc2.contents);
                if (breakContents) {
                  cmds.push({
                    ind,
                    mode,
                    doc: breakContents
                  });
                }
              }
              if (groupMode === MODE_FLAT) {
                const flatContents = doc2.type === "if-break" ? doc2.flatContents : doc2.negate ? indent(doc2.contents) : doc2.contents;
                if (flatContents) {
                  cmds.push({
                    ind,
                    mode,
                    doc: flatContents
                  });
                }
              }
              break;
            }
            case "line-suffix":
              lineSuffix.push({
                ind,
                mode,
                doc: doc2.contents
              });
              break;
            case "line-suffix-boundary":
              if (lineSuffix.length > 0) {
                cmds.push({
                  ind,
                  mode,
                  doc: {
                    type: "line",
                    hard: true
                  }
                });
              }
              break;
            case "line":
              switch (mode) {
                case MODE_FLAT:
                  if (!doc2.hard) {
                    if (!doc2.soft) {
                      out.push(" ");
                      pos += 1;
                    }
                    break;
                  } else {
                    shouldRemeasure = true;
                  }
                case MODE_BREAK:
                  if (lineSuffix.length > 0) {
                    cmds.push({
                      ind,
                      mode,
                      doc: doc2
                    }, ...lineSuffix.reverse());
                    lineSuffix.length = 0;
                    break;
                  }
                  if (doc2.literal) {
                    if (ind.root) {
                      out.push(newLine, ind.root.value);
                      pos = ind.root.length;
                    } else {
                      out.push(newLine);
                      pos = 0;
                    }
                  } else {
                    pos -= trim(out);
                    out.push(newLine + ind.value);
                    pos = ind.length;
                  }
                  break;
              }
              break;
            case "label":
              cmds.push({
                ind,
                mode,
                doc: doc2.contents
              });
              break;
            default:
          }
        }
        if (cmds.length === 0 && lineSuffix.length > 0) {
          cmds.push(...lineSuffix.reverse());
          lineSuffix.length = 0;
        }
      }
      const cursorPlaceholderIndex = out.indexOf(cursor.placeholder);
      if (cursorPlaceholderIndex !== -1) {
        const otherCursorPlaceholderIndex = out.indexOf(cursor.placeholder, cursorPlaceholderIndex + 1);
        const beforeCursor = out.slice(0, cursorPlaceholderIndex).join("");
        const aroundCursor = out.slice(cursorPlaceholderIndex + 1, otherCursorPlaceholderIndex).join("");
        const afterCursor = out.slice(otherCursorPlaceholderIndex + 1).join("");
        return {
          formatted: beforeCursor + aroundCursor + afterCursor,
          cursorNodeStart: beforeCursor.length,
          cursorNodeText: aroundCursor
        };
      }
      return {
        formatted: out.join("")
      };
    }
    module.exports = {
      printDocToString
    };
  }
});
var require_doc_debug = __commonJS2({
  "src/document/doc-debug.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      isConcat,
      getDocParts
    } = require_doc_utils();
    function flattenDoc(doc) {
      if (!doc) {
        return "";
      }
      if (isConcat(doc)) {
        const res = [];
        for (const part of getDocParts(doc)) {
          if (isConcat(part)) {
            res.push(...flattenDoc(part).parts);
          } else {
            const flattened = flattenDoc(part);
            if (flattened !== "") {
              res.push(flattened);
            }
          }
        }
        return {
          type: "concat",
          parts: res
        };
      }
      if (doc.type === "if-break") {
        return Object.assign(Object.assign({}, doc), {}, {
          breakContents: flattenDoc(doc.breakContents),
          flatContents: flattenDoc(doc.flatContents)
        });
      }
      if (doc.type === "group") {
        return Object.assign(Object.assign({}, doc), {}, {
          contents: flattenDoc(doc.contents),
          expandedStates: doc.expandedStates && doc.expandedStates.map(flattenDoc)
        });
      }
      if (doc.type === "fill") {
        return {
          type: "fill",
          parts: doc.parts.map(flattenDoc)
        };
      }
      if (doc.contents) {
        return Object.assign(Object.assign({}, doc), {}, {
          contents: flattenDoc(doc.contents)
        });
      }
      return doc;
    }
    function printDocToDebug(doc) {
      const printedSymbols = /* @__PURE__ */ Object.create(null);
      const usedKeysForSymbols = /* @__PURE__ */ new Set();
      return printDoc(flattenDoc(doc));
      function printDoc(doc2, index, parentParts) {
        if (typeof doc2 === "string") {
          return JSON.stringify(doc2);
        }
        if (isConcat(doc2)) {
          const printed = getDocParts(doc2).map(printDoc).filter(Boolean);
          return printed.length === 1 ? printed[0] : `[${printed.join(", ")}]`;
        }
        if (doc2.type === "line") {
          const withBreakParent = Array.isArray(parentParts) && parentParts[index + 1] && parentParts[index + 1].type === "break-parent";
          if (doc2.literal) {
            return withBreakParent ? "literalline" : "literallineWithoutBreakParent";
          }
          if (doc2.hard) {
            return withBreakParent ? "hardline" : "hardlineWithoutBreakParent";
          }
          if (doc2.soft) {
            return "softline";
          }
          return "line";
        }
        if (doc2.type === "break-parent") {
          const afterHardline = Array.isArray(parentParts) && parentParts[index - 1] && parentParts[index - 1].type === "line" && parentParts[index - 1].hard;
          return afterHardline ? void 0 : "breakParent";
        }
        if (doc2.type === "trim") {
          return "trim";
        }
        if (doc2.type === "indent") {
          return "indent(" + printDoc(doc2.contents) + ")";
        }
        if (doc2.type === "align") {
          return doc2.n === Number.NEGATIVE_INFINITY ? "dedentToRoot(" + printDoc(doc2.contents) + ")" : doc2.n < 0 ? "dedent(" + printDoc(doc2.contents) + ")" : doc2.n.type === "root" ? "markAsRoot(" + printDoc(doc2.contents) + ")" : "align(" + JSON.stringify(doc2.n) + ", " + printDoc(doc2.contents) + ")";
        }
        if (doc2.type === "if-break") {
          return "ifBreak(" + printDoc(doc2.breakContents) + (doc2.flatContents ? ", " + printDoc(doc2.flatContents) : "") + (doc2.groupId ? (!doc2.flatContents ? ', ""' : "") + `, { groupId: ${printGroupId(doc2.groupId)} }` : "") + ")";
        }
        if (doc2.type === "indent-if-break") {
          const optionsParts = [];
          if (doc2.negate) {
            optionsParts.push("negate: true");
          }
          if (doc2.groupId) {
            optionsParts.push(`groupId: ${printGroupId(doc2.groupId)}`);
          }
          const options = optionsParts.length > 0 ? `, { ${optionsParts.join(", ")} }` : "";
          return `indentIfBreak(${printDoc(doc2.contents)}${options})`;
        }
        if (doc2.type === "group") {
          const optionsParts = [];
          if (doc2.break && doc2.break !== "propagated") {
            optionsParts.push("shouldBreak: true");
          }
          if (doc2.id) {
            optionsParts.push(`id: ${printGroupId(doc2.id)}`);
          }
          const options = optionsParts.length > 0 ? `, { ${optionsParts.join(", ")} }` : "";
          if (doc2.expandedStates) {
            return `conditionalGroup([${doc2.expandedStates.map((part) => printDoc(part)).join(",")}]${options})`;
          }
          return `group(${printDoc(doc2.contents)}${options})`;
        }
        if (doc2.type === "fill") {
          return `fill([${doc2.parts.map((part) => printDoc(part)).join(", ")}])`;
        }
        if (doc2.type === "line-suffix") {
          return "lineSuffix(" + printDoc(doc2.contents) + ")";
        }
        if (doc2.type === "line-suffix-boundary") {
          return "lineSuffixBoundary";
        }
        if (doc2.type === "label") {
          return `label(${JSON.stringify(doc2.label)}, ${printDoc(doc2.contents)})`;
        }
        throw new Error("Unknown doc type " + doc2.type);
      }
      function printGroupId(id) {
        if (typeof id !== "symbol") {
          return JSON.stringify(String(id));
        }
        if (id in printedSymbols) {
          return printedSymbols[id];
        }
        const prefix = String(id).slice(7, -1) || "symbol";
        for (let counter = 0; ; counter++) {
          const key = prefix + (counter > 0 ? ` #${counter}` : "");
          if (!usedKeysForSymbols.has(key)) {
            usedKeysForSymbols.add(key);
            return printedSymbols[id] = `Symbol.for(${JSON.stringify(key)})`;
          }
        }
      }
    }
    module.exports = {
      printDocToDebug
    };
  }
});
var require_document = __commonJS2({
  "src/document/index.js"(exports, module) {
    "use strict";
    init_define_process();
    module.exports = {
      builders: require_doc_builders(),
      printer: require_doc_printer(),
      utils: require_doc_utils(),
      debug: require_doc_debug()
    };
  }
});
var escape_string_regexp_exports = {};
__export(escape_string_regexp_exports, {
  default: () => escapeStringRegexp
});
function escapeStringRegexp(string) {
  if (typeof string !== "string") {
    throw new TypeError("Expected a string");
  }
  return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
var init_escape_string_regexp = __esm({
  "node_modules/escape-string-regexp/index.js"() {
    init_define_process();
  }
});
var require_debug = __commonJS2({
  "node_modules/semver/internal/debug.js"(exports, module) {
    init_define_process();
    var debug = typeof define_process_default === "object" && define_process_default.env && define_process_default.env.NODE_DEBUG && /\bsemver\b/i.test(define_process_default.env.NODE_DEBUG) ? function() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return console.error("SEMVER", ...args);
    } : () => {
    };
    module.exports = debug;
  }
});
var require_constants = __commonJS2({
  "node_modules/semver/internal/constants.js"(exports, module) {
    init_define_process();
    var SEMVER_SPEC_VERSION = "2.0.0";
    var MAX_LENGTH = 256;
    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;
    var MAX_SAFE_COMPONENT_LENGTH = 16;
    module.exports = {
      SEMVER_SPEC_VERSION,
      MAX_LENGTH,
      MAX_SAFE_INTEGER,
      MAX_SAFE_COMPONENT_LENGTH
    };
  }
});
var require_re = __commonJS2({
  "node_modules/semver/internal/re.js"(exports, module) {
    init_define_process();
    var {
      MAX_SAFE_COMPONENT_LENGTH
    } = require_constants();
    var debug = require_debug();
    exports = module.exports = {};
    var re = exports.re = [];
    var src = exports.src = [];
    var t = exports.t = {};
    var R = 0;
    var createToken = (name, value, isGlobal) => {
      const index = R++;
      debug(name, index, value);
      t[name] = index;
      src[index] = value;
      re[index] = new RegExp(value, isGlobal ? "g" : void 0);
    };
    createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    createToken("NUMERICIDENTIFIERLOOSE", "[0-9]+");
    createToken("NONNUMERICIDENTIFIER", "\\d*[a-zA-Z-][a-zA-Z0-9-]*");
    createToken("MAINVERSION", `(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})`);
    createToken("MAINVERSIONLOOSE", `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASEIDENTIFIER", `(?:${src[t.NUMERICIDENTIFIER]}|${src[t.NONNUMERICIDENTIFIER]})`);
    createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t.NUMERICIDENTIFIERLOOSE]}|${src[t.NONNUMERICIDENTIFIER]})`);
    createToken("PRERELEASE", `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
    createToken("PRERELEASELOOSE", `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);
    createToken("BUILDIDENTIFIER", "[0-9A-Za-z-]+");
    createToken("BUILD", `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);
    createToken("FULLPLAIN", `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`);
    createToken("FULL", `^${src[t.FULLPLAIN]}$`);
    createToken("LOOSEPLAIN", `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`);
    createToken("LOOSE", `^${src[t.LOOSEPLAIN]}$`);
    createToken("GTLT", "((?:<|>)?=?)");
    createToken("XRANGEIDENTIFIERLOOSE", `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
    createToken("XRANGEIDENTIFIER", `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
    createToken("XRANGEPLAIN", `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
    createToken("XRANGELOOSE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COERCE", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:$|[^\\d])`);
    createToken("COERCERTL", src[t.COERCE], true);
    createToken("LONETILDE", "(?:~>?)");
    createToken("TILDETRIM", `(\\s*)${src[t.LONETILDE]}\\s+`, true);
    exports.tildeTrimReplace = "$1~";
    createToken("TILDE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
    createToken("TILDELOOSE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("LONECARET", "(?:\\^)");
    createToken("CARETTRIM", `(\\s*)${src[t.LONECARET]}\\s+`, true);
    exports.caretTrimReplace = "$1^";
    createToken("CARET", `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
    createToken("CARETLOOSE", `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COMPARATORLOOSE", `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
    createToken("COMPARATOR", `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);
    createToken("COMPARATORTRIM", `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
    exports.comparatorTrimReplace = "$1$2$3";
    createToken("HYPHENRANGE", `^\\s*(${src[t.XRANGEPLAIN]})\\s+-\\s+(${src[t.XRANGEPLAIN]})\\s*$`);
    createToken("HYPHENRANGELOOSE", `^\\s*(${src[t.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t.XRANGEPLAINLOOSE]})\\s*$`);
    createToken("STAR", "(<|>)?=?\\s*\\*");
    createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
    createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  }
});
var require_parse_options = __commonJS2({
  "node_modules/semver/internal/parse-options.js"(exports, module) {
    init_define_process();
    var opts = ["includePrerelease", "loose", "rtl"];
    var parseOptions = (options) => !options ? {} : typeof options !== "object" ? {
      loose: true
    } : opts.filter((k) => options[k]).reduce((o, k) => {
      o[k] = true;
      return o;
    }, {});
    module.exports = parseOptions;
  }
});
var require_identifiers = __commonJS2({
  "node_modules/semver/internal/identifiers.js"(exports, module) {
    init_define_process();
    var numeric = /^[0-9]+$/;
    var compareIdentifiers = (a, b) => {
      const anum = numeric.test(a);
      const bnum = numeric.test(b);
      if (anum && bnum) {
        a = +a;
        b = +b;
      }
      return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
    };
    var rcompareIdentifiers = (a, b) => compareIdentifiers(b, a);
    module.exports = {
      compareIdentifiers,
      rcompareIdentifiers
    };
  }
});
var require_semver = __commonJS2({
  "node_modules/semver/classes/semver.js"(exports, module) {
    init_define_process();
    var debug = require_debug();
    var {
      MAX_LENGTH,
      MAX_SAFE_INTEGER
    } = require_constants();
    var {
      re,
      t
    } = require_re();
    var parseOptions = require_parse_options();
    var {
      compareIdentifiers
    } = require_identifiers();
    var SemVer = class {
      constructor(version, options) {
        options = parseOptions(options);
        if (version instanceof SemVer) {
          if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
            return version;
          } else {
            version = version.version;
          }
        } else if (typeof version !== "string") {
          throw new TypeError(`Invalid Version: ${version}`);
        }
        if (version.length > MAX_LENGTH) {
          throw new TypeError(`version is longer than ${MAX_LENGTH} characters`);
        }
        debug("SemVer", version, options);
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
        if (!m) {
          throw new TypeError(`Invalid Version: ${version}`);
        }
        this.raw = version;
        this.major = +m[1];
        this.minor = +m[2];
        this.patch = +m[3];
        if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
          throw new TypeError("Invalid major version");
        }
        if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
          throw new TypeError("Invalid minor version");
        }
        if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
          throw new TypeError("Invalid patch version");
        }
        if (!m[4]) {
          this.prerelease = [];
        } else {
          this.prerelease = m[4].split(".").map((id) => {
            if (/^[0-9]+$/.test(id)) {
              const num = +id;
              if (num >= 0 && num < MAX_SAFE_INTEGER) {
                return num;
              }
            }
            return id;
          });
        }
        this.build = m[5] ? m[5].split(".") : [];
        this.format();
      }
      format() {
        this.version = `${this.major}.${this.minor}.${this.patch}`;
        if (this.prerelease.length) {
          this.version += `-${this.prerelease.join(".")}`;
        }
        return this.version;
      }
      toString() {
        return this.version;
      }
      compare(other) {
        debug("SemVer.compare", this.version, this.options, other);
        if (!(other instanceof SemVer)) {
          if (typeof other === "string" && other === this.version) {
            return 0;
          }
          other = new SemVer(other, this.options);
        }
        if (other.version === this.version) {
          return 0;
        }
        return this.compareMain(other) || this.comparePre(other);
      }
      compareMain(other) {
        if (!(other instanceof SemVer)) {
          other = new SemVer(other, this.options);
        }
        return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
      }
      comparePre(other) {
        if (!(other instanceof SemVer)) {
          other = new SemVer(other, this.options);
        }
        if (this.prerelease.length && !other.prerelease.length) {
          return -1;
        } else if (!this.prerelease.length && other.prerelease.length) {
          return 1;
        } else if (!this.prerelease.length && !other.prerelease.length) {
          return 0;
        }
        let i = 0;
        do {
          const a = this.prerelease[i];
          const b = other.prerelease[i];
          debug("prerelease compare", i, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }
      compareBuild(other) {
        if (!(other instanceof SemVer)) {
          other = new SemVer(other, this.options);
        }
        let i = 0;
        do {
          const a = this.build[i];
          const b = other.build[i];
          debug("prerelease compare", i, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }
      inc(release2, identifier) {
        switch (release2) {
          case "premajor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor = 0;
            this.major++;
            this.inc("pre", identifier);
            break;
          case "preminor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor++;
            this.inc("pre", identifier);
            break;
          case "prepatch":
            this.prerelease.length = 0;
            this.inc("patch", identifier);
            this.inc("pre", identifier);
            break;
          case "prerelease":
            if (this.prerelease.length === 0) {
              this.inc("patch", identifier);
            }
            this.inc("pre", identifier);
            break;
          case "major":
            if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
              this.major++;
            }
            this.minor = 0;
            this.patch = 0;
            this.prerelease = [];
            break;
          case "minor":
            if (this.patch !== 0 || this.prerelease.length === 0) {
              this.minor++;
            }
            this.patch = 0;
            this.prerelease = [];
            break;
          case "patch":
            if (this.prerelease.length === 0) {
              this.patch++;
            }
            this.prerelease = [];
            break;
          case "pre":
            if (this.prerelease.length === 0) {
              this.prerelease = [0];
            } else {
              let i = this.prerelease.length;
              while (--i >= 0) {
                if (typeof this.prerelease[i] === "number") {
                  this.prerelease[i]++;
                  i = -2;
                }
              }
              if (i === -1) {
                this.prerelease.push(0);
              }
            }
            if (identifier) {
              if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
                if (isNaN(this.prerelease[1])) {
                  this.prerelease = [identifier, 0];
                }
              } else {
                this.prerelease = [identifier, 0];
              }
            }
            break;
          default:
            throw new Error(`invalid increment argument: ${release2}`);
        }
        this.format();
        this.raw = this.version;
        return this;
      }
    };
    module.exports = SemVer;
  }
});
var require_compare = __commonJS2({
  "node_modules/semver/functions/compare.js"(exports, module) {
    init_define_process();
    var SemVer = require_semver();
    var compare = (a, b, loose) => new SemVer(a, loose).compare(new SemVer(b, loose));
    module.exports = compare;
  }
});
var require_lt = __commonJS2({
  "node_modules/semver/functions/lt.js"(exports, module) {
    init_define_process();
    var compare = require_compare();
    var lt = (a, b, loose) => compare(a, b, loose) < 0;
    module.exports = lt;
  }
});
var require_gte = __commonJS2({
  "node_modules/semver/functions/gte.js"(exports, module) {
    init_define_process();
    var compare = require_compare();
    var gte = (a, b, loose) => compare(a, b, loose) >= 0;
    module.exports = gte;
  }
});
var require_arrayify = __commonJS2({
  "src/utils/arrayify.js"(exports, module) {
    "use strict";
    init_define_process();
    module.exports = (object, keyName) => Object.entries(object).map((_ref) => {
      let [key, value] = _ref;
      return Object.assign({
        [keyName]: key
      }, value);
    });
  }
});
var require_lib = __commonJS2({
  "node_modules/outdent/lib/index.js"(exports, module) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.outdent = void 0;
    function noop() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
    }
    function createWeakMap() {
      if (typeof WeakMap !== "undefined") {
        return /* @__PURE__ */ new WeakMap();
      } else {
        return fakeSetOrMap();
      }
    }
    function fakeSetOrMap() {
      return {
        add: noop,
        delete: noop,
        get: noop,
        set: noop,
        has: function(k) {
          return false;
        }
      };
    }
    var hop = Object.prototype.hasOwnProperty;
    var has = function(obj, prop) {
      return hop.call(obj, prop);
    };
    function extend(target, source) {
      for (var prop in source) {
        if (has(source, prop)) {
          target[prop] = source[prop];
        }
      }
      return target;
    }
    var reLeadingNewline = /^[ \t]*(?:\r\n|\r|\n)/;
    var reTrailingNewline = /(?:\r\n|\r|\n)[ \t]*$/;
    var reStartsWithNewlineOrIsEmpty = /^(?:[\r\n]|$)/;
    var reDetectIndentation = /(?:\r\n|\r|\n)([ \t]*)(?:[^ \t\r\n]|$)/;
    var reOnlyWhitespaceWithAtLeastOneNewline = /^[ \t]*[\r\n][ \t\r\n]*$/;
    function _outdentArray(strings, firstInterpolatedValueSetsIndentationLevel, options) {
      var indentationLevel = 0;
      var match = strings[0].match(reDetectIndentation);
      if (match) {
        indentationLevel = match[1].length;
      }
      var reSource = "(\\r\\n|\\r|\\n).{0," + indentationLevel + "}";
      var reMatchIndent = new RegExp(reSource, "g");
      if (firstInterpolatedValueSetsIndentationLevel) {
        strings = strings.slice(1);
      }
      var newline = options.newline, trimLeadingNewline = options.trimLeadingNewline, trimTrailingNewline = options.trimTrailingNewline;
      var normalizeNewlines = typeof newline === "string";
      var l = strings.length;
      var outdentedStrings = strings.map(function(v, i) {
        v = v.replace(reMatchIndent, "$1");
        if (i === 0 && trimLeadingNewline) {
          v = v.replace(reLeadingNewline, "");
        }
        if (i === l - 1 && trimTrailingNewline) {
          v = v.replace(reTrailingNewline, "");
        }
        if (normalizeNewlines) {
          v = v.replace(/\r\n|\n|\r/g, function(_) {
            return newline;
          });
        }
        return v;
      });
      return outdentedStrings;
    }
    function concatStringsAndValues(strings, values) {
      var ret = "";
      for (var i = 0, l = strings.length; i < l; i++) {
        ret += strings[i];
        if (i < l - 1) {
          ret += values[i];
        }
      }
      return ret;
    }
    function isTemplateStringsArray(v) {
      return has(v, "raw") && has(v, "length");
    }
    function createInstance(options) {
      var arrayAutoIndentCache = createWeakMap();
      var arrayFirstInterpSetsIndentCache = createWeakMap();
      function outdent(stringsOrOptions) {
        var values = [];
        for (var _i = 1; _i < arguments.length; _i++) {
          values[_i - 1] = arguments[_i];
        }
        if (isTemplateStringsArray(stringsOrOptions)) {
          var strings = stringsOrOptions;
          var firstInterpolatedValueSetsIndentationLevel = (values[0] === outdent || values[0] === defaultOutdent) && reOnlyWhitespaceWithAtLeastOneNewline.test(strings[0]) && reStartsWithNewlineOrIsEmpty.test(strings[1]);
          var cache = firstInterpolatedValueSetsIndentationLevel ? arrayFirstInterpSetsIndentCache : arrayAutoIndentCache;
          var renderedArray = cache.get(strings);
          if (!renderedArray) {
            renderedArray = _outdentArray(strings, firstInterpolatedValueSetsIndentationLevel, options);
            cache.set(strings, renderedArray);
          }
          if (values.length === 0) {
            return renderedArray[0];
          }
          var rendered = concatStringsAndValues(renderedArray, firstInterpolatedValueSetsIndentationLevel ? values.slice(1) : values);
          return rendered;
        } else {
          return createInstance(extend(extend({}, options), stringsOrOptions || {}));
        }
      }
      var fullOutdent = extend(outdent, {
        string: function(str) {
          return _outdentArray([str], false, options)[0];
        }
      });
      return fullOutdent;
    }
    var defaultOutdent = createInstance({
      trimLeadingNewline: true,
      trimTrailingNewline: true
    });
    exports.outdent = defaultOutdent;
    exports.default = defaultOutdent;
    if (typeof module !== "undefined") {
      try {
        module.exports = defaultOutdent;
        Object.defineProperty(defaultOutdent, "__esModule", {
          value: true
        });
        defaultOutdent.default = defaultOutdent;
        defaultOutdent.outdent = defaultOutdent;
      } catch (e) {
      }
    }
  }
});
var require_core_options = __commonJS2({
  "src/main/core-options.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      outdent
    } = require_lib();
    var CATEGORY_CONFIG = "Config";
    var CATEGORY_EDITOR = "Editor";
    var CATEGORY_FORMAT = "Format";
    var CATEGORY_OTHER = "Other";
    var CATEGORY_OUTPUT = "Output";
    var CATEGORY_GLOBAL = "Global";
    var CATEGORY_SPECIAL = "Special";
    var options = {
      cursorOffset: {
        since: "1.4.0",
        category: CATEGORY_SPECIAL,
        type: "int",
        default: -1,
        range: {
          start: -1,
          end: Number.POSITIVE_INFINITY,
          step: 1
        },
        description: outdent`
      Print (to stderr) where a cursor at the given position would move to after formatting.
      This option cannot be used with --range-start and --range-end.
    `,
        cliCategory: CATEGORY_EDITOR
      },
      endOfLine: {
        since: "1.15.0",
        category: CATEGORY_GLOBAL,
        type: "choice",
        default: [{
          since: "1.15.0",
          value: "auto"
        }, {
          since: "2.0.0",
          value: "lf"
        }],
        description: "Which end of line characters to apply.",
        choices: [{
          value: "lf",
          description: "Line Feed only (\\n), common on Linux and macOS as well as inside git repos"
        }, {
          value: "crlf",
          description: "Carriage Return + Line Feed characters (\\r\\n), common on Windows"
        }, {
          value: "cr",
          description: "Carriage Return character only (\\r), used very rarely"
        }, {
          value: "auto",
          description: outdent`
          Maintain existing
          (mixed values within one file are normalised by looking at what's used after the first line)
        `
        }]
      },
      filepath: {
        since: "1.4.0",
        category: CATEGORY_SPECIAL,
        type: "path",
        description: "Specify the input filepath. This will be used to do parser inference.",
        cliName: "stdin-filepath",
        cliCategory: CATEGORY_OTHER,
        cliDescription: "Path to the file to pretend that stdin comes from."
      },
      insertPragma: {
        since: "1.8.0",
        category: CATEGORY_SPECIAL,
        type: "boolean",
        default: false,
        description: "Insert @format pragma into file's first docblock comment.",
        cliCategory: CATEGORY_OTHER
      },
      parser: {
        since: "0.0.10",
        category: CATEGORY_GLOBAL,
        type: "choice",
        default: [{
          since: "0.0.10",
          value: "babylon"
        }, {
          since: "1.13.0",
          value: void 0
        }],
        description: "Which parser to use.",
        exception: (value) => typeof value === "string" || typeof value === "function",
        choices: [{
          value: "flow",
          description: "Flow"
        }, {
          value: "babel",
          since: "1.16.0",
          description: "JavaScript"
        }, {
          value: "babel-flow",
          since: "1.16.0",
          description: "Flow"
        }, {
          value: "babel-ts",
          since: "2.0.0",
          description: "TypeScript"
        }, {
          value: "typescript",
          since: "1.4.0",
          description: "TypeScript"
        }, {
          value: "acorn",
          since: "2.6.0",
          description: "JavaScript"
        }, {
          value: "espree",
          since: "2.2.0",
          description: "JavaScript"
        }, {
          value: "meriyah",
          since: "2.2.0",
          description: "JavaScript"
        }, {
          value: "css",
          since: "1.7.1",
          description: "CSS"
        }, {
          value: "less",
          since: "1.7.1",
          description: "Less"
        }, {
          value: "scss",
          since: "1.7.1",
          description: "SCSS"
        }, {
          value: "json",
          since: "1.5.0",
          description: "JSON"
        }, {
          value: "json5",
          since: "1.13.0",
          description: "JSON5"
        }, {
          value: "json-stringify",
          since: "1.13.0",
          description: "JSON.stringify"
        }, {
          value: "graphql",
          since: "1.5.0",
          description: "GraphQL"
        }, {
          value: "markdown",
          since: "1.8.0",
          description: "Markdown"
        }, {
          value: "mdx",
          since: "1.15.0",
          description: "MDX"
        }, {
          value: "vue",
          since: "1.10.0",
          description: "Vue"
        }, {
          value: "yaml",
          since: "1.14.0",
          description: "YAML"
        }, {
          value: "glimmer",
          since: "2.3.0",
          description: "Ember / Handlebars"
        }, {
          value: "html",
          since: "1.15.0",
          description: "HTML"
        }, {
          value: "angular",
          since: "1.15.0",
          description: "Angular"
        }, {
          value: "lwc",
          since: "1.17.0",
          description: "Lightning Web Components"
        }]
      },
      plugins: {
        since: "1.10.0",
        type: "path",
        array: true,
        default: [{
          value: []
        }],
        category: CATEGORY_GLOBAL,
        description: "Add a plugin. Multiple plugins can be passed as separate `--plugin`s.",
        exception: (value) => typeof value === "string" || typeof value === "object",
        cliName: "plugin",
        cliCategory: CATEGORY_CONFIG
      },
      pluginSearchDirs: {
        since: "1.13.0",
        type: "path",
        array: true,
        default: [{
          value: []
        }],
        category: CATEGORY_GLOBAL,
        description: outdent`
      Custom directory that contains prettier plugins in node_modules subdirectory.
      Overrides default behavior when plugins are searched relatively to the location of Prettier.
      Multiple values are accepted.
    `,
        exception: (value) => typeof value === "string" || typeof value === "object",
        cliName: "plugin-search-dir",
        cliCategory: CATEGORY_CONFIG
      },
      printWidth: {
        since: "0.0.0",
        category: CATEGORY_GLOBAL,
        type: "int",
        default: 80,
        description: "The line length where Prettier will try wrap.",
        range: {
          start: 0,
          end: Number.POSITIVE_INFINITY,
          step: 1
        }
      },
      rangeEnd: {
        since: "1.4.0",
        category: CATEGORY_SPECIAL,
        type: "int",
        default: Number.POSITIVE_INFINITY,
        range: {
          start: 0,
          end: Number.POSITIVE_INFINITY,
          step: 1
        },
        description: outdent`
      Format code ending at a given character offset (exclusive).
      The range will extend forwards to the end of the selected statement.
      This option cannot be used with --cursor-offset.
    `,
        cliCategory: CATEGORY_EDITOR
      },
      rangeStart: {
        since: "1.4.0",
        category: CATEGORY_SPECIAL,
        type: "int",
        default: 0,
        range: {
          start: 0,
          end: Number.POSITIVE_INFINITY,
          step: 1
        },
        description: outdent`
      Format code starting at a given character offset.
      The range will extend backwards to the start of the first line containing the selected statement.
      This option cannot be used with --cursor-offset.
    `,
        cliCategory: CATEGORY_EDITOR
      },
      requirePragma: {
        since: "1.7.0",
        category: CATEGORY_SPECIAL,
        type: "boolean",
        default: false,
        description: outdent`
      Require either '@prettier' or '@format' to be present in the file's first docblock comment
      in order for it to be formatted.
    `,
        cliCategory: CATEGORY_OTHER
      },
      tabWidth: {
        type: "int",
        category: CATEGORY_GLOBAL,
        default: 2,
        description: "Number of spaces per indentation level.",
        range: {
          start: 0,
          end: Number.POSITIVE_INFINITY,
          step: 1
        }
      },
      useTabs: {
        since: "1.0.0",
        category: CATEGORY_GLOBAL,
        type: "boolean",
        default: false,
        description: "Indent with tabs instead of spaces."
      },
      embeddedLanguageFormatting: {
        since: "2.1.0",
        category: CATEGORY_GLOBAL,
        type: "choice",
        default: [{
          since: "2.1.0",
          value: "auto"
        }],
        description: "Control how Prettier formats quoted code embedded in the file.",
        choices: [{
          value: "auto",
          description: "Format embedded code if Prettier can automatically identify it."
        }, {
          value: "off",
          description: "Never automatically format embedded code."
        }]
      }
    };
    module.exports = {
      CATEGORY_CONFIG,
      CATEGORY_EDITOR,
      CATEGORY_FORMAT,
      CATEGORY_OTHER,
      CATEGORY_OUTPUT,
      CATEGORY_GLOBAL,
      CATEGORY_SPECIAL,
      options
    };
  }
});
var require_support = __commonJS2({
  "src/main/support.js"(exports, module) {
    "use strict";
    init_define_process();
    var semver = {
      compare: require_compare(),
      lt: require_lt(),
      gte: require_gte()
    };
    var arrayify = require_arrayify();
    var currentVersion = require_package().version;
    var coreOptions = require_core_options().options;
    function getSupportInfo() {
      let {
        plugins = [],
        showUnreleased = false,
        showDeprecated = false,
        showInternal = false
      } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      const version = currentVersion.split("-", 1)[0];
      const languages = plugins.flatMap((plugin) => plugin.languages || []).filter(filterSince);
      const options = arrayify(Object.assign({}, ...plugins.map((_ref2) => {
        let {
          options: options2
        } = _ref2;
        return options2;
      }), coreOptions), "name").filter((option) => filterSince(option) && filterDeprecated(option)).sort((a, b) => a.name === b.name ? 0 : a.name < b.name ? -1 : 1).map(mapInternal).map((option) => {
        option = Object.assign({}, option);
        if (Array.isArray(option.default)) {
          option.default = option.default.length === 1 ? option.default[0].value : option.default.filter(filterSince).sort((info1, info2) => semver.compare(info2.since, info1.since))[0].value;
        }
        if (Array.isArray(option.choices)) {
          option.choices = option.choices.filter((option2) => filterSince(option2) && filterDeprecated(option2));
          if (option.name === "parser") {
            collectParsersFromLanguages(option, languages, plugins);
          }
        }
        const pluginDefaults = Object.fromEntries(plugins.filter((plugin) => plugin.defaultOptions && plugin.defaultOptions[option.name] !== void 0).map((plugin) => [plugin.name, plugin.defaultOptions[option.name]]));
        return Object.assign(Object.assign({}, option), {}, {
          pluginDefaults
        });
      });
      return {
        languages,
        options
      };
      function filterSince(object) {
        return showUnreleased || !("since" in object) || object.since && semver.gte(version, object.since);
      }
      function filterDeprecated(object) {
        return showDeprecated || !("deprecated" in object) || object.deprecated && semver.lt(version, object.deprecated);
      }
      function mapInternal(object) {
        if (showInternal) {
          return object;
        }
        const {
          cliName,
          cliCategory,
          cliDescription
        } = object, newObject = _objectWithoutProperties(object, _excluded);
        return newObject;
      }
    }
    function collectParsersFromLanguages(option, languages, plugins) {
      const existingValues = new Set(option.choices.map((choice) => choice.value));
      for (const language of languages) {
        if (language.parsers) {
          for (const value of language.parsers) {
            if (!existingValues.has(value)) {
              existingValues.add(value);
              const plugin = plugins.find((plugin2) => plugin2.parsers && plugin2.parsers[value]);
              let description = language.name;
              if (plugin && plugin.name) {
                description += ` (plugin: ${plugin.name})`;
              }
              option.choices.push({
                value,
                description
              });
            }
          }
        }
      }
    }
    module.exports = {
      getSupportInfo
    };
  }
});
var require_is_non_empty_array = __commonJS2({
  "src/utils/is-non-empty-array.js"(exports, module) {
    "use strict";
    init_define_process();
    function isNonEmptyArray(object) {
      return Array.isArray(object) && object.length > 0;
    }
    module.exports = isNonEmptyArray;
  }
});
var require_skip = __commonJS2({
  "src/utils/text/skip.js"(exports, module) {
    "use strict";
    init_define_process();
    function skip(chars) {
      return (text, index, opts) => {
        const backwards = opts && opts.backwards;
        if (index === false) {
          return false;
        }
        const {
          length
        } = text;
        let cursor = index;
        while (cursor >= 0 && cursor < length) {
          const c = text.charAt(cursor);
          if (chars instanceof RegExp) {
            if (!chars.test(c)) {
              return cursor;
            }
          } else if (!chars.includes(c)) {
            return cursor;
          }
          backwards ? cursor-- : cursor++;
        }
        if (cursor === -1 || cursor === length) {
          return cursor;
        }
        return false;
      };
    }
    var skipWhitespace = skip(/\s/);
    var skipSpaces = skip(" 	");
    var skipToLineEnd = skip(",; 	");
    var skipEverythingButNewLine = skip(/[^\n\r]/);
    module.exports = {
      skipWhitespace,
      skipSpaces,
      skipToLineEnd,
      skipEverythingButNewLine
    };
  }
});
var require_skip_inline_comment = __commonJS2({
  "src/utils/text/skip-inline-comment.js"(exports, module) {
    "use strict";
    init_define_process();
    function skipInlineComment(text, index) {
      if (index === false) {
        return false;
      }
      if (text.charAt(index) === "/" && text.charAt(index + 1) === "*") {
        for (let i = index + 2; i < text.length; ++i) {
          if (text.charAt(i) === "*" && text.charAt(i + 1) === "/") {
            return i + 2;
          }
        }
      }
      return index;
    }
    module.exports = skipInlineComment;
  }
});
var require_skip_trailing_comment = __commonJS2({
  "src/utils/text/skip-trailing-comment.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      skipEverythingButNewLine
    } = require_skip();
    function skipTrailingComment(text, index) {
      if (index === false) {
        return false;
      }
      if (text.charAt(index) === "/" && text.charAt(index + 1) === "/") {
        return skipEverythingButNewLine(text, index);
      }
      return index;
    }
    module.exports = skipTrailingComment;
  }
});
var require_skip_newline = __commonJS2({
  "src/utils/text/skip-newline.js"(exports, module) {
    "use strict";
    init_define_process();
    function skipNewline(text, index, opts) {
      const backwards = opts && opts.backwards;
      if (index === false) {
        return false;
      }
      const atIndex = text.charAt(index);
      if (backwards) {
        if (text.charAt(index - 1) === "\r" && atIndex === "\n") {
          return index - 2;
        }
        if (atIndex === "\n" || atIndex === "\r" || atIndex === "\u2028" || atIndex === "\u2029") {
          return index - 1;
        }
      } else {
        if (atIndex === "\r" && text.charAt(index + 1) === "\n") {
          return index + 2;
        }
        if (atIndex === "\n" || atIndex === "\r" || atIndex === "\u2028" || atIndex === "\u2029") {
          return index + 1;
        }
      }
      return index;
    }
    module.exports = skipNewline;
  }
});
var require_get_next_non_space_non_comment_character_index_with_start_index = __commonJS2({
  "src/utils/text/get-next-non-space-non-comment-character-index-with-start-index.js"(exports, module) {
    "use strict";
    init_define_process();
    var skipInlineComment = require_skip_inline_comment();
    var skipNewline = require_skip_newline();
    var skipTrailingComment = require_skip_trailing_comment();
    var {
      skipSpaces
    } = require_skip();
    function getNextNonSpaceNonCommentCharacterIndexWithStartIndex(text, idx) {
      let oldIdx = null;
      let nextIdx = idx;
      while (nextIdx !== oldIdx) {
        oldIdx = nextIdx;
        nextIdx = skipSpaces(text, nextIdx);
        nextIdx = skipInlineComment(text, nextIdx);
        nextIdx = skipTrailingComment(text, nextIdx);
        nextIdx = skipNewline(text, nextIdx);
      }
      return nextIdx;
    }
    module.exports = getNextNonSpaceNonCommentCharacterIndexWithStartIndex;
  }
});
var require_util = __commonJS2({
  "src/common/util.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      default: escapeStringRegexp2
    } = (init_escape_string_regexp(), __toCommonJS(escape_string_regexp_exports));
    var getLast = require_get_last();
    var {
      getSupportInfo
    } = require_support();
    var isNonEmptyArray = require_is_non_empty_array();
    var getStringWidth = require_get_string_width();
    var {
      skipWhitespace,
      skipSpaces,
      skipToLineEnd,
      skipEverythingButNewLine
    } = require_skip();
    var skipInlineComment = require_skip_inline_comment();
    var skipTrailingComment = require_skip_trailing_comment();
    var skipNewline = require_skip_newline();
    var getNextNonSpaceNonCommentCharacterIndexWithStartIndex = require_get_next_non_space_non_comment_character_index_with_start_index();
    var getPenultimate = (arr) => arr[arr.length - 2];
    function skip(chars) {
      return (text, index, opts) => {
        const backwards = opts && opts.backwards;
        if (index === false) {
          return false;
        }
        const {
          length
        } = text;
        let cursor = index;
        while (cursor >= 0 && cursor < length) {
          const c = text.charAt(cursor);
          if (chars instanceof RegExp) {
            if (!chars.test(c)) {
              return cursor;
            }
          } else if (!chars.includes(c)) {
            return cursor;
          }
          backwards ? cursor-- : cursor++;
        }
        if (cursor === -1 || cursor === length) {
          return cursor;
        }
        return false;
      };
    }
    function hasNewline(text, index) {
      let opts = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      const idx = skipSpaces(text, opts.backwards ? index - 1 : index, opts);
      const idx2 = skipNewline(text, idx, opts);
      return idx !== idx2;
    }
    function hasNewlineInRange(text, start, end) {
      for (let i = start; i < end; ++i) {
        if (text.charAt(i) === "\n") {
          return true;
        }
      }
      return false;
    }
    function isPreviousLineEmpty(text, node, locStart) {
      let idx = locStart(node) - 1;
      idx = skipSpaces(text, idx, {
        backwards: true
      });
      idx = skipNewline(text, idx, {
        backwards: true
      });
      idx = skipSpaces(text, idx, {
        backwards: true
      });
      const idx2 = skipNewline(text, idx, {
        backwards: true
      });
      return idx !== idx2;
    }
    function isNextLineEmptyAfterIndex(text, index) {
      let oldIdx = null;
      let idx = index;
      while (idx !== oldIdx) {
        oldIdx = idx;
        idx = skipToLineEnd(text, idx);
        idx = skipInlineComment(text, idx);
        idx = skipSpaces(text, idx);
      }
      idx = skipTrailingComment(text, idx);
      idx = skipNewline(text, idx);
      return idx !== false && hasNewline(text, idx);
    }
    function isNextLineEmpty(text, node, locEnd) {
      return isNextLineEmptyAfterIndex(text, locEnd(node));
    }
    function getNextNonSpaceNonCommentCharacterIndex(text, node, locEnd) {
      return getNextNonSpaceNonCommentCharacterIndexWithStartIndex(text, locEnd(node));
    }
    function getNextNonSpaceNonCommentCharacter(text, node, locEnd) {
      return text.charAt(getNextNonSpaceNonCommentCharacterIndex(text, node, locEnd));
    }
    function hasSpaces(text, index) {
      let opts = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      const idx = skipSpaces(text, opts.backwards ? index - 1 : index, opts);
      return idx !== index;
    }
    function getAlignmentSize(value, tabWidth) {
      let startIndex = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
      let size = 0;
      for (let i = startIndex; i < value.length; ++i) {
        if (value[i] === "	") {
          size = size + tabWidth - size % tabWidth;
        } else {
          size++;
        }
      }
      return size;
    }
    function getIndentSize(value, tabWidth) {
      const lastNewlineIndex = value.lastIndexOf("\n");
      if (lastNewlineIndex === -1) {
        return 0;
      }
      return getAlignmentSize(value.slice(lastNewlineIndex + 1).match(/^[\t ]*/)[0], tabWidth);
    }
    function getPreferredQuote(rawContent, preferredQuote) {
      const double = {
        quote: '"',
        regex: /"/g,
        escaped: "&quot;"
      };
      const single = {
        quote: "'",
        regex: /'/g,
        escaped: "&apos;"
      };
      const preferred = preferredQuote === "'" ? single : double;
      const alternate = preferred === single ? double : single;
      let result = preferred;
      if (rawContent.includes(preferred.quote) || rawContent.includes(alternate.quote)) {
        const numPreferredQuotes = (rawContent.match(preferred.regex) || []).length;
        const numAlternateQuotes = (rawContent.match(alternate.regex) || []).length;
        result = numPreferredQuotes > numAlternateQuotes ? alternate : preferred;
      }
      return result;
    }
    function printString(raw, options) {
      const rawContent = raw.slice(1, -1);
      const enclosingQuote = options.parser === "json" || options.parser === "json5" && options.quoteProps === "preserve" && !options.singleQuote ? '"' : options.__isInHtmlAttribute ? "'" : getPreferredQuote(rawContent, options.singleQuote ? "'" : '"').quote;
      return makeString(rawContent, enclosingQuote, !(options.parser === "css" || options.parser === "less" || options.parser === "scss" || options.__embeddedInHtml));
    }
    function makeString(rawContent, enclosingQuote, unescapeUnnecessaryEscapes) {
      const otherQuote = enclosingQuote === '"' ? "'" : '"';
      const regex = /\\(.)|(["'])/gs;
      const newContent = rawContent.replace(regex, (match, escaped, quote) => {
        if (escaped === otherQuote) {
          return escaped;
        }
        if (quote === enclosingQuote) {
          return "\\" + quote;
        }
        if (quote) {
          return quote;
        }
        return unescapeUnnecessaryEscapes && /^[^\n\r"'0-7\\bfnrt-vx\u2028\u2029]$/.test(escaped) ? escaped : "\\" + escaped;
      });
      return enclosingQuote + newContent + enclosingQuote;
    }
    function printNumber(rawNumber) {
      return rawNumber.toLowerCase().replace(/^([+-]?[\d.]+e)(?:\+|(-))?0*(\d)/, "$1$2$3").replace(/^([+-]?[\d.]+)e[+-]?0+$/, "$1").replace(/^([+-])?\./, "$10.").replace(/(\.\d+?)0+(?=e|$)/, "$1").replace(/\.(?=e|$)/, "");
    }
    function getMaxContinuousCount(str, target) {
      const results = str.match(new RegExp(`(${escapeStringRegexp2(target)})+`, "g"));
      if (results === null) {
        return 0;
      }
      return results.reduce((maxCount, result) => Math.max(maxCount, result.length / target.length), 0);
    }
    function getMinNotPresentContinuousCount(str, target) {
      const matches = str.match(new RegExp(`(${escapeStringRegexp2(target)})+`, "g"));
      if (matches === null) {
        return 0;
      }
      const countPresent = /* @__PURE__ */ new Map();
      let max = 0;
      for (const match of matches) {
        const count = match.length / target.length;
        countPresent.set(count, true);
        if (count > max) {
          max = count;
        }
      }
      for (let i = 1; i < max; i++) {
        if (!countPresent.get(i)) {
          return i;
        }
      }
      return max + 1;
    }
    function addCommentHelper(node, comment) {
      const comments = node.comments || (node.comments = []);
      comments.push(comment);
      comment.printed = false;
      comment.nodeDescription = describeNodeForDebugging(node);
    }
    function addLeadingComment(node, comment) {
      comment.leading = true;
      comment.trailing = false;
      addCommentHelper(node, comment);
    }
    function addDanglingComment(node, comment, marker) {
      comment.leading = false;
      comment.trailing = false;
      if (marker) {
        comment.marker = marker;
      }
      addCommentHelper(node, comment);
    }
    function addTrailingComment(node, comment) {
      comment.leading = false;
      comment.trailing = true;
      addCommentHelper(node, comment);
    }
    function inferParserByLanguage(language, options) {
      const {
        languages
      } = getSupportInfo({
        plugins: options.plugins
      });
      const matched = languages.find((_ref3) => {
        let {
          name
        } = _ref3;
        return name.toLowerCase() === language;
      }) || languages.find((_ref4) => {
        let {
          aliases
        } = _ref4;
        return Array.isArray(aliases) && aliases.includes(language);
      }) || languages.find((_ref5) => {
        let {
          extensions
        } = _ref5;
        return Array.isArray(extensions) && extensions.includes(`.${language}`);
      });
      return matched && matched.parsers[0];
    }
    function isFrontMatterNode(node) {
      return node && node.type === "front-matter";
    }
    function createGroupIdMapper(description) {
      const groupIds = /* @__PURE__ */ new WeakMap();
      return function(node) {
        if (!groupIds.has(node)) {
          groupIds.set(node, Symbol(description));
        }
        return groupIds.get(node);
      };
    }
    function describeNodeForDebugging(node) {
      const nodeType = node.type || node.kind || "(unknown type)";
      let nodeName = String(node.name || node.id && (typeof node.id === "object" ? node.id.name : node.id) || node.key && (typeof node.key === "object" ? node.key.name : node.key) || node.value && (typeof node.value === "object" ? "" : String(node.value)) || node.operator || "");
      if (nodeName.length > 20) {
        nodeName = nodeName.slice(0, 19) + "\u2026";
      }
      return nodeType + (nodeName ? " " + nodeName : "");
    }
    module.exports = {
      inferParserByLanguage,
      getStringWidth,
      getMaxContinuousCount,
      getMinNotPresentContinuousCount,
      getPenultimate,
      getLast,
      getNextNonSpaceNonCommentCharacterIndexWithStartIndex,
      getNextNonSpaceNonCommentCharacterIndex,
      getNextNonSpaceNonCommentCharacter,
      skip,
      skipWhitespace,
      skipSpaces,
      skipToLineEnd,
      skipEverythingButNewLine,
      skipInlineComment,
      skipTrailingComment,
      skipNewline,
      isNextLineEmptyAfterIndex,
      isNextLineEmpty,
      isPreviousLineEmpty,
      hasNewline,
      hasNewlineInRange,
      hasSpaces,
      getAlignmentSize,
      getIndentSize,
      getPreferredQuote,
      printString,
      printNumber,
      makeString,
      addLeadingComment,
      addDanglingComment,
      addTrailingComment,
      isFrontMatterNode,
      isNonEmptyArray,
      createGroupIdMapper
    };
  }
});
var path_exports = {};
__export(path_exports, {
  basename: () => basename,
  default: () => path_default,
  delimiter: () => delimiter,
  dirname: () => dirname,
  extname: () => extname,
  isAbsolute: () => isAbsolute,
  join: () => join,
  normalize: () => normalize,
  relative: () => relative,
  resolve: () => resolve,
  sep: () => sep
});
function normalizeArray(parts, allowAboveRoot) {
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === ".") {
      parts.splice(i, 1);
    } else if (last === "..") {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift("..");
    }
  }
  return parts;
}
function resolve() {
  var resolvedPath = "", resolvedAbsolute = false;
  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = i >= 0 ? arguments[i] : "/";
    if (typeof path !== "string") {
      throw new TypeError("Arguments to path.resolve must be strings");
    } else if (!path) {
      continue;
    }
    resolvedPath = path + "/" + resolvedPath;
    resolvedAbsolute = path.charAt(0) === "/";
  }
  resolvedPath = normalizeArray(filter(resolvedPath.split("/"), function(p) {
    return !!p;
  }), !resolvedAbsolute).join("/");
  return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
}
function normalize(path) {
  var isPathAbsolute = isAbsolute(path), trailingSlash = substr(path, -1) === "/";
  path = normalizeArray(filter(path.split("/"), function(p) {
    return !!p;
  }), !isPathAbsolute).join("/");
  if (!path && !isPathAbsolute) {
    path = ".";
  }
  if (path && trailingSlash) {
    path += "/";
  }
  return (isPathAbsolute ? "/" : "") + path;
}
function isAbsolute(path) {
  return path.charAt(0) === "/";
}
function join() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return normalize(filter(paths, function(p, index) {
    if (typeof p !== "string") {
      throw new TypeError("Arguments to path.join must be strings");
    }
    return p;
  }).join("/"));
}
function relative(from, to) {
  from = resolve(from).substr(1);
  to = resolve(to).substr(1);
  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== "")
        break;
    }
    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== "")
        break;
    }
    if (start > end)
      return [];
    return arr.slice(start, end - start + 1);
  }
  var fromParts = trim(from.split("/"));
  var toParts = trim(to.split("/"));
  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }
  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push("..");
  }
  outputParts = outputParts.concat(toParts.slice(samePartsLength));
  return outputParts.join("/");
}
function dirname(path) {
  var result = splitPath(path), root = result[0], dir = result[1];
  if (!root && !dir) {
    return ".";
  }
  if (dir) {
    dir = dir.substr(0, dir.length - 1);
  }
  return root + dir;
}
function basename(path, ext) {
  var f = splitPath(path)[2];
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
}
function extname(path) {
  return splitPath(path)[3];
}
function filter(xs, f) {
  if (xs.filter)
    return xs.filter(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    if (f(xs[i], i, xs))
      res.push(xs[i]);
  }
  return res;
}
var splitPathRe;
var splitPath;
var sep;
var delimiter;
var path_default;
var substr;
var init_path = __esm({
  "node-modules-polyfills:path"() {
    init_define_process();
    splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
    splitPath = function(filename) {
      return splitPathRe.exec(filename).slice(1);
    };
    sep = "/";
    delimiter = ":";
    path_default = {
      extname,
      basename,
      dirname,
      sep,
      delimiter,
      relative,
      join,
      isAbsolute,
      normalize,
      resolve
    };
    substr = "ab".substr(-1) === "b" ? function(str, start, len) {
      return str.substr(start, len);
    } : function(str, start, len) {
      if (start < 0)
        start = str.length + start;
      return str.substr(start, len);
    };
  }
});
var require_path = __commonJS2({
  "node-modules-polyfills-commonjs:path"(exports, module) {
    init_define_process();
    var polyfill = (init_path(), __toCommonJS(path_exports));
    if (polyfill && polyfill.default) {
      module.exports = polyfill.default;
      for (let k in polyfill) {
        module.exports[k] = polyfill[k];
      }
    } else if (polyfill) {
      module.exports = polyfill;
    }
  }
});
var require_errors = __commonJS2({
  "src/common/errors.js"(exports, module) {
    "use strict";
    init_define_process();
    var ConfigError = class extends Error {
    };
    var DebugError = class extends Error {
    };
    var UndefinedParserError = class extends Error {
    };
    var ArgExpansionBailout = class extends Error {
    };
    module.exports = {
      ConfigError,
      DebugError,
      UndefinedParserError,
      ArgExpansionBailout
    };
  }
});
var tslib_es6_exports = {};
__export(tslib_es6_exports, {
  __assign: () => __assign,
  __asyncDelegator: () => __asyncDelegator,
  __asyncGenerator: () => __asyncGenerator,
  __asyncValues: () => __asyncValues,
  __await: () => __await,
  __awaiter: () => __awaiter,
  __classPrivateFieldGet: () => __classPrivateFieldGet,
  __classPrivateFieldSet: () => __classPrivateFieldSet,
  __createBinding: () => __createBinding,
  __decorate: () => __decorate,
  __exportStar: () => __exportStar,
  __extends: () => __extends,
  __generator: () => __generator,
  __importDefault: () => __importDefault,
  __importStar: () => __importStar,
  __makeTemplateObject: () => __makeTemplateObject,
  __metadata: () => __metadata,
  __param: () => __param,
  __read: () => __read,
  __rest: () => __rest,
  __spread: () => __spread,
  __spreadArrays: () => __spreadArrays,
  __values: () => __values
});
function __extends(d, b) {
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
function __rest(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
}
function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve2) {
      resolve2(value);
    });
  }
  return new (P || (P = Promise))(function(resolve2, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = {
    label: 0,
    sent: function() {
      if (t[0] & 1)
        throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  }, f, y, t, g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f)
      throw new TypeError("Generator is already executing.");
    while (_)
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
          return t;
        if (y = 0, t)
          op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2])
              _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
}
function __createBinding(o, m, k, k2) {
  if (k2 === void 0)
    k2 = k;
  o[k2] = m[k];
}
function __exportStar(m, exports) {
  for (var p in m)
    if (p !== "default" && !exports.hasOwnProperty(p))
      exports[p] = m[p];
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m)
    return m.call(o);
  if (o && typeof o.length === "number")
    return {
      next: function() {
        if (o && i >= o.length)
          o = void 0;
        return {
          value: o && o[i++],
          done: !o
        };
      }
    };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m)
    return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
      ar.push(r.value);
  } catch (error) {
    e = {
      error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"]))
        m.call(i);
    } finally {
      if (e)
        throw e.error;
    }
  }
  return ar;
}
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
    ar = ar.concat(__read(arguments[i]));
  return ar;
}
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++)
    s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
      r[k] = a[j];
  return r;
}
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function verb(n) {
    if (g[n])
      i[n] = function(v) {
        return new Promise(function(a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length)
      resume(q[0][0], q[0][1]);
  }
}
function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function(e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function() {
    return this;
  }, i;
  function verb(n, f) {
    i[n] = o[n] ? function(v) {
      return (p = !p) ? {
        value: __await(o[n](v)),
        done: n === "return"
      } : f ? f(v) : v;
    } : f;
  }
}
function __asyncValues(o) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && function(v) {
      return new Promise(function(resolve2, reject) {
        v = o[n](v), settle(resolve2, reject, v.done, v.value);
      });
    };
  }
  function settle(resolve2, reject, d, v) {
    Promise.resolve(v).then(function(v2) {
      resolve2({
        value: v2,
        done: d
      });
    }, reject);
  }
}
function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", {
      value: raw
    });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}
function __importStar(mod) {
  if (mod && mod.__esModule)
    return mod;
  var result = {};
  if (mod != null) {
    for (var k in mod)
      if (Object.hasOwnProperty.call(mod, k))
        result[k] = mod[k];
  }
  result.default = mod;
  return result;
}
function __importDefault(mod) {
  return mod && mod.__esModule ? mod : {
    default: mod
  };
}
function __classPrivateFieldGet(receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }
  return privateMap.get(receiver);
}
function __classPrivateFieldSet(receiver, privateMap, value) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to set private field on non-instance");
  }
  privateMap.set(receiver, value);
  return value;
}
var extendStatics;
var __assign;
var init_tslib_es6 = __esm({
  "node_modules/tslib/tslib.es6.js"() {
    init_define_process();
    extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf || {
        __proto__: []
      } instanceof Array && function(d2, b2) {
        d2.__proto__ = b2;
      } || function(d2, b2) {
        for (var p in b2)
          if (b2.hasOwnProperty(p))
            d2[p] = b2[p];
      };
      return extendStatics(d, b);
    };
    __assign = function() {
      __assign = Object.assign || function __assign2(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
  }
});
var require_api = __commonJS2({
  "node_modules/vnopts/lib/descriptors/api.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.apiDescriptor = {
      key: (key) => /^[$_a-zA-Z][$_a-zA-Z0-9]*$/.test(key) ? key : JSON.stringify(key),
      value(value) {
        if (value === null || typeof value !== "object") {
          return JSON.stringify(value);
        }
        if (Array.isArray(value)) {
          return `[${value.map((subValue) => exports.apiDescriptor.value(subValue)).join(", ")}]`;
        }
        const keys = Object.keys(value);
        return keys.length === 0 ? "{}" : `{ ${keys.map((key) => `${exports.apiDescriptor.key(key)}: ${exports.apiDescriptor.value(value[key])}`).join(", ")} }`;
      },
      pair: (_ref6) => {
        let {
          key,
          value
        } = _ref6;
        return exports.apiDescriptor.value({
          [key]: value
        });
      }
    };
  }
});
var require_descriptors2 = __commonJS2({
  "node_modules/vnopts/lib/descriptors/index.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_api(), exports);
  }
});
var require_chalk = __commonJS2({
  "scripts/build/shims/chalk.cjs"(exports, module) {
    "use strict";
    init_define_process();
    var chalk = (x) => x;
    chalk.grey = chalk;
    chalk.red = chalk;
    chalk.bold = chalk;
    chalk.yellow = chalk;
    chalk.blue = chalk;
    chalk.default = chalk;
    module.exports = chalk;
  }
});
var require_common = __commonJS2({
  "node_modules/vnopts/lib/handlers/deprecated/common.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var chalk_1 = require_chalk();
    exports.commonDeprecatedHandler = (keyOrPair, redirectTo, _ref7) => {
      let {
        descriptor
      } = _ref7;
      const messages = [`${chalk_1.default.yellow(typeof keyOrPair === "string" ? descriptor.key(keyOrPair) : descriptor.pair(keyOrPair))} is deprecated`];
      if (redirectTo) {
        messages.push(`we now treat it as ${chalk_1.default.blue(typeof redirectTo === "string" ? descriptor.key(redirectTo) : descriptor.pair(redirectTo))}`);
      }
      return messages.join("; ") + ".";
    };
  }
});
var require_deprecated = __commonJS2({
  "node_modules/vnopts/lib/handlers/deprecated/index.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_common(), exports);
  }
});
var require_common2 = __commonJS2({
  "node_modules/vnopts/lib/handlers/invalid/common.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var chalk_1 = require_chalk();
    exports.commonInvalidHandler = (key, value, utils) => [`Invalid ${chalk_1.default.red(utils.descriptor.key(key))} value.`, `Expected ${chalk_1.default.blue(utils.schemas[key].expected(utils))},`, `but received ${chalk_1.default.red(utils.descriptor.value(value))}.`].join(" ");
  }
});
var require_invalid = __commonJS2({
  "node_modules/vnopts/lib/handlers/invalid/index.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_common2(), exports);
  }
});
var require_leven = __commonJS2({
  "node_modules/vnopts/node_modules/leven/index.js"(exports, module) {
    "use strict";
    init_define_process();
    var arr = [];
    var charCodeCache = [];
    module.exports = function(a, b) {
      if (a === b) {
        return 0;
      }
      var swap = a;
      if (a.length > b.length) {
        a = b;
        b = swap;
      }
      var aLen = a.length;
      var bLen = b.length;
      if (aLen === 0) {
        return bLen;
      }
      if (bLen === 0) {
        return aLen;
      }
      while (aLen > 0 && a.charCodeAt(~-aLen) === b.charCodeAt(~-bLen)) {
        aLen--;
        bLen--;
      }
      if (aLen === 0) {
        return bLen;
      }
      var start = 0;
      while (start < aLen && a.charCodeAt(start) === b.charCodeAt(start)) {
        start++;
      }
      aLen -= start;
      bLen -= start;
      if (aLen === 0) {
        return bLen;
      }
      var bCharCode;
      var ret;
      var tmp;
      var tmp2;
      var i = 0;
      var j = 0;
      while (i < aLen) {
        charCodeCache[start + i] = a.charCodeAt(start + i);
        arr[i] = ++i;
      }
      while (j < bLen) {
        bCharCode = b.charCodeAt(start + j);
        tmp = j++;
        ret = j;
        for (i = 0; i < aLen; i++) {
          tmp2 = bCharCode === charCodeCache[start + i] ? tmp : tmp + 1;
          tmp = arr[i];
          ret = arr[i] = tmp > ret ? tmp2 > ret ? ret + 1 : tmp2 : tmp2 > tmp ? tmp + 1 : tmp2;
        }
      }
      return ret;
    };
  }
});
var require_leven2 = __commonJS2({
  "node_modules/vnopts/lib/handlers/unknown/leven.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var chalk_1 = require_chalk();
    var leven = require_leven();
    exports.levenUnknownHandler = (key, value, _ref8) => {
      let {
        descriptor,
        logger,
        schemas
      } = _ref8;
      const messages = [`Ignored unknown option ${chalk_1.default.yellow(descriptor.pair({
        key,
        value
      }))}.`];
      const suggestion = Object.keys(schemas).sort().find((knownKey) => leven(key, knownKey) < 3);
      if (suggestion) {
        messages.push(`Did you mean ${chalk_1.default.blue(descriptor.key(suggestion))}?`);
      }
      logger.warn(messages.join(" "));
    };
  }
});
var require_unknown = __commonJS2({
  "node_modules/vnopts/lib/handlers/unknown/index.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_leven2(), exports);
  }
});
var require_handlers = __commonJS2({
  "node_modules/vnopts/lib/handlers/index.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_deprecated(), exports);
    tslib_1.__exportStar(require_invalid(), exports);
    tslib_1.__exportStar(require_unknown(), exports);
  }
});
var require_schema = __commonJS2({
  "node_modules/vnopts/lib/schema.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var HANDLER_KEYS = ["default", "expected", "validate", "deprecated", "forward", "redirect", "overlap", "preprocess", "postprocess"];
    function createSchema(SchemaConstructor, parameters) {
      const schema = new SchemaConstructor(parameters);
      const subSchema = Object.create(schema);
      for (const handlerKey of HANDLER_KEYS) {
        if (handlerKey in parameters) {
          subSchema[handlerKey] = normalizeHandler(parameters[handlerKey], schema, Schema.prototype[handlerKey].length);
        }
      }
      return subSchema;
    }
    exports.createSchema = createSchema;
    var Schema = class {
      constructor(parameters) {
        this.name = parameters.name;
      }
      static create(parameters) {
        return createSchema(this, parameters);
      }
      default(_utils) {
        return void 0;
      }
      expected(_utils) {
        return "nothing";
      }
      validate(_value, _utils) {
        return false;
      }
      deprecated(_value, _utils) {
        return false;
      }
      forward(_value, _utils) {
        return void 0;
      }
      redirect(_value, _utils) {
        return void 0;
      }
      overlap(currentValue, _newValue, _utils) {
        return currentValue;
      }
      preprocess(value, _utils) {
        return value;
      }
      postprocess(value, _utils) {
        return value;
      }
    };
    exports.Schema = Schema;
    function normalizeHandler(handler, superSchema, handlerArgumentsLength) {
      return typeof handler === "function" ? function() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        return handler(...args.slice(0, handlerArgumentsLength - 1), superSchema, ...args.slice(handlerArgumentsLength - 1));
      } : () => handler;
    }
  }
});
var require_alias = __commonJS2({
  "node_modules/vnopts/lib/schemas/alias.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var schema_1 = require_schema();
    var AliasSchema = class extends schema_1.Schema {
      constructor(parameters) {
        super(parameters);
        this._sourceName = parameters.sourceName;
      }
      expected(utils) {
        return utils.schemas[this._sourceName].expected(utils);
      }
      validate(value, utils) {
        return utils.schemas[this._sourceName].validate(value, utils);
      }
      redirect(_value, _utils) {
        return this._sourceName;
      }
    };
    exports.AliasSchema = AliasSchema;
  }
});
var require_any = __commonJS2({
  "node_modules/vnopts/lib/schemas/any.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var schema_1 = require_schema();
    var AnySchema = class extends schema_1.Schema {
      expected() {
        return "anything";
      }
      validate() {
        return true;
      }
    };
    exports.AnySchema = AnySchema;
  }
});
var require_array2 = __commonJS2({
  "node_modules/vnopts/lib/schemas/array.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var schema_1 = require_schema();
    var ArraySchema = class extends schema_1.Schema {
      constructor(_a) {
        var {
          valueSchema,
          name = valueSchema.name
        } = _a, handlers = tslib_1.__rest(_a, ["valueSchema", "name"]);
        super(Object.assign({}, handlers, {
          name
        }));
        this._valueSchema = valueSchema;
      }
      expected(utils) {
        return `an array of ${this._valueSchema.expected(utils)}`;
      }
      validate(value, utils) {
        if (!Array.isArray(value)) {
          return false;
        }
        const invalidValues = [];
        for (const subValue of value) {
          const subValidateResult = utils.normalizeValidateResult(this._valueSchema.validate(subValue, utils), subValue);
          if (subValidateResult !== true) {
            invalidValues.push(subValidateResult.value);
          }
        }
        return invalidValues.length === 0 ? true : {
          value: invalidValues
        };
      }
      deprecated(value, utils) {
        const deprecatedResult = [];
        for (const subValue of value) {
          const subDeprecatedResult = utils.normalizeDeprecatedResult(this._valueSchema.deprecated(subValue, utils), subValue);
          if (subDeprecatedResult !== false) {
            deprecatedResult.push(...subDeprecatedResult.map((_ref9) => {
              let {
                value: deprecatedValue
              } = _ref9;
              return {
                value: [deprecatedValue]
              };
            }));
          }
        }
        return deprecatedResult;
      }
      forward(value, utils) {
        const forwardResult = [];
        for (const subValue of value) {
          const subForwardResult = utils.normalizeForwardResult(this._valueSchema.forward(subValue, utils), subValue);
          forwardResult.push(...subForwardResult.map(wrapTransferResult));
        }
        return forwardResult;
      }
      redirect(value, utils) {
        const remain = [];
        const redirect = [];
        for (const subValue of value) {
          const subRedirectResult = utils.normalizeRedirectResult(this._valueSchema.redirect(subValue, utils), subValue);
          if ("remain" in subRedirectResult) {
            remain.push(subRedirectResult.remain);
          }
          redirect.push(...subRedirectResult.redirect.map(wrapTransferResult));
        }
        return remain.length === 0 ? {
          redirect
        } : {
          redirect,
          remain
        };
      }
      overlap(currentValue, newValue) {
        return currentValue.concat(newValue);
      }
    };
    exports.ArraySchema = ArraySchema;
    function wrapTransferResult(_ref10) {
      let {
        from,
        to
      } = _ref10;
      return {
        from: [from],
        to
      };
    }
  }
});
var require_boolean = __commonJS2({
  "node_modules/vnopts/lib/schemas/boolean.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var schema_1 = require_schema();
    var BooleanSchema = class extends schema_1.Schema {
      expected() {
        return "true or false";
      }
      validate(value) {
        return typeof value === "boolean";
      }
    };
    exports.BooleanSchema = BooleanSchema;
  }
});
var require_utils = __commonJS2({
  "node_modules/vnopts/lib/utils.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    function recordFromArray(array, mainKey) {
      const record = /* @__PURE__ */ Object.create(null);
      for (const value of array) {
        const key = value[mainKey];
        if (record[key]) {
          throw new Error(`Duplicate ${mainKey} ${JSON.stringify(key)}`);
        }
        record[key] = value;
      }
      return record;
    }
    exports.recordFromArray = recordFromArray;
    function mapFromArray(array, mainKey) {
      const map = /* @__PURE__ */ new Map();
      for (const value of array) {
        const key = value[mainKey];
        if (map.has(key)) {
          throw new Error(`Duplicate ${mainKey} ${JSON.stringify(key)}`);
        }
        map.set(key, value);
      }
      return map;
    }
    exports.mapFromArray = mapFromArray;
    function createAutoChecklist() {
      const map = /* @__PURE__ */ Object.create(null);
      return (id) => {
        const idString = JSON.stringify(id);
        if (map[idString]) {
          return true;
        }
        map[idString] = true;
        return false;
      };
    }
    exports.createAutoChecklist = createAutoChecklist;
    function partition(array, predicate) {
      const trueArray = [];
      const falseArray = [];
      for (const value of array) {
        if (predicate(value)) {
          trueArray.push(value);
        } else {
          falseArray.push(value);
        }
      }
      return [trueArray, falseArray];
    }
    exports.partition = partition;
    function isInt(value) {
      return value === Math.floor(value);
    }
    exports.isInt = isInt;
    function comparePrimitive(a, b) {
      if (a === b) {
        return 0;
      }
      const typeofA = typeof a;
      const typeofB = typeof b;
      const orders = ["undefined", "object", "boolean", "number", "string"];
      if (typeofA !== typeofB) {
        return orders.indexOf(typeofA) - orders.indexOf(typeofB);
      }
      if (typeofA !== "string") {
        return Number(a) - Number(b);
      }
      return a.localeCompare(b);
    }
    exports.comparePrimitive = comparePrimitive;
    function normalizeDefaultResult(result) {
      return result === void 0 ? {} : result;
    }
    exports.normalizeDefaultResult = normalizeDefaultResult;
    function normalizeValidateResult(result, value) {
      return result === true ? true : result === false ? {
        value
      } : result;
    }
    exports.normalizeValidateResult = normalizeValidateResult;
    function normalizeDeprecatedResult(result, value) {
      let doNotNormalizeTrue = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
      return result === false ? false : result === true ? doNotNormalizeTrue ? true : [{
        value
      }] : "value" in result ? [result] : result.length === 0 ? false : result;
    }
    exports.normalizeDeprecatedResult = normalizeDeprecatedResult;
    function normalizeTransferResult(result, value) {
      return typeof result === "string" || "key" in result ? {
        from: value,
        to: result
      } : "from" in result ? {
        from: result.from,
        to: result.to
      } : {
        from: value,
        to: result.to
      };
    }
    exports.normalizeTransferResult = normalizeTransferResult;
    function normalizeForwardResult(result, value) {
      return result === void 0 ? [] : Array.isArray(result) ? result.map((transferResult) => normalizeTransferResult(transferResult, value)) : [normalizeTransferResult(result, value)];
    }
    exports.normalizeForwardResult = normalizeForwardResult;
    function normalizeRedirectResult(result, value) {
      const redirect = normalizeForwardResult(typeof result === "object" && "redirect" in result ? result.redirect : result, value);
      return redirect.length === 0 ? {
        remain: value,
        redirect
      } : typeof result === "object" && "remain" in result ? {
        remain: result.remain,
        redirect
      } : {
        redirect
      };
    }
    exports.normalizeRedirectResult = normalizeRedirectResult;
  }
});
var require_choice = __commonJS2({
  "node_modules/vnopts/lib/schemas/choice.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var schema_1 = require_schema();
    var utils_1 = require_utils();
    var ChoiceSchema = class extends schema_1.Schema {
      constructor(parameters) {
        super(parameters);
        this._choices = utils_1.mapFromArray(parameters.choices.map((choice) => choice && typeof choice === "object" ? choice : {
          value: choice
        }), "value");
      }
      expected(_ref11) {
        let {
          descriptor
        } = _ref11;
        const choiceValues = Array.from(this._choices.keys()).map((value) => this._choices.get(value)).filter((choiceInfo) => !choiceInfo.deprecated).map((choiceInfo) => choiceInfo.value).sort(utils_1.comparePrimitive).map(descriptor.value);
        const head = choiceValues.slice(0, -2);
        const tail = choiceValues.slice(-2);
        return head.concat(tail.join(" or ")).join(", ");
      }
      validate(value) {
        return this._choices.has(value);
      }
      deprecated(value) {
        const choiceInfo = this._choices.get(value);
        return choiceInfo && choiceInfo.deprecated ? {
          value
        } : false;
      }
      forward(value) {
        const choiceInfo = this._choices.get(value);
        return choiceInfo ? choiceInfo.forward : void 0;
      }
      redirect(value) {
        const choiceInfo = this._choices.get(value);
        return choiceInfo ? choiceInfo.redirect : void 0;
      }
    };
    exports.ChoiceSchema = ChoiceSchema;
  }
});
var require_number = __commonJS2({
  "node_modules/vnopts/lib/schemas/number.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var schema_1 = require_schema();
    var NumberSchema = class extends schema_1.Schema {
      expected() {
        return "a number";
      }
      validate(value, _utils) {
        return typeof value === "number";
      }
    };
    exports.NumberSchema = NumberSchema;
  }
});
var require_integer = __commonJS2({
  "node_modules/vnopts/lib/schemas/integer.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var utils_1 = require_utils();
    var number_1 = require_number();
    var IntegerSchema = class extends number_1.NumberSchema {
      expected() {
        return "an integer";
      }
      validate(value, utils) {
        return utils.normalizeValidateResult(super.validate(value, utils), value) === true && utils_1.isInt(value);
      }
    };
    exports.IntegerSchema = IntegerSchema;
  }
});
var require_string = __commonJS2({
  "node_modules/vnopts/lib/schemas/string.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var schema_1 = require_schema();
    var StringSchema = class extends schema_1.Schema {
      expected() {
        return "a string";
      }
      validate(value) {
        return typeof value === "string";
      }
    };
    exports.StringSchema = StringSchema;
  }
});
var require_schemas = __commonJS2({
  "node_modules/vnopts/lib/schemas/index.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_alias(), exports);
    tslib_1.__exportStar(require_any(), exports);
    tslib_1.__exportStar(require_array2(), exports);
    tslib_1.__exportStar(require_boolean(), exports);
    tslib_1.__exportStar(require_choice(), exports);
    tslib_1.__exportStar(require_integer(), exports);
    tslib_1.__exportStar(require_number(), exports);
    tslib_1.__exportStar(require_string(), exports);
  }
});
var require_defaults = __commonJS2({
  "node_modules/vnopts/lib/defaults.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var api_1 = require_api();
    var common_1 = require_common();
    var invalid_1 = require_invalid();
    var leven_1 = require_leven2();
    exports.defaultDescriptor = api_1.apiDescriptor;
    exports.defaultUnknownHandler = leven_1.levenUnknownHandler;
    exports.defaultInvalidHandler = invalid_1.commonInvalidHandler;
    exports.defaultDeprecatedHandler = common_1.commonDeprecatedHandler;
  }
});
var require_normalize = __commonJS2({
  "node_modules/vnopts/lib/normalize.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var defaults_1 = require_defaults();
    var utils_1 = require_utils();
    exports.normalize = (options, schemas, opts) => new Normalizer(schemas, opts).normalize(options);
    var Normalizer = class {
      constructor(schemas, opts) {
        const {
          logger = console,
          descriptor = defaults_1.defaultDescriptor,
          unknown = defaults_1.defaultUnknownHandler,
          invalid = defaults_1.defaultInvalidHandler,
          deprecated = defaults_1.defaultDeprecatedHandler
        } = opts || {};
        this._utils = {
          descriptor,
          logger: logger || {
            warn: () => {
            }
          },
          schemas: utils_1.recordFromArray(schemas, "name"),
          normalizeDefaultResult: utils_1.normalizeDefaultResult,
          normalizeDeprecatedResult: utils_1.normalizeDeprecatedResult,
          normalizeForwardResult: utils_1.normalizeForwardResult,
          normalizeRedirectResult: utils_1.normalizeRedirectResult,
          normalizeValidateResult: utils_1.normalizeValidateResult
        };
        this._unknownHandler = unknown;
        this._invalidHandler = invalid;
        this._deprecatedHandler = deprecated;
        this.cleanHistory();
      }
      cleanHistory() {
        this._hasDeprecationWarned = utils_1.createAutoChecklist();
      }
      normalize(options) {
        const normalized = {};
        const restOptionsArray = [options];
        const applyNormalization = () => {
          while (restOptionsArray.length !== 0) {
            const currentOptions = restOptionsArray.shift();
            const transferredOptionsArray = this._applyNormalization(currentOptions, normalized);
            restOptionsArray.push(...transferredOptionsArray);
          }
        };
        applyNormalization();
        for (const key of Object.keys(this._utils.schemas)) {
          const schema = this._utils.schemas[key];
          if (!(key in normalized)) {
            const defaultResult = utils_1.normalizeDefaultResult(schema.default(this._utils));
            if ("value" in defaultResult) {
              restOptionsArray.push({
                [key]: defaultResult.value
              });
            }
          }
        }
        applyNormalization();
        for (const key of Object.keys(this._utils.schemas)) {
          const schema = this._utils.schemas[key];
          if (key in normalized) {
            normalized[key] = schema.postprocess(normalized[key], this._utils);
          }
        }
        return normalized;
      }
      _applyNormalization(options, normalized) {
        const transferredOptionsArray = [];
        const [knownOptionNames, unknownOptionNames] = utils_1.partition(Object.keys(options), (key) => key in this._utils.schemas);
        for (const key of knownOptionNames) {
          const schema = this._utils.schemas[key];
          const value = schema.preprocess(options[key], this._utils);
          const validateResult = utils_1.normalizeValidateResult(schema.validate(value, this._utils), value);
          if (validateResult !== true) {
            const {
              value: invalidValue
            } = validateResult;
            const errorMessageOrError = this._invalidHandler(key, invalidValue, this._utils);
            throw typeof errorMessageOrError === "string" ? new Error(errorMessageOrError) : errorMessageOrError;
          }
          const appendTransferredOptions = (_ref12) => {
            let {
              from,
              to
            } = _ref12;
            transferredOptionsArray.push(typeof to === "string" ? {
              [to]: from
            } : {
              [to.key]: to.value
            });
          };
          const warnDeprecated = (_ref13) => {
            let {
              value: currentValue,
              redirectTo
            } = _ref13;
            const deprecatedResult = utils_1.normalizeDeprecatedResult(schema.deprecated(currentValue, this._utils), value, true);
            if (deprecatedResult === false) {
              return;
            }
            if (deprecatedResult === true) {
              if (!this._hasDeprecationWarned(key)) {
                this._utils.logger.warn(this._deprecatedHandler(key, redirectTo, this._utils));
              }
            } else {
              for (const {
                value: deprecatedValue
              } of deprecatedResult) {
                const pair = {
                  key,
                  value: deprecatedValue
                };
                if (!this._hasDeprecationWarned(pair)) {
                  const redirectToPair = typeof redirectTo === "string" ? {
                    key: redirectTo,
                    value: deprecatedValue
                  } : redirectTo;
                  this._utils.logger.warn(this._deprecatedHandler(pair, redirectToPair, this._utils));
                }
              }
            }
          };
          const forwardResult = utils_1.normalizeForwardResult(schema.forward(value, this._utils), value);
          forwardResult.forEach(appendTransferredOptions);
          const redirectResult = utils_1.normalizeRedirectResult(schema.redirect(value, this._utils), value);
          redirectResult.redirect.forEach(appendTransferredOptions);
          if ("remain" in redirectResult) {
            const remainingValue = redirectResult.remain;
            normalized[key] = key in normalized ? schema.overlap(normalized[key], remainingValue, this._utils) : remainingValue;
            warnDeprecated({
              value: remainingValue
            });
          }
          for (const {
            from,
            to
          } of redirectResult.redirect) {
            warnDeprecated({
              value: from,
              redirectTo: to
            });
          }
        }
        for (const key of unknownOptionNames) {
          const value = options[key];
          const unknownResult = this._unknownHandler(key, value, this._utils);
          if (unknownResult) {
            for (const unknownKey of Object.keys(unknownResult)) {
              const unknownOption = {
                [unknownKey]: unknownResult[unknownKey]
              };
              if (unknownKey in this._utils.schemas) {
                transferredOptionsArray.push(unknownOption);
              } else {
                Object.assign(normalized, unknownOption);
              }
            }
          }
        }
        return transferredOptionsArray;
      }
    };
    exports.Normalizer = Normalizer;
  }
});
var require_lib2 = __commonJS2({
  "node_modules/vnopts/lib/index.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_descriptors2(), exports);
    tslib_1.__exportStar(require_handlers(), exports);
    tslib_1.__exportStar(require_schemas(), exports);
    tslib_1.__exportStar(require_normalize(), exports);
    tslib_1.__exportStar(require_schema(), exports);
  }
});
var require_options_normalizer = __commonJS2({
  "src/main/options-normalizer.js"(exports, module) {
    "use strict";
    init_define_process();
    var vnopts = require_lib2();
    var getLast = require_get_last();
    var cliDescriptor = {
      key: (key) => key.length === 1 ? `-${key}` : `--${key}`,
      value: (value) => vnopts.apiDescriptor.value(value),
      pair: (_ref14) => {
        let {
          key,
          value
        } = _ref14;
        return value === false ? `--no-${key}` : value === true ? cliDescriptor.key(key) : value === "" ? `${cliDescriptor.key(key)} without an argument` : `${cliDescriptor.key(key)}=${value}`;
      }
    };
    var getFlagSchema = (_ref15) => {
      let {
        colorsModule,
        levenshteinDistance
      } = _ref15;
      return class FlagSchema extends vnopts.ChoiceSchema {
        constructor(_ref16) {
          let {
            name,
            flags
          } = _ref16;
          super({
            name,
            choices: flags
          });
          this._flags = [...flags].sort();
        }
        preprocess(value, utils) {
          if (typeof value === "string" && value.length > 0 && !this._flags.includes(value)) {
            const suggestion = this._flags.find((flag) => levenshteinDistance(flag, value) < 3);
            if (suggestion) {
              utils.logger.warn([`Unknown flag ${colorsModule.yellow(utils.descriptor.value(value))},`, `did you mean ${colorsModule.blue(utils.descriptor.value(suggestion))}?`].join(" "));
              return suggestion;
            }
          }
          return value;
        }
        expected() {
          return "a flag";
        }
      };
    };
    var hasDeprecationWarned;
    function normalizeOptions(options, optionInfos) {
      let {
        logger = false,
        isCLI = false,
        passThrough = false,
        colorsModule = null,
        levenshteinDistance = null
      } = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      const unknown = !passThrough ? (key, value, options2) => {
        const _options2$schemas = options2.schemas, {
          _
        } = _options2$schemas, schemas2 = _objectWithoutProperties(_options2$schemas, _excluded2);
        return vnopts.levenUnknownHandler(key, value, Object.assign(Object.assign({}, options2), {}, {
          schemas: schemas2
        }));
      } : Array.isArray(passThrough) ? (key, value) => !passThrough.includes(key) ? void 0 : {
        [key]: value
      } : (key, value) => ({
        [key]: value
      });
      const descriptor = isCLI ? cliDescriptor : vnopts.apiDescriptor;
      const schemas = optionInfosToSchemas(optionInfos, {
        isCLI,
        colorsModule,
        levenshteinDistance
      });
      const normalizer = new vnopts.Normalizer(schemas, {
        logger,
        unknown,
        descriptor
      });
      const shouldSuppressDuplicateDeprecationWarnings = logger !== false;
      if (shouldSuppressDuplicateDeprecationWarnings && hasDeprecationWarned) {
        normalizer._hasDeprecationWarned = hasDeprecationWarned;
      }
      const normalized = normalizer.normalize(options);
      if (shouldSuppressDuplicateDeprecationWarnings) {
        hasDeprecationWarned = normalizer._hasDeprecationWarned;
      }
      if (isCLI && normalized["plugin-search"] === false) {
        normalized["plugin-search-dir"] = false;
      }
      return normalized;
    }
    function optionInfosToSchemas(optionInfos, _ref17) {
      let {
        isCLI,
        colorsModule,
        levenshteinDistance
      } = _ref17;
      const schemas = [];
      if (isCLI) {
        schemas.push(vnopts.AnySchema.create({
          name: "_"
        }));
      }
      for (const optionInfo of optionInfos) {
        schemas.push(optionInfoToSchema(optionInfo, {
          isCLI,
          optionInfos,
          colorsModule,
          levenshteinDistance
        }));
        if (optionInfo.alias && isCLI) {
          schemas.push(vnopts.AliasSchema.create({
            name: optionInfo.alias,
            sourceName: optionInfo.name
          }));
        }
      }
      return schemas;
    }
    function optionInfoToSchema(optionInfo, _ref18) {
      let {
        isCLI,
        optionInfos,
        colorsModule,
        levenshteinDistance
      } = _ref18;
      const {
        name
      } = optionInfo;
      if (name === "plugin-search-dir" || name === "pluginSearchDirs") {
        return vnopts.AnySchema.create({
          name,
          preprocess(value) {
            if (value === false) {
              return value;
            }
            value = Array.isArray(value) ? value : [value];
            return value;
          },
          validate(value) {
            if (value === false) {
              return true;
            }
            return value.every((dir) => typeof dir === "string");
          },
          expected() {
            return "false or paths to plugin search dir";
          }
        });
      }
      const parameters = {
        name
      };
      let SchemaConstructor;
      const handlers = {};
      switch (optionInfo.type) {
        case "int":
          SchemaConstructor = vnopts.IntegerSchema;
          if (isCLI) {
            parameters.preprocess = Number;
          }
          break;
        case "string":
          SchemaConstructor = vnopts.StringSchema;
          break;
        case "choice":
          SchemaConstructor = vnopts.ChoiceSchema;
          parameters.choices = optionInfo.choices.map((choiceInfo) => typeof choiceInfo === "object" && choiceInfo.redirect ? Object.assign(Object.assign({}, choiceInfo), {}, {
            redirect: {
              to: {
                key: optionInfo.name,
                value: choiceInfo.redirect
              }
            }
          }) : choiceInfo);
          break;
        case "boolean":
          SchemaConstructor = vnopts.BooleanSchema;
          break;
        case "flag":
          SchemaConstructor = getFlagSchema({
            colorsModule,
            levenshteinDistance
          });
          parameters.flags = optionInfos.flatMap((optionInfo2) => [optionInfo2.alias, optionInfo2.description && optionInfo2.name, optionInfo2.oppositeDescription && `no-${optionInfo2.name}`].filter(Boolean));
          break;
        case "path":
          SchemaConstructor = vnopts.StringSchema;
          break;
        default:
          throw new Error(`Unexpected type ${optionInfo.type}`);
      }
      if (optionInfo.exception) {
        parameters.validate = (value, schema, utils) => optionInfo.exception(value) || schema.validate(value, utils);
      } else {
        parameters.validate = (value, schema, utils) => value === void 0 || schema.validate(value, utils);
      }
      if (optionInfo.redirect) {
        handlers.redirect = (value) => !value ? void 0 : {
          to: {
            key: optionInfo.redirect.option,
            value: optionInfo.redirect.value
          }
        };
      }
      if (optionInfo.deprecated) {
        handlers.deprecated = true;
      }
      if (isCLI && !optionInfo.array) {
        const originalPreprocess = parameters.preprocess || ((x) => x);
        parameters.preprocess = (value, schema, utils) => schema.preprocess(originalPreprocess(Array.isArray(value) ? getLast(value) : value), utils);
      }
      return optionInfo.array ? vnopts.ArraySchema.create(Object.assign(Object.assign(Object.assign({}, isCLI ? {
        preprocess: (v) => Array.isArray(v) ? v : [v]
      } : {}), handlers), {}, {
        valueSchema: SchemaConstructor.create(parameters)
      })) : SchemaConstructor.create(Object.assign(Object.assign({}, parameters), handlers));
    }
    function normalizeApiOptions(options, optionInfos, opts) {
      return normalizeOptions(options, optionInfos, opts);
    }
    function normalizeCliOptions(options, optionInfos, opts) {
      if (false) {
        if (!opts.colorsModule) {
          throw new Error("'colorsModule' option is required.");
        }
        if (!opts.levenshteinDistance) {
          throw new Error("'levenshteinDistance' option is required.");
        }
      }
      return normalizeOptions(options, optionInfos, Object.assign({
        isCLI: true
      }, opts));
    }
    module.exports = {
      normalizeApiOptions,
      normalizeCliOptions
    };
  }
});
var require_loc = __commonJS2({
  "src/language-js/loc.js"(exports, module) {
    "use strict";
    init_define_process();
    var isNonEmptyArray = require_is_non_empty_array();
    function locStart(node) {
      var _node$declaration$dec, _node$declaration;
      const start = node.range ? node.range[0] : node.start;
      const decorators = (_node$declaration$dec = (_node$declaration = node.declaration) === null || _node$declaration === void 0 ? void 0 : _node$declaration.decorators) !== null && _node$declaration$dec !== void 0 ? _node$declaration$dec : node.decorators;
      if (isNonEmptyArray(decorators)) {
        return Math.min(locStart(decorators[0]), start);
      }
      return start;
    }
    function locEnd(node) {
      return node.range ? node.range[1] : node.end;
    }
    function hasSameLocStart(nodeA, nodeB) {
      const nodeAStart = locStart(nodeA);
      return Number.isInteger(nodeAStart) && nodeAStart === locStart(nodeB);
    }
    function hasSameLocEnd(nodeA, nodeB) {
      const nodeAEnd = locEnd(nodeA);
      return Number.isInteger(nodeAEnd) && nodeAEnd === locEnd(nodeB);
    }
    function hasSameLoc(nodeA, nodeB) {
      return hasSameLocStart(nodeA, nodeB) && hasSameLocEnd(nodeA, nodeB);
    }
    module.exports = {
      locStart,
      locEnd,
      hasSameLocStart,
      hasSameLoc
    };
  }
});
var require_load_parser = __commonJS2({
  "src/main/load-parser.js"(exports, module) {
    init_define_process();
    module.exports = () => {
    };
  }
});
var require_babel_highlight = __commonJS2({
  "scripts/build/shims/babel-highlight.cjs"(exports, module) {
    "use strict";
    init_define_process();
    var chalk = require_chalk();
    var highlight = {
      shouldHighlight: () => false,
      getChalk: () => chalk
    };
    module.exports = highlight;
  }
});
var require_lib3 = __commonJS2({
  "node_modules/@babel/code-frame/lib/index.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.codeFrameColumns = codeFrameColumns;
    exports.default = _default;
    var _highlight = require_babel_highlight();
    var deprecationWarningShown = false;
    function getDefs(chalk) {
      return {
        gutter: chalk.grey,
        marker: chalk.red.bold,
        message: chalk.red.bold
      };
    }
    var NEWLINE = /\r\n|[\n\r\u2028\u2029]/;
    function getMarkerLines(loc, source, opts) {
      const startLoc = Object.assign({
        column: 0,
        line: -1
      }, loc.start);
      const endLoc = Object.assign({}, startLoc, loc.end);
      const {
        linesAbove = 2,
        linesBelow = 3
      } = opts || {};
      const startLine = startLoc.line;
      const startColumn = startLoc.column;
      const endLine = endLoc.line;
      const endColumn = endLoc.column;
      let start = Math.max(startLine - (linesAbove + 1), 0);
      let end = Math.min(source.length, endLine + linesBelow);
      if (startLine === -1) {
        start = 0;
      }
      if (endLine === -1) {
        end = source.length;
      }
      const lineDiff = endLine - startLine;
      const markerLines = {};
      if (lineDiff) {
        for (let i = 0; i <= lineDiff; i++) {
          const lineNumber = i + startLine;
          if (!startColumn) {
            markerLines[lineNumber] = true;
          } else if (i === 0) {
            const sourceLength = source[lineNumber - 1].length;
            markerLines[lineNumber] = [startColumn, sourceLength - startColumn + 1];
          } else if (i === lineDiff) {
            markerLines[lineNumber] = [0, endColumn];
          } else {
            const sourceLength = source[lineNumber - i].length;
            markerLines[lineNumber] = [0, sourceLength];
          }
        }
      } else {
        if (startColumn === endColumn) {
          if (startColumn) {
            markerLines[startLine] = [startColumn, 0];
          } else {
            markerLines[startLine] = true;
          }
        } else {
          markerLines[startLine] = [startColumn, endColumn - startColumn];
        }
      }
      return {
        start,
        end,
        markerLines
      };
    }
    function codeFrameColumns(rawLines, loc) {
      let opts = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      const highlighted = (opts.highlightCode || opts.forceColor) && (0, _highlight.shouldHighlight)(opts);
      const chalk = (0, _highlight.getChalk)(opts);
      const defs = getDefs(chalk);
      const maybeHighlight = (chalkFn, string) => {
        return highlighted ? chalkFn(string) : string;
      };
      const lines = rawLines.split(NEWLINE);
      const {
        start,
        end,
        markerLines
      } = getMarkerLines(loc, lines, opts);
      const hasColumns = loc.start && typeof loc.start.column === "number";
      const numberMaxWidth = String(end).length;
      const highlightedLines = highlighted ? (0, _highlight.default)(rawLines, opts) : rawLines;
      let frame = highlightedLines.split(NEWLINE, end).slice(start, end).map((line, index) => {
        const number = start + 1 + index;
        const paddedNumber = ` ${number}`.slice(-numberMaxWidth);
        const gutter = ` ${paddedNumber} |`;
        const hasMarker = markerLines[number];
        const lastMarkerLine = !markerLines[number + 1];
        if (hasMarker) {
          let markerLine = "";
          if (Array.isArray(hasMarker)) {
            const markerSpacing = line.slice(0, Math.max(hasMarker[0] - 1, 0)).replace(/[^\t]/g, " ");
            const numberOfMarkers = hasMarker[1] || 1;
            markerLine = ["\n ", maybeHighlight(defs.gutter, gutter.replace(/\d/g, " ")), " ", markerSpacing, maybeHighlight(defs.marker, "^").repeat(numberOfMarkers)].join("");
            if (lastMarkerLine && opts.message) {
              markerLine += " " + maybeHighlight(defs.message, opts.message);
            }
          }
          return [maybeHighlight(defs.marker, ">"), maybeHighlight(defs.gutter, gutter), line.length > 0 ? ` ${line}` : "", markerLine].join("");
        } else {
          return ` ${maybeHighlight(defs.gutter, gutter)}${line.length > 0 ? ` ${line}` : ""}`;
        }
      }).join("\n");
      if (opts.message && !hasColumns) {
        frame = `${" ".repeat(numberMaxWidth + 1)}${opts.message}
${frame}`;
      }
      if (highlighted) {
        return chalk.reset(frame);
      } else {
        return frame;
      }
    }
    function _default(rawLines, lineNumber, colNumber) {
      let opts = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
      if (!deprecationWarningShown) {
        deprecationWarningShown = true;
        const message = "Passing lineNumber and colNumber is deprecated to @babel/code-frame. Please use `codeFrameColumns`.";
        if (define_process_default.emitWarning) {
          define_process_default.emitWarning(message, "DeprecationWarning");
        } else {
          const deprecationError = new Error(message);
          deprecationError.name = "DeprecationWarning";
          console.warn(new Error(message));
        }
      }
      colNumber = Math.max(colNumber, 0);
      const location = {
        start: {
          column: colNumber,
          line: lineNumber
        }
      };
      return codeFrameColumns(rawLines, location, opts);
    }
  }
});
var require_parser = __commonJS2({
  "src/main/parser.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      ConfigError
    } = require_errors();
    var jsLoc = require_loc();
    var loadParser = require_load_parser();
    var {
      locStart,
      locEnd
    } = jsLoc;
    var ownNames = Object.getOwnPropertyNames;
    var ownDescriptor = Object.getOwnPropertyDescriptor;
    function getParsers(options) {
      const parsers = {};
      for (const plugin of options.plugins) {
        if (!plugin.parsers) {
          continue;
        }
        for (const name of ownNames(plugin.parsers)) {
          Object.defineProperty(parsers, name, ownDescriptor(plugin.parsers, name));
        }
      }
      return parsers;
    }
    function resolveParser(opts) {
      let parsers = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getParsers(opts);
      if (typeof opts.parser === "function") {
        return {
          parse: opts.parser,
          astFormat: "estree",
          locStart,
          locEnd
        };
      }
      if (typeof opts.parser === "string") {
        if (Object.prototype.hasOwnProperty.call(parsers, opts.parser)) {
          return parsers[opts.parser];
        }
        if (true) {
          throw new ConfigError(`Couldn't resolve parser "${opts.parser}". Parsers must be explicitly added to the standalone bundle.`);
        }
        return loadParser(opts.parser);
      }
    }
    function parse(text, opts) {
      const parsers = getParsers(opts);
      const parsersForCustomParserApi = Object.defineProperties({}, Object.fromEntries(Object.keys(parsers).map((parserName) => [parserName, {
        enumerable: true,
        get() {
          return parsers[parserName].parse;
        }
      }])));
      const parser = resolveParser(opts, parsers);
      try {
        if (parser.preprocess) {
          text = parser.preprocess(text, opts);
        }
        return {
          text,
          ast: parser.parse(text, parsersForCustomParserApi, opts)
        };
      } catch (error) {
        const {
          loc
        } = error;
        if (loc) {
          const {
            codeFrameColumns
          } = require_lib3();
          error.codeFrame = codeFrameColumns(text, loc, {
            highlightCode: true
          });
          error.message += "\n" + error.codeFrame;
          throw error;
        }
        throw error;
      }
    }
    module.exports = {
      parse,
      resolveParser
    };
  }
});
var require_options = __commonJS2({
  "src/main/options.js"(exports, module) {
    "use strict";
    init_define_process();
    var path = require_path();
    var {
      UndefinedParserError
    } = require_errors();
    var {
      getSupportInfo
    } = require_support();
    var normalizer = require_options_normalizer();
    var {
      resolveParser
    } = require_parser();
    var hiddenDefaults = {
      astFormat: "estree",
      printer: {},
      originalText: void 0,
      locStart: null,
      locEnd: null
    };
    function normalize2(options) {
      let opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      const rawOptions = Object.assign({}, options);
      const supportOptions = getSupportInfo({
        plugins: options.plugins,
        showUnreleased: true,
        showDeprecated: true
      }).options;
      const defaults = Object.assign(Object.assign({}, hiddenDefaults), Object.fromEntries(supportOptions.filter((optionInfo) => optionInfo.default !== void 0).map((option) => [option.name, option.default])));
      if (!rawOptions.parser) {
        if (!rawOptions.filepath) {
          const logger = opts.logger || console;
          logger.warn("No parser and no filepath given, using 'babel' the parser now but this will throw an error in the future. Please specify a parser or a filepath so one can be inferred.");
          rawOptions.parser = "babel";
        } else {
          rawOptions.parser = inferParser(rawOptions.filepath, rawOptions.plugins);
          if (!rawOptions.parser) {
            throw new UndefinedParserError(`No parser could be inferred for file: ${rawOptions.filepath}`);
          }
        }
      }
      const parser = resolveParser(normalizer.normalizeApiOptions(rawOptions, [supportOptions.find((x) => x.name === "parser")], {
        passThrough: true,
        logger: false
      }));
      rawOptions.astFormat = parser.astFormat;
      rawOptions.locEnd = parser.locEnd;
      rawOptions.locStart = parser.locStart;
      const plugin = getPlugin(rawOptions);
      rawOptions.printer = plugin.printers[rawOptions.astFormat];
      const pluginDefaults = Object.fromEntries(supportOptions.filter((optionInfo) => optionInfo.pluginDefaults && optionInfo.pluginDefaults[plugin.name] !== void 0).map((optionInfo) => [optionInfo.name, optionInfo.pluginDefaults[plugin.name]]));
      const mixedDefaults = Object.assign(Object.assign({}, defaults), pluginDefaults);
      for (const [k, value] of Object.entries(mixedDefaults)) {
        if (rawOptions[k] === null || rawOptions[k] === void 0) {
          rawOptions[k] = value;
        }
      }
      if (rawOptions.parser === "json") {
        rawOptions.trailingComma = "none";
      }
      return normalizer.normalizeApiOptions(rawOptions, supportOptions, Object.assign({
        passThrough: Object.keys(hiddenDefaults)
      }, opts));
    }
    function getPlugin(options) {
      const {
        astFormat
      } = options;
      if (!astFormat) {
        throw new Error("getPlugin() requires astFormat to be set");
      }
      const printerPlugin = options.plugins.find((plugin) => plugin.printers && plugin.printers[astFormat]);
      if (!printerPlugin) {
        throw new Error(`Couldn't find plugin for AST format "${astFormat}"`);
      }
      return printerPlugin;
    }
    function inferParser(filepath, plugins) {
      const filename = path.basename(filepath).toLowerCase();
      const languages = getSupportInfo({
        plugins
      }).languages.filter((language2) => language2.since !== null);
      let language = languages.find((language2) => language2.extensions && language2.extensions.some((extension) => filename.endsWith(extension)) || language2.filenames && language2.filenames.some((name) => name.toLowerCase() === filename));
      if (false) {
        const getInterpreter = null;
        const interpreter = getInterpreter(filepath);
        language = languages.find((language2) => language2.interpreters && language2.interpreters.includes(interpreter));
      }
      return language && language.parsers[0];
    }
    module.exports = {
      normalize: normalize2,
      hiddenDefaults,
      inferParser
    };
  }
});
var require_massage_ast = __commonJS2({
  "src/main/massage-ast.js"(exports, module) {
    "use strict";
    init_define_process();
    function massageAST(ast, options, parent) {
      if (Array.isArray(ast)) {
        return ast.map((e) => massageAST(e, options, parent)).filter(Boolean);
      }
      if (!ast || typeof ast !== "object") {
        return ast;
      }
      const cleanFunction = options.printer.massageAstNode;
      let ignoredProperties;
      if (cleanFunction && cleanFunction.ignoredProperties) {
        ignoredProperties = cleanFunction.ignoredProperties;
      } else {
        ignoredProperties = /* @__PURE__ */ new Set();
      }
      const newObj = {};
      for (const [key, value] of Object.entries(ast)) {
        if (!ignoredProperties.has(key) && typeof value !== "function") {
          newObj[key] = massageAST(value, options, ast);
        }
      }
      if (cleanFunction) {
        const result = cleanFunction(ast, newObj, parent);
        if (result === null) {
          return;
        }
        if (result) {
          return result;
        }
      }
      return newObj;
    }
    module.exports = massageAST;
  }
});
var require_assert = __commonJS2({
  "scripts/build/shims/assert.cjs"(exports, module) {
    "use strict";
    init_define_process();
    var assert = () => {
    };
    assert.ok = assert;
    assert.strictEqual = assert;
    module.exports = assert;
  }
});
var require_comments = __commonJS2({
  "src/main/comments.js"(exports, module) {
    "use strict";
    init_define_process();
    var assert = require_assert();
    var {
      builders: {
        line,
        hardline,
        breakParent,
        indent,
        lineSuffix,
        join: join2,
        cursor
      }
    } = require_document();
    var {
      hasNewline,
      skipNewline,
      skipSpaces,
      isPreviousLineEmpty,
      addLeadingComment,
      addDanglingComment,
      addTrailingComment
    } = require_util();
    var childNodesCache = /* @__PURE__ */ new WeakMap();
    function getSortedChildNodes(node, options, resultArray) {
      if (!node) {
        return;
      }
      const {
        printer,
        locStart,
        locEnd
      } = options;
      if (resultArray) {
        if (printer.canAttachComment && printer.canAttachComment(node)) {
          let i;
          for (i = resultArray.length - 1; i >= 0; --i) {
            if (locStart(resultArray[i]) <= locStart(node) && locEnd(resultArray[i]) <= locEnd(node)) {
              break;
            }
          }
          resultArray.splice(i + 1, 0, node);
          return;
        }
      } else if (childNodesCache.has(node)) {
        return childNodesCache.get(node);
      }
      const childNodes = printer.getCommentChildNodes && printer.getCommentChildNodes(node, options) || typeof node === "object" && Object.entries(node).filter((_ref19) => {
        let [key] = _ref19;
        return key !== "enclosingNode" && key !== "precedingNode" && key !== "followingNode" && key !== "tokens" && key !== "comments" && key !== "parent";
      }).map((_ref20) => {
        let [, value] = _ref20;
        return value;
      });
      if (!childNodes) {
        return;
      }
      if (!resultArray) {
        resultArray = [];
        childNodesCache.set(node, resultArray);
      }
      for (const childNode of childNodes) {
        getSortedChildNodes(childNode, options, resultArray);
      }
      return resultArray;
    }
    function decorateComment(node, comment, options, enclosingNode) {
      const {
        locStart,
        locEnd
      } = options;
      const commentStart = locStart(comment);
      const commentEnd = locEnd(comment);
      const childNodes = getSortedChildNodes(node, options);
      let precedingNode;
      let followingNode;
      let left = 0;
      let right = childNodes.length;
      while (left < right) {
        const middle = left + right >> 1;
        const child = childNodes[middle];
        const start = locStart(child);
        const end = locEnd(child);
        if (start <= commentStart && commentEnd <= end) {
          return decorateComment(child, comment, options, child);
        }
        if (end <= commentStart) {
          precedingNode = child;
          left = middle + 1;
          continue;
        }
        if (commentEnd <= start) {
          followingNode = child;
          right = middle;
          continue;
        }
        throw new Error("Comment location overlaps with node location");
      }
      if (enclosingNode && enclosingNode.type === "TemplateLiteral") {
        const {
          quasis
        } = enclosingNode;
        const commentIndex = findExpressionIndexForComment(quasis, comment, options);
        if (precedingNode && findExpressionIndexForComment(quasis, precedingNode, options) !== commentIndex) {
          precedingNode = null;
        }
        if (followingNode && findExpressionIndexForComment(quasis, followingNode, options) !== commentIndex) {
          followingNode = null;
        }
      }
      return {
        enclosingNode,
        precedingNode,
        followingNode
      };
    }
    var returnFalse = () => false;
    function attach(comments, ast, text, options) {
      if (!Array.isArray(comments)) {
        return;
      }
      const tiesToBreak = [];
      const {
        locStart,
        locEnd,
        printer: {
          handleComments = {}
        }
      } = options;
      const {
        avoidAstMutation,
        ownLine: handleOwnLineComment = returnFalse,
        endOfLine: handleEndOfLineComment = returnFalse,
        remaining: handleRemainingComment = returnFalse
      } = handleComments;
      const decoratedComments = comments.map((comment, index) => Object.assign(Object.assign({}, decorateComment(ast, comment, options)), {}, {
        comment,
        text,
        options,
        ast,
        isLastComment: comments.length - 1 === index
      }));
      for (const [index, context] of decoratedComments.entries()) {
        const {
          comment,
          precedingNode,
          enclosingNode,
          followingNode,
          text: text2,
          options: options2,
          ast: ast2,
          isLastComment
        } = context;
        if (options2.parser === "json" || options2.parser === "json5" || options2.parser === "__js_expression" || options2.parser === "__vue_expression" || options2.parser === "__vue_ts_expression") {
          if (locStart(comment) - locStart(ast2) <= 0) {
            addLeadingComment(ast2, comment);
            continue;
          }
          if (locEnd(comment) - locEnd(ast2) >= 0) {
            addTrailingComment(ast2, comment);
            continue;
          }
        }
        let args;
        if (avoidAstMutation) {
          args = [context];
        } else {
          comment.enclosingNode = enclosingNode;
          comment.precedingNode = precedingNode;
          comment.followingNode = followingNode;
          args = [comment, text2, options2, ast2, isLastComment];
        }
        if (isOwnLineComment(text2, options2, decoratedComments, index)) {
          comment.placement = "ownLine";
          if (handleOwnLineComment(...args)) {
          } else if (followingNode) {
            addLeadingComment(followingNode, comment);
          } else if (precedingNode) {
            addTrailingComment(precedingNode, comment);
          } else if (enclosingNode) {
            addDanglingComment(enclosingNode, comment);
          } else {
            addDanglingComment(ast2, comment);
          }
        } else if (isEndOfLineComment(text2, options2, decoratedComments, index)) {
          comment.placement = "endOfLine";
          if (handleEndOfLineComment(...args)) {
          } else if (precedingNode) {
            addTrailingComment(precedingNode, comment);
          } else if (followingNode) {
            addLeadingComment(followingNode, comment);
          } else if (enclosingNode) {
            addDanglingComment(enclosingNode, comment);
          } else {
            addDanglingComment(ast2, comment);
          }
        } else {
          comment.placement = "remaining";
          if (handleRemainingComment(...args)) {
          } else if (precedingNode && followingNode) {
            const tieCount = tiesToBreak.length;
            if (tieCount > 0) {
              const lastTie = tiesToBreak[tieCount - 1];
              if (lastTie.followingNode !== followingNode) {
                breakTies(tiesToBreak, text2, options2);
              }
            }
            tiesToBreak.push(context);
          } else if (precedingNode) {
            addTrailingComment(precedingNode, comment);
          } else if (followingNode) {
            addLeadingComment(followingNode, comment);
          } else if (enclosingNode) {
            addDanglingComment(enclosingNode, comment);
          } else {
            addDanglingComment(ast2, comment);
          }
        }
      }
      breakTies(tiesToBreak, text, options);
      if (!avoidAstMutation) {
        for (const comment of comments) {
          delete comment.precedingNode;
          delete comment.enclosingNode;
          delete comment.followingNode;
        }
      }
    }
    var isAllEmptyAndNoLineBreak = (text) => !/[\S\n\u2028\u2029]/.test(text);
    function isOwnLineComment(text, options, decoratedComments, commentIndex) {
      const {
        comment,
        precedingNode
      } = decoratedComments[commentIndex];
      const {
        locStart,
        locEnd
      } = options;
      let start = locStart(comment);
      if (precedingNode) {
        for (let index = commentIndex - 1; index >= 0; index--) {
          const {
            comment: comment2,
            precedingNode: currentCommentPrecedingNode
          } = decoratedComments[index];
          if (currentCommentPrecedingNode !== precedingNode || !isAllEmptyAndNoLineBreak(text.slice(locEnd(comment2), start))) {
            break;
          }
          start = locStart(comment2);
        }
      }
      return hasNewline(text, start, {
        backwards: true
      });
    }
    function isEndOfLineComment(text, options, decoratedComments, commentIndex) {
      const {
        comment,
        followingNode
      } = decoratedComments[commentIndex];
      const {
        locStart,
        locEnd
      } = options;
      let end = locEnd(comment);
      if (followingNode) {
        for (let index = commentIndex + 1; index < decoratedComments.length; index++) {
          const {
            comment: comment2,
            followingNode: currentCommentFollowingNode
          } = decoratedComments[index];
          if (currentCommentFollowingNode !== followingNode || !isAllEmptyAndNoLineBreak(text.slice(end, locStart(comment2)))) {
            break;
          }
          end = locEnd(comment2);
        }
      }
      return hasNewline(text, end);
    }
    function breakTies(tiesToBreak, text, options) {
      const tieCount = tiesToBreak.length;
      if (tieCount === 0) {
        return;
      }
      const {
        precedingNode,
        followingNode,
        enclosingNode
      } = tiesToBreak[0];
      const gapRegExp = options.printer.getGapRegex && options.printer.getGapRegex(enclosingNode) || /^[\s(]*$/;
      let gapEndPos = options.locStart(followingNode);
      let indexOfFirstLeadingComment;
      for (indexOfFirstLeadingComment = tieCount; indexOfFirstLeadingComment > 0; --indexOfFirstLeadingComment) {
        const {
          comment,
          precedingNode: currentCommentPrecedingNode,
          followingNode: currentCommentFollowingNode
        } = tiesToBreak[indexOfFirstLeadingComment - 1];
        assert.strictEqual(currentCommentPrecedingNode, precedingNode);
        assert.strictEqual(currentCommentFollowingNode, followingNode);
        const gap = text.slice(options.locEnd(comment), gapEndPos);
        if (gapRegExp.test(gap)) {
          gapEndPos = options.locStart(comment);
        } else {
          break;
        }
      }
      for (const [i, {
        comment
      }] of tiesToBreak.entries()) {
        if (i < indexOfFirstLeadingComment) {
          addTrailingComment(precedingNode, comment);
        } else {
          addLeadingComment(followingNode, comment);
        }
      }
      for (const node of [precedingNode, followingNode]) {
        if (node.comments && node.comments.length > 1) {
          node.comments.sort((a, b) => options.locStart(a) - options.locStart(b));
        }
      }
      tiesToBreak.length = 0;
    }
    function printComment(path, options) {
      const comment = path.getValue();
      comment.printed = true;
      return options.printer.printComment(path, options);
    }
    function findExpressionIndexForComment(quasis, comment, options) {
      const startPos = options.locStart(comment) - 1;
      for (let i = 1; i < quasis.length; ++i) {
        if (startPos < options.locStart(quasis[i])) {
          return i - 1;
        }
      }
      return 0;
    }
    function printLeadingComment(path, options) {
      const comment = path.getValue();
      const parts = [printComment(path, options)];
      const {
        printer,
        originalText,
        locStart,
        locEnd
      } = options;
      const isBlock = printer.isBlockComment && printer.isBlockComment(comment);
      if (isBlock) {
        const lineBreak = hasNewline(originalText, locEnd(comment)) ? hasNewline(originalText, locStart(comment), {
          backwards: true
        }) ? hardline : line : " ";
        parts.push(lineBreak);
      } else {
        parts.push(hardline);
      }
      const index = skipNewline(originalText, skipSpaces(originalText, locEnd(comment)));
      if (index !== false && hasNewline(originalText, index)) {
        parts.push(hardline);
      }
      return parts;
    }
    function printTrailingComment(path, options) {
      const comment = path.getValue();
      const printed = printComment(path, options);
      const {
        printer,
        originalText,
        locStart
      } = options;
      const isBlock = printer.isBlockComment && printer.isBlockComment(comment);
      if (hasNewline(originalText, locStart(comment), {
        backwards: true
      })) {
        const isLineBeforeEmpty = isPreviousLineEmpty(originalText, comment, locStart);
        return lineSuffix([hardline, isLineBeforeEmpty ? hardline : "", printed]);
      }
      let parts = [" ", printed];
      if (!isBlock) {
        parts = [lineSuffix(parts), breakParent];
      }
      return parts;
    }
    function printDanglingComments(path, options, sameIndent, filter2) {
      const parts = [];
      const node = path.getValue();
      if (!node || !node.comments) {
        return "";
      }
      path.each(() => {
        const comment = path.getValue();
        if (!comment.leading && !comment.trailing && (!filter2 || filter2(comment))) {
          parts.push(printComment(path, options));
        }
      }, "comments");
      if (parts.length === 0) {
        return "";
      }
      if (sameIndent) {
        return join2(hardline, parts);
      }
      return indent([hardline, join2(hardline, parts)]);
    }
    function printCommentsSeparately(path, options, ignored) {
      const value = path.getValue();
      if (!value) {
        return {};
      }
      let comments = value.comments || [];
      if (ignored) {
        comments = comments.filter((comment) => !ignored.has(comment));
      }
      const isCursorNode = value === options.cursorNode;
      if (comments.length === 0) {
        const maybeCursor = isCursorNode ? cursor : "";
        return {
          leading: maybeCursor,
          trailing: maybeCursor
        };
      }
      const leadingParts = [];
      const trailingParts = [];
      path.each(() => {
        const comment = path.getValue();
        if (ignored && ignored.has(comment)) {
          return;
        }
        const {
          leading,
          trailing
        } = comment;
        if (leading) {
          leadingParts.push(printLeadingComment(path, options));
        } else if (trailing) {
          trailingParts.push(printTrailingComment(path, options));
        }
      }, "comments");
      if (isCursorNode) {
        leadingParts.unshift(cursor);
        trailingParts.push(cursor);
      }
      return {
        leading: leadingParts,
        trailing: trailingParts
      };
    }
    function printComments(path, doc, options, ignored) {
      const {
        leading,
        trailing
      } = printCommentsSeparately(path, options, ignored);
      if (!leading && !trailing) {
        return doc;
      }
      return [leading, doc, trailing];
    }
    function ensureAllCommentsPrinted(astComments) {
      if (!astComments) {
        return;
      }
      for (const comment of astComments) {
        if (!comment.printed) {
          throw new Error('Comment "' + comment.value.trim() + '" was not printed. Please report this error!');
        }
        delete comment.printed;
      }
    }
    module.exports = {
      attach,
      printComments,
      printCommentsSeparately,
      printDanglingComments,
      getSortedChildNodes,
      ensureAllCommentsPrinted
    };
  }
});
var require_ast_path = __commonJS2({
  "src/common/ast-path.js"(exports, module) {
    "use strict";
    init_define_process();
    var getLast = require_get_last();
    function getNodeHelper(path, count) {
      const stackIndex = getNodeStackIndexHelper(path.stack, count);
      return stackIndex === -1 ? null : path.stack[stackIndex];
    }
    function getNodeStackIndexHelper(stack, count) {
      for (let i = stack.length - 1; i >= 0; i -= 2) {
        const value = stack[i];
        if (value && !Array.isArray(value) && --count < 0) {
          return i;
        }
      }
      return -1;
    }
    var AstPath = class {
      constructor(value) {
        this.stack = [value];
      }
      getName() {
        const {
          stack
        } = this;
        const {
          length
        } = stack;
        if (length > 1) {
          return stack[length - 2];
        }
        return null;
      }
      getValue() {
        return getLast(this.stack);
      }
      getNode() {
        let count = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
        return getNodeHelper(this, count);
      }
      getParentNode() {
        let count = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
        return getNodeHelper(this, count + 1);
      }
      call(callback) {
        const {
          stack
        } = this;
        const {
          length
        } = stack;
        let value = getLast(stack);
        for (var _len3 = arguments.length, names = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          names[_key3 - 1] = arguments[_key3];
        }
        for (const name of names) {
          value = value[name];
          stack.push(name, value);
        }
        const result = callback(this);
        stack.length = length;
        return result;
      }
      callParent(callback) {
        let count = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
        const stackIndex = getNodeStackIndexHelper(this.stack, count + 1);
        const parentValues = this.stack.splice(stackIndex + 1);
        const result = callback(this);
        this.stack.push(...parentValues);
        return result;
      }
      each(callback) {
        const {
          stack
        } = this;
        const {
          length
        } = stack;
        let value = getLast(stack);
        for (var _len4 = arguments.length, names = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          names[_key4 - 1] = arguments[_key4];
        }
        for (const name of names) {
          value = value[name];
          stack.push(name, value);
        }
        for (let i = 0; i < value.length; ++i) {
          stack.push(i, value[i]);
          callback(this, i, value);
          stack.length -= 2;
        }
        stack.length = length;
      }
      map(callback) {
        const result = [];
        for (var _len5 = arguments.length, names = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
          names[_key5 - 1] = arguments[_key5];
        }
        this.each((path, index, value) => {
          result[index] = callback(path, index, value);
        }, ...names);
        return result;
      }
      try(callback) {
        const {
          stack
        } = this;
        const stackBackup = [...stack];
        try {
          return callback();
        } finally {
          stack.length = 0;
          stack.push(...stackBackup);
        }
      }
      match() {
        let stackPointer = this.stack.length - 1;
        let name = null;
        let node = this.stack[stackPointer--];
        for (var _len6 = arguments.length, predicates = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
          predicates[_key6] = arguments[_key6];
        }
        for (const predicate of predicates) {
          if (node === void 0) {
            return false;
          }
          let number = null;
          if (typeof name === "number") {
            number = name;
            name = this.stack[stackPointer--];
            node = this.stack[stackPointer--];
          }
          if (predicate && !predicate(node, name, number)) {
            return false;
          }
          name = this.stack[stackPointer--];
          node = this.stack[stackPointer--];
        }
        return true;
      }
      findAncestor(predicate) {
        let stackPointer = this.stack.length - 1;
        let name = null;
        let node = this.stack[stackPointer--];
        while (node) {
          let number = null;
          if (typeof name === "number") {
            number = name;
            name = this.stack[stackPointer--];
            node = this.stack[stackPointer--];
          }
          if (name !== null && predicate(node, name, number)) {
            return node;
          }
          name = this.stack[stackPointer--];
          node = this.stack[stackPointer--];
        }
      }
    };
    module.exports = AstPath;
  }
});
var require_multiparser = __commonJS2({
  "src/main/multiparser.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      utils: {
        stripTrailingHardline
      }
    } = require_document();
    var {
      normalize: normalize2
    } = require_options();
    var comments = require_comments();
    function printSubtree(path, print, options, printAstToDoc) {
      if (options.printer.embed && options.embeddedLanguageFormatting === "auto") {
        return options.printer.embed(path, print, (text, partialNextOptions, textToDocOptions) => textToDoc(text, partialNextOptions, options, printAstToDoc, textToDocOptions), options);
      }
    }
    function textToDoc(text, partialNextOptions, parentOptions, printAstToDoc) {
      let {
        stripTrailingHardline: shouldStripTrailingHardline = false
      } = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {};
      const nextOptions = normalize2(Object.assign(Object.assign(Object.assign({}, parentOptions), partialNextOptions), {}, {
        parentParser: parentOptions.parser,
        originalText: text
      }), {
        passThrough: true
      });
      const result = require_parser().parse(text, nextOptions);
      const {
        ast
      } = result;
      text = result.text;
      const astComments = ast.comments;
      delete ast.comments;
      comments.attach(astComments, ast, text, nextOptions);
      nextOptions[Symbol.for("comments")] = astComments || [];
      nextOptions[Symbol.for("tokens")] = ast.tokens || [];
      const doc = printAstToDoc(ast, nextOptions);
      comments.ensureAllCommentsPrinted(astComments);
      if (shouldStripTrailingHardline) {
        if (typeof doc === "string") {
          return doc.replace(/(?:\r?\n)*$/, "");
        }
        return stripTrailingHardline(doc);
      }
      return doc;
    }
    module.exports = {
      printSubtree
    };
  }
});
var require_ast_to_doc = __commonJS2({
  "src/main/ast-to-doc.js"(exports, module) {
    "use strict";
    init_define_process();
    var AstPath = require_ast_path();
    var {
      builders: {
        hardline,
        addAlignmentToDoc
      },
      utils: {
        propagateBreaks
      }
    } = require_document();
    var {
      printComments
    } = require_comments();
    var multiparser = require_multiparser();
    function printAstToDoc(ast, options) {
      let alignmentSize = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
      const {
        printer
      } = options;
      if (printer.preprocess) {
        ast = printer.preprocess(ast, options);
      }
      const cache = /* @__PURE__ */ new Map();
      const path = new AstPath(ast);
      let doc = mainPrint();
      if (alignmentSize > 0) {
        doc = addAlignmentToDoc([hardline, doc], alignmentSize, options.tabWidth);
      }
      propagateBreaks(doc);
      return doc;
      function mainPrint(selector, args) {
        if (selector === void 0 || selector === path) {
          return mainPrintInternal(args);
        }
        if (Array.isArray(selector)) {
          return path.call(() => mainPrintInternal(args), ...selector);
        }
        return path.call(() => mainPrintInternal(args), selector);
      }
      function mainPrintInternal(args) {
        const value = path.getValue();
        const shouldCache = value && typeof value === "object" && args === void 0;
        if (shouldCache && cache.has(value)) {
          return cache.get(value);
        }
        const doc2 = callPluginPrintFunction(path, options, mainPrint, args);
        if (shouldCache) {
          cache.set(value, doc2);
        }
        return doc2;
      }
    }
    function printPrettierIgnoredNode(node, options) {
      const {
        originalText,
        [Symbol.for("comments")]: comments,
        locStart,
        locEnd
      } = options;
      const start = locStart(node);
      const end = locEnd(node);
      const printedComments = /* @__PURE__ */ new Set();
      for (const comment of comments) {
        if (locStart(comment) >= start && locEnd(comment) <= end) {
          comment.printed = true;
          printedComments.add(comment);
        }
      }
      return {
        doc: originalText.slice(start, end),
        printedComments
      };
    }
    function callPluginPrintFunction(path, options, printPath, args) {
      const node = path.getValue();
      const {
        printer
      } = options;
      let doc;
      let printedComments;
      if (printer.hasPrettierIgnore && printer.hasPrettierIgnore(path)) {
        ({
          doc,
          printedComments
        } = printPrettierIgnoredNode(node, options));
      } else {
        if (node) {
          try {
            doc = multiparser.printSubtree(path, printPath, options, printAstToDoc);
          } catch (error) {
            if (globalThis.PRETTIER_DEBUG) {
              throw error;
            }
          }
        }
        if (!doc) {
          doc = printer.print(path, options, printPath, args);
        }
      }
      if (!printer.willPrintOwnComments || !printer.willPrintOwnComments(path, options)) {
        doc = printComments(path, doc, options, printedComments);
      }
      return doc;
    }
    module.exports = printAstToDoc;
  }
});
var require_range_util = __commonJS2({
  "src/main/range-util.js"(exports, module) {
    "use strict";
    init_define_process();
    var assert = require_assert();
    var comments = require_comments();
    var isJsonParser = (_ref21) => {
      let {
        parser
      } = _ref21;
      return parser === "json" || parser === "json5" || parser === "json-stringify";
    };
    function findCommonAncestor(startNodeAndParents, endNodeAndParents) {
      const startNodeAndAncestors = [startNodeAndParents.node, ...startNodeAndParents.parentNodes];
      const endNodeAndAncestors = /* @__PURE__ */ new Set([endNodeAndParents.node, ...endNodeAndParents.parentNodes]);
      return startNodeAndAncestors.find((node) => jsonSourceElements.has(node.type) && endNodeAndAncestors.has(node));
    }
    function dropRootParents(parents) {
      let lastParentIndex = parents.length - 1;
      for (; ; ) {
        const parent = parents[lastParentIndex];
        if (parent && (parent.type === "Program" || parent.type === "File")) {
          lastParentIndex--;
        } else {
          break;
        }
      }
      return parents.slice(0, lastParentIndex + 1);
    }
    function findSiblingAncestors(startNodeAndParents, endNodeAndParents, _ref22) {
      let {
        locStart,
        locEnd
      } = _ref22;
      let resultStartNode = startNodeAndParents.node;
      let resultEndNode = endNodeAndParents.node;
      if (resultStartNode === resultEndNode) {
        return {
          startNode: resultStartNode,
          endNode: resultEndNode
        };
      }
      const startNodeStart = locStart(startNodeAndParents.node);
      for (const endParent of dropRootParents(endNodeAndParents.parentNodes)) {
        if (locStart(endParent) >= startNodeStart) {
          resultEndNode = endParent;
        } else {
          break;
        }
      }
      const endNodeEnd = locEnd(endNodeAndParents.node);
      for (const startParent of dropRootParents(startNodeAndParents.parentNodes)) {
        if (locEnd(startParent) <= endNodeEnd) {
          resultStartNode = startParent;
        } else {
          break;
        }
        if (resultStartNode === resultEndNode) {
          break;
        }
      }
      return {
        startNode: resultStartNode,
        endNode: resultEndNode
      };
    }
    function findNodeAtOffset(node, offset, options, predicate) {
      let parentNodes = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : [];
      let type2 = arguments.length > 5 ? arguments[5] : void 0;
      const {
        locStart,
        locEnd
      } = options;
      const start = locStart(node);
      const end = locEnd(node);
      if (offset > end || offset < start || type2 === "rangeEnd" && offset === start || type2 === "rangeStart" && offset === end) {
        return;
      }
      for (const childNode of comments.getSortedChildNodes(node, options)) {
        const childResult = findNodeAtOffset(childNode, offset, options, predicate, [node, ...parentNodes], type2);
        if (childResult) {
          return childResult;
        }
      }
      if (!predicate || predicate(node, parentNodes[0])) {
        return {
          node,
          parentNodes
        };
      }
    }
    function isJsSourceElement(type2, parentType) {
      return parentType !== "DeclareExportDeclaration" && type2 !== "TypeParameterDeclaration" && (type2 === "Directive" || type2 === "TypeAlias" || type2 === "TSExportAssignment" || type2.startsWith("Declare") || type2.startsWith("TSDeclare") || type2.endsWith("Statement") || type2.endsWith("Declaration"));
    }
    var jsonSourceElements = /* @__PURE__ */ new Set(["ObjectExpression", "ArrayExpression", "StringLiteral", "NumericLiteral", "BooleanLiteral", "NullLiteral", "UnaryExpression", "TemplateLiteral"]);
    var graphqlSourceElements = /* @__PURE__ */ new Set(["OperationDefinition", "FragmentDefinition", "VariableDefinition", "TypeExtensionDefinition", "ObjectTypeDefinition", "FieldDefinition", "DirectiveDefinition", "EnumTypeDefinition", "EnumValueDefinition", "InputValueDefinition", "InputObjectTypeDefinition", "SchemaDefinition", "OperationTypeDefinition", "InterfaceTypeDefinition", "UnionTypeDefinition", "ScalarTypeDefinition"]);
    function isSourceElement(opts, node, parentNode) {
      if (!node) {
        return false;
      }
      switch (opts.parser) {
        case "flow":
        case "babel":
        case "babel-flow":
        case "babel-ts":
        case "typescript":
        case "acorn":
        case "espree":
        case "meriyah":
        case "__babel_estree":
          return isJsSourceElement(node.type, parentNode && parentNode.type);
        case "json":
        case "json5":
        case "json-stringify":
          return jsonSourceElements.has(node.type);
        case "graphql":
          return graphqlSourceElements.has(node.kind);
        case "vue":
          return node.tag !== "root";
      }
      return false;
    }
    function calculateRange(text, opts, ast) {
      let {
        rangeStart: start,
        rangeEnd: end,
        locStart,
        locEnd
      } = opts;
      assert.ok(end > start);
      const firstNonWhitespaceCharacterIndex = text.slice(start, end).search(/\S/);
      const isAllWhitespace = firstNonWhitespaceCharacterIndex === -1;
      if (!isAllWhitespace) {
        start += firstNonWhitespaceCharacterIndex;
        for (; end > start; --end) {
          if (/\S/.test(text[end - 1])) {
            break;
          }
        }
      }
      const startNodeAndParents = findNodeAtOffset(ast, start, opts, (node, parentNode) => isSourceElement(opts, node, parentNode), [], "rangeStart");
      const endNodeAndParents = isAllWhitespace ? startNodeAndParents : findNodeAtOffset(ast, end, opts, (node) => isSourceElement(opts, node), [], "rangeEnd");
      if (!startNodeAndParents || !endNodeAndParents) {
        return {
          rangeStart: 0,
          rangeEnd: 0
        };
      }
      let startNode;
      let endNode;
      if (isJsonParser(opts)) {
        const commonAncestor = findCommonAncestor(startNodeAndParents, endNodeAndParents);
        startNode = commonAncestor;
        endNode = commonAncestor;
      } else {
        ({
          startNode,
          endNode
        } = findSiblingAncestors(startNodeAndParents, endNodeAndParents, opts));
      }
      return {
        rangeStart: Math.min(locStart(startNode), locStart(endNode)),
        rangeEnd: Math.max(locEnd(startNode), locEnd(endNode))
      };
    }
    module.exports = {
      calculateRange,
      findNodeAtOffset
    };
  }
});
var require_core = __commonJS2({
  "src/main/core.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      diffArrays
    } = require_array();
    var {
      printer: {
        printDocToString
      },
      debug: {
        printDocToDebug
      }
    } = require_document();
    var {
      getAlignmentSize
    } = require_util();
    var {
      guessEndOfLine,
      convertEndOfLineToChars,
      countEndOfLineChars,
      normalizeEndOfLine
    } = require_end_of_line();
    var normalizeOptions = require_options().normalize;
    var massageAST = require_massage_ast();
    var comments = require_comments();
    var parser = require_parser();
    var printAstToDoc = require_ast_to_doc();
    var rangeUtil = require_range_util();
    var BOM = "\uFEFF";
    var CURSOR = Symbol("cursor");
    function attachComments(text, ast, opts) {
      const astComments = ast.comments;
      if (astComments) {
        delete ast.comments;
        comments.attach(astComments, ast, text, opts);
      }
      opts[Symbol.for("comments")] = astComments || [];
      opts[Symbol.for("tokens")] = ast.tokens || [];
      opts.originalText = text;
      return astComments;
    }
    function coreFormat(originalText, opts) {
      let addAlignmentSize = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
      if (!originalText || originalText.trim().length === 0) {
        return {
          formatted: "",
          cursorOffset: -1,
          comments: []
        };
      }
      const {
        ast,
        text
      } = parser.parse(originalText, opts);
      if (opts.cursorOffset >= 0) {
        const nodeResult = rangeUtil.findNodeAtOffset(ast, opts.cursorOffset, opts);
        if (nodeResult && nodeResult.node) {
          opts.cursorNode = nodeResult.node;
        }
      }
      if (opts.handleAst) {
        opts.handleAst(ast, text);
      }
      const astComments = attachComments(text, ast, opts);
      const doc = printAstToDoc(ast, opts, addAlignmentSize);
      const result = printDocToString(doc, opts);
      comments.ensureAllCommentsPrinted(astComments);
      if (addAlignmentSize > 0) {
        const trimmed = result.formatted.trim();
        if (result.cursorNodeStart !== void 0) {
          result.cursorNodeStart -= result.formatted.indexOf(trimmed);
        }
        result.formatted = trimmed + convertEndOfLineToChars(opts.endOfLine);
      }
      if (opts.cursorOffset >= 0) {
        let oldCursorNodeStart;
        let oldCursorNodeText;
        let cursorOffsetRelativeToOldCursorNode;
        let newCursorNodeStart;
        let newCursorNodeText;
        if (opts.cursorNode && result.cursorNodeText) {
          oldCursorNodeStart = opts.locStart(opts.cursorNode);
          oldCursorNodeText = text.slice(oldCursorNodeStart, opts.locEnd(opts.cursorNode));
          cursorOffsetRelativeToOldCursorNode = opts.cursorOffset - oldCursorNodeStart;
          newCursorNodeStart = result.cursorNodeStart;
          newCursorNodeText = result.cursorNodeText;
        } else {
          oldCursorNodeStart = 0;
          oldCursorNodeText = text;
          cursorOffsetRelativeToOldCursorNode = opts.cursorOffset;
          newCursorNodeStart = 0;
          newCursorNodeText = result.formatted;
        }
        if (oldCursorNodeText === newCursorNodeText) {
          return {
            formatted: result.formatted,
            cursorOffset: newCursorNodeStart + cursorOffsetRelativeToOldCursorNode,
            comments: astComments
          };
        }
        const oldCursorNodeCharArray = [...oldCursorNodeText];
        oldCursorNodeCharArray.splice(cursorOffsetRelativeToOldCursorNode, 0, CURSOR);
        const newCursorNodeCharArray = [...newCursorNodeText];
        const cursorNodeDiff = diffArrays(oldCursorNodeCharArray, newCursorNodeCharArray);
        let cursorOffset = newCursorNodeStart;
        for (const entry of cursorNodeDiff) {
          if (entry.removed) {
            if (entry.value.includes(CURSOR)) {
              break;
            }
          } else {
            cursorOffset += entry.count;
          }
        }
        return {
          formatted: result.formatted,
          cursorOffset,
          comments: astComments
        };
      }
      return {
        formatted: result.formatted,
        cursorOffset: -1,
        comments: astComments
      };
    }
    function formatRange(originalText, opts) {
      const {
        ast,
        text
      } = parser.parse(originalText, opts);
      const {
        rangeStart,
        rangeEnd
      } = rangeUtil.calculateRange(text, opts, ast);
      const rangeString = text.slice(rangeStart, rangeEnd);
      const rangeStart2 = Math.min(rangeStart, text.lastIndexOf("\n", rangeStart) + 1);
      const indentString = text.slice(rangeStart2, rangeStart).match(/^\s*/)[0];
      const alignmentSize = getAlignmentSize(indentString, opts.tabWidth);
      const rangeResult = coreFormat(rangeString, Object.assign(Object.assign({}, opts), {}, {
        rangeStart: 0,
        rangeEnd: Number.POSITIVE_INFINITY,
        cursorOffset: opts.cursorOffset > rangeStart && opts.cursorOffset <= rangeEnd ? opts.cursorOffset - rangeStart : -1,
        endOfLine: "lf"
      }), alignmentSize);
      const rangeTrimmed = rangeResult.formatted.trimEnd();
      let {
        cursorOffset
      } = opts;
      if (cursorOffset > rangeEnd) {
        cursorOffset += rangeTrimmed.length - rangeString.length;
      } else if (rangeResult.cursorOffset >= 0) {
        cursorOffset = rangeResult.cursorOffset + rangeStart;
      }
      let formatted = text.slice(0, rangeStart) + rangeTrimmed + text.slice(rangeEnd);
      if (opts.endOfLine !== "lf") {
        const eol = convertEndOfLineToChars(opts.endOfLine);
        if (cursorOffset >= 0 && eol === "\r\n") {
          cursorOffset += countEndOfLineChars(formatted.slice(0, cursorOffset), "\n");
        }
        formatted = formatted.replace(/\n/g, eol);
      }
      return {
        formatted,
        cursorOffset,
        comments: rangeResult.comments
      };
    }
    function ensureIndexInText(text, index, defaultValue) {
      if (typeof index !== "number" || Number.isNaN(index) || index < 0 || index > text.length) {
        return defaultValue;
      }
      return index;
    }
    function normalizeIndexes(text, options) {
      let {
        cursorOffset,
        rangeStart,
        rangeEnd
      } = options;
      cursorOffset = ensureIndexInText(text, cursorOffset, -1);
      rangeStart = ensureIndexInText(text, rangeStart, 0);
      rangeEnd = ensureIndexInText(text, rangeEnd, text.length);
      return Object.assign(Object.assign({}, options), {}, {
        cursorOffset,
        rangeStart,
        rangeEnd
      });
    }
    function normalizeInputAndOptions(text, options) {
      let {
        cursorOffset,
        rangeStart,
        rangeEnd,
        endOfLine
      } = normalizeIndexes(text, options);
      const hasBOM = text.charAt(0) === BOM;
      if (hasBOM) {
        text = text.slice(1);
        cursorOffset--;
        rangeStart--;
        rangeEnd--;
      }
      if (endOfLine === "auto") {
        endOfLine = guessEndOfLine(text);
      }
      if (text.includes("\r")) {
        const countCrlfBefore = (index) => countEndOfLineChars(text.slice(0, Math.max(index, 0)), "\r\n");
        cursorOffset -= countCrlfBefore(cursorOffset);
        rangeStart -= countCrlfBefore(rangeStart);
        rangeEnd -= countCrlfBefore(rangeEnd);
        text = normalizeEndOfLine(text);
      }
      return {
        hasBOM,
        text,
        options: normalizeIndexes(text, Object.assign(Object.assign({}, options), {}, {
          cursorOffset,
          rangeStart,
          rangeEnd,
          endOfLine
        }))
      };
    }
    function hasPragma(text, options) {
      const selectedParser = parser.resolveParser(options);
      return !selectedParser.hasPragma || selectedParser.hasPragma(text);
    }
    function formatWithCursor(originalText, originalOptions) {
      let {
        hasBOM,
        text,
        options
      } = normalizeInputAndOptions(originalText, normalizeOptions(originalOptions));
      options.handleAst = originalOptions.handleAst;
      if (options.rangeStart >= options.rangeEnd && text !== "" || options.requirePragma && !hasPragma(text, options)) {
        return {
          formatted: originalText,
          cursorOffset: originalOptions.cursorOffset,
          comments: []
        };
      }
      let result;
      if (options.rangeStart > 0 || options.rangeEnd < text.length) {
        result = formatRange(text, options);
      } else {
        if (!options.requirePragma && options.insertPragma && options.printer.insertPragma && !hasPragma(text, options)) {
          text = options.printer.insertPragma(text);
        }
        result = coreFormat(text, options);
      }
      if (hasBOM) {
        result.formatted = BOM + result.formatted;
        if (result.cursorOffset >= 0) {
          result.cursorOffset++;
        }
      }
      return result;
    }
    module.exports = {
      formatWithCursor,
      parse(originalText, originalOptions, massage) {
        const {
          text,
          options
        } = normalizeInputAndOptions(originalText, normalizeOptions(originalOptions));
        const parsed = parser.parse(text, options);
        if (massage) {
          parsed.ast = massageAST(parsed.ast, options);
        }
        return parsed;
      },
      formatAST(ast, options) {
        options = normalizeOptions(options);
        const doc = printAstToDoc(ast, options);
        return printDocToString(doc, options);
      },
      formatDoc(doc, options) {
        return formatWithCursor(printDocToDebug(doc), Object.assign(Object.assign({}, options), {}, {
          parser: "__js_expression"
        })).formatted;
      },
      printToDoc(originalText, options) {
        options = normalizeOptions(options);
        const {
          ast,
          text
        } = parser.parse(originalText, options);
        attachComments(text, ast, options);
        return printAstToDoc(ast, options);
      },
      printDocToString(doc, options) {
        return printDocToString(doc, normalizeOptions(options));
      }
    };
  }
});
var require_util_shared = __commonJS2({
  "src/common/util-shared.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      getMaxContinuousCount,
      getStringWidth,
      getAlignmentSize,
      getIndentSize,
      skip,
      skipWhitespace,
      skipSpaces,
      skipNewline,
      skipToLineEnd,
      skipEverythingButNewLine,
      skipInlineComment,
      skipTrailingComment,
      hasNewline,
      hasNewlineInRange,
      hasSpaces,
      isNextLineEmpty,
      isNextLineEmptyAfterIndex,
      isPreviousLineEmpty,
      getNextNonSpaceNonCommentCharacterIndex,
      makeString,
      addLeadingComment,
      addDanglingComment,
      addTrailingComment
    } = require_util();
    module.exports = {
      getMaxContinuousCount,
      getStringWidth,
      getAlignmentSize,
      getIndentSize,
      skip,
      skipWhitespace,
      skipSpaces,
      skipNewline,
      skipToLineEnd,
      skipEverythingButNewLine,
      skipInlineComment,
      skipTrailingComment,
      hasNewline,
      hasNewlineInRange,
      hasSpaces,
      isNextLineEmpty,
      isNextLineEmptyAfterIndex,
      isPreviousLineEmpty,
      getNextNonSpaceNonCommentCharacterIndex,
      makeString,
      addLeadingComment,
      addDanglingComment,
      addTrailingComment
    };
  }
});
var require_create_language = __commonJS2({
  "src/utils/create-language.js"(exports, module) {
    "use strict";
    init_define_process();
    module.exports = function(linguistData, override) {
      const {
        languageId
      } = linguistData, rest = _objectWithoutProperties(linguistData, _excluded3);
      return Object.assign(Object.assign({
        linguistLanguageId: languageId
      }, rest), override(linguistData));
    };
  }
});
var require_ast = __commonJS2({
  "node_modules/esutils/lib/ast.js"(exports, module) {
    init_define_process();
    (function() {
      "use strict";
      function isExpression(node) {
        if (node == null) {
          return false;
        }
        switch (node.type) {
          case "ArrayExpression":
          case "AssignmentExpression":
          case "BinaryExpression":
          case "CallExpression":
          case "ConditionalExpression":
          case "FunctionExpression":
          case "Identifier":
          case "Literal":
          case "LogicalExpression":
          case "MemberExpression":
          case "NewExpression":
          case "ObjectExpression":
          case "SequenceExpression":
          case "ThisExpression":
          case "UnaryExpression":
          case "UpdateExpression":
            return true;
        }
        return false;
      }
      function isIterationStatement(node) {
        if (node == null) {
          return false;
        }
        switch (node.type) {
          case "DoWhileStatement":
          case "ForInStatement":
          case "ForStatement":
          case "WhileStatement":
            return true;
        }
        return false;
      }
      function isStatement(node) {
        if (node == null) {
          return false;
        }
        switch (node.type) {
          case "BlockStatement":
          case "BreakStatement":
          case "ContinueStatement":
          case "DebuggerStatement":
          case "DoWhileStatement":
          case "EmptyStatement":
          case "ExpressionStatement":
          case "ForInStatement":
          case "ForStatement":
          case "IfStatement":
          case "LabeledStatement":
          case "ReturnStatement":
          case "SwitchStatement":
          case "ThrowStatement":
          case "TryStatement":
          case "VariableDeclaration":
          case "WhileStatement":
          case "WithStatement":
            return true;
        }
        return false;
      }
      function isSourceElement(node) {
        return isStatement(node) || node != null && node.type === "FunctionDeclaration";
      }
      function trailingStatement(node) {
        switch (node.type) {
          case "IfStatement":
            if (node.alternate != null) {
              return node.alternate;
            }
            return node.consequent;
          case "LabeledStatement":
          case "ForStatement":
          case "ForInStatement":
          case "WhileStatement":
          case "WithStatement":
            return node.body;
        }
        return null;
      }
      function isProblematicIfStatement(node) {
        var current;
        if (node.type !== "IfStatement") {
          return false;
        }
        if (node.alternate == null) {
          return false;
        }
        current = node.consequent;
        do {
          if (current.type === "IfStatement") {
            if (current.alternate == null) {
              return true;
            }
          }
          current = trailingStatement(current);
        } while (current);
        return false;
      }
      module.exports = {
        isExpression,
        isStatement,
        isIterationStatement,
        isSourceElement,
        isProblematicIfStatement,
        trailingStatement
      };
    })();
  }
});
var require_code = __commonJS2({
  "node_modules/esutils/lib/code.js"(exports, module) {
    init_define_process();
    (function() {
      "use strict";
      var ES6Regex, ES5Regex, NON_ASCII_WHITESPACES, IDENTIFIER_START, IDENTIFIER_PART, ch;
      ES5Regex = {
        NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
        NonAsciiIdentifierPart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/
      };
      ES6Regex = {
        NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,
        NonAsciiIdentifierPart: /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
      };
      function isDecimalDigit(ch2) {
        return 48 <= ch2 && ch2 <= 57;
      }
      function isHexDigit(ch2) {
        return 48 <= ch2 && ch2 <= 57 || 97 <= ch2 && ch2 <= 102 || 65 <= ch2 && ch2 <= 70;
      }
      function isOctalDigit(ch2) {
        return ch2 >= 48 && ch2 <= 55;
      }
      NON_ASCII_WHITESPACES = [5760, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200, 8201, 8202, 8239, 8287, 12288, 65279];
      function isWhiteSpace(ch2) {
        return ch2 === 32 || ch2 === 9 || ch2 === 11 || ch2 === 12 || ch2 === 160 || ch2 >= 5760 && NON_ASCII_WHITESPACES.indexOf(ch2) >= 0;
      }
      function isLineTerminator(ch2) {
        return ch2 === 10 || ch2 === 13 || ch2 === 8232 || ch2 === 8233;
      }
      function fromCodePoint(cp) {
        if (cp <= 65535) {
          return String.fromCharCode(cp);
        }
        var cu1 = String.fromCharCode(Math.floor((cp - 65536) / 1024) + 55296);
        var cu2 = String.fromCharCode((cp - 65536) % 1024 + 56320);
        return cu1 + cu2;
      }
      IDENTIFIER_START = new Array(128);
      for (ch = 0; ch < 128; ++ch) {
        IDENTIFIER_START[ch] = ch >= 97 && ch <= 122 || ch >= 65 && ch <= 90 || ch === 36 || ch === 95;
      }
      IDENTIFIER_PART = new Array(128);
      for (ch = 0; ch < 128; ++ch) {
        IDENTIFIER_PART[ch] = ch >= 97 && ch <= 122 || ch >= 65 && ch <= 90 || ch >= 48 && ch <= 57 || ch === 36 || ch === 95;
      }
      function isIdentifierStartES5(ch2) {
        return ch2 < 128 ? IDENTIFIER_START[ch2] : ES5Regex.NonAsciiIdentifierStart.test(fromCodePoint(ch2));
      }
      function isIdentifierPartES5(ch2) {
        return ch2 < 128 ? IDENTIFIER_PART[ch2] : ES5Regex.NonAsciiIdentifierPart.test(fromCodePoint(ch2));
      }
      function isIdentifierStartES6(ch2) {
        return ch2 < 128 ? IDENTIFIER_START[ch2] : ES6Regex.NonAsciiIdentifierStart.test(fromCodePoint(ch2));
      }
      function isIdentifierPartES6(ch2) {
        return ch2 < 128 ? IDENTIFIER_PART[ch2] : ES6Regex.NonAsciiIdentifierPart.test(fromCodePoint(ch2));
      }
      module.exports = {
        isDecimalDigit,
        isHexDigit,
        isOctalDigit,
        isWhiteSpace,
        isLineTerminator,
        isIdentifierStartES5,
        isIdentifierPartES5,
        isIdentifierStartES6,
        isIdentifierPartES6
      };
    })();
  }
});
var require_keyword = __commonJS2({
  "node_modules/esutils/lib/keyword.js"(exports, module) {
    init_define_process();
    (function() {
      "use strict";
      var code = require_code();
      function isStrictModeReservedWordES6(id) {
        switch (id) {
          case "implements":
          case "interface":
          case "package":
          case "private":
          case "protected":
          case "public":
          case "static":
          case "let":
            return true;
          default:
            return false;
        }
      }
      function isKeywordES5(id, strict) {
        if (!strict && id === "yield") {
          return false;
        }
        return isKeywordES6(id, strict);
      }
      function isKeywordES6(id, strict) {
        if (strict && isStrictModeReservedWordES6(id)) {
          return true;
        }
        switch (id.length) {
          case 2:
            return id === "if" || id === "in" || id === "do";
          case 3:
            return id === "var" || id === "for" || id === "new" || id === "try";
          case 4:
            return id === "this" || id === "else" || id === "case" || id === "void" || id === "with" || id === "enum";
          case 5:
            return id === "while" || id === "break" || id === "catch" || id === "throw" || id === "const" || id === "yield" || id === "class" || id === "super";
          case 6:
            return id === "return" || id === "typeof" || id === "delete" || id === "switch" || id === "export" || id === "import";
          case 7:
            return id === "default" || id === "finally" || id === "extends";
          case 8:
            return id === "function" || id === "continue" || id === "debugger";
          case 10:
            return id === "instanceof";
          default:
            return false;
        }
      }
      function isReservedWordES5(id, strict) {
        return id === "null" || id === "true" || id === "false" || isKeywordES5(id, strict);
      }
      function isReservedWordES6(id, strict) {
        return id === "null" || id === "true" || id === "false" || isKeywordES6(id, strict);
      }
      function isRestrictedWord(id) {
        return id === "eval" || id === "arguments";
      }
      function isIdentifierNameES5(id) {
        var i, iz, ch;
        if (id.length === 0) {
          return false;
        }
        ch = id.charCodeAt(0);
        if (!code.isIdentifierStartES5(ch)) {
          return false;
        }
        for (i = 1, iz = id.length; i < iz; ++i) {
          ch = id.charCodeAt(i);
          if (!code.isIdentifierPartES5(ch)) {
            return false;
          }
        }
        return true;
      }
      function decodeUtf16(lead, trail) {
        return (lead - 55296) * 1024 + (trail - 56320) + 65536;
      }
      function isIdentifierNameES6(id) {
        var i, iz, ch, lowCh, check;
        if (id.length === 0) {
          return false;
        }
        check = code.isIdentifierStartES6;
        for (i = 0, iz = id.length; i < iz; ++i) {
          ch = id.charCodeAt(i);
          if (55296 <= ch && ch <= 56319) {
            ++i;
            if (i >= iz) {
              return false;
            }
            lowCh = id.charCodeAt(i);
            if (!(56320 <= lowCh && lowCh <= 57343)) {
              return false;
            }
            ch = decodeUtf16(ch, lowCh);
          }
          if (!check(ch)) {
            return false;
          }
          check = code.isIdentifierPartES6;
        }
        return true;
      }
      function isIdentifierES5(id, strict) {
        return isIdentifierNameES5(id) && !isReservedWordES5(id, strict);
      }
      function isIdentifierES6(id, strict) {
        return isIdentifierNameES6(id) && !isReservedWordES6(id, strict);
      }
      module.exports = {
        isKeywordES5,
        isKeywordES6,
        isReservedWordES5,
        isReservedWordES6,
        isRestrictedWord,
        isIdentifierNameES5,
        isIdentifierNameES6,
        isIdentifierES5,
        isIdentifierES6
      };
    })();
  }
});
var require_utils2 = __commonJS2({
  "node_modules/esutils/lib/utils.js"(exports) {
    init_define_process();
    (function() {
      "use strict";
      exports.ast = require_ast();
      exports.code = require_code();
      exports.keyword = require_keyword();
    })();
  }
});
var require_is_block_comment = __commonJS2({
  "src/language-js/utils/is-block-comment.js"(exports, module) {
    "use strict";
    init_define_process();
    var BLOCK_COMMENT_TYPES = /* @__PURE__ */ new Set(["Block", "CommentBlock", "MultiLine"]);
    var isBlockComment = (comment) => BLOCK_COMMENT_TYPES.has(comment === null || comment === void 0 ? void 0 : comment.type);
    module.exports = isBlockComment;
  }
});
var require_is_node_matches = __commonJS2({
  "src/language-js/utils/is-node-matches.js"(exports, module) {
    "use strict";
    init_define_process();
    function isNodeMatchesNameOrPath(node, nameOrPath) {
      const names = nameOrPath.split(".");
      for (let index = names.length - 1; index >= 0; index--) {
        const name = names[index];
        if (index === 0) {
          return node.type === "Identifier" && node.name === name;
        }
        if (node.type !== "MemberExpression" || node.optional || node.computed || node.property.type !== "Identifier" || node.property.name !== name) {
          return false;
        }
        node = node.object;
      }
    }
    function isNodeMatches(node, nameOrPaths) {
      return nameOrPaths.some((nameOrPath) => isNodeMatchesNameOrPath(node, nameOrPath));
    }
    module.exports = isNodeMatches;
  }
});
var require_utils3 = __commonJS2({
  "src/language-js/utils/index.js"(exports, module) {
    "use strict";
    init_define_process();
    var isIdentifierName = require_utils2().keyword.isIdentifierNameES5;
    var {
      getLast,
      hasNewline,
      skipWhitespace,
      isNonEmptyArray,
      isNextLineEmptyAfterIndex,
      getStringWidth
    } = require_util();
    var {
      locStart,
      locEnd,
      hasSameLocStart
    } = require_loc();
    var isBlockComment = require_is_block_comment();
    var isNodeMatches = require_is_node_matches();
    var NON_LINE_TERMINATING_WHITE_SPACE = "(?:(?=.)\\s)";
    var FLOW_SHORTHAND_ANNOTATION = new RegExp(`^${NON_LINE_TERMINATING_WHITE_SPACE}*:`);
    var FLOW_ANNOTATION = new RegExp(`^${NON_LINE_TERMINATING_WHITE_SPACE}*::`);
    function hasFlowShorthandAnnotationComment(node) {
      var _node$extra, _node$trailingComment;
      return ((_node$extra = node.extra) === null || _node$extra === void 0 ? void 0 : _node$extra.parenthesized) && isBlockComment((_node$trailingComment = node.trailingComments) === null || _node$trailingComment === void 0 ? void 0 : _node$trailingComment[0]) && FLOW_SHORTHAND_ANNOTATION.test(node.trailingComments[0].value);
    }
    function hasFlowAnnotationComment(comments) {
      const firstComment = comments === null || comments === void 0 ? void 0 : comments[0];
      return isBlockComment(firstComment) && FLOW_ANNOTATION.test(firstComment.value);
    }
    function hasNode(node, fn) {
      if (!node || typeof node !== "object") {
        return false;
      }
      if (Array.isArray(node)) {
        return node.some((value) => hasNode(value, fn));
      }
      const result = fn(node);
      return typeof result === "boolean" ? result : Object.values(node).some((value) => hasNode(value, fn));
    }
    function hasNakedLeftSide(node) {
      return node.type === "AssignmentExpression" || node.type === "BinaryExpression" || node.type === "LogicalExpression" || node.type === "NGPipeExpression" || node.type === "ConditionalExpression" || isCallExpression(node) || isMemberExpression(node) || node.type === "SequenceExpression" || node.type === "TaggedTemplateExpression" || node.type === "BindExpression" || node.type === "UpdateExpression" && !node.prefix || isTSTypeExpression(node) || node.type === "TSNonNullExpression";
    }
    function getLeftSide(node) {
      var _ref23, _ref24, _ref25, _ref26, _ref27, _node$left;
      if (node.expressions) {
        return node.expressions[0];
      }
      return (_ref23 = (_ref24 = (_ref25 = (_ref26 = (_ref27 = (_node$left = node.left) !== null && _node$left !== void 0 ? _node$left : node.test) !== null && _ref27 !== void 0 ? _ref27 : node.callee) !== null && _ref26 !== void 0 ? _ref26 : node.object) !== null && _ref25 !== void 0 ? _ref25 : node.tag) !== null && _ref24 !== void 0 ? _ref24 : node.argument) !== null && _ref23 !== void 0 ? _ref23 : node.expression;
    }
    function getLeftSidePathName(path, node) {
      if (node.expressions) {
        return ["expressions", 0];
      }
      if (node.left) {
        return ["left"];
      }
      if (node.test) {
        return ["test"];
      }
      if (node.object) {
        return ["object"];
      }
      if (node.callee) {
        return ["callee"];
      }
      if (node.tag) {
        return ["tag"];
      }
      if (node.argument) {
        return ["argument"];
      }
      if (node.expression) {
        return ["expression"];
      }
      throw new Error("Unexpected node has no left side.");
    }
    function createTypeCheckFunction(types) {
      types = new Set(types);
      return (node) => types.has(node === null || node === void 0 ? void 0 : node.type);
    }
    var isLineComment = createTypeCheckFunction(["Line", "CommentLine", "SingleLine", "HashbangComment", "HTMLOpen", "HTMLClose"]);
    var isExportDeclaration = createTypeCheckFunction(["ExportDefaultDeclaration", "ExportDefaultSpecifier", "DeclareExportDeclaration", "ExportNamedDeclaration", "ExportAllDeclaration"]);
    function getParentExportDeclaration(path) {
      const parentNode = path.getParentNode();
      if (path.getName() === "declaration" && isExportDeclaration(parentNode)) {
        return parentNode;
      }
      return null;
    }
    var isLiteral = createTypeCheckFunction(["BooleanLiteral", "DirectiveLiteral", "Literal", "NullLiteral", "NumericLiteral", "BigIntLiteral", "DecimalLiteral", "RegExpLiteral", "StringLiteral", "TemplateLiteral", "TSTypeLiteral", "JSXText"]);
    function isNumericLiteral(node) {
      return node.type === "NumericLiteral" || node.type === "Literal" && typeof node.value === "number";
    }
    function isSignedNumericLiteral(node) {
      return node.type === "UnaryExpression" && (node.operator === "+" || node.operator === "-") && isNumericLiteral(node.argument);
    }
    function isStringLiteral(node) {
      return node.type === "StringLiteral" || node.type === "Literal" && typeof node.value === "string";
    }
    var isObjectType = createTypeCheckFunction(["ObjectTypeAnnotation", "TSTypeLiteral", "TSMappedType"]);
    var isFunctionOrArrowExpression = createTypeCheckFunction(["FunctionExpression", "ArrowFunctionExpression"]);
    function isFunctionOrArrowExpressionWithBody(node) {
      return node.type === "FunctionExpression" || node.type === "ArrowFunctionExpression" && node.body.type === "BlockStatement";
    }
    function isAngularTestWrapper(node) {
      return isCallExpression(node) && node.callee.type === "Identifier" && ["async", "inject", "fakeAsync", "waitForAsync"].includes(node.callee.name);
    }
    var isJsxNode = createTypeCheckFunction(["JSXElement", "JSXFragment"]);
    function isTheOnlyJsxElementInMarkdown(options, path) {
      if (options.parentParser !== "markdown" && options.parentParser !== "mdx") {
        return false;
      }
      const node = path.getNode();
      if (!node.expression || !isJsxNode(node.expression)) {
        return false;
      }
      const parent = path.getParentNode();
      return parent.type === "Program" && parent.body.length === 1;
    }
    function isGetterOrSetter(node) {
      return node.kind === "get" || node.kind === "set";
    }
    function isFunctionNotation(node) {
      return isGetterOrSetter(node) || hasSameLocStart(node, node.value);
    }
    function isObjectTypePropertyAFunction(node) {
      return (node.type === "ObjectTypeProperty" || node.type === "ObjectTypeInternalSlot") && node.value.type === "FunctionTypeAnnotation" && !node.static && !isFunctionNotation(node);
    }
    function isTypeAnnotationAFunction(node) {
      return (node.type === "TypeAnnotation" || node.type === "TSTypeAnnotation") && node.typeAnnotation.type === "FunctionTypeAnnotation" && !node.static && !hasSameLocStart(node, node.typeAnnotation);
    }
    var isBinaryish = createTypeCheckFunction(["BinaryExpression", "LogicalExpression", "NGPipeExpression"]);
    function isMemberish(node) {
      return isMemberExpression(node) || node.type === "BindExpression" && Boolean(node.object);
    }
    var simpleTypeAnnotations = /* @__PURE__ */ new Set(["AnyTypeAnnotation", "TSAnyKeyword", "NullLiteralTypeAnnotation", "TSNullKeyword", "ThisTypeAnnotation", "TSThisType", "NumberTypeAnnotation", "TSNumberKeyword", "VoidTypeAnnotation", "TSVoidKeyword", "BooleanTypeAnnotation", "TSBooleanKeyword", "BigIntTypeAnnotation", "TSBigIntKeyword", "SymbolTypeAnnotation", "TSSymbolKeyword", "StringTypeAnnotation", "TSStringKeyword", "BooleanLiteralTypeAnnotation", "StringLiteralTypeAnnotation", "BigIntLiteralTypeAnnotation", "NumberLiteralTypeAnnotation", "TSLiteralType", "TSTemplateLiteralType", "EmptyTypeAnnotation", "MixedTypeAnnotation", "TSNeverKeyword", "TSObjectKeyword", "TSUndefinedKeyword", "TSUnknownKeyword"]);
    function isSimpleType(node) {
      if (!node) {
        return false;
      }
      if ((node.type === "GenericTypeAnnotation" || node.type === "TSTypeReference") && !node.typeParameters) {
        return true;
      }
      if (simpleTypeAnnotations.has(node.type)) {
        return true;
      }
      return false;
    }
    function isUnitTestSetUp(node) {
      const unitTestSetUpRe = /^(?:before|after)(?:Each|All)$/;
      return node.callee.type === "Identifier" && unitTestSetUpRe.test(node.callee.name) && node.arguments.length === 1;
    }
    var testCallCalleePatterns = ["it", "it.only", "it.skip", "describe", "describe.only", "describe.skip", "test", "test.only", "test.skip", "test.step", "test.describe", "test.describe.only", "test.describe.parallel", "test.describe.parallel.only", "test.describe.serial", "test.describe.serial.only", "skip", "xit", "xdescribe", "xtest", "fit", "fdescribe", "ftest"];
    function isTestCallCallee(node) {
      return isNodeMatches(node, testCallCalleePatterns);
    }
    function isTestCall(node, parent) {
      if (node.type !== "CallExpression") {
        return false;
      }
      if (node.arguments.length === 1) {
        if (isAngularTestWrapper(node) && parent && isTestCall(parent)) {
          return isFunctionOrArrowExpression(node.arguments[0]);
        }
        if (isUnitTestSetUp(node)) {
          return isAngularTestWrapper(node.arguments[0]);
        }
      } else if (node.arguments.length === 2 || node.arguments.length === 3) {
        if ((node.arguments[0].type === "TemplateLiteral" || isStringLiteral(node.arguments[0])) && isTestCallCallee(node.callee)) {
          if (node.arguments[2] && !isNumericLiteral(node.arguments[2])) {
            return false;
          }
          return (node.arguments.length === 2 ? isFunctionOrArrowExpression(node.arguments[1]) : isFunctionOrArrowExpressionWithBody(node.arguments[1]) && getFunctionParameters(node.arguments[1]).length <= 1) || isAngularTestWrapper(node.arguments[1]);
        }
      }
      return false;
    }
    var isCallExpression = createTypeCheckFunction(["CallExpression", "OptionalCallExpression"]);
    var isMemberExpression = createTypeCheckFunction(["MemberExpression", "OptionalMemberExpression"]);
    function isSimpleTemplateLiteral(node) {
      let expressionsKey = "expressions";
      if (node.type === "TSTemplateLiteralType") {
        expressionsKey = "types";
      }
      const expressions = node[expressionsKey];
      if (expressions.length === 0) {
        return false;
      }
      return expressions.every((expr) => {
        if (hasComment(expr)) {
          return false;
        }
        if (expr.type === "Identifier" || expr.type === "ThisExpression") {
          return true;
        }
        if (isMemberExpression(expr)) {
          let head = expr;
          while (isMemberExpression(head)) {
            if (head.property.type !== "Identifier" && head.property.type !== "Literal" && head.property.type !== "StringLiteral" && head.property.type !== "NumericLiteral") {
              return false;
            }
            head = head.object;
            if (hasComment(head)) {
              return false;
            }
          }
          if (head.type === "Identifier" || head.type === "ThisExpression") {
            return true;
          }
          return false;
        }
        return false;
      });
    }
    function getTypeScriptMappedTypeModifier(tokenNode, keyword) {
      if (tokenNode === "+" || tokenNode === "-") {
        return tokenNode + keyword;
      }
      return keyword;
    }
    function isFlowAnnotationComment(text, typeAnnotation) {
      const start = locStart(typeAnnotation);
      const end = skipWhitespace(text, locEnd(typeAnnotation));
      return end !== false && text.slice(start, start + 2) === "/*" && text.slice(end, end + 2) === "*/";
    }
    function hasLeadingOwnLineComment(text, node) {
      if (isJsxNode(node)) {
        return hasNodeIgnoreComment(node);
      }
      return hasComment(node, CommentCheckFlags.Leading, (comment) => hasNewline(text, locEnd(comment)));
    }
    function isStringPropSafeToUnquote(node, options) {
      return options.parser !== "json" && isStringLiteral(node.key) && rawText(node.key).slice(1, -1) === node.key.value && (isIdentifierName(node.key.value) && !(options.parser === "babel-ts" && node.type === "ClassProperty" || options.parser === "typescript" && node.type === "PropertyDefinition") || isSimpleNumber(node.key.value) && String(Number(node.key.value)) === node.key.value && (options.parser === "babel" || options.parser === "acorn" || options.parser === "espree" || options.parser === "meriyah" || options.parser === "__babel_estree"));
    }
    function isSimpleNumber(numberString) {
      return /^(?:\d+|\d+\.\d+)$/.test(numberString);
    }
    function isJestEachTemplateLiteral(node, parentNode) {
      const jestEachTriggerRegex = /^[fx]?(?:describe|it|test)$/;
      return parentNode.type === "TaggedTemplateExpression" && parentNode.quasi === node && parentNode.tag.type === "MemberExpression" && parentNode.tag.property.type === "Identifier" && parentNode.tag.property.name === "each" && (parentNode.tag.object.type === "Identifier" && jestEachTriggerRegex.test(parentNode.tag.object.name) || parentNode.tag.object.type === "MemberExpression" && parentNode.tag.object.property.type === "Identifier" && (parentNode.tag.object.property.name === "only" || parentNode.tag.object.property.name === "skip") && parentNode.tag.object.object.type === "Identifier" && jestEachTriggerRegex.test(parentNode.tag.object.object.name));
    }
    function templateLiteralHasNewLines(template) {
      return template.quasis.some((quasi) => quasi.value.raw.includes("\n"));
    }
    function isTemplateOnItsOwnLine(node, text) {
      return (node.type === "TemplateLiteral" && templateLiteralHasNewLines(node) || node.type === "TaggedTemplateExpression" && templateLiteralHasNewLines(node.quasi)) && !hasNewline(text, locStart(node), {
        backwards: true
      });
    }
    function needsHardlineAfterDanglingComment(node) {
      if (!hasComment(node)) {
        return false;
      }
      const lastDanglingComment = getLast(getComments(node, CommentCheckFlags.Dangling));
      return lastDanglingComment && !isBlockComment(lastDanglingComment);
    }
    function isFunctionCompositionArgs(args) {
      if (args.length <= 1) {
        return false;
      }
      let count = 0;
      for (const arg of args) {
        if (isFunctionOrArrowExpression(arg)) {
          count += 1;
          if (count > 1) {
            return true;
          }
        } else if (isCallExpression(arg)) {
          for (const childArg of arg.arguments) {
            if (isFunctionOrArrowExpression(childArg)) {
              return true;
            }
          }
        }
      }
      return false;
    }
    function isLongCurriedCallExpression(path) {
      const node = path.getValue();
      const parent = path.getParentNode();
      return isCallExpression(node) && isCallExpression(parent) && parent.callee === node && node.arguments.length > parent.arguments.length && parent.arguments.length > 0;
    }
    function isSimpleCallArgument(node, depth) {
      if (depth >= 2) {
        return false;
      }
      const isChildSimple = (child) => isSimpleCallArgument(child, depth + 1);
      const regexpPattern = node.type === "Literal" && "regex" in node && node.regex.pattern || node.type === "RegExpLiteral" && node.pattern;
      if (regexpPattern && getStringWidth(regexpPattern) > 5) {
        return false;
      }
      if (node.type === "Literal" || node.type === "BigIntLiteral" || node.type === "DecimalLiteral" || node.type === "BooleanLiteral" || node.type === "NullLiteral" || node.type === "NumericLiteral" || node.type === "RegExpLiteral" || node.type === "StringLiteral" || node.type === "Identifier" || node.type === "ThisExpression" || node.type === "Super" || node.type === "PrivateName" || node.type === "PrivateIdentifier" || node.type === "ArgumentPlaceholder" || node.type === "Import") {
        return true;
      }
      if (node.type === "TemplateLiteral") {
        return node.quasis.every((element) => !element.value.raw.includes("\n")) && node.expressions.every(isChildSimple);
      }
      if (node.type === "ObjectExpression") {
        return node.properties.every((p) => !p.computed && (p.shorthand || p.value && isChildSimple(p.value)));
      }
      if (node.type === "ArrayExpression") {
        return node.elements.every((x) => x === null || isChildSimple(x));
      }
      if (isCallLikeExpression(node)) {
        return (node.type === "ImportExpression" || isSimpleCallArgument(node.callee, depth)) && getCallArguments(node).every(isChildSimple);
      }
      if (isMemberExpression(node)) {
        return isSimpleCallArgument(node.object, depth) && isSimpleCallArgument(node.property, depth);
      }
      const targetUnaryExpressionOperators = {
        "!": true,
        "-": true,
        "+": true,
        "~": true
      };
      if (node.type === "UnaryExpression" && targetUnaryExpressionOperators[node.operator]) {
        return isSimpleCallArgument(node.argument, depth);
      }
      const targetUpdateExpressionOperators = {
        "++": true,
        "--": true
      };
      if (node.type === "UpdateExpression" && targetUpdateExpressionOperators[node.operator]) {
        return isSimpleCallArgument(node.argument, depth);
      }
      if (node.type === "TSNonNullExpression") {
        return isSimpleCallArgument(node.expression, depth);
      }
      return false;
    }
    function rawText(node) {
      var _node$extra$raw, _node$extra2;
      return (_node$extra$raw = (_node$extra2 = node.extra) === null || _node$extra2 === void 0 ? void 0 : _node$extra2.raw) !== null && _node$extra$raw !== void 0 ? _node$extra$raw : node.raw;
    }
    function identity(x) {
      return x;
    }
    function isTSXFile(options) {
      return options.filepath && /\.tsx$/i.test(options.filepath);
    }
    function shouldPrintComma(options) {
      let level = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "es5";
      return options.trailingComma === "es5" && level === "es5" || options.trailingComma === "all" && (level === "all" || level === "es5");
    }
    function startsWithNoLookaheadToken(node, predicate) {
      switch (node.type) {
        case "BinaryExpression":
        case "LogicalExpression":
        case "AssignmentExpression":
        case "NGPipeExpression":
          return startsWithNoLookaheadToken(node.left, predicate);
        case "MemberExpression":
        case "OptionalMemberExpression":
          return startsWithNoLookaheadToken(node.object, predicate);
        case "TaggedTemplateExpression":
          if (node.tag.type === "FunctionExpression") {
            return false;
          }
          return startsWithNoLookaheadToken(node.tag, predicate);
        case "CallExpression":
        case "OptionalCallExpression":
          if (node.callee.type === "FunctionExpression") {
            return false;
          }
          return startsWithNoLookaheadToken(node.callee, predicate);
        case "ConditionalExpression":
          return startsWithNoLookaheadToken(node.test, predicate);
        case "UpdateExpression":
          return !node.prefix && startsWithNoLookaheadToken(node.argument, predicate);
        case "BindExpression":
          return node.object && startsWithNoLookaheadToken(node.object, predicate);
        case "SequenceExpression":
          return startsWithNoLookaheadToken(node.expressions[0], predicate);
        case "TSSatisfiesExpression":
        case "TSAsExpression":
        case "TSNonNullExpression":
          return startsWithNoLookaheadToken(node.expression, predicate);
        default:
          return predicate(node);
      }
    }
    var equalityOperators = {
      "==": true,
      "!=": true,
      "===": true,
      "!==": true
    };
    var multiplicativeOperators = {
      "*": true,
      "/": true,
      "%": true
    };
    var bitshiftOperators = {
      ">>": true,
      ">>>": true,
      "<<": true
    };
    function shouldFlatten(parentOp, nodeOp) {
      if (getPrecedence(nodeOp) !== getPrecedence(parentOp)) {
        return false;
      }
      if (parentOp === "**") {
        return false;
      }
      if (equalityOperators[parentOp] && equalityOperators[nodeOp]) {
        return false;
      }
      if (nodeOp === "%" && multiplicativeOperators[parentOp] || parentOp === "%" && multiplicativeOperators[nodeOp]) {
        return false;
      }
      if (nodeOp !== parentOp && multiplicativeOperators[nodeOp] && multiplicativeOperators[parentOp]) {
        return false;
      }
      if (bitshiftOperators[parentOp] && bitshiftOperators[nodeOp]) {
        return false;
      }
      return true;
    }
    var PRECEDENCE = new Map([["|>"], ["??"], ["||"], ["&&"], ["|"], ["^"], ["&"], ["==", "===", "!=", "!=="], ["<", ">", "<=", ">=", "in", "instanceof"], [">>", "<<", ">>>"], ["+", "-"], ["*", "/", "%"], ["**"]].flatMap((operators, index) => operators.map((operator) => [operator, index])));
    function getPrecedence(operator) {
      return PRECEDENCE.get(operator);
    }
    function isBitwiseOperator(operator) {
      return Boolean(bitshiftOperators[operator]) || operator === "|" || operator === "^" || operator === "&";
    }
    function hasRestParameter(node) {
      var _getLast;
      if (node.rest) {
        return true;
      }
      const parameters = getFunctionParameters(node);
      return ((_getLast = getLast(parameters)) === null || _getLast === void 0 ? void 0 : _getLast.type) === "RestElement";
    }
    var functionParametersCache = /* @__PURE__ */ new WeakMap();
    function getFunctionParameters(node) {
      if (functionParametersCache.has(node)) {
        return functionParametersCache.get(node);
      }
      const parameters = [];
      if (node.this) {
        parameters.push(node.this);
      }
      if (Array.isArray(node.parameters)) {
        parameters.push(...node.parameters);
      } else if (Array.isArray(node.params)) {
        parameters.push(...node.params);
      }
      if (node.rest) {
        parameters.push(node.rest);
      }
      functionParametersCache.set(node, parameters);
      return parameters;
    }
    function iterateFunctionParametersPath(path, iteratee) {
      const node = path.getValue();
      let index = 0;
      const callback = (childPath) => iteratee(childPath, index++);
      if (node.this) {
        path.call(callback, "this");
      }
      if (Array.isArray(node.parameters)) {
        path.each(callback, "parameters");
      } else if (Array.isArray(node.params)) {
        path.each(callback, "params");
      }
      if (node.rest) {
        path.call(callback, "rest");
      }
    }
    var callArgumentsCache = /* @__PURE__ */ new WeakMap();
    function getCallArguments(node) {
      if (callArgumentsCache.has(node)) {
        return callArgumentsCache.get(node);
      }
      let args = node.arguments;
      if (node.type === "ImportExpression") {
        args = [node.source];
        if (node.attributes) {
          args.push(node.attributes);
        }
      }
      callArgumentsCache.set(node, args);
      return args;
    }
    function iterateCallArgumentsPath(path, iteratee) {
      const node = path.getValue();
      if (node.type === "ImportExpression") {
        path.call((sourcePath) => iteratee(sourcePath, 0), "source");
        if (node.attributes) {
          path.call((sourcePath) => iteratee(sourcePath, 1), "attributes");
        }
      } else {
        path.each(iteratee, "arguments");
      }
    }
    function isPrettierIgnoreComment(comment) {
      return comment.value.trim() === "prettier-ignore" && !comment.unignore;
    }
    function hasNodeIgnoreComment(node) {
      return node && (node.prettierIgnore || hasComment(node, CommentCheckFlags.PrettierIgnore));
    }
    function hasIgnoreComment(path) {
      const node = path.getValue();
      return hasNodeIgnoreComment(node);
    }
    var CommentCheckFlags = {
      Leading: 1 << 1,
      Trailing: 1 << 2,
      Dangling: 1 << 3,
      Block: 1 << 4,
      Line: 1 << 5,
      PrettierIgnore: 1 << 6,
      First: 1 << 7,
      Last: 1 << 8
    };
    var getCommentTestFunction = (flags, fn) => {
      if (typeof flags === "function") {
        fn = flags;
        flags = 0;
      }
      if (flags || fn) {
        return (comment, index, comments) => !(flags & CommentCheckFlags.Leading && !comment.leading || flags & CommentCheckFlags.Trailing && !comment.trailing || flags & CommentCheckFlags.Dangling && (comment.leading || comment.trailing) || flags & CommentCheckFlags.Block && !isBlockComment(comment) || flags & CommentCheckFlags.Line && !isLineComment(comment) || flags & CommentCheckFlags.First && index !== 0 || flags & CommentCheckFlags.Last && index !== comments.length - 1 || flags & CommentCheckFlags.PrettierIgnore && !isPrettierIgnoreComment(comment) || fn && !fn(comment));
      }
    };
    function hasComment(node, flags, fn) {
      if (!isNonEmptyArray(node === null || node === void 0 ? void 0 : node.comments)) {
        return false;
      }
      const test = getCommentTestFunction(flags, fn);
      return test ? node.comments.some(test) : true;
    }
    function getComments(node, flags, fn) {
      if (!Array.isArray(node === null || node === void 0 ? void 0 : node.comments)) {
        return [];
      }
      const test = getCommentTestFunction(flags, fn);
      return test ? node.comments.filter(test) : node.comments;
    }
    var isNextLineEmpty = (node, _ref28) => {
      let {
        originalText
      } = _ref28;
      return isNextLineEmptyAfterIndex(originalText, locEnd(node));
    };
    function isCallLikeExpression(node) {
      return isCallExpression(node) || node.type === "NewExpression" || node.type === "ImportExpression";
    }
    function isObjectProperty(node) {
      return node && (node.type === "ObjectProperty" || node.type === "Property" && !node.method && node.kind === "init");
    }
    function isEnabledHackPipeline(options) {
      return Boolean(options.__isUsingHackPipeline);
    }
    var markerForIfWithoutBlockAndSameLineComment = Symbol("ifWithoutBlockAndSameLineComment");
    function isTSTypeExpression(node) {
      return node.type === "TSAsExpression" || node.type === "TSSatisfiesExpression";
    }
    module.exports = {
      getFunctionParameters,
      iterateFunctionParametersPath,
      getCallArguments,
      iterateCallArgumentsPath,
      hasRestParameter,
      getLeftSide,
      getLeftSidePathName,
      getParentExportDeclaration,
      getTypeScriptMappedTypeModifier,
      hasFlowAnnotationComment,
      hasFlowShorthandAnnotationComment,
      hasLeadingOwnLineComment,
      hasNakedLeftSide,
      hasNode,
      hasIgnoreComment,
      hasNodeIgnoreComment,
      identity,
      isBinaryish,
      isCallLikeExpression,
      isEnabledHackPipeline,
      isLineComment,
      isPrettierIgnoreComment,
      isCallExpression,
      isMemberExpression,
      isExportDeclaration,
      isFlowAnnotationComment,
      isFunctionCompositionArgs,
      isFunctionNotation,
      isFunctionOrArrowExpression,
      isGetterOrSetter,
      isJestEachTemplateLiteral,
      isJsxNode,
      isLiteral,
      isLongCurriedCallExpression,
      isSimpleCallArgument,
      isMemberish,
      isNumericLiteral,
      isSignedNumericLiteral,
      isObjectProperty,
      isObjectType,
      isObjectTypePropertyAFunction,
      isSimpleType,
      isSimpleNumber,
      isSimpleTemplateLiteral,
      isStringLiteral,
      isStringPropSafeToUnquote,
      isTemplateOnItsOwnLine,
      isTestCall,
      isTheOnlyJsxElementInMarkdown,
      isTSXFile,
      isTypeAnnotationAFunction,
      isNextLineEmpty,
      needsHardlineAfterDanglingComment,
      rawText,
      shouldPrintComma,
      isBitwiseOperator,
      shouldFlatten,
      startsWithNoLookaheadToken,
      getPrecedence,
      hasComment,
      getComments,
      CommentCheckFlags,
      markerForIfWithoutBlockAndSameLineComment,
      isTSTypeExpression
    };
  }
});
var require_template_literal = __commonJS2({
  "src/language-js/print/template-literal.js"(exports, module) {
    "use strict";
    init_define_process();
    var getLast = require_get_last();
    var {
      getStringWidth,
      getIndentSize
    } = require_util();
    var {
      builders: {
        join: join2,
        hardline,
        softline,
        group,
        indent,
        align,
        lineSuffixBoundary,
        addAlignmentToDoc
      },
      printer: {
        printDocToString
      },
      utils: {
        mapDoc
      }
    } = require_document();
    var {
      isBinaryish,
      isJestEachTemplateLiteral,
      isSimpleTemplateLiteral,
      hasComment,
      isMemberExpression,
      isTSTypeExpression
    } = require_utils3();
    function printTemplateLiteral(path, print, options) {
      const node = path.getValue();
      const isTemplateLiteral = node.type === "TemplateLiteral";
      if (isTemplateLiteral && isJestEachTemplateLiteral(node, path.getParentNode())) {
        const printed = printJestEachTemplateLiteral(path, options, print);
        if (printed) {
          return printed;
        }
      }
      let expressionsKey = "expressions";
      if (node.type === "TSTemplateLiteralType") {
        expressionsKey = "types";
      }
      const parts = [];
      let expressions = path.map(print, expressionsKey);
      const isSimple = isSimpleTemplateLiteral(node);
      if (isSimple) {
        expressions = expressions.map((doc) => printDocToString(doc, Object.assign(Object.assign({}, options), {}, {
          printWidth: Number.POSITIVE_INFINITY
        })).formatted);
      }
      parts.push(lineSuffixBoundary, "`");
      path.each((childPath) => {
        const i = childPath.getName();
        parts.push(print());
        if (i < expressions.length) {
          const {
            tabWidth
          } = options;
          const quasi = childPath.getValue();
          const indentSize = getIndentSize(quasi.value.raw, tabWidth);
          let printed = expressions[i];
          if (!isSimple) {
            const expression = node[expressionsKey][i];
            if (hasComment(expression) || isMemberExpression(expression) || expression.type === "ConditionalExpression" || expression.type === "SequenceExpression" || isTSTypeExpression(expression) || isBinaryish(expression)) {
              printed = [indent([softline, printed]), softline];
            }
          }
          const aligned = indentSize === 0 && quasi.value.raw.endsWith("\n") ? align(Number.NEGATIVE_INFINITY, printed) : addAlignmentToDoc(printed, indentSize, tabWidth);
          parts.push(group(["${", aligned, lineSuffixBoundary, "}"]));
        }
      }, "quasis");
      parts.push("`");
      return parts;
    }
    function printJestEachTemplateLiteral(path, options, print) {
      const node = path.getNode();
      const headerNames = node.quasis[0].value.raw.trim().split(/\s*\|\s*/);
      if (headerNames.length > 1 || headerNames.some((headerName) => headerName.length > 0)) {
        options.__inJestEach = true;
        const expressions = path.map(print, "expressions");
        options.__inJestEach = false;
        const parts = [];
        const stringifiedExpressions = expressions.map((doc) => "${" + printDocToString(doc, Object.assign(Object.assign({}, options), {}, {
          printWidth: Number.POSITIVE_INFINITY,
          endOfLine: "lf"
        })).formatted + "}");
        const tableBody = [{
          hasLineBreak: false,
          cells: []
        }];
        for (let i = 1; i < node.quasis.length; i++) {
          const row = getLast(tableBody);
          const correspondingExpression = stringifiedExpressions[i - 1];
          row.cells.push(correspondingExpression);
          if (correspondingExpression.includes("\n")) {
            row.hasLineBreak = true;
          }
          if (node.quasis[i].value.raw.includes("\n")) {
            tableBody.push({
              hasLineBreak: false,
              cells: []
            });
          }
        }
        const maxColumnCount = Math.max(headerNames.length, ...tableBody.map((row) => row.cells.length));
        const maxColumnWidths = Array.from({
          length: maxColumnCount
        }).fill(0);
        const table = [{
          cells: headerNames
        }, ...tableBody.filter((row) => row.cells.length > 0)];
        for (const {
          cells
        } of table.filter((row) => !row.hasLineBreak)) {
          for (const [index, cell] of cells.entries()) {
            maxColumnWidths[index] = Math.max(maxColumnWidths[index], getStringWidth(cell));
          }
        }
        parts.push(lineSuffixBoundary, "`", indent([hardline, join2(hardline, table.map((row) => join2(" | ", row.cells.map((cell, index) => row.hasLineBreak ? cell : cell + " ".repeat(maxColumnWidths[index] - getStringWidth(cell))))))]), hardline, "`");
        return parts;
      }
    }
    function printTemplateExpression(path, print) {
      const node = path.getValue();
      let printed = print();
      if (hasComment(node)) {
        printed = group([indent([softline, printed]), softline]);
      }
      return ["${", printed, lineSuffixBoundary, "}"];
    }
    function printTemplateExpressions(path, print) {
      return path.map((path2) => printTemplateExpression(path2, print), "expressions");
    }
    function escapeTemplateCharacters(doc, raw) {
      return mapDoc(doc, (currentDoc) => {
        if (typeof currentDoc === "string") {
          return raw ? currentDoc.replace(/(\\*)`/g, "$1$1\\`") : uncookTemplateElementValue(currentDoc);
        }
        return currentDoc;
      });
    }
    function uncookTemplateElementValue(cookedValue) {
      return cookedValue.replace(/([\\`]|\${)/g, "\\$1");
    }
    module.exports = {
      printTemplateLiteral,
      printTemplateExpressions,
      escapeTemplateCharacters,
      uncookTemplateElementValue
    };
  }
});
var require_markdown = __commonJS2({
  "src/language-js/embed/markdown.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      builders: {
        indent,
        softline,
        literalline,
        dedentToRoot
      }
    } = require_document();
    var {
      escapeTemplateCharacters
    } = require_template_literal();
    function format(path, print, textToDoc) {
      const node = path.getValue();
      let text = node.quasis[0].value.raw.replace(/((?:\\\\)*)\\`/g, (_, backslashes) => "\\".repeat(backslashes.length / 2) + "`");
      const indentation = getIndentation(text);
      const hasIndent = indentation !== "";
      if (hasIndent) {
        text = text.replace(new RegExp(`^${indentation}`, "gm"), "");
      }
      const doc = escapeTemplateCharacters(textToDoc(text, {
        parser: "markdown",
        __inJsTemplate: true
      }, {
        stripTrailingHardline: true
      }), true);
      return ["`", hasIndent ? indent([softline, doc]) : [literalline, dedentToRoot(doc)], softline, "`"];
    }
    function getIndentation(str) {
      const firstMatchedIndent = str.match(/^([^\S\n]*)\S/m);
      return firstMatchedIndent === null ? "" : firstMatchedIndent[1];
    }
    module.exports = format;
  }
});
var require_css = __commonJS2({
  "src/language-js/embed/css.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      isNonEmptyArray
    } = require_util();
    var {
      builders: {
        indent,
        hardline,
        softline
      },
      utils: {
        mapDoc,
        replaceEndOfLine,
        cleanDoc
      }
    } = require_document();
    var {
      printTemplateExpressions
    } = require_template_literal();
    function format(path, print, textToDoc) {
      const node = path.getValue();
      const rawQuasis = node.quasis.map((q) => q.value.raw);
      let placeholderID = 0;
      const text = rawQuasis.reduce((prevVal, currVal, idx) => idx === 0 ? currVal : prevVal + "@prettier-placeholder-" + placeholderID++ + "-id" + currVal, "");
      const doc = textToDoc(text, {
        parser: "scss"
      }, {
        stripTrailingHardline: true
      });
      const expressionDocs = printTemplateExpressions(path, print);
      return transformCssDoc(doc, node, expressionDocs);
    }
    function transformCssDoc(quasisDoc, parentNode, expressionDocs) {
      const isEmpty = parentNode.quasis.length === 1 && !parentNode.quasis[0].value.raw.trim();
      if (isEmpty) {
        return "``";
      }
      const newDoc = replacePlaceholders(quasisDoc, expressionDocs);
      if (!newDoc) {
        throw new Error("Couldn't insert all the expressions");
      }
      return ["`", indent([hardline, newDoc]), softline, "`"];
    }
    function replacePlaceholders(quasisDoc, expressionDocs) {
      if (!isNonEmptyArray(expressionDocs)) {
        return quasisDoc;
      }
      let replaceCounter = 0;
      const newDoc = mapDoc(cleanDoc(quasisDoc), (doc) => {
        if (typeof doc !== "string" || !doc.includes("@prettier-placeholder")) {
          return doc;
        }
        return doc.split(/@prettier-placeholder-(\d+)-id/).map((component, idx) => {
          if (idx % 2 === 0) {
            return replaceEndOfLine(component);
          }
          replaceCounter++;
          return expressionDocs[component];
        });
      });
      return expressionDocs.length === replaceCounter ? newDoc : null;
    }
    module.exports = format;
  }
});
var require_graphql = __commonJS2({
  "src/language-js/embed/graphql.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      builders: {
        indent,
        join: join2,
        hardline
      }
    } = require_document();
    var {
      escapeTemplateCharacters,
      printTemplateExpressions
    } = require_template_literal();
    function format(path, print, textToDoc) {
      const node = path.getValue();
      const numQuasis = node.quasis.length;
      if (numQuasis === 1 && node.quasis[0].value.raw.trim() === "") {
        return "``";
      }
      const expressionDocs = printTemplateExpressions(path, print);
      const parts = [];
      for (let i = 0; i < numQuasis; i++) {
        const templateElement = node.quasis[i];
        const isFirst = i === 0;
        const isLast = i === numQuasis - 1;
        const text = templateElement.value.cooked;
        const lines = text.split("\n");
        const numLines = lines.length;
        const expressionDoc = expressionDocs[i];
        const startsWithBlankLine = numLines > 2 && lines[0].trim() === "" && lines[1].trim() === "";
        const endsWithBlankLine = numLines > 2 && lines[numLines - 1].trim() === "" && lines[numLines - 2].trim() === "";
        const commentsAndWhitespaceOnly = lines.every((line) => /^\s*(?:#[^\n\r]*)?$/.test(line));
        if (!isLast && /#[^\n\r]*$/.test(lines[numLines - 1])) {
          return null;
        }
        let doc = null;
        if (commentsAndWhitespaceOnly) {
          doc = printGraphqlComments(lines);
        } else {
          doc = textToDoc(text, {
            parser: "graphql"
          }, {
            stripTrailingHardline: true
          });
        }
        if (doc) {
          doc = escapeTemplateCharacters(doc, false);
          if (!isFirst && startsWithBlankLine) {
            parts.push("");
          }
          parts.push(doc);
          if (!isLast && endsWithBlankLine) {
            parts.push("");
          }
        } else if (!isFirst && !isLast && startsWithBlankLine) {
          parts.push("");
        }
        if (expressionDoc) {
          parts.push(expressionDoc);
        }
      }
      return ["`", indent([hardline, join2(hardline, parts)]), hardline, "`"];
    }
    function printGraphqlComments(lines) {
      const parts = [];
      let seenComment = false;
      const array = lines.map((textLine) => textLine.trim());
      for (const [i, textLine] of array.entries()) {
        if (textLine === "") {
          continue;
        }
        if (array[i - 1] === "" && seenComment) {
          parts.push([hardline, textLine]);
        } else {
          parts.push(textLine);
        }
        seenComment = true;
      }
      return parts.length === 0 ? null : join2(hardline, parts);
    }
    module.exports = format;
  }
});
var require_html = __commonJS2({
  "src/language-js/embed/html.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      builders: {
        indent,
        line,
        hardline,
        group
      },
      utils: {
        mapDoc
      }
    } = require_document();
    var {
      printTemplateExpressions,
      uncookTemplateElementValue
    } = require_template_literal();
    var htmlTemplateLiteralCounter = 0;
    function format(path, print, textToDoc, options, _ref29) {
      let {
        parser
      } = _ref29;
      const node = path.getValue();
      const counter = htmlTemplateLiteralCounter;
      htmlTemplateLiteralCounter = htmlTemplateLiteralCounter + 1 >>> 0;
      const composePlaceholder = (index) => `PRETTIER_HTML_PLACEHOLDER_${index}_${counter}_IN_JS`;
      const text = node.quasis.map((quasi, index, quasis) => index === quasis.length - 1 ? quasi.value.cooked : quasi.value.cooked + composePlaceholder(index)).join("");
      const expressionDocs = printTemplateExpressions(path, print);
      if (expressionDocs.length === 0 && text.trim().length === 0) {
        return "``";
      }
      const placeholderRegex = new RegExp(composePlaceholder("(\\d+)"), "g");
      let topLevelCount = 0;
      const doc = textToDoc(text, {
        parser,
        __onHtmlRoot(root) {
          topLevelCount = root.children.length;
        }
      }, {
        stripTrailingHardline: true
      });
      const contentDoc = mapDoc(doc, (doc2) => {
        if (typeof doc2 !== "string") {
          return doc2;
        }
        const parts = [];
        const components = doc2.split(placeholderRegex);
        for (let i = 0; i < components.length; i++) {
          let component = components[i];
          if (i % 2 === 0) {
            if (component) {
              component = uncookTemplateElementValue(component);
              if (options.__embeddedInHtml) {
                component = component.replace(/<\/(script)\b/gi, "<\\/$1");
              }
              parts.push(component);
            }
            continue;
          }
          const placeholderIndex = Number(component);
          parts.push(expressionDocs[placeholderIndex]);
        }
        return parts;
      });
      const leadingWhitespace = /^\s/.test(text) ? " " : "";
      const trailingWhitespace = /\s$/.test(text) ? " " : "";
      const linebreak = options.htmlWhitespaceSensitivity === "ignore" ? hardline : leadingWhitespace && trailingWhitespace ? line : null;
      if (linebreak) {
        return group(["`", indent([linebreak, group(contentDoc)]), linebreak, "`"]);
      }
      return group(["`", leadingWhitespace, topLevelCount > 1 ? indent(group(contentDoc)) : group(contentDoc), trailingWhitespace, "`"]);
    }
    module.exports = format;
  }
});
var require_embed = __commonJS2({
  "src/language-js/embed.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      hasComment,
      CommentCheckFlags,
      isObjectProperty
    } = require_utils3();
    var formatMarkdown = require_markdown();
    var formatCss = require_css();
    var formatGraphql = require_graphql();
    var formatHtml = require_html();
    function getLanguage(path) {
      if (isStyledJsx(path) || isStyledComponents(path) || isCssProp(path) || isAngularComponentStyles(path)) {
        return "css";
      }
      if (isGraphQL(path)) {
        return "graphql";
      }
      if (isHtml(path)) {
        return "html";
      }
      if (isAngularComponentTemplate(path)) {
        return "angular";
      }
      if (isMarkdown(path)) {
        return "markdown";
      }
    }
    function embed(path, print, textToDoc, options) {
      const node = path.getValue();
      if (node.type !== "TemplateLiteral" || hasInvalidCookedValue(node)) {
        return;
      }
      const language = getLanguage(path);
      if (!language) {
        return;
      }
      if (language === "markdown") {
        return formatMarkdown(path, print, textToDoc);
      }
      if (language === "css") {
        return formatCss(path, print, textToDoc);
      }
      if (language === "graphql") {
        return formatGraphql(path, print, textToDoc);
      }
      if (language === "html" || language === "angular") {
        return formatHtml(path, print, textToDoc, options, {
          parser: language
        });
      }
    }
    function isMarkdown(path) {
      const node = path.getValue();
      const parent = path.getParentNode();
      return parent && parent.type === "TaggedTemplateExpression" && node.quasis.length === 1 && parent.tag.type === "Identifier" && (parent.tag.name === "md" || parent.tag.name === "markdown");
    }
    function isStyledJsx(path) {
      const node = path.getValue();
      const parent = path.getParentNode();
      const parentParent = path.getParentNode(1);
      return parentParent && node.quasis && parent.type === "JSXExpressionContainer" && parentParent.type === "JSXElement" && parentParent.openingElement.name.name === "style" && parentParent.openingElement.attributes.some((attribute) => attribute.name.name === "jsx") || parent && parent.type === "TaggedTemplateExpression" && parent.tag.type === "Identifier" && parent.tag.name === "css" || parent && parent.type === "TaggedTemplateExpression" && parent.tag.type === "MemberExpression" && parent.tag.object.name === "css" && (parent.tag.property.name === "global" || parent.tag.property.name === "resolve");
    }
    function isAngularComponentStyles(path) {
      return path.match((node) => node.type === "TemplateLiteral", (node, name) => node.type === "ArrayExpression" && name === "elements", (node, name) => isObjectProperty(node) && node.key.type === "Identifier" && node.key.name === "styles" && name === "value", ...angularComponentObjectExpressionPredicates);
    }
    function isAngularComponentTemplate(path) {
      return path.match((node) => node.type === "TemplateLiteral", (node, name) => isObjectProperty(node) && node.key.type === "Identifier" && node.key.name === "template" && name === "value", ...angularComponentObjectExpressionPredicates);
    }
    var angularComponentObjectExpressionPredicates = [(node, name) => node.type === "ObjectExpression" && name === "properties", (node, name) => node.type === "CallExpression" && node.callee.type === "Identifier" && node.callee.name === "Component" && name === "arguments", (node, name) => node.type === "Decorator" && name === "expression"];
    function isStyledComponents(path) {
      const parent = path.getParentNode();
      if (!parent || parent.type !== "TaggedTemplateExpression") {
        return false;
      }
      const tag = parent.tag.type === "ParenthesizedExpression" ? parent.tag.expression : parent.tag;
      switch (tag.type) {
        case "MemberExpression":
          return isStyledIdentifier(tag.object) || isStyledExtend(tag);
        case "CallExpression":
          return isStyledIdentifier(tag.callee) || tag.callee.type === "MemberExpression" && (tag.callee.object.type === "MemberExpression" && (isStyledIdentifier(tag.callee.object.object) || isStyledExtend(tag.callee.object)) || tag.callee.object.type === "CallExpression" && isStyledIdentifier(tag.callee.object.callee));
        case "Identifier":
          return tag.name === "css";
        default:
          return false;
      }
    }
    function isCssProp(path) {
      const parent = path.getParentNode();
      const parentParent = path.getParentNode(1);
      return parentParent && parent.type === "JSXExpressionContainer" && parentParent.type === "JSXAttribute" && parentParent.name.type === "JSXIdentifier" && parentParent.name.name === "css";
    }
    function isStyledIdentifier(node) {
      return node.type === "Identifier" && node.name === "styled";
    }
    function isStyledExtend(node) {
      return /^[A-Z]/.test(node.object.name) && node.property.name === "extend";
    }
    function isGraphQL(path) {
      const node = path.getValue();
      const parent = path.getParentNode();
      return hasLanguageComment(node, "GraphQL") || parent && (parent.type === "TaggedTemplateExpression" && (parent.tag.type === "MemberExpression" && parent.tag.object.name === "graphql" && parent.tag.property.name === "experimental" || parent.tag.type === "Identifier" && (parent.tag.name === "gql" || parent.tag.name === "graphql")) || parent.type === "CallExpression" && parent.callee.type === "Identifier" && parent.callee.name === "graphql");
    }
    function hasLanguageComment(node, languageName) {
      return hasComment(node, CommentCheckFlags.Block | CommentCheckFlags.Leading, (_ref30) => {
        let {
          value
        } = _ref30;
        return value === ` ${languageName} `;
      });
    }
    function isHtml(path) {
      return hasLanguageComment(path.getValue(), "HTML") || path.match((node) => node.type === "TemplateLiteral", (node, name) => node.type === "TaggedTemplateExpression" && node.tag.type === "Identifier" && node.tag.name === "html" && name === "quasi");
    }
    function hasInvalidCookedValue(_ref31) {
      let {
        quasis
      } = _ref31;
      return quasis.some((_ref32) => {
        let {
          value: {
            cooked
          }
        } = _ref32;
        return cooked === null;
      });
    }
    module.exports = embed;
  }
});
var require_clean = __commonJS2({
  "src/language-js/clean.js"(exports, module) {
    "use strict";
    init_define_process();
    var isBlockComment = require_is_block_comment();
    var ignoredProperties = /* @__PURE__ */ new Set(["range", "raw", "comments", "leadingComments", "trailingComments", "innerComments", "extra", "start", "end", "loc", "flags", "errors", "tokens"]);
    var removeTemplateElementsValue = (node) => {
      for (const templateElement of node.quasis) {
        delete templateElement.value;
      }
    };
    function clean(ast, newObj, parent) {
      if (ast.type === "Program") {
        delete newObj.sourceType;
      }
      if (ast.type === "BigIntLiteral" || ast.type === "BigIntLiteralTypeAnnotation") {
        if (newObj.value) {
          newObj.value = newObj.value.toLowerCase();
        }
      }
      if (ast.type === "BigIntLiteral" || ast.type === "Literal") {
        if (newObj.bigint) {
          newObj.bigint = newObj.bigint.toLowerCase();
        }
      }
      if (ast.type === "DecimalLiteral") {
        newObj.value = Number(newObj.value);
      }
      if (ast.type === "Literal" && newObj.decimal) {
        newObj.decimal = Number(newObj.decimal);
      }
      if (ast.type === "EmptyStatement") {
        return null;
      }
      if (ast.type === "JSXText") {
        return null;
      }
      if (ast.type === "JSXExpressionContainer" && (ast.expression.type === "Literal" || ast.expression.type === "StringLiteral") && ast.expression.value === " ") {
        return null;
      }
      if ((ast.type === "Property" || ast.type === "ObjectProperty" || ast.type === "MethodDefinition" || ast.type === "ClassProperty" || ast.type === "ClassMethod" || ast.type === "PropertyDefinition" || ast.type === "TSDeclareMethod" || ast.type === "TSPropertySignature" || ast.type === "ObjectTypeProperty") && typeof ast.key === "object" && ast.key && (ast.key.type === "Literal" || ast.key.type === "NumericLiteral" || ast.key.type === "StringLiteral" || ast.key.type === "Identifier")) {
        delete newObj.key;
      }
      if (ast.type === "JSXElement" && ast.openingElement.name.name === "style" && ast.openingElement.attributes.some((attr) => attr.name.name === "jsx")) {
        for (const {
          type: type2,
          expression: expression2
        } of newObj.children) {
          if (type2 === "JSXExpressionContainer" && expression2.type === "TemplateLiteral") {
            removeTemplateElementsValue(expression2);
          }
        }
      }
      if (ast.type === "JSXAttribute" && ast.name.name === "css" && ast.value.type === "JSXExpressionContainer" && ast.value.expression.type === "TemplateLiteral") {
        removeTemplateElementsValue(newObj.value.expression);
      }
      if (ast.type === "JSXAttribute" && ast.value && ast.value.type === "Literal" && /["']|&quot;|&apos;/.test(ast.value.value)) {
        newObj.value.value = newObj.value.value.replace(/["']|&quot;|&apos;/g, '"');
      }
      const expression = ast.expression || ast.callee;
      if (ast.type === "Decorator" && expression.type === "CallExpression" && expression.callee.name === "Component" && expression.arguments.length === 1) {
        const astProps = ast.expression.arguments[0].properties;
        for (const [index, prop] of newObj.expression.arguments[0].properties.entries()) {
          switch (astProps[index].key.name) {
            case "styles":
              if (prop.value.type === "ArrayExpression") {
                removeTemplateElementsValue(prop.value.elements[0]);
              }
              break;
            case "template":
              if (prop.value.type === "TemplateLiteral") {
                removeTemplateElementsValue(prop.value);
              }
              break;
          }
        }
      }
      if (ast.type === "TaggedTemplateExpression" && (ast.tag.type === "MemberExpression" || ast.tag.type === "Identifier" && (ast.tag.name === "gql" || ast.tag.name === "graphql" || ast.tag.name === "css" || ast.tag.name === "md" || ast.tag.name === "markdown" || ast.tag.name === "html") || ast.tag.type === "CallExpression")) {
        removeTemplateElementsValue(newObj.quasi);
      }
      if (ast.type === "TemplateLiteral") {
        var _ast$leadingComments;
        const hasLanguageComment = (_ast$leadingComments = ast.leadingComments) === null || _ast$leadingComments === void 0 ? void 0 : _ast$leadingComments.some((comment) => isBlockComment(comment) && ["GraphQL", "HTML"].some((languageName) => comment.value === ` ${languageName} `));
        if (hasLanguageComment || parent.type === "CallExpression" && parent.callee.name === "graphql" || !ast.leadingComments) {
          removeTemplateElementsValue(newObj);
        }
      }
      if (ast.type === "InterpreterDirective") {
        newObj.value = newObj.value.trimEnd();
      }
      if ((ast.type === "TSIntersectionType" || ast.type === "TSUnionType") && ast.types.length === 1) {
        return newObj.types[0];
      }
    }
    clean.ignoredProperties = ignoredProperties;
    module.exports = clean;
  }
});
var os_exports = {};
__export(os_exports, {
  EOL: () => EOL,
  arch: () => arch,
  cpus: () => cpus,
  default: () => os_default,
  endianness: () => endianness,
  freemem: () => freemem,
  getNetworkInterfaces: () => getNetworkInterfaces,
  hostname: () => hostname,
  loadavg: () => loadavg,
  networkInterfaces: () => networkInterfaces,
  platform: () => platform,
  release: () => release,
  tmpDir: () => tmpDir,
  tmpdir: () => tmpdir,
  totalmem: () => totalmem,
  type: () => type,
  uptime: () => uptime
});
function endianness() {
  if (typeof _endianness === "undefined") {
    var a = new ArrayBuffer(2);
    var b = new Uint8Array(a);
    var c = new Uint16Array(a);
    b[0] = 1;
    b[1] = 2;
    if (c[0] === 258) {
      _endianness = "BE";
    } else if (c[0] === 513) {
      _endianness = "LE";
    } else {
      throw new Error("unable to figure out endianess");
    }
  }
  return _endianness;
}
function hostname() {
  if (typeof globalThis.location !== "undefined") {
    return globalThis.location.hostname;
  } else
    return "";
}
function loadavg() {
  return [];
}
function uptime() {
  return 0;
}
function freemem() {
  return Number.MAX_VALUE;
}
function totalmem() {
  return Number.MAX_VALUE;
}
function cpus() {
  return [];
}
function type() {
  return "Browser";
}
function release() {
  if (typeof globalThis.navigator !== "undefined") {
    return globalThis.navigator.appVersion;
  }
  return "";
}
function networkInterfaces() {
}
function getNetworkInterfaces() {
}
function arch() {
  return "javascript";
}
function platform() {
  return "browser";
}
function tmpDir() {
  return "/tmp";
}
var _endianness;
var tmpdir;
var EOL;
var os_default;
var init_os = __esm({
  "node-modules-polyfills:os"() {
    init_define_process();
    tmpdir = tmpDir;
    EOL = "\n";
    os_default = {
      EOL,
      tmpdir,
      tmpDir,
      networkInterfaces,
      getNetworkInterfaces,
      release,
      type,
      cpus,
      totalmem,
      freemem,
      uptime,
      loadavg,
      hostname,
      endianness
    };
  }
});
var require_os = __commonJS2({
  "node-modules-polyfills-commonjs:os"(exports, module) {
    init_define_process();
    var polyfill = (init_os(), __toCommonJS(os_exports));
    if (polyfill && polyfill.default) {
      module.exports = polyfill.default;
      for (let k in polyfill) {
        module.exports[k] = polyfill[k];
      }
    } else if (polyfill) {
      module.exports = polyfill;
    }
  }
});
var require_detect_newline = __commonJS2({
  "node_modules/detect-newline/index.js"(exports, module) {
    "use strict";
    init_define_process();
    var detectNewline = (string) => {
      if (typeof string !== "string") {
        throw new TypeError("Expected a string");
      }
      const newlines = string.match(/(?:\r?\n)/g) || [];
      if (newlines.length === 0) {
        return;
      }
      const crlf = newlines.filter((newline) => newline === "\r\n").length;
      const lf = newlines.length - crlf;
      return crlf > lf ? "\r\n" : "\n";
    };
    module.exports = detectNewline;
    module.exports.graceful = (string) => typeof string === "string" && detectNewline(string) || "\n";
  }
});
var require_build = __commonJS2({
  "node_modules/jest-docblock/build/index.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.extract = extract;
    exports.parse = parse;
    exports.parseWithComments = parseWithComments;
    exports.print = print;
    exports.strip = strip;
    function _os() {
      const data = require_os();
      _os = function() {
        return data;
      };
      return data;
    }
    function _detectNewline() {
      const data = _interopRequireDefault(require_detect_newline());
      _detectNewline = function() {
        return data;
      };
      return data;
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    var commentEndRe = /\*\/$/;
    var commentStartRe = /^\/\*\*?/;
    var docblockRe = /^\s*(\/\*\*?(.|\r?\n)*?\*\/)/;
    var lineCommentRe = /(^|\s+)\/\/([^\r\n]*)/g;
    var ltrimNewlineRe = /^(\r?\n)+/;
    var multilineRe = /(?:^|\r?\n) *(@[^\r\n]*?) *\r?\n *(?![^@\r\n]*\/\/[^]*)([^@\r\n\s][^@\r\n]+?) *\r?\n/g;
    var propertyRe = /(?:^|\r?\n) *@(\S+) *([^\r\n]*)/g;
    var stringStartRe = /(\r?\n|^) *\* ?/g;
    var STRING_ARRAY = [];
    function extract(contents) {
      const match = contents.match(docblockRe);
      return match ? match[0].trimLeft() : "";
    }
    function strip(contents) {
      const match = contents.match(docblockRe);
      return match && match[0] ? contents.substring(match[0].length) : contents;
    }
    function parse(docblock) {
      return parseWithComments(docblock).pragmas;
    }
    function parseWithComments(docblock) {
      const line = (0, _detectNewline().default)(docblock) || _os().EOL;
      docblock = docblock.replace(commentStartRe, "").replace(commentEndRe, "").replace(stringStartRe, "$1");
      let prev = "";
      while (prev !== docblock) {
        prev = docblock;
        docblock = docblock.replace(multilineRe, `${line}$1 $2${line}`);
      }
      docblock = docblock.replace(ltrimNewlineRe, "").trimRight();
      const result = /* @__PURE__ */ Object.create(null);
      const comments = docblock.replace(propertyRe, "").replace(ltrimNewlineRe, "").trimRight();
      let match;
      while (match = propertyRe.exec(docblock)) {
        const nextPragma = match[2].replace(lineCommentRe, "");
        if (typeof result[match[1]] === "string" || Array.isArray(result[match[1]])) {
          result[match[1]] = STRING_ARRAY.concat(result[match[1]], nextPragma);
        } else {
          result[match[1]] = nextPragma;
        }
      }
      return {
        comments,
        pragmas: result
      };
    }
    function print(_ref33) {
      let {
        comments = "",
        pragmas = {}
      } = _ref33;
      const line = (0, _detectNewline().default)(comments) || _os().EOL;
      const head = "/**";
      const start = " *";
      const tail = " */";
      const keys = Object.keys(pragmas);
      const printedObject = keys.map((key) => printKeyValues(key, pragmas[key])).reduce((arr, next) => arr.concat(next), []).map((keyValue) => `${start} ${keyValue}${line}`).join("");
      if (!comments) {
        if (keys.length === 0) {
          return "";
        }
        if (keys.length === 1 && !Array.isArray(pragmas[keys[0]])) {
          const value = pragmas[keys[0]];
          return `${head} ${printKeyValues(keys[0], value)[0]}${tail}`;
        }
      }
      const printedComments = comments.split(line).map((textLine) => `${start} ${textLine}`).join(line) + line;
      return head + line + (comments ? printedComments : "") + (comments && keys.length ? start + line : "") + printedObject + tail;
    }
    function printKeyValues(key, valueOrArray) {
      return STRING_ARRAY.concat(valueOrArray).map((value) => `@${key} ${value}`.trim());
    }
  }
});
var require_get_shebang = __commonJS2({
  "src/language-js/utils/get-shebang.js"(exports, module) {
    "use strict";
    init_define_process();
    function getShebang(text) {
      if (!text.startsWith("#!")) {
        return "";
      }
      const index = text.indexOf("\n");
      if (index === -1) {
        return text;
      }
      return text.slice(0, index);
    }
    module.exports = getShebang;
  }
});
var require_pragma = __commonJS2({
  "src/language-js/pragma.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      parseWithComments,
      strip,
      extract,
      print
    } = require_build();
    var {
      normalizeEndOfLine
    } = require_end_of_line();
    var getShebang = require_get_shebang();
    function parseDocBlock(text) {
      const shebang = getShebang(text);
      if (shebang) {
        text = text.slice(shebang.length + 1);
      }
      const docBlock = extract(text);
      const {
        pragmas,
        comments
      } = parseWithComments(docBlock);
      return {
        shebang,
        text,
        pragmas,
        comments
      };
    }
    function hasPragma(text) {
      const pragmas = Object.keys(parseDocBlock(text).pragmas);
      return pragmas.includes("prettier") || pragmas.includes("format");
    }
    function insertPragma(originalText) {
      const {
        shebang,
        text,
        pragmas,
        comments
      } = parseDocBlock(originalText);
      const strippedText = strip(text);
      const docBlock = print({
        pragmas: Object.assign({
          format: ""
        }, pragmas),
        comments: comments.trimStart()
      });
      return (shebang ? `${shebang}
` : "") + normalizeEndOfLine(docBlock) + (strippedText.startsWith("\n") ? "\n" : "\n\n") + strippedText;
    }
    module.exports = {
      hasPragma,
      insertPragma
    };
  }
});
var require_is_type_cast_comment = __commonJS2({
  "src/language-js/utils/is-type-cast-comment.js"(exports, module) {
    "use strict";
    init_define_process();
    var isBlockComment = require_is_block_comment();
    function isTypeCastComment(comment) {
      return isBlockComment(comment) && comment.value[0] === "*" && /@(?:type|satisfies)\b/.test(comment.value);
    }
    module.exports = isTypeCastComment;
  }
});
var require_comments2 = __commonJS2({
  "src/language-js/comments.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      getLast,
      hasNewline,
      getNextNonSpaceNonCommentCharacterIndexWithStartIndex,
      getNextNonSpaceNonCommentCharacter,
      hasNewlineInRange,
      addLeadingComment,
      addTrailingComment,
      addDanglingComment,
      getNextNonSpaceNonCommentCharacterIndex,
      isNonEmptyArray
    } = require_util();
    var {
      getFunctionParameters,
      isPrettierIgnoreComment,
      isJsxNode,
      hasFlowShorthandAnnotationComment,
      hasFlowAnnotationComment,
      hasIgnoreComment,
      isCallLikeExpression,
      getCallArguments,
      isCallExpression,
      isMemberExpression,
      isObjectProperty,
      isLineComment,
      getComments,
      CommentCheckFlags,
      markerForIfWithoutBlockAndSameLineComment
    } = require_utils3();
    var {
      locStart,
      locEnd
    } = require_loc();
    var isBlockComment = require_is_block_comment();
    var isTypeCastComment = require_is_type_cast_comment();
    function handleOwnLineComment(context) {
      return [handleIgnoreComments, handleLastFunctionArgComments, handleMemberExpressionComments, handleIfStatementComments, handleWhileComments, handleTryStatementComments, handleClassComments, handleForComments, handleUnionTypeComments, handleOnlyComments, handleModuleSpecifiersComments, handleAssignmentPatternComments, handleMethodNameComments, handleLabeledStatementComments, handleBreakAndContinueStatementComments].some((fn) => fn(context));
    }
    function handleEndOfLineComment(context) {
      return [handleClosureTypeCastComments, handleLastFunctionArgComments, handleConditionalExpressionComments, handleModuleSpecifiersComments, handleIfStatementComments, handleWhileComments, handleTryStatementComments, handleClassComments, handleLabeledStatementComments, handleCallExpressionComments, handlePropertyComments, handleOnlyComments, handleVariableDeclaratorComments, handleBreakAndContinueStatementComments, handleSwitchDefaultCaseComments].some((fn) => fn(context));
    }
    function handleRemainingComment(context) {
      return [handleIgnoreComments, handleIfStatementComments, handleWhileComments, handleObjectPropertyAssignment, handleCommentInEmptyParens, handleMethodNameComments, handleOnlyComments, handleCommentAfterArrowParams, handleFunctionNameComments, handleTSMappedTypeComments, handleBreakAndContinueStatementComments, handleTSFunctionTrailingComments].some((fn) => fn(context));
    }
    function addBlockStatementFirstComment(node, comment) {
      const firstNonEmptyNode = (node.body || node.properties).find((_ref34) => {
        let {
          type: type2
        } = _ref34;
        return type2 !== "EmptyStatement";
      });
      if (firstNonEmptyNode) {
        addLeadingComment(firstNonEmptyNode, comment);
      } else {
        addDanglingComment(node, comment);
      }
    }
    function addBlockOrNotComment(node, comment) {
      if (node.type === "BlockStatement") {
        addBlockStatementFirstComment(node, comment);
      } else {
        addLeadingComment(node, comment);
      }
    }
    function handleClosureTypeCastComments(_ref35) {
      let {
        comment,
        followingNode
      } = _ref35;
      if (followingNode && isTypeCastComment(comment)) {
        addLeadingComment(followingNode, comment);
        return true;
      }
      return false;
    }
    function handleIfStatementComments(_ref36) {
      let {
        comment,
        precedingNode,
        enclosingNode,
        followingNode,
        text
      } = _ref36;
      if ((enclosingNode === null || enclosingNode === void 0 ? void 0 : enclosingNode.type) !== "IfStatement" || !followingNode) {
        return false;
      }
      const nextCharacter = getNextNonSpaceNonCommentCharacter(text, comment, locEnd);
      if (nextCharacter === ")") {
        addTrailingComment(precedingNode, comment);
        return true;
      }
      if (precedingNode === enclosingNode.consequent && followingNode === enclosingNode.alternate) {
        if (precedingNode.type === "BlockStatement") {
          addTrailingComment(precedingNode, comment);
        } else {
          const isSingleLineComment = comment.type === "SingleLine" || comment.loc.start.line === comment.loc.end.line;
          const isSameLineComment = comment.loc.start.line === precedingNode.loc.start.line;
          if (isSingleLineComment && isSameLineComment) {
            addDanglingComment(precedingNode, comment, markerForIfWithoutBlockAndSameLineComment);
          } else {
            addDanglingComment(enclosingNode, comment);
          }
        }
        return true;
      }
      if (followingNode.type === "BlockStatement") {
        addBlockStatementFirstComment(followingNode, comment);
        return true;
      }
      if (followingNode.type === "IfStatement") {
        addBlockOrNotComment(followingNode.consequent, comment);
        return true;
      }
      if (enclosingNode.consequent === followingNode) {
        addLeadingComment(followingNode, comment);
        return true;
      }
      return false;
    }
    function handleWhileComments(_ref37) {
      let {
        comment,
        precedingNode,
        enclosingNode,
        followingNode,
        text
      } = _ref37;
      if ((enclosingNode === null || enclosingNode === void 0 ? void 0 : enclosingNode.type) !== "WhileStatement" || !followingNode) {
        return false;
      }
      const nextCharacter = getNextNonSpaceNonCommentCharacter(text, comment, locEnd);
      if (nextCharacter === ")") {
        addTrailingComment(precedingNode, comment);
        return true;
      }
      if (followingNode.type === "BlockStatement") {
        addBlockStatementFirstComment(followingNode, comment);
        return true;
      }
      if (enclosingNode.body === followingNode) {
        addLeadingComment(followingNode, comment);
        return true;
      }
      return false;
    }
    function handleTryStatementComments(_ref38) {
      let {
        comment,
        precedingNode,
        enclosingNode,
        followingNode
      } = _ref38;
      if ((enclosingNode === null || enclosingNode === void 0 ? void 0 : enclosingNode.type) !== "TryStatement" && (enclosingNode === null || enclosingNode === void 0 ? void 0 : enclosingNode.type) !== "CatchClause" || !followingNode) {
        return false;
      }
      if (enclosingNode.type === "CatchClause" && precedingNode) {
        addTrailingComment(precedingNode, comment);
        return true;
      }
      if (followingNode.type === "BlockStatement") {
        addBlockStatementFirstComment(followingNode, comment);
        return true;
      }
      if (followingNode.type === "TryStatement") {
        addBlockOrNotComment(followingNode.finalizer, comment);
        return true;
      }
      if (followingNode.type === "CatchClause") {
        addBlockOrNotComment(followingNode.body, comment);
        return true;
      }
      return false;
    }
    function handleMemberExpressionComments(_ref39) {
      let {
        comment,
        enclosingNode,
        followingNode
      } = _ref39;
      if (isMemberExpression(enclosingNode) && (followingNode === null || followingNode === void 0 ? void 0 : followingNode.type) === "Identifier") {
        addLeadingComment(enclosingNode, comment);
        return true;
      }
      return false;
    }
    function handleConditionalExpressionComments(_ref40) {
      let {
        comment,
        precedingNode,
        enclosingNode,
        followingNode,
        text
      } = _ref40;
      const isSameLineAsPrecedingNode = precedingNode && !hasNewlineInRange(text, locEnd(precedingNode), locStart(comment));
      if ((!precedingNode || !isSameLineAsPrecedingNode) && ((enclosingNode === null || enclosingNode === void 0 ? void 0 : enclosingNode.type) === "ConditionalExpression" || (enclosingNode === null || enclosingNode === void 0 ? void 0 : enclosingNode.type) === "TSConditionalType") && followingNode) {
        addLeadingComment(followingNode, comment);
        return true;
      }
      return false;
    }
    function handleObjectPropertyAssignment(_ref41) {
      let {
        comment,
        precedingNode,
        enclosingNode
      } = _ref41;
      if (isObjectProperty(enclosingNode) && enclosingNode.shorthand && enclosingNode.key === precedingNode && enclosingNode.value.type === "AssignmentPattern") {
        addTrailingComment(enclosingNode.value.left, comment);
        return true;
      }
      return false;
    }
    var classLikeNodeTypes = /* @__PURE__ */ new Set(["ClassDeclaration", "ClassExpression", "DeclareClass", "DeclareInterface", "InterfaceDeclaration", "TSInterfaceDeclaration"]);
    function handleClassComments(_ref42) {
      let {
        comment,
        precedingNode,
        enclosingNode,
        followingNode
      } = _ref42;
      if (classLikeNodeTypes.has(enclosingNode === null || enclosingNode === void 0 ? void 0 : enclosingNode.type)) {
        if (isNonEmptyArray(enclosingNode.decorators) && !(followingNode && followingNode.type === "Decorator")) {
          addTrailingComment(getLast(enclosingNode.decorators), comment);
          return true;
        }
        if (enclosingNode.body && followingNode === enclosingNode.body) {
          addBlockStatementFirstComment(enclosingNode.body, comment);
          return true;
        }
        if (followingNode) {
          if (enclosingNode.superClass && followingNode === enclosingNode.superClass && precedingNode && (precedingNode === enclosingNode.id || precedingNode === enclosingNode.typeParameters)) {
            addTrailingComment(precedingNode, comment);
            return true;
          }
          for (const prop of ["implements", "extends", "mixins"]) {
            if (enclosingNode[prop] && followingNode === enclosingNode[prop][0]) {
              if (precedingNode && (precedingNode === enclosingNode.id || precedingNode === enclosingNode.typeParameters || precedingNode === enclosingNode.superClass)) {
                addTrailingComment(precedingNode, comment);
              } else {
                addDanglingComment(enclosingNode, comment, prop);
              }
              return true;
            }
          }
        }
      }
      return false;
    }
    var propertyLikeNodeTypes = /* @__PURE__ */ new Set(["ClassMethod", "ClassProperty", "PropertyDefinition", "TSAbstractPropertyDefinition", "TSAbstractMethodDefinition", "TSDeclareMethod", "MethodDefinition", "ClassAccessorProperty", "AccessorProperty", "TSAbstractAccessorProperty"]);
    function handleMethodNameComments(_ref43) {
      let {
        comment,
        precedingNode,
        enclosingNode,
        text
      } = _ref43;
      if (enclosingNode && precedingNode && getNextNonSpaceNonCommentCharacter(text, comment, locEnd) === "(" && (enclosingNode.type === "Property" || enclosingNode.type === "TSDeclareMethod" || enclosingNode.type === "TSAbstractMethodDefinition") && precedingNode.type === "Identifier" && enclosingNode.key === precedingNode && getNextNonSpaceNonCommentCharacter(text, precedingNode, locEnd) !== ":") {
        addTrailingComment(precedingNode, comment);
        return true;
      }
      if ((precedingNode === null || precedingNode === void 0 ? void 0 : precedingNode.type) === "Decorator" && propertyLikeNodeTypes.has(enclosingNode === null || enclosingNode === void 0 ? void 0 : enclosingNode.type)) {
        addTrailingComment(precedingNode, comment);
        return true;
      }
      return false;
    }
    var functionLikeNodeTypes = /* @__PURE__ */ new Set(["FunctionDeclaration", "FunctionExpression", "ClassMethod", "MethodDefinition", "ObjectMethod"]);
    function handleFunctionNameComments(_ref44) {
      let {
        comment,
        precedingNode,
        enclosingNode,
        text
      } = _ref44;
      if (getNextNonSpaceNonCommentCharacter(text, comment, locEnd) !== "(") {
        return false;
      }
      if (precedingNode && functionLikeNodeTypes.has(enclosingNode === null || enclosingNode === void 0 ? void 0 : enclosingNode.type)) {
        addTrailingComment(precedingNode, comment);
        return true;
      }
      return false;
    }
    function handleCommentAfterArrowParams(_ref45) {
      let {
        comment,
        enclosingNode,
        text
      } = _ref45;
      if (!((enclosingNode === null || enclosingNode === void 0 ? void 0 : enclosingNode.type) === "ArrowFunctionExpression")) {
        return false;
      }
      const index = getNextNonSpaceNonCommentCharacterIndex(text, comment, locEnd);
      if (index !== false && text.slice(index, index + 2) === "=>") {
        addDanglingComment(enclosingNode, comment);
        return true;
      }
      return false;
    }
    function handleCommentInEmptyParens(_ref46) {
      let {
        comment,
        enclosingNode,
        text
      } = _ref46;
      if (getNextNonSpaceNonCommentCharacter(text, comment, locEnd) !== ")") {
        return false;
      }
      if (enclosingNode && (isRealFunctionLikeNode(enclosingNode) && getFunctionParameters(enclosingNode).length === 0 || isCallLikeExpression(enclosingNode) && getCallArguments(enclosingNode).length === 0)) {
        addDanglingComment(enclosingNode, comment);
        return true;
      }
      if (((enclosingNode === null || enclosingNode === void 0 ? void 0 : enclosingNode.type) === "MethodDefinition" || (enclosingNode === null || enclosingNode === void 0 ? void 0 : enclosingNode.type) === "TSAbstractMethodDefinition") && getFunctionParameters(enclosingNode.value).length === 0) {
        addDanglingComment(enclosingNode.value, comment);
        return true;
      }
      return false;
    }
    function handleLastFunctionArgComments(_ref47) {
      let {
        comment,
        precedingNode,
        enclosingNode,
        followingNode,
        text
      } = _ref47;
      if ((precedingNode === null || precedingNode === void 0 ? void 0 : precedingNode.type) === "FunctionTypeParam" && (enclosingNode === null || enclosingNode === void 0 ? void 0 : enclosingNode.type) === "FunctionTypeAnnotation" && (followingNode === null || followingNode === void 0 ? void 0 : followingNode.type) !== "FunctionTypeParam") {
        addTrailingComment(precedingNode, comment);
        return true;
      }
      if (((precedingNode === null || precedingNode === void 0 ? void 0 : precedingNode.type) === "Identifier" || (precedingNode === null || precedingNode === void 0 ? void 0 : precedingNode.type) === "AssignmentPattern") && enclosingNode && isRealFunctionLikeNode(enclosingNode) && getNextNonSpaceNonCommentCharacter(text, comment, locEnd) === ")") {
        addTrailingComment(precedingNode, comment);
        return true;
      }
      if ((enclosingNode === null || enclosingNode === void 0 ? void 0 : enclosingNode.type) === "FunctionDeclaration" && (followingNode === null || followingNode === void 0 ? void 0 : followingNode.type) === "BlockStatement") {
        const functionParamRightParenIndex = (() => {
          const parameters = getFunctionParameters(enclosingNode);
          if (parameters.length > 0) {
            return getNextNonSpaceNonCommentCharacterIndexWithStartIndex(text, locEnd(getLast(parameters)));
          }
          const functionParamLeftParenIndex = getNextNonSpaceNonCommentCharacterIndexWithStartIndex(text, locEnd(enclosingNode.id));
          return functionParamLeftParenIndex !== false && getNextNonSpaceNonCommentCharacterIndexWithStartIndex(text, functionParamLeftParenIndex + 1);
        })();
        if (locStart(comment) > functionParamRightParenIndex) {
          addBlockStatementFirstComment(followingNode, comment);
          return true;
        }
      }
      return false;
    }
    function handleLabeledStatementComments(_ref48) {
      let {
        comment,
        enclosingNode
      } = _ref48;
      if ((enclosingNode === null || enclosingNode === void 0 ? void 0 : enclosingNode.type) === "LabeledStatement") {
        addLeadingComment(enclosingNode, comment);
        return true;
      }
      return false;
    }
    function handleBreakAndContinueStatementComments(_ref49) {
      let {
        comment,
        enclosingNode
      } = _ref49;
      if (((enclosingNode === null || enclosingNode === void 0 ? void 0 : enclosingNode.type) === "ContinueStatement" || (enclosingNode === null || enclosingNode === void 0 ? void 0 : enclosingNode.type) === "BreakStatement") && !enclosingNode.label) {
        addTrailingComment(enclosingNode, comment);
        return true;
      }
      return false;
    }
    function handleCallExpressionComments(_ref50) {
      let {
        comment,
        precedingNode,
        enclosingNode
      } = _ref50;
      if (isCallExpression(enclosingNode) && precedingNode && enclosingNode.callee === precedingNode && enclosingNode.arguments.length > 0) {
        addLeadingComment(enclosingNode.arguments[0], comment);
        return true;
      }
      return false;
    }
    function handleUnionTypeComments(_ref51) {
      let {
        comment,
        precedingNode,
        enclosingNode,
        followingNode
      } = _ref51;
      if ((enclosingNode === null || enclosingNode === void 0 ? void 0 : enclosingNode.type) === "UnionTypeAnnotation" || (enclosingNode === null || enclosingNode === void 0 ? void 0 : enclosingNode.type) === "TSUnionType") {
        if (isPrettierIgnoreComment(comment)) {
          followingNode.prettierIgnore = true;
          comment.unignore = true;
        }
        if (precedingNode) {
          addTrailingComment(precedingNode, comment);
          return true;
        }
        return false;
      }
      if (((followingNode === null || followingNode === void 0 ? void 0 : followingNode.type) === "UnionTypeAnnotation" || (followingNode === null || followingNode === void 0 ? void 0 : followingNode.type) === "TSUnionType") && isPrettierIgnoreComment(comment)) {
        followingNode.types[0].prettierIgnore = true;
        comment.unignore = true;
      }
      return false;
    }
    function handlePropertyComments(_ref52) {
      let {
        comment,
        enclosingNode
      } = _ref52;
      if (isObjectProperty(enclosingNode)) {
        addLeadingComment(enclosingNode, comment);
        return true;
      }
      return false;
    }
    function handleOnlyComments(_ref53) {
      let {
        comment,
        enclosingNode,
        followingNode,
        ast,
        isLastComment
      } = _ref53;
      if (ast && ast.body && ast.body.length === 0) {
        if (isLastComment) {
          addDanglingComment(ast, comment);
        } else {
          addLeadingComment(ast, comment);
        }
        return true;
      }
      if ((enclosingNode === null || enclosingNode === void 0 ? void 0 : enclosingNode.type) === "Program" && (enclosingNode === null || enclosingNode === void 0 ? void 0 : enclosingNode.body.length) === 0 && !isNonEmptyArray(enclosingNode.directives)) {
        if (isLastComment) {
          addDanglingComment(enclosingNode, comment);
        } else {
          addLeadingComment(enclosingNode, comment);
        }
        return true;
      }
      if ((followingNode === null || followingNode === void 0 ? void 0 : followingNode.type) === "Program" && (followingNode === null || followingNode === void 0 ? void 0 : followingNode.body.length) === 0 && (enclosingNode === null || enclosingNode === void 0 ? void 0 : enclosingNode.type) === "ModuleExpression") {
        addDanglingComment(followingNode, comment);
        return true;
      }
      return false;
    }
    function handleForComments(_ref54) {
      let {
        comment,
        enclosingNode
      } = _ref54;
      if ((enclosingNode === null || enclosingNode === void 0 ? void 0 : enclosingNode.type) === "ForInStatement" || (enclosingNode === null || enclosingNode === void 0 ? void 0 : enclosingNode.type) === "ForOfStatement") {
        addLeadingComment(enclosingNode, comment);
        return true;
      }
      return false;
    }
    function handleModuleSpecifiersComments(_ref55) {
      let {
        comment,
        precedingNode,
        enclosingNode,
        text
      } = _ref55;
      if ((enclosingNode === null || enclosingNode === void 0 ? void 0 : enclosingNode.type) === "ImportSpecifier" || (enclosingNode === null || enclosingNode === void 0 ? void 0 : enclosingNode.type) === "ExportSpecifier") {
        addLeadingComment(enclosingNode, comment);
        return true;
      }
      const isImportDeclaration = (precedingNode === null || precedingNode === void 0 ? void 0 : precedingNode.type) === "ImportSpecifier" && (enclosingNode === null || enclosingNode === void 0 ? void 0 : enclosingNode.type) === "ImportDeclaration";
      const isExportDeclaration = (precedingNode === null || precedingNode === void 0 ? void 0 : precedingNode.type) === "ExportSpecifier" && (enclosingNode === null || enclosingNode === void 0 ? void 0 : enclosingNode.type) === "ExportNamedDeclaration";
      if ((isImportDeclaration || isExportDeclaration) && hasNewline(text, locEnd(comment))) {
        addTrailingComment(precedingNode, comment);
        return true;
      }
      return false;
    }
    function handleAssignmentPatternComments(_ref56) {
      let {
        comment,
        enclosingNode
      } = _ref56;
      if ((enclosingNode === null || enclosingNode === void 0 ? void 0 : enclosingNode.type) === "AssignmentPattern") {
        addLeadingComment(enclosingNode, comment);
        return true;
      }
      return false;
    }
    var assignmentLikeNodeTypes = /* @__PURE__ */ new Set(["VariableDeclarator", "AssignmentExpression", "TypeAlias", "TSTypeAliasDeclaration"]);
    var complexExprNodeTypes = /* @__PURE__ */ new Set(["ObjectExpression", "ArrayExpression", "TemplateLiteral", "TaggedTemplateExpression", "ObjectTypeAnnotation", "TSTypeLiteral"]);
    function handleVariableDeclaratorComments(_ref57) {
      let {
        comment,
        enclosingNode,
        followingNode
      } = _ref57;
      if (assignmentLikeNodeTypes.has(enclosingNode === null || enclosingNode === void 0 ? void 0 : enclosingNode.type) && followingNode && (complexExprNodeTypes.has(followingNode.type) || isBlockComment(comment))) {
        addLeadingComment(followingNode, comment);
        return true;
      }
      return false;
    }
    function handleTSFunctionTrailingComments(_ref58) {
      let {
        comment,
        enclosingNode,
        followingNode,
        text
      } = _ref58;
      if (!followingNode && ((enclosingNode === null || enclosingNode === void 0 ? void 0 : enclosingNode.type) === "TSMethodSignature" || (enclosingNode === null || enclosingNode === void 0 ? void 0 : enclosingNode.type) === "TSDeclareFunction" || (enclosingNode === null || enclosingNode === void 0 ? void 0 : enclosingNode.type) === "TSAbstractMethodDefinition") && getNextNonSpaceNonCommentCharacter(text, comment, locEnd) === ";") {
        addTrailingComment(enclosingNode, comment);
        return true;
      }
      return false;
    }
    function handleIgnoreComments(_ref59) {
      let {
        comment,
        enclosingNode,
        followingNode
      } = _ref59;
      if (isPrettierIgnoreComment(comment) && (enclosingNode === null || enclosingNode === void 0 ? void 0 : enclosingNode.type) === "TSMappedType" && (followingNode === null || followingNode === void 0 ? void 0 : followingNode.type) === "TSTypeParameter" && followingNode.constraint) {
        enclosingNode.prettierIgnore = true;
        comment.unignore = true;
        return true;
      }
    }
    function handleTSMappedTypeComments(_ref60) {
      let {
        comment,
        precedingNode,
        enclosingNode,
        followingNode
      } = _ref60;
      if ((enclosingNode === null || enclosingNode === void 0 ? void 0 : enclosingNode.type) !== "TSMappedType") {
        return false;
      }
      if ((followingNode === null || followingNode === void 0 ? void 0 : followingNode.type) === "TSTypeParameter" && followingNode.name) {
        addLeadingComment(followingNode.name, comment);
        return true;
      }
      if ((precedingNode === null || precedingNode === void 0 ? void 0 : precedingNode.type) === "TSTypeParameter" && precedingNode.constraint) {
        addTrailingComment(precedingNode.constraint, comment);
        return true;
      }
      return false;
    }
    function handleSwitchDefaultCaseComments(_ref61) {
      let {
        comment,
        enclosingNode,
        followingNode
      } = _ref61;
      if (!enclosingNode || enclosingNode.type !== "SwitchCase" || enclosingNode.test || !followingNode || followingNode !== enclosingNode.consequent[0]) {
        return false;
      }
      if (followingNode.type === "BlockStatement" && isLineComment(comment)) {
        addBlockStatementFirstComment(followingNode, comment);
      } else {
        addDanglingComment(enclosingNode, comment);
      }
      return true;
    }
    function isRealFunctionLikeNode(node) {
      return node.type === "ArrowFunctionExpression" || node.type === "FunctionExpression" || node.type === "FunctionDeclaration" || node.type === "ObjectMethod" || node.type === "ClassMethod" || node.type === "TSDeclareFunction" || node.type === "TSCallSignatureDeclaration" || node.type === "TSConstructSignatureDeclaration" || node.type === "TSMethodSignature" || node.type === "TSConstructorType" || node.type === "TSFunctionType" || node.type === "TSDeclareMethod";
    }
    function getCommentChildNodes(node, options) {
      if ((options.parser === "typescript" || options.parser === "flow" || options.parser === "acorn" || options.parser === "espree" || options.parser === "meriyah" || options.parser === "__babel_estree") && node.type === "MethodDefinition" && node.value && node.value.type === "FunctionExpression" && getFunctionParameters(node.value).length === 0 && !node.value.returnType && !isNonEmptyArray(node.value.typeParameters) && node.value.body) {
        return [...node.decorators || [], node.key, node.value.body];
      }
    }
    function willPrintOwnComments(path) {
      const node = path.getValue();
      const parent = path.getParentNode();
      const hasFlowAnnotations = (node2) => hasFlowAnnotationComment(getComments(node2, CommentCheckFlags.Leading)) || hasFlowAnnotationComment(getComments(node2, CommentCheckFlags.Trailing));
      return (node && (isJsxNode(node) || hasFlowShorthandAnnotationComment(node) || isCallExpression(parent) && hasFlowAnnotations(node)) || parent && (parent.type === "JSXSpreadAttribute" || parent.type === "JSXSpreadChild" || parent.type === "UnionTypeAnnotation" || parent.type === "TSUnionType" || (parent.type === "ClassDeclaration" || parent.type === "ClassExpression") && parent.superClass === node)) && (!hasIgnoreComment(path) || parent.type === "UnionTypeAnnotation" || parent.type === "TSUnionType");
    }
    module.exports = {
      handleOwnLineComment,
      handleEndOfLineComment,
      handleRemainingComment,
      getCommentChildNodes,
      willPrintOwnComments
    };
  }
});
var require_needs_parens = __commonJS2({
  "src/language-js/needs-parens.js"(exports, module) {
    "use strict";
    init_define_process();
    var getLast = require_get_last();
    var isNonEmptyArray = require_is_non_empty_array();
    var {
      getFunctionParameters,
      getLeftSidePathName,
      hasFlowShorthandAnnotationComment,
      hasNakedLeftSide,
      hasNode,
      isBitwiseOperator,
      startsWithNoLookaheadToken,
      shouldFlatten,
      getPrecedence,
      isCallExpression,
      isMemberExpression,
      isObjectProperty,
      isTSTypeExpression
    } = require_utils3();
    function needsParens(path, options) {
      const parent = path.getParentNode();
      if (!parent) {
        return false;
      }
      const name = path.getName();
      const node = path.getNode();
      if (options.__isInHtmlInterpolation && !options.bracketSpacing && endsWithRightBracket(node) && isFollowedByRightBracket(path)) {
        return true;
      }
      if (isStatement(node)) {
        return false;
      }
      if (options.parser !== "flow" && hasFlowShorthandAnnotationComment(path.getValue())) {
        return true;
      }
      if (node.type === "Identifier") {
        if (node.extra && node.extra.parenthesized && /^PRETTIER_HTML_PLACEHOLDER_\d+_\d+_IN_JS$/.test(node.name)) {
          return true;
        }
        if (name === "left" && (node.name === "async" && !parent.await || node.name === "let") && parent.type === "ForOfStatement") {
          return true;
        }
        if (node.name === "let") {
          var _path$findAncestor;
          const expression = (_path$findAncestor = path.findAncestor((node2) => node2.type === "ForOfStatement")) === null || _path$findAncestor === void 0 ? void 0 : _path$findAncestor.left;
          if (expression && startsWithNoLookaheadToken(expression, (leftmostNode) => leftmostNode === node)) {
            return true;
          }
        }
        if (name === "object" && node.name === "let" && parent.type === "MemberExpression" && parent.computed && !parent.optional) {
          const statement = path.findAncestor((node2) => node2.type === "ExpressionStatement" || node2.type === "ForStatement" || node2.type === "ForInStatement");
          const expression = !statement ? void 0 : statement.type === "ExpressionStatement" ? statement.expression : statement.type === "ForStatement" ? statement.init : statement.left;
          if (expression && startsWithNoLookaheadToken(expression, (leftmostNode) => leftmostNode === node)) {
            return true;
          }
        }
        return false;
      }
      if (node.type === "ObjectExpression" || node.type === "FunctionExpression" || node.type === "ClassExpression" || node.type === "DoExpression") {
        var _path$findAncestor2;
        const expression = (_path$findAncestor2 = path.findAncestor((node2) => node2.type === "ExpressionStatement")) === null || _path$findAncestor2 === void 0 ? void 0 : _path$findAncestor2.expression;
        if (expression && startsWithNoLookaheadToken(expression, (leftmostNode) => leftmostNode === node)) {
          return true;
        }
      }
      switch (parent.type) {
        case "ParenthesizedExpression":
          return false;
        case "ClassDeclaration":
        case "ClassExpression": {
          if (name === "superClass" && (node.type === "ArrowFunctionExpression" || node.type === "AssignmentExpression" || node.type === "AwaitExpression" || node.type === "BinaryExpression" || node.type === "ConditionalExpression" || node.type === "LogicalExpression" || node.type === "NewExpression" || node.type === "ObjectExpression" || node.type === "SequenceExpression" || node.type === "TaggedTemplateExpression" || node.type === "UnaryExpression" || node.type === "UpdateExpression" || node.type === "YieldExpression" || node.type === "TSNonNullExpression")) {
            return true;
          }
          break;
        }
        case "ExportDefaultDeclaration": {
          return shouldWrapFunctionForExportDefault(path, options) || node.type === "SequenceExpression";
        }
        case "Decorator": {
          if (name === "expression") {
            if (isMemberExpression(node) && node.computed) {
              return true;
            }
            let hasCallExpression = false;
            let hasMemberExpression = false;
            let current = node;
            while (current) {
              switch (current.type) {
                case "MemberExpression":
                  hasMemberExpression = true;
                  current = current.object;
                  break;
                case "CallExpression":
                  if (hasMemberExpression || hasCallExpression) {
                    return options.parser !== "typescript";
                  }
                  hasCallExpression = true;
                  current = current.callee;
                  break;
                case "Identifier":
                  return false;
                case "TaggedTemplateExpression":
                  return options.parser !== "typescript";
                default:
                  return true;
              }
            }
            return true;
          }
          break;
        }
        case "ArrowFunctionExpression": {
          if (name === "body" && node.type !== "SequenceExpression" && startsWithNoLookaheadToken(node, (node2) => node2.type === "ObjectExpression")) {
            return true;
          }
          break;
        }
      }
      switch (node.type) {
        case "UpdateExpression":
          if (parent.type === "UnaryExpression") {
            return node.prefix && (node.operator === "++" && parent.operator === "+" || node.operator === "--" && parent.operator === "-");
          }
        case "UnaryExpression":
          switch (parent.type) {
            case "UnaryExpression":
              return node.operator === parent.operator && (node.operator === "+" || node.operator === "-");
            case "BindExpression":
              return true;
            case "MemberExpression":
            case "OptionalMemberExpression":
              return name === "object";
            case "TaggedTemplateExpression":
              return true;
            case "NewExpression":
            case "CallExpression":
            case "OptionalCallExpression":
              return name === "callee";
            case "BinaryExpression":
              return name === "left" && parent.operator === "**";
            case "TSNonNullExpression":
              return true;
            default:
              return false;
          }
        case "BinaryExpression": {
          if (parent.type === "UpdateExpression") {
            return true;
          }
          if (node.operator === "in" && isPathInForStatementInitializer(path)) {
            return true;
          }
          if (node.operator === "|>" && node.extra && node.extra.parenthesized) {
            const grandParent = path.getParentNode(1);
            if (grandParent.type === "BinaryExpression" && grandParent.operator === "|>") {
              return true;
            }
          }
        }
        case "TSTypeAssertion":
        case "TSAsExpression":
        case "TSSatisfiesExpression":
        case "LogicalExpression":
          switch (parent.type) {
            case "TSSatisfiesExpression":
            case "TSAsExpression":
              return !isTSTypeExpression(node);
            case "ConditionalExpression":
              return isTSTypeExpression(node);
            case "CallExpression":
            case "NewExpression":
            case "OptionalCallExpression":
              return name === "callee";
            case "ClassExpression":
            case "ClassDeclaration":
              return name === "superClass";
            case "TSTypeAssertion":
            case "TaggedTemplateExpression":
            case "UnaryExpression":
            case "JSXSpreadAttribute":
            case "SpreadElement":
            case "SpreadProperty":
            case "BindExpression":
            case "AwaitExpression":
            case "TSNonNullExpression":
            case "UpdateExpression":
              return true;
            case "MemberExpression":
            case "OptionalMemberExpression":
              return name === "object";
            case "AssignmentExpression":
            case "AssignmentPattern":
              return name === "left" && (node.type === "TSTypeAssertion" || isTSTypeExpression(node));
            case "LogicalExpression":
              if (node.type === "LogicalExpression") {
                return parent.operator !== node.operator;
              }
            case "BinaryExpression": {
              const {
                operator,
                type: type2
              } = node;
              if (!operator && type2 !== "TSTypeAssertion") {
                return true;
              }
              const precedence = getPrecedence(operator);
              const parentOperator = parent.operator;
              const parentPrecedence = getPrecedence(parentOperator);
              if (parentPrecedence > precedence) {
                return true;
              }
              if (name === "right" && parentPrecedence === precedence) {
                return true;
              }
              if (parentPrecedence === precedence && !shouldFlatten(parentOperator, operator)) {
                return true;
              }
              if (parentPrecedence < precedence && operator === "%") {
                return parentOperator === "+" || parentOperator === "-";
              }
              if (isBitwiseOperator(parentOperator)) {
                return true;
              }
              return false;
            }
            default:
              return false;
          }
        case "SequenceExpression":
          switch (parent.type) {
            case "ReturnStatement":
              return false;
            case "ForStatement":
              return false;
            case "ExpressionStatement":
              return name !== "expression";
            case "ArrowFunctionExpression":
              return name !== "body";
            default:
              return true;
          }
        case "YieldExpression":
          if (parent.type === "UnaryExpression" || parent.type === "AwaitExpression" || isTSTypeExpression(parent) || parent.type === "TSNonNullExpression") {
            return true;
          }
        case "AwaitExpression":
          switch (parent.type) {
            case "TaggedTemplateExpression":
            case "UnaryExpression":
            case "LogicalExpression":
            case "SpreadElement":
            case "SpreadProperty":
            case "TSAsExpression":
            case "TSSatisfiesExpression":
            case "TSNonNullExpression":
            case "BindExpression":
              return true;
            case "MemberExpression":
            case "OptionalMemberExpression":
              return name === "object";
            case "NewExpression":
            case "CallExpression":
            case "OptionalCallExpression":
              return name === "callee";
            case "ConditionalExpression":
              return name === "test";
            case "BinaryExpression": {
              if (!node.argument && parent.operator === "|>") {
                return false;
              }
              return true;
            }
            default:
              return false;
          }
        case "TSConditionalType":
        case "TSFunctionType":
        case "TSConstructorType":
          if (name === "extendsType" && parent.type === "TSConditionalType") {
            if (node.type === "TSConditionalType") {
              return true;
            }
            let {
              typeAnnotation
            } = node.returnType || node.typeAnnotation;
            if (typeAnnotation.type === "TSTypePredicate" && typeAnnotation.typeAnnotation) {
              typeAnnotation = typeAnnotation.typeAnnotation.typeAnnotation;
            }
            if (typeAnnotation.type === "TSInferType" && typeAnnotation.typeParameter.constraint) {
              return true;
            }
          }
          if (name === "checkType" && parent.type === "TSConditionalType") {
            return true;
          }
        case "TSUnionType":
        case "TSIntersectionType":
          if ((parent.type === "TSUnionType" || parent.type === "TSIntersectionType") && parent.types.length > 1 && (!node.types || node.types.length > 1)) {
            return true;
          }
        case "TSInferType":
          if (node.type === "TSInferType" && parent.type === "TSRestType") {
            return false;
          }
        case "TSTypeOperator":
          return parent.type === "TSArrayType" || parent.type === "TSOptionalType" || parent.type === "TSRestType" || name === "objectType" && parent.type === "TSIndexedAccessType" || parent.type === "TSTypeOperator" || parent.type === "TSTypeAnnotation" && path.getParentNode(1).type.startsWith("TSJSDoc");
        case "TSTypeQuery":
          return name === "objectType" && parent.type === "TSIndexedAccessType" || name === "elementType" && parent.type === "TSArrayType";
        case "TypeofTypeAnnotation":
          return name === "objectType" && (parent.type === "IndexedAccessType" || parent.type === "OptionalIndexedAccessType") || name === "elementType" && parent.type === "ArrayTypeAnnotation";
        case "ArrayTypeAnnotation":
          return parent.type === "NullableTypeAnnotation";
        case "IntersectionTypeAnnotation":
        case "UnionTypeAnnotation":
          return parent.type === "ArrayTypeAnnotation" || parent.type === "NullableTypeAnnotation" || parent.type === "IntersectionTypeAnnotation" || parent.type === "UnionTypeAnnotation" || name === "objectType" && (parent.type === "IndexedAccessType" || parent.type === "OptionalIndexedAccessType");
        case "NullableTypeAnnotation":
          return parent.type === "ArrayTypeAnnotation" || name === "objectType" && (parent.type === "IndexedAccessType" || parent.type === "OptionalIndexedAccessType");
        case "FunctionTypeAnnotation": {
          const ancestor = parent.type === "NullableTypeAnnotation" ? path.getParentNode(1) : parent;
          return ancestor.type === "UnionTypeAnnotation" || ancestor.type === "IntersectionTypeAnnotation" || ancestor.type === "ArrayTypeAnnotation" || name === "objectType" && (ancestor.type === "IndexedAccessType" || ancestor.type === "OptionalIndexedAccessType") || ancestor.type === "NullableTypeAnnotation" || parent.type === "FunctionTypeParam" && parent.name === null && getFunctionParameters(node).some((param) => param.typeAnnotation && param.typeAnnotation.type === "NullableTypeAnnotation");
        }
        case "OptionalIndexedAccessType":
          return name === "objectType" && parent.type === "IndexedAccessType";
        case "StringLiteral":
        case "NumericLiteral":
        case "Literal":
          if (typeof node.value === "string" && parent.type === "ExpressionStatement" && !parent.directive) {
            const grandParent = path.getParentNode(1);
            return grandParent.type === "Program" || grandParent.type === "BlockStatement";
          }
          return name === "object" && parent.type === "MemberExpression" && typeof node.value === "number";
        case "AssignmentExpression": {
          const grandParent = path.getParentNode(1);
          if (name === "body" && parent.type === "ArrowFunctionExpression") {
            return true;
          }
          if (name === "key" && (parent.type === "ClassProperty" || parent.type === "PropertyDefinition") && parent.computed) {
            return false;
          }
          if ((name === "init" || name === "update") && parent.type === "ForStatement") {
            return false;
          }
          if (parent.type === "ExpressionStatement") {
            return node.left.type === "ObjectPattern";
          }
          if (name === "key" && parent.type === "TSPropertySignature") {
            return false;
          }
          if (parent.type === "AssignmentExpression") {
            return false;
          }
          if (parent.type === "SequenceExpression" && grandParent && grandParent.type === "ForStatement" && (grandParent.init === parent || grandParent.update === parent)) {
            return false;
          }
          if (name === "value" && parent.type === "Property" && grandParent && grandParent.type === "ObjectPattern" && grandParent.properties.includes(parent)) {
            return false;
          }
          if (parent.type === "NGChainedExpression") {
            return false;
          }
          return true;
        }
        case "ConditionalExpression":
          switch (parent.type) {
            case "TaggedTemplateExpression":
            case "UnaryExpression":
            case "SpreadElement":
            case "SpreadProperty":
            case "BinaryExpression":
            case "LogicalExpression":
            case "NGPipeExpression":
            case "ExportDefaultDeclaration":
            case "AwaitExpression":
            case "JSXSpreadAttribute":
            case "TSTypeAssertion":
            case "TypeCastExpression":
            case "TSAsExpression":
            case "TSSatisfiesExpression":
            case "TSNonNullExpression":
              return true;
            case "NewExpression":
            case "CallExpression":
            case "OptionalCallExpression":
              return name === "callee";
            case "ConditionalExpression":
              return name === "test";
            case "MemberExpression":
            case "OptionalMemberExpression":
              return name === "object";
            default:
              return false;
          }
        case "FunctionExpression":
          switch (parent.type) {
            case "NewExpression":
            case "CallExpression":
            case "OptionalCallExpression":
              return name === "callee";
            case "TaggedTemplateExpression":
              return true;
            default:
              return false;
          }
        case "ArrowFunctionExpression":
          switch (parent.type) {
            case "BinaryExpression":
              return parent.operator !== "|>" || node.extra && node.extra.parenthesized;
            case "NewExpression":
            case "CallExpression":
            case "OptionalCallExpression":
              return name === "callee";
            case "MemberExpression":
            case "OptionalMemberExpression":
              return name === "object";
            case "TSAsExpression":
            case "TSSatisfiesExpression":
            case "TSNonNullExpression":
            case "BindExpression":
            case "TaggedTemplateExpression":
            case "UnaryExpression":
            case "LogicalExpression":
            case "AwaitExpression":
            case "TSTypeAssertion":
              return true;
            case "ConditionalExpression":
              return name === "test";
            default:
              return false;
          }
        case "ClassExpression":
          if (isNonEmptyArray(node.decorators)) {
            return true;
          }
          switch (parent.type) {
            case "NewExpression":
              return name === "callee";
            default:
              return false;
          }
        case "OptionalMemberExpression":
        case "OptionalCallExpression": {
          const parentParent = path.getParentNode(1);
          if (name === "object" && parent.type === "MemberExpression" || name === "callee" && (parent.type === "CallExpression" || parent.type === "NewExpression") || parent.type === "TSNonNullExpression" && parentParent.type === "MemberExpression" && parentParent.object === parent) {
            return true;
          }
        }
        case "CallExpression":
        case "MemberExpression":
        case "TaggedTemplateExpression":
        case "TSNonNullExpression":
          if (name === "callee" && (parent.type === "BindExpression" || parent.type === "NewExpression")) {
            let object = node;
            while (object) {
              switch (object.type) {
                case "CallExpression":
                case "OptionalCallExpression":
                  return true;
                case "MemberExpression":
                case "OptionalMemberExpression":
                case "BindExpression":
                  object = object.object;
                  break;
                case "TaggedTemplateExpression":
                  object = object.tag;
                  break;
                case "TSNonNullExpression":
                  object = object.expression;
                  break;
                default:
                  return false;
              }
            }
          }
          return false;
        case "BindExpression":
          return name === "callee" && (parent.type === "BindExpression" || parent.type === "NewExpression") || name === "object" && isMemberExpression(parent);
        case "NGPipeExpression":
          if (parent.type === "NGRoot" || parent.type === "NGMicrosyntaxExpression" || parent.type === "ObjectProperty" && !(node.extra && node.extra.parenthesized) || parent.type === "ArrayExpression" || isCallExpression(parent) && parent.arguments[name] === node || name === "right" && parent.type === "NGPipeExpression" || name === "property" && parent.type === "MemberExpression" || parent.type === "AssignmentExpression") {
            return false;
          }
          return true;
        case "JSXFragment":
        case "JSXElement":
          return name === "callee" || name === "left" && parent.type === "BinaryExpression" && parent.operator === "<" || parent.type !== "ArrayExpression" && parent.type !== "ArrowFunctionExpression" && parent.type !== "AssignmentExpression" && parent.type !== "AssignmentPattern" && parent.type !== "BinaryExpression" && parent.type !== "NewExpression" && parent.type !== "ConditionalExpression" && parent.type !== "ExpressionStatement" && parent.type !== "JsExpressionRoot" && parent.type !== "JSXAttribute" && parent.type !== "JSXElement" && parent.type !== "JSXExpressionContainer" && parent.type !== "JSXFragment" && parent.type !== "LogicalExpression" && !isCallExpression(parent) && !isObjectProperty(parent) && parent.type !== "ReturnStatement" && parent.type !== "ThrowStatement" && parent.type !== "TypeCastExpression" && parent.type !== "VariableDeclarator" && parent.type !== "YieldExpression";
        case "TypeAnnotation":
          return name === "returnType" && parent.type === "ArrowFunctionExpression" && includesFunctionTypeInObjectType(node);
      }
      return false;
    }
    function isStatement(node) {
      return node.type === "BlockStatement" || node.type === "BreakStatement" || node.type === "ClassBody" || node.type === "ClassDeclaration" || node.type === "ClassMethod" || node.type === "ClassProperty" || node.type === "PropertyDefinition" || node.type === "ClassPrivateProperty" || node.type === "ContinueStatement" || node.type === "DebuggerStatement" || node.type === "DeclareClass" || node.type === "DeclareExportAllDeclaration" || node.type === "DeclareExportDeclaration" || node.type === "DeclareFunction" || node.type === "DeclareInterface" || node.type === "DeclareModule" || node.type === "DeclareModuleExports" || node.type === "DeclareVariable" || node.type === "DoWhileStatement" || node.type === "EnumDeclaration" || node.type === "ExportAllDeclaration" || node.type === "ExportDefaultDeclaration" || node.type === "ExportNamedDeclaration" || node.type === "ExpressionStatement" || node.type === "ForInStatement" || node.type === "ForOfStatement" || node.type === "ForStatement" || node.type === "FunctionDeclaration" || node.type === "IfStatement" || node.type === "ImportDeclaration" || node.type === "InterfaceDeclaration" || node.type === "LabeledStatement" || node.type === "MethodDefinition" || node.type === "ReturnStatement" || node.type === "SwitchStatement" || node.type === "ThrowStatement" || node.type === "TryStatement" || node.type === "TSDeclareFunction" || node.type === "TSEnumDeclaration" || node.type === "TSImportEqualsDeclaration" || node.type === "TSInterfaceDeclaration" || node.type === "TSModuleDeclaration" || node.type === "TSNamespaceExportDeclaration" || node.type === "TypeAlias" || node.type === "VariableDeclaration" || node.type === "WhileStatement" || node.type === "WithStatement";
    }
    function isPathInForStatementInitializer(path) {
      let i = 0;
      let node = path.getValue();
      while (node) {
        const parent = path.getParentNode(i++);
        if (parent && parent.type === "ForStatement" && parent.init === node) {
          return true;
        }
        node = parent;
      }
      return false;
    }
    function includesFunctionTypeInObjectType(node) {
      return hasNode(node, (n1) => n1.type === "ObjectTypeAnnotation" && hasNode(n1, (n2) => n2.type === "FunctionTypeAnnotation" || void 0) || void 0);
    }
    function endsWithRightBracket(node) {
      switch (node.type) {
        case "ObjectExpression":
          return true;
        default:
          return false;
      }
    }
    function isFollowedByRightBracket(path) {
      const node = path.getValue();
      const parent = path.getParentNode();
      const name = path.getName();
      switch (parent.type) {
        case "NGPipeExpression":
          if (typeof name === "number" && parent.arguments[name] === node && parent.arguments.length - 1 === name) {
            return path.callParent(isFollowedByRightBracket);
          }
          break;
        case "ObjectProperty":
          if (name === "value") {
            const parentParent = path.getParentNode(1);
            return getLast(parentParent.properties) === parent;
          }
          break;
        case "BinaryExpression":
        case "LogicalExpression":
          if (name === "right") {
            return path.callParent(isFollowedByRightBracket);
          }
          break;
        case "ConditionalExpression":
          if (name === "alternate") {
            return path.callParent(isFollowedByRightBracket);
          }
          break;
        case "UnaryExpression":
          if (parent.prefix) {
            return path.callParent(isFollowedByRightBracket);
          }
          break;
      }
      return false;
    }
    function shouldWrapFunctionForExportDefault(path, options) {
      const node = path.getValue();
      const parent = path.getParentNode();
      if (node.type === "FunctionExpression" || node.type === "ClassExpression") {
        return parent.type === "ExportDefaultDeclaration" || !needsParens(path, options);
      }
      if (!hasNakedLeftSide(node) || parent.type !== "ExportDefaultDeclaration" && needsParens(path, options)) {
        return false;
      }
      return path.call((childPath) => shouldWrapFunctionForExportDefault(childPath, options), ...getLeftSidePathName(path, node));
    }
    module.exports = needsParens;
  }
});
var require_print_preprocess = __commonJS2({
  "src/language-js/print-preprocess.js"(exports, module) {
    "use strict";
    init_define_process();
    function preprocess(ast, options) {
      switch (options.parser) {
        case "json":
        case "json5":
        case "json-stringify":
        case "__js_expression":
        case "__vue_expression":
        case "__vue_ts_expression":
          return Object.assign(Object.assign({}, ast), {}, {
            type: options.parser.startsWith("__") ? "JsExpressionRoot" : "JsonRoot",
            node: ast,
            comments: [],
            rootMarker: options.rootMarker
          });
        default:
          return ast;
      }
    }
    module.exports = preprocess;
  }
});
var require_html_binding = __commonJS2({
  "src/language-js/print/html-binding.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      builders: {
        join: join2,
        line,
        group,
        softline,
        indent
      }
    } = require_document();
    function printHtmlBinding(path, options, print) {
      const node = path.getValue();
      if (options.__onHtmlBindingRoot && path.getName() === null) {
        options.__onHtmlBindingRoot(node, options);
      }
      if (node.type !== "File") {
        return;
      }
      if (options.__isVueForBindingLeft) {
        return path.call((functionDeclarationPath) => {
          const printed = join2([",", line], functionDeclarationPath.map(print, "params"));
          const {
            params
          } = functionDeclarationPath.getValue();
          if (params.length === 1) {
            return printed;
          }
          return ["(", indent([softline, group(printed)]), softline, ")"];
        }, "program", "body", 0);
      }
      if (options.__isVueBindings) {
        return path.call((functionDeclarationPath) => join2([",", line], functionDeclarationPath.map(print, "params")), "program", "body", 0);
      }
    }
    function isVueEventBindingExpression(node) {
      switch (node.type) {
        case "MemberExpression":
          switch (node.property.type) {
            case "Identifier":
            case "NumericLiteral":
            case "StringLiteral":
              return isVueEventBindingExpression(node.object);
          }
          return false;
        case "Identifier":
          return true;
        default:
          return false;
      }
    }
    module.exports = {
      isVueEventBindingExpression,
      printHtmlBinding
    };
  }
});
var require_binaryish = __commonJS2({
  "src/language-js/print/binaryish.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      printComments
    } = require_comments();
    var {
      getLast
    } = require_util();
    var {
      builders: {
        join: join2,
        line,
        softline,
        group,
        indent,
        align,
        indentIfBreak
      },
      utils: {
        cleanDoc,
        getDocParts,
        isConcat
      }
    } = require_document();
    var {
      hasLeadingOwnLineComment,
      isBinaryish,
      isJsxNode,
      shouldFlatten,
      hasComment,
      CommentCheckFlags,
      isCallExpression,
      isMemberExpression,
      isObjectProperty,
      isEnabledHackPipeline
    } = require_utils3();
    var uid = 0;
    function printBinaryishExpression(path, options, print) {
      const node = path.getValue();
      const parent = path.getParentNode();
      const parentParent = path.getParentNode(1);
      const isInsideParenthesis = node !== parent.body && (parent.type === "IfStatement" || parent.type === "WhileStatement" || parent.type === "SwitchStatement" || parent.type === "DoWhileStatement");
      const isHackPipeline = isEnabledHackPipeline(options) && node.operator === "|>";
      const parts = printBinaryishExpressions(path, print, options, false, isInsideParenthesis);
      if (isInsideParenthesis) {
        return parts;
      }
      if (isHackPipeline) {
        return group(parts);
      }
      if (isCallExpression(parent) && parent.callee === node || parent.type === "UnaryExpression" || isMemberExpression(parent) && !parent.computed) {
        return group([indent([softline, ...parts]), softline]);
      }
      const shouldNotIndent = parent.type === "ReturnStatement" || parent.type === "ThrowStatement" || parent.type === "JSXExpressionContainer" && parentParent.type === "JSXAttribute" || node.operator !== "|" && parent.type === "JsExpressionRoot" || node.type !== "NGPipeExpression" && (parent.type === "NGRoot" && options.parser === "__ng_binding" || parent.type === "NGMicrosyntaxExpression" && parentParent.type === "NGMicrosyntax" && parentParent.body.length === 1) || node === parent.body && parent.type === "ArrowFunctionExpression" || node !== parent.body && parent.type === "ForStatement" || parent.type === "ConditionalExpression" && parentParent.type !== "ReturnStatement" && parentParent.type !== "ThrowStatement" && !isCallExpression(parentParent) || parent.type === "TemplateLiteral";
      const shouldIndentIfInlining = parent.type === "AssignmentExpression" || parent.type === "VariableDeclarator" || parent.type === "ClassProperty" || parent.type === "PropertyDefinition" || parent.type === "TSAbstractPropertyDefinition" || parent.type === "ClassPrivateProperty" || isObjectProperty(parent);
      const samePrecedenceSubExpression = isBinaryish(node.left) && shouldFlatten(node.operator, node.left.operator);
      if (shouldNotIndent || shouldInlineLogicalExpression(node) && !samePrecedenceSubExpression || !shouldInlineLogicalExpression(node) && shouldIndentIfInlining) {
        return group(parts);
      }
      if (parts.length === 0) {
        return "";
      }
      const hasJsx = isJsxNode(node.right);
      const firstGroupIndex = parts.findIndex((part) => typeof part !== "string" && !Array.isArray(part) && part.type === "group");
      const headParts = parts.slice(0, firstGroupIndex === -1 ? 1 : firstGroupIndex + 1);
      const rest = parts.slice(headParts.length, hasJsx ? -1 : void 0);
      const groupId = Symbol("logicalChain-" + ++uid);
      const chain = group([...headParts, indent(rest)], {
        id: groupId
      });
      if (!hasJsx) {
        return chain;
      }
      const jsxPart = getLast(parts);
      return group([chain, indentIfBreak(jsxPart, {
        groupId
      })]);
    }
    function printBinaryishExpressions(path, print, options, isNested, isInsideParenthesis) {
      const node = path.getValue();
      if (!isBinaryish(node)) {
        return [group(print())];
      }
      let parts = [];
      if (shouldFlatten(node.operator, node.left.operator)) {
        parts = path.call((left) => printBinaryishExpressions(left, print, options, true, isInsideParenthesis), "left");
      } else {
        parts.push(group(print("left")));
      }
      const shouldInline = shouldInlineLogicalExpression(node);
      const lineBeforeOperator = (node.operator === "|>" || node.type === "NGPipeExpression" || node.operator === "|" && options.parser === "__vue_expression") && !hasLeadingOwnLineComment(options.originalText, node.right);
      const operator = node.type === "NGPipeExpression" ? "|" : node.operator;
      const rightSuffix = node.type === "NGPipeExpression" && node.arguments.length > 0 ? group(indent([line, ": ", join2([line, ": "], path.map(print, "arguments").map((arg) => align(2, group(arg))))])) : "";
      let right;
      if (shouldInline) {
        right = [operator, " ", print("right"), rightSuffix];
      } else {
        const isHackPipeline = isEnabledHackPipeline(options) && operator === "|>";
        const rightContent = isHackPipeline ? path.call((left) => printBinaryishExpressions(left, print, options, true, isInsideParenthesis), "right") : print("right");
        right = [lineBeforeOperator ? line : "", operator, lineBeforeOperator ? " " : line, rightContent, rightSuffix];
      }
      const parent = path.getParentNode();
      const shouldBreak = hasComment(node.left, CommentCheckFlags.Trailing | CommentCheckFlags.Line);
      const shouldGroup = shouldBreak || !(isInsideParenthesis && node.type === "LogicalExpression") && parent.type !== node.type && node.left.type !== node.type && node.right.type !== node.type;
      parts.push(lineBeforeOperator ? "" : " ", shouldGroup ? group(right, {
        shouldBreak
      }) : right);
      if (isNested && hasComment(node)) {
        const printed = cleanDoc(printComments(path, parts, options));
        if (isConcat(printed) || printed.type === "fill") {
          return getDocParts(printed);
        }
        return [printed];
      }
      return parts;
    }
    function shouldInlineLogicalExpression(node) {
      if (node.type !== "LogicalExpression") {
        return false;
      }
      if (node.right.type === "ObjectExpression" && node.right.properties.length > 0) {
        return true;
      }
      if (node.right.type === "ArrayExpression" && node.right.elements.length > 0) {
        return true;
      }
      if (isJsxNode(node.right)) {
        return true;
      }
      return false;
    }
    module.exports = {
      printBinaryishExpression,
      shouldInlineLogicalExpression
    };
  }
});
var require_angular = __commonJS2({
  "src/language-js/print/angular.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      builders: {
        join: join2,
        line,
        group
      }
    } = require_document();
    var {
      hasNode,
      hasComment,
      getComments
    } = require_utils3();
    var {
      printBinaryishExpression
    } = require_binaryish();
    function printAngular(path, options, print) {
      const node = path.getValue();
      if (!node.type.startsWith("NG")) {
        return;
      }
      switch (node.type) {
        case "NGRoot":
          return [print("node"), !hasComment(node.node) ? "" : " //" + getComments(node.node)[0].value.trimEnd()];
        case "NGPipeExpression":
          return printBinaryishExpression(path, options, print);
        case "NGChainedExpression":
          return group(join2([";", line], path.map((childPath) => hasNgSideEffect(childPath) ? print() : ["(", print(), ")"], "expressions")));
        case "NGEmptyExpression":
          return "";
        case "NGQuotedExpression":
          return [node.prefix, ": ", node.value.trim()];
        case "NGMicrosyntax":
          return path.map((childPath, index) => [index === 0 ? "" : isNgForOf(childPath.getValue(), index, node) ? " " : [";", line], print()], "body");
        case "NGMicrosyntaxKey":
          return /^[$_a-z][\w$]*(?:-[$_a-z][\w$])*$/i.test(node.name) ? node.name : JSON.stringify(node.name);
        case "NGMicrosyntaxExpression":
          return [print("expression"), node.alias === null ? "" : [" as ", print("alias")]];
        case "NGMicrosyntaxKeyedExpression": {
          const index = path.getName();
          const parentNode = path.getParentNode();
          const shouldNotPrintColon = isNgForOf(node, index, parentNode) || (index === 1 && (node.key.name === "then" || node.key.name === "else") || index === 2 && node.key.name === "else" && parentNode.body[index - 1].type === "NGMicrosyntaxKeyedExpression" && parentNode.body[index - 1].key.name === "then") && parentNode.body[0].type === "NGMicrosyntaxExpression";
          return [print("key"), shouldNotPrintColon ? " " : ": ", print("expression")];
        }
        case "NGMicrosyntaxLet":
          return ["let ", print("key"), node.value === null ? "" : [" = ", print("value")]];
        case "NGMicrosyntaxAs":
          return [print("key"), " as ", print("alias")];
        default:
          throw new Error(`Unknown Angular node type: ${JSON.stringify(node.type)}.`);
      }
    }
    function isNgForOf(node, index, parentNode) {
      return node.type === "NGMicrosyntaxKeyedExpression" && node.key.name === "of" && index === 1 && parentNode.body[0].type === "NGMicrosyntaxLet" && parentNode.body[0].value === null;
    }
    function hasNgSideEffect(path) {
      return hasNode(path.getValue(), (node) => {
        switch (node.type) {
          case void 0:
            return false;
          case "CallExpression":
          case "OptionalCallExpression":
          case "AssignmentExpression":
            return true;
        }
      });
    }
    module.exports = {
      printAngular
    };
  }
});
var require_jsx = __commonJS2({
  "src/language-js/print/jsx.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      printComments,
      printDanglingComments,
      printCommentsSeparately
    } = require_comments();
    var {
      builders: {
        line,
        hardline,
        softline,
        group,
        indent,
        conditionalGroup,
        fill,
        ifBreak,
        lineSuffixBoundary,
        join: join2
      },
      utils: {
        willBreak
      }
    } = require_document();
    var {
      getLast,
      getPreferredQuote
    } = require_util();
    var {
      isJsxNode,
      rawText,
      isCallExpression,
      isStringLiteral,
      isBinaryish,
      hasComment,
      CommentCheckFlags,
      hasNodeIgnoreComment
    } = require_utils3();
    var pathNeedsParens = require_needs_parens();
    var {
      willPrintOwnComments
    } = require_comments2();
    var isEmptyStringOrAnyLine = (doc) => doc === "" || doc === line || doc === hardline || doc === softline;
    function printJsxElementInternal(path, options, print) {
      const node = path.getValue();
      if (node.type === "JSXElement" && isEmptyJsxElement(node)) {
        return [print("openingElement"), print("closingElement")];
      }
      const openingLines = node.type === "JSXElement" ? print("openingElement") : print("openingFragment");
      const closingLines = node.type === "JSXElement" ? print("closingElement") : print("closingFragment");
      if (node.children.length === 1 && node.children[0].type === "JSXExpressionContainer" && (node.children[0].expression.type === "TemplateLiteral" || node.children[0].expression.type === "TaggedTemplateExpression")) {
        return [openingLines, ...path.map(print, "children"), closingLines];
      }
      node.children = node.children.map((child) => {
        if (isJsxWhitespaceExpression(child)) {
          return {
            type: "JSXText",
            value: " ",
            raw: " "
          };
        }
        return child;
      });
      const containsTag = node.children.some(isJsxNode);
      const containsMultipleExpressions = node.children.filter((child) => child.type === "JSXExpressionContainer").length > 1;
      const containsMultipleAttributes = node.type === "JSXElement" && node.openingElement.attributes.length > 1;
      let forcedBreak = willBreak(openingLines) || containsTag || containsMultipleAttributes || containsMultipleExpressions;
      const isMdxBlock = path.getParentNode().rootMarker === "mdx";
      const rawJsxWhitespace = options.singleQuote ? "{' '}" : '{" "}';
      const jsxWhitespace = isMdxBlock ? " " : ifBreak([rawJsxWhitespace, softline], " ");
      const isFacebookTranslationTag = node.openingElement && node.openingElement.name && node.openingElement.name.name === "fbt";
      const children = printJsxChildren(path, options, print, jsxWhitespace, isFacebookTranslationTag);
      const containsText = node.children.some((child) => isMeaningfulJsxText(child));
      for (let i = children.length - 2; i >= 0; i--) {
        const isPairOfEmptyStrings = children[i] === "" && children[i + 1] === "";
        const isPairOfHardlines = children[i] === hardline && children[i + 1] === "" && children[i + 2] === hardline;
        const isLineFollowedByJsxWhitespace = (children[i] === softline || children[i] === hardline) && children[i + 1] === "" && children[i + 2] === jsxWhitespace;
        const isJsxWhitespaceFollowedByLine = children[i] === jsxWhitespace && children[i + 1] === "" && (children[i + 2] === softline || children[i + 2] === hardline);
        const isDoubleJsxWhitespace = children[i] === jsxWhitespace && children[i + 1] === "" && children[i + 2] === jsxWhitespace;
        const isPairOfHardOrSoftLines = children[i] === softline && children[i + 1] === "" && children[i + 2] === hardline || children[i] === hardline && children[i + 1] === "" && children[i + 2] === softline;
        if (isPairOfHardlines && containsText || isPairOfEmptyStrings || isLineFollowedByJsxWhitespace || isDoubleJsxWhitespace || isPairOfHardOrSoftLines) {
          children.splice(i, 2);
        } else if (isJsxWhitespaceFollowedByLine) {
          children.splice(i + 1, 2);
        }
      }
      while (children.length > 0 && isEmptyStringOrAnyLine(getLast(children))) {
        children.pop();
      }
      while (children.length > 1 && isEmptyStringOrAnyLine(children[0]) && isEmptyStringOrAnyLine(children[1])) {
        children.shift();
        children.shift();
      }
      const multilineChildren = [];
      for (const [i, child] of children.entries()) {
        if (child === jsxWhitespace) {
          if (i === 1 && children[i - 1] === "") {
            if (children.length === 2) {
              multilineChildren.push(rawJsxWhitespace);
              continue;
            }
            multilineChildren.push([rawJsxWhitespace, hardline]);
            continue;
          } else if (i === children.length - 1) {
            multilineChildren.push(rawJsxWhitespace);
            continue;
          } else if (children[i - 1] === "" && children[i - 2] === hardline) {
            multilineChildren.push(rawJsxWhitespace);
            continue;
          }
        }
        multilineChildren.push(child);
        if (willBreak(child)) {
          forcedBreak = true;
        }
      }
      const content = containsText ? fill(multilineChildren) : group(multilineChildren, {
        shouldBreak: true
      });
      if (isMdxBlock) {
        return content;
      }
      const multiLineElem = group([openingLines, indent([hardline, content]), hardline, closingLines]);
      if (forcedBreak) {
        return multiLineElem;
      }
      return conditionalGroup([group([openingLines, ...children, closingLines]), multiLineElem]);
    }
    function printJsxChildren(path, options, print, jsxWhitespace, isFacebookTranslationTag) {
      const parts = [];
      path.each((childPath, i, children) => {
        const child = childPath.getValue();
        if (child.type === "JSXText") {
          const text = rawText(child);
          if (isMeaningfulJsxText(child)) {
            const words = text.split(matchJsxWhitespaceRegex);
            if (words[0] === "") {
              parts.push("");
              words.shift();
              if (/\n/.test(words[0])) {
                const next = children[i + 1];
                parts.push(separatorWithWhitespace(isFacebookTranslationTag, words[1], child, next));
              } else {
                parts.push(jsxWhitespace);
              }
              words.shift();
            }
            let endWhitespace;
            if (getLast(words) === "") {
              words.pop();
              endWhitespace = words.pop();
            }
            if (words.length === 0) {
              return;
            }
            for (const [i2, word] of words.entries()) {
              if (i2 % 2 === 1) {
                parts.push(line);
              } else {
                parts.push(word);
              }
            }
            if (endWhitespace !== void 0) {
              if (/\n/.test(endWhitespace)) {
                const next = children[i + 1];
                parts.push(separatorWithWhitespace(isFacebookTranslationTag, getLast(parts), child, next));
              } else {
                parts.push(jsxWhitespace);
              }
            } else {
              const next = children[i + 1];
              parts.push(separatorNoWhitespace(isFacebookTranslationTag, getLast(parts), child, next));
            }
          } else if (/\n/.test(text)) {
            if (text.match(/\n/g).length > 1) {
              parts.push("", hardline);
            }
          } else {
            parts.push("", jsxWhitespace);
          }
        } else {
          const printedChild = print();
          parts.push(printedChild);
          const next = children[i + 1];
          const directlyFollowedByMeaningfulText = next && isMeaningfulJsxText(next);
          if (directlyFollowedByMeaningfulText) {
            const firstWord = trimJsxWhitespace(rawText(next)).split(matchJsxWhitespaceRegex)[0];
            parts.push(separatorNoWhitespace(isFacebookTranslationTag, firstWord, child, next));
          } else {
            parts.push(hardline);
          }
        }
      }, "children");
      return parts;
    }
    function separatorNoWhitespace(isFacebookTranslationTag, child, childNode, nextNode) {
      if (isFacebookTranslationTag) {
        return "";
      }
      if (childNode.type === "JSXElement" && !childNode.closingElement || nextNode && nextNode.type === "JSXElement" && !nextNode.closingElement) {
        return child.length === 1 ? softline : hardline;
      }
      return softline;
    }
    function separatorWithWhitespace(isFacebookTranslationTag, child, childNode, nextNode) {
      if (isFacebookTranslationTag) {
        return hardline;
      }
      if (child.length === 1) {
        return childNode.type === "JSXElement" && !childNode.closingElement || nextNode && nextNode.type === "JSXElement" && !nextNode.closingElement ? hardline : softline;
      }
      return hardline;
    }
    function maybeWrapJsxElementInParens(path, elem, options) {
      const parent = path.getParentNode();
      if (!parent) {
        return elem;
      }
      const NO_WRAP_PARENTS = {
        ArrayExpression: true,
        JSXAttribute: true,
        JSXElement: true,
        JSXExpressionContainer: true,
        JSXFragment: true,
        ExpressionStatement: true,
        CallExpression: true,
        OptionalCallExpression: true,
        ConditionalExpression: true,
        JsExpressionRoot: true
      };
      if (NO_WRAP_PARENTS[parent.type]) {
        return elem;
      }
      const shouldBreak = path.match(void 0, (node) => node.type === "ArrowFunctionExpression", isCallExpression, (node) => node.type === "JSXExpressionContainer");
      const needsParens = pathNeedsParens(path, options);
      return group([needsParens ? "" : ifBreak("("), indent([softline, elem]), softline, needsParens ? "" : ifBreak(")")], {
        shouldBreak
      });
    }
    function printJsxAttribute(path, options, print) {
      const node = path.getValue();
      const parts = [];
      parts.push(print("name"));
      if (node.value) {
        let res;
        if (isStringLiteral(node.value)) {
          const raw = rawText(node.value);
          let final = raw.slice(1, -1).replace(/&apos;/g, "'").replace(/&quot;/g, '"');
          const {
            escaped,
            quote,
            regex
          } = getPreferredQuote(final, options.jsxSingleQuote ? "'" : '"');
          final = final.replace(regex, escaped);
          const {
            leading,
            trailing
          } = path.call(() => printCommentsSeparately(path, options), "value");
          res = [leading, quote, final, quote, trailing];
        } else {
          res = print("value");
        }
        parts.push("=", res);
      }
      return parts;
    }
    function printJsxExpressionContainer(path, options, print) {
      const node = path.getValue();
      const shouldInline = (node2, parent) => node2.type === "JSXEmptyExpression" || !hasComment(node2) && (node2.type === "ArrayExpression" || node2.type === "ObjectExpression" || node2.type === "ArrowFunctionExpression" || node2.type === "AwaitExpression" && (shouldInline(node2.argument, node2) || node2.argument.type === "JSXElement") || isCallExpression(node2) || node2.type === "FunctionExpression" || node2.type === "TemplateLiteral" || node2.type === "TaggedTemplateExpression" || node2.type === "DoExpression" || isJsxNode(parent) && (node2.type === "ConditionalExpression" || isBinaryish(node2)));
      if (shouldInline(node.expression, path.getParentNode(0))) {
        return group(["{", print("expression"), lineSuffixBoundary, "}"]);
      }
      return group(["{", indent([softline, print("expression")]), softline, lineSuffixBoundary, "}"]);
    }
    function printJsxOpeningElement(path, options, print) {
      const node = path.getValue();
      const nameHasComments = node.name && hasComment(node.name) || node.typeParameters && hasComment(node.typeParameters);
      if (node.selfClosing && node.attributes.length === 0 && !nameHasComments) {
        return ["<", print("name"), print("typeParameters"), " />"];
      }
      if (node.attributes && node.attributes.length === 1 && node.attributes[0].value && isStringLiteral(node.attributes[0].value) && !node.attributes[0].value.value.includes("\n") && !nameHasComments && !hasComment(node.attributes[0])) {
        return group(["<", print("name"), print("typeParameters"), " ", ...path.map(print, "attributes"), node.selfClosing ? " />" : ">"]);
      }
      const shouldBreak = node.attributes && node.attributes.some((attr) => attr.value && isStringLiteral(attr.value) && attr.value.value.includes("\n"));
      const attributeLine = options.singleAttributePerLine && node.attributes.length > 1 ? hardline : line;
      return group(["<", print("name"), print("typeParameters"), indent(path.map(() => [attributeLine, print()], "attributes")), ...printEndOfOpeningTag(node, options, nameHasComments)], {
        shouldBreak
      });
    }
    function printEndOfOpeningTag(node, options, nameHasComments) {
      if (node.selfClosing) {
        return [line, "/>"];
      }
      const bracketSameLine = shouldPrintBracketSameLine(node, options, nameHasComments);
      if (bracketSameLine) {
        return [">"];
      }
      return [softline, ">"];
    }
    function shouldPrintBracketSameLine(node, options, nameHasComments) {
      const lastAttrHasTrailingComments = node.attributes.length > 0 && hasComment(getLast(node.attributes), CommentCheckFlags.Trailing);
      return node.attributes.length === 0 && !nameHasComments || (options.bracketSameLine || options.jsxBracketSameLine) && (!nameHasComments || node.attributes.length > 0) && !lastAttrHasTrailingComments;
    }
    function printJsxClosingElement(path, options, print) {
      const node = path.getValue();
      const parts = [];
      parts.push("</");
      const printed = print("name");
      if (hasComment(node.name, CommentCheckFlags.Leading | CommentCheckFlags.Line)) {
        parts.push(indent([hardline, printed]), hardline);
      } else if (hasComment(node.name, CommentCheckFlags.Leading | CommentCheckFlags.Block)) {
        parts.push(" ", printed);
      } else {
        parts.push(printed);
      }
      parts.push(">");
      return parts;
    }
    function printJsxOpeningClosingFragment(path, options) {
      const node = path.getValue();
      const nodeHasComment = hasComment(node);
      const hasOwnLineComment = hasComment(node, CommentCheckFlags.Line);
      const isOpeningFragment = node.type === "JSXOpeningFragment";
      return [isOpeningFragment ? "<" : "</", indent([hasOwnLineComment ? hardline : nodeHasComment && !isOpeningFragment ? " " : "", printDanglingComments(path, options, true)]), hasOwnLineComment ? hardline : "", ">"];
    }
    function printJsxElement(path, options, print) {
      const elem = printComments(path, printJsxElementInternal(path, options, print), options);
      return maybeWrapJsxElementInParens(path, elem, options);
    }
    function printJsxEmptyExpression(path, options) {
      const node = path.getValue();
      const requiresHardline = hasComment(node, CommentCheckFlags.Line);
      return [printDanglingComments(path, options, !requiresHardline), requiresHardline ? hardline : ""];
    }
    function printJsxSpreadAttribute(path, options, print) {
      const node = path.getValue();
      return ["{", path.call((p) => {
        const printed = ["...", print()];
        const node2 = p.getValue();
        if (!hasComment(node2) || !willPrintOwnComments(p)) {
          return printed;
        }
        return [indent([softline, printComments(p, printed, options)]), softline];
      }, node.type === "JSXSpreadAttribute" ? "argument" : "expression"), "}"];
    }
    function printJsx(path, options, print) {
      const node = path.getValue();
      if (!node.type.startsWith("JSX")) {
        return;
      }
      switch (node.type) {
        case "JSXAttribute":
          return printJsxAttribute(path, options, print);
        case "JSXIdentifier":
          return String(node.name);
        case "JSXNamespacedName":
          return join2(":", [print("namespace"), print("name")]);
        case "JSXMemberExpression":
          return join2(".", [print("object"), print("property")]);
        case "JSXSpreadAttribute":
          return printJsxSpreadAttribute(path, options, print);
        case "JSXSpreadChild": {
          const printJsxSpreadChild = printJsxSpreadAttribute;
          return printJsxSpreadChild(path, options, print);
        }
        case "JSXExpressionContainer":
          return printJsxExpressionContainer(path, options, print);
        case "JSXFragment":
        case "JSXElement":
          return printJsxElement(path, options, print);
        case "JSXOpeningElement":
          return printJsxOpeningElement(path, options, print);
        case "JSXClosingElement":
          return printJsxClosingElement(path, options, print);
        case "JSXOpeningFragment":
        case "JSXClosingFragment":
          return printJsxOpeningClosingFragment(path, options);
        case "JSXEmptyExpression":
          return printJsxEmptyExpression(path, options);
        case "JSXText":
          throw new Error("JSXText should be handled by JSXElement");
        default:
          throw new Error(`Unknown JSX node type: ${JSON.stringify(node.type)}.`);
      }
    }
    var jsxWhitespaceChars = " \n\r	";
    var matchJsxWhitespaceRegex = new RegExp("([" + jsxWhitespaceChars + "]+)");
    var containsNonJsxWhitespaceRegex = new RegExp("[^" + jsxWhitespaceChars + "]");
    var trimJsxWhitespace = (text) => text.replace(new RegExp("(?:^" + matchJsxWhitespaceRegex.source + "|" + matchJsxWhitespaceRegex.source + "$)"), "");
    function isEmptyJsxElement(node) {
      if (node.children.length === 0) {
        return true;
      }
      if (node.children.length > 1) {
        return false;
      }
      const child = node.children[0];
      return child.type === "JSXText" && !isMeaningfulJsxText(child);
    }
    function isMeaningfulJsxText(node) {
      return node.type === "JSXText" && (containsNonJsxWhitespaceRegex.test(rawText(node)) || !/\n/.test(rawText(node)));
    }
    function isJsxWhitespaceExpression(node) {
      return node.type === "JSXExpressionContainer" && isStringLiteral(node.expression) && node.expression.value === " " && !hasComment(node.expression);
    }
    function hasJsxIgnoreComment(path) {
      const node = path.getValue();
      const parent = path.getParentNode();
      if (!parent || !node || !isJsxNode(node) || !isJsxNode(parent)) {
        return false;
      }
      const index = parent.children.indexOf(node);
      let prevSibling = null;
      for (let i = index; i > 0; i--) {
        const candidate = parent.children[i - 1];
        if (candidate.type === "JSXText" && !isMeaningfulJsxText(candidate)) {
          continue;
        }
        prevSibling = candidate;
        break;
      }
      return prevSibling && prevSibling.type === "JSXExpressionContainer" && prevSibling.expression.type === "JSXEmptyExpression" && hasNodeIgnoreComment(prevSibling.expression);
    }
    module.exports = {
      hasJsxIgnoreComment,
      printJsx
    };
  }
});
var require_misc = __commonJS2({
  "src/language-js/print/misc.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      isNonEmptyArray
    } = require_util();
    var {
      builders: {
        indent,
        join: join2,
        line
      }
    } = require_document();
    var {
      isFlowAnnotationComment
    } = require_utils3();
    function printOptionalToken(path) {
      const node = path.getValue();
      if (!node.optional || node.type === "Identifier" && node === path.getParentNode().key) {
        return "";
      }
      if (node.type === "OptionalCallExpression" || node.type === "OptionalMemberExpression" && node.computed) {
        return "?.";
      }
      return "?";
    }
    function printDefiniteToken(path) {
      return path.getValue().definite || path.match(void 0, (node, name) => name === "id" && node.type === "VariableDeclarator" && node.definite) ? "!" : "";
    }
    function printFunctionTypeParameters(path, options, print) {
      const fun = path.getValue();
      if (fun.typeArguments) {
        return print("typeArguments");
      }
      if (fun.typeParameters) {
        return print("typeParameters");
      }
      return "";
    }
    function printTypeAnnotation(path, options, print) {
      const node = path.getValue();
      if (!node.typeAnnotation) {
        return "";
      }
      const parentNode = path.getParentNode();
      const isFunctionDeclarationIdentifier = parentNode.type === "DeclareFunction" && parentNode.id === node;
      if (isFlowAnnotationComment(options.originalText, node.typeAnnotation)) {
        return [" /*: ", print("typeAnnotation"), " */"];
      }
      return [isFunctionDeclarationIdentifier ? "" : ": ", print("typeAnnotation")];
    }
    function printBindExpressionCallee(path, options, print) {
      return ["::", print("callee")];
    }
    function printTypeScriptModifiers(path, options, print) {
      const node = path.getValue();
      if (!isNonEmptyArray(node.modifiers)) {
        return "";
      }
      return [join2(" ", path.map(print, "modifiers")), " "];
    }
    function adjustClause(node, clause, forceSpace) {
      if (node.type === "EmptyStatement") {
        return ";";
      }
      if (node.type === "BlockStatement" || forceSpace) {
        return [" ", clause];
      }
      return indent([line, clause]);
    }
    function printRestSpread(path, options, print) {
      return ["...", print("argument"), printTypeAnnotation(path, options, print)];
    }
    function printDirective(rawText, options) {
      const rawContent = rawText.slice(1, -1);
      if (rawContent.includes('"') || rawContent.includes("'")) {
        return rawText;
      }
      const enclosingQuote = options.singleQuote ? "'" : '"';
      return enclosingQuote + rawContent + enclosingQuote;
    }
    module.exports = {
      printOptionalToken,
      printDefiniteToken,
      printFunctionTypeParameters,
      printBindExpressionCallee,
      printTypeScriptModifiers,
      printTypeAnnotation,
      printRestSpread,
      adjustClause,
      printDirective
    };
  }
});
var require_array3 = __commonJS2({
  "src/language-js/print/array.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      printDanglingComments
    } = require_comments();
    var {
      builders: {
        line,
        softline,
        hardline,
        group,
        indent,
        ifBreak,
        fill
      }
    } = require_document();
    var {
      getLast,
      hasNewline
    } = require_util();
    var {
      shouldPrintComma,
      hasComment,
      CommentCheckFlags,
      isNextLineEmpty,
      isNumericLiteral,
      isSignedNumericLiteral
    } = require_utils3();
    var {
      locStart
    } = require_loc();
    var {
      printOptionalToken,
      printTypeAnnotation
    } = require_misc();
    function printArray(path, options, print) {
      const node = path.getValue();
      const parts = [];
      const openBracket = node.type === "TupleExpression" ? "#[" : "[";
      const closeBracket = "]";
      if (node.elements.length === 0) {
        if (!hasComment(node, CommentCheckFlags.Dangling)) {
          parts.push(openBracket, closeBracket);
        } else {
          parts.push(group([openBracket, printDanglingComments(path, options), softline, closeBracket]));
        }
      } else {
        const lastElem = getLast(node.elements);
        const canHaveTrailingComma = !(lastElem && lastElem.type === "RestElement");
        const needsForcedTrailingComma = lastElem === null;
        const groupId = Symbol("array");
        const shouldBreak = !options.__inJestEach && node.elements.length > 1 && node.elements.every((element, i, elements) => {
          const elementType = element && element.type;
          if (elementType !== "ArrayExpression" && elementType !== "ObjectExpression") {
            return false;
          }
          const nextElement = elements[i + 1];
          if (nextElement && elementType !== nextElement.type) {
            return false;
          }
          const itemsKey = elementType === "ArrayExpression" ? "elements" : "properties";
          return element[itemsKey] && element[itemsKey].length > 1;
        });
        const shouldUseConciseFormatting = isConciselyPrintedArray(node, options);
        const trailingComma = !canHaveTrailingComma ? "" : needsForcedTrailingComma ? "," : !shouldPrintComma(options) ? "" : shouldUseConciseFormatting ? ifBreak(",", "", {
          groupId
        }) : ifBreak(",");
        parts.push(group([openBracket, indent([softline, shouldUseConciseFormatting ? printArrayItemsConcisely(path, options, print, trailingComma) : [printArrayItems(path, options, "elements", print), trailingComma], printDanglingComments(path, options, true)]), softline, closeBracket], {
          shouldBreak,
          id: groupId
        }));
      }
      parts.push(printOptionalToken(path), printTypeAnnotation(path, options, print));
      return parts;
    }
    function isConciselyPrintedArray(node, options) {
      return node.elements.length > 1 && node.elements.every((element) => element && (isNumericLiteral(element) || isSignedNumericLiteral(element) && !hasComment(element.argument)) && !hasComment(element, CommentCheckFlags.Trailing | CommentCheckFlags.Line, (comment) => !hasNewline(options.originalText, locStart(comment), {
        backwards: true
      })));
    }
    function printArrayItems(path, options, printPath, print) {
      const printedElements = [];
      let separatorParts = [];
      path.each((childPath) => {
        printedElements.push(separatorParts, group(print()));
        separatorParts = [",", line];
        if (childPath.getValue() && isNextLineEmpty(childPath.getValue(), options)) {
          separatorParts.push(softline);
        }
      }, printPath);
      return printedElements;
    }
    function printArrayItemsConcisely(path, options, print, trailingComma) {
      const parts = [];
      path.each((childPath, i, elements) => {
        const isLast = i === elements.length - 1;
        parts.push([print(), isLast ? trailingComma : ","]);
        if (!isLast) {
          parts.push(isNextLineEmpty(childPath.getValue(), options) ? [hardline, hardline] : hasComment(elements[i + 1], CommentCheckFlags.Leading | CommentCheckFlags.Line) ? hardline : line);
        }
      }, "elements");
      return fill(parts);
    }
    module.exports = {
      printArray,
      printArrayItems,
      isConciselyPrintedArray
    };
  }
});
var require_call_arguments = __commonJS2({
  "src/language-js/print/call-arguments.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      printDanglingComments
    } = require_comments();
    var {
      getLast,
      getPenultimate
    } = require_util();
    var {
      getFunctionParameters,
      hasComment,
      CommentCheckFlags,
      isFunctionCompositionArgs,
      isJsxNode,
      isLongCurriedCallExpression,
      shouldPrintComma,
      getCallArguments,
      iterateCallArgumentsPath,
      isNextLineEmpty,
      isCallExpression,
      isStringLiteral,
      isObjectProperty,
      isTSTypeExpression
    } = require_utils3();
    var {
      builders: {
        line,
        hardline,
        softline,
        group,
        indent,
        conditionalGroup,
        ifBreak,
        breakParent
      },
      utils: {
        willBreak
      }
    } = require_document();
    var {
      ArgExpansionBailout
    } = require_errors();
    var {
      isConciselyPrintedArray
    } = require_array3();
    function printCallArguments(path, options, print) {
      const node = path.getValue();
      const isDynamicImport = node.type === "ImportExpression";
      const args = getCallArguments(node);
      if (args.length === 0) {
        return ["(", printDanglingComments(path, options, true), ")"];
      }
      if (isReactHookCallWithDepsArray(args)) {
        return ["(", print(["arguments", 0]), ", ", print(["arguments", 1]), ")"];
      }
      let anyArgEmptyLine = false;
      let hasEmptyLineFollowingFirstArg = false;
      const lastArgIndex = args.length - 1;
      const printedArguments = [];
      iterateCallArgumentsPath(path, (argPath, index) => {
        const arg = argPath.getNode();
        const parts = [print()];
        if (index === lastArgIndex) {
        } else if (isNextLineEmpty(arg, options)) {
          if (index === 0) {
            hasEmptyLineFollowingFirstArg = true;
          }
          anyArgEmptyLine = true;
          parts.push(",", hardline, hardline);
        } else {
          parts.push(",", line);
        }
        printedArguments.push(parts);
      });
      const maybeTrailingComma = !(isDynamicImport || node.callee && node.callee.type === "Import") && shouldPrintComma(options, "all") ? "," : "";
      function allArgsBrokenOut() {
        return group(["(", indent([line, ...printedArguments]), maybeTrailingComma, line, ")"], {
          shouldBreak: true
        });
      }
      if (anyArgEmptyLine || path.getParentNode().type !== "Decorator" && isFunctionCompositionArgs(args)) {
        return allArgsBrokenOut();
      }
      const shouldGroupFirst = shouldGroupFirstArg(args);
      const shouldGroupLast = shouldGroupLastArg(args, options);
      if (shouldGroupFirst || shouldGroupLast) {
        if (shouldGroupFirst ? printedArguments.slice(1).some(willBreak) : printedArguments.slice(0, -1).some(willBreak)) {
          return allArgsBrokenOut();
        }
        let printedExpanded = [];
        try {
          path.try(() => {
            iterateCallArgumentsPath(path, (argPath, i) => {
              if (shouldGroupFirst && i === 0) {
                printedExpanded = [[print([], {
                  expandFirstArg: true
                }), printedArguments.length > 1 ? "," : "", hasEmptyLineFollowingFirstArg ? hardline : line, hasEmptyLineFollowingFirstArg ? hardline : ""], ...printedArguments.slice(1)];
              }
              if (shouldGroupLast && i === lastArgIndex) {
                printedExpanded = [...printedArguments.slice(0, -1), print([], {
                  expandLastArg: true
                })];
              }
            });
          });
        } catch (caught) {
          if (caught instanceof ArgExpansionBailout) {
            return allArgsBrokenOut();
          }
          throw caught;
        }
        return [printedArguments.some(willBreak) ? breakParent : "", conditionalGroup([["(", ...printedExpanded, ")"], shouldGroupFirst ? ["(", group(printedExpanded[0], {
          shouldBreak: true
        }), ...printedExpanded.slice(1), ")"] : ["(", ...printedArguments.slice(0, -1), group(getLast(printedExpanded), {
          shouldBreak: true
        }), ")"], allArgsBrokenOut()])];
      }
      const contents = ["(", indent([softline, ...printedArguments]), ifBreak(maybeTrailingComma), softline, ")"];
      if (isLongCurriedCallExpression(path)) {
        return contents;
      }
      return group(contents, {
        shouldBreak: printedArguments.some(willBreak) || anyArgEmptyLine
      });
    }
    function couldGroupArg(arg) {
      let arrowChainRecursion = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      return arg.type === "ObjectExpression" && (arg.properties.length > 0 || hasComment(arg)) || arg.type === "ArrayExpression" && (arg.elements.length > 0 || hasComment(arg)) || arg.type === "TSTypeAssertion" && couldGroupArg(arg.expression) || isTSTypeExpression(arg) && couldGroupArg(arg.expression) || arg.type === "FunctionExpression" || arg.type === "ArrowFunctionExpression" && (!arg.returnType || !arg.returnType.typeAnnotation || arg.returnType.typeAnnotation.type !== "TSTypeReference" || isNonEmptyBlockStatement(arg.body)) && (arg.body.type === "BlockStatement" || arg.body.type === "ArrowFunctionExpression" && couldGroupArg(arg.body, true) || arg.body.type === "ObjectExpression" || arg.body.type === "ArrayExpression" || !arrowChainRecursion && (isCallExpression(arg.body) || arg.body.type === "ConditionalExpression") || isJsxNode(arg.body)) || arg.type === "DoExpression" || arg.type === "ModuleExpression";
    }
    function shouldGroupLastArg(args, options) {
      const lastArg = getLast(args);
      const penultimateArg = getPenultimate(args);
      return !hasComment(lastArg, CommentCheckFlags.Leading) && !hasComment(lastArg, CommentCheckFlags.Trailing) && couldGroupArg(lastArg) && (!penultimateArg || penultimateArg.type !== lastArg.type) && (args.length !== 2 || penultimateArg.type !== "ArrowFunctionExpression" || lastArg.type !== "ArrayExpression") && !(args.length > 1 && lastArg.type === "ArrayExpression" && isConciselyPrintedArray(lastArg, options));
    }
    function shouldGroupFirstArg(args) {
      if (args.length !== 2) {
        return false;
      }
      const [firstArg, secondArg] = args;
      if (firstArg.type === "ModuleExpression" && isTypeModuleObjectExpression(secondArg)) {
        return true;
      }
      return !hasComment(firstArg) && (firstArg.type === "FunctionExpression" || firstArg.type === "ArrowFunctionExpression" && firstArg.body.type === "BlockStatement") && secondArg.type !== "FunctionExpression" && secondArg.type !== "ArrowFunctionExpression" && secondArg.type !== "ConditionalExpression" && !couldGroupArg(secondArg);
    }
    function isReactHookCallWithDepsArray(args) {
      return args.length === 2 && args[0].type === "ArrowFunctionExpression" && getFunctionParameters(args[0]).length === 0 && args[0].body.type === "BlockStatement" && args[1].type === "ArrayExpression" && !args.some((arg) => hasComment(arg));
    }
    function isNonEmptyBlockStatement(node) {
      return node.type === "BlockStatement" && (node.body.some((node2) => node2.type !== "EmptyStatement") || hasComment(node, CommentCheckFlags.Dangling));
    }
    function isTypeModuleObjectExpression(node) {
      return node.type === "ObjectExpression" && node.properties.length === 1 && isObjectProperty(node.properties[0]) && node.properties[0].key.type === "Identifier" && node.properties[0].key.name === "type" && isStringLiteral(node.properties[0].value) && node.properties[0].value.value === "module";
    }
    module.exports = printCallArguments;
  }
});
var require_member = __commonJS2({
  "src/language-js/print/member.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      builders: {
        softline,
        group,
        indent,
        label
      }
    } = require_document();
    var {
      isNumericLiteral,
      isMemberExpression,
      isCallExpression
    } = require_utils3();
    var {
      printOptionalToken
    } = require_misc();
    function printMemberExpression(path, options, print) {
      const node = path.getValue();
      const parent = path.getParentNode();
      let firstNonMemberParent;
      let i = 0;
      do {
        firstNonMemberParent = path.getParentNode(i);
        i++;
      } while (firstNonMemberParent && (isMemberExpression(firstNonMemberParent) || firstNonMemberParent.type === "TSNonNullExpression"));
      const objectDoc = print("object");
      const lookupDoc = printMemberLookup(path, options, print);
      const shouldInline = firstNonMemberParent && (firstNonMemberParent.type === "NewExpression" || firstNonMemberParent.type === "BindExpression" || firstNonMemberParent.type === "AssignmentExpression" && firstNonMemberParent.left.type !== "Identifier") || node.computed || node.object.type === "Identifier" && node.property.type === "Identifier" && !isMemberExpression(parent) || (parent.type === "AssignmentExpression" || parent.type === "VariableDeclarator") && (isCallExpression(node.object) && node.object.arguments.length > 0 || node.object.type === "TSNonNullExpression" && isCallExpression(node.object.expression) && node.object.expression.arguments.length > 0 || objectDoc.label === "member-chain");
      return label(objectDoc.label === "member-chain" ? "member-chain" : "member", [objectDoc, shouldInline ? lookupDoc : group(indent([softline, lookupDoc]))]);
    }
    function printMemberLookup(path, options, print) {
      const property = print("property");
      const node = path.getValue();
      const optional = printOptionalToken(path);
      if (!node.computed) {
        return [optional, ".", property];
      }
      if (!node.property || isNumericLiteral(node.property)) {
        return [optional, "[", property, "]"];
      }
      return group([optional, "[", indent([softline, property]), softline, "]"]);
    }
    module.exports = {
      printMemberExpression,
      printMemberLookup
    };
  }
});
var require_member_chain = __commonJS2({
  "src/language-js/print/member-chain.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      printComments
    } = require_comments();
    var {
      getLast,
      isNextLineEmptyAfterIndex,
      getNextNonSpaceNonCommentCharacterIndex
    } = require_util();
    var pathNeedsParens = require_needs_parens();
    var {
      isCallExpression,
      isMemberExpression,
      isFunctionOrArrowExpression,
      isLongCurriedCallExpression,
      isMemberish,
      isNumericLiteral,
      isSimpleCallArgument,
      hasComment,
      CommentCheckFlags,
      isNextLineEmpty
    } = require_utils3();
    var {
      locEnd
    } = require_loc();
    var {
      builders: {
        join: join2,
        hardline,
        group,
        indent,
        conditionalGroup,
        breakParent,
        label
      },
      utils: {
        willBreak
      }
    } = require_document();
    var printCallArguments = require_call_arguments();
    var {
      printMemberLookup
    } = require_member();
    var {
      printOptionalToken,
      printFunctionTypeParameters,
      printBindExpressionCallee
    } = require_misc();
    function printMemberChain(path, options, print) {
      const parent = path.getParentNode();
      const isExpressionStatement = !parent || parent.type === "ExpressionStatement";
      const printedNodes = [];
      function shouldInsertEmptyLineAfter(node2) {
        const {
          originalText
        } = options;
        const nextCharIndex = getNextNonSpaceNonCommentCharacterIndex(originalText, node2, locEnd);
        const nextChar = originalText.charAt(nextCharIndex);
        if (nextChar === ")") {
          return nextCharIndex !== false && isNextLineEmptyAfterIndex(originalText, nextCharIndex + 1);
        }
        return isNextLineEmpty(node2, options);
      }
      function rec(path2) {
        const node2 = path2.getValue();
        if (isCallExpression(node2) && (isMemberish(node2.callee) || isCallExpression(node2.callee))) {
          printedNodes.unshift({
            node: node2,
            printed: [printComments(path2, [printOptionalToken(path2), printFunctionTypeParameters(path2, options, print), printCallArguments(path2, options, print)], options), shouldInsertEmptyLineAfter(node2) ? hardline : ""]
          });
          path2.call((callee) => rec(callee), "callee");
        } else if (isMemberish(node2)) {
          printedNodes.unshift({
            node: node2,
            needsParens: pathNeedsParens(path2, options),
            printed: printComments(path2, isMemberExpression(node2) ? printMemberLookup(path2, options, print) : printBindExpressionCallee(path2, options, print), options)
          });
          path2.call((object) => rec(object), "object");
        } else if (node2.type === "TSNonNullExpression") {
          printedNodes.unshift({
            node: node2,
            printed: printComments(path2, "!", options)
          });
          path2.call((expression) => rec(expression), "expression");
        } else {
          printedNodes.unshift({
            node: node2,
            printed: print()
          });
        }
      }
      const node = path.getValue();
      printedNodes.unshift({
        node,
        printed: [printOptionalToken(path), printFunctionTypeParameters(path, options, print), printCallArguments(path, options, print)]
      });
      if (node.callee) {
        path.call((callee) => rec(callee), "callee");
      }
      const groups = [];
      let currentGroup = [printedNodes[0]];
      let i = 1;
      for (; i < printedNodes.length; ++i) {
        if (printedNodes[i].node.type === "TSNonNullExpression" || isCallExpression(printedNodes[i].node) || isMemberExpression(printedNodes[i].node) && printedNodes[i].node.computed && isNumericLiteral(printedNodes[i].node.property)) {
          currentGroup.push(printedNodes[i]);
        } else {
          break;
        }
      }
      if (!isCallExpression(printedNodes[0].node)) {
        for (; i + 1 < printedNodes.length; ++i) {
          if (isMemberish(printedNodes[i].node) && isMemberish(printedNodes[i + 1].node)) {
            currentGroup.push(printedNodes[i]);
          } else {
            break;
          }
        }
      }
      groups.push(currentGroup);
      currentGroup = [];
      let hasSeenCallExpression = false;
      for (; i < printedNodes.length; ++i) {
        if (hasSeenCallExpression && isMemberish(printedNodes[i].node)) {
          if (printedNodes[i].node.computed && isNumericLiteral(printedNodes[i].node.property)) {
            currentGroup.push(printedNodes[i]);
            continue;
          }
          groups.push(currentGroup);
          currentGroup = [];
          hasSeenCallExpression = false;
        }
        if (isCallExpression(printedNodes[i].node) || printedNodes[i].node.type === "ImportExpression") {
          hasSeenCallExpression = true;
        }
        currentGroup.push(printedNodes[i]);
        if (hasComment(printedNodes[i].node, CommentCheckFlags.Trailing)) {
          groups.push(currentGroup);
          currentGroup = [];
          hasSeenCallExpression = false;
        }
      }
      if (currentGroup.length > 0) {
        groups.push(currentGroup);
      }
      function isFactory(name) {
        return /^[A-Z]|^[$_]+$/.test(name);
      }
      function isShort(name) {
        return name.length <= options.tabWidth;
      }
      function shouldNotWrap(groups2) {
        const hasComputed = groups2[1].length > 0 && groups2[1][0].node.computed;
        if (groups2[0].length === 1) {
          const firstNode = groups2[0][0].node;
          return firstNode.type === "ThisExpression" || firstNode.type === "Identifier" && (isFactory(firstNode.name) || isExpressionStatement && isShort(firstNode.name) || hasComputed);
        }
        const lastNode = getLast(groups2[0]).node;
        return isMemberExpression(lastNode) && lastNode.property.type === "Identifier" && (isFactory(lastNode.property.name) || hasComputed);
      }
      const shouldMerge = groups.length >= 2 && !hasComment(groups[1][0].node) && shouldNotWrap(groups);
      function printGroup(printedGroup) {
        const printed = printedGroup.map((tuple) => tuple.printed);
        if (printedGroup.length > 0 && getLast(printedGroup).needsParens) {
          return ["(", ...printed, ")"];
        }
        return printed;
      }
      function printIndentedGroup(groups2) {
        if (groups2.length === 0) {
          return "";
        }
        return indent(group([hardline, join2(hardline, groups2.map(printGroup))]));
      }
      const printedGroups = groups.map(printGroup);
      const oneLine = printedGroups;
      const cutoff = shouldMerge ? 3 : 2;
      const flatGroups = groups.flat();
      const nodeHasComment = flatGroups.slice(1, -1).some((node2) => hasComment(node2.node, CommentCheckFlags.Leading)) || flatGroups.slice(0, -1).some((node2) => hasComment(node2.node, CommentCheckFlags.Trailing)) || groups[cutoff] && hasComment(groups[cutoff][0].node, CommentCheckFlags.Leading);
      if (groups.length <= cutoff && !nodeHasComment) {
        if (isLongCurriedCallExpression(path)) {
          return oneLine;
        }
        return group(oneLine);
      }
      const lastNodeBeforeIndent = getLast(groups[shouldMerge ? 1 : 0]).node;
      const shouldHaveEmptyLineBeforeIndent = !isCallExpression(lastNodeBeforeIndent) && shouldInsertEmptyLineAfter(lastNodeBeforeIndent);
      const expanded = [printGroup(groups[0]), shouldMerge ? groups.slice(1, 2).map(printGroup) : "", shouldHaveEmptyLineBeforeIndent ? hardline : "", printIndentedGroup(groups.slice(shouldMerge ? 2 : 1))];
      const callExpressions = printedNodes.map((_ref62) => {
        let {
          node: node2
        } = _ref62;
        return node2;
      }).filter(isCallExpression);
      function lastGroupWillBreakAndOtherCallsHaveFunctionArguments() {
        const lastGroupNode = getLast(getLast(groups)).node;
        const lastGroupDoc = getLast(printedGroups);
        return isCallExpression(lastGroupNode) && willBreak(lastGroupDoc) && callExpressions.slice(0, -1).some((node2) => node2.arguments.some(isFunctionOrArrowExpression));
      }
      let result;
      if (nodeHasComment || callExpressions.length > 2 && callExpressions.some((expr) => !expr.arguments.every((arg) => isSimpleCallArgument(arg, 0))) || printedGroups.slice(0, -1).some(willBreak) || lastGroupWillBreakAndOtherCallsHaveFunctionArguments()) {
        result = group(expanded);
      } else {
        result = [willBreak(oneLine) || shouldHaveEmptyLineBeforeIndent ? breakParent : "", conditionalGroup([oneLine, expanded])];
      }
      return label("member-chain", result);
    }
    module.exports = printMemberChain;
  }
});
var require_call_expression = __commonJS2({
  "src/language-js/print/call-expression.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      builders: {
        join: join2,
        group
      }
    } = require_document();
    var pathNeedsParens = require_needs_parens();
    var {
      getCallArguments,
      hasFlowAnnotationComment,
      isCallExpression,
      isMemberish,
      isStringLiteral,
      isTemplateOnItsOwnLine,
      isTestCall,
      iterateCallArgumentsPath
    } = require_utils3();
    var printMemberChain = require_member_chain();
    var printCallArguments = require_call_arguments();
    var {
      printOptionalToken,
      printFunctionTypeParameters
    } = require_misc();
    function printCallExpression(path, options, print) {
      const node = path.getValue();
      const parentNode = path.getParentNode();
      const isNew = node.type === "NewExpression";
      const isDynamicImport = node.type === "ImportExpression";
      const optional = printOptionalToken(path);
      const args = getCallArguments(node);
      if (args.length > 0 && (!isDynamicImport && !isNew && isCommonsJsOrAmdCall(node, parentNode) || args.length === 1 && isTemplateOnItsOwnLine(args[0], options.originalText) || !isNew && isTestCall(node, parentNode))) {
        const printed = [];
        iterateCallArgumentsPath(path, () => {
          printed.push(print());
        });
        return [isNew ? "new " : "", print("callee"), optional, printFunctionTypeParameters(path, options, print), "(", join2(", ", printed), ")"];
      }
      const isIdentifierWithFlowAnnotation = (options.parser === "babel" || options.parser === "babel-flow") && node.callee && node.callee.type === "Identifier" && hasFlowAnnotationComment(node.callee.trailingComments);
      if (isIdentifierWithFlowAnnotation) {
        node.callee.trailingComments[0].printed = true;
      }
      if (!isDynamicImport && !isNew && isMemberish(node.callee) && !path.call((path2) => pathNeedsParens(path2, options), "callee")) {
        return printMemberChain(path, options, print);
      }
      const contents = [isNew ? "new " : "", isDynamicImport ? "import" : print("callee"), optional, isIdentifierWithFlowAnnotation ? `/*:: ${node.callee.trailingComments[0].value.slice(2).trim()} */` : "", printFunctionTypeParameters(path, options, print), printCallArguments(path, options, print)];
      if (isDynamicImport || isCallExpression(node.callee)) {
        return group(contents);
      }
      return contents;
    }
    function isCommonsJsOrAmdCall(node, parentNode) {
      if (node.callee.type !== "Identifier") {
        return false;
      }
      if (node.callee.name === "require") {
        return true;
      }
      if (node.callee.name === "define") {
        const args = getCallArguments(node);
        return parentNode.type === "ExpressionStatement" && (args.length === 1 || args.length === 2 && args[0].type === "ArrayExpression" || args.length === 3 && isStringLiteral(args[0]) && args[1].type === "ArrayExpression");
      }
      return false;
    }
    module.exports = {
      printCallExpression
    };
  }
});
var require_assignment = __commonJS2({
  "src/language-js/print/assignment.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      isNonEmptyArray,
      getStringWidth
    } = require_util();
    var {
      builders: {
        line,
        group,
        indent,
        indentIfBreak,
        lineSuffixBoundary
      },
      utils: {
        cleanDoc,
        willBreak,
        canBreak
      }
    } = require_document();
    var {
      hasLeadingOwnLineComment,
      isBinaryish,
      isStringLiteral,
      isLiteral,
      isNumericLiteral,
      isCallExpression,
      isMemberExpression,
      getCallArguments,
      rawText,
      hasComment,
      isSignedNumericLiteral,
      isObjectProperty
    } = require_utils3();
    var {
      shouldInlineLogicalExpression
    } = require_binaryish();
    var {
      printCallExpression
    } = require_call_expression();
    function printAssignment(path, options, print, leftDoc, operator, rightPropertyName) {
      const layout = chooseLayout(path, options, print, leftDoc, rightPropertyName);
      const rightDoc = print(rightPropertyName, {
        assignmentLayout: layout
      });
      switch (layout) {
        case "break-after-operator":
          return group([group(leftDoc), operator, group(indent([line, rightDoc]))]);
        case "never-break-after-operator":
          return group([group(leftDoc), operator, " ", rightDoc]);
        case "fluid": {
          const groupId = Symbol("assignment");
          return group([group(leftDoc), operator, group(indent(line), {
            id: groupId
          }), lineSuffixBoundary, indentIfBreak(rightDoc, {
            groupId
          })]);
        }
        case "break-lhs":
          return group([leftDoc, operator, " ", group(rightDoc)]);
        case "chain":
          return [group(leftDoc), operator, line, rightDoc];
        case "chain-tail":
          return [group(leftDoc), operator, indent([line, rightDoc])];
        case "chain-tail-arrow-chain":
          return [group(leftDoc), operator, rightDoc];
        case "only-left":
          return leftDoc;
      }
    }
    function printAssignmentExpression(path, options, print) {
      const node = path.getValue();
      return printAssignment(path, options, print, print("left"), [" ", node.operator], "right");
    }
    function printVariableDeclarator(path, options, print) {
      return printAssignment(path, options, print, print("id"), " =", "init");
    }
    function chooseLayout(path, options, print, leftDoc, rightPropertyName) {
      const node = path.getValue();
      const rightNode = node[rightPropertyName];
      if (!rightNode) {
        return "only-left";
      }
      const isTail = !isAssignment(rightNode);
      const shouldUseChainFormatting = path.match(isAssignment, isAssignmentOrVariableDeclarator, (node2) => !isTail || node2.type !== "ExpressionStatement" && node2.type !== "VariableDeclaration");
      if (shouldUseChainFormatting) {
        return !isTail ? "chain" : rightNode.type === "ArrowFunctionExpression" && rightNode.body.type === "ArrowFunctionExpression" ? "chain-tail-arrow-chain" : "chain-tail";
      }
      const isHeadOfLongChain = !isTail && isAssignment(rightNode.right);
      if (isHeadOfLongChain || hasLeadingOwnLineComment(options.originalText, rightNode)) {
        return "break-after-operator";
      }
      if (rightNode.type === "CallExpression" && rightNode.callee.name === "require" || options.parser === "json5" || options.parser === "json") {
        return "never-break-after-operator";
      }
      if (isComplexDestructuring(node) || isComplexTypeAliasParams(node) || hasComplexTypeAnnotation(node) || isArrowFunctionVariableDeclarator(node) && canBreak(leftDoc)) {
        return "break-lhs";
      }
      const hasShortKey = isObjectPropertyWithShortKey(node, leftDoc, options);
      if (path.call(() => shouldBreakAfterOperator(path, options, print, hasShortKey), rightPropertyName)) {
        return "break-after-operator";
      }
      if (hasShortKey || rightNode.type === "TemplateLiteral" || rightNode.type === "TaggedTemplateExpression" || rightNode.type === "BooleanLiteral" || isNumericLiteral(rightNode) || rightNode.type === "ClassExpression") {
        return "never-break-after-operator";
      }
      return "fluid";
    }
    function shouldBreakAfterOperator(path, options, print, hasShortKey) {
      const rightNode = path.getValue();
      if (isBinaryish(rightNode) && !shouldInlineLogicalExpression(rightNode)) {
        return true;
      }
      switch (rightNode.type) {
        case "StringLiteralTypeAnnotation":
        case "SequenceExpression":
          return true;
        case "ConditionalExpression": {
          const {
            test
          } = rightNode;
          return isBinaryish(test) && !shouldInlineLogicalExpression(test);
        }
        case "ClassExpression":
          return isNonEmptyArray(rightNode.decorators);
      }
      if (hasShortKey) {
        return false;
      }
      let node = rightNode;
      const propertiesForPath = [];
      for (; ; ) {
        if (node.type === "UnaryExpression") {
          node = node.argument;
          propertiesForPath.push("argument");
        } else if (node.type === "TSNonNullExpression") {
          node = node.expression;
          propertiesForPath.push("expression");
        } else {
          break;
        }
      }
      if (isStringLiteral(node) || path.call(() => isPoorlyBreakableMemberOrCallChain(path, options, print), ...propertiesForPath)) {
        return true;
      }
      return false;
    }
    function isComplexDestructuring(node) {
      if (isAssignmentOrVariableDeclarator(node)) {
        const leftNode = node.left || node.id;
        return leftNode.type === "ObjectPattern" && leftNode.properties.length > 2 && leftNode.properties.some((property) => isObjectProperty(property) && (!property.shorthand || property.value && property.value.type === "AssignmentPattern"));
      }
      return false;
    }
    function isAssignment(node) {
      return node.type === "AssignmentExpression";
    }
    function isAssignmentOrVariableDeclarator(node) {
      return isAssignment(node) || node.type === "VariableDeclarator";
    }
    function isComplexTypeAliasParams(node) {
      const typeParams = getTypeParametersFromTypeAlias(node);
      if (isNonEmptyArray(typeParams)) {
        const constraintPropertyName = node.type === "TSTypeAliasDeclaration" ? "constraint" : "bound";
        if (typeParams.length > 1 && typeParams.some((param) => param[constraintPropertyName] || param.default)) {
          return true;
        }
      }
      return false;
    }
    function getTypeParametersFromTypeAlias(node) {
      if (isTypeAlias(node) && node.typeParameters && node.typeParameters.params) {
        return node.typeParameters.params;
      }
      return null;
    }
    function isTypeAlias(node) {
      return node.type === "TSTypeAliasDeclaration" || node.type === "TypeAlias";
    }
    function hasComplexTypeAnnotation(node) {
      if (node.type !== "VariableDeclarator") {
        return false;
      }
      const {
        typeAnnotation
      } = node.id;
      if (!typeAnnotation || !typeAnnotation.typeAnnotation) {
        return false;
      }
      const typeParams = getTypeParametersFromTypeReference(typeAnnotation.typeAnnotation);
      return isNonEmptyArray(typeParams) && typeParams.length > 1 && typeParams.some((param) => isNonEmptyArray(getTypeParametersFromTypeReference(param)) || param.type === "TSConditionalType");
    }
    function isArrowFunctionVariableDeclarator(node) {
      return node.type === "VariableDeclarator" && node.init && node.init.type === "ArrowFunctionExpression";
    }
    function getTypeParametersFromTypeReference(node) {
      if (isTypeReference(node) && node.typeParameters && node.typeParameters.params) {
        return node.typeParameters.params;
      }
      return null;
    }
    function isTypeReference(node) {
      return node.type === "TSTypeReference" || node.type === "GenericTypeAnnotation";
    }
    function isPoorlyBreakableMemberOrCallChain(path, options, print) {
      let deep = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
      const node = path.getValue();
      const goDeeper = () => isPoorlyBreakableMemberOrCallChain(path, options, print, true);
      if (node.type === "TSNonNullExpression") {
        return path.call(goDeeper, "expression");
      }
      if (isCallExpression(node)) {
        const doc = printCallExpression(path, options, print);
        if (doc.label === "member-chain") {
          return false;
        }
        const args = getCallArguments(node);
        const isPoorlyBreakableCall = args.length === 0 || args.length === 1 && isLoneShortArgument(args[0], options);
        if (!isPoorlyBreakableCall) {
          return false;
        }
        if (isCallExpressionWithComplexTypeArguments(node, print)) {
          return false;
        }
        return path.call(goDeeper, "callee");
      }
      if (isMemberExpression(node)) {
        return path.call(goDeeper, "object");
      }
      return deep && (node.type === "Identifier" || node.type === "ThisExpression");
    }
    var LONE_SHORT_ARGUMENT_THRESHOLD_RATE = 0.25;
    function isLoneShortArgument(node, _ref63) {
      let {
        printWidth
      } = _ref63;
      if (hasComment(node)) {
        return false;
      }
      const threshold = printWidth * LONE_SHORT_ARGUMENT_THRESHOLD_RATE;
      if (node.type === "ThisExpression" || node.type === "Identifier" && node.name.length <= threshold || isSignedNumericLiteral(node) && !hasComment(node.argument)) {
        return true;
      }
      const regexpPattern = node.type === "Literal" && "regex" in node && node.regex.pattern || node.type === "RegExpLiteral" && node.pattern;
      if (regexpPattern) {
        return regexpPattern.length <= threshold;
      }
      if (isStringLiteral(node)) {
        return rawText(node).length <= threshold;
      }
      if (node.type === "TemplateLiteral") {
        return node.expressions.length === 0 && node.quasis[0].value.raw.length <= threshold && !node.quasis[0].value.raw.includes("\n");
      }
      return isLiteral(node);
    }
    function isObjectPropertyWithShortKey(node, keyDoc, options) {
      if (!isObjectProperty(node)) {
        return false;
      }
      keyDoc = cleanDoc(keyDoc);
      const MIN_OVERLAP_FOR_BREAK = 3;
      return typeof keyDoc === "string" && getStringWidth(keyDoc) < options.tabWidth + MIN_OVERLAP_FOR_BREAK;
    }
    function isCallExpressionWithComplexTypeArguments(node, print) {
      const typeArgs = getTypeArgumentsFromCallExpression(node);
      if (isNonEmptyArray(typeArgs)) {
        if (typeArgs.length > 1) {
          return true;
        }
        if (typeArgs.length === 1) {
          const firstArg = typeArgs[0];
          if (firstArg.type === "TSUnionType" || firstArg.type === "UnionTypeAnnotation" || firstArg.type === "TSIntersectionType" || firstArg.type === "IntersectionTypeAnnotation" || firstArg.type === "TSTypeLiteral" || firstArg.type === "ObjectTypeAnnotation") {
            return true;
          }
        }
        const typeArgsKeyName = node.typeParameters ? "typeParameters" : "typeArguments";
        if (willBreak(print(typeArgsKeyName))) {
          return true;
        }
      }
      return false;
    }
    function getTypeArgumentsFromCallExpression(node) {
      return node.typeParameters && node.typeParameters.params || node.typeArguments && node.typeArguments.params;
    }
    module.exports = {
      printVariableDeclarator,
      printAssignmentExpression,
      printAssignment,
      isArrowFunctionVariableDeclarator
    };
  }
});
var require_function_parameters = __commonJS2({
  "src/language-js/print/function-parameters.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      getNextNonSpaceNonCommentCharacter
    } = require_util();
    var {
      printDanglingComments
    } = require_comments();
    var {
      builders: {
        line,
        hardline,
        softline,
        group,
        indent,
        ifBreak
      },
      utils: {
        removeLines,
        willBreak
      }
    } = require_document();
    var {
      getFunctionParameters,
      iterateFunctionParametersPath,
      isSimpleType,
      isTestCall,
      isTypeAnnotationAFunction,
      isObjectType,
      isObjectTypePropertyAFunction,
      hasRestParameter,
      shouldPrintComma,
      hasComment,
      isNextLineEmpty
    } = require_utils3();
    var {
      locEnd
    } = require_loc();
    var {
      ArgExpansionBailout
    } = require_errors();
    var {
      printFunctionTypeParameters
    } = require_misc();
    function printFunctionParameters(path, print, options, expandArg, printTypeParams) {
      const functionNode = path.getValue();
      const parameters = getFunctionParameters(functionNode);
      const typeParams = printTypeParams ? printFunctionTypeParameters(path, options, print) : "";
      if (parameters.length === 0) {
        return [typeParams, "(", printDanglingComments(path, options, true, (comment) => getNextNonSpaceNonCommentCharacter(options.originalText, comment, locEnd) === ")"), ")"];
      }
      const parent = path.getParentNode();
      const isParametersInTestCall = isTestCall(parent);
      const shouldHugParameters = shouldHugFunctionParameters(functionNode);
      const printed = [];
      iterateFunctionParametersPath(path, (parameterPath, index) => {
        const isLastParameter = index === parameters.length - 1;
        if (isLastParameter && functionNode.rest) {
          printed.push("...");
        }
        printed.push(print());
        if (isLastParameter) {
          return;
        }
        printed.push(",");
        if (isParametersInTestCall || shouldHugParameters) {
          printed.push(" ");
        } else if (isNextLineEmpty(parameters[index], options)) {
          printed.push(hardline, hardline);
        } else {
          printed.push(line);
        }
      });
      if (expandArg) {
        if (willBreak(typeParams) || willBreak(printed)) {
          throw new ArgExpansionBailout();
        }
        return group([removeLines(typeParams), "(", removeLines(printed), ")"]);
      }
      const hasNotParameterDecorator = parameters.every((node) => !node.decorators);
      if (shouldHugParameters && hasNotParameterDecorator) {
        return [typeParams, "(", ...printed, ")"];
      }
      if (isParametersInTestCall) {
        return [typeParams, "(", ...printed, ")"];
      }
      const isFlowShorthandWithOneArg = (isObjectTypePropertyAFunction(parent) || isTypeAnnotationAFunction(parent) || parent.type === "TypeAlias" || parent.type === "UnionTypeAnnotation" || parent.type === "TSUnionType" || parent.type === "IntersectionTypeAnnotation" || parent.type === "FunctionTypeAnnotation" && parent.returnType === functionNode) && parameters.length === 1 && parameters[0].name === null && functionNode.this !== parameters[0] && parameters[0].typeAnnotation && functionNode.typeParameters === null && isSimpleType(parameters[0].typeAnnotation) && !functionNode.rest;
      if (isFlowShorthandWithOneArg) {
        if (options.arrowParens === "always") {
          return ["(", ...printed, ")"];
        }
        return printed;
      }
      return [typeParams, "(", indent([softline, ...printed]), ifBreak(!hasRestParameter(functionNode) && shouldPrintComma(options, "all") ? "," : ""), softline, ")"];
    }
    function shouldHugFunctionParameters(node) {
      if (!node) {
        return false;
      }
      const parameters = getFunctionParameters(node);
      if (parameters.length !== 1) {
        return false;
      }
      const [parameter] = parameters;
      return !hasComment(parameter) && (parameter.type === "ObjectPattern" || parameter.type === "ArrayPattern" || parameter.type === "Identifier" && parameter.typeAnnotation && (parameter.typeAnnotation.type === "TypeAnnotation" || parameter.typeAnnotation.type === "TSTypeAnnotation") && isObjectType(parameter.typeAnnotation.typeAnnotation) || parameter.type === "FunctionTypeParam" && isObjectType(parameter.typeAnnotation) || parameter.type === "AssignmentPattern" && (parameter.left.type === "ObjectPattern" || parameter.left.type === "ArrayPattern") && (parameter.right.type === "Identifier" || parameter.right.type === "ObjectExpression" && parameter.right.properties.length === 0 || parameter.right.type === "ArrayExpression" && parameter.right.elements.length === 0));
    }
    function getReturnTypeNode(functionNode) {
      let returnTypeNode;
      if (functionNode.returnType) {
        returnTypeNode = functionNode.returnType;
        if (returnTypeNode.typeAnnotation) {
          returnTypeNode = returnTypeNode.typeAnnotation;
        }
      } else if (functionNode.typeAnnotation) {
        returnTypeNode = functionNode.typeAnnotation;
      }
      return returnTypeNode;
    }
    function shouldGroupFunctionParameters(functionNode, returnTypeDoc) {
      const returnTypeNode = getReturnTypeNode(functionNode);
      if (!returnTypeNode) {
        return false;
      }
      const typeParameters = functionNode.typeParameters && functionNode.typeParameters.params;
      if (typeParameters) {
        if (typeParameters.length > 1) {
          return false;
        }
        if (typeParameters.length === 1) {
          const typeParameter = typeParameters[0];
          if (typeParameter.constraint || typeParameter.default) {
            return false;
          }
        }
      }
      return getFunctionParameters(functionNode).length === 1 && (isObjectType(returnTypeNode) || willBreak(returnTypeDoc));
    }
    module.exports = {
      printFunctionParameters,
      shouldHugFunctionParameters,
      shouldGroupFunctionParameters
    };
  }
});
var require_type_annotation = __commonJS2({
  "src/language-js/print/type-annotation.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      printComments,
      printDanglingComments
    } = require_comments();
    var {
      isNonEmptyArray
    } = require_util();
    var {
      builders: {
        group,
        join: join2,
        line,
        softline,
        indent,
        align,
        ifBreak
      }
    } = require_document();
    var pathNeedsParens = require_needs_parens();
    var {
      locStart
    } = require_loc();
    var {
      isSimpleType,
      isObjectType,
      hasLeadingOwnLineComment,
      isObjectTypePropertyAFunction,
      shouldPrintComma
    } = require_utils3();
    var {
      printAssignment
    } = require_assignment();
    var {
      printFunctionParameters,
      shouldGroupFunctionParameters
    } = require_function_parameters();
    var {
      printArrayItems
    } = require_array3();
    function shouldHugType(node) {
      if (isSimpleType(node) || isObjectType(node)) {
        return true;
      }
      if (node.type === "UnionTypeAnnotation" || node.type === "TSUnionType") {
        const voidCount = node.types.filter((node2) => node2.type === "VoidTypeAnnotation" || node2.type === "TSVoidKeyword" || node2.type === "NullLiteralTypeAnnotation" || node2.type === "TSNullKeyword").length;
        const hasObject = node.types.some((node2) => node2.type === "ObjectTypeAnnotation" || node2.type === "TSTypeLiteral" || node2.type === "GenericTypeAnnotation" || node2.type === "TSTypeReference");
        if (node.types.length - 1 === voidCount && hasObject) {
          return true;
        }
      }
      return false;
    }
    function printOpaqueType(path, options, print) {
      const semi = options.semi ? ";" : "";
      const node = path.getValue();
      const parts = [];
      parts.push("opaque type ", print("id"), print("typeParameters"));
      if (node.supertype) {
        parts.push(": ", print("supertype"));
      }
      if (node.impltype) {
        parts.push(" = ", print("impltype"));
      }
      parts.push(semi);
      return parts;
    }
    function printTypeAlias(path, options, print) {
      const semi = options.semi ? ";" : "";
      const node = path.getValue();
      const parts = [];
      if (node.declare) {
        parts.push("declare ");
      }
      parts.push("type ", print("id"), print("typeParameters"));
      const rightPropertyName = node.type === "TSTypeAliasDeclaration" ? "typeAnnotation" : "right";
      return [printAssignment(path, options, print, parts, " =", rightPropertyName), semi];
    }
    function printIntersectionType(path, options, print) {
      const node = path.getValue();
      const types = path.map(print, "types");
      const result = [];
      let wasIndented = false;
      for (let i = 0; i < types.length; ++i) {
        if (i === 0) {
          result.push(types[i]);
        } else if (isObjectType(node.types[i - 1]) && isObjectType(node.types[i])) {
          result.push([" & ", wasIndented ? indent(types[i]) : types[i]]);
        } else if (!isObjectType(node.types[i - 1]) && !isObjectType(node.types[i])) {
          result.push(indent([" &", line, types[i]]));
        } else {
          if (i > 1) {
            wasIndented = true;
          }
          result.push(" & ", i > 1 ? indent(types[i]) : types[i]);
        }
      }
      return group(result);
    }
    function printUnionType(path, options, print) {
      const node = path.getValue();
      const parent = path.getParentNode();
      const shouldIndent = parent.type !== "TypeParameterInstantiation" && parent.type !== "TSTypeParameterInstantiation" && parent.type !== "GenericTypeAnnotation" && parent.type !== "TSTypeReference" && parent.type !== "TSTypeAssertion" && parent.type !== "TupleTypeAnnotation" && parent.type !== "TSTupleType" && !(parent.type === "FunctionTypeParam" && !parent.name && path.getParentNode(1).this !== parent) && !((parent.type === "TypeAlias" || parent.type === "VariableDeclarator" || parent.type === "TSTypeAliasDeclaration") && hasLeadingOwnLineComment(options.originalText, node));
      const shouldHug = shouldHugType(node);
      const printed = path.map((typePath) => {
        let printedType = print();
        if (!shouldHug) {
          printedType = align(2, printedType);
        }
        return printComments(typePath, printedType, options);
      }, "types");
      if (shouldHug) {
        return join2(" | ", printed);
      }
      const shouldAddStartLine = shouldIndent && !hasLeadingOwnLineComment(options.originalText, node);
      const code = [ifBreak([shouldAddStartLine ? line : "", "| "]), join2([line, "| "], printed)];
      if (pathNeedsParens(path, options)) {
        return group([indent(code), softline]);
      }
      if (parent.type === "TupleTypeAnnotation" && parent.types.length > 1 || parent.type === "TSTupleType" && parent.elementTypes.length > 1) {
        return group([indent([ifBreak(["(", softline]), code]), softline, ifBreak(")")]);
      }
      return group(shouldIndent ? indent(code) : code);
    }
    function printFunctionType(path, options, print) {
      const node = path.getValue();
      const parts = [];
      const parent = path.getParentNode(0);
      const parentParent = path.getParentNode(1);
      const parentParentParent = path.getParentNode(2);
      let isArrowFunctionTypeAnnotation = node.type === "TSFunctionType" || !((parent.type === "ObjectTypeProperty" || parent.type === "ObjectTypeInternalSlot") && !parent.variance && !parent.optional && locStart(parent) === locStart(node) || parent.type === "ObjectTypeCallProperty" || parentParentParent && parentParentParent.type === "DeclareFunction");
      let needsColon = isArrowFunctionTypeAnnotation && (parent.type === "TypeAnnotation" || parent.type === "TSTypeAnnotation");
      const needsParens = needsColon && isArrowFunctionTypeAnnotation && (parent.type === "TypeAnnotation" || parent.type === "TSTypeAnnotation") && parentParent.type === "ArrowFunctionExpression";
      if (isObjectTypePropertyAFunction(parent)) {
        isArrowFunctionTypeAnnotation = true;
        needsColon = true;
      }
      if (needsParens) {
        parts.push("(");
      }
      const parametersDoc = printFunctionParameters(path, print, options, false, true);
      const returnTypeDoc = node.returnType || node.predicate || node.typeAnnotation ? [isArrowFunctionTypeAnnotation ? " => " : ": ", print("returnType"), print("predicate"), print("typeAnnotation")] : "";
      const shouldGroupParameters = shouldGroupFunctionParameters(node, returnTypeDoc);
      parts.push(shouldGroupParameters ? group(parametersDoc) : parametersDoc);
      if (returnTypeDoc) {
        parts.push(returnTypeDoc);
      }
      if (needsParens) {
        parts.push(")");
      }
      return group(parts);
    }
    function printTupleType(path, options, print) {
      const node = path.getValue();
      const typesField = node.type === "TSTupleType" ? "elementTypes" : "types";
      const types = node[typesField];
      const isNonEmptyTuple = isNonEmptyArray(types);
      const bracketsDelimiterLine = isNonEmptyTuple ? softline : "";
      return group(["[", indent([bracketsDelimiterLine, printArrayItems(path, options, typesField, print)]), ifBreak(isNonEmptyTuple && shouldPrintComma(options, "all") ? "," : ""), printDanglingComments(path, options, true), bracketsDelimiterLine, "]"]);
    }
    function printIndexedAccessType(path, options, print) {
      const node = path.getValue();
      const leftDelimiter = node.type === "OptionalIndexedAccessType" && node.optional ? "?.[" : "[";
      return [print("objectType"), leftDelimiter, print("indexType"), "]"];
    }
    function printJSDocType(path, print, token) {
      const node = path.getValue();
      return [node.postfix ? "" : token, print("typeAnnotation"), node.postfix ? token : ""];
    }
    module.exports = {
      printOpaqueType,
      printTypeAlias,
      printIntersectionType,
      printUnionType,
      printFunctionType,
      printTupleType,
      printIndexedAccessType,
      shouldHugType,
      printJSDocType
    };
  }
});
var require_type_parameters = __commonJS2({
  "src/language-js/print/type-parameters.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      printDanglingComments
    } = require_comments();
    var {
      builders: {
        join: join2,
        line,
        hardline,
        softline,
        group,
        indent,
        ifBreak
      }
    } = require_document();
    var {
      isTestCall,
      hasComment,
      CommentCheckFlags,
      isTSXFile,
      shouldPrintComma,
      getFunctionParameters,
      isObjectType,
      getTypeScriptMappedTypeModifier
    } = require_utils3();
    var {
      createGroupIdMapper
    } = require_util();
    var {
      shouldHugType
    } = require_type_annotation();
    var {
      isArrowFunctionVariableDeclarator
    } = require_assignment();
    var getTypeParametersGroupId = createGroupIdMapper("typeParameters");
    function printTypeParameters(path, options, print, paramsKey) {
      const node = path.getValue();
      if (!node[paramsKey]) {
        return "";
      }
      if (!Array.isArray(node[paramsKey])) {
        return print(paramsKey);
      }
      const grandparent = path.getNode(2);
      const isParameterInTestCall = grandparent && isTestCall(grandparent);
      const isArrowFunctionVariable = path.match((node2) => !(node2[paramsKey].length === 1 && isObjectType(node2[paramsKey][0])), void 0, (node2, name) => name === "typeAnnotation", (node2) => node2.type === "Identifier", isArrowFunctionVariableDeclarator);
      const shouldInline = node[paramsKey].length === 0 || !isArrowFunctionVariable && (isParameterInTestCall || node[paramsKey].length === 1 && (node[paramsKey][0].type === "NullableTypeAnnotation" || shouldHugType(node[paramsKey][0])));
      if (shouldInline) {
        return ["<", join2(", ", path.map(print, paramsKey)), printDanglingCommentsForInline(path, options), ">"];
      }
      const trailingComma = node.type === "TSTypeParameterInstantiation" ? "" : getFunctionParameters(node).length === 1 && isTSXFile(options) && !node[paramsKey][0].constraint && path.getParentNode().type === "ArrowFunctionExpression" ? "," : shouldPrintComma(options, "all") ? ifBreak(",") : "";
      return group(["<", indent([softline, join2([",", line], path.map(print, paramsKey))]), trailingComma, softline, ">"], {
        id: getTypeParametersGroupId(node)
      });
    }
    function printDanglingCommentsForInline(path, options) {
      const node = path.getValue();
      if (!hasComment(node, CommentCheckFlags.Dangling)) {
        return "";
      }
      const hasOnlyBlockComments = !hasComment(node, CommentCheckFlags.Line);
      const printed = printDanglingComments(path, options, hasOnlyBlockComments);
      if (hasOnlyBlockComments) {
        return printed;
      }
      return [printed, hardline];
    }
    function printTypeParameter(path, options, print) {
      const node = path.getValue();
      const parts = [node.type === "TSTypeParameter" && node.const ? "const " : ""];
      const parent = path.getParentNode();
      if (parent.type === "TSMappedType") {
        if (parent.readonly) {
          parts.push(getTypeScriptMappedTypeModifier(parent.readonly, "readonly"), " ");
        }
        parts.push("[", print("name"));
        if (node.constraint) {
          parts.push(" in ", print("constraint"));
        }
        if (parent.nameType) {
          parts.push(" as ", path.callParent(() => print("nameType")));
        }
        parts.push("]");
        return parts;
      }
      if (node.variance) {
        parts.push(print("variance"));
      }
      if (node.in) {
        parts.push("in ");
      }
      if (node.out) {
        parts.push("out ");
      }
      parts.push(print("name"));
      if (node.bound) {
        parts.push(": ", print("bound"));
      }
      if (node.constraint) {
        parts.push(" extends ", print("constraint"));
      }
      if (node.default) {
        parts.push(" = ", print("default"));
      }
      return parts;
    }
    module.exports = {
      printTypeParameter,
      printTypeParameters,
      getTypeParametersGroupId
    };
  }
});
var require_property = __commonJS2({
  "src/language-js/print/property.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      printComments
    } = require_comments();
    var {
      printString,
      printNumber
    } = require_util();
    var {
      isNumericLiteral,
      isSimpleNumber,
      isStringLiteral,
      isStringPropSafeToUnquote,
      rawText
    } = require_utils3();
    var {
      printAssignment
    } = require_assignment();
    var needsQuoteProps = /* @__PURE__ */ new WeakMap();
    function printPropertyKey(path, options, print) {
      const node = path.getNode();
      if (node.computed) {
        return ["[", print("key"), "]"];
      }
      const parent = path.getParentNode();
      const {
        key
      } = node;
      if (options.quoteProps === "consistent" && !needsQuoteProps.has(parent)) {
        const objectHasStringProp = (parent.properties || parent.body || parent.members).some((prop) => !prop.computed && prop.key && isStringLiteral(prop.key) && !isStringPropSafeToUnquote(prop, options));
        needsQuoteProps.set(parent, objectHasStringProp);
      }
      if ((key.type === "Identifier" || isNumericLiteral(key) && isSimpleNumber(printNumber(rawText(key))) && String(key.value) === printNumber(rawText(key)) && !(options.parser === "typescript" || options.parser === "babel-ts")) && (options.parser === "json" || options.quoteProps === "consistent" && needsQuoteProps.get(parent))) {
        const prop = printString(JSON.stringify(key.type === "Identifier" ? key.name : key.value.toString()), options);
        return path.call((keyPath) => printComments(keyPath, prop, options), "key");
      }
      if (isStringPropSafeToUnquote(node, options) && (options.quoteProps === "as-needed" || options.quoteProps === "consistent" && !needsQuoteProps.get(parent))) {
        return path.call((keyPath) => printComments(keyPath, /^\d/.test(key.value) ? printNumber(key.value) : key.value, options), "key");
      }
      return print("key");
    }
    function printProperty(path, options, print) {
      const node = path.getValue();
      if (node.shorthand) {
        return print("value");
      }
      return printAssignment(path, options, print, printPropertyKey(path, options, print), ":", "value");
    }
    module.exports = {
      printProperty,
      printPropertyKey
    };
  }
});
var require_function = __commonJS2({
  "src/language-js/print/function.js"(exports, module) {
    "use strict";
    init_define_process();
    var assert = require_assert();
    var {
      printDanglingComments,
      printCommentsSeparately
    } = require_comments();
    var getLast = require_get_last();
    var {
      getNextNonSpaceNonCommentCharacterIndex
    } = require_util();
    var {
      builders: {
        line,
        softline,
        group,
        indent,
        ifBreak,
        hardline,
        join: join2,
        indentIfBreak
      },
      utils: {
        removeLines,
        willBreak
      }
    } = require_document();
    var {
      ArgExpansionBailout
    } = require_errors();
    var {
      getFunctionParameters,
      hasLeadingOwnLineComment,
      isFlowAnnotationComment,
      isJsxNode,
      isTemplateOnItsOwnLine,
      shouldPrintComma,
      startsWithNoLookaheadToken,
      isBinaryish,
      isLineComment,
      hasComment,
      getComments,
      CommentCheckFlags,
      isCallLikeExpression,
      isCallExpression,
      getCallArguments,
      hasNakedLeftSide,
      getLeftSide
    } = require_utils3();
    var {
      locEnd
    } = require_loc();
    var {
      printFunctionParameters,
      shouldGroupFunctionParameters
    } = require_function_parameters();
    var {
      printPropertyKey
    } = require_property();
    var {
      printFunctionTypeParameters
    } = require_misc();
    function printFunction(path, print, options, args) {
      const node = path.getValue();
      let expandArg = false;
      if ((node.type === "FunctionDeclaration" || node.type === "FunctionExpression") && args && args.expandLastArg) {
        const parent = path.getParentNode();
        if (isCallExpression(parent) && getCallArguments(parent).length > 1) {
          expandArg = true;
        }
      }
      const parts = [];
      if (node.type === "TSDeclareFunction" && node.declare) {
        parts.push("declare ");
      }
      if (node.async) {
        parts.push("async ");
      }
      if (node.generator) {
        parts.push("function* ");
      } else {
        parts.push("function ");
      }
      if (node.id) {
        parts.push(print("id"));
      }
      const parametersDoc = printFunctionParameters(path, print, options, expandArg);
      const returnTypeDoc = printReturnType(path, print, options);
      const shouldGroupParameters = shouldGroupFunctionParameters(node, returnTypeDoc);
      parts.push(printFunctionTypeParameters(path, options, print), group([shouldGroupParameters ? group(parametersDoc) : parametersDoc, returnTypeDoc]), node.body ? " " : "", print("body"));
      if (options.semi && (node.declare || !node.body)) {
        parts.push(";");
      }
      return parts;
    }
    function printMethod(path, options, print) {
      const node = path.getNode();
      const {
        kind
      } = node;
      const value = node.value || node;
      const parts = [];
      if (!kind || kind === "init" || kind === "method" || kind === "constructor") {
        if (value.async) {
          parts.push("async ");
        }
      } else {
        assert.ok(kind === "get" || kind === "set");
        parts.push(kind, " ");
      }
      if (value.generator) {
        parts.push("*");
      }
      parts.push(printPropertyKey(path, options, print), node.optional || node.key.optional ? "?" : "");
      if (node === value) {
        parts.push(printMethodInternal(path, options, print));
      } else if (value.type === "FunctionExpression") {
        parts.push(path.call((path2) => printMethodInternal(path2, options, print), "value"));
      } else {
        parts.push(print("value"));
      }
      return parts;
    }
    function printMethodInternal(path, options, print) {
      const node = path.getNode();
      const parametersDoc = printFunctionParameters(path, print, options);
      const returnTypeDoc = printReturnType(path, print, options);
      const shouldGroupParameters = shouldGroupFunctionParameters(node, returnTypeDoc);
      const parts = [printFunctionTypeParameters(path, options, print), group([shouldGroupParameters ? group(parametersDoc) : parametersDoc, returnTypeDoc])];
      if (node.body) {
        parts.push(" ", print("body"));
      } else {
        parts.push(options.semi ? ";" : "");
      }
      return parts;
    }
    function printArrowFunctionSignature(path, options, print, args) {
      const node = path.getValue();
      const parts = [];
      if (node.async) {
        parts.push("async ");
      }
      if (shouldPrintParamsWithoutParens(path, options)) {
        parts.push(print(["params", 0]));
      } else {
        const expandArg = args && (args.expandLastArg || args.expandFirstArg);
        let returnTypeDoc = printReturnType(path, print, options);
        if (expandArg) {
          if (willBreak(returnTypeDoc)) {
            throw new ArgExpansionBailout();
          }
          returnTypeDoc = group(removeLines(returnTypeDoc));
        }
        parts.push(group([printFunctionParameters(path, print, options, expandArg, true), returnTypeDoc]));
      }
      const dangling = printDanglingComments(path, options, true, (comment) => {
        const nextCharacter = getNextNonSpaceNonCommentCharacterIndex(options.originalText, comment, locEnd);
        return nextCharacter !== false && options.originalText.slice(nextCharacter, nextCharacter + 2) === "=>";
      });
      if (dangling) {
        parts.push(" ", dangling);
      }
      return parts;
    }
    function printArrowChain(path, args, signatures, shouldBreak, bodyDoc, tailNode) {
      const name = path.getName();
      const parent = path.getParentNode();
      const isCallee = isCallLikeExpression(parent) && name === "callee";
      const isAssignmentRhs = Boolean(args && args.assignmentLayout);
      const shouldPutBodyOnSeparateLine = tailNode.body.type !== "BlockStatement" && tailNode.body.type !== "ObjectExpression" && tailNode.body.type !== "SequenceExpression";
      const shouldBreakBeforeChain = isCallee && shouldPutBodyOnSeparateLine || args && args.assignmentLayout === "chain-tail-arrow-chain";
      const groupId = Symbol("arrow-chain");
      if (tailNode.body.type === "SequenceExpression") {
        bodyDoc = group(["(", indent([softline, bodyDoc]), softline, ")"]);
      }
      return group([group(indent([isCallee || isAssignmentRhs ? softline : "", group(join2([" =>", line], signatures), {
        shouldBreak
      })]), {
        id: groupId,
        shouldBreak: shouldBreakBeforeChain
      }), " =>", indentIfBreak(shouldPutBodyOnSeparateLine ? indent([line, bodyDoc]) : [" ", bodyDoc], {
        groupId
      }), isCallee ? ifBreak(softline, "", {
        groupId
      }) : ""]);
    }
    function printArrowFunction(path, options, print, args) {
      let node = path.getValue();
      const signatures = [];
      const body = [];
      let chainShouldBreak = false;
      (function rec() {
        const doc = printArrowFunctionSignature(path, options, print, args);
        if (signatures.length === 0) {
          signatures.push(doc);
        } else {
          const {
            leading,
            trailing
          } = printCommentsSeparately(path, options);
          signatures.push([leading, doc]);
          body.unshift(trailing);
        }
        chainShouldBreak = chainShouldBreak || node.returnType && getFunctionParameters(node).length > 0 || node.typeParameters || getFunctionParameters(node).some((param) => param.type !== "Identifier");
        if (node.body.type !== "ArrowFunctionExpression" || args && args.expandLastArg) {
          body.unshift(print("body", args));
        } else {
          node = node.body;
          path.call(rec, "body");
        }
      })();
      if (signatures.length > 1) {
        return printArrowChain(path, args, signatures, chainShouldBreak, body, node);
      }
      const parts = signatures;
      parts.push(" =>");
      if (!hasLeadingOwnLineComment(options.originalText, node.body) && (node.body.type === "ArrayExpression" || node.body.type === "ObjectExpression" || node.body.type === "BlockStatement" || isJsxNode(node.body) || isTemplateOnItsOwnLine(node.body, options.originalText) || node.body.type === "ArrowFunctionExpression" || node.body.type === "DoExpression")) {
        return group([...parts, " ", body]);
      }
      if (node.body.type === "SequenceExpression") {
        return group([...parts, group([" (", indent([softline, body]), softline, ")"])]);
      }
      const shouldAddSoftLine = (args && args.expandLastArg || path.getParentNode().type === "JSXExpressionContainer") && !hasComment(node);
      const printTrailingComma = args && args.expandLastArg && shouldPrintComma(options, "all");
      const shouldAddParens = node.body.type === "ConditionalExpression" && !startsWithNoLookaheadToken(node.body, (node2) => node2.type === "ObjectExpression");
      return group([...parts, group([indent([line, shouldAddParens ? ifBreak("", "(") : "", body, shouldAddParens ? ifBreak("", ")") : ""]), shouldAddSoftLine ? [ifBreak(printTrailingComma ? "," : ""), softline] : ""])]);
    }
    function canPrintParamsWithoutParens(node) {
      const parameters = getFunctionParameters(node);
      return parameters.length === 1 && !node.typeParameters && !hasComment(node, CommentCheckFlags.Dangling) && parameters[0].type === "Identifier" && !parameters[0].typeAnnotation && !hasComment(parameters[0]) && !parameters[0].optional && !node.predicate && !node.returnType;
    }
    function shouldPrintParamsWithoutParens(path, options) {
      if (options.arrowParens === "always") {
        return false;
      }
      if (options.arrowParens === "avoid") {
        const node = path.getValue();
        return canPrintParamsWithoutParens(node);
      }
      return false;
    }
    function printReturnType(path, print, options) {
      const node = path.getValue();
      const returnType = print("returnType");
      if (node.returnType && isFlowAnnotationComment(options.originalText, node.returnType)) {
        return [" /*: ", returnType, " */"];
      }
      const parts = [returnType];
      if (node.returnType && node.returnType.typeAnnotation) {
        parts.unshift(": ");
      }
      if (node.predicate) {
        parts.push(node.returnType ? " " : ": ", print("predicate"));
      }
      return parts;
    }
    function printReturnOrThrowArgument(path, options, print) {
      const node = path.getValue();
      const semi = options.semi ? ";" : "";
      const parts = [];
      if (node.argument) {
        if (returnArgumentHasLeadingComment(options, node.argument)) {
          parts.push([" (", indent([hardline, print("argument")]), hardline, ")"]);
        } else if (isBinaryish(node.argument) || node.argument.type === "SequenceExpression") {
          parts.push(group([ifBreak(" (", " "), indent([softline, print("argument")]), softline, ifBreak(")")]));
        } else {
          parts.push(" ", print("argument"));
        }
      }
      const comments = getComments(node);
      const lastComment = getLast(comments);
      const isLastCommentLine = lastComment && isLineComment(lastComment);
      if (isLastCommentLine) {
        parts.push(semi);
      }
      if (hasComment(node, CommentCheckFlags.Dangling)) {
        parts.push(" ", printDanglingComments(path, options, true));
      }
      if (!isLastCommentLine) {
        parts.push(semi);
      }
      return parts;
    }
    function printReturnStatement(path, options, print) {
      return ["return", printReturnOrThrowArgument(path, options, print)];
    }
    function printThrowStatement(path, options, print) {
      return ["throw", printReturnOrThrowArgument(path, options, print)];
    }
    function returnArgumentHasLeadingComment(options, argument) {
      if (hasLeadingOwnLineComment(options.originalText, argument)) {
        return true;
      }
      if (hasNakedLeftSide(argument)) {
        let leftMost = argument;
        let newLeftMost;
        while (newLeftMost = getLeftSide(leftMost)) {
          leftMost = newLeftMost;
          if (hasLeadingOwnLineComment(options.originalText, leftMost)) {
            return true;
          }
        }
      }
      return false;
    }
    module.exports = {
      printFunction,
      printArrowFunction,
      printMethod,
      printReturnStatement,
      printThrowStatement,
      printMethodInternal,
      shouldPrintParamsWithoutParens
    };
  }
});
var require_decorators = __commonJS2({
  "src/language-js/print/decorators.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      isNonEmptyArray,
      hasNewline
    } = require_util();
    var {
      builders: {
        line,
        hardline,
        join: join2,
        breakParent,
        group
      }
    } = require_document();
    var {
      locStart,
      locEnd
    } = require_loc();
    var {
      getParentExportDeclaration
    } = require_utils3();
    function printClassMemberDecorators(path, options, print) {
      const node = path.getValue();
      return group([join2(line, path.map(print, "decorators")), hasNewlineBetweenOrAfterDecorators(node, options) ? hardline : line]);
    }
    function printDecoratorsBeforeExport(path, options, print) {
      return [join2(hardline, path.map(print, "declaration", "decorators")), hardline];
    }
    function printDecorators(path, options, print) {
      const node = path.getValue();
      const {
        decorators
      } = node;
      if (!isNonEmptyArray(decorators) || hasDecoratorsBeforeExport(path.getParentNode())) {
        return;
      }
      const shouldBreak = node.type === "ClassExpression" || node.type === "ClassDeclaration" || hasNewlineBetweenOrAfterDecorators(node, options);
      return [getParentExportDeclaration(path) ? hardline : shouldBreak ? breakParent : "", join2(line, path.map(print, "decorators")), line];
    }
    function hasNewlineBetweenOrAfterDecorators(node, options) {
      return node.decorators.some((decorator) => hasNewline(options.originalText, locEnd(decorator)));
    }
    function hasDecoratorsBeforeExport(node) {
      if (node.type !== "ExportDefaultDeclaration" && node.type !== "ExportNamedDeclaration" && node.type !== "DeclareExportDeclaration") {
        return false;
      }
      const decorators = node.declaration && node.declaration.decorators;
      return isNonEmptyArray(decorators) && locStart(node) === locStart(decorators[0]);
    }
    module.exports = {
      printDecorators,
      printClassMemberDecorators,
      printDecoratorsBeforeExport,
      hasDecoratorsBeforeExport
    };
  }
});
var require_class = __commonJS2({
  "src/language-js/print/class.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      isNonEmptyArray,
      createGroupIdMapper
    } = require_util();
    var {
      printComments,
      printDanglingComments
    } = require_comments();
    var {
      builders: {
        join: join2,
        line,
        hardline,
        softline,
        group,
        indent,
        ifBreak
      }
    } = require_document();
    var {
      hasComment,
      CommentCheckFlags
    } = require_utils3();
    var {
      getTypeParametersGroupId
    } = require_type_parameters();
    var {
      printMethod
    } = require_function();
    var {
      printOptionalToken,
      printTypeAnnotation,
      printDefiniteToken
    } = require_misc();
    var {
      printPropertyKey
    } = require_property();
    var {
      printAssignment
    } = require_assignment();
    var {
      printClassMemberDecorators
    } = require_decorators();
    function printClass(path, options, print) {
      const node = path.getValue();
      const parts = [];
      if (node.declare) {
        parts.push("declare ");
      }
      if (node.abstract) {
        parts.push("abstract ");
      }
      parts.push("class");
      const groupMode = node.id && hasComment(node.id, CommentCheckFlags.Trailing) || node.typeParameters && hasComment(node.typeParameters, CommentCheckFlags.Trailing) || node.superClass && hasComment(node.superClass) || isNonEmptyArray(node.extends) || isNonEmptyArray(node.mixins) || isNonEmptyArray(node.implements);
      const partsGroup = [];
      const extendsParts = [];
      if (node.id) {
        partsGroup.push(" ", print("id"));
      }
      partsGroup.push(print("typeParameters"));
      if (node.superClass) {
        const printed = [printSuperClass(path, options, print), print("superTypeParameters")];
        const printedWithComments = path.call((superClass) => ["extends ", printComments(superClass, printed, options)], "superClass");
        if (groupMode) {
          extendsParts.push(line, group(printedWithComments));
        } else {
          extendsParts.push(" ", printedWithComments);
        }
      } else {
        extendsParts.push(printList(path, options, print, "extends"));
      }
      extendsParts.push(printList(path, options, print, "mixins"), printList(path, options, print, "implements"));
      if (groupMode) {
        let printedPartsGroup;
        if (shouldIndentOnlyHeritageClauses(node)) {
          printedPartsGroup = [...partsGroup, indent(extendsParts)];
        } else {
          printedPartsGroup = indent([...partsGroup, extendsParts]);
        }
        parts.push(group(printedPartsGroup, {
          id: getHeritageGroupId(node)
        }));
      } else {
        parts.push(...partsGroup, ...extendsParts);
      }
      parts.push(" ", print("body"));
      return parts;
    }
    var getHeritageGroupId = createGroupIdMapper("heritageGroup");
    function printHardlineAfterHeritage(node) {
      return ifBreak(hardline, "", {
        groupId: getHeritageGroupId(node)
      });
    }
    function hasMultipleHeritage(node) {
      return ["superClass", "extends", "mixins", "implements"].filter((key) => Boolean(node[key])).length > 1;
    }
    function shouldIndentOnlyHeritageClauses(node) {
      return node.typeParameters && !hasComment(node.typeParameters, CommentCheckFlags.Trailing | CommentCheckFlags.Line) && !hasMultipleHeritage(node);
    }
    function printList(path, options, print, listName) {
      const node = path.getValue();
      if (!isNonEmptyArray(node[listName])) {
        return "";
      }
      const printedLeadingComments = printDanglingComments(path, options, true, (_ref64) => {
        let {
          marker
        } = _ref64;
        return marker === listName;
      });
      return [shouldIndentOnlyHeritageClauses(node) ? ifBreak(" ", line, {
        groupId: getTypeParametersGroupId(node.typeParameters)
      }) : line, printedLeadingComments, printedLeadingComments && hardline, listName, group(indent([line, join2([",", line], path.map(print, listName))]))];
    }
    function printSuperClass(path, options, print) {
      const printed = print("superClass");
      const parent = path.getParentNode();
      if (parent.type === "AssignmentExpression") {
        return group(ifBreak(["(", indent([softline, printed]), softline, ")"], printed));
      }
      return printed;
    }
    function printClassMethod(path, options, print) {
      const node = path.getValue();
      const parts = [];
      if (isNonEmptyArray(node.decorators)) {
        parts.push(printClassMemberDecorators(path, options, print));
      }
      if (node.accessibility) {
        parts.push(node.accessibility + " ");
      }
      if (node.readonly) {
        parts.push("readonly ");
      }
      if (node.declare) {
        parts.push("declare ");
      }
      if (node.static) {
        parts.push("static ");
      }
      if (node.type === "TSAbstractMethodDefinition" || node.abstract) {
        parts.push("abstract ");
      }
      if (node.override) {
        parts.push("override ");
      }
      parts.push(printMethod(path, options, print));
      return parts;
    }
    function printClassProperty(path, options, print) {
      const node = path.getValue();
      const parts = [];
      const semi = options.semi ? ";" : "";
      if (isNonEmptyArray(node.decorators)) {
        parts.push(printClassMemberDecorators(path, options, print));
      }
      if (node.accessibility) {
        parts.push(node.accessibility + " ");
      }
      if (node.declare) {
        parts.push("declare ");
      }
      if (node.static) {
        parts.push("static ");
      }
      if (node.type === "TSAbstractPropertyDefinition" || node.type === "TSAbstractAccessorProperty" || node.abstract) {
        parts.push("abstract ");
      }
      if (node.override) {
        parts.push("override ");
      }
      if (node.readonly) {
        parts.push("readonly ");
      }
      if (node.variance) {
        parts.push(print("variance"));
      }
      if (node.type === "ClassAccessorProperty" || node.type === "AccessorProperty" || node.type === "TSAbstractAccessorProperty") {
        parts.push("accessor ");
      }
      parts.push(printPropertyKey(path, options, print), printOptionalToken(path), printDefiniteToken(path), printTypeAnnotation(path, options, print));
      return [printAssignment(path, options, print, parts, " =", "value"), semi];
    }
    module.exports = {
      printClass,
      printClassMethod,
      printClassProperty,
      printHardlineAfterHeritage
    };
  }
});
var require_interface = __commonJS2({
  "src/language-js/print/interface.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      isNonEmptyArray
    } = require_util();
    var {
      builders: {
        join: join2,
        line,
        group,
        indent,
        ifBreak
      }
    } = require_document();
    var {
      hasComment,
      identity,
      CommentCheckFlags
    } = require_utils3();
    var {
      getTypeParametersGroupId
    } = require_type_parameters();
    var {
      printTypeScriptModifiers
    } = require_misc();
    function printInterface(path, options, print) {
      const node = path.getValue();
      const parts = [];
      if (node.declare) {
        parts.push("declare ");
      }
      if (node.type === "TSInterfaceDeclaration") {
        parts.push(node.abstract ? "abstract " : "", printTypeScriptModifiers(path, options, print));
      }
      parts.push("interface");
      const partsGroup = [];
      const extendsParts = [];
      if (node.type !== "InterfaceTypeAnnotation") {
        partsGroup.push(" ", print("id"), print("typeParameters"));
      }
      const shouldIndentOnlyHeritageClauses = node.typeParameters && !hasComment(node.typeParameters, CommentCheckFlags.Trailing | CommentCheckFlags.Line);
      if (isNonEmptyArray(node.extends)) {
        extendsParts.push(shouldIndentOnlyHeritageClauses ? ifBreak(" ", line, {
          groupId: getTypeParametersGroupId(node.typeParameters)
        }) : line, "extends ", (node.extends.length === 1 ? identity : indent)(join2([",", line], path.map(print, "extends"))));
      }
      if (node.id && hasComment(node.id, CommentCheckFlags.Trailing) || isNonEmptyArray(node.extends)) {
        if (shouldIndentOnlyHeritageClauses) {
          parts.push(group([...partsGroup, indent(extendsParts)]));
        } else {
          parts.push(group(indent([...partsGroup, ...extendsParts])));
        }
      } else {
        parts.push(...partsGroup, ...extendsParts);
      }
      parts.push(" ", print("body"));
      return group(parts);
    }
    module.exports = {
      printInterface
    };
  }
});
var require_module = __commonJS2({
  "src/language-js/print/module.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      isNonEmptyArray
    } = require_util();
    var {
      builders: {
        softline,
        group,
        indent,
        join: join2,
        line,
        ifBreak,
        hardline
      }
    } = require_document();
    var {
      printDanglingComments
    } = require_comments();
    var {
      hasComment,
      CommentCheckFlags,
      shouldPrintComma,
      needsHardlineAfterDanglingComment,
      isStringLiteral,
      rawText
    } = require_utils3();
    var {
      locStart,
      hasSameLoc
    } = require_loc();
    var {
      hasDecoratorsBeforeExport,
      printDecoratorsBeforeExport
    } = require_decorators();
    function printImportDeclaration(path, options, print) {
      const node = path.getValue();
      const semi = options.semi ? ";" : "";
      const parts = [];
      const {
        importKind
      } = node;
      parts.push("import");
      if (importKind && importKind !== "value") {
        parts.push(" ", importKind);
      }
      parts.push(printModuleSpecifiers(path, options, print), printModuleSource(path, options, print), printImportAssertions(path, options, print), semi);
      return parts;
    }
    function printExportDeclaration(path, options, print) {
      const node = path.getValue();
      const parts = [];
      if (hasDecoratorsBeforeExport(node)) {
        parts.push(printDecoratorsBeforeExport(path, options, print));
      }
      const {
        type: type2,
        exportKind,
        declaration
      } = node;
      parts.push("export");
      const isDefaultExport = node.default || type2 === "ExportDefaultDeclaration";
      if (isDefaultExport) {
        parts.push(" default");
      }
      if (hasComment(node, CommentCheckFlags.Dangling)) {
        parts.push(" ", printDanglingComments(path, options, true));
        if (needsHardlineAfterDanglingComment(node)) {
          parts.push(hardline);
        }
      }
      if (declaration) {
        parts.push(" ", print("declaration"));
      } else {
        parts.push(exportKind === "type" ? " type" : "", printModuleSpecifiers(path, options, print), printModuleSource(path, options, print), printImportAssertions(path, options, print));
      }
      if (shouldExportDeclarationPrintSemi(node, options)) {
        parts.push(";");
      }
      return parts;
    }
    function printExportAllDeclaration(path, options, print) {
      const node = path.getValue();
      const semi = options.semi ? ";" : "";
      const parts = [];
      const {
        exportKind,
        exported
      } = node;
      parts.push("export");
      if (exportKind === "type") {
        parts.push(" type");
      }
      parts.push(" *");
      if (exported) {
        parts.push(" as ", print("exported"));
      }
      parts.push(printModuleSource(path, options, print), printImportAssertions(path, options, print), semi);
      return parts;
    }
    function shouldExportDeclarationPrintSemi(node, options) {
      if (!options.semi) {
        return false;
      }
      const {
        type: type2,
        declaration
      } = node;
      const isDefaultExport = node.default || type2 === "ExportDefaultDeclaration";
      if (!declaration) {
        return true;
      }
      const {
        type: declarationType
      } = declaration;
      if (isDefaultExport && declarationType !== "ClassDeclaration" && declarationType !== "FunctionDeclaration" && declarationType !== "TSInterfaceDeclaration" && declarationType !== "DeclareClass" && declarationType !== "DeclareFunction" && declarationType !== "TSDeclareFunction" && declarationType !== "EnumDeclaration") {
        return true;
      }
      return false;
    }
    function printModuleSource(path, options, print) {
      const node = path.getValue();
      if (!node.source) {
        return "";
      }
      const parts = [];
      if (!shouldNotPrintSpecifiers(node, options)) {
        parts.push(" from");
      }
      parts.push(" ", print("source"));
      return parts;
    }
    function printModuleSpecifiers(path, options, print) {
      const node = path.getValue();
      if (shouldNotPrintSpecifiers(node, options)) {
        return "";
      }
      const parts = [" "];
      if (isNonEmptyArray(node.specifiers)) {
        const standaloneSpecifiers = [];
        const groupedSpecifiers = [];
        path.each(() => {
          const specifierType = path.getValue().type;
          if (specifierType === "ExportNamespaceSpecifier" || specifierType === "ExportDefaultSpecifier" || specifierType === "ImportNamespaceSpecifier" || specifierType === "ImportDefaultSpecifier") {
            standaloneSpecifiers.push(print());
          } else if (specifierType === "ExportSpecifier" || specifierType === "ImportSpecifier") {
            groupedSpecifiers.push(print());
          } else {
            throw new Error(`Unknown specifier type ${JSON.stringify(specifierType)}`);
          }
        }, "specifiers");
        parts.push(join2(", ", standaloneSpecifiers));
        if (groupedSpecifiers.length > 0) {
          if (standaloneSpecifiers.length > 0) {
            parts.push(", ");
          }
          const canBreak = groupedSpecifiers.length > 1 || standaloneSpecifiers.length > 0 || node.specifiers.some((node2) => hasComment(node2));
          if (canBreak) {
            parts.push(group(["{", indent([options.bracketSpacing ? line : softline, join2([",", line], groupedSpecifiers)]), ifBreak(shouldPrintComma(options) ? "," : ""), options.bracketSpacing ? line : softline, "}"]));
          } else {
            parts.push(["{", options.bracketSpacing ? " " : "", ...groupedSpecifiers, options.bracketSpacing ? " " : "", "}"]);
          }
        }
      } else {
        parts.push("{}");
      }
      return parts;
    }
    function shouldNotPrintSpecifiers(node, options) {
      const {
        type: type2,
        importKind,
        source,
        specifiers
      } = node;
      if (type2 !== "ImportDeclaration" || isNonEmptyArray(specifiers) || importKind === "type") {
        return false;
      }
      return !/{\s*}/.test(options.originalText.slice(locStart(node), locStart(source)));
    }
    function printImportAssertions(path, options, print) {
      const node = path.getNode();
      if (isNonEmptyArray(node.assertions)) {
        return [" assert {", options.bracketSpacing ? " " : "", join2(", ", path.map(print, "assertions")), options.bracketSpacing ? " " : "", "}"];
      }
      return "";
    }
    function printModuleSpecifier(path, options, print) {
      const node = path.getNode();
      const {
        type: type2
      } = node;
      const parts = [];
      const kind = type2 === "ImportSpecifier" ? node.importKind : node.exportKind;
      if (kind && kind !== "value") {
        parts.push(kind, " ");
      }
      const isImport = type2.startsWith("Import");
      const leftSideProperty = isImport ? "imported" : "local";
      const rightSideProperty = isImport ? "local" : "exported";
      const leftSideNode = node[leftSideProperty];
      const rightSideNode = node[rightSideProperty];
      let left = "";
      let right = "";
      if (type2 === "ExportNamespaceSpecifier" || type2 === "ImportNamespaceSpecifier") {
        left = "*";
      } else if (leftSideNode) {
        left = print(leftSideProperty);
      }
      if (rightSideNode && !isShorthandSpecifier(node)) {
        right = print(rightSideProperty);
      }
      parts.push(left, left && right ? " as " : "", right);
      return parts;
    }
    function isShorthandSpecifier(specifier) {
      if (specifier.type !== "ImportSpecifier" && specifier.type !== "ExportSpecifier") {
        return false;
      }
      const {
        local,
        [specifier.type === "ImportSpecifier" ? "imported" : "exported"]: importedOrExported
      } = specifier;
      if (local.type !== importedOrExported.type || !hasSameLoc(local, importedOrExported)) {
        return false;
      }
      if (isStringLiteral(local)) {
        return local.value === importedOrExported.value && rawText(local) === rawText(importedOrExported);
      }
      switch (local.type) {
        case "Identifier":
          return local.name === importedOrExported.name;
        default:
          return false;
      }
    }
    module.exports = {
      printImportDeclaration,
      printExportDeclaration,
      printExportAllDeclaration,
      printModuleSpecifier
    };
  }
});
var require_object = __commonJS2({
  "src/language-js/print/object.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      printDanglingComments
    } = require_comments();
    var {
      builders: {
        line,
        softline,
        group,
        indent,
        ifBreak,
        hardline
      }
    } = require_document();
    var {
      getLast,
      hasNewlineInRange,
      hasNewline,
      isNonEmptyArray
    } = require_util();
    var {
      shouldPrintComma,
      hasComment,
      getComments,
      CommentCheckFlags,
      isNextLineEmpty
    } = require_utils3();
    var {
      locStart,
      locEnd
    } = require_loc();
    var {
      printOptionalToken,
      printTypeAnnotation
    } = require_misc();
    var {
      shouldHugFunctionParameters
    } = require_function_parameters();
    var {
      shouldHugType
    } = require_type_annotation();
    var {
      printHardlineAfterHeritage
    } = require_class();
    function printObject(path, options, print) {
      const semi = options.semi ? ";" : "";
      const node = path.getValue();
      let propertiesField;
      if (node.type === "TSTypeLiteral") {
        propertiesField = "members";
      } else if (node.type === "TSInterfaceBody") {
        propertiesField = "body";
      } else {
        propertiesField = "properties";
      }
      const isTypeAnnotation = node.type === "ObjectTypeAnnotation";
      const fields = [propertiesField];
      if (isTypeAnnotation) {
        fields.push("indexers", "callProperties", "internalSlots");
      }
      const firstProperty = fields.map((field) => node[field][0]).sort((a, b) => locStart(a) - locStart(b))[0];
      const parent = path.getParentNode(0);
      const isFlowInterfaceLikeBody = isTypeAnnotation && parent && (parent.type === "InterfaceDeclaration" || parent.type === "DeclareInterface" || parent.type === "DeclareClass") && path.getName() === "body";
      const shouldBreak = node.type === "TSInterfaceBody" || isFlowInterfaceLikeBody || node.type === "ObjectPattern" && parent.type !== "FunctionDeclaration" && parent.type !== "FunctionExpression" && parent.type !== "ArrowFunctionExpression" && parent.type !== "ObjectMethod" && parent.type !== "ClassMethod" && parent.type !== "ClassPrivateMethod" && parent.type !== "AssignmentPattern" && parent.type !== "CatchClause" && node.properties.some((property) => property.value && (property.value.type === "ObjectPattern" || property.value.type === "ArrayPattern")) || node.type !== "ObjectPattern" && firstProperty && hasNewlineInRange(options.originalText, locStart(node), locStart(firstProperty));
      const separator = isFlowInterfaceLikeBody ? ";" : node.type === "TSInterfaceBody" || node.type === "TSTypeLiteral" ? ifBreak(semi, ";") : ",";
      const leftBrace = node.type === "RecordExpression" ? "#{" : node.exact ? "{|" : "{";
      const rightBrace = node.exact ? "|}" : "}";
      const propsAndLoc = [];
      for (const field of fields) {
        path.each((childPath) => {
          const node2 = childPath.getValue();
          propsAndLoc.push({
            node: node2,
            printed: print(),
            loc: locStart(node2)
          });
        }, field);
      }
      if (fields.length > 1) {
        propsAndLoc.sort((a, b) => a.loc - b.loc);
      }
      let separatorParts = [];
      const props = propsAndLoc.map((prop) => {
        const result = [...separatorParts, group(prop.printed)];
        separatorParts = [separator, line];
        if ((prop.node.type === "TSPropertySignature" || prop.node.type === "TSMethodSignature" || prop.node.type === "TSConstructSignatureDeclaration") && hasComment(prop.node, CommentCheckFlags.PrettierIgnore)) {
          separatorParts.shift();
        }
        if (isNextLineEmpty(prop.node, options)) {
          separatorParts.push(hardline);
        }
        return result;
      });
      if (node.inexact) {
        let printed;
        if (hasComment(node, CommentCheckFlags.Dangling)) {
          const hasLineComments = hasComment(node, CommentCheckFlags.Line);
          const printedDanglingComments = printDanglingComments(path, options, true);
          printed = [printedDanglingComments, hasLineComments || hasNewline(options.originalText, locEnd(getLast(getComments(node)))) ? hardline : line, "..."];
        } else {
          printed = ["..."];
        }
        props.push([...separatorParts, ...printed]);
      }
      const lastElem = getLast(node[propertiesField]);
      const canHaveTrailingSeparator = !(node.inexact || lastElem && lastElem.type === "RestElement" || lastElem && (lastElem.type === "TSPropertySignature" || lastElem.type === "TSCallSignatureDeclaration" || lastElem.type === "TSMethodSignature" || lastElem.type === "TSConstructSignatureDeclaration") && hasComment(lastElem, CommentCheckFlags.PrettierIgnore));
      let content;
      if (props.length === 0) {
        if (!hasComment(node, CommentCheckFlags.Dangling)) {
          return [leftBrace, rightBrace, printTypeAnnotation(path, options, print)];
        }
        content = group([leftBrace, printDanglingComments(path, options), softline, rightBrace, printOptionalToken(path), printTypeAnnotation(path, options, print)]);
      } else {
        content = [isFlowInterfaceLikeBody && isNonEmptyArray(node.properties) ? printHardlineAfterHeritage(parent) : "", leftBrace, indent([options.bracketSpacing ? line : softline, ...props]), ifBreak(canHaveTrailingSeparator && (separator !== "," || shouldPrintComma(options)) ? separator : ""), options.bracketSpacing ? line : softline, rightBrace, printOptionalToken(path), printTypeAnnotation(path, options, print)];
      }
      if (path.match((node2) => node2.type === "ObjectPattern" && !node2.decorators, (node2, name, number) => shouldHugFunctionParameters(node2) && (name === "params" || name === "parameters" || name === "this" || name === "rest") && number === 0) || path.match(shouldHugType, (node2, name) => name === "typeAnnotation", (node2, name) => name === "typeAnnotation", (node2, name, number) => shouldHugFunctionParameters(node2) && (name === "params" || name === "parameters" || name === "this" || name === "rest") && number === 0) || !shouldBreak && path.match((node2) => node2.type === "ObjectPattern", (node2) => node2.type === "AssignmentExpression" || node2.type === "VariableDeclarator")) {
        return content;
      }
      return group(content, {
        shouldBreak
      });
    }
    module.exports = {
      printObject
    };
  }
});
var require_flow = __commonJS2({
  "src/language-js/print/flow.js"(exports, module) {
    "use strict";
    init_define_process();
    var assert = require_assert();
    var {
      printDanglingComments
    } = require_comments();
    var {
      printString,
      printNumber
    } = require_util();
    var {
      builders: {
        hardline,
        softline,
        group,
        indent
      }
    } = require_document();
    var {
      getParentExportDeclaration,
      isFunctionNotation,
      isGetterOrSetter,
      rawText,
      shouldPrintComma
    } = require_utils3();
    var {
      locStart,
      locEnd
    } = require_loc();
    var {
      replaceTextEndOfLine
    } = require_doc_utils();
    var {
      printClass
    } = require_class();
    var {
      printOpaqueType,
      printTypeAlias,
      printIntersectionType,
      printUnionType,
      printFunctionType,
      printTupleType,
      printIndexedAccessType
    } = require_type_annotation();
    var {
      printInterface
    } = require_interface();
    var {
      printTypeParameter,
      printTypeParameters
    } = require_type_parameters();
    var {
      printExportDeclaration,
      printExportAllDeclaration
    } = require_module();
    var {
      printArrayItems
    } = require_array3();
    var {
      printObject
    } = require_object();
    var {
      printPropertyKey
    } = require_property();
    var {
      printOptionalToken,
      printTypeAnnotation,
      printRestSpread
    } = require_misc();
    function printFlow(path, options, print) {
      const node = path.getValue();
      const semi = options.semi ? ";" : "";
      const parts = [];
      switch (node.type) {
        case "DeclareClass":
          return printFlowDeclaration(path, printClass(path, options, print));
        case "DeclareFunction":
          return printFlowDeclaration(path, ["function ", print("id"), node.predicate ? " " : "", print("predicate"), semi]);
        case "DeclareModule":
          return printFlowDeclaration(path, ["module ", print("id"), " ", print("body")]);
        case "DeclareModuleExports":
          return printFlowDeclaration(path, ["module.exports", ": ", print("typeAnnotation"), semi]);
        case "DeclareVariable":
          return printFlowDeclaration(path, ["var ", print("id"), semi]);
        case "DeclareOpaqueType":
          return printFlowDeclaration(path, printOpaqueType(path, options, print));
        case "DeclareInterface":
          return printFlowDeclaration(path, printInterface(path, options, print));
        case "DeclareTypeAlias":
          return printFlowDeclaration(path, printTypeAlias(path, options, print));
        case "DeclareExportDeclaration":
          return printFlowDeclaration(path, printExportDeclaration(path, options, print));
        case "DeclareExportAllDeclaration":
          return printFlowDeclaration(path, printExportAllDeclaration(path, options, print));
        case "OpaqueType":
          return printOpaqueType(path, options, print);
        case "TypeAlias":
          return printTypeAlias(path, options, print);
        case "IntersectionTypeAnnotation":
          return printIntersectionType(path, options, print);
        case "UnionTypeAnnotation":
          return printUnionType(path, options, print);
        case "FunctionTypeAnnotation":
          return printFunctionType(path, options, print);
        case "TupleTypeAnnotation":
          return printTupleType(path, options, print);
        case "GenericTypeAnnotation":
          return [print("id"), printTypeParameters(path, options, print, "typeParameters")];
        case "IndexedAccessType":
        case "OptionalIndexedAccessType":
          return printIndexedAccessType(path, options, print);
        case "TypeAnnotation":
          return print("typeAnnotation");
        case "TypeParameter":
          return printTypeParameter(path, options, print);
        case "TypeofTypeAnnotation":
          return ["typeof ", print("argument")];
        case "ExistsTypeAnnotation":
          return "*";
        case "EmptyTypeAnnotation":
          return "empty";
        case "MixedTypeAnnotation":
          return "mixed";
        case "ArrayTypeAnnotation":
          return [print("elementType"), "[]"];
        case "BooleanLiteralTypeAnnotation":
          return String(node.value);
        case "EnumDeclaration":
          return ["enum ", print("id"), " ", print("body")];
        case "EnumBooleanBody":
        case "EnumNumberBody":
        case "EnumStringBody":
        case "EnumSymbolBody": {
          if (node.type === "EnumSymbolBody" || node.explicitType) {
            let type2 = null;
            switch (node.type) {
              case "EnumBooleanBody":
                type2 = "boolean";
                break;
              case "EnumNumberBody":
                type2 = "number";
                break;
              case "EnumStringBody":
                type2 = "string";
                break;
              case "EnumSymbolBody":
                type2 = "symbol";
                break;
            }
            parts.push("of ", type2, " ");
          }
          if (node.members.length === 0 && !node.hasUnknownMembers) {
            parts.push(group(["{", printDanglingComments(path, options), softline, "}"]));
          } else {
            const members = node.members.length > 0 ? [hardline, printArrayItems(path, options, "members", print), node.hasUnknownMembers || shouldPrintComma(options) ? "," : ""] : [];
            parts.push(group(["{", indent([...members, ...node.hasUnknownMembers ? [hardline, "..."] : []]), printDanglingComments(path, options, true), hardline, "}"]));
          }
          return parts;
        }
        case "EnumBooleanMember":
        case "EnumNumberMember":
        case "EnumStringMember":
          return [print("id"), " = ", typeof node.init === "object" ? print("init") : String(node.init)];
        case "EnumDefaultedMember":
          return print("id");
        case "FunctionTypeParam": {
          const name = node.name ? print("name") : path.getParentNode().this === node ? "this" : "";
          return [name, printOptionalToken(path), name ? ": " : "", print("typeAnnotation")];
        }
        case "InterfaceDeclaration":
        case "InterfaceTypeAnnotation":
          return printInterface(path, options, print);
        case "ClassImplements":
        case "InterfaceExtends":
          return [print("id"), print("typeParameters")];
        case "NullableTypeAnnotation":
          return ["?", print("typeAnnotation")];
        case "Variance": {
          const {
            kind
          } = node;
          assert.ok(kind === "plus" || kind === "minus");
          return kind === "plus" ? "+" : "-";
        }
        case "ObjectTypeCallProperty":
          if (node.static) {
            parts.push("static ");
          }
          parts.push(print("value"));
          return parts;
        case "ObjectTypeIndexer": {
          return [node.static ? "static " : "", node.variance ? print("variance") : "", "[", print("id"), node.id ? ": " : "", print("key"), "]: ", print("value")];
        }
        case "ObjectTypeProperty": {
          let modifier = "";
          if (node.proto) {
            modifier = "proto ";
          } else if (node.static) {
            modifier = "static ";
          }
          return [modifier, isGetterOrSetter(node) ? node.kind + " " : "", node.variance ? print("variance") : "", printPropertyKey(path, options, print), printOptionalToken(path), isFunctionNotation(node) ? "" : ": ", print("value")];
        }
        case "ObjectTypeAnnotation":
          return printObject(path, options, print);
        case "ObjectTypeInternalSlot":
          return [node.static ? "static " : "", "[[", print("id"), "]]", printOptionalToken(path), node.method ? "" : ": ", print("value")];
        case "ObjectTypeSpreadProperty":
          return printRestSpread(path, options, print);
        case "QualifiedTypeofIdentifier":
        case "QualifiedTypeIdentifier":
          return [print("qualification"), ".", print("id")];
        case "StringLiteralTypeAnnotation":
          return replaceTextEndOfLine(printString(rawText(node), options));
        case "NumberLiteralTypeAnnotation":
          assert.strictEqual(typeof node.value, "number");
        case "BigIntLiteralTypeAnnotation":
          if (node.extra) {
            return printNumber(node.extra.raw);
          }
          return printNumber(node.raw);
        case "TypeCastExpression": {
          return ["(", print("expression"), printTypeAnnotation(path, options, print), ")"];
        }
        case "TypeParameterDeclaration":
        case "TypeParameterInstantiation": {
          const printed = printTypeParameters(path, options, print, "params");
          if (options.parser === "flow") {
            const start = locStart(node);
            const end = locEnd(node);
            const commentStartIndex = options.originalText.lastIndexOf("/*", start);
            const commentEndIndex = options.originalText.indexOf("*/", end);
            if (commentStartIndex !== -1 && commentEndIndex !== -1) {
              const comment = options.originalText.slice(commentStartIndex + 2, commentEndIndex).trim();
              if (comment.startsWith("::") && !comment.includes("/*") && !comment.includes("*/")) {
                return ["/*:: ", printed, " */"];
              }
            }
          }
          return printed;
        }
        case "InferredPredicate":
          return "%checks";
        case "DeclaredPredicate":
          return ["%checks(", print("value"), ")"];
        case "AnyTypeAnnotation":
          return "any";
        case "BooleanTypeAnnotation":
          return "boolean";
        case "BigIntTypeAnnotation":
          return "bigint";
        case "NullLiteralTypeAnnotation":
          return "null";
        case "NumberTypeAnnotation":
          return "number";
        case "SymbolTypeAnnotation":
          return "symbol";
        case "StringTypeAnnotation":
          return "string";
        case "VoidTypeAnnotation":
          return "void";
        case "ThisTypeAnnotation":
          return "this";
        case "Node":
        case "Printable":
        case "SourceLocation":
        case "Position":
        case "Statement":
        case "Function":
        case "Pattern":
        case "Expression":
        case "Declaration":
        case "Specifier":
        case "NamedSpecifier":
        case "Comment":
        case "MemberTypeAnnotation":
        case "Type":
          throw new Error("unprintable type: " + JSON.stringify(node.type));
      }
    }
    function printFlowDeclaration(path, printed) {
      const parentExportDecl = getParentExportDeclaration(path);
      if (parentExportDecl) {
        assert.strictEqual(parentExportDecl.type, "DeclareExportDeclaration");
        return printed;
      }
      return ["declare ", printed];
    }
    module.exports = {
      printFlow
    };
  }
});
var require_is_ts_keyword_type = __commonJS2({
  "src/language-js/utils/is-ts-keyword-type.js"(exports, module) {
    "use strict";
    init_define_process();
    function isTsKeywordType(_ref65) {
      let {
        type: type2
      } = _ref65;
      return type2.startsWith("TS") && type2.endsWith("Keyword");
    }
    module.exports = isTsKeywordType;
  }
});
var require_ternary = __commonJS2({
  "src/language-js/print/ternary.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      hasNewlineInRange
    } = require_util();
    var {
      isJsxNode,
      getComments,
      isCallExpression,
      isMemberExpression,
      isTSTypeExpression
    } = require_utils3();
    var {
      locStart,
      locEnd
    } = require_loc();
    var isBlockComment = require_is_block_comment();
    var {
      builders: {
        line,
        softline,
        group,
        indent,
        align,
        ifBreak,
        dedent,
        breakParent
      }
    } = require_document();
    function conditionalExpressionChainContainsJsx(node) {
      const conditionalExpressions = [node];
      for (let index = 0; index < conditionalExpressions.length; index++) {
        const conditionalExpression = conditionalExpressions[index];
        for (const property of ["test", "consequent", "alternate"]) {
          const node2 = conditionalExpression[property];
          if (isJsxNode(node2)) {
            return true;
          }
          if (node2.type === "ConditionalExpression") {
            conditionalExpressions.push(node2);
          }
        }
      }
      return false;
    }
    function printTernaryTest(path, options, print) {
      const node = path.getValue();
      const isConditionalExpression = node.type === "ConditionalExpression";
      const alternateNodePropertyName = isConditionalExpression ? "alternate" : "falseType";
      const parent = path.getParentNode();
      const printed = isConditionalExpression ? print("test") : [print("checkType"), " ", "extends", " ", print("extendsType")];
      if (parent.type === node.type && parent[alternateNodePropertyName] === node) {
        return align(2, printed);
      }
      return printed;
    }
    var ancestorNameMap = /* @__PURE__ */ new Map([["AssignmentExpression", "right"], ["VariableDeclarator", "init"], ["ReturnStatement", "argument"], ["ThrowStatement", "argument"], ["UnaryExpression", "argument"], ["YieldExpression", "argument"]]);
    function shouldExtraIndentForConditionalExpression(path) {
      const node = path.getValue();
      if (node.type !== "ConditionalExpression") {
        return false;
      }
      let parent;
      let child = node;
      for (let ancestorCount = 0; !parent; ancestorCount++) {
        const node2 = path.getParentNode(ancestorCount);
        if (isCallExpression(node2) && node2.callee === child || isMemberExpression(node2) && node2.object === child || node2.type === "TSNonNullExpression" && node2.expression === child) {
          child = node2;
          continue;
        }
        if (node2.type === "NewExpression" && node2.callee === child || isTSTypeExpression(node2) && node2.expression === child) {
          parent = path.getParentNode(ancestorCount + 1);
          child = node2;
        } else {
          parent = node2;
        }
      }
      if (child === node) {
        return false;
      }
      return parent[ancestorNameMap.get(parent.type)] === child;
    }
    function printTernary(path, options, print) {
      const node = path.getValue();
      const isConditionalExpression = node.type === "ConditionalExpression";
      const consequentNodePropertyName = isConditionalExpression ? "consequent" : "trueType";
      const alternateNodePropertyName = isConditionalExpression ? "alternate" : "falseType";
      const testNodePropertyNames = isConditionalExpression ? ["test"] : ["checkType", "extendsType"];
      const consequentNode = node[consequentNodePropertyName];
      const alternateNode = node[alternateNodePropertyName];
      const parts = [];
      let jsxMode = false;
      const parent = path.getParentNode();
      const isParentTest = parent.type === node.type && testNodePropertyNames.some((prop) => parent[prop] === node);
      let forceNoIndent = parent.type === node.type && !isParentTest;
      let currentParent;
      let previousParent;
      let i = 0;
      do {
        previousParent = currentParent || node;
        currentParent = path.getParentNode(i);
        i++;
      } while (currentParent && currentParent.type === node.type && testNodePropertyNames.every((prop) => currentParent[prop] !== previousParent));
      const firstNonConditionalParent = currentParent || parent;
      const lastConditionalParent = previousParent;
      if (isConditionalExpression && (isJsxNode(node[testNodePropertyNames[0]]) || isJsxNode(consequentNode) || isJsxNode(alternateNode) || conditionalExpressionChainContainsJsx(lastConditionalParent))) {
        jsxMode = true;
        forceNoIndent = true;
        const wrap = (doc) => [ifBreak("("), indent([softline, doc]), softline, ifBreak(")")];
        const isNil = (node2) => node2.type === "NullLiteral" || node2.type === "Literal" && node2.value === null || node2.type === "Identifier" && node2.name === "undefined";
        parts.push(" ? ", isNil(consequentNode) ? print(consequentNodePropertyName) : wrap(print(consequentNodePropertyName)), " : ", alternateNode.type === node.type || isNil(alternateNode) ? print(alternateNodePropertyName) : wrap(print(alternateNodePropertyName)));
      } else {
        const part = [line, "? ", consequentNode.type === node.type ? ifBreak("", "(") : "", align(2, print(consequentNodePropertyName)), consequentNode.type === node.type ? ifBreak("", ")") : "", line, ": ", alternateNode.type === node.type ? print(alternateNodePropertyName) : align(2, print(alternateNodePropertyName))];
        parts.push(parent.type !== node.type || parent[alternateNodePropertyName] === node || isParentTest ? part : options.useTabs ? dedent(indent(part)) : align(Math.max(0, options.tabWidth - 2), part));
      }
      const comments = [...testNodePropertyNames.map((propertyName) => getComments(node[propertyName])), getComments(consequentNode), getComments(alternateNode)].flat();
      const shouldBreak = comments.some((comment) => isBlockComment(comment) && hasNewlineInRange(options.originalText, locStart(comment), locEnd(comment)));
      const maybeGroup = (doc) => parent === firstNonConditionalParent ? group(doc, {
        shouldBreak
      }) : shouldBreak ? [doc, breakParent] : doc;
      const breakClosingParen = !jsxMode && (isMemberExpression(parent) || parent.type === "NGPipeExpression" && parent.left === node) && !parent.computed;
      const shouldExtraIndent = shouldExtraIndentForConditionalExpression(path);
      const result = maybeGroup([printTernaryTest(path, options, print), forceNoIndent ? parts : indent(parts), isConditionalExpression && breakClosingParen && !shouldExtraIndent ? softline : ""]);
      return isParentTest || shouldExtraIndent ? group([indent([softline, result]), softline]) : result;
    }
    module.exports = {
      printTernary
    };
  }
});
var require_statement = __commonJS2({
  "src/language-js/print/statement.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      builders: {
        hardline
      }
    } = require_document();
    var pathNeedsParens = require_needs_parens();
    var {
      getLeftSidePathName,
      hasNakedLeftSide,
      isJsxNode,
      isTheOnlyJsxElementInMarkdown,
      hasComment,
      CommentCheckFlags,
      isNextLineEmpty
    } = require_utils3();
    var {
      shouldPrintParamsWithoutParens
    } = require_function();
    function printStatementSequence(path, options, print, property) {
      const node = path.getValue();
      const parts = [];
      const isClassBody = node.type === "ClassBody";
      const lastStatement = getLastStatement(node[property]);
      path.each((path2, index, statements) => {
        const node2 = path2.getValue();
        if (node2.type === "EmptyStatement") {
          return;
        }
        const printed = print();
        if (!options.semi && !isClassBody && !isTheOnlyJsxElementInMarkdown(options, path2) && statementNeedsASIProtection(path2, options)) {
          if (hasComment(node2, CommentCheckFlags.Leading)) {
            parts.push(print([], {
              needsSemi: true
            }));
          } else {
            parts.push(";", printed);
          }
        } else {
          parts.push(printed);
        }
        if (!options.semi && isClassBody && isClassProperty(node2) && shouldPrintSemicolonAfterClassProperty(node2, statements[index + 1])) {
          parts.push(";");
        }
        if (node2 !== lastStatement) {
          parts.push(hardline);
          if (isNextLineEmpty(node2, options)) {
            parts.push(hardline);
          }
        }
      }, property);
      return parts;
    }
    function getLastStatement(statements) {
      for (let i = statements.length - 1; i >= 0; i--) {
        const statement = statements[i];
        if (statement.type !== "EmptyStatement") {
          return statement;
        }
      }
    }
    function statementNeedsASIProtection(path, options) {
      const node = path.getNode();
      if (node.type !== "ExpressionStatement") {
        return false;
      }
      return path.call((childPath) => expressionNeedsASIProtection(childPath, options), "expression");
    }
    function expressionNeedsASIProtection(path, options) {
      const node = path.getValue();
      switch (node.type) {
        case "ParenthesizedExpression":
        case "TypeCastExpression":
        case "ArrayExpression":
        case "ArrayPattern":
        case "TemplateLiteral":
        case "TemplateElement":
        case "RegExpLiteral":
          return true;
        case "ArrowFunctionExpression": {
          if (!shouldPrintParamsWithoutParens(path, options)) {
            return true;
          }
          break;
        }
        case "UnaryExpression": {
          const {
            prefix,
            operator
          } = node;
          if (prefix && (operator === "+" || operator === "-")) {
            return true;
          }
          break;
        }
        case "BindExpression": {
          if (!node.object) {
            return true;
          }
          break;
        }
        case "Literal": {
          if (node.regex) {
            return true;
          }
          break;
        }
        default: {
          if (isJsxNode(node)) {
            return true;
          }
        }
      }
      if (pathNeedsParens(path, options)) {
        return true;
      }
      if (!hasNakedLeftSide(node)) {
        return false;
      }
      return path.call((childPath) => expressionNeedsASIProtection(childPath, options), ...getLeftSidePathName(path, node));
    }
    function printBody(path, options, print) {
      return printStatementSequence(path, options, print, "body");
    }
    function printSwitchCaseConsequent(path, options, print) {
      return printStatementSequence(path, options, print, "consequent");
    }
    var isClassProperty = (_ref66) => {
      let {
        type: type2
      } = _ref66;
      return type2 === "ClassProperty" || type2 === "PropertyDefinition" || type2 === "ClassPrivateProperty" || type2 === "ClassAccessorProperty" || type2 === "AccessorProperty" || type2 === "TSAbstractPropertyDefinition" || type2 === "TSAbstractAccessorProperty";
    };
    function shouldPrintSemicolonAfterClassProperty(node, nextNode) {
      const {
        type: type2,
        name
      } = node.key;
      if (!node.computed && type2 === "Identifier" && (name === "static" || name === "get" || name === "set" || name === "accessor") && !node.value && !node.typeAnnotation) {
        return true;
      }
      if (!nextNode) {
        return false;
      }
      if (nextNode.static || nextNode.accessibility) {
        return false;
      }
      if (!nextNode.computed) {
        const name2 = nextNode.key && nextNode.key.name;
        if (name2 === "in" || name2 === "instanceof") {
          return true;
        }
      }
      if (isClassProperty(nextNode) && nextNode.variance && !nextNode.static && !nextNode.declare) {
        return true;
      }
      switch (nextNode.type) {
        case "ClassProperty":
        case "PropertyDefinition":
        case "TSAbstractPropertyDefinition":
          return nextNode.computed;
        case "MethodDefinition":
        case "TSAbstractMethodDefinition":
        case "ClassMethod":
        case "ClassPrivateMethod": {
          const isAsync = nextNode.value ? nextNode.value.async : nextNode.async;
          if (isAsync || nextNode.kind === "get" || nextNode.kind === "set") {
            return false;
          }
          const isGenerator = nextNode.value ? nextNode.value.generator : nextNode.generator;
          if (nextNode.computed || isGenerator) {
            return true;
          }
          return false;
        }
        case "TSIndexSignature":
          return true;
      }
      return false;
    }
    module.exports = {
      printBody,
      printSwitchCaseConsequent
    };
  }
});
var require_block = __commonJS2({
  "src/language-js/print/block.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      printDanglingComments
    } = require_comments();
    var {
      isNonEmptyArray
    } = require_util();
    var {
      builders: {
        hardline,
        indent
      }
    } = require_document();
    var {
      hasComment,
      CommentCheckFlags,
      isNextLineEmpty
    } = require_utils3();
    var {
      printHardlineAfterHeritage
    } = require_class();
    var {
      printBody
    } = require_statement();
    function printBlock(path, options, print) {
      const node = path.getValue();
      const parts = [];
      if (node.type === "StaticBlock") {
        parts.push("static ");
      }
      if (node.type === "ClassBody" && isNonEmptyArray(node.body)) {
        const parent = path.getParentNode();
        parts.push(printHardlineAfterHeritage(parent));
      }
      parts.push("{");
      const printed = printBlockBody(path, options, print);
      if (printed) {
        parts.push(indent([hardline, printed]), hardline);
      } else {
        const parent = path.getParentNode();
        const parentParent = path.getParentNode(1);
        if (!(parent.type === "ArrowFunctionExpression" || parent.type === "FunctionExpression" || parent.type === "FunctionDeclaration" || parent.type === "ObjectMethod" || parent.type === "ClassMethod" || parent.type === "ClassPrivateMethod" || parent.type === "ForStatement" || parent.type === "WhileStatement" || parent.type === "DoWhileStatement" || parent.type === "DoExpression" || parent.type === "CatchClause" && !parentParent.finalizer || parent.type === "TSModuleDeclaration" || parent.type === "TSDeclareFunction" || node.type === "StaticBlock" || node.type === "ClassBody")) {
          parts.push(hardline);
        }
      }
      parts.push("}");
      return parts;
    }
    function printBlockBody(path, options, print) {
      const node = path.getValue();
      const nodeHasDirectives = isNonEmptyArray(node.directives);
      const nodeHasBody = node.body.some((node2) => node2.type !== "EmptyStatement");
      const nodeHasComment = hasComment(node, CommentCheckFlags.Dangling);
      if (!nodeHasDirectives && !nodeHasBody && !nodeHasComment) {
        return "";
      }
      const parts = [];
      if (nodeHasDirectives) {
        path.each((childPath, index, directives) => {
          parts.push(print());
          if (index < directives.length - 1 || nodeHasBody || nodeHasComment) {
            parts.push(hardline);
            if (isNextLineEmpty(childPath.getValue(), options)) {
              parts.push(hardline);
            }
          }
        }, "directives");
      }
      if (nodeHasBody) {
        parts.push(printBody(path, options, print));
      }
      if (nodeHasComment) {
        parts.push(printDanglingComments(path, options, true));
      }
      if (node.type === "Program") {
        const parent = path.getParentNode();
        if (!parent || parent.type !== "ModuleExpression") {
          parts.push(hardline);
        }
      }
      return parts;
    }
    module.exports = {
      printBlock,
      printBlockBody
    };
  }
});
var require_typescript = __commonJS2({
  "src/language-js/print/typescript.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      printDanglingComments
    } = require_comments();
    var {
      hasNewlineInRange
    } = require_util();
    var {
      builders: {
        join: join2,
        line,
        hardline,
        softline,
        group,
        indent,
        conditionalGroup,
        ifBreak
      }
    } = require_document();
    var {
      isStringLiteral,
      getTypeScriptMappedTypeModifier,
      shouldPrintComma,
      isCallExpression,
      isMemberExpression
    } = require_utils3();
    var isTsKeywordType = require_is_ts_keyword_type();
    var {
      locStart,
      locEnd
    } = require_loc();
    var {
      printOptionalToken,
      printTypeScriptModifiers
    } = require_misc();
    var {
      printTernary
    } = require_ternary();
    var {
      printFunctionParameters,
      shouldGroupFunctionParameters
    } = require_function_parameters();
    var {
      printTemplateLiteral
    } = require_template_literal();
    var {
      printArrayItems
    } = require_array3();
    var {
      printObject
    } = require_object();
    var {
      printClassProperty,
      printClassMethod
    } = require_class();
    var {
      printTypeParameter,
      printTypeParameters
    } = require_type_parameters();
    var {
      printPropertyKey
    } = require_property();
    var {
      printFunction,
      printMethodInternal
    } = require_function();
    var {
      printInterface
    } = require_interface();
    var {
      printBlock
    } = require_block();
    var {
      printTypeAlias,
      printIntersectionType,
      printUnionType,
      printFunctionType,
      printTupleType,
      printIndexedAccessType,
      printJSDocType
    } = require_type_annotation();
    function printTypescript(path, options, print) {
      const node = path.getValue();
      if (!node.type.startsWith("TS")) {
        return;
      }
      if (isTsKeywordType(node)) {
        return node.type.slice(2, -7).toLowerCase();
      }
      const semi = options.semi ? ";" : "";
      const parts = [];
      switch (node.type) {
        case "TSThisType":
          return "this";
        case "TSTypeAssertion": {
          const shouldBreakAfterCast = !(node.expression.type === "ArrayExpression" || node.expression.type === "ObjectExpression");
          const castGroup = group(["<", indent([softline, print("typeAnnotation")]), softline, ">"]);
          const exprContents = [ifBreak("("), indent([softline, print("expression")]), softline, ifBreak(")")];
          if (shouldBreakAfterCast) {
            return conditionalGroup([[castGroup, print("expression")], [castGroup, group(exprContents, {
              shouldBreak: true
            })], [castGroup, print("expression")]]);
          }
          return group([castGroup, print("expression")]);
        }
        case "TSDeclareFunction":
          return printFunction(path, print, options);
        case "TSExportAssignment":
          return ["export = ", print("expression"), semi];
        case "TSModuleBlock":
          return printBlock(path, options, print);
        case "TSInterfaceBody":
        case "TSTypeLiteral":
          return printObject(path, options, print);
        case "TSTypeAliasDeclaration":
          return printTypeAlias(path, options, print);
        case "TSQualifiedName":
          return join2(".", [print("left"), print("right")]);
        case "TSAbstractMethodDefinition":
        case "TSDeclareMethod":
          return printClassMethod(path, options, print);
        case "TSAbstractAccessorProperty":
        case "TSAbstractPropertyDefinition":
          return printClassProperty(path, options, print);
        case "TSInterfaceHeritage":
        case "TSExpressionWithTypeArguments":
          parts.push(print("expression"));
          if (node.typeParameters) {
            parts.push(print("typeParameters"));
          }
          return parts;
        case "TSTemplateLiteralType":
          return printTemplateLiteral(path, print, options);
        case "TSNamedTupleMember":
          return [print("label"), node.optional ? "?" : "", ": ", print("elementType")];
        case "TSRestType":
          return ["...", print("typeAnnotation")];
        case "TSOptionalType":
          return [print("typeAnnotation"), "?"];
        case "TSInterfaceDeclaration":
          return printInterface(path, options, print);
        case "TSClassImplements":
          return [print("expression"), print("typeParameters")];
        case "TSTypeParameterDeclaration":
        case "TSTypeParameterInstantiation":
          return printTypeParameters(path, options, print, "params");
        case "TSTypeParameter":
          return printTypeParameter(path, options, print);
        case "TSSatisfiesExpression":
        case "TSAsExpression": {
          const operator = node.type === "TSAsExpression" ? "as" : "satisfies";
          parts.push(print("expression"), ` ${operator} `, print("typeAnnotation"));
          const parent = path.getParentNode();
          if (isCallExpression(parent) && parent.callee === node || isMemberExpression(parent) && parent.object === node) {
            return group([indent([softline, ...parts]), softline]);
          }
          return parts;
        }
        case "TSArrayType":
          return [print("elementType"), "[]"];
        case "TSPropertySignature": {
          if (node.readonly) {
            parts.push("readonly ");
          }
          parts.push(printPropertyKey(path, options, print), printOptionalToken(path));
          if (node.typeAnnotation) {
            parts.push(": ", print("typeAnnotation"));
          }
          if (node.initializer) {
            parts.push(" = ", print("initializer"));
          }
          return parts;
        }
        case "TSParameterProperty":
          if (node.accessibility) {
            parts.push(node.accessibility + " ");
          }
          if (node.export) {
            parts.push("export ");
          }
          if (node.static) {
            parts.push("static ");
          }
          if (node.override) {
            parts.push("override ");
          }
          if (node.readonly) {
            parts.push("readonly ");
          }
          parts.push(print("parameter"));
          return parts;
        case "TSTypeQuery":
          return ["typeof ", print("exprName"), print("typeParameters")];
        case "TSIndexSignature": {
          const parent = path.getParentNode();
          const trailingComma = node.parameters.length > 1 ? ifBreak(shouldPrintComma(options) ? "," : "") : "";
          const parametersGroup = group([indent([softline, join2([", ", softline], path.map(print, "parameters"))]), trailingComma, softline]);
          return [node.export ? "export " : "", node.accessibility ? [node.accessibility, " "] : "", node.static ? "static " : "", node.readonly ? "readonly " : "", node.declare ? "declare " : "", "[", node.parameters ? parametersGroup : "", node.typeAnnotation ? "]: " : "]", node.typeAnnotation ? print("typeAnnotation") : "", parent.type === "ClassBody" ? semi : ""];
        }
        case "TSTypePredicate":
          return [node.asserts ? "asserts " : "", print("parameterName"), node.typeAnnotation ? [" is ", print("typeAnnotation")] : ""];
        case "TSNonNullExpression":
          return [print("expression"), "!"];
        case "TSImportType":
          return [!node.isTypeOf ? "" : "typeof ", "import(", print(node.parameter ? "parameter" : "argument"), ")", !node.qualifier ? "" : [".", print("qualifier")], printTypeParameters(path, options, print, "typeParameters")];
        case "TSLiteralType":
          return print("literal");
        case "TSIndexedAccessType":
          return printIndexedAccessType(path, options, print);
        case "TSConstructSignatureDeclaration":
        case "TSCallSignatureDeclaration":
        case "TSConstructorType": {
          if (node.type === "TSConstructorType" && node.abstract) {
            parts.push("abstract ");
          }
          if (node.type !== "TSCallSignatureDeclaration") {
            parts.push("new ");
          }
          parts.push(group(printFunctionParameters(path, print, options, false, true)));
          if (node.returnType || node.typeAnnotation) {
            const isType = node.type === "TSConstructorType";
            parts.push(isType ? " => " : ": ", print("returnType"), print("typeAnnotation"));
          }
          return parts;
        }
        case "TSTypeOperator":
          return [node.operator, " ", print("typeAnnotation")];
        case "TSMappedType": {
          const shouldBreak = hasNewlineInRange(options.originalText, locStart(node), locEnd(node));
          return group(["{", indent([options.bracketSpacing ? line : softline, print("typeParameter"), node.optional ? getTypeScriptMappedTypeModifier(node.optional, "?") : "", node.typeAnnotation ? ": " : "", print("typeAnnotation"), ifBreak(semi)]), printDanglingComments(path, options, true), options.bracketSpacing ? line : softline, "}"], {
            shouldBreak
          });
        }
        case "TSMethodSignature": {
          const kind = node.kind && node.kind !== "method" ? `${node.kind} ` : "";
          parts.push(node.accessibility ? [node.accessibility, " "] : "", kind, node.export ? "export " : "", node.static ? "static " : "", node.readonly ? "readonly " : "", node.abstract ? "abstract " : "", node.declare ? "declare " : "", node.computed ? "[" : "", print("key"), node.computed ? "]" : "", printOptionalToken(path));
          const parametersDoc = printFunctionParameters(path, print, options, false, true);
          const returnTypePropertyName = node.returnType ? "returnType" : "typeAnnotation";
          const returnTypeNode = node[returnTypePropertyName];
          const returnTypeDoc = returnTypeNode ? print(returnTypePropertyName) : "";
          const shouldGroupParameters = shouldGroupFunctionParameters(node, returnTypeDoc);
          parts.push(shouldGroupParameters ? group(parametersDoc) : parametersDoc);
          if (returnTypeNode) {
            parts.push(": ", group(returnTypeDoc));
          }
          return group(parts);
        }
        case "TSNamespaceExportDeclaration":
          parts.push("export as namespace ", print("id"));
          if (options.semi) {
            parts.push(";");
          }
          return group(parts);
        case "TSEnumDeclaration":
          if (node.declare) {
            parts.push("declare ");
          }
          if (node.modifiers) {
            parts.push(printTypeScriptModifiers(path, options, print));
          }
          if (node.const) {
            parts.push("const ");
          }
          parts.push("enum ", print("id"), " ");
          if (node.members.length === 0) {
            parts.push(group(["{", printDanglingComments(path, options), softline, "}"]));
          } else {
            parts.push(group(["{", indent([hardline, printArrayItems(path, options, "members", print), shouldPrintComma(options, "es5") ? "," : ""]), printDanglingComments(path, options, true), hardline, "}"]));
          }
          return parts;
        case "TSEnumMember":
          if (node.computed) {
            parts.push("[", print("id"), "]");
          } else {
            parts.push(print("id"));
          }
          if (node.initializer) {
            parts.push(" = ", print("initializer"));
          }
          return parts;
        case "TSImportEqualsDeclaration":
          if (node.isExport) {
            parts.push("export ");
          }
          parts.push("import ");
          if (node.importKind && node.importKind !== "value") {
            parts.push(node.importKind, " ");
          }
          parts.push(print("id"), " = ", print("moduleReference"));
          if (options.semi) {
            parts.push(";");
          }
          return group(parts);
        case "TSExternalModuleReference":
          return ["require(", print("expression"), ")"];
        case "TSModuleDeclaration": {
          const parent = path.getParentNode();
          const isExternalModule = isStringLiteral(node.id);
          const parentIsDeclaration = parent.type === "TSModuleDeclaration";
          const bodyIsDeclaration = node.body && node.body.type === "TSModuleDeclaration";
          if (parentIsDeclaration) {
            parts.push(".");
          } else {
            if (node.declare) {
              parts.push("declare ");
            }
            parts.push(printTypeScriptModifiers(path, options, print));
            const textBetweenNodeAndItsId = options.originalText.slice(locStart(node), locStart(node.id));
            const isGlobalDeclaration = node.id.type === "Identifier" && node.id.name === "global" && !/namespace|module/.test(textBetweenNodeAndItsId);
            if (!isGlobalDeclaration) {
              parts.push(isExternalModule || /(?:^|\s)module(?:\s|$)/.test(textBetweenNodeAndItsId) ? "module " : "namespace ");
            }
          }
          parts.push(print("id"));
          if (bodyIsDeclaration) {
            parts.push(print("body"));
          } else if (node.body) {
            parts.push(" ", group(print("body")));
          } else {
            parts.push(semi);
          }
          return parts;
        }
        case "TSConditionalType":
          return printTernary(path, options, print);
        case "TSInferType":
          return ["infer", " ", print("typeParameter")];
        case "TSIntersectionType":
          return printIntersectionType(path, options, print);
        case "TSUnionType":
          return printUnionType(path, options, print);
        case "TSFunctionType":
          return printFunctionType(path, options, print);
        case "TSTupleType":
          return printTupleType(path, options, print);
        case "TSTypeReference":
          return [print("typeName"), printTypeParameters(path, options, print, "typeParameters")];
        case "TSTypeAnnotation":
          return print("typeAnnotation");
        case "TSEmptyBodyFunctionExpression":
          return printMethodInternal(path, options, print);
        case "TSJSDocAllType":
          return "*";
        case "TSJSDocUnknownType":
          return "?";
        case "TSJSDocNullableType":
          return printJSDocType(path, print, "?");
        case "TSJSDocNonNullableType":
          return printJSDocType(path, print, "!");
        case "TSInstantiationExpression":
          return [print("expression"), print("typeParameters")];
        default:
          throw new Error(`Unknown TypeScript node type: ${JSON.stringify(node.type)}.`);
      }
    }
    module.exports = {
      printTypescript
    };
  }
});
var require_comment = __commonJS2({
  "src/language-js/print/comment.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      hasNewline
    } = require_util();
    var {
      builders: {
        join: join2,
        hardline
      },
      utils: {
        replaceTextEndOfLine
      }
    } = require_document();
    var {
      isLineComment
    } = require_utils3();
    var {
      locStart,
      locEnd
    } = require_loc();
    var isBlockComment = require_is_block_comment();
    function printComment(commentPath, options) {
      const comment = commentPath.getValue();
      if (isLineComment(comment)) {
        return options.originalText.slice(locStart(comment), locEnd(comment)).trimEnd();
      }
      if (isBlockComment(comment)) {
        if (isIndentableBlockComment(comment)) {
          const printed = printIndentableBlockComment(comment);
          if (comment.trailing && !hasNewline(options.originalText, locStart(comment), {
            backwards: true
          })) {
            return [hardline, printed];
          }
          return printed;
        }
        const commentEnd = locEnd(comment);
        const isInsideFlowComment = options.originalText.slice(commentEnd - 3, commentEnd) === "*-/";
        return ["/*", replaceTextEndOfLine(comment.value), isInsideFlowComment ? "*-/" : "*/"];
      }
      throw new Error("Not a comment: " + JSON.stringify(comment));
    }
    function isIndentableBlockComment(comment) {
      const lines = `*${comment.value}*`.split("\n");
      return lines.length > 1 && lines.every((line) => line.trim()[0] === "*");
    }
    function printIndentableBlockComment(comment) {
      const lines = comment.value.split("\n");
      return ["/*", join2(hardline, lines.map((line, index) => index === 0 ? line.trimEnd() : " " + (index < lines.length - 1 ? line.trim() : line.trimStart()))), "*/"];
    }
    module.exports = {
      printComment
    };
  }
});
var require_literal = __commonJS2({
  "src/language-js/print/literal.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      printString,
      printNumber
    } = require_util();
    var {
      replaceTextEndOfLine
    } = require_doc_utils();
    var {
      printDirective
    } = require_misc();
    function printLiteral(path, options) {
      const node = path.getNode();
      switch (node.type) {
        case "RegExpLiteral":
          return printRegex(node);
        case "BigIntLiteral":
          return printBigInt(node.bigint || node.extra.raw);
        case "NumericLiteral":
          return printNumber(node.extra.raw);
        case "StringLiteral":
          return replaceTextEndOfLine(printString(node.extra.raw, options));
        case "NullLiteral":
          return "null";
        case "BooleanLiteral":
          return String(node.value);
        case "DecimalLiteral":
          return printNumber(node.value) + "m";
        case "Literal": {
          if (node.regex) {
            return printRegex(node.regex);
          }
          if (node.bigint) {
            return printBigInt(node.raw);
          }
          if (node.decimal) {
            return printNumber(node.decimal) + "m";
          }
          const {
            value
          } = node;
          if (typeof value === "number") {
            return printNumber(node.raw);
          }
          if (typeof value === "string") {
            return isDirective(path) ? printDirective(node.raw, options) : replaceTextEndOfLine(printString(node.raw, options));
          }
          return String(value);
        }
      }
    }
    function isDirective(path) {
      if (path.getName() !== "expression") {
        return;
      }
      const parent = path.getParentNode();
      return parent.type === "ExpressionStatement" && parent.directive;
    }
    function printBigInt(raw) {
      return raw.toLowerCase();
    }
    function printRegex(_ref67) {
      let {
        pattern,
        flags
      } = _ref67;
      flags = [...flags].sort().join("");
      return `/${pattern}/${flags}`;
    }
    module.exports = {
      printLiteral
    };
  }
});
var require_printer_estree = __commonJS2({
  "src/language-js/printer-estree.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      printDanglingComments
    } = require_comments();
    var {
      hasNewline
    } = require_util();
    var {
      builders: {
        join: join2,
        line,
        hardline,
        softline,
        group,
        indent
      },
      utils: {
        replaceTextEndOfLine
      }
    } = require_document();
    var embed = require_embed();
    var clean = require_clean();
    var {
      insertPragma
    } = require_pragma();
    var handleComments = require_comments2();
    var pathNeedsParens = require_needs_parens();
    var preprocess = require_print_preprocess();
    var {
      hasFlowShorthandAnnotationComment,
      hasComment,
      CommentCheckFlags,
      isTheOnlyJsxElementInMarkdown,
      isLineComment,
      isNextLineEmpty,
      needsHardlineAfterDanglingComment,
      hasIgnoreComment,
      isCallExpression,
      isMemberExpression,
      markerForIfWithoutBlockAndSameLineComment
    } = require_utils3();
    var {
      locStart,
      locEnd
    } = require_loc();
    var isBlockComment = require_is_block_comment();
    var {
      printHtmlBinding,
      isVueEventBindingExpression
    } = require_html_binding();
    var {
      printAngular
    } = require_angular();
    var {
      printJsx,
      hasJsxIgnoreComment
    } = require_jsx();
    var {
      printFlow
    } = require_flow();
    var {
      printTypescript
    } = require_typescript();
    var {
      printOptionalToken,
      printBindExpressionCallee,
      printTypeAnnotation,
      adjustClause,
      printRestSpread,
      printDefiniteToken,
      printDirective
    } = require_misc();
    var {
      printImportDeclaration,
      printExportDeclaration,
      printExportAllDeclaration,
      printModuleSpecifier
    } = require_module();
    var {
      printTernary
    } = require_ternary();
    var {
      printTemplateLiteral
    } = require_template_literal();
    var {
      printArray
    } = require_array3();
    var {
      printObject
    } = require_object();
    var {
      printClass,
      printClassMethod,
      printClassProperty
    } = require_class();
    var {
      printProperty
    } = require_property();
    var {
      printFunction,
      printArrowFunction,
      printMethod,
      printReturnStatement,
      printThrowStatement
    } = require_function();
    var {
      printCallExpression
    } = require_call_expression();
    var {
      printVariableDeclarator,
      printAssignmentExpression
    } = require_assignment();
    var {
      printBinaryishExpression
    } = require_binaryish();
    var {
      printSwitchCaseConsequent
    } = require_statement();
    var {
      printMemberExpression
    } = require_member();
    var {
      printBlock,
      printBlockBody
    } = require_block();
    var {
      printComment
    } = require_comment();
    var {
      printLiteral
    } = require_literal();
    var {
      printDecorators
    } = require_decorators();
    function genericPrint(path, options, print, args) {
      const printed = printPathNoParens(path, options, print, args);
      if (!printed) {
        return "";
      }
      const node = path.getValue();
      const {
        type: type2
      } = node;
      if (type2 === "ClassMethod" || type2 === "ClassPrivateMethod" || type2 === "ClassProperty" || type2 === "ClassAccessorProperty" || type2 === "AccessorProperty" || type2 === "TSAbstractAccessorProperty" || type2 === "PropertyDefinition" || type2 === "TSAbstractPropertyDefinition" || type2 === "ClassPrivateProperty" || type2 === "MethodDefinition" || type2 === "TSAbstractMethodDefinition" || type2 === "TSDeclareMethod") {
        return printed;
      }
      let parts = [printed];
      const printedDecorators = printDecorators(path, options, print);
      const isClassExpressionWithDecorators = node.type === "ClassExpression" && printedDecorators;
      if (printedDecorators) {
        parts = [...printedDecorators, printed];
        if (!isClassExpressionWithDecorators) {
          return group(parts);
        }
      }
      const needsParens = pathNeedsParens(path, options);
      if (!needsParens) {
        if (args && args.needsSemi) {
          parts.unshift(";");
        }
        if (parts.length === 1 && parts[0] === printed) {
          return printed;
        }
        return parts;
      }
      if (isClassExpressionWithDecorators) {
        parts = [indent([line, ...parts])];
      }
      parts.unshift("(");
      if (args && args.needsSemi) {
        parts.unshift(";");
      }
      if (hasFlowShorthandAnnotationComment(node)) {
        const [comment] = node.trailingComments;
        parts.push(" /*", comment.value.trimStart(), "*/");
        comment.printed = true;
      }
      if (isClassExpressionWithDecorators) {
        parts.push(line);
      }
      parts.push(")");
      return parts;
    }
    function printPathNoParens(path, options, print, args) {
      const node = path.getValue();
      const semi = options.semi ? ";" : "";
      if (!node) {
        return "";
      }
      if (typeof node === "string") {
        return node;
      }
      for (const printer of [printLiteral, printHtmlBinding, printAngular, printJsx, printFlow, printTypescript]) {
        const printed = printer(path, options, print);
        if (typeof printed !== "undefined") {
          return printed;
        }
      }
      let parts = [];
      switch (node.type) {
        case "JsExpressionRoot":
          return print("node");
        case "JsonRoot":
          return [print("node"), hardline];
        case "File":
          if (node.program && node.program.interpreter) {
            parts.push(print(["program", "interpreter"]));
          }
          parts.push(print("program"));
          return parts;
        case "Program":
          return printBlockBody(path, options, print);
        case "EmptyStatement":
          return "";
        case "ExpressionStatement": {
          if (options.parser === "__vue_event_binding" || options.parser === "__vue_ts_event_binding") {
            const parent = path.getParentNode();
            if (parent.type === "Program" && parent.body.length === 1 && parent.body[0] === node) {
              return [print("expression"), isVueEventBindingExpression(node.expression) ? ";" : ""];
            }
          }
          const danglingComment = printDanglingComments(path, options, true, (_ref68) => {
            let {
              marker
            } = _ref68;
            return marker === markerForIfWithoutBlockAndSameLineComment;
          });
          return [print("expression"), isTheOnlyJsxElementInMarkdown(options, path) ? "" : semi, danglingComment ? [" ", danglingComment] : ""];
        }
        case "ParenthesizedExpression": {
          const shouldHug = !hasComment(node.expression) && (node.expression.type === "ObjectExpression" || node.expression.type === "ArrayExpression");
          if (shouldHug) {
            return ["(", print("expression"), ")"];
          }
          return group(["(", indent([softline, print("expression")]), softline, ")"]);
        }
        case "AssignmentExpression":
          return printAssignmentExpression(path, options, print);
        case "VariableDeclarator":
          return printVariableDeclarator(path, options, print);
        case "BinaryExpression":
        case "LogicalExpression":
          return printBinaryishExpression(path, options, print);
        case "AssignmentPattern":
          return [print("left"), " = ", print("right")];
        case "OptionalMemberExpression":
        case "MemberExpression": {
          return printMemberExpression(path, options, print);
        }
        case "MetaProperty":
          return [print("meta"), ".", print("property")];
        case "BindExpression":
          if (node.object) {
            parts.push(print("object"));
          }
          parts.push(group(indent([softline, printBindExpressionCallee(path, options, print)])));
          return parts;
        case "Identifier": {
          return [node.name, printOptionalToken(path), printDefiniteToken(path), printTypeAnnotation(path, options, print)];
        }
        case "V8IntrinsicIdentifier":
          return ["%", node.name];
        case "SpreadElement":
        case "SpreadElementPattern":
        case "SpreadProperty":
        case "SpreadPropertyPattern":
        case "RestElement":
          return printRestSpread(path, options, print);
        case "FunctionDeclaration":
        case "FunctionExpression":
          return printFunction(path, print, options, args);
        case "ArrowFunctionExpression":
          return printArrowFunction(path, options, print, args);
        case "YieldExpression":
          parts.push("yield");
          if (node.delegate) {
            parts.push("*");
          }
          if (node.argument) {
            parts.push(" ", print("argument"));
          }
          return parts;
        case "AwaitExpression": {
          parts.push("await");
          if (node.argument) {
            parts.push(" ", print("argument"));
            const parent = path.getParentNode();
            if (isCallExpression(parent) && parent.callee === node || isMemberExpression(parent) && parent.object === node) {
              parts = [indent([softline, ...parts]), softline];
              const parentAwaitOrBlock = path.findAncestor((node2) => node2.type === "AwaitExpression" || node2.type === "BlockStatement");
              if (!parentAwaitOrBlock || parentAwaitOrBlock.type !== "AwaitExpression") {
                return group(parts);
              }
            }
          }
          return parts;
        }
        case "ExportDefaultDeclaration":
        case "ExportNamedDeclaration":
          return printExportDeclaration(path, options, print);
        case "ExportAllDeclaration":
          return printExportAllDeclaration(path, options, print);
        case "ImportDeclaration":
          return printImportDeclaration(path, options, print);
        case "ImportSpecifier":
        case "ExportSpecifier":
        case "ImportNamespaceSpecifier":
        case "ExportNamespaceSpecifier":
        case "ImportDefaultSpecifier":
        case "ExportDefaultSpecifier":
          return printModuleSpecifier(path, options, print);
        case "ImportAttribute":
          return [print("key"), ": ", print("value")];
        case "Import":
          return "import";
        case "BlockStatement":
        case "StaticBlock":
        case "ClassBody":
          return printBlock(path, options, print);
        case "ThrowStatement":
          return printThrowStatement(path, options, print);
        case "ReturnStatement":
          return printReturnStatement(path, options, print);
        case "NewExpression":
        case "ImportExpression":
        case "OptionalCallExpression":
        case "CallExpression":
          return printCallExpression(path, options, print);
        case "ObjectExpression":
        case "ObjectPattern":
        case "RecordExpression":
          return printObject(path, options, print);
        case "ObjectProperty":
        case "Property":
          if (node.method || node.kind === "get" || node.kind === "set") {
            return printMethod(path, options, print);
          }
          return printProperty(path, options, print);
        case "ObjectMethod":
          return printMethod(path, options, print);
        case "Decorator":
          return ["@", print("expression")];
        case "ArrayExpression":
        case "ArrayPattern":
        case "TupleExpression":
          return printArray(path, options, print);
        case "SequenceExpression": {
          const parent = path.getParentNode(0);
          if (parent.type === "ExpressionStatement" || parent.type === "ForStatement") {
            const parts2 = [];
            path.each((expressionPath, index) => {
              if (index === 0) {
                parts2.push(print());
              } else {
                parts2.push(",", indent([line, print()]));
              }
            }, "expressions");
            return group(parts2);
          }
          return group(join2([",", line], path.map(print, "expressions")));
        }
        case "ThisExpression":
          return "this";
        case "Super":
          return "super";
        case "Directive":
          return [print("value"), semi];
        case "DirectiveLiteral":
          return printDirective(node.extra.raw, options);
        case "UnaryExpression":
          parts.push(node.operator);
          if (/[a-z]$/.test(node.operator)) {
            parts.push(" ");
          }
          if (hasComment(node.argument)) {
            parts.push(group(["(", indent([softline, print("argument")]), softline, ")"]));
          } else {
            parts.push(print("argument"));
          }
          return parts;
        case "UpdateExpression":
          parts.push(print("argument"), node.operator);
          if (node.prefix) {
            parts.reverse();
          }
          return parts;
        case "ConditionalExpression":
          return printTernary(path, options, print);
        case "VariableDeclaration": {
          const printed = path.map(print, "declarations");
          const parentNode = path.getParentNode();
          const isParentForLoop = parentNode.type === "ForStatement" || parentNode.type === "ForInStatement" || parentNode.type === "ForOfStatement";
          const hasValue = node.declarations.some((decl) => decl.init);
          let firstVariable;
          if (printed.length === 1 && !hasComment(node.declarations[0])) {
            firstVariable = printed[0];
          } else if (printed.length > 0) {
            firstVariable = indent(printed[0]);
          }
          parts = [node.declare ? "declare " : "", node.kind, firstVariable ? [" ", firstVariable] : "", indent(printed.slice(1).map((p) => [",", hasValue && !isParentForLoop ? hardline : line, p]))];
          if (!(isParentForLoop && parentNode.body !== node)) {
            parts.push(semi);
          }
          return group(parts);
        }
        case "WithStatement":
          return group(["with (", print("object"), ")", adjustClause(node.body, print("body"))]);
        case "IfStatement": {
          const con = adjustClause(node.consequent, print("consequent"));
          const opening = group(["if (", group([indent([softline, print("test")]), softline]), ")", con]);
          parts.push(opening);
          if (node.alternate) {
            const commentOnOwnLine = hasComment(node.consequent, CommentCheckFlags.Trailing | CommentCheckFlags.Line) || needsHardlineAfterDanglingComment(node);
            const elseOnSameLine = node.consequent.type === "BlockStatement" && !commentOnOwnLine;
            parts.push(elseOnSameLine ? " " : hardline);
            if (hasComment(node, CommentCheckFlags.Dangling)) {
              parts.push(printDanglingComments(path, options, true), commentOnOwnLine ? hardline : " ");
            }
            parts.push("else", group(adjustClause(node.alternate, print("alternate"), node.alternate.type === "IfStatement")));
          }
          return parts;
        }
        case "ForStatement": {
          const body = adjustClause(node.body, print("body"));
          const dangling = printDanglingComments(path, options, true);
          const printedComments = dangling ? [dangling, softline] : "";
          if (!node.init && !node.test && !node.update) {
            return [printedComments, group(["for (;;)", body])];
          }
          return [printedComments, group(["for (", group([indent([softline, print("init"), ";", line, print("test"), ";", line, print("update")]), softline]), ")", body])];
        }
        case "WhileStatement":
          return group(["while (", group([indent([softline, print("test")]), softline]), ")", adjustClause(node.body, print("body"))]);
        case "ForInStatement":
          return group(["for (", print("left"), " in ", print("right"), ")", adjustClause(node.body, print("body"))]);
        case "ForOfStatement":
          return group(["for", node.await ? " await" : "", " (", print("left"), " of ", print("right"), ")", adjustClause(node.body, print("body"))]);
        case "DoWhileStatement": {
          const clause = adjustClause(node.body, print("body"));
          const doBody = group(["do", clause]);
          parts = [doBody];
          if (node.body.type === "BlockStatement") {
            parts.push(" ");
          } else {
            parts.push(hardline);
          }
          parts.push("while (", group([indent([softline, print("test")]), softline]), ")", semi);
          return parts;
        }
        case "DoExpression":
          return [node.async ? "async " : "", "do ", print("body")];
        case "BreakStatement":
          parts.push("break");
          if (node.label) {
            parts.push(" ", print("label"));
          }
          parts.push(semi);
          return parts;
        case "ContinueStatement":
          parts.push("continue");
          if (node.label) {
            parts.push(" ", print("label"));
          }
          parts.push(semi);
          return parts;
        case "LabeledStatement":
          if (node.body.type === "EmptyStatement") {
            return [print("label"), ":;"];
          }
          return [print("label"), ": ", print("body")];
        case "TryStatement":
          return ["try ", print("block"), node.handler ? [" ", print("handler")] : "", node.finalizer ? [" finally ", print("finalizer")] : ""];
        case "CatchClause":
          if (node.param) {
            const parameterHasComments = hasComment(node.param, (comment) => !isBlockComment(comment) || comment.leading && hasNewline(options.originalText, locEnd(comment)) || comment.trailing && hasNewline(options.originalText, locStart(comment), {
              backwards: true
            }));
            const param = print("param");
            return ["catch ", parameterHasComments ? ["(", indent([softline, param]), softline, ") "] : ["(", param, ") "], print("body")];
          }
          return ["catch ", print("body")];
        case "SwitchStatement":
          return [group(["switch (", indent([softline, print("discriminant")]), softline, ")"]), " {", node.cases.length > 0 ? indent([hardline, join2(hardline, path.map((casePath, index, cases) => {
            const caseNode = casePath.getValue();
            return [print(), index !== cases.length - 1 && isNextLineEmpty(caseNode, options) ? hardline : ""];
          }, "cases"))]) : "", hardline, "}"];
        case "SwitchCase": {
          if (node.test) {
            parts.push("case ", print("test"), ":");
          } else {
            parts.push("default:");
          }
          if (hasComment(node, CommentCheckFlags.Dangling)) {
            parts.push(" ", printDanglingComments(path, options, true));
          }
          const consequent = node.consequent.filter((node2) => node2.type !== "EmptyStatement");
          if (consequent.length > 0) {
            const cons = printSwitchCaseConsequent(path, options, print);
            parts.push(consequent.length === 1 && consequent[0].type === "BlockStatement" ? [" ", cons] : indent([hardline, cons]));
          }
          return parts;
        }
        case "DebuggerStatement":
          return ["debugger", semi];
        case "ClassDeclaration":
        case "ClassExpression":
          return printClass(path, options, print);
        case "ClassMethod":
        case "ClassPrivateMethod":
        case "MethodDefinition":
          return printClassMethod(path, options, print);
        case "ClassProperty":
        case "PropertyDefinition":
        case "ClassPrivateProperty":
        case "ClassAccessorProperty":
        case "AccessorProperty":
          return printClassProperty(path, options, print);
        case "TemplateElement":
          return replaceTextEndOfLine(node.value.raw);
        case "TemplateLiteral":
          return printTemplateLiteral(path, print, options);
        case "TaggedTemplateExpression":
          return [print("tag"), print("typeParameters"), print("quasi")];
        case "PrivateIdentifier":
          return ["#", print("name")];
        case "PrivateName":
          return ["#", print("id")];
        case "InterpreterDirective":
          parts.push("#!", node.value, hardline);
          if (isNextLineEmpty(node, options)) {
            parts.push(hardline);
          }
          return parts;
        case "TopicReference":
          return "%";
        case "ArgumentPlaceholder":
          return "?";
        case "ModuleExpression": {
          parts.push("module {");
          const printed = print("body");
          if (printed) {
            parts.push(indent([hardline, printed]), hardline);
          }
          parts.push("}");
          return parts;
        }
        default:
          throw new Error("unknown type: " + JSON.stringify(node.type));
      }
    }
    function canAttachComment(node) {
      return node.type && !isBlockComment(node) && !isLineComment(node) && node.type !== "EmptyStatement" && node.type !== "TemplateElement" && node.type !== "Import" && node.type !== "TSEmptyBodyFunctionExpression";
    }
    module.exports = {
      preprocess,
      print: genericPrint,
      embed,
      insertPragma,
      massageAstNode: clean,
      hasPrettierIgnore(path) {
        return hasIgnoreComment(path) || hasJsxIgnoreComment(path);
      },
      willPrintOwnComments: handleComments.willPrintOwnComments,
      canAttachComment,
      printComment,
      isBlockComment,
      handleComments: {
        avoidAstMutation: true,
        ownLine: handleComments.handleOwnLineComment,
        endOfLine: handleComments.handleEndOfLineComment,
        remaining: handleComments.handleRemainingComment
      },
      getCommentChildNodes: handleComments.getCommentChildNodes
    };
  }
});
var require_printer_estree_json = __commonJS2({
  "src/language-js/printer-estree-json.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      builders: {
        hardline,
        indent,
        join: join2
      }
    } = require_document();
    var preprocess = require_print_preprocess();
    function genericPrint(path, options, print) {
      const node = path.getValue();
      switch (node.type) {
        case "JsonRoot":
          return [print("node"), hardline];
        case "ArrayExpression": {
          if (node.elements.length === 0) {
            return "[]";
          }
          const printed = path.map(() => path.getValue() === null ? "null" : print(), "elements");
          return ["[", indent([hardline, join2([",", hardline], printed)]), hardline, "]"];
        }
        case "ObjectExpression":
          return node.properties.length === 0 ? "{}" : ["{", indent([hardline, join2([",", hardline], path.map(print, "properties"))]), hardline, "}"];
        case "ObjectProperty":
          return [print("key"), ": ", print("value")];
        case "UnaryExpression":
          return [node.operator === "+" ? "" : node.operator, print("argument")];
        case "NullLiteral":
          return "null";
        case "BooleanLiteral":
          return node.value ? "true" : "false";
        case "StringLiteral":
          return JSON.stringify(node.value);
        case "NumericLiteral":
          return isObjectKey(path) ? JSON.stringify(String(node.value)) : JSON.stringify(node.value);
        case "Identifier":
          return isObjectKey(path) ? JSON.stringify(node.name) : node.name;
        case "TemplateLiteral":
          return print(["quasis", 0]);
        case "TemplateElement":
          return JSON.stringify(node.value.cooked);
        default:
          throw new Error("unknown type: " + JSON.stringify(node.type));
      }
    }
    function isObjectKey(path) {
      return path.getName() === "key" && path.getParentNode().type === "ObjectProperty";
    }
    var ignoredProperties = /* @__PURE__ */ new Set(["start", "end", "extra", "loc", "comments", "leadingComments", "trailingComments", "innerComments", "errors", "range", "tokens"]);
    function clean(node, newNode) {
      const {
        type: type2
      } = node;
      if (type2 === "ObjectProperty") {
        const {
          key
        } = node;
        if (key.type === "Identifier") {
          newNode.key = {
            type: "StringLiteral",
            value: key.name
          };
        } else if (key.type === "NumericLiteral") {
          newNode.key = {
            type: "StringLiteral",
            value: String(key.value)
          };
        }
        return;
      }
      if (type2 === "UnaryExpression" && node.operator === "+") {
        return newNode.argument;
      }
      if (type2 === "ArrayExpression") {
        for (const [index, element] of node.elements.entries()) {
          if (element === null) {
            newNode.elements.splice(index, 0, {
              type: "NullLiteral"
            });
          }
        }
        return;
      }
      if (type2 === "TemplateLiteral") {
        return {
          type: "StringLiteral",
          value: node.quasis[0].value.cooked
        };
      }
    }
    clean.ignoredProperties = ignoredProperties;
    module.exports = {
      preprocess,
      print: genericPrint,
      massageAstNode: clean
    };
  }
});
var require_common_options = __commonJS2({
  "src/common/common-options.js"(exports, module) {
    "use strict";
    init_define_process();
    var CATEGORY_COMMON = "Common";
    module.exports = {
      bracketSpacing: {
        since: "0.0.0",
        category: CATEGORY_COMMON,
        type: "boolean",
        default: true,
        description: "Print spaces between brackets.",
        oppositeDescription: "Do not print spaces between brackets."
      },
      singleQuote: {
        since: "0.0.0",
        category: CATEGORY_COMMON,
        type: "boolean",
        default: false,
        description: "Use single quotes instead of double quotes."
      },
      proseWrap: {
        since: "1.8.2",
        category: CATEGORY_COMMON,
        type: "choice",
        default: [{
          since: "1.8.2",
          value: true
        }, {
          since: "1.9.0",
          value: "preserve"
        }],
        description: "How to wrap prose.",
        choices: [{
          since: "1.9.0",
          value: "always",
          description: "Wrap prose if it exceeds the print width."
        }, {
          since: "1.9.0",
          value: "never",
          description: "Do not wrap prose."
        }, {
          since: "1.9.0",
          value: "preserve",
          description: "Wrap prose as-is."
        }]
      },
      bracketSameLine: {
        since: "2.4.0",
        category: CATEGORY_COMMON,
        type: "boolean",
        default: false,
        description: "Put > of opening tags on the last line instead of on a new line."
      },
      singleAttributePerLine: {
        since: "2.6.0",
        category: CATEGORY_COMMON,
        type: "boolean",
        default: false,
        description: "Enforce single attribute per line in HTML, Vue and JSX."
      }
    };
  }
});
var require_options2 = __commonJS2({
  "src/language-js/options.js"(exports, module) {
    "use strict";
    init_define_process();
    var commonOptions = require_common_options();
    var CATEGORY_JAVASCRIPT = "JavaScript";
    module.exports = {
      arrowParens: {
        since: "1.9.0",
        category: CATEGORY_JAVASCRIPT,
        type: "choice",
        default: [{
          since: "1.9.0",
          value: "avoid"
        }, {
          since: "2.0.0",
          value: "always"
        }],
        description: "Include parentheses around a sole arrow function parameter.",
        choices: [{
          value: "always",
          description: "Always include parens. Example: `(x) => x`"
        }, {
          value: "avoid",
          description: "Omit parens when possible. Example: `x => x`"
        }]
      },
      bracketSameLine: commonOptions.bracketSameLine,
      bracketSpacing: commonOptions.bracketSpacing,
      jsxBracketSameLine: {
        since: "0.17.0",
        category: CATEGORY_JAVASCRIPT,
        type: "boolean",
        description: "Put > on the last line instead of at a new line.",
        deprecated: "2.4.0"
      },
      semi: {
        since: "1.0.0",
        category: CATEGORY_JAVASCRIPT,
        type: "boolean",
        default: true,
        description: "Print semicolons.",
        oppositeDescription: "Do not print semicolons, except at the beginning of lines which may need them."
      },
      singleQuote: commonOptions.singleQuote,
      jsxSingleQuote: {
        since: "1.15.0",
        category: CATEGORY_JAVASCRIPT,
        type: "boolean",
        default: false,
        description: "Use single quotes in JSX."
      },
      quoteProps: {
        since: "1.17.0",
        category: CATEGORY_JAVASCRIPT,
        type: "choice",
        default: "as-needed",
        description: "Change when properties in objects are quoted.",
        choices: [{
          value: "as-needed",
          description: "Only add quotes around object properties where required."
        }, {
          value: "consistent",
          description: "If at least one property in an object requires quotes, quote all properties."
        }, {
          value: "preserve",
          description: "Respect the input use of quotes in object properties."
        }]
      },
      trailingComma: {
        since: "0.0.0",
        category: CATEGORY_JAVASCRIPT,
        type: "choice",
        default: [{
          since: "0.0.0",
          value: false
        }, {
          since: "0.19.0",
          value: "none"
        }, {
          since: "2.0.0",
          value: "es5"
        }],
        description: "Print trailing commas wherever possible when multi-line.",
        choices: [{
          value: "es5",
          description: "Trailing commas where valid in ES5 (objects, arrays, etc.)"
        }, {
          value: "none",
          description: "No trailing commas."
        }, {
          value: "all",
          description: "Trailing commas wherever possible (including function arguments)."
        }]
      },
      singleAttributePerLine: commonOptions.singleAttributePerLine
    };
  }
});
var require_parsers = __commonJS2({
  "src/language-js/parse/parsers.js"() {
    init_define_process();
  }
});
var require_JavaScript = __commonJS2({
  "node_modules/linguist-languages/data/JavaScript.json"(exports, module) {
    module.exports = {
      name: "JavaScript",
      type: "programming",
      tmScope: "source.js",
      aceMode: "javascript",
      codemirrorMode: "javascript",
      codemirrorMimeType: "text/javascript",
      color: "#f1e05a",
      aliases: ["js", "node"],
      extensions: [".js", "._js", ".bones", ".cjs", ".es", ".es6", ".frag", ".gs", ".jake", ".javascript", ".jsb", ".jscad", ".jsfl", ".jslib", ".jsm", ".jspre", ".jss", ".jsx", ".mjs", ".njs", ".pac", ".sjs", ".ssjs", ".xsjs", ".xsjslib"],
      filenames: ["Jakefile"],
      interpreters: ["chakra", "d8", "gjs", "js", "node", "nodejs", "qjs", "rhino", "v8", "v8-shell"],
      languageId: 183
    };
  }
});
var require_TypeScript = __commonJS2({
  "node_modules/linguist-languages/data/TypeScript.json"(exports, module) {
    module.exports = {
      name: "TypeScript",
      type: "programming",
      color: "#3178c6",
      aliases: ["ts"],
      interpreters: ["deno", "ts-node"],
      extensions: [".ts", ".cts", ".mts"],
      tmScope: "source.ts",
      aceMode: "typescript",
      codemirrorMode: "javascript",
      codemirrorMimeType: "application/typescript",
      languageId: 378
    };
  }
});
var require_TSX = __commonJS2({
  "node_modules/linguist-languages/data/TSX.json"(exports, module) {
    module.exports = {
      name: "TSX",
      type: "programming",
      color: "#3178c6",
      group: "TypeScript",
      extensions: [".tsx"],
      tmScope: "source.tsx",
      aceMode: "javascript",
      codemirrorMode: "jsx",
      codemirrorMimeType: "text/jsx",
      languageId: 94901924
    };
  }
});
var require_JSON = __commonJS2({
  "node_modules/linguist-languages/data/JSON.json"(exports, module) {
    module.exports = {
      name: "JSON",
      type: "data",
      color: "#292929",
      tmScope: "source.json",
      aceMode: "json",
      codemirrorMode: "javascript",
      codemirrorMimeType: "application/json",
      aliases: ["geojson", "jsonl", "topojson"],
      extensions: [".json", ".4DForm", ".4DProject", ".avsc", ".geojson", ".gltf", ".har", ".ice", ".JSON-tmLanguage", ".jsonl", ".mcmeta", ".tfstate", ".tfstate.backup", ".topojson", ".webapp", ".webmanifest", ".yy", ".yyp"],
      filenames: [".arcconfig", ".auto-changelog", ".c8rc", ".htmlhintrc", ".imgbotconfig", ".nycrc", ".tern-config", ".tern-project", ".watchmanconfig", "Pipfile.lock", "composer.lock", "mcmod.info"],
      languageId: 174
    };
  }
});
var require_JSON_with_Comments = __commonJS2({
  "node_modules/linguist-languages/data/JSON with Comments.json"(exports, module) {
    module.exports = {
      name: "JSON with Comments",
      type: "data",
      color: "#292929",
      group: "JSON",
      tmScope: "source.js",
      aceMode: "javascript",
      codemirrorMode: "javascript",
      codemirrorMimeType: "text/javascript",
      aliases: ["jsonc"],
      extensions: [".jsonc", ".code-snippets", ".sublime-build", ".sublime-commands", ".sublime-completions", ".sublime-keymap", ".sublime-macro", ".sublime-menu", ".sublime-mousemap", ".sublime-project", ".sublime-settings", ".sublime-theme", ".sublime-workspace", ".sublime_metrics", ".sublime_session"],
      filenames: [".babelrc", ".devcontainer.json", ".eslintrc.json", ".jscsrc", ".jshintrc", ".jslintrc", "api-extractor.json", "devcontainer.json", "jsconfig.json", "language-configuration.json", "tsconfig.json", "tslint.json"],
      languageId: 423
    };
  }
});
var require_JSON5 = __commonJS2({
  "node_modules/linguist-languages/data/JSON5.json"(exports, module) {
    module.exports = {
      name: "JSON5",
      type: "data",
      color: "#267CB9",
      extensions: [".json5"],
      tmScope: "source.js",
      aceMode: "javascript",
      codemirrorMode: "javascript",
      codemirrorMimeType: "application/json",
      languageId: 175
    };
  }
});
var require_language_js = __commonJS2({
  "src/language-js/index.js"(exports, module) {
    "use strict";
    init_define_process();
    var createLanguage = require_create_language();
    var estreePrinter = require_printer_estree();
    var estreeJsonPrinter = require_printer_estree_json();
    var options = require_options2();
    var parsers = require_parsers();
    var languages = [createLanguage(require_JavaScript(), (data) => ({
      since: "0.0.0",
      parsers: ["babel", "acorn", "espree", "meriyah", "babel-flow", "babel-ts", "flow", "typescript"],
      vscodeLanguageIds: ["javascript", "mongo"],
      interpreters: [...data.interpreters, "zx"],
      extensions: [...data.extensions.filter((extension) => extension !== ".jsx"), ".wxs"]
    })), createLanguage(require_JavaScript(), () => ({
      name: "Flow",
      since: "0.0.0",
      parsers: ["flow", "babel-flow"],
      vscodeLanguageIds: ["javascript"],
      aliases: [],
      filenames: [],
      extensions: [".js.flow"]
    })), createLanguage(require_JavaScript(), () => ({
      name: "JSX",
      since: "0.0.0",
      parsers: ["babel", "babel-flow", "babel-ts", "flow", "typescript", "espree", "meriyah"],
      vscodeLanguageIds: ["javascriptreact"],
      aliases: void 0,
      filenames: void 0,
      extensions: [".jsx"],
      group: "JavaScript",
      interpreters: void 0,
      tmScope: "source.js.jsx",
      aceMode: "javascript",
      codemirrorMode: "jsx",
      codemirrorMimeType: "text/jsx",
      color: void 0
    })), createLanguage(require_TypeScript(), () => ({
      since: "1.4.0",
      parsers: ["typescript", "babel-ts"],
      vscodeLanguageIds: ["typescript"]
    })), createLanguage(require_TSX(), () => ({
      since: "1.4.0",
      parsers: ["typescript", "babel-ts"],
      vscodeLanguageIds: ["typescriptreact"]
    })), createLanguage(require_JSON(), () => ({
      name: "JSON.stringify",
      since: "1.13.0",
      parsers: ["json-stringify"],
      vscodeLanguageIds: ["json"],
      extensions: [".importmap"],
      filenames: ["package.json", "package-lock.json", "composer.json"]
    })), createLanguage(require_JSON(), (data) => ({
      since: "1.5.0",
      parsers: ["json"],
      vscodeLanguageIds: ["json"],
      extensions: data.extensions.filter((extension) => extension !== ".jsonl")
    })), createLanguage(require_JSON_with_Comments(), (data) => ({
      since: "1.5.0",
      parsers: ["json"],
      vscodeLanguageIds: ["jsonc"],
      filenames: [...data.filenames, ".eslintrc", ".swcrc"]
    })), createLanguage(require_JSON5(), () => ({
      since: "1.13.0",
      parsers: ["json5"],
      vscodeLanguageIds: ["json5"]
    }))];
    var printers = {
      estree: estreePrinter,
      "estree-json": estreeJsonPrinter
    };
    module.exports = {
      languages,
      options,
      printers,
      parsers
    };
  }
});
var require_clean2 = __commonJS2({
  "src/language-css/clean.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      isFrontMatterNode
    } = require_util();
    var getLast = require_get_last();
    var ignoredProperties = /* @__PURE__ */ new Set(["raw", "raws", "sourceIndex", "source", "before", "after", "trailingComma"]);
    function clean(ast, newObj, parent) {
      if (isFrontMatterNode(ast) && ast.lang === "yaml") {
        delete newObj.value;
      }
      if (ast.type === "css-comment" && parent.type === "css-root" && parent.nodes.length > 0) {
        if (parent.nodes[0] === ast || isFrontMatterNode(parent.nodes[0]) && parent.nodes[1] === ast) {
          delete newObj.text;
          if (/^\*\s*@(?:format|prettier)\s*$/.test(ast.text)) {
            return null;
          }
        }
        if (parent.type === "css-root" && getLast(parent.nodes) === ast) {
          return null;
        }
      }
      if (ast.type === "value-root") {
        delete newObj.text;
      }
      if (ast.type === "media-query" || ast.type === "media-query-list" || ast.type === "media-feature-expression") {
        delete newObj.value;
      }
      if (ast.type === "css-rule") {
        delete newObj.params;
      }
      if (ast.type === "selector-combinator") {
        newObj.value = newObj.value.replace(/\s+/g, " ");
      }
      if (ast.type === "media-feature") {
        newObj.value = newObj.value.replace(/ /g, "");
      }
      if (ast.type === "value-word" && (ast.isColor && ast.isHex || ["initial", "inherit", "unset", "revert"].includes(newObj.value.replace().toLowerCase())) || ast.type === "media-feature" || ast.type === "selector-root-invalid" || ast.type === "selector-pseudo") {
        newObj.value = newObj.value.toLowerCase();
      }
      if (ast.type === "css-decl") {
        newObj.prop = newObj.prop.toLowerCase();
      }
      if (ast.type === "css-atrule" || ast.type === "css-import") {
        newObj.name = newObj.name.toLowerCase();
      }
      if (ast.type === "value-number") {
        newObj.unit = newObj.unit.toLowerCase();
      }
      if ((ast.type === "media-feature" || ast.type === "media-keyword" || ast.type === "media-type" || ast.type === "media-unknown" || ast.type === "media-url" || ast.type === "media-value" || ast.type === "selector-attribute" || ast.type === "selector-string" || ast.type === "selector-class" || ast.type === "selector-combinator" || ast.type === "value-string") && newObj.value) {
        newObj.value = cleanCSSStrings(newObj.value);
      }
      if (ast.type === "selector-attribute") {
        newObj.attribute = newObj.attribute.trim();
        if (newObj.namespace) {
          if (typeof newObj.namespace === "string") {
            newObj.namespace = newObj.namespace.trim();
            if (newObj.namespace.length === 0) {
              newObj.namespace = true;
            }
          }
        }
        if (newObj.value) {
          newObj.value = newObj.value.trim().replace(/^["']|["']$/g, "");
          delete newObj.quoted;
        }
      }
      if ((ast.type === "media-value" || ast.type === "media-type" || ast.type === "value-number" || ast.type === "selector-root-invalid" || ast.type === "selector-class" || ast.type === "selector-combinator" || ast.type === "selector-tag") && newObj.value) {
        newObj.value = newObj.value.replace(/([\d+.Ee-]+)([A-Za-z]*)/g, (match, numStr, unit) => {
          const num = Number(numStr);
          return Number.isNaN(num) ? match : num + unit.toLowerCase();
        });
      }
      if (ast.type === "selector-tag") {
        const lowercasedValue = ast.value.toLowerCase();
        if (["from", "to"].includes(lowercasedValue)) {
          newObj.value = lowercasedValue;
        }
      }
      if (ast.type === "css-atrule" && ast.name.toLowerCase() === "supports") {
        delete newObj.value;
      }
      if (ast.type === "selector-unknown") {
        delete newObj.value;
      }
      if (ast.type === "value-comma_group") {
        const index = ast.groups.findIndex((node) => node.type === "value-number" && node.unit === "...");
        if (index !== -1) {
          newObj.groups[index].unit = "";
          newObj.groups.splice(index + 1, 0, {
            type: "value-word",
            value: "...",
            isColor: false,
            isHex: false
          });
        }
      }
      if (ast.type === "value-comma_group" && ast.groups.some((node) => node.type === "value-atword" && node.value.endsWith("[") || node.type === "value-word" && node.value.startsWith("]"))) {
        return {
          type: "value-atword",
          value: ast.groups.map((node) => node.value).join(""),
          group: {
            open: null,
            close: null,
            groups: [],
            type: "value-paren_group"
          }
        };
      }
    }
    clean.ignoredProperties = ignoredProperties;
    function cleanCSSStrings(value) {
      return value.replace(/'/g, '"').replace(/\\([^\dA-Fa-f])/g, "$1");
    }
    module.exports = clean;
  }
});
var require_print = __commonJS2({
  "src/utils/front-matter/print.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      builders: {
        hardline,
        markAsRoot
      }
    } = require_document();
    function print(node, textToDoc) {
      if (node.lang === "yaml") {
        const value = node.value.trim();
        const doc = value ? textToDoc(value, {
          parser: "yaml"
        }, {
          stripTrailingHardline: true
        }) : "";
        return markAsRoot([node.startDelimiter, hardline, doc, doc ? hardline : "", node.endDelimiter]);
      }
    }
    module.exports = print;
  }
});
var require_embed2 = __commonJS2({
  "src/language-css/embed.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      builders: {
        hardline
      }
    } = require_document();
    var printFrontMatter = require_print();
    function embed(path, print, textToDoc) {
      const node = path.getValue();
      if (node.type === "front-matter") {
        const doc = printFrontMatter(node, textToDoc);
        return doc ? [doc, hardline] : "";
      }
    }
    module.exports = embed;
  }
});
var require_parse = __commonJS2({
  "src/utils/front-matter/parse.js"(exports, module) {
    "use strict";
    init_define_process();
    var frontMatterRegex = new RegExp("^(?<startDelimiter>-{3}|\\+{3})(?<language>[^\\n]*)\\n(?:|(?<value>.*?)\\n)(?<endDelimiter>\\k<startDelimiter>|\\.{3})[^\\S\\n]*(?:\\n|$)", "s");
    function parse(text) {
      const match = text.match(frontMatterRegex);
      if (!match) {
        return {
          content: text
        };
      }
      const {
        startDelimiter,
        language,
        value = "",
        endDelimiter
      } = match.groups;
      let lang = language.trim() || "yaml";
      if (startDelimiter === "+++") {
        lang = "toml";
      }
      if (lang !== "yaml" && startDelimiter !== endDelimiter) {
        return {
          content: text
        };
      }
      const [raw] = match;
      const frontMatter = {
        type: "front-matter",
        lang,
        value,
        startDelimiter,
        endDelimiter,
        raw: raw.replace(/\n$/, "")
      };
      return {
        frontMatter,
        content: raw.replace(/[^\n]/g, " ") + text.slice(raw.length)
      };
    }
    module.exports = parse;
  }
});
var require_pragma2 = __commonJS2({
  "src/language-css/pragma.js"(exports, module) {
    "use strict";
    init_define_process();
    var jsPragma = require_pragma();
    var parseFrontMatter = require_parse();
    function hasPragma(text) {
      return jsPragma.hasPragma(parseFrontMatter(text).content);
    }
    function insertPragma(text) {
      const {
        frontMatter,
        content
      } = parseFrontMatter(text);
      return (frontMatter ? frontMatter.raw + "\n\n" : "") + jsPragma.insertPragma(content);
    }
    module.exports = {
      hasPragma,
      insertPragma
    };
  }
});
var require_utils4 = __commonJS2({
  "src/language-css/utils/index.js"(exports, module) {
    "use strict";
    init_define_process();
    var colorAdjusterFunctions = /* @__PURE__ */ new Set(["red", "green", "blue", "alpha", "a", "rgb", "hue", "h", "saturation", "s", "lightness", "l", "whiteness", "w", "blackness", "b", "tint", "shade", "blend", "blenda", "contrast", "hsl", "hsla", "hwb", "hwba"]);
    function getAncestorCounter(path, typeOrTypes) {
      const types = Array.isArray(typeOrTypes) ? typeOrTypes : [typeOrTypes];
      let counter = -1;
      let ancestorNode;
      while (ancestorNode = path.getParentNode(++counter)) {
        if (types.includes(ancestorNode.type)) {
          return counter;
        }
      }
      return -1;
    }
    function getAncestorNode(path, typeOrTypes) {
      const counter = getAncestorCounter(path, typeOrTypes);
      return counter === -1 ? null : path.getParentNode(counter);
    }
    function getPropOfDeclNode(path) {
      var _declAncestorNode$pro;
      const declAncestorNode = getAncestorNode(path, "css-decl");
      return declAncestorNode === null || declAncestorNode === void 0 ? void 0 : (_declAncestorNode$pro = declAncestorNode.prop) === null || _declAncestorNode$pro === void 0 ? void 0 : _declAncestorNode$pro.toLowerCase();
    }
    var wideKeywords = /* @__PURE__ */ new Set(["initial", "inherit", "unset", "revert"]);
    function isWideKeywords(value) {
      return wideKeywords.has(value.toLowerCase());
    }
    function isKeyframeAtRuleKeywords(path, value) {
      const atRuleAncestorNode = getAncestorNode(path, "css-atrule");
      return (atRuleAncestorNode === null || atRuleAncestorNode === void 0 ? void 0 : atRuleAncestorNode.name) && atRuleAncestorNode.name.toLowerCase().endsWith("keyframes") && ["from", "to"].includes(value.toLowerCase());
    }
    function maybeToLowerCase(value) {
      return value.includes("$") || value.includes("@") || value.includes("#") || value.startsWith("%") || value.startsWith("--") || value.startsWith(":--") || value.includes("(") && value.includes(")") ? value : value.toLowerCase();
    }
    function insideValueFunctionNode(path, functionName) {
      var _funcAncestorNode$val;
      const funcAncestorNode = getAncestorNode(path, "value-func");
      return (funcAncestorNode === null || funcAncestorNode === void 0 ? void 0 : (_funcAncestorNode$val = funcAncestorNode.value) === null || _funcAncestorNode$val === void 0 ? void 0 : _funcAncestorNode$val.toLowerCase()) === functionName;
    }
    function insideICSSRuleNode(path) {
      var _ruleAncestorNode$raw;
      const ruleAncestorNode = getAncestorNode(path, "css-rule");
      const selector = ruleAncestorNode === null || ruleAncestorNode === void 0 ? void 0 : (_ruleAncestorNode$raw = ruleAncestorNode.raws) === null || _ruleAncestorNode$raw === void 0 ? void 0 : _ruleAncestorNode$raw.selector;
      return selector && (selector.startsWith(":import") || selector.startsWith(":export"));
    }
    function insideAtRuleNode(path, atRuleNameOrAtRuleNames) {
      const atRuleNames = Array.isArray(atRuleNameOrAtRuleNames) ? atRuleNameOrAtRuleNames : [atRuleNameOrAtRuleNames];
      const atRuleAncestorNode = getAncestorNode(path, "css-atrule");
      return atRuleAncestorNode && atRuleNames.includes(atRuleAncestorNode.name.toLowerCase());
    }
    function insideURLFunctionInImportAtRuleNode(path) {
      const node = path.getValue();
      const atRuleAncestorNode = getAncestorNode(path, "css-atrule");
      return (atRuleAncestorNode === null || atRuleAncestorNode === void 0 ? void 0 : atRuleAncestorNode.name) === "import" && node.groups[0].value === "url" && node.groups.length === 2;
    }
    function isURLFunctionNode(node) {
      return node.type === "value-func" && node.value.toLowerCase() === "url";
    }
    function isLastNode(path, node) {
      var _path$getParentNode;
      const nodes = (_path$getParentNode = path.getParentNode()) === null || _path$getParentNode === void 0 ? void 0 : _path$getParentNode.nodes;
      return nodes && nodes.indexOf(node) === nodes.length - 1;
    }
    function isDetachedRulesetDeclarationNode(node) {
      const {
        selector
      } = node;
      if (!selector) {
        return false;
      }
      return typeof selector === "string" && /^@.+:.*$/.test(selector) || selector.value && /^@.+:.*$/.test(selector.value);
    }
    function isForKeywordNode(node) {
      return node.type === "value-word" && ["from", "through", "end"].includes(node.value);
    }
    function isIfElseKeywordNode(node) {
      return node.type === "value-word" && ["and", "or", "not"].includes(node.value);
    }
    function isEachKeywordNode(node) {
      return node.type === "value-word" && node.value === "in";
    }
    function isMultiplicationNode(node) {
      return node.type === "value-operator" && node.value === "*";
    }
    function isDivisionNode(node) {
      return node.type === "value-operator" && node.value === "/";
    }
    function isAdditionNode(node) {
      return node.type === "value-operator" && node.value === "+";
    }
    function isSubtractionNode(node) {
      return node.type === "value-operator" && node.value === "-";
    }
    function isModuloNode(node) {
      return node.type === "value-operator" && node.value === "%";
    }
    function isMathOperatorNode(node) {
      return isMultiplicationNode(node) || isDivisionNode(node) || isAdditionNode(node) || isSubtractionNode(node) || isModuloNode(node);
    }
    function isEqualityOperatorNode(node) {
      return node.type === "value-word" && ["==", "!="].includes(node.value);
    }
    function isRelationalOperatorNode(node) {
      return node.type === "value-word" && ["<", ">", "<=", ">="].includes(node.value);
    }
    function isSCSSControlDirectiveNode(node) {
      return node.type === "css-atrule" && ["if", "else", "for", "each", "while"].includes(node.name);
    }
    function isDetachedRulesetCallNode(node) {
      var _node$raws;
      return ((_node$raws = node.raws) === null || _node$raws === void 0 ? void 0 : _node$raws.params) && /^\(\s*\)$/.test(node.raws.params);
    }
    function isTemplatePlaceholderNode(node) {
      return node.name.startsWith("prettier-placeholder");
    }
    function isTemplatePropNode(node) {
      return node.prop.startsWith("@prettier-placeholder");
    }
    function isPostcssSimpleVarNode(currentNode, nextNode) {
      return currentNode.value === "$$" && currentNode.type === "value-func" && (nextNode === null || nextNode === void 0 ? void 0 : nextNode.type) === "value-word" && !nextNode.raws.before;
    }
    function hasComposesNode(node) {
      var _node$value, _node$value$group;
      return ((_node$value = node.value) === null || _node$value === void 0 ? void 0 : _node$value.type) === "value-root" && ((_node$value$group = node.value.group) === null || _node$value$group === void 0 ? void 0 : _node$value$group.type) === "value-value" && node.prop.toLowerCase() === "composes";
    }
    function hasParensAroundNode(node) {
      var _node$value2, _node$value2$group, _node$value2$group$gr;
      return ((_node$value2 = node.value) === null || _node$value2 === void 0 ? void 0 : (_node$value2$group = _node$value2.group) === null || _node$value2$group === void 0 ? void 0 : (_node$value2$group$gr = _node$value2$group.group) === null || _node$value2$group$gr === void 0 ? void 0 : _node$value2$group$gr.type) === "value-paren_group" && node.value.group.group.open !== null && node.value.group.group.close !== null;
    }
    function hasEmptyRawBefore(node) {
      var _node$raws2;
      return ((_node$raws2 = node.raws) === null || _node$raws2 === void 0 ? void 0 : _node$raws2.before) === "";
    }
    function isKeyValuePairNode(node) {
      var _node$groups, _node$groups$;
      return node.type === "value-comma_group" && ((_node$groups = node.groups) === null || _node$groups === void 0 ? void 0 : (_node$groups$ = _node$groups[1]) === null || _node$groups$ === void 0 ? void 0 : _node$groups$.type) === "value-colon";
    }
    function isKeyValuePairInParenGroupNode(node) {
      var _node$groups2;
      return node.type === "value-paren_group" && ((_node$groups2 = node.groups) === null || _node$groups2 === void 0 ? void 0 : _node$groups2[0]) && isKeyValuePairNode(node.groups[0]);
    }
    function isSCSSMapItemNode(path) {
      var _declNode$prop;
      const node = path.getValue();
      if (node.groups.length === 0) {
        return false;
      }
      const parentParentNode = path.getParentNode(1);
      if (!isKeyValuePairInParenGroupNode(node) && !(parentParentNode && isKeyValuePairInParenGroupNode(parentParentNode))) {
        return false;
      }
      const declNode = getAncestorNode(path, "css-decl");
      if (declNode !== null && declNode !== void 0 && (_declNode$prop = declNode.prop) !== null && _declNode$prop !== void 0 && _declNode$prop.startsWith("$")) {
        return true;
      }
      if (isKeyValuePairInParenGroupNode(parentParentNode)) {
        return true;
      }
      if (parentParentNode.type === "value-func") {
        return true;
      }
      return false;
    }
    function isInlineValueCommentNode(node) {
      return node.type === "value-comment" && node.inline;
    }
    function isHashNode(node) {
      return node.type === "value-word" && node.value === "#";
    }
    function isLeftCurlyBraceNode(node) {
      return node.type === "value-word" && node.value === "{";
    }
    function isRightCurlyBraceNode(node) {
      return node.type === "value-word" && node.value === "}";
    }
    function isWordNode(node) {
      return ["value-word", "value-atword"].includes(node.type);
    }
    function isColonNode(node) {
      return (node === null || node === void 0 ? void 0 : node.type) === "value-colon";
    }
    function isKeyInValuePairNode(node, parentNode) {
      if (!isKeyValuePairNode(parentNode)) {
        return false;
      }
      const {
        groups
      } = parentNode;
      const index = groups.indexOf(node);
      if (index === -1) {
        return false;
      }
      return isColonNode(groups[index + 1]);
    }
    function isMediaAndSupportsKeywords(node) {
      return node.value && ["not", "and", "or"].includes(node.value.toLowerCase());
    }
    function isColorAdjusterFuncNode(node) {
      if (node.type !== "value-func") {
        return false;
      }
      return colorAdjusterFunctions.has(node.value.toLowerCase());
    }
    function lastLineHasInlineComment(text) {
      return /\/\//.test(text.split(/[\n\r]/).pop());
    }
    function isAtWordPlaceholderNode(node) {
      return (node === null || node === void 0 ? void 0 : node.type) === "value-atword" && node.value.startsWith("prettier-placeholder-");
    }
    function isConfigurationNode(node, parentNode) {
      var _node$open, _node$close;
      if (((_node$open = node.open) === null || _node$open === void 0 ? void 0 : _node$open.value) !== "(" || ((_node$close = node.close) === null || _node$close === void 0 ? void 0 : _node$close.value) !== ")" || node.groups.some((group) => group.type !== "value-comma_group")) {
        return false;
      }
      if (parentNode.type === "value-comma_group") {
        const prevIdx = parentNode.groups.indexOf(node) - 1;
        const maybeWithNode = parentNode.groups[prevIdx];
        if ((maybeWithNode === null || maybeWithNode === void 0 ? void 0 : maybeWithNode.type) === "value-word" && maybeWithNode.value === "with") {
          return true;
        }
      }
      return false;
    }
    function isParenGroupNode(node) {
      var _node$open2, _node$close2;
      return node.type === "value-paren_group" && ((_node$open2 = node.open) === null || _node$open2 === void 0 ? void 0 : _node$open2.value) === "(" && ((_node$close2 = node.close) === null || _node$close2 === void 0 ? void 0 : _node$close2.value) === ")";
    }
    module.exports = {
      getAncestorCounter,
      getAncestorNode,
      getPropOfDeclNode,
      maybeToLowerCase,
      insideValueFunctionNode,
      insideICSSRuleNode,
      insideAtRuleNode,
      insideURLFunctionInImportAtRuleNode,
      isKeyframeAtRuleKeywords,
      isWideKeywords,
      isLastNode,
      isSCSSControlDirectiveNode,
      isDetachedRulesetDeclarationNode,
      isRelationalOperatorNode,
      isEqualityOperatorNode,
      isMultiplicationNode,
      isDivisionNode,
      isAdditionNode,
      isSubtractionNode,
      isModuloNode,
      isMathOperatorNode,
      isEachKeywordNode,
      isForKeywordNode,
      isURLFunctionNode,
      isIfElseKeywordNode,
      hasComposesNode,
      hasParensAroundNode,
      hasEmptyRawBefore,
      isDetachedRulesetCallNode,
      isTemplatePlaceholderNode,
      isTemplatePropNode,
      isPostcssSimpleVarNode,
      isKeyValuePairNode,
      isKeyValuePairInParenGroupNode,
      isKeyInValuePairNode,
      isSCSSMapItemNode,
      isInlineValueCommentNode,
      isHashNode,
      isLeftCurlyBraceNode,
      isRightCurlyBraceNode,
      isWordNode,
      isColonNode,
      isMediaAndSupportsKeywords,
      isColorAdjusterFuncNode,
      lastLineHasInlineComment,
      isAtWordPlaceholderNode,
      isConfigurationNode,
      isParenGroupNode
    };
  }
});
var require_line_column_to_index = __commonJS2({
  "src/utils/line-column-to-index.js"(exports, module) {
    "use strict";
    init_define_process();
    module.exports = function(lineColumn, text) {
      let index = 0;
      for (let i = 0; i < lineColumn.line - 1; ++i) {
        index = text.indexOf("\n", index) + 1;
      }
      return index + lineColumn.column;
    };
  }
});
var require_loc2 = __commonJS2({
  "src/language-css/loc.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      skipEverythingButNewLine
    } = require_skip();
    var getLast = require_get_last();
    var lineColumnToIndex = require_line_column_to_index();
    function calculateLocStart(node, text) {
      if (typeof node.sourceIndex === "number") {
        return node.sourceIndex;
      }
      return node.source ? lineColumnToIndex(node.source.start, text) - 1 : null;
    }
    function calculateLocEnd(node, text) {
      if (node.type === "css-comment" && node.inline) {
        return skipEverythingButNewLine(text, node.source.startOffset);
      }
      const endNode = node.nodes && getLast(node.nodes);
      if (endNode && node.source && !node.source.end) {
        node = endNode;
      }
      if (node.source && node.source.end) {
        return lineColumnToIndex(node.source.end, text);
      }
      return null;
    }
    function calculateLoc(node, text) {
      if (node.source) {
        node.source.startOffset = calculateLocStart(node, text);
        node.source.endOffset = calculateLocEnd(node, text);
      }
      for (const key in node) {
        const child = node[key];
        if (key === "source" || !child || typeof child !== "object") {
          continue;
        }
        if (child.type === "value-root" || child.type === "value-unknown") {
          calculateValueNodeLoc(child, getValueRootOffset(node), child.text || child.value);
        } else {
          calculateLoc(child, text);
        }
      }
    }
    function calculateValueNodeLoc(node, rootOffset, text) {
      if (node.source) {
        node.source.startOffset = calculateLocStart(node, text) + rootOffset;
        node.source.endOffset = calculateLocEnd(node, text) + rootOffset;
      }
      for (const key in node) {
        const child = node[key];
        if (key === "source" || !child || typeof child !== "object") {
          continue;
        }
        calculateValueNodeLoc(child, rootOffset, text);
      }
    }
    function getValueRootOffset(node) {
      let result = node.source.startOffset;
      if (typeof node.prop === "string") {
        result += node.prop.length;
      }
      if (node.type === "css-atrule" && typeof node.name === "string") {
        result += 1 + node.name.length + node.raws.afterName.match(/^\s*:?\s*/)[0].length;
      }
      if (node.type !== "css-atrule" && node.raws && typeof node.raws.between === "string") {
        result += node.raws.between.length;
      }
      return result;
    }
    function replaceQuotesInInlineComments(text) {
      let state = "initial";
      let stateToReturnFromQuotes = "initial";
      let inlineCommentStartIndex;
      let inlineCommentContainsQuotes = false;
      const inlineCommentsToReplace = [];
      for (let i = 0; i < text.length; i++) {
        const c = text[i];
        switch (state) {
          case "initial":
            if (c === "'") {
              state = "single-quotes";
              continue;
            }
            if (c === '"') {
              state = "double-quotes";
              continue;
            }
            if ((c === "u" || c === "U") && text.slice(i, i + 4).toLowerCase() === "url(") {
              state = "url";
              i += 3;
              continue;
            }
            if (c === "*" && text[i - 1] === "/") {
              state = "comment-block";
              continue;
            }
            if (c === "/" && text[i - 1] === "/") {
              state = "comment-inline";
              inlineCommentStartIndex = i - 1;
              continue;
            }
            continue;
          case "single-quotes":
            if (c === "'" && text[i - 1] !== "\\") {
              state = stateToReturnFromQuotes;
              stateToReturnFromQuotes = "initial";
            }
            if (c === "\n" || c === "\r") {
              return text;
            }
            continue;
          case "double-quotes":
            if (c === '"' && text[i - 1] !== "\\") {
              state = stateToReturnFromQuotes;
              stateToReturnFromQuotes = "initial";
            }
            if (c === "\n" || c === "\r") {
              return text;
            }
            continue;
          case "url":
            if (c === ")") {
              state = "initial";
            }
            if (c === "\n" || c === "\r") {
              return text;
            }
            if (c === "'") {
              state = "single-quotes";
              stateToReturnFromQuotes = "url";
              continue;
            }
            if (c === '"') {
              state = "double-quotes";
              stateToReturnFromQuotes = "url";
              continue;
            }
            continue;
          case "comment-block":
            if (c === "/" && text[i - 1] === "*") {
              state = "initial";
            }
            continue;
          case "comment-inline":
            if (c === '"' || c === "'" || c === "*") {
              inlineCommentContainsQuotes = true;
            }
            if (c === "\n" || c === "\r") {
              if (inlineCommentContainsQuotes) {
                inlineCommentsToReplace.push([inlineCommentStartIndex, i]);
              }
              state = "initial";
              inlineCommentContainsQuotes = false;
            }
            continue;
        }
      }
      for (const [start, end] of inlineCommentsToReplace) {
        text = text.slice(0, start) + text.slice(start, end).replace(/["'*]/g, " ") + text.slice(end);
      }
      return text;
    }
    function locStart(node) {
      return node.source.startOffset;
    }
    function locEnd(node) {
      return node.source.endOffset;
    }
    module.exports = {
      locStart,
      locEnd,
      calculateLoc,
      replaceQuotesInInlineComments
    };
  }
});
var require_is_less_parser = __commonJS2({
  "src/language-css/utils/is-less-parser.js"(exports, module) {
    "use strict";
    init_define_process();
    function isLessParser(options) {
      return options.parser === "css" || options.parser === "less";
    }
    module.exports = isLessParser;
  }
});
var require_is_scss = __commonJS2({
  "src/language-css/utils/is-scss.js"(exports, module) {
    "use strict";
    init_define_process();
    function isSCSS(parser, text) {
      const hasExplicitParserChoice = parser === "less" || parser === "scss";
      const IS_POSSIBLY_SCSS = /(?:\w\s*:\s*[^:}]+|#){|@import[^\n]+(?:url|,)/;
      return hasExplicitParserChoice ? parser === "scss" : IS_POSSIBLY_SCSS.test(text);
    }
    module.exports = isSCSS;
  }
});
var require_css_units_evaluate = __commonJS2({
  "src/language-css/utils/css-units.evaluate.js"(exports, module) {
    module.exports = {
      em: "em",
      rem: "rem",
      ex: "ex",
      rex: "rex",
      cap: "cap",
      rcap: "rcap",
      ch: "ch",
      rch: "rch",
      ic: "ic",
      ric: "ric",
      lh: "lh",
      rlh: "rlh",
      vw: "vw",
      svw: "svw",
      lvw: "lvw",
      dvw: "dvw",
      vh: "vh",
      svh: "svh",
      lvh: "lvh",
      dvh: "dvh",
      vi: "vi",
      svi: "svi",
      lvi: "lvi",
      dvi: "dvi",
      vb: "vb",
      svb: "svb",
      lvb: "lvb",
      dvb: "dvb",
      vmin: "vmin",
      svmin: "svmin",
      lvmin: "lvmin",
      dvmin: "dvmin",
      vmax: "vmax",
      svmax: "svmax",
      lvmax: "lvmax",
      dvmax: "dvmax",
      cm: "cm",
      mm: "mm",
      q: "Q",
      in: "in",
      pt: "pt",
      pc: "pc",
      px: "px",
      deg: "deg",
      grad: "grad",
      rad: "rad",
      turn: "turn",
      s: "s",
      ms: "ms",
      hz: "Hz",
      khz: "kHz",
      dpi: "dpi",
      dpcm: "dpcm",
      dppx: "dppx",
      x: "x"
    };
  }
});
var require_print_unit = __commonJS2({
  "src/language-css/utils/print-unit.js"(exports, module) {
    "use strict";
    init_define_process();
    var CSS_UNITS = require_css_units_evaluate();
    function printUnit(unit) {
      const lowercased = unit.toLowerCase();
      return Object.prototype.hasOwnProperty.call(CSS_UNITS, lowercased) ? CSS_UNITS[lowercased] : unit;
    }
    module.exports = printUnit;
  }
});
var require_printer_postcss = __commonJS2({
  "src/language-css/printer-postcss.js"(exports, module) {
    "use strict";
    init_define_process();
    var getLast = require_get_last();
    var {
      printNumber,
      printString,
      hasNewline,
      isFrontMatterNode,
      isNextLineEmpty,
      isNonEmptyArray
    } = require_util();
    var {
      builders: {
        join: join2,
        line,
        hardline,
        softline,
        group,
        fill,
        indent,
        dedent,
        ifBreak,
        breakParent
      },
      utils: {
        removeLines,
        getDocParts
      }
    } = require_document();
    var clean = require_clean2();
    var embed = require_embed2();
    var {
      insertPragma
    } = require_pragma2();
    var {
      getAncestorNode,
      getPropOfDeclNode,
      maybeToLowerCase,
      insideValueFunctionNode,
      insideICSSRuleNode,
      insideAtRuleNode,
      insideURLFunctionInImportAtRuleNode,
      isKeyframeAtRuleKeywords,
      isWideKeywords,
      isLastNode,
      isSCSSControlDirectiveNode,
      isDetachedRulesetDeclarationNode,
      isRelationalOperatorNode,
      isEqualityOperatorNode,
      isMultiplicationNode,
      isDivisionNode,
      isAdditionNode,
      isSubtractionNode,
      isMathOperatorNode,
      isEachKeywordNode,
      isForKeywordNode,
      isURLFunctionNode,
      isIfElseKeywordNode,
      hasComposesNode,
      hasParensAroundNode,
      hasEmptyRawBefore,
      isKeyValuePairNode,
      isKeyInValuePairNode,
      isDetachedRulesetCallNode,
      isTemplatePlaceholderNode,
      isTemplatePropNode,
      isPostcssSimpleVarNode,
      isSCSSMapItemNode,
      isInlineValueCommentNode,
      isHashNode,
      isLeftCurlyBraceNode,
      isRightCurlyBraceNode,
      isWordNode,
      isColonNode,
      isMediaAndSupportsKeywords,
      isColorAdjusterFuncNode,
      lastLineHasInlineComment,
      isAtWordPlaceholderNode,
      isConfigurationNode,
      isParenGroupNode
    } = require_utils4();
    var {
      locStart,
      locEnd
    } = require_loc2();
    var isLessParser = require_is_less_parser();
    var isSCSS = require_is_scss();
    var printUnit = require_print_unit();
    function shouldPrintComma(options) {
      return options.trailingComma === "es5" || options.trailingComma === "all";
    }
    function genericPrint(path, options, print) {
      const node = path.getValue();
      if (!node) {
        return "";
      }
      if (typeof node === "string") {
        return node;
      }
      switch (node.type) {
        case "front-matter":
          return [node.raw, hardline];
        case "css-root": {
          const nodes = printNodeSequence(path, options, print);
          let after = node.raws.after.trim();
          if (after.startsWith(";")) {
            after = after.slice(1).trim();
          }
          return [nodes, after ? ` ${after}` : "", getDocParts(nodes).length > 0 ? hardline : ""];
        }
        case "css-comment": {
          const isInlineComment = node.inline || node.raws.inline;
          const text = options.originalText.slice(locStart(node), locEnd(node));
          return isInlineComment ? text.trimEnd() : text;
        }
        case "css-rule": {
          return [print("selector"), node.important ? " !important" : "", node.nodes ? [node.selector && node.selector.type === "selector-unknown" && lastLineHasInlineComment(node.selector.value) ? line : " ", "{", node.nodes.length > 0 ? indent([hardline, printNodeSequence(path, options, print)]) : "", hardline, "}", isDetachedRulesetDeclarationNode(node) ? ";" : ""] : ";"];
        }
        case "css-decl": {
          const parentNode = path.getParentNode();
          const {
            between: rawBetween
          } = node.raws;
          const trimmedBetween = rawBetween.trim();
          const isColon = trimmedBetween === ":";
          let value = hasComposesNode(node) ? removeLines(print("value")) : print("value");
          if (!isColon && lastLineHasInlineComment(trimmedBetween)) {
            value = indent([hardline, dedent(value)]);
          }
          return [node.raws.before.replace(/[\s;]/g, ""), parentNode.type === "css-atrule" && parentNode.variable || insideICSSRuleNode(path) ? node.prop : maybeToLowerCase(node.prop), trimmedBetween.startsWith("//") ? " " : "", trimmedBetween, node.extend ? "" : " ", isLessParser(options) && node.extend && node.selector ? ["extend(", print("selector"), ")"] : "", value, node.raws.important ? node.raws.important.replace(/\s*!\s*important/i, " !important") : node.important ? " !important" : "", node.raws.scssDefault ? node.raws.scssDefault.replace(/\s*!default/i, " !default") : node.scssDefault ? " !default" : "", node.raws.scssGlobal ? node.raws.scssGlobal.replace(/\s*!global/i, " !global") : node.scssGlobal ? " !global" : "", node.nodes ? [" {", indent([softline, printNodeSequence(path, options, print)]), softline, "}"] : isTemplatePropNode(node) && !parentNode.raws.semicolon && options.originalText[locEnd(node) - 1] !== ";" ? "" : options.__isHTMLStyleAttribute && isLastNode(path, node) ? ifBreak(";") : ";"];
        }
        case "css-atrule": {
          const parentNode = path.getParentNode();
          const isTemplatePlaceholderNodeWithoutSemiColon = isTemplatePlaceholderNode(node) && !parentNode.raws.semicolon && options.originalText[locEnd(node) - 1] !== ";";
          if (isLessParser(options)) {
            if (node.mixin) {
              return [print("selector"), node.important ? " !important" : "", isTemplatePlaceholderNodeWithoutSemiColon ? "" : ";"];
            }
            if (node.function) {
              return [node.name, print("params"), isTemplatePlaceholderNodeWithoutSemiColon ? "" : ";"];
            }
            if (node.variable) {
              return ["@", node.name, ": ", node.value ? print("value") : "", node.raws.between.trim() ? node.raws.between.trim() + " " : "", node.nodes ? ["{", indent([node.nodes.length > 0 ? softline : "", printNodeSequence(path, options, print)]), softline, "}"] : "", isTemplatePlaceholderNodeWithoutSemiColon ? "" : ";"];
            }
          }
          return ["@", isDetachedRulesetCallNode(node) || node.name.endsWith(":") ? node.name : maybeToLowerCase(node.name), node.params ? [isDetachedRulesetCallNode(node) ? "" : isTemplatePlaceholderNode(node) ? node.raws.afterName === "" ? "" : node.name.endsWith(":") ? " " : /^\s*\n\s*\n/.test(node.raws.afterName) ? [hardline, hardline] : /^\s*\n/.test(node.raws.afterName) ? hardline : " " : " ", print("params")] : "", node.selector ? indent([" ", print("selector")]) : "", node.value ? group([" ", print("value"), isSCSSControlDirectiveNode(node) ? hasParensAroundNode(node) ? " " : line : ""]) : node.name === "else" ? " " : "", node.nodes ? [isSCSSControlDirectiveNode(node) ? "" : node.selector && !node.selector.nodes && typeof node.selector.value === "string" && lastLineHasInlineComment(node.selector.value) || !node.selector && typeof node.params === "string" && lastLineHasInlineComment(node.params) ? line : " ", "{", indent([node.nodes.length > 0 ? softline : "", printNodeSequence(path, options, print)]), softline, "}"] : isTemplatePlaceholderNodeWithoutSemiColon ? "" : ";"];
        }
        case "media-query-list": {
          const parts = [];
          path.each((childPath) => {
            const node2 = childPath.getValue();
            if (node2.type === "media-query" && node2.value === "") {
              return;
            }
            parts.push(print());
          }, "nodes");
          return group(indent(join2(line, parts)));
        }
        case "media-query": {
          return [join2(" ", path.map(print, "nodes")), isLastNode(path, node) ? "" : ","];
        }
        case "media-type": {
          return adjustNumbers(adjustStrings(node.value, options));
        }
        case "media-feature-expression": {
          if (!node.nodes) {
            return node.value;
          }
          return ["(", ...path.map(print, "nodes"), ")"];
        }
        case "media-feature": {
          return maybeToLowerCase(adjustStrings(node.value.replace(/ +/g, " "), options));
        }
        case "media-colon": {
          return [node.value, " "];
        }
        case "media-value": {
          return adjustNumbers(adjustStrings(node.value, options));
        }
        case "media-keyword": {
          return adjustStrings(node.value, options);
        }
        case "media-url": {
          return adjustStrings(node.value.replace(/^url\(\s+/gi, "url(").replace(/\s+\)$/g, ")"), options);
        }
        case "media-unknown": {
          return node.value;
        }
        case "selector-root": {
          return group([insideAtRuleNode(path, "custom-selector") ? [getAncestorNode(path, "css-atrule").customSelector, line] : "", join2([",", insideAtRuleNode(path, ["extend", "custom-selector", "nest"]) ? line : hardline], path.map(print, "nodes"))]);
        }
        case "selector-selector": {
          return group(indent(path.map(print, "nodes")));
        }
        case "selector-comment": {
          return node.value;
        }
        case "selector-string": {
          return adjustStrings(node.value, options);
        }
        case "selector-tag": {
          const parentNode = path.getParentNode();
          const index = parentNode && parentNode.nodes.indexOf(node);
          const prevNode = index && parentNode.nodes[index - 1];
          return [node.namespace ? [node.namespace === true ? "" : node.namespace.trim(), "|"] : "", prevNode.type === "selector-nesting" ? node.value : adjustNumbers(isKeyframeAtRuleKeywords(path, node.value) ? node.value.toLowerCase() : node.value)];
        }
        case "selector-id": {
          return ["#", node.value];
        }
        case "selector-class": {
          return [".", adjustNumbers(adjustStrings(node.value, options))];
        }
        case "selector-attribute": {
          var _node$operator;
          return ["[", node.namespace ? [node.namespace === true ? "" : node.namespace.trim(), "|"] : "", node.attribute.trim(), (_node$operator = node.operator) !== null && _node$operator !== void 0 ? _node$operator : "", node.value ? quoteAttributeValue(adjustStrings(node.value.trim(), options), options) : "", node.insensitive ? " i" : "", "]"];
        }
        case "selector-combinator": {
          if (node.value === "+" || node.value === ">" || node.value === "~" || node.value === ">>>") {
            const parentNode = path.getParentNode();
            const leading2 = parentNode.type === "selector-selector" && parentNode.nodes[0] === node ? "" : line;
            return [leading2, node.value, isLastNode(path, node) ? "" : " "];
          }
          const leading = node.value.trim().startsWith("(") ? line : "";
          const value = adjustNumbers(adjustStrings(node.value.trim(), options)) || line;
          return [leading, value];
        }
        case "selector-universal": {
          return [node.namespace ? [node.namespace === true ? "" : node.namespace.trim(), "|"] : "", node.value];
        }
        case "selector-pseudo": {
          return [maybeToLowerCase(node.value), isNonEmptyArray(node.nodes) ? group(["(", indent([softline, join2([",", line], path.map(print, "nodes"))]), softline, ")"]) : ""];
        }
        case "selector-nesting": {
          return node.value;
        }
        case "selector-unknown": {
          const ruleAncestorNode = getAncestorNode(path, "css-rule");
          if (ruleAncestorNode && ruleAncestorNode.isSCSSNesterProperty) {
            return adjustNumbers(adjustStrings(maybeToLowerCase(node.value), options));
          }
          const parentNode = path.getParentNode();
          if (parentNode.raws && parentNode.raws.selector) {
            const start = locStart(parentNode);
            const end = start + parentNode.raws.selector.length;
            return options.originalText.slice(start, end).trim();
          }
          const grandParent = path.getParentNode(1);
          if (parentNode.type === "value-paren_group" && grandParent && grandParent.type === "value-func" && grandParent.value === "selector") {
            const start = locEnd(parentNode.open) + 1;
            const end = locStart(parentNode.close);
            const selector = options.originalText.slice(start, end).trim();
            return lastLineHasInlineComment(selector) ? [breakParent, selector] : selector;
          }
          return node.value;
        }
        case "value-value":
        case "value-root": {
          return print("group");
        }
        case "value-comment": {
          return options.originalText.slice(locStart(node), locEnd(node));
        }
        case "value-comma_group": {
          const parentNode = path.getParentNode();
          const parentParentNode = path.getParentNode(1);
          const declAncestorProp = getPropOfDeclNode(path);
          const isGridValue = declAncestorProp && parentNode.type === "value-value" && (declAncestorProp === "grid" || declAncestorProp.startsWith("grid-template"));
          const atRuleAncestorNode = getAncestorNode(path, "css-atrule");
          const isControlDirective = atRuleAncestorNode && isSCSSControlDirectiveNode(atRuleAncestorNode);
          const hasInlineComment = node.groups.some((node2) => isInlineValueCommentNode(node2));
          const printed = path.map(print, "groups");
          const parts = [];
          const insideURLFunction = insideValueFunctionNode(path, "url");
          let insideSCSSInterpolationInString = false;
          let didBreak = false;
          for (let i = 0; i < node.groups.length; ++i) {
            var _iNode$value;
            parts.push(printed[i]);
            const iPrevNode = node.groups[i - 1];
            const iNode = node.groups[i];
            const iNextNode = node.groups[i + 1];
            const iNextNextNode = node.groups[i + 2];
            if (insideURLFunction) {
              if (iNextNode && isAdditionNode(iNextNode) || isAdditionNode(iNode)) {
                parts.push(" ");
              }
              continue;
            }
            if (insideAtRuleNode(path, "forward") && iNode.type === "value-word" && iNode.value && iPrevNode !== void 0 && iPrevNode.type === "value-word" && iPrevNode.value === "as" && iNextNode.type === "value-operator" && iNextNode.value === "*") {
              continue;
            }
            if (!iNextNode) {
              continue;
            }
            if (iNode.type === "value-word" && iNode.value.endsWith("-") && isAtWordPlaceholderNode(iNextNode)) {
              continue;
            }
            if (iNode.type === "value-string" && iNode.quoted) {
              const positionOfOpeningInterpolation = iNode.value.lastIndexOf("#{");
              const positionOfClosingInterpolation = iNode.value.lastIndexOf("}");
              if (positionOfOpeningInterpolation !== -1 && positionOfClosingInterpolation !== -1) {
                insideSCSSInterpolationInString = positionOfOpeningInterpolation > positionOfClosingInterpolation;
              } else if (positionOfOpeningInterpolation !== -1) {
                insideSCSSInterpolationInString = true;
              } else if (positionOfClosingInterpolation !== -1) {
                insideSCSSInterpolationInString = false;
              }
            }
            if (insideSCSSInterpolationInString) {
              continue;
            }
            if (isColonNode(iNode) || isColonNode(iNextNode)) {
              continue;
            }
            if (iNode.type === "value-atword" && (iNode.value === "" || iNode.value.endsWith("["))) {
              continue;
            }
            if (iNextNode.type === "value-word" && iNextNode.value.startsWith("]")) {
              continue;
            }
            if (iNode.value === "~") {
              continue;
            }
            if (iNode.value && iNode.value.includes("\\") && iNextNode && iNextNode.type !== "value-comment") {
              continue;
            }
            if (iPrevNode && iPrevNode.value && iPrevNode.value.indexOf("\\") === iPrevNode.value.length - 1 && iNode.type === "value-operator" && iNode.value === "/") {
              continue;
            }
            if (iNode.value === "\\") {
              continue;
            }
            if (isPostcssSimpleVarNode(iNode, iNextNode)) {
              continue;
            }
            if (isHashNode(iNode) || isLeftCurlyBraceNode(iNode) || isRightCurlyBraceNode(iNextNode) || isLeftCurlyBraceNode(iNextNode) && hasEmptyRawBefore(iNextNode) || isRightCurlyBraceNode(iNode) && hasEmptyRawBefore(iNextNode)) {
              continue;
            }
            if (iNode.value === "--" && isHashNode(iNextNode)) {
              continue;
            }
            const isMathOperator = isMathOperatorNode(iNode);
            const isNextMathOperator = isMathOperatorNode(iNextNode);
            if ((isMathOperator && isHashNode(iNextNode) || isNextMathOperator && isRightCurlyBraceNode(iNode)) && hasEmptyRawBefore(iNextNode)) {
              continue;
            }
            if (!iPrevNode && isDivisionNode(iNode)) {
              continue;
            }
            if (insideValueFunctionNode(path, "calc") && (isAdditionNode(iNode) || isAdditionNode(iNextNode) || isSubtractionNode(iNode) || isSubtractionNode(iNextNode)) && hasEmptyRawBefore(iNextNode)) {
              continue;
            }
            const isColorAdjusterNode = (isAdditionNode(iNode) || isSubtractionNode(iNode)) && i === 0 && (iNextNode.type === "value-number" || iNextNode.isHex) && parentParentNode && isColorAdjusterFuncNode(parentParentNode) && !hasEmptyRawBefore(iNextNode);
            const requireSpaceBeforeOperator = iNextNextNode && iNextNextNode.type === "value-func" || iNextNextNode && isWordNode(iNextNextNode) || iNode.type === "value-func" || isWordNode(iNode);
            const requireSpaceAfterOperator = iNextNode.type === "value-func" || isWordNode(iNextNode) || iPrevNode && iPrevNode.type === "value-func" || iPrevNode && isWordNode(iPrevNode);
            if (!(isMultiplicationNode(iNextNode) || isMultiplicationNode(iNode)) && !insideValueFunctionNode(path, "calc") && !isColorAdjusterNode && (isDivisionNode(iNextNode) && !requireSpaceBeforeOperator || isDivisionNode(iNode) && !requireSpaceAfterOperator || isAdditionNode(iNextNode) && !requireSpaceBeforeOperator || isAdditionNode(iNode) && !requireSpaceAfterOperator || isSubtractionNode(iNextNode) || isSubtractionNode(iNode)) && (hasEmptyRawBefore(iNextNode) || isMathOperator && (!iPrevNode || iPrevNode && isMathOperatorNode(iPrevNode)))) {
              continue;
            }
            if ((options.parser === "scss" || options.parser === "less") && isMathOperator && iNode.value === "-" && isParenGroupNode(iNextNode) && locEnd(iNode) === locStart(iNextNode.open) && iNextNode.open.value === "(") {
              continue;
            }
            if (isInlineValueCommentNode(iNode)) {
              if (parentNode.type === "value-paren_group") {
                parts.push(dedent(hardline));
                continue;
              }
              parts.push(hardline);
              continue;
            }
            if (isControlDirective && (isEqualityOperatorNode(iNextNode) || isRelationalOperatorNode(iNextNode) || isIfElseKeywordNode(iNextNode) || isEachKeywordNode(iNode) || isForKeywordNode(iNode))) {
              parts.push(" ");
              continue;
            }
            if (atRuleAncestorNode && atRuleAncestorNode.name.toLowerCase() === "namespace") {
              parts.push(" ");
              continue;
            }
            if (isGridValue) {
              if (iNode.source && iNextNode.source && iNode.source.start.line !== iNextNode.source.start.line) {
                parts.push(hardline);
                didBreak = true;
              } else {
                parts.push(" ");
              }
              continue;
            }
            if (isNextMathOperator) {
              parts.push(" ");
              continue;
            }
            if (iNextNode && iNextNode.value === "...") {
              continue;
            }
            if (isAtWordPlaceholderNode(iNode) && isAtWordPlaceholderNode(iNextNode) && locEnd(iNode) === locStart(iNextNode)) {
              continue;
            }
            if (isAtWordPlaceholderNode(iNode) && isParenGroupNode(iNextNode) && locEnd(iNode) === locStart(iNextNode.open)) {
              parts.push(softline);
              continue;
            }
            if (iNode.value === "with" && isParenGroupNode(iNextNode)) {
              parts.push(" ");
              continue;
            }
            if ((_iNode$value = iNode.value) !== null && _iNode$value !== void 0 && _iNode$value.endsWith("#") && iNextNode.value === "{" && isParenGroupNode(iNextNode.group)) {
              continue;
            }
            parts.push(line);
          }
          if (hasInlineComment) {
            parts.push(breakParent);
          }
          if (didBreak) {
            parts.unshift(hardline);
          }
          if (isControlDirective) {
            return group(indent(parts));
          }
          if (insideURLFunctionInImportAtRuleNode(path)) {
            return group(fill(parts));
          }
          return group(indent(fill(parts)));
        }
        case "value-paren_group": {
          const parentNode = path.getParentNode();
          if (parentNode && isURLFunctionNode(parentNode) && (node.groups.length === 1 || node.groups.length > 0 && node.groups[0].type === "value-comma_group" && node.groups[0].groups.length > 0 && node.groups[0].groups[0].type === "value-word" && node.groups[0].groups[0].value.startsWith("data:"))) {
            return [node.open ? print("open") : "", join2(",", path.map(print, "groups")), node.close ? print("close") : ""];
          }
          if (!node.open) {
            const printed2 = path.map(print, "groups");
            const res = [];
            for (let i = 0; i < printed2.length; i++) {
              if (i !== 0) {
                res.push([",", line]);
              }
              res.push(printed2[i]);
            }
            return group(indent(fill(res)));
          }
          const isSCSSMapItem = isSCSSMapItemNode(path);
          const lastItem = getLast(node.groups);
          const isLastItemComment = lastItem && lastItem.type === "value-comment";
          const isKey = isKeyInValuePairNode(node, parentNode);
          const isConfiguration = isConfigurationNode(node, parentNode);
          const shouldBreak = isConfiguration || isSCSSMapItem && !isKey;
          const shouldDedent = isConfiguration || isKey;
          const printed = group([node.open ? print("open") : "", indent([softline, join2([line], path.map((childPath, index) => {
            const child = childPath.getValue();
            const isLast = index === node.groups.length - 1;
            let printed2 = [print(), isLast ? "" : ","];
            if (isKeyValuePairNode(child) && child.type === "value-comma_group" && child.groups && child.groups[0].type !== "value-paren_group" && child.groups[2] && child.groups[2].type === "value-paren_group") {
              const parts = getDocParts(printed2[0].contents.contents);
              parts[1] = group(parts[1]);
              printed2 = [group(dedent(printed2))];
            }
            if (!isLast && child.type === "value-comma_group" && isNonEmptyArray(child.groups)) {
              let last = getLast(child.groups);
              if (!last.source && last.close) {
                last = last.close;
              }
              if (last.source && isNextLineEmpty(options.originalText, last, locEnd)) {
                printed2.push(hardline);
              }
            }
            return printed2;
          }, "groups"))]), ifBreak(!isLastItemComment && isSCSS(options.parser, options.originalText) && isSCSSMapItem && shouldPrintComma(options) ? "," : ""), softline, node.close ? print("close") : ""], {
            shouldBreak
          });
          return shouldDedent ? dedent(printed) : printed;
        }
        case "value-func": {
          return [node.value, insideAtRuleNode(path, "supports") && isMediaAndSupportsKeywords(node) ? " " : "", print("group")];
        }
        case "value-paren": {
          return node.value;
        }
        case "value-number": {
          return [printCssNumber(node.value), printUnit(node.unit)];
        }
        case "value-operator": {
          return node.value;
        }
        case "value-word": {
          if (node.isColor && node.isHex || isWideKeywords(node.value)) {
            return node.value.toLowerCase();
          }
          return node.value;
        }
        case "value-colon": {
          const parentNode = path.getParentNode();
          const index = parentNode && parentNode.groups.indexOf(node);
          const prevNode = index && parentNode.groups[index - 1];
          return [node.value, prevNode && typeof prevNode.value === "string" && getLast(prevNode.value) === "\\" || insideValueFunctionNode(path, "url") ? "" : line];
        }
        case "value-comma": {
          return [node.value, " "];
        }
        case "value-string": {
          return printString(node.raws.quote + node.value + node.raws.quote, options);
        }
        case "value-atword": {
          return ["@", node.value];
        }
        case "value-unicode-range": {
          return node.value;
        }
        case "value-unknown": {
          return node.value;
        }
        default:
          throw new Error(`Unknown postcss type ${JSON.stringify(node.type)}`);
      }
    }
    function printNodeSequence(path, options, print) {
      const parts = [];
      path.each((pathChild, i, nodes) => {
        const prevNode = nodes[i - 1];
        if (prevNode && prevNode.type === "css-comment" && prevNode.text.trim() === "prettier-ignore") {
          const childNode = pathChild.getValue();
          parts.push(options.originalText.slice(locStart(childNode), locEnd(childNode)));
        } else {
          parts.push(print());
        }
        if (i !== nodes.length - 1) {
          if (nodes[i + 1].type === "css-comment" && !hasNewline(options.originalText, locStart(nodes[i + 1]), {
            backwards: true
          }) && !isFrontMatterNode(nodes[i]) || nodes[i + 1].type === "css-atrule" && nodes[i + 1].name === "else" && nodes[i].type !== "css-comment") {
            parts.push(" ");
          } else {
            parts.push(options.__isHTMLStyleAttribute ? line : hardline);
            if (isNextLineEmpty(options.originalText, pathChild.getValue(), locEnd) && !isFrontMatterNode(nodes[i])) {
              parts.push(hardline);
            }
          }
        }
      }, "nodes");
      return parts;
    }
    var STRING_REGEX = /(["'])(?:(?!\1)[^\\]|\\.)*\1/gs;
    var NUMBER_REGEX = /(?:\d*\.\d+|\d+\.?)(?:[Ee][+-]?\d+)?/g;
    var STANDARD_UNIT_REGEX = /[A-Za-z]+/g;
    var WORD_PART_REGEX = /[$@]?[A-Z_a-z\u0080-\uFFFF][\w\u0080-\uFFFF-]*/g;
    var ADJUST_NUMBERS_REGEX = new RegExp(STRING_REGEX.source + `|(${WORD_PART_REGEX.source})?(${NUMBER_REGEX.source})(${STANDARD_UNIT_REGEX.source})?`, "g");
    function adjustStrings(value, options) {
      return value.replace(STRING_REGEX, (match) => printString(match, options));
    }
    function quoteAttributeValue(value, options) {
      const quote = options.singleQuote ? "'" : '"';
      return value.includes('"') || value.includes("'") ? value : quote + value + quote;
    }
    function adjustNumbers(value) {
      return value.replace(ADJUST_NUMBERS_REGEX, (match, quote, wordPart, number, unit) => !wordPart && number ? printCssNumber(number) + maybeToLowerCase(unit || "") : match);
    }
    function printCssNumber(rawNumber) {
      return printNumber(rawNumber).replace(/\.0(?=$|e)/, "");
    }
    module.exports = {
      print: genericPrint,
      embed,
      insertPragma,
      massageAstNode: clean
    };
  }
});
var require_options3 = __commonJS2({
  "src/language-css/options.js"(exports, module) {
    "use strict";
    init_define_process();
    var commonOptions = require_common_options();
    module.exports = {
      singleQuote: commonOptions.singleQuote
    };
  }
});
var require_parsers2 = __commonJS2({
  "src/language-css/parsers.js"() {
    init_define_process();
  }
});
var require_CSS = __commonJS2({
  "node_modules/linguist-languages/data/CSS.json"(exports, module) {
    module.exports = {
      name: "CSS",
      type: "markup",
      tmScope: "source.css",
      aceMode: "css",
      codemirrorMode: "css",
      codemirrorMimeType: "text/css",
      color: "#563d7c",
      extensions: [".css"],
      languageId: 50
    };
  }
});
var require_PostCSS = __commonJS2({
  "node_modules/linguist-languages/data/PostCSS.json"(exports, module) {
    module.exports = {
      name: "PostCSS",
      type: "markup",
      color: "#dc3a0c",
      tmScope: "source.postcss",
      group: "CSS",
      extensions: [".pcss", ".postcss"],
      aceMode: "text",
      languageId: 262764437
    };
  }
});
var require_Less = __commonJS2({
  "node_modules/linguist-languages/data/Less.json"(exports, module) {
    module.exports = {
      name: "Less",
      type: "markup",
      color: "#1d365d",
      aliases: ["less-css"],
      extensions: [".less"],
      tmScope: "source.css.less",
      aceMode: "less",
      codemirrorMode: "css",
      codemirrorMimeType: "text/css",
      languageId: 198
    };
  }
});
var require_SCSS = __commonJS2({
  "node_modules/linguist-languages/data/SCSS.json"(exports, module) {
    module.exports = {
      name: "SCSS",
      type: "markup",
      color: "#c6538c",
      tmScope: "source.css.scss",
      aceMode: "scss",
      codemirrorMode: "css",
      codemirrorMimeType: "text/x-scss",
      extensions: [".scss"],
      languageId: 329
    };
  }
});
var require_language_css = __commonJS2({
  "src/language-css/index.js"(exports, module) {
    "use strict";
    init_define_process();
    var createLanguage = require_create_language();
    var printer = require_printer_postcss();
    var options = require_options3();
    var parsers = require_parsers2();
    var languages = [createLanguage(require_CSS(), (data) => ({
      since: "1.4.0",
      parsers: ["css"],
      vscodeLanguageIds: ["css"],
      extensions: [...data.extensions, ".wxss"]
    })), createLanguage(require_PostCSS(), () => ({
      since: "1.4.0",
      parsers: ["css"],
      vscodeLanguageIds: ["postcss"]
    })), createLanguage(require_Less(), () => ({
      since: "1.4.0",
      parsers: ["less"],
      vscodeLanguageIds: ["less"]
    })), createLanguage(require_SCSS(), () => ({
      since: "1.4.0",
      parsers: ["scss"],
      vscodeLanguageIds: ["scss"]
    }))];
    var printers = {
      postcss: printer
    };
    module.exports = {
      languages,
      options,
      printers,
      parsers
    };
  }
});
var require_loc3 = __commonJS2({
  "src/language-handlebars/loc.js"(exports, module) {
    "use strict";
    init_define_process();
    function locStart(node) {
      return node.loc.start.offset;
    }
    function locEnd(node) {
      return node.loc.end.offset;
    }
    module.exports = {
      locStart,
      locEnd
    };
  }
});
var require_clean3 = __commonJS2({
  "src/language-handlebars/clean.js"(exports, module) {
    "use strict";
    init_define_process();
    function clean(ast, newNode) {
      if (ast.type === "TextNode") {
        const trimmed = ast.chars.trim();
        if (!trimmed) {
          return null;
        }
        newNode.chars = trimmed.replace(/[\t\n\f\r ]+/g, " ");
      }
      if (ast.type === "AttrNode" && ast.name.toLowerCase() === "class") {
        delete newNode.value;
      }
    }
    clean.ignoredProperties = /* @__PURE__ */ new Set(["loc", "selfClosing"]);
    module.exports = clean;
  }
});
var require_html_void_elements_evaluate = __commonJS2({
  "src/language-handlebars/html-void-elements.evaluate.js"(exports, module) {
    module.exports = ["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"];
  }
});
var require_utils5 = __commonJS2({
  "src/language-handlebars/utils.js"(exports, module) {
    "use strict";
    init_define_process();
    var getLast = require_get_last();
    var htmlVoidElements = require_html_void_elements_evaluate();
    function isLastNodeOfSiblings(path) {
      const node = path.getValue();
      const parentNode = path.getParentNode(0);
      if (isParentOfSomeType(path, ["ElementNode"]) && getLast(parentNode.children) === node) {
        return true;
      }
      if (isParentOfSomeType(path, ["Block"]) && getLast(parentNode.body) === node) {
        return true;
      }
      return false;
    }
    function isUppercase(string) {
      return string.toUpperCase() === string;
    }
    function isGlimmerComponent(node) {
      return isNodeOfSomeType(node, ["ElementNode"]) && typeof node.tag === "string" && !node.tag.startsWith(":") && (isUppercase(node.tag[0]) || node.tag.includes("."));
    }
    var voidTags = new Set(htmlVoidElements);
    function isVoidTag(tag) {
      return voidTags.has(tag.toLowerCase()) && !isUppercase(tag[0]);
    }
    function isVoid(node) {
      return node.selfClosing === true || isVoidTag(node.tag) || isGlimmerComponent(node) && node.children.every((node2) => isWhitespaceNode(node2));
    }
    function isWhitespaceNode(node) {
      return isNodeOfSomeType(node, ["TextNode"]) && !/\S/.test(node.chars);
    }
    function isNodeOfSomeType(node, types) {
      return node && types.includes(node.type);
    }
    function isParentOfSomeType(path, types) {
      const parentNode = path.getParentNode(0);
      return isNodeOfSomeType(parentNode, types);
    }
    function isPreviousNodeOfSomeType(path, types) {
      const previousNode = getPreviousNode(path);
      return isNodeOfSomeType(previousNode, types);
    }
    function isNextNodeOfSomeType(path, types) {
      const nextNode = getNextNode(path);
      return isNodeOfSomeType(nextNode, types);
    }
    function getSiblingNode(path, offset) {
      var _path$getParentNode2, _ref69, _ref70, _parentNode$children;
      const node = path.getValue();
      const parentNode = (_path$getParentNode2 = path.getParentNode(0)) !== null && _path$getParentNode2 !== void 0 ? _path$getParentNode2 : {};
      const children = (_ref69 = (_ref70 = (_parentNode$children = parentNode.children) !== null && _parentNode$children !== void 0 ? _parentNode$children : parentNode.body) !== null && _ref70 !== void 0 ? _ref70 : parentNode.parts) !== null && _ref69 !== void 0 ? _ref69 : [];
      const index = children.indexOf(node);
      return index !== -1 && children[index + offset];
    }
    function getPreviousNode(path) {
      let lookBack = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
      return getSiblingNode(path, -lookBack);
    }
    function getNextNode(path) {
      return getSiblingNode(path, 1);
    }
    function isPrettierIgnoreNode(node) {
      return isNodeOfSomeType(node, ["MustacheCommentStatement"]) && typeof node.value === "string" && node.value.trim() === "prettier-ignore";
    }
    function hasPrettierIgnore(path) {
      const node = path.getValue();
      const previousPreviousNode = getPreviousNode(path, 2);
      return isPrettierIgnoreNode(node) || isPrettierIgnoreNode(previousPreviousNode);
    }
    module.exports = {
      getNextNode,
      getPreviousNode,
      hasPrettierIgnore,
      isLastNodeOfSiblings,
      isNextNodeOfSomeType,
      isNodeOfSomeType,
      isParentOfSomeType,
      isPreviousNodeOfSomeType,
      isVoid,
      isWhitespaceNode
    };
  }
});
var require_printer_glimmer = __commonJS2({
  "src/language-handlebars/printer-glimmer.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      builders: {
        dedent,
        fill,
        group,
        hardline,
        ifBreak,
        indent,
        join: join2,
        line,
        softline
      },
      utils: {
        getDocParts,
        replaceTextEndOfLine
      }
    } = require_document();
    var {
      getPreferredQuote,
      isNonEmptyArray
    } = require_util();
    var {
      locStart,
      locEnd
    } = require_loc3();
    var clean = require_clean3();
    var {
      getNextNode,
      getPreviousNode,
      hasPrettierIgnore,
      isLastNodeOfSiblings,
      isNextNodeOfSomeType,
      isNodeOfSomeType,
      isParentOfSomeType,
      isPreviousNodeOfSomeType,
      isVoid,
      isWhitespaceNode
    } = require_utils5();
    var NEWLINES_TO_PRESERVE_MAX = 2;
    function print(path, options, print2) {
      const node = path.getValue();
      if (!node) {
        return "";
      }
      if (hasPrettierIgnore(path)) {
        return options.originalText.slice(locStart(node), locEnd(node));
      }
      const favoriteQuote = options.singleQuote ? "'" : '"';
      switch (node.type) {
        case "Block":
        case "Program":
        case "Template": {
          return group(path.map(print2, "body"));
        }
        case "ElementNode": {
          const startingTag = group(printStartingTag(path, print2));
          const escapeNextElementNode = options.htmlWhitespaceSensitivity === "ignore" && isNextNodeOfSomeType(path, ["ElementNode"]) ? softline : "";
          if (isVoid(node)) {
            return [startingTag, escapeNextElementNode];
          }
          const endingTag = ["</", node.tag, ">"];
          if (node.children.length === 0) {
            return [startingTag, indent(endingTag), escapeNextElementNode];
          }
          if (options.htmlWhitespaceSensitivity === "ignore") {
            return [startingTag, indent(printChildren(path, options, print2)), hardline, indent(endingTag), escapeNextElementNode];
          }
          return [startingTag, indent(group(printChildren(path, options, print2))), indent(endingTag), escapeNextElementNode];
        }
        case "BlockStatement": {
          const pp = path.getParentNode(1);
          const isElseIfLike = pp && pp.inverse && pp.inverse.body.length === 1 && pp.inverse.body[0] === node && pp.inverse.body[0].path.parts[0] === pp.path.parts[0];
          if (isElseIfLike) {
            return [printElseIfLikeBlock(path, print2, pp.inverse.body[0].path.parts[0]), printProgram(path, print2, options), printInverse(path, print2, options)];
          }
          return [printOpenBlock(path, print2), group([printProgram(path, print2, options), printInverse(path, print2, options), printCloseBlock(path, print2, options)])];
        }
        case "ElementModifierStatement": {
          return group(["{{", printPathAndParams(path, print2), "}}"]);
        }
        case "MustacheStatement": {
          return group([printOpeningMustache(node), printPathAndParams(path, print2), printClosingMustache(node)]);
        }
        case "SubExpression": {
          return group(["(", printSubExpressionPathAndParams(path, print2), softline, ")"]);
        }
        case "AttrNode": {
          const isText = node.value.type === "TextNode";
          const isEmptyText = isText && node.value.chars === "";
          if (isEmptyText && locStart(node.value) === locEnd(node.value)) {
            return node.name;
          }
          const quote = isText ? getPreferredQuote(node.value.chars, favoriteQuote).quote : node.value.type === "ConcatStatement" ? getPreferredQuote(node.value.parts.filter((part) => part.type === "TextNode").map((part) => part.chars).join(""), favoriteQuote).quote : "";
          const valueDoc = print2("value");
          return [node.name, "=", quote, node.name === "class" && quote ? group(indent(valueDoc)) : valueDoc, quote];
        }
        case "ConcatStatement": {
          return path.map(print2, "parts");
        }
        case "Hash": {
          return join2(line, path.map(print2, "pairs"));
        }
        case "HashPair": {
          return [node.key, "=", print2("value")];
        }
        case "TextNode": {
          let text = node.chars.replace(/{{/g, "\\{{");
          const attrName = getCurrentAttributeName(path);
          if (attrName) {
            if (attrName === "class") {
              const formattedClasses = text.trim().split(/\s+/).join(" ");
              let leadingSpace2 = false;
              let trailingSpace2 = false;
              if (isParentOfSomeType(path, ["ConcatStatement"])) {
                if (isPreviousNodeOfSomeType(path, ["MustacheStatement"]) && /^\s/.test(text)) {
                  leadingSpace2 = true;
                }
                if (isNextNodeOfSomeType(path, ["MustacheStatement"]) && /\s$/.test(text) && formattedClasses !== "") {
                  trailingSpace2 = true;
                }
              }
              return [leadingSpace2 ? line : "", formattedClasses, trailingSpace2 ? line : ""];
            }
            return replaceTextEndOfLine(text);
          }
          const whitespacesOnlyRE = /^[\t\n\f\r ]*$/;
          const isWhitespaceOnly = whitespacesOnlyRE.test(text);
          const isFirstElement = !getPreviousNode(path);
          const isLastElement = !getNextNode(path);
          if (options.htmlWhitespaceSensitivity !== "ignore") {
            const leadingWhitespacesRE = /^[\t\n\f\r ]*/;
            const trailingWhitespacesRE = /[\t\n\f\r ]*$/;
            const shouldTrimTrailingNewlines = isLastElement && isParentOfSomeType(path, ["Template"]);
            const shouldTrimLeadingNewlines = isFirstElement && isParentOfSomeType(path, ["Template"]);
            if (isWhitespaceOnly) {
              if (shouldTrimLeadingNewlines || shouldTrimTrailingNewlines) {
                return "";
              }
              let breaks = [line];
              const newlines = countNewLines(text);
              if (newlines) {
                breaks = generateHardlines(newlines);
              }
              if (isLastNodeOfSiblings(path)) {
                breaks = breaks.map((newline) => dedent(newline));
              }
              return breaks;
            }
            const [lead] = text.match(leadingWhitespacesRE);
            const [tail] = text.match(trailingWhitespacesRE);
            let leadBreaks = [];
            if (lead) {
              leadBreaks = [line];
              const leadingNewlines = countNewLines(lead);
              if (leadingNewlines) {
                leadBreaks = generateHardlines(leadingNewlines);
              }
              text = text.replace(leadingWhitespacesRE, "");
            }
            let trailBreaks = [];
            if (tail) {
              if (!shouldTrimTrailingNewlines) {
                trailBreaks = [line];
                const trailingNewlines = countNewLines(tail);
                if (trailingNewlines) {
                  trailBreaks = generateHardlines(trailingNewlines);
                }
                if (isLastNodeOfSiblings(path)) {
                  trailBreaks = trailBreaks.map((hardline2) => dedent(hardline2));
                }
              }
              text = text.replace(trailingWhitespacesRE, "");
            }
            return [...leadBreaks, fill(getTextValueParts(text)), ...trailBreaks];
          }
          const lineBreaksCount = countNewLines(text);
          let leadingLineBreaksCount = countLeadingNewLines(text);
          let trailingLineBreaksCount = countTrailingNewLines(text);
          if ((isFirstElement || isLastElement) && isWhitespaceOnly && isParentOfSomeType(path, ["Block", "ElementNode", "Template"])) {
            return "";
          }
          if (isWhitespaceOnly && lineBreaksCount) {
            leadingLineBreaksCount = Math.min(lineBreaksCount, NEWLINES_TO_PRESERVE_MAX);
            trailingLineBreaksCount = 0;
          } else {
            if (isNextNodeOfSomeType(path, ["BlockStatement", "ElementNode"])) {
              trailingLineBreaksCount = Math.max(trailingLineBreaksCount, 1);
            }
            if (isPreviousNodeOfSomeType(path, ["BlockStatement", "ElementNode"])) {
              leadingLineBreaksCount = Math.max(leadingLineBreaksCount, 1);
            }
          }
          let leadingSpace = "";
          let trailingSpace = "";
          if (trailingLineBreaksCount === 0 && isNextNodeOfSomeType(path, ["MustacheStatement"])) {
            trailingSpace = " ";
          }
          if (leadingLineBreaksCount === 0 && isPreviousNodeOfSomeType(path, ["MustacheStatement"])) {
            leadingSpace = " ";
          }
          if (isFirstElement) {
            leadingLineBreaksCount = 0;
            leadingSpace = "";
          }
          if (isLastElement) {
            trailingLineBreaksCount = 0;
            trailingSpace = "";
          }
          text = text.replace(/^[\t\n\f\r ]+/g, leadingSpace).replace(/[\t\n\f\r ]+$/, trailingSpace);
          return [...generateHardlines(leadingLineBreaksCount), fill(getTextValueParts(text)), ...generateHardlines(trailingLineBreaksCount)];
        }
        case "MustacheCommentStatement": {
          const start = locStart(node);
          const end = locEnd(node);
          const isLeftWhiteSpaceSensitive = options.originalText.charAt(start + 2) === "~";
          const isRightWhitespaceSensitive = options.originalText.charAt(end - 3) === "~";
          const dashes = node.value.includes("}}") ? "--" : "";
          return ["{{", isLeftWhiteSpaceSensitive ? "~" : "", "!", dashes, node.value, dashes, isRightWhitespaceSensitive ? "~" : "", "}}"];
        }
        case "PathExpression": {
          return node.original;
        }
        case "BooleanLiteral": {
          return String(node.value);
        }
        case "CommentStatement": {
          return ["<!--", node.value, "-->"];
        }
        case "StringLiteral": {
          if (needsOppositeQuote(path)) {
            const printFavoriteQuote = !options.singleQuote ? "'" : '"';
            return printStringLiteral(node.value, printFavoriteQuote);
          }
          return printStringLiteral(node.value, favoriteQuote);
        }
        case "NumberLiteral": {
          return String(node.value);
        }
        case "UndefinedLiteral": {
          return "undefined";
        }
        case "NullLiteral": {
          return "null";
        }
        default:
          throw new Error("unknown glimmer type: " + JSON.stringify(node.type));
      }
    }
    function sortByLoc(a, b) {
      return locStart(a) - locStart(b);
    }
    function printStartingTag(path, print2) {
      const node = path.getValue();
      const types = ["attributes", "modifiers", "comments"].filter((property) => isNonEmptyArray(node[property]));
      const attributes = types.flatMap((type2) => node[type2]).sort(sortByLoc);
      for (const attributeType of types) {
        path.each((attributePath) => {
          const index = attributes.indexOf(attributePath.getValue());
          attributes.splice(index, 1, [line, print2()]);
        }, attributeType);
      }
      if (isNonEmptyArray(node.blockParams)) {
        attributes.push(line, printBlockParams(node));
      }
      return ["<", node.tag, indent(attributes), printStartingTagEndMarker(node)];
    }
    function printChildren(path, options, print2) {
      const node = path.getValue();
      const isEmpty = node.children.every((node2) => isWhitespaceNode(node2));
      if (options.htmlWhitespaceSensitivity === "ignore" && isEmpty) {
        return "";
      }
      return path.map((childPath, childIndex) => {
        const printedChild = print2();
        if (childIndex === 0 && options.htmlWhitespaceSensitivity === "ignore") {
          return [softline, printedChild];
        }
        return printedChild;
      }, "children");
    }
    function printStartingTagEndMarker(node) {
      if (isVoid(node)) {
        return ifBreak([softline, "/>"], [" />", softline]);
      }
      return ifBreak([softline, ">"], ">");
    }
    function printOpeningMustache(node) {
      const mustache = node.escaped === false ? "{{{" : "{{";
      const strip = node.strip && node.strip.open ? "~" : "";
      return [mustache, strip];
    }
    function printClosingMustache(node) {
      const mustache = node.escaped === false ? "}}}" : "}}";
      const strip = node.strip && node.strip.close ? "~" : "";
      return [strip, mustache];
    }
    function printOpeningBlockOpeningMustache(node) {
      const opening = printOpeningMustache(node);
      const strip = node.openStrip.open ? "~" : "";
      return [opening, strip, "#"];
    }
    function printOpeningBlockClosingMustache(node) {
      const closing = printClosingMustache(node);
      const strip = node.openStrip.close ? "~" : "";
      return [strip, closing];
    }
    function printClosingBlockOpeningMustache(node) {
      const opening = printOpeningMustache(node);
      const strip = node.closeStrip.open ? "~" : "";
      return [opening, strip, "/"];
    }
    function printClosingBlockClosingMustache(node) {
      const closing = printClosingMustache(node);
      const strip = node.closeStrip.close ? "~" : "";
      return [strip, closing];
    }
    function printInverseBlockOpeningMustache(node) {
      const opening = printOpeningMustache(node);
      const strip = node.inverseStrip.open ? "~" : "";
      return [opening, strip];
    }
    function printInverseBlockClosingMustache(node) {
      const closing = printClosingMustache(node);
      const strip = node.inverseStrip.close ? "~" : "";
      return [strip, closing];
    }
    function printOpenBlock(path, print2) {
      const node = path.getValue();
      const parts = [];
      const paramsDoc = printParams(path, print2);
      if (paramsDoc) {
        parts.push(group(paramsDoc));
      }
      if (isNonEmptyArray(node.program.blockParams)) {
        parts.push(printBlockParams(node.program));
      }
      return group([printOpeningBlockOpeningMustache(node), printPath(path, print2), parts.length > 0 ? indent([line, join2(line, parts)]) : "", softline, printOpeningBlockClosingMustache(node)]);
    }
    function printElseBlock(node, options) {
      return [options.htmlWhitespaceSensitivity === "ignore" ? hardline : "", printInverseBlockOpeningMustache(node), "else", printInverseBlockClosingMustache(node)];
    }
    function printElseIfLikeBlock(path, print2, ifLikeKeyword) {
      const node = path.getValue();
      const parentNode = path.getParentNode(1);
      return group([printInverseBlockOpeningMustache(parentNode), ["else", " ", ifLikeKeyword], indent([line, group(printParams(path, print2)), ...isNonEmptyArray(node.program.blockParams) ? [line, printBlockParams(node.program)] : []]), softline, printInverseBlockClosingMustache(parentNode)]);
    }
    function printCloseBlock(path, print2, options) {
      const node = path.getValue();
      if (options.htmlWhitespaceSensitivity === "ignore") {
        const escape = blockStatementHasOnlyWhitespaceInProgram(node) ? softline : hardline;
        return [escape, printClosingBlockOpeningMustache(node), print2("path"), printClosingBlockClosingMustache(node)];
      }
      return [printClosingBlockOpeningMustache(node), print2("path"), printClosingBlockClosingMustache(node)];
    }
    function blockStatementHasOnlyWhitespaceInProgram(node) {
      return isNodeOfSomeType(node, ["BlockStatement"]) && node.program.body.every((node2) => isWhitespaceNode(node2));
    }
    function blockStatementHasElseIfLike(node) {
      return blockStatementHasElse(node) && node.inverse.body.length === 1 && isNodeOfSomeType(node.inverse.body[0], ["BlockStatement"]) && node.inverse.body[0].path.parts[0] === node.path.parts[0];
    }
    function blockStatementHasElse(node) {
      return isNodeOfSomeType(node, ["BlockStatement"]) && node.inverse;
    }
    function printProgram(path, print2, options) {
      const node = path.getValue();
      if (blockStatementHasOnlyWhitespaceInProgram(node)) {
        return "";
      }
      const program = print2("program");
      if (options.htmlWhitespaceSensitivity === "ignore") {
        return indent([hardline, program]);
      }
      return indent(program);
    }
    function printInverse(path, print2, options) {
      const node = path.getValue();
      const inverse = print2("inverse");
      const printed = options.htmlWhitespaceSensitivity === "ignore" ? [hardline, inverse] : inverse;
      if (blockStatementHasElseIfLike(node)) {
        return printed;
      }
      if (blockStatementHasElse(node)) {
        return [printElseBlock(node, options), indent(printed)];
      }
      return "";
    }
    function getTextValueParts(value) {
      return getDocParts(join2(line, splitByHtmlWhitespace(value)));
    }
    function splitByHtmlWhitespace(string) {
      return string.split(/[\t\n\f\r ]+/);
    }
    function getCurrentAttributeName(path) {
      for (let depth = 0; depth < 2; depth++) {
        const parentNode = path.getParentNode(depth);
        if (parentNode && parentNode.type === "AttrNode") {
          return parentNode.name.toLowerCase();
        }
      }
    }
    function countNewLines(string) {
      string = typeof string === "string" ? string : "";
      return string.split("\n").length - 1;
    }
    function countLeadingNewLines(string) {
      string = typeof string === "string" ? string : "";
      const newLines = (string.match(/^([^\S\n\r]*[\n\r])+/g) || [])[0] || "";
      return countNewLines(newLines);
    }
    function countTrailingNewLines(string) {
      string = typeof string === "string" ? string : "";
      const newLines = (string.match(/([\n\r][^\S\n\r]*)+$/g) || [])[0] || "";
      return countNewLines(newLines);
    }
    function generateHardlines() {
      let number = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
      return Array.from({
        length: Math.min(number, NEWLINES_TO_PRESERVE_MAX)
      }).fill(hardline);
    }
    function printStringLiteral(stringLiteral, favoriteQuote) {
      const {
        quote,
        regex
      } = getPreferredQuote(stringLiteral, favoriteQuote);
      return [quote, stringLiteral.replace(regex, `\\${quote}`), quote];
    }
    function needsOppositeQuote(path) {
      let index = 0;
      let parentNode = path.getParentNode(index);
      while (parentNode && isNodeOfSomeType(parentNode, ["SubExpression"])) {
        index++;
        parentNode = path.getParentNode(index);
      }
      if (parentNode && isNodeOfSomeType(path.getParentNode(index + 1), ["ConcatStatement"]) && isNodeOfSomeType(path.getParentNode(index + 2), ["AttrNode"])) {
        return true;
      }
      return false;
    }
    function printSubExpressionPathAndParams(path, print2) {
      const printed = printPath(path, print2);
      const params = printParams(path, print2);
      if (!params) {
        return printed;
      }
      return indent([printed, line, group(params)]);
    }
    function printPathAndParams(path, print2) {
      const p = printPath(path, print2);
      const params = printParams(path, print2);
      if (!params) {
        return p;
      }
      return [indent([p, line, params]), softline];
    }
    function printPath(path, print2) {
      return print2("path");
    }
    function printParams(path, print2) {
      const node = path.getValue();
      const parts = [];
      if (node.params.length > 0) {
        const params = path.map(print2, "params");
        parts.push(...params);
      }
      if (node.hash && node.hash.pairs.length > 0) {
        const hash = print2("hash");
        parts.push(hash);
      }
      if (parts.length === 0) {
        return "";
      }
      return join2(line, parts);
    }
    function printBlockParams(node) {
      return ["as |", node.blockParams.join(" "), "|"];
    }
    module.exports = {
      print,
      massageAstNode: clean
    };
  }
});
var require_parsers3 = __commonJS2({
  "src/language-handlebars/parsers.js"() {
    init_define_process();
  }
});
var require_Handlebars = __commonJS2({
  "node_modules/linguist-languages/data/Handlebars.json"(exports, module) {
    module.exports = {
      name: "Handlebars",
      type: "markup",
      color: "#f7931e",
      aliases: ["hbs", "htmlbars"],
      extensions: [".handlebars", ".hbs"],
      tmScope: "text.html.handlebars",
      aceMode: "handlebars",
      languageId: 155
    };
  }
});
var require_language_handlebars = __commonJS2({
  "src/language-handlebars/index.js"(exports, module) {
    "use strict";
    init_define_process();
    var createLanguage = require_create_language();
    var printer = require_printer_glimmer();
    var parsers = require_parsers3();
    var languages = [createLanguage(require_Handlebars(), () => ({
      since: "2.3.0",
      parsers: ["glimmer"],
      vscodeLanguageIds: ["handlebars"]
    }))];
    var printers = {
      glimmer: printer
    };
    module.exports = {
      languages,
      printers,
      parsers
    };
  }
});
var require_pragma3 = __commonJS2({
  "src/language-graphql/pragma.js"(exports, module) {
    "use strict";
    init_define_process();
    function hasPragma(text) {
      return /^\s*#[^\S\n]*@(?:format|prettier)\s*(?:\n|$)/.test(text);
    }
    function insertPragma(text) {
      return "# @format\n\n" + text;
    }
    module.exports = {
      hasPragma,
      insertPragma
    };
  }
});
var require_loc4 = __commonJS2({
  "src/language-graphql/loc.js"(exports, module) {
    "use strict";
    init_define_process();
    function locStart(node) {
      if (typeof node.start === "number") {
        return node.start;
      }
      return node.loc && node.loc.start;
    }
    function locEnd(node) {
      if (typeof node.end === "number") {
        return node.end;
      }
      return node.loc && node.loc.end;
    }
    module.exports = {
      locStart,
      locEnd
    };
  }
});
var require_printer_graphql = __commonJS2({
  "src/language-graphql/printer-graphql.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      builders: {
        join: join2,
        hardline,
        line,
        softline,
        group,
        indent,
        ifBreak
      }
    } = require_document();
    var {
      isNextLineEmpty,
      isNonEmptyArray
    } = require_util();
    var {
      insertPragma
    } = require_pragma3();
    var {
      locStart,
      locEnd
    } = require_loc4();
    function genericPrint(path, options, print) {
      const node = path.getValue();
      if (!node) {
        return "";
      }
      if (typeof node === "string") {
        return node;
      }
      switch (node.kind) {
        case "Document": {
          const parts = [];
          path.each((pathChild, index, definitions) => {
            parts.push(print());
            if (index !== definitions.length - 1) {
              parts.push(hardline);
              if (isNextLineEmpty(options.originalText, pathChild.getValue(), locEnd)) {
                parts.push(hardline);
              }
            }
          }, "definitions");
          return [...parts, hardline];
        }
        case "OperationDefinition": {
          const hasOperation = options.originalText[locStart(node)] !== "{";
          const hasName = Boolean(node.name);
          return [hasOperation ? node.operation : "", hasOperation && hasName ? [" ", print("name")] : "", hasOperation && !hasName && isNonEmptyArray(node.variableDefinitions) ? " " : "", isNonEmptyArray(node.variableDefinitions) ? group(["(", indent([softline, join2([ifBreak("", ", "), softline], path.map(print, "variableDefinitions"))]), softline, ")"]) : "", printDirectives(path, print, node), node.selectionSet ? !hasOperation && !hasName ? "" : " " : "", print("selectionSet")];
        }
        case "FragmentDefinition": {
          return ["fragment ", print("name"), isNonEmptyArray(node.variableDefinitions) ? group(["(", indent([softline, join2([ifBreak("", ", "), softline], path.map(print, "variableDefinitions"))]), softline, ")"]) : "", " on ", print("typeCondition"), printDirectives(path, print, node), " ", print("selectionSet")];
        }
        case "SelectionSet": {
          return ["{", indent([hardline, join2(hardline, printSequence(path, options, print, "selections"))]), hardline, "}"];
        }
        case "Field": {
          return group([node.alias ? [print("alias"), ": "] : "", print("name"), node.arguments.length > 0 ? group(["(", indent([softline, join2([ifBreak("", ", "), softline], printSequence(path, options, print, "arguments"))]), softline, ")"]) : "", printDirectives(path, print, node), node.selectionSet ? " " : "", print("selectionSet")]);
        }
        case "Name": {
          return node.value;
        }
        case "StringValue": {
          if (node.block) {
            const lines = node.value.replace(/"""/g, "\\$&").split("\n");
            if (lines.length === 1) {
              lines[0] = lines[0].trim();
            }
            if (lines.every((line2) => line2 === "")) {
              lines.length = 0;
            }
            return join2(hardline, ['"""', ...lines, '"""']);
          }
          return ['"', node.value.replace(/["\\]/g, "\\$&").replace(/\n/g, "\\n"), '"'];
        }
        case "IntValue":
        case "FloatValue":
        case "EnumValue": {
          return node.value;
        }
        case "BooleanValue": {
          return node.value ? "true" : "false";
        }
        case "NullValue": {
          return "null";
        }
        case "Variable": {
          return ["$", print("name")];
        }
        case "ListValue": {
          return group(["[", indent([softline, join2([ifBreak("", ", "), softline], path.map(print, "values"))]), softline, "]"]);
        }
        case "ObjectValue": {
          return group(["{", options.bracketSpacing && node.fields.length > 0 ? " " : "", indent([softline, join2([ifBreak("", ", "), softline], path.map(print, "fields"))]), softline, ifBreak("", options.bracketSpacing && node.fields.length > 0 ? " " : ""), "}"]);
        }
        case "ObjectField":
        case "Argument": {
          return [print("name"), ": ", print("value")];
        }
        case "Directive": {
          return ["@", print("name"), node.arguments.length > 0 ? group(["(", indent([softline, join2([ifBreak("", ", "), softline], printSequence(path, options, print, "arguments"))]), softline, ")"]) : ""];
        }
        case "NamedType": {
          return print("name");
        }
        case "VariableDefinition": {
          return [print("variable"), ": ", print("type"), node.defaultValue ? [" = ", print("defaultValue")] : "", printDirectives(path, print, node)];
        }
        case "ObjectTypeExtension":
        case "ObjectTypeDefinition": {
          return [print("description"), node.description ? hardline : "", node.kind === "ObjectTypeExtension" ? "extend " : "", "type ", print("name"), node.interfaces.length > 0 ? [" implements ", ...printInterfaces(path, options, print)] : "", printDirectives(path, print, node), node.fields.length > 0 ? [" {", indent([hardline, join2(hardline, printSequence(path, options, print, "fields"))]), hardline, "}"] : ""];
        }
        case "FieldDefinition": {
          return [print("description"), node.description ? hardline : "", print("name"), node.arguments.length > 0 ? group(["(", indent([softline, join2([ifBreak("", ", "), softline], printSequence(path, options, print, "arguments"))]), softline, ")"]) : "", ": ", print("type"), printDirectives(path, print, node)];
        }
        case "DirectiveDefinition": {
          return [print("description"), node.description ? hardline : "", "directive ", "@", print("name"), node.arguments.length > 0 ? group(["(", indent([softline, join2([ifBreak("", ", "), softline], printSequence(path, options, print, "arguments"))]), softline, ")"]) : "", node.repeatable ? " repeatable" : "", " on ", join2(" | ", path.map(print, "locations"))];
        }
        case "EnumTypeExtension":
        case "EnumTypeDefinition": {
          return [print("description"), node.description ? hardline : "", node.kind === "EnumTypeExtension" ? "extend " : "", "enum ", print("name"), printDirectives(path, print, node), node.values.length > 0 ? [" {", indent([hardline, join2(hardline, printSequence(path, options, print, "values"))]), hardline, "}"] : ""];
        }
        case "EnumValueDefinition": {
          return [print("description"), node.description ? hardline : "", print("name"), printDirectives(path, print, node)];
        }
        case "InputValueDefinition": {
          return [print("description"), node.description ? node.description.block ? hardline : line : "", print("name"), ": ", print("type"), node.defaultValue ? [" = ", print("defaultValue")] : "", printDirectives(path, print, node)];
        }
        case "InputObjectTypeExtension":
        case "InputObjectTypeDefinition": {
          return [print("description"), node.description ? hardline : "", node.kind === "InputObjectTypeExtension" ? "extend " : "", "input ", print("name"), printDirectives(path, print, node), node.fields.length > 0 ? [" {", indent([hardline, join2(hardline, printSequence(path, options, print, "fields"))]), hardline, "}"] : ""];
        }
        case "SchemaExtension": {
          return ["extend schema", printDirectives(path, print, node), ...node.operationTypes.length > 0 ? [" {", indent([hardline, join2(hardline, printSequence(path, options, print, "operationTypes"))]), hardline, "}"] : []];
        }
        case "SchemaDefinition": {
          return [print("description"), node.description ? hardline : "", "schema", printDirectives(path, print, node), " {", node.operationTypes.length > 0 ? indent([hardline, join2(hardline, printSequence(path, options, print, "operationTypes"))]) : "", hardline, "}"];
        }
        case "OperationTypeDefinition": {
          return [print("operation"), ": ", print("type")];
        }
        case "InterfaceTypeExtension":
        case "InterfaceTypeDefinition": {
          return [print("description"), node.description ? hardline : "", node.kind === "InterfaceTypeExtension" ? "extend " : "", "interface ", print("name"), node.interfaces.length > 0 ? [" implements ", ...printInterfaces(path, options, print)] : "", printDirectives(path, print, node), node.fields.length > 0 ? [" {", indent([hardline, join2(hardline, printSequence(path, options, print, "fields"))]), hardline, "}"] : ""];
        }
        case "FragmentSpread": {
          return ["...", print("name"), printDirectives(path, print, node)];
        }
        case "InlineFragment": {
          return ["...", node.typeCondition ? [" on ", print("typeCondition")] : "", printDirectives(path, print, node), " ", print("selectionSet")];
        }
        case "UnionTypeExtension":
        case "UnionTypeDefinition": {
          return group([print("description"), node.description ? hardline : "", group([node.kind === "UnionTypeExtension" ? "extend " : "", "union ", print("name"), printDirectives(path, print, node), node.types.length > 0 ? [" =", ifBreak("", " "), indent([ifBreak([line, "  "]), join2([line, "| "], path.map(print, "types"))])] : ""])]);
        }
        case "ScalarTypeExtension":
        case "ScalarTypeDefinition": {
          return [print("description"), node.description ? hardline : "", node.kind === "ScalarTypeExtension" ? "extend " : "", "scalar ", print("name"), printDirectives(path, print, node)];
        }
        case "NonNullType": {
          return [print("type"), "!"];
        }
        case "ListType": {
          return ["[", print("type"), "]"];
        }
        default:
          throw new Error("unknown graphql type: " + JSON.stringify(node.kind));
      }
    }
    function printDirectives(path, print, node) {
      if (node.directives.length === 0) {
        return "";
      }
      const printed = join2(line, path.map(print, "directives"));
      if (node.kind === "FragmentDefinition" || node.kind === "OperationDefinition") {
        return group([line, printed]);
      }
      return [" ", group(indent([softline, printed]))];
    }
    function printSequence(path, options, print, property) {
      return path.map((path2, index, sequence) => {
        const printed = print();
        if (index < sequence.length - 1 && isNextLineEmpty(options.originalText, path2.getValue(), locEnd)) {
          return [printed, hardline];
        }
        return printed;
      }, property);
    }
    function canAttachComment(node) {
      return node.kind && node.kind !== "Comment";
    }
    function printComment(commentPath) {
      const comment = commentPath.getValue();
      if (comment.kind === "Comment") {
        return "#" + comment.value.trimEnd();
      }
      throw new Error("Not a comment: " + JSON.stringify(comment));
    }
    function printInterfaces(path, options, print) {
      const node = path.getNode();
      const parts = [];
      const {
        interfaces
      } = node;
      const printed = path.map((node2) => print(node2), "interfaces");
      for (let index = 0; index < interfaces.length; index++) {
        const interfaceNode = interfaces[index];
        parts.push(printed[index]);
        const nextInterfaceNode = interfaces[index + 1];
        if (nextInterfaceNode) {
          const textBetween = options.originalText.slice(interfaceNode.loc.end, nextInterfaceNode.loc.start);
          const hasComment = textBetween.includes("#");
          const separator = textBetween.replace(/#.*/g, "").trim();
          parts.push(separator === "," ? "," : " &", hasComment ? line : " ");
        }
      }
      return parts;
    }
    function clean(node, newNode) {
      if (node.kind === "StringValue" && node.block && !node.value.includes("\n")) {
        newNode.value = newNode.value.trim();
      }
    }
    clean.ignoredProperties = /* @__PURE__ */ new Set(["loc", "comments"]);
    function hasPrettierIgnore(path) {
      var _node$comments;
      const node = path.getValue();
      return node === null || node === void 0 ? void 0 : (_node$comments = node.comments) === null || _node$comments === void 0 ? void 0 : _node$comments.some((comment) => comment.value.trim() === "prettier-ignore");
    }
    module.exports = {
      print: genericPrint,
      massageAstNode: clean,
      hasPrettierIgnore,
      insertPragma,
      printComment,
      canAttachComment
    };
  }
});
var require_options4 = __commonJS2({
  "src/language-graphql/options.js"(exports, module) {
    "use strict";
    init_define_process();
    var commonOptions = require_common_options();
    module.exports = {
      bracketSpacing: commonOptions.bracketSpacing
    };
  }
});
var require_parsers4 = __commonJS2({
  "src/language-graphql/parsers.js"() {
    init_define_process();
  }
});
var require_GraphQL = __commonJS2({
  "node_modules/linguist-languages/data/GraphQL.json"(exports, module) {
    module.exports = {
      name: "GraphQL",
      type: "data",
      color: "#e10098",
      extensions: [".graphql", ".gql", ".graphqls"],
      tmScope: "source.graphql",
      aceMode: "text",
      languageId: 139
    };
  }
});
var require_language_graphql = __commonJS2({
  "src/language-graphql/index.js"(exports, module) {
    "use strict";
    init_define_process();
    var createLanguage = require_create_language();
    var printer = require_printer_graphql();
    var options = require_options4();
    var parsers = require_parsers4();
    var languages = [createLanguage(require_GraphQL(), () => ({
      since: "1.5.0",
      parsers: ["graphql"],
      vscodeLanguageIds: ["graphql"]
    }))];
    var printers = {
      graphql: printer
    };
    module.exports = {
      languages,
      options,
      printers,
      parsers
    };
  }
});
var require_collapse_white_space = __commonJS2({
  "node_modules/collapse-white-space/index.js"(exports, module) {
    "use strict";
    init_define_process();
    module.exports = collapse;
    function collapse(value) {
      return String(value).replace(/\s+/g, " ");
    }
  }
});
var require_loc5 = __commonJS2({
  "src/language-markdown/loc.js"(exports, module) {
    "use strict";
    init_define_process();
    function locStart(node) {
      return node.position.start.offset;
    }
    function locEnd(node) {
      return node.position.end.offset;
    }
    module.exports = {
      locStart,
      locEnd
    };
  }
});
var require_constants_evaluate = __commonJS2({
  "src/language-markdown/constants.evaluate.js"(exports, module) {
    module.exports = {
      cjkPattern: "(?:[\\u02ea-\\u02eb\\u1100-\\u11ff\\u2e80-\\u2e99\\u2e9b-\\u2ef3\\u2f00-\\u2fd5\\u2ff0-\\u303f\\u3041-\\u3096\\u3099-\\u309f\\u30a1-\\u30fa\\u30fc-\\u30ff\\u3105-\\u312f\\u3131-\\u318e\\u3190-\\u3191\\u3196-\\u31ba\\u31c0-\\u31e3\\u31f0-\\u321e\\u322a-\\u3247\\u3260-\\u327e\\u328a-\\u32b0\\u32c0-\\u32cb\\u32d0-\\u3370\\u337b-\\u337f\\u33e0-\\u33fe\\u3400-\\u4db5\\u4e00-\\u9fef\\ua960-\\ua97c\\uac00-\\ud7a3\\ud7b0-\\ud7c6\\ud7cb-\\ud7fb\\uf900-\\ufa6d\\ufa70-\\ufad9\\ufe10-\\ufe1f\\ufe30-\\ufe6f\\uff00-\\uffef]|[\\ud840-\\ud868\\ud86a-\\ud86c\\ud86f-\\ud872\\ud874-\\ud879][\\udc00-\\udfff]|\\ud82c[\\udc00-\\udd1e\\udd50-\\udd52\\udd64-\\udd67]|\\ud83c[\\ude00\\ude50-\\ude51]|\\ud869[\\udc00-\\uded6\\udf00-\\udfff]|\\ud86d[\\udc00-\\udf34\\udf40-\\udfff]|\\ud86e[\\udc00-\\udc1d\\udc20-\\udfff]|\\ud873[\\udc00-\\udea1\\udeb0-\\udfff]|\\ud87a[\\udc00-\\udfe0]|\\ud87e[\\udc00-\\ude1d])(?:[\\ufe00-\\ufe0f]|\\udb40[\\udd00-\\uddef])?",
      kPattern: "[\\u1100-\\u11ff\\u3001-\\u3003\\u3008-\\u3011\\u3013-\\u301f\\u302e-\\u3030\\u3037\\u30fb\\u3131-\\u318e\\u3200-\\u321e\\u3260-\\u327e\\ua960-\\ua97c\\uac00-\\ud7a3\\ud7b0-\\ud7c6\\ud7cb-\\ud7fb\\ufe45-\\ufe46\\uff61-\\uff65\\uffa0-\\uffbe\\uffc2-\\uffc7\\uffca-\\uffcf\\uffd2-\\uffd7\\uffda-\\uffdc]",
      punctuationPattern: "[\\u0021-\\u002f\\u003a-\\u0040\\u005b-\\u0060\\u007b-\\u007e\\u00a1\\u00a7\\u00ab\\u00b6-\\u00b7\\u00bb\\u00bf\\u037e\\u0387\\u055a-\\u055f\\u0589-\\u058a\\u05be\\u05c0\\u05c3\\u05c6\\u05f3-\\u05f4\\u0609-\\u060a\\u060c-\\u060d\\u061b\\u061e-\\u061f\\u066a-\\u066d\\u06d4\\u0700-\\u070d\\u07f7-\\u07f9\\u0830-\\u083e\\u085e\\u0964-\\u0965\\u0970\\u09fd\\u0a76\\u0af0\\u0c77\\u0c84\\u0df4\\u0e4f\\u0e5a-\\u0e5b\\u0f04-\\u0f12\\u0f14\\u0f3a-\\u0f3d\\u0f85\\u0fd0-\\u0fd4\\u0fd9-\\u0fda\\u104a-\\u104f\\u10fb\\u1360-\\u1368\\u1400\\u166e\\u169b-\\u169c\\u16eb-\\u16ed\\u1735-\\u1736\\u17d4-\\u17d6\\u17d8-\\u17da\\u1800-\\u180a\\u1944-\\u1945\\u1a1e-\\u1a1f\\u1aa0-\\u1aa6\\u1aa8-\\u1aad\\u1b5a-\\u1b60\\u1bfc-\\u1bff\\u1c3b-\\u1c3f\\u1c7e-\\u1c7f\\u1cc0-\\u1cc7\\u1cd3\\u2010-\\u2027\\u2030-\\u2043\\u2045-\\u2051\\u2053-\\u205e\\u207d-\\u207e\\u208d-\\u208e\\u2308-\\u230b\\u2329-\\u232a\\u2768-\\u2775\\u27c5-\\u27c6\\u27e6-\\u27ef\\u2983-\\u2998\\u29d8-\\u29db\\u29fc-\\u29fd\\u2cf9-\\u2cfc\\u2cfe-\\u2cff\\u2d70\\u2e00-\\u2e2e\\u2e30-\\u2e4f\\u3001-\\u3003\\u3008-\\u3011\\u3014-\\u301f\\u3030\\u303d\\u30a0\\u30fb\\ua4fe-\\ua4ff\\ua60d-\\ua60f\\ua673\\ua67e\\ua6f2-\\ua6f7\\ua874-\\ua877\\ua8ce-\\ua8cf\\ua8f8-\\ua8fa\\ua8fc\\ua92e-\\ua92f\\ua95f\\ua9c1-\\ua9cd\\ua9de-\\ua9df\\uaa5c-\\uaa5f\\uaade-\\uaadf\\uaaf0-\\uaaf1\\uabeb\\ufd3e-\\ufd3f\\ufe10-\\ufe19\\ufe30-\\ufe52\\ufe54-\\ufe61\\ufe63\\ufe68\\ufe6a-\\ufe6b\\uff01-\\uff03\\uff05-\\uff0a\\uff0c-\\uff0f\\uff1a-\\uff1b\\uff1f-\\uff20\\uff3b-\\uff3d\\uff3f\\uff5b\\uff5d\\uff5f-\\uff65]|\\ud800[\\udd00-\\udd02\\udf9f\\udfd0]|\\ud801[\\udd6f]|\\ud802[\\udc57\\udd1f\\udd3f\\ude50-\\ude58\\ude7f\\udef0-\\udef6\\udf39-\\udf3f\\udf99-\\udf9c]|\\ud803[\\udf55-\\udf59]|\\ud804[\\udc47-\\udc4d\\udcbb-\\udcbc\\udcbe-\\udcc1\\udd40-\\udd43\\udd74-\\udd75\\uddc5-\\uddc8\\uddcd\\udddb\\udddd-\\udddf\\ude38-\\ude3d\\udea9]|\\ud805[\\udc4b-\\udc4f\\udc5b\\udc5d\\udcc6\\uddc1-\\uddd7\\ude41-\\ude43\\ude60-\\ude6c\\udf3c-\\udf3e]|\\ud806[\\udc3b\\udde2\\ude3f-\\ude46\\ude9a-\\ude9c\\ude9e-\\udea2]|\\ud807[\\udc41-\\udc45\\udc70-\\udc71\\udef7-\\udef8\\udfff]|\\ud809[\\udc70-\\udc74]|\\ud81a[\\ude6e-\\ude6f\\udef5\\udf37-\\udf3b\\udf44]|\\ud81b[\\ude97-\\ude9a\\udfe2]|\\ud82f[\\udc9f]|\\ud836[\\ude87-\\ude8b]|\\ud83a[\\udd5e-\\udd5f]"
    };
  }
});
var require_utils6 = __commonJS2({
  "src/language-markdown/utils.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      getLast
    } = require_util();
    var {
      locStart,
      locEnd
    } = require_loc5();
    var {
      cjkPattern,
      kPattern,
      punctuationPattern
    } = require_constants_evaluate();
    var INLINE_NODE_TYPES = ["liquidNode", "inlineCode", "emphasis", "esComment", "strong", "delete", "wikiLink", "link", "linkReference", "image", "imageReference", "footnote", "footnoteReference", "sentence", "whitespace", "word", "break", "inlineMath"];
    var INLINE_NODE_WRAPPER_TYPES = [...INLINE_NODE_TYPES, "tableCell", "paragraph", "heading"];
    var kRegex = new RegExp(kPattern);
    var punctuationRegex = new RegExp(punctuationPattern);
    function splitText(text, options) {
      const KIND_NON_CJK = "non-cjk";
      const KIND_CJ_LETTER = "cj-letter";
      const KIND_K_LETTER = "k-letter";
      const KIND_CJK_PUNCTUATION = "cjk-punctuation";
      const nodes = [];
      const tokens = (options.proseWrap === "preserve" ? text : text.replace(new RegExp(`(${cjkPattern})
(${cjkPattern})`, "g"), "$1$2")).split(/([\t\n ]+)/);
      for (const [index, token] of tokens.entries()) {
        if (index % 2 === 1) {
          nodes.push({
            type: "whitespace",
            value: /\n/.test(token) ? "\n" : " "
          });
          continue;
        }
        if ((index === 0 || index === tokens.length - 1) && token === "") {
          continue;
        }
        const innerTokens = token.split(new RegExp(`(${cjkPattern})`));
        for (const [innerIndex, innerToken] of innerTokens.entries()) {
          if ((innerIndex === 0 || innerIndex === innerTokens.length - 1) && innerToken === "") {
            continue;
          }
          if (innerIndex % 2 === 0) {
            if (innerToken !== "") {
              appendNode({
                type: "word",
                value: innerToken,
                kind: KIND_NON_CJK,
                hasLeadingPunctuation: punctuationRegex.test(innerToken[0]),
                hasTrailingPunctuation: punctuationRegex.test(getLast(innerToken))
              });
            }
            continue;
          }
          appendNode(punctuationRegex.test(innerToken) ? {
            type: "word",
            value: innerToken,
            kind: KIND_CJK_PUNCTUATION,
            hasLeadingPunctuation: true,
            hasTrailingPunctuation: true
          } : {
            type: "word",
            value: innerToken,
            kind: kRegex.test(innerToken) ? KIND_K_LETTER : KIND_CJ_LETTER,
            hasLeadingPunctuation: false,
            hasTrailingPunctuation: false
          });
        }
      }
      return nodes;
      function appendNode(node) {
        const lastNode = getLast(nodes);
        if (lastNode && lastNode.type === "word") {
          if (lastNode.kind === KIND_NON_CJK && node.kind === KIND_CJ_LETTER && !lastNode.hasTrailingPunctuation || lastNode.kind === KIND_CJ_LETTER && node.kind === KIND_NON_CJK && !node.hasLeadingPunctuation) {
            nodes.push({
              type: "whitespace",
              value: " "
            });
          } else if (!isBetween(KIND_NON_CJK, KIND_CJK_PUNCTUATION) && ![lastNode.value, node.value].some((value) => /\u3000/.test(value))) {
            nodes.push({
              type: "whitespace",
              value: ""
            });
          }
        }
        nodes.push(node);
        function isBetween(kind1, kind2) {
          return lastNode.kind === kind1 && node.kind === kind2 || lastNode.kind === kind2 && node.kind === kind1;
        }
      }
    }
    function getOrderedListItemInfo(orderListItem, originalText) {
      const [, numberText, marker, leadingSpaces] = originalText.slice(orderListItem.position.start.offset, orderListItem.position.end.offset).match(/^\s*(\d+)(\.|\))(\s*)/);
      return {
        numberText,
        marker,
        leadingSpaces
      };
    }
    function hasGitDiffFriendlyOrderedList(node, options) {
      if (!node.ordered) {
        return false;
      }
      if (node.children.length < 2) {
        return false;
      }
      const firstNumber = Number(getOrderedListItemInfo(node.children[0], options.originalText).numberText);
      const secondNumber = Number(getOrderedListItemInfo(node.children[1], options.originalText).numberText);
      if (firstNumber === 0 && node.children.length > 2) {
        const thirdNumber = Number(getOrderedListItemInfo(node.children[2], options.originalText).numberText);
        return secondNumber === 1 && thirdNumber === 1;
      }
      return secondNumber === 1;
    }
    function getFencedCodeBlockValue(node, originalText) {
      const {
        value
      } = node;
      if (node.position.end.offset === originalText.length && value.endsWith("\n") && originalText.endsWith("\n")) {
        return value.slice(0, -1);
      }
      return value;
    }
    function mapAst(ast, handler) {
      return function preorder(node, index, parentStack) {
        const newNode = Object.assign({}, handler(node, index, parentStack));
        if (newNode.children) {
          newNode.children = newNode.children.map((child, index2) => preorder(child, index2, [newNode, ...parentStack]));
        }
        return newNode;
      }(ast, null, []);
    }
    function isAutolink(node) {
      if ((node === null || node === void 0 ? void 0 : node.type) !== "link" || node.children.length !== 1) {
        return false;
      }
      const [child] = node.children;
      return locStart(node) === locStart(child) && locEnd(node) === locEnd(child);
    }
    module.exports = {
      mapAst,
      splitText,
      punctuationPattern,
      getFencedCodeBlockValue,
      getOrderedListItemInfo,
      hasGitDiffFriendlyOrderedList,
      INLINE_NODE_TYPES,
      INLINE_NODE_WRAPPER_TYPES,
      isAutolink
    };
  }
});
var require_embed3 = __commonJS2({
  "src/language-markdown/embed.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      inferParserByLanguage,
      getMaxContinuousCount
    } = require_util();
    var {
      builders: {
        hardline,
        markAsRoot
      },
      utils: {
        replaceEndOfLine
      }
    } = require_document();
    var printFrontMatter = require_print();
    var {
      getFencedCodeBlockValue
    } = require_utils6();
    function embed(path, print, textToDoc, options) {
      const node = path.getValue();
      if (node.type === "code" && node.lang !== null) {
        const parser = inferParserByLanguage(node.lang, options);
        if (parser) {
          const styleUnit = options.__inJsTemplate ? "~" : "`";
          const style = styleUnit.repeat(Math.max(3, getMaxContinuousCount(node.value, styleUnit) + 1));
          const newOptions = {
            parser
          };
          if (node.lang === "tsx") {
            newOptions.filepath = "dummy.tsx";
          }
          const doc = textToDoc(getFencedCodeBlockValue(node, options.originalText), newOptions, {
            stripTrailingHardline: true
          });
          return markAsRoot([style, node.lang, node.meta ? " " + node.meta : "", hardline, replaceEndOfLine(doc), hardline, style]);
        }
      }
      switch (node.type) {
        case "front-matter":
          return printFrontMatter(node, textToDoc);
        case "importExport":
          return [textToDoc(node.value, {
            parser: "babel"
          }, {
            stripTrailingHardline: true
          }), hardline];
        case "jsx":
          return textToDoc(`<$>${node.value}</$>`, {
            parser: "__js_expression",
            rootMarker: "mdx"
          }, {
            stripTrailingHardline: true
          });
      }
      return null;
    }
    module.exports = embed;
  }
});
var require_pragma4 = __commonJS2({
  "src/language-markdown/pragma.js"(exports, module) {
    "use strict";
    init_define_process();
    var parseFrontMatter = require_parse();
    var pragmas = ["format", "prettier"];
    function startWithPragma(text) {
      const pragma = `@(${pragmas.join("|")})`;
      const regex = new RegExp([`<!--\\s*${pragma}\\s*-->`, `{\\s*\\/\\*\\s*${pragma}\\s*\\*\\/\\s*}`, `<!--.*\r?
[\\s\\S]*(^|
)[^\\S
]*${pragma}[^\\S
]*($|
)[\\s\\S]*
.*-->`].join("|"), "m");
      const matched = text.match(regex);
      return (matched === null || matched === void 0 ? void 0 : matched.index) === 0;
    }
    module.exports = {
      startWithPragma,
      hasPragma: (text) => startWithPragma(parseFrontMatter(text).content.trimStart()),
      insertPragma: (text) => {
        const extracted = parseFrontMatter(text);
        const pragma = `<!-- @${pragmas[0]} -->`;
        return extracted.frontMatter ? `${extracted.frontMatter.raw}

${pragma}

${extracted.content}` : `${pragma}

${extracted.content}`;
      }
    };
  }
});
var require_print_preprocess2 = __commonJS2({
  "src/language-markdown/print-preprocess.js"(exports, module) {
    "use strict";
    init_define_process();
    var getLast = require_get_last();
    var {
      getOrderedListItemInfo,
      mapAst,
      splitText
    } = require_utils6();
    var isSingleCharRegex = /^.$/su;
    function preprocess(ast, options) {
      ast = restoreUnescapedCharacter(ast, options);
      ast = mergeContinuousTexts(ast);
      ast = transformInlineCode(ast, options);
      ast = transformIndentedCodeblockAndMarkItsParentList(ast, options);
      ast = markAlignedList(ast, options);
      ast = splitTextIntoSentences(ast, options);
      ast = transformImportExport(ast);
      ast = mergeContinuousImportExport(ast);
      return ast;
    }
    function transformImportExport(ast) {
      return mapAst(ast, (node) => {
        if (node.type !== "import" && node.type !== "export") {
          return node;
        }
        return Object.assign(Object.assign({}, node), {}, {
          type: "importExport"
        });
      });
    }
    function transformInlineCode(ast, options) {
      return mapAst(ast, (node) => {
        if (node.type !== "inlineCode" || options.proseWrap === "preserve") {
          return node;
        }
        return Object.assign(Object.assign({}, node), {}, {
          value: node.value.replace(/\s+/g, " ")
        });
      });
    }
    function restoreUnescapedCharacter(ast, options) {
      return mapAst(ast, (node) => node.type !== "text" || node.value === "*" || node.value === "_" || !isSingleCharRegex.test(node.value) || node.position.end.offset - node.position.start.offset === node.value.length ? node : Object.assign(Object.assign({}, node), {}, {
        value: options.originalText.slice(node.position.start.offset, node.position.end.offset)
      }));
    }
    function mergeContinuousImportExport(ast) {
      return mergeChildren(ast, (prevNode, node) => prevNode.type === "importExport" && node.type === "importExport", (prevNode, node) => ({
        type: "importExport",
        value: prevNode.value + "\n\n" + node.value,
        position: {
          start: prevNode.position.start,
          end: node.position.end
        }
      }));
    }
    function mergeChildren(ast, shouldMerge, mergeNode) {
      return mapAst(ast, (node) => {
        if (!node.children) {
          return node;
        }
        const children = node.children.reduce((current, child) => {
          const lastChild = getLast(current);
          if (lastChild && shouldMerge(lastChild, child)) {
            current.splice(-1, 1, mergeNode(lastChild, child));
          } else {
            current.push(child);
          }
          return current;
        }, []);
        return Object.assign(Object.assign({}, node), {}, {
          children
        });
      });
    }
    function mergeContinuousTexts(ast) {
      return mergeChildren(ast, (prevNode, node) => prevNode.type === "text" && node.type === "text", (prevNode, node) => ({
        type: "text",
        value: prevNode.value + node.value,
        position: {
          start: prevNode.position.start,
          end: node.position.end
        }
      }));
    }
    function splitTextIntoSentences(ast, options) {
      return mapAst(ast, (node, index, _ref71) => {
        let [parentNode] = _ref71;
        if (node.type !== "text") {
          return node;
        }
        let {
          value
        } = node;
        if (parentNode.type === "paragraph") {
          if (index === 0) {
            value = value.trimStart();
          }
          if (index === parentNode.children.length - 1) {
            value = value.trimEnd();
          }
        }
        return {
          type: "sentence",
          position: node.position,
          children: splitText(value, options)
        };
      });
    }
    function transformIndentedCodeblockAndMarkItsParentList(ast, options) {
      return mapAst(ast, (node, index, parentStack) => {
        if (node.type === "code") {
          const isIndented = /^\n?(?: {4,}|\t)/.test(options.originalText.slice(node.position.start.offset, node.position.end.offset));
          node.isIndented = isIndented;
          if (isIndented) {
            for (let i = 0; i < parentStack.length; i++) {
              const parent = parentStack[i];
              if (parent.hasIndentedCodeblock) {
                break;
              }
              if (parent.type === "list") {
                parent.hasIndentedCodeblock = true;
              }
            }
          }
        }
        return node;
      });
    }
    function markAlignedList(ast, options) {
      return mapAst(ast, (node, index, parentStack) => {
        if (node.type === "list" && node.children.length > 0) {
          for (let i = 0; i < parentStack.length; i++) {
            const parent = parentStack[i];
            if (parent.type === "list" && !parent.isAligned) {
              node.isAligned = false;
              return node;
            }
          }
          node.isAligned = isAligned(node);
        }
        return node;
      });
      function getListItemStart(listItem) {
        return listItem.children.length === 0 ? -1 : listItem.children[0].position.start.column - 1;
      }
      function isAligned(list) {
        if (!list.ordered) {
          return true;
        }
        const [firstItem, secondItem] = list.children;
        const firstInfo = getOrderedListItemInfo(firstItem, options.originalText);
        if (firstInfo.leadingSpaces.length > 1) {
          return true;
        }
        const firstStart = getListItemStart(firstItem);
        if (firstStart === -1) {
          return false;
        }
        if (list.children.length === 1) {
          return firstStart % options.tabWidth === 0;
        }
        const secondStart = getListItemStart(secondItem);
        if (firstStart !== secondStart) {
          return false;
        }
        if (firstStart % options.tabWidth === 0) {
          return true;
        }
        const secondInfo = getOrderedListItemInfo(secondItem, options.originalText);
        return secondInfo.leadingSpaces.length > 1;
      }
    }
    module.exports = preprocess;
  }
});
var require_clean4 = __commonJS2({
  "src/language-markdown/clean.js"(exports, module) {
    "use strict";
    init_define_process();
    var collapseWhiteSpace = require_collapse_white_space();
    var {
      isFrontMatterNode
    } = require_util();
    var {
      startWithPragma
    } = require_pragma4();
    var ignoredProperties = /* @__PURE__ */ new Set(["position", "raw"]);
    function clean(ast, newObj, parent) {
      if (ast.type === "front-matter" || ast.type === "code" || ast.type === "yaml" || ast.type === "import" || ast.type === "export" || ast.type === "jsx") {
        delete newObj.value;
      }
      if (ast.type === "list") {
        delete newObj.isAligned;
      }
      if (ast.type === "list" || ast.type === "listItem") {
        delete newObj.spread;
        delete newObj.loose;
      }
      if (ast.type === "text") {
        return null;
      }
      if (ast.type === "inlineCode") {
        newObj.value = ast.value.replace(/[\t\n ]+/g, " ");
      }
      if (ast.type === "wikiLink") {
        newObj.value = ast.value.trim().replace(/[\t\n]+/g, " ");
      }
      if (ast.type === "definition" || ast.type === "linkReference" || ast.type === "imageReference") {
        newObj.label = collapseWhiteSpace(ast.label);
      }
      if ((ast.type === "definition" || ast.type === "link" || ast.type === "image") && ast.title) {
        newObj.title = ast.title.replace(/\\(["')])/g, "$1");
      }
      if (parent && parent.type === "root" && parent.children.length > 0 && (parent.children[0] === ast || isFrontMatterNode(parent.children[0]) && parent.children[1] === ast) && ast.type === "html" && startWithPragma(ast.value)) {
        return null;
      }
    }
    clean.ignoredProperties = ignoredProperties;
    module.exports = clean;
  }
});
var require_printer_markdown = __commonJS2({
  "src/language-markdown/printer-markdown.js"(exports, module) {
    "use strict";
    init_define_process();
    var collapseWhiteSpace = require_collapse_white_space();
    var {
      getLast,
      getMinNotPresentContinuousCount,
      getMaxContinuousCount,
      getStringWidth,
      isNonEmptyArray
    } = require_util();
    var {
      builders: {
        breakParent,
        join: join2,
        line,
        literalline,
        markAsRoot,
        hardline,
        softline,
        ifBreak,
        fill,
        align,
        indent,
        group,
        hardlineWithoutBreakParent
      },
      utils: {
        normalizeDoc,
        replaceTextEndOfLine
      },
      printer: {
        printDocToString
      }
    } = require_document();
    var embed = require_embed3();
    var {
      insertPragma
    } = require_pragma4();
    var {
      locStart,
      locEnd
    } = require_loc5();
    var preprocess = require_print_preprocess2();
    var clean = require_clean4();
    var {
      getFencedCodeBlockValue,
      hasGitDiffFriendlyOrderedList,
      splitText,
      punctuationPattern,
      INLINE_NODE_TYPES,
      INLINE_NODE_WRAPPER_TYPES,
      isAutolink
    } = require_utils6();
    var TRAILING_HARDLINE_NODES = /* @__PURE__ */ new Set(["importExport"]);
    var SINGLE_LINE_NODE_TYPES = ["heading", "tableCell", "link", "wikiLink"];
    var SIBLING_NODE_TYPES = /* @__PURE__ */ new Set(["listItem", "definition", "footnoteDefinition"]);
    function genericPrint(path, options, print) {
      const node = path.getValue();
      if (shouldRemainTheSameContent(path)) {
        return splitText(options.originalText.slice(node.position.start.offset, node.position.end.offset), options).map((node2) => node2.type === "word" ? node2.value : node2.value === "" ? "" : printLine(path, node2.value, options));
      }
      switch (node.type) {
        case "front-matter":
          return options.originalText.slice(node.position.start.offset, node.position.end.offset);
        case "root":
          if (node.children.length === 0) {
            return "";
          }
          return [normalizeDoc(printRoot(path, options, print)), !TRAILING_HARDLINE_NODES.has(getLastDescendantNode(node).type) ? hardline : ""];
        case "paragraph":
          return printChildren(path, options, print, {
            postprocessor: fill
          });
        case "sentence":
          return printChildren(path, options, print);
        case "word": {
          let escapedValue = node.value.replace(/\*/g, "\\$&").replace(new RegExp([`(^|${punctuationPattern})(_+)`, `(_+)(${punctuationPattern}|$)`].join("|"), "g"), (_, text1, underscore1, underscore2, text2) => (underscore1 ? `${text1}${underscore1}` : `${underscore2}${text2}`).replace(/_/g, "\\_"));
          const isFirstSentence = (node2, name, index) => node2.type === "sentence" && index === 0;
          const isLastChildAutolink = (node2, name, index) => isAutolink(node2.children[index - 1]);
          if (escapedValue !== node.value && (path.match(void 0, isFirstSentence, isLastChildAutolink) || path.match(void 0, isFirstSentence, (node2, name, index) => node2.type === "emphasis" && index === 0, isLastChildAutolink))) {
            escapedValue = escapedValue.replace(/^(\\?[*_])+/, (prefix) => prefix.replace(/\\/g, ""));
          }
          return escapedValue;
        }
        case "whitespace": {
          const parentNode = path.getParentNode();
          const index = parentNode.children.indexOf(node);
          const nextNode = parentNode.children[index + 1];
          const proseWrap = nextNode && /^>|^(?:[*+-]|#{1,6}|\d+[).])$/.test(nextNode.value) ? "never" : options.proseWrap;
          return printLine(path, node.value, {
            proseWrap
          });
        }
        case "emphasis": {
          let style;
          if (isAutolink(node.children[0])) {
            style = options.originalText[node.position.start.offset];
          } else {
            const parentNode = path.getParentNode();
            const index = parentNode.children.indexOf(node);
            const prevNode = parentNode.children[index - 1];
            const nextNode = parentNode.children[index + 1];
            const hasPrevOrNextWord = prevNode && prevNode.type === "sentence" && prevNode.children.length > 0 && getLast(prevNode.children).type === "word" && !getLast(prevNode.children).hasTrailingPunctuation || nextNode && nextNode.type === "sentence" && nextNode.children.length > 0 && nextNode.children[0].type === "word" && !nextNode.children[0].hasLeadingPunctuation;
            style = hasPrevOrNextWord || getAncestorNode(path, "emphasis") ? "*" : "_";
          }
          return [style, printChildren(path, options, print), style];
        }
        case "strong":
          return ["**", printChildren(path, options, print), "**"];
        case "delete":
          return ["~~", printChildren(path, options, print), "~~"];
        case "inlineCode": {
          const backtickCount = getMinNotPresentContinuousCount(node.value, "`");
          const style = "`".repeat(backtickCount || 1);
          const gap = backtickCount && !/^\s/.test(node.value) ? " " : "";
          return [style, gap, node.value, gap, style];
        }
        case "wikiLink": {
          let contents = "";
          if (options.proseWrap === "preserve") {
            contents = node.value;
          } else {
            contents = node.value.replace(/[\t\n]+/g, " ");
          }
          return ["[[", contents, "]]"];
        }
        case "link":
          switch (options.originalText[node.position.start.offset]) {
            case "<": {
              const mailto = "mailto:";
              const url = node.url.startsWith(mailto) && options.originalText.slice(node.position.start.offset + 1, node.position.start.offset + 1 + mailto.length) !== mailto ? node.url.slice(mailto.length) : node.url;
              return ["<", url, ">"];
            }
            case "[":
              return ["[", printChildren(path, options, print), "](", printUrl(node.url, ")"), printTitle(node.title, options), ")"];
            default:
              return options.originalText.slice(node.position.start.offset, node.position.end.offset);
          }
        case "image":
          return ["![", node.alt || "", "](", printUrl(node.url, ")"), printTitle(node.title, options), ")"];
        case "blockquote":
          return ["> ", align("> ", printChildren(path, options, print))];
        case "heading":
          return ["#".repeat(node.depth) + " ", printChildren(path, options, print)];
        case "code": {
          if (node.isIndented) {
            const alignment = " ".repeat(4);
            return align(alignment, [alignment, ...replaceTextEndOfLine(node.value, hardline)]);
          }
          const styleUnit = options.__inJsTemplate ? "~" : "`";
          const style = styleUnit.repeat(Math.max(3, getMaxContinuousCount(node.value, styleUnit) + 1));
          return [style, node.lang || "", node.meta ? " " + node.meta : "", hardline, ...replaceTextEndOfLine(getFencedCodeBlockValue(node, options.originalText), hardline), hardline, style];
        }
        case "html": {
          const parentNode = path.getParentNode();
          const value = parentNode.type === "root" && getLast(parentNode.children) === node ? node.value.trimEnd() : node.value;
          const isHtmlComment = /^<!--.*-->$/s.test(value);
          return replaceTextEndOfLine(value, isHtmlComment ? hardline : markAsRoot(literalline));
        }
        case "list": {
          const nthSiblingIndex = getNthListSiblingIndex(node, path.getParentNode());
          const isGitDiffFriendlyOrderedList = hasGitDiffFriendlyOrderedList(node, options);
          return printChildren(path, options, print, {
            processor: (childPath, index) => {
              const prefix = getPrefix();
              const childNode = childPath.getValue();
              if (childNode.children.length === 2 && childNode.children[1].type === "html" && childNode.children[0].position.start.column !== childNode.children[1].position.start.column) {
                return [prefix, printListItem(childPath, options, print, prefix)];
              }
              return [prefix, align(" ".repeat(prefix.length), printListItem(childPath, options, print, prefix))];
              function getPrefix() {
                const rawPrefix = node.ordered ? (index === 0 ? node.start : isGitDiffFriendlyOrderedList ? 1 : node.start + index) + (nthSiblingIndex % 2 === 0 ? ". " : ") ") : nthSiblingIndex % 2 === 0 ? "- " : "* ";
                return node.isAligned || node.hasIndentedCodeblock ? alignListPrefix(rawPrefix, options) : rawPrefix;
              }
            }
          });
        }
        case "thematicBreak": {
          const counter = getAncestorCounter(path, "list");
          if (counter === -1) {
            return "---";
          }
          const nthSiblingIndex = getNthListSiblingIndex(path.getParentNode(counter), path.getParentNode(counter + 1));
          return nthSiblingIndex % 2 === 0 ? "***" : "---";
        }
        case "linkReference":
          return ["[", printChildren(path, options, print), "]", node.referenceType === "full" ? printLinkReference(node) : node.referenceType === "collapsed" ? "[]" : ""];
        case "imageReference":
          switch (node.referenceType) {
            case "full":
              return ["![", node.alt || "", "]", printLinkReference(node)];
            default:
              return ["![", node.alt, "]", node.referenceType === "collapsed" ? "[]" : ""];
          }
        case "definition": {
          const lineOrSpace = options.proseWrap === "always" ? line : " ";
          return group([printLinkReference(node), ":", indent([lineOrSpace, printUrl(node.url), node.title === null ? "" : [lineOrSpace, printTitle(node.title, options, false)]])]);
        }
        case "footnote":
          return ["[^", printChildren(path, options, print), "]"];
        case "footnoteReference":
          return printFootnoteReference(node);
        case "footnoteDefinition": {
          const nextNode = path.getParentNode().children[path.getName() + 1];
          const shouldInlineFootnote = node.children.length === 1 && node.children[0].type === "paragraph" && (options.proseWrap === "never" || options.proseWrap === "preserve" && node.children[0].position.start.line === node.children[0].position.end.line);
          return [printFootnoteReference(node), ": ", shouldInlineFootnote ? printChildren(path, options, print) : group([align(" ".repeat(4), printChildren(path, options, print, {
            processor: (childPath, index) => index === 0 ? group([softline, print()]) : print()
          })), nextNode && nextNode.type === "footnoteDefinition" ? softline : ""])];
        }
        case "table":
          return printTable(path, options, print);
        case "tableCell":
          return printChildren(path, options, print);
        case "break":
          return /\s/.test(options.originalText[node.position.start.offset]) ? ["  ", markAsRoot(literalline)] : ["\\", hardline];
        case "liquidNode":
          return replaceTextEndOfLine(node.value, hardline);
        case "importExport":
          return [node.value, hardline];
        case "esComment":
          return ["{/* ", node.value, " */}"];
        case "jsx":
          return node.value;
        case "math":
          return ["$$", hardline, node.value ? [...replaceTextEndOfLine(node.value, hardline), hardline] : "", "$$"];
        case "inlineMath": {
          return options.originalText.slice(locStart(node), locEnd(node));
        }
        case "tableRow":
        case "listItem":
        default:
          throw new Error(`Unknown markdown type ${JSON.stringify(node.type)}`);
      }
    }
    function printListItem(path, options, print, listPrefix) {
      const node = path.getValue();
      const prefix = node.checked === null ? "" : node.checked ? "[x] " : "[ ] ";
      return [prefix, printChildren(path, options, print, {
        processor: (childPath, index) => {
          if (index === 0 && childPath.getValue().type !== "list") {
            return align(" ".repeat(prefix.length), print());
          }
          const alignment = " ".repeat(clamp(options.tabWidth - listPrefix.length, 0, 3));
          return [alignment, align(alignment, print())];
        }
      })];
    }
    function alignListPrefix(prefix, options) {
      const additionalSpaces = getAdditionalSpaces();
      return prefix + " ".repeat(additionalSpaces >= 4 ? 0 : additionalSpaces);
      function getAdditionalSpaces() {
        const restSpaces = prefix.length % options.tabWidth;
        return restSpaces === 0 ? 0 : options.tabWidth - restSpaces;
      }
    }
    function getNthListSiblingIndex(node, parentNode) {
      return getNthSiblingIndex(node, parentNode, (siblingNode) => siblingNode.ordered === node.ordered);
    }
    function getNthSiblingIndex(node, parentNode, condition) {
      let index = -1;
      for (const childNode of parentNode.children) {
        if (childNode.type === node.type && condition(childNode)) {
          index++;
        } else {
          index = -1;
        }
        if (childNode === node) {
          return index;
        }
      }
    }
    function getAncestorCounter(path, typeOrTypes) {
      const types = Array.isArray(typeOrTypes) ? typeOrTypes : [typeOrTypes];
      let counter = -1;
      let ancestorNode;
      while (ancestorNode = path.getParentNode(++counter)) {
        if (types.includes(ancestorNode.type)) {
          return counter;
        }
      }
      return -1;
    }
    function getAncestorNode(path, typeOrTypes) {
      const counter = getAncestorCounter(path, typeOrTypes);
      return counter === -1 ? null : path.getParentNode(counter);
    }
    function printLine(path, value, options) {
      if (options.proseWrap === "preserve" && value === "\n") {
        return hardline;
      }
      const isBreakable = options.proseWrap === "always" && !getAncestorNode(path, SINGLE_LINE_NODE_TYPES);
      return value !== "" ? isBreakable ? line : " " : isBreakable ? softline : "";
    }
    function printTable(path, options, print) {
      const node = path.getValue();
      const columnMaxWidths = [];
      const contents = path.map((rowPath) => rowPath.map((cellPath, columnIndex) => {
        const text = printDocToString(print(), options).formatted;
        const width = getStringWidth(text);
        columnMaxWidths[columnIndex] = Math.max(columnMaxWidths[columnIndex] || 3, width);
        return {
          text,
          width
        };
      }, "children"), "children");
      const alignedTable = printTableContents(false);
      if (options.proseWrap !== "never") {
        return [breakParent, alignedTable];
      }
      const compactTable = printTableContents(true);
      return [breakParent, group(ifBreak(compactTable, alignedTable))];
      function printTableContents(isCompact) {
        const parts = [printRow(contents[0], isCompact), printAlign(isCompact)];
        if (contents.length > 1) {
          parts.push(join2(hardlineWithoutBreakParent, contents.slice(1).map((rowContents) => printRow(rowContents, isCompact))));
        }
        return join2(hardlineWithoutBreakParent, parts);
      }
      function printAlign(isCompact) {
        const align2 = columnMaxWidths.map((width, index) => {
          const align3 = node.align[index];
          const first = align3 === "center" || align3 === "left" ? ":" : "-";
          const last = align3 === "center" || align3 === "right" ? ":" : "-";
          const middle = isCompact ? "-" : "-".repeat(width - 2);
          return `${first}${middle}${last}`;
        });
        return `| ${align2.join(" | ")} |`;
      }
      function printRow(rowContents, isCompact) {
        const columns = rowContents.map((_ref72, columnIndex) => {
          let {
            text,
            width
          } = _ref72;
          if (isCompact) {
            return text;
          }
          const spaces = columnMaxWidths[columnIndex] - width;
          const align2 = node.align[columnIndex];
          let before = 0;
          if (align2 === "right") {
            before = spaces;
          } else if (align2 === "center") {
            before = Math.floor(spaces / 2);
          }
          const after = spaces - before;
          return `${" ".repeat(before)}${text}${" ".repeat(after)}`;
        });
        return `| ${columns.join(" | ")} |`;
      }
    }
    function printRoot(path, options, print) {
      const ignoreRanges = [];
      let ignoreStart = null;
      const {
        children
      } = path.getValue();
      for (const [index, childNode] of children.entries()) {
        switch (isPrettierIgnore(childNode)) {
          case "start":
            if (ignoreStart === null) {
              ignoreStart = {
                index,
                offset: childNode.position.end.offset
              };
            }
            break;
          case "end":
            if (ignoreStart !== null) {
              ignoreRanges.push({
                start: ignoreStart,
                end: {
                  index,
                  offset: childNode.position.start.offset
                }
              });
              ignoreStart = null;
            }
            break;
          default:
            break;
        }
      }
      return printChildren(path, options, print, {
        processor: (childPath, index) => {
          if (ignoreRanges.length > 0) {
            const ignoreRange = ignoreRanges[0];
            if (index === ignoreRange.start.index) {
              return [printIgnoreComment(children[ignoreRange.start.index]), options.originalText.slice(ignoreRange.start.offset, ignoreRange.end.offset), printIgnoreComment(children[ignoreRange.end.index])];
            }
            if (ignoreRange.start.index < index && index < ignoreRange.end.index) {
              return false;
            }
            if (index === ignoreRange.end.index) {
              ignoreRanges.shift();
              return false;
            }
          }
          return print();
        }
      });
    }
    function printChildren(path, options, print) {
      let events = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
      const {
        postprocessor
      } = events;
      const processor = events.processor || (() => print());
      const node = path.getValue();
      const parts = [];
      let lastChildNode;
      path.each((childPath, index) => {
        const childNode = childPath.getValue();
        const result = processor(childPath, index);
        if (result !== false) {
          const data = {
            parts,
            prevNode: lastChildNode,
            parentNode: node,
            options
          };
          if (shouldPrePrintHardline(childNode, data)) {
            parts.push(hardline);
            if (lastChildNode && TRAILING_HARDLINE_NODES.has(lastChildNode.type)) {
              if (shouldPrePrintTripleHardline(childNode, data)) {
                parts.push(hardline);
              }
            } else {
              if (shouldPrePrintDoubleHardline(childNode, data) || shouldPrePrintTripleHardline(childNode, data)) {
                parts.push(hardline);
              }
              if (shouldPrePrintTripleHardline(childNode, data)) {
                parts.push(hardline);
              }
            }
          }
          parts.push(result);
          lastChildNode = childNode;
        }
      }, "children");
      return postprocessor ? postprocessor(parts) : parts;
    }
    function printIgnoreComment(node) {
      if (node.type === "html") {
        return node.value;
      }
      if (node.type === "paragraph" && Array.isArray(node.children) && node.children.length === 1 && node.children[0].type === "esComment") {
        return ["{/* ", node.children[0].value, " */}"];
      }
    }
    function getLastDescendantNode(node) {
      let current = node;
      while (isNonEmptyArray(current.children)) {
        current = getLast(current.children);
      }
      return current;
    }
    function isPrettierIgnore(node) {
      let match;
      if (node.type === "html") {
        match = node.value.match(/^<!--\s*prettier-ignore(?:-(start|end))?\s*-->$/);
      } else {
        let comment;
        if (node.type === "esComment") {
          comment = node;
        } else if (node.type === "paragraph" && node.children.length === 1 && node.children[0].type === "esComment") {
          comment = node.children[0];
        }
        if (comment) {
          match = comment.value.match(/^prettier-ignore(?:-(start|end))?$/);
        }
      }
      return match ? match[1] || "next" : false;
    }
    function shouldPrePrintHardline(node, data) {
      const isFirstNode = data.parts.length === 0;
      const isInlineNode = INLINE_NODE_TYPES.includes(node.type);
      const isInlineHTML = node.type === "html" && INLINE_NODE_WRAPPER_TYPES.includes(data.parentNode.type);
      return !isFirstNode && !isInlineNode && !isInlineHTML;
    }
    function shouldPrePrintDoubleHardline(node, data) {
      var _data$prevNode, _data$prevNode2, _data$prevNode3;
      const isSequence = (data.prevNode && data.prevNode.type) === node.type;
      const isSiblingNode = isSequence && SIBLING_NODE_TYPES.has(node.type);
      const isInTightListItem = data.parentNode.type === "listItem" && !data.parentNode.loose;
      const isPrevNodeLooseListItem = ((_data$prevNode = data.prevNode) === null || _data$prevNode === void 0 ? void 0 : _data$prevNode.type) === "listItem" && data.prevNode.loose;
      const isPrevNodePrettierIgnore = isPrettierIgnore(data.prevNode) === "next";
      const isBlockHtmlWithoutBlankLineBetweenPrevHtml = node.type === "html" && ((_data$prevNode2 = data.prevNode) === null || _data$prevNode2 === void 0 ? void 0 : _data$prevNode2.type) === "html" && data.prevNode.position.end.line + 1 === node.position.start.line;
      const isHtmlDirectAfterListItem = node.type === "html" && data.parentNode.type === "listItem" && ((_data$prevNode3 = data.prevNode) === null || _data$prevNode3 === void 0 ? void 0 : _data$prevNode3.type) === "paragraph" && data.prevNode.position.end.line + 1 === node.position.start.line;
      return isPrevNodeLooseListItem || !(isSiblingNode || isInTightListItem || isPrevNodePrettierIgnore || isBlockHtmlWithoutBlankLineBetweenPrevHtml || isHtmlDirectAfterListItem);
    }
    function shouldPrePrintTripleHardline(node, data) {
      const isPrevNodeList = data.prevNode && data.prevNode.type === "list";
      const isIndentedCode = node.type === "code" && node.isIndented;
      return isPrevNodeList && isIndentedCode;
    }
    function shouldRemainTheSameContent(path) {
      const ancestorNode = getAncestorNode(path, ["linkReference", "imageReference"]);
      return ancestorNode && (ancestorNode.type !== "linkReference" || ancestorNode.referenceType !== "full");
    }
    function printUrl(url) {
      let dangerousCharOrChars = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
      const dangerousChars = [" ", ...Array.isArray(dangerousCharOrChars) ? dangerousCharOrChars : [dangerousCharOrChars]];
      return new RegExp(dangerousChars.map((x) => `\\${x}`).join("|")).test(url) ? `<${url}>` : url;
    }
    function printTitle(title, options) {
      let printSpace = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
      if (!title) {
        return "";
      }
      if (printSpace) {
        return " " + printTitle(title, options, false);
      }
      title = title.replace(/\\(["')])/g, "$1");
      if (title.includes('"') && title.includes("'") && !title.includes(")")) {
        return `(${title})`;
      }
      const singleCount = title.split("'").length - 1;
      const doubleCount = title.split('"').length - 1;
      const quote = singleCount > doubleCount ? '"' : doubleCount > singleCount ? "'" : options.singleQuote ? "'" : '"';
      title = title.replace(/\\/, "\\\\");
      title = title.replace(new RegExp(`(${quote})`, "g"), "\\$1");
      return `${quote}${title}${quote}`;
    }
    function clamp(value, min, max) {
      return value < min ? min : value > max ? max : value;
    }
    function hasPrettierIgnore(path) {
      const index = Number(path.getName());
      if (index === 0) {
        return false;
      }
      const prevNode = path.getParentNode().children[index - 1];
      return isPrettierIgnore(prevNode) === "next";
    }
    function printLinkReference(node) {
      return `[${collapseWhiteSpace(node.label)}]`;
    }
    function printFootnoteReference(node) {
      return `[^${node.label}]`;
    }
    module.exports = {
      preprocess,
      print: genericPrint,
      embed,
      massageAstNode: clean,
      hasPrettierIgnore,
      insertPragma
    };
  }
});
var require_options5 = __commonJS2({
  "src/language-markdown/options.js"(exports, module) {
    "use strict";
    init_define_process();
    var commonOptions = require_common_options();
    module.exports = {
      proseWrap: commonOptions.proseWrap,
      singleQuote: commonOptions.singleQuote
    };
  }
});
var require_parsers5 = __commonJS2({
  "src/language-markdown/parsers.js"() {
    init_define_process();
  }
});
var require_Markdown = __commonJS2({
  "node_modules/linguist-languages/data/Markdown.json"(exports, module) {
    module.exports = {
      name: "Markdown",
      type: "prose",
      color: "#083fa1",
      aliases: ["pandoc"],
      aceMode: "markdown",
      codemirrorMode: "gfm",
      codemirrorMimeType: "text/x-gfm",
      wrap: true,
      extensions: [".md", ".livemd", ".markdown", ".mdown", ".mdwn", ".mdx", ".mkd", ".mkdn", ".mkdown", ".ronn", ".scd", ".workbook"],
      filenames: ["contents.lr"],
      tmScope: "source.gfm",
      languageId: 222
    };
  }
});
var require_language_markdown = __commonJS2({
  "src/language-markdown/index.js"(exports, module) {
    "use strict";
    init_define_process();
    var createLanguage = require_create_language();
    var printer = require_printer_markdown();
    var options = require_options5();
    var parsers = require_parsers5();
    var languages = [createLanguage(require_Markdown(), (data) => ({
      since: "1.8.0",
      parsers: ["markdown"],
      vscodeLanguageIds: ["markdown"],
      filenames: [...data.filenames, "README"],
      extensions: data.extensions.filter((extension) => extension !== ".mdx")
    })), createLanguage(require_Markdown(), () => ({
      name: "MDX",
      since: "1.15.0",
      parsers: ["mdx"],
      vscodeLanguageIds: ["mdx"],
      filenames: [],
      extensions: [".mdx"]
    }))];
    var printers = {
      mdast: printer
    };
    module.exports = {
      languages,
      options,
      printers,
      parsers
    };
  }
});
var require_clean5 = __commonJS2({
  "src/language-html/clean.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      isFrontMatterNode
    } = require_util();
    var ignoredProperties = /* @__PURE__ */ new Set(["sourceSpan", "startSourceSpan", "endSourceSpan", "nameSpan", "valueSpan"]);
    function clean(ast, newNode) {
      if (ast.type === "text" || ast.type === "comment") {
        return null;
      }
      if (isFrontMatterNode(ast) || ast.type === "yaml" || ast.type === "toml") {
        return null;
      }
      if (ast.type === "attribute") {
        delete newNode.value;
      }
      if (ast.type === "docType") {
        delete newNode.value;
      }
    }
    clean.ignoredProperties = ignoredProperties;
    module.exports = clean;
  }
});
var require_constants_evaluate2 = __commonJS2({
  "src/language-html/constants.evaluate.js"(exports, module) {
    module.exports = {
      CSS_DISPLAY_TAGS: {
        area: "none",
        base: "none",
        basefont: "none",
        datalist: "none",
        head: "none",
        link: "none",
        meta: "none",
        noembed: "none",
        noframes: "none",
        param: "block",
        rp: "none",
        script: "block",
        source: "block",
        style: "none",
        template: "inline",
        track: "block",
        title: "none",
        html: "block",
        body: "block",
        address: "block",
        blockquote: "block",
        center: "block",
        div: "block",
        figure: "block",
        figcaption: "block",
        footer: "block",
        form: "block",
        header: "block",
        hr: "block",
        legend: "block",
        listing: "block",
        main: "block",
        p: "block",
        plaintext: "block",
        pre: "block",
        xmp: "block",
        slot: "contents",
        ruby: "ruby",
        rt: "ruby-text",
        article: "block",
        aside: "block",
        h1: "block",
        h2: "block",
        h3: "block",
        h4: "block",
        h5: "block",
        h6: "block",
        hgroup: "block",
        nav: "block",
        section: "block",
        dir: "block",
        dd: "block",
        dl: "block",
        dt: "block",
        ol: "block",
        ul: "block",
        li: "list-item",
        table: "table",
        caption: "table-caption",
        colgroup: "table-column-group",
        col: "table-column",
        thead: "table-header-group",
        tbody: "table-row-group",
        tfoot: "table-footer-group",
        tr: "table-row",
        td: "table-cell",
        th: "table-cell",
        fieldset: "block",
        button: "inline-block",
        details: "block",
        summary: "block",
        dialog: "block",
        meter: "inline-block",
        progress: "inline-block",
        object: "inline-block",
        video: "inline-block",
        audio: "inline-block",
        select: "inline-block",
        option: "block",
        optgroup: "block"
      },
      CSS_DISPLAY_DEFAULT: "inline",
      CSS_WHITE_SPACE_TAGS: {
        listing: "pre",
        plaintext: "pre",
        pre: "pre",
        xmp: "pre",
        nobr: "nowrap",
        table: "initial",
        textarea: "pre-wrap"
      },
      CSS_WHITE_SPACE_DEFAULT: "normal"
    };
  }
});
var require_is_unknown_namespace = __commonJS2({
  "src/language-html/utils/is-unknown-namespace.js"(exports, module) {
    "use strict";
    init_define_process();
    function isUnknownNamespace(node) {
      return node.type === "element" && !node.hasExplicitNamespace && !["html", "svg"].includes(node.namespace);
    }
    module.exports = isUnknownNamespace;
  }
});
var require_utils7 = __commonJS2({
  "src/language-html/utils/index.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      inferParserByLanguage,
      isFrontMatterNode
    } = require_util();
    var {
      builders: {
        line,
        hardline,
        join: join2
      },
      utils: {
        getDocParts,
        replaceTextEndOfLine
      }
    } = require_document();
    var {
      CSS_DISPLAY_TAGS,
      CSS_DISPLAY_DEFAULT,
      CSS_WHITE_SPACE_TAGS,
      CSS_WHITE_SPACE_DEFAULT
    } = require_constants_evaluate2();
    var isUnknownNamespace = require_is_unknown_namespace();
    var HTML_WHITESPACE = /* @__PURE__ */ new Set(["	", "\n", "\f", "\r", " "]);
    var htmlTrimStart = (string) => string.replace(/^[\t\n\f\r ]+/, "");
    var htmlTrimEnd = (string) => string.replace(/[\t\n\f\r ]+$/, "");
    var htmlTrim = (string) => htmlTrimStart(htmlTrimEnd(string));
    var htmlTrimLeadingBlankLines = (string) => string.replace(/^[\t\f\r ]*\n/g, "");
    var htmlTrimPreserveIndentation = (string) => htmlTrimLeadingBlankLines(htmlTrimEnd(string));
    var splitByHtmlWhitespace = (string) => string.split(/[\t\n\f\r ]+/);
    var getLeadingHtmlWhitespace = (string) => string.match(/^[\t\n\f\r ]*/)[0];
    var getLeadingAndTrailingHtmlWhitespace = (string) => {
      const [, leadingWhitespace, text, trailingWhitespace] = string.match(/^([\t\n\f\r ]*)(.*?)([\t\n\f\r ]*)$/s);
      return {
        leadingWhitespace,
        trailingWhitespace,
        text
      };
    };
    var hasHtmlWhitespace = (string) => /[\t\n\f\r ]/.test(string);
    function shouldPreserveContent(node, options) {
      if (node.type === "ieConditionalComment" && node.lastChild && !node.lastChild.isSelfClosing && !node.lastChild.endSourceSpan) {
        return true;
      }
      if (node.type === "ieConditionalComment" && !node.complete) {
        return true;
      }
      if (isPreLikeNode(node) && node.children.some((child) => child.type !== "text" && child.type !== "interpolation")) {
        return true;
      }
      if (isVueNonHtmlBlock(node, options) && !isScriptLikeTag(node) && node.type !== "interpolation") {
        return true;
      }
      return false;
    }
    function hasPrettierIgnore(node) {
      if (node.type === "attribute") {
        return false;
      }
      if (!node.parent) {
        return false;
      }
      if (!node.prev) {
        return false;
      }
      return isPrettierIgnore(node.prev);
    }
    function isPrettierIgnore(node) {
      return node.type === "comment" && node.value.trim() === "prettier-ignore";
    }
    function isTextLikeNode(node) {
      return node.type === "text" || node.type === "comment";
    }
    function isScriptLikeTag(node) {
      return node.type === "element" && (node.fullName === "script" || node.fullName === "style" || node.fullName === "svg:style" || isUnknownNamespace(node) && (node.name === "script" || node.name === "style"));
    }
    function canHaveInterpolation(node) {
      return node.children && !isScriptLikeTag(node);
    }
    function isWhitespaceSensitiveNode(node) {
      return isScriptLikeTag(node) || node.type === "interpolation" || isIndentationSensitiveNode(node);
    }
    function isIndentationSensitiveNode(node) {
      return getNodeCssStyleWhiteSpace(node).startsWith("pre");
    }
    function isLeadingSpaceSensitiveNode(node, options) {
      const isLeadingSpaceSensitive = _isLeadingSpaceSensitiveNode();
      if (isLeadingSpaceSensitive && !node.prev && node.parent && node.parent.tagDefinition && node.parent.tagDefinition.ignoreFirstLf) {
        return node.type === "interpolation";
      }
      return isLeadingSpaceSensitive;
      function _isLeadingSpaceSensitiveNode() {
        if (isFrontMatterNode(node)) {
          return false;
        }
        if ((node.type === "text" || node.type === "interpolation") && node.prev && (node.prev.type === "text" || node.prev.type === "interpolation")) {
          return true;
        }
        if (!node.parent || node.parent.cssDisplay === "none") {
          return false;
        }
        if (isPreLikeNode(node.parent)) {
          return true;
        }
        if (!node.prev && (node.parent.type === "root" || isPreLikeNode(node) && node.parent || isScriptLikeTag(node.parent) || isVueCustomBlock(node.parent, options) || !isFirstChildLeadingSpaceSensitiveCssDisplay(node.parent.cssDisplay))) {
          return false;
        }
        if (node.prev && !isNextLeadingSpaceSensitiveCssDisplay(node.prev.cssDisplay)) {
          return false;
        }
        return true;
      }
    }
    function isTrailingSpaceSensitiveNode(node, options) {
      if (isFrontMatterNode(node)) {
        return false;
      }
      if ((node.type === "text" || node.type === "interpolation") && node.next && (node.next.type === "text" || node.next.type === "interpolation")) {
        return true;
      }
      if (!node.parent || node.parent.cssDisplay === "none") {
        return false;
      }
      if (isPreLikeNode(node.parent)) {
        return true;
      }
      if (!node.next && (node.parent.type === "root" || isPreLikeNode(node) && node.parent || isScriptLikeTag(node.parent) || isVueCustomBlock(node.parent, options) || !isLastChildTrailingSpaceSensitiveCssDisplay(node.parent.cssDisplay))) {
        return false;
      }
      if (node.next && !isPrevTrailingSpaceSensitiveCssDisplay(node.next.cssDisplay)) {
        return false;
      }
      return true;
    }
    function isDanglingSpaceSensitiveNode(node) {
      return isDanglingSpaceSensitiveCssDisplay(node.cssDisplay) && !isScriptLikeTag(node);
    }
    function forceNextEmptyLine(node) {
      return isFrontMatterNode(node) || node.next && node.sourceSpan.end && node.sourceSpan.end.line + 1 < node.next.sourceSpan.start.line;
    }
    function forceBreakContent(node) {
      return forceBreakChildren(node) || node.type === "element" && node.children.length > 0 && (["body", "script", "style"].includes(node.name) || node.children.some((child) => hasNonTextChild(child))) || node.firstChild && node.firstChild === node.lastChild && node.firstChild.type !== "text" && hasLeadingLineBreak(node.firstChild) && (!node.lastChild.isTrailingSpaceSensitive || hasTrailingLineBreak(node.lastChild));
    }
    function forceBreakChildren(node) {
      return node.type === "element" && node.children.length > 0 && (["html", "head", "ul", "ol", "select"].includes(node.name) || node.cssDisplay.startsWith("table") && node.cssDisplay !== "table-cell");
    }
    function preferHardlineAsLeadingSpaces(node) {
      return preferHardlineAsSurroundingSpaces(node) || node.prev && preferHardlineAsTrailingSpaces(node.prev) || hasSurroundingLineBreak(node);
    }
    function preferHardlineAsTrailingSpaces(node) {
      return preferHardlineAsSurroundingSpaces(node) || node.type === "element" && node.fullName === "br" || hasSurroundingLineBreak(node);
    }
    function hasSurroundingLineBreak(node) {
      return hasLeadingLineBreak(node) && hasTrailingLineBreak(node);
    }
    function hasLeadingLineBreak(node) {
      return node.hasLeadingSpaces && (node.prev ? node.prev.sourceSpan.end.line < node.sourceSpan.start.line : node.parent.type === "root" || node.parent.startSourceSpan.end.line < node.sourceSpan.start.line);
    }
    function hasTrailingLineBreak(node) {
      return node.hasTrailingSpaces && (node.next ? node.next.sourceSpan.start.line > node.sourceSpan.end.line : node.parent.type === "root" || node.parent.endSourceSpan && node.parent.endSourceSpan.start.line > node.sourceSpan.end.line);
    }
    function preferHardlineAsSurroundingSpaces(node) {
      switch (node.type) {
        case "ieConditionalComment":
        case "comment":
        case "directive":
          return true;
        case "element":
          return ["script", "select"].includes(node.name);
      }
      return false;
    }
    function getLastDescendant(node) {
      return node.lastChild ? getLastDescendant(node.lastChild) : node;
    }
    function hasNonTextChild(node) {
      return node.children && node.children.some((child) => child.type !== "text");
    }
    function _inferScriptParser(node) {
      const {
        type: type2,
        lang
      } = node.attrMap;
      if (type2 === "module" || type2 === "text/javascript" || type2 === "text/babel" || type2 === "application/javascript" || lang === "jsx") {
        return "babel";
      }
      if (type2 === "application/x-typescript" || lang === "ts" || lang === "tsx") {
        return "typescript";
      }
      if (type2 === "text/markdown") {
        return "markdown";
      }
      if (type2 === "text/html") {
        return "html";
      }
      if (type2 && (type2.endsWith("json") || type2.endsWith("importmap")) || type2 === "speculationrules") {
        return "json";
      }
      if (type2 === "text/x-handlebars-template") {
        return "glimmer";
      }
    }
    function inferStyleParser(node, options) {
      const {
        lang
      } = node.attrMap;
      if (!lang || lang === "postcss" || lang === "css") {
        return "css";
      }
      if (lang === "scss") {
        return "scss";
      }
      if (lang === "less") {
        return "less";
      }
      if (lang === "stylus") {
        return inferParserByLanguage("stylus", options);
      }
    }
    function inferScriptParser(node, options) {
      if (node.name === "script" && !node.attrMap.src) {
        if (!node.attrMap.lang && !node.attrMap.type) {
          return "babel";
        }
        return _inferScriptParser(node);
      }
      if (node.name === "style") {
        return inferStyleParser(node, options);
      }
      if (options && isVueNonHtmlBlock(node, options)) {
        return _inferScriptParser(node) || !("src" in node.attrMap) && inferParserByLanguage(node.attrMap.lang, options);
      }
    }
    function isBlockLikeCssDisplay(cssDisplay) {
      return cssDisplay === "block" || cssDisplay === "list-item" || cssDisplay.startsWith("table");
    }
    function isFirstChildLeadingSpaceSensitiveCssDisplay(cssDisplay) {
      return !isBlockLikeCssDisplay(cssDisplay) && cssDisplay !== "inline-block";
    }
    function isLastChildTrailingSpaceSensitiveCssDisplay(cssDisplay) {
      return !isBlockLikeCssDisplay(cssDisplay) && cssDisplay !== "inline-block";
    }
    function isPrevTrailingSpaceSensitiveCssDisplay(cssDisplay) {
      return !isBlockLikeCssDisplay(cssDisplay);
    }
    function isNextLeadingSpaceSensitiveCssDisplay(cssDisplay) {
      return !isBlockLikeCssDisplay(cssDisplay);
    }
    function isDanglingSpaceSensitiveCssDisplay(cssDisplay) {
      return !isBlockLikeCssDisplay(cssDisplay) && cssDisplay !== "inline-block";
    }
    function isPreLikeNode(node) {
      return getNodeCssStyleWhiteSpace(node).startsWith("pre");
    }
    function countParents(path, predicate) {
      let counter = 0;
      for (let i = path.stack.length - 1; i >= 0; i--) {
        const value = path.stack[i];
        if (value && typeof value === "object" && !Array.isArray(value) && predicate(value)) {
          counter++;
        }
      }
      return counter;
    }
    function hasParent(node, fn) {
      let current = node;
      while (current) {
        if (fn(current)) {
          return true;
        }
        current = current.parent;
      }
      return false;
    }
    function getNodeCssStyleDisplay(node, options) {
      if (node.prev && node.prev.type === "comment") {
        const match = node.prev.value.match(/^\s*display:\s*([a-z]+)\s*$/);
        if (match) {
          return match[1];
        }
      }
      let isInSvgForeignObject = false;
      if (node.type === "element" && node.namespace === "svg") {
        if (hasParent(node, (parent) => parent.fullName === "svg:foreignObject")) {
          isInSvgForeignObject = true;
        } else {
          return node.name === "svg" ? "inline-block" : "block";
        }
      }
      switch (options.htmlWhitespaceSensitivity) {
        case "strict":
          return "inline";
        case "ignore":
          return "block";
        default: {
          if (options.parser === "vue" && node.parent && node.parent.type === "root") {
            return "block";
          }
          return node.type === "element" && (!node.namespace || isInSvgForeignObject || isUnknownNamespace(node)) && CSS_DISPLAY_TAGS[node.name] || CSS_DISPLAY_DEFAULT;
        }
      }
    }
    function getNodeCssStyleWhiteSpace(node) {
      return node.type === "element" && (!node.namespace || isUnknownNamespace(node)) && CSS_WHITE_SPACE_TAGS[node.name] || CSS_WHITE_SPACE_DEFAULT;
    }
    function getMinIndentation(text) {
      let minIndentation = Number.POSITIVE_INFINITY;
      for (const lineText of text.split("\n")) {
        if (lineText.length === 0) {
          continue;
        }
        if (!HTML_WHITESPACE.has(lineText[0])) {
          return 0;
        }
        const indentation = getLeadingHtmlWhitespace(lineText).length;
        if (lineText.length === indentation) {
          continue;
        }
        if (indentation < minIndentation) {
          minIndentation = indentation;
        }
      }
      return minIndentation === Number.POSITIVE_INFINITY ? 0 : minIndentation;
    }
    function dedentString(text) {
      let minIndent = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : getMinIndentation(text);
      return minIndent === 0 ? text : text.split("\n").map((lineText) => lineText.slice(minIndent)).join("\n");
    }
    function countChars(text, char) {
      let counter = 0;
      for (let i = 0; i < text.length; i++) {
        if (text[i] === char) {
          counter++;
        }
      }
      return counter;
    }
    function unescapeQuoteEntities(text) {
      return text.replace(/&apos;/g, "'").replace(/&quot;/g, '"');
    }
    var vueRootElementsSet = /* @__PURE__ */ new Set(["template", "style", "script"]);
    function isVueCustomBlock(node, options) {
      return isVueSfcBlock(node, options) && !vueRootElementsSet.has(node.fullName);
    }
    function isVueSfcBlock(node, options) {
      return options.parser === "vue" && node.type === "element" && node.parent.type === "root" && node.fullName.toLowerCase() !== "html";
    }
    function isVueNonHtmlBlock(node, options) {
      return isVueSfcBlock(node, options) && (isVueCustomBlock(node, options) || node.attrMap.lang && node.attrMap.lang !== "html");
    }
    function isVueSlotAttribute(attribute) {
      const attributeName = attribute.fullName;
      return attributeName.charAt(0) === "#" || attributeName === "slot-scope" || attributeName === "v-slot" || attributeName.startsWith("v-slot:");
    }
    function isVueSfcBindingsAttribute(attribute, options) {
      const element = attribute.parent;
      if (!isVueSfcBlock(element, options)) {
        return false;
      }
      const tagName = element.fullName;
      const attributeName = attribute.fullName;
      return tagName === "script" && attributeName === "setup" || tagName === "style" && attributeName === "vars";
    }
    function getTextValueParts(node) {
      let value = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : node.value;
      return node.parent.isWhitespaceSensitive ? node.parent.isIndentationSensitive ? replaceTextEndOfLine(value) : replaceTextEndOfLine(dedentString(htmlTrimPreserveIndentation(value)), hardline) : getDocParts(join2(line, splitByHtmlWhitespace(value)));
    }
    function isVueScriptTag(node, options) {
      return isVueSfcBlock(node, options) && node.name === "script";
    }
    module.exports = {
      htmlTrim,
      htmlTrimPreserveIndentation,
      hasHtmlWhitespace,
      getLeadingAndTrailingHtmlWhitespace,
      canHaveInterpolation,
      countChars,
      countParents,
      dedentString,
      forceBreakChildren,
      forceBreakContent,
      forceNextEmptyLine,
      getLastDescendant,
      getNodeCssStyleDisplay,
      getNodeCssStyleWhiteSpace,
      hasPrettierIgnore,
      inferScriptParser,
      isVueCustomBlock,
      isVueNonHtmlBlock,
      isVueScriptTag,
      isVueSlotAttribute,
      isVueSfcBindingsAttribute,
      isVueSfcBlock,
      isDanglingSpaceSensitiveNode,
      isIndentationSensitiveNode,
      isLeadingSpaceSensitiveNode,
      isPreLikeNode,
      isScriptLikeTag,
      isTextLikeNode,
      isTrailingSpaceSensitiveNode,
      isWhitespaceSensitiveNode,
      isUnknownNamespace,
      preferHardlineAsLeadingSpaces,
      preferHardlineAsTrailingSpaces,
      shouldPreserveContent,
      unescapeQuoteEntities,
      getTextValueParts
    };
  }
});
var require_chars = __commonJS2({
  "node_modules/angular-html-parser/lib/compiler/src/chars.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.$EOF = 0;
    exports.$BSPACE = 8;
    exports.$TAB = 9;
    exports.$LF = 10;
    exports.$VTAB = 11;
    exports.$FF = 12;
    exports.$CR = 13;
    exports.$SPACE = 32;
    exports.$BANG = 33;
    exports.$DQ = 34;
    exports.$HASH = 35;
    exports.$$ = 36;
    exports.$PERCENT = 37;
    exports.$AMPERSAND = 38;
    exports.$SQ = 39;
    exports.$LPAREN = 40;
    exports.$RPAREN = 41;
    exports.$STAR = 42;
    exports.$PLUS = 43;
    exports.$COMMA = 44;
    exports.$MINUS = 45;
    exports.$PERIOD = 46;
    exports.$SLASH = 47;
    exports.$COLON = 58;
    exports.$SEMICOLON = 59;
    exports.$LT = 60;
    exports.$EQ = 61;
    exports.$GT = 62;
    exports.$QUESTION = 63;
    exports.$0 = 48;
    exports.$7 = 55;
    exports.$9 = 57;
    exports.$A = 65;
    exports.$E = 69;
    exports.$F = 70;
    exports.$X = 88;
    exports.$Z = 90;
    exports.$LBRACKET = 91;
    exports.$BACKSLASH = 92;
    exports.$RBRACKET = 93;
    exports.$CARET = 94;
    exports.$_ = 95;
    exports.$a = 97;
    exports.$b = 98;
    exports.$e = 101;
    exports.$f = 102;
    exports.$n = 110;
    exports.$r = 114;
    exports.$t = 116;
    exports.$u = 117;
    exports.$v = 118;
    exports.$x = 120;
    exports.$z = 122;
    exports.$LBRACE = 123;
    exports.$BAR = 124;
    exports.$RBRACE = 125;
    exports.$NBSP = 160;
    exports.$PIPE = 124;
    exports.$TILDA = 126;
    exports.$AT = 64;
    exports.$BT = 96;
    function isWhitespace(code) {
      return code >= exports.$TAB && code <= exports.$SPACE || code == exports.$NBSP;
    }
    exports.isWhitespace = isWhitespace;
    function isDigit(code) {
      return exports.$0 <= code && code <= exports.$9;
    }
    exports.isDigit = isDigit;
    function isAsciiLetter(code) {
      return code >= exports.$a && code <= exports.$z || code >= exports.$A && code <= exports.$Z;
    }
    exports.isAsciiLetter = isAsciiLetter;
    function isAsciiHexDigit(code) {
      return code >= exports.$a && code <= exports.$f || code >= exports.$A && code <= exports.$F || isDigit(code);
    }
    exports.isAsciiHexDigit = isAsciiHexDigit;
    function isNewLine(code) {
      return code === exports.$LF || code === exports.$CR;
    }
    exports.isNewLine = isNewLine;
    function isOctalDigit(code) {
      return exports.$0 <= code && code <= exports.$7;
    }
    exports.isOctalDigit = isOctalDigit;
  }
});
var require_static_symbol = __commonJS2({
  "node_modules/angular-html-parser/lib/compiler/src/aot/static_symbol.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var StaticSymbol = class {
      constructor(filePath, name, members) {
        this.filePath = filePath;
        this.name = name;
        this.members = members;
      }
      assertNoMembers() {
        if (this.members.length) {
          throw new Error(`Illegal state: symbol without members expected, but got ${JSON.stringify(this)}.`);
        }
      }
    };
    exports.StaticSymbol = StaticSymbol;
    var StaticSymbolCache = class {
      constructor() {
        this.cache = /* @__PURE__ */ new Map();
      }
      get(declarationFile, name, members) {
        members = members || [];
        const memberSuffix = members.length ? `.${members.join(".")}` : "";
        const key = `"${declarationFile}".${name}${memberSuffix}`;
        let result = this.cache.get(key);
        if (!result) {
          result = new StaticSymbol(declarationFile, name, members);
          this.cache.set(key, result);
        }
        return result;
      }
    };
    exports.StaticSymbolCache = StaticSymbolCache;
  }
});
var require_util2 = __commonJS2({
  "node_modules/angular-html-parser/lib/compiler/src/util.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var DASH_CASE_REGEXP = /-+([a-z0-9])/g;
    function dashCaseToCamelCase(input) {
      return input.replace(DASH_CASE_REGEXP, function() {
        for (var _len7 = arguments.length, m = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
          m[_key7] = arguments[_key7];
        }
        return m[1].toUpperCase();
      });
    }
    exports.dashCaseToCamelCase = dashCaseToCamelCase;
    function splitAtColon(input, defaultValues) {
      return _splitAt(input, ":", defaultValues);
    }
    exports.splitAtColon = splitAtColon;
    function splitAtPeriod(input, defaultValues) {
      return _splitAt(input, ".", defaultValues);
    }
    exports.splitAtPeriod = splitAtPeriod;
    function _splitAt(input, character, defaultValues) {
      const characterIndex = input.indexOf(character);
      if (characterIndex == -1)
        return defaultValues;
      return [input.slice(0, characterIndex).trim(), input.slice(characterIndex + 1).trim()];
    }
    function visitValue(value, visitor, context) {
      if (Array.isArray(value)) {
        return visitor.visitArray(value, context);
      }
      if (isStrictStringMap(value)) {
        return visitor.visitStringMap(value, context);
      }
      if (value == null || typeof value == "string" || typeof value == "number" || typeof value == "boolean") {
        return visitor.visitPrimitive(value, context);
      }
      return visitor.visitOther(value, context);
    }
    exports.visitValue = visitValue;
    function isDefined(val) {
      return val !== null && val !== void 0;
    }
    exports.isDefined = isDefined;
    function noUndefined(val) {
      return val === void 0 ? null : val;
    }
    exports.noUndefined = noUndefined;
    var ValueTransformer = class {
      visitArray(arr, context) {
        return arr.map((value) => visitValue(value, this, context));
      }
      visitStringMap(map, context) {
        const result = {};
        Object.keys(map).forEach((key) => {
          result[key] = visitValue(map[key], this, context);
        });
        return result;
      }
      visitPrimitive(value, context) {
        return value;
      }
      visitOther(value, context) {
        return value;
      }
    };
    exports.ValueTransformer = ValueTransformer;
    exports.SyncAsync = {
      assertSync: (value) => {
        if (isPromise(value)) {
          throw new Error(`Illegal state: value cannot be a promise`);
        }
        return value;
      },
      then: (value, cb) => {
        return isPromise(value) ? value.then(cb) : cb(value);
      },
      all: (syncAsyncValues) => {
        return syncAsyncValues.some(isPromise) ? Promise.all(syncAsyncValues) : syncAsyncValues;
      }
    };
    function error(msg) {
      throw new Error(`Internal Error: ${msg}`);
    }
    exports.error = error;
    function syntaxError(msg, parseErrors) {
      const error2 = Error(msg);
      error2[ERROR_SYNTAX_ERROR] = true;
      if (parseErrors)
        error2[ERROR_PARSE_ERRORS] = parseErrors;
      return error2;
    }
    exports.syntaxError = syntaxError;
    var ERROR_SYNTAX_ERROR = "ngSyntaxError";
    var ERROR_PARSE_ERRORS = "ngParseErrors";
    function isSyntaxError(error2) {
      return error2[ERROR_SYNTAX_ERROR];
    }
    exports.isSyntaxError = isSyntaxError;
    function getParseErrors(error2) {
      return error2[ERROR_PARSE_ERRORS] || [];
    }
    exports.getParseErrors = getParseErrors;
    function escapeRegExp(s) {
      return s.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1");
    }
    exports.escapeRegExp = escapeRegExp;
    var STRING_MAP_PROTO = Object.getPrototypeOf({});
    function isStrictStringMap(obj) {
      return typeof obj === "object" && obj !== null && Object.getPrototypeOf(obj) === STRING_MAP_PROTO;
    }
    function utf8Encode(str) {
      let encoded = "";
      for (let index = 0; index < str.length; index++) {
        let codePoint = str.charCodeAt(index);
        if (codePoint >= 55296 && codePoint <= 56319 && str.length > index + 1) {
          const low = str.charCodeAt(index + 1);
          if (low >= 56320 && low <= 57343) {
            index++;
            codePoint = (codePoint - 55296 << 10) + low - 56320 + 65536;
          }
        }
        if (codePoint <= 127) {
          encoded += String.fromCharCode(codePoint);
        } else if (codePoint <= 2047) {
          encoded += String.fromCharCode(codePoint >> 6 & 31 | 192, codePoint & 63 | 128);
        } else if (codePoint <= 65535) {
          encoded += String.fromCharCode(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
        } else if (codePoint <= 2097151) {
          encoded += String.fromCharCode(codePoint >> 18 & 7 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
        }
      }
      return encoded;
    }
    exports.utf8Encode = utf8Encode;
    function stringify(token) {
      if (typeof token === "string") {
        return token;
      }
      if (token instanceof Array) {
        return "[" + token.map(stringify).join(", ") + "]";
      }
      if (token == null) {
        return "" + token;
      }
      if (token.overriddenName) {
        return `${token.overriddenName}`;
      }
      if (token.name) {
        return `${token.name}`;
      }
      if (!token.toString) {
        return "object";
      }
      const res = token.toString();
      if (res == null) {
        return "" + res;
      }
      const newLineIndex = res.indexOf("\n");
      return newLineIndex === -1 ? res : res.substring(0, newLineIndex);
    }
    exports.stringify = stringify;
    function resolveForwardRef(type2) {
      if (typeof type2 === "function" && type2.hasOwnProperty("__forward_ref__")) {
        return type2();
      } else {
        return type2;
      }
    }
    exports.resolveForwardRef = resolveForwardRef;
    function isPromise(obj) {
      return !!obj && typeof obj.then === "function";
    }
    exports.isPromise = isPromise;
    var Version = class {
      constructor(full) {
        this.full = full;
        const splits = full.split(".");
        this.major = splits[0];
        this.minor = splits[1];
        this.patch = splits.slice(2).join(".");
      }
    };
    exports.Version = Version;
    var __window = typeof window !== "undefined" && window;
    var __self = typeof self !== "undefined" && typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope && self;
    var __global = typeof globalThis !== "undefined" && globalThis;
    var _global = __global || __window || __self;
    exports.global = _global;
  }
});
var require_compile_metadata = __commonJS2({
  "node_modules/angular-html-parser/lib/compiler/src/compile_metadata.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var static_symbol_1 = require_static_symbol();
    var util_1 = require_util2();
    var HOST_REG_EXP = /^(?:(?:\[([^\]]+)\])|(?:\(([^\)]+)\)))|(\@[-\w]+)$/;
    function sanitizeIdentifier(name) {
      return name.replace(/\W/g, "_");
    }
    exports.sanitizeIdentifier = sanitizeIdentifier;
    var _anonymousTypeIndex = 0;
    function identifierName(compileIdentifier) {
      if (!compileIdentifier || !compileIdentifier.reference) {
        return null;
      }
      const ref = compileIdentifier.reference;
      if (ref instanceof static_symbol_1.StaticSymbol) {
        return ref.name;
      }
      if (ref["__anonymousType"]) {
        return ref["__anonymousType"];
      }
      let identifier = util_1.stringify(ref);
      if (identifier.indexOf("(") >= 0) {
        identifier = `anonymous_${_anonymousTypeIndex++}`;
        ref["__anonymousType"] = identifier;
      } else {
        identifier = sanitizeIdentifier(identifier);
      }
      return identifier;
    }
    exports.identifierName = identifierName;
    function identifierModuleUrl(compileIdentifier) {
      const ref = compileIdentifier.reference;
      if (ref instanceof static_symbol_1.StaticSymbol) {
        return ref.filePath;
      }
      return `./${util_1.stringify(ref)}`;
    }
    exports.identifierModuleUrl = identifierModuleUrl;
    function viewClassName(compType, embeddedTemplateIndex) {
      return `View_${identifierName({
        reference: compType
      })}_${embeddedTemplateIndex}`;
    }
    exports.viewClassName = viewClassName;
    function rendererTypeName(compType) {
      return `RenderType_${identifierName({
        reference: compType
      })}`;
    }
    exports.rendererTypeName = rendererTypeName;
    function hostViewClassName(compType) {
      return `HostView_${identifierName({
        reference: compType
      })}`;
    }
    exports.hostViewClassName = hostViewClassName;
    function componentFactoryName(compType) {
      return `${identifierName({
        reference: compType
      })}NgFactory`;
    }
    exports.componentFactoryName = componentFactoryName;
    var CompileSummaryKind;
    (function(CompileSummaryKind2) {
      CompileSummaryKind2[CompileSummaryKind2["Pipe"] = 0] = "Pipe";
      CompileSummaryKind2[CompileSummaryKind2["Directive"] = 1] = "Directive";
      CompileSummaryKind2[CompileSummaryKind2["NgModule"] = 2] = "NgModule";
      CompileSummaryKind2[CompileSummaryKind2["Injectable"] = 3] = "Injectable";
    })(CompileSummaryKind = exports.CompileSummaryKind || (exports.CompileSummaryKind = {}));
    function tokenName(token) {
      return token.value != null ? sanitizeIdentifier(token.value) : identifierName(token.identifier);
    }
    exports.tokenName = tokenName;
    function tokenReference(token) {
      if (token.identifier != null) {
        return token.identifier.reference;
      } else {
        return token.value;
      }
    }
    exports.tokenReference = tokenReference;
    var CompileStylesheetMetadata = class {
      constructor() {
        let {
          moduleUrl,
          styles,
          styleUrls
        } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        this.moduleUrl = moduleUrl || null;
        this.styles = _normalizeArray(styles);
        this.styleUrls = _normalizeArray(styleUrls);
      }
    };
    exports.CompileStylesheetMetadata = CompileStylesheetMetadata;
    var CompileTemplateMetadata = class {
      constructor(_ref73) {
        let {
          encapsulation,
          template,
          templateUrl,
          htmlAst,
          styles,
          styleUrls,
          externalStylesheets,
          animations,
          ngContentSelectors,
          interpolation,
          isInline,
          preserveWhitespaces
        } = _ref73;
        this.encapsulation = encapsulation;
        this.template = template;
        this.templateUrl = templateUrl;
        this.htmlAst = htmlAst;
        this.styles = _normalizeArray(styles);
        this.styleUrls = _normalizeArray(styleUrls);
        this.externalStylesheets = _normalizeArray(externalStylesheets);
        this.animations = animations ? flatten(animations) : [];
        this.ngContentSelectors = ngContentSelectors || [];
        if (interpolation && interpolation.length != 2) {
          throw new Error(`'interpolation' should have a start and an end symbol.`);
        }
        this.interpolation = interpolation;
        this.isInline = isInline;
        this.preserveWhitespaces = preserveWhitespaces;
      }
      toSummary() {
        return {
          ngContentSelectors: this.ngContentSelectors,
          encapsulation: this.encapsulation,
          styles: this.styles,
          animations: this.animations
        };
      }
    };
    exports.CompileTemplateMetadata = CompileTemplateMetadata;
    var CompileDirectiveMetadata = class {
      static create(_ref74) {
        let {
          isHost,
          type: type2,
          isComponent,
          selector,
          exportAs,
          changeDetection,
          inputs,
          outputs,
          host,
          providers,
          viewProviders,
          queries,
          guards,
          viewQueries,
          entryComponents,
          template,
          componentViewType,
          rendererType,
          componentFactory
        } = _ref74;
        const hostListeners = {};
        const hostProperties = {};
        const hostAttributes = {};
        if (host != null) {
          Object.keys(host).forEach((key) => {
            const value = host[key];
            const matches = key.match(HOST_REG_EXP);
            if (matches === null) {
              hostAttributes[key] = value;
            } else if (matches[1] != null) {
              hostProperties[matches[1]] = value;
            } else if (matches[2] != null) {
              hostListeners[matches[2]] = value;
            }
          });
        }
        const inputsMap = {};
        if (inputs != null) {
          inputs.forEach((bindConfig) => {
            const parts = util_1.splitAtColon(bindConfig, [bindConfig, bindConfig]);
            inputsMap[parts[0]] = parts[1];
          });
        }
        const outputsMap = {};
        if (outputs != null) {
          outputs.forEach((bindConfig) => {
            const parts = util_1.splitAtColon(bindConfig, [bindConfig, bindConfig]);
            outputsMap[parts[0]] = parts[1];
          });
        }
        return new CompileDirectiveMetadata({
          isHost,
          type: type2,
          isComponent: !!isComponent,
          selector,
          exportAs,
          changeDetection,
          inputs: inputsMap,
          outputs: outputsMap,
          hostListeners,
          hostProperties,
          hostAttributes,
          providers,
          viewProviders,
          queries,
          guards,
          viewQueries,
          entryComponents,
          template,
          componentViewType,
          rendererType,
          componentFactory
        });
      }
      constructor(_ref75) {
        let {
          isHost,
          type: type2,
          isComponent,
          selector,
          exportAs,
          changeDetection,
          inputs,
          outputs,
          hostListeners,
          hostProperties,
          hostAttributes,
          providers,
          viewProviders,
          queries,
          guards,
          viewQueries,
          entryComponents,
          template,
          componentViewType,
          rendererType,
          componentFactory
        } = _ref75;
        this.isHost = !!isHost;
        this.type = type2;
        this.isComponent = isComponent;
        this.selector = selector;
        this.exportAs = exportAs;
        this.changeDetection = changeDetection;
        this.inputs = inputs;
        this.outputs = outputs;
        this.hostListeners = hostListeners;
        this.hostProperties = hostProperties;
        this.hostAttributes = hostAttributes;
        this.providers = _normalizeArray(providers);
        this.viewProviders = _normalizeArray(viewProviders);
        this.queries = _normalizeArray(queries);
        this.guards = guards;
        this.viewQueries = _normalizeArray(viewQueries);
        this.entryComponents = _normalizeArray(entryComponents);
        this.template = template;
        this.componentViewType = componentViewType;
        this.rendererType = rendererType;
        this.componentFactory = componentFactory;
      }
      toSummary() {
        return {
          summaryKind: CompileSummaryKind.Directive,
          type: this.type,
          isComponent: this.isComponent,
          selector: this.selector,
          exportAs: this.exportAs,
          inputs: this.inputs,
          outputs: this.outputs,
          hostListeners: this.hostListeners,
          hostProperties: this.hostProperties,
          hostAttributes: this.hostAttributes,
          providers: this.providers,
          viewProviders: this.viewProviders,
          queries: this.queries,
          guards: this.guards,
          viewQueries: this.viewQueries,
          entryComponents: this.entryComponents,
          changeDetection: this.changeDetection,
          template: this.template && this.template.toSummary(),
          componentViewType: this.componentViewType,
          rendererType: this.rendererType,
          componentFactory: this.componentFactory
        };
      }
    };
    exports.CompileDirectiveMetadata = CompileDirectiveMetadata;
    var CompilePipeMetadata = class {
      constructor(_ref76) {
        let {
          type: type2,
          name,
          pure
        } = _ref76;
        this.type = type2;
        this.name = name;
        this.pure = !!pure;
      }
      toSummary() {
        return {
          summaryKind: CompileSummaryKind.Pipe,
          type: this.type,
          name: this.name,
          pure: this.pure
        };
      }
    };
    exports.CompilePipeMetadata = CompilePipeMetadata;
    var CompileShallowModuleMetadata = class {
    };
    exports.CompileShallowModuleMetadata = CompileShallowModuleMetadata;
    var CompileNgModuleMetadata = class {
      constructor(_ref77) {
        let {
          type: type2,
          providers,
          declaredDirectives,
          exportedDirectives,
          declaredPipes,
          exportedPipes,
          entryComponents,
          bootstrapComponents,
          importedModules,
          exportedModules,
          schemas,
          transitiveModule,
          id
        } = _ref77;
        this.type = type2 || null;
        this.declaredDirectives = _normalizeArray(declaredDirectives);
        this.exportedDirectives = _normalizeArray(exportedDirectives);
        this.declaredPipes = _normalizeArray(declaredPipes);
        this.exportedPipes = _normalizeArray(exportedPipes);
        this.providers = _normalizeArray(providers);
        this.entryComponents = _normalizeArray(entryComponents);
        this.bootstrapComponents = _normalizeArray(bootstrapComponents);
        this.importedModules = _normalizeArray(importedModules);
        this.exportedModules = _normalizeArray(exportedModules);
        this.schemas = _normalizeArray(schemas);
        this.id = id || null;
        this.transitiveModule = transitiveModule || null;
      }
      toSummary() {
        const module2 = this.transitiveModule;
        return {
          summaryKind: CompileSummaryKind.NgModule,
          type: this.type,
          entryComponents: module2.entryComponents,
          providers: module2.providers,
          modules: module2.modules,
          exportedDirectives: module2.exportedDirectives,
          exportedPipes: module2.exportedPipes
        };
      }
    };
    exports.CompileNgModuleMetadata = CompileNgModuleMetadata;
    var TransitiveCompileNgModuleMetadata = class {
      constructor() {
        this.directivesSet = /* @__PURE__ */ new Set();
        this.directives = [];
        this.exportedDirectivesSet = /* @__PURE__ */ new Set();
        this.exportedDirectives = [];
        this.pipesSet = /* @__PURE__ */ new Set();
        this.pipes = [];
        this.exportedPipesSet = /* @__PURE__ */ new Set();
        this.exportedPipes = [];
        this.modulesSet = /* @__PURE__ */ new Set();
        this.modules = [];
        this.entryComponentsSet = /* @__PURE__ */ new Set();
        this.entryComponents = [];
        this.providers = [];
      }
      addProvider(provider, module2) {
        this.providers.push({
          provider,
          module: module2
        });
      }
      addDirective(id) {
        if (!this.directivesSet.has(id.reference)) {
          this.directivesSet.add(id.reference);
          this.directives.push(id);
        }
      }
      addExportedDirective(id) {
        if (!this.exportedDirectivesSet.has(id.reference)) {
          this.exportedDirectivesSet.add(id.reference);
          this.exportedDirectives.push(id);
        }
      }
      addPipe(id) {
        if (!this.pipesSet.has(id.reference)) {
          this.pipesSet.add(id.reference);
          this.pipes.push(id);
        }
      }
      addExportedPipe(id) {
        if (!this.exportedPipesSet.has(id.reference)) {
          this.exportedPipesSet.add(id.reference);
          this.exportedPipes.push(id);
        }
      }
      addModule(id) {
        if (!this.modulesSet.has(id.reference)) {
          this.modulesSet.add(id.reference);
          this.modules.push(id);
        }
      }
      addEntryComponent(ec) {
        if (!this.entryComponentsSet.has(ec.componentType)) {
          this.entryComponentsSet.add(ec.componentType);
          this.entryComponents.push(ec);
        }
      }
    };
    exports.TransitiveCompileNgModuleMetadata = TransitiveCompileNgModuleMetadata;
    function _normalizeArray(obj) {
      return obj || [];
    }
    var ProviderMeta = class {
      constructor(token, _ref78) {
        let {
          useClass,
          useValue,
          useExisting,
          useFactory,
          deps,
          multi
        } = _ref78;
        this.token = token;
        this.useClass = useClass || null;
        this.useValue = useValue;
        this.useExisting = useExisting;
        this.useFactory = useFactory || null;
        this.dependencies = deps || null;
        this.multi = !!multi;
      }
    };
    exports.ProviderMeta = ProviderMeta;
    function flatten(list) {
      return list.reduce((flat2, item) => {
        const flatItem = Array.isArray(item) ? flatten(item) : item;
        return flat2.concat(flatItem);
      }, []);
    }
    exports.flatten = flatten;
    function jitSourceUrl(url) {
      return url.replace(/(\w+:\/\/[\w:-]+)?(\/+)?/, "ng:///");
    }
    function templateSourceUrl(ngModuleType, compMeta, templateMeta) {
      let url;
      if (templateMeta.isInline) {
        if (compMeta.type.reference instanceof static_symbol_1.StaticSymbol) {
          url = `${compMeta.type.reference.filePath}.${compMeta.type.reference.name}.html`;
        } else {
          url = `${identifierName(ngModuleType)}/${identifierName(compMeta.type)}.html`;
        }
      } else {
        url = templateMeta.templateUrl;
      }
      return compMeta.type.reference instanceof static_symbol_1.StaticSymbol ? url : jitSourceUrl(url);
    }
    exports.templateSourceUrl = templateSourceUrl;
    function sharedStylesheetJitUrl(meta, id) {
      const pathParts = meta.moduleUrl.split(/\/\\/g);
      const baseName = pathParts[pathParts.length - 1];
      return jitSourceUrl(`css/${id}${baseName}.ngstyle.js`);
    }
    exports.sharedStylesheetJitUrl = sharedStylesheetJitUrl;
    function ngModuleJitUrl(moduleMeta) {
      return jitSourceUrl(`${identifierName(moduleMeta.type)}/module.ngfactory.js`);
    }
    exports.ngModuleJitUrl = ngModuleJitUrl;
    function templateJitUrl(ngModuleType, compMeta) {
      return jitSourceUrl(`${identifierName(ngModuleType)}/${identifierName(compMeta.type)}.ngfactory.js`);
    }
    exports.templateJitUrl = templateJitUrl;
  }
});
var require_parse_util = __commonJS2({
  "node_modules/angular-html-parser/lib/compiler/src/parse_util.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var chars = require_chars();
    var compile_metadata_1 = require_compile_metadata();
    var ParseLocation = class {
      constructor(file, offset, line, col) {
        this.file = file;
        this.offset = offset;
        this.line = line;
        this.col = col;
      }
      toString() {
        return this.offset != null ? `${this.file.url}@${this.line}:${this.col}` : this.file.url;
      }
      moveBy(delta) {
        const source = this.file.content;
        const len = source.length;
        let offset = this.offset;
        let line = this.line;
        let col = this.col;
        while (offset > 0 && delta < 0) {
          offset--;
          delta++;
          const ch = source.charCodeAt(offset);
          if (ch == chars.$LF) {
            line--;
            const priorLine = source.substr(0, offset - 1).lastIndexOf(String.fromCharCode(chars.$LF));
            col = priorLine > 0 ? offset - priorLine : offset;
          } else {
            col--;
          }
        }
        while (offset < len && delta > 0) {
          const ch = source.charCodeAt(offset);
          offset++;
          delta--;
          if (ch == chars.$LF) {
            line++;
            col = 0;
          } else {
            col++;
          }
        }
        return new ParseLocation(this.file, offset, line, col);
      }
      getContext(maxChars, maxLines) {
        const content = this.file.content;
        let startOffset = this.offset;
        if (startOffset != null) {
          if (startOffset > content.length - 1) {
            startOffset = content.length - 1;
          }
          let endOffset = startOffset;
          let ctxChars = 0;
          let ctxLines = 0;
          while (ctxChars < maxChars && startOffset > 0) {
            startOffset--;
            ctxChars++;
            if (content[startOffset] == "\n") {
              if (++ctxLines == maxLines) {
                break;
              }
            }
          }
          ctxChars = 0;
          ctxLines = 0;
          while (ctxChars < maxChars && endOffset < content.length - 1) {
            endOffset++;
            ctxChars++;
            if (content[endOffset] == "\n") {
              if (++ctxLines == maxLines) {
                break;
              }
            }
          }
          return {
            before: content.substring(startOffset, this.offset),
            after: content.substring(this.offset, endOffset + 1)
          };
        }
        return null;
      }
    };
    exports.ParseLocation = ParseLocation;
    var ParseSourceFile = class {
      constructor(content, url) {
        this.content = content;
        this.url = url;
      }
    };
    exports.ParseSourceFile = ParseSourceFile;
    var ParseSourceSpan = class {
      constructor(start, end) {
        let details = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
        this.start = start;
        this.end = end;
        this.details = details;
      }
      toString() {
        return this.start.file.content.substring(this.start.offset, this.end.offset);
      }
    };
    exports.ParseSourceSpan = ParseSourceSpan;
    exports.EMPTY_PARSE_LOCATION = new ParseLocation(new ParseSourceFile("", ""), 0, 0, 0);
    exports.EMPTY_SOURCE_SPAN = new ParseSourceSpan(exports.EMPTY_PARSE_LOCATION, exports.EMPTY_PARSE_LOCATION);
    var ParseErrorLevel;
    (function(ParseErrorLevel2) {
      ParseErrorLevel2[ParseErrorLevel2["WARNING"] = 0] = "WARNING";
      ParseErrorLevel2[ParseErrorLevel2["ERROR"] = 1] = "ERROR";
    })(ParseErrorLevel = exports.ParseErrorLevel || (exports.ParseErrorLevel = {}));
    var ParseError = class {
      constructor(span, msg) {
        let level = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ParseErrorLevel.ERROR;
        this.span = span;
        this.msg = msg;
        this.level = level;
      }
      contextualMessage() {
        const ctx = this.span.start.getContext(100, 3);
        return ctx ? `${this.msg} ("${ctx.before}[${ParseErrorLevel[this.level]} ->]${ctx.after}")` : this.msg;
      }
      toString() {
        const details = this.span.details ? `, ${this.span.details}` : "";
        return `${this.contextualMessage()}: ${this.span.start}${details}`;
      }
    };
    exports.ParseError = ParseError;
    function typeSourceSpan(kind, type2) {
      const moduleUrl = compile_metadata_1.identifierModuleUrl(type2);
      const sourceFileName = moduleUrl != null ? `in ${kind} ${compile_metadata_1.identifierName(type2)} in ${moduleUrl}` : `in ${kind} ${compile_metadata_1.identifierName(type2)}`;
      const sourceFile = new ParseSourceFile("", sourceFileName);
      return new ParseSourceSpan(new ParseLocation(sourceFile, -1, -1, -1), new ParseLocation(sourceFile, -1, -1, -1));
    }
    exports.typeSourceSpan = typeSourceSpan;
    function r3JitTypeSourceSpan(kind, typeName, sourceUrl) {
      const sourceFileName = `in ${kind} ${typeName} in ${sourceUrl}`;
      const sourceFile = new ParseSourceFile("", sourceFileName);
      return new ParseSourceSpan(new ParseLocation(sourceFile, -1, -1, -1), new ParseLocation(sourceFile, -1, -1, -1));
    }
    exports.r3JitTypeSourceSpan = r3JitTypeSourceSpan;
  }
});
var require_print_preprocess3 = __commonJS2({
  "src/language-html/print-preprocess.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      ParseSourceSpan
    } = require_parse_util();
    var {
      htmlTrim,
      getLeadingAndTrailingHtmlWhitespace,
      hasHtmlWhitespace,
      canHaveInterpolation,
      getNodeCssStyleDisplay,
      isDanglingSpaceSensitiveNode,
      isIndentationSensitiveNode,
      isLeadingSpaceSensitiveNode,
      isTrailingSpaceSensitiveNode,
      isWhitespaceSensitiveNode,
      isVueScriptTag
    } = require_utils7();
    var PREPROCESS_PIPELINE = [removeIgnorableFirstLf, mergeIfConditionalStartEndCommentIntoElementOpeningTag, mergeCdataIntoText, extractInterpolation, extractWhitespaces, addCssDisplay, addIsSelfClosing, addHasHtmComponentClosingTag, addIsSpaceSensitive, mergeSimpleElementIntoText, markTsScript];
    function preprocess(ast, options) {
      for (const fn of PREPROCESS_PIPELINE) {
        fn(ast, options);
      }
      return ast;
    }
    function removeIgnorableFirstLf(ast) {
      ast.walk((node) => {
        if (node.type === "element" && node.tagDefinition.ignoreFirstLf && node.children.length > 0 && node.children[0].type === "text" && node.children[0].value[0] === "\n") {
          const text = node.children[0];
          if (text.value.length === 1) {
            node.removeChild(text);
          } else {
            text.value = text.value.slice(1);
          }
        }
      });
    }
    function mergeIfConditionalStartEndCommentIntoElementOpeningTag(ast) {
      const isTarget = (node) => node.type === "element" && node.prev && node.prev.type === "ieConditionalStartComment" && node.prev.sourceSpan.end.offset === node.startSourceSpan.start.offset && node.firstChild && node.firstChild.type === "ieConditionalEndComment" && node.firstChild.sourceSpan.start.offset === node.startSourceSpan.end.offset;
      ast.walk((node) => {
        if (node.children) {
          for (let i = 0; i < node.children.length; i++) {
            const child = node.children[i];
            if (!isTarget(child)) {
              continue;
            }
            const ieConditionalStartComment = child.prev;
            const ieConditionalEndComment = child.firstChild;
            node.removeChild(ieConditionalStartComment);
            i--;
            const startSourceSpan = new ParseSourceSpan(ieConditionalStartComment.sourceSpan.start, ieConditionalEndComment.sourceSpan.end);
            const sourceSpan = new ParseSourceSpan(startSourceSpan.start, child.sourceSpan.end);
            child.condition = ieConditionalStartComment.condition;
            child.sourceSpan = sourceSpan;
            child.startSourceSpan = startSourceSpan;
            child.removeChild(ieConditionalEndComment);
          }
        }
      });
    }
    function mergeNodeIntoText(ast, shouldMerge, getValue) {
      ast.walk((node) => {
        if (node.children) {
          for (let i = 0; i < node.children.length; i++) {
            const child = node.children[i];
            if (child.type !== "text" && !shouldMerge(child)) {
              continue;
            }
            if (child.type !== "text") {
              child.type = "text";
              child.value = getValue(child);
            }
            const prevChild = child.prev;
            if (!prevChild || prevChild.type !== "text") {
              continue;
            }
            prevChild.value += child.value;
            prevChild.sourceSpan = new ParseSourceSpan(prevChild.sourceSpan.start, child.sourceSpan.end);
            node.removeChild(child);
            i--;
          }
        }
      });
    }
    function mergeCdataIntoText(ast) {
      return mergeNodeIntoText(ast, (node) => node.type === "cdata", (node) => `<![CDATA[${node.value}]]>`);
    }
    function mergeSimpleElementIntoText(ast) {
      const isSimpleElement = (node) => node.type === "element" && node.attrs.length === 0 && node.children.length === 1 && node.firstChild.type === "text" && !hasHtmlWhitespace(node.children[0].value) && !node.firstChild.hasLeadingSpaces && !node.firstChild.hasTrailingSpaces && node.isLeadingSpaceSensitive && !node.hasLeadingSpaces && node.isTrailingSpaceSensitive && !node.hasTrailingSpaces && node.prev && node.prev.type === "text" && node.next && node.next.type === "text";
      ast.walk((node) => {
        if (node.children) {
          for (let i = 0; i < node.children.length; i++) {
            const child = node.children[i];
            if (!isSimpleElement(child)) {
              continue;
            }
            const prevChild = child.prev;
            const nextChild = child.next;
            prevChild.value += `<${child.rawName}>` + child.firstChild.value + `</${child.rawName}>` + nextChild.value;
            prevChild.sourceSpan = new ParseSourceSpan(prevChild.sourceSpan.start, nextChild.sourceSpan.end);
            prevChild.isTrailingSpaceSensitive = nextChild.isTrailingSpaceSensitive;
            prevChild.hasTrailingSpaces = nextChild.hasTrailingSpaces;
            node.removeChild(child);
            i--;
            node.removeChild(nextChild);
          }
        }
      });
    }
    function extractInterpolation(ast, options) {
      if (options.parser === "html") {
        return;
      }
      const interpolationRegex = /{{(.+?)}}/s;
      ast.walk((node) => {
        if (!canHaveInterpolation(node)) {
          return;
        }
        for (const child of node.children) {
          if (child.type !== "text") {
            continue;
          }
          let startSourceSpan = child.sourceSpan.start;
          let endSourceSpan = null;
          const components = child.value.split(interpolationRegex);
          for (let i = 0; i < components.length; i++, startSourceSpan = endSourceSpan) {
            const value = components[i];
            if (i % 2 === 0) {
              endSourceSpan = startSourceSpan.moveBy(value.length);
              if (value.length > 0) {
                node.insertChildBefore(child, {
                  type: "text",
                  value,
                  sourceSpan: new ParseSourceSpan(startSourceSpan, endSourceSpan)
                });
              }
              continue;
            }
            endSourceSpan = startSourceSpan.moveBy(value.length + 4);
            node.insertChildBefore(child, {
              type: "interpolation",
              sourceSpan: new ParseSourceSpan(startSourceSpan, endSourceSpan),
              children: value.length === 0 ? [] : [{
                type: "text",
                value,
                sourceSpan: new ParseSourceSpan(startSourceSpan.moveBy(2), endSourceSpan.moveBy(-2))
              }]
            });
          }
          node.removeChild(child);
        }
      });
    }
    function extractWhitespaces(ast) {
      ast.walk((node) => {
        if (!node.children) {
          return;
        }
        if (node.children.length === 0 || node.children.length === 1 && node.children[0].type === "text" && htmlTrim(node.children[0].value).length === 0) {
          node.hasDanglingSpaces = node.children.length > 0;
          node.children = [];
          return;
        }
        const isWhitespaceSensitive = isWhitespaceSensitiveNode(node);
        const isIndentationSensitive = isIndentationSensitiveNode(node);
        if (!isWhitespaceSensitive) {
          for (let i = 0; i < node.children.length; i++) {
            const child = node.children[i];
            if (child.type !== "text") {
              continue;
            }
            const {
              leadingWhitespace,
              text,
              trailingWhitespace
            } = getLeadingAndTrailingHtmlWhitespace(child.value);
            const prevChild = child.prev;
            const nextChild = child.next;
            if (!text) {
              node.removeChild(child);
              i--;
              if (leadingWhitespace || trailingWhitespace) {
                if (prevChild) {
                  prevChild.hasTrailingSpaces = true;
                }
                if (nextChild) {
                  nextChild.hasLeadingSpaces = true;
                }
              }
            } else {
              child.value = text;
              child.sourceSpan = new ParseSourceSpan(child.sourceSpan.start.moveBy(leadingWhitespace.length), child.sourceSpan.end.moveBy(-trailingWhitespace.length));
              if (leadingWhitespace) {
                if (prevChild) {
                  prevChild.hasTrailingSpaces = true;
                }
                child.hasLeadingSpaces = true;
              }
              if (trailingWhitespace) {
                child.hasTrailingSpaces = true;
                if (nextChild) {
                  nextChild.hasLeadingSpaces = true;
                }
              }
            }
          }
        }
        node.isWhitespaceSensitive = isWhitespaceSensitive;
        node.isIndentationSensitive = isIndentationSensitive;
      });
    }
    function addIsSelfClosing(ast) {
      ast.walk((node) => {
        node.isSelfClosing = !node.children || node.type === "element" && (node.tagDefinition.isVoid || node.startSourceSpan === node.endSourceSpan);
      });
    }
    function addHasHtmComponentClosingTag(ast, options) {
      ast.walk((node) => {
        if (node.type !== "element") {
          return;
        }
        node.hasHtmComponentClosingTag = node.endSourceSpan && /^<\s*\/\s*\/\s*>$/.test(options.originalText.slice(node.endSourceSpan.start.offset, node.endSourceSpan.end.offset));
      });
    }
    function addCssDisplay(ast, options) {
      ast.walk((node) => {
        node.cssDisplay = getNodeCssStyleDisplay(node, options);
      });
    }
    function addIsSpaceSensitive(ast, options) {
      ast.walk((node) => {
        const {
          children
        } = node;
        if (!children) {
          return;
        }
        if (children.length === 0) {
          node.isDanglingSpaceSensitive = isDanglingSpaceSensitiveNode(node);
          return;
        }
        for (const child of children) {
          child.isLeadingSpaceSensitive = isLeadingSpaceSensitiveNode(child, options);
          child.isTrailingSpaceSensitive = isTrailingSpaceSensitiveNode(child, options);
        }
        for (let index = 0; index < children.length; index++) {
          const child = children[index];
          child.isLeadingSpaceSensitive = index === 0 ? child.isLeadingSpaceSensitive : child.prev.isTrailingSpaceSensitive && child.isLeadingSpaceSensitive;
          child.isTrailingSpaceSensitive = index === children.length - 1 ? child.isTrailingSpaceSensitive : child.next.isLeadingSpaceSensitive && child.isTrailingSpaceSensitive;
        }
      });
    }
    function markTsScript(ast, options) {
      if (options.parser === "vue") {
        const vueScriptTag = ast.children.find((child) => isVueScriptTag(child, options));
        if (!vueScriptTag) {
          return;
        }
        const {
          lang
        } = vueScriptTag.attrMap;
        if (lang === "ts" || lang === "typescript") {
          options.__should_parse_vue_template_with_ts = true;
        }
      }
    }
    module.exports = preprocess;
  }
});
var require_pragma5 = __commonJS2({
  "src/language-html/pragma.js"(exports, module) {
    "use strict";
    init_define_process();
    function hasPragma(text) {
      return /^\s*<!--\s*@(?:format|prettier)\s*-->/.test(text);
    }
    function insertPragma(text) {
      return "<!-- @format -->\n\n" + text.replace(/^\s*\n/, "");
    }
    module.exports = {
      hasPragma,
      insertPragma
    };
  }
});
var require_loc6 = __commonJS2({
  "src/language-html/loc.js"(exports, module) {
    "use strict";
    init_define_process();
    function locStart(node) {
      return node.sourceSpan.start.offset;
    }
    function locEnd(node) {
      return node.sourceSpan.end.offset;
    }
    module.exports = {
      locStart,
      locEnd
    };
  }
});
var require_tag = __commonJS2({
  "src/language-html/print/tag.js"(exports, module) {
    "use strict";
    init_define_process();
    var assert = require_assert();
    var {
      isNonEmptyArray
    } = require_util();
    var {
      builders: {
        indent,
        join: join2,
        line,
        softline,
        hardline
      },
      utils: {
        replaceTextEndOfLine
      }
    } = require_document();
    var {
      locStart,
      locEnd
    } = require_loc6();
    var {
      isTextLikeNode,
      getLastDescendant,
      isPreLikeNode,
      hasPrettierIgnore,
      shouldPreserveContent,
      isVueSfcBlock
    } = require_utils7();
    function printClosingTag(node, options) {
      return [node.isSelfClosing ? "" : printClosingTagStart(node, options), printClosingTagEnd(node, options)];
    }
    function printClosingTagStart(node, options) {
      return node.lastChild && needsToBorrowParentClosingTagStartMarker(node.lastChild) ? "" : [printClosingTagPrefix(node, options), printClosingTagStartMarker(node, options)];
    }
    function printClosingTagEnd(node, options) {
      return (node.next ? needsToBorrowPrevClosingTagEndMarker(node.next) : needsToBorrowLastChildClosingTagEndMarker(node.parent)) ? "" : [printClosingTagEndMarker(node, options), printClosingTagSuffix(node, options)];
    }
    function printClosingTagPrefix(node, options) {
      return needsToBorrowLastChildClosingTagEndMarker(node) ? printClosingTagEndMarker(node.lastChild, options) : "";
    }
    function printClosingTagSuffix(node, options) {
      return needsToBorrowParentClosingTagStartMarker(node) ? printClosingTagStartMarker(node.parent, options) : needsToBorrowNextOpeningTagStartMarker(node) ? printOpeningTagStartMarker(node.next) : "";
    }
    function printClosingTagStartMarker(node, options) {
      assert(!node.isSelfClosing);
      if (shouldNotPrintClosingTag(node, options)) {
        return "";
      }
      switch (node.type) {
        case "ieConditionalComment":
          return "<!";
        case "element":
          if (node.hasHtmComponentClosingTag) {
            return "<//";
          }
        default:
          return `</${node.rawName}`;
      }
    }
    function printClosingTagEndMarker(node, options) {
      if (shouldNotPrintClosingTag(node, options)) {
        return "";
      }
      switch (node.type) {
        case "ieConditionalComment":
        case "ieConditionalEndComment":
          return "[endif]-->";
        case "ieConditionalStartComment":
          return "]><!-->";
        case "interpolation":
          return "}}";
        case "element":
          if (node.isSelfClosing) {
            return "/>";
          }
        default:
          return ">";
      }
    }
    function shouldNotPrintClosingTag(node, options) {
      return !node.isSelfClosing && !node.endSourceSpan && (hasPrettierIgnore(node) || shouldPreserveContent(node.parent, options));
    }
    function needsToBorrowPrevClosingTagEndMarker(node) {
      return node.prev && node.prev.type !== "docType" && !isTextLikeNode(node.prev) && node.isLeadingSpaceSensitive && !node.hasLeadingSpaces;
    }
    function needsToBorrowLastChildClosingTagEndMarker(node) {
      return node.lastChild && node.lastChild.isTrailingSpaceSensitive && !node.lastChild.hasTrailingSpaces && !isTextLikeNode(getLastDescendant(node.lastChild)) && !isPreLikeNode(node);
    }
    function needsToBorrowParentClosingTagStartMarker(node) {
      return !node.next && !node.hasTrailingSpaces && node.isTrailingSpaceSensitive && isTextLikeNode(getLastDescendant(node));
    }
    function needsToBorrowNextOpeningTagStartMarker(node) {
      return node.next && !isTextLikeNode(node.next) && isTextLikeNode(node) && node.isTrailingSpaceSensitive && !node.hasTrailingSpaces;
    }
    function getPrettierIgnoreAttributeCommentData(value) {
      const match = value.trim().match(/^prettier-ignore-attribute(?:\s+(.+))?$/s);
      if (!match) {
        return false;
      }
      if (!match[1]) {
        return true;
      }
      return match[1].split(/\s+/);
    }
    function needsToBorrowParentOpeningTagEndMarker(node) {
      return !node.prev && node.isLeadingSpaceSensitive && !node.hasLeadingSpaces;
    }
    function printAttributes(path, options, print) {
      const node = path.getValue();
      if (!isNonEmptyArray(node.attrs)) {
        return node.isSelfClosing ? " " : "";
      }
      const ignoreAttributeData = node.prev && node.prev.type === "comment" && getPrettierIgnoreAttributeCommentData(node.prev.value);
      const hasPrettierIgnoreAttribute = typeof ignoreAttributeData === "boolean" ? () => ignoreAttributeData : Array.isArray(ignoreAttributeData) ? (attribute) => ignoreAttributeData.includes(attribute.rawName) : () => false;
      const printedAttributes = path.map((attributePath) => {
        const attribute = attributePath.getValue();
        return hasPrettierIgnoreAttribute(attribute) ? replaceTextEndOfLine(options.originalText.slice(locStart(attribute), locEnd(attribute))) : print();
      }, "attrs");
      const forceNotToBreakAttrContent = node.type === "element" && node.fullName === "script" && node.attrs.length === 1 && node.attrs[0].fullName === "src" && node.children.length === 0;
      const shouldPrintAttributePerLine = options.singleAttributePerLine && node.attrs.length > 1 && !isVueSfcBlock(node, options);
      const attributeLine = shouldPrintAttributePerLine ? hardline : line;
      const parts = [indent([forceNotToBreakAttrContent ? " " : line, join2(attributeLine, printedAttributes)])];
      if (node.firstChild && needsToBorrowParentOpeningTagEndMarker(node.firstChild) || node.isSelfClosing && needsToBorrowLastChildClosingTagEndMarker(node.parent) || forceNotToBreakAttrContent) {
        parts.push(node.isSelfClosing ? " " : "");
      } else {
        parts.push(options.bracketSameLine ? node.isSelfClosing ? " " : "" : node.isSelfClosing ? line : softline);
      }
      return parts;
    }
    function printOpeningTagEnd(node) {
      return node.firstChild && needsToBorrowParentOpeningTagEndMarker(node.firstChild) ? "" : printOpeningTagEndMarker(node);
    }
    function printOpeningTag(path, options, print) {
      const node = path.getValue();
      return [printOpeningTagStart(node, options), printAttributes(path, options, print), node.isSelfClosing ? "" : printOpeningTagEnd(node)];
    }
    function printOpeningTagStart(node, options) {
      return node.prev && needsToBorrowNextOpeningTagStartMarker(node.prev) ? "" : [printOpeningTagPrefix(node, options), printOpeningTagStartMarker(node)];
    }
    function printOpeningTagPrefix(node, options) {
      return needsToBorrowParentOpeningTagEndMarker(node) ? printOpeningTagEndMarker(node.parent) : needsToBorrowPrevClosingTagEndMarker(node) ? printClosingTagEndMarker(node.prev, options) : "";
    }
    function printOpeningTagStartMarker(node) {
      switch (node.type) {
        case "ieConditionalComment":
        case "ieConditionalStartComment":
          return `<!--[if ${node.condition}`;
        case "ieConditionalEndComment":
          return "<!--<!";
        case "interpolation":
          return "{{";
        case "docType":
          return "<!DOCTYPE";
        case "element":
          if (node.condition) {
            return `<!--[if ${node.condition}]><!--><${node.rawName}`;
          }
        default:
          return `<${node.rawName}`;
      }
    }
    function printOpeningTagEndMarker(node) {
      assert(!node.isSelfClosing);
      switch (node.type) {
        case "ieConditionalComment":
          return "]>";
        case "element":
          if (node.condition) {
            return "><!--<![endif]-->";
          }
        default:
          return ">";
      }
    }
    module.exports = {
      printClosingTag,
      printClosingTagStart,
      printClosingTagStartMarker,
      printClosingTagEndMarker,
      printClosingTagSuffix,
      printClosingTagEnd,
      needsToBorrowLastChildClosingTagEndMarker,
      needsToBorrowParentClosingTagStartMarker,
      needsToBorrowPrevClosingTagEndMarker,
      printOpeningTag,
      printOpeningTagStart,
      printOpeningTagPrefix,
      printOpeningTagStartMarker,
      printOpeningTagEndMarker,
      needsToBorrowNextOpeningTagStartMarker,
      needsToBorrowParentOpeningTagEndMarker
    };
  }
});
var require_parse_srcset = __commonJS2({
  "node_modules/parse-srcset/src/parse-srcset.js"(exports, module) {
    init_define_process();
    (function(root, factory) {
      if (typeof define === "function" && define.amd) {
        define([], factory);
      } else if (typeof module === "object" && module.exports) {
        module.exports = factory();
      } else {
        root.parseSrcset = factory();
      }
    })(exports, function() {
      return function(input, options) {
        var logger = options && options.logger || console;
        function isSpace(c2) {
          return c2 === " " || c2 === "	" || c2 === "\n" || c2 === "\f" || c2 === "\r";
        }
        function collectCharacters(regEx) {
          var chars, match = regEx.exec(input.substring(pos));
          if (match) {
            chars = match[0];
            pos += chars.length;
            return chars;
          }
        }
        var inputLength = input.length, regexLeadingSpaces = /^[ \t\n\r\u000c]+/, regexLeadingCommasOrSpaces = /^[, \t\n\r\u000c]+/, regexLeadingNotSpaces = /^[^ \t\n\r\u000c]+/, regexTrailingCommas = /[,]+$/, regexNonNegativeInteger = /^\d+$/, regexFloatingPoint = /^-?(?:[0-9]+|[0-9]*\.[0-9]+)(?:[eE][+-]?[0-9]+)?$/, url, descriptors, currentDescriptor, state, c, pos = 0, candidates = [];
        while (true) {
          collectCharacters(regexLeadingCommasOrSpaces);
          if (pos >= inputLength) {
            return candidates;
          }
          url = collectCharacters(regexLeadingNotSpaces);
          descriptors = [];
          if (url.slice(-1) === ",") {
            url = url.replace(regexTrailingCommas, "");
            parseDescriptors();
          } else {
            tokenize();
          }
        }
        function tokenize() {
          collectCharacters(regexLeadingSpaces);
          currentDescriptor = "";
          state = "in descriptor";
          while (true) {
            c = input.charAt(pos);
            if (state === "in descriptor") {
              if (isSpace(c)) {
                if (currentDescriptor) {
                  descriptors.push(currentDescriptor);
                  currentDescriptor = "";
                  state = "after descriptor";
                }
              } else if (c === ",") {
                pos += 1;
                if (currentDescriptor) {
                  descriptors.push(currentDescriptor);
                }
                parseDescriptors();
                return;
              } else if (c === "(") {
                currentDescriptor = currentDescriptor + c;
                state = "in parens";
              } else if (c === "") {
                if (currentDescriptor) {
                  descriptors.push(currentDescriptor);
                }
                parseDescriptors();
                return;
              } else {
                currentDescriptor = currentDescriptor + c;
              }
            } else if (state === "in parens") {
              if (c === ")") {
                currentDescriptor = currentDescriptor + c;
                state = "in descriptor";
              } else if (c === "") {
                descriptors.push(currentDescriptor);
                parseDescriptors();
                return;
              } else {
                currentDescriptor = currentDescriptor + c;
              }
            } else if (state === "after descriptor") {
              if (isSpace(c)) {
              } else if (c === "") {
                parseDescriptors();
                return;
              } else {
                state = "in descriptor";
                pos -= 1;
              }
            }
            pos += 1;
          }
        }
        function parseDescriptors() {
          var pError = false, w, d, h, i, candidate = {}, desc, lastChar, value, intVal, floatVal;
          for (i = 0; i < descriptors.length; i++) {
            desc = descriptors[i];
            lastChar = desc[desc.length - 1];
            value = desc.substring(0, desc.length - 1);
            intVal = parseInt(value, 10);
            floatVal = parseFloat(value);
            if (regexNonNegativeInteger.test(value) && lastChar === "w") {
              if (w || d) {
                pError = true;
              }
              if (intVal === 0) {
                pError = true;
              } else {
                w = intVal;
              }
            } else if (regexFloatingPoint.test(value) && lastChar === "x") {
              if (w || d || h) {
                pError = true;
              }
              if (floatVal < 0) {
                pError = true;
              } else {
                d = floatVal;
              }
            } else if (regexNonNegativeInteger.test(value) && lastChar === "h") {
              if (h || d) {
                pError = true;
              }
              if (intVal === 0) {
                pError = true;
              } else {
                h = intVal;
              }
            } else {
              pError = true;
            }
          }
          if (!pError) {
            candidate.url = url;
            if (w) {
              candidate.w = w;
            }
            if (d) {
              candidate.d = d;
            }
            if (h) {
              candidate.h = h;
            }
            candidates.push(candidate);
          } else if (logger && logger.error) {
            logger.error("Invalid srcset descriptor found in '" + input + "' at '" + desc + "'.");
          }
        }
      };
    });
  }
});
var require_syntax_attribute = __commonJS2({
  "src/language-html/syntax-attribute.js"(exports, module) {
    "use strict";
    init_define_process();
    var parseSrcset = require_parse_srcset();
    var {
      builders: {
        ifBreak,
        join: join2,
        line
      }
    } = require_document();
    function printImgSrcset(value) {
      const srcset = parseSrcset(value, {
        logger: {
          error(message) {
            throw new Error(message);
          }
        }
      });
      const hasW = srcset.some((_ref79) => {
        let {
          w
        } = _ref79;
        return w;
      });
      const hasH = srcset.some((_ref80) => {
        let {
          h
        } = _ref80;
        return h;
      });
      const hasX = srcset.some((_ref81) => {
        let {
          d
        } = _ref81;
        return d;
      });
      if (hasW + hasH + hasX > 1) {
        throw new Error("Mixed descriptor in srcset is not supported");
      }
      const key = hasW ? "w" : hasH ? "h" : "d";
      const unit = hasW ? "w" : hasH ? "h" : "x";
      const getMax = (values) => Math.max(...values);
      const urls = srcset.map((src) => src.url);
      const maxUrlLength = getMax(urls.map((url) => url.length));
      const descriptors = srcset.map((src) => src[key]).map((descriptor) => descriptor ? descriptor.toString() : "");
      const descriptorLeftLengths = descriptors.map((descriptor) => {
        const index = descriptor.indexOf(".");
        return index === -1 ? descriptor.length : index;
      });
      const maxDescriptorLeftLength = getMax(descriptorLeftLengths);
      return join2([",", line], urls.map((url, index) => {
        const parts = [url];
        const descriptor = descriptors[index];
        if (descriptor) {
          const urlPadding = maxUrlLength - url.length + 1;
          const descriptorPadding = maxDescriptorLeftLength - descriptorLeftLengths[index];
          const alignment = " ".repeat(urlPadding + descriptorPadding);
          parts.push(ifBreak(alignment, " "), descriptor + unit);
        }
        return parts;
      }));
    }
    function printClassNames(value) {
      return value.trim().split(/\s+/).join(" ");
    }
    module.exports = {
      printImgSrcset,
      printClassNames
    };
  }
});
var require_syntax_vue = __commonJS2({
  "src/language-html/syntax-vue.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      builders: {
        group
      }
    } = require_document();
    function printVueFor(value, textToDoc) {
      const {
        left,
        operator,
        right
      } = parseVueFor(value);
      return [group(textToDoc(`function _(${left}) {}`, {
        parser: "babel",
        __isVueForBindingLeft: true
      })), " ", operator, " ", textToDoc(right, {
        parser: "__js_expression"
      }, {
        stripTrailingHardline: true
      })];
    }
    function parseVueFor(value) {
      const forAliasRE = /(.*?)\s+(in|of)\s+(.*)/s;
      const forIteratorRE = /,([^,\]}]*)(?:,([^,\]}]*))?$/;
      const stripParensRE = /^\(|\)$/g;
      const inMatch = value.match(forAliasRE);
      if (!inMatch) {
        return;
      }
      const res = {};
      res.for = inMatch[3].trim();
      if (!res.for) {
        return;
      }
      const alias = inMatch[1].trim().replace(stripParensRE, "");
      const iteratorMatch = alias.match(forIteratorRE);
      if (iteratorMatch) {
        res.alias = alias.replace(forIteratorRE, "");
        res.iterator1 = iteratorMatch[1].trim();
        if (iteratorMatch[2]) {
          res.iterator2 = iteratorMatch[2].trim();
        }
      } else {
        res.alias = alias;
      }
      const left = [res.alias, res.iterator1, res.iterator2];
      if (left.some((part, index) => !part && (index === 0 || left.slice(index + 1).some(Boolean)))) {
        return;
      }
      return {
        left: left.filter(Boolean).join(","),
        operator: inMatch[2],
        right: res.for
      };
    }
    function printVueBindings(value, textToDoc) {
      return textToDoc(`function _(${value}) {}`, {
        parser: "babel",
        __isVueBindings: true
      });
    }
    function isVueEventBindingExpression(eventBindingValue) {
      const fnExpRE = /^(?:[\w$]+|\([^)]*\))\s*=>|^function\s*\(/;
      const simplePathRE = /^[$A-Z_a-z][\w$]*(?:\.[$A-Z_a-z][\w$]*|\['[^']*']|\["[^"]*"]|\[\d+]|\[[$A-Z_a-z][\w$]*])*$/;
      const value = eventBindingValue.trim();
      return fnExpRE.test(value) || simplePathRE.test(value);
    }
    module.exports = {
      isVueEventBindingExpression,
      printVueFor,
      printVueBindings
    };
  }
});
var require_get_node_content = __commonJS2({
  "src/language-html/get-node-content.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      needsToBorrowParentClosingTagStartMarker,
      printClosingTagStartMarker,
      needsToBorrowLastChildClosingTagEndMarker,
      printClosingTagEndMarker,
      needsToBorrowParentOpeningTagEndMarker,
      printOpeningTagEndMarker
    } = require_tag();
    function getNodeContent(node, options) {
      let start = node.startSourceSpan.end.offset;
      if (node.firstChild && needsToBorrowParentOpeningTagEndMarker(node.firstChild)) {
        start -= printOpeningTagEndMarker(node).length;
      }
      let end = node.endSourceSpan.start.offset;
      if (node.lastChild && needsToBorrowParentClosingTagStartMarker(node.lastChild)) {
        end += printClosingTagStartMarker(node, options).length;
      } else if (needsToBorrowLastChildClosingTagEndMarker(node)) {
        end -= printClosingTagEndMarker(node.lastChild, options).length;
      }
      return options.originalText.slice(start, end);
    }
    module.exports = getNodeContent;
  }
});
var require_embed4 = __commonJS2({
  "src/language-html/embed.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      builders: {
        breakParent,
        group,
        hardline,
        indent,
        line,
        fill,
        softline
      },
      utils: {
        mapDoc,
        replaceTextEndOfLine
      }
    } = require_document();
    var printFrontMatter = require_print();
    var {
      printClosingTag,
      printClosingTagSuffix,
      needsToBorrowPrevClosingTagEndMarker,
      printOpeningTagPrefix,
      printOpeningTag
    } = require_tag();
    var {
      printImgSrcset,
      printClassNames
    } = require_syntax_attribute();
    var {
      printVueFor,
      printVueBindings,
      isVueEventBindingExpression
    } = require_syntax_vue();
    var {
      isScriptLikeTag,
      isVueNonHtmlBlock,
      inferScriptParser,
      htmlTrimPreserveIndentation,
      dedentString,
      unescapeQuoteEntities,
      isVueSlotAttribute,
      isVueSfcBindingsAttribute,
      getTextValueParts
    } = require_utils7();
    var getNodeContent = require_get_node_content();
    function printEmbeddedAttributeValue(node, htmlTextToDoc, options) {
      const isKeyMatched = (patterns) => new RegExp(patterns.join("|")).test(node.fullName);
      const getValue = () => unescapeQuoteEntities(node.value);
      let shouldHug = false;
      const __onHtmlBindingRoot = (root, options2) => {
        const rootNode = root.type === "NGRoot" ? root.node.type === "NGMicrosyntax" && root.node.body.length === 1 && root.node.body[0].type === "NGMicrosyntaxExpression" ? root.node.body[0].expression : root.node : root.type === "JsExpressionRoot" ? root.node : root;
        if (rootNode && (rootNode.type === "ObjectExpression" || rootNode.type === "ArrayExpression" || options2.parser === "__vue_expression" && (rootNode.type === "TemplateLiteral" || rootNode.type === "StringLiteral"))) {
          shouldHug = true;
        }
      };
      const printHug = (doc) => group(doc);
      const printExpand = function(doc) {
        let canHaveTrailingWhitespace = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
        return group([indent([softline, doc]), canHaveTrailingWhitespace ? softline : ""]);
      };
      const printMaybeHug = (doc) => shouldHug ? printHug(doc) : printExpand(doc);
      const attributeTextToDoc = (code, opts) => htmlTextToDoc(code, Object.assign({
        __onHtmlBindingRoot,
        __embeddedInHtml: true
      }, opts));
      if (node.fullName === "srcset" && (node.parent.fullName === "img" || node.parent.fullName === "source")) {
        return printExpand(printImgSrcset(getValue()));
      }
      if (node.fullName === "class" && !options.parentParser) {
        const value = getValue();
        if (!value.includes("{{")) {
          return printClassNames(value);
        }
      }
      if (node.fullName === "style" && !options.parentParser) {
        const value = getValue();
        if (!value.includes("{{")) {
          return printExpand(attributeTextToDoc(value, {
            parser: "css",
            __isHTMLStyleAttribute: true
          }));
        }
      }
      if (options.parser === "vue") {
        if (node.fullName === "v-for") {
          return printVueFor(getValue(), attributeTextToDoc);
        }
        if (isVueSlotAttribute(node) || isVueSfcBindingsAttribute(node, options)) {
          return printVueBindings(getValue(), attributeTextToDoc);
        }
        const vueEventBindingPatterns = ["^@", "^v-on:"];
        const vueExpressionBindingPatterns = ["^:", "^v-bind:"];
        const jsExpressionBindingPatterns = ["^v-"];
        if (isKeyMatched(vueEventBindingPatterns)) {
          const value = getValue();
          const parser = isVueEventBindingExpression(value) ? "__js_expression" : options.__should_parse_vue_template_with_ts ? "__vue_ts_event_binding" : "__vue_event_binding";
          return printMaybeHug(attributeTextToDoc(value, {
            parser
          }));
        }
        if (isKeyMatched(vueExpressionBindingPatterns)) {
          return printMaybeHug(attributeTextToDoc(getValue(), {
            parser: "__vue_expression"
          }));
        }
        if (isKeyMatched(jsExpressionBindingPatterns)) {
          return printMaybeHug(attributeTextToDoc(getValue(), {
            parser: "__js_expression"
          }));
        }
      }
      if (options.parser === "angular") {
        const ngTextToDoc = (code, opts) => attributeTextToDoc(code, Object.assign(Object.assign({}, opts), {}, {
          trailingComma: "none"
        }));
        const ngDirectiveBindingPatterns = ["^\\*"];
        const ngStatementBindingPatterns = ["^\\(.+\\)$", "^on-"];
        const ngExpressionBindingPatterns = ["^\\[.+\\]$", "^bind(on)?-", "^ng-(if|show|hide|class|style)$"];
        const ngI18nPatterns = ["^i18n(-.+)?$"];
        if (isKeyMatched(ngStatementBindingPatterns)) {
          return printMaybeHug(ngTextToDoc(getValue(), {
            parser: "__ng_action"
          }));
        }
        if (isKeyMatched(ngExpressionBindingPatterns)) {
          return printMaybeHug(ngTextToDoc(getValue(), {
            parser: "__ng_binding"
          }));
        }
        if (isKeyMatched(ngI18nPatterns)) {
          const value2 = getValue().trim();
          return printExpand(fill(getTextValueParts(node, value2)), !value2.includes("@@"));
        }
        if (isKeyMatched(ngDirectiveBindingPatterns)) {
          return printMaybeHug(ngTextToDoc(getValue(), {
            parser: "__ng_directive"
          }));
        }
        const interpolationRegex = /{{(.+?)}}/s;
        const value = getValue();
        if (interpolationRegex.test(value)) {
          const parts = [];
          for (const [index, part] of value.split(interpolationRegex).entries()) {
            if (index % 2 === 0) {
              parts.push(replaceTextEndOfLine(part));
            } else {
              try {
                parts.push(group(["{{", indent([line, ngTextToDoc(part, {
                  parser: "__ng_interpolation",
                  __isInHtmlInterpolation: true
                })]), line, "}}"]));
              } catch {
                parts.push("{{", replaceTextEndOfLine(part), "}}");
              }
            }
          }
          return group(parts);
        }
      }
      return null;
    }
    function embed(path, print, textToDoc, options) {
      const node = path.getValue();
      switch (node.type) {
        case "element": {
          if (isScriptLikeTag(node) || node.type === "interpolation") {
            return;
          }
          if (!node.isSelfClosing && isVueNonHtmlBlock(node, options)) {
            const parser = inferScriptParser(node, options);
            if (!parser) {
              return;
            }
            const content = getNodeContent(node, options);
            let isEmpty = /^\s*$/.test(content);
            let doc = "";
            if (!isEmpty) {
              doc = textToDoc(htmlTrimPreserveIndentation(content), {
                parser,
                __embeddedInHtml: true
              }, {
                stripTrailingHardline: true
              });
              isEmpty = doc === "";
            }
            return [printOpeningTagPrefix(node, options), group(printOpeningTag(path, options, print)), isEmpty ? "" : hardline, doc, isEmpty ? "" : hardline, printClosingTag(node, options), printClosingTagSuffix(node, options)];
          }
          break;
        }
        case "text": {
          if (isScriptLikeTag(node.parent)) {
            const parser = inferScriptParser(node.parent, options);
            if (parser) {
              const value = parser === "markdown" ? dedentString(node.value.replace(/^[^\S\n]*\n/, "")) : node.value;
              const textToDocOptions = {
                parser,
                __embeddedInHtml: true
              };
              if (options.parser === "html" && parser === "babel") {
                let sourceType = "script";
                const {
                  attrMap
                } = node.parent;
                if (attrMap && (attrMap.type === "module" || attrMap.type === "text/babel" && attrMap["data-type"] === "module")) {
                  sourceType = "module";
                }
                textToDocOptions.__babelSourceType = sourceType;
              }
              return [breakParent, printOpeningTagPrefix(node, options), textToDoc(value, textToDocOptions, {
                stripTrailingHardline: true
              }), printClosingTagSuffix(node, options)];
            }
          } else if (node.parent.type === "interpolation") {
            const textToDocOptions = {
              __isInHtmlInterpolation: true,
              __embeddedInHtml: true
            };
            if (options.parser === "angular") {
              textToDocOptions.parser = "__ng_interpolation";
              textToDocOptions.trailingComma = "none";
            } else if (options.parser === "vue") {
              textToDocOptions.parser = options.__should_parse_vue_template_with_ts ? "__vue_ts_expression" : "__vue_expression";
            } else {
              textToDocOptions.parser = "__js_expression";
            }
            return [indent([line, textToDoc(node.value, textToDocOptions, {
              stripTrailingHardline: true
            })]), node.parent.next && needsToBorrowPrevClosingTagEndMarker(node.parent.next) ? " " : line];
          }
          break;
        }
        case "attribute": {
          if (!node.value) {
            break;
          }
          if (/^PRETTIER_HTML_PLACEHOLDER_\d+_\d+_IN_JS$/.test(options.originalText.slice(node.valueSpan.start.offset, node.valueSpan.end.offset))) {
            return [node.rawName, "=", node.value];
          }
          if (options.parser === "lwc") {
            const interpolationRegex = /^{.*}$/s;
            if (interpolationRegex.test(options.originalText.slice(node.valueSpan.start.offset, node.valueSpan.end.offset))) {
              return [node.rawName, "=", node.value];
            }
          }
          const embeddedAttributeValueDoc = printEmbeddedAttributeValue(node, (code, opts) => textToDoc(code, Object.assign({
            __isInHtmlAttribute: true,
            __embeddedInHtml: true
          }, opts), {
            stripTrailingHardline: true
          }), options);
          if (embeddedAttributeValueDoc) {
            return [node.rawName, '="', group(mapDoc(embeddedAttributeValueDoc, (doc) => typeof doc === "string" ? doc.replace(/"/g, "&quot;") : doc)), '"'];
          }
          break;
        }
        case "front-matter":
          return printFrontMatter(node, textToDoc);
      }
    }
    module.exports = embed;
  }
});
var require_children = __commonJS2({
  "src/language-html/print/children.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      builders: {
        breakParent,
        group,
        ifBreak,
        line,
        softline,
        hardline
      },
      utils: {
        replaceTextEndOfLine
      }
    } = require_document();
    var {
      locStart,
      locEnd
    } = require_loc6();
    var {
      forceBreakChildren,
      forceNextEmptyLine,
      isTextLikeNode,
      hasPrettierIgnore,
      preferHardlineAsLeadingSpaces
    } = require_utils7();
    var {
      printOpeningTagPrefix,
      needsToBorrowNextOpeningTagStartMarker,
      printOpeningTagStartMarker,
      needsToBorrowPrevClosingTagEndMarker,
      printClosingTagEndMarker,
      printClosingTagSuffix,
      needsToBorrowParentClosingTagStartMarker
    } = require_tag();
    function printChild(childPath, options, print) {
      const child = childPath.getValue();
      if (hasPrettierIgnore(child)) {
        return [printOpeningTagPrefix(child, options), ...replaceTextEndOfLine(options.originalText.slice(locStart(child) + (child.prev && needsToBorrowNextOpeningTagStartMarker(child.prev) ? printOpeningTagStartMarker(child).length : 0), locEnd(child) - (child.next && needsToBorrowPrevClosingTagEndMarker(child.next) ? printClosingTagEndMarker(child, options).length : 0))), printClosingTagSuffix(child, options)];
      }
      return print();
    }
    function printBetweenLine(prevNode, nextNode) {
      return isTextLikeNode(prevNode) && isTextLikeNode(nextNode) ? prevNode.isTrailingSpaceSensitive ? prevNode.hasTrailingSpaces ? preferHardlineAsLeadingSpaces(nextNode) ? hardline : line : "" : preferHardlineAsLeadingSpaces(nextNode) ? hardline : softline : needsToBorrowNextOpeningTagStartMarker(prevNode) && (hasPrettierIgnore(nextNode) || nextNode.firstChild || nextNode.isSelfClosing || nextNode.type === "element" && nextNode.attrs.length > 0) || prevNode.type === "element" && prevNode.isSelfClosing && needsToBorrowPrevClosingTagEndMarker(nextNode) ? "" : !nextNode.isLeadingSpaceSensitive || preferHardlineAsLeadingSpaces(nextNode) || needsToBorrowPrevClosingTagEndMarker(nextNode) && prevNode.lastChild && needsToBorrowParentClosingTagStartMarker(prevNode.lastChild) && prevNode.lastChild.lastChild && needsToBorrowParentClosingTagStartMarker(prevNode.lastChild.lastChild) ? hardline : nextNode.hasLeadingSpaces ? line : softline;
    }
    function printChildren(path, options, print) {
      const node = path.getValue();
      if (forceBreakChildren(node)) {
        return [breakParent, ...path.map((childPath) => {
          const childNode = childPath.getValue();
          const prevBetweenLine = !childNode.prev ? "" : printBetweenLine(childNode.prev, childNode);
          return [!prevBetweenLine ? "" : [prevBetweenLine, forceNextEmptyLine(childNode.prev) ? hardline : ""], printChild(childPath, options, print)];
        }, "children")];
      }
      const groupIds = node.children.map(() => Symbol(""));
      return path.map((childPath, childIndex) => {
        const childNode = childPath.getValue();
        if (isTextLikeNode(childNode)) {
          if (childNode.prev && isTextLikeNode(childNode.prev)) {
            const prevBetweenLine2 = printBetweenLine(childNode.prev, childNode);
            if (prevBetweenLine2) {
              if (forceNextEmptyLine(childNode.prev)) {
                return [hardline, hardline, printChild(childPath, options, print)];
              }
              return [prevBetweenLine2, printChild(childPath, options, print)];
            }
          }
          return printChild(childPath, options, print);
        }
        const prevParts = [];
        const leadingParts = [];
        const trailingParts = [];
        const nextParts = [];
        const prevBetweenLine = childNode.prev ? printBetweenLine(childNode.prev, childNode) : "";
        const nextBetweenLine = childNode.next ? printBetweenLine(childNode, childNode.next) : "";
        if (prevBetweenLine) {
          if (forceNextEmptyLine(childNode.prev)) {
            prevParts.push(hardline, hardline);
          } else if (prevBetweenLine === hardline) {
            prevParts.push(hardline);
          } else {
            if (isTextLikeNode(childNode.prev)) {
              leadingParts.push(prevBetweenLine);
            } else {
              leadingParts.push(ifBreak("", softline, {
                groupId: groupIds[childIndex - 1]
              }));
            }
          }
        }
        if (nextBetweenLine) {
          if (forceNextEmptyLine(childNode)) {
            if (isTextLikeNode(childNode.next)) {
              nextParts.push(hardline, hardline);
            }
          } else if (nextBetweenLine === hardline) {
            if (isTextLikeNode(childNode.next)) {
              nextParts.push(hardline);
            }
          } else {
            trailingParts.push(nextBetweenLine);
          }
        }
        return [...prevParts, group([...leadingParts, group([printChild(childPath, options, print), ...trailingParts], {
          id: groupIds[childIndex]
        })]), ...nextParts];
      }, "children");
    }
    module.exports = {
      printChildren
    };
  }
});
var require_element = __commonJS2({
  "src/language-html/print/element.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      builders: {
        breakParent,
        dedentToRoot,
        group,
        ifBreak,
        indentIfBreak,
        indent,
        line,
        softline
      },
      utils: {
        replaceTextEndOfLine
      }
    } = require_document();
    var getNodeContent = require_get_node_content();
    var {
      shouldPreserveContent,
      isScriptLikeTag,
      isVueCustomBlock,
      countParents,
      forceBreakContent
    } = require_utils7();
    var {
      printOpeningTagPrefix,
      printOpeningTag,
      printClosingTagSuffix,
      printClosingTag,
      needsToBorrowPrevClosingTagEndMarker,
      needsToBorrowLastChildClosingTagEndMarker
    } = require_tag();
    var {
      printChildren
    } = require_children();
    function printElement(path, options, print) {
      const node = path.getValue();
      if (shouldPreserveContent(node, options)) {
        return [printOpeningTagPrefix(node, options), group(printOpeningTag(path, options, print)), ...replaceTextEndOfLine(getNodeContent(node, options)), ...printClosingTag(node, options), printClosingTagSuffix(node, options)];
      }
      const shouldHugContent = node.children.length === 1 && node.firstChild.type === "interpolation" && node.firstChild.isLeadingSpaceSensitive && !node.firstChild.hasLeadingSpaces && node.lastChild.isTrailingSpaceSensitive && !node.lastChild.hasTrailingSpaces;
      const attrGroupId = Symbol("element-attr-group-id");
      const printTag = (doc) => group([group(printOpeningTag(path, options, print), {
        id: attrGroupId
      }), doc, printClosingTag(node, options)]);
      const printChildrenDoc = (childrenDoc) => {
        if (shouldHugContent) {
          return indentIfBreak(childrenDoc, {
            groupId: attrGroupId
          });
        }
        if ((isScriptLikeTag(node) || isVueCustomBlock(node, options)) && node.parent.type === "root" && options.parser === "vue" && !options.vueIndentScriptAndStyle) {
          return childrenDoc;
        }
        return indent(childrenDoc);
      };
      const printLineBeforeChildren = () => {
        if (shouldHugContent) {
          return ifBreak(softline, "", {
            groupId: attrGroupId
          });
        }
        if (node.firstChild.hasLeadingSpaces && node.firstChild.isLeadingSpaceSensitive) {
          return line;
        }
        if (node.firstChild.type === "text" && node.isWhitespaceSensitive && node.isIndentationSensitive) {
          return dedentToRoot(softline);
        }
        return softline;
      };
      const printLineAfterChildren = () => {
        const needsToBorrow = node.next ? needsToBorrowPrevClosingTagEndMarker(node.next) : needsToBorrowLastChildClosingTagEndMarker(node.parent);
        if (needsToBorrow) {
          if (node.lastChild.hasTrailingSpaces && node.lastChild.isTrailingSpaceSensitive) {
            return " ";
          }
          return "";
        }
        if (shouldHugContent) {
          return ifBreak(softline, "", {
            groupId: attrGroupId
          });
        }
        if (node.lastChild.hasTrailingSpaces && node.lastChild.isTrailingSpaceSensitive) {
          return line;
        }
        if ((node.lastChild.type === "comment" || node.lastChild.type === "text" && node.isWhitespaceSensitive && node.isIndentationSensitive) && new RegExp(`\\n[\\t ]{${options.tabWidth * countParents(path, (node2) => node2.parent && node2.parent.type !== "root")}}$`).test(node.lastChild.value)) {
          return "";
        }
        return softline;
      };
      if (node.children.length === 0) {
        return printTag(node.hasDanglingSpaces && node.isDanglingSpaceSensitive ? line : "");
      }
      return printTag([forceBreakContent(node) ? breakParent : "", printChildrenDoc([printLineBeforeChildren(), printChildren(path, options, print)]), printLineAfterChildren()]);
    }
    module.exports = {
      printElement
    };
  }
});
var require_printer_html = __commonJS2({
  "src/language-html/printer-html.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      builders: {
        fill,
        group,
        hardline,
        literalline
      },
      utils: {
        cleanDoc,
        getDocParts,
        isConcat,
        replaceTextEndOfLine
      }
    } = require_document();
    var clean = require_clean5();
    var {
      countChars,
      unescapeQuoteEntities,
      getTextValueParts
    } = require_utils7();
    var preprocess = require_print_preprocess3();
    var {
      insertPragma
    } = require_pragma5();
    var {
      locStart,
      locEnd
    } = require_loc6();
    var embed = require_embed4();
    var {
      printClosingTagSuffix,
      printClosingTagEnd,
      printOpeningTagPrefix,
      printOpeningTagStart
    } = require_tag();
    var {
      printElement
    } = require_element();
    var {
      printChildren
    } = require_children();
    function genericPrint(path, options, print) {
      const node = path.getValue();
      switch (node.type) {
        case "front-matter":
          return replaceTextEndOfLine(node.raw);
        case "root":
          if (options.__onHtmlRoot) {
            options.__onHtmlRoot(node);
          }
          return [group(printChildren(path, options, print)), hardline];
        case "element":
        case "ieConditionalComment": {
          return printElement(path, options, print);
        }
        case "ieConditionalStartComment":
        case "ieConditionalEndComment":
          return [printOpeningTagStart(node), printClosingTagEnd(node)];
        case "interpolation":
          return [printOpeningTagStart(node, options), ...path.map(print, "children"), printClosingTagEnd(node, options)];
        case "text": {
          if (node.parent.type === "interpolation") {
            const trailingNewlineRegex = /\n[^\S\n]*$/;
            const hasTrailingNewline = trailingNewlineRegex.test(node.value);
            const value = hasTrailingNewline ? node.value.replace(trailingNewlineRegex, "") : node.value;
            return [...replaceTextEndOfLine(value), hasTrailingNewline ? hardline : ""];
          }
          const printed = cleanDoc([printOpeningTagPrefix(node, options), ...getTextValueParts(node), printClosingTagSuffix(node, options)]);
          if (isConcat(printed) || printed.type === "fill") {
            return fill(getDocParts(printed));
          }
          return printed;
        }
        case "docType":
          return [group([printOpeningTagStart(node, options), " ", node.value.replace(/^html\b/i, "html").replace(/\s+/g, " ")]), printClosingTagEnd(node, options)];
        case "comment": {
          return [printOpeningTagPrefix(node, options), ...replaceTextEndOfLine(options.originalText.slice(locStart(node), locEnd(node)), literalline), printClosingTagSuffix(node, options)];
        }
        case "attribute": {
          if (node.value === null) {
            return node.rawName;
          }
          const value = unescapeQuoteEntities(node.value);
          const singleQuoteCount = countChars(value, "'");
          const doubleQuoteCount = countChars(value, '"');
          const quote = singleQuoteCount < doubleQuoteCount ? "'" : '"';
          return [node.rawName, "=", quote, ...replaceTextEndOfLine(quote === '"' ? value.replace(/"/g, "&quot;") : value.replace(/'/g, "&apos;")), quote];
        }
        default:
          throw new Error(`Unexpected node type ${node.type}`);
      }
    }
    module.exports = {
      preprocess,
      print: genericPrint,
      insertPragma,
      massageAstNode: clean,
      embed
    };
  }
});
var require_options6 = __commonJS2({
  "src/language-html/options.js"(exports, module) {
    "use strict";
    init_define_process();
    var commonOptions = require_common_options();
    var CATEGORY_HTML = "HTML";
    module.exports = {
      bracketSameLine: commonOptions.bracketSameLine,
      htmlWhitespaceSensitivity: {
        since: "1.15.0",
        category: CATEGORY_HTML,
        type: "choice",
        default: "css",
        description: "How to handle whitespaces in HTML.",
        choices: [{
          value: "css",
          description: "Respect the default value of CSS display property."
        }, {
          value: "strict",
          description: "Whitespaces are considered sensitive."
        }, {
          value: "ignore",
          description: "Whitespaces are considered insensitive."
        }]
      },
      singleAttributePerLine: commonOptions.singleAttributePerLine,
      vueIndentScriptAndStyle: {
        since: "1.19.0",
        category: CATEGORY_HTML,
        type: "boolean",
        default: false,
        description: "Indent script and style tags in Vue files."
      }
    };
  }
});
var require_parsers6 = __commonJS2({
  "src/language-html/parsers.js"() {
    init_define_process();
  }
});
var require_HTML = __commonJS2({
  "node_modules/linguist-languages/data/HTML.json"(exports, module) {
    module.exports = {
      name: "HTML",
      type: "markup",
      tmScope: "text.html.basic",
      aceMode: "html",
      codemirrorMode: "htmlmixed",
      codemirrorMimeType: "text/html",
      color: "#e34c26",
      aliases: ["xhtml"],
      extensions: [".html", ".hta", ".htm", ".html.hl", ".inc", ".xht", ".xhtml"],
      languageId: 146
    };
  }
});
var require_Vue = __commonJS2({
  "node_modules/linguist-languages/data/Vue.json"(exports, module) {
    module.exports = {
      name: "Vue",
      type: "markup",
      color: "#41b883",
      extensions: [".vue"],
      tmScope: "text.html.vue",
      aceMode: "html",
      languageId: 391
    };
  }
});
var require_language_html = __commonJS2({
  "src/language-html/index.js"(exports, module) {
    "use strict";
    init_define_process();
    var createLanguage = require_create_language();
    var printer = require_printer_html();
    var options = require_options6();
    var parsers = require_parsers6();
    var languages = [createLanguage(require_HTML(), () => ({
      name: "Angular",
      since: "1.15.0",
      parsers: ["angular"],
      vscodeLanguageIds: ["html"],
      extensions: [".component.html"],
      filenames: []
    })), createLanguage(require_HTML(), (data) => ({
      since: "1.15.0",
      parsers: ["html"],
      vscodeLanguageIds: ["html"],
      extensions: [...data.extensions, ".mjml"]
    })), createLanguage(require_HTML(), () => ({
      name: "Lightning Web Components",
      since: "1.17.0",
      parsers: ["lwc"],
      vscodeLanguageIds: ["html"],
      extensions: [],
      filenames: []
    })), createLanguage(require_Vue(), () => ({
      since: "1.10.0",
      parsers: ["vue"],
      vscodeLanguageIds: ["vue"]
    }))];
    var printers = {
      html: printer
    };
    module.exports = {
      languages,
      printers,
      options,
      parsers
    };
  }
});
var require_pragma6 = __commonJS2({
  "src/language-yaml/pragma.js"(exports, module) {
    "use strict";
    init_define_process();
    function isPragma(text) {
      return /^\s*@(?:prettier|format)\s*$/.test(text);
    }
    function hasPragma(text) {
      return /^\s*#[^\S\n]*@(?:prettier|format)\s*?(?:\n|$)/.test(text);
    }
    function insertPragma(text) {
      return `# @format

${text}`;
    }
    module.exports = {
      isPragma,
      hasPragma,
      insertPragma
    };
  }
});
var require_loc7 = __commonJS2({
  "src/language-yaml/loc.js"(exports, module) {
    "use strict";
    init_define_process();
    function locStart(node) {
      return node.position.start.offset;
    }
    function locEnd(node) {
      return node.position.end.offset;
    }
    module.exports = {
      locStart,
      locEnd
    };
  }
});
var require_embed5 = __commonJS2({
  "src/language-yaml/embed.js"(exports, module) {
    "use strict";
    init_define_process();
    function embed(path, print, textToDoc, options) {
      const node = path.getValue();
      if (node.type === "root" && options.filepath && /(?:[/\\]|^)\.(?:prettier|stylelint|lintstaged)rc$/.test(options.filepath)) {
        return textToDoc(options.originalText, Object.assign(Object.assign({}, options), {}, {
          parser: "json"
        }));
      }
    }
    module.exports = embed;
  }
});
var require_utils8 = __commonJS2({
  "src/language-yaml/utils.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      getLast,
      isNonEmptyArray
    } = require_util();
    function getAncestorCount(path, filter2) {
      let counter = 0;
      const pathStackLength = path.stack.length - 1;
      for (let i = 0; i < pathStackLength; i++) {
        const value = path.stack[i];
        if (isNode(value) && filter2(value)) {
          counter++;
        }
      }
      return counter;
    }
    function isNode(value, types) {
      return value && typeof value.type === "string" && (!types || types.includes(value.type));
    }
    function mapNode(node, callback, parent) {
      return callback("children" in node ? Object.assign(Object.assign({}, node), {}, {
        children: node.children.map((childNode) => mapNode(childNode, callback, node))
      }) : node, parent);
    }
    function defineShortcut(x, key, getter) {
      Object.defineProperty(x, key, {
        get: getter,
        enumerable: false
      });
    }
    function isNextLineEmpty(node, text) {
      let newlineCount = 0;
      const textLength = text.length;
      for (let i = node.position.end.offset - 1; i < textLength; i++) {
        const char = text[i];
        if (char === "\n") {
          newlineCount++;
        }
        if (newlineCount === 1 && /\S/.test(char)) {
          return false;
        }
        if (newlineCount === 2) {
          return true;
        }
      }
      return false;
    }
    function isLastDescendantNode(path) {
      const node = path.getValue();
      switch (node.type) {
        case "tag":
        case "anchor":
        case "comment":
          return false;
      }
      const pathStackLength = path.stack.length;
      for (let i = 1; i < pathStackLength; i++) {
        const item = path.stack[i];
        const parentItem = path.stack[i - 1];
        if (Array.isArray(parentItem) && typeof item === "number" && item !== parentItem.length - 1) {
          return false;
        }
      }
      return true;
    }
    function getLastDescendantNode(node) {
      return isNonEmptyArray(node.children) ? getLastDescendantNode(getLast(node.children)) : node;
    }
    function isPrettierIgnore(comment) {
      return comment.value.trim() === "prettier-ignore";
    }
    function hasPrettierIgnore(path) {
      const node = path.getValue();
      if (node.type === "documentBody") {
        const document2 = path.getParentNode();
        return hasEndComments(document2.head) && isPrettierIgnore(getLast(document2.head.endComments));
      }
      return hasLeadingComments(node) && isPrettierIgnore(getLast(node.leadingComments));
    }
    function isEmptyNode(node) {
      return !isNonEmptyArray(node.children) && !hasComments(node);
    }
    function hasComments(node) {
      return hasLeadingComments(node) || hasMiddleComments(node) || hasIndicatorComment(node) || hasTrailingComment(node) || hasEndComments(node);
    }
    function hasLeadingComments(node) {
      return isNonEmptyArray(node === null || node === void 0 ? void 0 : node.leadingComments);
    }
    function hasMiddleComments(node) {
      return isNonEmptyArray(node === null || node === void 0 ? void 0 : node.middleComments);
    }
    function hasIndicatorComment(node) {
      return node === null || node === void 0 ? void 0 : node.indicatorComment;
    }
    function hasTrailingComment(node) {
      return node === null || node === void 0 ? void 0 : node.trailingComment;
    }
    function hasEndComments(node) {
      return isNonEmptyArray(node === null || node === void 0 ? void 0 : node.endComments);
    }
    function splitWithSingleSpace(text) {
      const parts = [];
      let lastPart;
      for (const part of text.split(/( +)/)) {
        if (part !== " ") {
          if (lastPart === " ") {
            parts.push(part);
          } else {
            parts.push((parts.pop() || "") + part);
          }
        } else if (lastPart === void 0) {
          parts.unshift("");
        }
        lastPart = part;
      }
      if (lastPart === " ") {
        parts.push((parts.pop() || "") + " ");
      }
      if (parts[0] === "") {
        parts.shift();
        parts.unshift(" " + (parts.shift() || ""));
      }
      return parts;
    }
    function getFlowScalarLineContents(nodeType, content, options) {
      const rawLineContents = content.split("\n").map((lineContent, index, lineContents) => index === 0 && index === lineContents.length - 1 ? lineContent : index !== 0 && index !== lineContents.length - 1 ? lineContent.trim() : index === 0 ? lineContent.trimEnd() : lineContent.trimStart());
      if (options.proseWrap === "preserve") {
        return rawLineContents.map((lineContent) => lineContent.length === 0 ? [] : [lineContent]);
      }
      return rawLineContents.map((lineContent) => lineContent.length === 0 ? [] : splitWithSingleSpace(lineContent)).reduce((reduced, lineContentWords, index) => index !== 0 && rawLineContents[index - 1].length > 0 && lineContentWords.length > 0 && !(nodeType === "quoteDouble" && getLast(getLast(reduced)).endsWith("\\")) ? [...reduced.slice(0, -1), [...getLast(reduced), ...lineContentWords]] : [...reduced, lineContentWords], []).map((lineContentWords) => options.proseWrap === "never" ? [lineContentWords.join(" ")] : lineContentWords);
    }
    function getBlockValueLineContents(node, _ref82) {
      let {
        parentIndent,
        isLastDescendant,
        options
      } = _ref82;
      const content = node.position.start.line === node.position.end.line ? "" : options.originalText.slice(node.position.start.offset, node.position.end.offset).match(/^[^\n]*\n(.*)$/s)[1];
      let leadingSpaceCount;
      if (node.indent === null) {
        const matches = content.match(/^(?<leadingSpace> *)[^\n\r ]/m);
        leadingSpaceCount = matches ? matches.groups.leadingSpace.length : Number.POSITIVE_INFINITY;
      } else {
        leadingSpaceCount = node.indent - 1 + parentIndent;
      }
      const rawLineContents = content.split("\n").map((lineContent) => lineContent.slice(leadingSpaceCount));
      if (options.proseWrap === "preserve" || node.type === "blockLiteral") {
        return removeUnnecessaryTrailingNewlines(rawLineContents.map((lineContent) => lineContent.length === 0 ? [] : [lineContent]));
      }
      return removeUnnecessaryTrailingNewlines(rawLineContents.map((lineContent) => lineContent.length === 0 ? [] : splitWithSingleSpace(lineContent)).reduce((reduced, lineContentWords, index) => index !== 0 && rawLineContents[index - 1].length > 0 && lineContentWords.length > 0 && !/^\s/.test(lineContentWords[0]) && !/^\s|\s$/.test(getLast(reduced)) ? [...reduced.slice(0, -1), [...getLast(reduced), ...lineContentWords]] : [...reduced, lineContentWords], []).map((lineContentWords) => lineContentWords.reduce((reduced, word) => reduced.length > 0 && /\s$/.test(getLast(reduced)) ? [...reduced.slice(0, -1), getLast(reduced) + " " + word] : [...reduced, word], [])).map((lineContentWords) => options.proseWrap === "never" ? [lineContentWords.join(" ")] : lineContentWords));
      function removeUnnecessaryTrailingNewlines(lineContents) {
        if (node.chomping === "keep") {
          return getLast(lineContents).length === 0 ? lineContents.slice(0, -1) : lineContents;
        }
        let trailingNewlineCount = 0;
        for (let i = lineContents.length - 1; i >= 0; i--) {
          if (lineContents[i].length === 0) {
            trailingNewlineCount++;
          } else {
            break;
          }
        }
        return trailingNewlineCount === 0 ? lineContents : trailingNewlineCount >= 2 && !isLastDescendant ? lineContents.slice(0, -(trailingNewlineCount - 1)) : lineContents.slice(0, -trailingNewlineCount);
      }
    }
    function isInlineNode(node) {
      if (!node) {
        return true;
      }
      switch (node.type) {
        case "plain":
        case "quoteDouble":
        case "quoteSingle":
        case "alias":
        case "flowMapping":
        case "flowSequence":
          return true;
        default:
          return false;
      }
    }
    module.exports = {
      getLast,
      getAncestorCount,
      isNode,
      isEmptyNode,
      isInlineNode,
      mapNode,
      defineShortcut,
      isNextLineEmpty,
      isLastDescendantNode,
      getBlockValueLineContents,
      getFlowScalarLineContents,
      getLastDescendantNode,
      hasPrettierIgnore,
      hasLeadingComments,
      hasMiddleComments,
      hasIndicatorComment,
      hasTrailingComment,
      hasEndComments
    };
  }
});
var require_print_preprocess4 = __commonJS2({
  "src/language-yaml/print-preprocess.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      defineShortcut,
      mapNode
    } = require_utils8();
    function preprocess(ast) {
      return mapNode(ast, defineShortcuts);
    }
    function defineShortcuts(node) {
      switch (node.type) {
        case "document":
          defineShortcut(node, "head", () => node.children[0]);
          defineShortcut(node, "body", () => node.children[1]);
          break;
        case "documentBody":
        case "sequenceItem":
        case "flowSequenceItem":
        case "mappingKey":
        case "mappingValue":
          defineShortcut(node, "content", () => node.children[0]);
          break;
        case "mappingItem":
        case "flowMappingItem":
          defineShortcut(node, "key", () => node.children[0]);
          defineShortcut(node, "value", () => node.children[1]);
          break;
      }
      return node;
    }
    module.exports = preprocess;
  }
});
var require_misc2 = __commonJS2({
  "src/language-yaml/print/misc.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      builders: {
        softline,
        align
      }
    } = require_document();
    var {
      hasEndComments,
      isNextLineEmpty,
      isNode
    } = require_utils8();
    var printedEmptyLineCache = /* @__PURE__ */ new WeakMap();
    function printNextEmptyLine(path, originalText) {
      const node = path.getValue();
      const root = path.stack[0];
      let isNextEmptyLinePrintedSet;
      if (printedEmptyLineCache.has(root)) {
        isNextEmptyLinePrintedSet = printedEmptyLineCache.get(root);
      } else {
        isNextEmptyLinePrintedSet = /* @__PURE__ */ new Set();
        printedEmptyLineCache.set(root, isNextEmptyLinePrintedSet);
      }
      if (!isNextEmptyLinePrintedSet.has(node.position.end.line)) {
        isNextEmptyLinePrintedSet.add(node.position.end.line);
        if (isNextLineEmpty(node, originalText) && !shouldPrintEndComments(path.getParentNode())) {
          return softline;
        }
      }
      return "";
    }
    function shouldPrintEndComments(node) {
      return hasEndComments(node) && !isNode(node, ["documentHead", "documentBody", "flowMapping", "flowSequence"]);
    }
    function alignWithSpaces(width, doc) {
      return align(" ".repeat(width), doc);
    }
    module.exports = {
      alignWithSpaces,
      shouldPrintEndComments,
      printNextEmptyLine
    };
  }
});
var require_flow_mapping_sequence = __commonJS2({
  "src/language-yaml/print/flow-mapping-sequence.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      builders: {
        ifBreak,
        line,
        softline,
        hardline,
        join: join2
      }
    } = require_document();
    var {
      isEmptyNode,
      getLast,
      hasEndComments
    } = require_utils8();
    var {
      printNextEmptyLine,
      alignWithSpaces
    } = require_misc2();
    function printFlowMapping(path, print, options) {
      const node = path.getValue();
      const isMapping = node.type === "flowMapping";
      const openMarker = isMapping ? "{" : "[";
      const closeMarker = isMapping ? "}" : "]";
      let bracketSpacing = softline;
      if (isMapping && node.children.length > 0 && options.bracketSpacing) {
        bracketSpacing = line;
      }
      const lastItem = getLast(node.children);
      const isLastItemEmptyMappingItem = lastItem && lastItem.type === "flowMappingItem" && isEmptyNode(lastItem.key) && isEmptyNode(lastItem.value);
      return [openMarker, alignWithSpaces(options.tabWidth, [bracketSpacing, printChildren(path, print, options), options.trailingComma === "none" ? "" : ifBreak(","), hasEndComments(node) ? [hardline, join2(hardline, path.map(print, "endComments"))] : ""]), isLastItemEmptyMappingItem ? "" : bracketSpacing, closeMarker];
    }
    function printChildren(path, print, options) {
      const node = path.getValue();
      const parts = path.map((childPath, index) => [print(), index === node.children.length - 1 ? "" : [",", line, node.children[index].position.start.line !== node.children[index + 1].position.start.line ? printNextEmptyLine(childPath, options.originalText) : ""]], "children");
      return parts;
    }
    module.exports = {
      printFlowMapping,
      printFlowSequence: printFlowMapping
    };
  }
});
var require_mapping_item = __commonJS2({
  "src/language-yaml/print/mapping-item.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      builders: {
        conditionalGroup,
        group,
        hardline,
        ifBreak,
        join: join2,
        line
      }
    } = require_document();
    var {
      hasLeadingComments,
      hasMiddleComments,
      hasTrailingComment,
      hasEndComments,
      isNode,
      isEmptyNode,
      isInlineNode
    } = require_utils8();
    var {
      alignWithSpaces
    } = require_misc2();
    function printMappingItem(node, parentNode, path, print, options) {
      const {
        key,
        value
      } = node;
      const isEmptyMappingKey = isEmptyNode(key);
      const isEmptyMappingValue = isEmptyNode(value);
      if (isEmptyMappingKey && isEmptyMappingValue) {
        return ": ";
      }
      const printedKey = print("key");
      const spaceBeforeColon = needsSpaceInFrontOfMappingValue(node) ? " " : "";
      if (isEmptyMappingValue) {
        if (node.type === "flowMappingItem" && parentNode.type === "flowMapping") {
          return printedKey;
        }
        if (node.type === "mappingItem" && isAbsolutelyPrintedAsSingleLineNode(key.content, options) && !hasTrailingComment(key.content) && (!parentNode.tag || parentNode.tag.value !== "tag:yaml.org,2002:set")) {
          return [printedKey, spaceBeforeColon, ":"];
        }
        return ["? ", alignWithSpaces(2, printedKey)];
      }
      const printedValue = print("value");
      if (isEmptyMappingKey) {
        return [": ", alignWithSpaces(2, printedValue)];
      }
      if (hasLeadingComments(value) || !isInlineNode(key.content)) {
        return ["? ", alignWithSpaces(2, printedKey), hardline, join2("", path.map(print, "value", "leadingComments").map((comment) => [comment, hardline])), ": ", alignWithSpaces(2, printedValue)];
      }
      if (isSingleLineNode(key.content) && !hasLeadingComments(key.content) && !hasMiddleComments(key.content) && !hasTrailingComment(key.content) && !hasEndComments(key) && !hasLeadingComments(value.content) && !hasMiddleComments(value.content) && !hasEndComments(value) && isAbsolutelyPrintedAsSingleLineNode(value.content, options)) {
        return [printedKey, spaceBeforeColon, ": ", printedValue];
      }
      const groupId = Symbol("mappingKey");
      const groupedKey = group([ifBreak("? "), group(alignWithSpaces(2, printedKey), {
        id: groupId
      })]);
      const explicitMappingValue = [hardline, ": ", alignWithSpaces(2, printedValue)];
      const implicitMappingValueParts = [spaceBeforeColon, ":"];
      if (hasLeadingComments(value.content) || hasEndComments(value) && value.content && !isNode(value.content, ["mapping", "sequence"]) || parentNode.type === "mapping" && hasTrailingComment(key.content) && isInlineNode(value.content) || isNode(value.content, ["mapping", "sequence"]) && value.content.tag === null && value.content.anchor === null) {
        implicitMappingValueParts.push(hardline);
      } else if (value.content) {
        implicitMappingValueParts.push(line);
      }
      implicitMappingValueParts.push(printedValue);
      const implicitMappingValue = alignWithSpaces(options.tabWidth, implicitMappingValueParts);
      if (isAbsolutelyPrintedAsSingleLineNode(key.content, options) && !hasLeadingComments(key.content) && !hasMiddleComments(key.content) && !hasEndComments(key)) {
        return conditionalGroup([[printedKey, implicitMappingValue]]);
      }
      return conditionalGroup([[groupedKey, ifBreak(explicitMappingValue, implicitMappingValue, {
        groupId
      })]]);
    }
    function isAbsolutelyPrintedAsSingleLineNode(node, options) {
      if (!node) {
        return true;
      }
      switch (node.type) {
        case "plain":
        case "quoteSingle":
        case "quoteDouble":
          break;
        case "alias":
          return true;
        default:
          return false;
      }
      if (options.proseWrap === "preserve") {
        return node.position.start.line === node.position.end.line;
      }
      if (/\\$/m.test(options.originalText.slice(node.position.start.offset, node.position.end.offset))) {
        return false;
      }
      switch (options.proseWrap) {
        case "never":
          return !node.value.includes("\n");
        case "always":
          return !/[\n ]/.test(node.value);
        default:
          return false;
      }
    }
    function needsSpaceInFrontOfMappingValue(node) {
      return node.key.content && node.key.content.type === "alias";
    }
    function isSingleLineNode(node) {
      if (!node) {
        return true;
      }
      switch (node.type) {
        case "plain":
        case "quoteDouble":
        case "quoteSingle":
          return node.position.start.line === node.position.end.line;
        case "alias":
          return true;
        default:
          return false;
      }
    }
    module.exports = printMappingItem;
  }
});
var require_block2 = __commonJS2({
  "src/language-yaml/print/block.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      builders: {
        dedent,
        dedentToRoot,
        fill,
        hardline,
        join: join2,
        line,
        literalline,
        markAsRoot
      },
      utils: {
        getDocParts
      }
    } = require_document();
    var {
      getAncestorCount,
      getBlockValueLineContents,
      hasIndicatorComment,
      isLastDescendantNode,
      isNode
    } = require_utils8();
    var {
      alignWithSpaces
    } = require_misc2();
    function printBlock(path, print, options) {
      const node = path.getValue();
      const parentIndent = getAncestorCount(path, (ancestorNode) => isNode(ancestorNode, ["sequence", "mapping"]));
      const isLastDescendant = isLastDescendantNode(path);
      const parts = [node.type === "blockFolded" ? ">" : "|"];
      if (node.indent !== null) {
        parts.push(node.indent.toString());
      }
      if (node.chomping !== "clip") {
        parts.push(node.chomping === "keep" ? "+" : "-");
      }
      if (hasIndicatorComment(node)) {
        parts.push(" ", print("indicatorComment"));
      }
      const lineContents = getBlockValueLineContents(node, {
        parentIndent,
        isLastDescendant,
        options
      });
      const contentsParts = [];
      for (const [index, lineWords] of lineContents.entries()) {
        if (index === 0) {
          contentsParts.push(hardline);
        }
        contentsParts.push(fill(getDocParts(join2(line, lineWords))));
        if (index !== lineContents.length - 1) {
          contentsParts.push(lineWords.length === 0 ? hardline : markAsRoot(literalline));
        } else if (node.chomping === "keep" && isLastDescendant) {
          contentsParts.push(dedentToRoot(lineWords.length === 0 ? hardline : literalline));
        }
      }
      if (node.indent === null) {
        parts.push(dedent(alignWithSpaces(options.tabWidth, contentsParts)));
      } else {
        parts.push(dedentToRoot(alignWithSpaces(node.indent - 1 + parentIndent, contentsParts)));
      }
      return parts;
    }
    module.exports = printBlock;
  }
});
var require_printer_yaml = __commonJS2({
  "src/language-yaml/printer-yaml.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      builders: {
        breakParent,
        fill,
        group,
        hardline,
        join: join2,
        line,
        lineSuffix,
        literalline
      },
      utils: {
        getDocParts,
        replaceTextEndOfLine
      }
    } = require_document();
    var {
      isPreviousLineEmpty
    } = require_util();
    var {
      insertPragma,
      isPragma
    } = require_pragma6();
    var {
      locStart
    } = require_loc7();
    var embed = require_embed5();
    var {
      getFlowScalarLineContents,
      getLastDescendantNode,
      hasLeadingComments,
      hasMiddleComments,
      hasTrailingComment,
      hasEndComments,
      hasPrettierIgnore,
      isLastDescendantNode,
      isNode,
      isInlineNode
    } = require_utils8();
    var preprocess = require_print_preprocess4();
    var {
      alignWithSpaces,
      printNextEmptyLine,
      shouldPrintEndComments
    } = require_misc2();
    var {
      printFlowMapping,
      printFlowSequence
    } = require_flow_mapping_sequence();
    var printMappingItem = require_mapping_item();
    var printBlock = require_block2();
    function genericPrint(path, options, print) {
      const node = path.getValue();
      const parts = [];
      if (node.type !== "mappingValue" && hasLeadingComments(node)) {
        parts.push([join2(hardline, path.map(print, "leadingComments")), hardline]);
      }
      const {
        tag,
        anchor
      } = node;
      if (tag) {
        parts.push(print("tag"));
      }
      if (tag && anchor) {
        parts.push(" ");
      }
      if (anchor) {
        parts.push(print("anchor"));
      }
      let nextEmptyLine = "";
      if (isNode(node, ["mapping", "sequence", "comment", "directive", "mappingItem", "sequenceItem"]) && !isLastDescendantNode(path)) {
        nextEmptyLine = printNextEmptyLine(path, options.originalText);
      }
      if (tag || anchor) {
        if (isNode(node, ["sequence", "mapping"]) && !hasMiddleComments(node)) {
          parts.push(hardline);
        } else {
          parts.push(" ");
        }
      }
      if (hasMiddleComments(node)) {
        parts.push([node.middleComments.length === 1 ? "" : hardline, join2(hardline, path.map(print, "middleComments")), hardline]);
      }
      const parentNode = path.getParentNode();
      if (hasPrettierIgnore(path)) {
        parts.push(replaceTextEndOfLine(options.originalText.slice(node.position.start.offset, node.position.end.offset).trimEnd(), literalline));
      } else {
        parts.push(group(printNode(node, parentNode, path, options, print)));
      }
      if (hasTrailingComment(node) && !isNode(node, ["document", "documentHead"])) {
        parts.push(lineSuffix([node.type === "mappingValue" && !node.content ? "" : " ", parentNode.type === "mappingKey" && path.getParentNode(2).type === "mapping" && isInlineNode(node) ? "" : breakParent, print("trailingComment")]));
      }
      if (shouldPrintEndComments(node)) {
        parts.push(alignWithSpaces(node.type === "sequenceItem" ? 2 : 0, [hardline, join2(hardline, path.map((path2) => [isPreviousLineEmpty(options.originalText, path2.getValue(), locStart) ? hardline : "", print()], "endComments"))]));
      }
      parts.push(nextEmptyLine);
      return parts;
    }
    function printNode(node, parentNode, path, options, print) {
      switch (node.type) {
        case "root": {
          const {
            children
          } = node;
          const parts = [];
          path.each((childPath, index) => {
            const document2 = children[index];
            const nextDocument = children[index + 1];
            if (index !== 0) {
              parts.push(hardline);
            }
            parts.push(print());
            if (shouldPrintDocumentEndMarker(document2, nextDocument)) {
              parts.push(hardline, "...");
              if (hasTrailingComment(document2)) {
                parts.push(" ", print("trailingComment"));
              }
            } else if (nextDocument && !hasTrailingComment(nextDocument.head)) {
              parts.push(hardline, "---");
            }
          }, "children");
          const lastDescendantNode = getLastDescendantNode(node);
          if (!isNode(lastDescendantNode, ["blockLiteral", "blockFolded"]) || lastDescendantNode.chomping !== "keep") {
            parts.push(hardline);
          }
          return parts;
        }
        case "document": {
          const nextDocument = parentNode.children[path.getName() + 1];
          const parts = [];
          if (shouldPrintDocumentHeadEndMarker(node, nextDocument, parentNode, options) === "head") {
            if (node.head.children.length > 0 || node.head.endComments.length > 0) {
              parts.push(print("head"));
            }
            if (hasTrailingComment(node.head)) {
              parts.push(["---", " ", print(["head", "trailingComment"])]);
            } else {
              parts.push("---");
            }
          }
          if (shouldPrintDocumentBody(node)) {
            parts.push(print("body"));
          }
          return join2(hardline, parts);
        }
        case "documentHead":
          return join2(hardline, [...path.map(print, "children"), ...path.map(print, "endComments")]);
        case "documentBody": {
          const {
            children,
            endComments
          } = node;
          let separator = "";
          if (children.length > 0 && endComments.length > 0) {
            const lastDescendantNode = getLastDescendantNode(node);
            if (isNode(lastDescendantNode, ["blockFolded", "blockLiteral"])) {
              if (lastDescendantNode.chomping !== "keep") {
                separator = [hardline, hardline];
              }
            } else {
              separator = hardline;
            }
          }
          return [join2(hardline, path.map(print, "children")), separator, join2(hardline, path.map(print, "endComments"))];
        }
        case "directive":
          return ["%", join2(" ", [node.name, ...node.parameters])];
        case "comment":
          return ["#", node.value];
        case "alias":
          return ["*", node.value];
        case "tag":
          return options.originalText.slice(node.position.start.offset, node.position.end.offset);
        case "anchor":
          return ["&", node.value];
        case "plain":
          return printFlowScalarContent(node.type, options.originalText.slice(node.position.start.offset, node.position.end.offset), options);
        case "quoteDouble":
        case "quoteSingle": {
          const singleQuote = "'";
          const doubleQuote = '"';
          const raw = options.originalText.slice(node.position.start.offset + 1, node.position.end.offset - 1);
          if (node.type === "quoteSingle" && raw.includes("\\") || node.type === "quoteDouble" && /\\[^"]/.test(raw)) {
            const originalQuote = node.type === "quoteDouble" ? doubleQuote : singleQuote;
            return [originalQuote, printFlowScalarContent(node.type, raw, options), originalQuote];
          }
          if (raw.includes(doubleQuote)) {
            return [singleQuote, printFlowScalarContent(node.type, node.type === "quoteDouble" ? raw.replace(/\\"/g, doubleQuote).replace(/'/g, singleQuote.repeat(2)) : raw, options), singleQuote];
          }
          if (raw.includes(singleQuote)) {
            return [doubleQuote, printFlowScalarContent(node.type, node.type === "quoteSingle" ? raw.replace(/''/g, singleQuote) : raw, options), doubleQuote];
          }
          const quote = options.singleQuote ? singleQuote : doubleQuote;
          return [quote, printFlowScalarContent(node.type, raw, options), quote];
        }
        case "blockFolded":
        case "blockLiteral": {
          return printBlock(path, print, options);
        }
        case "mapping":
        case "sequence":
          return join2(hardline, path.map(print, "children"));
        case "sequenceItem":
          return ["- ", alignWithSpaces(2, node.content ? print("content") : "")];
        case "mappingKey":
        case "mappingValue":
          return !node.content ? "" : print("content");
        case "mappingItem":
        case "flowMappingItem": {
          return printMappingItem(node, parentNode, path, print, options);
        }
        case "flowMapping":
          return printFlowMapping(path, print, options);
        case "flowSequence":
          return printFlowSequence(path, print, options);
        case "flowSequenceItem":
          return print("content");
        default:
          throw new Error(`Unexpected node type ${node.type}`);
      }
    }
    function shouldPrintDocumentBody(document2) {
      return document2.body.children.length > 0 || hasEndComments(document2.body);
    }
    function shouldPrintDocumentEndMarker(document2, nextDocument) {
      return hasTrailingComment(document2) || nextDocument && (nextDocument.head.children.length > 0 || hasEndComments(nextDocument.head));
    }
    function shouldPrintDocumentHeadEndMarker(document2, nextDocument, root, options) {
      if (root.children[0] === document2 && /---(?:\s|$)/.test(options.originalText.slice(locStart(document2), locStart(document2) + 4)) || document2.head.children.length > 0 || hasEndComments(document2.head) || hasTrailingComment(document2.head)) {
        return "head";
      }
      if (shouldPrintDocumentEndMarker(document2, nextDocument)) {
        return false;
      }
      return nextDocument ? "root" : false;
    }
    function printFlowScalarContent(nodeType, content, options) {
      const lineContents = getFlowScalarLineContents(nodeType, content, options);
      return join2(hardline, lineContents.map((lineContentWords) => fill(getDocParts(join2(line, lineContentWords)))));
    }
    function clean(node, newNode) {
      if (isNode(newNode)) {
        delete newNode.position;
        switch (newNode.type) {
          case "comment":
            if (isPragma(newNode.value)) {
              return null;
            }
            break;
          case "quoteDouble":
          case "quoteSingle":
            newNode.type = "quote";
            break;
        }
      }
    }
    module.exports = {
      preprocess,
      embed,
      print: genericPrint,
      massageAstNode: clean,
      insertPragma
    };
  }
});
var require_options7 = __commonJS2({
  "src/language-yaml/options.js"(exports, module) {
    "use strict";
    init_define_process();
    var commonOptions = require_common_options();
    module.exports = {
      bracketSpacing: commonOptions.bracketSpacing,
      singleQuote: commonOptions.singleQuote,
      proseWrap: commonOptions.proseWrap
    };
  }
});
var require_parsers7 = __commonJS2({
  "src/language-yaml/parsers.js"() {
    init_define_process();
  }
});
var require_YAML = __commonJS2({
  "node_modules/linguist-languages/data/YAML.json"(exports, module) {
    module.exports = {
      name: "YAML",
      type: "data",
      color: "#cb171e",
      tmScope: "source.yaml",
      aliases: ["yml"],
      extensions: [".yml", ".mir", ".reek", ".rviz", ".sublime-syntax", ".syntax", ".yaml", ".yaml-tmlanguage", ".yaml.sed", ".yml.mysql"],
      filenames: [".clang-format", ".clang-tidy", ".gemrc", "CITATION.cff", "glide.lock", "yarn.lock"],
      aceMode: "yaml",
      codemirrorMode: "yaml",
      codemirrorMimeType: "text/x-yaml",
      languageId: 407
    };
  }
});
var require_language_yaml = __commonJS2({
  "src/language-yaml/index.js"(exports, module) {
    "use strict";
    init_define_process();
    var createLanguage = require_create_language();
    var printer = require_printer_yaml();
    var options = require_options7();
    var parsers = require_parsers7();
    var languages = [createLanguage(require_YAML(), (data) => ({
      since: "1.14.0",
      parsers: ["yaml"],
      vscodeLanguageIds: ["yaml", "ansible", "home-assistant"],
      filenames: [...data.filenames.filter((filename) => filename !== "yarn.lock"), ".prettierrc", ".stylelintrc", ".lintstagedrc"]
    }))];
    module.exports = {
      languages,
      printers: {
        yaml: printer
      },
      options,
      parsers
    };
  }
});
var require_languages = __commonJS2({
  "src/languages.js"(exports, module) {
    "use strict";
    init_define_process();
    module.exports = [require_language_js(), require_language_css(), require_language_handlebars(), require_language_graphql(), require_language_markdown(), require_language_html(), require_language_yaml()];
  }
});
var require_standalone = __commonJS2({
  "src/standalone.js"(exports, module) {
    init_define_process();
    var {
      version
    } = require_package();
    var core = require_core();
    var {
      getSupportInfo
    } = require_support();
    var sharedUtil = require_util_shared();
    var languages = require_languages();
    var doc = require_document();
    function withPlugins(fn) {
      let optsArgIdx = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
      return function() {
        for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
          args[_key8] = arguments[_key8];
        }
        const opts = args[optsArgIdx] || {};
        const plugins = opts.plugins || [];
        args[optsArgIdx] = Object.assign(Object.assign({}, opts), {}, {
          plugins: [...languages, ...Array.isArray(plugins) ? plugins : Object.values(plugins)]
        });
        return fn(...args);
      };
    }
    var formatWithCursor = withPlugins(core.formatWithCursor);
    module.exports = {
      formatWithCursor,
      format(text, opts) {
        return formatWithCursor(text, opts).formatted;
      },
      check(text, opts) {
        const {
          formatted
        } = formatWithCursor(text, opts);
        return formatted === text;
      },
      doc,
      getSupportInfo: withPlugins(getSupportInfo, 0),
      version,
      util: sharedUtil,
      __debug: {
        parse: withPlugins(core.parse),
        formatAST: withPlugins(core.formatAST),
        formatDoc: withPlugins(core.formatDoc),
        printToDoc: withPlugins(core.printToDoc),
        printDocToString: withPlugins(core.printDocToString)
      }
    };
  }
});
var standalone_js_esm_default = require_standalone();
export {
  standalone_js_esm_default as default
};
