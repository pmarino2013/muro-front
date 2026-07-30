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
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Tu nombre</label>
        <input
          type="text"
          className="form-input"
          placeholder="Anónimo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Tu deseo</label>
        <textarea
          className="form-input form-textarea"
          placeholder="¿Qué deseas hoy?"
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="form-submit">
        Publica tu deseo✨
      </button>
    </form>
  );
};

export default FormApp;
