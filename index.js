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
  return 'function f'+func+'(){' + createStatements(3, recurmax) + '}\nf' + func + '();';
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
  switch (Math.floor(5 * Math.random())) {
    case 0:
      return '{' + createStatement(recurmax) + '}';
    case 1:
      return 'if (' + createExpression(recurmax) + ')' + createStatement(recurmax);
    case 2:
      return '{var brake'+loop+' = 5; while ((' + createExpression(recurmax) + '), --brake'+loop+' > 0)' + createStatement(recurmax) + '}';
    case 3:
      return ';';
    case 4:
      return createExpression() + ';';
  }
}

function createExpression(recurmax) {
  if (--recurmax < 0) return '0';
  switch (Math.floor(5 * Math.random())) {
    case 0:
      return '++a';
    case 1:
      return 'b -= a';
    case 2:
      return '--b';
    case 3:
      return '(' + Math.random() + ' > 0.5 ? a : b)';
    case 4:
      return createExpression(recurmax) + ',' + createExpression(recurmax);
  }
}

let code = `
  var a = 100, b = 10;
  ${createFunctionDecls(10, 30)}
  console.log(a, b);
`;
console.log(code + '\n\n');
