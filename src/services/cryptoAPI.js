export async function fetchCryptoList({ currency = "usd" } = {}) {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&price_change_percentage=24h&per_page=100&sparkline=false&page=1&order=market_cap_desc&x_cg_demo_api_key=CG-59fFuTyhfyvqHNncCfvAWqno`
    );

    if (!response.ok) {
      throw new Error("Ошибка загрузки");
    }
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
}
