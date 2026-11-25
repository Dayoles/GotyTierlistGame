// distribuidoraService.js
// Centraliza TODAS las peticiones HTTP hacia el Backend FastAPI.

import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:7000";

const api = axios.create({
  baseURL: API_URL,
  timeout: 8000,
  headers: { "Content-Type": "application/json" },
  // Axios no lanza error por 400, 404, 422, etc.: los analizamos nosotros.
  validateStatus: () => true,
});

// Convierte el código HTTP en un tipo fácil de usar en la interfaz
function tipoDeEstado(status) {
  if (status >= 200 && status < 300) return "exito";
  if (status === 404) return "noEncontrado";
  if (status === 400) return "solicitud";
  if (status === 422) return "validacion";
  return "servidor";
}

// Ejecuta una petición y devuelve SIEMPRE el mismo formato de resultado
async function ejecutar(metodo, ruta, datos) {
  try {
    const respuesta = await api.request({ method: metodo, url: ruta, data: datos });
    const body = respuesta.data ?? null;
    return {
      ok: respuesta.status >= 200 && respuesta.status < 300,
      status: respuesta.status,
      tipo: tipoDeEstado(respuesta.status),
      message: body?.message ?? "",
      data: body?.data ?? null,
      metodo: metodo.toUpperCase(),
      ruta,
      body,
    };
  } catch (error) {
    // Sin respuesta del servidor: Backend apagado, sin red o tiempo agotado
    return {
      ok: false,
      status: 0,
      tipo: "conexion",
      message: "No fue posible conectarse con el Backend",
      data: null,
      metodo: metodo.toUpperCase(),
      ruta,
      body: null,
    };
  }
}

// GET /  -> verificación de estado
export const verificarEstado = () => ejecutar("get", "/");

// GET /api/distribuidoras  -> consultar todas
export const consultarTodas = () => ejecutar("get", "/api/distribuidoras");

// GET /api/distribuidoras/{id}  -> consultar por ID
export const consultarPorId = (id) =>
  ejecutar("get", `/api/distribuidoras/${encodeURIComponent(id)}`);

// POST /api/distribuidoras  -> ingresar
export const ingresar = (datos) => ejecutar("post", "/api/distribuidoras", datos);

// PUT /api/distribuidoras/{id}  -> modificar
export const modificar = (id, datos) =>
  ejecutar("put", `/api/distribuidoras/${encodeURIComponent(id)}`, datos);

// DELETE /api/distribuidoras/{id}  -> eliminar
export const eliminar = (id) =>
  ejecutar("delete", `/api/distribuidoras/${encodeURIComponent(id)}`);
