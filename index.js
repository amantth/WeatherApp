const wrapper = document.querySelector(".wrapper"),
inputpart = wrapper.querySelector(".input-part"),
infoText = inputpart.querySelector(".info-txt"),
inputField = inputpart.querySelector("input")
locationBtn = inputpart.querySelector("button"),
wIcon = wrapper.querySelector(".weather-part img"),
arrowBack = wrapper.querySelector("header i");



let api;
inputField.addEventListener("keyup", e => {
    if (e.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value);
    }
})



locationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        alert("Your browser not support geolocation api");
    }

})

function onSuccess(posititon) {
    const { latitude, longitude } = posititon.coords;
     api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=7b97a4480dd488a76c1754fa0c6b7950`;
    fetchData();
}
function onError(error) {
  infoText.innerText = error.message;
    infoText.classList.add("error");
}
    
function requestApi(city) {
     api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=7b97a4480dd488a76c1754fa0c6b7950`;
   fetchData() 
}
function fetchData() {
      infoText.innerText = "Getting weather details...";
    infoText.classList.add("pending");
    fetch(api).then(response => response.json()).then(result => weatherDetails(result))
}
function weatherDetails(info) {
    if (info.cod == "404") {
        infoText.innerText = `${inputField.value} isnt a valid city name`;
     infoText.classList.replace("pending","error"); 
    }
    else {
        const city = info.name;
        const country = info.sys.country;
        const {description,id} = info.weather[0];
        const { temp, feels_like, humidity } = info.main;
        
        if (id == 800) {
            wIcon.src = "icons/clear.svg";
        }
         else if (id >=200 && id <=232) {
            wIcon.src = "icons/strom.svg";
        }
         else if (id >=600 && id <=622) {
            wIcon.src = "icons/snow.svg";
        }
          else if (id >=701 && id <=781) {
            wIcon.src = "icons/haze.svg";
        }
           else if (id >=801 && id <=804) {
            wIcon.src = "icons/cloud.svg";
        }
           else if ((id >=300 && id <=321) || (id >= 500 && id<=531)){
            wIcon.src = "icons/rain.svg";
        }

        wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
        wrapper.querySelector(".weather").innerText = description;
        wrapper.querySelector(".location span").innerText = `${city } , ${country}` ;
        wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerText =`${ humidity }%`;

        inputField.value = "";
        infoText.classList.remove("pending", "error"); 
        wrapper.classList.add("active");
        console.log(info)
        
    }
}    


arrowBack.addEventListener("click", () => {
  wrapper.classList.remove("active")
});