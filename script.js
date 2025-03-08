let cityName = document.querySelector('.weather_city')
let dateTime = document.querySelector('.weather_date_time')
let w_Forecast = document.querySelector('.weather_forecast')
let w_Temperatur = document.querySelector('.weather_temperature')
let w_Icon = document.querySelector('.weather_icon')
let w_feelLike = document.querySelector('.weather_feelsLike')
let w_humdity = document.querySelector('.weather_humidity')
let w_wind = document.querySelector('.weather_wind')
let w_pressure = document.querySelector('.weather_pressure')

let City = 'delhi'
let city_search = document.querySelector('.weather_search')
city_search.addEventListener("submit",(e)=>{
  e.preventDefault()
  let cityName = document.querySelector('.city_name')
  console.log(cityName.value)
  City = cityName.value
  getWeatherdata()
  cityName.value="";

})
//get country name
const getCountryCode =(code)=>{
 return new Intl.DisplayNames([code], {
    type: 'region',
  }).of(code)
}

//get datetime format

const getDateTime = (dt)=>{

  
  const currDate = new Date(dt *1000);
  console.log(currDate);

  const option ={
    weekday :"long",
    year :"numeric",
    month:"long",
    day:"numeric",
    hour:"numeric",
    minute:"numeric",

  };
  const formmater =new Intl.DateTimeFormat('en-US',option)
return formmater.format(currDate)
}

const getWeatherdata = async()=>{
  try{
    const weather_URL = `https://api.openweathermap.org/data/2.5/weather?q=${City}&APPID=1e4eb64e7945dcb06cb283b50feba43e`
    const response = await fetch(weather_URL)
    
    

    const data = await response.json()
    console.log(data)
    const {main,sys,name,weather,wind,dt} = data;

cityName.innerHTML = `${name}, ${getCountryCode(sys.country)}`
dateTime.innerHTML = getDateTime(dt)
w_Forecast.innerHTML = weather[0].main
w_Icon.innerHTML= `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`
w_Temperatur.innerHTML = `${main.temp.toFixed()}&#176`
w_feelLike.innerHTML = `${main.feels_like}&#176`
w_humdity.innerHTML = `${main.humidity}%`
w_wind.innerHTML = `${wind.speed} m/s`

w_pressure.innerHTML = `${main.pressure}hPa`



  }
  
  catch(error){
    console.log(error)
  }
    
}


document.body.addEventListener('load',getWeatherdata())




