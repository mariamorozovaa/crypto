import CryptoCard from "./CryptoCard";
import "../styles/FavoritesList.css";

export default function FavoritesList({ filteredCryptos, favorites, onToggleFavorite }) {
  return (
    <div>
      <h2>Избранное</h2>
      <div style={{ display: "flex", overflowX: "auto", gap: "15px" }}>
        {filteredCryptos.map((crypto) =>
          favorites.includes(crypto.id) ? (
            <div key={crypto.id} className="crypto-card-favorite">
              <CryptoCard crypto={crypto} isFavorite={true} onToggleFavorite={onToggleFavorite} />
            </div>
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );
}
