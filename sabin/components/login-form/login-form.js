function showPassword (input) {
    const type = input.getAttribute('type')
    if(type === 'password') {
        input.setAttribute('type', 'text')
    } else {
        input.setAttribute('type', 'password')
    }
}

function validateInput(input, rule, message) {

    const feedbackMessages = document.querySelectorAll('.field-feedback')
    feedbackMessages.forEach(element => {
        element.classList.remove('active')
    setTimeout(()=> element.remove(), 1000)
    });
    

    switch (rule) {
        case 'required':

            if(input.value === '') {
                const div = document.createElement("div")
                div.classList.add('field-feedback')
                input.after(div)                  
                div.innerText = message ?? 'Campo Obrigatório'
                setTimeout(()=> div.classList.add('active'), 300)
                return false
            }
            break;
        case 'requiredChecked':
            const inputs = []
            input.forEach(element => {
                if(element.checked) {
                    inputs.push(element)
                } 
            })
            if(inputs.length === 0) {
                const div = document.createElement("div")
                div.classList.add('field-feedback')
                input[input.length -1].parentElement.after(div)                  
                div.innerText = message ?? 'Marque pelo menos um opção'
                setTimeout(()=> div.classList.add('active'), 300)
                return false
            }
            break;
        case 'wrong':
            const divWrong = document.createElement("div")
            divWrong.classList.add('field-feedback')
            input.after(divWrong)                  
            divWrong.innerText = message ?? 'Confira se a informação está correta'
            setTimeout(()=> divWrong.classList.add('active'), 300)
            return false
            
        case 'fail':
            const divFail = document.createElement("div")
            divFail.classList.add('field-feedback')
            input.after(divFail)                  
            divFail.innerText = message ?? 'Houve um erro no envio. Tente novamente.'
            setTimeout(()=> divFail.classList.add('active'), 300)
            return false
        
        case 'minlength':
        const minLength = parseInt(input.getAttribute('minlength'))
        if(input.value.length < minLength) {
            const div = document.createElement("div")
            div.classList.add('field-feedback')
            input.after(div)                  
            div.innerText = message ?? 'Os campos não estão completos'
            setTimeout(()=> div.classList.add('active'), 300)
            return false
        }
            break;
        case 'email':
            var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if(!input.value.match(validRegex)) {
                const div = document.createElement("div")
                div.classList.add('field-feedback')
                input.after(div)                  
                div.innerText = message ?? 'Esse não é um email válido'
                setTimeout(()=> div.classList.add('active'), 300)
                return false
            }
    }

    return true

}

function feedbackMessage(element, rule, message) {

    const feedbackMessages = element.nextElementSibling
    feedbackMessages && feedbackMessages.classList.remove('active')
    setTimeout(()=> feedbackMessages && feedbackMessages.remove(), 100)

    switch (rule) {
        case 'fail':
            const divFail = document.createElement("div")
            divFail.classList.add('message-feedback')
            divFail.classList.add('error')
            element.after(divFail)                  
            divFail.innerText = message ?? 'Houve um erro no envio. Tente novamente.'
            setTimeout(()=> divFail.classList.add('active'), 300)
            return false
            case 'success':
                const divCode = document.createElement("div")
                divCode.classList.add('message-feedback')
                divCode.classList.add('success')
                element.after(divCode)                  
                divCode.innerText =  message ?? 'Código reenviado com sucesso'
                setTimeout(()=> divCode.classList.add('active'), 300)
                return false
        default:
            break;
    }
}

function sendLogin(form) {
    const loading = document.querySelector('.loading')
    const formData = new FormData(form)

    const userInput = form.querySelector('input[name="user"]');
    const passwordInput = form.querySelector('input[name="password"]');

    if(
        validateInput(userInput, 'required') &&
        validateInput(passwordInput, 'required')
    ) {
    

    if(formData.get('saveLoginData') === 'on') {
        setCookie('user',userInput.value, 365)
    } else {
        deleteCookie('user')
    }

    fetch('').then((response) => {
        if(response.status === 200) {
           nextStep()
            changeThumb('/sabin/images/thumbs/confirm-thumb.png')
            loading.classList.remove('hide-loading')
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
        console.log()
        validateInput(passwordInput, 'wrong')
        
    })
        }

   return false
}

function sendConfirmation(type, ) {
    const steps = document.querySelector('.steps');
    const currentStep = document.querySelector('.show-step')

    fetch('').then((response) => {
        if(response.status === 200) {
            nextStep()
            const phoneCard = document.querySelector('.phone-card .card-info');
            const emailCard = document.querySelector('.email-card .card-info');
            changeThumb('/sabin/images/thumbs/login-end-thumb.png')

            steps.querySelector('.validation-container p span').innerText = 
            type === 'email' 
            ? 'email '+emailCard.textContent 
            : 'telefone '+phoneCard.textContent
        }
    }).then((data) => {

    }).catch((error) => {
        console.log(error)
        feedbackMessage(steps, 'fail')
    }
       
    )
  }

function sendValidation(form) {

    const steps = document.querySelector('.steps');
    const codeInput = form.querySelector(`input[name=code]`);
    
    const formData = new FormData(form)

    let code = ''


    for (var pair of formData.entries()) {
        code += pair[1]; 
    }
    codeInput.setAttribute('value', code)

    if(validateInput(codeInput, 'minlength')) {
       
        fetch('').then((response) => {

        }).then((data) => {
            if(code != '111111') {
                return validateInput(codeInput, 'wrong', 'O código está incorreto, tente novamente')
            } else {
                window.location.replace("/sabin/pages/app.html");
            }
    
        }).catch((error) => {
            return feedbackMessage(steps, 'fail')
        })
    }
    codeInput.setAttribute('value', '')
   return false
}

function resendCode() {
    const steps = document.querySelector('.steps');

    fetch('').then((response) => {
        feedbackMessage(steps, 'success', 'Código reenviado com sucesso')
    }).then((data) => {

    }).catch((error) => {
        
        
    })
    return false
}

function autoChangeFocus(form) {
    
    const inputs = form.querySelectorAll('input')

    if(inputs[0].value.length === 1) {
        inputs[1].focus()
    }
    if(inputs[1].value.length === 1) {
        inputs[2].focus()
    }
     if(inputs[2].value.length === 1) {
        inputs[3].focus()
    }
     if(inputs[3].value.length === 1) {
        inputs[4].focus()
    }
     if(inputs[4].value.length === 1) {
        inputs[5].focus()
    }
    if(inputs[5].value.length === 1) {
        inputs[6].focus()
    }
}

function nextStep() {
    const currentStep = document.querySelector('.show-step')
    const stepsContainer = document.querySelector('.steps')


    setTimeout(() => {
        stepsContainer.style.minHeight = (currentStep.nextElementSibling.offsetHeight)+'px'
    }, 300);

    currentStep.nextElementSibling.classList.add('show-step')
    currentStep.classList.remove('show-step')


}

function prevStep() {
    const currentStep = document.querySelector('.show-step')
    const stepsContainer = document.querySelector('.steps')
    currentStep.previousElementSibling.classList.add('show-step')
    currentStep.classList.remove('show-step')

    setTimeout(() => {
        stepsContainer.style.minHeight = (currentStep.previousElementSibling.offsetHeight)+'px'
    }, 300);
}
