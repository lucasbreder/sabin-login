const profileForm = [
    {
        label: 'Seu nome',
        disabled: true,
        type: 'text',
        required: true,
        name: 'nome'
    },
    {
        label: 'Nome Social',
        type: 'text',
        required: true,
        name: 'nomeSocial'
    },
    {
        label: 'Filiação',
        type: 'text',
        required: true,
        name: 'filiacao'
    },
    {
        label: 'Data de Nascimento',
        type: 'date',
        required: true,
        name: 'dataNascimento'
    },
    {
        label: 'CPF',
        type: 'text',
        disabled: true,
        name: 'cpf'
    },
    {
        label: 'Telefone',
        type: 'text',
        name: 'telefone',
        mask: 'phone'
    },
    {
        label: 'E-mail',
        type: 'email',
        name: 'email',
        required: true
    },
    {
        label: 'CEP',
        type: 'text',
        name: 'cep',
        mask: 'cep',
        maxlength: "9",
        required: true
    },
    {
        label: 'Endereço',
        type: 'text',
        name: 'endereco',
        required: true
    },
    {
        label: 'Cidade',
        type: 'text',
        name: 'cidade',
        required: true
    },
    {
        label: 'Estado',
        type: 'select',
        options: [
            "Acre",
            "Alagoas",
            "Amapá",
            "Amazonas",
            "Bahia",
            "Ceará",
            "Distrito Federal",
            "Espirito Santo",
            "Goiás",
            "Maranhão",
            "Mato Grosso do Sul",
            "Mato Grosso",
            "Minas Gerais",
            "Pará",
            "Paraíba",
            "Paraná",
            "Pernambuco",
            "Piauí",
            "Rio de Janeiro",
            "Rio Grande do Norte",
            "Rio Grande do Sul",
            "Rondônia",
            "Roraima",
            "Santa Catarina",
            "São Paulo",
            "Sergipe",
            "Tocantins",
          ],
        name: 'estado',
        required: true
    },
    {
        label: 'Senha',
        type: 'password',
        name: 'senha',
    },
    {
        label: 'Confirmar senha',
        type: 'password',
        name: 'confirmarSenha',
    },
    {
        label: 'Desejo receber ofertas e novidades dos serviços no meu e-mail e seu telefone?',
        type: 'checkbox',
        name: 'newsletter',
    },

    
]

function getProfileFormData() {
    fetch('').then((response) => {

    }).then((data) => {

        const profileFakeData = {
            nome: 'João Cláudio',
            nomeSocial: '',
            filiacao: 'Carlos da Silva Oliveira',
            dataNascimento: '2003-05-11',
            cpf: '000.123.456-90',
            telefone: '(61) 12345-7890',
            email: 'carlos.silva@gmail.com',
            cep: '72000-000',
            endereco: 'Qr 308 Conjunto 18 Casa 02',
            cidade: 'Brasília',
            bairro: 'Samambaia',
            estado: 'Distrito Federal'
        }

       Object.keys(profileFakeData).forEach(key => {
        const input = document.querySelector('*[name="'+key+'"]');
        input ? input.value = profileFakeData[key] : ''
       })
       hideLoading()

    }).catch((error) => {
        return feedbackMessage('fail', 'Não foi possível recuperar as informações de perfil')
    })
}

function updateProfile(form) {
    
    var formData = new FormData(form)

    var inputs = form.querySelectorAll("input[required='true']")
    var inputEmail = form.querySelector("input[name='email']")
    var password = form.querySelector("input[name='senha']")
    var confirmPassword = form.querySelector("input[name='confirmarSenha']")

    
    if(password.value !== confirmPassword.value) {
        return validateInput(confirmPassword, 'wrong', 'As senhas não coincidem') 
    }
    const rs = []
    inputs.forEach(element => {
        rs.push(validateInput(element, 'required'))
    });
    if(rs.includes(false)) {
        return false
    }

    if(!validateInput(inputEmail, 'email')) {
        return false
    }


    fetch('').then((response) => {
        showLoading()
        if (response.status === 200) {
            hideLoading()
            return feedbackMessage('success', 'Dados atualizados com sucesso')
        }
    }).then((data) => {
    }).catch((error) => {
        hideLoading()
        return feedbackMessage('fail')
    })

    return false
}