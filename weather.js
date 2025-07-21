// Step 1: Get the input and button from the page
const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.querySelector("button");

// Step 2: Add a "click" event to the button
getWeatherBtn.addEventListener("click", function() {
    const city = cityInput.value.trim(); // get city and remove extra spaces
    
    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    // Your API key here:
    const apiKey = "5ff4244ba401079af32de07420a13a6c"; 
    
    // URL to get weather for the city (metric units for Celsius):
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Fetch data from OpenWeatherMap
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {

            const cityName = data.name;
        const temperature = data.main.temp;
        const weather = data.weather[0].main;
        const description = data.weather[0].description;
        const windSpeed = data.wind.speed;
        const humidity = data.main.humidity;

    // Step 2: Build a message to show

         const message = `
         
        <div class="weathercard animate-card">
        <h2>Weather in ${cityName}</h2>
        <p><strong>Temperature:</strong> ${temperature} °C</p>
        <p><strong>Condition:</strong> ${weather} (${description})</p>
        <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        </div>`;


    document.getElementById("weatherOutput").innerHTML = message;
            console.log(data); // See full data in console for now
            // We'll extract and show useful info next
        })
        .catch(error => {
            alert(error.message);
        });
});

