const search = document.querySelector('.search');
const country_inp = document.querySelector('.country_inp');
const date_value = document.querySelector('.date');
const weather_feels = document.querySelector('.weather_feels');
const weather_png = document.querySelector('.weather_png');
const temp = document.querySelector('.temp');
const min = document.querySelector('.min');
const max = document.querySelector('.max');
const feels_deg = document.querySelector('.feels_deg');
const humidity_deg = document.querySelector('.humidity_deg');
const wind_speed = document.querySelector('.wind_speed');
const wind_pre = document.querySelector('.wind_pre');

const weather_body = document.querySelector('.weather_body');


//---------------------------------to get country name---------------------------------
const getCountryName = (Code) => {
    return new Intl.DisplayNames([Code], { type: 'region' }).of(Code);
}


//------------------------------to get time and date-------------------------------
const getDateTime = (dt) => {
    const currDate = new Date(dt * 1000);//conver second to millisecond
    const option = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    };
    return  formatedDate = new Intl.DateTimeFormat(dt, option).format(currDate);
}
// -------------------------------to get city name--------------------------------
let city = "Delhi";

search.addEventListener('change', (e) => {
    e.preventDefault();
    city = search.value;
    getWeatherData();
    search.value = "";
    
})



//------------------------------to get weather data--------------------------------

const getWeatherData = async () => {
    const weatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6d0d577998afe6f28d7e176702b3c53b`;
    try {
        const res = await fetch(weatherurl);
        const data = await res.json();

        const { main, name, weather, wind, sys, dt } = data;
        country_inp.innerHTML = `${name},${getCountryName(sys.country)}`;

        date_value.innerHTML = getDateTime(dt);

        weather_feels.innerHTML = weather[0].description;

        weather_png.innerHTML= `<img src="http://openweathermap.org/img/wn/${weather[0].icon}.png" alt="weather icon">`;

        temp.innerHTML = `${Math.round(main.temp - 273)}<span>°C</span>`;
        // temp.innerHTML = `${main.temp}&#176`;

        min.innerHTML = `Min:${Math.round(main.temp_min - 273)}&#176`;
        // min.innerHTML = `Min: ${main.temp_min}&#176`;
        
        max.innerHTML = `Max:${Math.round((main.temp_max) - 273)}&#176`;
        // max.innerHTML = `Max: ${main.temp_max}&#176`;

        feels_deg.innerHTML=`${Math.round(main.feels_like - 273)}&#176`;
        humidity_deg.innerHTML=`${main.humidity}%`;
        wind_speed.innerHTML=`${wind.speed}m/s`;
        wind_pre.innerHTML=`${main.pressure}hPa`;

    } catch (error) {
        weather_body.innerHTML=` ${error}`;
    }
}

window.addEventListener("load", getWeatherData);