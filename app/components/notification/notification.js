setTimeout(()=> {window.addEventListener('load', getNotifications())}, 1500)
function getNotifications() {
    fetch('').then((response) => {

    }).then((data) => {

        const fakeData = [
            {
                text: 'Lorem ipsum',
                date: '10/10/2023',
                status: 'new'
            },
            {
                text: 'Lorem ipsum',
                date: '10/10/2023',
                status: 'new'
            },
            {
                text: 'Lorem ipsum',
                date: '10/10/2023'
            },{
                text: 'Lorem ipsum',
                date: '10/10/2023'
            }
        ]

        const notificationContainer = document.querySelector('.notification-list')

        fakeData.forEach(notification => {
            const li = document.createElement('li')
            const spanText = document.createElement('span')
            const spanDate = document.createElement('span')
            li.classList.add('notification-item')
            spanText.classList.add('notification-item-content')
            spanDate.classList.add('notification-item-date')
            spanText.textContent = notification.text
            spanDate.textContent = notification.date

            notification.status === 'new' && li.classList.add('new')

            li.append(spanText)
            li.append(spanDate)
            notificationContainer.append(li)
        });

        setNotificationNumber()

    }).catch((error) => {
        return feedbackMessage('fail')
    })
}

function setNotificationNumber() {
    const notificationsLenght = document.querySelectorAll('.notification-list li').length
        const notificationCounter = document.querySelector('.notification-counter') 
        

        if(notificationsLenght > 0) {
            notificationCounter.textContent = notificationsLenght
            notificationCounter.classList.add('active')
        }
}

function toggleNotifications() {
    const notifications = document.querySelector('.notifications')
    const notificationsLightBox = document.querySelector('.notification-lightbox')
    notifications.classList.toggle('active')
    notificationsLightBox.classList.toggle('active')
}

function cleanNotifications() {

    fetch('').then((response) => {

    }).then((data) => {

        const notifications = document.querySelectorAll('.notification-list li')
        
        notifications.forEach((notification, index) => {
            setTimeout(() => { notification.classList.add('hide') }, 200 * index)
        });

        setTimeout(() => { toggleNotifications() }, 200 * notifications.length)

        const notificationCounter = document.querySelector('.notification-counter') 

        notificationCounter.classList.remove('active')

    }).catch((error) => {
        return feedbackMessage('fail', 'Houve um erro ao limpar as notificações')
    })

    
    
}