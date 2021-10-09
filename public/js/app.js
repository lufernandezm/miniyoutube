const start = () => {
    const videos = document.querySelectorAll('.card')
   
    videos.forEach(item => {
            item.firstElementChild.addEventListener('click', event => {
                    const currentPath = window.location.origin
                    window.location.href = `${currentPath}/videos/${item.id}`
            })
    })
}

window.onload = start