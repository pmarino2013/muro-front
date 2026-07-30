const AVATAR_COLORS = [
  "avatar-yellow",
  "avatar-pink",
  "avatar-blue",
  "avatar-green",
  "avatar-purple",
  "avatar-red",
];

const getAvatarColor = (name) => {
  if (!name) return AVATAR_COLORS[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
};

const getInitials = (name) => {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const ListApp = ({ mensajes }) => {
  if (mensajes.length === 0) {
    return (
      <div className="postit-empty">
        <div className="postit-empty-icon">📝</div>
        <p className="postit-empty-text">Aún no hay deseos. Sé el primero en compartir el tuyo</p>
      </div>
    );
  }

  return (
    <>
      {mensajes.map((m) => (
        <article key={m._id} className="postit-card">
          <div className="postit-header">
            <div className={`avatar ${getAvatarColor(m.nombre)}`}>
              {getInitials(m.nombre)}
            </div>
            <span className="avatar-name">{m.nombre || "Anónimo"}</span>
          </div>
          <p className="postit-content">{m.contenido}</p>
          <footer className="postit-footer">
            <time className="postit-date">
              {new Date(m.creadoEn).toLocaleString()}
            </time>
          </footer>
        </article>
      ))}
    </>
  );
};

export default ListApp;
