var APP = {//PL95DEFDD03D1A44FF
	chef_mohamed: { playlist:'7D96DE51AAC3E97F',
					channel:'alnastvchannel',
						 remove_words:	['قناة الناس المطبخ والناس'
		                    ,'فناة الناس المطبخ والناس'
		                    ,'قناة الناس  المطبخ والناس'
		                    ,'قناة الناس المطيخ والناس'
		                    ,'قناة الناس المطبح والناس'
		                    ,'قناة الناس المطبح والناس'
		                    ,'قناة الناس المطبخ'
		                    ,'الناس'
		                    ,'الشيف محمد فوزي'
		                    ,'الشيف محمد فوزى'
		                    ,'الشيف محمدفوزي'
		                    ,'محمد فوزي'
		                    ,'محمد فوزى'
		                    ,'و خالد الباروكي'
		                    ,'وخالد الباروكي'
		                    ,'وخالد الباربوكى'
		                    ,'ونبيل سلمان'
		                    ,'الشيف احمد القاضى'
		                    ,'الشيف أحمد القاضي']},
	loadVideoList : function() {
		$(document).ready(function() {
		    var totalResults;
		    var perPage = 25;
		    //$.getJSON('http://gdata.youtube.com/feeds/api/playlists/'+APP.chef_mohamed.playlist+'?v=2&alt=json-in-script&callback=?&start-index=1', function(data) {
		    $.getJSON('http://gdata.youtube.com/feeds/users/alnastvchannel/uploads?alt=json&start-index=1&q=%D8%A7%D9%84%D9%85%D8%B7%D8%A8%D8%AE', function(data) {
		        //openSearch$totalResults
		        totalResults = data["feed"]["openSearch$totalResults"]["$t"];
		        var i;
		        var fetchVideos = function(i) {
		            $.getJSON('http://gdata.youtube.com/feeds/users/alnastvchannel/uploads?alt=json&callback=?&start-index=' + i + '&q=%D8%A7%D9%84%D9%85%D8%B7%D8%A8%D8%AE', function(data) {
		                //alert(i+' data');
		                var cnt = i;
		                $.each(data["feed"]["entry"], function(k, item) {
		                    var title = item["title"]["$t"];
		                    for(var j = 0; j < APP.chef_mohamed.remove_words.length; j++)
		                    		title = title.replace(APP.chef_mohamed.remove_words[j],'');
		                    // var videoID = item["media$group"]["yt$videoid"]["$t"];                
		                    var videoID = item["media$group"]["media$player"][0]["url"];                
		                    var video = 'http://www.youtube.com/watch?v=' + videoID;
		                    //alert('#video-list-' + i);
		                    // $('#video-list-' + i).append('<h2> <a href="http://www.youtube.com/watch?v='+videoID+'" id="vid'+cnt+'"> '+ cnt +' - ' + title + '  </a> </h2> <br/> ');
		                    $('#video-list-' + i).append('<h2> <a href="'+videoID+'" id="vid'+cnt+'"> '+ cnt +' - ' + title + '  </a> </h2> <br/> ');
		                    $('#vid'+cnt).click(function() {
		                    	 	/*event.preventDefault();
		                    		$('#video').empty()
		                    			.append('<iframe width="640" height="360" src="http://www.youtube.com/embed/'+videoID+'" frameborder="0" allowfullscreen></iframe>')
		                    			.append('<br><h2>'+$(this).html()+'</h2>');
		                    	*/
		                    });
		                    cnt++;
		                });
		            });
		        };
		        for (i = 1; i <= totalResults; i += perPage) {
		            $('#video-list').append('<div id="video-list-' + i + '"></div>');
		            fetchVideos(i);
		        }
		    });
		});
	}
};


jQuery(function($) {
	APP.loadVideoList();
});
