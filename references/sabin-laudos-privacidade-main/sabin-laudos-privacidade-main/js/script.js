// const EXAMES_URL = 'exames.html';
const PRIVACIDADE_URL = 'solicitacao.html';

//////////////////////////////////////////////////////////////////////////////
// ABAS
//////////////////////////////////////////////////////////////////////////////
const abas = document.querySelectorAll('.aba');
const abaswraps = document.querySelectorAll('.aba-wrapper');
var interacoes = 0;
function aba_behavior (obj,bg) {

	for ( var i=0; i<abas.length; i++ )
		abas[i].classList.remove('selecionada');
	obj.classList.add('selecionada');

	let nom = obj.getAttribute('id');

	for ( var i=0; i<abaswraps.length; i++ )
		abaswraps[i].classList.remove('selecionada');

	document.querySelector('body').setAttribute('cor', bg);

	document.getElementById(nom+'-wrapper').classList.add('selecionada');
	document.getElementById(nom+'-wrapper').querySelector('.campo-usuario').focus();

	if (document.querySelector('#img-login > div.mostrar') != undefined )
		document.querySelector('#img-login > div.mostrar').classList.remove('mostrar');
	document.getElementById(nom+'-img').classList.add('mostrar');

	if ( interacoes > 0 ) {
		document.querySelector('#botoes p').classList.remove('oupisca');
		setTimeout(()=>{document.querySelector('#botoes p').classList.add('oupisca');}, 10);
	}

	alterar_url( '#'+nom, 'Login: '+obj.innerText );

	interacoes++;
}

//////////////////////////////////////////////////////////////////////////////
// TRATAR URL DEPENDENDO DO ESTADO DO APP
//////////////////////////////////////////////////////////////////////////////
function alterar_url ( url, title ) {
	if ( url != window.location.href ) {
		document.title = title;
		window.history.pushState({"html":url,"pageTitle":title},"a", url);
	}
}
var url = window.location.href;
url_arr = url.split('#');
if ( url_arr[1] != undefined )
	document.getElementById(url_arr[1]).click();

//////////////////////////////////////////////////////////////////////////////
// VERIFICAR ESTADO PARA PERMITIR OU NAO SELECIONAR O CAMPO
//////////////////////////////////////////////////////////////////////////////
function verifica_etapa ( qual, obj ) {
	if ( qual == 'login' && document.querySelector('body.confirma') != undefined )
		obj.blur();
	else if ( qual == 'confirma' && document.querySelector('body.confirma') == undefined )
		obj.blur();
}

//////////////////////////////////////////////////////////////////////////////
// SIMULAR COR DE PLACEHOLDER NO SELECT
//////////////////////////////////////////////////////////////////////////////
function verifica_selecao ( obj ) {
	if ( obj.value == '' ) {
		obj.classList.add('placeholder-color');
	} else {
		obj.classList.remove('placeholder-color');
	}
}

