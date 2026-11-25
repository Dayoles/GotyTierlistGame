// DistribuidoraList.jsx – tabla con todas las distribuidoras

export default function DistribuidoraList({ distribuidoras, onConsultar, onEditar, onEliminar, loading }) {
  return (
    <section className="tarjeta">
      <div className="tarjeta-encabezado">
        <h2>Distribuidoras registradas ({distribuidoras.length})</h2>
        <button className="btn btn-secundario" onClick={onConsultar} disabled={loading}>
          Consultar todas
        </button>
      </div>

      {distribuidoras.length === 0 ? (
        <p className="vacio">No hay distribuidoras registradas.</p>
      ) : (
        <div className="tabla-scroll">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>País</th>
                <th>Ciudad</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {distribuidoras.map((d) => (
                <tr key={d.IdDistribuidora}>
                  <td>{d.IdDistribuidora}</td>
                  <td>{d.NombreDistribuidora}</td>
                  <td>{d.Pais}</td>
                  <td>{d.Ciudad}</td>
                  <td>
                    <span className={`etiqueta ${d.Estado ? "etiqueta-activa" : "etiqueta-inactiva"}`}>
                      {d.Estado ? "Activa" : "Inactiva"}
                    </span>
                  </td>
                  <td className="acciones">
                    <button className="btn btn-mini" onClick={() => onEditar(d)} disabled={loading}>
                      Editar
                    </button>
                    <button
                      className="btn btn-mini btn-peligro"
                      onClick={() => onEliminar(d.IdDistribuidora)}
                      disabled={loading}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
