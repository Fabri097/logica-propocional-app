import React from "react";
import Tree from "react-d3-tree";

const convertToD3 = (node, context) => {
  if (!node) return null;

  const value = context[node.type];
  const resultado = value === undefined ? "operador" : value.toString();

  console.log(node.type, value, resultado);

  return {
    name: node.type,
    attributes: { resultado },
    children: [node.left, node.right]
      .filter(Boolean)
      .map((child) => convertToD3(child, context)),
  };
};

export default function LogicTree({ tree, context }) {
  const data = convertToD3(tree, context);

  return (
    <div style={{ height: "400px", marginTop: "2rem" }}>
      <Tree
        data={data}
        orientation="vertical"
        renderCustomNodeElement={({ nodeDatum }) => {
          const resultado = nodeDatum.attributes?.resultado;
          let fillColor = "#212424"; // operador

          if (resultado === "true") fillColor = "#88DC65";     
          else if (resultado === "false") fillColor = "#FF6B6B"; 

          return (
            <g>
              <circle r={15} fill={fillColor} />
              <text fill="#000" x={20}>
                {nodeDatum.name}
              </text>
              <text fill="#555" x={20} y={20} fontSize={12}>
                {resultado}
              </text>
            </g>
          );
        }}
      />
    </div>
  );
}
