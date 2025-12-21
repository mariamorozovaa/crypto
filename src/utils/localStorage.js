const FAVORITES_KEY = "cryptoTracker_favorites";

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
