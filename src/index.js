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

function displayWeather(response) {
  let temp = Math.round(response.data.main.temp);
  let temperatureDisplay = document.querySelector("#temperature");
  temperatureDisplay.innerHTML = temp;

  let cityName = response.data.name;
  let cityNameDisplay = document.querySelector("#city");
  cityNameDisplay.innerHTML = cityName;

  let shortDescription = response.data.weather[0].description;
  let shortDescriptionDisplay = document.querySelector(".weather-display");
  shortDescriptionDisplay.innerHTML = shortDescription;

  let currentTime = new Date(response.data.dt * 1000);
  let currentDate = document.querySelector("#date-and-time");
  currentDate.innerHTML = `${formatDate(currentTime)}`;

  let iconElement = document.querySelector(".image-weather-icon");
  if (response.data.weather[0].description.includes("overcast clouds")) {
    iconElement.innerHTML = "H";
  }
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

citySearch("Copenhagen");
debugger;

//Celsius and Fahrenheit
function convertCelsius(event) {
  event.preventDefault();
  let celsiusValue = document.querySelector("#temperature");
  celsiusValue.innerHTML = "24";
}

function convertFahrenheit(event) {
  event.preventDefault();
  let fahrenheitValue = document.querySelector("#temperature");
  fahrenheitValue.innerHTML = "75";
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertFahrenheit);
