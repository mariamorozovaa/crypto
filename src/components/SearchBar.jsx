import "../styles/SearchBar.css";

export default function SearchBar({ value, onChange, onClear }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <p style={{ fontSize: "35px", marginRight: "10px" }}>🔍</p>
      <input
        className="search-bar"
        type="text"
        onChange={onChange}
        placeholder="Поиск по названию или символу..."
        value={value}
      />
      {value && <button onClick={onClear}>✖️</button>}
    </div>
  );
}
