// Mensaje.jsx – muestra mensajes de éxito, advertencia o error

export default function Mensaje({ mensaje }) {
  if (!mensaje) return null;

  return (
    <div className={`mensaje mensaje-${mensaje.tipo}`} role="alert">
      <strong>{mensaje.titulo}</strong>
      {mensaje.detalle && <p>{mensaje.detalle}</p>}
      {mensaje.errores?.length > 0 && (
        <ul>
          {mensaje.errores.map((e, i) => (
            <li key={i}>
              <code>{e.campo}</code>: {e.detalle}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
