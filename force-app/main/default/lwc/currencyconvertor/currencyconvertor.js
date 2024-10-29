import { LightningElement } from 'lwc';

export default class Currencyconvertor extends LightningElement {
    showOutput = false;
    convertedValue = "";
    toCurrency = "";
    fromCurrency = "";
    enteredAmount = "";
    currencyOptions = [];

    connectedCallback() {
        this.fetchSymbols();
    }

    changeHandler(event) {
        let { name, value } = event.target;
        if (name == "amount") this.enteredAmount = value;
        if (name == "fromcurr") this.fromCurrency = value;
        if (name == "tocurr") this.toCurrency = value;
    }
    clickHandler(){}
         
        async fetchSymbols() {
        let endpoint = "https://api.frankfurter.app/currencies";

        try {
            let response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error("Network response was not OK");
            }

            const data = await response.json();

            // Process the data returned from the API
            let options = [];
            for (let symbol in data) {
                options = [...options, { label: symbol, value: symbol }];
            }

            this.currencyOptions = [...options];
        } catch (error) {
            console.error( error);
        }
    }
}