const API_KEY = import.meta.env.VITE_API_KEY;

export async function fetchCryptoList(currency = "usd") {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&price_change_percentage=24h&per_page=100&sparkline=false&page=1&order=market_cap_desc&x_cg_demo_api_key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Ошибка загрузки данных о криптовалютах");
  }

  const data = await response.json();
  console.log(data);
  return data;
}

export async function fetchGlobalData() {
  const response = await fetch(`https://api.coingecko.com/api/v3/global?x_cg_demo_api_key=${API_KEY}`);

  if (!response.ok) {
    throw new Error("Ошибка загрузки данных статистики");
  }

  const data = await response.json();
  console.log(data);
  return data;
}
