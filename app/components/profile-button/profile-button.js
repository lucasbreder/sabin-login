setTimeout(()=> {window.addEventListener('load', getProfile())}, 1500)

function getProfile() {
    fetch('').then((response) => {

    }).then((data) => {

        const profileFakeData = {
            nome: 'João Cláudio',
            nomeSocial: '',
            filiacao: 'Carlos da silva Oliveira',
            dataNascimento: '13/05/2003',
            cpf: '000.123.456-90',
            telefone: '(61) 12345-7890',
            email: 'carlos.silva@gmail.com',
            cep: '72.000-000',
            endereco: 'Qr 308 Conjunto 18 Casa 02',
            cidade: 'Brasília',
            bairro: 'Samambaia',
        }

        const profileName = document.querySelector('.profile-button-name')
        const welcome = document.querySelector('.welcome span')

        welcome ? welcome.textContent = profileFakeData.nome : '' 
        profileName ? profileName.textContent = profileFakeData.nome : ''

    }).catch((error) => {
        return feedbackMessage('fail', 'Não foi possível recuperar as informações de perfil')
    })
}