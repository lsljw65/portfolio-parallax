$(document).ready(function(){
    var yScroll=0;
    var $fontSize=0;
    var $opacity=1, $webOpacity=0;
    var $lastScroll;
    var $windowWidth;
    var $webWidth;
    var $webPosition;
    var $windowHeight;
    var $webMoveLeft;
    var $lastWebLeft;
    var $webTop, $webSectionTop;
    $windowHeight=$(window).height();
    
    
    /* *************************************************************************** */
    // 헤더 네비, 사이드 네비 구성 처리 및 
    var $navBool=true;
    $(".navBt").click(function(){
        if($navBool){
        $(this).addClass("bt-background")
        $(".nav-list").addClass("nav-position")
        $navBool=false;
        }else{
        $(".nav-list").removeClass("nav-position")
        $(this).removeClass("bt-background")
        $navBool=true;
        }
    })

    // 해시 애니메이션
    var $position=0;
    $(".nav-list a").each(function(index){
        $(this).click(function(){
            
            if($position<=index){
                console.log("다음요소, 현재요소")
                $hash=$(this.hash).offset().top
                $("html,body").stop().animate({
                    scrollTop:$hash+($(this.hash).height()/2)
                },1000)
            }else{
                console.log("이전요소")
                $hash=$(this.hash).offset().top-$(this.hash).prev().height()
                $("html,body").stop().animate({
                    scrollTop:$hash
                },1000)
            }
            $position=index
            
            
            $(".nav-list a").removeClass("clickActive")
            $(this).addClass("clickActive")
            $(".nav-list").removeClass("nav-position")
            $navBool=true;
        })
    });
    
////////////////////////////////////////////////////////////////////
    function Position(){
        $webSectionTop=$("section").eq(1).offset().top
        $webWidth=$(".web-container1").width();
        $winodwHeight=$(window).height();
        $webPosition=(($(window).width()-$webWidth)/2)/$(window).width()*100
        // console.log("포지션 : "+$webPosition+"%")
        // $webMoveLeft=$(window).width()/$(window).width()*100;
        $webMoveLeft=parseInt( $(".web-container1").css("left") )/$(window).width()*100;
        $lastWebLeft=$webMoveLeft;
        // console.log("$webMoveLeft : "+$webMoveLeft)
        $webTop=$("section").eq(1).offset().top+$(".web-container1").offset().top
        // console.log("$webTop : "+$webTop);
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
            if(yScroll+500>$webSectionTop+500){
                // console.log("동작");
                $webMoveLeft-=1
                $webOpacity+=0.03

                if($webMoveLeft<=$webPosition){
                    $webMoveLeft=$webPosition; 
                    $webOpacity=1;
                }
                $(".web-container1").css({
                    left:$webMoveLeft+"%",
                    opacity:$webOpacity
                })
                $(".web-container2").css({
                    left:($lastWebLeft-$webMoveLeft)+"%",
                    opacity:$webOpacity
                })
                
                // console.log("webPosition : "+$webPosition)
                // console.log("webMoveLeft : "+$webMoveLeft)
                // console.log("$webPosition-$webMoveLeft : "+($lastWebLeft-$webMoveLeft))
                // console.log("webOpacity : "+$webOpacity)
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
                // console.log("동작");
                $webMoveLeft+=1
                $webOpacity-=0.03;

                if($webMoveLeft>=$lastWebLeft){
                    $webMoveLeft=$lastWebLeft;
                    $webOpacity=0;
                }
                $(".web-container1").css({
                    left:$webMoveLeft+"%",
                    opacity:$webOpacity
                })
                $(".web-container2").css({
                    left:($lastWebLeft-$webMoveLeft)+"%",
                    opacity:$webOpacity
                })
                // console.log("webPosition : "+$webPosition)
                // console.log("webMoveLeft : "+$webMoveLeft)
            }

        }
        $lastScroll=yScroll;
        
    })
    
    
})//jqeuery 끝
    
