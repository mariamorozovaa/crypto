import "../styles/CryptoCard.css";
import { getCurrencySymbol } from "../utils/localStorage";
import { formatNumber } from "../utils/formatData";

export default function CryptoCard({ crypto, isFavorite, onToggleFavorite }) {
  return (
    <div className="crypto-card">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
        <img className="crypto-logo" src={crypto.image} alt={`Логотип ${crypto.name}`} />
        <h3>
          {crypto.name} ({crypto.symbol}){" "}
        </h3>
        <button
          onClick={() => onToggleFavorite(crypto.id)}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
          style={{ color: "orange", fontSize: "25px", background: "none", border: "none", cursor: "pointer" }}>
          {isFavorite ? "★" : "☆"}
        </button>
      </div>

      <p>
        Текущая цена: {formatNumber(crypto.current_price)}
        {getCurrencySymbol()}
      </p>

      {crypto.price_change_percentage_24h > 0 ? (
        <p>
          Изменение за 24 часа: <span className="price-up">+{formatNumber(crypto.price_change_percentage_24h)}%</span>
        </p>
      ) : (
        <p>
          Изменение за 24 часа: <span className="price-down"> {formatNumber(crypto.price_change_percentage_24h)}%</span>
        </p>
      )}

      <p>Рыночная капитализация: {formatNumber(crypto.market_cap)}</p>
      <p>Объём торгов: {formatNumber(crypto.total_volume)}</p>
    </div>
  );
}
