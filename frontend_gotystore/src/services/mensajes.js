// mensajes.js
// Convierte el resultado de una petición en el mensaje que ve el usuario.

export function construirMensaje(r) {
  switch (r.tipo) {
    case "exito":
      return {
        tipo: "exito",
        titulo: "✓ Operación realizada correctamente",
        detalle: r.message,
      };
    case "noEncontrado":
      return {
        tipo: "advertencia",
        titulo: "⚠ Distribuidora no encontrada",
        detalle: r.message,
      };
    case "solicitud":
      return {
        tipo: "advertencia",
        titulo: "⚠ Solicitud incorrecta",
        detalle: r.message,
      };
    case "validacion":
      return {
        tipo: "error",
        titulo: "✕ Datos no válidos",
        detalle: r.message,
        errores: Array.isArray(r.data) ? r.data : [],
      };
    case "conexion":
      return {
        tipo: "error",
        titulo: "✕ No fue posible conectarse con el Backend",
        detalle: "Verifica que el servidor FastAPI esté corriendo en http://127.0.0.1:7000",
      };
    default:
      return {
        tipo: "error",
        titulo: "✕ Error del servidor",
        detalle: r.message || "Ocurrió un error inesperado",
      };
  }
}
