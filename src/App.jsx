import { useState, useEffect } from "react";
import "./App.css";
import { fetchCryptoList } from "./services/cryptoAPI";
import Header from "./components/Header";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import CryptoList from "./components/CryptoList";
import SearchBar from "./components/SearchBar";
import { getFavorites, addToFavorites, removeFromFavorites, isFavorite } from "./utils/localStorage";
import FavoritesList from "./components/FavoritesList";

function App() {
  const [crypto, setCrypto] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        setError(null);
        setLoading(true);
        const data = await fetchCryptoList();
        setCrypto(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    function loadFavorites() {
      try {
        const data = getFavorites();
        setFavorites(data);
      } catch (e) {
        setError(e.message);
      }
    }
    loadFavorites();
  }, []);

  const filteredCrypto = crypto.filter((coin) => {
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    return coin.name.toLowerCase().includes(query) || coin.symbol.toLowerCase().includes(query);
  });

  function handleSearch(value) {
    setSearchQuery(value);
  }

  function handleToggleFavorite(cryptoId) {
    if (isFavorite(cryptoId)) {
      removeFromFavorites(cryptoId);
    } else {
      addToFavorites(cryptoId);
    }
    setFavorites(getFavorites());
  }

  return (
    <div className="app">
      {loading && <Loader />}
      <Header />
      <SearchBar value={searchQuery} onChange={(e) => handleSearch(e.target.value)} onClear={() => setSearchQuery("")} />
      {!loading && filteredCrypto.length === 0 && crypto.length > 0 && <ErrorMessage message={"Ничего не найдено"} />}
      {error && <ErrorMessage message={error} />}
      <FavoritesList filteredCryptos={filteredCrypto} favorites={favorites} onToggleFavorite={handleToggleFavorite} />
      <CryptoList cryptos={filteredCrypto} favorites={favorites} onToggleFavorite={handleToggleFavorite} />
    </div>
  );
}

export default App;
