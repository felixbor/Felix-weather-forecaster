var cityin = $("input").val()
var searchHistory = [];

$(".btn").on("click", function () {
    var cityin = $("input").val()
    if ($("input").val() !== "")

        $(".cities").append(`<button>${cityin}</button>`);

    addToHistory(cityin)
    console.log(cityin)
    fetchweather()

})
function addToHistory(cityin) {
    searchHistory.push(cityin);
    localStorage.setItem("search-history", JSON.stringify(searchHistory))
}
function fetchweather() {
    var cityname = $("input").val()
    console.log(cityname)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=efb9260cdf2128e3c8f818c36c80e344&units=metric`)

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            displaycurrentwether(data)
        });
}

function displaycurrentwether(data) {
    var { name } = data;
    var { icon } = data.weather;
    var { description } = data.weather;
    console.log(name)
    console.log(icon)
    console.log(description)
    //var {temp}= data
    $("#city").val() = name
    document.getEleementByID("icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
}

function fetchweather2() {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=Toronto&appid=efb9260cdf2128e3c8f818c36c80e344&units=metric')

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });
}