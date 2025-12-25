# 🚀 Crypto Tracker

Веб-приложение для отслеживания криптовалют в реальном времени с поддержкой поиска, избранного, смены валюты и автоматического обновления данных.

---

## 📌 Описание проекта

**Crypto Tracker** — это SPA-приложение на **React**, которое позволяет:

- просматривать список популярных криптовалют
- отслеживать изменение цен и капитализацию
- добавлять криптовалюты в избранное
- искать по названию и символу
- получать актуальные глобальные рыночные данные

Приложение корректно обрабатывает:

- ошибки сети
- лимиты API
- пустые состояния данных

---

## 🛠️ Технологии

### Frontend

- React 18
- Vite
- JavaScript (ES6+)
- CSS3

### State & Hooks

- useState
- useEffect
- useMemo
- useCallback

### Хранение данных

- LocalStorage (избранное, выбранная валюта)

### API

- CoinGecko API

---

## ✨ Функциональность

- 📊 Получение списка криптовалют
- 🌍 Глобальная рыночная статистика
- ⭐ Избранные криптовалюты (LocalStorage)
- 🔍 Поиск с debouncing
- 🔄 Автообновление данных
- ⏱ Обработка timeout запросов
- 🚫 Обработка ошибок сети и API
- ⚠️ Обработка лимита запросов (429)
- ♿ Accessibility (a11y)
- 📱 Адаптивный дизайн

---

## ⚙️ Установка и запуск

### 1️⃣ Клонировать репозиторий

```bash
git clone https://github.com/mariamorozovaa/crypto.git
cd crypto
```

### 2️⃣ Установить зависимости

```bash
npm install
```

### 3️⃣ Создать .env файл

```bash
VITE_API_KEY=your_coingecko_api_key
```

### 4️⃣ Запуск в режиме разработки

```bash
npm run dev
```

### 5️⃣ Production build

```bash
npm run build
```

## 🌐 Используемый API

CoinGecko API

## 📄 Документация:

https://www.coingecko.com/en/api/documentation

## 🚦 Лимиты запросов:

ограничены (обрабатывается статус 429)

## 🔑 Используется demo API key через environment variables

## 📁 Структура проекта

```text
src/
├── components/
│   ├── Header.jsx
│   ├── CryptoList.jsx
│   ├── CryptoCard.jsx
│   ├── FavoritesList.jsx
│   ├── Loader.jsx
│   ├── ErrorMessage.jsx
│   ├── SearchBar.jsx
│   ├── CurrencySelector.jsx
│   └── MarketStats.jsx
│
├── services/
│   └── cryptoAPI.js
│
├── utils/
│   └── localStorage.js
│
├── styles/
│   └── *.css
│
├── App.jsx
├── main.jsx
└── index.html
```

## 🚧 Возможные улучшения

📈 Графики цен (Chart.js / Recharts)
🌙 Dark / Light mode
🔔 Уведомления о росте/падении
📱 PWA поддержка
🔐 Авторизация пользователя
🧪 Тестирование (Jest / React Testing Library)

## 📎 Деплой

Приложение задеплоено на Vercel
Автоматический деплой настроен из GitHub.

## 👩‍💻 Автор

Мария Морозова
GitHub: https://github.com/mariamorozovaa
