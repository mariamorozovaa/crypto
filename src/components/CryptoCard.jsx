import "../styles/CryptoCard.css";

export default function CryptoCard({ crypto, isFavorite, onToggleFavorite }) {
  function formatPrice(price) {
    if (price > 1000000000) return (price / 1000000000).toFixed(2) + "B";
    if (price > 1000000) return (price / 1000000).toFixed(2) + "M";
    else return price.toFixed(2);
  }

  return (
    <div className="crypto-card">
      <img className="crypto-logo" src={crypto.image} alt="logo-crypto" />
      <p>
        Название: {crypto.name} ({crypto.symbol}) {isFavorite && <span>⭐️</span>}
      </p>
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
      <button onClick={onToggleFavorite}>{!isFavorite ? "Добавить в избранное" : "Удалить из избранного"}</button>
    </div>
  );
}
