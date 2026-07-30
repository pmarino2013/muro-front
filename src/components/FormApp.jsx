import { useRef, useState } from "react";

const FormApp = () => {
  const [nombre, setNombre] = useState("");
  const [contenido, setContenido] = useState("");
  const formRef = useRef(null);

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
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="card p-4 mb-4 shadow-sm"
    >
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
  );
};

export default FormApp;
