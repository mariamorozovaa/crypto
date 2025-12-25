import "../styles/ErrorMessage.css";

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-state">
      <p>⚠️ Ошибка</p>
      <p style={{ color: "red" }}>{message}</p>
      {onRetry && <button onClick={onRetry}>Попробовать снова</button>}
    </div>
  );
}
