import { useState, useEffect } from "react";
import "./App.css";
import { fetchCryptoList } from "./services/cryptoAPI";

function App() {
  const [crypto, setCrypto] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    function loadData() {
      setLoading(true);
      setCrypto(fetchCryptoList());
    }
    loadData();
  }, []);

  return <div>{loading && <p>Загрузка...</p>}</div>;
}

export default App;
