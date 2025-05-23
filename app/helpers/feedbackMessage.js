function hideMessage() {
    const feedbackMessage = document.querySelector('.message-feedback')
    setTimeout(() => {
        feedbackMessage.classList.remove('active')
        setTimeout(()=> feedbackMessage.remove(), 800)
    }, 5000)
}
function feedbackMessage(rule, message) {

    const element = document.querySelector('.page-frame')

    switch (rule) {
        case 'fail':
            const divFail = document.createElement("div")
            divFail.classList.add('message-feedback')
            divFail.classList.add('error')
            element.after(divFail)                  
            divFail.innerText = message ?? 'Houve um erro no envio. Tente novamente.'
            setTimeout(()=> divFail.classList.add('active'), 300)
            hideMessage()
            return false
        case 'success':
            const divCode = document.createElement("div")
            divCode.classList.add('message-feedback')
            divCode.classList.add('success')
            element.after(divCode)                  
            divCode.innerText =  message ?? 'Código reenviado com sucesso'
            setTimeout(()=> divCode.classList.add('active'), 300)
            hideMessage()
            return false
        default:
            break;
    }


}