

const weatherForm = document.querySelector('#weatherForm');
const search = document.getElementsByTagName('input')[0];
const getWeather = document.querySelector('#getWeather');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (e) => {
    if (search == null || search.value.length <= 0) {
        console.log('test');
        e.preventDefault()
        return console.log('You Need To write any value to search!!');
    }

    messageOne.textContent = 'loading.....'
    messageTwo.textContent = ''


    fetch(`/weather?address=${search.value}`).then(response => {
        console.log(response);
        // response.json().then(data => {
        //     console.log(data);
        //     messageOne.textContent = data.location;
        //     messageOne.textContent = data.temperature;
        //     search.value = '';
        // })
    });
})

// getWeather.addEventListener('click', (e) => {
//     if (search == null || search.value.length <= 0) {
//         e.preventDefault()
//         return console.log('You Need To write any value to search!!');
//     }

//     fetch(`http://localhost:3000/weather?address=${search.value}`).then(response => {
//         response.json().then(data => {
//             console.log(data);
//             search.value = '';
//         })
//     });
// })

