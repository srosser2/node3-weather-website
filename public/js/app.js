console.log('Client side js loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })



const weatherForm = document.querySelector('form');
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')
const messageThree = document.getElementById('message-3')



weatherForm.addEventListener('submit', (e) => {
        e.preventDefault();
        messageOne.textContent = "Loading";
        messageTwo.textContent = "";
        messageThree.textContent = "";
        const location = search.value;

        fetch('/weather?address='+ location).then((response) => {
            response.json().then((data) => {
                if(data.error) {
                    messageOne.textContent = data.error;
                } else {
                    messageOne.textContent = data.location;
                    messageTwo.textContent = data.summary;
                    messageThree.textContent = `It is currently ${data.temperature} celcius and there is a ${data.precipProbability * 100}% chance of rain`;
                }
            })
        })

        //console.log(location);


})
