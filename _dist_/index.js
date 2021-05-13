const API_KEY = "2c1e4fd3931115a22ba808fcbd3608db";

const getData = (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
  return fetch(url)
  .then((data) => data.json());
}

//funcionamiento de el boton
const button = document.querySelector('#button');
button.addEventListener("click", getWeatherInfo)

document.addEventListener("keyup", (event) => {
    if (event.code === "Enter") {
      getWeatherInfo();
    }
  })

function getWeatherInfo() {
    const container = document.querySelector('#container');
    const input = document.querySelector('#input');
    getData(input.value)
      .then((data) => {
        container.innerHTML = template(data);
      })
      .catch(() => {
        container.innerHTML = 'City not found'
    })
}
function template(data) {
    return /* html */`
        <div class=" flex items-center justify-center" >
        <div class="flex flex-col bg-white rounded p-4 w-full max-w-xs">
                    <div class="font-bold text-xl">${data.name}</div>
                    <div class="text-sm text-gray-500">${data.timezone}</div>
                    <div class="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
                    <img class="w-32" src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="partly_cloudy">
                    </div>
                    <div class="flex flex-row items-center justify-center mt-6">
                    <div class="font-medium text-6xl">${kelvinToCelsius(data.main.temp)}°</div>
                    <div class="flex flex-col items-center ml-6">
                        <div>${data.weather[0].description}</div>
                        <div class="mt-1">
                        <span class="text-sm"><i class="far fa-long-arrow-up"></i></span>
                        <span class="text-sm font-light text-gray-500">${kelvinToCelsius(data.main.temp_max)}°C</span>
                        </div>
                        <div>
                        <span class="text-sm"><i class="far fa-long-arrow-down"></i></span>
                        <span class="text-sm font-light text-gray-500">${kelvinToCelsius(data.main.temp_min)}°C</span>
                        </div>
                    </div>
                    </div>
                </div>
        </div>
    `;
}


let kelvinToCelsius = (kelvinValue) => Math.floor(kelvinValue - 273);
kelvinToCelsius(297);
