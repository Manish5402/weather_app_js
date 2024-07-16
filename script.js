const data = null;
let city = null;
const stext = document.querySelector(".citysearch"); // Assuming it's an input element
const sbtn = document.querySelector(".sbtn");

sbtn.addEventListener("click", () => {
    city = stext.value; // Get the value of the input field
    stext.innerHTML="";
    getData();
    
});

function getData() {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    function ktoc(temp) {
        return Math.ceil(temp - 273.15); // Corrected calculation
    }

    function gettime(time) {
        const dateObj = new Date(time * 1000); // Use the provided timestamp
        const hours = dateObj.getUTCHours();
        const minutes = dateObj.getUTCMinutes();
        const seconds = dateObj.getUTCSeconds();
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        return formattedTime;
    }

    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            const responseData = JSON.parse(this.responseText);
            console.log(responseData);
            let M_temp = responseData.main.temp;
            let M_feellike = responseData.main.feels_like;
            let M_humidity = responseData.main.humidity;
            let M_pressure = responseData.main.pressure;
            let M_temp_max = responseData.main.temp_max;
            let M_temp_min = responseData.main.temp_min;
            let M_city = responseData.name;
            let M_w_type = responseData.weather[0].description;
            let M_country = responseData.sys.country;
            let M_sunrise = gettime(responseData.sys.sunrise);
            let M_sunset = gettime(responseData.sys.sunset);
            let M_wdeg = responseData.wind.deg;
            let M_wspeed = responseData.wind.speed;

            document.querySelector(".location").innerHTML = M_city;
            document.querySelector(".currtmp").innerHTML = ktoc(M_temp) + "°C";
            document.querySelector(".flike").innerHTML = ktoc(M_feellike) + "°C";
            document.querySelector(".wdesc").innerHTML = M_w_type;
            document.querySelector(".cntry").innerHTML = M_country;
            document.querySelector(".mint").innerHTML = ktoc(M_temp_min) + "°C";
            document.querySelector(".maxt").innerHTML = ktoc(M_temp_max) + "°C";
            document.querySelector(".humi").innerHTML = M_humidity + "%";
            document.querySelector(".pressure").innerHTML = M_pressure;
            document.querySelector(".windspd").innerHTML = M_wspeed + "KM/H";
            document.querySelector(".winddeg").innerHTML = M_wdeg;
            document.querySelector(".sunrise").innerHTML = M_sunrise;
            document.querySelector(".sunset").innerHTML = M_sunset;
        }
    });

    xhr.open('GET', `https://weather-api138.p.rapidapi.com/weather?city_name=${city}`); // Use backticks for template literal
    xhr.setRequestHeader('x-rapidapi-key', 'e57219ff31msh115212cac713e55p1532dejsn316cb3743f70');
    xhr.setRequestHeader('x-rapidapi-host', 'weather-api138.p.rapidapi.com');

    xhr.send(data);
}