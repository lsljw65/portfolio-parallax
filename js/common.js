$(document).ready(function(){
    var yScroll=0;
    var $fontSize=0;
    var $opacity=1;
    var $lastScroll;
    var $windowWidth;
    var $windowHeight;
    $windowHeight=$(window).height();
    $("section").css({
        height:$windowHeight
    })
    $("section:first-child").css({
        height:2000
    })
    $(window).scroll(function(){
        yScroll=$(window).scrollTop();
        if($lastScroll<yScroll){
            console.log("스크롤을 내리고 있어요")
                
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
                console.log("yScroll/10 : "+(yScroll/10))
                // console.log("(yScroll+1)/3000 : "+((yScroll+1)/3000))
                console.log("$opacity : "+$opacity)
                
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
                console.log("$opacity : "+$opacity)
            }
        }
        $lastScroll=yScroll;
        console.log("스크롤 탑 : "+yScroll);
        console.log("$fontSize : "+$fontSize)
        
        
    })
})//jqeuery 끝
    
