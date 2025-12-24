const API_KEY = import.meta.env.VITE_API_KEY;

async function fetchData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status >= 500) throw new Error("Сервер временно недоступен");
      if (response.status === 429) throw new Error("Превышен лимит запросов");
    }

    const data = await response.json();
    return data;
  } catch (e) {
    if (!navigator.onLine) {
      throw new Error("Нет подключения к интернету");
    }
    throw e;
  }
}

export function fetchCryptoList(currency = "usd") {
  return fetchData(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&price_change_percentage=24h&per_page=100&sparkline=false&page=1&order=market_cap_desc&x_cg_demo_api_key=${API_KEY}`
  );
}

export function fetchGlobalData() {
  return fetchData(`https://api.coingecko.com/api/v3/global?x_cg_demo_api_key=${API_KEY}`);
}
