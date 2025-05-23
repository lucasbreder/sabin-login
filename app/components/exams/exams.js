setTimeout(()=> {window.addEventListener('load', getExams())}, 2000)

function getExams(page = 1, itemsPerPage = 4) {
    fetch('').then((response) => {

    }).then((data) => {

        const fakeData = [
            {
                title: 'LDLD / K / NA / INSBASAL / MAG / SELENIO / URE / FERRI / FE / P / TRI / ZINCO / GLI / HDL / HBGLI / HEM /  CAI / COL / VLDL / CRE / VB12 / TGO / AUR / TGP / AFOL / VITAD25',
                doctor: 'Sónia Goulart Teixeira',
                status: 'em-laboratorio',
                downloadExamUrl: '/app/docs/exemplo.pdf',
                downloadNFUrl: '/app/docs/exemplo.pdf',
                os: '025-66897-10393',
                date: '13/09/2021'
            },
            {
                title: 'LDLD / K / NA / INSBASAL / MAG / SELENIO / URE / FERRI / FE / P / TRI / ZINCO / GLI / HDL / HBGLI / HEM /  CAI / COL / VLDL / CRE / VB12 / TGO / AUR / TGP / AFOL / VITAD25',
                doctor: 'Sónia Goulart Teixeira',
                status: 'parcial',
                downloadExamUrl: '/app/docs/exemplo.pdf',
                downloadNFUrl: '/app/docs/exemplo.pdf',
                os: '025-66897-10393',
                date: '14/09/2021'
            },
            {
                title: 'LDLD / K / NA / INSBASAL / MAG / SELENIO / URE / FERRI / FE / P / TRI / ZINCO / GLI / HDL / HBGLI / HEM /  CAI / COL / VLDL / CRE / VB12 / TGO / AUR / TGP / AFOL / VITAD25',
                doctor: 'Sónia Goulart Teixeira',
                status: 'concluido',
                downloadExamUrl: '/app/docs/exemplo.pdf',
                downloadNFUrl: '/app/docs/exemplo.pdf',
                os: '025-66897-10393',
                date: '15/09/2021'
            },
            {
                title: 'LDLD / K / NA / INSBASAL / MAG / SELENIO / URE / FERRI / FE / P / TRI / ZINCO / GLI / HDL / HBGLI / HEM /  CAI / COL / VLDL / CRE / VB12 / TGO / AUR / TGP / AFOL / VITAD25',
                doctor: 'Sónia Goulart Teixeira',
                date: '10/10/2023',
                status: 'concluido',
                downloadExamUrl: '/app/docs/exemplo.pdf',
                downloadNFUrl: '/app/docs/exemplo.pdf',
                os: '025-66897-10393',
                date: '16/09/2021'
            },
            {
                title: 'LDLD / K / NA / INSBASAL / MAG / SELENIO / URE / FERRI / FE / P / TRI / ZINCO / GLI / HDL / HBGLI / HEM /  CAI / COL / VLDL / CRE / VB12 / TGO / AUR / TGP / AFOL / VITAD25',
                doctor: 'Sónia Goulart Teixeira',
                status: 'concluido',
                downloadExamUrl: '/app/docs/exemplo.pdf',
                downloadNFUrl: '/app/docs/exemplo.pdf',
                os: '025-66897-10393',
                date: '17/09/2021'
            },
            {
                title: 'LDLD / K / NA / INSBASAL / MAG / SELENIO / URE / FERRI / FE / P / TRI / ZINCO / GLI / HDL / HBGLI / HEM /  CAI / COL / VLDL / CRE / VB12 / TGO / AUR / TGP / AFOL / VITAD25',
                doctor: 'Sónia Goulart Teixeira',
                status: 'concluido',
                downloadExamUrl: '/app/docs/exemplo.pdf',
                downloadNFUrl: '/app/docs/exemplo.pdf',
                os: '025-66897-10393',
                date: '18/09/2021'
            },
            {
                title: 'LDLD / K / NA / INSBASAL / MAG / SELENIO / URE / FERRI / FE / P / TRI / ZINCO / GLI / HDL / HBGLI / HEM /  CAI / COL / VLDL / CRE / VB12 / TGO / AUR / TGP / AFOL / VITAD25',
                doctor: 'Sónia Goulart Teixeira',
                status: 'concluido',
                downloadExamUrl: '/app/docs/exemplo.pdf',
                downloadNFUrl: '/app/docs/exemplo.pdf',
                os: '025-66897-10393',
                date: '19/09/2021'
            },
            {
                title: 'LDLD / K / NA / INSBASAL / MAG / SELENIO / URE / FERRI / FE / P / TRI / ZINCO / GLI / HDL / HBGLI / HEM /  CAI / COL / VLDL / CRE / VB12 / TGO / AUR / TGP / AFOL / VITAD25',
                doctor: 'Sónia Goulart Teixeira',
                date: '10/10/2023',
                status: 'concluido',
                downloadExamUrl: '/app/docs/exemplo.pdf',
                downloadNFUrl: '/app/docs/exemplo.pdf',
                os: '025-66897-10393',
                date: '13/09/2021'
            },
            {
                title: 'LDLD / K / NA / INSBASAL / MAG / SELENIO / URE / FERRI / FE / P / TRI / ZINCO / GLI / HDL / HBGLI / HEM /  CAI / COL / VLDL / CRE / VB12 / TGO / AUR / TGP / AFOL / VITAD25',
                doctor: 'Sónia Goulart Teixeira',
                date: '10/10/2023',
                status: 'concluido',
                downloadExamUrl: '/app/docs/exemplo.pdf',
                downloadNFUrl: '/app/docs/exemplo.pdf',
                os: '025-66897-10393',
                date: '13/09/2021'
            },
            {
                title: 'LDLD / K / NA / INSBASAL / MAG / SELENIO / URE / FERRI / FE / P / TRI / ZINCO / GLI / HDL / HBGLI / HEM /  CAI / COL / VLDL / CRE / VB12 / TGO / AUR / TGP / AFOL / VITAD25',
                doctor: 'Sónia Goulart Teixeira',
                date: '10/10/2023',
                status: 'concluido',
                downloadExamUrl: '/app/docs/exemplo.pdf',
                downloadNFUrl: '/app/docs/exemplo.pdf',
                os: '025-66897-10393',
                date: '13/09/2021'
            },
        ]

        const examsContent = document.querySelector('.exams-content')
        examsContent ? examsContent.innerHTML = '' : ''
        createPagination(examsContent, itemsPerPage, page, fakeData.length)

        fakeData.forEach((exam, index) => {
            if(page === Math.floor(index/itemsPerPage)+1) {
                if(page === 1 && index === 2) {
                    const ad = document.createElement('div')
                    const adImg = document.createElement('img')
                    adImg.setAttribute('src', '/app/images/banners/banner-index-mobile.png')
                    ad.append(adImg)
                    ad.classList.add('mobile-thumb')
                    examsContent && examsContent.append(ad)
                }
            const examCard = document.createElement('div')
            const examHeader = document.createElement('header')
            const examCode = document.createElement('div')
            const examDate = document.createElement('div')
            const examStatus = document.createElement('div')
            const examTitle = document.createElement('div')
            const examDoctor = document.createElement('div')
            const examButtons = document.createElement('div')
            const examDownload = document.createElement('div')
            const examNF = document.createElement('div')

            examCard.classList.add('exam-card')
            examCard.classList.add(exam.status)
            examHeader.classList.add('exam-card-header')
            examCode.classList.add('exam-card-code')
            examDate.classList.add('exam-card-date')
            examStatus.classList.add('exam-card-status')
            examTitle.classList.add('exam-card-title')
            examDoctor.classList.add('exam-card-doctor')
            examButtons.classList.add('exam-buttons')
            examDownload.classList.add('button')
            examDownload.classList.add('button-download')
            exam.status === 'em-laboratorio' && examDownload.classList.add('button-disabled')
            examNF.classList.add('button')
            examNF.classList.add('button-transparent')

            examsContent && examsContent.append(examCard)
            examCard.append(examHeader)
            examHeader.append(examCode)
            examHeader.append(examDate)
            examHeader.append(examStatus)
            examCard.append(examTitle)
            examCard.append(examDoctor)
            examCard.append(examButtons)
            examButtons.append(examDownload)
            examButtons.append(examNF)

            examCode.innerHTML = '<strong>OS:</strong> '+exam.os
            examDate.innerHTML = '<strong>Data da coleta:</strong> '+exam.date
            examDoctor.innerHTML = '<strong>Médico:</strong> '+exam.doctor
            examTitle.innerText = exam.title
            examStatus.innerText = changeStatusText(exam.status)
            examDownload.innerHTML = '<a target="_blank" href='+exam.downloadExamUrl+' />Download do Resultado</a>'
            examNF.innerHTML = '<a target="_blank" href='+exam.downloadNFUrl+' />Emitir 2ª via da nota fiscal</a>'
        }
        hideLoading()
        });

    }).catch((error) => {
        return feedbackMessage('fail')
    })
}

