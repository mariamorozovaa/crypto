const FAVORITES_KEY = "cryptoTracker_favorites";
const CURRENCY_KEY = "cryptoTracker_currency";

export function getFavorites() {
  try {
    const arrFavorites = localStorage.getItem(FAVORITES_KEY);
    return arrFavorites ? JSON.parse(arrFavorites) : [];
  } catch (e) {
    console.error("Ошибка чтения из localStorage", e.message);
    return [];
  }
}

export function addToFavorites(cryptoId) {
  try {
    const favorites = getFavorites();
    if (favorites.includes(cryptoId)) return;
    const updatedFavorites = [...favorites, cryptoId];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  } catch (e) {
    console.error(e.message);
  }
}

export function removeFromFavorites(cryptoId) {
  try {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter((id) => id !== cryptoId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  } catch (e) {
    console.error(e.message);
  }
}

export function isFavorite(cryptoId) {
  try {
    const favorites = getFavorites();
    return favorites.includes(cryptoId);
  } catch (e) {
    console.error(e.message);
  }
}

export function getCurrency() {
  try {
    const currCurrency = localStorage.getItem(CURRENCY_KEY);
    return currCurrency ? JSON.parse(currCurrency) : "usd";
  } catch (e) {
    console.error("Ошибка чтения из localStorage", e.message);
    return "usd";
  }
}

export function saveCurrency(currency) {
  try {
    localStorage.setItem(CURRENCY_KEY, JSON.stringify(currency));
  } catch (e) {
    console.error("Ошибка чтения из localStorage", e.message);
    return "usd";
  }
}

export function getCurrencySymbol() {
  const currCurrency = getCurrency();
  switch (currCurrency) {
    case "eur":
      return "€";
    case "rub":
      return "₽";
    default:
      return "$";
  }
}
