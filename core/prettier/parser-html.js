(function (factory) {
  if (typeof exports === "object" && typeof module === "object") {
    module.exports = factory();
  } else if (typeof define === "function" && define.amd) {
    define(factory);
  } else {
    var root =
      typeof globalThis !== "undefined"
        ? globalThis
        : typeof global !== "undefined"
        ? global
        : typeof self !== "undefined"
        ? self
        : this || {};
    root.prettierPlugins = root.prettierPlugins || {};
    root.prettierPlugins.html = factory();
  }
})(function() {
  "use strict";
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
      var global2 = require_global();
      var isObject = require_is_object();
      var document2 = global2.document;
      var EXISTS = isObject(document2) && isObject(document2.createElement);
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
      var WeakMap2 = global2.WeakMap;
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
      var global2 = require_global();
      var isObject = require_is_object();
      var createNonEnumerableProperty = require_create_non_enumerable_property();
      var hasOwn = require_has_own_property();
      var shared = require_shared_store();
      var sharedKey = require_shared_key();
      var hiddenKeys = require_hidden_keys();
      var OBJECT_ALREADY_INITIALIZED = "Object already initialized";
      var TypeError2 = global2.TypeError;
      var WeakMap2 = global2.WeakMap;
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
        var value = data[normalize(feature)];
        return value == POLYFILL ? true : value == NATIVE ? false : isCallable(detection) ? fails(detection) : !!detection;
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
  var require_esnext_global_this = __commonJS({
    "node_modules/core-js/modules/esnext.global-this.js"() {
      require_es_global_this();
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
      var aCallable = require_a_callable();
      var NATIVE_BIND = require_function_bind_native();
      var bind = uncurryThis(uncurryThis.bind);
      module.exports = function(fn, that) {
        aCallable(fn);
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
      var lengthOfArrayLike = require_length_of_array_like();
      var doesNotExceedSafeInteger = require_does_not_exceed_safe_integer();
      var bind = require_function_bind_context();
      var flattenIntoArray = function(target, original, source, sourceLen, start, depth, mapper, thisArg) {
        var targetIndex = start;
        var sourceIndex = 0;
        var mapFn = mapper ? bind(mapper, thisArg) : false;
        var element, elementLen;
        while (sourceIndex < sourceLen) {
          if (sourceIndex in source) {
            element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];
            if (depth > 0 && isArray(element)) {
              elementLen = lengthOfArrayLike(element);
              targetIndex = flattenIntoArray(target, original, element, elementLen, targetIndex, depth - 1) - 1;
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
      module.exports = flattenIntoArray;
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
      var fails = require_fails();
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
      module.exports = !construct || fails(function() {
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

  // node_modules/core-js/modules/es.array.flat-map.js
  var require_es_array_flat_map = __commonJS({
    "node_modules/core-js/modules/es.array.flat-map.js"() {
      "use strict";
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
      var aCallable = require_a_callable();
      var anObject = require_an_object();
      var tryToString = require_try_to_string();
      var getIteratorMethod = require_get_iterator_method();
      var $TypeError = TypeError;
      module.exports = function(argument, usingIterator) {
        var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
        if (aCallable(iteratorMethod))
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
      var lengthOfArrayLike = require_length_of_array_like();
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
            for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
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

  // node_modules/core-js/modules/es.object.from-entries.js
  var require_es_object_from_entries = __commonJS({
    "node_modules/core-js/modules/es.object.from-entries.js"() {
      var $ = require_export();
      var iterate = require_iterate();
      var createProperty = require_create_property();
      $({ target: "Object", stat: true }, {
        fromEntries: function fromEntries(iterable) {
          var obj = {};
          iterate(iterable, function(k, v) {
            createProperty(obj, k, v);
          }, { AS_ENTRIES: true });
          return obj;
        }
      });
    }
  });

  // dist/_parser-html.js.umd.js
  var require_parser_html_js_umd = __commonJS({
    "dist/_parser-html.js.umd.js"(exports, module) {
      var _excluded = ["cliName", "cliCategory", "cliDescription"];
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
      require_esnext_global_this();
      require_es_array_flat_map();
      require_es_object_from_entries();
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
      var require_chars = __commonJS2({
        "node_modules/angular-html-parser/lib/compiler/src/chars.js"(exports2) {
          "use strict";
          init_define_process();
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2.$EOF = 0;
          exports2.$BSPACE = 8;
          exports2.$TAB = 9;
          exports2.$LF = 10;
          exports2.$VTAB = 11;
          exports2.$FF = 12;
          exports2.$CR = 13;
          exports2.$SPACE = 32;
          exports2.$BANG = 33;
          exports2.$DQ = 34;
          exports2.$HASH = 35;
          exports2.$$ = 36;
          exports2.$PERCENT = 37;
          exports2.$AMPERSAND = 38;
          exports2.$SQ = 39;
          exports2.$LPAREN = 40;
          exports2.$RPAREN = 41;
          exports2.$STAR = 42;
          exports2.$PLUS = 43;
          exports2.$COMMA = 44;
          exports2.$MINUS = 45;
          exports2.$PERIOD = 46;
          exports2.$SLASH = 47;
          exports2.$COLON = 58;
          exports2.$SEMICOLON = 59;
          exports2.$LT = 60;
          exports2.$EQ = 61;
          exports2.$GT = 62;
          exports2.$QUESTION = 63;
          exports2.$0 = 48;
          exports2.$7 = 55;
          exports2.$9 = 57;
          exports2.$A = 65;
          exports2.$E = 69;
          exports2.$F = 70;
          exports2.$X = 88;
          exports2.$Z = 90;
          exports2.$LBRACKET = 91;
          exports2.$BACKSLASH = 92;
          exports2.$RBRACKET = 93;
          exports2.$CARET = 94;
          exports2.$_ = 95;
          exports2.$a = 97;
          exports2.$b = 98;
          exports2.$e = 101;
          exports2.$f = 102;
          exports2.$n = 110;
          exports2.$r = 114;
          exports2.$t = 116;
          exports2.$u = 117;
          exports2.$v = 118;
          exports2.$x = 120;
          exports2.$z = 122;
          exports2.$LBRACE = 123;
          exports2.$BAR = 124;
          exports2.$RBRACE = 125;
          exports2.$NBSP = 160;
          exports2.$PIPE = 124;
          exports2.$TILDA = 126;
          exports2.$AT = 64;
          exports2.$BT = 96;
          function isWhitespace(code) {
            return code >= exports2.$TAB && code <= exports2.$SPACE || code == exports2.$NBSP;
          }
          exports2.isWhitespace = isWhitespace;
          function isDigit(code) {
            return exports2.$0 <= code && code <= exports2.$9;
          }
          exports2.isDigit = isDigit;
          function isAsciiLetter(code) {
            return code >= exports2.$a && code <= exports2.$z || code >= exports2.$A && code <= exports2.$Z;
          }
          exports2.isAsciiLetter = isAsciiLetter;
          function isAsciiHexDigit(code) {
            return code >= exports2.$a && code <= exports2.$f || code >= exports2.$A && code <= exports2.$F || isDigit(code);
          }
          exports2.isAsciiHexDigit = isAsciiHexDigit;
          function isNewLine(code) {
            return code === exports2.$LF || code === exports2.$CR;
          }
          exports2.isNewLine = isNewLine;
          function isOctalDigit(code) {
            return exports2.$0 <= code && code <= exports2.$7;
          }
          exports2.isOctalDigit = isOctalDigit;
        }
      });
      var require_static_symbol = __commonJS2({
        "node_modules/angular-html-parser/lib/compiler/src/aot/static_symbol.js"(exports2) {
          "use strict";
          init_define_process();
          Object.defineProperty(exports2, "__esModule", {
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
          exports2.StaticSymbol = StaticSymbol;
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
          exports2.StaticSymbolCache = StaticSymbolCache;
        }
      });
      var require_util = __commonJS2({
        "node_modules/angular-html-parser/lib/compiler/src/util.js"(exports2) {
          "use strict";
          init_define_process();
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          var DASH_CASE_REGEXP = /-+([a-z0-9])/g;
          function dashCaseToCamelCase(input) {
            return input.replace(DASH_CASE_REGEXP, function() {
              for (var _len = arguments.length, m = new Array(_len), _key = 0; _key < _len; _key++) {
                m[_key] = arguments[_key];
              }
              return m[1].toUpperCase();
            });
          }
          exports2.dashCaseToCamelCase = dashCaseToCamelCase;
          function splitAtColon(input, defaultValues) {
            return _splitAt(input, ":", defaultValues);
          }
          exports2.splitAtColon = splitAtColon;
          function splitAtPeriod(input, defaultValues) {
            return _splitAt(input, ".", defaultValues);
          }
          exports2.splitAtPeriod = splitAtPeriod;
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
          exports2.visitValue = visitValue;
          function isDefined(val) {
            return val !== null && val !== void 0;
          }
          exports2.isDefined = isDefined;
          function noUndefined(val) {
            return val === void 0 ? null : val;
          }
          exports2.noUndefined = noUndefined;
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
          exports2.ValueTransformer = ValueTransformer;
          exports2.SyncAsync = {
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
          exports2.error = error;
          function syntaxError(msg, parseErrors) {
            const error2 = Error(msg);
            error2[ERROR_SYNTAX_ERROR] = true;
            if (parseErrors)
              error2[ERROR_PARSE_ERRORS] = parseErrors;
            return error2;
          }
          exports2.syntaxError = syntaxError;
          var ERROR_SYNTAX_ERROR = "ngSyntaxError";
          var ERROR_PARSE_ERRORS = "ngParseErrors";
          function isSyntaxError(error2) {
            return error2[ERROR_SYNTAX_ERROR];
          }
          exports2.isSyntaxError = isSyntaxError;
          function getParseErrors(error2) {
            return error2[ERROR_PARSE_ERRORS] || [];
          }
          exports2.getParseErrors = getParseErrors;
          function escapeRegExp(s) {
            return s.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1");
          }
          exports2.escapeRegExp = escapeRegExp;
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
          exports2.utf8Encode = utf8Encode;
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
          exports2.stringify = stringify;
          function resolveForwardRef(type) {
            if (typeof type === "function" && type.hasOwnProperty("__forward_ref__")) {
              return type();
            } else {
              return type;
            }
          }
          exports2.resolveForwardRef = resolveForwardRef;
          function isPromise(obj) {
            return !!obj && typeof obj.then === "function";
          }
          exports2.isPromise = isPromise;
          var Version = class {
            constructor(full) {
              this.full = full;
              const splits = full.split(".");
              this.major = splits[0];
              this.minor = splits[1];
              this.patch = splits.slice(2).join(".");
            }
          };
          exports2.Version = Version;
          var __window = typeof window !== "undefined" && window;
          var __self = typeof self !== "undefined" && typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope && self;
          var __global = typeof globalThis !== "undefined" && globalThis;
          var _global = __global || __window || __self;
          exports2.global = _global;
        }
      });
      var require_compile_metadata = __commonJS2({
        "node_modules/angular-html-parser/lib/compiler/src/compile_metadata.js"(exports2) {
          "use strict";
          init_define_process();
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          var static_symbol_1 = require_static_symbol();
          var util_1 = require_util();
          var HOST_REG_EXP = /^(?:(?:\[([^\]]+)\])|(?:\(([^\)]+)\)))|(\@[-\w]+)$/;
          function sanitizeIdentifier(name) {
            return name.replace(/\W/g, "_");
          }
          exports2.sanitizeIdentifier = sanitizeIdentifier;
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
          exports2.identifierName = identifierName;
          function identifierModuleUrl(compileIdentifier) {
            const ref = compileIdentifier.reference;
            if (ref instanceof static_symbol_1.StaticSymbol) {
              return ref.filePath;
            }
            return `./${util_1.stringify(ref)}`;
          }
          exports2.identifierModuleUrl = identifierModuleUrl;
          function viewClassName(compType, embeddedTemplateIndex) {
            return `View_${identifierName({
              reference: compType
            })}_${embeddedTemplateIndex}`;
          }
          exports2.viewClassName = viewClassName;
          function rendererTypeName(compType) {
            return `RenderType_${identifierName({
              reference: compType
            })}`;
          }
          exports2.rendererTypeName = rendererTypeName;
          function hostViewClassName(compType) {
            return `HostView_${identifierName({
              reference: compType
            })}`;
          }
          exports2.hostViewClassName = hostViewClassName;
          function componentFactoryName(compType) {
            return `${identifierName({
              reference: compType
            })}NgFactory`;
          }
          exports2.componentFactoryName = componentFactoryName;
          var CompileSummaryKind;
          (function(CompileSummaryKind2) {
            CompileSummaryKind2[CompileSummaryKind2["Pipe"] = 0] = "Pipe";
            CompileSummaryKind2[CompileSummaryKind2["Directive"] = 1] = "Directive";
            CompileSummaryKind2[CompileSummaryKind2["NgModule"] = 2] = "NgModule";
            CompileSummaryKind2[CompileSummaryKind2["Injectable"] = 3] = "Injectable";
          })(CompileSummaryKind = exports2.CompileSummaryKind || (exports2.CompileSummaryKind = {}));
          function tokenName(token) {
            return token.value != null ? sanitizeIdentifier(token.value) : identifierName(token.identifier);
          }
          exports2.tokenName = tokenName;
          function tokenReference(token) {
            if (token.identifier != null) {
              return token.identifier.reference;
            } else {
              return token.value;
            }
          }
          exports2.tokenReference = tokenReference;
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
          exports2.CompileStylesheetMetadata = CompileStylesheetMetadata;
          var CompileTemplateMetadata = class {
            constructor(_ref) {
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
              } = _ref;
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
          exports2.CompileTemplateMetadata = CompileTemplateMetadata;
          var CompileDirectiveMetadata = class {
            static create(_ref2) {
              let {
                isHost,
                type,
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
              } = _ref2;
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
                type,
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
            constructor(_ref3) {
              let {
                isHost,
                type,
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
              } = _ref3;
              this.isHost = !!isHost;
              this.type = type;
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
          exports2.CompileDirectiveMetadata = CompileDirectiveMetadata;
          var CompilePipeMetadata = class {
            constructor(_ref4) {
              let {
                type,
                name,
                pure
              } = _ref4;
              this.type = type;
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
          exports2.CompilePipeMetadata = CompilePipeMetadata;
          var CompileShallowModuleMetadata = class {
          };
          exports2.CompileShallowModuleMetadata = CompileShallowModuleMetadata;
          var CompileNgModuleMetadata = class {
            constructor(_ref5) {
              let {
                type,
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
              } = _ref5;
              this.type = type || null;
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
              const module3 = this.transitiveModule;
              return {
                summaryKind: CompileSummaryKind.NgModule,
                type: this.type,
                entryComponents: module3.entryComponents,
                providers: module3.providers,
                modules: module3.modules,
                exportedDirectives: module3.exportedDirectives,
                exportedPipes: module3.exportedPipes
              };
            }
          };
          exports2.CompileNgModuleMetadata = CompileNgModuleMetadata;
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
            addProvider(provider, module3) {
              this.providers.push({
                provider,
                module: module3
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
          exports2.TransitiveCompileNgModuleMetadata = TransitiveCompileNgModuleMetadata;
          function _normalizeArray(obj) {
            return obj || [];
          }
          var ProviderMeta = class {
            constructor(token, _ref6) {
              let {
                useClass,
                useValue,
                useExisting,
                useFactory,
                deps,
                multi
              } = _ref6;
              this.token = token;
              this.useClass = useClass || null;
              this.useValue = useValue;
              this.useExisting = useExisting;
              this.useFactory = useFactory || null;
              this.dependencies = deps || null;
              this.multi = !!multi;
            }
          };
          exports2.ProviderMeta = ProviderMeta;
          function flatten(list) {
            return list.reduce((flat, item) => {
              const flatItem = Array.isArray(item) ? flatten(item) : item;
              return flat.concat(flatItem);
            }, []);
          }
          exports2.flatten = flatten;
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
          exports2.templateSourceUrl = templateSourceUrl;
          function sharedStylesheetJitUrl(meta, id) {
            const pathParts = meta.moduleUrl.split(/\/\\/g);
            const baseName = pathParts[pathParts.length - 1];
            return jitSourceUrl(`css/${id}${baseName}.ngstyle.js`);
          }
          exports2.sharedStylesheetJitUrl = sharedStylesheetJitUrl;
          function ngModuleJitUrl(moduleMeta) {
            return jitSourceUrl(`${identifierName(moduleMeta.type)}/module.ngfactory.js`);
          }
          exports2.ngModuleJitUrl = ngModuleJitUrl;
          function templateJitUrl(ngModuleType, compMeta) {
            return jitSourceUrl(`${identifierName(ngModuleType)}/${identifierName(compMeta.type)}.ngfactory.js`);
          }
          exports2.templateJitUrl = templateJitUrl;
        }
      });
      var require_parse_util = __commonJS2({
        "node_modules/angular-html-parser/lib/compiler/src/parse_util.js"(exports2) {
          "use strict";
          init_define_process();
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          var chars = require_chars();
          var compile_metadata_1 = require_compile_metadata();
          var ParseLocation2 = class {
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
              return new ParseLocation2(this.file, offset, line, col);
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
          exports2.ParseLocation = ParseLocation2;
          var ParseSourceFile2 = class {
            constructor(content, url) {
              this.content = content;
              this.url = url;
            }
          };
          exports2.ParseSourceFile = ParseSourceFile2;
          var ParseSourceSpan2 = class {
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
          exports2.ParseSourceSpan = ParseSourceSpan2;
          exports2.EMPTY_PARSE_LOCATION = new ParseLocation2(new ParseSourceFile2("", ""), 0, 0, 0);
          exports2.EMPTY_SOURCE_SPAN = new ParseSourceSpan2(exports2.EMPTY_PARSE_LOCATION, exports2.EMPTY_PARSE_LOCATION);
          var ParseErrorLevel;
          (function(ParseErrorLevel2) {
            ParseErrorLevel2[ParseErrorLevel2["WARNING"] = 0] = "WARNING";
            ParseErrorLevel2[ParseErrorLevel2["ERROR"] = 1] = "ERROR";
          })(ParseErrorLevel = exports2.ParseErrorLevel || (exports2.ParseErrorLevel = {}));
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
          exports2.ParseError = ParseError;
          function typeSourceSpan(kind, type) {
            const moduleUrl = compile_metadata_1.identifierModuleUrl(type);
            const sourceFileName = moduleUrl != null ? `in ${kind} ${compile_metadata_1.identifierName(type)} in ${moduleUrl}` : `in ${kind} ${compile_metadata_1.identifierName(type)}`;
            const sourceFile = new ParseSourceFile2("", sourceFileName);
            return new ParseSourceSpan2(new ParseLocation2(sourceFile, -1, -1, -1), new ParseLocation2(sourceFile, -1, -1, -1));
          }
          exports2.typeSourceSpan = typeSourceSpan;
          function r3JitTypeSourceSpan(kind, typeName, sourceUrl) {
            const sourceFileName = `in ${kind} ${typeName} in ${sourceUrl}`;
            const sourceFile = new ParseSourceFile2("", sourceFileName);
            return new ParseSourceSpan2(new ParseLocation2(sourceFile, -1, -1, -1), new ParseLocation2(sourceFile, -1, -1, -1));
          }
          exports2.r3JitTypeSourceSpan = r3JitTypeSourceSpan;
        }
      });
      var require_parse = __commonJS2({
        "src/utils/front-matter/parse.js"(exports2, module2) {
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
          module2.exports = parse;
        }
      });
      var require_get_last = __commonJS2({
        "src/utils/get-last.js"(exports2, module2) {
          "use strict";
          init_define_process();
          var getLast2 = (arr) => arr[arr.length - 1];
          module2.exports = getLast2;
        }
      });
      var require_parser_create_error = __commonJS2({
        "src/common/parser-create-error.js"(exports2, module2) {
          "use strict";
          init_define_process();
          function createError2(message, loc) {
            const error = new SyntaxError(message + " (" + loc.start.line + ":" + loc.start.column + ")");
            error.loc = loc;
            return error;
          }
          module2.exports = createError2;
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
        "node_modules/semver/internal/debug.js"(exports2, module2) {
          init_define_process();
          var debug = typeof define_process_default === "object" && define_process_default.env && define_process_default.env.NODE_DEBUG && /\bsemver\b/i.test(define_process_default.env.NODE_DEBUG) ? function() {
            for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }
            return console.error("SEMVER", ...args);
          } : () => {
          };
          module2.exports = debug;
        }
      });
      var require_constants = __commonJS2({
        "node_modules/semver/internal/constants.js"(exports2, module2) {
          init_define_process();
          var SEMVER_SPEC_VERSION = "2.0.0";
          var MAX_LENGTH = 256;
          var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;
          var MAX_SAFE_COMPONENT_LENGTH = 16;
          module2.exports = {
            SEMVER_SPEC_VERSION,
            MAX_LENGTH,
            MAX_SAFE_INTEGER,
            MAX_SAFE_COMPONENT_LENGTH
          };
        }
      });
      var require_re = __commonJS2({
        "node_modules/semver/internal/re.js"(exports2, module2) {
          init_define_process();
          var {
            MAX_SAFE_COMPONENT_LENGTH
          } = require_constants();
          var debug = require_debug();
          exports2 = module2.exports = {};
          var re = exports2.re = [];
          var src = exports2.src = [];
          var t = exports2.t = {};
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
          exports2.tildeTrimReplace = "$1~";
          createToken("TILDE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
          createToken("TILDELOOSE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);
          createToken("LONECARET", "(?:\\^)");
          createToken("CARETTRIM", `(\\s*)${src[t.LONECARET]}\\s+`, true);
          exports2.caretTrimReplace = "$1^";
          createToken("CARET", `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
          createToken("CARETLOOSE", `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);
          createToken("COMPARATORLOOSE", `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
          createToken("COMPARATOR", `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);
          createToken("COMPARATORTRIM", `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
          exports2.comparatorTrimReplace = "$1$2$3";
          createToken("HYPHENRANGE", `^\\s*(${src[t.XRANGEPLAIN]})\\s+-\\s+(${src[t.XRANGEPLAIN]})\\s*$`);
          createToken("HYPHENRANGELOOSE", `^\\s*(${src[t.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t.XRANGEPLAINLOOSE]})\\s*$`);
          createToken("STAR", "(<|>)?=?\\s*\\*");
          createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
          createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
        }
      });
      var require_parse_options = __commonJS2({
        "node_modules/semver/internal/parse-options.js"(exports2, module2) {
          init_define_process();
          var opts = ["includePrerelease", "loose", "rtl"];
          var parseOptions = (options) => !options ? {} : typeof options !== "object" ? {
            loose: true
          } : opts.filter((k) => options[k]).reduce((o, k) => {
            o[k] = true;
            return o;
          }, {});
          module2.exports = parseOptions;
        }
      });
      var require_identifiers = __commonJS2({
        "node_modules/semver/internal/identifiers.js"(exports2, module2) {
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
          module2.exports = {
            compareIdentifiers,
            rcompareIdentifiers
          };
        }
      });
      var require_semver = __commonJS2({
        "node_modules/semver/classes/semver.js"(exports2, module2) {
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
            inc(release, identifier) {
              switch (release) {
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
                  throw new Error(`invalid increment argument: ${release}`);
              }
              this.format();
              this.raw = this.version;
              return this;
            }
          };
          module2.exports = SemVer;
        }
      });
      var require_compare = __commonJS2({
        "node_modules/semver/functions/compare.js"(exports2, module2) {
          init_define_process();
          var SemVer = require_semver();
          var compare = (a, b, loose) => new SemVer(a, loose).compare(new SemVer(b, loose));
          module2.exports = compare;
        }
      });
      var require_lt = __commonJS2({
        "node_modules/semver/functions/lt.js"(exports2, module2) {
          init_define_process();
          var compare = require_compare();
          var lt = (a, b, loose) => compare(a, b, loose) < 0;
          module2.exports = lt;
        }
      });
      var require_gte = __commonJS2({
        "node_modules/semver/functions/gte.js"(exports2, module2) {
          init_define_process();
          var compare = require_compare();
          var gte = (a, b, loose) => compare(a, b, loose) >= 0;
          module2.exports = gte;
        }
      });
      var require_arrayify = __commonJS2({
        "src/utils/arrayify.js"(exports2, module2) {
          "use strict";
          init_define_process();
          module2.exports = (object, keyName) => Object.entries(object).map((_ref7) => {
            let [key, value] = _ref7;
            return Object.assign({
              [keyName]: key
            }, value);
          });
        }
      });
      var require_package = __commonJS2({
        "package.json"(exports2, module2) {
          module2.exports = {
            version: "2.8.8"
          };
        }
      });
      var require_lib = __commonJS2({
        "node_modules/outdent/lib/index.js"(exports2, module2) {
          "use strict";
          init_define_process();
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2.outdent = void 0;
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
          exports2.outdent = defaultOutdent;
          exports2.default = defaultOutdent;
          if (typeof module2 !== "undefined") {
            try {
              module2.exports = defaultOutdent;
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
        "src/main/core-options.js"(exports2, module2) {
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
          module2.exports = {
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
        "src/main/support.js"(exports2, module2) {
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
            const options = arrayify(Object.assign({}, ...plugins.map((_ref8) => {
              let {
                options: options2
              } = _ref8;
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
          module2.exports = {
            getSupportInfo
          };
        }
      });
      var require_is_non_empty_array = __commonJS2({
        "src/utils/is-non-empty-array.js"(exports2, module2) {
          "use strict";
          init_define_process();
          function isNonEmptyArray(object) {
            return Array.isArray(object) && object.length > 0;
          }
          module2.exports = isNonEmptyArray;
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
        "node_modules/emoji-regex/index.js"(exports2, module2) {
          "use strict";
          init_define_process();
          module2.exports = function() {
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
        "src/utils/get-string-width.js"(exports2, module2) {
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
          module2.exports = getStringWidth;
        }
      });
      var require_skip = __commonJS2({
        "src/utils/text/skip.js"(exports2, module2) {
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
          module2.exports = {
            skipWhitespace,
            skipSpaces,
            skipToLineEnd,
            skipEverythingButNewLine
          };
        }
      });
      var require_skip_inline_comment = __commonJS2({
        "src/utils/text/skip-inline-comment.js"(exports2, module2) {
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
          module2.exports = skipInlineComment;
        }
      });
      var require_skip_trailing_comment = __commonJS2({
        "src/utils/text/skip-trailing-comment.js"(exports2, module2) {
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
          module2.exports = skipTrailingComment;
        }
      });
      var require_skip_newline = __commonJS2({
        "src/utils/text/skip-newline.js"(exports2, module2) {
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
          module2.exports = skipNewline;
        }
      });
      var require_get_next_non_space_non_comment_character_index_with_start_index = __commonJS2({
        "src/utils/text/get-next-non-space-non-comment-character-index-with-start-index.js"(exports2, module2) {
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
          module2.exports = getNextNonSpaceNonCommentCharacterIndexWithStartIndex;
        }
      });
      var require_util2 = __commonJS2({
        "src/common/util.js"(exports2, module2) {
          "use strict";
          init_define_process();
          var {
            default: escapeStringRegexp2
          } = (init_escape_string_regexp(), __toCommonJS(escape_string_regexp_exports));
          var getLast2 = require_get_last();
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
          function isPreviousLineEmpty(text, node, locStart2) {
            let idx = locStart2(node) - 1;
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
          function isNextLineEmpty(text, node, locEnd2) {
            return isNextLineEmptyAfterIndex(text, locEnd2(node));
          }
          function getNextNonSpaceNonCommentCharacterIndex(text, node, locEnd2) {
            return getNextNonSpaceNonCommentCharacterIndexWithStartIndex(text, locEnd2(node));
          }
          function getNextNonSpaceNonCommentCharacter(text, node, locEnd2) {
            return text.charAt(getNextNonSpaceNonCommentCharacterIndex(text, node, locEnd2));
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
          function inferParserByLanguage2(language, options) {
            const {
              languages
            } = getSupportInfo({
              plugins: options.plugins
            });
            const matched = languages.find((_ref9) => {
              let {
                name
              } = _ref9;
              return name.toLowerCase() === language;
            }) || languages.find((_ref10) => {
              let {
                aliases
              } = _ref10;
              return Array.isArray(aliases) && aliases.includes(language);
            }) || languages.find((_ref11) => {
              let {
                extensions
              } = _ref11;
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
          module2.exports = {
            inferParserByLanguage: inferParserByLanguage2,
            getStringWidth,
            getMaxContinuousCount,
            getMinNotPresentContinuousCount,
            getPenultimate,
            getLast: getLast2,
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
      var require_html_tag_names = __commonJS2({
        "vendors/html-tag-names.json"(exports2, module2) {
          module2.exports = {
            htmlTagNames: ["a", "abbr", "acronym", "address", "applet", "area", "article", "aside", "audio", "b", "base", "basefont", "bdi", "bdo", "bgsound", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "command", "content", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "embed", "fieldset", "figcaption", "figure", "font", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "image", "img", "input", "ins", "isindex", "kbd", "keygen", "label", "legend", "li", "link", "listing", "main", "map", "mark", "marquee", "math", "menu", "menuitem", "meta", "meter", "multicol", "nav", "nextid", "nobr", "noembed", "noframes", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "plaintext", "pre", "progress", "q", "rb", "rbc", "rp", "rt", "rtc", "ruby", "s", "samp", "script", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "svg", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "tt", "u", "ul", "var", "video", "wbr", "xmp"]
          };
        }
      });
      var require_array_to_map = __commonJS2({
        "src/language-html/utils/array-to-map.js"(exports2, module2) {
          "use strict";
          init_define_process();
          function arrayToMap(array) {
            const map = /* @__PURE__ */ Object.create(null);
            for (const value of array) {
              map[value] = true;
            }
            return map;
          }
          module2.exports = arrayToMap;
        }
      });
      var require_html_tag_names2 = __commonJS2({
        "src/language-html/utils/html-tag-names.js"(exports2, module2) {
          "use strict";
          init_define_process();
          var {
            htmlTagNames
          } = require_html_tag_names();
          var arrayToMap = require_array_to_map();
          var HTML_TAGS2 = arrayToMap(htmlTagNames);
          module2.exports = HTML_TAGS2;
        }
      });
      var require_html_element_attributes = __commonJS2({
        "vendors/html-element-attributes.json"(exports2, module2) {
          module2.exports = {
            htmlElementAttributes: {
              "*": ["accesskey", "autocapitalize", "autofocus", "class", "contenteditable", "dir", "draggable", "enterkeyhint", "hidden", "id", "inputmode", "is", "itemid", "itemprop", "itemref", "itemscope", "itemtype", "lang", "nonce", "slot", "spellcheck", "style", "tabindex", "title", "translate"],
              a: ["charset", "coords", "download", "href", "hreflang", "name", "ping", "referrerpolicy", "rel", "rev", "shape", "target", "type"],
              applet: ["align", "alt", "archive", "code", "codebase", "height", "hspace", "name", "object", "vspace", "width"],
              area: ["alt", "coords", "download", "href", "hreflang", "nohref", "ping", "referrerpolicy", "rel", "shape", "target", "type"],
              audio: ["autoplay", "controls", "crossorigin", "loop", "muted", "preload", "src"],
              base: ["href", "target"],
              basefont: ["color", "face", "size"],
              blockquote: ["cite"],
              body: ["alink", "background", "bgcolor", "link", "text", "vlink"],
              br: ["clear"],
              button: ["disabled", "form", "formaction", "formenctype", "formmethod", "formnovalidate", "formtarget", "name", "type", "value"],
              canvas: ["height", "width"],
              caption: ["align"],
              col: ["align", "char", "charoff", "span", "valign", "width"],
              colgroup: ["align", "char", "charoff", "span", "valign", "width"],
              data: ["value"],
              del: ["cite", "datetime"],
              details: ["open"],
              dialog: ["open"],
              dir: ["compact"],
              div: ["align"],
              dl: ["compact"],
              embed: ["height", "src", "type", "width"],
              fieldset: ["disabled", "form", "name"],
              font: ["color", "face", "size"],
              form: ["accept", "accept-charset", "action", "autocomplete", "enctype", "method", "name", "novalidate", "target"],
              frame: ["frameborder", "longdesc", "marginheight", "marginwidth", "name", "noresize", "scrolling", "src"],
              frameset: ["cols", "rows"],
              h1: ["align"],
              h2: ["align"],
              h3: ["align"],
              h4: ["align"],
              h5: ["align"],
              h6: ["align"],
              head: ["profile"],
              hr: ["align", "noshade", "size", "width"],
              html: ["manifest", "version"],
              iframe: ["align", "allow", "allowfullscreen", "allowpaymentrequest", "allowusermedia", "frameborder", "height", "loading", "longdesc", "marginheight", "marginwidth", "name", "referrerpolicy", "sandbox", "scrolling", "src", "srcdoc", "width"],
              img: ["align", "alt", "border", "crossorigin", "decoding", "height", "hspace", "ismap", "loading", "longdesc", "name", "referrerpolicy", "sizes", "src", "srcset", "usemap", "vspace", "width"],
              input: ["accept", "align", "alt", "autocomplete", "checked", "dirname", "disabled", "form", "formaction", "formenctype", "formmethod", "formnovalidate", "formtarget", "height", "ismap", "list", "max", "maxlength", "min", "minlength", "multiple", "name", "pattern", "placeholder", "readonly", "required", "size", "src", "step", "type", "usemap", "value", "width"],
              ins: ["cite", "datetime"],
              isindex: ["prompt"],
              label: ["for", "form"],
              legend: ["align"],
              li: ["type", "value"],
              link: ["as", "charset", "color", "crossorigin", "disabled", "href", "hreflang", "imagesizes", "imagesrcset", "integrity", "media", "referrerpolicy", "rel", "rev", "sizes", "target", "type"],
              map: ["name"],
              menu: ["compact"],
              meta: ["charset", "content", "http-equiv", "media", "name", "scheme"],
              meter: ["high", "low", "max", "min", "optimum", "value"],
              object: ["align", "archive", "border", "classid", "codebase", "codetype", "data", "declare", "form", "height", "hspace", "name", "standby", "type", "typemustmatch", "usemap", "vspace", "width"],
              ol: ["compact", "reversed", "start", "type"],
              optgroup: ["disabled", "label"],
              option: ["disabled", "label", "selected", "value"],
              output: ["for", "form", "name"],
              p: ["align"],
              param: ["name", "type", "value", "valuetype"],
              pre: ["width"],
              progress: ["max", "value"],
              q: ["cite"],
              script: ["async", "charset", "crossorigin", "defer", "integrity", "language", "nomodule", "referrerpolicy", "src", "type"],
              select: ["autocomplete", "disabled", "form", "multiple", "name", "required", "size"],
              slot: ["name"],
              source: ["height", "media", "sizes", "src", "srcset", "type", "width"],
              style: ["media", "type"],
              table: ["align", "bgcolor", "border", "cellpadding", "cellspacing", "frame", "rules", "summary", "width"],
              tbody: ["align", "char", "charoff", "valign"],
              td: ["abbr", "align", "axis", "bgcolor", "char", "charoff", "colspan", "headers", "height", "nowrap", "rowspan", "scope", "valign", "width"],
              textarea: ["autocomplete", "cols", "dirname", "disabled", "form", "maxlength", "minlength", "name", "placeholder", "readonly", "required", "rows", "wrap"],
              tfoot: ["align", "char", "charoff", "valign"],
              th: ["abbr", "align", "axis", "bgcolor", "char", "charoff", "colspan", "headers", "height", "nowrap", "rowspan", "scope", "valign", "width"],
              thead: ["align", "char", "charoff", "valign"],
              time: ["datetime"],
              tr: ["align", "bgcolor", "char", "charoff", "valign"],
              track: ["default", "kind", "label", "src", "srclang"],
              ul: ["compact", "type"],
              video: ["autoplay", "controls", "crossorigin", "height", "loop", "muted", "playsinline", "poster", "preload", "src", "width"]
            }
          };
        }
      });
      var require_map_object = __commonJS2({
        "src/language-html/utils/map-object.js"(exports2, module2) {
          "use strict";
          init_define_process();
          function mapObject(object, fn) {
            const newObject = /* @__PURE__ */ Object.create(null);
            for (const [key, value] of Object.entries(object)) {
              newObject[key] = fn(value, key);
            }
            return newObject;
          }
          module2.exports = mapObject;
        }
      });
      var require_html_elements_attributes = __commonJS2({
        "src/language-html/utils/html-elements-attributes.js"(exports2, module2) {
          "use strict";
          init_define_process();
          var {
            htmlElementAttributes
          } = require_html_element_attributes();
          var mapObject = require_map_object();
          var arrayToMap = require_array_to_map();
          var HTML_ELEMENT_ATTRIBUTES2 = mapObject(htmlElementAttributes, arrayToMap);
          module2.exports = HTML_ELEMENT_ATTRIBUTES2;
        }
      });
      var require_is_unknown_namespace = __commonJS2({
        "src/language-html/utils/is-unknown-namespace.js"(exports2, module2) {
          "use strict";
          init_define_process();
          function isUnknownNamespace2(node) {
            return node.type === "element" && !node.hasExplicitNamespace && !["html", "svg"].includes(node.namespace);
          }
          module2.exports = isUnknownNamespace2;
        }
      });
      var require_pragma = __commonJS2({
        "src/language-html/pragma.js"(exports2, module2) {
          "use strict";
          init_define_process();
          function hasPragma2(text) {
            return /^\s*<!--\s*@(?:format|prettier)\s*-->/.test(text);
          }
          function insertPragma(text) {
            return "<!-- @format -->\n\n" + text.replace(/^\s*\n/, "");
          }
          module2.exports = {
            hasPragma: hasPragma2,
            insertPragma
          };
        }
      });
      var require_ast = __commonJS2({
        "src/language-html/ast.js"(exports2, module2) {
          "use strict";
          init_define_process();
          var NODES_KEYS = {
            attrs: true,
            children: true
          };
          var NON_ENUMERABLE_PROPERTIES = /* @__PURE__ */ new Set(["parent"]);
          var Node2 = class {
            constructor() {
              let nodeOrProperties = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
              for (const property of /* @__PURE__ */ new Set([...NON_ENUMERABLE_PROPERTIES, ...Object.keys(nodeOrProperties)])) {
                this.setProperty(property, nodeOrProperties[property]);
              }
            }
            setProperty(property, value) {
              if (this[property] === value) {
                return;
              }
              if (property in NODES_KEYS) {
                value = value.map((node) => this.createChild(node));
              }
              if (!NON_ENUMERABLE_PROPERTIES.has(property)) {
                this[property] = value;
                return;
              }
              Object.defineProperty(this, property, {
                value,
                enumerable: false,
                configurable: true
              });
            }
            map(fn) {
              let newNode;
              for (const NODES_KEY in NODES_KEYS) {
                const nodes = this[NODES_KEY];
                if (nodes) {
                  const mappedNodes = mapNodesIfChanged(nodes, (node) => node.map(fn));
                  if (newNode !== nodes) {
                    if (!newNode) {
                      newNode = new Node2({
                        parent: this.parent
                      });
                    }
                    newNode.setProperty(NODES_KEY, mappedNodes);
                  }
                }
              }
              if (newNode) {
                for (const key in this) {
                  if (!(key in NODES_KEYS)) {
                    newNode[key] = this[key];
                  }
                }
              }
              return fn(newNode || this);
            }
            walk(fn) {
              for (const NODES_KEY in NODES_KEYS) {
                const nodes = this[NODES_KEY];
                if (nodes) {
                  for (let i = 0; i < nodes.length; i++) {
                    nodes[i].walk(fn);
                  }
                }
              }
              fn(this);
            }
            createChild(nodeOrProperties) {
              const node = nodeOrProperties instanceof Node2 ? nodeOrProperties.clone() : new Node2(nodeOrProperties);
              node.setProperty("parent", this);
              return node;
            }
            insertChildBefore(target, node) {
              this.children.splice(this.children.indexOf(target), 0, this.createChild(node));
            }
            removeChild(child) {
              this.children.splice(this.children.indexOf(child), 1);
            }
            replaceChild(target, node) {
              this.children[this.children.indexOf(target)] = this.createChild(node);
            }
            clone() {
              return new Node2(this);
            }
            get firstChild() {
              var _this$children;
              return (_this$children = this.children) === null || _this$children === void 0 ? void 0 : _this$children[0];
            }
            get lastChild() {
              var _this$children2;
              return (_this$children2 = this.children) === null || _this$children2 === void 0 ? void 0 : _this$children2[this.children.length - 1];
            }
            get prev() {
              var _this$parent;
              return (_this$parent = this.parent) === null || _this$parent === void 0 ? void 0 : _this$parent.children[this.parent.children.indexOf(this) - 1];
            }
            get next() {
              var _this$parent2;
              return (_this$parent2 = this.parent) === null || _this$parent2 === void 0 ? void 0 : _this$parent2.children[this.parent.children.indexOf(this) + 1];
            }
            get rawName() {
              return this.hasExplicitNamespace ? this.fullName : this.name;
            }
            get fullName() {
              return this.namespace ? this.namespace + ":" + this.name : this.name;
            }
            get attrMap() {
              return Object.fromEntries(this.attrs.map((attr) => [attr.fullName, attr.value]));
            }
          };
          function mapNodesIfChanged(nodes, fn) {
            const newNodes = nodes.map(fn);
            return newNodes.some((newNode, index) => newNode !== nodes[index]) ? newNodes : nodes;
          }
          module2.exports = {
            Node: Node2
          };
        }
      });
      var require_conditional_comment = __commonJS2({
        "src/language-html/conditional-comment.js"(exports2, module2) {
          "use strict";
          init_define_process();
          var {
            ParseSourceSpan: ParseSourceSpan2
          } = require_parse_util();
          var parseFunctions = [{
            regex: /^(\[if([^\]]*)]>)(.*?)<!\s*\[endif]$/s,
            parse: parseIeConditionalStartEndComment
          }, {
            regex: /^\[if([^\]]*)]><!$/,
            parse: parseIeConditionalStartComment
          }, {
            regex: /^<!\s*\[endif]$/,
            parse: parseIeConditionalEndComment
          }];
          function parseIeConditionalComment2(node, parseHtml) {
            if (node.value) {
              for (const {
                regex,
                parse
              } of parseFunctions) {
                const match = node.value.match(regex);
                if (match) {
                  return parse(node, parseHtml, match);
                }
              }
            }
            return null;
          }
          function parseIeConditionalStartEndComment(node, parseHtml, match) {
            const [, openingTagSuffix, condition, data] = match;
            const offset = "<!--".length + openingTagSuffix.length;
            const contentStartSpan = node.sourceSpan.start.moveBy(offset);
            const contentEndSpan = contentStartSpan.moveBy(data.length);
            const [complete, children] = (() => {
              try {
                return [true, parseHtml(data, contentStartSpan).children];
              } catch {
                const text = {
                  type: "text",
                  value: data,
                  sourceSpan: new ParseSourceSpan2(contentStartSpan, contentEndSpan)
                };
                return [false, [text]];
              }
            })();
            return {
              type: "ieConditionalComment",
              complete,
              children,
              condition: condition.trim().replace(/\s+/g, " "),
              sourceSpan: node.sourceSpan,
              startSourceSpan: new ParseSourceSpan2(node.sourceSpan.start, contentStartSpan),
              endSourceSpan: new ParseSourceSpan2(contentEndSpan, node.sourceSpan.end)
            };
          }
          function parseIeConditionalStartComment(node, parseHtml, match) {
            const [, condition] = match;
            return {
              type: "ieConditionalStartComment",
              condition: condition.trim().replace(/\s+/g, " "),
              sourceSpan: node.sourceSpan
            };
          }
          function parseIeConditionalEndComment(node) {
            return {
              type: "ieConditionalEndComment",
              sourceSpan: node.sourceSpan
            };
          }
          module2.exports = {
            parseIeConditionalComment: parseIeConditionalComment2
          };
        }
      });
      var require_loc = __commonJS2({
        "src/language-html/loc.js"(exports2, module2) {
          "use strict";
          init_define_process();
          function locStart2(node) {
            return node.sourceSpan.start.offset;
          }
          function locEnd2(node) {
            return node.sourceSpan.end.offset;
          }
          module2.exports = {
            locStart: locStart2,
            locEnd: locEnd2
          };
        }
      });
      var require_tags = __commonJS2({
        "node_modules/angular-html-parser/lib/compiler/src/ml_parser/tags.js"(exports2) {
          "use strict";
          init_define_process();
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          var TagContentType;
          (function(TagContentType2) {
            TagContentType2[TagContentType2["RAW_TEXT"] = 0] = "RAW_TEXT";
            TagContentType2[TagContentType2["ESCAPABLE_RAW_TEXT"] = 1] = "ESCAPABLE_RAW_TEXT";
            TagContentType2[TagContentType2["PARSABLE_DATA"] = 2] = "PARSABLE_DATA";
          })(TagContentType = exports2.TagContentType || (exports2.TagContentType = {}));
          function splitNsName(elementName) {
            if (elementName[0] != ":") {
              return [null, elementName];
            }
            const colonIndex = elementName.indexOf(":", 1);
            if (colonIndex == -1) {
              throw new Error(`Unsupported format "${elementName}" expecting ":namespace:name"`);
            }
            return [elementName.slice(1, colonIndex), elementName.slice(colonIndex + 1)];
          }
          exports2.splitNsName = splitNsName;
          function isNgContainer(tagName) {
            return splitNsName(tagName)[1] === "ng-container";
          }
          exports2.isNgContainer = isNgContainer;
          function isNgContent(tagName) {
            return splitNsName(tagName)[1] === "ng-content";
          }
          exports2.isNgContent = isNgContent;
          function isNgTemplate(tagName) {
            return splitNsName(tagName)[1] === "ng-template";
          }
          exports2.isNgTemplate = isNgTemplate;
          function getNsPrefix(fullName) {
            return fullName === null ? null : splitNsName(fullName)[0];
          }
          exports2.getNsPrefix = getNsPrefix;
          function mergeNsAndName(prefix, localName) {
            return prefix ? `:${prefix}:${localName}` : localName;
          }
          exports2.mergeNsAndName = mergeNsAndName;
          exports2.NAMED_ENTITIES = {
            "Aacute": "\xC1",
            "aacute": "\xE1",
            "Abreve": "\u0102",
            "abreve": "\u0103",
            "ac": "\u223E",
            "acd": "\u223F",
            "acE": "\u223E\u0333",
            "Acirc": "\xC2",
            "acirc": "\xE2",
            "acute": "\xB4",
            "Acy": "\u0410",
            "acy": "\u0430",
            "AElig": "\xC6",
            "aelig": "\xE6",
            "af": "\u2061",
            "Afr": "\u{1D504}",
            "afr": "\u{1D51E}",
            "Agrave": "\xC0",
            "agrave": "\xE0",
            "alefsym": "\u2135",
            "aleph": "\u2135",
            "Alpha": "\u0391",
            "alpha": "\u03B1",
            "Amacr": "\u0100",
            "amacr": "\u0101",
            "amalg": "\u2A3F",
            "AMP": "&",
            "amp": "&",
            "And": "\u2A53",
            "and": "\u2227",
            "andand": "\u2A55",
            "andd": "\u2A5C",
            "andslope": "\u2A58",
            "andv": "\u2A5A",
            "ang": "\u2220",
            "ange": "\u29A4",
            "angle": "\u2220",
            "angmsd": "\u2221",
            "angmsdaa": "\u29A8",
            "angmsdab": "\u29A9",
            "angmsdac": "\u29AA",
            "angmsdad": "\u29AB",
            "angmsdae": "\u29AC",
            "angmsdaf": "\u29AD",
            "angmsdag": "\u29AE",
            "angmsdah": "\u29AF",
            "angrt": "\u221F",
            "angrtvb": "\u22BE",
            "angrtvbd": "\u299D",
            "angsph": "\u2222",
            "angst": "\xC5",
            "angzarr": "\u237C",
            "Aogon": "\u0104",
            "aogon": "\u0105",
            "Aopf": "\u{1D538}",
            "aopf": "\u{1D552}",
            "ap": "\u2248",
            "apacir": "\u2A6F",
            "apE": "\u2A70",
            "ape": "\u224A",
            "apid": "\u224B",
            "apos": "'",
            "ApplyFunction": "\u2061",
            "approx": "\u2248",
            "approxeq": "\u224A",
            "Aring": "\xC5",
            "aring": "\xE5",
            "Ascr": "\u{1D49C}",
            "ascr": "\u{1D4B6}",
            "Assign": "\u2254",
            "ast": "*",
            "asymp": "\u2248",
            "asympeq": "\u224D",
            "Atilde": "\xC3",
            "atilde": "\xE3",
            "Auml": "\xC4",
            "auml": "\xE4",
            "awconint": "\u2233",
            "awint": "\u2A11",
            "backcong": "\u224C",
            "backepsilon": "\u03F6",
            "backprime": "\u2035",
            "backsim": "\u223D",
            "backsimeq": "\u22CD",
            "Backslash": "\u2216",
            "Barv": "\u2AE7",
            "barvee": "\u22BD",
            "Barwed": "\u2306",
            "barwed": "\u2305",
            "barwedge": "\u2305",
            "bbrk": "\u23B5",
            "bbrktbrk": "\u23B6",
            "bcong": "\u224C",
            "Bcy": "\u0411",
            "bcy": "\u0431",
            "bdquo": "\u201E",
            "becaus": "\u2235",
            "Because": "\u2235",
            "because": "\u2235",
            "bemptyv": "\u29B0",
            "bepsi": "\u03F6",
            "bernou": "\u212C",
            "Bernoullis": "\u212C",
            "Beta": "\u0392",
            "beta": "\u03B2",
            "beth": "\u2136",
            "between": "\u226C",
            "Bfr": "\u{1D505}",
            "bfr": "\u{1D51F}",
            "bigcap": "\u22C2",
            "bigcirc": "\u25EF",
            "bigcup": "\u22C3",
            "bigodot": "\u2A00",
            "bigoplus": "\u2A01",
            "bigotimes": "\u2A02",
            "bigsqcup": "\u2A06",
            "bigstar": "\u2605",
            "bigtriangledown": "\u25BD",
            "bigtriangleup": "\u25B3",
            "biguplus": "\u2A04",
            "bigvee": "\u22C1",
            "bigwedge": "\u22C0",
            "bkarow": "\u290D",
            "blacklozenge": "\u29EB",
            "blacksquare": "\u25AA",
            "blacktriangle": "\u25B4",
            "blacktriangledown": "\u25BE",
            "blacktriangleleft": "\u25C2",
            "blacktriangleright": "\u25B8",
            "blank": "\u2423",
            "blk12": "\u2592",
            "blk14": "\u2591",
            "blk34": "\u2593",
            "block": "\u2588",
            "bne": "=\u20E5",
            "bnequiv": "\u2261\u20E5",
            "bNot": "\u2AED",
            "bnot": "\u2310",
            "Bopf": "\u{1D539}",
            "bopf": "\u{1D553}",
            "bot": "\u22A5",
            "bottom": "\u22A5",
            "bowtie": "\u22C8",
            "boxbox": "\u29C9",
            "boxDL": "\u2557",
            "boxDl": "\u2556",
            "boxdL": "\u2555",
            "boxdl": "\u2510",
            "boxDR": "\u2554",
            "boxDr": "\u2553",
            "boxdR": "\u2552",
            "boxdr": "\u250C",
            "boxH": "\u2550",
            "boxh": "\u2500",
            "boxHD": "\u2566",
            "boxHd": "\u2564",
            "boxhD": "\u2565",
            "boxhd": "\u252C",
            "boxHU": "\u2569",
            "boxHu": "\u2567",
            "boxhU": "\u2568",
            "boxhu": "\u2534",
            "boxminus": "\u229F",
            "boxplus": "\u229E",
            "boxtimes": "\u22A0",
            "boxUL": "\u255D",
            "boxUl": "\u255C",
            "boxuL": "\u255B",
            "boxul": "\u2518",
            "boxUR": "\u255A",
            "boxUr": "\u2559",
            "boxuR": "\u2558",
            "boxur": "\u2514",
            "boxV": "\u2551",
            "boxv": "\u2502",
            "boxVH": "\u256C",
            "boxVh": "\u256B",
            "boxvH": "\u256A",
            "boxvh": "\u253C",
            "boxVL": "\u2563",
            "boxVl": "\u2562",
            "boxvL": "\u2561",
            "boxvl": "\u2524",
            "boxVR": "\u2560",
            "boxVr": "\u255F",
            "boxvR": "\u255E",
            "boxvr": "\u251C",
            "bprime": "\u2035",
            "Breve": "\u02D8",
            "breve": "\u02D8",
            "brvbar": "\xA6",
            "Bscr": "\u212C",
            "bscr": "\u{1D4B7}",
            "bsemi": "\u204F",
            "bsim": "\u223D",
            "bsime": "\u22CD",
            "bsol": "\\",
            "bsolb": "\u29C5",
            "bsolhsub": "\u27C8",
            "bull": "\u2022",
            "bullet": "\u2022",
            "bump": "\u224E",
            "bumpE": "\u2AAE",
            "bumpe": "\u224F",
            "Bumpeq": "\u224E",
            "bumpeq": "\u224F",
            "Cacute": "\u0106",
            "cacute": "\u0107",
            "Cap": "\u22D2",
            "cap": "\u2229",
            "capand": "\u2A44",
            "capbrcup": "\u2A49",
            "capcap": "\u2A4B",
            "capcup": "\u2A47",
            "capdot": "\u2A40",
            "CapitalDifferentialD": "\u2145",
            "caps": "\u2229\uFE00",
            "caret": "\u2041",
            "caron": "\u02C7",
            "Cayleys": "\u212D",
            "ccaps": "\u2A4D",
            "Ccaron": "\u010C",
            "ccaron": "\u010D",
            "Ccedil": "\xC7",
            "ccedil": "\xE7",
            "Ccirc": "\u0108",
            "ccirc": "\u0109",
            "Cconint": "\u2230",
            "ccups": "\u2A4C",
            "ccupssm": "\u2A50",
            "Cdot": "\u010A",
            "cdot": "\u010B",
            "cedil": "\xB8",
            "Cedilla": "\xB8",
            "cemptyv": "\u29B2",
            "cent": "\xA2",
            "CenterDot": "\xB7",
            "centerdot": "\xB7",
            "Cfr": "\u212D",
            "cfr": "\u{1D520}",
            "CHcy": "\u0427",
            "chcy": "\u0447",
            "check": "\u2713",
            "checkmark": "\u2713",
            "Chi": "\u03A7",
            "chi": "\u03C7",
            "cir": "\u25CB",
            "circ": "\u02C6",
            "circeq": "\u2257",
            "circlearrowleft": "\u21BA",
            "circlearrowright": "\u21BB",
            "circledast": "\u229B",
            "circledcirc": "\u229A",
            "circleddash": "\u229D",
            "CircleDot": "\u2299",
            "circledR": "\xAE",
            "circledS": "\u24C8",
            "CircleMinus": "\u2296",
            "CirclePlus": "\u2295",
            "CircleTimes": "\u2297",
            "cirE": "\u29C3",
            "cire": "\u2257",
            "cirfnint": "\u2A10",
            "cirmid": "\u2AEF",
            "cirscir": "\u29C2",
            "ClockwiseContourIntegral": "\u2232",
            "CloseCurlyDoubleQuote": "\u201D",
            "CloseCurlyQuote": "\u2019",
            "clubs": "\u2663",
            "clubsuit": "\u2663",
            "Colon": "\u2237",
            "colon": ":",
            "Colone": "\u2A74",
            "colone": "\u2254",
            "coloneq": "\u2254",
            "comma": ",",
            "commat": "@",
            "comp": "\u2201",
            "compfn": "\u2218",
            "complement": "\u2201",
            "complexes": "\u2102",
            "cong": "\u2245",
            "congdot": "\u2A6D",
            "Congruent": "\u2261",
            "Conint": "\u222F",
            "conint": "\u222E",
            "ContourIntegral": "\u222E",
            "Copf": "\u2102",
            "copf": "\u{1D554}",
            "coprod": "\u2210",
            "Coproduct": "\u2210",
            "COPY": "\xA9",
            "copy": "\xA9",
            "copysr": "\u2117",
            "CounterClockwiseContourIntegral": "\u2233",
            "crarr": "\u21B5",
            "Cross": "\u2A2F",
            "cross": "\u2717",
            "Cscr": "\u{1D49E}",
            "cscr": "\u{1D4B8}",
            "csub": "\u2ACF",
            "csube": "\u2AD1",
            "csup": "\u2AD0",
            "csupe": "\u2AD2",
            "ctdot": "\u22EF",
            "cudarrl": "\u2938",
            "cudarrr": "\u2935",
            "cuepr": "\u22DE",
            "cuesc": "\u22DF",
            "cularr": "\u21B6",
            "cularrp": "\u293D",
            "Cup": "\u22D3",
            "cup": "\u222A",
            "cupbrcap": "\u2A48",
            "CupCap": "\u224D",
            "cupcap": "\u2A46",
            "cupcup": "\u2A4A",
            "cupdot": "\u228D",
            "cupor": "\u2A45",
            "cups": "\u222A\uFE00",
            "curarr": "\u21B7",
            "curarrm": "\u293C",
            "curlyeqprec": "\u22DE",
            "curlyeqsucc": "\u22DF",
            "curlyvee": "\u22CE",
            "curlywedge": "\u22CF",
            "curren": "\xA4",
            "curvearrowleft": "\u21B6",
            "curvearrowright": "\u21B7",
            "cuvee": "\u22CE",
            "cuwed": "\u22CF",
            "cwconint": "\u2232",
            "cwint": "\u2231",
            "cylcty": "\u232D",
            "Dagger": "\u2021",
            "dagger": "\u2020",
            "daleth": "\u2138",
            "Darr": "\u21A1",
            "dArr": "\u21D3",
            "darr": "\u2193",
            "dash": "\u2010",
            "Dashv": "\u2AE4",
            "dashv": "\u22A3",
            "dbkarow": "\u290F",
            "dblac": "\u02DD",
            "Dcaron": "\u010E",
            "dcaron": "\u010F",
            "Dcy": "\u0414",
            "dcy": "\u0434",
            "DD": "\u2145",
            "dd": "\u2146",
            "ddagger": "\u2021",
            "ddarr": "\u21CA",
            "DDotrahd": "\u2911",
            "ddotseq": "\u2A77",
            "deg": "\xB0",
            "Del": "\u2207",
            "Delta": "\u0394",
            "delta": "\u03B4",
            "demptyv": "\u29B1",
            "dfisht": "\u297F",
            "Dfr": "\u{1D507}",
            "dfr": "\u{1D521}",
            "dHar": "\u2965",
            "dharl": "\u21C3",
            "dharr": "\u21C2",
            "DiacriticalAcute": "\xB4",
            "DiacriticalDot": "\u02D9",
            "DiacriticalDoubleAcute": "\u02DD",
            "DiacriticalGrave": "`",
            "DiacriticalTilde": "\u02DC",
            "diam": "\u22C4",
            "Diamond": "\u22C4",
            "diamond": "\u22C4",
            "diamondsuit": "\u2666",
            "diams": "\u2666",
            "die": "\xA8",
            "DifferentialD": "\u2146",
            "digamma": "\u03DD",
            "disin": "\u22F2",
            "div": "\xF7",
            "divide": "\xF7",
            "divideontimes": "\u22C7",
            "divonx": "\u22C7",
            "DJcy": "\u0402",
            "djcy": "\u0452",
            "dlcorn": "\u231E",
            "dlcrop": "\u230D",
            "dollar": "$",
            "Dopf": "\u{1D53B}",
            "dopf": "\u{1D555}",
            "Dot": "\xA8",
            "dot": "\u02D9",
            "DotDot": "\u20DC",
            "doteq": "\u2250",
            "doteqdot": "\u2251",
            "DotEqual": "\u2250",
            "dotminus": "\u2238",
            "dotplus": "\u2214",
            "dotsquare": "\u22A1",
            "doublebarwedge": "\u2306",
            "DoubleContourIntegral": "\u222F",
            "DoubleDot": "\xA8",
            "DoubleDownArrow": "\u21D3",
            "DoubleLeftArrow": "\u21D0",
            "DoubleLeftRightArrow": "\u21D4",
            "DoubleLeftTee": "\u2AE4",
            "DoubleLongLeftArrow": "\u27F8",
            "DoubleLongLeftRightArrow": "\u27FA",
            "DoubleLongRightArrow": "\u27F9",
            "DoubleRightArrow": "\u21D2",
            "DoubleRightTee": "\u22A8",
            "DoubleUpArrow": "\u21D1",
            "DoubleUpDownArrow": "\u21D5",
            "DoubleVerticalBar": "\u2225",
            "DownArrow": "\u2193",
            "Downarrow": "\u21D3",
            "downarrow": "\u2193",
            "DownArrowBar": "\u2913",
            "DownArrowUpArrow": "\u21F5",
            "DownBreve": "\u0311",
            "downdownarrows": "\u21CA",
            "downharpoonleft": "\u21C3",
            "downharpoonright": "\u21C2",
            "DownLeftRightVector": "\u2950",
            "DownLeftTeeVector": "\u295E",
            "DownLeftVector": "\u21BD",
            "DownLeftVectorBar": "\u2956",
            "DownRightTeeVector": "\u295F",
            "DownRightVector": "\u21C1",
            "DownRightVectorBar": "\u2957",
            "DownTee": "\u22A4",
            "DownTeeArrow": "\u21A7",
            "drbkarow": "\u2910",
            "drcorn": "\u231F",
            "drcrop": "\u230C",
            "Dscr": "\u{1D49F}",
            "dscr": "\u{1D4B9}",
            "DScy": "\u0405",
            "dscy": "\u0455",
            "dsol": "\u29F6",
            "Dstrok": "\u0110",
            "dstrok": "\u0111",
            "dtdot": "\u22F1",
            "dtri": "\u25BF",
            "dtrif": "\u25BE",
            "duarr": "\u21F5",
            "duhar": "\u296F",
            "dwangle": "\u29A6",
            "DZcy": "\u040F",
            "dzcy": "\u045F",
            "dzigrarr": "\u27FF",
            "Eacute": "\xC9",
            "eacute": "\xE9",
            "easter": "\u2A6E",
            "Ecaron": "\u011A",
            "ecaron": "\u011B",
            "ecir": "\u2256",
            "Ecirc": "\xCA",
            "ecirc": "\xEA",
            "ecolon": "\u2255",
            "Ecy": "\u042D",
            "ecy": "\u044D",
            "eDDot": "\u2A77",
            "Edot": "\u0116",
            "eDot": "\u2251",
            "edot": "\u0117",
            "ee": "\u2147",
            "efDot": "\u2252",
            "Efr": "\u{1D508}",
            "efr": "\u{1D522}",
            "eg": "\u2A9A",
            "Egrave": "\xC8",
            "egrave": "\xE8",
            "egs": "\u2A96",
            "egsdot": "\u2A98",
            "el": "\u2A99",
            "Element": "\u2208",
            "elinters": "\u23E7",
            "ell": "\u2113",
            "els": "\u2A95",
            "elsdot": "\u2A97",
            "Emacr": "\u0112",
            "emacr": "\u0113",
            "empty": "\u2205",
            "emptyset": "\u2205",
            "EmptySmallSquare": "\u25FB",
            "emptyv": "\u2205",
            "EmptyVerySmallSquare": "\u25AB",
            "emsp": "\u2003",
            "emsp13": "\u2004",
            "emsp14": "\u2005",
            "ENG": "\u014A",
            "eng": "\u014B",
            "ensp": "\u2002",
            "Eogon": "\u0118",
            "eogon": "\u0119",
            "Eopf": "\u{1D53C}",
            "eopf": "\u{1D556}",
            "epar": "\u22D5",
            "eparsl": "\u29E3",
            "eplus": "\u2A71",
            "epsi": "\u03B5",
            "Epsilon": "\u0395",
            "epsilon": "\u03B5",
            "epsiv": "\u03F5",
            "eqcirc": "\u2256",
            "eqcolon": "\u2255",
            "eqsim": "\u2242",
            "eqslantgtr": "\u2A96",
            "eqslantless": "\u2A95",
            "Equal": "\u2A75",
            "equals": "=",
            "EqualTilde": "\u2242",
            "equest": "\u225F",
            "Equilibrium": "\u21CC",
            "equiv": "\u2261",
            "equivDD": "\u2A78",
            "eqvparsl": "\u29E5",
            "erarr": "\u2971",
            "erDot": "\u2253",
            "Escr": "\u2130",
            "escr": "\u212F",
            "esdot": "\u2250",
            "Esim": "\u2A73",
            "esim": "\u2242",
            "Eta": "\u0397",
            "eta": "\u03B7",
            "ETH": "\xD0",
            "eth": "\xF0",
            "Euml": "\xCB",
            "euml": "\xEB",
            "euro": "\u20AC",
            "excl": "!",
            "exist": "\u2203",
            "Exists": "\u2203",
            "expectation": "\u2130",
            "ExponentialE": "\u2147",
            "exponentiale": "\u2147",
            "fallingdotseq": "\u2252",
            "Fcy": "\u0424",
            "fcy": "\u0444",
            "female": "\u2640",
            "ffilig": "\uFB03",
            "fflig": "\uFB00",
            "ffllig": "\uFB04",
            "Ffr": "\u{1D509}",
            "ffr": "\u{1D523}",
            "filig": "\uFB01",
            "FilledSmallSquare": "\u25FC",
            "FilledVerySmallSquare": "\u25AA",
            "fjlig": "fj",
            "flat": "\u266D",
            "fllig": "\uFB02",
            "fltns": "\u25B1",
            "fnof": "\u0192",
            "Fopf": "\u{1D53D}",
            "fopf": "\u{1D557}",
            "ForAll": "\u2200",
            "forall": "\u2200",
            "fork": "\u22D4",
            "forkv": "\u2AD9",
            "Fouriertrf": "\u2131",
            "fpartint": "\u2A0D",
            "frac12": "\xBD",
            "frac13": "\u2153",
            "frac14": "\xBC",
            "frac15": "\u2155",
            "frac16": "\u2159",
            "frac18": "\u215B",
            "frac23": "\u2154",
            "frac25": "\u2156",
            "frac34": "\xBE",
            "frac35": "\u2157",
            "frac38": "\u215C",
            "frac45": "\u2158",
            "frac56": "\u215A",
            "frac58": "\u215D",
            "frac78": "\u215E",
            "frasl": "\u2044",
            "frown": "\u2322",
            "Fscr": "\u2131",
            "fscr": "\u{1D4BB}",
            "gacute": "\u01F5",
            "Gamma": "\u0393",
            "gamma": "\u03B3",
            "Gammad": "\u03DC",
            "gammad": "\u03DD",
            "gap": "\u2A86",
            "Gbreve": "\u011E",
            "gbreve": "\u011F",
            "Gcedil": "\u0122",
            "Gcirc": "\u011C",
            "gcirc": "\u011D",
            "Gcy": "\u0413",
            "gcy": "\u0433",
            "Gdot": "\u0120",
            "gdot": "\u0121",
            "gE": "\u2267",
            "ge": "\u2265",
            "gEl": "\u2A8C",
            "gel": "\u22DB",
            "geq": "\u2265",
            "geqq": "\u2267",
            "geqslant": "\u2A7E",
            "ges": "\u2A7E",
            "gescc": "\u2AA9",
            "gesdot": "\u2A80",
            "gesdoto": "\u2A82",
            "gesdotol": "\u2A84",
            "gesl": "\u22DB\uFE00",
            "gesles": "\u2A94",
            "Gfr": "\u{1D50A}",
            "gfr": "\u{1D524}",
            "Gg": "\u22D9",
            "gg": "\u226B",
            "ggg": "\u22D9",
            "gimel": "\u2137",
            "GJcy": "\u0403",
            "gjcy": "\u0453",
            "gl": "\u2277",
            "gla": "\u2AA5",
            "glE": "\u2A92",
            "glj": "\u2AA4",
            "gnap": "\u2A8A",
            "gnapprox": "\u2A8A",
            "gnE": "\u2269",
            "gne": "\u2A88",
            "gneq": "\u2A88",
            "gneqq": "\u2269",
            "gnsim": "\u22E7",
            "Gopf": "\u{1D53E}",
            "gopf": "\u{1D558}",
            "grave": "`",
            "GreaterEqual": "\u2265",
            "GreaterEqualLess": "\u22DB",
            "GreaterFullEqual": "\u2267",
            "GreaterGreater": "\u2AA2",
            "GreaterLess": "\u2277",
            "GreaterSlantEqual": "\u2A7E",
            "GreaterTilde": "\u2273",
            "Gscr": "\u{1D4A2}",
            "gscr": "\u210A",
            "gsim": "\u2273",
            "gsime": "\u2A8E",
            "gsiml": "\u2A90",
            "GT": ">",
            "Gt": "\u226B",
            "gt": ">",
            "gtcc": "\u2AA7",
            "gtcir": "\u2A7A",
            "gtdot": "\u22D7",
            "gtlPar": "\u2995",
            "gtquest": "\u2A7C",
            "gtrapprox": "\u2A86",
            "gtrarr": "\u2978",
            "gtrdot": "\u22D7",
            "gtreqless": "\u22DB",
            "gtreqqless": "\u2A8C",
            "gtrless": "\u2277",
            "gtrsim": "\u2273",
            "gvertneqq": "\u2269\uFE00",
            "gvnE": "\u2269\uFE00",
            "Hacek": "\u02C7",
            "hairsp": "\u200A",
            "half": "\xBD",
            "hamilt": "\u210B",
            "HARDcy": "\u042A",
            "hardcy": "\u044A",
            "hArr": "\u21D4",
            "harr": "\u2194",
            "harrcir": "\u2948",
            "harrw": "\u21AD",
            "Hat": "^",
            "hbar": "\u210F",
            "Hcirc": "\u0124",
            "hcirc": "\u0125",
            "hearts": "\u2665",
            "heartsuit": "\u2665",
            "hellip": "\u2026",
            "hercon": "\u22B9",
            "Hfr": "\u210C",
            "hfr": "\u{1D525}",
            "HilbertSpace": "\u210B",
            "hksearow": "\u2925",
            "hkswarow": "\u2926",
            "hoarr": "\u21FF",
            "homtht": "\u223B",
            "hookleftarrow": "\u21A9",
            "hookrightarrow": "\u21AA",
            "Hopf": "\u210D",
            "hopf": "\u{1D559}",
            "horbar": "\u2015",
            "HorizontalLine": "\u2500",
            "Hscr": "\u210B",
            "hscr": "\u{1D4BD}",
            "hslash": "\u210F",
            "Hstrok": "\u0126",
            "hstrok": "\u0127",
            "HumpDownHump": "\u224E",
            "HumpEqual": "\u224F",
            "hybull": "\u2043",
            "hyphen": "\u2010",
            "Iacute": "\xCD",
            "iacute": "\xED",
            "ic": "\u2063",
            "Icirc": "\xCE",
            "icirc": "\xEE",
            "Icy": "\u0418",
            "icy": "\u0438",
            "Idot": "\u0130",
            "IEcy": "\u0415",
            "iecy": "\u0435",
            "iexcl": "\xA1",
            "iff": "\u21D4",
            "Ifr": "\u2111",
            "ifr": "\u{1D526}",
            "Igrave": "\xCC",
            "igrave": "\xEC",
            "ii": "\u2148",
            "iiiint": "\u2A0C",
            "iiint": "\u222D",
            "iinfin": "\u29DC",
            "iiota": "\u2129",
            "IJlig": "\u0132",
            "ijlig": "\u0133",
            "Im": "\u2111",
            "Imacr": "\u012A",
            "imacr": "\u012B",
            "image": "\u2111",
            "ImaginaryI": "\u2148",
            "imagline": "\u2110",
            "imagpart": "\u2111",
            "imath": "\u0131",
            "imof": "\u22B7",
            "imped": "\u01B5",
            "Implies": "\u21D2",
            "in": "\u2208",
            "incare": "\u2105",
            "infin": "\u221E",
            "infintie": "\u29DD",
            "inodot": "\u0131",
            "Int": "\u222C",
            "int": "\u222B",
            "intcal": "\u22BA",
            "integers": "\u2124",
            "Integral": "\u222B",
            "intercal": "\u22BA",
            "Intersection": "\u22C2",
            "intlarhk": "\u2A17",
            "intprod": "\u2A3C",
            "InvisibleComma": "\u2063",
            "InvisibleTimes": "\u2062",
            "IOcy": "\u0401",
            "iocy": "\u0451",
            "Iogon": "\u012E",
            "iogon": "\u012F",
            "Iopf": "\u{1D540}",
            "iopf": "\u{1D55A}",
            "Iota": "\u0399",
            "iota": "\u03B9",
            "iprod": "\u2A3C",
            "iquest": "\xBF",
            "Iscr": "\u2110",
            "iscr": "\u{1D4BE}",
            "isin": "\u2208",
            "isindot": "\u22F5",
            "isinE": "\u22F9",
            "isins": "\u22F4",
            "isinsv": "\u22F3",
            "isinv": "\u2208",
            "it": "\u2062",
            "Itilde": "\u0128",
            "itilde": "\u0129",
            "Iukcy": "\u0406",
            "iukcy": "\u0456",
            "Iuml": "\xCF",
            "iuml": "\xEF",
            "Jcirc": "\u0134",
            "jcirc": "\u0135",
            "Jcy": "\u0419",
            "jcy": "\u0439",
            "Jfr": "\u{1D50D}",
            "jfr": "\u{1D527}",
            "jmath": "\u0237",
            "Jopf": "\u{1D541}",
            "jopf": "\u{1D55B}",
            "Jscr": "\u{1D4A5}",
            "jscr": "\u{1D4BF}",
            "Jsercy": "\u0408",
            "jsercy": "\u0458",
            "Jukcy": "\u0404",
            "jukcy": "\u0454",
            "Kappa": "\u039A",
            "kappa": "\u03BA",
            "kappav": "\u03F0",
            "Kcedil": "\u0136",
            "kcedil": "\u0137",
            "Kcy": "\u041A",
            "kcy": "\u043A",
            "Kfr": "\u{1D50E}",
            "kfr": "\u{1D528}",
            "kgreen": "\u0138",
            "KHcy": "\u0425",
            "khcy": "\u0445",
            "KJcy": "\u040C",
            "kjcy": "\u045C",
            "Kopf": "\u{1D542}",
            "kopf": "\u{1D55C}",
            "Kscr": "\u{1D4A6}",
            "kscr": "\u{1D4C0}",
            "lAarr": "\u21DA",
            "Lacute": "\u0139",
            "lacute": "\u013A",
            "laemptyv": "\u29B4",
            "lagran": "\u2112",
            "Lambda": "\u039B",
            "lambda": "\u03BB",
            "Lang": "\u27EA",
            "lang": "\u27E8",
            "langd": "\u2991",
            "langle": "\u27E8",
            "lap": "\u2A85",
            "Laplacetrf": "\u2112",
            "laquo": "\xAB",
            "Larr": "\u219E",
            "lArr": "\u21D0",
            "larr": "\u2190",
            "larrb": "\u21E4",
            "larrbfs": "\u291F",
            "larrfs": "\u291D",
            "larrhk": "\u21A9",
            "larrlp": "\u21AB",
            "larrpl": "\u2939",
            "larrsim": "\u2973",
            "larrtl": "\u21A2",
            "lat": "\u2AAB",
            "lAtail": "\u291B",
            "latail": "\u2919",
            "late": "\u2AAD",
            "lates": "\u2AAD\uFE00",
            "lBarr": "\u290E",
            "lbarr": "\u290C",
            "lbbrk": "\u2772",
            "lbrace": "{",
            "lbrack": "[",
            "lbrke": "\u298B",
            "lbrksld": "\u298F",
            "lbrkslu": "\u298D",
            "Lcaron": "\u013D",
            "lcaron": "\u013E",
            "Lcedil": "\u013B",
            "lcedil": "\u013C",
            "lceil": "\u2308",
            "lcub": "{",
            "Lcy": "\u041B",
            "lcy": "\u043B",
            "ldca": "\u2936",
            "ldquo": "\u201C",
            "ldquor": "\u201E",
            "ldrdhar": "\u2967",
            "ldrushar": "\u294B",
            "ldsh": "\u21B2",
            "lE": "\u2266",
            "le": "\u2264",
            "LeftAngleBracket": "\u27E8",
            "LeftArrow": "\u2190",
            "Leftarrow": "\u21D0",
            "leftarrow": "\u2190",
            "LeftArrowBar": "\u21E4",
            "LeftArrowRightArrow": "\u21C6",
            "leftarrowtail": "\u21A2",
            "LeftCeiling": "\u2308",
            "LeftDoubleBracket": "\u27E6",
            "LeftDownTeeVector": "\u2961",
            "LeftDownVector": "\u21C3",
            "LeftDownVectorBar": "\u2959",
            "LeftFloor": "\u230A",
            "leftharpoondown": "\u21BD",
            "leftharpoonup": "\u21BC",
            "leftleftarrows": "\u21C7",
            "LeftRightArrow": "\u2194",
            "Leftrightarrow": "\u21D4",
            "leftrightarrow": "\u2194",
            "leftrightarrows": "\u21C6",
            "leftrightharpoons": "\u21CB",
            "leftrightsquigarrow": "\u21AD",
            "LeftRightVector": "\u294E",
            "LeftTee": "\u22A3",
            "LeftTeeArrow": "\u21A4",
            "LeftTeeVector": "\u295A",
            "leftthreetimes": "\u22CB",
            "LeftTriangle": "\u22B2",
            "LeftTriangleBar": "\u29CF",
            "LeftTriangleEqual": "\u22B4",
            "LeftUpDownVector": "\u2951",
            "LeftUpTeeVector": "\u2960",
            "LeftUpVector": "\u21BF",
            "LeftUpVectorBar": "\u2958",
            "LeftVector": "\u21BC",
            "LeftVectorBar": "\u2952",
            "lEg": "\u2A8B",
            "leg": "\u22DA",
            "leq": "\u2264",
            "leqq": "\u2266",
            "leqslant": "\u2A7D",
            "les": "\u2A7D",
            "lescc": "\u2AA8",
            "lesdot": "\u2A7F",
            "lesdoto": "\u2A81",
            "lesdotor": "\u2A83",
            "lesg": "\u22DA\uFE00",
            "lesges": "\u2A93",
            "lessapprox": "\u2A85",
            "lessdot": "\u22D6",
            "lesseqgtr": "\u22DA",
            "lesseqqgtr": "\u2A8B",
            "LessEqualGreater": "\u22DA",
            "LessFullEqual": "\u2266",
            "LessGreater": "\u2276",
            "lessgtr": "\u2276",
            "LessLess": "\u2AA1",
            "lesssim": "\u2272",
            "LessSlantEqual": "\u2A7D",
            "LessTilde": "\u2272",
            "lfisht": "\u297C",
            "lfloor": "\u230A",
            "Lfr": "\u{1D50F}",
            "lfr": "\u{1D529}",
            "lg": "\u2276",
            "lgE": "\u2A91",
            "lHar": "\u2962",
            "lhard": "\u21BD",
            "lharu": "\u21BC",
            "lharul": "\u296A",
            "lhblk": "\u2584",
            "LJcy": "\u0409",
            "ljcy": "\u0459",
            "Ll": "\u22D8",
            "ll": "\u226A",
            "llarr": "\u21C7",
            "llcorner": "\u231E",
            "Lleftarrow": "\u21DA",
            "llhard": "\u296B",
            "lltri": "\u25FA",
            "Lmidot": "\u013F",
            "lmidot": "\u0140",
            "lmoust": "\u23B0",
            "lmoustache": "\u23B0",
            "lnap": "\u2A89",
            "lnapprox": "\u2A89",
            "lnE": "\u2268",
            "lne": "\u2A87",
            "lneq": "\u2A87",
            "lneqq": "\u2268",
            "lnsim": "\u22E6",
            "loang": "\u27EC",
            "loarr": "\u21FD",
            "lobrk": "\u27E6",
            "LongLeftArrow": "\u27F5",
            "Longleftarrow": "\u27F8",
            "longleftarrow": "\u27F5",
            "LongLeftRightArrow": "\u27F7",
            "Longleftrightarrow": "\u27FA",
            "longleftrightarrow": "\u27F7",
            "longmapsto": "\u27FC",
            "LongRightArrow": "\u27F6",
            "Longrightarrow": "\u27F9",
            "longrightarrow": "\u27F6",
            "looparrowleft": "\u21AB",
            "looparrowright": "\u21AC",
            "lopar": "\u2985",
            "Lopf": "\u{1D543}",
            "lopf": "\u{1D55D}",
            "loplus": "\u2A2D",
            "lotimes": "\u2A34",
            "lowast": "\u2217",
            "lowbar": "_",
            "LowerLeftArrow": "\u2199",
            "LowerRightArrow": "\u2198",
            "loz": "\u25CA",
            "lozenge": "\u25CA",
            "lozf": "\u29EB",
            "lpar": "(",
            "lparlt": "\u2993",
            "lrarr": "\u21C6",
            "lrcorner": "\u231F",
            "lrhar": "\u21CB",
            "lrhard": "\u296D",
            "lrm": "\u200E",
            "lrtri": "\u22BF",
            "lsaquo": "\u2039",
            "Lscr": "\u2112",
            "lscr": "\u{1D4C1}",
            "Lsh": "\u21B0",
            "lsh": "\u21B0",
            "lsim": "\u2272",
            "lsime": "\u2A8D",
            "lsimg": "\u2A8F",
            "lsqb": "[",
            "lsquo": "\u2018",
            "lsquor": "\u201A",
            "Lstrok": "\u0141",
            "lstrok": "\u0142",
            "LT": "<",
            "Lt": "\u226A",
            "lt": "<",
            "ltcc": "\u2AA6",
            "ltcir": "\u2A79",
            "ltdot": "\u22D6",
            "lthree": "\u22CB",
            "ltimes": "\u22C9",
            "ltlarr": "\u2976",
            "ltquest": "\u2A7B",
            "ltri": "\u25C3",
            "ltrie": "\u22B4",
            "ltrif": "\u25C2",
            "ltrPar": "\u2996",
            "lurdshar": "\u294A",
            "luruhar": "\u2966",
            "lvertneqq": "\u2268\uFE00",
            "lvnE": "\u2268\uFE00",
            "macr": "\xAF",
            "male": "\u2642",
            "malt": "\u2720",
            "maltese": "\u2720",
            "Map": "\u2905",
            "map": "\u21A6",
            "mapsto": "\u21A6",
            "mapstodown": "\u21A7",
            "mapstoleft": "\u21A4",
            "mapstoup": "\u21A5",
            "marker": "\u25AE",
            "mcomma": "\u2A29",
            "Mcy": "\u041C",
            "mcy": "\u043C",
            "mdash": "\u2014",
            "mDDot": "\u223A",
            "measuredangle": "\u2221",
            "MediumSpace": "\u205F",
            "Mellintrf": "\u2133",
            "Mfr": "\u{1D510}",
            "mfr": "\u{1D52A}",
            "mho": "\u2127",
            "micro": "\xB5",
            "mid": "\u2223",
            "midast": "*",
            "midcir": "\u2AF0",
            "middot": "\xB7",
            "minus": "\u2212",
            "minusb": "\u229F",
            "minusd": "\u2238",
            "minusdu": "\u2A2A",
            "MinusPlus": "\u2213",
            "mlcp": "\u2ADB",
            "mldr": "\u2026",
            "mnplus": "\u2213",
            "models": "\u22A7",
            "Mopf": "\u{1D544}",
            "mopf": "\u{1D55E}",
            "mp": "\u2213",
            "Mscr": "\u2133",
            "mscr": "\u{1D4C2}",
            "mstpos": "\u223E",
            "Mu": "\u039C",
            "mu": "\u03BC",
            "multimap": "\u22B8",
            "mumap": "\u22B8",
            "nabla": "\u2207",
            "Nacute": "\u0143",
            "nacute": "\u0144",
            "nang": "\u2220\u20D2",
            "nap": "\u2249",
            "napE": "\u2A70\u0338",
            "napid": "\u224B\u0338",
            "napos": "\u0149",
            "napprox": "\u2249",
            "natur": "\u266E",
            "natural": "\u266E",
            "naturals": "\u2115",
            "nbsp": "\xA0",
            "nbump": "\u224E\u0338",
            "nbumpe": "\u224F\u0338",
            "ncap": "\u2A43",
            "Ncaron": "\u0147",
            "ncaron": "\u0148",
            "Ncedil": "\u0145",
            "ncedil": "\u0146",
            "ncong": "\u2247",
            "ncongdot": "\u2A6D\u0338",
            "ncup": "\u2A42",
            "Ncy": "\u041D",
            "ncy": "\u043D",
            "ndash": "\u2013",
            "ne": "\u2260",
            "nearhk": "\u2924",
            "neArr": "\u21D7",
            "nearr": "\u2197",
            "nearrow": "\u2197",
            "nedot": "\u2250\u0338",
            "NegativeMediumSpace": "\u200B",
            "NegativeThickSpace": "\u200B",
            "NegativeThinSpace": "\u200B",
            "NegativeVeryThinSpace": "\u200B",
            "nequiv": "\u2262",
            "nesear": "\u2928",
            "nesim": "\u2242\u0338",
            "NestedGreaterGreater": "\u226B",
            "NestedLessLess": "\u226A",
            "NewLine": "\n",
            "nexist": "\u2204",
            "nexists": "\u2204",
            "Nfr": "\u{1D511}",
            "nfr": "\u{1D52B}",
            "ngE": "\u2267\u0338",
            "nge": "\u2271",
            "ngeq": "\u2271",
            "ngeqq": "\u2267\u0338",
            "ngeqslant": "\u2A7E\u0338",
            "nges": "\u2A7E\u0338",
            "nGg": "\u22D9\u0338",
            "ngsim": "\u2275",
            "nGt": "\u226B\u20D2",
            "ngt": "\u226F",
            "ngtr": "\u226F",
            "nGtv": "\u226B\u0338",
            "nhArr": "\u21CE",
            "nharr": "\u21AE",
            "nhpar": "\u2AF2",
            "ni": "\u220B",
            "nis": "\u22FC",
            "nisd": "\u22FA",
            "niv": "\u220B",
            "NJcy": "\u040A",
            "njcy": "\u045A",
            "nlArr": "\u21CD",
            "nlarr": "\u219A",
            "nldr": "\u2025",
            "nlE": "\u2266\u0338",
            "nle": "\u2270",
            "nLeftarrow": "\u21CD",
            "nleftarrow": "\u219A",
            "nLeftrightarrow": "\u21CE",
            "nleftrightarrow": "\u21AE",
            "nleq": "\u2270",
            "nleqq": "\u2266\u0338",
            "nleqslant": "\u2A7D\u0338",
            "nles": "\u2A7D\u0338",
            "nless": "\u226E",
            "nLl": "\u22D8\u0338",
            "nlsim": "\u2274",
            "nLt": "\u226A\u20D2",
            "nlt": "\u226E",
            "nltri": "\u22EA",
            "nltrie": "\u22EC",
            "nLtv": "\u226A\u0338",
            "nmid": "\u2224",
            "NoBreak": "\u2060",
            "NonBreakingSpace": "\xA0",
            "Nopf": "\u2115",
            "nopf": "\u{1D55F}",
            "Not": "\u2AEC",
            "not": "\xAC",
            "NotCongruent": "\u2262",
            "NotCupCap": "\u226D",
            "NotDoubleVerticalBar": "\u2226",
            "NotElement": "\u2209",
            "NotEqual": "\u2260",
            "NotEqualTilde": "\u2242\u0338",
            "NotExists": "\u2204",
            "NotGreater": "\u226F",
            "NotGreaterEqual": "\u2271",
            "NotGreaterFullEqual": "\u2267\u0338",
            "NotGreaterGreater": "\u226B\u0338",
            "NotGreaterLess": "\u2279",
            "NotGreaterSlantEqual": "\u2A7E\u0338",
            "NotGreaterTilde": "\u2275",
            "NotHumpDownHump": "\u224E\u0338",
            "NotHumpEqual": "\u224F\u0338",
            "notin": "\u2209",
            "notindot": "\u22F5\u0338",
            "notinE": "\u22F9\u0338",
            "notinva": "\u2209",
            "notinvb": "\u22F7",
            "notinvc": "\u22F6",
            "NotLeftTriangle": "\u22EA",
            "NotLeftTriangleBar": "\u29CF\u0338",
            "NotLeftTriangleEqual": "\u22EC",
            "NotLess": "\u226E",
            "NotLessEqual": "\u2270",
            "NotLessGreater": "\u2278",
            "NotLessLess": "\u226A\u0338",
            "NotLessSlantEqual": "\u2A7D\u0338",
            "NotLessTilde": "\u2274",
            "NotNestedGreaterGreater": "\u2AA2\u0338",
            "NotNestedLessLess": "\u2AA1\u0338",
            "notni": "\u220C",
            "notniva": "\u220C",
            "notnivb": "\u22FE",
            "notnivc": "\u22FD",
            "NotPrecedes": "\u2280",
            "NotPrecedesEqual": "\u2AAF\u0338",
            "NotPrecedesSlantEqual": "\u22E0",
            "NotReverseElement": "\u220C",
            "NotRightTriangle": "\u22EB",
            "NotRightTriangleBar": "\u29D0\u0338",
            "NotRightTriangleEqual": "\u22ED",
            "NotSquareSubset": "\u228F\u0338",
            "NotSquareSubsetEqual": "\u22E2",
            "NotSquareSuperset": "\u2290\u0338",
            "NotSquareSupersetEqual": "\u22E3",
            "NotSubset": "\u2282\u20D2",
            "NotSubsetEqual": "\u2288",
            "NotSucceeds": "\u2281",
            "NotSucceedsEqual": "\u2AB0\u0338",
            "NotSucceedsSlantEqual": "\u22E1",
            "NotSucceedsTilde": "\u227F\u0338",
            "NotSuperset": "\u2283\u20D2",
            "NotSupersetEqual": "\u2289",
            "NotTilde": "\u2241",
            "NotTildeEqual": "\u2244",
            "NotTildeFullEqual": "\u2247",
            "NotTildeTilde": "\u2249",
            "NotVerticalBar": "\u2224",
            "npar": "\u2226",
            "nparallel": "\u2226",
            "nparsl": "\u2AFD\u20E5",
            "npart": "\u2202\u0338",
            "npolint": "\u2A14",
            "npr": "\u2280",
            "nprcue": "\u22E0",
            "npre": "\u2AAF\u0338",
            "nprec": "\u2280",
            "npreceq": "\u2AAF\u0338",
            "nrArr": "\u21CF",
            "nrarr": "\u219B",
            "nrarrc": "\u2933\u0338",
            "nrarrw": "\u219D\u0338",
            "nRightarrow": "\u21CF",
            "nrightarrow": "\u219B",
            "nrtri": "\u22EB",
            "nrtrie": "\u22ED",
            "nsc": "\u2281",
            "nsccue": "\u22E1",
            "nsce": "\u2AB0\u0338",
            "Nscr": "\u{1D4A9}",
            "nscr": "\u{1D4C3}",
            "nshortmid": "\u2224",
            "nshortparallel": "\u2226",
            "nsim": "\u2241",
            "nsime": "\u2244",
            "nsimeq": "\u2244",
            "nsmid": "\u2224",
            "nspar": "\u2226",
            "nsqsube": "\u22E2",
            "nsqsupe": "\u22E3",
            "nsub": "\u2284",
            "nsubE": "\u2AC5\u0338",
            "nsube": "\u2288",
            "nsubset": "\u2282\u20D2",
            "nsubseteq": "\u2288",
            "nsubseteqq": "\u2AC5\u0338",
            "nsucc": "\u2281",
            "nsucceq": "\u2AB0\u0338",
            "nsup": "\u2285",
            "nsupE": "\u2AC6\u0338",
            "nsupe": "\u2289",
            "nsupset": "\u2283\u20D2",
            "nsupseteq": "\u2289",
            "nsupseteqq": "\u2AC6\u0338",
            "ntgl": "\u2279",
            "Ntilde": "\xD1",
            "ntilde": "\xF1",
            "ntlg": "\u2278",
            "ntriangleleft": "\u22EA",
            "ntrianglelefteq": "\u22EC",
            "ntriangleright": "\u22EB",
            "ntrianglerighteq": "\u22ED",
            "Nu": "\u039D",
            "nu": "\u03BD",
            "num": "#",
            "numero": "\u2116",
            "numsp": "\u2007",
            "nvap": "\u224D\u20D2",
            "nVDash": "\u22AF",
            "nVdash": "\u22AE",
            "nvDash": "\u22AD",
            "nvdash": "\u22AC",
            "nvge": "\u2265\u20D2",
            "nvgt": ">\u20D2",
            "nvHarr": "\u2904",
            "nvinfin": "\u29DE",
            "nvlArr": "\u2902",
            "nvle": "\u2264\u20D2",
            "nvlt": "<\u20D2",
            "nvltrie": "\u22B4\u20D2",
            "nvrArr": "\u2903",
            "nvrtrie": "\u22B5\u20D2",
            "nvsim": "\u223C\u20D2",
            "nwarhk": "\u2923",
            "nwArr": "\u21D6",
            "nwarr": "\u2196",
            "nwarrow": "\u2196",
            "nwnear": "\u2927",
            "Oacute": "\xD3",
            "oacute": "\xF3",
            "oast": "\u229B",
            "ocir": "\u229A",
            "Ocirc": "\xD4",
            "ocirc": "\xF4",
            "Ocy": "\u041E",
            "ocy": "\u043E",
            "odash": "\u229D",
            "Odblac": "\u0150",
            "odblac": "\u0151",
            "odiv": "\u2A38",
            "odot": "\u2299",
            "odsold": "\u29BC",
            "OElig": "\u0152",
            "oelig": "\u0153",
            "ofcir": "\u29BF",
            "Ofr": "\u{1D512}",
            "ofr": "\u{1D52C}",
            "ogon": "\u02DB",
            "Ograve": "\xD2",
            "ograve": "\xF2",
            "ogt": "\u29C1",
            "ohbar": "\u29B5",
            "ohm": "\u03A9",
            "oint": "\u222E",
            "olarr": "\u21BA",
            "olcir": "\u29BE",
            "olcross": "\u29BB",
            "oline": "\u203E",
            "olt": "\u29C0",
            "Omacr": "\u014C",
            "omacr": "\u014D",
            "Omega": "\u03A9",
            "omega": "\u03C9",
            "Omicron": "\u039F",
            "omicron": "\u03BF",
            "omid": "\u29B6",
            "ominus": "\u2296",
            "Oopf": "\u{1D546}",
            "oopf": "\u{1D560}",
            "opar": "\u29B7",
            "OpenCurlyDoubleQuote": "\u201C",
            "OpenCurlyQuote": "\u2018",
            "operp": "\u29B9",
            "oplus": "\u2295",
            "Or": "\u2A54",
            "or": "\u2228",
            "orarr": "\u21BB",
            "ord": "\u2A5D",
            "order": "\u2134",
            "orderof": "\u2134",
            "ordf": "\xAA",
            "ordm": "\xBA",
            "origof": "\u22B6",
            "oror": "\u2A56",
            "orslope": "\u2A57",
            "orv": "\u2A5B",
            "oS": "\u24C8",
            "Oscr": "\u{1D4AA}",
            "oscr": "\u2134",
            "Oslash": "\xD8",
            "oslash": "\xF8",
            "osol": "\u2298",
            "Otilde": "\xD5",
            "otilde": "\xF5",
            "Otimes": "\u2A37",
            "otimes": "\u2297",
            "otimesas": "\u2A36",
            "Ouml": "\xD6",
            "ouml": "\xF6",
            "ovbar": "\u233D",
            "OverBar": "\u203E",
            "OverBrace": "\u23DE",
            "OverBracket": "\u23B4",
            "OverParenthesis": "\u23DC",
            "par": "\u2225",
            "para": "\xB6",
            "parallel": "\u2225",
            "parsim": "\u2AF3",
            "parsl": "\u2AFD",
            "part": "\u2202",
            "PartialD": "\u2202",
            "Pcy": "\u041F",
            "pcy": "\u043F",
            "percnt": "%",
            "period": ".",
            "permil": "\u2030",
            "perp": "\u22A5",
            "pertenk": "\u2031",
            "Pfr": "\u{1D513}",
            "pfr": "\u{1D52D}",
            "Phi": "\u03A6",
            "phi": "\u03C6",
            "phiv": "\u03D5",
            "phmmat": "\u2133",
            "phone": "\u260E",
            "Pi": "\u03A0",
            "pi": "\u03C0",
            "pitchfork": "\u22D4",
            "piv": "\u03D6",
            "planck": "\u210F",
            "planckh": "\u210E",
            "plankv": "\u210F",
            "plus": "+",
            "plusacir": "\u2A23",
            "plusb": "\u229E",
            "pluscir": "\u2A22",
            "plusdo": "\u2214",
            "plusdu": "\u2A25",
            "pluse": "\u2A72",
            "PlusMinus": "\xB1",
            "plusmn": "\xB1",
            "plussim": "\u2A26",
            "plustwo": "\u2A27",
            "pm": "\xB1",
            "Poincareplane": "\u210C",
            "pointint": "\u2A15",
            "Popf": "\u2119",
            "popf": "\u{1D561}",
            "pound": "\xA3",
            "Pr": "\u2ABB",
            "pr": "\u227A",
            "prap": "\u2AB7",
            "prcue": "\u227C",
            "prE": "\u2AB3",
            "pre": "\u2AAF",
            "prec": "\u227A",
            "precapprox": "\u2AB7",
            "preccurlyeq": "\u227C",
            "Precedes": "\u227A",
            "PrecedesEqual": "\u2AAF",
            "PrecedesSlantEqual": "\u227C",
            "PrecedesTilde": "\u227E",
            "preceq": "\u2AAF",
            "precnapprox": "\u2AB9",
            "precneqq": "\u2AB5",
            "precnsim": "\u22E8",
            "precsim": "\u227E",
            "Prime": "\u2033",
            "prime": "\u2032",
            "primes": "\u2119",
            "prnap": "\u2AB9",
            "prnE": "\u2AB5",
            "prnsim": "\u22E8",
            "prod": "\u220F",
            "Product": "\u220F",
            "profalar": "\u232E",
            "profline": "\u2312",
            "profsurf": "\u2313",
            "prop": "\u221D",
            "Proportion": "\u2237",
            "Proportional": "\u221D",
            "propto": "\u221D",
            "prsim": "\u227E",
            "prurel": "\u22B0",
            "Pscr": "\u{1D4AB}",
            "pscr": "\u{1D4C5}",
            "Psi": "\u03A8",
            "psi": "\u03C8",
            "puncsp": "\u2008",
            "Qfr": "\u{1D514}",
            "qfr": "\u{1D52E}",
            "qint": "\u2A0C",
            "Qopf": "\u211A",
            "qopf": "\u{1D562}",
            "qprime": "\u2057",
            "Qscr": "\u{1D4AC}",
            "qscr": "\u{1D4C6}",
            "quaternions": "\u210D",
            "quatint": "\u2A16",
            "quest": "?",
            "questeq": "\u225F",
            "QUOT": '"',
            "quot": '"',
            "rAarr": "\u21DB",
            "race": "\u223D\u0331",
            "Racute": "\u0154",
            "racute": "\u0155",
            "radic": "\u221A",
            "raemptyv": "\u29B3",
            "Rang": "\u27EB",
            "rang": "\u27E9",
            "rangd": "\u2992",
            "range": "\u29A5",
            "rangle": "\u27E9",
            "raquo": "\xBB",
            "Rarr": "\u21A0",
            "rArr": "\u21D2",
            "rarr": "\u2192",
            "rarrap": "\u2975",
            "rarrb": "\u21E5",
            "rarrbfs": "\u2920",
            "rarrc": "\u2933",
            "rarrfs": "\u291E",
            "rarrhk": "\u21AA",
            "rarrlp": "\u21AC",
            "rarrpl": "\u2945",
            "rarrsim": "\u2974",
            "Rarrtl": "\u2916",
            "rarrtl": "\u21A3",
            "rarrw": "\u219D",
            "rAtail": "\u291C",
            "ratail": "\u291A",
            "ratio": "\u2236",
            "rationals": "\u211A",
            "RBarr": "\u2910",
            "rBarr": "\u290F",
            "rbarr": "\u290D",
            "rbbrk": "\u2773",
            "rbrace": "}",
            "rbrack": "]",
            "rbrke": "\u298C",
            "rbrksld": "\u298E",
            "rbrkslu": "\u2990",
            "Rcaron": "\u0158",
            "rcaron": "\u0159",
            "Rcedil": "\u0156",
            "rcedil": "\u0157",
            "rceil": "\u2309",
            "rcub": "}",
            "Rcy": "\u0420",
            "rcy": "\u0440",
            "rdca": "\u2937",
            "rdldhar": "\u2969",
            "rdquo": "\u201D",
            "rdquor": "\u201D",
            "rdsh": "\u21B3",
            "Re": "\u211C",
            "real": "\u211C",
            "realine": "\u211B",
            "realpart": "\u211C",
            "reals": "\u211D",
            "rect": "\u25AD",
            "REG": "\xAE",
            "reg": "\xAE",
            "ReverseElement": "\u220B",
            "ReverseEquilibrium": "\u21CB",
            "ReverseUpEquilibrium": "\u296F",
            "rfisht": "\u297D",
            "rfloor": "\u230B",
            "Rfr": "\u211C",
            "rfr": "\u{1D52F}",
            "rHar": "\u2964",
            "rhard": "\u21C1",
            "rharu": "\u21C0",
            "rharul": "\u296C",
            "Rho": "\u03A1",
            "rho": "\u03C1",
            "rhov": "\u03F1",
            "RightAngleBracket": "\u27E9",
            "RightArrow": "\u2192",
            "Rightarrow": "\u21D2",
            "rightarrow": "\u2192",
            "RightArrowBar": "\u21E5",
            "RightArrowLeftArrow": "\u21C4",
            "rightarrowtail": "\u21A3",
            "RightCeiling": "\u2309",
            "RightDoubleBracket": "\u27E7",
            "RightDownTeeVector": "\u295D",
            "RightDownVector": "\u21C2",
            "RightDownVectorBar": "\u2955",
            "RightFloor": "\u230B",
            "rightharpoondown": "\u21C1",
            "rightharpoonup": "\u21C0",
            "rightleftarrows": "\u21C4",
            "rightleftharpoons": "\u21CC",
            "rightrightarrows": "\u21C9",
            "rightsquigarrow": "\u219D",
            "RightTee": "\u22A2",
            "RightTeeArrow": "\u21A6",
            "RightTeeVector": "\u295B",
            "rightthreetimes": "\u22CC",
            "RightTriangle": "\u22B3",
            "RightTriangleBar": "\u29D0",
            "RightTriangleEqual": "\u22B5",
            "RightUpDownVector": "\u294F",
            "RightUpTeeVector": "\u295C",
            "RightUpVector": "\u21BE",
            "RightUpVectorBar": "\u2954",
            "RightVector": "\u21C0",
            "RightVectorBar": "\u2953",
            "ring": "\u02DA",
            "risingdotseq": "\u2253",
            "rlarr": "\u21C4",
            "rlhar": "\u21CC",
            "rlm": "\u200F",
            "rmoust": "\u23B1",
            "rmoustache": "\u23B1",
            "rnmid": "\u2AEE",
            "roang": "\u27ED",
            "roarr": "\u21FE",
            "robrk": "\u27E7",
            "ropar": "\u2986",
            "Ropf": "\u211D",
            "ropf": "\u{1D563}",
            "roplus": "\u2A2E",
            "rotimes": "\u2A35",
            "RoundImplies": "\u2970",
            "rpar": ")",
            "rpargt": "\u2994",
            "rppolint": "\u2A12",
            "rrarr": "\u21C9",
            "Rrightarrow": "\u21DB",
            "rsaquo": "\u203A",
            "Rscr": "\u211B",
            "rscr": "\u{1D4C7}",
            "Rsh": "\u21B1",
            "rsh": "\u21B1",
            "rsqb": "]",
            "rsquo": "\u2019",
            "rsquor": "\u2019",
            "rthree": "\u22CC",
            "rtimes": "\u22CA",
            "rtri": "\u25B9",
            "rtrie": "\u22B5",
            "rtrif": "\u25B8",
            "rtriltri": "\u29CE",
            "RuleDelayed": "\u29F4",
            "ruluhar": "\u2968",
            "rx": "\u211E",
            "Sacute": "\u015A",
            "sacute": "\u015B",
            "sbquo": "\u201A",
            "Sc": "\u2ABC",
            "sc": "\u227B",
            "scap": "\u2AB8",
            "Scaron": "\u0160",
            "scaron": "\u0161",
            "sccue": "\u227D",
            "scE": "\u2AB4",
            "sce": "\u2AB0",
            "Scedil": "\u015E",
            "scedil": "\u015F",
            "Scirc": "\u015C",
            "scirc": "\u015D",
            "scnap": "\u2ABA",
            "scnE": "\u2AB6",
            "scnsim": "\u22E9",
            "scpolint": "\u2A13",
            "scsim": "\u227F",
            "Scy": "\u0421",
            "scy": "\u0441",
            "sdot": "\u22C5",
            "sdotb": "\u22A1",
            "sdote": "\u2A66",
            "searhk": "\u2925",
            "seArr": "\u21D8",
            "searr": "\u2198",
            "searrow": "\u2198",
            "sect": "\xA7",
            "semi": ";",
            "seswar": "\u2929",
            "setminus": "\u2216",
            "setmn": "\u2216",
            "sext": "\u2736",
            "Sfr": "\u{1D516}",
            "sfr": "\u{1D530}",
            "sfrown": "\u2322",
            "sharp": "\u266F",
            "SHCHcy": "\u0429",
            "shchcy": "\u0449",
            "SHcy": "\u0428",
            "shcy": "\u0448",
            "ShortDownArrow": "\u2193",
            "ShortLeftArrow": "\u2190",
            "shortmid": "\u2223",
            "shortparallel": "\u2225",
            "ShortRightArrow": "\u2192",
            "ShortUpArrow": "\u2191",
            "shy": "\xAD",
            "Sigma": "\u03A3",
            "sigma": "\u03C3",
            "sigmaf": "\u03C2",
            "sigmav": "\u03C2",
            "sim": "\u223C",
            "simdot": "\u2A6A",
            "sime": "\u2243",
            "simeq": "\u2243",
            "simg": "\u2A9E",
            "simgE": "\u2AA0",
            "siml": "\u2A9D",
            "simlE": "\u2A9F",
            "simne": "\u2246",
            "simplus": "\u2A24",
            "simrarr": "\u2972",
            "slarr": "\u2190",
            "SmallCircle": "\u2218",
            "smallsetminus": "\u2216",
            "smashp": "\u2A33",
            "smeparsl": "\u29E4",
            "smid": "\u2223",
            "smile": "\u2323",
            "smt": "\u2AAA",
            "smte": "\u2AAC",
            "smtes": "\u2AAC\uFE00",
            "SOFTcy": "\u042C",
            "softcy": "\u044C",
            "sol": "/",
            "solb": "\u29C4",
            "solbar": "\u233F",
            "Sopf": "\u{1D54A}",
            "sopf": "\u{1D564}",
            "spades": "\u2660",
            "spadesuit": "\u2660",
            "spar": "\u2225",
            "sqcap": "\u2293",
            "sqcaps": "\u2293\uFE00",
            "sqcup": "\u2294",
            "sqcups": "\u2294\uFE00",
            "Sqrt": "\u221A",
            "sqsub": "\u228F",
            "sqsube": "\u2291",
            "sqsubset": "\u228F",
            "sqsubseteq": "\u2291",
            "sqsup": "\u2290",
            "sqsupe": "\u2292",
            "sqsupset": "\u2290",
            "sqsupseteq": "\u2292",
            "squ": "\u25A1",
            "Square": "\u25A1",
            "square": "\u25A1",
            "SquareIntersection": "\u2293",
            "SquareSubset": "\u228F",
            "SquareSubsetEqual": "\u2291",
            "SquareSuperset": "\u2290",
            "SquareSupersetEqual": "\u2292",
            "SquareUnion": "\u2294",
            "squarf": "\u25AA",
            "squf": "\u25AA",
            "srarr": "\u2192",
            "Sscr": "\u{1D4AE}",
            "sscr": "\u{1D4C8}",
            "ssetmn": "\u2216",
            "ssmile": "\u2323",
            "sstarf": "\u22C6",
            "Star": "\u22C6",
            "star": "\u2606",
            "starf": "\u2605",
            "straightepsilon": "\u03F5",
            "straightphi": "\u03D5",
            "strns": "\xAF",
            "Sub": "\u22D0",
            "sub": "\u2282",
            "subdot": "\u2ABD",
            "subE": "\u2AC5",
            "sube": "\u2286",
            "subedot": "\u2AC3",
            "submult": "\u2AC1",
            "subnE": "\u2ACB",
            "subne": "\u228A",
            "subplus": "\u2ABF",
            "subrarr": "\u2979",
            "Subset": "\u22D0",
            "subset": "\u2282",
            "subseteq": "\u2286",
            "subseteqq": "\u2AC5",
            "SubsetEqual": "\u2286",
            "subsetneq": "\u228A",
            "subsetneqq": "\u2ACB",
            "subsim": "\u2AC7",
            "subsub": "\u2AD5",
            "subsup": "\u2AD3",
            "succ": "\u227B",
            "succapprox": "\u2AB8",
            "succcurlyeq": "\u227D",
            "Succeeds": "\u227B",
            "SucceedsEqual": "\u2AB0",
            "SucceedsSlantEqual": "\u227D",
            "SucceedsTilde": "\u227F",
            "succeq": "\u2AB0",
            "succnapprox": "\u2ABA",
            "succneqq": "\u2AB6",
            "succnsim": "\u22E9",
            "succsim": "\u227F",
            "SuchThat": "\u220B",
            "Sum": "\u2211",
            "sum": "\u2211",
            "sung": "\u266A",
            "Sup": "\u22D1",
            "sup": "\u2283",
            "sup1": "\xB9",
            "sup2": "\xB2",
            "sup3": "\xB3",
            "supdot": "\u2ABE",
            "supdsub": "\u2AD8",
            "supE": "\u2AC6",
            "supe": "\u2287",
            "supedot": "\u2AC4",
            "Superset": "\u2283",
            "SupersetEqual": "\u2287",
            "suphsol": "\u27C9",
            "suphsub": "\u2AD7",
            "suplarr": "\u297B",
            "supmult": "\u2AC2",
            "supnE": "\u2ACC",
            "supne": "\u228B",
            "supplus": "\u2AC0",
            "Supset": "\u22D1",
            "supset": "\u2283",
            "supseteq": "\u2287",
            "supseteqq": "\u2AC6",
            "supsetneq": "\u228B",
            "supsetneqq": "\u2ACC",
            "supsim": "\u2AC8",
            "supsub": "\u2AD4",
            "supsup": "\u2AD6",
            "swarhk": "\u2926",
            "swArr": "\u21D9",
            "swarr": "\u2199",
            "swarrow": "\u2199",
            "swnwar": "\u292A",
            "szlig": "\xDF",
            "Tab": "	",
            "target": "\u2316",
            "Tau": "\u03A4",
            "tau": "\u03C4",
            "tbrk": "\u23B4",
            "Tcaron": "\u0164",
            "tcaron": "\u0165",
            "Tcedil": "\u0162",
            "tcedil": "\u0163",
            "Tcy": "\u0422",
            "tcy": "\u0442",
            "tdot": "\u20DB",
            "telrec": "\u2315",
            "Tfr": "\u{1D517}",
            "tfr": "\u{1D531}",
            "there4": "\u2234",
            "Therefore": "\u2234",
            "therefore": "\u2234",
            "Theta": "\u0398",
            "theta": "\u03B8",
            "thetasym": "\u03D1",
            "thetav": "\u03D1",
            "thickapprox": "\u2248",
            "thicksim": "\u223C",
            "ThickSpace": "\u205F\u200A",
            "thinsp": "\u2009",
            "ThinSpace": "\u2009",
            "thkap": "\u2248",
            "thksim": "\u223C",
            "THORN": "\xDE",
            "thorn": "\xFE",
            "Tilde": "\u223C",
            "tilde": "\u02DC",
            "TildeEqual": "\u2243",
            "TildeFullEqual": "\u2245",
            "TildeTilde": "\u2248",
            "times": "\xD7",
            "timesb": "\u22A0",
            "timesbar": "\u2A31",
            "timesd": "\u2A30",
            "tint": "\u222D",
            "toea": "\u2928",
            "top": "\u22A4",
            "topbot": "\u2336",
            "topcir": "\u2AF1",
            "Topf": "\u{1D54B}",
            "topf": "\u{1D565}",
            "topfork": "\u2ADA",
            "tosa": "\u2929",
            "tprime": "\u2034",
            "TRADE": "\u2122",
            "trade": "\u2122",
            "triangle": "\u25B5",
            "triangledown": "\u25BF",
            "triangleleft": "\u25C3",
            "trianglelefteq": "\u22B4",
            "triangleq": "\u225C",
            "triangleright": "\u25B9",
            "trianglerighteq": "\u22B5",
            "tridot": "\u25EC",
            "trie": "\u225C",
            "triminus": "\u2A3A",
            "TripleDot": "\u20DB",
            "triplus": "\u2A39",
            "trisb": "\u29CD",
            "tritime": "\u2A3B",
            "trpezium": "\u23E2",
            "Tscr": "\u{1D4AF}",
            "tscr": "\u{1D4C9}",
            "TScy": "\u0426",
            "tscy": "\u0446",
            "TSHcy": "\u040B",
            "tshcy": "\u045B",
            "Tstrok": "\u0166",
            "tstrok": "\u0167",
            "twixt": "\u226C",
            "twoheadleftarrow": "\u219E",
            "twoheadrightarrow": "\u21A0",
            "Uacute": "\xDA",
            "uacute": "\xFA",
            "Uarr": "\u219F",
            "uArr": "\u21D1",
            "uarr": "\u2191",
            "Uarrocir": "\u2949",
            "Ubrcy": "\u040E",
            "ubrcy": "\u045E",
            "Ubreve": "\u016C",
            "ubreve": "\u016D",
            "Ucirc": "\xDB",
            "ucirc": "\xFB",
            "Ucy": "\u0423",
            "ucy": "\u0443",
            "udarr": "\u21C5",
            "Udblac": "\u0170",
            "udblac": "\u0171",
            "udhar": "\u296E",
            "ufisht": "\u297E",
            "Ufr": "\u{1D518}",
            "ufr": "\u{1D532}",
            "Ugrave": "\xD9",
            "ugrave": "\xF9",
            "uHar": "\u2963",
            "uharl": "\u21BF",
            "uharr": "\u21BE",
            "uhblk": "\u2580",
            "ulcorn": "\u231C",
            "ulcorner": "\u231C",
            "ulcrop": "\u230F",
            "ultri": "\u25F8",
            "Umacr": "\u016A",
            "umacr": "\u016B",
            "uml": "\xA8",
            "UnderBar": "_",
            "UnderBrace": "\u23DF",
            "UnderBracket": "\u23B5",
            "UnderParenthesis": "\u23DD",
            "Union": "\u22C3",
            "UnionPlus": "\u228E",
            "Uogon": "\u0172",
            "uogon": "\u0173",
            "Uopf": "\u{1D54C}",
            "uopf": "\u{1D566}",
            "UpArrow": "\u2191",
            "Uparrow": "\u21D1",
            "uparrow": "\u2191",
            "UpArrowBar": "\u2912",
            "UpArrowDownArrow": "\u21C5",
            "UpDownArrow": "\u2195",
            "Updownarrow": "\u21D5",
            "updownarrow": "\u2195",
            "UpEquilibrium": "\u296E",
            "upharpoonleft": "\u21BF",
            "upharpoonright": "\u21BE",
            "uplus": "\u228E",
            "UpperLeftArrow": "\u2196",
            "UpperRightArrow": "\u2197",
            "Upsi": "\u03D2",
            "upsi": "\u03C5",
            "upsih": "\u03D2",
            "Upsilon": "\u03A5",
            "upsilon": "\u03C5",
            "UpTee": "\u22A5",
            "UpTeeArrow": "\u21A5",
            "upuparrows": "\u21C8",
            "urcorn": "\u231D",
            "urcorner": "\u231D",
            "urcrop": "\u230E",
            "Uring": "\u016E",
            "uring": "\u016F",
            "urtri": "\u25F9",
            "Uscr": "\u{1D4B0}",
            "uscr": "\u{1D4CA}",
            "utdot": "\u22F0",
            "Utilde": "\u0168",
            "utilde": "\u0169",
            "utri": "\u25B5",
            "utrif": "\u25B4",
            "uuarr": "\u21C8",
            "Uuml": "\xDC",
            "uuml": "\xFC",
            "uwangle": "\u29A7",
            "vangrt": "\u299C",
            "varepsilon": "\u03F5",
            "varkappa": "\u03F0",
            "varnothing": "\u2205",
            "varphi": "\u03D5",
            "varpi": "\u03D6",
            "varpropto": "\u221D",
            "vArr": "\u21D5",
            "varr": "\u2195",
            "varrho": "\u03F1",
            "varsigma": "\u03C2",
            "varsubsetneq": "\u228A\uFE00",
            "varsubsetneqq": "\u2ACB\uFE00",
            "varsupsetneq": "\u228B\uFE00",
            "varsupsetneqq": "\u2ACC\uFE00",
            "vartheta": "\u03D1",
            "vartriangleleft": "\u22B2",
            "vartriangleright": "\u22B3",
            "Vbar": "\u2AEB",
            "vBar": "\u2AE8",
            "vBarv": "\u2AE9",
            "Vcy": "\u0412",
            "vcy": "\u0432",
            "VDash": "\u22AB",
            "Vdash": "\u22A9",
            "vDash": "\u22A8",
            "vdash": "\u22A2",
            "Vdashl": "\u2AE6",
            "Vee": "\u22C1",
            "vee": "\u2228",
            "veebar": "\u22BB",
            "veeeq": "\u225A",
            "vellip": "\u22EE",
            "Verbar": "\u2016",
            "verbar": "|",
            "Vert": "\u2016",
            "vert": "|",
            "VerticalBar": "\u2223",
            "VerticalLine": "|",
            "VerticalSeparator": "\u2758",
            "VerticalTilde": "\u2240",
            "VeryThinSpace": "\u200A",
            "Vfr": "\u{1D519}",
            "vfr": "\u{1D533}",
            "vltri": "\u22B2",
            "vnsub": "\u2282\u20D2",
            "vnsup": "\u2283\u20D2",
            "Vopf": "\u{1D54D}",
            "vopf": "\u{1D567}",
            "vprop": "\u221D",
            "vrtri": "\u22B3",
            "Vscr": "\u{1D4B1}",
            "vscr": "\u{1D4CB}",
            "vsubnE": "\u2ACB\uFE00",
            "vsubne": "\u228A\uFE00",
            "vsupnE": "\u2ACC\uFE00",
            "vsupne": "\u228B\uFE00",
            "Vvdash": "\u22AA",
            "vzigzag": "\u299A",
            "Wcirc": "\u0174",
            "wcirc": "\u0175",
            "wedbar": "\u2A5F",
            "Wedge": "\u22C0",
            "wedge": "\u2227",
            "wedgeq": "\u2259",
            "weierp": "\u2118",
            "Wfr": "\u{1D51A}",
            "wfr": "\u{1D534}",
            "Wopf": "\u{1D54E}",
            "wopf": "\u{1D568}",
            "wp": "\u2118",
            "wr": "\u2240",
            "wreath": "\u2240",
            "Wscr": "\u{1D4B2}",
            "wscr": "\u{1D4CC}",
            "xcap": "\u22C2",
            "xcirc": "\u25EF",
            "xcup": "\u22C3",
            "xdtri": "\u25BD",
            "Xfr": "\u{1D51B}",
            "xfr": "\u{1D535}",
            "xhArr": "\u27FA",
            "xharr": "\u27F7",
            "Xi": "\u039E",
            "xi": "\u03BE",
            "xlArr": "\u27F8",
            "xlarr": "\u27F5",
            "xmap": "\u27FC",
            "xnis": "\u22FB",
            "xodot": "\u2A00",
            "Xopf": "\u{1D54F}",
            "xopf": "\u{1D569}",
            "xoplus": "\u2A01",
            "xotime": "\u2A02",
            "xrArr": "\u27F9",
            "xrarr": "\u27F6",
            "Xscr": "\u{1D4B3}",
            "xscr": "\u{1D4CD}",
            "xsqcup": "\u2A06",
            "xuplus": "\u2A04",
            "xutri": "\u25B3",
            "xvee": "\u22C1",
            "xwedge": "\u22C0",
            "Yacute": "\xDD",
            "yacute": "\xFD",
            "YAcy": "\u042F",
            "yacy": "\u044F",
            "Ycirc": "\u0176",
            "ycirc": "\u0177",
            "Ycy": "\u042B",
            "ycy": "\u044B",
            "yen": "\xA5",
            "Yfr": "\u{1D51C}",
            "yfr": "\u{1D536}",
            "YIcy": "\u0407",
            "yicy": "\u0457",
            "Yopf": "\u{1D550}",
            "yopf": "\u{1D56A}",
            "Yscr": "\u{1D4B4}",
            "yscr": "\u{1D4CE}",
            "YUcy": "\u042E",
            "yucy": "\u044E",
            "Yuml": "\u0178",
            "yuml": "\xFF",
            "Zacute": "\u0179",
            "zacute": "\u017A",
            "Zcaron": "\u017D",
            "zcaron": "\u017E",
            "Zcy": "\u0417",
            "zcy": "\u0437",
            "Zdot": "\u017B",
            "zdot": "\u017C",
            "zeetrf": "\u2128",
            "ZeroWidthSpace": "\u200B",
            "Zeta": "\u0396",
            "zeta": "\u03B6",
            "Zfr": "\u2128",
            "zfr": "\u{1D537}",
            "ZHcy": "\u0416",
            "zhcy": "\u0436",
            "zigrarr": "\u21DD",
            "Zopf": "\u2124",
            "zopf": "\u{1D56B}",
            "Zscr": "\u{1D4B5}",
            "zscr": "\u{1D4CF}",
            "zwj": "\u200D",
            "zwnj": "\u200C"
          };
          exports2.NGSP_UNICODE = "\uE500";
          exports2.NAMED_ENTITIES["ngsp"] = exports2.NGSP_UNICODE;
        }
      });
      var require_html_tags = __commonJS2({
        "node_modules/angular-html-parser/lib/compiler/src/ml_parser/html_tags.js"(exports2) {
          "use strict";
          init_define_process();
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          var tags_1 = require_tags();
          var HtmlTagDefinition = class {
            constructor() {
              let {
                closedByChildren,
                implicitNamespacePrefix,
                contentType = tags_1.TagContentType.PARSABLE_DATA,
                closedByParent = false,
                isVoid = false,
                ignoreFirstLf = false
              } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
              this.closedByChildren = {};
              this.closedByParent = false;
              this.canSelfClose = false;
              if (closedByChildren && closedByChildren.length > 0) {
                closedByChildren.forEach((tagName) => this.closedByChildren[tagName] = true);
              }
              this.isVoid = isVoid;
              this.closedByParent = closedByParent || isVoid;
              this.implicitNamespacePrefix = implicitNamespacePrefix || null;
              this.contentType = contentType;
              this.ignoreFirstLf = ignoreFirstLf;
            }
            isClosedByChild(name) {
              return this.isVoid || name.toLowerCase() in this.closedByChildren;
            }
          };
          exports2.HtmlTagDefinition = HtmlTagDefinition;
          var _DEFAULT_TAG_DEFINITION;
          var TAG_DEFINITIONS;
          function getHtmlTagDefinition(tagName) {
            if (!TAG_DEFINITIONS) {
              _DEFAULT_TAG_DEFINITION = new HtmlTagDefinition();
              TAG_DEFINITIONS = {
                "base": new HtmlTagDefinition({
                  isVoid: true
                }),
                "meta": new HtmlTagDefinition({
                  isVoid: true
                }),
                "area": new HtmlTagDefinition({
                  isVoid: true
                }),
                "embed": new HtmlTagDefinition({
                  isVoid: true
                }),
                "link": new HtmlTagDefinition({
                  isVoid: true
                }),
                "img": new HtmlTagDefinition({
                  isVoid: true
                }),
                "input": new HtmlTagDefinition({
                  isVoid: true
                }),
                "param": new HtmlTagDefinition({
                  isVoid: true
                }),
                "hr": new HtmlTagDefinition({
                  isVoid: true
                }),
                "br": new HtmlTagDefinition({
                  isVoid: true
                }),
                "source": new HtmlTagDefinition({
                  isVoid: true
                }),
                "track": new HtmlTagDefinition({
                  isVoid: true
                }),
                "wbr": new HtmlTagDefinition({
                  isVoid: true
                }),
                "p": new HtmlTagDefinition({
                  closedByChildren: ["address", "article", "aside", "blockquote", "div", "dl", "fieldset", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "main", "nav", "ol", "p", "pre", "section", "table", "ul"],
                  closedByParent: true
                }),
                "thead": new HtmlTagDefinition({
                  closedByChildren: ["tbody", "tfoot"]
                }),
                "tbody": new HtmlTagDefinition({
                  closedByChildren: ["tbody", "tfoot"],
                  closedByParent: true
                }),
                "tfoot": new HtmlTagDefinition({
                  closedByChildren: ["tbody"],
                  closedByParent: true
                }),
                "tr": new HtmlTagDefinition({
                  closedByChildren: ["tr"],
                  closedByParent: true
                }),
                "td": new HtmlTagDefinition({
                  closedByChildren: ["td", "th"],
                  closedByParent: true
                }),
                "th": new HtmlTagDefinition({
                  closedByChildren: ["td", "th"],
                  closedByParent: true
                }),
                "col": new HtmlTagDefinition({
                  isVoid: true
                }),
                "svg": new HtmlTagDefinition({
                  implicitNamespacePrefix: "svg"
                }),
                "math": new HtmlTagDefinition({
                  implicitNamespacePrefix: "math"
                }),
                "li": new HtmlTagDefinition({
                  closedByChildren: ["li"],
                  closedByParent: true
                }),
                "dt": new HtmlTagDefinition({
                  closedByChildren: ["dt", "dd"]
                }),
                "dd": new HtmlTagDefinition({
                  closedByChildren: ["dt", "dd"],
                  closedByParent: true
                }),
                "rb": new HtmlTagDefinition({
                  closedByChildren: ["rb", "rt", "rtc", "rp"],
                  closedByParent: true
                }),
                "rt": new HtmlTagDefinition({
                  closedByChildren: ["rb", "rt", "rtc", "rp"],
                  closedByParent: true
                }),
                "rtc": new HtmlTagDefinition({
                  closedByChildren: ["rb", "rtc", "rp"],
                  closedByParent: true
                }),
                "rp": new HtmlTagDefinition({
                  closedByChildren: ["rb", "rt", "rtc", "rp"],
                  closedByParent: true
                }),
                "optgroup": new HtmlTagDefinition({
                  closedByChildren: ["optgroup"],
                  closedByParent: true
                }),
                "option": new HtmlTagDefinition({
                  closedByChildren: ["option", "optgroup"],
                  closedByParent: true
                }),
                "pre": new HtmlTagDefinition({
                  ignoreFirstLf: true
                }),
                "listing": new HtmlTagDefinition({
                  ignoreFirstLf: true
                }),
                "style": new HtmlTagDefinition({
                  contentType: tags_1.TagContentType.RAW_TEXT
                }),
                "script": new HtmlTagDefinition({
                  contentType: tags_1.TagContentType.RAW_TEXT
                }),
                "title": new HtmlTagDefinition({
                  contentType: tags_1.TagContentType.ESCAPABLE_RAW_TEXT
                }),
                "textarea": new HtmlTagDefinition({
                  contentType: tags_1.TagContentType.ESCAPABLE_RAW_TEXT,
                  ignoreFirstLf: true
                })
              };
            }
            return TAG_DEFINITIONS[tagName] || _DEFAULT_TAG_DEFINITION;
          }
          exports2.getHtmlTagDefinition = getHtmlTagDefinition;
        }
      });
      var require_ast_path = __commonJS2({
        "node_modules/angular-html-parser/lib/compiler/src/ast_path.js"(exports2) {
          "use strict";
          init_define_process();
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          var AstPath = class {
            constructor(path) {
              let position = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : -1;
              this.path = path;
              this.position = position;
            }
            get empty() {
              return !this.path || !this.path.length;
            }
            get head() {
              return this.path[0];
            }
            get tail() {
              return this.path[this.path.length - 1];
            }
            parentOf(node) {
              return node && this.path[this.path.indexOf(node) - 1];
            }
            childOf(node) {
              return this.path[this.path.indexOf(node) + 1];
            }
            first(ctor) {
              for (let i = this.path.length - 1; i >= 0; i--) {
                let item = this.path[i];
                if (item instanceof ctor)
                  return item;
              }
            }
            push(node) {
              this.path.push(node);
            }
            pop() {
              return this.path.pop();
            }
          };
          exports2.AstPath = AstPath;
        }
      });
      var require_ast2 = __commonJS2({
        "node_modules/angular-html-parser/lib/compiler/src/ml_parser/ast.js"(exports2) {
          "use strict";
          init_define_process();
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          var ast_path_1 = require_ast_path();
          var Text = class {
            constructor(value, sourceSpan, i18n) {
              this.value = value;
              this.sourceSpan = sourceSpan;
              this.i18n = i18n;
              this.type = "text";
            }
            visit(visitor, context) {
              return visitor.visitText(this, context);
            }
          };
          exports2.Text = Text;
          var CDATA = class {
            constructor(value, sourceSpan) {
              this.value = value;
              this.sourceSpan = sourceSpan;
              this.type = "cdata";
            }
            visit(visitor, context) {
              return visitor.visitCdata(this, context);
            }
          };
          exports2.CDATA = CDATA;
          var Expansion = class {
            constructor(switchValue, type, cases, sourceSpan, switchValueSourceSpan, i18n) {
              this.switchValue = switchValue;
              this.type = type;
              this.cases = cases;
              this.sourceSpan = sourceSpan;
              this.switchValueSourceSpan = switchValueSourceSpan;
              this.i18n = i18n;
            }
            visit(visitor, context) {
              return visitor.visitExpansion(this, context);
            }
          };
          exports2.Expansion = Expansion;
          var ExpansionCase = class {
            constructor(value, expression, sourceSpan, valueSourceSpan, expSourceSpan) {
              this.value = value;
              this.expression = expression;
              this.sourceSpan = sourceSpan;
              this.valueSourceSpan = valueSourceSpan;
              this.expSourceSpan = expSourceSpan;
            }
            visit(visitor, context) {
              return visitor.visitExpansionCase(this, context);
            }
          };
          exports2.ExpansionCase = ExpansionCase;
          var Attribute = class {
            constructor(name, value, sourceSpan) {
              let valueSpan = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
              let nameSpan = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : null;
              let i18n = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : null;
              this.name = name;
              this.value = value;
              this.sourceSpan = sourceSpan;
              this.valueSpan = valueSpan;
              this.nameSpan = nameSpan;
              this.i18n = i18n;
              this.type = "attribute";
            }
            visit(visitor, context) {
              return visitor.visitAttribute(this, context);
            }
          };
          exports2.Attribute = Attribute;
          var Element = class {
            constructor(name, attrs, children, sourceSpan) {
              let startSourceSpan = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : null;
              let endSourceSpan = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : null;
              let nameSpan = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : null;
              let i18n = arguments.length > 7 && arguments[7] !== void 0 ? arguments[7] : null;
              this.name = name;
              this.attrs = attrs;
              this.children = children;
              this.sourceSpan = sourceSpan;
              this.startSourceSpan = startSourceSpan;
              this.endSourceSpan = endSourceSpan;
              this.nameSpan = nameSpan;
              this.i18n = i18n;
              this.type = "element";
            }
            visit(visitor, context) {
              return visitor.visitElement(this, context);
            }
          };
          exports2.Element = Element;
          var Comment = class {
            constructor(value, sourceSpan) {
              this.value = value;
              this.sourceSpan = sourceSpan;
              this.type = "comment";
            }
            visit(visitor, context) {
              return visitor.visitComment(this, context);
            }
          };
          exports2.Comment = Comment;
          var DocType = class {
            constructor(value, sourceSpan) {
              this.value = value;
              this.sourceSpan = sourceSpan;
              this.type = "docType";
            }
            visit(visitor, context) {
              return visitor.visitDocType(this, context);
            }
          };
          exports2.DocType = DocType;
          function visitAll(visitor, nodes) {
            let context = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
            const result = [];
            const visit = visitor.visit ? (ast) => visitor.visit(ast, context) || ast.visit(visitor, context) : (ast) => ast.visit(visitor, context);
            nodes.forEach((ast) => {
              const astResult = visit(ast);
              if (astResult) {
                result.push(astResult);
              }
            });
            return result;
          }
          exports2.visitAll = visitAll;
          var RecursiveVisitor = class {
            constructor() {
            }
            visitElement(ast, context) {
              this.visitChildren(context, (visit) => {
                visit(ast.attrs);
                visit(ast.children);
              });
            }
            visitAttribute(ast, context) {
            }
            visitText(ast, context) {
            }
            visitCdata(ast, context) {
            }
            visitComment(ast, context) {
            }
            visitDocType(ast, context) {
            }
            visitExpansion(ast, context) {
              return this.visitChildren(context, (visit) => {
                visit(ast.cases);
              });
            }
            visitExpansionCase(ast, context) {
            }
            visitChildren(context, cb) {
              let results = [];
              let t = this;
              function visit(children) {
                if (children)
                  results.push(visitAll(t, children, context));
              }
              cb(visit);
              return Array.prototype.concat.apply([], results);
            }
          };
          exports2.RecursiveVisitor = RecursiveVisitor;
          function spanOf(ast) {
            const start = ast.sourceSpan.start.offset;
            let end = ast.sourceSpan.end.offset;
            if (ast instanceof Element) {
              if (ast.endSourceSpan) {
                end = ast.endSourceSpan.end.offset;
              } else if (ast.children && ast.children.length) {
                end = spanOf(ast.children[ast.children.length - 1]).end;
              }
            }
            return {
              start,
              end
            };
          }
          function findNode(nodes, position) {
            const path = [];
            const visitor = new class extends RecursiveVisitor {
              visit(ast, context) {
                const span = spanOf(ast);
                if (span.start <= position && position < span.end) {
                  path.push(ast);
                } else {
                  return true;
                }
              }
            }();
            visitAll(visitor, nodes);
            return new ast_path_1.AstPath(path, position);
          }
          exports2.findNode = findNode;
        }
      });
      var require_assertions = __commonJS2({
        "node_modules/angular-html-parser/lib/compiler/src/assertions.js"(exports2) {
          "use strict";
          init_define_process();
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          function assertArrayOfStrings(identifier, value) {
            if (value == null) {
              return;
            }
            if (!Array.isArray(value)) {
              throw new Error(`Expected '${identifier}' to be an array of strings.`);
            }
            for (let i = 0; i < value.length; i += 1) {
              if (typeof value[i] !== "string") {
                throw new Error(`Expected '${identifier}' to be an array of strings.`);
              }
            }
          }
          exports2.assertArrayOfStrings = assertArrayOfStrings;
          var UNUSABLE_INTERPOLATION_REGEXPS = [/^\s*$/, /[<>]/, /^[{}]$/, /&(#|[a-z])/i, /^\/\//];
          function assertInterpolationSymbols(identifier, value) {
            if (value != null && !(Array.isArray(value) && value.length == 2)) {
              throw new Error(`Expected '${identifier}' to be an array, [start, end].`);
            } else if (value != null) {
              const start = value[0];
              const end = value[1];
              UNUSABLE_INTERPOLATION_REGEXPS.forEach((regexp) => {
                if (regexp.test(start) || regexp.test(end)) {
                  throw new Error(`['${start}', '${end}'] contains unusable interpolation symbol.`);
                }
              });
            }
          }
          exports2.assertInterpolationSymbols = assertInterpolationSymbols;
        }
      });
      var require_interpolation_config = __commonJS2({
        "node_modules/angular-html-parser/lib/compiler/src/ml_parser/interpolation_config.js"(exports2) {
          "use strict";
          init_define_process();
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          var assertions_1 = require_assertions();
          var InterpolationConfig = class {
            constructor(start, end) {
              this.start = start;
              this.end = end;
            }
            static fromArray(markers) {
              if (!markers) {
                return exports2.DEFAULT_INTERPOLATION_CONFIG;
              }
              assertions_1.assertInterpolationSymbols("interpolation", markers);
              return new InterpolationConfig(markers[0], markers[1]);
            }
          };
          exports2.InterpolationConfig = InterpolationConfig;
          exports2.DEFAULT_INTERPOLATION_CONFIG = new InterpolationConfig("{{", "}}");
        }
      });
      var require_lexer = __commonJS2({
        "node_modules/angular-html-parser/lib/compiler/src/ml_parser/lexer.js"(exports2) {
          "use strict";
          init_define_process();
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          var chars = require_chars();
          var parse_util_1 = require_parse_util();
          var interpolation_config_1 = require_interpolation_config();
          var tags_1 = require_tags();
          var TokenType;
          (function(TokenType2) {
            TokenType2[TokenType2["TAG_OPEN_START"] = 0] = "TAG_OPEN_START";
            TokenType2[TokenType2["TAG_OPEN_END"] = 1] = "TAG_OPEN_END";
            TokenType2[TokenType2["TAG_OPEN_END_VOID"] = 2] = "TAG_OPEN_END_VOID";
            TokenType2[TokenType2["TAG_CLOSE"] = 3] = "TAG_CLOSE";
            TokenType2[TokenType2["TEXT"] = 4] = "TEXT";
            TokenType2[TokenType2["ESCAPABLE_RAW_TEXT"] = 5] = "ESCAPABLE_RAW_TEXT";
            TokenType2[TokenType2["RAW_TEXT"] = 6] = "RAW_TEXT";
            TokenType2[TokenType2["COMMENT_START"] = 7] = "COMMENT_START";
            TokenType2[TokenType2["COMMENT_END"] = 8] = "COMMENT_END";
            TokenType2[TokenType2["CDATA_START"] = 9] = "CDATA_START";
            TokenType2[TokenType2["CDATA_END"] = 10] = "CDATA_END";
            TokenType2[TokenType2["ATTR_NAME"] = 11] = "ATTR_NAME";
            TokenType2[TokenType2["ATTR_QUOTE"] = 12] = "ATTR_QUOTE";
            TokenType2[TokenType2["ATTR_VALUE"] = 13] = "ATTR_VALUE";
            TokenType2[TokenType2["DOC_TYPE_START"] = 14] = "DOC_TYPE_START";
            TokenType2[TokenType2["DOC_TYPE_END"] = 15] = "DOC_TYPE_END";
            TokenType2[TokenType2["EXPANSION_FORM_START"] = 16] = "EXPANSION_FORM_START";
            TokenType2[TokenType2["EXPANSION_CASE_VALUE"] = 17] = "EXPANSION_CASE_VALUE";
            TokenType2[TokenType2["EXPANSION_CASE_EXP_START"] = 18] = "EXPANSION_CASE_EXP_START";
            TokenType2[TokenType2["EXPANSION_CASE_EXP_END"] = 19] = "EXPANSION_CASE_EXP_END";
            TokenType2[TokenType2["EXPANSION_FORM_END"] = 20] = "EXPANSION_FORM_END";
            TokenType2[TokenType2["EOF"] = 21] = "EOF";
          })(TokenType = exports2.TokenType || (exports2.TokenType = {}));
          var Token = class {
            constructor(type, parts, sourceSpan) {
              this.type = type;
              this.parts = parts;
              this.sourceSpan = sourceSpan;
            }
          };
          exports2.Token = Token;
          var TokenError = class extends parse_util_1.ParseError {
            constructor(errorMsg, tokenType, span) {
              super(span, errorMsg);
              this.tokenType = tokenType;
            }
          };
          exports2.TokenError = TokenError;
          var TokenizeResult = class {
            constructor(tokens, errors) {
              this.tokens = tokens;
              this.errors = errors;
            }
          };
          exports2.TokenizeResult = TokenizeResult;
          function tokenize(source, url, getTagContentType) {
            let options = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
            return new _Tokenizer(new parse_util_1.ParseSourceFile(source, url), getTagContentType, options).tokenize();
          }
          exports2.tokenize = tokenize;
          var _CR_OR_CRLF_REGEXP = /\r\n?/g;
          function _unexpectedCharacterErrorMsg(charCode) {
            const char = charCode === chars.$EOF ? "EOF" : String.fromCharCode(charCode);
            return `Unexpected character "${char}"`;
          }
          function _unknownEntityErrorMsg(entitySrc) {
            return `Unknown entity "${entitySrc}" - use the "&#<decimal>;" or  "&#x<hex>;" syntax`;
          }
          var _ControlFlowError = class {
            constructor(error) {
              this.error = error;
            }
          };
          var _Tokenizer = class {
            constructor(_file, _getTagContentType, options) {
              this._getTagContentType = _getTagContentType;
              this._currentTokenStart = null;
              this._currentTokenType = null;
              this._expansionCaseStack = [];
              this._inInterpolation = false;
              this._fullNameStack = [];
              this.tokens = [];
              this.errors = [];
              this._tokenizeIcu = options.tokenizeExpansionForms || false;
              this._interpolationConfig = options.interpolationConfig || interpolation_config_1.DEFAULT_INTERPOLATION_CONFIG;
              this._leadingTriviaCodePoints = options.leadingTriviaChars && options.leadingTriviaChars.map((c) => c.codePointAt(0) || 0);
              this._canSelfClose = options.canSelfClose || false;
              this._allowHtmComponentClosingTags = options.allowHtmComponentClosingTags || false;
              const range = options.range || {
                endPos: _file.content.length,
                startPos: 0,
                startLine: 0,
                startCol: 0
              };
              this._cursor = options.escapedString ? new EscapedCharacterCursor(_file, range) : new PlainCharacterCursor(_file, range);
              try {
                this._cursor.init();
              } catch (e) {
                this.handleError(e);
              }
            }
            _processCarriageReturns(content) {
              return content.replace(_CR_OR_CRLF_REGEXP, "\n");
            }
            tokenize() {
              while (this._cursor.peek() !== chars.$EOF) {
                const start = this._cursor.clone();
                try {
                  if (this._attemptCharCode(chars.$LT)) {
                    if (this._attemptCharCode(chars.$BANG)) {
                      if (this._attemptStr("[CDATA[")) {
                        this._consumeCdata(start);
                      } else if (this._attemptStr("--")) {
                        this._consumeComment(start);
                      } else if (this._attemptStrCaseInsensitive("doctype")) {
                        this._consumeDocType(start);
                      } else {
                        this._consumeBogusComment(start);
                      }
                    } else if (this._attemptCharCode(chars.$SLASH)) {
                      this._consumeTagClose(start);
                    } else {
                      const savedPos = this._cursor.clone();
                      if (this._attemptCharCode(chars.$QUESTION)) {
                        this._cursor = savedPos;
                        this._consumeBogusComment(start);
                      } else {
                        this._consumeTagOpen(start);
                      }
                    }
                  } else if (!(this._tokenizeIcu && this._tokenizeExpansionForm())) {
                    this._consumeText();
                  }
                } catch (e) {
                  this.handleError(e);
                }
              }
              this._beginToken(TokenType.EOF);
              this._endToken([]);
              return new TokenizeResult(mergeTextTokens(this.tokens), this.errors);
            }
            _tokenizeExpansionForm() {
              if (this.isExpansionFormStart()) {
                this._consumeExpansionFormStart();
                return true;
              }
              if (isExpansionCaseStart(this._cursor.peek()) && this._isInExpansionForm()) {
                this._consumeExpansionCaseStart();
                return true;
              }
              if (this._cursor.peek() === chars.$RBRACE) {
                if (this._isInExpansionCase()) {
                  this._consumeExpansionCaseEnd();
                  return true;
                }
                if (this._isInExpansionForm()) {
                  this._consumeExpansionFormEnd();
                  return true;
                }
              }
              return false;
            }
            _beginToken(type) {
              let start = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this._cursor.clone();
              this._currentTokenStart = start;
              this._currentTokenType = type;
            }
            _endToken(parts) {
              let end = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this._cursor.clone();
              if (this._currentTokenStart === null) {
                throw new TokenError("Programming error - attempted to end a token when there was no start to the token", this._currentTokenType, this._cursor.getSpan(end));
              }
              if (this._currentTokenType === null) {
                throw new TokenError("Programming error - attempted to end a token which has no token type", null, this._cursor.getSpan(this._currentTokenStart));
              }
              const token = new Token(this._currentTokenType, parts, this._cursor.getSpan(this._currentTokenStart, this._leadingTriviaCodePoints));
              this.tokens.push(token);
              this._currentTokenStart = null;
              this._currentTokenType = null;
              return token;
            }
            _createError(msg, span) {
              if (this._isInExpansionForm()) {
                msg += ` (Do you have an unescaped "{" in your template? Use "{{ '{' }}") to escape it.)`;
              }
              const error = new TokenError(msg, this._currentTokenType, span);
              this._currentTokenStart = null;
              this._currentTokenType = null;
              return new _ControlFlowError(error);
            }
            handleError(e) {
              if (e instanceof CursorError) {
                e = this._createError(e.msg, this._cursor.getSpan(e.cursor));
              }
              if (e instanceof _ControlFlowError) {
                this.errors.push(e.error);
              } else {
                throw e;
              }
            }
            _attemptCharCode(charCode) {
              if (this._cursor.peek() === charCode) {
                this._cursor.advance();
                return true;
              }
              return false;
            }
            _attemptCharCodeCaseInsensitive(charCode) {
              if (compareCharCodeCaseInsensitive(this._cursor.peek(), charCode)) {
                this._cursor.advance();
                return true;
              }
              return false;
            }
            _requireCharCode(charCode) {
              const location = this._cursor.clone();
              if (!this._attemptCharCode(charCode)) {
                throw this._createError(_unexpectedCharacterErrorMsg(this._cursor.peek()), this._cursor.getSpan(location));
              }
            }
            _attemptStr(chars2) {
              const len = chars2.length;
              if (this._cursor.charsLeft() < len) {
                return false;
              }
              const initialPosition = this._cursor.clone();
              for (let i = 0; i < len; i++) {
                if (!this._attemptCharCode(chars2.charCodeAt(i))) {
                  this._cursor = initialPosition;
                  return false;
                }
              }
              return true;
            }
            _attemptStrCaseInsensitive(chars2) {
              for (let i = 0; i < chars2.length; i++) {
                if (!this._attemptCharCodeCaseInsensitive(chars2.charCodeAt(i))) {
                  return false;
                }
              }
              return true;
            }
            _requireStr(chars2) {
              const location = this._cursor.clone();
              if (!this._attemptStr(chars2)) {
                throw this._createError(_unexpectedCharacterErrorMsg(this._cursor.peek()), this._cursor.getSpan(location));
              }
            }
            _requireStrCaseInsensitive(chars2) {
              const location = this._cursor.clone();
              if (!this._attemptStrCaseInsensitive(chars2)) {
                throw this._createError(_unexpectedCharacterErrorMsg(this._cursor.peek()), this._cursor.getSpan(location));
              }
            }
            _attemptCharCodeUntilFn(predicate) {
              while (!predicate(this._cursor.peek())) {
                this._cursor.advance();
              }
            }
            _requireCharCodeUntilFn(predicate, len) {
              const start = this._cursor.clone();
              this._attemptCharCodeUntilFn(predicate);
              const end = this._cursor.clone();
              if (end.diff(start) < len) {
                throw this._createError(_unexpectedCharacterErrorMsg(this._cursor.peek()), this._cursor.getSpan(start));
              }
            }
            _attemptUntilChar(char) {
              while (this._cursor.peek() !== char) {
                this._cursor.advance();
              }
            }
            _readChar(decodeEntities) {
              if (decodeEntities && this._cursor.peek() === chars.$AMPERSAND) {
                return this._decodeEntity();
              } else {
                const char = String.fromCodePoint(this._cursor.peek());
                this._cursor.advance();
                return char;
              }
            }
            _decodeEntity() {
              const start = this._cursor.clone();
              this._cursor.advance();
              if (this._attemptCharCode(chars.$HASH)) {
                const isHex = this._attemptCharCode(chars.$x) || this._attemptCharCode(chars.$X);
                const codeStart = this._cursor.clone();
                this._attemptCharCodeUntilFn(isDigitEntityEnd);
                if (this._cursor.peek() != chars.$SEMICOLON) {
                  throw this._createError(_unexpectedCharacterErrorMsg(this._cursor.peek()), this._cursor.getSpan());
                }
                const strNum = this._cursor.getChars(codeStart);
                this._cursor.advance();
                try {
                  const charCode = parseInt(strNum, isHex ? 16 : 10);
                  return String.fromCharCode(charCode);
                } catch (_a) {
                  throw this._createError(_unknownEntityErrorMsg(this._cursor.getChars(start)), this._cursor.getSpan());
                }
              } else {
                const nameStart = this._cursor.clone();
                this._attemptCharCodeUntilFn(isNamedEntityEnd);
                if (this._cursor.peek() != chars.$SEMICOLON) {
                  this._cursor = nameStart;
                  return "&";
                }
                const name = this._cursor.getChars(nameStart);
                this._cursor.advance();
                const char = tags_1.NAMED_ENTITIES[name];
                if (!char) {
                  throw this._createError(_unknownEntityErrorMsg(name), this._cursor.getSpan(start));
                }
                return char;
              }
            }
            _consumeRawText(decodeEntities, endMarkerPredicate) {
              this._beginToken(decodeEntities ? TokenType.ESCAPABLE_RAW_TEXT : TokenType.RAW_TEXT);
              const parts = [];
              while (true) {
                const tagCloseStart = this._cursor.clone();
                const foundEndMarker = endMarkerPredicate();
                this._cursor = tagCloseStart;
                if (foundEndMarker) {
                  break;
                }
                parts.push(this._readChar(decodeEntities));
              }
              return this._endToken([this._processCarriageReturns(parts.join(""))]);
            }
            _consumeComment(start) {
              this._beginToken(TokenType.COMMENT_START, start);
              this._endToken([]);
              this._consumeRawText(false, () => this._attemptStr("-->"));
              this._beginToken(TokenType.COMMENT_END);
              this._requireStr("-->");
              this._endToken([]);
            }
            _consumeBogusComment(start) {
              this._beginToken(TokenType.COMMENT_START, start);
              this._endToken([]);
              this._consumeRawText(false, () => this._cursor.peek() === chars.$GT);
              this._beginToken(TokenType.COMMENT_END);
              this._cursor.advance();
              this._endToken([]);
            }
            _consumeCdata(start) {
              this._beginToken(TokenType.CDATA_START, start);
              this._endToken([]);
              this._consumeRawText(false, () => this._attemptStr("]]>"));
              this._beginToken(TokenType.CDATA_END);
              this._requireStr("]]>");
              this._endToken([]);
            }
            _consumeDocType(start) {
              this._beginToken(TokenType.DOC_TYPE_START, start);
              this._endToken([]);
              this._consumeRawText(false, () => this._cursor.peek() === chars.$GT);
              this._beginToken(TokenType.DOC_TYPE_END);
              this._cursor.advance();
              this._endToken([]);
            }
            _consumePrefixAndName() {
              const nameOrPrefixStart = this._cursor.clone();
              let prefix = "";
              while (this._cursor.peek() !== chars.$COLON && !isPrefixEnd(this._cursor.peek())) {
                this._cursor.advance();
              }
              let nameStart;
              if (this._cursor.peek() === chars.$COLON) {
                prefix = this._cursor.getChars(nameOrPrefixStart);
                this._cursor.advance();
                nameStart = this._cursor.clone();
              } else {
                nameStart = nameOrPrefixStart;
              }
              this._requireCharCodeUntilFn(isNameEnd, prefix === "" ? 0 : 1);
              const name = this._cursor.getChars(nameStart);
              return [prefix, name];
            }
            _consumeTagOpen(start) {
              let tagName;
              let prefix;
              let openTagToken;
              let tokensBeforeTagOpen = this.tokens.length;
              const innerStart = this._cursor.clone();
              const attrs = [];
              try {
                if (!chars.isAsciiLetter(this._cursor.peek())) {
                  throw this._createError(_unexpectedCharacterErrorMsg(this._cursor.peek()), this._cursor.getSpan(start));
                }
                openTagToken = this._consumeTagOpenStart(start);
                prefix = openTagToken.parts[0];
                tagName = openTagToken.parts[1];
                this._attemptCharCodeUntilFn(isNotWhitespace);
                while (this._cursor.peek() !== chars.$SLASH && this._cursor.peek() !== chars.$GT) {
                  const [prefix2, name] = this._consumeAttributeName();
                  this._attemptCharCodeUntilFn(isNotWhitespace);
                  if (this._attemptCharCode(chars.$EQ)) {
                    this._attemptCharCodeUntilFn(isNotWhitespace);
                    const value = this._consumeAttributeValue();
                    attrs.push({
                      prefix: prefix2,
                      name,
                      value
                    });
                  } else {
                    attrs.push({
                      prefix: prefix2,
                      name
                    });
                  }
                  this._attemptCharCodeUntilFn(isNotWhitespace);
                }
                this._consumeTagOpenEnd();
              } catch (e) {
                if (e instanceof _ControlFlowError) {
                  this._cursor = innerStart;
                  if (openTagToken) {
                    this.tokens.length = tokensBeforeTagOpen;
                  }
                  this._beginToken(TokenType.TEXT, start);
                  this._endToken(["<"]);
                  return;
                }
                throw e;
              }
              if (this._canSelfClose && this.tokens[this.tokens.length - 1].type === TokenType.TAG_OPEN_END_VOID) {
                return;
              }
              const contentTokenType = this._getTagContentType(tagName, prefix, this._fullNameStack.length > 0, attrs);
              this._handleFullNameStackForTagOpen(prefix, tagName);
              if (contentTokenType === tags_1.TagContentType.RAW_TEXT) {
                this._consumeRawTextWithTagClose(prefix, tagName, false);
              } else if (contentTokenType === tags_1.TagContentType.ESCAPABLE_RAW_TEXT) {
                this._consumeRawTextWithTagClose(prefix, tagName, true);
              }
            }
            _consumeRawTextWithTagClose(prefix, tagName, decodeEntities) {
              const textToken = this._consumeRawText(decodeEntities, () => {
                if (!this._attemptCharCode(chars.$LT))
                  return false;
                if (!this._attemptCharCode(chars.$SLASH))
                  return false;
                this._attemptCharCodeUntilFn(isNotWhitespace);
                if (!this._attemptStrCaseInsensitive(prefix ? `${prefix}:${tagName}` : tagName))
                  return false;
                this._attemptCharCodeUntilFn(isNotWhitespace);
                return this._attemptCharCode(chars.$GT);
              });
              this._beginToken(TokenType.TAG_CLOSE);
              this._requireCharCodeUntilFn((code) => code === chars.$GT, 3);
              this._cursor.advance();
              this._endToken([prefix, tagName]);
              this._handleFullNameStackForTagClose(prefix, tagName);
            }
            _consumeTagOpenStart(start) {
              this._beginToken(TokenType.TAG_OPEN_START, start);
              const parts = this._consumePrefixAndName();
              return this._endToken(parts);
            }
            _consumeAttributeName() {
              const attrNameStart = this._cursor.peek();
              if (attrNameStart === chars.$SQ || attrNameStart === chars.$DQ) {
                throw this._createError(_unexpectedCharacterErrorMsg(attrNameStart), this._cursor.getSpan());
              }
              this._beginToken(TokenType.ATTR_NAME);
              const prefixAndName = this._consumePrefixAndName();
              this._endToken(prefixAndName);
              return prefixAndName;
            }
            _consumeAttributeValue() {
              let value;
              if (this._cursor.peek() === chars.$SQ || this._cursor.peek() === chars.$DQ) {
                this._beginToken(TokenType.ATTR_QUOTE);
                const quoteChar = this._cursor.peek();
                this._cursor.advance();
                this._endToken([String.fromCodePoint(quoteChar)]);
                this._beginToken(TokenType.ATTR_VALUE);
                const parts = [];
                while (this._cursor.peek() !== quoteChar) {
                  parts.push(this._readChar(true));
                }
                value = this._processCarriageReturns(parts.join(""));
                this._endToken([value]);
                this._beginToken(TokenType.ATTR_QUOTE);
                this._cursor.advance();
                this._endToken([String.fromCodePoint(quoteChar)]);
              } else {
                this._beginToken(TokenType.ATTR_VALUE);
                const valueStart = this._cursor.clone();
                this._requireCharCodeUntilFn(isNameEnd, 1);
                value = this._processCarriageReturns(this._cursor.getChars(valueStart));
                this._endToken([value]);
              }
              return value;
            }
            _consumeTagOpenEnd() {
              const tokenType = this._attemptCharCode(chars.$SLASH) ? TokenType.TAG_OPEN_END_VOID : TokenType.TAG_OPEN_END;
              this._beginToken(tokenType);
              this._requireCharCode(chars.$GT);
              this._endToken([]);
            }
            _consumeTagClose(start) {
              this._beginToken(TokenType.TAG_CLOSE, start);
              this._attemptCharCodeUntilFn(isNotWhitespace);
              if (this._allowHtmComponentClosingTags && this._attemptCharCode(chars.$SLASH)) {
                this._attemptCharCodeUntilFn(isNotWhitespace);
                this._requireCharCode(chars.$GT);
                this._endToken([]);
              } else {
                const [prefix, name] = this._consumePrefixAndName();
                this._attemptCharCodeUntilFn(isNotWhitespace);
                this._requireCharCode(chars.$GT);
                this._endToken([prefix, name]);
                this._handleFullNameStackForTagClose(prefix, name);
              }
            }
            _consumeExpansionFormStart() {
              this._beginToken(TokenType.EXPANSION_FORM_START);
              this._requireCharCode(chars.$LBRACE);
              this._endToken([]);
              this._expansionCaseStack.push(TokenType.EXPANSION_FORM_START);
              this._beginToken(TokenType.RAW_TEXT);
              const condition = this._readUntil(chars.$COMMA);
              this._endToken([condition]);
              this._requireCharCode(chars.$COMMA);
              this._attemptCharCodeUntilFn(isNotWhitespace);
              this._beginToken(TokenType.RAW_TEXT);
              const type = this._readUntil(chars.$COMMA);
              this._endToken([type]);
              this._requireCharCode(chars.$COMMA);
              this._attemptCharCodeUntilFn(isNotWhitespace);
            }
            _consumeExpansionCaseStart() {
              this._beginToken(TokenType.EXPANSION_CASE_VALUE);
              const value = this._readUntil(chars.$LBRACE).trim();
              this._endToken([value]);
              this._attemptCharCodeUntilFn(isNotWhitespace);
              this._beginToken(TokenType.EXPANSION_CASE_EXP_START);
              this._requireCharCode(chars.$LBRACE);
              this._endToken([]);
              this._attemptCharCodeUntilFn(isNotWhitespace);
              this._expansionCaseStack.push(TokenType.EXPANSION_CASE_EXP_START);
            }
            _consumeExpansionCaseEnd() {
              this._beginToken(TokenType.EXPANSION_CASE_EXP_END);
              this._requireCharCode(chars.$RBRACE);
              this._endToken([]);
              this._attemptCharCodeUntilFn(isNotWhitespace);
              this._expansionCaseStack.pop();
            }
            _consumeExpansionFormEnd() {
              this._beginToken(TokenType.EXPANSION_FORM_END);
              this._requireCharCode(chars.$RBRACE);
              this._endToken([]);
              this._expansionCaseStack.pop();
            }
            _consumeText() {
              const start = this._cursor.clone();
              this._beginToken(TokenType.TEXT, start);
              const parts = [];
              do {
                if (this._interpolationConfig && this._attemptStr(this._interpolationConfig.start)) {
                  parts.push(this._interpolationConfig.start);
                  this._inInterpolation = true;
                } else if (this._interpolationConfig && this._inInterpolation && this._attemptStr(this._interpolationConfig.end)) {
                  parts.push(this._interpolationConfig.end);
                  this._inInterpolation = false;
                } else {
                  parts.push(this._readChar(true));
                }
              } while (!this._isTextEnd());
              this._endToken([this._processCarriageReturns(parts.join(""))]);
            }
            _isTextEnd() {
              if (this._cursor.peek() === chars.$LT || this._cursor.peek() === chars.$EOF) {
                return true;
              }
              if (this._tokenizeIcu && !this._inInterpolation) {
                if (this.isExpansionFormStart()) {
                  return true;
                }
                if (this._cursor.peek() === chars.$RBRACE && this._isInExpansionCase()) {
                  return true;
                }
              }
              return false;
            }
            _readUntil(char) {
              const start = this._cursor.clone();
              this._attemptUntilChar(char);
              return this._cursor.getChars(start);
            }
            _isInExpansionCase() {
              return this._expansionCaseStack.length > 0 && this._expansionCaseStack[this._expansionCaseStack.length - 1] === TokenType.EXPANSION_CASE_EXP_START;
            }
            _isInExpansionForm() {
              return this._expansionCaseStack.length > 0 && this._expansionCaseStack[this._expansionCaseStack.length - 1] === TokenType.EXPANSION_FORM_START;
            }
            isExpansionFormStart() {
              if (this._cursor.peek() !== chars.$LBRACE) {
                return false;
              }
              if (this._interpolationConfig) {
                const start = this._cursor.clone();
                const isInterpolation = this._attemptStr(this._interpolationConfig.start);
                this._cursor = start;
                return !isInterpolation;
              }
              return true;
            }
            _handleFullNameStackForTagOpen(prefix, tagName) {
              const fullName = tags_1.mergeNsAndName(prefix, tagName);
              if (this._fullNameStack.length === 0 || this._fullNameStack[this._fullNameStack.length - 1] === fullName) {
                this._fullNameStack.push(fullName);
              }
            }
            _handleFullNameStackForTagClose(prefix, tagName) {
              const fullName = tags_1.mergeNsAndName(prefix, tagName);
              if (this._fullNameStack.length !== 0 && this._fullNameStack[this._fullNameStack.length - 1] === fullName) {
                this._fullNameStack.pop();
              }
            }
          };
          function isNotWhitespace(code) {
            return !chars.isWhitespace(code) || code === chars.$EOF;
          }
          function isNameEnd(code) {
            return chars.isWhitespace(code) || code === chars.$GT || code === chars.$SLASH || code === chars.$SQ || code === chars.$DQ || code === chars.$EQ;
          }
          function isPrefixEnd(code) {
            return (code < chars.$a || chars.$z < code) && (code < chars.$A || chars.$Z < code) && (code < chars.$0 || code > chars.$9);
          }
          function isDigitEntityEnd(code) {
            return code == chars.$SEMICOLON || code == chars.$EOF || !chars.isAsciiHexDigit(code);
          }
          function isNamedEntityEnd(code) {
            return code == chars.$SEMICOLON || code == chars.$EOF || !chars.isAsciiLetter(code);
          }
          function isExpansionCaseStart(peek) {
            return peek === chars.$EQ || chars.isAsciiLetter(peek) || chars.isDigit(peek);
          }
          function compareCharCodeCaseInsensitive(code1, code2) {
            return toUpperCaseCharCode(code1) == toUpperCaseCharCode(code2);
          }
          function toUpperCaseCharCode(code) {
            return code >= chars.$a && code <= chars.$z ? code - chars.$a + chars.$A : code;
          }
          function mergeTextTokens(srcTokens) {
            const dstTokens = [];
            let lastDstToken = void 0;
            for (let i = 0; i < srcTokens.length; i++) {
              const token = srcTokens[i];
              if (lastDstToken && lastDstToken.type == TokenType.TEXT && token.type == TokenType.TEXT) {
                lastDstToken.parts[0] += token.parts[0];
                lastDstToken.sourceSpan.end = token.sourceSpan.end;
              } else {
                lastDstToken = token;
                dstTokens.push(lastDstToken);
              }
            }
            return dstTokens;
          }
          var PlainCharacterCursor = class {
            constructor(fileOrCursor, range) {
              if (fileOrCursor instanceof PlainCharacterCursor) {
                this.file = fileOrCursor.file;
                this.input = fileOrCursor.input;
                this.end = fileOrCursor.end;
                this.state = Object.assign({}, fileOrCursor.state);
              } else {
                if (!range) {
                  throw new Error("Programming error: the range argument must be provided with a file argument.");
                }
                this.file = fileOrCursor;
                this.input = fileOrCursor.content;
                this.end = range.endPos;
                this.state = {
                  peek: -1,
                  offset: range.startPos,
                  line: range.startLine,
                  column: range.startCol
                };
              }
            }
            clone() {
              return new PlainCharacterCursor(this);
            }
            peek() {
              return this.state.peek;
            }
            charsLeft() {
              return this.end - this.state.offset;
            }
            diff(other) {
              return this.state.offset - other.state.offset;
            }
            advance() {
              this.advanceState(this.state);
            }
            init() {
              this.updatePeek(this.state);
            }
            getSpan(start, leadingTriviaCodePoints) {
              start = start || this;
              if (leadingTriviaCodePoints) {
                start = start.clone();
                while (this.diff(start) > 0 && leadingTriviaCodePoints.indexOf(start.peek()) !== -1) {
                  start.advance();
                }
              }
              return new parse_util_1.ParseSourceSpan(new parse_util_1.ParseLocation(start.file, start.state.offset, start.state.line, start.state.column), new parse_util_1.ParseLocation(this.file, this.state.offset, this.state.line, this.state.column));
            }
            getChars(start) {
              return this.input.substring(start.state.offset, this.state.offset);
            }
            charAt(pos) {
              return this.input.charCodeAt(pos);
            }
            advanceState(state) {
              if (state.offset >= this.end) {
                this.state = state;
                throw new CursorError('Unexpected character "EOF"', this);
              }
              const currentChar = this.charAt(state.offset);
              if (currentChar === chars.$LF) {
                state.line++;
                state.column = 0;
              } else if (!chars.isNewLine(currentChar)) {
                state.column++;
              }
              state.offset++;
              this.updatePeek(state);
            }
            updatePeek(state) {
              state.peek = state.offset >= this.end ? chars.$EOF : this.charAt(state.offset);
            }
          };
          var EscapedCharacterCursor = class extends PlainCharacterCursor {
            constructor(fileOrCursor, range) {
              if (fileOrCursor instanceof EscapedCharacterCursor) {
                super(fileOrCursor);
                this.internalState = Object.assign({}, fileOrCursor.internalState);
              } else {
                super(fileOrCursor, range);
                this.internalState = this.state;
              }
            }
            advance() {
              this.state = this.internalState;
              super.advance();
              this.processEscapeSequence();
            }
            init() {
              super.init();
              this.processEscapeSequence();
            }
            clone() {
              return new EscapedCharacterCursor(this);
            }
            getChars(start) {
              const cursor = start.clone();
              let chars2 = "";
              while (cursor.internalState.offset < this.internalState.offset) {
                chars2 += String.fromCodePoint(cursor.peek());
                cursor.advance();
              }
              return chars2;
            }
            processEscapeSequence() {
              const peek = () => this.internalState.peek;
              if (peek() === chars.$BACKSLASH) {
                this.internalState = Object.assign({}, this.state);
                this.advanceState(this.internalState);
                if (peek() === chars.$n) {
                  this.state.peek = chars.$LF;
                } else if (peek() === chars.$r) {
                  this.state.peek = chars.$CR;
                } else if (peek() === chars.$v) {
                  this.state.peek = chars.$VTAB;
                } else if (peek() === chars.$t) {
                  this.state.peek = chars.$TAB;
                } else if (peek() === chars.$b) {
                  this.state.peek = chars.$BSPACE;
                } else if (peek() === chars.$f) {
                  this.state.peek = chars.$FF;
                } else if (peek() === chars.$u) {
                  this.advanceState(this.internalState);
                  if (peek() === chars.$LBRACE) {
                    this.advanceState(this.internalState);
                    const digitStart = this.clone();
                    let length = 0;
                    while (peek() !== chars.$RBRACE) {
                      this.advanceState(this.internalState);
                      length++;
                    }
                    this.state.peek = this.decodeHexDigits(digitStart, length);
                  } else {
                    const digitStart = this.clone();
                    this.advanceState(this.internalState);
                    this.advanceState(this.internalState);
                    this.advanceState(this.internalState);
                    this.state.peek = this.decodeHexDigits(digitStart, 4);
                  }
                } else if (peek() === chars.$x) {
                  this.advanceState(this.internalState);
                  const digitStart = this.clone();
                  this.advanceState(this.internalState);
                  this.state.peek = this.decodeHexDigits(digitStart, 2);
                } else if (chars.isOctalDigit(peek())) {
                  let octal = "";
                  let length = 0;
                  let previous = this.clone();
                  while (chars.isOctalDigit(peek()) && length < 3) {
                    previous = this.clone();
                    octal += String.fromCodePoint(peek());
                    this.advanceState(this.internalState);
                    length++;
                  }
                  this.state.peek = parseInt(octal, 8);
                  this.internalState = previous.internalState;
                } else if (chars.isNewLine(this.internalState.peek)) {
                  this.advanceState(this.internalState);
                  this.state = this.internalState;
                } else {
                  this.state.peek = this.internalState.peek;
                }
              }
            }
            decodeHexDigits(start, length) {
              const hex = this.input.substr(start.internalState.offset, length);
              const charCode = parseInt(hex, 16);
              if (!isNaN(charCode)) {
                return charCode;
              } else {
                start.state = start.internalState;
                throw new CursorError("Invalid hexadecimal escape sequence", start);
              }
            }
          };
          var CursorError = class {
            constructor(msg, cursor) {
              this.msg = msg;
              this.cursor = cursor;
            }
          };
          exports2.CursorError = CursorError;
        }
      });
      var require_parser = __commonJS2({
        "node_modules/angular-html-parser/lib/compiler/src/ml_parser/parser.js"(exports2) {
          "use strict";
          init_define_process();
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          var parse_util_1 = require_parse_util();
          var html = require_ast2();
          var lex = require_lexer();
          var tags_1 = require_tags();
          var TreeError = class extends parse_util_1.ParseError {
            constructor(elementName, span, msg) {
              super(span, msg);
              this.elementName = elementName;
            }
            static create(elementName, span, msg) {
              return new TreeError(elementName, span, msg);
            }
          };
          exports2.TreeError = TreeError;
          var ParseTreeResult = class {
            constructor(rootNodes, errors) {
              this.rootNodes = rootNodes;
              this.errors = errors;
            }
          };
          exports2.ParseTreeResult = ParseTreeResult;
          var Parser = class {
            constructor(getTagDefinition) {
              this.getTagDefinition = getTagDefinition;
            }
            parse(source, url, options) {
              let isTagNameCaseSensitive = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
              let getTagContentType = arguments.length > 4 ? arguments[4] : void 0;
              const lowercasify = (fn) => function(x) {
                for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                  args[_key3 - 1] = arguments[_key3];
                }
                return fn(x.toLowerCase(), ...args);
              };
              const getTagDefinition = isTagNameCaseSensitive ? this.getTagDefinition : lowercasify(this.getTagDefinition);
              const getDefaultTagContentType = (tagName) => getTagDefinition(tagName).contentType;
              const getTagContentTypeWithProcessedTagName = isTagNameCaseSensitive ? getTagContentType : lowercasify(getTagContentType);
              const _getTagContentType = getTagContentType ? (tagName, prefix, hasParent, attrs) => {
                const contentType = getTagContentTypeWithProcessedTagName(tagName, prefix, hasParent, attrs);
                return contentType !== void 0 ? contentType : getDefaultTagContentType(tagName);
              } : getDefaultTagContentType;
              const tokensAndErrors = lex.tokenize(source, url, _getTagContentType, options);
              const canSelfClose = options && options.canSelfClose || false;
              const allowHtmComponentClosingTags = options && options.allowHtmComponentClosingTags || false;
              const treeAndErrors = new _TreeBuilder(tokensAndErrors.tokens, getTagDefinition, canSelfClose, allowHtmComponentClosingTags, isTagNameCaseSensitive).build();
              return new ParseTreeResult(treeAndErrors.rootNodes, tokensAndErrors.errors.concat(treeAndErrors.errors));
            }
          };
          exports2.Parser = Parser;
          var _TreeBuilder = class {
            constructor(tokens, getTagDefinition, canSelfClose, allowHtmComponentClosingTags, isTagNameCaseSensitive) {
              this.tokens = tokens;
              this.getTagDefinition = getTagDefinition;
              this.canSelfClose = canSelfClose;
              this.allowHtmComponentClosingTags = allowHtmComponentClosingTags;
              this.isTagNameCaseSensitive = isTagNameCaseSensitive;
              this._index = -1;
              this._rootNodes = [];
              this._errors = [];
              this._elementStack = [];
              this._advance();
            }
            build() {
              while (this._peek.type !== lex.TokenType.EOF) {
                if (this._peek.type === lex.TokenType.TAG_OPEN_START) {
                  this._consumeStartTag(this._advance());
                } else if (this._peek.type === lex.TokenType.TAG_CLOSE) {
                  this._closeVoidElement();
                  this._consumeEndTag(this._advance());
                } else if (this._peek.type === lex.TokenType.CDATA_START) {
                  this._closeVoidElement();
                  this._consumeCdata(this._advance());
                } else if (this._peek.type === lex.TokenType.COMMENT_START) {
                  this._closeVoidElement();
                  this._consumeComment(this._advance());
                } else if (this._peek.type === lex.TokenType.TEXT || this._peek.type === lex.TokenType.RAW_TEXT || this._peek.type === lex.TokenType.ESCAPABLE_RAW_TEXT) {
                  this._closeVoidElement();
                  this._consumeText(this._advance());
                } else if (this._peek.type === lex.TokenType.EXPANSION_FORM_START) {
                  this._consumeExpansion(this._advance());
                } else if (this._peek.type === lex.TokenType.DOC_TYPE_START) {
                  this._consumeDocType(this._advance());
                } else {
                  this._advance();
                }
              }
              return new ParseTreeResult(this._rootNodes, this._errors);
            }
            _advance() {
              const prev = this._peek;
              if (this._index < this.tokens.length - 1) {
                this._index++;
              }
              this._peek = this.tokens[this._index];
              return prev;
            }
            _advanceIf(type) {
              if (this._peek.type === type) {
                return this._advance();
              }
              return null;
            }
            _consumeCdata(startToken) {
              const text = this._advance();
              const value = this._getText(text);
              const endToken = this._advanceIf(lex.TokenType.CDATA_END);
              this._addToParent(new html.CDATA(value, new parse_util_1.ParseSourceSpan(startToken.sourceSpan.start, (endToken || text).sourceSpan.end)));
            }
            _consumeComment(startToken) {
              const text = this._advanceIf(lex.TokenType.RAW_TEXT);
              const endToken = this._advanceIf(lex.TokenType.COMMENT_END);
              const value = text != null ? text.parts[0].trim() : null;
              const sourceSpan = new parse_util_1.ParseSourceSpan(startToken.sourceSpan.start, (endToken || text || startToken).sourceSpan.end);
              this._addToParent(new html.Comment(value, sourceSpan));
            }
            _consumeDocType(startToken) {
              const text = this._advanceIf(lex.TokenType.RAW_TEXT);
              const endToken = this._advanceIf(lex.TokenType.DOC_TYPE_END);
              const value = text != null ? text.parts[0].trim() : null;
              const sourceSpan = new parse_util_1.ParseSourceSpan(startToken.sourceSpan.start, (endToken || text || startToken).sourceSpan.end);
              this._addToParent(new html.DocType(value, sourceSpan));
            }
            _consumeExpansion(token) {
              const switchValue = this._advance();
              const type = this._advance();
              const cases = [];
              while (this._peek.type === lex.TokenType.EXPANSION_CASE_VALUE) {
                const expCase = this._parseExpansionCase();
                if (!expCase)
                  return;
                cases.push(expCase);
              }
              if (this._peek.type !== lex.TokenType.EXPANSION_FORM_END) {
                this._errors.push(TreeError.create(null, this._peek.sourceSpan, `Invalid ICU message. Missing '}'.`));
                return;
              }
              const sourceSpan = new parse_util_1.ParseSourceSpan(token.sourceSpan.start, this._peek.sourceSpan.end);
              this._addToParent(new html.Expansion(switchValue.parts[0], type.parts[0], cases, sourceSpan, switchValue.sourceSpan));
              this._advance();
            }
            _parseExpansionCase() {
              const value = this._advance();
              if (this._peek.type !== lex.TokenType.EXPANSION_CASE_EXP_START) {
                this._errors.push(TreeError.create(null, this._peek.sourceSpan, `Invalid ICU message. Missing '{'.`));
                return null;
              }
              const start = this._advance();
              const exp = this._collectExpansionExpTokens(start);
              if (!exp)
                return null;
              const end = this._advance();
              exp.push(new lex.Token(lex.TokenType.EOF, [], end.sourceSpan));
              const parsedExp = new _TreeBuilder(exp, this.getTagDefinition, this.canSelfClose, this.allowHtmComponentClosingTags, this.isTagNameCaseSensitive).build();
              if (parsedExp.errors.length > 0) {
                this._errors = this._errors.concat(parsedExp.errors);
                return null;
              }
              const sourceSpan = new parse_util_1.ParseSourceSpan(value.sourceSpan.start, end.sourceSpan.end);
              const expSourceSpan = new parse_util_1.ParseSourceSpan(start.sourceSpan.start, end.sourceSpan.end);
              return new html.ExpansionCase(value.parts[0], parsedExp.rootNodes, sourceSpan, value.sourceSpan, expSourceSpan);
            }
            _collectExpansionExpTokens(start) {
              const exp = [];
              const expansionFormStack = [lex.TokenType.EXPANSION_CASE_EXP_START];
              while (true) {
                if (this._peek.type === lex.TokenType.EXPANSION_FORM_START || this._peek.type === lex.TokenType.EXPANSION_CASE_EXP_START) {
                  expansionFormStack.push(this._peek.type);
                }
                if (this._peek.type === lex.TokenType.EXPANSION_CASE_EXP_END) {
                  if (lastOnStack(expansionFormStack, lex.TokenType.EXPANSION_CASE_EXP_START)) {
                    expansionFormStack.pop();
                    if (expansionFormStack.length == 0)
                      return exp;
                  } else {
                    this._errors.push(TreeError.create(null, start.sourceSpan, `Invalid ICU message. Missing '}'.`));
                    return null;
                  }
                }
                if (this._peek.type === lex.TokenType.EXPANSION_FORM_END) {
                  if (lastOnStack(expansionFormStack, lex.TokenType.EXPANSION_FORM_START)) {
                    expansionFormStack.pop();
                  } else {
                    this._errors.push(TreeError.create(null, start.sourceSpan, `Invalid ICU message. Missing '}'.`));
                    return null;
                  }
                }
                if (this._peek.type === lex.TokenType.EOF) {
                  this._errors.push(TreeError.create(null, start.sourceSpan, `Invalid ICU message. Missing '}'.`));
                  return null;
                }
                exp.push(this._advance());
              }
            }
            _getText(token) {
              let text = token.parts[0];
              if (text.length > 0 && text[0] == "\n") {
                const parent = this._getParentElement();
                if (parent != null && parent.children.length == 0 && this.getTagDefinition(parent.name).ignoreFirstLf) {
                  text = text.substring(1);
                }
              }
              return text;
            }
            _consumeText(token) {
              const text = this._getText(token);
              if (text.length > 0) {
                this._addToParent(new html.Text(text, token.sourceSpan));
              }
            }
            _closeVoidElement() {
              const el = this._getParentElement();
              if (el && this.getTagDefinition(el.name).isVoid) {
                this._elementStack.pop();
              }
            }
            _consumeStartTag(startTagToken) {
              const prefix = startTagToken.parts[0];
              const name = startTagToken.parts[1];
              const attrs = [];
              while (this._peek.type === lex.TokenType.ATTR_NAME) {
                attrs.push(this._consumeAttr(this._advance()));
              }
              const fullName = this._getElementFullName(prefix, name, this._getParentElement());
              let selfClosing = false;
              if (this._peek.type === lex.TokenType.TAG_OPEN_END_VOID) {
                this._advance();
                selfClosing = true;
                const tagDef = this.getTagDefinition(fullName);
                if (!(this.canSelfClose || tagDef.canSelfClose || tags_1.getNsPrefix(fullName) !== null || tagDef.isVoid)) {
                  this._errors.push(TreeError.create(fullName, startTagToken.sourceSpan, `Only void and foreign elements can be self closed "${startTagToken.parts[1]}"`));
                }
              } else if (this._peek.type === lex.TokenType.TAG_OPEN_END) {
                this._advance();
                selfClosing = false;
              }
              const end = this._peek.sourceSpan.start;
              const span = new parse_util_1.ParseSourceSpan(startTagToken.sourceSpan.start, end);
              const nameSpan = new parse_util_1.ParseSourceSpan(startTagToken.sourceSpan.start.moveBy(1), startTagToken.sourceSpan.end);
              const el = new html.Element(fullName, attrs, [], span, span, void 0, nameSpan);
              this._pushElement(el);
              if (selfClosing) {
                this._popElement(fullName);
                el.endSourceSpan = span;
              }
            }
            _pushElement(el) {
              const parentEl = this._getParentElement();
              if (parentEl && this.getTagDefinition(parentEl.name).isClosedByChild(el.name)) {
                this._elementStack.pop();
              }
              this._addToParent(el);
              this._elementStack.push(el);
            }
            _consumeEndTag(endTagToken) {
              const fullName = this.allowHtmComponentClosingTags && endTagToken.parts.length === 0 ? null : this._getElementFullName(endTagToken.parts[0], endTagToken.parts[1], this._getParentElement());
              if (this._getParentElement()) {
                this._getParentElement().endSourceSpan = endTagToken.sourceSpan;
              }
              if (fullName && this.getTagDefinition(fullName).isVoid) {
                this._errors.push(TreeError.create(fullName, endTagToken.sourceSpan, `Void elements do not have end tags "${endTagToken.parts[1]}"`));
              } else if (!this._popElement(fullName)) {
                const errMsg = `Unexpected closing tag "${fullName}". It may happen when the tag has already been closed by another tag. For more info see https://www.w3.org/TR/html5/syntax.html#closing-elements-that-have-implied-end-tags`;
                this._errors.push(TreeError.create(fullName, endTagToken.sourceSpan, errMsg));
              }
            }
            _popElement(fullName) {
              for (let stackIndex = this._elementStack.length - 1; stackIndex >= 0; stackIndex--) {
                const el = this._elementStack[stackIndex];
                if (!fullName || (tags_1.getNsPrefix(el.name) ? el.name == fullName : el.name.toLowerCase() == fullName.toLowerCase())) {
                  this._elementStack.splice(stackIndex, this._elementStack.length - stackIndex);
                  return true;
                }
                if (!this.getTagDefinition(el.name).closedByParent) {
                  return false;
                }
              }
              return false;
            }
            _consumeAttr(attrName) {
              const fullName = tags_1.mergeNsAndName(attrName.parts[0], attrName.parts[1]);
              let end = attrName.sourceSpan.end;
              let value = "";
              let valueSpan = void 0;
              let quoteStart = void 0;
              if (this._peek.type === lex.TokenType.ATTR_QUOTE) {
                const quoteToken = this._advance();
                quoteStart = quoteToken.sourceSpan.start;
              }
              if (this._peek.type === lex.TokenType.ATTR_VALUE) {
                const valueToken = this._advance();
                value = valueToken.parts[0];
                end = valueToken.sourceSpan.end;
                valueSpan = valueToken.sourceSpan;
              }
              if (this._peek.type === lex.TokenType.ATTR_QUOTE) {
                const quoteToken = this._advance();
                end = quoteToken.sourceSpan.end;
                valueSpan = new parse_util_1.ParseSourceSpan(quoteStart, end);
              }
              return new html.Attribute(fullName, value, new parse_util_1.ParseSourceSpan(attrName.sourceSpan.start, end), valueSpan, attrName.sourceSpan);
            }
            _getParentElement() {
              return this._elementStack.length > 0 ? this._elementStack[this._elementStack.length - 1] : null;
            }
            _getParentElementSkippingContainers() {
              let container = null;
              for (let i = this._elementStack.length - 1; i >= 0; i--) {
                if (!tags_1.isNgContainer(this._elementStack[i].name)) {
                  return {
                    parent: this._elementStack[i],
                    container
                  };
                }
                container = this._elementStack[i];
              }
              return {
                parent: null,
                container
              };
            }
            _addToParent(node) {
              const parent = this._getParentElement();
              if (parent != null) {
                parent.children.push(node);
              } else {
                this._rootNodes.push(node);
              }
            }
            _insertBeforeContainer(parent, container, node) {
              if (!container) {
                this._addToParent(node);
                this._elementStack.push(node);
              } else {
                if (parent) {
                  const index = parent.children.indexOf(container);
                  parent.children[index] = node;
                } else {
                  this._rootNodes.push(node);
                }
                node.children.push(container);
                this._elementStack.splice(this._elementStack.indexOf(container), 0, node);
              }
            }
            _getElementFullName(prefix, localName, parentElement) {
              if (prefix === "") {
                prefix = this.getTagDefinition(localName).implicitNamespacePrefix || "";
                if (prefix === "" && parentElement != null) {
                  prefix = tags_1.getNsPrefix(parentElement.name);
                }
              }
              return tags_1.mergeNsAndName(prefix, localName);
            }
          };
          function lastOnStack(stack, element) {
            return stack.length > 0 && stack[stack.length - 1] === element;
          }
        }
      });
      var require_html_parser = __commonJS2({
        "node_modules/angular-html-parser/lib/compiler/src/ml_parser/html_parser.js"(exports2) {
          "use strict";
          init_define_process();
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          var html_tags_1 = require_html_tags();
          var parser_1 = require_parser();
          var parser_2 = require_parser();
          exports2.ParseTreeResult = parser_2.ParseTreeResult;
          exports2.TreeError = parser_2.TreeError;
          var HtmlParser = class extends parser_1.Parser {
            constructor() {
              super(html_tags_1.getHtmlTagDefinition);
            }
            parse(source, url, options) {
              let isTagNameCaseSensitive = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
              let getTagContentType = arguments.length > 4 ? arguments[4] : void 0;
              return super.parse(source, url, options, isTagNameCaseSensitive, getTagContentType);
            }
          };
          exports2.HtmlParser = HtmlParser;
        }
      });
      var require_src = __commonJS2({
        "node_modules/angular-html-parser/lib/angular-html-parser/src/index.js"(exports2) {
          "use strict";
          init_define_process();
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          var html_parser_1 = require_html_parser();
          var tags_1 = require_tags();
          exports2.TagContentType = tags_1.TagContentType;
          var parser = null;
          var getParser = () => {
            if (!parser) {
              parser = new html_parser_1.HtmlParser();
            }
            return parser;
          };
          function parse(input) {
            let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            const {
              canSelfClose = false,
              allowHtmComponentClosingTags = false,
              isTagNameCaseSensitive = false,
              getTagContentType
            } = options;
            return getParser().parse(input, "angular-html-parser", {
              tokenizeExpansionForms: false,
              interpolationConfig: void 0,
              canSelfClose,
              allowHtmComponentClosingTags
            }, isTagNameCaseSensitive, getTagContentType);
          }
          exports2.parse = parse;
        }
      });
      init_define_process();
      var {
        ParseSourceSpan,
        ParseLocation,
        ParseSourceFile
      } = require_parse_util();
      var parseFrontMatter = require_parse();
      var getLast = require_get_last();
      var createError = require_parser_create_error();
      var {
        inferParserByLanguage
      } = require_util2();
      var HTML_TAGS = require_html_tag_names2();
      var HTML_ELEMENT_ATTRIBUTES = require_html_elements_attributes();
      var isUnknownNamespace = require_is_unknown_namespace();
      var {
        hasPragma
      } = require_pragma();
      var {
        Node
      } = require_ast();
      var {
        parseIeConditionalComment
      } = require_conditional_comment();
      var {
        locStart,
        locEnd
      } = require_loc();
      function ngHtmlParser(input, _ref12, options) {
        let {
          canSelfClose,
          normalizeTagName,
          normalizeAttributeName,
          allowHtmComponentClosingTags,
          isTagNameCaseSensitive,
          getTagContentType
        } = _ref12;
        const parser = require_src();
        const {
          RecursiveVisitor,
          visitAll
        } = require_ast2();
        const {
          ParseSourceSpan: ParseSourceSpan2
        } = require_parse_util();
        const {
          getHtmlTagDefinition
        } = require_html_tags();
        let {
          rootNodes,
          errors
        } = parser.parse(input, {
          canSelfClose,
          allowHtmComponentClosingTags,
          isTagNameCaseSensitive,
          getTagContentType
        });
        if (options.parser === "vue") {
          const isVueHtml = rootNodes.some((node) => node.type === "docType" && node.value === "html" || node.type === "element" && node.name.toLowerCase() === "html");
          if (!isVueHtml) {
            const shouldParseAsHTML = (node) => {
              if (!node) {
                return false;
              }
              if (node.type !== "element" || node.name !== "template") {
                return false;
              }
              const langAttr = node.attrs.find((attr) => attr.name === "lang");
              const langValue = langAttr && langAttr.value;
              return !langValue || inferParserByLanguage(langValue, options) === "html";
            };
            if (rootNodes.some(shouldParseAsHTML)) {
              let secondParseResult;
              const doSecondParse = () => parser.parse(input, {
                canSelfClose,
                allowHtmComponentClosingTags,
                isTagNameCaseSensitive
              });
              const getSecondParse = () => secondParseResult || (secondParseResult = doSecondParse());
              const getSameLocationNode = (node) => getSecondParse().rootNodes.find((_ref13) => {
                let {
                  startSourceSpan
                } = _ref13;
                return startSourceSpan && startSourceSpan.start.offset === node.startSourceSpan.start.offset;
              });
              for (let i = 0; i < rootNodes.length; i++) {
                const node = rootNodes[i];
                const {
                  endSourceSpan,
                  startSourceSpan
                } = node;
                const isUnclosedNode = endSourceSpan === null;
                if (isUnclosedNode) {
                  const result = getSecondParse();
                  errors = result.errors;
                  rootNodes[i] = getSameLocationNode(node) || node;
                } else if (shouldParseAsHTML(node)) {
                  const result = getSecondParse();
                  const startOffset = startSourceSpan.end.offset;
                  const endOffset = endSourceSpan.start.offset;
                  for (const error of result.errors) {
                    const {
                      offset
                    } = error.span.start;
                    if (startOffset < offset && offset < endOffset) {
                      errors = [error];
                      break;
                    }
                  }
                  rootNodes[i] = getSameLocationNode(node) || node;
                }
              }
            }
          } else {
            canSelfClose = true;
            normalizeTagName = true;
            normalizeAttributeName = true;
            allowHtmComponentClosingTags = true;
            isTagNameCaseSensitive = false;
            const htmlParseResult = parser.parse(input, {
              canSelfClose,
              allowHtmComponentClosingTags,
              isTagNameCaseSensitive
            });
            rootNodes = htmlParseResult.rootNodes;
            errors = htmlParseResult.errors;
          }
        }
        if (errors.length > 0) {
          const {
            msg,
            span: {
              start,
              end
            }
          } = errors[0];
          throw createError(msg, {
            start: {
              line: start.line + 1,
              column: start.col + 1
            },
            end: {
              line: end.line + 1,
              column: end.col + 1
            }
          });
        }
        const restoreName = (node) => {
          const namespace = node.name.startsWith(":") ? node.name.slice(1).split(":")[0] : null;
          const rawName = node.nameSpan.toString();
          const hasExplicitNamespace = namespace !== null && rawName.startsWith(`${namespace}:`);
          const name = hasExplicitNamespace ? rawName.slice(namespace.length + 1) : rawName;
          node.name = name;
          node.namespace = namespace;
          node.hasExplicitNamespace = hasExplicitNamespace;
        };
        const restoreNameAndValue = (node) => {
          switch (node.type) {
            case "element":
              restoreName(node);
              for (const attr of node.attrs) {
                restoreName(attr);
                if (!attr.valueSpan) {
                  attr.value = null;
                } else {
                  attr.value = attr.valueSpan.toString();
                  if (/["']/.test(attr.value[0])) {
                    attr.value = attr.value.slice(1, -1);
                  }
                }
              }
              break;
            case "comment":
              node.value = node.sourceSpan.toString().slice("<!--".length, -"-->".length);
              break;
            case "text":
              node.value = node.sourceSpan.toString();
              break;
          }
        };
        const lowerCaseIfFn = (text, fn) => {
          const lowerCasedText = text.toLowerCase();
          return fn(lowerCasedText) ? lowerCasedText : text;
        };
        const normalizeName = (node) => {
          if (node.type === "element") {
            if (normalizeTagName && (!node.namespace || node.namespace === node.tagDefinition.implicitNamespacePrefix || isUnknownNamespace(node))) {
              node.name = lowerCaseIfFn(node.name, (lowerCasedName) => lowerCasedName in HTML_TAGS);
            }
            if (normalizeAttributeName) {
              const CURRENT_HTML_ELEMENT_ATTRIBUTES = HTML_ELEMENT_ATTRIBUTES[node.name] || /* @__PURE__ */ Object.create(null);
              for (const attr of node.attrs) {
                if (!attr.namespace) {
                  attr.name = lowerCaseIfFn(attr.name, (lowerCasedAttrName) => node.name in HTML_ELEMENT_ATTRIBUTES && (lowerCasedAttrName in HTML_ELEMENT_ATTRIBUTES["*"] || lowerCasedAttrName in CURRENT_HTML_ELEMENT_ATTRIBUTES));
                }
              }
            }
          }
        };
        const fixSourceSpan = (node) => {
          if (node.sourceSpan && node.endSourceSpan) {
            node.sourceSpan = new ParseSourceSpan2(node.sourceSpan.start, node.endSourceSpan.end);
          }
        };
        const addTagDefinition = (node) => {
          if (node.type === "element") {
            const tagDefinition = getHtmlTagDefinition(isTagNameCaseSensitive ? node.name : node.name.toLowerCase());
            if (!node.namespace || node.namespace === tagDefinition.implicitNamespacePrefix || isUnknownNamespace(node)) {
              node.tagDefinition = tagDefinition;
            } else {
              node.tagDefinition = getHtmlTagDefinition("");
            }
          }
        };
        visitAll(new class extends RecursiveVisitor {
          visit(node) {
            restoreNameAndValue(node);
            addTagDefinition(node);
            normalizeName(node);
            fixSourceSpan(node);
          }
        }(), rootNodes);
        return rootNodes;
      }
      function _parse(text, options, parserOptions) {
        let shouldParseFrontMatter = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
        const {
          frontMatter,
          content
        } = shouldParseFrontMatter ? parseFrontMatter(text) : {
          frontMatter: null,
          content: text
        };
        const file = new ParseSourceFile(text, options.filepath);
        const start = new ParseLocation(file, 0, 0, 0);
        const end = start.moveBy(text.length);
        const rawAst = {
          type: "root",
          sourceSpan: new ParseSourceSpan(start, end),
          children: ngHtmlParser(content, parserOptions, options)
        };
        if (frontMatter) {
          const start2 = new ParseLocation(file, 0, 0, 0);
          const end2 = start2.moveBy(frontMatter.raw.length);
          frontMatter.sourceSpan = new ParseSourceSpan(start2, end2);
          rawAst.children.unshift(frontMatter);
        }
        const ast = new Node(rawAst);
        const parseSubHtml = (subContent, startSpan) => {
          const {
            offset
          } = startSpan;
          const fakeContent = text.slice(0, offset).replace(/[^\n\r]/g, " ");
          const realContent = subContent;
          const subAst = _parse(fakeContent + realContent, options, parserOptions, false);
          subAst.sourceSpan = new ParseSourceSpan(startSpan, getLast(subAst.children).sourceSpan.end);
          const firstText = subAst.children[0];
          if (firstText.length === offset) {
            subAst.children.shift();
          } else {
            firstText.sourceSpan = new ParseSourceSpan(firstText.sourceSpan.start.moveBy(offset), firstText.sourceSpan.end);
            firstText.value = firstText.value.slice(offset);
          }
          return subAst;
        };
        ast.walk((node) => {
          if (node.type === "comment") {
            const ieConditionalComment = parseIeConditionalComment(node, parseSubHtml);
            if (ieConditionalComment) {
              node.parent.replaceChild(node, ieConditionalComment);
            }
          }
        });
        return ast;
      }
      function createParser() {
        let {
          name,
          canSelfClose = false,
          normalizeTagName = false,
          normalizeAttributeName = false,
          allowHtmComponentClosingTags = false,
          isTagNameCaseSensitive = false,
          getTagContentType
        } = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        return {
          parse: (text, parsers, options) => _parse(text, Object.assign({
            parser: name
          }, options), {
            canSelfClose,
            normalizeTagName,
            normalizeAttributeName,
            allowHtmComponentClosingTags,
            isTagNameCaseSensitive,
            getTagContentType
          }),
          hasPragma,
          astFormat: "html",
          locStart,
          locEnd
        };
      }
      module.exports = {
        parsers: {
          html: createParser({
            name: "html",
            canSelfClose: true,
            normalizeTagName: true,
            normalizeAttributeName: true,
            allowHtmComponentClosingTags: true
          }),
          angular: createParser({
            name: "angular",
            canSelfClose: true
          }),
          vue: createParser({
            name: "vue",
            canSelfClose: true,
            isTagNameCaseSensitive: true,
            getTagContentType: (tagName, prefix, hasParent, attrs) => {
              if (tagName.toLowerCase() !== "html" && !hasParent && (tagName !== "template" || attrs.some((_ref14) => {
                let {
                  name,
                  value
                } = _ref14;
                return name === "lang" && value !== "html" && value !== "" && value !== void 0;
              }))) {
                return require_src().TagContentType.RAW_TEXT;
              }
            }
          }),
          lwc: createParser({
            name: "lwc"
          })
        }
      };
    }
  });
  return require_parser_html_js_umd();
});