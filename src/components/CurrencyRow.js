import React from 'react';

export default function CurrencyRow({
    currencyOptions,
    selectCurrency,
    onChangeCurrency,
    amount,
    onChangeAmount,
}) {
    return (
        <div className="currencyRow">
            <input
                type="number"
                className="inputCurrency"
                value={amount}
                onChange={onChangeAmount}
            />
            <select value={selectCurrency} onChange={onChangeCurrency}>
                {currencyOptions.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}