//////////////////////////////////////////////////////////////////////////////
// VALIDAR FORMULARIOS DE LOGIN
//////////////////////////////////////////////////////////////////////////////
function confirma (onde) {
	if ( !erros_form_login(onde) ) {
		if ( onde == 1 ) {
			return true;
		} else if ( onde == 2 ) {
			document.getElementById('codigo-form').setAttribute('action', PRIVACIDADE_URL);
			document.querySelector('body').classList.toggle('confirma');
		}
	} else {
		return false;
	}
}
function erros_form_login (onde) {
	let form = document.querySelector('form[onde="'+onde+'"]');
	let erros = false;
	if ( onde == 3 ) { // recuperar senha
		if ( validar_email( form.querySelector('#result-email').value ) ) { // email
			form.querySelector('#result-email').classList.remove('erro');
			form.querySelector('#result-email').classList.add('correto');
		} else {
			form.querySelector('#result-email').classList.add('erro');
			form.querySelector('#result-email').classList.remove('correto');
			erros = true;
		}
		if ( validar_data( form.querySelector('#result-dob').value ) ) { // data
			form.querySelector('#result-dob').classList.remove('erro');
			form.querySelector('#result-dob').classList.add('correto');
		} else {
			form.querySelector('#result-dob').classList.add('erro');
			form.querySelector('#result-dob').classList.remove('correto');
			erros = true;
		}
		if ( form.querySelector('#result-sexo').value.length > 0 ) { // sexo
			form.querySelector('#result-sexo').classList.remove('erro');
			form.querySelector('#result-sexo').classList.add('correto');
		} else {
			form.querySelector('#result-sexo').classList.add('erro');
			form.querySelector('#result-sexo').classList.remove('correto');
			erros = true;
		}
	} else { // forms de login
		if ( form.querySelector('.campo-usuario').value.length < 3 ) {
			form.querySelector('.campo-usuario').classList.add('erro');
			form.querySelector('.campo-usuario').classList.remove('correto');
			erros = true;
		} else {
			form.querySelector('.campo-usuario').classList.remove('erro');
			form.querySelector('.campo-usuario').classList.add('correto');
		}
		if ( form.querySelector('.campo-senha').value.length < 3 ) {
			form.querySelector('.campo-senha').classList.add('erro');
			form.querySelector('.campo-senha').classList.remove('correto');
			erros = true;
		} else {
			form.querySelector('.campo-senha').classList.remove('erro');
			form.querySelector('.campo-senha').classList.add('correto');
		}
	}

	return erros;
}

//////////////////////////////////////////////////////////////////////////////
// ENVIAR CODIGO POR E-MAIL
//////////////////////////////////////////////////////////////////////////////
function validar_email_codigo () {
	let form = document.querySelector('#confirma-form');
	let erros = false;
	if ( !validar_email( form.querySelector('#consent-email').value ) ) {
		form.querySelector('#consent-email').classList.add('erro');
		form.querySelector('#consent-email').classList.remove('correto');
		erros = true;
	} else {
		form.querySelector('#consent-email').classList.remove('erro');
		form.querySelector('#consent-email').classList.add('correto');
	}
	if ( !erros ) {
		document.querySelector('body').classList.add('codigo');
		document.querySelector('#reenviar span').innerText = 60;
		document.querySelector('#reenviar_voltar').classList.remove('mostrar');
		document.querySelector('#reenviar').classList.add('mostrar');
		contagem();
	}
}
// contagem antes de liberar novo envio
function contagem () {
	var num = document.querySelector('#reenviar span').innerText*1;
	if ( num > 1 ) {
		setTimeout(()=>{contagem();}, 1000);
	} else {
		document.querySelector('#reenviar').classList.remove('mostrar');
		document.querySelector('#reenviar_voltar').classList.add('mostrar');
	}
	num--;
	document.querySelector('#reenviar span').innerText = num;
}
// reenviar codigo
function novo_codigo () {
	document.querySelector('body').classList.remove('codigo');
}
//////////////////////////////////////////////////////////////////////////////
// VALIDAR CODIGO ENVIADO POR EMAIL
//////////////////////////////////////////////////////////////////////////////
function confirmar_codigo () {
	let codigo = document.getElementById('consent-codigo').value;
	if ( codigo.length == 6 && !isNaN(codigo) ) {
		document.getElementById('consent-codigo').classList.remove('erro');
		document.getElementById('consent-codigo').classList.add('correto');
		return true;
	} else {
		document.getElementById('consent-codigo').classList.add('erro');
		document.getElementById('consent-codigo').classList.remove('correto');
		return false;
	}
}
function mascara_codigo (obj) {
	let str = obj.value.replace(/(?![0-9])./gmi,'');
	str = str.slice(0,6);
	return str;
}

