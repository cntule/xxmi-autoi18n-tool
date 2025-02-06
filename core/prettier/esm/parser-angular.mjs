// dist/_parser-angular.js.esm.mjs
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
var init_define_process = __esm({
  "<define:process>"() {
  }
});
var require_is_non_empty_array = __commonJS({
  "src/utils/is-non-empty-array.js"(exports, module) {
    "use strict";
    init_define_process();
    function isNonEmptyArray(object) {
      return Array.isArray(object) && object.length > 0;
    }
    module.exports = isNonEmptyArray;
  }
});
var require_loc = __commonJS({
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
var require_build = __commonJS({
  "node_modules/angular-estree-parser/node_modules/lines-and-columns/build/index.js"(exports) {
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
var require_context = __commonJS({
  "node_modules/angular-estree-parser/lib/context.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Context = void 0;
    var lines_and_columns_1 = require_build();
    var Context = class {
      constructor(text) {
        this.text = text;
        this.locator = new Locator(this.text);
      }
    };
    exports.Context = Context;
    var Locator = class {
      constructor(text) {
        this._lineAndColumn = new lines_and_columns_1.default(text);
      }
      locationForIndex(index) {
        const {
          line,
          column
        } = this._lineAndColumn.locationForIndex(index);
        return {
          line: line + 1,
          column
        };
      }
    };
  }
});
var ast_exports = {};
__export(ast_exports, {
  AST: () => AST,
  ASTWithName: () => ASTWithName,
  ASTWithSource: () => ASTWithSource,
  AbsoluteSourceSpan: () => AbsoluteSourceSpan,
  AstMemoryEfficientTransformer: () => AstMemoryEfficientTransformer,
  AstTransformer: () => AstTransformer,
  Binary: () => Binary,
  BindingPipe: () => BindingPipe,
  BoundElementProperty: () => BoundElementProperty,
  Chain: () => Chain,
  Conditional: () => Conditional,
  EmptyExpr: () => EmptyExpr,
  ExpressionBinding: () => ExpressionBinding,
  FunctionCall: () => FunctionCall,
  ImplicitReceiver: () => ImplicitReceiver,
  Interpolation: () => Interpolation,
  KeyedRead: () => KeyedRead,
  KeyedWrite: () => KeyedWrite,
  LiteralArray: () => LiteralArray,
  LiteralMap: () => LiteralMap,
  LiteralPrimitive: () => LiteralPrimitive,
  MethodCall: () => MethodCall,
  NonNullAssert: () => NonNullAssert,
  ParseSpan: () => ParseSpan,
  ParsedEvent: () => ParsedEvent,
  ParsedProperty: () => ParsedProperty,
  ParsedPropertyType: () => ParsedPropertyType,
  ParsedVariable: () => ParsedVariable,
  ParserError: () => ParserError,
  PrefixNot: () => PrefixNot,
  PropertyRead: () => PropertyRead,
  PropertyWrite: () => PropertyWrite,
  Quote: () => Quote,
  RecursiveAstVisitor: () => RecursiveAstVisitor,
  SafeKeyedRead: () => SafeKeyedRead,
  SafeMethodCall: () => SafeMethodCall,
  SafePropertyRead: () => SafePropertyRead,
  ThisReceiver: () => ThisReceiver,
  Unary: () => Unary,
  VariableBinding: () => VariableBinding
});
var ParserError;
var ParseSpan;
var AST;
var ASTWithName;
var Quote;
var EmptyExpr;
var ImplicitReceiver;
var ThisReceiver;
var Chain;
var Conditional;
var PropertyRead;
var PropertyWrite;
var SafePropertyRead;
var KeyedRead;
var SafeKeyedRead;
var KeyedWrite;
var BindingPipe;
var LiteralPrimitive;
var LiteralArray;
var LiteralMap;
var Interpolation;
var Binary;
var Unary;
var PrefixNot;
var NonNullAssert;
var MethodCall;
var SafeMethodCall;
var FunctionCall;
var AbsoluteSourceSpan;
var ASTWithSource;
var VariableBinding;
var ExpressionBinding;
var RecursiveAstVisitor;
var AstTransformer;
var AstMemoryEfficientTransformer;
var ParsedProperty;
var ParsedPropertyType;
var ParsedEvent;
var ParsedVariable;
var BoundElementProperty;
var init_ast = __esm({
  "node_modules/@angular/compiler/esm2015/src/expression_parser/ast.js"() {
    init_define_process();
    ParserError = class {
      constructor(message, input, errLocation, ctxLocation) {
        this.input = input;
        this.errLocation = errLocation;
        this.ctxLocation = ctxLocation;
        this.message = `Parser Error: ${message} ${errLocation} [${input}] in ${ctxLocation}`;
      }
    };
    ParseSpan = class {
      constructor(start, end) {
        this.start = start;
        this.end = end;
      }
      toAbsolute(absoluteOffset) {
        return new AbsoluteSourceSpan(absoluteOffset + this.start, absoluteOffset + this.end);
      }
    };
    AST = class {
      constructor(span, sourceSpan) {
        this.span = span;
        this.sourceSpan = sourceSpan;
      }
      toString() {
        return "AST";
      }
    };
    ASTWithName = class extends AST {
      constructor(span, sourceSpan, nameSpan) {
        super(span, sourceSpan);
        this.nameSpan = nameSpan;
      }
    };
    Quote = class extends AST {
      constructor(span, sourceSpan, prefix, uninterpretedExpression, location) {
        super(span, sourceSpan);
        this.prefix = prefix;
        this.uninterpretedExpression = uninterpretedExpression;
        this.location = location;
      }
      visit(visitor) {
        let context = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        return visitor.visitQuote(this, context);
      }
      toString() {
        return "Quote";
      }
    };
    EmptyExpr = class extends AST {
      visit(visitor) {
        let context = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
      }
    };
    ImplicitReceiver = class extends AST {
      visit(visitor) {
        let context = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        return visitor.visitImplicitReceiver(this, context);
      }
    };
    ThisReceiver = class extends ImplicitReceiver {
      visit(visitor) {
        let context = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        var _a;
        return (_a = visitor.visitThisReceiver) === null || _a === void 0 ? void 0 : _a.call(visitor, this, context);
      }
    };
    Chain = class extends AST {
      constructor(span, sourceSpan, expressions) {
        super(span, sourceSpan);
        this.expressions = expressions;
      }
      visit(visitor) {
        let context = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        return visitor.visitChain(this, context);
      }
    };
    Conditional = class extends AST {
      constructor(span, sourceSpan, condition, trueExp, falseExp) {
        super(span, sourceSpan);
        this.condition = condition;
        this.trueExp = trueExp;
        this.falseExp = falseExp;
      }
      visit(visitor) {
        let context = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        return visitor.visitConditional(this, context);
      }
    };
    PropertyRead = class extends ASTWithName {
      constructor(span, sourceSpan, nameSpan, receiver, name) {
        super(span, sourceSpan, nameSpan);
        this.receiver = receiver;
        this.name = name;
      }
      visit(visitor) {
        let context = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        return visitor.visitPropertyRead(this, context);
      }
    };
    PropertyWrite = class extends ASTWithName {
      constructor(span, sourceSpan, nameSpan, receiver, name, value) {
        super(span, sourceSpan, nameSpan);
        this.receiver = receiver;
        this.name = name;
        this.value = value;
      }
      visit(visitor) {
        let context = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        return visitor.visitPropertyWrite(this, context);
      }
    };
    SafePropertyRead = class extends ASTWithName {
      constructor(span, sourceSpan, nameSpan, receiver, name) {
        super(span, sourceSpan, nameSpan);
        this.receiver = receiver;
        this.name = name;
      }
      visit(visitor) {
        let context = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        return visitor.visitSafePropertyRead(this, context);
      }
    };
    KeyedRead = class extends AST {
      constructor(span, sourceSpan, receiver, key) {
        super(span, sourceSpan);
        this.receiver = receiver;
        this.key = key;
      }
      visit(visitor) {
        let context = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        return visitor.visitKeyedRead(this, context);
      }
    };
    SafeKeyedRead = class extends AST {
      constructor(span, sourceSpan, receiver, key) {
        super(span, sourceSpan);
        this.receiver = receiver;
        this.key = key;
      }
      visit(visitor) {
        let context = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        return visitor.visitSafeKeyedRead(this, context);
      }
    };
    KeyedWrite = class extends AST {
      constructor(span, sourceSpan, receiver, key, value) {
        super(span, sourceSpan);
        this.receiver = receiver;
        this.key = key;
        this.value = value;
      }
      visit(visitor) {
        let context = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        return visitor.visitKeyedWrite(this, context);
      }
    };
    BindingPipe = class extends ASTWithName {
      constructor(span, sourceSpan, exp, name, args, nameSpan) {
        super(span, sourceSpan, nameSpan);
        this.exp = exp;
        this.name = name;
        this.args = args;
      }
      visit(visitor) {
        let context = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        return visitor.visitPipe(this, context);
      }
    };
    LiteralPrimitive = class extends AST {
      constructor(span, sourceSpan, value) {
        super(span, sourceSpan);
        this.value = value;
      }
      visit(visitor) {
        let context = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        return visitor.visitLiteralPrimitive(this, context);
      }
    };
    LiteralArray = class extends AST {
      constructor(span, sourceSpan, expressions) {
        super(span, sourceSpan);
        this.expressions = expressions;
      }
      visit(visitor) {
        let context = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        return visitor.visitLiteralArray(this, context);
      }
    };
    LiteralMap = class extends AST {
      constructor(span, sourceSpan, keys, values) {
        super(span, sourceSpan);
        this.keys = keys;
        this.values = values;
      }
      visit(visitor) {
        let context = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        return visitor.visitLiteralMap(this, context);
      }
    };
    Interpolation = class extends AST {
      constructor(span, sourceSpan, strings, expressions) {
        super(span, sourceSpan);
        this.strings = strings;
        this.expressions = expressions;
      }
      visit(visitor) {
        let context = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        return visitor.visitInterpolation(this, context);
      }
    };
    Binary = class extends AST {
      constructor(span, sourceSpan, operation, left, right) {
        super(span, sourceSpan);
        this.operation = operation;
        this.left = left;
        this.right = right;
      }
      visit(visitor) {
        let context = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        return visitor.visitBinary(this, context);
      }
    };
    Unary = class extends Binary {
      constructor(span, sourceSpan, operator, expr, binaryOp, binaryLeft, binaryRight) {
        super(span, sourceSpan, binaryOp, binaryLeft, binaryRight);
        this.operator = operator;
        this.expr = expr;
      }
      static createMinus(span, sourceSpan, expr) {
        return new Unary(span, sourceSpan, "-", expr, "-", new LiteralPrimitive(span, sourceSpan, 0), expr);
      }
      static createPlus(span, sourceSpan, expr) {
        return new Unary(span, sourceSpan, "+", expr, "-", expr, new LiteralPrimitive(span, sourceSpan, 0));
      }
      visit(visitor) {
        let context = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        if (visitor.visitUnary !== void 0) {
          return visitor.visitUnary(this, context);
        }
        return visitor.visitBinary(this, context);
      }
    };
    PrefixNot = class extends AST {
      constructor(span, sourceSpan, expression) {
        super(span, sourceSpan);
        this.expression = expression;
      }
      visit(visitor) {
        let context = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        return visitor.visitPrefixNot(this, context);
      }
    };
    NonNullAssert = class extends AST {
      constructor(span, sourceSpan, expression) {
        super(span, sourceSpan);
        this.expression = expression;
      }
      visit(visitor) {
        let context = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        return visitor.visitNonNullAssert(this, context);
      }
    };
    MethodCall = class extends ASTWithName {
      constructor(span, sourceSpan, nameSpan, receiver, name, args, argumentSpan) {
        super(span, sourceSpan, nameSpan);
        this.receiver = receiver;
        this.name = name;
        this.args = args;
        this.argumentSpan = argumentSpan;
      }
      visit(visitor) {
        let context = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        return visitor.visitMethodCall(this, context);
      }
    };
    SafeMethodCall = class extends ASTWithName {
      constructor(span, sourceSpan, nameSpan, receiver, name, args, argumentSpan) {
        super(span, sourceSpan, nameSpan);
        this.receiver = receiver;
        this.name = name;
        this.args = args;
        this.argumentSpan = argumentSpan;
      }
      visit(visitor) {
        let context = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        return visitor.visitSafeMethodCall(this, context);
      }
    };
    FunctionCall = class extends AST {
      constructor(span, sourceSpan, target, args) {
        super(span, sourceSpan);
        this.target = target;
        this.args = args;
      }
      visit(visitor) {
        let context = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        return visitor.visitFunctionCall(this, context);
      }
    };
    AbsoluteSourceSpan = class {
      constructor(start, end) {
        this.start = start;
        this.end = end;
      }
    };
    ASTWithSource = class extends AST {
      constructor(ast, source, location, absoluteOffset, errors) {
        super(new ParseSpan(0, source === null ? 0 : source.length), new AbsoluteSourceSpan(absoluteOffset, source === null ? absoluteOffset : absoluteOffset + source.length));
        this.ast = ast;
        this.source = source;
        this.location = location;
        this.errors = errors;
      }
      visit(visitor) {
        let context = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        if (visitor.visitASTWithSource) {
          return visitor.visitASTWithSource(this, context);
        }
        return this.ast.visit(visitor, context);
      }
      toString() {
        return `${this.source} in ${this.location}`;
      }
    };
    VariableBinding = class {
      constructor(sourceSpan, key, value) {
        this.sourceSpan = sourceSpan;
        this.key = key;
        this.value = value;
      }
    };
    ExpressionBinding = class {
      constructor(sourceSpan, key, value) {
        this.sourceSpan = sourceSpan;
        this.key = key;
        this.value = value;
      }
    };
    RecursiveAstVisitor = class {
      visit(ast, context) {
        ast.visit(this, context);
      }
      visitUnary(ast, context) {
        this.visit(ast.expr, context);
      }
      visitBinary(ast, context) {
        this.visit(ast.left, context);
        this.visit(ast.right, context);
      }
      visitChain(ast, context) {
        this.visitAll(ast.expressions, context);
      }
      visitConditional(ast, context) {
        this.visit(ast.condition, context);
        this.visit(ast.trueExp, context);
        this.visit(ast.falseExp, context);
      }
      visitPipe(ast, context) {
        this.visit(ast.exp, context);
        this.visitAll(ast.args, context);
      }
      visitFunctionCall(ast, context) {
        if (ast.target) {
          this.visit(ast.target, context);
        }
        this.visitAll(ast.args, context);
      }
      visitImplicitReceiver(ast, context) {
      }
      visitThisReceiver(ast, context) {
      }
      visitInterpolation(ast, context) {
        this.visitAll(ast.expressions, context);
      }
      visitKeyedRead(ast, context) {
        this.visit(ast.receiver, context);
        this.visit(ast.key, context);
      }
      visitKeyedWrite(ast, context) {
        this.visit(ast.receiver, context);
        this.visit(ast.key, context);
        this.visit(ast.value, context);
      }
      visitLiteralArray(ast, context) {
        this.visitAll(ast.expressions, context);
      }
      visitLiteralMap(ast, context) {
        this.visitAll(ast.values, context);
      }
      visitLiteralPrimitive(ast, context) {
      }
      visitMethodCall(ast, context) {
        this.visit(ast.receiver, context);
        this.visitAll(ast.args, context);
      }
      visitPrefixNot(ast, context) {
        this.visit(ast.expression, context);
      }
      visitNonNullAssert(ast, context) {
        this.visit(ast.expression, context);
      }
      visitPropertyRead(ast, context) {
        this.visit(ast.receiver, context);
      }
      visitPropertyWrite(ast, context) {
        this.visit(ast.receiver, context);
        this.visit(ast.value, context);
      }
      visitSafePropertyRead(ast, context) {
        this.visit(ast.receiver, context);
      }
      visitSafeMethodCall(ast, context) {
        this.visit(ast.receiver, context);
        this.visitAll(ast.args, context);
      }
      visitSafeKeyedRead(ast, context) {
        this.visit(ast.receiver, context);
        this.visit(ast.key, context);
      }
      visitQuote(ast, context) {
      }
      visitAll(asts, context) {
        for (const ast of asts) {
          this.visit(ast, context);
        }
      }
    };
    AstTransformer = class {
      visitImplicitReceiver(ast, context) {
        return ast;
      }
      visitThisReceiver(ast, context) {
        return ast;
      }
      visitInterpolation(ast, context) {
        return new Interpolation(ast.span, ast.sourceSpan, ast.strings, this.visitAll(ast.expressions));
      }
      visitLiteralPrimitive(ast, context) {
        return new LiteralPrimitive(ast.span, ast.sourceSpan, ast.value);
      }
      visitPropertyRead(ast, context) {
        return new PropertyRead(ast.span, ast.sourceSpan, ast.nameSpan, ast.receiver.visit(this), ast.name);
      }
      visitPropertyWrite(ast, context) {
        return new PropertyWrite(ast.span, ast.sourceSpan, ast.nameSpan, ast.receiver.visit(this), ast.name, ast.value.visit(this));
      }
      visitSafePropertyRead(ast, context) {
        return new SafePropertyRead(ast.span, ast.sourceSpan, ast.nameSpan, ast.receiver.visit(this), ast.name);
      }
      visitMethodCall(ast, context) {
        return new MethodCall(ast.span, ast.sourceSpan, ast.nameSpan, ast.receiver.visit(this), ast.name, this.visitAll(ast.args), ast.argumentSpan);
      }
      visitSafeMethodCall(ast, context) {
        return new SafeMethodCall(ast.span, ast.sourceSpan, ast.nameSpan, ast.receiver.visit(this), ast.name, this.visitAll(ast.args), ast.argumentSpan);
      }
      visitFunctionCall(ast, context) {
        return new FunctionCall(ast.span, ast.sourceSpan, ast.target.visit(this), this.visitAll(ast.args));
      }
      visitLiteralArray(ast, context) {
        return new LiteralArray(ast.span, ast.sourceSpan, this.visitAll(ast.expressions));
      }
      visitLiteralMap(ast, context) {
        return new LiteralMap(ast.span, ast.sourceSpan, ast.keys, this.visitAll(ast.values));
      }
      visitUnary(ast, context) {
        switch (ast.operator) {
          case "+":
            return Unary.createPlus(ast.span, ast.sourceSpan, ast.expr.visit(this));
          case "-":
            return Unary.createMinus(ast.span, ast.sourceSpan, ast.expr.visit(this));
          default:
            throw new Error(`Unknown unary operator ${ast.operator}`);
        }
      }
      visitBinary(ast, context) {
        return new Binary(ast.span, ast.sourceSpan, ast.operation, ast.left.visit(this), ast.right.visit(this));
      }
      visitPrefixNot(ast, context) {
        return new PrefixNot(ast.span, ast.sourceSpan, ast.expression.visit(this));
      }
      visitNonNullAssert(ast, context) {
        return new NonNullAssert(ast.span, ast.sourceSpan, ast.expression.visit(this));
      }
      visitConditional(ast, context) {
        return new Conditional(ast.span, ast.sourceSpan, ast.condition.visit(this), ast.trueExp.visit(this), ast.falseExp.visit(this));
      }
      visitPipe(ast, context) {
        return new BindingPipe(ast.span, ast.sourceSpan, ast.exp.visit(this), ast.name, this.visitAll(ast.args), ast.nameSpan);
      }
      visitKeyedRead(ast, context) {
        return new KeyedRead(ast.span, ast.sourceSpan, ast.receiver.visit(this), ast.key.visit(this));
      }
      visitKeyedWrite(ast, context) {
        return new KeyedWrite(ast.span, ast.sourceSpan, ast.receiver.visit(this), ast.key.visit(this), ast.value.visit(this));
      }
      visitAll(asts) {
        const res = [];
        for (let i = 0; i < asts.length; ++i) {
          res[i] = asts[i].visit(this);
        }
        return res;
      }
      visitChain(ast, context) {
        return new Chain(ast.span, ast.sourceSpan, this.visitAll(ast.expressions));
      }
      visitQuote(ast, context) {
        return new Quote(ast.span, ast.sourceSpan, ast.prefix, ast.uninterpretedExpression, ast.location);
      }
      visitSafeKeyedRead(ast, context) {
        return new SafeKeyedRead(ast.span, ast.sourceSpan, ast.receiver.visit(this), ast.key.visit(this));
      }
    };
    AstMemoryEfficientTransformer = class {
      visitImplicitReceiver(ast, context) {
        return ast;
      }
      visitThisReceiver(ast, context) {
        return ast;
      }
      visitInterpolation(ast, context) {
        const expressions = this.visitAll(ast.expressions);
        if (expressions !== ast.expressions)
          return new Interpolation(ast.span, ast.sourceSpan, ast.strings, expressions);
        return ast;
      }
      visitLiteralPrimitive(ast, context) {
        return ast;
      }
      visitPropertyRead(ast, context) {
        const receiver = ast.receiver.visit(this);
        if (receiver !== ast.receiver) {
          return new PropertyRead(ast.span, ast.sourceSpan, ast.nameSpan, receiver, ast.name);
        }
        return ast;
      }
      visitPropertyWrite(ast, context) {
        const receiver = ast.receiver.visit(this);
        const value = ast.value.visit(this);
        if (receiver !== ast.receiver || value !== ast.value) {
          return new PropertyWrite(ast.span, ast.sourceSpan, ast.nameSpan, receiver, ast.name, value);
        }
        return ast;
      }
      visitSafePropertyRead(ast, context) {
        const receiver = ast.receiver.visit(this);
        if (receiver !== ast.receiver) {
          return new SafePropertyRead(ast.span, ast.sourceSpan, ast.nameSpan, receiver, ast.name);
        }
        return ast;
      }
      visitMethodCall(ast, context) {
        const receiver = ast.receiver.visit(this);
        const args = this.visitAll(ast.args);
        if (receiver !== ast.receiver || args !== ast.args) {
          return new MethodCall(ast.span, ast.sourceSpan, ast.nameSpan, receiver, ast.name, args, ast.argumentSpan);
        }
        return ast;
      }
      visitSafeMethodCall(ast, context) {
        const receiver = ast.receiver.visit(this);
        const args = this.visitAll(ast.args);
        if (receiver !== ast.receiver || args !== ast.args) {
          return new SafeMethodCall(ast.span, ast.sourceSpan, ast.nameSpan, receiver, ast.name, args, ast.argumentSpan);
        }
        return ast;
      }
      visitFunctionCall(ast, context) {
        const target = ast.target && ast.target.visit(this);
        const args = this.visitAll(ast.args);
        if (target !== ast.target || args !== ast.args) {
          return new FunctionCall(ast.span, ast.sourceSpan, target, args);
        }
        return ast;
      }
      visitLiteralArray(ast, context) {
        const expressions = this.visitAll(ast.expressions);
        if (expressions !== ast.expressions) {
          return new LiteralArray(ast.span, ast.sourceSpan, expressions);
        }
        return ast;
      }
      visitLiteralMap(ast, context) {
        const values = this.visitAll(ast.values);
        if (values !== ast.values) {
          return new LiteralMap(ast.span, ast.sourceSpan, ast.keys, values);
        }
        return ast;
      }
      visitUnary(ast, context) {
        const expr = ast.expr.visit(this);
        if (expr !== ast.expr) {
          switch (ast.operator) {
            case "+":
              return Unary.createPlus(ast.span, ast.sourceSpan, expr);
            case "-":
              return Unary.createMinus(ast.span, ast.sourceSpan, expr);
            default:
              throw new Error(`Unknown unary operator ${ast.operator}`);
          }
        }
        return ast;
      }
      visitBinary(ast, context) {
        const left = ast.left.visit(this);
        const right = ast.right.visit(this);
        if (left !== ast.left || right !== ast.right) {
          return new Binary(ast.span, ast.sourceSpan, ast.operation, left, right);
        }
        return ast;
      }
      visitPrefixNot(ast, context) {
        const expression = ast.expression.visit(this);
        if (expression !== ast.expression) {
          return new PrefixNot(ast.span, ast.sourceSpan, expression);
        }
        return ast;
      }
      visitNonNullAssert(ast, context) {
        const expression = ast.expression.visit(this);
        if (expression !== ast.expression) {
          return new NonNullAssert(ast.span, ast.sourceSpan, expression);
        }
        return ast;
      }
      visitConditional(ast, context) {
        const condition = ast.condition.visit(this);
        const trueExp = ast.trueExp.visit(this);
        const falseExp = ast.falseExp.visit(this);
        if (condition !== ast.condition || trueExp !== ast.trueExp || falseExp !== ast.falseExp) {
          return new Conditional(ast.span, ast.sourceSpan, condition, trueExp, falseExp);
        }
        return ast;
      }
      visitPipe(ast, context) {
        const exp = ast.exp.visit(this);
        const args = this.visitAll(ast.args);
        if (exp !== ast.exp || args !== ast.args) {
          return new BindingPipe(ast.span, ast.sourceSpan, exp, ast.name, args, ast.nameSpan);
        }
        return ast;
      }
      visitKeyedRead(ast, context) {
        const obj = ast.receiver.visit(this);
        const key = ast.key.visit(this);
        if (obj !== ast.receiver || key !== ast.key) {
          return new KeyedRead(ast.span, ast.sourceSpan, obj, key);
        }
        return ast;
      }
      visitKeyedWrite(ast, context) {
        const obj = ast.receiver.visit(this);
        const key = ast.key.visit(this);
        const value = ast.value.visit(this);
        if (obj !== ast.receiver || key !== ast.key || value !== ast.value) {
          return new KeyedWrite(ast.span, ast.sourceSpan, obj, key, value);
        }
        return ast;
      }
      visitAll(asts) {
        const res = [];
        let modified = false;
        for (let i = 0; i < asts.length; ++i) {
          const original = asts[i];
          const value = original.visit(this);
          res[i] = value;
          modified = modified || value !== original;
        }
        return modified ? res : asts;
      }
      visitChain(ast, context) {
        const expressions = this.visitAll(ast.expressions);
        if (expressions !== ast.expressions) {
          return new Chain(ast.span, ast.sourceSpan, expressions);
        }
        return ast;
      }
      visitQuote(ast, context) {
        return ast;
      }
      visitSafeKeyedRead(ast, context) {
        const obj = ast.receiver.visit(this);
        const key = ast.key.visit(this);
        if (obj !== ast.receiver || key !== ast.key) {
          return new SafeKeyedRead(ast.span, ast.sourceSpan, obj, key);
        }
        return ast;
      }
    };
    ParsedProperty = class {
      constructor(name, expression, type, sourceSpan, keySpan, valueSpan) {
        this.name = name;
        this.expression = expression;
        this.type = type;
        this.sourceSpan = sourceSpan;
        this.keySpan = keySpan;
        this.valueSpan = valueSpan;
        this.isLiteral = this.type === ParsedPropertyType.LITERAL_ATTR;
        this.isAnimation = this.type === ParsedPropertyType.ANIMATION;
      }
    };
    (function(ParsedPropertyType2) {
      ParsedPropertyType2[ParsedPropertyType2["DEFAULT"] = 0] = "DEFAULT";
      ParsedPropertyType2[ParsedPropertyType2["LITERAL_ATTR"] = 1] = "LITERAL_ATTR";
      ParsedPropertyType2[ParsedPropertyType2["ANIMATION"] = 2] = "ANIMATION";
    })(ParsedPropertyType || (ParsedPropertyType = {}));
    ParsedEvent = class {
      constructor(name, targetOrPhase, type, handler, sourceSpan, handlerSpan, keySpan) {
        this.name = name;
        this.targetOrPhase = targetOrPhase;
        this.type = type;
        this.handler = handler;
        this.sourceSpan = sourceSpan;
        this.handlerSpan = handlerSpan;
        this.keySpan = keySpan;
      }
    };
    ParsedVariable = class {
      constructor(name, value, sourceSpan, keySpan, valueSpan) {
        this.name = name;
        this.value = value;
        this.sourceSpan = sourceSpan;
        this.keySpan = keySpan;
        this.valueSpan = valueSpan;
      }
    };
    BoundElementProperty = class {
      constructor(name, type, securityContext, value, unit, sourceSpan, keySpan, valueSpan) {
        this.name = name;
        this.type = type;
        this.securityContext = securityContext;
        this.value = value;
        this.unit = unit;
        this.sourceSpan = sourceSpan;
        this.keySpan = keySpan;
        this.valueSpan = valueSpan;
      }
    };
  }
});
function isWhitespace(code) {
  return code >= $TAB && code <= $SPACE || code == $NBSP;
}
function isDigit(code) {
  return $0 <= code && code <= $9;
}
function isAsciiLetter(code) {
  return code >= $a && code <= $z || code >= $A && code <= $Z;
}
function isQuote(code) {
  return code === $SQ || code === $DQ || code === $BT;
}
var $EOF;
var $TAB;
var $LF;
var $VTAB;
var $FF;
var $CR;
var $SPACE;
var $BANG;
var $DQ;
var $HASH;
var $$;
var $PERCENT;
var $AMPERSAND;
var $SQ;
var $LPAREN;
var $RPAREN;
var $STAR;
var $PLUS;
var $COMMA;
var $MINUS;
var $PERIOD;
var $SLASH;
var $COLON;
var $SEMICOLON;
var $LT;
var $EQ;
var $GT;
var $QUESTION;
var $0;
var $9;
var $A;
var $E;
var $Z;
var $LBRACKET;
var $BACKSLASH;
var $RBRACKET;
var $CARET;
var $_;
var $a;
var $e;
var $f;
var $n;
var $r;
var $t;
var $u;
var $v;
var $z;
var $LBRACE;
var $BAR;
var $RBRACE;
var $NBSP;
var $BT;
var init_chars = __esm({
  "node_modules/@angular/compiler/esm2015/src/chars.js"() {
    init_define_process();
    $EOF = 0;
    $TAB = 9;
    $LF = 10;
    $VTAB = 11;
    $FF = 12;
    $CR = 13;
    $SPACE = 32;
    $BANG = 33;
    $DQ = 34;
    $HASH = 35;
    $$ = 36;
    $PERCENT = 37;
    $AMPERSAND = 38;
    $SQ = 39;
    $LPAREN = 40;
    $RPAREN = 41;
    $STAR = 42;
    $PLUS = 43;
    $COMMA = 44;
    $MINUS = 45;
    $PERIOD = 46;
    $SLASH = 47;
    $COLON = 58;
    $SEMICOLON = 59;
    $LT = 60;
    $EQ = 61;
    $GT = 62;
    $QUESTION = 63;
    $0 = 48;
    $9 = 57;
    $A = 65;
    $E = 69;
    $Z = 90;
    $LBRACKET = 91;
    $BACKSLASH = 92;
    $RBRACKET = 93;
    $CARET = 94;
    $_ = 95;
    $a = 97;
    $e = 101;
    $f = 102;
    $n = 110;
    $r = 114;
    $t = 116;
    $u = 117;
    $v = 118;
    $z = 122;
    $LBRACE = 123;
    $BAR = 124;
    $RBRACE = 125;
    $NBSP = 160;
    $BT = 96;
  }
});
var lexer_exports = {};
__export(lexer_exports, {
  EOF: () => EOF,
  Lexer: () => Lexer,
  Token: () => Token,
  TokenType: () => TokenType,
  isIdentifier: () => isIdentifier
});
function newCharacterToken(index, end, code) {
  return new Token(index, end, TokenType.Character, code, String.fromCharCode(code));
}
function newIdentifierToken(index, end, text) {
  return new Token(index, end, TokenType.Identifier, 0, text);
}
function newPrivateIdentifierToken(index, end, text) {
  return new Token(index, end, TokenType.PrivateIdentifier, 0, text);
}
function newKeywordToken(index, end, text) {
  return new Token(index, end, TokenType.Keyword, 0, text);
}
function newOperatorToken(index, end, text) {
  return new Token(index, end, TokenType.Operator, 0, text);
}
function newStringToken(index, end, text) {
  return new Token(index, end, TokenType.String, 0, text);
}
function newNumberToken(index, end, n) {
  return new Token(index, end, TokenType.Number, n, "");
}
function newErrorToken(index, end, message) {
  return new Token(index, end, TokenType.Error, 0, message);
}
function isIdentifierStart(code) {
  return $a <= code && code <= $z || $A <= code && code <= $Z || code == $_ || code == $$;
}
function isIdentifier(input) {
  if (input.length == 0)
    return false;
  const scanner = new _Scanner(input);
  if (!isIdentifierStart(scanner.peek))
    return false;
  scanner.advance();
  while (scanner.peek !== $EOF) {
    if (!isIdentifierPart(scanner.peek))
      return false;
    scanner.advance();
  }
  return true;
}
function isIdentifierPart(code) {
  return isAsciiLetter(code) || isDigit(code) || code == $_ || code == $$;
}
function isExponentStart(code) {
  return code == $e || code == $E;
}
function isExponentSign(code) {
  return code == $MINUS || code == $PLUS;
}
function unescape(code) {
  switch (code) {
    case $n:
      return $LF;
    case $f:
      return $FF;
    case $r:
      return $CR;
    case $t:
      return $TAB;
    case $v:
      return $VTAB;
    default:
      return code;
  }
}
function parseIntAutoRadix(text) {
  const result = parseInt(text);
  if (isNaN(result)) {
    throw new Error("Invalid integer literal when parsing " + text);
  }
  return result;
}
var TokenType;
var KEYWORDS;
var Lexer;
var Token;
var EOF;
var _Scanner;
var init_lexer = __esm({
  "node_modules/@angular/compiler/esm2015/src/expression_parser/lexer.js"() {
    init_define_process();
    init_chars();
    (function(TokenType2) {
      TokenType2[TokenType2["Character"] = 0] = "Character";
      TokenType2[TokenType2["Identifier"] = 1] = "Identifier";
      TokenType2[TokenType2["PrivateIdentifier"] = 2] = "PrivateIdentifier";
      TokenType2[TokenType2["Keyword"] = 3] = "Keyword";
      TokenType2[TokenType2["String"] = 4] = "String";
      TokenType2[TokenType2["Operator"] = 5] = "Operator";
      TokenType2[TokenType2["Number"] = 6] = "Number";
      TokenType2[TokenType2["Error"] = 7] = "Error";
    })(TokenType || (TokenType = {}));
    KEYWORDS = ["var", "let", "as", "null", "undefined", "true", "false", "if", "else", "this"];
    Lexer = class {
      tokenize(text) {
        const scanner = new _Scanner(text);
        const tokens = [];
        let token = scanner.scanToken();
        while (token != null) {
          tokens.push(token);
          token = scanner.scanToken();
        }
        return tokens;
      }
    };
    Token = class {
      constructor(index, end, type, numValue, strValue) {
        this.index = index;
        this.end = end;
        this.type = type;
        this.numValue = numValue;
        this.strValue = strValue;
      }
      isCharacter(code) {
        return this.type == TokenType.Character && this.numValue == code;
      }
      isNumber() {
        return this.type == TokenType.Number;
      }
      isString() {
        return this.type == TokenType.String;
      }
      isOperator(operator) {
        return this.type == TokenType.Operator && this.strValue == operator;
      }
      isIdentifier() {
        return this.type == TokenType.Identifier;
      }
      isPrivateIdentifier() {
        return this.type == TokenType.PrivateIdentifier;
      }
      isKeyword() {
        return this.type == TokenType.Keyword;
      }
      isKeywordLet() {
        return this.type == TokenType.Keyword && this.strValue == "let";
      }
      isKeywordAs() {
        return this.type == TokenType.Keyword && this.strValue == "as";
      }
      isKeywordNull() {
        return this.type == TokenType.Keyword && this.strValue == "null";
      }
      isKeywordUndefined() {
        return this.type == TokenType.Keyword && this.strValue == "undefined";
      }
      isKeywordTrue() {
        return this.type == TokenType.Keyword && this.strValue == "true";
      }
      isKeywordFalse() {
        return this.type == TokenType.Keyword && this.strValue == "false";
      }
      isKeywordThis() {
        return this.type == TokenType.Keyword && this.strValue == "this";
      }
      isError() {
        return this.type == TokenType.Error;
      }
      toNumber() {
        return this.type == TokenType.Number ? this.numValue : -1;
      }
      toString() {
        switch (this.type) {
          case TokenType.Character:
          case TokenType.Identifier:
          case TokenType.Keyword:
          case TokenType.Operator:
          case TokenType.PrivateIdentifier:
          case TokenType.String:
          case TokenType.Error:
            return this.strValue;
          case TokenType.Number:
            return this.numValue.toString();
          default:
            return null;
        }
      }
    };
    EOF = new Token(-1, -1, TokenType.Character, 0, "");
    _Scanner = class {
      constructor(input) {
        this.input = input;
        this.peek = 0;
        this.index = -1;
        this.length = input.length;
        this.advance();
      }
      advance() {
        this.peek = ++this.index >= this.length ? $EOF : this.input.charCodeAt(this.index);
      }
      scanToken() {
        const input = this.input, length = this.length;
        let peek = this.peek, index = this.index;
        while (peek <= $SPACE) {
          if (++index >= length) {
            peek = $EOF;
            break;
          } else {
            peek = input.charCodeAt(index);
          }
        }
        this.peek = peek;
        this.index = index;
        if (index >= length) {
          return null;
        }
        if (isIdentifierStart(peek))
          return this.scanIdentifier();
        if (isDigit(peek))
          return this.scanNumber(index);
        const start = index;
        switch (peek) {
          case $PERIOD:
            this.advance();
            return isDigit(this.peek) ? this.scanNumber(start) : newCharacterToken(start, this.index, $PERIOD);
          case $LPAREN:
          case $RPAREN:
          case $LBRACE:
          case $RBRACE:
          case $LBRACKET:
          case $RBRACKET:
          case $COMMA:
          case $COLON:
          case $SEMICOLON:
            return this.scanCharacter(start, peek);
          case $SQ:
          case $DQ:
            return this.scanString();
          case $HASH:
            return this.scanPrivateIdentifier();
          case $PLUS:
          case $MINUS:
          case $STAR:
          case $SLASH:
          case $PERCENT:
          case $CARET:
            return this.scanOperator(start, String.fromCharCode(peek));
          case $QUESTION:
            return this.scanQuestion(start);
          case $LT:
          case $GT:
            return this.scanComplexOperator(start, String.fromCharCode(peek), $EQ, "=");
          case $BANG:
          case $EQ:
            return this.scanComplexOperator(start, String.fromCharCode(peek), $EQ, "=", $EQ, "=");
          case $AMPERSAND:
            return this.scanComplexOperator(start, "&", $AMPERSAND, "&");
          case $BAR:
            return this.scanComplexOperator(start, "|", $BAR, "|");
          case $NBSP:
            while (isWhitespace(this.peek))
              this.advance();
            return this.scanToken();
        }
        this.advance();
        return this.error(`Unexpected character [${String.fromCharCode(peek)}]`, 0);
      }
      scanCharacter(start, code) {
        this.advance();
        return newCharacterToken(start, this.index, code);
      }
      scanOperator(start, str) {
        this.advance();
        return newOperatorToken(start, this.index, str);
      }
      scanComplexOperator(start, one, twoCode, two, threeCode, three) {
        this.advance();
        let str = one;
        if (this.peek == twoCode) {
          this.advance();
          str += two;
        }
        if (threeCode != null && this.peek == threeCode) {
          this.advance();
          str += three;
        }
        return newOperatorToken(start, this.index, str);
      }
      scanIdentifier() {
        const start = this.index;
        this.advance();
        while (isIdentifierPart(this.peek))
          this.advance();
        const str = this.input.substring(start, this.index);
        return KEYWORDS.indexOf(str) > -1 ? newKeywordToken(start, this.index, str) : newIdentifierToken(start, this.index, str);
      }
      scanPrivateIdentifier() {
        const start = this.index;
        this.advance();
        if (!isIdentifierStart(this.peek)) {
          return this.error("Invalid character [#]", -1);
        }
        while (isIdentifierPart(this.peek))
          this.advance();
        const identifierName = this.input.substring(start, this.index);
        return newPrivateIdentifierToken(start, this.index, identifierName);
      }
      scanNumber(start) {
        let simple = this.index === start;
        let hasSeparators = false;
        this.advance();
        while (true) {
          if (isDigit(this.peek)) {
          } else if (this.peek === $_) {
            if (!isDigit(this.input.charCodeAt(this.index - 1)) || !isDigit(this.input.charCodeAt(this.index + 1))) {
              return this.error("Invalid numeric separator", 0);
            }
            hasSeparators = true;
          } else if (this.peek === $PERIOD) {
            simple = false;
          } else if (isExponentStart(this.peek)) {
            this.advance();
            if (isExponentSign(this.peek))
              this.advance();
            if (!isDigit(this.peek))
              return this.error("Invalid exponent", -1);
            simple = false;
          } else {
            break;
          }
          this.advance();
        }
        let str = this.input.substring(start, this.index);
        if (hasSeparators) {
          str = str.replace(/_/g, "");
        }
        const value = simple ? parseIntAutoRadix(str) : parseFloat(str);
        return newNumberToken(start, this.index, value);
      }
      scanString() {
        const start = this.index;
        const quote = this.peek;
        this.advance();
        let buffer = "";
        let marker = this.index;
        const input = this.input;
        while (this.peek != quote) {
          if (this.peek == $BACKSLASH) {
            buffer += input.substring(marker, this.index);
            this.advance();
            let unescapedCode;
            this.peek = this.peek;
            if (this.peek == $u) {
              const hex = input.substring(this.index + 1, this.index + 5);
              if (/^[0-9a-f]+$/i.test(hex)) {
                unescapedCode = parseInt(hex, 16);
              } else {
                return this.error(`Invalid unicode escape [\\u${hex}]`, 0);
              }
              for (let i = 0; i < 5; i++) {
                this.advance();
              }
            } else {
              unescapedCode = unescape(this.peek);
              this.advance();
            }
            buffer += String.fromCharCode(unescapedCode);
            marker = this.index;
          } else if (this.peek == $EOF) {
            return this.error("Unterminated quote", 0);
          } else {
            this.advance();
          }
        }
        const last = input.substring(marker, this.index);
        this.advance();
        return newStringToken(start, this.index, buffer + last);
      }
      scanQuestion(start) {
        this.advance();
        let str = "?";
        if (this.peek === $QUESTION || this.peek === $PERIOD) {
          str += this.peek === $PERIOD ? "." : "?";
          this.advance();
        }
        return newOperatorToken(start, this.index, str);
      }
      error(message, offset) {
        const position = this.index + offset;
        return newErrorToken(position, this.index, `Lexer Error: ${message} at column ${position} in expression [${this.input}]`);
      }
    };
  }
});
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
var UNUSABLE_INTERPOLATION_REGEXPS;
var init_assertions = __esm({
  "node_modules/@angular/compiler/esm2015/src/assertions.js"() {
    init_define_process();
    UNUSABLE_INTERPOLATION_REGEXPS = [/^\s*$/, /[<>]/, /^[{}]$/, /&(#|[a-z])/i, /^\/\//];
  }
});
var InterpolationConfig;
var DEFAULT_INTERPOLATION_CONFIG;
var init_interpolation_config = __esm({
  "node_modules/@angular/compiler/esm2015/src/ml_parser/interpolation_config.js"() {
    init_define_process();
    init_assertions();
    InterpolationConfig = class {
      constructor(start, end) {
        this.start = start;
        this.end = end;
      }
      static fromArray(markers) {
        if (!markers) {
          return DEFAULT_INTERPOLATION_CONFIG;
        }
        assertInterpolationSymbols("interpolation", markers);
        return new InterpolationConfig(markers[0], markers[1]);
      }
    };
    DEFAULT_INTERPOLATION_CONFIG = new InterpolationConfig("{{", "}}");
  }
});
var parser_exports = {};
__export(parser_exports, {
  IvyParser: () => IvyParser,
  Parser: () => Parser,
  SplitInterpolation: () => SplitInterpolation,
  TemplateBindingParseResult: () => TemplateBindingParseResult,
  _ParseAST: () => _ParseAST
});
var SplitInterpolation;
var TemplateBindingParseResult;
var Parser;
var IvyParser;
var ParseContextFlags;
var _ParseAST;
var SimpleExpressionChecker;
var IvySimpleExpressionChecker;
var init_parser = __esm({
  "node_modules/@angular/compiler/esm2015/src/expression_parser/parser.js"() {
    init_define_process();
    init_chars();
    init_interpolation_config();
    init_ast();
    init_lexer();
    SplitInterpolation = class {
      constructor(strings, expressions, offsets) {
        this.strings = strings;
        this.expressions = expressions;
        this.offsets = offsets;
      }
    };
    TemplateBindingParseResult = class {
      constructor(templateBindings, warnings, errors) {
        this.templateBindings = templateBindings;
        this.warnings = warnings;
        this.errors = errors;
      }
    };
    Parser = class {
      constructor(_lexer) {
        this._lexer = _lexer;
        this.errors = [];
        this.simpleExpressionChecker = SimpleExpressionChecker;
      }
      parseAction(input, location, absoluteOffset) {
        let interpolationConfig = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : DEFAULT_INTERPOLATION_CONFIG;
        this._checkNoInterpolation(input, location, interpolationConfig);
        const sourceToLex = this._stripComments(input);
        const tokens = this._lexer.tokenize(this._stripComments(input));
        const ast = new _ParseAST(input, location, absoluteOffset, tokens, sourceToLex.length, true, this.errors, input.length - sourceToLex.length).parseChain();
        return new ASTWithSource(ast, input, location, absoluteOffset, this.errors);
      }
      parseBinding(input, location, absoluteOffset) {
        let interpolationConfig = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : DEFAULT_INTERPOLATION_CONFIG;
        const ast = this._parseBindingAst(input, location, absoluteOffset, interpolationConfig);
        return new ASTWithSource(ast, input, location, absoluteOffset, this.errors);
      }
      checkSimpleExpression(ast) {
        const checker = new this.simpleExpressionChecker();
        ast.visit(checker);
        return checker.errors;
      }
      parseSimpleBinding(input, location, absoluteOffset) {
        let interpolationConfig = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : DEFAULT_INTERPOLATION_CONFIG;
        const ast = this._parseBindingAst(input, location, absoluteOffset, interpolationConfig);
        const errors = this.checkSimpleExpression(ast);
        if (errors.length > 0) {
          this._reportError(`Host binding expression cannot contain ${errors.join(" ")}`, input, location);
        }
        return new ASTWithSource(ast, input, location, absoluteOffset, this.errors);
      }
      _reportError(message, input, errLocation, ctxLocation) {
        this.errors.push(new ParserError(message, input, errLocation, ctxLocation));
      }
      _parseBindingAst(input, location, absoluteOffset, interpolationConfig) {
        const quote = this._parseQuote(input, location, absoluteOffset);
        if (quote != null) {
          return quote;
        }
        this._checkNoInterpolation(input, location, interpolationConfig);
        const sourceToLex = this._stripComments(input);
        const tokens = this._lexer.tokenize(sourceToLex);
        return new _ParseAST(input, location, absoluteOffset, tokens, sourceToLex.length, false, this.errors, input.length - sourceToLex.length).parseChain();
      }
      _parseQuote(input, location, absoluteOffset) {
        if (input == null)
          return null;
        const prefixSeparatorIndex = input.indexOf(":");
        if (prefixSeparatorIndex == -1)
          return null;
        const prefix = input.substring(0, prefixSeparatorIndex).trim();
        if (!isIdentifier(prefix))
          return null;
        const uninterpretedExpression = input.substring(prefixSeparatorIndex + 1);
        const span = new ParseSpan(0, input.length);
        return new Quote(span, span.toAbsolute(absoluteOffset), prefix, uninterpretedExpression, location);
      }
      parseTemplateBindings(templateKey, templateValue, templateUrl, absoluteKeyOffset, absoluteValueOffset) {
        const tokens = this._lexer.tokenize(templateValue);
        const parser = new _ParseAST(templateValue, templateUrl, absoluteValueOffset, tokens, templateValue.length, false, this.errors, 0);
        return parser.parseTemplateBindings({
          source: templateKey,
          span: new AbsoluteSourceSpan(absoluteKeyOffset, absoluteKeyOffset + templateKey.length)
        });
      }
      parseInterpolation(input, location, absoluteOffset) {
        let interpolationConfig = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : DEFAULT_INTERPOLATION_CONFIG;
        const {
          strings,
          expressions,
          offsets
        } = this.splitInterpolation(input, location, interpolationConfig);
        if (expressions.length === 0)
          return null;
        const expressionNodes = [];
        for (let i = 0; i < expressions.length; ++i) {
          const expressionText = expressions[i].text;
          const sourceToLex = this._stripComments(expressionText);
          const tokens = this._lexer.tokenize(sourceToLex);
          const ast = new _ParseAST(input, location, absoluteOffset, tokens, sourceToLex.length, false, this.errors, offsets[i] + (expressionText.length - sourceToLex.length)).parseChain();
          expressionNodes.push(ast);
        }
        return this.createInterpolationAst(strings.map((s) => s.text), expressionNodes, input, location, absoluteOffset);
      }
      parseInterpolationExpression(expression, location, absoluteOffset) {
        const sourceToLex = this._stripComments(expression);
        const tokens = this._lexer.tokenize(sourceToLex);
        const ast = new _ParseAST(expression, location, absoluteOffset, tokens, sourceToLex.length, false, this.errors, 0).parseChain();
        const strings = ["", ""];
        return this.createInterpolationAst(strings, [ast], expression, location, absoluteOffset);
      }
      createInterpolationAst(strings, expressions, input, location, absoluteOffset) {
        const span = new ParseSpan(0, input.length);
        const interpolation = new Interpolation(span, span.toAbsolute(absoluteOffset), strings, expressions);
        return new ASTWithSource(interpolation, input, location, absoluteOffset, this.errors);
      }
      splitInterpolation(input, location) {
        let interpolationConfig = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : DEFAULT_INTERPOLATION_CONFIG;
        const strings = [];
        const expressions = [];
        const offsets = [];
        let i = 0;
        let atInterpolation = false;
        let extendLastString = false;
        let {
          start: interpStart,
          end: interpEnd
        } = interpolationConfig;
        while (i < input.length) {
          if (!atInterpolation) {
            const start = i;
            i = input.indexOf(interpStart, i);
            if (i === -1) {
              i = input.length;
            }
            const text = input.substring(start, i);
            strings.push({
              text,
              start,
              end: i
            });
            atInterpolation = true;
          } else {
            const fullStart = i;
            const exprStart = fullStart + interpStart.length;
            const exprEnd = this._getInterpolationEndIndex(input, interpEnd, exprStart);
            if (exprEnd === -1) {
              atInterpolation = false;
              extendLastString = true;
              break;
            }
            const fullEnd = exprEnd + interpEnd.length;
            const text = input.substring(exprStart, exprEnd);
            if (text.trim().length === 0) {
              this._reportError("Blank expressions are not allowed in interpolated strings", input, `at column ${i} in`, location);
            }
            expressions.push({
              text,
              start: fullStart,
              end: fullEnd
            });
            offsets.push(exprStart);
            i = fullEnd;
            atInterpolation = false;
          }
        }
        if (!atInterpolation) {
          if (extendLastString) {
            const piece = strings[strings.length - 1];
            piece.text += input.substring(i);
            piece.end = input.length;
          } else {
            strings.push({
              text: input.substring(i),
              start: i,
              end: input.length
            });
          }
        }
        return new SplitInterpolation(strings, expressions, offsets);
      }
      wrapLiteralPrimitive(input, location, absoluteOffset) {
        const span = new ParseSpan(0, input == null ? 0 : input.length);
        return new ASTWithSource(new LiteralPrimitive(span, span.toAbsolute(absoluteOffset), input), input, location, absoluteOffset, this.errors);
      }
      _stripComments(input) {
        const i = this._commentStart(input);
        return i != null ? input.substring(0, i).trim() : input;
      }
      _commentStart(input) {
        let outerQuote = null;
        for (let i = 0; i < input.length - 1; i++) {
          const char = input.charCodeAt(i);
          const nextChar = input.charCodeAt(i + 1);
          if (char === $SLASH && nextChar == $SLASH && outerQuote == null)
            return i;
          if (outerQuote === char) {
            outerQuote = null;
          } else if (outerQuote == null && isQuote(char)) {
            outerQuote = char;
          }
        }
        return null;
      }
      _checkNoInterpolation(input, location, _ref) {
        let {
          start,
          end
        } = _ref;
        let startIndex = -1;
        let endIndex = -1;
        for (const charIndex of this._forEachUnquotedChar(input, 0)) {
          if (startIndex === -1) {
            if (input.startsWith(start)) {
              startIndex = charIndex;
            }
          } else {
            endIndex = this._getInterpolationEndIndex(input, end, charIndex);
            if (endIndex > -1) {
              break;
            }
          }
        }
        if (startIndex > -1 && endIndex > -1) {
          this._reportError(`Got interpolation (${start}${end}) where expression was expected`, input, `at column ${startIndex} in`, location);
        }
      }
      _getInterpolationEndIndex(input, expressionEnd, start) {
        for (const charIndex of this._forEachUnquotedChar(input, start)) {
          if (input.startsWith(expressionEnd, charIndex)) {
            return charIndex;
          }
          if (input.startsWith("//", charIndex)) {
            return input.indexOf(expressionEnd, charIndex);
          }
        }
        return -1;
      }
      *_forEachUnquotedChar(input, start) {
        let currentQuote = null;
        let escapeCount = 0;
        for (let i = start; i < input.length; i++) {
          const char = input[i];
          if (isQuote(input.charCodeAt(i)) && (currentQuote === null || currentQuote === char) && escapeCount % 2 === 0) {
            currentQuote = currentQuote === null ? char : null;
          } else if (currentQuote === null) {
            yield i;
          }
          escapeCount = char === "\\" ? escapeCount + 1 : 0;
        }
      }
    };
    IvyParser = class extends Parser {
      constructor() {
        super(...arguments);
        this.simpleExpressionChecker = IvySimpleExpressionChecker;
      }
    };
    (function(ParseContextFlags2) {
      ParseContextFlags2[ParseContextFlags2["None"] = 0] = "None";
      ParseContextFlags2[ParseContextFlags2["Writable"] = 1] = "Writable";
    })(ParseContextFlags || (ParseContextFlags = {}));
    _ParseAST = class {
      constructor(input, location, absoluteOffset, tokens, inputLength, parseAction, errors, offset) {
        this.input = input;
        this.location = location;
        this.absoluteOffset = absoluteOffset;
        this.tokens = tokens;
        this.inputLength = inputLength;
        this.parseAction = parseAction;
        this.errors = errors;
        this.offset = offset;
        this.rparensExpected = 0;
        this.rbracketsExpected = 0;
        this.rbracesExpected = 0;
        this.context = ParseContextFlags.None;
        this.sourceSpanCache = /* @__PURE__ */ new Map();
        this.index = 0;
      }
      peek(offset) {
        const i = this.index + offset;
        return i < this.tokens.length ? this.tokens[i] : EOF;
      }
      get next() {
        return this.peek(0);
      }
      get atEOF() {
        return this.index >= this.tokens.length;
      }
      get inputIndex() {
        return this.atEOF ? this.currentEndIndex : this.next.index + this.offset;
      }
      get currentEndIndex() {
        if (this.index > 0) {
          const curToken = this.peek(-1);
          return curToken.end + this.offset;
        }
        if (this.tokens.length === 0) {
          return this.inputLength + this.offset;
        }
        return this.next.index + this.offset;
      }
      get currentAbsoluteOffset() {
        return this.absoluteOffset + this.inputIndex;
      }
      span(start, artificialEndIndex) {
        let endIndex = this.currentEndIndex;
        if (artificialEndIndex !== void 0 && artificialEndIndex > this.currentEndIndex) {
          endIndex = artificialEndIndex;
        }
        if (start > endIndex) {
          const tmp = endIndex;
          endIndex = start;
          start = tmp;
        }
        return new ParseSpan(start, endIndex);
      }
      sourceSpan(start, artificialEndIndex) {
        const serial = `${start}@${this.inputIndex}:${artificialEndIndex}`;
        if (!this.sourceSpanCache.has(serial)) {
          this.sourceSpanCache.set(serial, this.span(start, artificialEndIndex).toAbsolute(this.absoluteOffset));
        }
        return this.sourceSpanCache.get(serial);
      }
      advance() {
        this.index++;
      }
      withContext(context, cb) {
        this.context |= context;
        const ret = cb();
        this.context ^= context;
        return ret;
      }
      consumeOptionalCharacter(code) {
        if (this.next.isCharacter(code)) {
          this.advance();
          return true;
        } else {
          return false;
        }
      }
      peekKeywordLet() {
        return this.next.isKeywordLet();
      }
      peekKeywordAs() {
        return this.next.isKeywordAs();
      }
      expectCharacter(code) {
        if (this.consumeOptionalCharacter(code))
          return;
        this.error(`Missing expected ${String.fromCharCode(code)}`);
      }
      consumeOptionalOperator(op) {
        if (this.next.isOperator(op)) {
          this.advance();
          return true;
        } else {
          return false;
        }
      }
      expectOperator(operator) {
        if (this.consumeOptionalOperator(operator))
          return;
        this.error(`Missing expected operator ${operator}`);
      }
      prettyPrintToken(tok) {
        return tok === EOF ? "end of input" : `token ${tok}`;
      }
      expectIdentifierOrKeyword() {
        const n = this.next;
        if (!n.isIdentifier() && !n.isKeyword()) {
          if (n.isPrivateIdentifier()) {
            this._reportErrorForPrivateIdentifier(n, "expected identifier or keyword");
          } else {
            this.error(`Unexpected ${this.prettyPrintToken(n)}, expected identifier or keyword`);
          }
          return null;
        }
        this.advance();
        return n.toString();
      }
      expectIdentifierOrKeywordOrString() {
        const n = this.next;
        if (!n.isIdentifier() && !n.isKeyword() && !n.isString()) {
          if (n.isPrivateIdentifier()) {
            this._reportErrorForPrivateIdentifier(n, "expected identifier, keyword or string");
          } else {
            this.error(`Unexpected ${this.prettyPrintToken(n)}, expected identifier, keyword, or string`);
          }
          return "";
        }
        this.advance();
        return n.toString();
      }
      parseChain() {
        const exprs = [];
        const start = this.inputIndex;
        while (this.index < this.tokens.length) {
          const expr = this.parsePipe();
          exprs.push(expr);
          if (this.consumeOptionalCharacter($SEMICOLON)) {
            if (!this.parseAction) {
              this.error("Binding expression cannot contain chained expression");
            }
            while (this.consumeOptionalCharacter($SEMICOLON)) {
            }
          } else if (this.index < this.tokens.length) {
            this.error(`Unexpected token '${this.next}'`);
          }
        }
        if (exprs.length == 0) {
          const artificialStart = this.offset;
          const artificialEnd = this.offset + this.inputLength;
          return new EmptyExpr(this.span(artificialStart, artificialEnd), this.sourceSpan(artificialStart, artificialEnd));
        }
        if (exprs.length == 1)
          return exprs[0];
        return new Chain(this.span(start), this.sourceSpan(start), exprs);
      }
      parsePipe() {
        const start = this.inputIndex;
        let result = this.parseExpression();
        if (this.consumeOptionalOperator("|")) {
          if (this.parseAction) {
            this.error("Cannot have a pipe in an action expression");
          }
          do {
            const nameStart = this.inputIndex;
            let nameId = this.expectIdentifierOrKeyword();
            let nameSpan;
            let fullSpanEnd = void 0;
            if (nameId !== null) {
              nameSpan = this.sourceSpan(nameStart);
            } else {
              nameId = "";
              fullSpanEnd = this.next.index !== -1 ? this.next.index : this.inputLength + this.offset;
              nameSpan = new ParseSpan(fullSpanEnd, fullSpanEnd).toAbsolute(this.absoluteOffset);
            }
            const args = [];
            while (this.consumeOptionalCharacter($COLON)) {
              args.push(this.parseExpression());
            }
            result = new BindingPipe(this.span(start), this.sourceSpan(start, fullSpanEnd), result, nameId, args, nameSpan);
          } while (this.consumeOptionalOperator("|"));
        }
        return result;
      }
      parseExpression() {
        return this.parseConditional();
      }
      parseConditional() {
        const start = this.inputIndex;
        const result = this.parseLogicalOr();
        if (this.consumeOptionalOperator("?")) {
          const yes = this.parsePipe();
          let no;
          if (!this.consumeOptionalCharacter($COLON)) {
            const end = this.inputIndex;
            const expression = this.input.substring(start, end);
            this.error(`Conditional expression ${expression} requires all 3 expressions`);
            no = new EmptyExpr(this.span(start), this.sourceSpan(start));
          } else {
            no = this.parsePipe();
          }
          return new Conditional(this.span(start), this.sourceSpan(start), result, yes, no);
        } else {
          return result;
        }
      }
      parseLogicalOr() {
        const start = this.inputIndex;
        let result = this.parseLogicalAnd();
        while (this.consumeOptionalOperator("||")) {
          const right = this.parseLogicalAnd();
          result = new Binary(this.span(start), this.sourceSpan(start), "||", result, right);
        }
        return result;
      }
      parseLogicalAnd() {
        const start = this.inputIndex;
        let result = this.parseNullishCoalescing();
        while (this.consumeOptionalOperator("&&")) {
          const right = this.parseNullishCoalescing();
          result = new Binary(this.span(start), this.sourceSpan(start), "&&", result, right);
        }
        return result;
      }
      parseNullishCoalescing() {
        const start = this.inputIndex;
        let result = this.parseEquality();
        while (this.consumeOptionalOperator("??")) {
          const right = this.parseEquality();
          result = new Binary(this.span(start), this.sourceSpan(start), "??", result, right);
        }
        return result;
      }
      parseEquality() {
        const start = this.inputIndex;
        let result = this.parseRelational();
        while (this.next.type == TokenType.Operator) {
          const operator = this.next.strValue;
          switch (operator) {
            case "==":
            case "===":
            case "!=":
            case "!==":
              this.advance();
              const right = this.parseRelational();
              result = new Binary(this.span(start), this.sourceSpan(start), operator, result, right);
              continue;
          }
          break;
        }
        return result;
      }
      parseRelational() {
        const start = this.inputIndex;
        let result = this.parseAdditive();
        while (this.next.type == TokenType.Operator) {
          const operator = this.next.strValue;
          switch (operator) {
            case "<":
            case ">":
            case "<=":
            case ">=":
              this.advance();
              const right = this.parseAdditive();
              result = new Binary(this.span(start), this.sourceSpan(start), operator, result, right);
              continue;
          }
          break;
        }
        return result;
      }
      parseAdditive() {
        const start = this.inputIndex;
        let result = this.parseMultiplicative();
        while (this.next.type == TokenType.Operator) {
          const operator = this.next.strValue;
          switch (operator) {
            case "+":
            case "-":
              this.advance();
              let right = this.parseMultiplicative();
              result = new Binary(this.span(start), this.sourceSpan(start), operator, result, right);
              continue;
          }
          break;
        }
        return result;
      }
      parseMultiplicative() {
        const start = this.inputIndex;
        let result = this.parsePrefix();
        while (this.next.type == TokenType.Operator) {
          const operator = this.next.strValue;
          switch (operator) {
            case "*":
            case "%":
            case "/":
              this.advance();
              let right = this.parsePrefix();
              result = new Binary(this.span(start), this.sourceSpan(start), operator, result, right);
              continue;
          }
          break;
        }
        return result;
      }
      parsePrefix() {
        if (this.next.type == TokenType.Operator) {
          const start = this.inputIndex;
          const operator = this.next.strValue;
          let result;
          switch (operator) {
            case "+":
              this.advance();
              result = this.parsePrefix();
              return Unary.createPlus(this.span(start), this.sourceSpan(start), result);
            case "-":
              this.advance();
              result = this.parsePrefix();
              return Unary.createMinus(this.span(start), this.sourceSpan(start), result);
            case "!":
              this.advance();
              result = this.parsePrefix();
              return new PrefixNot(this.span(start), this.sourceSpan(start), result);
          }
        }
        return this.parseCallChain();
      }
      parseCallChain() {
        const start = this.inputIndex;
        let result = this.parsePrimary();
        while (true) {
          if (this.consumeOptionalCharacter($PERIOD)) {
            result = this.parseAccessMemberOrMethodCall(result, start, false);
          } else if (this.consumeOptionalOperator("?.")) {
            result = this.consumeOptionalCharacter($LBRACKET) ? this.parseKeyedReadOrWrite(result, start, true) : this.parseAccessMemberOrMethodCall(result, start, true);
          } else if (this.consumeOptionalCharacter($LBRACKET)) {
            result = this.parseKeyedReadOrWrite(result, start, false);
          } else if (this.consumeOptionalCharacter($LPAREN)) {
            this.rparensExpected++;
            const args = this.parseCallArguments();
            this.rparensExpected--;
            this.expectCharacter($RPAREN);
            result = new FunctionCall(this.span(start), this.sourceSpan(start), result, args);
          } else if (this.consumeOptionalOperator("!")) {
            result = new NonNullAssert(this.span(start), this.sourceSpan(start), result);
          } else {
            return result;
          }
        }
      }
      parsePrimary() {
        const start = this.inputIndex;
        if (this.consumeOptionalCharacter($LPAREN)) {
          this.rparensExpected++;
          const result = this.parsePipe();
          this.rparensExpected--;
          this.expectCharacter($RPAREN);
          return result;
        } else if (this.next.isKeywordNull()) {
          this.advance();
          return new LiteralPrimitive(this.span(start), this.sourceSpan(start), null);
        } else if (this.next.isKeywordUndefined()) {
          this.advance();
          return new LiteralPrimitive(this.span(start), this.sourceSpan(start), void 0);
        } else if (this.next.isKeywordTrue()) {
          this.advance();
          return new LiteralPrimitive(this.span(start), this.sourceSpan(start), true);
        } else if (this.next.isKeywordFalse()) {
          this.advance();
          return new LiteralPrimitive(this.span(start), this.sourceSpan(start), false);
        } else if (this.next.isKeywordThis()) {
          this.advance();
          return new ThisReceiver(this.span(start), this.sourceSpan(start));
        } else if (this.consumeOptionalCharacter($LBRACKET)) {
          this.rbracketsExpected++;
          const elements = this.parseExpressionList($RBRACKET);
          this.rbracketsExpected--;
          this.expectCharacter($RBRACKET);
          return new LiteralArray(this.span(start), this.sourceSpan(start), elements);
        } else if (this.next.isCharacter($LBRACE)) {
          return this.parseLiteralMap();
        } else if (this.next.isIdentifier()) {
          return this.parseAccessMemberOrMethodCall(new ImplicitReceiver(this.span(start), this.sourceSpan(start)), start, false);
        } else if (this.next.isNumber()) {
          const value = this.next.toNumber();
          this.advance();
          return new LiteralPrimitive(this.span(start), this.sourceSpan(start), value);
        } else if (this.next.isString()) {
          const literalValue = this.next.toString();
          this.advance();
          return new LiteralPrimitive(this.span(start), this.sourceSpan(start), literalValue);
        } else if (this.next.isPrivateIdentifier()) {
          this._reportErrorForPrivateIdentifier(this.next, null);
          return new EmptyExpr(this.span(start), this.sourceSpan(start));
        } else if (this.index >= this.tokens.length) {
          this.error(`Unexpected end of expression: ${this.input}`);
          return new EmptyExpr(this.span(start), this.sourceSpan(start));
        } else {
          this.error(`Unexpected token ${this.next}`);
          return new EmptyExpr(this.span(start), this.sourceSpan(start));
        }
      }
      parseExpressionList(terminator) {
        const result = [];
        do {
          if (!this.next.isCharacter(terminator)) {
            result.push(this.parsePipe());
          } else {
            break;
          }
        } while (this.consumeOptionalCharacter($COMMA));
        return result;
      }
      parseLiteralMap() {
        const keys = [];
        const values = [];
        const start = this.inputIndex;
        this.expectCharacter($LBRACE);
        if (!this.consumeOptionalCharacter($RBRACE)) {
          this.rbracesExpected++;
          do {
            const keyStart = this.inputIndex;
            const quoted = this.next.isString();
            const key = this.expectIdentifierOrKeywordOrString();
            keys.push({
              key,
              quoted
            });
            if (quoted) {
              this.expectCharacter($COLON);
              values.push(this.parsePipe());
            } else if (this.consumeOptionalCharacter($COLON)) {
              values.push(this.parsePipe());
            } else {
              const span = this.span(keyStart);
              const sourceSpan = this.sourceSpan(keyStart);
              values.push(new PropertyRead(span, sourceSpan, sourceSpan, new ImplicitReceiver(span, sourceSpan), key));
            }
          } while (this.consumeOptionalCharacter($COMMA));
          this.rbracesExpected--;
          this.expectCharacter($RBRACE);
        }
        return new LiteralMap(this.span(start), this.sourceSpan(start), keys, values);
      }
      parseAccessMemberOrMethodCall(receiver, start, isSafe) {
        const nameStart = this.inputIndex;
        const id = this.withContext(ParseContextFlags.Writable, () => {
          var _a;
          const id2 = (_a = this.expectIdentifierOrKeyword()) !== null && _a !== void 0 ? _a : "";
          if (id2.length === 0) {
            this.error(`Expected identifier for property access`, receiver.span.end);
          }
          return id2;
        });
        const nameSpan = this.sourceSpan(nameStart);
        if (this.consumeOptionalCharacter($LPAREN)) {
          const argumentStart = this.inputIndex;
          this.rparensExpected++;
          const args = this.parseCallArguments();
          const argumentSpan = this.span(argumentStart, this.inputIndex).toAbsolute(this.absoluteOffset);
          this.expectCharacter($RPAREN);
          this.rparensExpected--;
          const span = this.span(start);
          const sourceSpan = this.sourceSpan(start);
          return isSafe ? new SafeMethodCall(span, sourceSpan, nameSpan, receiver, id, args, argumentSpan) : new MethodCall(span, sourceSpan, nameSpan, receiver, id, args, argumentSpan);
        } else {
          if (isSafe) {
            if (this.consumeOptionalOperator("=")) {
              this.error("The '?.' operator cannot be used in the assignment");
              return new EmptyExpr(this.span(start), this.sourceSpan(start));
            } else {
              return new SafePropertyRead(this.span(start), this.sourceSpan(start), nameSpan, receiver, id);
            }
          } else {
            if (this.consumeOptionalOperator("=")) {
              if (!this.parseAction) {
                this.error("Bindings cannot contain assignments");
                return new EmptyExpr(this.span(start), this.sourceSpan(start));
              }
              const value = this.parseConditional();
              return new PropertyWrite(this.span(start), this.sourceSpan(start), nameSpan, receiver, id, value);
            } else {
              return new PropertyRead(this.span(start), this.sourceSpan(start), nameSpan, receiver, id);
            }
          }
        }
      }
      parseCallArguments() {
        if (this.next.isCharacter($RPAREN))
          return [];
        const positionals = [];
        do {
          positionals.push(this.parsePipe());
        } while (this.consumeOptionalCharacter($COMMA));
        return positionals;
      }
      expectTemplateBindingKey() {
        let result = "";
        let operatorFound = false;
        const start = this.currentAbsoluteOffset;
        do {
          result += this.expectIdentifierOrKeywordOrString();
          operatorFound = this.consumeOptionalOperator("-");
          if (operatorFound) {
            result += "-";
          }
        } while (operatorFound);
        return {
          source: result,
          span: new AbsoluteSourceSpan(start, start + result.length)
        };
      }
      parseTemplateBindings(templateKey) {
        const bindings = [];
        bindings.push(...this.parseDirectiveKeywordBindings(templateKey));
        while (this.index < this.tokens.length) {
          const letBinding = this.parseLetBinding();
          if (letBinding) {
            bindings.push(letBinding);
          } else {
            const key = this.expectTemplateBindingKey();
            const binding = this.parseAsBinding(key);
            if (binding) {
              bindings.push(binding);
            } else {
              key.source = templateKey.source + key.source.charAt(0).toUpperCase() + key.source.substring(1);
              bindings.push(...this.parseDirectiveKeywordBindings(key));
            }
          }
          this.consumeStatementTerminator();
        }
        return new TemplateBindingParseResult(bindings, [], this.errors);
      }
      parseKeyedReadOrWrite(receiver, start, isSafe) {
        return this.withContext(ParseContextFlags.Writable, () => {
          this.rbracketsExpected++;
          const key = this.parsePipe();
          if (key instanceof EmptyExpr) {
            this.error(`Key access cannot be empty`);
          }
          this.rbracketsExpected--;
          this.expectCharacter($RBRACKET);
          if (this.consumeOptionalOperator("=")) {
            if (isSafe) {
              this.error("The '?.' operator cannot be used in the assignment");
            } else {
              const value = this.parseConditional();
              return new KeyedWrite(this.span(start), this.sourceSpan(start), receiver, key, value);
            }
          } else {
            return isSafe ? new SafeKeyedRead(this.span(start), this.sourceSpan(start), receiver, key) : new KeyedRead(this.span(start), this.sourceSpan(start), receiver, key);
          }
          return new EmptyExpr(this.span(start), this.sourceSpan(start));
        });
      }
      parseDirectiveKeywordBindings(key) {
        const bindings = [];
        this.consumeOptionalCharacter($COLON);
        const value = this.getDirectiveBoundTarget();
        let spanEnd = this.currentAbsoluteOffset;
        const asBinding = this.parseAsBinding(key);
        if (!asBinding) {
          this.consumeStatementTerminator();
          spanEnd = this.currentAbsoluteOffset;
        }
        const sourceSpan = new AbsoluteSourceSpan(key.span.start, spanEnd);
        bindings.push(new ExpressionBinding(sourceSpan, key, value));
        if (asBinding) {
          bindings.push(asBinding);
        }
        return bindings;
      }
      getDirectiveBoundTarget() {
        if (this.next === EOF || this.peekKeywordAs() || this.peekKeywordLet()) {
          return null;
        }
        const ast = this.parsePipe();
        const {
          start,
          end
        } = ast.span;
        const value = this.input.substring(start, end);
        return new ASTWithSource(ast, value, this.location, this.absoluteOffset + start, this.errors);
      }
      parseAsBinding(value) {
        if (!this.peekKeywordAs()) {
          return null;
        }
        this.advance();
        const key = this.expectTemplateBindingKey();
        this.consumeStatementTerminator();
        const sourceSpan = new AbsoluteSourceSpan(value.span.start, this.currentAbsoluteOffset);
        return new VariableBinding(sourceSpan, key, value);
      }
      parseLetBinding() {
        if (!this.peekKeywordLet()) {
          return null;
        }
        const spanStart = this.currentAbsoluteOffset;
        this.advance();
        const key = this.expectTemplateBindingKey();
        let value = null;
        if (this.consumeOptionalOperator("=")) {
          value = this.expectTemplateBindingKey();
        }
        this.consumeStatementTerminator();
        const sourceSpan = new AbsoluteSourceSpan(spanStart, this.currentAbsoluteOffset);
        return new VariableBinding(sourceSpan, key, value);
      }
      consumeStatementTerminator() {
        this.consumeOptionalCharacter($SEMICOLON) || this.consumeOptionalCharacter($COMMA);
      }
      error(message) {
        let index = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        this.errors.push(new ParserError(message, this.input, this.locationText(index), this.location));
        this.skip();
      }
      locationText() {
        let index = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
        if (index == null)
          index = this.index;
        return index < this.tokens.length ? `at column ${this.tokens[index].index + 1} in` : `at the end of the expression`;
      }
      _reportErrorForPrivateIdentifier(token, extraMessage) {
        let errorMessage = `Private identifiers are not supported. Unexpected private identifier: ${token}`;
        if (extraMessage !== null) {
          errorMessage += `, ${extraMessage}`;
        }
        this.error(errorMessage);
      }
      skip() {
        let n = this.next;
        while (this.index < this.tokens.length && !n.isCharacter($SEMICOLON) && !n.isOperator("|") && (this.rparensExpected <= 0 || !n.isCharacter($RPAREN)) && (this.rbracesExpected <= 0 || !n.isCharacter($RBRACE)) && (this.rbracketsExpected <= 0 || !n.isCharacter($RBRACKET)) && (!(this.context & ParseContextFlags.Writable) || !n.isOperator("="))) {
          if (this.next.isError()) {
            this.errors.push(new ParserError(this.next.toString(), this.input, this.locationText(), this.location));
          }
          this.advance();
          n = this.next;
        }
      }
    };
    SimpleExpressionChecker = class {
      constructor() {
        this.errors = [];
      }
      visitImplicitReceiver(ast, context) {
      }
      visitThisReceiver(ast, context) {
      }
      visitInterpolation(ast, context) {
      }
      visitLiteralPrimitive(ast, context) {
      }
      visitPropertyRead(ast, context) {
      }
      visitPropertyWrite(ast, context) {
      }
      visitSafePropertyRead(ast, context) {
      }
      visitMethodCall(ast, context) {
      }
      visitSafeMethodCall(ast, context) {
      }
      visitFunctionCall(ast, context) {
      }
      visitLiteralArray(ast, context) {
        this.visitAll(ast.expressions, context);
      }
      visitLiteralMap(ast, context) {
        this.visitAll(ast.values, context);
      }
      visitUnary(ast, context) {
      }
      visitBinary(ast, context) {
      }
      visitPrefixNot(ast, context) {
      }
      visitNonNullAssert(ast, context) {
      }
      visitConditional(ast, context) {
      }
      visitPipe(ast, context) {
        this.errors.push("pipes");
      }
      visitKeyedRead(ast, context) {
      }
      visitKeyedWrite(ast, context) {
      }
      visitAll(asts, context) {
        return asts.map((node) => node.visit(this, context));
      }
      visitChain(ast, context) {
      }
      visitQuote(ast, context) {
      }
      visitSafeKeyedRead(ast, context) {
      }
    };
    IvySimpleExpressionChecker = class extends RecursiveAstVisitor {
      constructor() {
        super(...arguments);
        this.errors = [];
      }
      visitPipe() {
        this.errors.push("pipes");
      }
    };
  }
});
var require_utils = __commonJS({
  "node_modules/angular-estree-parser/lib/utils.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.getLast = exports.toLowerCamelCase = exports.findBackChar = exports.findFrontChar = exports.fitSpans = exports.getNgType = exports.parseNgInterpolation = exports.parseNgTemplateBindings = exports.parseNgAction = exports.parseNgSimpleBinding = exports.parseNgBinding = exports.NG_PARSE_TEMPLATE_BINDINGS_FAKE_PREFIX = void 0;
    var ng = (init_ast(), __toCommonJS(ast_exports));
    var lexer_1 = (init_lexer(), __toCommonJS(lexer_exports));
    var parser_1 = (init_parser(), __toCommonJS(parser_exports));
    var NG_PARSE_FAKE_LOCATION = "angular-estree-parser";
    exports.NG_PARSE_TEMPLATE_BINDINGS_FAKE_PREFIX = "NgEstreeParser";
    var NG_PARSE_FAKE_ABSOLUTE_OFFSET = 0;
    var NG_PARSE_SHARED_PARAMS = [NG_PARSE_FAKE_LOCATION, NG_PARSE_FAKE_ABSOLUTE_OFFSET];
    function createNgParser() {
      return new parser_1.Parser(new lexer_1.Lexer());
    }
    function parseNg(input, parse) {
      const ngParser = createNgParser();
      const {
        astInput,
        comments
      } = extractComments(input, ngParser);
      const {
        ast,
        errors
      } = parse(astInput, ngParser);
      assertAstErrors(errors);
      return {
        ast,
        comments
      };
    }
    function parseNgBinding(input) {
      return parseNg(input, (astInput, ngParser) => ngParser.parseBinding(astInput, ...NG_PARSE_SHARED_PARAMS));
    }
    exports.parseNgBinding = parseNgBinding;
    function parseNgSimpleBinding(input) {
      return parseNg(input, (astInput, ngParser) => ngParser.parseSimpleBinding(astInput, ...NG_PARSE_SHARED_PARAMS));
    }
    exports.parseNgSimpleBinding = parseNgSimpleBinding;
    function parseNgAction(input) {
      return parseNg(input, (astInput, ngParser) => ngParser.parseAction(astInput, ...NG_PARSE_SHARED_PARAMS));
    }
    exports.parseNgAction = parseNgAction;
    function parseNgTemplateBindings(input) {
      const ngParser = createNgParser();
      const {
        templateBindings: ast,
        errors
      } = ngParser.parseTemplateBindings(exports.NG_PARSE_TEMPLATE_BINDINGS_FAKE_PREFIX, input, NG_PARSE_FAKE_LOCATION, NG_PARSE_FAKE_ABSOLUTE_OFFSET, NG_PARSE_FAKE_ABSOLUTE_OFFSET);
      assertAstErrors(errors);
      return ast;
    }
    exports.parseNgTemplateBindings = parseNgTemplateBindings;
    function parseNgInterpolation(input) {
      const ngParser = createNgParser();
      const {
        astInput,
        comments
      } = extractComments(input, ngParser);
      const prefix = "{{";
      const suffix = "}}";
      const {
        ast: rawAst,
        errors
      } = ngParser.parseInterpolation(prefix + astInput + suffix, ...NG_PARSE_SHARED_PARAMS);
      assertAstErrors(errors);
      const ast = rawAst.expressions[0];
      const visited = /* @__PURE__ */ new Set();
      visitSpan(ast, (span) => {
        if (!visited.has(span)) {
          span.start -= prefix.length;
          span.end -= prefix.length;
          visited.add(span);
        }
      });
      return {
        ast,
        comments
      };
    }
    exports.parseNgInterpolation = parseNgInterpolation;
    function visitSpan(ast, fn) {
      if (!ast || typeof ast !== "object") {
        return;
      }
      if (Array.isArray(ast)) {
        return ast.forEach((value) => visitSpan(value, fn));
      }
      for (const key of Object.keys(ast)) {
        const value = ast[key];
        if (key === "span") {
          fn(value);
        } else {
          visitSpan(value, fn);
        }
      }
    }
    function assertAstErrors(errors) {
      if (errors.length !== 0) {
        const [{
          message
        }] = errors;
        throw new SyntaxError(message.replace(/^Parser Error: | at column \d+ in [^]*$/g, ""));
      }
    }
    function extractComments(input, ngParser) {
      const commentStart = ngParser._commentStart(input);
      return commentStart === null ? {
        astInput: input,
        comments: []
      } : {
        astInput: input.slice(0, commentStart),
        comments: [{
          type: "Comment",
          value: input.slice(commentStart + "//".length),
          span: {
            start: commentStart,
            end: input.length
          }
        }]
      };
    }
    function getNgType(node) {
      if (ng.Unary && node instanceof ng.Unary) {
        return "Unary";
      }
      if (node instanceof ng.Binary) {
        return "Binary";
      }
      if (node instanceof ng.BindingPipe) {
        return "BindingPipe";
      }
      if (node instanceof ng.Chain) {
        return "Chain";
      }
      if (node instanceof ng.Conditional) {
        return "Conditional";
      }
      if (node instanceof ng.EmptyExpr) {
        return "EmptyExpr";
      }
      if (node instanceof ng.FunctionCall) {
        return "FunctionCall";
      }
      if (node instanceof ng.ImplicitReceiver) {
        return "ImplicitReceiver";
      }
      if (node instanceof ng.KeyedRead) {
        return "KeyedRead";
      }
      if (node instanceof ng.KeyedWrite) {
        return "KeyedWrite";
      }
      if (node instanceof ng.LiteralArray) {
        return "LiteralArray";
      }
      if (node instanceof ng.LiteralMap) {
        return "LiteralMap";
      }
      if (node instanceof ng.LiteralPrimitive) {
        return "LiteralPrimitive";
      }
      if (node instanceof ng.MethodCall) {
        return "MethodCall";
      }
      if (node instanceof ng.NonNullAssert) {
        return "NonNullAssert";
      }
      if (node instanceof ng.PrefixNot) {
        return "PrefixNot";
      }
      if (node instanceof ng.PropertyRead) {
        return "PropertyRead";
      }
      if (node instanceof ng.PropertyWrite) {
        return "PropertyWrite";
      }
      if (node instanceof ng.Quote) {
        return "Quote";
      }
      if (node instanceof ng.SafeMethodCall) {
        return "SafeMethodCall";
      }
      if (node instanceof ng.SafePropertyRead) {
        return "SafePropertyRead";
      }
      return node.type;
    }
    exports.getNgType = getNgType;
    function stripSurroundingSpaces(_ref2, text) {
      let {
        start: startIndex,
        end: endIndex
      } = _ref2;
      let start = startIndex;
      let end = endIndex;
      while (end !== start && /\s/.test(text[end - 1])) {
        end--;
      }
      while (start !== end && /\s/.test(text[start])) {
        start++;
      }
      return {
        start,
        end
      };
    }
    function expandSurroundingSpaces(_ref3, text) {
      let {
        start: startIndex,
        end: endIndex
      } = _ref3;
      let start = startIndex;
      let end = endIndex;
      while (end !== text.length && /\s/.test(text[end])) {
        end++;
      }
      while (start !== 0 && /\s/.test(text[start - 1])) {
        start--;
      }
      return {
        start,
        end
      };
    }
    function expandSurroundingParens(span, text) {
      return text[span.start - 1] === "(" && text[span.end] === ")" ? {
        start: span.start - 1,
        end: span.end + 1
      } : span;
    }
    function fitSpans(span, text, hasParentParens) {
      let parensCount = 0;
      const outerSpan = {
        start: span.start,
        end: span.end
      };
      while (true) {
        const spacesExpandedSpan = expandSurroundingSpaces(outerSpan, text);
        const parensExpandedSpan = expandSurroundingParens(spacesExpandedSpan, text);
        if (spacesExpandedSpan.start === parensExpandedSpan.start && spacesExpandedSpan.end === parensExpandedSpan.end) {
          break;
        }
        outerSpan.start = parensExpandedSpan.start;
        outerSpan.end = parensExpandedSpan.end;
        parensCount++;
      }
      return {
        hasParens: (hasParentParens ? parensCount - 1 : parensCount) !== 0,
        outerSpan: stripSurroundingSpaces(hasParentParens ? {
          start: outerSpan.start + 1,
          end: outerSpan.end - 1
        } : outerSpan, text),
        innerSpan: stripSurroundingSpaces(span, text)
      };
    }
    exports.fitSpans = fitSpans;
    function findFrontChar(regex, index, text) {
      let i = index;
      while (!regex.test(text[i])) {
        if (--i < 0) {
          throw new Error(`Cannot find front char ${regex} from index ${index} in ${JSON.stringify(text)}`);
        }
      }
      return i;
    }
    exports.findFrontChar = findFrontChar;
    function findBackChar(regex, index, text) {
      let i = index;
      while (!regex.test(text[i])) {
        if (++i >= text.length) {
          throw new Error(`Cannot find back char ${regex} from index ${index} in ${JSON.stringify(text)}`);
        }
      }
      return i;
    }
    exports.findBackChar = findBackChar;
    function toLowerCamelCase(str) {
      return str.slice(0, 1).toLowerCase() + str.slice(1);
    }
    exports.toLowerCamelCase = toLowerCamelCase;
    function getLast(array) {
      return array.length === 0 ? void 0 : array[array.length - 1];
    }
    exports.getLast = getLast;
  }
});
var require_transform = __commonJS({
  "node_modules/angular-estree-parser/lib/transform.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.transformSpan = exports.transform = void 0;
    var utils_1 = require_utils();
    var transform = function(node, context) {
      let isInParentParens = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
      const type = utils_1.getNgType(node);
      switch (type) {
        case "Unary": {
          const {
            operator,
            expr
          } = node;
          const tArgument = _t(expr);
          return _c("UnaryExpression", {
            prefix: true,
            argument: tArgument,
            operator
          }, node.span, {
            hasParentParens: isInParentParens
          });
        }
        case "Binary": {
          const {
            left,
            operation,
            right
          } = node;
          const isPrefixAdd = right.span.start === right.span.end;
          const isPrefixMinus = left.span.start === left.span.end;
          if (isPrefixAdd || isPrefixMinus) {
            const tArgument = left.span.start === left.span.end ? _t(right) : _t(left);
            return _c("UnaryExpression", {
              prefix: true,
              argument: tArgument,
              operator: isPrefixAdd ? "+" : "-"
            }, {
              start: node.span.start,
              end: _getOuterEnd(tArgument)
            }, {
              hasParentParens: isInParentParens
            });
          }
          const tLeft = _t(left);
          const tRight = _t(right);
          return _c(operation === "&&" || operation === "||" ? "LogicalExpression" : "BinaryExpression", {
            left: tLeft,
            right: tRight,
            operator: operation
          }, {
            start: _getOuterStart(tLeft),
            end: _getOuterEnd(tRight)
          }, {
            hasParentParens: isInParentParens
          });
        }
        case "BindingPipe": {
          const {
            exp,
            name,
            args
          } = node;
          const tExp = _t(exp);
          const nameStart = _findBackChar(/\S/, _findBackChar(/\|/, _getOuterEnd(tExp)) + 1);
          const tName = _c("Identifier", {
            name
          }, {
            start: nameStart,
            end: nameStart + name.length
          });
          const tArgs = args.map(_t);
          return _c("NGPipeExpression", {
            left: tExp,
            right: tName,
            arguments: tArgs
          }, {
            start: _getOuterStart(tExp),
            end: _getOuterEnd(tArgs.length === 0 ? tName : utils_1.getLast(tArgs))
          }, {
            hasParentParens: isInParentParens
          });
        }
        case "Chain": {
          const {
            expressions
          } = node;
          return _c("NGChainedExpression", {
            expressions: expressions.map(_t)
          }, node.span, {
            hasParentParens: isInParentParens
          });
        }
        case "Comment": {
          const {
            value
          } = node;
          return _c("CommentLine", {
            value
          }, node.span, {
            processSpan: false
          });
        }
        case "Conditional": {
          const {
            condition,
            trueExp,
            falseExp
          } = node;
          const tCondition = _t(condition);
          const tTrueExp = _t(trueExp);
          const tFalseExp = _t(falseExp);
          return _c("ConditionalExpression", {
            test: tCondition,
            consequent: tTrueExp,
            alternate: tFalseExp
          }, {
            start: _getOuterStart(tCondition),
            end: _getOuterEnd(tFalseExp)
          }, {
            hasParentParens: isInParentParens
          });
        }
        case "EmptyExpr":
          return _c("NGEmptyExpression", {}, node.span, {
            hasParentParens: isInParentParens
          });
        case "FunctionCall": {
          const {
            target,
            args
          } = node;
          const tArgs = args.length === 1 ? [_transformHasParentParens(args[0])] : args.map(_t);
          const tTarget = _t(target);
          return _c("CallExpression", {
            callee: tTarget,
            arguments: tArgs
          }, {
            start: _getOuterStart(tTarget),
            end: node.span.end
          }, {
            hasParentParens: isInParentParens
          });
        }
        case "ImplicitReceiver": {
          return _c("ThisExpression", {}, node.span, {
            hasParentParens: isInParentParens
          });
        }
        case "KeyedRead": {
          const {
            key
          } = node;
          const receiver = Object.prototype.hasOwnProperty.call(node, "receiver") ? node.receiver : node.obj;
          const tKey = _t(key);
          return _transformReceiverAndName(receiver, tKey, {
            computed: true,
            optional: false
          }, {
            end: node.span.end,
            hasParentParens: isInParentParens
          });
        }
        case "LiteralArray": {
          const {
            expressions
          } = node;
          return _c("ArrayExpression", {
            elements: expressions.map(_t)
          }, node.span, {
            hasParentParens: isInParentParens
          });
        }
        case "LiteralMap": {
          const {
            keys,
            values
          } = node;
          const tValues = values.map((value) => _t(value));
          const tProperties = keys.map((_ref4, index) => {
            let {
              key,
              quoted
            } = _ref4;
            const tValue = tValues[index];
            const keyStart = _findBackChar(/\S/, index === 0 ? node.span.start + 1 : _findBackChar(/,/, _getOuterEnd(tValues[index - 1])) + 1);
            const keyEnd = _findFrontChar(/\S/, _findFrontChar(/:/, _getOuterStart(tValue) - 1) - 1) + 1;
            const keySpan = {
              start: keyStart,
              end: keyEnd
            };
            const tKey = quoted ? _c("StringLiteral", {
              value: key
            }, keySpan) : _c("Identifier", {
              name: key
            }, keySpan);
            const shorthand = tKey.end < tKey.start;
            return _c("ObjectProperty", {
              key: tKey,
              value: tValue,
              method: false,
              shorthand,
              computed: false
            }, {
              start: _getOuterStart(tKey),
              end: _getOuterEnd(tValue)
            });
          });
          return _c("ObjectExpression", {
            properties: tProperties
          }, node.span, {
            hasParentParens: isInParentParens
          });
        }
        case "LiteralPrimitive": {
          const {
            value
          } = node;
          switch (typeof value) {
            case "boolean":
              return _c("BooleanLiteral", {
                value
              }, node.span, {
                hasParentParens: isInParentParens
              });
            case "number":
              return _c("NumericLiteral", {
                value
              }, node.span, {
                hasParentParens: isInParentParens
              });
            case "object":
              return _c("NullLiteral", {}, node.span, {
                hasParentParens: isInParentParens
              });
            case "string":
              return _c("StringLiteral", {
                value
              }, node.span, {
                hasParentParens: isInParentParens
              });
            case "undefined":
              return _c("Identifier", {
                name: "undefined"
              }, node.span, {
                hasParentParens: isInParentParens
              });
            default:
              throw new Error(`Unexpected LiteralPrimitive value type ${typeof value}`);
          }
        }
        case "MethodCall":
        case "SafeMethodCall": {
          const isOptionalType = type === "SafeMethodCall";
          const {
            receiver,
            name,
            args
          } = node;
          const tArgs = args.length === 1 ? [_transformHasParentParens(args[0])] : args.map(_t);
          const nameEnd = _findFrontChar(/\S/, _findFrontChar(/\(/, (tArgs.length === 0 ? _findFrontChar(/\)/, node.span.end - 1) : _getOuterStart(tArgs[0])) - 1) - 1) + 1;
          const tName = _c("Identifier", {
            name
          }, {
            start: nameEnd - name.length,
            end: nameEnd
          });
          const tReceiverAndName = _transformReceiverAndName(receiver, tName, {
            computed: false,
            optional: isOptionalType
          });
          const isOptionalReceiver = _isOptionalReceiver(tReceiverAndName);
          return _c(isOptionalType || isOptionalReceiver ? "OptionalCallExpression" : "CallExpression", {
            callee: tReceiverAndName,
            arguments: tArgs
          }, {
            start: _getOuterStart(tReceiverAndName),
            end: node.span.end
          }, {
            hasParentParens: isInParentParens
          });
        }
        case "NonNullAssert": {
          const {
            expression
          } = node;
          const tExpression = _t(expression);
          return _c("TSNonNullExpression", {
            expression: tExpression
          }, {
            start: _getOuterStart(tExpression),
            end: node.span.end
          }, {
            hasParentParens: isInParentParens
          });
        }
        case "PrefixNot": {
          const {
            expression
          } = node;
          const tExpression = _t(expression);
          return _c("UnaryExpression", {
            prefix: true,
            operator: "!",
            argument: tExpression
          }, {
            start: node.span.start,
            end: _getOuterEnd(tExpression)
          }, {
            hasParentParens: isInParentParens
          });
        }
        case "PropertyRead":
        case "SafePropertyRead": {
          const isOptionalType = type === "SafePropertyRead";
          const {
            receiver,
            name
          } = node;
          const nameEnd = _findFrontChar(/\S/, node.span.end - 1) + 1;
          const tName = _c("Identifier", {
            name
          }, {
            start: nameEnd - name.length,
            end: nameEnd
          }, _isImplicitThis(receiver) ? {
            hasParentParens: isInParentParens
          } : {});
          return _transformReceiverAndName(receiver, tName, {
            computed: false,
            optional: isOptionalType
          }, {
            hasParentParens: isInParentParens
          });
        }
        case "KeyedWrite": {
          const {
            key,
            value
          } = node;
          const receiver = Object.prototype.hasOwnProperty.call(node, "receiver") ? node.receiver : node.obj;
          const tKey = _t(key);
          const tValue = _t(value);
          const tReceiverAndName = _transformReceiverAndName(receiver, tKey, {
            computed: true,
            optional: false
          }, {
            end: _findBackChar(/\]/, _getOuterEnd(tKey)) + 1
          });
          return _c("AssignmentExpression", {
            left: tReceiverAndName,
            operator: "=",
            right: tValue
          }, {
            start: _getOuterStart(tReceiverAndName),
            end: _getOuterEnd(tValue)
          }, {
            hasParentParens: isInParentParens
          });
        }
        case "PropertyWrite": {
          const {
            receiver,
            name,
            value
          } = node;
          const tValue = _t(value);
          const nameEnd = _findFrontChar(/\S/, _findFrontChar(/=/, _getOuterStart(tValue) - 1) - 1) + 1;
          const tName = _c("Identifier", {
            name
          }, {
            start: nameEnd - name.length,
            end: nameEnd
          });
          const tReceiverAndName = _transformReceiverAndName(receiver, tName, {
            computed: false,
            optional: false
          });
          return _c("AssignmentExpression", {
            left: tReceiverAndName,
            operator: "=",
            right: tValue
          }, {
            start: _getOuterStart(tReceiverAndName),
            end: _getOuterEnd(tValue)
          }, {
            hasParentParens: isInParentParens
          });
        }
        case "Quote": {
          const {
            prefix,
            uninterpretedExpression
          } = node;
          return _c("NGQuotedExpression", {
            prefix,
            value: uninterpretedExpression
          }, node.span, {
            hasParentParens: isInParentParens
          });
        }
        default:
          throw new Error(`Unexpected node ${type}`);
      }
      function _t(n) {
        return exports.transform(n, context);
      }
      function _transformHasParentParens(n) {
        return exports.transform(n, context, true);
      }
      function _c(t, n, span) {
        let {
          processSpan = true,
          hasParentParens = false
        } = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
        const newNode = Object.assign(Object.assign({
          type: t
        }, transformSpan(span, context, processSpan, hasParentParens)), n);
        switch (t) {
          case "Identifier": {
            const identifier = newNode;
            identifier.loc.identifierName = identifier.name;
            break;
          }
          case "NumericLiteral": {
            const numericLiteral = newNode;
            numericLiteral.extra = Object.assign(Object.assign({}, numericLiteral.extra), {
              raw: context.text.slice(numericLiteral.start, numericLiteral.end),
              rawValue: numericLiteral.value
            });
            break;
          }
          case "StringLiteral": {
            const stringLiteral = newNode;
            stringLiteral.extra = Object.assign(Object.assign({}, stringLiteral.extra), {
              raw: context.text.slice(stringLiteral.start, stringLiteral.end),
              rawValue: stringLiteral.value
            });
            break;
          }
        }
        return newNode;
      }
      function _transformReceiverAndName(receiver, tName, props) {
        let {
          end = _getOuterEnd(tName),
          hasParentParens = false
        } = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
        if (_isImplicitThis(receiver) || receiver.span.start === tName.start) {
          return tName;
        }
        const tReceiver = _t(receiver);
        const isOptionalReceiver = _isOptionalReceiver(tReceiver);
        return _c(props.optional || isOptionalReceiver ? "OptionalMemberExpression" : "MemberExpression", Object.assign({
          object: tReceiver,
          property: tName,
          computed: props.computed
        }, props.optional ? {
          optional: true
        } : isOptionalReceiver ? {
          optional: false
        } : null), {
          start: _getOuterStart(tReceiver),
          end
        }, {
          hasParentParens
        });
      }
      function _findFrontChar(regex, index) {
        return utils_1.findFrontChar(regex, index, context.text);
      }
      function _findBackChar(regex, index) {
        return utils_1.findBackChar(regex, index, context.text);
      }
      function _isImplicitThis(n) {
        return n.span.start >= n.span.end || /^\s+$/.test(context.text.slice(n.span.start, n.span.end));
      }
      function _isOptionalReceiver(n) {
        return (n.type === "OptionalCallExpression" || n.type === "OptionalMemberExpression") && !_isParenthesized(n);
      }
      function _isParenthesized(n) {
        return n.extra && n.extra.parenthesized;
      }
      function _getOuterStart(n) {
        return _isParenthesized(n) ? n.extra.parenStart : n.start;
      }
      function _getOuterEnd(n) {
        return _isParenthesized(n) ? n.extra.parenEnd : n.end;
      }
    };
    exports.transform = transform;
    function transformSpan(span, context) {
      let processSpan = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
      let hasParentParens = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
      if (!processSpan) {
        const {
          start,
          end
        } = span;
        return {
          start,
          end,
          loc: {
            start: context.locator.locationForIndex(start),
            end: context.locator.locationForIndex(end)
          }
        };
      }
      const {
        outerSpan,
        innerSpan,
        hasParens
      } = utils_1.fitSpans(span, context.text, hasParentParens);
      return Object.assign({
        start: innerSpan.start,
        end: innerSpan.end,
        loc: {
          start: context.locator.locationForIndex(innerSpan.start),
          end: context.locator.locationForIndex(innerSpan.end)
        }
      }, hasParens && {
        extra: {
          parenthesized: true,
          parenStart: outerSpan.start,
          parenEnd: outerSpan.end
        }
      });
    }
    exports.transformSpan = transformSpan;
  }
});
var require_transform_microsyntax = __commonJS({
  "node_modules/angular-estree-parser/lib/transform-microsyntax.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.transformTemplateBindings = void 0;
    var ng = (init_ast(), __toCommonJS(ast_exports));
    var transform_1 = require_transform();
    var utils_1 = require_utils();
    function transformTemplateBindings(rawTemplateBindings, context) {
      rawTemplateBindings.forEach(fixTemplateBindingSpan);
      const [firstTemplateBinding] = rawTemplateBindings;
      const {
        key: prefix
      } = firstTemplateBinding;
      const templateBindings = context.text.slice(firstTemplateBinding.sourceSpan.start, firstTemplateBinding.sourceSpan.end).trim().length === 0 ? rawTemplateBindings.slice(1) : rawTemplateBindings;
      const body = [];
      let lastTemplateBinding = null;
      for (let i = 0; i < templateBindings.length; i++) {
        const templateBinding = templateBindings[i];
        if (lastTemplateBinding && isExpressionBinding(lastTemplateBinding) && isVariableBinding(templateBinding) && templateBinding.value && templateBinding.value.source === lastTemplateBinding.key.source) {
          const alias = _c("NGMicrosyntaxKey", {
            name: templateBinding.key.source
          }, templateBinding.key.span);
          const updateSpanEnd = (node, end) => Object.assign(Object.assign({}, node), transform_1.transformSpan({
            start: node.start,
            end
          }, context));
          const updateExpressionAlias = (expression) => Object.assign(Object.assign({}, updateSpanEnd(expression, alias.end)), {
            alias
          });
          const lastNode = body.pop();
          if (lastNode.type === "NGMicrosyntaxExpression") {
            body.push(updateExpressionAlias(lastNode));
          } else if (lastNode.type === "NGMicrosyntaxKeyedExpression") {
            const expression = updateExpressionAlias(lastNode.expression);
            body.push(updateSpanEnd(Object.assign(Object.assign({}, lastNode), {
              expression
            }), expression.end));
          } else {
            throw new Error(`Unexpected type ${lastNode.type}`);
          }
        } else {
          body.push(transformTemplateBinding(templateBinding, i));
        }
        lastTemplateBinding = templateBinding;
      }
      return _c("NGMicrosyntax", {
        body
      }, body.length === 0 ? rawTemplateBindings[0].sourceSpan : {
        start: body[0].start,
        end: body[body.length - 1].end
      });
      function transformTemplateBinding(templateBinding, index) {
        if (isExpressionBinding(templateBinding)) {
          const {
            key,
            value
          } = templateBinding;
          if (!value) {
            return _c("NGMicrosyntaxKey", {
              name: removePrefix(key.source)
            }, key.span);
          } else if (index === 0) {
            return _c("NGMicrosyntaxExpression", {
              expression: _t(value.ast),
              alias: null
            }, value.sourceSpan);
          } else {
            return _c("NGMicrosyntaxKeyedExpression", {
              key: _c("NGMicrosyntaxKey", {
                name: removePrefix(key.source)
              }, key.span),
              expression: _c("NGMicrosyntaxExpression", {
                expression: _t(value.ast),
                alias: null
              }, value.sourceSpan)
            }, {
              start: key.span.start,
              end: value.sourceSpan.end
            });
          }
        } else {
          const {
            key,
            sourceSpan
          } = templateBinding;
          const startsWithLet = /^let\s$/.test(context.text.slice(sourceSpan.start, sourceSpan.start + 4));
          if (startsWithLet) {
            const {
              value
            } = templateBinding;
            return _c("NGMicrosyntaxLet", {
              key: _c("NGMicrosyntaxKey", {
                name: key.source
              }, key.span),
              value: !value ? null : _c("NGMicrosyntaxKey", {
                name: value.source
              }, value.span)
            }, {
              start: sourceSpan.start,
              end: value ? value.span.end : key.span.end
            });
          } else {
            const value = getAsVariableBindingValue(templateBinding);
            return _c("NGMicrosyntaxAs", {
              key: _c("NGMicrosyntaxKey", {
                name: value.source
              }, value.span),
              alias: _c("NGMicrosyntaxKey", {
                name: key.source
              }, key.span)
            }, {
              start: value.span.start,
              end: key.span.end
            });
          }
        }
      }
      function _t(n) {
        return transform_1.transform(n, context);
      }
      function _c(t, n, span) {
        let stripSpaces = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
        return Object.assign(Object.assign({
          type: t
        }, transform_1.transformSpan(span, context, stripSpaces)), n);
      }
      function removePrefix(string) {
        return utils_1.toLowerCamelCase(string.slice(prefix.source.length));
      }
      function isExpressionBinding(templateBinding) {
        return templateBinding instanceof ng.ExpressionBinding;
      }
      function isVariableBinding(templateBinding) {
        return templateBinding instanceof ng.VariableBinding;
      }
      function fixTemplateBindingSpan(templateBinding) {
        fixSpan(templateBinding.key.span);
        if (isVariableBinding(templateBinding) && templateBinding.value) {
          fixSpan(templateBinding.value.span);
        }
      }
      function fixSpan(span) {
        if (context.text[span.start] !== '"' && context.text[span.start] !== "'") {
          return;
        }
        const quote = context.text[span.start];
        let hasBackSlash = false;
        for (let i = span.start + 1; i < context.text.length; i++) {
          switch (context.text[i]) {
            case quote:
              if (!hasBackSlash) {
                span.end = i + 1;
                return;
              }
            default:
              hasBackSlash = false;
              break;
            case "\\":
              hasBackSlash = !hasBackSlash;
              break;
          }
        }
      }
      function getAsVariableBindingValue(variableBinding) {
        if (!variableBinding.value || variableBinding.value.source !== utils_1.NG_PARSE_TEMPLATE_BINDINGS_FAKE_PREFIX) {
          return variableBinding.value;
        }
        const index = utils_1.findBackChar(/\S/, variableBinding.sourceSpan.start, context.text);
        return {
          source: "$implicit",
          span: {
            start: index,
            end: index
          }
        };
      }
    }
    exports.transformTemplateBindings = transformTemplateBindings;
  }
});
var require_lib = __commonJS({
  "node_modules/angular-estree-parser/lib/index.js"(exports) {
    "use strict";
    init_define_process();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.parseTemplateBindings = exports.parseAction = exports.parseInterpolation = exports.parseSimpleBinding = exports.parseBinding = void 0;
    var context_1 = require_context();
    var transform_1 = require_transform();
    var transform_microsyntax_1 = require_transform_microsyntax();
    var utils_1 = require_utils();
    function parse(input, parseNg) {
      const {
        ast: rawNgAst,
        comments
      } = parseNg(input);
      const context = new context_1.Context(input);
      const _t = (n) => transform_1.transform(n, context);
      const ast = _t(rawNgAst);
      ast.comments = comments.map(_t);
      return ast;
    }
    function parseBinding(input) {
      return parse(input, utils_1.parseNgBinding);
    }
    exports.parseBinding = parseBinding;
    function parseSimpleBinding(input) {
      return parse(input, utils_1.parseNgSimpleBinding);
    }
    exports.parseSimpleBinding = parseSimpleBinding;
    function parseInterpolation(input) {
      return parse(input, utils_1.parseNgInterpolation);
    }
    exports.parseInterpolation = parseInterpolation;
    function parseAction(input) {
      return parse(input, utils_1.parseNgAction);
    }
    exports.parseAction = parseAction;
    function parseTemplateBindings(input) {
      return transform_microsyntax_1.transformTemplateBindings(utils_1.parseNgTemplateBindings(input), new context_1.Context(input));
    }
    exports.parseTemplateBindings = parseTemplateBindings;
  }
});
var require_angular = __commonJS({
  "src/language-js/parse/angular.js"(exports, module) {
    init_define_process();
    var {
      locStart,
      locEnd
    } = require_loc();
    function createParser(_parse) {
      const parse = (text, parsers, options) => {
        const ngEstreeParser = require_lib();
        const node = _parse(text, ngEstreeParser);
        return {
          type: "NGRoot",
          node: options.parser === "__ng_action" && node.type !== "NGChainedExpression" ? Object.assign(Object.assign({}, node), {}, {
            type: "NGChainedExpression",
            expressions: [node]
          }) : node
        };
      };
      return {
        astFormat: "estree",
        parse,
        locStart,
        locEnd
      };
    }
    module.exports = {
      parsers: {
        __ng_action: createParser((text, ng) => ng.parseAction(text)),
        __ng_binding: createParser((text, ng) => ng.parseBinding(text)),
        __ng_interpolation: createParser((text, ng) => ng.parseInterpolation(text)),
        __ng_directive: createParser((text, ng) => ng.parseTemplateBindings(text))
      }
    };
  }
});
var parser_angular_js_esm_default = require_angular();
export {
  parser_angular_js_esm_default as default
};
