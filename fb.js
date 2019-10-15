var feederStarted = false;
var feederLoaded = false;



function feederInit(options){
	if ( !options.feedId) {
		console.error("Valid options not provided!\nNeeds AID, feedId, token");
		return;
	}

	$.post(
		options,
		function(data){
			outputFeed(options, data.feed);
		}	);}

function outputFeed(options, feed) {
	for (var j = 0; j < Math.min(options.numPosts,feed.data.length); j++) {
		var content = ""

		if ( feed.data[j].story){content +=  feed.data[j].story + " - " ;}
		if ( feed.data[j].description){content += feed.data[j].description + " - " ;}
		if ( feed.data[j].message){content += feed.data[j].message  ;}

		var link = feed.data[j].id
		var feedImage = '';
		if ( feed.data[j].full_picture){ feedImage = feed.data[j].full_picture ;}
		var posted = feed.data[j].created_time;
		posted =   moment(posted).format("D MMMM, YYYY");

		if ( content.indexOf('cover photo') >= 0 || content.indexOf('profile picture')  >= 0 ){
			link = $.trim(link).split("_").slice(0, -1);
		}
		if (content.length > options.postLength){
			var shortText = $.trim(content).substring(0,options.postLength).split(" ").slice(0, -1).join(" ") + "...";  

			if( feedImage != '' ){
					var html =' <div class="carousel-inner" role="listbox"> ';
				
				$('#'+options.containerId).append('<div class="feed-item plus-image"><div class="facebook-content"><a href="https://facebook.com/'+options.feedId+'" class="user-name">'+options.profileName+'<span>  &#183; '+feed.data[j].timestamp_content+'</span></a>  <p>'+shortText+'<a target="_blank" href="https://www.facebook.com/'+link+'" class="read-more">Read More</a> </p></div><a target="_blank" href="https://www.facebook.com/'+link+'" ><img src="'+feedImage+'" class="facebook-image" /></a></div>');}
				
				else{
					$('#'+options.containerId).append('<div class="feed-item"><div class="facebook-content"><a href="https://facebook.com/'+options.feedId+'" class="user-name">'+options.profileName+'<span>  &#183; '+feed.data[j].timestamp_content+'</span></a>  <p>'+shortText+'<a  target="_blank" href="https://www.facebook.com/'+link+'" class="read-more">Read More</a> </p></div></div>');	}	}

			else{
				var shortText = content;
				if( feedImage != '' ){
					$('#'+options.containerId).append('<div class="feed-item plus-image"><div class="facebook-content"><a href="https://facebook.com/'+options.feedId+'" class="user-name">'+options.profileName+'<span>  &#183; '+feed.data[j].timestamp_content+'</span></a>  <p>'+shortText+' </p></div><a target="_blank" href="https://www.facebook.com/'+link+'" ><img src="'+feedImage+'" class="facebook-image" /> </a></div>');
				}
				else{
					$('#'+options.containerId).append('<div class="feed-item"><div class="facebook-content"><a href="https://facebook.com/'+options.feedId+'"class="user-name">'+options.profileName+'<span>  &#183; '+feed.data[j].timestamp_content+'</span></a> <p>'+shortText+' </p></div></div>');
				}
			}

			$('#'+options.containerId).parent().removeClass("hidden");

		}
	}