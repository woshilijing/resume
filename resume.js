/**
 * Created by LJ on 2016/3/21.
 */
(function(){
    function getEle(ele){
        return document.querySelector(ele);
    }
    var num = 0;
    var progress=document.querySelector(".progress");
    var loading=document.querySelector("#loading");
    function fnLoad() {
        var arr=['sunny.png','cloud1.png','city1.png','right.png','left.png',
            'map2.png','me1.png','skills2.png','position.png','js.png','ajax.png',
            'c1.png','c6.png','nodejs.png','c2.png'];
        if (!arr) {
            return;
        }
        for(var i= 0,len=arr.length;i<len;i++){
            var oImg=new Image;
            oImg.src="images/"+arr[i];
            oImg.onload=function(){
                num++;
                progress.style.width=(num/arr.length)*100+"%";
                if(num==arr.length&&loading){
                    main.removeChild(loading);
                    loading=null;
                    var oDiv=document.querySelector(".a0");
                    oDiv.firstElementChild.id="p0";
                    oDiv.lastElementChild.id="p1";
                }
            }

        }
    }
    fnLoad();

    var audio=getEle(".audio");
    var music=getEle(".music");
    window.addEventListener("load",function(){
        music.play();
        music.addEventListener("canplay",function(){
            console.log("ok");
            audio.style.display="block";
            audio.id="move";
        },false);
        audio.addEventListener("touchend",function(){
            if(music.paused){
                music.play();
                audio.id="move";
            }else{
                music.pause();
                audio.id="";
            }

        },false);

    },false);


    var main=document.querySelector("#main");
    var oLis=document.querySelectorAll("#list>li");

    var winW=document.documentElement.clientWidth;
    var winH=document.documentElement.clientHeight;
    var desW=640;
    var desH=960;
    if(winW/winH<=desW/desH){
        main.style.webkitTransform="scale("+winH/desH+")";
    }else{
        main.style.webkitTransform="scale("+winW/desW+")";
    }
    document.body.addEventListener("touchstart",function(e){
        e.preventDefault();
    },false);
    [].forEach.call(oLis,function(){
        var oLi=arguments[0];
        oLi.index=arguments[1];
        oLi.addEventListener("touchstart",start,false);
        oLi.addEventListener("touchmove",move,false);
        oLi.addEventListener("touchend",end,false);
    });
    function start(e){
        e=e||window.event;
        this.start1= e.changedTouches[0].pageY;
    }
    function move(e){
        e=e||window.event;
        var move1= e.changedTouches[0].pageY;
        var pos=move1-this.start1;
        var index=this.index;
        //this.className="";
        clear0();
        clear1();
        clear2();
        clear3();
        [].forEach.call(oLis,function(){
            if(arguments[1]!=index){
                arguments[0].style.display="none";//不是当前这张隐藏
            }
            arguments[0].className="";//每一张的zIndex都要清掉
        });

        if(pos>0){
            this.prevsIndex=(index===0?oLis.length-1:index-1);
            var duration=-winH+pos;
            oLis[index].style.webkitTransformOrigin = "bottom";
            //由于每一张都脱离了文档流，所以在这个要加

        }else if(pos){
            this.prevsIndex=(index===oLis.length-1?0:index+1);
            duration=winH+pos;
            oLis[index].style.webkitTransformOrigin = "top";
        }

        oLis[this.prevsIndex].style.webkitTransform="translate(0,"+duration+"px)";
        oLis[this.prevsIndex].className="zIndex";
        oLis[this.prevsIndex].style.display="block";
        //oLis[index].style.webkitTransform="scale("+(1-(Math.abs(pos)/winH)*1/2)+") translate(0,"+pos+"px)"
        oLis[index].style.webkitTransform = "scale(" + (1 - Math.abs(pos / winH) * 0.4) + ") translate(0," + pos / 4 + "px)";
    }
    function end(e){
        oLis[this.prevsIndex].style.webkitTransform="translate(0,0)";
        oLis[this.prevsIndex].style.webkitTransition="0.5s";
        oLis[this.prevsIndex].addEventListener("webkitTransitionEnd",function(){
            this.style.webkitTransition="";
            if(this==oLis[0]){
                var oDiv=document.querySelector(".a0");
                oDiv.firstElementChild.id="p0";
                oDiv.lastElementChild.id="p1";
            }else if(this==oLis[1]){
                var oDiv1=document.querySelector(".a1");
                var oDivs=oDiv1.querySelectorAll("div");
                for(var i=0;i<oDivs.length;i++){
                    oDivs[i].id="w"+i;
                }
            }else if(this==oLis[2]){
                var oDivs2=document.querySelector(".a2");
                oDivs2.firstElementChild.id="z0";
            }else if(this==oLis[3]){
                var oDiv3=document.querySelector(".a3");
                var oDivs3=oDiv3.querySelectorAll("div");
                for(var i=0;i<oDivs3.length;i++){
                    oDivs3[i].id="k"+i;
                }
            }

        },false);

    }
    function clear0(){
        var oDiv=document.querySelector(".a0");
        oDiv.firstElementChild.id="";
        oDiv.lastElementChild.id="";
    }
    function clear1(){
        var oDiv1=document.querySelector(".a1");
        var oDivs=oDiv1.querySelectorAll("div");
        for(var i=0;i<oDivs.length;i++){
            oDivs[i].id="";
        }
    }
    function clear2(){
        var oDivs2=document.querySelector(".a2");
        oDivs2.firstElementChild.id="";
    }
    function clear3(){
        var oDiv3=document.querySelector(".a3");
        var oDivs3=oDiv3.querySelectorAll("div");
        for(var i=0;i<oDivs3.length;i++){
            oDivs3[i].id="";
        }
    }
    document.addEventListener("touchmove",function(){//画着滑着把touchmove丢了，在模拟器要加上这句话

    })
})();
