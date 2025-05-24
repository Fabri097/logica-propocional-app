import { useState } from "react";
import "./App.css";
import ClimaImagen from "./components/imagenClima";

const estados = ["SO", "PS", "PN", "NU"];

export default function App() {
  const [climaHistorial, setClimaHistorial] = useState([
    "SO",
    "PS",
    "PN",
    "NU",
  ]);
  const [diasPredecir, setDiaspredecir] = useState(3);
  const [matriz, setMatriz] = useState({});
  const [resultado, setResultado] = useState([]);

  const calcularMatriz = () => {
    const transiciones = {};
    estados.forEach((e) => (transiciones[e] = estados.map(() => 0)));

    for (let i = 0; i < climaHistorial.length - 1; i++) {
      const actual = climaHistorial[i];
      const siguiente = climaHistorial[i + 1];
      const idx = estados.indexOf(siguiente);
      transiciones[actual][idx]++;
    }

    const matrizNormalizada = {};
    estados.forEach((e) => {
      const fila = transiciones[e];
      const total = fila.reduce((a, b) => a + b, 0);
      matrizNormalizada[e] =
        total === 0 ? estados.map(() => 0) : fila.map((v) => v / total);
    });

    setMatriz(matrizNormalizada);
  };

  const simularClima = () => {
    if (climaHistorial.length === 0 || Object.keys(matriz).length === 0) return;
    const resultadoSimulacion = [];
    let estadoActual = climaHistorial[climaHistorial.length - 1];

    for (let i = 0; i < diasPredecir; i++) {
      const probs = matriz[estadoActual];
      const rand = Math.random();
      let suma = 0;
      for (let j = 0; j < probs.length; j++) {
        suma += probs[j];
        if (rand <= suma) {
          estadoActual = estados[j];
          break;
        }
      }
      resultadoSimulacion.push(estadoActual);
    }

    setResultado(resultadoSimulacion);
  };

  return (
    <div className="contenedor-1">
      <h1 className="tituloApp">Simulador de Clima</h1>
      <div className="leyenda">
        <h3>Abreviaciones del clima: </h3>
        <ul>
          <li>
            <strong>SO</strong> → Soleado{" "}
          </li>
          <li>
            <strong>PS</strong> → Parcialmente Soleado{" "}
          </li>
          <li>
            <strong>PN</strong> → Parcialmente Nublado{" "}
          </li>
          <li>
            <strong>NU</strong> → Nublado{" "}
          </li>
        </ul>
      </div>
      <label className="entrada">
        Historial Climático (separado por comas):
      </label>
      <input
        className="entradaUsuario"
        type="text"
        value={climaHistorial.join(",")}
        onChange={(e) =>
          setClimaHistorial(
            e.target.value.split(",").map((x) => x.trim().toUpperCase())
          )
        }
      />

      <label className="entrada">Días a predecir:</label>
      <input
        type="number"
        className="entradaUsuario"
        value={diasPredecir}
        onChange={(e) => setDiaspredecir(parseInt(e.target.value))}
      />

      <div className="botones">
        <button className="boton" onClick={calcularMatriz}>
          Calcular matriz
        </button>
        <button className="boton" onClick={simularClima}>
          Simular clima
        </button>
      </div>

      {Object.keys(matriz).length > 0 && (
        <div className="matriz-transicion">
          <h2>Matriz de transición:</h2>
          <table>
            <thead>
              <tr>
                <th>Estado</th>
                {estados.map((e) => (
                  <th key={e}>{e}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {estados.map((e, i) => (
                <tr key={i}>
                  <td>
                    <strong>{e}</strong>
                  </td>
                  {matriz[e].map((val, j) => (
                    <td key={j}>{val.toFixed(2)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {resultado.length > 0 && (
        <div className="resultado">
          <h2>Pronóstico del clima:</h2>

          <div className="resultadoClima">
            {resultado.map((tipo, i) => (
              <ClimaImagen key={i} tipo={tipo}/>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
