//作者：56
//版权: JYLYGY
var returnArr = [];

function checkTouch(id,opt){
    var startTouch,endTouch = {};

    $touchEle = document.getElementById("touchid");
    $touchEle.addEventListener("touchstart",touchStart,false);
    $touchEle.addEventListener("touchmove",touchMove,false);
    $touchEle.addEventListener("touchend",touchEnd,false);

    function touchStart(e){
        e.preventDefault()
        var startX = e.touches[0].clientX;
        var startY = e.touches[0].clientY;
        startTouch = {
            x : startX,
            y : startY
        };
    }

    function touchMove(e){
        e.preventDefault()
        var changedX = e.changedTouches[0].clientX;
        var changedY = e.changedTouches[0].clientY;
    }

    function touchEnd(e){
        e.preventDefault()
        var result = [];

        var endX = e.changedTouches[0].clientX;
        var endY = e.changedTouches[0].clientY;
        endTouch = {
            x : endX,
            y : endY
        };
        var action = compare(result);

        //函数外部定义注入
        switch (action.length>0){
            case action[0] == "left":
                opt.left();
                break;
            case action[0] == "right":
                opt.right();
                break
            case action[0] == "up":
                opt.up();
                break;
            case action[0] == "down":
                opt.down();
                break;
        }

    }

    function compare(resultarr){
        if(endTouch.x > startTouch.x && (endTouch.x - startTouch.x) > 200){
            resultarr.push("left");
        }else if(endTouch.x < startTouch.x && (startTouch.x - endTouch.x) > 200){
            resultarr.push("right");
        }

        if(endTouch.y > startTouch.y){
            resultarr.push("down");
        }else if(endTouch.y < startTouch.y){
            resultarr.push("up");
        }

        return resultarr;
    }

}

//e事件
//e: TouchEvent
//altKey: false
//bubbles: true
//cancelBubble: false
//cancelable: true
//changedTouches: TouchList
//ctrlKey: false
//currentTarget: div#touchid
//defaultPrevented: true
//detail: 0
//eventPhase: 2
//isTrusted: true
//isTrusted: true
//metaKey: false
//path: Array[5]
//returnValue: false
//shiftKey: false
//sourceCapabilities: InputDeviceCapabilities
//srcElement: div#touchid
//target: div#touchid
//targetTouches: TouchList
//timeStamp: 1455763210724
//touches: TouchList
//type: "touchstart"
//view: Window
//which: 0

//touch事件
//0: Touch
//clientX: 430.4949951171875
//clientY: 285.0369873046875
//force: 1
//identifier: 0
//pageX: 430.4949951171875
//pageY: 285.0369873046875
//radiusX: 16.89655113220215
//radiusY: 16.89655113220215
//rotationAngle: 0
//screenX: 319
//screenY: 361
//target: div#touchid
//__proto__: Touch