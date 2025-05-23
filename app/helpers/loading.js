function hideLoading() {
  const loading = document.querySelector('.loading')
  loading && loading.classList.add('hide-loading')
}
function showLoading() {
  const loading = document.querySelector('.loading')
  loading && loading.classList.remove('hide-loading')
}