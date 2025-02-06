// dist/_parser-glimmer.js.esm.mjs
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = {
    exports: {}
  }).exports, mod), mod.exports;
};
var init_define_process = __esm({
  "<define:process>"() {
  }
});
var require_build = __commonJS({
  "node_modules/lines-and-columns/build/index.cjs"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    exports.LinesAndColumns = void 0;
    var LF = "\n";
    var CR = "\r";
    var LinesAndColumns = function() {
      function LinesAndColumns2(string) {
        this.length = string.length;
        var offsets = [0];
        for (var offset = 0; offset < string.length; ) {
          switch (string[offset]) {
            case LF:
              offset += LF.length;
              offsets.push(offset);
              break;
            case CR:
              offset += CR.length;
              if (string[offset] === LF) {
                offset += LF.length;
              }
              offsets.push(offset);
              break;
            default:
              offset++;
              break;
          }
        }
        this.offsets = offsets;
      }
      LinesAndColumns2.prototype.locationForIndex = function(index) {
        if (index < 0 || index > this.length) {
          return null;
        }
        var line = 0;
        var offsets = this.offsets;
        while (offsets[line + 1] <= index) {
          line++;
        }
        var column = index - offsets[line];
        return {
          line,
          column
        };
      };
      LinesAndColumns2.prototype.indexForLocation = function(location) {
        var line = location.line, column = location.column;
        if (line < 0 || line >= this.offsets.length) {
          return null;
        }
        if (column < 0 || column > this.lengthOfLine(line)) {
          return null;
        }
        return this.offsets[line] + column;
      };
      LinesAndColumns2.prototype.lengthOfLine = function(line) {
        var offset = this.offsets[line];
        var nextOffset = line === this.offsets.length - 1 ? this.length : this.offsets[line + 1];
        return nextOffset - offset;
      };
      return LinesAndColumns2;
    }();
    exports.LinesAndColumns = LinesAndColumns;
  }
});
var require_parser_create_error = __commonJS({
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
var require_loc = __commonJS({
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
var require_es5 = __commonJS({
  "node_modules/@glimmer/env/dist/commonjs/es5/index.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var DEBUG = exports.DEBUG = false;
    var CI = exports.CI = false;
  }
});
var require_array_utils = __commonJS({
  "node_modules/@glimmer/util/dist/commonjs/es2017/lib/array-utils.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.emptyArray = emptyArray;
    exports.isEmptyArray = isEmptyArray;
    exports.EMPTY_NUMBER_ARRAY = exports.EMPTY_STRING_ARRAY = exports.EMPTY_ARRAY = void 0;
    var EMPTY_ARRAY = Object.freeze([]);
    exports.EMPTY_ARRAY = EMPTY_ARRAY;
    function emptyArray() {
      return EMPTY_ARRAY;
    }
    var EMPTY_STRING_ARRAY = emptyArray();
    exports.EMPTY_STRING_ARRAY = EMPTY_STRING_ARRAY;
    var EMPTY_NUMBER_ARRAY = emptyArray();
    exports.EMPTY_NUMBER_ARRAY = EMPTY_NUMBER_ARRAY;
    function isEmptyArray(input) {
      return input === EMPTY_ARRAY;
    }
  }
});
var require_assert = __commonJS({
  "node_modules/@glimmer/util/dist/commonjs/es2017/lib/assert.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.debugAssert = debugAssert;
    exports.prodAssert = prodAssert;
    exports.deprecate = deprecate;
    exports.default = void 0;
    var _index = require_es2017();
    function debugAssert(test, msg) {
      if (!test) {
        throw new Error(msg || "assertion failure");
      }
    }
    function prodAssert() {
    }
    function deprecate(desc) {
      _index.LOCAL_LOGGER.warn(`DEPRECATION: ${desc}`);
    }
    var _default = debugAssert;
    exports.default = _default;
  }
});
var require_collections = __commonJS({
  "node_modules/@glimmer/util/dist/commonjs/es2017/lib/collections.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.dict = dict;
    exports.isDict = isDict;
    exports.isObject = isObject;
    exports.StackImpl = void 0;
    function dict() {
      return /* @__PURE__ */ Object.create(null);
    }
    function isDict(u) {
      return u !== null && u !== void 0;
    }
    function isObject(u) {
      return typeof u === "function" || typeof u === "object" && u !== null;
    }
    var StackImpl = class {
      constructor() {
        let values = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
        this.current = null;
        this.stack = values;
      }
      get size() {
        return this.stack.length;
      }
      push(item) {
        this.current = item;
        this.stack.push(item);
      }
      pop() {
        let item = this.stack.pop();
        let len = this.stack.length;
        this.current = len === 0 ? null : this.stack[len - 1];
        return item === void 0 ? null : item;
      }
      nth(from) {
        let len = this.stack.length;
        return len < from ? null : this.stack[len - from];
      }
      isEmpty() {
        return this.stack.length === 0;
      }
      toArray() {
        return this.stack;
      }
    };
    exports.StackImpl = StackImpl;
  }
});
var require_dom = __commonJS({
  "node_modules/@glimmer/util/dist/commonjs/es2017/lib/dom.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.clearElement = clearElement;
    function clearElement(parent) {
      let current = parent.firstChild;
      while (current) {
        let next = current.nextSibling;
        parent.removeChild(current);
        current = next;
      }
    }
  }
});
var require_is_serialization_first_node = __commonJS({
  "node_modules/@glimmer/util/dist/commonjs/es2017/lib/is-serialization-first-node.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.isSerializationFirstNode = isSerializationFirstNode;
    exports.SERIALIZATION_FIRST_NODE_STRING = void 0;
    var SERIALIZATION_FIRST_NODE_STRING = "%+b:0%";
    exports.SERIALIZATION_FIRST_NODE_STRING = SERIALIZATION_FIRST_NODE_STRING;
    function isSerializationFirstNode(node) {
      return node.nodeValue === SERIALIZATION_FIRST_NODE_STRING;
    }
  }
});
var require_object_utils = __commonJS({
  "node_modules/@glimmer/util/dist/commonjs/es2017/lib/object-utils.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.fillNulls = fillNulls;
    exports.values = values;
    exports.assign = void 0;
    var assign = Object.assign;
    exports.assign = assign;
    function fillNulls(count) {
      let arr = new Array(count);
      for (let i = 0; i < count; i++) {
        arr[i] = null;
      }
      return arr;
    }
    function values(obj) {
      const vals = [];
      for (const key in obj) {
        vals.push(obj[key]);
      }
      return vals;
    }
  }
});
var require_intern = __commonJS({
  "node_modules/@glimmer/util/dist/commonjs/es2017/lib/intern.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = intern;
    function intern(str) {
      let obj = {};
      obj[str] = 1;
      for (let key in obj) {
        if (key === str) {
          return key;
        }
      }
      return str;
    }
  }
});
var require_platform_utils = __commonJS({
  "node_modules/@glimmer/util/dist/commonjs/es2017/lib/platform-utils.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.keys = keys;
    exports.unwrap = unwrap;
    exports.expect = expect;
    exports.unreachable = unreachable;
    exports.exhausted = exhausted;
    exports.enumerableSymbol = enumerableSymbol;
    exports.symbol = exports.tuple = exports.HAS_NATIVE_SYMBOL = exports.HAS_NATIVE_PROXY = void 0;
    var _intern = _interopRequireDefault(require_intern());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    var HAS_NATIVE_PROXY = typeof Proxy === "function";
    exports.HAS_NATIVE_PROXY = HAS_NATIVE_PROXY;
    var HAS_NATIVE_SYMBOL = function() {
      if (typeof Symbol !== "function") {
        return false;
      }
      return typeof Symbol() === "symbol";
    }();
    exports.HAS_NATIVE_SYMBOL = HAS_NATIVE_SYMBOL;
    function keys(obj) {
      return Object.keys(obj);
    }
    function unwrap(val) {
      if (val === null || val === void 0)
        throw new Error(`Expected value to be present`);
      return val;
    }
    function expect(val, message) {
      if (val === null || val === void 0)
        throw new Error(message);
      return val;
    }
    function unreachable() {
      let message = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "unreachable";
      return new Error(message);
    }
    function exhausted(value) {
      throw new Error(`Exhausted ${value}`);
    }
    var tuple = function() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return args;
    };
    exports.tuple = tuple;
    function enumerableSymbol(key) {
      return (0, _intern.default)(`__${key}${Math.floor(Math.random() * Date.now())}__`);
    }
    var symbol = HAS_NATIVE_SYMBOL ? Symbol : enumerableSymbol;
    exports.symbol = symbol;
  }
});
var require_string = __commonJS({
  "node_modules/@glimmer/util/dist/commonjs/es2017/lib/string.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.strip = strip;
    function strip(strings) {
      let out = "";
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }
      for (let i = 0; i < strings.length; i++) {
        let string = strings[i];
        let dynamic = args[i] !== void 0 ? String(args[i]) : "";
        out += `${string}${dynamic}`;
      }
      let lines = out.split("\n");
      while (lines.length && lines[0].match(/^\s*$/)) {
        lines.shift();
      }
      while (lines.length && lines[lines.length - 1].match(/^\s*$/)) {
        lines.pop();
      }
      let min = Infinity;
      for (let line of lines) {
        let leading = line.match(/^\s*/)[0].length;
        min = Math.min(min, leading);
      }
      let stripped = [];
      for (let line of lines) {
        stripped.push(line.slice(min));
      }
      return stripped.join("\n");
    }
  }
});
var require_immediate = __commonJS({
  "node_modules/@glimmer/util/dist/commonjs/es2017/lib/immediate.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.isHandle = isHandle;
    exports.isNonPrimitiveHandle = isNonPrimitiveHandle;
    exports.constants = constants;
    exports.isSmallInt = isSmallInt;
    exports.encodeNegative = encodeNegative;
    exports.decodeNegative = decodeNegative;
    exports.encodePositive = encodePositive;
    exports.decodePositive = decodePositive;
    exports.encodeHandle = encodeHandle;
    exports.decodeHandle = decodeHandle;
    exports.encodeImmediate = encodeImmediate;
    exports.decodeImmediate = decodeImmediate;
    var _assert = require_assert();
    function isHandle(value) {
      return value >= 0;
    }
    function isNonPrimitiveHandle(value) {
      return value > 3;
    }
    function constants() {
      for (var _len3 = arguments.length, values = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        values[_key3] = arguments[_key3];
      }
      return [false, true, null, void 0, ...values];
    }
    function isSmallInt(value) {
      return value % 1 === 0 && value <= 536870911 && value >= -536870912;
    }
    function encodeNegative(num) {
      if (false) {
        (0, _assert.debugAssert)(num % 1 === 0 && num >= -536870912 && num < 0, `Could not encode negative: ${num}`);
      }
      return num & -536870913;
    }
    function decodeNegative(num) {
      if (false) {
        (0, _assert.debugAssert)(num % 1 === 0 && num < ~536870911 && num >= -1073741824, `Could not decode negative: ${num}`);
      }
      return num | ~-536870913;
    }
    function encodePositive(num) {
      if (false) {
        (0, _assert.debugAssert)(num % 1 === 0 && num >= 0 && num <= 536870911, `Could not encode positive: ${num}`);
      }
      return ~num;
    }
    function decodePositive(num) {
      if (false) {
        (0, _assert.debugAssert)(num % 1 === 0 && num <= 0 && num >= ~536870911, `Could not decode positive: ${num}`);
      }
      return ~num;
    }
    function encodeHandle(num) {
      if (false) {
        (0, _assert.debugAssert)(num % 1 === 0 && num >= 0 && num <= 1073741823, `Could not encode handle: ${num}`);
      }
      return num;
    }
    function decodeHandle(num) {
      if (false) {
        (0, _assert.debugAssert)(num % 1 === 0 && num <= 1073741823 && num >= 0, `Could not decode handle: ${num}`);
      }
      return num;
    }
    function encodeImmediate(num) {
      num |= 0;
      return num < 0 ? encodeNegative(num) : encodePositive(num);
    }
    function decodeImmediate(num) {
      num |= 0;
      return num > -536870913 ? decodePositive(num) : decodeNegative(num);
    }
    [1, 2, 3].forEach((x) => decodeHandle(encodeHandle(x)));
    [1, -1].forEach((x) => decodeImmediate(encodeImmediate(x)));
  }
});
var require_template = __commonJS({
  "node_modules/@glimmer/util/dist/commonjs/es2017/lib/template.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.unwrapHandle = unwrapHandle;
    exports.unwrapTemplate = unwrapTemplate;
    exports.extractHandle = extractHandle;
    exports.isOkHandle = isOkHandle;
    exports.isErrHandle = isErrHandle;
    function unwrapHandle(handle) {
      if (typeof handle === "number") {
        return handle;
      } else {
        let error = handle.errors[0];
        throw new Error(`Compile Error: ${error.problem} @ ${error.span.start}..${error.span.end}`);
      }
    }
    function unwrapTemplate(template) {
      if (template.result === "error") {
        throw new Error(`Compile Error: ${template.problem} @ ${template.span.start}..${template.span.end}`);
      }
      return template;
    }
    function extractHandle(handle) {
      if (typeof handle === "number") {
        return handle;
      } else {
        return handle.handle;
      }
    }
    function isOkHandle(handle) {
      return typeof handle === "number";
    }
    function isErrHandle(handle) {
      return typeof handle === "number";
    }
  }
});
var require_weak_set = __commonJS({
  "node_modules/@glimmer/util/dist/commonjs/es2017/lib/weak-set.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _default = typeof WeakSet === "function" ? WeakSet : class WeakSetPolyFill {
      constructor() {
        this._map = /* @__PURE__ */ new WeakMap();
      }
      add(val) {
        this._map.set(val, true);
        return this;
      }
      delete(val) {
        return this._map.delete(val);
      }
      has(val) {
        return this._map.has(val);
      }
    };
    exports.default = _default;
  }
});
var require_simple_cast = __commonJS({
  "node_modules/@glimmer/util/dist/commonjs/es2017/lib/simple-cast.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.castToSimple = castToSimple;
    exports.castToBrowser = castToBrowser;
    exports.checkNode = checkNode;
    var _platformUtils = require_platform_utils();
    function castToSimple(node) {
      if (isDocument(node)) {
        return node;
      } else if (isElement(node)) {
        return node;
      } else {
        return node;
      }
    }
    function castToBrowser(node, sugaryCheck) {
      if (node === null || node === void 0) {
        return null;
      }
      if (typeof document === void 0) {
        throw new Error("Attempted to cast to a browser node in a non-browser context");
      }
      if (isDocument(node)) {
        return node;
      }
      if (node.ownerDocument !== document) {
        throw new Error("Attempted to cast to a browser node with a node that was not created from this document");
      }
      return checkNode(node, sugaryCheck);
    }
    function checkError(from, check) {
      return new Error(`cannot cast a ${from} into ${check}`);
    }
    function isDocument(node) {
      return node.nodeType === 9;
    }
    function isElement(node) {
      return node.nodeType === 1;
    }
    function checkNode(node, check) {
      let isMatch = false;
      if (node !== null) {
        if (typeof check === "string") {
          isMatch = stringCheckNode(node, check);
        } else if (Array.isArray(check)) {
          isMatch = check.some((c) => stringCheckNode(node, c));
        } else {
          throw (0, _platformUtils.unreachable)();
        }
      }
      if (isMatch) {
        return node;
      } else {
        throw checkError(`SimpleElement(${node})`, check);
      }
    }
    function stringCheckNode(node, check) {
      switch (check) {
        case "NODE":
          return true;
        case "HTML":
          return node instanceof HTMLElement;
        case "SVG":
          return node instanceof SVGElement;
        case "ELEMENT":
          return node instanceof Element;
        default:
          if (check.toUpperCase() === check) {
            throw new Error(`BUG: this code is missing handling for a generic node type`);
          }
          return node instanceof Element && node.tagName.toLowerCase() === check;
      }
    }
  }
});
var require_present = __commonJS({
  "node_modules/@glimmer/util/dist/commonjs/es2017/lib/present.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.isPresent = isPresent;
    exports.ifPresent = ifPresent;
    exports.toPresentOption = toPresentOption;
    exports.assertPresent = assertPresent;
    exports.mapPresent = mapPresent;
    function isPresent(list) {
      return list.length > 0;
    }
    function ifPresent(list, ifPresent2, otherwise) {
      if (isPresent(list)) {
        return ifPresent2(list);
      } else {
        return otherwise();
      }
    }
    function toPresentOption(list) {
      if (isPresent(list)) {
        return list;
      } else {
        return null;
      }
    }
    function assertPresent(list) {
      let message = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : `unexpected empty list`;
      if (!isPresent(list)) {
        throw new Error(message);
      }
    }
    function mapPresent(list, callback) {
      if (list === null) {
        return null;
      }
      let out = [];
      for (let item of list) {
        out.push(callback(item));
      }
      return out;
    }
  }
});
var require_untouchable_this = __commonJS({
  "node_modules/@glimmer/util/dist/commonjs/es2017/lib/untouchable-this.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = buildUntouchableThis;
    var _env = require_es5();
    var _platformUtils = require_platform_utils();
    function buildUntouchableThis(source) {
      let context = null;
      if (_env.DEBUG && _platformUtils.HAS_NATIVE_PROXY) {
        let assertOnProperty = (property) => {
          throw new Error(`You accessed \`this.${String(property)}\` from a function passed to the ${source}, but the function itself was not bound to a valid \`this\` context. Consider updating to use a bound function (for instance, use an arrow function, \`() => {}\`).`);
        };
        context = new Proxy({}, {
          get(_target, property) {
            assertOnProperty(property);
          },
          set(_target, property) {
            assertOnProperty(property);
            return false;
          },
          has(_target, property) {
            assertOnProperty(property);
            return false;
          }
        });
      }
      return context;
    }
  }
});
var require_debug_to_string = __commonJS({
  "node_modules/@glimmer/util/dist/commonjs/es2017/lib/debug-to-string.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _env = require_es5();
    var debugToString;
    if (_env.DEBUG) {
      let getFunctionName = (fn) => {
        let functionName = fn.name;
        if (functionName === void 0) {
          let match = Function.prototype.toString.call(fn).match(/function (\w+)\s*\(/);
          functionName = match && match[1] || "";
        }
        return functionName.replace(/^bound /, "");
      };
      let getObjectName = (obj) => {
        let name;
        let className;
        if (obj.constructor && typeof obj.constructor === "function") {
          className = getFunctionName(obj.constructor);
        }
        if ("toString" in obj && obj.toString !== Object.prototype.toString && obj.toString !== Function.prototype.toString) {
          name = obj.toString();
        }
        if (name && name.match(/<.*:ember\d+>/) && className && className[0] !== "_" && className.length > 2 && className !== "Class") {
          return name.replace(/<.*:/, `<${className}:`);
        }
        return name || className;
      };
      let getPrimitiveName = (value) => {
        return String(value);
      };
      debugToString = (value) => {
        if (typeof value === "function") {
          return getFunctionName(value) || `(unknown function)`;
        } else if (typeof value === "object" && value !== null) {
          return getObjectName(value) || `(unknown object)`;
        } else {
          return getPrimitiveName(value);
        }
      };
    }
    var _default = debugToString;
    exports.default = _default;
  }
});
var require_debug_steps = __commonJS({
  "node_modules/@glimmer/util/dist/commonjs/es2017/lib/debug-steps.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.logStep = exports.verifySteps = exports.endTestSteps = exports.beginTestSteps = void 0;
    var _assert = _interopRequireDefault(require_assert());
    var _platformUtils = require_platform_utils();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    var beginTestSteps;
    exports.beginTestSteps = beginTestSteps;
    var endTestSteps;
    exports.endTestSteps = endTestSteps;
    var verifySteps;
    exports.verifySteps = verifySteps;
    var logStep;
    exports.logStep = logStep;
    if (false) {
      let LOGGED_STEPS = null;
      exports.beginTestSteps = beginTestSteps = () => {
        (0, _assert.default)(LOGGED_STEPS === null, "attempted to start steps, but it already began");
        LOGGED_STEPS = {};
      };
      exports.endTestSteps = endTestSteps = () => {
        (0, _assert.default)(LOGGED_STEPS, "attempted to end steps, but they were not started");
        LOGGED_STEPS = null;
      };
      exports.logStep = logStep = (type, step) => {
        if (LOGGED_STEPS === null)
          return;
        LOGGED_STEPS[type] = LOGGED_STEPS[type] || [];
        LOGGED_STEPS[type].push(step);
      };
      exports.verifySteps = verifySteps = (type, expectedSteps, message) => {
        let loggedSteps = (0, _platformUtils.expect)(LOGGED_STEPS, "attempetd to verify steps, but steps were not started");
        let steps = loggedSteps[type] || [];
        loggedSteps[type] = [];
        if (Array.isArray(expectedSteps)) {
          QUnit.config.current.assert.deepEqual(steps, expectedSteps, message);
        } else {
          expectedSteps(steps);
        }
      };
    }
  }
});
var require_es2017 = __commonJS({
  "node_modules/@glimmer/util/dist/commonjs/es2017/index.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _exportNames = {
      LOCAL_LOGGER: true,
      LOGGER: true,
      assertNever: true,
      assert: true,
      deprecate: true,
      dict: true,
      isDict: true,
      isObject: true,
      Stack: true,
      isSerializationFirstNode: true,
      SERIALIZATION_FIRST_NODE_STRING: true,
      assign: true,
      fillNulls: true,
      values: true,
      _WeakSet: true,
      castToSimple: true,
      castToBrowser: true,
      checkNode: true,
      intern: true,
      buildUntouchableThis: true,
      debugToString: true,
      beginTestSteps: true,
      endTestSteps: true,
      logStep: true,
      verifySteps: true
    };
    exports.assertNever = assertNever;
    Object.defineProperty(exports, "assert", {
      enumerable: true,
      get: function() {
        return _assert.default;
      }
    });
    Object.defineProperty(exports, "deprecate", {
      enumerable: true,
      get: function() {
        return _assert.deprecate;
      }
    });
    Object.defineProperty(exports, "dict", {
      enumerable: true,
      get: function() {
        return _collections.dict;
      }
    });
    Object.defineProperty(exports, "isDict", {
      enumerable: true,
      get: function() {
        return _collections.isDict;
      }
    });
    Object.defineProperty(exports, "isObject", {
      enumerable: true,
      get: function() {
        return _collections.isObject;
      }
    });
    Object.defineProperty(exports, "Stack", {
      enumerable: true,
      get: function() {
        return _collections.StackImpl;
      }
    });
    Object.defineProperty(exports, "isSerializationFirstNode", {
      enumerable: true,
      get: function() {
        return _isSerializationFirstNode.isSerializationFirstNode;
      }
    });
    Object.defineProperty(exports, "SERIALIZATION_FIRST_NODE_STRING", {
      enumerable: true,
      get: function() {
        return _isSerializationFirstNode.SERIALIZATION_FIRST_NODE_STRING;
      }
    });
    Object.defineProperty(exports, "assign", {
      enumerable: true,
      get: function() {
        return _objectUtils.assign;
      }
    });
    Object.defineProperty(exports, "fillNulls", {
      enumerable: true,
      get: function() {
        return _objectUtils.fillNulls;
      }
    });
    Object.defineProperty(exports, "values", {
      enumerable: true,
      get: function() {
        return _objectUtils.values;
      }
    });
    Object.defineProperty(exports, "_WeakSet", {
      enumerable: true,
      get: function() {
        return _weakSet.default;
      }
    });
    Object.defineProperty(exports, "castToSimple", {
      enumerable: true,
      get: function() {
        return _simpleCast.castToSimple;
      }
    });
    Object.defineProperty(exports, "castToBrowser", {
      enumerable: true,
      get: function() {
        return _simpleCast.castToBrowser;
      }
    });
    Object.defineProperty(exports, "checkNode", {
      enumerable: true,
      get: function() {
        return _simpleCast.checkNode;
      }
    });
    Object.defineProperty(exports, "intern", {
      enumerable: true,
      get: function() {
        return _intern.default;
      }
    });
    Object.defineProperty(exports, "buildUntouchableThis", {
      enumerable: true,
      get: function() {
        return _untouchableThis.default;
      }
    });
    Object.defineProperty(exports, "debugToString", {
      enumerable: true,
      get: function() {
        return _debugToString.default;
      }
    });
    Object.defineProperty(exports, "beginTestSteps", {
      enumerable: true,
      get: function() {
        return _debugSteps.beginTestSteps;
      }
    });
    Object.defineProperty(exports, "endTestSteps", {
      enumerable: true,
      get: function() {
        return _debugSteps.endTestSteps;
      }
    });
    Object.defineProperty(exports, "logStep", {
      enumerable: true,
      get: function() {
        return _debugSteps.logStep;
      }
    });
    Object.defineProperty(exports, "verifySteps", {
      enumerable: true,
      get: function() {
        return _debugSteps.verifySteps;
      }
    });
    exports.LOGGER = exports.LOCAL_LOGGER = void 0;
    var _arrayUtils = require_array_utils();
    Object.keys(_arrayUtils).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key))
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _arrayUtils[key];
        }
      });
    });
    var _assert = _interopRequireWildcard(require_assert());
    var _collections = require_collections();
    var _dom = require_dom();
    Object.keys(_dom).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key))
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _dom[key];
        }
      });
    });
    var _isSerializationFirstNode = require_is_serialization_first_node();
    var _objectUtils = require_object_utils();
    var _platformUtils = require_platform_utils();
    Object.keys(_platformUtils).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key))
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _platformUtils[key];
        }
      });
    });
    var _string = require_string();
    Object.keys(_string).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key))
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _string[key];
        }
      });
    });
    var _immediate = require_immediate();
    Object.keys(_immediate).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key))
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _immediate[key];
        }
      });
    });
    var _template = require_template();
    Object.keys(_template).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key))
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _template[key];
        }
      });
    });
    var _weakSet = _interopRequireDefault(require_weak_set());
    var _simpleCast = require_simple_cast();
    var _present = require_present();
    Object.keys(_present).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      if (Object.prototype.hasOwnProperty.call(_exportNames, key))
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _present[key];
        }
      });
    });
    var _intern = _interopRequireDefault(require_intern());
    var _untouchableThis = _interopRequireDefault(require_untouchable_this());
    var _debugToString = _interopRequireDefault(require_debug_to_string());
    var _debugSteps = require_debug_steps();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
          default: obj
        };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    var LOCAL_LOGGER = console;
    exports.LOCAL_LOGGER = LOCAL_LOGGER;
    var LOGGER = console;
    exports.LOGGER = LOGGER;
    function assertNever(value) {
      let desc = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "unexpected unreachable branch";
      LOGGER.log("unreachable", value);
      LOGGER.log(`${desc} :: ${JSON.stringify(value)} (${value})`);
      throw new Error(`code reached unreachable`);
    }
  }
});
var require_location = __commonJS({
  "node_modules/@glimmer/syntax/dist/commonjs/es2017/lib/source/location.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.isLocatedWithPositionsArray = isLocatedWithPositionsArray;
    exports.isLocatedWithPositions = isLocatedWithPositions;
    exports.BROKEN_LOCATION = exports.NON_EXISTENT_LOCATION = exports.TEMPORARY_LOCATION = exports.SYNTHETIC = exports.SYNTHETIC_LOCATION = exports.UNKNOWN_POSITION = void 0;
    var _util = require_es2017();
    var UNKNOWN_POSITION = Object.freeze({
      line: 1,
      column: 0
    });
    exports.UNKNOWN_POSITION = UNKNOWN_POSITION;
    var SYNTHETIC_LOCATION = Object.freeze({
      source: "(synthetic)",
      start: UNKNOWN_POSITION,
      end: UNKNOWN_POSITION
    });
    exports.SYNTHETIC_LOCATION = SYNTHETIC_LOCATION;
    var SYNTHETIC = SYNTHETIC_LOCATION;
    exports.SYNTHETIC = SYNTHETIC;
    var TEMPORARY_LOCATION = Object.freeze({
      source: "(temporary)",
      start: UNKNOWN_POSITION,
      end: UNKNOWN_POSITION
    });
    exports.TEMPORARY_LOCATION = TEMPORARY_LOCATION;
    var NON_EXISTENT_LOCATION = Object.freeze({
      source: "(nonexistent)",
      start: UNKNOWN_POSITION,
      end: UNKNOWN_POSITION
    });
    exports.NON_EXISTENT_LOCATION = NON_EXISTENT_LOCATION;
    var BROKEN_LOCATION = Object.freeze({
      source: "(broken)",
      start: UNKNOWN_POSITION,
      end: UNKNOWN_POSITION
    });
    exports.BROKEN_LOCATION = BROKEN_LOCATION;
    function isLocatedWithPositionsArray(location) {
      return (0, _util.isPresent)(location) && location.every(isLocatedWithPositions);
    }
    function isLocatedWithPositions(location) {
      return location.loc !== void 0;
    }
  }
});
var require_slice = __commonJS({
  "node_modules/@glimmer/syntax/dist/commonjs/es2017/lib/source/slice.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SourceSlice = void 0;
    var _span = require_span2();
    var SourceSlice = class {
      constructor(options) {
        this.loc = options.loc;
        this.chars = options.chars;
      }
      static synthetic(chars) {
        let offsets = _span.SourceSpan.synthetic(chars);
        return new SourceSlice({
          loc: offsets,
          chars
        });
      }
      static load(source, slice) {
        return new SourceSlice({
          loc: _span.SourceSpan.load(source, slice[1]),
          chars: slice[0]
        });
      }
      getString() {
        return this.chars;
      }
      serialize() {
        return [this.chars, this.loc.serialize()];
      }
    };
    exports.SourceSlice = SourceSlice;
  }
});
var require_match = __commonJS({
  "node_modules/@glimmer/syntax/dist/commonjs/es2017/lib/source/loc/match.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.match = match;
    exports.IsInvisible = exports.MatchAny = void 0;
    var _util = require_es2017();
    var MatchAny = "MATCH_ANY";
    exports.MatchAny = MatchAny;
    var IsInvisible = "IS_INVISIBLE";
    exports.IsInvisible = IsInvisible;
    var WhenList = class {
      constructor(whens) {
        this._whens = whens;
      }
      first(kind) {
        for (let when of this._whens) {
          let value = when.match(kind);
          if ((0, _util.isPresent)(value)) {
            return value[0];
          }
        }
        return null;
      }
    };
    var When = class {
      constructor() {
        this._map = /* @__PURE__ */ new Map();
      }
      get(pattern, or) {
        let value = this._map.get(pattern);
        if (value) {
          return value;
        }
        value = or();
        this._map.set(pattern, value);
        return value;
      }
      add(pattern, out) {
        this._map.set(pattern, out);
      }
      match(kind) {
        let pattern = patternFor(kind);
        let out = [];
        let exact = this._map.get(pattern);
        let fallback = this._map.get(MatchAny);
        if (exact) {
          out.push(exact);
        }
        if (fallback) {
          out.push(fallback);
        }
        return out;
      }
    };
    function match(callback) {
      return callback(new Matcher()).check();
    }
    var Matcher = class {
      constructor() {
        this._whens = new When();
      }
      check() {
        return (left, right) => this.matchFor(left.kind, right.kind)(left, right);
      }
      matchFor(left, right) {
        let nesteds = this._whens.match(left);
        let callback = new WhenList(nesteds).first(right);
        return callback;
      }
      when(left, right, callback) {
        this._whens.get(left, () => new When()).add(right, callback);
        return this;
      }
    };
    function patternFor(kind) {
      switch (kind) {
        case "Broken":
        case "InternalsSynthetic":
        case "NonExistent":
          return IsInvisible;
        default:
          return kind;
      }
    }
  }
});
var require_offset = __commonJS({
  "node_modules/@glimmer/syntax/dist/commonjs/es2017/lib/source/loc/offset.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.InvisiblePosition = exports.HbsPosition = exports.CharPosition = exports.SourceOffset = exports.BROKEN = void 0;
    var _location = require_location();
    var _match = require_match();
    var _span = require_span();
    var BROKEN = "BROKEN";
    exports.BROKEN = BROKEN;
    var SourceOffset = class {
      constructor(data) {
        this.data = data;
      }
      static forHbsPos(source, pos) {
        return new HbsPosition(source, pos, null).wrap();
      }
      static broken() {
        let pos = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : _location.UNKNOWN_POSITION;
        return new InvisiblePosition("Broken", pos).wrap();
      }
      get offset() {
        let charPos = this.data.toCharPos();
        return charPos === null ? null : charPos.offset;
      }
      eql(right) {
        return eql(this.data, right.data);
      }
      until(other) {
        return (0, _span.span)(this.data, other.data);
      }
      move(by) {
        let charPos = this.data.toCharPos();
        if (charPos === null) {
          return SourceOffset.broken();
        } else {
          let result = charPos.offset + by;
          if (charPos.source.check(result)) {
            return new CharPosition(charPos.source, result).wrap();
          } else {
            return SourceOffset.broken();
          }
        }
      }
      collapsed() {
        return (0, _span.span)(this.data, this.data);
      }
      toJSON() {
        return this.data.toJSON();
      }
    };
    exports.SourceOffset = SourceOffset;
    var CharPosition = class {
      constructor(source, charPos) {
        this.source = source;
        this.charPos = charPos;
        this.kind = "CharPosition";
        this._locPos = null;
      }
      toCharPos() {
        return this;
      }
      toJSON() {
        let hbs = this.toHbsPos();
        return hbs === null ? _location.UNKNOWN_POSITION : hbs.toJSON();
      }
      wrap() {
        return new SourceOffset(this);
      }
      get offset() {
        return this.charPos;
      }
      toHbsPos() {
        let locPos = this._locPos;
        if (locPos === null) {
          let hbsPos = this.source.hbsPosFor(this.charPos);
          if (hbsPos === null) {
            this._locPos = locPos = BROKEN;
          } else {
            this._locPos = locPos = new HbsPosition(this.source, hbsPos, this.charPos);
          }
        }
        return locPos === BROKEN ? null : locPos;
      }
    };
    exports.CharPosition = CharPosition;
    var HbsPosition = class {
      constructor(source, hbsPos) {
        let charPos = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
        this.source = source;
        this.hbsPos = hbsPos;
        this.kind = "HbsPosition";
        this._charPos = charPos === null ? null : new CharPosition(source, charPos);
      }
      toCharPos() {
        let charPos = this._charPos;
        if (charPos === null) {
          let charPosNumber = this.source.charPosFor(this.hbsPos);
          if (charPosNumber === null) {
            this._charPos = charPos = BROKEN;
          } else {
            this._charPos = charPos = new CharPosition(this.source, charPosNumber);
          }
        }
        return charPos === BROKEN ? null : charPos;
      }
      toJSON() {
        return this.hbsPos;
      }
      wrap() {
        return new SourceOffset(this);
      }
      toHbsPos() {
        return this;
      }
    };
    exports.HbsPosition = HbsPosition;
    var InvisiblePosition = class {
      constructor(kind, pos) {
        this.kind = kind;
        this.pos = pos;
      }
      toCharPos() {
        return null;
      }
      toJSON() {
        return this.pos;
      }
      wrap() {
        return new SourceOffset(this);
      }
      get offset() {
        return null;
      }
    };
    exports.InvisiblePosition = InvisiblePosition;
    var eql = (0, _match.match)((m) => m.when("HbsPosition", "HbsPosition", (_ref, _ref2) => {
      let {
        hbsPos: left
      } = _ref;
      let {
        hbsPos: right
      } = _ref2;
      return left.column === right.column && left.line === right.line;
    }).when("CharPosition", "CharPosition", (_ref3, _ref4) => {
      let {
        charPos: left
      } = _ref3;
      let {
        charPos: right
      } = _ref4;
      return left === right;
    }).when("CharPosition", "HbsPosition", (_ref5, right) => {
      let {
        offset: left
      } = _ref5;
      var _a;
      return left === ((_a = right.toCharPos()) === null || _a === void 0 ? void 0 : _a.offset);
    }).when("HbsPosition", "CharPosition", (left, _ref6) => {
      let {
        offset: right
      } = _ref6;
      var _a;
      return ((_a = left.toCharPos()) === null || _a === void 0 ? void 0 : _a.offset) === right;
    }).when(_match.MatchAny, _match.MatchAny, () => false));
  }
});
var require_span = __commonJS({
  "node_modules/@glimmer/syntax/dist/commonjs/es2017/lib/source/loc/span.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.span = exports.HbsSpan = exports.SourceSpan = void 0;
    var _env = require_es5();
    var _util = require_es2017();
    var _location = require_location();
    var _slice = require_slice();
    var _match = require_match();
    var _offset = require_offset();
    var SourceSpan = class {
      constructor(data) {
        this.data = data;
        this.isInvisible = data.kind !== "CharPosition" && data.kind !== "HbsPosition";
      }
      static get NON_EXISTENT() {
        return new InvisibleSpan("NonExistent", _location.NON_EXISTENT_LOCATION).wrap();
      }
      static load(source, serialized) {
        if (typeof serialized === "number") {
          return SourceSpan.forCharPositions(source, serialized, serialized);
        } else if (typeof serialized === "string") {
          return SourceSpan.synthetic(serialized);
        } else if (Array.isArray(serialized)) {
          return SourceSpan.forCharPositions(source, serialized[0], serialized[1]);
        } else if (serialized === "NonExistent") {
          return SourceSpan.NON_EXISTENT;
        } else if (serialized === "Broken") {
          return SourceSpan.broken(_location.BROKEN_LOCATION);
        }
        (0, _util.assertNever)(serialized);
      }
      static forHbsLoc(source, loc) {
        let start = new _offset.HbsPosition(source, loc.start);
        let end = new _offset.HbsPosition(source, loc.end);
        return new HbsSpan(source, {
          start,
          end
        }, loc).wrap();
      }
      static forCharPositions(source, startPos, endPos) {
        let start = new _offset.CharPosition(source, startPos);
        let end = new _offset.CharPosition(source, endPos);
        return new CharPositionSpan(source, {
          start,
          end
        }).wrap();
      }
      static synthetic(chars) {
        return new InvisibleSpan("InternalsSynthetic", _location.NON_EXISTENT_LOCATION, chars).wrap();
      }
      static broken() {
        let pos = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : _location.BROKEN_LOCATION;
        return new InvisibleSpan("Broken", pos).wrap();
      }
      getStart() {
        return this.data.getStart().wrap();
      }
      getEnd() {
        return this.data.getEnd().wrap();
      }
      get loc() {
        let span2 = this.data.toHbsSpan();
        return span2 === null ? _location.BROKEN_LOCATION : span2.toHbsLoc();
      }
      get module() {
        return this.data.getModule();
      }
      get startPosition() {
        return this.loc.start;
      }
      get endPosition() {
        return this.loc.end;
      }
      toJSON() {
        return this.loc;
      }
      withStart(other) {
        return span(other.data, this.data.getEnd());
      }
      withEnd(other) {
        return span(this.data.getStart(), other.data);
      }
      asString() {
        return this.data.asString();
      }
      toSlice(expected) {
        let chars = this.data.asString();
        if (_env.DEBUG) {
          if (expected !== void 0 && chars !== expected) {
            console.warn(`unexpectedly found ${JSON.stringify(chars)} when slicing source, but expected ${JSON.stringify(expected)}`);
          }
        }
        return new _slice.SourceSlice({
          loc: this,
          chars: expected || chars
        });
      }
      get start() {
        return this.loc.start;
      }
      set start(position) {
        this.data.locDidUpdate({
          start: position
        });
      }
      get end() {
        return this.loc.end;
      }
      set end(position) {
        this.data.locDidUpdate({
          end: position
        });
      }
      get source() {
        return this.module;
      }
      collapse(where) {
        switch (where) {
          case "start":
            return this.getStart().collapsed();
          case "end":
            return this.getEnd().collapsed();
        }
      }
      extend(other) {
        return span(this.data.getStart(), other.data.getEnd());
      }
      serialize() {
        return this.data.serialize();
      }
      slice(_ref7) {
        let {
          skipStart = 0,
          skipEnd = 0
        } = _ref7;
        return span(this.getStart().move(skipStart).data, this.getEnd().move(-skipEnd).data);
      }
      sliceStartChars(_ref8) {
        let {
          skipStart = 0,
          chars
        } = _ref8;
        return span(this.getStart().move(skipStart).data, this.getStart().move(skipStart + chars).data);
      }
      sliceEndChars(_ref9) {
        let {
          skipEnd = 0,
          chars
        } = _ref9;
        return span(this.getEnd().move(skipEnd - chars).data, this.getStart().move(-skipEnd).data);
      }
    };
    exports.SourceSpan = SourceSpan;
    var CharPositionSpan = class {
      constructor(source, charPositions) {
        this.source = source;
        this.charPositions = charPositions;
        this.kind = "CharPosition";
        this._locPosSpan = null;
      }
      wrap() {
        return new SourceSpan(this);
      }
      asString() {
        return this.source.slice(this.charPositions.start.charPos, this.charPositions.end.charPos);
      }
      getModule() {
        return this.source.module;
      }
      getStart() {
        return this.charPositions.start;
      }
      getEnd() {
        return this.charPositions.end;
      }
      locDidUpdate() {
        if (false) {
          console.warn(`updating a location that came from a CharPosition span doesn't work reliably. Don't try to update locations after the plugin phase`);
        }
      }
      toHbsSpan() {
        let locPosSpan = this._locPosSpan;
        if (locPosSpan === null) {
          let start = this.charPositions.start.toHbsPos();
          let end = this.charPositions.end.toHbsPos();
          if (start === null || end === null) {
            locPosSpan = this._locPosSpan = _offset.BROKEN;
          } else {
            locPosSpan = this._locPosSpan = new HbsSpan(this.source, {
              start,
              end
            });
          }
        }
        return locPosSpan === _offset.BROKEN ? null : locPosSpan;
      }
      serialize() {
        let {
          start: {
            charPos: start
          },
          end: {
            charPos: end
          }
        } = this.charPositions;
        if (start === end) {
          return start;
        } else {
          return [start, end];
        }
      }
      toCharPosSpan() {
        return this;
      }
    };
    var HbsSpan = class {
      constructor(source, hbsPositions) {
        let providedHbsLoc = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
        this.source = source;
        this.hbsPositions = hbsPositions;
        this.kind = "HbsPosition";
        this._charPosSpan = null;
        this._providedHbsLoc = providedHbsLoc;
      }
      serialize() {
        let charPos = this.toCharPosSpan();
        return charPos === null ? "Broken" : charPos.wrap().serialize();
      }
      wrap() {
        return new SourceSpan(this);
      }
      updateProvided(pos, edge) {
        if (this._providedHbsLoc) {
          this._providedHbsLoc[edge] = pos;
        }
        this._charPosSpan = null;
        this._providedHbsLoc = {
          start: pos,
          end: pos
        };
      }
      locDidUpdate(_ref10) {
        let {
          start,
          end
        } = _ref10;
        if (start !== void 0) {
          this.updateProvided(start, "start");
          this.hbsPositions.start = new _offset.HbsPosition(this.source, start, null);
        }
        if (end !== void 0) {
          this.updateProvided(end, "end");
          this.hbsPositions.end = new _offset.HbsPosition(this.source, end, null);
        }
      }
      asString() {
        let span2 = this.toCharPosSpan();
        return span2 === null ? "" : span2.asString();
      }
      getModule() {
        return this.source.module;
      }
      getStart() {
        return this.hbsPositions.start;
      }
      getEnd() {
        return this.hbsPositions.end;
      }
      toHbsLoc() {
        return {
          start: this.hbsPositions.start.hbsPos,
          end: this.hbsPositions.end.hbsPos
        };
      }
      toHbsSpan() {
        return this;
      }
      toCharPosSpan() {
        let charPosSpan = this._charPosSpan;
        if (charPosSpan === null) {
          let start = this.hbsPositions.start.toCharPos();
          let end = this.hbsPositions.end.toCharPos();
          if (start && end) {
            charPosSpan = this._charPosSpan = new CharPositionSpan(this.source, {
              start,
              end
            });
          } else {
            charPosSpan = this._charPosSpan = _offset.BROKEN;
            return null;
          }
        }
        return charPosSpan === _offset.BROKEN ? null : charPosSpan;
      }
    };
    exports.HbsSpan = HbsSpan;
    var InvisibleSpan = class {
      constructor(kind, loc) {
        let string = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
        this.kind = kind;
        this.loc = loc;
        this.string = string;
      }
      serialize() {
        switch (this.kind) {
          case "Broken":
          case "NonExistent":
            return this.kind;
          case "InternalsSynthetic":
            return this.string || "";
        }
      }
      wrap() {
        return new SourceSpan(this);
      }
      asString() {
        return this.string || "";
      }
      locDidUpdate(_ref11) {
        let {
          start,
          end
        } = _ref11;
        if (start !== void 0) {
          this.loc.start = start;
        }
        if (end !== void 0) {
          this.loc.end = end;
        }
      }
      getModule() {
        return "an unknown module";
      }
      getStart() {
        return new _offset.InvisiblePosition(this.kind, this.loc.start);
      }
      getEnd() {
        return new _offset.InvisiblePosition(this.kind, this.loc.end);
      }
      toCharPosSpan() {
        return this;
      }
      toHbsSpan() {
        return null;
      }
      toHbsLoc() {
        return _location.BROKEN_LOCATION;
      }
    };
    var span = (0, _match.match)((m) => m.when("HbsPosition", "HbsPosition", (left, right) => new HbsSpan(left.source, {
      start: left,
      end: right
    }).wrap()).when("CharPosition", "CharPosition", (left, right) => new CharPositionSpan(left.source, {
      start: left,
      end: right
    }).wrap()).when("CharPosition", "HbsPosition", (left, right) => {
      let rightCharPos = right.toCharPos();
      if (rightCharPos === null) {
        return new InvisibleSpan("Broken", _location.BROKEN_LOCATION).wrap();
      } else {
        return span(left, rightCharPos);
      }
    }).when("HbsPosition", "CharPosition", (left, right) => {
      let leftCharPos = left.toCharPos();
      if (leftCharPos === null) {
        return new InvisibleSpan("Broken", _location.BROKEN_LOCATION).wrap();
      } else {
        return span(leftCharPos, right);
      }
    }).when(_match.IsInvisible, _match.MatchAny, (left) => new InvisibleSpan(left.kind, _location.BROKEN_LOCATION).wrap()).when(_match.MatchAny, _match.IsInvisible, (_, right) => new InvisibleSpan(right.kind, _location.BROKEN_LOCATION).wrap()));
    exports.span = span;
  }
});
var require_span2 = __commonJS({
  "node_modules/@glimmer/syntax/dist/commonjs/es2017/lib/source/span.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "SourceSpan", {
      enumerable: true,
      get: function() {
        return _span.SourceSpan;
      }
    });
    Object.defineProperty(exports, "SourceOffset", {
      enumerable: true,
      get: function() {
        return _offset.SourceOffset;
      }
    });
    var _span = require_span();
    var _offset = require_offset();
  }
});
var require_source = __commonJS({
  "node_modules/@glimmer/syntax/dist/commonjs/es2017/lib/source/source.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Source = void 0;
    var _env = require_es5();
    var _util = require_es2017();
    var _span = require_span2();
    var Source = class {
      constructor(source) {
        let module2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "an unknown module";
        this.source = source;
        this.module = module2;
      }
      check(offset) {
        return offset >= 0 && offset <= this.source.length;
      }
      slice(start, end) {
        return this.source.slice(start, end);
      }
      offsetFor(line, column) {
        return _span.SourceOffset.forHbsPos(this, {
          line,
          column
        });
      }
      spanFor(_ref12) {
        let {
          start,
          end
        } = _ref12;
        return _span.SourceSpan.forHbsLoc(this, {
          start: {
            line: start.line,
            column: start.column
          },
          end: {
            line: end.line,
            column: end.column
          }
        });
      }
      hbsPosFor(offset) {
        let seenLines = 0;
        let seenChars = 0;
        if (offset > this.source.length) {
          return null;
        }
        while (true) {
          let nextLine = this.source.indexOf("\n", seenChars);
          if (offset <= nextLine || nextLine === -1) {
            return {
              line: seenLines + 1,
              column: offset - seenChars
            };
          } else {
            seenLines += 1;
            seenChars = nextLine + 1;
          }
        }
      }
      charPosFor(position) {
        let {
          line,
          column
        } = position;
        let sourceString = this.source;
        let sourceLength = sourceString.length;
        let seenLines = 0;
        let seenChars = 0;
        while (true) {
          if (seenChars >= sourceLength)
            return sourceLength;
          let nextLine = this.source.indexOf("\n", seenChars);
          if (nextLine === -1)
            nextLine = this.source.length;
          if (seenLines === line - 1) {
            if (seenChars + column > nextLine)
              return nextLine;
            if (_env.DEBUG) {
              let roundTrip = this.hbsPosFor(seenChars + column);
            }
            return seenChars + column;
          } else if (nextLine === -1) {
            return 0;
          } else {
            seenLines += 1;
            seenChars = nextLine + 1;
          }
        }
      }
    };
    exports.Source = Source;
  }
});
var require_legacy_interop = __commonJS({
  "node_modules/@glimmer/syntax/dist/commonjs/es2017/lib/v1/legacy-interop.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.PathExpressionImplV1 = void 0;
    var _publicBuilders = _interopRequireDefault(require_public_builders());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    var PathExpressionImplV1 = class {
      constructor(original, head, tail, loc) {
        this.original = original;
        this.loc = loc;
        this.type = "PathExpression";
        this.this = false;
        this.data = false;
        this._head = void 0;
        let parts = tail.slice();
        if (head.type === "ThisHead") {
          this.this = true;
        } else if (head.type === "AtHead") {
          this.data = true;
          parts.unshift(head.name.slice(1));
        } else {
          parts.unshift(head.name);
        }
        this.parts = parts;
      }
      get head() {
        if (this._head) {
          return this._head;
        }
        let firstPart;
        if (this.this) {
          firstPart = "this";
        } else if (this.data) {
          firstPart = `@${this.parts[0]}`;
        } else {
          firstPart = this.parts[0];
        }
        let firstPartLoc = this.loc.collapse("start").sliceStartChars({
          chars: firstPart.length
        }).loc;
        return this._head = _publicBuilders.default.head(firstPart, firstPartLoc);
      }
      get tail() {
        return this.this ? this.parts : this.parts.slice(1);
      }
    };
    exports.PathExpressionImplV1 = PathExpressionImplV1;
  }
});
var require_public_builders = __commonJS({
  "node_modules/@glimmer/syntax/dist/commonjs/es2017/lib/v1/public-builders.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _util = require_es2017();
    var _location = require_location();
    var _source2 = require_source();
    var _span = require_span2();
    var _legacyInterop = require_legacy_interop();
    var _SOURCE;
    function SOURCE() {
      if (!_SOURCE) {
        _SOURCE = new _source2.Source("", "(synthetic)");
      }
      return _SOURCE;
    }
    function buildMustache(path, params, hash, raw, loc, strip) {
      if (typeof path === "string") {
        path = buildPath(path);
      }
      return {
        type: "MustacheStatement",
        path,
        params: params || [],
        hash: hash || buildHash([]),
        escaped: !raw,
        trusting: !!raw,
        loc: buildLoc(loc || null),
        strip: strip || {
          open: false,
          close: false
        }
      };
    }
    function buildBlock(path, params, hash, _defaultBlock, _elseBlock, loc, openStrip, inverseStrip, closeStrip) {
      let defaultBlock;
      let elseBlock;
      if (_defaultBlock.type === "Template") {
        if (false) {
        }
        defaultBlock = (0, _util.assign)({}, _defaultBlock, {
          type: "Block"
        });
      } else {
        defaultBlock = _defaultBlock;
      }
      if (_elseBlock !== void 0 && _elseBlock !== null && _elseBlock.type === "Template") {
        if (false) {
        }
        elseBlock = (0, _util.assign)({}, _elseBlock, {
          type: "Block"
        });
      } else {
        elseBlock = _elseBlock;
      }
      return {
        type: "BlockStatement",
        path: buildPath(path),
        params: params || [],
        hash: hash || buildHash([]),
        program: defaultBlock || null,
        inverse: elseBlock || null,
        loc: buildLoc(loc || null),
        openStrip: openStrip || {
          open: false,
          close: false
        },
        inverseStrip: inverseStrip || {
          open: false,
          close: false
        },
        closeStrip: closeStrip || {
          open: false,
          close: false
        }
      };
    }
    function buildElementModifier(path, params, hash, loc) {
      return {
        type: "ElementModifierStatement",
        path: buildPath(path),
        params: params || [],
        hash: hash || buildHash([]),
        loc: buildLoc(loc || null)
      };
    }
    function buildPartial(name, params, hash, indent, loc) {
      return {
        type: "PartialStatement",
        name,
        params: params || [],
        hash: hash || buildHash([]),
        indent: indent || "",
        strip: {
          open: false,
          close: false
        },
        loc: buildLoc(loc || null)
      };
    }
    function buildComment(value, loc) {
      return {
        type: "CommentStatement",
        value,
        loc: buildLoc(loc || null)
      };
    }
    function buildMustacheComment(value, loc) {
      return {
        type: "MustacheCommentStatement",
        value,
        loc: buildLoc(loc || null)
      };
    }
    function buildConcat(parts, loc) {
      if (!(0, _util.isPresent)(parts)) {
        throw new Error(`b.concat requires at least one part`);
      }
      return {
        type: "ConcatStatement",
        parts: parts || [],
        loc: buildLoc(loc || null)
      };
    }
    function buildElement(tag) {
      let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      let {
        attrs,
        blockParams,
        modifiers,
        comments,
        children,
        loc
      } = options;
      let tagName;
      let selfClosing = false;
      if (typeof tag === "object") {
        selfClosing = tag.selfClosing;
        tagName = tag.name;
      } else if (tag.slice(-1) === "/") {
        tagName = tag.slice(0, -1);
        selfClosing = true;
      } else {
        tagName = tag;
      }
      return {
        type: "ElementNode",
        tag: tagName,
        selfClosing,
        attributes: attrs || [],
        blockParams: blockParams || [],
        modifiers: modifiers || [],
        comments: comments || [],
        children: children || [],
        loc: buildLoc(loc || null)
      };
    }
    function buildAttr(name, value, loc) {
      return {
        type: "AttrNode",
        name,
        value,
        loc: buildLoc(loc || null)
      };
    }
    function buildText(chars, loc) {
      return {
        type: "TextNode",
        chars: chars || "",
        loc: buildLoc(loc || null)
      };
    }
    function buildSexpr(path, params, hash, loc) {
      return {
        type: "SubExpression",
        path: buildPath(path),
        params: params || [],
        hash: hash || buildHash([]),
        loc: buildLoc(loc || null)
      };
    }
    function headToString(head) {
      switch (head.type) {
        case "AtHead":
          return {
            original: head.name,
            parts: [head.name]
          };
        case "ThisHead":
          return {
            original: `this`,
            parts: []
          };
        case "VarHead":
          return {
            original: head.name,
            parts: [head.name]
          };
      }
    }
    function buildHead(original, loc) {
      let [head, ...tail] = original.split(".");
      let headNode;
      if (head === "this") {
        headNode = {
          type: "ThisHead",
          loc: buildLoc(loc || null)
        };
      } else if (head[0] === "@") {
        headNode = {
          type: "AtHead",
          name: head,
          loc: buildLoc(loc || null)
        };
      } else {
        headNode = {
          type: "VarHead",
          name: head,
          loc: buildLoc(loc || null)
        };
      }
      return {
        head: headNode,
        tail
      };
    }
    function buildThis(loc) {
      return {
        type: "ThisHead",
        loc: buildLoc(loc || null)
      };
    }
    function buildAtName(name, loc) {
      return {
        type: "AtHead",
        name,
        loc: buildLoc(loc || null)
      };
    }
    function buildVar(name, loc) {
      return {
        type: "VarHead",
        name,
        loc: buildLoc(loc || null)
      };
    }
    function buildHeadFromString(head, loc) {
      if (head[0] === "@") {
        return buildAtName(head, loc);
      } else if (head === "this") {
        return buildThis(loc);
      } else {
        return buildVar(head, loc);
      }
    }
    function buildNamedBlockName(name, loc) {
      return {
        type: "NamedBlockName",
        name,
        loc: buildLoc(loc || null)
      };
    }
    function buildCleanPath(head, tail, loc) {
      let {
        original: originalHead,
        parts: headParts
      } = headToString(head);
      let parts = [...headParts, ...tail];
      let original = [...originalHead, ...parts].join(".");
      return new _legacyInterop.PathExpressionImplV1(original, head, tail, buildLoc(loc || null));
    }
    function buildPath(path, loc) {
      if (typeof path !== "string") {
        if ("type" in path) {
          return path;
        } else {
          let {
            head: head2,
            tail: tail2
          } = buildHead(path.head, _span.SourceSpan.broken());
          let {
            original: originalHead
          } = headToString(head2);
          return new _legacyInterop.PathExpressionImplV1([originalHead, ...tail2].join("."), head2, tail2, buildLoc(loc || null));
        }
      }
      let {
        head,
        tail
      } = buildHead(path, _span.SourceSpan.broken());
      return new _legacyInterop.PathExpressionImplV1(path, head, tail, buildLoc(loc || null));
    }
    function buildLiteral(type, value, loc) {
      return {
        type,
        value,
        original: value,
        loc: buildLoc(loc || null)
      };
    }
    function buildHash(pairs, loc) {
      return {
        type: "Hash",
        pairs: pairs || [],
        loc: buildLoc(loc || null)
      };
    }
    function buildPair(key, value, loc) {
      return {
        type: "HashPair",
        key,
        value,
        loc: buildLoc(loc || null)
      };
    }
    function buildProgram(body, blockParams, loc) {
      return {
        type: "Template",
        body: body || [],
        blockParams: blockParams || [],
        loc: buildLoc(loc || null)
      };
    }
    function buildBlockItself(body, blockParams) {
      let chained = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
      let loc = arguments.length > 3 ? arguments[3] : void 0;
      return {
        type: "Block",
        body: body || [],
        blockParams: blockParams || [],
        chained,
        loc: buildLoc(loc || null)
      };
    }
    function buildTemplate(body, blockParams, loc) {
      return {
        type: "Template",
        body: body || [],
        blockParams: blockParams || [],
        loc: buildLoc(loc || null)
      };
    }
    function buildPosition(line, column) {
      return {
        line,
        column
      };
    }
    function buildLoc() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      if (args.length === 1) {
        let loc = args[0];
        if (loc && typeof loc === "object") {
          return _span.SourceSpan.forHbsLoc(SOURCE(), loc);
        } else {
          return _span.SourceSpan.forHbsLoc(SOURCE(), _location.SYNTHETIC_LOCATION);
        }
      } else {
        let [startLine, startColumn, endLine, endColumn, _source] = args;
        let source = _source ? new _source2.Source("", _source) : SOURCE();
        return _span.SourceSpan.forHbsLoc(source, {
          start: {
            line: startLine,
            column: startColumn
          },
          end: {
            line: endLine,
            column: endColumn
          }
        });
      }
    }
    var _default = {
      mustache: buildMustache,
      block: buildBlock,
      partial: buildPartial,
      comment: buildComment,
      mustacheComment: buildMustacheComment,
      element: buildElement,
      elementModifier: buildElementModifier,
      attr: buildAttr,
      text: buildText,
      sexpr: buildSexpr,
      concat: buildConcat,
      hash: buildHash,
      pair: buildPair,
      literal: buildLiteral,
      program: buildProgram,
      blockItself: buildBlockItself,
      template: buildTemplate,
      loc: buildLoc,
      pos: buildPosition,
      path: buildPath,
      fullPath: buildCleanPath,
      head: buildHeadFromString,
      at: buildAtName,
      var: buildVar,
      this: buildThis,
      blockName: buildNamedBlockName,
      string: literal("StringLiteral"),
      boolean: literal("BooleanLiteral"),
      number: literal("NumberLiteral"),
      undefined() {
        return buildLiteral("UndefinedLiteral", void 0);
      },
      null() {
        return buildLiteral("NullLiteral", null);
      }
    };
    exports.default = _default;
    function literal(type) {
      return function(value, loc) {
        return buildLiteral(type, value, loc);
      };
    }
  }
});
var require_nodes_v1 = __commonJS({
  "node_modules/@glimmer/syntax/dist/commonjs/es2017/lib/v1/nodes-v1.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
  }
});
var require_api = __commonJS({
  "node_modules/@glimmer/syntax/dist/commonjs/es2017/lib/v1/api.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _nodesV = require_nodes_v1();
    Object.keys(_nodesV).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _nodesV[key];
        }
      });
    });
  }
});
var require_resolution = __commonJS({
  "node_modules/@glimmer/syntax/dist/commonjs/es2017/lib/v2-a/objects/resolution.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.loadResolution = loadResolution;
    exports.ARGUMENT_RESOLUTION = exports.LooseModeResolution = exports.STRICT_RESOLUTION = exports.StrictResolution = void 0;
    var StrictResolution = class {
      constructor() {
        this.isAngleBracket = false;
      }
      resolution() {
        return 31;
      }
      serialize() {
        return "Strict";
      }
    };
    exports.StrictResolution = StrictResolution;
    var STRICT_RESOLUTION = new StrictResolution();
    exports.STRICT_RESOLUTION = STRICT_RESOLUTION;
    var LooseModeResolution = class {
      constructor(ambiguity) {
        let isAngleBracket = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
        this.ambiguity = ambiguity;
        this.isAngleBracket = isAngleBracket;
      }
      static namespaced(namespace) {
        let isAngleBracket = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
        return new LooseModeResolution({
          namespaces: [namespace],
          fallback: false
        }, isAngleBracket);
      }
      static fallback() {
        return new LooseModeResolution({
          namespaces: [],
          fallback: true
        });
      }
      static append(_ref13) {
        let {
          invoke
        } = _ref13;
        return new LooseModeResolution({
          namespaces: ["Component", "Helper"],
          fallback: !invoke
        });
      }
      static trustingAppend(_ref14) {
        let {
          invoke
        } = _ref14;
        return new LooseModeResolution({
          namespaces: ["Helper"],
          fallback: !invoke
        });
      }
      static attr() {
        return new LooseModeResolution({
          namespaces: ["Helper"],
          fallback: true
        });
      }
      resolution() {
        if (this.ambiguity.namespaces.length === 0) {
          return 31;
        } else if (this.ambiguity.namespaces.length === 1) {
          if (this.ambiguity.fallback) {
            return 36;
          } else {
            switch (this.ambiguity.namespaces[0]) {
              case "Helper":
                return 37;
              case "Modifier":
                return 38;
              case "Component":
                return 39;
            }
          }
        } else if (this.ambiguity.fallback) {
          return 34;
        } else {
          return 35;
        }
      }
      serialize() {
        if (this.ambiguity.namespaces.length === 0) {
          return "Loose";
        } else if (this.ambiguity.namespaces.length === 1) {
          if (this.ambiguity.fallback) {
            return ["ambiguous", "Attr"];
          } else {
            return ["ns", this.ambiguity.namespaces[0]];
          }
        } else if (this.ambiguity.fallback) {
          return ["ambiguous", "Append"];
        } else {
          return ["ambiguous", "Invoke"];
        }
      }
    };
    exports.LooseModeResolution = LooseModeResolution;
    var ARGUMENT_RESOLUTION = LooseModeResolution.fallback();
    exports.ARGUMENT_RESOLUTION = ARGUMENT_RESOLUTION;
    function loadResolution(resolution) {
      if (typeof resolution === "string") {
        switch (resolution) {
          case "Loose":
            return LooseModeResolution.fallback();
          case "Strict":
            return STRICT_RESOLUTION;
        }
      }
      switch (resolution[0]) {
        case "ambiguous":
          switch (resolution[1]) {
            case "Append":
              return LooseModeResolution.append({
                invoke: false
              });
            case "Attr":
              return LooseModeResolution.attr();
            case "Invoke":
              return LooseModeResolution.append({
                invoke: true
              });
          }
        case "ns":
          return LooseModeResolution.namespaced(resolution[1]);
      }
    }
  }
});
var require_node = __commonJS({
  "node_modules/@glimmer/syntax/dist/commonjs/es2017/lib/v2-a/objects/node.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.node = node;
    var _util = require_es2017();
    function node(name) {
      if (name !== void 0) {
        const type = name;
        return {
          fields() {
            return class {
              constructor(fields) {
                this.type = type;
                (0, _util.assign)(this, fields);
              }
            };
          }
        };
      } else {
        return {
          fields() {
            return class {
              constructor(fields) {
                (0, _util.assign)(this, fields);
              }
            };
          }
        };
      }
    }
  }
});
var require_args = __commonJS({
  "node_modules/@glimmer/syntax/dist/commonjs/es2017/lib/v2-a/objects/args.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.NamedArgument = exports.NamedArguments = exports.PositionalArguments = exports.Args = void 0;
    var _node = require_node();
    var Args = class extends (0, _node.node)().fields() {
      static empty(loc) {
        return new Args({
          loc,
          positional: PositionalArguments.empty(loc),
          named: NamedArguments.empty(loc)
        });
      }
      static named(named) {
        return new Args({
          loc: named.loc,
          positional: PositionalArguments.empty(named.loc.collapse("end")),
          named
        });
      }
      nth(offset) {
        return this.positional.nth(offset);
      }
      get(name) {
        return this.named.get(name);
      }
      isEmpty() {
        return this.positional.isEmpty() && this.named.isEmpty();
      }
    };
    exports.Args = Args;
    var PositionalArguments = class extends (0, _node.node)().fields() {
      static empty(loc) {
        return new PositionalArguments({
          loc,
          exprs: []
        });
      }
      get size() {
        return this.exprs.length;
      }
      nth(offset) {
        return this.exprs[offset] || null;
      }
      isEmpty() {
        return this.exprs.length === 0;
      }
    };
    exports.PositionalArguments = PositionalArguments;
    var NamedArguments = class extends (0, _node.node)().fields() {
      static empty(loc) {
        return new NamedArguments({
          loc,
          entries: []
        });
      }
      get size() {
        return this.entries.length;
      }
      get(name) {
        let entry = this.entries.filter((e) => e.name.chars === name)[0];
        return entry ? entry.value : null;
      }
      isEmpty() {
        return this.entries.length === 0;
      }
    };
    exports.NamedArguments = NamedArguments;
    var NamedArgument = class {
      constructor(options) {
        this.loc = options.name.loc.extend(options.value.loc);
        this.name = options.name;
        this.value = options.value;
      }
    };
    exports.NamedArgument = NamedArgument;
  }
});
var require_attr_block = __commonJS({
  "node_modules/@glimmer/syntax/dist/commonjs/es2017/lib/v2-a/objects/attr-block.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ElementModifier = exports.ComponentArg = exports.SplatAttr = exports.HtmlAttr = void 0;
    var _args = require_args();
    var _node = require_node();
    var HtmlAttr = class extends (0, _node.node)("HtmlAttr").fields() {
    };
    exports.HtmlAttr = HtmlAttr;
    var SplatAttr = class extends (0, _node.node)("SplatAttr").fields() {
    };
    exports.SplatAttr = SplatAttr;
    var ComponentArg = class extends (0, _node.node)().fields() {
      toNamedArgument() {
        return new _args.NamedArgument({
          name: this.name,
          value: this.value
        });
      }
    };
    exports.ComponentArg = ComponentArg;
    var ElementModifier = class extends (0, _node.node)("ElementModifier").fields() {
    };
    exports.ElementModifier = ElementModifier;
  }
});
var require_base = __commonJS({
  "node_modules/@glimmer/syntax/dist/commonjs/es2017/lib/v2-a/objects/base.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
  }
});
var require_span_list = __commonJS({
  "node_modules/@glimmer/syntax/dist/commonjs/es2017/lib/source/span-list.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.loc = loc;
    exports.hasSpan = hasSpan;
    exports.maybeLoc = maybeLoc;
    exports.SpanList = void 0;
    var _span = require_span2();
    var SpanList = class {
      constructor() {
        let span = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
        this._span = span;
      }
      static range(span) {
        let fallback = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : _span.SourceSpan.NON_EXISTENT;
        return new SpanList(span.map(loc)).getRangeOffset(fallback);
      }
      add(offset) {
        this._span.push(offset);
      }
      getRangeOffset(fallback) {
        if (this._span.length === 0) {
          return fallback;
        } else {
          let first = this._span[0];
          let last = this._span[this._span.length - 1];
          return first.extend(last);
        }
      }
    };
    exports.SpanList = SpanList;
    function loc(span) {
      if (Array.isArray(span)) {
        let first = span[0];
        let last = span[span.length - 1];
        return loc(first).extend(loc(last));
      } else if (span instanceof _span.SourceSpan) {
        return span;
      } else {
        return span.loc;
      }
    }
    function hasSpan(span) {
      if (Array.isArray(span) && span.length === 0) {
        return false;
      }
      return true;
    }
    function maybeLoc(location, fallback) {
      if (hasSpan(location)) {
        return loc(location);
      } else {
        return fallback;
      }
    }
  }
});
var require_content = __commonJS({
  "node_modules/@glimmer/syntax/dist/commonjs/es2017/lib/v2-a/objects/content.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SimpleElement = exports.InvokeComponent = exports.InvokeBlock = exports.AppendContent = exports.HtmlComment = exports.HtmlText = exports.GlimmerComment = void 0;
    var _spanList = require_span_list();
    var _args = require_args();
    var _node = require_node();
    var GlimmerComment = class extends (0, _node.node)("GlimmerComment").fields() {
    };
    exports.GlimmerComment = GlimmerComment;
    var HtmlText = class extends (0, _node.node)("HtmlText").fields() {
    };
    exports.HtmlText = HtmlText;
    var HtmlComment = class extends (0, _node.node)("HtmlComment").fields() {
    };
    exports.HtmlComment = HtmlComment;
    var AppendContent = class extends (0, _node.node)("AppendContent").fields() {
      get callee() {
        if (this.value.type === "Call") {
          return this.value.callee;
        } else {
          return this.value;
        }
      }
      get args() {
        if (this.value.type === "Call") {
          return this.value.args;
        } else {
          return _args.Args.empty(this.value.loc.collapse("end"));
        }
      }
    };
    exports.AppendContent = AppendContent;
    var InvokeBlock = class extends (0, _node.node)("InvokeBlock").fields() {
    };
    exports.InvokeBlock = InvokeBlock;
    var InvokeComponent = class extends (0, _node.node)("InvokeComponent").fields() {
      get args() {
        let entries = this.componentArgs.map((a) => a.toNamedArgument());
        return _args.Args.named(new _args.NamedArguments({
          loc: _spanList.SpanList.range(entries, this.callee.loc.collapse("end")),
          entries
        }));
      }
    };
    exports.InvokeComponent = InvokeComponent;
    var SimpleElement = class extends (0, _node.node)("SimpleElement").fields() {
      get args() {
        let entries = this.componentArgs.map((a) => a.toNamedArgument());
        return _args.Args.named(new _args.NamedArguments({
          loc: _spanList.SpanList.range(entries, this.tag.loc.collapse("end")),
          entries
        }));
      }
    };
    exports.SimpleElement = SimpleElement;
  }
});
var require_expr = __commonJS({
  "node_modules/@glimmer/syntax/dist/commonjs/es2017/lib/v2-a/objects/expr.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.isLiteral = isLiteral;
    exports.InterpolateExpression = exports.DeprecatedCallExpression = exports.CallExpression = exports.PathExpression = exports.LiteralExpression = void 0;
    var _slice = require_slice();
    var _node = require_node();
    var LiteralExpression = class extends (0, _node.node)("Literal").fields() {
      toSlice() {
        return new _slice.SourceSlice({
          loc: this.loc,
          chars: this.value
        });
      }
    };
    exports.LiteralExpression = LiteralExpression;
    function isLiteral(node, kind) {
      if (node.type === "Literal") {
        if (kind === void 0) {
          return true;
        } else if (kind === "null") {
          return node.value === null;
        } else {
          return typeof node.value === kind;
        }
      } else {
        return false;
      }
    }
    var PathExpression = class extends (0, _node.node)("Path").fields() {
    };
    exports.PathExpression = PathExpression;
    var CallExpression = class extends (0, _node.node)("Call").fields() {
    };
    exports.CallExpression = CallExpression;
    var DeprecatedCallExpression = class extends (0, _node.node)("DeprecatedCall").fields() {
    };
    exports.DeprecatedCallExpression = DeprecatedCallExpression;
    var InterpolateExpression = class extends (0, _node.node)("Interpolate").fields() {
    };
    exports.InterpolateExpression = InterpolateExpression;
  }
});
var require_refs = __commonJS({
  "node_modules/@glimmer/syntax/dist/commonjs/es2017/lib/v2-a/objects/refs.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.FreeVarReference = exports.LocalVarReference = exports.ArgReference = exports.ThisReference = void 0;
    var _node = require_node();
    var ThisReference = class extends (0, _node.node)("This").fields() {
    };
    exports.ThisReference = ThisReference;
    var ArgReference = class extends (0, _node.node)("Arg").fields() {
    };
    exports.ArgReference = ArgReference;
    var LocalVarReference = class extends (0, _node.node)("Local").fields() {
    };
    exports.LocalVarReference = LocalVarReference;
    var FreeVarReference = class extends (0, _node.node)("Free").fields() {
    };
    exports.FreeVarReference = FreeVarReference;
  }
});
var require_internal_node = __commonJS({
  "node_modules/@glimmer/syntax/dist/commonjs/es2017/lib/v2-a/objects/internal-node.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.NamedBlock = exports.NamedBlocks = exports.Block = exports.Template = void 0;
    var _spanList = require_span_list();
    var _args = require_args();
    var _node = require_node();
    var Template = class extends (0, _node.node)().fields() {
    };
    exports.Template = Template;
    var Block = class extends (0, _node.node)().fields() {
    };
    exports.Block = Block;
    var NamedBlocks = class extends (0, _node.node)().fields() {
      get(name) {
        return this.blocks.filter((block) => block.name.chars === name)[0] || null;
      }
    };
    exports.NamedBlocks = NamedBlocks;
    var NamedBlock = class extends (0, _node.node)().fields() {
      get args() {
        let entries = this.componentArgs.map((a) => a.toNamedArgument());
        return _args.Args.named(new _args.NamedArguments({
          loc: _spanList.SpanList.range(entries, this.name.loc.collapse("end")),
          entries
        }));
      }
    };
    exports.NamedBlock = NamedBlock;
  }
});
var require_api2 = __commonJS({
  "node_modules/@glimmer/syntax/dist/commonjs/es2017/lib/v2-a/api.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _resolution = require_resolution();
    Object.keys(_resolution).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _resolution[key];
        }
      });
    });
    var _node = require_node();
    Object.keys(_node).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _node[key];
        }
      });
    });
    var _args = require_args();
    Object.keys(_args).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _args[key];
        }
      });
    });
    var _attrBlock = require_attr_block();
    Object.keys(_attrBlock).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _attrBlock[key];
        }
      });
    });
    var _base = require_base();
    Object.keys(_base).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _base[key];
        }
      });
    });
    var _content = require_content();
    Object.keys(_content).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _content[key];
        }
      });
    });
    var _expr = require_expr();
    Object.keys(_expr).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _expr[key];
        }
      });
    });
    var _refs = require_refs();
    Object.keys(_refs).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _refs[key];
        }
      });
    });
    var _internalNode = require_internal_node();
    Object.keys(_internalNode).forEach(function(key) {
      if (key === "default" || key === "__esModule")
        return;
      Object.defineProperty(exports, key, {
        enumerable: true,
        get: function() {
          return _internalNode[key];
        }
      });
    });
  }
});
var require_util = __commonJS({
  "node_modules/@glimmer/syntax/dist/commonjs/es2017/lib/generation/util.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.escapeAttrValue = escapeAttrValue;
    exports.escapeText = escapeText;
    exports.sortByLoc = sortByLoc;
    var ATTR_VALUE_REGEX_TEST = /[\xA0"&]/;
    var ATTR_VALUE_REGEX_REPLACE = new RegExp(ATTR_VALUE_REGEX_TEST.source, "g");
    var TEXT_REGEX_TEST = /[\xA0&<>]/;
    var TEXT_REGEX_REPLACE = new RegExp(TEXT_REGEX_TEST.source, "g");
    function attrValueReplacer(char) {
      switch (char.charCodeAt(0)) {
        case 160:
          return "&nbsp;";
        case 34:
          return "&quot;";
        case 38:
          return "&amp;";
        default:
          return char;
      }
    }
    function textReplacer(char) {
      switch (char.charCodeAt(0)) {
        case 160:
          return "&nbsp;";
        case 38:
          return "&amp;";
        case 60:
          return "&lt;";
        case 62:
          return "&gt;";
        default:
          return char;
      }
    }
    function escapeAttrValue(attrValue) {
      if (ATTR_VALUE_REGEX_TEST.test(attrValue)) {
        return attrValue.replace(ATTR_VALUE_REGEX_REPLACE, attrValueReplacer);
      }
      return attrValue;
    }
    function escapeText(text) {
      if (TEXT_REGEX_TEST.test(text)) {
        return text.replace(TEXT_REGEX_REPLACE, textReplacer);
      }
      return text;
    }
    function sortByLoc(a, b) {
      if (a.loc.isInvisible || b.loc.isInvisible) {
        return 0;
      }
      if (a.loc.startPosition.line < b.loc.startPosition.line) {
        return -1;
      }
      if (a.loc.startPosition.line === b.loc.startPosition.line && a.loc.startPosition.column < b.loc.startPosition.column) {
        return -1;
      }
      if (a.loc.startPosition.line === b.loc.startPosition.line && a.loc.startPosition.column === b.loc.startPosition.column) {
        return 0;
      }
      return 1;
    }
  }
});
var require_printer = __commonJS({
  "node_modules/@glimmer/syntax/dist/commonjs/es2017/lib/generation/printer.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = exports.voidMap = void 0;
    var _util = require_util();
    var voidMap = /* @__PURE__ */ Object.create(null);
    exports.voidMap = voidMap;
    var voidTagNames = "area base br col command embed hr img input keygen link meta param source track wbr";
    voidTagNames.split(" ").forEach((tagName) => {
      voidMap[tagName] = true;
    });
    var NON_WHITESPACE = /\S/;
    var Printer = class {
      constructor(options) {
        this.buffer = "";
        this.options = options;
      }
      handledByOverride(node) {
        let ensureLeadingWhitespace = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
        if (this.options.override !== void 0) {
          let result = this.options.override(node, this.options);
          if (typeof result === "string") {
            if (ensureLeadingWhitespace && result !== "" && NON_WHITESPACE.test(result[0])) {
              result = ` ${result}`;
            }
            this.buffer += result;
            return true;
          }
        }
        return false;
      }
      Node(node) {
        switch (node.type) {
          case "MustacheStatement":
          case "BlockStatement":
          case "PartialStatement":
          case "MustacheCommentStatement":
          case "CommentStatement":
          case "TextNode":
          case "ElementNode":
          case "AttrNode":
          case "Block":
          case "Template":
            return this.TopLevelStatement(node);
          case "StringLiteral":
          case "BooleanLiteral":
          case "NumberLiteral":
          case "UndefinedLiteral":
          case "NullLiteral":
          case "PathExpression":
          case "SubExpression":
            return this.Expression(node);
          case "Program":
            return this.Block(node);
          case "ConcatStatement":
            return this.ConcatStatement(node);
          case "Hash":
            return this.Hash(node);
          case "HashPair":
            return this.HashPair(node);
          case "ElementModifierStatement":
            return this.ElementModifierStatement(node);
        }
      }
      Expression(expression) {
        switch (expression.type) {
          case "StringLiteral":
          case "BooleanLiteral":
          case "NumberLiteral":
          case "UndefinedLiteral":
          case "NullLiteral":
            return this.Literal(expression);
          case "PathExpression":
            return this.PathExpression(expression);
          case "SubExpression":
            return this.SubExpression(expression);
        }
      }
      Literal(literal) {
        switch (literal.type) {
          case "StringLiteral":
            return this.StringLiteral(literal);
          case "BooleanLiteral":
            return this.BooleanLiteral(literal);
          case "NumberLiteral":
            return this.NumberLiteral(literal);
          case "UndefinedLiteral":
            return this.UndefinedLiteral(literal);
          case "NullLiteral":
            return this.NullLiteral(literal);
        }
      }
      TopLevelStatement(statement) {
        switch (statement.type) {
          case "MustacheStatement":
            return this.MustacheStatement(statement);
          case "BlockStatement":
            return this.BlockStatement(statement);
          case "PartialStatement":
            return this.PartialStatement(statement);
          case "MustacheCommentStatement":
            return this.MustacheCommentStatement(statement);
          case "CommentStatement":
            return this.CommentStatement(statement);
          case "TextNode":
            return this.TextNode(statement);
          case "ElementNode":
            return this.ElementNode(statement);
          case "Block":
          case "Template":
            return this.Block(statement);
          case "AttrNode":
            return this.AttrNode(statement);
        }
      }
      Block(block) {
        if (block.chained) {
          let firstChild = block.body[0];
          firstChild.chained = true;
        }
        if (this.handledByOverride(block)) {
          return;
        }
        this.TopLevelStatements(block.body);
      }
      TopLevelStatements(statements) {
        statements.forEach((statement) => this.TopLevelStatement(statement));
      }
      ElementNode(el) {
        if (this.handledByOverride(el)) {
          return;
        }
        this.OpenElementNode(el);
        this.TopLevelStatements(el.children);
        this.CloseElementNode(el);
      }
      OpenElementNode(el) {
        this.buffer += `<${el.tag}`;
        const parts = [...el.attributes, ...el.modifiers, ...el.comments].sort(_util.sortByLoc);
        for (const part of parts) {
          this.buffer += " ";
          switch (part.type) {
            case "AttrNode":
              this.AttrNode(part);
              break;
            case "ElementModifierStatement":
              this.ElementModifierStatement(part);
              break;
            case "MustacheCommentStatement":
              this.MustacheCommentStatement(part);
              break;
          }
        }
        if (el.blockParams.length) {
          this.BlockParams(el.blockParams);
        }
        if (el.selfClosing) {
          this.buffer += " /";
        }
        this.buffer += ">";
      }
      CloseElementNode(el) {
        if (el.selfClosing || voidMap[el.tag.toLowerCase()]) {
          return;
        }
        this.buffer += `</${el.tag}>`;
      }
      AttrNode(attr) {
        if (this.handledByOverride(attr)) {
          return;
        }
        let {
          name,
          value
        } = attr;
        this.buffer += name;
        if (value.type !== "TextNode" || value.chars.length > 0) {
          this.buffer += "=";
          this.AttrNodeValue(value);
        }
      }
      AttrNodeValue(value) {
        if (value.type === "TextNode") {
          this.buffer += '"';
          this.TextNode(value, true);
          this.buffer += '"';
        } else {
          this.Node(value);
        }
      }
      TextNode(text, isAttr) {
        if (this.handledByOverride(text)) {
          return;
        }
        if (this.options.entityEncoding === "raw") {
          this.buffer += text.chars;
        } else if (isAttr) {
          this.buffer += (0, _util.escapeAttrValue)(text.chars);
        } else {
          this.buffer += (0, _util.escapeText)(text.chars);
        }
      }
      MustacheStatement(mustache) {
        if (this.handledByOverride(mustache)) {
          return;
        }
        this.buffer += mustache.escaped ? "{{" : "{{{";
        if (mustache.strip.open) {
          this.buffer += "~";
        }
        this.Expression(mustache.path);
        this.Params(mustache.params);
        this.Hash(mustache.hash);
        if (mustache.strip.close) {
          this.buffer += "~";
        }
        this.buffer += mustache.escaped ? "}}" : "}}}";
      }
      BlockStatement(block) {
        if (this.handledByOverride(block)) {
          return;
        }
        if (block.chained) {
          this.buffer += block.inverseStrip.open ? "{{~" : "{{";
          this.buffer += "else ";
        } else {
          this.buffer += block.openStrip.open ? "{{~#" : "{{#";
        }
        this.Expression(block.path);
        this.Params(block.params);
        this.Hash(block.hash);
        if (block.program.blockParams.length) {
          this.BlockParams(block.program.blockParams);
        }
        if (block.chained) {
          this.buffer += block.inverseStrip.close ? "~}}" : "}}";
        } else {
          this.buffer += block.openStrip.close ? "~}}" : "}}";
        }
        this.Block(block.program);
        if (block.inverse) {
          if (!block.inverse.chained) {
            this.buffer += block.inverseStrip.open ? "{{~" : "{{";
            this.buffer += "else";
            this.buffer += block.inverseStrip.close ? "~}}" : "}}";
          }
          this.Block(block.inverse);
        }
        if (!block.chained) {
          this.buffer += block.closeStrip.open ? "{{~/" : "{{/";
          this.Expression(block.path);
          this.buffer += block.closeStrip.close ? "~}}" : "}}";
        }
      }
      BlockParams(blockParams) {
        this.buffer += ` as |${blockParams.join(" ")}|`;
      }
      PartialStatement(partial) {
        if (this.handledByOverride(partial)) {
          return;
        }
        this.buffer += "{{>";
        this.Expression(partial.name);
        this.Params(partial.params);
        this.Hash(partial.hash);
        this.buffer += "}}";
      }
      ConcatStatement(concat) {
        if (this.handledByOverride(concat)) {
          return;
        }
        this.buffer += '"';
        concat.parts.forEach((part) => {
          if (part.type === "TextNode") {
            this.TextNode(part, true);
          } else {
            this.Node(part);
          }
        });
        this.buffer += '"';
      }
      MustacheCommentStatement(comment) {
        if (this.handledByOverride(comment)) {
          return;
        }
        this.buffer += `{{!--${comment.value}--}}`;
      }
      ElementModifierStatement(mod) {
        if (this.handledByOverride(mod)) {
          return;
        }
        this.buffer += "{{";
        this.Expression(mod.path);
        this.Params(mod.params);
        this.Hash(mod.hash);
        this.buffer += "}}";
      }
      CommentStatement(comment) {
        if (this.handledByOverride(comment)) {
          return;
        }
        this.buffer += `<!--${comment.value}-->`;
      }
      PathExpression(path) {
        if (this.handledByOverride(path)) {
          return;
        }
        this.buffer += path.original;
      }
      SubExpression(sexp) {
        if (this.handledByOverride(sexp)) {
          return;
        }
        this.buffer += "(";
        this.Expression(sexp.path);
        this.Params(sexp.params);
        this.Hash(sexp.hash);
        this.buffer += ")";
      }
      Params(params) {
        if (params.length) {
          params.forEach((param) => {
            this.buffer += " ";
            this.Expression(param);
          });
        }
      }
      Hash(hash) {
        if (this.handledByOverride(hash, true)) {
          return;
        }
        hash.pairs.forEach((pair) => {
          this.buffer += " ";
          this.HashPair(pair);
        });
      }
      HashPair(pair) {
        if (this.handledByOverride(pair)) {
          return;
        }
        this.buffer += pair.key;
        this.buffer += "=";
        this.Node(pair.value);
      }
      StringLiteral(str) {
        if (this.handledByOverride(str)) {
          return;
        }
        this.buffer += JSON.stringify(str.value);
      }
      BooleanLiteral(bool) {
        if (this.handledByOverride(bool)) {
          return;
        }
        this.buffer += bool.value;
      }
      NumberLiteral(number) {
        if (this.handledByOverride(number)) {
          return;
        }
        this.buffer += number.value;
      }
      UndefinedLiteral(node) {
        if (this.handledByOverride(node)) {
          return;
        }
        this.buffer += "undefined";
      }
      NullLiteral(node) {
        if (this.handledByOverride(node)) {
          return;
        }
        this.buffer += "null";
      }
      print(node) {
        let {
          options
        } = this;
        if (options.override) {
          let result = options.override(node, options);
          if (result !== void 0) {
            return result;
          }
        }
        this.buffer = "";
        this.Node(node);
        return this.buffer;
      }
    };
    exports.default = Printer;
  }
});
var require_exception = __commonJS({
  "node_modules/@handlebars/parser/dist/cjs/exception.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var errorProps = ["description", "fileName", "lineNumber", "endLineNumber", "message", "name", "number", "stack"];
    function Exception(message, node) {
      var loc = node && node.loc, line, endLineNumber, column, endColumn;
      if (loc) {
        line = loc.start.line;
        endLineNumber = loc.end.line;
        column = loc.start.column;
        endColumn = loc.end.column;
        message += " - " + line + ":" + column;
      }
      var tmp = Error.prototype.constructor.call(this, message);
      for (var idx = 0; idx < errorProps.length; idx++) {
        this[errorProps[idx]] = tmp[errorProps[idx]];
      }
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, Exception);
      }
      try {
        if (loc) {
          this.lineNumber = line;
          this.endLineNumber = endLineNumber;
          if (Object.defineProperty) {
            Object.defineProperty(this, "column", {
              value: column,
              enumerable: true
            });
            Object.defineProperty(this, "endColumn", {
              value: endColumn,
              enumerable: true
            });
          } else {
            this.column = column;
            this.endColumn = endColumn;
          }
        }
      } catch (nop) {
      }
    }
    Exception.prototype = new Error();
    exports.default = Exception;
  }
});
var require_visitor = __commonJS({
  "node_modules/@handlebars/parser/dist/cjs/visitor.js"(exports) {
    "use strict";
    init_define_process();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var exception_1 = __importDefault(require_exception());
    function Visitor() {
      this.parents = [];
    }
    Visitor.prototype = {
      constructor: Visitor,
      mutating: false,
      acceptKey: function(node, name) {
        var value = this.accept(node[name]);
        if (this.mutating) {
          if (value && !Visitor.prototype[value.type]) {
            throw new exception_1.default('Unexpected node type "' + value.type + '" found when accepting ' + name + " on " + node.type);
          }
          node[name] = value;
        }
      },
      acceptRequired: function(node, name) {
        this.acceptKey(node, name);
        if (!node[name]) {
          throw new exception_1.default(node.type + " requires " + name);
        }
      },
      acceptArray: function(array) {
        for (var i = 0, l = array.length; i < l; i++) {
          this.acceptKey(array, i);
          if (!array[i]) {
            array.splice(i, 1);
            i--;
            l--;
          }
        }
      },
      accept: function(object) {
        if (!object) {
          return;
        }
        if (!this[object.type]) {
          throw new exception_1.default("Unknown type: " + object.type, object);
        }
        if (this.current) {
          this.parents.unshift(this.current);
        }
        this.current = object;
        var ret = this[object.type](object);
        this.current = this.parents.shift();
        if (!this.mutating || ret) {
          return ret;
        } else if (ret !== false) {
          return object;
        }
      },
      Program: function(program) {
        this.acceptArray(program.body);
      },
      MustacheStatement: visitSubExpression,
      Decorator: visitSubExpression,
      BlockStatement: visitBlock,
      DecoratorBlock: visitBlock,
      PartialStatement: visitPartial,
      PartialBlockStatement: function(partial) {
        visitPartial.call(this, partial);
        this.acceptKey(partial, "program");
      },
      ContentStatement: function() {
      },
      CommentStatement: function() {
      },
      SubExpression: visitSubExpression,
      PathExpression: function() {
      },
      StringLiteral: function() {
      },
      NumberLiteral: function() {
      },
      BooleanLiteral: function() {
      },
      UndefinedLiteral: function() {
      },
      NullLiteral: function() {
      },
      Hash: function(hash) {
        this.acceptArray(hash.pairs);
      },
      HashPair: function(pair) {
        this.acceptRequired(pair, "value");
      }
    };
    function visitSubExpression(mustache) {
      this.acceptRequired(mustache, "path");
      this.acceptArray(mustache.params);
      this.acceptKey(mustache, "hash");
    }
    function visitBlock(block) {
      visitSubExpression.call(this, block);
      this.acceptKey(block, "program");
      this.acceptKey(block, "inverse");
    }
    function visitPartial(partial) {
      this.acceptRequired(partial, "name");
      this.acceptArray(partial.params);
      this.acceptKey(partial, "hash");
    }
    exports.default = Visitor;
  }
});
var require_whitespace_control = __commonJS({
  "node_modules/@handlebars/parser/dist/cjs/whitespace-control.js"(exports) {
    "use strict";
    init_define_process();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var visitor_1 = __importDefault(require_visitor());
    function WhitespaceControl(options) {
      if (options === void 0) {
        options = {};
      }
      this.options = options;
    }
    WhitespaceControl.prototype = new visitor_1.default();
    WhitespaceControl.prototype.Program = function(program) {
      var doStandalone = !this.options.ignoreStandalone;
      var isRoot = !this.isRootSeen;
      this.isRootSeen = true;
      var body = program.body;
      for (var i = 0, l = body.length; i < l; i++) {
        var current = body[i], strip = this.accept(current);
        if (!strip) {
          continue;
        }
        var _isPrevWhitespace = isPrevWhitespace(body, i, isRoot), _isNextWhitespace = isNextWhitespace(body, i, isRoot), openStandalone = strip.openStandalone && _isPrevWhitespace, closeStandalone = strip.closeStandalone && _isNextWhitespace, inlineStandalone = strip.inlineStandalone && _isPrevWhitespace && _isNextWhitespace;
        if (strip.close) {
          omitRight(body, i, true);
        }
        if (strip.open) {
          omitLeft(body, i, true);
        }
        if (doStandalone && inlineStandalone) {
          omitRight(body, i);
          if (omitLeft(body, i)) {
            if (current.type === "PartialStatement") {
              current.indent = /([ \t]+$)/.exec(body[i - 1].original)[1];
            }
          }
        }
        if (doStandalone && openStandalone) {
          omitRight((current.program || current.inverse).body);
          omitLeft(body, i);
        }
        if (doStandalone && closeStandalone) {
          omitRight(body, i);
          omitLeft((current.inverse || current.program).body);
        }
      }
      return program;
    };
    WhitespaceControl.prototype.BlockStatement = WhitespaceControl.prototype.DecoratorBlock = WhitespaceControl.prototype.PartialBlockStatement = function(block) {
      this.accept(block.program);
      this.accept(block.inverse);
      var program = block.program || block.inverse, inverse = block.program && block.inverse, firstInverse = inverse, lastInverse = inverse;
      if (inverse && inverse.chained) {
        firstInverse = inverse.body[0].program;
        while (lastInverse.chained) {
          lastInverse = lastInverse.body[lastInverse.body.length - 1].program;
        }
      }
      var strip = {
        open: block.openStrip.open,
        close: block.closeStrip.close,
        openStandalone: isNextWhitespace(program.body),
        closeStandalone: isPrevWhitespace((firstInverse || program).body)
      };
      if (block.openStrip.close) {
        omitRight(program.body, null, true);
      }
      if (inverse) {
        var inverseStrip = block.inverseStrip;
        if (inverseStrip.open) {
          omitLeft(program.body, null, true);
        }
        if (inverseStrip.close) {
          omitRight(firstInverse.body, null, true);
        }
        if (block.closeStrip.open) {
          omitLeft(lastInverse.body, null, true);
        }
        if (!this.options.ignoreStandalone && isPrevWhitespace(program.body) && isNextWhitespace(firstInverse.body)) {
          omitLeft(program.body);
          omitRight(firstInverse.body);
        }
      } else if (block.closeStrip.open) {
        omitLeft(program.body, null, true);
      }
      return strip;
    };
    WhitespaceControl.prototype.Decorator = WhitespaceControl.prototype.MustacheStatement = function(mustache) {
      return mustache.strip;
    };
    WhitespaceControl.prototype.PartialStatement = WhitespaceControl.prototype.CommentStatement = function(node) {
      var strip = node.strip || {};
      return {
        inlineStandalone: true,
        open: strip.open,
        close: strip.close
      };
    };
    function isPrevWhitespace(body, i, isRoot) {
      if (i === void 0) {
        i = body.length;
      }
      var prev = body[i - 1], sibling = body[i - 2];
      if (!prev) {
        return isRoot;
      }
      if (prev.type === "ContentStatement") {
        return (sibling || !isRoot ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(prev.original);
      }
    }
    function isNextWhitespace(body, i, isRoot) {
      if (i === void 0) {
        i = -1;
      }
      var next = body[i + 1], sibling = body[i + 2];
      if (!next) {
        return isRoot;
      }
      if (next.type === "ContentStatement") {
        return (sibling || !isRoot ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(next.original);
      }
    }
    function omitRight(body, i, multiple) {
      var current = body[i == null ? 0 : i + 1];
      if (!current || current.type !== "ContentStatement" || !multiple && current.rightStripped) {
        return;
      }
      var original = current.value;
      current.value = current.value.replace(multiple ? /^\s+/ : /^[ \t]*\r?\n?/, "");
      current.rightStripped = current.value !== original;
    }
    function omitLeft(body, i, multiple) {
      var current = body[i == null ? body.length - 1 : i - 1];
      if (!current || current.type !== "ContentStatement" || !multiple && current.leftStripped) {
        return;
      }
      var original = current.value;
      current.value = current.value.replace(multiple ? /\s+$/ : /[ \t]+$/, "");
      current.leftStripped = current.value !== original;
      return current.leftStripped;
    }
    exports.default = WhitespaceControl;
  }
});
var require_parser = __commonJS({
  "node_modules/@handlebars/parser/dist/cjs/parser.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var parser = function() {
      var o = function(k, v, o2, l) {
        for (o2 = o2 || {}, l = k.length; l--; o2[k[l]] = v)
          ;
        return o2;
      }, $V0 = [2, 44], $V1 = [1, 20], $V2 = [5, 14, 15, 19, 29, 34, 39, 44, 47, 48, 52, 56, 60], $V3 = [1, 35], $V4 = [1, 38], $V5 = [1, 30], $V6 = [1, 31], $V7 = [1, 32], $V8 = [1, 33], $V9 = [1, 34], $Va = [1, 37], $Vb = [14, 15, 19, 29, 34, 39, 44, 47, 48, 52, 56, 60], $Vc = [14, 15, 19, 29, 34, 44, 47, 48, 52, 56, 60], $Vd = [15, 18], $Ve = [14, 15, 19, 29, 34, 47, 48, 52, 56, 60], $Vf = [33, 64, 71, 79, 80, 81, 82, 83, 84], $Vg = [23, 33, 55, 64, 67, 71, 74, 79, 80, 81, 82, 83, 84], $Vh = [1, 51], $Vi = [23, 33, 55, 64, 67, 71, 74, 79, 80, 81, 82, 83, 84, 86], $Vj = [2, 43], $Vk = [55, 64, 71, 79, 80, 81, 82, 83, 84], $Vl = [1, 58], $Vm = [1, 59], $Vn = [1, 66], $Vo = [33, 64, 71, 74, 79, 80, 81, 82, 83, 84], $Vp = [23, 64, 71, 79, 80, 81, 82, 83, 84], $Vq = [1, 76], $Vr = [64, 67, 71, 79, 80, 81, 82, 83, 84], $Vs = [33, 74], $Vt = [23, 33, 55, 67, 71, 74], $Vu = [1, 106], $Vv = [1, 118], $Vw = [71, 76];
      var parser2 = {
        trace: function trace() {
        },
        yy: {},
        symbols_: {
          "error": 2,
          "root": 3,
          "program": 4,
          "EOF": 5,
          "program_repetition0": 6,
          "statement": 7,
          "mustache": 8,
          "block": 9,
          "rawBlock": 10,
          "partial": 11,
          "partialBlock": 12,
          "content": 13,
          "COMMENT": 14,
          "CONTENT": 15,
          "openRawBlock": 16,
          "rawBlock_repetition0": 17,
          "END_RAW_BLOCK": 18,
          "OPEN_RAW_BLOCK": 19,
          "helperName": 20,
          "openRawBlock_repetition0": 21,
          "openRawBlock_option0": 22,
          "CLOSE_RAW_BLOCK": 23,
          "openBlock": 24,
          "block_option0": 25,
          "closeBlock": 26,
          "openInverse": 27,
          "block_option1": 28,
          "OPEN_BLOCK": 29,
          "openBlock_repetition0": 30,
          "openBlock_option0": 31,
          "openBlock_option1": 32,
          "CLOSE": 33,
          "OPEN_INVERSE": 34,
          "openInverse_repetition0": 35,
          "openInverse_option0": 36,
          "openInverse_option1": 37,
          "openInverseChain": 38,
          "OPEN_INVERSE_CHAIN": 39,
          "openInverseChain_repetition0": 40,
          "openInverseChain_option0": 41,
          "openInverseChain_option1": 42,
          "inverseAndProgram": 43,
          "INVERSE": 44,
          "inverseChain": 45,
          "inverseChain_option0": 46,
          "OPEN_ENDBLOCK": 47,
          "OPEN": 48,
          "expr": 49,
          "mustache_repetition0": 50,
          "mustache_option0": 51,
          "OPEN_UNESCAPED": 52,
          "mustache_repetition1": 53,
          "mustache_option1": 54,
          "CLOSE_UNESCAPED": 55,
          "OPEN_PARTIAL": 56,
          "partial_repetition0": 57,
          "partial_option0": 58,
          "openPartialBlock": 59,
          "OPEN_PARTIAL_BLOCK": 60,
          "openPartialBlock_repetition0": 61,
          "openPartialBlock_option0": 62,
          "sexpr": 63,
          "OPEN_SEXPR": 64,
          "sexpr_repetition0": 65,
          "sexpr_option0": 66,
          "CLOSE_SEXPR": 67,
          "hash": 68,
          "hash_repetition_plus0": 69,
          "hashSegment": 70,
          "ID": 71,
          "EQUALS": 72,
          "blockParams": 73,
          "OPEN_BLOCK_PARAMS": 74,
          "blockParams_repetition_plus0": 75,
          "CLOSE_BLOCK_PARAMS": 76,
          "path": 77,
          "dataName": 78,
          "STRING": 79,
          "NUMBER": 80,
          "BOOLEAN": 81,
          "UNDEFINED": 82,
          "NULL": 83,
          "DATA": 84,
          "pathSegments": 85,
          "SEP": 86,
          "$accept": 0,
          "$end": 1
        },
        terminals_: {
          2: "error",
          5: "EOF",
          14: "COMMENT",
          15: "CONTENT",
          18: "END_RAW_BLOCK",
          19: "OPEN_RAW_BLOCK",
          23: "CLOSE_RAW_BLOCK",
          29: "OPEN_BLOCK",
          33: "CLOSE",
          34: "OPEN_INVERSE",
          39: "OPEN_INVERSE_CHAIN",
          44: "INVERSE",
          47: "OPEN_ENDBLOCK",
          48: "OPEN",
          52: "OPEN_UNESCAPED",
          55: "CLOSE_UNESCAPED",
          56: "OPEN_PARTIAL",
          60: "OPEN_PARTIAL_BLOCK",
          64: "OPEN_SEXPR",
          67: "CLOSE_SEXPR",
          71: "ID",
          72: "EQUALS",
          74: "OPEN_BLOCK_PARAMS",
          76: "CLOSE_BLOCK_PARAMS",
          79: "STRING",
          80: "NUMBER",
          81: "BOOLEAN",
          82: "UNDEFINED",
          83: "NULL",
          84: "DATA",
          86: "SEP"
        },
        productions_: [0, [3, 2], [4, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [7, 1], [13, 1], [10, 3], [16, 5], [9, 4], [9, 4], [24, 6], [27, 6], [38, 6], [43, 2], [45, 3], [45, 1], [26, 3], [8, 5], [8, 5], [11, 5], [12, 3], [59, 5], [49, 1], [49, 1], [63, 5], [68, 1], [70, 3], [73, 3], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [20, 1], [78, 2], [77, 1], [85, 3], [85, 1], [6, 0], [6, 2], [17, 0], [17, 2], [21, 0], [21, 2], [22, 0], [22, 1], [25, 0], [25, 1], [28, 0], [28, 1], [30, 0], [30, 2], [31, 0], [31, 1], [32, 0], [32, 1], [35, 0], [35, 2], [36, 0], [36, 1], [37, 0], [37, 1], [40, 0], [40, 2], [41, 0], [41, 1], [42, 0], [42, 1], [46, 0], [46, 1], [50, 0], [50, 2], [51, 0], [51, 1], [53, 0], [53, 2], [54, 0], [54, 1], [57, 0], [57, 2], [58, 0], [58, 1], [61, 0], [61, 2], [62, 0], [62, 1], [65, 0], [65, 2], [66, 0], [66, 1], [69, 1], [69, 2], [75, 1], [75, 2]],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {
          var $0 = $$.length - 1;
          switch (yystate) {
            case 1:
              return $$[$0 - 1];
              break;
            case 2:
              this.$ = yy.prepareProgram($$[$0]);
              break;
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 20:
            case 27:
            case 28:
            case 33:
            case 34:
              this.$ = $$[$0];
              break;
            case 9:
              this.$ = {
                type: "CommentStatement",
                value: yy.stripComment($$[$0]),
                strip: yy.stripFlags($$[$0], $$[$0]),
                loc: yy.locInfo(this._$)
              };
              break;
            case 10:
              this.$ = {
                type: "ContentStatement",
                original: $$[$0],
                value: $$[$0],
                loc: yy.locInfo(this._$)
              };
              break;
            case 11:
              this.$ = yy.prepareRawBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
              break;
            case 12:
              this.$ = {
                path: $$[$0 - 3],
                params: $$[$0 - 2],
                hash: $$[$0 - 1]
              };
              break;
            case 13:
              this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], false, this._$);
              break;
            case 14:
              this.$ = yy.prepareBlock($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0], true, this._$);
              break;
            case 15:
              this.$ = {
                open: $$[$0 - 5],
                path: $$[$0 - 4],
                params: $$[$0 - 3],
                hash: $$[$0 - 2],
                blockParams: $$[$0 - 1],
                strip: yy.stripFlags($$[$0 - 5], $$[$0])
              };
              break;
            case 16:
            case 17:
              this.$ = {
                path: $$[$0 - 4],
                params: $$[$0 - 3],
                hash: $$[$0 - 2],
                blockParams: $$[$0 - 1],
                strip: yy.stripFlags($$[$0 - 5], $$[$0])
              };
              break;
            case 18:
              this.$ = {
                strip: yy.stripFlags($$[$0 - 1], $$[$0 - 1]),
                program: $$[$0]
              };
              break;
            case 19:
              var inverse = yy.prepareBlock($$[$0 - 2], $$[$0 - 1], $$[$0], $$[$0], false, this._$), program = yy.prepareProgram([inverse], $$[$0 - 1].loc);
              program.chained = true;
              this.$ = {
                strip: $$[$0 - 2].strip,
                program,
                chain: true
              };
              break;
            case 21:
              this.$ = {
                path: $$[$0 - 1],
                strip: yy.stripFlags($$[$0 - 2], $$[$0])
              };
              break;
            case 22:
            case 23:
              this.$ = yy.prepareMustache($$[$0 - 3], $$[$0 - 2], $$[$0 - 1], $$[$0 - 4], yy.stripFlags($$[$0 - 4], $$[$0]), this._$);
              break;
            case 24:
              this.$ = {
                type: "PartialStatement",
                name: $$[$0 - 3],
                params: $$[$0 - 2],
                hash: $$[$0 - 1],
                indent: "",
                strip: yy.stripFlags($$[$0 - 4], $$[$0]),
                loc: yy.locInfo(this._$)
              };
              break;
            case 25:
              this.$ = yy.preparePartialBlock($$[$0 - 2], $$[$0 - 1], $$[$0], this._$);
              break;
            case 26:
              this.$ = {
                path: $$[$0 - 3],
                params: $$[$0 - 2],
                hash: $$[$0 - 1],
                strip: yy.stripFlags($$[$0 - 4], $$[$0])
              };
              break;
            case 29:
              this.$ = {
                type: "SubExpression",
                path: $$[$0 - 3],
                params: $$[$0 - 2],
                hash: $$[$0 - 1],
                loc: yy.locInfo(this._$)
              };
              break;
            case 30:
              this.$ = {
                type: "Hash",
                pairs: $$[$0],
                loc: yy.locInfo(this._$)
              };
              break;
            case 31:
              this.$ = {
                type: "HashPair",
                key: yy.id($$[$0 - 2]),
                value: $$[$0],
                loc: yy.locInfo(this._$)
              };
              break;
            case 32:
              this.$ = yy.id($$[$0 - 1]);
              break;
            case 35:
              this.$ = {
                type: "StringLiteral",
                value: $$[$0],
                original: $$[$0],
                loc: yy.locInfo(this._$)
              };
              break;
            case 36:
              this.$ = {
                type: "NumberLiteral",
                value: Number($$[$0]),
                original: Number($$[$0]),
                loc: yy.locInfo(this._$)
              };
              break;
            case 37:
              this.$ = {
                type: "BooleanLiteral",
                value: $$[$0] === "true",
                original: $$[$0] === "true",
                loc: yy.locInfo(this._$)
              };
              break;
            case 38:
              this.$ = {
                type: "UndefinedLiteral",
                original: void 0,
                value: void 0,
                loc: yy.locInfo(this._$)
              };
              break;
            case 39:
              this.$ = {
                type: "NullLiteral",
                original: null,
                value: null,
                loc: yy.locInfo(this._$)
              };
              break;
            case 40:
              this.$ = yy.preparePath(true, $$[$0], this._$);
              break;
            case 41:
              this.$ = yy.preparePath(false, $$[$0], this._$);
              break;
            case 42:
              $$[$0 - 2].push({
                part: yy.id($$[$0]),
                original: $$[$0],
                separator: $$[$0 - 1]
              });
              this.$ = $$[$0 - 2];
              break;
            case 43:
              this.$ = [{
                part: yy.id($$[$0]),
                original: $$[$0]
              }];
              break;
            case 44:
            case 46:
            case 48:
            case 56:
            case 62:
            case 68:
            case 76:
            case 80:
            case 84:
            case 88:
            case 92:
              this.$ = [];
              break;
            case 45:
            case 47:
            case 49:
            case 57:
            case 63:
            case 69:
            case 77:
            case 81:
            case 85:
            case 89:
            case 93:
            case 97:
            case 99:
              $$[$0 - 1].push($$[$0]);
              break;
            case 96:
            case 98:
              this.$ = [$$[$0]];
              break;
          }
        },
        table: [o([5, 14, 15, 19, 29, 34, 48, 52, 56, 60], $V0, {
          3: 1,
          4: 2,
          6: 3
        }), {
          1: [3]
        }, {
          5: [1, 4]
        }, o([5, 39, 44, 47], [2, 2], {
          7: 5,
          8: 6,
          9: 7,
          10: 8,
          11: 9,
          12: 10,
          13: 11,
          24: 15,
          27: 16,
          16: 17,
          59: 19,
          14: [1, 12],
          15: $V1,
          19: [1, 23],
          29: [1, 21],
          34: [1, 22],
          48: [1, 13],
          52: [1, 14],
          56: [1, 18],
          60: [1, 24]
        }), {
          1: [2, 1]
        }, o($V2, [2, 45]), o($V2, [2, 3]), o($V2, [2, 4]), o($V2, [2, 5]), o($V2, [2, 6]), o($V2, [2, 7]), o($V2, [2, 8]), o($V2, [2, 9]), {
          20: 26,
          49: 25,
          63: 27,
          64: $V3,
          71: $V4,
          77: 28,
          78: 29,
          79: $V5,
          80: $V6,
          81: $V7,
          82: $V8,
          83: $V9,
          84: $Va,
          85: 36
        }, {
          20: 26,
          49: 39,
          63: 27,
          64: $V3,
          71: $V4,
          77: 28,
          78: 29,
          79: $V5,
          80: $V6,
          81: $V7,
          82: $V8,
          83: $V9,
          84: $Va,
          85: 36
        }, o($Vb, $V0, {
          6: 3,
          4: 40
        }), o($Vc, $V0, {
          6: 3,
          4: 41
        }), o($Vd, [2, 46], {
          17: 42
        }), {
          20: 26,
          49: 43,
          63: 27,
          64: $V3,
          71: $V4,
          77: 28,
          78: 29,
          79: $V5,
          80: $V6,
          81: $V7,
          82: $V8,
          83: $V9,
          84: $Va,
          85: 36
        }, o($Ve, $V0, {
          6: 3,
          4: 44
        }), o([5, 14, 15, 18, 19, 29, 34, 39, 44, 47, 48, 52, 56, 60], [2, 10]), {
          20: 45,
          71: $V4,
          77: 28,
          78: 29,
          79: $V5,
          80: $V6,
          81: $V7,
          82: $V8,
          83: $V9,
          84: $Va,
          85: 36
        }, {
          20: 46,
          71: $V4,
          77: 28,
          78: 29,
          79: $V5,
          80: $V6,
          81: $V7,
          82: $V8,
          83: $V9,
          84: $Va,
          85: 36
        }, {
          20: 47,
          71: $V4,
          77: 28,
          78: 29,
          79: $V5,
          80: $V6,
          81: $V7,
          82: $V8,
          83: $V9,
          84: $Va,
          85: 36
        }, {
          20: 26,
          49: 48,
          63: 27,
          64: $V3,
          71: $V4,
          77: 28,
          78: 29,
          79: $V5,
          80: $V6,
          81: $V7,
          82: $V8,
          83: $V9,
          84: $Va,
          85: 36
        }, o($Vf, [2, 76], {
          50: 49
        }), o($Vg, [2, 27]), o($Vg, [2, 28]), o($Vg, [2, 33]), o($Vg, [2, 34]), o($Vg, [2, 35]), o($Vg, [2, 36]), o($Vg, [2, 37]), o($Vg, [2, 38]), o($Vg, [2, 39]), {
          20: 26,
          49: 50,
          63: 27,
          64: $V3,
          71: $V4,
          77: 28,
          78: 29,
          79: $V5,
          80: $V6,
          81: $V7,
          82: $V8,
          83: $V9,
          84: $Va,
          85: 36
        }, o($Vg, [2, 41], {
          86: $Vh
        }), {
          71: $V4,
          85: 52
        }, o($Vi, $Vj), o($Vk, [2, 80], {
          53: 53
        }), {
          25: 54,
          38: 56,
          39: $Vl,
          43: 57,
          44: $Vm,
          45: 55,
          47: [2, 52]
        }, {
          28: 60,
          43: 61,
          44: $Vm,
          47: [2, 54]
        }, {
          13: 63,
          15: $V1,
          18: [1, 62]
        }, o($Vf, [2, 84], {
          57: 64
        }), {
          26: 65,
          47: $Vn
        }, o($Vo, [2, 56], {
          30: 67
        }), o($Vo, [2, 62], {
          35: 68
        }), o($Vp, [2, 48], {
          21: 69
        }), o($Vf, [2, 88], {
          61: 70
        }), {
          20: 26,
          33: [2, 78],
          49: 72,
          51: 71,
          63: 27,
          64: $V3,
          68: 73,
          69: 74,
          70: 75,
          71: $Vq,
          77: 28,
          78: 29,
          79: $V5,
          80: $V6,
          81: $V7,
          82: $V8,
          83: $V9,
          84: $Va,
          85: 36
        }, o($Vr, [2, 92], {
          65: 77
        }), {
          71: [1, 78]
        }, o($Vg, [2, 40], {
          86: $Vh
        }), {
          20: 26,
          49: 80,
          54: 79,
          55: [2, 82],
          63: 27,
          64: $V3,
          68: 81,
          69: 74,
          70: 75,
          71: $Vq,
          77: 28,
          78: 29,
          79: $V5,
          80: $V6,
          81: $V7,
          82: $V8,
          83: $V9,
          84: $Va,
          85: 36
        }, {
          26: 82,
          47: $Vn
        }, {
          47: [2, 53]
        }, o($Vb, $V0, {
          6: 3,
          4: 83
        }), {
          47: [2, 20]
        }, {
          20: 84,
          71: $V4,
          77: 28,
          78: 29,
          79: $V5,
          80: $V6,
          81: $V7,
          82: $V8,
          83: $V9,
          84: $Va,
          85: 36
        }, o($Ve, $V0, {
          6: 3,
          4: 85
        }), {
          26: 86,
          47: $Vn
        }, {
          47: [2, 55]
        }, o($V2, [2, 11]), o($Vd, [2, 47]), {
          20: 26,
          33: [2, 86],
          49: 88,
          58: 87,
          63: 27,
          64: $V3,
          68: 89,
          69: 74,
          70: 75,
          71: $Vq,
          77: 28,
          78: 29,
          79: $V5,
          80: $V6,
          81: $V7,
          82: $V8,
          83: $V9,
          84: $Va,
          85: 36
        }, o($V2, [2, 25]), {
          20: 90,
          71: $V4,
          77: 28,
          78: 29,
          79: $V5,
          80: $V6,
          81: $V7,
          82: $V8,
          83: $V9,
          84: $Va,
          85: 36
        }, o($Vs, [2, 58], {
          20: 26,
          63: 27,
          77: 28,
          78: 29,
          85: 36,
          69: 74,
          70: 75,
          31: 91,
          49: 92,
          68: 93,
          64: $V3,
          71: $Vq,
          79: $V5,
          80: $V6,
          81: $V7,
          82: $V8,
          83: $V9,
          84: $Va
        }), o($Vs, [2, 64], {
          20: 26,
          63: 27,
          77: 28,
          78: 29,
          85: 36,
          69: 74,
          70: 75,
          36: 94,
          49: 95,
          68: 96,
          64: $V3,
          71: $Vq,
          79: $V5,
          80: $V6,
          81: $V7,
          82: $V8,
          83: $V9,
          84: $Va
        }), {
          20: 26,
          22: 97,
          23: [2, 50],
          49: 98,
          63: 27,
          64: $V3,
          68: 99,
          69: 74,
          70: 75,
          71: $Vq,
          77: 28,
          78: 29,
          79: $V5,
          80: $V6,
          81: $V7,
          82: $V8,
          83: $V9,
          84: $Va,
          85: 36
        }, {
          20: 26,
          33: [2, 90],
          49: 101,
          62: 100,
          63: 27,
          64: $V3,
          68: 102,
          69: 74,
          70: 75,
          71: $Vq,
          77: 28,
          78: 29,
          79: $V5,
          80: $V6,
          81: $V7,
          82: $V8,
          83: $V9,
          84: $Va,
          85: 36
        }, {
          33: [1, 103]
        }, o($Vf, [2, 77]), {
          33: [2, 79]
        }, o([23, 33, 55, 67, 74], [2, 30], {
          70: 104,
          71: [1, 105]
        }), o($Vt, [2, 96]), o($Vi, $Vj, {
          72: $Vu
        }), {
          20: 26,
          49: 108,
          63: 27,
          64: $V3,
          66: 107,
          67: [2, 94],
          68: 109,
          69: 74,
          70: 75,
          71: $Vq,
          77: 28,
          78: 29,
          79: $V5,
          80: $V6,
          81: $V7,
          82: $V8,
          83: $V9,
          84: $Va,
          85: 36
        }, o($Vi, [2, 42]), {
          55: [1, 110]
        }, o($Vk, [2, 81]), {
          55: [2, 83]
        }, o($V2, [2, 13]), {
          38: 56,
          39: $Vl,
          43: 57,
          44: $Vm,
          45: 112,
          46: 111,
          47: [2, 74]
        }, o($Vo, [2, 68], {
          40: 113
        }), {
          47: [2, 18]
        }, o($V2, [2, 14]), {
          33: [1, 114]
        }, o($Vf, [2, 85]), {
          33: [2, 87]
        }, {
          33: [1, 115]
        }, {
          32: 116,
          33: [2, 60],
          73: 117,
          74: $Vv
        }, o($Vo, [2, 57]), o($Vs, [2, 59]), {
          33: [2, 66],
          37: 119,
          73: 120,
          74: $Vv
        }, o($Vo, [2, 63]), o($Vs, [2, 65]), {
          23: [1, 121]
        }, o($Vp, [2, 49]), {
          23: [2, 51]
        }, {
          33: [1, 122]
        }, o($Vf, [2, 89]), {
          33: [2, 91]
        }, o($V2, [2, 22]), o($Vt, [2, 97]), {
          72: $Vu
        }, {
          20: 26,
          49: 123,
          63: 27,
          64: $V3,
          71: $V4,
          77: 28,
          78: 29,
          79: $V5,
          80: $V6,
          81: $V7,
          82: $V8,
          83: $V9,
          84: $Va,
          85: 36
        }, {
          67: [1, 124]
        }, o($Vr, [2, 93]), {
          67: [2, 95]
        }, o($V2, [2, 23]), {
          47: [2, 19]
        }, {
          47: [2, 75]
        }, o($Vs, [2, 70], {
          20: 26,
          63: 27,
          77: 28,
          78: 29,
          85: 36,
          69: 74,
          70: 75,
          41: 125,
          49: 126,
          68: 127,
          64: $V3,
          71: $Vq,
          79: $V5,
          80: $V6,
          81: $V7,
          82: $V8,
          83: $V9,
          84: $Va
        }), o($V2, [2, 24]), o($V2, [2, 21]), {
          33: [1, 128]
        }, {
          33: [2, 61]
        }, {
          71: [1, 130],
          75: 129
        }, {
          33: [1, 131]
        }, {
          33: [2, 67]
        }, o($Vd, [2, 12]), o($Ve, [2, 26]), o($Vt, [2, 31]), o($Vg, [2, 29]), {
          33: [2, 72],
          42: 132,
          73: 133,
          74: $Vv
        }, o($Vo, [2, 69]), o($Vs, [2, 71]), o($Vb, [2, 15]), {
          71: [1, 135],
          76: [1, 134]
        }, o($Vw, [2, 98]), o($Vc, [2, 16]), {
          33: [1, 136]
        }, {
          33: [2, 73]
        }, {
          33: [2, 32]
        }, o($Vw, [2, 99]), o($Vb, [2, 17])],
        defaultActions: {
          4: [2, 1],
          55: [2, 53],
          57: [2, 20],
          61: [2, 55],
          73: [2, 79],
          81: [2, 83],
          85: [2, 18],
          89: [2, 87],
          99: [2, 51],
          102: [2, 91],
          109: [2, 95],
          111: [2, 19],
          112: [2, 75],
          117: [2, 61],
          120: [2, 67],
          133: [2, 73],
          134: [2, 32]
        },
        parseError: function parseError(str, hash) {
          if (hash.recoverable) {
            this.trace(str);
          } else {
            var error = new Error(str);
            error.hash = hash;
            throw error;
          }
        },
        parse: function parse(input) {
          var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
          var args = lstack.slice.call(arguments, 1);
          var lexer2 = Object.create(this.lexer);
          var sharedState = {
            yy: {}
          };
          for (var k in this.yy) {
            if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
              sharedState.yy[k] = this.yy[k];
            }
          }
          lexer2.setInput(input, sharedState.yy);
          sharedState.yy.lexer = lexer2;
          sharedState.yy.parser = this;
          if (typeof lexer2.yylloc == "undefined") {
            lexer2.yylloc = {};
          }
          var yyloc = lexer2.yylloc;
          lstack.push(yyloc);
          var ranges = lexer2.options && lexer2.options.ranges;
          if (typeof sharedState.yy.parseError === "function") {
            this.parseError = sharedState.yy.parseError;
          } else {
            this.parseError = Object.getPrototypeOf(this).parseError;
          }
          function popStack(n) {
            stack.length = stack.length - 2 * n;
            vstack.length = vstack.length - n;
            lstack.length = lstack.length - n;
          }
          _token_stack:
            var lex = function() {
              var token;
              token = lexer2.lex() || EOF;
              if (typeof token !== "number") {
                token = self.symbols_[token] || token;
              }
              return token;
            };
          var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
          while (true) {
            state = stack[stack.length - 1];
            if (this.defaultActions[state]) {
              action = this.defaultActions[state];
            } else {
              if (symbol === null || typeof symbol == "undefined") {
                symbol = lex();
              }
              action = table[state] && table[state][symbol];
            }
            if (typeof action === "undefined" || !action.length || !action[0]) {
              var errStr = "";
              expected = [];
              for (p in table[state]) {
                if (this.terminals_[p] && p > TERROR) {
                  expected.push("'" + this.terminals_[p] + "'");
                }
              }
              if (lexer2.showPosition) {
                errStr = "Parse error on line " + (yylineno + 1) + ":\n" + lexer2.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
              } else {
                errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == EOF ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
              }
              this.parseError(errStr, {
                text: lexer2.match,
                token: this.terminals_[symbol] || symbol,
                line: lexer2.yylineno,
                loc: yyloc,
                expected
              });
            }
            if (action[0] instanceof Array && action.length > 1) {
              throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
            }
            switch (action[0]) {
              case 1:
                stack.push(symbol);
                vstack.push(lexer2.yytext);
                lstack.push(lexer2.yylloc);
                stack.push(action[1]);
                symbol = null;
                if (!preErrorSymbol) {
                  yyleng = lexer2.yyleng;
                  yytext = lexer2.yytext;
                  yylineno = lexer2.yylineno;
                  yyloc = lexer2.yylloc;
                  if (recovering > 0) {
                    recovering--;
                  }
                } else {
                  symbol = preErrorSymbol;
                  preErrorSymbol = null;
                }
                break;
              case 2:
                len = this.productions_[action[1]][1];
                yyval.$ = vstack[vstack.length - len];
                yyval._$ = {
                  first_line: lstack[lstack.length - (len || 1)].first_line,
                  last_line: lstack[lstack.length - 1].last_line,
                  first_column: lstack[lstack.length - (len || 1)].first_column,
                  last_column: lstack[lstack.length - 1].last_column
                };
                if (ranges) {
                  yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
                }
                r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));
                if (typeof r !== "undefined") {
                  return r;
                }
                if (len) {
                  stack = stack.slice(0, -1 * len * 2);
                  vstack = vstack.slice(0, -1 * len);
                  lstack = lstack.slice(0, -1 * len);
                }
                stack.push(this.productions_[action[1]][0]);
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                stack.push(newState);
                break;
              case 3:
                return true;
            }
          }
          return true;
        }
      };
      var lexer = function() {
        var lexer2 = {
          EOF: 1,
          parseError: function parseError(str, hash) {
            if (this.yy.parser) {
              this.yy.parser.parseError(str, hash);
            } else {
              throw new Error(str);
            }
          },
          setInput: function(input, yy) {
            this.yy = yy || this.yy || {};
            this._input = input;
            this._more = this._backtrack = this.done = false;
            this.yylineno = this.yyleng = 0;
            this.yytext = this.matched = this.match = "";
            this.conditionStack = ["INITIAL"];
            this.yylloc = {
              first_line: 1,
              first_column: 0,
              last_line: 1,
              last_column: 0
            };
            if (this.options.ranges) {
              this.yylloc.range = [0, 0];
            }
            this.offset = 0;
            return this;
          },
          input: function() {
            var ch = this._input[0];
            this.yytext += ch;
            this.yyleng++;
            this.offset++;
            this.match += ch;
            this.matched += ch;
            var lines = ch.match(/(?:\r\n?|\n).*/g);
            if (lines) {
              this.yylineno++;
              this.yylloc.last_line++;
            } else {
              this.yylloc.last_column++;
            }
            if (this.options.ranges) {
              this.yylloc.range[1]++;
            }
            this._input = this._input.slice(1);
            return ch;
          },
          unput: function(ch) {
            var len = ch.length;
            var lines = ch.split(/(?:\r\n?|\n)/g);
            this._input = ch + this._input;
            this.yytext = this.yytext.substr(0, this.yytext.length - len);
            this.offset -= len;
            var oldLines = this.match.split(/(?:\r\n?|\n)/g);
            this.match = this.match.substr(0, this.match.length - 1);
            this.matched = this.matched.substr(0, this.matched.length - 1);
            if (lines.length - 1) {
              this.yylineno -= lines.length - 1;
            }
            var r = this.yylloc.range;
            this.yylloc = {
              first_line: this.yylloc.first_line,
              last_line: this.yylineno + 1,
              first_column: this.yylloc.first_column,
              last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
            };
            if (this.options.ranges) {
              this.yylloc.range = [r[0], r[0] + this.yyleng - len];
            }
            this.yyleng = this.yytext.length;
            return this;
          },
          more: function() {
            this._more = true;
            return this;
          },
          reject: function() {
            if (this.options.backtrack_lexer) {
              this._backtrack = true;
            } else {
              return this.parseError("Lexical error on line " + (this.yylineno + 1) + ". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n" + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
              });
            }
            return this;
          },
          less: function(n) {
            this.unput(this.match.slice(n));
          },
          pastInput: function() {
            var past = this.matched.substr(0, this.matched.length - this.match.length);
            return (past.length > 20 ? "..." : "") + past.substr(-20).replace(/\n/g, "");
          },
          upcomingInput: function() {
            var next = this.match;
            if (next.length < 20) {
              next += this._input.substr(0, 20 - next.length);
            }
            return (next.substr(0, 20) + (next.length > 20 ? "..." : "")).replace(/\n/g, "");
          },
          showPosition: function() {
            var pre = this.pastInput();
            var c = new Array(pre.length + 1).join("-");
            return pre + this.upcomingInput() + "\n" + c + "^";
          },
          test_match: function(match, indexed_rule) {
            var token, lines, backup;
            if (this.options.backtrack_lexer) {
              backup = {
                yylineno: this.yylineno,
                yylloc: {
                  first_line: this.yylloc.first_line,
                  last_line: this.last_line,
                  first_column: this.yylloc.first_column,
                  last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
              };
              if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
              }
            }
            lines = match[0].match(/(?:\r\n?|\n).*/g);
            if (lines) {
              this.yylineno += lines.length;
            }
            this.yylloc = {
              first_line: this.yylloc.last_line,
              last_line: this.yylineno + 1,
              first_column: this.yylloc.last_column,
              last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
            };
            this.yytext += match[0];
            this.match += match[0];
            this.matches = match;
            this.yyleng = this.yytext.length;
            if (this.options.ranges) {
              this.yylloc.range = [this.offset, this.offset += this.yyleng];
            }
            this._more = false;
            this._backtrack = false;
            this._input = this._input.slice(match[0].length);
            this.matched += match[0];
            token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
            if (this.done && this._input) {
              this.done = false;
            }
            if (token) {
              return token;
            } else if (this._backtrack) {
              for (var k in backup) {
                this[k] = backup[k];
              }
              return false;
            }
            return false;
          },
          next: function() {
            if (this.done) {
              return this.EOF;
            }
            if (!this._input) {
              this.done = true;
            }
            var token, match, tempMatch, index;
            if (!this._more) {
              this.yytext = "";
              this.match = "";
            }
            var rules = this._currentRules();
            for (var i = 0; i < rules.length; i++) {
              tempMatch = this._input.match(this.rules[rules[i]]);
              if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                  token = this.test_match(tempMatch, rules[i]);
                  if (token !== false) {
                    return token;
                  } else if (this._backtrack) {
                    match = false;
                    continue;
                  } else {
                    return false;
                  }
                } else if (!this.options.flex) {
                  break;
                }
              }
            }
            if (match) {
              token = this.test_match(match, rules[index]);
              if (token !== false) {
                return token;
              }
              return false;
            }
            if (this._input === "") {
              return this.EOF;
            } else {
              return this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
              });
            }
          },
          lex: function lex() {
            var r = this.next();
            if (r) {
              return r;
            } else {
              return this.lex();
            }
          },
          begin: function begin(condition) {
            this.conditionStack.push(condition);
          },
          popState: function popState() {
            var n = this.conditionStack.length - 1;
            if (n > 0) {
              return this.conditionStack.pop();
            } else {
              return this.conditionStack[0];
            }
          },
          _currentRules: function _currentRules() {
            if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
              return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
            } else {
              return this.conditions["INITIAL"].rules;
            }
          },
          topState: function topState(n) {
            n = this.conditionStack.length - 1 - Math.abs(n || 0);
            if (n >= 0) {
              return this.conditionStack[n];
            } else {
              return "INITIAL";
            }
          },
          pushState: function pushState(condition) {
            this.begin(condition);
          },
          stateStackSize: function stateStackSize() {
            return this.conditionStack.length;
          },
          options: {},
          performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
            function strip(start, end) {
              return yy_.yytext = yy_.yytext.substring(start, yy_.yyleng - end + start);
            }
            var YYSTATE = YY_START;
            switch ($avoiding_name_collisions) {
              case 0:
                if (yy_.yytext.slice(-2) === "\\\\") {
                  strip(0, 1);
                  this.begin("mu");
                } else if (yy_.yytext.slice(-1) === "\\") {
                  strip(0, 1);
                  this.begin("emu");
                } else {
                  this.begin("mu");
                }
                if (yy_.yytext)
                  return 15;
                break;
              case 1:
                return 15;
                break;
              case 2:
                this.popState();
                return 15;
                break;
              case 3:
                this.begin("raw");
                return 15;
                break;
              case 4:
                this.popState();
                if (this.conditionStack[this.conditionStack.length - 1] === "raw") {
                  return 15;
                } else {
                  strip(5, 9);
                  return 18;
                }
                break;
              case 5:
                return 15;
                break;
              case 6:
                this.popState();
                return 14;
                break;
              case 7:
                return 64;
                break;
              case 8:
                return 67;
                break;
              case 9:
                return 19;
                break;
              case 10:
                this.popState();
                this.begin("raw");
                return 23;
                break;
              case 11:
                return 56;
                break;
              case 12:
                return 60;
                break;
              case 13:
                return 29;
                break;
              case 14:
                return 47;
                break;
              case 15:
                this.popState();
                return 44;
                break;
              case 16:
                this.popState();
                return 44;
                break;
              case 17:
                return 34;
                break;
              case 18:
                return 39;
                break;
              case 19:
                return 52;
                break;
              case 20:
                return 48;
                break;
              case 21:
                this.unput(yy_.yytext);
                this.popState();
                this.begin("com");
                break;
              case 22:
                this.popState();
                return 14;
                break;
              case 23:
                return 48;
                break;
              case 24:
                return 72;
                break;
              case 25:
                return 71;
                break;
              case 26:
                return 71;
                break;
              case 27:
                return 86;
                break;
              case 28:
                break;
              case 29:
                this.popState();
                return 55;
                break;
              case 30:
                this.popState();
                return 33;
                break;
              case 31:
                yy_.yytext = strip(1, 2).replace(/\\"/g, '"');
                return 79;
                break;
              case 32:
                yy_.yytext = strip(1, 2).replace(/\\'/g, "'");
                return 79;
                break;
              case 33:
                return 84;
                break;
              case 34:
                return 81;
                break;
              case 35:
                return 81;
                break;
              case 36:
                return 82;
                break;
              case 37:
                return 83;
                break;
              case 38:
                return 80;
                break;
              case 39:
                return 74;
                break;
              case 40:
                return 76;
                break;
              case 41:
                return 71;
                break;
              case 42:
                yy_.yytext = yy_.yytext.replace(/\\([\\\]])/g, "$1");
                return 71;
                break;
              case 43:
                return "INVALID";
                break;
              case 44:
                return 5;
                break;
            }
          },
          rules: [/^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:\{\{\{\{(?=[^/]))/, /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/, /^(?:[^\x00]+?(?=(\{\{\{\{)))/, /^(?:[\s\S]*?--(~)?\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{\{\{)/, /^(?:\}\}\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#>)/, /^(?:\{\{(~)?#\*?)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^\s*(~)?\}\})/, /^(?:\{\{(~)?\s*else\s*(~)?\}\})/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{(~)?!--)/, /^(?:\{\{(~)?![\s\S]*?\}\})/, /^(?:\{\{(~)?\*?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)|])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:undefined(?=([~}\s)])))/, /^(?:null(?=([~}\s)])))/, /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/, /^(?:as\s+\|)/, /^(?:\|)/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/, /^(?:\[(\\\]|[^\]])*\])/, /^(?:.)/, /^(?:$)/],
          conditions: {
            "mu": {
              "rules": [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44],
              "inclusive": false
            },
            "emu": {
              "rules": [2],
              "inclusive": false
            },
            "com": {
              "rules": [6],
              "inclusive": false
            },
            "raw": {
              "rules": [3, 4, 5],
              "inclusive": false
            },
            "INITIAL": {
              "rules": [0, 1, 44],
              "inclusive": true
            }
          }
        };
        return lexer2;
      }();
      parser2.lexer = lexer;
      function Parser() {
        this.yy = {};
      }
      Parser.prototype = parser2;
      parser2.Parser = Parser;
      return new Parser();
    }();
    exports.default = parser;
  }
});
var require_printer2 = __commonJS({
  "node_modules/@handlebars/parser/dist/cjs/printer.js"(exports) {
    "use strict";
    init_define_process();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.PrintVisitor = exports.print = void 0;
    var visitor_1 = __importDefault(require_visitor());
    function print(ast) {
      return new PrintVisitor().accept(ast);
    }
    exports.print = print;
    function PrintVisitor() {
      this.padding = 0;
    }
    exports.PrintVisitor = PrintVisitor;
    PrintVisitor.prototype = new visitor_1.default();
    PrintVisitor.prototype.pad = function(string) {
      var out = "";
      for (var i = 0, l = this.padding; i < l; i++) {
        out += "  ";
      }
      out += string + "\n";
      return out;
    };
    PrintVisitor.prototype.Program = function(program) {
      var out = "", body = program.body, i, l;
      if (program.blockParams) {
        var blockParams = "BLOCK PARAMS: [";
        for (i = 0, l = program.blockParams.length; i < l; i++) {
          blockParams += " " + program.blockParams[i];
        }
        blockParams += " ]";
        out += this.pad(blockParams);
      }
      for (i = 0, l = body.length; i < l; i++) {
        out += this.accept(body[i]);
      }
      this.padding--;
      return out;
    };
    PrintVisitor.prototype.MustacheStatement = function(mustache) {
      return this.pad("{{ " + this.SubExpression(mustache) + " }}");
    };
    PrintVisitor.prototype.Decorator = function(mustache) {
      return this.pad("{{ DIRECTIVE " + this.SubExpression(mustache) + " }}");
    };
    PrintVisitor.prototype.BlockStatement = PrintVisitor.prototype.DecoratorBlock = function(block) {
      var out = "";
      out += this.pad((block.type === "DecoratorBlock" ? "DIRECTIVE " : "") + "BLOCK:");
      this.padding++;
      out += this.pad(this.SubExpression(block));
      if (block.program) {
        out += this.pad("PROGRAM:");
        this.padding++;
        out += this.accept(block.program);
        this.padding--;
      }
      if (block.inverse) {
        if (block.program) {
          this.padding++;
        }
        out += this.pad("{{^}}");
        this.padding++;
        out += this.accept(block.inverse);
        this.padding--;
        if (block.program) {
          this.padding--;
        }
      }
      this.padding--;
      return out;
    };
    PrintVisitor.prototype.PartialStatement = function(partial) {
      var content = "PARTIAL:" + partial.name.original;
      if (partial.params[0]) {
        content += " " + this.accept(partial.params[0]);
      }
      if (partial.hash) {
        content += " " + this.accept(partial.hash);
      }
      return this.pad("{{> " + content + " }}");
    };
    PrintVisitor.prototype.PartialBlockStatement = function(partial) {
      var content = "PARTIAL BLOCK:" + partial.name.original;
      if (partial.params[0]) {
        content += " " + this.accept(partial.params[0]);
      }
      if (partial.hash) {
        content += " " + this.accept(partial.hash);
      }
      content += " " + this.pad("PROGRAM:");
      this.padding++;
      content += this.accept(partial.program);
      this.padding--;
      return this.pad("{{> " + content + " }}");
    };
    PrintVisitor.prototype.ContentStatement = function(content) {
      return this.pad("CONTENT[ '" + content.value + "' ]");
    };
    PrintVisitor.prototype.CommentStatement = function(comment) {
      return this.pad("{{! '" + comment.value + "' }}");
    };
    PrintVisitor.prototype.SubExpression = function(sexpr) {
      var params = sexpr.params, paramStrings = [], hash;
      for (var i = 0, l = params.length; i < l; i++) {
        paramStrings.push(this.accept(params[i]));
      }
      params = "[" + paramStrings.join(", ") + "]";
      hash = sexpr.hash ? " " + this.accept(sexpr.hash) : "";
      return this.accept(sexpr.path) + " " + params + hash;
    };
    PrintVisitor.prototype.PathExpression = function(id) {
      var path = id.parts.join("/");
      return (id.data ? "@" : "") + "PATH:" + path;
    };
    PrintVisitor.prototype.StringLiteral = function(string) {
      return '"' + string.value + '"';
    };
    PrintVisitor.prototype.NumberLiteral = function(number) {
      return "NUMBER{" + number.value + "}";
    };
    PrintVisitor.prototype.BooleanLiteral = function(bool) {
      return "BOOLEAN{" + bool.value + "}";
    };
    PrintVisitor.prototype.UndefinedLiteral = function() {
      return "UNDEFINED";
    };
    PrintVisitor.prototype.NullLiteral = function() {
      return "NULL";
    };
    PrintVisitor.prototype.Hash = function(hash) {
      var pairs = hash.pairs, joinedPairs = [];
      for (var i = 0, l = pairs.length; i < l; i++) {
        joinedPairs.push(this.accept(pairs[i]));
      }
      return "HASH{" + joinedPairs.join(", ") + "}";
    };
    PrintVisitor.prototype.HashPair = function(pair) {
      return pair.key + "=" + this.accept(pair.value);
    };
  }
});
var require_helpers = __commonJS({
  "node_modules/@handlebars/parser/dist/cjs/helpers.js"(exports) {
    "use strict";
    init_define_process();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.preparePartialBlock = exports.prepareProgram = exports.prepareBlock = exports.prepareRawBlock = exports.prepareMustache = exports.preparePath = exports.stripComment = exports.stripFlags = exports.id = exports.SourceLocation = void 0;
    var exception_1 = __importDefault(require_exception());
    function validateClose(open, close) {
      close = close.path ? close.path.original : close;
      if (open.path.original !== close) {
        var errorNode = {
          loc: open.path.loc
        };
        throw new exception_1.default(open.path.original + " doesn't match " + close, errorNode);
      }
    }
    function SourceLocation(source, locInfo) {
      this.source = source;
      this.start = {
        line: locInfo.first_line,
        column: locInfo.first_column
      };
      this.end = {
        line: locInfo.last_line,
        column: locInfo.last_column
      };
    }
    exports.SourceLocation = SourceLocation;
    function id(token) {
      if (/^\[.*\]$/.test(token)) {
        return token.substring(1, token.length - 1);
      } else {
        return token;
      }
    }
    exports.id = id;
    function stripFlags(open, close) {
      return {
        open: open.charAt(2) === "~",
        close: close.charAt(close.length - 3) === "~"
      };
    }
    exports.stripFlags = stripFlags;
    function stripComment(comment) {
      return comment.replace(/^\{\{~?!-?-?/, "").replace(/-?-?~?\}\}$/, "");
    }
    exports.stripComment = stripComment;
    function preparePath(data, parts, loc) {
      loc = this.locInfo(loc);
      var original = data ? "@" : "", dig = [], depth = 0;
      for (var i = 0, l = parts.length; i < l; i++) {
        var part = parts[i].part, isLiteral = parts[i].original !== part;
        original += (parts[i].separator || "") + part;
        if (!isLiteral && (part === ".." || part === "." || part === "this")) {
          if (dig.length > 0) {
            throw new exception_1.default("Invalid path: " + original, {
              loc
            });
          } else if (part === "..") {
            depth++;
          }
        } else {
          dig.push(part);
        }
      }
      return {
        type: "PathExpression",
        data,
        depth,
        parts: dig,
        original,
        loc
      };
    }
    exports.preparePath = preparePath;
    function prepareMustache(path, params, hash, open, strip, locInfo) {
      var escapeFlag = open.charAt(3) || open.charAt(2), escaped = escapeFlag !== "{" && escapeFlag !== "&";
      var decorator = /\*/.test(open);
      return {
        type: decorator ? "Decorator" : "MustacheStatement",
        path,
        params,
        hash,
        escaped,
        strip,
        loc: this.locInfo(locInfo)
      };
    }
    exports.prepareMustache = prepareMustache;
    function prepareRawBlock(openRawBlock, contents, close, locInfo) {
      validateClose(openRawBlock, close);
      locInfo = this.locInfo(locInfo);
      var program = {
        type: "Program",
        body: contents,
        strip: {},
        loc: locInfo
      };
      return {
        type: "BlockStatement",
        path: openRawBlock.path,
        params: openRawBlock.params,
        hash: openRawBlock.hash,
        program,
        openStrip: {},
        inverseStrip: {},
        closeStrip: {},
        loc: locInfo
      };
    }
    exports.prepareRawBlock = prepareRawBlock;
    function prepareBlock(openBlock, program, inverseAndProgram, close, inverted, locInfo) {
      if (close && close.path) {
        validateClose(openBlock, close);
      }
      var decorator = /\*/.test(openBlock.open);
      program.blockParams = openBlock.blockParams;
      var inverse, inverseStrip;
      if (inverseAndProgram) {
        if (decorator) {
          throw new exception_1.default("Unexpected inverse block on decorator", inverseAndProgram);
        }
        if (inverseAndProgram.chain) {
          inverseAndProgram.program.body[0].closeStrip = close.strip;
        }
        inverseStrip = inverseAndProgram.strip;
        inverse = inverseAndProgram.program;
      }
      if (inverted) {
        inverted = inverse;
        inverse = program;
        program = inverted;
      }
      return {
        type: decorator ? "DecoratorBlock" : "BlockStatement",
        path: openBlock.path,
        params: openBlock.params,
        hash: openBlock.hash,
        program,
        inverse,
        openStrip: openBlock.strip,
        inverseStrip,
        closeStrip: close && close.strip,
        loc: this.locInfo(locInfo)
      };
    }
    exports.prepareBlock = prepareBlock;
    function prepareProgram(statements, loc) {
      if (!loc && statements.length) {
        var firstLoc = statements[0].loc, lastLoc = statements[statements.length - 1].loc;
        if (firstLoc && lastLoc) {
          loc = {
            source: firstLoc.source,
            start: {
              line: firstLoc.start.line,
              column: firstLoc.start.column
            },
            end: {
              line: lastLoc.end.line,
              column: lastLoc.end.column
            }
          };
        }
      }
      return {
        type: "Program",
        body: statements,
        strip: {},
        loc
      };
    }
    exports.prepareProgram = prepareProgram;
    function preparePartialBlock(open, program, close, locInfo) {
      validateClose(open, close);
      return {
        type: "PartialBlockStatement",
        name: open.path,
        params: open.params,
        hash: open.hash,
        program,
        openStrip: open.strip,
        closeStrip: close && close.strip,
        loc: this.locInfo(locInfo)
      };
    }
    exports.preparePartialBlock = preparePartialBlock;
  }
});
var require_parse = __commonJS({
  "node_modules/@handlebars/parser/dist/cjs/parse.js"(exports) {
    "use strict";
    init_define_process();
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
          return m[k];
        }
      });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
      Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
      });
    } : function(o, v) {
      o["default"] = v;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k in mod)
          if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
            __createBinding(result, mod, k);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parse = exports.parseWithoutProcessing = void 0;
    var parser_1 = __importDefault(require_parser());
    var whitespace_control_1 = __importDefault(require_whitespace_control());
    var Helpers = __importStar(require_helpers());
    var baseHelpers = {};
    for (helper in Helpers) {
      if (Object.prototype.hasOwnProperty.call(Helpers, helper)) {
        baseHelpers[helper] = Helpers[helper];
      }
    }
    var helper;
    function parseWithoutProcessing(input, options) {
      if (input.type === "Program") {
        return input;
      }
      parser_1.default.yy = baseHelpers;
      parser_1.default.yy.locInfo = function(locInfo) {
        return new Helpers.SourceLocation(options && options.srcName, locInfo);
      };
      var ast = parser_1.default.parse(input);
      return ast;
    }
    exports.parseWithoutProcessing = parseWithoutProcessing;
    function parse(input, options) {
      var ast = parseWithoutProcessing(input, options);
      var strip = new whitespace_control_1.default(options);
      return strip.accept(ast);
    }
    exports.parse = parse;
  }
});
var require_cjs = __commonJS({
  "node_modules/@handlebars/parser/dist/cjs/index.js"(exports) {
    "use strict";
    init_define_process();
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : {
        "default": mod
      };
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parseWithoutProcessing = exports.parse = exports.PrintVisitor = exports.print = exports.Exception = exports.parser = exports.WhitespaceControl = exports.Visitor = void 0;
    var visitor_1 = require_visitor();
    Object.defineProperty(exports, "Visitor", {
      enumerable: true,
      get: function() {
        return __importDefault(visitor_1).default;
      }
    });
    var whitespace_control_1 = require_whitespace_control();
    Object.defineProperty(exports, "WhitespaceControl", {
      enumerable: true,
      get: function() {
        return __importDefault(whitespace_control_1).default;
      }
    });
    var parser_1 = require_parser();
    Object.defineProperty(exports, "parser", {
      enumerable: true,
      get: function() {
        return __importDefault(parser_1).default;
      }
    });
    var exception_1 = require_exception();
    Object.defineProperty(exports, "Exception", {
      enumerable: true,
      get: function() {
        return __importDefault(exception_1).default;
      }
    });
    var printer_1 = require_printer2();
    Object.defineProperty(exports, "print", {
      enumerable: true,
      get: function() {
        return printer_1.print;
      }
    });
    Object.defineProperty(exports, "PrintVisitor", {
      enumerable: true,
      get: function() {
        return printer_1.PrintVisitor;
      }
    });
    var parse_1 = require_parse();
    Object.defineProperty(exports, "parse", {
      enumerable: true,
      get: function() {
        return parse_1.parse;
      }
    });
    Object.defineProperty(exports, "parseWithoutProcessing", {
      enumerable: true,
      get: function() {
        return parse_1.parseWithoutProcessing;
      }
    });
  }
});
var require_simple_html_tokenizer = __commonJS({
  "node_modules/simple-html-tokenizer/dist/simple-html-tokenizer.js"(exports, module) {
    init_define_process();
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : factory(global.HTML5Tokenizer = {});
    })(exports, function(exports2) {
      "use strict";
      var namedCharRefs = {
        Aacute: "\xC1",
        aacute: "\xE1",
        Abreve: "\u0102",
        abreve: "\u0103",
        ac: "\u223E",
        acd: "\u223F",
        acE: "\u223E\u0333",
        Acirc: "\xC2",
        acirc: "\xE2",
        acute: "\xB4",
        Acy: "\u0410",
        acy: "\u0430",
        AElig: "\xC6",
        aelig: "\xE6",
        af: "\u2061",
        Afr: "\u{1D504}",
        afr: "\u{1D51E}",
        Agrave: "\xC0",
        agrave: "\xE0",
        alefsym: "\u2135",
        aleph: "\u2135",
        Alpha: "\u0391",
        alpha: "\u03B1",
        Amacr: "\u0100",
        amacr: "\u0101",
        amalg: "\u2A3F",
        amp: "&",
        AMP: "&",
        andand: "\u2A55",
        And: "\u2A53",
        and: "\u2227",
        andd: "\u2A5C",
        andslope: "\u2A58",
        andv: "\u2A5A",
        ang: "\u2220",
        ange: "\u29A4",
        angle: "\u2220",
        angmsdaa: "\u29A8",
        angmsdab: "\u29A9",
        angmsdac: "\u29AA",
        angmsdad: "\u29AB",
        angmsdae: "\u29AC",
        angmsdaf: "\u29AD",
        angmsdag: "\u29AE",
        angmsdah: "\u29AF",
        angmsd: "\u2221",
        angrt: "\u221F",
        angrtvb: "\u22BE",
        angrtvbd: "\u299D",
        angsph: "\u2222",
        angst: "\xC5",
        angzarr: "\u237C",
        Aogon: "\u0104",
        aogon: "\u0105",
        Aopf: "\u{1D538}",
        aopf: "\u{1D552}",
        apacir: "\u2A6F",
        ap: "\u2248",
        apE: "\u2A70",
        ape: "\u224A",
        apid: "\u224B",
        apos: "'",
        ApplyFunction: "\u2061",
        approx: "\u2248",
        approxeq: "\u224A",
        Aring: "\xC5",
        aring: "\xE5",
        Ascr: "\u{1D49C}",
        ascr: "\u{1D4B6}",
        Assign: "\u2254",
        ast: "*",
        asymp: "\u2248",
        asympeq: "\u224D",
        Atilde: "\xC3",
        atilde: "\xE3",
        Auml: "\xC4",
        auml: "\xE4",
        awconint: "\u2233",
        awint: "\u2A11",
        backcong: "\u224C",
        backepsilon: "\u03F6",
        backprime: "\u2035",
        backsim: "\u223D",
        backsimeq: "\u22CD",
        Backslash: "\u2216",
        Barv: "\u2AE7",
        barvee: "\u22BD",
        barwed: "\u2305",
        Barwed: "\u2306",
        barwedge: "\u2305",
        bbrk: "\u23B5",
        bbrktbrk: "\u23B6",
        bcong: "\u224C",
        Bcy: "\u0411",
        bcy: "\u0431",
        bdquo: "\u201E",
        becaus: "\u2235",
        because: "\u2235",
        Because: "\u2235",
        bemptyv: "\u29B0",
        bepsi: "\u03F6",
        bernou: "\u212C",
        Bernoullis: "\u212C",
        Beta: "\u0392",
        beta: "\u03B2",
        beth: "\u2136",
        between: "\u226C",
        Bfr: "\u{1D505}",
        bfr: "\u{1D51F}",
        bigcap: "\u22C2",
        bigcirc: "\u25EF",
        bigcup: "\u22C3",
        bigodot: "\u2A00",
        bigoplus: "\u2A01",
        bigotimes: "\u2A02",
        bigsqcup: "\u2A06",
        bigstar: "\u2605",
        bigtriangledown: "\u25BD",
        bigtriangleup: "\u25B3",
        biguplus: "\u2A04",
        bigvee: "\u22C1",
        bigwedge: "\u22C0",
        bkarow: "\u290D",
        blacklozenge: "\u29EB",
        blacksquare: "\u25AA",
        blacktriangle: "\u25B4",
        blacktriangledown: "\u25BE",
        blacktriangleleft: "\u25C2",
        blacktriangleright: "\u25B8",
        blank: "\u2423",
        blk12: "\u2592",
        blk14: "\u2591",
        blk34: "\u2593",
        block: "\u2588",
        bne: "=\u20E5",
        bnequiv: "\u2261\u20E5",
        bNot: "\u2AED",
        bnot: "\u2310",
        Bopf: "\u{1D539}",
        bopf: "\u{1D553}",
        bot: "\u22A5",
        bottom: "\u22A5",
        bowtie: "\u22C8",
        boxbox: "\u29C9",
        boxdl: "\u2510",
        boxdL: "\u2555",
        boxDl: "\u2556",
        boxDL: "\u2557",
        boxdr: "\u250C",
        boxdR: "\u2552",
        boxDr: "\u2553",
        boxDR: "\u2554",
        boxh: "\u2500",
        boxH: "\u2550",
        boxhd: "\u252C",
        boxHd: "\u2564",
        boxhD: "\u2565",
        boxHD: "\u2566",
        boxhu: "\u2534",
        boxHu: "\u2567",
        boxhU: "\u2568",
        boxHU: "\u2569",
        boxminus: "\u229F",
        boxplus: "\u229E",
        boxtimes: "\u22A0",
        boxul: "\u2518",
        boxuL: "\u255B",
        boxUl: "\u255C",
        boxUL: "\u255D",
        boxur: "\u2514",
        boxuR: "\u2558",
        boxUr: "\u2559",
        boxUR: "\u255A",
        boxv: "\u2502",
        boxV: "\u2551",
        boxvh: "\u253C",
        boxvH: "\u256A",
        boxVh: "\u256B",
        boxVH: "\u256C",
        boxvl: "\u2524",
        boxvL: "\u2561",
        boxVl: "\u2562",
        boxVL: "\u2563",
        boxvr: "\u251C",
        boxvR: "\u255E",
        boxVr: "\u255F",
        boxVR: "\u2560",
        bprime: "\u2035",
        breve: "\u02D8",
        Breve: "\u02D8",
        brvbar: "\xA6",
        bscr: "\u{1D4B7}",
        Bscr: "\u212C",
        bsemi: "\u204F",
        bsim: "\u223D",
        bsime: "\u22CD",
        bsolb: "\u29C5",
        bsol: "\\",
        bsolhsub: "\u27C8",
        bull: "\u2022",
        bullet: "\u2022",
        bump: "\u224E",
        bumpE: "\u2AAE",
        bumpe: "\u224F",
        Bumpeq: "\u224E",
        bumpeq: "\u224F",
        Cacute: "\u0106",
        cacute: "\u0107",
        capand: "\u2A44",
        capbrcup: "\u2A49",
        capcap: "\u2A4B",
        cap: "\u2229",
        Cap: "\u22D2",
        capcup: "\u2A47",
        capdot: "\u2A40",
        CapitalDifferentialD: "\u2145",
        caps: "\u2229\uFE00",
        caret: "\u2041",
        caron: "\u02C7",
        Cayleys: "\u212D",
        ccaps: "\u2A4D",
        Ccaron: "\u010C",
        ccaron: "\u010D",
        Ccedil: "\xC7",
        ccedil: "\xE7",
        Ccirc: "\u0108",
        ccirc: "\u0109",
        Cconint: "\u2230",
        ccups: "\u2A4C",
        ccupssm: "\u2A50",
        Cdot: "\u010A",
        cdot: "\u010B",
        cedil: "\xB8",
        Cedilla: "\xB8",
        cemptyv: "\u29B2",
        cent: "\xA2",
        centerdot: "\xB7",
        CenterDot: "\xB7",
        cfr: "\u{1D520}",
        Cfr: "\u212D",
        CHcy: "\u0427",
        chcy: "\u0447",
        check: "\u2713",
        checkmark: "\u2713",
        Chi: "\u03A7",
        chi: "\u03C7",
        circ: "\u02C6",
        circeq: "\u2257",
        circlearrowleft: "\u21BA",
        circlearrowright: "\u21BB",
        circledast: "\u229B",
        circledcirc: "\u229A",
        circleddash: "\u229D",
        CircleDot: "\u2299",
        circledR: "\xAE",
        circledS: "\u24C8",
        CircleMinus: "\u2296",
        CirclePlus: "\u2295",
        CircleTimes: "\u2297",
        cir: "\u25CB",
        cirE: "\u29C3",
        cire: "\u2257",
        cirfnint: "\u2A10",
        cirmid: "\u2AEF",
        cirscir: "\u29C2",
        ClockwiseContourIntegral: "\u2232",
        CloseCurlyDoubleQuote: "\u201D",
        CloseCurlyQuote: "\u2019",
        clubs: "\u2663",
        clubsuit: "\u2663",
        colon: ":",
        Colon: "\u2237",
        Colone: "\u2A74",
        colone: "\u2254",
        coloneq: "\u2254",
        comma: ",",
        commat: "@",
        comp: "\u2201",
        compfn: "\u2218",
        complement: "\u2201",
        complexes: "\u2102",
        cong: "\u2245",
        congdot: "\u2A6D",
        Congruent: "\u2261",
        conint: "\u222E",
        Conint: "\u222F",
        ContourIntegral: "\u222E",
        copf: "\u{1D554}",
        Copf: "\u2102",
        coprod: "\u2210",
        Coproduct: "\u2210",
        copy: "\xA9",
        COPY: "\xA9",
        copysr: "\u2117",
        CounterClockwiseContourIntegral: "\u2233",
        crarr: "\u21B5",
        cross: "\u2717",
        Cross: "\u2A2F",
        Cscr: "\u{1D49E}",
        cscr: "\u{1D4B8}",
        csub: "\u2ACF",
        csube: "\u2AD1",
        csup: "\u2AD0",
        csupe: "\u2AD2",
        ctdot: "\u22EF",
        cudarrl: "\u2938",
        cudarrr: "\u2935",
        cuepr: "\u22DE",
        cuesc: "\u22DF",
        cularr: "\u21B6",
        cularrp: "\u293D",
        cupbrcap: "\u2A48",
        cupcap: "\u2A46",
        CupCap: "\u224D",
        cup: "\u222A",
        Cup: "\u22D3",
        cupcup: "\u2A4A",
        cupdot: "\u228D",
        cupor: "\u2A45",
        cups: "\u222A\uFE00",
        curarr: "\u21B7",
        curarrm: "\u293C",
        curlyeqprec: "\u22DE",
        curlyeqsucc: "\u22DF",
        curlyvee: "\u22CE",
        curlywedge: "\u22CF",
        curren: "\xA4",
        curvearrowleft: "\u21B6",
        curvearrowright: "\u21B7",
        cuvee: "\u22CE",
        cuwed: "\u22CF",
        cwconint: "\u2232",
        cwint: "\u2231",
        cylcty: "\u232D",
        dagger: "\u2020",
        Dagger: "\u2021",
        daleth: "\u2138",
        darr: "\u2193",
        Darr: "\u21A1",
        dArr: "\u21D3",
        dash: "\u2010",
        Dashv: "\u2AE4",
        dashv: "\u22A3",
        dbkarow: "\u290F",
        dblac: "\u02DD",
        Dcaron: "\u010E",
        dcaron: "\u010F",
        Dcy: "\u0414",
        dcy: "\u0434",
        ddagger: "\u2021",
        ddarr: "\u21CA",
        DD: "\u2145",
        dd: "\u2146",
        DDotrahd: "\u2911",
        ddotseq: "\u2A77",
        deg: "\xB0",
        Del: "\u2207",
        Delta: "\u0394",
        delta: "\u03B4",
        demptyv: "\u29B1",
        dfisht: "\u297F",
        Dfr: "\u{1D507}",
        dfr: "\u{1D521}",
        dHar: "\u2965",
        dharl: "\u21C3",
        dharr: "\u21C2",
        DiacriticalAcute: "\xB4",
        DiacriticalDot: "\u02D9",
        DiacriticalDoubleAcute: "\u02DD",
        DiacriticalGrave: "`",
        DiacriticalTilde: "\u02DC",
        diam: "\u22C4",
        diamond: "\u22C4",
        Diamond: "\u22C4",
        diamondsuit: "\u2666",
        diams: "\u2666",
        die: "\xA8",
        DifferentialD: "\u2146",
        digamma: "\u03DD",
        disin: "\u22F2",
        div: "\xF7",
        divide: "\xF7",
        divideontimes: "\u22C7",
        divonx: "\u22C7",
        DJcy: "\u0402",
        djcy: "\u0452",
        dlcorn: "\u231E",
        dlcrop: "\u230D",
        dollar: "$",
        Dopf: "\u{1D53B}",
        dopf: "\u{1D555}",
        Dot: "\xA8",
        dot: "\u02D9",
        DotDot: "\u20DC",
        doteq: "\u2250",
        doteqdot: "\u2251",
        DotEqual: "\u2250",
        dotminus: "\u2238",
        dotplus: "\u2214",
        dotsquare: "\u22A1",
        doublebarwedge: "\u2306",
        DoubleContourIntegral: "\u222F",
        DoubleDot: "\xA8",
        DoubleDownArrow: "\u21D3",
        DoubleLeftArrow: "\u21D0",
        DoubleLeftRightArrow: "\u21D4",
        DoubleLeftTee: "\u2AE4",
        DoubleLongLeftArrow: "\u27F8",
        DoubleLongLeftRightArrow: "\u27FA",
        DoubleLongRightArrow: "\u27F9",
        DoubleRightArrow: "\u21D2",
        DoubleRightTee: "\u22A8",
        DoubleUpArrow: "\u21D1",
        DoubleUpDownArrow: "\u21D5",
        DoubleVerticalBar: "\u2225",
        DownArrowBar: "\u2913",
        downarrow: "\u2193",
        DownArrow: "\u2193",
        Downarrow: "\u21D3",
        DownArrowUpArrow: "\u21F5",
        DownBreve: "\u0311",
        downdownarrows: "\u21CA",
        downharpoonleft: "\u21C3",
        downharpoonright: "\u21C2",
        DownLeftRightVector: "\u2950",
        DownLeftTeeVector: "\u295E",
        DownLeftVectorBar: "\u2956",
        DownLeftVector: "\u21BD",
        DownRightTeeVector: "\u295F",
        DownRightVectorBar: "\u2957",
        DownRightVector: "\u21C1",
        DownTeeArrow: "\u21A7",
        DownTee: "\u22A4",
        drbkarow: "\u2910",
        drcorn: "\u231F",
        drcrop: "\u230C",
        Dscr: "\u{1D49F}",
        dscr: "\u{1D4B9}",
        DScy: "\u0405",
        dscy: "\u0455",
        dsol: "\u29F6",
        Dstrok: "\u0110",
        dstrok: "\u0111",
        dtdot: "\u22F1",
        dtri: "\u25BF",
        dtrif: "\u25BE",
        duarr: "\u21F5",
        duhar: "\u296F",
        dwangle: "\u29A6",
        DZcy: "\u040F",
        dzcy: "\u045F",
        dzigrarr: "\u27FF",
        Eacute: "\xC9",
        eacute: "\xE9",
        easter: "\u2A6E",
        Ecaron: "\u011A",
        ecaron: "\u011B",
        Ecirc: "\xCA",
        ecirc: "\xEA",
        ecir: "\u2256",
        ecolon: "\u2255",
        Ecy: "\u042D",
        ecy: "\u044D",
        eDDot: "\u2A77",
        Edot: "\u0116",
        edot: "\u0117",
        eDot: "\u2251",
        ee: "\u2147",
        efDot: "\u2252",
        Efr: "\u{1D508}",
        efr: "\u{1D522}",
        eg: "\u2A9A",
        Egrave: "\xC8",
        egrave: "\xE8",
        egs: "\u2A96",
        egsdot: "\u2A98",
        el: "\u2A99",
        Element: "\u2208",
        elinters: "\u23E7",
        ell: "\u2113",
        els: "\u2A95",
        elsdot: "\u2A97",
        Emacr: "\u0112",
        emacr: "\u0113",
        empty: "\u2205",
        emptyset: "\u2205",
        EmptySmallSquare: "\u25FB",
        emptyv: "\u2205",
        EmptyVerySmallSquare: "\u25AB",
        emsp13: "\u2004",
        emsp14: "\u2005",
        emsp: "\u2003",
        ENG: "\u014A",
        eng: "\u014B",
        ensp: "\u2002",
        Eogon: "\u0118",
        eogon: "\u0119",
        Eopf: "\u{1D53C}",
        eopf: "\u{1D556}",
        epar: "\u22D5",
        eparsl: "\u29E3",
        eplus: "\u2A71",
        epsi: "\u03B5",
        Epsilon: "\u0395",
        epsilon: "\u03B5",
        epsiv: "\u03F5",
        eqcirc: "\u2256",
        eqcolon: "\u2255",
        eqsim: "\u2242",
        eqslantgtr: "\u2A96",
        eqslantless: "\u2A95",
        Equal: "\u2A75",
        equals: "=",
        EqualTilde: "\u2242",
        equest: "\u225F",
        Equilibrium: "\u21CC",
        equiv: "\u2261",
        equivDD: "\u2A78",
        eqvparsl: "\u29E5",
        erarr: "\u2971",
        erDot: "\u2253",
        escr: "\u212F",
        Escr: "\u2130",
        esdot: "\u2250",
        Esim: "\u2A73",
        esim: "\u2242",
        Eta: "\u0397",
        eta: "\u03B7",
        ETH: "\xD0",
        eth: "\xF0",
        Euml: "\xCB",
        euml: "\xEB",
        euro: "\u20AC",
        excl: "!",
        exist: "\u2203",
        Exists: "\u2203",
        expectation: "\u2130",
        exponentiale: "\u2147",
        ExponentialE: "\u2147",
        fallingdotseq: "\u2252",
        Fcy: "\u0424",
        fcy: "\u0444",
        female: "\u2640",
        ffilig: "\uFB03",
        fflig: "\uFB00",
        ffllig: "\uFB04",
        Ffr: "\u{1D509}",
        ffr: "\u{1D523}",
        filig: "\uFB01",
        FilledSmallSquare: "\u25FC",
        FilledVerySmallSquare: "\u25AA",
        fjlig: "fj",
        flat: "\u266D",
        fllig: "\uFB02",
        fltns: "\u25B1",
        fnof: "\u0192",
        Fopf: "\u{1D53D}",
        fopf: "\u{1D557}",
        forall: "\u2200",
        ForAll: "\u2200",
        fork: "\u22D4",
        forkv: "\u2AD9",
        Fouriertrf: "\u2131",
        fpartint: "\u2A0D",
        frac12: "\xBD",
        frac13: "\u2153",
        frac14: "\xBC",
        frac15: "\u2155",
        frac16: "\u2159",
        frac18: "\u215B",
        frac23: "\u2154",
        frac25: "\u2156",
        frac34: "\xBE",
        frac35: "\u2157",
        frac38: "\u215C",
        frac45: "\u2158",
        frac56: "\u215A",
        frac58: "\u215D",
        frac78: "\u215E",
        frasl: "\u2044",
        frown: "\u2322",
        fscr: "\u{1D4BB}",
        Fscr: "\u2131",
        gacute: "\u01F5",
        Gamma: "\u0393",
        gamma: "\u03B3",
        Gammad: "\u03DC",
        gammad: "\u03DD",
        gap: "\u2A86",
        Gbreve: "\u011E",
        gbreve: "\u011F",
        Gcedil: "\u0122",
        Gcirc: "\u011C",
        gcirc: "\u011D",
        Gcy: "\u0413",
        gcy: "\u0433",
        Gdot: "\u0120",
        gdot: "\u0121",
        ge: "\u2265",
        gE: "\u2267",
        gEl: "\u2A8C",
        gel: "\u22DB",
        geq: "\u2265",
        geqq: "\u2267",
        geqslant: "\u2A7E",
        gescc: "\u2AA9",
        ges: "\u2A7E",
        gesdot: "\u2A80",
        gesdoto: "\u2A82",
        gesdotol: "\u2A84",
        gesl: "\u22DB\uFE00",
        gesles: "\u2A94",
        Gfr: "\u{1D50A}",
        gfr: "\u{1D524}",
        gg: "\u226B",
        Gg: "\u22D9",
        ggg: "\u22D9",
        gimel: "\u2137",
        GJcy: "\u0403",
        gjcy: "\u0453",
        gla: "\u2AA5",
        gl: "\u2277",
        glE: "\u2A92",
        glj: "\u2AA4",
        gnap: "\u2A8A",
        gnapprox: "\u2A8A",
        gne: "\u2A88",
        gnE: "\u2269",
        gneq: "\u2A88",
        gneqq: "\u2269",
        gnsim: "\u22E7",
        Gopf: "\u{1D53E}",
        gopf: "\u{1D558}",
        grave: "`",
        GreaterEqual: "\u2265",
        GreaterEqualLess: "\u22DB",
        GreaterFullEqual: "\u2267",
        GreaterGreater: "\u2AA2",
        GreaterLess: "\u2277",
        GreaterSlantEqual: "\u2A7E",
        GreaterTilde: "\u2273",
        Gscr: "\u{1D4A2}",
        gscr: "\u210A",
        gsim: "\u2273",
        gsime: "\u2A8E",
        gsiml: "\u2A90",
        gtcc: "\u2AA7",
        gtcir: "\u2A7A",
        gt: ">",
        GT: ">",
        Gt: "\u226B",
        gtdot: "\u22D7",
        gtlPar: "\u2995",
        gtquest: "\u2A7C",
        gtrapprox: "\u2A86",
        gtrarr: "\u2978",
        gtrdot: "\u22D7",
        gtreqless: "\u22DB",
        gtreqqless: "\u2A8C",
        gtrless: "\u2277",
        gtrsim: "\u2273",
        gvertneqq: "\u2269\uFE00",
        gvnE: "\u2269\uFE00",
        Hacek: "\u02C7",
        hairsp: "\u200A",
        half: "\xBD",
        hamilt: "\u210B",
        HARDcy: "\u042A",
        hardcy: "\u044A",
        harrcir: "\u2948",
        harr: "\u2194",
        hArr: "\u21D4",
        harrw: "\u21AD",
        Hat: "^",
        hbar: "\u210F",
        Hcirc: "\u0124",
        hcirc: "\u0125",
        hearts: "\u2665",
        heartsuit: "\u2665",
        hellip: "\u2026",
        hercon: "\u22B9",
        hfr: "\u{1D525}",
        Hfr: "\u210C",
        HilbertSpace: "\u210B",
        hksearow: "\u2925",
        hkswarow: "\u2926",
        hoarr: "\u21FF",
        homtht: "\u223B",
        hookleftarrow: "\u21A9",
        hookrightarrow: "\u21AA",
        hopf: "\u{1D559}",
        Hopf: "\u210D",
        horbar: "\u2015",
        HorizontalLine: "\u2500",
        hscr: "\u{1D4BD}",
        Hscr: "\u210B",
        hslash: "\u210F",
        Hstrok: "\u0126",
        hstrok: "\u0127",
        HumpDownHump: "\u224E",
        HumpEqual: "\u224F",
        hybull: "\u2043",
        hyphen: "\u2010",
        Iacute: "\xCD",
        iacute: "\xED",
        ic: "\u2063",
        Icirc: "\xCE",
        icirc: "\xEE",
        Icy: "\u0418",
        icy: "\u0438",
        Idot: "\u0130",
        IEcy: "\u0415",
        iecy: "\u0435",
        iexcl: "\xA1",
        iff: "\u21D4",
        ifr: "\u{1D526}",
        Ifr: "\u2111",
        Igrave: "\xCC",
        igrave: "\xEC",
        ii: "\u2148",
        iiiint: "\u2A0C",
        iiint: "\u222D",
        iinfin: "\u29DC",
        iiota: "\u2129",
        IJlig: "\u0132",
        ijlig: "\u0133",
        Imacr: "\u012A",
        imacr: "\u012B",
        image: "\u2111",
        ImaginaryI: "\u2148",
        imagline: "\u2110",
        imagpart: "\u2111",
        imath: "\u0131",
        Im: "\u2111",
        imof: "\u22B7",
        imped: "\u01B5",
        Implies: "\u21D2",
        incare: "\u2105",
        in: "\u2208",
        infin: "\u221E",
        infintie: "\u29DD",
        inodot: "\u0131",
        intcal: "\u22BA",
        int: "\u222B",
        Int: "\u222C",
        integers: "\u2124",
        Integral: "\u222B",
        intercal: "\u22BA",
        Intersection: "\u22C2",
        intlarhk: "\u2A17",
        intprod: "\u2A3C",
        InvisibleComma: "\u2063",
        InvisibleTimes: "\u2062",
        IOcy: "\u0401",
        iocy: "\u0451",
        Iogon: "\u012E",
        iogon: "\u012F",
        Iopf: "\u{1D540}",
        iopf: "\u{1D55A}",
        Iota: "\u0399",
        iota: "\u03B9",
        iprod: "\u2A3C",
        iquest: "\xBF",
        iscr: "\u{1D4BE}",
        Iscr: "\u2110",
        isin: "\u2208",
        isindot: "\u22F5",
        isinE: "\u22F9",
        isins: "\u22F4",
        isinsv: "\u22F3",
        isinv: "\u2208",
        it: "\u2062",
        Itilde: "\u0128",
        itilde: "\u0129",
        Iukcy: "\u0406",
        iukcy: "\u0456",
        Iuml: "\xCF",
        iuml: "\xEF",
        Jcirc: "\u0134",
        jcirc: "\u0135",
        Jcy: "\u0419",
        jcy: "\u0439",
        Jfr: "\u{1D50D}",
        jfr: "\u{1D527}",
        jmath: "\u0237",
        Jopf: "\u{1D541}",
        jopf: "\u{1D55B}",
        Jscr: "\u{1D4A5}",
        jscr: "\u{1D4BF}",
        Jsercy: "\u0408",
        jsercy: "\u0458",
        Jukcy: "\u0404",
        jukcy: "\u0454",
        Kappa: "\u039A",
        kappa: "\u03BA",
        kappav: "\u03F0",
        Kcedil: "\u0136",
        kcedil: "\u0137",
        Kcy: "\u041A",
        kcy: "\u043A",
        Kfr: "\u{1D50E}",
        kfr: "\u{1D528}",
        kgreen: "\u0138",
        KHcy: "\u0425",
        khcy: "\u0445",
        KJcy: "\u040C",
        kjcy: "\u045C",
        Kopf: "\u{1D542}",
        kopf: "\u{1D55C}",
        Kscr: "\u{1D4A6}",
        kscr: "\u{1D4C0}",
        lAarr: "\u21DA",
        Lacute: "\u0139",
        lacute: "\u013A",
        laemptyv: "\u29B4",
        lagran: "\u2112",
        Lambda: "\u039B",
        lambda: "\u03BB",
        lang: "\u27E8",
        Lang: "\u27EA",
        langd: "\u2991",
        langle: "\u27E8",
        lap: "\u2A85",
        Laplacetrf: "\u2112",
        laquo: "\xAB",
        larrb: "\u21E4",
        larrbfs: "\u291F",
        larr: "\u2190",
        Larr: "\u219E",
        lArr: "\u21D0",
        larrfs: "\u291D",
        larrhk: "\u21A9",
        larrlp: "\u21AB",
        larrpl: "\u2939",
        larrsim: "\u2973",
        larrtl: "\u21A2",
        latail: "\u2919",
        lAtail: "\u291B",
        lat: "\u2AAB",
        late: "\u2AAD",
        lates: "\u2AAD\uFE00",
        lbarr: "\u290C",
        lBarr: "\u290E",
        lbbrk: "\u2772",
        lbrace: "{",
        lbrack: "[",
        lbrke: "\u298B",
        lbrksld: "\u298F",
        lbrkslu: "\u298D",
        Lcaron: "\u013D",
        lcaron: "\u013E",
        Lcedil: "\u013B",
        lcedil: "\u013C",
        lceil: "\u2308",
        lcub: "{",
        Lcy: "\u041B",
        lcy: "\u043B",
        ldca: "\u2936",
        ldquo: "\u201C",
        ldquor: "\u201E",
        ldrdhar: "\u2967",
        ldrushar: "\u294B",
        ldsh: "\u21B2",
        le: "\u2264",
        lE: "\u2266",
        LeftAngleBracket: "\u27E8",
        LeftArrowBar: "\u21E4",
        leftarrow: "\u2190",
        LeftArrow: "\u2190",
        Leftarrow: "\u21D0",
        LeftArrowRightArrow: "\u21C6",
        leftarrowtail: "\u21A2",
        LeftCeiling: "\u2308",
        LeftDoubleBracket: "\u27E6",
        LeftDownTeeVector: "\u2961",
        LeftDownVectorBar: "\u2959",
        LeftDownVector: "\u21C3",
        LeftFloor: "\u230A",
        leftharpoondown: "\u21BD",
        leftharpoonup: "\u21BC",
        leftleftarrows: "\u21C7",
        leftrightarrow: "\u2194",
        LeftRightArrow: "\u2194",
        Leftrightarrow: "\u21D4",
        leftrightarrows: "\u21C6",
        leftrightharpoons: "\u21CB",
        leftrightsquigarrow: "\u21AD",
        LeftRightVector: "\u294E",
        LeftTeeArrow: "\u21A4",
        LeftTee: "\u22A3",
        LeftTeeVector: "\u295A",
        leftthreetimes: "\u22CB",
        LeftTriangleBar: "\u29CF",
        LeftTriangle: "\u22B2",
        LeftTriangleEqual: "\u22B4",
        LeftUpDownVector: "\u2951",
        LeftUpTeeVector: "\u2960",
        LeftUpVectorBar: "\u2958",
        LeftUpVector: "\u21BF",
        LeftVectorBar: "\u2952",
        LeftVector: "\u21BC",
        lEg: "\u2A8B",
        leg: "\u22DA",
        leq: "\u2264",
        leqq: "\u2266",
        leqslant: "\u2A7D",
        lescc: "\u2AA8",
        les: "\u2A7D",
        lesdot: "\u2A7F",
        lesdoto: "\u2A81",
        lesdotor: "\u2A83",
        lesg: "\u22DA\uFE00",
        lesges: "\u2A93",
        lessapprox: "\u2A85",
        lessdot: "\u22D6",
        lesseqgtr: "\u22DA",
        lesseqqgtr: "\u2A8B",
        LessEqualGreater: "\u22DA",
        LessFullEqual: "\u2266",
        LessGreater: "\u2276",
        lessgtr: "\u2276",
        LessLess: "\u2AA1",
        lesssim: "\u2272",
        LessSlantEqual: "\u2A7D",
        LessTilde: "\u2272",
        lfisht: "\u297C",
        lfloor: "\u230A",
        Lfr: "\u{1D50F}",
        lfr: "\u{1D529}",
        lg: "\u2276",
        lgE: "\u2A91",
        lHar: "\u2962",
        lhard: "\u21BD",
        lharu: "\u21BC",
        lharul: "\u296A",
        lhblk: "\u2584",
        LJcy: "\u0409",
        ljcy: "\u0459",
        llarr: "\u21C7",
        ll: "\u226A",
        Ll: "\u22D8",
        llcorner: "\u231E",
        Lleftarrow: "\u21DA",
        llhard: "\u296B",
        lltri: "\u25FA",
        Lmidot: "\u013F",
        lmidot: "\u0140",
        lmoustache: "\u23B0",
        lmoust: "\u23B0",
        lnap: "\u2A89",
        lnapprox: "\u2A89",
        lne: "\u2A87",
        lnE: "\u2268",
        lneq: "\u2A87",
        lneqq: "\u2268",
        lnsim: "\u22E6",
        loang: "\u27EC",
        loarr: "\u21FD",
        lobrk: "\u27E6",
        longleftarrow: "\u27F5",
        LongLeftArrow: "\u27F5",
        Longleftarrow: "\u27F8",
        longleftrightarrow: "\u27F7",
        LongLeftRightArrow: "\u27F7",
        Longleftrightarrow: "\u27FA",
        longmapsto: "\u27FC",
        longrightarrow: "\u27F6",
        LongRightArrow: "\u27F6",
        Longrightarrow: "\u27F9",
        looparrowleft: "\u21AB",
        looparrowright: "\u21AC",
        lopar: "\u2985",
        Lopf: "\u{1D543}",
        lopf: "\u{1D55D}",
        loplus: "\u2A2D",
        lotimes: "\u2A34",
        lowast: "\u2217",
        lowbar: "_",
        LowerLeftArrow: "\u2199",
        LowerRightArrow: "\u2198",
        loz: "\u25CA",
        lozenge: "\u25CA",
        lozf: "\u29EB",
        lpar: "(",
        lparlt: "\u2993",
        lrarr: "\u21C6",
        lrcorner: "\u231F",
        lrhar: "\u21CB",
        lrhard: "\u296D",
        lrm: "\u200E",
        lrtri: "\u22BF",
        lsaquo: "\u2039",
        lscr: "\u{1D4C1}",
        Lscr: "\u2112",
        lsh: "\u21B0",
        Lsh: "\u21B0",
        lsim: "\u2272",
        lsime: "\u2A8D",
        lsimg: "\u2A8F",
        lsqb: "[",
        lsquo: "\u2018",
        lsquor: "\u201A",
        Lstrok: "\u0141",
        lstrok: "\u0142",
        ltcc: "\u2AA6",
        ltcir: "\u2A79",
        lt: "<",
        LT: "<",
        Lt: "\u226A",
        ltdot: "\u22D6",
        lthree: "\u22CB",
        ltimes: "\u22C9",
        ltlarr: "\u2976",
        ltquest: "\u2A7B",
        ltri: "\u25C3",
        ltrie: "\u22B4",
        ltrif: "\u25C2",
        ltrPar: "\u2996",
        lurdshar: "\u294A",
        luruhar: "\u2966",
        lvertneqq: "\u2268\uFE00",
        lvnE: "\u2268\uFE00",
        macr: "\xAF",
        male: "\u2642",
        malt: "\u2720",
        maltese: "\u2720",
        Map: "\u2905",
        map: "\u21A6",
        mapsto: "\u21A6",
        mapstodown: "\u21A7",
        mapstoleft: "\u21A4",
        mapstoup: "\u21A5",
        marker: "\u25AE",
        mcomma: "\u2A29",
        Mcy: "\u041C",
        mcy: "\u043C",
        mdash: "\u2014",
        mDDot: "\u223A",
        measuredangle: "\u2221",
        MediumSpace: "\u205F",
        Mellintrf: "\u2133",
        Mfr: "\u{1D510}",
        mfr: "\u{1D52A}",
        mho: "\u2127",
        micro: "\xB5",
        midast: "*",
        midcir: "\u2AF0",
        mid: "\u2223",
        middot: "\xB7",
        minusb: "\u229F",
        minus: "\u2212",
        minusd: "\u2238",
        minusdu: "\u2A2A",
        MinusPlus: "\u2213",
        mlcp: "\u2ADB",
        mldr: "\u2026",
        mnplus: "\u2213",
        models: "\u22A7",
        Mopf: "\u{1D544}",
        mopf: "\u{1D55E}",
        mp: "\u2213",
        mscr: "\u{1D4C2}",
        Mscr: "\u2133",
        mstpos: "\u223E",
        Mu: "\u039C",
        mu: "\u03BC",
        multimap: "\u22B8",
        mumap: "\u22B8",
        nabla: "\u2207",
        Nacute: "\u0143",
        nacute: "\u0144",
        nang: "\u2220\u20D2",
        nap: "\u2249",
        napE: "\u2A70\u0338",
        napid: "\u224B\u0338",
        napos: "\u0149",
        napprox: "\u2249",
        natural: "\u266E",
        naturals: "\u2115",
        natur: "\u266E",
        nbsp: "\xA0",
        nbump: "\u224E\u0338",
        nbumpe: "\u224F\u0338",
        ncap: "\u2A43",
        Ncaron: "\u0147",
        ncaron: "\u0148",
        Ncedil: "\u0145",
        ncedil: "\u0146",
        ncong: "\u2247",
        ncongdot: "\u2A6D\u0338",
        ncup: "\u2A42",
        Ncy: "\u041D",
        ncy: "\u043D",
        ndash: "\u2013",
        nearhk: "\u2924",
        nearr: "\u2197",
        neArr: "\u21D7",
        nearrow: "\u2197",
        ne: "\u2260",
        nedot: "\u2250\u0338",
        NegativeMediumSpace: "\u200B",
        NegativeThickSpace: "\u200B",
        NegativeThinSpace: "\u200B",
        NegativeVeryThinSpace: "\u200B",
        nequiv: "\u2262",
        nesear: "\u2928",
        nesim: "\u2242\u0338",
        NestedGreaterGreater: "\u226B",
        NestedLessLess: "\u226A",
        NewLine: "\n",
        nexist: "\u2204",
        nexists: "\u2204",
        Nfr: "\u{1D511}",
        nfr: "\u{1D52B}",
        ngE: "\u2267\u0338",
        nge: "\u2271",
        ngeq: "\u2271",
        ngeqq: "\u2267\u0338",
        ngeqslant: "\u2A7E\u0338",
        nges: "\u2A7E\u0338",
        nGg: "\u22D9\u0338",
        ngsim: "\u2275",
        nGt: "\u226B\u20D2",
        ngt: "\u226F",
        ngtr: "\u226F",
        nGtv: "\u226B\u0338",
        nharr: "\u21AE",
        nhArr: "\u21CE",
        nhpar: "\u2AF2",
        ni: "\u220B",
        nis: "\u22FC",
        nisd: "\u22FA",
        niv: "\u220B",
        NJcy: "\u040A",
        njcy: "\u045A",
        nlarr: "\u219A",
        nlArr: "\u21CD",
        nldr: "\u2025",
        nlE: "\u2266\u0338",
        nle: "\u2270",
        nleftarrow: "\u219A",
        nLeftarrow: "\u21CD",
        nleftrightarrow: "\u21AE",
        nLeftrightarrow: "\u21CE",
        nleq: "\u2270",
        nleqq: "\u2266\u0338",
        nleqslant: "\u2A7D\u0338",
        nles: "\u2A7D\u0338",
        nless: "\u226E",
        nLl: "\u22D8\u0338",
        nlsim: "\u2274",
        nLt: "\u226A\u20D2",
        nlt: "\u226E",
        nltri: "\u22EA",
        nltrie: "\u22EC",
        nLtv: "\u226A\u0338",
        nmid: "\u2224",
        NoBreak: "\u2060",
        NonBreakingSpace: "\xA0",
        nopf: "\u{1D55F}",
        Nopf: "\u2115",
        Not: "\u2AEC",
        not: "\xAC",
        NotCongruent: "\u2262",
        NotCupCap: "\u226D",
        NotDoubleVerticalBar: "\u2226",
        NotElement: "\u2209",
        NotEqual: "\u2260",
        NotEqualTilde: "\u2242\u0338",
        NotExists: "\u2204",
        NotGreater: "\u226F",
        NotGreaterEqual: "\u2271",
        NotGreaterFullEqual: "\u2267\u0338",
        NotGreaterGreater: "\u226B\u0338",
        NotGreaterLess: "\u2279",
        NotGreaterSlantEqual: "\u2A7E\u0338",
        NotGreaterTilde: "\u2275",
        NotHumpDownHump: "\u224E\u0338",
        NotHumpEqual: "\u224F\u0338",
        notin: "\u2209",
        notindot: "\u22F5\u0338",
        notinE: "\u22F9\u0338",
        notinva: "\u2209",
        notinvb: "\u22F7",
        notinvc: "\u22F6",
        NotLeftTriangleBar: "\u29CF\u0338",
        NotLeftTriangle: "\u22EA",
        NotLeftTriangleEqual: "\u22EC",
        NotLess: "\u226E",
        NotLessEqual: "\u2270",
        NotLessGreater: "\u2278",
        NotLessLess: "\u226A\u0338",
        NotLessSlantEqual: "\u2A7D\u0338",
        NotLessTilde: "\u2274",
        NotNestedGreaterGreater: "\u2AA2\u0338",
        NotNestedLessLess: "\u2AA1\u0338",
        notni: "\u220C",
        notniva: "\u220C",
        notnivb: "\u22FE",
        notnivc: "\u22FD",
        NotPrecedes: "\u2280",
        NotPrecedesEqual: "\u2AAF\u0338",
        NotPrecedesSlantEqual: "\u22E0",
        NotReverseElement: "\u220C",
        NotRightTriangleBar: "\u29D0\u0338",
        NotRightTriangle: "\u22EB",
        NotRightTriangleEqual: "\u22ED",
        NotSquareSubset: "\u228F\u0338",
        NotSquareSubsetEqual: "\u22E2",
        NotSquareSuperset: "\u2290\u0338",
        NotSquareSupersetEqual: "\u22E3",
        NotSubset: "\u2282\u20D2",
        NotSubsetEqual: "\u2288",
        NotSucceeds: "\u2281",
        NotSucceedsEqual: "\u2AB0\u0338",
        NotSucceedsSlantEqual: "\u22E1",
        NotSucceedsTilde: "\u227F\u0338",
        NotSuperset: "\u2283\u20D2",
        NotSupersetEqual: "\u2289",
        NotTilde: "\u2241",
        NotTildeEqual: "\u2244",
        NotTildeFullEqual: "\u2247",
        NotTildeTilde: "\u2249",
        NotVerticalBar: "\u2224",
        nparallel: "\u2226",
        npar: "\u2226",
        nparsl: "\u2AFD\u20E5",
        npart: "\u2202\u0338",
        npolint: "\u2A14",
        npr: "\u2280",
        nprcue: "\u22E0",
        nprec: "\u2280",
        npreceq: "\u2AAF\u0338",
        npre: "\u2AAF\u0338",
        nrarrc: "\u2933\u0338",
        nrarr: "\u219B",
        nrArr: "\u21CF",
        nrarrw: "\u219D\u0338",
        nrightarrow: "\u219B",
        nRightarrow: "\u21CF",
        nrtri: "\u22EB",
        nrtrie: "\u22ED",
        nsc: "\u2281",
        nsccue: "\u22E1",
        nsce: "\u2AB0\u0338",
        Nscr: "\u{1D4A9}",
        nscr: "\u{1D4C3}",
        nshortmid: "\u2224",
        nshortparallel: "\u2226",
        nsim: "\u2241",
        nsime: "\u2244",
        nsimeq: "\u2244",
        nsmid: "\u2224",
        nspar: "\u2226",
        nsqsube: "\u22E2",
        nsqsupe: "\u22E3",
        nsub: "\u2284",
        nsubE: "\u2AC5\u0338",
        nsube: "\u2288",
        nsubset: "\u2282\u20D2",
        nsubseteq: "\u2288",
        nsubseteqq: "\u2AC5\u0338",
        nsucc: "\u2281",
        nsucceq: "\u2AB0\u0338",
        nsup: "\u2285",
        nsupE: "\u2AC6\u0338",
        nsupe: "\u2289",
        nsupset: "\u2283\u20D2",
        nsupseteq: "\u2289",
        nsupseteqq: "\u2AC6\u0338",
        ntgl: "\u2279",
        Ntilde: "\xD1",
        ntilde: "\xF1",
        ntlg: "\u2278",
        ntriangleleft: "\u22EA",
        ntrianglelefteq: "\u22EC",
        ntriangleright: "\u22EB",
        ntrianglerighteq: "\u22ED",
        Nu: "\u039D",
        nu: "\u03BD",
        num: "#",
        numero: "\u2116",
        numsp: "\u2007",
        nvap: "\u224D\u20D2",
        nvdash: "\u22AC",
        nvDash: "\u22AD",
        nVdash: "\u22AE",
        nVDash: "\u22AF",
        nvge: "\u2265\u20D2",
        nvgt: ">\u20D2",
        nvHarr: "\u2904",
        nvinfin: "\u29DE",
        nvlArr: "\u2902",
        nvle: "\u2264\u20D2",
        nvlt: "<\u20D2",
        nvltrie: "\u22B4\u20D2",
        nvrArr: "\u2903",
        nvrtrie: "\u22B5\u20D2",
        nvsim: "\u223C\u20D2",
        nwarhk: "\u2923",
        nwarr: "\u2196",
        nwArr: "\u21D6",
        nwarrow: "\u2196",
        nwnear: "\u2927",
        Oacute: "\xD3",
        oacute: "\xF3",
        oast: "\u229B",
        Ocirc: "\xD4",
        ocirc: "\xF4",
        ocir: "\u229A",
        Ocy: "\u041E",
        ocy: "\u043E",
        odash: "\u229D",
        Odblac: "\u0150",
        odblac: "\u0151",
        odiv: "\u2A38",
        odot: "\u2299",
        odsold: "\u29BC",
        OElig: "\u0152",
        oelig: "\u0153",
        ofcir: "\u29BF",
        Ofr: "\u{1D512}",
        ofr: "\u{1D52C}",
        ogon: "\u02DB",
        Ograve: "\xD2",
        ograve: "\xF2",
        ogt: "\u29C1",
        ohbar: "\u29B5",
        ohm: "\u03A9",
        oint: "\u222E",
        olarr: "\u21BA",
        olcir: "\u29BE",
        olcross: "\u29BB",
        oline: "\u203E",
        olt: "\u29C0",
        Omacr: "\u014C",
        omacr: "\u014D",
        Omega: "\u03A9",
        omega: "\u03C9",
        Omicron: "\u039F",
        omicron: "\u03BF",
        omid: "\u29B6",
        ominus: "\u2296",
        Oopf: "\u{1D546}",
        oopf: "\u{1D560}",
        opar: "\u29B7",
        OpenCurlyDoubleQuote: "\u201C",
        OpenCurlyQuote: "\u2018",
        operp: "\u29B9",
        oplus: "\u2295",
        orarr: "\u21BB",
        Or: "\u2A54",
        or: "\u2228",
        ord: "\u2A5D",
        order: "\u2134",
        orderof: "\u2134",
        ordf: "\xAA",
        ordm: "\xBA",
        origof: "\u22B6",
        oror: "\u2A56",
        orslope: "\u2A57",
        orv: "\u2A5B",
        oS: "\u24C8",
        Oscr: "\u{1D4AA}",
        oscr: "\u2134",
        Oslash: "\xD8",
        oslash: "\xF8",
        osol: "\u2298",
        Otilde: "\xD5",
        otilde: "\xF5",
        otimesas: "\u2A36",
        Otimes: "\u2A37",
        otimes: "\u2297",
        Ouml: "\xD6",
        ouml: "\xF6",
        ovbar: "\u233D",
        OverBar: "\u203E",
        OverBrace: "\u23DE",
        OverBracket: "\u23B4",
        OverParenthesis: "\u23DC",
        para: "\xB6",
        parallel: "\u2225",
        par: "\u2225",
        parsim: "\u2AF3",
        parsl: "\u2AFD",
        part: "\u2202",
        PartialD: "\u2202",
        Pcy: "\u041F",
        pcy: "\u043F",
        percnt: "%",
        period: ".",
        permil: "\u2030",
        perp: "\u22A5",
        pertenk: "\u2031",
        Pfr: "\u{1D513}",
        pfr: "\u{1D52D}",
        Phi: "\u03A6",
        phi: "\u03C6",
        phiv: "\u03D5",
        phmmat: "\u2133",
        phone: "\u260E",
        Pi: "\u03A0",
        pi: "\u03C0",
        pitchfork: "\u22D4",
        piv: "\u03D6",
        planck: "\u210F",
        planckh: "\u210E",
        plankv: "\u210F",
        plusacir: "\u2A23",
        plusb: "\u229E",
        pluscir: "\u2A22",
        plus: "+",
        plusdo: "\u2214",
        plusdu: "\u2A25",
        pluse: "\u2A72",
        PlusMinus: "\xB1",
        plusmn: "\xB1",
        plussim: "\u2A26",
        plustwo: "\u2A27",
        pm: "\xB1",
        Poincareplane: "\u210C",
        pointint: "\u2A15",
        popf: "\u{1D561}",
        Popf: "\u2119",
        pound: "\xA3",
        prap: "\u2AB7",
        Pr: "\u2ABB",
        pr: "\u227A",
        prcue: "\u227C",
        precapprox: "\u2AB7",
        prec: "\u227A",
        preccurlyeq: "\u227C",
        Precedes: "\u227A",
        PrecedesEqual: "\u2AAF",
        PrecedesSlantEqual: "\u227C",
        PrecedesTilde: "\u227E",
        preceq: "\u2AAF",
        precnapprox: "\u2AB9",
        precneqq: "\u2AB5",
        precnsim: "\u22E8",
        pre: "\u2AAF",
        prE: "\u2AB3",
        precsim: "\u227E",
        prime: "\u2032",
        Prime: "\u2033",
        primes: "\u2119",
        prnap: "\u2AB9",
        prnE: "\u2AB5",
        prnsim: "\u22E8",
        prod: "\u220F",
        Product: "\u220F",
        profalar: "\u232E",
        profline: "\u2312",
        profsurf: "\u2313",
        prop: "\u221D",
        Proportional: "\u221D",
        Proportion: "\u2237",
        propto: "\u221D",
        prsim: "\u227E",
        prurel: "\u22B0",
        Pscr: "\u{1D4AB}",
        pscr: "\u{1D4C5}",
        Psi: "\u03A8",
        psi: "\u03C8",
        puncsp: "\u2008",
        Qfr: "\u{1D514}",
        qfr: "\u{1D52E}",
        qint: "\u2A0C",
        qopf: "\u{1D562}",
        Qopf: "\u211A",
        qprime: "\u2057",
        Qscr: "\u{1D4AC}",
        qscr: "\u{1D4C6}",
        quaternions: "\u210D",
        quatint: "\u2A16",
        quest: "?",
        questeq: "\u225F",
        quot: '"',
        QUOT: '"',
        rAarr: "\u21DB",
        race: "\u223D\u0331",
        Racute: "\u0154",
        racute: "\u0155",
        radic: "\u221A",
        raemptyv: "\u29B3",
        rang: "\u27E9",
        Rang: "\u27EB",
        rangd: "\u2992",
        range: "\u29A5",
        rangle: "\u27E9",
        raquo: "\xBB",
        rarrap: "\u2975",
        rarrb: "\u21E5",
        rarrbfs: "\u2920",
        rarrc: "\u2933",
        rarr: "\u2192",
        Rarr: "\u21A0",
        rArr: "\u21D2",
        rarrfs: "\u291E",
        rarrhk: "\u21AA",
        rarrlp: "\u21AC",
        rarrpl: "\u2945",
        rarrsim: "\u2974",
        Rarrtl: "\u2916",
        rarrtl: "\u21A3",
        rarrw: "\u219D",
        ratail: "\u291A",
        rAtail: "\u291C",
        ratio: "\u2236",
        rationals: "\u211A",
        rbarr: "\u290D",
        rBarr: "\u290F",
        RBarr: "\u2910",
        rbbrk: "\u2773",
        rbrace: "}",
        rbrack: "]",
        rbrke: "\u298C",
        rbrksld: "\u298E",
        rbrkslu: "\u2990",
        Rcaron: "\u0158",
        rcaron: "\u0159",
        Rcedil: "\u0156",
        rcedil: "\u0157",
        rceil: "\u2309",
        rcub: "}",
        Rcy: "\u0420",
        rcy: "\u0440",
        rdca: "\u2937",
        rdldhar: "\u2969",
        rdquo: "\u201D",
        rdquor: "\u201D",
        rdsh: "\u21B3",
        real: "\u211C",
        realine: "\u211B",
        realpart: "\u211C",
        reals: "\u211D",
        Re: "\u211C",
        rect: "\u25AD",
        reg: "\xAE",
        REG: "\xAE",
        ReverseElement: "\u220B",
        ReverseEquilibrium: "\u21CB",
        ReverseUpEquilibrium: "\u296F",
        rfisht: "\u297D",
        rfloor: "\u230B",
        rfr: "\u{1D52F}",
        Rfr: "\u211C",
        rHar: "\u2964",
        rhard: "\u21C1",
        rharu: "\u21C0",
        rharul: "\u296C",
        Rho: "\u03A1",
        rho: "\u03C1",
        rhov: "\u03F1",
        RightAngleBracket: "\u27E9",
        RightArrowBar: "\u21E5",
        rightarrow: "\u2192",
        RightArrow: "\u2192",
        Rightarrow: "\u21D2",
        RightArrowLeftArrow: "\u21C4",
        rightarrowtail: "\u21A3",
        RightCeiling: "\u2309",
        RightDoubleBracket: "\u27E7",
        RightDownTeeVector: "\u295D",
        RightDownVectorBar: "\u2955",
        RightDownVector: "\u21C2",
        RightFloor: "\u230B",
        rightharpoondown: "\u21C1",
        rightharpoonup: "\u21C0",
        rightleftarrows: "\u21C4",
        rightleftharpoons: "\u21CC",
        rightrightarrows: "\u21C9",
        rightsquigarrow: "\u219D",
        RightTeeArrow: "\u21A6",
        RightTee: "\u22A2",
        RightTeeVector: "\u295B",
        rightthreetimes: "\u22CC",
        RightTriangleBar: "\u29D0",
        RightTriangle: "\u22B3",
        RightTriangleEqual: "\u22B5",
        RightUpDownVector: "\u294F",
        RightUpTeeVector: "\u295C",
        RightUpVectorBar: "\u2954",
        RightUpVector: "\u21BE",
        RightVectorBar: "\u2953",
        RightVector: "\u21C0",
        ring: "\u02DA",
        risingdotseq: "\u2253",
        rlarr: "\u21C4",
        rlhar: "\u21CC",
        rlm: "\u200F",
        rmoustache: "\u23B1",
        rmoust: "\u23B1",
        rnmid: "\u2AEE",
        roang: "\u27ED",
        roarr: "\u21FE",
        robrk: "\u27E7",
        ropar: "\u2986",
        ropf: "\u{1D563}",
        Ropf: "\u211D",
        roplus: "\u2A2E",
        rotimes: "\u2A35",
        RoundImplies: "\u2970",
        rpar: ")",
        rpargt: "\u2994",
        rppolint: "\u2A12",
        rrarr: "\u21C9",
        Rrightarrow: "\u21DB",
        rsaquo: "\u203A",
        rscr: "\u{1D4C7}",
        Rscr: "\u211B",
        rsh: "\u21B1",
        Rsh: "\u21B1",
        rsqb: "]",
        rsquo: "\u2019",
        rsquor: "\u2019",
        rthree: "\u22CC",
        rtimes: "\u22CA",
        rtri: "\u25B9",
        rtrie: "\u22B5",
        rtrif: "\u25B8",
        rtriltri: "\u29CE",
        RuleDelayed: "\u29F4",
        ruluhar: "\u2968",
        rx: "\u211E",
        Sacute: "\u015A",
        sacute: "\u015B",
        sbquo: "\u201A",
        scap: "\u2AB8",
        Scaron: "\u0160",
        scaron: "\u0161",
        Sc: "\u2ABC",
        sc: "\u227B",
        sccue: "\u227D",
        sce: "\u2AB0",
        scE: "\u2AB4",
        Scedil: "\u015E",
        scedil: "\u015F",
        Scirc: "\u015C",
        scirc: "\u015D",
        scnap: "\u2ABA",
        scnE: "\u2AB6",
        scnsim: "\u22E9",
        scpolint: "\u2A13",
        scsim: "\u227F",
        Scy: "\u0421",
        scy: "\u0441",
        sdotb: "\u22A1",
        sdot: "\u22C5",
        sdote: "\u2A66",
        searhk: "\u2925",
        searr: "\u2198",
        seArr: "\u21D8",
        searrow: "\u2198",
        sect: "\xA7",
        semi: ";",
        seswar: "\u2929",
        setminus: "\u2216",
        setmn: "\u2216",
        sext: "\u2736",
        Sfr: "\u{1D516}",
        sfr: "\u{1D530}",
        sfrown: "\u2322",
        sharp: "\u266F",
        SHCHcy: "\u0429",
        shchcy: "\u0449",
        SHcy: "\u0428",
        shcy: "\u0448",
        ShortDownArrow: "\u2193",
        ShortLeftArrow: "\u2190",
        shortmid: "\u2223",
        shortparallel: "\u2225",
        ShortRightArrow: "\u2192",
        ShortUpArrow: "\u2191",
        shy: "\xAD",
        Sigma: "\u03A3",
        sigma: "\u03C3",
        sigmaf: "\u03C2",
        sigmav: "\u03C2",
        sim: "\u223C",
        simdot: "\u2A6A",
        sime: "\u2243",
        simeq: "\u2243",
        simg: "\u2A9E",
        simgE: "\u2AA0",
        siml: "\u2A9D",
        simlE: "\u2A9F",
        simne: "\u2246",
        simplus: "\u2A24",
        simrarr: "\u2972",
        slarr: "\u2190",
        SmallCircle: "\u2218",
        smallsetminus: "\u2216",
        smashp: "\u2A33",
        smeparsl: "\u29E4",
        smid: "\u2223",
        smile: "\u2323",
        smt: "\u2AAA",
        smte: "\u2AAC",
        smtes: "\u2AAC\uFE00",
        SOFTcy: "\u042C",
        softcy: "\u044C",
        solbar: "\u233F",
        solb: "\u29C4",
        sol: "/",
        Sopf: "\u{1D54A}",
        sopf: "\u{1D564}",
        spades: "\u2660",
        spadesuit: "\u2660",
        spar: "\u2225",
        sqcap: "\u2293",
        sqcaps: "\u2293\uFE00",
        sqcup: "\u2294",
        sqcups: "\u2294\uFE00",
        Sqrt: "\u221A",
        sqsub: "\u228F",
        sqsube: "\u2291",
        sqsubset: "\u228F",
        sqsubseteq: "\u2291",
        sqsup: "\u2290",
        sqsupe: "\u2292",
        sqsupset: "\u2290",
        sqsupseteq: "\u2292",
        square: "\u25A1",
        Square: "\u25A1",
        SquareIntersection: "\u2293",
        SquareSubset: "\u228F",
        SquareSubsetEqual: "\u2291",
        SquareSuperset: "\u2290",
        SquareSupersetEqual: "\u2292",
        SquareUnion: "\u2294",
        squarf: "\u25AA",
        squ: "\u25A1",
        squf: "\u25AA",
        srarr: "\u2192",
        Sscr: "\u{1D4AE}",
        sscr: "\u{1D4C8}",
        ssetmn: "\u2216",
        ssmile: "\u2323",
        sstarf: "\u22C6",
        Star: "\u22C6",
        star: "\u2606",
        starf: "\u2605",
        straightepsilon: "\u03F5",
        straightphi: "\u03D5",
        strns: "\xAF",
        sub: "\u2282",
        Sub: "\u22D0",
        subdot: "\u2ABD",
        subE: "\u2AC5",
        sube: "\u2286",
        subedot: "\u2AC3",
        submult: "\u2AC1",
        subnE: "\u2ACB",
        subne: "\u228A",
        subplus: "\u2ABF",
        subrarr: "\u2979",
        subset: "\u2282",
        Subset: "\u22D0",
        subseteq: "\u2286",
        subseteqq: "\u2AC5",
        SubsetEqual: "\u2286",
        subsetneq: "\u228A",
        subsetneqq: "\u2ACB",
        subsim: "\u2AC7",
        subsub: "\u2AD5",
        subsup: "\u2AD3",
        succapprox: "\u2AB8",
        succ: "\u227B",
        succcurlyeq: "\u227D",
        Succeeds: "\u227B",
        SucceedsEqual: "\u2AB0",
        SucceedsSlantEqual: "\u227D",
        SucceedsTilde: "\u227F",
        succeq: "\u2AB0",
        succnapprox: "\u2ABA",
        succneqq: "\u2AB6",
        succnsim: "\u22E9",
        succsim: "\u227F",
        SuchThat: "\u220B",
        sum: "\u2211",
        Sum: "\u2211",
        sung: "\u266A",
        sup1: "\xB9",
        sup2: "\xB2",
        sup3: "\xB3",
        sup: "\u2283",
        Sup: "\u22D1",
        supdot: "\u2ABE",
        supdsub: "\u2AD8",
        supE: "\u2AC6",
        supe: "\u2287",
        supedot: "\u2AC4",
        Superset: "\u2283",
        SupersetEqual: "\u2287",
        suphsol: "\u27C9",
        suphsub: "\u2AD7",
        suplarr: "\u297B",
        supmult: "\u2AC2",
        supnE: "\u2ACC",
        supne: "\u228B",
        supplus: "\u2AC0",
        supset: "\u2283",
        Supset: "\u22D1",
        supseteq: "\u2287",
        supseteqq: "\u2AC6",
        supsetneq: "\u228B",
        supsetneqq: "\u2ACC",
        supsim: "\u2AC8",
        supsub: "\u2AD4",
        supsup: "\u2AD6",
        swarhk: "\u2926",
        swarr: "\u2199",
        swArr: "\u21D9",
        swarrow: "\u2199",
        swnwar: "\u292A",
        szlig: "\xDF",
        Tab: "	",
        target: "\u2316",
        Tau: "\u03A4",
        tau: "\u03C4",
        tbrk: "\u23B4",
        Tcaron: "\u0164",
        tcaron: "\u0165",
        Tcedil: "\u0162",
        tcedil: "\u0163",
        Tcy: "\u0422",
        tcy: "\u0442",
        tdot: "\u20DB",
        telrec: "\u2315",
        Tfr: "\u{1D517}",
        tfr: "\u{1D531}",
        there4: "\u2234",
        therefore: "\u2234",
        Therefore: "\u2234",
        Theta: "\u0398",
        theta: "\u03B8",
        thetasym: "\u03D1",
        thetav: "\u03D1",
        thickapprox: "\u2248",
        thicksim: "\u223C",
        ThickSpace: "\u205F\u200A",
        ThinSpace: "\u2009",
        thinsp: "\u2009",
        thkap: "\u2248",
        thksim: "\u223C",
        THORN: "\xDE",
        thorn: "\xFE",
        tilde: "\u02DC",
        Tilde: "\u223C",
        TildeEqual: "\u2243",
        TildeFullEqual: "\u2245",
        TildeTilde: "\u2248",
        timesbar: "\u2A31",
        timesb: "\u22A0",
        times: "\xD7",
        timesd: "\u2A30",
        tint: "\u222D",
        toea: "\u2928",
        topbot: "\u2336",
        topcir: "\u2AF1",
        top: "\u22A4",
        Topf: "\u{1D54B}",
        topf: "\u{1D565}",
        topfork: "\u2ADA",
        tosa: "\u2929",
        tprime: "\u2034",
        trade: "\u2122",
        TRADE: "\u2122",
        triangle: "\u25B5",
        triangledown: "\u25BF",
        triangleleft: "\u25C3",
        trianglelefteq: "\u22B4",
        triangleq: "\u225C",
        triangleright: "\u25B9",
        trianglerighteq: "\u22B5",
        tridot: "\u25EC",
        trie: "\u225C",
        triminus: "\u2A3A",
        TripleDot: "\u20DB",
        triplus: "\u2A39",
        trisb: "\u29CD",
        tritime: "\u2A3B",
        trpezium: "\u23E2",
        Tscr: "\u{1D4AF}",
        tscr: "\u{1D4C9}",
        TScy: "\u0426",
        tscy: "\u0446",
        TSHcy: "\u040B",
        tshcy: "\u045B",
        Tstrok: "\u0166",
        tstrok: "\u0167",
        twixt: "\u226C",
        twoheadleftarrow: "\u219E",
        twoheadrightarrow: "\u21A0",
        Uacute: "\xDA",
        uacute: "\xFA",
        uarr: "\u2191",
        Uarr: "\u219F",
        uArr: "\u21D1",
        Uarrocir: "\u2949",
        Ubrcy: "\u040E",
        ubrcy: "\u045E",
        Ubreve: "\u016C",
        ubreve: "\u016D",
        Ucirc: "\xDB",
        ucirc: "\xFB",
        Ucy: "\u0423",
        ucy: "\u0443",
        udarr: "\u21C5",
        Udblac: "\u0170",
        udblac: "\u0171",
        udhar: "\u296E",
        ufisht: "\u297E",
        Ufr: "\u{1D518}",
        ufr: "\u{1D532}",
        Ugrave: "\xD9",
        ugrave: "\xF9",
        uHar: "\u2963",
        uharl: "\u21BF",
        uharr: "\u21BE",
        uhblk: "\u2580",
        ulcorn: "\u231C",
        ulcorner: "\u231C",
        ulcrop: "\u230F",
        ultri: "\u25F8",
        Umacr: "\u016A",
        umacr: "\u016B",
        uml: "\xA8",
        UnderBar: "_",
        UnderBrace: "\u23DF",
        UnderBracket: "\u23B5",
        UnderParenthesis: "\u23DD",
        Union: "\u22C3",
        UnionPlus: "\u228E",
        Uogon: "\u0172",
        uogon: "\u0173",
        Uopf: "\u{1D54C}",
        uopf: "\u{1D566}",
        UpArrowBar: "\u2912",
        uparrow: "\u2191",
        UpArrow: "\u2191",
        Uparrow: "\u21D1",
        UpArrowDownArrow: "\u21C5",
        updownarrow: "\u2195",
        UpDownArrow: "\u2195",
        Updownarrow: "\u21D5",
        UpEquilibrium: "\u296E",
        upharpoonleft: "\u21BF",
        upharpoonright: "\u21BE",
        uplus: "\u228E",
        UpperLeftArrow: "\u2196",
        UpperRightArrow: "\u2197",
        upsi: "\u03C5",
        Upsi: "\u03D2",
        upsih: "\u03D2",
        Upsilon: "\u03A5",
        upsilon: "\u03C5",
        UpTeeArrow: "\u21A5",
        UpTee: "\u22A5",
        upuparrows: "\u21C8",
        urcorn: "\u231D",
        urcorner: "\u231D",
        urcrop: "\u230E",
        Uring: "\u016E",
        uring: "\u016F",
        urtri: "\u25F9",
        Uscr: "\u{1D4B0}",
        uscr: "\u{1D4CA}",
        utdot: "\u22F0",
        Utilde: "\u0168",
        utilde: "\u0169",
        utri: "\u25B5",
        utrif: "\u25B4",
        uuarr: "\u21C8",
        Uuml: "\xDC",
        uuml: "\xFC",
        uwangle: "\u29A7",
        vangrt: "\u299C",
        varepsilon: "\u03F5",
        varkappa: "\u03F0",
        varnothing: "\u2205",
        varphi: "\u03D5",
        varpi: "\u03D6",
        varpropto: "\u221D",
        varr: "\u2195",
        vArr: "\u21D5",
        varrho: "\u03F1",
        varsigma: "\u03C2",
        varsubsetneq: "\u228A\uFE00",
        varsubsetneqq: "\u2ACB\uFE00",
        varsupsetneq: "\u228B\uFE00",
        varsupsetneqq: "\u2ACC\uFE00",
        vartheta: "\u03D1",
        vartriangleleft: "\u22B2",
        vartriangleright: "\u22B3",
        vBar: "\u2AE8",
        Vbar: "\u2AEB",
        vBarv: "\u2AE9",
        Vcy: "\u0412",
        vcy: "\u0432",
        vdash: "\u22A2",
        vDash: "\u22A8",
        Vdash: "\u22A9",
        VDash: "\u22AB",
        Vdashl: "\u2AE6",
        veebar: "\u22BB",
        vee: "\u2228",
        Vee: "\u22C1",
        veeeq: "\u225A",
        vellip: "\u22EE",
        verbar: "|",
        Verbar: "\u2016",
        vert: "|",
        Vert: "\u2016",
        VerticalBar: "\u2223",
        VerticalLine: "|",
        VerticalSeparator: "\u2758",
        VerticalTilde: "\u2240",
        VeryThinSpace: "\u200A",
        Vfr: "\u{1D519}",
        vfr: "\u{1D533}",
        vltri: "\u22B2",
        vnsub: "\u2282\u20D2",
        vnsup: "\u2283\u20D2",
        Vopf: "\u{1D54D}",
        vopf: "\u{1D567}",
        vprop: "\u221D",
        vrtri: "\u22B3",
        Vscr: "\u{1D4B1}",
        vscr: "\u{1D4CB}",
        vsubnE: "\u2ACB\uFE00",
        vsubne: "\u228A\uFE00",
        vsupnE: "\u2ACC\uFE00",
        vsupne: "\u228B\uFE00",
        Vvdash: "\u22AA",
        vzigzag: "\u299A",
        Wcirc: "\u0174",
        wcirc: "\u0175",
        wedbar: "\u2A5F",
        wedge: "\u2227",
        Wedge: "\u22C0",
        wedgeq: "\u2259",
        weierp: "\u2118",
        Wfr: "\u{1D51A}",
        wfr: "\u{1D534}",
        Wopf: "\u{1D54E}",
        wopf: "\u{1D568}",
        wp: "\u2118",
        wr: "\u2240",
        wreath: "\u2240",
        Wscr: "\u{1D4B2}",
        wscr: "\u{1D4CC}",
        xcap: "\u22C2",
        xcirc: "\u25EF",
        xcup: "\u22C3",
        xdtri: "\u25BD",
        Xfr: "\u{1D51B}",
        xfr: "\u{1D535}",
        xharr: "\u27F7",
        xhArr: "\u27FA",
        Xi: "\u039E",
        xi: "\u03BE",
        xlarr: "\u27F5",
        xlArr: "\u27F8",
        xmap: "\u27FC",
        xnis: "\u22FB",
        xodot: "\u2A00",
        Xopf: "\u{1D54F}",
        xopf: "\u{1D569}",
        xoplus: "\u2A01",
        xotime: "\u2A02",
        xrarr: "\u27F6",
        xrArr: "\u27F9",
        Xscr: "\u{1D4B3}",
        xscr: "\u{1D4CD}",
        xsqcup: "\u2A06",
        xuplus: "\u2A04",
        xutri: "\u25B3",
        xvee: "\u22C1",
        xwedge: "\u22C0",
        Yacute: "\xDD",
        yacute: "\xFD",
        YAcy: "\u042F",
        yacy: "\u044F",
        Ycirc: "\u0176",
        ycirc: "\u0177",
        Ycy: "\u042B",
        ycy: "\u044B",
        yen: "\xA5",
        Yfr: "\u{1D51C}",
        yfr: "\u{1D536}",
        YIcy: "\u0407",
        yicy: "\u0457",
        Yopf: "\u{1D550}",
        yopf: "\u{1D56A}",
        Yscr: "\u{1D4B4}",
        yscr: "\u{1D4CE}",
        YUcy: "\u042E",
        yucy: "\u044E",
        yuml: "\xFF",
        Yuml: "\u0178",
        Zacute: "\u0179",
        zacute: "\u017A",
        Zcaron: "\u017D",
        zcaron: "\u017E",
        Zcy: "\u0417",
        zcy: "\u0437",
        Zdot: "\u017B",
        zdot: "\u017C",
        zeetrf: "\u2128",
        ZeroWidthSpace: "\u200B",
        Zeta: "\u0396",
        zeta: "\u03B6",
        zfr: "\u{1D537}",
        Zfr: "\u2128",
        ZHcy: "\u0416",
        zhcy: "\u0436",
        zigrarr: "\u21DD",
        zopf: "\u{1D56B}",
        Zopf: "\u2124",
        Zscr: "\u{1D4B5}",
        zscr: "\u{1D4CF}",
        zwj: "\u200D",
        zwnj: "\u200C"
      };
      var HEXCHARCODE = /^#[xX]([A-Fa-f0-9]+)$/;
      var CHARCODE = /^#([0-9]+)$/;
      var NAMED = /^([A-Za-z0-9]+)$/;
      var EntityParser = function() {
        function EntityParser2(named) {
          this.named = named;
        }
        EntityParser2.prototype.parse = function(entity) {
          if (!entity) {
            return;
          }
          var matches = entity.match(HEXCHARCODE);
          if (matches) {
            return String.fromCharCode(parseInt(matches[1], 16));
          }
          matches = entity.match(CHARCODE);
          if (matches) {
            return String.fromCharCode(parseInt(matches[1], 10));
          }
          matches = entity.match(NAMED);
          if (matches) {
            return this.named[matches[1]];
          }
        };
        return EntityParser2;
      }();
      var WSP = /[\t\n\f ]/;
      var ALPHA = /[A-Za-z]/;
      var CRLF = /\r\n?/g;
      function isSpace(char) {
        return WSP.test(char);
      }
      function isAlpha(char) {
        return ALPHA.test(char);
      }
      function preprocessInput(input) {
        return input.replace(CRLF, "\n");
      }
      var EventedTokenizer = function() {
        function EventedTokenizer2(delegate, entityParser, mode) {
          if (mode === void 0) {
            mode = "precompile";
          }
          this.delegate = delegate;
          this.entityParser = entityParser;
          this.mode = mode;
          this.state = "beforeData";
          this.line = -1;
          this.column = -1;
          this.input = "";
          this.index = -1;
          this.tagNameBuffer = "";
          this.states = {
            beforeData: function() {
              var char = this.peek();
              if (char === "<" && !this.isIgnoredEndTag()) {
                this.transitionTo("tagOpen");
                this.markTagStart();
                this.consume();
              } else {
                if (this.mode === "precompile" && char === "\n") {
                  var tag = this.tagNameBuffer.toLowerCase();
                  if (tag === "pre" || tag === "textarea") {
                    this.consume();
                  }
                }
                this.transitionTo("data");
                this.delegate.beginData();
              }
            },
            data: function() {
              var char = this.peek();
              var tag = this.tagNameBuffer;
              if (char === "<" && !this.isIgnoredEndTag()) {
                this.delegate.finishData();
                this.transitionTo("tagOpen");
                this.markTagStart();
                this.consume();
              } else if (char === "&" && tag !== "script" && tag !== "style") {
                this.consume();
                this.delegate.appendToData(this.consumeCharRef() || "&");
              } else {
                this.consume();
                this.delegate.appendToData(char);
              }
            },
            tagOpen: function() {
              var char = this.consume();
              if (char === "!") {
                this.transitionTo("markupDeclarationOpen");
              } else if (char === "/") {
                this.transitionTo("endTagOpen");
              } else if (char === "@" || char === ":" || isAlpha(char)) {
                this.transitionTo("tagName");
                this.tagNameBuffer = "";
                this.delegate.beginStartTag();
                this.appendToTagName(char);
              }
            },
            markupDeclarationOpen: function() {
              var char = this.consume();
              if (char === "-" && this.peek() === "-") {
                this.consume();
                this.transitionTo("commentStart");
                this.delegate.beginComment();
              } else {
                var maybeDoctype = char.toUpperCase() + this.input.substring(this.index, this.index + 6).toUpperCase();
                if (maybeDoctype === "DOCTYPE") {
                  this.consume();
                  this.consume();
                  this.consume();
                  this.consume();
                  this.consume();
                  this.consume();
                  this.transitionTo("doctype");
                  if (this.delegate.beginDoctype)
                    this.delegate.beginDoctype();
                }
              }
            },
            doctype: function() {
              var char = this.consume();
              if (isSpace(char)) {
                this.transitionTo("beforeDoctypeName");
              }
            },
            beforeDoctypeName: function() {
              var char = this.consume();
              if (isSpace(char)) {
                return;
              } else {
                this.transitionTo("doctypeName");
                if (this.delegate.appendToDoctypeName)
                  this.delegate.appendToDoctypeName(char.toLowerCase());
              }
            },
            doctypeName: function() {
              var char = this.consume();
              if (isSpace(char)) {
                this.transitionTo("afterDoctypeName");
              } else if (char === ">") {
                if (this.delegate.endDoctype)
                  this.delegate.endDoctype();
                this.transitionTo("beforeData");
              } else {
                if (this.delegate.appendToDoctypeName)
                  this.delegate.appendToDoctypeName(char.toLowerCase());
              }
            },
            afterDoctypeName: function() {
              var char = this.consume();
              if (isSpace(char)) {
                return;
              } else if (char === ">") {
                if (this.delegate.endDoctype)
                  this.delegate.endDoctype();
                this.transitionTo("beforeData");
              } else {
                var nextSixChars = char.toUpperCase() + this.input.substring(this.index, this.index + 5).toUpperCase();
                var isPublic = nextSixChars.toUpperCase() === "PUBLIC";
                var isSystem = nextSixChars.toUpperCase() === "SYSTEM";
                if (isPublic || isSystem) {
                  this.consume();
                  this.consume();
                  this.consume();
                  this.consume();
                  this.consume();
                  this.consume();
                }
                if (isPublic) {
                  this.transitionTo("afterDoctypePublicKeyword");
                } else if (isSystem) {
                  this.transitionTo("afterDoctypeSystemKeyword");
                }
              }
            },
            afterDoctypePublicKeyword: function() {
              var char = this.peek();
              if (isSpace(char)) {
                this.transitionTo("beforeDoctypePublicIdentifier");
                this.consume();
              } else if (char === '"') {
                this.transitionTo("doctypePublicIdentifierDoubleQuoted");
                this.consume();
              } else if (char === "'") {
                this.transitionTo("doctypePublicIdentifierSingleQuoted");
                this.consume();
              } else if (char === ">") {
                this.consume();
                if (this.delegate.endDoctype)
                  this.delegate.endDoctype();
                this.transitionTo("beforeData");
              }
            },
            doctypePublicIdentifierDoubleQuoted: function() {
              var char = this.consume();
              if (char === '"') {
                this.transitionTo("afterDoctypePublicIdentifier");
              } else if (char === ">") {
                if (this.delegate.endDoctype)
                  this.delegate.endDoctype();
                this.transitionTo("beforeData");
              } else {
                if (this.delegate.appendToDoctypePublicIdentifier)
                  this.delegate.appendToDoctypePublicIdentifier(char);
              }
            },
            doctypePublicIdentifierSingleQuoted: function() {
              var char = this.consume();
              if (char === "'") {
                this.transitionTo("afterDoctypePublicIdentifier");
              } else if (char === ">") {
                if (this.delegate.endDoctype)
                  this.delegate.endDoctype();
                this.transitionTo("beforeData");
              } else {
                if (this.delegate.appendToDoctypePublicIdentifier)
                  this.delegate.appendToDoctypePublicIdentifier(char);
              }
            },
            afterDoctypePublicIdentifier: function() {
              var char = this.consume();
              if (isSpace(char)) {
                this.transitionTo("betweenDoctypePublicAndSystemIdentifiers");
              } else if (char === ">") {
                if (this.delegate.endDoctype)
                  this.delegate.endDoctype();
                this.transitionTo("beforeData");
              } else if (char === '"') {
                this.transitionTo("doctypeSystemIdentifierDoubleQuoted");
              } else if (char === "'") {
                this.transitionTo("doctypeSystemIdentifierSingleQuoted");
              }
            },
            betweenDoctypePublicAndSystemIdentifiers: function() {
              var char = this.consume();
              if (isSpace(char)) {
                return;
              } else if (char === ">") {
                if (this.delegate.endDoctype)
                  this.delegate.endDoctype();
                this.transitionTo("beforeData");
              } else if (char === '"') {
                this.transitionTo("doctypeSystemIdentifierDoubleQuoted");
              } else if (char === "'") {
                this.transitionTo("doctypeSystemIdentifierSingleQuoted");
              }
            },
            doctypeSystemIdentifierDoubleQuoted: function() {
              var char = this.consume();
              if (char === '"') {
                this.transitionTo("afterDoctypeSystemIdentifier");
              } else if (char === ">") {
                if (this.delegate.endDoctype)
                  this.delegate.endDoctype();
                this.transitionTo("beforeData");
              } else {
                if (this.delegate.appendToDoctypeSystemIdentifier)
                  this.delegate.appendToDoctypeSystemIdentifier(char);
              }
            },
            doctypeSystemIdentifierSingleQuoted: function() {
              var char = this.consume();
              if (char === "'") {
                this.transitionTo("afterDoctypeSystemIdentifier");
              } else if (char === ">") {
                if (this.delegate.endDoctype)
                  this.delegate.endDoctype();
                this.transitionTo("beforeData");
              } else {
                if (this.delegate.appendToDoctypeSystemIdentifier)
                  this.delegate.appendToDoctypeSystemIdentifier(char);
              }
            },
            afterDoctypeSystemIdentifier: function() {
              var char = this.consume();
              if (isSpace(char)) {
                return;
              } else if (char === ">") {
                if (this.delegate.endDoctype)
                  this.delegate.endDoctype();
                this.transitionTo("beforeData");
              }
            },
            commentStart: function() {
              var char = this.consume();
              if (char === "-") {
                this.transitionTo("commentStartDash");
              } else if (char === ">") {
                this.delegate.finishComment();
                this.transitionTo("beforeData");
              } else {
                this.delegate.appendToCommentData(char);
                this.transitionTo("comment");
              }
            },
            commentStartDash: function() {
              var char = this.consume();
              if (char === "-") {
                this.transitionTo("commentEnd");
              } else if (char === ">") {
                this.delegate.finishComment();
                this.transitionTo("beforeData");
              } else {
                this.delegate.appendToCommentData("-");
                this.transitionTo("comment");
              }
            },
            comment: function() {
              var char = this.consume();
              if (char === "-") {
                this.transitionTo("commentEndDash");
              } else {
                this.delegate.appendToCommentData(char);
              }
            },
            commentEndDash: function() {
              var char = this.consume();
              if (char === "-") {
                this.transitionTo("commentEnd");
              } else {
                this.delegate.appendToCommentData("-" + char);
                this.transitionTo("comment");
              }
            },
            commentEnd: function() {
              var char = this.consume();
              if (char === ">") {
                this.delegate.finishComment();
                this.transitionTo("beforeData");
              } else {
                this.delegate.appendToCommentData("--" + char);
                this.transitionTo("comment");
              }
            },
            tagName: function() {
              var char = this.consume();
              if (isSpace(char)) {
                this.transitionTo("beforeAttributeName");
              } else if (char === "/") {
                this.transitionTo("selfClosingStartTag");
              } else if (char === ">") {
                this.delegate.finishTag();
                this.transitionTo("beforeData");
              } else {
                this.appendToTagName(char);
              }
            },
            endTagName: function() {
              var char = this.consume();
              if (isSpace(char)) {
                this.transitionTo("beforeAttributeName");
                this.tagNameBuffer = "";
              } else if (char === "/") {
                this.transitionTo("selfClosingStartTag");
                this.tagNameBuffer = "";
              } else if (char === ">") {
                this.delegate.finishTag();
                this.transitionTo("beforeData");
                this.tagNameBuffer = "";
              } else {
                this.appendToTagName(char);
              }
            },
            beforeAttributeName: function() {
              var char = this.peek();
              if (isSpace(char)) {
                this.consume();
                return;
              } else if (char === "/") {
                this.transitionTo("selfClosingStartTag");
                this.consume();
              } else if (char === ">") {
                this.consume();
                this.delegate.finishTag();
                this.transitionTo("beforeData");
              } else if (char === "=") {
                this.delegate.reportSyntaxError("attribute name cannot start with equals sign");
                this.transitionTo("attributeName");
                this.delegate.beginAttribute();
                this.consume();
                this.delegate.appendToAttributeName(char);
              } else {
                this.transitionTo("attributeName");
                this.delegate.beginAttribute();
              }
            },
            attributeName: function() {
              var char = this.peek();
              if (isSpace(char)) {
                this.transitionTo("afterAttributeName");
                this.consume();
              } else if (char === "/") {
                this.delegate.beginAttributeValue(false);
                this.delegate.finishAttributeValue();
                this.consume();
                this.transitionTo("selfClosingStartTag");
              } else if (char === "=") {
                this.transitionTo("beforeAttributeValue");
                this.consume();
              } else if (char === ">") {
                this.delegate.beginAttributeValue(false);
                this.delegate.finishAttributeValue();
                this.consume();
                this.delegate.finishTag();
                this.transitionTo("beforeData");
              } else if (char === '"' || char === "'" || char === "<") {
                this.delegate.reportSyntaxError(char + " is not a valid character within attribute names");
                this.consume();
                this.delegate.appendToAttributeName(char);
              } else {
                this.consume();
                this.delegate.appendToAttributeName(char);
              }
            },
            afterAttributeName: function() {
              var char = this.peek();
              if (isSpace(char)) {
                this.consume();
                return;
              } else if (char === "/") {
                this.delegate.beginAttributeValue(false);
                this.delegate.finishAttributeValue();
                this.consume();
                this.transitionTo("selfClosingStartTag");
              } else if (char === "=") {
                this.consume();
                this.transitionTo("beforeAttributeValue");
              } else if (char === ">") {
                this.delegate.beginAttributeValue(false);
                this.delegate.finishAttributeValue();
                this.consume();
                this.delegate.finishTag();
                this.transitionTo("beforeData");
              } else {
                this.delegate.beginAttributeValue(false);
                this.delegate.finishAttributeValue();
                this.transitionTo("attributeName");
                this.delegate.beginAttribute();
                this.consume();
                this.delegate.appendToAttributeName(char);
              }
            },
            beforeAttributeValue: function() {
              var char = this.peek();
              if (isSpace(char)) {
                this.consume();
              } else if (char === '"') {
                this.transitionTo("attributeValueDoubleQuoted");
                this.delegate.beginAttributeValue(true);
                this.consume();
              } else if (char === "'") {
                this.transitionTo("attributeValueSingleQuoted");
                this.delegate.beginAttributeValue(true);
                this.consume();
              } else if (char === ">") {
                this.delegate.beginAttributeValue(false);
                this.delegate.finishAttributeValue();
                this.consume();
                this.delegate.finishTag();
                this.transitionTo("beforeData");
              } else {
                this.transitionTo("attributeValueUnquoted");
                this.delegate.beginAttributeValue(false);
                this.consume();
                this.delegate.appendToAttributeValue(char);
              }
            },
            attributeValueDoubleQuoted: function() {
              var char = this.consume();
              if (char === '"') {
                this.delegate.finishAttributeValue();
                this.transitionTo("afterAttributeValueQuoted");
              } else if (char === "&") {
                this.delegate.appendToAttributeValue(this.consumeCharRef() || "&");
              } else {
                this.delegate.appendToAttributeValue(char);
              }
            },
            attributeValueSingleQuoted: function() {
              var char = this.consume();
              if (char === "'") {
                this.delegate.finishAttributeValue();
                this.transitionTo("afterAttributeValueQuoted");
              } else if (char === "&") {
                this.delegate.appendToAttributeValue(this.consumeCharRef() || "&");
              } else {
                this.delegate.appendToAttributeValue(char);
              }
            },
            attributeValueUnquoted: function() {
              var char = this.peek();
              if (isSpace(char)) {
                this.delegate.finishAttributeValue();
                this.consume();
                this.transitionTo("beforeAttributeName");
              } else if (char === "/") {
                this.delegate.finishAttributeValue();
                this.consume();
                this.transitionTo("selfClosingStartTag");
              } else if (char === "&") {
                this.consume();
                this.delegate.appendToAttributeValue(this.consumeCharRef() || "&");
              } else if (char === ">") {
                this.delegate.finishAttributeValue();
                this.consume();
                this.delegate.finishTag();
                this.transitionTo("beforeData");
              } else {
                this.consume();
                this.delegate.appendToAttributeValue(char);
              }
            },
            afterAttributeValueQuoted: function() {
              var char = this.peek();
              if (isSpace(char)) {
                this.consume();
                this.transitionTo("beforeAttributeName");
              } else if (char === "/") {
                this.consume();
                this.transitionTo("selfClosingStartTag");
              } else if (char === ">") {
                this.consume();
                this.delegate.finishTag();
                this.transitionTo("beforeData");
              } else {
                this.transitionTo("beforeAttributeName");
              }
            },
            selfClosingStartTag: function() {
              var char = this.peek();
              if (char === ">") {
                this.consume();
                this.delegate.markTagAsSelfClosing();
                this.delegate.finishTag();
                this.transitionTo("beforeData");
              } else {
                this.transitionTo("beforeAttributeName");
              }
            },
            endTagOpen: function() {
              var char = this.consume();
              if (char === "@" || char === ":" || isAlpha(char)) {
                this.transitionTo("endTagName");
                this.tagNameBuffer = "";
                this.delegate.beginEndTag();
                this.appendToTagName(char);
              }
            }
          };
          this.reset();
        }
        EventedTokenizer2.prototype.reset = function() {
          this.transitionTo("beforeData");
          this.input = "";
          this.tagNameBuffer = "";
          this.index = 0;
          this.line = 1;
          this.column = 0;
          this.delegate.reset();
        };
        EventedTokenizer2.prototype.transitionTo = function(state) {
          this.state = state;
        };
        EventedTokenizer2.prototype.tokenize = function(input) {
          this.reset();
          this.tokenizePart(input);
          this.tokenizeEOF();
        };
        EventedTokenizer2.prototype.tokenizePart = function(input) {
          this.input += preprocessInput(input);
          while (this.index < this.input.length) {
            var handler = this.states[this.state];
            if (handler !== void 0) {
              handler.call(this);
            } else {
              throw new Error("unhandled state " + this.state);
            }
          }
        };
        EventedTokenizer2.prototype.tokenizeEOF = function() {
          this.flushData();
        };
        EventedTokenizer2.prototype.flushData = function() {
          if (this.state === "data") {
            this.delegate.finishData();
            this.transitionTo("beforeData");
          }
        };
        EventedTokenizer2.prototype.peek = function() {
          return this.input.charAt(this.index);
        };
        EventedTokenizer2.prototype.consume = function() {
          var char = this.peek();
          this.index++;
          if (char === "\n") {
            this.line++;
            this.column = 0;
          } else {
            this.column++;
          }
          return char;
        };
        EventedTokenizer2.prototype.consumeCharRef = function() {
          var endIndex = this.input.indexOf(";", this.index);
          if (endIndex === -1) {
            return;
          }
          var entity = this.input.slice(this.index, endIndex);
          var chars = this.entityParser.parse(entity);
          if (chars) {
            var count = entity.length;
            while (count) {
              this.consume();
              count--;
            }
            this.consume();
            return chars;
          }
        };
        EventedTokenizer2.prototype.markTagStart = function() {
          this.delegate.tagOpen();
        };
        EventedTokenizer2.prototype.appendToTagName = function(char) {
          this.tagNameBuffer += char;
          this.delegate.appendToTagName(char);
        };
        EventedTokenizer2.prototype.isIgnoredEndTag = function() {
          var tag = this.tagNameBuffer;
          return tag === "title" && this.input.substring(this.index, this.index + 8) !== "</title>" || tag === "style" && this.input.substring(this.index, this.index + 8) !== "</style>" || tag === "script" && this.input.substring(this.index, this.index + 9) !== "<\/script>";
        };
        return EventedTokenizer2;
      }();
      var Tokenizer = function() {
        function Tokenizer2(entityParser, options) {
          if (options === void 0) {
            options = {};
          }
          this.options = options;
          this.token = null;
          this.startLine = 1;
          this.startColumn = 0;
          this.tokens = [];
          this.tokenizer = new EventedTokenizer(this, entityParser, options.mode);
          this._currentAttribute = void 0;
        }
        Tokenizer2.prototype.tokenize = function(input) {
          this.tokens = [];
          this.tokenizer.tokenize(input);
          return this.tokens;
        };
        Tokenizer2.prototype.tokenizePart = function(input) {
          this.tokens = [];
          this.tokenizer.tokenizePart(input);
          return this.tokens;
        };
        Tokenizer2.prototype.tokenizeEOF = function() {
          this.tokens = [];
          this.tokenizer.tokenizeEOF();
          return this.tokens[0];
        };
        Tokenizer2.prototype.reset = function() {
          this.token = null;
          this.startLine = 1;
          this.startColumn = 0;
        };
        Tokenizer2.prototype.current = function() {
          var token = this.token;
          if (token === null) {
            throw new Error("token was unexpectedly null");
          }
          if (arguments.length === 0) {
            return token;
          }
          for (var i = 0; i < arguments.length; i++) {
            if (token.type === arguments[i]) {
              return token;
            }
          }
          throw new Error("token type was unexpectedly " + token.type);
        };
        Tokenizer2.prototype.push = function(token) {
          this.token = token;
          this.tokens.push(token);
        };
        Tokenizer2.prototype.currentAttribute = function() {
          return this._currentAttribute;
        };
        Tokenizer2.prototype.addLocInfo = function() {
          if (this.options.loc) {
            this.current().loc = {
              start: {
                line: this.startLine,
                column: this.startColumn
              },
              end: {
                line: this.tokenizer.line,
                column: this.tokenizer.column
              }
            };
          }
          this.startLine = this.tokenizer.line;
          this.startColumn = this.tokenizer.column;
        };
        Tokenizer2.prototype.beginDoctype = function() {
          this.push({
            type: "Doctype",
            name: ""
          });
        };
        Tokenizer2.prototype.appendToDoctypeName = function(char) {
          this.current("Doctype").name += char;
        };
        Tokenizer2.prototype.appendToDoctypePublicIdentifier = function(char) {
          var doctype = this.current("Doctype");
          if (doctype.publicIdentifier === void 0) {
            doctype.publicIdentifier = char;
          } else {
            doctype.publicIdentifier += char;
          }
        };
        Tokenizer2.prototype.appendToDoctypeSystemIdentifier = function(char) {
          var doctype = this.current("Doctype");
          if (doctype.systemIdentifier === void 0) {
            doctype.systemIdentifier = char;
          } else {
            doctype.systemIdentifier += char;
          }
        };
        Tokenizer2.prototype.endDoctype = function() {
          this.addLocInfo();
        };
        Tokenizer2.prototype.beginData = function() {
          this.push({
            type: "Chars",
            chars: ""
          });
        };
        Tokenizer2.prototype.appendToData = function(char) {
          this.current("Chars").chars += char;
        };
        Tokenizer2.prototype.finishData = function() {
          this.addLocInfo();
        };
        Tokenizer2.prototype.beginComment = function() {
          this.push({
            type: "Comment",
            chars: ""
          });
        };
        Tokenizer2.prototype.appendToCommentData = function(char) {
          this.current("Comment").chars += char;
        };
        Tokenizer2.prototype.finishComment = function() {
          this.addLocInfo();
        };
        Tokenizer2.prototype.tagOpen = function() {
        };
        Tokenizer2.prototype.beginStartTag = function() {
          this.push({
            type: "StartTag",
            tagName: "",
            attributes: [],
            selfClosing: false
          });
        };
        Tokenizer2.prototype.beginEndTag = function() {
          this.push({
            type: "EndTag",
            tagName: ""
          });
        };
        Tokenizer2.prototype.finishTag = function() {
          this.addLocInfo();
        };
        Tokenizer2.prototype.markTagAsSelfClosing = function() {
          this.current("StartTag").selfClosing = true;
        };
        Tokenizer2.prototype.appendToTagName = function(char) {
          this.current("StartTag", "EndTag").tagName += char;
        };
        Tokenizer2.prototype.beginAttribute = function() {
          this._currentAttribute = ["", "", false];
        };
        Tokenizer2.prototype.appendToAttributeName = function(char) {
          this.currentAttribute()[0] += char;
        };
        Tokenizer2.prototype.beginAttributeValue = function(isQuoted) {
          this.currentAttribute()[2] = isQuoted;
        };
        Tokenizer2.prototype.appendToAttributeValue = function(char) {
          this.currentAttribute()[1] += char;
        };
        Tokenizer2.prototype.finishAttributeValue = function() {
          this.current("StartTag").attributes.push(this._currentAttribute);
        };
        Tokenizer2.prototype.reportSyntaxError = function(message) {
          this.current().syntaxError = message;
        };
        return Tokenizer2;
      }();
      function tokenize(input, options) {
        var tokenizer = new Tokenizer(new EntityParser(namedCharRefs), options);
        return tokenizer.tokenize(input);
      }
      exports2.HTML5NamedCharRefs = namedCharRefs;
      exports2.EntityParser = EntityParser;
      exports2.EventedTokenizer = EventedTokenizer;
      exports2.Tokenizer = Tokenizer;
      exports2.tokenize = tokenize;
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
    });
  }
});
var require_print = __commonJS({
  "node_modules/@glimmer/syntax/dist/commonjs/es2017/lib/generation/print.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = build;
    var _printer = _interopRequireDefault(require_printer());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function build(ast) {
      let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
        entityEncoding: "transformed"
      };
      if (!ast) {
        return "";
      }
      let printer = new _printer.default(options);
      return printer.print(ast);
    }
  }
});
var require_syntax_error = __commonJS({
  "node_modules/@glimmer/syntax/dist/commonjs/es2017/lib/syntax-error.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.generateSyntaxError = generateSyntaxError;
    function generateSyntaxError(message, location) {
      let {
        module: module2,
        loc
      } = location;
      let {
        line,
        column
      } = loc.start;
      let code = location.asString();
      let quotedCode = code ? `

|
|  ${code.split("\n").join("\n|  ")}
|

` : "";
      let error = new Error(`${message}: ${quotedCode}(error occurred in '${module2}' @ line ${line} : column ${column})`);
      error.name = "SyntaxError";
      error.location = location;
      error.code = code;
      return error;
    }
  }
});
var require_visitor_keys = __commonJS({
  "node_modules/@glimmer/syntax/dist/commonjs/es2017/lib/v1/visitor-keys.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _util = require_es2017();
    var visitorKeys = {
      Program: (0, _util.tuple)("body"),
      Template: (0, _util.tuple)("body"),
      Block: (0, _util.tuple)("body"),
      MustacheStatement: (0, _util.tuple)("path", "params", "hash"),
      BlockStatement: (0, _util.tuple)("path", "params", "hash", "program", "inverse"),
      ElementModifierStatement: (0, _util.tuple)("path", "params", "hash"),
      PartialStatement: (0, _util.tuple)("name", "params", "hash"),
      CommentStatement: (0, _util.tuple)(),
      MustacheCommentStatement: (0, _util.tuple)(),
      ElementNode: (0, _util.tuple)("attributes", "modifiers", "children", "comments"),
      AttrNode: (0, _util.tuple)("value"),
      TextNode: (0, _util.tuple)(),
      ConcatStatement: (0, _util.tuple)("parts"),
      SubExpression: (0, _util.tuple)("path", "params", "hash"),
      PathExpression: (0, _util.tuple)(),
      PathHead: (0, _util.tuple)(),
      StringLiteral: (0, _util.tuple)(),
      BooleanLiteral: (0, _util.tuple)(),
      NumberLiteral: (0, _util.tuple)(),
      NullLiteral: (0, _util.tuple)(),
      UndefinedLiteral: (0, _util.tuple)(),
      Hash: (0, _util.tuple)("pairs"),
      HashPair: (0, _util.tuple)("value"),
      NamedBlock: (0, _util.tuple)("attributes", "modifiers", "children", "comments"),
      SimpleElement: (0, _util.tuple)("attributes", "modifiers", "children", "comments"),
      Component: (0, _util.tuple)("head", "attributes", "modifiers", "children", "comments")
    };
    var _default = visitorKeys;
    exports.default = _default;
  }
});
var require_errors = __commonJS({
  "node_modules/@glimmer/syntax/dist/commonjs/es2017/lib/traversal/errors.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.cannotRemoveNode = cannotRemoveNode;
    exports.cannotReplaceNode = cannotReplaceNode;
    exports.cannotReplaceOrRemoveInKeyHandlerYet = cannotReplaceOrRemoveInKeyHandlerYet;
    exports.default = void 0;
    var TraversalError = function() {
      TraversalError2.prototype = Object.create(Error.prototype);
      TraversalError2.prototype.constructor = TraversalError2;
      function TraversalError2(message, node, parent, key) {
        let error = Error.call(this, message);
        this.key = key;
        this.message = message;
        this.node = node;
        this.parent = parent;
        this.stack = error.stack;
      }
      return TraversalError2;
    }();
    var _default = TraversalError;
    exports.default = _default;
    function cannotRemoveNode(node, parent, key) {
      return new TraversalError("Cannot remove a node unless it is part of an array", node, parent, key);
    }
    function cannotReplaceNode(node, parent, key) {
      return new TraversalError("Cannot replace a node with multiple nodes unless it is part of an array", node, parent, key);
    }
    function cannotReplaceOrRemoveInKeyHandlerYet(node, key) {
      return new TraversalError("Replacing and removing in key handlers is not yet supported.", node, null, key);
    }
  }
});
var require_path = __commonJS({
  "node_modules/@glimmer/syntax/dist/commonjs/es2017/lib/traversal/path.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var WalkerPath = class {
      constructor(node) {
        let parent = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        let parentKey = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
        this.node = node;
        this.parent = parent;
        this.parentKey = parentKey;
      }
      get parentNode() {
        return this.parent ? this.parent.node : null;
      }
      parents() {
        return {
          [Symbol.iterator]: () => {
            return new PathParentsIterator(this);
          }
        };
      }
    };
    exports.default = WalkerPath;
    var PathParentsIterator = class {
      constructor(path) {
        this.path = path;
      }
      next() {
        if (this.path.parent) {
          this.path = this.path.parent;
          return {
            done: false,
            value: this.path
          };
        } else {
          return {
            done: true,
            value: null
          };
        }
      }
    };
  }
});
var require_traverse = __commonJS({
  "node_modules/@glimmer/syntax/dist/commonjs/es2017/lib/traversal/traverse.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = traverse;
    var _util = require_es2017();
    var _visitorKeys = _interopRequireDefault(require_visitor_keys());
    var _errors = require_errors();
    var _path = _interopRequireDefault(require_path());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function getEnterFunction(handler) {
      if (typeof handler === "function") {
        return handler;
      } else {
        return handler.enter;
      }
    }
    function getExitFunction(handler) {
      if (typeof handler === "function") {
        return void 0;
      } else {
        return handler.exit;
      }
    }
    function getKeyHandler(handler, key) {
      let keyVisitor = typeof handler !== "function" ? handler.keys : void 0;
      if (keyVisitor === void 0)
        return;
      let keyHandler = keyVisitor[key];
      if (keyHandler !== void 0) {
        return keyHandler;
      }
      return keyVisitor.All;
    }
    function getNodeHandler(visitor, nodeType) {
      if (nodeType === "Template" || nodeType === "Block") {
        if (visitor.Program) {
          if (false) {
          }
          return visitor.Program;
        }
      }
      let handler = visitor[nodeType];
      if (handler !== void 0) {
        return handler;
      }
      return visitor.All;
    }
    function visitNode(visitor, path) {
      let {
        node,
        parent,
        parentKey
      } = path;
      let handler = getNodeHandler(visitor, node.type);
      let enter;
      let exit;
      if (handler !== void 0) {
        enter = getEnterFunction(handler);
        exit = getExitFunction(handler);
      }
      let result;
      if (enter !== void 0) {
        result = enter(node, path);
      }
      if (result !== void 0 && result !== null) {
        if (JSON.stringify(node) === JSON.stringify(result)) {
          result = void 0;
        } else if (Array.isArray(result)) {
          visitArray(visitor, result, parent, parentKey);
          return result;
        } else {
          let path2 = new _path.default(result, parent, parentKey);
          return visitNode(visitor, path2) || result;
        }
      }
      if (result === void 0) {
        let keys = _visitorKeys.default[node.type];
        for (let i = 0; i < keys.length; i++) {
          let key = keys[i];
          visitKey(visitor, handler, path, key);
        }
        if (exit !== void 0) {
          result = exit(node, path);
        }
      }
      return result;
    }
    function get(node, key) {
      return node[key];
    }
    function set(node, key, value) {
      node[key] = value;
    }
    function visitKey(visitor, handler, path, key) {
      let {
        node
      } = path;
      let value = get(node, key);
      if (!value) {
        return;
      }
      let keyEnter;
      let keyExit;
      if (handler !== void 0) {
        let keyHandler = getKeyHandler(handler, key);
        if (keyHandler !== void 0) {
          keyEnter = getEnterFunction(keyHandler);
          keyExit = getExitFunction(keyHandler);
        }
      }
      if (keyEnter !== void 0) {
        if (keyEnter(node, key) !== void 0) {
          throw (0, _errors.cannotReplaceOrRemoveInKeyHandlerYet)(node, key);
        }
      }
      if (Array.isArray(value)) {
        visitArray(visitor, value, path, key);
      } else {
        let keyPath = new _path.default(value, path, key);
        let result = visitNode(visitor, keyPath);
        if (result !== void 0) {
          assignKey(node, key, value, result);
        }
      }
      if (keyExit !== void 0) {
        if (keyExit(node, key) !== void 0) {
          throw (0, _errors.cannotReplaceOrRemoveInKeyHandlerYet)(node, key);
        }
      }
    }
    function visitArray(visitor, array, parent, parentKey) {
      for (let i = 0; i < array.length; i++) {
        let node = array[i];
        let path = new _path.default(node, parent, parentKey);
        let result = visitNode(visitor, path);
        if (result !== void 0) {
          i += spliceArray(array, i, result) - 1;
        }
      }
    }
    function assignKey(node, key, value, result) {
      if (result === null) {
        throw (0, _errors.cannotRemoveNode)(value, node, key);
      } else if (Array.isArray(result)) {
        if (result.length === 1) {
          set(node, key, result[0]);
        } else {
          if (result.length === 0) {
            throw (0, _errors.cannotRemoveNode)(value, node, key);
          } else {
            throw (0, _errors.cannotReplaceNode)(value, node, key);
          }
        }
      } else {
        set(node, key, result);
      }
    }
    function spliceArray(array, index, result) {
      if (result === null) {
        array.splice(index, 1);
        return 0;
      } else if (Array.isArray(result)) {
        array.splice(index, 1, ...result);
        return result.length;
      } else {
        array.splice(index, 1, result);
        return 1;
      }
    }
    function traverse(node, visitor) {
      let path = new _path.default(node);
      visitNode(visitor, path);
    }
  }
});
var require_walker = __commonJS({
  "node_modules/@glimmer/syntax/dist/commonjs/es2017/lib/traversal/walker.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var Walker = class {
      constructor(order) {
        this.order = order;
        this.stack = [];
      }
      visit(node, callback) {
        if (!node) {
          return;
        }
        this.stack.push(node);
        if (this.order === "post") {
          this.children(node, callback);
          callback(node, this);
        } else {
          callback(node, this);
          this.children(node, callback);
        }
        this.stack.pop();
      }
      children(node, callback) {
        switch (node.type) {
          case "Block":
          case "Template":
            return visitors.Program(this, node, callback);
          case "ElementNode":
            return visitors.ElementNode(this, node, callback);
          case "BlockStatement":
            return visitors.BlockStatement(this, node, callback);
          default:
            return;
        }
      }
    };
    exports.default = Walker;
    var visitors = {
      Program(walker, node, callback) {
        for (let i = 0; i < node.body.length; i++) {
          walker.visit(node.body[i], callback);
        }
      },
      Template(walker, node, callback) {
        for (let i = 0; i < node.body.length; i++) {
          walker.visit(node.body[i], callback);
        }
      },
      Block(walker, node, callback) {
        for (let i = 0; i < node.body.length; i++) {
          walker.visit(node.body[i], callback);
        }
      },
      ElementNode(walker, node, callback) {
        for (let i = 0; i < node.children.length; i++) {
          walker.visit(node.children[i], callback);
        }
      },
      BlockStatement(walker, node, callback) {
        walker.visit(node.program, callback);
        walker.visit(node.inverse || null, callback);
      }
    };
  }
});
var require_utils = __commonJS({
  "node_modules/@glimmer/syntax/dist/commonjs/es2017/lib/utils.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parseElementBlockParams = parseElementBlockParams;
    exports.childrenFor = childrenFor;
    exports.appendChild = appendChild;
    exports.isHBSLiteral = isHBSLiteral;
    exports.printLiteral = printLiteral;
    exports.isUpperCase = isUpperCase;
    exports.isLowerCase = isLowerCase;
    var _syntaxError = require_syntax_error();
    var ID_INVERSE_PATTERN = /[!"#%-,\.\/;->@\[-\^`\{-~]/;
    function parseElementBlockParams(element) {
      let params = parseBlockParams(element);
      if (params)
        element.blockParams = params;
    }
    function parseBlockParams(element) {
      let l = element.attributes.length;
      let attrNames = [];
      for (let i = 0; i < l; i++) {
        attrNames.push(element.attributes[i].name);
      }
      let asIndex = attrNames.indexOf("as");
      if (asIndex === -1 && attrNames.length > 0 && attrNames[attrNames.length - 1].charAt(0) === "|") {
        throw (0, _syntaxError.generateSyntaxError)("Block parameters must be preceded by the `as` keyword, detected block parameters without `as`", element.loc);
      }
      if (asIndex !== -1 && l > asIndex && attrNames[asIndex + 1].charAt(0) === "|") {
        let paramsString = attrNames.slice(asIndex).join(" ");
        if (paramsString.charAt(paramsString.length - 1) !== "|" || paramsString.match(/\|/g).length !== 2) {
          throw (0, _syntaxError.generateSyntaxError)("Invalid block parameters syntax, '" + paramsString + "'", element.loc);
        }
        let params = [];
        for (let i = asIndex + 1; i < l; i++) {
          let param = attrNames[i].replace(/\|/g, "");
          if (param !== "") {
            if (ID_INVERSE_PATTERN.test(param)) {
              throw (0, _syntaxError.generateSyntaxError)("Invalid identifier for block parameters, '" + param + "'", element.loc);
            }
            params.push(param);
          }
        }
        if (params.length === 0) {
          throw (0, _syntaxError.generateSyntaxError)("Cannot use zero block parameters", element.loc);
        }
        element.attributes = element.attributes.slice(0, asIndex);
        return params;
      }
      return null;
    }
    function childrenFor(node) {
      switch (node.type) {
        case "Block":
        case "Template":
          return node.body;
        case "ElementNode":
          return node.children;
      }
    }
    function appendChild(parent, node) {
      childrenFor(parent).push(node);
    }
    function isHBSLiteral(path) {
      return path.type === "StringLiteral" || path.type === "BooleanLiteral" || path.type === "NumberLiteral" || path.type === "NullLiteral" || path.type === "UndefinedLiteral";
    }
    function printLiteral(literal) {
      if (literal.type === "UndefinedLiteral") {
        return "undefined";
      } else {
        return JSON.stringify(literal.value);
      }
    }
    function isUpperCase(tag) {
      return tag[0] === tag[0].toUpperCase() && tag[0] !== tag[0].toLowerCase();
    }
    function isLowerCase(tag) {
      return tag[0] === tag[0].toLowerCase() && tag[0] !== tag[0].toUpperCase();
    }
  }
});
var require_parser_builders = __commonJS({
  "node_modules/@glimmer/syntax/dist/commonjs/es2017/lib/v1/parser-builders.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _util = require_es2017();
    var _legacyInterop = require_legacy_interop();
    var DEFAULT_STRIP = {
      close: false,
      open: false
    };
    var Builders = class {
      pos(line, column) {
        return {
          line,
          column
        };
      }
      blockItself(_ref15) {
        let {
          body,
          blockParams,
          chained = false,
          loc
        } = _ref15;
        return {
          type: "Block",
          body: body || [],
          blockParams: blockParams || [],
          chained,
          loc
        };
      }
      template(_ref16) {
        let {
          body,
          blockParams,
          loc
        } = _ref16;
        return {
          type: "Template",
          body: body || [],
          blockParams: blockParams || [],
          loc
        };
      }
      mustache(_ref17) {
        let {
          path,
          params,
          hash,
          trusting,
          loc,
          strip = DEFAULT_STRIP
        } = _ref17;
        return {
          type: "MustacheStatement",
          path,
          params,
          hash,
          escaped: !trusting,
          trusting,
          loc,
          strip: strip || {
            open: false,
            close: false
          }
        };
      }
      block(_ref18) {
        let {
          path,
          params,
          hash,
          defaultBlock,
          elseBlock = null,
          loc,
          openStrip = DEFAULT_STRIP,
          inverseStrip = DEFAULT_STRIP,
          closeStrip = DEFAULT_STRIP
        } = _ref18;
        return {
          type: "BlockStatement",
          path,
          params,
          hash,
          program: defaultBlock,
          inverse: elseBlock,
          loc,
          openStrip,
          inverseStrip,
          closeStrip
        };
      }
      comment(value, loc) {
        return {
          type: "CommentStatement",
          value,
          loc
        };
      }
      mustacheComment(value, loc) {
        return {
          type: "MustacheCommentStatement",
          value,
          loc
        };
      }
      concat(parts, loc) {
        return {
          type: "ConcatStatement",
          parts,
          loc
        };
      }
      element(_ref19) {
        let {
          tag,
          selfClosing,
          attrs,
          blockParams,
          modifiers,
          comments,
          children,
          loc
        } = _ref19;
        return {
          type: "ElementNode",
          tag,
          selfClosing,
          attributes: attrs || [],
          blockParams: blockParams || [],
          modifiers: modifiers || [],
          comments: comments || [],
          children: children || [],
          loc
        };
      }
      elementModifier(_ref20) {
        let {
          path,
          params,
          hash,
          loc
        } = _ref20;
        return {
          type: "ElementModifierStatement",
          path,
          params,
          hash,
          loc
        };
      }
      attr(_ref21) {
        let {
          name,
          value,
          loc
        } = _ref21;
        return {
          type: "AttrNode",
          name,
          value,
          loc
        };
      }
      text(_ref22) {
        let {
          chars,
          loc
        } = _ref22;
        return {
          type: "TextNode",
          chars,
          loc
        };
      }
      sexpr(_ref23) {
        let {
          path,
          params,
          hash,
          loc
        } = _ref23;
        return {
          type: "SubExpression",
          path,
          params,
          hash,
          loc
        };
      }
      path(_ref24) {
        let {
          head,
          tail,
          loc
        } = _ref24;
        let {
          original: originalHead
        } = headToString(head);
        let original = [...originalHead, ...tail].join(".");
        return new _legacyInterop.PathExpressionImplV1(original, head, tail, loc);
      }
      head(head, loc) {
        if (head[0] === "@") {
          return this.atName(head, loc);
        } else if (head === "this") {
          return this.this(loc);
        } else {
          return this.var(head, loc);
        }
      }
      this(loc) {
        return {
          type: "ThisHead",
          loc
        };
      }
      atName(name, loc) {
        return {
          type: "AtHead",
          name,
          loc
        };
      }
      var(name, loc) {
        return {
          type: "VarHead",
          name,
          loc
        };
      }
      hash(pairs, loc) {
        return {
          type: "Hash",
          pairs: pairs || [],
          loc
        };
      }
      pair(_ref25) {
        let {
          key,
          value,
          loc
        } = _ref25;
        return {
          type: "HashPair",
          key,
          value,
          loc
        };
      }
      literal(_ref26) {
        let {
          type,
          value,
          loc
        } = _ref26;
        return {
          type,
          value,
          original: value,
          loc
        };
      }
      undefined() {
        return this.literal({
          type: "UndefinedLiteral",
          value: void 0
        });
      }
      null() {
        return this.literal({
          type: "NullLiteral",
          value: null
        });
      }
      string(value, loc) {
        return this.literal({
          type: "StringLiteral",
          value,
          loc
        });
      }
      boolean(value, loc) {
        return this.literal({
          type: "BooleanLiteral",
          value,
          loc
        });
      }
      number(value, loc) {
        return this.literal({
          type: "NumberLiteral",
          value,
          loc
        });
      }
    };
    function headToString(head) {
      switch (head.type) {
        case "AtHead":
          return {
            original: head.name,
            parts: [head.name]
          };
        case "ThisHead":
          return {
            original: `this`,
            parts: []
          };
        case "VarHead":
          return {
            original: head.name,
            parts: [head.name]
          };
      }
    }
    var _default = new Builders();
    exports.default = _default;
  }
});
var require_parser2 = __commonJS({
  "node_modules/@glimmer/syntax/dist/commonjs/es2017/lib/parser.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Parser = void 0;
    var _util = require_es2017();
    var _simpleHtmlTokenizer = require_simple_html_tokenizer();
    var Parser = class {
      constructor(source) {
        let entityParser = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : new _simpleHtmlTokenizer.EntityParser(_simpleHtmlTokenizer.HTML5NamedCharRefs);
        let mode = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "precompile";
        this.elementStack = [];
        this.currentAttribute = null;
        this.currentNode = null;
        this.source = source;
        this.lines = source.source.split(/(?:\r\n?|\n)/g);
        this.tokenizer = new _simpleHtmlTokenizer.EventedTokenizer(this, entityParser, mode);
      }
      offset() {
        let {
          line,
          column
        } = this.tokenizer;
        return this.source.offsetFor(line, column);
      }
      pos(_ref27) {
        let {
          line,
          column
        } = _ref27;
        return this.source.offsetFor(line, column);
      }
      finish(node) {
        return (0, _util.assign)({}, node, {
          loc: node.loc.until(this.offset())
        });
      }
      get currentAttr() {
        return this.currentAttribute;
      }
      get currentTag() {
        let node = this.currentNode;
        return node;
      }
      get currentStartTag() {
        let node = this.currentNode;
        return node;
      }
      get currentEndTag() {
        let node = this.currentNode;
        return node;
      }
      get currentComment() {
        let node = this.currentNode;
        return node;
      }
      get currentData() {
        let node = this.currentNode;
        return node;
      }
      acceptTemplate(node) {
        return this[node.type](node);
      }
      acceptNode(node) {
        return this[node.type](node);
      }
      currentElement() {
        return this.elementStack[this.elementStack.length - 1];
      }
      sourceForNode(node, endNode) {
        let firstLine = node.loc.start.line - 1;
        let currentLine = firstLine - 1;
        let firstColumn = node.loc.start.column;
        let string = [];
        let line;
        let lastLine;
        let lastColumn;
        if (endNode) {
          lastLine = endNode.loc.end.line - 1;
          lastColumn = endNode.loc.end.column;
        } else {
          lastLine = node.loc.end.line - 1;
          lastColumn = node.loc.end.column;
        }
        while (currentLine < lastLine) {
          currentLine++;
          line = this.lines[currentLine];
          if (currentLine === firstLine) {
            if (firstLine === lastLine) {
              string.push(line.slice(firstColumn, lastColumn));
            } else {
              string.push(line.slice(firstColumn));
            }
          } else if (currentLine === lastLine) {
            string.push(line.slice(0, lastColumn));
          } else {
            string.push(line);
          }
        }
        return string.join("\n");
      }
    };
    exports.Parser = Parser;
  }
});
var require_handlebars_node_visitors = __commonJS({
  "node_modules/@glimmer/syntax/dist/commonjs/es2017/lib/parser/handlebars-node-visitors.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.HandlebarsNodeVisitors = void 0;
    var _parser = require_parser2();
    var _location = require_location();
    var _syntaxError = require_syntax_error();
    var _utils = require_utils();
    var _legacyInterop = require_legacy_interop();
    var _parserBuilders = _interopRequireDefault(require_parser_builders());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    var HandlebarsNodeVisitors = class extends _parser.Parser {
      get isTopLevel() {
        return this.elementStack.length === 0;
      }
      Program(program) {
        let body = [];
        let node;
        if (this.isTopLevel) {
          node = _parserBuilders.default.template({
            body,
            blockParams: program.blockParams,
            loc: this.source.spanFor(program.loc)
          });
        } else {
          node = _parserBuilders.default.blockItself({
            body,
            blockParams: program.blockParams,
            chained: program.chained,
            loc: this.source.spanFor(program.loc)
          });
        }
        let i, l = program.body.length;
        this.elementStack.push(node);
        if (l === 0) {
          return this.elementStack.pop();
        }
        for (i = 0; i < l; i++) {
          this.acceptNode(program.body[i]);
        }
        let poppedNode = this.elementStack.pop();
        if (poppedNode !== node) {
          let elementNode = poppedNode;
          throw (0, _syntaxError.generateSyntaxError)(`Unclosed element \`${elementNode.tag}\``, elementNode.loc);
        }
        return node;
      }
      BlockStatement(block) {
        if (this.tokenizer.state === "comment") {
          this.appendToCommentData(this.sourceForNode(block));
          return;
        }
        if (this.tokenizer.state !== "data" && this.tokenizer.state !== "beforeData") {
          throw (0, _syntaxError.generateSyntaxError)("A block may only be used inside an HTML element or another block.", this.source.spanFor(block.loc));
        }
        let {
          path,
          params,
          hash
        } = acceptCallNodes(this, block);
        if (!block.program.loc) {
          block.program.loc = _location.NON_EXISTENT_LOCATION;
        }
        if (block.inverse && !block.inverse.loc) {
          block.inverse.loc = _location.NON_EXISTENT_LOCATION;
        }
        let program = this.Program(block.program);
        let inverse = block.inverse ? this.Program(block.inverse) : null;
        let node = _parserBuilders.default.block({
          path,
          params,
          hash,
          defaultBlock: program,
          elseBlock: inverse,
          loc: this.source.spanFor(block.loc),
          openStrip: block.openStrip,
          inverseStrip: block.inverseStrip,
          closeStrip: block.closeStrip
        });
        let parentProgram = this.currentElement();
        (0, _utils.appendChild)(parentProgram, node);
      }
      MustacheStatement(rawMustache) {
        let {
          tokenizer
        } = this;
        if (tokenizer.state === "comment") {
          this.appendToCommentData(this.sourceForNode(rawMustache));
          return;
        }
        let mustache;
        let {
          escaped,
          loc,
          strip
        } = rawMustache;
        if ((0, _utils.isHBSLiteral)(rawMustache.path)) {
          mustache = _parserBuilders.default.mustache({
            path: this.acceptNode(rawMustache.path),
            params: [],
            hash: _parserBuilders.default.hash([], this.source.spanFor(rawMustache.path.loc).collapse("end")),
            trusting: !escaped,
            loc: this.source.spanFor(loc),
            strip
          });
        } else {
          let {
            path,
            params,
            hash
          } = acceptCallNodes(this, rawMustache);
          mustache = _parserBuilders.default.mustache({
            path,
            params,
            hash,
            trusting: !escaped,
            loc: this.source.spanFor(loc),
            strip
          });
        }
        switch (tokenizer.state) {
          case "tagOpen":
          case "tagName":
            throw (0, _syntaxError.generateSyntaxError)(`Cannot use mustaches in an elements tagname`, mustache.loc);
          case "beforeAttributeName":
            addElementModifier(this.currentStartTag, mustache);
            break;
          case "attributeName":
          case "afterAttributeName":
            this.beginAttributeValue(false);
            this.finishAttributeValue();
            addElementModifier(this.currentStartTag, mustache);
            tokenizer.transitionTo("beforeAttributeName");
            break;
          case "afterAttributeValueQuoted":
            addElementModifier(this.currentStartTag, mustache);
            tokenizer.transitionTo("beforeAttributeName");
            break;
          case "beforeAttributeValue":
            this.beginAttributeValue(false);
            this.appendDynamicAttributeValuePart(mustache);
            tokenizer.transitionTo("attributeValueUnquoted");
            break;
          case "attributeValueDoubleQuoted":
          case "attributeValueSingleQuoted":
          case "attributeValueUnquoted":
            this.appendDynamicAttributeValuePart(mustache);
            break;
          default:
            (0, _utils.appendChild)(this.currentElement(), mustache);
        }
        return mustache;
      }
      appendDynamicAttributeValuePart(part) {
        this.finalizeTextPart();
        let attr = this.currentAttr;
        attr.isDynamic = true;
        attr.parts.push(part);
      }
      finalizeTextPart() {
        let attr = this.currentAttr;
        let text = attr.currentPart;
        if (text !== null) {
          this.currentAttr.parts.push(text);
          this.startTextPart();
        }
      }
      startTextPart() {
        this.currentAttr.currentPart = null;
      }
      ContentStatement(content) {
        updateTokenizerLocation(this.tokenizer, content);
        this.tokenizer.tokenizePart(content.value);
        this.tokenizer.flushData();
      }
      CommentStatement(rawComment) {
        let {
          tokenizer
        } = this;
        if (tokenizer.state === "comment") {
          this.appendToCommentData(this.sourceForNode(rawComment));
          return null;
        }
        let {
          value,
          loc
        } = rawComment;
        let comment = _parserBuilders.default.mustacheComment(value, this.source.spanFor(loc));
        switch (tokenizer.state) {
          case "beforeAttributeName":
          case "afterAttributeName":
            this.currentStartTag.comments.push(comment);
            break;
          case "beforeData":
          case "data":
            (0, _utils.appendChild)(this.currentElement(), comment);
            break;
          default:
            throw (0, _syntaxError.generateSyntaxError)(`Using a Handlebars comment when in the \`${tokenizer["state"]}\` state is not supported`, this.source.spanFor(rawComment.loc));
        }
        return comment;
      }
      PartialStatement(partial) {
        throw (0, _syntaxError.generateSyntaxError)(`Handlebars partials are not supported`, this.source.spanFor(partial.loc));
      }
      PartialBlockStatement(partialBlock) {
        throw (0, _syntaxError.generateSyntaxError)(`Handlebars partial blocks are not supported`, this.source.spanFor(partialBlock.loc));
      }
      Decorator(decorator) {
        throw (0, _syntaxError.generateSyntaxError)(`Handlebars decorators are not supported`, this.source.spanFor(decorator.loc));
      }
      DecoratorBlock(decoratorBlock) {
        throw (0, _syntaxError.generateSyntaxError)(`Handlebars decorator blocks are not supported`, this.source.spanFor(decoratorBlock.loc));
      }
      SubExpression(sexpr) {
        let {
          path,
          params,
          hash
        } = acceptCallNodes(this, sexpr);
        return _parserBuilders.default.sexpr({
          path,
          params,
          hash,
          loc: this.source.spanFor(sexpr.loc)
        });
      }
      PathExpression(path) {
        let {
          original
        } = path;
        let parts;
        if (original.indexOf("/") !== -1) {
          if (original.slice(0, 2) === "./") {
            throw (0, _syntaxError.generateSyntaxError)(`Using "./" is not supported in Glimmer and unnecessary`, this.source.spanFor(path.loc));
          }
          if (original.slice(0, 3) === "../") {
            throw (0, _syntaxError.generateSyntaxError)(`Changing context using "../" is not supported in Glimmer`, this.source.spanFor(path.loc));
          }
          if (original.indexOf(".") !== -1) {
            throw (0, _syntaxError.generateSyntaxError)(`Mixing '.' and '/' in paths is not supported in Glimmer; use only '.' to separate property paths`, this.source.spanFor(path.loc));
          }
          parts = [path.parts.join("/")];
        } else if (original === ".") {
          throw (0, _syntaxError.generateSyntaxError)(`'.' is not a supported path in Glimmer; check for a path with a trailing '.'`, this.source.spanFor(path.loc));
        } else {
          parts = path.parts;
        }
        let thisHead = false;
        if (original.match(/^this(\..+)?$/)) {
          thisHead = true;
        }
        let pathHead;
        if (thisHead) {
          pathHead = {
            type: "ThisHead",
            loc: {
              start: path.loc.start,
              end: {
                line: path.loc.start.line,
                column: path.loc.start.column + 4
              }
            }
          };
        } else if (path.data) {
          let head = parts.shift();
          if (head === void 0) {
            throw (0, _syntaxError.generateSyntaxError)(`Attempted to parse a path expression, but it was not valid. Paths beginning with @ must start with a-z.`, this.source.spanFor(path.loc));
          }
          pathHead = {
            type: "AtHead",
            name: `@${head}`,
            loc: {
              start: path.loc.start,
              end: {
                line: path.loc.start.line,
                column: path.loc.start.column + head.length + 1
              }
            }
          };
        } else {
          let head = parts.shift();
          if (head === void 0) {
            throw (0, _syntaxError.generateSyntaxError)(`Attempted to parse a path expression, but it was not valid. Paths must start with a-z or A-Z.`, this.source.spanFor(path.loc));
          }
          pathHead = {
            type: "VarHead",
            name: head,
            loc: {
              start: path.loc.start,
              end: {
                line: path.loc.start.line,
                column: path.loc.start.column + head.length
              }
            }
          };
        }
        return new _legacyInterop.PathExpressionImplV1(path.original, pathHead, parts, this.source.spanFor(path.loc));
      }
      Hash(hash) {
        let pairs = [];
        for (let i = 0; i < hash.pairs.length; i++) {
          let pair = hash.pairs[i];
          pairs.push(_parserBuilders.default.pair({
            key: pair.key,
            value: this.acceptNode(pair.value),
            loc: this.source.spanFor(pair.loc)
          }));
        }
        return _parserBuilders.default.hash(pairs, this.source.spanFor(hash.loc));
      }
      StringLiteral(string) {
        return _parserBuilders.default.literal({
          type: "StringLiteral",
          value: string.value,
          loc: string.loc
        });
      }
      BooleanLiteral(boolean) {
        return _parserBuilders.default.literal({
          type: "BooleanLiteral",
          value: boolean.value,
          loc: boolean.loc
        });
      }
      NumberLiteral(number) {
        return _parserBuilders.default.literal({
          type: "NumberLiteral",
          value: number.value,
          loc: number.loc
        });
      }
      UndefinedLiteral(undef) {
        return _parserBuilders.default.literal({
          type: "UndefinedLiteral",
          value: void 0,
          loc: undef.loc
        });
      }
      NullLiteral(nul) {
        return _parserBuilders.default.literal({
          type: "NullLiteral",
          value: null,
          loc: nul.loc
        });
      }
    };
    exports.HandlebarsNodeVisitors = HandlebarsNodeVisitors;
    function calculateRightStrippedOffsets(original, value) {
      if (value === "") {
        return {
          lines: original.split("\n").length - 1,
          columns: 0
        };
      }
      let difference = original.split(value)[0];
      let lines = difference.split(/\n/);
      let lineCount = lines.length - 1;
      return {
        lines: lineCount,
        columns: lines[lineCount].length
      };
    }
    function updateTokenizerLocation(tokenizer, content) {
      let line = content.loc.start.line;
      let column = content.loc.start.column;
      let offsets = calculateRightStrippedOffsets(content.original, content.value);
      line = line + offsets.lines;
      if (offsets.lines) {
        column = offsets.columns;
      } else {
        column = column + offsets.columns;
      }
      tokenizer.line = line;
      tokenizer.column = column;
    }
    function acceptCallNodes(compiler, node) {
      if (node.path.type.endsWith("Literal")) {
        const path2 = node.path;
        let value = "";
        if (path2.type === "BooleanLiteral") {
          value = path2.original.toString();
        } else if (path2.type === "StringLiteral") {
          value = `"${path2.original}"`;
        } else if (path2.type === "NullLiteral") {
          value = "null";
        } else if (path2.type === "NumberLiteral") {
          value = path2.value.toString();
        } else {
          value = "undefined";
        }
        throw (0, _syntaxError.generateSyntaxError)(`${path2.type} "${path2.type === "StringLiteral" ? path2.original : value}" cannot be called as a sub-expression, replace (${value}) with ${value}`, compiler.source.spanFor(path2.loc));
      }
      let path = node.path.type === "PathExpression" ? compiler.PathExpression(node.path) : compiler.SubExpression(node.path);
      let params = node.params ? node.params.map((e) => compiler.acceptNode(e)) : [];
      let end = params.length > 0 ? params[params.length - 1].loc : path.loc;
      let hash = node.hash ? compiler.Hash(node.hash) : {
        type: "Hash",
        pairs: [],
        loc: compiler.source.spanFor(end).collapse("end")
      };
      return {
        path,
        params,
        hash
      };
    }
    function addElementModifier(element, mustache) {
      let {
        path,
        params,
        hash,
        loc
      } = mustache;
      if ((0, _utils.isHBSLiteral)(path)) {
        let modifier2 = `{{${(0, _utils.printLiteral)(path)}}}`;
        let tag = `<${element.name} ... ${modifier2} ...`;
        throw (0, _syntaxError.generateSyntaxError)(`In ${tag}, ${modifier2} is not a valid modifier`, mustache.loc);
      }
      let modifier = _parserBuilders.default.elementModifier({
        path,
        params,
        hash,
        loc
      });
      element.modifiers.push(modifier);
    }
  }
});
var require_tokenizer_event_handlers = __commonJS({
  "node_modules/@glimmer/syntax/dist/commonjs/es2017/lib/parser/tokenizer-event-handlers.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.preprocess = preprocess;
    exports.TokenizerEventHandlers = void 0;
    var _util = require_es2017();
    var _parser = require_cjs();
    var _simpleHtmlTokenizer = require_simple_html_tokenizer();
    var _print = _interopRequireDefault(require_print());
    var _printer = require_printer();
    var _source = require_source();
    var _span = require_span2();
    var _syntaxError = require_syntax_error();
    var _traverse = _interopRequireDefault(require_traverse());
    var _walker = _interopRequireDefault(require_walker());
    var _utils = require_utils();
    var _parserBuilders = _interopRequireDefault(require_parser_builders());
    var _publicBuilders = _interopRequireDefault(require_public_builders());
    var _handlebarsNodeVisitors = require_handlebars_node_visitors();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    var TokenizerEventHandlers = class extends _handlebarsNodeVisitors.HandlebarsNodeVisitors {
      constructor() {
        super(...arguments);
        this.tagOpenLine = 0;
        this.tagOpenColumn = 0;
      }
      reset() {
        this.currentNode = null;
      }
      beginComment() {
        this.currentNode = _parserBuilders.default.comment("", this.source.offsetFor(this.tagOpenLine, this.tagOpenColumn));
      }
      appendToCommentData(char) {
        this.currentComment.value += char;
      }
      finishComment() {
        (0, _utils.appendChild)(this.currentElement(), this.finish(this.currentComment));
      }
      beginData() {
        this.currentNode = _parserBuilders.default.text({
          chars: "",
          loc: this.offset().collapsed()
        });
      }
      appendToData(char) {
        this.currentData.chars += char;
      }
      finishData() {
        this.currentData.loc = this.currentData.loc.withEnd(this.offset());
        (0, _utils.appendChild)(this.currentElement(), this.currentData);
      }
      tagOpen() {
        this.tagOpenLine = this.tokenizer.line;
        this.tagOpenColumn = this.tokenizer.column;
      }
      beginStartTag() {
        this.currentNode = {
          type: "StartTag",
          name: "",
          attributes: [],
          modifiers: [],
          comments: [],
          selfClosing: false,
          loc: this.source.offsetFor(this.tagOpenLine, this.tagOpenColumn)
        };
      }
      beginEndTag() {
        this.currentNode = {
          type: "EndTag",
          name: "",
          attributes: [],
          modifiers: [],
          comments: [],
          selfClosing: false,
          loc: this.source.offsetFor(this.tagOpenLine, this.tagOpenColumn)
        };
      }
      finishTag() {
        let tag = this.finish(this.currentTag);
        if (tag.type === "StartTag") {
          this.finishStartTag();
          if (tag.name === ":") {
            throw (0, _syntaxError.generateSyntaxError)("Invalid named block named detected, you may have created a named block without a name, or you may have began your name with a number. Named blocks must have names that are at least one character long, and begin with a lower case letter", this.source.spanFor({
              start: this.currentTag.loc.toJSON(),
              end: this.offset().toJSON()
            }));
          }
          if (_printer.voidMap[tag.name] || tag.selfClosing) {
            this.finishEndTag(true);
          }
        } else if (tag.type === "EndTag") {
          this.finishEndTag(false);
        }
      }
      finishStartTag() {
        let {
          name,
          attributes: attrs,
          modifiers,
          comments,
          selfClosing,
          loc
        } = this.finish(this.currentStartTag);
        let element = _parserBuilders.default.element({
          tag: name,
          selfClosing,
          attrs,
          modifiers,
          comments,
          children: [],
          blockParams: [],
          loc
        });
        this.elementStack.push(element);
      }
      finishEndTag(isVoid) {
        let tag = this.finish(this.currentTag);
        let element = this.elementStack.pop();
        let parent = this.currentElement();
        this.validateEndTag(tag, element, isVoid);
        element.loc = element.loc.withEnd(this.offset());
        (0, _utils.parseElementBlockParams)(element);
        (0, _utils.appendChild)(parent, element);
      }
      markTagAsSelfClosing() {
        this.currentTag.selfClosing = true;
      }
      appendToTagName(char) {
        this.currentTag.name += char;
      }
      beginAttribute() {
        let offset = this.offset();
        this.currentAttribute = {
          name: "",
          parts: [],
          currentPart: null,
          isQuoted: false,
          isDynamic: false,
          start: offset,
          valueSpan: offset.collapsed()
        };
      }
      appendToAttributeName(char) {
        this.currentAttr.name += char;
      }
      beginAttributeValue(isQuoted) {
        this.currentAttr.isQuoted = isQuoted;
        this.startTextPart();
        this.currentAttr.valueSpan = this.offset().collapsed();
      }
      appendToAttributeValue(char) {
        let parts = this.currentAttr.parts;
        let lastPart = parts[parts.length - 1];
        let current = this.currentAttr.currentPart;
        if (current) {
          current.chars += char;
          current.loc = current.loc.withEnd(this.offset());
        } else {
          let loc = this.offset();
          if (char === "\n") {
            loc = lastPart ? lastPart.loc.getEnd() : this.currentAttr.valueSpan.getStart();
          } else {
            loc = loc.move(-1);
          }
          this.currentAttr.currentPart = _parserBuilders.default.text({
            chars: char,
            loc: loc.collapsed()
          });
        }
      }
      finishAttributeValue() {
        this.finalizeTextPart();
        let tag = this.currentTag;
        let tokenizerPos = this.offset();
        if (tag.type === "EndTag") {
          throw (0, _syntaxError.generateSyntaxError)(`Invalid end tag: closing tag must not have attributes`, this.source.spanFor({
            start: tag.loc.toJSON(),
            end: tokenizerPos.toJSON()
          }));
        }
        let {
          name,
          parts,
          start,
          isQuoted,
          isDynamic,
          valueSpan
        } = this.currentAttr;
        let value = this.assembleAttributeValue(parts, isQuoted, isDynamic, start.until(tokenizerPos));
        value.loc = valueSpan.withEnd(tokenizerPos);
        let attribute = _parserBuilders.default.attr({
          name,
          value,
          loc: start.until(tokenizerPos)
        });
        this.currentStartTag.attributes.push(attribute);
      }
      reportSyntaxError(message) {
        throw (0, _syntaxError.generateSyntaxError)(message, this.offset().collapsed());
      }
      assembleConcatenatedValue(parts) {
        for (let i = 0; i < parts.length; i++) {
          let part = parts[i];
          if (part.type !== "MustacheStatement" && part.type !== "TextNode") {
            throw (0, _syntaxError.generateSyntaxError)("Unsupported node in quoted attribute value: " + part["type"], part.loc);
          }
        }
        (0, _util.assertPresent)(parts, `the concatenation parts of an element should not be empty`);
        let first = parts[0];
        let last = parts[parts.length - 1];
        return _parserBuilders.default.concat(parts, this.source.spanFor(first.loc).extend(this.source.spanFor(last.loc)));
      }
      validateEndTag(tag, element, selfClosing) {
        let error;
        if (_printer.voidMap[tag.name] && !selfClosing) {
          error = `<${tag.name}> elements do not need end tags. You should remove it`;
        } else if (element.tag === void 0) {
          error = `Closing tag </${tag.name}> without an open tag`;
        } else if (element.tag !== tag.name) {
          error = `Closing tag </${tag.name}> did not match last open tag <${element.tag}> (on line ${element.loc.startPosition.line})`;
        }
        if (error) {
          throw (0, _syntaxError.generateSyntaxError)(error, tag.loc);
        }
      }
      assembleAttributeValue(parts, isQuoted, isDynamic, span) {
        if (isDynamic) {
          if (isQuoted) {
            return this.assembleConcatenatedValue(parts);
          } else {
            if (parts.length === 1 || parts.length === 2 && parts[1].type === "TextNode" && parts[1].chars === "/") {
              return parts[0];
            } else {
              throw (0, _syntaxError.generateSyntaxError)(`An unquoted attribute value must be a string or a mustache, preceded by whitespace or a '=' character, and followed by whitespace, a '>' character, or '/>'`, span);
            }
          }
        } else {
          return parts.length > 0 ? parts[0] : _parserBuilders.default.text({
            chars: "",
            loc: span
          });
        }
      }
    };
    exports.TokenizerEventHandlers = TokenizerEventHandlers;
    var syntax = {
      parse: preprocess,
      builders: _publicBuilders.default,
      print: _print.default,
      traverse: _traverse.default,
      Walker: _walker.default
    };
    var CodemodEntityParser = class extends _simpleHtmlTokenizer.EntityParser {
      constructor() {
        super({});
      }
      parse() {
        return void 0;
      }
    };
    function preprocess(input) {
      let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var _a, _b, _c;
      let mode = options.mode || "precompile";
      let source;
      let ast;
      if (typeof input === "string") {
        source = new _source.Source(input, (_a = options.meta) === null || _a === void 0 ? void 0 : _a.moduleName);
        if (mode === "codemod") {
          ast = (0, _parser.parseWithoutProcessing)(input, options.parseOptions);
        } else {
          ast = (0, _parser.parse)(input, options.parseOptions);
        }
      } else if (input instanceof _source.Source) {
        source = input;
        if (mode === "codemod") {
          ast = (0, _parser.parseWithoutProcessing)(input.source, options.parseOptions);
        } else {
          ast = (0, _parser.parse)(input.source, options.parseOptions);
        }
      } else {
        source = new _source.Source("", (_b = options.meta) === null || _b === void 0 ? void 0 : _b.moduleName);
        ast = input;
      }
      let entityParser = void 0;
      if (mode === "codemod") {
        entityParser = new CodemodEntityParser();
      }
      let offsets = _span.SourceSpan.forCharPositions(source, 0, source.source.length);
      ast.loc = {
        source: "(program)",
        start: offsets.startPosition,
        end: offsets.endPosition
      };
      let program = new TokenizerEventHandlers(source, entityParser, mode).acceptTemplate(ast);
      if (options.strictMode) {
        program.blockParams = (_c = options.locals) !== null && _c !== void 0 ? _c : [];
      }
      if (options && options.plugins && options.plugins.ast) {
        for (let i = 0, l = options.plugins.ast.length; i < l; i++) {
          let transform = options.plugins.ast[i];
          let env = (0, _util.assign)({}, options, {
            syntax
          }, {
            plugins: void 0
          });
          let pluginResult = transform(env);
          (0, _traverse.default)(program, pluginResult.visitor);
        }
      }
      return program;
    }
  }
});
var require_symbol_table = __commonJS({
  "node_modules/@glimmer/syntax/dist/commonjs/es2017/lib/symbol-table.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.BlockSymbolTable = exports.ProgramSymbolTable = exports.SymbolTable = void 0;
    var _util = require_es2017();
    var _utils = require_utils();
    var SymbolTable = class {
      static top(locals, customizeComponentName) {
        return new ProgramSymbolTable(locals, customizeComponentName);
      }
      child(locals) {
        let symbols = locals.map((name) => this.allocate(name));
        return new BlockSymbolTable(this, locals, symbols);
      }
    };
    exports.SymbolTable = SymbolTable;
    var ProgramSymbolTable = class extends SymbolTable {
      constructor(templateLocals, customizeComponentName) {
        super();
        this.templateLocals = templateLocals;
        this.customizeComponentName = customizeComponentName;
        this.symbols = [];
        this.upvars = [];
        this.size = 1;
        this.named = (0, _util.dict)();
        this.blocks = (0, _util.dict)();
        this.usedTemplateLocals = [];
        this._hasEval = false;
      }
      getUsedTemplateLocals() {
        return this.usedTemplateLocals;
      }
      setHasEval() {
        this._hasEval = true;
      }
      get hasEval() {
        return this._hasEval;
      }
      has(name) {
        return this.templateLocals.indexOf(name) !== -1;
      }
      get(name) {
        let index = this.usedTemplateLocals.indexOf(name);
        if (index !== -1) {
          return [index, true];
        }
        index = this.usedTemplateLocals.length;
        this.usedTemplateLocals.push(name);
        return [index, true];
      }
      getLocalsMap() {
        return (0, _util.dict)();
      }
      getEvalInfo() {
        let locals = this.getLocalsMap();
        return Object.keys(locals).map((symbol) => locals[symbol]);
      }
      allocateFree(name, resolution) {
        if (resolution.resolution() === 39 && resolution.isAngleBracket && (0, _utils.isUpperCase)(name)) {
          name = this.customizeComponentName(name);
        }
        let index = this.upvars.indexOf(name);
        if (index !== -1) {
          return index;
        }
        index = this.upvars.length;
        this.upvars.push(name);
        return index;
      }
      allocateNamed(name) {
        let named = this.named[name];
        if (!named) {
          named = this.named[name] = this.allocate(name);
        }
        return named;
      }
      allocateBlock(name) {
        if (name === "inverse") {
          name = "else";
        }
        let block = this.blocks[name];
        if (!block) {
          block = this.blocks[name] = this.allocate(`&${name}`);
        }
        return block;
      }
      allocate(identifier) {
        this.symbols.push(identifier);
        return this.size++;
      }
    };
    exports.ProgramSymbolTable = ProgramSymbolTable;
    var BlockSymbolTable = class extends SymbolTable {
      constructor(parent, symbols, slots) {
        super();
        this.parent = parent;
        this.symbols = symbols;
        this.slots = slots;
      }
      get locals() {
        return this.symbols;
      }
      has(name) {
        return this.symbols.indexOf(name) !== -1 || this.parent.has(name);
      }
      get(name) {
        let slot = this.symbols.indexOf(name);
        return slot === -1 ? this.parent.get(name) : [this.slots[slot], false];
      }
      getLocalsMap() {
        let dict = this.parent.getLocalsMap();
        this.symbols.forEach((symbol) => dict[symbol] = this.get(symbol)[0]);
        return dict;
      }
      getEvalInfo() {
        let locals = this.getLocalsMap();
        return Object.keys(locals).map((symbol) => locals[symbol]);
      }
      setHasEval() {
        this.parent.setHasEval();
      }
      allocateFree(name, resolution) {
        return this.parent.allocateFree(name, resolution);
      }
      allocateNamed(name) {
        return this.parent.allocateNamed(name);
      }
      allocateBlock(name) {
        return this.parent.allocateBlock(name);
      }
      allocate(identifier) {
        return this.parent.allocate(identifier);
      }
    };
    exports.BlockSymbolTable = BlockSymbolTable;
  }
});
var require_builders = __commonJS({
  "node_modules/@glimmer/syntax/dist/commonjs/es2017/lib/v2-a/builders.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.BuildElement = exports.Builder = void 0;
    var _util = require_es2017();
    var _slice = require_slice();
    var _spanList = require_span_list();
    var ASTv2 = _interopRequireWildcard(require_api2());
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
          default: obj
        };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    var __rest = function(s, e) {
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
    };
    var Builder = class {
      template(symbols, body, loc) {
        return new ASTv2.Template({
          table: symbols,
          body,
          loc
        });
      }
      block(symbols, body, loc) {
        return new ASTv2.Block({
          scope: symbols,
          body,
          loc
        });
      }
      namedBlock(name, block, loc) {
        return new ASTv2.NamedBlock({
          name,
          block,
          attrs: [],
          componentArgs: [],
          modifiers: [],
          loc
        });
      }
      simpleNamedBlock(name, block, loc) {
        return new BuildElement({
          selfClosing: false,
          attrs: [],
          componentArgs: [],
          modifiers: [],
          comments: []
        }).named(name, block, loc);
      }
      slice(chars, loc) {
        return new _slice.SourceSlice({
          loc,
          chars
        });
      }
      args(positional, named, loc) {
        return new ASTv2.Args({
          loc,
          positional,
          named
        });
      }
      positional(exprs, loc) {
        return new ASTv2.PositionalArguments({
          loc,
          exprs
        });
      }
      namedArgument(key, value) {
        return new ASTv2.NamedArgument({
          name: key,
          value
        });
      }
      named(entries, loc) {
        return new ASTv2.NamedArguments({
          loc,
          entries
        });
      }
      attr(_ref28, loc) {
        let {
          name,
          value,
          trusting
        } = _ref28;
        return new ASTv2.HtmlAttr({
          loc,
          name,
          value,
          trusting
        });
      }
      splatAttr(symbol, loc) {
        return new ASTv2.SplatAttr({
          symbol,
          loc
        });
      }
      arg(_ref29, loc) {
        let {
          name,
          value,
          trusting
        } = _ref29;
        return new ASTv2.ComponentArg({
          name,
          value,
          trusting,
          loc
        });
      }
      path(head, tail, loc) {
        return new ASTv2.PathExpression({
          loc,
          ref: head,
          tail
        });
      }
      self(loc) {
        return new ASTv2.ThisReference({
          loc
        });
      }
      at(name, symbol, loc) {
        return new ASTv2.ArgReference({
          loc,
          name: new _slice.SourceSlice({
            loc,
            chars: name
          }),
          symbol
        });
      }
      freeVar(_ref30) {
        let {
          name,
          context,
          symbol,
          loc
        } = _ref30;
        return new ASTv2.FreeVarReference({
          name,
          resolution: context,
          symbol,
          loc
        });
      }
      localVar(name, symbol, isTemplateLocal, loc) {
        return new ASTv2.LocalVarReference({
          loc,
          name,
          isTemplateLocal,
          symbol
        });
      }
      sexp(parts, loc) {
        return new ASTv2.CallExpression({
          loc,
          callee: parts.callee,
          args: parts.args
        });
      }
      deprecatedCall(arg, callee, loc) {
        return new ASTv2.DeprecatedCallExpression({
          loc,
          arg,
          callee
        });
      }
      interpolate(parts, loc) {
        (0, _util.assertPresent)(parts);
        return new ASTv2.InterpolateExpression({
          loc,
          parts
        });
      }
      literal(value, loc) {
        return new ASTv2.LiteralExpression({
          loc,
          value
        });
      }
      append(_ref31, loc) {
        let {
          table,
          trusting,
          value
        } = _ref31;
        return new ASTv2.AppendContent({
          table,
          trusting,
          value,
          loc
        });
      }
      modifier(_ref32, loc) {
        let {
          callee,
          args
        } = _ref32;
        return new ASTv2.ElementModifier({
          loc,
          callee,
          args
        });
      }
      namedBlocks(blocks, loc) {
        return new ASTv2.NamedBlocks({
          loc,
          blocks
        });
      }
      blockStatement(_a, loc) {
        var {
          symbols,
          program,
          inverse = null
        } = _a, call = __rest(_a, ["symbols", "program", "inverse"]);
        let blocksLoc = program.loc;
        let blocks = [this.namedBlock(_slice.SourceSlice.synthetic("default"), program, program.loc)];
        if (inverse) {
          blocksLoc = blocksLoc.extend(inverse.loc);
          blocks.push(this.namedBlock(_slice.SourceSlice.synthetic("else"), inverse, inverse.loc));
        }
        return new ASTv2.InvokeBlock({
          loc,
          blocks: this.namedBlocks(blocks, blocksLoc),
          callee: call.callee,
          args: call.args
        });
      }
      element(options) {
        return new BuildElement(options);
      }
    };
    exports.Builder = Builder;
    var BuildElement = class {
      constructor(base) {
        this.base = base;
        this.builder = new Builder();
      }
      simple(tag, body, loc) {
        return new ASTv2.SimpleElement((0, _util.assign)({
          tag,
          body,
          componentArgs: [],
          loc
        }, this.base));
      }
      named(name, block, loc) {
        return new ASTv2.NamedBlock((0, _util.assign)({
          name,
          block,
          componentArgs: [],
          loc
        }, this.base));
      }
      selfClosingComponent(callee, loc) {
        return new ASTv2.InvokeComponent((0, _util.assign)({
          loc,
          callee,
          blocks: new ASTv2.NamedBlocks({
            blocks: [],
            loc: loc.sliceEndChars({
              skipEnd: 1,
              chars: 1
            })
          })
        }, this.base));
      }
      componentWithDefaultBlock(callee, children, symbols, loc) {
        let block = this.builder.block(symbols, children, loc);
        let namedBlock = this.builder.namedBlock(_slice.SourceSlice.synthetic("default"), block, loc);
        return new ASTv2.InvokeComponent((0, _util.assign)({
          loc,
          callee,
          blocks: this.builder.namedBlocks([namedBlock], namedBlock.loc)
        }, this.base));
      }
      componentWithNamedBlocks(callee, blocks, loc) {
        return new ASTv2.InvokeComponent((0, _util.assign)({
          loc,
          callee,
          blocks: this.builder.namedBlocks(blocks, _spanList.SpanList.range(blocks))
        }, this.base));
      }
    };
    exports.BuildElement = BuildElement;
  }
});
var require_loose_resolution = __commonJS({
  "node_modules/@glimmer/syntax/dist/commonjs/es2017/lib/v2-a/loose-resolution.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SexpSyntaxContext = SexpSyntaxContext;
    exports.ModifierSyntaxContext = ModifierSyntaxContext;
    exports.BlockSyntaxContext = BlockSyntaxContext;
    exports.ComponentSyntaxContext = ComponentSyntaxContext;
    exports.AttrValueSyntaxContext = AttrValueSyntaxContext;
    exports.AppendSyntaxContext = AppendSyntaxContext;
    var ASTv2 = _interopRequireWildcard(require_api2());
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
          default: obj
        };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function SexpSyntaxContext(node) {
      if (isSimpleCallee(node)) {
        return ASTv2.LooseModeResolution.namespaced("Helper");
      } else {
        return null;
      }
    }
    function ModifierSyntaxContext(node) {
      if (isSimpleCallee(node)) {
        return ASTv2.LooseModeResolution.namespaced("Modifier");
      } else {
        return null;
      }
    }
    function BlockSyntaxContext(node) {
      if (isSimpleCallee(node)) {
        return ASTv2.LooseModeResolution.namespaced("Component");
      } else {
        return ASTv2.LooseModeResolution.fallback();
      }
    }
    function ComponentSyntaxContext(node) {
      if (isSimplePath(node)) {
        return ASTv2.LooseModeResolution.namespaced("Component", true);
      } else {
        return null;
      }
    }
    function AttrValueSyntaxContext(node) {
      let isSimple = isSimpleCallee(node);
      let isInvoke = isInvokeNode(node);
      if (isSimple) {
        return isInvoke ? ASTv2.LooseModeResolution.namespaced("Helper") : ASTv2.LooseModeResolution.attr();
      } else {
        return isInvoke ? ASTv2.STRICT_RESOLUTION : ASTv2.LooseModeResolution.fallback();
      }
    }
    function AppendSyntaxContext(node) {
      let isSimple = isSimpleCallee(node);
      let isInvoke = isInvokeNode(node);
      let trusting = node.trusting;
      if (isSimple) {
        return trusting ? ASTv2.LooseModeResolution.trustingAppend({
          invoke: isInvoke
        }) : ASTv2.LooseModeResolution.append({
          invoke: isInvoke
        });
      } else {
        return ASTv2.LooseModeResolution.fallback();
      }
    }
    function isSimpleCallee(node) {
      let path = node.path;
      return isSimplePath(path);
    }
    function isSimplePath(node) {
      if (node.type === "PathExpression" && node.head.type === "VarHead") {
        return node.tail.length === 0;
      } else {
        return false;
      }
    }
    function isInvokeNode(node) {
      return node.params.length > 0 || node.hash.pairs.length > 0;
    }
  }
});
var require_normalize = __commonJS({
  "node_modules/@glimmer/syntax/dist/commonjs/es2017/lib/v2-a/normalize.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.normalize = normalize;
    exports.BlockContext = void 0;
    var _util = require_es2017();
    var _printer = _interopRequireDefault(require_printer());
    var _tokenizerEventHandlers = require_tokenizer_event_handlers();
    var _slice = require_slice();
    var _spanList = require_span_list();
    var _symbolTable = require_symbol_table();
    var _syntaxError = require_syntax_error();
    var _utils = require_utils();
    var _parserBuilders = _interopRequireDefault(require_parser_builders());
    var ASTv2 = _interopRequireWildcard(require_api2());
    var _builders = require_builders();
    var _looseResolution = require_loose_resolution();
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
          default: obj
        };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function normalize(source) {
      let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var _a;
      let ast = (0, _tokenizerEventHandlers.preprocess)(source, options);
      let normalizeOptions = (0, _util.assign)({
        strictMode: false,
        locals: []
      }, options);
      let top = _symbolTable.SymbolTable.top(normalizeOptions.locals, (_a = options.customizeComponentName) !== null && _a !== void 0 ? _a : (name) => name);
      let block = new BlockContext(source, normalizeOptions, top);
      let normalizer = new StatementNormalizer(block);
      let astV2 = new TemplateChildren(block.loc(ast.loc), ast.body.map((b) => normalizer.normalize(b)), block).assertTemplate(top);
      let locals = top.getUsedTemplateLocals();
      return [astV2, locals];
    }
    var BlockContext = class {
      constructor(source, options, table) {
        this.source = source;
        this.options = options;
        this.table = table;
        this.builder = new _builders.Builder();
      }
      get strict() {
        return this.options.strictMode || false;
      }
      loc(loc) {
        return this.source.spanFor(loc);
      }
      resolutionFor(node, resolution) {
        if (this.strict) {
          return {
            resolution: ASTv2.STRICT_RESOLUTION
          };
        }
        if (this.isFreeVar(node)) {
          let r = resolution(node);
          if (r === null) {
            return {
              resolution: "error",
              path: printPath(node),
              head: printHead(node)
            };
          }
          return {
            resolution: r
          };
        } else {
          return {
            resolution: ASTv2.STRICT_RESOLUTION
          };
        }
      }
      isFreeVar(callee) {
        if (callee.type === "PathExpression") {
          if (callee.head.type !== "VarHead") {
            return false;
          }
          return !this.table.has(callee.head.name);
        } else if (callee.path.type === "PathExpression") {
          return this.isFreeVar(callee.path);
        } else {
          return false;
        }
      }
      hasBinding(name) {
        return this.table.has(name);
      }
      child(blockParams) {
        return new BlockContext(this.source, this.options, this.table.child(blockParams));
      }
      customizeComponentName(input) {
        if (this.options.customizeComponentName) {
          return this.options.customizeComponentName(input);
        } else {
          return input;
        }
      }
    };
    exports.BlockContext = BlockContext;
    var ExpressionNormalizer = class {
      constructor(block) {
        this.block = block;
      }
      normalize(expr, resolution) {
        switch (expr.type) {
          case "NullLiteral":
          case "BooleanLiteral":
          case "NumberLiteral":
          case "StringLiteral":
          case "UndefinedLiteral":
            return this.block.builder.literal(expr.value, this.block.loc(expr.loc));
          case "PathExpression":
            return this.path(expr, resolution);
          case "SubExpression": {
            let resolution2 = this.block.resolutionFor(expr, _looseResolution.SexpSyntaxContext);
            if (resolution2.resolution === "error") {
              throw (0, _syntaxError.generateSyntaxError)(`You attempted to invoke a path (\`${resolution2.path}\`) but ${resolution2.head} was not in scope`, expr.loc);
            }
            return this.block.builder.sexp(this.callParts(expr, resolution2.resolution), this.block.loc(expr.loc));
          }
        }
      }
      path(expr, resolution) {
        let headOffsets = this.block.loc(expr.head.loc);
        let tail = [];
        let offset = headOffsets;
        for (let part of expr.tail) {
          offset = offset.sliceStartChars({
            chars: part.length,
            skipStart: 1
          });
          tail.push(new _slice.SourceSlice({
            loc: offset,
            chars: part
          }));
        }
        return this.block.builder.path(this.ref(expr.head, resolution), tail, this.block.loc(expr.loc));
      }
      callParts(parts, context) {
        let {
          path,
          params,
          hash
        } = parts;
        let callee = this.normalize(path, context);
        let paramList = params.map((p) => this.normalize(p, ASTv2.ARGUMENT_RESOLUTION));
        let paramLoc = _spanList.SpanList.range(paramList, callee.loc.collapse("end"));
        let namedLoc = this.block.loc(hash.loc);
        let argsLoc = _spanList.SpanList.range([paramLoc, namedLoc]);
        let positional = this.block.builder.positional(params.map((p) => this.normalize(p, ASTv2.ARGUMENT_RESOLUTION)), paramLoc);
        let named = this.block.builder.named(hash.pairs.map((p) => this.namedArgument(p)), this.block.loc(hash.loc));
        return {
          callee,
          args: this.block.builder.args(positional, named, argsLoc)
        };
      }
      namedArgument(pair) {
        let offsets = this.block.loc(pair.loc);
        let keyOffsets = offsets.sliceStartChars({
          chars: pair.key.length
        });
        return this.block.builder.namedArgument(new _slice.SourceSlice({
          chars: pair.key,
          loc: keyOffsets
        }), this.normalize(pair.value, ASTv2.ARGUMENT_RESOLUTION));
      }
      ref(head, resolution) {
        let {
          block
        } = this;
        let {
          builder,
          table
        } = block;
        let offsets = block.loc(head.loc);
        switch (head.type) {
          case "ThisHead":
            return builder.self(offsets);
          case "AtHead": {
            let symbol = table.allocateNamed(head.name);
            return builder.at(head.name, symbol, offsets);
          }
          case "VarHead": {
            if (block.hasBinding(head.name)) {
              let [symbol, isRoot] = table.get(head.name);
              return block.builder.localVar(head.name, symbol, isRoot, offsets);
            } else {
              let context = block.strict ? ASTv2.STRICT_RESOLUTION : resolution;
              let symbol = block.table.allocateFree(head.name, context);
              return block.builder.freeVar({
                name: head.name,
                context,
                symbol,
                loc: offsets
              });
            }
          }
        }
      }
    };
    var StatementNormalizer = class {
      constructor(block) {
        this.block = block;
      }
      normalize(node) {
        switch (node.type) {
          case "PartialStatement":
            throw new Error(`Handlebars partial syntax ({{> ...}}) is not allowed in Glimmer`);
          case "BlockStatement":
            return this.BlockStatement(node);
          case "ElementNode":
            return new ElementNormalizer(this.block).ElementNode(node);
          case "MustacheStatement":
            return this.MustacheStatement(node);
          case "MustacheCommentStatement":
            return this.MustacheCommentStatement(node);
          case "CommentStatement": {
            let loc = this.block.loc(node.loc);
            return new ASTv2.HtmlComment({
              loc,
              text: loc.slice({
                skipStart: 4,
                skipEnd: 3
              }).toSlice(node.value)
            });
          }
          case "TextNode":
            return new ASTv2.HtmlText({
              loc: this.block.loc(node.loc),
              chars: node.chars
            });
        }
      }
      MustacheCommentStatement(node) {
        let loc = this.block.loc(node.loc);
        let textLoc;
        if (loc.asString().slice(0, 5) === "{{!--") {
          textLoc = loc.slice({
            skipStart: 5,
            skipEnd: 4
          });
        } else {
          textLoc = loc.slice({
            skipStart: 3,
            skipEnd: 2
          });
        }
        return new ASTv2.GlimmerComment({
          loc,
          text: textLoc.toSlice(node.value)
        });
      }
      MustacheStatement(mustache) {
        let {
          escaped
        } = mustache;
        let loc = this.block.loc(mustache.loc);
        let callParts = this.expr.callParts({
          path: mustache.path,
          params: mustache.params,
          hash: mustache.hash
        }, (0, _looseResolution.AppendSyntaxContext)(mustache));
        let value = callParts.args.isEmpty() ? callParts.callee : this.block.builder.sexp(callParts, loc);
        return this.block.builder.append({
          table: this.block.table,
          trusting: !escaped,
          value
        }, loc);
      }
      BlockStatement(block) {
        let {
          program,
          inverse
        } = block;
        let loc = this.block.loc(block.loc);
        let resolution = this.block.resolutionFor(block, _looseResolution.BlockSyntaxContext);
        if (resolution.resolution === "error") {
          throw (0, _syntaxError.generateSyntaxError)(`You attempted to invoke a path (\`{{#${resolution.path}}}\`) but ${resolution.head} was not in scope`, loc);
        }
        let callParts = this.expr.callParts(block, resolution.resolution);
        return this.block.builder.blockStatement((0, _util.assign)({
          symbols: this.block.table,
          program: this.Block(program),
          inverse: inverse ? this.Block(inverse) : null
        }, callParts), loc);
      }
      Block(_ref33) {
        let {
          body,
          loc,
          blockParams
        } = _ref33;
        let child = this.block.child(blockParams);
        let normalizer = new StatementNormalizer(child);
        return new BlockChildren(this.block.loc(loc), body.map((b) => normalizer.normalize(b)), this.block).assertBlock(child.table);
      }
      get expr() {
        return new ExpressionNormalizer(this.block);
      }
    };
    var ElementNormalizer = class {
      constructor(ctx) {
        this.ctx = ctx;
      }
      ElementNode(element) {
        let {
          tag,
          selfClosing,
          comments
        } = element;
        let loc = this.ctx.loc(element.loc);
        let [tagHead, ...rest] = tag.split(".");
        let path = this.classifyTag(tagHead, rest, element.loc);
        let attrs = element.attributes.filter((a) => a.name[0] !== "@").map((a) => this.attr(a));
        let args = element.attributes.filter((a) => a.name[0] === "@").map((a) => this.arg(a));
        let modifiers = element.modifiers.map((m) => this.modifier(m));
        let child = this.ctx.child(element.blockParams);
        let normalizer = new StatementNormalizer(child);
        let childNodes = element.children.map((s) => normalizer.normalize(s));
        let el = this.ctx.builder.element({
          selfClosing,
          attrs,
          componentArgs: args,
          modifiers,
          comments: comments.map((c) => new StatementNormalizer(this.ctx).MustacheCommentStatement(c))
        });
        let children = new ElementChildren(el, loc, childNodes, this.ctx);
        let offsets = this.ctx.loc(element.loc);
        let tagOffsets = offsets.sliceStartChars({
          chars: tag.length,
          skipStart: 1
        });
        if (path === "ElementHead") {
          if (tag[0] === ":") {
            return children.assertNamedBlock(tagOffsets.slice({
              skipStart: 1
            }).toSlice(tag.slice(1)), child.table);
          } else {
            return children.assertElement(tagOffsets.toSlice(tag), element.blockParams.length > 0);
          }
        }
        if (element.selfClosing) {
          return el.selfClosingComponent(path, loc);
        } else {
          let blocks = children.assertComponent(tag, child.table, element.blockParams.length > 0);
          return el.componentWithNamedBlocks(path, blocks, loc);
        }
      }
      modifier(m) {
        let resolution = this.ctx.resolutionFor(m, _looseResolution.ModifierSyntaxContext);
        if (resolution.resolution === "error") {
          throw (0, _syntaxError.generateSyntaxError)(`You attempted to invoke a path (\`{{#${resolution.path}}}\`) as a modifier, but ${resolution.head} was not in scope. Try adding \`this\` to the beginning of the path`, m.loc);
        }
        let callParts = this.expr.callParts(m, resolution.resolution);
        return this.ctx.builder.modifier(callParts, this.ctx.loc(m.loc));
      }
      mustacheAttr(mustache) {
        let sexp = this.ctx.builder.sexp(this.expr.callParts(mustache, (0, _looseResolution.AttrValueSyntaxContext)(mustache)), this.ctx.loc(mustache.loc));
        if (sexp.args.isEmpty()) {
          return sexp.callee;
        } else {
          return sexp;
        }
      }
      attrPart(part) {
        switch (part.type) {
          case "MustacheStatement":
            return {
              expr: this.mustacheAttr(part),
              trusting: !part.escaped
            };
          case "TextNode":
            return {
              expr: this.ctx.builder.literal(part.chars, this.ctx.loc(part.loc)),
              trusting: true
            };
        }
      }
      attrValue(part) {
        switch (part.type) {
          case "ConcatStatement": {
            let parts = part.parts.map((p) => this.attrPart(p).expr);
            return {
              expr: this.ctx.builder.interpolate(parts, this.ctx.loc(part.loc)),
              trusting: false
            };
          }
          default:
            return this.attrPart(part);
        }
      }
      attr(m) {
        if (m.name === "...attributes") {
          return this.ctx.builder.splatAttr(this.ctx.table.allocateBlock("attrs"), this.ctx.loc(m.loc));
        }
        let offsets = this.ctx.loc(m.loc);
        let nameSlice = offsets.sliceStartChars({
          chars: m.name.length
        }).toSlice(m.name);
        let value = this.attrValue(m.value);
        return this.ctx.builder.attr({
          name: nameSlice,
          value: value.expr,
          trusting: value.trusting
        }, offsets);
      }
      maybeDeprecatedCall(arg, part) {
        if (this.ctx.strict) {
          return null;
        }
        if (part.type !== "MustacheStatement") {
          return null;
        }
        let {
          path
        } = part;
        if (path.type !== "PathExpression") {
          return null;
        }
        if (path.head.type !== "VarHead") {
          return null;
        }
        let {
          name
        } = path.head;
        if (name === "has-block" || name === "has-block-params") {
          return null;
        }
        if (this.ctx.hasBinding(name)) {
          return null;
        }
        if (path.tail.length !== 0) {
          return null;
        }
        if (part.params.length !== 0 || part.hash.pairs.length !== 0) {
          return null;
        }
        let context = ASTv2.LooseModeResolution.attr();
        let callee = this.ctx.builder.freeVar({
          name,
          context,
          symbol: this.ctx.table.allocateFree(name, context),
          loc: path.loc
        });
        return {
          expr: this.ctx.builder.deprecatedCall(arg, callee, part.loc),
          trusting: false
        };
      }
      arg(arg) {
        let offsets = this.ctx.loc(arg.loc);
        let nameSlice = offsets.sliceStartChars({
          chars: arg.name.length
        }).toSlice(arg.name);
        let value = this.maybeDeprecatedCall(nameSlice, arg.value) || this.attrValue(arg.value);
        return this.ctx.builder.arg({
          name: nameSlice,
          value: value.expr,
          trusting: value.trusting
        }, offsets);
      }
      classifyTag(variable, tail, loc) {
        let uppercase = (0, _utils.isUpperCase)(variable);
        let inScope = variable[0] === "@" || variable === "this" || this.ctx.hasBinding(variable);
        if (this.ctx.strict && !inScope) {
          if (uppercase) {
            throw (0, _syntaxError.generateSyntaxError)(`Attempted to invoke a component that was not in scope in a strict mode template, \`<${variable}>\`. If you wanted to create an element with that name, convert it to lowercase - \`<${variable.toLowerCase()}>\``, loc);
          }
          return "ElementHead";
        }
        let isComponent = inScope || uppercase;
        let variableLoc = loc.sliceStartChars({
          skipStart: 1,
          chars: variable.length
        });
        let tailLength = tail.reduce((accum, part) => accum + 1 + part.length, 0);
        let pathEnd = variableLoc.getEnd().move(tailLength);
        let pathLoc = variableLoc.withEnd(pathEnd);
        if (isComponent) {
          let path = _parserBuilders.default.path({
            head: _parserBuilders.default.head(variable, variableLoc),
            tail,
            loc: pathLoc
          });
          let resolution = this.ctx.resolutionFor(path, _looseResolution.ComponentSyntaxContext);
          if (resolution.resolution === "error") {
            throw (0, _syntaxError.generateSyntaxError)(`You attempted to invoke a path (\`<${resolution.path}>\`) but ${resolution.head} was not in scope`, loc);
          }
          return new ExpressionNormalizer(this.ctx).normalize(path, resolution.resolution);
        }
        if (tail.length > 0) {
          throw (0, _syntaxError.generateSyntaxError)(`You used ${variable}.${tail.join(".")} as a tag name, but ${variable} is not in scope`, loc);
        }
        return "ElementHead";
      }
      get expr() {
        return new ExpressionNormalizer(this.ctx);
      }
    };
    var Children = class {
      constructor(loc, children, block) {
        this.loc = loc;
        this.children = children;
        this.block = block;
        this.namedBlocks = children.filter((c) => c instanceof ASTv2.NamedBlock);
        this.hasSemanticContent = Boolean(children.filter((c) => {
          if (c instanceof ASTv2.NamedBlock) {
            return false;
          }
          switch (c.type) {
            case "GlimmerComment":
            case "HtmlComment":
              return false;
            case "HtmlText":
              return !/^\s*$/.exec(c.chars);
            default:
              return true;
          }
        }).length);
        this.nonBlockChildren = children.filter((c) => !(c instanceof ASTv2.NamedBlock));
      }
    };
    var TemplateChildren = class extends Children {
      assertTemplate(table) {
        if ((0, _util.isPresent)(this.namedBlocks)) {
          throw (0, _syntaxError.generateSyntaxError)(`Unexpected named block at the top-level of a template`, this.loc);
        }
        return this.block.builder.template(table, this.nonBlockChildren, this.block.loc(this.loc));
      }
    };
    var BlockChildren = class extends Children {
      assertBlock(table) {
        if ((0, _util.isPresent)(this.namedBlocks)) {
          throw (0, _syntaxError.generateSyntaxError)(`Unexpected named block nested in a normal block`, this.loc);
        }
        return this.block.builder.block(table, this.nonBlockChildren, this.loc);
      }
    };
    var ElementChildren = class extends Children {
      constructor(el, loc, children, block) {
        super(loc, children, block);
        this.el = el;
      }
      assertNamedBlock(name, table) {
        if (this.el.base.selfClosing) {
          throw (0, _syntaxError.generateSyntaxError)(`<:${name.chars}/> is not a valid named block: named blocks cannot be self-closing`, this.loc);
        }
        if ((0, _util.isPresent)(this.namedBlocks)) {
          throw (0, _syntaxError.generateSyntaxError)(`Unexpected named block inside <:${name.chars}> named block: named blocks cannot contain nested named blocks`, this.loc);
        }
        if (!(0, _utils.isLowerCase)(name.chars)) {
          throw (0, _syntaxError.generateSyntaxError)(`<:${name.chars}> is not a valid named block, and named blocks must begin with a lowercase letter`, this.loc);
        }
        if (this.el.base.attrs.length > 0 || this.el.base.componentArgs.length > 0 || this.el.base.modifiers.length > 0) {
          throw (0, _syntaxError.generateSyntaxError)(`named block <:${name.chars}> cannot have attributes, arguments, or modifiers`, this.loc);
        }
        let offsets = _spanList.SpanList.range(this.nonBlockChildren, this.loc);
        return this.block.builder.namedBlock(name, this.block.builder.block(table, this.nonBlockChildren, offsets), this.loc);
      }
      assertElement(name, hasBlockParams) {
        if (hasBlockParams) {
          throw (0, _syntaxError.generateSyntaxError)(`Unexpected block params in <${name}>: simple elements cannot have block params`, this.loc);
        }
        if ((0, _util.isPresent)(this.namedBlocks)) {
          let names = this.namedBlocks.map((b) => b.name);
          if (names.length === 1) {
            throw (0, _syntaxError.generateSyntaxError)(`Unexpected named block <:foo> inside <${name.chars}> HTML element`, this.loc);
          } else {
            let printedNames = names.map((n) => `<:${n.chars}>`).join(", ");
            throw (0, _syntaxError.generateSyntaxError)(`Unexpected named blocks inside <${name.chars}> HTML element (${printedNames})`, this.loc);
          }
        }
        return this.el.simple(name, this.nonBlockChildren, this.loc);
      }
      assertComponent(name, table, hasBlockParams) {
        if ((0, _util.isPresent)(this.namedBlocks) && this.hasSemanticContent) {
          throw (0, _syntaxError.generateSyntaxError)(`Unexpected content inside <${name}> component invocation: when using named blocks, the tag cannot contain other content`, this.loc);
        }
        if ((0, _util.isPresent)(this.namedBlocks)) {
          if (hasBlockParams) {
            throw (0, _syntaxError.generateSyntaxError)(`Unexpected block params list on <${name}> component invocation: when passing named blocks, the invocation tag cannot take block params`, this.loc);
          }
          let seenNames = /* @__PURE__ */ new Set();
          for (let block of this.namedBlocks) {
            let name2 = block.name.chars;
            if (seenNames.has(name2)) {
              throw (0, _syntaxError.generateSyntaxError)(`Component had two named blocks with the same name, \`<:${name2}>\`. Only one block with a given name may be passed`, this.loc);
            }
            if (name2 === "inverse" && seenNames.has("else") || name2 === "else" && seenNames.has("inverse")) {
              throw (0, _syntaxError.generateSyntaxError)(`Component has both <:else> and <:inverse> block. <:inverse> is an alias for <:else>`, this.loc);
            }
            seenNames.add(name2);
          }
          return this.namedBlocks;
        } else {
          return [this.block.builder.namedBlock(_slice.SourceSlice.synthetic("default"), this.block.builder.block(table, this.nonBlockChildren, this.loc), this.loc)];
        }
      }
    };
    function printPath(node) {
      if (node.type !== "PathExpression" && node.path.type === "PathExpression") {
        return printPath(node.path);
      } else {
        return new _printer.default({
          entityEncoding: "raw"
        }).print(node);
      }
    }
    function printHead(node) {
      if (node.type === "PathExpression") {
        switch (node.head.type) {
          case "AtHead":
          case "VarHead":
            return node.head.name;
          case "ThisHead":
            return "this";
        }
      } else if (node.path.type === "PathExpression") {
        return printHead(node.path);
      } else {
        return new _printer.default({
          entityEncoding: "raw"
        }).print(node);
      }
    }
  }
});
var require_keywords = __commonJS({
  "node_modules/@glimmer/syntax/dist/commonjs/es2017/lib/keywords.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.isKeyword = isKeyword;
    exports.KEYWORDS_TYPES = void 0;
    function isKeyword(word) {
      return word in KEYWORDS_TYPES;
    }
    var KEYWORDS_TYPES = {
      component: ["Call", "Append", "Block"],
      debugger: ["Append"],
      "each-in": ["Block"],
      each: ["Block"],
      "has-block-params": ["Call", "Append"],
      "has-block": ["Call", "Append"],
      helper: ["Call", "Append"],
      if: ["Call", "Append", "Block"],
      "in-element": ["Block"],
      let: ["Block"],
      "link-to": ["Append", "Block"],
      log: ["Call", "Append"],
      modifier: ["Call"],
      mount: ["Append"],
      mut: ["Call", "Append"],
      outlet: ["Append"],
      "query-params": ["Call"],
      readonly: ["Call", "Append"],
      unbound: ["Call", "Append"],
      unless: ["Call", "Append", "Block"],
      with: ["Block"],
      yield: ["Append"]
    };
    exports.KEYWORDS_TYPES = KEYWORDS_TYPES;
  }
});
var require_get_template_locals = __commonJS({
  "node_modules/@glimmer/syntax/dist/commonjs/es2017/lib/get-template-locals.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getTemplateLocals = getTemplateLocals;
    var _keywords = require_keywords();
    var _tokenizerEventHandlers = require_tokenizer_event_handlers();
    var _traverse = _interopRequireDefault(require_traverse());
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function tokensFromType(node, scopedTokens, options) {
      if (node.type === "PathExpression") {
        if (node.head.type === "AtHead" || node.head.type === "ThisHead") {
          return;
        }
        const possbleToken = node.head.name;
        if (scopedTokens.indexOf(possbleToken) === -1) {
          return possbleToken;
        }
      } else if (node.type === "ElementNode") {
        const {
          tag
        } = node;
        const char = tag.charAt(0);
        if (char === ":" || char === "@") {
          return;
        }
        if (!options.includeHtmlElements && tag.indexOf(".") === -1 && tag.toLowerCase() === tag) {
          return;
        }
        if (tag.substr(0, 5) === "this.") {
          return;
        }
        if (scopedTokens.indexOf(tag) !== -1) {
          return;
        }
        return tag;
      }
    }
    function addTokens(tokensSet, node, scopedTokens, options) {
      const maybeTokens = tokensFromType(node, scopedTokens, options);
      (Array.isArray(maybeTokens) ? maybeTokens : [maybeTokens]).forEach((maybeToken) => {
        if (maybeToken !== void 0 && maybeToken[0] !== "@") {
          tokensSet.add(maybeToken.split(".")[0]);
        }
      });
    }
    function getTemplateLocals(html) {
      let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
        includeHtmlElements: false,
        includeKeywords: false
      };
      const ast = (0, _tokenizerEventHandlers.preprocess)(html);
      const tokensSet = /* @__PURE__ */ new Set();
      const scopedTokens = [];
      (0, _traverse.default)(ast, {
        Block: {
          enter(_ref34) {
            let {
              blockParams
            } = _ref34;
            blockParams.forEach((param) => {
              scopedTokens.push(param);
            });
          },
          exit(_ref35) {
            let {
              blockParams
            } = _ref35;
            blockParams.forEach(() => {
              scopedTokens.pop();
            });
          }
        },
        ElementNode: {
          enter(node) {
            node.blockParams.forEach((param) => {
              scopedTokens.push(param);
            });
            addTokens(tokensSet, node, scopedTokens, options);
          },
          exit(_ref36) {
            let {
              blockParams
            } = _ref36;
            blockParams.forEach(() => {
              scopedTokens.pop();
            });
          }
        },
        PathExpression(node) {
          addTokens(tokensSet, node, scopedTokens, options);
        }
      });
      let tokens = [];
      tokensSet.forEach((s) => tokens.push(s));
      if (!(options === null || options === void 0 ? void 0 : options.includeKeywords)) {
        tokens = tokens.filter((token) => !(0, _keywords.isKeyword)(token));
      }
      return tokens;
    }
  }
});
var require_es20172 = __commonJS({
  "node_modules/@glimmer/syntax/dist/commonjs/es2017/index.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    Object.defineProperty(exports, "Source", {
      enumerable: true,
      get: function() {
        return _source.Source;
      }
    });
    Object.defineProperty(exports, "builders", {
      enumerable: true,
      get: function() {
        return _publicBuilders.default;
      }
    });
    Object.defineProperty(exports, "normalize", {
      enumerable: true,
      get: function() {
        return _normalize.normalize;
      }
    });
    Object.defineProperty(exports, "SymbolTable", {
      enumerable: true,
      get: function() {
        return _symbolTable.SymbolTable;
      }
    });
    Object.defineProperty(exports, "BlockSymbolTable", {
      enumerable: true,
      get: function() {
        return _symbolTable.BlockSymbolTable;
      }
    });
    Object.defineProperty(exports, "ProgramSymbolTable", {
      enumerable: true,
      get: function() {
        return _symbolTable.ProgramSymbolTable;
      }
    });
    Object.defineProperty(exports, "generateSyntaxError", {
      enumerable: true,
      get: function() {
        return _syntaxError.generateSyntaxError;
      }
    });
    Object.defineProperty(exports, "preprocess", {
      enumerable: true,
      get: function() {
        return _tokenizerEventHandlers.preprocess;
      }
    });
    Object.defineProperty(exports, "print", {
      enumerable: true,
      get: function() {
        return _print.default;
      }
    });
    Object.defineProperty(exports, "sortByLoc", {
      enumerable: true,
      get: function() {
        return _util.sortByLoc;
      }
    });
    Object.defineProperty(exports, "Walker", {
      enumerable: true,
      get: function() {
        return _walker.default;
      }
    });
    Object.defineProperty(exports, "Path", {
      enumerable: true,
      get: function() {
        return _walker.default;
      }
    });
    Object.defineProperty(exports, "traverse", {
      enumerable: true,
      get: function() {
        return _traverse.default;
      }
    });
    Object.defineProperty(exports, "cannotRemoveNode", {
      enumerable: true,
      get: function() {
        return _errors.cannotRemoveNode;
      }
    });
    Object.defineProperty(exports, "cannotReplaceNode", {
      enumerable: true,
      get: function() {
        return _errors.cannotReplaceNode;
      }
    });
    Object.defineProperty(exports, "WalkerPath", {
      enumerable: true,
      get: function() {
        return _path.default;
      }
    });
    Object.defineProperty(exports, "isKeyword", {
      enumerable: true,
      get: function() {
        return _keywords.isKeyword;
      }
    });
    Object.defineProperty(exports, "KEYWORDS_TYPES", {
      enumerable: true,
      get: function() {
        return _keywords.KEYWORDS_TYPES;
      }
    });
    Object.defineProperty(exports, "getTemplateLocals", {
      enumerable: true,
      get: function() {
        return _getTemplateLocals.getTemplateLocals;
      }
    });
    Object.defineProperty(exports, "SourceSlice", {
      enumerable: true,
      get: function() {
        return _slice.SourceSlice;
      }
    });
    Object.defineProperty(exports, "SourceSpan", {
      enumerable: true,
      get: function() {
        return _span.SourceSpan;
      }
    });
    Object.defineProperty(exports, "SpanList", {
      enumerable: true,
      get: function() {
        return _spanList.SpanList;
      }
    });
    Object.defineProperty(exports, "maybeLoc", {
      enumerable: true,
      get: function() {
        return _spanList.maybeLoc;
      }
    });
    Object.defineProperty(exports, "loc", {
      enumerable: true,
      get: function() {
        return _spanList.loc;
      }
    });
    Object.defineProperty(exports, "hasSpan", {
      enumerable: true,
      get: function() {
        return _spanList.hasSpan;
      }
    });
    Object.defineProperty(exports, "node", {
      enumerable: true,
      get: function() {
        return _node.node;
      }
    });
    exports.ASTv2 = exports.AST = exports.ASTv1 = void 0;
    var _source = require_source();
    var _publicBuilders = _interopRequireDefault(require_public_builders());
    var ASTv1_1 = _interopRequireWildcard(require_api());
    exports.ASTv1 = ASTv1_1;
    exports.AST = ASTv1_1;
    var ASTv2_1 = _interopRequireWildcard(require_api2());
    exports.ASTv2 = ASTv2_1;
    var _normalize = require_normalize();
    var _symbolTable = require_symbol_table();
    var _syntaxError = require_syntax_error();
    var _tokenizerEventHandlers = require_tokenizer_event_handlers();
    var _print = _interopRequireDefault(require_print());
    var _util = require_util();
    var _walker = _interopRequireDefault(require_walker());
    var _traverse = _interopRequireDefault(require_traverse());
    var _errors = require_errors();
    var _path = _interopRequireDefault(require_path());
    var _keywords = require_keywords();
    var _getTemplateLocals = require_get_template_locals();
    var _slice = require_slice();
    var _span = require_span2();
    var _spanList = require_span_list();
    var _node = require_node();
    function _getRequireWildcardCache() {
      if (typeof WeakMap !== "function")
        return null;
      var cache = /* @__PURE__ */ new WeakMap();
      _getRequireWildcardCache = function() {
        return cache;
      };
      return cache;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      }
      if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
          default: obj
        };
      }
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) {
        return cache.get(obj);
      }
      var newObj = {};
      var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
          if (desc && (desc.get || desc.set)) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
      newObj.default = obj;
      if (cache) {
        cache.set(obj, newObj);
      }
      return newObj;
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
  }
});
var require_parser_glimmer = __commonJS({
  "src/language-handlebars/parser-glimmer.js"(exports, module) {
    init_define_process();
    var {
      LinesAndColumns
    } = require_build();
    var createError = require_parser_create_error();
    var {
      locStart,
      locEnd
    } = require_loc();
    function addBackslash() {
      return {
        name: "addBackslash",
        visitor: {
          All(node) {
            var _node$children;
            const childrenOrBody = (_node$children = node.children) !== null && _node$children !== void 0 ? _node$children : node.body;
            if (childrenOrBody) {
              for (let i = 0; i < childrenOrBody.length - 1; i++) {
                if (childrenOrBody[i].type === "TextNode" && childrenOrBody[i + 1].type === "MustacheStatement") {
                  childrenOrBody[i].chars = childrenOrBody[i].chars.replace(/\\$/, "\\\\");
                }
              }
            }
          }
        }
      };
    }
    function addOffset(text) {
      const lines = new LinesAndColumns(text);
      const calculateOffset = (_ref37) => {
        let {
          line,
          column
        } = _ref37;
        return lines.indexForLocation({
          line: line - 1,
          column
        });
      };
      return () => ({
        name: "addOffset",
        visitor: {
          All(node) {
            const {
              start,
              end
            } = node.loc;
            start.offset = calculateOffset(start);
            end.offset = calculateOffset(end);
          }
        }
      });
    }
    function parse(text) {
      const {
        preprocess: glimmer
      } = require_es20172();
      let ast;
      try {
        ast = glimmer(text, {
          mode: "codemod",
          plugins: {
            ast: [addBackslash, addOffset(text)]
          }
        });
      } catch (error) {
        const location = getErrorLocation(error);
        if (location) {
          throw createError(error.message, location);
        }
        throw error;
      }
      return ast;
    }
    function getErrorLocation(error) {
      const {
        location,
        hash
      } = error;
      if (location) {
        const {
          start,
          end
        } = location;
        if (typeof end.line !== "number") {
          return {
            start
          };
        }
        return location;
      }
      if (hash) {
        const {
          loc: {
            last_line,
            last_column
          }
        } = hash;
        return {
          start: {
            line: last_line,
            column: last_column + 1
          }
        };
      }
    }
    module.exports = {
      parsers: {
        glimmer: {
          parse,
          astFormat: "glimmer",
          locStart,
          locEnd
        }
      }
    };
  }
});
var parser_glimmer_js_esm_default = require_parser_glimmer();
export {
  parser_glimmer_js_esm_default as default
};
