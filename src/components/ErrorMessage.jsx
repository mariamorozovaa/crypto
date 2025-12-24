export default function ErrorMessage({ message, onRetry }) {
  return (
    <div>
      <p>⚠️ Ошибка</p>
      <p style={{ color: "red" }}>{message}</p>
      {onRetry && <button onClick={onRetry}>Попробовать снова</button>}
    </div>
  );
}
