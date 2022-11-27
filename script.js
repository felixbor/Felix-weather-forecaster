var city = $("input").val()
var searchHistory =[];

$(".btn").on("click", function(){
    var city = $("input").val()
    if ($("input").val()!=="")

    $(".cities").append(`<button>${city}</button>`);

addToHistory(city)
console.log(city)
fetchweather()

})
function addToHistory(city) {
    searchHistory.push(city);
    localStorage.setItem("search-history",JSON.stringify(searchHistory))
}
function fetchweather(){
var cityname= $("input").val()
console.log(cityname)
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=efb9260cdf2128e3c8f818c36c80e344&units=metric`)
  
.then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
 }
 /* fetch('api.openweathermap.org/data/2.5/forecast?q=Toronto&appid=efb9260cdf2128e3c8f818c36c80e344')
    
  .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });

*/