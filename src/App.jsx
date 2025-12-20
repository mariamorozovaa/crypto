import { useState, useEffect } from "react";
import "./App.css";
import { fetchCryptoList } from "./services/cryptoAPI";
import Header from "./components/Header";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import CryptoList from "./components/CryptoList";

function App() {
  const [crypto, setCrypto] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  return (
    <div>
      {loading && <Loader />}
      <Header />
      {error && <ErrorMessage message={error} />}
      <CryptoList cryptos={crypto} />
    </div>
  );
}

export default App;
