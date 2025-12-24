import CryptoCard from "./CryptoCard";
import "../styles/FavoritesList.css";

export default function FavoritesList({ filteredCryptos, onToggleFavorite }) {
  return (
    <div>
      <div style={{ display: "flex", overflowX: "auto", gap: "15px" }}>
        {filteredCryptos.map((crypto) => (
          <div key={crypto.id} className="crypto-card-favorite">
            <CryptoCard crypto={crypto} isFavorite={true} onToggleFavorite={onToggleFavorite} />
          </div>
        ))}
      </div>
    </div>
  );
}
