;(function(window,undefined){
    "use strict";

    var opts={
        arrays: false,
        dots: false,
        index: 1,
        animated: false,
        time: 300,
        interval: 5,
        autoInterval:3000
    };
    
    var hrSlide=function (eleId,options) {
        if(typeof eleId == "string"){
            this.slide=document.getElementById(eleId);
        }else{
            console.log(eleId);
            this.slide=document.getElementById(eleId.toString());
        }
        
        this.pic=this.slide.childNodes;
        
        this.init();        
    };
    
    hrSlide.prototype={
        constructor: hrSlide(),
        
        init:function () {
            this.insNodes();
        },
        
        insNodes:function () {
            var firstPic=this.slide.firstChild.cloneNode();
            var lastPic=this.slide.lastChild.cloneNode();

            document.body.insertBefore(lastPic,this.slide.firstChild);
            document.body.appendChild(firstPic);
        },
    };
    
    window.hrSlide=hrSlide;
    
})(window,undefined);
