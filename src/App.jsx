import { useState, useEffect } from "react";
import "./App.css";
import { fetchCryptoList } from "./services/cryptoAPI";

function App() {
  const [crypto, setCrypto] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await fetchCryptoList({ currency: "usd" });
        setCrypto(data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div>
      {loading && <p>Загрузка...</p>}
      {error && <p>Ошибка</p>}
      <p>Загружено {crypto.length} монет</p>
    </div>
  );
}

export default App;