function changeStatusText(status) {
    switch (status) {
        case 'em-laboratorio':
            return 'Em laboratório'
        case 'parcial':
            return 'Parcial'
        case 'concluido':
            return 'Concluído'
        default:
            break;
    }
}

function createPagination(container, itemsPerPage, currentPage, totalItems) {
    const prevPagination = document.querySelector('.pagination')
    prevPagination && prevPagination.remove()
    const pagination = document.createElement('div')
    const next = document.createElement('div')
    const prev = document.createElement('div')
    next.classList.add('pagination-item-next')
    prev.classList.add('pagination-item-prev')
    container && container.after(pagination)
    pagination.append(prev)

    pagination.classList.add('pagination')

    next.textContent = 'Próximo'
    prev.textContent = 'Anterior'

    currentPage === 1 && prev.classList.add('disabled')

    currentPage ===  Math.floor(totalItems/itemsPerPage) && next.classList.add('disabled')

    next.addEventListener('click', () => {
        getExams(currentPage+1, itemsPerPage)
        container.scrollIntoView()
    })

    prev.addEventListener('click', () => {
        getExams(currentPage-1, itemsPerPage)
        container.scrollIntoView()
    })

    for (let index = 1; index <= Math.floor(totalItems/itemsPerPage); index++) {
        const paginationItem = document.createElement('div')
        paginationItem.textContent = index
        paginationItem.classList.add('pagination-item')
        pagination.append(paginationItem)
        currentPage === index && paginationItem.classList.add('current-page')

        paginationItem.addEventListener('click', () => {
            getExams(index, itemsPerPage)
            container.scrollIntoView()
        })
        
    }
    pagination.append(next)
}