//////////////////////////////////////////////////////////////////////////////
// DROPDOWN
//////////////////////////////////////////////////////////////////////////////
const ddownsli = document.querySelectorAll('.ddown li');
for ( var i=0; i<ddownsli.length; i++ ) {
    ddownsli[i].addEventListener( 'click', ddown_select );
}
const ddowns = document.querySelectorAll('.ddown');
for ( var i=0; i<ddowns.length; i++ ) {
    ddowns[i].addEventListener( 'mouseover', (e)=>{e.target.classList.remove('fechar');});
}
function ddown_select (e) {
    if (e.target)
	obj = e.target;
    else
	obj = e;
    if ( e != undefined ) {
		obj.parentElement.parentElement.querySelector('.ddown-val').innerText = obj.innerText;
		obj.parentElement.parentElement.querySelector('.ddown-val').setAttribute('data-val', obj.innerText);
		obj.parentElement.parentElement.classList.add('fechar');

		// a linha abaixo soh eh usada se houver um campo de formulario
		document.getElementById('ddown-valor').value = (obj.getAttribute('data')!=undefined) ? obj.getAttribute('data') : obj.innerText;
    }
}
// ddown_select( ddownsli[0] );

const radios = document.querySelectorAll('input[name="tipo"]');
for ( var i=0; i<radios.length; i++ ) {
	radios[i].addEventListener('change', ()=>{
		if ( document.getElementById('tipo5').checked )
			document.querySelector('.ddown').classList.remove('escondido');
		else
			document.querySelector('.ddown').classList.add('escondido');
	});
}

//////////////////////////////////////////////////////////////////////////////
// ACCORDION
//////////////////////////////////////////////////////////////////////////////
function hex_accordion (obj) {
	let proximo = obj.nextElementSibling;
	if ( !proximo.classList.contains('abrir') ) {
		proximo.classList.add('abrir');
		obj.classList.add('abrir');
		proximo.style.height = proximo.querySelector('.acc-inner').offsetHeight+'px';
		proximo.style.opacity = 1;
	} else {
		proximo.classList.remove('abrir');
		obj.classList.remove('abrir');
		proximo.style.height = '0px';
		proximo.style.opacity = 0;
	}
}

