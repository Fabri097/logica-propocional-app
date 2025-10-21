export const evaluatorLogic = (expression, context) => {
  const replaced = expression
    .replace(/¬(\w)/g, (_, v) => !context[v])
    .replace(/\b(\w)\b/g, (v) => context[v])
    .replace(/∧/g, "&&")
    .replace(/∨/g, "||");

  try {
    return eval(replaced);
  } catch (e) {
    return false;
  }
};
