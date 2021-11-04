        function getTamX() {
            return window.innerWidth * 0.97
        }
        function getTamY() {
            return window.innerHeight;
        }

        function setWidth(e, tam) {
            document.getElementById(e).width = tam;
        }
        function setHeight(e, tam) {
            document.getElementById(e).height = tam;
        }
        function ajustaTela() {
            let tamX = getTamX()
            let tamY = getTamY()
            setWidth("player1", Math.floor(tamX / 2));
            setWidth("player2", Math.floor(tamX / 2));
            setWidth("player3", Math.floor(tamX / 2));
            setWidth("player4", Math.floor(tamX / 2));
            setHeight("player1", Math.floor(tamY / 2));
            setHeight("player2", Math.floor(tamY / 2));
            setHeight("player3", Math.floor(tamY / 2));
            setHeight("player4", Math.floor(tamY / 2));

        }

        function openFullscreen() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
                if (document.exitFullscreen) {
                  //  document.exitFullscreen();
                }
            }
        }
        // 2. This code loads the IFrame Player API code asynchronously.
        var tag = document.createElement('script');
        window.onresize = ajustaTela;

        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // 3. This function creates an <iframe> (and YouTube player)
        //    after the API code downloads.
        var player1;
        var player2;
        var player3;
        var player4;
        var oldVideo = []
        
        var intervalAt;
	
	$(document).ready(() => {
        	intervalAt = setInterval(autoGetLinks,10000);
        	getLinks();
	});
        
        function toggleInputs(chk){
    	 	for (let i = 0; i<4; i++){
    	 	  let id = '#inputvideo' + parseInt(i+1);
 		  $(id).attr('readonly', chk);
 		}
          
        }
        function autoGetLinks() {
            let chk = $("#checkAuto").is(":checked");
            toggleInputs(chk);
            
            if (chk)
        	getLinks(true);//true = automatico = náo recarrega os videos
        }
        

        function onYouTubeIframeAPIReady() {
            let tamX = window.innerWidth * 0.98
            let tamY = window.innerHeight * 0.99

            player1 = new YT.Player('player1', {
                height: Math.floor(tamY / 2),
                width: Math.floor(tamX / 2),
                videoId: '',
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });

            player2 = new YT.Player('player2', {
                height: Math.floor(tamY / 2),
                width: Math.floor(tamX / 2),
                top: Math.floor(tamY / 2),
                left: Math.floor(tamX / 2),
                videoId: '',
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
            player3 = new YT.Player('player3', {
                height: Math.floor(tamY / 2),
                width: Math.floor(tamX / 2),
                top: Math.floor(tamY / 2),
                videoId: '',
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
            player4 = new YT.Player('player4', {
                height: Math.floor(tamY / 2),
                width: Math.floor(tamX / 2),
                top: Math.floor(tamY / 2),
                left: Math.floor(tamX / 2),
                videoId: '',
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        }

        // 4. The API will call this function when the video player is ready.
        function onPlayerReady(event) {
            event.target.playVideo();
        }

        // 5. The API calls this function when the player's state changes.
        //    The function indicates that when playing a video (state=1),
        //    the player should play for six seconds and then stop.
        function onPlayerStateChange(event) {
 //           if (event.data == YT.PlayerState.PLAYING && !done) {
//                setTimeout(stopVideo, 6000);
//            }
        }
        function stopVideo() {
            player1.stopVideo();
        }
        
        function getVideoId(url) {
          let char;
          if (url.includes("="))
            char = "="
          else if (url.includes("/"))
            char = "/"
          else 
            return url;
          url = url.split(char)
          url = url[url.length-1]
          if (url.includes("&"))
            url = url.split("&")[0]
          
          return url
        }
        
        function atualizarPlayer(p, idInput, auto){
          if (!p)
          	return;
          let url = document.getElementById(idInput).value;
          if (oldVideo[idInput] == url){
            if (!auto) {
              p.stopVideo();
              setTimeout(p.playVideo(),500);
            }
            return 
          }
          let videoId = getVideoId(url)
          if (videoId.length>0)
            p.loadVideoById(videoId);
          oldVideo[idInput] = url
        }
        function atualizarTodos(auto) {
        	atualizarPlayer(player1, 'inputvideo1',auto)
        	atualizarPlayer(player2, 'inputvideo2',auto)
        	atualizarPlayer(player3, 'inputvideo3',auto)
        	atualizarPlayer(player4, 'inputvideo4',auto)
        }
        
        
	function compartilhar(){ 
    	 	for (let i = 0; i<4; i++){
    	 	  let id = '#inputvideo' + parseInt(i+1);
 		  let val = $(id).val();
 		  $(id).val("https://www.youtube.com/watch?v=" + getVideoId(val));
 		}
   
	   var values = $('#mainForm').serialize();
           //var values = document.documentElement.innerHTML;
           //link1=&link2=&link3=asdSAD&link4=

           $.ajax({
            url: "savelink.php",
            type: "post",
            data: values ,
            success: function (response) {

              // You will get response from your PHP page (what you echo or print)
            } ,
            error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
            }
           });
           
	}
        
	
	function trataLinks(links,auto=false) {
	  if (!links)
	    return;
	  links = links.split(";");
	  if (Array.isArray(links) && (links.length > 2)){
	  	for (let i = 0; i<links.length; i++){
 		  $('#inputvideo' + parseInt(i+1)).val(links[i]);
 		}
 		atualizarTodos(auto);
	  }
	
	}
	function getLinks(auto=false) {
	 $.ajax({
	    type: "GET",
	    url: "getlink.php",
	    success: function(response){
        	trataLinks(response,auto);
	    }
	 });	
	}

