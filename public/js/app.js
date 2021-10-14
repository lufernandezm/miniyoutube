const getFormatedDate = timestamp => {
        const formatedDate = new Date(timestamp)
        return formatedDate.toLocaleDateString()
}

const homePage = () => {
        const videos = document.querySelectorAll('.card')

        videos.forEach(item => {
                item.firstElementChild.addEventListener('click', event => {
                        const currentPath = window.location.href
                        window.location.href = `${currentPath}/${item.id}`
                })
        })
}

const viewPage = () => {

        const videoId = document.getElementsByTagName('video')[0].id

        // Like video
        const btnLike = document.getElementById('btnLike')
        btnLike.addEventListener('click', event => {

                const likesQty = parseInt(counterLike.innerHTML)
                const likeRequest = new XMLHttpRequest();
                const data = {
                        videoId: videoId,
                        action: 'like',
                        qty: likesQty + 1
                }

                likeRequest.open('PATCH', 'https://reqbin.com/echo/patch/json', true);
                likeRequest.setRequestHeader("Accept", "application/json");
                likeRequest.setRequestHeader("Content-Type", "application/json");

                likeRequest.onreadystatechange = () => {
                        if (likeRequest.readyState === 4) {
                                console.log('status => ', likeRequest.status);
                                console.log('responseText => ', likeRequest.responseText);
                        }
                };

                likeRequest.send(data);

        });

        // Dislike video
        const btnDisike = document.getElementById('btnDisike')
        btnDisike.addEventListener('click', event => {

                const dislikesQty = parseInt(counterDislike.innerHTML)
                const dislikeRequest = new XMLHttpRequest();
                const data = {
                        videoId: videoId,
                        action: 'dislike',
                        qty: dislikesQty + 1
                }

                dislikeRequest.open('PATCH', 'https://reqbin.com/echo/patch/json', true);
                dislikeRequest.setRequestHeader("Accept", "application/json");
                dislikeRequest.setRequestHeader("Content-Type", "application/json");

                dislikeRequest.onreadystatechange = () => {
                        if (dislikeRequest.readyState === 4) {
                                console.log('status => ', dislikeRequest.status);
                                console.log('responseText => ', dislikeRequest.responseText);
                        }
                };

                dislikeRequest.send(data);
        });
}

const start = () => {

        const mainElement = document.body.children[0]
        const page = mainElement.dataset.page

        switch (page) {
                case 'home':
                        homePage()
                        break
                case 'view':
                        viewPage()
                        break
        }
}

window.onload = start