const { json } = require("body-parser");


const myURL = 'http://localhost:8081';


//TODO: Take the input, then post into the server
function handleSubmit(event) {

    event.preventDefault()

    let city = document.getElementById('user-location').value
    const start_date = document.getElementById('start-date').value
    console.log(start_date);
    const end_date = document.getElementById('end-date').value
    console.log(end_date);

    const getTripLength = ((start, end) => {
        const dt1 = new Date(start);
        const dt2 = new Date(end);
        return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
    })(start_date, end_date);

    console.log(getTripLength);
    // Client.validateDate(start_date)

    console.log('SUCESS');

    postData(`${myURL}/weather`, { place: city, start: start_date, end: end_date, length: getTripLength })
    updateUI()

    console.log("::: Form Submitted :::")
    console.log('here WORKED !!! ');
    document.getElementById('days').innerHTML = ` your trip is ${getTripLength} days`;



}

function postData(url = '', data = {}) {
    console.log('here fetch 4');
    return fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}

//TODO: Update the interface
function updateUI() {
    console.log('Update UI  Begins');
    const getData = fetch(`${myURL}/data`, { method: 'GET' }).then((res) => {

        return res.json();

    }).then((res) => {
        //console.log(res);
        document.getElementById('days').innerHTML = ` Your trip is ${res.input.length} days`;
        document.getElementById('city').innerHTML = ` The destination to  ${res.input.place} , ${res.coords.country}`;
        document.getElementById('wether').innerHTML = ` The wether is ${res.forecast.wether_desc} the tempreture is ${res.forecast.temp} `;
        document.getElementById('images').innerHTML = ` <img src="${res.pics.pic1}" alt="" class="image"> <br> <img src="${res.pics.pic2}" alt="" class="image"> `;
        if (res.forecast.max_temp != null) { document.getElementById('wether').innerHTML += `<br> Maximum tempreture for the future wether is  ${res.forecast.max_temp}, and the lowest tempreture is  ${res.forecast.low_temp}`; }
    }).catch((error) => {

        console.log(error);
    });

}
export { handleSubmit }