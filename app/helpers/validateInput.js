function removePrevFeedback(name) {
    const prevFeedback = document.querySelector('.field-feedback.' + name)
    prevFeedback && prevFeedback.classList.remove('active')
    setTimeout(() => prevFeedback && prevFeedback.remove(), 600)
}


function validateInput(input, rule, message) {
    const name = input[0] ? input[0].getAttribute('name') : input.getAttribute('name')
    removePrevFeedback(name)
    switch (rule) {
        case 'required':

            if (input.value === '') {
                const div = document.createElement("div")
                div.classList.add(name)
                div.classList.add('field-feedback')
                input.after(div)
                div.innerText = message ?? 'Campo Obrigatório'
                setTimeout(() => div.classList.add('active'), 300)
                return false
            }
            break;
        case 'requiredChecked':
            const inputs = []
            input.forEach(element => {
                if (element.checked) {
                    inputs.push(element)
                }
            })
            if (inputs.length === 0) {
                const div = document.createElement("div")
                div.classList.add(name)
                div.classList.add('field-feedback')
                input[input.length - 1].parentElement.after(div)
                div.innerText = message ?? 'Marque pelo menos um opção'
                setTimeout(() => div.classList.add('active'), 300)
                return false
            }
            break;
        case 'wrong':
            const divWrong = document.createElement("div")
            divWrong.classList.add(name)
            divWrong.classList.add('field-feedback')
            input.after(divWrong)
            divWrong.innerText = message ?? 'Confira se a informação está correta'
            setTimeout(() => divWrong.classList.add('active'), 300)
            return false

        case 'fail':
            const divFail = document.createElement("div")
            divFail.classList.add(name)
            divFail.classList.add('field-feedback')
            input.after(divFail)
            divFail.innerText = message ?? 'Houve um erro no envio. Tente novamente.'
            setTimeout(() => divFail.classList.add('active'), 300)
            return false

        case 'minlength':
            const minLength = parseInt(input.getAttribute('minlength'))
            if (input.value.length < minLength) {
                const div = document.createElement("div")
                div.classList.add(name)
                div.classList.add('field-feedback')
                input.after(div)
                div.innerText = message ?? 'Os campos não estão completos'
                setTimeout(() => div.classList.add('active'), 300)
                return false
            }
            break;
        case 'email':
            var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (!input.value.match(validRegex)) {
                const div = document.createElement("div")
                div.classList.add(name)
                div.classList.add('field-feedback')
                input.after(div)
                div.innerText = message ?? 'Esse não é um email válido'
                setTimeout(() => div.classList.add('active'), 300)
                return false
            }
            break;
        case 'file':
            const accept = input.getAttribute('accept').split(',').map(function(item) {
                return item.trim();
              });
            let totalSize = 0;
            const div = document.createElement("div")
            div.classList.add(name)
            div.classList.add('field-feedback')
            input.after(div)

            if(input.files.length > 5) {
                div.innerText = message ?? 'São permitidos no máximo 5 arquivos'
                setTimeout(() => div.classList.add('active'), 300)
                return false
            }

            Array.from(input.files).forEach((file) => {
                totalSize += file.size
            })

            const filesTypes = []
            
            Array.from(input.files).forEach((file) => {
                if(!accept.includes(file.type)) {
                    filesTypes.push(file.type)
                }
            })
            if(filesTypes.length > 0) {
                div.innerText = message ?? 'Formato não permitido'
                setTimeout(() => div.classList.add('active'), 300)
                return false
            }

            if(totalSize > 2000000) {
                div.innerText = message ?? 'O tamanho máximo deve ser até 2mb'
                setTimeout(() => div.classList.add('active'), 300)
                    return false
            }
            break;
    }
    return true
}