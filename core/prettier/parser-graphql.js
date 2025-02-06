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
    root.prettierPlugins.graphql = factory();
  }
})(function() {
  "use strict";
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // dist/_parser-graphql.js.umd.js
  var require_parser_graphql_js_umd = __commonJS({
    "dist/_parser-graphql.js.umd.js"(exports, module) {
      var __getOwnPropNames2 = Object.getOwnPropertyNames;
      var __esm = (fn, res) => function __init() {
        return fn && (res = (0, fn[__getOwnPropNames2(fn)[0]])(fn = 0)), res;
      };
      var __commonJS2 = (cb, mod) => function __require() {
        return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = {
          exports: {}
        }).exports, mod), mod.exports;
      };
      var init_define_process = __esm({
        "<define:process>"() {
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
      var require_try_combinations = __commonJS2({
        "src/utils/try-combinations.js"(exports2, module2) {
          "use strict";
          init_define_process();
          function tryCombinations2() {
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
          module2.exports = tryCombinations2;
        }
      });
      var require_pragma = __commonJS2({
        "src/language-graphql/pragma.js"(exports2, module2) {
          "use strict";
          init_define_process();
          function hasPragma2(text) {
            return /^\s*#[^\S\n]*@(?:format|prettier)\s*(?:\n|$)/.test(text);
          }
          function insertPragma(text) {
            return "# @format\n\n" + text;
          }
          module2.exports = {
            hasPragma: hasPragma2,
            insertPragma
          };
        }
      });
      var require_loc = __commonJS2({
        "src/language-graphql/loc.js"(exports2, module2) {
          "use strict";
          init_define_process();
          function locStart2(node) {
            if (typeof node.start === "number") {
              return node.start;
            }
            return node.loc && node.loc.start;
          }
          function locEnd2(node) {
            if (typeof node.end === "number") {
              return node.end;
            }
            return node.loc && node.loc.end;
          }
          module2.exports = {
            locStart: locStart2,
            locEnd: locEnd2
          };
        }
      });
      var require_isObjectLike = __commonJS2({
        "node_modules/graphql/jsutils/isObjectLike.js"(exports2) {
          "use strict";
          init_define_process();
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2.default = isObjectLike;
          function _typeof2(obj) {
            "@babel/helpers - typeof";
            if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
              _typeof2 = function _typeof22(obj2) {
                return typeof obj2;
              };
            } else {
              _typeof2 = function _typeof22(obj2) {
                return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
              };
            }
            return _typeof2(obj);
          }
          function isObjectLike(value) {
            return _typeof2(value) == "object" && value !== null;
          }
        }
      });
      var require_symbols = __commonJS2({
        "node_modules/graphql/polyfills/symbols.js"(exports2) {
          "use strict";
          init_define_process();
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2.SYMBOL_TO_STRING_TAG = exports2.SYMBOL_ASYNC_ITERATOR = exports2.SYMBOL_ITERATOR = void 0;
          var SYMBOL_ITERATOR = typeof Symbol === "function" && Symbol.iterator != null ? Symbol.iterator : "@@iterator";
          exports2.SYMBOL_ITERATOR = SYMBOL_ITERATOR;
          var SYMBOL_ASYNC_ITERATOR = typeof Symbol === "function" && Symbol.asyncIterator != null ? Symbol.asyncIterator : "@@asyncIterator";
          exports2.SYMBOL_ASYNC_ITERATOR = SYMBOL_ASYNC_ITERATOR;
          var SYMBOL_TO_STRING_TAG = typeof Symbol === "function" && Symbol.toStringTag != null ? Symbol.toStringTag : "@@toStringTag";
          exports2.SYMBOL_TO_STRING_TAG = SYMBOL_TO_STRING_TAG;
        }
      });
      var require_location = __commonJS2({
        "node_modules/graphql/language/location.js"(exports2) {
          "use strict";
          init_define_process();
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2.getLocation = getLocation;
          function getLocation(source, position) {
            var lineRegexp = /\r\n|[\n\r]/g;
            var line = 1;
            var column = position + 1;
            var match;
            while ((match = lineRegexp.exec(source.body)) && match.index < position) {
              line += 1;
              column = position + 1 - (match.index + match[0].length);
            }
            return {
              line,
              column
            };
          }
        }
      });
      var require_printLocation = __commonJS2({
        "node_modules/graphql/language/printLocation.js"(exports2) {
          "use strict";
          init_define_process();
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2.printLocation = printLocation;
          exports2.printSourceLocation = printSourceLocation;
          var _location = require_location();
          function printLocation(location) {
            return printSourceLocation(location.source, (0, _location.getLocation)(location.source, location.start));
          }
          function printSourceLocation(source, sourceLocation) {
            var firstLineColumnOffset = source.locationOffset.column - 1;
            var body = whitespace(firstLineColumnOffset) + source.body;
            var lineIndex = sourceLocation.line - 1;
            var lineOffset = source.locationOffset.line - 1;
            var lineNum = sourceLocation.line + lineOffset;
            var columnOffset = sourceLocation.line === 1 ? firstLineColumnOffset : 0;
            var columnNum = sourceLocation.column + columnOffset;
            var locationStr = "".concat(source.name, ":").concat(lineNum, ":").concat(columnNum, "\n");
            var lines = body.split(/\r\n|[\n\r]/g);
            var locationLine = lines[lineIndex];
            if (locationLine.length > 120) {
              var subLineIndex = Math.floor(columnNum / 80);
              var subLineColumnNum = columnNum % 80;
              var subLines = [];
              for (var i = 0; i < locationLine.length; i += 80) {
                subLines.push(locationLine.slice(i, i + 80));
              }
              return locationStr + printPrefixedLines([["".concat(lineNum), subLines[0]]].concat(subLines.slice(1, subLineIndex + 1).map(function(subLine) {
                return ["", subLine];
              }), [[" ", whitespace(subLineColumnNum - 1) + "^"], ["", subLines[subLineIndex + 1]]]));
            }
            return locationStr + printPrefixedLines([["".concat(lineNum - 1), lines[lineIndex - 1]], ["".concat(lineNum), locationLine], ["", whitespace(columnNum - 1) + "^"], ["".concat(lineNum + 1), lines[lineIndex + 1]]]);
          }
          function printPrefixedLines(lines) {
            var existingLines = lines.filter(function(_ref) {
              var _ = _ref[0], line = _ref[1];
              return line !== void 0;
            });
            var padLen = Math.max.apply(Math, existingLines.map(function(_ref2) {
              var prefix = _ref2[0];
              return prefix.length;
            }));
            return existingLines.map(function(_ref3) {
              var prefix = _ref3[0], line = _ref3[1];
              return leftPad(padLen, prefix) + (line ? " | " + line : " |");
            }).join("\n");
          }
          function whitespace(len) {
            return Array(len + 1).join(" ");
          }
          function leftPad(len, str) {
            return whitespace(len - str.length) + str;
          }
        }
      });
      var require_GraphQLError = __commonJS2({
        "node_modules/graphql/error/GraphQLError.js"(exports2) {
          "use strict";
          init_define_process();
          function _typeof2(obj) {
            "@babel/helpers - typeof";
            if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
              _typeof2 = function _typeof22(obj2) {
                return typeof obj2;
              };
            } else {
              _typeof2 = function _typeof22(obj2) {
                return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
              };
            }
            return _typeof2(obj);
          }
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2.printError = printError;
          exports2.GraphQLError = void 0;
          var _isObjectLike = _interopRequireDefault(require_isObjectLike());
          var _symbols = require_symbols();
          var _location = require_location();
          var _printLocation = require_printLocation();
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
          function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
              throw new TypeError("Super expression must either be null or a function");
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
              constructor: {
                value: subClass,
                writable: true,
                configurable: true
              }
            });
            if (superClass)
              _setPrototypeOf(subClass, superClass);
          }
          function _createSuper(Derived) {
            var hasNativeReflectConstruct = _isNativeReflectConstruct();
            return function _createSuperInternal() {
              var Super = _getPrototypeOf(Derived), result;
              if (hasNativeReflectConstruct) {
                var NewTarget = _getPrototypeOf(this).constructor;
                result = Reflect.construct(Super, arguments, NewTarget);
              } else {
                result = Super.apply(this, arguments);
              }
              return _possibleConstructorReturn(this, result);
            };
          }
          function _possibleConstructorReturn(self, call) {
            if (call && (_typeof2(call) === "object" || typeof call === "function")) {
              return call;
            }
            return _assertThisInitialized(self);
          }
          function _assertThisInitialized(self) {
            if (self === void 0) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return self;
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
          var GraphQLError = /* @__PURE__ */ function(_Error) {
            _inherits(GraphQLError2, _Error);
            var _super = _createSuper(GraphQLError2);
            function GraphQLError2(message, nodes, source, positions, path, originalError, extensions) {
              var _locations2, _source2, _positions2, _extensions2;
              var _this;
              _classCallCheck(this, GraphQLError2);
              _this = _super.call(this, message);
              var _nodes = Array.isArray(nodes) ? nodes.length !== 0 ? nodes : void 0 : nodes ? [nodes] : void 0;
              var _source = source;
              if (!_source && _nodes) {
                var _nodes$0$loc;
                _source = (_nodes$0$loc = _nodes[0].loc) === null || _nodes$0$loc === void 0 ? void 0 : _nodes$0$loc.source;
              }
              var _positions = positions;
              if (!_positions && _nodes) {
                _positions = _nodes.reduce(function(list, node) {
                  if (node.loc) {
                    list.push(node.loc.start);
                  }
                  return list;
                }, []);
              }
              if (_positions && _positions.length === 0) {
                _positions = void 0;
              }
              var _locations;
              if (positions && source) {
                _locations = positions.map(function(pos) {
                  return (0, _location.getLocation)(source, pos);
                });
              } else if (_nodes) {
                _locations = _nodes.reduce(function(list, node) {
                  if (node.loc) {
                    list.push((0, _location.getLocation)(node.loc.source, node.loc.start));
                  }
                  return list;
                }, []);
              }
              var _extensions = extensions;
              if (_extensions == null && originalError != null) {
                var originalExtensions = originalError.extensions;
                if ((0, _isObjectLike.default)(originalExtensions)) {
                  _extensions = originalExtensions;
                }
              }
              Object.defineProperties(_assertThisInitialized(_this), {
                name: {
                  value: "GraphQLError"
                },
                message: {
                  value: message,
                  enumerable: true,
                  writable: true
                },
                locations: {
                  value: (_locations2 = _locations) !== null && _locations2 !== void 0 ? _locations2 : void 0,
                  enumerable: _locations != null
                },
                path: {
                  value: path !== null && path !== void 0 ? path : void 0,
                  enumerable: path != null
                },
                nodes: {
                  value: _nodes !== null && _nodes !== void 0 ? _nodes : void 0
                },
                source: {
                  value: (_source2 = _source) !== null && _source2 !== void 0 ? _source2 : void 0
                },
                positions: {
                  value: (_positions2 = _positions) !== null && _positions2 !== void 0 ? _positions2 : void 0
                },
                originalError: {
                  value: originalError
                },
                extensions: {
                  value: (_extensions2 = _extensions) !== null && _extensions2 !== void 0 ? _extensions2 : void 0,
                  enumerable: _extensions != null
                }
              });
              if (originalError !== null && originalError !== void 0 && originalError.stack) {
                Object.defineProperty(_assertThisInitialized(_this), "stack", {
                  value: originalError.stack,
                  writable: true,
                  configurable: true
                });
                return _possibleConstructorReturn(_this);
              }
              if (Error.captureStackTrace) {
                Error.captureStackTrace(_assertThisInitialized(_this), GraphQLError2);
              } else {
                Object.defineProperty(_assertThisInitialized(_this), "stack", {
                  value: Error().stack,
                  writable: true,
                  configurable: true
                });
              }
              return _this;
            }
            _createClass(GraphQLError2, [{
              key: "toString",
              value: function toString() {
                return printError(this);
              }
            }, {
              key: _symbols.SYMBOL_TO_STRING_TAG,
              get: function get() {
                return "Object";
              }
            }]);
            return GraphQLError2;
          }(/* @__PURE__ */ _wrapNativeSuper(Error));
          exports2.GraphQLError = GraphQLError;
          function printError(error) {
            var output = error.message;
            if (error.nodes) {
              for (var _i2 = 0, _error$nodes2 = error.nodes; _i2 < _error$nodes2.length; _i2++) {
                var node = _error$nodes2[_i2];
                if (node.loc) {
                  output += "\n\n" + (0, _printLocation.printLocation)(node.loc);
                }
              }
            } else if (error.source && error.locations) {
              for (var _i4 = 0, _error$locations2 = error.locations; _i4 < _error$locations2.length; _i4++) {
                var location = _error$locations2[_i4];
                output += "\n\n" + (0, _printLocation.printSourceLocation)(error.source, location);
              }
            }
            return output;
          }
        }
      });
      var require_syntaxError = __commonJS2({
        "node_modules/graphql/error/syntaxError.js"(exports2) {
          "use strict";
          init_define_process();
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2.syntaxError = syntaxError;
          var _GraphQLError = require_GraphQLError();
          function syntaxError(source, position, description) {
            return new _GraphQLError.GraphQLError("Syntax Error: ".concat(description), void 0, source, [position]);
          }
        }
      });
      var require_kinds = __commonJS2({
        "node_modules/graphql/language/kinds.js"(exports2) {
          "use strict";
          init_define_process();
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2.Kind = void 0;
          var Kind = Object.freeze({
            NAME: "Name",
            DOCUMENT: "Document",
            OPERATION_DEFINITION: "OperationDefinition",
            VARIABLE_DEFINITION: "VariableDefinition",
            SELECTION_SET: "SelectionSet",
            FIELD: "Field",
            ARGUMENT: "Argument",
            FRAGMENT_SPREAD: "FragmentSpread",
            INLINE_FRAGMENT: "InlineFragment",
            FRAGMENT_DEFINITION: "FragmentDefinition",
            VARIABLE: "Variable",
            INT: "IntValue",
            FLOAT: "FloatValue",
            STRING: "StringValue",
            BOOLEAN: "BooleanValue",
            NULL: "NullValue",
            ENUM: "EnumValue",
            LIST: "ListValue",
            OBJECT: "ObjectValue",
            OBJECT_FIELD: "ObjectField",
            DIRECTIVE: "Directive",
            NAMED_TYPE: "NamedType",
            LIST_TYPE: "ListType",
            NON_NULL_TYPE: "NonNullType",
            SCHEMA_DEFINITION: "SchemaDefinition",
            OPERATION_TYPE_DEFINITION: "OperationTypeDefinition",
            SCALAR_TYPE_DEFINITION: "ScalarTypeDefinition",
            OBJECT_TYPE_DEFINITION: "ObjectTypeDefinition",
            FIELD_DEFINITION: "FieldDefinition",
            INPUT_VALUE_DEFINITION: "InputValueDefinition",
            INTERFACE_TYPE_DEFINITION: "InterfaceTypeDefinition",
            UNION_TYPE_DEFINITION: "UnionTypeDefinition",
            ENUM_TYPE_DEFINITION: "EnumTypeDefinition",
            ENUM_VALUE_DEFINITION: "EnumValueDefinition",
            INPUT_OBJECT_TYPE_DEFINITION: "InputObjectTypeDefinition",
            DIRECTIVE_DEFINITION: "DirectiveDefinition",
            SCHEMA_EXTENSION: "SchemaExtension",
            SCALAR_TYPE_EXTENSION: "ScalarTypeExtension",
            OBJECT_TYPE_EXTENSION: "ObjectTypeExtension",
            INTERFACE_TYPE_EXTENSION: "InterfaceTypeExtension",
            UNION_TYPE_EXTENSION: "UnionTypeExtension",
            ENUM_TYPE_EXTENSION: "EnumTypeExtension",
            INPUT_OBJECT_TYPE_EXTENSION: "InputObjectTypeExtension"
          });
          exports2.Kind = Kind;
        }
      });
      var require_invariant = __commonJS2({
        "node_modules/graphql/jsutils/invariant.js"(exports2) {
          "use strict";
          init_define_process();
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2.default = invariant;
          function invariant(condition, message) {
            var booleanCondition = Boolean(condition);
            if (!booleanCondition) {
              throw new Error(message != null ? message : "Unexpected invariant triggered.");
            }
          }
        }
      });
      var require_nodejsCustomInspectSymbol = __commonJS2({
        "node_modules/graphql/jsutils/nodejsCustomInspectSymbol.js"(exports2) {
          "use strict";
          init_define_process();
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2.default = void 0;
          var nodejsCustomInspectSymbol = typeof Symbol === "function" && typeof Symbol.for === "function" ? Symbol.for("nodejs.util.inspect.custom") : void 0;
          var _default = nodejsCustomInspectSymbol;
          exports2.default = _default;
        }
      });
      var require_defineInspect = __commonJS2({
        "node_modules/graphql/jsutils/defineInspect.js"(exports2) {
          "use strict";
          init_define_process();
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2.default = defineInspect;
          var _invariant = _interopRequireDefault(require_invariant());
          var _nodejsCustomInspectSymbol = _interopRequireDefault(require_nodejsCustomInspectSymbol());
          function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
              default: obj
            };
          }
          function defineInspect(classObject) {
            var fn = classObject.prototype.toJSON;
            typeof fn === "function" || (0, _invariant.default)(0);
            classObject.prototype.inspect = fn;
            if (_nodejsCustomInspectSymbol.default) {
              classObject.prototype[_nodejsCustomInspectSymbol.default] = fn;
            }
          }
        }
      });
      var require_ast = __commonJS2({
        "node_modules/graphql/language/ast.js"(exports2) {
          "use strict";
          init_define_process();
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2.isNode = isNode;
          exports2.Token = exports2.Location = void 0;
          var _defineInspect = _interopRequireDefault(require_defineInspect());
          function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
              default: obj
            };
          }
          var Location = /* @__PURE__ */ function() {
            function Location2(startToken, endToken, source) {
              this.start = startToken.start;
              this.end = endToken.end;
              this.startToken = startToken;
              this.endToken = endToken;
              this.source = source;
            }
            var _proto = Location2.prototype;
            _proto.toJSON = function toJSON() {
              return {
                start: this.start,
                end: this.end
              };
            };
            return Location2;
          }();
          exports2.Location = Location;
          (0, _defineInspect.default)(Location);
          var Token = /* @__PURE__ */ function() {
            function Token2(kind, start, end, line, column, prev, value) {
              this.kind = kind;
              this.start = start;
              this.end = end;
              this.line = line;
              this.column = column;
              this.value = value;
              this.prev = prev;
              this.next = null;
            }
            var _proto2 = Token2.prototype;
            _proto2.toJSON = function toJSON() {
              return {
                kind: this.kind,
                value: this.value,
                line: this.line,
                column: this.column
              };
            };
            return Token2;
          }();
          exports2.Token = Token;
          (0, _defineInspect.default)(Token);
          function isNode(maybeNode) {
            return maybeNode != null && typeof maybeNode.kind === "string";
          }
        }
      });
      var require_tokenKind = __commonJS2({
        "node_modules/graphql/language/tokenKind.js"(exports2) {
          "use strict";
          init_define_process();
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2.TokenKind = void 0;
          var TokenKind = Object.freeze({
            SOF: "<SOF>",
            EOF: "<EOF>",
            BANG: "!",
            DOLLAR: "$",
            AMP: "&",
            PAREN_L: "(",
            PAREN_R: ")",
            SPREAD: "...",
            COLON: ":",
            EQUALS: "=",
            AT: "@",
            BRACKET_L: "[",
            BRACKET_R: "]",
            BRACE_L: "{",
            PIPE: "|",
            BRACE_R: "}",
            NAME: "Name",
            INT: "Int",
            FLOAT: "Float",
            STRING: "String",
            BLOCK_STRING: "BlockString",
            COMMENT: "Comment"
          });
          exports2.TokenKind = TokenKind;
        }
      });
      var require_inspect = __commonJS2({
        "node_modules/graphql/jsutils/inspect.js"(exports2) {
          "use strict";
          init_define_process();
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2.default = inspect;
          var _nodejsCustomInspectSymbol = _interopRequireDefault(require_nodejsCustomInspectSymbol());
          function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
              default: obj
            };
          }
          function _typeof2(obj) {
            "@babel/helpers - typeof";
            if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
              _typeof2 = function _typeof22(obj2) {
                return typeof obj2;
              };
            } else {
              _typeof2 = function _typeof22(obj2) {
                return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
              };
            }
            return _typeof2(obj);
          }
          var MAX_ARRAY_LENGTH = 10;
          var MAX_RECURSIVE_DEPTH = 2;
          function inspect(value) {
            return formatValue(value, []);
          }
          function formatValue(value, seenValues) {
            switch (_typeof2(value)) {
              case "string":
                return JSON.stringify(value);
              case "function":
                return value.name ? "[function ".concat(value.name, "]") : "[function]";
              case "object":
                if (value === null) {
                  return "null";
                }
                return formatObjectValue(value, seenValues);
              default:
                return String(value);
            }
          }
          function formatObjectValue(value, previouslySeenValues) {
            if (previouslySeenValues.indexOf(value) !== -1) {
              return "[Circular]";
            }
            var seenValues = [].concat(previouslySeenValues, [value]);
            var customInspectFn = getCustomFn(value);
            if (customInspectFn !== void 0) {
              var customValue = customInspectFn.call(value);
              if (customValue !== value) {
                return typeof customValue === "string" ? customValue : formatValue(customValue, seenValues);
              }
            } else if (Array.isArray(value)) {
              return formatArray(value, seenValues);
            }
            return formatObject(value, seenValues);
          }
          function formatObject(object, seenValues) {
            var keys = Object.keys(object);
            if (keys.length === 0) {
              return "{}";
            }
            if (seenValues.length > MAX_RECURSIVE_DEPTH) {
              return "[" + getObjectTag(object) + "]";
            }
            var properties = keys.map(function(key) {
              var value = formatValue(object[key], seenValues);
              return key + ": " + value;
            });
            return "{ " + properties.join(", ") + " }";
          }
          function formatArray(array, seenValues) {
            if (array.length === 0) {
              return "[]";
            }
            if (seenValues.length > MAX_RECURSIVE_DEPTH) {
              return "[Array]";
            }
            var len = Math.min(MAX_ARRAY_LENGTH, array.length);
            var remaining = array.length - len;
            var items = [];
            for (var i = 0; i < len; ++i) {
              items.push(formatValue(array[i], seenValues));
            }
            if (remaining === 1) {
              items.push("... 1 more item");
            } else if (remaining > 1) {
              items.push("... ".concat(remaining, " more items"));
            }
            return "[" + items.join(", ") + "]";
          }
          function getCustomFn(object) {
            var customInspectFn = object[String(_nodejsCustomInspectSymbol.default)];
            if (typeof customInspectFn === "function") {
              return customInspectFn;
            }
            if (typeof object.inspect === "function") {
              return object.inspect;
            }
          }
          function getObjectTag(object) {
            var tag = Object.prototype.toString.call(object).replace(/^\[object /, "").replace(/]$/, "");
            if (tag === "Object" && typeof object.constructor === "function") {
              var name = object.constructor.name;
              if (typeof name === "string" && name !== "") {
                return name;
              }
            }
            return tag;
          }
        }
      });
      var require_devAssert = __commonJS2({
        "node_modules/graphql/jsutils/devAssert.js"(exports2) {
          "use strict";
          init_define_process();
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2.default = devAssert;
          function devAssert(condition, message) {
            var booleanCondition = Boolean(condition);
            if (!booleanCondition) {
              throw new Error(message);
            }
          }
        }
      });
      var require_instanceOf = __commonJS2({
        "node_modules/graphql/jsutils/instanceOf.js"(exports2) {
          "use strict";
          init_define_process();
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2.default = void 0;
          var _inspect = _interopRequireDefault(require_inspect());
          function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
              default: obj
            };
          }
          var _default = true ? function instanceOf(value, constructor) {
            return value instanceof constructor;
          } : function instanceOf(value, constructor) {
            if (value instanceof constructor) {
              return true;
            }
            if (_typeof(value) === "object" && value !== null) {
              var _value$constructor;
              var className = constructor.prototype[Symbol.toStringTag];
              var valueClassName = Symbol.toStringTag in value ? value[Symbol.toStringTag] : (_value$constructor = value.constructor) === null || _value$constructor === void 0 ? void 0 : _value$constructor.name;
              if (className === valueClassName) {
                var stringifiedValue = (0, _inspect.default)(value);
                throw new Error("Cannot use ".concat(className, ' "').concat(stringifiedValue, '" from another module or realm.\n\nEnsure that there is only one instance of "graphql" in the node_modules\ndirectory. If different versions of "graphql" are the dependencies of other\nrelied on modules, use "resolutions" to ensure only one version is installed.\n\nhttps://yarnpkg.com/en/docs/selective-version-resolutions\n\nDuplicate "graphql" modules cannot be used at the same time since different\nversions may have different capabilities and behavior. The data from one\nversion used in the function from another could produce confusing and\nspurious results.'));
              }
            }
            return false;
          };
          exports2.default = _default;
        }
      });
      var require_source = __commonJS2({
        "node_modules/graphql/language/source.js"(exports2) {
          "use strict";
          init_define_process();
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2.isSource = isSource;
          exports2.Source = void 0;
          var _symbols = require_symbols();
          var _inspect = _interopRequireDefault(require_inspect());
          var _devAssert = _interopRequireDefault(require_devAssert());
          var _instanceOf = _interopRequireDefault(require_instanceOf());
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
          var Source = /* @__PURE__ */ function() {
            function Source2(body) {
              var name = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "GraphQL request";
              var locationOffset = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
                line: 1,
                column: 1
              };
              typeof body === "string" || (0, _devAssert.default)(0, "Body must be a string. Received: ".concat((0, _inspect.default)(body), "."));
              this.body = body;
              this.name = name;
              this.locationOffset = locationOffset;
              this.locationOffset.line > 0 || (0, _devAssert.default)(0, "line in locationOffset is 1-indexed and must be positive.");
              this.locationOffset.column > 0 || (0, _devAssert.default)(0, "column in locationOffset is 1-indexed and must be positive.");
            }
            _createClass(Source2, [{
              key: _symbols.SYMBOL_TO_STRING_TAG,
              get: function get() {
                return "Source";
              }
            }]);
            return Source2;
          }();
          exports2.Source = Source;
          function isSource(source) {
            return (0, _instanceOf.default)(source, Source);
          }
        }
      });
      var require_directiveLocation = __commonJS2({
        "node_modules/graphql/language/directiveLocation.js"(exports2) {
          "use strict";
          init_define_process();
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2.DirectiveLocation = void 0;
          var DirectiveLocation = Object.freeze({
            QUERY: "QUERY",
            MUTATION: "MUTATION",
            SUBSCRIPTION: "SUBSCRIPTION",
            FIELD: "FIELD",
            FRAGMENT_DEFINITION: "FRAGMENT_DEFINITION",
            FRAGMENT_SPREAD: "FRAGMENT_SPREAD",
            INLINE_FRAGMENT: "INLINE_FRAGMENT",
            VARIABLE_DEFINITION: "VARIABLE_DEFINITION",
            SCHEMA: "SCHEMA",
            SCALAR: "SCALAR",
            OBJECT: "OBJECT",
            FIELD_DEFINITION: "FIELD_DEFINITION",
            ARGUMENT_DEFINITION: "ARGUMENT_DEFINITION",
            INTERFACE: "INTERFACE",
            UNION: "UNION",
            ENUM: "ENUM",
            ENUM_VALUE: "ENUM_VALUE",
            INPUT_OBJECT: "INPUT_OBJECT",
            INPUT_FIELD_DEFINITION: "INPUT_FIELD_DEFINITION"
          });
          exports2.DirectiveLocation = DirectiveLocation;
        }
      });
      var require_blockString = __commonJS2({
        "node_modules/graphql/language/blockString.js"(exports2) {
          "use strict";
          init_define_process();
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2.dedentBlockStringValue = dedentBlockStringValue;
          exports2.getBlockStringIndentation = getBlockStringIndentation;
          exports2.printBlockString = printBlockString;
          function dedentBlockStringValue(rawString) {
            var lines = rawString.split(/\r\n|[\n\r]/g);
            var commonIndent = getBlockStringIndentation(rawString);
            if (commonIndent !== 0) {
              for (var i = 1; i < lines.length; i++) {
                lines[i] = lines[i].slice(commonIndent);
              }
            }
            var startLine = 0;
            while (startLine < lines.length && isBlank(lines[startLine])) {
              ++startLine;
            }
            var endLine = lines.length;
            while (endLine > startLine && isBlank(lines[endLine - 1])) {
              --endLine;
            }
            return lines.slice(startLine, endLine).join("\n");
          }
          function isBlank(str) {
            for (var i = 0; i < str.length; ++i) {
              if (str[i] !== " " && str[i] !== "	") {
                return false;
              }
            }
            return true;
          }
          function getBlockStringIndentation(value) {
            var _commonIndent;
            var isFirstLine = true;
            var isEmptyLine = true;
            var indent = 0;
            var commonIndent = null;
            for (var i = 0; i < value.length; ++i) {
              switch (value.charCodeAt(i)) {
                case 13:
                  if (value.charCodeAt(i + 1) === 10) {
                    ++i;
                  }
                case 10:
                  isFirstLine = false;
                  isEmptyLine = true;
                  indent = 0;
                  break;
                case 9:
                case 32:
                  ++indent;
                  break;
                default:
                  if (isEmptyLine && !isFirstLine && (commonIndent === null || indent < commonIndent)) {
                    commonIndent = indent;
                  }
                  isEmptyLine = false;
              }
            }
            return (_commonIndent = commonIndent) !== null && _commonIndent !== void 0 ? _commonIndent : 0;
          }
          function printBlockString(value) {
            var indentation = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
            var preferMultipleLines = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
            var isSingleLine = value.indexOf("\n") === -1;
            var hasLeadingSpace = value[0] === " " || value[0] === "	";
            var hasTrailingQuote = value[value.length - 1] === '"';
            var hasTrailingSlash = value[value.length - 1] === "\\";
            var printAsMultipleLines = !isSingleLine || hasTrailingQuote || hasTrailingSlash || preferMultipleLines;
            var result = "";
            if (printAsMultipleLines && !(isSingleLine && hasLeadingSpace)) {
              result += "\n" + indentation;
            }
            result += indentation ? value.replace(/\n/g, "\n" + indentation) : value;
            if (printAsMultipleLines) {
              result += "\n";
            }
            return '"""' + result.replace(/"""/g, '\\"""') + '"""';
          }
        }
      });
      var require_lexer = __commonJS2({
        "node_modules/graphql/language/lexer.js"(exports2) {
          "use strict";
          init_define_process();
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2.isPunctuatorTokenKind = isPunctuatorTokenKind;
          exports2.Lexer = void 0;
          var _syntaxError = require_syntaxError();
          var _ast = require_ast();
          var _tokenKind = require_tokenKind();
          var _blockString = require_blockString();
          var Lexer = /* @__PURE__ */ function() {
            function Lexer2(source) {
              var startOfFileToken = new _ast.Token(_tokenKind.TokenKind.SOF, 0, 0, 0, 0, null);
              this.source = source;
              this.lastToken = startOfFileToken;
              this.token = startOfFileToken;
              this.line = 1;
              this.lineStart = 0;
            }
            var _proto = Lexer2.prototype;
            _proto.advance = function advance() {
              this.lastToken = this.token;
              var token = this.token = this.lookahead();
              return token;
            };
            _proto.lookahead = function lookahead() {
              var token = this.token;
              if (token.kind !== _tokenKind.TokenKind.EOF) {
                do {
                  var _token$next;
                  token = (_token$next = token.next) !== null && _token$next !== void 0 ? _token$next : token.next = readToken(this, token);
                } while (token.kind === _tokenKind.TokenKind.COMMENT);
              }
              return token;
            };
            return Lexer2;
          }();
          exports2.Lexer = Lexer;
          function isPunctuatorTokenKind(kind) {
            return kind === _tokenKind.TokenKind.BANG || kind === _tokenKind.TokenKind.DOLLAR || kind === _tokenKind.TokenKind.AMP || kind === _tokenKind.TokenKind.PAREN_L || kind === _tokenKind.TokenKind.PAREN_R || kind === _tokenKind.TokenKind.SPREAD || kind === _tokenKind.TokenKind.COLON || kind === _tokenKind.TokenKind.EQUALS || kind === _tokenKind.TokenKind.AT || kind === _tokenKind.TokenKind.BRACKET_L || kind === _tokenKind.TokenKind.BRACKET_R || kind === _tokenKind.TokenKind.BRACE_L || kind === _tokenKind.TokenKind.PIPE || kind === _tokenKind.TokenKind.BRACE_R;
          }
          function printCharCode(code) {
            return isNaN(code) ? _tokenKind.TokenKind.EOF : code < 127 ? JSON.stringify(String.fromCharCode(code)) : '"\\u'.concat(("00" + code.toString(16).toUpperCase()).slice(-4), '"');
          }
          function readToken(lexer, prev) {
            var source = lexer.source;
            var body = source.body;
            var bodyLength = body.length;
            var pos = prev.end;
            while (pos < bodyLength) {
              var code = body.charCodeAt(pos);
              var _line = lexer.line;
              var _col = 1 + pos - lexer.lineStart;
              switch (code) {
                case 65279:
                case 9:
                case 32:
                case 44:
                  ++pos;
                  continue;
                case 10:
                  ++pos;
                  ++lexer.line;
                  lexer.lineStart = pos;
                  continue;
                case 13:
                  if (body.charCodeAt(pos + 1) === 10) {
                    pos += 2;
                  } else {
                    ++pos;
                  }
                  ++lexer.line;
                  lexer.lineStart = pos;
                  continue;
                case 33:
                  return new _ast.Token(_tokenKind.TokenKind.BANG, pos, pos + 1, _line, _col, prev);
                case 35:
                  return readComment(source, pos, _line, _col, prev);
                case 36:
                  return new _ast.Token(_tokenKind.TokenKind.DOLLAR, pos, pos + 1, _line, _col, prev);
                case 38:
                  return new _ast.Token(_tokenKind.TokenKind.AMP, pos, pos + 1, _line, _col, prev);
                case 40:
                  return new _ast.Token(_tokenKind.TokenKind.PAREN_L, pos, pos + 1, _line, _col, prev);
                case 41:
                  return new _ast.Token(_tokenKind.TokenKind.PAREN_R, pos, pos + 1, _line, _col, prev);
                case 46:
                  if (body.charCodeAt(pos + 1) === 46 && body.charCodeAt(pos + 2) === 46) {
                    return new _ast.Token(_tokenKind.TokenKind.SPREAD, pos, pos + 3, _line, _col, prev);
                  }
                  break;
                case 58:
                  return new _ast.Token(_tokenKind.TokenKind.COLON, pos, pos + 1, _line, _col, prev);
                case 61:
                  return new _ast.Token(_tokenKind.TokenKind.EQUALS, pos, pos + 1, _line, _col, prev);
                case 64:
                  return new _ast.Token(_tokenKind.TokenKind.AT, pos, pos + 1, _line, _col, prev);
                case 91:
                  return new _ast.Token(_tokenKind.TokenKind.BRACKET_L, pos, pos + 1, _line, _col, prev);
                case 93:
                  return new _ast.Token(_tokenKind.TokenKind.BRACKET_R, pos, pos + 1, _line, _col, prev);
                case 123:
                  return new _ast.Token(_tokenKind.TokenKind.BRACE_L, pos, pos + 1, _line, _col, prev);
                case 124:
                  return new _ast.Token(_tokenKind.TokenKind.PIPE, pos, pos + 1, _line, _col, prev);
                case 125:
                  return new _ast.Token(_tokenKind.TokenKind.BRACE_R, pos, pos + 1, _line, _col, prev);
                case 34:
                  if (body.charCodeAt(pos + 1) === 34 && body.charCodeAt(pos + 2) === 34) {
                    return readBlockString(source, pos, _line, _col, prev, lexer);
                  }
                  return readString(source, pos, _line, _col, prev);
                case 45:
                case 48:
                case 49:
                case 50:
                case 51:
                case 52:
                case 53:
                case 54:
                case 55:
                case 56:
                case 57:
                  return readNumber(source, pos, code, _line, _col, prev);
                case 65:
                case 66:
                case 67:
                case 68:
                case 69:
                case 70:
                case 71:
                case 72:
                case 73:
                case 74:
                case 75:
                case 76:
                case 77:
                case 78:
                case 79:
                case 80:
                case 81:
                case 82:
                case 83:
                case 84:
                case 85:
                case 86:
                case 87:
                case 88:
                case 89:
                case 90:
                case 95:
                case 97:
                case 98:
                case 99:
                case 100:
                case 101:
                case 102:
                case 103:
                case 104:
                case 105:
                case 106:
                case 107:
                case 108:
                case 109:
                case 110:
                case 111:
                case 112:
                case 113:
                case 114:
                case 115:
                case 116:
                case 117:
                case 118:
                case 119:
                case 120:
                case 121:
                case 122:
                  return readName(source, pos, _line, _col, prev);
              }
              throw (0, _syntaxError.syntaxError)(source, pos, unexpectedCharacterMessage(code));
            }
            var line = lexer.line;
            var col = 1 + pos - lexer.lineStart;
            return new _ast.Token(_tokenKind.TokenKind.EOF, bodyLength, bodyLength, line, col, prev);
          }
          function unexpectedCharacterMessage(code) {
            if (code < 32 && code !== 9 && code !== 10 && code !== 13) {
              return "Cannot contain the invalid character ".concat(printCharCode(code), ".");
            }
            if (code === 39) {
              return `Unexpected single quote character ('), did you mean to use a double quote (")?`;
            }
            return "Cannot parse the unexpected character ".concat(printCharCode(code), ".");
          }
          function readComment(source, start, line, col, prev) {
            var body = source.body;
            var code;
            var position = start;
            do {
              code = body.charCodeAt(++position);
            } while (!isNaN(code) && (code > 31 || code === 9));
            return new _ast.Token(_tokenKind.TokenKind.COMMENT, start, position, line, col, prev, body.slice(start + 1, position));
          }
          function readNumber(source, start, firstCode, line, col, prev) {
            var body = source.body;
            var code = firstCode;
            var position = start;
            var isFloat = false;
            if (code === 45) {
              code = body.charCodeAt(++position);
            }
            if (code === 48) {
              code = body.charCodeAt(++position);
              if (code >= 48 && code <= 57) {
                throw (0, _syntaxError.syntaxError)(source, position, "Invalid number, unexpected digit after 0: ".concat(printCharCode(code), "."));
              }
            } else {
              position = readDigits(source, position, code);
              code = body.charCodeAt(position);
            }
            if (code === 46) {
              isFloat = true;
              code = body.charCodeAt(++position);
              position = readDigits(source, position, code);
              code = body.charCodeAt(position);
            }
            if (code === 69 || code === 101) {
              isFloat = true;
              code = body.charCodeAt(++position);
              if (code === 43 || code === 45) {
                code = body.charCodeAt(++position);
              }
              position = readDigits(source, position, code);
              code = body.charCodeAt(position);
            }
            if (code === 46 || isNameStart(code)) {
              throw (0, _syntaxError.syntaxError)(source, position, "Invalid number, expected digit but got: ".concat(printCharCode(code), "."));
            }
            return new _ast.Token(isFloat ? _tokenKind.TokenKind.FLOAT : _tokenKind.TokenKind.INT, start, position, line, col, prev, body.slice(start, position));
          }
          function readDigits(source, start, firstCode) {
            var body = source.body;
            var position = start;
            var code = firstCode;
            if (code >= 48 && code <= 57) {
              do {
                code = body.charCodeAt(++position);
              } while (code >= 48 && code <= 57);
              return position;
            }
            throw (0, _syntaxError.syntaxError)(source, position, "Invalid number, expected digit but got: ".concat(printCharCode(code), "."));
          }
          function readString(source, start, line, col, prev) {
            var body = source.body;
            var position = start + 1;
            var chunkStart = position;
            var code = 0;
            var value = "";
            while (position < body.length && !isNaN(code = body.charCodeAt(position)) && code !== 10 && code !== 13) {
              if (code === 34) {
                value += body.slice(chunkStart, position);
                return new _ast.Token(_tokenKind.TokenKind.STRING, start, position + 1, line, col, prev, value);
              }
              if (code < 32 && code !== 9) {
                throw (0, _syntaxError.syntaxError)(source, position, "Invalid character within String: ".concat(printCharCode(code), "."));
              }
              ++position;
              if (code === 92) {
                value += body.slice(chunkStart, position - 1);
                code = body.charCodeAt(position);
                switch (code) {
                  case 34:
                    value += '"';
                    break;
                  case 47:
                    value += "/";
                    break;
                  case 92:
                    value += "\\";
                    break;
                  case 98:
                    value += "\b";
                    break;
                  case 102:
                    value += "\f";
                    break;
                  case 110:
                    value += "\n";
                    break;
                  case 114:
                    value += "\r";
                    break;
                  case 116:
                    value += "	";
                    break;
                  case 117: {
                    var charCode = uniCharCode(body.charCodeAt(position + 1), body.charCodeAt(position + 2), body.charCodeAt(position + 3), body.charCodeAt(position + 4));
                    if (charCode < 0) {
                      var invalidSequence = body.slice(position + 1, position + 5);
                      throw (0, _syntaxError.syntaxError)(source, position, "Invalid character escape sequence: \\u".concat(invalidSequence, "."));
                    }
                    value += String.fromCharCode(charCode);
                    position += 4;
                    break;
                  }
                  default:
                    throw (0, _syntaxError.syntaxError)(source, position, "Invalid character escape sequence: \\".concat(String.fromCharCode(code), "."));
                }
                ++position;
                chunkStart = position;
              }
            }
            throw (0, _syntaxError.syntaxError)(source, position, "Unterminated string.");
          }
          function readBlockString(source, start, line, col, prev, lexer) {
            var body = source.body;
            var position = start + 3;
            var chunkStart = position;
            var code = 0;
            var rawValue = "";
            while (position < body.length && !isNaN(code = body.charCodeAt(position))) {
              if (code === 34 && body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34) {
                rawValue += body.slice(chunkStart, position);
                return new _ast.Token(_tokenKind.TokenKind.BLOCK_STRING, start, position + 3, line, col, prev, (0, _blockString.dedentBlockStringValue)(rawValue));
              }
              if (code < 32 && code !== 9 && code !== 10 && code !== 13) {
                throw (0, _syntaxError.syntaxError)(source, position, "Invalid character within String: ".concat(printCharCode(code), "."));
              }
              if (code === 10) {
                ++position;
                ++lexer.line;
                lexer.lineStart = position;
              } else if (code === 13) {
                if (body.charCodeAt(position + 1) === 10) {
                  position += 2;
                } else {
                  ++position;
                }
                ++lexer.line;
                lexer.lineStart = position;
              } else if (code === 92 && body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34 && body.charCodeAt(position + 3) === 34) {
                rawValue += body.slice(chunkStart, position) + '"""';
                position += 4;
                chunkStart = position;
              } else {
                ++position;
              }
            }
            throw (0, _syntaxError.syntaxError)(source, position, "Unterminated string.");
          }
          function uniCharCode(a, b, c, d) {
            return char2hex(a) << 12 | char2hex(b) << 8 | char2hex(c) << 4 | char2hex(d);
          }
          function char2hex(a) {
            return a >= 48 && a <= 57 ? a - 48 : a >= 65 && a <= 70 ? a - 55 : a >= 97 && a <= 102 ? a - 87 : -1;
          }
          function readName(source, start, line, col, prev) {
            var body = source.body;
            var bodyLength = body.length;
            var position = start + 1;
            var code = 0;
            while (position !== bodyLength && !isNaN(code = body.charCodeAt(position)) && (code === 95 || code >= 48 && code <= 57 || code >= 65 && code <= 90 || code >= 97 && code <= 122)) {
              ++position;
            }
            return new _ast.Token(_tokenKind.TokenKind.NAME, start, position, line, col, prev, body.slice(start, position));
          }
          function isNameStart(code) {
            return code === 95 || code >= 65 && code <= 90 || code >= 97 && code <= 122;
          }
        }
      });
      var require_parser = __commonJS2({
        "node_modules/graphql/language/parser.js"(exports2) {
          "use strict";
          init_define_process();
          Object.defineProperty(exports2, "__esModule", {
            value: true
          });
          exports2.parse = parse2;
          exports2.parseValue = parseValue;
          exports2.parseType = parseType;
          exports2.Parser = void 0;
          var _syntaxError = require_syntaxError();
          var _kinds = require_kinds();
          var _ast = require_ast();
          var _tokenKind = require_tokenKind();
          var _source = require_source();
          var _directiveLocation = require_directiveLocation();
          var _lexer = require_lexer();
          function parse2(source, options) {
            var parser = new Parser(source, options);
            return parser.parseDocument();
          }
          function parseValue(source, options) {
            var parser = new Parser(source, options);
            parser.expectToken(_tokenKind.TokenKind.SOF);
            var value = parser.parseValueLiteral(false);
            parser.expectToken(_tokenKind.TokenKind.EOF);
            return value;
          }
          function parseType(source, options) {
            var parser = new Parser(source, options);
            parser.expectToken(_tokenKind.TokenKind.SOF);
            var type = parser.parseTypeReference();
            parser.expectToken(_tokenKind.TokenKind.EOF);
            return type;
          }
          var Parser = /* @__PURE__ */ function() {
            function Parser2(source, options) {
              var sourceObj = (0, _source.isSource)(source) ? source : new _source.Source(source);
              this._lexer = new _lexer.Lexer(sourceObj);
              this._options = options;
            }
            var _proto = Parser2.prototype;
            _proto.parseName = function parseName() {
              var token = this.expectToken(_tokenKind.TokenKind.NAME);
              return {
                kind: _kinds.Kind.NAME,
                value: token.value,
                loc: this.loc(token)
              };
            };
            _proto.parseDocument = function parseDocument() {
              var start = this._lexer.token;
              return {
                kind: _kinds.Kind.DOCUMENT,
                definitions: this.many(_tokenKind.TokenKind.SOF, this.parseDefinition, _tokenKind.TokenKind.EOF),
                loc: this.loc(start)
              };
            };
            _proto.parseDefinition = function parseDefinition() {
              if (this.peek(_tokenKind.TokenKind.NAME)) {
                switch (this._lexer.token.value) {
                  case "query":
                  case "mutation":
                  case "subscription":
                    return this.parseOperationDefinition();
                  case "fragment":
                    return this.parseFragmentDefinition();
                  case "schema":
                  case "scalar":
                  case "type":
                  case "interface":
                  case "union":
                  case "enum":
                  case "input":
                  case "directive":
                    return this.parseTypeSystemDefinition();
                  case "extend":
                    return this.parseTypeSystemExtension();
                }
              } else if (this.peek(_tokenKind.TokenKind.BRACE_L)) {
                return this.parseOperationDefinition();
              } else if (this.peekDescription()) {
                return this.parseTypeSystemDefinition();
              }
              throw this.unexpected();
            };
            _proto.parseOperationDefinition = function parseOperationDefinition() {
              var start = this._lexer.token;
              if (this.peek(_tokenKind.TokenKind.BRACE_L)) {
                return {
                  kind: _kinds.Kind.OPERATION_DEFINITION,
                  operation: "query",
                  name: void 0,
                  variableDefinitions: [],
                  directives: [],
                  selectionSet: this.parseSelectionSet(),
                  loc: this.loc(start)
                };
              }
              var operation = this.parseOperationType();
              var name;
              if (this.peek(_tokenKind.TokenKind.NAME)) {
                name = this.parseName();
              }
              return {
                kind: _kinds.Kind.OPERATION_DEFINITION,
                operation,
                name,
                variableDefinitions: this.parseVariableDefinitions(),
                directives: this.parseDirectives(false),
                selectionSet: this.parseSelectionSet(),
                loc: this.loc(start)
              };
            };
            _proto.parseOperationType = function parseOperationType() {
              var operationToken = this.expectToken(_tokenKind.TokenKind.NAME);
              switch (operationToken.value) {
                case "query":
                  return "query";
                case "mutation":
                  return "mutation";
                case "subscription":
                  return "subscription";
              }
              throw this.unexpected(operationToken);
            };
            _proto.parseVariableDefinitions = function parseVariableDefinitions() {
              return this.optionalMany(_tokenKind.TokenKind.PAREN_L, this.parseVariableDefinition, _tokenKind.TokenKind.PAREN_R);
            };
            _proto.parseVariableDefinition = function parseVariableDefinition() {
              var start = this._lexer.token;
              return {
                kind: _kinds.Kind.VARIABLE_DEFINITION,
                variable: this.parseVariable(),
                type: (this.expectToken(_tokenKind.TokenKind.COLON), this.parseTypeReference()),
                defaultValue: this.expectOptionalToken(_tokenKind.TokenKind.EQUALS) ? this.parseValueLiteral(true) : void 0,
                directives: this.parseDirectives(true),
                loc: this.loc(start)
              };
            };
            _proto.parseVariable = function parseVariable() {
              var start = this._lexer.token;
              this.expectToken(_tokenKind.TokenKind.DOLLAR);
              return {
                kind: _kinds.Kind.VARIABLE,
                name: this.parseName(),
                loc: this.loc(start)
              };
            };
            _proto.parseSelectionSet = function parseSelectionSet() {
              var start = this._lexer.token;
              return {
                kind: _kinds.Kind.SELECTION_SET,
                selections: this.many(_tokenKind.TokenKind.BRACE_L, this.parseSelection, _tokenKind.TokenKind.BRACE_R),
                loc: this.loc(start)
              };
            };
            _proto.parseSelection = function parseSelection() {
              return this.peek(_tokenKind.TokenKind.SPREAD) ? this.parseFragment() : this.parseField();
            };
            _proto.parseField = function parseField() {
              var start = this._lexer.token;
              var nameOrAlias = this.parseName();
              var alias;
              var name;
              if (this.expectOptionalToken(_tokenKind.TokenKind.COLON)) {
                alias = nameOrAlias;
                name = this.parseName();
              } else {
                name = nameOrAlias;
              }
              return {
                kind: _kinds.Kind.FIELD,
                alias,
                name,
                arguments: this.parseArguments(false),
                directives: this.parseDirectives(false),
                selectionSet: this.peek(_tokenKind.TokenKind.BRACE_L) ? this.parseSelectionSet() : void 0,
                loc: this.loc(start)
              };
            };
            _proto.parseArguments = function parseArguments(isConst) {
              var item = isConst ? this.parseConstArgument : this.parseArgument;
              return this.optionalMany(_tokenKind.TokenKind.PAREN_L, item, _tokenKind.TokenKind.PAREN_R);
            };
            _proto.parseArgument = function parseArgument() {
              var start = this._lexer.token;
              var name = this.parseName();
              this.expectToken(_tokenKind.TokenKind.COLON);
              return {
                kind: _kinds.Kind.ARGUMENT,
                name,
                value: this.parseValueLiteral(false),
                loc: this.loc(start)
              };
            };
            _proto.parseConstArgument = function parseConstArgument() {
              var start = this._lexer.token;
              return {
                kind: _kinds.Kind.ARGUMENT,
                name: this.parseName(),
                value: (this.expectToken(_tokenKind.TokenKind.COLON), this.parseValueLiteral(true)),
                loc: this.loc(start)
              };
            };
            _proto.parseFragment = function parseFragment() {
              var start = this._lexer.token;
              this.expectToken(_tokenKind.TokenKind.SPREAD);
              var hasTypeCondition = this.expectOptionalKeyword("on");
              if (!hasTypeCondition && this.peek(_tokenKind.TokenKind.NAME)) {
                return {
                  kind: _kinds.Kind.FRAGMENT_SPREAD,
                  name: this.parseFragmentName(),
                  directives: this.parseDirectives(false),
                  loc: this.loc(start)
                };
              }
              return {
                kind: _kinds.Kind.INLINE_FRAGMENT,
                typeCondition: hasTypeCondition ? this.parseNamedType() : void 0,
                directives: this.parseDirectives(false),
                selectionSet: this.parseSelectionSet(),
                loc: this.loc(start)
              };
            };
            _proto.parseFragmentDefinition = function parseFragmentDefinition() {
              var _this$_options;
              var start = this._lexer.token;
              this.expectKeyword("fragment");
              if (((_this$_options = this._options) === null || _this$_options === void 0 ? void 0 : _this$_options.experimentalFragmentVariables) === true) {
                return {
                  kind: _kinds.Kind.FRAGMENT_DEFINITION,
                  name: this.parseFragmentName(),
                  variableDefinitions: this.parseVariableDefinitions(),
                  typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
                  directives: this.parseDirectives(false),
                  selectionSet: this.parseSelectionSet(),
                  loc: this.loc(start)
                };
              }
              return {
                kind: _kinds.Kind.FRAGMENT_DEFINITION,
                name: this.parseFragmentName(),
                typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
                directives: this.parseDirectives(false),
                selectionSet: this.parseSelectionSet(),
                loc: this.loc(start)
              };
            };
            _proto.parseFragmentName = function parseFragmentName() {
              if (this._lexer.token.value === "on") {
                throw this.unexpected();
              }
              return this.parseName();
            };
            _proto.parseValueLiteral = function parseValueLiteral(isConst) {
              var token = this._lexer.token;
              switch (token.kind) {
                case _tokenKind.TokenKind.BRACKET_L:
                  return this.parseList(isConst);
                case _tokenKind.TokenKind.BRACE_L:
                  return this.parseObject(isConst);
                case _tokenKind.TokenKind.INT:
                  this._lexer.advance();
                  return {
                    kind: _kinds.Kind.INT,
                    value: token.value,
                    loc: this.loc(token)
                  };
                case _tokenKind.TokenKind.FLOAT:
                  this._lexer.advance();
                  return {
                    kind: _kinds.Kind.FLOAT,
                    value: token.value,
                    loc: this.loc(token)
                  };
                case _tokenKind.TokenKind.STRING:
                case _tokenKind.TokenKind.BLOCK_STRING:
                  return this.parseStringLiteral();
                case _tokenKind.TokenKind.NAME:
                  this._lexer.advance();
                  switch (token.value) {
                    case "true":
                      return {
                        kind: _kinds.Kind.BOOLEAN,
                        value: true,
                        loc: this.loc(token)
                      };
                    case "false":
                      return {
                        kind: _kinds.Kind.BOOLEAN,
                        value: false,
                        loc: this.loc(token)
                      };
                    case "null":
                      return {
                        kind: _kinds.Kind.NULL,
                        loc: this.loc(token)
                      };
                    default:
                      return {
                        kind: _kinds.Kind.ENUM,
                        value: token.value,
                        loc: this.loc(token)
                      };
                  }
                case _tokenKind.TokenKind.DOLLAR:
                  if (!isConst) {
                    return this.parseVariable();
                  }
                  break;
              }
              throw this.unexpected();
            };
            _proto.parseStringLiteral = function parseStringLiteral() {
              var token = this._lexer.token;
              this._lexer.advance();
              return {
                kind: _kinds.Kind.STRING,
                value: token.value,
                block: token.kind === _tokenKind.TokenKind.BLOCK_STRING,
                loc: this.loc(token)
              };
            };
            _proto.parseList = function parseList(isConst) {
              var _this = this;
              var start = this._lexer.token;
              var item = function item2() {
                return _this.parseValueLiteral(isConst);
              };
              return {
                kind: _kinds.Kind.LIST,
                values: this.any(_tokenKind.TokenKind.BRACKET_L, item, _tokenKind.TokenKind.BRACKET_R),
                loc: this.loc(start)
              };
            };
            _proto.parseObject = function parseObject(isConst) {
              var _this2 = this;
              var start = this._lexer.token;
              var item = function item2() {
                return _this2.parseObjectField(isConst);
              };
              return {
                kind: _kinds.Kind.OBJECT,
                fields: this.any(_tokenKind.TokenKind.BRACE_L, item, _tokenKind.TokenKind.BRACE_R),
                loc: this.loc(start)
              };
            };
            _proto.parseObjectField = function parseObjectField(isConst) {
              var start = this._lexer.token;
              var name = this.parseName();
              this.expectToken(_tokenKind.TokenKind.COLON);
              return {
                kind: _kinds.Kind.OBJECT_FIELD,
                name,
                value: this.parseValueLiteral(isConst),
                loc: this.loc(start)
              };
            };
            _proto.parseDirectives = function parseDirectives(isConst) {
              var directives = [];
              while (this.peek(_tokenKind.TokenKind.AT)) {
                directives.push(this.parseDirective(isConst));
              }
              return directives;
            };
            _proto.parseDirective = function parseDirective(isConst) {
              var start = this._lexer.token;
              this.expectToken(_tokenKind.TokenKind.AT);
              return {
                kind: _kinds.Kind.DIRECTIVE,
                name: this.parseName(),
                arguments: this.parseArguments(isConst),
                loc: this.loc(start)
              };
            };
            _proto.parseTypeReference = function parseTypeReference() {
              var start = this._lexer.token;
              var type;
              if (this.expectOptionalToken(_tokenKind.TokenKind.BRACKET_L)) {
                type = this.parseTypeReference();
                this.expectToken(_tokenKind.TokenKind.BRACKET_R);
                type = {
                  kind: _kinds.Kind.LIST_TYPE,
                  type,
                  loc: this.loc(start)
                };
              } else {
                type = this.parseNamedType();
              }
              if (this.expectOptionalToken(_tokenKind.TokenKind.BANG)) {
                return {
                  kind: _kinds.Kind.NON_NULL_TYPE,
                  type,
                  loc: this.loc(start)
                };
              }
              return type;
            };
            _proto.parseNamedType = function parseNamedType() {
              var start = this._lexer.token;
              return {
                kind: _kinds.Kind.NAMED_TYPE,
                name: this.parseName(),
                loc: this.loc(start)
              };
            };
            _proto.parseTypeSystemDefinition = function parseTypeSystemDefinition() {
              var keywordToken = this.peekDescription() ? this._lexer.lookahead() : this._lexer.token;
              if (keywordToken.kind === _tokenKind.TokenKind.NAME) {
                switch (keywordToken.value) {
                  case "schema":
                    return this.parseSchemaDefinition();
                  case "scalar":
                    return this.parseScalarTypeDefinition();
                  case "type":
                    return this.parseObjectTypeDefinition();
                  case "interface":
                    return this.parseInterfaceTypeDefinition();
                  case "union":
                    return this.parseUnionTypeDefinition();
                  case "enum":
                    return this.parseEnumTypeDefinition();
                  case "input":
                    return this.parseInputObjectTypeDefinition();
                  case "directive":
                    return this.parseDirectiveDefinition();
                }
              }
              throw this.unexpected(keywordToken);
            };
            _proto.peekDescription = function peekDescription() {
              return this.peek(_tokenKind.TokenKind.STRING) || this.peek(_tokenKind.TokenKind.BLOCK_STRING);
            };
            _proto.parseDescription = function parseDescription() {
              if (this.peekDescription()) {
                return this.parseStringLiteral();
              }
            };
            _proto.parseSchemaDefinition = function parseSchemaDefinition() {
              var start = this._lexer.token;
              var description = this.parseDescription();
              this.expectKeyword("schema");
              var directives = this.parseDirectives(true);
              var operationTypes = this.many(_tokenKind.TokenKind.BRACE_L, this.parseOperationTypeDefinition, _tokenKind.TokenKind.BRACE_R);
              return {
                kind: _kinds.Kind.SCHEMA_DEFINITION,
                description,
                directives,
                operationTypes,
                loc: this.loc(start)
              };
            };
            _proto.parseOperationTypeDefinition = function parseOperationTypeDefinition() {
              var start = this._lexer.token;
              var operation = this.parseOperationType();
              this.expectToken(_tokenKind.TokenKind.COLON);
              var type = this.parseNamedType();
              return {
                kind: _kinds.Kind.OPERATION_TYPE_DEFINITION,
                operation,
                type,
                loc: this.loc(start)
              };
            };
            _proto.parseScalarTypeDefinition = function parseScalarTypeDefinition() {
              var start = this._lexer.token;
              var description = this.parseDescription();
              this.expectKeyword("scalar");
              var name = this.parseName();
              var directives = this.parseDirectives(true);
              return {
                kind: _kinds.Kind.SCALAR_TYPE_DEFINITION,
                description,
                name,
                directives,
                loc: this.loc(start)
              };
            };
            _proto.parseObjectTypeDefinition = function parseObjectTypeDefinition() {
              var start = this._lexer.token;
              var description = this.parseDescription();
              this.expectKeyword("type");
              var name = this.parseName();
              var interfaces = this.parseImplementsInterfaces();
              var directives = this.parseDirectives(true);
              var fields = this.parseFieldsDefinition();
              return {
                kind: _kinds.Kind.OBJECT_TYPE_DEFINITION,
                description,
                name,
                interfaces,
                directives,
                fields,
                loc: this.loc(start)
              };
            };
            _proto.parseImplementsInterfaces = function parseImplementsInterfaces() {
              var _this$_options2;
              if (!this.expectOptionalKeyword("implements")) {
                return [];
              }
              if (((_this$_options2 = this._options) === null || _this$_options2 === void 0 ? void 0 : _this$_options2.allowLegacySDLImplementsInterfaces) === true) {
                var types = [];
                this.expectOptionalToken(_tokenKind.TokenKind.AMP);
                do {
                  types.push(this.parseNamedType());
                } while (this.expectOptionalToken(_tokenKind.TokenKind.AMP) || this.peek(_tokenKind.TokenKind.NAME));
                return types;
              }
              return this.delimitedMany(_tokenKind.TokenKind.AMP, this.parseNamedType);
            };
            _proto.parseFieldsDefinition = function parseFieldsDefinition() {
              var _this$_options3;
              if (((_this$_options3 = this._options) === null || _this$_options3 === void 0 ? void 0 : _this$_options3.allowLegacySDLEmptyFields) === true && this.peek(_tokenKind.TokenKind.BRACE_L) && this._lexer.lookahead().kind === _tokenKind.TokenKind.BRACE_R) {
                this._lexer.advance();
                this._lexer.advance();
                return [];
              }
              return this.optionalMany(_tokenKind.TokenKind.BRACE_L, this.parseFieldDefinition, _tokenKind.TokenKind.BRACE_R);
            };
            _proto.parseFieldDefinition = function parseFieldDefinition() {
              var start = this._lexer.token;
              var description = this.parseDescription();
              var name = this.parseName();
              var args = this.parseArgumentDefs();
              this.expectToken(_tokenKind.TokenKind.COLON);
              var type = this.parseTypeReference();
              var directives = this.parseDirectives(true);
              return {
                kind: _kinds.Kind.FIELD_DEFINITION,
                description,
                name,
                arguments: args,
                type,
                directives,
                loc: this.loc(start)
              };
            };
            _proto.parseArgumentDefs = function parseArgumentDefs() {
              return this.optionalMany(_tokenKind.TokenKind.PAREN_L, this.parseInputValueDef, _tokenKind.TokenKind.PAREN_R);
            };
            _proto.parseInputValueDef = function parseInputValueDef() {
              var start = this._lexer.token;
              var description = this.parseDescription();
              var name = this.parseName();
              this.expectToken(_tokenKind.TokenKind.COLON);
              var type = this.parseTypeReference();
              var defaultValue;
              if (this.expectOptionalToken(_tokenKind.TokenKind.EQUALS)) {
                defaultValue = this.parseValueLiteral(true);
              }
              var directives = this.parseDirectives(true);
              return {
                kind: _kinds.Kind.INPUT_VALUE_DEFINITION,
                description,
                name,
                type,
                defaultValue,
                directives,
                loc: this.loc(start)
              };
            };
            _proto.parseInterfaceTypeDefinition = function parseInterfaceTypeDefinition() {
              var start = this._lexer.token;
              var description = this.parseDescription();
              this.expectKeyword("interface");
              var name = this.parseName();
              var interfaces = this.parseImplementsInterfaces();
              var directives = this.parseDirectives(true);
              var fields = this.parseFieldsDefinition();
              return {
                kind: _kinds.Kind.INTERFACE_TYPE_DEFINITION,
                description,
                name,
                interfaces,
                directives,
                fields,
                loc: this.loc(start)
              };
            };
            _proto.parseUnionTypeDefinition = function parseUnionTypeDefinition() {
              var start = this._lexer.token;
              var description = this.parseDescription();
              this.expectKeyword("union");
              var name = this.parseName();
              var directives = this.parseDirectives(true);
              var types = this.parseUnionMemberTypes();
              return {
                kind: _kinds.Kind.UNION_TYPE_DEFINITION,
                description,
                name,
                directives,
                types,
                loc: this.loc(start)
              };
            };
            _proto.parseUnionMemberTypes = function parseUnionMemberTypes() {
              return this.expectOptionalToken(_tokenKind.TokenKind.EQUALS) ? this.delimitedMany(_tokenKind.TokenKind.PIPE, this.parseNamedType) : [];
            };
            _proto.parseEnumTypeDefinition = function parseEnumTypeDefinition() {
              var start = this._lexer.token;
              var description = this.parseDescription();
              this.expectKeyword("enum");
              var name = this.parseName();
              var directives = this.parseDirectives(true);
              var values = this.parseEnumValuesDefinition();
              return {
                kind: _kinds.Kind.ENUM_TYPE_DEFINITION,
                description,
                name,
                directives,
                values,
                loc: this.loc(start)
              };
            };
            _proto.parseEnumValuesDefinition = function parseEnumValuesDefinition() {
              return this.optionalMany(_tokenKind.TokenKind.BRACE_L, this.parseEnumValueDefinition, _tokenKind.TokenKind.BRACE_R);
            };
            _proto.parseEnumValueDefinition = function parseEnumValueDefinition() {
              var start = this._lexer.token;
              var description = this.parseDescription();
              var name = this.parseName();
              var directives = this.parseDirectives(true);
              return {
                kind: _kinds.Kind.ENUM_VALUE_DEFINITION,
                description,
                name,
                directives,
                loc: this.loc(start)
              };
            };
            _proto.parseInputObjectTypeDefinition = function parseInputObjectTypeDefinition() {
              var start = this._lexer.token;
              var description = this.parseDescription();
              this.expectKeyword("input");
              var name = this.parseName();
              var directives = this.parseDirectives(true);
              var fields = this.parseInputFieldsDefinition();
              return {
                kind: _kinds.Kind.INPUT_OBJECT_TYPE_DEFINITION,
                description,
                name,
                directives,
                fields,
                loc: this.loc(start)
              };
            };
            _proto.parseInputFieldsDefinition = function parseInputFieldsDefinition() {
              return this.optionalMany(_tokenKind.TokenKind.BRACE_L, this.parseInputValueDef, _tokenKind.TokenKind.BRACE_R);
            };
            _proto.parseTypeSystemExtension = function parseTypeSystemExtension() {
              var keywordToken = this._lexer.lookahead();
              if (keywordToken.kind === _tokenKind.TokenKind.NAME) {
                switch (keywordToken.value) {
                  case "schema":
                    return this.parseSchemaExtension();
                  case "scalar":
                    return this.parseScalarTypeExtension();
                  case "type":
                    return this.parseObjectTypeExtension();
                  case "interface":
                    return this.parseInterfaceTypeExtension();
                  case "union":
                    return this.parseUnionTypeExtension();
                  case "enum":
                    return this.parseEnumTypeExtension();
                  case "input":
                    return this.parseInputObjectTypeExtension();
                }
              }
              throw this.unexpected(keywordToken);
            };
            _proto.parseSchemaExtension = function parseSchemaExtension() {
              var start = this._lexer.token;
              this.expectKeyword("extend");
              this.expectKeyword("schema");
              var directives = this.parseDirectives(true);
              var operationTypes = this.optionalMany(_tokenKind.TokenKind.BRACE_L, this.parseOperationTypeDefinition, _tokenKind.TokenKind.BRACE_R);
              if (directives.length === 0 && operationTypes.length === 0) {
                throw this.unexpected();
              }
              return {
                kind: _kinds.Kind.SCHEMA_EXTENSION,
                directives,
                operationTypes,
                loc: this.loc(start)
              };
            };
            _proto.parseScalarTypeExtension = function parseScalarTypeExtension() {
              var start = this._lexer.token;
              this.expectKeyword("extend");
              this.expectKeyword("scalar");
              var name = this.parseName();
              var directives = this.parseDirectives(true);
              if (directives.length === 0) {
                throw this.unexpected();
              }
              return {
                kind: _kinds.Kind.SCALAR_TYPE_EXTENSION,
                name,
                directives,
                loc: this.loc(start)
              };
            };
            _proto.parseObjectTypeExtension = function parseObjectTypeExtension() {
              var start = this._lexer.token;
              this.expectKeyword("extend");
              this.expectKeyword("type");
              var name = this.parseName();
              var interfaces = this.parseImplementsInterfaces();
              var directives = this.parseDirectives(true);
              var fields = this.parseFieldsDefinition();
              if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
                throw this.unexpected();
              }
              return {
                kind: _kinds.Kind.OBJECT_TYPE_EXTENSION,
                name,
                interfaces,
                directives,
                fields,
                loc: this.loc(start)
              };
            };
            _proto.parseInterfaceTypeExtension = function parseInterfaceTypeExtension() {
              var start = this._lexer.token;
              this.expectKeyword("extend");
              this.expectKeyword("interface");
              var name = this.parseName();
              var interfaces = this.parseImplementsInterfaces();
              var directives = this.parseDirectives(true);
              var fields = this.parseFieldsDefinition();
              if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
                throw this.unexpected();
              }
              return {
                kind: _kinds.Kind.INTERFACE_TYPE_EXTENSION,
                name,
                interfaces,
                directives,
                fields,
                loc: this.loc(start)
              };
            };
            _proto.parseUnionTypeExtension = function parseUnionTypeExtension() {
              var start = this._lexer.token;
              this.expectKeyword("extend");
              this.expectKeyword("union");
              var name = this.parseName();
              var directives = this.parseDirectives(true);
              var types = this.parseUnionMemberTypes();
              if (directives.length === 0 && types.length === 0) {
                throw this.unexpected();
              }
              return {
                kind: _kinds.Kind.UNION_TYPE_EXTENSION,
                name,
                directives,
                types,
                loc: this.loc(start)
              };
            };
            _proto.parseEnumTypeExtension = function parseEnumTypeExtension() {
              var start = this._lexer.token;
              this.expectKeyword("extend");
              this.expectKeyword("enum");
              var name = this.parseName();
              var directives = this.parseDirectives(true);
              var values = this.parseEnumValuesDefinition();
              if (directives.length === 0 && values.length === 0) {
                throw this.unexpected();
              }
              return {
                kind: _kinds.Kind.ENUM_TYPE_EXTENSION,
                name,
                directives,
                values,
                loc: this.loc(start)
              };
            };
            _proto.parseInputObjectTypeExtension = function parseInputObjectTypeExtension() {
              var start = this._lexer.token;
              this.expectKeyword("extend");
              this.expectKeyword("input");
              var name = this.parseName();
              var directives = this.parseDirectives(true);
              var fields = this.parseInputFieldsDefinition();
              if (directives.length === 0 && fields.length === 0) {
                throw this.unexpected();
              }
              return {
                kind: _kinds.Kind.INPUT_OBJECT_TYPE_EXTENSION,
                name,
                directives,
                fields,
                loc: this.loc(start)
              };
            };
            _proto.parseDirectiveDefinition = function parseDirectiveDefinition() {
              var start = this._lexer.token;
              var description = this.parseDescription();
              this.expectKeyword("directive");
              this.expectToken(_tokenKind.TokenKind.AT);
              var name = this.parseName();
              var args = this.parseArgumentDefs();
              var repeatable = this.expectOptionalKeyword("repeatable");
              this.expectKeyword("on");
              var locations = this.parseDirectiveLocations();
              return {
                kind: _kinds.Kind.DIRECTIVE_DEFINITION,
                description,
                name,
                arguments: args,
                repeatable,
                locations,
                loc: this.loc(start)
              };
            };
            _proto.parseDirectiveLocations = function parseDirectiveLocations() {
              return this.delimitedMany(_tokenKind.TokenKind.PIPE, this.parseDirectiveLocation);
            };
            _proto.parseDirectiveLocation = function parseDirectiveLocation() {
              var start = this._lexer.token;
              var name = this.parseName();
              if (_directiveLocation.DirectiveLocation[name.value] !== void 0) {
                return name;
              }
              throw this.unexpected(start);
            };
            _proto.loc = function loc(startToken) {
              var _this$_options4;
              if (((_this$_options4 = this._options) === null || _this$_options4 === void 0 ? void 0 : _this$_options4.noLocation) !== true) {
                return new _ast.Location(startToken, this._lexer.lastToken, this._lexer.source);
              }
            };
            _proto.peek = function peek(kind) {
              return this._lexer.token.kind === kind;
            };
            _proto.expectToken = function expectToken(kind) {
              var token = this._lexer.token;
              if (token.kind === kind) {
                this._lexer.advance();
                return token;
              }
              throw (0, _syntaxError.syntaxError)(this._lexer.source, token.start, "Expected ".concat(getTokenKindDesc(kind), ", found ").concat(getTokenDesc(token), "."));
            };
            _proto.expectOptionalToken = function expectOptionalToken(kind) {
              var token = this._lexer.token;
              if (token.kind === kind) {
                this._lexer.advance();
                return token;
              }
              return void 0;
            };
            _proto.expectKeyword = function expectKeyword(value) {
              var token = this._lexer.token;
              if (token.kind === _tokenKind.TokenKind.NAME && token.value === value) {
                this._lexer.advance();
              } else {
                throw (0, _syntaxError.syntaxError)(this._lexer.source, token.start, 'Expected "'.concat(value, '", found ').concat(getTokenDesc(token), "."));
              }
            };
            _proto.expectOptionalKeyword = function expectOptionalKeyword(value) {
              var token = this._lexer.token;
              if (token.kind === _tokenKind.TokenKind.NAME && token.value === value) {
                this._lexer.advance();
                return true;
              }
              return false;
            };
            _proto.unexpected = function unexpected(atToken) {
              var token = atToken !== null && atToken !== void 0 ? atToken : this._lexer.token;
              return (0, _syntaxError.syntaxError)(this._lexer.source, token.start, "Unexpected ".concat(getTokenDesc(token), "."));
            };
            _proto.any = function any(openKind, parseFn, closeKind) {
              this.expectToken(openKind);
              var nodes = [];
              while (!this.expectOptionalToken(closeKind)) {
                nodes.push(parseFn.call(this));
              }
              return nodes;
            };
            _proto.optionalMany = function optionalMany(openKind, parseFn, closeKind) {
              if (this.expectOptionalToken(openKind)) {
                var nodes = [];
                do {
                  nodes.push(parseFn.call(this));
                } while (!this.expectOptionalToken(closeKind));
                return nodes;
              }
              return [];
            };
            _proto.many = function many(openKind, parseFn, closeKind) {
              this.expectToken(openKind);
              var nodes = [];
              do {
                nodes.push(parseFn.call(this));
              } while (!this.expectOptionalToken(closeKind));
              return nodes;
            };
            _proto.delimitedMany = function delimitedMany(delimiterKind, parseFn) {
              this.expectOptionalToken(delimiterKind);
              var nodes = [];
              do {
                nodes.push(parseFn.call(this));
              } while (this.expectOptionalToken(delimiterKind));
              return nodes;
            };
            return Parser2;
          }();
          exports2.Parser = Parser;
          function getTokenDesc(token) {
            var value = token.value;
            return getTokenKindDesc(token.kind) + (value != null ? ' "'.concat(value, '"') : "");
          }
          function getTokenKindDesc(kind) {
            return (0, _lexer.isPunctuatorTokenKind)(kind) ? '"'.concat(kind, '"') : kind;
          }
        }
      });
      init_define_process();
      var createError = require_parser_create_error();
      var tryCombinations = require_try_combinations();
      var {
        hasPragma
      } = require_pragma();
      var {
        locStart,
        locEnd
      } = require_loc();
      function parseComments(ast) {
        const comments = [];
        const {
          startToken
        } = ast.loc;
        let {
          next
        } = startToken;
        while (next.kind !== "<EOF>") {
          if (next.kind === "Comment") {
            Object.assign(next, {
              column: next.column - 1
            });
            comments.push(next);
          }
          next = next.next;
        }
        return comments;
      }
      function removeTokens(node) {
        if (node && typeof node === "object") {
          delete node.startToken;
          delete node.endToken;
          delete node.prev;
          delete node.next;
          for (const key in node) {
            removeTokens(node[key]);
          }
        }
        return node;
      }
      var parseOptions = {
        allowLegacySDLImplementsInterfaces: false,
        experimentalFragmentVariables: true
      };
      function createParseError(error) {
        const {
          GraphQLError
        } = require_GraphQLError();
        if (error instanceof GraphQLError) {
          const {
            message,
            locations: [start]
          } = error;
          return createError(message, {
            start
          });
        }
        return error;
      }
      function parse(text) {
        const {
          parse: parse2
        } = require_parser();
        const {
          result: ast,
          error
        } = tryCombinations(() => parse2(text, Object.assign({}, parseOptions)), () => parse2(text, Object.assign(Object.assign({}, parseOptions), {}, {
          allowLegacySDLImplementsInterfaces: true
        })));
        if (!ast) {
          throw createParseError(error);
        }
        ast.comments = parseComments(ast);
        removeTokens(ast);
        return ast;
      }
      module.exports = {
        parsers: {
          graphql: {
            parse,
            astFormat: "graphql",
            hasPragma,
            locStart,
            locEnd
          }
        }
      };
    }
  });
  return require_parser_graphql_js_umd();
});