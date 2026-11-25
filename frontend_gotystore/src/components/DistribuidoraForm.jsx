// DistribuidoraForm.jsx – formulario reutilizable para INGRESAR y MODIFICAR

import { useEffect, useState } from "react";

const VACIO = { NombreDistribuidora: "", Pais: "", Ciudad: "", Estado: true };

export default function DistribuidoraForm({
  titulo,
  textoBoton,
  conId = false,
  valoresIniciales = null,
  limpiarAlExito = false,
  loading,
  onSubmit,
}) {
  const [id, setId] = useState("");
  const [datos, setDatos] = useState(VACIO);

  // Cuando se pulsa "Editar" en la tabla, se cargan los datos en el formulario
  useEffect(() => {
    if (valoresIniciales) {
      setId(String(valoresIniciales.IdDistribuidora));
      setDatos({
        NombreDistribuidora: valoresIniciales.NombreDistribuidora,
        Pais: valoresIniciales.Pais,
        Ciudad: valoresIniciales.Ciudad,
        Estado: valoresIniciales.Estado,
      });
    }
  }, [valoresIniciales]);

  const cambiar = (campo, valor) => setDatos((previo) => ({ ...previo, [campo]: valor }));

  const enviar = async (e) => {
    e.preventDefault();
    const resultado = await onSubmit(id, datos);
    if (resultado?.ok && limpiarAlExito) {
      setDatos(VACIO);
      setId("");
    }
  };

  const prefijo = conId ? "mod" : "ing";

  return (
    // noValidate: así el Backend es quien valida y devuelve el error (Prueba 9)
    <form className="tarjeta" onSubmit={enviar} noValidate>
      <h2>{titulo}</h2>

      {conId && (
        <>
          <label htmlFor={`${prefijo}-id`}>ID de la distribuidora</label>
          <input
            id={`${prefijo}-id`}
            type="text"
            inputMode="numeric"
            placeholder="Ej: 1"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </>
      )}

      <label htmlFor={`${prefijo}-nombre`}>Nombre</label>
      <input
        id={`${prefijo}-nombre`}
        type="text"
        placeholder="Ej: Steam Latinoamerica"
        value={datos.NombreDistribuidora}
        onChange={(e) => cambiar("NombreDistribuidora", e.target.value)}
      />

      <div className="dos-columnas">
        <div>
          <label htmlFor={`${prefijo}-pais`}>País</label>
          <input
            id={`${prefijo}-pais`}
            type="text"
            placeholder="Ej: Colombia"
            value={datos.Pais}
            onChange={(e) => cambiar("Pais", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor={`${prefijo}-ciudad`}>Ciudad</label>
          <input
            id={`${prefijo}-ciudad`}
            type="text"
            placeholder="Ej: Medellin"
            value={datos.Ciudad}
            onChange={(e) => cambiar("Ciudad", e.target.value)}
          />
        </div>
      </div>

      <label className="check">
        <input
          type="checkbox"
          checked={datos.Estado}
          onChange={(e) => cambiar("Estado", e.target.checked)}
        />
        Distribuidora activa
      </label>

      <button className="btn btn-primario" type="submit" disabled={loading}>
        {loading ? "Procesando..." : textoBoton}
      </button>
    </form>
  );
}
