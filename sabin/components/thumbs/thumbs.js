function changeThumb(imageSrc) {

    const thumb = document.querySelector('.thumb-container img')
    thumb.classList.add('hide-thumb')
    setTimeout(() => {thumb.setAttribute('src', imageSrc)}, 500)
    setTimeout(() => thumb.classList.remove('hide-thumb'), 550)
}