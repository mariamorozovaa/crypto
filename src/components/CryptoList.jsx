import CryptoCard from "./CryptoCard";
import "../styles/CryptoList.css";
import { useState } from "react";

export default function CryptoList({ cryptos }) {
  const [favorites, setFavorites] = useState({});

  function handleToggleFavorite(id) {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  return (
    <div className="crypto-list">
      {cryptos.map((crypto) => (
        <CryptoCard
          key={crypto.id}
          crypto={crypto}
          isFavorite={!!favorites[crypto.id]}
          onToggleFavorite={() => handleToggleFavorite(crypto.id)}
        />
      ))}
    </div>
  );
}
