
const imagenes = {
  SO: "/clima/sol.png",
  PS: "/clima/parcialmente-soleado.png",
  PN: "/clima/parcialmente-nublado.png",
  NU: "/clima/nublado.png",
};

export default function ClimaImagen({ tipo }) {
    const src = imagenes[tipo];

  if (!src) {
    return <p>Imagen no disponible para el tipo: {tipo}</p>;
  }
  
  return (
    <div className="clima-img">
      <img src={src} alt="{tipo}" style={{ width: "80px" }}/>
      <p>{tipo}</p>
    </div>
  );
}
