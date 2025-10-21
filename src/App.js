import { useState } from "react";
import "./App.css";
import imgApp from "./img/imgapp.jpg";
import { defaultRules } from "./logic/parser";
import { evaluatorLogic } from "./logic/evaluator";
import { buildLogicTree } from "./logic/treeBuilder";
import LogicTree from "./components/LogicTree";
import RuleEditor from "./components/RuleEditor";

function App() {
  const [password, setPassword] = useState("");
  const [expression, setExpression] = useState("L ∧ N ∧ ¬S ∧ C");
  const [showTree, setShowTree] = useState(false);

  const context = Object.fromEntries(
    defaultRules.map((rule) => [rule.id, rule.test(password)])
  );

  const tree = buildLogicTree(expression);
  const isValid = evaluatorLogic(expression, context);

  return (
    <div className="app" style={{ backgroundImage: `url(${imgApp})` }}>
      <div className="container">
        <h2 className="titulo">Validador de Contraseñas</h2>

        <input
          className="input"
          type="text"
          placeholder="Ingresa tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="expresion">
          Expresión lógica: <strong>{expression}</strong>
        </p>
        <p className="resultado">
          Resultado: {isValid ? "✔️ Válida" : "❌ Inválida"}
        </p>
        <ul>
          {defaultRules.map((rule) => (
            <li key={rule.id}>
              {rule.label}: {context[rule.id] ? "✔️" : "❌"}
            </li>
          ))}
        </ul>
        <RuleEditor expression={expression} setExpression={setExpression}/>
        <button
          className="toggle-button"
          onClick={() => setShowTree((prev) => !prev)}
        >
          {showTree ? "Ocultar Árbol Lógico" : "Mostrar Árbol Lógico"}
        </button>

        {showTree && (
          <div className="arbol">
            <div className="arbol-1">
              <h3 className="arbol-2">Árbol de Evaluación Lógica</h3>
              <LogicTree tree={tree} context={context} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
