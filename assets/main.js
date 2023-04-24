const socket = io()
const messages = document.querySelector('.messages')
const form = document.querySelector('.form')
const input = document.querySelector('.input')
const nameBlock = document.querySelector('.name')
const geo = document.querySelector('.geo')


const userName = prompt('Как вас зовут?')
nameBlock.innerHTML = `${userName}`
const userId = getRandomNumber()

function getRandomNumber() {
    return Math.random()
}



form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (input.value) {
        sendMes(input.value)
    }

    input.value = ''
})

function sendMes(mes, isLoc = false){
    socket.emit('chat message', {messages: mes, isLoc, name: userName, userId: userId})
}


socket.on('chat message', (data) => {
    const item = document.createElement('li')
    if(data.isLoc){
        item.innerHTML = `<span>${data.name}</span>: <a href="${data.message}">Локация</a>`

    }else{
        item.innerHTML = `<span>${data.name}</span>: ${data.message}`
    }
    if(userId == data.userId) {
        
        item.classList.add('left');
    }

    messages.appendChild(item)

    window.scrollTo(0, document.body.scrollHeight)
})

geo.addEventListener('click', () => {
    if (!navigator.geolocation) {
        alert('Геолокация не поддерживается вашим браузером')
    } else {
        navigator.geolocation.getCurrentPosition(success, error)
        
    }
})

function error() {
    alert('Невозможно получить геопозицию')
}

function success(position) {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    sendMes(`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`,true)
}