//////////////////////////////////////////////////////////////////////////////
// FILE UPLOAD
//////////////////////////////////////////////////////////////////////////////
const body = document.querySelector('body');
body.ondragover = body.ondragenter = function(evt) {
  evt.preventDefault();
};
body.ondrop = function(evt) {
  evt.preventDefault();
}
const dropContainer = document.getElementById('dndupload');
if ( dropContainer != undefined ) {
	dropContainer.ondragover = dropContainer.ondragenter = function(evt) {
	  evt.preventDefault();
	};
	dropContainer.ondrop = function(evt) {
	  evt.preventDefault();
	  let file1 = document.querySelector('#file1');
	  let file2 = document.querySelector('#file2');
	  let file3 = document.querySelector('#file3');
	  let file4 = document.querySelector('#file4');
	  let file5 = document.querySelector('#file5');
	  if ( file1.files.length == 0 ) {
	  	var file = file1;
	  } else if ( file2.files.length == 0 ) {
	  	var file = file2;
	  } else if ( file3.files.length == 0 ) {
	  	var file = file3;
	  } else if ( file4.files.length == 0 ) {
	  	var file = file4;
	  } else {
	  	var file = file5;
	  }
	  file.files = evt.dataTransfer.files; // IE
	  const dT = new DataTransfer();
	  dT.items.add(evt.dataTransfer.files[0]);
	  file.files = dT.files;

	};
}
function handle_files_status () {
	let f1 = document.getElementById('file1');
	let f2 = document.getElementById('file2');
	let f3 = document.getElementById('file3');
	let f4 = document.getElementById('file4');
	let f5 = document.getElementById('file5');
	var v1 = f1.value.split('\\');
	var v2 = f2.value.split('\\');
	var v3 = f3.value.split('\\');
	var v4 = f4.value.split('\\');
	var v5 = f5.value.split('\\');
	if (v1)
		document.querySelector('#view1 span').innerHTML = v1[ v1.length-1 ];
	if (v2)
		document.querySelector('#view2 span').innerHTML = v2[ v2.length-1 ];
	if (v3)
		document.querySelector('#view3 span').innerHTML = v3[ v3.length-1 ];
	if (v4)
		document.querySelector('#view4 span').innerHTML = v4[ v4.length-1 ];
	if (v5)
		document.querySelector('#view5 span').innerHTML = v5[ v5.length-1 ];
	let preenchidos = [];
	preenchidos[1] = ( f1.value != '' ) ? true : false;
	preenchidos[2] = ( f2.value != '' ) ? true : false;
	preenchidos[3] = ( f3.value != '' ) ? true : false;
	preenchidos[4] = ( f4.value != '' ) ? true : false;
	preenchidos[5] = ( f5.value != '' ) ? true : false;

	var aparecido = false;
	preenchidos.forEach( ( val, i, arr )=>{
		document.querySelector('#view'+i).classList.add('esconder');
		document.querySelector('#f'+i).classList.add('esconder');
		if ( arr[i] ) {
			document.querySelector('#f'+i).classList.add('esconder');
			document.querySelector('#view'+i).classList.remove('esconder');
		} else if ( !aparecido ) {
			aparecido = true;
			document.querySelector('#f'+i).classList.remove('esconder');
			document.querySelector('#view'+i).classList.add('esconder');
		}
		if ( !aparecido ) {
			document.querySelector('#arraste_mess').classList.add('esconder')
		} else {
			document.querySelector('#arraste_mess').classList.remove('esconder')
		}
	} );

}
function remover_upload (qual) {
	let f1 = document.getElementById('file1');
	let f2 = document.getElementById('file2');
	let f3 = document.getElementById('file3');
	let f4 = document.getElementById('file4');
	let f5 = document.getElementById('file5');
	if ( qual == 1 ) {
		f1.remove();
		let new_f1 = novo_file_field('file1');
		document.querySelector('#f1 .ffield').appendChild(new_f1);
	} else if ( qual == 2 ) {
		f2.remove();
		let new_f2 = novo_file_field('file2');
		document.querySelector('#f2 .ffield').appendChild(new_f2);
	} else if ( qual == 3 ) {
		f3.remove();
		let new_f3 = novo_file_field('file3');
		document.querySelector('#f3 .ffield').appendChild(new_f3);
	} else if ( qual == 4 ) {
		f4.remove();
		let new_f4 = novo_file_field('file4');
		document.querySelector('#f4 .ffield').appendChild(new_f4);
	} else if ( qual == 5 ) {
		f5.remove();
		let new_f5 = novo_file_field('file5');
		document.querySelector('#f5 .ffield').appendChild(new_f5);
	}
	handle_files_status();
}
function novo_file_field (id) {
	let new_f = document.createElement('INPUT');
	new_f.setAttribute('type', 'file');
	new_f.setAttribute('name', id);
	new_f.setAttribute('id', id);
	new_f.setAttribute('accept', '.jpg,.jpeg,.png,.pdf');
	// new_f.setAttribute('capture', '');
	new_f.setAttribute('onchange', 'handle_files_status();');
	new_f.setAttribute('class', 'box__file');
	return new_f;
}


const btn_menu = document.querySelector('#btn-menu');
if ( btn_menu != undefined )
	document.querySelector('#btn-menu').addEventListener('click', ()=>{document.querySelector('header').classList.toggle('aberto');});


