export default function ErrorMessage({ message }) {
  return (
    <div>
      <p>⚠️ Ошибка</p>
      <p style={{ color: "red" }}>{message}</p>
    </div>
  );
}
