function changeInputByCookie() {

    const userInput = document.querySelector('input[name="user"]');
    const checkInput = document.querySelector('input[name="saveLoginData"]');
    const userCookie = getCookie('user')

    if(userCookie) {
        userInput.value = userCookie
        checkInput.setAttribute('checked', true)
    }

}

function setCookie(cname, cvalue, exdays) {
    let expires = ''
    if(exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        expires = "expires="+d.toUTCString();
    }
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

function getCookie(cname) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${cname}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}


function deleteCookie(cname) {
    document.cookie = cname + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
}

function setUserForgotCookie() {
    
    const userInput = document.querySelector('input[name="user"]');

    if(validateInput(userInput, 'required')) {
        setCookie('userForgot', userInput.value)
        return true
    }
    return false

}