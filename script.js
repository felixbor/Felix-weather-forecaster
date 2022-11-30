var day = dayjs().format("DD/MM/YYYY")
document.getElementById("currentdate").innerText = day
var searchHistory = [];
var block = document.querySelector(".hide");

$(".search").on("click", function () {
    var cityin = $("input").val()
    const found = searchHistory.find(element => element == cityin)
    if ($("input").val() !== "") {
        if (found == undefined) {
            $(".cities").append(`<button>${cityin}</button>`);
            block.setAttribute("style", "display:block;");



            addToHistory(cityin)
            console.log(cityin)
            fetchWeather(cityin)
        } else { fetchWeather(cityin) }


    }
})
//found == undefined)
$(".clear").on("click", function () {
    localStorage.clear();
    searchHistory = [];
    $(".cities").empty();

})
function addToHistory(cityin) {
    searchHistory.push(cityin);
    localStorage.setItem("search-history", JSON.stringify(searchHistory))
}
getfromHistory()
function getfromHistory() {

    if (JSON.parse(localStorage.getItem("search-history")) == null) {
        searchHistory = []
    }
    else {
        searchHistory = JSON.parse(localStorage.getItem("search-history"))
    }
    for (let index = 0; index < searchHistory.length; index++) {
        const element = searchHistory[index];
        $(".cities").append(`<button>${element}</button>`);
    }
}

function selectcity(event) {
    block.setAttribute("style", "display:block;");
    var citybtn = event.target.textContent
    fetchWeather(citybtn)


}
$(".cities").on("click", selectcity)
function fetchWeather(value) {
    // var cityname = $("input").val()
    console.log(value)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=efb9260cdf2128e3c8f818c36c80e344&units=metric`)

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            displayCurrentWeather(data)
            fetchWeather2(data.id)
        });
}

function displayCurrentWeather(data) {
    var { name } = data;
    var { icon } = data.weather[0]
    var { description } = data.weather[0];
    var { temp } = data.main
    var { humidity } = data.main
    var { speed } = data.wind
    console.log(name)
    console.log(temp)
    console.log(description)
    console.log(humidity)
    console.log(speed)

    document.getElementById("city").innerText = name;
    document.getElementById("temperature").innerText = temp + "°C";
    document.getElementById("humidity").innerText = humidity + "%"
    document.getElementById("wind").innerText = speed + "km/h";
    document.getElementById("condition").innerText = description;
    document.querySelector("#icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
}

function fetchWeather2(city) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?id=' + city + '&appid=efb9260cdf2128e3c8f818c36c80e344&units=metric')

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // var listOfWeather = data.list;

            // var filteredArr = [];
            // for(i=0; i<listOfWeather.length; i++) {
            //     if(listOfWeather[i].dt_txt.includes("12:00:00")) {
            //         filteredArr.push(listOfWeather[i])
            //     }
            // }

            var filteredArr = data.list.filter(hourlyWeatherObj => hourlyWeatherObj.dt_txt.includes("12:00:00"))

            displayFiveDay(filteredArr)
        });
}


function displayForecastWeather(data) {
    var { name } = data;
    var { icon } = data.weather[0]
    var { description } = data.weather[0];
    var { temp } = data.main
    var { humidity } = data.main
    var { speed } = data.wind
    console.log(name)
    console.log(temp)
    console.log(description)
    console.log(humidity)
    console.log(speed)

    document.getElementById("city").innerText = name;
    document.getElementById("temperature").innerText = temp + "°C";
    document.getElementById("humidity").innerText = humidity + "%"
    document.getElementById("wind").innerText = speed + "km/h";

    document.querySelector("#icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
}

function displayFiveDay(arr) {
    console.log(arr)
    for (i = 0; i < arr.length; i++) {
        document.getElementById("date" + (i + 1)).textContent = arr[i].dt_txt.split(" ")[0]
        document.getElementById("image" + (i + 1)).src = "http://openweathermap.org/img/wn/" + arr[i].weather[0].icon + "@2x.png"
        document.getElementById("image" + (i + 1)).setAttribute("style", "height: 100px; width: 100px;")
        document.getElementById("temp" + (i + 1)).textContent = arr[i].main.temp + "°C"
        document.getElementById("wind" + (i + 1)).textContent = " wind speed:" + arr[i].wind.speed + "km/h"
        document.getElementById("humidity" + (i + 1)).textContent = " humidity:" + arr[i].main.humidity + "%"
    }
}