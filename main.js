const apiURL = "https://api.exchangerate-api.com/v4/latest/USD";

async function loadCurrencies() {
    let fromSelect = document.getElementById("fromCurrency");
    let toSelect = document.getElementById("toCurrency");

    try {
        let response = await fetch(apiURL);
        let data = await response.json();
        let currencies = Object.keys(data.rates);

        currencies.forEach(currency => {
            let option1 = document.createElement("option");
            option1.value = currency;
            option1.text = currency;
            fromSelect.appendChild(option1);

            let option2 = document.createElement("option");
            option2.value = currency;
            option2.text = currency;
            toSelect.appendChild(option2);
        });

        // تعيين القيم الافتراضية
        fromSelect.value = "USD";
        toSelect.value = "EGP";

    } catch (error) {
        console.error("خطأ في تحميل العملات:", error);
    }
}

async function convertCurrency() {
    let amount = document.getElementById("amount").value;
    let fromCurrency = document.getElementById("fromCurrency").value;
    let toCurrency = document.getElementById("toCurrency").value;
    let resultElement = document.getElementById("result");

    if (amount === "" || amount <= 0) {
        resultElement.innerText = "الرجاء إدخال قيمة صحيحة!";
        return;
    }

    try {
        let response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        let data = await response.json();
        let rate = data.rates[toCurrency];
        let convertedAmount = (amount * rate).toFixed(2);

        resultElement.innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        resultElement.innerText = "حدث خطأ، حاول مرة أخرى!";
    }
}

// تحميل العملات عند فتح الصفحة
window.onload = loadCurrencies;
