const recoverData = {}


function setRecoverData(data) {
    Object.assign(recoverData, data)
}


function getCityData() {
    const loading = document.querySelector('.loading')
    const stepIndicator = document.querySelector('.step-indicator')
    stepIndicator.classList.remove('hide')
    const form = document.querySelector('#city-form .radios')
    const userForgot = getCookie('userForgot')

    fetch('').then((response) => {
        if (response.status === 200) {
            nextStep()
            nextStepIndicator()
            changeThumb('/images/thumbs/confirm-thumb.png')
            loading.classList.remove('hide-loading')
        }
    }).then((data) => {

        const cityData = [
            'Taguatinga',
            'Taguatinga',
            'Taguatinga',
            'Taguatinga',
            'Taguatinga',
            'Taguatinga'
        ]

        loading.classList.add('hide-loading')

        const labels = form.querySelectorAll('label')

        labels.forEach(element => {
            element.remove()
        })

        cityData.forEach(element => {
            const label = document.createElement("label")
            const input = document.createElement("input")
            const p = document.createElement('p')
            p.innerText = element
            input.setAttribute('type', 'radio')
            input.setAttribute('name', 'city')
            input.setAttribute('value', element)
            input.addEventListener('change', () => setRecoverData({
                city: element
            }))
            label.append(input)
            label.append(p)
            form.append(label)

        });

    }).catch((error) => {
        validateInput(form, 'wrong')

    })
}


function getCEPData() {

    const loading = document.querySelector('.loading')
    const form = document.querySelector('#cep-form .radios')
    const radio = document.querySelectorAll('input[name=city]')

    if (validateInput(radio, 'requiredChecked')) {

        const userForgot = getCookie('userForgot')

        fetch('').then((response) => {
            if (response.status === 200) {
                nextStep()
                nextStepIndicator()
                loading.classList.remove('hide-loading')
            }
        }).then((data) => {

            const cityData = [
                '72305-607',
                '72305-607',
                '72305-607',
                '72305-607',
                '72305-607',
                '72305-607'
            ]

            loading.classList.add('hide-loading')

            const labels = form.querySelectorAll('label')

            labels.forEach(element => {
                element.remove()
            })

            cityData.forEach(element => {
                const label = document.createElement("label")
                const input = document.createElement("input")
                const p = document.createElement('p')
                p.innerText = element
                input.setAttribute('type', 'radio')
                input.setAttribute('name', 'cep')
                input.setAttribute('value', element)
                input.addEventListener('change', () => setRecoverData({
                    cep: element
                }))

                label.append(input)
                label.append(p)
                form.append(label)

            });

        }).catch((error) => {
            validateInput(form, 'wrong')

        })
    }
    return false
}

function getSelectContactUpdate(type) {

    const radio = document.querySelectorAll('input[name=cep]')

    if (validateInput(radio, 'requiredChecked')) {
        nextStep()
        nextStepIndicator()
        changeThumb('/images/thumbs/login-end-thumb.png')
    }


    return false
}

function goToContactInput(type) {

    const cards = document.querySelector('.card-list-recover')

    if(!recoverData.type) {
        return validateInput(cards, 'wrong', 'Selecione um dos tipos de contato')
    }
    changeThumb('/images/thumbs/confirm-thumb.png')
    nextStep()
    const stepIndicator = document.querySelector('.step-indicator')
    stepIndicator.classList.add('hide')

}


function nextStepIndicator() {
    const currentStep = document.querySelector('.active-step')
    currentStep.nextElementSibling.classList.add('active-step')
    currentStep.classList.remove('active-step')
}

function prevStepIndicator() {
    const currentStep = document.querySelector('.active-step')
    currentStep.previousElementSibling.classList.add('active-step')
    currentStep.classList.remove('active-step')
}


function selectContact(card, type) {

    const inputs = document.querySelectorAll('#step5 form input')

    inputs.forEach(element => {
        element.remove()
    })

    const labels = document.querySelectorAll('.card-list .active')
    const step5ContactType = document.querySelector('#step5 h2 span')
    const step5Form = document.querySelector('#step5 form .inputs')
    const input = document.createElement("input")

    input.setAttribute('type', 'text')
    input.setAttribute('class', type)
    input.setAttribute('placeholder', type === 'phone' ? 'Digite seu telefone (apenas números com DDD)' : 'Digite aqui seu email')
    input.setAttribute('name', 'contact')
    type === 'phone' && input.setAttribute('minlength', '10')
    type === 'phone' && input.addEventListener('keydown', (e) => { justNumbers(e)})

    step5Form.append(input)
    step5ContactType.innerHTML = type === 'phone' ? 'telefone' : 'e-mail'

    labels.forEach(element => {
        element.classList.remove('active')
    })

    card.classList.add('active')
    setRecoverData({
        type: type
    })
}

function sendRecover() {
    const loading = document.querySelector('.loading')
    const contact = document.querySelector('input[name=contact]')
    const contactTypeText = document.querySelector('.contact-type')
    const contactTypeTitleText = document.querySelector('.contact-type-title')
    const contactTypeTextData = document.querySelector('.contact-data')

    
    contactTypeText.textContent = recoverData.type === 'phone' ? 'telefone' : 'e-mail'
    contactTypeTitleText.textContent = recoverData.type === 'phone' ? 'telefone' : 'e-mail'
    contactTypeTextData.textContent = contact.value

    setRecoverData({contact: contact.value})

    if(
        validateInput(contact, 'required') && 
    (recoverData.type === 'email' ? validateInput(contact, 'email') : 
    validateInput(contact, 'minlength', 'O telefone deve ter pelo menos 10 dígitos') )
) {

    fetch('').then((response) => {
        if (response.status === 200) {
            nextStep()
            changeThumb('/images/thumbs/login-end-thumb.png')
            loading.classList.remove('hide-loading')
        }
    }).then((data) => {
        console.log(recoverData)
        loading.classList.add('hide-loading')

    }).catch((error) => {
        validateInput(contact, 'wrong')
        return false

    })
}

    return false
}

function sendValidationRecover(form) {

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
            if(response.status === 200) {
                setTimeout(() => window.location.replace("/"), 7000)
                return feedbackMessage(steps, 'success', 'Seu cadastro foi atualizado')
            }
            
        }).then((data) => {
    
        }).catch((error) => {
            return feedbackMessage(steps, 'fail')
        })
    }
    codeInput.setAttribute('value', '')
   return false
}