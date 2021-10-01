console.log('test')

var apiKey = '2abc6a4e82e6dd44b262a79571573c52'
var location 
const KELVIN = 273

// if (navigator.geolocation){
//     navigator.geolocation.getCurrentPosition(showPosition);
// } else {
//     alert('Your browser does not support Geolocation');
// }

// function showPosition(position){
//     console.log('My location is:', position)
//     callWeatherApi(position)
// }



currentApi("Petaling");

function currentApi(place){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apiKey}`)
    .then(res => res.json())
    .then(data =>{
        console.log(data)
        

        var currentTemp = data.main.temp
        var currentFeelTemp = data.main.feels_like
        var weatherMain = data.weather['0'].main
        var weatherDesc = data.weather['0'].description
        var icon = `http://openweathermap.org/img/wn/${data.weather['0'].icon}@2x.png`
        var windSpeed = data.wind.speed
        var windDeg = data.wind.deg
        var location = data.name
        var dateTime = moment().utc(data.dt).format("MMM Do YYYY")
        var posLat = data.coord.lat
        var posLon = data.coord.lon

        document.getElementById('location').innerHTML = `${location}, ${dateTime}`
        document.getElementById('weather-icon').src = icon
        document.getElementById('weather-main').innerHTML = weatherMain
        document.getElementById('weather-desc').innerHTML = weatherDesc
        document.getElementById('crt-temp').innerHTML = Math.round(currentTemp - KELVIN)
        document.getElementById('crt-feeltemp').innerHTML = Math.round(currentTemp - KELVIN)
        document.getElementById('wind-speed').innerHTML = windSpeed
        document.getElementById('wind-deg').innerHTML = windDeg
    
        console.log(currentTemp)

        changeBackground(weatherMain)

        callWeatherApi(posLat, posLon, dateTime)

    })
}

function callWeatherApi(posLat, posLon, dateTime){

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${posLat}&lon=${posLon}&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {
        
        var forecast = document.getElementsByClassName('forecast-block')
        var forecastTemp = document.getElementsByClassName('forecast-temp-card')
        
        var dayWeather = []
        var dayWeatherDesc = []
        var dayIcon = []
        var dayDate = []
        var dayMinTemp = []
        var dayMaxTemp = []

        for(let i = 0, j = 1 ; i < 5; i++, j++){

            dayWeather[i] = data.daily[j].weather[0].main
            dayWeatherDesc[i] = data.daily[j].weather[0].description
            dayIcon[i] = data.daily[j].weather[0].icon
            dayMinTemp[i] = Math.round(data.daily[j].temp.min - KELVIN)
            dayMaxTemp[i] = Math.round(data.daily[j].temp.max - KELVIN)

            dayDate = moment(dateTime, "MMM Do YYYY").add(j , 'day').format("dddd [<br>] Do MMM")

            forecast[i].querySelectorAll('h2')[0].innerHTML = dayDate

            
            forecast[i].querySelector('img').src = `http://openweathermap.org/img/wn/${dayIcon[i]}@2x.png`
            forecast[i].querySelectorAll('h2')[1].innerHTML = dayWeather[i]
            forecast[i].querySelector('h3').innerHTML = dayWeatherDesc[i]
            console.log(dayMinTemp)
            document.getElementsByClassName('forecast-min-temp')[i].innerHTML = dayMinTemp[i]
            document.getElementsByClassName('forecast-max-temp')[i].innerHTML = dayMaxTemp[i]
        }

        // var currentTemp = data.current.temp
        // var currentFeelTemp = data.current.feels_like
        // var weatherMain = data.current.weather['0'].main
        // var weatherDesc = data.current.weather['0'].description
        // var icon = `http://openweathermap.org/img/wn/${data.current.weather['0'].icon}@2x.png`
        // var windSpeed = data.current.wind_speed
        // var windDeg = data.current.wind_deg
        // var location = data.timezone
    
        // document.getElementById('location').innerHTML = location
        // document.getElementById('weather-icon').src = icon
        // document.getElementById('weather-main').innerHTML = weatherMain
        // document.getElementById('weather-desc').innerHTML = weatherDesc
        // document.getElementById('crt-temp').innerHTML = Math.round(currentTemp - KELVIN)
        // document.getElementById('crt-feeltemp').innerHTML = Math.round(currentTemp - KELVIN)
        // document.getElementById('wind-speed').innerHTML = windSpeed
        // document.getElementById('wind-deg').innerHTML = windDeg
    
        // console.log(currentTemp)
    })
    
}

function changeBackground(weather){
    var bg = document.querySelector('body')

    console.log(weather)

    switch(weather){
        case 'Clouds': 
            bg.style.backgroundImage = "url(images/cloudy.jpg)"
            break;
        case 'Clear':
            bg.style.backgroundImage = "url(images/clear.jpg)"
            break;
        case 'Rain' :
            bg.style.backgroundImage = "url(images/rain.jpg)"
            break;
        case 'Thunderstorm' :
            bg.style.backgroundImage = "url(images/thunderstorm.jpg)"
            break;
        default:
            bg.style.backgroundImage = "url(images/default.jpg"
    }
}