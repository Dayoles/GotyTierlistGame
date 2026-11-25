// App.jsx – pantalla principal de GOTYStore (CRUD de Distribuidoras)

import { useEffect, useRef, useState } from "react";
import * as api from "./services/distribuidoraService";
import { construirMensaje } from "./services/mensajes";
import Mensaje from "./components/Mensaje";
import DistribuidoraForm from "./components/DistribuidoraForm";
import DistribuidoraSearch from "./components/DistribuidoraSearch";
import DistribuidoraList from "./components/DistribuidoraList";
import RespuestaBackend from "./components/RespuestaBackend";

const SIN_ID = {
  tipo: "advertencia",
  titulo: "⚠ Falta el ID",
  detalle: "Escribe el ID de la distribuidora para realizar esta operación.",
};

export default function App() {
  const [distribuidoras, setDistribuidoras] = useState([]);
  const [encontrada, setEncontrada] = useState(null);
  const [paraEditar, setParaEditar] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  const [respuesta, setRespuesta] = useState(null);
  const [loading, setLoading] = useState(false);
  const [estadoApi, setEstadoApi] = useState("verificando");
  const formModificar = useRef(null);

  const registrar = (r) => {
    setRespuesta(r);
    setEstadoApi(r.tipo === "conexion" ? "desconectado" : "conectado");
  };

  // Ejecuta una operación mostrando "cargando", la respuesta y el mensaje
  const ejecutar = async (peticion) => {
    setLoading(true);
    setMensaje(null);
    const r = await peticion();
    registrar(r);
    setMensaje(construirMensaje(r));
    setLoading(false);
    return r;
  };

  // Actualiza la tabla sin tocar el mensaje ni la respuesta mostrados
  const refrescarLista = async () => {
    const r = await api.consultarTodas();
    if (r.ok) setDistribuidoras(r.data);
  };

  // Al abrir la aplicación: verificar el Backend y cargar la lista
  useEffect(() => {
    (async () => {
      const r = await api.verificarEstado();
      setEstadoApi(r.ok ? "conectado" : "desconectado");
      if (r.ok) {
        await refrescarLista();
      } else {
        setMensaje(construirMensaje(r));
      }
    })();
  }, []);

  const consultarTodas = async () => {
    const r = await ejecutar(api.consultarTodas);
    if (r.ok) setDistribuidoras(r.data);
  };

  const consultarPorId = async (id) => {
    if (!String(id).trim()) return setMensaje(SIN_ID);
    const r = await ejecutar(() => api.consultarPorId(id.trim()));
    setEncontrada(r.ok ? r.data : null);
  };

  const ingresar = async (_id, datos) => {
    const r = await ejecutar(() => api.ingresar(datos));
    if (r.ok) await refrescarLista();
    return r;
  };

  const modificar = async (id, datos) => {
    if (!String(id).trim()) {
      setMensaje(SIN_ID);
      return null;
    }
    const r = await ejecutar(() => api.modificar(id.trim(), datos));
    if (r.ok) {
      await refrescarLista();
      if (encontrada?.IdDistribuidora === r.data.IdDistribuidora) setEncontrada(r.data);
    }
    return r;
  };

  const eliminar = async (id) => {
    if (!String(id).trim()) return setMensaje(SIN_ID);
    const r = await ejecutar(() => api.eliminar(String(id).trim()));
    if (r.ok) {
      await refrescarLista();
      if (encontrada?.IdDistribuidora === r.data.IdDistribuidora) setEncontrada(null);
    }
  };

  const editar = (distribuidora) => {
    setParaEditar({ ...distribuidora });
    setMensaje(null);
    formModificar.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const textoEstado = {
    verificando: "Verificando Backend...",
    conectado: "Backend conectado",
    desconectado: "Backend desconectado",
  }[estadoApi];

  return (
    <div className="app">
      <header className="encabezado">
        <div>
          <h1>🏆 GOTYStore</h1>
          <p>Distribuidoras de videojuegos Game of the Year</p>
        </div>
        <div className={`estado-api estado-${estadoApi}`}>
          <span className="punto" />
          {textoEstado}
          <small>{api.API_URL}</small>
        </div>
      </header>

      <div className="zona-mensaje">
        <Mensaje mensaje={mensaje} />
      </div>

      <main>
        <div className="rejilla">
          <DistribuidoraForm
            titulo="Ingresar distribuidora"
            textoBoton="Ingresar"
            limpiarAlExito
            loading={loading}
            onSubmit={ingresar}
          />

          <div ref={formModificar}>
            <DistribuidoraForm
              titulo="Modificar distribuidora"
              textoBoton="Modificar"
              conId
              valoresIniciales={paraEditar}
              loading={loading}
              onSubmit={modificar}
            />
          </div>

          <DistribuidoraSearch
            encontrada={encontrada}
            onConsultar={consultarPorId}
            onEliminar={eliminar}
            loading={loading}
          />
        </div>

        <DistribuidoraList
          distribuidoras={distribuidoras}
          onConsultar={consultarTodas}
          onEditar={editar}
          onEliminar={eliminar}
          loading={loading}
        />

        <RespuestaBackend respuesta={respuesta} />
      </main>

      <footer>GOTYStore · Laboratorio 3 · React + Vite + FastAPI</footer>
    </div>
  );
}
