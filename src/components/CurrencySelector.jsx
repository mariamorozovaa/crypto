import "../styles/CurrencySelector.css";

export default function CurrencySelector({ currency, onChange }) {
  return (
    <select name="currency" id="currency" onChange={onChange} value={currency}>
      <option value="usd">USD</option>
      <option value="eur">EUR</option>
      <option value="rub">RUB</option>
    </select>
  );
}
