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
function formatHours(timestamp){
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}
function showCelciusTemp(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  document.querySelector("#current-temperature").innerHTML = Math.round(
    celciusTemperature
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    feelsLikeCelciusTemperature
  );
  document.querySelector("#high-temp").innerHTML = Math.round(highTempCelcius);
  document.querySelector("#low-temp").innerHTML = Math.round(lowTempCelcius);

  let forecastMax = document.querySelectorAll(".forecast-max");

  forecastMax.forEach(function (item) {
    // grabbing the current value to convert
    let currentTemp = item.innerHTML;

    // convert to Fahrenheit
    item.innerHTML = Math.round(((currentTemp - 32) * 5) / 9);
  });

  let forecastMin = document.querySelectorAll(".forecast-min");

  forecastMin.forEach(function (item) {
    // grabbing the current value to convert
    let currentTemp = item.innerHTML;

    // convert to Fahrenheit
    item.innerHTML = Math.round(((currentTemp - 32) * 5) / 9);
  });

  // Handle the events to avoid duplicate on click
  celciusLink.removeEventListener("click", showCelciusTemp);
  fahrenheitLink.addEventListener("click", showFahrenheitTemp);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  let feelsLikeFahrenheitTemperature =
    (feelsLikeCelciusTemperature * 9) / 5 + 32;
  let highTempFahrenheit = (highTempCelcius * 9) / 5 + 32;
  let lowTempFahrenheit = (lowTempCelcius * 9) / 5 + 32;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    fahrenheitTemperature
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    feelsLikeFahrenheitTemperature
  );
  document.querySelector("#high-temp").innerHTML = Math.round(
    highTempFahrenheit
  );
  document.querySelector("#low-temp").innerHTML = Math.round(lowTempFahrenheit);

  let forecastMax = document.querySelectorAll(".forecast-max");

  forecastMax.forEach(function (item) {
    // grabbing the current value to convert
    let currentTemp = item.innerHTML;

    // convert to Fahrenheit
    item.innerHTML = Math.round((currentTemp * 9) / 5 + 32);
  });

  let forecastMin = document.querySelectorAll(".forecast-min");

  forecastMin.forEach(function (item) {
    // grabbing the current value to convert
    let currentTemp = item.innerHTML;

    // convert to Fahrenheit
    item.innerHTML = Math.round((currentTemp * 9) / 5 + 32);
  });

  // Handle the events to avoid duplicate on click
  celciusLink.addEventListener("click", showCelciusTemp);
  fahrenheitLink.removeEventListener("click", showFahrenheitTemp);
}


function showWeather(response) {
  celciusTemperature = response.data.main.temp;
  feelsLikeCelciusTemperature =response.data.main.feels_like;
  highTempCelcius = response.data.main.temp_max;
  lowTempCelcius = response.data.main.temp_min;
  windSpeed = (response.data.wind.speed)*0.62137119223733;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
   celciusTemperature
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#high-temp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#low-temp").innerHTML = Math.round(
    response.data.main.temp_min
  );

  document.querySelector("#feels-like").innerHTML = Math.round(
    feelsLikeCelciusTemperature
  );

  document.querySelector("#wind-speed").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML=response.data.weather[0].description;
  document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
            <div class="col-2">
                <h3>
                    ${formatHours(forecast.dt * 1000)}
                </h3>
                <img src="http://openweathermap.org/img/wn/${
                  forecast.weather[0].icon
                }@2x.png" alt="">
                <div class="weather-forecast-temperature">
                    <strong><span class="forecast-max">${Math.round(
                      forecast.main.temp_max
                    )}</span>°</strong> | <span class="forecast-min">${Math.round(
      forecast.main.temp_min
    )}</span>°
                </div>
            </div>`;
  }
}

function searchCity(city) {
  let apiKey = "4bf0fe9a3eb704aa29ec59086a3a7318";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);

  let apiUrl= `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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
  let apiUrl= `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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

let celciusTemperature = null
let feelsLikeCelciusTemperature = null 

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", showCelciusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

searchCity("Chicago");
