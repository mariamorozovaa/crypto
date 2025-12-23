import CryptoCard from "./CryptoCard";
import "../styles/CryptoList.css";

export default function CryptoList({ cryptos, favorites, onToggleFavorite }) {
  return (
    <div>
      <h2>Криптовалюты</h2>
      <div className="crypto-list">
        {cryptos.map((crypto) => (
          <CryptoCard
            key={crypto.id}
            crypto={crypto}
            isFavorite={favorites.includes(crypto.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}
