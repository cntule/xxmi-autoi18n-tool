// dist/_parser-yaml.js.esm.mjs
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = {
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
    for (let key of __getOwnPropNames(from))
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
var define_process_default;
var init_define_process = __esm({
  "<define:process>"() {
    define_process_default = {
      env: {},
      argv: []
    };
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
var require_pragma = __commonJS({
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
var require_loc = __commonJS({
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
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
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
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
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
      return new Promise(function(resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function(v2) {
      resolve({
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
var require_build = __commonJS({
  "node_modules/yaml-unist-parser/node_modules/lines-and-columns/build/index.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    exports.LinesAndColumns = void 0;
    var LF = "\n";
    var CR = "\r";
    var LinesAndColumns = function() {
      function LinesAndColumns2(string) {
        this.string = string;
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
        if (index < 0 || index > this.string.length) {
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
        var nextOffset = line === this.offsets.length - 1 ? this.string.length : this.offsets[line + 1];
        return nextOffset - offset;
      };
      return LinesAndColumns2;
    }();
    exports.LinesAndColumns = LinesAndColumns;
    exports["default"] = LinesAndColumns;
  }
});
var require_define_parents = __commonJS({
  "node_modules/yaml-unist-parser/lib/utils/define-parents.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    function defineParents(node, parent) {
      if (parent === void 0) {
        parent = null;
      }
      if ("children" in node) {
        node.children.forEach(function(child) {
          return defineParents(child, node);
        });
      }
      if ("anchor" in node && node.anchor) {
        defineParents(node.anchor, node);
      }
      if ("tag" in node && node.tag) {
        defineParents(node.tag, node);
      }
      if ("leadingComments" in node) {
        node.leadingComments.forEach(function(comment) {
          return defineParents(comment, node);
        });
      }
      if ("middleComments" in node) {
        node.middleComments.forEach(function(comment) {
          return defineParents(comment, node);
        });
      }
      if ("indicatorComment" in node && node.indicatorComment) {
        defineParents(node.indicatorComment, node);
      }
      if ("trailingComment" in node && node.trailingComment) {
        defineParents(node.trailingComment, node);
      }
      if ("endComments" in node) {
        node.endComments.forEach(function(comment) {
          return defineParents(comment, node);
        });
      }
      Object.defineProperty(node, "_parent", {
        value: parent,
        enumerable: false
      });
    }
    exports.defineParents = defineParents;
  }
});
var require_get_point_text = __commonJS({
  "node_modules/yaml-unist-parser/lib/utils/get-point-text.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    function getPointText(point) {
      return point.line + ":" + point.column;
    }
    exports.getPointText = getPointText;
  }
});
var require_attach = __commonJS({
  "node_modules/yaml-unist-parser/lib/attach.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var define_parents_1 = require_define_parents();
    var get_point_text_1 = require_get_point_text();
    function attachComments(root) {
      define_parents_1.defineParents(root);
      var nodeTable = createNodeTable(root);
      var restDocuments = root.children.slice();
      root.comments.sort(function(a, b) {
        return a.position.start.offset - b.position.end.offset;
      }).filter(function(comment) {
        return !comment._parent;
      }).forEach(function(comment) {
        while (restDocuments.length > 1 && comment.position.start.line > restDocuments[0].position.end.line) {
          restDocuments.shift();
        }
        attachComment(comment, nodeTable, restDocuments[0]);
      });
    }
    exports.attachComments = attachComments;
    function createNodeTable(root) {
      var nodeTable = Array.from(new Array(root.position.end.line), function() {
        return {};
      });
      for (var _i = 0, _a = root.comments; _i < _a.length; _i++) {
        var comment = _a[_i];
        nodeTable[comment.position.start.line - 1].comment = comment;
      }
      initNodeTable(nodeTable, root);
      return nodeTable;
    }
    function initNodeTable(nodeTable, node) {
      if (node.position.start.offset === node.position.end.offset) {
        return;
      }
      if ("leadingComments" in node) {
        var start = node.position.start;
        var leadingAttachableNode = nodeTable[start.line - 1].leadingAttachableNode;
        if (!leadingAttachableNode || start.column < leadingAttachableNode.position.start.column) {
          nodeTable[start.line - 1].leadingAttachableNode = node;
        }
      }
      if ("trailingComment" in node && node.position.end.column > 1 && node.type !== "document" && node.type !== "documentHead") {
        var end = node.position.end;
        var trailingAttachableNode = nodeTable[end.line - 1].trailingAttachableNode;
        if (!trailingAttachableNode || end.column >= trailingAttachableNode.position.end.column) {
          nodeTable[end.line - 1].trailingAttachableNode = node;
        }
      }
      if (node.type !== "root" && node.type !== "document" && node.type !== "documentHead" && node.type !== "documentBody") {
        var _a = node.position, start = _a.start, end = _a.end;
        var lines = [end.line].concat(start.line === end.line ? [] : start.line);
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
          var line = lines_1[_i];
          var currentEndNode = nodeTable[line - 1].trailingNode;
          if (!currentEndNode || end.column >= currentEndNode.position.end.column) {
            nodeTable[line - 1].trailingNode = node;
          }
        }
      }
      if ("children" in node) {
        node.children.forEach(function(child) {
          initNodeTable(nodeTable, child);
        });
      }
    }
    function attachComment(comment, nodeTable, document) {
      var commentLine = comment.position.start.line;
      var trailingAttachableNode = nodeTable[commentLine - 1].trailingAttachableNode;
      if (trailingAttachableNode) {
        if (trailingAttachableNode.trailingComment) {
          throw new Error("Unexpected multiple trailing comment at " + get_point_text_1.getPointText(comment.position.start));
        }
        define_parents_1.defineParents(comment, trailingAttachableNode);
        trailingAttachableNode.trailingComment = comment;
        return;
      }
      for (var line = commentLine; line >= document.position.start.line; line--) {
        var trailingNode = nodeTable[line - 1].trailingNode;
        var currentNode = void 0;
        if (!trailingNode) {
          if (line !== commentLine && nodeTable[line - 1].comment) {
            currentNode = nodeTable[line - 1].comment._parent;
          } else {
            continue;
          }
        } else {
          currentNode = trailingNode;
        }
        if (currentNode.type === "sequence" || currentNode.type === "mapping") {
          currentNode = currentNode.children[0];
        }
        if (currentNode.type === "mappingItem") {
          var _a = currentNode.children, mappingKey = _a[0], mappingValue = _a[1];
          currentNode = isExplicitMappingKey(mappingKey) ? mappingKey : mappingValue;
        }
        while (true) {
          if (shouldOwnEndComment(currentNode, comment)) {
            define_parents_1.defineParents(comment, currentNode);
            currentNode.endComments.push(comment);
            return;
          }
          if (!currentNode._parent) {
            break;
          }
          currentNode = currentNode._parent;
        }
        break;
      }
      for (var line = commentLine + 1; line <= document.position.end.line; line++) {
        var leadingAttachableNode = nodeTable[line - 1].leadingAttachableNode;
        if (leadingAttachableNode) {
          define_parents_1.defineParents(comment, leadingAttachableNode);
          leadingAttachableNode.leadingComments.push(comment);
          return;
        }
      }
      var documentBody = document.children[1];
      define_parents_1.defineParents(comment, documentBody);
      documentBody.endComments.push(comment);
    }
    function shouldOwnEndComment(node, comment) {
      if (node.position.start.offset < comment.position.start.offset && node.position.end.offset > comment.position.end.offset) {
        switch (node.type) {
          case "flowMapping":
          case "flowSequence":
            return node.children.length === 0 || comment.position.start.line > node.children[node.children.length - 1].position.end.line;
        }
      }
      if (comment.position.end.offset < node.position.end.offset) {
        return false;
      }
      switch (node.type) {
        case "sequenceItem":
          return comment.position.start.column > node.position.start.column;
        case "mappingKey":
        case "mappingValue":
          return comment.position.start.column > node._parent.position.start.column && (node.children.length === 0 || node.children.length === 1 && node.children[0].type !== "blockFolded" && node.children[0].type !== "blockLiteral") && (node.type === "mappingValue" || isExplicitMappingKey(node));
        default:
          return false;
      }
    }
    function isExplicitMappingKey(node) {
      return node.position.start !== node.position.end && (node.children.length === 0 || node.position.start.offset !== node.children[0].position.start.offset);
    }
  }
});
var require_node = __commonJS({
  "node_modules/yaml-unist-parser/lib/factories/node.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    function createNode(type, position) {
      return {
        type,
        position
      };
    }
    exports.createNode = createNode;
  }
});
var require_root = __commonJS({
  "node_modules/yaml-unist-parser/lib/factories/root.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var node_1 = require_node();
    function createRoot(position, children, comments) {
      return tslib_1.__assign(tslib_1.__assign({}, node_1.createNode("root", position)), {
        children,
        comments
      });
    }
    exports.createRoot = createRoot;
  }
});
var require_preprocess = __commonJS({
  "node_modules/yaml-unist-parser/lib/preprocess.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    function removeCstBlankLine(node) {
      switch (node.type) {
        case "DOCUMENT":
          for (var i = node.contents.length - 1; i >= 0; i--) {
            if (node.contents[i].type === "BLANK_LINE") {
              node.contents.splice(i, 1);
            } else {
              removeCstBlankLine(node.contents[i]);
            }
          }
          for (var i = node.directives.length - 1; i >= 0; i--) {
            if (node.directives[i].type === "BLANK_LINE") {
              node.directives.splice(i, 1);
            }
          }
          break;
        case "FLOW_MAP":
        case "FLOW_SEQ":
        case "MAP":
        case "SEQ":
          for (var i = node.items.length - 1; i >= 0; i--) {
            var item = node.items[i];
            if ("char" in item) {
              continue;
            }
            if (item.type === "BLANK_LINE") {
              node.items.splice(i, 1);
            } else {
              removeCstBlankLine(item);
            }
          }
          break;
        case "MAP_KEY":
        case "MAP_VALUE":
        case "SEQ_ITEM":
          if (node.node) {
            removeCstBlankLine(node.node);
          }
          break;
        case "ALIAS":
        case "BLANK_LINE":
        case "BLOCK_FOLDED":
        case "BLOCK_LITERAL":
        case "COMMENT":
        case "DIRECTIVE":
        case "PLAIN":
        case "QUOTE_DOUBLE":
        case "QUOTE_SINGLE":
          break;
        default:
          throw new Error("Unexpected node type " + JSON.stringify(node.type));
      }
    }
    exports.removeCstBlankLine = removeCstBlankLine;
  }
});
var require_leading_comment_attachable = __commonJS({
  "node_modules/yaml-unist-parser/lib/factories/leading-comment-attachable.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    function createLeadingCommentAttachable() {
      return {
        leadingComments: []
      };
    }
    exports.createLeadingCommentAttachable = createLeadingCommentAttachable;
  }
});
var require_trailing_comment_attachable = __commonJS({
  "node_modules/yaml-unist-parser/lib/factories/trailing-comment-attachable.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    function createTrailingCommentAttachable(trailingComment) {
      if (trailingComment === void 0) {
        trailingComment = null;
      }
      return {
        trailingComment
      };
    }
    exports.createTrailingCommentAttachable = createTrailingCommentAttachable;
  }
});
var require_comment_attachable = __commonJS({
  "node_modules/yaml-unist-parser/lib/factories/comment-attachable.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var leading_comment_attachable_1 = require_leading_comment_attachable();
    var trailing_comment_attachable_1 = require_trailing_comment_attachable();
    function createCommentAttachable() {
      return tslib_1.__assign(tslib_1.__assign({}, leading_comment_attachable_1.createLeadingCommentAttachable()), trailing_comment_attachable_1.createTrailingCommentAttachable());
    }
    exports.createCommentAttachable = createCommentAttachable;
  }
});
var require_alias = __commonJS({
  "node_modules/yaml-unist-parser/lib/factories/alias.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var comment_attachable_1 = require_comment_attachable();
    var node_1 = require_node();
    function createAlias(position, content, value) {
      return tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, node_1.createNode("alias", position)), comment_attachable_1.createCommentAttachable()), content), {
        value
      });
    }
    exports.createAlias = createAlias;
  }
});
var require_alias2 = __commonJS({
  "node_modules/yaml-unist-parser/lib/transforms/alias.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var alias_1 = require_alias();
    function transformAlias(alias, context) {
      var cstNode = alias.cstNode;
      return alias_1.createAlias(context.transformRange({
        origStart: cstNode.valueRange.origStart - 1,
        origEnd: cstNode.valueRange.origEnd
      }), context.transformContent(alias), cstNode.rawValue);
    }
    exports.transformAlias = transformAlias;
  }
});
var require_block_folded = __commonJS({
  "node_modules/yaml-unist-parser/lib/factories/block-folded.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    function createBlockFolded(blockValue) {
      return tslib_1.__assign(tslib_1.__assign({}, blockValue), {
        type: "blockFolded"
      });
    }
    exports.createBlockFolded = createBlockFolded;
  }
});
var require_block_value = __commonJS({
  "node_modules/yaml-unist-parser/lib/factories/block-value.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var leading_comment_attachable_1 = require_leading_comment_attachable();
    var node_1 = require_node();
    function createBlockValue(position, content, chomping, indent, value, indicatorComment) {
      return tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, node_1.createNode("blockValue", position)), leading_comment_attachable_1.createLeadingCommentAttachable()), content), {
        chomping,
        indent,
        value,
        indicatorComment
      });
    }
    exports.createBlockValue = createBlockValue;
  }
});
var require_constants = __commonJS({
  "node_modules/yaml-unist-parser/lib/constants.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var PropLeadingCharacter;
    (function(PropLeadingCharacter2) {
      PropLeadingCharacter2["Tag"] = "!";
      PropLeadingCharacter2["Anchor"] = "&";
      PropLeadingCharacter2["Comment"] = "#";
    })(PropLeadingCharacter = exports.PropLeadingCharacter || (exports.PropLeadingCharacter = {}));
  }
});
var require_anchor = __commonJS({
  "node_modules/yaml-unist-parser/lib/factories/anchor.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var node_1 = require_node();
    function createAnchor(position, value) {
      return tslib_1.__assign(tslib_1.__assign({}, node_1.createNode("anchor", position)), {
        value
      });
    }
    exports.createAnchor = createAnchor;
  }
});
var require_comment = __commonJS({
  "node_modules/yaml-unist-parser/lib/factories/comment.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var node_1 = require_node();
    function createComment(position, value) {
      return tslib_1.__assign(tslib_1.__assign({}, node_1.createNode("comment", position)), {
        value
      });
    }
    exports.createComment = createComment;
  }
});
var require_content = __commonJS({
  "node_modules/yaml-unist-parser/lib/factories/content.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    function createContent(tag, anchor, middleComments) {
      return {
        anchor,
        tag,
        middleComments
      };
    }
    exports.createContent = createContent;
  }
});
var require_tag = __commonJS({
  "node_modules/yaml-unist-parser/lib/factories/tag.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var node_1 = require_node();
    function createTag(position, value) {
      return tslib_1.__assign(tslib_1.__assign({}, node_1.createNode("tag", position)), {
        value
      });
    }
    exports.createTag = createTag;
  }
});
var require_content2 = __commonJS({
  "node_modules/yaml-unist-parser/lib/transforms/content.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var constants_1 = require_constants();
    var anchor_1 = require_anchor();
    var comment_1 = require_comment();
    var content_1 = require_content();
    var tag_1 = require_tag();
    function transformContent(node, context, isNotMiddleComment) {
      if (isNotMiddleComment === void 0) {
        isNotMiddleComment = function() {
          return false;
        };
      }
      var cstNode = node.cstNode;
      var middleComments = [];
      var firstTagOrAnchorRange = null;
      var tag = null;
      var anchor = null;
      for (var _i = 0, _a = cstNode.props; _i < _a.length; _i++) {
        var propRange = _a[_i];
        var leadingChar = context.text[propRange.origStart];
        switch (leadingChar) {
          case constants_1.PropLeadingCharacter.Tag:
            firstTagOrAnchorRange = firstTagOrAnchorRange || propRange;
            tag = tag_1.createTag(context.transformRange(propRange), node.tag);
            break;
          case constants_1.PropLeadingCharacter.Anchor:
            firstTagOrAnchorRange = firstTagOrAnchorRange || propRange;
            anchor = anchor_1.createAnchor(context.transformRange(propRange), cstNode.anchor);
            break;
          case constants_1.PropLeadingCharacter.Comment: {
            var comment = comment_1.createComment(context.transformRange(propRange), context.text.slice(propRange.origStart + 1, propRange.origEnd));
            context.comments.push(comment);
            if (!isNotMiddleComment(comment) && firstTagOrAnchorRange && firstTagOrAnchorRange.origEnd <= propRange.origStart && propRange.origEnd <= cstNode.valueRange.origStart) {
              middleComments.push(comment);
            }
            break;
          }
          default:
            throw new Error("Unexpected leading character " + JSON.stringify(leadingChar));
        }
      }
      return content_1.createContent(tag, anchor, middleComments);
    }
    exports.transformContent = transformContent;
  }
});
var require_block_value2 = __commonJS({
  "node_modules/yaml-unist-parser/lib/transforms/block-value.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var block_value_1 = require_block_value();
    var get_point_text_1 = require_get_point_text();
    var content_1 = require_content2();
    var Chomping;
    (function(Chomping2) {
      Chomping2["CLIP"] = "clip";
      Chomping2["STRIP"] = "strip";
      Chomping2["KEEP"] = "keep";
    })(Chomping || (Chomping = {}));
    function transformAstBlockValue(blockValue, context) {
      var cstNode = blockValue.cstNode;
      var indicatorLength = 1;
      var chompingLength = cstNode.chomping === "CLIP" ? 0 : 1;
      var headerLength = cstNode.header.origEnd - cstNode.header.origStart;
      var hasExplicitBlockIndent = headerLength - indicatorLength - chompingLength !== 0;
      var position = context.transformRange({
        origStart: cstNode.header.origStart,
        origEnd: cstNode.valueRange.origEnd
      });
      var indicatorComment = null;
      var content = content_1.transformContent(blockValue, context, function(comment) {
        var isIndicatorComment = position.start.offset < comment.position.start.offset && comment.position.end.offset < position.end.offset;
        if (!isIndicatorComment) {
          return false;
        }
        if (indicatorComment) {
          throw new Error("Unexpected multiple indicator comments at " + get_point_text_1.getPointText(comment.position.start));
        }
        indicatorComment = comment;
        return true;
      });
      return block_value_1.createBlockValue(position, content, Chomping[cstNode.chomping], hasExplicitBlockIndent ? cstNode.blockIndent : null, cstNode.strValue, indicatorComment);
    }
    exports.transformAstBlockValue = transformAstBlockValue;
  }
});
var require_block_folded2 = __commonJS({
  "node_modules/yaml-unist-parser/lib/transforms/block-folded.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var block_folded_1 = require_block_folded();
    var block_value_1 = require_block_value2();
    function transformBlockFolded(blockFolded, context) {
      return block_folded_1.createBlockFolded(block_value_1.transformAstBlockValue(blockFolded, context));
    }
    exports.transformBlockFolded = transformBlockFolded;
  }
});
var require_block_literal = __commonJS({
  "node_modules/yaml-unist-parser/lib/factories/block-literal.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    function createBlockLiteral(blockValue) {
      return tslib_1.__assign(tslib_1.__assign({}, blockValue), {
        type: "blockLiteral"
      });
    }
    exports.createBlockLiteral = createBlockLiteral;
  }
});
var require_block_literal2 = __commonJS({
  "node_modules/yaml-unist-parser/lib/transforms/block-literal.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var block_literal_1 = require_block_literal();
    var block_value_1 = require_block_value2();
    function transformBlockLiteral(blockLiteral, context) {
      return block_literal_1.createBlockLiteral(block_value_1.transformAstBlockValue(blockLiteral, context));
    }
    exports.transformBlockLiteral = transformBlockLiteral;
  }
});
var require_comment2 = __commonJS({
  "node_modules/yaml-unist-parser/lib/transforms/comment.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var comment_1 = require_comment();
    function transformComment(comment, context) {
      return comment_1.createComment(context.transformRange(comment.range), comment.comment);
    }
    exports.transformComment = transformComment;
  }
});
var require_directive = __commonJS({
  "node_modules/yaml-unist-parser/lib/factories/directive.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var comment_attachable_1 = require_comment_attachable();
    var node_1 = require_node();
    function createDirective(position, name, parameters) {
      return tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, node_1.createNode("directive", position)), comment_attachable_1.createCommentAttachable()), {
        name,
        parameters
      });
    }
    exports.createDirective = createDirective;
  }
});
var require_extract_prop_comments = __commonJS({
  "node_modules/yaml-unist-parser/lib/utils/extract-prop-comments.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var constants_1 = require_constants();
    var comment_1 = require_comment();
    function extractPropComments(node, context) {
      for (var _i = 0, _a = node.props; _i < _a.length; _i++) {
        var propRange = _a[_i];
        var leadingChar = context.text[propRange.origStart];
        switch (leadingChar) {
          case constants_1.PropLeadingCharacter.Comment:
            context.comments.push(comment_1.createComment(context.transformRange(propRange), context.text.slice(propRange.origStart + 1, propRange.origEnd)));
            break;
          default:
            throw new Error("Unexpected leading character " + JSON.stringify(leadingChar));
        }
      }
    }
    exports.extractPropComments = extractPropComments;
  }
});
var require_directive2 = __commonJS({
  "node_modules/yaml-unist-parser/lib/transforms/directive.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var directive_1 = require_directive();
    var extract_prop_comments_1 = require_extract_prop_comments();
    function transformDirective(directive, context) {
      extract_prop_comments_1.extractPropComments(directive, context);
      return directive_1.createDirective(context.transformRange(directive.range), directive.name, directive.parameters);
    }
    exports.transformDirective = transformDirective;
  }
});
var require_document = __commonJS({
  "node_modules/yaml-unist-parser/lib/factories/document.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var node_1 = require_node();
    var trailing_comment_attachable_1 = require_trailing_comment_attachable();
    function createDocument(position, head, body, trailingComment) {
      return tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, node_1.createNode("document", position)), trailing_comment_attachable_1.createTrailingCommentAttachable(trailingComment)), {
        children: [head, body]
      });
    }
    exports.createDocument = createDocument;
  }
});
var require_position = __commonJS({
  "node_modules/yaml-unist-parser/lib/factories/position.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    function createPosition(start, end) {
      return {
        start,
        end
      };
    }
    exports.createPosition = createPosition;
    function createEmptyPosition(point) {
      return {
        start: point,
        end: point
      };
    }
    exports.createEmptyPosition = createEmptyPosition;
  }
});
var require_end_comment_attachable = __commonJS({
  "node_modules/yaml-unist-parser/lib/factories/end-comment-attachable.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    function createEndCommentAttachable(endComments) {
      if (endComments === void 0) {
        endComments = [];
      }
      return {
        endComments
      };
    }
    exports.createEndCommentAttachable = createEndCommentAttachable;
  }
});
var require_document_body = __commonJS({
  "node_modules/yaml-unist-parser/lib/factories/document-body.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var end_comment_attachable_1 = require_end_comment_attachable();
    var node_1 = require_node();
    function createDocumentBody(position, content, endComments) {
      return tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, node_1.createNode("documentBody", position)), end_comment_attachable_1.createEndCommentAttachable(endComments)), {
        children: !content ? [] : [content]
      });
    }
    exports.createDocumentBody = createDocumentBody;
  }
});
var require_get_last = __commonJS({
  "node_modules/yaml-unist-parser/lib/utils/get-last.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    function getLast(array) {
      return array[array.length - 1];
    }
    exports.getLast = getLast;
  }
});
var require_get_match_index = __commonJS({
  "node_modules/yaml-unist-parser/lib/utils/get-match-index.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    function getMatchIndex(text, regex) {
      var match = text.match(regex);
      return match ? match.index : -1;
    }
    exports.getMatchIndex = getMatchIndex;
  }
});
var require_document_body2 = __commonJS({
  "node_modules/yaml-unist-parser/lib/transforms/document-body.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var document_body_1 = require_document_body();
    var get_last_1 = require_get_last();
    var get_match_index_1 = require_get_match_index();
    var get_point_text_1 = require_get_point_text();
    function transformDocumentBody(document, context, headEndMarkerPoint) {
      var _a;
      var cstNode = document.cstNode;
      var _b = categorizeNodes(cstNode, context, headEndMarkerPoint), comments = _b.comments, endComments = _b.endComments, documentTrailingComment = _b.documentTrailingComment, documentHeadTrailingComment = _b.documentHeadTrailingComment;
      var content = context.transformNode(document.contents);
      var _c = getPosition(cstNode, content, context), position = _c.position, documentEndPoint = _c.documentEndPoint;
      (_a = context.comments).push.apply(_a, tslib_1.__spreadArrays(comments, endComments));
      return {
        documentBody: document_body_1.createDocumentBody(position, content, endComments),
        documentEndPoint,
        documentTrailingComment,
        documentHeadTrailingComment
      };
    }
    exports.transformDocumentBody = transformDocumentBody;
    function categorizeNodes(document, context, headEndMarkerPoint) {
      var comments = [];
      var endComments = [];
      var documentTrailingComments = [];
      var documentHeadTrailingComments = [];
      var hasContent = false;
      for (var i = document.contents.length - 1; i >= 0; i--) {
        var node = document.contents[i];
        if (node.type === "COMMENT") {
          var comment = context.transformNode(node);
          if (headEndMarkerPoint && headEndMarkerPoint.line === comment.position.start.line) {
            documentHeadTrailingComments.unshift(comment);
          } else if (hasContent) {
            comments.unshift(comment);
          } else if (comment.position.start.offset >= document.valueRange.origEnd) {
            documentTrailingComments.unshift(comment);
          } else {
            comments.unshift(comment);
          }
        } else {
          hasContent = true;
        }
      }
      if (documentTrailingComments.length > 1) {
        throw new Error("Unexpected multiple document trailing comments at " + get_point_text_1.getPointText(documentTrailingComments[1].position.start));
      }
      if (documentHeadTrailingComments.length > 1) {
        throw new Error("Unexpected multiple documentHead trailing comments at " + get_point_text_1.getPointText(documentHeadTrailingComments[1].position.start));
      }
      return {
        comments,
        endComments,
        documentTrailingComment: get_last_1.getLast(documentTrailingComments) || null,
        documentHeadTrailingComment: get_last_1.getLast(documentHeadTrailingComments) || null
      };
    }
    function getPosition(document, content, context) {
      var markerIndex = get_match_index_1.getMatchIndex(context.text.slice(document.valueRange.origEnd), /^\.\.\./);
      var origEnd = markerIndex === -1 ? document.valueRange.origEnd : Math.max(0, document.valueRange.origEnd - 1);
      if (context.text[origEnd - 1] === "\r") {
        origEnd--;
      }
      var position = context.transformRange({
        origStart: content !== null ? content.position.start.offset : origEnd,
        origEnd
      });
      var documentEndPoint = markerIndex === -1 ? position.end : context.transformOffset(document.valueRange.origEnd + 3);
      return {
        position,
        documentEndPoint
      };
    }
  }
});
var require_document_head = __commonJS({
  "node_modules/yaml-unist-parser/lib/factories/document-head.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var end_comment_attachable_1 = require_end_comment_attachable();
    var node_1 = require_node();
    var trailing_comment_attachable_1 = require_trailing_comment_attachable();
    function createDocumentHead(position, children, endComments, trailingComment) {
      return tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, node_1.createNode("documentHead", position)), end_comment_attachable_1.createEndCommentAttachable(endComments)), trailing_comment_attachable_1.createTrailingCommentAttachable(trailingComment)), {
        children
      });
    }
    exports.createDocumentHead = createDocumentHead;
  }
});
var require_document_head2 = __commonJS({
  "node_modules/yaml-unist-parser/lib/transforms/document-head.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var document_head_1 = require_document_head();
    var get_match_index_1 = require_get_match_index();
    function transformDocumentHead(document, context) {
      var _a;
      var cstNode = document.cstNode;
      var _b = categorizeNodes(cstNode, context), directives = _b.directives, comments = _b.comments, endComments = _b.endComments;
      var _c = getPosition(cstNode, directives, context), position = _c.position, endMarkerPoint = _c.endMarkerPoint;
      (_a = context.comments).push.apply(_a, tslib_1.__spreadArrays(comments, endComments));
      var createDocumentHeadWithTrailingComment = function(trailingComment) {
        if (trailingComment) {
          context.comments.push(trailingComment);
        }
        return document_head_1.createDocumentHead(position, directives, endComments, trailingComment);
      };
      return {
        createDocumentHeadWithTrailingComment,
        documentHeadEndMarkerPoint: endMarkerPoint
      };
    }
    exports.transformDocumentHead = transformDocumentHead;
    function categorizeNodes(document, context) {
      var directives = [];
      var comments = [];
      var endComments = [];
      var hasDirective = false;
      for (var i = document.directives.length - 1; i >= 0; i--) {
        var node = context.transformNode(document.directives[i]);
        if (node.type === "comment") {
          if (hasDirective) {
            comments.unshift(node);
          } else {
            endComments.unshift(node);
          }
        } else {
          hasDirective = true;
          directives.unshift(node);
        }
      }
      return {
        directives,
        comments,
        endComments
      };
    }
    function getPosition(document, directives, context) {
      var endMarkerIndex = get_match_index_1.getMatchIndex(context.text.slice(0, document.valueRange.origStart), /---\s*$/);
      if (endMarkerIndex > 0 && !/[\r\n]/.test(context.text[endMarkerIndex - 1])) {
        endMarkerIndex = -1;
      }
      var range = endMarkerIndex === -1 ? {
        origStart: document.valueRange.origStart,
        origEnd: document.valueRange.origStart
      } : {
        origStart: endMarkerIndex,
        origEnd: endMarkerIndex + 3
      };
      if (directives.length !== 0) {
        range.origStart = directives[0].position.start.offset;
      }
      return {
        position: context.transformRange(range),
        endMarkerPoint: endMarkerIndex === -1 ? null : context.transformOffset(endMarkerIndex)
      };
    }
  }
});
var require_document2 = __commonJS({
  "node_modules/yaml-unist-parser/lib/transforms/document.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var document_1 = require_document();
    var position_1 = require_position();
    var document_body_1 = require_document_body2();
    var document_head_1 = require_document_head2();
    function transformDocument(document, context) {
      var _a = document_head_1.transformDocumentHead(document, context), createDocumentHeadWithTrailingComment = _a.createDocumentHeadWithTrailingComment, documentHeadEndMarkerPoint = _a.documentHeadEndMarkerPoint;
      var _b = document_body_1.transformDocumentBody(document, context, documentHeadEndMarkerPoint), documentBody = _b.documentBody, documentEndPoint = _b.documentEndPoint, documentTrailingComment = _b.documentTrailingComment, documentHeadTrailingComment = _b.documentHeadTrailingComment;
      var documentHead = createDocumentHeadWithTrailingComment(documentHeadTrailingComment);
      if (documentTrailingComment) {
        context.comments.push(documentTrailingComment);
      }
      return document_1.createDocument(position_1.createPosition(documentHead.position.start, documentEndPoint), documentHead, documentBody, documentTrailingComment);
    }
    exports.transformDocument = transformDocument;
  }
});
var require_flow_collection = __commonJS({
  "node_modules/yaml-unist-parser/lib/factories/flow-collection.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var comment_attachable_1 = require_comment_attachable();
    var end_comment_attachable_1 = require_end_comment_attachable();
    var node_1 = require_node();
    function createFlowCollection(position, content, children) {
      return tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, node_1.createNode("flowCollection", position)), comment_attachable_1.createCommentAttachable()), end_comment_attachable_1.createEndCommentAttachable()), content), {
        children
      });
    }
    exports.createFlowCollection = createFlowCollection;
  }
});
var require_flow_mapping = __commonJS({
  "node_modules/yaml-unist-parser/lib/factories/flow-mapping.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var flow_collection_1 = require_flow_collection();
    function createFlowMapping(position, content, children) {
      return tslib_1.__assign(tslib_1.__assign({}, flow_collection_1.createFlowCollection(position, content, children)), {
        type: "flowMapping"
      });
    }
    exports.createFlowMapping = createFlowMapping;
  }
});
var require_flow_mapping_item = __commonJS({
  "node_modules/yaml-unist-parser/lib/factories/flow-mapping-item.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var leading_comment_attachable_1 = require_leading_comment_attachable();
    var node_1 = require_node();
    function createFlowMappingItem(position, key, value) {
      return tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, node_1.createNode("flowMappingItem", position)), leading_comment_attachable_1.createLeadingCommentAttachable()), {
        children: [key, value]
      });
    }
    exports.createFlowMappingItem = createFlowMappingItem;
  }
});
var require_extract_comments = __commonJS({
  "node_modules/yaml-unist-parser/lib/utils/extract-comments.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    function extractComments(nodes, context) {
      var restNodes = [];
      for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
        var node = nodes_1[_i];
        if (node && "type" in node && node.type === "COMMENT") {
          context.comments.push(context.transformNode(node));
        } else {
          restNodes.push(node);
        }
      }
      return restNodes;
    }
    exports.extractComments = extractComments;
  }
});
var require_get_flow_map_item_additional_ranges = __commonJS({
  "node_modules/yaml-unist-parser/lib/utils/get-flow-map-item-additional-ranges.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    function getFlowMapItemAdditionalRanges(cstNodes) {
      var _a = ["?", ":"].map(function(char) {
        var flowChar = cstNodes.find(function(cstNode) {
          return "char" in cstNode && cstNode.char === char;
        });
        return flowChar ? {
          origStart: flowChar.origOffset,
          origEnd: flowChar.origOffset + 1
        } : null;
      }), questionMarkRange = _a[0], colonRange = _a[1];
      return {
        additionalKeyRange: questionMarkRange,
        additionalValueRange: colonRange
      };
    }
    exports.getFlowMapItemAdditionalRanges = getFlowMapItemAdditionalRanges;
  }
});
var require_create_slicer = __commonJS({
  "node_modules/yaml-unist-parser/lib/utils/create-slicer.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    function createSlicer(array, start) {
      var index = start;
      return function(end) {
        return array.slice(index, index = end);
      };
    }
    exports.createSlicer = createSlicer;
  }
});
var require_group_cst_flow_collection_items = __commonJS({
  "node_modules/yaml-unist-parser/lib/utils/group-cst-flow-collection-items.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var create_slicer_1 = require_create_slicer();
    function groupCstFlowCollectionItems(cstItems) {
      var groups = [];
      var sliceCstItems = create_slicer_1.createSlicer(cstItems, 1);
      var hasItem = false;
      for (var i = 1; i < cstItems.length - 1; i++) {
        var cstItem = cstItems[i];
        if ("char" in cstItem && cstItem.char === ",") {
          groups.push(sliceCstItems(i));
          sliceCstItems(i + 1);
          hasItem = false;
          continue;
        }
        hasItem = true;
      }
      if (hasItem) {
        groups.push(sliceCstItems(cstItems.length - 1));
      }
      return groups;
    }
    exports.groupCstFlowCollectionItems = groupCstFlowCollectionItems;
  }
});
var require_mapping_key = __commonJS({
  "node_modules/yaml-unist-parser/lib/factories/mapping-key.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var end_comment_attachable_1 = require_end_comment_attachable();
    var node_1 = require_node();
    var trailing_comment_attachable_1 = require_trailing_comment_attachable();
    function createMappingKey(position, content) {
      return tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, node_1.createNode("mappingKey", position)), trailing_comment_attachable_1.createTrailingCommentAttachable()), end_comment_attachable_1.createEndCommentAttachable()), {
        children: !content ? [] : [content]
      });
    }
    exports.createMappingKey = createMappingKey;
  }
});
var require_mapping_value = __commonJS({
  "node_modules/yaml-unist-parser/lib/factories/mapping-value.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var comment_attachable_1 = require_comment_attachable();
    var end_comment_attachable_1 = require_end_comment_attachable();
    var node_1 = require_node();
    function createMappingValue(position, content) {
      return tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, node_1.createNode("mappingValue", position)), comment_attachable_1.createCommentAttachable()), end_comment_attachable_1.createEndCommentAttachable()), {
        children: !content ? [] : [content]
      });
    }
    exports.createMappingValue = createMappingValue;
  }
});
var require_pair = __commonJS({
  "node_modules/yaml-unist-parser/lib/transforms/pair.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var mapping_key_1 = require_mapping_key();
    var mapping_value_1 = require_mapping_value();
    var position_1 = require_position();
    function transformAstPair(pair, context, createNode, additionalKeyRange, additionalValueRange) {
      var keyContent = context.transformNode(pair.key);
      var valueContent = context.transformNode(pair.value);
      var mappingKey = keyContent || additionalKeyRange ? mapping_key_1.createMappingKey(context.transformRange({
        origStart: additionalKeyRange ? additionalKeyRange.origStart : keyContent.position.start.offset,
        origEnd: keyContent ? keyContent.position.end.offset : additionalKeyRange.origStart + 1
      }), keyContent) : null;
      var mappingValue = valueContent || additionalValueRange ? mapping_value_1.createMappingValue(context.transformRange({
        origStart: additionalValueRange ? additionalValueRange.origStart : valueContent.position.start.offset,
        origEnd: valueContent ? valueContent.position.end.offset : additionalValueRange.origStart + 1
      }), valueContent) : null;
      return createNode(position_1.createPosition(mappingKey ? mappingKey.position.start : mappingValue.position.start, mappingValue ? mappingValue.position.end : mappingKey.position.end), mappingKey || mapping_key_1.createMappingKey(position_1.createEmptyPosition(mappingValue.position.start), null), mappingValue || mapping_value_1.createMappingValue(position_1.createEmptyPosition(mappingKey.position.end), null));
    }
    exports.transformAstPair = transformAstPair;
  }
});
var require_flow_map = __commonJS({
  "node_modules/yaml-unist-parser/lib/transforms/flow-map.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var flow_mapping_1 = require_flow_mapping();
    var flow_mapping_item_1 = require_flow_mapping_item();
    var extract_comments_1 = require_extract_comments();
    var get_flow_map_item_additional_ranges_1 = require_get_flow_map_item_additional_ranges();
    var get_last_1 = require_get_last();
    var group_cst_flow_collection_items_1 = require_group_cst_flow_collection_items();
    var pair_1 = require_pair();
    function transformFlowMap(flowMap, context) {
      var cstItemsWithoutComments = extract_comments_1.extractComments(flowMap.cstNode.items, context);
      var groupedCstItems = group_cst_flow_collection_items_1.groupCstFlowCollectionItems(cstItemsWithoutComments);
      var flowMappingItems = flowMap.items.map(function(pair, index) {
        var cstNodes = groupedCstItems[index];
        var _a = get_flow_map_item_additional_ranges_1.getFlowMapItemAdditionalRanges(cstNodes), additionalKeyRange = _a.additionalKeyRange, additionalValueRange = _a.additionalValueRange;
        return pair_1.transformAstPair(pair, context, flow_mapping_item_1.createFlowMappingItem, additionalKeyRange, additionalValueRange);
      });
      var openMarker = cstItemsWithoutComments[0];
      var closeMarker = get_last_1.getLast(cstItemsWithoutComments);
      return flow_mapping_1.createFlowMapping(context.transformRange({
        origStart: openMarker.origOffset,
        origEnd: closeMarker.origOffset + 1
      }), context.transformContent(flowMap), flowMappingItems);
    }
    exports.transformFlowMap = transformFlowMap;
  }
});
var require_flow_sequence = __commonJS({
  "node_modules/yaml-unist-parser/lib/factories/flow-sequence.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var flow_collection_1 = require_flow_collection();
    function createFlowSequence(position, content, children) {
      return tslib_1.__assign(tslib_1.__assign({}, flow_collection_1.createFlowCollection(position, content, children)), {
        type: "flowSequence"
      });
    }
    exports.createFlowSequence = createFlowSequence;
  }
});
var require_flow_sequence_item = __commonJS({
  "node_modules/yaml-unist-parser/lib/factories/flow-sequence-item.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var node_1 = require_node();
    function createFlowSequenceItem(position, content) {
      return tslib_1.__assign(tslib_1.__assign({}, node_1.createNode("flowSequenceItem", position)), {
        children: [content]
      });
    }
    exports.createFlowSequenceItem = createFlowSequenceItem;
  }
});
var require_flow_seq = __commonJS({
  "node_modules/yaml-unist-parser/lib/transforms/flow-seq.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var flow_mapping_item_1 = require_flow_mapping_item();
    var flow_sequence_1 = require_flow_sequence();
    var flow_sequence_item_1 = require_flow_sequence_item();
    var position_1 = require_position();
    var extract_comments_1 = require_extract_comments();
    var get_flow_map_item_additional_ranges_1 = require_get_flow_map_item_additional_ranges();
    var get_last_1 = require_get_last();
    var group_cst_flow_collection_items_1 = require_group_cst_flow_collection_items();
    var pair_1 = require_pair();
    function transformFlowSeq(flowSeq, context) {
      var cstItemsWithoutComments = extract_comments_1.extractComments(flowSeq.cstNode.items, context);
      var groupedCstItems = group_cst_flow_collection_items_1.groupCstFlowCollectionItems(cstItemsWithoutComments);
      var flowSequenceItems = flowSeq.items.map(function(item, index) {
        if (item.type !== "PAIR") {
          var node = context.transformNode(item);
          return flow_sequence_item_1.createFlowSequenceItem(position_1.createPosition(node.position.start, node.position.end), node);
        } else {
          var cstNodes = groupedCstItems[index];
          var _a = get_flow_map_item_additional_ranges_1.getFlowMapItemAdditionalRanges(cstNodes), additionalKeyRange = _a.additionalKeyRange, additionalValueRange = _a.additionalValueRange;
          return pair_1.transformAstPair(item, context, flow_mapping_item_1.createFlowMappingItem, additionalKeyRange, additionalValueRange);
        }
      });
      var openMarker = cstItemsWithoutComments[0];
      var closeMarker = get_last_1.getLast(cstItemsWithoutComments);
      return flow_sequence_1.createFlowSequence(context.transformRange({
        origStart: openMarker.origOffset,
        origEnd: closeMarker.origOffset + 1
      }), context.transformContent(flowSeq), flowSequenceItems);
    }
    exports.transformFlowSeq = transformFlowSeq;
  }
});
var require_mapping = __commonJS({
  "node_modules/yaml-unist-parser/lib/factories/mapping.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var leading_comment_attachable_1 = require_leading_comment_attachable();
    var node_1 = require_node();
    function createMapping(position, content, children) {
      return tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, node_1.createNode("mapping", position)), leading_comment_attachable_1.createLeadingCommentAttachable()), content), {
        children
      });
    }
    exports.createMapping = createMapping;
  }
});
var require_mapping_item = __commonJS({
  "node_modules/yaml-unist-parser/lib/factories/mapping-item.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var leading_comment_attachable_1 = require_leading_comment_attachable();
    var node_1 = require_node();
    function createMappingItem(position, key, value) {
      return tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, node_1.createNode("mappingItem", position)), leading_comment_attachable_1.createLeadingCommentAttachable()), {
        children: [key, value]
      });
    }
    exports.createMappingItem = createMappingItem;
  }
});
var require_map = __commonJS({
  "node_modules/yaml-unist-parser/lib/transforms/map.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var mapping_1 = require_mapping();
    var mapping_item_1 = require_mapping_item();
    var position_1 = require_position();
    var create_slicer_1 = require_create_slicer();
    var extract_comments_1 = require_extract_comments();
    var extract_prop_comments_1 = require_extract_prop_comments();
    var get_last_1 = require_get_last();
    var pair_1 = require_pair();
    function transformMap(map, context) {
      var cstNode = map.cstNode;
      cstNode.items.filter(function(item) {
        return item.type === "MAP_KEY" || item.type === "MAP_VALUE";
      }).forEach(function(item) {
        return extract_prop_comments_1.extractPropComments(item, context);
      });
      var cstItemsWithoutComments = extract_comments_1.extractComments(cstNode.items, context);
      var groupedCstItems = groupCstItems(cstItemsWithoutComments);
      var mappingItems = map.items.map(function(pair, index) {
        var cstNodes = groupedCstItems[index];
        var _a = cstNodes[0].type === "MAP_VALUE" ? [null, cstNodes[0].range] : [cstNodes[0].range, cstNodes.length === 1 ? null : cstNodes[1].range], keyRange = _a[0], valueRange = _a[1];
        return pair_1.transformAstPair(pair, context, mapping_item_1.createMappingItem, keyRange, valueRange);
      });
      return mapping_1.createMapping(position_1.createPosition(mappingItems[0].position.start, get_last_1.getLast(mappingItems).position.end), context.transformContent(map), mappingItems);
    }
    exports.transformMap = transformMap;
    function groupCstItems(cstItems) {
      var groups = [];
      var sliceCstItems = create_slicer_1.createSlicer(cstItems, 0);
      var hasKey = false;
      for (var i = 0; i < cstItems.length; i++) {
        var cstItem = cstItems[i];
        if (cstItem.type === "MAP_VALUE") {
          groups.push(sliceCstItems(i + 1));
          hasKey = false;
          continue;
        }
        if (hasKey) {
          groups.push(sliceCstItems(i));
        }
        hasKey = true;
      }
      if (hasKey) {
        groups.push(sliceCstItems(Infinity));
      }
      return groups;
    }
  }
});
var require_plain = __commonJS({
  "node_modules/yaml-unist-parser/lib/factories/plain.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var comment_attachable_1 = require_comment_attachable();
    var node_1 = require_node();
    function createPlain(position, content, value) {
      return tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, node_1.createNode("plain", position)), comment_attachable_1.createCommentAttachable()), content), {
        value
      });
    }
    exports.createPlain = createPlain;
  }
});
var require_find_last_char_index = __commonJS({
  "node_modules/yaml-unist-parser/lib/utils/find-last-char-index.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    function findLastCharIndex(text, from, regex) {
      for (var i = from; i >= 0; i--) {
        if (regex.test(text[i])) {
          return i;
        }
      }
      return -1;
    }
    exports.findLastCharIndex = findLastCharIndex;
  }
});
var require_plain2 = __commonJS({
  "node_modules/yaml-unist-parser/lib/transforms/plain.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var plain_1 = require_plain();
    var find_last_char_index_1 = require_find_last_char_index();
    function transformPlain(plain, context) {
      var cstNode = plain.cstNode;
      return plain_1.createPlain(context.transformRange({
        origStart: cstNode.valueRange.origStart,
        origEnd: find_last_char_index_1.findLastCharIndex(context.text, cstNode.valueRange.origEnd - 1, /\S/) + 1
      }), context.transformContent(plain), cstNode.strValue);
    }
    exports.transformPlain = transformPlain;
  }
});
var require_quote_double = __commonJS({
  "node_modules/yaml-unist-parser/lib/factories/quote-double.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    function createQuoteDouble(quoteValue) {
      return tslib_1.__assign(tslib_1.__assign({}, quoteValue), {
        type: "quoteDouble"
      });
    }
    exports.createQuoteDouble = createQuoteDouble;
  }
});
var require_quote_value = __commonJS({
  "node_modules/yaml-unist-parser/lib/factories/quote-value.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var comment_attachable_1 = require_comment_attachable();
    var node_1 = require_node();
    function createQuoteValue(position, content, value) {
      return tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, node_1.createNode("quoteValue", position)), content), comment_attachable_1.createCommentAttachable()), {
        value
      });
    }
    exports.createQuoteValue = createQuoteValue;
  }
});
var require_quote_value2 = __commonJS({
  "node_modules/yaml-unist-parser/lib/transforms/quote-value.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var quote_value_1 = require_quote_value();
    function transformAstQuoteValue(quoteValue, context) {
      var cstNode = quoteValue.cstNode;
      return quote_value_1.createQuoteValue(context.transformRange(cstNode.valueRange), context.transformContent(quoteValue), cstNode.strValue);
    }
    exports.transformAstQuoteValue = transformAstQuoteValue;
  }
});
var require_quote_double2 = __commonJS({
  "node_modules/yaml-unist-parser/lib/transforms/quote-double.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var quote_double_1 = require_quote_double();
    var quote_value_1 = require_quote_value2();
    function transformQuoteDouble(quoteDouble, context) {
      return quote_double_1.createQuoteDouble(quote_value_1.transformAstQuoteValue(quoteDouble, context));
    }
    exports.transformQuoteDouble = transformQuoteDouble;
  }
});
var require_quote_single = __commonJS({
  "node_modules/yaml-unist-parser/lib/factories/quote-single.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    function createQuoteSingle(quoteValue) {
      return tslib_1.__assign(tslib_1.__assign({}, quoteValue), {
        type: "quoteSingle"
      });
    }
    exports.createQuoteSingle = createQuoteSingle;
  }
});
var require_quote_single2 = __commonJS({
  "node_modules/yaml-unist-parser/lib/transforms/quote-single.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var quote_single_1 = require_quote_single();
    var quote_value_1 = require_quote_value2();
    function transformQuoteSingle(quoteSingle, context) {
      return quote_single_1.createQuoteSingle(quote_value_1.transformAstQuoteValue(quoteSingle, context));
    }
    exports.transformQuoteSingle = transformQuoteSingle;
  }
});
var require_sequence = __commonJS({
  "node_modules/yaml-unist-parser/lib/factories/sequence.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var end_comment_attachable_1 = require_end_comment_attachable();
    var leading_comment_attachable_1 = require_leading_comment_attachable();
    var node_1 = require_node();
    function createSequence(position, content, children) {
      return tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, node_1.createNode("sequence", position)), leading_comment_attachable_1.createLeadingCommentAttachable()), end_comment_attachable_1.createEndCommentAttachable()), content), {
        children
      });
    }
    exports.createSequence = createSequence;
  }
});
var require_sequence_item = __commonJS({
  "node_modules/yaml-unist-parser/lib/factories/sequence-item.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var comment_attachable_1 = require_comment_attachable();
    var end_comment_attachable_1 = require_end_comment_attachable();
    var node_1 = require_node();
    function createSequenceItem(position, content) {
      return tslib_1.__assign(tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, node_1.createNode("sequenceItem", position)), comment_attachable_1.createCommentAttachable()), end_comment_attachable_1.createEndCommentAttachable()), {
        children: !content ? [] : [content]
      });
    }
    exports.createSequenceItem = createSequenceItem;
  }
});
var require_seq = __commonJS({
  "node_modules/yaml-unist-parser/lib/transforms/seq.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var position_1 = require_position();
    var sequence_1 = require_sequence();
    var sequence_item_1 = require_sequence_item();
    var extract_comments_1 = require_extract_comments();
    var extract_prop_comments_1 = require_extract_prop_comments();
    var get_last_1 = require_get_last();
    function transformSeq(seq, context) {
      var cstItemsWithoutComments = extract_comments_1.extractComments(seq.cstNode.items, context);
      var sequenceItems = cstItemsWithoutComments.map(function(cstItem, index) {
        extract_prop_comments_1.extractPropComments(cstItem, context);
        var item = context.transformNode(seq.items[index]);
        return sequence_item_1.createSequenceItem(position_1.createPosition(context.transformOffset(cstItem.valueRange.origStart), item === null ? context.transformOffset(cstItem.valueRange.origStart + 1) : item.position.end), item);
      });
      return sequence_1.createSequence(position_1.createPosition(sequenceItems[0].position.start, get_last_1.getLast(sequenceItems).position.end), context.transformContent(seq), sequenceItems);
    }
    exports.transformSeq = transformSeq;
  }
});
var require_transform = __commonJS({
  "node_modules/yaml-unist-parser/lib/transform.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var alias_1 = require_alias2();
    var block_folded_1 = require_block_folded2();
    var block_literal_1 = require_block_literal2();
    var comment_1 = require_comment2();
    var directive_1 = require_directive2();
    var document_1 = require_document2();
    var flow_map_1 = require_flow_map();
    var flow_seq_1 = require_flow_seq();
    var map_1 = require_map();
    var plain_1 = require_plain2();
    var quote_double_1 = require_quote_double2();
    var quote_single_1 = require_quote_single2();
    var seq_1 = require_seq();
    function transformNode(node, context) {
      if (node === null || node.type === void 0 && node.value === null) {
        return null;
      }
      switch (node.type) {
        case "ALIAS":
          return alias_1.transformAlias(node, context);
        case "BLOCK_FOLDED":
          return block_folded_1.transformBlockFolded(node, context);
        case "BLOCK_LITERAL":
          return block_literal_1.transformBlockLiteral(node, context);
        case "COMMENT":
          return comment_1.transformComment(node, context);
        case "DIRECTIVE":
          return directive_1.transformDirective(node, context);
        case "DOCUMENT":
          return document_1.transformDocument(node, context);
        case "FLOW_MAP":
          return flow_map_1.transformFlowMap(node, context);
        case "FLOW_SEQ":
          return flow_seq_1.transformFlowSeq(node, context);
        case "MAP":
          return map_1.transformMap(node, context);
        case "PLAIN":
          return plain_1.transformPlain(node, context);
        case "QUOTE_DOUBLE":
          return quote_double_1.transformQuoteDouble(node, context);
        case "QUOTE_SINGLE":
          return quote_single_1.transformQuoteSingle(node, context);
        case "SEQ":
          return seq_1.transformSeq(node, context);
        default:
          throw new Error("Unexpected node type " + node.type);
      }
    }
    exports.transformNode = transformNode;
  }
});
var require_error = __commonJS({
  "node_modules/yaml-unist-parser/lib/factories/error.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    function createError(message, source, position) {
      var error = new SyntaxError(message);
      error.name = "YAMLSyntaxError";
      error.source = source;
      error.position = position;
      return error;
    }
    exports.createError = createError;
  }
});
var require_error2 = __commonJS({
  "node_modules/yaml-unist-parser/lib/transforms/error.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var error_1 = require_error();
    function transformError(error, context) {
      var range = error.source.range || error.source.valueRange;
      return error_1.createError(error.message, context.text, context.transformRange(range));
    }
    exports.transformError = transformError;
  }
});
var require_point = __commonJS({
  "node_modules/yaml-unist-parser/lib/factories/point.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    function createPoint(offset, line, column) {
      return {
        offset,
        line,
        column
      };
    }
    exports.createPoint = createPoint;
  }
});
var require_offset = __commonJS({
  "node_modules/yaml-unist-parser/lib/transforms/offset.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var point_1 = require_point();
    function transformOffset(offset, context) {
      if (offset < 0) {
        offset = 0;
      } else if (offset > context.text.length) {
        offset = context.text.length;
      }
      var location = context.locator.locationForIndex(offset);
      return point_1.createPoint(offset, location.line + 1, location.column + 1);
    }
    exports.transformOffset = transformOffset;
  }
});
var require_range = __commonJS({
  "node_modules/yaml-unist-parser/lib/transforms/range.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var position_1 = require_position();
    function transformRange(range, context) {
      return position_1.createPosition(context.transformOffset(range.origStart), context.transformOffset(range.origEnd));
    }
    exports.transformRange = transformRange;
  }
});
var require_add_orig_range = __commonJS({
  "node_modules/yaml-unist-parser/lib/utils/add-orig-range.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var FINISH = true;
    function addOrigRange(cst) {
      if (!cst.setOrigRanges()) {
        var fn_1 = function(obj) {
          if (isRange(obj)) {
            obj.origStart = obj.start;
            obj.origEnd = obj.end;
            return FINISH;
          }
          if (isFlowChar(obj)) {
            obj.origOffset = obj.offset;
            return FINISH;
          }
        };
        cst.forEach(function(document) {
          return visit(document, fn_1);
        });
      }
    }
    exports.addOrigRange = addOrigRange;
    function visit(obj, fn) {
      if (!obj || typeof obj !== "object") {
        return;
      }
      if (fn(obj) === FINISH) {
        return;
      }
      for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
        var key = _a[_i];
        if (key === "context" || key === "error") {
          continue;
        }
        var value = obj[key];
        if (Array.isArray(value)) {
          value.forEach(function(x) {
            return visit(x, fn);
          });
        } else {
          visit(value, fn);
        }
      }
    }
    function isRange(obj) {
      return typeof obj.start === "number";
    }
    function isFlowChar(obj) {
      return typeof obj.offset === "number";
    }
  }
});
var require_remove_fake_nodes = __commonJS({
  "node_modules/yaml-unist-parser/lib/utils/remove-fake-nodes.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    function removeFakeNodes(node) {
      if ("children" in node) {
        if (node.children.length === 1) {
          var child = node.children[0];
          if (child.type === "plain" && child.tag === null && child.anchor === null && child.value === "") {
            node.children.splice(0, 1);
            return node;
          }
        }
        node.children.forEach(removeFakeNodes);
      }
      return node;
    }
    exports.removeFakeNodes = removeFakeNodes;
  }
});
var require_create_updater = __commonJS({
  "node_modules/yaml-unist-parser/lib/utils/create-updater.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    function createUpdater(host, getter, setter, shouldUpdate) {
      var reduced = getter(host);
      return function(value) {
        if (shouldUpdate(reduced, value)) {
          setter(host, reduced = value);
        }
      };
    }
    exports.createUpdater = createUpdater;
  }
});
var require_update_positions = __commonJS({
  "node_modules/yaml-unist-parser/lib/utils/update-positions.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var create_updater_1 = require_create_updater();
    var get_last_1 = require_get_last();
    function updatePositions(node) {
      if (node === null || !("children" in node)) {
        return;
      }
      var children = node.children;
      children.forEach(updatePositions);
      if (node.type === "document") {
        var _a = node.children, head = _a[0], body = _a[1];
        if (head.position.start.offset === head.position.end.offset) {
          head.position.start = head.position.end = body.position.start;
        } else if (body.position.start.offset === body.position.end.offset) {
          body.position.start = body.position.end = head.position.end;
        }
      }
      var updateStartPoint = create_updater_1.createUpdater(node.position, startPointGetter, startPointSetter, shouldUpdateStartPoint);
      var updateEndPoint = create_updater_1.createUpdater(node.position, endPointGetter, endPointSetter, shouldUpdateEndPoint);
      if ("endComments" in node && node.endComments.length !== 0) {
        updateStartPoint(node.endComments[0].position.start);
        updateEndPoint(get_last_1.getLast(node.endComments).position.end);
      }
      var nonNullChildren = children.filter(function(child) {
        return child !== null;
      });
      if (nonNullChildren.length !== 0) {
        var firstChild = nonNullChildren[0];
        var lastChild = get_last_1.getLast(nonNullChildren);
        updateStartPoint(firstChild.position.start);
        updateEndPoint(lastChild.position.end);
        if ("leadingComments" in firstChild && firstChild.leadingComments.length !== 0) {
          updateStartPoint(firstChild.leadingComments[0].position.start);
        }
        if ("tag" in firstChild && firstChild.tag) {
          updateStartPoint(firstChild.tag.position.start);
        }
        if ("anchor" in firstChild && firstChild.anchor) {
          updateStartPoint(firstChild.anchor.position.start);
        }
        if ("trailingComment" in lastChild && lastChild.trailingComment) {
          updateEndPoint(lastChild.trailingComment.position.end);
        }
      }
    }
    exports.updatePositions = updatePositions;
    function startPointGetter(position) {
      return position.start;
    }
    function startPointSetter(position, point) {
      position.start = point;
    }
    function endPointGetter(position) {
      return position.end;
    }
    function endPointSetter(position, point) {
      position.end = point;
    }
    function shouldUpdateStartPoint(reduced, value) {
      return value.offset < reduced.offset;
    }
    function shouldUpdateEndPoint(reduced, value) {
      return value.offset > reduced.offset;
    }
  }
});
var require_PlainValue_ec8e588e = __commonJS({
  "node_modules/yaml/dist/PlainValue-ec8e588e.js"(exports) {
    "use strict";
    init_define_process();
    var Char = {
      ANCHOR: "&",
      COMMENT: "#",
      TAG: "!",
      DIRECTIVES_END: "-",
      DOCUMENT_END: "."
    };
    var Type = {
      ALIAS: "ALIAS",
      BLANK_LINE: "BLANK_LINE",
      BLOCK_FOLDED: "BLOCK_FOLDED",
      BLOCK_LITERAL: "BLOCK_LITERAL",
      COMMENT: "COMMENT",
      DIRECTIVE: "DIRECTIVE",
      DOCUMENT: "DOCUMENT",
      FLOW_MAP: "FLOW_MAP",
      FLOW_SEQ: "FLOW_SEQ",
      MAP: "MAP",
      MAP_KEY: "MAP_KEY",
      MAP_VALUE: "MAP_VALUE",
      PLAIN: "PLAIN",
      QUOTE_DOUBLE: "QUOTE_DOUBLE",
      QUOTE_SINGLE: "QUOTE_SINGLE",
      SEQ: "SEQ",
      SEQ_ITEM: "SEQ_ITEM"
    };
    var defaultTagPrefix = "tag:yaml.org,2002:";
    var defaultTags = {
      MAP: "tag:yaml.org,2002:map",
      SEQ: "tag:yaml.org,2002:seq",
      STR: "tag:yaml.org,2002:str"
    };
    function findLineStarts(src) {
      const ls = [0];
      let offset = src.indexOf("\n");
      while (offset !== -1) {
        offset += 1;
        ls.push(offset);
        offset = src.indexOf("\n", offset);
      }
      return ls;
    }
    function getSrcInfo(cst) {
      let lineStarts, src;
      if (typeof cst === "string") {
        lineStarts = findLineStarts(cst);
        src = cst;
      } else {
        if (Array.isArray(cst))
          cst = cst[0];
        if (cst && cst.context) {
          if (!cst.lineStarts)
            cst.lineStarts = findLineStarts(cst.context.src);
          lineStarts = cst.lineStarts;
          src = cst.context.src;
        }
      }
      return {
        lineStarts,
        src
      };
    }
    function getLinePos(offset, cst) {
      if (typeof offset !== "number" || offset < 0)
        return null;
      const {
        lineStarts,
        src
      } = getSrcInfo(cst);
      if (!lineStarts || !src || offset > src.length)
        return null;
      for (let i = 0; i < lineStarts.length; ++i) {
        const start = lineStarts[i];
        if (offset < start) {
          return {
            line: i,
            col: offset - lineStarts[i - 1] + 1
          };
        }
        if (offset === start)
          return {
            line: i + 1,
            col: 1
          };
      }
      const line = lineStarts.length;
      return {
        line,
        col: offset - lineStarts[line - 1] + 1
      };
    }
    function getLine(line, cst) {
      const {
        lineStarts,
        src
      } = getSrcInfo(cst);
      if (!lineStarts || !(line >= 1) || line > lineStarts.length)
        return null;
      const start = lineStarts[line - 1];
      let end = lineStarts[line];
      while (end && end > start && src[end - 1] === "\n")
        --end;
      return src.slice(start, end);
    }
    function getPrettyContext(_ref, cst) {
      let {
        start,
        end
      } = _ref;
      let maxWidth = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 80;
      let src = getLine(start.line, cst);
      if (!src)
        return null;
      let {
        col
      } = start;
      if (src.length > maxWidth) {
        if (col <= maxWidth - 10) {
          src = src.substr(0, maxWidth - 1) + "\u2026";
        } else {
          const halfWidth = Math.round(maxWidth / 2);
          if (src.length > col + halfWidth)
            src = src.substr(0, col + halfWidth - 1) + "\u2026";
          col -= src.length - maxWidth;
          src = "\u2026" + src.substr(1 - maxWidth);
        }
      }
      let errLen = 1;
      let errEnd = "";
      if (end) {
        if (end.line === start.line && col + (end.col - start.col) <= maxWidth + 1) {
          errLen = end.col - start.col;
        } else {
          errLen = Math.min(src.length + 1, maxWidth) - col;
          errEnd = "\u2026";
        }
      }
      const offset = col > 1 ? " ".repeat(col - 1) : "";
      const err = "^".repeat(errLen);
      return `${src}
${offset}${err}${errEnd}`;
    }
    var Range = class {
      static copy(orig) {
        return new Range(orig.start, orig.end);
      }
      constructor(start, end) {
        this.start = start;
        this.end = end || start;
      }
      isEmpty() {
        return typeof this.start !== "number" || !this.end || this.end <= this.start;
      }
      setOrigRange(cr, offset) {
        const {
          start,
          end
        } = this;
        if (cr.length === 0 || end <= cr[0]) {
          this.origStart = start;
          this.origEnd = end;
          return offset;
        }
        let i = offset;
        while (i < cr.length) {
          if (cr[i] > start)
            break;
          else
            ++i;
        }
        this.origStart = start + i;
        const nextOffset = i;
        while (i < cr.length) {
          if (cr[i] >= end)
            break;
          else
            ++i;
        }
        this.origEnd = end + i;
        return nextOffset;
      }
    };
    var Node = class {
      static addStringTerminator(src, offset, str) {
        if (str[str.length - 1] === "\n")
          return str;
        const next = Node.endOfWhiteSpace(src, offset);
        return next >= src.length || src[next] === "\n" ? str + "\n" : str;
      }
      static atDocumentBoundary(src, offset, sep) {
        const ch0 = src[offset];
        if (!ch0)
          return true;
        const prev = src[offset - 1];
        if (prev && prev !== "\n")
          return false;
        if (sep) {
          if (ch0 !== sep)
            return false;
        } else {
          if (ch0 !== Char.DIRECTIVES_END && ch0 !== Char.DOCUMENT_END)
            return false;
        }
        const ch1 = src[offset + 1];
        const ch2 = src[offset + 2];
        if (ch1 !== ch0 || ch2 !== ch0)
          return false;
        const ch3 = src[offset + 3];
        return !ch3 || ch3 === "\n" || ch3 === "	" || ch3 === " ";
      }
      static endOfIdentifier(src, offset) {
        let ch = src[offset];
        const isVerbatim = ch === "<";
        const notOk = isVerbatim ? ["\n", "	", " ", ">"] : ["\n", "	", " ", "[", "]", "{", "}", ","];
        while (ch && notOk.indexOf(ch) === -1)
          ch = src[offset += 1];
        if (isVerbatim && ch === ">")
          offset += 1;
        return offset;
      }
      static endOfIndent(src, offset) {
        let ch = src[offset];
        while (ch === " ")
          ch = src[offset += 1];
        return offset;
      }
      static endOfLine(src, offset) {
        let ch = src[offset];
        while (ch && ch !== "\n")
          ch = src[offset += 1];
        return offset;
      }
      static endOfWhiteSpace(src, offset) {
        let ch = src[offset];
        while (ch === "	" || ch === " ")
          ch = src[offset += 1];
        return offset;
      }
      static startOfLine(src, offset) {
        let ch = src[offset - 1];
        if (ch === "\n")
          return offset;
        while (ch && ch !== "\n")
          ch = src[offset -= 1];
        return offset + 1;
      }
      static endOfBlockIndent(src, indent, lineStart) {
        const inEnd = Node.endOfIndent(src, lineStart);
        if (inEnd > lineStart + indent) {
          return inEnd;
        } else {
          const wsEnd = Node.endOfWhiteSpace(src, inEnd);
          const ch = src[wsEnd];
          if (!ch || ch === "\n")
            return wsEnd;
        }
        return null;
      }
      static atBlank(src, offset, endAsBlank) {
        const ch = src[offset];
        return ch === "\n" || ch === "	" || ch === " " || endAsBlank && !ch;
      }
      static nextNodeIsIndented(ch, indentDiff, indicatorAsIndent) {
        if (!ch || indentDiff < 0)
          return false;
        if (indentDiff > 0)
          return true;
        return indicatorAsIndent && ch === "-";
      }
      static normalizeOffset(src, offset) {
        const ch = src[offset];
        return !ch ? offset : ch !== "\n" && src[offset - 1] === "\n" ? offset - 1 : Node.endOfWhiteSpace(src, offset);
      }
      static foldNewline(src, offset, indent) {
        let inCount = 0;
        let error = false;
        let fold = "";
        let ch = src[offset + 1];
        while (ch === " " || ch === "	" || ch === "\n") {
          switch (ch) {
            case "\n":
              inCount = 0;
              offset += 1;
              fold += "\n";
              break;
            case "	":
              if (inCount <= indent)
                error = true;
              offset = Node.endOfWhiteSpace(src, offset + 2) - 1;
              break;
            case " ":
              inCount += 1;
              offset += 1;
              break;
          }
          ch = src[offset + 1];
        }
        if (!fold)
          fold = " ";
        if (ch && inCount <= indent)
          error = true;
        return {
          fold,
          offset,
          error
        };
      }
      constructor(type, props, context) {
        Object.defineProperty(this, "context", {
          value: context || null,
          writable: true
        });
        this.error = null;
        this.range = null;
        this.valueRange = null;
        this.props = props || [];
        this.type = type;
        this.value = null;
      }
      getPropValue(idx, key, skipKey) {
        if (!this.context)
          return null;
        const {
          src
        } = this.context;
        const prop = this.props[idx];
        return prop && src[prop.start] === key ? src.slice(prop.start + (skipKey ? 1 : 0), prop.end) : null;
      }
      get anchor() {
        for (let i = 0; i < this.props.length; ++i) {
          const anchor = this.getPropValue(i, Char.ANCHOR, true);
          if (anchor != null)
            return anchor;
        }
        return null;
      }
      get comment() {
        const comments = [];
        for (let i = 0; i < this.props.length; ++i) {
          const comment = this.getPropValue(i, Char.COMMENT, true);
          if (comment != null)
            comments.push(comment);
        }
        return comments.length > 0 ? comments.join("\n") : null;
      }
      commentHasRequiredWhitespace(start) {
        const {
          src
        } = this.context;
        if (this.header && start === this.header.end)
          return false;
        if (!this.valueRange)
          return false;
        const {
          end
        } = this.valueRange;
        return start !== end || Node.atBlank(src, end - 1);
      }
      get hasComment() {
        if (this.context) {
          const {
            src
          } = this.context;
          for (let i = 0; i < this.props.length; ++i) {
            if (src[this.props[i].start] === Char.COMMENT)
              return true;
          }
        }
        return false;
      }
      get hasProps() {
        if (this.context) {
          const {
            src
          } = this.context;
          for (let i = 0; i < this.props.length; ++i) {
            if (src[this.props[i].start] !== Char.COMMENT)
              return true;
          }
        }
        return false;
      }
      get includesTrailingLines() {
        return false;
      }
      get jsonLike() {
        const jsonLikeTypes = [Type.FLOW_MAP, Type.FLOW_SEQ, Type.QUOTE_DOUBLE, Type.QUOTE_SINGLE];
        return jsonLikeTypes.indexOf(this.type) !== -1;
      }
      get rangeAsLinePos() {
        if (!this.range || !this.context)
          return void 0;
        const start = getLinePos(this.range.start, this.context.root);
        if (!start)
          return void 0;
        const end = getLinePos(this.range.end, this.context.root);
        return {
          start,
          end
        };
      }
      get rawValue() {
        if (!this.valueRange || !this.context)
          return null;
        const {
          start,
          end
        } = this.valueRange;
        return this.context.src.slice(start, end);
      }
      get tag() {
        for (let i = 0; i < this.props.length; ++i) {
          const tag = this.getPropValue(i, Char.TAG, false);
          if (tag != null) {
            if (tag[1] === "<") {
              return {
                verbatim: tag.slice(2, -1)
              };
            } else {
              const [_, handle, suffix] = tag.match(/^(.*!)([^!]*)$/);
              return {
                handle,
                suffix
              };
            }
          }
        }
        return null;
      }
      get valueRangeContainsNewline() {
        if (!this.valueRange || !this.context)
          return false;
        const {
          start,
          end
        } = this.valueRange;
        const {
          src
        } = this.context;
        for (let i = start; i < end; ++i) {
          if (src[i] === "\n")
            return true;
        }
        return false;
      }
      parseComment(start) {
        const {
          src
        } = this.context;
        if (src[start] === Char.COMMENT) {
          const end = Node.endOfLine(src, start + 1);
          const commentRange = new Range(start, end);
          this.props.push(commentRange);
          return end;
        }
        return start;
      }
      setOrigRanges(cr, offset) {
        if (this.range)
          offset = this.range.setOrigRange(cr, offset);
        if (this.valueRange)
          this.valueRange.setOrigRange(cr, offset);
        this.props.forEach((prop) => prop.setOrigRange(cr, offset));
        return offset;
      }
      toString() {
        const {
          context: {
            src
          },
          range,
          value
        } = this;
        if (value != null)
          return value;
        const str = src.slice(range.start, range.end);
        return Node.addStringTerminator(src, range.end, str);
      }
    };
    var YAMLError = class extends Error {
      constructor(name, source, message) {
        if (!message || !(source instanceof Node))
          throw new Error(`Invalid arguments for new ${name}`);
        super();
        this.name = name;
        this.message = message;
        this.source = source;
      }
      makePretty() {
        if (!this.source)
          return;
        this.nodeType = this.source.type;
        const cst = this.source.context && this.source.context.root;
        if (typeof this.offset === "number") {
          this.range = new Range(this.offset, this.offset + 1);
          const start = cst && getLinePos(this.offset, cst);
          if (start) {
            const end = {
              line: start.line,
              col: start.col + 1
            };
            this.linePos = {
              start,
              end
            };
          }
          delete this.offset;
        } else {
          this.range = this.source.range;
          this.linePos = this.source.rangeAsLinePos;
        }
        if (this.linePos) {
          const {
            line,
            col
          } = this.linePos.start;
          this.message += ` at line ${line}, column ${col}`;
          const ctx = cst && getPrettyContext(this.linePos, cst);
          if (ctx)
            this.message += `:

${ctx}
`;
        }
        delete this.source;
      }
    };
    var YAMLReferenceError = class extends YAMLError {
      constructor(source, message) {
        super("YAMLReferenceError", source, message);
      }
    };
    var YAMLSemanticError = class extends YAMLError {
      constructor(source, message) {
        super("YAMLSemanticError", source, message);
      }
    };
    var YAMLSyntaxError = class extends YAMLError {
      constructor(source, message) {
        super("YAMLSyntaxError", source, message);
      }
    };
    var YAMLWarning = class extends YAMLError {
      constructor(source, message) {
        super("YAMLWarning", source, message);
      }
    };
    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    var PlainValue = class extends Node {
      static endOfLine(src, start, inFlow) {
        let ch = src[start];
        let offset = start;
        while (ch && ch !== "\n") {
          if (inFlow && (ch === "[" || ch === "]" || ch === "{" || ch === "}" || ch === ","))
            break;
          const next = src[offset + 1];
          if (ch === ":" && (!next || next === "\n" || next === "	" || next === " " || inFlow && next === ","))
            break;
          if ((ch === " " || ch === "	") && next === "#")
            break;
          offset += 1;
          ch = next;
        }
        return offset;
      }
      get strValue() {
        if (!this.valueRange || !this.context)
          return null;
        let {
          start,
          end
        } = this.valueRange;
        const {
          src
        } = this.context;
        let ch = src[end - 1];
        while (start < end && (ch === "\n" || ch === "	" || ch === " "))
          ch = src[--end - 1];
        let str = "";
        for (let i = start; i < end; ++i) {
          const ch2 = src[i];
          if (ch2 === "\n") {
            const {
              fold,
              offset
            } = Node.foldNewline(src, i, -1);
            str += fold;
            i = offset;
          } else if (ch2 === " " || ch2 === "	") {
            const wsStart = i;
            let next = src[i + 1];
            while (i < end && (next === " " || next === "	")) {
              i += 1;
              next = src[i + 1];
            }
            if (next !== "\n")
              str += i > wsStart ? src.slice(wsStart, i + 1) : ch2;
          } else {
            str += ch2;
          }
        }
        const ch0 = src[start];
        switch (ch0) {
          case "	": {
            const msg = "Plain value cannot start with a tab character";
            const errors = [new YAMLSemanticError(this, msg)];
            return {
              errors,
              str
            };
          }
          case "@":
          case "`": {
            const msg = `Plain value cannot start with reserved character ${ch0}`;
            const errors = [new YAMLSemanticError(this, msg)];
            return {
              errors,
              str
            };
          }
          default:
            return str;
        }
      }
      parseBlockValue(start) {
        const {
          indent,
          inFlow,
          src
        } = this.context;
        let offset = start;
        let valueEnd = start;
        for (let ch = src[offset]; ch === "\n"; ch = src[offset]) {
          if (Node.atDocumentBoundary(src, offset + 1))
            break;
          const end = Node.endOfBlockIndent(src, indent, offset + 1);
          if (end === null || src[end] === "#")
            break;
          if (src[end] === "\n") {
            offset = end;
          } else {
            valueEnd = PlainValue.endOfLine(src, end, inFlow);
            offset = valueEnd;
          }
        }
        if (this.valueRange.isEmpty())
          this.valueRange.start = start;
        this.valueRange.end = valueEnd;
        return valueEnd;
      }
      parse(context, start) {
        this.context = context;
        const {
          inFlow,
          src
        } = context;
        let offset = start;
        const ch = src[offset];
        if (ch && ch !== "#" && ch !== "\n") {
          offset = PlainValue.endOfLine(src, start, inFlow);
        }
        this.valueRange = new Range(start, offset);
        offset = Node.endOfWhiteSpace(src, offset);
        offset = this.parseComment(offset);
        if (!this.hasComment || this.valueRange.isEmpty()) {
          offset = this.parseBlockValue(offset);
        }
        return offset;
      }
    };
    exports.Char = Char;
    exports.Node = Node;
    exports.PlainValue = PlainValue;
    exports.Range = Range;
    exports.Type = Type;
    exports.YAMLError = YAMLError;
    exports.YAMLReferenceError = YAMLReferenceError;
    exports.YAMLSemanticError = YAMLSemanticError;
    exports.YAMLSyntaxError = YAMLSyntaxError;
    exports.YAMLWarning = YAMLWarning;
    exports._defineProperty = _defineProperty;
    exports.defaultTagPrefix = defaultTagPrefix;
    exports.defaultTags = defaultTags;
  }
});
var require_parse_cst = __commonJS({
  "node_modules/yaml/dist/parse-cst.js"(exports) {
    "use strict";
    init_define_process();
    var PlainValue = require_PlainValue_ec8e588e();
    var BlankLine = class extends PlainValue.Node {
      constructor() {
        super(PlainValue.Type.BLANK_LINE);
      }
      get includesTrailingLines() {
        return true;
      }
      parse(context, start) {
        this.context = context;
        this.range = new PlainValue.Range(start, start + 1);
        return start + 1;
      }
    };
    var CollectionItem = class extends PlainValue.Node {
      constructor(type, props) {
        super(type, props);
        this.node = null;
      }
      get includesTrailingLines() {
        return !!this.node && this.node.includesTrailingLines;
      }
      parse(context, start) {
        this.context = context;
        const {
          parseNode,
          src
        } = context;
        let {
          atLineStart,
          lineStart
        } = context;
        if (!atLineStart && this.type === PlainValue.Type.SEQ_ITEM)
          this.error = new PlainValue.YAMLSemanticError(this, "Sequence items must not have preceding content on the same line");
        const indent = atLineStart ? start - lineStart : context.indent;
        let offset = PlainValue.Node.endOfWhiteSpace(src, start + 1);
        let ch = src[offset];
        const inlineComment = ch === "#";
        const comments = [];
        let blankLine = null;
        while (ch === "\n" || ch === "#") {
          if (ch === "#") {
            const end2 = PlainValue.Node.endOfLine(src, offset + 1);
            comments.push(new PlainValue.Range(offset, end2));
            offset = end2;
          } else {
            atLineStart = true;
            lineStart = offset + 1;
            const wsEnd = PlainValue.Node.endOfWhiteSpace(src, lineStart);
            if (src[wsEnd] === "\n" && comments.length === 0) {
              blankLine = new BlankLine();
              lineStart = blankLine.parse({
                src
              }, lineStart);
            }
            offset = PlainValue.Node.endOfIndent(src, lineStart);
          }
          ch = src[offset];
        }
        if (PlainValue.Node.nextNodeIsIndented(ch, offset - (lineStart + indent), this.type !== PlainValue.Type.SEQ_ITEM)) {
          this.node = parseNode({
            atLineStart,
            inCollection: false,
            indent,
            lineStart,
            parent: this
          }, offset);
        } else if (ch && lineStart > start + 1) {
          offset = lineStart - 1;
        }
        if (this.node) {
          if (blankLine) {
            const items = context.parent.items || context.parent.contents;
            if (items)
              items.push(blankLine);
          }
          if (comments.length)
            Array.prototype.push.apply(this.props, comments);
          offset = this.node.range.end;
        } else {
          if (inlineComment) {
            const c = comments[0];
            this.props.push(c);
            offset = c.end;
          } else {
            offset = PlainValue.Node.endOfLine(src, start + 1);
          }
        }
        const end = this.node ? this.node.valueRange.end : offset;
        this.valueRange = new PlainValue.Range(start, end);
        return offset;
      }
      setOrigRanges(cr, offset) {
        offset = super.setOrigRanges(cr, offset);
        return this.node ? this.node.setOrigRanges(cr, offset) : offset;
      }
      toString() {
        const {
          context: {
            src
          },
          node,
          range,
          value
        } = this;
        if (value != null)
          return value;
        const str = node ? src.slice(range.start, node.range.start) + String(node) : src.slice(range.start, range.end);
        return PlainValue.Node.addStringTerminator(src, range.end, str);
      }
    };
    var Comment = class extends PlainValue.Node {
      constructor() {
        super(PlainValue.Type.COMMENT);
      }
      parse(context, start) {
        this.context = context;
        const offset = this.parseComment(start);
        this.range = new PlainValue.Range(start, offset);
        return offset;
      }
    };
    function grabCollectionEndComments(node) {
      let cnode = node;
      while (cnode instanceof CollectionItem)
        cnode = cnode.node;
      if (!(cnode instanceof Collection))
        return null;
      const len = cnode.items.length;
      let ci = -1;
      for (let i = len - 1; i >= 0; --i) {
        const n = cnode.items[i];
        if (n.type === PlainValue.Type.COMMENT) {
          const {
            indent,
            lineStart
          } = n.context;
          if (indent > 0 && n.range.start >= lineStart + indent)
            break;
          ci = i;
        } else if (n.type === PlainValue.Type.BLANK_LINE)
          ci = i;
        else
          break;
      }
      if (ci === -1)
        return null;
      const ca = cnode.items.splice(ci, len - ci);
      const prevEnd = ca[0].range.start;
      while (true) {
        cnode.range.end = prevEnd;
        if (cnode.valueRange && cnode.valueRange.end > prevEnd)
          cnode.valueRange.end = prevEnd;
        if (cnode === node)
          break;
        cnode = cnode.context.parent;
      }
      return ca;
    }
    var Collection = class extends PlainValue.Node {
      static nextContentHasIndent(src, offset, indent) {
        const lineStart = PlainValue.Node.endOfLine(src, offset) + 1;
        offset = PlainValue.Node.endOfWhiteSpace(src, lineStart);
        const ch = src[offset];
        if (!ch)
          return false;
        if (offset >= lineStart + indent)
          return true;
        if (ch !== "#" && ch !== "\n")
          return false;
        return Collection.nextContentHasIndent(src, offset, indent);
      }
      constructor(firstItem) {
        super(firstItem.type === PlainValue.Type.SEQ_ITEM ? PlainValue.Type.SEQ : PlainValue.Type.MAP);
        for (let i = firstItem.props.length - 1; i >= 0; --i) {
          if (firstItem.props[i].start < firstItem.context.lineStart) {
            this.props = firstItem.props.slice(0, i + 1);
            firstItem.props = firstItem.props.slice(i + 1);
            const itemRange = firstItem.props[0] || firstItem.valueRange;
            firstItem.range.start = itemRange.start;
            break;
          }
        }
        this.items = [firstItem];
        const ec = grabCollectionEndComments(firstItem);
        if (ec)
          Array.prototype.push.apply(this.items, ec);
      }
      get includesTrailingLines() {
        return this.items.length > 0;
      }
      parse(context, start) {
        this.context = context;
        const {
          parseNode,
          src
        } = context;
        let lineStart = PlainValue.Node.startOfLine(src, start);
        const firstItem = this.items[0];
        firstItem.context.parent = this;
        this.valueRange = PlainValue.Range.copy(firstItem.valueRange);
        const indent = firstItem.range.start - firstItem.context.lineStart;
        let offset = start;
        offset = PlainValue.Node.normalizeOffset(src, offset);
        let ch = src[offset];
        let atLineStart = PlainValue.Node.endOfWhiteSpace(src, lineStart) === offset;
        let prevIncludesTrailingLines = false;
        while (ch) {
          while (ch === "\n" || ch === "#") {
            if (atLineStart && ch === "\n" && !prevIncludesTrailingLines) {
              const blankLine = new BlankLine();
              offset = blankLine.parse({
                src
              }, offset);
              this.valueRange.end = offset;
              if (offset >= src.length) {
                ch = null;
                break;
              }
              this.items.push(blankLine);
              offset -= 1;
            } else if (ch === "#") {
              if (offset < lineStart + indent && !Collection.nextContentHasIndent(src, offset, indent)) {
                return offset;
              }
              const comment = new Comment();
              offset = comment.parse({
                indent,
                lineStart,
                src
              }, offset);
              this.items.push(comment);
              this.valueRange.end = offset;
              if (offset >= src.length) {
                ch = null;
                break;
              }
            }
            lineStart = offset + 1;
            offset = PlainValue.Node.endOfIndent(src, lineStart);
            if (PlainValue.Node.atBlank(src, offset)) {
              const wsEnd = PlainValue.Node.endOfWhiteSpace(src, offset);
              const next = src[wsEnd];
              if (!next || next === "\n" || next === "#") {
                offset = wsEnd;
              }
            }
            ch = src[offset];
            atLineStart = true;
          }
          if (!ch) {
            break;
          }
          if (offset !== lineStart + indent && (atLineStart || ch !== ":")) {
            if (offset < lineStart + indent) {
              if (lineStart > start)
                offset = lineStart;
              break;
            } else if (!this.error) {
              const msg = "All collection items must start at the same column";
              this.error = new PlainValue.YAMLSyntaxError(this, msg);
            }
          }
          if (firstItem.type === PlainValue.Type.SEQ_ITEM) {
            if (ch !== "-") {
              if (lineStart > start)
                offset = lineStart;
              break;
            }
          } else if (ch === "-" && !this.error) {
            const next = src[offset + 1];
            if (!next || next === "\n" || next === "	" || next === " ") {
              const msg = "A collection cannot be both a mapping and a sequence";
              this.error = new PlainValue.YAMLSyntaxError(this, msg);
            }
          }
          const node = parseNode({
            atLineStart,
            inCollection: true,
            indent,
            lineStart,
            parent: this
          }, offset);
          if (!node)
            return offset;
          this.items.push(node);
          this.valueRange.end = node.valueRange.end;
          offset = PlainValue.Node.normalizeOffset(src, node.range.end);
          ch = src[offset];
          atLineStart = false;
          prevIncludesTrailingLines = node.includesTrailingLines;
          if (ch) {
            let ls = offset - 1;
            let prev = src[ls];
            while (prev === " " || prev === "	")
              prev = src[--ls];
            if (prev === "\n") {
              lineStart = ls + 1;
              atLineStart = true;
            }
          }
          const ec = grabCollectionEndComments(node);
          if (ec)
            Array.prototype.push.apply(this.items, ec);
        }
        return offset;
      }
      setOrigRanges(cr, offset) {
        offset = super.setOrigRanges(cr, offset);
        this.items.forEach((node) => {
          offset = node.setOrigRanges(cr, offset);
        });
        return offset;
      }
      toString() {
        const {
          context: {
            src
          },
          items,
          range,
          value
        } = this;
        if (value != null)
          return value;
        let str = src.slice(range.start, items[0].range.start) + String(items[0]);
        for (let i = 1; i < items.length; ++i) {
          const item = items[i];
          const {
            atLineStart,
            indent
          } = item.context;
          if (atLineStart)
            for (let i2 = 0; i2 < indent; ++i2)
              str += " ";
          str += String(item);
        }
        return PlainValue.Node.addStringTerminator(src, range.end, str);
      }
    };
    var Directive = class extends PlainValue.Node {
      constructor() {
        super(PlainValue.Type.DIRECTIVE);
        this.name = null;
      }
      get parameters() {
        const raw = this.rawValue;
        return raw ? raw.trim().split(/[ \t]+/) : [];
      }
      parseName(start) {
        const {
          src
        } = this.context;
        let offset = start;
        let ch = src[offset];
        while (ch && ch !== "\n" && ch !== "	" && ch !== " ")
          ch = src[offset += 1];
        this.name = src.slice(start, offset);
        return offset;
      }
      parseParameters(start) {
        const {
          src
        } = this.context;
        let offset = start;
        let ch = src[offset];
        while (ch && ch !== "\n" && ch !== "#")
          ch = src[offset += 1];
        this.valueRange = new PlainValue.Range(start, offset);
        return offset;
      }
      parse(context, start) {
        this.context = context;
        let offset = this.parseName(start + 1);
        offset = this.parseParameters(offset);
        offset = this.parseComment(offset);
        this.range = new PlainValue.Range(start, offset);
        return offset;
      }
    };
    var Document = class extends PlainValue.Node {
      static startCommentOrEndBlankLine(src, start) {
        const offset = PlainValue.Node.endOfWhiteSpace(src, start);
        const ch = src[offset];
        return ch === "#" || ch === "\n" ? offset : start;
      }
      constructor() {
        super(PlainValue.Type.DOCUMENT);
        this.directives = null;
        this.contents = null;
        this.directivesEndMarker = null;
        this.documentEndMarker = null;
      }
      parseDirectives(start) {
        const {
          src
        } = this.context;
        this.directives = [];
        let atLineStart = true;
        let hasDirectives = false;
        let offset = start;
        while (!PlainValue.Node.atDocumentBoundary(src, offset, PlainValue.Char.DIRECTIVES_END)) {
          offset = Document.startCommentOrEndBlankLine(src, offset);
          switch (src[offset]) {
            case "\n":
              if (atLineStart) {
                const blankLine = new BlankLine();
                offset = blankLine.parse({
                  src
                }, offset);
                if (offset < src.length) {
                  this.directives.push(blankLine);
                }
              } else {
                offset += 1;
                atLineStart = true;
              }
              break;
            case "#":
              {
                const comment = new Comment();
                offset = comment.parse({
                  src
                }, offset);
                this.directives.push(comment);
                atLineStart = false;
              }
              break;
            case "%":
              {
                const directive = new Directive();
                offset = directive.parse({
                  parent: this,
                  src
                }, offset);
                this.directives.push(directive);
                hasDirectives = true;
                atLineStart = false;
              }
              break;
            default:
              if (hasDirectives) {
                this.error = new PlainValue.YAMLSemanticError(this, "Missing directives-end indicator line");
              } else if (this.directives.length > 0) {
                this.contents = this.directives;
                this.directives = [];
              }
              return offset;
          }
        }
        if (src[offset]) {
          this.directivesEndMarker = new PlainValue.Range(offset, offset + 3);
          return offset + 3;
        }
        if (hasDirectives) {
          this.error = new PlainValue.YAMLSemanticError(this, "Missing directives-end indicator line");
        } else if (this.directives.length > 0) {
          this.contents = this.directives;
          this.directives = [];
        }
        return offset;
      }
      parseContents(start) {
        const {
          parseNode,
          src
        } = this.context;
        if (!this.contents)
          this.contents = [];
        let lineStart = start;
        while (src[lineStart - 1] === "-")
          lineStart -= 1;
        let offset = PlainValue.Node.endOfWhiteSpace(src, start);
        let atLineStart = lineStart === start;
        this.valueRange = new PlainValue.Range(offset);
        while (!PlainValue.Node.atDocumentBoundary(src, offset, PlainValue.Char.DOCUMENT_END)) {
          switch (src[offset]) {
            case "\n":
              if (atLineStart) {
                const blankLine = new BlankLine();
                offset = blankLine.parse({
                  src
                }, offset);
                if (offset < src.length) {
                  this.contents.push(blankLine);
                }
              } else {
                offset += 1;
                atLineStart = true;
              }
              lineStart = offset;
              break;
            case "#":
              {
                const comment = new Comment();
                offset = comment.parse({
                  src
                }, offset);
                this.contents.push(comment);
                atLineStart = false;
              }
              break;
            default: {
              const iEnd = PlainValue.Node.endOfIndent(src, offset);
              const context = {
                atLineStart,
                indent: -1,
                inFlow: false,
                inCollection: false,
                lineStart,
                parent: this
              };
              const node = parseNode(context, iEnd);
              if (!node)
                return this.valueRange.end = iEnd;
              this.contents.push(node);
              offset = node.range.end;
              atLineStart = false;
              const ec = grabCollectionEndComments(node);
              if (ec)
                Array.prototype.push.apply(this.contents, ec);
            }
          }
          offset = Document.startCommentOrEndBlankLine(src, offset);
        }
        this.valueRange.end = offset;
        if (src[offset]) {
          this.documentEndMarker = new PlainValue.Range(offset, offset + 3);
          offset += 3;
          if (src[offset]) {
            offset = PlainValue.Node.endOfWhiteSpace(src, offset);
            if (src[offset] === "#") {
              const comment = new Comment();
              offset = comment.parse({
                src
              }, offset);
              this.contents.push(comment);
            }
            switch (src[offset]) {
              case "\n":
                offset += 1;
                break;
              case void 0:
                break;
              default:
                this.error = new PlainValue.YAMLSyntaxError(this, "Document end marker line cannot have a non-comment suffix");
            }
          }
        }
        return offset;
      }
      parse(context, start) {
        context.root = this;
        this.context = context;
        const {
          src
        } = context;
        let offset = src.charCodeAt(start) === 65279 ? start + 1 : start;
        offset = this.parseDirectives(offset);
        offset = this.parseContents(offset);
        return offset;
      }
      setOrigRanges(cr, offset) {
        offset = super.setOrigRanges(cr, offset);
        this.directives.forEach((node) => {
          offset = node.setOrigRanges(cr, offset);
        });
        if (this.directivesEndMarker)
          offset = this.directivesEndMarker.setOrigRange(cr, offset);
        this.contents.forEach((node) => {
          offset = node.setOrigRanges(cr, offset);
        });
        if (this.documentEndMarker)
          offset = this.documentEndMarker.setOrigRange(cr, offset);
        return offset;
      }
      toString() {
        const {
          contents,
          directives,
          value
        } = this;
        if (value != null)
          return value;
        let str = directives.join("");
        if (contents.length > 0) {
          if (directives.length > 0 || contents[0].type === PlainValue.Type.COMMENT)
            str += "---\n";
          str += contents.join("");
        }
        if (str[str.length - 1] !== "\n")
          str += "\n";
        return str;
      }
    };
    var Alias = class extends PlainValue.Node {
      parse(context, start) {
        this.context = context;
        const {
          src
        } = context;
        let offset = PlainValue.Node.endOfIdentifier(src, start + 1);
        this.valueRange = new PlainValue.Range(start + 1, offset);
        offset = PlainValue.Node.endOfWhiteSpace(src, offset);
        offset = this.parseComment(offset);
        return offset;
      }
    };
    var Chomp = {
      CLIP: "CLIP",
      KEEP: "KEEP",
      STRIP: "STRIP"
    };
    var BlockValue = class extends PlainValue.Node {
      constructor(type, props) {
        super(type, props);
        this.blockIndent = null;
        this.chomping = Chomp.CLIP;
        this.header = null;
      }
      get includesTrailingLines() {
        return this.chomping === Chomp.KEEP;
      }
      get strValue() {
        if (!this.valueRange || !this.context)
          return null;
        let {
          start,
          end
        } = this.valueRange;
        const {
          indent,
          src
        } = this.context;
        if (this.valueRange.isEmpty())
          return "";
        let lastNewLine = null;
        let ch = src[end - 1];
        while (ch === "\n" || ch === "	" || ch === " ") {
          end -= 1;
          if (end <= start) {
            if (this.chomping === Chomp.KEEP)
              break;
            else
              return "";
          }
          if (ch === "\n")
            lastNewLine = end;
          ch = src[end - 1];
        }
        let keepStart = end + 1;
        if (lastNewLine) {
          if (this.chomping === Chomp.KEEP) {
            keepStart = lastNewLine;
            end = this.valueRange.end;
          } else {
            end = lastNewLine;
          }
        }
        const bi = indent + this.blockIndent;
        const folded = this.type === PlainValue.Type.BLOCK_FOLDED;
        let atStart = true;
        let str = "";
        let sep = "";
        let prevMoreIndented = false;
        for (let i = start; i < end; ++i) {
          for (let j = 0; j < bi; ++j) {
            if (src[i] !== " ")
              break;
            i += 1;
          }
          const ch2 = src[i];
          if (ch2 === "\n") {
            if (sep === "\n")
              str += "\n";
            else
              sep = "\n";
          } else {
            const lineEnd = PlainValue.Node.endOfLine(src, i);
            const line = src.slice(i, lineEnd);
            i = lineEnd;
            if (folded && (ch2 === " " || ch2 === "	") && i < keepStart) {
              if (sep === " ")
                sep = "\n";
              else if (!prevMoreIndented && !atStart && sep === "\n")
                sep = "\n\n";
              str += sep + line;
              sep = lineEnd < end && src[lineEnd] || "";
              prevMoreIndented = true;
            } else {
              str += sep + line;
              sep = folded && i < keepStart ? " " : "\n";
              prevMoreIndented = false;
            }
            if (atStart && line !== "")
              atStart = false;
          }
        }
        return this.chomping === Chomp.STRIP ? str : str + "\n";
      }
      parseBlockHeader(start) {
        const {
          src
        } = this.context;
        let offset = start + 1;
        let bi = "";
        while (true) {
          const ch = src[offset];
          switch (ch) {
            case "-":
              this.chomping = Chomp.STRIP;
              break;
            case "+":
              this.chomping = Chomp.KEEP;
              break;
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
              bi += ch;
              break;
            default:
              this.blockIndent = Number(bi) || null;
              this.header = new PlainValue.Range(start, offset);
              return offset;
          }
          offset += 1;
        }
      }
      parseBlockValue(start) {
        const {
          indent,
          src
        } = this.context;
        const explicit = !!this.blockIndent;
        let offset = start;
        let valueEnd = start;
        let minBlockIndent = 1;
        for (let ch = src[offset]; ch === "\n"; ch = src[offset]) {
          offset += 1;
          if (PlainValue.Node.atDocumentBoundary(src, offset))
            break;
          const end = PlainValue.Node.endOfBlockIndent(src, indent, offset);
          if (end === null)
            break;
          const ch2 = src[end];
          const lineIndent = end - (offset + indent);
          if (!this.blockIndent) {
            if (src[end] !== "\n") {
              if (lineIndent < minBlockIndent) {
                const msg = "Block scalars with more-indented leading empty lines must use an explicit indentation indicator";
                this.error = new PlainValue.YAMLSemanticError(this, msg);
              }
              this.blockIndent = lineIndent;
            } else if (lineIndent > minBlockIndent) {
              minBlockIndent = lineIndent;
            }
          } else if (ch2 && ch2 !== "\n" && lineIndent < this.blockIndent) {
            if (src[end] === "#")
              break;
            if (!this.error) {
              const src2 = explicit ? "explicit indentation indicator" : "first line";
              const msg = `Block scalars must not be less indented than their ${src2}`;
              this.error = new PlainValue.YAMLSemanticError(this, msg);
            }
          }
          if (src[end] === "\n") {
            offset = end;
          } else {
            offset = valueEnd = PlainValue.Node.endOfLine(src, end);
          }
        }
        if (this.chomping !== Chomp.KEEP) {
          offset = src[valueEnd] ? valueEnd + 1 : valueEnd;
        }
        this.valueRange = new PlainValue.Range(start + 1, offset);
        return offset;
      }
      parse(context, start) {
        this.context = context;
        const {
          src
        } = context;
        let offset = this.parseBlockHeader(start);
        offset = PlainValue.Node.endOfWhiteSpace(src, offset);
        offset = this.parseComment(offset);
        offset = this.parseBlockValue(offset);
        return offset;
      }
      setOrigRanges(cr, offset) {
        offset = super.setOrigRanges(cr, offset);
        return this.header ? this.header.setOrigRange(cr, offset) : offset;
      }
    };
    var FlowCollection = class extends PlainValue.Node {
      constructor(type, props) {
        super(type, props);
        this.items = null;
      }
      prevNodeIsJsonLike() {
        let idx = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.items.length;
        const node = this.items[idx - 1];
        return !!node && (node.jsonLike || node.type === PlainValue.Type.COMMENT && this.prevNodeIsJsonLike(idx - 1));
      }
      parse(context, start) {
        this.context = context;
        const {
          parseNode,
          src
        } = context;
        let {
          indent,
          lineStart
        } = context;
        let char = src[start];
        this.items = [{
          char,
          offset: start
        }];
        let offset = PlainValue.Node.endOfWhiteSpace(src, start + 1);
        char = src[offset];
        while (char && char !== "]" && char !== "}") {
          switch (char) {
            case "\n":
              {
                lineStart = offset + 1;
                const wsEnd = PlainValue.Node.endOfWhiteSpace(src, lineStart);
                if (src[wsEnd] === "\n") {
                  const blankLine = new BlankLine();
                  lineStart = blankLine.parse({
                    src
                  }, lineStart);
                  this.items.push(blankLine);
                }
                offset = PlainValue.Node.endOfIndent(src, lineStart);
                if (offset <= lineStart + indent) {
                  char = src[offset];
                  if (offset < lineStart + indent || char !== "]" && char !== "}") {
                    const msg = "Insufficient indentation in flow collection";
                    this.error = new PlainValue.YAMLSemanticError(this, msg);
                  }
                }
              }
              break;
            case ",":
              {
                this.items.push({
                  char,
                  offset
                });
                offset += 1;
              }
              break;
            case "#":
              {
                const comment = new Comment();
                offset = comment.parse({
                  src
                }, offset);
                this.items.push(comment);
              }
              break;
            case "?":
            case ":": {
              const next = src[offset + 1];
              if (next === "\n" || next === "	" || next === " " || next === "," || char === ":" && this.prevNodeIsJsonLike()) {
                this.items.push({
                  char,
                  offset
                });
                offset += 1;
                break;
              }
            }
            default: {
              const node = parseNode({
                atLineStart: false,
                inCollection: false,
                inFlow: true,
                indent: -1,
                lineStart,
                parent: this
              }, offset);
              if (!node) {
                this.valueRange = new PlainValue.Range(start, offset);
                return offset;
              }
              this.items.push(node);
              offset = PlainValue.Node.normalizeOffset(src, node.range.end);
            }
          }
          offset = PlainValue.Node.endOfWhiteSpace(src, offset);
          char = src[offset];
        }
        this.valueRange = new PlainValue.Range(start, offset + 1);
        if (char) {
          this.items.push({
            char,
            offset
          });
          offset = PlainValue.Node.endOfWhiteSpace(src, offset + 1);
          offset = this.parseComment(offset);
        }
        return offset;
      }
      setOrigRanges(cr, offset) {
        offset = super.setOrigRanges(cr, offset);
        this.items.forEach((node) => {
          if (node instanceof PlainValue.Node) {
            offset = node.setOrigRanges(cr, offset);
          } else if (cr.length === 0) {
            node.origOffset = node.offset;
          } else {
            let i = offset;
            while (i < cr.length) {
              if (cr[i] > node.offset)
                break;
              else
                ++i;
            }
            node.origOffset = node.offset + i;
            offset = i;
          }
        });
        return offset;
      }
      toString() {
        const {
          context: {
            src
          },
          items,
          range,
          value
        } = this;
        if (value != null)
          return value;
        const nodes = items.filter((item) => item instanceof PlainValue.Node);
        let str = "";
        let prevEnd = range.start;
        nodes.forEach((node) => {
          const prefix = src.slice(prevEnd, node.range.start);
          prevEnd = node.range.end;
          str += prefix + String(node);
          if (str[str.length - 1] === "\n" && src[prevEnd - 1] !== "\n" && src[prevEnd] === "\n") {
            prevEnd += 1;
          }
        });
        str += src.slice(prevEnd, range.end);
        return PlainValue.Node.addStringTerminator(src, range.end, str);
      }
    };
    var QuoteDouble = class extends PlainValue.Node {
      static endOfQuote(src, offset) {
        let ch = src[offset];
        while (ch && ch !== '"') {
          offset += ch === "\\" ? 2 : 1;
          ch = src[offset];
        }
        return offset + 1;
      }
      get strValue() {
        if (!this.valueRange || !this.context)
          return null;
        const errors = [];
        const {
          start,
          end
        } = this.valueRange;
        const {
          indent,
          src
        } = this.context;
        if (src[end - 1] !== '"')
          errors.push(new PlainValue.YAMLSyntaxError(this, 'Missing closing "quote'));
        let str = "";
        for (let i = start + 1; i < end - 1; ++i) {
          const ch = src[i];
          if (ch === "\n") {
            if (PlainValue.Node.atDocumentBoundary(src, i + 1))
              errors.push(new PlainValue.YAMLSemanticError(this, "Document boundary indicators are not allowed within string values"));
            const {
              fold,
              offset,
              error
            } = PlainValue.Node.foldNewline(src, i, indent);
            str += fold;
            i = offset;
            if (error)
              errors.push(new PlainValue.YAMLSemanticError(this, "Multi-line double-quoted string needs to be sufficiently indented"));
          } else if (ch === "\\") {
            i += 1;
            switch (src[i]) {
              case "0":
                str += "\0";
                break;
              case "a":
                str += "\x07";
                break;
              case "b":
                str += "\b";
                break;
              case "e":
                str += "\x1B";
                break;
              case "f":
                str += "\f";
                break;
              case "n":
                str += "\n";
                break;
              case "r":
                str += "\r";
                break;
              case "t":
                str += "	";
                break;
              case "v":
                str += "\v";
                break;
              case "N":
                str += "\x85";
                break;
              case "_":
                str += "\xA0";
                break;
              case "L":
                str += "\u2028";
                break;
              case "P":
                str += "\u2029";
                break;
              case " ":
                str += " ";
                break;
              case '"':
                str += '"';
                break;
              case "/":
                str += "/";
                break;
              case "\\":
                str += "\\";
                break;
              case "	":
                str += "	";
                break;
              case "x":
                str += this.parseCharCode(i + 1, 2, errors);
                i += 2;
                break;
              case "u":
                str += this.parseCharCode(i + 1, 4, errors);
                i += 4;
                break;
              case "U":
                str += this.parseCharCode(i + 1, 8, errors);
                i += 8;
                break;
              case "\n":
                while (src[i + 1] === " " || src[i + 1] === "	")
                  i += 1;
                break;
              default:
                errors.push(new PlainValue.YAMLSyntaxError(this, `Invalid escape sequence ${src.substr(i - 1, 2)}`));
                str += "\\" + src[i];
            }
          } else if (ch === " " || ch === "	") {
            const wsStart = i;
            let next = src[i + 1];
            while (next === " " || next === "	") {
              i += 1;
              next = src[i + 1];
            }
            if (next !== "\n")
              str += i > wsStart ? src.slice(wsStart, i + 1) : ch;
          } else {
            str += ch;
          }
        }
        return errors.length > 0 ? {
          errors,
          str
        } : str;
      }
      parseCharCode(offset, length, errors) {
        const {
          src
        } = this.context;
        const cc = src.substr(offset, length);
        const ok = cc.length === length && /^[0-9a-fA-F]+$/.test(cc);
        const code = ok ? parseInt(cc, 16) : NaN;
        if (isNaN(code)) {
          errors.push(new PlainValue.YAMLSyntaxError(this, `Invalid escape sequence ${src.substr(offset - 2, length + 2)}`));
          return src.substr(offset - 2, length + 2);
        }
        return String.fromCodePoint(code);
      }
      parse(context, start) {
        this.context = context;
        const {
          src
        } = context;
        let offset = QuoteDouble.endOfQuote(src, start + 1);
        this.valueRange = new PlainValue.Range(start, offset);
        offset = PlainValue.Node.endOfWhiteSpace(src, offset);
        offset = this.parseComment(offset);
        return offset;
      }
    };
    var QuoteSingle = class extends PlainValue.Node {
      static endOfQuote(src, offset) {
        let ch = src[offset];
        while (ch) {
          if (ch === "'") {
            if (src[offset + 1] !== "'")
              break;
            ch = src[offset += 2];
          } else {
            ch = src[offset += 1];
          }
        }
        return offset + 1;
      }
      get strValue() {
        if (!this.valueRange || !this.context)
          return null;
        const errors = [];
        const {
          start,
          end
        } = this.valueRange;
        const {
          indent,
          src
        } = this.context;
        if (src[end - 1] !== "'")
          errors.push(new PlainValue.YAMLSyntaxError(this, "Missing closing 'quote"));
        let str = "";
        for (let i = start + 1; i < end - 1; ++i) {
          const ch = src[i];
          if (ch === "\n") {
            if (PlainValue.Node.atDocumentBoundary(src, i + 1))
              errors.push(new PlainValue.YAMLSemanticError(this, "Document boundary indicators are not allowed within string values"));
            const {
              fold,
              offset,
              error
            } = PlainValue.Node.foldNewline(src, i, indent);
            str += fold;
            i = offset;
            if (error)
              errors.push(new PlainValue.YAMLSemanticError(this, "Multi-line single-quoted string needs to be sufficiently indented"));
          } else if (ch === "'") {
            str += ch;
            i += 1;
            if (src[i] !== "'")
              errors.push(new PlainValue.YAMLSyntaxError(this, "Unescaped single quote? This should not happen."));
          } else if (ch === " " || ch === "	") {
            const wsStart = i;
            let next = src[i + 1];
            while (next === " " || next === "	") {
              i += 1;
              next = src[i + 1];
            }
            if (next !== "\n")
              str += i > wsStart ? src.slice(wsStart, i + 1) : ch;
          } else {
            str += ch;
          }
        }
        return errors.length > 0 ? {
          errors,
          str
        } : str;
      }
      parse(context, start) {
        this.context = context;
        const {
          src
        } = context;
        let offset = QuoteSingle.endOfQuote(src, start + 1);
        this.valueRange = new PlainValue.Range(start, offset);
        offset = PlainValue.Node.endOfWhiteSpace(src, offset);
        offset = this.parseComment(offset);
        return offset;
      }
    };
    function createNewNode(type, props) {
      switch (type) {
        case PlainValue.Type.ALIAS:
          return new Alias(type, props);
        case PlainValue.Type.BLOCK_FOLDED:
        case PlainValue.Type.BLOCK_LITERAL:
          return new BlockValue(type, props);
        case PlainValue.Type.FLOW_MAP:
        case PlainValue.Type.FLOW_SEQ:
          return new FlowCollection(type, props);
        case PlainValue.Type.MAP_KEY:
        case PlainValue.Type.MAP_VALUE:
        case PlainValue.Type.SEQ_ITEM:
          return new CollectionItem(type, props);
        case PlainValue.Type.COMMENT:
        case PlainValue.Type.PLAIN:
          return new PlainValue.PlainValue(type, props);
        case PlainValue.Type.QUOTE_DOUBLE:
          return new QuoteDouble(type, props);
        case PlainValue.Type.QUOTE_SINGLE:
          return new QuoteSingle(type, props);
        default:
          return null;
      }
    }
    var ParseContext = class {
      static parseType(src, offset, inFlow) {
        switch (src[offset]) {
          case "*":
            return PlainValue.Type.ALIAS;
          case ">":
            return PlainValue.Type.BLOCK_FOLDED;
          case "|":
            return PlainValue.Type.BLOCK_LITERAL;
          case "{":
            return PlainValue.Type.FLOW_MAP;
          case "[":
            return PlainValue.Type.FLOW_SEQ;
          case "?":
            return !inFlow && PlainValue.Node.atBlank(src, offset + 1, true) ? PlainValue.Type.MAP_KEY : PlainValue.Type.PLAIN;
          case ":":
            return !inFlow && PlainValue.Node.atBlank(src, offset + 1, true) ? PlainValue.Type.MAP_VALUE : PlainValue.Type.PLAIN;
          case "-":
            return !inFlow && PlainValue.Node.atBlank(src, offset + 1, true) ? PlainValue.Type.SEQ_ITEM : PlainValue.Type.PLAIN;
          case '"':
            return PlainValue.Type.QUOTE_DOUBLE;
          case "'":
            return PlainValue.Type.QUOTE_SINGLE;
          default:
            return PlainValue.Type.PLAIN;
        }
      }
      constructor() {
        let orig = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        let {
          atLineStart,
          inCollection,
          inFlow,
          indent,
          lineStart,
          parent
        } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        PlainValue._defineProperty(this, "parseNode", (overlay, start) => {
          if (PlainValue.Node.atDocumentBoundary(this.src, start))
            return null;
          const context = new ParseContext(this, overlay);
          const {
            props,
            type,
            valueStart
          } = context.parseProps(start);
          const node = createNewNode(type, props);
          let offset = node.parse(context, valueStart);
          node.range = new PlainValue.Range(start, offset);
          if (offset <= start) {
            node.error = new Error(`Node#parse consumed no characters`);
            node.error.parseEnd = offset;
            node.error.source = node;
            node.range.end = start + 1;
          }
          if (context.nodeStartsCollection(node)) {
            if (!node.error && !context.atLineStart && context.parent.type === PlainValue.Type.DOCUMENT) {
              node.error = new PlainValue.YAMLSyntaxError(node, "Block collection must not have preceding content here (e.g. directives-end indicator)");
            }
            const collection = new Collection(node);
            offset = collection.parse(new ParseContext(context), offset);
            collection.range = new PlainValue.Range(start, offset);
            return collection;
          }
          return node;
        });
        this.atLineStart = atLineStart != null ? atLineStart : orig.atLineStart || false;
        this.inCollection = inCollection != null ? inCollection : orig.inCollection || false;
        this.inFlow = inFlow != null ? inFlow : orig.inFlow || false;
        this.indent = indent != null ? indent : orig.indent;
        this.lineStart = lineStart != null ? lineStart : orig.lineStart;
        this.parent = parent != null ? parent : orig.parent || {};
        this.root = orig.root;
        this.src = orig.src;
      }
      nodeStartsCollection(node) {
        const {
          inCollection,
          inFlow,
          src
        } = this;
        if (inCollection || inFlow)
          return false;
        if (node instanceof CollectionItem)
          return true;
        let offset = node.range.end;
        if (src[offset] === "\n" || src[offset - 1] === "\n")
          return false;
        offset = PlainValue.Node.endOfWhiteSpace(src, offset);
        return src[offset] === ":";
      }
      parseProps(offset) {
        const {
          inFlow,
          parent,
          src
        } = this;
        const props = [];
        let lineHasProps = false;
        offset = this.atLineStart ? PlainValue.Node.endOfIndent(src, offset) : PlainValue.Node.endOfWhiteSpace(src, offset);
        let ch = src[offset];
        while (ch === PlainValue.Char.ANCHOR || ch === PlainValue.Char.COMMENT || ch === PlainValue.Char.TAG || ch === "\n") {
          if (ch === "\n") {
            let inEnd = offset;
            let lineStart;
            do {
              lineStart = inEnd + 1;
              inEnd = PlainValue.Node.endOfIndent(src, lineStart);
            } while (src[inEnd] === "\n");
            const indentDiff = inEnd - (lineStart + this.indent);
            const noIndicatorAsIndent = parent.type === PlainValue.Type.SEQ_ITEM && parent.context.atLineStart;
            if (src[inEnd] !== "#" && !PlainValue.Node.nextNodeIsIndented(src[inEnd], indentDiff, !noIndicatorAsIndent))
              break;
            this.atLineStart = true;
            this.lineStart = lineStart;
            lineHasProps = false;
            offset = inEnd;
          } else if (ch === PlainValue.Char.COMMENT) {
            const end = PlainValue.Node.endOfLine(src, offset + 1);
            props.push(new PlainValue.Range(offset, end));
            offset = end;
          } else {
            let end = PlainValue.Node.endOfIdentifier(src, offset + 1);
            if (ch === PlainValue.Char.TAG && src[end] === "," && /^[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+,\d\d\d\d(-\d\d){0,2}\/\S/.test(src.slice(offset + 1, end + 13))) {
              end = PlainValue.Node.endOfIdentifier(src, end + 5);
            }
            props.push(new PlainValue.Range(offset, end));
            lineHasProps = true;
            offset = PlainValue.Node.endOfWhiteSpace(src, end);
          }
          ch = src[offset];
        }
        if (lineHasProps && ch === ":" && PlainValue.Node.atBlank(src, offset + 1, true))
          offset -= 1;
        const type = ParseContext.parseType(src, offset, inFlow);
        return {
          props,
          type,
          valueStart: offset
        };
      }
    };
    function parse(src) {
      const cr = [];
      if (src.indexOf("\r") !== -1) {
        src = src.replace(/\r\n?/g, (match, offset2) => {
          if (match.length > 1)
            cr.push(offset2);
          return "\n";
        });
      }
      const documents = [];
      let offset = 0;
      do {
        const doc = new Document();
        const context = new ParseContext({
          src
        });
        offset = doc.parse(context, offset);
        documents.push(doc);
      } while (offset < src.length);
      documents.setOrigRanges = () => {
        if (cr.length === 0)
          return false;
        for (let i = 1; i < cr.length; ++i)
          cr[i] -= i;
        let crOffset = 0;
        for (let i = 0; i < documents.length; ++i) {
          crOffset = documents[i].setOrigRanges(cr, crOffset);
        }
        cr.splice(0, cr.length);
        return true;
      };
      documents.toString = () => documents.join("...\n");
      return documents;
    }
    exports.parse = parse;
  }
});
var require_resolveSeq_d03cb037 = __commonJS({
  "node_modules/yaml/dist/resolveSeq-d03cb037.js"(exports) {
    "use strict";
    init_define_process();
    var PlainValue = require_PlainValue_ec8e588e();
    function addCommentBefore(str, indent, comment) {
      if (!comment)
        return str;
      const cc = comment.replace(/[\s\S]^/gm, `$&${indent}#`);
      return `#${cc}
${indent}${str}`;
    }
    function addComment(str, indent, comment) {
      return !comment ? str : comment.indexOf("\n") === -1 ? `${str} #${comment}` : `${str}
` + comment.replace(/^/gm, `${indent || ""}#`);
    }
    var Node = class {
    };
    function toJSON(value, arg, ctx) {
      if (Array.isArray(value))
        return value.map((v, i) => toJSON(v, String(i), ctx));
      if (value && typeof value.toJSON === "function") {
        const anchor = ctx && ctx.anchors && ctx.anchors.get(value);
        if (anchor)
          ctx.onCreate = (res2) => {
            anchor.res = res2;
            delete ctx.onCreate;
          };
        const res = value.toJSON(arg, ctx);
        if (anchor && ctx.onCreate)
          ctx.onCreate(res);
        return res;
      }
      if ((!ctx || !ctx.keep) && typeof value === "bigint")
        return Number(value);
      return value;
    }
    var Scalar = class extends Node {
      constructor(value) {
        super();
        this.value = value;
      }
      toJSON(arg, ctx) {
        return ctx && ctx.keep ? this.value : toJSON(this.value, arg, ctx);
      }
      toString() {
        return String(this.value);
      }
    };
    function collectionFromPath(schema, path, value) {
      let v = value;
      for (let i = path.length - 1; i >= 0; --i) {
        const k = path[i];
        if (Number.isInteger(k) && k >= 0) {
          const a = [];
          a[k] = v;
          v = a;
        } else {
          const o = {};
          Object.defineProperty(o, k, {
            value: v,
            writable: true,
            enumerable: true,
            configurable: true
          });
          v = o;
        }
      }
      return schema.createNode(v, false);
    }
    var isEmptyPath = (path) => path == null || typeof path === "object" && path[Symbol.iterator]().next().done;
    var Collection = class extends Node {
      constructor(schema) {
        super();
        PlainValue._defineProperty(this, "items", []);
        this.schema = schema;
      }
      addIn(path, value) {
        if (isEmptyPath(path))
          this.add(value);
        else {
          const [key, ...rest] = path;
          const node = this.get(key, true);
          if (node instanceof Collection)
            node.addIn(rest, value);
          else if (node === void 0 && this.schema)
            this.set(key, collectionFromPath(this.schema, rest, value));
          else
            throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
        }
      }
      deleteIn(_ref2) {
        let [key, ...rest] = _ref2;
        if (rest.length === 0)
          return this.delete(key);
        const node = this.get(key, true);
        if (node instanceof Collection)
          return node.deleteIn(rest);
        else
          throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
      }
      getIn(_ref3, keepScalar) {
        let [key, ...rest] = _ref3;
        const node = this.get(key, true);
        if (rest.length === 0)
          return !keepScalar && node instanceof Scalar ? node.value : node;
        else
          return node instanceof Collection ? node.getIn(rest, keepScalar) : void 0;
      }
      hasAllNullValues() {
        return this.items.every((node) => {
          if (!node || node.type !== "PAIR")
            return false;
          const n = node.value;
          return n == null || n instanceof Scalar && n.value == null && !n.commentBefore && !n.comment && !n.tag;
        });
      }
      hasIn(_ref4) {
        let [key, ...rest] = _ref4;
        if (rest.length === 0)
          return this.has(key);
        const node = this.get(key, true);
        return node instanceof Collection ? node.hasIn(rest) : false;
      }
      setIn(_ref5, value) {
        let [key, ...rest] = _ref5;
        if (rest.length === 0) {
          this.set(key, value);
        } else {
          const node = this.get(key, true);
          if (node instanceof Collection)
            node.setIn(rest, value);
          else if (node === void 0 && this.schema)
            this.set(key, collectionFromPath(this.schema, rest, value));
          else
            throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
        }
      }
      toJSON() {
        return null;
      }
      toString(ctx, _ref6, onComment, onChompKeep) {
        let {
          blockItem,
          flowChars,
          isMap,
          itemIndent
        } = _ref6;
        const {
          indent,
          indentStep,
          stringify
        } = ctx;
        const inFlow = this.type === PlainValue.Type.FLOW_MAP || this.type === PlainValue.Type.FLOW_SEQ || ctx.inFlow;
        if (inFlow)
          itemIndent += indentStep;
        const allNullValues = isMap && this.hasAllNullValues();
        ctx = Object.assign({}, ctx, {
          allNullValues,
          indent: itemIndent,
          inFlow,
          type: null
        });
        let chompKeep = false;
        let hasItemWithNewLine = false;
        const nodes = this.items.reduce((nodes2, item, i) => {
          let comment;
          if (item) {
            if (!chompKeep && item.spaceBefore)
              nodes2.push({
                type: "comment",
                str: ""
              });
            if (item.commentBefore)
              item.commentBefore.match(/^.*$/gm).forEach((line) => {
                nodes2.push({
                  type: "comment",
                  str: `#${line}`
                });
              });
            if (item.comment)
              comment = item.comment;
            if (inFlow && (!chompKeep && item.spaceBefore || item.commentBefore || item.comment || item.key && (item.key.commentBefore || item.key.comment) || item.value && (item.value.commentBefore || item.value.comment)))
              hasItemWithNewLine = true;
          }
          chompKeep = false;
          let str2 = stringify(item, ctx, () => comment = null, () => chompKeep = true);
          if (inFlow && !hasItemWithNewLine && str2.includes("\n"))
            hasItemWithNewLine = true;
          if (inFlow && i < this.items.length - 1)
            str2 += ",";
          str2 = addComment(str2, itemIndent, comment);
          if (chompKeep && (comment || inFlow))
            chompKeep = false;
          nodes2.push({
            type: "item",
            str: str2
          });
          return nodes2;
        }, []);
        let str;
        if (nodes.length === 0) {
          str = flowChars.start + flowChars.end;
        } else if (inFlow) {
          const {
            start,
            end
          } = flowChars;
          const strings = nodes.map((n) => n.str);
          if (hasItemWithNewLine || strings.reduce((sum, str2) => sum + str2.length + 2, 2) > Collection.maxFlowStringSingleLineLength) {
            str = start;
            for (const s of strings) {
              str += s ? `
${indentStep}${indent}${s}` : "\n";
            }
            str += `
${indent}${end}`;
          } else {
            str = `${start} ${strings.join(" ")} ${end}`;
          }
        } else {
          const strings = nodes.map(blockItem);
          str = strings.shift();
          for (const s of strings)
            str += s ? `
${indent}${s}` : "\n";
        }
        if (this.comment) {
          str += "\n" + this.comment.replace(/^/gm, `${indent}#`);
          if (onComment)
            onComment();
        } else if (chompKeep && onChompKeep)
          onChompKeep();
        return str;
      }
    };
    PlainValue._defineProperty(Collection, "maxFlowStringSingleLineLength", 60);
    function asItemIndex(key) {
      let idx = key instanceof Scalar ? key.value : key;
      if (idx && typeof idx === "string")
        idx = Number(idx);
      return Number.isInteger(idx) && idx >= 0 ? idx : null;
    }
    var YAMLSeq = class extends Collection {
      add(value) {
        this.items.push(value);
      }
      delete(key) {
        const idx = asItemIndex(key);
        if (typeof idx !== "number")
          return false;
        const del = this.items.splice(idx, 1);
        return del.length > 0;
      }
      get(key, keepScalar) {
        const idx = asItemIndex(key);
        if (typeof idx !== "number")
          return void 0;
        const it = this.items[idx];
        return !keepScalar && it instanceof Scalar ? it.value : it;
      }
      has(key) {
        const idx = asItemIndex(key);
        return typeof idx === "number" && idx < this.items.length;
      }
      set(key, value) {
        const idx = asItemIndex(key);
        if (typeof idx !== "number")
          throw new Error(`Expected a valid index, not ${key}.`);
        this.items[idx] = value;
      }
      toJSON(_, ctx) {
        const seq = [];
        if (ctx && ctx.onCreate)
          ctx.onCreate(seq);
        let i = 0;
        for (const item of this.items)
          seq.push(toJSON(item, String(i++), ctx));
        return seq;
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx)
          return JSON.stringify(this);
        return super.toString(ctx, {
          blockItem: (n) => n.type === "comment" ? n.str : `- ${n.str}`,
          flowChars: {
            start: "[",
            end: "]"
          },
          isMap: false,
          itemIndent: (ctx.indent || "") + "  "
        }, onComment, onChompKeep);
      }
    };
    var stringifyKey = (key, jsKey, ctx) => {
      if (jsKey === null)
        return "";
      if (typeof jsKey !== "object")
        return String(jsKey);
      if (key instanceof Node && ctx && ctx.doc)
        return key.toString({
          anchors: /* @__PURE__ */ Object.create(null),
          doc: ctx.doc,
          indent: "",
          indentStep: ctx.indentStep,
          inFlow: true,
          inStringifyKey: true,
          stringify: ctx.stringify
        });
      return JSON.stringify(jsKey);
    };
    var Pair = class extends Node {
      constructor(key) {
        let value = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        super();
        this.key = key;
        this.value = value;
        this.type = Pair.Type.PAIR;
      }
      get commentBefore() {
        return this.key instanceof Node ? this.key.commentBefore : void 0;
      }
      set commentBefore(cb) {
        if (this.key == null)
          this.key = new Scalar(null);
        if (this.key instanceof Node)
          this.key.commentBefore = cb;
        else {
          const msg = "Pair.commentBefore is an alias for Pair.key.commentBefore. To set it, the key must be a Node.";
          throw new Error(msg);
        }
      }
      addToJSMap(ctx, map) {
        const key = toJSON(this.key, "", ctx);
        if (map instanceof Map) {
          const value = toJSON(this.value, key, ctx);
          map.set(key, value);
        } else if (map instanceof Set) {
          map.add(key);
        } else {
          const stringKey = stringifyKey(this.key, key, ctx);
          const value = toJSON(this.value, stringKey, ctx);
          if (stringKey in map)
            Object.defineProperty(map, stringKey, {
              value,
              writable: true,
              enumerable: true,
              configurable: true
            });
          else
            map[stringKey] = value;
        }
        return map;
      }
      toJSON(_, ctx) {
        const pair = ctx && ctx.mapAsMap ? /* @__PURE__ */ new Map() : {};
        return this.addToJSMap(ctx, pair);
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx || !ctx.doc)
          return JSON.stringify(this);
        const {
          indent: indentSize,
          indentSeq,
          simpleKeys
        } = ctx.doc.options;
        let {
          key,
          value
        } = this;
        let keyComment = key instanceof Node && key.comment;
        if (simpleKeys) {
          if (keyComment) {
            throw new Error("With simple keys, key nodes cannot have comments");
          }
          if (key instanceof Collection) {
            const msg = "With simple keys, collection cannot be used as a key value";
            throw new Error(msg);
          }
        }
        let explicitKey = !simpleKeys && (!key || keyComment || (key instanceof Node ? key instanceof Collection || key.type === PlainValue.Type.BLOCK_FOLDED || key.type === PlainValue.Type.BLOCK_LITERAL : typeof key === "object"));
        const {
          doc,
          indent,
          indentStep,
          stringify
        } = ctx;
        ctx = Object.assign({}, ctx, {
          implicitKey: !explicitKey,
          indent: indent + indentStep
        });
        let chompKeep = false;
        let str = stringify(key, ctx, () => keyComment = null, () => chompKeep = true);
        str = addComment(str, ctx.indent, keyComment);
        if (!explicitKey && str.length > 1024) {
          if (simpleKeys)
            throw new Error("With simple keys, single line scalar must not span more than 1024 characters");
          explicitKey = true;
        }
        if (ctx.allNullValues && !simpleKeys) {
          if (this.comment) {
            str = addComment(str, ctx.indent, this.comment);
            if (onComment)
              onComment();
          } else if (chompKeep && !keyComment && onChompKeep)
            onChompKeep();
          return ctx.inFlow && !explicitKey ? str : `? ${str}`;
        }
        str = explicitKey ? `? ${str}
${indent}:` : `${str}:`;
        if (this.comment) {
          str = addComment(str, ctx.indent, this.comment);
          if (onComment)
            onComment();
        }
        let vcb = "";
        let valueComment = null;
        if (value instanceof Node) {
          if (value.spaceBefore)
            vcb = "\n";
          if (value.commentBefore) {
            const cs = value.commentBefore.replace(/^/gm, `${ctx.indent}#`);
            vcb += `
${cs}`;
          }
          valueComment = value.comment;
        } else if (value && typeof value === "object") {
          value = doc.schema.createNode(value, true);
        }
        ctx.implicitKey = false;
        if (!explicitKey && !this.comment && value instanceof Scalar)
          ctx.indentAtStart = str.length + 1;
        chompKeep = false;
        if (!indentSeq && indentSize >= 2 && !ctx.inFlow && !explicitKey && value instanceof YAMLSeq && value.type !== PlainValue.Type.FLOW_SEQ && !value.tag && !doc.anchors.getName(value)) {
          ctx.indent = ctx.indent.substr(2);
        }
        const valueStr = stringify(value, ctx, () => valueComment = null, () => chompKeep = true);
        let ws = " ";
        if (vcb || this.comment) {
          ws = `${vcb}
${ctx.indent}`;
        } else if (!explicitKey && value instanceof Collection) {
          const flow = valueStr[0] === "[" || valueStr[0] === "{";
          if (!flow || valueStr.includes("\n"))
            ws = `
${ctx.indent}`;
        } else if (valueStr[0] === "\n")
          ws = "";
        if (chompKeep && !valueComment && onChompKeep)
          onChompKeep();
        return addComment(str + ws + valueStr, ctx.indent, valueComment);
      }
    };
    PlainValue._defineProperty(Pair, "Type", {
      PAIR: "PAIR",
      MERGE_PAIR: "MERGE_PAIR"
    });
    var getAliasCount = (node, anchors) => {
      if (node instanceof Alias) {
        const anchor = anchors.get(node.source);
        return anchor.count * anchor.aliasCount;
      } else if (node instanceof Collection) {
        let count = 0;
        for (const item of node.items) {
          const c = getAliasCount(item, anchors);
          if (c > count)
            count = c;
        }
        return count;
      } else if (node instanceof Pair) {
        const kc = getAliasCount(node.key, anchors);
        const vc = getAliasCount(node.value, anchors);
        return Math.max(kc, vc);
      }
      return 1;
    };
    var Alias = class extends Node {
      static stringify(_ref7, _ref8) {
        let {
          range,
          source
        } = _ref7;
        let {
          anchors,
          doc,
          implicitKey,
          inStringifyKey
        } = _ref8;
        let anchor = Object.keys(anchors).find((a) => anchors[a] === source);
        if (!anchor && inStringifyKey)
          anchor = doc.anchors.getName(source) || doc.anchors.newName();
        if (anchor)
          return `*${anchor}${implicitKey ? " " : ""}`;
        const msg = doc.anchors.getName(source) ? "Alias node must be after source node" : "Source node not found for alias node";
        throw new Error(`${msg} [${range}]`);
      }
      constructor(source) {
        super();
        this.source = source;
        this.type = PlainValue.Type.ALIAS;
      }
      set tag(t) {
        throw new Error("Alias nodes cannot have tags");
      }
      toJSON(arg, ctx) {
        if (!ctx)
          return toJSON(this.source, arg, ctx);
        const {
          anchors,
          maxAliasCount
        } = ctx;
        const anchor = anchors.get(this.source);
        if (!anchor || anchor.res === void 0) {
          const msg = "This should not happen: Alias anchor was not resolved?";
          if (this.cstNode)
            throw new PlainValue.YAMLReferenceError(this.cstNode, msg);
          else
            throw new ReferenceError(msg);
        }
        if (maxAliasCount >= 0) {
          anchor.count += 1;
          if (anchor.aliasCount === 0)
            anchor.aliasCount = getAliasCount(this.source, anchors);
          if (anchor.count * anchor.aliasCount > maxAliasCount) {
            const msg = "Excessive alias count indicates a resource exhaustion attack";
            if (this.cstNode)
              throw new PlainValue.YAMLReferenceError(this.cstNode, msg);
            else
              throw new ReferenceError(msg);
          }
        }
        return anchor.res;
      }
      toString(ctx) {
        return Alias.stringify(this, ctx);
      }
    };
    PlainValue._defineProperty(Alias, "default", true);
    function findPair(items, key) {
      const k = key instanceof Scalar ? key.value : key;
      for (const it of items) {
        if (it instanceof Pair) {
          if (it.key === key || it.key === k)
            return it;
          if (it.key && it.key.value === k)
            return it;
        }
      }
      return void 0;
    }
    var YAMLMap = class extends Collection {
      add(pair, overwrite) {
        if (!pair)
          pair = new Pair(pair);
        else if (!(pair instanceof Pair))
          pair = new Pair(pair.key || pair, pair.value);
        const prev = findPair(this.items, pair.key);
        const sortEntries = this.schema && this.schema.sortMapEntries;
        if (prev) {
          if (overwrite)
            prev.value = pair.value;
          else
            throw new Error(`Key ${pair.key} already set`);
        } else if (sortEntries) {
          const i = this.items.findIndex((item) => sortEntries(pair, item) < 0);
          if (i === -1)
            this.items.push(pair);
          else
            this.items.splice(i, 0, pair);
        } else {
          this.items.push(pair);
        }
      }
      delete(key) {
        const it = findPair(this.items, key);
        if (!it)
          return false;
        const del = this.items.splice(this.items.indexOf(it), 1);
        return del.length > 0;
      }
      get(key, keepScalar) {
        const it = findPair(this.items, key);
        const node = it && it.value;
        return !keepScalar && node instanceof Scalar ? node.value : node;
      }
      has(key) {
        return !!findPair(this.items, key);
      }
      set(key, value) {
        this.add(new Pair(key, value), true);
      }
      toJSON(_, ctx, Type) {
        const map = Type ? new Type() : ctx && ctx.mapAsMap ? /* @__PURE__ */ new Map() : {};
        if (ctx && ctx.onCreate)
          ctx.onCreate(map);
        for (const item of this.items)
          item.addToJSMap(ctx, map);
        return map;
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx)
          return JSON.stringify(this);
        for (const item of this.items) {
          if (!(item instanceof Pair))
            throw new Error(`Map items must all be pairs; found ${JSON.stringify(item)} instead`);
        }
        return super.toString(ctx, {
          blockItem: (n) => n.str,
          flowChars: {
            start: "{",
            end: "}"
          },
          isMap: true,
          itemIndent: ctx.indent || ""
        }, onComment, onChompKeep);
      }
    };
    var MERGE_KEY = "<<";
    var Merge = class extends Pair {
      constructor(pair) {
        if (pair instanceof Pair) {
          let seq = pair.value;
          if (!(seq instanceof YAMLSeq)) {
            seq = new YAMLSeq();
            seq.items.push(pair.value);
            seq.range = pair.value.range;
          }
          super(pair.key, seq);
          this.range = pair.range;
        } else {
          super(new Scalar(MERGE_KEY), new YAMLSeq());
        }
        this.type = Pair.Type.MERGE_PAIR;
      }
      addToJSMap(ctx, map) {
        for (const {
          source
        } of this.value.items) {
          if (!(source instanceof YAMLMap))
            throw new Error("Merge sources must be maps");
          const srcMap = source.toJSON(null, ctx, Map);
          for (const [key, value] of srcMap) {
            if (map instanceof Map) {
              if (!map.has(key))
                map.set(key, value);
            } else if (map instanceof Set) {
              map.add(key);
            } else if (!Object.prototype.hasOwnProperty.call(map, key)) {
              Object.defineProperty(map, key, {
                value,
                writable: true,
                enumerable: true,
                configurable: true
              });
            }
          }
        }
        return map;
      }
      toString(ctx, onComment) {
        const seq = this.value;
        if (seq.items.length > 1)
          return super.toString(ctx, onComment);
        this.value = seq.items[0];
        const str = super.toString(ctx, onComment);
        this.value = seq;
        return str;
      }
    };
    var binaryOptions = {
      defaultType: PlainValue.Type.BLOCK_LITERAL,
      lineWidth: 76
    };
    var boolOptions = {
      trueStr: "true",
      falseStr: "false"
    };
    var intOptions = {
      asBigInt: false
    };
    var nullOptions = {
      nullStr: "null"
    };
    var strOptions = {
      defaultType: PlainValue.Type.PLAIN,
      doubleQuoted: {
        jsonEncoding: false,
        minMultiLineLength: 40
      },
      fold: {
        lineWidth: 80,
        minContentWidth: 20
      }
    };
    function resolveScalar(str, tags, scalarFallback) {
      for (const {
        format,
        test,
        resolve
      } of tags) {
        if (test) {
          const match = str.match(test);
          if (match) {
            let res = resolve.apply(null, match);
            if (!(res instanceof Scalar))
              res = new Scalar(res);
            if (format)
              res.format = format;
            return res;
          }
        }
      }
      if (scalarFallback)
        str = scalarFallback(str);
      return new Scalar(str);
    }
    var FOLD_FLOW = "flow";
    var FOLD_BLOCK = "block";
    var FOLD_QUOTED = "quoted";
    var consumeMoreIndentedLines = (text, i) => {
      let ch = text[i + 1];
      while (ch === " " || ch === "	") {
        do {
          ch = text[i += 1];
        } while (ch && ch !== "\n");
        ch = text[i + 1];
      }
      return i;
    };
    function foldFlowLines(text, indent, mode, _ref9) {
      let {
        indentAtStart,
        lineWidth = 80,
        minContentWidth = 20,
        onFold,
        onOverflow
      } = _ref9;
      if (!lineWidth || lineWidth < 0)
        return text;
      const endStep = Math.max(1 + minContentWidth, 1 + lineWidth - indent.length);
      if (text.length <= endStep)
        return text;
      const folds = [];
      const escapedFolds = {};
      let end = lineWidth - indent.length;
      if (typeof indentAtStart === "number") {
        if (indentAtStart > lineWidth - Math.max(2, minContentWidth))
          folds.push(0);
        else
          end = lineWidth - indentAtStart;
      }
      let split = void 0;
      let prev = void 0;
      let overflow = false;
      let i = -1;
      let escStart = -1;
      let escEnd = -1;
      if (mode === FOLD_BLOCK) {
        i = consumeMoreIndentedLines(text, i);
        if (i !== -1)
          end = i + endStep;
      }
      for (let ch; ch = text[i += 1]; ) {
        if (mode === FOLD_QUOTED && ch === "\\") {
          escStart = i;
          switch (text[i + 1]) {
            case "x":
              i += 3;
              break;
            case "u":
              i += 5;
              break;
            case "U":
              i += 9;
              break;
            default:
              i += 1;
          }
          escEnd = i;
        }
        if (ch === "\n") {
          if (mode === FOLD_BLOCK)
            i = consumeMoreIndentedLines(text, i);
          end = i + endStep;
          split = void 0;
        } else {
          if (ch === " " && prev && prev !== " " && prev !== "\n" && prev !== "	") {
            const next = text[i + 1];
            if (next && next !== " " && next !== "\n" && next !== "	")
              split = i;
          }
          if (i >= end) {
            if (split) {
              folds.push(split);
              end = split + endStep;
              split = void 0;
            } else if (mode === FOLD_QUOTED) {
              while (prev === " " || prev === "	") {
                prev = ch;
                ch = text[i += 1];
                overflow = true;
              }
              const j = i > escEnd + 1 ? i - 2 : escStart - 1;
              if (escapedFolds[j])
                return text;
              folds.push(j);
              escapedFolds[j] = true;
              end = j + endStep;
              split = void 0;
            } else {
              overflow = true;
            }
          }
        }
        prev = ch;
      }
      if (overflow && onOverflow)
        onOverflow();
      if (folds.length === 0)
        return text;
      if (onFold)
        onFold();
      let res = text.slice(0, folds[0]);
      for (let i2 = 0; i2 < folds.length; ++i2) {
        const fold = folds[i2];
        const end2 = folds[i2 + 1] || text.length;
        if (fold === 0)
          res = `
${indent}${text.slice(0, end2)}`;
        else {
          if (mode === FOLD_QUOTED && escapedFolds[fold])
            res += `${text[fold]}\\`;
          res += `
${indent}${text.slice(fold + 1, end2)}`;
        }
      }
      return res;
    }
    var getFoldOptions = (_ref10) => {
      let {
        indentAtStart
      } = _ref10;
      return indentAtStart ? Object.assign({
        indentAtStart
      }, strOptions.fold) : strOptions.fold;
    };
    var containsDocumentMarker = (str) => /^(%|---|\.\.\.)/m.test(str);
    function lineLengthOverLimit(str, lineWidth, indentLength) {
      if (!lineWidth || lineWidth < 0)
        return false;
      const limit = lineWidth - indentLength;
      const strLen = str.length;
      if (strLen <= limit)
        return false;
      for (let i = 0, start = 0; i < strLen; ++i) {
        if (str[i] === "\n") {
          if (i - start > limit)
            return true;
          start = i + 1;
          if (strLen - start <= limit)
            return false;
        }
      }
      return true;
    }
    function doubleQuotedString(value, ctx) {
      const {
        implicitKey
      } = ctx;
      const {
        jsonEncoding,
        minMultiLineLength
      } = strOptions.doubleQuoted;
      const json = JSON.stringify(value);
      if (jsonEncoding)
        return json;
      const indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
      let str = "";
      let start = 0;
      for (let i = 0, ch = json[i]; ch; ch = json[++i]) {
        if (ch === " " && json[i + 1] === "\\" && json[i + 2] === "n") {
          str += json.slice(start, i) + "\\ ";
          i += 1;
          start = i;
          ch = "\\";
        }
        if (ch === "\\")
          switch (json[i + 1]) {
            case "u":
              {
                str += json.slice(start, i);
                const code = json.substr(i + 2, 4);
                switch (code) {
                  case "0000":
                    str += "\\0";
                    break;
                  case "0007":
                    str += "\\a";
                    break;
                  case "000b":
                    str += "\\v";
                    break;
                  case "001b":
                    str += "\\e";
                    break;
                  case "0085":
                    str += "\\N";
                    break;
                  case "00a0":
                    str += "\\_";
                    break;
                  case "2028":
                    str += "\\L";
                    break;
                  case "2029":
                    str += "\\P";
                    break;
                  default:
                    if (code.substr(0, 2) === "00")
                      str += "\\x" + code.substr(2);
                    else
                      str += json.substr(i, 6);
                }
                i += 5;
                start = i + 1;
              }
              break;
            case "n":
              if (implicitKey || json[i + 2] === '"' || json.length < minMultiLineLength) {
                i += 1;
              } else {
                str += json.slice(start, i) + "\n\n";
                while (json[i + 2] === "\\" && json[i + 3] === "n" && json[i + 4] !== '"') {
                  str += "\n";
                  i += 2;
                }
                str += indent;
                if (json[i + 2] === " ")
                  str += "\\";
                i += 1;
                start = i + 1;
              }
              break;
            default:
              i += 1;
          }
      }
      str = start ? str + json.slice(start) : json;
      return implicitKey ? str : foldFlowLines(str, indent, FOLD_QUOTED, getFoldOptions(ctx));
    }
    function singleQuotedString(value, ctx) {
      if (ctx.implicitKey) {
        if (/\n/.test(value))
          return doubleQuotedString(value, ctx);
      } else {
        if (/[ \t]\n|\n[ \t]/.test(value))
          return doubleQuotedString(value, ctx);
      }
      const indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
      const res = "'" + value.replace(/'/g, "''").replace(/\n+/g, `$&
${indent}`) + "'";
      return ctx.implicitKey ? res : foldFlowLines(res, indent, FOLD_FLOW, getFoldOptions(ctx));
    }
    function blockString(_ref11, ctx, onComment, onChompKeep) {
      let {
        comment,
        type,
        value
      } = _ref11;
      if (/\n[\t ]+$/.test(value) || /^\s*$/.test(value)) {
        return doubleQuotedString(value, ctx);
      }
      const indent = ctx.indent || (ctx.forceBlockIndent || containsDocumentMarker(value) ? "  " : "");
      const indentSize = indent ? "2" : "1";
      const literal = type === PlainValue.Type.BLOCK_FOLDED ? false : type === PlainValue.Type.BLOCK_LITERAL ? true : !lineLengthOverLimit(value, strOptions.fold.lineWidth, indent.length);
      let header = literal ? "|" : ">";
      if (!value)
        return header + "\n";
      let wsStart = "";
      let wsEnd = "";
      value = value.replace(/[\n\t ]*$/, (ws) => {
        const n = ws.indexOf("\n");
        if (n === -1) {
          header += "-";
        } else if (value === ws || n !== ws.length - 1) {
          header += "+";
          if (onChompKeep)
            onChompKeep();
        }
        wsEnd = ws.replace(/\n$/, "");
        return "";
      }).replace(/^[\n ]*/, (ws) => {
        if (ws.indexOf(" ") !== -1)
          header += indentSize;
        const m = ws.match(/ +$/);
        if (m) {
          wsStart = ws.slice(0, -m[0].length);
          return m[0];
        } else {
          wsStart = ws;
          return "";
        }
      });
      if (wsEnd)
        wsEnd = wsEnd.replace(/\n+(?!\n|$)/g, `$&${indent}`);
      if (wsStart)
        wsStart = wsStart.replace(/\n+/g, `$&${indent}`);
      if (comment) {
        header += " #" + comment.replace(/ ?[\r\n]+/g, " ");
        if (onComment)
          onComment();
      }
      if (!value)
        return `${header}${indentSize}
${indent}${wsEnd}`;
      if (literal) {
        value = value.replace(/\n+/g, `$&${indent}`);
        return `${header}
${indent}${wsStart}${value}${wsEnd}`;
      }
      value = value.replace(/\n+/g, "\n$&").replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2").replace(/\n+/g, `$&${indent}`);
      const body = foldFlowLines(`${wsStart}${value}${wsEnd}`, indent, FOLD_BLOCK, strOptions.fold);
      return `${header}
${indent}${body}`;
    }
    function plainString(item, ctx, onComment, onChompKeep) {
      const {
        comment,
        type,
        value
      } = item;
      const {
        actualString,
        implicitKey,
        indent,
        inFlow
      } = ctx;
      if (implicitKey && /[\n[\]{},]/.test(value) || inFlow && /[[\]{},]/.test(value)) {
        return doubleQuotedString(value, ctx);
      }
      if (!value || /^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(value)) {
        return implicitKey || inFlow || value.indexOf("\n") === -1 ? value.indexOf('"') !== -1 && value.indexOf("'") === -1 ? singleQuotedString(value, ctx) : doubleQuotedString(value, ctx) : blockString(item, ctx, onComment, onChompKeep);
      }
      if (!implicitKey && !inFlow && type !== PlainValue.Type.PLAIN && value.indexOf("\n") !== -1) {
        return blockString(item, ctx, onComment, onChompKeep);
      }
      if (indent === "" && containsDocumentMarker(value)) {
        ctx.forceBlockIndent = true;
        return blockString(item, ctx, onComment, onChompKeep);
      }
      const str = value.replace(/\n+/g, `$&
${indent}`);
      if (actualString) {
        const {
          tags
        } = ctx.doc.schema;
        const resolved = resolveScalar(str, tags, tags.scalarFallback).value;
        if (typeof resolved !== "string")
          return doubleQuotedString(value, ctx);
      }
      const body = implicitKey ? str : foldFlowLines(str, indent, FOLD_FLOW, getFoldOptions(ctx));
      if (comment && !inFlow && (body.indexOf("\n") !== -1 || comment.indexOf("\n") !== -1)) {
        if (onComment)
          onComment();
        return addCommentBefore(body, indent, comment);
      }
      return body;
    }
    function stringifyString(item, ctx, onComment, onChompKeep) {
      const {
        defaultType
      } = strOptions;
      const {
        implicitKey,
        inFlow
      } = ctx;
      let {
        type,
        value
      } = item;
      if (typeof value !== "string") {
        value = String(value);
        item = Object.assign({}, item, {
          value
        });
      }
      const _stringify = (_type) => {
        switch (_type) {
          case PlainValue.Type.BLOCK_FOLDED:
          case PlainValue.Type.BLOCK_LITERAL:
            return blockString(item, ctx, onComment, onChompKeep);
          case PlainValue.Type.QUOTE_DOUBLE:
            return doubleQuotedString(value, ctx);
          case PlainValue.Type.QUOTE_SINGLE:
            return singleQuotedString(value, ctx);
          case PlainValue.Type.PLAIN:
            return plainString(item, ctx, onComment, onChompKeep);
          default:
            return null;
        }
      };
      if (type !== PlainValue.Type.QUOTE_DOUBLE && /[\x00-\x08\x0b-\x1f\x7f-\x9f]/.test(value)) {
        type = PlainValue.Type.QUOTE_DOUBLE;
      } else if ((implicitKey || inFlow) && (type === PlainValue.Type.BLOCK_FOLDED || type === PlainValue.Type.BLOCK_LITERAL)) {
        type = PlainValue.Type.QUOTE_DOUBLE;
      }
      let res = _stringify(type);
      if (res === null) {
        res = _stringify(defaultType);
        if (res === null)
          throw new Error(`Unsupported default string type ${defaultType}`);
      }
      return res;
    }
    function stringifyNumber(_ref12) {
      let {
        format,
        minFractionDigits,
        tag,
        value
      } = _ref12;
      if (typeof value === "bigint")
        return String(value);
      if (!isFinite(value))
        return isNaN(value) ? ".nan" : value < 0 ? "-.inf" : ".inf";
      let n = JSON.stringify(value);
      if (!format && minFractionDigits && (!tag || tag === "tag:yaml.org,2002:float") && /^\d/.test(n)) {
        let i = n.indexOf(".");
        if (i < 0) {
          i = n.length;
          n += ".";
        }
        let d = minFractionDigits - (n.length - i - 1);
        while (d-- > 0)
          n += "0";
      }
      return n;
    }
    function checkFlowCollectionEnd(errors, cst) {
      let char, name;
      switch (cst.type) {
        case PlainValue.Type.FLOW_MAP:
          char = "}";
          name = "flow map";
          break;
        case PlainValue.Type.FLOW_SEQ:
          char = "]";
          name = "flow sequence";
          break;
        default:
          errors.push(new PlainValue.YAMLSemanticError(cst, "Not a flow collection!?"));
          return;
      }
      let lastItem;
      for (let i = cst.items.length - 1; i >= 0; --i) {
        const item = cst.items[i];
        if (!item || item.type !== PlainValue.Type.COMMENT) {
          lastItem = item;
          break;
        }
      }
      if (lastItem && lastItem.char !== char) {
        const msg = `Expected ${name} to end with ${char}`;
        let err;
        if (typeof lastItem.offset === "number") {
          err = new PlainValue.YAMLSemanticError(cst, msg);
          err.offset = lastItem.offset + 1;
        } else {
          err = new PlainValue.YAMLSemanticError(lastItem, msg);
          if (lastItem.range && lastItem.range.end)
            err.offset = lastItem.range.end - lastItem.range.start;
        }
        errors.push(err);
      }
    }
    function checkFlowCommentSpace(errors, comment) {
      const prev = comment.context.src[comment.range.start - 1];
      if (prev !== "\n" && prev !== "	" && prev !== " ") {
        const msg = "Comments must be separated from other tokens by white space characters";
        errors.push(new PlainValue.YAMLSemanticError(comment, msg));
      }
    }
    function getLongKeyError(source, key) {
      const sk = String(key);
      const k = sk.substr(0, 8) + "..." + sk.substr(-8);
      return new PlainValue.YAMLSemanticError(source, `The "${k}" key is too long`);
    }
    function resolveComments(collection, comments) {
      for (const {
        afterKey,
        before,
        comment
      } of comments) {
        let item = collection.items[before];
        if (!item) {
          if (comment !== void 0) {
            if (collection.comment)
              collection.comment += "\n" + comment;
            else
              collection.comment = comment;
          }
        } else {
          if (afterKey && item.value)
            item = item.value;
          if (comment === void 0) {
            if (afterKey || !item.commentBefore)
              item.spaceBefore = true;
          } else {
            if (item.commentBefore)
              item.commentBefore += "\n" + comment;
            else
              item.commentBefore = comment;
          }
        }
      }
    }
    function resolveString(doc, node) {
      const res = node.strValue;
      if (!res)
        return "";
      if (typeof res === "string")
        return res;
      res.errors.forEach((error) => {
        if (!error.source)
          error.source = node;
        doc.errors.push(error);
      });
      return res.str;
    }
    function resolveTagHandle(doc, node) {
      const {
        handle,
        suffix
      } = node.tag;
      let prefix = doc.tagPrefixes.find((p) => p.handle === handle);
      if (!prefix) {
        const dtp = doc.getDefaults().tagPrefixes;
        if (dtp)
          prefix = dtp.find((p) => p.handle === handle);
        if (!prefix)
          throw new PlainValue.YAMLSemanticError(node, `The ${handle} tag handle is non-default and was not declared.`);
      }
      if (!suffix)
        throw new PlainValue.YAMLSemanticError(node, `The ${handle} tag has no suffix.`);
      if (handle === "!" && (doc.version || doc.options.version) === "1.0") {
        if (suffix[0] === "^") {
          doc.warnings.push(new PlainValue.YAMLWarning(node, "YAML 1.0 ^ tag expansion is not supported"));
          return suffix;
        }
        if (/[:/]/.test(suffix)) {
          const vocab = suffix.match(/^([a-z0-9-]+)\/(.*)/i);
          return vocab ? `tag:${vocab[1]}.yaml.org,2002:${vocab[2]}` : `tag:${suffix}`;
        }
      }
      return prefix.prefix + decodeURIComponent(suffix);
    }
    function resolveTagName(doc, node) {
      const {
        tag,
        type
      } = node;
      let nonSpecific = false;
      if (tag) {
        const {
          handle,
          suffix,
          verbatim
        } = tag;
        if (verbatim) {
          if (verbatim !== "!" && verbatim !== "!!")
            return verbatim;
          const msg = `Verbatim tags aren't resolved, so ${verbatim} is invalid.`;
          doc.errors.push(new PlainValue.YAMLSemanticError(node, msg));
        } else if (handle === "!" && !suffix) {
          nonSpecific = true;
        } else {
          try {
            return resolveTagHandle(doc, node);
          } catch (error) {
            doc.errors.push(error);
          }
        }
      }
      switch (type) {
        case PlainValue.Type.BLOCK_FOLDED:
        case PlainValue.Type.BLOCK_LITERAL:
        case PlainValue.Type.QUOTE_DOUBLE:
        case PlainValue.Type.QUOTE_SINGLE:
          return PlainValue.defaultTags.STR;
        case PlainValue.Type.FLOW_MAP:
        case PlainValue.Type.MAP:
          return PlainValue.defaultTags.MAP;
        case PlainValue.Type.FLOW_SEQ:
        case PlainValue.Type.SEQ:
          return PlainValue.defaultTags.SEQ;
        case PlainValue.Type.PLAIN:
          return nonSpecific ? PlainValue.defaultTags.STR : null;
        default:
          return null;
      }
    }
    function resolveByTagName(doc, node, tagName) {
      const {
        tags
      } = doc.schema;
      const matchWithTest = [];
      for (const tag of tags) {
        if (tag.tag === tagName) {
          if (tag.test)
            matchWithTest.push(tag);
          else {
            const res = tag.resolve(doc, node);
            return res instanceof Collection ? res : new Scalar(res);
          }
        }
      }
      const str = resolveString(doc, node);
      if (typeof str === "string" && matchWithTest.length > 0)
        return resolveScalar(str, matchWithTest, tags.scalarFallback);
      return null;
    }
    function getFallbackTagName(_ref13) {
      let {
        type
      } = _ref13;
      switch (type) {
        case PlainValue.Type.FLOW_MAP:
        case PlainValue.Type.MAP:
          return PlainValue.defaultTags.MAP;
        case PlainValue.Type.FLOW_SEQ:
        case PlainValue.Type.SEQ:
          return PlainValue.defaultTags.SEQ;
        default:
          return PlainValue.defaultTags.STR;
      }
    }
    function resolveTag(doc, node, tagName) {
      try {
        const res = resolveByTagName(doc, node, tagName);
        if (res) {
          if (tagName && node.tag)
            res.tag = tagName;
          return res;
        }
      } catch (error) {
        if (!error.source)
          error.source = node;
        doc.errors.push(error);
        return null;
      }
      try {
        const fallback = getFallbackTagName(node);
        if (!fallback)
          throw new Error(`The tag ${tagName} is unavailable`);
        const msg = `The tag ${tagName} is unavailable, falling back to ${fallback}`;
        doc.warnings.push(new PlainValue.YAMLWarning(node, msg));
        const res = resolveByTagName(doc, node, fallback);
        res.tag = tagName;
        return res;
      } catch (error) {
        const refError = new PlainValue.YAMLReferenceError(node, error.message);
        refError.stack = error.stack;
        doc.errors.push(refError);
        return null;
      }
    }
    var isCollectionItem = (node) => {
      if (!node)
        return false;
      const {
        type
      } = node;
      return type === PlainValue.Type.MAP_KEY || type === PlainValue.Type.MAP_VALUE || type === PlainValue.Type.SEQ_ITEM;
    };
    function resolveNodeProps(errors, node) {
      const comments = {
        before: [],
        after: []
      };
      let hasAnchor = false;
      let hasTag = false;
      const props = isCollectionItem(node.context.parent) ? node.context.parent.props.concat(node.props) : node.props;
      for (const {
        start,
        end
      } of props) {
        switch (node.context.src[start]) {
          case PlainValue.Char.COMMENT: {
            if (!node.commentHasRequiredWhitespace(start)) {
              const msg = "Comments must be separated from other tokens by white space characters";
              errors.push(new PlainValue.YAMLSemanticError(node, msg));
            }
            const {
              header,
              valueRange
            } = node;
            const cc = valueRange && (start > valueRange.start || header && start > header.start) ? comments.after : comments.before;
            cc.push(node.context.src.slice(start + 1, end));
            break;
          }
          case PlainValue.Char.ANCHOR:
            if (hasAnchor) {
              const msg = "A node can have at most one anchor";
              errors.push(new PlainValue.YAMLSemanticError(node, msg));
            }
            hasAnchor = true;
            break;
          case PlainValue.Char.TAG:
            if (hasTag) {
              const msg = "A node can have at most one tag";
              errors.push(new PlainValue.YAMLSemanticError(node, msg));
            }
            hasTag = true;
            break;
        }
      }
      return {
        comments,
        hasAnchor,
        hasTag
      };
    }
    function resolveNodeValue(doc, node) {
      const {
        anchors,
        errors,
        schema
      } = doc;
      if (node.type === PlainValue.Type.ALIAS) {
        const name = node.rawValue;
        const src = anchors.getNode(name);
        if (!src) {
          const msg = `Aliased anchor not found: ${name}`;
          errors.push(new PlainValue.YAMLReferenceError(node, msg));
          return null;
        }
        const res = new Alias(src);
        anchors._cstAliases.push(res);
        return res;
      }
      const tagName = resolveTagName(doc, node);
      if (tagName)
        return resolveTag(doc, node, tagName);
      if (node.type !== PlainValue.Type.PLAIN) {
        const msg = `Failed to resolve ${node.type} node here`;
        errors.push(new PlainValue.YAMLSyntaxError(node, msg));
        return null;
      }
      try {
        const str = resolveString(doc, node);
        return resolveScalar(str, schema.tags, schema.tags.scalarFallback);
      } catch (error) {
        if (!error.source)
          error.source = node;
        errors.push(error);
        return null;
      }
    }
    function resolveNode(doc, node) {
      if (!node)
        return null;
      if (node.error)
        doc.errors.push(node.error);
      const {
        comments,
        hasAnchor,
        hasTag
      } = resolveNodeProps(doc.errors, node);
      if (hasAnchor) {
        const {
          anchors
        } = doc;
        const name = node.anchor;
        const prev = anchors.getNode(name);
        if (prev)
          anchors.map[anchors.newName(name)] = prev;
        anchors.map[name] = node;
      }
      if (node.type === PlainValue.Type.ALIAS && (hasAnchor || hasTag)) {
        const msg = "An alias node must not specify any properties";
        doc.errors.push(new PlainValue.YAMLSemanticError(node, msg));
      }
      const res = resolveNodeValue(doc, node);
      if (res) {
        res.range = [node.range.start, node.range.end];
        if (doc.options.keepCstNodes)
          res.cstNode = node;
        if (doc.options.keepNodeTypes)
          res.type = node.type;
        const cb = comments.before.join("\n");
        if (cb) {
          res.commentBefore = res.commentBefore ? `${res.commentBefore}
${cb}` : cb;
        }
        const ca = comments.after.join("\n");
        if (ca)
          res.comment = res.comment ? `${res.comment}
${ca}` : ca;
      }
      return node.resolved = res;
    }
    function resolveMap(doc, cst) {
      if (cst.type !== PlainValue.Type.MAP && cst.type !== PlainValue.Type.FLOW_MAP) {
        const msg = `A ${cst.type} node cannot be resolved as a mapping`;
        doc.errors.push(new PlainValue.YAMLSyntaxError(cst, msg));
        return null;
      }
      const {
        comments,
        items
      } = cst.type === PlainValue.Type.FLOW_MAP ? resolveFlowMapItems(doc, cst) : resolveBlockMapItems(doc, cst);
      const map = new YAMLMap();
      map.items = items;
      resolveComments(map, comments);
      let hasCollectionKey = false;
      for (let i = 0; i < items.length; ++i) {
        const {
          key: iKey
        } = items[i];
        if (iKey instanceof Collection)
          hasCollectionKey = true;
        if (doc.schema.merge && iKey && iKey.value === MERGE_KEY) {
          items[i] = new Merge(items[i]);
          const sources = items[i].value.items;
          let error = null;
          sources.some((node) => {
            if (node instanceof Alias) {
              const {
                type
              } = node.source;
              if (type === PlainValue.Type.MAP || type === PlainValue.Type.FLOW_MAP)
                return false;
              return error = "Merge nodes aliases can only point to maps";
            }
            return error = "Merge nodes can only have Alias nodes as values";
          });
          if (error)
            doc.errors.push(new PlainValue.YAMLSemanticError(cst, error));
        } else {
          for (let j = i + 1; j < items.length; ++j) {
            const {
              key: jKey
            } = items[j];
            if (iKey === jKey || iKey && jKey && Object.prototype.hasOwnProperty.call(iKey, "value") && iKey.value === jKey.value) {
              const msg = `Map keys must be unique; "${iKey}" is repeated`;
              doc.errors.push(new PlainValue.YAMLSemanticError(cst, msg));
              break;
            }
          }
        }
      }
      if (hasCollectionKey && !doc.options.mapAsMap) {
        const warn = "Keys with collection values will be stringified as YAML due to JS Object restrictions. Use mapAsMap: true to avoid this.";
        doc.warnings.push(new PlainValue.YAMLWarning(cst, warn));
      }
      cst.resolved = map;
      return map;
    }
    var valueHasPairComment = (_ref14) => {
      let {
        context: {
          lineStart,
          node,
          src
        },
        props
      } = _ref14;
      if (props.length === 0)
        return false;
      const {
        start
      } = props[0];
      if (node && start > node.valueRange.start)
        return false;
      if (src[start] !== PlainValue.Char.COMMENT)
        return false;
      for (let i = lineStart; i < start; ++i)
        if (src[i] === "\n")
          return false;
      return true;
    };
    function resolvePairComment(item, pair) {
      if (!valueHasPairComment(item))
        return;
      const comment = item.getPropValue(0, PlainValue.Char.COMMENT, true);
      let found = false;
      const cb = pair.value.commentBefore;
      if (cb && cb.startsWith(comment)) {
        pair.value.commentBefore = cb.substr(comment.length + 1);
        found = true;
      } else {
        const cc = pair.value.comment;
        if (!item.node && cc && cc.startsWith(comment)) {
          pair.value.comment = cc.substr(comment.length + 1);
          found = true;
        }
      }
      if (found)
        pair.comment = comment;
    }
    function resolveBlockMapItems(doc, cst) {
      const comments = [];
      const items = [];
      let key = void 0;
      let keyStart = null;
      for (let i = 0; i < cst.items.length; ++i) {
        const item = cst.items[i];
        switch (item.type) {
          case PlainValue.Type.BLANK_LINE:
            comments.push({
              afterKey: !!key,
              before: items.length
            });
            break;
          case PlainValue.Type.COMMENT:
            comments.push({
              afterKey: !!key,
              before: items.length,
              comment: item.comment
            });
            break;
          case PlainValue.Type.MAP_KEY:
            if (key !== void 0)
              items.push(new Pair(key));
            if (item.error)
              doc.errors.push(item.error);
            key = resolveNode(doc, item.node);
            keyStart = null;
            break;
          case PlainValue.Type.MAP_VALUE:
            {
              if (key === void 0)
                key = null;
              if (item.error)
                doc.errors.push(item.error);
              if (!item.context.atLineStart && item.node && item.node.type === PlainValue.Type.MAP && !item.node.context.atLineStart) {
                const msg = "Nested mappings are not allowed in compact mappings";
                doc.errors.push(new PlainValue.YAMLSemanticError(item.node, msg));
              }
              let valueNode = item.node;
              if (!valueNode && item.props.length > 0) {
                valueNode = new PlainValue.PlainValue(PlainValue.Type.PLAIN, []);
                valueNode.context = {
                  parent: item,
                  src: item.context.src
                };
                const pos = item.range.start + 1;
                valueNode.range = {
                  start: pos,
                  end: pos
                };
                valueNode.valueRange = {
                  start: pos,
                  end: pos
                };
                if (typeof item.range.origStart === "number") {
                  const origPos = item.range.origStart + 1;
                  valueNode.range.origStart = valueNode.range.origEnd = origPos;
                  valueNode.valueRange.origStart = valueNode.valueRange.origEnd = origPos;
                }
              }
              const pair = new Pair(key, resolveNode(doc, valueNode));
              resolvePairComment(item, pair);
              items.push(pair);
              if (key && typeof keyStart === "number") {
                if (item.range.start > keyStart + 1024)
                  doc.errors.push(getLongKeyError(cst, key));
              }
              key = void 0;
              keyStart = null;
            }
            break;
          default:
            if (key !== void 0)
              items.push(new Pair(key));
            key = resolveNode(doc, item);
            keyStart = item.range.start;
            if (item.error)
              doc.errors.push(item.error);
            next:
              for (let j = i + 1; ; ++j) {
                const nextItem = cst.items[j];
                switch (nextItem && nextItem.type) {
                  case PlainValue.Type.BLANK_LINE:
                  case PlainValue.Type.COMMENT:
                    continue next;
                  case PlainValue.Type.MAP_VALUE:
                    break next;
                  default: {
                    const msg = "Implicit map keys need to be followed by map values";
                    doc.errors.push(new PlainValue.YAMLSemanticError(item, msg));
                    break next;
                  }
                }
              }
            if (item.valueRangeContainsNewline) {
              const msg = "Implicit map keys need to be on a single line";
              doc.errors.push(new PlainValue.YAMLSemanticError(item, msg));
            }
        }
      }
      if (key !== void 0)
        items.push(new Pair(key));
      return {
        comments,
        items
      };
    }
    function resolveFlowMapItems(doc, cst) {
      const comments = [];
      const items = [];
      let key = void 0;
      let explicitKey = false;
      let next = "{";
      for (let i = 0; i < cst.items.length; ++i) {
        const item = cst.items[i];
        if (typeof item.char === "string") {
          const {
            char,
            offset
          } = item;
          if (char === "?" && key === void 0 && !explicitKey) {
            explicitKey = true;
            next = ":";
            continue;
          }
          if (char === ":") {
            if (key === void 0)
              key = null;
            if (next === ":") {
              next = ",";
              continue;
            }
          } else {
            if (explicitKey) {
              if (key === void 0 && char !== ",")
                key = null;
              explicitKey = false;
            }
            if (key !== void 0) {
              items.push(new Pair(key));
              key = void 0;
              if (char === ",") {
                next = ":";
                continue;
              }
            }
          }
          if (char === "}") {
            if (i === cst.items.length - 1)
              continue;
          } else if (char === next) {
            next = ":";
            continue;
          }
          const msg = `Flow map contains an unexpected ${char}`;
          const err = new PlainValue.YAMLSyntaxError(cst, msg);
          err.offset = offset;
          doc.errors.push(err);
        } else if (item.type === PlainValue.Type.BLANK_LINE) {
          comments.push({
            afterKey: !!key,
            before: items.length
          });
        } else if (item.type === PlainValue.Type.COMMENT) {
          checkFlowCommentSpace(doc.errors, item);
          comments.push({
            afterKey: !!key,
            before: items.length,
            comment: item.comment
          });
        } else if (key === void 0) {
          if (next === ",")
            doc.errors.push(new PlainValue.YAMLSemanticError(item, "Separator , missing in flow map"));
          key = resolveNode(doc, item);
        } else {
          if (next !== ",")
            doc.errors.push(new PlainValue.YAMLSemanticError(item, "Indicator : missing in flow map entry"));
          items.push(new Pair(key, resolveNode(doc, item)));
          key = void 0;
          explicitKey = false;
        }
      }
      checkFlowCollectionEnd(doc.errors, cst);
      if (key !== void 0)
        items.push(new Pair(key));
      return {
        comments,
        items
      };
    }
    function resolveSeq(doc, cst) {
      if (cst.type !== PlainValue.Type.SEQ && cst.type !== PlainValue.Type.FLOW_SEQ) {
        const msg = `A ${cst.type} node cannot be resolved as a sequence`;
        doc.errors.push(new PlainValue.YAMLSyntaxError(cst, msg));
        return null;
      }
      const {
        comments,
        items
      } = cst.type === PlainValue.Type.FLOW_SEQ ? resolveFlowSeqItems(doc, cst) : resolveBlockSeqItems(doc, cst);
      const seq = new YAMLSeq();
      seq.items = items;
      resolveComments(seq, comments);
      if (!doc.options.mapAsMap && items.some((it) => it instanceof Pair && it.key instanceof Collection)) {
        const warn = "Keys with collection values will be stringified as YAML due to JS Object restrictions. Use mapAsMap: true to avoid this.";
        doc.warnings.push(new PlainValue.YAMLWarning(cst, warn));
      }
      cst.resolved = seq;
      return seq;
    }
    function resolveBlockSeqItems(doc, cst) {
      const comments = [];
      const items = [];
      for (let i = 0; i < cst.items.length; ++i) {
        const item = cst.items[i];
        switch (item.type) {
          case PlainValue.Type.BLANK_LINE:
            comments.push({
              before: items.length
            });
            break;
          case PlainValue.Type.COMMENT:
            comments.push({
              comment: item.comment,
              before: items.length
            });
            break;
          case PlainValue.Type.SEQ_ITEM:
            if (item.error)
              doc.errors.push(item.error);
            items.push(resolveNode(doc, item.node));
            if (item.hasProps) {
              const msg = "Sequence items cannot have tags or anchors before the - indicator";
              doc.errors.push(new PlainValue.YAMLSemanticError(item, msg));
            }
            break;
          default:
            if (item.error)
              doc.errors.push(item.error);
            doc.errors.push(new PlainValue.YAMLSyntaxError(item, `Unexpected ${item.type} node in sequence`));
        }
      }
      return {
        comments,
        items
      };
    }
    function resolveFlowSeqItems(doc, cst) {
      const comments = [];
      const items = [];
      let explicitKey = false;
      let key = void 0;
      let keyStart = null;
      let next = "[";
      let prevItem = null;
      for (let i = 0; i < cst.items.length; ++i) {
        const item = cst.items[i];
        if (typeof item.char === "string") {
          const {
            char,
            offset
          } = item;
          if (char !== ":" && (explicitKey || key !== void 0)) {
            if (explicitKey && key === void 0)
              key = next ? items.pop() : null;
            items.push(new Pair(key));
            explicitKey = false;
            key = void 0;
            keyStart = null;
          }
          if (char === next) {
            next = null;
          } else if (!next && char === "?") {
            explicitKey = true;
          } else if (next !== "[" && char === ":" && key === void 0) {
            if (next === ",") {
              key = items.pop();
              if (key instanceof Pair) {
                const msg = "Chaining flow sequence pairs is invalid";
                const err = new PlainValue.YAMLSemanticError(cst, msg);
                err.offset = offset;
                doc.errors.push(err);
              }
              if (!explicitKey && typeof keyStart === "number") {
                const keyEnd = item.range ? item.range.start : item.offset;
                if (keyEnd > keyStart + 1024)
                  doc.errors.push(getLongKeyError(cst, key));
                const {
                  src
                } = prevItem.context;
                for (let i2 = keyStart; i2 < keyEnd; ++i2)
                  if (src[i2] === "\n") {
                    const msg = "Implicit keys of flow sequence pairs need to be on a single line";
                    doc.errors.push(new PlainValue.YAMLSemanticError(prevItem, msg));
                    break;
                  }
              }
            } else {
              key = null;
            }
            keyStart = null;
            explicitKey = false;
            next = null;
          } else if (next === "[" || char !== "]" || i < cst.items.length - 1) {
            const msg = `Flow sequence contains an unexpected ${char}`;
            const err = new PlainValue.YAMLSyntaxError(cst, msg);
            err.offset = offset;
            doc.errors.push(err);
          }
        } else if (item.type === PlainValue.Type.BLANK_LINE) {
          comments.push({
            before: items.length
          });
        } else if (item.type === PlainValue.Type.COMMENT) {
          checkFlowCommentSpace(doc.errors, item);
          comments.push({
            comment: item.comment,
            before: items.length
          });
        } else {
          if (next) {
            const msg = `Expected a ${next} in flow sequence`;
            doc.errors.push(new PlainValue.YAMLSemanticError(item, msg));
          }
          const value = resolveNode(doc, item);
          if (key === void 0) {
            items.push(value);
            prevItem = item;
          } else {
            items.push(new Pair(key, value));
            key = void 0;
          }
          keyStart = item.range.start;
          next = ",";
        }
      }
      checkFlowCollectionEnd(doc.errors, cst);
      if (key !== void 0)
        items.push(new Pair(key));
      return {
        comments,
        items
      };
    }
    exports.Alias = Alias;
    exports.Collection = Collection;
    exports.Merge = Merge;
    exports.Node = Node;
    exports.Pair = Pair;
    exports.Scalar = Scalar;
    exports.YAMLMap = YAMLMap;
    exports.YAMLSeq = YAMLSeq;
    exports.addComment = addComment;
    exports.binaryOptions = binaryOptions;
    exports.boolOptions = boolOptions;
    exports.findPair = findPair;
    exports.intOptions = intOptions;
    exports.isEmptyPath = isEmptyPath;
    exports.nullOptions = nullOptions;
    exports.resolveMap = resolveMap;
    exports.resolveNode = resolveNode;
    exports.resolveSeq = resolveSeq;
    exports.resolveString = resolveString;
    exports.strOptions = strOptions;
    exports.stringifyNumber = stringifyNumber;
    exports.stringifyString = stringifyString;
    exports.toJSON = toJSON;
  }
});
var require_warnings_1000a372 = __commonJS({
  "node_modules/yaml/dist/warnings-1000a372.js"(exports) {
    "use strict";
    init_define_process();
    var PlainValue = require_PlainValue_ec8e588e();
    var resolveSeq = require_resolveSeq_d03cb037();
    var binary = {
      identify: (value) => value instanceof Uint8Array,
      default: false,
      tag: "tag:yaml.org,2002:binary",
      resolve: (doc, node) => {
        const src = resolveSeq.resolveString(doc, node);
        if (typeof Buffer === "function") {
          return Buffer.from(src, "base64");
        } else if (typeof atob === "function") {
          const str = atob(src.replace(/[\n\r]/g, ""));
          const buffer = new Uint8Array(str.length);
          for (let i = 0; i < str.length; ++i)
            buffer[i] = str.charCodeAt(i);
          return buffer;
        } else {
          const msg = "This environment does not support reading binary tags; either Buffer or atob is required";
          doc.errors.push(new PlainValue.YAMLReferenceError(node, msg));
          return null;
        }
      },
      options: resolveSeq.binaryOptions,
      stringify: (_ref15, ctx, onComment, onChompKeep) => {
        let {
          comment,
          type,
          value
        } = _ref15;
        let src;
        if (typeof Buffer === "function") {
          src = value instanceof Buffer ? value.toString("base64") : Buffer.from(value.buffer).toString("base64");
        } else if (typeof btoa === "function") {
          let s = "";
          for (let i = 0; i < value.length; ++i)
            s += String.fromCharCode(value[i]);
          src = btoa(s);
        } else {
          throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");
        }
        if (!type)
          type = resolveSeq.binaryOptions.defaultType;
        if (type === PlainValue.Type.QUOTE_DOUBLE) {
          value = src;
        } else {
          const {
            lineWidth
          } = resolveSeq.binaryOptions;
          const n = Math.ceil(src.length / lineWidth);
          const lines = new Array(n);
          for (let i = 0, o = 0; i < n; ++i, o += lineWidth) {
            lines[i] = src.substr(o, lineWidth);
          }
          value = lines.join(type === PlainValue.Type.BLOCK_LITERAL ? "\n" : " ");
        }
        return resolveSeq.stringifyString({
          comment,
          type,
          value
        }, ctx, onComment, onChompKeep);
      }
    };
    function parsePairs(doc, cst) {
      const seq = resolveSeq.resolveSeq(doc, cst);
      for (let i = 0; i < seq.items.length; ++i) {
        let item = seq.items[i];
        if (item instanceof resolveSeq.Pair)
          continue;
        else if (item instanceof resolveSeq.YAMLMap) {
          if (item.items.length > 1) {
            const msg = "Each pair must have its own sequence indicator";
            throw new PlainValue.YAMLSemanticError(cst, msg);
          }
          const pair = item.items[0] || new resolveSeq.Pair();
          if (item.commentBefore)
            pair.commentBefore = pair.commentBefore ? `${item.commentBefore}
${pair.commentBefore}` : item.commentBefore;
          if (item.comment)
            pair.comment = pair.comment ? `${item.comment}
${pair.comment}` : item.comment;
          item = pair;
        }
        seq.items[i] = item instanceof resolveSeq.Pair ? item : new resolveSeq.Pair(item);
      }
      return seq;
    }
    function createPairs(schema, iterable, ctx) {
      const pairs2 = new resolveSeq.YAMLSeq(schema);
      pairs2.tag = "tag:yaml.org,2002:pairs";
      for (const it of iterable) {
        let key, value;
        if (Array.isArray(it)) {
          if (it.length === 2) {
            key = it[0];
            value = it[1];
          } else
            throw new TypeError(`Expected [key, value] tuple: ${it}`);
        } else if (it && it instanceof Object) {
          const keys = Object.keys(it);
          if (keys.length === 1) {
            key = keys[0];
            value = it[key];
          } else
            throw new TypeError(`Expected { key: value } tuple: ${it}`);
        } else {
          key = it;
        }
        const pair = schema.createPair(key, value, ctx);
        pairs2.items.push(pair);
      }
      return pairs2;
    }
    var pairs = {
      default: false,
      tag: "tag:yaml.org,2002:pairs",
      resolve: parsePairs,
      createNode: createPairs
    };
    var YAMLOMap = class extends resolveSeq.YAMLSeq {
      constructor() {
        super();
        PlainValue._defineProperty(this, "add", resolveSeq.YAMLMap.prototype.add.bind(this));
        PlainValue._defineProperty(this, "delete", resolveSeq.YAMLMap.prototype.delete.bind(this));
        PlainValue._defineProperty(this, "get", resolveSeq.YAMLMap.prototype.get.bind(this));
        PlainValue._defineProperty(this, "has", resolveSeq.YAMLMap.prototype.has.bind(this));
        PlainValue._defineProperty(this, "set", resolveSeq.YAMLMap.prototype.set.bind(this));
        this.tag = YAMLOMap.tag;
      }
      toJSON(_, ctx) {
        const map = /* @__PURE__ */ new Map();
        if (ctx && ctx.onCreate)
          ctx.onCreate(map);
        for (const pair of this.items) {
          let key, value;
          if (pair instanceof resolveSeq.Pair) {
            key = resolveSeq.toJSON(pair.key, "", ctx);
            value = resolveSeq.toJSON(pair.value, key, ctx);
          } else {
            key = resolveSeq.toJSON(pair, "", ctx);
          }
          if (map.has(key))
            throw new Error("Ordered maps must not include duplicate keys");
          map.set(key, value);
        }
        return map;
      }
    };
    PlainValue._defineProperty(YAMLOMap, "tag", "tag:yaml.org,2002:omap");
    function parseOMap(doc, cst) {
      const pairs2 = parsePairs(doc, cst);
      const seenKeys = [];
      for (const {
        key
      } of pairs2.items) {
        if (key instanceof resolveSeq.Scalar) {
          if (seenKeys.includes(key.value)) {
            const msg = "Ordered maps must not include duplicate keys";
            throw new PlainValue.YAMLSemanticError(cst, msg);
          } else {
            seenKeys.push(key.value);
          }
        }
      }
      return Object.assign(new YAMLOMap(), pairs2);
    }
    function createOMap(schema, iterable, ctx) {
      const pairs2 = createPairs(schema, iterable, ctx);
      const omap2 = new YAMLOMap();
      omap2.items = pairs2.items;
      return omap2;
    }
    var omap = {
      identify: (value) => value instanceof Map,
      nodeClass: YAMLOMap,
      default: false,
      tag: "tag:yaml.org,2002:omap",
      resolve: parseOMap,
      createNode: createOMap
    };
    var YAMLSet = class extends resolveSeq.YAMLMap {
      constructor() {
        super();
        this.tag = YAMLSet.tag;
      }
      add(key) {
        const pair = key instanceof resolveSeq.Pair ? key : new resolveSeq.Pair(key);
        const prev = resolveSeq.findPair(this.items, pair.key);
        if (!prev)
          this.items.push(pair);
      }
      get(key, keepPair) {
        const pair = resolveSeq.findPair(this.items, key);
        return !keepPair && pair instanceof resolveSeq.Pair ? pair.key instanceof resolveSeq.Scalar ? pair.key.value : pair.key : pair;
      }
      set(key, value) {
        if (typeof value !== "boolean")
          throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof value}`);
        const prev = resolveSeq.findPair(this.items, key);
        if (prev && !value) {
          this.items.splice(this.items.indexOf(prev), 1);
        } else if (!prev && value) {
          this.items.push(new resolveSeq.Pair(key));
        }
      }
      toJSON(_, ctx) {
        return super.toJSON(_, ctx, Set);
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx)
          return JSON.stringify(this);
        if (this.hasAllNullValues())
          return super.toString(ctx, onComment, onChompKeep);
        else
          throw new Error("Set items must all have null values");
      }
    };
    PlainValue._defineProperty(YAMLSet, "tag", "tag:yaml.org,2002:set");
    function parseSet(doc, cst) {
      const map = resolveSeq.resolveMap(doc, cst);
      if (!map.hasAllNullValues())
        throw new PlainValue.YAMLSemanticError(cst, "Set items must all have null values");
      return Object.assign(new YAMLSet(), map);
    }
    function createSet(schema, iterable, ctx) {
      const set2 = new YAMLSet();
      for (const value of iterable)
        set2.items.push(schema.createPair(value, null, ctx));
      return set2;
    }
    var set = {
      identify: (value) => value instanceof Set,
      nodeClass: YAMLSet,
      default: false,
      tag: "tag:yaml.org,2002:set",
      resolve: parseSet,
      createNode: createSet
    };
    var parseSexagesimal = (sign, parts) => {
      const n = parts.split(":").reduce((n2, p) => n2 * 60 + Number(p), 0);
      return sign === "-" ? -n : n;
    };
    var stringifySexagesimal = (_ref16) => {
      let {
        value
      } = _ref16;
      if (isNaN(value) || !isFinite(value))
        return resolveSeq.stringifyNumber(value);
      let sign = "";
      if (value < 0) {
        sign = "-";
        value = Math.abs(value);
      }
      const parts = [value % 60];
      if (value < 60) {
        parts.unshift(0);
      } else {
        value = Math.round((value - parts[0]) / 60);
        parts.unshift(value % 60);
        if (value >= 60) {
          value = Math.round((value - parts[0]) / 60);
          parts.unshift(value);
        }
      }
      return sign + parts.map((n) => n < 10 ? "0" + String(n) : String(n)).join(":").replace(/000000\d*$/, "");
    };
    var intTime = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "TIME",
      test: /^([-+]?)([0-9][0-9_]*(?::[0-5]?[0-9])+)$/,
      resolve: (str, sign, parts) => parseSexagesimal(sign, parts.replace(/_/g, "")),
      stringify: stringifySexagesimal
    };
    var floatTime = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      format: "TIME",
      test: /^([-+]?)([0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*)$/,
      resolve: (str, sign, parts) => parseSexagesimal(sign, parts.replace(/_/g, "")),
      stringify: stringifySexagesimal
    };
    var timestamp = {
      identify: (value) => value instanceof Date,
      default: true,
      tag: "tag:yaml.org,2002:timestamp",
      test: RegExp("^(?:([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?)$"),
      resolve: (str, year, month, day, hour, minute, second, millisec, tz) => {
        if (millisec)
          millisec = (millisec + "00").substr(1, 3);
        let date = Date.UTC(year, month - 1, day, hour || 0, minute || 0, second || 0, millisec || 0);
        if (tz && tz !== "Z") {
          let d = parseSexagesimal(tz[0], tz.slice(1));
          if (Math.abs(d) < 30)
            d *= 60;
          date -= 6e4 * d;
        }
        return new Date(date);
      },
      stringify: (_ref17) => {
        let {
          value
        } = _ref17;
        return value.toISOString().replace(/((T00:00)?:00)?\.000Z$/, "");
      }
    };
    function shouldWarn(deprecation) {
      const env = typeof define_process_default !== "undefined" && define_process_default.env || {};
      if (deprecation) {
        if (typeof YAML_SILENCE_DEPRECATION_WARNINGS !== "undefined")
          return !YAML_SILENCE_DEPRECATION_WARNINGS;
        return !env.YAML_SILENCE_DEPRECATION_WARNINGS;
      }
      if (typeof YAML_SILENCE_WARNINGS !== "undefined")
        return !YAML_SILENCE_WARNINGS;
      return !env.YAML_SILENCE_WARNINGS;
    }
    function warn(warning, type) {
      if (shouldWarn(false)) {
        const emit = typeof define_process_default !== "undefined" && define_process_default.emitWarning;
        if (emit)
          emit(warning, type);
        else {
          console.warn(type ? `${type}: ${warning}` : warning);
        }
      }
    }
    function warnFileDeprecation(filename) {
      if (shouldWarn(true)) {
        const path = filename.replace(/.*yaml[/\\]/i, "").replace(/\.js$/, "").replace(/\\/g, "/");
        warn(`The endpoint 'yaml/${path}' will be removed in a future release.`, "DeprecationWarning");
      }
    }
    var warned = {};
    function warnOptionDeprecation(name, alternative) {
      if (!warned[name] && shouldWarn(true)) {
        warned[name] = true;
        let msg = `The option '${name}' will be removed in a future release`;
        msg += alternative ? `, use '${alternative}' instead.` : ".";
        warn(msg, "DeprecationWarning");
      }
    }
    exports.binary = binary;
    exports.floatTime = floatTime;
    exports.intTime = intTime;
    exports.omap = omap;
    exports.pairs = pairs;
    exports.set = set;
    exports.timestamp = timestamp;
    exports.warn = warn;
    exports.warnFileDeprecation = warnFileDeprecation;
    exports.warnOptionDeprecation = warnOptionDeprecation;
  }
});
var require_Schema_88e323a7 = __commonJS({
  "node_modules/yaml/dist/Schema-88e323a7.js"(exports) {
    "use strict";
    init_define_process();
    var PlainValue = require_PlainValue_ec8e588e();
    var resolveSeq = require_resolveSeq_d03cb037();
    var warnings = require_warnings_1000a372();
    function createMap(schema, obj, ctx) {
      const map2 = new resolveSeq.YAMLMap(schema);
      if (obj instanceof Map) {
        for (const [key, value] of obj)
          map2.items.push(schema.createPair(key, value, ctx));
      } else if (obj && typeof obj === "object") {
        for (const key of Object.keys(obj))
          map2.items.push(schema.createPair(key, obj[key], ctx));
      }
      if (typeof schema.sortMapEntries === "function") {
        map2.items.sort(schema.sortMapEntries);
      }
      return map2;
    }
    var map = {
      createNode: createMap,
      default: true,
      nodeClass: resolveSeq.YAMLMap,
      tag: "tag:yaml.org,2002:map",
      resolve: resolveSeq.resolveMap
    };
    function createSeq(schema, obj, ctx) {
      const seq2 = new resolveSeq.YAMLSeq(schema);
      if (obj && obj[Symbol.iterator]) {
        for (const it of obj) {
          const v = schema.createNode(it, ctx.wrapScalars, null, ctx);
          seq2.items.push(v);
        }
      }
      return seq2;
    }
    var seq = {
      createNode: createSeq,
      default: true,
      nodeClass: resolveSeq.YAMLSeq,
      tag: "tag:yaml.org,2002:seq",
      resolve: resolveSeq.resolveSeq
    };
    var string = {
      identify: (value) => typeof value === "string",
      default: true,
      tag: "tag:yaml.org,2002:str",
      resolve: resolveSeq.resolveString,
      stringify(item, ctx, onComment, onChompKeep) {
        ctx = Object.assign({
          actualString: true
        }, ctx);
        return resolveSeq.stringifyString(item, ctx, onComment, onChompKeep);
      },
      options: resolveSeq.strOptions
    };
    var failsafe = [map, seq, string];
    var intIdentify$2 = (value) => typeof value === "bigint" || Number.isInteger(value);
    var intResolve$1 = (src, part, radix) => resolveSeq.intOptions.asBigInt ? BigInt(src) : parseInt(part, radix);
    function intStringify$1(node, radix, prefix) {
      const {
        value
      } = node;
      if (intIdentify$2(value) && value >= 0)
        return prefix + value.toString(radix);
      return resolveSeq.stringifyNumber(node);
    }
    var nullObj = {
      identify: (value) => value == null,
      createNode: (schema, value, ctx) => ctx.wrapScalars ? new resolveSeq.Scalar(null) : null,
      default: true,
      tag: "tag:yaml.org,2002:null",
      test: /^(?:~|[Nn]ull|NULL)?$/,
      resolve: () => null,
      options: resolveSeq.nullOptions,
      stringify: () => resolveSeq.nullOptions.nullStr
    };
    var boolObj = {
      identify: (value) => typeof value === "boolean",
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
      resolve: (str) => str[0] === "t" || str[0] === "T",
      options: resolveSeq.boolOptions,
      stringify: (_ref18) => {
        let {
          value
        } = _ref18;
        return value ? resolveSeq.boolOptions.trueStr : resolveSeq.boolOptions.falseStr;
      }
    };
    var octObj = {
      identify: (value) => intIdentify$2(value) && value >= 0,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "OCT",
      test: /^0o([0-7]+)$/,
      resolve: (str, oct) => intResolve$1(str, oct, 8),
      options: resolveSeq.intOptions,
      stringify: (node) => intStringify$1(node, 8, "0o")
    };
    var intObj = {
      identify: intIdentify$2,
      default: true,
      tag: "tag:yaml.org,2002:int",
      test: /^[-+]?[0-9]+$/,
      resolve: (str) => intResolve$1(str, str, 10),
      options: resolveSeq.intOptions,
      stringify: resolveSeq.stringifyNumber
    };
    var hexObj = {
      identify: (value) => intIdentify$2(value) && value >= 0,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "HEX",
      test: /^0x([0-9a-fA-F]+)$/,
      resolve: (str, hex) => intResolve$1(str, hex, 16),
      options: resolveSeq.intOptions,
      stringify: (node) => intStringify$1(node, 16, "0x")
    };
    var nanObj = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^(?:[-+]?\.inf|(\.nan))$/i,
      resolve: (str, nan) => nan ? NaN : str[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
      stringify: resolveSeq.stringifyNumber
    };
    var expObj = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      format: "EXP",
      test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
      resolve: (str) => parseFloat(str),
      stringify: (_ref19) => {
        let {
          value
        } = _ref19;
        return Number(value).toExponential();
      }
    };
    var floatObj = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^[-+]?(?:\.([0-9]+)|[0-9]+\.([0-9]*))$/,
      resolve(str, frac1, frac2) {
        const frac = frac1 || frac2;
        const node = new resolveSeq.Scalar(parseFloat(str));
        if (frac && frac[frac.length - 1] === "0")
          node.minFractionDigits = frac.length;
        return node;
      },
      stringify: resolveSeq.stringifyNumber
    };
    var core = failsafe.concat([nullObj, boolObj, octObj, intObj, hexObj, nanObj, expObj, floatObj]);
    var intIdentify$1 = (value) => typeof value === "bigint" || Number.isInteger(value);
    var stringifyJSON = (_ref20) => {
      let {
        value
      } = _ref20;
      return JSON.stringify(value);
    };
    var json = [map, seq, {
      identify: (value) => typeof value === "string",
      default: true,
      tag: "tag:yaml.org,2002:str",
      resolve: resolveSeq.resolveString,
      stringify: stringifyJSON
    }, {
      identify: (value) => value == null,
      createNode: (schema, value, ctx) => ctx.wrapScalars ? new resolveSeq.Scalar(null) : null,
      default: true,
      tag: "tag:yaml.org,2002:null",
      test: /^null$/,
      resolve: () => null,
      stringify: stringifyJSON
    }, {
      identify: (value) => typeof value === "boolean",
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^true|false$/,
      resolve: (str) => str === "true",
      stringify: stringifyJSON
    }, {
      identify: intIdentify$1,
      default: true,
      tag: "tag:yaml.org,2002:int",
      test: /^-?(?:0|[1-9][0-9]*)$/,
      resolve: (str) => resolveSeq.intOptions.asBigInt ? BigInt(str) : parseInt(str, 10),
      stringify: (_ref21) => {
        let {
          value
        } = _ref21;
        return intIdentify$1(value) ? value.toString() : JSON.stringify(value);
      }
    }, {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
      resolve: (str) => parseFloat(str),
      stringify: stringifyJSON
    }];
    json.scalarFallback = (str) => {
      throw new SyntaxError(`Unresolved plain scalar ${JSON.stringify(str)}`);
    };
    var boolStringify = (_ref22) => {
      let {
        value
      } = _ref22;
      return value ? resolveSeq.boolOptions.trueStr : resolveSeq.boolOptions.falseStr;
    };
    var intIdentify = (value) => typeof value === "bigint" || Number.isInteger(value);
    function intResolve(sign, src, radix) {
      let str = src.replace(/_/g, "");
      if (resolveSeq.intOptions.asBigInt) {
        switch (radix) {
          case 2:
            str = `0b${str}`;
            break;
          case 8:
            str = `0o${str}`;
            break;
          case 16:
            str = `0x${str}`;
            break;
        }
        const n2 = BigInt(str);
        return sign === "-" ? BigInt(-1) * n2 : n2;
      }
      const n = parseInt(str, radix);
      return sign === "-" ? -1 * n : n;
    }
    function intStringify(node, radix, prefix) {
      const {
        value
      } = node;
      if (intIdentify(value)) {
        const str = value.toString(radix);
        return value < 0 ? "-" + prefix + str.substr(1) : prefix + str;
      }
      return resolveSeq.stringifyNumber(node);
    }
    var yaml11 = failsafe.concat([{
      identify: (value) => value == null,
      createNode: (schema, value, ctx) => ctx.wrapScalars ? new resolveSeq.Scalar(null) : null,
      default: true,
      tag: "tag:yaml.org,2002:null",
      test: /^(?:~|[Nn]ull|NULL)?$/,
      resolve: () => null,
      options: resolveSeq.nullOptions,
      stringify: () => resolveSeq.nullOptions.nullStr
    }, {
      identify: (value) => typeof value === "boolean",
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
      resolve: () => true,
      options: resolveSeq.boolOptions,
      stringify: boolStringify
    }, {
      identify: (value) => typeof value === "boolean",
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/i,
      resolve: () => false,
      options: resolveSeq.boolOptions,
      stringify: boolStringify
    }, {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "BIN",
      test: /^([-+]?)0b([0-1_]+)$/,
      resolve: (str, sign, bin) => intResolve(sign, bin, 2),
      stringify: (node) => intStringify(node, 2, "0b")
    }, {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "OCT",
      test: /^([-+]?)0([0-7_]+)$/,
      resolve: (str, sign, oct) => intResolve(sign, oct, 8),
      stringify: (node) => intStringify(node, 8, "0")
    }, {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      test: /^([-+]?)([0-9][0-9_]*)$/,
      resolve: (str, sign, abs) => intResolve(sign, abs, 10),
      stringify: resolveSeq.stringifyNumber
    }, {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "HEX",
      test: /^([-+]?)0x([0-9a-fA-F_]+)$/,
      resolve: (str, sign, hex) => intResolve(sign, hex, 16),
      stringify: (node) => intStringify(node, 16, "0x")
    }, {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^(?:[-+]?\.inf|(\.nan))$/i,
      resolve: (str, nan) => nan ? NaN : str[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
      stringify: resolveSeq.stringifyNumber
    }, {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      format: "EXP",
      test: /^[-+]?([0-9][0-9_]*)?(\.[0-9_]*)?[eE][-+]?[0-9]+$/,
      resolve: (str) => parseFloat(str.replace(/_/g, "")),
      stringify: (_ref23) => {
        let {
          value
        } = _ref23;
        return Number(value).toExponential();
      }
    }, {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^[-+]?(?:[0-9][0-9_]*)?\.([0-9_]*)$/,
      resolve(str, frac) {
        const node = new resolveSeq.Scalar(parseFloat(str.replace(/_/g, "")));
        if (frac) {
          const f = frac.replace(/_/g, "");
          if (f[f.length - 1] === "0")
            node.minFractionDigits = f.length;
        }
        return node;
      },
      stringify: resolveSeq.stringifyNumber
    }], warnings.binary, warnings.omap, warnings.pairs, warnings.set, warnings.intTime, warnings.floatTime, warnings.timestamp);
    var schemas = {
      core,
      failsafe,
      json,
      yaml11
    };
    var tags = {
      binary: warnings.binary,
      bool: boolObj,
      float: floatObj,
      floatExp: expObj,
      floatNaN: nanObj,
      floatTime: warnings.floatTime,
      int: intObj,
      intHex: hexObj,
      intOct: octObj,
      intTime: warnings.intTime,
      map,
      null: nullObj,
      omap: warnings.omap,
      pairs: warnings.pairs,
      seq,
      set: warnings.set,
      timestamp: warnings.timestamp
    };
    function findTagObject(value, tagName, tags2) {
      if (tagName) {
        const match = tags2.filter((t) => t.tag === tagName);
        const tagObj = match.find((t) => !t.format) || match[0];
        if (!tagObj)
          throw new Error(`Tag ${tagName} not found`);
        return tagObj;
      }
      return tags2.find((t) => (t.identify && t.identify(value) || t.class && value instanceof t.class) && !t.format);
    }
    function createNode(value, tagName, ctx) {
      if (value instanceof resolveSeq.Node)
        return value;
      const {
        defaultPrefix,
        onTagObj,
        prevObjects,
        schema,
        wrapScalars
      } = ctx;
      if (tagName && tagName.startsWith("!!"))
        tagName = defaultPrefix + tagName.slice(2);
      let tagObj = findTagObject(value, tagName, schema.tags);
      if (!tagObj) {
        if (typeof value.toJSON === "function")
          value = value.toJSON();
        if (!value || typeof value !== "object")
          return wrapScalars ? new resolveSeq.Scalar(value) : value;
        tagObj = value instanceof Map ? map : value[Symbol.iterator] ? seq : map;
      }
      if (onTagObj) {
        onTagObj(tagObj);
        delete ctx.onTagObj;
      }
      const obj = {
        value: void 0,
        node: void 0
      };
      if (value && typeof value === "object" && prevObjects) {
        const prev = prevObjects.get(value);
        if (prev) {
          const alias = new resolveSeq.Alias(prev);
          ctx.aliasNodes.push(alias);
          return alias;
        }
        obj.value = value;
        prevObjects.set(value, obj);
      }
      obj.node = tagObj.createNode ? tagObj.createNode(ctx.schema, value, ctx) : wrapScalars ? new resolveSeq.Scalar(value) : value;
      if (tagName && obj.node instanceof resolveSeq.Node)
        obj.node.tag = tagName;
      return obj.node;
    }
    function getSchemaTags(schemas2, knownTags, customTags, schemaId) {
      let tags2 = schemas2[schemaId.replace(/\W/g, "")];
      if (!tags2) {
        const keys = Object.keys(schemas2).map((key) => JSON.stringify(key)).join(", ");
        throw new Error(`Unknown schema "${schemaId}"; use one of ${keys}`);
      }
      if (Array.isArray(customTags)) {
        for (const tag of customTags)
          tags2 = tags2.concat(tag);
      } else if (typeof customTags === "function") {
        tags2 = customTags(tags2.slice());
      }
      for (let i = 0; i < tags2.length; ++i) {
        const tag = tags2[i];
        if (typeof tag === "string") {
          const tagObj = knownTags[tag];
          if (!tagObj) {
            const keys = Object.keys(knownTags).map((key) => JSON.stringify(key)).join(", ");
            throw new Error(`Unknown custom tag "${tag}"; use one of ${keys}`);
          }
          tags2[i] = tagObj;
        }
      }
      return tags2;
    }
    var sortMapEntriesByKey = (a, b) => a.key < b.key ? -1 : a.key > b.key ? 1 : 0;
    var Schema = class {
      constructor(_ref24) {
        let {
          customTags,
          merge,
          schema,
          sortMapEntries,
          tags: deprecatedCustomTags
        } = _ref24;
        this.merge = !!merge;
        this.name = schema;
        this.sortMapEntries = sortMapEntries === true ? sortMapEntriesByKey : sortMapEntries || null;
        if (!customTags && deprecatedCustomTags)
          warnings.warnOptionDeprecation("tags", "customTags");
        this.tags = getSchemaTags(schemas, tags, customTags || deprecatedCustomTags, schema);
      }
      createNode(value, wrapScalars, tagName, ctx) {
        const baseCtx = {
          defaultPrefix: Schema.defaultPrefix,
          schema: this,
          wrapScalars
        };
        const createCtx = ctx ? Object.assign(ctx, baseCtx) : baseCtx;
        return createNode(value, tagName, createCtx);
      }
      createPair(key, value, ctx) {
        if (!ctx)
          ctx = {
            wrapScalars: true
          };
        const k = this.createNode(key, ctx.wrapScalars, null, ctx);
        const v = this.createNode(value, ctx.wrapScalars, null, ctx);
        return new resolveSeq.Pair(k, v);
      }
    };
    PlainValue._defineProperty(Schema, "defaultPrefix", PlainValue.defaultTagPrefix);
    PlainValue._defineProperty(Schema, "defaultTags", PlainValue.defaultTags);
    exports.Schema = Schema;
  }
});
var require_Document_9b4560a1 = __commonJS({
  "node_modules/yaml/dist/Document-9b4560a1.js"(exports) {
    "use strict";
    init_define_process();
    var PlainValue = require_PlainValue_ec8e588e();
    var resolveSeq = require_resolveSeq_d03cb037();
    var Schema = require_Schema_88e323a7();
    var defaultOptions = {
      anchorPrefix: "a",
      customTags: null,
      indent: 2,
      indentSeq: true,
      keepCstNodes: false,
      keepNodeTypes: true,
      keepBlobsInJSON: true,
      mapAsMap: false,
      maxAliasCount: 100,
      prettyErrors: false,
      simpleKeys: false,
      version: "1.2"
    };
    var scalarOptions = {
      get binary() {
        return resolveSeq.binaryOptions;
      },
      set binary(opt) {
        Object.assign(resolveSeq.binaryOptions, opt);
      },
      get bool() {
        return resolveSeq.boolOptions;
      },
      set bool(opt) {
        Object.assign(resolveSeq.boolOptions, opt);
      },
      get int() {
        return resolveSeq.intOptions;
      },
      set int(opt) {
        Object.assign(resolveSeq.intOptions, opt);
      },
      get null() {
        return resolveSeq.nullOptions;
      },
      set null(opt) {
        Object.assign(resolveSeq.nullOptions, opt);
      },
      get str() {
        return resolveSeq.strOptions;
      },
      set str(opt) {
        Object.assign(resolveSeq.strOptions, opt);
      }
    };
    var documentOptions = {
      "1.0": {
        schema: "yaml-1.1",
        merge: true,
        tagPrefixes: [{
          handle: "!",
          prefix: PlainValue.defaultTagPrefix
        }, {
          handle: "!!",
          prefix: "tag:private.yaml.org,2002:"
        }]
      },
      1.1: {
        schema: "yaml-1.1",
        merge: true,
        tagPrefixes: [{
          handle: "!",
          prefix: "!"
        }, {
          handle: "!!",
          prefix: PlainValue.defaultTagPrefix
        }]
      },
      1.2: {
        schema: "core",
        merge: false,
        tagPrefixes: [{
          handle: "!",
          prefix: "!"
        }, {
          handle: "!!",
          prefix: PlainValue.defaultTagPrefix
        }]
      }
    };
    function stringifyTag(doc, tag) {
      if ((doc.version || doc.options.version) === "1.0") {
        const priv = tag.match(/^tag:private\.yaml\.org,2002:([^:/]+)$/);
        if (priv)
          return "!" + priv[1];
        const vocab = tag.match(/^tag:([a-zA-Z0-9-]+)\.yaml\.org,2002:(.*)/);
        return vocab ? `!${vocab[1]}/${vocab[2]}` : `!${tag.replace(/^tag:/, "")}`;
      }
      let p = doc.tagPrefixes.find((p2) => tag.indexOf(p2.prefix) === 0);
      if (!p) {
        const dtp = doc.getDefaults().tagPrefixes;
        p = dtp && dtp.find((p2) => tag.indexOf(p2.prefix) === 0);
      }
      if (!p)
        return tag[0] === "!" ? tag : `!<${tag}>`;
      const suffix = tag.substr(p.prefix.length).replace(/[!,[\]{}]/g, (ch) => ({
        "!": "%21",
        ",": "%2C",
        "[": "%5B",
        "]": "%5D",
        "{": "%7B",
        "}": "%7D"
      })[ch]);
      return p.handle + suffix;
    }
    function getTagObject(tags, item) {
      if (item instanceof resolveSeq.Alias)
        return resolveSeq.Alias;
      if (item.tag) {
        const match = tags.filter((t) => t.tag === item.tag);
        if (match.length > 0)
          return match.find((t) => t.format === item.format) || match[0];
      }
      let tagObj, obj;
      if (item instanceof resolveSeq.Scalar) {
        obj = item.value;
        const match = tags.filter((t) => t.identify && t.identify(obj) || t.class && obj instanceof t.class);
        tagObj = match.find((t) => t.format === item.format) || match.find((t) => !t.format);
      } else {
        obj = item;
        tagObj = tags.find((t) => t.nodeClass && obj instanceof t.nodeClass);
      }
      if (!tagObj) {
        const name = obj && obj.constructor ? obj.constructor.name : typeof obj;
        throw new Error(`Tag not resolved for ${name} value`);
      }
      return tagObj;
    }
    function stringifyProps(node, tagObj, _ref25) {
      let {
        anchors,
        doc
      } = _ref25;
      const props = [];
      const anchor = doc.anchors.getName(node);
      if (anchor) {
        anchors[anchor] = node;
        props.push(`&${anchor}`);
      }
      if (node.tag) {
        props.push(stringifyTag(doc, node.tag));
      } else if (!tagObj.default) {
        props.push(stringifyTag(doc, tagObj.tag));
      }
      return props.join(" ");
    }
    function stringify(item, ctx, onComment, onChompKeep) {
      const {
        anchors,
        schema
      } = ctx.doc;
      let tagObj;
      if (!(item instanceof resolveSeq.Node)) {
        const createCtx = {
          aliasNodes: [],
          onTagObj: (o) => tagObj = o,
          prevObjects: /* @__PURE__ */ new Map()
        };
        item = schema.createNode(item, true, null, createCtx);
        for (const alias of createCtx.aliasNodes) {
          alias.source = alias.source.node;
          let name = anchors.getName(alias.source);
          if (!name) {
            name = anchors.newName();
            anchors.map[name] = alias.source;
          }
        }
      }
      if (item instanceof resolveSeq.Pair)
        return item.toString(ctx, onComment, onChompKeep);
      if (!tagObj)
        tagObj = getTagObject(schema.tags, item);
      const props = stringifyProps(item, tagObj, ctx);
      if (props.length > 0)
        ctx.indentAtStart = (ctx.indentAtStart || 0) + props.length + 1;
      const str = typeof tagObj.stringify === "function" ? tagObj.stringify(item, ctx, onComment, onChompKeep) : item instanceof resolveSeq.Scalar ? resolveSeq.stringifyString(item, ctx, onComment, onChompKeep) : item.toString(ctx, onComment, onChompKeep);
      if (!props)
        return str;
      return item instanceof resolveSeq.Scalar || str[0] === "{" || str[0] === "[" ? `${props} ${str}` : `${props}
${ctx.indent}${str}`;
    }
    var Anchors = class {
      static validAnchorNode(node) {
        return node instanceof resolveSeq.Scalar || node instanceof resolveSeq.YAMLSeq || node instanceof resolveSeq.YAMLMap;
      }
      constructor(prefix) {
        PlainValue._defineProperty(this, "map", /* @__PURE__ */ Object.create(null));
        this.prefix = prefix;
      }
      createAlias(node, name) {
        this.setAnchor(node, name);
        return new resolveSeq.Alias(node);
      }
      createMergePair() {
        const merge = new resolveSeq.Merge();
        for (var _len = arguments.length, sources = new Array(_len), _key = 0; _key < _len; _key++) {
          sources[_key] = arguments[_key];
        }
        merge.value.items = sources.map((s) => {
          if (s instanceof resolveSeq.Alias) {
            if (s.source instanceof resolveSeq.YAMLMap)
              return s;
          } else if (s instanceof resolveSeq.YAMLMap) {
            return this.createAlias(s);
          }
          throw new Error("Merge sources must be Map nodes or their Aliases");
        });
        return merge;
      }
      getName(node) {
        const {
          map
        } = this;
        return Object.keys(map).find((a) => map[a] === node);
      }
      getNames() {
        return Object.keys(this.map);
      }
      getNode(name) {
        return this.map[name];
      }
      newName(prefix) {
        if (!prefix)
          prefix = this.prefix;
        const names = Object.keys(this.map);
        for (let i = 1; true; ++i) {
          const name = `${prefix}${i}`;
          if (!names.includes(name))
            return name;
        }
      }
      resolveNodes() {
        const {
          map,
          _cstAliases
        } = this;
        Object.keys(map).forEach((a) => {
          map[a] = map[a].resolved;
        });
        _cstAliases.forEach((a) => {
          a.source = a.source.resolved;
        });
        delete this._cstAliases;
      }
      setAnchor(node, name) {
        if (node != null && !Anchors.validAnchorNode(node)) {
          throw new Error("Anchors may only be set for Scalar, Seq and Map nodes");
        }
        if (name && /[\x00-\x19\s,[\]{}]/.test(name)) {
          throw new Error("Anchor names must not contain whitespace or control characters");
        }
        const {
          map
        } = this;
        const prev = node && Object.keys(map).find((a) => map[a] === node);
        if (prev) {
          if (!name) {
            return prev;
          } else if (prev !== name) {
            delete map[prev];
            map[name] = node;
          }
        } else {
          if (!name) {
            if (!node)
              return null;
            name = this.newName();
          }
          map[name] = node;
        }
        return name;
      }
    };
    var visit = (node, tags) => {
      if (node && typeof node === "object") {
        const {
          tag
        } = node;
        if (node instanceof resolveSeq.Collection) {
          if (tag)
            tags[tag] = true;
          node.items.forEach((n) => visit(n, tags));
        } else if (node instanceof resolveSeq.Pair) {
          visit(node.key, tags);
          visit(node.value, tags);
        } else if (node instanceof resolveSeq.Scalar) {
          if (tag)
            tags[tag] = true;
        }
      }
      return tags;
    };
    var listTagNames = (node) => Object.keys(visit(node, {}));
    function parseContents(doc, contents) {
      const comments = {
        before: [],
        after: []
      };
      let body = void 0;
      let spaceBefore = false;
      for (const node of contents) {
        if (node.valueRange) {
          if (body !== void 0) {
            const msg = "Document contains trailing content not separated by a ... or --- line";
            doc.errors.push(new PlainValue.YAMLSyntaxError(node, msg));
            break;
          }
          const res = resolveSeq.resolveNode(doc, node);
          if (spaceBefore) {
            res.spaceBefore = true;
            spaceBefore = false;
          }
          body = res;
        } else if (node.comment !== null) {
          const cc = body === void 0 ? comments.before : comments.after;
          cc.push(node.comment);
        } else if (node.type === PlainValue.Type.BLANK_LINE) {
          spaceBefore = true;
          if (body === void 0 && comments.before.length > 0 && !doc.commentBefore) {
            doc.commentBefore = comments.before.join("\n");
            comments.before = [];
          }
        }
      }
      doc.contents = body || null;
      if (!body) {
        doc.comment = comments.before.concat(comments.after).join("\n") || null;
      } else {
        const cb = comments.before.join("\n");
        if (cb) {
          const cbNode = body instanceof resolveSeq.Collection && body.items[0] ? body.items[0] : body;
          cbNode.commentBefore = cbNode.commentBefore ? `${cb}
${cbNode.commentBefore}` : cb;
        }
        doc.comment = comments.after.join("\n") || null;
      }
    }
    function resolveTagDirective(_ref26, directive) {
      let {
        tagPrefixes
      } = _ref26;
      const [handle, prefix] = directive.parameters;
      if (!handle || !prefix) {
        const msg = "Insufficient parameters given for %TAG directive";
        throw new PlainValue.YAMLSemanticError(directive, msg);
      }
      if (tagPrefixes.some((p) => p.handle === handle)) {
        const msg = "The %TAG directive must only be given at most once per handle in the same document.";
        throw new PlainValue.YAMLSemanticError(directive, msg);
      }
      return {
        handle,
        prefix
      };
    }
    function resolveYamlDirective(doc, directive) {
      let [version] = directive.parameters;
      if (directive.name === "YAML:1.0")
        version = "1.0";
      if (!version) {
        const msg = "Insufficient parameters given for %YAML directive";
        throw new PlainValue.YAMLSemanticError(directive, msg);
      }
      if (!documentOptions[version]) {
        const v0 = doc.version || doc.options.version;
        const msg = `Document will be parsed as YAML ${v0} rather than YAML ${version}`;
        doc.warnings.push(new PlainValue.YAMLWarning(directive, msg));
      }
      return version;
    }
    function parseDirectives(doc, directives, prevDoc) {
      const directiveComments = [];
      let hasDirectives = false;
      for (const directive of directives) {
        const {
          comment,
          name
        } = directive;
        switch (name) {
          case "TAG":
            try {
              doc.tagPrefixes.push(resolveTagDirective(doc, directive));
            } catch (error) {
              doc.errors.push(error);
            }
            hasDirectives = true;
            break;
          case "YAML":
          case "YAML:1.0":
            if (doc.version) {
              const msg = "The %YAML directive must only be given at most once per document.";
              doc.errors.push(new PlainValue.YAMLSemanticError(directive, msg));
            }
            try {
              doc.version = resolveYamlDirective(doc, directive);
            } catch (error) {
              doc.errors.push(error);
            }
            hasDirectives = true;
            break;
          default:
            if (name) {
              const msg = `YAML only supports %TAG and %YAML directives, and not %${name}`;
              doc.warnings.push(new PlainValue.YAMLWarning(directive, msg));
            }
        }
        if (comment)
          directiveComments.push(comment);
      }
      if (prevDoc && !hasDirectives && "1.1" === (doc.version || prevDoc.version || doc.options.version)) {
        const copyTagPrefix = (_ref27) => {
          let {
            handle,
            prefix
          } = _ref27;
          return {
            handle,
            prefix
          };
        };
        doc.tagPrefixes = prevDoc.tagPrefixes.map(copyTagPrefix);
        doc.version = prevDoc.version;
      }
      doc.commentBefore = directiveComments.join("\n") || null;
    }
    function assertCollection(contents) {
      if (contents instanceof resolveSeq.Collection)
        return true;
      throw new Error("Expected a YAML collection as document contents");
    }
    var Document = class {
      constructor(options) {
        this.anchors = new Anchors(options.anchorPrefix);
        this.commentBefore = null;
        this.comment = null;
        this.contents = null;
        this.directivesEndMarker = null;
        this.errors = [];
        this.options = options;
        this.schema = null;
        this.tagPrefixes = [];
        this.version = null;
        this.warnings = [];
      }
      add(value) {
        assertCollection(this.contents);
        return this.contents.add(value);
      }
      addIn(path, value) {
        assertCollection(this.contents);
        this.contents.addIn(path, value);
      }
      delete(key) {
        assertCollection(this.contents);
        return this.contents.delete(key);
      }
      deleteIn(path) {
        if (resolveSeq.isEmptyPath(path)) {
          if (this.contents == null)
            return false;
          this.contents = null;
          return true;
        }
        assertCollection(this.contents);
        return this.contents.deleteIn(path);
      }
      getDefaults() {
        return Document.defaults[this.version] || Document.defaults[this.options.version] || {};
      }
      get(key, keepScalar) {
        return this.contents instanceof resolveSeq.Collection ? this.contents.get(key, keepScalar) : void 0;
      }
      getIn(path, keepScalar) {
        if (resolveSeq.isEmptyPath(path))
          return !keepScalar && this.contents instanceof resolveSeq.Scalar ? this.contents.value : this.contents;
        return this.contents instanceof resolveSeq.Collection ? this.contents.getIn(path, keepScalar) : void 0;
      }
      has(key) {
        return this.contents instanceof resolveSeq.Collection ? this.contents.has(key) : false;
      }
      hasIn(path) {
        if (resolveSeq.isEmptyPath(path))
          return this.contents !== void 0;
        return this.contents instanceof resolveSeq.Collection ? this.contents.hasIn(path) : false;
      }
      set(key, value) {
        assertCollection(this.contents);
        this.contents.set(key, value);
      }
      setIn(path, value) {
        if (resolveSeq.isEmptyPath(path))
          this.contents = value;
        else {
          assertCollection(this.contents);
          this.contents.setIn(path, value);
        }
      }
      setSchema(id, customTags) {
        if (!id && !customTags && this.schema)
          return;
        if (typeof id === "number")
          id = id.toFixed(1);
        if (id === "1.0" || id === "1.1" || id === "1.2") {
          if (this.version)
            this.version = id;
          else
            this.options.version = id;
          delete this.options.schema;
        } else if (id && typeof id === "string") {
          this.options.schema = id;
        }
        if (Array.isArray(customTags))
          this.options.customTags = customTags;
        const opt = Object.assign({}, this.getDefaults(), this.options);
        this.schema = new Schema.Schema(opt);
      }
      parse(node, prevDoc) {
        if (this.options.keepCstNodes)
          this.cstNode = node;
        if (this.options.keepNodeTypes)
          this.type = "DOCUMENT";
        const {
          directives = [],
          contents = [],
          directivesEndMarker,
          error,
          valueRange
        } = node;
        if (error) {
          if (!error.source)
            error.source = this;
          this.errors.push(error);
        }
        parseDirectives(this, directives, prevDoc);
        if (directivesEndMarker)
          this.directivesEndMarker = true;
        this.range = valueRange ? [valueRange.start, valueRange.end] : null;
        this.setSchema();
        this.anchors._cstAliases = [];
        parseContents(this, contents);
        this.anchors.resolveNodes();
        if (this.options.prettyErrors) {
          for (const error2 of this.errors)
            if (error2 instanceof PlainValue.YAMLError)
              error2.makePretty();
          for (const warn of this.warnings)
            if (warn instanceof PlainValue.YAMLError)
              warn.makePretty();
        }
        return this;
      }
      listNonDefaultTags() {
        return listTagNames(this.contents).filter((t) => t.indexOf(Schema.Schema.defaultPrefix) !== 0);
      }
      setTagPrefix(handle, prefix) {
        if (handle[0] !== "!" || handle[handle.length - 1] !== "!")
          throw new Error("Handle must start and end with !");
        if (prefix) {
          const prev = this.tagPrefixes.find((p) => p.handle === handle);
          if (prev)
            prev.prefix = prefix;
          else
            this.tagPrefixes.push({
              handle,
              prefix
            });
        } else {
          this.tagPrefixes = this.tagPrefixes.filter((p) => p.handle !== handle);
        }
      }
      toJSON(arg, onAnchor) {
        const {
          keepBlobsInJSON,
          mapAsMap,
          maxAliasCount
        } = this.options;
        const keep = keepBlobsInJSON && (typeof arg !== "string" || !(this.contents instanceof resolveSeq.Scalar));
        const ctx = {
          doc: this,
          indentStep: "  ",
          keep,
          mapAsMap: keep && !!mapAsMap,
          maxAliasCount,
          stringify
        };
        const anchorNames = Object.keys(this.anchors.map);
        if (anchorNames.length > 0)
          ctx.anchors = new Map(anchorNames.map((name) => [this.anchors.map[name], {
            alias: [],
            aliasCount: 0,
            count: 1
          }]));
        const res = resolveSeq.toJSON(this.contents, arg, ctx);
        if (typeof onAnchor === "function" && ctx.anchors)
          for (const {
            count,
            res: res2
          } of ctx.anchors.values())
            onAnchor(res2, count);
        return res;
      }
      toString() {
        if (this.errors.length > 0)
          throw new Error("Document with errors cannot be stringified");
        const indentSize = this.options.indent;
        if (!Number.isInteger(indentSize) || indentSize <= 0) {
          const s = JSON.stringify(indentSize);
          throw new Error(`"indent" option must be a positive integer, not ${s}`);
        }
        this.setSchema();
        const lines = [];
        let hasDirectives = false;
        if (this.version) {
          let vd = "%YAML 1.2";
          if (this.schema.name === "yaml-1.1") {
            if (this.version === "1.0")
              vd = "%YAML:1.0";
            else if (this.version === "1.1")
              vd = "%YAML 1.1";
          }
          lines.push(vd);
          hasDirectives = true;
        }
        const tagNames = this.listNonDefaultTags();
        this.tagPrefixes.forEach((_ref28) => {
          let {
            handle,
            prefix
          } = _ref28;
          if (tagNames.some((t) => t.indexOf(prefix) === 0)) {
            lines.push(`%TAG ${handle} ${prefix}`);
            hasDirectives = true;
          }
        });
        if (hasDirectives || this.directivesEndMarker)
          lines.push("---");
        if (this.commentBefore) {
          if (hasDirectives || !this.directivesEndMarker)
            lines.unshift("");
          lines.unshift(this.commentBefore.replace(/^/gm, "#"));
        }
        const ctx = {
          anchors: /* @__PURE__ */ Object.create(null),
          doc: this,
          indent: "",
          indentStep: " ".repeat(indentSize),
          stringify
        };
        let chompKeep = false;
        let contentComment = null;
        if (this.contents) {
          if (this.contents instanceof resolveSeq.Node) {
            if (this.contents.spaceBefore && (hasDirectives || this.directivesEndMarker))
              lines.push("");
            if (this.contents.commentBefore)
              lines.push(this.contents.commentBefore.replace(/^/gm, "#"));
            ctx.forceBlockIndent = !!this.comment;
            contentComment = this.contents.comment;
          }
          const onChompKeep = contentComment ? null : () => chompKeep = true;
          const body = stringify(this.contents, ctx, () => contentComment = null, onChompKeep);
          lines.push(resolveSeq.addComment(body, "", contentComment));
        } else if (this.contents !== void 0) {
          lines.push(stringify(this.contents, ctx));
        }
        if (this.comment) {
          if ((!chompKeep || contentComment) && lines[lines.length - 1] !== "")
            lines.push("");
          lines.push(this.comment.replace(/^/gm, "#"));
        }
        return lines.join("\n") + "\n";
      }
    };
    PlainValue._defineProperty(Document, "defaults", documentOptions);
    exports.Document = Document;
    exports.defaultOptions = defaultOptions;
    exports.scalarOptions = scalarOptions;
  }
});
var require_dist = __commonJS({
  "node_modules/yaml/dist/index.js"(exports) {
    "use strict";
    init_define_process();
    var parseCst = require_parse_cst();
    var Document$1 = require_Document_9b4560a1();
    var Schema = require_Schema_88e323a7();
    var PlainValue = require_PlainValue_ec8e588e();
    var warnings = require_warnings_1000a372();
    require_resolveSeq_d03cb037();
    function createNode(value) {
      let wrapScalars = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
      let tag = arguments.length > 2 ? arguments[2] : void 0;
      if (tag === void 0 && typeof wrapScalars === "string") {
        tag = wrapScalars;
        wrapScalars = true;
      }
      const options = Object.assign({}, Document$1.Document.defaults[Document$1.defaultOptions.version], Document$1.defaultOptions);
      const schema = new Schema.Schema(options);
      return schema.createNode(value, wrapScalars, tag);
    }
    var Document = class extends Document$1.Document {
      constructor(options) {
        super(Object.assign({}, Document$1.defaultOptions, options));
      }
    };
    function parseAllDocuments(src, options) {
      const stream = [];
      let prev;
      for (const cstDoc of parseCst.parse(src)) {
        const doc = new Document(options);
        doc.parse(cstDoc, prev);
        stream.push(doc);
        prev = doc;
      }
      return stream;
    }
    function parseDocument(src, options) {
      const cst = parseCst.parse(src);
      const doc = new Document(options).parse(cst[0]);
      if (cst.length > 1) {
        const errMsg = "Source contains multiple documents; please use YAML.parseAllDocuments()";
        doc.errors.unshift(new PlainValue.YAMLSemanticError(cst[1], errMsg));
      }
      return doc;
    }
    function parse(src, options) {
      const doc = parseDocument(src, options);
      doc.warnings.forEach((warning) => warnings.warn(warning));
      if (doc.errors.length > 0)
        throw doc.errors[0];
      return doc.toJSON();
    }
    function stringify(value, options) {
      const doc = new Document(options);
      doc.contents = value;
      return String(doc);
    }
    var YAML = {
      createNode,
      defaultOptions: Document$1.defaultOptions,
      Document,
      parse,
      parseAllDocuments,
      parseCST: parseCst.parse,
      parseDocument,
      scalarOptions: Document$1.scalarOptions,
      stringify
    };
    exports.YAML = YAML;
  }
});
var require_yaml = __commonJS({
  "node_modules/yaml/index.js"(exports, module) {
    init_define_process();
    module.exports = require_dist().YAML;
  }
});
var require_util = __commonJS({
  "node_modules/yaml/dist/util.js"(exports) {
    "use strict";
    init_define_process();
    var resolveSeq = require_resolveSeq_d03cb037();
    var PlainValue = require_PlainValue_ec8e588e();
    exports.findPair = resolveSeq.findPair;
    exports.parseMap = resolveSeq.resolveMap;
    exports.parseSeq = resolveSeq.resolveSeq;
    exports.stringifyNumber = resolveSeq.stringifyNumber;
    exports.stringifyString = resolveSeq.stringifyString;
    exports.toJSON = resolveSeq.toJSON;
    exports.Type = PlainValue.Type;
    exports.YAMLError = PlainValue.YAMLError;
    exports.YAMLReferenceError = PlainValue.YAMLReferenceError;
    exports.YAMLSemanticError = PlainValue.YAMLSemanticError;
    exports.YAMLSyntaxError = PlainValue.YAMLSyntaxError;
    exports.YAMLWarning = PlainValue.YAMLWarning;
  }
});
var require_util2 = __commonJS({
  "node_modules/yaml/util.js"(exports) {
    init_define_process();
    var util = require_util();
    exports.findPair = util.findPair;
    exports.toJSON = util.toJSON;
    exports.parseMap = util.parseMap;
    exports.parseSeq = util.parseSeq;
    exports.stringifyNumber = util.stringifyNumber;
    exports.stringifyString = util.stringifyString;
    exports.Type = util.Type;
    exports.YAMLError = util.YAMLError;
    exports.YAMLReferenceError = util.YAMLReferenceError;
    exports.YAMLSemanticError = util.YAMLSemanticError;
    exports.YAMLSyntaxError = util.YAMLSyntaxError;
    exports.YAMLWarning = util.YAMLWarning;
  }
});
var require_yaml2 = __commonJS({
  "node_modules/yaml-unist-parser/lib/yaml.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var yaml_1 = require_yaml();
    exports.Document = yaml_1.Document;
    var yaml_2 = require_yaml();
    exports.parseCST = yaml_2.parseCST;
    var util_1 = require_util2();
    exports.YAMLError = util_1.YAMLError;
    exports.YAMLSyntaxError = util_1.YAMLSyntaxError;
    exports.YAMLSemanticError = util_1.YAMLSemanticError;
  }
});
var require_parse = __commonJS({
  "node_modules/yaml-unist-parser/lib/parse.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var lines_and_columns_1 = require_build();
    var attach_1 = require_attach();
    var root_1 = require_root();
    var preprocess_1 = require_preprocess();
    var transform_1 = require_transform();
    var content_1 = require_content2();
    var error_1 = require_error2();
    var offset_1 = require_offset();
    var range_1 = require_range();
    var add_orig_range_1 = require_add_orig_range();
    var remove_fake_nodes_1 = require_remove_fake_nodes();
    var update_positions_1 = require_update_positions();
    var YAML = require_yaml2();
    function parse(text) {
      var cst = YAML.parseCST(text);
      add_orig_range_1.addOrigRange(cst);
      var documents = cst.map(function(cstDocument) {
        return new YAML.Document({
          merge: false,
          keepCstNodes: true
        }).parse(cstDocument);
      });
      var locator = new lines_and_columns_1["default"](text);
      var comments = [];
      var context = {
        text,
        locator,
        comments,
        transformOffset: function(offset) {
          return offset_1.transformOffset(offset, context);
        },
        transformRange: function(range) {
          return range_1.transformRange(range, context);
        },
        transformNode: function(node) {
          return transform_1.transformNode(node, context);
        },
        transformContent: function(node) {
          return content_1.transformContent(node, context);
        }
      };
      for (var _i = 0, documents_1 = documents; _i < documents_1.length; _i++) {
        var document = documents_1[_i];
        for (var _a = 0, _b = document.errors; _a < _b.length; _a++) {
          var error = _b[_a];
          if (error instanceof YAML.YAMLSemanticError && error.message === 'Map keys must be unique; "<<" is repeated') {
            continue;
          }
          throw error_1.transformError(error, context);
        }
      }
      documents.forEach(function(document2) {
        return preprocess_1.removeCstBlankLine(document2.cstNode);
      });
      var root = root_1.createRoot(context.transformRange({
        origStart: 0,
        origEnd: context.text.length
      }), documents.map(context.transformNode), comments);
      attach_1.attachComments(root);
      update_positions_1.updatePositions(root);
      remove_fake_nodes_1.removeFakeNodes(root);
      return root;
    }
    exports.parse = parse;
  }
});
var require_lib = __commonJS({
  "node_modules/yaml-unist-parser/lib/index.js"(exports) {
    "use strict";
    init_define_process();
    exports.__esModule = true;
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    tslib_1.__exportStar(require_parse(), exports);
  }
});
var require_parser_yaml = __commonJS({
  "src/language-yaml/parser-yaml.js"(exports, module) {
    init_define_process();
    var createError = require_parser_create_error();
    var {
      hasPragma
    } = require_pragma();
    var {
      locStart,
      locEnd
    } = require_loc();
    function parse(text) {
      const {
        parse: parse2
      } = require_lib();
      try {
        const root = parse2(text);
        delete root.comments;
        return root;
      } catch (error) {
        if (error !== null && error !== void 0 && error.position) {
          throw createError(error.message, error.position);
        }
        throw error;
      }
    }
    var parser = {
      astFormat: "yaml",
      parse,
      hasPragma,
      locStart,
      locEnd
    };
    module.exports = {
      parsers: {
        yaml: parser
      }
    };
  }
});
var parser_yaml_js_esm_default = require_parser_yaml();
export {
  parser_yaml_js_esm_default as default
};
