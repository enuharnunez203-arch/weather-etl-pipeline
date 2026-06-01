const input = document.getElementById('locationInput');

document.getElementById('searchBtn').addEventListener('click', getWeather);

function getWeather() {
    const location = input.value;
    
    if (!location) {
        document.getElementById('weatherInfo').innerHTML = "Error: Please write a location.";
        return;
    }
    
    const apiKey = config.API_KEY; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric&lang=en`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                document.getElementById('weatherInfo').innerHTML = "Please write a real location.";
            } else {
                document.getElementById('weatherInfo').innerHTML = `
                    <h2>Weather in ${data.name}</h2>
                    <p> Temperature: ${data.main.temp}°C</p>
                    <p> Humidity: ${data.main.humidity}%</p>
                    <p> Wind Speed: ${data.wind.speed} m/s</p>
                    <p> ${data.weather[0].description}</p>
                `;
            }
        })
        .catch(error => {
            document.getElementById('weatherInfo').innerHTML = "Connection error. Please try again.";
        });
}