import { useState, useEffect, useMemo, useCallback } from "react";
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
  const [globalData, setGlobalData] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);

  async function loadData({ isSilentRefresh = false } = {}) {
    try {
      setError(null);
      if (!isSilentRefresh) setLoading(true);

      const [cryptoData, globalData] = await Promise.all([fetchCryptoList(currency), fetchGlobalData()]);
      setCrypto(cryptoData);
      setGlobalData(globalData);
      setLastUpdate(new Date().toLocaleTimeString());
      setIsRateLimited(false);
    } catch (e) {
      setError(e.message);

      if (e.message === "Превышен лимит запросов") {
        setIsRateLimited(true);
      }
    } finally {
      if (!isSilentRefresh) setLoading(false);
    }
  }

  useEffect(() => {
    async function updateData() {
      await loadData({ isSilentRefresh: false });
    }
    updateData();
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

  useEffect(() => {
    const intervalTime = isRateLimited ? 120000 : 60000;
    const interval = setInterval(() => {
      loadData({ isSilentRefresh: true });
    }, intervalTime);
    return () => clearInterval(interval);
  }, [currency, isRateLimited]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 400);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  const handleRefresh = useCallback(() => {
    loadData({ isSilentRefresh: false });
  }, []);

  const filteredCrypto = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();
    if (!query) return crypto;

    return crypto.filter((coin) => coin.name.toLowerCase().includes(query) || coin.symbol.toLowerCase().includes(query));
  }, [crypto, debouncedSearch]);

  const favoriteCryptos = useMemo(() => {
    return crypto.filter((coin) => favorites.includes(coin.id));
  }, [crypto, favorites]);

  const handleSearch = useCallback((value) => {
    setSearchQuery(value);
  }, []);

  const handleToggleFavorite = useCallback((cryptoId) => {
    if (isFavorite(cryptoId)) {
      removeFromFavorites(cryptoId);
    } else {
      addToFavorites(cryptoId);
    }
    setFavorites(getFavorites());
  }, []);

  const handleCurrencyChange = useCallback((currency) => {
    saveCurrency(currency);
    setCurrency(currency);
  }, []);

  return (
    <div className="app">
      {loading && <Loader />}

      <header>
        <Header />
        <button className="refresh" onClick={handleRefresh} disabled={loading || isRateLimited} aria-label="Обновить данные">
          🔄 Обновить
        </button>
        <p aria-live="polite">Обновлено в {lastUpdate}</p>
        <CurrencySelector currency={currency} onChange={(e) => handleCurrencyChange(e.target.value)} />
      </header>

      <main>
        <section aria-labelledby="market-stats-title">
          <h2 id="market-stats-title">Статистика</h2>
          <MarketStats globalData={globalData} currency={currency} />
        </section>

        <section aria-labelledby="search-title">
          <h2 id="search-title">Поиск криптовалют</h2>
          <SearchBar value={searchQuery} onChange={(e) => handleSearch(e.target.value)} onClear={() => setSearchQuery("")} />
        </section>
        <div role="alert">
          {!loading && filteredCrypto.length === 0 && debouncedSearch && (
            <ErrorMessage message={`Ничего не найдено по запросу "${debouncedSearch}"`} />
          )}
          {!loading && crypto.length === 0 && !error && (
            <ErrorMessage message="Нет данных для отображения" onRetry={handleRefresh} />
          )}
          {error && <ErrorMessage message={error} onRetry={!isRateLimited ? handleRefresh : undefined} />}
        </div>
        {favorites.length > 0 && (
          <section aria-labelledby="crypto-favorites-title">
            <h2 id="crypto-favorites-title">Избранное</h2>
            <FavoritesList filteredCryptos={favoriteCryptos} favorites={favorites} onToggleFavorite={handleToggleFavorite} />
          </section>
        )}
        <section aria-labelledby="crypto-list-title">
          <h2 id="crypto-list-title">Список криптовалют</h2>
          <CryptoList cryptos={filteredCrypto} favorites={favorites} onToggleFavorite={handleToggleFavorite} />
        </section>
      </main>
    </div>
  );
}

export default App;
