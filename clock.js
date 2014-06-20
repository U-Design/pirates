Raphael.fn.clock = function (cx,cy,radius) {
	
	var paper = this,
		rad = Math.PI / 180;

	var circle = paper.circle(cx,cy,radius);
		circle.attr({
			fill:"yellow",
			stroke: "blue",
			"stroke-width":"10"
		});


	var paintNumber = function(angle){
		var x , y;
		for (var i = 0; i < 12; i++) {
			
			x = cx + (radius-30) * Math.cos(-angle * rad);
			y = cy + (radius-30)  * Math.sin(-angle * rad);
			angle -=30;

			paper.text(x,y,i+1).attr({
				"font-size":30
			});
		};
		for (var i = 0; i < 60; i++) {
			
			x = cx + (radius-10) * Math.cos(-angle * rad);
			y = cy + (radius-10)  * Math.sin(-angle * rad);
			angle -=6;

			paper.circle(x,y,1).attr({"fill":"black"})
	
		};	
	};
	var intialPosition = function(){
		var dateNow = new Date(),
			hours = dateNow.getHours(),
			minutes = dateNow.getMinutes(),
			seconds = dateNow.getSeconds();
		hours = (hours-12) > 0 ? hours-12 : hours;	
		var secInDeg = (360/60)*seconds,
			minInDeg = (360/60)*minutes,
			hoursInDeg =(360/12)*hours;
		var delta = minutes != 60 ? parseInt(minutes/12)*6 :0;
		hoursInDeg +=delta;
		return {secInDeg:secInDeg, minInDeg:minInDeg, hoursInDeg:hoursInDeg};	
	};


	paintNumber(60);
	var position = intialPosition();
	var secondsHand = paper.path(["M",cx,cy,"V",cy-radius+10]).attr({stroke:"blue","stroke-width":1.5,"stroke-linecap":"round","transform":"R"+position.secInDeg+","+cx+","+cy});
	var minutesHand = paper.path(["M",cx,cy,"V",cy-radius+50]).attr({stroke:"green","stroke-width":2.5,"stroke-linecap":"round","transform":"R"+position.minInDeg+","+cx+","+cy});
	var hourHand = paper.path(["M",cx,cy,"V",cy-radius+80]).attr({stroke:"brown","stroke-width":4,"stroke-linecap":"round","transform":"R"+position.hoursInDeg+","+cx+","+cy});
	var center = paper.circle(cx,cy,5).attr({"fill":"black"});
	
	setInterval(function(){
		
		currentTime = intialPosition();
		secondsHand.attr({"transform":"R"+currentTime.secInDeg+","+cx+","+cy});
		minutesHand.attr({"transform":"R"+currentTime.minInDeg+","+cx+","+cy})
		hourHand.attr({"transform":"R"+currentTime.hoursInDeg+","+cx+","+cy});

	},1000);

	
};
window.onload = function() {
	/* Act on the event */
	Raphael("clock",400,400).clock(200,200,150);
};
