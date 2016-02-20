$(function($){

    $.fn.wheelView = function(options) {
        var _self = $(this);
        var startTouch,endTouch = {};
        var timeCount = 0,Tinterval;
        var defaults = {
            position : "middle",


            initialize : function(){
                drawframe();
            }
        }
        var settings = $.extend({},defaults, options);
        function drawframe(){
            if(settings.position == "middle"){
                _self.addClass("wheelView_center");
            }
            $(".wheelFirst").append(settings.Firstli);
            $(".wheelSecond").append(settings.Secondndli);
            $(".wheelThird").append(settings.Thirdli);

            $(".wheelContainer ul").each(function(index,ele){

                $(this).bind("touchstart", function (event) {
                    touchStart(event,$(this));
                })

                $(this).bind("touchMove", function (event) {
                    touchMove(event,$(this));
                })

                $(this).bind("touchend", function(event) {
                    touchEnd(event,$(this))
                })

            })

        }


        function touchStart(e,_self){
            e.preventDefault();

            Tinterval = setInterval(function(){
                timeCount += 0.01;
            },1)

            var startX = e.originalEvent.touches[0].clientX;
            var startY = e.originalEvent.touches[0].clientY;
            startTouch = {
                x : startX,
                y : startY
            };
        }

        function touchMove(e,_self){
            e.preventDefault()
            var changedX = e.originalEvent.changedTouches[0].clientX;
            var changedY = e.originalEvent.changedTouches[0].clientY;
        }

        function touchEnd(e,_self){
            e.preventDefault();
            var swipeResult;
            var swipeData;
            var result = [];

            var endX = e.originalEvent.changedTouches[0].clientX;
            var endY = e.originalEvent.changedTouches[0].clientY;
            endTouch = {
                x : endX,
                y : endY
            };

            if(endTouch.y > startTouch.y){
               // resultarr.push("down");
                swipeResult = "down";
                swipeData = endTouch.y - startTouch.y;
            }else if(endTouch.y < startTouch.y){
               // resultarr.push("up");
                swipeResult = "up";
                swipeData = startTouch.y - endTouch.y;
            }

            clearInterval(Tinterval);
            //alert(timeCount);
            speedjudge(swipeResult,swipeData,timeCount,_self)
            timeCount = 0;
        }

        function speedjudge(swR,swD,T,_self){
            var currSpeed = swD/T;
           // alert(currSpeed)
            var a = currSpeed/T;
            var s = 0.5*a*T*T*3;
            //alert(s)

            _self.find("li").animate({ top: "-="+s },{
                easing: 'easeOutBack',
                duration: 1000,
                complete: ''
            });

        }

        return settings.initialize()

    }

})
