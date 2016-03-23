/**
 * Created by LJ on 2016/3/21.
 */
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

    if(pos>=0){
        this.prevsIndex=(index===0?oLis.length-1:index-1);
        var duration=-winH+pos;

    }else if(pos){
        this.prevsIndex=(index===oLis.length-1?0:index+1);
        var duration=winH+pos;
    }
    oLis[this.prevsIndex].style.display="block";
    oLis[this.prevsIndex].style.webkitTransform="translate(0,"+duration+"px)";
    oLis[this.prevsIndex].className="zIndex";
    //oLis[index].style.webkitTransform="scale("+(1-(Math.abs(pos)/winH)*1/2)+") translate(0,"+pos+"px)"

}
function end(e){
    oLis[this.prevsIndex].style.webkitTransform="translate(0,0)";
    oLis[this.prevsIndex].style.webkitTransition="1s";
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