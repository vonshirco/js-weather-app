//Creating the Object for storing the functions and variables
let weather ={
    //API Key to access the weather (from openweathermap.org)
    "apiKey": "541f3db1636457a75e7ae54a9a7b5fc5",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
             + city 
             + "&units=metric&appid=" 
             + this.apiKey
            )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    }, 
    displayWeather: function(data){
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = 
        "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        //document.querySelector(".temp").innertext = temp + "°C";
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

//Making the search-bar work
document.querySelector(".search button").addEventListener("click", function (){
    weather.search();
})

//Adding Event listener to the search bar (When you press enter)
document.querySelector(".search-bar").addEventListener("keyup", function (event){
    if(event.key == "Enter"){
        weather.search();
    }
})

//Not display the details until you load the weather

weather.fetchWeather("Denver");