import './style.css';

const start = ()=>{
    const srchBtn = document.querySelector('#srchBtn');
    srchBtn.addEventListener('click', ()=>{
    addCard();
    delCard();
})
}

let inputValue = '';

const input = document.querySelector('#input');
    input.addEventListener('input', (e)=>{
    inputValue = e.target.value;
    //console.log(inputValue);
})

const delCard = ()=>{
    const card = document.querySelector('#infoCard');
        if(document.contains(card)) {
        card.remove();
    }
}

let lat;
let lon;
let timezoneName;
let time;

async function coordTime(){
    let targetDate = new Date()
    let timestamp = targetDate.getTime()/1000 + targetDate.getTimezoneOffset() * 60 // Current UTC date/time expressed as seconds since midnight, January 1, 1970 UTC
    //const key = AIzaSyCZ1jTDy5GspXb3RbXihi62uYxmoUOG1FM;
    const response = await fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${lat}%2C${lon}&timestamp=${timestamp}&key=AIzaSyCZ1jTDy5GspXb3RbXihi62uYxmoUOG1FM`, {mode: 'cors'});
    const data = await response.json();
    console.log(data);

    timezoneName = response.timeZoneName;
    console.log(timezoneName);
    throw new Error(response.status);
}

async function addCard(){
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${inputValue}&APPID=b69d4590fd811fb3897f54a978061a9b`, {mode:'cors'})
    const data = await response.json();
    //console.log(data);

    const body = document.querySelector('#body');
    const card = document.createElement('div');
    card.id = 'infoCard';
    body.appendChild(card);

    const location = document.createElement('h3');
    location.id = 'location';
    location.textContent = data.name + ', ' + data.sys.country; 
    card.appendChild(location);

    const type = document.createElement('h3');
    type.id = 'weatherType';
    type.textContent = data.weather[0].description;
    type.value = data.weather[0].main;
    card.appendChild(type);


    const temp = document.createElement('h3');
    temp.id = 'temp';
    temp.textContent = 'Temp: ' + data.main.temp;
    card.appendChild(temp);

    const feelsLike = document.createElement('h3');
    feelsLike.id = 'feelsLike';
    feelsLike.textContent = 'Feels like: ' + data.main.feels_like;
    card.appendChild(feelsLike)

    lat = data.coord.lat;
    lon = data.coord.lon;
    //console.log(coord);

    coordTime();

    throw new Error(response.status);

    
}


start();
