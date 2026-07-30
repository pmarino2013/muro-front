import { useState, useEffect } from "react";
import io from "socket.io-client";
import "bootstrap/dist/css/bootstrap.min.css";
import FormApp from "./components/FormApp";
import ListApp from "./components/ListApp";
import "./App.css";

const socket = io(import.meta.env.VITE_API_URL);

const App = () => {
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    fetch("/api/mensajes")
      .then((res) => res.json())
      .then((data) => setMensajes(data.mensajes));

    socket.on("nuevo-mensaje", (mensaje) => {
      setMensajes((prev) => [mensaje, ...prev]);
    });

    return () => socket.off("nuevo-mensaje");
  }, []);

  return (
    <div className="wall-container">
      <header className="wall-header">
        <h1 className="">Muro de los Deseos✨</h1>
        <p className="wall-subtitle">Comparte tus sueños con el mundo</p>
      </header>
      <div className="wall-content">
        <aside className="postit-form">
          <h2 className="postit-form-title">Escribe tu deseo</h2>
          <FormApp />
        </aside>
        <main className="postit-wall">
          <ListApp mensajes={mensajes} />
        </main>
      </div>
    </div>
  );
};

export default App;
