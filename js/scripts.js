	
	function trataLinks(links) {
	  if (!links)
	    return;
	  links = links.split(";");
	  if (Array.isArray(links) && (links.length > 2)){
	  	for (let i = 0; i<links.length; i++){
 		  $('#inputvideo' + parseInt(i+1)).val(links[i]);
 		}
 		atualizarTodos();
	  }
	
	}
	function getLinks() {
	 $.ajax({
	    type: "GET",
	    url: "getlink.php",
	    success: function(response){
        	trataLinks(response);
	    }
	 });	
	}

