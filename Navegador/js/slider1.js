$(function() {  /*MSGP*/
	
	var totalPanels			= $(".scrollContainer").children().size();
		
	var regWidth			= $(".panel").css("width");
	var regImgWidth			= $(".panel img").css("width");
	var regTitleSize		= $(".panel h2").css("font-size");
	var regParSize			= $(".panel p").css("font-size");
	
	var movingDistance	    = 300;
	
	var curWidth			= 375;
	var curImgWidth			= 326;
	var curTitleSize		= "20px";
	var curParSize			= "15px";

	var $panels				= $('#slider .scrollContainer > div');
	var $container			= $('#slider .scrollContainer');

	$panels.css({'float' : 'left','position' : 'relative'});
    
	$("#slider").data("currentlyMoving", false);

	$container
		.css('width', ($panels[0].offsetWidth * $panels.length) + 100 )
		.css('left', "-350px");

	var scroll = $('#slider .scroll').css('overflow', 'hidden');

	function returnToNormal(element) {
		$(element)
			.animate({ width: regWidth })
			.find("img")
			.animate({ width: regImgWidth })
		    .end()
			.find("h2")
			.animate({ fontSize: regTitleSize })
			.end()
			.find("p")
			.animate({ fontSize: regParSize });
	};
	
	function growBigger(element) {
		$(element)
			.animate({ width: curWidth })
			.find("img")
			.animate({ width: curImgWidth })
		    .end()
			.find("h2")
			.animate({ fontSize: curTitleSize })
			.end()
			.find("p")
			.animate({ fontSize: curParSize });
	}
	
	//Dirección true = derecha, false = izquierda
	function change(direction) {
	   
	    //Si no en el primer o último panel
		if((direction && !(curPanel < totalPanels)) || (!direction && (curPanel <= 1))) { return false; }	
        
        //Si no se está moviendo actualmente
        if (($("#slider").data("currentlyMoving") == false)) {
            
			$("#slider").data("currentlyMoving", true);
			
			var next         = direction ? curPanel + 1 : curPanel - 1;
			var leftValue    = $(".scrollContainer").css("left");
			var movement	 = direction ? parseFloat(leftValue, 10) - movingDistance : parseFloat(leftValue, 10) + movingDistance;
		
			$(".scrollContainer")
				.stop()
				.animate({
					"left": movement
				}, function() {
					$("#slider").data("currentlyMoving", false);
				});
			
			returnToNormal("#panel_"+curPanel);
			growBigger("#panel_"+next);
			
			curPanel = next;
			
			//Eliminar todas las funciones vinculadas anteriores
			$("#panel_"+(curPanel+1)).unbind();	
			
			//avanzar
			$("#panel_"+(curPanel+1)).click(function(){ change(true); });
			
            //Eliminar todas las funciones vinculadas anteriores															
			$("#panel_"+(curPanel-1)).unbind();
			
			//regresa
			$("#panel_"+(curPanel-1)).click(function(){ change(false); }); 
			
			//Eliminar todas las funciones vinculadas anteriore
			$("#panel_"+curPanel).unbind();
		}
	}
	
	// Configuración del panel "Actual" y siguiente y anterior
	growBigger("#panel_3");	
	var curPanel = 3;
	
	$("#panel_"+(curPanel+1)).click(function(){ change(true); });
	$("#panel_"+(curPanel-1)).click(function(){ change(false); });
	
	//Cuando se hace clic en las flechas izquierda / derecha
    $(".right").click(function(){ change(true); });	
	$(".left").click(function(){ change(false); });
	
	$(window).keydown(function(event){
	  switch (event.keyCode) {
			case 13: //entrar
				$(".right").click();
				break;
			case 32: //espacio
				$(".right").click();
				break;
	    case 37: //flecha izquierda
				$(".left").click();
				break;
			case 39: //flecha correcta
				$(".right").click();
				break;
	  }
	});
	
});