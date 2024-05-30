//////////////////////////////////////////////////
// MODAL
// É necessário ter as funções setCooke e getCookie
// presentes em script.js
// Modal abre a cada 24h
//////////////////////////////////////////////////
function fecharModal() {
	setCookie('fechar-modal-sabin',1,1);
	document.getElementById('modal-sabin').classList.add('fechar-modal');
}
function abrir_modal () {
	if ( !getCookie('fechar-modal-sabin') ) {
		setTimeout( ()=>{ document.getElementById('modal-sabin').classList.add('abrir'); }, 10 );
	} else {
		setCookie('fechar-modal-sabin',1,1); // renovar
	}
}

// redimensionar mapa de imagem
alx_imgmapresizer();

//////////////////////////////////////////////////
// VERIFICAR SE É UM TELEFONE ANDROID
//////////////////////////////////////////////////
var ua = navigator.userAgent.toLowerCase();
var isAndroid = ua.indexOf("android") > -1;
if(isAndroid) {
	document.querySelector('body').classList.add('eh-android');
}

if ( /Android|iPhone|iPad/i.test(navigator.userAgent) ) {
	document.querySelector('body').classList.add('eh-mobile');
} else {
	document.querySelector('body').classList.add('nao-eh-mobile');
}


//////////////////////////////////////////////////
// ABRIR MODAL DEPOIS DE CARREGAR A IMAGEM
//////////////////////////////////////////////////
var modal_img = document.querySelector('#modal-sabin img.el-notmob');
if ( document.querySelector('.eh-mobile') != undefined ) { // mobile
	if ( document.querySelector('eh-android') != undefined ) {
		modal_img = document.querySelector('#modal-sabin img.el-mob.el-android');
	} else {
		modal_img = document.querySelector('#modal-sabin img.el-mob.el-apple');
	}
}
modal_img.onload = function () {
	abrir_modal();
}
