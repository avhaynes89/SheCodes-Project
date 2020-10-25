function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}
function changeCelcius(event) {
  event.preventDefault();
  let celciusTemperature = document.querySelector("#current-temperature");
  celciusTemperature.innerHTML = "18°C";
}

function changeFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = document.querySelector("#current-temperature");
  fahrenheitTemperature.innerHTML = "72°F";
}

let celciusClick = document.querySelector("#celcius-link");
celciusClick.addEventListener("click", changeCelcius);

let fahrenheitClick = document.querySelector("#fahrenheit-link");
fahrenheitClick.addEventListener("click", changeFahrenheit);

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#high-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#low-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );

  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );

  document.querySelector("#wind-speed").innerHTML = response.data.wind.speed;
}

function searchCity(city) {
  let apiKey = "4bf0fe9a3eb704aa29ec59086a3a7318";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);
}

function citySubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function fetchPosition(position) {
  let apiKey = "4bf0fe9a3eb704aa29ec59086a3a7318";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(fetchPosition);
}
let dateElement = document.querySelector("#dateTime");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#city-search");
searchForm.addEventListener("submit", citySubmit);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

searchCity("Chicago");
