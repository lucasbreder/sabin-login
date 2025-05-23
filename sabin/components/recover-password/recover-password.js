const recoverData = {}


function setRecoverData(data) {
    Object.assign(recoverData, data)
}


function getCityData() {
    const loading = document.querySelector('.loading')
    const stepIndicator = document.querySelector('.step-indicator')
    stepIndicator.classList.remove('hide')
    const form = document.querySelector('#city-form .radios')

    fetch('').then((response) => {
        if (response.status === 200) {
            nextStep()
            nextStepIndicator()
            changeThumb('/sabin/images/thumbs/confirm-thumb.png')
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
        changeThumb('/sabin/images/thumbs/login-end-thumb.png')
    }


    return false
}

function goToContactInput(type) {

    const cards = document.querySelector('.card-list-recover')

    if (!recoverData.type) {
        return validateInput(cards, 'wrong', 'Selecione um dos tipos de contato')
    }
    changeThumb('/sabin/images/thumbs/confirm-thumb.png')
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

    const inputs = document.querySelectorAll('#step6 form input')

    inputs.forEach(element => {
        element.remove()
    })

    const labels = document.querySelectorAll('.card-list .active')
    const step6ContactType = document.querySelector('#step6 h2 span')
    const step6Form = document.querySelector('#step6 form .inputs')
    const input = document.createElement("input")

    input.setAttribute('type', 'tel')
    input.setAttribute('class', type)
    input.setAttribute('placeholder', type === 'phone' ? '(00) 0 0000-0000' : 'Digite aqui seu email')
    input.setAttribute('name', 'contact')
    type === 'phone' && input.setAttribute('minlength', '10')

    step6Form.append(input)
    step6ContactType.innerHTML = type === 'phone' ? 'telefone' : 'e-mail'

    labels.forEach(element => {
        element.classList.remove('active')
    })
    if (type === 'phone') {
        window.intlTelInput(input, {
            initialCountry: "br",
            strictMode: true,
            separateDialCode: true,
            i18n: {
                searchPlaceholder: "Pesquisar país",
                selectCountry: "Selecione um país",
                noResults: "Nenhum resultado encontrado",
                invalidNumber: "Número inválido",
                tooShort: "Número muito curto",
                tooLong: "Número muito longo",
                ad: "Andorra",
                ae: "Emirados Árabes Unidos",
                af: "Afeganistão",
                ag: "Antígua e Barbuda",
                ai: "Anguila",
                al: "Albânia",
                am: "Armênia",
                ao: "Angola",
                ar: "Argentina",
                as: "Samoa Americana",
                at: "Áustria",
                au: "Austrália",
                aw: "Aruba",
                ax: "Ilhas Aland",
                az: "Azerbaijão",
                ba: "Bósnia e Herzegovina",
                bb: "Barbados",
                bd: "Bangladesh",
                be: "Bélgica",
                bf: "Burquina Faso",
                bg: "Bulgária",
                bh: "Bahrein",
                bi: "Burundi",
                bj: "Benin",
                bl: "São Bartolomeu",
                bm: "Bermudas",
                bn: "Brunei",
                bo: "Bolívia",
                bq: "Países Baixos Caribenhos",
                br: "Brasil",
                bs: "Bahamas",
                bt: "Butão",
                bw: "Botsuana",
                by: "Bielorrússia",
                bz: "Belize",
                ca: "Canadá",
                cc: "Ilhas Cocos (Keeling)",
                cd: "Congo - Kinshasa",
                cf: "República Centro-Africana",
                cg: "República do Congo",
                ch: "Suíça",
                ci: "Costa do Marfim",
                ck: "Ilhas Cook",
                cl: "Chile",
                cm: "Camarões",
                cn: "China",
                co: "Colômbia",
                cr: "Costa Rica",
                cu: "Cuba",
                cv: "Cabo Verde",
                cw: "Curaçao",
                cx: "Ilha Christmas",
                cy: "Chipre",
                cz: "Tchéquia",
                de: "Alemanha",
                dj: "Djibuti",
                dk: "Dinamarca",
                dm: "Dominica",
                do: "República Dominicana",
                dz: "Argélia",
                ec: "Equador",
                ee: "Estônia",
                eg: "Egito",
                eh: "Saara Ocidental",
                er: "Eritreia",
                es: "Espanha",
                et: "Etiópia",
                fi: "Finlândia",
                fj: "Fiji",
                fk: "Ilhas Malvinas",
                fm: "Micronésia",
                fo: "Ilhas Faroe",
                fr: "França",
                ga: "Gabão",
                gb: "Reino Unido",
                gd: "Granada",
                ge: "Geórgia",
                gf: "Guiana Francesa",
                gg: "Guernsey",
                gh: "Gana",
                gi: "Gibraltar",
                gl: "Groenlândia",
                gm: "Gâmbia",
                gn: "Guiné",
                gp: "Guadalupe",
                gq: "Guiné Equatorial",
                gr: "Grécia",
                gt: "Guatemala",
                gu: "Guam",
                gw: "Guiné-Bissau",
                gy: "Guiana",
                hk: "Hong Kong, RAE da China",
                hn: "Honduras",
                hr: "Croácia",
                ht: "Haiti",
                hu: "Hungria",
                id: "Indonésia",
                ie: "Irlanda",
                il: "Israel",
                im: "Ilha de Man",
                in: "Índia",
                io: "Território Britânico do Oceano Índico",
                iq: "Iraque",
                ir: "Irã",
                is: "Islândia",
                it: "Itália",
                je: "Jersey",
                jm: "Jamaica",
                jo: "Jordânia",
                jp: "Japão",
                ke: "Quênia",
                kg: "Quirguistão",
                kh: "Camboja",
                ki: "Quiribati",
                km: "Comores",
                kn: "São Cristóvão e Névis",
                kp: "Coreia do Norte",
                kr: "Coreia do Sul",
                kw: "Kuwait",
                ky: "Ilhas Cayman",
                kz: "Cazaquistão",
                la: "Laos",
                lb: "Líbano",
                lc: "Santa Lúcia",
                li: "Liechtenstein",
                lk: "Sri Lanka",
                lr: "Libéria",
                ls: "Lesoto",
                lt: "Lituânia",
                lu: "Luxemburgo",
                lv: "Letônia",
                ly: "Líbia",
                ma: "Marrocos",
                mc: "Mônaco",
                md: "Moldova",
                me: "Montenegro",
                mf: "São Martinho",
                mg: "Madagascar",
                mh: "Ilhas Marshall",
                mk: "Macedônia do Norte",
                ml: "Mali",
                mm: "Mianmar (Birmânia)",
                mn: "Mongólia",
                mo: "Macau, RAE da China",
                mp: "Ilhas Marianas do Norte",
                mq: "Martinica",
                mr: "Mauritânia",
                ms: "Montserrat",
                mt: "Malta",
                mu: "Maurício",
                mv: "Maldivas",
                mw: "Malaui",
                mx: "México",
                my: "Malásia",
                mz: "Moçambique",
                na: "Namíbia",
                nc: "Nova Caledônia",
                ne: "Níger",
                nf: "Ilha Norfolk",
                ng: "Nigéria",
                ni: "Nicarágua",
                nl: "Países Baixos",
                no: "Noruega",
                np: "Nepal",
                nr: "Nauru",
                nu: "Niue",
                nz: "Nova Zelândia",
                om: "Omã",
                pa: "Panamá",
                pe: "Peru",
                pf: "Polinésia Francesa",
                pg: "Papua-Nova Guiné",
                ph: "Filipinas",
                pk: "Paquistão",
                pl: "Polônia",
                pm: "São Pedro e Miquelão",
                pr: "Porto Rico",
                ps: "Territórios palestinos",
                pt: "Portugal",
                pw: "Palau",
                py: "Paraguai",
                qa: "Catar",
                re: "Reunião",
                ro: "Romênia",
                rs: "Sérvia",
                ru: "Rússia",
                rw: "Ruanda",
                sa: "Arábia Saudita",
                sb: "Ilhas Salomão",
                sc: "Seicheles",
                sd: "Sudão",
                se: "Suécia",
                sg: "Singapura",
                sh: "Santa Helena",
                si: "Eslovênia",
                sj: "Svalbard e Jan Mayen",
                sk: "Eslováquia",
                sl: "Serra Leoa",
                sm: "San Marino",
                sn: "Senegal",
                so: "Somália",
                sr: "Suriname",
                ss: "Sudão do Sul",
                st: "São Tomé e Príncipe",
                sv: "El Salvador",
                sx: "Sint Maarten",
                sy: "Síria",
                sz: "Essuatíni",
                tc: "Ilhas Turcas e Caicos",
                td: "Chade",
                tg: "Togo",
                th: "Tailândia",
                tj: "Tadjiquistão",
                tk: "Tokelau",
                tl: "Timor-Leste",
                tm: "Turcomenistão",
                tn: "Tunísia",
                to: "Tonga",
                tr: "Turquia",
                tt: "Trinidad e Tobago",
                tv: "Tuvalu",
                tw: "Taiwan",
                tz: "Tanzânia",
                ua: "Ucrânia",
                ug: "Uganda",
                us: "Estados Unidos",
                uy: "Uruguai",
                uz: "Uzbequistão",
                va: "Cidade do Vaticano",
                vc: "São Vicente e Granadinas",
                ve: "Venezuela",
                vg: "Ilhas Virgens Britânicas",
                vi: "Ilhas Virgens Americanas",
                vn: "Vietnã",
                vu: "Vanuatu",
                wf: "Wallis e Futuna",
                ws: "Samoa",
                ye: "Iêmen",
                yt: "Mayotte",
                za: "África do Sul",
                zm: "Zâmbia",
                zw: "Zimbábue"
            },
            loadUtils: () => import("https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.1/build/js/utils.js"), // for formatting/placeholders etc
        });
    }

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

    setRecoverData({ contact: contact.value })

    if (
        validateInput(contact, 'required') &&
        (recoverData.type === 'email' ? validateInput(contact, 'email') :
            validateInput(contact, 'minlength', 'O telefone deve ter pelo menos 10 dígitos'))
    ) {

        fetch('').then((response) => {
            if (response.status === 200) {
                nextStep()
                changeThumb('/sabin/images/thumbs/login-end-thumb.png')
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

    if (validateInput(codeInput, 'minlength')) {

        fetch('').then((response) => {

        }).then((data) => {
            if (code != '111111') {
                return validateInput(codeInput, 'wrong', 'O código está incorreto, tente novamente')
            } else {
                setTimeout(() => window.location.replace("/sabin"), 7000)
                return feedbackMessage(steps, 'success', 'Seu cadastro foi atualizado')
            }

        }).catch((error) => {
            return feedbackMessage(steps, 'fail')
        })
    }
    codeInput.setAttribute('value', '')
    return false
}