const videoForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

videoForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const video = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    //Aquí se hace la búsqueda del video

})