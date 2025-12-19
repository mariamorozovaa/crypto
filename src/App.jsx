import { useState, useEffect } from "react";
import "./App.css";
import { fetchCryptoList } from "./services/cryptoAPI";
import Header from "./components/Header";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [crypto, setCrypto] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        setError(null);
        setLoading(true);
        const data = await fetchCryptoList({ currency: "usd" });
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
      <Header />
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      <p>Загружено {crypto.length} монет</p>
    </div>
  );
}

export default App;