//////////////////////////////////////////////////////////////////////////////
// OUTRAS VALIDACOES
//////////////////////////////////////////////////////////////////////////////
// validar formulario de solicitacao
function//////////////////////////////////////////////////////////////////////////////
// MENU
//////////////////////////////////////////////////////////////////////////////
 validacao_privacidade () {
	let erros = false;
	if ( document.querySelector('input[name="tipo"]:checked') == undefined ) {
		document.getElementById('valida-tipo').classList.add('erro');
		document.getElementById('valida-tipo').classList.remove('correto');
		erros = true;
	} else {
		document.getElementById('valida-tipo').classList.remove('erro');
		document.getElementById('valida-tipo').classList.add('correto');
	}
	if ( document.querySelector('input[id="tipo5"]:checked') != undefined ) {
		if ( document.querySelector('#ddown-valor').value == '' ) {
			document.querySelector('.ddown').classList.add('erro');
			document.querySelector('.ddown').classList.remove('correto');
			erros = true;
		} else {
			document.querySelector('.ddown').classList.remove('erro');
			document.querySelector('.ddown').classList.add('correto');
		}
	}
	if ( document.querySelector('#detalhes').value.length < 3 ) {
		document.querySelector('#detalhes').classList.add('erro');
		document.querySelector('#detalhes').classList.remove('correto');
		erros = true;
	} else {
		document.querySelector('#detalhes').classList.remove('erro');
		document.querySelector('#detalhes').classList.add('correto');
	}
	if ( document.querySelector('#file1').value.length == 0 && document.querySelector('#file2').value.length == 0 ) {
		document.querySelector('#dndupload').classList.add('erro');
		document.querySelector('#dndupload').classList.remove('correto');
		erros = true;
	} else {
		document.querySelector('#dndupload').classList.remove('erro');
		document.querySelector('#dndupload').classList.add('correto');
	}

	if ( erros ) {
		return false;
	} else {
		return true;
	}

}

// validar dados do usuario
function validacao_seusdados () {

	erros = false;

	if ( document.querySelector('#telefone').value.length < 3 ) {
		document.querySelector('#telefone').classList.add('erro');
		document.querySelector('#telefone').classList.remove('correto');
		erros = true;
	} else {
		document.querySelector('#telefone').classList.remove('erro');
		document.querySelector('#telefone').classList.add('correto');
	}

	if ( document.querySelector('#cep').value.length < 3 ) {
		document.querySelector('#cep').classList.add('erro');
		document.querySelector('#cep').classList.remove('correto');
		erros = true;
	} else {
		document.querySelector('#cep').classList.remove('erro');
		document.querySelector('#cep').classList.add('correto');
	}

	if ( document.querySelector('#endereco').value.length < 3 ) {
		document.querySelector('#endereco').classList.add('erro');
		document.querySelector('#endereco').classList.remove('correto');
		erros = true;
	} else {
		document.querySelector('#endereco').classList.remove('erro');
		document.querySelector('#endereco').classList.add('correto');
	}

	if ( document.querySelector('#cidade').value.length < 3 ) {
		document.querySelector('#cidade').classList.add('erro');
		document.querySelector('#cidade').classList.remove('correto');
		erros = true;
	} else {
		document.querySelector('#cidade').classList.remove('erro');
		document.querySelector('#cidade').classList.add('correto');
	}

	if ( document.querySelector('#ddown-valor').value == '' ) {
		document.querySelector('.ddown').classList.add('erro');
		document.querySelector('.ddown').classList.remove('correto');
		erros = true;
	} else {
		document.querySelector('.ddown').classList.remove('erro');
		document.querySelector('.ddown').classList.add('correto');
	}

	if ( erros ) {
		return false;
	} else {
		return true;
	}

}


// validar email
function validar_email ( email ) {
	let reg = /^([a-zA-Z0-9_-])+([a-zA-Z0-9._-])+@[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]{0,1}\.([a-zA-Z]{2,10}|[a-zA-Z0-9-]{2,61}\.[a-zA-Z]{2,3})+(\.+([a-zA-Z]{2,2}))?$/i;
	return reg.test(email);
}

// validar data
function validar_data ( data ) {
	let dt = data.split('/');
	let jdate = new Date( dt[2]+'-'+dt[1]+'-'+dt[0] );
	let hoje = (new Date()).getTime() / 1000;
	if ( ! jdate instanceof Date || jdate.getTime() !== jdate.getTime() )
		return false;
	if ( hoje <= jdate.getTime()/1000 )
		return false;
	return true;
}
// mascara de data
function mascara_data(obj) {
	setTimeout( ()=>{ obj.value = mascara_data_2(obj.value); }, 1)
}
function mascara_data_2(v) {
	v = v.replace(/\D/g, "");
	v = v.replace(/(\d{2})(\d)/, "$1/$2");
	v = v.replace(/(\d{2})(\d)/, "$1/$2");
	v = v.replace(/(\d{2})(\d{2})$/, "$1$2");
	v = v.slice(0, 10)
	return v;
}

