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
    var aCallable = require_a_callable();
    var isNullOrUndefined = require_is_null_or_undefined();
    module.exports = function(V, P) {
      var func = V[P];
      return isNullOrUndefined(func) ? void 0 : aCallable(func);
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
    var toObject = require_to_object();
    var hasOwnProperty = uncurryThis({}.hasOwnProperty);
    module.exports = Object.hasOwn || function hasOwn(it, key) {
      return hasOwnProperty(toObject(it), key);
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
    var toIntegerOrInfinity = require_to_integer_or_infinity();
    var max = Math.max;
    var min = Math.min;
    module.exports = function(index, length) {
      var integer = toIntegerOrInfinity(index);
      return integer < 0 ? max(integer + length, 0) : min(integer, length);
    };
  }
});

// node_modules/core-js/internals/to-length.js
var require_to_length = __commonJS({
  "node_modules/core-js/internals/to-length.js"(exports, module) {
    var toIntegerOrInfinity = require_to_integer_or_infinity();
    var min = Math.min;
    module.exports = function(argument) {
      return argument > 0 ? min(toIntegerOrInfinity(argument), 9007199254740991) : 0;
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
    var lengthOfArrayLike = require_length_of_array_like();
    var createMethod = function(IS_INCLUDES) {
      return function($this, el, fromIndex) {
        var O = toIndexedObject($this);
        var length = lengthOfArrayLike(O);
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
      var value = data[normalize(feature)];
      return value == POLYFILL ? true : value == NATIVE ? false : isCallable(detection) ? fails2(detection) : !!detection;
    };
    var normalize = isForced.normalize = function(string) {
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

// node_modules/core-js/modules/es.global-this.js
var require_es_global_this = __commonJS({
  "node_modules/core-js/modules/es.global-this.js"() {
    var $ = require_export();
    var global3 = require_global();
    $({ global: true, forced: global3.globalThis !== global3 }, {
      globalThis: global3
    });
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

// node_modules/core-js/modules/esnext.global-this.js
require_es_global_this();

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

// dist/_parser-espree.js.esm.mjs
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames2 = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", {
  value: true
}), mod);
var init_define_process = __esm({
  "<define:process>"() {
  }
});
var require_parser_create_error = __commonJS2({
  "src/common/parser-create-error.js"(exports, module) {
    "use strict";
    init_define_process();
    function createError(message, loc) {
      const error = new SyntaxError(message + " (" + loc.start.line + ":" + loc.start.column + ")");
      error.loc = loc;
      return error;
    }
    module.exports = createError;
  }
});
var require_try_combinations = __commonJS2({
  "src/utils/try-combinations.js"(exports, module) {
    "use strict";
    init_define_process();
    function tryCombinations() {
      let firstError;
      for (var _len = arguments.length, combinations = new Array(_len), _key = 0; _key < _len; _key++) {
        combinations[_key] = arguments[_key];
      }
      for (const [index, fn] of combinations.entries()) {
        try {
          return {
            result: fn()
          };
        } catch (error) {
          if (index === 0) {
            firstError = error;
          }
        }
      }
      return {
        error: firstError
      };
    }
    module.exports = tryCombinations;
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
    function print(_ref) {
      let {
        comments = "",
        pragmas = {}
      } = _ref;
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
var require_create_parser = __commonJS2({
  "src/language-js/parse/utils/create-parser.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      hasPragma
    } = require_pragma();
    var {
      locStart,
      locEnd
    } = require_loc();
    function createParser(options) {
      options = typeof options === "function" ? {
        parse: options
      } : options;
      return Object.assign({
        astFormat: "estree",
        hasPragma,
        locStart,
        locEnd
      }, options);
    }
    module.exports = createParser;
  }
});
var require_is_ts_keyword_type = __commonJS2({
  "src/language-js/utils/is-ts-keyword-type.js"(exports, module) {
    "use strict";
    init_define_process();
    function isTsKeywordType(_ref2) {
      let {
        type: type2
      } = _ref2;
      return type2.startsWith("TS") && type2.endsWith("Keyword");
    }
    module.exports = isTsKeywordType;
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
var require_get_last = __commonJS2({
  "src/utils/get-last.js"(exports, module) {
    "use strict";
    init_define_process();
    var getLast = (arr) => arr[arr.length - 1];
    module.exports = getLast;
  }
});
var require_visit_node = __commonJS2({
  "src/language-js/parse/postprocess/visit-node.js"(exports, module) {
    "use strict";
    init_define_process();
    function visitNode(node, fn) {
      if (Array.isArray(node)) {
        for (let i = 0; i < node.length; i++) {
          node[i] = visitNode(node[i], fn);
        }
        return node;
      }
      if (node && typeof node === "object" && typeof node.type === "string") {
        const keys = Object.keys(node);
        for (let i = 0; i < keys.length; i++) {
          node[keys[i]] = visitNode(node[keys[i]], fn);
        }
        return fn(node) || node;
      }
      return node;
    }
    module.exports = visitNode;
  }
});
var require_throw_syntax_error = __commonJS2({
  "src/language-js/parse/postprocess/throw-syntax-error.js"(exports, module) {
    "use strict";
    init_define_process();
    var createError = require_parser_create_error();
    function throwSyntaxError(node, message) {
      const {
        start,
        end
      } = node.loc;
      throw createError(message, {
        start: {
          line: start.line,
          column: start.column + 1
        },
        end: {
          line: end.line,
          column: end.column + 1
        }
      });
    }
    module.exports = throwSyntaxError;
  }
});
var require_postprocess = __commonJS2({
  "src/language-js/parse/postprocess/index.js"(exports, module) {
    "use strict";
    init_define_process();
    var {
      locStart,
      locEnd
    } = require_loc();
    var isTsKeywordType = require_is_ts_keyword_type();
    var isTypeCastComment = require_is_type_cast_comment();
    var getLast = require_get_last();
    var visitNode = require_visit_node();
    var throwSyntaxError = require_throw_syntax_error();
    function postprocess(ast, options) {
      if (options.parser !== "typescript" && options.parser !== "flow" && options.parser !== "acorn" && options.parser !== "espree" && options.parser !== "meriyah") {
        const startOffsetsOfTypeCastedNodes = /* @__PURE__ */ new Set();
        ast = visitNode(ast, (node) => {
          if (node.leadingComments && node.leadingComments.some(isTypeCastComment)) {
            startOffsetsOfTypeCastedNodes.add(locStart(node));
          }
        });
        ast = visitNode(ast, (node) => {
          if (node.type === "ParenthesizedExpression") {
            const {
              expression
            } = node;
            if (expression.type === "TypeCastExpression") {
              expression.range = node.range;
              return expression;
            }
            const start = locStart(node);
            if (!startOffsetsOfTypeCastedNodes.has(start)) {
              expression.extra = Object.assign(Object.assign({}, expression.extra), {}, {
                parenthesized: true
              });
              return expression;
            }
          }
        });
      }
      ast = visitNode(ast, (node) => {
        switch (node.type) {
          case "ChainExpression": {
            return transformChainExpression(node.expression);
          }
          case "LogicalExpression": {
            if (isUnbalancedLogicalTree(node)) {
              return rebalanceLogicalTree(node);
            }
            break;
          }
          case "VariableDeclaration": {
            const lastDeclaration = getLast(node.declarations);
            if (lastDeclaration && lastDeclaration.init) {
              overrideLocEnd(node, lastDeclaration);
            }
            break;
          }
          case "TSParenthesizedType": {
            if (!(isTsKeywordType(node.typeAnnotation) || node.typeAnnotation.type === "TSThisType")) {
              node.typeAnnotation.range = [locStart(node), locEnd(node)];
            }
            return node.typeAnnotation;
          }
          case "TSTypeParameter":
            if (typeof node.name === "string") {
              const start = locStart(node);
              node.name = {
                type: "Identifier",
                name: node.name,
                range: [start, start + node.name.length]
              };
            }
            break;
          case "ObjectExpression":
            if (options.parser === "typescript") {
              const invalidProperty = node.properties.find((property) => property.type === "Property" && property.value.type === "TSEmptyBodyFunctionExpression");
              if (invalidProperty) {
                throwSyntaxError(invalidProperty.value, "Unexpected token.");
              }
            }
            break;
          case "SequenceExpression": {
            const lastExpression = getLast(node.expressions);
            node.range = [locStart(node), Math.min(locEnd(lastExpression), locEnd(node))];
            break;
          }
          case "TopicReference":
            options.__isUsingHackPipeline = true;
            break;
          case "ExportAllDeclaration": {
            const {
              exported
            } = node;
            if (options.parser === "meriyah" && exported && exported.type === "Identifier") {
              const raw = options.originalText.slice(locStart(exported), locEnd(exported));
              if (raw.startsWith('"') || raw.startsWith("'")) {
                node.exported = Object.assign(Object.assign({}, node.exported), {}, {
                  type: "Literal",
                  value: node.exported.name,
                  raw
                });
              }
            }
            break;
          }
          case "PropertyDefinition":
            if (options.parser === "meriyah" && node.static && !node.computed && !node.key) {
              const name = "static";
              const start = locStart(node);
              Object.assign(node, {
                static: false,
                key: {
                  type: "Identifier",
                  name,
                  range: [start, start + name.length]
                }
              });
            }
            break;
        }
      });
      return ast;
      function overrideLocEnd(toBeOverriddenNode, toOverrideNode) {
        if (options.originalText[locEnd(toOverrideNode)] === ";") {
          return;
        }
        toBeOverriddenNode.range = [locStart(toBeOverriddenNode), locEnd(toOverrideNode)];
      }
    }
    function transformChainExpression(node) {
      switch (node.type) {
        case "CallExpression":
          node.type = "OptionalCallExpression";
          node.callee = transformChainExpression(node.callee);
          break;
        case "MemberExpression":
          node.type = "OptionalMemberExpression";
          node.object = transformChainExpression(node.object);
          break;
        case "TSNonNullExpression":
          node.expression = transformChainExpression(node.expression);
          break;
      }
      return node;
    }
    function isUnbalancedLogicalTree(node) {
      return node.type === "LogicalExpression" && node.right.type === "LogicalExpression" && node.operator === node.right.operator;
    }
    function rebalanceLogicalTree(node) {
      if (!isUnbalancedLogicalTree(node)) {
        return node;
      }
      return rebalanceLogicalTree({
        type: "LogicalExpression",
        operator: node.operator,
        left: rebalanceLogicalTree({
          type: "LogicalExpression",
          operator: node.operator,
          left: node.left,
          right: node.right.left,
          range: [locStart(node.left), locEnd(node.right.left)]
        }),
        right: node.right.right,
        range: [locStart(node), locEnd(node)]
      });
    }
    module.exports = postprocess;
  }
});
var require_acorn = __commonJS2({
  "node_modules/acorn/dist/acorn.js"(exports, module) {
    init_define_process();
    (function(global22, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global22 = typeof globalThis !== "undefined" ? globalThis : global22 || self, factory(global22.acorn = {}));
    })(exports, function(exports2) {
      "use strict";
      var astralIdentifierCodes = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 370, 1, 154, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 161, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 19306, 9, 87, 9, 39, 4, 60, 6, 26, 9, 1014, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4706, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 262, 6, 10, 9, 357, 0, 62, 13, 1495, 6, 110, 6, 6, 9, 4759, 9, 787719, 239];
      var astralIdentifierStartCodes = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 68, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 349, 41, 7, 1, 79, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 85, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 190, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1070, 4050, 582, 8634, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 43, 8, 8936, 3, 2, 6, 2, 1, 2, 290, 46, 2, 18, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 482, 44, 11, 6, 17, 0, 322, 29, 19, 43, 1269, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4152, 8, 221, 3, 5761, 15, 7472, 3104, 541, 1507, 4938];
      var nonASCIIidentifierChars = "\u200C\u200D\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0898-\u089F\u08CA-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C04\u0C3C\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D81-\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECD\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u180F-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19D0-\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1ABF-\u1ACE\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DFF\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA620-\uA629\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA82C\uA880\uA881\uA8B4-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F1\uA8FF-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F";
      var nonASCIIidentifierStartChars = "\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC";
      var reservedWords = {
        3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
        5: "class enum extends super const export import",
        6: "enum",
        strict: "implements interface let package private protected public static yield",
        strictBind: "eval arguments"
      };
      var ecma5AndLessKeywords = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this";
      var keywords$1 = {
        5: ecma5AndLessKeywords,
        "5module": ecma5AndLessKeywords + " export import",
        6: ecma5AndLessKeywords + " const class extends export import super"
      };
      var keywordRelationalOperator = /^in(stanceof)?$/;
      var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
      var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
      function isInAstralSet(code, set) {
        var pos = 65536;
        for (var i2 = 0; i2 < set.length; i2 += 2) {
          pos += set[i2];
          if (pos > code) {
            return false;
          }
          pos += set[i2 + 1];
          if (pos >= code) {
            return true;
          }
        }
      }
      function isIdentifierStart(code, astral) {
        if (code < 65) {
          return code === 36;
        }
        if (code < 91) {
          return true;
        }
        if (code < 97) {
          return code === 95;
        }
        if (code < 123) {
          return true;
        }
        if (code <= 65535) {
          return code >= 170 && nonASCIIidentifierStart.test(String.fromCharCode(code));
        }
        if (astral === false) {
          return false;
        }
        return isInAstralSet(code, astralIdentifierStartCodes);
      }
      function isIdentifierChar(code, astral) {
        if (code < 48) {
          return code === 36;
        }
        if (code < 58) {
          return true;
        }
        if (code < 65) {
          return false;
        }
        if (code < 91) {
          return true;
        }
        if (code < 97) {
          return code === 95;
        }
        if (code < 123) {
          return true;
        }
        if (code <= 65535) {
          return code >= 170 && nonASCIIidentifier.test(String.fromCharCode(code));
        }
        if (astral === false) {
          return false;
        }
        return isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes);
      }
      var TokenType = function TokenType2(label, conf) {
        if (conf === void 0)
          conf = {};
        this.label = label;
        this.keyword = conf.keyword;
        this.beforeExpr = !!conf.beforeExpr;
        this.startsExpr = !!conf.startsExpr;
        this.isLoop = !!conf.isLoop;
        this.isAssign = !!conf.isAssign;
        this.prefix = !!conf.prefix;
        this.postfix = !!conf.postfix;
        this.binop = conf.binop || null;
        this.updateContext = null;
      };
      function binop(name, prec) {
        return new TokenType(name, {
          beforeExpr: true,
          binop: prec
        });
      }
      var beforeExpr = {
        beforeExpr: true
      }, startsExpr = {
        startsExpr: true
      };
      var keywords = {};
      function kw(name, options) {
        if (options === void 0)
          options = {};
        options.keyword = name;
        return keywords[name] = new TokenType(name, options);
      }
      var types$1 = {
        num: new TokenType("num", startsExpr),
        regexp: new TokenType("regexp", startsExpr),
        string: new TokenType("string", startsExpr),
        name: new TokenType("name", startsExpr),
        privateId: new TokenType("privateId", startsExpr),
        eof: new TokenType("eof"),
        bracketL: new TokenType("[", {
          beforeExpr: true,
          startsExpr: true
        }),
        bracketR: new TokenType("]"),
        braceL: new TokenType("{", {
          beforeExpr: true,
          startsExpr: true
        }),
        braceR: new TokenType("}"),
        parenL: new TokenType("(", {
          beforeExpr: true,
          startsExpr: true
        }),
        parenR: new TokenType(")"),
        comma: new TokenType(",", beforeExpr),
        semi: new TokenType(";", beforeExpr),
        colon: new TokenType(":", beforeExpr),
        dot: new TokenType("."),
        question: new TokenType("?", beforeExpr),
        questionDot: new TokenType("?."),
        arrow: new TokenType("=>", beforeExpr),
        template: new TokenType("template"),
        invalidTemplate: new TokenType("invalidTemplate"),
        ellipsis: new TokenType("...", beforeExpr),
        backQuote: new TokenType("`", startsExpr),
        dollarBraceL: new TokenType("${", {
          beforeExpr: true,
          startsExpr: true
        }),
        eq: new TokenType("=", {
          beforeExpr: true,
          isAssign: true
        }),
        assign: new TokenType("_=", {
          beforeExpr: true,
          isAssign: true
        }),
        incDec: new TokenType("++/--", {
          prefix: true,
          postfix: true,
          startsExpr: true
        }),
        prefix: new TokenType("!/~", {
          beforeExpr: true,
          prefix: true,
          startsExpr: true
        }),
        logicalOR: binop("||", 1),
        logicalAND: binop("&&", 2),
        bitwiseOR: binop("|", 3),
        bitwiseXOR: binop("^", 4),
        bitwiseAND: binop("&", 5),
        equality: binop("==/!=/===/!==", 6),
        relational: binop("</>/<=/>=", 7),
        bitShift: binop("<</>>/>>>", 8),
        plusMin: new TokenType("+/-", {
          beforeExpr: true,
          binop: 9,
          prefix: true,
          startsExpr: true
        }),
        modulo: binop("%", 10),
        star: binop("*", 10),
        slash: binop("/", 10),
        starstar: new TokenType("**", {
          beforeExpr: true
        }),
        coalesce: binop("??", 1),
        _break: kw("break"),
        _case: kw("case", beforeExpr),
        _catch: kw("catch"),
        _continue: kw("continue"),
        _debugger: kw("debugger"),
        _default: kw("default", beforeExpr),
        _do: kw("do", {
          isLoop: true,
          beforeExpr: true
        }),
        _else: kw("else", beforeExpr),
        _finally: kw("finally"),
        _for: kw("for", {
          isLoop: true
        }),
        _function: kw("function", startsExpr),
        _if: kw("if"),
        _return: kw("return", beforeExpr),
        _switch: kw("switch"),
        _throw: kw("throw", beforeExpr),
        _try: kw("try"),
        _var: kw("var"),
        _const: kw("const"),
        _while: kw("while", {
          isLoop: true
        }),
        _with: kw("with"),
        _new: kw("new", {
          beforeExpr: true,
          startsExpr: true
        }),
        _this: kw("this", startsExpr),
        _super: kw("super", startsExpr),
        _class: kw("class", startsExpr),
        _extends: kw("extends", beforeExpr),
        _export: kw("export"),
        _import: kw("import", startsExpr),
        _null: kw("null", startsExpr),
        _true: kw("true", startsExpr),
        _false: kw("false", startsExpr),
        _in: kw("in", {
          beforeExpr: true,
          binop: 7
        }),
        _instanceof: kw("instanceof", {
          beforeExpr: true,
          binop: 7
        }),
        _typeof: kw("typeof", {
          beforeExpr: true,
          prefix: true,
          startsExpr: true
        }),
        _void: kw("void", {
          beforeExpr: true,
          prefix: true,
          startsExpr: true
        }),
        _delete: kw("delete", {
          beforeExpr: true,
          prefix: true,
          startsExpr: true
        })
      };
      var lineBreak = /\r\n?|\n|\u2028|\u2029/;
      var lineBreakG = new RegExp(lineBreak.source, "g");
      function isNewLine(code) {
        return code === 10 || code === 13 || code === 8232 || code === 8233;
      }
      function nextLineBreak(code, from, end) {
        if (end === void 0)
          end = code.length;
        for (var i2 = from; i2 < end; i2++) {
          var next = code.charCodeAt(i2);
          if (isNewLine(next)) {
            return i2 < end - 1 && next === 13 && code.charCodeAt(i2 + 1) === 10 ? i2 + 2 : i2 + 1;
          }
        }
        return -1;
      }
      var nonASCIIwhitespace = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/;
      var skipWhiteSpace = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g;
      var ref = Object.prototype;
      var hasOwnProperty = ref.hasOwnProperty;
      var toString = ref.toString;
      var hasOwn = Object.hasOwn || function(obj, propName) {
        return hasOwnProperty.call(obj, propName);
      };
      var isArray = Array.isArray || function(obj) {
        return toString.call(obj) === "[object Array]";
      };
      function wordsRegexp(words) {
        return new RegExp("^(?:" + words.replace(/ /g, "|") + ")$");
      }
      function codePointToString(code) {
        if (code <= 65535) {
          return String.fromCharCode(code);
        }
        code -= 65536;
        return String.fromCharCode((code >> 10) + 55296, (code & 1023) + 56320);
      }
      var loneSurrogate = /(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/;
      var Position = function Position2(line, col) {
        this.line = line;
        this.column = col;
      };
      Position.prototype.offset = function offset(n) {
        return new Position(this.line, this.column + n);
      };
      var SourceLocation = function SourceLocation2(p, start, end) {
        this.start = start;
        this.end = end;
        if (p.sourceFile !== null) {
          this.source = p.sourceFile;
        }
      };
      function getLineInfo(input, offset) {
        for (var line = 1, cur = 0; ; ) {
          var nextBreak = nextLineBreak(input, cur, offset);
          if (nextBreak < 0) {
            return new Position(line, offset - cur);
          }
          ++line;
          cur = nextBreak;
        }
      }
      var defaultOptions = {
        ecmaVersion: null,
        sourceType: "script",
        onInsertedSemicolon: null,
        onTrailingComma: null,
        allowReserved: null,
        allowReturnOutsideFunction: false,
        allowImportExportEverywhere: false,
        allowAwaitOutsideFunction: null,
        allowSuperOutsideMethod: null,
        allowHashBang: false,
        locations: false,
        onToken: null,
        onComment: null,
        ranges: false,
        program: null,
        sourceFile: null,
        directSourceFile: null,
        preserveParens: false
      };
      var warnedAboutEcmaVersion = false;
      function getOptions(opts) {
        var options = {};
        for (var opt in defaultOptions) {
          options[opt] = opts && hasOwn(opts, opt) ? opts[opt] : defaultOptions[opt];
        }
        if (options.ecmaVersion === "latest") {
          options.ecmaVersion = 1e8;
        } else if (options.ecmaVersion == null) {
          if (!warnedAboutEcmaVersion && typeof console === "object" && console.warn) {
            warnedAboutEcmaVersion = true;
            console.warn("Since Acorn 8.0.0, options.ecmaVersion is required.\nDefaulting to 2020, but this will stop working in the future.");
          }
          options.ecmaVersion = 11;
        } else if (options.ecmaVersion >= 2015) {
          options.ecmaVersion -= 2009;
        }
        if (options.allowReserved == null) {
          options.allowReserved = options.ecmaVersion < 5;
        }
        if (opts.allowHashBang == null) {
          options.allowHashBang = options.ecmaVersion >= 14;
        }
        if (isArray(options.onToken)) {
          var tokens = options.onToken;
          options.onToken = function(token) {
            return tokens.push(token);
          };
        }
        if (isArray(options.onComment)) {
          options.onComment = pushComment(options, options.onComment);
        }
        return options;
      }
      function pushComment(options, array) {
        return function(block, text, start, end, startLoc, endLoc) {
          var comment = {
            type: block ? "Block" : "Line",
            value: text,
            start,
            end
          };
          if (options.locations) {
            comment.loc = new SourceLocation(this, startLoc, endLoc);
          }
          if (options.ranges) {
            comment.range = [start, end];
          }
          array.push(comment);
        };
      }
      var SCOPE_TOP = 1, SCOPE_FUNCTION = 2, SCOPE_ASYNC = 4, SCOPE_GENERATOR = 8, SCOPE_ARROW = 16, SCOPE_SIMPLE_CATCH = 32, SCOPE_SUPER = 64, SCOPE_DIRECT_SUPER = 128, SCOPE_CLASS_STATIC_BLOCK = 256, SCOPE_VAR = SCOPE_TOP | SCOPE_FUNCTION | SCOPE_CLASS_STATIC_BLOCK;
      function functionFlags(async, generator) {
        return SCOPE_FUNCTION | (async ? SCOPE_ASYNC : 0) | (generator ? SCOPE_GENERATOR : 0);
      }
      var BIND_NONE = 0, BIND_VAR = 1, BIND_LEXICAL = 2, BIND_FUNCTION = 3, BIND_SIMPLE_CATCH = 4, BIND_OUTSIDE = 5;
      var Parser = function Parser2(options, input, startPos) {
        this.options = options = getOptions(options);
        this.sourceFile = options.sourceFile;
        this.keywords = wordsRegexp(keywords$1[options.ecmaVersion >= 6 ? 6 : options.sourceType === "module" ? "5module" : 5]);
        var reserved = "";
        if (options.allowReserved !== true) {
          reserved = reservedWords[options.ecmaVersion >= 6 ? 6 : options.ecmaVersion === 5 ? 5 : 3];
          if (options.sourceType === "module") {
            reserved += " await";
          }
        }
        this.reservedWords = wordsRegexp(reserved);
        var reservedStrict = (reserved ? reserved + " " : "") + reservedWords.strict;
        this.reservedWordsStrict = wordsRegexp(reservedStrict);
        this.reservedWordsStrictBind = wordsRegexp(reservedStrict + " " + reservedWords.strictBind);
        this.input = String(input);
        this.containsEsc = false;
        if (startPos) {
          this.pos = startPos;
          this.lineStart = this.input.lastIndexOf("\n", startPos - 1) + 1;
          this.curLine = this.input.slice(0, this.lineStart).split(lineBreak).length;
        } else {
          this.pos = this.lineStart = 0;
          this.curLine = 1;
        }
        this.type = types$1.eof;
        this.value = null;
        this.start = this.end = this.pos;
        this.startLoc = this.endLoc = this.curPosition();
        this.lastTokEndLoc = this.lastTokStartLoc = null;
        this.lastTokStart = this.lastTokEnd = this.pos;
        this.context = this.initialContext();
        this.exprAllowed = true;
        this.inModule = options.sourceType === "module";
        this.strict = this.inModule || this.strictDirective(this.pos);
        this.potentialArrowAt = -1;
        this.potentialArrowInForAwait = false;
        this.yieldPos = this.awaitPos = this.awaitIdentPos = 0;
        this.labels = [];
        this.undefinedExports = /* @__PURE__ */ Object.create(null);
        if (this.pos === 0 && options.allowHashBang && this.input.slice(0, 2) === "#!") {
          this.skipLineComment(2);
        }
        this.scopeStack = [];
        this.enterScope(SCOPE_TOP);
        this.regexpState = null;
        this.privateNameStack = [];
      };
      var prototypeAccessors = {
        inFunction: {
          configurable: true
        },
        inGenerator: {
          configurable: true
        },
        inAsync: {
          configurable: true
        },
        canAwait: {
          configurable: true
        },
        allowSuper: {
          configurable: true
        },
        allowDirectSuper: {
          configurable: true
        },
        treatFunctionsAsVar: {
          configurable: true
        },
        allowNewDotTarget: {
          configurable: true
        },
        inClassStaticBlock: {
          configurable: true
        }
      };
      Parser.prototype.parse = function parse2() {
        var node = this.options.program || this.startNode();
        this.nextToken();
        return this.parseTopLevel(node);
      };
      prototypeAccessors.inFunction.get = function() {
        return (this.currentVarScope().flags & SCOPE_FUNCTION) > 0;
      };
      prototypeAccessors.inGenerator.get = function() {
        return (this.currentVarScope().flags & SCOPE_GENERATOR) > 0 && !this.currentVarScope().inClassFieldInit;
      };
      prototypeAccessors.inAsync.get = function() {
        return (this.currentVarScope().flags & SCOPE_ASYNC) > 0 && !this.currentVarScope().inClassFieldInit;
      };
      prototypeAccessors.canAwait.get = function() {
        for (var i2 = this.scopeStack.length - 1; i2 >= 0; i2--) {
          var scope = this.scopeStack[i2];
          if (scope.inClassFieldInit || scope.flags & SCOPE_CLASS_STATIC_BLOCK) {
            return false;
          }
          if (scope.flags & SCOPE_FUNCTION) {
            return (scope.flags & SCOPE_ASYNC) > 0;
          }
        }
        return this.inModule && this.options.ecmaVersion >= 13 || this.options.allowAwaitOutsideFunction;
      };
      prototypeAccessors.allowSuper.get = function() {
        var ref2 = this.currentThisScope();
        var flags = ref2.flags;
        var inClassFieldInit = ref2.inClassFieldInit;
        return (flags & SCOPE_SUPER) > 0 || inClassFieldInit || this.options.allowSuperOutsideMethod;
      };
      prototypeAccessors.allowDirectSuper.get = function() {
        return (this.currentThisScope().flags & SCOPE_DIRECT_SUPER) > 0;
      };
      prototypeAccessors.treatFunctionsAsVar.get = function() {
        return this.treatFunctionsAsVarInScope(this.currentScope());
      };
      prototypeAccessors.allowNewDotTarget.get = function() {
        var ref2 = this.currentThisScope();
        var flags = ref2.flags;
        var inClassFieldInit = ref2.inClassFieldInit;
        return (flags & (SCOPE_FUNCTION | SCOPE_CLASS_STATIC_BLOCK)) > 0 || inClassFieldInit;
      };
      prototypeAccessors.inClassStaticBlock.get = function() {
        return (this.currentVarScope().flags & SCOPE_CLASS_STATIC_BLOCK) > 0;
      };
      Parser.extend = function extend() {
        var plugins = [], len = arguments.length;
        while (len--)
          plugins[len] = arguments[len];
        var cls = this;
        for (var i2 = 0; i2 < plugins.length; i2++) {
          cls = plugins[i2](cls);
        }
        return cls;
      };
      Parser.parse = function parse2(input, options) {
        return new this(options, input).parse();
      };
      Parser.parseExpressionAt = function parseExpressionAt2(input, pos, options) {
        var parser = new this(options, input, pos);
        parser.nextToken();
        return parser.parseExpression();
      };
      Parser.tokenizer = function tokenizer2(input, options) {
        return new this(options, input);
      };
      Object.defineProperties(Parser.prototype, prototypeAccessors);
      var pp$9 = Parser.prototype;
      var literal = /^(?:'((?:\\.|[^'\\])*?)'|"((?:\\.|[^"\\])*?)")/;
      pp$9.strictDirective = function(start) {
        if (this.options.ecmaVersion < 5) {
          return false;
        }
        for (; ; ) {
          skipWhiteSpace.lastIndex = start;
          start += skipWhiteSpace.exec(this.input)[0].length;
          var match = literal.exec(this.input.slice(start));
          if (!match) {
            return false;
          }
          if ((match[1] || match[2]) === "use strict") {
            skipWhiteSpace.lastIndex = start + match[0].length;
            var spaceAfter = skipWhiteSpace.exec(this.input), end = spaceAfter.index + spaceAfter[0].length;
            var next = this.input.charAt(end);
            return next === ";" || next === "}" || lineBreak.test(spaceAfter[0]) && !(/[(`.[+\-/*%<>=,?^&]/.test(next) || next === "!" && this.input.charAt(end + 1) === "=");
          }
          start += match[0].length;
          skipWhiteSpace.lastIndex = start;
          start += skipWhiteSpace.exec(this.input)[0].length;
          if (this.input[start] === ";") {
            start++;
          }
        }
      };
      pp$9.eat = function(type2) {
        if (this.type === type2) {
          this.next();
          return true;
        } else {
          return false;
        }
      };
      pp$9.isContextual = function(name) {
        return this.type === types$1.name && this.value === name && !this.containsEsc;
      };
      pp$9.eatContextual = function(name) {
        if (!this.isContextual(name)) {
          return false;
        }
        this.next();
        return true;
      };
      pp$9.expectContextual = function(name) {
        if (!this.eatContextual(name)) {
          this.unexpected();
        }
      };
      pp$9.canInsertSemicolon = function() {
        return this.type === types$1.eof || this.type === types$1.braceR || lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
      };
      pp$9.insertSemicolon = function() {
        if (this.canInsertSemicolon()) {
          if (this.options.onInsertedSemicolon) {
            this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc);
          }
          return true;
        }
      };
      pp$9.semicolon = function() {
        if (!this.eat(types$1.semi) && !this.insertSemicolon()) {
          this.unexpected();
        }
      };
      pp$9.afterTrailingComma = function(tokType, notNext) {
        if (this.type === tokType) {
          if (this.options.onTrailingComma) {
            this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc);
          }
          if (!notNext) {
            this.next();
          }
          return true;
        }
      };
      pp$9.expect = function(type2) {
        this.eat(type2) || this.unexpected();
      };
      pp$9.unexpected = function(pos) {
        this.raise(pos != null ? pos : this.start, "Unexpected token");
      };
      var DestructuringErrors = function DestructuringErrors2() {
        this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = this.doubleProto = -1;
      };
      pp$9.checkPatternErrors = function(refDestructuringErrors, isAssign) {
        if (!refDestructuringErrors) {
          return;
        }
        if (refDestructuringErrors.trailingComma > -1) {
          this.raiseRecoverable(refDestructuringErrors.trailingComma, "Comma is not permitted after the rest element");
        }
        var parens = isAssign ? refDestructuringErrors.parenthesizedAssign : refDestructuringErrors.parenthesizedBind;
        if (parens > -1) {
          this.raiseRecoverable(parens, isAssign ? "Assigning to rvalue" : "Parenthesized pattern");
        }
      };
      pp$9.checkExpressionErrors = function(refDestructuringErrors, andThrow) {
        if (!refDestructuringErrors) {
          return false;
        }
        var shorthandAssign = refDestructuringErrors.shorthandAssign;
        var doubleProto = refDestructuringErrors.doubleProto;
        if (!andThrow) {
          return shorthandAssign >= 0 || doubleProto >= 0;
        }
        if (shorthandAssign >= 0) {
          this.raise(shorthandAssign, "Shorthand property assignments are valid only in destructuring patterns");
        }
        if (doubleProto >= 0) {
          this.raiseRecoverable(doubleProto, "Redefinition of __proto__ property");
        }
      };
      pp$9.checkYieldAwaitInDefaultParams = function() {
        if (this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos)) {
          this.raise(this.yieldPos, "Yield expression cannot be a default value");
        }
        if (this.awaitPos) {
          this.raise(this.awaitPos, "Await expression cannot be a default value");
        }
      };
      pp$9.isSimpleAssignTarget = function(expr) {
        if (expr.type === "ParenthesizedExpression") {
          return this.isSimpleAssignTarget(expr.expression);
        }
        return expr.type === "Identifier" || expr.type === "MemberExpression";
      };
      var pp$8 = Parser.prototype;
      pp$8.parseTopLevel = function(node) {
        var exports3 = /* @__PURE__ */ Object.create(null);
        if (!node.body) {
          node.body = [];
        }
        while (this.type !== types$1.eof) {
          var stmt = this.parseStatement(null, true, exports3);
          node.body.push(stmt);
        }
        if (this.inModule) {
          for (var i2 = 0, list2 = Object.keys(this.undefinedExports); i2 < list2.length; i2 += 1) {
            var name = list2[i2];
            this.raiseRecoverable(this.undefinedExports[name].start, "Export '" + name + "' is not defined");
          }
        }
        this.adaptDirectivePrologue(node.body);
        this.next();
        node.sourceType = this.options.sourceType;
        return this.finishNode(node, "Program");
      };
      var loopLabel = {
        kind: "loop"
      }, switchLabel = {
        kind: "switch"
      };
      pp$8.isLet = function(context) {
        if (this.options.ecmaVersion < 6 || !this.isContextual("let")) {
          return false;
        }
        skipWhiteSpace.lastIndex = this.pos;
        var skip = skipWhiteSpace.exec(this.input);
        var next = this.pos + skip[0].length, nextCh = this.input.charCodeAt(next);
        if (nextCh === 91 || nextCh === 92 || nextCh > 55295 && nextCh < 56320) {
          return true;
        }
        if (context) {
          return false;
        }
        if (nextCh === 123) {
          return true;
        }
        if (isIdentifierStart(nextCh, true)) {
          var pos = next + 1;
          while (isIdentifierChar(nextCh = this.input.charCodeAt(pos), true)) {
            ++pos;
          }
          if (nextCh === 92 || nextCh > 55295 && nextCh < 56320) {
            return true;
          }
          var ident = this.input.slice(next, pos);
          if (!keywordRelationalOperator.test(ident)) {
            return true;
          }
        }
        return false;
      };
      pp$8.isAsyncFunction = function() {
        if (this.options.ecmaVersion < 8 || !this.isContextual("async")) {
          return false;
        }
        skipWhiteSpace.lastIndex = this.pos;
        var skip = skipWhiteSpace.exec(this.input);
        var next = this.pos + skip[0].length, after;
        return !lineBreak.test(this.input.slice(this.pos, next)) && this.input.slice(next, next + 8) === "function" && (next + 8 === this.input.length || !(isIdentifierChar(after = this.input.charCodeAt(next + 8)) || after > 55295 && after < 56320));
      };
      pp$8.parseStatement = function(context, topLevel, exports3) {
        var starttype = this.type, node = this.startNode(), kind;
        if (this.isLet(context)) {
          starttype = types$1._var;
          kind = "let";
        }
        switch (starttype) {
          case types$1._break:
          case types$1._continue:
            return this.parseBreakContinueStatement(node, starttype.keyword);
          case types$1._debugger:
            return this.parseDebuggerStatement(node);
          case types$1._do:
            return this.parseDoStatement(node);
          case types$1._for:
            return this.parseForStatement(node);
          case types$1._function:
            if (context && (this.strict || context !== "if" && context !== "label") && this.options.ecmaVersion >= 6) {
              this.unexpected();
            }
            return this.parseFunctionStatement(node, false, !context);
          case types$1._class:
            if (context) {
              this.unexpected();
            }
            return this.parseClass(node, true);
          case types$1._if:
            return this.parseIfStatement(node);
          case types$1._return:
            return this.parseReturnStatement(node);
          case types$1._switch:
            return this.parseSwitchStatement(node);
          case types$1._throw:
            return this.parseThrowStatement(node);
          case types$1._try:
            return this.parseTryStatement(node);
          case types$1._const:
          case types$1._var:
            kind = kind || this.value;
            if (context && kind !== "var") {
              this.unexpected();
            }
            return this.parseVarStatement(node, kind);
          case types$1._while:
            return this.parseWhileStatement(node);
          case types$1._with:
            return this.parseWithStatement(node);
          case types$1.braceL:
            return this.parseBlock(true, node);
          case types$1.semi:
            return this.parseEmptyStatement(node);
          case types$1._export:
          case types$1._import:
            if (this.options.ecmaVersion > 10 && starttype === types$1._import) {
              skipWhiteSpace.lastIndex = this.pos;
              var skip = skipWhiteSpace.exec(this.input);
              var next = this.pos + skip[0].length, nextCh = this.input.charCodeAt(next);
              if (nextCh === 40 || nextCh === 46) {
                return this.parseExpressionStatement(node, this.parseExpression());
              }
            }
            if (!this.options.allowImportExportEverywhere) {
              if (!topLevel) {
                this.raise(this.start, "'import' and 'export' may only appear at the top level");
              }
              if (!this.inModule) {
                this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'");
              }
            }
            return starttype === types$1._import ? this.parseImport(node) : this.parseExport(node, exports3);
          default:
            if (this.isAsyncFunction()) {
              if (context) {
                this.unexpected();
              }
              this.next();
              return this.parseFunctionStatement(node, true, !context);
            }
            var maybeName = this.value, expr = this.parseExpression();
            if (starttype === types$1.name && expr.type === "Identifier" && this.eat(types$1.colon)) {
              return this.parseLabeledStatement(node, maybeName, expr, context);
            } else {
              return this.parseExpressionStatement(node, expr);
            }
        }
      };
      pp$8.parseBreakContinueStatement = function(node, keyword) {
        var isBreak = keyword === "break";
        this.next();
        if (this.eat(types$1.semi) || this.insertSemicolon()) {
          node.label = null;
        } else if (this.type !== types$1.name) {
          this.unexpected();
        } else {
          node.label = this.parseIdent();
          this.semicolon();
        }
        var i2 = 0;
        for (; i2 < this.labels.length; ++i2) {
          var lab = this.labels[i2];
          if (node.label == null || lab.name === node.label.name) {
            if (lab.kind != null && (isBreak || lab.kind === "loop")) {
              break;
            }
            if (node.label && isBreak) {
              break;
            }
          }
        }
        if (i2 === this.labels.length) {
          this.raise(node.start, "Unsyntactic " + keyword);
        }
        return this.finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement");
      };
      pp$8.parseDebuggerStatement = function(node) {
        this.next();
        this.semicolon();
        return this.finishNode(node, "DebuggerStatement");
      };
      pp$8.parseDoStatement = function(node) {
        this.next();
        this.labels.push(loopLabel);
        node.body = this.parseStatement("do");
        this.labels.pop();
        this.expect(types$1._while);
        node.test = this.parseParenExpression();
        if (this.options.ecmaVersion >= 6) {
          this.eat(types$1.semi);
        } else {
          this.semicolon();
        }
        return this.finishNode(node, "DoWhileStatement");
      };
      pp$8.parseForStatement = function(node) {
        this.next();
        var awaitAt = this.options.ecmaVersion >= 9 && this.canAwait && this.eatContextual("await") ? this.lastTokStart : -1;
        this.labels.push(loopLabel);
        this.enterScope(0);
        this.expect(types$1.parenL);
        if (this.type === types$1.semi) {
          if (awaitAt > -1) {
            this.unexpected(awaitAt);
          }
          return this.parseFor(node, null);
        }
        var isLet = this.isLet();
        if (this.type === types$1._var || this.type === types$1._const || isLet) {
          var init$1 = this.startNode(), kind = isLet ? "let" : this.value;
          this.next();
          this.parseVar(init$1, true, kind);
          this.finishNode(init$1, "VariableDeclaration");
          if ((this.type === types$1._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) && init$1.declarations.length === 1) {
            if (this.options.ecmaVersion >= 9) {
              if (this.type === types$1._in) {
                if (awaitAt > -1) {
                  this.unexpected(awaitAt);
                }
              } else {
                node.await = awaitAt > -1;
              }
            }
            return this.parseForIn(node, init$1);
          }
          if (awaitAt > -1) {
            this.unexpected(awaitAt);
          }
          return this.parseFor(node, init$1);
        }
        var startsWithLet = this.isContextual("let"), isForOf = false;
        var refDestructuringErrors = new DestructuringErrors();
        var init = this.parseExpression(awaitAt > -1 ? "await" : true, refDestructuringErrors);
        if (this.type === types$1._in || (isForOf = this.options.ecmaVersion >= 6 && this.isContextual("of"))) {
          if (this.options.ecmaVersion >= 9) {
            if (this.type === types$1._in) {
              if (awaitAt > -1) {
                this.unexpected(awaitAt);
              }
            } else {
              node.await = awaitAt > -1;
            }
          }
          if (startsWithLet && isForOf) {
            this.raise(init.start, "The left-hand side of a for-of loop may not start with 'let'.");
          }
          this.toAssignable(init, false, refDestructuringErrors);
          this.checkLValPattern(init);
          return this.parseForIn(node, init);
        } else {
          this.checkExpressionErrors(refDestructuringErrors, true);
        }
        if (awaitAt > -1) {
          this.unexpected(awaitAt);
        }
        return this.parseFor(node, init);
      };
      pp$8.parseFunctionStatement = function(node, isAsync, declarationPosition) {
        this.next();
        return this.parseFunction(node, FUNC_STATEMENT | (declarationPosition ? 0 : FUNC_HANGING_STATEMENT), false, isAsync);
      };
      pp$8.parseIfStatement = function(node) {
        this.next();
        node.test = this.parseParenExpression();
        node.consequent = this.parseStatement("if");
        node.alternate = this.eat(types$1._else) ? this.parseStatement("if") : null;
        return this.finishNode(node, "IfStatement");
      };
      pp$8.parseReturnStatement = function(node) {
        if (!this.inFunction && !this.options.allowReturnOutsideFunction) {
          this.raise(this.start, "'return' outside of function");
        }
        this.next();
        if (this.eat(types$1.semi) || this.insertSemicolon()) {
          node.argument = null;
        } else {
          node.argument = this.parseExpression();
          this.semicolon();
        }
        return this.finishNode(node, "ReturnStatement");
      };
      pp$8.parseSwitchStatement = function(node) {
        this.next();
        node.discriminant = this.parseParenExpression();
        node.cases = [];
        this.expect(types$1.braceL);
        this.labels.push(switchLabel);
        this.enterScope(0);
        var cur;
        for (var sawDefault = false; this.type !== types$1.braceR; ) {
          if (this.type === types$1._case || this.type === types$1._default) {
            var isCase = this.type === types$1._case;
            if (cur) {
              this.finishNode(cur, "SwitchCase");
            }
            node.cases.push(cur = this.startNode());
            cur.consequent = [];
            this.next();
            if (isCase) {
              cur.test = this.parseExpression();
            } else {
              if (sawDefault) {
                this.raiseRecoverable(this.lastTokStart, "Multiple default clauses");
              }
              sawDefault = true;
              cur.test = null;
            }
            this.expect(types$1.colon);
          } else {
            if (!cur) {
              this.unexpected();
            }
            cur.consequent.push(this.parseStatement(null));
          }
        }
        this.exitScope();
        if (cur) {
          this.finishNode(cur, "SwitchCase");
        }
        this.next();
        this.labels.pop();
        return this.finishNode(node, "SwitchStatement");
      };
      pp$8.parseThrowStatement = function(node) {
        this.next();
        if (lineBreak.test(this.input.slice(this.lastTokEnd, this.start))) {
          this.raise(this.lastTokEnd, "Illegal newline after throw");
        }
        node.argument = this.parseExpression();
        this.semicolon();
        return this.finishNode(node, "ThrowStatement");
      };
      var empty$1 = [];
      pp$8.parseTryStatement = function(node) {
        this.next();
        node.block = this.parseBlock();
        node.handler = null;
        if (this.type === types$1._catch) {
          var clause = this.startNode();
          this.next();
          if (this.eat(types$1.parenL)) {
            clause.param = this.parseBindingAtom();
            var simple = clause.param.type === "Identifier";
            this.enterScope(simple ? SCOPE_SIMPLE_CATCH : 0);
            this.checkLValPattern(clause.param, simple ? BIND_SIMPLE_CATCH : BIND_LEXICAL);
            this.expect(types$1.parenR);
          } else {
            if (this.options.ecmaVersion < 10) {
              this.unexpected();
            }
            clause.param = null;
            this.enterScope(0);
          }
          clause.body = this.parseBlock(false);
          this.exitScope();
          node.handler = this.finishNode(clause, "CatchClause");
        }
        node.finalizer = this.eat(types$1._finally) ? this.parseBlock() : null;
        if (!node.handler && !node.finalizer) {
          this.raise(node.start, "Missing catch or finally clause");
        }
        return this.finishNode(node, "TryStatement");
      };
      pp$8.parseVarStatement = function(node, kind) {
        this.next();
        this.parseVar(node, false, kind);
        this.semicolon();
        return this.finishNode(node, "VariableDeclaration");
      };
      pp$8.parseWhileStatement = function(node) {
        this.next();
        node.test = this.parseParenExpression();
        this.labels.push(loopLabel);
        node.body = this.parseStatement("while");
        this.labels.pop();
        return this.finishNode(node, "WhileStatement");
      };
      pp$8.parseWithStatement = function(node) {
        if (this.strict) {
          this.raise(this.start, "'with' in strict mode");
        }
        this.next();
        node.object = this.parseParenExpression();
        node.body = this.parseStatement("with");
        return this.finishNode(node, "WithStatement");
      };
      pp$8.parseEmptyStatement = function(node) {
        this.next();
        return this.finishNode(node, "EmptyStatement");
      };
      pp$8.parseLabeledStatement = function(node, maybeName, expr, context) {
        for (var i$1 = 0, list2 = this.labels; i$1 < list2.length; i$1 += 1) {
          var label = list2[i$1];
          if (label.name === maybeName) {
            this.raise(expr.start, "Label '" + maybeName + "' is already declared");
          }
        }
        var kind = this.type.isLoop ? "loop" : this.type === types$1._switch ? "switch" : null;
        for (var i2 = this.labels.length - 1; i2 >= 0; i2--) {
          var label$1 = this.labels[i2];
          if (label$1.statementStart === node.start) {
            label$1.statementStart = this.start;
            label$1.kind = kind;
          } else {
            break;
          }
        }
        this.labels.push({
          name: maybeName,
          kind,
          statementStart: this.start
        });
        node.body = this.parseStatement(context ? context.indexOf("label") === -1 ? context + "label" : context : "label");
        this.labels.pop();
        node.label = expr;
        return this.finishNode(node, "LabeledStatement");
      };
      pp$8.parseExpressionStatement = function(node, expr) {
        node.expression = expr;
        this.semicolon();
        return this.finishNode(node, "ExpressionStatement");
      };
      pp$8.parseBlock = function(createNewLexicalScope, node, exitStrict) {
        if (createNewLexicalScope === void 0)
          createNewLexicalScope = true;
        if (node === void 0)
          node = this.startNode();
        node.body = [];
        this.expect(types$1.braceL);
        if (createNewLexicalScope) {
          this.enterScope(0);
        }
        while (this.type !== types$1.braceR) {
          var stmt = this.parseStatement(null);
          node.body.push(stmt);
        }
        if (exitStrict) {
          this.strict = false;
        }
        this.next();
        if (createNewLexicalScope) {
          this.exitScope();
        }
        return this.finishNode(node, "BlockStatement");
      };
      pp$8.parseFor = function(node, init) {
        node.init = init;
        this.expect(types$1.semi);
        node.test = this.type === types$1.semi ? null : this.parseExpression();
        this.expect(types$1.semi);
        node.update = this.type === types$1.parenR ? null : this.parseExpression();
        this.expect(types$1.parenR);
        node.body = this.parseStatement("for");
        this.exitScope();
        this.labels.pop();
        return this.finishNode(node, "ForStatement");
      };
      pp$8.parseForIn = function(node, init) {
        var isForIn = this.type === types$1._in;
        this.next();
        if (init.type === "VariableDeclaration" && init.declarations[0].init != null && (!isForIn || this.options.ecmaVersion < 8 || this.strict || init.kind !== "var" || init.declarations[0].id.type !== "Identifier")) {
          this.raise(init.start, (isForIn ? "for-in" : "for-of") + " loop variable declaration may not have an initializer");
        }
        node.left = init;
        node.right = isForIn ? this.parseExpression() : this.parseMaybeAssign();
        this.expect(types$1.parenR);
        node.body = this.parseStatement("for");
        this.exitScope();
        this.labels.pop();
        return this.finishNode(node, isForIn ? "ForInStatement" : "ForOfStatement");
      };
      pp$8.parseVar = function(node, isFor, kind) {
        node.declarations = [];
        node.kind = kind;
        for (; ; ) {
          var decl = this.startNode();
          this.parseVarId(decl, kind);
          if (this.eat(types$1.eq)) {
            decl.init = this.parseMaybeAssign(isFor);
          } else if (kind === "const" && !(this.type === types$1._in || this.options.ecmaVersion >= 6 && this.isContextual("of"))) {
            this.unexpected();
          } else if (decl.id.type !== "Identifier" && !(isFor && (this.type === types$1._in || this.isContextual("of")))) {
            this.raise(this.lastTokEnd, "Complex binding patterns require an initialization value");
          } else {
            decl.init = null;
          }
          node.declarations.push(this.finishNode(decl, "VariableDeclarator"));
          if (!this.eat(types$1.comma)) {
            break;
          }
        }
        return node;
      };
      pp$8.parseVarId = function(decl, kind) {
        decl.id = this.parseBindingAtom();
        this.checkLValPattern(decl.id, kind === "var" ? BIND_VAR : BIND_LEXICAL, false);
      };
      var FUNC_STATEMENT = 1, FUNC_HANGING_STATEMENT = 2, FUNC_NULLABLE_ID = 4;
      pp$8.parseFunction = function(node, statement, allowExpressionBody, isAsync, forInit) {
        this.initFunction(node);
        if (this.options.ecmaVersion >= 9 || this.options.ecmaVersion >= 6 && !isAsync) {
          if (this.type === types$1.star && statement & FUNC_HANGING_STATEMENT) {
            this.unexpected();
          }
          node.generator = this.eat(types$1.star);
        }
        if (this.options.ecmaVersion >= 8) {
          node.async = !!isAsync;
        }
        if (statement & FUNC_STATEMENT) {
          node.id = statement & FUNC_NULLABLE_ID && this.type !== types$1.name ? null : this.parseIdent();
          if (node.id && !(statement & FUNC_HANGING_STATEMENT)) {
            this.checkLValSimple(node.id, this.strict || node.generator || node.async ? this.treatFunctionsAsVar ? BIND_VAR : BIND_LEXICAL : BIND_FUNCTION);
          }
        }
        var oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
        this.yieldPos = 0;
        this.awaitPos = 0;
        this.awaitIdentPos = 0;
        this.enterScope(functionFlags(node.async, node.generator));
        if (!(statement & FUNC_STATEMENT)) {
          node.id = this.type === types$1.name ? this.parseIdent() : null;
        }
        this.parseFunctionParams(node);
        this.parseFunctionBody(node, allowExpressionBody, false, forInit);
        this.yieldPos = oldYieldPos;
        this.awaitPos = oldAwaitPos;
        this.awaitIdentPos = oldAwaitIdentPos;
        return this.finishNode(node, statement & FUNC_STATEMENT ? "FunctionDeclaration" : "FunctionExpression");
      };
      pp$8.parseFunctionParams = function(node) {
        this.expect(types$1.parenL);
        node.params = this.parseBindingList(types$1.parenR, false, this.options.ecmaVersion >= 8);
        this.checkYieldAwaitInDefaultParams();
      };
      pp$8.parseClass = function(node, isStatement) {
        this.next();
        var oldStrict = this.strict;
        this.strict = true;
        this.parseClassId(node, isStatement);
        this.parseClassSuper(node);
        var privateNameMap = this.enterClassBody();
        var classBody = this.startNode();
        var hadConstructor = false;
        classBody.body = [];
        this.expect(types$1.braceL);
        while (this.type !== types$1.braceR) {
          var element = this.parseClassElement(node.superClass !== null);
          if (element) {
            classBody.body.push(element);
            if (element.type === "MethodDefinition" && element.kind === "constructor") {
              if (hadConstructor) {
                this.raise(element.start, "Duplicate constructor in the same class");
              }
              hadConstructor = true;
            } else if (element.key && element.key.type === "PrivateIdentifier" && isPrivateNameConflicted(privateNameMap, element)) {
              this.raiseRecoverable(element.key.start, "Identifier '#" + element.key.name + "' has already been declared");
            }
          }
        }
        this.strict = oldStrict;
        this.next();
        node.body = this.finishNode(classBody, "ClassBody");
        this.exitClassBody();
        return this.finishNode(node, isStatement ? "ClassDeclaration" : "ClassExpression");
      };
      pp$8.parseClassElement = function(constructorAllowsSuper) {
        if (this.eat(types$1.semi)) {
          return null;
        }
        var ecmaVersion2 = this.options.ecmaVersion;
        var node = this.startNode();
        var keyName = "";
        var isGenerator = false;
        var isAsync = false;
        var kind = "method";
        var isStatic = false;
        if (this.eatContextual("static")) {
          if (ecmaVersion2 >= 13 && this.eat(types$1.braceL)) {
            this.parseClassStaticBlock(node);
            return node;
          }
          if (this.isClassElementNameStart() || this.type === types$1.star) {
            isStatic = true;
          } else {
            keyName = "static";
          }
        }
        node.static = isStatic;
        if (!keyName && ecmaVersion2 >= 8 && this.eatContextual("async")) {
          if ((this.isClassElementNameStart() || this.type === types$1.star) && !this.canInsertSemicolon()) {
            isAsync = true;
          } else {
            keyName = "async";
          }
        }
        if (!keyName && (ecmaVersion2 >= 9 || !isAsync) && this.eat(types$1.star)) {
          isGenerator = true;
        }
        if (!keyName && !isAsync && !isGenerator) {
          var lastValue = this.value;
          if (this.eatContextual("get") || this.eatContextual("set")) {
            if (this.isClassElementNameStart()) {
              kind = lastValue;
            } else {
              keyName = lastValue;
            }
          }
        }
        if (keyName) {
          node.computed = false;
          node.key = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc);
          node.key.name = keyName;
          this.finishNode(node.key, "Identifier");
        } else {
          this.parseClassElementName(node);
        }
        if (ecmaVersion2 < 13 || this.type === types$1.parenL || kind !== "method" || isGenerator || isAsync) {
          var isConstructor = !node.static && checkKeyName(node, "constructor");
          var allowsDirectSuper = isConstructor && constructorAllowsSuper;
          if (isConstructor && kind !== "method") {
            this.raise(node.key.start, "Constructor can't have get/set modifier");
          }
          node.kind = isConstructor ? "constructor" : kind;
          this.parseClassMethod(node, isGenerator, isAsync, allowsDirectSuper);
        } else {
          this.parseClassField(node);
        }
        return node;
      };
      pp$8.isClassElementNameStart = function() {
        return this.type === types$1.name || this.type === types$1.privateId || this.type === types$1.num || this.type === types$1.string || this.type === types$1.bracketL || this.type.keyword;
      };
      pp$8.parseClassElementName = function(element) {
        if (this.type === types$1.privateId) {
          if (this.value === "constructor") {
            this.raise(this.start, "Classes can't have an element named '#constructor'");
          }
          element.computed = false;
          element.key = this.parsePrivateIdent();
        } else {
          this.parsePropertyName(element);
        }
      };
      pp$8.parseClassMethod = function(method, isGenerator, isAsync, allowsDirectSuper) {
        var key = method.key;
        if (method.kind === "constructor") {
          if (isGenerator) {
            this.raise(key.start, "Constructor can't be a generator");
          }
          if (isAsync) {
            this.raise(key.start, "Constructor can't be an async method");
          }
        } else if (method.static && checkKeyName(method, "prototype")) {
          this.raise(key.start, "Classes may not have a static property named prototype");
        }
        var value = method.value = this.parseMethod(isGenerator, isAsync, allowsDirectSuper);
        if (method.kind === "get" && value.params.length !== 0) {
          this.raiseRecoverable(value.start, "getter should have no params");
        }
        if (method.kind === "set" && value.params.length !== 1) {
          this.raiseRecoverable(value.start, "setter should have exactly one param");
        }
        if (method.kind === "set" && value.params[0].type === "RestElement") {
          this.raiseRecoverable(value.params[0].start, "Setter cannot use rest params");
        }
        return this.finishNode(method, "MethodDefinition");
      };
      pp$8.parseClassField = function(field) {
        if (checkKeyName(field, "constructor")) {
          this.raise(field.key.start, "Classes can't have a field named 'constructor'");
        } else if (field.static && checkKeyName(field, "prototype")) {
          this.raise(field.key.start, "Classes can't have a static field named 'prototype'");
        }
        if (this.eat(types$1.eq)) {
          var scope = this.currentThisScope();
          var inClassFieldInit = scope.inClassFieldInit;
          scope.inClassFieldInit = true;
          field.value = this.parseMaybeAssign();
          scope.inClassFieldInit = inClassFieldInit;
        } else {
          field.value = null;
        }
        this.semicolon();
        return this.finishNode(field, "PropertyDefinition");
      };
      pp$8.parseClassStaticBlock = function(node) {
        node.body = [];
        var oldLabels = this.labels;
        this.labels = [];
        this.enterScope(SCOPE_CLASS_STATIC_BLOCK | SCOPE_SUPER);
        while (this.type !== types$1.braceR) {
          var stmt = this.parseStatement(null);
          node.body.push(stmt);
        }
        this.next();
        this.exitScope();
        this.labels = oldLabels;
        return this.finishNode(node, "StaticBlock");
      };
      pp$8.parseClassId = function(node, isStatement) {
        if (this.type === types$1.name) {
          node.id = this.parseIdent();
          if (isStatement) {
            this.checkLValSimple(node.id, BIND_LEXICAL, false);
          }
        } else {
          if (isStatement === true) {
            this.unexpected();
          }
          node.id = null;
        }
      };
      pp$8.parseClassSuper = function(node) {
        node.superClass = this.eat(types$1._extends) ? this.parseExprSubscripts(false) : null;
      };
      pp$8.enterClassBody = function() {
        var element = {
          declared: /* @__PURE__ */ Object.create(null),
          used: []
        };
        this.privateNameStack.push(element);
        return element.declared;
      };
      pp$8.exitClassBody = function() {
        var ref2 = this.privateNameStack.pop();
        var declared = ref2.declared;
        var used = ref2.used;
        var len = this.privateNameStack.length;
        var parent = len === 0 ? null : this.privateNameStack[len - 1];
        for (var i2 = 0; i2 < used.length; ++i2) {
          var id = used[i2];
          if (!hasOwn(declared, id.name)) {
            if (parent) {
              parent.used.push(id);
            } else {
              this.raiseRecoverable(id.start, "Private field '#" + id.name + "' must be declared in an enclosing class");
            }
          }
        }
      };
      function isPrivateNameConflicted(privateNameMap, element) {
        var name = element.key.name;
        var curr = privateNameMap[name];
        var next = "true";
        if (element.type === "MethodDefinition" && (element.kind === "get" || element.kind === "set")) {
          next = (element.static ? "s" : "i") + element.kind;
        }
        if (curr === "iget" && next === "iset" || curr === "iset" && next === "iget" || curr === "sget" && next === "sset" || curr === "sset" && next === "sget") {
          privateNameMap[name] = "true";
          return false;
        } else if (!curr) {
          privateNameMap[name] = next;
          return false;
        } else {
          return true;
        }
      }
      function checkKeyName(node, name) {
        var computed = node.computed;
        var key = node.key;
        return !computed && (key.type === "Identifier" && key.name === name || key.type === "Literal" && key.value === name);
      }
      pp$8.parseExport = function(node, exports3) {
        this.next();
        if (this.eat(types$1.star)) {
          if (this.options.ecmaVersion >= 11) {
            if (this.eatContextual("as")) {
              node.exported = this.parseModuleExportName();
              this.checkExport(exports3, node.exported, this.lastTokStart);
            } else {
              node.exported = null;
            }
          }
          this.expectContextual("from");
          if (this.type !== types$1.string) {
            this.unexpected();
          }
          node.source = this.parseExprAtom();
          this.semicolon();
          return this.finishNode(node, "ExportAllDeclaration");
        }
        if (this.eat(types$1._default)) {
          this.checkExport(exports3, "default", this.lastTokStart);
          var isAsync;
          if (this.type === types$1._function || (isAsync = this.isAsyncFunction())) {
            var fNode = this.startNode();
            this.next();
            if (isAsync) {
              this.next();
            }
            node.declaration = this.parseFunction(fNode, FUNC_STATEMENT | FUNC_NULLABLE_ID, false, isAsync);
          } else if (this.type === types$1._class) {
            var cNode = this.startNode();
            node.declaration = this.parseClass(cNode, "nullableID");
          } else {
            node.declaration = this.parseMaybeAssign();
            this.semicolon();
          }
          return this.finishNode(node, "ExportDefaultDeclaration");
        }
        if (this.shouldParseExportStatement()) {
          node.declaration = this.parseStatement(null);
          if (node.declaration.type === "VariableDeclaration") {
            this.checkVariableExport(exports3, node.declaration.declarations);
          } else {
            this.checkExport(exports3, node.declaration.id, node.declaration.id.start);
          }
          node.specifiers = [];
          node.source = null;
        } else {
          node.declaration = null;
          node.specifiers = this.parseExportSpecifiers(exports3);
          if (this.eatContextual("from")) {
            if (this.type !== types$1.string) {
              this.unexpected();
            }
            node.source = this.parseExprAtom();
          } else {
            for (var i2 = 0, list2 = node.specifiers; i2 < list2.length; i2 += 1) {
              var spec = list2[i2];
              this.checkUnreserved(spec.local);
              this.checkLocalExport(spec.local);
              if (spec.local.type === "Literal") {
                this.raise(spec.local.start, "A string literal cannot be used as an exported binding without `from`.");
              }
            }
            node.source = null;
          }
          this.semicolon();
        }
        return this.finishNode(node, "ExportNamedDeclaration");
      };
      pp$8.checkExport = function(exports3, name, pos) {
        if (!exports3) {
          return;
        }
        if (typeof name !== "string") {
          name = name.type === "Identifier" ? name.name : name.value;
        }
        if (hasOwn(exports3, name)) {
          this.raiseRecoverable(pos, "Duplicate export '" + name + "'");
        }
        exports3[name] = true;
      };
      pp$8.checkPatternExport = function(exports3, pat) {
        var type2 = pat.type;
        if (type2 === "Identifier") {
          this.checkExport(exports3, pat, pat.start);
        } else if (type2 === "ObjectPattern") {
          for (var i2 = 0, list2 = pat.properties; i2 < list2.length; i2 += 1) {
            var prop = list2[i2];
            this.checkPatternExport(exports3, prop);
          }
        } else if (type2 === "ArrayPattern") {
          for (var i$1 = 0, list$1 = pat.elements; i$1 < list$1.length; i$1 += 1) {
            var elt = list$1[i$1];
            if (elt) {
              this.checkPatternExport(exports3, elt);
            }
          }
        } else if (type2 === "Property") {
          this.checkPatternExport(exports3, pat.value);
        } else if (type2 === "AssignmentPattern") {
          this.checkPatternExport(exports3, pat.left);
        } else if (type2 === "RestElement") {
          this.checkPatternExport(exports3, pat.argument);
        } else if (type2 === "ParenthesizedExpression") {
          this.checkPatternExport(exports3, pat.expression);
        }
      };
      pp$8.checkVariableExport = function(exports3, decls) {
        if (!exports3) {
          return;
        }
        for (var i2 = 0, list2 = decls; i2 < list2.length; i2 += 1) {
          var decl = list2[i2];
          this.checkPatternExport(exports3, decl.id);
        }
      };
      pp$8.shouldParseExportStatement = function() {
        return this.type.keyword === "var" || this.type.keyword === "const" || this.type.keyword === "class" || this.type.keyword === "function" || this.isLet() || this.isAsyncFunction();
      };
      pp$8.parseExportSpecifiers = function(exports3) {
        var nodes = [], first = true;
        this.expect(types$1.braceL);
        while (!this.eat(types$1.braceR)) {
          if (!first) {
            this.expect(types$1.comma);
            if (this.afterTrailingComma(types$1.braceR)) {
              break;
            }
          } else {
            first = false;
          }
          var node = this.startNode();
          node.local = this.parseModuleExportName();
          node.exported = this.eatContextual("as") ? this.parseModuleExportName() : node.local;
          this.checkExport(exports3, node.exported, node.exported.start);
          nodes.push(this.finishNode(node, "ExportSpecifier"));
        }
        return nodes;
      };
      pp$8.parseImport = function(node) {
        this.next();
        if (this.type === types$1.string) {
          node.specifiers = empty$1;
          node.source = this.parseExprAtom();
        } else {
          node.specifiers = this.parseImportSpecifiers();
          this.expectContextual("from");
          node.source = this.type === types$1.string ? this.parseExprAtom() : this.unexpected();
        }
        this.semicolon();
        return this.finishNode(node, "ImportDeclaration");
      };
      pp$8.parseImportSpecifiers = function() {
        var nodes = [], first = true;
        if (this.type === types$1.name) {
          var node = this.startNode();
          node.local = this.parseIdent();
          this.checkLValSimple(node.local, BIND_LEXICAL);
          nodes.push(this.finishNode(node, "ImportDefaultSpecifier"));
          if (!this.eat(types$1.comma)) {
            return nodes;
          }
        }
        if (this.type === types$1.star) {
          var node$1 = this.startNode();
          this.next();
          this.expectContextual("as");
          node$1.local = this.parseIdent();
          this.checkLValSimple(node$1.local, BIND_LEXICAL);
          nodes.push(this.finishNode(node$1, "ImportNamespaceSpecifier"));
          return nodes;
        }
        this.expect(types$1.braceL);
        while (!this.eat(types$1.braceR)) {
          if (!first) {
            this.expect(types$1.comma);
            if (this.afterTrailingComma(types$1.braceR)) {
              break;
            }
          } else {
            first = false;
          }
          var node$2 = this.startNode();
          node$2.imported = this.parseModuleExportName();
          if (this.eatContextual("as")) {
            node$2.local = this.parseIdent();
          } else {
            this.checkUnreserved(node$2.imported);
            node$2.local = node$2.imported;
          }
          this.checkLValSimple(node$2.local, BIND_LEXICAL);
          nodes.push(this.finishNode(node$2, "ImportSpecifier"));
        }
        return nodes;
      };
      pp$8.parseModuleExportName = function() {
        if (this.options.ecmaVersion >= 13 && this.type === types$1.string) {
          var stringLiteral = this.parseLiteral(this.value);
          if (loneSurrogate.test(stringLiteral.value)) {
            this.raise(stringLiteral.start, "An export name cannot include a lone surrogate.");
          }
          return stringLiteral;
        }
        return this.parseIdent(true);
      };
      pp$8.adaptDirectivePrologue = function(statements) {
        for (var i2 = 0; i2 < statements.length && this.isDirectiveCandidate(statements[i2]); ++i2) {
          statements[i2].directive = statements[i2].expression.raw.slice(1, -1);
        }
      };
      pp$8.isDirectiveCandidate = function(statement) {
        return this.options.ecmaVersion >= 5 && statement.type === "ExpressionStatement" && statement.expression.type === "Literal" && typeof statement.expression.value === "string" && (this.input[statement.start] === '"' || this.input[statement.start] === "'");
      };
      var pp$7 = Parser.prototype;
      pp$7.toAssignable = function(node, isBinding, refDestructuringErrors) {
        if (this.options.ecmaVersion >= 6 && node) {
          switch (node.type) {
            case "Identifier":
              if (this.inAsync && node.name === "await") {
                this.raise(node.start, "Cannot use 'await' as identifier inside an async function");
              }
              break;
            case "ObjectPattern":
            case "ArrayPattern":
            case "AssignmentPattern":
            case "RestElement":
              break;
            case "ObjectExpression":
              node.type = "ObjectPattern";
              if (refDestructuringErrors) {
                this.checkPatternErrors(refDestructuringErrors, true);
              }
              for (var i2 = 0, list2 = node.properties; i2 < list2.length; i2 += 1) {
                var prop = list2[i2];
                this.toAssignable(prop, isBinding);
                if (prop.type === "RestElement" && (prop.argument.type === "ArrayPattern" || prop.argument.type === "ObjectPattern")) {
                  this.raise(prop.argument.start, "Unexpected token");
                }
              }
              break;
            case "Property":
              if (node.kind !== "init") {
                this.raise(node.key.start, "Object pattern can't contain getter or setter");
              }
              this.toAssignable(node.value, isBinding);
              break;
            case "ArrayExpression":
              node.type = "ArrayPattern";
              if (refDestructuringErrors) {
                this.checkPatternErrors(refDestructuringErrors, true);
              }
              this.toAssignableList(node.elements, isBinding);
              break;
            case "SpreadElement":
              node.type = "RestElement";
              this.toAssignable(node.argument, isBinding);
              if (node.argument.type === "AssignmentPattern") {
                this.raise(node.argument.start, "Rest elements cannot have a default value");
              }
              break;
            case "AssignmentExpression":
              if (node.operator !== "=") {
                this.raise(node.left.end, "Only '=' operator can be used for specifying default value.");
              }
              node.type = "AssignmentPattern";
              delete node.operator;
              this.toAssignable(node.left, isBinding);
              break;
            case "ParenthesizedExpression":
              this.toAssignable(node.expression, isBinding, refDestructuringErrors);
              break;
            case "ChainExpression":
              this.raiseRecoverable(node.start, "Optional chaining cannot appear in left-hand side");
              break;
            case "MemberExpression":
              if (!isBinding) {
                break;
              }
            default:
              this.raise(node.start, "Assigning to rvalue");
          }
        } else if (refDestructuringErrors) {
          this.checkPatternErrors(refDestructuringErrors, true);
        }
        return node;
      };
      pp$7.toAssignableList = function(exprList, isBinding) {
        var end = exprList.length;
        for (var i2 = 0; i2 < end; i2++) {
          var elt = exprList[i2];
          if (elt) {
            this.toAssignable(elt, isBinding);
          }
        }
        if (end) {
          var last = exprList[end - 1];
          if (this.options.ecmaVersion === 6 && isBinding && last && last.type === "RestElement" && last.argument.type !== "Identifier") {
            this.unexpected(last.argument.start);
          }
        }
        return exprList;
      };
      pp$7.parseSpread = function(refDestructuringErrors) {
        var node = this.startNode();
        this.next();
        node.argument = this.parseMaybeAssign(false, refDestructuringErrors);
        return this.finishNode(node, "SpreadElement");
      };
      pp$7.parseRestBinding = function() {
        var node = this.startNode();
        this.next();
        if (this.options.ecmaVersion === 6 && this.type !== types$1.name) {
          this.unexpected();
        }
        node.argument = this.parseBindingAtom();
        return this.finishNode(node, "RestElement");
      };
      pp$7.parseBindingAtom = function() {
        if (this.options.ecmaVersion >= 6) {
          switch (this.type) {
            case types$1.bracketL:
              var node = this.startNode();
              this.next();
              node.elements = this.parseBindingList(types$1.bracketR, true, true);
              return this.finishNode(node, "ArrayPattern");
            case types$1.braceL:
              return this.parseObj(true);
          }
        }
        return this.parseIdent();
      };
      pp$7.parseBindingList = function(close, allowEmpty, allowTrailingComma) {
        var elts = [], first = true;
        while (!this.eat(close)) {
          if (first) {
            first = false;
          } else {
            this.expect(types$1.comma);
          }
          if (allowEmpty && this.type === types$1.comma) {
            elts.push(null);
          } else if (allowTrailingComma && this.afterTrailingComma(close)) {
            break;
          } else if (this.type === types$1.ellipsis) {
            var rest = this.parseRestBinding();
            this.parseBindingListItem(rest);
            elts.push(rest);
            if (this.type === types$1.comma) {
              this.raise(this.start, "Comma is not permitted after the rest element");
            }
            this.expect(close);
            break;
          } else {
            var elem = this.parseMaybeDefault(this.start, this.startLoc);
            this.parseBindingListItem(elem);
            elts.push(elem);
          }
        }
        return elts;
      };
      pp$7.parseBindingListItem = function(param) {
        return param;
      };
      pp$7.parseMaybeDefault = function(startPos, startLoc, left) {
        left = left || this.parseBindingAtom();
        if (this.options.ecmaVersion < 6 || !this.eat(types$1.eq)) {
          return left;
        }
        var node = this.startNodeAt(startPos, startLoc);
        node.left = left;
        node.right = this.parseMaybeAssign();
        return this.finishNode(node, "AssignmentPattern");
      };
      pp$7.checkLValSimple = function(expr, bindingType, checkClashes) {
        if (bindingType === void 0)
          bindingType = BIND_NONE;
        var isBind = bindingType !== BIND_NONE;
        switch (expr.type) {
          case "Identifier":
            if (this.strict && this.reservedWordsStrictBind.test(expr.name)) {
              this.raiseRecoverable(expr.start, (isBind ? "Binding " : "Assigning to ") + expr.name + " in strict mode");
            }
            if (isBind) {
              if (bindingType === BIND_LEXICAL && expr.name === "let") {
                this.raiseRecoverable(expr.start, "let is disallowed as a lexically bound name");
              }
              if (checkClashes) {
                if (hasOwn(checkClashes, expr.name)) {
                  this.raiseRecoverable(expr.start, "Argument name clash");
                }
                checkClashes[expr.name] = true;
              }
              if (bindingType !== BIND_OUTSIDE) {
                this.declareName(expr.name, bindingType, expr.start);
              }
            }
            break;
          case "ChainExpression":
            this.raiseRecoverable(expr.start, "Optional chaining cannot appear in left-hand side");
            break;
          case "MemberExpression":
            if (isBind) {
              this.raiseRecoverable(expr.start, "Binding member expression");
            }
            break;
          case "ParenthesizedExpression":
            if (isBind) {
              this.raiseRecoverable(expr.start, "Binding parenthesized expression");
            }
            return this.checkLValSimple(expr.expression, bindingType, checkClashes);
          default:
            this.raise(expr.start, (isBind ? "Binding" : "Assigning to") + " rvalue");
        }
      };
      pp$7.checkLValPattern = function(expr, bindingType, checkClashes) {
        if (bindingType === void 0)
          bindingType = BIND_NONE;
        switch (expr.type) {
          case "ObjectPattern":
            for (var i2 = 0, list2 = expr.properties; i2 < list2.length; i2 += 1) {
              var prop = list2[i2];
              this.checkLValInnerPattern(prop, bindingType, checkClashes);
            }
            break;
          case "ArrayPattern":
            for (var i$1 = 0, list$1 = expr.elements; i$1 < list$1.length; i$1 += 1) {
              var elem = list$1[i$1];
              if (elem) {
                this.checkLValInnerPattern(elem, bindingType, checkClashes);
              }
            }
            break;
          default:
            this.checkLValSimple(expr, bindingType, checkClashes);
        }
      };
      pp$7.checkLValInnerPattern = function(expr, bindingType, checkClashes) {
        if (bindingType === void 0)
          bindingType = BIND_NONE;
        switch (expr.type) {
          case "Property":
            this.checkLValInnerPattern(expr.value, bindingType, checkClashes);
            break;
          case "AssignmentPattern":
            this.checkLValPattern(expr.left, bindingType, checkClashes);
            break;
          case "RestElement":
            this.checkLValPattern(expr.argument, bindingType, checkClashes);
            break;
          default:
            this.checkLValPattern(expr, bindingType, checkClashes);
        }
      };
      var TokContext = function TokContext2(token, isExpr, preserveSpace, override, generator) {
        this.token = token;
        this.isExpr = !!isExpr;
        this.preserveSpace = !!preserveSpace;
        this.override = override;
        this.generator = !!generator;
      };
      var types = {
        b_stat: new TokContext("{", false),
        b_expr: new TokContext("{", true),
        b_tmpl: new TokContext("${", false),
        p_stat: new TokContext("(", false),
        p_expr: new TokContext("(", true),
        q_tmpl: new TokContext("`", true, true, function(p) {
          return p.tryReadTemplateToken();
        }),
        f_stat: new TokContext("function", false),
        f_expr: new TokContext("function", true),
        f_expr_gen: new TokContext("function", true, false, null, true),
        f_gen: new TokContext("function", false, false, null, true)
      };
      var pp$6 = Parser.prototype;
      pp$6.initialContext = function() {
        return [types.b_stat];
      };
      pp$6.curContext = function() {
        return this.context[this.context.length - 1];
      };
      pp$6.braceIsBlock = function(prevType) {
        var parent = this.curContext();
        if (parent === types.f_expr || parent === types.f_stat) {
          return true;
        }
        if (prevType === types$1.colon && (parent === types.b_stat || parent === types.b_expr)) {
          return !parent.isExpr;
        }
        if (prevType === types$1._return || prevType === types$1.name && this.exprAllowed) {
          return lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
        }
        if (prevType === types$1._else || prevType === types$1.semi || prevType === types$1.eof || prevType === types$1.parenR || prevType === types$1.arrow) {
          return true;
        }
        if (prevType === types$1.braceL) {
          return parent === types.b_stat;
        }
        if (prevType === types$1._var || prevType === types$1._const || prevType === types$1.name) {
          return false;
        }
        return !this.exprAllowed;
      };
      pp$6.inGeneratorContext = function() {
        for (var i2 = this.context.length - 1; i2 >= 1; i2--) {
          var context = this.context[i2];
          if (context.token === "function") {
            return context.generator;
          }
        }
        return false;
      };
      pp$6.updateContext = function(prevType) {
        var update, type2 = this.type;
        if (type2.keyword && prevType === types$1.dot) {
          this.exprAllowed = false;
        } else if (update = type2.updateContext) {
          update.call(this, prevType);
        } else {
          this.exprAllowed = type2.beforeExpr;
        }
      };
      pp$6.overrideContext = function(tokenCtx) {
        if (this.curContext() !== tokenCtx) {
          this.context[this.context.length - 1] = tokenCtx;
        }
      };
      types$1.parenR.updateContext = types$1.braceR.updateContext = function() {
        if (this.context.length === 1) {
          this.exprAllowed = true;
          return;
        }
        var out = this.context.pop();
        if (out === types.b_stat && this.curContext().token === "function") {
          out = this.context.pop();
        }
        this.exprAllowed = !out.isExpr;
      };
      types$1.braceL.updateContext = function(prevType) {
        this.context.push(this.braceIsBlock(prevType) ? types.b_stat : types.b_expr);
        this.exprAllowed = true;
      };
      types$1.dollarBraceL.updateContext = function() {
        this.context.push(types.b_tmpl);
        this.exprAllowed = true;
      };
      types$1.parenL.updateContext = function(prevType) {
        var statementParens = prevType === types$1._if || prevType === types$1._for || prevType === types$1._with || prevType === types$1._while;
        this.context.push(statementParens ? types.p_stat : types.p_expr);
        this.exprAllowed = true;
      };
      types$1.incDec.updateContext = function() {
      };
      types$1._function.updateContext = types$1._class.updateContext = function(prevType) {
        if (prevType.beforeExpr && prevType !== types$1._else && !(prevType === types$1.semi && this.curContext() !== types.p_stat) && !(prevType === types$1._return && lineBreak.test(this.input.slice(this.lastTokEnd, this.start))) && !((prevType === types$1.colon || prevType === types$1.braceL) && this.curContext() === types.b_stat)) {
          this.context.push(types.f_expr);
        } else {
          this.context.push(types.f_stat);
        }
        this.exprAllowed = false;
      };
      types$1.backQuote.updateContext = function() {
        if (this.curContext() === types.q_tmpl) {
          this.context.pop();
        } else {
          this.context.push(types.q_tmpl);
        }
        this.exprAllowed = false;
      };
      types$1.star.updateContext = function(prevType) {
        if (prevType === types$1._function) {
          var index = this.context.length - 1;
          if (this.context[index] === types.f_expr) {
            this.context[index] = types.f_expr_gen;
          } else {
            this.context[index] = types.f_gen;
          }
        }
        this.exprAllowed = true;
      };
      types$1.name.updateContext = function(prevType) {
        var allowed = false;
        if (this.options.ecmaVersion >= 6 && prevType !== types$1.dot) {
          if (this.value === "of" && !this.exprAllowed || this.value === "yield" && this.inGeneratorContext()) {
            allowed = true;
          }
        }
        this.exprAllowed = allowed;
      };
      var pp$5 = Parser.prototype;
      pp$5.checkPropClash = function(prop, propHash, refDestructuringErrors) {
        if (this.options.ecmaVersion >= 9 && prop.type === "SpreadElement") {
          return;
        }
        if (this.options.ecmaVersion >= 6 && (prop.computed || prop.method || prop.shorthand)) {
          return;
        }
        var key = prop.key;
        var name;
        switch (key.type) {
          case "Identifier":
            name = key.name;
            break;
          case "Literal":
            name = String(key.value);
            break;
          default:
            return;
        }
        var kind = prop.kind;
        if (this.options.ecmaVersion >= 6) {
          if (name === "__proto__" && kind === "init") {
            if (propHash.proto) {
              if (refDestructuringErrors) {
                if (refDestructuringErrors.doubleProto < 0) {
                  refDestructuringErrors.doubleProto = key.start;
                }
              } else {
                this.raiseRecoverable(key.start, "Redefinition of __proto__ property");
              }
            }
            propHash.proto = true;
          }
          return;
        }
        name = "$" + name;
        var other = propHash[name];
        if (other) {
          var redefinition;
          if (kind === "init") {
            redefinition = this.strict && other.init || other.get || other.set;
          } else {
            redefinition = other.init || other[kind];
          }
          if (redefinition) {
            this.raiseRecoverable(key.start, "Redefinition of property");
          }
        } else {
          other = propHash[name] = {
            init: false,
            get: false,
            set: false
          };
        }
        other[kind] = true;
      };
      pp$5.parseExpression = function(forInit, refDestructuringErrors) {
        var startPos = this.start, startLoc = this.startLoc;
        var expr = this.parseMaybeAssign(forInit, refDestructuringErrors);
        if (this.type === types$1.comma) {
          var node = this.startNodeAt(startPos, startLoc);
          node.expressions = [expr];
          while (this.eat(types$1.comma)) {
            node.expressions.push(this.parseMaybeAssign(forInit, refDestructuringErrors));
          }
          return this.finishNode(node, "SequenceExpression");
        }
        return expr;
      };
      pp$5.parseMaybeAssign = function(forInit, refDestructuringErrors, afterLeftParse) {
        if (this.isContextual("yield")) {
          if (this.inGenerator) {
            return this.parseYield(forInit);
          } else {
            this.exprAllowed = false;
          }
        }
        var ownDestructuringErrors = false, oldParenAssign = -1, oldTrailingComma = -1, oldDoubleProto = -1;
        if (refDestructuringErrors) {
          oldParenAssign = refDestructuringErrors.parenthesizedAssign;
          oldTrailingComma = refDestructuringErrors.trailingComma;
          oldDoubleProto = refDestructuringErrors.doubleProto;
          refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = -1;
        } else {
          refDestructuringErrors = new DestructuringErrors();
          ownDestructuringErrors = true;
        }
        var startPos = this.start, startLoc = this.startLoc;
        if (this.type === types$1.parenL || this.type === types$1.name) {
          this.potentialArrowAt = this.start;
          this.potentialArrowInForAwait = forInit === "await";
        }
        var left = this.parseMaybeConditional(forInit, refDestructuringErrors);
        if (afterLeftParse) {
          left = afterLeftParse.call(this, left, startPos, startLoc);
        }
        if (this.type.isAssign) {
          var node = this.startNodeAt(startPos, startLoc);
          node.operator = this.value;
          if (this.type === types$1.eq) {
            left = this.toAssignable(left, false, refDestructuringErrors);
          }
          if (!ownDestructuringErrors) {
            refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = refDestructuringErrors.doubleProto = -1;
          }
          if (refDestructuringErrors.shorthandAssign >= left.start) {
            refDestructuringErrors.shorthandAssign = -1;
          }
          if (this.type === types$1.eq) {
            this.checkLValPattern(left);
          } else {
            this.checkLValSimple(left);
          }
          node.left = left;
          this.next();
          node.right = this.parseMaybeAssign(forInit);
          if (oldDoubleProto > -1) {
            refDestructuringErrors.doubleProto = oldDoubleProto;
          }
          return this.finishNode(node, "AssignmentExpression");
        } else {
          if (ownDestructuringErrors) {
            this.checkExpressionErrors(refDestructuringErrors, true);
          }
        }
        if (oldParenAssign > -1) {
          refDestructuringErrors.parenthesizedAssign = oldParenAssign;
        }
        if (oldTrailingComma > -1) {
          refDestructuringErrors.trailingComma = oldTrailingComma;
        }
        return left;
      };
      pp$5.parseMaybeConditional = function(forInit, refDestructuringErrors) {
        var startPos = this.start, startLoc = this.startLoc;
        var expr = this.parseExprOps(forInit, refDestructuringErrors);
        if (this.checkExpressionErrors(refDestructuringErrors)) {
          return expr;
        }
        if (this.eat(types$1.question)) {
          var node = this.startNodeAt(startPos, startLoc);
          node.test = expr;
          node.consequent = this.parseMaybeAssign();
          this.expect(types$1.colon);
          node.alternate = this.parseMaybeAssign(forInit);
          return this.finishNode(node, "ConditionalExpression");
        }
        return expr;
      };
      pp$5.parseExprOps = function(forInit, refDestructuringErrors) {
        var startPos = this.start, startLoc = this.startLoc;
        var expr = this.parseMaybeUnary(refDestructuringErrors, false, false, forInit);
        if (this.checkExpressionErrors(refDestructuringErrors)) {
          return expr;
        }
        return expr.start === startPos && expr.type === "ArrowFunctionExpression" ? expr : this.parseExprOp(expr, startPos, startLoc, -1, forInit);
      };
      pp$5.parseExprOp = function(left, leftStartPos, leftStartLoc, minPrec, forInit) {
        var prec = this.type.binop;
        if (prec != null && (!forInit || this.type !== types$1._in)) {
          if (prec > minPrec) {
            var logical = this.type === types$1.logicalOR || this.type === types$1.logicalAND;
            var coalesce = this.type === types$1.coalesce;
            if (coalesce) {
              prec = types$1.logicalAND.binop;
            }
            var op = this.value;
            this.next();
            var startPos = this.start, startLoc = this.startLoc;
            var right = this.parseExprOp(this.parseMaybeUnary(null, false, false, forInit), startPos, startLoc, prec, forInit);
            var node = this.buildBinary(leftStartPos, leftStartLoc, left, right, op, logical || coalesce);
            if (logical && this.type === types$1.coalesce || coalesce && (this.type === types$1.logicalOR || this.type === types$1.logicalAND)) {
              this.raiseRecoverable(this.start, "Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses");
            }
            return this.parseExprOp(node, leftStartPos, leftStartLoc, minPrec, forInit);
          }
        }
        return left;
      };
      pp$5.buildBinary = function(startPos, startLoc, left, right, op, logical) {
        if (right.type === "PrivateIdentifier") {
          this.raise(right.start, "Private identifier can only be left side of binary expression");
        }
        var node = this.startNodeAt(startPos, startLoc);
        node.left = left;
        node.operator = op;
        node.right = right;
        return this.finishNode(node, logical ? "LogicalExpression" : "BinaryExpression");
      };
      pp$5.parseMaybeUnary = function(refDestructuringErrors, sawUnary, incDec, forInit) {
        var startPos = this.start, startLoc = this.startLoc, expr;
        if (this.isContextual("await") && this.canAwait) {
          expr = this.parseAwait(forInit);
          sawUnary = true;
        } else if (this.type.prefix) {
          var node = this.startNode(), update = this.type === types$1.incDec;
          node.operator = this.value;
          node.prefix = true;
          this.next();
          node.argument = this.parseMaybeUnary(null, true, update, forInit);
          this.checkExpressionErrors(refDestructuringErrors, true);
          if (update) {
            this.checkLValSimple(node.argument);
          } else if (this.strict && node.operator === "delete" && node.argument.type === "Identifier") {
            this.raiseRecoverable(node.start, "Deleting local variable in strict mode");
          } else if (node.operator === "delete" && isPrivateFieldAccess(node.argument)) {
            this.raiseRecoverable(node.start, "Private fields can not be deleted");
          } else {
            sawUnary = true;
          }
          expr = this.finishNode(node, update ? "UpdateExpression" : "UnaryExpression");
        } else if (!sawUnary && this.type === types$1.privateId) {
          if (forInit || this.privateNameStack.length === 0) {
            this.unexpected();
          }
          expr = this.parsePrivateIdent();
          if (this.type !== types$1._in) {
            this.unexpected();
          }
        } else {
          expr = this.parseExprSubscripts(refDestructuringErrors, forInit);
          if (this.checkExpressionErrors(refDestructuringErrors)) {
            return expr;
          }
          while (this.type.postfix && !this.canInsertSemicolon()) {
            var node$1 = this.startNodeAt(startPos, startLoc);
            node$1.operator = this.value;
            node$1.prefix = false;
            node$1.argument = expr;
            this.checkLValSimple(expr);
            this.next();
            expr = this.finishNode(node$1, "UpdateExpression");
          }
        }
        if (!incDec && this.eat(types$1.starstar)) {
          if (sawUnary) {
            this.unexpected(this.lastTokStart);
          } else {
            return this.buildBinary(startPos, startLoc, expr, this.parseMaybeUnary(null, false, false, forInit), "**", false);
          }
        } else {
          return expr;
        }
      };
      function isPrivateFieldAccess(node) {
        return node.type === "MemberExpression" && node.property.type === "PrivateIdentifier" || node.type === "ChainExpression" && isPrivateFieldAccess(node.expression);
      }
      pp$5.parseExprSubscripts = function(refDestructuringErrors, forInit) {
        var startPos = this.start, startLoc = this.startLoc;
        var expr = this.parseExprAtom(refDestructuringErrors, forInit);
        if (expr.type === "ArrowFunctionExpression" && this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")") {
          return expr;
        }
        var result = this.parseSubscripts(expr, startPos, startLoc, false, forInit);
        if (refDestructuringErrors && result.type === "MemberExpression") {
          if (refDestructuringErrors.parenthesizedAssign >= result.start) {
            refDestructuringErrors.parenthesizedAssign = -1;
          }
          if (refDestructuringErrors.parenthesizedBind >= result.start) {
            refDestructuringErrors.parenthesizedBind = -1;
          }
          if (refDestructuringErrors.trailingComma >= result.start) {
            refDestructuringErrors.trailingComma = -1;
          }
        }
        return result;
      };
      pp$5.parseSubscripts = function(base, startPos, startLoc, noCalls, forInit) {
        var maybeAsyncArrow = this.options.ecmaVersion >= 8 && base.type === "Identifier" && base.name === "async" && this.lastTokEnd === base.end && !this.canInsertSemicolon() && base.end - base.start === 5 && this.potentialArrowAt === base.start;
        var optionalChained = false;
        while (true) {
          var element = this.parseSubscript(base, startPos, startLoc, noCalls, maybeAsyncArrow, optionalChained, forInit);
          if (element.optional) {
            optionalChained = true;
          }
          if (element === base || element.type === "ArrowFunctionExpression") {
            if (optionalChained) {
              var chainNode = this.startNodeAt(startPos, startLoc);
              chainNode.expression = element;
              element = this.finishNode(chainNode, "ChainExpression");
            }
            return element;
          }
          base = element;
        }
      };
      pp$5.parseSubscript = function(base, startPos, startLoc, noCalls, maybeAsyncArrow, optionalChained, forInit) {
        var optionalSupported = this.options.ecmaVersion >= 11;
        var optional = optionalSupported && this.eat(types$1.questionDot);
        if (noCalls && optional) {
          this.raise(this.lastTokStart, "Optional chaining cannot appear in the callee of new expressions");
        }
        var computed = this.eat(types$1.bracketL);
        if (computed || optional && this.type !== types$1.parenL && this.type !== types$1.backQuote || this.eat(types$1.dot)) {
          var node = this.startNodeAt(startPos, startLoc);
          node.object = base;
          if (computed) {
            node.property = this.parseExpression();
            this.expect(types$1.bracketR);
          } else if (this.type === types$1.privateId && base.type !== "Super") {
            node.property = this.parsePrivateIdent();
          } else {
            node.property = this.parseIdent(this.options.allowReserved !== "never");
          }
          node.computed = !!computed;
          if (optionalSupported) {
            node.optional = optional;
          }
          base = this.finishNode(node, "MemberExpression");
        } else if (!noCalls && this.eat(types$1.parenL)) {
          var refDestructuringErrors = new DestructuringErrors(), oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
          this.yieldPos = 0;
          this.awaitPos = 0;
          this.awaitIdentPos = 0;
          var exprList = this.parseExprList(types$1.parenR, this.options.ecmaVersion >= 8, false, refDestructuringErrors);
          if (maybeAsyncArrow && !optional && !this.canInsertSemicolon() && this.eat(types$1.arrow)) {
            this.checkPatternErrors(refDestructuringErrors, false);
            this.checkYieldAwaitInDefaultParams();
            if (this.awaitIdentPos > 0) {
              this.raise(this.awaitIdentPos, "Cannot use 'await' as identifier inside an async function");
            }
            this.yieldPos = oldYieldPos;
            this.awaitPos = oldAwaitPos;
            this.awaitIdentPos = oldAwaitIdentPos;
            return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList, true, forInit);
          }
          this.checkExpressionErrors(refDestructuringErrors, true);
          this.yieldPos = oldYieldPos || this.yieldPos;
          this.awaitPos = oldAwaitPos || this.awaitPos;
          this.awaitIdentPos = oldAwaitIdentPos || this.awaitIdentPos;
          var node$1 = this.startNodeAt(startPos, startLoc);
          node$1.callee = base;
          node$1.arguments = exprList;
          if (optionalSupported) {
            node$1.optional = optional;
          }
          base = this.finishNode(node$1, "CallExpression");
        } else if (this.type === types$1.backQuote) {
          if (optional || optionalChained) {
            this.raise(this.start, "Optional chaining cannot appear in the tag of tagged template expressions");
          }
          var node$2 = this.startNodeAt(startPos, startLoc);
          node$2.tag = base;
          node$2.quasi = this.parseTemplate({
            isTagged: true
          });
          base = this.finishNode(node$2, "TaggedTemplateExpression");
        }
        return base;
      };
      pp$5.parseExprAtom = function(refDestructuringErrors, forInit) {
        if (this.type === types$1.slash) {
          this.readRegexp();
        }
        var node, canBeArrow = this.potentialArrowAt === this.start;
        switch (this.type) {
          case types$1._super:
            if (!this.allowSuper) {
              this.raise(this.start, "'super' keyword outside a method");
            }
            node = this.startNode();
            this.next();
            if (this.type === types$1.parenL && !this.allowDirectSuper) {
              this.raise(node.start, "super() call outside constructor of a subclass");
            }
            if (this.type !== types$1.dot && this.type !== types$1.bracketL && this.type !== types$1.parenL) {
              this.unexpected();
            }
            return this.finishNode(node, "Super");
          case types$1._this:
            node = this.startNode();
            this.next();
            return this.finishNode(node, "ThisExpression");
          case types$1.name:
            var startPos = this.start, startLoc = this.startLoc, containsEsc = this.containsEsc;
            var id = this.parseIdent(false);
            if (this.options.ecmaVersion >= 8 && !containsEsc && id.name === "async" && !this.canInsertSemicolon() && this.eat(types$1._function)) {
              this.overrideContext(types.f_expr);
              return this.parseFunction(this.startNodeAt(startPos, startLoc), 0, false, true, forInit);
            }
            if (canBeArrow && !this.canInsertSemicolon()) {
              if (this.eat(types$1.arrow)) {
                return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], false, forInit);
              }
              if (this.options.ecmaVersion >= 8 && id.name === "async" && this.type === types$1.name && !containsEsc && (!this.potentialArrowInForAwait || this.value !== "of" || this.containsEsc)) {
                id = this.parseIdent(false);
                if (this.canInsertSemicolon() || !this.eat(types$1.arrow)) {
                  this.unexpected();
                }
                return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], true, forInit);
              }
            }
            return id;
          case types$1.regexp:
            var value = this.value;
            node = this.parseLiteral(value.value);
            node.regex = {
              pattern: value.pattern,
              flags: value.flags
            };
            return node;
          case types$1.num:
          case types$1.string:
            return this.parseLiteral(this.value);
          case types$1._null:
          case types$1._true:
          case types$1._false:
            node = this.startNode();
            node.value = this.type === types$1._null ? null : this.type === types$1._true;
            node.raw = this.type.keyword;
            this.next();
            return this.finishNode(node, "Literal");
          case types$1.parenL:
            var start = this.start, expr = this.parseParenAndDistinguishExpression(canBeArrow, forInit);
            if (refDestructuringErrors) {
              if (refDestructuringErrors.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(expr)) {
                refDestructuringErrors.parenthesizedAssign = start;
              }
              if (refDestructuringErrors.parenthesizedBind < 0) {
                refDestructuringErrors.parenthesizedBind = start;
              }
            }
            return expr;
          case types$1.bracketL:
            node = this.startNode();
            this.next();
            node.elements = this.parseExprList(types$1.bracketR, true, true, refDestructuringErrors);
            return this.finishNode(node, "ArrayExpression");
          case types$1.braceL:
            this.overrideContext(types.b_expr);
            return this.parseObj(false, refDestructuringErrors);
          case types$1._function:
            node = this.startNode();
            this.next();
            return this.parseFunction(node, 0);
          case types$1._class:
            return this.parseClass(this.startNode(), false);
          case types$1._new:
            return this.parseNew();
          case types$1.backQuote:
            return this.parseTemplate();
          case types$1._import:
            if (this.options.ecmaVersion >= 11) {
              return this.parseExprImport();
            } else {
              return this.unexpected();
            }
          default:
            this.unexpected();
        }
      };
      pp$5.parseExprImport = function() {
        var node = this.startNode();
        if (this.containsEsc) {
          this.raiseRecoverable(this.start, "Escape sequence in keyword import");
        }
        var meta = this.parseIdent(true);
        switch (this.type) {
          case types$1.parenL:
            return this.parseDynamicImport(node);
          case types$1.dot:
            node.meta = meta;
            return this.parseImportMeta(node);
          default:
            this.unexpected();
        }
      };
      pp$5.parseDynamicImport = function(node) {
        this.next();
        node.source = this.parseMaybeAssign();
        if (!this.eat(types$1.parenR)) {
          var errorPos = this.start;
          if (this.eat(types$1.comma) && this.eat(types$1.parenR)) {
            this.raiseRecoverable(errorPos, "Trailing comma is not allowed in import()");
          } else {
            this.unexpected(errorPos);
          }
        }
        return this.finishNode(node, "ImportExpression");
      };
      pp$5.parseImportMeta = function(node) {
        this.next();
        var containsEsc = this.containsEsc;
        node.property = this.parseIdent(true);
        if (node.property.name !== "meta") {
          this.raiseRecoverable(node.property.start, "The only valid meta property for import is 'import.meta'");
        }
        if (containsEsc) {
          this.raiseRecoverable(node.start, "'import.meta' must not contain escaped characters");
        }
        if (this.options.sourceType !== "module" && !this.options.allowImportExportEverywhere) {
          this.raiseRecoverable(node.start, "Cannot use 'import.meta' outside a module");
        }
        return this.finishNode(node, "MetaProperty");
      };
      pp$5.parseLiteral = function(value) {
        var node = this.startNode();
        node.value = value;
        node.raw = this.input.slice(this.start, this.end);
        if (node.raw.charCodeAt(node.raw.length - 1) === 110) {
          node.bigint = node.raw.slice(0, -1).replace(/_/g, "");
        }
        this.next();
        return this.finishNode(node, "Literal");
      };
      pp$5.parseParenExpression = function() {
        this.expect(types$1.parenL);
        var val = this.parseExpression();
        this.expect(types$1.parenR);
        return val;
      };
      pp$5.parseParenAndDistinguishExpression = function(canBeArrow, forInit) {
        var startPos = this.start, startLoc = this.startLoc, val, allowTrailingComma = this.options.ecmaVersion >= 8;
        if (this.options.ecmaVersion >= 6) {
          this.next();
          var innerStartPos = this.start, innerStartLoc = this.startLoc;
          var exprList = [], first = true, lastIsComma = false;
          var refDestructuringErrors = new DestructuringErrors(), oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, spreadStart;
          this.yieldPos = 0;
          this.awaitPos = 0;
          while (this.type !== types$1.parenR) {
            first ? first = false : this.expect(types$1.comma);
            if (allowTrailingComma && this.afterTrailingComma(types$1.parenR, true)) {
              lastIsComma = true;
              break;
            } else if (this.type === types$1.ellipsis) {
              spreadStart = this.start;
              exprList.push(this.parseParenItem(this.parseRestBinding()));
              if (this.type === types$1.comma) {
                this.raise(this.start, "Comma is not permitted after the rest element");
              }
              break;
            } else {
              exprList.push(this.parseMaybeAssign(false, refDestructuringErrors, this.parseParenItem));
            }
          }
          var innerEndPos = this.lastTokEnd, innerEndLoc = this.lastTokEndLoc;
          this.expect(types$1.parenR);
          if (canBeArrow && !this.canInsertSemicolon() && this.eat(types$1.arrow)) {
            this.checkPatternErrors(refDestructuringErrors, false);
            this.checkYieldAwaitInDefaultParams();
            this.yieldPos = oldYieldPos;
            this.awaitPos = oldAwaitPos;
            return this.parseParenArrowList(startPos, startLoc, exprList, forInit);
          }
          if (!exprList.length || lastIsComma) {
            this.unexpected(this.lastTokStart);
          }
          if (spreadStart) {
            this.unexpected(spreadStart);
          }
          this.checkExpressionErrors(refDestructuringErrors, true);
          this.yieldPos = oldYieldPos || this.yieldPos;
          this.awaitPos = oldAwaitPos || this.awaitPos;
          if (exprList.length > 1) {
            val = this.startNodeAt(innerStartPos, innerStartLoc);
            val.expressions = exprList;
            this.finishNodeAt(val, "SequenceExpression", innerEndPos, innerEndLoc);
          } else {
            val = exprList[0];
          }
        } else {
          val = this.parseParenExpression();
        }
        if (this.options.preserveParens) {
          var par = this.startNodeAt(startPos, startLoc);
          par.expression = val;
          return this.finishNode(par, "ParenthesizedExpression");
        } else {
          return val;
        }
      };
      pp$5.parseParenItem = function(item) {
        return item;
      };
      pp$5.parseParenArrowList = function(startPos, startLoc, exprList, forInit) {
        return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList, false, forInit);
      };
      var empty = [];
      pp$5.parseNew = function() {
        if (this.containsEsc) {
          this.raiseRecoverable(this.start, "Escape sequence in keyword new");
        }
        var node = this.startNode();
        var meta = this.parseIdent(true);
        if (this.options.ecmaVersion >= 6 && this.eat(types$1.dot)) {
          node.meta = meta;
          var containsEsc = this.containsEsc;
          node.property = this.parseIdent(true);
          if (node.property.name !== "target") {
            this.raiseRecoverable(node.property.start, "The only valid meta property for new is 'new.target'");
          }
          if (containsEsc) {
            this.raiseRecoverable(node.start, "'new.target' must not contain escaped characters");
          }
          if (!this.allowNewDotTarget) {
            this.raiseRecoverable(node.start, "'new.target' can only be used in functions and class static block");
          }
          return this.finishNode(node, "MetaProperty");
        }
        var startPos = this.start, startLoc = this.startLoc, isImport = this.type === types$1._import;
        node.callee = this.parseSubscripts(this.parseExprAtom(), startPos, startLoc, true, false);
        if (isImport && node.callee.type === "ImportExpression") {
          this.raise(startPos, "Cannot use new with import()");
        }
        if (this.eat(types$1.parenL)) {
          node.arguments = this.parseExprList(types$1.parenR, this.options.ecmaVersion >= 8, false);
        } else {
          node.arguments = empty;
        }
        return this.finishNode(node, "NewExpression");
      };
      pp$5.parseTemplateElement = function(ref2) {
        var isTagged = ref2.isTagged;
        var elem = this.startNode();
        if (this.type === types$1.invalidTemplate) {
          if (!isTagged) {
            this.raiseRecoverable(this.start, "Bad escape sequence in untagged template literal");
          }
          elem.value = {
            raw: this.value,
            cooked: null
          };
        } else {
          elem.value = {
            raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, "\n"),
            cooked: this.value
          };
        }
        this.next();
        elem.tail = this.type === types$1.backQuote;
        return this.finishNode(elem, "TemplateElement");
      };
      pp$5.parseTemplate = function(ref2) {
        if (ref2 === void 0)
          ref2 = {};
        var isTagged = ref2.isTagged;
        if (isTagged === void 0)
          isTagged = false;
        var node = this.startNode();
        this.next();
        node.expressions = [];
        var curElt = this.parseTemplateElement({
          isTagged
        });
        node.quasis = [curElt];
        while (!curElt.tail) {
          if (this.type === types$1.eof) {
            this.raise(this.pos, "Unterminated template literal");
          }
          this.expect(types$1.dollarBraceL);
          node.expressions.push(this.parseExpression());
          this.expect(types$1.braceR);
          node.quasis.push(curElt = this.parseTemplateElement({
            isTagged
          }));
        }
        this.next();
        return this.finishNode(node, "TemplateLiteral");
      };
      pp$5.isAsyncProp = function(prop) {
        return !prop.computed && prop.key.type === "Identifier" && prop.key.name === "async" && (this.type === types$1.name || this.type === types$1.num || this.type === types$1.string || this.type === types$1.bracketL || this.type.keyword || this.options.ecmaVersion >= 9 && this.type === types$1.star) && !lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
      };
      pp$5.parseObj = function(isPattern, refDestructuringErrors) {
        var node = this.startNode(), first = true, propHash = {};
        node.properties = [];
        this.next();
        while (!this.eat(types$1.braceR)) {
          if (!first) {
            this.expect(types$1.comma);
            if (this.options.ecmaVersion >= 5 && this.afterTrailingComma(types$1.braceR)) {
              break;
            }
          } else {
            first = false;
          }
          var prop = this.parseProperty(isPattern, refDestructuringErrors);
          if (!isPattern) {
            this.checkPropClash(prop, propHash, refDestructuringErrors);
          }
          node.properties.push(prop);
        }
        return this.finishNode(node, isPattern ? "ObjectPattern" : "ObjectExpression");
      };
      pp$5.parseProperty = function(isPattern, refDestructuringErrors) {
        var prop = this.startNode(), isGenerator, isAsync, startPos, startLoc;
        if (this.options.ecmaVersion >= 9 && this.eat(types$1.ellipsis)) {
          if (isPattern) {
            prop.argument = this.parseIdent(false);
            if (this.type === types$1.comma) {
              this.raise(this.start, "Comma is not permitted after the rest element");
            }
            return this.finishNode(prop, "RestElement");
          }
          prop.argument = this.parseMaybeAssign(false, refDestructuringErrors);
          if (this.type === types$1.comma && refDestructuringErrors && refDestructuringErrors.trailingComma < 0) {
            refDestructuringErrors.trailingComma = this.start;
          }
          return this.finishNode(prop, "SpreadElement");
        }
        if (this.options.ecmaVersion >= 6) {
          prop.method = false;
          prop.shorthand = false;
          if (isPattern || refDestructuringErrors) {
            startPos = this.start;
            startLoc = this.startLoc;
          }
          if (!isPattern) {
            isGenerator = this.eat(types$1.star);
          }
        }
        var containsEsc = this.containsEsc;
        this.parsePropertyName(prop);
        if (!isPattern && !containsEsc && this.options.ecmaVersion >= 8 && !isGenerator && this.isAsyncProp(prop)) {
          isAsync = true;
          isGenerator = this.options.ecmaVersion >= 9 && this.eat(types$1.star);
          this.parsePropertyName(prop, refDestructuringErrors);
        } else {
          isAsync = false;
        }
        this.parsePropertyValue(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc);
        return this.finishNode(prop, "Property");
      };
      pp$5.parsePropertyValue = function(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc) {
        if ((isGenerator || isAsync) && this.type === types$1.colon) {
          this.unexpected();
        }
        if (this.eat(types$1.colon)) {
          prop.value = isPattern ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(false, refDestructuringErrors);
          prop.kind = "init";
        } else if (this.options.ecmaVersion >= 6 && this.type === types$1.parenL) {
          if (isPattern) {
            this.unexpected();
          }
          prop.kind = "init";
          prop.method = true;
          prop.value = this.parseMethod(isGenerator, isAsync);
        } else if (!isPattern && !containsEsc && this.options.ecmaVersion >= 5 && !prop.computed && prop.key.type === "Identifier" && (prop.key.name === "get" || prop.key.name === "set") && this.type !== types$1.comma && this.type !== types$1.braceR && this.type !== types$1.eq) {
          if (isGenerator || isAsync) {
            this.unexpected();
          }
          prop.kind = prop.key.name;
          this.parsePropertyName(prop);
          prop.value = this.parseMethod(false);
          var paramCount = prop.kind === "get" ? 0 : 1;
          if (prop.value.params.length !== paramCount) {
            var start = prop.value.start;
            if (prop.kind === "get") {
              this.raiseRecoverable(start, "getter should have no params");
            } else {
              this.raiseRecoverable(start, "setter should have exactly one param");
            }
          } else {
            if (prop.kind === "set" && prop.value.params[0].type === "RestElement") {
              this.raiseRecoverable(prop.value.params[0].start, "Setter cannot use rest params");
            }
          }
        } else if (this.options.ecmaVersion >= 6 && !prop.computed && prop.key.type === "Identifier") {
          if (isGenerator || isAsync) {
            this.unexpected();
          }
          this.checkUnreserved(prop.key);
          if (prop.key.name === "await" && !this.awaitIdentPos) {
            this.awaitIdentPos = startPos;
          }
          prop.kind = "init";
          if (isPattern) {
            prop.value = this.parseMaybeDefault(startPos, startLoc, this.copyNode(prop.key));
          } else if (this.type === types$1.eq && refDestructuringErrors) {
            if (refDestructuringErrors.shorthandAssign < 0) {
              refDestructuringErrors.shorthandAssign = this.start;
            }
            prop.value = this.parseMaybeDefault(startPos, startLoc, this.copyNode(prop.key));
          } else {
            prop.value = this.copyNode(prop.key);
          }
          prop.shorthand = true;
        } else {
          this.unexpected();
        }
      };
      pp$5.parsePropertyName = function(prop) {
        if (this.options.ecmaVersion >= 6) {
          if (this.eat(types$1.bracketL)) {
            prop.computed = true;
            prop.key = this.parseMaybeAssign();
            this.expect(types$1.bracketR);
            return prop.key;
          } else {
            prop.computed = false;
          }
        }
        return prop.key = this.type === types$1.num || this.type === types$1.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never");
      };
      pp$5.initFunction = function(node) {
        node.id = null;
        if (this.options.ecmaVersion >= 6) {
          node.generator = node.expression = false;
        }
        if (this.options.ecmaVersion >= 8) {
          node.async = false;
        }
      };
      pp$5.parseMethod = function(isGenerator, isAsync, allowDirectSuper) {
        var node = this.startNode(), oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
        this.initFunction(node);
        if (this.options.ecmaVersion >= 6) {
          node.generator = isGenerator;
        }
        if (this.options.ecmaVersion >= 8) {
          node.async = !!isAsync;
        }
        this.yieldPos = 0;
        this.awaitPos = 0;
        this.awaitIdentPos = 0;
        this.enterScope(functionFlags(isAsync, node.generator) | SCOPE_SUPER | (allowDirectSuper ? SCOPE_DIRECT_SUPER : 0));
        this.expect(types$1.parenL);
        node.params = this.parseBindingList(types$1.parenR, false, this.options.ecmaVersion >= 8);
        this.checkYieldAwaitInDefaultParams();
        this.parseFunctionBody(node, false, true, false);
        this.yieldPos = oldYieldPos;
        this.awaitPos = oldAwaitPos;
        this.awaitIdentPos = oldAwaitIdentPos;
        return this.finishNode(node, "FunctionExpression");
      };
      pp$5.parseArrowExpression = function(node, params, isAsync, forInit) {
        var oldYieldPos = this.yieldPos, oldAwaitPos = this.awaitPos, oldAwaitIdentPos = this.awaitIdentPos;
        this.enterScope(functionFlags(isAsync, false) | SCOPE_ARROW);
        this.initFunction(node);
        if (this.options.ecmaVersion >= 8) {
          node.async = !!isAsync;
        }
        this.yieldPos = 0;
        this.awaitPos = 0;
        this.awaitIdentPos = 0;
        node.params = this.toAssignableList(params, true);
        this.parseFunctionBody(node, true, false, forInit);
        this.yieldPos = oldYieldPos;
        this.awaitPos = oldAwaitPos;
        this.awaitIdentPos = oldAwaitIdentPos;
        return this.finishNode(node, "ArrowFunctionExpression");
      };
      pp$5.parseFunctionBody = function(node, isArrowFunction, isMethod, forInit) {
        var isExpression = isArrowFunction && this.type !== types$1.braceL;
        var oldStrict = this.strict, useStrict = false;
        if (isExpression) {
          node.body = this.parseMaybeAssign(forInit);
          node.expression = true;
          this.checkParams(node, false);
        } else {
          var nonSimple = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(node.params);
          if (!oldStrict || nonSimple) {
            useStrict = this.strictDirective(this.end);
            if (useStrict && nonSimple) {
              this.raiseRecoverable(node.start, "Illegal 'use strict' directive in function with non-simple parameter list");
            }
          }
          var oldLabels = this.labels;
          this.labels = [];
          if (useStrict) {
            this.strict = true;
          }
          this.checkParams(node, !oldStrict && !useStrict && !isArrowFunction && !isMethod && this.isSimpleParamList(node.params));
          if (this.strict && node.id) {
            this.checkLValSimple(node.id, BIND_OUTSIDE);
          }
          node.body = this.parseBlock(false, void 0, useStrict && !oldStrict);
          node.expression = false;
          this.adaptDirectivePrologue(node.body.body);
          this.labels = oldLabels;
        }
        this.exitScope();
      };
      pp$5.isSimpleParamList = function(params) {
        for (var i2 = 0, list2 = params; i2 < list2.length; i2 += 1) {
          var param = list2[i2];
          if (param.type !== "Identifier") {
            return false;
          }
        }
        return true;
      };
      pp$5.checkParams = function(node, allowDuplicates) {
        var nameHash = /* @__PURE__ */ Object.create(null);
        for (var i2 = 0, list2 = node.params; i2 < list2.length; i2 += 1) {
          var param = list2[i2];
          this.checkLValInnerPattern(param, BIND_VAR, allowDuplicates ? null : nameHash);
        }
      };
      pp$5.parseExprList = function(close, allowTrailingComma, allowEmpty, refDestructuringErrors) {
        var elts = [], first = true;
        while (!this.eat(close)) {
          if (!first) {
            this.expect(types$1.comma);
            if (allowTrailingComma && this.afterTrailingComma(close)) {
              break;
            }
          } else {
            first = false;
          }
          var elt = void 0;
          if (allowEmpty && this.type === types$1.comma) {
            elt = null;
          } else if (this.type === types$1.ellipsis) {
            elt = this.parseSpread(refDestructuringErrors);
            if (refDestructuringErrors && this.type === types$1.comma && refDestructuringErrors.trailingComma < 0) {
              refDestructuringErrors.trailingComma = this.start;
            }
          } else {
            elt = this.parseMaybeAssign(false, refDestructuringErrors);
          }
          elts.push(elt);
        }
        return elts;
      };
      pp$5.checkUnreserved = function(ref2) {
        var start = ref2.start;
        var end = ref2.end;
        var name = ref2.name;
        if (this.inGenerator && name === "yield") {
          this.raiseRecoverable(start, "Cannot use 'yield' as identifier inside a generator");
        }
        if (this.inAsync && name === "await") {
          this.raiseRecoverable(start, "Cannot use 'await' as identifier inside an async function");
        }
        if (this.currentThisScope().inClassFieldInit && name === "arguments") {
          this.raiseRecoverable(start, "Cannot use 'arguments' in class field initializer");
        }
        if (this.inClassStaticBlock && (name === "arguments" || name === "await")) {
          this.raise(start, "Cannot use " + name + " in class static initialization block");
        }
        if (this.keywords.test(name)) {
          this.raise(start, "Unexpected keyword '" + name + "'");
        }
        if (this.options.ecmaVersion < 6 && this.input.slice(start, end).indexOf("\\") !== -1) {
          return;
        }
        var re = this.strict ? this.reservedWordsStrict : this.reservedWords;
        if (re.test(name)) {
          if (!this.inAsync && name === "await") {
            this.raiseRecoverable(start, "Cannot use keyword 'await' outside an async function");
          }
          this.raiseRecoverable(start, "The keyword '" + name + "' is reserved");
        }
      };
      pp$5.parseIdent = function(liberal, isBinding) {
        var node = this.startNode();
        if (this.type === types$1.name) {
          node.name = this.value;
        } else if (this.type.keyword) {
          node.name = this.type.keyword;
          if ((node.name === "class" || node.name === "function") && (this.lastTokEnd !== this.lastTokStart + 1 || this.input.charCodeAt(this.lastTokStart) !== 46)) {
            this.context.pop();
          }
        } else {
          this.unexpected();
        }
        this.next(!!liberal);
        this.finishNode(node, "Identifier");
        if (!liberal) {
          this.checkUnreserved(node);
          if (node.name === "await" && !this.awaitIdentPos) {
            this.awaitIdentPos = node.start;
          }
        }
        return node;
      };
      pp$5.parsePrivateIdent = function() {
        var node = this.startNode();
        if (this.type === types$1.privateId) {
          node.name = this.value;
        } else {
          this.unexpected();
        }
        this.next();
        this.finishNode(node, "PrivateIdentifier");
        if (this.privateNameStack.length === 0) {
          this.raise(node.start, "Private field '#" + node.name + "' must be declared in an enclosing class");
        } else {
          this.privateNameStack[this.privateNameStack.length - 1].used.push(node);
        }
        return node;
      };
      pp$5.parseYield = function(forInit) {
        if (!this.yieldPos) {
          this.yieldPos = this.start;
        }
        var node = this.startNode();
        this.next();
        if (this.type === types$1.semi || this.canInsertSemicolon() || this.type !== types$1.star && !this.type.startsExpr) {
          node.delegate = false;
          node.argument = null;
        } else {
          node.delegate = this.eat(types$1.star);
          node.argument = this.parseMaybeAssign(forInit);
        }
        return this.finishNode(node, "YieldExpression");
      };
      pp$5.parseAwait = function(forInit) {
        if (!this.awaitPos) {
          this.awaitPos = this.start;
        }
        var node = this.startNode();
        this.next();
        node.argument = this.parseMaybeUnary(null, true, false, forInit);
        return this.finishNode(node, "AwaitExpression");
      };
      var pp$4 = Parser.prototype;
      pp$4.raise = function(pos, message) {
        var loc = getLineInfo(this.input, pos);
        message += " (" + loc.line + ":" + loc.column + ")";
        var err = new SyntaxError(message);
        err.pos = pos;
        err.loc = loc;
        err.raisedAt = this.pos;
        throw err;
      };
      pp$4.raiseRecoverable = pp$4.raise;
      pp$4.curPosition = function() {
        if (this.options.locations) {
          return new Position(this.curLine, this.pos - this.lineStart);
        }
      };
      var pp$3 = Parser.prototype;
      var Scope = function Scope2(flags) {
        this.flags = flags;
        this.var = [];
        this.lexical = [];
        this.functions = [];
        this.inClassFieldInit = false;
      };
      pp$3.enterScope = function(flags) {
        this.scopeStack.push(new Scope(flags));
      };
      pp$3.exitScope = function() {
        this.scopeStack.pop();
      };
      pp$3.treatFunctionsAsVarInScope = function(scope) {
        return scope.flags & SCOPE_FUNCTION || !this.inModule && scope.flags & SCOPE_TOP;
      };
      pp$3.declareName = function(name, bindingType, pos) {
        var redeclared = false;
        if (bindingType === BIND_LEXICAL) {
          var scope = this.currentScope();
          redeclared = scope.lexical.indexOf(name) > -1 || scope.functions.indexOf(name) > -1 || scope.var.indexOf(name) > -1;
          scope.lexical.push(name);
          if (this.inModule && scope.flags & SCOPE_TOP) {
            delete this.undefinedExports[name];
          }
        } else if (bindingType === BIND_SIMPLE_CATCH) {
          var scope$1 = this.currentScope();
          scope$1.lexical.push(name);
        } else if (bindingType === BIND_FUNCTION) {
          var scope$2 = this.currentScope();
          if (this.treatFunctionsAsVar) {
            redeclared = scope$2.lexical.indexOf(name) > -1;
          } else {
            redeclared = scope$2.lexical.indexOf(name) > -1 || scope$2.var.indexOf(name) > -1;
          }
          scope$2.functions.push(name);
        } else {
          for (var i2 = this.scopeStack.length - 1; i2 >= 0; --i2) {
            var scope$3 = this.scopeStack[i2];
            if (scope$3.lexical.indexOf(name) > -1 && !(scope$3.flags & SCOPE_SIMPLE_CATCH && scope$3.lexical[0] === name) || !this.treatFunctionsAsVarInScope(scope$3) && scope$3.functions.indexOf(name) > -1) {
              redeclared = true;
              break;
            }
            scope$3.var.push(name);
            if (this.inModule && scope$3.flags & SCOPE_TOP) {
              delete this.undefinedExports[name];
            }
            if (scope$3.flags & SCOPE_VAR) {
              break;
            }
          }
        }
        if (redeclared) {
          this.raiseRecoverable(pos, "Identifier '" + name + "' has already been declared");
        }
      };
      pp$3.checkLocalExport = function(id) {
        if (this.scopeStack[0].lexical.indexOf(id.name) === -1 && this.scopeStack[0].var.indexOf(id.name) === -1) {
          this.undefinedExports[id.name] = id;
        }
      };
      pp$3.currentScope = function() {
        return this.scopeStack[this.scopeStack.length - 1];
      };
      pp$3.currentVarScope = function() {
        for (var i2 = this.scopeStack.length - 1; ; i2--) {
          var scope = this.scopeStack[i2];
          if (scope.flags & SCOPE_VAR) {
            return scope;
          }
        }
      };
      pp$3.currentThisScope = function() {
        for (var i2 = this.scopeStack.length - 1; ; i2--) {
          var scope = this.scopeStack[i2];
          if (scope.flags & SCOPE_VAR && !(scope.flags & SCOPE_ARROW)) {
            return scope;
          }
        }
      };
      var Node = function Node2(parser, pos, loc) {
        this.type = "";
        this.start = pos;
        this.end = 0;
        if (parser.options.locations) {
          this.loc = new SourceLocation(parser, loc);
        }
        if (parser.options.directSourceFile) {
          this.sourceFile = parser.options.directSourceFile;
        }
        if (parser.options.ranges) {
          this.range = [pos, 0];
        }
      };
      var pp$2 = Parser.prototype;
      pp$2.startNode = function() {
        return new Node(this, this.start, this.startLoc);
      };
      pp$2.startNodeAt = function(pos, loc) {
        return new Node(this, pos, loc);
      };
      function finishNodeAt(node, type2, pos, loc) {
        node.type = type2;
        node.end = pos;
        if (this.options.locations) {
          node.loc.end = loc;
        }
        if (this.options.ranges) {
          node.range[1] = pos;
        }
        return node;
      }
      pp$2.finishNode = function(node, type2) {
        return finishNodeAt.call(this, node, type2, this.lastTokEnd, this.lastTokEndLoc);
      };
      pp$2.finishNodeAt = function(node, type2, pos, loc) {
        return finishNodeAt.call(this, node, type2, pos, loc);
      };
      pp$2.copyNode = function(node) {
        var newNode = new Node(this, node.start, this.startLoc);
        for (var prop in node) {
          newNode[prop] = node[prop];
        }
        return newNode;
      };
      var ecma9BinaryProperties = "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS";
      var ecma10BinaryProperties = ecma9BinaryProperties + " Extended_Pictographic";
      var ecma11BinaryProperties = ecma10BinaryProperties;
      var ecma12BinaryProperties = ecma11BinaryProperties + " EBase EComp EMod EPres ExtPict";
      var ecma13BinaryProperties = ecma12BinaryProperties;
      var unicodeBinaryProperties = {
        9: ecma9BinaryProperties,
        10: ecma10BinaryProperties,
        11: ecma11BinaryProperties,
        12: ecma12BinaryProperties,
        13: ecma13BinaryProperties
      };
      var unicodeGeneralCategoryValues = "Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu";
      var ecma9ScriptValues = "Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb";
      var ecma10ScriptValues = ecma9ScriptValues + " Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd";
      var ecma11ScriptValues = ecma10ScriptValues + " Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho";
      var ecma12ScriptValues = ecma11ScriptValues + " Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi";
      var ecma13ScriptValues = ecma12ScriptValues + " Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith";
      var unicodeScriptValues = {
        9: ecma9ScriptValues,
        10: ecma10ScriptValues,
        11: ecma11ScriptValues,
        12: ecma12ScriptValues,
        13: ecma13ScriptValues
      };
      var data = {};
      function buildUnicodeData(ecmaVersion2) {
        var d = data[ecmaVersion2] = {
          binary: wordsRegexp(unicodeBinaryProperties[ecmaVersion2] + " " + unicodeGeneralCategoryValues),
          nonBinary: {
            General_Category: wordsRegexp(unicodeGeneralCategoryValues),
            Script: wordsRegexp(unicodeScriptValues[ecmaVersion2])
          }
        };
        d.nonBinary.Script_Extensions = d.nonBinary.Script;
        d.nonBinary.gc = d.nonBinary.General_Category;
        d.nonBinary.sc = d.nonBinary.Script;
        d.nonBinary.scx = d.nonBinary.Script_Extensions;
      }
      for (var i = 0, list = [9, 10, 11, 12, 13]; i < list.length; i += 1) {
        var ecmaVersion = list[i];
        buildUnicodeData(ecmaVersion);
      }
      var pp$1 = Parser.prototype;
      var RegExpValidationState = function RegExpValidationState2(parser) {
        this.parser = parser;
        this.validFlags = "gim" + (parser.options.ecmaVersion >= 6 ? "uy" : "") + (parser.options.ecmaVersion >= 9 ? "s" : "") + (parser.options.ecmaVersion >= 13 ? "d" : "");
        this.unicodeProperties = data[parser.options.ecmaVersion >= 13 ? 13 : parser.options.ecmaVersion];
        this.source = "";
        this.flags = "";
        this.start = 0;
        this.switchU = false;
        this.switchN = false;
        this.pos = 0;
        this.lastIntValue = 0;
        this.lastStringValue = "";
        this.lastAssertionIsQuantifiable = false;
        this.numCapturingParens = 0;
        this.maxBackReference = 0;
        this.groupNames = [];
        this.backReferenceNames = [];
      };
      RegExpValidationState.prototype.reset = function reset(start, pattern, flags) {
        var unicode = flags.indexOf("u") !== -1;
        this.start = start | 0;
        this.source = pattern + "";
        this.flags = flags;
        this.switchU = unicode && this.parser.options.ecmaVersion >= 6;
        this.switchN = unicode && this.parser.options.ecmaVersion >= 9;
      };
      RegExpValidationState.prototype.raise = function raise(message) {
        this.parser.raiseRecoverable(this.start, "Invalid regular expression: /" + this.source + "/: " + message);
      };
      RegExpValidationState.prototype.at = function at(i2, forceU) {
        if (forceU === void 0)
          forceU = false;
        var s = this.source;
        var l = s.length;
        if (i2 >= l) {
          return -1;
        }
        var c = s.charCodeAt(i2);
        if (!(forceU || this.switchU) || c <= 55295 || c >= 57344 || i2 + 1 >= l) {
          return c;
        }
        var next = s.charCodeAt(i2 + 1);
        return next >= 56320 && next <= 57343 ? (c << 10) + next - 56613888 : c;
      };
      RegExpValidationState.prototype.nextIndex = function nextIndex(i2, forceU) {
        if (forceU === void 0)
          forceU = false;
        var s = this.source;
        var l = s.length;
        if (i2 >= l) {
          return l;
        }
        var c = s.charCodeAt(i2), next;
        if (!(forceU || this.switchU) || c <= 55295 || c >= 57344 || i2 + 1 >= l || (next = s.charCodeAt(i2 + 1)) < 56320 || next > 57343) {
          return i2 + 1;
        }
        return i2 + 2;
      };
      RegExpValidationState.prototype.current = function current(forceU) {
        if (forceU === void 0)
          forceU = false;
        return this.at(this.pos, forceU);
      };
      RegExpValidationState.prototype.lookahead = function lookahead(forceU) {
        if (forceU === void 0)
          forceU = false;
        return this.at(this.nextIndex(this.pos, forceU), forceU);
      };
      RegExpValidationState.prototype.advance = function advance(forceU) {
        if (forceU === void 0)
          forceU = false;
        this.pos = this.nextIndex(this.pos, forceU);
      };
      RegExpValidationState.prototype.eat = function eat(ch, forceU) {
        if (forceU === void 0)
          forceU = false;
        if (this.current(forceU) === ch) {
          this.advance(forceU);
          return true;
        }
        return false;
      };
      pp$1.validateRegExpFlags = function(state) {
        var validFlags = state.validFlags;
        var flags = state.flags;
        for (var i2 = 0; i2 < flags.length; i2++) {
          var flag = flags.charAt(i2);
          if (validFlags.indexOf(flag) === -1) {
            this.raise(state.start, "Invalid regular expression flag");
          }
          if (flags.indexOf(flag, i2 + 1) > -1) {
            this.raise(state.start, "Duplicate regular expression flag");
          }
        }
      };
      pp$1.validateRegExpPattern = function(state) {
        this.regexp_pattern(state);
        if (!state.switchN && this.options.ecmaVersion >= 9 && state.groupNames.length > 0) {
          state.switchN = true;
          this.regexp_pattern(state);
        }
      };
      pp$1.regexp_pattern = function(state) {
        state.pos = 0;
        state.lastIntValue = 0;
        state.lastStringValue = "";
        state.lastAssertionIsQuantifiable = false;
        state.numCapturingParens = 0;
        state.maxBackReference = 0;
        state.groupNames.length = 0;
        state.backReferenceNames.length = 0;
        this.regexp_disjunction(state);
        if (state.pos !== state.source.length) {
          if (state.eat(41)) {
            state.raise("Unmatched ')'");
          }
          if (state.eat(93) || state.eat(125)) {
            state.raise("Lone quantifier brackets");
          }
        }
        if (state.maxBackReference > state.numCapturingParens) {
          state.raise("Invalid escape");
        }
        for (var i2 = 0, list2 = state.backReferenceNames; i2 < list2.length; i2 += 1) {
          var name = list2[i2];
          if (state.groupNames.indexOf(name) === -1) {
            state.raise("Invalid named capture referenced");
          }
        }
      };
      pp$1.regexp_disjunction = function(state) {
        this.regexp_alternative(state);
        while (state.eat(124)) {
          this.regexp_alternative(state);
        }
        if (this.regexp_eatQuantifier(state, true)) {
          state.raise("Nothing to repeat");
        }
        if (state.eat(123)) {
          state.raise("Lone quantifier brackets");
        }
      };
      pp$1.regexp_alternative = function(state) {
        while (state.pos < state.source.length && this.regexp_eatTerm(state)) {
        }
      };
      pp$1.regexp_eatTerm = function(state) {
        if (this.regexp_eatAssertion(state)) {
          if (state.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(state)) {
            if (state.switchU) {
              state.raise("Invalid quantifier");
            }
          }
          return true;
        }
        if (state.switchU ? this.regexp_eatAtom(state) : this.regexp_eatExtendedAtom(state)) {
          this.regexp_eatQuantifier(state);
          return true;
        }
        return false;
      };
      pp$1.regexp_eatAssertion = function(state) {
        var start = state.pos;
        state.lastAssertionIsQuantifiable = false;
        if (state.eat(94) || state.eat(36)) {
          return true;
        }
        if (state.eat(92)) {
          if (state.eat(66) || state.eat(98)) {
            return true;
          }
          state.pos = start;
        }
        if (state.eat(40) && state.eat(63)) {
          var lookbehind = false;
          if (this.options.ecmaVersion >= 9) {
            lookbehind = state.eat(60);
          }
          if (state.eat(61) || state.eat(33)) {
            this.regexp_disjunction(state);
            if (!state.eat(41)) {
              state.raise("Unterminated group");
            }
            state.lastAssertionIsQuantifiable = !lookbehind;
            return true;
          }
        }
        state.pos = start;
        return false;
      };
      pp$1.regexp_eatQuantifier = function(state, noError) {
        if (noError === void 0)
          noError = false;
        if (this.regexp_eatQuantifierPrefix(state, noError)) {
          state.eat(63);
          return true;
        }
        return false;
      };
      pp$1.regexp_eatQuantifierPrefix = function(state, noError) {
        return state.eat(42) || state.eat(43) || state.eat(63) || this.regexp_eatBracedQuantifier(state, noError);
      };
      pp$1.regexp_eatBracedQuantifier = function(state, noError) {
        var start = state.pos;
        if (state.eat(123)) {
          var min = 0, max = -1;
          if (this.regexp_eatDecimalDigits(state)) {
            min = state.lastIntValue;
            if (state.eat(44) && this.regexp_eatDecimalDigits(state)) {
              max = state.lastIntValue;
            }
            if (state.eat(125)) {
              if (max !== -1 && max < min && !noError) {
                state.raise("numbers out of order in {} quantifier");
              }
              return true;
            }
          }
          if (state.switchU && !noError) {
            state.raise("Incomplete quantifier");
          }
          state.pos = start;
        }
        return false;
      };
      pp$1.regexp_eatAtom = function(state) {
        return this.regexp_eatPatternCharacters(state) || state.eat(46) || this.regexp_eatReverseSolidusAtomEscape(state) || this.regexp_eatCharacterClass(state) || this.regexp_eatUncapturingGroup(state) || this.regexp_eatCapturingGroup(state);
      };
      pp$1.regexp_eatReverseSolidusAtomEscape = function(state) {
        var start = state.pos;
        if (state.eat(92)) {
          if (this.regexp_eatAtomEscape(state)) {
            return true;
          }
          state.pos = start;
        }
        return false;
      };
      pp$1.regexp_eatUncapturingGroup = function(state) {
        var start = state.pos;
        if (state.eat(40)) {
          if (state.eat(63) && state.eat(58)) {
            this.regexp_disjunction(state);
            if (state.eat(41)) {
              return true;
            }
            state.raise("Unterminated group");
          }
          state.pos = start;
        }
        return false;
      };
      pp$1.regexp_eatCapturingGroup = function(state) {
        if (state.eat(40)) {
          if (this.options.ecmaVersion >= 9) {
            this.regexp_groupSpecifier(state);
          } else if (state.current() === 63) {
            state.raise("Invalid group");
          }
          this.regexp_disjunction(state);
          if (state.eat(41)) {
            state.numCapturingParens += 1;
            return true;
          }
          state.raise("Unterminated group");
        }
        return false;
      };
      pp$1.regexp_eatExtendedAtom = function(state) {
        return state.eat(46) || this.regexp_eatReverseSolidusAtomEscape(state) || this.regexp_eatCharacterClass(state) || this.regexp_eatUncapturingGroup(state) || this.regexp_eatCapturingGroup(state) || this.regexp_eatInvalidBracedQuantifier(state) || this.regexp_eatExtendedPatternCharacter(state);
      };
      pp$1.regexp_eatInvalidBracedQuantifier = function(state) {
        if (this.regexp_eatBracedQuantifier(state, true)) {
          state.raise("Nothing to repeat");
        }
        return false;
      };
      pp$1.regexp_eatSyntaxCharacter = function(state) {
        var ch = state.current();
        if (isSyntaxCharacter(ch)) {
          state.lastIntValue = ch;
          state.advance();
          return true;
        }
        return false;
      };
      function isSyntaxCharacter(ch) {
        return ch === 36 || ch >= 40 && ch <= 43 || ch === 46 || ch === 63 || ch >= 91 && ch <= 94 || ch >= 123 && ch <= 125;
      }
      pp$1.regexp_eatPatternCharacters = function(state) {
        var start = state.pos;
        var ch = 0;
        while ((ch = state.current()) !== -1 && !isSyntaxCharacter(ch)) {
          state.advance();
        }
        return state.pos !== start;
      };
      pp$1.regexp_eatExtendedPatternCharacter = function(state) {
        var ch = state.current();
        if (ch !== -1 && ch !== 36 && !(ch >= 40 && ch <= 43) && ch !== 46 && ch !== 63 && ch !== 91 && ch !== 94 && ch !== 124) {
          state.advance();
          return true;
        }
        return false;
      };
      pp$1.regexp_groupSpecifier = function(state) {
        if (state.eat(63)) {
          if (this.regexp_eatGroupName(state)) {
            if (state.groupNames.indexOf(state.lastStringValue) !== -1) {
              state.raise("Duplicate capture group name");
            }
            state.groupNames.push(state.lastStringValue);
            return;
          }
          state.raise("Invalid group");
        }
      };
      pp$1.regexp_eatGroupName = function(state) {
        state.lastStringValue = "";
        if (state.eat(60)) {
          if (this.regexp_eatRegExpIdentifierName(state) && state.eat(62)) {
            return true;
          }
          state.raise("Invalid capture group name");
        }
        return false;
      };
      pp$1.regexp_eatRegExpIdentifierName = function(state) {
        state.lastStringValue = "";
        if (this.regexp_eatRegExpIdentifierStart(state)) {
          state.lastStringValue += codePointToString(state.lastIntValue);
          while (this.regexp_eatRegExpIdentifierPart(state)) {
            state.lastStringValue += codePointToString(state.lastIntValue);
          }
          return true;
        }
        return false;
      };
      pp$1.regexp_eatRegExpIdentifierStart = function(state) {
        var start = state.pos;
        var forceU = this.options.ecmaVersion >= 11;
        var ch = state.current(forceU);
        state.advance(forceU);
        if (ch === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(state, forceU)) {
          ch = state.lastIntValue;
        }
        if (isRegExpIdentifierStart(ch)) {
          state.lastIntValue = ch;
          return true;
        }
        state.pos = start;
        return false;
      };
      function isRegExpIdentifierStart(ch) {
        return isIdentifierStart(ch, true) || ch === 36 || ch === 95;
      }
      pp$1.regexp_eatRegExpIdentifierPart = function(state) {
        var start = state.pos;
        var forceU = this.options.ecmaVersion >= 11;
        var ch = state.current(forceU);
        state.advance(forceU);
        if (ch === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(state, forceU)) {
          ch = state.lastIntValue;
        }
        if (isRegExpIdentifierPart(ch)) {
          state.lastIntValue = ch;
          return true;
        }
        state.pos = start;
        return false;
      };
      function isRegExpIdentifierPart(ch) {
        return isIdentifierChar(ch, true) || ch === 36 || ch === 95 || ch === 8204 || ch === 8205;
      }
      pp$1.regexp_eatAtomEscape = function(state) {
        if (this.regexp_eatBackReference(state) || this.regexp_eatCharacterClassEscape(state) || this.regexp_eatCharacterEscape(state) || state.switchN && this.regexp_eatKGroupName(state)) {
          return true;
        }
        if (state.switchU) {
          if (state.current() === 99) {
            state.raise("Invalid unicode escape");
          }
          state.raise("Invalid escape");
        }
        return false;
      };
      pp$1.regexp_eatBackReference = function(state) {
        var start = state.pos;
        if (this.regexp_eatDecimalEscape(state)) {
          var n = state.lastIntValue;
          if (state.switchU) {
            if (n > state.maxBackReference) {
              state.maxBackReference = n;
            }
            return true;
          }
          if (n <= state.numCapturingParens) {
            return true;
          }
          state.pos = start;
        }
        return false;
      };
      pp$1.regexp_eatKGroupName = function(state) {
        if (state.eat(107)) {
          if (this.regexp_eatGroupName(state)) {
            state.backReferenceNames.push(state.lastStringValue);
            return true;
          }
          state.raise("Invalid named reference");
        }
        return false;
      };
      pp$1.regexp_eatCharacterEscape = function(state) {
        return this.regexp_eatControlEscape(state) || this.regexp_eatCControlLetter(state) || this.regexp_eatZero(state) || this.regexp_eatHexEscapeSequence(state) || this.regexp_eatRegExpUnicodeEscapeSequence(state, false) || !state.switchU && this.regexp_eatLegacyOctalEscapeSequence(state) || this.regexp_eatIdentityEscape(state);
      };
      pp$1.regexp_eatCControlLetter = function(state) {
        var start = state.pos;
        if (state.eat(99)) {
          if (this.regexp_eatControlLetter(state)) {
            return true;
          }
          state.pos = start;
        }
        return false;
      };
      pp$1.regexp_eatZero = function(state) {
        if (state.current() === 48 && !isDecimalDigit(state.lookahead())) {
          state.lastIntValue = 0;
          state.advance();
          return true;
        }
        return false;
      };
      pp$1.regexp_eatControlEscape = function(state) {
        var ch = state.current();
        if (ch === 116) {
          state.lastIntValue = 9;
          state.advance();
          return true;
        }
        if (ch === 110) {
          state.lastIntValue = 10;
          state.advance();
          return true;
        }
        if (ch === 118) {
          state.lastIntValue = 11;
          state.advance();
          return true;
        }
        if (ch === 102) {
          state.lastIntValue = 12;
          state.advance();
          return true;
        }
        if (ch === 114) {
          state.lastIntValue = 13;
          state.advance();
          return true;
        }
        return false;
      };
      pp$1.regexp_eatControlLetter = function(state) {
        var ch = state.current();
        if (isControlLetter(ch)) {
          state.lastIntValue = ch % 32;
          state.advance();
          return true;
        }
        return false;
      };
      function isControlLetter(ch) {
        return ch >= 65 && ch <= 90 || ch >= 97 && ch <= 122;
      }
      pp$1.regexp_eatRegExpUnicodeEscapeSequence = function(state, forceU) {
        if (forceU === void 0)
          forceU = false;
        var start = state.pos;
        var switchU = forceU || state.switchU;
        if (state.eat(117)) {
          if (this.regexp_eatFixedHexDigits(state, 4)) {
            var lead = state.lastIntValue;
            if (switchU && lead >= 55296 && lead <= 56319) {
              var leadSurrogateEnd = state.pos;
              if (state.eat(92) && state.eat(117) && this.regexp_eatFixedHexDigits(state, 4)) {
                var trail = state.lastIntValue;
                if (trail >= 56320 && trail <= 57343) {
                  state.lastIntValue = (lead - 55296) * 1024 + (trail - 56320) + 65536;
                  return true;
                }
              }
              state.pos = leadSurrogateEnd;
              state.lastIntValue = lead;
            }
            return true;
          }
          if (switchU && state.eat(123) && this.regexp_eatHexDigits(state) && state.eat(125) && isValidUnicode(state.lastIntValue)) {
            return true;
          }
          if (switchU) {
            state.raise("Invalid unicode escape");
          }
          state.pos = start;
        }
        return false;
      };
      function isValidUnicode(ch) {
        return ch >= 0 && ch <= 1114111;
      }
      pp$1.regexp_eatIdentityEscape = function(state) {
        if (state.switchU) {
          if (this.regexp_eatSyntaxCharacter(state)) {
            return true;
          }
          if (state.eat(47)) {
            state.lastIntValue = 47;
            return true;
          }
          return false;
        }
        var ch = state.current();
        if (ch !== 99 && (!state.switchN || ch !== 107)) {
          state.lastIntValue = ch;
          state.advance();
          return true;
        }
        return false;
      };
      pp$1.regexp_eatDecimalEscape = function(state) {
        state.lastIntValue = 0;
        var ch = state.current();
        if (ch >= 49 && ch <= 57) {
          do {
            state.lastIntValue = 10 * state.lastIntValue + (ch - 48);
            state.advance();
          } while ((ch = state.current()) >= 48 && ch <= 57);
          return true;
        }
        return false;
      };
      pp$1.regexp_eatCharacterClassEscape = function(state) {
        var ch = state.current();
        if (isCharacterClassEscape(ch)) {
          state.lastIntValue = -1;
          state.advance();
          return true;
        }
        if (state.switchU && this.options.ecmaVersion >= 9 && (ch === 80 || ch === 112)) {
          state.lastIntValue = -1;
          state.advance();
          if (state.eat(123) && this.regexp_eatUnicodePropertyValueExpression(state) && state.eat(125)) {
            return true;
          }
          state.raise("Invalid property name");
        }
        return false;
      };
      function isCharacterClassEscape(ch) {
        return ch === 100 || ch === 68 || ch === 115 || ch === 83 || ch === 119 || ch === 87;
      }
      pp$1.regexp_eatUnicodePropertyValueExpression = function(state) {
        var start = state.pos;
        if (this.regexp_eatUnicodePropertyName(state) && state.eat(61)) {
          var name = state.lastStringValue;
          if (this.regexp_eatUnicodePropertyValue(state)) {
            var value = state.lastStringValue;
            this.regexp_validateUnicodePropertyNameAndValue(state, name, value);
            return true;
          }
        }
        state.pos = start;
        if (this.regexp_eatLoneUnicodePropertyNameOrValue(state)) {
          var nameOrValue = state.lastStringValue;
          this.regexp_validateUnicodePropertyNameOrValue(state, nameOrValue);
          return true;
        }
        return false;
      };
      pp$1.regexp_validateUnicodePropertyNameAndValue = function(state, name, value) {
        if (!hasOwn(state.unicodeProperties.nonBinary, name)) {
          state.raise("Invalid property name");
        }
        if (!state.unicodeProperties.nonBinary[name].test(value)) {
          state.raise("Invalid property value");
        }
      };
      pp$1.regexp_validateUnicodePropertyNameOrValue = function(state, nameOrValue) {
        if (!state.unicodeProperties.binary.test(nameOrValue)) {
          state.raise("Invalid property name");
        }
      };
      pp$1.regexp_eatUnicodePropertyName = function(state) {
        var ch = 0;
        state.lastStringValue = "";
        while (isUnicodePropertyNameCharacter(ch = state.current())) {
          state.lastStringValue += codePointToString(ch);
          state.advance();
        }
        return state.lastStringValue !== "";
      };
      function isUnicodePropertyNameCharacter(ch) {
        return isControlLetter(ch) || ch === 95;
      }
      pp$1.regexp_eatUnicodePropertyValue = function(state) {
        var ch = 0;
        state.lastStringValue = "";
        while (isUnicodePropertyValueCharacter(ch = state.current())) {
          state.lastStringValue += codePointToString(ch);
          state.advance();
        }
        return state.lastStringValue !== "";
      };
      function isUnicodePropertyValueCharacter(ch) {
        return isUnicodePropertyNameCharacter(ch) || isDecimalDigit(ch);
      }
      pp$1.regexp_eatLoneUnicodePropertyNameOrValue = function(state) {
        return this.regexp_eatUnicodePropertyValue(state);
      };
      pp$1.regexp_eatCharacterClass = function(state) {
        if (state.eat(91)) {
          state.eat(94);
          this.regexp_classRanges(state);
          if (state.eat(93)) {
            return true;
          }
          state.raise("Unterminated character class");
        }
        return false;
      };
      pp$1.regexp_classRanges = function(state) {
        while (this.regexp_eatClassAtom(state)) {
          var left = state.lastIntValue;
          if (state.eat(45) && this.regexp_eatClassAtom(state)) {
            var right = state.lastIntValue;
            if (state.switchU && (left === -1 || right === -1)) {
              state.raise("Invalid character class");
            }
            if (left !== -1 && right !== -1 && left > right) {
              state.raise("Range out of order in character class");
            }
          }
        }
      };
      pp$1.regexp_eatClassAtom = function(state) {
        var start = state.pos;
        if (state.eat(92)) {
          if (this.regexp_eatClassEscape(state)) {
            return true;
          }
          if (state.switchU) {
            var ch$1 = state.current();
            if (ch$1 === 99 || isOctalDigit(ch$1)) {
              state.raise("Invalid class escape");
            }
            state.raise("Invalid escape");
          }
          state.pos = start;
        }
        var ch = state.current();
        if (ch !== 93) {
          state.lastIntValue = ch;
          state.advance();
          return true;
        }
        return false;
      };
      pp$1.regexp_eatClassEscape = function(state) {
        var start = state.pos;
        if (state.eat(98)) {
          state.lastIntValue = 8;
          return true;
        }
        if (state.switchU && state.eat(45)) {
          state.lastIntValue = 45;
          return true;
        }
        if (!state.switchU && state.eat(99)) {
          if (this.regexp_eatClassControlLetter(state)) {
            return true;
          }
          state.pos = start;
        }
        return this.regexp_eatCharacterClassEscape(state) || this.regexp_eatCharacterEscape(state);
      };
      pp$1.regexp_eatClassControlLetter = function(state) {
        var ch = state.current();
        if (isDecimalDigit(ch) || ch === 95) {
          state.lastIntValue = ch % 32;
          state.advance();
          return true;
        }
        return false;
      };
      pp$1.regexp_eatHexEscapeSequence = function(state) {
        var start = state.pos;
        if (state.eat(120)) {
          if (this.regexp_eatFixedHexDigits(state, 2)) {
            return true;
          }
          if (state.switchU) {
            state.raise("Invalid escape");
          }
          state.pos = start;
        }
        return false;
      };
      pp$1.regexp_eatDecimalDigits = function(state) {
        var start = state.pos;
        var ch = 0;
        state.lastIntValue = 0;
        while (isDecimalDigit(ch = state.current())) {
          state.lastIntValue = 10 * state.lastIntValue + (ch - 48);
          state.advance();
        }
        return state.pos !== start;
      };
      function isDecimalDigit(ch) {
        return ch >= 48 && ch <= 57;
      }
      pp$1.regexp_eatHexDigits = function(state) {
        var start = state.pos;
        var ch = 0;
        state.lastIntValue = 0;
        while (isHexDigit(ch = state.current())) {
          state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch);
          state.advance();
        }
        return state.pos !== start;
      };
      function isHexDigit(ch) {
        return ch >= 48 && ch <= 57 || ch >= 65 && ch <= 70 || ch >= 97 && ch <= 102;
      }
      function hexToInt(ch) {
        if (ch >= 65 && ch <= 70) {
          return 10 + (ch - 65);
        }
        if (ch >= 97 && ch <= 102) {
          return 10 + (ch - 97);
        }
        return ch - 48;
      }
      pp$1.regexp_eatLegacyOctalEscapeSequence = function(state) {
        if (this.regexp_eatOctalDigit(state)) {
          var n1 = state.lastIntValue;
          if (this.regexp_eatOctalDigit(state)) {
            var n2 = state.lastIntValue;
            if (n1 <= 3 && this.regexp_eatOctalDigit(state)) {
              state.lastIntValue = n1 * 64 + n2 * 8 + state.lastIntValue;
            } else {
              state.lastIntValue = n1 * 8 + n2;
            }
          } else {
            state.lastIntValue = n1;
          }
          return true;
        }
        return false;
      };
      pp$1.regexp_eatOctalDigit = function(state) {
        var ch = state.current();
        if (isOctalDigit(ch)) {
          state.lastIntValue = ch - 48;
          state.advance();
          return true;
        }
        state.lastIntValue = 0;
        return false;
      };
      function isOctalDigit(ch) {
        return ch >= 48 && ch <= 55;
      }
      pp$1.regexp_eatFixedHexDigits = function(state, length) {
        var start = state.pos;
        state.lastIntValue = 0;
        for (var i2 = 0; i2 < length; ++i2) {
          var ch = state.current();
          if (!isHexDigit(ch)) {
            state.pos = start;
            return false;
          }
          state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch);
          state.advance();
        }
        return true;
      };
      var Token = function Token2(p) {
        this.type = p.type;
        this.value = p.value;
        this.start = p.start;
        this.end = p.end;
        if (p.options.locations) {
          this.loc = new SourceLocation(p, p.startLoc, p.endLoc);
        }
        if (p.options.ranges) {
          this.range = [p.start, p.end];
        }
      };
      var pp = Parser.prototype;
      pp.next = function(ignoreEscapeSequenceInKeyword) {
        if (!ignoreEscapeSequenceInKeyword && this.type.keyword && this.containsEsc) {
          this.raiseRecoverable(this.start, "Escape sequence in keyword " + this.type.keyword);
        }
        if (this.options.onToken) {
          this.options.onToken(new Token(this));
        }
        this.lastTokEnd = this.end;
        this.lastTokStart = this.start;
        this.lastTokEndLoc = this.endLoc;
        this.lastTokStartLoc = this.startLoc;
        this.nextToken();
      };
      pp.getToken = function() {
        this.next();
        return new Token(this);
      };
      if (typeof Symbol !== "undefined") {
        pp[Symbol.iterator] = function() {
          var this$1$1 = this;
          return {
            next: function() {
              var token = this$1$1.getToken();
              return {
                done: token.type === types$1.eof,
                value: token
              };
            }
          };
        };
      }
      pp.nextToken = function() {
        var curContext = this.curContext();
        if (!curContext || !curContext.preserveSpace) {
          this.skipSpace();
        }
        this.start = this.pos;
        if (this.options.locations) {
          this.startLoc = this.curPosition();
        }
        if (this.pos >= this.input.length) {
          return this.finishToken(types$1.eof);
        }
        if (curContext.override) {
          return curContext.override(this);
        } else {
          this.readToken(this.fullCharCodeAtPos());
        }
      };
      pp.readToken = function(code) {
        if (isIdentifierStart(code, this.options.ecmaVersion >= 6) || code === 92) {
          return this.readWord();
        }
        return this.getTokenFromCode(code);
      };
      pp.fullCharCodeAtPos = function() {
        var code = this.input.charCodeAt(this.pos);
        if (code <= 55295 || code >= 56320) {
          return code;
        }
        var next = this.input.charCodeAt(this.pos + 1);
        return next <= 56319 || next >= 57344 ? code : (code << 10) + next - 56613888;
      };
      pp.skipBlockComment = function() {
        var startLoc = this.options.onComment && this.curPosition();
        var start = this.pos, end = this.input.indexOf("*/", this.pos += 2);
        if (end === -1) {
          this.raise(this.pos - 2, "Unterminated comment");
        }
        this.pos = end + 2;
        if (this.options.locations) {
          for (var nextBreak = void 0, pos = start; (nextBreak = nextLineBreak(this.input, pos, this.pos)) > -1; ) {
            ++this.curLine;
            pos = this.lineStart = nextBreak;
          }
        }
        if (this.options.onComment) {
          this.options.onComment(true, this.input.slice(start + 2, end), start, this.pos, startLoc, this.curPosition());
        }
      };
      pp.skipLineComment = function(startSkip) {
        var start = this.pos;
        var startLoc = this.options.onComment && this.curPosition();
        var ch = this.input.charCodeAt(this.pos += startSkip);
        while (this.pos < this.input.length && !isNewLine(ch)) {
          ch = this.input.charCodeAt(++this.pos);
        }
        if (this.options.onComment) {
          this.options.onComment(false, this.input.slice(start + startSkip, this.pos), start, this.pos, startLoc, this.curPosition());
        }
      };
      pp.skipSpace = function() {
        loop:
          while (this.pos < this.input.length) {
            var ch = this.input.charCodeAt(this.pos);
            switch (ch) {
              case 32:
              case 160:
                ++this.pos;
                break;
              case 13:
                if (this.input.charCodeAt(this.pos + 1) === 10) {
                  ++this.pos;
                }
              case 10:
              case 8232:
              case 8233:
                ++this.pos;
                if (this.options.locations) {
                  ++this.curLine;
                  this.lineStart = this.pos;
                }
                break;
              case 47:
                switch (this.input.charCodeAt(this.pos + 1)) {
                  case 42:
                    this.skipBlockComment();
                    break;
                  case 47:
                    this.skipLineComment(2);
                    break;
                  default:
                    break loop;
                }
                break;
              default:
                if (ch > 8 && ch < 14 || ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch))) {
                  ++this.pos;
                } else {
                  break loop;
                }
            }
          }
      };
      pp.finishToken = function(type2, val) {
        this.end = this.pos;
        if (this.options.locations) {
          this.endLoc = this.curPosition();
        }
        var prevType = this.type;
        this.type = type2;
        this.value = val;
        this.updateContext(prevType);
      };
      pp.readToken_dot = function() {
        var next = this.input.charCodeAt(this.pos + 1);
        if (next >= 48 && next <= 57) {
          return this.readNumber(true);
        }
        var next2 = this.input.charCodeAt(this.pos + 2);
        if (this.options.ecmaVersion >= 6 && next === 46 && next2 === 46) {
          this.pos += 3;
          return this.finishToken(types$1.ellipsis);
        } else {
          ++this.pos;
          return this.finishToken(types$1.dot);
        }
      };
      pp.readToken_slash = function() {
        var next = this.input.charCodeAt(this.pos + 1);
        if (this.exprAllowed) {
          ++this.pos;
          return this.readRegexp();
        }
        if (next === 61) {
          return this.finishOp(types$1.assign, 2);
        }
        return this.finishOp(types$1.slash, 1);
      };
      pp.readToken_mult_modulo_exp = function(code) {
        var next = this.input.charCodeAt(this.pos + 1);
        var size = 1;
        var tokentype = code === 42 ? types$1.star : types$1.modulo;
        if (this.options.ecmaVersion >= 7 && code === 42 && next === 42) {
          ++size;
          tokentype = types$1.starstar;
          next = this.input.charCodeAt(this.pos + 2);
        }
        if (next === 61) {
          return this.finishOp(types$1.assign, size + 1);
        }
        return this.finishOp(tokentype, size);
      };
      pp.readToken_pipe_amp = function(code) {
        var next = this.input.charCodeAt(this.pos + 1);
        if (next === code) {
          if (this.options.ecmaVersion >= 12) {
            var next2 = this.input.charCodeAt(this.pos + 2);
            if (next2 === 61) {
              return this.finishOp(types$1.assign, 3);
            }
          }
          return this.finishOp(code === 124 ? types$1.logicalOR : types$1.logicalAND, 2);
        }
        if (next === 61) {
          return this.finishOp(types$1.assign, 2);
        }
        return this.finishOp(code === 124 ? types$1.bitwiseOR : types$1.bitwiseAND, 1);
      };
      pp.readToken_caret = function() {
        var next = this.input.charCodeAt(this.pos + 1);
        if (next === 61) {
          return this.finishOp(types$1.assign, 2);
        }
        return this.finishOp(types$1.bitwiseXOR, 1);
      };
      pp.readToken_plus_min = function(code) {
        var next = this.input.charCodeAt(this.pos + 1);
        if (next === code) {
          if (next === 45 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 62 && (this.lastTokEnd === 0 || lineBreak.test(this.input.slice(this.lastTokEnd, this.pos)))) {
            this.skipLineComment(3);
            this.skipSpace();
            return this.nextToken();
          }
          return this.finishOp(types$1.incDec, 2);
        }
        if (next === 61) {
          return this.finishOp(types$1.assign, 2);
        }
        return this.finishOp(types$1.plusMin, 1);
      };
      pp.readToken_lt_gt = function(code) {
        var next = this.input.charCodeAt(this.pos + 1);
        var size = 1;
        if (next === code) {
          size = code === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2;
          if (this.input.charCodeAt(this.pos + size) === 61) {
            return this.finishOp(types$1.assign, size + 1);
          }
          return this.finishOp(types$1.bitShift, size);
        }
        if (next === 33 && code === 60 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 45 && this.input.charCodeAt(this.pos + 3) === 45) {
          this.skipLineComment(4);
          this.skipSpace();
          return this.nextToken();
        }
        if (next === 61) {
          size = 2;
        }
        return this.finishOp(types$1.relational, size);
      };
      pp.readToken_eq_excl = function(code) {
        var next = this.input.charCodeAt(this.pos + 1);
        if (next === 61) {
          return this.finishOp(types$1.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2);
        }
        if (code === 61 && next === 62 && this.options.ecmaVersion >= 6) {
          this.pos += 2;
          return this.finishToken(types$1.arrow);
        }
        return this.finishOp(code === 61 ? types$1.eq : types$1.prefix, 1);
      };
      pp.readToken_question = function() {
        var ecmaVersion2 = this.options.ecmaVersion;
        if (ecmaVersion2 >= 11) {
          var next = this.input.charCodeAt(this.pos + 1);
          if (next === 46) {
            var next2 = this.input.charCodeAt(this.pos + 2);
            if (next2 < 48 || next2 > 57) {
              return this.finishOp(types$1.questionDot, 2);
            }
          }
          if (next === 63) {
            if (ecmaVersion2 >= 12) {
              var next2$1 = this.input.charCodeAt(this.pos + 2);
              if (next2$1 === 61) {
                return this.finishOp(types$1.assign, 3);
              }
            }
            return this.finishOp(types$1.coalesce, 2);
          }
        }
        return this.finishOp(types$1.question, 1);
      };
      pp.readToken_numberSign = function() {
        var ecmaVersion2 = this.options.ecmaVersion;
        var code = 35;
        if (ecmaVersion2 >= 13) {
          ++this.pos;
          code = this.fullCharCodeAtPos();
          if (isIdentifierStart(code, true) || code === 92) {
            return this.finishToken(types$1.privateId, this.readWord1());
          }
        }
        this.raise(this.pos, "Unexpected character '" + codePointToString(code) + "'");
      };
      pp.getTokenFromCode = function(code) {
        switch (code) {
          case 46:
            return this.readToken_dot();
          case 40:
            ++this.pos;
            return this.finishToken(types$1.parenL);
          case 41:
            ++this.pos;
            return this.finishToken(types$1.parenR);
          case 59:
            ++this.pos;
            return this.finishToken(types$1.semi);
          case 44:
            ++this.pos;
            return this.finishToken(types$1.comma);
          case 91:
            ++this.pos;
            return this.finishToken(types$1.bracketL);
          case 93:
            ++this.pos;
            return this.finishToken(types$1.bracketR);
          case 123:
            ++this.pos;
            return this.finishToken(types$1.braceL);
          case 125:
            ++this.pos;
            return this.finishToken(types$1.braceR);
          case 58:
            ++this.pos;
            return this.finishToken(types$1.colon);
          case 96:
            if (this.options.ecmaVersion < 6) {
              break;
            }
            ++this.pos;
            return this.finishToken(types$1.backQuote);
          case 48:
            var next = this.input.charCodeAt(this.pos + 1);
            if (next === 120 || next === 88) {
              return this.readRadixNumber(16);
            }
            if (this.options.ecmaVersion >= 6) {
              if (next === 111 || next === 79) {
                return this.readRadixNumber(8);
              }
              if (next === 98 || next === 66) {
                return this.readRadixNumber(2);
              }
            }
          case 49:
          case 50:
          case 51:
          case 52:
          case 53:
          case 54:
          case 55:
          case 56:
          case 57:
            return this.readNumber(false);
          case 34:
          case 39:
            return this.readString(code);
          case 47:
            return this.readToken_slash();
          case 37:
          case 42:
            return this.readToken_mult_modulo_exp(code);
          case 124:
          case 38:
            return this.readToken_pipe_amp(code);
          case 94:
            return this.readToken_caret();
          case 43:
          case 45:
            return this.readToken_plus_min(code);
          case 60:
          case 62:
            return this.readToken_lt_gt(code);
          case 61:
          case 33:
            return this.readToken_eq_excl(code);
          case 63:
            return this.readToken_question();
          case 126:
            return this.finishOp(types$1.prefix, 1);
          case 35:
            return this.readToken_numberSign();
        }
        this.raise(this.pos, "Unexpected character '" + codePointToString(code) + "'");
      };
      pp.finishOp = function(type2, size) {
        var str = this.input.slice(this.pos, this.pos + size);
        this.pos += size;
        return this.finishToken(type2, str);
      };
      pp.readRegexp = function() {
        var escaped, inClass, start = this.pos;
        for (; ; ) {
          if (this.pos >= this.input.length) {
            this.raise(start, "Unterminated regular expression");
          }
          var ch = this.input.charAt(this.pos);
          if (lineBreak.test(ch)) {
            this.raise(start, "Unterminated regular expression");
          }
          if (!escaped) {
            if (ch === "[") {
              inClass = true;
            } else if (ch === "]" && inClass) {
              inClass = false;
            } else if (ch === "/" && !inClass) {
              break;
            }
            escaped = ch === "\\";
          } else {
            escaped = false;
          }
          ++this.pos;
        }
        var pattern = this.input.slice(start, this.pos);
        ++this.pos;
        var flagsStart = this.pos;
        var flags = this.readWord1();
        if (this.containsEsc) {
          this.unexpected(flagsStart);
        }
        var state = this.regexpState || (this.regexpState = new RegExpValidationState(this));
        state.reset(start, pattern, flags);
        this.validateRegExpFlags(state);
        this.validateRegExpPattern(state);
        var value = null;
        try {
          value = new RegExp(pattern, flags);
        } catch (e) {
        }
        return this.finishToken(types$1.regexp, {
          pattern,
          flags,
          value
        });
      };
      pp.readInt = function(radix, len, maybeLegacyOctalNumericLiteral) {
        var allowSeparators = this.options.ecmaVersion >= 12 && len === void 0;
        var isLegacyOctalNumericLiteral = maybeLegacyOctalNumericLiteral && this.input.charCodeAt(this.pos) === 48;
        var start = this.pos, total = 0, lastCode = 0;
        for (var i2 = 0, e = len == null ? Infinity : len; i2 < e; ++i2, ++this.pos) {
          var code = this.input.charCodeAt(this.pos), val = void 0;
          if (allowSeparators && code === 95) {
            if (isLegacyOctalNumericLiteral) {
              this.raiseRecoverable(this.pos, "Numeric separator is not allowed in legacy octal numeric literals");
            }
            if (lastCode === 95) {
              this.raiseRecoverable(this.pos, "Numeric separator must be exactly one underscore");
            }
            if (i2 === 0) {
              this.raiseRecoverable(this.pos, "Numeric separator is not allowed at the first of digits");
            }
            lastCode = code;
            continue;
          }
          if (code >= 97) {
            val = code - 97 + 10;
          } else if (code >= 65) {
            val = code - 65 + 10;
          } else if (code >= 48 && code <= 57) {
            val = code - 48;
          } else {
            val = Infinity;
          }
          if (val >= radix) {
            break;
          }
          lastCode = code;
          total = total * radix + val;
        }
        if (allowSeparators && lastCode === 95) {
          this.raiseRecoverable(this.pos - 1, "Numeric separator is not allowed at the last of digits");
        }
        if (this.pos === start || len != null && this.pos - start !== len) {
          return null;
        }
        return total;
      };
      function stringToNumber(str, isLegacyOctalNumericLiteral) {
        if (isLegacyOctalNumericLiteral) {
          return parseInt(str, 8);
        }
        return parseFloat(str.replace(/_/g, ""));
      }
      function stringToBigInt(str) {
        if (typeof BigInt !== "function") {
          return null;
        }
        return BigInt(str.replace(/_/g, ""));
      }
      pp.readRadixNumber = function(radix) {
        var start = this.pos;
        this.pos += 2;
        var val = this.readInt(radix);
        if (val == null) {
          this.raise(this.start + 2, "Expected number in radix " + radix);
        }
        if (this.options.ecmaVersion >= 11 && this.input.charCodeAt(this.pos) === 110) {
          val = stringToBigInt(this.input.slice(start, this.pos));
          ++this.pos;
        } else if (isIdentifierStart(this.fullCharCodeAtPos())) {
          this.raise(this.pos, "Identifier directly after number");
        }
        return this.finishToken(types$1.num, val);
      };
      pp.readNumber = function(startsWithDot) {
        var start = this.pos;
        if (!startsWithDot && this.readInt(10, void 0, true) === null) {
          this.raise(start, "Invalid number");
        }
        var octal = this.pos - start >= 2 && this.input.charCodeAt(start) === 48;
        if (octal && this.strict) {
          this.raise(start, "Invalid number");
        }
        var next = this.input.charCodeAt(this.pos);
        if (!octal && !startsWithDot && this.options.ecmaVersion >= 11 && next === 110) {
          var val$1 = stringToBigInt(this.input.slice(start, this.pos));
          ++this.pos;
          if (isIdentifierStart(this.fullCharCodeAtPos())) {
            this.raise(this.pos, "Identifier directly after number");
          }
          return this.finishToken(types$1.num, val$1);
        }
        if (octal && /[89]/.test(this.input.slice(start, this.pos))) {
          octal = false;
        }
        if (next === 46 && !octal) {
          ++this.pos;
          this.readInt(10);
          next = this.input.charCodeAt(this.pos);
        }
        if ((next === 69 || next === 101) && !octal) {
          next = this.input.charCodeAt(++this.pos);
          if (next === 43 || next === 45) {
            ++this.pos;
          }
          if (this.readInt(10) === null) {
            this.raise(start, "Invalid number");
          }
        }
        if (isIdentifierStart(this.fullCharCodeAtPos())) {
          this.raise(this.pos, "Identifier directly after number");
        }
        var val = stringToNumber(this.input.slice(start, this.pos), octal);
        return this.finishToken(types$1.num, val);
      };
      pp.readCodePoint = function() {
        var ch = this.input.charCodeAt(this.pos), code;
        if (ch === 123) {
          if (this.options.ecmaVersion < 6) {
            this.unexpected();
          }
          var codePos = ++this.pos;
          code = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos);
          ++this.pos;
          if (code > 1114111) {
            this.invalidStringToken(codePos, "Code point out of bounds");
          }
        } else {
          code = this.readHexChar(4);
        }
        return code;
      };
      pp.readString = function(quote) {
        var out = "", chunkStart = ++this.pos;
        for (; ; ) {
          if (this.pos >= this.input.length) {
            this.raise(this.start, "Unterminated string constant");
          }
          var ch = this.input.charCodeAt(this.pos);
          if (ch === quote) {
            break;
          }
          if (ch === 92) {
            out += this.input.slice(chunkStart, this.pos);
            out += this.readEscapedChar(false);
            chunkStart = this.pos;
          } else if (ch === 8232 || ch === 8233) {
            if (this.options.ecmaVersion < 10) {
              this.raise(this.start, "Unterminated string constant");
            }
            ++this.pos;
            if (this.options.locations) {
              this.curLine++;
              this.lineStart = this.pos;
            }
          } else {
            if (isNewLine(ch)) {
              this.raise(this.start, "Unterminated string constant");
            }
            ++this.pos;
          }
        }
        out += this.input.slice(chunkStart, this.pos++);
        return this.finishToken(types$1.string, out);
      };
      var INVALID_TEMPLATE_ESCAPE_ERROR = {};
      pp.tryReadTemplateToken = function() {
        this.inTemplateElement = true;
        try {
          this.readTmplToken();
        } catch (err) {
          if (err === INVALID_TEMPLATE_ESCAPE_ERROR) {
            this.readInvalidTemplateToken();
          } else {
            throw err;
          }
        }
        this.inTemplateElement = false;
      };
      pp.invalidStringToken = function(position, message) {
        if (this.inTemplateElement && this.options.ecmaVersion >= 9) {
          throw INVALID_TEMPLATE_ESCAPE_ERROR;
        } else {
          this.raise(position, message);
        }
      };
      pp.readTmplToken = function() {
        var out = "", chunkStart = this.pos;
        for (; ; ) {
          if (this.pos >= this.input.length) {
            this.raise(this.start, "Unterminated template");
          }
          var ch = this.input.charCodeAt(this.pos);
          if (ch === 96 || ch === 36 && this.input.charCodeAt(this.pos + 1) === 123) {
            if (this.pos === this.start && (this.type === types$1.template || this.type === types$1.invalidTemplate)) {
              if (ch === 36) {
                this.pos += 2;
                return this.finishToken(types$1.dollarBraceL);
              } else {
                ++this.pos;
                return this.finishToken(types$1.backQuote);
              }
            }
            out += this.input.slice(chunkStart, this.pos);
            return this.finishToken(types$1.template, out);
          }
          if (ch === 92) {
            out += this.input.slice(chunkStart, this.pos);
            out += this.readEscapedChar(true);
            chunkStart = this.pos;
          } else if (isNewLine(ch)) {
            out += this.input.slice(chunkStart, this.pos);
            ++this.pos;
            switch (ch) {
              case 13:
                if (this.input.charCodeAt(this.pos) === 10) {
                  ++this.pos;
                }
              case 10:
                out += "\n";
                break;
              default:
                out += String.fromCharCode(ch);
                break;
            }
            if (this.options.locations) {
              ++this.curLine;
              this.lineStart = this.pos;
            }
            chunkStart = this.pos;
          } else {
            ++this.pos;
          }
        }
      };
      pp.readInvalidTemplateToken = function() {
        for (; this.pos < this.input.length; this.pos++) {
          switch (this.input[this.pos]) {
            case "\\":
              ++this.pos;
              break;
            case "$":
              if (this.input[this.pos + 1] !== "{") {
                break;
              }
            case "`":
              return this.finishToken(types$1.invalidTemplate, this.input.slice(this.start, this.pos));
          }
        }
        this.raise(this.start, "Unterminated template");
      };
      pp.readEscapedChar = function(inTemplate) {
        var ch = this.input.charCodeAt(++this.pos);
        ++this.pos;
        switch (ch) {
          case 110:
            return "\n";
          case 114:
            return "\r";
          case 120:
            return String.fromCharCode(this.readHexChar(2));
          case 117:
            return codePointToString(this.readCodePoint());
          case 116:
            return "	";
          case 98:
            return "\b";
          case 118:
            return "\v";
          case 102:
            return "\f";
          case 13:
            if (this.input.charCodeAt(this.pos) === 10) {
              ++this.pos;
            }
          case 10:
            if (this.options.locations) {
              this.lineStart = this.pos;
              ++this.curLine;
            }
            return "";
          case 56:
          case 57:
            if (this.strict) {
              this.invalidStringToken(this.pos - 1, "Invalid escape sequence");
            }
            if (inTemplate) {
              var codePos = this.pos - 1;
              this.invalidStringToken(codePos, "Invalid escape sequence in template string");
              return null;
            }
          default:
            if (ch >= 48 && ch <= 55) {
              var octalStr = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0];
              var octal = parseInt(octalStr, 8);
              if (octal > 255) {
                octalStr = octalStr.slice(0, -1);
                octal = parseInt(octalStr, 8);
              }
              this.pos += octalStr.length - 1;
              ch = this.input.charCodeAt(this.pos);
              if ((octalStr !== "0" || ch === 56 || ch === 57) && (this.strict || inTemplate)) {
                this.invalidStringToken(this.pos - 1 - octalStr.length, inTemplate ? "Octal literal in template string" : "Octal literal in strict mode");
              }
              return String.fromCharCode(octal);
            }
            if (isNewLine(ch)) {
              return "";
            }
            return String.fromCharCode(ch);
        }
      };
      pp.readHexChar = function(len) {
        var codePos = this.pos;
        var n = this.readInt(16, len);
        if (n === null) {
          this.invalidStringToken(codePos, "Bad character escape sequence");
        }
        return n;
      };
      pp.readWord1 = function() {
        this.containsEsc = false;
        var word = "", first = true, chunkStart = this.pos;
        var astral = this.options.ecmaVersion >= 6;
        while (this.pos < this.input.length) {
          var ch = this.fullCharCodeAtPos();
          if (isIdentifierChar(ch, astral)) {
            this.pos += ch <= 65535 ? 1 : 2;
          } else if (ch === 92) {
            this.containsEsc = true;
            word += this.input.slice(chunkStart, this.pos);
            var escStart = this.pos;
            if (this.input.charCodeAt(++this.pos) !== 117) {
              this.invalidStringToken(this.pos, "Expecting Unicode escape sequence \\uXXXX");
            }
            ++this.pos;
            var esc = this.readCodePoint();
            if (!(first ? isIdentifierStart : isIdentifierChar)(esc, astral)) {
              this.invalidStringToken(escStart, "Invalid Unicode escape");
            }
            word += codePointToString(esc);
            chunkStart = this.pos;
          } else {
            break;
          }
          first = false;
        }
        return word + this.input.slice(chunkStart, this.pos);
      };
      pp.readWord = function() {
        var word = this.readWord1();
        var type2 = types$1.name;
        if (this.keywords.test(word)) {
          type2 = keywords[word];
        }
        return this.finishToken(type2, word);
      };
      var version = "8.8.1";
      Parser.acorn = {
        Parser,
        version,
        defaultOptions,
        Position,
        SourceLocation,
        getLineInfo,
        Node,
        TokenType,
        tokTypes: types$1,
        keywordTypes: keywords,
        TokContext,
        tokContexts: types,
        isIdentifierChar,
        isIdentifierStart,
        Token,
        isNewLine,
        lineBreak,
        lineBreakG,
        nonASCIIwhitespace
      };
      function parse(input, options) {
        return Parser.parse(input, options);
      }
      function parseExpressionAt(input, pos, options) {
        return Parser.parseExpressionAt(input, pos, options);
      }
      function tokenizer(input, options) {
        return Parser.tokenizer(input, options);
      }
      exports2.Node = Node;
      exports2.Parser = Parser;
      exports2.Position = Position;
      exports2.SourceLocation = SourceLocation;
      exports2.TokContext = TokContext;
      exports2.Token = Token;
      exports2.TokenType = TokenType;
      exports2.defaultOptions = defaultOptions;
      exports2.getLineInfo = getLineInfo;
      exports2.isIdentifierChar = isIdentifierChar;
      exports2.isIdentifierStart = isIdentifierStart;
      exports2.isNewLine = isNewLine;
      exports2.keywordTypes = keywords;
      exports2.lineBreak = lineBreak;
      exports2.lineBreakG = lineBreakG;
      exports2.nonASCIIwhitespace = nonASCIIwhitespace;
      exports2.parse = parse;
      exports2.parseExpressionAt = parseExpressionAt;
      exports2.tokContexts = types;
      exports2.tokTypes = types$1;
      exports2.tokenizer = tokenizer;
      exports2.version = version;
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
    });
  }
});
var require_xhtml = __commonJS2({
  "node_modules/acorn-jsx/xhtml.js"(exports, module) {
    init_define_process();
    module.exports = {
      quot: '"',
      amp: "&",
      apos: "'",
      lt: "<",
      gt: ">",
      nbsp: "\xA0",
      iexcl: "\xA1",
      cent: "\xA2",
      pound: "\xA3",
      curren: "\xA4",
      yen: "\xA5",
      brvbar: "\xA6",
      sect: "\xA7",
      uml: "\xA8",
      copy: "\xA9",
      ordf: "\xAA",
      laquo: "\xAB",
      not: "\xAC",
      shy: "\xAD",
      reg: "\xAE",
      macr: "\xAF",
      deg: "\xB0",
      plusmn: "\xB1",
      sup2: "\xB2",
      sup3: "\xB3",
      acute: "\xB4",
      micro: "\xB5",
      para: "\xB6",
      middot: "\xB7",
      cedil: "\xB8",
      sup1: "\xB9",
      ordm: "\xBA",
      raquo: "\xBB",
      frac14: "\xBC",
      frac12: "\xBD",
      frac34: "\xBE",
      iquest: "\xBF",
      Agrave: "\xC0",
      Aacute: "\xC1",
      Acirc: "\xC2",
      Atilde: "\xC3",
      Auml: "\xC4",
      Aring: "\xC5",
      AElig: "\xC6",
      Ccedil: "\xC7",
      Egrave: "\xC8",
      Eacute: "\xC9",
      Ecirc: "\xCA",
      Euml: "\xCB",
      Igrave: "\xCC",
      Iacute: "\xCD",
      Icirc: "\xCE",
      Iuml: "\xCF",
      ETH: "\xD0",
      Ntilde: "\xD1",
      Ograve: "\xD2",
      Oacute: "\xD3",
      Ocirc: "\xD4",
      Otilde: "\xD5",
      Ouml: "\xD6",
      times: "\xD7",
      Oslash: "\xD8",
      Ugrave: "\xD9",
      Uacute: "\xDA",
      Ucirc: "\xDB",
      Uuml: "\xDC",
      Yacute: "\xDD",
      THORN: "\xDE",
      szlig: "\xDF",
      agrave: "\xE0",
      aacute: "\xE1",
      acirc: "\xE2",
      atilde: "\xE3",
      auml: "\xE4",
      aring: "\xE5",
      aelig: "\xE6",
      ccedil: "\xE7",
      egrave: "\xE8",
      eacute: "\xE9",
      ecirc: "\xEA",
      euml: "\xEB",
      igrave: "\xEC",
      iacute: "\xED",
      icirc: "\xEE",
      iuml: "\xEF",
      eth: "\xF0",
      ntilde: "\xF1",
      ograve: "\xF2",
      oacute: "\xF3",
      ocirc: "\xF4",
      otilde: "\xF5",
      ouml: "\xF6",
      divide: "\xF7",
      oslash: "\xF8",
      ugrave: "\xF9",
      uacute: "\xFA",
      ucirc: "\xFB",
      uuml: "\xFC",
      yacute: "\xFD",
      thorn: "\xFE",
      yuml: "\xFF",
      OElig: "\u0152",
      oelig: "\u0153",
      Scaron: "\u0160",
      scaron: "\u0161",
      Yuml: "\u0178",
      fnof: "\u0192",
      circ: "\u02C6",
      tilde: "\u02DC",
      Alpha: "\u0391",
      Beta: "\u0392",
      Gamma: "\u0393",
      Delta: "\u0394",
      Epsilon: "\u0395",
      Zeta: "\u0396",
      Eta: "\u0397",
      Theta: "\u0398",
      Iota: "\u0399",
      Kappa: "\u039A",
      Lambda: "\u039B",
      Mu: "\u039C",
      Nu: "\u039D",
      Xi: "\u039E",
      Omicron: "\u039F",
      Pi: "\u03A0",
      Rho: "\u03A1",
      Sigma: "\u03A3",
      Tau: "\u03A4",
      Upsilon: "\u03A5",
      Phi: "\u03A6",
      Chi: "\u03A7",
      Psi: "\u03A8",
      Omega: "\u03A9",
      alpha: "\u03B1",
      beta: "\u03B2",
      gamma: "\u03B3",
      delta: "\u03B4",
      epsilon: "\u03B5",
      zeta: "\u03B6",
      eta: "\u03B7",
      theta: "\u03B8",
      iota: "\u03B9",
      kappa: "\u03BA",
      lambda: "\u03BB",
      mu: "\u03BC",
      nu: "\u03BD",
      xi: "\u03BE",
      omicron: "\u03BF",
      pi: "\u03C0",
      rho: "\u03C1",
      sigmaf: "\u03C2",
      sigma: "\u03C3",
      tau: "\u03C4",
      upsilon: "\u03C5",
      phi: "\u03C6",
      chi: "\u03C7",
      psi: "\u03C8",
      omega: "\u03C9",
      thetasym: "\u03D1",
      upsih: "\u03D2",
      piv: "\u03D6",
      ensp: "\u2002",
      emsp: "\u2003",
      thinsp: "\u2009",
      zwnj: "\u200C",
      zwj: "\u200D",
      lrm: "\u200E",
      rlm: "\u200F",
      ndash: "\u2013",
      mdash: "\u2014",
      lsquo: "\u2018",
      rsquo: "\u2019",
      sbquo: "\u201A",
      ldquo: "\u201C",
      rdquo: "\u201D",
      bdquo: "\u201E",
      dagger: "\u2020",
      Dagger: "\u2021",
      bull: "\u2022",
      hellip: "\u2026",
      permil: "\u2030",
      prime: "\u2032",
      Prime: "\u2033",
      lsaquo: "\u2039",
      rsaquo: "\u203A",
      oline: "\u203E",
      frasl: "\u2044",
      euro: "\u20AC",
      image: "\u2111",
      weierp: "\u2118",
      real: "\u211C",
      trade: "\u2122",
      alefsym: "\u2135",
      larr: "\u2190",
      uarr: "\u2191",
      rarr: "\u2192",
      darr: "\u2193",
      harr: "\u2194",
      crarr: "\u21B5",
      lArr: "\u21D0",
      uArr: "\u21D1",
      rArr: "\u21D2",
      dArr: "\u21D3",
      hArr: "\u21D4",
      forall: "\u2200",
      part: "\u2202",
      exist: "\u2203",
      empty: "\u2205",
      nabla: "\u2207",
      isin: "\u2208",
      notin: "\u2209",
      ni: "\u220B",
      prod: "\u220F",
      sum: "\u2211",
      minus: "\u2212",
      lowast: "\u2217",
      radic: "\u221A",
      prop: "\u221D",
      infin: "\u221E",
      ang: "\u2220",
      and: "\u2227",
      or: "\u2228",
      cap: "\u2229",
      cup: "\u222A",
      "int": "\u222B",
      there4: "\u2234",
      sim: "\u223C",
      cong: "\u2245",
      asymp: "\u2248",
      ne: "\u2260",
      equiv: "\u2261",
      le: "\u2264",
      ge: "\u2265",
      sub: "\u2282",
      sup: "\u2283",
      nsub: "\u2284",
      sube: "\u2286",
      supe: "\u2287",
      oplus: "\u2295",
      otimes: "\u2297",
      perp: "\u22A5",
      sdot: "\u22C5",
      lceil: "\u2308",
      rceil: "\u2309",
      lfloor: "\u230A",
      rfloor: "\u230B",
      lang: "\u2329",
      rang: "\u232A",
      loz: "\u25CA",
      spades: "\u2660",
      clubs: "\u2663",
      hearts: "\u2665",
      diams: "\u2666"
    };
  }
});
var require_acorn_jsx = __commonJS2({
  "node_modules/acorn-jsx/index.js"(exports, module) {
    "use strict";
    init_define_process();
    var XHTMLEntities = require_xhtml();
    var hexNumber = /^[\da-fA-F]+$/;
    var decimalNumber = /^\d+$/;
    var acornJsxMap = /* @__PURE__ */ new WeakMap();
    function getJsxTokens(acorn) {
      acorn = acorn.Parser.acorn || acorn;
      let acornJsx = acornJsxMap.get(acorn);
      if (!acornJsx) {
        const tt = acorn.tokTypes;
        const TokContext = acorn.TokContext;
        const TokenType = acorn.TokenType;
        const tc_oTag = new TokContext("<tag", false);
        const tc_cTag = new TokContext("</tag", false);
        const tc_expr = new TokContext("<tag>...</tag>", true, true);
        const tokContexts = {
          tc_oTag,
          tc_cTag,
          tc_expr
        };
        const tokTypes = {
          jsxName: new TokenType("jsxName"),
          jsxText: new TokenType("jsxText", {
            beforeExpr: true
          }),
          jsxTagStart: new TokenType("jsxTagStart", {
            startsExpr: true
          }),
          jsxTagEnd: new TokenType("jsxTagEnd")
        };
        tokTypes.jsxTagStart.updateContext = function() {
          this.context.push(tc_expr);
          this.context.push(tc_oTag);
          this.exprAllowed = false;
        };
        tokTypes.jsxTagEnd.updateContext = function(prevType) {
          let out = this.context.pop();
          if (out === tc_oTag && prevType === tt.slash || out === tc_cTag) {
            this.context.pop();
            this.exprAllowed = this.curContext() === tc_expr;
          } else {
            this.exprAllowed = true;
          }
        };
        acornJsx = {
          tokContexts,
          tokTypes
        };
        acornJsxMap.set(acorn, acornJsx);
      }
      return acornJsx;
    }
    function getQualifiedJSXName(object) {
      if (!object)
        return object;
      if (object.type === "JSXIdentifier")
        return object.name;
      if (object.type === "JSXNamespacedName")
        return object.namespace.name + ":" + object.name.name;
      if (object.type === "JSXMemberExpression")
        return getQualifiedJSXName(object.object) + "." + getQualifiedJSXName(object.property);
    }
    module.exports = function(options) {
      options = options || {};
      return function(Parser) {
        return plugin({
          allowNamespaces: options.allowNamespaces !== false,
          allowNamespacedObjects: !!options.allowNamespacedObjects
        }, Parser);
      };
    };
    Object.defineProperty(module.exports, "tokTypes", {
      get: function get_tokTypes() {
        return getJsxTokens(require_acorn()).tokTypes;
      },
      configurable: true,
      enumerable: true
    });
    function plugin(options, Parser) {
      const acorn = Parser.acorn || require_acorn();
      const acornJsx = getJsxTokens(acorn);
      const tt = acorn.tokTypes;
      const tok = acornJsx.tokTypes;
      const tokContexts = acorn.tokContexts;
      const tc_oTag = acornJsx.tokContexts.tc_oTag;
      const tc_cTag = acornJsx.tokContexts.tc_cTag;
      const tc_expr = acornJsx.tokContexts.tc_expr;
      const isNewLine = acorn.isNewLine;
      const isIdentifierStart = acorn.isIdentifierStart;
      const isIdentifierChar = acorn.isIdentifierChar;
      return class extends Parser {
        static get acornJsx() {
          return acornJsx;
        }
        jsx_readToken() {
          let out = "", chunkStart = this.pos;
          for (; ; ) {
            if (this.pos >= this.input.length)
              this.raise(this.start, "Unterminated JSX contents");
            let ch = this.input.charCodeAt(this.pos);
            switch (ch) {
              case 60:
              case 123:
                if (this.pos === this.start) {
                  if (ch === 60 && this.exprAllowed) {
                    ++this.pos;
                    return this.finishToken(tok.jsxTagStart);
                  }
                  return this.getTokenFromCode(ch);
                }
                out += this.input.slice(chunkStart, this.pos);
                return this.finishToken(tok.jsxText, out);
              case 38:
                out += this.input.slice(chunkStart, this.pos);
                out += this.jsx_readEntity();
                chunkStart = this.pos;
                break;
              case 62:
              case 125:
                this.raise(this.pos, "Unexpected token `" + this.input[this.pos] + "`. Did you mean `" + (ch === 62 ? "&gt;" : "&rbrace;") + '` or `{"' + this.input[this.pos] + '"}`?');
              default:
                if (isNewLine(ch)) {
                  out += this.input.slice(chunkStart, this.pos);
                  out += this.jsx_readNewLine(true);
                  chunkStart = this.pos;
                } else {
                  ++this.pos;
                }
            }
          }
        }
        jsx_readNewLine(normalizeCRLF) {
          let ch = this.input.charCodeAt(this.pos);
          let out;
          ++this.pos;
          if (ch === 13 && this.input.charCodeAt(this.pos) === 10) {
            ++this.pos;
            out = normalizeCRLF ? "\n" : "\r\n";
          } else {
            out = String.fromCharCode(ch);
          }
          if (this.options.locations) {
            ++this.curLine;
            this.lineStart = this.pos;
          }
          return out;
        }
        jsx_readString(quote) {
          let out = "", chunkStart = ++this.pos;
          for (; ; ) {
            if (this.pos >= this.input.length)
              this.raise(this.start, "Unterminated string constant");
            let ch = this.input.charCodeAt(this.pos);
            if (ch === quote)
              break;
            if (ch === 38) {
              out += this.input.slice(chunkStart, this.pos);
              out += this.jsx_readEntity();
              chunkStart = this.pos;
            } else if (isNewLine(ch)) {
              out += this.input.slice(chunkStart, this.pos);
              out += this.jsx_readNewLine(false);
              chunkStart = this.pos;
            } else {
              ++this.pos;
            }
          }
          out += this.input.slice(chunkStart, this.pos++);
          return this.finishToken(tt.string, out);
        }
        jsx_readEntity() {
          let str = "", count = 0, entity;
          let ch = this.input[this.pos];
          if (ch !== "&")
            this.raise(this.pos, "Entity must start with an ampersand");
          let startPos = ++this.pos;
          while (this.pos < this.input.length && count++ < 10) {
            ch = this.input[this.pos++];
            if (ch === ";") {
              if (str[0] === "#") {
                if (str[1] === "x") {
                  str = str.substr(2);
                  if (hexNumber.test(str))
                    entity = String.fromCharCode(parseInt(str, 16));
                } else {
                  str = str.substr(1);
                  if (decimalNumber.test(str))
                    entity = String.fromCharCode(parseInt(str, 10));
                }
              } else {
                entity = XHTMLEntities[str];
              }
              break;
            }
            str += ch;
          }
          if (!entity) {
            this.pos = startPos;
            return "&";
          }
          return entity;
        }
        jsx_readWord() {
          let ch, start = this.pos;
          do {
            ch = this.input.charCodeAt(++this.pos);
          } while (isIdentifierChar(ch) || ch === 45);
          return this.finishToken(tok.jsxName, this.input.slice(start, this.pos));
        }
        jsx_parseIdentifier() {
          let node = this.startNode();
          if (this.type === tok.jsxName)
            node.name = this.value;
          else if (this.type.keyword)
            node.name = this.type.keyword;
          else
            this.unexpected();
          this.next();
          return this.finishNode(node, "JSXIdentifier");
        }
        jsx_parseNamespacedName() {
          let startPos = this.start, startLoc = this.startLoc;
          let name = this.jsx_parseIdentifier();
          if (!options.allowNamespaces || !this.eat(tt.colon))
            return name;
          var node = this.startNodeAt(startPos, startLoc);
          node.namespace = name;
          node.name = this.jsx_parseIdentifier();
          return this.finishNode(node, "JSXNamespacedName");
        }
        jsx_parseElementName() {
          if (this.type === tok.jsxTagEnd)
            return "";
          let startPos = this.start, startLoc = this.startLoc;
          let node = this.jsx_parseNamespacedName();
          if (this.type === tt.dot && node.type === "JSXNamespacedName" && !options.allowNamespacedObjects) {
            this.unexpected();
          }
          while (this.eat(tt.dot)) {
            let newNode = this.startNodeAt(startPos, startLoc);
            newNode.object = node;
            newNode.property = this.jsx_parseIdentifier();
            node = this.finishNode(newNode, "JSXMemberExpression");
          }
          return node;
        }
        jsx_parseAttributeValue() {
          switch (this.type) {
            case tt.braceL:
              let node = this.jsx_parseExpressionContainer();
              if (node.expression.type === "JSXEmptyExpression")
                this.raise(node.start, "JSX attributes must only be assigned a non-empty expression");
              return node;
            case tok.jsxTagStart:
            case tt.string:
              return this.parseExprAtom();
            default:
              this.raise(this.start, "JSX value should be either an expression or a quoted JSX text");
          }
        }
        jsx_parseEmptyExpression() {
          let node = this.startNodeAt(this.lastTokEnd, this.lastTokEndLoc);
          return this.finishNodeAt(node, "JSXEmptyExpression", this.start, this.startLoc);
        }
        jsx_parseExpressionContainer() {
          let node = this.startNode();
          this.next();
          node.expression = this.type === tt.braceR ? this.jsx_parseEmptyExpression() : this.parseExpression();
          this.expect(tt.braceR);
          return this.finishNode(node, "JSXExpressionContainer");
        }
        jsx_parseAttribute() {
          let node = this.startNode();
          if (this.eat(tt.braceL)) {
            this.expect(tt.ellipsis);
            node.argument = this.parseMaybeAssign();
            this.expect(tt.braceR);
            return this.finishNode(node, "JSXSpreadAttribute");
          }
          node.name = this.jsx_parseNamespacedName();
          node.value = this.eat(tt.eq) ? this.jsx_parseAttributeValue() : null;
          return this.finishNode(node, "JSXAttribute");
        }
        jsx_parseOpeningElementAt(startPos, startLoc) {
          let node = this.startNodeAt(startPos, startLoc);
          node.attributes = [];
          let nodeName = this.jsx_parseElementName();
          if (nodeName)
            node.name = nodeName;
          while (this.type !== tt.slash && this.type !== tok.jsxTagEnd)
            node.attributes.push(this.jsx_parseAttribute());
          node.selfClosing = this.eat(tt.slash);
          this.expect(tok.jsxTagEnd);
          return this.finishNode(node, nodeName ? "JSXOpeningElement" : "JSXOpeningFragment");
        }
        jsx_parseClosingElementAt(startPos, startLoc) {
          let node = this.startNodeAt(startPos, startLoc);
          let nodeName = this.jsx_parseElementName();
          if (nodeName)
            node.name = nodeName;
          this.expect(tok.jsxTagEnd);
          return this.finishNode(node, nodeName ? "JSXClosingElement" : "JSXClosingFragment");
        }
        jsx_parseElementAt(startPos, startLoc) {
          let node = this.startNodeAt(startPos, startLoc);
          let children = [];
          let openingElement = this.jsx_parseOpeningElementAt(startPos, startLoc);
          let closingElement = null;
          if (!openingElement.selfClosing) {
            contents:
              for (; ; ) {
                switch (this.type) {
                  case tok.jsxTagStart:
                    startPos = this.start;
                    startLoc = this.startLoc;
                    this.next();
                    if (this.eat(tt.slash)) {
                      closingElement = this.jsx_parseClosingElementAt(startPos, startLoc);
                      break contents;
                    }
                    children.push(this.jsx_parseElementAt(startPos, startLoc));
                    break;
                  case tok.jsxText:
                    children.push(this.parseExprAtom());
                    break;
                  case tt.braceL:
                    children.push(this.jsx_parseExpressionContainer());
                    break;
                  default:
                    this.unexpected();
                }
              }
            if (getQualifiedJSXName(closingElement.name) !== getQualifiedJSXName(openingElement.name)) {
              this.raise(closingElement.start, "Expected corresponding JSX closing tag for <" + getQualifiedJSXName(openingElement.name) + ">");
            }
          }
          let fragmentOrElement = openingElement.name ? "Element" : "Fragment";
          node["opening" + fragmentOrElement] = openingElement;
          node["closing" + fragmentOrElement] = closingElement;
          node.children = children;
          if (this.type === tt.relational && this.value === "<") {
            this.raise(this.start, "Adjacent JSX elements must be wrapped in an enclosing tag");
          }
          return this.finishNode(node, "JSX" + fragmentOrElement);
        }
        jsx_parseText() {
          let node = this.parseLiteral(this.value);
          node.type = "JSXText";
          return node;
        }
        jsx_parseElement() {
          let startPos = this.start, startLoc = this.startLoc;
          this.next();
          return this.jsx_parseElementAt(startPos, startLoc);
        }
        parseExprAtom(refShortHandDefaultPos) {
          if (this.type === tok.jsxText)
            return this.jsx_parseText();
          else if (this.type === tok.jsxTagStart)
            return this.jsx_parseElement();
          else
            return super.parseExprAtom(refShortHandDefaultPos);
        }
        readToken(code) {
          let context = this.curContext();
          if (context === tc_expr)
            return this.jsx_readToken();
          if (context === tc_oTag || context === tc_cTag) {
            if (isIdentifierStart(code))
              return this.jsx_readWord();
            if (code == 62) {
              ++this.pos;
              return this.finishToken(tok.jsxTagEnd);
            }
            if ((code === 34 || code === 39) && context == tc_oTag)
              return this.jsx_readString(code);
          }
          if (code === 60 && this.exprAllowed && this.input.charCodeAt(this.pos + 1) !== 33) {
            ++this.pos;
            return this.finishToken(tok.jsxTagStart);
          }
          return super.readToken(code);
        }
        updateContext(prevType) {
          if (this.type == tt.braceL) {
            var curContext = this.curContext();
            if (curContext == tc_oTag)
              this.context.push(tokContexts.b_expr);
            else if (curContext == tc_expr)
              this.context.push(tokContexts.b_tmpl);
            else
              super.updateContext(prevType);
            this.exprAllowed = true;
          } else if (this.type === tt.slash && prevType === tok.jsxTagStart) {
            this.context.length -= 2;
            this.context.push(tc_cTag);
            this.exprAllowed = false;
          } else {
            return super.updateContext(prevType);
          }
        }
      };
    }
  }
});
var require_acorn2 = __commonJS2({
  "src/language-js/parse/acorn.js"(exports, module) {
    "use strict";
    init_define_process();
    var createError = require_parser_create_error();
    var tryCombinations = require_try_combinations();
    var createParser = require_create_parser();
    var postprocess = require_postprocess();
    var parseOptions = {
      ecmaVersion: "latest",
      sourceType: "module",
      allowReserved: true,
      allowReturnOutsideFunction: true,
      allowImportExportEverywhere: true,
      allowAwaitOutsideFunction: true,
      allowSuperOutsideMethod: true,
      allowHashBang: true,
      locations: true,
      ranges: true
    };
    function createParseError(error) {
      const {
        message,
        loc
      } = error;
      if (!loc) {
        return error;
      }
      const {
        line,
        column
      } = loc;
      return createError(message.replace(/ \(\d+:\d+\)$/, ""), {
        start: {
          line,
          column: column + 1
        }
      });
    }
    var parser;
    var getParser = () => {
      if (!parser) {
        const {
          Parser: AcornParser
        } = require_acorn();
        const acornJsx = require_acorn_jsx();
        parser = AcornParser.extend(acornJsx());
      }
      return parser;
    };
    function parseWithOptions(text, sourceType) {
      const parser2 = getParser();
      const comments = [];
      const tokens = [];
      const ast = parser2.parse(text, Object.assign(Object.assign({}, parseOptions), {}, {
        sourceType,
        onComment: comments,
        onToken: tokens
      }));
      ast.comments = comments;
      ast.tokens = tokens;
      return ast;
    }
    function parse(text, parsers) {
      let options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      const {
        result: ast,
        error: moduleParseError
      } = tryCombinations(() => parseWithOptions(text, "module"), () => parseWithOptions(text, "script"));
      if (!ast) {
        throw createParseError(moduleParseError);
      }
      options.originalText = text;
      return postprocess(ast, options);
    }
    module.exports = createParser(parse);
  }
});
var require_replace_hashbang = __commonJS2({
  "src/language-js/parse/utils/replace-hashbang.js"(exports, module) {
    "use strict";
    init_define_process();
    function replaceHashbang(text) {
      if (text.charAt(0) === "#" && text.charAt(1) === "!") {
        return "//" + text.slice(2);
      }
      return text;
    }
    module.exports = replaceHashbang;
  }
});
var require_espree = __commonJS2({
  "node_modules/espree/dist/espree.cjs"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var acorn = require_acorn();
    var jsx = require_acorn_jsx();
    var visitorKeys;
    function _interopDefaultLegacy(e) {
      return e && typeof e === "object" && "default" in e ? e : {
        "default": e
      };
    }
    function _interopNamespace(e) {
      if (e && e.__esModule)
        return e;
      var n = /* @__PURE__ */ Object.create(null);
      if (e) {
        Object.keys(e).forEach(function(k) {
          if (k !== "default") {
            var d = Object.getOwnPropertyDescriptor(e, k);
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: function() {
                return e[k];
              }
            });
          }
        });
      }
      n["default"] = e;
      return Object.freeze(n);
    }
    var acorn__namespace = /* @__PURE__ */ _interopNamespace(acorn);
    var jsx__default = /* @__PURE__ */ _interopDefaultLegacy(jsx);
    var visitorKeys__namespace = /* @__PURE__ */ _interopNamespace(visitorKeys);
    var Token = {
      Boolean: "Boolean",
      EOF: "<end>",
      Identifier: "Identifier",
      PrivateIdentifier: "PrivateIdentifier",
      Keyword: "Keyword",
      Null: "Null",
      Numeric: "Numeric",
      Punctuator: "Punctuator",
      String: "String",
      RegularExpression: "RegularExpression",
      Template: "Template",
      JSXIdentifier: "JSXIdentifier",
      JSXText: "JSXText"
    };
    function convertTemplatePart(tokens, code) {
      const firstToken = tokens[0], lastTemplateToken = tokens[tokens.length - 1];
      const token = {
        type: Token.Template,
        value: code.slice(firstToken.start, lastTemplateToken.end)
      };
      if (firstToken.loc) {
        token.loc = {
          start: firstToken.loc.start,
          end: lastTemplateToken.loc.end
        };
      }
      if (firstToken.range) {
        token.start = firstToken.range[0];
        token.end = lastTemplateToken.range[1];
        token.range = [token.start, token.end];
      }
      return token;
    }
    function TokenTranslator(acornTokTypes, code) {
      this._acornTokTypes = acornTokTypes;
      this._tokens = [];
      this._curlyBrace = null;
      this._code = code;
    }
    TokenTranslator.prototype = {
      constructor: TokenTranslator,
      translate(token, extra) {
        const type2 = token.type, tt = this._acornTokTypes;
        if (type2 === tt.name) {
          token.type = Token.Identifier;
          if (token.value === "static") {
            token.type = Token.Keyword;
          }
          if (extra.ecmaVersion > 5 && (token.value === "yield" || token.value === "let")) {
            token.type = Token.Keyword;
          }
        } else if (type2 === tt.privateId) {
          token.type = Token.PrivateIdentifier;
        } else if (type2 === tt.semi || type2 === tt.comma || type2 === tt.parenL || type2 === tt.parenR || type2 === tt.braceL || type2 === tt.braceR || type2 === tt.dot || type2 === tt.bracketL || type2 === tt.colon || type2 === tt.question || type2 === tt.bracketR || type2 === tt.ellipsis || type2 === tt.arrow || type2 === tt.jsxTagStart || type2 === tt.incDec || type2 === tt.starstar || type2 === tt.jsxTagEnd || type2 === tt.prefix || type2 === tt.questionDot || type2.binop && !type2.keyword || type2.isAssign) {
          token.type = Token.Punctuator;
          token.value = this._code.slice(token.start, token.end);
        } else if (type2 === tt.jsxName) {
          token.type = Token.JSXIdentifier;
        } else if (type2.label === "jsxText" || type2 === tt.jsxAttrValueToken) {
          token.type = Token.JSXText;
        } else if (type2.keyword) {
          if (type2.keyword === "true" || type2.keyword === "false") {
            token.type = Token.Boolean;
          } else if (type2.keyword === "null") {
            token.type = Token.Null;
          } else {
            token.type = Token.Keyword;
          }
        } else if (type2 === tt.num) {
          token.type = Token.Numeric;
          token.value = this._code.slice(token.start, token.end);
        } else if (type2 === tt.string) {
          if (extra.jsxAttrValueToken) {
            extra.jsxAttrValueToken = false;
            token.type = Token.JSXText;
          } else {
            token.type = Token.String;
          }
          token.value = this._code.slice(token.start, token.end);
        } else if (type2 === tt.regexp) {
          token.type = Token.RegularExpression;
          const value = token.value;
          token.regex = {
            flags: value.flags,
            pattern: value.pattern
          };
          token.value = `/${value.pattern}/${value.flags}`;
        }
        return token;
      },
      onToken(token, extra) {
        const that = this, tt = this._acornTokTypes, tokens = extra.tokens, templateTokens = this._tokens;
        function translateTemplateTokens() {
          tokens.push(convertTemplatePart(that._tokens, that._code));
          that._tokens = [];
        }
        if (token.type === tt.eof) {
          if (this._curlyBrace) {
            tokens.push(this.translate(this._curlyBrace, extra));
          }
          return;
        }
        if (token.type === tt.backQuote) {
          if (this._curlyBrace) {
            tokens.push(this.translate(this._curlyBrace, extra));
            this._curlyBrace = null;
          }
          templateTokens.push(token);
          if (templateTokens.length > 1) {
            translateTemplateTokens();
          }
          return;
        }
        if (token.type === tt.dollarBraceL) {
          templateTokens.push(token);
          translateTemplateTokens();
          return;
        }
        if (token.type === tt.braceR) {
          if (this._curlyBrace) {
            tokens.push(this.translate(this._curlyBrace, extra));
          }
          this._curlyBrace = token;
          return;
        }
        if (token.type === tt.template || token.type === tt.invalidTemplate) {
          if (this._curlyBrace) {
            templateTokens.push(this._curlyBrace);
            this._curlyBrace = null;
          }
          templateTokens.push(token);
          return;
        }
        if (this._curlyBrace) {
          tokens.push(this.translate(this._curlyBrace, extra));
          this._curlyBrace = null;
        }
        tokens.push(this.translate(token, extra));
      }
    };
    var SUPPORTED_VERSIONS = [3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    function getLatestEcmaVersion() {
      return SUPPORTED_VERSIONS[SUPPORTED_VERSIONS.length - 1];
    }
    function getSupportedEcmaVersions() {
      return [...SUPPORTED_VERSIONS];
    }
    function normalizeEcmaVersion() {
      let ecmaVersion = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 5;
      let version2 = ecmaVersion === "latest" ? getLatestEcmaVersion() : ecmaVersion;
      if (typeof version2 !== "number") {
        throw new Error(`ecmaVersion must be a number or "latest". Received value of type ${typeof ecmaVersion} instead.`);
      }
      if (version2 >= 2015) {
        version2 -= 2009;
      }
      if (!SUPPORTED_VERSIONS.includes(version2)) {
        throw new Error("Invalid ecmaVersion.");
      }
      return version2;
    }
    function normalizeSourceType() {
      let sourceType = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "script";
      if (sourceType === "script" || sourceType === "module") {
        return sourceType;
      }
      if (sourceType === "commonjs") {
        return "script";
      }
      throw new Error("Invalid sourceType.");
    }
    function normalizeOptions(options) {
      const ecmaVersion = normalizeEcmaVersion(options.ecmaVersion);
      const sourceType = normalizeSourceType(options.sourceType);
      const ranges = options.range === true;
      const locations = options.loc === true;
      if (ecmaVersion !== 3 && options.allowReserved) {
        throw new Error("`allowReserved` is only supported when ecmaVersion is 3");
      }
      if (typeof options.allowReserved !== "undefined" && typeof options.allowReserved !== "boolean") {
        throw new Error("`allowReserved`, when present, must be `true` or `false`");
      }
      const allowReserved = ecmaVersion === 3 ? options.allowReserved || "never" : false;
      const ecmaFeatures = options.ecmaFeatures || {};
      const allowReturnOutsideFunction = options.sourceType === "commonjs" || Boolean(ecmaFeatures.globalReturn);
      if (sourceType === "module" && ecmaVersion < 6) {
        throw new Error("sourceType 'module' is not supported when ecmaVersion < 2015. Consider adding `{ ecmaVersion: 2015 }` to the parser options.");
      }
      return Object.assign({}, options, {
        ecmaVersion,
        sourceType,
        ranges,
        locations,
        allowReserved,
        allowReturnOutsideFunction
      });
    }
    var STATE = Symbol("espree's internal state");
    var ESPRIMA_FINISH_NODE = Symbol("espree's esprimaFinishNode");
    function convertAcornCommentToEsprimaComment(block, text, start, end, startLoc, endLoc, code) {
      let type2;
      if (block) {
        type2 = "Block";
      } else if (code.slice(start, start + 2) === "#!") {
        type2 = "Hashbang";
      } else {
        type2 = "Line";
      }
      const comment = {
        type: type2,
        value: text
      };
      if (typeof start === "number") {
        comment.start = start;
        comment.end = end;
        comment.range = [start, end];
      }
      if (typeof startLoc === "object") {
        comment.loc = {
          start: startLoc,
          end: endLoc
        };
      }
      return comment;
    }
    var espree = () => (Parser) => {
      const tokTypes = Object.assign({}, Parser.acorn.tokTypes);
      if (Parser.acornJsx) {
        Object.assign(tokTypes, Parser.acornJsx.tokTypes);
      }
      return class Espree extends Parser {
        constructor(opts, code) {
          if (typeof opts !== "object" || opts === null) {
            opts = {};
          }
          if (typeof code !== "string" && !(code instanceof String)) {
            code = String(code);
          }
          const originalSourceType = opts.sourceType;
          const options = normalizeOptions(opts);
          const ecmaFeatures = options.ecmaFeatures || {};
          const tokenTranslator = options.tokens === true ? new TokenTranslator(tokTypes, code) : null;
          const state = {
            originalSourceType: originalSourceType || options.sourceType,
            tokens: tokenTranslator ? [] : null,
            comments: options.comment === true ? [] : null,
            impliedStrict: ecmaFeatures.impliedStrict === true && options.ecmaVersion >= 5,
            ecmaVersion: options.ecmaVersion,
            jsxAttrValueToken: false,
            lastToken: null,
            templateElements: []
          };
          super({
            ecmaVersion: options.ecmaVersion,
            sourceType: options.sourceType,
            ranges: options.ranges,
            locations: options.locations,
            allowReserved: options.allowReserved,
            allowReturnOutsideFunction: options.allowReturnOutsideFunction,
            onToken: (token) => {
              if (tokenTranslator) {
                tokenTranslator.onToken(token, state);
              }
              if (token.type !== tokTypes.eof) {
                state.lastToken = token;
              }
            },
            onComment: (block, text, start, end, startLoc, endLoc) => {
              if (state.comments) {
                const comment = convertAcornCommentToEsprimaComment(block, text, start, end, startLoc, endLoc, code);
                state.comments.push(comment);
              }
            }
          }, code);
          this[STATE] = state;
        }
        tokenize() {
          do {
            this.next();
          } while (this.type !== tokTypes.eof);
          this.next();
          const extra = this[STATE];
          const tokens = extra.tokens;
          if (extra.comments) {
            tokens.comments = extra.comments;
          }
          return tokens;
        }
        finishNode() {
          const result = super.finishNode(...arguments);
          return this[ESPRIMA_FINISH_NODE](result);
        }
        finishNodeAt() {
          const result = super.finishNodeAt(...arguments);
          return this[ESPRIMA_FINISH_NODE](result);
        }
        parse() {
          const extra = this[STATE];
          const program = super.parse();
          program.sourceType = extra.originalSourceType;
          if (extra.comments) {
            program.comments = extra.comments;
          }
          if (extra.tokens) {
            program.tokens = extra.tokens;
          }
          if (program.body.length) {
            const [firstNode] = program.body;
            if (program.range) {
              program.range[0] = firstNode.range[0];
            }
            if (program.loc) {
              program.loc.start = firstNode.loc.start;
            }
            program.start = firstNode.start;
          }
          if (extra.lastToken) {
            if (program.range) {
              program.range[1] = extra.lastToken.range[1];
            }
            if (program.loc) {
              program.loc.end = extra.lastToken.loc.end;
            }
            program.end = extra.lastToken.end;
          }
          this[STATE].templateElements.forEach((templateElement) => {
            const startOffset = -1;
            const endOffset = templateElement.tail ? 1 : 2;
            templateElement.start += startOffset;
            templateElement.end += endOffset;
            if (templateElement.range) {
              templateElement.range[0] += startOffset;
              templateElement.range[1] += endOffset;
            }
            if (templateElement.loc) {
              templateElement.loc.start.column += startOffset;
              templateElement.loc.end.column += endOffset;
            }
          });
          return program;
        }
        parseTopLevel(node) {
          if (this[STATE].impliedStrict) {
            this.strict = true;
          }
          return super.parseTopLevel(node);
        }
        raise(pos, message) {
          const loc = Parser.acorn.getLineInfo(this.input, pos);
          const err = new SyntaxError(message);
          err.index = pos;
          err.lineNumber = loc.line;
          err.column = loc.column + 1;
          throw err;
        }
        raiseRecoverable(pos, message) {
          this.raise(pos, message);
        }
        unexpected(pos) {
          let message = "Unexpected token";
          if (pos !== null && pos !== void 0) {
            this.pos = pos;
            if (this.options.locations) {
              while (this.pos < this.lineStart) {
                this.lineStart = this.input.lastIndexOf("\n", this.lineStart - 2) + 1;
                --this.curLine;
              }
            }
            this.nextToken();
          }
          if (this.end > this.start) {
            message += ` ${this.input.slice(this.start, this.end)}`;
          }
          this.raise(this.start, message);
        }
        jsx_readString(quote) {
          const result = super.jsx_readString(quote);
          if (this.type === tokTypes.string) {
            this[STATE].jsxAttrValueToken = true;
          }
          return result;
        }
        [ESPRIMA_FINISH_NODE](result) {
          if (result.type === "TemplateElement") {
            this[STATE].templateElements.push(result);
          }
          if (result.type.includes("Function") && !result.generator) {
            result.generator = false;
          }
          return result;
        }
      };
    };
    var version$1 = "9.4.1";
    var parsers = {
      _regular: null,
      _jsx: null,
      get regular() {
        if (this._regular === null) {
          this._regular = acorn__namespace.Parser.extend(espree());
        }
        return this._regular;
      },
      get jsx() {
        if (this._jsx === null) {
          this._jsx = acorn__namespace.Parser.extend(jsx__default["default"](), espree());
        }
        return this._jsx;
      },
      get(options) {
        const useJsx = Boolean(options && options.ecmaFeatures && options.ecmaFeatures.jsx);
        return useJsx ? this.jsx : this.regular;
      }
    };
    function tokenize(code, options) {
      const Parser = parsers.get(options);
      if (!options || options.tokens !== true) {
        options = Object.assign({}, options, {
          tokens: true
        });
      }
      return new Parser(options, code).tokenize();
    }
    function parse(code, options) {
      const Parser = parsers.get(options);
      return new Parser(options, code).parse();
    }
    var version = version$1;
    var VisitorKeys = function() {
      return visitorKeys__namespace.KEYS;
    }();
    var Syntax = void 0;
    var latestEcmaVersion = getLatestEcmaVersion();
    var supportedEcmaVersions = getSupportedEcmaVersions();
    exports.Syntax = Syntax;
    exports.VisitorKeys = VisitorKeys;
    exports.latestEcmaVersion = latestEcmaVersion;
    exports.parse = parse;
    exports.supportedEcmaVersions = supportedEcmaVersions;
    exports.tokenize = tokenize;
    exports.version = version;
  }
});
var require_espree2 = __commonJS2({
  "src/language-js/parse/espree.js"(exports, module) {
    "use strict";
    init_define_process();
    var createError = require_parser_create_error();
    var tryCombinations = require_try_combinations();
    var createParser = require_create_parser();
    var replaceHashbang = require_replace_hashbang();
    var postprocess = require_postprocess();
    var parseOptions = {
      ecmaVersion: "latest",
      range: true,
      loc: true,
      comment: true,
      tokens: true,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
        globalReturn: true,
        impliedStrict: false
      }
    };
    function createParseError(error) {
      const {
        message,
        lineNumber,
        column
      } = error;
      if (typeof lineNumber !== "number") {
        return error;
      }
      return createError(message, {
        start: {
          line: lineNumber,
          column
        }
      });
    }
    function parse(originalText, parsers) {
      let options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      const {
        parse: parse2
      } = require_espree();
      const textToParse = replaceHashbang(originalText);
      const {
        result: ast,
        error: moduleParseError
      } = tryCombinations(() => parse2(textToParse, Object.assign(Object.assign({}, parseOptions), {}, {
        sourceType: "module"
      })), () => parse2(textToParse, Object.assign(Object.assign({}, parseOptions), {}, {
        sourceType: "script"
      })));
      if (!ast) {
        throw createParseError(moduleParseError);
      }
      options.originalText = originalText;
      return postprocess(ast, options);
    }
    module.exports = createParser(parse);
  }
});
var require_acorn_and_espree = __commonJS2({
  "src/language-js/parse/acorn-and-espree.js"(exports, module) {
    init_define_process();
    var acorn = require_acorn2();
    var espree = require_espree2();
    module.exports = {
      parsers: {
        acorn,
        espree
      }
    };
  }
});
var parser_espree_js_esm_default = require_acorn_and_espree();
export {
  parser_espree_js_esm_default as default
};
