$(document).ready(function(){
    var yScroll=0;
    var $fontSize=0;
    var $opacity=1;
    var $lastScroll;
    var $windowWidth;
    var $webWidth;
    var $webPosition;
    var $windowHeight;
    var $webMoveLeft;
    var $webTop;
    $windowHeight=$(window).height();
    $("section").css({
        height:$windowHeight
    })
    $("#about, #web").css({
        height:2000
    })

    function Position(){
        $webWidth=$(".web-box").width();
        $webPosition=(($(window).width()-$webWidth)/2)/$(window).width()*100
        console.log("포지션 : "+$webPosition+"%")
        $webMoveLeft=$(window).width()/$(window).width()*100;
        console.log("$webMoveLeft : "+$webMoveLeft)
        $webTop=$("section").eq(1).offset().top+$(".web-box").offset().top
        console.log("$webTop : "+$webTop);
    }
    Position();

    $(window).resize(function(){
        Position();
    })
    
    
    $(window).scroll(function(){
        yScroll=$(window).scrollTop();
        
        if($lastScroll<yScroll){
            // console.log("스크롤을 내리고 있어요")
                
            if($fontSize<=100){
                if($opacity>=1){
                    $opacity=1;
                }
                $fontSize=(yScroll/10);
                $opacity-=0.03
                $(".first-box h3").css({
                    "font-size":$fontSize+"px",
                })
                $(".first-box h2").css({
                    transform:"translate("+-$fontSize+"%"+",0px)",
                    "opacity":$opacity
                })
                
                
            }
            if(yScroll+500>$("section").eq(1).offset().top){
                // console.log("동작");
                $webMoveLeft-=1
                if($webMoveLeft<=$webPosition){
                    $webMoveLeft=$webPosition; 
                }
                $(".web-box").css({
                    left:$webMoveLeft+"%"
                })
                console.log("webPosition : "+$webPosition)
                console.log("webMoveLeft : "+$webMoveLeft)
            }        
            

        }else{
            console.log("스크롤을 올리고 있어요")
            
            if($fontSize>=0 && yScroll<=1000){
                if($opacity<0){
                    $opacity=0;
                }
                $fontSize=(yScroll/10)-1;
                $opacity+=0.03
                $(".first-box h3").css({
                    "font-size":$fontSize+"px",    
                })
                $(".first-box h2").css({
                    transform:"translate("+-$fontSize+"%"+",0px)",
                    "opacity":$opacity
                })
            }
            if(yScroll<$webTop+500){
                console.log("동작");
                $webMoveLeft+=1
                if($webMoveLeft>=100){
                    $webMoveLeft=100;
                }
                $(".web-box").css({
                    left:$webMoveLeft+"%"
                })
                console.log("webPosition : "+$webPosition)
                console.log("webMoveLeft : "+$webMoveLeft)
            }

        }
        $lastScroll=yScroll;
        
    })
    
    
})//jqeuery 끝
    
