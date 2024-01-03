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

    $(".section").css({
        height:3000
    })
    $(".web-container1, .web-container2").css({
        width:$(window).width()*0.8,
        "max-width":1000,
        opacity:0,
        left:$(window).width()*0.5
    })
    $(".web-container2").css({
        left:"inherit",
        right:$(window).width()*0.6
    })

    // 해시 애니메이션
    var $position=0;
    $(".nav-list a").each(function(index){
        $(this).click(function(){
            
            if($position<=index){
                console.log("다음요소, 현재요소")
                if(index>$position){
                    $webOpacity=1;
                    $opacity=0;
                }
                $hash=$(this.hash).offset().top;
                $webMoveLeft=$webPosition
                $(".web-container1").css({
                    left:$webPosition,
                    opacity:0
                })
                $(".web-container2").css({
                    right:$webPosition+100,
                    opacity:0
                })
                $("html,body").stop().animate({
                    scrollTop:$hash+($(this.hash).height()/2)
                },1000)
            }else{
                console.log("이전요소")
                if(index<=0){
                    $hash=0
                    $webOpacity=0;
                    $opacity=1;
                }else{
                    var count=$position-index
                    $hash=$(this.hash).offset().top-($(this.hash).prev().height()*count)
                    
                }
                $webMoveLeft=$webPosition
                console.log("hash $webMoveLeft : "+$webMoveLeft)
                $(".web-container1").css({
                    left:$webPosition,
                    opacity:1
                })
                $(".web-container2").css({
                    right:$webPosition+100,
                    opacity:1
                })
                $("html,body").stop().animate({
                    scrollTop:$hash
                },1000)
            }
            $position=index
            // $(".nav-list a").removeClass("clickActive")
            // $(this).addClass("clickActive")
            // $(".nav-list").removeClass("nav-position")
            $active($position)
            $navBool=true;
        })
    });
    function $active(activePosition){
        $(".nav-list a").removeClass("clickActive")
        $(".nav-list a").eq(activePosition).addClass("clickActive")
        $(".nav-list").removeClass("nav-position")
    }

    
////////////////////////////////////////////////////////////////////
    function Position(){
        $webSectionTop=$("section").eq(1).offset().top
        console.log("section1 : "+$webSectionTop)
        $webWidth=$(".web-container1").width();
        console.log(".web-container1 : "+$webWidth)
        $windowHeight=$(window).height();
        $webPosition=(($(window).width()-$webWidth)/2)
        console.log("포지션 : "+$webPosition)
        // $webMoveLeft=$(window).width()/$(window).width()*100;
        $webMoveLeft= parseInt($(".web-container1").css("left")) ;
        $lastWebLeft=$webMoveLeft;
        console.log("$lastWebLeft : "+$lastWebLeft)
        $webMoveRight=parseInt( $(".web-container2").css("right"));
        console.log("$webMoveLeft : "+$webMoveLeft)
        console.log("$webMoveRight : "+$webMoveRight)
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
            if(yScroll+100>$webSectionTop){
                // console.log("동작");
                $webMoveLeft-=10;
                $webMoveRight-=10;
                $webOpacity+=0.03

                if($webMoveLeft<=$webPosition || $webMoveRight<=$webPosition+100 ){
                    $webMoveLeft=$webPosition;
                    $webMoveRight=$webPosition+100; 
                    $webOpacity=1;
                }
                $(".web-container1").css({
                    left:$webMoveLeft,
                    opacity:$webOpacity
                })
                $(".web-container2").css({
                    right:$webMoveRight,
                    opacity:$webOpacity
                })
                
                console.log("webPosition : "+$webPosition)
                console.log("webMoveLeft : "+$webMoveLeft)
                console.log("webOpacity : "+$webOpacity)
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
            if(yScroll<$webSectionTop+500){
                // console.log("동작");
                $webMoveLeft+=10
                $webMoveRight+=10
                $webOpacity-=0.03;

                if($webMoveLeft>=$lastWebLeft || yScroll<=0){
                    $webMoveLeft=$lastWebLeft;
                    $webOpacity=0;
                }
                $(".web-container1").css({
                    left:$webMoveLeft,
                    opacity:$webOpacity
                })
                $(".web-container2").css({
                    right:$webMoveRight,
                    opacity:$webOpacity
                })
                console.log("webPosition : "+$webPosition)
                console.log("webMoveLeft : "+$webMoveLeft)
                console.log("webOpacity : "+$webOpacity)
            }

        }
        $lastScroll=yScroll;
    })
    
    var arrayPosition=[];
    for (i=0; i<$("section").length; i++){
        // console.log("i : " +i)
        arrayPosition[i]=$("section").eq(i).offset().top
        // console.log("sTop : "+arrayPosition[i] )
    }
    $("section").each(function(index){
        $(window).scroll(function(){
            var poscroll=$(window).scrollTop();
            if(poscroll>=arrayPosition[index]){
                $position=index;
                $active($position)
                console.log("activePosition : "+$position)
            }
            
        })
    })


})//jqeuery 끝
    
