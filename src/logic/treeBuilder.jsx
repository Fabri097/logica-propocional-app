
class Node {
  constructor(type, left = null, right = null) {
    this.type = type;
    this.left = left;
    this.right = right;
  }
}


const tokenize = (expr) =>
  expr.replace(/\(/g, ' ( ')
      .replace(/\)/g, ' ) ')
      .trim()
      .split(/\s+/);


export const buildLogicTree = (expression) => {
  const tokens = tokenize(expression);

  const parse = () => {
    const token = tokens.shift();
    if (!token) return null;

    if (token === '(') {
      const left = parse();
      const op = tokens.shift();
      const right = parse();
      tokens.shift(); 
      return new Node(op, left, right);
    }

    if (token === '¬') {
      const next = parse();
      return new Node('¬', next);
    }

    return new Node(token);
  };

  
  const autoWrap = (tokens) => {
    if (tokens.includes('∧') || tokens.includes('∨')) {
      const stack = [];
      while (tokens.length) {
        const t = tokens.shift();
        if (t === '¬') {
         stack.push(new Node('¬', parse()));

        } else if (t === '∧' || t === '∨') {
          const left = stack.pop();
          const right = new Node(tokens.shift());
          stack.push(new Node(t, left, right));
        } else {
          stack.push(new Node(t));
        }
      }
      return stack[0];
    } else {
      return parse();
    }
  };

  return autoWrap(tokens);
};
