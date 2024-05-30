function loadPageData(file, selector) {
    const container = document.querySelector(selector)
    fetch(file)
      .then(response => {
    return response.text()
  })
    .then(data => {
        container.innerHTML = data
    });
}