// mascara de telefone
function mascara_telefone (obj) {
	tel = obj.value;
	tel = tel.replace(/\D/g,"")
	tel = tel.replace(/^(\d)/,"($1")
	tel = tel.replace(/(.{3})(\d)/,"$1) $2")
	if(tel.length == 9) {
		tel = tel.replace(/(.{1})$/,"-$1")
	} else if (tel.length == 10) {
		tel = tel.replace(/(.{2})$/,"-$1")
	} else if (tel.length == 11) {
		tel = tel.replace(/(.{3})$/,"-$1")
	} else if (tel.length == 12) {
		tel = tel.replace(/(.{4})$/,"-$1")
	} else if (tel.length > 12) {
		tel = tel.replace(/(.{4})$/,"-$1")
	}
	obj.value = tel;
}

// mascara de cep
function mascara_cep (obj) {
	cep = obj.value;
	cep = cep.replace(/\D/g,"");
	cep = cep.replace(/^(\d{2})(\d)/,"$1.$2");
	cep = cep.replace(/\.(\d{3})(\d)/,".$1-$2");
	obj.value = cep;
}

// validar cep
function valida_cep () {
    var cep = document.querySelector("#cep").value.replace(/\D/g, '');
    if (cep != "") {
        var validacep = /^[0-9]{8}$/;
        if(validacep.test(cep)) {
			document.querySelector('#cep').classList.remove('erro');
			document.querySelector('#cep').classList.add('correto');
        } //end if.
        else {
			document.querySelector('#cep').classList.add('erro');
			document.querySelector('#cep').classList.remove('correto');
        }
    } //end if.
}


//////////////////////////////////////////////////////////////////////////////
// BOTOES DE DOWNLOAD DOS APPS
//////////////////////////////////////////////////////////////////////////////
const btn_privacidade = document.querySelector('#privacidade');
if ( btn_privacidade != undefined ) {
	const nossoapp = document.querySelector('#nossoapp');
	function nossoapp_pos () {
		let bttm = window.innerHeight - btn_privacidade.getBoundingClientRect().bottom;
		let h = nossoapp.offsetHeight;
		let margemnecessaria = 80;
		if ( bttm < h+margemnecessaria )
			nossoapp.setAttribute('style','position:relative;bottom:auto;');
		else
			nossoapp.removeAttribute('style');
	}
	nossoapp_pos();
	window.addEventListener('resize',nossoapp_pos);
}


//////////////////////////////////////////////////////////////////////////////
// CONFIGURACOES
//////////////////////////////////////////////////////////////////////////////
function switch_config (e,conf_item,val='nops') {

	if ( e.target ) {
		e.preventDefault();
		obj = e.target;
	} else {
		obj = e;
	}

	if (val=='nops')
		document.getElementById(conf_item).value ^= true;
	else
		document.getElementById(conf_item).value = val;

	if ( document.getElementById(conf_item).value == 1 )
		obj.parentElement.classList.add('permitido');
	else
		obj.parentElement.classList.remove('permitido');

	if ( !obj.classList.contains('subswitch') ) {
		const subswitchs = obj.parentElement.parentElement.querySelectorAll('.subswitchs button');
		for ( var i=0; i<subswitchs.length; i++ ) {
			var inputswitch = subswitchs[i].parentElement.querySelector('input[type="hidden"]').getAttribute('id');
			switch_config(subswitchs[i],inputswitch,document.getElementById(conf_item).value);
		}
	}

}
function abrir_subswitch (e) {
	e.preventDefault();
	e.target.parentElement.parentElement.classList.toggle('abrir');
	const subs = e.target.parentElement.parentElement.querySelector('.subswitchs');
	if ( e.target.parentElement.parentElement.classList.contains('abrir') ) {
		subs.style.height = subs.querySelector('.tirarmedida').offsetHeight+'px';
	} else {
		subs.removeAttribute('style');
	}
}


//////////////////////////////////////////////////
// COOKIES
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

