let language = "en"; // اللغة الافتراضية

// تغيير اللغة
function changeLanguage() {
    language = document.getElementById("languageSelect").value;
    document.getElementById("title").innerText = language === "en" ? "🌍 Country Information" : "🌍 معلومات عن الدول";
    document.getElementById("countryInput").placeholder = language === "en" ? "Enter a country name" : "أدخل اسم الدولة";
    document.querySelector("button").innerText = language === "en" ? "Search" : "بحث";
}

// جلب معلومات الدولة
function getCountryInfo() {
    let countryName = document.getElementById("countryInput").value.trim();

    // التحقق من صحة المدخلات
    if (countryName === "") {
        alert(language === "en" ? "⚠️ Please enter a valid country name before searching." : "⚠️ من فضلك أدخل اسم دولة صحيحًا قبل البحث.");
        return;
    }

    // تجاهل إسرائيل
    if (countryName.toLowerCase() === "israel") {
        document.getElementById("result").innerHTML = `<p>❌ ${language === "en" ? "Sorry, information for Israel is not available." : "عذرًا، المعلومات عن إسرائيل غير متوفرة."}</p>`;
        return;
    }

    let url = `https://restcountries.com/v3.1/name/${countryName}`;

    // جلب البيانات باستخدام fetch API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.status === 404) {
                document.getElementById("result").innerHTML = `<p>❌ ${language === "en" ? "Sorry, no matching country found. Please try again." : "عذرًا، لم يتم العثور على دولة مطابقة. الرجاء المحاولة مرة أخرى."}</p>`;
                return;
            }

            let country = data[0];
            let name = country.name.common;
            let capital = country.capital ? country.capital[0] : (language === "en" ? "Not available" : "غير متوفرة");
            let population = country.population.toLocaleString();
            let currency = Object.values(country.currencies)[0].name;
            let languageName = Object.values(country.languages)[0];
            let flag = country.flags.png;

            // عرض المعلومات
            document.getElementById("result").innerHTML = `
                <img src="${flag}" alt="Flag of ${name}" class="flag">
                <h2>${name}</h2>
                <p><strong>🏛️ ${language === "en" ? "Capital:" : "العاصمة:"}</strong> ${capital}</p>
                <p><strong>👥 ${language === "en" ? "Population:" : "عدد السكان:"}</strong> ${population}</p>
                <p><strong>💰 ${language === "en" ? "Currency:" : "العملة:"}</strong> ${currency}</p>
                <p><strong>🗣️ ${language === "en" ? "Language:" : "اللغة:"}</strong> ${languageName}</p>
            `;
        })
        .catch(() => {
            document.getElementById("result").innerHTML = `<p>🚨 ${language === "en" ? "An error occurred while fetching the data. Please try again later." : "حدث خطأ أثناء جلب البيانات. الرجاء المحاولة لاحقًا."}</p>`;
        });
}
