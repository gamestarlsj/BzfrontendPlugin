
(function ($){
	/* 	endTime 截止日期时间戳 单位s
		conditions 按照条件输出计时器 1为时分秒(默认) 2为天时分秒 3为分秒
		type 输出的计时类型 1为美式(默认) 2为中式
		callback 倒计时结束执行的函数
		animation 动画效果（待开发）
	*/ 
	$.fn.timer = function(endTime,conditions,type,callback){
		$_this = $(this);
		var timeValue = endTime - Date.now()/1000;
	    var days,hours,minutes,seconds,zsHtml,msHtml,temHtml;
	    msHtml = '<span class="minutes-t"></span><span class="minutes-b"></span><span class="symbol">:</span><span class="seconds-t"></span><span class="seconds-b"></span>';
	    zsHtml = '<span class="minutes-t"></span><span class="minutes-b"></span><span class="symbol">分</span><span class="seconds-t"></span><span class="seconds-b"></span><span class="symbol">秒</span>';
	    switch(conditions){
	    	case '':
	    		conditions = 1;
	    	case 1:
	    		msHtml = '<span class="hours-t"></span><span class="hours-b"></span><span class="symbol">:</span>'+msHtml;
	    		zsHtml = '<span class="hours-t"></span><span class="hours-b"></span><span class="symbol">时</span>'+zsHtml;
	    		break;
	    	case 2:
	    		msHtml = '<span class="days-t"></span><span class="days-b"></span><span class="symbol">:</span><span class="hours-t"></span><span class="hours-b"></span><span class="symbol">:</span>'+msHtml;
	    		zsHtml = '<span class="days-t"></span><span class="days-b"></span><span class="symbol">天</span><span class="hours-t"></span><span class="hours-b"></span><span class="symbol">时</span>'+zsHtml;
	    		break;
	    	case 3:
	    		break;
	    	default:
	    		msHtml = zsHtml = '计时输出类型不正确,第三个参数有误';
	    }
	    switch(type){
	    	case '':
	    		type = 1;
	    	case 1:
	    		temHtml = msHtml;
	    		break;
	    	case 2:
	    		temHtml = zsHtml;
	    		break;
	    	default:
	    		temHtml = '计时输出类型不正确,第二个参数有误';

	    }
	    $_this.html(temHtml);
	    var  countDown = function(){
	        if (timeValue>0){
	            minutes = Math.floor((timeValue % 3600) / 60);
	            seconds = Math.floor(timeValue % 60);
	            if(conditions==2){
	            	days = Math.floor(timeValue / (86400));
	            	document.querySelector('.days-t').innerHTML = Math.floor(days / 10);
	            	document.querySelector('.days-b').innerHTML = Math.floor(days % 10);
	            }
	            if(conditions==1||conditions==2){
	            	hours = Math.floor((timeValue % 86400) / 3600);
	            	document.querySelector('.hours-t').innerHTML = Math.floor(hours/ 10);
	            	document.querySelector('.hours-b').innerHTML = Math.floor(hours % 10);
	            }
	           	document.querySelector('.minutes-t').innerHTML = Math.floor(minutes / 10);
	            document.querySelector('.minutes-b').innerHTML = Math.floor(minutes % 10);
	            document.querySelector('.seconds-t').innerHTML = Math.floor(seconds/ 10);
	            document.querySelector('.seconds-b').innerHTML = Math.floor(seconds % 10);
	            timeValue--;
	        }
	        else{
 				if(conditions==2){
	            	document.querySelector('.days-t').innerHTML = 0;
	            	document.querySelector('.days-b').innerHTML = 0;
	            }
	            if(conditions==1||conditions==2){
		            document.querySelector('.hours-t').innerHTML = 0;
		            document.querySelector('.hours-b').innerHTML = 0;
		        }
	           	document.querySelector('.minutes-t').innerHTML = 0;
	            document.querySelector('.minutes-b').innerHTML = 0;
	            document.querySelector('.seconds-t').innerHTML = 0;
	            document.querySelector('.seconds-b').innerHTML = 0;
	            clearInterval(cycle);
	            if(callback instanceof Function){
	            	callback();
	            }
	        }
	    }
	    var goTimer = setTimeout(function(){countDown()}, 0);
	    var cycle = setInterval(function(){countDown()}, 1000);
	}
})(jQuery);
