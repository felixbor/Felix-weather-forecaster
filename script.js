var city = $("input").val()
var searchHistory =[];

$(".btn").on("click", function(){
    var city = $("input").val()
    $(".cities").append("<button>hhhhhhhh</buton>");
$("<button>").val(searchHistory[i])
addToHistory(city)
console.log(city)


})
function addToHistory(city) {
    searchHistory.push(city);
    localStorage.setItem("search-history",JSON.stringify(searchHistory))
}
var q= "Toronto"
fetch('https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={9305dd6618e87630258ad59d4733cd7f}')
  
.then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

  