import { useState, useEffect } from "react";
import io from "socket.io-client";
import "bootstrap/dist/css/bootstrap.min.css";
import FormApp from "./components/FormApp";
import ListApp from "./components/ListApp";

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
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h1 className="text-center mb-4">Muro de los deseos</h1>
          <FormApp />
          <ListApp mensajes={mensajes} />
        </div>
      </div>
    </div>
  );
};

export default App;
