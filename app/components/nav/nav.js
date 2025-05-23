function changeMenu(item, page) {
    showLoading()
    const activeMenu = document.querySelector('.active')
    const content = document.querySelector('.content')
    content.classList.add('hide-content')
    activeMenu.classList.remove('active')

    item.classList.add('active')
    loadPageData(page, '.content')
    content.classList.add('show-content')
    
}

function setActiveMenu(id) {
    const activeMenu = document.querySelector('.active')
    activeMenu.classList.remove('active')
    const item = document.querySelector(id)
    item.classList.add('active')
}
