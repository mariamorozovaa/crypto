import "../styles/CryptoCard.css";

export default function CryptoCard({ crypto, isFavorite, onToggleFavorite }) {
  function formatPrice(price) {
    if (price === null || price === undefined) return "—";
    if (price > 1000000000) return (price / 1000000000).toFixed(2) + "B";
    if (price > 1000000) return (price / 1000000).toFixed(2) + "M";

    return price.toFixed(2);
  }

  return (
    <div className="crypto-card">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
        <img className="crypto-logo" src={crypto.image} alt="logo-crypto" />
        <h3>
          {crypto.name} ({crypto.symbol}){" "}
        </h3>
        <button
          onClick={() => onToggleFavorite(crypto.id)}
          style={{ color: "orange", fontSize: "25px", background: "white", border: "none", cursor: "pointer" }}>
          {isFavorite ? "★" : "☆"}
        </button>
      </div>

      <p>Текущая цена: {formatPrice(crypto.current_price)}</p>

      {crypto.price_change_percentage_24h > 0 ? (
        <p>
          Изменение за 24 часа:
          <span style={{ color: "green" }}> +{formatPrice(crypto.price_change_percentage_24h)}%</span>
        </p>
      ) : (
        <p>
          Изменение за 24 часа:
          <span style={{ color: "red" }}> {formatPrice(crypto.price_change_percentage_24h)}%</span>
        </p>
      )}

      <p>Рыночная капитализация: {formatPrice(crypto.market_cap)}</p>
      <p>Объём торгов: {formatPrice(crypto.total_volume)}</p>
    </div>
  );
}
