import "../styles/MarketStats.css";
import { formatNumber } from "../utils/formatData";

export default function MarketStats({ globalData, currency }) {
  return (
    <div className="market-stats">
      <p>
        💰 Общая капитализация: {formatNumber(globalData?.data?.total_market_cap?.[currency])} {currency}
      </p>
      <p>💸 Объём торгов за 24ч: {formatNumber(globalData?.data?.market_cap_change_percentage_24h_usd)} usd</p>
      <p>⚡ Доминация BTC: {formatNumber(globalData?.data?.market_cap_percentage?.btc)}%</p>
      <p>💱 Доминация ETH: {formatNumber(globalData?.data?.market_cap_percentage?.eth)}%</p>
      <p>🪙 Активные криптовалюты: {globalData?.data?.active_cryptocurrencies}</p>
      <p>🏪 Количество рынков: {globalData?.data?.markets}</p>
    </div>
  );
}
