Raphael.fn.myName = function(){

	var paper = this;
	var scribePath = function(){

		
		var path = ["M",100,120,"L",250,90 ,"C" ,400,60, 260,30,180,105 ,"C" ,90,200,500,250,170,320,
					"C",360,300,380,80,450,160,"A",8,13,30,0,0,350,250,"A",10,16,30,1,0,450,160,
					"C",480,350,466,177,500,150,"A",2,16,0,0,1,500,250,"A",1,16,0,0,1,500,180,
					"A",2,5,0,0,1,550,245,"A",2,16,0,0,1,550,180,"A",2,5,0,0,1,600,245];
		var name = paper.path(path);
		return name;
	};

	paper.customAttributes.progress = function(v){
		var path = this.data("myPath"),
			attrs = this.attr(),
			offset = { x: 0, y: 0 };

		if (!path) {
	        return {
	            transform: "t0,0"
	        };
	    }

        if (attrs.hasOwnProperty("width")) {
	        offset.x = -this.attr("width") / 2;
	        offset.y = -this.attr("height") / 2;
	    }
	    var trail = this.data("mytrail");
	    

	    var len = path.getTotalLength();
    	var point = path.getPointAtLength(v * len);
    	if(trail){
	    	trail.attr("path", path.getSubpath(0, v * len));
	    }
    	return {
	        transform: "t" + (point.x + offset.x) + "," + (point.y + offset.y) + "r" + point.alpha
	    };
    }

	var value  = scribePath().attr("stroke", "#FFF");
	var circle = paper.circle(0, 0, 10).attr("fill", "red");
	var trail = paper.path(["M",100,120]).attr({
		stroke:"red",
		"stroke-width":3
	});
	

	circle.data("myPath",value);
	circle.data("mytrail",trail);
	circle.attr("progress",0);
	circle.animate({ progress: 1 }, 10000);
	

};

Raphael("pieChart",1000,1000).myName();

