var searchInput = document.querySelector('#locationInput');
var button = document.querySelector('.btn-find')
var allLocations=[];
var allCurrent=[];
var locationConatiner=[];
var currentConatiner=[];
var filteredContainer=[];
var uniqueArray = [];
var obj = new Date();
var options = { weekday: 'long' };
var cartona ;

var inputEventOccurred = false;

async function getApi(city)
{
  var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=5f64b74f20ed402a9ef100505242703&q=${city}&days=3`,{ method:'GET'})
  var finalData = await response.json();
  allLocations.push(finalData);
  var result =removeErrorFromArray(allLocations);
  var f = removeD(result);
  


}
function reloadPage() {
  location.reload();
}
searchInput.addEventListener('keydown',function(e)
{ 
  getApi(searchInput.value);
  searchUserLocation();
 });

button.addEventListener('click', function(e)
{
  
  getApi(searchInput.value);
  searchUserLocation();
 
})
function searchUserLocation()
{ 
  var result =removeErrorFromArray(allLocations);
  var final = removeD(result)


   for(var i=0;i<final.length;i++)
   { 

      
    if(final[i].location.name.toLowerCase().includes(searchInput.value.toLowerCase()))
      {
       
      displayWeatherCards();
     
      
     }

    
   }
  
}

function displayWeatherCards()
{ var result =removeErrorFromArray(allLocations);
  var final = removeDuplicates(result)
  var obj = new Date();
  var options = { weekday: 'long' };

  var dayOfWeek = obj.toLocaleDateString('en-US', options);
  //var month = today.getMonth()+1
  var day = obj.getUTCDate(); 
  var month = obj.toLocaleString('default', { month: 'long' });
  var currentDate = new Date();
  var currentDay = currentDate.getDay();
  var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var currentDayName = daysOfWeek[currentDay];
  var nextDayName = daysOfWeek[(currentDay + 1) % 7];
  var nextNextDayName = daysOfWeek[(currentDay + 2) % 7];
  var source="http:";
  var rest_of_input = searchInput.value.substring(2);
  var cartona ;
 
  for(var i=0;i<final.length;i++)
  {
  if(final[i].location.name.toLowerCase().includes(rest_of_input.toLowerCase()))
  {
    
 cartona=`<div class="col-md-4 mb-4">
   <div>
     <div class="day text-center text-white p-2 d-flex justify-content-between">
     <h2 class="h6">${dayOfWeek}</h2>
     <h2 class="h6">${day}${' '}${month}</h2>
     </div>
     <div class="weather-day  d-flex justify-content-start align-items-center flex-column">
     <h2 class=" text-white h6 mt-3">${final[i].location.name}</h2>
     <h2 class="text-white h1">${final[i].current.temp_c}°C<img src="https:${final[i].current.condition.icon}"></h2>
     <h2 class=" text-white h6">${final[i].current.condition.text}</h2><br/>
     <h2 class=" text-white h6">
      <i class="fa-solid fa-umbrella fa-rotate-by me-2" style="color: #bcb9c6; --fa-rotate-angle: 40deg;""></i>20%
      <i class="fa-solid fa-wind me-2" style="color: #bcb9c6; --fa-rotate-angle: 40deg;""></i>18km/h
      <i class="fa-solid fa-compass me-2" style="color: #bcb9c6; --fa-rotate-angle: 40deg;""></i>East
      
      </h2>
   </div>
   </div>
  </div>

 <div class="col-md-4 mb-4">
   <div>
     <div class="day text-center text-white p-2 ">
     <h2 class="h6 text-center">${nextDayName}</h2>
   
     </div>
     <div class="weather-day  d-flex justify-content-start align-items-center flex-column mb-2">
     <img src="https:${final[0].forecast.forecastday[1].day.condition.icon}" class="mt-4">
     <h2 class="text-white h6 mb-3">${final[0].forecast.forecastday[1].day.maxtemp_c}°C</h2>
     <h2 class="text-white h6 mb-3">${final[0].forecast.forecastday[1].day.mintemp_c}°C</h2>
    <h2 class="text-white h6 ">${final[0].forecast.forecastday[1].day.condition.text}</h2>
  
      
      </h2>
     </div>
   </div>
  </div>
  
  <div class="col-md-4 mb-4 ">
   <div>
     <div class="day text-center text-white p-2 ">
     <h2 class="h6 text-center">${nextNextDayName}</h2>
    
     </div>
     <div class="weather-day  d-flex justify-content-start align-items-center flex-column mb-2">
     <img src="https:${final[0].forecast.forecastday[2].day.condition.icon}" class="mt-4">
     <h2 class="text-white h6 mb-3">${final[0].forecast.forecastday[2].day.maxtemp_c}°C</h2>
     <h2 class="text-white h6 mb-3">${final[0].forecast.forecastday[2].day.mintemp_c}°C</h2>
    <h2 class="text-white h6 ">${final[0].forecast.forecastday[2].day.condition.text}</h2>
  
     
      
      </h2>
     </div>
   </div>
  </div> 
 
  `;
 
 document.getElementById('weatherData').innerHTML = cartona;
}
  inputEventOccurred = true;

    
  
   
}
if(inputEventOccurred== false)
{
 searchInput.value=''
}
}

  



function removeErrorFromArray(dataArray) {
  
  for (var i = 0; i < dataArray.length; i++) {
    if (!dataArray[i].error) {
      filteredContainer.push(dataArray[i]);
    }
    
  }

  return filteredContainer;
}

function removeD(dataArray)
{
  for (var i = 1; i < dataArray.length; i++) {
    if (uniqueArray.indexOf(dataArray[i]) == -1) {
      uniqueArray.push(dataArray[i]);
    }
  }
  return uniqueArray;
  
}
function removeDuplicates(array) {
  return array.filter((value, index) => array.indexOf(value) == index);
}
function clearInput()
{
  searchInput.value='';
  defaultCards();
  
}

function resetCards()
{
  var  cartona=``;
  document.getElementById('weatherData').innerHTML = cartona;
}


async function defaultCards()
{
  var r= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=5f64b74f20ed402a9ef100505242703&q=cairo&days=3`);
  var cairoData = await r.json();
  allLocations.push(cairoData);
  var obj = new Date();
  var options = { weekday: 'long' };
  var cartona ;
  var dayOfWeek = obj.toLocaleDateString('en-US', options);
  //var month = today.getMonth()+1
  var day = obj.getUTCDate(); 
  var month = obj.toLocaleString('default', { month: 'long' });
  var currentDate = new Date();
  var currentDay = currentDate.getDay();
  var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var currentDayName = daysOfWeek[currentDay];
  var nextDayName = daysOfWeek[(currentDay + 1) % 7];
  var nextNextDayName = daysOfWeek[(currentDay + 2) % 7];


  for(var i=0;i<allLocations.length;i++)
  {
  var cartona=`<div class="col-md-4 mb-4">
  <div>
    <div class="day text-center text-white p-2 d-flex justify-content-between">
    <h2 class="h6">${dayOfWeek}</h2>
    <h2 class="h6">${day}${' '}${month}</h2>
    </div>
    <div class="weather-day  d-flex justify-content-start align-items-center flex-column">
    <h2 class=" text-white h6 mt-3">${allLocations[i].location.name}</h2>
    <h2 class="text-white h1">${allLocations[i].current.temp_c}°C<img src="https:${allLocations[i].current.condition.icon}"></h2>
    <h2 class=" text-white h6">${allLocations[i].current.condition.text}</h2><br/>
    <h2 class=" text-white h6">
     <i class="fa-solid fa-umbrella fa-rotate-by me-2" style="color: #bcb9c6; --fa-rotate-angle: 40deg;""></i>20%
     <i class="fa-solid fa-wind me-2" style="color: #bcb9c6; --fa-rotate-angle: 40deg;""></i>18km/h
     <i class="fa-solid fa-compass me-2" style="color: #bcb9c6; --fa-rotate-angle: 40deg;""></i>East
     
     </h2>
  </div>
  </div>
 </div>
 <div class="col-md-4 mb-4">
  <div>
    <div class="day text-center text-white p-2 ">
    <h2 class="h6 text-center">${nextDayName}</h2>
  
    </div>
    <div class="weather-day  d-flex justify-content-start align-items-center flex-column mb-2">
    <img src="https:${allLocations[i].forecast.forecastday[i].day.condition.icon}" class="mt-4">

    
        <h2 class="text-white h6 mb-3">${allLocations[i].forecast.forecastday[i].day.maxtemp_c}°C</h2>
     <h2 class="text-white h6 mb-3">${allLocations[i].forecast.forecastday[i].day.mintemp_c}°C</h2>
    <h2 class="text-white h6 ">${allLocations[i].forecast.forecastday[i].day.condition.text}</h2>
     <h2 class=" text-white h6">
    
     
     </h2>
    </div>
  </div>
 </div>
 
 <div class="col-md-4 mb-4 ">
  <div>
    <div class="day text-center text-white p-2 ">
    <h2 class="h6 text-center">${nextNextDayName}</h2>
   
    </div>
    <div class="weather-day  d-flex justify-content-start align-items-center flex-column mb-2">
    <img src="https:${allLocations[i].forecast.forecastday[i].day.condition.icon}" class="mt-4">
    <h2 class="text-white h6 mb-3">${allLocations[i].forecast.forecastday[i].day.maxtemp_c}°C</h2>
    <h2 class="text-white h6 mb-3">${allLocations[i].forecast.forecastday[i].day.mintemp_c}°C</h2>
   <h2 class="text-white h6 ">${allLocations[i].forecast.forecastday[i].day.condition.text}</h2>
 
    
     
     </h2>
    </div>
  </div>
 </div>
 `;
  }
 document.getElementById('weatherData').innerHTML = cartona;
}
defaultCards()


