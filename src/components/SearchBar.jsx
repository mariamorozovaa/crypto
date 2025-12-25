import "../styles/SearchBar.css";

export default function SearchBar({ value, onChange, onClear }) {
  return (
    <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
      <label htmlFor="search-bar" style={{ fontSize: "35px", marginRight: "10px" }}>
        🔍
      </label>
      <input id="search-bar" type="text" onChange={onChange} placeholder="Поиск по названию или символу..." value={value} />
      {value && <button onClick={onClear}>✖️</button>}
    </div>
  );
}
