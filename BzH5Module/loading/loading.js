/**
 * Created by 56.
 * 有问题联系QQ675231249
 */

$(function($){
    $.fn.loading = function(opt,callback){
        $_self = $(this);
        var value = 0;
        var defaults = {
            imgUrl : "",
            Needlazyload : false,
            //模块 可选择jinr liyu 或者custom
            Module:"liyu",
            afterLoad:function(){
                $_self.fadeOut(300);
            }
        }
        var settings = $.extend({},defaults, opt);
        jinr = function(){
            var jinrHtml = '<div class="loading_contain">' + '\n'
                         + '<div class="loading_hide" id="loading_hide"></div></div>' + '\n'
                         + '<p id="loading_p"></p>';
            $_self.append(jinrHtml);
            $_self.css({"height": "100%", "width": "100%", "z-index": 99, "position": "fixed", "top": "0px", "left": "0px", "background": "#d9d9d9"});
            $_self.find('div').css({"height": "147px", "width": "147px"});
            $_self.find(".loading_contain").css({"background": "url("+settings.imgUrl.p1+") no-repeat top" , "margin": "40% auto 0"});
            $_self.find(".loading_hide").css({"background": "url("+settings.imgUrl.p2+") top"});
            $_self.find("#loading_p").css({"text-align":"center","font-size":"24px"});
            RunjinrAction();
        }


        liyu = function(){
            var liyuHtml = '<div class="loadingBox">' + '\n'
                + '<div class="loadingBg"></div>' + '\n'
                + '<div class="con"></div></div>';

            $_self.append(liyuHtml);
            $_self.find(".loadingBox").css({"height": "80px", "width": "80px", "margin": "100px auto","position": "relative", "background": "url(img/loadingYu.png) no-repeat","background-size":"100%","top": 0,"left": 0,"z-index": 3});
            $_self.find('.loadingBg').css({
                "height": "80px", "width": "80px",
                "background": "url(img/loadingBg.png) no-repeat","background-size":"100%","position": "absolute","top": 0,"left": 0,"z-index": 2
                //,"transform":"rotate(50deg)"
             });
            $_self.find(".con").css({"height": "80px", "width": "80px", "position": "absolute", "background": "url(img/loadingYu.png) no-repeat","background-size":"100%", "top": 0,"left": 0,"z-index": 3});
            var rotate = setInterval(function(){
                $_self.find('.loadingBg').css({"transform":"rotate(" + value%360 + "deg)"});
                $_self.find('.loadingBg').css({"webkit-transform":"rotate(" + value%360 + "deg)"});
                value++;
            },1)

            if(!settings.Needlazyload){
                window.onload = function () {
                    clearInterval(rotate);
                    settings.afterLoad();
                }
            }
        }

        RunjinrAction = function(){
            var per = 0;
            var stopF1 = setInterval(function () {
                var height_p = parseInt((1 - per / 100) * 147);
                if (per <= 90) {
                    setHigh(height_p,per);
                    per++;
                    return per;
                }
            }, 5)
            var stopF2 = setInterval(function () {
                var height_p = parseInt((1 - per / 100) * 147);
                if (90 <= per && per <= 99) {
                    clearInterval(stopF1);
                    setHigh(height_p,per);
                    per++;
                } else if (per >= 100) {
                    clearInterval(stopF2);
                    document.getElementById("loading_box").style.display = "none";
                }
            }, 400);
            window.onload = function () {
                setHigh(0,100);
                clearInterval(stopF2);
                settings.afterLoad();
            }
        }

        setHigh = function(height_p,per){
            document.getElementById("loading_hide").style.height = height_p + 'px';
            document.getElementById("loading_p").innerHTML = per + '%';
        }

        initial=function(){
            switch (settings.Module){
                case "jinr":
                    jinr();
                    break;
                case "liyu":
                    liyu();
                    break;
            }

        }

        return initial();
    }


})
