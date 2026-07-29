import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "bootstrap/dist/css/bootstrap.min.css";

const socket = io("https://muro-back.vercel.app");

const App = () => {
  const [mensajes, setMensajes] = useState([]);
  const [nombre, setNombre] = useState("");
  const [contenido, setContenido] = useState("");
  const formRef = useRef(null);

  useEffect(() => {
    fetch("/api/mensajes")
      .then((res) => res.json())
      .then((data) => setMensajes(data.mensajes));

    socket.on("nuevo-mensaje", (mensaje) => {
      setMensajes((prev) => [mensaje, ...prev]);
    });

    return () => socket.off("nuevo-mensaje");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!contenido.trim()) return;

    const body = { contenido };
    if (nombre.trim()) body.nombre = nombre.trim();

    await fetch("/api/mensajes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setContenido("");
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h1 className="text-center mb-4">Muro de los deseos</h1>

          <form ref={formRef} onSubmit={handleSubmit} className="card p-4 mb-4 shadow-sm">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Tu nombre (opcional)"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                rows="3"
                placeholder="Escribe tu deseo..."
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Publicar deseo
            </button>
          </form>

          <div className="list-group">
            {mensajes.map((m) => (
              <div key={m._id} className="list-group-item list-group-item-action">
                <div className="d-flex justify-content-between">
                  <strong>{m.nombre}</strong>
                  <small className="text-muted">
                    {new Date(m.creadoEn).toLocaleString()}
                  </small>
                </div>
                <p className="mb-0 mt-1">{m.contenido}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
