const ListApp = ({ mensajes }) => {
  return (
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
  );
};

export default ListApp;
