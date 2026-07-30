const POSTIT_COLORS = [
  "postit-yellow",
  "postit-pink",
  "postit-blue",
  "postit-green",
  "postit-purple",
  "postit-orange",
];

const AVATAR_COLORS = [
  "avatar-yellow",
  "avatar-pink",
  "avatar-blue",
  "avatar-green",
  "avatar-purple",
  "avatar-red",
];

const ROTATIONS = [-2, 1.5, -1, 2, -1.5, 1, -2.5, 0.5];

const hashString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
};

const getPostitColor = (id) => {
  if (!id) return POSTIT_COLORS[0];
  return POSTIT_COLORS[hashString(id) % POSTIT_COLORS.length];
};

const getAvatarColor = (name) => {
  if (!name) return AVATAR_COLORS[0];
  return AVATAR_COLORS[hashString(name) % AVATAR_COLORS.length];
};

const getRotation = (id) => {
  if (!id) return ROTATIONS[0];
  return ROTATIONS[hashString(id) % ROTATIONS.length];
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
        <p className="postit-empty-text">
          Aún no hay deseos. Sé el primero en compartir el tuyo
        </p>
      </div>
    );
  }

  return (
    <>
      {mensajes.map((m) => (
        <article
          key={m._id}
          className={`postit-card ${getPostitColor(m._id)}`}
          style={{ "--card-rotation": `${getRotation(m._id)}deg` }}
        >
          <div className="postit-header">
            <div className={`avatar ${getAvatarColor(m.nombre)}`}>
              {getInitials(m.nombre)}
            </div>
            <span className="avatar-name">{m.nombre || "Anónimo"}✨</span>
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
