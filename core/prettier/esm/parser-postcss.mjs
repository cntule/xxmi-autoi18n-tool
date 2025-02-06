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
    var fails = require_fails();
    module.exports = !fails(function() {
      return Object.defineProperty({}, 1, { get: function() {
        return 7;
      } })[1] != 7;
    });
  }
});

// node_modules/core-js/internals/function-bind-native.js
var require_function_bind_native = __commonJS({
  "node_modules/core-js/internals/function-bind-native.js"(exports, module) {
    var fails = require_fails();
    module.exports = !fails(function() {
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
    var fails = require_fails();
    var classof = require_classof_raw();
    var $Object = Object;
    var split = uncurryThis("".split);
    module.exports = fails(function() {
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
    var isNullOrUndefined2 = require_is_null_or_undefined();
    var $TypeError = TypeError;
    module.exports = function(it) {
      if (isNullOrUndefined2(it))
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
    var global2 = require_global();
    var isCallable = require_is_callable();
    var aFunction = function(argument) {
      return isCallable(argument) ? argument : void 0;
    };
    module.exports = function(namespace, method) {
      return arguments.length < 2 ? aFunction(global2[namespace]) : global2[namespace] && global2[namespace][method];
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
    var global2 = require_global();
    var userAgent = require_engine_user_agent();
    var process = global2.process;
    var Deno = global2.Deno;
    var versions2 = process && process.versions || Deno && Deno.version;
    var v8 = versions2 && versions2.v8;
    var match;
    var version2;
    if (v8) {
      match = v8.split(".");
      version2 = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
    }
    if (!version2 && userAgent) {
      match = userAgent.match(/Edge\/(\d+)/);
      if (!match || match[1] >= 74) {
        match = userAgent.match(/Chrome\/(\d+)/);
        if (match)
          version2 = +match[1];
      }
    }
    module.exports = version2;
  }
});

// node_modules/core-js/internals/symbol-constructor-detection.js
var require_symbol_constructor_detection = __commonJS({
  "node_modules/core-js/internals/symbol-constructor-detection.js"(exports, module) {
    var V8_VERSION = require_engine_v8_version();
    var fails = require_fails();
    module.exports = !!Object.getOwnPropertySymbols && !fails(function() {
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
    var isNullOrUndefined2 = require_is_null_or_undefined();
    module.exports = function(V, P) {
      var func = V[P];
      return isNullOrUndefined2(func) ? void 0 : aCallable(func);
    };
  }
});

// node_modules/core-js/internals/ordinary-to-primitive.js
var require_ordinary_to_primitive = __commonJS({
  "node_modules/core-js/internals/ordinary-to-primitive.js"(exports, module) {
    var call = require_function_call();
    var isCallable = require_is_callable();
    var isObject2 = require_is_object();
    var $TypeError = TypeError;
    module.exports = function(input, pref) {
      var fn, val;
      if (pref === "string" && isCallable(fn = input.toString) && !isObject2(val = call(fn, input)))
        return val;
      if (isCallable(fn = input.valueOf) && !isObject2(val = call(fn, input)))
        return val;
      if (pref !== "string" && isCallable(fn = input.toString) && !isObject2(val = call(fn, input)))
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
    var global2 = require_global();
    var defineProperty = Object.defineProperty;
    module.exports = function(key, value) {
      try {
        defineProperty(global2, key, { value, configurable: true, writable: true });
      } catch (error) {
        global2[key] = value;
      }
      return value;
    };
  }
});

// node_modules/core-js/internals/shared-store.js
var require_shared_store = __commonJS({
  "node_modules/core-js/internals/shared-store.js"(exports, module) {
    var global2 = require_global();
    var defineGlobalProperty = require_define_global_property();
    var SHARED = "__core-js_shared__";
    var store = global2[SHARED] || defineGlobalProperty(SHARED, {});
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
    var hasOwnProperty2 = uncurryThis({}.hasOwnProperty);
    module.exports = Object.hasOwn || function hasOwn(it, key) {
      return hasOwnProperty2(toObject(it), key);
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
    var global2 = require_global();
    var shared = require_shared();
    var hasOwn = require_has_own_property();
    var uid = require_uid();
    var NATIVE_SYMBOL = require_symbol_constructor_detection();
    var USE_SYMBOL_AS_UID = require_use_symbol_as_uid();
    var WellKnownSymbolsStore = shared("wks");
    var Symbol2 = global2.Symbol;
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
    var isObject2 = require_is_object();
    var isSymbol2 = require_is_symbol();
    var getMethod = require_get_method();
    var ordinaryToPrimitive = require_ordinary_to_primitive();
    var wellKnownSymbol = require_well_known_symbol();
    var $TypeError = TypeError;
    var TO_PRIMITIVE = wellKnownSymbol("toPrimitive");
    module.exports = function(input, pref) {
      if (!isObject2(input) || isSymbol2(input))
        return input;
      var exoticToPrim = getMethod(input, TO_PRIMITIVE);
      var result;
      if (exoticToPrim) {
        if (pref === void 0)
          pref = "default";
        result = call(exoticToPrim, input, pref);
        if (!isObject2(result) || isSymbol2(result))
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
    var isSymbol2 = require_is_symbol();
    module.exports = function(argument) {
      var key = toPrimitive(argument, "string");
      return isSymbol2(key) ? key : key + "";
    };
  }
});

// node_modules/core-js/internals/document-create-element.js
var require_document_create_element = __commonJS({
  "node_modules/core-js/internals/document-create-element.js"(exports, module) {
    var global2 = require_global();
    var isObject2 = require_is_object();
    var document2 = global2.document;
    var EXISTS = isObject2(document2) && isObject2(document2.createElement);
    module.exports = function(it) {
      return EXISTS ? document2.createElement(it) : {};
    };
  }
});

// node_modules/core-js/internals/ie8-dom-define.js
var require_ie8_dom_define = __commonJS({
  "node_modules/core-js/internals/ie8-dom-define.js"(exports, module) {
    var DESCRIPTORS = require_descriptors();
    var fails = require_fails();
    var createElement = require_document_create_element();
    module.exports = !DESCRIPTORS && !fails(function() {
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
    var DESCRIPTORS = require_descriptors();
    var call = require_function_call();
    var propertyIsEnumerableModule = require_object_property_is_enumerable();
    var createPropertyDescriptor = require_create_property_descriptor();
    var toIndexedObject = require_to_indexed_object();
    var toPropertyKey = require_to_property_key();
    var hasOwn = require_has_own_property();
    var IE8_DOM_DEFINE = require_ie8_dom_define();
    var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
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
    var DESCRIPTORS = require_descriptors();
    var fails = require_fails();
    module.exports = DESCRIPTORS && fails(function() {
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
    var isObject2 = require_is_object();
    var $String = String;
    var $TypeError = TypeError;
    module.exports = function(argument) {
      if (isObject2(argument))
        return argument;
      throw $TypeError($String(argument) + " is not an object");
    };
  }
});

// node_modules/core-js/internals/object-define-property.js
var require_object_define_property = __commonJS({
  "node_modules/core-js/internals/object-define-property.js"(exports) {
    var DESCRIPTORS = require_descriptors();
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
    exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
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
    var DESCRIPTORS = require_descriptors();
    var definePropertyModule = require_object_define_property();
    var createPropertyDescriptor = require_create_property_descriptor();
    module.exports = DESCRIPTORS ? function(object, key, value) {
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
    var DESCRIPTORS = require_descriptors();
    var hasOwn = require_has_own_property();
    var FunctionPrototype = Function.prototype;
    var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;
    var EXISTS = hasOwn(FunctionPrototype, "name");
    var PROPER = EXISTS && function something() {
    }.name === "something";
    var CONFIGURABLE = EXISTS && (!DESCRIPTORS || DESCRIPTORS && getDescriptor(FunctionPrototype, "name").configurable);
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
    var global2 = require_global();
    var isCallable = require_is_callable();
    var WeakMap = global2.WeakMap;
    module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));
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
    var global2 = require_global();
    var isObject2 = require_is_object();
    var createNonEnumerableProperty = require_create_non_enumerable_property();
    var hasOwn = require_has_own_property();
    var shared = require_shared_store();
    var sharedKey = require_shared_key();
    var hiddenKeys = require_hidden_keys();
    var OBJECT_ALREADY_INITIALIZED = "Object already initialized";
    var TypeError2 = global2.TypeError;
    var WeakMap = global2.WeakMap;
    var set;
    var get;
    var has;
    var enforce = function(it) {
      return has(it) ? get(it) : set(it, {});
    };
    var getterFor = function(TYPE) {
      return function(it) {
        var state;
        if (!isObject2(it) || (state = get(it)).type !== TYPE) {
          throw TypeError2("Incompatible receiver, " + TYPE + " required");
        }
        return state;
      };
    };
    if (NATIVE_WEAK_MAP || shared.state) {
      store = shared.state || (shared.state = new WeakMap());
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
    var fails = require_fails();
    var isCallable = require_is_callable();
    var hasOwn = require_has_own_property();
    var DESCRIPTORS = require_descriptors();
    var CONFIGURABLE_FUNCTION_NAME = require_function_name().CONFIGURABLE;
    var inspectSource = require_inspect_source();
    var InternalStateModule = require_internal_state();
    var enforceInternalState = InternalStateModule.enforce;
    var getInternalState = InternalStateModule.get;
    var defineProperty = Object.defineProperty;
    var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function() {
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
        if (DESCRIPTORS)
          defineProperty(value, "name", { value: name, configurable: true });
        else
          value.name = name;
      }
      if (CONFIGURABLE_LENGTH && options && hasOwn(options, "arity") && value.length !== options.arity) {
        defineProperty(value, "length", { value: options.arity });
      }
      try {
        if (options && hasOwn(options, "constructor") && options.constructor) {
          if (DESCRIPTORS)
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
    var fails = require_fails();
    var isCallable = require_is_callable();
    var replacement = /#|\.prototype\./;
    var isForced = function(feature, detection) {
      var value = data[normalize2(feature)];
      return value == POLYFILL ? true : value == NATIVE ? false : isCallable(detection) ? fails(detection) : !!detection;
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
    var global2 = require_global();
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
      var FORCED, target, key, targetProperty, sourceProperty, descriptor;
      if (GLOBAL) {
        target = global2;
      } else if (STATIC) {
        target = global2[TARGET] || defineGlobalProperty(TARGET, {});
      } else {
        target = (global2[TARGET] || {}).prototype;
      }
      if (target)
        for (key in source) {
          sourceProperty = source[key];
          if (options.dontCallGetSet) {
            descriptor = getOwnPropertyDescriptor(target, key);
            targetProperty = descriptor && descriptor.value;
          } else
            targetProperty = target[key];
          FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key, options.forced);
          if (!FORCED && targetProperty !== void 0) {
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
    var global2 = require_global();
    $({ global: true, forced: global2.globalThis !== global2 }, {
      globalThis: global2
    });
  }
});

// node_modules/core-js/modules/esnext.global-this.js
require_es_global_this();

// dist/_parser-postcss.js.esm.mjs
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
var require_get_last = __commonJS2({
  "src/utils/get-last.js"(exports, module) {
    "use strict";
    init_define_process();
    var getLast = (arr) => arr[arr.length - 1];
    module.exports = getLast;
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
    function print(_ref2) {
      let {
        comments = "",
        pragmas = {}
      } = _ref2;
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
var require_loc = __commonJS2({
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
var require_has_scss_interpolation = __commonJS2({
  "src/language-css/utils/has-scss-interpolation.js"(exports, module) {
    "use strict";
    init_define_process();
    var isNonEmptyArray = require_is_non_empty_array();
    function hasSCSSInterpolation(groupList) {
      if (isNonEmptyArray(groupList)) {
        for (let i = groupList.length - 1; i > 0; i--) {
          if (groupList[i].type === "word" && groupList[i].value === "{" && groupList[i - 1].type === "word" && groupList[i - 1].value.endsWith("#")) {
            return true;
          }
        }
      }
      return false;
    }
    module.exports = hasSCSSInterpolation;
  }
});
var require_has_string_or_function = __commonJS2({
  "src/language-css/utils/has-string-or-function.js"(exports, module) {
    "use strict";
    init_define_process();
    function hasStringOrFunction(groupList) {
      return groupList.some((group) => group.type === "string" || group.type === "func");
    }
    module.exports = hasStringOrFunction;
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
var require_is_scss_nested_property_node = __commonJS2({
  "src/language-css/utils/is-scss-nested-property-node.js"(exports, module) {
    "use strict";
    init_define_process();
    function isSCSSNestedPropertyNode(node) {
      if (!node.selector) {
        return false;
      }
      return node.selector.replace(/\/\*.*?\*\//, "").replace(/\/\/.*\n/, "").trim().endsWith(":");
    }
    module.exports = isSCSSNestedPropertyNode;
  }
});
var require_is_scss_variable = __commonJS2({
  "src/language-css/utils/is-scss-variable.js"(exports, module) {
    "use strict";
    init_define_process();
    function isSCSSVariable(node) {
      return Boolean((node === null || node === void 0 ? void 0 : node.type) === "word" && node.value.startsWith("$"));
    }
    module.exports = isSCSSVariable;
  }
});
var require_stringify_node = __commonJS2({
  "src/language-css/utils/stringify-node.js"(exports, module) {
    "use strict";
    init_define_process();
    function stringifyNode(node) {
      var _node$raws, _node$raws2, _node$raws3;
      if (node.groups) {
        var _node$open, _node$groups$, _node$close;
        const open = ((_node$open = node.open) === null || _node$open === void 0 ? void 0 : _node$open.value) || "";
        const groups = node.groups.map((currentValue) => stringifyNode(currentValue)).join(((_node$groups$ = node.groups[0]) === null || _node$groups$ === void 0 ? void 0 : _node$groups$.type) === "comma_group" ? "," : "");
        const close = ((_node$close = node.close) === null || _node$close === void 0 ? void 0 : _node$close.value) || "";
        return open + groups + close;
      }
      const before = ((_node$raws = node.raws) === null || _node$raws === void 0 ? void 0 : _node$raws.before) || "";
      const quote = ((_node$raws2 = node.raws) === null || _node$raws2 === void 0 ? void 0 : _node$raws2.quote) || "";
      const atword = node.type === "atword" ? "@" : "";
      const value = node.value || "";
      const unit = node.unit || "";
      const group = node.group ? stringifyNode(node.group) : "";
      const after = ((_node$raws3 = node.raws) === null || _node$raws3 === void 0 ? void 0 : _node$raws3.after) || "";
      return before + quote + atword + value + quote + unit + group + after;
    }
    module.exports = stringifyNode;
  }
});
var require_is_module_rule_name = __commonJS2({
  "src/language-css/utils/is-module-rule-name.js"(exports, module) {
    "use strict";
    init_define_process();
    var moduleRuleNames = /* @__PURE__ */ new Set(["import", "use", "forward"]);
    function isModuleRuleName(name) {
      return moduleRuleNames.has(name);
    }
    module.exports = isModuleRuleName;
  }
});
var require_node = __commonJS2({
  "node_modules/postcss-values-parser/lib/node.js"(exports, module) {
    "use strict";
    init_define_process();
    var cloneNode = function(obj, parent) {
      let cloned = new obj.constructor();
      for (let i in obj) {
        if (!obj.hasOwnProperty(i))
          continue;
        let value = obj[i], type2 = typeof value;
        if (i === "parent" && type2 === "object") {
          if (parent)
            cloned[i] = parent;
        } else if (i === "source") {
          cloned[i] = value;
        } else if (value instanceof Array) {
          cloned[i] = value.map((j) => cloneNode(j, cloned));
        } else if (i !== "before" && i !== "after" && i !== "between" && i !== "semicolon") {
          if (type2 === "object" && value !== null)
            value = cloneNode(value);
          cloned[i] = value;
        }
      }
      return cloned;
    };
    module.exports = class Node {
      constructor(defaults) {
        defaults = defaults || {};
        this.raws = {
          before: "",
          after: ""
        };
        for (let name in defaults) {
          this[name] = defaults[name];
        }
      }
      remove() {
        if (this.parent) {
          this.parent.removeChild(this);
        }
        this.parent = void 0;
        return this;
      }
      toString() {
        return [this.raws.before, String(this.value), this.raws.after].join("");
      }
      clone(overrides) {
        overrides = overrides || {};
        let cloned = cloneNode(this);
        for (let name in overrides) {
          cloned[name] = overrides[name];
        }
        return cloned;
      }
      cloneBefore(overrides) {
        overrides = overrides || {};
        let cloned = this.clone(overrides);
        this.parent.insertBefore(this, cloned);
        return cloned;
      }
      cloneAfter(overrides) {
        overrides = overrides || {};
        let cloned = this.clone(overrides);
        this.parent.insertAfter(this, cloned);
        return cloned;
      }
      replaceWith() {
        let nodes = Array.prototype.slice.call(arguments);
        if (this.parent) {
          for (let node of nodes) {
            this.parent.insertBefore(this, node);
          }
          this.remove();
        }
        return this;
      }
      moveTo(container) {
        this.cleanRaws(this.root() === container.root());
        this.remove();
        container.append(this);
        return this;
      }
      moveBefore(node) {
        this.cleanRaws(this.root() === node.root());
        this.remove();
        node.parent.insertBefore(node, this);
        return this;
      }
      moveAfter(node) {
        this.cleanRaws(this.root() === node.root());
        this.remove();
        node.parent.insertAfter(node, this);
        return this;
      }
      next() {
        let index = this.parent.index(this);
        return this.parent.nodes[index + 1];
      }
      prev() {
        let index = this.parent.index(this);
        return this.parent.nodes[index - 1];
      }
      toJSON() {
        let fixed = {};
        for (let name in this) {
          if (!this.hasOwnProperty(name))
            continue;
          if (name === "parent")
            continue;
          let value = this[name];
          if (value instanceof Array) {
            fixed[name] = value.map((i) => {
              if (typeof i === "object" && i.toJSON) {
                return i.toJSON();
              } else {
                return i;
              }
            });
          } else if (typeof value === "object" && value.toJSON) {
            fixed[name] = value.toJSON();
          } else {
            fixed[name] = value;
          }
        }
        return fixed;
      }
      root() {
        let result = this;
        while (result.parent)
          result = result.parent;
        return result;
      }
      cleanRaws(keepBetween) {
        delete this.raws.before;
        delete this.raws.after;
        if (!keepBetween)
          delete this.raws.between;
      }
      positionInside(index) {
        let string = this.toString(), column = this.source.start.column, line = this.source.start.line;
        for (let i = 0; i < index; i++) {
          if (string[i] === "\n") {
            column = 1;
            line += 1;
          } else {
            column += 1;
          }
        }
        return {
          line,
          column
        };
      }
      positionBy(opts) {
        let pos = this.source.start;
        if (Object(opts).index) {
          pos = this.positionInside(opts.index);
        } else if (Object(opts).word) {
          let index = this.toString().indexOf(opts.word);
          if (index !== -1)
            pos = this.positionInside(index);
        }
        return pos;
      }
    };
  }
});
var require_container = __commonJS2({
  "node_modules/postcss-values-parser/lib/container.js"(exports, module) {
    "use strict";
    init_define_process();
    var Node = require_node();
    var Container = class extends Node {
      constructor(opts) {
        super(opts);
        if (!this.nodes) {
          this.nodes = [];
        }
      }
      push(child) {
        child.parent = this;
        this.nodes.push(child);
        return this;
      }
      each(callback) {
        if (!this.lastEach)
          this.lastEach = 0;
        if (!this.indexes)
          this.indexes = {};
        this.lastEach += 1;
        let id = this.lastEach, index, result;
        this.indexes[id] = 0;
        if (!this.nodes)
          return void 0;
        while (this.indexes[id] < this.nodes.length) {
          index = this.indexes[id];
          result = callback(this.nodes[index], index);
          if (result === false)
            break;
          this.indexes[id] += 1;
        }
        delete this.indexes[id];
        return result;
      }
      walk(callback) {
        return this.each((child, i) => {
          let result = callback(child, i);
          if (result !== false && child.walk) {
            result = child.walk(callback);
          }
          return result;
        });
      }
      walkType(type2, callback) {
        if (!type2 || !callback) {
          throw new Error("Parameters {type} and {callback} are required.");
        }
        const isTypeCallable = typeof type2 === "function";
        return this.walk((node, index) => {
          if (isTypeCallable && node instanceof type2 || !isTypeCallable && node.type === type2) {
            return callback.call(this, node, index);
          }
        });
      }
      append(node) {
        node.parent = this;
        this.nodes.push(node);
        return this;
      }
      prepend(node) {
        node.parent = this;
        this.nodes.unshift(node);
        return this;
      }
      cleanRaws(keepBetween) {
        super.cleanRaws(keepBetween);
        if (this.nodes) {
          for (let node of this.nodes)
            node.cleanRaws(keepBetween);
        }
      }
      insertAfter(oldNode, newNode) {
        let oldIndex = this.index(oldNode), index;
        this.nodes.splice(oldIndex + 1, 0, newNode);
        for (let id in this.indexes) {
          index = this.indexes[id];
          if (oldIndex <= index) {
            this.indexes[id] = index + this.nodes.length;
          }
        }
        return this;
      }
      insertBefore(oldNode, newNode) {
        let oldIndex = this.index(oldNode), index;
        this.nodes.splice(oldIndex, 0, newNode);
        for (let id in this.indexes) {
          index = this.indexes[id];
          if (oldIndex <= index) {
            this.indexes[id] = index + this.nodes.length;
          }
        }
        return this;
      }
      removeChild(child) {
        child = this.index(child);
        this.nodes[child].parent = void 0;
        this.nodes.splice(child, 1);
        let index;
        for (let id in this.indexes) {
          index = this.indexes[id];
          if (index >= child) {
            this.indexes[id] = index - 1;
          }
        }
        return this;
      }
      removeAll() {
        for (let node of this.nodes)
          node.parent = void 0;
        this.nodes = [];
        return this;
      }
      every(condition) {
        return this.nodes.every(condition);
      }
      some(condition) {
        return this.nodes.some(condition);
      }
      index(child) {
        if (typeof child === "number") {
          return child;
        } else {
          return this.nodes.indexOf(child);
        }
      }
      get first() {
        if (!this.nodes)
          return void 0;
        return this.nodes[0];
      }
      get last() {
        if (!this.nodes)
          return void 0;
        return this.nodes[this.nodes.length - 1];
      }
      toString() {
        let result = this.nodes.map(String).join("");
        if (this.value) {
          result = this.value + result;
        }
        if (this.raws.before) {
          result = this.raws.before + result;
        }
        if (this.raws.after) {
          result += this.raws.after;
        }
        return result;
      }
    };
    Container.registerWalker = (constructor) => {
      let walkerName = "walk" + constructor.name;
      if (walkerName.lastIndexOf("s") !== walkerName.length - 1) {
        walkerName += "s";
      }
      if (Container.prototype[walkerName]) {
        return;
      }
      Container.prototype[walkerName] = function(callback) {
        return this.walkType(constructor, callback);
      };
    };
    module.exports = Container;
  }
});
var require_root = __commonJS2({
  "node_modules/postcss-values-parser/lib/root.js"(exports, module) {
    "use strict";
    init_define_process();
    var Container = require_container();
    module.exports = class Root extends Container {
      constructor(opts) {
        super(opts);
        this.type = "root";
      }
    };
  }
});
var require_value = __commonJS2({
  "node_modules/postcss-values-parser/lib/value.js"(exports, module) {
    "use strict";
    init_define_process();
    var Container = require_container();
    module.exports = class Value extends Container {
      constructor(opts) {
        super(opts);
        this.type = "value";
        this.unbalanced = 0;
      }
    };
  }
});
var require_atword = __commonJS2({
  "node_modules/postcss-values-parser/lib/atword.js"(exports, module) {
    "use strict";
    init_define_process();
    var Container = require_container();
    var AtWord = class extends Container {
      constructor(opts) {
        super(opts);
        this.type = "atword";
      }
      toString() {
        let quote = this.quoted ? this.raws.quote : "";
        return [this.raws.before, "@", String.prototype.toString.call(this.value), this.raws.after].join("");
      }
    };
    Container.registerWalker(AtWord);
    module.exports = AtWord;
  }
});
var require_colon = __commonJS2({
  "node_modules/postcss-values-parser/lib/colon.js"(exports, module) {
    "use strict";
    init_define_process();
    var Container = require_container();
    var Node = require_node();
    var Colon = class extends Node {
      constructor(opts) {
        super(opts);
        this.type = "colon";
      }
    };
    Container.registerWalker(Colon);
    module.exports = Colon;
  }
});
var require_comma = __commonJS2({
  "node_modules/postcss-values-parser/lib/comma.js"(exports, module) {
    "use strict";
    init_define_process();
    var Container = require_container();
    var Node = require_node();
    var Comma = class extends Node {
      constructor(opts) {
        super(opts);
        this.type = "comma";
      }
    };
    Container.registerWalker(Comma);
    module.exports = Comma;
  }
});
var require_comment = __commonJS2({
  "node_modules/postcss-values-parser/lib/comment.js"(exports, module) {
    "use strict";
    init_define_process();
    var Container = require_container();
    var Node = require_node();
    var Comment = class extends Node {
      constructor(opts) {
        super(opts);
        this.type = "comment";
        this.inline = Object(opts).inline || false;
      }
      toString() {
        return [this.raws.before, this.inline ? "//" : "/*", String(this.value), this.inline ? "" : "*/", this.raws.after].join("");
      }
    };
    Container.registerWalker(Comment);
    module.exports = Comment;
  }
});
var require_function = __commonJS2({
  "node_modules/postcss-values-parser/lib/function.js"(exports, module) {
    "use strict";
    init_define_process();
    var Container = require_container();
    var FunctionNode = class extends Container {
      constructor(opts) {
        super(opts);
        this.type = "func";
        this.unbalanced = -1;
      }
    };
    Container.registerWalker(FunctionNode);
    module.exports = FunctionNode;
  }
});
var require_number = __commonJS2({
  "node_modules/postcss-values-parser/lib/number.js"(exports, module) {
    "use strict";
    init_define_process();
    var Container = require_container();
    var Node = require_node();
    var NumberNode = class extends Node {
      constructor(opts) {
        super(opts);
        this.type = "number";
        this.unit = Object(opts).unit || "";
      }
      toString() {
        return [this.raws.before, String(this.value), this.unit, this.raws.after].join("");
      }
    };
    Container.registerWalker(NumberNode);
    module.exports = NumberNode;
  }
});
var require_operator = __commonJS2({
  "node_modules/postcss-values-parser/lib/operator.js"(exports, module) {
    "use strict";
    init_define_process();
    var Container = require_container();
    var Node = require_node();
    var Operator = class extends Node {
      constructor(opts) {
        super(opts);
        this.type = "operator";
      }
    };
    Container.registerWalker(Operator);
    module.exports = Operator;
  }
});
var require_paren = __commonJS2({
  "node_modules/postcss-values-parser/lib/paren.js"(exports, module) {
    "use strict";
    init_define_process();
    var Container = require_container();
    var Node = require_node();
    var Parenthesis = class extends Node {
      constructor(opts) {
        super(opts);
        this.type = "paren";
        this.parenType = "";
      }
    };
    Container.registerWalker(Parenthesis);
    module.exports = Parenthesis;
  }
});
var require_string = __commonJS2({
  "node_modules/postcss-values-parser/lib/string.js"(exports, module) {
    "use strict";
    init_define_process();
    var Container = require_container();
    var Node = require_node();
    var StringNode = class extends Node {
      constructor(opts) {
        super(opts);
        this.type = "string";
      }
      toString() {
        let quote = this.quoted ? this.raws.quote : "";
        return [this.raws.before, quote, this.value + "", quote, this.raws.after].join("");
      }
    };
    Container.registerWalker(StringNode);
    module.exports = StringNode;
  }
});
var require_word = __commonJS2({
  "node_modules/postcss-values-parser/lib/word.js"(exports, module) {
    "use strict";
    init_define_process();
    var Container = require_container();
    var Node = require_node();
    var Word = class extends Node {
      constructor(opts) {
        super(opts);
        this.type = "word";
      }
    };
    Container.registerWalker(Word);
    module.exports = Word;
  }
});
var require_unicode_range = __commonJS2({
  "node_modules/postcss-values-parser/lib/unicode-range.js"(exports, module) {
    "use strict";
    init_define_process();
    var Container = require_container();
    var Node = require_node();
    var UnicodeRange = class extends Node {
      constructor(opts) {
        super(opts);
        this.type = "unicode-range";
      }
    };
    Container.registerWalker(UnicodeRange);
    module.exports = UnicodeRange;
  }
});
function defaultSetTimout() {
  throw new Error("setTimeout has not been defined");
}
function defaultClearTimeout() {
  throw new Error("clearTimeout has not been defined");
}
function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    return setTimeout(fun, 0);
  }
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e2) {
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    return clearTimeout(marker);
  }
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }
  try {
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      return cachedClearTimeout.call(null, marker);
    } catch (e2) {
      return cachedClearTimeout.call(this, marker);
    }
  }
}
function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length) {
    drainQueue();
  }
}
function drainQueue() {
  if (draining) {
    return;
  }
  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;
  while (len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}
function nextTick(fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }
  queue.push(new Item(fun, args));
  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
function noop() {
}
function binding(name) {
  throw new Error("process.binding is not supported");
}
function cwd() {
  return "/";
}
function chdir(dir) {
  throw new Error("process.chdir is not supported");
}
function umask() {
  return 0;
}
function hrtime(previousTimestamp) {
  var clocktime = performanceNow.call(performance) * 1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor(clocktime % 1 * 1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds < 0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }
  return [seconds, nanoseconds];
}
function uptime2() {
  var currentTime = new Date();
  var dif = currentTime - startTime;
  return dif / 1e3;
}
var cachedSetTimeout;
var cachedClearTimeout;
var queue;
var draining;
var currentQueue;
var queueIndex;
var title;
var platform2;
var browser;
var env;
var argv;
var version;
var versions;
var release2;
var config;
var on;
var addListener;
var once;
var off;
var removeListener;
var removeAllListeners;
var emit;
var performance;
var performanceNow;
var startTime;
var browser$1;
var process_default;
var init_process = __esm({
  "node-modules-polyfills:process"() {
    init_define_process();
    cachedSetTimeout = defaultSetTimout;
    cachedClearTimeout = defaultClearTimeout;
    if (typeof globalThis.setTimeout === "function") {
      cachedSetTimeout = setTimeout;
    }
    if (typeof globalThis.clearTimeout === "function") {
      cachedClearTimeout = clearTimeout;
    }
    queue = [];
    draining = false;
    queueIndex = -1;
    Item.prototype.run = function() {
      this.fun.apply(null, this.array);
    };
    title = "browser";
    platform2 = "browser";
    browser = true;
    env = {};
    argv = [];
    version = "";
    versions = {};
    release2 = {};
    config = {};
    on = noop;
    addListener = noop;
    once = noop;
    off = noop;
    removeListener = noop;
    removeAllListeners = noop;
    emit = noop;
    performance = globalThis.performance || {};
    performanceNow = performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function() {
      return new Date().getTime();
    };
    startTime = new Date();
    browser$1 = {
      nextTick,
      title,
      browser,
      env,
      argv,
      version,
      versions,
      on,
      addListener,
      once,
      off,
      removeListener,
      removeAllListeners,
      emit,
      binding,
      cwd,
      chdir,
      umask,
      hrtime,
      platform: platform2,
      release: release2,
      config,
      uptime: uptime2
    };
    process_default = browser$1;
  }
});
var inherits;
var inherits_default;
var init_inherits = __esm({
  "node_modules/rollup-plugin-node-polyfills/polyfills/inherits.js"() {
    init_define_process();
    if (typeof Object.create === "function") {
      inherits = function inherits2(ctor, superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
      };
    } else {
      inherits = function inherits2(ctor, superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {
        };
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      };
    }
    inherits_default = inherits;
  }
});
var util_exports = {};
__export(util_exports, {
  _extend: () => _extend,
  debuglog: () => debuglog,
  default: () => util_default,
  deprecate: () => deprecate,
  format: () => format,
  inherits: () => inherits_default,
  inspect: () => inspect,
  isArray: () => isArray,
  isBoolean: () => isBoolean,
  isBuffer: () => isBuffer,
  isDate: () => isDate,
  isError: () => isError,
  isFunction: () => isFunction,
  isNull: () => isNull,
  isNullOrUndefined: () => isNullOrUndefined,
  isNumber: () => isNumber,
  isObject: () => isObject,
  isPrimitive: () => isPrimitive,
  isRegExp: () => isRegExp,
  isString: () => isString,
  isSymbol: () => isSymbol,
  isUndefined: () => isUndefined,
  log: () => log
});
function format(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(" ");
  }
  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x2) {
    if (x2 === "%%")
      return "%";
    if (i >= len)
      return x2;
    switch (x2) {
      case "%s":
        return String(args[i++]);
      case "%d":
        return Number(args[i++]);
      case "%j":
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return "[Circular]";
        }
      default:
        return x2;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += " " + x;
    } else {
      str += " " + inspect(x);
    }
  }
  return str;
}
function deprecate(fn, msg) {
  if (isUndefined(globalThis.process)) {
    return function() {
      return deprecate(fn, msg).apply(this, arguments);
    };
  }
  if (process_default.noDeprecation === true) {
    return fn;
  }
  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process_default.throwDeprecation) {
        throw new Error(msg);
      } else if (process_default.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }
  return deprecated;
}
function debuglog(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process_default.env.NODE_DEBUG || "";
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp("\\b" + set + "\\b", "i").test(debugEnviron)) {
      var pid = 0;
      debugs[set] = function() {
        var msg = format.apply(null, arguments);
        console.error("%s %d: %s", set, pid, msg);
      };
    } else {
      debugs[set] = function() {
      };
    }
  }
  return debugs[set];
}
function inspect(obj, opts) {
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  if (arguments.length >= 3)
    ctx.depth = arguments[2];
  if (arguments.length >= 4)
    ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    ctx.showHidden = opts;
  } else if (opts) {
    _extend(ctx, opts);
  }
  if (isUndefined(ctx.showHidden))
    ctx.showHidden = false;
  if (isUndefined(ctx.depth))
    ctx.depth = 2;
  if (isUndefined(ctx.colors))
    ctx.colors = false;
  if (isUndefined(ctx.customInspect))
    ctx.customInspect = true;
  if (ctx.colors)
    ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];
  if (style) {
    return "\x1B[" + inspect.colors[style][0] + "m" + str + "\x1B[" + inspect.colors[style][1] + "m";
  } else {
    return str;
  }
}
function stylizeNoColor(str, styleType) {
  return str;
}
function arrayToHash(array) {
  var hash = {};
  array.forEach(function(val, idx) {
    hash[val] = true;
  });
  return hash;
}
function formatValue(ctx, value, recurseTimes) {
  if (ctx.customInspect && value && isFunction(value.inspect) && value.inspect !== inspect && !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);
  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }
  if (isError(value) && (keys.indexOf("message") >= 0 || keys.indexOf("description") >= 0)) {
    return formatError(value);
  }
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ": " + value.name : "";
      return ctx.stylize("[Function" + name + "]", "special");
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), "date");
    }
    if (isError(value)) {
      return formatError(value);
    }
  }
  var base = "", array = false, braces = ["{", "}"];
  if (isArray(value)) {
    array = true;
    braces = ["[", "]"];
  }
  if (isFunction(value)) {
    var n = value.name ? ": " + value.name : "";
    base = " [Function" + n + "]";
  }
  if (isRegExp(value)) {
    base = " " + RegExp.prototype.toString.call(value);
  }
  if (isDate(value)) {
    base = " " + Date.prototype.toUTCString.call(value);
  }
  if (isError(value)) {
    base = " " + formatError(value);
  }
  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }
  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
    } else {
      return ctx.stylize("[Object]", "special");
    }
  }
  ctx.seen.push(value);
  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }
  ctx.seen.pop();
  return reduceToSingleString(output, base, braces);
}
function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize("undefined", "undefined");
  if (isString(value)) {
    var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
    return ctx.stylize(simple, "string");
  }
  if (isNumber(value))
    return ctx.stylize("" + value, "number");
  if (isBoolean(value))
    return ctx.stylize("" + value, "boolean");
  if (isNull(value))
    return ctx.stylize("null", "null");
}
function formatError(value) {
  return "[" + Error.prototype.toString.call(value) + "]";
}
function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
    } else {
      output.push("");
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
    }
  });
  return output;
}
function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || {
    value: value[key]
  };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize("[Getter/Setter]", "special");
    } else {
      str = ctx.stylize("[Getter]", "special");
    }
  } else {
    if (desc.set) {
      str = ctx.stylize("[Setter]", "special");
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = "[" + key + "]";
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf("\n") > -1) {
        if (array) {
          str = str.split("\n").map(function(line) {
            return "  " + line;
          }).join("\n").substr(2);
        } else {
          str = "\n" + str.split("\n").map(function(line) {
            return "   " + line;
          }).join("\n");
        }
      }
    } else {
      str = ctx.stylize("[Circular]", "special");
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify("" + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, "name");
    } else {
      name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, "string");
    }
  }
  return name + ": " + str;
}
function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf("\n") >= 0)
      numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
  }, 0);
  if (length > 60) {
    return braces[0] + (base === "" ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1];
  }
  return braces[0] + base + " " + output.join(", ") + " " + braces[1];
}
function isArray(ar) {
  return Array.isArray(ar);
}
function isBoolean(arg) {
  return typeof arg === "boolean";
}
function isNull(arg) {
  return arg === null;
}
function isNullOrUndefined(arg) {
  return arg == null;
}
function isNumber(arg) {
  return typeof arg === "number";
}
function isString(arg) {
  return typeof arg === "string";
}
function isSymbol(arg) {
  return typeof arg === "symbol";
}
function isUndefined(arg) {
  return arg === void 0;
}
function isRegExp(re) {
  return isObject(re) && objectToString(re) === "[object RegExp]";
}
function isObject(arg) {
  return typeof arg === "object" && arg !== null;
}
function isDate(d) {
  return isObject(d) && objectToString(d) === "[object Date]";
}
function isError(e) {
  return isObject(e) && (objectToString(e) === "[object Error]" || e instanceof Error);
}
function isFunction(arg) {
  return typeof arg === "function";
}
function isPrimitive(arg) {
  return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || typeof arg === "undefined";
}
function isBuffer(maybeBuf) {
  return Buffer.isBuffer(maybeBuf);
}
function objectToString(o) {
  return Object.prototype.toString.call(o);
}
function pad(n) {
  return n < 10 ? "0" + n.toString(10) : n.toString(10);
}
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(":");
  return [d.getDate(), months[d.getMonth()], time].join(" ");
}
function log() {
  console.log("%s - %s", timestamp(), format.apply(null, arguments));
}
function _extend(origin, add) {
  if (!add || !isObject(add))
    return origin;
  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
}
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
var formatRegExp;
var debugs;
var debugEnviron;
var months;
var util_default;
var init_util = __esm({
  "node-modules-polyfills:util"() {
    init_define_process();
    init_process();
    init_inherits();
    formatRegExp = /%[sdj%]/g;
    debugs = {};
    inspect.colors = {
      "bold": [1, 22],
      "italic": [3, 23],
      "underline": [4, 24],
      "inverse": [7, 27],
      "white": [37, 39],
      "grey": [90, 39],
      "black": [30, 39],
      "blue": [34, 39],
      "cyan": [36, 39],
      "green": [32, 39],
      "magenta": [35, 39],
      "red": [31, 39],
      "yellow": [33, 39]
    };
    inspect.styles = {
      "special": "cyan",
      "number": "yellow",
      "boolean": "yellow",
      "undefined": "grey",
      "null": "bold",
      "string": "green",
      "date": "magenta",
      "regexp": "red"
    };
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    util_default = {
      inherits: inherits_default,
      _extend,
      log,
      isBuffer,
      isPrimitive,
      isFunction,
      isError,
      isDate,
      isObject,
      isRegExp,
      isUndefined,
      isSymbol,
      isString,
      isNumber,
      isNullOrUndefined,
      isNull,
      isBoolean,
      isArray,
      inspect,
      deprecate,
      format,
      debuglog
    };
  }
});
var require_util = __commonJS2({
  "node-modules-polyfills-commonjs:util"(exports, module) {
    init_define_process();
    var polyfill = (init_util(), __toCommonJS(util_exports));
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
var require_TokenizeError = __commonJS2({
  "node_modules/postcss-values-parser/lib/errors/TokenizeError.js"(exports, module) {
    "use strict";
    init_define_process();
    var TokenizeError = class extends Error {
      constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.message = message || "An error ocurred while tokzenizing.";
        if (typeof Error.captureStackTrace === "function") {
          Error.captureStackTrace(this, this.constructor);
        } else {
          this.stack = new Error(message).stack;
        }
      }
    };
    module.exports = TokenizeError;
  }
});
var require_tokenize = __commonJS2({
  "node_modules/postcss-values-parser/lib/tokenize.js"(exports, module) {
    "use strict";
    init_define_process();
    var openBracket = "{".charCodeAt(0);
    var closeBracket = "}".charCodeAt(0);
    var openParen = "(".charCodeAt(0);
    var closeParen = ")".charCodeAt(0);
    var singleQuote = "'".charCodeAt(0);
    var doubleQuote = '"'.charCodeAt(0);
    var backslash = "\\".charCodeAt(0);
    var slash = "/".charCodeAt(0);
    var period = ".".charCodeAt(0);
    var comma = ",".charCodeAt(0);
    var colon = ":".charCodeAt(0);
    var asterisk = "*".charCodeAt(0);
    var minus = "-".charCodeAt(0);
    var plus = "+".charCodeAt(0);
    var pound = "#".charCodeAt(0);
    var newline = "\n".charCodeAt(0);
    var space = " ".charCodeAt(0);
    var feed = "\f".charCodeAt(0);
    var tab = "	".charCodeAt(0);
    var cr = "\r".charCodeAt(0);
    var at = "@".charCodeAt(0);
    var lowerE = "e".charCodeAt(0);
    var upperE = "E".charCodeAt(0);
    var digit0 = "0".charCodeAt(0);
    var digit9 = "9".charCodeAt(0);
    var lowerU = "u".charCodeAt(0);
    var upperU = "U".charCodeAt(0);
    var atEnd = /[ \n\t\r\{\(\)'"\\;,/]/g;
    var wordEnd = /[ \n\t\r\(\)\{\}\*:;@!&'"\+\|~>,\[\]\\]|\/(?=\*)/g;
    var wordEndNum = /[ \n\t\r\(\)\{\}\*:;@!&'"\-\+\|~>,\[\]\\]|\//g;
    var alphaNum = /^[a-z0-9]/i;
    var unicodeRange = /^[a-f0-9?\-]/i;
    var util = require_util();
    var TokenizeError = require_TokenizeError();
    module.exports = function tokenize(input, options) {
      options = options || {};
      let tokens = [], css = input.valueOf(), length = css.length, offset = -1, line = 1, pos = 0, parentCount = 0, isURLArg = null, code, next, quote, lines, last, content, escape, nextLine, nextOffset, escaped, escapePos, nextChar;
      function unclosed(what) {
        let message = util.format("Unclosed %s at line: %d, column: %d, token: %d", what, line, pos - offset, pos);
        throw new TokenizeError(message);
      }
      function tokenizeError() {
        let message = util.format("Syntax error at line: %d, column: %d, token: %d", line, pos - offset, pos);
        throw new TokenizeError(message);
      }
      while (pos < length) {
        code = css.charCodeAt(pos);
        if (code === newline) {
          offset = pos;
          line += 1;
        }
        switch (code) {
          case newline:
          case space:
          case tab:
          case cr:
          case feed:
            next = pos;
            do {
              next += 1;
              code = css.charCodeAt(next);
              if (code === newline) {
                offset = next;
                line += 1;
              }
            } while (code === space || code === newline || code === tab || code === cr || code === feed);
            tokens.push(["space", css.slice(pos, next), line, pos - offset, line, next - offset, pos]);
            pos = next - 1;
            break;
          case colon:
            next = pos + 1;
            tokens.push(["colon", css.slice(pos, next), line, pos - offset, line, next - offset, pos]);
            pos = next - 1;
            break;
          case comma:
            next = pos + 1;
            tokens.push(["comma", css.slice(pos, next), line, pos - offset, line, next - offset, pos]);
            pos = next - 1;
            break;
          case openBracket:
            tokens.push(["{", "{", line, pos - offset, line, next - offset, pos]);
            break;
          case closeBracket:
            tokens.push(["}", "}", line, pos - offset, line, next - offset, pos]);
            break;
          case openParen:
            parentCount++;
            isURLArg = !isURLArg && parentCount === 1 && tokens.length > 0 && tokens[tokens.length - 1][0] === "word" && tokens[tokens.length - 1][1] === "url";
            tokens.push(["(", "(", line, pos - offset, line, next - offset, pos]);
            break;
          case closeParen:
            parentCount--;
            isURLArg = isURLArg && parentCount > 0;
            tokens.push([")", ")", line, pos - offset, line, next - offset, pos]);
            break;
          case singleQuote:
          case doubleQuote:
            quote = code === singleQuote ? "'" : '"';
            next = pos;
            do {
              escaped = false;
              next = css.indexOf(quote, next + 1);
              if (next === -1) {
                unclosed("quote", quote);
              }
              escapePos = next;
              while (css.charCodeAt(escapePos - 1) === backslash) {
                escapePos -= 1;
                escaped = !escaped;
              }
            } while (escaped);
            tokens.push(["string", css.slice(pos, next + 1), line, pos - offset, line, next - offset, pos]);
            pos = next;
            break;
          case at:
            atEnd.lastIndex = pos + 1;
            atEnd.test(css);
            if (atEnd.lastIndex === 0) {
              next = css.length - 1;
            } else {
              next = atEnd.lastIndex - 2;
            }
            tokens.push(["atword", css.slice(pos, next + 1), line, pos - offset, line, next - offset, pos]);
            pos = next;
            break;
          case backslash:
            next = pos;
            code = css.charCodeAt(next + 1);
            if (escape && code !== slash && code !== space && code !== newline && code !== tab && code !== cr && code !== feed) {
              next += 1;
            }
            tokens.push(["word", css.slice(pos, next + 1), line, pos - offset, line, next - offset, pos]);
            pos = next;
            break;
          case plus:
          case minus:
          case asterisk:
            next = pos + 1;
            nextChar = css.slice(pos + 1, next + 1);
            let prevChar = css.slice(pos - 1, pos);
            if (code === minus && nextChar.charCodeAt(0) === minus) {
              next++;
              tokens.push(["word", css.slice(pos, next), line, pos - offset, line, next - offset, pos]);
              pos = next - 1;
              break;
            }
            tokens.push(["operator", css.slice(pos, next), line, pos - offset, line, next - offset, pos]);
            pos = next - 1;
            break;
          default:
            if (code === slash && (css.charCodeAt(pos + 1) === asterisk || options.loose && !isURLArg && css.charCodeAt(pos + 1) === slash)) {
              const isStandardComment = css.charCodeAt(pos + 1) === asterisk;
              if (isStandardComment) {
                next = css.indexOf("*/", pos + 2) + 1;
                if (next === 0) {
                  unclosed("comment", "*/");
                }
              } else {
                const newlinePos = css.indexOf("\n", pos + 2);
                next = newlinePos !== -1 ? newlinePos - 1 : length;
              }
              content = css.slice(pos, next + 1);
              lines = content.split("\n");
              last = lines.length - 1;
              if (last > 0) {
                nextLine = line + last;
                nextOffset = next - lines[last].length;
              } else {
                nextLine = line;
                nextOffset = offset;
              }
              tokens.push(["comment", content, line, pos - offset, nextLine, next - nextOffset, pos]);
              offset = nextOffset;
              line = nextLine;
              pos = next;
            } else if (code === pound && !alphaNum.test(css.slice(pos + 1, pos + 2))) {
              next = pos + 1;
              tokens.push(["#", css.slice(pos, next), line, pos - offset, line, next - offset, pos]);
              pos = next - 1;
            } else if ((code === lowerU || code === upperU) && css.charCodeAt(pos + 1) === plus) {
              next = pos + 2;
              do {
                next += 1;
                code = css.charCodeAt(next);
              } while (next < length && unicodeRange.test(css.slice(next, next + 1)));
              tokens.push(["unicoderange", css.slice(pos, next), line, pos - offset, line, next - offset, pos]);
              pos = next - 1;
            } else if (code === slash) {
              next = pos + 1;
              tokens.push(["operator", css.slice(pos, next), line, pos - offset, line, next - offset, pos]);
              pos = next - 1;
            } else {
              let regex = wordEnd;
              if (code >= digit0 && code <= digit9) {
                regex = wordEndNum;
              }
              regex.lastIndex = pos + 1;
              regex.test(css);
              if (regex.lastIndex === 0) {
                next = css.length - 1;
              } else {
                next = regex.lastIndex - 2;
              }
              if (regex === wordEndNum || code === period) {
                let ncode = css.charCodeAt(next), ncode1 = css.charCodeAt(next + 1), ncode2 = css.charCodeAt(next + 2);
                if ((ncode === lowerE || ncode === upperE) && (ncode1 === minus || ncode1 === plus) && ncode2 >= digit0 && ncode2 <= digit9) {
                  wordEndNum.lastIndex = next + 2;
                  wordEndNum.test(css);
                  if (wordEndNum.lastIndex === 0) {
                    next = css.length - 1;
                  } else {
                    next = wordEndNum.lastIndex - 2;
                  }
                }
              }
              tokens.push(["word", css.slice(pos, next + 1), line, pos - offset, line, next - offset, pos]);
              pos = next;
            }
            break;
        }
        pos++;
      }
      return tokens;
    };
  }
});
var require_flatten = __commonJS2({
  "node_modules/flatten/index.js"(exports, module) {
    init_define_process();
    module.exports = function flatten(list, depth) {
      depth = typeof depth == "number" ? depth : Infinity;
      if (!depth) {
        if (Array.isArray(list)) {
          return list.map(function(i) {
            return i;
          });
        }
        return list;
      }
      return _flatten(list, 1);
      function _flatten(list2, d) {
        return list2.reduce(function(acc, item) {
          if (Array.isArray(item) && d < depth) {
            return acc.concat(_flatten(item, d + 1));
          } else {
            return acc.concat(item);
          }
        }, []);
      }
    };
  }
});
var require_indexes_of = __commonJS2({
  "node_modules/indexes-of/index.js"(exports, module) {
    init_define_process();
    module.exports = function(ary, item) {
      var i = -1, indexes = [];
      while ((i = ary.indexOf(item, i + 1)) !== -1)
        indexes.push(i);
      return indexes;
    };
  }
});
var require_uniq = __commonJS2({
  "node_modules/uniq/uniq.js"(exports, module) {
    "use strict";
    init_define_process();
    function unique_pred(list, compare) {
      var ptr = 1, len = list.length, a = list[0], b = list[0];
      for (var i = 1; i < len; ++i) {
        b = a;
        a = list[i];
        if (compare(a, b)) {
          if (i === ptr) {
            ptr++;
            continue;
          }
          list[ptr++] = a;
        }
      }
      list.length = ptr;
      return list;
    }
    function unique_eq(list) {
      var ptr = 1, len = list.length, a = list[0], b = list[0];
      for (var i = 1; i < len; ++i, b = a) {
        b = a;
        a = list[i];
        if (a !== b) {
          if (i === ptr) {
            ptr++;
            continue;
          }
          list[ptr++] = a;
        }
      }
      list.length = ptr;
      return list;
    }
    function unique(list, compare, sorted) {
      if (list.length === 0) {
        return list;
      }
      if (compare) {
        if (!sorted) {
          list.sort(compare);
        }
        return unique_pred(list, compare);
      }
      if (!sorted) {
        list.sort();
      }
      return unique_eq(list);
    }
    module.exports = unique;
  }
});
var require_ParserError = __commonJS2({
  "node_modules/postcss-values-parser/lib/errors/ParserError.js"(exports, module) {
    "use strict";
    init_define_process();
    var ParserError = class extends Error {
      constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.message = message || "An error ocurred while parsing.";
        if (typeof Error.captureStackTrace === "function") {
          Error.captureStackTrace(this, this.constructor);
        } else {
          this.stack = new Error(message).stack;
        }
      }
    };
    module.exports = ParserError;
  }
});
var require_parser = __commonJS2({
  "node_modules/postcss-values-parser/lib/parser.js"(exports, module) {
    "use strict";
    init_define_process();
    var Root = require_root();
    var Value = require_value();
    var AtWord = require_atword();
    var Colon = require_colon();
    var Comma = require_comma();
    var Comment = require_comment();
    var Func = require_function();
    var Numbr = require_number();
    var Operator = require_operator();
    var Paren = require_paren();
    var Str = require_string();
    var Word = require_word();
    var UnicodeRange = require_unicode_range();
    var tokenize = require_tokenize();
    var flatten = require_flatten();
    var indexesOf = require_indexes_of();
    var uniq = require_uniq();
    var ParserError = require_ParserError();
    function sortAscending(list) {
      return list.sort((a, b) => a - b);
    }
    module.exports = class Parser {
      constructor(input, options) {
        const defaults = {
          loose: false
        };
        this.cache = [];
        this.input = input;
        this.options = Object.assign({}, defaults, options);
        this.position = 0;
        this.unbalanced = 0;
        this.root = new Root();
        let value = new Value();
        this.root.append(value);
        this.current = value;
        this.tokens = tokenize(input, this.options);
      }
      parse() {
        return this.loop();
      }
      colon() {
        let token = this.currToken;
        this.newNode(new Colon({
          value: token[1],
          source: {
            start: {
              line: token[2],
              column: token[3]
            },
            end: {
              line: token[4],
              column: token[5]
            }
          },
          sourceIndex: token[6]
        }));
        this.position++;
      }
      comma() {
        let token = this.currToken;
        this.newNode(new Comma({
          value: token[1],
          source: {
            start: {
              line: token[2],
              column: token[3]
            },
            end: {
              line: token[4],
              column: token[5]
            }
          },
          sourceIndex: token[6]
        }));
        this.position++;
      }
      comment() {
        let inline = false, value = this.currToken[1].replace(/\/\*|\*\//g, ""), node;
        if (this.options.loose && value.startsWith("//")) {
          value = value.substring(2);
          inline = true;
        }
        node = new Comment({
          value,
          inline,
          source: {
            start: {
              line: this.currToken[2],
              column: this.currToken[3]
            },
            end: {
              line: this.currToken[4],
              column: this.currToken[5]
            }
          },
          sourceIndex: this.currToken[6]
        });
        this.newNode(node);
        this.position++;
      }
      error(message, token) {
        throw new ParserError(message + ` at line: ${token[2]}, column ${token[3]}`);
      }
      loop() {
        while (this.position < this.tokens.length) {
          this.parseTokens();
        }
        if (!this.current.last && this.spaces) {
          this.current.raws.before += this.spaces;
        } else if (this.spaces) {
          this.current.last.raws.after += this.spaces;
        }
        this.spaces = "";
        return this.root;
      }
      operator() {
        let char = this.currToken[1], node;
        if (char === "+" || char === "-") {
          if (!this.options.loose) {
            if (this.position > 0) {
              if (this.current.type === "func" && this.current.value === "calc") {
                if (this.prevToken[0] !== "space" && this.prevToken[0] !== "(") {
                  this.error("Syntax Error", this.currToken);
                } else if (this.nextToken[0] !== "space" && this.nextToken[0] !== "word") {
                  this.error("Syntax Error", this.currToken);
                } else if (this.nextToken[0] === "word" && this.current.last.type !== "operator" && this.current.last.value !== "(") {
                  this.error("Syntax Error", this.currToken);
                }
              } else if (this.nextToken[0] === "space" || this.nextToken[0] === "operator" || this.prevToken[0] === "operator") {
                this.error("Syntax Error", this.currToken);
              }
            }
          }
          if (!this.options.loose) {
            if (this.nextToken[0] === "word") {
              return this.word();
            }
          } else {
            if ((!this.current.nodes.length || this.current.last && this.current.last.type === "operator") && this.nextToken[0] === "word") {
              return this.word();
            }
          }
        }
        node = new Operator({
          value: this.currToken[1],
          source: {
            start: {
              line: this.currToken[2],
              column: this.currToken[3]
            },
            end: {
              line: this.currToken[2],
              column: this.currToken[3]
            }
          },
          sourceIndex: this.currToken[4]
        });
        this.position++;
        return this.newNode(node);
      }
      parseTokens() {
        switch (this.currToken[0]) {
          case "space":
            this.space();
            break;
          case "colon":
            this.colon();
            break;
          case "comma":
            this.comma();
            break;
          case "comment":
            this.comment();
            break;
          case "(":
            this.parenOpen();
            break;
          case ")":
            this.parenClose();
            break;
          case "atword":
          case "word":
            this.word();
            break;
          case "operator":
            this.operator();
            break;
          case "string":
            this.string();
            break;
          case "unicoderange":
            this.unicodeRange();
            break;
          default:
            this.word();
            break;
        }
      }
      parenOpen() {
        let unbalanced = 1, pos = this.position + 1, token = this.currToken, last;
        while (pos < this.tokens.length && unbalanced) {
          let tkn = this.tokens[pos];
          if (tkn[0] === "(") {
            unbalanced++;
          }
          if (tkn[0] === ")") {
            unbalanced--;
          }
          pos++;
        }
        if (unbalanced) {
          this.error("Expected closing parenthesis", token);
        }
        last = this.current.last;
        if (last && last.type === "func" && last.unbalanced < 0) {
          last.unbalanced = 0;
          this.current = last;
        }
        this.current.unbalanced++;
        this.newNode(new Paren({
          value: token[1],
          source: {
            start: {
              line: token[2],
              column: token[3]
            },
            end: {
              line: token[4],
              column: token[5]
            }
          },
          sourceIndex: token[6]
        }));
        this.position++;
        if (this.current.type === "func" && this.current.unbalanced && this.current.value === "url" && this.currToken[0] !== "string" && this.currToken[0] !== ")" && !this.options.loose) {
          let nextToken = this.nextToken, value = this.currToken[1], start = {
            line: this.currToken[2],
            column: this.currToken[3]
          };
          while (nextToken && nextToken[0] !== ")" && this.current.unbalanced) {
            this.position++;
            value += this.currToken[1];
            nextToken = this.nextToken;
          }
          if (this.position !== this.tokens.length - 1) {
            this.position++;
            this.newNode(new Word({
              value,
              source: {
                start,
                end: {
                  line: this.currToken[4],
                  column: this.currToken[5]
                }
              },
              sourceIndex: this.currToken[6]
            }));
          }
        }
      }
      parenClose() {
        let token = this.currToken;
        this.newNode(new Paren({
          value: token[1],
          source: {
            start: {
              line: token[2],
              column: token[3]
            },
            end: {
              line: token[4],
              column: token[5]
            }
          },
          sourceIndex: token[6]
        }));
        this.position++;
        if (this.position >= this.tokens.length - 1 && !this.current.unbalanced) {
          return;
        }
        this.current.unbalanced--;
        if (this.current.unbalanced < 0) {
          this.error("Expected opening parenthesis", token);
        }
        if (!this.current.unbalanced && this.cache.length) {
          this.current = this.cache.pop();
        }
      }
      space() {
        let token = this.currToken;
        if (this.position === this.tokens.length - 1 || this.nextToken[0] === "," || this.nextToken[0] === ")") {
          this.current.last.raws.after += token[1];
          this.position++;
        } else {
          this.spaces = token[1];
          this.position++;
        }
      }
      unicodeRange() {
        let token = this.currToken;
        this.newNode(new UnicodeRange({
          value: token[1],
          source: {
            start: {
              line: token[2],
              column: token[3]
            },
            end: {
              line: token[4],
              column: token[5]
            }
          },
          sourceIndex: token[6]
        }));
        this.position++;
      }
      splitWord() {
        let nextToken = this.nextToken, word = this.currToken[1], rNumber = /^[\+\-]?((\d+(\.\d*)?)|(\.\d+))([eE][\+\-]?\d+)?/, rNoFollow = /^(?!\#([a-z0-9]+))[\#\{\}]/gi, hasAt, indices;
        if (!rNoFollow.test(word)) {
          while (nextToken && nextToken[0] === "word") {
            this.position++;
            let current = this.currToken[1];
            word += current;
            nextToken = this.nextToken;
          }
        }
        hasAt = indexesOf(word, "@");
        indices = sortAscending(uniq(flatten([[0], hasAt])));
        indices.forEach((ind, i) => {
          let index = indices[i + 1] || word.length, value = word.slice(ind, index), node;
          if (~hasAt.indexOf(ind)) {
            node = new AtWord({
              value: value.slice(1),
              source: {
                start: {
                  line: this.currToken[2],
                  column: this.currToken[3] + ind
                },
                end: {
                  line: this.currToken[4],
                  column: this.currToken[3] + (index - 1)
                }
              },
              sourceIndex: this.currToken[6] + indices[i]
            });
          } else if (rNumber.test(this.currToken[1])) {
            let unit = value.replace(rNumber, "");
            node = new Numbr({
              value: value.replace(unit, ""),
              source: {
                start: {
                  line: this.currToken[2],
                  column: this.currToken[3] + ind
                },
                end: {
                  line: this.currToken[4],
                  column: this.currToken[3] + (index - 1)
                }
              },
              sourceIndex: this.currToken[6] + indices[i],
              unit
            });
          } else {
            node = new (nextToken && nextToken[0] === "(" ? Func : Word)({
              value,
              source: {
                start: {
                  line: this.currToken[2],
                  column: this.currToken[3] + ind
                },
                end: {
                  line: this.currToken[4],
                  column: this.currToken[3] + (index - 1)
                }
              },
              sourceIndex: this.currToken[6] + indices[i]
            });
            if (node.type === "word") {
              node.isHex = /^#(.+)/.test(value);
              node.isColor = /^#([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(value);
            } else {
              this.cache.push(this.current);
            }
          }
          this.newNode(node);
        });
        this.position++;
      }
      string() {
        let token = this.currToken, value = this.currToken[1], rQuote = /^(\"|\')/, quoted = rQuote.test(value), quote = "", node;
        if (quoted) {
          quote = value.match(rQuote)[0];
          value = value.slice(1, value.length - 1);
        }
        node = new Str({
          value,
          source: {
            start: {
              line: token[2],
              column: token[3]
            },
            end: {
              line: token[4],
              column: token[5]
            }
          },
          sourceIndex: token[6],
          quoted
        });
        node.raws.quote = quote;
        this.newNode(node);
        this.position++;
      }
      word() {
        return this.splitWord();
      }
      newNode(node) {
        if (this.spaces) {
          node.raws.before += this.spaces;
          this.spaces = "";
        }
        return this.current.append(node);
      }
      get currToken() {
        return this.tokens[this.position];
      }
      get nextToken() {
        return this.tokens[this.position + 1];
      }
      get prevToken() {
        return this.tokens[this.position - 1];
      }
    };
  }
});
var require_lib = __commonJS2({
  "node_modules/postcss-values-parser/lib/index.js"(exports, module) {
    "use strict";
    init_define_process();
    var Parser = require_parser();
    var AtWord = require_atword();
    var Colon = require_colon();
    var Comma = require_comma();
    var Comment = require_comment();
    var Func = require_function();
    var Num = require_number();
    var Operator = require_operator();
    var Paren = require_paren();
    var Str = require_string();
    var UnicodeRange = require_unicode_range();
    var Value = require_value();
    var Word = require_word();
    var parser = function(source, options) {
      return new Parser(source, options);
    };
    parser.atword = function(opts) {
      return new AtWord(opts);
    };
    parser.colon = function(opts) {
      return new Colon(Object.assign({
        value: ":"
      }, opts));
    };
    parser.comma = function(opts) {
      return new Comma(Object.assign({
        value: ","
      }, opts));
    };
    parser.comment = function(opts) {
      return new Comment(opts);
    };
    parser.func = function(opts) {
      return new Func(opts);
    };
    parser.number = function(opts) {
      return new Num(opts);
    };
    parser.operator = function(opts) {
      return new Operator(opts);
    };
    parser.paren = function(opts) {
      return new Paren(Object.assign({
        value: "("
      }, opts));
    };
    parser.string = function(opts) {
      return new Str(Object.assign({
        quote: "'"
      }, opts));
    };
    parser.value = function(opts) {
      return new Value(opts);
    };
    parser.word = function(opts) {
      return new Word(opts);
    };
    parser.unicodeRange = function(opts) {
      return new UnicodeRange(opts);
    };
    module.exports = parser;
  }
});
var require_node2 = __commonJS2({
  "node_modules/postcss-selector-parser/dist/selectors/node.js"(exports, module) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var cloneNode = function cloneNode2(obj, parent) {
      if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) !== "object") {
        return obj;
      }
      var cloned = new obj.constructor();
      for (var i in obj) {
        if (!obj.hasOwnProperty(i)) {
          continue;
        }
        var value = obj[i];
        var type2 = typeof value === "undefined" ? "undefined" : _typeof(value);
        if (i === "parent" && type2 === "object") {
          if (parent) {
            cloned[i] = parent;
          }
        } else if (value instanceof Array) {
          cloned[i] = value.map(function(j) {
            return cloneNode2(j, cloned);
          });
        } else {
          cloned[i] = cloneNode2(value, cloned);
        }
      }
      return cloned;
    };
    var _class = function() {
      function _class2() {
        var opts = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        _classCallCheck(this, _class2);
        for (var key in opts) {
          this[key] = opts[key];
        }
        var _opts$spaces = opts.spaces;
        _opts$spaces = _opts$spaces === void 0 ? {} : _opts$spaces;
        var _opts$spaces$before = _opts$spaces.before, before = _opts$spaces$before === void 0 ? "" : _opts$spaces$before, _opts$spaces$after = _opts$spaces.after, after = _opts$spaces$after === void 0 ? "" : _opts$spaces$after;
        this.spaces = {
          before,
          after
        };
      }
      _class2.prototype.remove = function remove() {
        if (this.parent) {
          this.parent.removeChild(this);
        }
        this.parent = void 0;
        return this;
      };
      _class2.prototype.replaceWith = function replaceWith() {
        if (this.parent) {
          for (var index in arguments) {
            this.parent.insertBefore(this, arguments[index]);
          }
          this.remove();
        }
        return this;
      };
      _class2.prototype.next = function next() {
        return this.parent.at(this.parent.index(this) + 1);
      };
      _class2.prototype.prev = function prev() {
        return this.parent.at(this.parent.index(this) - 1);
      };
      _class2.prototype.clone = function clone() {
        var overrides = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var cloned = cloneNode(this);
        for (var name in overrides) {
          cloned[name] = overrides[name];
        }
        return cloned;
      };
      _class2.prototype.toString = function toString() {
        return [this.spaces.before, String(this.value), this.spaces.after].join("");
      };
      return _class2;
    }();
    exports.default = _class;
    module.exports = exports["default"];
  }
});
var require_types = __commonJS2({
  "node_modules/postcss-selector-parser/dist/selectors/types.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var TAG = exports.TAG = "tag";
    var STRING = exports.STRING = "string";
    var SELECTOR = exports.SELECTOR = "selector";
    var ROOT = exports.ROOT = "root";
    var PSEUDO = exports.PSEUDO = "pseudo";
    var NESTING = exports.NESTING = "nesting";
    var ID = exports.ID = "id";
    var COMMENT = exports.COMMENT = "comment";
    var COMBINATOR = exports.COMBINATOR = "combinator";
    var CLASS = exports.CLASS = "class";
    var ATTRIBUTE = exports.ATTRIBUTE = "attribute";
    var UNIVERSAL = exports.UNIVERSAL = "universal";
  }
});
var require_container2 = __commonJS2({
  "node_modules/postcss-selector-parser/dist/selectors/container.js"(exports, module) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var _createClass = function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _node = require_node2();
    var _node2 = _interopRequireDefault(_node);
    var _types = require_types();
    var types = _interopRequireWildcard(_types);
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      } else {
        var newObj = {};
        if (obj != null) {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key))
              newObj[key] = obj[key];
          }
        }
        newObj.default = obj;
        return newObj;
      }
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self2, call) {
      if (!self2) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self2;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var Container = function(_Node) {
      _inherits(Container2, _Node);
      function Container2(opts) {
        _classCallCheck(this, Container2);
        var _this = _possibleConstructorReturn(this, _Node.call(this, opts));
        if (!_this.nodes) {
          _this.nodes = [];
        }
        return _this;
      }
      Container2.prototype.append = function append(selector) {
        selector.parent = this;
        this.nodes.push(selector);
        return this;
      };
      Container2.prototype.prepend = function prepend(selector) {
        selector.parent = this;
        this.nodes.unshift(selector);
        return this;
      };
      Container2.prototype.at = function at(index) {
        return this.nodes[index];
      };
      Container2.prototype.index = function index(child) {
        if (typeof child === "number") {
          return child;
        }
        return this.nodes.indexOf(child);
      };
      Container2.prototype.removeChild = function removeChild(child) {
        child = this.index(child);
        this.at(child).parent = void 0;
        this.nodes.splice(child, 1);
        var index = void 0;
        for (var id in this.indexes) {
          index = this.indexes[id];
          if (index >= child) {
            this.indexes[id] = index - 1;
          }
        }
        return this;
      };
      Container2.prototype.removeAll = function removeAll() {
        for (var _iterator = this.nodes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ; ) {
          var _ref;
          if (_isArray) {
            if (_i >= _iterator.length)
              break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done)
              break;
            _ref = _i.value;
          }
          var node = _ref;
          node.parent = void 0;
        }
        this.nodes = [];
        return this;
      };
      Container2.prototype.empty = function empty() {
        return this.removeAll();
      };
      Container2.prototype.insertAfter = function insertAfter(oldNode, newNode) {
        var oldIndex = this.index(oldNode);
        this.nodes.splice(oldIndex + 1, 0, newNode);
        var index = void 0;
        for (var id in this.indexes) {
          index = this.indexes[id];
          if (oldIndex <= index) {
            this.indexes[id] = index + this.nodes.length;
          }
        }
        return this;
      };
      Container2.prototype.insertBefore = function insertBefore(oldNode, newNode) {
        var oldIndex = this.index(oldNode);
        this.nodes.splice(oldIndex, 0, newNode);
        var index = void 0;
        for (var id in this.indexes) {
          index = this.indexes[id];
          if (oldIndex <= index) {
            this.indexes[id] = index + this.nodes.length;
          }
        }
        return this;
      };
      Container2.prototype.each = function each(callback) {
        if (!this.lastEach) {
          this.lastEach = 0;
        }
        if (!this.indexes) {
          this.indexes = {};
        }
        this.lastEach++;
        var id = this.lastEach;
        this.indexes[id] = 0;
        if (!this.length) {
          return void 0;
        }
        var index = void 0, result = void 0;
        while (this.indexes[id] < this.length) {
          index = this.indexes[id];
          result = callback(this.at(index), index);
          if (result === false) {
            break;
          }
          this.indexes[id] += 1;
        }
        delete this.indexes[id];
        if (result === false) {
          return false;
        }
      };
      Container2.prototype.walk = function walk(callback) {
        return this.each(function(node, i) {
          var result = callback(node, i);
          if (result !== false && node.length) {
            result = node.walk(callback);
          }
          if (result === false) {
            return false;
          }
        });
      };
      Container2.prototype.walkAttributes = function walkAttributes(callback) {
        var _this2 = this;
        return this.walk(function(selector) {
          if (selector.type === types.ATTRIBUTE) {
            return callback.call(_this2, selector);
          }
        });
      };
      Container2.prototype.walkClasses = function walkClasses(callback) {
        var _this3 = this;
        return this.walk(function(selector) {
          if (selector.type === types.CLASS) {
            return callback.call(_this3, selector);
          }
        });
      };
      Container2.prototype.walkCombinators = function walkCombinators(callback) {
        var _this4 = this;
        return this.walk(function(selector) {
          if (selector.type === types.COMBINATOR) {
            return callback.call(_this4, selector);
          }
        });
      };
      Container2.prototype.walkComments = function walkComments(callback) {
        var _this5 = this;
        return this.walk(function(selector) {
          if (selector.type === types.COMMENT) {
            return callback.call(_this5, selector);
          }
        });
      };
      Container2.prototype.walkIds = function walkIds(callback) {
        var _this6 = this;
        return this.walk(function(selector) {
          if (selector.type === types.ID) {
            return callback.call(_this6, selector);
          }
        });
      };
      Container2.prototype.walkNesting = function walkNesting(callback) {
        var _this7 = this;
        return this.walk(function(selector) {
          if (selector.type === types.NESTING) {
            return callback.call(_this7, selector);
          }
        });
      };
      Container2.prototype.walkPseudos = function walkPseudos(callback) {
        var _this8 = this;
        return this.walk(function(selector) {
          if (selector.type === types.PSEUDO) {
            return callback.call(_this8, selector);
          }
        });
      };
      Container2.prototype.walkTags = function walkTags(callback) {
        var _this9 = this;
        return this.walk(function(selector) {
          if (selector.type === types.TAG) {
            return callback.call(_this9, selector);
          }
        });
      };
      Container2.prototype.walkUniversals = function walkUniversals(callback) {
        var _this10 = this;
        return this.walk(function(selector) {
          if (selector.type === types.UNIVERSAL) {
            return callback.call(_this10, selector);
          }
        });
      };
      Container2.prototype.split = function split(callback) {
        var _this11 = this;
        var current = [];
        return this.reduce(function(memo, node, index) {
          var split2 = callback.call(_this11, node);
          current.push(node);
          if (split2) {
            memo.push(current);
            current = [];
          } else if (index === _this11.length - 1) {
            memo.push(current);
          }
          return memo;
        }, []);
      };
      Container2.prototype.map = function map(callback) {
        return this.nodes.map(callback);
      };
      Container2.prototype.reduce = function reduce(callback, memo) {
        return this.nodes.reduce(callback, memo);
      };
      Container2.prototype.every = function every(callback) {
        return this.nodes.every(callback);
      };
      Container2.prototype.some = function some(callback) {
        return this.nodes.some(callback);
      };
      Container2.prototype.filter = function filter2(callback) {
        return this.nodes.filter(callback);
      };
      Container2.prototype.sort = function sort(callback) {
        return this.nodes.sort(callback);
      };
      Container2.prototype.toString = function toString() {
        return this.map(String).join("");
      };
      _createClass(Container2, [{
        key: "first",
        get: function get() {
          return this.at(0);
        }
      }, {
        key: "last",
        get: function get() {
          return this.at(this.length - 1);
        }
      }, {
        key: "length",
        get: function get() {
          return this.nodes.length;
        }
      }]);
      return Container2;
    }(_node2.default);
    exports.default = Container;
    module.exports = exports["default"];
  }
});
var require_root2 = __commonJS2({
  "node_modules/postcss-selector-parser/dist/selectors/root.js"(exports, module) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var _container = require_container2();
    var _container2 = _interopRequireDefault(_container);
    var _types = require_types();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self2, call) {
      if (!self2) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self2;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var Root = function(_Container) {
      _inherits(Root2, _Container);
      function Root2(opts) {
        _classCallCheck(this, Root2);
        var _this = _possibleConstructorReturn(this, _Container.call(this, opts));
        _this.type = _types.ROOT;
        return _this;
      }
      Root2.prototype.toString = function toString() {
        var str = this.reduce(function(memo, selector) {
          var sel = String(selector);
          return sel ? memo + sel + "," : "";
        }, "").slice(0, -1);
        return this.trailingComma ? str + "," : str;
      };
      return Root2;
    }(_container2.default);
    exports.default = Root;
    module.exports = exports["default"];
  }
});
var require_selector = __commonJS2({
  "node_modules/postcss-selector-parser/dist/selectors/selector.js"(exports, module) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var _container = require_container2();
    var _container2 = _interopRequireDefault(_container);
    var _types = require_types();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self2, call) {
      if (!self2) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self2;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var Selector = function(_Container) {
      _inherits(Selector2, _Container);
      function Selector2(opts) {
        _classCallCheck(this, Selector2);
        var _this = _possibleConstructorReturn(this, _Container.call(this, opts));
        _this.type = _types.SELECTOR;
        return _this;
      }
      return Selector2;
    }(_container2.default);
    exports.default = Selector;
    module.exports = exports["default"];
  }
});
var require_namespace = __commonJS2({
  "node_modules/postcss-selector-parser/dist/selectors/namespace.js"(exports, module) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var _createClass = function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _node = require_node2();
    var _node2 = _interopRequireDefault(_node);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self2, call) {
      if (!self2) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self2;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var Namespace = function(_Node) {
      _inherits(Namespace2, _Node);
      function Namespace2() {
        _classCallCheck(this, Namespace2);
        return _possibleConstructorReturn(this, _Node.apply(this, arguments));
      }
      Namespace2.prototype.toString = function toString() {
        return [this.spaces.before, this.ns, String(this.value), this.spaces.after].join("");
      };
      _createClass(Namespace2, [{
        key: "ns",
        get: function get() {
          var n = this.namespace;
          return n ? (typeof n === "string" ? n : "") + "|" : "";
        }
      }]);
      return Namespace2;
    }(_node2.default);
    exports.default = Namespace;
    module.exports = exports["default"];
  }
});
var require_className = __commonJS2({
  "node_modules/postcss-selector-parser/dist/selectors/className.js"(exports, module) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var _namespace = require_namespace();
    var _namespace2 = _interopRequireDefault(_namespace);
    var _types = require_types();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self2, call) {
      if (!self2) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self2;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var ClassName = function(_Namespace) {
      _inherits(ClassName2, _Namespace);
      function ClassName2(opts) {
        _classCallCheck(this, ClassName2);
        var _this = _possibleConstructorReturn(this, _Namespace.call(this, opts));
        _this.type = _types.CLASS;
        return _this;
      }
      ClassName2.prototype.toString = function toString() {
        return [this.spaces.before, this.ns, String("." + this.value), this.spaces.after].join("");
      };
      return ClassName2;
    }(_namespace2.default);
    exports.default = ClassName;
    module.exports = exports["default"];
  }
});
var require_comment2 = __commonJS2({
  "node_modules/postcss-selector-parser/dist/selectors/comment.js"(exports, module) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var _node = require_node2();
    var _node2 = _interopRequireDefault(_node);
    var _types = require_types();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self2, call) {
      if (!self2) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self2;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var Comment = function(_Node) {
      _inherits(Comment2, _Node);
      function Comment2(opts) {
        _classCallCheck(this, Comment2);
        var _this = _possibleConstructorReturn(this, _Node.call(this, opts));
        _this.type = _types.COMMENT;
        return _this;
      }
      return Comment2;
    }(_node2.default);
    exports.default = Comment;
    module.exports = exports["default"];
  }
});
var require_id = __commonJS2({
  "node_modules/postcss-selector-parser/dist/selectors/id.js"(exports, module) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var _namespace = require_namespace();
    var _namespace2 = _interopRequireDefault(_namespace);
    var _types = require_types();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self2, call) {
      if (!self2) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self2;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var ID = function(_Namespace) {
      _inherits(ID2, _Namespace);
      function ID2(opts) {
        _classCallCheck(this, ID2);
        var _this = _possibleConstructorReturn(this, _Namespace.call(this, opts));
        _this.type = _types.ID;
        return _this;
      }
      ID2.prototype.toString = function toString() {
        return [this.spaces.before, this.ns, String("#" + this.value), this.spaces.after].join("");
      };
      return ID2;
    }(_namespace2.default);
    exports.default = ID;
    module.exports = exports["default"];
  }
});
var require_tag = __commonJS2({
  "node_modules/postcss-selector-parser/dist/selectors/tag.js"(exports, module) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var _namespace = require_namespace();
    var _namespace2 = _interopRequireDefault(_namespace);
    var _types = require_types();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self2, call) {
      if (!self2) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self2;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var Tag = function(_Namespace) {
      _inherits(Tag2, _Namespace);
      function Tag2(opts) {
        _classCallCheck(this, Tag2);
        var _this = _possibleConstructorReturn(this, _Namespace.call(this, opts));
        _this.type = _types.TAG;
        return _this;
      }
      return Tag2;
    }(_namespace2.default);
    exports.default = Tag;
    module.exports = exports["default"];
  }
});
var require_string2 = __commonJS2({
  "node_modules/postcss-selector-parser/dist/selectors/string.js"(exports, module) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var _node = require_node2();
    var _node2 = _interopRequireDefault(_node);
    var _types = require_types();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self2, call) {
      if (!self2) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self2;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var String2 = function(_Node) {
      _inherits(String3, _Node);
      function String3(opts) {
        _classCallCheck(this, String3);
        var _this = _possibleConstructorReturn(this, _Node.call(this, opts));
        _this.type = _types.STRING;
        return _this;
      }
      return String3;
    }(_node2.default);
    exports.default = String2;
    module.exports = exports["default"];
  }
});
var require_pseudo = __commonJS2({
  "node_modules/postcss-selector-parser/dist/selectors/pseudo.js"(exports, module) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var _container = require_container2();
    var _container2 = _interopRequireDefault(_container);
    var _types = require_types();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self2, call) {
      if (!self2) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self2;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var Pseudo = function(_Container) {
      _inherits(Pseudo2, _Container);
      function Pseudo2(opts) {
        _classCallCheck(this, Pseudo2);
        var _this = _possibleConstructorReturn(this, _Container.call(this, opts));
        _this.type = _types.PSEUDO;
        return _this;
      }
      Pseudo2.prototype.toString = function toString() {
        var params = this.length ? "(" + this.map(String).join(",") + ")" : "";
        return [this.spaces.before, String(this.value), params, this.spaces.after].join("");
      };
      return Pseudo2;
    }(_container2.default);
    exports.default = Pseudo;
    module.exports = exports["default"];
  }
});
var require_attribute = __commonJS2({
  "node_modules/postcss-selector-parser/dist/selectors/attribute.js"(exports, module) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var _namespace = require_namespace();
    var _namespace2 = _interopRequireDefault(_namespace);
    var _types = require_types();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self2, call) {
      if (!self2) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self2;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var Attribute = function(_Namespace) {
      _inherits(Attribute2, _Namespace);
      function Attribute2(opts) {
        _classCallCheck(this, Attribute2);
        var _this = _possibleConstructorReturn(this, _Namespace.call(this, opts));
        _this.type = _types.ATTRIBUTE;
        _this.raws = {};
        return _this;
      }
      Attribute2.prototype.toString = function toString() {
        var selector = [this.spaces.before, "[", this.ns, this.attribute];
        if (this.operator) {
          selector.push(this.operator);
        }
        if (this.value) {
          selector.push(this.value);
        }
        if (this.raws.insensitive) {
          selector.push(this.raws.insensitive);
        } else if (this.insensitive) {
          selector.push(" i");
        }
        selector.push("]");
        return selector.concat(this.spaces.after).join("");
      };
      return Attribute2;
    }(_namespace2.default);
    exports.default = Attribute;
    module.exports = exports["default"];
  }
});
var require_universal = __commonJS2({
  "node_modules/postcss-selector-parser/dist/selectors/universal.js"(exports, module) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var _namespace = require_namespace();
    var _namespace2 = _interopRequireDefault(_namespace);
    var _types = require_types();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self2, call) {
      if (!self2) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self2;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var Universal = function(_Namespace) {
      _inherits(Universal2, _Namespace);
      function Universal2(opts) {
        _classCallCheck(this, Universal2);
        var _this = _possibleConstructorReturn(this, _Namespace.call(this, opts));
        _this.type = _types.UNIVERSAL;
        _this.value = "*";
        return _this;
      }
      return Universal2;
    }(_namespace2.default);
    exports.default = Universal;
    module.exports = exports["default"];
  }
});
var require_combinator = __commonJS2({
  "node_modules/postcss-selector-parser/dist/selectors/combinator.js"(exports, module) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var _node = require_node2();
    var _node2 = _interopRequireDefault(_node);
    var _types = require_types();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self2, call) {
      if (!self2) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self2;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var Combinator = function(_Node) {
      _inherits(Combinator2, _Node);
      function Combinator2(opts) {
        _classCallCheck(this, Combinator2);
        var _this = _possibleConstructorReturn(this, _Node.call(this, opts));
        _this.type = _types.COMBINATOR;
        return _this;
      }
      return Combinator2;
    }(_node2.default);
    exports.default = Combinator;
    module.exports = exports["default"];
  }
});
var require_nesting = __commonJS2({
  "node_modules/postcss-selector-parser/dist/selectors/nesting.js"(exports, module) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var _node = require_node2();
    var _node2 = _interopRequireDefault(_node);
    var _types = require_types();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self2, call) {
      if (!self2) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self2;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var Nesting = function(_Node) {
      _inherits(Nesting2, _Node);
      function Nesting2(opts) {
        _classCallCheck(this, Nesting2);
        var _this = _possibleConstructorReturn(this, _Node.call(this, opts));
        _this.type = _types.NESTING;
        _this.value = "&";
        return _this;
      }
      return Nesting2;
    }(_node2.default);
    exports.default = Nesting;
    module.exports = exports["default"];
  }
});
var require_sortAscending = __commonJS2({
  "node_modules/postcss-selector-parser/dist/sortAscending.js"(exports, module) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    exports.default = sortAscending;
    function sortAscending(list) {
      return list.sort(function(a, b) {
        return a - b;
      });
    }
    module.exports = exports["default"];
  }
});
var require_tokenize2 = __commonJS2({
  "node_modules/postcss-selector-parser/dist/tokenize.js"(exports, module) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    exports.default = tokenize;
    var singleQuote = 39;
    var doubleQuote = 34;
    var backslash = 92;
    var slash = 47;
    var newline = 10;
    var space = 32;
    var feed = 12;
    var tab = 9;
    var cr = 13;
    var plus = 43;
    var gt = 62;
    var tilde = 126;
    var pipe = 124;
    var comma = 44;
    var openBracket = 40;
    var closeBracket = 41;
    var openSq = 91;
    var closeSq = 93;
    var semicolon = 59;
    var asterisk = 42;
    var colon = 58;
    var ampersand = 38;
    var at = 64;
    var atEnd = /[ \n\t\r\{\(\)'"\\;/]/g;
    var wordEnd = /[ \n\t\r\(\)\*:;@!&'"\+\|~>,\[\]\\]|\/(?=\*)/g;
    function tokenize(input) {
      var tokens = [];
      var css = input.css.valueOf();
      var code = void 0, next = void 0, quote = void 0, lines = void 0, last = void 0, content = void 0, escape = void 0, nextLine = void 0, nextOffset = void 0, escaped = void 0, escapePos = void 0;
      var length = css.length;
      var offset = -1;
      var line = 1;
      var pos = 0;
      var unclosed = function unclosed2(what, end) {
        if (input.safe) {
          css += end;
          next = css.length - 1;
        } else {
          throw input.error("Unclosed " + what, line, pos - offset, pos);
        }
      };
      while (pos < length) {
        code = css.charCodeAt(pos);
        if (code === newline) {
          offset = pos;
          line += 1;
        }
        switch (code) {
          case newline:
          case space:
          case tab:
          case cr:
          case feed:
            next = pos;
            do {
              next += 1;
              code = css.charCodeAt(next);
              if (code === newline) {
                offset = next;
                line += 1;
              }
            } while (code === space || code === newline || code === tab || code === cr || code === feed);
            tokens.push(["space", css.slice(pos, next), line, pos - offset, pos]);
            pos = next - 1;
            break;
          case plus:
          case gt:
          case tilde:
          case pipe:
            next = pos;
            do {
              next += 1;
              code = css.charCodeAt(next);
            } while (code === plus || code === gt || code === tilde || code === pipe);
            tokens.push(["combinator", css.slice(pos, next), line, pos - offset, pos]);
            pos = next - 1;
            break;
          case asterisk:
            tokens.push(["*", "*", line, pos - offset, pos]);
            break;
          case ampersand:
            tokens.push(["&", "&", line, pos - offset, pos]);
            break;
          case comma:
            tokens.push([",", ",", line, pos - offset, pos]);
            break;
          case openSq:
            tokens.push(["[", "[", line, pos - offset, pos]);
            break;
          case closeSq:
            tokens.push(["]", "]", line, pos - offset, pos]);
            break;
          case colon:
            tokens.push([":", ":", line, pos - offset, pos]);
            break;
          case semicolon:
            tokens.push([";", ";", line, pos - offset, pos]);
            break;
          case openBracket:
            tokens.push(["(", "(", line, pos - offset, pos]);
            break;
          case closeBracket:
            tokens.push([")", ")", line, pos - offset, pos]);
            break;
          case singleQuote:
          case doubleQuote:
            quote = code === singleQuote ? "'" : '"';
            next = pos;
            do {
              escaped = false;
              next = css.indexOf(quote, next + 1);
              if (next === -1) {
                unclosed("quote", quote);
              }
              escapePos = next;
              while (css.charCodeAt(escapePos - 1) === backslash) {
                escapePos -= 1;
                escaped = !escaped;
              }
            } while (escaped);
            tokens.push(["string", css.slice(pos, next + 1), line, pos - offset, line, next - offset, pos]);
            pos = next;
            break;
          case at:
            atEnd.lastIndex = pos + 1;
            atEnd.test(css);
            if (atEnd.lastIndex === 0) {
              next = css.length - 1;
            } else {
              next = atEnd.lastIndex - 2;
            }
            tokens.push(["at-word", css.slice(pos, next + 1), line, pos - offset, line, next - offset, pos]);
            pos = next;
            break;
          case backslash:
            next = pos;
            escape = true;
            while (css.charCodeAt(next + 1) === backslash) {
              next += 1;
              escape = !escape;
            }
            code = css.charCodeAt(next + 1);
            if (escape && code !== slash && code !== space && code !== newline && code !== tab && code !== cr && code !== feed) {
              next += 1;
            }
            tokens.push(["word", css.slice(pos, next + 1), line, pos - offset, line, next - offset, pos]);
            pos = next;
            break;
          default:
            if (code === slash && css.charCodeAt(pos + 1) === asterisk) {
              next = css.indexOf("*/", pos + 2) + 1;
              if (next === 0) {
                unclosed("comment", "*/");
              }
              content = css.slice(pos, next + 1);
              lines = content.split("\n");
              last = lines.length - 1;
              if (last > 0) {
                nextLine = line + last;
                nextOffset = next - lines[last].length;
              } else {
                nextLine = line;
                nextOffset = offset;
              }
              tokens.push(["comment", content, line, pos - offset, nextLine, next - nextOffset, pos]);
              offset = nextOffset;
              line = nextLine;
              pos = next;
            } else {
              wordEnd.lastIndex = pos + 1;
              wordEnd.test(css);
              if (wordEnd.lastIndex === 0) {
                next = css.length - 1;
              } else {
                next = wordEnd.lastIndex - 2;
              }
              tokens.push(["word", css.slice(pos, next + 1), line, pos - offset, line, next - offset, pos]);
              pos = next;
            }
            break;
        }
        pos++;
      }
      return tokens;
    }
    module.exports = exports["default"];
  }
});
var require_parser2 = __commonJS2({
  "node_modules/postcss-selector-parser/dist/parser.js"(exports, module) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var _createClass = function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _flatten = require_flatten();
    var _flatten2 = _interopRequireDefault(_flatten);
    var _indexesOf = require_indexes_of();
    var _indexesOf2 = _interopRequireDefault(_indexesOf);
    var _uniq = require_uniq();
    var _uniq2 = _interopRequireDefault(_uniq);
    var _root = require_root2();
    var _root2 = _interopRequireDefault(_root);
    var _selector = require_selector();
    var _selector2 = _interopRequireDefault(_selector);
    var _className = require_className();
    var _className2 = _interopRequireDefault(_className);
    var _comment = require_comment2();
    var _comment2 = _interopRequireDefault(_comment);
    var _id = require_id();
    var _id2 = _interopRequireDefault(_id);
    var _tag = require_tag();
    var _tag2 = _interopRequireDefault(_tag);
    var _string = require_string2();
    var _string2 = _interopRequireDefault(_string);
    var _pseudo = require_pseudo();
    var _pseudo2 = _interopRequireDefault(_pseudo);
    var _attribute = require_attribute();
    var _attribute2 = _interopRequireDefault(_attribute);
    var _universal = require_universal();
    var _universal2 = _interopRequireDefault(_universal);
    var _combinator = require_combinator();
    var _combinator2 = _interopRequireDefault(_combinator);
    var _nesting = require_nesting();
    var _nesting2 = _interopRequireDefault(_nesting);
    var _sortAscending = require_sortAscending();
    var _sortAscending2 = _interopRequireDefault(_sortAscending);
    var _tokenize = require_tokenize2();
    var _tokenize2 = _interopRequireDefault(_tokenize);
    var _types = require_types();
    var types = _interopRequireWildcard(_types);
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      } else {
        var newObj = {};
        if (obj != null) {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key))
              newObj[key] = obj[key];
          }
        }
        newObj.default = obj;
        return newObj;
      }
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var Parser = function() {
      function Parser2(input) {
        _classCallCheck(this, Parser2);
        this.input = input;
        this.lossy = input.options.lossless === false;
        this.position = 0;
        this.root = new _root2.default();
        var selectors = new _selector2.default();
        this.root.append(selectors);
        this.current = selectors;
        if (this.lossy) {
          this.tokens = (0, _tokenize2.default)({
            safe: input.safe,
            css: input.css.trim()
          });
        } else {
          this.tokens = (0, _tokenize2.default)(input);
        }
        return this.loop();
      }
      Parser2.prototype.attribute = function attribute() {
        var str = "";
        var attr = void 0;
        var startingToken = this.currToken;
        this.position++;
        while (this.position < this.tokens.length && this.currToken[0] !== "]") {
          str += this.tokens[this.position][1];
          this.position++;
        }
        if (this.position === this.tokens.length && !~str.indexOf("]")) {
          this.error("Expected a closing square bracket.");
        }
        var parts = str.split(/((?:[*~^$|]?=))([^]*)/);
        var namespace = parts[0].split(/(\|)/g);
        var attributeProps = {
          operator: parts[1],
          value: parts[2],
          source: {
            start: {
              line: startingToken[2],
              column: startingToken[3]
            },
            end: {
              line: this.currToken[2],
              column: this.currToken[3]
            }
          },
          sourceIndex: startingToken[4]
        };
        if (namespace.length > 1) {
          if (namespace[0] === "") {
            namespace[0] = true;
          }
          attributeProps.attribute = this.parseValue(namespace[2]);
          attributeProps.namespace = this.parseNamespace(namespace[0]);
        } else {
          attributeProps.attribute = this.parseValue(parts[0]);
        }
        attr = new _attribute2.default(attributeProps);
        if (parts[2]) {
          var insensitive = parts[2].split(/(\s+i\s*?)$/);
          var trimmedValue = insensitive[0].trim();
          attr.value = this.lossy ? trimmedValue : insensitive[0];
          if (insensitive[1]) {
            attr.insensitive = true;
            if (!this.lossy) {
              attr.raws.insensitive = insensitive[1];
            }
          }
          attr.quoted = trimmedValue[0] === "'" || trimmedValue[0] === '"';
          attr.raws.unquoted = attr.quoted ? trimmedValue.slice(1, -1) : trimmedValue;
        }
        this.newNode(attr);
        this.position++;
      };
      Parser2.prototype.combinator = function combinator() {
        if (this.currToken[1] === "|") {
          return this.namespace();
        }
        var node = new _combinator2.default({
          value: "",
          source: {
            start: {
              line: this.currToken[2],
              column: this.currToken[3]
            },
            end: {
              line: this.currToken[2],
              column: this.currToken[3]
            }
          },
          sourceIndex: this.currToken[4]
        });
        while (this.position < this.tokens.length && this.currToken && (this.currToken[0] === "space" || this.currToken[0] === "combinator")) {
          if (this.nextToken && this.nextToken[0] === "combinator") {
            node.spaces.before = this.parseSpace(this.currToken[1]);
            node.source.start.line = this.nextToken[2];
            node.source.start.column = this.nextToken[3];
            node.source.end.column = this.nextToken[3];
            node.source.end.line = this.nextToken[2];
            node.sourceIndex = this.nextToken[4];
          } else if (this.prevToken && this.prevToken[0] === "combinator") {
            node.spaces.after = this.parseSpace(this.currToken[1]);
          } else if (this.currToken[0] === "combinator") {
            node.value = this.currToken[1];
          } else if (this.currToken[0] === "space") {
            node.value = this.parseSpace(this.currToken[1], " ");
          }
          this.position++;
        }
        return this.newNode(node);
      };
      Parser2.prototype.comma = function comma() {
        if (this.position === this.tokens.length - 1) {
          this.root.trailingComma = true;
          this.position++;
          return;
        }
        var selectors = new _selector2.default();
        this.current.parent.append(selectors);
        this.current = selectors;
        this.position++;
      };
      Parser2.prototype.comment = function comment() {
        var node = new _comment2.default({
          value: this.currToken[1],
          source: {
            start: {
              line: this.currToken[2],
              column: this.currToken[3]
            },
            end: {
              line: this.currToken[4],
              column: this.currToken[5]
            }
          },
          sourceIndex: this.currToken[6]
        });
        this.newNode(node);
        this.position++;
      };
      Parser2.prototype.error = function error(message) {
        throw new this.input.error(message);
      };
      Parser2.prototype.missingBackslash = function missingBackslash() {
        return this.error("Expected a backslash preceding the semicolon.");
      };
      Parser2.prototype.missingParenthesis = function missingParenthesis() {
        return this.error("Expected opening parenthesis.");
      };
      Parser2.prototype.missingSquareBracket = function missingSquareBracket() {
        return this.error("Expected opening square bracket.");
      };
      Parser2.prototype.namespace = function namespace() {
        var before = this.prevToken && this.prevToken[1] || true;
        if (this.nextToken[0] === "word") {
          this.position++;
          return this.word(before);
        } else if (this.nextToken[0] === "*") {
          this.position++;
          return this.universal(before);
        }
      };
      Parser2.prototype.nesting = function nesting() {
        this.newNode(new _nesting2.default({
          value: this.currToken[1],
          source: {
            start: {
              line: this.currToken[2],
              column: this.currToken[3]
            },
            end: {
              line: this.currToken[2],
              column: this.currToken[3]
            }
          },
          sourceIndex: this.currToken[4]
        }));
        this.position++;
      };
      Parser2.prototype.parentheses = function parentheses() {
        var last = this.current.last;
        if (last && last.type === types.PSEUDO) {
          var selector = new _selector2.default();
          var cache = this.current;
          last.append(selector);
          this.current = selector;
          var balanced = 1;
          this.position++;
          while (this.position < this.tokens.length && balanced) {
            if (this.currToken[0] === "(") {
              balanced++;
            }
            if (this.currToken[0] === ")") {
              balanced--;
            }
            if (balanced) {
              this.parse();
            } else {
              selector.parent.source.end.line = this.currToken[2];
              selector.parent.source.end.column = this.currToken[3];
              this.position++;
            }
          }
          if (balanced) {
            this.error("Expected closing parenthesis.");
          }
          this.current = cache;
        } else {
          var _balanced = 1;
          this.position++;
          last.value += "(";
          while (this.position < this.tokens.length && _balanced) {
            if (this.currToken[0] === "(") {
              _balanced++;
            }
            if (this.currToken[0] === ")") {
              _balanced--;
            }
            last.value += this.parseParenthesisToken(this.currToken);
            this.position++;
          }
          if (_balanced) {
            this.error("Expected closing parenthesis.");
          }
        }
      };
      Parser2.prototype.pseudo = function pseudo() {
        var _this = this;
        var pseudoStr = "";
        var startingToken = this.currToken;
        while (this.currToken && this.currToken[0] === ":") {
          pseudoStr += this.currToken[1];
          this.position++;
        }
        if (!this.currToken) {
          return this.error("Expected pseudo-class or pseudo-element");
        }
        if (this.currToken[0] === "word") {
          var pseudo2 = void 0;
          this.splitWord(false, function(first, length) {
            pseudoStr += first;
            pseudo2 = new _pseudo2.default({
              value: pseudoStr,
              source: {
                start: {
                  line: startingToken[2],
                  column: startingToken[3]
                },
                end: {
                  line: _this.currToken[4],
                  column: _this.currToken[5]
                }
              },
              sourceIndex: startingToken[4]
            });
            _this.newNode(pseudo2);
            if (length > 1 && _this.nextToken && _this.nextToken[0] === "(") {
              _this.error("Misplaced parenthesis.");
            }
          });
        } else {
          this.error('Unexpected "' + this.currToken[0] + '" found.');
        }
      };
      Parser2.prototype.space = function space() {
        var token = this.currToken;
        if (this.position === 0 || this.prevToken[0] === "," || this.prevToken[0] === "(") {
          this.spaces = this.parseSpace(token[1]);
          this.position++;
        } else if (this.position === this.tokens.length - 1 || this.nextToken[0] === "," || this.nextToken[0] === ")") {
          this.current.last.spaces.after = this.parseSpace(token[1]);
          this.position++;
        } else {
          this.combinator();
        }
      };
      Parser2.prototype.string = function string() {
        var token = this.currToken;
        this.newNode(new _string2.default({
          value: this.currToken[1],
          source: {
            start: {
              line: token[2],
              column: token[3]
            },
            end: {
              line: token[4],
              column: token[5]
            }
          },
          sourceIndex: token[6]
        }));
        this.position++;
      };
      Parser2.prototype.universal = function universal(namespace) {
        var nextToken = this.nextToken;
        if (nextToken && nextToken[1] === "|") {
          this.position++;
          return this.namespace();
        }
        this.newNode(new _universal2.default({
          value: this.currToken[1],
          source: {
            start: {
              line: this.currToken[2],
              column: this.currToken[3]
            },
            end: {
              line: this.currToken[2],
              column: this.currToken[3]
            }
          },
          sourceIndex: this.currToken[4]
        }), namespace);
        this.position++;
      };
      Parser2.prototype.splitWord = function splitWord(namespace, firstCallback) {
        var _this2 = this;
        var nextToken = this.nextToken;
        var word = this.currToken[1];
        while (nextToken && nextToken[0] === "word") {
          this.position++;
          var current = this.currToken[1];
          word += current;
          if (current.lastIndexOf("\\") === current.length - 1) {
            var next = this.nextToken;
            if (next && next[0] === "space") {
              word += this.parseSpace(next[1], " ");
              this.position++;
            }
          }
          nextToken = this.nextToken;
        }
        var hasClass = (0, _indexesOf2.default)(word, ".");
        var hasId = (0, _indexesOf2.default)(word, "#");
        var interpolations = (0, _indexesOf2.default)(word, "#{");
        if (interpolations.length) {
          hasId = hasId.filter(function(hashIndex) {
            return !~interpolations.indexOf(hashIndex);
          });
        }
        var indices = (0, _sortAscending2.default)((0, _uniq2.default)((0, _flatten2.default)([[0], hasClass, hasId])));
        indices.forEach(function(ind, i) {
          var index = indices[i + 1] || word.length;
          var value = word.slice(ind, index);
          if (i === 0 && firstCallback) {
            return firstCallback.call(_this2, value, indices.length);
          }
          var node = void 0;
          if (~hasClass.indexOf(ind)) {
            node = new _className2.default({
              value: value.slice(1),
              source: {
                start: {
                  line: _this2.currToken[2],
                  column: _this2.currToken[3] + ind
                },
                end: {
                  line: _this2.currToken[4],
                  column: _this2.currToken[3] + (index - 1)
                }
              },
              sourceIndex: _this2.currToken[6] + indices[i]
            });
          } else if (~hasId.indexOf(ind)) {
            node = new _id2.default({
              value: value.slice(1),
              source: {
                start: {
                  line: _this2.currToken[2],
                  column: _this2.currToken[3] + ind
                },
                end: {
                  line: _this2.currToken[4],
                  column: _this2.currToken[3] + (index - 1)
                }
              },
              sourceIndex: _this2.currToken[6] + indices[i]
            });
          } else {
            node = new _tag2.default({
              value,
              source: {
                start: {
                  line: _this2.currToken[2],
                  column: _this2.currToken[3] + ind
                },
                end: {
                  line: _this2.currToken[4],
                  column: _this2.currToken[3] + (index - 1)
                }
              },
              sourceIndex: _this2.currToken[6] + indices[i]
            });
          }
          _this2.newNode(node, namespace);
        });
        this.position++;
      };
      Parser2.prototype.word = function word(namespace) {
        var nextToken = this.nextToken;
        if (nextToken && nextToken[1] === "|") {
          this.position++;
          return this.namespace();
        }
        return this.splitWord(namespace);
      };
      Parser2.prototype.loop = function loop() {
        while (this.position < this.tokens.length) {
          this.parse(true);
        }
        return this.root;
      };
      Parser2.prototype.parse = function parse(throwOnParenthesis) {
        switch (this.currToken[0]) {
          case "space":
            this.space();
            break;
          case "comment":
            this.comment();
            break;
          case "(":
            this.parentheses();
            break;
          case ")":
            if (throwOnParenthesis) {
              this.missingParenthesis();
            }
            break;
          case "[":
            this.attribute();
            break;
          case "]":
            this.missingSquareBracket();
            break;
          case "at-word":
          case "word":
            this.word();
            break;
          case ":":
            this.pseudo();
            break;
          case ";":
            this.missingBackslash();
            break;
          case ",":
            this.comma();
            break;
          case "*":
            this.universal();
            break;
          case "&":
            this.nesting();
            break;
          case "combinator":
            this.combinator();
            break;
          case "string":
            this.string();
            break;
        }
      };
      Parser2.prototype.parseNamespace = function parseNamespace(namespace) {
        if (this.lossy && typeof namespace === "string") {
          var trimmed = namespace.trim();
          if (!trimmed.length) {
            return true;
          }
          return trimmed;
        }
        return namespace;
      };
      Parser2.prototype.parseSpace = function parseSpace(space, replacement) {
        return this.lossy ? replacement || "" : space;
      };
      Parser2.prototype.parseValue = function parseValue(value) {
        return this.lossy && value && typeof value === "string" ? value.trim() : value;
      };
      Parser2.prototype.parseParenthesisToken = function parseParenthesisToken(token) {
        if (!this.lossy) {
          return token[1];
        }
        if (token[0] === "space") {
          return this.parseSpace(token[1], " ");
        }
        return this.parseValue(token[1]);
      };
      Parser2.prototype.newNode = function newNode(node, namespace) {
        if (namespace) {
          node.namespace = this.parseNamespace(namespace);
        }
        if (this.spaces) {
          node.spaces.before = this.spaces;
          this.spaces = "";
        }
        return this.current.append(node);
      };
      _createClass(Parser2, [{
        key: "currToken",
        get: function get() {
          return this.tokens[this.position];
        }
      }, {
        key: "nextToken",
        get: function get() {
          return this.tokens[this.position + 1];
        }
      }, {
        key: "prevToken",
        get: function get() {
          return this.tokens[this.position - 1];
        }
      }]);
      return Parser2;
    }();
    exports.default = Parser;
    module.exports = exports["default"];
  }
});
var require_processor = __commonJS2({
  "node_modules/postcss-selector-parser/dist/processor.js"(exports, module) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var _createClass = function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _parser = require_parser2();
    var _parser2 = _interopRequireDefault(_parser);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var Processor = function() {
      function Processor2(func) {
        _classCallCheck(this, Processor2);
        this.func = func || function noop2() {
        };
        return this;
      }
      Processor2.prototype.process = function process2(selectors) {
        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var input = new _parser2.default({
          css: selectors,
          error: function error(e) {
            throw new Error(e);
          },
          options
        });
        this.res = input;
        this.func(input);
        return this;
      };
      _createClass(Processor2, [{
        key: "result",
        get: function get() {
          return String(this.res);
        }
      }]);
      return Processor2;
    }();
    exports.default = Processor;
    module.exports = exports["default"];
  }
});
var require_dist = __commonJS2({
  "node_modules/postcss-selector-parser/dist/index.js"(exports, module) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var _processor = require_processor();
    var _processor2 = _interopRequireDefault(_processor);
    var _attribute = require_attribute();
    var _attribute2 = _interopRequireDefault(_attribute);
    var _className = require_className();
    var _className2 = _interopRequireDefault(_className);
    var _combinator = require_combinator();
    var _combinator2 = _interopRequireDefault(_combinator);
    var _comment = require_comment2();
    var _comment2 = _interopRequireDefault(_comment);
    var _id = require_id();
    var _id2 = _interopRequireDefault(_id);
    var _nesting = require_nesting();
    var _nesting2 = _interopRequireDefault(_nesting);
    var _pseudo = require_pseudo();
    var _pseudo2 = _interopRequireDefault(_pseudo);
    var _root = require_root2();
    var _root2 = _interopRequireDefault(_root);
    var _selector = require_selector();
    var _selector2 = _interopRequireDefault(_selector);
    var _string = require_string2();
    var _string2 = _interopRequireDefault(_string);
    var _tag = require_tag();
    var _tag2 = _interopRequireDefault(_tag);
    var _universal = require_universal();
    var _universal2 = _interopRequireDefault(_universal);
    var _types = require_types();
    var types = _interopRequireWildcard(_types);
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      } else {
        var newObj = {};
        if (obj != null) {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key))
              newObj[key] = obj[key];
          }
        }
        newObj.default = obj;
        return newObj;
      }
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    var parser = function parser2(processor) {
      return new _processor2.default(processor);
    };
    parser.attribute = function(opts) {
      return new _attribute2.default(opts);
    };
    parser.className = function(opts) {
      return new _className2.default(opts);
    };
    parser.combinator = function(opts) {
      return new _combinator2.default(opts);
    };
    parser.comment = function(opts) {
      return new _comment2.default(opts);
    };
    parser.id = function(opts) {
      return new _id2.default(opts);
    };
    parser.nesting = function(opts) {
      return new _nesting2.default(opts);
    };
    parser.pseudo = function(opts) {
      return new _pseudo2.default(opts);
    };
    parser.root = function(opts) {
      return new _root2.default(opts);
    };
    parser.selector = function(opts) {
      return new _selector2.default(opts);
    };
    parser.string = function(opts) {
      return new _string2.default(opts);
    };
    parser.tag = function(opts) {
      return new _tag2.default(opts);
    };
    parser.universal = function(opts) {
      return new _universal2.default(opts);
    };
    Object.keys(types).forEach(function(type2) {
      if (type2 === "__esModule") {
        return;
      }
      parser[type2] = types[type2];
    });
    exports.default = parser;
    module.exports = exports["default"];
  }
});
var require_Node = __commonJS2({
  "node_modules/postcss-media-query-parser/dist/nodes/Node.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    function Node(opts) {
      this.after = opts.after;
      this.before = opts.before;
      this.type = opts.type;
      this.value = opts.value;
      this.sourceIndex = opts.sourceIndex;
    }
    exports.default = Node;
  }
});
var require_Container = __commonJS2({
  "node_modules/postcss-media-query-parser/dist/nodes/Container.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _Node = require_Node();
    var _Node2 = _interopRequireDefault(_Node);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function Container(opts) {
      var _this = this;
      this.constructor(opts);
      this.nodes = opts.nodes;
      if (this.after === void 0) {
        this.after = this.nodes.length > 0 ? this.nodes[this.nodes.length - 1].after : "";
      }
      if (this.before === void 0) {
        this.before = this.nodes.length > 0 ? this.nodes[0].before : "";
      }
      if (this.sourceIndex === void 0) {
        this.sourceIndex = this.before.length;
      }
      this.nodes.forEach(function(node) {
        node.parent = _this;
      });
    }
    Container.prototype = Object.create(_Node2.default.prototype);
    Container.constructor = _Node2.default;
    Container.prototype.walk = function walk(filter2, cb) {
      var hasFilter = typeof filter2 === "string" || filter2 instanceof RegExp;
      var callback = hasFilter ? cb : filter2;
      var filterReg = typeof filter2 === "string" ? new RegExp(filter2) : filter2;
      for (var i = 0; i < this.nodes.length; i++) {
        var node = this.nodes[i];
        var filtered = hasFilter ? filterReg.test(node.type) : true;
        if (filtered && callback && callback(node, i, this.nodes) === false) {
          return false;
        }
        if (node.nodes && node.walk(filter2, cb) === false) {
          return false;
        }
      }
      return true;
    };
    Container.prototype.each = function each() {
      var cb = arguments.length <= 0 || arguments[0] === void 0 ? function() {
      } : arguments[0];
      for (var i = 0; i < this.nodes.length; i++) {
        var node = this.nodes[i];
        if (cb(node, i, this.nodes) === false) {
          return false;
        }
      }
      return true;
    };
    exports.default = Container;
  }
});
var require_parsers = __commonJS2({
  "node_modules/postcss-media-query-parser/dist/parsers.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parseMediaFeature = parseMediaFeature;
    exports.parseMediaQuery = parseMediaQuery;
    exports.parseMediaList = parseMediaList;
    var _Node = require_Node();
    var _Node2 = _interopRequireDefault(_Node);
    var _Container = require_Container();
    var _Container2 = _interopRequireDefault(_Container);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function parseMediaFeature(string) {
      var index = arguments.length <= 1 || arguments[1] === void 0 ? 0 : arguments[1];
      var modesEntered = [{
        mode: "normal",
        character: null
      }];
      var result = [];
      var lastModeIndex = 0;
      var mediaFeature = "";
      var colon = null;
      var mediaFeatureValue = null;
      var indexLocal = index;
      var stringNormalized = string;
      if (string[0] === "(" && string[string.length - 1] === ")") {
        stringNormalized = string.substring(1, string.length - 1);
        indexLocal++;
      }
      for (var i = 0; i < stringNormalized.length; i++) {
        var character = stringNormalized[i];
        if (character === "'" || character === '"') {
          if (modesEntered[lastModeIndex].isCalculationEnabled === true) {
            modesEntered.push({
              mode: "string",
              isCalculationEnabled: false,
              character
            });
            lastModeIndex++;
          } else if (modesEntered[lastModeIndex].mode === "string" && modesEntered[lastModeIndex].character === character && stringNormalized[i - 1] !== "\\") {
            modesEntered.pop();
            lastModeIndex--;
          }
        }
        if (character === "{") {
          modesEntered.push({
            mode: "interpolation",
            isCalculationEnabled: true
          });
          lastModeIndex++;
        } else if (character === "}") {
          modesEntered.pop();
          lastModeIndex--;
        }
        if (modesEntered[lastModeIndex].mode === "normal" && character === ":") {
          var mediaFeatureValueStr = stringNormalized.substring(i + 1);
          mediaFeatureValue = {
            type: "value",
            before: /^(\s*)/.exec(mediaFeatureValueStr)[1],
            after: /(\s*)$/.exec(mediaFeatureValueStr)[1],
            value: mediaFeatureValueStr.trim()
          };
          mediaFeatureValue.sourceIndex = mediaFeatureValue.before.length + i + 1 + indexLocal;
          colon = {
            type: "colon",
            sourceIndex: i + indexLocal,
            after: mediaFeatureValue.before,
            value: ":"
          };
          break;
        }
        mediaFeature += character;
      }
      mediaFeature = {
        type: "media-feature",
        before: /^(\s*)/.exec(mediaFeature)[1],
        after: /(\s*)$/.exec(mediaFeature)[1],
        value: mediaFeature.trim()
      };
      mediaFeature.sourceIndex = mediaFeature.before.length + indexLocal;
      result.push(mediaFeature);
      if (colon !== null) {
        colon.before = mediaFeature.after;
        result.push(colon);
      }
      if (mediaFeatureValue !== null) {
        result.push(mediaFeatureValue);
      }
      return result;
    }
    function parseMediaQuery(string) {
      var index = arguments.length <= 1 || arguments[1] === void 0 ? 0 : arguments[1];
      var result = [];
      var localLevel = 0;
      var insideSomeValue = false;
      var node = void 0;
      function resetNode() {
        return {
          before: "",
          after: "",
          value: ""
        };
      }
      node = resetNode();
      for (var i = 0; i < string.length; i++) {
        var character = string[i];
        if (!insideSomeValue) {
          if (character.search(/\s/) !== -1) {
            node.before += character;
          } else {
            if (character === "(") {
              node.type = "media-feature-expression";
              localLevel++;
            }
            node.value = character;
            node.sourceIndex = index + i;
            insideSomeValue = true;
          }
        } else {
          node.value += character;
          if (character === "{" || character === "(") {
            localLevel++;
          }
          if (character === ")" || character === "}") {
            localLevel--;
          }
        }
        if (insideSomeValue && localLevel === 0 && (character === ")" || i === string.length - 1 || string[i + 1].search(/\s/) !== -1)) {
          if (["not", "only", "and"].indexOf(node.value) !== -1) {
            node.type = "keyword";
          }
          if (node.type === "media-feature-expression") {
            node.nodes = parseMediaFeature(node.value, node.sourceIndex);
          }
          result.push(Array.isArray(node.nodes) ? new _Container2.default(node) : new _Node2.default(node));
          node = resetNode();
          insideSomeValue = false;
        }
      }
      for (var _i = 0; _i < result.length; _i++) {
        node = result[_i];
        if (_i > 0) {
          result[_i - 1].after = node.before;
        }
        if (node.type === void 0) {
          if (_i > 0) {
            if (result[_i - 1].type === "media-feature-expression") {
              node.type = "keyword";
              continue;
            }
            if (result[_i - 1].value === "not" || result[_i - 1].value === "only") {
              node.type = "media-type";
              continue;
            }
            if (result[_i - 1].value === "and") {
              node.type = "media-feature-expression";
              continue;
            }
            if (result[_i - 1].type === "media-type") {
              if (!result[_i + 1]) {
                node.type = "media-feature-expression";
              } else {
                node.type = result[_i + 1].type === "media-feature-expression" ? "keyword" : "media-feature-expression";
              }
            }
          }
          if (_i === 0) {
            if (!result[_i + 1]) {
              node.type = "media-type";
              continue;
            }
            if (result[_i + 1] && (result[_i + 1].type === "media-feature-expression" || result[_i + 1].type === "keyword")) {
              node.type = "media-type";
              continue;
            }
            if (result[_i + 2]) {
              if (result[_i + 2].type === "media-feature-expression") {
                node.type = "media-type";
                result[_i + 1].type = "keyword";
                continue;
              }
              if (result[_i + 2].type === "keyword") {
                node.type = "keyword";
                result[_i + 1].type = "media-type";
                continue;
              }
            }
            if (result[_i + 3]) {
              if (result[_i + 3].type === "media-feature-expression") {
                node.type = "keyword";
                result[_i + 1].type = "media-type";
                result[_i + 2].type = "keyword";
                continue;
              }
            }
          }
        }
      }
      return result;
    }
    function parseMediaList(string) {
      var result = [];
      var interimIndex = 0;
      var levelLocal = 0;
      var doesHaveUrl = /^(\s*)url\s*\(/.exec(string);
      if (doesHaveUrl !== null) {
        var i = doesHaveUrl[0].length;
        var parenthesesLv = 1;
        while (parenthesesLv > 0) {
          var character = string[i];
          if (character === "(") {
            parenthesesLv++;
          }
          if (character === ")") {
            parenthesesLv--;
          }
          i++;
        }
        result.unshift(new _Node2.default({
          type: "url",
          value: string.substring(0, i).trim(),
          sourceIndex: doesHaveUrl[1].length,
          before: doesHaveUrl[1],
          after: /^(\s*)/.exec(string.substring(i))[1]
        }));
        interimIndex = i;
      }
      for (var _i2 = interimIndex; _i2 < string.length; _i2++) {
        var _character = string[_i2];
        if (_character === "(") {
          levelLocal++;
        }
        if (_character === ")") {
          levelLocal--;
        }
        if (levelLocal === 0 && _character === ",") {
          var _mediaQueryString = string.substring(interimIndex, _i2);
          var _spaceBefore = /^(\s*)/.exec(_mediaQueryString)[1];
          result.push(new _Container2.default({
            type: "media-query",
            value: _mediaQueryString.trim(),
            sourceIndex: interimIndex + _spaceBefore.length,
            nodes: parseMediaQuery(_mediaQueryString, interimIndex),
            before: _spaceBefore,
            after: /(\s*)$/.exec(_mediaQueryString)[1]
          }));
          interimIndex = _i2 + 1;
        }
      }
      var mediaQueryString = string.substring(interimIndex);
      var spaceBefore = /^(\s*)/.exec(mediaQueryString)[1];
      result.push(new _Container2.default({
        type: "media-query",
        value: mediaQueryString.trim(),
        sourceIndex: interimIndex + spaceBefore.length,
        nodes: parseMediaQuery(mediaQueryString, interimIndex),
        before: spaceBefore,
        after: /(\s*)$/.exec(mediaQueryString)[1]
      }));
      return result;
    }
  }
});
var require_dist2 = __commonJS2({
  "node_modules/postcss-media-query-parser/dist/index.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = parseMedia;
    var _Container = require_Container();
    var _Container2 = _interopRequireDefault(_Container);
    var _parsers = require_parsers();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function parseMedia(value) {
      return new _Container2.default({
        nodes: (0, _parsers.parseMediaList)(value),
        type: "media-query-list",
        value: value.trim()
      });
    }
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
var require_picocolors_browser = __commonJS2({
  "node_modules/picocolors/picocolors.browser.js"(exports, module) {
    init_define_process();
    var x = String;
    var create = function() {
      return {
        isColorSupported: false,
        reset: x,
        bold: x,
        dim: x,
        italic: x,
        underline: x,
        inverse: x,
        hidden: x,
        strikethrough: x,
        black: x,
        red: x,
        green: x,
        yellow: x,
        blue: x,
        magenta: x,
        cyan: x,
        white: x,
        gray: x,
        bgBlack: x,
        bgRed: x,
        bgGreen: x,
        bgYellow: x,
        bgBlue: x,
        bgMagenta: x,
        bgCyan: x,
        bgWhite: x
      };
    };
    module.exports = create();
    module.exports.createColors = create;
  }
});
var require_terminal_highlight = __commonJS2({
  "(disabled):node_modules/postcss/lib/terminal-highlight"() {
    init_define_process();
  }
});
var require_css_syntax_error = __commonJS2({
  "node_modules/postcss/lib/css-syntax-error.js"(exports, module) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    exports.default = void 0;
    var _picocolors = _interopRequireDefault(require_picocolors_browser());
    var _terminalHighlight = _interopRequireDefault(require_terminal_highlight());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function _assertThisInitialized(self2) {
      if (self2 === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return self2;
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
    function _wrapNativeSuper(Class) {
      var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
      _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
        if (Class2 === null || !_isNativeFunction(Class2))
          return Class2;
        if (typeof Class2 !== "function") {
          throw new TypeError("Super expression must either be null or a function");
        }
        if (typeof _cache !== "undefined") {
          if (_cache.has(Class2))
            return _cache.get(Class2);
          _cache.set(Class2, Wrapper);
        }
        function Wrapper() {
          return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
        }
        Wrapper.prototype = Object.create(Class2.prototype, {
          constructor: {
            value: Wrapper,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        return _setPrototypeOf(Wrapper, Class2);
      };
      return _wrapNativeSuper(Class);
    }
    function _construct(Parent, args, Class) {
      if (_isNativeReflectConstruct()) {
        _construct = Reflect.construct;
      } else {
        _construct = function _construct2(Parent2, args2, Class2) {
          var a = [null];
          a.push.apply(a, args2);
          var Constructor = Function.bind.apply(Parent2, a);
          var instance = new Constructor();
          if (Class2)
            _setPrototypeOf(instance, Class2.prototype);
          return instance;
        };
      }
      return _construct.apply(null, arguments);
    }
    function _isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if (typeof Proxy === "function")
        return true;
      try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
      } catch (e) {
        return false;
      }
    }
    function _isNativeFunction(fn) {
      return Function.toString.call(fn).indexOf("[native code]") !== -1;
    }
    function _setPrototypeOf(o, p) {
      _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
        o2.__proto__ = p2;
        return o2;
      };
      return _setPrototypeOf(o, p);
    }
    function _getPrototypeOf(o) {
      _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
        return o2.__proto__ || Object.getPrototypeOf(o2);
      };
      return _getPrototypeOf(o);
    }
    var CssSyntaxError = /* @__PURE__ */ function(_Error) {
      _inheritsLoose(CssSyntaxError2, _Error);
      function CssSyntaxError2(message, line, column, source, file, plugin) {
        var _this;
        _this = _Error.call(this, message) || this;
        _this.name = "CssSyntaxError";
        _this.reason = message;
        if (file) {
          _this.file = file;
        }
        if (source) {
          _this.source = source;
        }
        if (plugin) {
          _this.plugin = plugin;
        }
        if (typeof line !== "undefined" && typeof column !== "undefined") {
          _this.line = line;
          _this.column = column;
        }
        _this.setMessage();
        if (Error.captureStackTrace) {
          Error.captureStackTrace(_assertThisInitialized(_this), CssSyntaxError2);
        }
        return _this;
      }
      var _proto = CssSyntaxError2.prototype;
      _proto.setMessage = function setMessage() {
        this.message = this.plugin ? this.plugin + ": " : "";
        this.message += this.file ? this.file : "<css input>";
        if (typeof this.line !== "undefined") {
          this.message += ":" + this.line + ":" + this.column;
        }
        this.message += ": " + this.reason;
      };
      _proto.showSourceCode = function showSourceCode(color) {
        var _this2 = this;
        if (!this.source)
          return "";
        var css = this.source;
        if (_terminalHighlight.default) {
          if (typeof color === "undefined")
            color = _picocolors.default.isColorSupported;
          if (color)
            css = (0, _terminalHighlight.default)(css);
        }
        var lines = css.split(/\r?\n/);
        var start = Math.max(this.line - 3, 0);
        var end = Math.min(this.line + 2, lines.length);
        var maxWidth = String(end).length;
        function mark(text) {
          if (color && _picocolors.default.red) {
            return _picocolors.default.red(_picocolors.default.bold(text));
          }
          return text;
        }
        function aside(text) {
          if (color && _picocolors.default.gray) {
            return _picocolors.default.gray(text);
          }
          return text;
        }
        return lines.slice(start, end).map(function(line, index) {
          var number = start + 1 + index;
          var gutter = " " + (" " + number).slice(-maxWidth) + " | ";
          if (number === _this2.line) {
            var spacing = aside(gutter.replace(/\d/g, " ")) + line.slice(0, _this2.column - 1).replace(/[^\t]/g, " ");
            return mark(">") + aside(gutter) + line + "\n " + spacing + mark("^");
          }
          return " " + aside(gutter) + line;
        }).join("\n");
      };
      _proto.toString = function toString() {
        var code = this.showSourceCode();
        if (code) {
          code = "\n\n" + code + "\n";
        }
        return this.name + ": " + this.message + code;
      };
      return CssSyntaxError2;
    }(/* @__PURE__ */ _wrapNativeSuper(Error));
    var _default = CssSyntaxError;
    exports.default = _default;
    module.exports = exports.default;
  }
});
var require_previous_map = __commonJS2({
  "node_modules/postcss/lib/previous-map.js"(exports, module) {
    init_define_process();
    module.exports = class {
    };
  }
});
var require_input = __commonJS2({
  "node_modules/postcss/lib/input.js"(exports, module) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    exports.default = void 0;
    var _path = _interopRequireDefault(require_path());
    var _cssSyntaxError = _interopRequireDefault(require_css_syntax_error());
    var _previousMap = _interopRequireDefault(require_previous_map());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    var sequence = 0;
    var Input = /* @__PURE__ */ function() {
      function Input2(css, opts) {
        if (opts === void 0) {
          opts = {};
        }
        if (css === null || typeof css === "undefined" || typeof css === "object" && !css.toString) {
          throw new Error("PostCSS received " + css + " instead of CSS string");
        }
        this.css = css.toString();
        if (this.css[0] === "\uFEFF" || this.css[0] === "\uFFFE") {
          this.hasBOM = true;
          this.css = this.css.slice(1);
        } else {
          this.hasBOM = false;
        }
        if (opts.from) {
          if (/^\w+:\/\//.test(opts.from) || _path.default.isAbsolute(opts.from)) {
            this.file = opts.from;
          } else {
            this.file = _path.default.resolve(opts.from);
          }
        }
        var map = new _previousMap.default(this.css, opts);
        if (map.text) {
          this.map = map;
          var file = map.consumer().file;
          if (!this.file && file)
            this.file = this.mapResolve(file);
        }
        if (!this.file) {
          sequence += 1;
          this.id = "<input css " + sequence + ">";
        }
        if (this.map)
          this.map.file = this.from;
      }
      var _proto = Input2.prototype;
      _proto.error = function error(message, line, column, opts) {
        if (opts === void 0) {
          opts = {};
        }
        var result;
        var origin = this.origin(line, column);
        if (origin) {
          result = new _cssSyntaxError.default(message, origin.line, origin.column, origin.source, origin.file, opts.plugin);
        } else {
          result = new _cssSyntaxError.default(message, line, column, this.css, this.file, opts.plugin);
        }
        result.input = {
          line,
          column,
          source: this.css
        };
        if (this.file)
          result.input.file = this.file;
        return result;
      };
      _proto.origin = function origin(line, column) {
        if (!this.map)
          return false;
        var consumer = this.map.consumer();
        var from = consumer.originalPositionFor({
          line,
          column
        });
        if (!from.source)
          return false;
        var result = {
          file: this.mapResolve(from.source),
          line: from.line,
          column: from.column
        };
        var source = consumer.sourceContentFor(from.source);
        if (source)
          result.source = source;
        return result;
      };
      _proto.mapResolve = function mapResolve(file) {
        if (/^\w+:\/\//.test(file)) {
          return file;
        }
        return _path.default.resolve(this.map.consumer().sourceRoot || ".", file);
      };
      _createClass(Input2, [{
        key: "from",
        get: function get() {
          return this.file || this.id;
        }
      }]);
      return Input2;
    }();
    var _default = Input;
    exports.default = _default;
    module.exports = exports.default;
  }
});
var require_stringifier = __commonJS2({
  "node_modules/postcss/lib/stringifier.js"(exports, module) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    exports.default = void 0;
    var DEFAULT_RAW = {
      colon: ": ",
      indent: "    ",
      beforeDecl: "\n",
      beforeRule: "\n",
      beforeOpen: " ",
      beforeClose: "\n",
      beforeComment: "\n",
      after: "\n",
      emptyBody: "",
      commentLeft: " ",
      commentRight: " ",
      semicolon: false
    };
    function capitalize(str) {
      return str[0].toUpperCase() + str.slice(1);
    }
    var Stringifier = /* @__PURE__ */ function() {
      function Stringifier2(builder) {
        this.builder = builder;
      }
      var _proto = Stringifier2.prototype;
      _proto.stringify = function stringify(node, semicolon) {
        this[node.type](node, semicolon);
      };
      _proto.root = function root(node) {
        this.body(node);
        if (node.raws.after)
          this.builder(node.raws.after);
      };
      _proto.comment = function comment(node) {
        var left = this.raw(node, "left", "commentLeft");
        var right = this.raw(node, "right", "commentRight");
        this.builder("/*" + left + node.text + right + "*/", node);
      };
      _proto.decl = function decl(node, semicolon) {
        var between = this.raw(node, "between", "colon");
        var string = node.prop + between + this.rawValue(node, "value");
        if (node.important) {
          string += node.raws.important || " !important";
        }
        if (semicolon)
          string += ";";
        this.builder(string, node);
      };
      _proto.rule = function rule(node) {
        this.block(node, this.rawValue(node, "selector"));
        if (node.raws.ownSemicolon) {
          this.builder(node.raws.ownSemicolon, node, "end");
        }
      };
      _proto.atrule = function atrule(node, semicolon) {
        var name = "@" + node.name;
        var params = node.params ? this.rawValue(node, "params") : "";
        if (typeof node.raws.afterName !== "undefined") {
          name += node.raws.afterName;
        } else if (params) {
          name += " ";
        }
        if (node.nodes) {
          this.block(node, name + params);
        } else {
          var end = (node.raws.between || "") + (semicolon ? ";" : "");
          this.builder(name + params + end, node);
        }
      };
      _proto.body = function body(node) {
        var last = node.nodes.length - 1;
        while (last > 0) {
          if (node.nodes[last].type !== "comment")
            break;
          last -= 1;
        }
        var semicolon = this.raw(node, "semicolon");
        for (var i = 0; i < node.nodes.length; i++) {
          var child = node.nodes[i];
          var before = this.raw(child, "before");
          if (before)
            this.builder(before);
          this.stringify(child, last !== i || semicolon);
        }
      };
      _proto.block = function block(node, start) {
        var between = this.raw(node, "between", "beforeOpen");
        this.builder(start + between + "{", node, "start");
        var after;
        if (node.nodes && node.nodes.length) {
          this.body(node);
          after = this.raw(node, "after");
        } else {
          after = this.raw(node, "after", "emptyBody");
        }
        if (after)
          this.builder(after);
        this.builder("}", node, "end");
      };
      _proto.raw = function raw(node, own, detect) {
        var value;
        if (!detect)
          detect = own;
        if (own) {
          value = node.raws[own];
          if (typeof value !== "undefined")
            return value;
        }
        var parent = node.parent;
        if (detect === "before") {
          if (!parent || parent.type === "root" && parent.first === node) {
            return "";
          }
        }
        if (!parent)
          return DEFAULT_RAW[detect];
        var root = node.root();
        if (!root.rawCache)
          root.rawCache = {};
        if (typeof root.rawCache[detect] !== "undefined") {
          return root.rawCache[detect];
        }
        if (detect === "before" || detect === "after") {
          return this.beforeAfter(node, detect);
        } else {
          var method = "raw" + capitalize(detect);
          if (this[method]) {
            value = this[method](root, node);
          } else {
            root.walk(function(i) {
              value = i.raws[own];
              if (typeof value !== "undefined")
                return false;
            });
          }
        }
        if (typeof value === "undefined")
          value = DEFAULT_RAW[detect];
        root.rawCache[detect] = value;
        return value;
      };
      _proto.rawSemicolon = function rawSemicolon(root) {
        var value;
        root.walk(function(i) {
          if (i.nodes && i.nodes.length && i.last.type === "decl") {
            value = i.raws.semicolon;
            if (typeof value !== "undefined")
              return false;
          }
        });
        return value;
      };
      _proto.rawEmptyBody = function rawEmptyBody(root) {
        var value;
        root.walk(function(i) {
          if (i.nodes && i.nodes.length === 0) {
            value = i.raws.after;
            if (typeof value !== "undefined")
              return false;
          }
        });
        return value;
      };
      _proto.rawIndent = function rawIndent(root) {
        if (root.raws.indent)
          return root.raws.indent;
        var value;
        root.walk(function(i) {
          var p = i.parent;
          if (p && p !== root && p.parent && p.parent === root) {
            if (typeof i.raws.before !== "undefined") {
              var parts = i.raws.before.split("\n");
              value = parts[parts.length - 1];
              value = value.replace(/[^\s]/g, "");
              return false;
            }
          }
        });
        return value;
      };
      _proto.rawBeforeComment = function rawBeforeComment(root, node) {
        var value;
        root.walkComments(function(i) {
          if (typeof i.raws.before !== "undefined") {
            value = i.raws.before;
            if (value.indexOf("\n") !== -1) {
              value = value.replace(/[^\n]+$/, "");
            }
            return false;
          }
        });
        if (typeof value === "undefined") {
          value = this.raw(node, null, "beforeDecl");
        } else if (value) {
          value = value.replace(/[^\s]/g, "");
        }
        return value;
      };
      _proto.rawBeforeDecl = function rawBeforeDecl(root, node) {
        var value;
        root.walkDecls(function(i) {
          if (typeof i.raws.before !== "undefined") {
            value = i.raws.before;
            if (value.indexOf("\n") !== -1) {
              value = value.replace(/[^\n]+$/, "");
            }
            return false;
          }
        });
        if (typeof value === "undefined") {
          value = this.raw(node, null, "beforeRule");
        } else if (value) {
          value = value.replace(/[^\s]/g, "");
        }
        return value;
      };
      _proto.rawBeforeRule = function rawBeforeRule(root) {
        var value;
        root.walk(function(i) {
          if (i.nodes && (i.parent !== root || root.first !== i)) {
            if (typeof i.raws.before !== "undefined") {
              value = i.raws.before;
              if (value.indexOf("\n") !== -1) {
                value = value.replace(/[^\n]+$/, "");
              }
              return false;
            }
          }
        });
        if (value)
          value = value.replace(/[^\s]/g, "");
        return value;
      };
      _proto.rawBeforeClose = function rawBeforeClose(root) {
        var value;
        root.walk(function(i) {
          if (i.nodes && i.nodes.length > 0) {
            if (typeof i.raws.after !== "undefined") {
              value = i.raws.after;
              if (value.indexOf("\n") !== -1) {
                value = value.replace(/[^\n]+$/, "");
              }
              return false;
            }
          }
        });
        if (value)
          value = value.replace(/[^\s]/g, "");
        return value;
      };
      _proto.rawBeforeOpen = function rawBeforeOpen(root) {
        var value;
        root.walk(function(i) {
          if (i.type !== "decl") {
            value = i.raws.between;
            if (typeof value !== "undefined")
              return false;
          }
        });
        return value;
      };
      _proto.rawColon = function rawColon(root) {
        var value;
        root.walkDecls(function(i) {
          if (typeof i.raws.between !== "undefined") {
            value = i.raws.between.replace(/[^\s:]/g, "");
            return false;
          }
        });
        return value;
      };
      _proto.beforeAfter = function beforeAfter(node, detect) {
        var value;
        if (node.type === "decl") {
          value = this.raw(node, null, "beforeDecl");
        } else if (node.type === "comment") {
          value = this.raw(node, null, "beforeComment");
        } else if (detect === "before") {
          value = this.raw(node, null, "beforeRule");
        } else {
          value = this.raw(node, null, "beforeClose");
        }
        var buf = node.parent;
        var depth = 0;
        while (buf && buf.type !== "root") {
          depth += 1;
          buf = buf.parent;
        }
        if (value.indexOf("\n") !== -1) {
          var indent = this.raw(node, null, "indent");
          if (indent.length) {
            for (var step = 0; step < depth; step++) {
              value += indent;
            }
          }
        }
        return value;
      };
      _proto.rawValue = function rawValue(node, prop) {
        var value = node[prop];
        var raw = node.raws[prop];
        if (raw && raw.value === value) {
          return raw.raw;
        }
        return value;
      };
      return Stringifier2;
    }();
    var _default = Stringifier;
    exports.default = _default;
    module.exports = exports.default;
  }
});
var require_stringify = __commonJS2({
  "node_modules/postcss/lib/stringify.js"(exports, module) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    exports.default = void 0;
    var _stringifier = _interopRequireDefault(require_stringifier());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function stringify(node, builder) {
      var str = new _stringifier.default(builder);
      str.stringify(node);
    }
    var _default = stringify;
    exports.default = _default;
    module.exports = exports.default;
  }
});
var require_node3 = __commonJS2({
  "node_modules/postcss/lib/node.js"(exports, module) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    exports.default = void 0;
    var _cssSyntaxError = _interopRequireDefault(require_css_syntax_error());
    var _stringifier = _interopRequireDefault(require_stringifier());
    var _stringify = _interopRequireDefault(require_stringify());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function cloneNode(obj, parent) {
      var cloned = new obj.constructor();
      for (var i in obj) {
        if (!obj.hasOwnProperty(i))
          continue;
        var value = obj[i];
        var type2 = typeof value;
        if (i === "parent" && type2 === "object") {
          if (parent)
            cloned[i] = parent;
        } else if (i === "source") {
          cloned[i] = value;
        } else if (value instanceof Array) {
          cloned[i] = value.map(function(j) {
            return cloneNode(j, cloned);
          });
        } else {
          if (type2 === "object" && value !== null)
            value = cloneNode(value);
          cloned[i] = value;
        }
      }
      return cloned;
    }
    var Node = /* @__PURE__ */ function() {
      function Node2(defaults) {
        if (defaults === void 0) {
          defaults = {};
        }
        this.raws = {};
        if (false) {
          if (typeof defaults !== "object" && typeof defaults !== "undefined") {
            throw new Error("PostCSS nodes constructor accepts object, not " + JSON.stringify(defaults));
          }
        }
        for (var name in defaults) {
          this[name] = defaults[name];
        }
      }
      var _proto = Node2.prototype;
      _proto.error = function error(message, opts) {
        if (opts === void 0) {
          opts = {};
        }
        if (this.source) {
          var pos = this.positionBy(opts);
          return this.source.input.error(message, pos.line, pos.column, opts);
        }
        return new _cssSyntaxError.default(message);
      };
      _proto.warn = function warn(result, text, opts) {
        var data = {
          node: this
        };
        for (var i in opts) {
          data[i] = opts[i];
        }
        return result.warn(text, data);
      };
      _proto.remove = function remove() {
        if (this.parent) {
          this.parent.removeChild(this);
        }
        this.parent = void 0;
        return this;
      };
      _proto.toString = function toString(stringifier) {
        if (stringifier === void 0) {
          stringifier = _stringify.default;
        }
        if (stringifier.stringify)
          stringifier = stringifier.stringify;
        var result = "";
        stringifier(this, function(i) {
          result += i;
        });
        return result;
      };
      _proto.clone = function clone(overrides) {
        if (overrides === void 0) {
          overrides = {};
        }
        var cloned = cloneNode(this);
        for (var name in overrides) {
          cloned[name] = overrides[name];
        }
        return cloned;
      };
      _proto.cloneBefore = function cloneBefore(overrides) {
        if (overrides === void 0) {
          overrides = {};
        }
        var cloned = this.clone(overrides);
        this.parent.insertBefore(this, cloned);
        return cloned;
      };
      _proto.cloneAfter = function cloneAfter(overrides) {
        if (overrides === void 0) {
          overrides = {};
        }
        var cloned = this.clone(overrides);
        this.parent.insertAfter(this, cloned);
        return cloned;
      };
      _proto.replaceWith = function replaceWith() {
        if (this.parent) {
          for (var _len = arguments.length, nodes = new Array(_len), _key = 0; _key < _len; _key++) {
            nodes[_key] = arguments[_key];
          }
          for (var _i = 0, _nodes = nodes; _i < _nodes.length; _i++) {
            var node = _nodes[_i];
            this.parent.insertBefore(this, node);
          }
          this.remove();
        }
        return this;
      };
      _proto.next = function next() {
        if (!this.parent)
          return void 0;
        var index = this.parent.index(this);
        return this.parent.nodes[index + 1];
      };
      _proto.prev = function prev() {
        if (!this.parent)
          return void 0;
        var index = this.parent.index(this);
        return this.parent.nodes[index - 1];
      };
      _proto.before = function before(add) {
        this.parent.insertBefore(this, add);
        return this;
      };
      _proto.after = function after(add) {
        this.parent.insertAfter(this, add);
        return this;
      };
      _proto.toJSON = function toJSON() {
        var fixed = {};
        for (var name in this) {
          if (!this.hasOwnProperty(name))
            continue;
          if (name === "parent")
            continue;
          var value = this[name];
          if (value instanceof Array) {
            fixed[name] = value.map(function(i) {
              if (typeof i === "object" && i.toJSON) {
                return i.toJSON();
              } else {
                return i;
              }
            });
          } else if (typeof value === "object" && value.toJSON) {
            fixed[name] = value.toJSON();
          } else {
            fixed[name] = value;
          }
        }
        return fixed;
      };
      _proto.raw = function raw(prop, defaultType) {
        var str = new _stringifier.default();
        return str.raw(this, prop, defaultType);
      };
      _proto.root = function root() {
        var result = this;
        while (result.parent) {
          result = result.parent;
        }
        return result;
      };
      _proto.cleanRaws = function cleanRaws(keepBetween) {
        delete this.raws.before;
        delete this.raws.after;
        if (!keepBetween)
          delete this.raws.between;
      };
      _proto.positionInside = function positionInside(index) {
        var string = this.toString();
        var column = this.source.start.column;
        var line = this.source.start.line;
        for (var i = 0; i < index; i++) {
          if (string[i] === "\n") {
            column = 1;
            line += 1;
          } else {
            column += 1;
          }
        }
        return {
          line,
          column
        };
      };
      _proto.positionBy = function positionBy(opts) {
        var pos = this.source.start;
        if (opts.index) {
          pos = this.positionInside(opts.index);
        } else if (opts.word) {
          var index = this.toString().indexOf(opts.word);
          if (index !== -1)
            pos = this.positionInside(index);
        }
        return pos;
      };
      return Node2;
    }();
    var _default = Node;
    exports.default = _default;
    module.exports = exports.default;
  }
});
var require_comment3 = __commonJS2({
  "node_modules/postcss/lib/comment.js"(exports, module) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    exports.default = void 0;
    var _node = _interopRequireDefault(require_node3());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
    var Comment = /* @__PURE__ */ function(_Node) {
      _inheritsLoose(Comment2, _Node);
      function Comment2(defaults) {
        var _this;
        _this = _Node.call(this, defaults) || this;
        _this.type = "comment";
        return _this;
      }
      return Comment2;
    }(_node.default);
    var _default = Comment;
    exports.default = _default;
    module.exports = exports.default;
  }
});
var require_declaration = __commonJS2({
  "node_modules/postcss/lib/declaration.js"(exports, module) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    exports.default = void 0;
    var _node = _interopRequireDefault(require_node3());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
    var Declaration = /* @__PURE__ */ function(_Node) {
      _inheritsLoose(Declaration2, _Node);
      function Declaration2(defaults) {
        var _this;
        _this = _Node.call(this, defaults) || this;
        _this.type = "decl";
        return _this;
      }
      return Declaration2;
    }(_node.default);
    var _default = Declaration;
    exports.default = _default;
    module.exports = exports.default;
  }
});
var require_tokenize3 = __commonJS2({
  "node_modules/postcss/lib/tokenize.js"(exports, module) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    exports.default = tokenizer;
    var SINGLE_QUOTE = "'".charCodeAt(0);
    var DOUBLE_QUOTE = '"'.charCodeAt(0);
    var BACKSLASH = "\\".charCodeAt(0);
    var SLASH = "/".charCodeAt(0);
    var NEWLINE = "\n".charCodeAt(0);
    var SPACE = " ".charCodeAt(0);
    var FEED = "\f".charCodeAt(0);
    var TAB = "	".charCodeAt(0);
    var CR = "\r".charCodeAt(0);
    var OPEN_SQUARE = "[".charCodeAt(0);
    var CLOSE_SQUARE = "]".charCodeAt(0);
    var OPEN_PARENTHESES = "(".charCodeAt(0);
    var CLOSE_PARENTHESES = ")".charCodeAt(0);
    var OPEN_CURLY = "{".charCodeAt(0);
    var CLOSE_CURLY = "}".charCodeAt(0);
    var SEMICOLON = ";".charCodeAt(0);
    var ASTERISK = "*".charCodeAt(0);
    var COLON = ":".charCodeAt(0);
    var AT = "@".charCodeAt(0);
    var RE_AT_END = /[ \n\t\r\f{}()'"\\;/[\]#]/g;
    var RE_WORD_END = /[ \n\t\r\f(){}:;@!'"\\\][#]|\/(?=\*)/g;
    var RE_BAD_BRACKET = /.[\\/("'\n]/;
    var RE_HEX_ESCAPE = /[a-f0-9]/i;
    function tokenizer(input, options) {
      if (options === void 0) {
        options = {};
      }
      var css = input.css.valueOf();
      var ignore = options.ignoreErrors;
      var code, next, quote, lines, last, content, escape;
      var nextLine, nextOffset, escaped, escapePos, prev, n, currentToken;
      var length = css.length;
      var offset = -1;
      var line = 1;
      var pos = 0;
      var buffer = [];
      var returned = [];
      function position() {
        return pos;
      }
      function unclosed(what) {
        throw input.error("Unclosed " + what, line, pos - offset);
      }
      function endOfFile() {
        return returned.length === 0 && pos >= length;
      }
      function nextToken(opts) {
        if (returned.length)
          return returned.pop();
        if (pos >= length)
          return;
        var ignoreUnclosed = opts ? opts.ignoreUnclosed : false;
        code = css.charCodeAt(pos);
        if (code === NEWLINE || code === FEED || code === CR && css.charCodeAt(pos + 1) !== NEWLINE) {
          offset = pos;
          line += 1;
        }
        switch (code) {
          case NEWLINE:
          case SPACE:
          case TAB:
          case CR:
          case FEED:
            next = pos;
            do {
              next += 1;
              code = css.charCodeAt(next);
              if (code === NEWLINE) {
                offset = next;
                line += 1;
              }
            } while (code === SPACE || code === NEWLINE || code === TAB || code === CR || code === FEED);
            currentToken = ["space", css.slice(pos, next)];
            pos = next - 1;
            break;
          case OPEN_SQUARE:
          case CLOSE_SQUARE:
          case OPEN_CURLY:
          case CLOSE_CURLY:
          case COLON:
          case SEMICOLON:
          case CLOSE_PARENTHESES:
            var controlChar = String.fromCharCode(code);
            currentToken = [controlChar, controlChar, line, pos - offset];
            break;
          case OPEN_PARENTHESES:
            prev = buffer.length ? buffer.pop()[1] : "";
            n = css.charCodeAt(pos + 1);
            if (prev === "url" && n !== SINGLE_QUOTE && n !== DOUBLE_QUOTE && n !== SPACE && n !== NEWLINE && n !== TAB && n !== FEED && n !== CR) {
              next = pos;
              do {
                escaped = false;
                next = css.indexOf(")", next + 1);
                if (next === -1) {
                  if (ignore || ignoreUnclosed) {
                    next = pos;
                    break;
                  } else {
                    unclosed("bracket");
                  }
                }
                escapePos = next;
                while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
                  escapePos -= 1;
                  escaped = !escaped;
                }
              } while (escaped);
              currentToken = ["brackets", css.slice(pos, next + 1), line, pos - offset, line, next - offset];
              pos = next;
            } else {
              next = css.indexOf(")", pos + 1);
              content = css.slice(pos, next + 1);
              if (next === -1 || RE_BAD_BRACKET.test(content)) {
                currentToken = ["(", "(", line, pos - offset];
              } else {
                currentToken = ["brackets", content, line, pos - offset, line, next - offset];
                pos = next;
              }
            }
            break;
          case SINGLE_QUOTE:
          case DOUBLE_QUOTE:
            quote = code === SINGLE_QUOTE ? "'" : '"';
            next = pos;
            do {
              escaped = false;
              next = css.indexOf(quote, next + 1);
              if (next === -1) {
                if (ignore || ignoreUnclosed) {
                  next = pos + 1;
                  break;
                } else {
                  unclosed("string");
                }
              }
              escapePos = next;
              while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
                escapePos -= 1;
                escaped = !escaped;
              }
            } while (escaped);
            content = css.slice(pos, next + 1);
            lines = content.split("\n");
            last = lines.length - 1;
            if (last > 0) {
              nextLine = line + last;
              nextOffset = next - lines[last].length;
            } else {
              nextLine = line;
              nextOffset = offset;
            }
            currentToken = ["string", css.slice(pos, next + 1), line, pos - offset, nextLine, next - nextOffset];
            offset = nextOffset;
            line = nextLine;
            pos = next;
            break;
          case AT:
            RE_AT_END.lastIndex = pos + 1;
            RE_AT_END.test(css);
            if (RE_AT_END.lastIndex === 0) {
              next = css.length - 1;
            } else {
              next = RE_AT_END.lastIndex - 2;
            }
            currentToken = ["at-word", css.slice(pos, next + 1), line, pos - offset, line, next - offset];
            pos = next;
            break;
          case BACKSLASH:
            next = pos;
            escape = true;
            while (css.charCodeAt(next + 1) === BACKSLASH) {
              next += 1;
              escape = !escape;
            }
            code = css.charCodeAt(next + 1);
            if (escape && code !== SLASH && code !== SPACE && code !== NEWLINE && code !== TAB && code !== CR && code !== FEED) {
              next += 1;
              if (RE_HEX_ESCAPE.test(css.charAt(next))) {
                while (RE_HEX_ESCAPE.test(css.charAt(next + 1))) {
                  next += 1;
                }
                if (css.charCodeAt(next + 1) === SPACE) {
                  next += 1;
                }
              }
            }
            currentToken = ["word", css.slice(pos, next + 1), line, pos - offset, line, next - offset];
            pos = next;
            break;
          default:
            if (code === SLASH && css.charCodeAt(pos + 1) === ASTERISK) {
              next = css.indexOf("*/", pos + 2) + 1;
              if (next === 0) {
                if (ignore || ignoreUnclosed) {
                  next = css.length;
                } else {
                  unclosed("comment");
                }
              }
              content = css.slice(pos, next + 1);
              lines = content.split("\n");
              last = lines.length - 1;
              if (last > 0) {
                nextLine = line + last;
                nextOffset = next - lines[last].length;
              } else {
                nextLine = line;
                nextOffset = offset;
              }
              currentToken = ["comment", content, line, pos - offset, nextLine, next - nextOffset];
              offset = nextOffset;
              line = nextLine;
              pos = next;
            } else {
              RE_WORD_END.lastIndex = pos + 1;
              RE_WORD_END.test(css);
              if (RE_WORD_END.lastIndex === 0) {
                next = css.length - 1;
              } else {
                next = RE_WORD_END.lastIndex - 2;
              }
              currentToken = ["word", css.slice(pos, next + 1), line, pos - offset, line, next - offset];
              buffer.push(currentToken);
              pos = next;
            }
            break;
        }
        pos++;
        return currentToken;
      }
      function back(token) {
        returned.push(token);
      }
      return {
        back,
        nextToken,
        endOfFile,
        position
      };
    }
    module.exports = exports.default;
  }
});
var require_parse2 = __commonJS2({
  "node_modules/postcss/lib/parse.js"(exports, module) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    exports.default = void 0;
    var _parser = _interopRequireDefault(require_parser3());
    var _input = _interopRequireDefault(require_input());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function parse(css, opts) {
      var input = new _input.default(css, opts);
      var parser = new _parser.default(input);
      try {
        parser.parse();
      } catch (e) {
        if (false) {
          if (e.name === "CssSyntaxError" && opts && opts.from) {
            if (/\.scss$/i.test(opts.from)) {
              e.message += "\nYou tried to parse SCSS with the standard CSS parser; try again with the postcss-scss parser";
            } else if (/\.sass/i.test(opts.from)) {
              e.message += "\nYou tried to parse Sass with the standard CSS parser; try again with the postcss-sass parser";
            } else if (/\.less$/i.test(opts.from)) {
              e.message += "\nYou tried to parse Less with the standard CSS parser; try again with the postcss-less parser";
            }
          }
        }
        throw e;
      }
      return parser.root;
    }
    var _default = parse;
    exports.default = _default;
    module.exports = exports.default;
  }
});
var require_list = __commonJS2({
  "node_modules/postcss/lib/list.js"(exports, module) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    exports.default = void 0;
    var list = {
      split: function split(string, separators, last) {
        var array = [];
        var current = "";
        var split2 = false;
        var func = 0;
        var quote = false;
        var escape = false;
        for (var i = 0; i < string.length; i++) {
          var letter = string[i];
          if (quote) {
            if (escape) {
              escape = false;
            } else if (letter === "\\") {
              escape = true;
            } else if (letter === quote) {
              quote = false;
            }
          } else if (letter === '"' || letter === "'") {
            quote = letter;
          } else if (letter === "(") {
            func += 1;
          } else if (letter === ")") {
            if (func > 0)
              func -= 1;
          } else if (func === 0) {
            if (separators.indexOf(letter) !== -1)
              split2 = true;
          }
          if (split2) {
            if (current !== "")
              array.push(current.trim());
            current = "";
            split2 = false;
          } else {
            current += letter;
          }
        }
        if (last || current !== "")
          array.push(current.trim());
        return array;
      },
      space: function space(string) {
        var spaces = [" ", "\n", "	"];
        return list.split(string, spaces);
      },
      comma: function comma(string) {
        return list.split(string, [","], true);
      }
    };
    var _default = list;
    exports.default = _default;
    module.exports = exports.default;
  }
});
var require_rule = __commonJS2({
  "node_modules/postcss/lib/rule.js"(exports, module) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    exports.default = void 0;
    var _container = _interopRequireDefault(require_container3());
    var _list = _interopRequireDefault(require_list());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
    var Rule = /* @__PURE__ */ function(_Container) {
      _inheritsLoose(Rule2, _Container);
      function Rule2(defaults) {
        var _this;
        _this = _Container.call(this, defaults) || this;
        _this.type = "rule";
        if (!_this.nodes)
          _this.nodes = [];
        return _this;
      }
      _createClass(Rule2, [{
        key: "selectors",
        get: function get() {
          return _list.default.comma(this.selector);
        },
        set: function set(values) {
          var match = this.selector ? this.selector.match(/,\s*/) : null;
          var sep2 = match ? match[0] : "," + this.raw("between", "beforeOpen");
          this.selector = values.join(sep2);
        }
      }]);
      return Rule2;
    }(_container.default);
    var _default = Rule;
    exports.default = _default;
    module.exports = exports.default;
  }
});
var require_container3 = __commonJS2({
  "node_modules/postcss/lib/container.js"(exports, module) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    exports.default = void 0;
    var _declaration = _interopRequireDefault(require_declaration());
    var _comment = _interopRequireDefault(require_comment3());
    var _node = _interopRequireDefault(require_node3());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function _createForOfIteratorHelperLoose(o, allowArrayLike) {
      var it;
      if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
          if (it)
            o = it;
          var i = 0;
          return function() {
            if (i >= o.length)
              return {
                done: true
              };
            return {
              done: false,
              value: o[i++]
            };
          };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      it = o[Symbol.iterator]();
      return it.next.bind(it);
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
    function cleanSource(nodes) {
      return nodes.map(function(i) {
        if (i.nodes)
          i.nodes = cleanSource(i.nodes);
        delete i.source;
        return i;
      });
    }
    var Container = /* @__PURE__ */ function(_Node) {
      _inheritsLoose(Container2, _Node);
      function Container2() {
        return _Node.apply(this, arguments) || this;
      }
      var _proto = Container2.prototype;
      _proto.push = function push(child) {
        child.parent = this;
        this.nodes.push(child);
        return this;
      };
      _proto.each = function each(callback) {
        if (!this.lastEach)
          this.lastEach = 0;
        if (!this.indexes)
          this.indexes = {};
        this.lastEach += 1;
        var id = this.lastEach;
        this.indexes[id] = 0;
        if (!this.nodes)
          return void 0;
        var index, result;
        while (this.indexes[id] < this.nodes.length) {
          index = this.indexes[id];
          result = callback(this.nodes[index], index);
          if (result === false)
            break;
          this.indexes[id] += 1;
        }
        delete this.indexes[id];
        return result;
      };
      _proto.walk = function walk(callback) {
        return this.each(function(child, i) {
          var result;
          try {
            result = callback(child, i);
          } catch (e) {
            e.postcssNode = child;
            if (e.stack && child.source && /\n\s{4}at /.test(e.stack)) {
              var s = child.source;
              e.stack = e.stack.replace(/\n\s{4}at /, "$&" + s.input.from + ":" + s.start.line + ":" + s.start.column + "$&");
            }
            throw e;
          }
          if (result !== false && child.walk) {
            result = child.walk(callback);
          }
          return result;
        });
      };
      _proto.walkDecls = function walkDecls(prop, callback) {
        if (!callback) {
          callback = prop;
          return this.walk(function(child, i) {
            if (child.type === "decl") {
              return callback(child, i);
            }
          });
        }
        if (prop instanceof RegExp) {
          return this.walk(function(child, i) {
            if (child.type === "decl" && prop.test(child.prop)) {
              return callback(child, i);
            }
          });
        }
        return this.walk(function(child, i) {
          if (child.type === "decl" && child.prop === prop) {
            return callback(child, i);
          }
        });
      };
      _proto.walkRules = function walkRules(selector, callback) {
        if (!callback) {
          callback = selector;
          return this.walk(function(child, i) {
            if (child.type === "rule") {
              return callback(child, i);
            }
          });
        }
        if (selector instanceof RegExp) {
          return this.walk(function(child, i) {
            if (child.type === "rule" && selector.test(child.selector)) {
              return callback(child, i);
            }
          });
        }
        return this.walk(function(child, i) {
          if (child.type === "rule" && child.selector === selector) {
            return callback(child, i);
          }
        });
      };
      _proto.walkAtRules = function walkAtRules(name, callback) {
        if (!callback) {
          callback = name;
          return this.walk(function(child, i) {
            if (child.type === "atrule") {
              return callback(child, i);
            }
          });
        }
        if (name instanceof RegExp) {
          return this.walk(function(child, i) {
            if (child.type === "atrule" && name.test(child.name)) {
              return callback(child, i);
            }
          });
        }
        return this.walk(function(child, i) {
          if (child.type === "atrule" && child.name === name) {
            return callback(child, i);
          }
        });
      };
      _proto.walkComments = function walkComments(callback) {
        return this.walk(function(child, i) {
          if (child.type === "comment") {
            return callback(child, i);
          }
        });
      };
      _proto.append = function append() {
        for (var _len = arguments.length, children = new Array(_len), _key = 0; _key < _len; _key++) {
          children[_key] = arguments[_key];
        }
        for (var _i = 0, _children = children; _i < _children.length; _i++) {
          var child = _children[_i];
          var nodes = this.normalize(child, this.last);
          for (var _iterator = _createForOfIteratorHelperLoose(nodes), _step; !(_step = _iterator()).done; ) {
            var node = _step.value;
            this.nodes.push(node);
          }
        }
        return this;
      };
      _proto.prepend = function prepend() {
        for (var _len2 = arguments.length, children = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          children[_key2] = arguments[_key2];
        }
        children = children.reverse();
        for (var _iterator2 = _createForOfIteratorHelperLoose(children), _step2; !(_step2 = _iterator2()).done; ) {
          var child = _step2.value;
          var nodes = this.normalize(child, this.first, "prepend").reverse();
          for (var _iterator3 = _createForOfIteratorHelperLoose(nodes), _step3; !(_step3 = _iterator3()).done; ) {
            var node = _step3.value;
            this.nodes.unshift(node);
          }
          for (var id in this.indexes) {
            this.indexes[id] = this.indexes[id] + nodes.length;
          }
        }
        return this;
      };
      _proto.cleanRaws = function cleanRaws(keepBetween) {
        _Node.prototype.cleanRaws.call(this, keepBetween);
        if (this.nodes) {
          for (var _iterator4 = _createForOfIteratorHelperLoose(this.nodes), _step4; !(_step4 = _iterator4()).done; ) {
            var node = _step4.value;
            node.cleanRaws(keepBetween);
          }
        }
      };
      _proto.insertBefore = function insertBefore(exist, add) {
        exist = this.index(exist);
        var type2 = exist === 0 ? "prepend" : false;
        var nodes = this.normalize(add, this.nodes[exist], type2).reverse();
        for (var _iterator5 = _createForOfIteratorHelperLoose(nodes), _step5; !(_step5 = _iterator5()).done; ) {
          var node = _step5.value;
          this.nodes.splice(exist, 0, node);
        }
        var index;
        for (var id in this.indexes) {
          index = this.indexes[id];
          if (exist <= index) {
            this.indexes[id] = index + nodes.length;
          }
        }
        return this;
      };
      _proto.insertAfter = function insertAfter(exist, add) {
        exist = this.index(exist);
        var nodes = this.normalize(add, this.nodes[exist]).reverse();
        for (var _iterator6 = _createForOfIteratorHelperLoose(nodes), _step6; !(_step6 = _iterator6()).done; ) {
          var node = _step6.value;
          this.nodes.splice(exist + 1, 0, node);
        }
        var index;
        for (var id in this.indexes) {
          index = this.indexes[id];
          if (exist < index) {
            this.indexes[id] = index + nodes.length;
          }
        }
        return this;
      };
      _proto.removeChild = function removeChild(child) {
        child = this.index(child);
        this.nodes[child].parent = void 0;
        this.nodes.splice(child, 1);
        var index;
        for (var id in this.indexes) {
          index = this.indexes[id];
          if (index >= child) {
            this.indexes[id] = index - 1;
          }
        }
        return this;
      };
      _proto.removeAll = function removeAll() {
        for (var _iterator7 = _createForOfIteratorHelperLoose(this.nodes), _step7; !(_step7 = _iterator7()).done; ) {
          var node = _step7.value;
          node.parent = void 0;
        }
        this.nodes = [];
        return this;
      };
      _proto.replaceValues = function replaceValues(pattern, opts, callback) {
        if (!callback) {
          callback = opts;
          opts = {};
        }
        this.walkDecls(function(decl) {
          if (opts.props && opts.props.indexOf(decl.prop) === -1)
            return;
          if (opts.fast && decl.value.indexOf(opts.fast) === -1)
            return;
          decl.value = decl.value.replace(pattern, callback);
        });
        return this;
      };
      _proto.every = function every(condition) {
        return this.nodes.every(condition);
      };
      _proto.some = function some(condition) {
        return this.nodes.some(condition);
      };
      _proto.index = function index(child) {
        if (typeof child === "number") {
          return child;
        }
        return this.nodes.indexOf(child);
      };
      _proto.normalize = function normalize2(nodes, sample) {
        var _this = this;
        if (typeof nodes === "string") {
          var parse = require_parse2();
          nodes = cleanSource(parse(nodes).nodes);
        } else if (Array.isArray(nodes)) {
          nodes = nodes.slice(0);
          for (var _iterator8 = _createForOfIteratorHelperLoose(nodes), _step8; !(_step8 = _iterator8()).done; ) {
            var i = _step8.value;
            if (i.parent)
              i.parent.removeChild(i, "ignore");
          }
        } else if (nodes.type === "root") {
          nodes = nodes.nodes.slice(0);
          for (var _iterator9 = _createForOfIteratorHelperLoose(nodes), _step9; !(_step9 = _iterator9()).done; ) {
            var _i2 = _step9.value;
            if (_i2.parent)
              _i2.parent.removeChild(_i2, "ignore");
          }
        } else if (nodes.type) {
          nodes = [nodes];
        } else if (nodes.prop) {
          if (typeof nodes.value === "undefined") {
            throw new Error("Value field is missed in node creation");
          } else if (typeof nodes.value !== "string") {
            nodes.value = String(nodes.value);
          }
          nodes = [new _declaration.default(nodes)];
        } else if (nodes.selector) {
          var Rule = require_rule();
          nodes = [new Rule(nodes)];
        } else if (nodes.name) {
          var AtRule = require_at_rule();
          nodes = [new AtRule(nodes)];
        } else if (nodes.text) {
          nodes = [new _comment.default(nodes)];
        } else {
          throw new Error("Unknown node type in node creation");
        }
        var processed = nodes.map(function(i2) {
          if (i2.parent)
            i2.parent.removeChild(i2);
          if (typeof i2.raws.before === "undefined") {
            if (sample && typeof sample.raws.before !== "undefined") {
              i2.raws.before = sample.raws.before.replace(/[^\s]/g, "");
            }
          }
          i2.parent = _this;
          return i2;
        });
        return processed;
      };
      _createClass(Container2, [{
        key: "first",
        get: function get() {
          if (!this.nodes)
            return void 0;
          return this.nodes[0];
        }
      }, {
        key: "last",
        get: function get() {
          if (!this.nodes)
            return void 0;
          return this.nodes[this.nodes.length - 1];
        }
      }]);
      return Container2;
    }(_node.default);
    var _default = Container;
    exports.default = _default;
    module.exports = exports.default;
  }
});
var require_at_rule = __commonJS2({
  "node_modules/postcss/lib/at-rule.js"(exports, module) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    exports.default = void 0;
    var _container = _interopRequireDefault(require_container3());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
    var AtRule = /* @__PURE__ */ function(_Container) {
      _inheritsLoose(AtRule2, _Container);
      function AtRule2(defaults) {
        var _this;
        _this = _Container.call(this, defaults) || this;
        _this.type = "atrule";
        return _this;
      }
      var _proto = AtRule2.prototype;
      _proto.append = function append() {
        var _Container$prototype$;
        if (!this.nodes)
          this.nodes = [];
        for (var _len = arguments.length, children = new Array(_len), _key = 0; _key < _len; _key++) {
          children[_key] = arguments[_key];
        }
        return (_Container$prototype$ = _Container.prototype.append).call.apply(_Container$prototype$, [this].concat(children));
      };
      _proto.prepend = function prepend() {
        var _Container$prototype$2;
        if (!this.nodes)
          this.nodes = [];
        for (var _len2 = arguments.length, children = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          children[_key2] = arguments[_key2];
        }
        return (_Container$prototype$2 = _Container.prototype.prepend).call.apply(_Container$prototype$2, [this].concat(children));
      };
      return AtRule2;
    }(_container.default);
    var _default = AtRule;
    exports.default = _default;
    module.exports = exports.default;
  }
});
var require_map_generator = __commonJS2({
  "node_modules/postcss/lib/map-generator.js"(exports, module) {
    init_define_process();
    module.exports = class {
      generate() {
      }
    };
  }
});
var require_warn_once = __commonJS2({
  "node_modules/postcss/lib/warn-once.js"(exports, module) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    exports.default = warnOnce;
    var printed = {};
    function warnOnce(message) {
      if (printed[message])
        return;
      printed[message] = true;
      if (typeof console !== "undefined" && console.warn) {
        console.warn(message);
      }
    }
    module.exports = exports.default;
  }
});
var require_warning = __commonJS2({
  "node_modules/postcss/lib/warning.js"(exports, module) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    exports.default = void 0;
    var Warning = /* @__PURE__ */ function() {
      function Warning2(text, opts) {
        if (opts === void 0) {
          opts = {};
        }
        this.type = "warning";
        this.text = text;
        if (opts.node && opts.node.source) {
          var pos = opts.node.positionBy(opts);
          this.line = pos.line;
          this.column = pos.column;
        }
        for (var opt in opts) {
          this[opt] = opts[opt];
        }
      }
      var _proto = Warning2.prototype;
      _proto.toString = function toString() {
        if (this.node) {
          return this.node.error(this.text, {
            plugin: this.plugin,
            index: this.index,
            word: this.word
          }).message;
        }
        if (this.plugin) {
          return this.plugin + ": " + this.text;
        }
        return this.text;
      };
      return Warning2;
    }();
    var _default = Warning;
    exports.default = _default;
    module.exports = exports.default;
  }
});
var require_result = __commonJS2({
  "node_modules/postcss/lib/result.js"(exports, module) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    exports.default = void 0;
    var _warning = _interopRequireDefault(require_warning());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    var Result = /* @__PURE__ */ function() {
      function Result2(processor, root, opts) {
        this.processor = processor;
        this.messages = [];
        this.root = root;
        this.opts = opts;
        this.css = void 0;
        this.map = void 0;
      }
      var _proto = Result2.prototype;
      _proto.toString = function toString() {
        return this.css;
      };
      _proto.warn = function warn(text, opts) {
        if (opts === void 0) {
          opts = {};
        }
        if (!opts.plugin) {
          if (this.lastPlugin && this.lastPlugin.postcssPlugin) {
            opts.plugin = this.lastPlugin.postcssPlugin;
          }
        }
        var warning = new _warning.default(text, opts);
        this.messages.push(warning);
        return warning;
      };
      _proto.warnings = function warnings() {
        return this.messages.filter(function(i) {
          return i.type === "warning";
        });
      };
      _createClass(Result2, [{
        key: "content",
        get: function get() {
          return this.css;
        }
      }]);
      return Result2;
    }();
    var _default = Result;
    exports.default = _default;
    module.exports = exports.default;
  }
});
var require_lazy_result = __commonJS2({
  "node_modules/postcss/lib/lazy-result.js"(exports, module) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    exports.default = void 0;
    var _mapGenerator = _interopRequireDefault(require_map_generator());
    var _stringify2 = _interopRequireDefault(require_stringify());
    var _warnOnce = _interopRequireDefault(require_warn_once());
    var _result = _interopRequireDefault(require_result());
    var _parse = _interopRequireDefault(require_parse2());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function _createForOfIteratorHelperLoose(o, allowArrayLike) {
      var it;
      if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
          if (it)
            o = it;
          var i = 0;
          return function() {
            if (i >= o.length)
              return {
                done: true
              };
            return {
              done: false,
              value: o[i++]
            };
          };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      it = o[Symbol.iterator]();
      return it.next.bind(it);
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      return Constructor;
    }
    function isPromise(obj) {
      return typeof obj === "object" && typeof obj.then === "function";
    }
    var LazyResult = /* @__PURE__ */ function() {
      function LazyResult2(processor, css, opts) {
        this.stringified = false;
        this.processed = false;
        var root;
        if (typeof css === "object" && css !== null && css.type === "root") {
          root = css;
        } else if (css instanceof LazyResult2 || css instanceof _result.default) {
          root = css.root;
          if (css.map) {
            if (typeof opts.map === "undefined")
              opts.map = {};
            if (!opts.map.inline)
              opts.map.inline = false;
            opts.map.prev = css.map;
          }
        } else {
          var parser = _parse.default;
          if (opts.syntax)
            parser = opts.syntax.parse;
          if (opts.parser)
            parser = opts.parser;
          if (parser.parse)
            parser = parser.parse;
          try {
            root = parser(css, opts);
          } catch (error) {
            this.error = error;
          }
        }
        this.result = new _result.default(processor, root, opts);
      }
      var _proto = LazyResult2.prototype;
      _proto.warnings = function warnings() {
        return this.sync().warnings();
      };
      _proto.toString = function toString() {
        return this.css;
      };
      _proto.then = function then(onFulfilled, onRejected) {
        if (false) {
          if (!("from" in this.opts)) {
            (0, _warnOnce.default)("Without `from` option PostCSS could generate wrong source map and will not find Browserslist config. Set it to CSS file path or to `undefined` to prevent this warning.");
          }
        }
        return this.async().then(onFulfilled, onRejected);
      };
      _proto.catch = function _catch(onRejected) {
        return this.async().catch(onRejected);
      };
      _proto.finally = function _finally(onFinally) {
        return this.async().then(onFinally, onFinally);
      };
      _proto.handleError = function handleError(error, plugin) {
        try {
          this.error = error;
          if (error.name === "CssSyntaxError" && !error.plugin) {
            error.plugin = plugin.postcssPlugin;
            error.setMessage();
          } else if (plugin.postcssVersion) {
            if (false) {
              var pluginName = plugin.postcssPlugin;
              var pluginVer = plugin.postcssVersion;
              var runtimeVer = this.result.processor.version;
              var a = pluginVer.split(".");
              var b = runtimeVer.split(".");
              if (a[0] !== b[0] || parseInt(a[1]) > parseInt(b[1])) {
                console.error("Unknown error from PostCSS plugin. Your current PostCSS version is " + runtimeVer + ", but " + pluginName + " uses " + pluginVer + ". Perhaps this is the source of the error below.");
              }
            }
          }
        } catch (err) {
          if (console && console.error)
            console.error(err);
        }
      };
      _proto.asyncTick = function asyncTick(resolve2, reject) {
        var _this = this;
        if (this.plugin >= this.processor.plugins.length) {
          this.processed = true;
          return resolve2();
        }
        try {
          var plugin = this.processor.plugins[this.plugin];
          var promise = this.run(plugin);
          this.plugin += 1;
          if (isPromise(promise)) {
            promise.then(function() {
              _this.asyncTick(resolve2, reject);
            }).catch(function(error) {
              _this.handleError(error, plugin);
              _this.processed = true;
              reject(error);
            });
          } else {
            this.asyncTick(resolve2, reject);
          }
        } catch (error) {
          this.processed = true;
          reject(error);
        }
      };
      _proto.async = function async() {
        var _this2 = this;
        if (this.processed) {
          return new Promise(function(resolve2, reject) {
            if (_this2.error) {
              reject(_this2.error);
            } else {
              resolve2(_this2.stringify());
            }
          });
        }
        if (this.processing) {
          return this.processing;
        }
        this.processing = new Promise(function(resolve2, reject) {
          if (_this2.error)
            return reject(_this2.error);
          _this2.plugin = 0;
          _this2.asyncTick(resolve2, reject);
        }).then(function() {
          _this2.processed = true;
          return _this2.stringify();
        });
        return this.processing;
      };
      _proto.sync = function sync() {
        if (this.processed)
          return this.result;
        this.processed = true;
        if (this.processing) {
          throw new Error("Use process(css).then(cb) to work with async plugins");
        }
        if (this.error)
          throw this.error;
        for (var _iterator = _createForOfIteratorHelperLoose(this.result.processor.plugins), _step; !(_step = _iterator()).done; ) {
          var plugin = _step.value;
          var promise = this.run(plugin);
          if (isPromise(promise)) {
            throw new Error("Use process(css).then(cb) to work with async plugins");
          }
        }
        return this.result;
      };
      _proto.run = function run(plugin) {
        this.result.lastPlugin = plugin;
        try {
          return plugin(this.result.root, this.result);
        } catch (error) {
          this.handleError(error, plugin);
          throw error;
        }
      };
      _proto.stringify = function stringify() {
        if (this.stringified)
          return this.result;
        this.stringified = true;
        this.sync();
        var opts = this.result.opts;
        var str = _stringify2.default;
        if (opts.syntax)
          str = opts.syntax.stringify;
        if (opts.stringifier)
          str = opts.stringifier;
        if (str.stringify)
          str = str.stringify;
        var map = new _mapGenerator.default(str, this.result.root, this.result.opts);
        var data = map.generate();
        this.result.css = data[0];
        this.result.map = data[1];
        return this.result;
      };
      _createClass(LazyResult2, [{
        key: "processor",
        get: function get() {
          return this.result.processor;
        }
      }, {
        key: "opts",
        get: function get() {
          return this.result.opts;
        }
      }, {
        key: "css",
        get: function get() {
          return this.stringify().css;
        }
      }, {
        key: "content",
        get: function get() {
          return this.stringify().content;
        }
      }, {
        key: "map",
        get: function get() {
          return this.stringify().map;
        }
      }, {
        key: "root",
        get: function get() {
          return this.sync().root;
        }
      }, {
        key: "messages",
        get: function get() {
          return this.sync().messages;
        }
      }]);
      return LazyResult2;
    }();
    var _default = LazyResult;
    exports.default = _default;
    module.exports = exports.default;
  }
});
var require_processor2 = __commonJS2({
  "node_modules/postcss/lib/processor.js"(exports, module) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    exports.default = void 0;
    var _lazyResult = _interopRequireDefault(require_lazy_result());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function _createForOfIteratorHelperLoose(o, allowArrayLike) {
      var it;
      if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
          if (it)
            o = it;
          var i = 0;
          return function() {
            if (i >= o.length)
              return {
                done: true
              };
            return {
              done: false,
              value: o[i++]
            };
          };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      it = o[Symbol.iterator]();
      return it.next.bind(it);
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    var Processor = /* @__PURE__ */ function() {
      function Processor2(plugins) {
        if (plugins === void 0) {
          plugins = [];
        }
        this.version = "7.0.39";
        this.plugins = this.normalize(plugins);
      }
      var _proto = Processor2.prototype;
      _proto.use = function use(plugin) {
        this.plugins = this.plugins.concat(this.normalize([plugin]));
        return this;
      };
      _proto.process = function(_process) {
        function process2(_x) {
          return _process.apply(this, arguments);
        }
        process2.toString = function() {
          return _process.toString();
        };
        return process2;
      }(function(css, opts) {
        if (opts === void 0) {
          opts = {};
        }
        if (this.plugins.length === 0 && opts.parser === opts.stringifier) {
          if (false) {
            if (typeof console !== "undefined" && console.warn) {
              console.warn("You did not set any plugins, parser, or stringifier. Right now, PostCSS does nothing. Pick plugins for your case on https://www.postcss.parts/ and use them in postcss.config.js.");
            }
          }
        }
        return new _lazyResult.default(this, css, opts);
      });
      _proto.normalize = function normalize2(plugins) {
        var normalized = [];
        for (var _iterator = _createForOfIteratorHelperLoose(plugins), _step; !(_step = _iterator()).done; ) {
          var i = _step.value;
          if (i.postcss === true) {
            var plugin = i();
            throw new Error("PostCSS plugin " + plugin.postcssPlugin + " requires PostCSS 8.\nMigration guide for end-users:\nhttps://github.com/postcss/postcss/wiki/PostCSS-8-for-end-users");
          }
          if (i.postcss)
            i = i.postcss;
          if (typeof i === "object" && Array.isArray(i.plugins)) {
            normalized = normalized.concat(i.plugins);
          } else if (typeof i === "function") {
            normalized.push(i);
          } else if (typeof i === "object" && (i.parse || i.stringify)) {
            if (false) {
              throw new Error("PostCSS syntaxes cannot be used as plugins. Instead, please use one of the syntax/parser/stringifier options as outlined in your PostCSS runner documentation.");
            }
          } else if (typeof i === "object" && i.postcssPlugin) {
            throw new Error("PostCSS plugin " + i.postcssPlugin + " requires PostCSS 8.\nMigration guide for end-users:\nhttps://github.com/postcss/postcss/wiki/PostCSS-8-for-end-users");
          } else {
            throw new Error(i + " is not a PostCSS plugin");
          }
        }
        return normalized;
      };
      return Processor2;
    }();
    var _default = Processor;
    exports.default = _default;
    module.exports = exports.default;
  }
});
var require_root3 = __commonJS2({
  "node_modules/postcss/lib/root.js"(exports, module) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    exports.default = void 0;
    var _container = _interopRequireDefault(require_container3());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function _createForOfIteratorHelperLoose(o, allowArrayLike) {
      var it;
      if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
          if (it)
            o = it;
          var i = 0;
          return function() {
            if (i >= o.length)
              return {
                done: true
              };
            return {
              done: false,
              value: o[i++]
            };
          };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      it = o[Symbol.iterator]();
      return it.next.bind(it);
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }
      return arr2;
    }
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
    var Root = /* @__PURE__ */ function(_Container) {
      _inheritsLoose(Root2, _Container);
      function Root2(defaults) {
        var _this;
        _this = _Container.call(this, defaults) || this;
        _this.type = "root";
        if (!_this.nodes)
          _this.nodes = [];
        return _this;
      }
      var _proto = Root2.prototype;
      _proto.removeChild = function removeChild(child, ignore) {
        var index = this.index(child);
        if (!ignore && index === 0 && this.nodes.length > 1) {
          this.nodes[1].raws.before = this.nodes[index].raws.before;
        }
        return _Container.prototype.removeChild.call(this, child);
      };
      _proto.normalize = function normalize2(child, sample, type2) {
        var nodes = _Container.prototype.normalize.call(this, child);
        if (sample) {
          if (type2 === "prepend") {
            if (this.nodes.length > 1) {
              sample.raws.before = this.nodes[1].raws.before;
            } else {
              delete sample.raws.before;
            }
          } else if (this.first !== sample) {
            for (var _iterator = _createForOfIteratorHelperLoose(nodes), _step; !(_step = _iterator()).done; ) {
              var node = _step.value;
              node.raws.before = sample.raws.before;
            }
          }
        }
        return nodes;
      };
      _proto.toResult = function toResult(opts) {
        if (opts === void 0) {
          opts = {};
        }
        var LazyResult = require_lazy_result();
        var Processor = require_processor2();
        var lazy = new LazyResult(new Processor(), this, opts);
        return lazy.stringify();
      };
      return Root2;
    }(_container.default);
    var _default = Root;
    exports.default = _default;
    module.exports = exports.default;
  }
});
var require_parser3 = __commonJS2({
  "node_modules/postcss/lib/parser.js"(exports, module) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    exports.default = void 0;
    var _declaration = _interopRequireDefault(require_declaration());
    var _tokenize = _interopRequireDefault(require_tokenize3());
    var _comment = _interopRequireDefault(require_comment3());
    var _atRule = _interopRequireDefault(require_at_rule());
    var _root = _interopRequireDefault(require_root3());
    var _rule = _interopRequireDefault(require_rule());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    var Parser = /* @__PURE__ */ function() {
      function Parser2(input) {
        this.input = input;
        this.root = new _root.default();
        this.current = this.root;
        this.spaces = "";
        this.semicolon = false;
        this.createTokenizer();
        this.root.source = {
          input,
          start: {
            line: 1,
            column: 1
          }
        };
      }
      var _proto = Parser2.prototype;
      _proto.createTokenizer = function createTokenizer() {
        this.tokenizer = (0, _tokenize.default)(this.input);
      };
      _proto.parse = function parse() {
        var token;
        while (!this.tokenizer.endOfFile()) {
          token = this.tokenizer.nextToken();
          switch (token[0]) {
            case "space":
              this.spaces += token[1];
              break;
            case ";":
              this.freeSemicolon(token);
              break;
            case "}":
              this.end(token);
              break;
            case "comment":
              this.comment(token);
              break;
            case "at-word":
              this.atrule(token);
              break;
            case "{":
              this.emptyRule(token);
              break;
            default:
              this.other(token);
              break;
          }
        }
        this.endFile();
      };
      _proto.comment = function comment(token) {
        var node = new _comment.default();
        this.init(node, token[2], token[3]);
        node.source.end = {
          line: token[4],
          column: token[5]
        };
        var text = token[1].slice(2, -2);
        if (/^\s*$/.test(text)) {
          node.text = "";
          node.raws.left = text;
          node.raws.right = "";
        } else {
          var match = text.match(/^(\s*)([^]*[^\s])(\s*)$/);
          node.text = match[2];
          node.raws.left = match[1];
          node.raws.right = match[3];
        }
      };
      _proto.emptyRule = function emptyRule(token) {
        var node = new _rule.default();
        this.init(node, token[2], token[3]);
        node.selector = "";
        node.raws.between = "";
        this.current = node;
      };
      _proto.other = function other(start) {
        var end = false;
        var type2 = null;
        var colon = false;
        var bracket = null;
        var brackets = [];
        var tokens = [];
        var token = start;
        while (token) {
          type2 = token[0];
          tokens.push(token);
          if (type2 === "(" || type2 === "[") {
            if (!bracket)
              bracket = token;
            brackets.push(type2 === "(" ? ")" : "]");
          } else if (brackets.length === 0) {
            if (type2 === ";") {
              if (colon) {
                this.decl(tokens);
                return;
              } else {
                break;
              }
            } else if (type2 === "{") {
              this.rule(tokens);
              return;
            } else if (type2 === "}") {
              this.tokenizer.back(tokens.pop());
              end = true;
              break;
            } else if (type2 === ":") {
              colon = true;
            }
          } else if (type2 === brackets[brackets.length - 1]) {
            brackets.pop();
            if (brackets.length === 0)
              bracket = null;
          }
          token = this.tokenizer.nextToken();
        }
        if (this.tokenizer.endOfFile())
          end = true;
        if (brackets.length > 0)
          this.unclosedBracket(bracket);
        if (end && colon) {
          while (tokens.length) {
            token = tokens[tokens.length - 1][0];
            if (token !== "space" && token !== "comment")
              break;
            this.tokenizer.back(tokens.pop());
          }
          this.decl(tokens);
        } else {
          this.unknownWord(tokens);
        }
      };
      _proto.rule = function rule(tokens) {
        tokens.pop();
        var node = new _rule.default();
        this.init(node, tokens[0][2], tokens[0][3]);
        node.raws.between = this.spacesAndCommentsFromEnd(tokens);
        this.raw(node, "selector", tokens);
        this.current = node;
      };
      _proto.decl = function decl(tokens) {
        var node = new _declaration.default();
        this.init(node);
        var last = tokens[tokens.length - 1];
        if (last[0] === ";") {
          this.semicolon = true;
          tokens.pop();
        }
        if (last[4]) {
          node.source.end = {
            line: last[4],
            column: last[5]
          };
        } else {
          node.source.end = {
            line: last[2],
            column: last[3]
          };
        }
        while (tokens[0][0] !== "word") {
          if (tokens.length === 1)
            this.unknownWord(tokens);
          node.raws.before += tokens.shift()[1];
        }
        node.source.start = {
          line: tokens[0][2],
          column: tokens[0][3]
        };
        node.prop = "";
        while (tokens.length) {
          var type2 = tokens[0][0];
          if (type2 === ":" || type2 === "space" || type2 === "comment") {
            break;
          }
          node.prop += tokens.shift()[1];
        }
        node.raws.between = "";
        var token;
        while (tokens.length) {
          token = tokens.shift();
          if (token[0] === ":") {
            node.raws.between += token[1];
            break;
          } else {
            if (token[0] === "word" && /\w/.test(token[1])) {
              this.unknownWord([token]);
            }
            node.raws.between += token[1];
          }
        }
        if (node.prop[0] === "_" || node.prop[0] === "*") {
          node.raws.before += node.prop[0];
          node.prop = node.prop.slice(1);
        }
        node.raws.between += this.spacesAndCommentsFromStart(tokens);
        this.precheckMissedSemicolon(tokens);
        for (var i = tokens.length - 1; i > 0; i--) {
          token = tokens[i];
          if (token[1].toLowerCase() === "!important") {
            node.important = true;
            var string = this.stringFrom(tokens, i);
            string = this.spacesFromEnd(tokens) + string;
            if (string !== " !important")
              node.raws.important = string;
            break;
          } else if (token[1].toLowerCase() === "important") {
            var cache = tokens.slice(0);
            var str = "";
            for (var j = i; j > 0; j--) {
              var _type = cache[j][0];
              if (str.trim().indexOf("!") === 0 && _type !== "space") {
                break;
              }
              str = cache.pop()[1] + str;
            }
            if (str.trim().indexOf("!") === 0) {
              node.important = true;
              node.raws.important = str;
              tokens = cache;
            }
          }
          if (token[0] !== "space" && token[0] !== "comment") {
            break;
          }
        }
        this.raw(node, "value", tokens);
        if (node.value.indexOf(":") !== -1)
          this.checkMissedSemicolon(tokens);
      };
      _proto.atrule = function atrule(token) {
        var node = new _atRule.default();
        node.name = token[1].slice(1);
        if (node.name === "") {
          this.unnamedAtrule(node, token);
        }
        this.init(node, token[2], token[3]);
        var prev;
        var shift;
        var last = false;
        var open = false;
        var params = [];
        while (!this.tokenizer.endOfFile()) {
          token = this.tokenizer.nextToken();
          if (token[0] === ";") {
            node.source.end = {
              line: token[2],
              column: token[3]
            };
            this.semicolon = true;
            break;
          } else if (token[0] === "{") {
            open = true;
            break;
          } else if (token[0] === "}") {
            if (params.length > 0) {
              shift = params.length - 1;
              prev = params[shift];
              while (prev && prev[0] === "space") {
                prev = params[--shift];
              }
              if (prev) {
                node.source.end = {
                  line: prev[4],
                  column: prev[5]
                };
              }
            }
            this.end(token);
            break;
          } else {
            params.push(token);
          }
          if (this.tokenizer.endOfFile()) {
            last = true;
            break;
          }
        }
        node.raws.between = this.spacesAndCommentsFromEnd(params);
        if (params.length) {
          node.raws.afterName = this.spacesAndCommentsFromStart(params);
          this.raw(node, "params", params);
          if (last) {
            token = params[params.length - 1];
            node.source.end = {
              line: token[4],
              column: token[5]
            };
            this.spaces = node.raws.between;
            node.raws.between = "";
          }
        } else {
          node.raws.afterName = "";
          node.params = "";
        }
        if (open) {
          node.nodes = [];
          this.current = node;
        }
      };
      _proto.end = function end(token) {
        if (this.current.nodes && this.current.nodes.length) {
          this.current.raws.semicolon = this.semicolon;
        }
        this.semicolon = false;
        this.current.raws.after = (this.current.raws.after || "") + this.spaces;
        this.spaces = "";
        if (this.current.parent) {
          this.current.source.end = {
            line: token[2],
            column: token[3]
          };
          this.current = this.current.parent;
        } else {
          this.unexpectedClose(token);
        }
      };
      _proto.endFile = function endFile() {
        if (this.current.parent)
          this.unclosedBlock();
        if (this.current.nodes && this.current.nodes.length) {
          this.current.raws.semicolon = this.semicolon;
        }
        this.current.raws.after = (this.current.raws.after || "") + this.spaces;
      };
      _proto.freeSemicolon = function freeSemicolon(token) {
        this.spaces += token[1];
        if (this.current.nodes) {
          var prev = this.current.nodes[this.current.nodes.length - 1];
          if (prev && prev.type === "rule" && !prev.raws.ownSemicolon) {
            prev.raws.ownSemicolon = this.spaces;
            this.spaces = "";
          }
        }
      };
      _proto.init = function init(node, line, column) {
        this.current.push(node);
        node.source = {
          start: {
            line,
            column
          },
          input: this.input
        };
        node.raws.before = this.spaces;
        this.spaces = "";
        if (node.type !== "comment")
          this.semicolon = false;
      };
      _proto.raw = function raw(node, prop, tokens) {
        var token, type2;
        var length = tokens.length;
        var value = "";
        var clean = true;
        var next, prev;
        var pattern = /^([.|#])?([\w])+/i;
        for (var i = 0; i < length; i += 1) {
          token = tokens[i];
          type2 = token[0];
          if (type2 === "comment" && node.type === "rule") {
            prev = tokens[i - 1];
            next = tokens[i + 1];
            if (prev[0] !== "space" && next[0] !== "space" && pattern.test(prev[1]) && pattern.test(next[1])) {
              value += token[1];
            } else {
              clean = false;
            }
            continue;
          }
          if (type2 === "comment" || type2 === "space" && i === length - 1) {
            clean = false;
          } else {
            value += token[1];
          }
        }
        if (!clean) {
          var raw2 = tokens.reduce(function(all, i2) {
            return all + i2[1];
          }, "");
          node.raws[prop] = {
            value,
            raw: raw2
          };
        }
        node[prop] = value;
      };
      _proto.spacesAndCommentsFromEnd = function spacesAndCommentsFromEnd(tokens) {
        var lastTokenType;
        var spaces = "";
        while (tokens.length) {
          lastTokenType = tokens[tokens.length - 1][0];
          if (lastTokenType !== "space" && lastTokenType !== "comment")
            break;
          spaces = tokens.pop()[1] + spaces;
        }
        return spaces;
      };
      _proto.spacesAndCommentsFromStart = function spacesAndCommentsFromStart(tokens) {
        var next;
        var spaces = "";
        while (tokens.length) {
          next = tokens[0][0];
          if (next !== "space" && next !== "comment")
            break;
          spaces += tokens.shift()[1];
        }
        return spaces;
      };
      _proto.spacesFromEnd = function spacesFromEnd(tokens) {
        var lastTokenType;
        var spaces = "";
        while (tokens.length) {
          lastTokenType = tokens[tokens.length - 1][0];
          if (lastTokenType !== "space")
            break;
          spaces = tokens.pop()[1] + spaces;
        }
        return spaces;
      };
      _proto.stringFrom = function stringFrom(tokens, from) {
        var result = "";
        for (var i = from; i < tokens.length; i++) {
          result += tokens[i][1];
        }
        tokens.splice(from, tokens.length - from);
        return result;
      };
      _proto.colon = function colon(tokens) {
        var brackets = 0;
        var token, type2, prev;
        for (var i = 0; i < tokens.length; i++) {
          token = tokens[i];
          type2 = token[0];
          if (type2 === "(") {
            brackets += 1;
          }
          if (type2 === ")") {
            brackets -= 1;
          }
          if (brackets === 0 && type2 === ":") {
            if (!prev) {
              this.doubleColon(token);
            } else if (prev[0] === "word" && prev[1] === "progid") {
              continue;
            } else {
              return i;
            }
          }
          prev = token;
        }
        return false;
      };
      _proto.unclosedBracket = function unclosedBracket(bracket) {
        throw this.input.error("Unclosed bracket", bracket[2], bracket[3]);
      };
      _proto.unknownWord = function unknownWord(tokens) {
        throw this.input.error("Unknown word", tokens[0][2], tokens[0][3]);
      };
      _proto.unexpectedClose = function unexpectedClose(token) {
        throw this.input.error("Unexpected }", token[2], token[3]);
      };
      _proto.unclosedBlock = function unclosedBlock() {
        var pos = this.current.source.start;
        throw this.input.error("Unclosed block", pos.line, pos.column);
      };
      _proto.doubleColon = function doubleColon(token) {
        throw this.input.error("Double colon", token[2], token[3]);
      };
      _proto.unnamedAtrule = function unnamedAtrule(node, token) {
        throw this.input.error("At-rule without name", token[2], token[3]);
      };
      _proto.precheckMissedSemicolon = function precheckMissedSemicolon() {
      };
      _proto.checkMissedSemicolon = function checkMissedSemicolon(tokens) {
        var colon = this.colon(tokens);
        if (colon === false)
          return;
        var founded = 0;
        var token;
        for (var j = colon - 1; j >= 0; j--) {
          token = tokens[j];
          if (token[0] !== "space") {
            founded += 1;
            if (founded === 2)
              break;
          }
        }
        throw this.input.error("Missed semicolon", token[2], token[3]);
      };
      return Parser2;
    }();
    exports.default = Parser;
    module.exports = exports.default;
  }
});
var require_inline_comment = __commonJS2({
  "node_modules/postcss-less/lib/nodes/inline-comment.js"(exports, module) {
    init_define_process();
    var tokenizer = require_tokenize3();
    var Input = require_input();
    module.exports = {
      isInlineComment(token) {
        if (token[0] === "word" && token[1].slice(0, 2) === "//") {
          const first = token;
          const bits = [];
          let last;
          while (token) {
            if (/\r?\n/.test(token[1])) {
              if (/['"].*\r?\n/.test(token[1])) {
                bits.push(token[1].substring(0, token[1].indexOf("\n")));
                let remainingInput = token[1].substring(token[1].indexOf("\n"));
                remainingInput += this.input.css.valueOf().substring(this.tokenizer.position());
                this.input = new Input(remainingInput);
                this.tokenizer = tokenizer(this.input);
              } else {
                this.tokenizer.back(token);
              }
              break;
            }
            bits.push(token[1]);
            last = token;
            token = this.tokenizer.nextToken({
              ignoreUnclosed: true
            });
          }
          const newToken = ["comment", bits.join(""), first[2], first[3], last[2], last[3]];
          this.inlineComment(newToken);
          return true;
        } else if (token[1] === "/") {
          const next = this.tokenizer.nextToken({
            ignoreUnclosed: true
          });
          if (next[0] === "comment" && /^\/\*/.test(next[1])) {
            next[0] = "word";
            next[1] = next[1].slice(1);
            token[1] = "//";
            this.tokenizer.back(next);
            return module.exports.isInlineComment.bind(this)(token);
          }
        }
        return false;
      }
    };
  }
});
var require_interpolation = __commonJS2({
  "node_modules/postcss-less/lib/nodes/interpolation.js"(exports, module) {
    init_define_process();
    module.exports = {
      interpolation(token) {
        let first = token;
        const tokens = [token];
        const validTypes = ["word", "{", "}"];
        token = this.tokenizer.nextToken();
        if (first[1].length > 1 || token[0] !== "{") {
          this.tokenizer.back(token);
          return false;
        }
        while (token && validTypes.includes(token[0])) {
          tokens.push(token);
          token = this.tokenizer.nextToken();
        }
        const words = tokens.map((tokn) => tokn[1]);
        [first] = tokens;
        const last = tokens.pop();
        const start = [first[2], first[3]];
        const end = [last[4] || last[2], last[5] || last[3]];
        const newToken = ["word", words.join("")].concat(start, end);
        this.tokenizer.back(token);
        this.tokenizer.back(newToken);
        return true;
      }
    };
  }
});
var require_mixin = __commonJS2({
  "node_modules/postcss-less/lib/nodes/mixin.js"(exports, module) {
    init_define_process();
    var hashColorPattern = /^#[0-9a-fA-F]{6}$|^#[0-9a-fA-F]{3}$/;
    var unpaddedFractionalNumbersPattern = /\.[0-9]/;
    var isMixinToken = (token) => {
      const [, symbol] = token;
      const [char] = symbol;
      return (char === "." || char === "#") && hashColorPattern.test(symbol) === false && unpaddedFractionalNumbersPattern.test(symbol) === false;
    };
    module.exports = {
      isMixinToken
    };
  }
});
var require_import = __commonJS2({
  "node_modules/postcss-less/lib/nodes/import.js"(exports, module) {
    init_define_process();
    var tokenize = require_tokenize3();
    var urlPattern = /^url\((.+)\)/;
    module.exports = (node) => {
      const {
        name,
        params = ""
      } = node;
      if (name === "import" && params.length) {
        node.import = true;
        const tokenizer = tokenize({
          css: params
        });
        node.filename = params.replace(urlPattern, "$1");
        while (!tokenizer.endOfFile()) {
          const [type2, content] = tokenizer.nextToken();
          if (type2 === "word" && content === "url") {
            return;
          } else if (type2 === "brackets") {
            node.options = content;
            node.filename = params.replace(content, "").trim();
            break;
          }
        }
      }
    };
  }
});
var require_variable = __commonJS2({
  "node_modules/postcss-less/lib/nodes/variable.js"(exports, module) {
    init_define_process();
    var afterPattern = /:$/;
    var beforePattern = /^:(\s+)?/;
    module.exports = (node) => {
      const {
        name,
        params = ""
      } = node;
      if (node.name.slice(-1) !== ":") {
        return;
      }
      if (afterPattern.test(name)) {
        const [match] = name.match(afterPattern);
        node.name = name.replace(match, "");
        node.raws.afterName = match + (node.raws.afterName || "");
        node.variable = true;
        node.value = node.params;
      }
      if (beforePattern.test(params)) {
        const [match] = params.match(beforePattern);
        node.value = params.replace(match, "");
        node.raws.afterName = (node.raws.afterName || "") + match;
        node.variable = true;
      }
    };
  }
});
var require_LessParser = __commonJS2({
  "node_modules/postcss-less/lib/LessParser.js"(exports, module) {
    init_define_process();
    var Comment = require_comment3();
    var Parser = require_parser3();
    var {
      isInlineComment
    } = require_inline_comment();
    var {
      interpolation
    } = require_interpolation();
    var {
      isMixinToken
    } = require_mixin();
    var importNode = require_import();
    var variableNode = require_variable();
    var importantPattern = /(!\s*important)$/i;
    module.exports = class LessParser extends Parser {
      constructor() {
        super(...arguments);
        this.lastNode = null;
      }
      atrule(token) {
        if (interpolation.bind(this)(token)) {
          return;
        }
        super.atrule(token);
        importNode(this.lastNode);
        variableNode(this.lastNode);
      }
      decl() {
        super.decl(...arguments);
        const extendPattern = /extend\(.+\)/i;
        if (extendPattern.test(this.lastNode.value)) {
          this.lastNode.extend = true;
        }
      }
      each(tokens) {
        tokens[0][1] = ` ${tokens[0][1]}`;
        const firstParenIndex = tokens.findIndex((t) => t[0] === "(");
        const lastParen = tokens.reverse().find((t) => t[0] === ")");
        const lastParenIndex = tokens.reverse().indexOf(lastParen);
        const paramTokens = tokens.splice(firstParenIndex, lastParenIndex);
        const params = paramTokens.map((t) => t[1]).join("");
        for (const token of tokens.reverse()) {
          this.tokenizer.back(token);
        }
        this.atrule(this.tokenizer.nextToken());
        this.lastNode.function = true;
        this.lastNode.params = params;
      }
      init(node, line, column) {
        super.init(node, line, column);
        this.lastNode = node;
      }
      inlineComment(token) {
        const node = new Comment();
        const text = token[1].slice(2);
        this.init(node, token[2], token[3]);
        node.source.end = {
          line: token[4],
          column: token[5]
        };
        node.inline = true;
        node.raws.begin = "//";
        if (/^\s*$/.test(text)) {
          node.text = "";
          node.raws.left = text;
          node.raws.right = "";
        } else {
          const match = text.match(/^(\s*)([^]*[^\s])(\s*)$/);
          [, node.raws.left, node.text, node.raws.right] = match;
        }
      }
      mixin(tokens) {
        const [first] = tokens;
        const identifier = first[1].slice(0, 1);
        const bracketsIndex = tokens.findIndex((t) => t[0] === "brackets");
        const firstParenIndex = tokens.findIndex((t) => t[0] === "(");
        let important = "";
        if ((bracketsIndex < 0 || bracketsIndex > 3) && firstParenIndex > 0) {
          const lastParenIndex = tokens.reduce((last2, t, i) => t[0] === ")" ? i : last2);
          const contents = tokens.slice(firstParenIndex, lastParenIndex + firstParenIndex);
          const brackets = contents.map((t) => t[1]).join("");
          const [paren] = tokens.slice(firstParenIndex);
          const start = [paren[2], paren[3]];
          const [last] = tokens.slice(lastParenIndex, lastParenIndex + 1);
          const end = [last[2], last[3]];
          const newToken = ["brackets", brackets].concat(start, end);
          const tokensBefore = tokens.slice(0, firstParenIndex);
          const tokensAfter = tokens.slice(lastParenIndex + 1);
          tokens = tokensBefore;
          tokens.push(newToken);
          tokens = tokens.concat(tokensAfter);
        }
        const importantTokens = [];
        for (const token of tokens) {
          if (token[1] === "!" || importantTokens.length) {
            importantTokens.push(token);
          }
          if (token[1] === "important") {
            break;
          }
        }
        if (importantTokens.length) {
          const [bangToken] = importantTokens;
          const bangIndex = tokens.indexOf(bangToken);
          const last = importantTokens[importantTokens.length - 1];
          const start = [bangToken[2], bangToken[3]];
          const end = [last[4], last[5]];
          const combined = importantTokens.map((t) => t[1]).join("");
          const newToken = ["word", combined].concat(start, end);
          tokens.splice(bangIndex, importantTokens.length, newToken);
        }
        const importantIndex = tokens.findIndex((t) => importantPattern.test(t[1]));
        if (importantIndex > 0) {
          [, important] = tokens[importantIndex];
          tokens.splice(importantIndex, 1);
        }
        for (const token of tokens.reverse()) {
          this.tokenizer.back(token);
        }
        this.atrule(this.tokenizer.nextToken());
        this.lastNode.mixin = true;
        this.lastNode.raws.identifier = identifier;
        if (important) {
          this.lastNode.important = true;
          this.lastNode.raws.important = important;
        }
      }
      other(token) {
        if (!isInlineComment.bind(this)(token)) {
          super.other(token);
        }
      }
      rule(tokens) {
        const last = tokens[tokens.length - 1];
        const prev = tokens[tokens.length - 2];
        if (prev[0] === "at-word" && last[0] === "{") {
          this.tokenizer.back(last);
          if (interpolation.bind(this)(prev)) {
            const newToken = this.tokenizer.nextToken();
            tokens = tokens.slice(0, tokens.length - 2).concat([newToken]);
            for (const tokn of tokens.reverse()) {
              this.tokenizer.back(tokn);
            }
            return;
          }
        }
        super.rule(tokens);
        const extendPattern = /:extend\(.+\)/i;
        if (extendPattern.test(this.lastNode.selector)) {
          this.lastNode.extend = true;
        }
      }
      unknownWord(tokens) {
        const [first] = tokens;
        if (tokens[0][1] === "each" && tokens[1][0] === "(") {
          this.each(tokens);
          return;
        }
        if (isMixinToken(first)) {
          this.mixin(tokens);
          return;
        }
        super.unknownWord(tokens);
      }
    };
  }
});
var require_LessStringifier = __commonJS2({
  "node_modules/postcss-less/lib/LessStringifier.js"(exports, module) {
    init_define_process();
    var Stringifier = require_stringifier();
    module.exports = class LessStringifier extends Stringifier {
      atrule(node, semicolon) {
        if (!node.mixin && !node.variable && !node.function) {
          super.atrule(node, semicolon);
          return;
        }
        const identifier = node.function ? "" : node.raws.identifier || "@";
        let name = `${identifier}${node.name}`;
        let params = node.params ? this.rawValue(node, "params") : "";
        const important = node.raws.important || "";
        if (node.variable) {
          params = node.value;
        }
        if (typeof node.raws.afterName !== "undefined") {
          name += node.raws.afterName;
        } else if (params) {
          name += " ";
        }
        if (node.nodes) {
          this.block(node, name + params + important);
        } else {
          const end = (node.raws.between || "") + important + (semicolon ? ";" : "");
          this.builder(name + params + end, node);
        }
      }
      comment(node) {
        if (node.inline) {
          const left = this.raw(node, "left", "commentLeft");
          const right = this.raw(node, "right", "commentRight");
          this.builder(`//${left}${node.text}${right}`, node);
        } else {
          super.comment(node);
        }
      }
    };
  }
});
var require_lib2 = __commonJS2({
  "node_modules/postcss-less/lib/index.js"(exports, module) {
    init_define_process();
    var Input = require_input();
    var LessParser = require_LessParser();
    var LessStringifier = require_LessStringifier();
    module.exports = {
      parse(less, options) {
        const input = new Input(less, options);
        const parser = new LessParser(input);
        parser.parse();
        return parser.root;
      },
      stringify(node, builder) {
        const stringifier = new LessStringifier(builder);
        stringifier.stringify(node);
      },
      nodeToString(node) {
        let result = "";
        module.exports.stringify(node, (bit) => {
          result += bit;
        });
        return result;
      }
    };
  }
});
var require_scss_stringifier = __commonJS2({
  "node_modules/postcss-scss/lib/scss-stringifier.js"(exports, module) {
    "use strict";
    init_define_process();
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
    var Stringifier = require_stringifier();
    var ScssStringifier = /* @__PURE__ */ function(_Stringifier) {
      _inheritsLoose(ScssStringifier2, _Stringifier);
      function ScssStringifier2() {
        return _Stringifier.apply(this, arguments) || this;
      }
      var _proto = ScssStringifier2.prototype;
      _proto.comment = function comment(node) {
        var left = this.raw(node, "left", "commentLeft");
        var right = this.raw(node, "right", "commentRight");
        if (node.raws.inline) {
          var text = node.raws.text || node.text;
          this.builder("//" + left + text + right, node);
        } else {
          this.builder("/*" + left + node.text + right + "*/", node);
        }
      };
      _proto.decl = function decl(node, semicolon) {
        if (!node.isNested) {
          _Stringifier.prototype.decl.call(this, node, semicolon);
        } else {
          var between = this.raw(node, "between", "colon");
          var string = node.prop + between + this.rawValue(node, "value");
          if (node.important) {
            string += node.raws.important || " !important";
          }
          this.builder(string + "{", node, "start");
          var after;
          if (node.nodes && node.nodes.length) {
            this.body(node);
            after = this.raw(node, "after");
          } else {
            after = this.raw(node, "after", "emptyBody");
          }
          if (after)
            this.builder(after);
          this.builder("}", node, "end");
        }
      };
      _proto.rawValue = function rawValue(node, prop) {
        var value = node[prop];
        var raw = node.raws[prop];
        if (raw && raw.value === value) {
          return raw.scss ? raw.scss : raw.raw;
        } else {
          return value;
        }
      };
      return ScssStringifier2;
    }(Stringifier);
    module.exports = ScssStringifier;
  }
});
var require_scss_stringify = __commonJS2({
  "node_modules/postcss-scss/lib/scss-stringify.js"(exports, module) {
    "use strict";
    init_define_process();
    var ScssStringifier = require_scss_stringifier();
    module.exports = function scssStringify(node, builder) {
      var str = new ScssStringifier(builder);
      str.stringify(node);
    };
  }
});
var require_nested_declaration = __commonJS2({
  "node_modules/postcss-scss/lib/nested-declaration.js"(exports, module) {
    "use strict";
    init_define_process();
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
    var Container = require_container3();
    var NestedDeclaration = /* @__PURE__ */ function(_Container) {
      _inheritsLoose(NestedDeclaration2, _Container);
      function NestedDeclaration2(defaults) {
        var _this;
        _this = _Container.call(this, defaults) || this;
        _this.type = "decl";
        _this.isNested = true;
        if (!_this.nodes)
          _this.nodes = [];
        return _this;
      }
      return NestedDeclaration2;
    }(Container);
    module.exports = NestedDeclaration;
  }
});
var require_scss_tokenize = __commonJS2({
  "node_modules/postcss-scss/lib/scss-tokenize.js"(exports, module) {
    "use strict";
    init_define_process();
    var SINGLE_QUOTE = "'".charCodeAt(0);
    var DOUBLE_QUOTE = '"'.charCodeAt(0);
    var BACKSLASH = "\\".charCodeAt(0);
    var SLASH = "/".charCodeAt(0);
    var NEWLINE = "\n".charCodeAt(0);
    var SPACE = " ".charCodeAt(0);
    var FEED = "\f".charCodeAt(0);
    var TAB = "	".charCodeAt(0);
    var CR = "\r".charCodeAt(0);
    var OPEN_SQUARE = "[".charCodeAt(0);
    var CLOSE_SQUARE = "]".charCodeAt(0);
    var OPEN_PARENTHESES = "(".charCodeAt(0);
    var CLOSE_PARENTHESES = ")".charCodeAt(0);
    var OPEN_CURLY = "{".charCodeAt(0);
    var CLOSE_CURLY = "}".charCodeAt(0);
    var SEMICOLON = ";".charCodeAt(0);
    var ASTERISK = "*".charCodeAt(0);
    var COLON = ":".charCodeAt(0);
    var AT = "@".charCodeAt(0);
    var COMMA = ",".charCodeAt(0);
    var HASH = "#".charCodeAt(0);
    var RE_AT_END = /[ \n\t\r\f{}()'"\\;/[\]#]/g;
    var RE_WORD_END = /[ \n\t\r\f(){}:;@!'"\\\][#]|\/(?=\*)/g;
    var RE_BAD_BRACKET = /.[\\/("'\n]/;
    var RE_HEX_ESCAPE = /[a-f0-9]/i;
    var RE_NEW_LINE = /[\r\f\n]/g;
    module.exports = function scssTokenize(input, options) {
      if (options === void 0) {
        options = {};
      }
      var css = input.css.valueOf();
      var ignore = options.ignoreErrors;
      var code, next, quote, lines, last, content, escape, nextLine, nextOffset, escaped, prev, n, currentToken;
      var brackets;
      var length = css.length;
      var offset = -1;
      var line = 1;
      var pos = 0;
      var buffer = [];
      var returned = [];
      function unclosed(what) {
        throw input.error("Unclosed " + what, line, pos - offset);
      }
      function endOfFile() {
        return returned.length === 0 && pos >= length;
      }
      function interpolation() {
        var deep = 1;
        var stringQuote = false;
        var stringEscaped = false;
        while (deep > 0) {
          next += 1;
          if (css.length <= next)
            unclosed("interpolation");
          code = css.charCodeAt(next);
          n = css.charCodeAt(next + 1);
          if (stringQuote) {
            if (!stringEscaped && code === stringQuote) {
              stringQuote = false;
              stringEscaped = false;
            } else if (code === BACKSLASH) {
              stringEscaped = !escaped;
            } else if (stringEscaped) {
              stringEscaped = false;
            }
          } else if (code === SINGLE_QUOTE || code === DOUBLE_QUOTE) {
            stringQuote = code;
          } else if (code === CLOSE_CURLY) {
            deep -= 1;
          } else if (code === HASH && n === OPEN_CURLY) {
            deep += 1;
          }
        }
      }
      function nextToken() {
        if (returned.length)
          return returned.pop();
        if (pos >= length)
          return;
        code = css.charCodeAt(pos);
        if (code === NEWLINE || code === FEED || code === CR && css.charCodeAt(pos + 1) !== NEWLINE) {
          offset = pos;
          line += 1;
        }
        switch (code) {
          case NEWLINE:
          case SPACE:
          case TAB:
          case CR:
          case FEED:
            next = pos;
            do {
              next += 1;
              code = css.charCodeAt(next);
              if (code === NEWLINE) {
                offset = next;
                line += 1;
              }
            } while (code === SPACE || code === NEWLINE || code === TAB || code === CR || code === FEED);
            currentToken = ["space", css.slice(pos, next)];
            pos = next - 1;
            break;
          case OPEN_SQUARE:
            currentToken = ["[", "[", line, pos - offset];
            break;
          case CLOSE_SQUARE:
            currentToken = ["]", "]", line, pos - offset];
            break;
          case OPEN_CURLY:
            currentToken = ["{", "{", line, pos - offset];
            break;
          case CLOSE_CURLY:
            currentToken = ["}", "}", line, pos - offset];
            break;
          case COMMA:
            currentToken = ["word", ",", line, pos - offset, line, pos - offset + 1];
            break;
          case COLON:
            currentToken = [":", ":", line, pos - offset];
            break;
          case SEMICOLON:
            currentToken = [";", ";", line, pos - offset];
            break;
          case OPEN_PARENTHESES:
            prev = buffer.length ? buffer.pop()[1] : "";
            n = css.charCodeAt(pos + 1);
            if (prev === "url" && n !== SINGLE_QUOTE && n !== DOUBLE_QUOTE) {
              brackets = 1;
              escaped = false;
              next = pos + 1;
              while (next <= css.length - 1) {
                n = css.charCodeAt(next);
                if (n === BACKSLASH) {
                  escaped = !escaped;
                } else if (n === OPEN_PARENTHESES) {
                  brackets += 1;
                } else if (n === CLOSE_PARENTHESES) {
                  brackets -= 1;
                  if (brackets === 0)
                    break;
                }
                next += 1;
              }
              content = css.slice(pos, next + 1);
              lines = content.split("\n");
              last = lines.length - 1;
              if (last > 0) {
                nextLine = line + last;
                nextOffset = next - lines[last].length;
              } else {
                nextLine = line;
                nextOffset = offset;
              }
              currentToken = ["brackets", content, line, pos - offset, nextLine, next - nextOffset];
              offset = nextOffset;
              line = nextLine;
              pos = next;
            } else {
              next = css.indexOf(")", pos + 1);
              content = css.slice(pos, next + 1);
              if (next === -1 || RE_BAD_BRACKET.test(content)) {
                currentToken = ["(", "(", line, pos - offset];
              } else {
                currentToken = ["brackets", content, line, pos - offset, line, next - offset];
                pos = next;
              }
            }
            break;
          case CLOSE_PARENTHESES:
            currentToken = [")", ")", line, pos - offset];
            break;
          case SINGLE_QUOTE:
          case DOUBLE_QUOTE:
            quote = code;
            next = pos;
            escaped = false;
            while (next < length) {
              next++;
              if (next === length)
                unclosed("string");
              code = css.charCodeAt(next);
              n = css.charCodeAt(next + 1);
              if (!escaped && code === quote) {
                break;
              } else if (code === BACKSLASH) {
                escaped = !escaped;
              } else if (escaped) {
                escaped = false;
              } else if (code === HASH && n === OPEN_CURLY) {
                interpolation();
              }
            }
            content = css.slice(pos, next + 1);
            lines = content.split("\n");
            last = lines.length - 1;
            if (last > 0) {
              nextLine = line + last;
              nextOffset = next - lines[last].length;
            } else {
              nextLine = line;
              nextOffset = offset;
            }
            currentToken = ["string", css.slice(pos, next + 1), line, pos - offset, nextLine, next - nextOffset];
            offset = nextOffset;
            line = nextLine;
            pos = next;
            break;
          case AT:
            RE_AT_END.lastIndex = pos + 1;
            RE_AT_END.test(css);
            if (RE_AT_END.lastIndex === 0) {
              next = css.length - 1;
            } else {
              next = RE_AT_END.lastIndex - 2;
            }
            currentToken = ["at-word", css.slice(pos, next + 1), line, pos - offset, line, next - offset];
            pos = next;
            break;
          case BACKSLASH:
            next = pos;
            escape = true;
            while (css.charCodeAt(next + 1) === BACKSLASH) {
              next += 1;
              escape = !escape;
            }
            code = css.charCodeAt(next + 1);
            if (escape && code !== SLASH && code !== SPACE && code !== NEWLINE && code !== TAB && code !== CR && code !== FEED) {
              next += 1;
              if (RE_HEX_ESCAPE.test(css.charAt(next))) {
                while (RE_HEX_ESCAPE.test(css.charAt(next + 1))) {
                  next += 1;
                }
                if (css.charCodeAt(next + 1) === SPACE) {
                  next += 1;
                }
              }
            }
            currentToken = ["word", css.slice(pos, next + 1), line, pos - offset, line, next - offset];
            pos = next;
            break;
          default:
            n = css.charCodeAt(pos + 1);
            if (code === HASH && n === OPEN_CURLY) {
              next = pos;
              interpolation();
              content = css.slice(pos, next + 1);
              lines = content.split("\n");
              last = lines.length - 1;
              if (last > 0) {
                nextLine = line + last;
                nextOffset = next - lines[last].length;
              } else {
                nextLine = line;
                nextOffset = offset;
              }
              currentToken = ["word", content, line, pos - offset, nextLine, next - nextOffset];
              offset = nextOffset;
              line = nextLine;
              pos = next;
            } else if (code === SLASH && n === ASTERISK) {
              next = css.indexOf("*/", pos + 2) + 1;
              if (next === 0) {
                if (ignore) {
                  next = css.length;
                } else {
                  unclosed("comment");
                }
              }
              content = css.slice(pos, next + 1);
              lines = content.split("\n");
              last = lines.length - 1;
              if (last > 0) {
                nextLine = line + last;
                nextOffset = next - lines[last].length;
              } else {
                nextLine = line;
                nextOffset = offset;
              }
              currentToken = ["comment", content, line, pos - offset, nextLine, next - nextOffset];
              offset = nextOffset;
              line = nextLine;
              pos = next;
            } else if (code === SLASH && n === SLASH) {
              RE_NEW_LINE.lastIndex = pos + 1;
              RE_NEW_LINE.test(css);
              if (RE_NEW_LINE.lastIndex === 0) {
                next = css.length - 1;
              } else {
                next = RE_NEW_LINE.lastIndex - 2;
              }
              content = css.slice(pos, next + 1);
              currentToken = ["comment", content, line, pos - offset, line, next - offset, "inline"];
              pos = next;
            } else {
              RE_WORD_END.lastIndex = pos + 1;
              RE_WORD_END.test(css);
              if (RE_WORD_END.lastIndex === 0) {
                next = css.length - 1;
              } else {
                next = RE_WORD_END.lastIndex - 2;
              }
              currentToken = ["word", css.slice(pos, next + 1), line, pos - offset, line, next - offset];
              buffer.push(currentToken);
              pos = next;
            }
            break;
        }
        pos++;
        return currentToken;
      }
      function back(token) {
        returned.push(token);
      }
      return {
        back,
        nextToken,
        endOfFile
      };
    };
  }
});
var require_scss_parser = __commonJS2({
  "node_modules/postcss-scss/lib/scss-parser.js"(exports, module) {
    "use strict";
    init_define_process();
    function _inheritsLoose(subClass, superClass) {
      subClass.prototype = Object.create(superClass.prototype);
      subClass.prototype.constructor = subClass;
      subClass.__proto__ = superClass;
    }
    var Comment = require_comment3();
    var Parser = require_parser3();
    var NestedDeclaration = require_nested_declaration();
    var scssTokenizer = require_scss_tokenize();
    var ScssParser = /* @__PURE__ */ function(_Parser) {
      _inheritsLoose(ScssParser2, _Parser);
      function ScssParser2() {
        return _Parser.apply(this, arguments) || this;
      }
      var _proto = ScssParser2.prototype;
      _proto.createTokenizer = function createTokenizer() {
        this.tokenizer = scssTokenizer(this.input);
      };
      _proto.rule = function rule(tokens) {
        var withColon = false;
        var brackets = 0;
        var value = "";
        for (var _iterator = tokens, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ; ) {
          var _ref;
          if (_isArray) {
            if (_i >= _iterator.length)
              break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done)
              break;
            _ref = _i.value;
          }
          var _i2 = _ref;
          if (withColon) {
            if (_i2[0] !== "comment" && _i2[0] !== "{") {
              value += _i2[1];
            }
          } else if (_i2[0] === "space" && _i2[1].indexOf("\n") !== -1) {
            break;
          } else if (_i2[0] === "(") {
            brackets += 1;
          } else if (_i2[0] === ")") {
            brackets -= 1;
          } else if (brackets === 0 && _i2[0] === ":") {
            withColon = true;
          }
        }
        if (!withColon || value.trim() === "" || /^[a-zA-Z-:#]/.test(value)) {
          _Parser.prototype.rule.call(this, tokens);
        } else {
          tokens.pop();
          var node = new NestedDeclaration();
          this.init(node);
          var last = tokens[tokens.length - 1];
          if (last[4]) {
            node.source.end = {
              line: last[4],
              column: last[5]
            };
          } else {
            node.source.end = {
              line: last[2],
              column: last[3]
            };
          }
          while (tokens[0][0] !== "word") {
            node.raws.before += tokens.shift()[1];
          }
          node.source.start = {
            line: tokens[0][2],
            column: tokens[0][3]
          };
          node.prop = "";
          while (tokens.length) {
            var type2 = tokens[0][0];
            if (type2 === ":" || type2 === "space" || type2 === "comment") {
              break;
            }
            node.prop += tokens.shift()[1];
          }
          node.raws.between = "";
          var token;
          while (tokens.length) {
            token = tokens.shift();
            if (token[0] === ":") {
              node.raws.between += token[1];
              break;
            } else {
              node.raws.between += token[1];
            }
          }
          if (node.prop[0] === "_" || node.prop[0] === "*") {
            node.raws.before += node.prop[0];
            node.prop = node.prop.slice(1);
          }
          node.raws.between += this.spacesAndCommentsFromStart(tokens);
          this.precheckMissedSemicolon(tokens);
          for (var i = tokens.length - 1; i > 0; i--) {
            token = tokens[i];
            if (token[1] === "!important") {
              node.important = true;
              var string = this.stringFrom(tokens, i);
              string = this.spacesFromEnd(tokens) + string;
              if (string !== " !important") {
                node.raws.important = string;
              }
              break;
            } else if (token[1] === "important") {
              var cache = tokens.slice(0);
              var str = "";
              for (var j = i; j > 0; j--) {
                var _type = cache[j][0];
                if (str.trim().indexOf("!") === 0 && _type !== "space") {
                  break;
                }
                str = cache.pop()[1] + str;
              }
              if (str.trim().indexOf("!") === 0) {
                node.important = true;
                node.raws.important = str;
                tokens = cache;
              }
            }
            if (token[0] !== "space" && token[0] !== "comment") {
              break;
            }
          }
          this.raw(node, "value", tokens);
          if (node.value.indexOf(":") !== -1) {
            this.checkMissedSemicolon(tokens);
          }
          this.current = node;
        }
      };
      _proto.comment = function comment(token) {
        if (token[6] === "inline") {
          var node = new Comment();
          this.init(node, token[2], token[3]);
          node.raws.inline = true;
          node.source.end = {
            line: token[4],
            column: token[5]
          };
          var text = token[1].slice(2);
          if (/^\s*$/.test(text)) {
            node.text = "";
            node.raws.left = text;
            node.raws.right = "";
          } else {
            var match = text.match(/^(\s*)([^]*[^\s])(\s*)$/);
            var fixed = match[2].replace(/(\*\/|\/\*)/g, "*//*");
            node.text = fixed;
            node.raws.left = match[1];
            node.raws.right = match[3];
            node.raws.text = match[2];
          }
        } else {
          _Parser.prototype.comment.call(this, token);
        }
      };
      _proto.raw = function raw(node, prop, tokens) {
        _Parser.prototype.raw.call(this, node, prop, tokens);
        if (node.raws[prop]) {
          var scss = node.raws[prop].raw;
          node.raws[prop].raw = tokens.reduce(function(all, i) {
            if (i[0] === "comment" && i[6] === "inline") {
              var text = i[1].slice(2).replace(/(\*\/|\/\*)/g, "*//*");
              return all + "/*" + text + "*/";
            } else {
              return all + i[1];
            }
          }, "");
          if (scss !== node.raws[prop].raw) {
            node.raws[prop].scss = scss;
          }
        }
      };
      return ScssParser2;
    }(Parser);
    module.exports = ScssParser;
  }
});
var require_scss_parse = __commonJS2({
  "node_modules/postcss-scss/lib/scss-parse.js"(exports, module) {
    "use strict";
    init_define_process();
    var Input = require_input();
    var ScssParser = require_scss_parser();
    module.exports = function scssParse(scss, opts) {
      var input = new Input(scss, opts);
      var parser = new ScssParser(input);
      parser.parse();
      return parser.root;
    };
  }
});
var require_scss_syntax = __commonJS2({
  "node_modules/postcss-scss/lib/scss-syntax.js"(exports, module) {
    "use strict";
    init_define_process();
    var stringify = require_scss_stringify();
    var parse = require_scss_parse();
    module.exports = {
      parse,
      stringify
    };
  }
});
var require_parser_postcss = __commonJS2({
  "src/language-css/parser-postcss.js"(exports, module) {
    init_define_process();
    var createError = require_parser_create_error();
    var getLast = require_get_last();
    var parseFrontMatter = require_parse();
    var {
      hasPragma
    } = require_pragma2();
    var {
      locStart,
      locEnd
    } = require_loc();
    var {
      calculateLoc,
      replaceQuotesInInlineComments
    } = require_loc();
    var hasSCSSInterpolation = require_has_scss_interpolation();
    var hasStringOrFunction = require_has_string_or_function();
    var isLessParser = require_is_less_parser();
    var isSCSS = require_is_scss();
    var isSCSSNestedPropertyNode = require_is_scss_nested_property_node();
    var isSCSSVariable = require_is_scss_variable();
    var stringifyNode = require_stringify_node();
    var isModuleRuleName = require_is_module_rule_name();
    var getHighestAncestor = (node) => {
      while (node.parent) {
        node = node.parent;
      }
      return node;
    };
    function parseValueNode(valueNode, options) {
      const {
        nodes
      } = valueNode;
      let parenGroup = {
        open: null,
        close: null,
        groups: [],
        type: "paren_group"
      };
      const parenGroupStack = [parenGroup];
      const rootParenGroup = parenGroup;
      let commaGroup = {
        groups: [],
        type: "comma_group"
      };
      const commaGroupStack = [commaGroup];
      for (let i = 0; i < nodes.length; ++i) {
        const node = nodes[i];
        if (isSCSS(options.parser, node.value) && node.type === "number" && node.unit === ".." && getLast(node.value) === ".") {
          node.value = node.value.slice(0, -1);
          node.unit = "...";
        }
        if (node.type === "func" && node.value === "selector") {
          node.group.groups = [parseSelector(getHighestAncestor(valueNode).text.slice(node.group.open.sourceIndex + 1, node.group.close.sourceIndex))];
        }
        if (node.type === "func" && node.value === "url") {
          const groups = node.group && node.group.groups || [];
          let groupList = [];
          for (let i2 = 0; i2 < groups.length; i2++) {
            const group = groups[i2];
            if (group.type === "comma_group") {
              groupList = [...groupList, ...group.groups];
            } else {
              groupList.push(group);
            }
          }
          if (hasSCSSInterpolation(groupList) || !hasStringOrFunction(groupList) && !isSCSSVariable(groupList[0])) {
            const stringifiedContent = stringifyNode({
              groups: node.group.groups
            });
            node.group.groups = [stringifiedContent.trim()];
          }
        }
        if (node.type === "paren" && node.value === "(") {
          parenGroup = {
            open: node,
            close: null,
            groups: [],
            type: "paren_group"
          };
          parenGroupStack.push(parenGroup);
          commaGroup = {
            groups: [],
            type: "comma_group"
          };
          commaGroupStack.push(commaGroup);
        } else if (node.type === "paren" && node.value === ")") {
          if (commaGroup.groups.length > 0) {
            parenGroup.groups.push(commaGroup);
          }
          parenGroup.close = node;
          if (commaGroupStack.length === 1) {
            throw new Error("Unbalanced parenthesis");
          }
          commaGroupStack.pop();
          commaGroup = getLast(commaGroupStack);
          commaGroup.groups.push(parenGroup);
          parenGroupStack.pop();
          parenGroup = getLast(parenGroupStack);
        } else if (node.type === "comma") {
          parenGroup.groups.push(commaGroup);
          commaGroup = {
            groups: [],
            type: "comma_group"
          };
          commaGroupStack[commaGroupStack.length - 1] = commaGroup;
        } else {
          commaGroup.groups.push(node);
        }
      }
      if (commaGroup.groups.length > 0) {
        parenGroup.groups.push(commaGroup);
      }
      return rootParenGroup;
    }
    function flattenGroups(node) {
      if (node.type === "paren_group" && !node.open && !node.close && node.groups.length === 1) {
        return flattenGroups(node.groups[0]);
      }
      if (node.type === "comma_group" && node.groups.length === 1) {
        return flattenGroups(node.groups[0]);
      }
      if (node.type === "paren_group" || node.type === "comma_group") {
        return Object.assign(Object.assign({}, node), {}, {
          groups: node.groups.map(flattenGroups)
        });
      }
      return node;
    }
    function addTypePrefix(node, prefix, skipPrefix) {
      if (node && typeof node === "object") {
        delete node.parent;
        for (const key in node) {
          addTypePrefix(node[key], prefix, skipPrefix);
          if (key === "type" && typeof node[key] === "string") {
            if (!node[key].startsWith(prefix) && (!skipPrefix || !skipPrefix.test(node[key]))) {
              node[key] = prefix + node[key];
            }
          }
        }
      }
      return node;
    }
    function addMissingType(node) {
      if (node && typeof node === "object") {
        delete node.parent;
        for (const key in node) {
          addMissingType(node[key]);
        }
        if (!Array.isArray(node) && node.value && !node.type) {
          node.type = "unknown";
        }
      }
      return node;
    }
    function parseNestedValue(node, options) {
      if (node && typeof node === "object") {
        for (const key in node) {
          if (key !== "parent") {
            parseNestedValue(node[key], options);
            if (key === "nodes") {
              node.group = flattenGroups(parseValueNode(node, options));
              delete node[key];
            }
          }
        }
        delete node.parent;
      }
      return node;
    }
    function parseValue(value, options) {
      const valueParser = require_lib();
      let result = null;
      try {
        result = valueParser(value, {
          loose: true
        }).parse();
      } catch {
        return {
          type: "value-unknown",
          value
        };
      }
      result.text = value;
      const parsedResult = parseNestedValue(result, options);
      return addTypePrefix(parsedResult, "value-", /^selector-/);
    }
    function parseSelector(selector) {
      if (/\/\/|\/\*/.test(selector)) {
        return {
          type: "selector-unknown",
          value: selector.trim()
        };
      }
      const selectorParser = require_dist();
      let result = null;
      try {
        selectorParser((result_) => {
          result = result_;
        }).process(selector);
      } catch {
        return {
          type: "selector-unknown",
          value: selector
        };
      }
      return addTypePrefix(result, "selector-");
    }
    function parseMediaQuery(params) {
      const mediaParser = require_dist2().default;
      let result = null;
      try {
        result = mediaParser(params);
      } catch {
        return {
          type: "selector-unknown",
          value: params
        };
      }
      return addTypePrefix(addMissingType(result), "media-");
    }
    var DEFAULT_SCSS_DIRECTIVE = /(\s*)(!default).*$/;
    var GLOBAL_SCSS_DIRECTIVE = /(\s*)(!global).*$/;
    function parseNestedCSS(node, options) {
      if (node && typeof node === "object") {
        delete node.parent;
        for (const key in node) {
          parseNestedCSS(node[key], options);
        }
        if (!node.type) {
          return node;
        }
        if (!node.raws) {
          node.raws = {};
        }
        let selector = "";
        if (typeof node.selector === "string") {
          var _node$raws$selector$s;
          selector = node.raws.selector ? (_node$raws$selector$s = node.raws.selector.scss) !== null && _node$raws$selector$s !== void 0 ? _node$raws$selector$s : node.raws.selector.raw : node.selector;
          if (node.raws.between && node.raws.between.trim().length > 0) {
            selector += node.raws.between;
          }
          node.raws.selector = selector;
        }
        let value = "";
        if (typeof node.value === "string") {
          var _node$raws$value$scss;
          value = node.raws.value ? (_node$raws$value$scss = node.raws.value.scss) !== null && _node$raws$value$scss !== void 0 ? _node$raws$value$scss : node.raws.value.raw : node.value;
          value = value.trim();
          node.raws.value = value;
        }
        let params = "";
        if (typeof node.params === "string") {
          var _node$raws$params$scs;
          params = node.raws.params ? (_node$raws$params$scs = node.raws.params.scss) !== null && _node$raws$params$scs !== void 0 ? _node$raws$params$scs : node.raws.params.raw : node.params;
          if (node.raws.afterName && node.raws.afterName.trim().length > 0) {
            params = node.raws.afterName + params;
          }
          if (node.raws.between && node.raws.between.trim().length > 0) {
            params = params + node.raws.between;
          }
          params = params.trim();
          node.raws.params = params;
        }
        if (selector.trim().length > 0) {
          if (selector.startsWith("@") && selector.endsWith(":")) {
            return node;
          }
          if (node.mixin) {
            node.selector = parseValue(selector, options);
            return node;
          }
          if (isSCSSNestedPropertyNode(node)) {
            node.isSCSSNesterProperty = true;
          }
          node.selector = parseSelector(selector);
          return node;
        }
        if (value.length > 0) {
          const defaultSCSSDirectiveIndex = value.match(DEFAULT_SCSS_DIRECTIVE);
          if (defaultSCSSDirectiveIndex) {
            value = value.slice(0, defaultSCSSDirectiveIndex.index);
            node.scssDefault = true;
            if (defaultSCSSDirectiveIndex[0].trim() !== "!default") {
              node.raws.scssDefault = defaultSCSSDirectiveIndex[0];
            }
          }
          const globalSCSSDirectiveIndex = value.match(GLOBAL_SCSS_DIRECTIVE);
          if (globalSCSSDirectiveIndex) {
            value = value.slice(0, globalSCSSDirectiveIndex.index);
            node.scssGlobal = true;
            if (globalSCSSDirectiveIndex[0].trim() !== "!global") {
              node.raws.scssGlobal = globalSCSSDirectiveIndex[0];
            }
          }
          if (value.startsWith("progid:")) {
            return {
              type: "value-unknown",
              value
            };
          }
          node.value = parseValue(value, options);
        }
        if (isLessParser(options) && node.type === "css-decl" && value.startsWith("extend(")) {
          if (!node.extend) {
            node.extend = node.raws.between === ":";
          }
          if (node.extend && !node.selector) {
            delete node.value;
            node.selector = parseSelector(value.slice("extend(".length, -1));
          }
        }
        if (node.type === "css-atrule") {
          if (isLessParser(options)) {
            if (node.mixin) {
              const source = node.raws.identifier + node.name + node.raws.afterName + node.raws.params;
              node.selector = parseSelector(source);
              delete node.params;
              return node;
            }
            if (node.function) {
              return node;
            }
          }
          if (options.parser === "css" && node.name === "custom-selector") {
            const customSelector = node.params.match(/:--\S+\s+/)[0].trim();
            node.customSelector = customSelector;
            node.selector = parseSelector(node.params.slice(customSelector.length).trim());
            delete node.params;
            return node;
          }
          if (isLessParser(options)) {
            if (node.name.includes(":") && !node.params) {
              node.variable = true;
              const parts = node.name.split(":");
              node.name = parts[0];
              node.value = parseValue(parts.slice(1).join(":"), options);
            }
            if (!["page", "nest", "keyframes"].includes(node.name) && node.params && node.params[0] === ":") {
              node.variable = true;
              const text = node.params.slice(1);
              if (text) {
                node.value = parseValue(text, options);
              }
              node.raws.afterName += ":";
            }
            if (node.variable) {
              delete node.params;
              if (!node.value) {
                delete node.value;
              }
              return node;
            }
          }
        }
        if (node.type === "css-atrule" && params.length > 0) {
          const {
            name
          } = node;
          const lowercasedName = node.name.toLowerCase();
          if (name === "warn" || name === "error") {
            node.params = {
              type: "media-unknown",
              value: params
            };
            return node;
          }
          if (name === "extend" || name === "nest") {
            node.selector = parseSelector(params);
            delete node.params;
            return node;
          }
          if (name === "at-root") {
            if (/^\(\s*(?:without|with)\s*:.+\)$/s.test(params)) {
              node.params = parseValue(params, options);
            } else {
              node.selector = parseSelector(params);
              delete node.params;
            }
            return node;
          }
          if (isModuleRuleName(lowercasedName)) {
            node.import = true;
            delete node.filename;
            node.params = parseValue(params, options);
            return node;
          }
          if (["namespace", "supports", "if", "else", "for", "each", "while", "debug", "mixin", "include", "function", "return", "define-mixin", "add-mixin"].includes(name)) {
            params = params.replace(/(\$\S+?)(\s+)?\.{3}/, "$1...$2");
            params = params.replace(/^(?!if)(\S+)(\s+)\(/, "$1($2");
            node.value = parseValue(params, options);
            delete node.params;
            return node;
          }
          if (["media", "custom-media"].includes(lowercasedName)) {
            if (params.includes("#{")) {
              return {
                type: "media-unknown",
                value: params
              };
            }
            node.params = parseMediaQuery(params);
            return node;
          }
          node.params = params;
          return node;
        }
      }
      return node;
    }
    function parseWithParser(parse, text, options) {
      const parsed = parseFrontMatter(text);
      const {
        frontMatter
      } = parsed;
      text = parsed.content;
      let result;
      try {
        result = parse(text);
      } catch (error) {
        const {
          name,
          reason,
          line,
          column
        } = error;
        if (typeof line !== "number") {
          throw error;
        }
        throw createError(`${name}: ${reason}`, {
          start: {
            line,
            column
          }
        });
      }
      result = parseNestedCSS(addTypePrefix(result, "css-"), options);
      calculateLoc(result, text);
      if (frontMatter) {
        frontMatter.source = {
          startOffset: 0,
          endOffset: frontMatter.raw.length
        };
        result.nodes.unshift(frontMatter);
      }
      return result;
    }
    function parseCss(text, parsers) {
      let options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      const isSCSSParser = isSCSS(options.parser, text);
      const parseFunctions = isSCSSParser ? [parseScss, parseLess] : [parseLess, parseScss];
      let error;
      for (const parse of parseFunctions) {
        try {
          return parse(text, parsers, options);
        } catch (parseError) {
          error = error || parseError;
        }
      }
      if (error) {
        throw error;
      }
    }
    function parseLess(text, parsers) {
      let options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      const lessParser = require_lib2();
      return parseWithParser((text2) => lessParser.parse(replaceQuotesInInlineComments(text2)), text, options);
    }
    function parseScss(text, parsers) {
      let options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      const {
        parse
      } = require_scss_syntax();
      return parseWithParser(parse, text, options);
    }
    var postCssParser = {
      astFormat: "postcss",
      hasPragma,
      locStart,
      locEnd
    };
    module.exports = {
      parsers: {
        css: Object.assign(Object.assign({}, postCssParser), {}, {
          parse: parseCss
        }),
        less: Object.assign(Object.assign({}, postCssParser), {}, {
          parse: parseLess
        }),
        scss: Object.assign(Object.assign({}, postCssParser), {}, {
          parse: parseScss
        })
      }
    };
  }
});
var parser_postcss_js_esm_default = require_parser_postcss();
export {
  parser_postcss_js_esm_default as default
};
