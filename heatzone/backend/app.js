const input      = document.getElementById('locationInput');
const searchBtn  = document.getElementById('searchBtn');
const geoBtn     = document.getElementById('geoBtn');
const weatherDiv = document.getElementById('weatherInfo');

searchBtn.addEventListener('click', getWeather);
geoBtn.addEventListener('click', getWeatherByGeolocation);
input.addEventListener('keydown', e => { if (e.key === 'Enter') getWeather(); });

function setLoading(active) {
    searchBtn.disabled = active;
    searchBtn.textContent = active ? 'Searching...' : 'Get Weather';
    searchBtn.classList.toggle('loading', active);
}

function showMessage(text) {
    weatherDiv.innerHTML = `
        <div class="weather-card">
            <p class="weather-placeholder">${text}</p>
        </div>`;
}

function formatTime(unix, timezoneOffset) {
    const d = new Date((unix + timezoneOffset) * 1000);
    const h = String(d.getUTCHours()).padStart(2, '0');
    const m = String(d.getUTCMinutes()).padStart(2, '0');
    return `${h}:${m}`;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function renderWeather(data) {
    const sunrise = formatTime(data.sys.sunrise, data.timezone);
    const sunset  = formatTime(data.sys.sunset,  data.timezone);

    weatherDiv.innerHTML = `
        <div class="weather-card">
            <div class="weather-header">
                <div class="weather-location">
                    <h2>${data.name} <span class="country-badge">${data.sys.country}</span></h2>
                    <p class="weather-description">${capitalize(data.weather[0].description)}</p>
                </div>
                <div class="weather-temp">${Math.round(data.main.temp)}<span>&deg;C</span></div>
            </div>
            <div class="weather-divider"></div>
            <div class="weather-grid">
                <div class="weather-stat">
                    <span class="stat-label">Feels Like</span>
                    <span class="stat-value">${Math.round(data.main.feels_like)}&deg;C</span>
                </div>
                <div class="weather-stat">
                    <span class="stat-label">Humidity</span>
                    <span class="stat-value">${data.main.humidity}%</span>
                </div>
                <div class="weather-stat">
                    <span class="stat-label">Wind Speed</span>
                    <span class="stat-value">${data.wind.speed} m/s</span>
                </div>
                <div class="weather-stat">
                    <span class="stat-label">Min / Max</span>
                    <span class="stat-value">${Math.round(data.main.temp_min)}&deg; / ${Math.round(data.main.temp_max)}&deg;</span>
                </div>
                <div class="weather-stat">
                    <span class="stat-label">Sunrise</span>
                    <span class="stat-value">${sunrise}</span>
                </div>
                <div class="weather-stat">
                    <span class="stat-label">Sunset</span>
                    <span class="stat-value">${sunset}</span>
                </div>
            </div>
        </div>`;
}

function fetchWeather(url) {
    setLoading(true);
    fetch(url)
        .then(r => r.json())
        .then(data => {
            setLoading(false);
            if (data.cod === '404' || data.cod === 404) {
                showMessage('Location not found. Try a different city or country.');
            } else {
                renderWeather(data);
            }
        })
        .catch(() => {
            setLoading(false);
            showMessage('Connection error. Please check your network and try again.');
        });
}

function getWeather() {
    const location = input.value.trim();
    if (!location) {
        showMessage('Please enter a location to search.');
        return;
    }
    const url = `/weather?city=${location}`;
    fetchWeather(url);
}

function getWeatherByGeolocation() {
    if (!navigator.geolocation) {
        showMessage('Geolocation is not supported by your browser.');
        return;
    }

    geoBtn.textContent = 'Locating...';
    geoBtn.disabled = true;

    navigator.geolocation.getCurrentPosition(
        position => {
            geoBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                </svg>
                Use my location`;
            geoBtn.disabled = false;

            const { latitude, longitude } = position.coords;
            const url = `/weather?lat=${latitude}&lon=${longitude}`;
            fetchWeather(url);
        },
        () => {
            geoBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                </svg>
                Use my location`;
            geoBtn.disabled = false;
            showMessage('Location access denied. Please enable permissions in your browser and try again.');
        }
    );
}
