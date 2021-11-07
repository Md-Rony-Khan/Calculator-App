import React, { useEffect, useState } from 'react';
import CurrencyRow from './CurrencyRow';

const BASE_URL = 'http://data.fixer.io/api/latest';
const KEY = 'ad3737d0344bb3ac34810d26a3c475bc';

// const URL = 'http://api.exchangeratesapi.io/v1/latest?access_key=ad3737d0344bb3ac34810d26a3c475bc';

// const XURL =('https://free.currconv.com/api/v7/convert?q=USD_PHP&compact=ultra&apiKey=87081f8914f1589a4df9');

export default function Currency() {
    const [currencyOptions, setCurrencyOptions] = useState([]);
    const [toCurrency, setToCurrency] = useState();
    const [fromCurrency, setFromCurrency] = useState();
    const [exchangeRates, setExchangeRates] = useState();
    const [amount, setAmount] = useState(1);
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

    let toAmount;
    let fromAmount;
    if (amountInFromCurrency) {
        fromAmount = amount;
        toAmount = amount * exchangeRates;
    } else {
        toAmount = amount;
        fromAmount = amount / exchangeRates;
    }

    console.log(currencyOptions);
    console.log(exchangeRates);
    useEffect(() => {
        fetch(`${BASE_URL}?access_key=${KEY}`)
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                const firstCurrency = Object.keys(data.rates)[0];
                setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
                setFromCurrency(data.base);
                setToCurrency(firstCurrency);
                setExchangeRates(data.rates[firstCurrency]);
            });
    }, []);

    useEffect(() => {
        if (fromCurrency != null && toCurrency != null) {
            fetch(`${BASE_URL}?access_key=${KEY}&base=${fromCurrency}&symbols=${toCurrency}`)
                .then((res) => res.json())
                .then((data) => setExchangeRates(data.rates[toCurrency]));
        }
    }, [fromCurrency, toCurrency]);

    const handleFromAmountChange = (e) => {
        setAmount(e.target.value);
        setAmountInFromCurrency(true);
    };
    const handleToAmountChange = (e) => {
        setAmount(e.target.value);
        setAmountInFromCurrency(false);
    };

    return (
        <div className="currency">
            <h1>Convert</h1>
            <CurrencyRow
                currencyOptions={currencyOptions}
                selectCurrency={fromCurrency}
                onChangeCurrency={(e) => setFromCurrency(e.target.value)}
                amount={fromAmount}
                onChangeAmount={handleFromAmountChange}
            />
            <div className="equal">=</div>
            <CurrencyRow
                currencyOptions={currencyOptions}
                selectCurrency={toCurrency}
                onChangeCurrency={(e) => setToCurrency(e.target.value)}
                amount={toAmount}
                onChangeAmount={handleToAmountChange}
            />
        </div>
    );
}
