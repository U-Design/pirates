$(document).ready(function() {
	

	var applyDragging = function() {
		
		var mouseOffset= null , dragObject = null;

		this.mouseCoords = function(event){/*mouse cooridanates*/

			if(event.pageX || event.pageY){
				return {x:event.pageX, y:event.pageY};
			}
			return{
				x:event.clientX + document.body.scrollLeft - document.body.clientLeft,
				y:event.clientY + document.body.scrollTop -  document.body.clientTop
			};
		};

		this.getMouseOffset = function(target,event){
			event = event || window.event;
			var objPos = getDomPosition(target);
			var mousePostion = mouseCoords(event);
			return {x:mousePostion.x - objPos.x ,y:mousePostion.y - objPos.y};
		};

		this.getDomPosition = function(target){ /*dom  top and left coordinates*/
			var left =0 ,top =0 ;

			if(target.offsetParent){
				left +=target.offsetLeft;
				top +=target.offsetTop;
			}
			return {x:left, y:top};
		};

		this.onMouseMove = function(event){

			event = event || window.event;
			var mousePostion = mouseCoords(event);
			if(dragObject){
				//dragObject.style.position ='absolute';
				var top = mousePostion.y - mouseOffset.y,
					left = mousePostion.x - mouseOffset.x;
				top = top < 0 ? 0 : top;
				left = left < 0 ? 0 : left;
				dragObject.style.top = top+"px";
				dragObject.style.left = left+"px";
				dragObject.style.cursor = "move";
				return false;
			}
		};

		this.onMouseUp = function(){
			if(dragObject){
				dragObject.style.cursor = "";
				dragObject = null;
			}
		};

		this.makeDraggable = function(domObject){
			if($(domObject).length){
				$(domObject).on('mousedown',function(event){
					dragObject = this;
					mouseOffset = getMouseOffset(this,event);
					return false;
				});
			}
		};

		$(document).on('mousemove',onMouseMove);
		$(document).on('mouseup',onMouseUp);


		return{
			makeDraggable: makeDraggable
		}
	}; 


	
	applyDragging().makeDraggable($("#dragDiv"));



});
