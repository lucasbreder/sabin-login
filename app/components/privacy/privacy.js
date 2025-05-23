const privacyForm = [
    {
        label: 'Solicitação de informação',
        type: 'radio',
        value: 'Solicitação de informação',
        name: 'tipoRequisicao',
        onChange: 'showRevokeOptions()'
    },
    {
        label: 'Eliminação de dados pessoais',
        value: 'Eliminação de dados pessoais',
        type: 'radio',
        name: 'tipoRequisicao',
        onChange: 'showRevokeOptions()'
    },
    {
        label: 'Portabilidade',
        value: 'Portabilidade',
        type: 'radio',
        name: 'tipoRequisicao',
        onChange: 'showRevokeOptions()'
    },
    {
        label: 'Atualização e correção de dados pessoais',
        value: 'Atualização e correção de dados pessoais',
        type: 'radio',
        name: 'tipoRequisicao',
        onChange: 'showRevokeOptions()'
    },
    {
        label: 'Revogação de consentimento',
        value: 'Revogação de consentimento',
        type: 'radio',
        name: 'tipoRequisicao',
        onChange: 'showRevokeOptions()'
    },
    {
        label: '',
        type: 'select',
        initialState: 'hide',
        options: [
            "Permissão de visualização de exames pelo Médico",
            "Contatos de publicidade",
            "Ocultação de exames do histórico",
          ],
        name: 'tipoRevogacao',
    },
    {
        label: 'Forneça mais detalhes sobre a sua solicitação:',
        type: 'textarea',
        placeholder: 'Sua mensagem...',
        name: 'detalhes'
    },
    {
        label: 'Anexar uma cópia (frente e verso) de um documento de identificação oficial com foto*',
        type: 'file',
        accept: 'application/pdf, image/jpg, image/jpeg',
        name: 'documentos',
        obs: 'Permitido apenas ate 5 arquivos em formato .jpg  e .pdf  com o tamanho máximo de máximo de 2Mb.',
        required: true,

    }
]

function sendPrivacyRequest(form) {
   
    var formData = new FormData(form)

    var inputs = form.querySelectorAll("input[required='true']")
    var radios = form.querySelectorAll("input[type='radio']")
    var file = form.querySelector("input[type='file']")
    
    const requiredData = []

    inputs.forEach(element => {
        requiredData.push(validateInput(element, 'required'))
    });

    if(requiredData.includes(false)) {
        return false
    }

    if(!validateInput(radios, 'requiredChecked')) {
        return false
    }

    if(!validateInput(file, 'file')) {
        return false
    }

    fetch('').then((response) => {
        if (response.status === 200) {
            showLoading()
            const documents = document.querySelectorAll('.documentos div')
            documents.forEach((item) => {
                item.remove()
            })
            form.reset()
            return feedbackMessage('success', 'Solicitação enviada com sucesso')
        }
    }).then((data) => {
        const privacyForm= document.querySelector('.privacy-form')
        privacyForm.classList.add('hide')
        const privacyResult = document.querySelector('.privacy-result')
        setTimeout(() => {privacyResult.classList.remove('hide'); privacyResult.scrollIntoView()}, 500)
        const privacyDate = document.querySelector('.privacy-result-date')
        const privacyType = document.querySelector('.privacy-result-type')
        const privacyDetails = document.querySelector('.privacy-result-details')
        const privacyId = document.querySelector('.privacy-result-id span')
        const fakeRequest = {
            id: 'P456789ON32X',
            date: '13/05/2024',
            type: 'Atualização e correção de dados pessoais.',
            details: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.'
        }
        privacyDate.textContent = fakeRequest.date
        privacyType.textContent = fakeRequest.type
        privacyDetails.textContent = fakeRequest.details
        privacyId.textContent = fakeRequest.id
        hideLoading()
    }).catch((error) => {
        return feedbackMessage('fail')
    })

    return false
}

function showRevokeOptions(input) {
    const revokeContainer = document.querySelector('.tipoRevogacao')
    const revokeSelect = document.querySelector('.tipoRevogacao select')
    
    if(input.value === 'Revogação de consentimento') {
        revokeContainer.classList.remove('hide')
        revokeSelect.setAttribute('required', true)
    } else {
        revokeContainer.classList.add('hide')
        revokeSelect.removeAttribute('required')
    }
        
}

