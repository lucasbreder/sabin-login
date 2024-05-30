var alx_mapas;
function alx_imgmapresizer() {
	window.addEventListener( 'load', ()=>{
		alx_mapas = document.querySelectorAll('map');
		alx_mapas.forEach((obj)=>{
			var areas = obj.querySelectorAll('area');
			var dcoords = new Array();
			for ( var j=0; j<areas.length; j++ ) {
				var coords = areas[j].getAttribute('coords').split(',');
				dcoords[j] = coords.map( str => str.trim()*1 );
			}
			obj.setAttribute('data-coords', JSON.stringify(dcoords) );
		});
		alx_resizemap();
		window.addEventListener( 'resize', alx_resizemap );
	} );
}
function alx_resizemap () {
	alx_mapas.forEach((obj)=>{
		var imagem = document.querySelector('img[usemap="#' + obj.getAttribute('name') + '"]');
		var img_w = imagem.getAttribute('consider-width');
		if ( img_w == undefined )
			img_w = imagem.naturalWidth;
		var r = imagem.width/img_w;
		var areas = obj.querySelectorAll('area');
		var dcoords = JSON.parse( obj.getAttribute('data-coords') );
		for ( var j=0; j<areas.length; j++ ) {
			var coords = dcoords[j];
			coords = coords.map( (c)=>{return Math.round(c*1*r);} );
			coords = coords.join(',');
			areas[j].setAttribute('coords',coords);
		}
	});
}
