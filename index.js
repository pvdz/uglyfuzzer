function rng(max) {
  return Math.floor(max * Math.random());
}

function createFunctionDecls(n, recurmax) {
  if (--recurmax < 0) return ';';
  let s = '';
  while (--n > 0) {
    s += createFunctionDecl(recurmax) + '\n';
  }
  return s;
}

let funcs = 0;
function createFunctionDecl(recurmax) {
  if (--recurmax < 0) return ';';
  let func = funcs++;
  return 'function f' + func + '(){' + createStatements(3, recurmax) + '}\nf' + func + '();';
}

function createStatements(n, recurmax) {
  if (--recurmax < 0) return ';';
  let s = '';
  while (--n > 0) {
    s += createStatement(recurmax);
  }
  return s;
}

let loops = 0;
function createStatement(recurmax) {
  let loop = ++loops;
  if (--recurmax < 0) return ';';
  switch (rng(7)) {
    case 0:
      return '{' + createStatement(recurmax) + '}';
    case 1:
      return 'if (' + createExpression(recurmax) + ')' + createStatement(recurmax);
    case 2:
      return '{var brake' + loop + ' = 5; do {' + createStatement(recurmax) + '} while ((' + createExpression(recurmax) + ') && --brake' + loop + ' > 0);}';
    case 3:
      return '{var brake' + loop + ' = 5; while ((' + createExpression(recurmax) + ') && --brake' + loop + ' > 0)' + createStatement(recurmax) + '}';
    case 4:
      return 'for (var brake' + loop + ' = 5; (' + createExpression(recurmax) + ') && brake' + loop + ' > 0; --brake' + loop + ')' + createStatement(recurmax);
    case 5:
      return ';';
    case 6:
      return createExpression() + ';';
  }
}

function createExpression(recurmax) {
  if (--recurmax < 0) return '0';
  switch (rng(8)) {
    case 0:
      return '(' + createUnaryOp() + 'a)';
    case 1:
      return '(a' + (Math.random() > 0.5 ? '++' : '--') + ')';
    case 2:
      return '(b ' + createAssignment() + ' a)';
    case 3:
      return '(' + Math.random() + ' > 0.5 ? a : b)';
    case 4:
      return createExpression(recurmax) + createBinaryOp() + createExpression(recurmax);
    case 5:
      return createValue();
    case 6:
      return '(' + createExpression(recurmax) + ')';
    case 7:
      return createExpression(recurmax) + '?(' + createExpression(recurmax) + '):(' + createExpression(recurmax) + ')';
  }
}

function createValue() {
  switch (rng(4)) {
    case 0:
      return 'true';
    case 1:
      return 'false';
    case 2:
      return '22';
    case 3:
      return '0';
  }
}

function createBinaryOp() {
  switch (rng(6)) {
    case 0:
      return '+';
    case 1:
      return '-';
    case 2:
      return ',';
    case 3:
      return '&&';
    case 4:
      return '||';
    case 5:
      return '^';
  }
}

function createAssignment() {
  switch (rng(4)) {
    case 0:
      return '=';
    case 1:
      return '-=';
    case 2:
      return '^=';
    case 3:
      return '+=';
  }
}

function createUnaryOp() {
  switch (rng(4)) {
    case 0:
      return '--';
    case 1:
      return '++';
    case 2:
      return '~';
    case 3:
      return '!';
  }
}

let code = `
  var a = 100, b = 10;
  ${createFunctionDecls(rng(500) + 1, 50)}
  console.log(a, b);
`;
console.log(code + '\n\n');