function getPrivacyRequests() {
    fetch('').then((response) => {
        if (response.status === 200) {
           
        }
    }).then((data) => {
        const fakeRequests = [
            {
                id: 'P456789ON32X',
                date: '13/05/2024',
                type: 'Atualização e correção de dados pessoais.',
                currentStep: 1,
                details: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.'
            },
            {
                id: 'P456789ON32X',
                date: '13/05/2024',
                type: 'Atualização e correção de dados pessoais.',
                currentStep: 3,
                details: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.'
            },
            {
                id: 'P456789ON32X',
                date: '13/05/2024',
                type: 'Atualização e correção de dados pessoais.',
                currentStep: 2,
                details: 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.'
            }
        ]

        const privacyRequestsContainer = document.querySelector('.privacy-request-list')

        fakeRequests.forEach(item => {
        const privacyItem = document.createElement('div')
        const privacySteps = document.createElement('div')
        const privacyId = document.createElement('div')
        const privacyTitle1 = document.createElement('div')
        const privacyDate = document.createElement('div')
        const privacyTitle2 = document.createElement('div')
        const privacyType = document.createElement('div')
        const privacyTitle3 = document.createElement('div')
        const privacyDetails = document.createElement('div')

        privacyItem.classList.add('privacy-request-item')
        privacySteps.classList.add('privacy-result-steps')
        privacySteps.classList.add('step'+item.currentStep)
        privacyId.classList.add('privacy-result-id')
        privacyTitle1.classList.add('privacy-result-title')
        privacyDate.classList.add('privacy-result-date')
        privacyTitle2.classList.add('privacy-result-title')
        privacyType.classList.add('privacy-result-type')
        privacyTitle3.classList.add('privacy-result-title')
        privacyDetails.classList.add('privacy-result-detail')

        privacyItem.append(privacySteps)
        privacyItem.append(privacyId)
        privacyItem.append(privacyTitle1)
        privacyItem.append(privacyDate)
        privacyItem.append(privacyTitle2)
        privacyItem.append(privacyType)
        privacyItem.append(privacyTitle3)
        privacyItem.append(privacyDetails)

        privacyRequestsContainer.append(privacyItem)

        privacyId.innerHTML = 'Protocolo: <span>'+item.id+'</span>'
        privacyDate.textContent = item.date
        privacyType.textContent = item.type
        privacyDetails.textContent = item.details
        privacyTitle1.textContent = 'Data do pedido:'
        privacyTitle2.textContent = 'Tipo da requisição:'
        privacyTitle3.textContent = 'Detalhes sobre a sua solicitação:'
        })

        hideLoading()
   
        
    }).catch((error) => {
        return feedbackMessage('fail')
    })
}

function changeActivePrivacyMenu(item, page) {
    showLoading()
    const activeMenu = document.querySelectorAll('.privacy-nav li.active')
    activeMenu.forEach(itemActive => {
        itemActive.classList.remove('active')
    })
    
    item.classList.add('active')
    loadPageData(page, '.privacy-wrapper')
    
    setTimeout(() => {hideLoading()}, 500)

}

function toggleConfigDetail(item) {
    const element = item.parentNode.parentNode.parentNode
    item.classList.toggle('active')
    element.classList.toggle('active')
}

function changeAllCheck(item) {
    const parent = item.parentNode.parentNode.parentNode
    const checks = parent.querySelectorAll('input[type="checkbox"]')
    parent.classList.add('active')
    const arrow = parent.querySelector('.privacy-config-show-details')
    arrow.classList.add('active')

    checks.forEach(itemDetail => {
        itemDetail.checked = item.checked
    })
}

function showMobileMenu() {
    const menu = document.querySelector('.privacy-nav-mobile')
    menu.classList.toggle('active')
}
function changeCurrentMobileMenu(item) {
    const current = document.querySelector('.privacy-nav-mobile-current')
    current.textContent = item.textContent
}