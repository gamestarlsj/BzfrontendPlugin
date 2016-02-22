
//作者：56
//如果有不明白的请联系QQ675231249

$(function($){

    $.fn.wheelView = function(options) {
        var _self = $(this);
        var startTouch,endTouch = {};
        var timeCount = 0,Tinterval;
        var startTop;
        var endTop;
        var lastTop;
        var startx,starty;
        var defaultTop = 55*2;
        var runningflag = false;

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

                $(this).bind("touchstart click", function (event) {
                    touchStart(event,$(this));
                })

                $(this).bind("touchmove mousemove", function (event) {
                    touchMove(event,$(this));
                })

                $(this).bind("touchend mouseup", function(event) {
                    touchEnd(event,$(this))
                })

            })

        }


        function touchStart(e,_self){
            e.preventDefault();

            var liNum = _self.find("li").length;
            lastTop = (-55 * liNum) + 165;

            Runningflag = true;
            Tinterval = setInterval(function(){
                timeCount += 0.01;
            },1)

            if(e.originalEvent.type == "click"){
                var startX = e.originalEvent.clientX;
                var startY = e.originalEvent.clientY;
            }else{
                var startX = e.originalEvent.touches[0].clientX;
                var startY = e.originalEvent.touches[0].clientY;
            }
            starty = startY;
            startTop = _self.find("li").css("top")
            startTop = ToptoNum(startTop);
            startTouch = {
                x : startX,
                y : startY
            };
        }

        function touchMove(e,_self){
            e.preventDefault();

            if(e.originalEvent.type == "mousemove"){
                var changedX = e.originalEvent.clientX;
                var changedY = e.originalEvent.clientY;
            }else{
                var changedX = e.originalEvent.changedTouches[0].clientX;
                var changedY = e.originalEvent.changedTouches[0].clientY;
            }
            fingermove(changedX,changedY,_self);
        }

        function touchEnd(e,_self){
            e.preventDefault();
            var swipeResult;
            var swipeData;
            var result = [];

            if(e.originalEvent.type == "mouseup"){
                var endX = e.originalEvent.clientX;
                var endY = e.originalEvent.clientY;
            }else{
                var endX = e.originalEvent.changedTouches[0].clientX;
                var endY = e.originalEvent.changedTouches[0].clientY;
            }
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
            endTop = _self.find("li").css("top");

            speedjudge(swipeResult,swipeData,timeCount,_self)
            timeCount = 0;
        }

        function fingermove(x,y,_self){
            var changedY = parseInt(starty) - parseInt(y);

            ctop = parseInt(startTop) - parseInt(changedY);

            _self.find("li").css("top", ctop );

        }

        //路径换算成整数倍
        function speedjudge(swR,swD,T,_self){

            //判定直接选择不需要滑动
            if(T >= 0.7){
                endTop = ToptoNum(endTop);
                endTop = positionModifer(endTop);
                if(swR == "down"){
                    //有-说明已经位置在最上方
                    if(endTop > defaultTop){
                        swipeanimate(defaultTop,_self);
                        return
                    }else{
                        swipeanimate(positionModifer(endTop),_self);
                        return
                    }
                }else if(swR == "up"){
                    if(endTop <= lastTop){
                        swipeanimate(lastTop,_self);
                        return
                    }else{
                        swipeanimate(endTop,_self);
                        return
                    }
                }
            }else{
                var currSpeed = swD/T;
                var a = currSpeed/T;
                var s = Math.ceil(0.5*a*T*T*3);
                endTop = ToptoNum(endTop);
                s = positionModifer(s);
                var duration  = 1000;
                if(swR == "down"){
                    //有-说明已经位置在最上方
                    if(endTop > defaultTop){
                        swipeanimate(defaultTop,_self);
                        return
                    }else{
                        var num = parseInt(endTop) + parseInt(s);
                        if(num > defaultTop) {swipeanimate(defaultTop,_self)}
                        else swipeanimate(positionModifer(num),_self);
                        return
                    }
                }else if(swR == "up"){
                    if(endTop <= lastTop){
                        swipeanimate(positionModifer(lastTop),_self);
                        return
                    }else{
                        swipeanimate(positionModifer(endTop),_self);
                        return
                    }
                }
            }
        }

        function ToptoNum(currTop){
            currTop = parseInt(currTop.replace("px",""));
            return currTop;
        }
        function positionModifer(num){

            if(num % 55 == 0){
                return num;
            }else{
                var minute = num % 55;
                if(minute < -28){
                    num -= (55 + minute)
                }else{
                    num -= minute;
                }

                return num;
            }
        }

        function swipeanimate(Top,_self,duration){
            _self.find("li").animate({ top: Top },{
                easing: 'easeOutQuint',
                duration:300,
                complete: function(){
                    runningflag = false;
                }
            })
        }

        return settings.initialize()

    }

})
