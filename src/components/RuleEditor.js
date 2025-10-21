import React from "react";

export default function RuleEditor({ expression, setExpression }) {
  return (
    <div>
      <h3>Editor de Reglas</h3>
      <textarea
        rows={2}
        style={{ width: "100%", fontSize: "1rem" }}
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
        placeholder="L ∧ N ∧ ¬S ∧ C "
      />
      <p style={{ fontSize: "0.9rem", color: "#555" }}>
        Usa letras: L (letra), N (número), S (símbolo), C (mayúscula)
        <br />
        Operadores: ∧ (y), ∨ (o), ¬ (no)
      </p>
    </div>
  );
}
