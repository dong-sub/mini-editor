function main(){
	function screenControl(){
		var scrollContainer = $('#mainSection');
		var sectionItems = scrollContainer.find('> .section');
		var pagenation = $('#pagenation');
		var index = 0;
		var eventDefault = false;
		var posArr = [];
		var evTimerId = 0;
		var speed = 700;

		sectionItems.each(function(idx){
			posArr.push(this.getBoundingClientRect().top);
			pagenation.append('<span>'+ (idx+1) +'</span>');
		})
		function goTo(idx){
			scrollContainer.stop().animate({
				'scrollTop':posArr[idx]+'px'
			}, speed, 'easeOutExpo');

			clearTimeout(evTimerId);
			evTimerId = setTimeout(function(){
				eventDefault = false;
			},speed);

			if(idx){
				$('#header').addClass('impdown');
			}else{
				$('#header').removeClass('impdown');
			}
			pagenation.children().eq(idx).addClass('current').siblings().removeClass('current');
		}

		function scrollDown(){
			if(eventDefault){ return false;}
			eventDefault = true;
			index++;
			if(index > sectionItems.length-1){
				index = sectionItems.length-1;
			}
			goTo(index);
		}
		function scrollUp(){
			if(eventDefault){ return false;}
			eventDefault = true;
			index--;
			if(index < 0){
				index = 0;
			}
			goTo(index);
		}

		//event binding
		var mc = new Hammer(scrollContainer.get(0));
		mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
		mc.on("swipeup", scrollDown);
		mc.on("swipedown", scrollUp);

		scrollContainer.on('mousewheel',function(e){
			e.preventDefault();
			if(e.originalEvent.deltaY < 0){
				scrollUp();
			}else{
				scrollDown();
			}
		});
		pagenation.children().eq(0).addClass('current');
	}
	screenControl();
}

$(document).ready(function(){
	$('#secuID').remove();
	main();
})