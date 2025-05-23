function setUserForgot() {

    const userForgot = getCookie('userForgot')
    const loading = document.querySelector('.loading')

    if(!userForgot) {
        window.location.replace("/");
    }

    fetch('').then((response) => {
        if(response.status === 200) {
            changeThumb('/sabin/images/thumbs/confirm-thumb.png')
        }
    }).then((data) => {

        const contactData = {
            phone: '(**) 99239***',
            email: 'l***c@gmail.com'
        }
        const phoneCard = document.querySelector('.phone-card .card-info');
        phoneCard.innerText = contactData.phone

        const emailCard = document.querySelector('.email-card .card-info');
        emailCard.innerText = contactData.email

        loading.classList.add('hide-loading')

    }).catch((error) => {
        validateInput(passwordInput, 'wrong')
        
    })

}