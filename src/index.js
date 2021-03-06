function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDate = days[date.getDay()];

  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  let currentMin = date.getMinutes();
  if (currentMin < 10) {
    currentMin = `0${currentMin}`;
  }

  let formattedDate = `Last updated: ${currentDate} ${currentHour}:${currentMin}`;

  return formattedDate;
}

function getForecastDay(timestamp) {
  let forecastDay = new Date(timestamp * 1000);
  let day = forecastDay.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
              <div class="card">
                <div class="card-body">${getForecastDay(forecastDay.dt)}</div>
                <img class="forecast-img" src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt="${forecastDay.weather[0].description}"/>
                <div class="card-body">
                  <span class="temperature" class="temperature-max"
                    >${Math.round(
                      forecastDay.temp.max
                    )}°<small class="temperature-min">${Math.round(
          forecastDay.temp.min
        )}°</small></span
                  >
                </div>
              </div>
            </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "4e41a8b8dd7ae4f47d6d87a94cd68147";
  let unit = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiURL).then(displayForecast);
}

function displayWeather(response) {
  celsiusTemperature = response.data.main.temp;

  let temperatureDisplay = document.querySelector("#temperature");
  temperatureDisplay.innerHTML = Math.round(celsiusTemperature);

  let cityName = response.data.name;
  let cityNameDisplay = document.querySelector("#city");
  cityNameDisplay.innerHTML = cityName;

  let shortDescription = response.data.weather[0].description;
  let shortDescriptionDisplay = document.querySelector(".weather-display");
  shortDescriptionDisplay.innerHTML = shortDescription;

  let windspeed = Math.round(response.data.wind.speed);
  console.log(windspeed);
  let windspeedElement = document.querySelector("#windspeed");
  windspeedElement.innerHTML = `wind: ${windspeed} m/s`;

  let currentTime = new Date(response.data.dt * 1000);
  let currentDate = document.querySelector("#date-and-time");
  currentDate.innerHTML = `${formatDate(currentTime)}`;

  let iconElement = document.querySelector("#weatherIcon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function citySearch(city) {
  let apiKey = "4e41a8b8dd7ae4f47d6d87a94cd68147";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(displayWeather);
}

function citySubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  citySearch(city);
}

let search = document.querySelector("#search-form");
search.addEventListener("submit", citySubmit);

function searchLocation(position) {
  let apiKey = "4e41a8b8dd7ae4f47d6d87a94cd68147";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

citySearch("Madrid");
