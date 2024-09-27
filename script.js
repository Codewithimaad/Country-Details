const searchInput = document.querySelector(".search");
const btn = document.querySelector(".search-btn");

btn.addEventListener("click", () => {
    let countryName = searchInput.value;
    console.log(countryName);

    // Check if input is empty and show error message
    if (countryName === "") {
        document.querySelector("#error").style.display = "flex";
        document.querySelector(".country").style.display = "none";
        document.querySelector(".details-country").style.display = "none";
    } else {
        document.querySelector("#error").style.display = "none";
    }

    let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    console.log(finalURL);

    // Fetch country data from API
    fetch(finalURL)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            // Update UI with country data
            document.querySelector(".flag-img").src = data[0].flags.png;
            document.querySelector(".country-name").innerHTML = data[0].name.common.toUpperCase();
            document.querySelector(".official-name").innerHTML = data[0].name.official;
            document.querySelector(".independent").innerHTML = data[0].independent;
            document.querySelector(".capital").innerHTML = data[0].capital[0];
            document.querySelector(".region").innerHTML = data[0].region;
            document.querySelector(".area").innerHTML = data[0].area + "km²";
            document.querySelector(".population").innerHTML = Math.round((data[0].population / 1000000).toFixed(1)) + " millions";
            document.querySelector(".languages").innerHTML = Object.values(data[0].languages).toString().split(",").join(", ");
            document.querySelector(".borders").innerHTML = data[0].borders ? data[0].borders.join(", ") : "None";
            document.querySelector(".currencies").innerHTML = data[0].currencies[Object.keys(data[0].currencies)].name;
            document.querySelector(".startofweek").innerHTML = data[0].startOfWeek;

            // Show country details
            document.querySelector(".country").style.display = "flex";
            document.querySelector(".details-country").style.display = "flex";

            // Clear the input field
            searchInput.value = "";
        })
        .catch((error) => {
            console.log("Error fetching data:", error);
        });
});
