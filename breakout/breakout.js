// Generated by LispyScript v0.2.9
var canvas = null;
var context = null;
var bricksNumX = 7;
var bricksNumY = 5;
var brickWidth = null;
var brickHeight = 20;
var brickMargin = 4;
var paddleWidth = 80;
var paddleHeight = 12;
var paddleX = 0;
var ballX = 0;
var ballY = 0;
var ballVx = 0;
var ballVy = 0;
var bricks = (function(i,j,o) {
    var ret = [];
    for(var n=0;n<i;n++){var inn=[];for(var m=0;m<j;m++) inn.push(o); ret.push(inn);}
    return ret;
})(5,7,null);
var init = function() {
    paddleX = (canvas.width / 2);
    ballX = 40;
    ballY = 150;
    ballVx = 7;
    ballVy = 12;
    return (function(o,f,s) {
        if(o.forEach){o.forEach(f,s);}else{for(var i=0,l=o.length;i<l;++i)f.call(s||o,o[i],i,o);}
        return undefined;
    })(bricks,function(___elem,___i,___oa) {
        return (function(o,f,s) {
            if(o.forEach){o.forEach(f,s);}else{for(var i=0,l=o.length;i<l;++i)f.call(s||o,o[i],i,o);}
            return undefined;
        })(___elem,function(___val,___j,___ia) {
            return (function(val,i,j,arr) {
                arr[i] = true;
            })(___val,___j,___i,___ia,___oa);
        });
    });
};
var clear = function() {
    return context.clearRect(0,0,canvas.width,canvas.height);
};
var circle = function(x,y) {
    context.beginPath();
    context.arc(x,y,10,0,(2 * Math.PI));
    return context.fill();
};
var drawPaddle = function() {
    var x = (paddleX - (paddleWidth / 2));
    var y = (canvas.height - paddleHeight);
    return context.fillRect(x,y,paddleWidth,paddleHeight);
};
var drawBricks = function() {
    return (function(o,f,s) {
        if(o.forEach){o.forEach(f,s);}else{for(var i=0,l=o.length;i<l;++i)f.call(s||o,o[i],i,o);}
        return undefined;
    })(bricks,function(___elem,___i,___oa) {
        return (function(o,f,s) {
            if(o.forEach){o.forEach(f,s);}else{for(var i=0,l=o.length;i<l;++i)f.call(s||o,o[i],i,o);}
            return undefined;
        })(___elem,function(___val,___j,___ia) {
            return (function(val,x,y,arr) {
                return (val ?
                    (function() {
                        var xpos = ((x * brickWidth) + (brickMargin / 2));
                        var ypos = ((y * brickHeight) + (brickMargin / 2));
                        var width = (brickWidth - brickMargin);
                        var height = (brickHeight - brickMargin);
                        return context.fillRect(xpos,ypos,width,height);
                    })() :
                    undefined);
            })(___val,___j,___i,___ia,___oa);
        });
    });
};
var hitHorizontal = function() {
    return (((ballX < 0) || (ballX > canvas.width)) ?
        ballVx = -ballVx :
        undefined);
};
var hitVertical = function() {
    return ((ballY < 0) ?
        (function() {
            ballVy = -ballVy;
            return true;
        })() :
        ((ballY < (brickHeight * bricksNumY)) ?
            (function() {
                var bx = Math.floor((ballX / brickWidth));
                var by = Math.floor((ballY / brickHeight));
                (((bx >= 0) && (bx < bricksNumX)) ?
                    (bricks[by][bx] ?
                        (function() {
                            bricks[by][bx] = false;
                            ballVy = -ballVy;
                        })() :
                        undefined) :
                    undefined);
                return true;
            })() :
            ((ballY >= (canvas.height - paddleHeight)) ?
                (function() {
                    var paddleLeft = (paddleX - (paddleWidth / 2));
                    var paddleRight = (paddleX + (paddleWidth / 2));
                    return (((ballX >= paddleLeft) && (ballX <= paddleRight)) ?
                        (function() {
                            ballVy = -ballVy;
                            return true;
                        })() :
                        (function() {
                            init();
                            return false;
                        })());
                })() :
                (true ?
                    true :
                    undefined))));
};
var tick = function() {
    clear();
    drawPaddle();
    ballX = (ballX + ballVx);
    ballY = (ballY + ballVy);
    hitHorizontal();
    return (hitVertical() ?
        (function() {
            circle(ballX,ballY);
            return drawBricks();
        })() :
        clear());
};
window.onload = function(event) {
    canvas = document.getElementById("breakout");
    context = canvas.getContext("2d");
    brickWidth = (canvas.width / bricksNumX);
    (canvas).addEventListener("mousemove",function(event) {
        paddleX = event.offsetX;
    });
    init();
    return window.setInterval(tick,30);
};
