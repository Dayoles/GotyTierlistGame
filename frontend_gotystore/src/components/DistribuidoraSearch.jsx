// DistribuidoraSearch.jsx – consultar o eliminar una distribuidora por ID

import { useState } from "react";

export default function DistribuidoraSearch({ encontrada, onConsultar, onEliminar, loading }) {
  const [id, setId] = useState("");

  return (
    <section className="tarjeta">
      <h2>Consultar o eliminar por ID</h2>
      <label htmlFor="busqueda-id">ID de la distribuidora</label>
      <input
        id="busqueda-id"
        type="text"
        inputMode="numeric"
        placeholder="Ej: 1"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <div className="fila-botones">
        <button className="btn btn-secundario" onClick={() => onConsultar(id)} disabled={loading}>
          Consultar por ID
        </button>
        <button className="btn btn-peligro" onClick={() => onEliminar(id)} disabled={loading}>
          Eliminar por ID
        </button>
      </div>

      {encontrada && (
        <div className="resultado-id">
          <h3>Distribuidora encontrada</h3>
          <dl>
            <dt>ID</dt>
            <dd>{encontrada.IdDistribuidora}</dd>
            <dt>Nombre</dt>
            <dd>{encontrada.NombreDistribuidora}</dd>
            <dt>País</dt>
            <dd>{encontrada.Pais}</dd>
            <dt>Ciudad</dt>
            <dd>{encontrada.Ciudad}</dd>
            <dt>Estado</dt>
            <dd>{encontrada.Estado ? "Activa" : "Inactiva"}</dd>
          </dl>
        </div>
      )}
    </section>
  );
}
