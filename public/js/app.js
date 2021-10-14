const getFormatedDate = timestamp => {
	const formatedDate = new Date(timestamp)
	return formatedDate.toLocaleDateString()
}

const homePage = () => {
	const videos = document.querySelectorAll('.card')

	videos.forEach(item => {
		item.firstElementChild.addEventListener('click', event => {
			const currentPath = window.location.href
			window.location.href = `${currentPath}videos/${item.id}`
		})
	})
}

const viewPage = () => {
	const addComment = document.forms.namedItem("addComment")
	addComment.addEventListener('submit', (event) => {
		event.preventDefault()

		const formData = new FormData(addComment)
		const commentData =
		{
			commentInfo: {
				user: formData.get('author'),
				text: formData.get('comment')
			},
			videoId: formData.get('video-id')
		}

		console.log('commentData', commentData)
		axios.post('./comments', commentData).then((response) => {
			if (response.status === 200) location.reload()
			else alert('Could not create comment.')
		})

	})

	const videoId = document.getElementsByTagName('video')[0].id
	console.log('videoId: ', videoId)

	// Like video
	const btnLike = document.getElementById('btnLike')

	btnLike.addEventListener('click', event => {
		const likesQty = parseInt(counterLike.innerHTML)

		const data = {
			videoId: videoId,
			action: 'like',
			qty: likesQty + 1
		}

		axios.patch('./', data).then((response) => {
			if (response.status === 200) counterLike.innerHTML = likesQty + 1
		})

	});

	// Dislike video

	const btnDisike = document.getElementById('btnDisike')

	btnDisike.addEventListener('click', event => {
		const dislikesQty = parseInt(counterDislike.innerHTML)

		const data = {
			videoId: videoId,
			action: 'dislike',
			qty: dislikesQty + 1
		}

		axios.patch('./', data).then((response) => {
			if (response.status === 200) counterDislike.innerHTML = dislikesQty + 1
		})
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