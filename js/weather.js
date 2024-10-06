const locations = [
    { name: "Tokyo, Japan", latitude: 35.6895, longitude: 139.6917 },
    { name: "New York, USA", latitude: 40.7128, longitude: -74.0060 },
    { name: "London, UK", latitude: 51.5074, longitude: -0.1278 },
    { name: "Sydney, Australia", latitude: -33.8688, longitude: 151.2093 },
    { name: "Cape Town, South Africa", latitude: -33.9249, longitude: 18.4241 },
    { name: "Barcelona, Spain", latitude: 41.3851, longitude: 2.1734 },
    { name: "Madrid, Spain", latitude: 40.4168, longitude: -3.7038 },
    { name: "Gjovik, Norway", latitude: 60.7957, longitude: 10.6915 }
];

const weatherContainer = document.getElementById("weather-container");


async function fetchWeatherData() {
    weatherContainer.innerHTML = ''; 

    for (let location of locations) {
        const { name, latitude, longitude } = location;
        const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            const weatherCard = document.createElement('div');
            weatherCard.classList.add('weather-card');

            weatherCard.innerHTML = `<h3>${name}</h3>
            <p>Temperature: ${data.current_weather.temperature}°C</p>
            <p>Windspeed: ${data.current_weather.windspeed} km/h</p>
            <p>Weather Code: ${data.current_weather.weathercode}</p>
            <p>Time: ${data.current_weather.time}</p>`;

    
            weatherContainer.appendChild(weatherCard);
        } catch (error) {
            console.error(`Error fetching weather data for ${name}:`, error);
            displayWeatherError(name);
        }
    }
}


// Fetch weather data every minute (60000 ms)
fetchWeatherData();
setInterval(fetchWeatherData, 60000);
