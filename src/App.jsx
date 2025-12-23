import { useState, useEffect } from "react";
import "./App.css";
import { fetchCryptoList, fetchGlobalData } from "./services/cryptoAPI";
import Header from "./components/Header";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import CryptoList from "./components/CryptoList";
import SearchBar from "./components/SearchBar";
import { getFavorites, addToFavorites, removeFromFavorites, isFavorite, getCurrency, saveCurrency } from "./utils/localStorage";
import FavoritesList from "./components/FavoritesList";
import CurrencySelector from "./components/CurrencySelector";
import MarketStats from "./components/MarketStats";

function App() {
  const [crypto, setCrypto] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [currency, setCurrency] = useState(getCurrency());
  const [globalData, setGlobalData] = useState(getCurrency());

  useEffect(() => {
    async function loadData() {
      try {
        setError(null);
        setLoading(true);
        const [cryptoData, globalData] = await Promise.all([fetchCryptoList(currency), fetchGlobalData()]);
        setCrypto(cryptoData);
        setGlobalData(globalData);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [currency]);

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

  function handleCurrencyChange(currency) {
    saveCurrency(currency);
    setCurrency(currency);
  }

  return (
    <div className="app">
      {!loading && filteredCrypto.length === 0 && crypto.length > 0 && <ErrorMessage message={"Ничего не найдено"} />}
      {error && <ErrorMessage message={error} />}
      {loading && <Loader />}

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Header />
        <CurrencySelector currency={currency} onChange={(e) => handleCurrencyChange(e.target.value)} />
      </div>
      <MarketStats globalData={globalData} currency={currency} />
      <SearchBar value={searchQuery} onChange={(e) => handleSearch(e.target.value)} onClear={() => setSearchQuery("")} />
      <FavoritesList filteredCryptos={filteredCrypto} favorites={favorites} onToggleFavorite={handleToggleFavorite} />
      <CryptoList cryptos={filteredCrypto} favorites={favorites} onToggleFavorite={handleToggleFavorite} />
    </div>
  );
}

export default App;
