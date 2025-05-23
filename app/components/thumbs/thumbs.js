function changeThumb(imageSrc, id) {
    const container = document.querySelector('.thumb')
    const thumb = document.querySelector('.thumb-container img')
    const aside = document.querySelector('.aside-container')

    aside.innerHTML = ''
    thumb.classList.add('hide-thumb')
    setTimeout(() => {thumb.setAttribute('src', imageSrc)}, 200)
    setTimeout(() => {
        id && container.setAttribute('id', id)
        thumb.classList.remove('hide-thumb')
    
    }, 600)
}