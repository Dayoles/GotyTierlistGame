// RespuestaBackend.jsx – muestra la última respuesta JSON del Backend

export default function RespuestaBackend({ respuesta }) {
  return (
    <section className="tarjeta">
      <h2>Respuesta del Backend</h2>
      {!respuesta ? (
        <p className="vacio">Aún no se ha realizado ninguna operación.</p>
      ) : (
        <>
          <p className="peticion">
            <span className={`codigo ${respuesta.ok ? "codigo-ok" : "codigo-error"}`}>
              {respuesta.status === 0 ? "SIN RESPUESTA" : respuesta.status}
            </span>
            <code>
              {respuesta.metodo} {respuesta.ruta}
            </code>
          </p>
          <pre>
            {respuesta.body
              ? JSON.stringify(respuesta.body, null, 2)
              : "El Backend no respondió."}
          </pre>
        </>
      )}
    </section>
  );
}
